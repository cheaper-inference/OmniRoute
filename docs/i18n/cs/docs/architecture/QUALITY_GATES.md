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

Pracovní postupy CI a Quality Gates vydávají stabilní verdikt: `Gate / CI` a `Gate / Quality`. Jejich verzovaná politika přijímání vyjmenovává každou upstreamovou práci podle požadavků nebo doporučení. Příslušná požadovaná úloha musí být úspěšná: chybějící, zrušené, přeskočené, čekající a neznámé výsledky nemohou stanovit PASS. Platná klasifikace pouze pro dokumenty nebo pouze pro katalog může způsobit, že kódový pruh nebude použitelný; běžný návrh PR není přijatým kandidátem. Štítek `hotfix` se nezříká důkazů.

Oba pracovní postupy pokrývají PRs do větví main/release, push to `main`, ruční odesílání a události slučovací skupiny. Push, dispatch a merge-group spustí celý výběr. Důvěryhodný koncept fronty Mergify také spouští příslušné úlohy `full-code`/`full-code-e2e` ; obyčejné PRs je přeskočte. Před ručním sloučením spusťte úplné odeslání na přesném kandidátovi. Push to `release/**` tyto pracovní postupy nespustí; Release-Green sleduje sloučenou základnu samostatně (`docs/ops/RUNNER_BOX.md` → Hosted lane). Rozvětvení a slučovací skupiny používají hostované běžce pro úlohy, které jinak vybírají samoobslužné běžce; před zavedením je nutné ověřit dostatečnou hostovanou kapacitu.

Rychlý výběr spustí běžná PR. Pruhy `full-code` a `full-code-e2e` politiky přístupu (E2E, integrace, artefakt balíčku, Electron smoke, Bun SQLite, klienti ekosystému a protokolu) běží pouze na konceptu fronty Mergify nebo na úplném spuštění: `gh workflow run ci.yml --ref <branch>`.

Každá účtenka JSON identifikuje odhlášenou SHA, běh pracovního postupu a pokus. CLI odmítne nesoulad checkout/event SHA. Testy pracovního postupu vážou členství v zásadách k seznamu `needs` úlohy verdiktu, takže nový nebo odstraněný pruh nemůže tiše zmizet. Potvrzení pokrývá jejich vlastní pracovní postup, nikoli publikaci, nasazení nebo vnitřní části stávajícího poradenského skeneru. Samostatnou administrativní změnou je provedení příslušných kontrol požadovaných v pobočkových pravidlech; definování jejich pracovních míst samo o sobě nechrání pobočku.

`API Route Typecheck` je nezávislá kontrola pracovního postupu, mimo souhrnné verdikty a statický profil místního úplného pozorovatele. Prohlédněte si jeho výsledek zvlášť pro konkrétního kandidáta. `.github/workflows/api-route-typecheck.yml` běží na PRs do `main` nebo `release/**`, odesílá buď do rodiny větví, ruční odeslání a události `merge_group` typu `checks_requested`. Nemá žádný filtr cest. Sloučit skupiny check out `merge_group.head_sha`; další akce podívejte se na `github.sha`. Všechny události používají stejné testy diagnostické brány a jednotky brány API. PR base retargets požadují novou kontrolu; Úpravy body/title používají název `Admission not requested / API Route Typecheck` pouze pro pozorování a nemohou nahradit kontrolu přijetí.

### Uchované důkazy v reduktoru přijetí

`scripts/quality/validate-release-acceptance.mjs` redukuje poskytnutý plán a jeho
manifesty; neurčuje, zda plán pokrývá kompletní pipeline vydání.
Jeho reporty explicitně nastavují `releaseAcceptance: false`, i když je daný plán
`VERIFIED`. Workflow `release-acceptance.yml` stále používá stínové fixtures, nikoli
skutečná potvrzení sestavení, balení, spuštění nebo povýšení.

CLI vyžaduje k ověření uchovaných důkazů `--evidence-root`. Soubory se vyhledávají
jako `<evidence-root>/<artifact_id>/<member>` a hashují pomocí SHA-256. Záznam PASS
bez důkazů, chybějící nebo změněný soubor, nebezpečná cesta nebo symbolický odkaz znemožní
ověření. Chybějící soubory nejsou ekvivalentem prázdných protokolů úspěšného běhu. Stávající
kontroly SHA/běhu/pokusu zůstávají nezávislé: shodné bajty nemohou napravit zastaralé
potvrzení. Integrita souboru není důkazem autenticity spuštění ani povýšení artefaktu.

### DAST využívá ověřené sestavení CI

Povinná úloha CI `dast-smoke` volá `.github/workflows/dast-smoke.yml` po `build`. Řídí se stejným výběrem kódu a konceptů jako sestavení, včetně podporovaných PR z forků, PR do vydání a skupin sloučení. Chybějící, neúspěšná, zrušená nebo nečekaně přeskočená úloha DAST blokuje `Gate / CI`. Opakovaně použitelný workflow nemá samostatný spouštěč PR ani ručního spuštění; ruční validace používá spuštění CI, aby sestavení a konzument zůstaly v témže běhu.

`scripts/ci/next-build-provenance.mjs` opatří celý artefakt Next důkazem obsahujícím otisk tar, repozitář/událost/běh, pokus producenta, head/base/checkout/tree, identity workflow, lockfile, přesnou verzi a ABI Node, platformu a bundler. DAST vybere neměnné ID artefaktu z `needs.build.outputs`, vyžaduje ověření otisku staženého souboru a nezávisle vypočte otisk ZIP vůči otisku producenta před rozbalením jeho dvou povolených položek pomocí `scripts/ci/unpack-ci-build.py`. Také manifest a archiv tar musí před rozbalením stromu Next odpovídat nezávislým výstupům producenta. Nikdy nehledá poslední úspěšné sestavení větve. Částečné opakování může znovu použít tentýž pokus producenta, pokud stále souhlasí jeho ID i všechny vstupy; doklad zaznamená oba pokusy.

