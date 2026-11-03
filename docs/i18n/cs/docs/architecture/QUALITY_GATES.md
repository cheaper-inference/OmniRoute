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

## Inventář gate a profily provádění

### Přijetí kandidáta

Workflows CI a Quality Gates každý vydává stabilní verdikt: `Gate / CI` a
`Gate / Quality`. Jejich verzovaná zásada přijetí uvádí každou nadřazenou úlohu jako
povinnou nebo poradní. Použitelná povinná úloha musí uspět: chybějící,
zrušené, přeskočené, čekající a neznámé výsledky nemohou stanovit PASS. Platná
klasifikace pouze pro dokumentaci nebo pouze pro katalog může označit kódovou větev jako nepoužitelnou;
draft PR není přijatým kandidátem. Štítek `hotfix` nepromíjí chybějící důkazy.

Oba workflows pokrývají PR do větví main/release, push do `main`, ruční spuštění
a události merge-group. Push, dispatch a merge-group spouštějí úplný výběr.
Pushe do `release/**` je nespouštějí (2026-10-18): každá změna již proběhla maticí ve svém PR
a sloučená kombinace je úkolem Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane).
Forky a merge groups používají hostované runnery pro úlohy, které by jinak vybíraly self-hosted
runnery; před zavedením musí být ověřena dostatečná kapacita hostovaných runnerů.

Každý JSON receipt identifikuje checkoutnutý SHA, běh workflow a pokus.
CLI odmítne nesoulad SHA checkoutu a události. Testy workflow vážou členství v zásadě
na seznam `needs` úlohy s verdiktem, takže nová nebo odebraná větev nemůže tiše zmizet.
Receipts pokrývají vlastní workflow, nikoli publikování, nasazení ani interní fungování
existujícího poradního skeneru. Aktivace obou názvů kontrol v pravidlech větve je
samostatná administrativní změna; přidání těchto úloh samo o sobě větev nechrání.

### Inventář statických skenů

Verzovaný inventář npm aliasů a členství ve statickém skenu se nacházejí v
`config/quality/gate-manifest.json`. Spusťte `npm run check:gate-manifest` pro ověření
názvů skriptů a přesných příkazů vůči `package.json`; přidání, odebrání a změna příkazů
způsobí selhání lokálního hooku i úloh klasifikace změn v CI.
Alias není úloha workflow, instance matice ani testovací případ: tyto počty
nesmí být prezentovány jako zaměnitelné.

Použijte `npm run quality:scan -- --list` nebo `npm run quality:scan:fast -- --list`
pro kontrolu vybraných aliasů bez jejich spuštění. Runner vyvolává npm entrypoint, takže jeho runtime
(včetně Bunu tam, kde je nakonfigurován) zůstává zachován.
Manifest zaznamenává aliasy mimo tyto profily jako samostatně vyvolávané
a v profilech skenů pouze pro čtení jsou údržbové příkazy zakázány.

Tyto profily pokrývají pouze statický sken. Nepotvrzují produktové testy,
pokrytí, balení, externí kontroly ani úplné přijetí kandidáta pro release.
Přijetí workflow používá propojené `config/quality/admission-policy.json` a
`scripts/quality/admission-verdict.mjs`. Profily Release-observer zůstávají oddělené;
jejich použitelné kontroly a receipts kontrolujte nezávisle. Níže uvedený slovní
inventář je referenční a není důkazem, že se gate skutečně spustil.

Skripty jsou umístěny v `scripts/check/` (policy gates) a `scripts/quality/` (ratchet engine).
Jediným zdrojem pravdy pro CI je `.github/workflows/ci.yml`.

### Zrychlená cesta release PR (`quality.yml`)

`.github/workflows/quality.yml` doplňuje CI pro PR do větví main/release, push do `main`,
dispatch a merge groups. PR používají rychlé kontroly filtrované podle cest. Trvale
zakázaný duplicitní build byl odstraněn; skutečné kontroly buildu/balení/spuštění zůstávají v CI.

| Úloha                                            | Rozsah                                                                                                                                                                                            | Blokující         |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `Docs Gates (fast-path)`                         | PR dokumentace/kódu; reference API dokumentace a docs-all                                                                                                                                         | Ano               |
| `Fast Quality Gates`                             | PR kódu; statické kontroly, typecheck, typecheck dashboardu, dotčené unit testy                                                                                                                   | Ano               |
| `Forgotten sibling tests`                        | PR kódu; změněné moduly vysledované ke statickým konzumentům a kandidátní související testy; cesty barrel a dynamic-import jsou hlášeny jako poradní diagnostika s uvedenými výjimkami allowlistu | **Poradní**       |
| `Vitest (fast-path)`                             | PR kódu; rychlá sada vitest                                                                                                                                                                       | Ano               |
| `Unit Tests fast-path`                           | PR kódu; unit sada rozdělená do 4 shardů                                                                                                                                                          | Ano               |
| `No new ESLint warnings`                         | PR kódu; lint guard zohledňující potlačení                                                                                                                                                        | Ano, včetně forků |
| `Merge integrity (changelog + generated skills)` | Nedraftové PR; synchronizace changelogu a generovaných skills                                                                                                                                     | Ano, včetně forků |

#### Report Forgotten sibling tests

`npm run check:forgotten-sibling-tests` znovu používá resolver importů, který stojí za mapou dopadu testů.
Pro každý změněný produkční modul hlásí deterministické řetězce
`changed module/symbol -> static consumer -> candidate sibling test`, pokud kandidátní
test chybí v diffu pull requestu. Souhrn v Markdownu a výsledek ve formátu JSON se uchovávají jako
artefakt workflow `forgotten-sibling-tests` pro kalibraci před jakýmkoli zavedením blokování.

