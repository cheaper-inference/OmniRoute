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

## Inventář brány a profily provádění

### Přijetí kandidáta

Pracovní postupy CI a Quality Gates vydávají stabilní verdikt: `Gate / CI` a `Gate / Quality`. Jejich verzovaná politika přijímání vyjmenovává každou upstreamovou práci podle požadavků nebo doporučení. Příslušná požadovaná úloha musí být úspěšná: chybějící, zrušené, přeskočené, čekající a neznámé výsledky nemohou vytvořit PASS. Platná klasifikace pouze pro dokumenty nebo pouze pro katalog může způsobit, že kódový pruh nebude použitelný; běžný návrh PR není přijatým kandidátem. Označení `hotfix` se nezříká důkazů.

Oba pracovní postupy pokrývají PRs do větví main/release, přesuny do `main`, ruční odesílání a události slučovací skupiny. Push, dispatch a merge-group spustí celý výběr. Důvěryhodný koncept fronty Mergify také spouští příslušné úlohy `full-code`/`full-code-e2e` ; běžné PRs je přeskočte. Před ručním sloučením spusťte úplné odeslání na přesném kandidátovi. Push to `release/**` nespustí tyto pracovní postupy; Release-Green pozoruje sloučenou základnu samostatně (`docs/ops/RUNNER_BOX.md` → Hosted lane). Rozvětvení a slučovací skupiny používají hostované běžce pro úlohy, které jinak vybírají samoobslužné běžce; před zavedením je nutné ověřit dostatečnou hostovanou kapacitu.

Běžný PR provozuje rychlý výběr. Pruhy `full-code` a `full-code-e2e` politiky přístupu (E2E, integrace, artefakt balíčku, kouř Electron, Bun SQLite, klienti ekosystému a protokolu) běží pouze na konceptu fronty Mergify nebo na úplném spuštění: `gh workflow run ci.yml --ref <branch>`.

Každá účtenka JSON identifikuje odhlášenou SHA, běh pracovního postupu a pokus. CLI odmítne nesoulad checkout/event SHA. Testy pracovního postupu vážou členství v zásadě k seznamu `needs` úlohy verdiktu, takže nový nebo odstraněný pruh nemůže tiše zmizet. Potvrzení pokrývá jejich vlastní pracovní postup, nikoli publikaci, nasazení nebo vnitřní části stávajícího poradenského skeneru. Samostatnou administrativní změnou je provedení příslušných kontrol požadovaných v pobočkových pravidlech; definování jejich pracovních míst samo o sobě nechrání pobočku.

`API Route Typecheck` je nezávislá kontrola pracovního postupu, mimo souhrnné verdikty a statický profil místního úplného pozorovatele. Prohlédněte si jeho výsledek zvlášť pro konkrétního kandidáta. `.github/workflows/api-route-typecheck.yml` běží na PRs do `main` nebo `release/**`, odesílá buď do rodiny větví, ruční odesílání a události `merge_group` typu `checks_requested`. Nemá žádný filtr cest. Sloučit skupiny zkontrolujte `merge_group.head_sha`; další akce podívejte se na `github.sha`. Všechny události používají stejné testy diagnostické brány a jednotky brány API. Základní retargety PR vyžadují novou kontrolu; Úpravy body/title používají pouze pozorovací název `Admission not requested / API Route Typecheck` a nemohou nahradit vstupní kontrolu.

### Uchovaný důkaz v akceptačním reduktoru

`scripts/quality/validate-release-acceptance.mjs` redukuje dodaný plán a jeho manifesty; nestanoví, že plán pokrývá celý proces uvolňování. Jeho zprávy explicitně stanovují `releaseAcceptance: false`, i když je tento plán `VERIFIED`. Pracovní postup `release-acceptance.yml` stále používá stínová zařízení, nikoli skutečné potvrzení o sestavení, balíčku, zavedení nebo propagaci.

CLI vyžaduje, aby `--evidence-root` ověřil uchované důkazy. Soubory jsou řešeny jako `<evidence-root>/<artifact_id>/<member>` a hashovány jako SHA-256. Ověření brání záznam PASS bez důkazů, chybějící nebo změněný soubor, nebezpečná cesta nebo symbolický odkaz. Chybějící soubory nejsou ekvivalentní prázdným úspěšným protokolům. Stávající kontroly SHA/run/attempt zůstávají nezávislé: odpovídající bajty nemohou zachránit zastaralou účtenku. Integrita souboru není důkazem pravosti provedení nebo propagace artefaktu.

### DAST spotřebovává ověřené sestavení CI

Požadovaná úloha `dast-smoke` CI volá `.github/workflows/dast-smoke.yml` po `build`. Dodržuje stejný výběr code/draft jako sestavení, včetně podporovaných fork PRs, cílového vydání PRs a skupin sloučení. Chybějící, neúspěšná, zrušená nebo neočekávaně přeskočená úloha DAST blokuje `Gate / CI`. Opakovaně použitelný pracovní postup nemá žádný nezávislý spouštěč PR/dispatch ; ruční ověření používá odeslání CI, takže sestavení a spotřebitel zůstávají v jednom běhu.

`scripts/ci/next-build-provenance.mjs` zapečeťuje celý artefakt Next svým tar digest, repository/event/run, pokusem o producenta, head/base/checkout/tree, identitami pracovních postupů, lockfile, přesným uzlem version/ABI, platformou a svazkem. DAST vybere neměnný artefakt ID ze `needs.build.outputs`, vyžaduje ověření výtahu ke stažení a nezávisle hashuje ZIP proti výtahu výrobce před extrahováním svých dvou povolených členů prostřednictvím `scripts/ci/unpack-ci-build.py`. Manifest a archiv tar se také musí shodovat s výstupy nezávislých producentů před extrahováním dalšího stromu. Nikdy nehledá nejnovější úspěšné sestavení větve. Částečné opakování může znovu použít stejný pokus o producenta, když se jeho ID a všechny vstupy stále shodují; účtenka zaznamená oba pokusy.

Spotřebitel zůstává na hostovaném běžci Linux s oprávněním pouze pro čtení a bez tajemství úložiště. Nainstaluje přesnou verzi Node výrobce a poté sestaví CLI s `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` odmítne chybějící samostatný server před jakýmkoliv záložním sestavením; normální místní sestavení CLI si zachovávají stávající záložní verzi. Připravenost serveru, Schemathesis a promptfoo musí být úspěšné v rámci nezměněného 25minutového limitu úlohy. Potvrzení o původu prokazuje vstupní identitu a bajty, nikoli úspěšné skenování DAST. Vypršení platnosti artefaktu, přerušení běhu nebo selhání skeneru zůstávají neúplné nebo neúspěšné; nemůže se stát PASS prostřednictvím informačního obalu.