Konzument zůstává na hostovaném runneru Linux s přístupem k repozitáři jen pro čtení a bez tajných údajů repozitáře. Instaluje přesnou verzi Node producenta a poté sestaví CLI s `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` odmítne chybějící samostatný server před jakýmkoli záložním sestavením; běžná místní sestavení CLI zachovávají dosavadní náhradní postup. Připravenost serveru, Schemathesis a promptfoo musí všechny uspět v nezměněném limitu úlohy 25 minut. Doklad původu prokazuje identitu a bajty vstupů, nikoli úspěšný sken DAST. Vypršení artefaktu, přerušení runneru nebo chyba skeneru zůstávají neúplným či neúspěšným důkazem; poradní wrapper z nich nemůže udělat PASS.

### Kapacita spouštění UI

CI spouští úplný inventář UI jako čtyři shardy matice `test-vitest`, každý nejvýše
se dvěma workery na shard a se stávajícím 15minutovým časovým limitem úlohy. První shard také spouští
sadu Vitest pro MCP/autoCombo. Výsledek povinné úlohy pokrývá každou část matice; selhání
nebo zrušení jednoho shardu nemůže prokázat přijetí kandidáta.

Noční pozorovatel uchovává pro každý shard UI samostatné potvrzení přesného kandidáta,
včetně spuštění MCP v prvním potvrzení. Jsou vyžadována všechna čtyři potvrzení, protokoly a odpovídající
identity spuštění. Lokální `npm run test:vitest:ui` nadále vybírá
kompletní sadu; jeden běh `--shard` představuje pouze částečný důkaz.

### Sběr pokrytí jednotkových testů

Dvanáct shardů jednotkových testů shromažďuje pokrytí V8 během stávajícího spouštění testů. Úspěšný
shard spustí `scripts/ci/compact-v8-coverage.mjs`, aby zkomprimoval původní soubory bez generování
mezilehlého reportu Istanbul. Závěrečná úloha Coverage ověří všech dvanáct manifestů vůči
SHA kandidáta, runtime, kořenu zdrojových souborů a hashům dat a poté spustí reportéry c8 a stávající
prahové hodnoty pokrytí. Vstupy zachovávají globální pořadí názvů souborů c8; předběžné slučování po jednotlivých shardech není bezpečné
pro smíšené pokrytí funkcí/bloků. Chybějící, poškozené nebo nekompatibilní shardy způsobí selhání přijetí.
Shardy s neúspěšnými testy uchovávají nezpracované diagnostické pokrytí samostatně; nemůže být zahrnuto do závěrečného sloučení.

### Záznamy o průběhu spouštění jednotkových testů

Sdílený příkaz `test:unit:ci:shard` zaznamenává fáze `primary`, `dashboard` a `serial`
prostřednictvím `scripts/ci/unit-progress-reporter.mjs`. Běžný protokol testů zůstává
k dispozici. Samostatný záznam obsahující pouze metadata zaznamenává zahájení a dokončení
každého souboru a 30sekundový prezenční signál uvádí soubory, které jsou stále aktivní,
a dobu jejich běhu. Zaznamenává pouze metadata spuštění uvedená na seznamu povolených položek;
popisy testů, výstup, těla chyb ani celé prostředí se neserializují.

CI uchovává soubory JSONL pod názvem `unit-progress-ci-<run>-<attempt>-<shard>`. Vypršení časového limitu úlohy může zabránit
pozdějšímu nahrání; již odeslané prezenční signály zůstávají diagnostickým důkazem. Chybějící
prezenční signály mohou také znamenat zablokovaný nebo ukončený proces runneru. Tyto záznamy
zachovávají stávající výběr testů, souběžnost, časové limity a návratový stav; nepředstavují
rozhodnutí o přijetí kandidáta.

### Fronta sloučení

Štítek `queue` odešle PR do fronty Mergify (`.mergify.yml`). Mergify otevře koncept PR ve
větvi `mergify/merge-queue/`, CI v něm spustí úplný výběr a původní PR se sloučí,
když `Gate / CI`, `Gate / Quality` a `Merge integrity (changelog + generated skills)` uspějí.

Mergify zapisuje souhrn fronty do popisu konceptu a upravovat jej mohou i jiné aplikace.
Událost `pull_request` `edited` na takovém konceptu dostane vlastní skupinu souběžnosti
(`-queue-edit-<run_id>`), takže nemůže zrušit skutečný běh konceptu, a přeskočí bránu i
matici. Spustí se pouze `Merge integrity`. Přeskočená úloha brány má jiný název kontroly,
protože Mergify interpretuje přeskočenou kontrolu `Gate / CI` jako neúspěšnou a odebere PR z fronty.

Po odebrání z fronty pushnutí PR ne vždy znovu zařadí. Přidejte k němu komentář `@mergifyio queue`.

### Inventář statických kontrol

Verzovaný inventář aliasů npm a členství ve statických kontrolách jsou uloženy v
`config/quality/gate-manifest.json`. Spusťte `npm run check:gate-manifest` k ověření
názvů skriptů a přesných příkazů vůči `package.json`; přidání, odebrání a
změny příkazů způsobí selhání lokálního hooku i úloh klasifikace změn v CI.
Alias není úloha workflow, instance matice ani testovací případ: tyto počty
nesmějí být prezentovány jako zaměnitelné.

Použijte `npm run quality:scan -- --list` nebo `npm run quality:scan:fast -- --list`
ke kontrole vybraných aliasů bez jejich spuštění. Runner vyvolává vstupní bod
npm, takže jeho runtime (včetně Bun, kde je nakonfigurován) zůstává zachován.
Manifest eviduje aliasy mimo tyto profily jako spouštěné samostatně a
příkazy údržby jsou v profilech kontrol pouze pro čtení zakázány.