Reexporty z barrel souborů a dynamické importy slouží pouze jako diagnostika rozlišení; nikdy nevytvářejí
blokující nález. Kontrolované výjimky jsou uvedeny v
`config/quality/forgotten-sibling-allowlist.json`. Každá položka musí uvádět consumer a kandidátní
test, obsahovat konkrétní odůvodnění a odkaz na issue nebo pull request na GitHubu. Chybně formátované položky
způsobí neúspěch s uzavřeným výchozím stavem. Výjimky nemohou potlačit smazaný kandidátní test ani diff,
který přidává `.skip`/`.todo`; oslabování asercí a další maskování zůstávají v gesci samostatně blokující
kontroly `check:test-masking`.

### Úloha: `lint`

Spouští se při každém PR do `main`. Při neúspěchu blokuje sloučení.

| Skript (`npm run ...`)            | Ověřuje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Blokující                                    |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:node-runtime`              | Verze Node.js je v podporovaném rozsahu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ano                                          |
| `check:cycles`                    | Cyklické importy napříč celými adresáři `src/` + `open-sse/` (založené na AST, s rozlišením `paths` z tsconfigu). Samostatné spuštění skončí s kódem 1 vždy, když existuje jakýkoli cyklus (od #15281 se při chybě nepokračuje), a vypíše komponenty SCC. `check:cycles:ratchet` (spouští CI) zablokuje kontrolu, když počet překročí limit `metrics.cycles` v `quality-baseline.json` — aktuálně 14, `direction: down`, takže může pouze klesat (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                     | Ano (ratchet)                                |
| `check:boundary`                  | Vazba `open-sse → src`: jedinečné importy mezi soubory z enginu do aplikace (`scripts/quality/measure-boundary.mjs`; seznam hran je backlogem nápravy rozdělení jádra/modulů v4). Samostatné spuštění = informativní report (stejně jako `quality:boundary`). `check:boundary:ratchet` (spouští CI, také ve smyčce ratchet rychlých bran `quality.yml`) zablokuje kontrolu, když počet překročí limit `metrics.boundaryOpenSseToSrc` v `quality-baseline.json` — nastavený na naměřenou hodnotu 771, `direction: down`; `--update` jej pouze snižuje; na PR se používá relativně k základní revizi (`--base-ref`, viz níže)                                                                                                                                                                                                                                                             | Ano (ratchet)                                |
| `check:route-validation:t06`      | Schémata Zod jsou přítomna na všech routách (zásada Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ano                                          |
| `check:any-budget:t11`            | Počet `@ts-expect-error // any` nepřekračuje rozpočet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ano                                          |
| `check:provider-consistency`      | Každý provider v `providers.ts` má odpovídající položku v `providerRegistry.ts` (a naopak, v rámci seznamu povolených položek)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ano                                          |
| `check:model-lifecycle`           | Tři ručně udržované směrovací tabulky zůstávají konzistentní s verzí snímku životního cyklu evidovanou v repozitáři (#11503): `FITNESS_TABLE` (`taskFitness.ts`) neboduje žádné vyřazené id, které může `REGISTRY` směrovat; každý cíl `BUILT_IN_ALIASES` je přítomen v `REGISTRY` a není obsažen ve snímku vyřazených id; každé vyřazené id, které je stále v `REGISTRY`, je přesměrováno nebo uvedeno v `allowedRetiredInCatalog`; a žádný zdroj ani cíl `DEFAULT_DEGRADATION_MAP` se v tomto snímku neobjevuje jako vyřazený. To nedokazuje, že je model aktuálně obsluhován aktivním upstreamem. Offline — porovnává s `config/quality/model-lifecycle.json`, který se ručně aktualizuje pomocí `npm run quality:refresh-model-lifecycle` (síť; není zapojeno do CI). `allowedRetiredInCatalog` je postupně zpřísňovaný mechanismus: položku přidejte pouze s úkolem pro sledování. | Ano                                          |
| `check:fetch-targets`             | Každé `fetch("/api/...")` v klientské části `src/` se překládá na skutečný `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ano                                          |
| `check:deps`                      | Všechny závislosti instalovatelné pomocí `npm install` napříč všemi soubory `package.json` v repozitáři jsou uvedeny v `dependency-allowlist.json`; nové nepřipnuté nebo slopsquatted balíčky jsou označeny                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ano                                          |
| `audit:deps`                      | `npm audit` (kořenový projekt + electron) — žádná upozornění s vysokou nebo kritickou závažností (překrývá se s osv `check:vuln-ratchet`; viz nevyřízené úkoly racionalizace)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ano                                          |
| `check:lockfile`                  | Integrita `package-lock.json` — registr `https`, hashe integrity, žádná přepsání hostitele                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ano                                          |
| `check:licenses`                  | Seznam povolených licencí SPDX pro produkční závislosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ano                                          |
| `check:tracked-artifacts`         | Žádné artefakty sestavení / commitované symbolické odkazy `node_modules` (spouští se také v husky `pre-commit`; `pre-push` je záměrně omezený — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ano                                          |
| `check:ai-attribution`            | Žádná upoutávka `Co-Authored-By` od AI/bota ani zápatí označující generování AI v commitech PR, názvu nebo těle — přísné pravidlo č. 16 (ve smyčce rychlých kontrol `quality.yml` pro PR→`release/**` — čte datovou část události, mimo PR se neprovádí — a jako krok pouze pro PR v lintování `ci.yml` pro PR→`main`; také v hooku husky `commit-msg`; lidští spoluautoři jsou povoleni; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:vitest-exclusions`         | Každé vyloučení Vitest uvádí sledovací issue a objevuje se v `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ano                                          |
| `check:file-size`                 | Zdrojové soubory (`.ts`/`.tsx` v `src/`, `open-sse/`, `electron/`, `bin/`) zůstávají v limitu `cap` a testovací soubory (`*.test.ts(x)`) v limitu `testCap`; soubory zmrazené v `file-size-baseline.json` (`frozen` / `testFrozen`) nesmějí překročit svou zaznamenanou velikost                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ano                                          |
| `check:error-helper`              | Chybové odpovědi v exekutorech/obslužných rutinách používají `buildErrorBody()` / `sanitizeErrorMessage()` (Přísné pravidlo č. 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ano                                          |
| `check:migration-numbering`       | Migrační soubory SQL jsou postupně číslované, bez mezer nebo duplicit                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ano                                          |
| `check:public-creds`              | Mimo `publicCreds.ts` se nenachází žádné literály OAuth `client_id`/`client_secret` ani klíče Firebase Web (Přísné pravidlo č. 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ano                                          |
| `check:db-rules`                  | Mimo moduly `src/lib/db/` se nenachází žádné nezpracované SQL; z `localDb.ts` se nepoužívají importy přes barrel (Přísná pravidla č. 2/5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ano                                          |
| `check:known-symbols`             | Exekutory poskytovatelů, strategie směrování a překladače registrované v jejich dispečerských tabulkách odpovídají souborům na disku — žádné osiřelé nebo nedeclarované symboly                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ano                                          |
| `check:route-guard-membership`    | Každá trasa, která spouští podřízený proces, je klasifikována pomocí `isLocalOnlyPath()` (Přísná pravidla č. 15/17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ano                                          |
| `check:test-discovery`            | Každý soubor `*.test.ts` / `*.spec.ts` v repozitáři je zahrnut alespoň jedním testovacím runnerem (ratchet: seznam osiřelých souborů v `test-discovery-baseline.json` se může pouze zkracovat)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ano                                          |
| `check:test-tla-order`            | Žádný soubor `node:test` v `tests/unit` nezaregistruje test, nedosáhne top-level `await` a poté nezaregistruje další testy (#18045; ratchet: `test-tla-order-allowlist.json` se může pouze zkracovat)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ano                                          |
| `check:agent-skills-sync`         | Generované artefakty agent-skills odpovídají zdrojovému katalogu (bez odchylek)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:provider-asset-provenance` | Loga/prostředky poskytovatelů mají zaznamenanou provenienci                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | Konfigurační soubory JSON lze analyzovat a splňují pravidla lintování repozitáře                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `typecheck:core`                  | Kompilace TypeScriptu bez chyb (pouze informativní varování)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ano                                          |
| `typecheck:noimplicit:core`       | Striktní `noImplicitAny` — do budoucna; mnoho již existujících míst volání stále vyžaduje anotace                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | **Informativní** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` omezené na `src/app/(dashboard)/**` (#7033) — kurátorovaný seznam 27 souborů povolených pro `typecheck:core` neobsahuje žádné dashboardové TSX a `next build` jej také nikdy nekontroluje typově (`next.config.mjs` nastavuje `ignoreBuildErrors: true`), takže regrese osamocených identifikátorů (#6625/#6909) zůstávaly v CI neodhaleny. Rozdíly se porovnávají se zmrazeným výchozím počtem chyb pro každý soubor a každý TS kód (`config/quality/dashboard-typecheck-baseline.json`, stejný vzor vynucování zastaralosti jako u `check:known-symbols`) — selhání brány způsobí pouze NOVÉ chyby nad počet ve výchozím stavu; po opravě existující chyby snižte limit pomocí `--update`.                                                                                                                                                                                      | Ano                                          |

### Úloha: `quality-gate`

Spouští se po `test-coverage`. Při selhání zablokuje sloučení.

| Skript                       | Ověřuje                                                                                                                                                                            | Blokující                 |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | Vygeneruje `quality-metrics.json` (počet varování ESLint, pokrytí ze sloučeného reportu shardů)                                                                                    | Ano (předřazené ratchetu) |
| `quality:ratchet`            | Žádná metrika v `quality-baseline.json` se nezhoršila (počet varování ESLint ≤ výchozí hodnota; pokrytí ≥ výchozí hodnota)                                                         | Ano                       |
| `check:duplication`          | Duplicitní kód (jscpd@4) nepřekračuje výchozí hodnotu v `quality-baseline.json`                                                                                                    | Ano                       |
| `check:complexity`           | Cyklická složitost na úrovni souborů nepřekračuje limit (jádrové pravidlo ESLint `complexity` + `max-lines-per-function`)                                                          | Ano                       |
| `check:cognitive-complexity` | Ratchet kognitivní složitosti (`eslint-plugin-sonarjs`) — samostatný průchod ESLint; CI spouští oba sloučené jako jediný krok `check:complexity-ratchets`                          | Ano                       |
| `check:dead-code`            | Ratchet nepoužívaných exportů / souborů (knip) se oproti výchozímu stavu nezhoršil                                                                                                 | Ano                       |
| `check:compression-budget`   | Rozpočet benchmarku komprese — minimální úspora tokenů pro jednotlivé enginy se nesmí zhoršit                                                                                      | Ano                       |
| `check:type-coverage`        | Ratchet procenta typovaných částí (`type-coverage`) se nezhoršil; z velké části zahrnuje `typecheck:noimplicit:core`                                                               | Ano                       |
| `check:codeql-ratchet`       | Počet otevřených upozornění CodeQL se nezhoršil (čte přes `gh api`; bez tokenu se korektně přeskočí) — frekvenci obnovování a ruční spuštění najdete níže v části „ratchet CodeQL“ | Ano                       |

### Úloha: `quality-extended`

Celá úloha je pouze informativní (`continue-on-error: true`). Ratchety založené na npm se spouštějí skutečně; externí skenery se instalují přes `gh release download` a samy se přeskočí (exit 0), pokud binární soubor stále chybí.

| Skript                   | Ověřuje                                                                                                                                                                                                         | Blokující                                       |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `check:circular-deps`    | Žádné kruhové závislosti (dpdm)                                                                                                                                                                                 | **Informativní**                                |
| `check:bundle-size`      | Velikost bundlu nepřekračuje limit                                                                                                                                                                              | **Informativní**                                |
| `check:secrets`          | Skenování tajných údajů (gitleaks) — přeskočí se, pokud binární soubor chybí                                                                                                                                    | **Informativní**                                |
| `check:vuln-ratchet`     | Zranitelnosti závislostí (osv-scanner) se nezhoršily — přeskočí se, pokud binární soubor chybí                                                                                                                  | **Informativní**                                |
| `check:workflows`        | Lint workflow (actionlint + zizmor); chybějící nebo nefunkční skenery, neplatné reporty či chybějící výchozí ratchet selžou jako INCOMPLETE. Platné nálezy se řídí vybranou zásadou strict/informativní/ratchet | Vyžaduje provedení; ratchet zizmor v CI blokuje |
| `check:openapi-breaking` | Zpětně nekompatibilní změny veřejného API kontraktu (`openapi.yaml`) oproti základní větvi (oasdiff) — generuje `openapiBreaking=N`; přeskočí se, pokud oasdiff chybí nebo nelze vyřešit základní specifikaci   | **Informativní**                                |

### Úloha: `docs-sync-strict`

Spouští se při každém PR do `main`. Při selhání zablokuje sloučení.

| Skript                         | Ověřuje                                                                                                                                                                                            | Blokující                  |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | Meta-brána, která postupně spouští 6 níže uvedených dílčích bran                                                                                                                                   | Ano                        |
| ↳ `check:docs-sync`            | Konzistence verzí CHANGELOG / OpenAPI / llm.txt                                                                                                                                                    | Ano                        |
| ↳ `check:docs-counts`          | Počty v textu (počet poskytovatelů, počet migrací atd.) jsou v rámci tolerančního okna oproti skutečným počtům                                                                                     | Ano                        |
| ↳ `check:env-doc-sync`         | Každá proměnná prostředí v `.env.example` je popsána v tabulce dokumentace a naopak                                                                                                                | Ano                        |
| ↳ `check:deprecated-versions`  | V dokumentaci nejsou žádné řetězce zastaralých verzí                                                                                                                                               | Ano                        |
| ↳ `check:doc-links`            | Interní odkazy na Markdown v dokumentaci vedou na existující soubory (formát `[text]`/`(path)`)                                                                                                    | Ano                        |
| ↳ `check:fabricated-docs`      | Cesty, proměnné prostředí, příkazy CLI, názvy hooků a cesty k souborům uvedené v dokumentaci existují v kódové základně. Přísná brána přes `--strict`; bez tohoto příznaku selhání pouze upozorní. | Ano (přes `--strict` v CI) |
| `check:cli-i18n`               | Řetězce příkazů CLI jsou přítomné ve všech lokalizačních souborech i18n                                                                                                                            | Ano                        |
| `check:openapi-coverage`       | Specifikace OpenAPI pokrývá alespoň stanovené minimum skutečných rout                                                                                                                              | Ano                        |
| `check:openapi-security-tiers` | Anotace úrovní zabezpečení v `openapi.yaml` jsou konzistentní s klasifikacemi v `routeGuard.ts`                                                                                                    | **Doporučující**           |
| `check:openapi-routes`         | Každá cesta v `openapi.yaml` vede na skutečný `route.ts` (ochrana proti halucinacím)                                                                                                               | Ano                        |
| `check:docs-symbols`           | Každý odkaz `/api/...` v `docs/**/*.md` vede na skutečný `route.ts` (ochrana proti halucinacím)                                                                                                    | Ano                        |
| `i18n translation drift`       | Nepřeložené klíče v lokalizačních souborech i18n — pouze upozornění                                                                                                                                | **Doporučující**           |

Dvanáct README SVG pod `docs/diagrams/` je generováno (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` je všechny znovu vygeneruje). Každý z nich má jednotkový test porovnávající jednotlivé bajty
(`tests/unit/docs/readme-*-svg.test.ts`, úloha `test-unit`), který selže, když je soubor v repozitáři zastaralý, a
`check:docs-counts` čte kanonická čísla z jejich uzlů `<text>` — proto krok převodu na obrysy ponechává každý řetězec převedený na obrysy v souboru jako neviditelný `<text>`. Kontrola kanonických čísel SVG čte soubory uvedené v
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, a také `public/images/tier-flow-dark.svg` a `tier-flow-light.svg`;
tvrzení týkající se free-forever, catalog-entry, recurring-pool a scoring-factors rovněž čtou
`promise-pillars.svg`, `free-tier-budget.svg` a `strategies-grid.svg`. `free-tier-budget.svg`
čerpá své údaje z načítače živého katalogu, takže změna `FREE_MODEL_BUDGETS` nebo zobrazovaného názvu poskytovatele způsobí selhání CI, dokud nebude tento soubor znovu vygenerován.