### Kapacita provádění UI

CI provozuje úplný inventář UI jako čtyři fragmenty matice `test-vitest`, každý s nejvýše dvěma pracovníky na fragment a stávající 15minutovou uzávěrkou úlohy. První fragment také spouští sadu MCP/autoCombo Vitest. Požadovaný výsledek práce pokrývá každou větev matrice; selhání nebo zrušení jednoho fragmentu nemůže založit přijetí kandidáta.

Noční pozorovatel si ponechává samostatné potvrzení o přesném kandidátovi pro každý útržek UI, včetně provedení MCP v prvním potvrzení. Jsou vyžadovány všechny čtyři účtenky, protokoly a odpovídající identity provedení. Místní `npm run test:vitest:ui` stále vybírá kompletní sadu; jeden běh `--shard` je jen částečným důkazem.

### Sběr pokrytí jednotek

Dvanáct fragmentů jednotek shromažďuje pokrytí V8 během provádění stávajícího testu. Úspěšný fragment spustí `scripts/ci/compact-v8-coverage.mjs` pro komprimaci původních souborů bez generování přechodné Istanbulské zprávy. Konečná úloha pokrytí ověří všech dvanáct manifestů proti kandidátnímu SHA, runtime, zdrojovému kořenovému adresáři a datovým hashům, poté spustí reportéry c8 a stávající prahové hodnoty pokrytí. Vstupy zachovávají globální pořadí souborů c8; předběžné sloučení na střep není bezpečné pro smíšené pokrytí function/block. Chybějící, poškozené nebo nekompatibilní úlomky se nezdaří. Úlomky neúspěšných testů si uchovávají nezpracované diagnostické pokrytí samostatně; nemůže vstoupit do konečného sloučení.

### Potvrzení o průběhu provádění jednotky

Sdílený příkaz `test:unit:ci:shard` zaznamenává fáze `primary`, `dashboard` a `serial` prostřednictvím `scripts/ci/unit-progress-reporter.mjs`. Běžná zkušební zpráva zůstává k dispozici. Samostatná účtenka obsahující pouze metadata zaznamenává začátek a dokončení každého souboru a 30sekundový prezenční signál obsahuje seznam souborů, které jsou stále aktivní, a jejich uplynulý čas. Zaznamenává pouze povolená metadata provádění; popisy testů, výstup, těla chyb a celé prostředí nejsou serializovány.

CI uchovává soubory JSONL jako `unit-progress-ci-<run>-<attempt>-<shard>`. Časový limit úlohy může zabránit pozdějšímu nahrání; již vydané srdeční tepy zůstávají diagnostickým důkazem. Chybějící srdeční tep mohou také odrážet zablokovaný nebo ukončený proces běžce. Tyto účtenky zachovávají stávající výběr testu, souběžnost, termíny a výstupní stav; nejsou to verdikty o přijetí kandidáta.

### Sloučit frontu

Štítek `queue` odešle PR do fronty Mergify (`.mergify.yml`). Mergify otevře koncept PR na větvi `mergify/merge-queue/`, CI tam spustí úplný výběr a původní PR se sloučí, když projdou `Gate / CI`, `Gate / Quality` a `Merge integrity (changelog + generated skills)`.

Mergify zapíše svůj souhrn fronty do popisu konceptu. Body/title-only `pull_request` Události `edited` používají skupinu souběžnosti specifickou pro běh a nespouštějí znovu klasifikaci, testovací matice, integritu sloučení ani verdikt přijetí. Názvy kontrol pouze pro pozorování nemohou nahradit `Gate / CI` nebo `Gate / Quality`. Úprava, která změní cílovou základnu, vyžaduje nové ověření kandidáta.

Po vyřazení z fronty ne vždy push znovu zařadí PR. Komentář `@mergifyio queue` k tomu.

### Statické skenování inventáře

Verzovaný inventář npm-alias a členství ve statickém skenování fungují v `config/quality/gate-manifest.json`. Spusťte `npm run check:gate-manifest` pro ověření názvů skriptů a přesných příkazů proti `package.json`; přidání, odebrání a posun příkazů selžou jak u lokálního zavěšení, tak u úloh klasifikace změn v CI. Alias není úloha pracovního postupu, instance matice nebo testovací případ: tyto počty nesmí být prezentovány jako zaměnitelné.

Použijte `npm run quality:scan -- --list` nebo `npm run quality:scan:fast -- --list` ke kontrole vybraných aliasů, aniž byste je spouštěli. Runtime vyvolá vstupní bod npm, takže jeho runtime (včetně Bun pokud je nakonfigurováno) je zachováno. Manifest zaznamenává aliasy mimo tyto profily, které jsou vyvolány samostatně, a příkazy údržby jsou v profilech skenování pouze pro čtení zakázány.

Tyto profily pokrývají pouze statické skenování. Necertifikují testy produktů, pokrytí, balení, externí kontroly ani úplné přijetí kandidáta na vydání. Přijetí pracovního postupu používá propojené `config/quality/admission-policy.json` a `scripts/quality/admission-verdict.mjs`. Profily pozorovatele uvolnění zůstávají oddělené; nezávisle kontrolovat jejich příslušné šeky a účtenky. Úplné statické příkazy pozorovatele jsou deklarovány v `config/quality/release-green-static-profile.json`, včetně `audit:deps`, výběru testu mutace a kontroly překladu. Zavaděč ověřuje příkazy npm proti package.json a modelovaným deklaracím CI/Quality ; odmítá drift místo provádění tokenů shellu jako argumentů. Požadovaný výstup SKIP/INCOMPLETE skeneru nemůže vytvořit PASS. Profil zaznamenává svá externí vyloučení a nenahrazuje hostované pokrytí, testovací matrice, balíčky nebo důkazy o nasazení. Níže uvedený inventář prózy je odkazem, nikoli důkazem, že brána skutečně běžela.

Skripty fungují pod `scripts/check/` (politické brány) a `scripts/quality/` (řehtací motor). Zdrojem pravdy CI je `.github/workflows/ci.yml`.

### Stav zveřejněné dokumentace

`.github/workflows/i18n-base-health.yml` sleduje stav dokumentace po vybraných přesunech do `main` a `release/v*` a při ručním odeslání. Jeho filtry pokrývají dokumentaci, root Markdown, `llm.txt`, překlad state/configuration a příslušné nástroje i18n. Jediná úloha `Published base documentation health` využívá hostované Ubuntu a pětiminutový termín. Provádí ověření pouze pro čtení a zapíše diagnostický příjem bez instalace závislosti, překladu nebo přijetí stavu.

