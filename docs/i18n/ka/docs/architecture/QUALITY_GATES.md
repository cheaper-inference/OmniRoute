# Quality Gates Reference (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

ეს დოკუმენტი OmniRoute-ში CI-ის ხარისხის ყველა ბარიერის ავტორიტეტული ცნობარია.
იგი აღწერს თითოეულ ბარიერს, რას ამოწმებს ის, რომელ CI დავალებაში სრულდება, იყენებს თუ არა
ეტალონის ეტაპობრივი გამკაცრების ან ჩაბარება/ჩავარდნის პოლიტიკას და ბლოკავს თუ არა აგებას, თუ მხოლოდ სარეკომენდაციო ხასიათი აქვს.

მოკლე შეჯამებისა და დაშვებული გამონაკლისების სიის პოლიტიკისთვის იხილეთ სექცია „Quality Gates & Ratchets“
ფაილში `AGENTS.md`. იმავე სისტემის კრიტიკული შეფასების, სიმწიფის კლასიფიკაციისა და კონკრეტულ ხელსაწყოებზე დამოუკიდებელი
გამეორების გეგმისთვის იხილეთ
[ხარისხის ბარიერების სახელმძღვანელო](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Gate-ის ინვენტარი და შესრულების პროფილები

### კანდიდატის დაშვება

CI და Quality Gates სამუშაო პროცესებიდან თითოეული გასცემს სტაბილურ დასკვნას: `Gate / CI` და
`Gate / Quality`. მათი ვერსიონირებული დაშვების პოლიტიკა ყველა ზედა დონის job-ს
აუცილებელ ან საკონსულტაციოდ ასახელებს. შესაბამისი აუცილებელი job წარმატებით უნდა
დასრულდეს: არარსებული, გაუქმებული, გამოტოვებული, მომლოდინე და უცნობი შედეგები PASS-ის
დასადგენად საკმარისი არ არის. ვალიდურმა მხოლოდ დოკუმენტაციის ან მხოლოდ კატალოგის
კლასიფიკაციამ შეიძლება კოდის lane გამოუსადეგარი გახადოს; draft PR მიღებულ კანდიდატად
არ ითვლება. `hotfix` label მტკიცებულებას არ აუქმებს.

ორივე workflow მოიცავს PR-ებს main/release ბრენჩებში, push-ებს
`main`-ზე, ხელით გაშვებასა და merge-group მოვლენებს. Push, dispatch და merge-group
სრულ შერჩევას ასრულებს. `release/**`-ზე push-ები მათ არ იწყებს (2026-10-18): თითოეული
ცვლილება უკვე გაეშვა მატრიცაში მის PR-ზე, ხოლო გაერთიანებული კომბინაცია Release-Green-ის
საქმეა (`docs/ops/RUNNER_BOX.md` → Hosted lane). Fork-ები და merge group-ები იყენებენ
hosted runner-ებს იმ job-ებისთვის, რომლებიც სხვა შემთხვევაში self-hosted
runner-ებს აირჩევდნენ; rollout-მდე უნდა გადამოწმდეს hosted-ის საკმარისი
სიმძლავრე.

თითოეული JSON receipt განსაზღვრავს checkout-ის SHA-ს, workflow run-სა და მცდელობას.
CLI უარყოფს checkout/event SHA-ის შეუსაბამობას. Workflow ტესტები პოლიტიკის წევრობას
verdict job-ის `needs` სიას უკავშირებს, რათა ახალი ან წაშლილი lane ჩუმად ვერ გაქრეს.
Receipt-ები ფარავს საკუთარ workflow-ს და არა publication-ს, deployment-ს ან არსებული
advisory scanner-ის შიდა მექანიზმებს. branch rules-ში ორივე check name-ის გააქტიურება
ცალკე ადმინისტრაციული ცვლილებაა; ამ job-ების დამატება თავისთავად branch-ს არ იცავს.

### სტატიკური სკანირების ინვენტარი

ვერსიონირებული npm-alias ინვენტარი და static-scan-ის წევრობა მდებარეობს
`config/quality/gate-manifest.json`-ში. გაუშვით `npm run check:gate-manifest`, რათა
`package.json`-ის წინააღმდეგ გადამოწმდეს script-ების სახელები და ზუსტი ბრძანებები;
დამატებები, წაშლები და ბრძანებების გადახრა როგორც ლოკალურ hook-ს, ისე CI-ში
ცვლილების კლასიფიკაციის job-ებს აფერხებს. alias არ არის workflow job, matrix instance
ან test case: ეს რაოდენობები ურთიერთშემცვლელად არ უნდა იყოს წარმოდგენილი.

გამოიყენეთ `npm run quality:scan -- --list` ან `npm run quality:scan:fast -- --list`,
რათა შერჩეული alias-ები მათი შესრულების გარეშე შეამოწმოთ. runner npm entrypoint-ს
იძახებს, ამიტომ მისი runtime (მათ შორის, სადაც კონფიგურირებულია Bun) შენარჩუნებულია.
manifest ამ პროფილების გარეთ არსებულ alias-ებს ცალკე გამოძახებულად აფიქსირებს, ხოლო
maintenance ბრძანებები მხოლოდ წაკითხვადი scan პროფილებში აკრძალულია.

ეს პროფილები მხოლოდ სტატიკურ სკანირებას ფარავს. ისინი არ ადასტურებს product test-ებს,
coverage-ს, packaging-ს, გარე შემოწმებებს ან კანდიდატის release acceptance-ის სრულ
კრიტერიუმებს. Workflow-ის დაშვება იყენებს დაკავშირებულ
`config/quality/admission-policy.json`-სა და `scripts/quality/admission-verdict.mjs`-ს.
Release-observer პროფილები ცალკეა; მათი შესაბამისი check-ები და receipt-ები
დამოუკიდებლად შეამოწმეთ. ქვემოთ მოცემული პროზაული ინვენტარი საცნობარო მასალაა და არა
მტკიცებულება იმისა, რომ gate რეალურად გაეშვა.

სკრიპტები მდებარეობს `scripts/check/`-ში (policy gates) და `scripts/quality/`-ში
(ratchet engine). CI-ის სიმართლის წყაროა `.github/workflows/ci.yml`.

### Release PR fast-path (`quality.yml`)

`.github/workflows/quality.yml` ავსებს CI-ს main/release PR-ებზე, `main`-ზე push-ებისას,
dispatch-სა და merge group-ებში. PR-ები path-filtered fast check-ებს იყენებს. მუდმივად
გამორთული დუბლირებული build წაიშალა; რეალური build/package/boot check-ები CI-ში რჩება.

| Job                                              | Scope                                                                                                                                                                                                                              | Blocking                |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PR-ები; API docs refs და docs-all                                                                                                                                                                                        | დიახ                    |
| `Fast Quality Gates`                             | Code PR-ები; static checks, typecheck, dashboard typecheck, impacted unit tests                                                                                                                                                    | დიახ                    |
| `Forgotten sibling tests`                        | Code PR-ები; შეცვლილი მოდულები, რომლებიც static consumer-ებთან და კანდიდატის sibling test-ებთან არის მიყოლილი; barrel და dynamic-import გზები იუწყება როგორც საკონსულტაციო დიაგნოსტიკა, referenced allowlist გამონაკლისებთან ერთად | **საკონსულტაციო**       |
| `Vitest (fast-path)`                             | Code PR-ები; fast vitest suite                                                                                                                                                                                                     | დიახ                    |
| `Unit Tests fast-path`                           | Code PR-ები; 4-shard unit suite                                                                                                                                                                                                    | დიახ                    |
| `No new ESLint warnings`                         | Code PR-ები; suppressions-aware lint guard                                                                                                                                                                                         | დიახ, fork-ების ჩათვლით |
| `Merge integrity (changelog + generated skills)` | Non-draft PR-ები; changelog და generated skill sync                                                                                                                                                                                | დიახ, fork-ების ჩათვლით |

#### Forgotten sibling tests report

`npm run check:forgotten-sibling-tests` ხელახლა იყენებს იმპორტების რეზოლვერს, რომელიც ტესტების გავლენის რუკის უკან დგას.
თითოეული შეცვლილი production-მოდულისთვის ის ანგარიშში ასახავს დეტერმინისტულ
`changed module/symbol -> static consumer -> candidate sibling test` ჯაჭვებს, როდესაც კანდიდატი
ტესტი pull request-ის diff-ში არ არის. Markdown-ის შეჯამება და JSON-ის შედეგი ინახება
`forgotten-sibling-tests` workflow-ის არტეფაქტად, რათა ნებისმიერი ბლოკირების ამოქმედებამდე მოხდეს კალიბრაცია.

Barrel-ის ხელახალი ექსპორტები და დინამიკური იმპორტები მხოლოდ რეზოლუციის დიაგნოსტიკაა; ისინი არასდროს ქმნიან
ბლოკირებად აღმოჩენას. განხილული გამონაკლისები განთავსებულია
`config/quality/forgotten-sibling-allowlist.json`-ში. თითოეულ ჩანაწერში მითითებული უნდა იყოს consumer და კანდიდატი
ტესტი, მოცემული უნდა იყოს კონკრეტული დასაბუთება და მითითებული უნდა იყოს GitHub-ის issue ან pull request. არასწორად ფორმირებული ჩანაწერები ნაგულისხმევად უარყოფილია. გამონაკლისებს არ შეუძლიათ წაშლილი კანდიდატი ტესტის ან diff-ის
დაფარვა, რომელიც `.skip`/`.todo`-ს ამატებს; assertion-ის შესუსტება და დაფარვის სხვა მეთოდები რჩება დამოუკიდებლად
ბლოკირებადი `check:test-masking` gate-ის პასუხისმგებლობად.

### Job: `lint`

ეშვება `main`-ზე მიმართულ ყოველ PR-ზე. წარუმატებლობის შემთხვევაში merge-ს ბლოკავს.

| სკრიპტი (`npm run ...`)           | ამოწმებს                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ბლოკავს                                       |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `check:node-runtime`              | Node.js-ის ვერსია მხარდაჭერილ დიაპაზონშია                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | დიახ                                          |
| `check:cycles`                    | ციკლური იმპორტები `src/` + `open-sse/`-ის მასშტაბით (AST-ზე დაფუძნებული, tsconfig-ის `paths` გადაჭრილი). Bare რეჟიმი აბრუნებს 1-ს, როცა რომელიმე ციკლი არსებობს (fail-closed since #15281) და ჩამოთვლის SCC-ებს. `check:cycles:ratchet` (რასაც CI უშვებს) ბლოკავს, როდესაც რაოდენობა აჭარბებს `quality-baseline.json`-ში `metrics.cycles`-ის ზღვარს — ამჟამად 14-ს, `direction: down`, ამიტომ რაოდენობა მხოლოდ უნდა შემცირდეს (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | დიახ (ratchet)                                |
| `check:boundary`                  | `open-sse → src`-ის კავშირი: ძრავიდან აპლიკაციაში უნიკალური ფაილიდან-ფაილამდე იმპორტები (`scripts/quality/measure-boundary.mjs`; კავშირების სია წარმოადგენს v4 core/module-split-ის გამოსწორების backlog-ს). Bare რეჟიმი ქმნის საინფორმაციო ანგარიშს (`quality:boundary`-ის მსგავსად). `check:boundary:ratchet` (რასაც CI უშვებს და რომელიც ასევე შედის `quality.yml`-ის fast-gates ratchet loop-ში) ბლოკავს, როდესაც რაოდენობა აჭარბებს `quality-baseline.json`-ში `metrics.boundaryOpenSseToSrc`-ის ზღვარს — საწყისად აღებულია გაზომილი 771, `direction: down`; `--update` მას მხოლოდ ამცირებს; PR-ებზე საბაზისო რეფერენსთან მიმართებით (`--base-ref`, იხილეთ ქვემოთ)                                                                                                                                                                                                                                                                                                                                                                                                                                                            | დიახ (ratchet)                                |
| `check:route-validation:t06`      | Zod-ის სქემები წარმოდგენილია ყველა route-ზე (Tier 6-ის პოლიტიკა)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | დიახ                                          |
| `check:any-budget:t11`            | `@ts-expect-error // any` count არ აღემატება ბიუჯეტს (მე-11 დონის catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | დიახ                                          |
| `check:provider-consistency`      | `providers.ts`-ში არსებულ ყველა პროვაიდერს `providerRegistry.ts`-ში შესაბამისი ჩანაწერი აქვს (და პირიქით, დაშვებული სიაში)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | დიახ                                          |
| `check:model-lifecycle`           | ხელით შენარჩუნებული მარშრუტიზაციის სამი ცხრილი თანმიმდევრული რჩება კომიტში შეტანილ ლაიფციკლის სნეპშოტთან (#11503): `FITNESS_TABLE` (`taskFitness.ts`) არ აფასებს არცერთ გაუქმებულ id-ს, რომლის მარშრუტიზაციაც `REGISTRY`-ს შეუძლია; `BUILT_IN_ALIASES`-ის ყველა სამიზნე წარმოდგენილია `REGISTRY`-ში და არ არის გაუქმებული id-ების სნეპშოტში; `REGISTRY`-ში ჯერ კიდევ არსებული ყველა გაუქმებული id გადამისამართებულია ან ჩამოთვლილია `allowedRetiredInCatalog`-ში; და არც `DEFAULT_DEGRADATION_MAP`-ის წყარო და არც სამიზნე არ არის მონიშნული როგორც გაუქმებული ამ სნეპშოტში. ეს არ ადასტურებს, რომ მოდელს ამჟამად ცოცხალი upstream ემსახურება. ოფლაინ რეჟიმი — ადარებს `config/quality/model-lifecycle.json`-ს, რომლის ხელით განახლებაც ხდება `npm run quality:refresh-model-lifecycle`-ით (ქსელი; CI-ში ჩართული არ არის). `allowedRetiredInCatalog` არის შემცირების რატჩეტი: ჩანაწერი დაამატეთ მხოლოდ tracking issue-სთან ერთად.                                                                                                                                                                                                  | დიახ                                          |
| `check:fetch-targets`             | კლიენტის მხარეს არსებულ `src/`-ში ყოველი `fetch("/api/...")` რეალურ `route.ts`-ზე რეზოლვდება                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | დიახ                                          |
| `check:deps`                      | რეპოზიტორიის ყველა `package.json`-ში არსებული `npm install`-ით დასაყენებელი ყველა დამოკიდებულება მითითებულია `dependency-allowlist.json`-ში; ახალი დაუფიქსირებელი ან slopsquatted პაკეტები მონიშნულია                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | დიახ                                          |
| `audit:deps`                      | `npm audit` (root + electron) — მაღალი/კრიტიკული რეკომენდაციები არ არსებობს (ფარავს osv `check:vuln-ratchet`-ს; იხილეთ რაციონალიზაციის ბექლოგი)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | დიახ                                          |
| `check:lockfile`                  | `package-lock.json` integrity — https registry, integrity hashes, no host overrides                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | დიახ                                          |
| `check:licenses`                  | SPDX license allowlist for production dependencies                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | დიახ                                          |
| `check:tracked-artifacts`         | No build artifacts / committed `node_modules` symlinks (also runs in husky pre-commit; pre-push is intentionally light — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | დიახ                                          |
| `check:ai-attribution`            | No AI/bot `Co-Authored-By` trailer or AI-generation footer in PR commits, title or body — Hard Rule #16 (in the `quality.yml` fast-gates loop for PR→`release/**` — reads the event payload, no-op off PRs — and a PR-only step in `ci.yml` lint for PR→`main`; also the husky `commit-msg` hook; human co-authors allowed; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | დიახ                                          |
| `check:vitest-exclusions`         | Every Vitest exclusion names a tracking issue and appears in `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | დიახ                                          |
| `check:file-size`                 | Source files (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) stay within `cap` and test files (`*.test.ts(x)`) within `testCap`; files frozen in `file-size-baseline.json` (`frozen` / `testFrozen`) must not grow past their recorded size                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | დიახ                                          |
| `check:error-helper`              | executors/handlers-ში შეცდომის პასუხები იყენებს `buildErrorBody()` / `sanitizeErrorMessage()`-ს (მკაცრი წესი #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | დიახ                                          |
| `check:migration-numbering`       | მიგრაციის SQL ფაილებს თანმიმდევრული ნომრები აქვთ, გამოტოვებებისა და დუბლიკატების გარეშე                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | დიახ                                          |
| `check:public-creds`              | `publicCreds.ts`-ის გარეთ არ არსებობს OAuth-ის პირდაპირი `client_id`/`client_secret` ან Firebase Web გასაღებები (მკაცრი წესი #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | დიახ                                          |
| `check:db-rules`                  | `src/lib/db/` მოდულების გარეთ არ გამოიყენება დაუმუშავებელი SQL; `localDb.ts`-დან barrel-იმპორტები აკრძალულია (მკაცრი წესები #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | დიახ                                          |
| `check:known-symbols`             | პროვაიდერის executors-ები, მარშრუტიზაციის სტრატეგიები და მთარგმნელები, რომლებიც რეგისტრირებულია dispatch table-ებში, ემთხვევა დისკზე არსებულ ფაილებს — არ არსებობს ობოლი ან გამოუცხადებელი სიმბოლოები                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | დიახ                                          |
| `check:route-guard-membership`    | ყველა route, რომელიც შვილობილ პროცესს ქმნის, კლასიფიცირებულია `isLocalOnlyPath()`-ის მიხედვით (მკაცრი წესები #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | დიახ                                          |
| `check:test-discovery`            | რეპოზიტორიის ყველა `*.test.ts` / `*.spec.ts` ფაილი შეგროვებულია სულ მცირე ერთი ტესტის გამშვების მიერ (რაჩეტი: `test-discovery-baseline.json`-ში ობოლი ფაილების სია შეიძლება მხოლოდ შემცირდეს)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | დიახ                                          |
| `check:test-tla-order`            | `tests/unit`-ში არცერთი `node:test` ფაილი არ არეგისტრირებს ტესტს, არ ხვდება ზედა დონის `await`-ზე და შემდეგ არ არეგისტრირებს დამატებით ტესტებს (#18045; რაჩეტი: `test-tla-order-allowlist.json` შეიძლება მხოლოდ შემცირდეს)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | დიახ                                          |
| `check:agent-skills-sync`         | გენერირებული agent-skills არტეფაქტები ემთხვევა მათ წყაროს კატალოგს (განსხვავება არ არის)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:provider-asset-provenance` | პროვაიდერის ლოგოებს/რესურსებს აქვთ წარმოშობის შესახებ ჩაწერილი ჩანაწერი                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `lint:json`                       | JSON-ის კონფიგურაციის ფაილები წარმატებით მუშავდება და აკმაყოფილებს რეპოზიტორიის lint-ის წესებს                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `typecheck:core`                  | TypeScript-ის კომპილაცია შეცდომების გარეშე (მხოლოდ საინფორმაციო გაფრთხილებები)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | დიახ                                          |
| `typecheck:noimplicit:core`       | მკაცრი `noImplicitAny` — სამომავლოდ გამოსადეგი; მრავალი უკვე არსებული გამოძახების ადგილი ჯერ კიდევ საჭიროებს ანოტაციებს                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | **საკონსულტაციო** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, შეზღუდული `src/app/(dashboard)/**`-ზე (#7033) — `typecheck:core`-ის შერჩეული 27-ფაილიანი დაშვებული სია არ მოიცავს არც ერთ dashboard TSX-ს, ხოლო `next build` მას საერთოდ არ ამოწმებს ტიპებზე (`next.config.mjs`-ში მითითებულია `ignoreBuildErrors: true`), ამიტომ იქ ობოლი იდენტიფიკატორებით გამოწვეული რეგრესიები (#6625/#6909) CI-სთვის უხილავი იყო. განსხვავებებს ადარებს თითოეული ფაილის/TS-კოდის გაყინულ რაოდენობრივ საბაზისო მაჩვენებელს (`config/quality/dashboard-typecheck-baseline.json`, იგივე მოძველებული-აღსრულების ნიმუში, როგორიც `check:known-symbols`-შია) — მხოლოდ საბაზისო რაოდენობაზე მეტი ახალი შეცდომები აჩერებს კარიბჭეს; რაოდენობის შესამცირებლად გამოიყენეთ `--update`, როცა უკვე არსებული შეცდომა გამოსწორდება.                                                                                                                                                                                                                                                                                                                                                                                   | დიახ                                          |
| `check:build-typecheck`           | მთელი აპლიკაციის საწარმოო ტიპების შემოწმება `tsconfig.build.json`-ის მიხედვით (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`); ზედაპირი, რომელსაც მოიცავს `typecheck:core`-ის 27-ფაილიანი დაშვებული სია და dashboard-ის კარიბჭე, ამას არ ფარავს. განსხვავებებს ადარებს `config/quality/build-typecheck-baseline.json`-ს; თითოეული (ფაილი, კოდი)-ს ახალი ან გაზრდილი რაოდენობა იწვევს ჩავარდნას, ხოლო შემცირებული რაოდენობა გთხოვთ, შეამციროთ საბაზისო მაჩვენებელი. `--update` უარს ამბობს მუშაობის დასრულებაზე, თუ მასში ახალი ან გაზრდილი წყვილია, გარდა იმ შემთხვევისა, როცა გადაცემულია `--force-regressions`, და უარს ამბობს ახლად დადუმებულ ფაილზე, თუ გადაცემული არ არის `--force-nocheck`; ამგვარად, მწვანე შედეგის მისაღებად საბაზისო მაჩვენებლის გაფართოება და მუდმივი დადუმების მინიჭება ორი ცალკე, გააზრებული ქმედებაა. ცალკე `--force` უარყოფილია. ასევე ამოწმებს build-ის არეალს `@ts-nocheck`-ის არსებობაზე `config/quality/ts-nocheck-baseline.json`-თან შედარებით, რადგან მისი გამოყენების მქონე ფაილი საერთოდ არ აჩვენებს დიაგნოსტიკას და სხვაგვარად ყველა კარიბჭისთვის უხილავი იქნებოდა. | დიახ                                          |

#### ორი typecheck პროგრამა განსხვავებულ პასუხებს იძლევა

`typecheck:core` და `check:build-typecheck` სხვადასხვა პროგრამებს, განსხვავებული
პარამეტრებით, აკომპილირებენ და ერთი და იგივე ფაილი ერთში შეიძლება სუფთა იყოს, მეორეში კი შეცდომებით სავსე.

`tsconfig.build.json`-ში `"strict": false` არის მითითებული, ამიტომ `noImplicitAny` გამორთულია. core-ის კონფიგურაცია უფრო მკაცრი პარამეტრებით აკომპილირებს შერჩეულ 27-ფაილიან დაშვებულ სიას და თითოეული ჩანაწერის იმპორტების გრაფს მიჰყვება, ამიტომ ფაილები, რომლებიც build-ის პროგრამაში არასოდეს ჩნდება, იქ მაინც მოწმდება.

ეს შედეგი მნიშვნელოვანია, როცა აფასებთ, არის თუ არა ფაილი ტიპიზებული: **`check:build-typecheck`-ის ქვეშ ნულოვანი დიაგნოსტიკა არ ნიშნავს ნულს**. 26 ფაილიდან `@ts-nocheck`-ის ამოღებამ აჩვენა, რომ build-ის პროგრამაში მათგან 23 სუფთა იყო; ამ 23-დან თექვსმეტმა მკაცრ პროგრამაში დაახლოებით 120 implicit-any შეცდომა გამოავლინა. ფაილის სუფთად მიჩნევამდე ორივე შეამოწმეთ.

### დავალება: `quality-gate`

ეშვება `test-coverage`-ის შემდეგ. ჩავარდნის შემთხვევაში აჩერებს merge-ს.

| სკრიპტი                      | ამოწმებს                                                                                                                                                                                                                                | ბლოკავს                    |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `quality:collect`            | წარმოქმნის `quality-metrics.json`-ს (ESLint-ის გაფრთხილებების რაოდენობა, merged shard report-იდან მიღებული დაფარვა)                                                                                                                     | დიახ (ratchet-ის upstream) |
| `quality:ratchet`            | `quality-baseline.json`-ში არსებული თითოეული მეტრიკა არ გაუარესებულა (ESLint-ის გაფრთხილებები ≤ baseline-ს; დაფარვა ≥ baseline-ს)                                                                                                       | დიახ                       |
| `check:duplication`          | კოდის დუბლირება (jscpd@4) არ აღემატება `quality-baseline.json`-ში მითითებულ baseline-ს                                                                                                                                                  | დიახ                       |
| `check:complexity`           | ფაილის დონის ციკლომატური სირთულე არ აღემატება ლიმიტს (core ESLint-ის `complexity` + `max-lines-per-function`)                                                                                                                           | დიახ                       |
| `check:cognitive-complexity` | კოგნიტიური სირთულის ratchet (`eslint-plugin-sonarjs`) — ცალკე ESLint-ის შემოწმება; CI ორივეს აერთიანებს ერთ `check:complexity-ratchets` ეტაპად                                                                                          | დიახ                       |
| `check:dead-code`            | გამოუყენებელი ექსპორტების / ფაილების ratchet (knip) baseline-თან შედარებით არ გაუარესებულა                                                                                                                                              | დიახ                       |
| `check:compression-budget`   | შეკუმშვის ბენჩმარკის ბიუჯეტი — თითოეული ძრავისთვის ტოკენების დაზოგვის მინიმალური ზღვარი არ უნდა გაუარესდეს                                                                                                                              | დიახ                       |
| `check:type-coverage`        | ტიპიზებული კოდის პროცენტის ratchet (`type-coverage`) არ გაუარესებულა; დიდწილად მოიცავს `typecheck:noimplicit:core`-ს                                                                                                                    | დიახ                       |
| `check:codeql-ratchet`       | გახსნილი CodeQL შეტყობინებების რაოდენობა არ გაუარესებულა (იკითხება `gh api`-ის მეშვეობით; ტოკენის გარეშე გამოტოვება უსაფრთხოდ ხდება) — განახლების პერიოდულობისა და ხელით გაშვების შესახებ იხილეთ ქვემოთ, „CodeQL ratchet“ განყოფილებაში | დიახ                       |

### სამუშაო: `quality-extended`

მთელი სამუშაო მხოლოდ საინფორმაციო ხასიათისაა (`continue-on-error: true`). npm-ზე დაფუძნებული ratchet-ები
რეალურად სრულდება; გარე სკანერები ინსტალირდება `gh release download`-ის მეშვეობით და თავად გამოტოვებს შესრულებას (გასასვლელი კოდი 0),
თუ ბინარული ფაილი ჯერ კიდევ არ არსებობს.

| სკრიპტი                  | ამოწმებს                                                                                                                                                                                                                                 | ბლოკირება                                               |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `check:circular-deps`    | ციკლური დამოკიდებულებები არ არსებობს (dpdm)                                                                                                                                                                                              | **საინფორმაციო**                                        |
| `check:bundle-size`      | ბანდლის ზომა არ აღემატება ლიმიტს                                                                                                                                                                                                         | **საინფორმაციო**                                        |
| `check:secrets`          | საიდუმლოებების სკანირება (gitleaks) — გამოტოვებულია, თუ ბინარული ფაილი არ არსებობს                                                                                                                                                       | **საინფორმაციო**                                        |
| `check:vuln-ratchet`     | დამოკიდებულებების მოწყვლადობები (osv-scanner) არ გაუარესებულა — გამოტოვებულია, თუ ბინარული ფაილი არ არსებობს                                                                                                                             | **საინფორმაციო**                                        |
| `check:workflows`        | Workflow-ის lint (actionlint + zizmor); დაკარგული/გაფუჭებული სკანერები, არასწორი ანგარიშები ან დაკარგული ratchet-ის baseline იწვევს INCOMPLETE სტატუსით ჩავარდნას. ვალიდური აღმოჩენები მიჰყვება არჩეულ strict/advisory/ratchet პოლიტიკას | შესრულება სავალდებულოა; CI-ში zizmor-ის ratchet ბლოკავს |
| `check:openapi-breaking` | საჯარო API კონტრაქტში (`openapi.yaml`) base branch-თან შედარებით არსებული დამრღვევი ცვლილებები (oasdiff) — წარმოქმნის `openapiBreaking=N`-ს; გამოტოვებულია, თუ oasdiff არ არსებობს ან base spec-ის ამოხსნა ვერ ხერხდება                  | **საინფორმაციო**                                        |

### სამუშაო: `docs-sync-strict`

სრულდება `main`-ზე მიმართულ ყოველ PR-ზე. შეცდომის შემთხვევაში merge-ს ბლოკავს.

| Script                         | ამოწმებს                                                                                                                                                                                                  | ბლოკავს                              |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `check:docs-all`               | მეტა-კარიბჭე, რომელიც ქვემოთ მოცემულ 6 ქვეკარიბჭეს თანმიმდევრულად უშვებს                                                                                                                                  | დიახ                                 |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt ვერსიების თანმიმდევრულობა                                                                                                                                                   | დიახ                                 |
| ↳ `check:docs-counts`          | პროზაში მითითებული რაოდენობები (პროვაიდერების რაოდენობა, მიგრაციების რაოდენობა და სხვ.) რეალური რაოდენობების რატჩეტის ფანჯრის ფარგლებშია                                                                  | დიახ                                 |
| ↳ `check:env-doc-sync`         | `.env.example`-ში არსებული ყველა env ცვლადი დოკუმენტირებულია დოკუმენტაციის ცხრილში და პირიქით                                                                                                             | დიახ                                 |
| ↳ `check:deprecated-versions`  | დოკუმენტაციაში არ არის მოძველებული ვერსიის სტრიქონები                                                                                                                                                     | დიახ                                 |
| ↳ `check:doc-links`            | დოკუმენტაციაში არსებული შიდა Markdown ბმულები რეალურ ფაილებზე მიუთითებს (`[text]`/`(path)` ფორმა)                                                                                                         | დიახ                                 |
| ↳ `check:fabricated-docs`      | დოკუმენტაციაში მითითებული მარშრუტები, env ცვლადები, CLI ბრძანებები, hook-ების სახელები და ფაილის ბილიკები კოდების ბაზაში არსებობს. `--strict`-ის მეშვეობით მკაცრი შემოწმება; ალმის გარეშე რბილი ჩავარდნა. | დიახ (`--strict`-ის მეშვეობით CI-ში) |
| `check:cli-i18n`               | CLI ბრძანებების სტრიქონები წარმოდგენილია ყველა i18n ლოკალის ფაილში                                                                                                                                        | დიახ                                 |
| `check:openapi-coverage`       | OpenAPI სპეციფიკაცია მოიცავს რეალური მარშრუტების სულ მცირე რატჩეტით განსაზღვრულ მინიმალურ რაოდენობას                                                                                                      | დიახ                                 |
| `check:openapi-security-tiers` | `openapi.yaml`-ში უსაფრთხოების დონის ანოტაციები თანხვედრაშია `routeGuard.ts`-ის კლასიფიკაციებთან                                                                                                          | **საკონსულტაციო**                    |
| `check:openapi-routes`         | `openapi.yaml`-ში არსებული ყველა path რეალურ `route.ts`-ზე მიუთითებს (ჰალუცინაციების საწინააღმდეგო შემოწმება)                                                                                             | დიახ                                 |
| `check:docs-symbols`           | `docs/**/*.md`-ში არსებული ყოველი `/api/...` მითითება რეალურ `route.ts`-ზე მიუთითებს (ჰალუცინაციების საწინააღმდეგო შემოწმება)                                                                             | დიახ                                 |
| `i18n translation drift`       | i18n ლოკალის ფაილებში უთარგმნელი გასაღებები — მხოლოდ გაფრთხილება                                                                                                                                          | **საკონსულტაციო**                    |

`docs/diagrams/`-ში არსებული README-ის თორმეტი SVG გენერირებულია (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` ყველა მათგანს ხელახლა აგენერირებს). თითოეულს აქვს ბაიტების შედარების
unit ტესტი (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`), რომელიც ჩავარდება, როდესაც
კომიტირებული ფაილი მოძველებულია, ხოლო `check:docs-counts` კანონიკურ რიცხვებს მათი `<text>` კვანძებიდან
კითხულობს — სწორედ ამიტომ კონტურებად გადაყვანის ეტაპი ფაილში ყველა კონტურად გადაყვანილ სტრიქონს
უხილავ `<text>`-ად ინარჩუნებს. SVG-ის კანონიკური რიცხვების შემოწმება კითხულობს
`SVG_DIAGRAM_FILES`-ში ჩამოთვლილ ფაილებს (`scripts/check/check-docs-counts-sync.mjs`):
`docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, ასევე
`public/images/tier-flow-dark.svg` და `tier-flow-light.svg`; `free-forever`, `catalog-entry`,
`recurring-pool` და `scoring-factors` მტკიცებები ასევე კითხულობს
`promise-pillars.svg`, `free-tier-budget.svg` და `strategies-grid.svg`. `free-tier-budget.svg`
თავის მაჩვენებლებს ცოცხალი კატალოგის ჩამტვირთველიდან იღებს, ამიტომ `FREE_MODEL_BUDGETS`-ში ან
პროვაიდერის საჩვენებელ სახელში ცვლილება CI-ს წითლად მონიშნავს, სანამ ეს ფაილი ხელახლა არ გენერირდება.

### სამუშაო: `i18n-ui-coverage`

| Script                            | ამოწმებს                                                                                                                                                                                                        | ბლოკავს           |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `check-ui-keys-coverage` (inline) | UI i18n გასაღებების დაფარვა ≥ 65%-ია                                                                                                                                                                            | დიახ              |
| `check-ui-value-drift` (inline)   | ხელახლა დაწერილი ინგლისური **მნიშვნელობა** მოძველებულ თარგმანს აღარ ტოვებს                                                                                                                                      | დიახ              |
| `check-new-key-coverage` (inline) | **ახალი** ინგლისური გასაღები ყველა ლოკალში ითარგმნება — `__MISSING__:` მარკერი უარყოფილია                                                                                                                       | დიახ              |
| `check-translation-ratio`         | თითოეული ლოკალის რეალური თარგმანის კოეფიციენტი (ინგლისურთან იდენტური / placeholder / გამოტოვებული ჩანაწერები allowlist-ის გარეთ) არ უნდა აღემატებოდეს `config/quality/i18n-translation-baseline.json` + slack-ს | **საკონსულტაციო** |

საჭიროა `fetch-depth: 0` — value-drift კარიბჭე `en.json`-ს merge base-თან ადარებს.

#### `check-ui-value-drift` — მოძველებული თარგმანის კარიბჭე

იჭერს i18n-ის იმ რეგრესიას, რომელსაც სხვა შემოწმებები სტრუქტურულად ვერ ამჩნევენ: ინგლისური მნიშვნელობა გადაიწერება, ხოლო _წინა_ ინგლისურიდან მიღებული თარგმანები უცვლელი რჩება, რის გამოც არაინგლისურენოვანი მომხმარებლები კვლავ თავდაჯერებულად ფორმულირებულ, მაგრამ უკვე მცდარ ტექსტს კითხულობენ.

ეს რეალურად გაეშვა. `oauthModal.googleOAuthWarning` გადაიწერა, როდესაც Antigravity-ის შესვლის დამხმარე დაემატა (#5203); **43 ლოკალიდან 39-ში** დარჩა ტექსტი, რომელიც ოპერატორებს ეუბნებოდა: „დააკოპირეთ სრული URL და ჩასვით ქვემოთ“ — პროცესი, რომელიც ამ პროვაიდერისთვის ვერ სრულდება. ეს შეუმჩნეველი დარჩა #8463-მდე, რადგან:

- `sync-ui-keys` ავსებს მხოლოდ **არარსებულ** გასაღებებს და არასოდეს აახლებს **მოძველებულებს**;
- `check-ui-keys-coverage` ითვლის გასაღების _არსებობას_, ამიტომ მოძველებული თარგმანი დაფარულად ითვლება;
- `check-translation-drift` აკონტროლებს `docs/i18n/<locale>/**.md` დოკუმენტაციის ასლებს —
  ის არასოდეს კითხულობს `src/i18n/messages/*.json` ფაილებს. ბლოკავს `docs-sync-strict` სამუშაოში 2026-09 ხელახალი სინქრონიზაციის შემდეგ: შეცვალეთ ძირითადი დოკუმენტი → `npm run i18n:run -- --files=<doc>` (სექციის დონეზე, იაფია).

**Diff-ზე ორიენტირებული და არა baseline-ზე დაფუძნებული.** ის ადარებს merge base-ის მდგომარეობაში არსებულ
`en.json`-ს სამუშაო ხესთან; ყველა გასაღებისთვის, რომლის ინგლისური მნიშვნელობაც შეიცვალა, ის ლოკალი, რომელსაც ჯერ კიდევ უცვლელი თარგმანი აქვს, მოძველებულია. ეს განზრახ **ყინავს წინასწარ არსებულ დავალიანებას** — diff-ით შეუძლებელია დადგინდეს, რომელი ძველი ინგლისური ტექსტიდან წარმოიშვა დიდი ხნის წინ არსებული თარგმანი, ამიტომ შემოწმება აფასებს მხოლოდ იმას, რასაც მიმდინარე ცვლილება ეხება. ალტერნატივა — თითოეული გასაღების hash baseline — მოითხოვდა დაახლოებით 600 კბ-იან გენერირებულ ფაილს, რაც არსებულ ყველაზე დიდ baseline-ზე 3-ჯერ მეტია და ყოველ i18n PR-ზე ცვლილებებს გამოიწვევდა.

მის დასაკმაყოფილებლად ორი გზა არსებობს:

1. განაახლეთ შესაბამისი თარგმანები, ან
2. მიუთითეთ `__MISSING__:<new english>` — runtime შემდეგ გამოიყენებს შესწორებულ ინგლისურ ტექსტს
   (`src/i18n/request.ts::deepMergeFallback`, #7258), ხოლო გასაღები თარგმნის რიგში მოხვდება.

თუ სტრიქონის **მნიშვნელობა** შეიცვალა, უპირატესობა მიანიჭეთ **გასაღების გადარქმევას**: ახალი გასაღები ვერ მემკვიდრეობს
მოძველებულ თარგმანს. სწორედ ეს მიდგომა გამოიყენა #8463-მა.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

აბრუნებს 0-ს `SKIP reason=base-unresolved`-ით, როდესაც საბაზისო კატალოგის წაკითხვა შეუძლებელია (shallow
clone საბაზისო ref-ის გარეშე), `check-openapi-breaking`-ის მსგავსად.

### სამუშაო: `i18n`

i18n-ის სრული ვალიდაციის მატრიცა (თითო სამუშაო თითო ლოკალზე). მთელი სამუშაო მხოლოდ საინფორმაციო ხასიათისაა.

| სკრიპტი                         | ამოწმებს                        | ბლოკავს                                                      |
| ------------------------------- | ------------------------------- | ------------------------------------------------------------ |
| `validate_translation.py quick` | თარგმანის სისრულეს თითო ლოკალზე | **საინფორმაციოა** (`continue-on-error: true` მთელ სამუშაოზე) |

### სამუშაო: `pr-test-policy`

ეშვება მხოლოდ pull request-ებზე.

| სკრიპტი                | ამოწმებს                                                                                                                                              | ბლოკავს |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:pr-test-policy` | PR-ებს, რომლებიც ცვლიან საწარმოო კოდს `src/`, `open-sse/`, `electron/` ან `bin/` დირექტორიებში, უნდა შეიცავდეს ან ანახლებდეს ტესტებს (მკაცრი წესი #8) | კი      |
| `check:test-masking`   | შეცვლილი სატესტო ფაილები არ ამცირებს assert-ების ჯამურ რაოდენობას და არ ამატებს `assert.ok(true)` ტავტოლოგიებს                                        | კი      |
| `check:pr-evidence`    | PR-ის აღწერაში მითითებულია ცვლილების სატესტო/VPS მტკიცებულება (მკაცრ წესს #18 ახორციელებს PR-ის ტექსტში ძიებით — მყიფეა, იხილეთ Backlog)              | კი      |

### სამუშაო: `test-vitest`

ეშვება `build`-ის შემდეგ. წარუმატებლობის შემთხვევაში merge-ს ბლოკავს.

| სუიტი            | ამოწმებს                                                         | ბლოკავს                                                                                                                                      |
| ---------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP სერვერს (110 ხელსაწყო), autoCombo-ს, cache-ს — vitest runner | კი                                                                                                                                           |
| `test:vitest:ui` | UI კომპონენტების ტესტებს — vitest runner-ს                       | **ბლოკავს** — წინასწარ არსებული წარუმატებლობები პირდაპირ გამორიცხულია `vitest.config.ts`-ში; ახალი წარუმატებლობები სამუშაოს ჩავარდნას იწვევს |

### ღამის workflow-ები (დაგეგმილი, საინფორმაციო)

ეს workflow-ები ეშვება cron-ით დაგეგმილი განრიგით (და `workflow_dispatch`-ით), მაგრამ არასოდეს ეშვება PR-ებზე. ყველა მათგანი საინფორმაციო ხასიათისაა.

| Workflow               | ვალიდაციას ახდენს                                                                                                                                                                  | ბლოკირება         |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `nightly-property`     | fast-check-ის თვისებების ტესტები შემთხვევითი seed-ით + გაშვების მაღალი რაოდენობით                                                                                                  | **საკონსულტაციო** |
| `nightly-resilience`   | heap-ის ზრდის gate, chaos-ის ხარვეზების ინექცია, k6-ის დატვირთვის/ხანგრძლივი ტესტი                                                                                                 | **საკონსულტაციო** |
| `nightly-llm-security` | promptfoo-ის ინექციის დამცავი მექანიზმი (ბლოკირების რეჟიმი) + garak-ის ზონდები (provider-ის secret-ის გარეშე გამოტოვებულია)                                                        | **საკონსულტაციო** |
| `nightly-schemathesis` | OpenAPI კონტრაქტის ფაზინგი (schemathesis) ცოცხალი OmniRoute-ის წინააღმდეგ `docs/openapi.yaml`-ის გამოყენებით — ავლენს სპეციფიკაციის დარღვევებს / დაუმუშავებელ 500-ებს (ფაზა 8 B.4) | **საკონსულტაციო** |
| `nightly-mutation`     | Stryker-ის მუტაციის ტესტირების ქულა fast unit lane-ში — გადარჩენილი მუტანტები სუსტ assert-ებს ავლენს                                                                               | **საკონსულტაციო** |
| `nightly-compat`       | Node-ის ძრავის თავსებადობის მატრიცა მხარდაჭერილ `engines.node` დიაპაზონებში                                                                                                        | **საკონსულტაციო** |

წარმადობის საბაზისო მაჩვენებლები (heap, TTFB, build-ის დრო) იწერება, მაგრამ არ კონტროლდება: იხილეთ [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## სიჩქარის ფაზა (2026-08-30 → v4.0 LTS): ყველა საბაზისო ზღვარი 20%-ით შემსუბუქდა

მფლობელის გადაწყვეტილება (2026-08-30): v4.0-ის მოდულარიზაციამდე გამოშვების სიჩქარე უფრო მნიშვნელოვანია,
ვიდრე ტექნიკური ვალის ზღვრის შენარჩუნება. ყველა **რიცხვითი** ratchet-ის საბაზისო ზღვარი ერთ
აუდიტირებად ეტაპად 20%-ით შემსუბუქდა, ხოლო ფაზა გამოცხადებულია `config/quality/quality-baseline.json`-ში:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| რა შეიცვალა                                                                                                                                                                                                                     | სად                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — „ნაკლები უკეთესია“ ტიპის რაოდენობები ×1.2, „მეტი უკეთესია“ ტიპის პროცენტები ÷1.2 (coverage-ის ქვედა ზღვარი დარჩა 60, `eslintErrors` რჩება 0, `eslintWarnings` 0 → გაყინული suppression-ების რაოდენობის 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` შენიშვნაში ჩამოთვლილია ყოველი „მანამდე → შემდეგ“) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                | `complexity-baseline.json`, `duplication-baseline.json`                                                 |
| `cap`, `testCap`, ყოველი `frozen[*]` / `testFrozen[*]` სტრიქონების ზღვარი ×1.2                                                                                                                                                  | `file-size-baseline.json`                                                                               |
| თითოეული ფაილის / თითოეული TS-კოდის რაოდენობები ×1.2                                                                                                                                                                            | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`  |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                             | `scripts/check/check-openapi-coverage.mjs`                                                              |
| `--require-tighten` ხდება სარეკომენდაციო, როდესაც `_policy.requireTighten === false`                                                                                                                                            | `scripts/quality/check-quality-ratchet.mjs`                                                             |
| ღამის `bank-ratchet-shrinks` ჩერდება (წინააღმდეგ შემთხვევაში ის გაზომილ შემცირებას დააფიქსირებდა და თავისუფალ მარაგს გააუქმებდა)                                                                                                | `.github/workflows/nightly-release-green.yml`                                                           |

დაშვებული სიები (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **არ არის** ბიუჯეტები და მათ არ შეხებიან. გავლა/ჩავარდნის პოლიტიკის შემზღუდველი შემოწმებები (საიდუმლოებები, SQL-ის წესები,
docs/env კონტრაქტი, i18n-ის თანხვედრა, ერთეულოვანი ტესტები) უცვლელია — წარუმატებელი ტესტი კვლავ წარუმატებელია.

**ინსტრუმენტები**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — ერთჯერადი
  შემსუბუქება (`scripts/quality/relax-baselines.mjs`); ერთი და იმავე შენიშვნით მეორედ გაშვებაზე უარს ამბობს.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  ყველა რიცხვით შემზღუდველ შემოწმებას CI-ის ანალოგიურად ზომავს და თითოეული შემოწმებისთვის დარჩენილ თავისუფალ მარაგს
  ბეჭდავს (`scripts/quality/baseline-headroom.mjs`). ღამის `baseline-headroom` დავალება ცხრილს
  workflow-ის გაშვების შეჯამებაში აქვეყნებს და მის JSON/Markdown ანგარიშს ტვირთავს სახელით
  `baseline-headroom-<run_id>`, რომელიც 90 დღის განმავლობაში ინახება. გამაფრთხილებელი და კრიტიკული სტრიქონები მიუთითებს შემოწმებებზე,
  რომლებიც მათი ზედა ზღვრის 10%-ის ფარგლებშია ან უკვე აჭარბებს მას. ბიუჯეტების ამოწურვის ადრეულ გაფრთხილებად
  გადახედეთ ამ ანგარიშებს; შეამოწმეთ პრობლემური შემოწმების `_rebaseline_*` შენიშვნები. დავალება
  მუდმივ issue-ს აღარ ქმნის და აღარ აახლებს; #12149 ინარჩუნებს ადრინდელი ანგარიშების ისტორიას.

**ახალი კოდის რეჟიმი (Clean-as-You-Code) — 2026-08-30-დან, მხოლოდ PR-ის სწრაფი გზისთვის**

`pull_request` მოვლენებზე `quality.yml` გადასცემს `--base-ref <PR base SHA>`-ს `check:file-size`-ს,
`check:complexity-ratchets`-სა და `check:dead-code`-ს. `check:complexity-ratchets`-ისა და
`check:dead-code`-ისთვის შემზღუდველი შემოწმება HEAD-ს merge-base-ს ადარებს, **მხოლოდ PR-ის მიერ
შეცვლილი ფაილების ფარგლებში** (`scripts/check/newCodeMode.mjs`: merge-base მატერიალიზდება დროებით
`git worktree`-ში, ESLint/knip ეშვება იქაც და HEAD-ზეც, შემდეგ კი თითოეული ფაილის რაოდენობებს შორის სხვაობა გამოითვლება):

- **დამბლოკავი** — PR-მა მის მიერ შეცვლილ ფაილებში დაამატა ციკლომატური/კოგნიტიური სირთულის დარღვევები ან მკვდარი exports
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` ჟურნალში);
- **სარეკომენდაციო** — გლობალური ჯამი გაყინულ საბაზისო ზღვართან შედარებით. მემკვიდრეობით მიღებული გადახრა უდანაშაულო
  PR-ს არასდროს აგდებს; გადახრა ხელახლა იყინება გამოშვების შეჯერებისას და მას headroom-ის დავალება აკვირდება.

`check:file-size` საბაზისო მითითებას საკუთარი წესებით იყენებს (`scripts/check/check-file-size.mjs`, #8522):
ის ამოწმებს ხეში არსებულ ყველა წყაროსა და სატესტო ფაილს, `git show`-ს გამოყენებით კითხულობს თითოეულის სტრიქონების რაოდენობას
PR-ის საბაზისო ვერსიაში და ფაილს მხოლოდ მაშინ აგდებს, როდესაც ის აჭარბებს მისი საბაზისო ზედა ზღვრის
(`frozen` / `testFrozen`, ან საბაზისო სიაში არმყოფი ფაილისთვის `cap` / `testCap`) და საბაზისო
ზომისგან უფრო დიდ მნიშვნელობას. შესაბამისად, საბაზისო ვერსიაში უკვე გადახრილი ფაილი უდანაშაულო PR-ს არასდროს აგდებს.

`check:boundary:ratchet` იმავე წესს იყენებს თავისი ერთადერთი რიცხვისთვის
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR მოვლენებზე როგორც
`quality.yml`-ის სწრაფი შემოწმებები, ისე `ci.yml`-ის lint დავალება გადასცემს PR-ის საბაზო SHA-ს, საბაზო commit იზომება
`git archive`-ის ექსპორტიდან, ხოლო PR ვერ გაივლის მხოლოდ მაშინ, როდესაც მისი `open-sse → src` კავშირების
რაოდენობა აღემატება `metrics.boundaryOpenSseToSrc`-სა და საბაზო ვერსიაში არსებულ რაოდენობას შორის უფრო დიდ მნიშვნელობას. ზღვრულ მნიშვნელობაზე
მაღალი საბაზო გადახრა ფიქსირდება (`base drift herdado`), მაგრამ უდანაშაულო PR-ს არასოდეს აგდებს; push → main
ინარჩუნებს აბსოლუტურ ზღვარს, ხოლო საბაზო SHA-ს ამოუცნობლობის შემთხვევაში გაფრთხილებით უბრუნდება ამ ზღვარს.

`workflow_dispatch` გაშვებებს, release-green-ის სრულ შემოწმებასა და headroom-ის ღამის დავალებას PR-ის საბაზო ვერსია
არ გააჩნიათ და ისინი ინარჩუნებენ აბსოლუტურ (გლობალურ) შედარებას. დაფარვა, დუბლირება და ტიპების დაფარვა ჯერჯერობით
გლობალური რჩება (მათი ხელსაწყოები თითოეული ფაილის სხვაობას მცირე დანახარჯით ვერ ქმნიან) — მომავალში მათზეც შეიძლება იგივე მიდგომა გავრცელდეს.

**ფაზის დახურვა v4.0-ზე (LTS = წინანდელზე მკაცრი და არა „ნორმალურ მდგომარეობაში დაბრუნება“)**

1. სუფთა `release/v4.0.0` წვერზე: ჩანაწერისთვის გაუშვით `npm run quality:headroom --json`, შემდეგ
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` და თითოეული typecheck შემოწმების
   `--update` — ყველა საბაზო მნიშვნელობა გაზომილ მნიშვნელობამდე მცირდება.
2. წაშალეთ `_policy` ფაილიდან `quality-baseline.json` (ხელახლა ააქტიურებს `--require-tighten`-სა და ღამის
   დაგროვებას), აღადგინეთ `THRESHOLD = 36` (ან უფრო მაღალი მნიშვნელობა) ფაილში `check-openapi-coverage.mjs`.
3. გაზომილ მნიშვნელობაზე მეტად გაამკაცრეთ იქ, სადაც მოდულარიზაციამ შედეგი გამოიღო: file-size-ის `cap` დააბრუნეთ 1000-ზე
   (ან 800-ზე), დაფარვის მინიმალური ზღვრები გაზარდეთ +5-ით, ხოლო მოდულარიზებული პაკეტებისთვის გამოუყენებელი ექსპორტების რაოდენობა დააყენეთ 0-ზე.

## Ratchet-ის საბაზისო დონე (`quality-baseline.json`)

Ratchet-ის ძრავა (`scripts/quality/check-quality-ratchet.mjs`) კითხულობს `quality-baseline.json`-ს
და ადარებს მას ახლად შეგროვებულ `quality-metrics.json`-ს. ნებისმიერი მეტრიკა, რომელიც
მის epsilon-ზე მეტად გაუარესდება, აგების პროცესს წარუმატებლად დაასრულებს.

ამჟამად თვალყურისდევნებული მეტრიკები:

| მეტრიკა               | მიმართულება | მნიშვნელობა                                          |
| --------------------- | ----------- | ---------------------------------------------------- |
| `eslintWarnings`      | `down`      | ESLint-ის გაფრთხილებების რაოდენობა არ უნდა გაიზარდოს |
| `coverage.statements` | `up`        | ინსტრუქციების დაფარვა არ უნდა შემცირდეს              |
| `coverage.lines`      | `up`        | ხაზების დაფარვა არ უნდა შემცირდეს                    |
| `coverage.functions`  | `up`        | ფუნქციების დაფარვა არ უნდა შემცირდეს                 |
| `coverage.branches`   | `up`        | განშტოებების დაფარვა არ უნდა შემცირდეს               |

რეალური გაუმჯობესების შემდეგ საბაზისო დონის განახლებისთვის:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` ალამი მიმდინარე გაზომილ მნიშვნელობებს `quality-baseline.json`-ში წერს.
ეს ფაილი დააკომიტეთ იმ ცვლილებასთან ერთად, რომელმაც მეტრიკა გააუმჯობესა. PR, რომელიც
მეტრიკას საბაზისო დონის განახლების გარეშე აუმჯობესებს, გამოვლინდება `--require-tighten`-ის მიერ (ფაზა 6A.5,
განხორციელება მოსალოდნელია).

### CodeQL ratchet: განახლების პერიოდულობა და ხელით გაშვება

`check:codeql-ratchet` კითხულობს **რეპოზიტორიის მდგომარეობას, რომელიც გრაფიკის მიხედვით ახლდება — არა თითოეულ PR-ზე.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` აბრუნებს
`state: configured`, `schedule: weekly`: ეს არის GitHub-ის ნაგულისხმევი კონფიგურაციის სკანირება და არა
ყოველი push-ის ანალიზი. შედეგი: გაფრთხილებების გამომასწორებელი PR-ის გაერთიანების შემდეგ ratchet განაგრძობს
ძველი, უფრო მაღალი რაოდენობის კითხვას მომდევნო დაგეგმილი სკანირების გაშვებამდე — ამიტომ ის რეგრესიას აფიქსირებს
ყველა ღია PR-ზე, მათ შორის გამომასწორებელი PR-ის შემდგომ ცვლილებებზეც, სანამ სკანირება მიმდინარე მდგომარეობას არ დაეწევა.

**ხელით განახლება**: `gh workflow run codeql.yml --ref release/vX.Y.Z` ხელახლა უშვებს
ანალიზს და რამდენიმე წუთში თავიდან აქვეყნებს გაფრთხილებებს. ჯერ წაიკითხეთ `.github/workflows/codeql.yml` —
მის სათაურში განმარტებულია, რომ ის მხოლოდ `workflow_dispatch`-ისთვისაა განკუთვნილი, **რადგან კონფლიქტშია
GitHub-ის „ნაგულისხმევ კონფიგურაციასთან“** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). `push`/`pull_request`/
`schedule` ტრიგერების აღდგენამდე აუცილებელია **მფლობელის მოქმედება**: Settings → Code security →
CodeQL: Default → Advanced. ამ გადართვის გარეშე არ დაამატოთ `schedule:` ტრიგერი — ის
მხოლოდ წარუმატებელ გაშვებებს გამოიწვევს.

**რაოდენობის შემცირების შემდეგ გაამკაცრეთ საბაზისო დონე** — `node scripts/check/check-codeql-ratchet.mjs
--update` ახალ გაზომილ რაოდენობას წერს `quality-baseline.json`-ში →
`metrics.codeqlAlerts.value`, რათა ratchet-მა ჩუმად არ დაუშვას რეგრესია ძველ ზედა ზღვრამდე.
პრაქტიკული მაგალითი (2026-09-02/03): PR #12502-მა გამოასწორა 7 რეალური გაფრთხილება
(13 → 6 გაზომილი ღია გაფრთხილება); PR #12530-მა გაყინული საბაზისო დონე 11-დან 6-მდე გაამკაცრა შესაბამისობისთვის;
შემდეგ დარჩენილი 6 გაფრთხილება თითოეული გაფრთხილებისთვის მითითებული დასაბუთებით უარყოფილ იქნა, რის შედეგადაც ღია გაფრთხილებების რაოდენობა 0-მდე შემცირდა.

**უარყოფა ოპერატორის გადასაწყვეტია (მკაცრი წესი #14)** — არასოდეს უარყოთ CodeQL-ის გაფრთხილება
უარყოფის კომენტარში ტექნიკური დასაბუთების ჩაწერის გარეშე: `won't fix` ზედა დონის პროტოკოლის მოთხოვნისთვის,
`used in tests` სატესტო ფიქსტურისთვის, `false positive` იმ სანიტაიზერისთვის, რომელსაც CodeQL ვერ ხედავს
(პრეცედენტი: `docs/security/ERROR_SANITIZATION.md`).

---

## ტესტების ხელახალი გაშვების პოლიტიკა (WS5.4, v3.8.49)

ხელახალი გაშვების პოლიტიკა განისაზღვრება თითოეული runner-ისთვის და არასდროს მოქმედებს გლობალურად — საყოველთაო ხელახალი გაშვება რეალურ რეგრესიებს
უხილავ არასტაბილურობად აქცევს:

| Runner           | პოლიტიკა                                                                                                                                                                  | მიზეზი                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` მხოლოდ CI-ში, `trace: on-first-retry`-სთან ერთად                                                                                                             | ბრაუზერის/ქსელის დროითი ქცევა ნამდვილად არადეტერმინისტულია; ერთი ხელახალი გაშვება, კვალის ჩაწერით, არასტაბილურობას დიაგნოსტირებად არტეფაქტად აქცევს |
| Vitest           | გლობალური ხელახალი გაშვება აკრძალულია. დადასტურებულად არასტაბილური ტესტი იღებს აშკარა, კონკრეტული ტესტისთვის განკუთვნილ ხელახალ გაშვებას (ჩანს diff-ში და მოწმდება PR-ში) | საკარანტინო სია ინახება repo-ში და არასდროს არის გაუმჭვირვალე                                                                                       |
| node:test (unit) | ხელახალი გაშვება ყოველთვის აკრძალულია                                                                                                                                     | არასტაბილური unit-ტესტი თავად ტესტის შეცდომაა — გაასწორეთ და ხელახლა შემთხვევით შედეგზე ნუ დაეყრდნობით                                              |

სამიზნე SLO-ები არასტაბილურობის ტელემეტრიის დანერგვის შემდეგ (WS5.2/5.3): თითოეულ ტესტზე არასტაბილურობის სიხშირე <1%
(„ახლავე გასწორების“ ზღვარი), თითოეულ pipeline-ზე წარმატების მაჩვენებელი ≥95%. ინდუსტრიის საორიენტაციო მნიშვნელობებია —
ხელახლა დააკალიბრეთ ჩვენი საკუთარი გაზომვების მიხედვით.

## Release-ის დონის Ratchet-ის გადახრა (WS5.5, v3.8.49)

როდესაც ratchet (ფაილის ზომა, სირთულე, eslint-ის გაფრთხილებები) რეგრესირებს release-ის სუფთა
წვერზე — ანუ merge-ების კომბინაციამ გამოიწვია რეგრესია და არცერთი ცალკეული PR არ იმეორებს
რეგრესიას საკუთარ branch-ზე — გამოსწორება ეკუთვნის **release captain-ს, ერთხელ, release
branch-ზე**: უპირატესობა მიანიჭეთ გამოყოფას/რეფაქტორინგს; საბაზისო მნიშვნელობა ხელახლა დააყენეთ მხოლოდ დოკუმენტირებული
დასაბუთების ჩანაწერით. არასდროს გადააკისროთ კომბინაციური გადახრა contributor-ის PR-ს და არასდროს
განაახლოთ საბაზისო მნიშვნელობა თითოეული PR-ისთვის (ეს რეალურ რეგრესიებს მალავს). ჯერ განასხვავეთ მიზეზები: სანამ ჩათვლით, რომ პრობლემა თქვენმა PR-მა გამოიწვია,
წითელი შედეგი probe worktree-ში, სუფთა წვერის მიმართ გაიმეორეთ.

## Ratchet-ის შემცირებების დაფიქსირება — დაღმავალი მიმართულება (#8584)

Ratchet მხოლოდ სანახევროდ არის ავტომატიზებული და თანაც არასწორი ნახევარია. ზღვრის **გაზრდა**
JSON-ის ხელით, ათწამიანი რედაქტირებაა და წითელი PR-ის განბლოკვის უსწრაფესი გზა.
ზღვრის **შემცირება** მოითხოვს, რომ ვინმემ გაუშვას `--update` და შედეგი commit-ში შეიტანოს — ხოლო
`bank-ratchet-shrinks` job-ის დანერგვამდე ამას არცერთი workflow არ ასრულებდა. გაზომილი შედეგი
(2026-07-25): 18 გაყინული ფაილი უკვე 800-სტრიქონიანი ახალი ფაილის ზღვარზე ან მის ქვემოთ იყო, ყველაზე უარესი
132×-ით (`src/shared/validation/schemas.ts`, 19 სტრიქონი 2,523-იანი ზღვრით);
სირთულის ზედა ზღვარი დაახლოებით 37 ხელახალი საბაზისო მნიშვნელობის შენიშვნის განმავლობაში `1794 → 2169`-მდე გაიზარდა, ზუსტად ერთი
შემცირებით (−1); ხოლო ფრაზა „შემდეგ ციკლში `--update`-ით გამკაცრება“ 31-ჯერ დაიწერა და
ერთხელ შესრულდა. ზღვარი, რომელიც მის გამომწვევ კოდზე დიდხანს ცოცხლობს, თითოეულ დასრულებულ
დეკომპოზიციას ჩუმად აქცევს ზრდის ნებართვად იმისთვის, ვინც შემდეგში ფაილს დაარედაქტირებს.

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** ამ ციკლს ხურავს:

|          |                                                                                                                    |
| -------- | ------------------------------------------------------------------------------------------------------------------ |
| ეშვება   | `schedule`-ით (დღეში 3×) + `workflow_dispatch` — განზრახ **არა** `push`-ით                                         |
| ზომავს   | უმაღლეს `release/vX.Y.Z`-ს, იმავე resolution + injection guard-ით, რომლებსაც `release-green` იყენებს               |
| წერს     | `check:file-size --update` და `check:complexity-ratchets --update` (ორივე კონსტრუქციულად მხოლოდ შემცირებას ახდენს) |
| ამოწმებს | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                           |
| აგზავნის | ერთ, ყოველთვის აქტუალურ PR-ს release branch-ის მიმართ — იძულებით განახლებადს და არასდროს სპამირებულს               |

შემცირებების დაფიქსირება თითოეული push-ის ნაცვლად პაკეტურად ხდება, რადგან მას დაყოვნების მოთხოვნა არ აქვს (შემცირების
8 საათში დაფიქსირება მისაღებია), ხოლო თითოეულ merge-ზე გაშვება merge-კამპანიების დროს PR branch-ს განმეორებით
ააწყობდა და ყოველ ჯერზე ESLint-ის სრული გავლის ღირებულებას წარმოშობდა. აღმოჩენა კვლავ push-ზე ხდება
(`release-green`); მხოლოდ შემცირებების დაფიქსირება სრულდება პაკეტურად.

### უსაფრთხოების შემმოწმებელი

job საბაზისო მნიშვნელობებში ზედამხედველობის გარეშე წერს, ამიტომ სწორედ `verify-ratchet-bank.mjs` ხდის
ამას მისაღებს. ის `--update`-ის შემდგომ tree-ს `HEAD`-თან ადარებს და **job-ს მანამდე წყვეტს,
სანამ რაიმე commit შეიქმნება** — ყოველგვარი PR-ის გახსნის გარეშე — თუ ყველა ცვლილება ქვემოთ ჩამოთვლილთაგან ერთ-ერთი არ არის:

- `frozen` / `testFrozen`-ის რიცხვითი ჩანაწერი **შემცირებულია** ან **წაშლილია**
- `complexity-baseline.json` → `count` **შემცირებულია**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **შემცირებულია**

ნებისმიერი სხვა რამ შეცდომით სრულდება: რიცხვის გაზრდა, ჩანაწერის დამატება, `cap`/`testCap`-ის შეცვლა ან
`_rebaseline_*` შენიშვნის წაშლა/გადაწერა (ეს შენიშვნები წარმოადგენს თითოეული
ზღვრის არსებობის მიზეზის აუდიტის კვალს და ინახება იმავე `frozen` ობიექტში, სადაც ფაილების ჩანაწერებია).
ბოტი, რომელსაც ზღვრის გაზრდა შეეძლებოდა, არსებულ მდგომარეობაზე მნიშვნელოვნად უარესი იქნებოდა. რეგრესიისგან
დაცვა: `tests/unit/verify-ratchet-bank.test.ts`.

job არასდროს ასრულებს push-ს `release/*`-ში — PR-ს ადამიანი აერთიანებს, ამიტომ მცდარი გაზომვა
შემოწმების გარეშე ვერ მოხვდება სისტემაში.

## დაშვებული გამონაკლისების სიის პოლიტიკა

ყველა შემოწმება, რომელიც უკვე არსებული დარღვევების გამო არ უნდა ჩავარდეს, იყენებს გაყინულ დაშვებული გამონაკლისების სიას
(მაგ., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). პოლიტიკა ასეთია:

**გამოასწორეთ ძირეული მიზეზი; დაშვებული გამონაკლისების სია გამოიყენეთ მხოლოდ მაშინ, როდესაც დარღვევა უკვე არსებობდა და
მისი გამოსწორება იმავე PR-ში შეუძლებელია.**

დაშვებული გამონაკლისების სიაში ჩანაწერის დამატებისას:

1. დაამატეთ კომენტარი დასაბუთებით.
2. მიუთითეთ თვალყურის დევნების საკითხი (მაგ., `// #3498 — მე-2 ფაზის ფუნქცია, ჯერ არ არის განხორციელებული`).
3. ჩანაწერი წაშალეთ იმავე PR-ში, რომელიც დარღვევას ასწორებს — მოძველებული ჩანაწერი, რომელიც აქტიურ დარღვევას აღარ
   უგულებელყოფს, თავადაც დეფექტია (6A.3-ის მოძველებული წესების შემოწმება, განხორციელების შემდეგ,
   დაკავშირებული დარღვევის გარეშე დარჩენილი დაშვებული გამონაკლისების სიის ჩანაწერის გამო შემოწმებას ჩააგდებს).

**არ** დაამატოთ ჩანაწერები დაშვებული გამონაკლისების სიაში მხოლოდ იმისთვის, რომ ტესტები უფრო სწრაფად გაიაროს. წარმატებული შემოწმება მზარდი
დაშვებული გამონაკლისების სიით ხარისხის ცრუ შეგრძნებას ქმნის.

### როდესაც თქვენს PR-ზე შემოწმება ვერ გაივლის

1. **ყურადღებით წაიკითხეთ შემოწმების შედეგი** — ის ზუსტად გეტყვით, რომელმა ფაილმა ან სიმბოლომ დაარღვია
   წესი.
2. **გამოასწორეთ დარღვევა** — შემოწმებების უმეტესობა ფაილური სისტემის დეტერმინისტული შემოწმებაა და კოდის
   გასწორებისთანავე წარმატებით სრულდება.
3. **თუ დარღვევა უკვე არსებობდა** (ანუ ის თქვენ არ დაგიმატებიათ, მაგრამ ახლა შემოწმება მასაც მოიცავს):
   დაშვებული გამონაკლისების სიაში დაამატეთ ჩანაწერი დასაბუთების კომენტარითა და თვალყურის დევნების საკითხის მითითებით.
4. **თუ შემოწმება ზღვრული მაჩვენებლის პრინციპით მუშაობს** (დაფარვა, ESLint-ის გაფრთხილებები, დუბლირება, სირთულე):
   თქვენმა ცვლილებამ მეტრიკა გააუარესა. გამოასწორეთ ძირეული პრობლემა ან (იშვიათად) გაუშვით
   `npm run quality:ratchet -- --update`, თუ ცვლილება მიზანმიმართულია და მეტრიკის
   გაუარესება მისაღებია — თუმცა PR-ის აღწერაში მიუთითეთ მიზეზი.
5. **სარეკომენდაციო შემოწმებები** (`continue-on-error: true`) საინფორმაციო ხასიათისაა — ისინი შერწყმას არ
   ბლოკავს, თუმცა CI-ის შეჯამებაში გამოჩნდება. ამის მიუხედავად, ისინიც გამოასწორეთ.

---

## ახალი შემოწმების დამატება

1. შექმენით `scripts/check/check-<name>.mjs` (ან `.ts`). პოლიტიკის შემოწმებები სრულდება 0/1 კოდით.
   ზღვრული მაჩვენებლის ტიპის შემოწმებები მეტრიკას `collect-metrics.mjs`-ის მეშვეობით `quality-metrics.json`-ში წერენ.
2. `package.json`-ში დაამატეთ `"check:<name>": "node scripts/check/check-<name>.mjs"`.
3. დააკავშირეთ ის `.github/workflows/ci.yml`-ში, შესაბამის დავალებაში
   (პოლიტიკა → `lint` ან `docs-sync-strict`; ზღვრული მაჩვენებელი → `quality-gate`).
4. თუ მას დაშვებული გამონაკლისების სია აქვს, გამოიყენეთ `reportStaleEntries()` ფაილიდან
   `scripts/check/lib/allowlist.mjs`, რათა მოძველებული ჩანაწერები ავტომატურად გამოვლინდეს.
5. `tests/unit/build/`-ში დაწერეთ ტესტი, რომელიც შემოწმების გამოვლენის ლოგიკას მოიცავს.
6. განაახლეთ ეს დოკუმენტი (შესაბამისი დავალების ცხრილს დაამატეთ სტრიქონი).

---

## აგენტის ხელსაწყოები: LSP-in-the-loop (არჩევითი)

CI-ის შემოწმებების გარდა, OmniRoute-ს მოჰყვება **არჩევითი** `agent-lsp`-ის საწყისი სტრუქტურა
(პროექტის დონის `.mcp.json`, Fase 7 Task 15). შექმენით `.mcp.json`,
რათა კოდის დამწერ აგენტებს TypeScript-ის ენის სერვერზე წვდომა მისცეთ და მათ კოდის დაწერამდე
ამოხსნან სიმბოლოები / დიაგნოსტიკა — `typecheck:core`-ის კომპილაცია-მტკიცებამდე მიდგომის თანამგზავრი,
რომელიც „გამოგონილი სიმბოლოების“ შეცდომებს წყაროშივე ამცირებს. ის განზრახ არ იტვირთება
ავტომატურად (MCP↔LSP ხიდს თავად ირჩევთ და ამოწმებთ); გაუმართავი ჩანაწერი მხოლოდ
კავშირის შეცდომას აღრიცხავს და სესიებს არასოდეს არღვევს.

---

## რაციონალიზაციის ბექლოგი (ROI-ის მიმოხილვა — ფაზა 9, ტალღა 3)

ეს ინვენტარი შეჯერებულია `ci.yml`-თან 2026-06-17-ს (წინა ვერსიაში გამოტოვებული იყო
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). შეჯერებული ნაკრების ROI-ის მიმოხილვამ
გამოავლინა რაციონალიზაციის შემდეგი კანდიდატები. **გაერთიანებები CI-ის მექანიკური
ცვლილებებია; გადართვა/ამოღება კი პოლიტიკის გადაწყვეტილებებია, რომლებიც ოპერატორს ეკუთვნის.** ქვემოთ
ჩამოთვლილთაგან ჯერ არაფერი გამოყენებულა.

**ზემოთ ასევე არ არის დოკუმენტირებული** (სარეკომენდაციო, დაბალი სიგნალის მქონე): `docs-lint` დავალება
(markdownlint + Vale, მთელ დავალებაზე `continue-on-error`) და დამოუკიდებელი სკანერის სამუშაო პროცესები
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` არის
`quality-baseline.json`-ში, თუმცა `ci.yml`-ში ბლოკირების მექანიზმის მქონე რეჩეტთან დაკავშირებული არ არის — მეტრიკა
ამჟამად ობლადაა დარჩენილი.

### გაერთიანება / დუბლირების მოცილება (მექანიკური, ნაკლები რისკი)

თითოეული კანდიდატი შემოწმდა აქტიური გეიტების მდგომარეობასთან 2026-06-17-ს (ენდე, მაგრამ გადაამოწმე);
რამდენიმე „აშკარა“ გაერთიანება რეალურად დამალულ ტექნიკურ ვალს შეიცავდა და **არ არის** პირდაპირი უსაფრთხო ჩანაცვლება.

- **`check:docs-sync` ორჯერ ეშვება** — ცალკე `lint` დავალებაში და კვლავ `check:docs-all`-ის (`docs-sync-strict`) შიგნით და husky-ის pre-commit ჰუკში. ✅ **შესრულებულია** — ცალკეული `lint` გამოძახება ამოღებულია.
- **CVE სკანირება** — ❌ **არ არის სუფთა გაერთიანება.** `audit:deps` იწვევს მკაცრ ჩავარდნას ნებისმიერ მაღალი/კრიტიკული სიმძიმის CVE-ზე; `check:vuln-ratchet` (osv) კი მხოლოდ საბაზისო დონესთან შედარებით _გაუარესების_ შემთხვევაში ვარდება (ამჟამად 1 MODERATE). სემანტიკა განსხვავებულია — `audit:deps`-ის ამოღებით დაიკარგებოდა მაღალი/კრიტიკული სიმძიმის აბსოლუტური გეიტი. ორივე უნდა დარჩეს.
- **ციკლების აღმოჩენა** — ✅ **შესრულებულია** (#15159 G-01/G-02). ძველ ტექსტში `check:cycles` აღწერილი იყო, როგორც „მწვანე, კურირებული“ გეიტი და მისი ბლოკირებად დატოვება იმით იყო გამართლებული, რომ `check:circular-deps` (dpdm) 91 ციკლს აფიქსირებდა. ეს მწვანე სტატუსი **ცრუ დადებითი შედეგი** იყო: `check:cycles` ასკანირებდა 5 ქვედირექტორიას (450 ფაილს), ამთხვევდა მხოლოდ სტატიკურ `import|export … from` კონსტრუქციებს და უგულებელყოფდა ყველა `@/` და `@omniroute/open-sse/` სპეციფიკატორს, ამიტომ ვერ ხედავდა დინამიკური იმპორტისა და ფსევდონიმების ციკლებს, რომლებიც რეპოზიტორიაში ჭარბობდა. გასწორებულია: ახლა გეიტი სრულად გადის `src` + `open-sse`-ზე (5023 ფაილი), სპეციფიკატორებს TypeScript AST-იდან აგროვებს (ამიტომ `import("…")` ითვლება, ხოლო ტიპის პოზიციაში არსებული `typeof import("…")` — არა) და ხსნის tsconfig-ის `paths`-ს. ის პოულობს **14** ციკლს და არა 0-ს. რადგან მანამდე არსებული 14 ციკლის გასწორება გეიტის PR-ში შეუძლებელია, `check:cycles` ახლა **რეჩეტია** (`--ratchet`, ზედა ზღვარი `metrics.cycles.value = 14` ფაილში `quality-baseline.json`, `direction: down`) — ის ბლოკავს ნებისმიერ _გაუარესებას_ და რაოდენობა მხოლოდ შემცირდება. CI უშვებს `npm run check:cycles:ratchet`-ს. ეტაპობრივი შემცირება მიმდინარეობს **A-01**-თან ერთად. `check:circular-deps` (dpdm) რჩება სარეკომენდაციო რეჟიმში, როგორც უფრო ფართო მეორე შეფასება.
- **სირთულე** — ✅ **შესრულებულია** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): ESLint-ის ერთი გავლა, დათვლა ruleId-ის მიხედვით, რათა ციკლომატური სირთულის+max-lines-ისა და კოგნიტიური სირთულის საბაზისო მნიშვნელობები დამოუკიდებელი დარჩეს; ცალკეული `check:complexity` / `check:cognitive-complexity` შენარჩუნებულია ლოკალური `--update`-ისთვის.
- **`/api`-ის ანტიჰალუცინაციური შემოწმება** — ✅ **შესრულებულია** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api`-ის ფაილური სისტემის ერთი ინვენტარიზაცია, openapi-routes + docs-symbols კვლავ დამოუკიდებლად ქმნის ანგარიშებს; ცალკეული შემოწმებები შენარჩუნებულია ლოკალური გაშვებებისთვის.
- **`check:node-runtime` 11 დავალებაში ეშვება** — ⚠️ **დაბალი ROI.** თითოეული მათგანი ცალკე რანერია, ხოლო შემოწმებას <1 წმ სჭირდება; ჯამური დანაზოგი დაახლოებით 10 წმ-ია, სანაცვლოდ კი იკარგება იაფი, თითოეულ დავალებაზე მოქმედი დამცავი შემოწმება. ცვლილებით გამოწვეულ აურზაურად არ ღირს.
- **`typecheck:noimplicit:core` CI-ის lint-ზე** — ✅ **ამოღებულია lint დავალებიდან** (იყო სარეკომენდაციო `continue-on-error`); ტიპების ზედაპირის ბლოკირებადი შემოწმებაა `typecheck:core` + `check:type-coverage`. ლოკალური სკრიპტი შენარჩუნებულია.

### გადართვა / გადაწყვეტილების მიღება (ოპერატორის პოლიტიკა)

- `check:openapi-security-tiers` (სარეკომენდაციო) — ❌ **პირდაპირ გადართვა შეუძლებელია.** ის აბრუნებს 0-ს, თუმცა აფრთხილებს, რომ `LOCAL_ONLY_API_PREFIXES`-ის ქვეშ არსებული რამდენიმე `traffic-inspector` მარშრუტი არ შეიცავს `x-loopback-only: true` ანოტაციას. მის სავალდებულოდ ქცევამდე ეს ანოტაციები ჯერ `openapi.yaml`-ს უნდა დაემატოს.
- `typecheck:noimplicit:core` (სარეკომენდაციო) — ძირითადად ჩანაცვლებულია ბლოკირებადი `check:type-coverage` რეჩეტით. გადართეთ რეჩეტზე ან ამოიღეთ ზედმეტი მეორე `tsc` გავლა.
- `test:vitest:ui` (ახლა **ბლოკირებადია**) — მანამდე არსებული ჩავარდნები პირდაპირაა გამორიცხული `vitest.config.ts`-ში `// #8618` თვალთვალის კომენტარებით; ახალი ჩავარდნები დავალებას ჩააგდებს.
- `check:secrets` (gitleaks, ბლოკირებადი რეჩეტი, გაყინული 3 დოკუმენტირებულ ცრუ დადებით შედეგზე) — დაამატეთ ეს 3 დაშვებულთა სიაში, რათა მაჩვენებელი 0-მდე ჩამოვიდეს, ან გადაიყვანეთ სარეკომენდაციო რეჟიმში. ნაწილობრივ ემთხვევა GitHub-ის ჩაშენებულ საიდუმლოების სკანირებასა და `check:public-creds`-ს.
- `check:pr-evidence` (ბლოკირებადი, PR-ის ტექსტურ აღწერაში grep-ით ეძებს) — ცრუ დადებითი შედეგების მაღალი რისკი; მისი ამოღება ასუსტებს მკაცრი წესის #18 აღსრულებას, ამიტომ ეს ნამდვილად პოლიტიკის საკითხია.
- `semgrep` (სარეკომენდაციო დამოუკიდებელი შემოწმება) — OWASP-ის კატეგორიებისთვის ნაწილობრივ ემთხვევა CodeQL-ს; დაუკავშირეთ მისი საბაზისო მნიშვნელობა რეჩეტს ან ამოიღეთ.

---

## დაკავშირებული დოკუმენტაცია

- მიწოდების ჯაჭვი (წარმოშობა, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — გასაღებების სიმრავლეთა თანხვედრის ბარიერი

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, დავალება `i18n-ui-coverage`).
ადარებს თითოეული `src/i18n/messages/<locale>.json`-ის ბოლო დონის გასაღებთა სიმრავლეს `en.json`-თან და
ნებისმიერი გამოტოვებული ან ზედმეტი ბოლო დონის გასაღების აღმოჩენისას მარცხდება, მიუხედავად იმისა, როდის დაემატა გასაღები. `__MISSING__:` ჩანაცვლების ნიშნები
არსებულად ითვლება (მათი შიგთავსი თანაფარდობის ბარიერის საზრუნავია). ეს არის ორ, diff-ზე დაფუძნებულ/პროცენტულ ბარიერთა აბსოლუტური შემავსებელი:
`check-ui-keys-coverage` თითოეული ლოკალისთვის მინიმალურ ზღვარს 80 %-ზე აწესებს
(~13,000-დან 43 გამოტოვებული გასაღების შემთხვევაშიც მაჩვენებელი კვლავ 99.7 %-ია), ხოლო `check-new-key-coverage` აფასებს
მხოლოდ იმ გასაღებებს, რომლებსაც PR `en.json`-ს ამატებს. ლოკალების პაკეტი გენერირდება იმ დღის `en.json`-იდან,
როდესაც მისი განშტოება იქმნება, და თარგმნა დღეების განმავლობაში გრძელდება, მაშინ როცა საბაზისო განშტოებას ახალი გასაღებები ემატება; პაკეტის PR თავად
არცერთ გასაღებს არ ამატებს, ამიტომ ორივე მონათესავე შემოწმება ჩუმად დარჩა, როდესაც პაკეტი 1 (#13044) ცხრა
ლოკალში 43 გასაღების დანაკლისით, ხოლო პაკეტი 2 (#13660) რვა ლოკალში 10 გასაღების დანაკლისით შევიდა (2026-09-15). წითელი სტატუსის გამოსასწორებლად გამოიყენეთ
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; `extra` ბოლო დონის გასაღები
ნიშნავს, რომ წყაროდან ის წაიშალა — წაშალეთ იგი ლოკალიდან. `--warn` ანგარიშს წარადგენს მარცხის გარეშე.
`--catalog=cli` იმავე შედარებას `bin/cli/locales`-ზე ასრულებს (`npm run i18n:check-keys:cli`);
ორივე ნაბიჯი დავალება `i18n-ui-coverage`-შია.

#### `check-new-key-coverage` — ახალი გასაღებების i18n-ბარიერი

`check-ui-value-drift`-ის მონათესავე შემოწმება. ის აფიქსირებს შემთხვევას, როდესაც ინგლისური მნიშვნელობა **ხელახლა დაიწერა**,
ხოლო მისი თარგმანები უცვლელი დარჩა; ეს კი აფიქსირებს შემთხვევას, როდესაც ინგლისური გასაღები **დაემატა**,
მაგრამ ზოგიერთ ლოკალს ის საერთოდ არ მიუღია.

`check-ui-keys-coverage` ამ კლასის პრობლემას ვერ ხედავს: ის თითოეული ლოკალისთვის პროცენტულ მინიმალურ ზღვარს აწესებს, ხოლო
~13,000 ბოლო დონის გასაღებიდან თერთმეტის არარსებობის შემთხვევაშიც დაფარვა 99.9 %-ზე რჩება. თითოეული ენის პროცენტული მაჩვენებლით
ვერ გამოიხატება, რომ „ეს ფუნქცია უთარგმნელად გამოვიდა“ — ახალ ლოკალში მთელი ფუნქცია შეიძლება
ყოველგვარი ტექსტის გარეშე მოხვდეს ისე, რომ რიცხვი საერთოდ არ შეიცვალოს.

ინციდენტი, რომელსაც ეს შემოწმება ასახავს: Orchestration Canvas-ის მე-3 ფაზის თერთმეტივე გასაღები
იმ დროისთვის არსებულ 42 ლოკალზე ითარგმნა. რამდენიმე საათის შემდეგ ევროკავშირის ენების პაკეტმა (#13044) რეპოზიტორიაში
ლოკალების რაოდენობა 51-მდე გაზარდა, ხოლო ცხრა ახალ ლოკალს (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) ისინი არასდროს
მიუღია. `deepMergeFallback` არარსებული გასაღების ნაცვლად ინგლისურ ტექსტს იყენებს, ამიტომ შედეგი
ცარიელი UI-ის ნაცვლად უთარგმნელი UI იყო — რეალური პრობლემა, რომელიც თავისი აგებულებით უხმაუროდ რჩებოდა.

მონათესავე შემოწმების მსგავსად, ისიც **diff-ის გათვალისწინებით მუშაობს** და შერწყმის საბაზისო წერტილში არსებულ ინგლისურ ტექსტს სამუშაო
ხეს ადარებს, ამიტომ მანამდე არსებული ხარვეზები გაყინული რჩება და ბარიერის ჩასართავად მიგრაცია საჭირო არ ყოფილა.

**`__MISSING__:<english>` მარკერი მოთხოვნას აღარ აკმაყოფილებს (2026-09-17-დან).** მანამდე ეს
დოკუმენტირებული გადავადების საშუალება იყო — შესრულების დროს სისტემა სწორ ინგლისურ ტექსტზე გადადიოდა — სანამ
2026-09-16-ს რვა ფუნქციურმა PR-მა 61 გასაღები არ დაამატა და თარგმნის ნაცვლად მარკერი 65-ვე ლოკალში არ ჩასვა:
ამ ბარიერმა ყოველი მათგანი მიიღო, PR-ები არაფერმა დაბლოკა, ხოლო რეალური თარგმანების თანაფარდობის დამბლოკავი ბარიერი
შემდეგ გამოშვების საბოლოო მდგომარეობაზე ყველასთვის ჩავარდა (pt-BR 3.2 % > 2.5 % + 0.5). მარკერი ახლა
არარსებულ თარგმანად ფასდება. წითელი სტატუსის გამოსასწორებლად გამოიყენეთ
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, ან
ყველა ლოკალისთვის პარალელურად გაუშვით `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
გამოყოფილ რეჟიმში უსაფრთხოა და `OMNIROUTE_TRANSLATION_*` გარემოს ცვლადების გარეშე გაშვებაზე უარს ამბობს). გასაღები, რომელიც
აუცილებლად ინგლისურად უნდა დარჩეს (პროდუქტის/ძრავის/ალმის ფიქსირებული სახელი), უნდა მოთავსდეს `scripts/i18n/untranslatable-keys.json`-ში
და არასდროს დაიმალოს მარკერის მიღმა. `vi` მარკერებს სრულად კრძალავს (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — გადადებული ტესტების ბარიერი

`vitest.config.ts`-ის `exclude` სიაში მოთავსებული ფაილი არის ტესტი, რომელიც არ სრულდება, თუმცა
ხის წამკითხველისთვის დაფარვას ჰგავს. კომენტარის
`// #8618 — მანამდე არსებული მარცხი; გამოსწორების შემდეგ წაშალეთ ეს გამონაკლისი` მიღმა სამოცდაორი ფაილი დაგროვდა. საკითხი #8618
2026-08-11-ს დაიხურა, ხოლო სია, რომელსაც ის აკვირდებოდა, 45 ჩანაწერიდან 62-მდე გაიზარდა; ყოველ ახალ ჩანაწერს მემკვიდრეობით
ერგებოდა კომენტარი, რომელიც დახურულ საკითხზე მიუთითებდა. როდესაც სია საბოლოოდ ფაილების მიხედვით გაიზომა (#13204), **62-დან 51
მიმდინარე ხეზე წყაროს ყოველგვარი ცვლილების გარეშე წარმატებით სრულდებოდა**.

ბარიერი მოითხოვს, რომ ყოველი გამონაკლისი, რომელიც რეალურ ფაილზე მიუთითებს, (a) ასახელებდეს თვალის სადევნებელ საკითხს და
(b) დაფიქსირებული სტატუსით იყოს წარმოდგენილი `config/quality/vitest-exclusions.json`-ში, რათა ახლის დამატება
ცალკე ფაილში განსახილველი diff იყოს და არა კიდევ ერთი სტრიქონი 60-ჩანაწერიან მასივში. ის განზრახ
არ უშვებს გამორიცხულ ტესტებს ხელახლა — ამას ~10 წუთი სჭირდება და პერიოდულ დავალებას ეკუთვნის;
ინვენტარი აღრიცხავს, ბოლოს როდის გაიზომა თითოეული მათგანი.