### Úloha: `i18n-ui-coverage`

| Skript                            | Ověřuje                                                                                                                                                                                                           | Blokující        |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage` (inline) | Pokrytí klíčů UI i18n je ≥ 65 %                                                                                                                                                                                   | Ano              |
| `check-ui-value-drift` (inline)   | Přepsaná anglická **hodnota** nezanechá žádný zastaralý překlad                                                                                                                                                   | Ano              |
| `check-new-key-coverage` (inline) | **Nový** anglický klíč je přeložen v každém lokalizačním souboru — značka `__MISSING__:` je odmítnuta                                                                                                             | Ano              |
| `check-translation-ratio`         | Poměr skutečných překladů podle lokalizace (hodnoty shodné s angličtinou / zástupné symboly / chybějící hodnoty mimo seznam povolených) nesmí překročit `config/quality/i18n-translation-baseline.json` + rezervu | **Doporučující** |

Vyžaduje `fetch-depth: 0` — brána pro kontrolu změn hodnot porovnává `en.json` se základnou sloučení.

#### `check-ui-value-drift` — brána pro kontrolu zastaralých překladů

Zachytává jedinou regresi i18n, kterou ostatní strukturální kontroly nedokážou odhalit: anglická hodnota
je přepsána a překlady odvozené z _předchozí_ angličtiny zůstanou beze změny, takže
neangličtí uživatelé dál čtou sebejistě formulovaný, nyní nesprávný text.

Toto se skutečně dostalo do vydání. `oauthModal.googleOAuthWarning` byl přepsán, když byl přidán pomocník
pro přihlášení Antigravity (#5203); **39 ze 43 lokalizací** si ponechalo text říkající obsluze, aby „zkopírovala
celou URL a vložila ji níže“ — postup, který u tohoto poskytovatele nelze dokončit. Zůstalo to bez povšimnutí až do #8463, protože:

- `sync-ui-keys` doplňuje pouze klíče, které **chybí**, nikdy ty, které jsou **zastaralé**;
- `check-ui-keys-coverage` počítá přítomnost klíčů, takže zastaralý překlad je započítán jako pokrytý;
- `check-translation-drift` sleduje dokumentační zrcadla `docs/i18n/<locale>/**.md` —
  nikdy nečte `src/i18n/messages/*.json`. Blokování v úloze `docs-sync-strict` od
  opětovné synchronizace v 2026-09: upravte hlavní dokument → `npm run i18n:run -- --files=<doc>` (na úrovni sekcí, levné).

**Sleduje rozdíly, nikoli výchozí stav.** Porovnává `en.json` na základě merge base s
pracovním stromem; u každého klíče, jehož anglická hodnota se změnila, je překlad v libovolné lokalizaci,
který zůstal nedotčený, zastaralý. Tím se záměrně **zmrazuje předchozí dluh** — z rozdílu
nelze zjistit, z jaké staré angličtiny dlouhodobý překlad vznikl, takže kontrola posuzuje
pouze to, čeho se dotýká aktuální změna. Alternativa (hash baseline pro každý klíč) by znamenala
náklady v podobě generovaného souboru o velikosti přibližně 600 KB, tedy trojnásobku největšího
stávajícího baseline, který by se měnil při každém i18n PR.

Existují dva způsoby, jak kontrolou projít:

1. aktualizujte dotčené překlady, nebo
2. nastavte je na `__MISSING__:<new english>` — runtime pak použije opravenou angličtinu
   (`src/i18n/request.ts::deepMergeFallback`, #7258) a klíč se zařadí do fronty k překladu.

Pokud se změnil **význam** řetězce, upřednostněte **přejmenování klíče**: nový klíč nemůže převzít
zastaralý překlad. Tento postup použil #8463.

```bash
npm run i18n:check-value-drift          # striktní režim (spouští CI)
npm run i18n:check-value-drift:warn     # pouze výpis
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Při nemožnosti načíst výchozí katalog (mělký klon bez výchozí reference) končí s kódem 0 a
`SKIP reason=base-unresolved`, stejně jako `check-openapi-breaking`.

### Úloha: `i18n`

Kompletní validační matice i18n (jedna úloha pro každou lokalizaci). Celá úloha má pouze informativní charakter.

| Skript                          | Ověřuje                                | Blokování                                                    |
| ------------------------------- | -------------------------------------- | ------------------------------------------------------------ |
| `validate_translation.py quick` | Úplnost překladu pro každou lokalizaci | **Informativní** (`continue-on-error: true` pro celou úlohu) |

### Úloha: `pr-test-policy`

Spouští se pouze u pull requestů.

| Skript                 | Ověřuje                                                                                                                             | Blokování |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PR, které mění produkční kód v `src/`, `open-sse/`, `electron/` nebo `bin/`, musí obsahovat nebo aktualizovat testy (Pravidlo č. 8) | Ano       |
| `check:test-masking`   | Změněné testovací soubory nesnižují celkový počet asercí ani nepřidávají tautologie `assert.ok(true)`                               | Ano       |
| `check:pr-evidence`    | Tělo PR uvádí důkazy z testů/VPS pro danou změnu (mechanizuje Pravidlo č. 18 vyhledáváním v textu PR — křehké, viz Backlog)         | Ano       |

### Úloha: `test-vitest`

Spouští se po `build`. Při selhání blokuje sloučení.

| Sada             | Ověřuje                                                     | Blokování                                                                                                      |
| ---------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 nástrojů), autoCombo, cache — runner vitest | Ano                                                                                                            |
| `test:vitest:ui` | Testy komponent UI — runner vitest                          | **Blokuje** — předchozí selhání jsou v `vitest.config.ts` výslovně vyloučena; nová selhání úlohu ukončí chybou |

### Noční workflow (plánované, informativní)

Spouštějí se podle plánu cron (a pomocí `workflow_dispatch`), nikdy ne u PR. Všechny mají pouze informativní charakter.

| Workflow               | Ověřuje                                                                                                                                                                 | Blokování              |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `nightly-property`     | testy vlastností fast-check s náhodným seedem a vysokým počtem běhů                                                                                                     | **Pouze informativní** |
| `nightly-resilience`   | kontrola růstu haldy, chaos fault-injection, zatížení a soak testy pomocí k6                                                                                            | **Pouze informativní** |
| `nightly-llm-security` | ochrana proti injection v promptfoo (režim block) + sondy garak (přeskočeno bez tajného klíče poskytovatele)                                                            | **Pouze informativní** |
| `nightly-schemathesis` | fuzzing kontraktu OpenAPI (schemathesis) proti běžící instanci OmniRoute pomocí `docs/openapi.yaml` — odhaluje porušení specifikace / neošetřené chyby 500 (Fáze 8 B.4) | **Pouze informativní** |
| `nightly-mutation`     | skóre mutation testingu Strykeru nad rychlou jednotkovou sadou — přeživší mutanty odhalují slabé asserty                                                                | **Pouze informativní** |
| `nightly-compat`       | matice kompatibility enginu Node napříč podporovanými rozsahy `engines.node`                                                                                            | **Pouze informativní** |

Výkonnostní baseline (halda, TTFB, doba sestavení) se zaznamenávají, ale nejsou použity jako blokující kontrola: viz [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
- **doporučující** — globální součet oproti zmrazenému výchozímu stavu. Zděděný posun nikdy nezpůsobí
  selhání nevinného PR; posun se při sladění vydání znovu zmrazí a sleduje jej úloha pro kontrolu rezervy.

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

Každá kontrola, která nemůže selhat kvůli již existujícím porušením, používá zmrazený seznam povolených výjimek
(např. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Platí následující zásada:

**Opravte základní příčinu; seznam povolených výjimek použijte pouze tehdy, když porušení již existovalo
a nelze je opravit ve stejném PR.**

Při přidávání položky do seznamu povolených výjimek:

1. Přidejte komentář s odůvodněním.
2. Uveďte odkaz na sledovací issue (např. `// #3498 — Funkce 2. fáze, dosud neimplementována`).
3. Položku odstraňte ve stejném PR, které porušení opravuje — zastaralá položka, která již
   nepotlačuje aktivní porušení, je sama o sobě vadou (kontrola zastaralého vynucování 6A.3
   po implementaci selže na osiřelé položce seznamu povolených výjimek).

**Nepřidávejte** položky do seznamu povolených výjimek jen proto, aby testy prošly rychleji. Úspěšná kontrola při současném rozšiřování
seznamu povolených výjimek vytváří falešný pocit kvality.

### Když kontrola ve vašem PR selže

1. **Pečlivě si přečtěte výstup kontroly** — přesně vám sdělí, který soubor nebo symbol
   porušil pravidlo.
2. **Opravte porušení** — většina kontrol jsou deterministické kontroly souborového systému, které projdou, jakmile
   je kód správný.
3. **Pokud porušení již existovalo** (tj. nezavedli jste je vy, ale kontrola se na ně nyní
   vztahuje): přidejte položku do seznamu povolených výjimek s komentářem obsahujícím odůvodnění a odkazem na sledovací issue.
4. **Pokud je kontrola západková** (pokrytí, varování ESLint, duplicita, složitost):
   vaše změna metriku zhoršila. Opravte základní problém nebo (ve vzácných případech) spusťte
   `npm run quality:ratchet -- --update`, pokud je změna záměrná a zhoršení metriky
   je přijatelné — v popisu PR však zdokumentujte proč.
5. **Informativní kontroly** (`continue-on-error: true`) slouží pouze pro informaci — neblokují
   sloučení, ale zobrazují se v souhrnu CI. Přesto je opravte.

---

## Přidání nové kontroly

1. Vytvořte `scripts/check/check-<name>.mjs` (nebo `.ts`). Kontroly zásad končí s kódem 0/1.
   Západkové kontroly zapisují metriku do `quality-metrics.json` prostřednictvím `collect-metrics.mjs`.
2. Přidejte `"check:<name>": "node scripts/check/check-<name>.mjs"` do `package.json`.
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

## Seznam racionalizačních úkolů (revize ROI — fáze 9, vlna 3)

Tento inventář byl dne 2026-06-17 porovnán s `ci.yml` (předchozí verze vynechala
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Revize ROI sjednocené sady
identifikovala následující kandidáty na racionalizaci. **Sloučení jsou mechanické změny
CI; změny režimu či odstranění jsou politická rozhodnutí vyhrazená provozovateli.** Nic
z níže uvedeného zatím nebylo aplikováno.

**Výše rovněž nezdokumentováno** (poradní, nízká vypovídací hodnota): úloha `docs-lint`
(markdownlint + Vale, celá úloha s `continue-on-error`) a samostatné workflow skenerů
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. Hodnota `semgrepFindings: 0` se nachází
v `quality-baseline.json`, ale není v `ci.yml` napojena na blokující západku — tato metrika
je aktuálně osiřelá.

### Sloučení / odstranění duplicit (mechanické, nižší riziko)

Každý kandidát byl dne 2026-06-17 ověřen vůči aktuálnímu stavu kontrol (důvěřuj, ale
prověřuj); ukázalo se, že několik „zjevných“ sloučení skrývá dluh a **nelze** je čistě
nahradit.

- **`check:docs-sync` se spouští dvakrát** — samostatně v úloze `lint` a znovu v rámci `check:docs-all` (`docs-sync-strict`) a husky pre-commit hooku. ✅ **HOTOVO** — samostatné spuštění v `lint` bylo odstraněno.
- **Skenování CVE** — ❌ **NEJDE o čisté sloučení.** `audit:deps` skončí tvrdou chybou při jakékoli CVE se závažností high/critical; `check:vuln-ratchet` (osv) selže pouze při _regresi_ oproti výchozímu stavu (aktuálně 1 MODERATE). Odlišná sémantika — odstraněním `audit:deps` by se ztratila absolutní kontrola závažností high/critical. Ponechat obě.
- **Detekce cyklů** — ✅ **HOTOVO** (#15159 G-01/G-02). Původní text zde označoval `check:cycles` za „zelenou, pečlivě vybranou“ kontrolu a její blokující režim zdůvodňoval tím, že `check:circular-deps` (dpdm) hlásil 91 cyklů. Tento zelený stav byl **falešně pozitivní**: `check:cycles` kontroloval 5 podadresářů (450 souborů), vyhledával pouze statické `import|export … from` a zahazoval všechny specifikátory `@/` a `@omniroute/open-sse/`, takže nemohl odhalit cykly dynamických importů a aliasů, které v repozitáři převažovaly. Opraveno: kontrola nyní prochází `src` + `open-sse` (5023 souborů), shromažďuje specifikátory z AST TypeScriptu (takže `import("…")` se započítává, zatímco `typeof import("…")` na pozici typu nikoli) a překládá `paths` z tsconfigu. Nachází **14** cyklů, nikoli 0. Protože 14 již existujících cyklů nelze opravit v PR zavádějícím kontrolu, je nyní `check:cycles` **západkou** (`--ratchet`, strop `metrics.cycles.value = 14` v `quality-baseline.json`, `direction: down`) — blokuje každou _regresi_ a počet může pouze klesat. CI spouští `npm run check:cycles:ratchet`. Postupné snižování probíhá společně s **A-01**. `check:circular-deps` (dpdm) zůstává poradní jako širší nezávislá kontrola.
- **Složitost** — ✅ **HOTOVO** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): jeden průchod ESLintu, počítání podle ruleId, takže výchozí hodnoty cyklomatické složitosti + maximálního počtu řádků a kognitivní složitosti zůstávají nezávislé; jednotlivé kontroly `check:complexity` / `check:cognitive-complexity` zůstávají zachovány pro místní použití s `--update`.
- **Ochrana `/api` proti halucinacím** — ✅ **HOTOVO** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): jeden inventář souborového systému pro `src/app/api`; openapi-routes + docs-symbols nadále hlásí výsledky nezávisle; jednotlivé kontroly zůstávají zachovány pro místní spuštění.
- **`check:node-runtime` se spouští v 11 úlohách** — ⚠️ **nízké ROI.** Každá běží na samostatném runneru a kontrola trvá <1 s; celková úspora činí přibližně 10 s za cenu ztráty levné ochrany pro každou úlohu. Nestojí to za související změny.
- **`typecheck:noimplicit:core` v lintování CI** — ✅ **odstraněno z úlohy lint** (dříve poradní s `continue-on-error`); blokující typový povrch tvoří `typecheck:core` + `check:type-coverage`. Místní skript byl zachován.

### Změna režimu / rozhodnutí (politika provozovatele)

- `check:openapi-security-tiers` (poradní) — ❌ **NELZE čistě přepnout.** Končí s kódem 0, ale upozorňuje, že několika trasám `traffic-inspector` pod `LOCAL_ONLY_API_PREFIXES` chybí anotace `x-loopback-only: true`. Jeho vynucení nejprve vyžaduje přidání těchto anotací do `openapi.yaml`.
- `typecheck:noimplicit:core` (poradní) — z velké části nahrazeno blokující západkou `check:type-coverage`. Přepnout na západku, nebo odstranit redundantní druhý průchod `tsc`.
- `test:vitest:ui` (nyní **blokující**) — již existující selhání jsou explicitně vyloučena ve `vitest.config.ts` pomocí sledovacích komentářů `// #8618`; nová selhání způsobí neúspěch úlohy.
- `check:secrets` (gitleaks, blokující západka zmrazená na 3 zdokumentovaných falešně pozitivních nálezech) — přidat tyto 3 případy na seznam povolených a dosáhnout hodnoty 0, nebo kontrolu degradovat na poradní. Překrývá se s nativním skenováním tajných údajů GitHubu + `check:public-creds`.
- `check:pr-evidence` (blokující, vyhledává vzory v textu těla PR) — vysoké riziko falešně pozitivních výsledků; odstranění by oslabilo vynucování závazného pravidla č. 18, takže jde o skutečné politické rozhodnutí.
- `semgrep` (poradní, samostatný) — u rodin OWASP se překrývá s CodeQL; napojit jeho výchozí hodnotu na západku, nebo jej odstranit.

---

## Související dokumentace

- Dodavatelský řetězec (provenance, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — kontrola shody sad klíčů

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, úloha `i18n-ui-coverage`).
Porovnává sadu koncových klíčů každého souboru `src/i18n/messages/<locale>.json` se souborem `en.json` a selže
při jakémkoli chybějícím nebo nadbytečném koncovém klíči bez ohledu na to, kdy byl klíč přidán. Zástupné hodnoty
`__MISSING__:` se počítají jako přítomné (jejich obsah řeší kontrola poměru). Jde o absolutní doplněk
dvou kontrol založených na rozdílech/procentech: `check-ui-keys-coverage` vynucuje minimální pokrytí 80 % pro
každé locale (43 chybějících klíčů z přibližně 13 000 stále znamená 99,7 %) a `check-new-key-coverage` posuzuje
pouze klíče, které PR přidává do `en.json`. Dávka locales se vygeneruje z verze `en.json` platné v den
vytvoření její větve a překlady probíhají několik dní, zatímco základní větev dál získává nové klíče; dávkový PR sám
žádný klíč nepřidává, takže obě související kontroly mlčely, když byla dávka 1 (#13044) začleněna s 43 chybějícími klíči v devíti
locales a dávka 2 (#13660) s 10 chybějícími klíči v osmi (2026-09-15). Neúspěšnou kontrolu opravte pomocí
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; koncový klíč označený jako `extra`
znamená, že jej zdroj odstranil — odstraňte jej tedy i z daného locale. `--warn` problém ohlásí bez ukončení s chybou.
`--catalog=cli` spustí stejné porovnání nad `bin/cli/locales` (`npm run i18n:check-keys:cli`);
oba kroky jsou součástí úlohy `i18n-ui-coverage`.

#### `check-new-key-coverage` — kontrola i18n pro nové klíče

Související kontrola ke `check-ui-value-drift`. Ta zachytí anglickou hodnotu, která byla **přepsána**,
zatímco její překlady zůstaly beze změny; tato kontrola zachytí anglický klíč, který byl **přidán**,
ale některá locales jej nikdy neobdržela.

`check-ui-keys-coverage` tuto třídu problémů nedokáže odhalit: vynucuje minimální procentuální pokrytí pro jednotlivá locales a
jedenáct chybějících klíčů z přibližně 13 000 ponechá pokrytí na 99,9 %. Procentuální hodnota pro jednotlivé jazyky nedokáže
vyjádřit, že „tato funkce byla vydána bez překladu“ — celá funkce může být začleněna do nového locale bez jakéhokoli
textu, aniž by se číslo vůbec změnilo.

Incident, který tato kontrola zachycuje: fáze 3 nástroje Orchestration Canvas přeložila svých jedenáct klíčů ve
42 locales, která v té době existovala. O několik hodin později rozšířila dávka jazyků EU (#13044) repozitář
na 51 locales a devět nových (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) je nikdy
neobdrželo. `deepMergeFallback` nahradí chybějící klíč angličtinou, takže výsledkem bylo
nepřeložené, nikoli prázdné uživatelské rozhraní — skutečný problém, který z principu zůstal bez upozornění.

Stejně jako související kontrola **zohledňuje rozdíly**: porovnává angličtinu v bodě sloučení se
současným pracovním stromem, takže již existující mezery zůstávají beze změny a zapnutí kontroly nevyžadovalo žádnou migraci.

**Značka `__MISSING__:<english>` tuto kontrolu nesplňuje (od 2026-09-17).** Dříve představovala
zdokumentovaný odklad — běhové prostředí použije jako náhradu správnou angličtinu — dokud osm PR s funkcemi
dne 2026-09-16 nepřidalo 61 klíčů a nevložilo tuto značku do všech 65 locales namísto jejich přeložení: tato
kontrola všechny přijala, PR nic nezablokovalo a blokující kontrola poměru skutečných překladů
poté selhala na špičce vydání všem (pt-BR 3,2 % > 2,5 % + 0,5). Značka je nyní posuzována
jako chybějící překlad. Neúspěšnou kontrolu opravte pomocí
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` nebo
pro všechna locales paralelně pomocí `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
bezpečné při odpojení, odmítne se spustit bez proměnných prostředí `OMNIROUTE_TRANSLATION_*`). Klíč, který musí zůstat
v angličtině (pevně daný název produktu, enginu nebo příznaku), patří do `scripts/i18n/untranslatable-keys.json`,
nikdy za značku. `vi` značky zcela zakazuje (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — kontrola odložených testů

Soubor v seznamu `exclude` v `vitest.config.ts` představuje test, který se nespouští, a pro každého, kdo prochází
strom, přesto působí jako pokrytí. Za komentářem se nahromadilo šedesát dva souborů
`// #8618 — již existující selhání; po opravě tuto výjimku odstraňte`. Problém #8618 byl uzavřen
2026-08-11, zatímco seznam, který sledoval, narostl ze 45 položek na 62, přičemž každá nová položka zdědila komentář
odkazující na uzavřený problém. Když byl seznam konečně proměřen soubor po souboru (#13204), **51 z 62
testů prošlo nad aktuálním stromem bez jakékoli změny zdrojového kódu**.

Kontrola vyžaduje, aby každá výjimka odkazující na skutečný soubor (a) uváděla sledovací problém a
(b) byla uvedena v `config/quality/vitest-exclusions.json` se svým naměřeným stavem, takže přidání výjimky představuje
kontrolovatelný rozdíl ve vyhrazeném souboru namísto dalšího řádku v poli s 60 položkami. Záměrně
vyloučené testy znovu nespouští — to trvá přibližně 10 minut a patří do periodické úlohy;
inventář zaznamenává, kdy byla každá položka naposledy změřena.