`scripts/i18n/check-base-health.mjs` vyžaduje nulový zdroj hash, chybějící cíl, cílový hash, zastaralý překlad a nekonzistence mezipaměti sekcí. Ověřuje také aktuální základní rozsah document/locale a jeho zaznamenaný původ. Neplatný kontext, neúplné pokrytí nebo přerušená kontrola vytváří `INCOMPLETE`; potvrzený drift produkuje `FAIL`. Oba vrátí stav neúspěšného ukončení. Potvrzení je vázáno na pokladnu SHA, pracovní postup, spuštění a pokus a je uchováno jako `i18n-base-health-<sha>-<run>-<attempt>`.

Jedná se o nezávislé pozorování zveřejněné základny. Nepřidává událost PR nebo slučovací skupiny, požadovanou kontrolu PR, alias npm ani člen profilu statického skenování. Základní kontrola také blokuje všech pět tříd v absolutním režimu. Běžná příprava PR zůstává oddělená od přijetí. Úspěšné nahrání nemůže změnit výsledek neúspěšného stavu na PASS.

Běžný PR používá `--preflight` se základní zprávou generovanou `--baseline-evidence`. Anglický zdroj může ponechat nevyřízený pouze v případě, že se úplný záznam překladu a skutečné cílové bajty od tohoto přesného základu nezmění. Stále blokují nové nekonzistence mezi cíli nebo mezipamětí sekcí a neúplné důkazy nemohou povolit přípravu. Zpráva odhaluje `preparationPending` a `mergeReady` samostatně: úspěšná příprava neznamená, že čekající překlady jsou připraveny ke sloučení. Před přijetím obnovte postižená zrcadla ve složeném kandidátovi. Důvěryhodný kandidát na frontu Mergify, `merge_group`, odeslání větve a ruční CI používají absolutní kontrolu bez `--warn` nebo odpuštění zděděných selhání. Chybějící cílové hodnoty hash a rozsah zmenšený o odstraněné nahrané základní soubory nemohou přinést úspěšný absolutní verdikt.

### Uvolněte rychlou cestu PR (`quality.yml`)

`.github/workflows/quality.yml` doplňuje CI na main/release PRs, tlačí do `main`, odesílá a spojuje skupiny. PRs používá rychlé kontroly filtrované cestou. Trvale deaktivované duplicitní sestavení bylo odstraněno; skutečné kontroly build/package/boot zůstávají v CI. Jednotka a vitest běží pouze v CI (`Unit Tests (N/12)` a `Vitest`).

| Práce                                            | Rozsah                                                                                                                                                                                                                   | Blokování          |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API dokumenty reference a dokumenty-vše                                                                                                                                                                   | Ano                |
| `Fast Quality Gates`                             | kód PRs; statické kontroly, typová kontrola, typová kontrola přístrojové desky, testy ovlivněných jednotek                                                                                                               | Ano                |
| `Forgotten sibling tests`                        | kód PRs; změněné moduly vysledované ke statickým spotřebitelům a kandidátským sourozeneckým testům; cesty barelu a dynamického importu jsou hlášeny jako poradní diagnostika s odkazovanými výjimkami seznamu povolených | **Poradní**        |
| `No new ESLint warnings`                         | kód PRs; ochrana proti žmolkům reagující na potlačení                                                                                                                                                                    | Ano, včetně vidlic |
| `Merge integrity (changelog + generated skills)` | Nenávrh PRs; changelog a generovaná synchronizace dovedností                                                                                                                                                             | Ano, včetně vidlic |

#### Zpráva o testech zapomenutého sourozence

`npm run check:forgotten-sibling-tests` běží jako poradní krok `Fast Quality Gates` a znovu používá překladač importu za mapou dopadu testu. Pro každý změněný produkční modul hlásí deterministické řetězce `changed module/symbol -> static consumer -> candidate sibling test`, když kandidátský test chybí v rozdílu požadavku na stažení. Souhrn Markdown a výsledek JSON jsou zachovány jako artefakt pracovního postupu `forgotten-sibling-tests` pro kalibraci před jakýmkoliv zavedením blokování.

Reexporty sudů a dynamické importy jsou pouze diagnostikou rozlišení; nikdy nevytvářejí blokující nález. Zkontrolované výjimky živě v `config/quality/forgotten-sibling-allowlist.json`. Každý záznam musí pojmenovat test spotřebitele a kandidáta, uvést konkrétní zdůvodnění a propojit problém GitHub nebo požadavek na stažení. Poškozené položky se nepodařilo uzavřít. Výjimky nemohou potlačit smazaný test kandidáta nebo rozdíl, který přidává `.skip`/`.todo`; oslabení asercí a další maskování zůstávají ve vlastnictví nezávisle blokující brány `check:test-masking`.

### Zaměstnání: `lint`

Běží na každém PR až `main`. Bloky se při selhání spojí.

