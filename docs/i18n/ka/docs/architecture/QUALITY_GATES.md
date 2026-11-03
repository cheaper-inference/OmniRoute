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

CI და Quality Gates-ის workflow-ები თითოეული გასცემს სტაბილურ verdict-ს: `Gate / CI` და
`Gate / Quality`. მათი ვერსიონირებული დაშვების პოლიტიკა ყველა upstream job-ს required ან advisory სტატუსს ანიჭებს. შესაბამისმა required job-მა წარმატებით უნდა დასრულდეს: missing,
cancelled, skipped, pending და unknown შედეგები PASS-ის დასადასტურებლად საკმარისი არ არის. ვალიდურ docs-only ან catalog-only კლასიფიკაციას შეუძლია code lane-ის შეუსაბამოდ მიჩნევა;
draft PR არ არის მიღებული კანდიდატი. `hotfix` label მტკიცებულების მოთხოვნას არ აუქმებს.

ორივე workflow მოიცავს PR-ებს main/release ბრენჩებში, push-ებს `main`-ზე, manual dispatch-ს
და merge-group მოვლენებს. Push, dispatch და merge-group სრულ შერჩევას ასრულებს. Push-ები
`release/**`-ზე მათ არ იწყებს (2026-10-18): თითოეულმა ცვლილებამ უკვე გაიარა matrix თავის PR-ზე,
ხოლო გაერთიანებული კომბინაცია Release-Green-ის ამოცანაა (`docs/ops/RUNNER_BOX.md` → Hosted lane).
Fork-ები და merge group-ები იმ job-ებისთვის, რომლებიც სხვაგვარად self-hosted
runner-ებს აირჩევდნენ, hosted runner-ებს იყენებენ; rollout-მდე საკმარისი hosted capacity
უნდა დადასტურდეს.

თითოეული JSON receipt მიუთითებს checkout-ის SHA-ს, workflow run-ს და attempt-ს.
CLI უარყოფს checkout/event SHA-ს შეუსაბამობას. Workflow-ის ტესტები policy membership-ს verdict job-ის `needs` სიას უკავშირებს, რათა ახალი ან წაშლილი lane
ჩუმად ვერ გაქრეს. Receipt-ები საკუთარ workflow-ს მოიცავს და არა publication-ს,
deployment-ს ან არსებული advisory scanner-ის შიდა მექანიზმებს. ორივე check name-ის branch rules-ში გააქტიურება ცალკე ადმინისტრაციული ცვლილებაა; ამ job-ების დამატება თავისთავად branch-ს არ იცავს.

### Static scan-ის ინვენტარი

ვერსიონირებული npm-alias ინვენტარი და static-scan membership მდებარეობს
`config/quality/gate-manifest.json`-ში. გაუშვით `npm run check:gate-manifest`, რათა
`package.json`-თან მიმართებით script name-ები და ზუსტი ბრძანებები გადაამოწმოთ; დამატებები,
წაშლები და command drift ორივე local hook-სა და CI-ში change-classification job-ებს აჩერებს.
Alias არ არის workflow job, matrix instance ან test case: ეს რაოდენობები ურთიერთჩანაცვლებადად
არ უნდა იყოს წარმოდგენილი.

გამოიყენეთ `npm run quality:scan -- --list` ან `npm run quality:scan:fast -- --list`,
რათა შერჩეული alias-ები მათი შესრულების გარეშე დაათვალიეროთ. Runner npm entrypoint-ს იძახებს,
ამიტომ მისი runtime (მათ შორის, სადაც კონფიგურირებულია, Bun) შენარჩუნებულია.
Manifest ამ profile-ების მიღმა არსებულ alias-ებს ცალკე გამოსაძახებელებად აღრიცხავს,
ხოლო maintenance command-ები მხოლოდ წაკითხვის scan profile-ებში აკრძალულია.

ეს profile-ები მხოლოდ static scan-ს მოიცავს. ისინი არ ადასტურებს product test-ებს,
coverage-ს, packaging-ს, external check-ებს ან კანდიდატის release acceptance-ის სრულ
შემოწმებას. Workflow admission იყენებს დაკავშირებულ `config/quality/admission-policy.json`-სა და
`scripts/quality/admission-verdict.mjs`-ს. Release-observer profile-ები ცალკე რჩება;
მათი შესაბამისი check-ები და receipt-ები დამოუკიდებლად შეამოწმეთ. ქვემოთ მოცემული
პროზაული ინვენტარი საცნობარო მასალაა და არა იმის მტკიცებულება, რომ gate ნამდვილად გაეშვა.

Script-ები მდებარეობს `scripts/check/`-ში (policy gate-ები) და `scripts/quality/`-ში (ratchet engine).
CI-ის სიმართლის წყაროა `.github/workflows/ci.yml`.

### Release PR fast-path (`quality.yml`)

