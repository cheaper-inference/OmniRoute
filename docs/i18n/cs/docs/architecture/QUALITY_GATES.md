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

Pracovní postupy CI a Quality Gates vydávají stabilní verdikt: `Gate / CI` a `Gate / Quality`. Jejich verzovaná politika přijímání vyjmenovává každou upstreamovou práci podle požadavků nebo doporučení. Příslušná požadovaná úloha musí být úspěšná: chybějící, zrušené, přeskočené, čekající a neznámé výsledky nemohou stanovit PASS. Platná klasifikace pouze pro dokumenty nebo pouze pro katalog může způsobit, že kódový pruh nebude použitelný; návrh PR není přijatým kandidátem. Štítek `hotfix` se nezříká důkazů.

Oba pracovní postupy pokrývají PRs do větví main/release, push to `main`, ruční odesílání a události slučovací skupiny. Push, dispatch a merge-group spustí celý výběr. Zatlačení na `release/**` je nespustí (2026-10-18): každá změna již spustila matici na svém PR a sloučená kombinace je úkolem Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane). Rozvětvení a slučovací skupiny používají hostované běžce pro úlohy, které jinak vybírají samoobslužné běžce; před zavedením je nutné ověřit dostatečnou hostovanou kapacitu.

Rychlý výběr spustí běžná PR. Pruhy `full-code` a `full-code-e2e` politiky přístupu (E2E, integrace, artefakt balíčku, Electron smoke, Bun SQLite, klienti ekosystému a protokolu) běží pouze na konceptu fronty Mergify nebo na úplném spuštění: `gh workflow run ci.yml --ref <branch>`.

Každá účtenka JSON identifikuje odhlášenou SHA, běh pracovního postupu a pokus. CLI odmítne nesoulad checkout/event SHA. Testy pracovního postupu vážou členství v zásadě k seznamu `needs` úlohy verdiktu, takže nový nebo odstraněný pruh nemůže tiše zmizet. Potvrzení pokrývá jejich vlastní pracovní postup, nikoli publikaci, nasazení nebo vnitřní součásti stávajícího poradenského skeneru. Aktivace obou kontrolních jmen v pravidlech pobočky je samostatnou administrativní změnou; přidání těchto úloh samo o sobě nechrání pobočku.

### Sloučit frontu

Štítek `queue` odešle PR do fronty Mergify (`.mergify.yml`). Mergify otevře koncept PR ve větvi `mergify/merge-queue/`, CI tam spustí úplný výběr a původní PR se sloučí, když projdou `Gate / CI`, `Gate / Quality` a `Merge integrity (changelog + generated skills)`.

Mergify zapíše svůj souhrn fronty do popisu konceptu a další aplikace ho mohou také upravit. Událost `pull_request` `edited` na takovém konceptu má svou vlastní skupinu souběžnosti (`-queue-edit-<run_id>`), takže nemůže zrušit skutečný běh konceptu a přeskočí bránu a matici. Stále běží pouze `Merge integrity`. Úloha přeskočené brány nese jiný název kontroly, protože Mergify čte přeskočené `Gate / CI` jako neúspěšnou kontrolu a z fronty PR.

Po vyřazení z fronty ne vždy push znovu zařadí PR. Komentář k tomu `@mergifyio queue`.

### Uchovaný důkaz v akceptačním reduktoru

`scripts/quality/validate-release-acceptance.mjs` redukuje dodaný plán a jeho manifesty; nestanoví, že plán pokrývá celý proces uvolňování. Jeho zprávy explicitně nastavují `releaseAcceptance: false`, i když je tento plán `VERIFIED`. Pracovní postup `release-acceptance.yml` stále používá stínová zařízení, nikoli skutečné potvrzení o sestavení, balíčku, zavedení nebo propagaci.

CLI vyžaduje `--evidence-root` k ověření uchovávaných důkazů. Soubory jsou řešeny jako `<evidence-root>/<artifact_id>/<member>` a hashovány jako SHA-256. Ověření brání záznam PASS bez důkazů, chybějící nebo změněný soubor, nebezpečná cesta nebo symbolický odkaz. Chybějící soubory nejsou ekvivalentní prázdným úspěšným protokolům. Stávající kontroly SHA/run/attempt zůstávají nezávislé: odpovídající bajty nemohou zachránit zastaralou účtenku. Integrita souboru není důkazem pravosti provedení nebo propagace artefaktu.

### Statické skenování inventáře

Verzovaný inventář npm-alias a členství ve statickém skenování fungují v `config/quality/gate-manifest.json`. Spusťte `npm run check:gate-manifest` pro ověření názvů skriptů a přesných příkazů proti `package.json`; přidání, odebrání a posun příkazů selžou jak u lokálního zavěšení, tak u úloh klasifikace změn v CI. Alias není úloha pracovního postupu, instance matice nebo testovací případ: tyto počty nesmí být prezentovány jako zaměnitelné.

Použijte `npm run quality:scan -- --list` nebo `npm run quality:scan:fast -- --list` ke kontrole vybraných aliasů bez jejich provedení. Runtime vyvolá vstupní bod npm, takže jeho runtime (včetně Bun pokud je nakonfigurováno) je zachováno. Manifest zaznamenává aliasy mimo tyto profily, které jsou vyvolány samostatně, a příkazy údržby jsou v profilech skenování pouze pro čtení zakázány.

Tyto profily pokrývají pouze statické skenování. Necertifikují testy produktů, pokrytí, balení, externí kontroly ani úplné přijetí kandidáta na vydání. Přijetí pracovního postupu používá propojené `config/quality/admission-policy.json` a `scripts/quality/admission-verdict.mjs`. Profily pozorovatele uvolnění zůstávají oddělené; nezávisle kontrolovat jejich příslušné šeky a účtenky. Úplné statické příkazy pozorovatele jsou deklarovány v `config/quality/release-green-static-profile.json`, včetně `audit:deps`, výběru testu mutace a kontroly překladu. Zavaděč ověřuje příkazy npm proti package.json a modelovaným deklaracím CI/Quality ; odmítá drift místo provádění tokenů shellu jako argumentů. Požadovaný výstup SKIP/INCOMPLETE skeneru nemůže vytvořit PASS. Profil zaznamenává svá externí vyloučení a nenahrazuje hostované pokrytí, testovací matrice, balíčky nebo důkazy o nasazení. Níže uvedený inventář prózy je odkazem, nikoli důkazem, že brána skutečně běžela.