| skript (`npm run ...`)            | Ověřuje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Blokování                               |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| `check:node-runtime`              | Verze Node.js je v podporovaném rozsahu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ano                                     |
| `check:cycles`                    | Kruhové importy napříč všemi `src/` + `open-sse/` (založené na AST, vyřešeno pomocí tsconfig `paths` ). Bare ukončí 1, kdykoli existuje jakýkoli cyklus (selhání uzavřeno od #15281) a vypíše SCCs. `check:cycles:ratchet` (co běží CI ) blokuje, když počet překročí strop `metrics.cycles` v `quality-baseline.json` — aktuálně 14, `direction: down`, takže může pouze klesnout (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ano (ráčna)                             |
| `check:boundary`                  | Propojení `open-sse → src` : jedinečné importy mezi soubory z enginu do aplikace (`scripts/quality/measure-boundary.mjs`; seznam okrajů je nevyřízená náprava v4 core/module-split ). Holá poradní zpráva = (stejná jako `quality:boundary`). `check:boundary:ratchet` (co běží CI, také v rohatkové smyčce `quality.yml` rychlých bran) blokuje, když počet překročí strop `metrics.boundaryOpenSseToSrc` v `quality-baseline.json` — nasazené na naměřených 771, `direction: down`; `--update` ji pouze snižuje; základně relativní k PRs (`--base-ref`, viz níže)                                                                                                                                                                                                                                                                                                                                                     | Ano (ráčna)                             |
| `check:route-validation:t06`      | Schémata Zod přítomná na všech trasách (zásady úrovně 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ano                                     |
| `check:any-budget:t11`            | Počet `@ts-expect-error // any` nepřekračuje rozpočet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ano                                     |
| `check:provider-consistency`      | Každý poskytovatel v `providers.ts` má odpovídající záznam v `providerRegistry.ts` (a naopak v seznamu povolených)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ano                                     |
| `check:model-lifecycle`           | Tři ručně spravované směrovací tabulky zůstávají konzistentní se zaznamenaným snímkem životního cyklu (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nezískává žádné vyřazené id, které může `REGISTRY` směrovat; každý cíl `BUILT_IN_ALIASES` je přítomen v `REGISTRY` a chybí ve snímku vyřazeného id; každé vyřazené ID stále v `REGISTRY` je předáno nebo uvedeno v `allowedRetiredInCatalog`; a žádný zdroj nebo cíl `DEFAULT_DEGRADATION_MAP` se v tomto snímku neobjeví jako vyřazený. To nedokazuje, že model je v současné době obsluhován živě proti proudu. Offline — se srovnává se `config/quality/model-lifecycle.json`, ručně obnovený pomocí `npm run quality:refresh-model-lifecycle` (síť; není zapojeno do CI). `allowedRetiredInCatalog` je spálená ráčna: přidejte položku pouze s problémem se sledováním.                                                                                           | Ano                                     |
| `check:fetch-targets`             | Každé `fetch("/api/...")` v `src/` na straně klienta se převede na skutečné `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ano                                     |
| `check:deps`                      | Všechna `npm install` -able deps napříč každým `package.json` v repo jsou v `dependency-allowlist.json`; nové nepřipnuté nebo squatované balíčky označené příznakem                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ano                                     |
| `audit:deps`                      | npm audit všech pěti nezávislých lockfiles (root, Electron, OpenCode pluginy v1/v2 a poskytovatel). Blok kritických rad; vysoká upozornění zůstávají viditelným varováním. Audity Missing/failed jsou INCOMPLETE a blok; hodnoty hash a sestavy uzamčení podle rozsahu jsou zachovány.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ano                                     |
| `check:lockfile`                  | Integrita `package-lock.json` Registr https —, haše integrity, žádné přepisy hostitele                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ano                                     |
| `check:licenses`                  | Seznam povolených licencí SPDX pro produkční závislosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ano                                     |
| `check:tracked-artifacts`         | Žádné artefakty sestavení / potvrzené symbolické odkazy `node_modules` (také běží v husky pre-commit; předběžné stisknutí je záměrně lehké — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ano                                     |
| `check:ai-attribution`            | Žádná upoutávka AI/bot `Co-Authored-By` nebo zápatí generace AI v PR se nezavazuje, název nebo tělo — Hard Rule #16 (ve smyčce rychlých bran `quality.yml` pro PR→ `release/**` — čte užitečné zatížení události, bez možnosti vypnutí PRs — a krok pouze PR v `ci.yml` lint pro PR co-`main` → pro člověka `commit-msg` ; #14436;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:vitest-exclusions`         | Každé vyloučení Vitest pojmenuje problém se sledováním a objeví se v `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ano                                     |
| `check:file-size`                 | Zdrojové soubory (`.ts`/`.tsx` v `src/`, `open-sse/`, `electron/`, `bin/`) zůstávají v `cap` a testovací soubory (`*.test.ts(x)`) v `testCap`; soubory zmrazené v `file-size-baseline.json` (`frozen` / `testFrozen`) nesmí přesáhnout svou zaznamenanou velikost                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ano                                     |
| `check:error-helper`              | Chybové odpovědi v executors/handlers používají `buildErrorBody()` / `sanitizeErrorMessage()` (tvrdé pravidlo #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ano                                     |
| `check:migration-numbering`       | Migrační soubory SQL jsou sekvenčně číslovány, bez mezer nebo duplicit                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ano                                     |
| `check:public-creds`              | Žádné doslovné OAuth `client_id`/`client_secret` nebo webové klíče Firebase mimo `publicCreds.ts` (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ano                                     |
| `check:db-rules`                  | Žádné surové SQL mimo moduly `src/lib/db/` ; žádný dovoz sudů ze `localDb.ts` (tvrdá pravidla #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ano                                     |
| `check:known-symbols`             | Exekutoři poskytovatelů, strategie směrování a překladatelé registrovaní v jejich dispečerských tabulkách odpovídají souborům na disku — žádné osiřelé nebo nedeklarované symboly                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ano                                     |
| `check:route-guard-membership`    | Každá cesta, která vytvoří podřízený proces, je klasifikována podle `isLocalOnlyPath()` (tvrdá pravidla #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ano                                     |
| `check:test-discovery`            | Každý soubor `*.test.ts` / `*.spec.ts` v repozitáři shromažďuje alespoň jeden testovací běžec (ratchet: seznam sirotků v `test-discovery-baseline.json` se může pouze zmenšit)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ano                                     |
| `check:test-tla-order`            | Žádný soubor `node:test` pod `tests/unit` nezaregistruje test, zasáhne `await` nejvyšší úrovně a poté zaregistruje další (#18045; ráčna: `test-tla-order-allowlist.json` se může pouze zmenšit)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ano                                     |
| `check:agent-skills-sync`         | Vygenerované artefakty schopností agentů odpovídají jejich zdrojovému katalogu (žádný posun)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:provider-asset-provenance` | Poskytovatel logos/assets má zaznamenaný záznam o původu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `lint:json`                       | Konfigurační soubory JSON analyzují a splňují pravidla repo lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `typecheck:core`                  | Kompilace TypeScript bez chyb (pouze informativní upozornění)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ano                                     |
| `typecheck:noimplicit:core`       | Přísné `noImplicitAny` — zaměřené na budoucnost; mnoho již existujících stránek pro volání stále potřebuje poznámky                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | **Poradní** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | Rozsah `tsc` na `src/app/(dashboard)/**` (#7033) — `typecheck:core` spravovaný 27-souborový seznam povolených souborů neobsahuje žádný řídicí panel TSX a `next build` jej také nikdy nekontroluje typu (`next.config.mjs` nastavuje `ignoreBuildErrors: true`), takže regrese osiřelých identifikátorů tam (#6625/#6909) byly pro CI neviditelné. Rozdíly proti zmrazenému základnímu počtu per-file/per-TS-code (`config/quality/dashboard-typecheck-baseline.json`, stejný vzor vynucení jako `check:known-symbols`) Pouze — chyby NEW za základním počtem selžou; ráčnou dolů pomocí `--update`, když je opravena již existující chyba.                                                                                                                                                                                                                                                                              | Ano                                     |
| `check:build-typecheck`           | Kontrola typu produkce celé aplikace přes `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), seznam povolených souborů `typecheck:core` s 27 soubory a brána na palubní desce nepokrývají. Rozdíly proti `config/quality/build-typecheck-baseline.json`; nový nebo zvýšený počet za (soubor, kód) selže, nižší počet vás požádá o ratchetování. `--update` odmítne, když běh obsahuje nový nebo zvýšený pár, pokud není `--force-regressions` předán, a odmítne nově umlčený soubor, pokud není `--force-nocheck` předán, takže rozšíření základní linie na zelenou a udělení trvalého ticha jsou dva samostatné záměrné činy. Holý `--force` je odmítnut. Také skenuje rozsah sestavení pro `@ts-nocheck` proti `config/quality/ts-nocheck-baseline.json`, protože soubor, který jej používá, nehlásí vůbec žádnou diagnostiku a jinak by byl pro každou bránu neviditelný. | Ano                                     |

#### Dva programy pro kontrolu typu odpovídají odlišně

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) a `check:build-typecheck` kompilují různé programy pod různými možnostmi a stejný soubor může být v jednom čistý a v druhém plný chyb.

`tsconfig.build.json` nastavuje `"strict": false`, takže `noImplicitAny` je vypnuto. Základní konfigurace zkompiluje upravený seznam povolených souborů s 27 soubory s přísnějšími možnostmi a sleduje graf importu každé položky, takže soubory, které se nikdy neobjeví v sestavení programu, jsou tam stále kontrolovány.

Důsledek je důležitý při posuzování, zda je soubor napsán:**nulová diagnostika pod `check:build-typecheck` neznamená nulu** . Odstranění `@ts-nocheck` z 26 souborů ukázalo, že 23 z nich bylo v sestavení programu čisté; šestnáct z nich se objevilo kolem 120 implicitních – žádné chyby v přísném. Před voláním souboru clean zkontrolujte obojí.

### Zaměstnání: `quality-gate`

Běží po `test-coverage`. Bloky se při selhání spojí.

| Skript                       | Ověřuje                                                                                                                                                 | Blokování         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `quality:collect`            | Vydává `quality-metrics.json` (počet varování ESLint, pokrytí ze sloučené zprávy o zlomku)                                                              | Ano (před ráčnou) |
| `quality:ratchet`            | Každá metrika v `quality-baseline.json` se nevrátila (ESLint varování ≤ základní linie; pokrytí ≥ základní linie)                                       | Ano               |
| `check:duplication`          | Duplikace kódu (jscpd@4) nepřesahuje základní úroveň v `quality-baseline.json`                                                                          | Ano               |
| `check:complexity`           | Cyklomatická složitost na úrovni souboru nepřesahuje limit (jádro ESLint `complexity` + `max-lines-per-function`)                                       | Ano               |
| `check:cognitive-complexity` | Ratchet kognitivní složitosti (`eslint-plugin-sonarjs`) — samostatný průchod ESLint ; CI běží oba sloučené jako jediný krok `check:complexity-ratchets` | Ano               |
| `check:dead-code`            | Nepoužité exporty/soubory ráčna (knip) neregresuje oproti základní linii                                                                                | Ano               |
| `check:compression-budget`   | Rozpočet kompresního benchmarku — na úsporu tokenů na motor nesmí klesnout                                                                              | Ano               |
| `check:type-coverage`        | Ráčna s procentuálním typem (`type-coverage`) se nevrací; do značné míry zahrnuje `typecheck:noimplicit:core`                                           | Ano               |

### Práce: `codeql-scan` a `codeql-admission`

`codeql-scan` vytváří všechny nakonfigurované kategorie analýz. Poté, co je tato úloha úspěšná, `codeql-admission` ověří své přesné nahrání a upozornění na kandidáty. Oba jsou povinné závislosti `Gate / CI`, včetně kandidátů pouze pro dokumenty. Administrativní aktivace a požadavky na canary jsou popsány níže v části „CodeQL ráčna“.

| Skript                 | Ověřuje                                                                                                                                                                                        | Blokování |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:codeql-ratchet` | Kandidátské ref/SHA a všechny konfigurované kategorie analýzy musí být aktuální před spuštěním výstrahy; chybějící důkazní bloky. Globální zásoby zůstávají oddělené — viz „CodeQL ráčna“ níže | Ano       |

### Zaměstnání: `quality-extended`

Pracovní pozice blokuje vhodné kandidáty. Velikost balíčku, tajná zjištění, zjištění zranitelnosti, zjištění pracovních postupů a změny OpenAPI jsou kontrolovány pomocí požadovaných ráčen. Diagnostika cirkulární závislosti je i nadále doporučená. Je vyžadována instalace skeneru: `scripts/ci/install-quality-scanners.sh` poskytuje připojené verze a šíří selhání instalace. Chybějící nástroje, neplatné zprávy nebo chybějící základní linie opustí požadovanou bránu skeneru INCOMPLETE.

| Skript                   | Ověřuje                                                                                                                                                                                                    | Blokování                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `check:circular-deps`    | Žádné kruhové závislosti (dpdm)                                                                                                                                                                            | **Poradní**                                       |
| `check:bundle-size`      | Velikost svazku nepřesahuje čepici; nedostupné měření selže                                                                                                                                                | **Blokování pomocí --ratchet**                    |
| `check:secrets`          | Nálezy Gitleaks neregresují; požadované skeny odmítají chybějící tools/source/baseline, neúspěšné skeny a neplatné zprávy                                                                                  | **Blokování pomocí --ratchet**                    |
| `check:vuln-ratchet`     | Chyby v závislosti se nevrací; požadovaná skenování odmítají chybějící nástroje, neplatné zprávy nebo chybějící základní linie                                                                             | **Blokování pomocí --ratchet**                    |
| `check:workflows`        | Workflow lint (actionlint + zizmor); Skenery missing/broken, neplatná hlášení nebo chybějící základní linie ráčny selžou jako INCOMPLETE. Platná zjištění se řídí vybranou zásadou strict/advisory/ratchet | Vyžadováno provedení; blokování ráčny zizmor v CI |
| `check:openapi-breaking` | Veřejná smlouva API proti závazkům připnutých událostí (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); požadované měření se nezdaří uzavřeno                       | **Blokování pomocí --ratchet**                    |

### Zaměstnání: `docs-sync-strict`

Pro žádosti o stažení do `main` nebo `release/**` se tato úloha spouští pouze pro kandidáty bez konceptu (nebo důvěryhodné fronty) klasifikované jako změny dokumentace nebo kódu. To také běží na non-PR události CI ; spouštěcí tlačítko tohoto pracovního postupu pokrývá pouze `main`, nikoli `release/**`. Krok, který opustí nenulovou hodnotu, zablokuje úlohu; nálezy pouze pro zprávy a níže uvedené zdokumentované výjimky ne.

| Skript                         | Ověřuje                                                                                                                                                                                                                                                                                                                                                                                                                                       | Blokování                                                                                                                          |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Metabrána, která postupně spouští 7 dílčích bran níže                                                                                                                                                                                                                                                                                                                                                                                         | Ano                                                                                                                                |
| ↳ `check:docs-sync`            | Konzistence verze Package/OpenAPI/CHANGELOG, přesná zrcadla `llm.txt`, přeložené invarianty CHANGELOG section/size a absence nahrazených duplicitních dokumentů                                                                                                                                                                                                                                                                               | Ano                                                                                                                                |
| ↳ `check:docs-frontmatter`     | Kompilované stránky dokumentace nesou platné tituly frontmatter                                                                                                                                                                                                                                                                                                                                                                               | Ano                                                                                                                                |
| ↳ `check:docs-counts`          | Invarianty vysoce spolehlivého počtu jsou přísné; heuristické kontroly počtu souborů pouze varují, pokud skript neobdrží `--strict` (metabrána CI ji neprojde)                                                                                                                                                                                                                                                                                | Přísné blokování úrovní; soft tier poradenství                                                                                     |
| ↳ `check:env-doc-sync`         | Čtení zdrojového env, `.env.example` a `docs/reference/ENVIRONMENT.md` souhlasí po explicitních seznamech povolených ignorovat, pouze dokumenty a pouze env                                                                                                                                                                                                                                                                                   | Ano, mimo zdokumentované seznamy povolených                                                                                        |
| ↳ `check:deprecated-versions`  | Hlásí potenciální zastaralé verze mimo bezpečný historický kontext a zastaralá data aktualizací, s výjimkou ignorovaných dokumentů                                                                                                                                                                                                                                                                                                            | Poradenství v aktuální elektroinstalaci CI (`--strict` neprošlo)                                                                   |
| ↳ `check:doc-links`            | Interní odkazy na snížení v dokumentech se přenesou na skutečné soubory (forma `[text]`/`(path)` )                                                                                                                                                                                                                                                                                                                                            | Ano                                                                                                                                |
| ↳ `check:fabricated-docs`      | V kódové základně existují trasy, env vars, příkazy CLI, názvy háčků a cesty k souborům citované v dokumentech. Pevná brána přes `--strict`; soft-fail bez vlajky.                                                                                                                                                                                                                                                                            | Ano (přes `--strict` v CI)                                                                                                         |
| `check:cli-i18n`               | Použité klíče CLI `t()` existují v `en`; `pt-BR` zachovává každou sekci nejvyšší úrovně; `zh-CN` a `zh-TW` obsahují všechny klíče od `en`                                                                                                                                                                                                                                                                                                     | Ano                                                                                                                                |
| `check:openapi-coverage`       | Specifikace OpenAPI pokrývá alespoň ratchetovou podlahu skutečných tras                                                                                                                                                                                                                                                                                                                                                                       | Ano                                                                                                                                |
| `check:openapi-security-tiers` | Deklarované anotace `x-loopback-only`/`x-always-protected` musí být podpořeny `routeGuard.ts`; blok analyzátoru a dopředných neshod. Zpětná kontrola chybějícího `x-loopback-only` pod pouze místními předponami varuje a trasy pouze se vzorem jsou z tohoto zpětného průchodu vyloučeny.                                                                                                                                                    | Parser/forward kontroluje blokování; zpětná kontrola poradenství                                                                   |
| `check:openapi-routes`         | Každá cesta `/api...` v `openapi.yaml` rozlišuje parametry necitlivě na skutečnou cestu po oprávněném seznamu povolených `KNOWN_STALE_SPEC` ; zastaralé položky seznamu povolených také selžou                                                                                                                                                                                                                                                | Ano                                                                                                                                |
| `check:docs-symbols`           | Interní odkazy `/api/...` URL v kanonických nezrcadlových dokumentech se převádějí na skutečnou cestu nebo rodinu tras; Odkazy proxy/upstream/placeholder/file a zarovnané položky `KNOWN_STALE_DOC_REFS` jsou vyloučeny a zastaralé položky seznamu povolených selžou                                                                                                                                                                        | Ano                                                                                                                                |
| `i18n translation drift`       | Absolutní přístup vyžaduje nulový zdroj, chybějící cíl, cílový hash, zastaralý překlad a nekonzistence mezipaměti sekcí. Běžná příprava PR může uchovat přesné zděděné důkazy nebo pouze v angličtině čekající změnu s nezměněným úplným stavem a cílovými bajty; jeho zpráva samostatně deklaruje připravenost ke sloučení. Chybějící cílové hodnoty hash a neúplný základní důkazní blok. Chybějící mezipaměť starších sekcí není selháním. | Všech pět tříd blokuje vstup queue/base ; běžná příprava umožňuje pouze prokázanou zděděnou nebo pouze v angličtině čekající práci |

Vygeneruje se dvanáct README SVGs pod `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` je všechny regeneruje). Každý z nich má test jednotky porovnáním bajtů (`tests/unit/docs/readme-*-svg.test.ts`, úloha `test-unit`), který selže, když je potvrzený soubor zastaralý, a `check:docs-counts` čte kanonická čísla z jejich uzlů `<text>` — což je důvod, proč krok obrysu udržuje každý načrtnutý řetězec v souboru jako neviditelný `<text>`. Kontrola kanonických čísel SVG čte soubory uvedené v `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` a `tier-flow-light.svg`; tvrzení o bezplatných navždy, o vstupu do katalogu, o opakujícím se fondu a o faktorech bodování také o `promise-pillars.svg`, `free-tier-budget.svg` a `strategies-grid.svg`. `free-tier-budget.svg` čerpá své údaje ze zavaděče živého katalogu, takže změna na `FREE_MODEL_BUDGETS` nebo na zobrazovaný název poskytovatele zčervená CI dokud se tento soubor nevygeneruje.

### Zaměstnání: `i18n-ui-coverage`

| Skript                            | Ověřuje                                                                                                                                                                                                           | Blokování     |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check-ui-keys-coverage` (inline) | Pokrytí klíče UI i18n je ≥ 65 %                                                                                                                                                                                   | Ano           |
| `check-ui-value-drift` (inline)   | Přepsaná angličtina **hodnota** nezanechává za sebou žádný zastaralý překlad                                                                                                                                      | Ano           |
| `check-new-key-coverage` (inline) | A **nový** Anglický klíč je přeložen v každém národním prostředí — a značka `__MISSING__:` je odmítnuta                                                                                                           | Ano           |
| `check-translation-ratio`         | Poměr skutečného překladu na národní prostředí (identický s angličtinou / zástupný symbol / chybějící listy mimo seznam povolených) nesmí překročit `config/quality/i18n-translation-baseline.json` + volné místo | **Blokování** |

Potřebuje `fetch-depth: 0` — brána posunu hodnoty odlišuje `en.json` proti slučovací základně.

#### `check-ui-value-drift` — zastaralá překladová brána

Zachycuje jednu regresi i18n, kterou ostatní brány strukturálně nevidí: anglická hodnota je přepsána a překlady odvozené z _předchozí_ angličtiny zůstávají pozadu, takže neangličtí uživatelé stále čtou sebevědomě formulovanou, nyní chybnou kopii.

Toto bylo skutečně odesláno. `oauthModal.googleOAuthWarning` bylo přepsáno, když přistál přihlašovací pomocník Antigravity (#5203);**39 ze 43 lokalit** stále text, který operátorům říká, aby „zkopírovali celé URL a vložili jej níže“ — tok, který pro daného poskytovatele nelze dokončit. Až do #8463 to zůstalo bez povšimnutí, protože:

- `sync-ui-keys` zálohuje pouze klíče, které jsou **nepřítomný** , nikdy ty, které jsou **zatuchlý** ;
- `check-ui-keys-coverage` počítá klíčovou _přítomnost_, takže zastaralý překlad je hodnocen jako pokrytý;
- `check-translation-drift` sleduje dokumentaci `docs/i18n/<locale>/**.md` zrcadlí — nikdy nečte `src/i18n/messages/*.json`. Blokování úlohy `docs-sync-strict` od opětovné synchronizace 2026-09: upravte základní dokument → `npm run i18n:run -- --files=<doc>` (úroveň sekce, levně).

**Rozlišující, nepodporované základní linií.** Porovnává `en.json` na slučovací bázi s pracovním stromem; pro každý klíč, jehož anglická hodnota se změnila, je jakékoli národní prostředí, které stále obsahuje nedotčený překlad, zastaralé. Tohle schválně **zmrazí již existující dluh** — a diff nedokáže odhalit, ze které staré angličtiny pochází dlouholetý překlad, takže brána posuzuje pouze to, čeho se aktuální změna dotýká. Alternativa (základní hodnota hash na klíč) by stála soubor vygenerovaný ~ 600 KB, což je 3 × největší existující základna, která se bude střílet na každém i18n PR.

Dva způsoby, jak to uspokojit:

1. aktualizovat dotčené překlady, popř
2. nastavte je na `__MISSING__:<new english>` — runtime pak obsluhuje opravenou angličtinu (`src/i18n/request.ts::deepMergeFallback`, #7258) a klíčové fronty pro překlad.

Pokud je řetězec **význam** změněno, preferovat **přejmenování klíče** : nový klíč nemůže zdědit zastaralý překlad. To je vzor, který používá #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Hodnoty-drift a new-key gates sdílejí jedno neměnné srovnání od `scripts/i18n/resolve-ui-diff-base.mjs`. Pracovní postup předává stejnou základní, základní a kandidátskou SHAs oběma kontrolám. Spuštění PR/base-retarget, push a merge-group používají svůj kontext události. Odeslání kandidátské větve vyžaduje její přesné otevřené PR nebo explicitní vstup `i18n_base_sha`. Odeslání nebo plánované pozorování `main` nebo `release/vX.Y.Z` bez tohoto vstupu porovnává poslední potvrzení s jeho prvním rodičem; nejedná se o audit všech zděděných překladatelských dluhů. Místní vyvolání vyžaduje explicitní srovnávací základnu, například výše uvedený příkaz `BASE_REF`.

Chybějící nebo nejednoznačný kontext srovnání, nečitelný nebo neplatný požadovaný katalog a změněný kandidát vytvářejí `INCOMPLETE` s výstupním kódem **2** , včetně režimu varování. Čtení katalogu používá `scripts/i18n/read-ui-catalog.mjs`; selhání čtení nejsou nahrazena prázdnými objekty. PASS nezakládá ani nedostupná základna, ani neúplný vstup.

### Zaměstnání: `i18n`

Plná ověřovací matice i18n (jedna úloha na národní prostředí). Celá práce je poradenská.

| Skript                          | Ověřuje                                    | Blokování                                                |
| ------------------------------- | ------------------------------------------ | -------------------------------------------------------- |
| `validate_translation.py quick` | Úplnost překladu podle národního prostředí | **Poradní** (`continue-on-error: true` na celou zakázku) |

### Zaměstnání: `pr-test-policy`

Spouští se pouze na žádostech o stažení.

| Skript                 | Ověřuje                                                                                                                                  | Blokování |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PRs, které mění produkční kód v `src/`, `open-sse/`, `electron/` nebo `bin/`, musí zahrnovat nebo aktualizovat testy (Tvrdé pravidlo #8) | Ano       |
| `check:test-masking`   | Změněné testovací soubory nesnižují čistý počet tvrzení ani nepřidávají tautologie `assert.ok(true)`                                     | Ano       |
| `check:pr-evidence`    | Tělo PR cituje důkazy test/VPS pro změnu (mechanizuje Hard Rule #18 tím, že grepuje PR prózu — fragile, viz Backlog)                     | Ano       |

### Zaměstnání: `test-vitest`

Potřebuje práci klasifikace `changes`. Použitelné fragmenty matice se při selhání sloučí.

| Suite            | Ověřuje                                                         | Blokování                                                                                              |
| ---------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | Server MCP (110 nástrojů), autoCombo, mezipaměť — vitest runner | Ano                                                                                                    |
| `test:vitest:ui` | Test komponentů UI — vitest runner                              | **Blokování** Předchozí selhání — jsou v `vitest.config.ts` výslovně vyloučena; nová selhání selhávají |

### Noční pracovní postupy (plánované, poradenské)

Ty běží podle plánu cron (a `workflow_dispatch`), nikdy ne na PRs. Všechny jsou poradní.

| Pracovní postup        | Ověřuje                                                                                                                                                  | Blokování   |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | rychlé testy vlastností s vysokým počtem náhodných semen +                                                                                               | **Poradní** |
| `nightly-resilience`   | halda-growth gate, chaos fault-injection, k6 load/soak                                                                                                   | **Poradní** |
| `nightly-llm-security` | promptfoo ochrana vstřikování (režim blokování) + garak sondy (přeskočeno bez tajemství poskytovatele)                                                   | **Poradní** |
| `nightly-schemathesis` | Rozostření kontraktu OpenAPI (schéma) proti živému OmniRoute pomocí porušení specifikace povrchů `docs/openapi.yaml` — / neošetřených 500 s (Fase 8 B.4) | **Poradní** |
| `nightly-mutation`     | Skóre testování strykerových mutací na rychlé jednotkové dráze mutantů přežívajících — na povrchu slabé tvrzení                                          | **Poradní** |
| `nightly-compat`       | Matice kompatibility uzlového modulu napříč podporovanými řadami `engines.node`                                                                          | **Poradní** |

Základní linie výkonu (hromada, TTFB, doba sestavení) se zaznamenávají, nejsou hradlovány: viz [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

### CodeQL ráčna: příjem kandidátů a inventář úložiště

CI vlastní kandidátské přijetí CodeQL prostřednictvím explicitního řetězce závislostí: `codeql-scan` volá čtyřjazyčnou matici v `codeql.yml`, pak `codeql-admission` spustí `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` vyžaduje oba výsledky. Kvalita si zachovává své vlastní numerické kontroly, ale nezeptá se skeneru před dokončením výrobce; Samotný `Gate / Quality` není úplným přijetím kandidáta. CodeQL zůstává vyžadováno u kandidátů pouze s dokumenty.

Zásada v `config/quality/codeql-admission-policy.json` vybere Akce, C/C++, JavaScript/TypeScript a Python, výchozí sadu dotazů, model vzdálené hrozby a režim sestavení žádný. Preflight Producer odmítne čekající aktivační záznam a větví se mimo explicitní cílový seznam. Aktuální cíle jsou hlavní a testy smlouvy release/v3.8.54. porovnávají tento konečný seznam a spouštěcí tlačítko údržby s verzí balíčku; další vydání musí být zkontrolováno při registraci. Stávající spouštěč PR pro širší verzi CI je zachován, ale nezařazený cíl hlásí HOLD před extrakcí, spíše než aby získal neměřené PASS.

Každá maticová úloha zaznamenává svůj skutečný SARIF upload ID, jazyk, kategorii, běh a pokus, identitu pracovního postupu volajícího, událost ref/head/base/merge SHA a hash zásad. Závislá úloha stáhne pouze potvrzení o tomto běhu a ověří výtahy artefaktů. Vyžaduje všechny čtyři kategorie, úspěšného producenta a dokončené zpracování každého přesného uploadu. Používá filtr sarif_id API, nikoli nejnovější analýzu nalezenou na větvi. Částečná opakování mohou znovu použít úspěšné kategorie z dřívějšího pokusu stejného kola a kandidáta, přičemž pokus o produkci bude zachován; neúspěšný současný výrobce nemůže znovu použít předchozí zelené důkazy.

Akce CodeQL čeká na zpracování, ale její připnutá implementace může varovat a pokračovat po selhání čtení stavu nebo vyčerpání čekání. Vstupné tedy znovu ověřuje zpracování. Chybějící kategorie, čekající zpracování, neúspěšné nebo zrušené úlohy, zastaralá identita, neúplné stránkování nebo nedostupné APIs vytvoří HOLD a ukončí 2. Nezbývá žádné pevné čekání na nezávislý pracovní postup skeneru. Nenaskenovaný PR nemůže projít, protože výstražný dotaz vrátil 0. Naměřený počet nad `metrics.codeqlAlerts.value` končí 1; základní linie není zvýšena, aby absorbovala výstrahy jiné větve. [Stav nahrávání a vyhledávání analýzy](https://docs.github.com/en/rest/code-scanning/code-scanning).

Účtenka zaznamenává nahrávání a analýzu IDs, kategorie, verze nástrojů, ref/SHA, výchozí a výstražná čísla. SARIF Počet identity/result, minimální počet pravidel a přesné výskyty výstrah zůstávají povinné. Identity PR/analysis jsou před přijetím znovu zkontrolovány. Tyto kontroly vytvářejí nakonfigurované pokrytí kategorií, nikoli inventář každého extrahovaného zdrojového souboru. C/C++ extrakce bez sestavení nezahrnuje kód generovaný během sestavení projektu. Vyloučení zdrojů stále vyžaduje kontrolu a atribuce přispěvatelů potřebuje srovnatelné přesné důkazy.

`codeql-maintenance.yml` poskytuje aktivní skenování push a týdenní plán bez duplikace výrobců PR/main. `nightly-codeql-inventory.yml` udržuje základní linii celého úložiště oddělenou, se `--strict-measurement` a selháním, když měření není k dispozici. Půvabný skip místního sběratele dědictví není kandidátem na přijetí. Utažení zůstává explicitním `--update` po ověřeném nižším globálním počtu.

Pokročilý pracovní postup nesmí být publikován, když je nakonfigurováno výchozí nastavení: GitHub tuto kombinaci odmítá. Jeho zásada verze zůstává nevyřízená, dokud nebude přečten zkontrolovaný administrativní přechod. Před zveřejněním operátor připne úložiště, head/base/tree, policy/patch/rollback hash a pozorovaný stav nastavení; `node scripts/quality/codeql-producer.mjs verify-admin-readback` kontroluje dodané očekávané a skutečné záznamy JSON. Jedná se o technickou ochranu, nikoli o souhlas operátora nebo náhradu za načítání nových zpětných hodnot. Token PR nikdy nepožaduje přístup pro správu. Zavedení a jakákoli změna skeneru vyžaduje samostatné zpětné čtení plus skutečné důkazy o kompatibilitě PR, fork a slučovacích skupin.

Forky používají hostované běžce, checkout bez trvalých přihlašovacích údajů, žádný projekt install/build v producentovi a žádná zděděná tajemství úložiště. GitHub podporuje nahrávání SARIF pro událost pull_request se sníženým tokenem rozvětvení; první schválení provedení příspěvku zůstává zásadou GitHub. Nikdy nepoužívejte pull_request_target ke spuštění nedůvěryhodného kódu. Před tím, než bude migrace považována za dokončenou, ověřte skutečná oprávnění tokenu, Analysis_key a všechna prostředí kategorií v kontrolovaném canary. [Pravidla pro odesílání vidlice](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [konfliktní režimy nastavení](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Výpovědi jsou voláním operátora (tvrdé pravidlo #14)** — nikdy neodmítne výstrahu CodeQL, aniž by v komentáři k zamítnutí zaznamenal technické odůvodnění: `won't fix` pro požadavek upstream protokolu, `used in tests` pro testovací přípravek, `false positive` pro dezinfekční prostředek CodeQL nevidí (precedent: `docs/security/ERROR_SANITIZATION.md`).

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

**Výše rovněž nedokumentováno** (poradní, nízká vypovídací hodnota): úloha `docs-lint` (markdownlint + Vale, celá úloha s `continue-on-error`) a samostatné workflow skenerů `semgrep.yml` / `scorecard.yml`. CodeQL nyní má povinné úlohy producenta a přijetí pod `Gate / CI` za podmínek aktivace popsaných výše. `semgrepFindings: 0` je v `quality-baseline.json`, ale není napojen na blokující ratchet v `ci.yml` — metrika je momentálně osiřelá.

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