`.github/workflows/quality.yml` CI-ს ავსებს main/release PR-ებზე, `main`-ზე push-ებზე,
dispatch-სა და merge group-ებზე. PR-ები path-filtered fast check-ებს იყენებს. მუდმივად
გამორთული duplicate build წაიშალა; რეალური build/package/boot check-ები CI-ში რჩება.

| Job                                              | Scope                                                                                                                                                                                                                           | Blocking              |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PR-ები; API docs refs და docs-all                                                                                                                                                                                     | Yes                   |
| `Fast Quality Gates`                             | Code PR-ები; static check-ები, typecheck, dashboard typecheck, impacted unit test-ები                                                                                                                                           | Yes                   |
| `Forgotten sibling tests`                        | Code PR-ები; შეცვლილი module-ები, რომლებიც static consumer-ებსა და candidate sibling test-ებში იკვლევა; barrel და dynamic-import path-ები იტყობინება advisory diagnostic-ების სახით, referenced allowlist exception-ებთან ერთად | **Advisory**          |
| `Vitest (fast-path)`                             | Code PR-ები; სწრაფი vitest suite                                                                                                                                                                                                | Yes                   |
| `Unit Tests fast-path`                           | Code PR-ები; unit suite 4 shard-ად                                                                                                                                                                                              | Yes                   |
| `No new ESLint warnings`                         | Code PR-ები; suppression-aware lint guard                                                                                                                                                                                       | Yes, forks-ის ჩათვლით |
| `Merge integrity (changelog + generated skills)` | Non-draft PR-ები; changelog და generated skill sync                                                                                                                                                                             | Yes, forks-ის ჩათვლით |

#### Forgotten sibling tests-ის ანგარიში

`npm run check:forgotten-sibling-tests` ხელახლა იყენებს ტესტებზე გავლენის რუკის უკან მდგომ იმპორტების რეზოლვერს.
თითოეული შეცვლილი production მოდულისთვის ის აფიქსირებს დეტერმინისტულ
`changed module/symbol -> static consumer -> candidate sibling test` ჯაჭვებს, როდესაც კანდიდატი
ტესტი pull request-ის diff-ში არ არის. Markdown-ის შეჯამება და JSON-ის შედეგი ინახება
`forgotten-sibling-tests` workflow-ის არტეფაქტად შემდგომი კალიბრაციისთვის, ნებისმიერ ბლოკირებად
დანერგვამდე.

Barrel-ის ხელახალი ექსპორტები და დინამიკური იმპორტები მხოლოდ რეზოლუციის დიაგნოსტიკაა; ისინი არასოდეს ქმნიან
ბლოკირებად აღმოჩენას. განხილული გამონაკლისები ინახება
`config/quality/forgotten-sibling-allowlist.json`-ში. თითოეულ ჩანაწერში მითითებული უნდა იყოს consumer და candidate
test, მოცემული უნდა იყოს კონკრეტული დასაბუთება და მითითებული უნდა იყოს GitHub-ის issue ან pull request. არასწორად
ფორმირებული ჩანაწერები უსაფრთხოების მიზნით უარყოფილია. გამონაკლისებს არ შეუძლიათ წაშლილი candidate test-ის ან ისეთი diff-ის
ჩახშობა, რომელიც `.skip`/`.todo`-ს ამატებს; assertion-ის შესუსტება და სხვა masking კვლავ ეკუთვნის დამოუკიდებლად
ბლოკირებად `check:test-masking` gate-ს.

### Job: `lint`

ეშვება ყოველ PR-ზე `main`-ში. წარუმატებლობის შემთხვევაში merge-ს ბლოკავს.