Skripty fungují pod `scripts/check/` (brány zásad) a `scripts/quality/` (řehtací motor). Zdrojem pravdy CI je `.github/workflows/ci.yml`.

### Uvolněte rychlou cestu PR (`quality.yml`)

`.github/workflows/quality.yml` doplňuje CI na main/release PRs, vkládá do `main`, odesílá a spojuje skupiny. PRs používá rychlé kontroly filtrované cestou. Trvale deaktivované duplicitní sestavení bylo odstraněno; skutečné kontroly build/package/boot zůstávají v CI. Jednotková sada a vitest běží pouze v CI (`Unit Tests (N/8)` a `Vitest`).

| Práce                                            | Rozsah                                                                                                                                            | Blokování          |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API dokumenty refs a docs-all                                                                                                      | Ano                |
| `Fast Quality Gates`                             | Kód PRs; statické kontroly, typová kontrola, typová kontrola palubní desky, impaktované jednotkové testy, zapomenuté sourozenecké testy (poradní) |
| `No new ESLint warnings`                         | Kód PRs; ochrana proti žmolkům reagující na potlačení                                                                                             | Ano, včetně vidlic |
| `Merge integrity (changelog + generated skills)` | Nenávrh PRs; changelog a generovaná synchronizace dovedností                                                                                      | Ano, včetně vidlic |

#### Zpráva o testech zapomenutého sourozence

`npm run check:forgotten-sibling-tests` běží jako poradní krok `Fast Quality Gates` a znovu používá překladač importu za mapou dopadu testu. Pro každý změněný produkční modul hlásí deterministické řetězce `changed module/symbol -> static consumer -> candidate sibling test` když kandidátský test chybí v rozdílu požadavku na stažení. Souhrn Markdown a výsledek JSON jsou zachovány jako artefakt pracovního postupu `forgotten-sibling-tests` pro kalibraci před zavedením blokování.

Reexporty sudů a dynamické importy jsou pouze diagnostikou rozlišení; nikdy nevytvářejí blokující nález. Zkontrolované výjimky jsou k dispozici v `config/quality/forgotten-sibling-allowlist.json`. Každý záznam musí pojmenovat test spotřebitele a kandidáta, uvést konkrétní zdůvodnění a propojit problém GitHub nebo požadavek na stažení. Poškozené položky se nepodařilo uzavřít. Výjimky nemohou potlačit smazaný test kandidáta nebo rozdíl, který přidává `.skip`/`.todo`; oslabení asercí a další maskování zůstávají ve vlastnictví nezávisle blokující brány `check:test-masking`.

### Práce: `lint`

Běží na každém PR až `main`. Bloky se při selhání spojí.