Tyto profily pokrývají pouze statickou kontrolu. Necertifikují testy produktu,
pokrytí, balení, externí kontroly ani úplné přijetí kandidáta pro vydání.
Přijetí workflow používá propojené soubory `config/quality/admission-policy.json` a
`scripts/quality/admission-verdict.mjs`. Profily pozorovatele vydání zůstávají samostatné;
jejich příslušné kontroly a potvrzení prověřujte nezávisle. Statické příkazy úplného pozorovatele
jsou deklarovány v `config/quality/release-green-static-profile.json`, včetně
`audit:deps`, výběru mutačních testů a kontrol překladů. Loader ověřuje příkazy npm
vůči package.json a modelovaným deklaracím CI/Quality; odmítá odchylky,
místo aby spouštěl tokeny shellu jako argumenty. Povinný výstup skeneru SKIP/INCOMPLETE
nemůže prokázat PASS. Profil eviduje svá externí vyloučení a nenahrazuje
hostované pokrytí, testovací matice ani důkazy o balíčku či nasazení. Níže uvedený slovní inventář
je referenční a není důkazem, že brána byla skutečně spuštěna.

Skripty se nacházejí v `scripts/check/` (brány zásad) a `scripts/quality/` (ratchet engine).
Zdrojem pravdy pro CI je `.github/workflows/ci.yml`.

### Stav zveřejněné dokumentace

`.github/workflows/i18n-base-health.yml` sleduje stav dokumentace po vybraných přesunech do `main` a `release/v*` a při ručním odeslání. Jeho filtry pokrývají dokumentaci, root Markdown, `llm.txt`, překlad state/configuration a příslušné nástroje i18n. Jediná úloha `Published base documentation health` využívá hostované Ubuntu a pětiminutový termín. Provádí ověření pouze pro čtení a zapíše diagnostický příjem bez instalace závislosti, překladu nebo přijetí stavu.

`scripts/i18n/check-base-health.mjs` vyžaduje nulový zdroj hash, chybějící cíl, cílový hash, zastaralý překlad a nekonzistence mezipaměti sekcí. Ověřuje také aktuální základní rozsah document/locale a jeho zaznamenaný původ. Neplatný kontext, neúplné pokrytí nebo přerušená kontrola vytváří `INCOMPLETE`; potvrzený drift produkuje `FAIL`. Oba vrátí stav neúspěšného ukončení. Potvrzení je vázáno na pokladnu SHA, pracovní postup, spuštění a pokus a je uchováno jako `i18n-base-health-<sha>-<run>-<attempt>`.

Jedná se o nezávislé pozorování zveřejněné základny. Nepřidává událost PR nebo slučovací skupiny, požadovanou kontrolu PR, alias npm ani člen profilu statického skenování. Základní kontrola také blokuje všech pět tříd v absolutním režimu. Běžná příprava PR zůstává oddělená od přijetí. Úspěšné nahrání nemůže změnit výsledek neúspěšného stavu na PASS.

Běžný PR používá `--preflight` se základní zprávou generovanou `--baseline-evidence`. Anglický zdroj může ponechat nevyřízený pouze v případě, že se úplný záznam překladu a skutečné cílové bajty od tohoto přesného základu nezmění. Stále blokují nové nekonzistence mezi cíli nebo mezipamětí sekcí a neúplné důkazy nemohou povolit přípravu. Zpráva odhaluje `preparationPending` a `mergeReady` samostatně: úspěšná příprava neznamená, že čekající překlady jsou připraveny ke sloučení. Před přijetím obnovte postižená zrcadla ve složeném kandidátovi. Důvěryhodný kandidát na frontu Mergify, `merge_group`, odeslání větve a ruční CI používají absolutní kontrolu bez `--warn` nebo odpuštění zděděných selhání. Chybějící cílové hodnoty hash a rozsah zmenšený o odstraněné nahrané základní soubory nemohou přinést úspěšný absolutní verdikt.

### Uvolněte rychlou cestu PR (`quality.yml`)

`.github/workflows/quality.yml` doplňuje CI na main/release PRs, vkládá do `main`, odesílá a spojuje skupiny. PRs používá rychlé kontroly filtrované cestou. Trvale deaktivované duplicitní sestavení bylo odstraněno; skutečné kontroly build/package/boot zůstávají v CI. Jednotková sada a vitest běží pouze v CI (`Unit Tests (N/8)` a `Vitest`).

| Práce                                            | Rozsah                                                                                                                                                                                                                   | Blokování          |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API dokumenty refs a docs-all                                                                                                                                                                             | Ano                |
| `Fast Quality Gates`                             | Kód PRs; statické kontroly, typová kontrola, typová kontrola přístrojové desky, testy ovlivněných jednotek                                                                                                               | Ano                |
| `Forgotten sibling tests`                        | Kód PRs; změněné moduly vysledované ke statickým spotřebitelům a kandidátským sourozeneckým testům; cesty barelu a dynamického importu jsou hlášeny jako poradní diagnostika s odkazovanými výjimkami seznamu povolených | **Poradní**        |
| `No new ESLint warnings`                         | Kód PRs; ochrana proti žmolkům reagující na potlačení                                                                                                                                                                    | Ano, včetně vidlic |
| `Merge integrity (changelog + generated skills)` | Nenávrh PRs; changelog a generovaná synchronizace dovedností                                                                                                                                                             | Ano, včetně vidlic |

#### Zpráva o testech zapomenutého sourozence

`npm run check:forgotten-sibling-tests` běží jako poradní krok `Fast Quality Gates` a znovu používá překladač importu za mapou dopadu testu. Pro každý změněný produkční modul hlásí deterministické řetězce `changed module/symbol -> static consumer -> candidate sibling test` když kandidátský test chybí v rozdílu požadavku na stažení. Souhrn Markdown a výsledek JSON jsou zachovány jako artefakt pracovního postupu `forgotten-sibling-tests` pro kalibraci před zavedením blokování.