| სკრიპტი (`npm run ...`)           | ამოწმებს                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ბლოკავს                                       |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `check:node-runtime`              | Node.js-ის ვერსია მხარდაჭერილ დიაპაზონშია                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | დიახ                                          |
| `check:cycles`                    | ციკლური იმპორტები `src/` + `open-sse/`-ის მასშტაბით (AST-ზე დაფუძნებული, tsconfig-ის `paths`-ები ამოხსნილია). შიშველი გაშვება აბრუნებს 1-ს, როცა რომელიმე ციკლი არსებობს (დახურვით ჩავარდნა #15281-ის შემდეგ) და ჩამოთვლის SCC-ებს. `check:cycles:ratchet` (რასაც CI უშვებს) ბლოკავს, როცა რაოდენობა აჭარბებს `quality-baseline.json`-ში `metrics.cycles`-ის ზღვარს — ამჟამად 14-ს, `direction: down`-ით, ამიტომ მხოლოდ შემცირებაა შესაძლებელი (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                              | დიახ (ratchet)                                |
| `check:boundary`                  | `open-sse → src`-ის დაკავშირება: ძრავიდან აპში უნიკალური ფაილიდან-ფაილში იმპორტები (`scripts/quality/measure-boundary.mjs`; კავშირების სია v4 core/module-split-ის გამოსწორების ბექლოგია). შიშველი გაშვება იძლევა საინფორმაციო ანგარიშს (`quality:boundary`-ის მსგავსად). `check:boundary:ratchet` (რასაც CI უშვებს და რომელიც ასევე შედის `quality.yml`-ის fast-gates ratchet ციკლში) ბლოკავს, როცა რაოდენობა აჭარბებს `quality-baseline.json`-ში `metrics.boundaryOpenSseToSrc`-ის ზღვარს — საწყისად გაზომილ 771-ზე დაყენებული, `direction: down`-ით; `--update` მას მხოლოდ ამცირებს; PR-ებზე საბაზისო ვერსიასთან შედარებით (`--base-ref`, იხილეთ ქვემოთ)                                                                                                                                                                                                                                                    | დიახ (ratchet)                                |
| `check:route-validation:t06`      | ყველა მარშრუტზე Zod-ის სქემები წარმოდგენილია (Tier 6-ის პოლიტიკა)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | დიახ                                          |
| `check:any-budget:t11`            | `@ts-expect-error // any` რაოდენობა არ აღემატება ლიმიტს (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | დიახ                                          |
| `check:provider-consistency`      | `providers.ts`-ში ყველა პროვაიდერს აქვს შესაბამისი ჩანაწერი `providerRegistry.ts`-ში (და პირიქით, დაშვებული სიაში)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | დიახ                                          |
| `check:model-lifecycle`           | ხელით შენარჩუნებული მარშრუტიზაციის სამი ცხრილი თანმიმდევრულია ჩაწერილ lifecycle snapshot-თან (#11503): `FITNESS_TABLE` (`taskFitness.ts`) არ აფასებს არც ერთ retired id-ს, რომლის მარშრუტიზაციაც `REGISTRY`-ს შეუძლია; `BUILT_IN_ALIASES`-ის ყველა სამიზნე წარმოდგენილია `REGISTRY`-ში და არ არის retired-id snapshot-ში; `REGISTRY`-ში ჯერ კიდევ არსებული ყველა retired id გადამისამართებულია ან ჩამოთვლილია `allowedRetiredInCatalog`-ში; და არც ერთი `DEFAULT_DEGRADATION_MAP`-ის წყარო ან სამიზნე არ არის მონიშნული როგორც retired ამ snapshot-ში. ეს არ ადასტურებს, რომ მოდელს ამჟამად ემსახურება მოქმედი upstream. ოფლაინ რეჟიმში — ადარებს `config/quality/model-lifecycle.json`-ს, რომელიც ხელით ახლდება `npm run quality:refresh-model-lifecycle`-ით (ქსელი; CI-ში ჩართული არ არის). `allowedRetiredInCatalog` არის ეტაპობრივი შემცირების ratchet: ჩანაწერი დაამატეთ მხოლოდ tracking issue-თან ერთად. | დიახ                                          |
| `check:fetch-targets`             | კლიენტის მხარეს `src/`-ში არსებული ყველა `fetch("/api/...")` მიემართება რეალურ `route.ts`-ზე                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | დიახ                                          |
| `check:deps`                      | რეპოზიტორიის ყველა `package.json`-ში არსებული `npm install`-ით დასაყენებელი ყველა დამოკიდებულება მითითებულია `dependency-allowlist.json`-ში; ახალი ვერსიის გარეშე მითითებული ან slopsquatted პაკეტები მოინიშნება                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | დიახ                                          |
| `audit:deps`                      | `npm audit` (root + electron) — არ არის high/critical გაფრთხილებები (ფარავს osv `check:vuln-ratchet`-საც; იხილეთ Rationalization Backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | დიახ                                          |
| `check:lockfile`                  | `package-lock.json` integrity — HTTPS რეესტრი, integrity ჰეშები, ჰოსტის ჩანაცვლებების გარეშე                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | დიახ                                          |
| `check:licenses`                  | SPDX ლიცენზიების დაშვებული სია საწარმოო დამოკიდებულებებისთვის                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | დიახ                                          |
| `check:tracked-artifacts`         | build-ის არტეფაქტების / commit-ში დამატებული `node_modules` სიმბოლური ბმულების გარეშე (ასევე სრულდება husky pre-commit-ში; pre-push განზრახ მსუბუქია — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | დიახ                                          |
| `check:ai-attribution`            | AI/bot-ის `Co-Authored-By` trailer-ის ან AI-გენერაციის footer-ის გარეშე PR commit-ებში, სათაურში ან ტექსტში — მკაცრი წესი #16 (`quality.yml`-ის fast-gates ციკლში PR→`release/**`-ისთვის — კითხულობს event payload-ს, PR-ების გარეთ არაფერს აკეთებს — და PR-ისთვის განკუთვნილი ნაბიჯი `ci.yml` lint-ში PR→`main`-ისთვის; ასევე husky-ის `commit-msg` hook-ში; ადამიანური თანაავტორები დაშვებულია; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:vitest-exclusions`         | ყოველი Vitest-ის exclusion უთითებს tracking issue-ს და წარმოდგენილია `config/quality/vitest-exclusions.json`-ში (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | დიახ                                          |
| `check:file-size`                 | საწყისი კოდის ფაილები (`.ts`/`.tsx` `src/`, `open-sse/`, `electron/`, `bin/` დირექტორიებში) უნდა ჯდებოდეს `cap`-ის ფარგლებში, ხოლო სატესტო ფაილები (`*.test.ts(x)`) — `testCap`-ის ფარგლებში; `file-size-baseline.json`-ში გაყინული ფაილები (`frozen` / `testFrozen`) არ უნდა გაიზარდოს მათთვის დაფიქსირებულ ზომაზე მეტად                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | დიახ                                          |
| `check:error-helper`              | executors/handlers-ში შეცდომის პასუხები იყენებს `buildErrorBody()` / `sanitizeErrorMessage()`-ს (მკაცრი წესი #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | დიახ                                          |
| `check:migration-numbering`       | Migration SQL ფაილებს აქვთ თანმიმდევრული ნუმერაცია, გამოტოვებებისა და დუბლიკატების გარეშე                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | დიახ                                          |
| `check:public-creds`              | `publicCreds.ts`-ის გარეთ არ არის OAuth-ის პირდაპირი `client_id`/`client_secret` ან Firebase Web გასაღებები (მკაცრი წესი #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | დიახ                                          |
| `check:db-rules`                  | `src/lib/db/` მოდულების გარეთ არ არის ნედლი SQL; `localDb.ts`-დან barrel-import-ები არ გამოიყენება (მკაცრი წესები #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | დიახ                                          |
| `check:known-symbols`             | Provider-ის executors, routing strategies და translators, რომლებიც dispatch tables-შია რეგისტრირებული, დისკზე არსებულ ფაილებს ემთხვევა — არ არსებობს ობოლი ან განუცხადებელი სიმბოლოები                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | დიახ                                          |
| `check:route-guard-membership`    | ყოველი route, რომელიც child process-ს ქმნის, კლასიფიცირებულია `isLocalOnlyPath()`-ის მიერ (მკაცრი წესები #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | დიახ                                          |
| `check:test-discovery`            | რეპოზიტორიაში არსებული ყველა `*.test.ts` / `*.spec.ts` ფაილი შეგროვებულია მინიმუმ ერთი ტესტის runner-ის მიერ (ratchet: `test-discovery-baseline.json`-ში orphan-ების სია შეიძლება მხოლოდ შემცირდეს)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | დიახ                                          |
| `check:test-tla-order`            | `tests/unit`-ის ქვეშ არსებული არც ერთი `node:test` ფაილი არ არეგისტრირებს ტესტს, არ ხვდება top-level `await`-ზე და შემდეგ დამატებით ტესტებს არ არეგისტრირებს (#18045; ratchet: `test-tla-order-allowlist.json` შეიძლება მხოლოდ შემცირდეს)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | დიახ                                          |
| `check:agent-skills-sync`         | გენერირებული agent-skills არტეფაქტები ემთხვევა მათ წყაროს კატალოგს (განსხვავება არ არსებობს)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:provider-asset-provenance` | პროვაიდერების ლოგოებს/რესურსებს აქვთ დაფიქსირებული წარმოშობის ჩანაწერი                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `lint:json`                       | JSON-ის კონფიგურაციის ფაილები წარმატებით იშლება და აკმაყოფილებს რეპოზიტორიის lint-ის წესებს                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `typecheck:core`                  | TypeScript-ის კომპილაცია შეცდომების გარეშე (მხოლოდ საკონსულტაციო გაფრთხილებები)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | დიახ                                          |
| `typecheck:noimplicit:core`       | მკაცრი `noImplicitAny` — სამომავლო მიმართულება; მრავალ წინასწარ არსებულ call site-ს ჯერ კიდევ სჭირდება ანოტაციები                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **საკონსულტაციო** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`-ით შემოწმება, რომელიც შემოიფარგლება `src/app/(dashboard)/**`-ით (#7033) — `typecheck:core`-ის შერჩეული 27-ფაილიანი allowlist-ი dashboard-ის არცერთ TSX ფაილს არ მოიცავს, ხოლო `next build` მას ტიპების შემოწმებას საერთოდ არ უტარებს (`next.config.mjs`-ში მითითებულია `ignoreBuildErrors: true`), ამიტომ იქ orphaned-identifier-ის რეგრესიები (#6625/#6909) CI-სთვის უხილავი იყო. განსხვავებები მოწმდება გაყინულ, თითოეული ფაილისა და TS-კოდის მიხედვით დათვლილ საბაზისო მაჩვენებელთან (`config/quality/dashboard-typecheck-baseline.json`, ძველი enforcement-ის იგივე შაბლონი, როგორიც `check:known-symbols`-ს აქვს) — gate-ს მხოლოდ საბაზისო რაოდენობაზე მეტი NEW შეცდომები აჩერებს; რაოდენობის შემცირება შესაძლებელია `--update`-ით, როდესაც წინასწარ არსებული შეცდომა გამოსწორდება.                                                                                                                 | დიახ                                          |

### Job: `quality-gate`

ეშვება `test-coverage`-ის შემდეგ. შეცდომის შემთხვევაში merge-ს ბლოკავს.

| Script                       | Validates                                                                                                                                                                                                                   | Blocking                     |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `quality:collect`            | წარმოქმნის `quality-metrics.json`-ს (ESLint-ის გაფრთხილებების რაოდენობა, coverage გაერთიანებული shard-ის ანგარიშიდან)                                                                                                       | დიახ (ratchet-ის წინაპირობა) |
| `quality:ratchet`            | `quality-baseline.json`-ში არსებული თითოეული მეტრიკა არ არის გაუარესებული (ESLint-ის გაფრთხილებები ≤ baseline; coverage ≥ baseline)                                                                                         | დიახ                         |
| `check:duplication`          | კოდის დუბლირება (jscpd@4) არ აღემატება `quality-baseline.json`-ში მითითებულ baseline-ს                                                                                                                                      | დიახ                         |
| `check:complexity`           | ფაილის დონის ციკლომატური სირთულე არ აღემატება ლიმიტს (core ESLint-ის `complexity` + `max-lines-per-function`)                                                                                                               | დიახ                         |
| `check:cognitive-complexity` | კოგნიტიური სირთულის ratchet (`eslint-plugin-sonarjs`) — ცალკე ESLint-ის გაშვება; CI-ში ორივე გაერთიანებულია ერთ `check:complexity-ratchets` ეტაპად                                                                          | დიახ                         |
| `check:dead-code`            | გამოუყენებელი ექსპორტებისა და ფაილების ratchet (knip) არ არის გაუარესებული baseline-თან შედარებით                                                                                                                           | დიახ                         |
| `check:compression-budget`   | შეკუმშვის ბენჩმარკის ბიუჯეტი — თითოეული engine-ისთვის token-savings-ის მინიმალური ზღვარი არ უნდა გაუარესდეს                                                                                                                 | დიახ                         |
| `check:type-coverage`        | ტიპიზაციის პროცენტული მაჩვენებლის ratchet (`type-coverage`) არ არის გაუარესებული; დიდწილად მოიცავს `typecheck:noimplicit:core`-საც                                                                                          | დიახ                         |
| `check:codeql-ratchet`       | ღია CodeQL alert-ების რაოდენობა არ არის გაუარესებული (იკითხება `gh api`-ის საშუალებით; token-ის გარეშე უსაფრთხოდ გამოტოვდება) — განახლების პერიოდულობისა და ხელით გაშვების შესახებ იხილეთ ქვემოთ, „CodeQL ratchet“ სექციაში | დიახ                         |

### Job: `quality-extended`

მთელი job საკონსულტაციო ხასიათისაა (`continue-on-error: true`). npm-ზე დაფუძნებული ratchet-ები რეალურად სრულდება; გარე სკანერები ინსტალირდება `gh release download`-ის საშუალებით და თავად გამოტოვებენ შესრულებას (exit 0), როდესაც ბინარული ფაილი ჯერ არ არსებობს.

| Script                   | Validates                                                                                                                                                                                                                                          | Blocking                                                |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `check:circular-deps`    | ციკლური დამოკიდებულებები არ არსებობს (dpdm)                                                                                                                                                                                                        | **საკონსულტაციო**                                       |
| `check:bundle-size`      | Bundle-ის ზომა არ აღემატება ლიმიტს                                                                                                                                                                                                                 | **საკონსულტაციო**                                       |
| `check:secrets`          | საიდუმლოებების სკანირება (gitleaks) — გამოტოვდება, თუ ბინარული ფაილი არ არსებობს                                                                                                                                                                   | **საკონსულტაციო**                                       |
| `check:vuln-ratchet`     | დამოკიდებულებების მოწყვლადობები (osv-scanner) არ არის გაუარესებული — გამოტოვდება, თუ ბინარული ფაილი არ არსებობს                                                                                                                                    | **საკონსულტაციო**                                       |
| `check:workflows`        | Workflow-ების lint (actionlint + zizmor); დაკარგული/გაფუჭებული სკანერები, არასწორი ანგარიშები ან დაკარგული ratchet baseline იწვევს INCOMPLETE სტატუსით ჩავარდნას. აღმოჩენილი ვალიდური პრობლემები მიჰყვება არჩეულ strict/advisory/ratchet პოლიტიკას | შესრულება სავალდებულოა; CI-ში zizmor-ის ratchet ბლოკავს |
| `check:openapi-breaking` | საჯარო API კონტრაქტში (`openapi.yaml`) base branch-თან შედარებით არსებული breaking ცვლილებები (oasdiff) — წარმოქმნის `openapiBreaking=N`-ს; გამოტოვდება, თუ oasdiff არ არსებობს ან base spec-ის ამოხსნა შეუძლებელია                                | **საკონსულტაციო**                                       |

### Job: `docs-sync-strict`

ეშვება `main`-ზე მიმართულ ყოველ PR-ზე. შეცდომის შემთხვევაში merge-ს ბლოკავს.

| Script                         | ამოწმებს                                                                                                                                                                              | ბლოკავს                    |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | მეტა-გეიტი, რომელიც ქვემოთ მოცემულ 6 ქვე-გეიტს თანმიმდევრულად უშვებს                                                                                                                  | დიახ                       |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt ვერსიების თანმიმდევრულობას                                                                                                                              | დიახ                       |
| ↳ `check:docs-counts`          | პროზაში მოცემული რაოდენობები (პროვაიდერების რაოდენობა, მიგრაციების რაოდენობა და სხვ.) რეალური რაოდენობების რაჩეტის ფანჯარაშია                                                         | დიახ                       |
| ↳ `check:env-doc-sync`         | `.env.example`-ში არსებული ყოველი env var დოკუმენტირებულია დოკუმენტაციის ცხრილში და პირიქით                                                                                           | დიახ                       |
| ↳ `check:deprecated-versions`  | დოკუმენტაციაში არ არის მოძველებული ვერსიის სტრიქონები                                                                                                                                 | დიახ                       |
| ↳ `check:doc-links`            | დოკუმენტაციაში შიდა markdown-ბმულები რეალურ ფაილებზე მიუთითებს (`[text]`/`(path)` ფორმა)                                                                                              | დიახ                       |
| ↳ `check:fabricated-docs`      | დოკუმენტაციაში მითითებული route-ები, env var-ები, CLI ბრძანებები, hook-ების სახელები და ფაილის გზები კოდბაზაში არსებობს. `--strict`-ით მკაცრი გეიტია; დროშის გარეშე რბილად ჩავარდება. | დიახ (`--strict`-ით CI-ში) |
| `check:cli-i18n`               | CLI ბრძანებების სტრიქონები ყველა i18n ლოკალის ფაილში არის                                                                                                                             | დიახ                       |
| `check:openapi-coverage`       | OpenAPI სპეციფიკაცია რეალური route-ების სულ მცირე რაჩეტირებულ მინიმუმს მოიცავს                                                                                                        | დიახ                       |
| `check:openapi-security-tiers` | `openapi.yaml`-ში უსაფრთხოების ტიერების ანოტაციები თანმიმდევრულია `routeGuard.ts`-ის კლასიფიკაციებთან                                                                                 | **საკონსულტაციო**          |
| `check:openapi-routes`         | `openapi.yaml`-ში არსებული ყოველი path რეალურ `route.ts`-ზე მიუთითებს (ჰალუცინაციების საწინააღმდეგო შემოწმება)                                                                        | დიახ                       |
| `check:docs-symbols`           | `docs/**/*.md`-ში არსებული ყოველი `/api/...` მითითება რეალურ `route.ts`-ზე მიუთითებს (ჰალუცინაციების საწინააღმდეგო შემოწმება)                                                         | დიახ                       |
| `i18n translation drift`       | i18n ლოკალის ფაილებში უთარგმნელი გასაღებები — მხოლოდ გაფრთხილება                                                                                                                      | **საკონსულტაციო**          |

`docs/diagrams/`-ში არსებული თორმეტი README SVG გენერირებულია (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` ხელახლა აგენერირებს ყველა მათგანს). თითოეულს აქვს ბაიტების შედარების unit test
(`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`), რომელიც ჩავარდება, როცა კომიტირებული ფაილი მოძველებულია, ხოლო
`check:docs-counts` კანონიკურ რიცხვებს მათი `<text>` კვანძებიდან კითხულობს — სწორედ ამიტომ outlining-ის ეტაპი ფაილში ყველა outlined სტრიქონს უხილავ `<text>`-ად ტოვებს. SVG კანონიკური რიცხვების შემოწმება კითხულობს
`SVG_DIAGRAM_FILES`-ში ჩამოთვლილ ფაილებს (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, ასევე `public/images/tier-flow-dark.svg` და `tier-flow-light.svg`; free-forever, catalog-entry,
recurring-pool და scoring-factors მტკიცებები ასევე კითხულობს
`promise-pillars.svg`, `free-tier-budget.svg` და `strategies-grid.svg` ფაილებს. `free-tier-budget.svg`
თავის მაჩვენებლებს ცოცხალი კატალოგის ჩამტვირთავიდან იღებს, ამიტომ `FREE_MODEL_BUDGETS`-ის ან
პროვაიდერის საჩვენებელი სახელის ცვლილება CI-ს წითლად ხდის, სანამ ეს ფაილი ხელახლა არ დაგენერირდება.

### დავალება: `i18n-ui-coverage`

| Script                            | ამოწმებს                                                                                                                                                                                                | ბლოკავს           |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `check-ui-keys-coverage` (inline) | UI i18n გასაღებების დაფარვა ≥ 65%-ია                                                                                                                                                                    | დიახ              |
| `check-ui-value-drift` (inline)   | გადაწერილი ინგლისური **მნიშვნელობა** ძველ თარგმანს აღარ ტოვებს                                                                                                                                          | დიახ              |
| `check-new-key-coverage` (inline) | **ახალი** ინგლისური გასაღები ყველა ლოკალში ნათარგმნია — `__MISSING__:` მარკერი უარყოფილია                                                                                                               | დიახ              |
| `check-translation-ratio`         | თითოეული ლოკალის რეალური თარგმნის წილი (ინგლისურთან იდენტური / placeholder / დაკარგული მნიშვნელობები allowlist-ის გარეთ) არ უნდა აღემატებოდეს `config/quality/i18n-translation-baseline.json` + slack-ს | **საკონსულტაციო** |

საჭიროა `fetch-depth: 0` — value-drift გეიტი `en.json`-ს merge base-თან ადარებს.

#### `check-ui-value-drift` — მოძველებული თარგმნის გეიტი

იჭერს i18n-ის იმ ერთ რეგრესიას, რომელსაც სხვა შემოწმებები სტრუქტურულად ვერ ამჩნევენ: ინგლისური მნიშვნელობა გადაიწერება, ხოლო _წინა_ ინგლისურიდან მიღებული თარგმანები უცვლელი რჩება, ამიტომ არაინგლისურენოვანი მომხმარებლები კვლავ თავდაჯერებულად ფორმულირებულ, მაგრამ უკვე მცდარ ტექსტს კითხულობენ.

ეს რეალურად გაეშვა. `oauthModal.googleOAuthWarning` გადაიწერა, როდესაც Antigravity-ის შესვლის დამხმარე დაემატა (#5203); **43 ლოკალიდან 39-ში** დარჩა ტექსტი, რომელიც ოპერატორებს ეუბნებოდა: „დააკოპირეთ სრული URL და ჩასვით ქვემოთ“ — პროცესი, რომელიც ამ პროვაიდერისთვის ვერ სრულდება. ეს შეუმჩნეველი დარჩა #8463-მდე, რადგან:

- `sync-ui-keys` ავსებს მხოლოდ **არარსებულ** გასაღებებს და არასდროს აახლებს **მოძველებულებს**;
- `check-ui-keys-coverage` ითვლის გასაღების _არსებობას_, ამიტომ მოძველებული თარგმანი დაფარულად ითვლება;
- `check-translation-drift` აკონტროლებს `docs/i18n/<locale>/**.md` დოკუმენტაციის ასლებს — ის არასდროს კითხულობს `src/i18n/messages/*.json`-ს. job `docs-sync-strict`-ში ბლოკირება მოქმედებს 2026-09-ის ხელახალი სინქრონიზაციიდან: ძირითადი დოკუმენტის რედაქტირების შემდეგ გაუშვით `npm run i18n:run -- --files=<doc>` (სექციის დონეზე, იაფია).

**Diff-ზე ორიენტირებული და არა baseline-ზე დაფუძნებული.** ის ადარებს `en.json`-ს merge base-ზე სამუშაო ხესთან; ყველა გასაღებისთვის, რომლის ინგლისური მნიშვნელობაც შეიცვალა, ნებისმიერი ლოკალი, რომელსაც ჯერ კიდევ უცვლელი თარგმანი აქვს, მოძველებულად ითვლება. ეს განზრახ **ყინავს წინასწარ არსებულ ვალს** — diff-ით შეუძლებელია გაირკვეს, რომელ ძველ ინგლისურ ტექსტს ეფუძნებოდა დიდი ხნის წინ არსებული თარგმანი, ამიტომ შემოწმება აფასებს მხოლოდ იმას, რასაც მიმდინარე ცვლილება ეხება. ალტერნატივა (თითოეული გასაღების hash-ის baseline) დაახლოებით 600 KB-ის გენერირებულ ფაილს მოითხოვდა, რაც არსებულ ყველაზე დიდ baseline-ზე 3-ჯერ მეტია და ყველა i18n PR-ზე ცვლილებებს გამოიწვევდა.

მის დასაკმაყოფილებლად ორი გზა არსებობს:

1. განაახლეთ შესაბამისი თარგმანები, ან
2. დააყენეთ ისინი `__MISSING__:<new english>`-ზე — runtime შემდეგ გამოიყენებს შესწორებულ ინგლისურ ტექსტს (`src/i18n/request.ts::deepMergeFallback`, #7258), ხოლო გასაღები თარგმნის რიგში მოხვდება.

თუ სტრიქონის **მნიშვნელობა** შეიცვალა, უპირატესობა მიანიჭეთ **გასაღების სახელის შეცვლას**: ახალი გასაღები ვერ მიიღებს მოძველებულ თარგმანს. სწორედ ეს მიდგომა გამოიყენა #8463-მა.

```bash
npm run i18n:check-value-drift          # მკაცრი რეჟიმი (რასაც CI უშვებს)
npm run i18n:check-value-drift:warn     # მხოლოდ ანგარიშის გამოქვეყნება
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

აბრუნებს 0-ს `SKIP reason=base-unresolved`-ით, როდესაც საბაზისო კატალოგის წაკითხვა შეუძლებელია (shallow clone საბაზისო ref-ის გარეშე), `check-openapi-breaking`-ის მსგავსად.

### Job: `i18n`

i18n-ის სრული ვალიდაციის მატრიცა (თითო job თითო ლოკალზე). მთელი job საკონსულტაციო ხასიათისაა.

| Script                          | ამოწმებს                           | ბლოკირება                                                 |
| ------------------------------- | ---------------------------------- | --------------------------------------------------------- |
| `validate_translation.py quick` | თარგმანის სისრულეს თითოეულ ლოკალზე | **საკონსულტაციო** (`continue-on-error: true` მთელ job-ზე) |

### Job: `pr-test-policy`

ეშვება მხოლოდ pull request-ებზე.

| Script                 | ამოწმებს                                                                                                                                                         | ბლოკირება |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PR-ებს, რომლებიც ცვლიან საწარმოო კოდს `src/`, `open-sse/`, `electron/` ან `bin/` დირექტორიებში, უნდა მოიცავდეს ან აახლებდეს ტესტებს (მკაცრი წესი #8)             | დიახ      |
| `check:test-masking`   | შეცვლილი ტესტის ფაილები არ ამცირებს assert-ების წმინდა რაოდენობას და არ ამატებს `assert.ok(true)` ტავტოლოგიებს                                                   | დიახ      |
| `check:pr-evidence`    | PR-ის აღწერაში ცვლილებისთვის ტესტების/VPS-ის მტკიცებულებაა მითითებული (მკაცრი წესის #18 ავტომატიზებული შემოწმება PR-ის ტექსტის grep-ით — მყიფეა, იხილეთ Backlog) | დიახ      |

### Job: `test-vitest`

ეშვება `build`-ის შემდეგ. შეცდომის შემთხვევაში merge-ს ბლოკავს.

| Suite            | ამოწმებს                                                         | ბლოკირება                                                                                                                           |
| ---------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP სერვერს (110 ხელსაწყო), autoCombo-ს, cache-ს — vitest runner | დიახ                                                                                                                                |
| `test:vitest:ui` | UI კომპონენტების ტესტებს — vitest runner                         | **ბლოკირებადი** — უკვე არსებული შეცდომები პირდაპირ გამორიცხულია `vitest.config.ts`-ში; ახალი შეცდომები job-ს ჩავარდნის მიზეზი ხდება |

### Nightly workflows (დაგეგმილი, საკონსულტაციო)

ეს სამუშაო პროცესები cron-ის განრიგით (და `workflow_dispatch`-ით) ეშვება და არასდროს ეშვება PR-ებზე. ყველა მათგანი საკონსულტაციო ხასიათისაა.

| Workflow               | ვალიდაციას ახორციელებს                                                                                                                                                             | ბლოკირება         |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `nightly-property`     | fast-check-ის property ტესტები შემთხვევითი seed-ით და გაშვებების დიდი რაოდენობით                                                                                                   | **საკონსულტაციო** |
| `nightly-resilience`   | heap-ის ზრდის ზღვარი, chaos fault-injection, k6 load/soak                                                                                                                          | **საკონსულტაციო** |
| `nightly-llm-security` | promptfoo injection guard (block რეჟიმი) + garak probes (გამოტოვებულია provider secret-ის გარეშე)                                                                                  | **საკონსულტაციო** |
| `nightly-schemathesis` | OpenAPI კონტრაქტის fuzzing (schemathesis) ცოცხალი OmniRoute-ის წინააღმდეგ `docs/openapi.yaml`-ის გამოყენებით — ავლენს სპეციფიკაციის დარღვევებს / დაუმუშავებელ 500-ებს (ფაზა 8 B.4) | **საკონსულტაციო** |
| `nightly-mutation`     | Stryker mutation-testing-ის ქულა fast unit lane-ზე — გადარჩენილი მუტანტები სუსტ assert-ებს ავლენს                                                                                  | **საკონსულტაციო** |
| `nightly-compat`       | Node-ის engine-ების თავსებადობის მატრიცა მხარდაჭერილ `engines.node` დიაპაზონებში                                                                                                   | **საკონსულტაციო** |

წარმადობის საბაზისო მაჩვენებლები (heap, TTFB, build time) იწერება, მაგრამ ბლოკირებისთვის არ გამოიყენება: იხილეთ [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