| skript (`npm run ...`)            | Ověřuje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Blokování                               |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | verze Node.js je v podporovaném rozsahu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ano                                     |
| `check:cycles`                    | Kruhové importy napříč všemi `src/` + `open-sse/` (založené na AST, vyřešeno pomocí tsconfig `paths` ). Bare ukončí 1 vždy, když existuje jakýkoli cyklus (selhání uzavřeno od #15281) a vypíše SCCs. `check:cycles:ratchet` (co běží CI ) blokuje, když počet překročí strop `metrics.cycles` v `quality-baseline.json` — aktuálně 14, `direction: down`, takže může pouze klesnout (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ano (ráčna)                             |
| `check:boundary`                  | spojení `open-sse → src` : jedinečné importy mezi soubory z enginu do aplikace (`scripts/quality/measure-boundary.mjs`; seznam okrajů je nevyřízená náprava v4 core/module-split ). Holá poradní zpráva = (stejná jako `quality:boundary`). `check:boundary:ratchet` (co běží CI, také v rohatkové smyčce `quality.yml` rychlých bran) blokuje, když počet překročí strop `metrics.boundaryOpenSseToSrc` v `quality-baseline.json` — nasazeno na naměřených 771, `direction: down`; `--update` jej pouze snižuje; základně relativní na PRs (`--base-ref`, viz níže)                                                                                                                                                                                                                                                                                                                                                      | Ano (ráčna)                             |
| `check:route-validation:t06`      | schémata Zod přítomná na všech trasách (zásady úrovně 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ano                                     |
| `check:any-budget:t11`            | počet `@ts-expect-error // any` nepřesahuje rozpočet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ano                                     |
| `check:provider-consistency`      | Každý poskytovatel v `providers.ts` má odpovídající záznam v `providerRegistry.ts` (a naopak v seznamu povolených)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ano                                     |
| `check:model-lifecycle`           | Tři ručně spravované směrovací tabulky zůstávají konzistentní se zaznamenaným snímkem životního cyklu (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nezískává žádné vyřazené id, které může `REGISTRY` směrovat; každý cíl `BUILT_IN_ALIASES` je přítomen v `REGISTRY` a chybí ve snímku vyřazeného id; každé vyřazené ID stále v `REGISTRY` je předáno nebo uvedeno v `allowedRetiredInCatalog`; a žádný zdroj nebo cíl `DEFAULT_DEGRADATION_MAP` se v tomto snímku neobjeví jako vyřazený. To nedokazuje, že model je v současné době obsluhován živě proti proudu. Offline — se porovnává se `config/quality/model-lifecycle.json`, ručně obnovený pomocí `npm run quality:refresh-model-lifecycle` (síť; není zapojeno do CI). `allowedRetiredInCatalog` je spálená ráčna: přidejte položku pouze s problémem se sledováním.                                                                                           | Ano                                     |
| `check:fetch-targets`             | Každé `fetch("/api/...")` v `src/` na straně klienta se převede na skutečné `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ano                                     |
| `check:deps`                      | Všechna deps `npm install` -able napříč každým `package.json` v repo jsou v `dependency-allowlist.json`; nové nepřipnuté nebo squatované balíčky označené příznakem                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ano                                     |
| `audit:deps`                      | npm audit všech pěti nezávislých lockfiles (root, Electron, OpenCode pluginy v1/v2 a poskytovatel). Blok kritických rad; vysoká upozornění zůstávají viditelným varováním. Missing/failed audity jsou INCOMPLETE a block; hodnoty hash a sestavy uzamčení podle rozsahu jsou zachovány.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ano                                     |
| `check:lockfile`                  | `package-lock.json` integrita — https registr, integrita hash, žádná přepsání hostitele                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ano                                     |
| `check:licenses`                  | SPDX licenční seznam povolených pro produkční závislosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ano                                     |
| `check:tracked-artifacts`         | Žádné artefakty sestavení / potvrzené symbolické odkazy `node_modules` (také běží v husky pre-commit; pre-push je záměrně lehký — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ano                                     |
| `check:ai-attribution`            | Žádná upoutávka AI/bot `Co-Authored-By` nebo zápatí generace AI v commitech PR, názvu nebo těle — Hard Rule #16 (ve smyčce rychlých bran `quality.yml` pro PR→ `release/**` — čte datovou část události, no-op off PRs — a krok pouze PR v `ci.yml` lint pro PR→ `main` také `commit-msg` co; #14436 povoleno;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:vitest-exclusions`         | Každé vyloučení Vitest pojmenuje problém se sledováním a zobrazí se v `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ano                                     |
| `check:file-size`                 | Zdrojové soubory (`.ts`/`.tsx` v `src/`, `open-sse/`, `electron/`, `bin/`) zůstávají v `cap` a testovací soubory (`*.test.ts(x)`) v `testCap`; soubory zmrazené v `file-size-baseline.json` (`frozen` / `testFrozen`) nesmí přesáhnout svou zaznamenanou velikost                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ano                                     |
| `check:error-helper`              | Chybové reakce v executors/handlers používají `buildErrorBody()` / `sanitizeErrorMessage()` (pevné pravidlo #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ano                                     |
| `check:migration-numbering`       | Migrační soubory SQL jsou sekvenčně číslovány, bez mezer nebo duplicit                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ano                                     |
| `check:public-creds`              | Žádné doslovné OAuth `client_id`/`client_secret` nebo webové klíče Firebase mimo `publicCreds.ts` (pevné pravidlo #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ano                                     |
| `check:db-rules`                  | Žádné surové SQL mimo `src/lib/db/` moduly; žádné importy sudů z `localDb.ts` (tvrdá pravidla #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ano                                     |
| `check:known-symbols`             | Exekutoři poskytovatelů, strategie směrování a překladatelé registrovaní v jejich dispečerských tabulkách odpovídají souborům na disku — žádné osiřelé nebo nedeklarované symboly                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ano                                     |
| `check:route-guard-membership`    | Každá cesta, která vytvoří podřízený proces, je klasifikována pomocí `isLocalOnlyPath()` (tvrdá pravidla #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ano                                     |
| `check:test-discovery`            | Každý soubor `*.test.ts` / `*.spec.ts` v úložišti shromažďuje alespoň jeden testovací běžec (ratchet: seznam sirotků v `test-discovery-baseline.json` se může pouze zmenšit)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ano                                     |
| `check:test-tla-order`            | Žádný soubor `node:test` pod `tests/unit` nezaregistruje test, zasáhne `await` nejvyšší úrovně a poté zaregistruje další (#18045; ratchet: `test-tla-order-allowlist.json` se může pouze zmenšit)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ano                                     |
| `check:agent-skills-sync`         | Vygenerované artefakty schopností agentů odpovídají jejich zdrojovému katalogu (žádný posun)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:provider-asset-provenance` | Poskytovatel logos/assets nést záznam o původu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `lint:json`                       | Konfigurační soubory JSON analyzují a splňují pravidla repo lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `typecheck:core`                  | kompilace TypeScript bez chyb (pouze informativní upozornění)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ano                                     |
| `typecheck:noimplicit:core`       | Přísné `noImplicitAny` — hledící do budoucnosti; mnoho již existujících stránek pro volání stále potřebuje poznámky                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | **Poradní** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` v rozsahu `src/app/(dashboard)/**` (#7033) — Seznam povolených 27 souborů spravovaný `typecheck:core` neobsahuje žádný řídicí panel TSX a `next build` jej také nikdy nekontroluje typu (`next.config.mjs` nastavuje `ignoreBuildErrors: true`), takže regrese osiřelých identifikátorů tam (#6625/#6909) byly pro CI neviditelné. Rozdíly proti zamrzlé základní linii počtu per-file/per-TS-code (`config/quality/dashboard-typecheck-baseline.json`, stejný vzor zastaralého vynucení jako `check:known-symbols`) — pouze chyby NEW za základní linií selžou; ráčnou dolů pomocí `--update`, když je opravena již existující chyba.                                                                                                                                                                                                                                                                              | Ano                                     |
| `check:build-typecheck`           | Kontrola produkčního typu celé aplikace přes `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), seznam povolených souborů `typecheck:core` s 27 soubory a brána palubní desky nepokrývají. Rozdíly proti `config/quality/build-typecheck-baseline.json`; nový nebo zvýšený počet za (soubor, kód) selže, nižší počet vás požádá o ratchetování. `--update` odmítne, když běh obsahuje nový nebo zvýšený pár, pokud není předán `--force-regressions`, a odmítne nově umlčený soubor, pokud není předán `--force-nocheck`, takže rozšíření základní linie na zelenou a udělení trvalého ticha jsou dva samostatné záměrné činy. Holý `--force` je odmítnut. Také prohledá rozsah sestavení pro `@ts-nocheck` proti `config/quality/ts-nocheck-baseline.json`, protože soubor, který jej používá, nehlásí vůbec žádnou diagnostiku a jinak by byl pro každou bránu neviditelný. | Ano                                     |

#### Dva programy pro kontrolu typu odpovídají odlišně

`typecheck:core` a `check:build-typecheck` kompilují různé programy pod různými možnostmi a stejný soubor může být v jednom čistý a v druhém plný chyb.

`tsconfig.build.json` nastavuje `"strict": false`, takže `noImplicitAny` je vypnuto. Základní konfigurace zkompiluje upravený seznam povolených souborů s 27 soubory s přísnějšími možnostmi a sleduje graf importu každé položky, takže soubory, které se nikdy neobjeví v sestavení programu, jsou tam stále kontrolovány.

Důsledek je důležitý při posuzování, zda je soubor napsán:** nulová diagnostika pod `check:build-typecheck` neznamená nulu** . Odstranění `@ts-nocheck` z 26 souborů ukázalo, že 23 z nich je v sestavení programu čisté; šestnáct z nich se objevilo kolem 120 implicitních – jakékoli chyby v tom přísném. Před voláním souboru clean zkontrolujte obojí.

### Práce: `quality-gate`

Běží po `test-coverage`. Bloky se při selhání spojí.

| Skript                       | Ověřuje                                                                                                                                                       | Blokování         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `quality:collect`            | Vydává `quality-metrics.json` (počet varování ESLint, pokrytí ze sloučené zprávy o zlomku)                                                                    | Ano (před ráčnou) |
| `quality:ratchet`            | Každá metrika v `quality-baseline.json` se nevrátila (ESLint varování ≤ základní linie; pokrytí ≥ základní linie)                                             | Ano               |
| `check:duplication`          | Duplikace kódu (jscpd@4) nepřesahuje základní hodnotu v `quality-baseline.json`                                                                               | Ano               |
| `check:complexity`           | Cyklomatická složitost na úrovni souboru nepřesahuje limit (core ESLint `complexity` + `max-lines-per-function`)                                              | Ano               |
| `check:cognitive-complexity` | Kognitivní složitost ráčna (`eslint-plugin-sonarjs`) — samostatný ESLint průchod; CI spouští oba sloučené jako jediný krok `check:complexity-ratchets`        | Ano               |
| `check:dead-code`            | Nepoužité exporty/soubory ráčna (knip) neregresuje oproti základní linii                                                                                      | Ano               |
| `check:compression-budget`   | Srovnávací limit komprese rozpočet — na tokeny pro úsporu tokenů nesmí klesnout                                                                               | Ano               |
| `check:type-coverage`        | Ráčna s procentuálním typem (`type-coverage`) se nevrací; z velké části zahrnuje `typecheck:noimplicit:core`                                                  | Ano               |
| `check:codeql-ratchet`       | Počet otevřených výstrah CodeQL se nevrací (čte se přes `gh api`; graceful-skip bez tokenu) kadence obnovování — a ruční spouštění: viz „CodeQL ratchet“ níže | Ano               |

### Práce: `quality-extended`

Celá práce je poradenská (`continue-on-error: true`). Ráčny založené na npm fungují skutečně; externí skenery se instalují přes `gh release download` a self-skip (ukončení 0), když binární soubor stále chybí.

| Skript                   | Ověřuje                                                                                                                                                                                                    | Blokování                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `check:circular-deps`    | Žádné kruhové závislosti (dpdm)                                                                                                                                                                            | **Poradní**                                       |
| `check:bundle-size`      | Velikost svazku nepřesahuje víčko                                                                                                                                                                          | **Poradní**                                       |
| `check:secrets`          | Tajné skenování (gitleaks) — přeskočí, pokud binární chybí                                                                                                                                                 | **Poradní**                                       |
| `check:vuln-ratchet`     | Chyby zabezpečení (osv-scanner) neregresují — `--ratchet` selže jako INCOMPLETE (výstup 2), pokud nejsou změřeny                                                                                           | **Poradní**                                       |
| `check:workflows`        | Workflow lint (actionlint + zizmor); skenery missing/broken, neplatná hlášení nebo chybějící základní linie ráčny selžou jako INCOMPLETE. Platná zjištění se řídí vybranou zásadou strict/advisory/ratchet | Vyžadováno provedení; blokování ráčny zizmor v CI |
| `check:openapi-breaking` | Veřejná smlouva API proti potvrzením připnutých událostí (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); požadované měření se nezdaří uzavřeno                     | **Blokování pomocí --ratchet**                    |

### Práce: `docs-sync-strict`

Běží na každém PR až `main`. Bloky se při selhání spojí.

| Skript                         | Ověřuje                                                                                                                                                            | Blokování                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `check:docs-all`               | Metabrána, která postupně spouští 6 dílčích bran níže                                                                                                              | Ano                        |
| ↳ `check:docs-sync`            | Konzistence verze CHANGELOG / OpenAPI / llm.txt                                                                                                                    | Ano                        |
| ↳ `check:docs-counts`          | Počty v próze (počet poskytovatelů, počet migrací atd.) jsou v rámci skutečného počtu                                                                              | Ano                        |
| ↳ `check:env-doc-sync`         | Každý env var v `.env.example` je dokumentován v tabulce dokumentů a naopak                                                                                        | Ano                        |
| ↳ `check:deprecated-versions`  | V dokumentech nejsou žádné řetězce zastaralých verzí                                                                                                               | Ano                        |
| ↳ `check:doc-links`            | Interní odkazy na snížení v dokumentech se převedou na skutečné soubory (forma `[text]`/`(path)` )                                                                 | Ano                        |
| ↳ `check:fabricated-docs`      | V kódové základně existují trasy, env vars, příkazy CLI, názvy háčků a cesty k souborům citované v dokumentech. Tvrdá brána přes `--strict`; soft-fail bez vlajky. | Ano (přes `--strict` v CI) |
| `check:cli-i18n`               | Řetězce příkazů CLI jsou přítomny ve všech souborech národního prostředí i18n                                                                                      | Ano                        |
| `check:openapi-coverage`       | Specifikace OpenAPI pokrývá alespoň ratchetovou podlahu skutečných cest                                                                                            | Ano                        |
| `check:openapi-security-tiers` | Anotace úrovně zabezpečení v `openapi.yaml` jsou konzistentní s klasifikacemi `routeGuard.ts`                                                                      | **Poradní**                |
| `check:openapi-routes`         | Každá cesta v `openapi.yaml` se mění na skutečný `route.ts` (anti-halucinace)                                                                                      | Ano                        |
| `check:docs-symbols`           | Každý odkaz `/api/...` v `docs/**/*.md` se převede na skutečný `route.ts` (antihalucinace)                                                                         | Ano                        |
| `i18n translation drift`       | Nepřeložené klíče v souborech národního prostředí i18n — pouze varují                                                                                              | **Poradní**                |

Vygeneruje se dvanáct README SVGs pod `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` je všechny regeneruje). Každý z nich má test jednotek porovnávání bajtů (`tests/unit/docs/readme-*-svg.test.ts`, úloha `test-unit`), který selže, když je potvrzený soubor zastaralý, a `check:docs-counts` čte kanonická čísla z jejich uzlů `<text>` — což je důvod, proč krok osnovy udržuje každý načrtnutý řetězec v souboru jako neviditelný `<text>`. Kontrola kanonických čísel SVG čte soubory uvedené v `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` a `tier-flow-light.svg`; tvrzení o volném navždy, o vstupu do katalogu, o opakovaném fondu a o faktorech bodování také zní `promise-pillars.svg`, `free-tier-budget.svg` a `strategies-grid.svg`. `free-tier-budget.svg` čerpá své údaje ze zavaděče živého katalogu, takže změna na `FREE_MODEL_BUDGETS` nebo na zobrazované jméno poskytovatele červeně CI dokud se soubor nevygeneruje.

### Práce: `i18n-ui-coverage`

| Skript                            | Ověřuje                                                                                                                                                                                                               | Blokování   |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (inline) | Klíčové pokrytí UI i18n je ≥ 65 %                                                                                                                                                                                     | Ano         |
| `check-ui-value-drift` (inline)   | Přepsaná angličtina** hodnota** nezanechá za sebou žádný zastaralý překlad                                                                                                                                            | Ano         |
| `check-new-key-coverage` (inline) | A** nový** Anglický klíč je přeložen v každém národním prostředí — a značka `__MISSING__:` je odmítnuta                                                                                                               | Ano         |
| `check-translation-ratio`         | Poměr skutečného překladu na národní prostředí (identický s angličtinou / zástupný symbol / chybějící listy mimo seznam povolených) nesmí překročit `config/quality/i18n-translation-baseline.json` + volnou kapacitu | **Poradní** |

Potřebuje `fetch-depth: 0` — brána posunu hodnoty se liší `en.json` proti slučovací základně.

#### `check-ui-value-drift` — zatuchlá-překladová brána

Zachycuje jednu regresi i18n, kterou ostatní brány strukturálně nevidí: anglická hodnota je přepsána a překlady odvozené z _předchozí_ angličtiny zůstávají pozadu, takže neangličtí uživatelé stále čtou sebevědomě formulovanou, nyní chybnou kopii.

Toto bylo skutečně odesláno. `oauthModal.googleOAuthWarning` bylo přepsáno, když přistál pomocník pro přihlášení Antigravity (#5203);** 39 ze 43 lokalit** stále text, který operátorům říká, aby „zkopírovali celý URL a vložili jej níže“ — tok, který pro daného poskytovatele nelze dokončit. Až do #8463 to zůstalo bez povšimnutí, protože:

- `sync-ui-keys` vyplní pouze klíče, které jsou** nepřítomný** , nikdy ty, které jsou** zatuchlý** ;
- `check-ui-keys-coverage` počítá klíč _přítomnost_, takže zastaralý překlad je hodnocen jako pokrytý;
- `check-translation-drift` sleduje dokumentaci `docs/i18n/<locale>/**.md` zrcadlí — nikdy nečte `src/i18n/messages/*.json`. Blokování úlohy `docs-sync-strict` od opětovné synchronizace 2026–09: upravte základní dokument → `npm run i18n:run -- --files=<doc>` (úroveň sekce, levně).

**Rozlišující, nepodporované základní linií.** Porovnává `en.json` na slučovací bázi s pracovním stromem; pro každý klíč, jehož anglická hodnota se změnila, je jakékoli národní prostředí, které stále obsahuje nedotčený překlad, zastaralé. Tohle schválně** zmrazí již existující dluh** — a diff nemůže odhalit, ze které staré angličtiny pochází dlouholetý překlad, takže brána posuzuje pouze to, čeho se aktuální změna dotýká. Alternativa (základní hodnota hash na klíč) by stála soubor vygenerovaný ~ 600 KB, což je 3 × největší existující základna, která by se střídala s každým i18n PR.

Dva způsoby, jak to uspokojit:

1. aktualizovat dotčené překlady, popř
2. nastavte je na `__MISSING__:<new english>` — runtime pak slouží k překladu opravené angličtině (`src/i18n/request.ts::deepMergeFallback`, #7258) a frontám klíčů.

Pokud je řetězec** význam** změněno, preferovat** přejmenování klíče** : nový klíč nemůže zdědit zastaralý překlad. To je použitý vzor #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Ukončí 0 s `SKIP reason=base-unresolved`, když nelze přečíst základní katalog (mělký klon bez základního ref), zrcadlení `check-openapi-breaking`.

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

### Práce: `test-vitest`

Běží po `build`. Bloky se při selhání spojí.

| Suite            | Ověřuje                                                     | Blokování                                                                                                   |
| ---------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 nástrojů), autoCombo, cache — vitest runner | Ano                                                                                                         |
| `test:vitest:ui` | UI testy součástek — vitest běžec                           | **Blokování** — již existující selhání jsou v `vitest.config.ts` výslovně vyloučena; nová selhání selhávají |

### Noční pracovní postupy (plánované, poradenské)

Ty běží podle plánu cron (a `workflow_dispatch`), nikdy ne na PRs. Všechny jsou poradní.

| Pracovní postup        | Ověřuje                                                                                                                                                 | Blokování   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | rychlé testy vlastností s náhodným počátečním počtem + vysokým počtem běhů                                                                              | **Poradní** |
| `nightly-resilience`   | brána růstu haldy, vstřikování chaosu, k6 load/soak                                                                                                     | **Poradní** |
| `nightly-llm-security` | promptfoo ochrana vstřikování (režim blokování) sondy + garak (přeskočeno bez tajemství poskytovatele)                                                  | **Poradní** |
| `nightly-schemathesis` | OpenAPI kontrakt fuzzing (schemathesis) proti živému OmniRoute pomocí `docs/openapi.yaml` — povrchů porušení specifikace / neošetřené 500s (fáze 8 B.4) | **Poradní** |
| `nightly-mutation`     | Skóre testování strykerových mutací na rychlé jednotkové dráze — přežívajících mutantů povrch slabá tvrzení                                             | **Poradní** |
| `nightly-compat`       | Matice kompatibility uzlového modulu napříč podporovanými rozsahy `engines.node`                                                                        | **Poradní** |

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

## Základní ráčna (`quality-baseline.json`)

Rohatkový motor (`scripts/quality/check-quality-ratchet.mjs`) čte `quality-baseline.json` a porovnává jej s čerstvě shromážděným `quality-metrics.json`. Jakákoli metrika, která se vrátí za hodnotu epsilon, se nezdaří sestavení.

Aktuální sledované metriky:

| Metrický              | Směr   | Význam                           |
| --------------------- | ------ | -------------------------------- |
| `eslintWarnings`      | `down` | Počet varování ESLint nesmí růst |
| `coverage.statements` | `up`   | Pokrytí výpisu nesmí klesnout    |
| `coverage.lines`      | `up`   | Pokrytí linky nesmí klesnout     |
| `coverage.functions`  | `up`   | Funkční pokrytí nesmí klesnout   |
| `coverage.branches`   | `up`   | Krytí větví nesmí klesnout       |

Aktualizace základní linie po skutečném zlepšení:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Příznak `--update` zapisuje aktuální naměřené hodnoty do `quality-baseline.json`. Potvrdit tento soubor spolu se změnou, která zlepšila metriku. PR, která zlepšuje metriku bez aktualizace základní linie, bude zachycena `--require-tighten` (fáze 6A.5, čeká se na implementaci).

### Ráčna CodeQL : obnovovací kadence a ruční spoušť

`check:codeql-ratchet` čte** stav repo, obnoven podle plánu — ne za PR.** `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` hlásí `state: configured`, `schedule: weekly`: skenování výchozího nastavení GitHub, nikoli analýza typu push. Důsledek: po sloučení výstrahy PR, která FIXES upozorňuje, ráčna čte starý vyšší počet, dokud neproběhne další naplánované skenování —, takže hlásí regresi u každého otevřeného PR, včetně vlastních následných kroků opravujícího PR, dokud skenování nedohoní.

**Ruční obnova** : `gh workflow run codeql.yml --ref release/vX.Y.Z` znovu spustí analýzu a během několika minut znovu publikuje výstrahy. Nejprve si přečtěte `.github/workflows/codeql.yml` — jeho záhlaví vysvětluje, že je `workflow_dispatch` -only** protože je v konfliktu s "výchozím nastavením" GitHub** (`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`). Obnovení spouštěčů `push`/`pull_request`/ `schedule` vyžaduje** nejprve akce vlastníka** : Nastavení → Zabezpečení kódu → CodeQL: Výchozí → Pokročilé. Nepřidávejte spouštěč `schedule:` bez tohoto přepínače — způsobí pouze neúspěšné běhy.

**Po poklesu počtu utáhněte základní linii** — `node scripts/check/check-codeql-ratchet.mjs --update` zapíše nový naměřený počet do `quality-baseline.json` → `metrics.codeqlAlerts.value`, takže ráčna tiše nedovolí regresi zpět ke starému stropu. Zpracovaný příklad (2026-09-02/03): PR #12502 opraveno 7 skutečných výstrah (13 → 6 měřeno otevřeno); PR #12530 zpřísnil zmrazenou základní linii 11 → 6, aby odpovídala; zbývajících 6 bylo poté propuštěno s odůvodněním pro jednotlivé výstrahy až na 0 otevřených.

**Výpovědi jsou voláním operátora (tvrdé pravidlo #14)** — nikdy nezruší výstrahu CodeQL bez zaznamenání technického zdůvodnění v komentáři k zamítnutí: `won't fix` pro požadavek upstream protokolu, `used in tests` pro testovací zařízení, `false positive` pro dezinfekční prostředek CodeQL nevidí (precedent: `docs/security/ERROR_SANITIZATION.md`).

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

## Zásady seznamu povolených

Každá brána, která nemůže selhat na již existujících porušeních, používá zmrazený seznam povolených (např. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Zásadou je:

**Opravte hlavní příčinu; použijte seznam povolených pouze v případě, že porušení již existuje a nelze jej opravit ve stejném PR.**

Při přidávání záznamu do seznamu povolených:

1. Přidejte komentář s odůvodněním.
2. Uveďte problém se sledováním (např. `// #3498 — Phase 2 feature, not yet implemented`).
3. Odstraňte záznam ve stejném PR, který opravuje porušení — zastaralý záznam, který již nepotlačuje aktivní porušení, je sám o sobě vadou (po implementaci zastaralého vynucení 6A.3 selže brána na osiřelém seznamu povolených položek).

Dělat** ne** přidejte položky seznamu povolených, aby testy prošly rychleji. Zelená brána s rostoucím seznamem povolených je falešným pocitem kvality.

### Když na vašem PR selže brána

1. **Pozorně si přečtěte výstup brány** — vám přesně řekne, který soubor nebo symbol porušil pravidlo.
2. **Opravte porušení** — většina bran jsou deterministické kontroly souborového systému, které projdou, jakmile je kód správný.
3. **Pokud porušení již existuje** (tj. nezavedli jste to, ale brána to nyní pokrývá): přidejte položku seznamu povolených s komentářem odůvodnění a problémem se sledováním.
4. **Pokud je brána ráčna** (pokrytí, varování ESLint, duplikace, složitost): vaše změna metriku zhoršila. Opravte základní problém nebo (zřídka) spusťte `npm run quality:ratchet -- --update` pokud je změna záměrná a snížení metriky je přijatelné — ale v popisu PR zdokumentujte proč.
5. **Poradní brány** (`continue-on-error: true`) jsou informační —, neblokují sloučení, ale objevují se v souhrnu CI. Každopádně je opravte.

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

## Nevyřízená racionalizace (ROI review — Fase 9 Onda 3)

Tento inventář byl odsouhlasen se `ci.yml` dne 2026-06-17 (předchozí verze vynechala `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence`). Přezkum ROI sladěné sady identifikoval následující kandidáty na racionalizaci.** Sloučení jsou mechanické změny CI ; flips/drops jsou politická rozhodnutí vyhrazená pro operátora.** Nic níže ještě není použito.

**Také nedoloženo výše** (poradní, nízký signál): úloha `docs-lint` (markdownlint + Vale, celá úloha `continue-on-error`) a pracovní postupy samostatného skeneru `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` je v `quality-baseline.json`, ale není připojeno k blokovací ráčně v `ci.yml` — metrika je momentálně osiřelá.

### Sloučení / odstranění (mechanické, nižší riziko)

Každý kandidát byl ověřen proti aktuálnímu stavu brány 2026-06-17 (důvěřuj-ale-ověřuj); Ukázalo se, že několik „zřejmých“ sloučení skrylo dluh a je** ne** čisté výpadky.

- **`check:docs-sync` běží dvakrát** — samostatně v úloze `lint` a znovu uvnitř `check:docs-all` (`docs-sync-strict`) a husky pre-commit hook. ✅**DONE** — samostatné vyvolání `lint` odstraněno.
- **skenování CVE** — ❌**NOT čisté sloučení.** `audit:deps` blokuje kritická upozornění a neúplné audity ve všech pěti souborech zámků, přičemž podle aktuálních zásad hlásí vysoké upozornění jako varování; `check:vuln-ratchet` (osv) selže pouze na _regresi_ oproti zapsané základní linii a v případě potřeby zamítne chybějící měření. Různá sémantika — vypuštěním `audit:deps` by ztratila absolutně kritickou bránu a potvrzení o nezávislém auditu balíčku. Nechte si obojí.
- **Detekce cyklu** — ✅**DONE** (#15159 G-01/G-02). Starý text zde nazval `check:cycles` "zelená, kurátorovaná" brána a odůvodňoval její blokování, protože `check:circular-deps` (dpdm) hlásil 91 cyklů. Ta zelená byla a** falešná zelená** : `check:cycles` naskenoval 5 podadresářů (450 souborů), porovnal pouze statické `import|export … from` a zrušil každý specifikátor `@/` a `@omniroute/open-sse/`, takže neviděl cykly aliasů dynamického importu +, které dominovaly repo. Opraveno: brána nyní prochází `src` + `open-sse` (5023 souborů), sbírá specifikátory ze TypeScript AST (takže `import("…")` se počítá a `typeof import("…")` typ-pozice ne) a řeší tsconfig `paths`. Najde to** 14** cyklů, nikoli 0. Protože v bráně PR nelze opravit 14 již existujících cyklů, `check:cycles` je nyní** ráčna** (`--ratchet`, strop `metrics.cycles.value = 14` v `quality-baseline.json`, `direction: down`) — blokuje jakoukoli _regresi_ a počet může pouze klesat. CI spustí `npm run check:cycles:ratchet`. Burn-down jezdí s**A-01** . `check:circular-deps` (dpdm) zůstává poradní jako širší druhý názor.
- **Složitost** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): jedna ESLint procházka, počítá se ruleId, takže cyklomatické + max-čáry a kognitivní základní linie zůstávají nezávislé; jednotlivé `check:complexity` / `check:cognitive-complexity` zůstávají pro místní `--update`.
- **`/api` proti halucinacím** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): jeden FS inventář `src/app/api`, openapi-routes + docs-symboly se stále hlásí nezávisle; jednotlivci zůstávají pro místní běhy.
- **`check:node-runtime` běží v 11 pracovních pozicích** — ⚠️** nízké ROI.** Každý je samostatný běžec a kontrola je < 1s; celková úspora ~ 10s, proti ztrátě levného strážce za práci. Nestojí to za to.
- **`typecheck:noimplicit:core` na CI** — ✅** odstraněno z lintovací úlohy** (byl poradní `continue-on-error`); povrch typu blokování je `typecheck:core` + `check:type-coverage`. Místní skript zachován.

### Otočit / rozhodnout (zásady provozovatele)

- `check:openapi-security-tiers` (poradní) — ❌**NOT čistě překlopitelný.** Ukončí 0, ale upozorní, že několik tras `traffic-inspector` pod `LOCAL_ONLY_API_PREFIXES` postrádá anotaci `x-loopback-only: true`. Jeho vynucení vyžaduje nejprve přidat tyto anotace do `openapi.yaml`.
- `typecheck:noimplicit:core` (poradní) — z velké části zahrnuto do blokovací `check:type-coverage` ráčny. Překlopte na ráčnu nebo zahoďte nadbytečný druhý průchod `tsc`.
- `test:vitest:ui` (nyní** blokování** ) předchozí selhání — jsou v `vitest.config.ts` explicitně vyloučena s komentáři sledování `// #8618` ; nová selhání selhávají.
- `check:secrets` (gitleaks, blokování ráčny zmrazené na 3 zdokumentovaných falešně pozitivních) — seznam povolených 3 k dosažení 0 nebo snížení na poradní. Překrývá GitHub nativní prohledávání tajemství + `check:public-creds`.
- `check:pr-evidence` (blokování, greps PR-body próza) — vysoké falešně pozitivní riziko; oslabuje vynucování Hard Rule #18 pokud je zrušeno, takže toto je skutečné volání politiky.
- `semgrep` (samostatné poradce) — se překrývá CodeQL pro rodiny OWASP ; připojte jeho základní linii k ráčně nebo kapce.

---

## Související dokumentace

- Dodavatelský řetězec (provenience, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — klíč-set paritní brána

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, práce `i18n-ui-coverage`). Porovná sadu klíčů listu každého `src/i18n/messages/<locale>.json` se `en.json` a selže na jakémkoli chybějícím nebo extra listu, bez ohledu na to, kdy byl klíč přidán. Zástupné symboly `__MISSING__:` se počítají jako přítomné (jejich obsah je záležitostí brány poměru). Je absolutním doplňkem dvou bran diff-based/percentage : `check-ui-keys-coverage` vynucuje 80% nejnižší hodnotu na lokalitu (43 chybějících klíčů z 13 000 ~ je stále 99,7 %) a `check-new-key-coverage` posuzuje pouze klíče, které PR přidává do `en.json`. Dávka národního prostředí je generována ze `en.json` dne, kdy byla větev přerušena, a překládá se několik dní, zatímco základna neustále přidává klíče; dávka PR sama nepřidává žádný klíč, takže oba sourozenci zůstali zticha, když dávka 1 (#13044) přistála o 43 klíčů v devíti lokalitách a dávka 2 (#13660) o 10 klíčů v osmi (2026-09-15). Opravte červenou pomocí `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; list `extra` znamená, že jej zdroj zahodil — jej odstranil z národního prostředí. `--warn` hlásí bez selhání. `--catalog=cli` spustí stejné srovnání přes `bin/cli/locales` (`npm run i18n:check-keys:cli`); oba kroky žijí v práci `i18n-ui-coverage`.

#### `check-new-key-coverage` — brána nového klíče i18n

Sourozenec `check-ui-value-drift`. Ten zachycuje anglickou hodnotu, která byla** přepsáno** zatímco jeho překlady zůstaly pozadu; tenhle zachytí anglický klíč, který byl** přidáno** zatímco některé lokality jej nikdy neobdržely.

`check-ui-keys-coverage` tuto třídu nevidí: vynucuje si procentuální minimum na národní prostředí a jedenáct chybějících klíčů z 13 000 ~ ponechává pokrytí na 99,9 %. Procento na jazyk nemůže vyjádřit „tato funkce byla odeslána nepřeložená“ — celá funkce může přistát v novém národním prostředí bez textu a číslo se nikdy nepohne.

Incident, který kóduje: 3. fáze Orchestration Canvas přeložila svých jedenáct klíčů přes 42 lokalit, které v té době existovaly. O několik hodin později dávka v jazyce EU (#13044) přenesla repo do 51 lokalit a devět nově příchozích (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) je nikdy neobdrželo. `deepMergeFallback` nahrazuje angličtinu za chybějící klíč, takže režim selhání byl nepřeložený UI spíše než prázdný UI — skutečný a tichý svou konstrukcí.

Stejně jako jeho sourozenec** uvědomující si rozdíl** , porovnává angličtinu na slučovací základně s pracovním stromem, takže již existující mezery zůstávají zmrazené a brána nepotřebovala žádnou migraci, aby se zapnula.

**Značka `__MISSING__:<english>` to nesplňuje (od 2026-09-17).** Kdysi to bylo zdokumentované odložení — běhové prostředí se vrátí do správného anglického — dokud osm funkcí PRs 16. 9. 2026 nepřidalo 61 klíčů a orazítkovalo značku do všech 65 lokalit místo překladu: tato brána přijala každé, nic neblokovalo PRs a blokovací poměr reálného překladu pak selhal na 2pt.5 % BR tip pro všechny > + 0,5). Značka je nyní posuzována jako chybějící překlad. Opravte červenou pomocí `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, nebo všechna národní prostředí paralelně s `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`, odděleně-safe, odmítá spustit bez `OMNIROUTE_TRANSLATION_*` env). Klíč, který musí zůstat anglický (připnutý název product/engine/flag ), patří do `scripts/i18n/untranslatable-keys.json`, nikdy za značku. `vi` přímo zakazuje značky (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — zaparkovaná testovací brána

Soubor v seznamu `exclude` `vitest.config.ts` je test, který se nespustí a vypadá jako pokrytí pro toho, kdo čte strom. Za komentářem `// #8618 — pre-existing failure; remove this exclusion when fixed` se nashromáždilo 62 souborů. Vydání #8618 bylo uzavřeno 2026-08-11, zatímco seznam, který sledoval, se rozrostl ze 45 záznamů na 62, přičemž každý nový zdědil komentář ukazující na mrtvý problém. Když byl seznam konečně změřen soubor po souboru (#13204),** 51 z 62 prošlo proti aktuálnímu stromu bez změny zdroje** .

Brána vyžaduje každé vyloučení, které se převede na skutečný soubor, aby (a) pojmenovalo problém se sledováním a (b) se objevilo v `config/quality/vitest-exclusions.json` s jeho naměřeným stavem, takže přidání jednoho je kontrolovatelným rozdílem ve vyhrazeném souboru spíše než o jeden další řádek v poli s 60 položkami. Záměrně znovu nespouští vyloučené testy —, které stojí ~ 10 minut a patří do pravidelné úlohy; inventarizační záznamy, kdy byl každý z nich naposledy měřen.