Reexporty sudů a dynamické importy jsou pouze diagnostikou rozlišení; nikdy nevytvářejí blokující nález. Zkontrolované výjimky jsou k dispozici v `config/quality/forgotten-sibling-allowlist.json`. Každý záznam musí pojmenovat test spotřebitele a kandidáta, uvést konkrétní zdůvodnění a propojit problém GitHub nebo požadavek na stažení. Poškozené položky se nepodařilo uzavřít. Výjimky nemohou potlačit smazaný test kandidáta nebo rozdíl, který přidává `.skip`/`.todo`; oslabení asercí a další maskování zůstávají ve vlastnictví nezávisle blokující brány `check:test-masking`.

### Úloha: `lint`

Spouští se při každém PR do `main`. Při selhání blokuje sloučení.

| Skript (`npm run ...`)            | Ověřuje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Blokující                                    |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:node-runtime`              | Verze Node.js je v podporovaném rozsahu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ano                                          |
| `check:cycles`                    | Cyklické importy napříč celými adresáři `src/` + `open-sse/` (založeno na AST, `paths` z tsconfigu jsou vyhodnoceny). Samostatné spuštění skončí s kódem 1, kdykoli existuje jakýkoli cyklus (princip fail-closed od #15281), a vypíše silně souvislé komponenty (SCC). `check:cycles:ratchet` (varianta spouštěná v CI) blokuje, pokud počet překročí limit `metrics.cycles` v souboru `quality-baseline.json` — aktuálně 14, `direction: down`, takže může pouze klesat (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ano (ratchet)                                |
| `check:boundary`                  | Propojení `open-sse → src`: jedinečné importy mezi soubory z enginu do aplikace (`scripts/quality/measure-boundary.mjs`; seznam hran představuje backlog nápravných úkolů pro rozdělení jádra/modulů v4). Samostatné spuštění = informativní report (stejný jako `quality:boundary`). `check:boundary:ratchet` (varianta spouštěná v CI a také ve smyčce ratchet rychlých kontrol v `quality.yml`) blokuje, pokud počet překročí limit `metrics.boundaryOpenSseToSrc` v souboru `quality-baseline.json` — počáteční hodnota je nastavena na naměřených 771, `direction: down`; `--update` ji může pouze snížit; v PR se porovnává relativně vůči základní větvi (`--base-ref`, viz níže)                                                                                                                                                                                                                                                                                                                                                                  | Ano (ratchet)                                |
| `check:route-validation:t06`      | Přítomnost schémat Zod na všech trasách (zásady úrovně 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ano                                          |
| `check:any-budget:t11`            | Počet `@ts-expect-error // any` nepřekračuje rozpočet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ano                                          |
| `check:provider-consistency`      | Každý poskytovatel v `providers.ts` má odpovídající záznam v `providerRegistry.ts` (a naopak, v rámci seznamu povolených položek)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ano                                          |
| `check:model-lifecycle`           | Tři ručně spravované směrovací tabulky zůstávají konzistentní se snapshotem životního cyklu uloženým v repozitáři (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nehodnotí žádné vyřazené ID, které může `REGISTRY` směrovat; každý cíl `BUILT_IN_ALIASES` je přítomen v `REGISTRY` a chybí ve snapshotu vyřazených ID; každé vyřazené ID, které je stále v `REGISTRY`, je přesměrováno nebo uvedeno v `allowedRetiredInCatalog`; a žádný zdroj ani cíl `DEFAULT_DEGRADATION_MAP` není v tomto snapshotu označen jako vyřazený. To nedokazuje, že je model aktuálně poskytován aktivní upstreamovou službou. Offline — porovnává se s `config/quality/model-lifecycle.json`, který se ručně aktualizuje pomocí `npm run quality:refresh-model-lifecycle` (vyžaduje síť; není zapojeno do CI). `allowedRetiredInCatalog` je postupně zpřísňovaná pojistka: záznam přidávejte pouze společně s odpovídajícím sledovacím issue.                                                                                                                                | Ano                                          |
| `check:fetch-targets`             | Každé `fetch("/api/...")` v klientské části `src/` odkazuje na skutečný soubor `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ano                                          |
| `check:deps`                      | Všechny závislosti instalovatelné pomocí `npm install` ze všech souborů `package.json` v repozitáři jsou uvedeny v `dependency-allowlist.json`; nové závislosti bez připnuté verze nebo balíčky podezřelé ze slopsquattingu jsou označeny                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ano                                          |
| `audit:deps`                      | Audit npm všech pěti nezávislých lockfile souborů (kořenový adresář, Electron, pluginy OpenCode v1/v2 a poskytovatel). Kritická upozornění proces blokují; upozornění s vysokou závažností zůstávají viditelnými varováními. Chybějící nebo neúspěšné audity mají stav INCOMPLETE a proces blokují; hashe lockfile souborů a sestavy se uchovávají samostatně pro každý rozsah.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ano                                          |
| `check:lockfile`                  | Integrita souboru `package-lock.json` — registr https, integritní hashe, žádná přepsání hostitele                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ano                                          |
| `check:licenses`                  | Seznam povolených licencí SPDX pro produkční závislosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ano                                          |
| `check:tracked-artifacts`         | Žádné artefakty sestavení ani verzované symbolické odkazy na `node_modules` (spouští se také v husky pre-commit; pre-push je záměrně nenáročný — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ano                                          |
| `check:ai-attribution`            | Žádná patička `Co-Authored-By` od AI/bota ani patička o vygenerování AI v commitech, názvu či těle PR — pevné pravidlo č. #16 (ve smyčce rychlých kontrol v `quality.yml` pro PR→`release/**` — čte datovou část události, mimo PR neprovádí žádnou akci — a krok pouze pro PR v kontrole lint souboru `ci.yml` pro PR→`main`; také hook husky `commit-msg`; lidští spoluautoři jsou povoleni; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:vitest-exclusions`         | Každé vyloučení Vitest uvádí sledovaný problém a je uvedeno v `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ano                                          |
| `check:file-size`                 | Zdrojové soubory (`.ts`/`.tsx` v `src/`, `open-sse/`, `electron/`, `bin/`) nepřekračují limit `cap` a testovací soubory (`*.test.ts(x)`) limit `testCap`; soubory zmrazené v `file-size-baseline.json` (`frozen` / `testFrozen`) nesmějí překročit svou zaznamenanou velikost                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ano                                          |
| `check:error-helper`              | Chybové odpovědi v executorech/handlerech používají `buildErrorBody()` / `sanitizeErrorMessage()` (Pevné pravidlo č. #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ano                                          |
| `check:migration-numbering`       | Migrační SQL soubory jsou číslovány postupně, bez mezer nebo duplicit                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ano                                          |
| `check:public-creds`              | Mimo `publicCreds.ts` se nenachází žádné doslovně zadané OAuth údaje `client_id`/`client_secret` ani webové klíče Firebase (Pevné pravidlo č. #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ano                                          |
| `check:db-rules`                  | Mimo moduly `src/lib/db/` se nepoužívá nezpracované SQL; žádné souhrnné importy z `localDb.ts` (Pevná pravidla č. #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ano                                          |
| `check:known-symbols`             | Executory poskytovatelů, strategie směrování a překladače registrované ve svých dispatch tabulkách odpovídají souborům na disku — žádné osiřelé ani nedeklarované symboly                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ano                                          |
| `check:route-guard-membership`    | Každá trasa, která spouští podřízený proces, je klasifikována pomocí `isLocalOnlyPath()` (Pevná pravidla č. #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ano                                          |
| `check:test-discovery`            | Každý soubor `*.test.ts` / `*.spec.ts` v repozitáři je zachycen alespoň jedním spouštěčem testů (ratchet: seznam osiřelých souborů v `test-discovery-baseline.json` se může pouze zmenšovat)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ano                                          |
| `check:test-tla-order`            | Žádný soubor `node:test` v `tests/unit` nezaregistruje test, nenarazí na `await` na nejvyšší úrovni a poté nezaregistruje další testy (#18045; ratchet: `test-tla-order-allowlist.json` se může pouze zmenšovat)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ano                                          |
| `check:agent-skills-sync`         | Vygenerované artefakty dovedností agentů odpovídají svému zdrojovému katalogu (bez odchylek)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:provider-asset-provenance` | Loga/assetty poskytovatelů mají zaznamenaný údaj o původu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `lint:json`                       | Konfigurační soubory JSON lze zpracovat a splňují pravidla lintování repozitáře                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `typecheck:core`                  | Kompilace TypeScriptu bez chyb (pouze informativní varování)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ano                                          |
| `typecheck:noimplicit:core`       | Striktní `noImplicitAny` — zaměřeno do budoucna; mnoho již existujících míst volání stále potřebuje anotace                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | **Informativní** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` omezené na `src/app/(dashboard)/**` (#7033) — pečlivě sestavený seznam 27 povolených souborů v `typecheck:core` nezahrnuje žádné dashboardové TSX a ani `next build` u nich nikdy nekontroluje typy (`next.config.mjs` nastavuje `ignoreBuildErrors: true`), takže regrese osiřelých identifikátorů (#6625/#6909) nebyly pro CI viditelné. Porovnává se se zmrazenou výchozí hodnotou počtu chyb pro každý soubor a kód TS (`config/quality/dashboard-typecheck-baseline.json`, stejný vzor kontroly zastaralosti jako u `check:known-symbols`) — bránu zablokují pouze NOVÉ chyby nad rámec výchozího počtu; po opravě již existující chyby snižte výchozí hodnotu pomocí `--update`.                                                                                                                                                                                                                                                                                                                                                              | Ano                                          |
| `check:build-typecheck`           | Kontrola typů produkční aplikace jako celku nad `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), kterou nepokrývá povrchový seznam 27 povolených souborů `typecheck:core` ani kontrola dashboardu. Porovnává změny s `config/quality/build-typecheck-baseline.json`; nový nebo zvýšený počet pro dvojici (soubor, kód) způsobí selhání, nižší počet vás vyzve ke snížení základní hodnoty. `--update` odmítne pokračovat, pokud běh obsahuje novou nebo zvýšenou dvojici, dokud není předán `--force-regressions`, a odmítne nově potlačený soubor, dokud není předán `--force-nocheck`; rozšíření základní hodnoty za účelem dosažení úspěšného výsledku a udělení trvalého potlačení jsou tedy dva samostatné záměrné kroky. Samotný `--force` je odmítnut. Kontrola také prohledává rozsah sestavení kvůli `@ts-nocheck` podle `config/quality/ts-nocheck-baseline.json`, protože soubor, který jej používá, nevykazuje vůbec žádné diagnostické zprávy a jinak by byl pro všechny kontroly neviditelný. | Ano                                          |

#### Dva programy kontroly typů odpovídají odlišně

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) a `check:build-typecheck` kompilují odlišné programy s odlišnými
volbami a stejný soubor může být v jednom bez chyb a v druhém jich mít plno.

`tsconfig.build.json` nastavuje `"strict": false`, takže `noImplicitAny` je vypnuté. Základní konfigurace
kompiluje kurátorovaný seznam 27 povolených souborů s přísnějšími volbami a sleduje graf
importů každé položky, takže se tam kontrolují i soubory, které se v programu sestavení
nikdy neobjeví.

Důsledek je důležitý při posuzování, zda je soubor typovaný: **nula diagnostických zpráv
v rámci `check:build-typecheck` neznamená nulu**. Odstranění `@ts-nocheck` z 26
souborů ukázalo, že 23 z nich je v programu sestavení bez chyb; šestnáct z nich
však v přísnějším programu odhalilo přibližně 120 chyb typu implicit-any. Před
prohlášením souboru za bezchybný zkontrolujte obojí.

### Úloha: `quality-gate`

Spouští se po `test-coverage`. Při selhání blokuje sloučení.

| Skript                       | Ověřuje                                                                                                                                                   | Blokující               |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `quality:collect`            | Vytváří `quality-metrics.json` (počet varování ESLint, pokrytí ze sloučené zprávy dílčích běhů)                                                           | Ano (předchází západce) |
| `quality:ratchet`            | Žádná metrika v `quality-baseline.json` se nezhoršila (varování ESLint ≤ výchozí hodnota; pokrytí ≥ výchozí hodnota)                                      | Ano                     |
| `check:duplication`          | Duplikace kódu (jscpd@4) nepřekračuje výchozí hodnotu v `quality-baseline.json`                                                                           | Ano                     |
| `check:complexity`           | Cyklomatická složitost na úrovni souborů nepřekračuje limit (základní pravidla ESLint `complexity` + `max-lines-per-function`)                            | Ano                     |
| `check:cognitive-complexity` | Západka kognitivní složitosti (`eslint-plugin-sonarjs`) — samostatný průchod ESLint; CI spouští oba společně jako jediný krok `check:complexity-ratchets` | Ano                     |
| `check:dead-code`            | Západka nepoužitých exportů / souborů (knip) se oproti výchozí hodnotě nezhoršila                                                                         | Ano                     |
| `check:compression-budget`   | Limit benchmarku komprese — minimální úspory tokenů pro jednotlivé enginy se nesmí zhoršit                                                                | Ano                     |
| `check:type-coverage`        | Západka procenta typovaného kódu (`type-coverage`) se nezhoršila; z velké části nahrazuje `typecheck:noimplicit:core`                                     | Ano                     |

### Úlohy: `codeql-scan` a `codeql-admission`

`codeql-scan` vytváří všechny nakonfigurované kategorie analýz. Po úspěchu této úlohy `codeql-admission` ověří její přesné uploady a ratchet upozornění kandidáta. Obě jsou povinnými závislostmi `Gate / CI`, včetně kandidátů měnících pouze dokumentaci. Požadavky na administrativní aktivaci a canary zkoušku jsou popsány níže pod „CodeQL ratchet“.

| Skript                 | Ověřuje                                                                                                                                                                                           | Blokující |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:codeql-ratchet` | Ref/SHA kandidáta a všechny nakonfigurované kategorie analýz musí být před ratchetem upozornění aktuální; chybějící důkaz blokuje. Globální inventář zůstává oddělený — viz „CodeQL ratchet“ níže | Ano       |

### Úloha: `quality-extended`

Úloha blokuje relevantní kandidáty. Velikost balíčku, nálezy tajných údajů, nálezy
zranitelností, nálezy v pracovních postupech a změny OpenAPI se kontrolují pomocí povinných západek.
Diagnostika kruhových závislostí zůstává pouze informativní. Instalace skenerů je povinná:
`scripts/ci/install-quality-scanners.sh` zajišťuje konkrétní připnuté verze a propaguje
selhání instalace. Chybějící nástroje, neplatné zprávy nebo chybějící výchozí hodnoty ponechají
povinnou bránu skeneru ve stavu INCOMPLETE.

| Skript                   | Ověřuje                                                                                                                                                                                                                                  | Blokování                                             |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `check:circular-deps`    | Žádné cyklické závislosti (dpdm)                                                                                                                                                                                                         | **Doporučující**                                      |
| `check:bundle-size`      | Velikost balíčku nepřekračuje limit; nedostupné měření způsobí selhání                                                                                                                                                                   | **Blokující s --ratchet**                             |
| `check:secrets`          | Nálezy Gitleaks se nezhoršují; povinné kontroly odmítnou chybějící nástroje, zdroj či výchozí stav, neúspěšné kontroly a neplatné reporty                                                                                                | **Blokující s --ratchet**                             |
| `check:vuln-ratchet`     | Zranitelnosti závislostí se nezhoršují; povinné kontroly odmítnou chybějící nástroje, neplatné reporty nebo chybějící výchozí stavy                                                                                                      | **Blokující s --ratchet**                             |
| `check:workflows`        | Lint workflow (actionlint + zizmor); chybějící či nefunkční skenery, neplatné reporty nebo chybějící výchozí stav ratchetu způsobí selhání jako INCOMPLETE. Platné nálezy se řídí zvolenou striktní, doporučující nebo ratchet politikou | Spuštění je povinné; ratchet zizmor je v CI blokující |
| `check:openapi-breaking` | Veřejný kontrakt API vůči připnutým commitům událostí (merge-base pro PR, předchozí commit pro push, základ merge-group; u plánovaného/ručního spuštění první rodič checkoutu); povinné měření při selhání vše zablokuje                 | **Blokující s --ratchet**                             |

### Zaměstnání: `docs-sync-strict`

Pro žádosti o stažení do `main` nebo `release/**` se tato úloha spouští pouze pro kandidáty bez konceptu (nebo důvěryhodné fronty) klasifikované jako změny dokumentace nebo kódu. To také běží na non-PR události CI ; spouštěcí tlačítko tohoto pracovního postupu pokrývá pouze `main`, nikoli `release/**`. Krok, který opustí nenulovou hodnotu, zablokuje úlohu; nálezy pouze pro zprávy a níže uvedené zdokumentované výjimky ne.

| Skript                         | Ověřuje                                                                                                                                                                                                                                                                                                                                                                                                                                       | Blokování                                                                                                                          |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-brána, která postupně spouští 7 dílčích bran uvedených níže                                                                                                                                                                                                                                                                                                                                                                              | Ano                                                                                                                                |
| ↳ `check:docs-sync`            | Konzistence verze Package/OpenAPI/CHANGELOG, přesná zrcadla `llm.txt`, přeložené invarianty CHANGELOG section/size a absence nahrazených duplicitních dokumentů                                                                                                                                                                                                                                                                               | Ano                                                                                                                                |
| ↳ `check:docs-frontmatter`     | Kompilované stránky dokumentace nesou platné tituly frontmatter                                                                                                                                                                                                                                                                                                                                                                               | Ano                                                                                                                                |
| ↳ `check:docs-counts`          | Invarianty vysoce spolehlivého počtu jsou přísné; heuristické kontroly počtu souborů pouze varují, pokud skript neobdrží `--strict` (metabrána CI ji neprojde)                                                                                                                                                                                                                                                                                | Přísné blokování úrovní; soft tier poradenství                                                                                     |
| ↳ `check:env-doc-sync`         | Čtení zdrojového env, `.env.example` a `docs/reference/ENVIRONMENT.md` souhlasí po explicitních seznamech povolených ignorovat, pouze dokumenty a pouze env                                                                                                                                                                                                                                                                                   | Ano, mimo zdokumentované seznamy povolených                                                                                        |
| ↳ `check:deprecated-versions`  | Hlásí potenciální zastaralé verze mimo bezpečný historický kontext a zastaralá data aktualizací, s výjimkou ignorovaných dokumentů                                                                                                                                                                                                                                                                                                            | Poradenství v aktuální elektroinstalaci CI (`--strict` neprošlo)                                                                   |
| ↳ `check:doc-links`            | Interní odkazy na snížení v dokumentech se přenesou na skutečné soubory (forma `[text]`/`(path)` )                                                                                                                                                                                                                                                                                                                                            | Ano                                                                                                                                |
| ↳ `check:fabricated-docs`      | V kódové základně existují trasy, env vars, příkazy CLI, názvy háčků a cesty k souborům citované v dokumentech. Pevná brána přes `--strict`; soft-fail bez vlajky.                                                                                                                                                                                                                                                                            | Ano (přes `--strict` v CI)                                                                                                         |
| `check:cli-i18n`               | Klíče `t()` používané v CLI existují v `en`; `pt-BR` zachovává všechny sekce nejvyšší úrovně; `zh-CN` a `zh-TW` obsahují všechny klíče z `en`                                                                                                                                                                                                                                                                                                 | Ano                                                                                                                                |
| `check:openapi-coverage`       | Specifikace OpenAPI pokrývá alespoň ratchetem stanovenou minimální hranici skutečných tras                                                                                                                                                                                                                                                                                                                                                    | Ano                                                                                                                                |
| `check:openapi-security-tiers` | Deklarované anotace `x-loopback-only`/`x-always-protected` musí být podloženy souborem `routeGuard.ts`; chyby parseru a neshody při dopředné kontrole blokují. Zpětná kontrola chybějícího `x-loopback-only` pod prefixy určenými pouze pro místní přístup varuje a trasy definované pouze vzorem jsou z tohoto zpětného průchodu vyloučeny.                                                                                                  | Kontroly parseru a dopředné kontroly blokují; zpětná kontrola pouze upozorňuje                                                     |
| `check:openapi-routes`         | Každá cesta `/api...` v `openapi.yaml` odpovídá skutečné trase bez ohledu na parametry po uplatnění odůvodněného seznamu výjimek `KNOWN_STALE_SPEC`; neaktuální položky seznamu také způsobí selhání                                                                                                                                                                                                                                          | Ano                                                                                                                                |
| `check:docs-symbols`           | Interní odkazy URL `/api/...` v kanonické dokumentaci, která není zrcadlovou kopií, odpovídají skutečné trase nebo rodině tras; odkazy na proxy/upstream/zástupné hodnoty/soubory a odůvodněné položky `KNOWN_STALE_DOC_REFS` jsou vyloučeny a neaktuální položky seznamu výjimek způsobí selhání                                                                                                                                             | Ano                                                                                                                                |
| `i18n translation drift`       | Absolutní přístup vyžaduje nulový zdroj, chybějící cíl, cílový hash, zastaralý překlad a nekonzistence mezipaměti sekcí. Běžná příprava PR může uchovat přesné zděděné důkazy nebo pouze v angličtině čekající změnu s nezměněným úplným stavem a cílovými bajty; jeho zpráva samostatně deklaruje připravenost ke sloučení. Chybějící cílové hodnoty hash a neúplný základní důkazní blok. Chybějící mezipaměť starších sekcí není selháním. | Všech pět tříd blokuje vstup queue/base ; běžná příprava umožňuje pouze prokázanou zděděnou nebo pouze v angličtině čekající práci |

Vygeneruje se dvanáct README SVGs pod `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` je všechny regeneruje). Každý z nich má test jednotky porovnáním bajtů (`tests/unit/docs/readme-*-svg.test.ts`, úloha `test-unit`), který selže, když je potvrzený soubor zastaralý, a `check:docs-counts` čte kanonická čísla z jejich uzlů `<text>` — což je důvod, proč krok obrysu udržuje každý načrtnutý řetězec v souboru jako neviditelný `<text>`. Kontrola kanonických čísel SVG čte soubory uvedené v `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` a `tier-flow-light.svg`; tvrzení o bezplatných navždy, o vstupu do katalogu, o opakujícím se fondu a o faktorech bodování také o `promise-pillars.svg`, `free-tier-budget.svg` a `strategies-grid.svg`. `free-tier-budget.svg` čerpá své údaje ze zavaděče živého katalogu, takže změna na `FREE_MODEL_BUDGETS` nebo na zobrazovaný název poskytovatele zčervená CI dokud se tento soubor nevygeneruje.

### Úloha: `i18n-ui-coverage`

| Skript                            | Ověřuje                                                                                                                                                                                                     | Blokující     |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check-ui-keys-coverage` (inline) | Pokrytí klíčů i18n uživatelského rozhraní je ≥ 65 %                                                                                                                                                         | Ano           |
| `check-ui-value-drift` (inline)   | Přepsaná anglická **hodnota** nezanechá žádný zastaralý překlad                                                                                                                                             | Ano           |
| `check-new-key-coverage` (inline) | **Nový** anglický klíč je přeložen ve všech lokalizacích — značka `__MISSING__:` je odmítnuta                                                                                                               | Ano           |
| `check-translation-ratio`         | Podíl skutečných překladů v jednotlivých lokalizacích (položky shodné s angličtinou / zástupné / chybějící mimo seznam výjimek) nesmí překročit `config/quality/i18n-translation-baseline.json` + toleranci | **Blokující** |

Vyžaduje `fetch-depth: 0` — kontrola změn hodnot porovnává `en.json` se společným předkem.

#### `check-ui-value-drift` — brána pro kontrolu zastaralých překladů

Zachytává jeden typ regrese i18n, který ostatní kontroly ze své podstaty nemohou odhalit: anglická hodnota
je přepsána, ale překlady odvozené z _předchozí_ anglické verze zůstanou zachovány, takže
uživatelé používající jiné jazyky nadále čtou sebejistě formulovaný, ale nyní nesprávný text.

K tomu skutečně došlo v produkci. `oauthModal.googleOAuthWarning` byl přepsán při přidání pomocníka
pro přihlášení Antigravity (#5203); **39 ze 43 lokalizací** si ponechalo text, který operátorům říkal, aby „zkopírovali
celou adresu URL a vložili ji níže“ — postup, který u tohoto poskytovatele nelze dokončit. Problém
zůstal bez povšimnutí až do #8463, protože:

- `sync-ui-keys` doplňuje pouze klíče, které **chybějí**, nikdy ty, které jsou **zastaralé**;
- `check-ui-keys-coverage` počítá _přítomnost_ klíčů, takže zastaralý překlad se počítá jako pokrytý;
- `check-translation-drift` sleduje zrcadla dokumentace `docs/i18n/<locale>/**.md` —
  nikdy nečte `src/i18n/messages/*.json`. Od opětovné synchronizace v 2026-09 je v úloze `docs-sync-strict` blokující:
  upravte základní dokument → `npm run i18n:run -- --files=<doc>` (po sekcích, nenáročné).

**Bere v úvahu rozdíly, nikoli výchozí stav.** Porovnává `en.json` ve společném předkovi
s pracovním stromem; pro každý klíč, jehož anglická hodnota se změnila, je každá lokalizace, která stále obsahuje
nezměněný překlad, považována za zastaralou. Tím se záměrně **zmrazí již existující dluh** — z rozdílu
nelze určit, ze které staré anglické verze dlouhodobě existující překlad pochází, takže kontrola posuzuje
pouze to, čeho se dotýká aktuální změna. Alternativa (výchozí stav s hashem pro každý klíč) by vyžadovala
generovaný soubor o velikosti přibližně 600 KB, tedy trojnásobek největšího existujícího výchozího souboru, který by se měnil při každém PR s i18n.

Kontrolu lze splnit dvěma způsoby:

1. aktualizovat dotčené překlady, nebo
2. nastavit je na `__MISSING__:<new english>` — běhové prostředí pak poskytne opravenou anglickou verzi
   (`src/i18n/request.ts::deepMergeFallback`, #7258) a klíč bude zařazen do fronty k překladu.

Pokud se změnil **význam** řetězce, je vhodnější **přejmenovat klíč**: nový klíč nemůže zdědit
zastaralý překlad. Tento postup byl použit v #8463.

```bash
npm run i18n:check-value-drift          # striktní (spouští CI)
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

### Práce: `i18n`

Plná ověřovací matice i18n (jedna úloha na národní prostředí). Celá práce je poradenská.

| Skript                          | Ověřuje                                    | Blokování                                              |
| ------------------------------- | ------------------------------------------ | ------------------------------------------------------ |
| `validate_translation.py quick` | Úplnost překladu podle národního prostředí | **Poradní** (`continue-on-error: true` na celou práci) |

### Práce: `pr-test-policy`

Spouští se pouze na žádostech o stažení.

| Skript                 | Ověřuje                                                                                                                                 | Blokování |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PRs, které mění produkční kód v `src/`, `open-sse/`, `electron/` nebo `bin/` musí zahrnovat nebo aktualizovat testy (Tvrdé pravidlo #8) | Ano       |
| `check:test-masking`   | Změněné testovací soubory nesnižují počet čistých aktiv ani nepřidávají tautologie `assert.ok(true)`                                    | Ano       |
| `check:pr-evidence`    | PR body cituje test/VPS důkazy pro změnu (mechanizuje Hard Rule #18 greppingem PR prose — fragile, viz Backlog)                         | Ano       |

### Úloha: `test-vitest`

Vyžaduje úlohu klasifikace `changes`. Příslušné části matice při selhání zablokují sloučení.

| Sada             | Ověřuje                                                  | Blokující                                                                                                                   |
| ---------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Server MCP (110 nástrojů), autoCombo, cache — běh vitest | Ano                                                                                                                         |
| `test:vitest:ui` | Testy komponent UI — běh vitest                          | **Blokující** — již existující selhání jsou explicitně vyloučena v `vitest.config.ts`; nová selhání úlohu ukončí neúspěchem |

### Noční pracovní postupy (plánované, poradenské)

Ty běží podle plánu cron (a `workflow_dispatch`), nikdy ne na PRs. Všechny jsou poradní.

| Pracovní postup        | Ověřuje                                                                                                                                                                   | Blokující        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | testy vlastností fast-check s náhodným seedem a vysokým počtem spuštění                                                                                                   | **Doporučující** |
| `nightly-resilience`   | kontrolu růstu haldy, chaotické vkládání chyb, zátěžové a dlouhodobé testy k6                                                                                             | **Doporučující** |
| `nightly-llm-security` | ochranu promptfoo proti injekcím (režim blokování) + sondy garak (přeskočeny bez tajného klíče poskytovatele)                                                             | **Doporučující** |
| `nightly-schemathesis` | fuzzing kontraktu OpenAPI (schemathesis) proti spuštěné instanci OmniRoute pomocí `docs/openapi.yaml` — odhaluje porušení specifikace / neošetřené chyby 500 (Fáze 8 B.4) | **Doporučující** |
| `nightly-mutation`     | skóre mutačního testování Stryker nad rychlou sadou jednotkových testů — přeživší mutanty odhalují slabá tvrzení                                                          | **Doporučující** |
| `nightly-compat`       | matici kompatibility enginu Node napříč podporovanými rozsahy `engines.node`                                                                                              | **Doporučující** |

Výkonnostní referenční hodnoty (halda, TTFB, doba sestavení) se zaznamenávají, ale nejsou blokující: viz [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
