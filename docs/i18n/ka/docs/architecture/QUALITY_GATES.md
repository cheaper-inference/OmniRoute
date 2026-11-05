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

## კარიბჭის ინვენტარი და შესრულების პროფილები

### კანდიდატის მიღება

CI და Quality Gates სამუშაო ნაკადები გამოსცემს სტაბილურ ვერდიქტს: `Gate / CI` და `Gate / Quality`. მათი ვერსიით დაშვების პოლიტიკა ჩამოთვლის ყველა ზედა ნაკადის სამუშაოს, როგორც საჭირო ან საკონსულტაციო. საჭირო სამუშაო უნდა იყოს წარმატებული: გამოტოვებული, გაუქმებული, გამოტოვებული, მომლოდინე და უცნობი შედეგები ვერ დაადგენს PASS. მხოლოდ დოკუმენტებისთვის ან მხოლოდ კატალოგისთვის განკუთვნილი მოქმედი კლასიფიკაციით შეიძლება კოდის ზოლი გამოუსადეგარი გახდეს; პროექტი PR არ არის მიღებული კანდიდატი. `hotfix` იარლიყი არ უარყოფს მტკიცებულებებს.

ორივე სამუშაო ნაკადი მოიცავს PRs main/release ტოტებად, უბიძგებს `main`, ხელით გაგზავნას და გაერთიანების მოვლენებს. დააყენეთ, გაგზავნეთ და შერწყმა-ჯგუფური გაუშვით სრული შერჩევა. `release/**` ზე გადასვლები არ იწყებენ მათ (2026-10-18): ყოველმა ცვლილებამ უკვე გაუშვა მატრიცა მის PR ზე და გაერთიანებული კომბინაცია არის Release-Green-ის სამუშაო (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks და შერწყმის ჯგუფები იყენებენ მასპინძელ მორბენალს სამუშაოებისთვის, რომლებიც სხვაგვარად ირჩევენ თვითმასპინძელ მორბენლებს; საკმარისი ჰოსტინგის მოცულობა უნდა დადასტურდეს გაშვებამდე.

ჩვეულებრივი PR მართავს სწრაფ შერჩევას. დაშვების პოლიტიკის `full-code` და `full-code-e2e` ზოლები (E2E, ინტეგრაცია, პაკეტის არტეფაქტი, Electron smoke, Bun SQLite, ეკოსისტემის და პროტოკოლის კლიენტები) მუშაობს მხოლოდ Mergify რიგის პროექტზე ან სრულ გაშვებაზე: `gh workflow run ci.yml --ref <branch>`.

### რიგის შერწყმა

`queue` ლეიბლი აგზავნის PR Mergify რიგში (`.mergify.yml`). Mergify ხსნის PR მონახაზს `mergify/merge-queue/` ფილიალზე, CI აწარმოებს სრულ შერჩევას იქ და ორიგინალური PR ერწყმის, როდესაც `Gate / CI`, `Gate / Quality` და `Merge integrity (changelog + generated skills)` გაივლის.

Mergify წერს თავის რიგის შეჯამებას მონახაზის აღწერაში და სხვა აპებსაც შეუძლიათ მისი რედაქტირება. `pull_request` `edited` მოვლენა ასეთ დრაფტზე იღებს თავის კონკურენტულ ჯგუფს (`-queue-edit-<run_id>`), ამიტომ მას არ შეუძლია გააუქმოს მონახაზის რეალური გაშვება და გამოტოვებს კარიბჭეს და მატრიცას. ჯერ მხოლოდ `Merge integrity` მუშაობს. გამოტოვებული კარიბჭის სამუშაოს აქვს სხვა შემოწმების სახელი, რადგან Mergify კითხულობს გამოტოვებულ `Gate / CI`, როგორც წარუმატებელ შემოწმებას და წყვეტს PR.

დეკეუის შემდეგ, ბიძგი ყოველთვის არ ითხოვს PR ს. კომენტარი `@mergifyio queue` ამაზე.

თითოეული JSON ქვითარი განსაზღვრავს გამოტანილ SHA, სამუშაო პროცესის გაშვებას და მცდელობას. CLI უარყოფს checkout/event SHA შეუსაბამობას. სამუშაო პროცესის ტესტები აკავშირებს პოლიტიკის წევრობას ვერდიქტის სამუშაოს `needs` სიაში, ასე რომ ახალი ან ამოღებული ზოლი არ შეიძლება ჩუმად გაქრეს. ქვითრები მოიცავს საკუთარ სამუშაო პროცესს და არა პუბლიკაციას, განლაგებას ან არსებული საკონსულტაციო სკანერის ინტერიერს. ფილიალის წესებში ორივე გამშვები სახელის გააქტიურება ცალკე ადმინისტრაციული ცვლილებაა; ამ სამუშაოების დამატება თავისთავად არ იცავს ფილიალს.

### სტატიკური სკანირების ინვენტარი

ვერსიული npm-alias ინვენტარი და სტატიკური სკანირების წევრობა ცოცხალია `config/quality/gate-manifest.json` ში. გაუშვით `npm run check:gate-manifest` სკრიპტის სახელებისა და ზუსტი ბრძანებების დასადასტურებლად `package.json` მიმართებაში; დამატებები, ამოღება და ბრძანების დრიფტი ვერ ახერხებს როგორც ლოკალურ ჰუკს, ასევე ცვლილება-კლასიფიკაციის სამუშაოებს CI ში. მეტსახელი არ არის სამუშაო პროცესის სამუშაო, მატრიცის მაგალითი ან საცდელი შემთხვევა: ეს რიცხვები არ უნდა იყოს წარმოდგენილი, როგორც ურთიერთშემცვლელი.

გამოიყენეთ `npm run quality:scan -- --list` ან `npm run quality:scan:fast -- --list` არჩეული მეტსახელების შესამოწმებლად მათი შესრულების გარეშე. მორბენალი იწვევს npm შესვლის წერტილს, ასე რომ, მისი გაშვების დრო (მათ შორის, Bun სადაც არის კონფიგურირებული) შენარჩუნებულია. მანიფესტი იწერს მეტსახელებს ამ პროფილების გარეთ, როგორც ცალკე გამოძახებული, და ტექნიკური ბრძანებები აკრძალულია მხოლოდ წასაკითხად სკანირებულ პროფილებში.

ეს პროფილები მოიცავს მხოლოდ სტატიკურ სკანირებას. ისინი არ ამოწმებენ პროდუქტის ტესტებს, დაფარვას, შეფუთვას, გარე შემოწმებას ან კანდიდატის სრულ გამოშვებას. სამუშაო პროცესის დაშვება იყენებს დაკავშირებულ `config/quality/admission-policy.json` და `scripts/quality/admission-verdict.mjs`. გამოშვება-დამკვირვებლის პროფილები რჩება ცალკე; დამოუკიდებლად შეამოწმოს მათი შესაბამისი ჩეკები და ქვითრები. ქვემოთ მოცემული პროზაული ინვენტარი არის მითითება და არა მტკიცებულება იმისა, რომ კარიბჭე რეალურად გაიქცა.

სკრიპტები ცხოვრობენ `scripts/check/` (პოლიტიკის კარიბჭე) და `scripts/quality/` (რათეტის ძრავის) ქვეშ. ჭეშმარიტების CI წყაროა `.github/workflows/ci.yml`.

### გაათავისუფლეთ PR სწრაფი გზა (`quality.yml`)

`.github/workflows/quality.yml` ავსებს CI main/release PRs ზე, უბიძგებს `main` ზე, აგზავნის და აერთიანებს ჯგუფებს. PRs იყენებს ბილიკით გაფილტრულ სწრაფ შემოწმებებს. სამუდამოდ გამორთული დუბლიკატი build წაიშალა; რეალური build/package/boot ჩეკები რჩება CI ში. ერთეულის კომპლექტი და ვიტესტი მუშაობს მხოლოდ CI ში (`Unit Tests (N/8)` და `Vitest`).

| სამსახური                                        | ფარგლები                                                                                                                                                         | ბლოკირება               |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs და docs-all                                                                                                                         | დიახ                    |
| `Fast Quality Gates`                             | კოდი PRs; სტატიკური შემოწმებები, ტიპების შემოწმება, დაფის ტიპის შემოწმება, ზემოქმედების ქვეშ მყოფი ერთეულის ტესტები, დავიწყებული და-ძმის ტესტები (საკონსულტაციო) |
| `No new ESLint warnings`                         | კოდი PRs; suppressions-aware lint მცველი                                                                                                                         | დიახ, ჩანგლების ჩათვლით |
| `Merge integrity (changelog + generated skills)` | არადრაფტი PRs; ცვლილებების ჟურნალი და გენერირებული უნარების სინქრონიზაცია                                                                                        | დიახ, ჩანგლების ჩათვლით |

#### დავიწყებული და-ძმის ტესტების ანგარიში

`npm run check:forgotten-sibling-tests` მუშაობს `Fast Quality Gates` ის საკონსულტაციო ნაბიჯის სახით და ხელახლა იყენებს იმპორტის გადამწყვეტს ტესტის ზემოქმედების რუკის უკან. ყოველი შეცვლილი წარმოების მოდულისთვის, ის აცნობებს განმსაზღვრელ `changed module/symbol -> static consumer -> candidate sibling test` ჯაჭვებს, როდესაც კანდიდატის ტესტი არ არის pull-მოთხოვნის განსხვავებაში. Markdown-ის შეჯამება და JSON შედეგი შენარჩუნებულია, როგორც `forgotten-sibling-tests` სამუშაო პროცესის არტეფაქტი კალიბრაციისთვის ნებისმიერი დაბლოკვის გაშვებამდე.

ლულის რეექსპორტი და დინამიური იმპორტი მხოლოდ გარჩევადობის დიაგნოსტიკაა; ისინი არასოდეს ქმნიან ბლოკირების აღმოჩენას. განხილული გამონაკლისები ცხოვრობს `config/quality/forgotten-sibling-allowlist.json` ში. თითოეულ ჩანაწერში უნდა იყოს მითითებული მომხმარებლისა და კანდიდატის ტესტი, მიუთითოს კონკრეტული დასაბუთება და დააკავშიროს GitHub საკითხი ან pull მოთხოვნა. არასწორი ჩანაწერები ვერ დაიხურა. გამონაკლისები ვერ ახშობს წაშლილი კანდიდატის ტესტს ან განსხვავებას, რომელიც ამატებს `.skip`/`.todo`; მტკიცების შესუსტება და სხვა ნიღბები რჩება დამოუკიდებლად ჩამკეტი `check:test-masking` კარიბჭის საკუთრებაში.

### სამსახური: `lint`

მუშაობს ყველა PR ზე `main` ზე. ბლოკები ერწყმის წარუმატებლობას.

| სკრიპტი (`npm run ...`)           | ამოწმებს                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ბლოკირება                                     |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `check:node-runtime`              | Node.js ვერსია მხარდაჭერილ დიაპაზონშია                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | დიახ                                          |
| `check:cycles`                    | წრიული იმპორტი ყველა `src/` + `open-sse/` ში (AST-ზე დაფუძნებული, tsconfig `paths` მოგვარებულია). Bare გამოდის 1-დან, როდესაც რაიმე ციკლი არსებობს (ჩავარდნა-დახურულია #15281 დან) და ჩამოთვლის SCCs. `check:cycles:ratchet` (რა CI მუშაობს) ბლოკავს, როდესაც რაოდენობა აღემატება `metrics.cycles` ჭერს `quality-baseline.json` — ში ამჟამად 14, `direction: down`, ასე რომ, ის შეიძლება მხოლოდ დაეცეს (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | დიახ (რაკეტი)                                 |
| `check:boundary`                  | `open-sse → src` დაწყვილება: უნიკალური ფაილიდან ფაილში იმპორტი ძრავიდან აპში (`scripts/quality/measure-boundary.mjs`; ზღვრების სია არის v4 core/module-split გამოსწორების ბექლოგი). Bare = საკონსულტაციო ანგარიში (იგივე `quality:boundary`). `check:boundary:ratchet` (რაც CI გადის, ასევე `quality.yml` fast-gates ratchet loop-ში) ბლოკავს, როდესაც რაოდენობა აღემატება `metrics.boundaryOpenSseToSrc` ჭერს `quality-baseline.json` — ში დათესილი გაზომილი 771, `direction: down`; `--update` მხოლოდ ამცირებს მას; ბაზა-ნათესავი PRs ზე (`--base-ref`, იხილეთ ქვემოთ)                                                                                                                                                                                                                                                                                                                                                                                                                  | დიახ (რაკეტი)                                 |
| `check:route-validation:t06`      | Zod სქემები წარმოდგენილია ყველა მარშრუტზე (მე-6 დონის პოლიტიკა)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | დიახ                                          |
| `check:any-budget:t11`            | `@ts-expect-error // any` რაოდენობა არ აღემატება ბიუჯეტს (11 კატრაკა)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | დიახ                                          |
| `check:provider-consistency`      | `providers.ts` ს ყველა პროვაიდერს აქვს შესაბამისი ჩანაწერი `providerRegistry.ts` ში (და პირიქით, დაშვებულ სიაში)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | დიახ                                          |
| `check:model-lifecycle`           | სამი ხელით შენახული მარშრუტიზაციის ცხრილი შეესაბამება შემოწმებულ სასიცოცხლო ციკლის სნეპშოტს (#11503): `FITNESS_TABLE` (`taskFitness.ts`) არ აგროვებს პენსიაზე გასული id-ს, რომლის მარშრუტიც `REGISTRY` შეუძლია; ყველა `BUILT_IN_ALIASES` სამიზნე იმყოფება `REGISTRY` ში და არ არის გადამდგარი ID სნეპშოტში; ყველა გადამდგარი ID ჯერ კიდევ `REGISTRY` ში გადაგზავნილია ან ჩამოთვლილია `allowedRetiredInCatalog` ში; და არც ერთი `DEFAULT_DEGRADATION_MAP` წყარო ან სამიზნე არ ჩანს ამ კადრში. ეს არ ადასტურებს, რომ მოდელს ამჟამად ემსახურება პირდაპირი ზემო დინებაში. ოფლაინ — ადარებს `config/quality/model-lifecycle.json`, განახლებულია ხელით `npm run quality:refresh-model-lifecycle` ით (ქსელი; არ არის ჩართული CI ში). `allowedRetiredInCatalog` არის დამწვრობის ჩამკეტი: დაამატეთ ჩანაწერი მხოლოდ თვალთვალის საკითხთან დაკავშირებით.                                                                                                                                              | დიახ                                          |
| `check:fetch-targets`             | კლიენტის მხარის `src/` ში ყველა `fetch("/api/...")` გადადის რეალურ `route.ts` ზე                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | დიახ                                          |
| `check:deps`                      | ყველა `npm install` -able deps ყველა `package.json` რეპოში არის `dependency-allowlist.json`; ახალი მოხსნილი ან slopsquatted პაკეტები დროშით                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | დიახ                                          |
| `audit:deps`                      | `npm audit` (ძირითადი + ელექტრონი) — no high/critical რჩევები (გადახურულია osv `check:vuln-ratchet`; იხილეთ რაციონალიზაციის ბექლოგი)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | დიახ                                          |
| `check:lockfile`                  | `package-lock.json` მთლიანობა — https რეესტრი, მთლიანობის ჰეშები, ჰოსტის უგულებელყოფა                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | დიახ                                          |
| `check:licenses`                  | SPDX ლიცენზიის დასაშვები სია წარმოების დამოკიდებულებისთვის                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | დიახ                                          |
| `check:tracked-artifacts`         | არ არის build artifacts / ჩადენილი `node_modules` symlinks (ასევე გადის husky pre-commit-ში; წინასწარ დაჭერა არის განზრახ მსუბუქი — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | დიახ                                          |
| `check:ai-attribution`            | არ არის AI/bot `Co-Authored-By` თრეილერი ან AI-ის თაობის ქვედა კოლონტიტული PR commits-ში, სათაური ან ტექსტი — Hard Rule #16 ( `quality.yml` fast `commit-msg` gates loop-ში PR→ `release/**` — კითხულობს მოვლენის დატვირთვას, no-op off PRs — და PR-მხოლოდ ნაბიჯს `ci.yml` → `main` PR; თანაავტორები დაშვებულია #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:vitest-exclusions`         | ყველა Vitest გამორიცხვა ასახელებს თვალთვალის საკითხს და გამოჩნდება `config/quality/vitest-exclusions.json` ში (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | დიახ                                          |
| `check:file-size`                 | წყაროს ფაილები (`.ts`/`.tsx` `src/` ში, `open-sse/`, `electron/`, `bin/`) რჩება `cap` ში და სატესტო ფაილები (`*.test.ts(x)`) `testCap` ში; `file-size-baseline.json` ში (`frozen` / `testFrozen`) გაყინული ფაილები არ უნდა გაიზარდოს მათ ჩაწერილ ზომაზე                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | დიახ                                          |
| `check:error-helper`              | შეცდომის პასუხები executors/handlers ში იყენებს `buildErrorBody()` / `sanitizeErrorMessage()` (მყარი წესი #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | დიახ                                          |
| `check:migration-numbering`       | მიგრაციის SQL ფაილები თანმიმდევრულად დანომრილია, არ არის ხარვეზები ან დუბლიკატები                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | დიახ                                          |
| `check:public-creds`              | არ არის პირდაპირი OAuth `client_id`/`client_secret` ან Firebase ვებ კლავიშები `publicCreds.ts` გარეთ (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | დიახ                                          |
| `check:db-rules`                  | არ არის უმი SQL `src/lib/db/` მოდულების გარეთ; არ არის ლულის იმპორტი `localDb.ts` დან (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | დიახ                                          |
| `check:known-symbols`             | პროვაიდერის შემსრულებლები, მარშრუტიზაციის სტრატეგიები და მათ დისპეტჩერიზაციის ცხრილებში დარეგისტრირებული მთარგმნელები ემთხვევა ფაილებს დისკზე — ობოლი ან გამოუცხადებელი სიმბოლოების გარეშე                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | დიახ                                          |
| `check:route-guard-membership`    | ყველა მარშრუტი, რომელიც იწვევს ბავშვის პროცესს, კლასიფიცირებულია `isLocalOnlyPath()` მიხედვით (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | დიახ                                          |
| `check:test-discovery`            | რეპოში არსებული ყველა `*.test.ts` / `*.spec.ts` ფაილი აგროვებს მინიმუმ ერთი სატესტო მორბენის მიერ (რაკეტი: `test-discovery-baseline.json` ში ობოლი სია შეიძლება მხოლოდ შემცირდეს)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | დიახ                                          |
| `check:test-tla-order`            | `tests/unit` ქვეშ არცერთი `node:test` ფაილი არ არეგისტრირებს ტესტს, ხვდება ზედა დონის `await`, შემდეგ დაარეგისტრირებს მეტს (#18045; ratchet: `test-tla-order-allowlist.json` შეიძლება მხოლოდ შემცირდეს)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | დიახ                                          |
| `check:agent-skills-sync`         | აგენტის უნარების გენერირებული არტეფაქტები ემთხვევა მათ წყაროს კატალოგს (დრიფტის გარეშე)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:provider-asset-provenance` | პროვაიდერი logos/assets ატარებს ჩაწერილი წარმოშობის ჩანაწერს                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `lint:json`                       | JSON კონფიგურაციის ფაილები აანალიზებენ და აკმაყოფილებენ რეპო ლინტის წესებს                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `typecheck:core`                  | TypeScript შედგენა შეცდომების გარეშე (მხოლოდ საკონსულტაციო გაფრთხილებები)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | დიახ                                          |
| `typecheck:noimplicit:core`       | მკაცრი `noImplicitAny` — წინდახედული; ბევრ ადრე არსებულ ზარის საიტს ჯერ კიდევ სჭირდება ანოტაციები                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **საკონსულტაციო** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ავრცელებს `src/app/(dashboard)/**` (#7033) — `typecheck:core` ს კურირებული 27-ფაილის ნებადართული სია არ შეიცავს დაფა TSX და `next build` არასოდეს ამოწმებს მას (`next.config.mjs` ადგენს `ignoreBuildErrors: true`), ამიტომ ობოლი იდენტიფიკატორის რეგრესია იქ (#6625/#6909) უხილავი იყო CI სთვის. განსხვავებები გაყინული per-file/per-TS-code დათვლის საბაზისო ხაზთან (`config/quality/dashboard-typecheck-baseline.json`, იგივე stale-enforcement pattern, როგორც `check:known-symbols`) — მხოლოდ NEW შეცდომები საბაზისო დათვლის მიღმა ვერ ხვდება კარიბჭეს; დააწიეთ `--update` ით, როცა უკვე არსებული შეცდომა დაფიქსირდა.                                                                                                                                                                                                                                                                                                                                                          | დიახ                                          |
| `check:build-typecheck`           | მთლიანი აპლიკაციის წარმოების ტიპის შემოწმება `tsconfig.build.json` ზე (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), ზედაპირის `typecheck:core` ის 27-ფაილის დაშვების სია და დაფის კარი არ ფარავს. განსხვავებები `config/quality/build-typecheck-baseline.json` სთან; ახალი ან გაზრდილი თითო (ფაილი, კოდი) რაოდენობა ვერ მოხერხდება, ქვედა რაოდენობა მოგთხოვთ აწკრიალებას. `--update` უარს ამბობს, სანამ გაშვება შეიცავს ახალ ან ამაღლებულ წყვილს, თუ `--force-regressions` არ არის გადაცემული, და უარს ამბობს ახლად გაჩუმებულ ფაილზე, თუ `--force-nocheck` არ არის გადაცემული, ამიტომ საბაზისო ხაზის გაფართოება მწვანედ და მუდმივი დუმილის მინიჭება არის ორი განცალკევებული მიზანმიმართული აქტი. შიშველი `--force` უარყოფილია. ასევე ასკანირებს build სკოპს `@ts-nocheck` სთვის `config/quality/ts-nocheck-baseline.json` სთან მიმართებაში, რადგან ფაილი, რომელიც მას იყენებს, საერთოდ არ აცნობებს დიაგნოზს და სხვაგვარად უხილავი იქნებოდა ყველა კარიბჭისთვის. | დიახ                                          |

#### ორი ტიპის შემოწმების პროგრამა განსხვავებულად პასუხობს

`typecheck:core` და `check:build-typecheck` აგროვებენ სხვადასხვა პროგრამებს სხვადასხვა ვარიანტში და ერთი და იგივე ფაილი შეიძლება იყოს სუფთა ერთში და სავსე იყოს შეცდომებით მეორეში.

`tsconfig.build.json` აყენებს `"strict": false`, ამიტომ `noImplicitAny` გამორთულია. ძირითადი კონფიგურაცია აგროვებს კურირებულ 27-ფაილის დაშვებულ სიას უფრო მკაცრი ვარიანტებით და მიჰყვება თითოეული ჩანაწერის იმპორტის გრაფიკს, ასე რომ ფაილები, რომლებიც არასოდეს გამოჩნდება build პროგრამაში, კვლავ იქ მოწმდება.

შედეგი მნიშვნელოვანია, როდესაც ვიმსჯელებთ, არის თუ არა ფაილის აკრეფილი:** ნულოვანი დიაგნოსტიკა `check:build-typecheck` ქვეშ არ ნიშნავს ნულს** . `@ts-nocheck` 26 ფაილიდან ამოღებამ აჩვენა, რომ 23 მათგანი სუფთაა build პროგრამაში; მათგან თექვსმეტმა გამოავლინა დაახლოებით 120 იმპლიციტური შეცდომა მკაცრში. გადაამოწმეთ ორივე სანამ ფაილის გაწმენდას გამოიძახებთ.

### სამსახური: `quality-gate`

ეშვება `test-coverage` შემდეგ. ბლოკები ერწყმის წარუმატებლობას.

| სკრიპტი                      | ამოწმებს                                                                                                                                                                                 | ბლოკირება          |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `quality:collect`            | ასხივებს `quality-metrics.json` (ESLint გაფრთხილების რაოდენობა, გაშუქება გაერთიანებული ფრაგმენტის ანგარიშიდან)                                                                           | დიახ (რაცის ზემოთ) |
| `quality:ratchet`            | თითოეული მეტრიკა `quality-baseline.json` ში არ დაბრუნებულა (ESLint გაფრთხილებები ≤ საბაზისო; დაფარვის ≥ საბაზისო)                                                                        | დიახ               |
| `check:duplication`          | კოდის დუბლირება (jscpd@4) არ აღემატება საბაზისო ხაზს `quality-baseline.json` ში                                                                                                          | დიახ               |
| `check:complexity`           | ფაილის დონის ციკლომური სირთულე არ აღემატება ქუდი (core ESLint `complexity` + `max-lines-per-function`)                                                                                   | დიახ               |
| `check:cognitive-complexity` | შემეცნებითი სირთულის ratchet (`eslint-plugin-sonarjs`) — ცალკე ESLint უღელტეხილზე; CI გადის ორივე გაერთიანებული, როგორც ერთი `check:complexity-ratchets` ნაბიჯი                          | დიახ               |
| `check:dead-code`            | გამოუყენებელი ექსპორტის/ფაილების ჩოგანი (კნიპი) არ რეგრესდება საბაზისო ხაზთან შედარებით                                                                                                  | დიახ               |
| `check:compression-budget`   | შეკუმშვის საორიენტაციო ბიუჯეტი — თითო ძრავზე ტოკენ-შემნახველი იატაკები არ უნდა რეგრესირდეს                                                                                               | დიახ               |
| `check:type-coverage`        | პროცენტული აკრეფით (`type-coverage`) არ რეგრესია; დიდწილად ასახავს `typecheck:noimplicit:core`                                                                                           | დიახ               |
| `check:codeql-ratchet`       | ღია CodeQL გაფრთხილების რაოდენობა არ რეგრესდება (იკითხება `gh api` მეშვეობით; მოხდენილი გამოტოვება ჟეტონის გარეშე) — განახლების ტემპი და ხელით ტრიგერები: იხილეთ "CodeQL ratchet" ქვემოთ | დიახ               |

### სამსახური: `quality-extended`

მთელი სამუშაო არის საკონსულტაციო (`continue-on-error: true`). npm-ზე დაფუძნებული რაკეტები რეალურად მუშაობს; გარე სკანერების ინსტალაცია `gh release download` საშუალებით და თვითგამოტოვება (გასასვლელი 0), როდესაც ორობითი ჯერ კიდევ არ არის.

| სკრიპტი                  | ამოწმებს                                                                                                                                                                                                     | ბლოკირება                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| `check:circular-deps`    | არ არის წრიული დამოკიდებულებები (dpdm)                                                                                                                                                                       | **საკონსულტაციო**                              |
| `check:bundle-size`      | შეფუთვის ზომა არ აღემატება თავსახურს                                                                                                                                                                         | **საკონსულტაციო**                              |
| `check:secrets`          | საიდუმლო სკანირება (gitleaks) — გამოტოვებს ორობითი არარსებობის შემთხვევაში                                                                                                                                   | **საკონსულტაციო**                              |
| `check:vuln-ratchet`     | დამოკიდებულების დაუცველობა (osv-სკანერი) არ რეგრესირებს — გამოტოვებას, თუ ორობითი არ არის                                                                                                                    | **საკონსულტაციო**                              |
| `check:workflows`        | Workflow lint (actionlint + zizmor); missing/broken სკანერები, არასწორი შეტყობინებები ან გამოტოვებული საბაზისო ხაზები არ არის INCOMPLETE. სწორი დასკვნები მიჰყვება შერჩეულ strict/advisory/ratchet პოლიტიკას | საჭიროა შესრულება; zizmor ratchet ბლოკირება CI |
| `check:openapi-breaking` | საჯარო API კონტრაქტში (`openapi.yaml`) ცვლილებების დარღვევა საბაზისო განშტოებასთან (oasdiff) — ასხივებს `openapiBreaking=N`; გამოტოვებს თუ oasdiff არ არის ან საბაზისო სპეციფიკაცია გადაუჭრელია              | **საკონსულტაციო**                              |

### სამსახური: `docs-sync-strict`

მუშაობს ყველა PR ზე `main` ზე. ბლოკები ერწყმის წარუმატებლობას.

| სკრიპტი                        | ამოწმებს                                                                                                                                                                                        | ბლოკირება                          |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `check:docs-all`               | მეტა კარიბჭე, რომელიც გადის 6 ქვე-კარიბჭს ქვემოთ თანმიმდევრულად                                                                                                                                 | დიახ                               |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt ვერსიის თანმიმდევრულობა                                                                                                                                           | დიახ                               |
| ↳ `check:docs-counts`          | პროზაში თვლები (პროვაიდერის რაოდენობა, მიგრაციის რაოდენობა და ა.შ.) არის რეალური ნომრების შეჯვარების ფანჯარაში.                                                                                 | დიახ                               |
| ↳ `check:env-doc-sync`         | `.env.example` ში ყველა env var დოკუმენტირებულია დოკუმენტების ცხრილში და პირიქით                                                                                                                | დიახ                               |
| ↳ `check:deprecated-versions`  | არ არის მოძველებული ვერსიის სტრიქონები დოკუმენტებში                                                                                                                                             | დიახ                               |
| ↳ `check:doc-links`            | შიდა მარკირების ბმულები დოკუმენტებში გადადის რეალურ ფაილებზე (`[text]`/`(path)` ფორმა)                                                                                                          | დიახ                               |
| ↳ `check:fabricated-docs`      | მარშრუტები, env vars, CLI ბრძანებები, hook სახელები და ფაილების ბილიკები, რომლებიც მითითებულია დოკუმენტებში, არსებობს კოდების ბაზაში. მყარი კარიბჭე `--strict` გავლით; soft-fail დროშის გარეშე. | დიახ ( `--strict` მეშვეობით CI ში) |
| `check:cli-i18n`               | CLI ბრძანების სტრიქონები წარმოდგენილია ყველა i18n ლოკალურ ფაილში                                                                                                                                | დიახ                               |
| `check:openapi-coverage`       | OpenAPI spec მოიცავს რეალური მარშრუტების მინიმუმ რბილ სართულს                                                                                                                                   | დიახ                               |
| `check:openapi-security-tiers` | უსაფრთხოების დონის ანოტაციები `openapi.yaml` ში შეესაბამება `routeGuard.ts` კლასიფიკაციას                                                                                                       | **საკონსულტაციო**                  |
| `check:openapi-routes`         | `openapi.yaml` ში ყველა გზა გადადის ნამდვილ `route.ts` მდე (ჰალუცინაციის საწინააღმდეგო)                                                                                                         | დიახ                               |
| `check:docs-symbols`           | `docs/**/*.md` ში ყოველი `/api/...` მითითება გადადის ნამდვილ `route.ts` ზე (ჰალუცინაციის საწინააღმდეგო)                                                                                         | დიახ                               |
| `i18n translation drift`       | გადაუთარგმნელი კლავიშები i18n ლოკალური ფაილების — მხოლოდ გაფრთხილებაა                                                                                                                           | **საკონსულტაციო**                  |

თორმეტი README SVGs `docs/diagrams/` ქვეშ არის გენერირებული (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` აღადგენს ყველა მათგანს). თითოეულ მათგანს აქვს ბაიტი-შედარების ერთეულის ტესტი (`tests/unit/docs/readme-*-svg.test.ts`, სამუშაო `test-unit`), რომელიც ვერ ხერხდება, როდესაც ჩადენილი ფაილი მოძველებულია და `check:docs-counts` კითხულობს კანონიკურ რიცხვებს მათი `<text>` კვანძებიდან — რის გამოც კონტურის საფეხური ინახავს ფაილში ყველა გამოკვეთილ სტრიქონს, როგორც უხილავ `<text>`. SVG კანონიკური რიცხვების შემოწმება კითხულობს `SVG_DIAGRAM_FILES` ში (`scripts/check/check-docs-counts-sync.mjs`) ჩამოთვლილ ფაილებს: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, პლუს `public/images/tier-flow-dark.svg` და `tier-flow-light.svg`; უფასო სამუდამოდ, კატალოგში შესვლის, განმეორებადი აუზი და ქულების ფაქტორების პრეტენზიები ასევე წაიკითხავს `promise-pillars.svg`, `free-tier-budget.svg` და `strategies-grid.svg`. `free-tier-budget.svg` ამახვილებს თავის ფიგურებს ცოცხალი კატალოგის ჩამტვირთველიდან, ასე რომ ცვლილება `FREE_MODEL_BUDGETS` ზე ან პროვაიდერის საჩვენებელ სახელზე წითელია CI სანამ ეს ფაილი რეგენერაცია არ მოხდება.

### სამსახური: `i18n-ui-coverage`

| სკრიპტი                           | ამოწმებს                                                                                                                                                                                                       | ბლოკირება         |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `check-ui-keys-coverage` (inline) | UI i18n გასაღების დაფარვა არის ≥ 65%                                                                                                                                                                           | დიახ              |
| `check-ui-value-drift` (inline)   | გადაწერილი ინგლისური** ღირებულება** არ ტოვებს ძველ თარგმანს                                                                                                                                                    | დიახ              |
| `check-new-key-coverage` (inline) | ა** ახალი** ინგლისური გასაღები ითარგმნება ყველა ლოკალში — და `__MISSING__:` მარკერი უარყოფილია                                                                                                                 | დიახ              |
| `check-translation-ratio`         | რეალური თარგმანის კოეფიციენტი ლოკალზე (იდენტურია ინგლისურთან / ჩანაცვლების ველზე / გამოტოვებული ფოთლები ნებადართული სიის გარეთ) არ უნდა აღემატებოდეს `config/quality/i18n-translation-baseline.json` + slack-ს | **საკონსულტაციო** |

საჭიროებს `fetch-depth: 0` — მნიშვნელობა-დრიფტის კარიბჭე განსხვავდება `en.json` შერწყმის ფუძისგან.

#### `check-ui-value-drift` — შემორჩენილი-თარგმანის კარიბჭე

იჭერს ერთ i18n რეგრესიას, რომელსაც სხვა კარიბჭეები სტრუქტურულად ვერ ხედავენ: ინგლისური მნიშვნელობა ხელახლა იწერება და _previous_ ინგლისურიდან მიღებული თარგმანები უკან რჩება, ამიტომ არაინგლისელი მომხმარებლები აგრძელებენ თავდაჯერებულად ფორმულირებულ, ახლა უკვე არასწორ ასლს.

ეს გაიგზავნება რეალურად. `oauthModal.googleOAuthWarning` ხელახლა დაიწერა, როდესაც Antigravity შესვლის დამხმარე დაეშვა (#5203);** 43 ლოკალიდან 39** ინახავდა ტექსტს, რომელიც ეუბნებოდა ოპერატორებს „დააკოპირონ სრული URL და ჩასვათ ქვემოთ“ — ნაკადი, რომელიც ვერ დაასრულებს ამ პროვაიდერს. ეს შეუმჩნეველი დარჩა #8463 მდე, რადგან:

- `sync-ui-keys` ავსებს მხოლოდ გასაღებებს** არყოფნის** , არასოდეს ისეთები, რომლებიც არიან** შემორჩენილი** ;
- `check-ui-keys-coverage` ითვლის საკვანძო _ყოფნას_, ასე რომ, შემორჩენილი თარგმანი გაშუქებულია;
- `check-translation-drift` აკონტროლებს `docs/i18n/<locale>/**.md` დოკუმენტაციას ასახავს — ის არასოდეს კითხულობს `src/i18n/messages/*.json`. სამუშაო `docs-sync-strict` ის დაბლოკვა 2026-09 წლების ხელახალი სინქრონიზაციის შემდეგ: შეცვალეთ ძირითადი დოკუმენტი → `npm run i18n:run -- --files=<doc>` (სექციის დონის, იაფი).

**Diff-ის ცოდნა, არა საბაზისო მხარდაჭერით.** იგი ადარებს `en.json` შერწყმის ბაზაზე სამუშაო ხესთან; ყველა გასაღებისთვის, რომლის ინგლისური მნიშვნელობა შეიცვალა, ნებისმიერი ლოკალი, რომელსაც ჯერ კიდევ ხელუხლებელი თარგმანი აქვს, მოძველებულია. ეს შეგნებულად** ყინავს ადრე არსებულ ვალს** — a diff-ს არ შეუძლია აჩვენოს, რომელი ძველი ინგლისურიდან მოვიდა დიდი ხნის თარგმანი, ამიტომ კარიბჭე განსჯის მხოლოდ იმას, რასაც ეხება მიმდინარე ცვლილება. ალტერნატივა (თითო კლავიშის ჰეშის საბაზისო ხაზი) ეღირება ~ 600 KB გენერირებული ფაილი, 3 × ყველაზე დიდი არსებული საბაზისო ხაზი, რომელიც იშლება ყოველ i18n PR ზე.

მისი დაკმაყოფილების ორი გზა:

1. განაახლეთ დაზარალებული თარგმანები, ან
2. დააყენეთ ისინი `__MISSING__:<new english>` — გაშვების დროს, შემდეგ ემსახურება შესწორებულ ინგლისურს (`src/i18n/request.ts::deepMergeFallback`, #7258) და თარგმანის საკვანძო რიგებს.

თუ სიმებიანი** მნიშვნელობა** შეიცვალა, ურჩევნია** გასაღების სახელის გადარქმევა** : ახალი გასაღები ვერ დაიმკვიდრებს ძველ თარგმანს. ეს არის #8463 გამოყენებული ნიმუში.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

გამოდის 0-დან `SKIP reason=base-unresolved` ით, როდესაც საბაზისო კატალოგის წაკითხვა შეუძლებელია (არაღრმა კლონი საბაზისო ref-ის გარეშე), ასახავს `check-openapi-breaking`.

### სამსახური: `i18n`

სრული i18n ვალიდაციის მატრიცა (ერთი სამუშაო თითო ლოკალზე). მთელი სამუშაო არის საკონსულტაციო.

| სკრიპტი                         | ამოწმებს                  | ბლოკირება                                                    |
| ------------------------------- | ------------------------- | ------------------------------------------------------------ |
| `validate_translation.py quick` | თარგმანის სისრულე ლოკალზე | **საკონსულტაციო** (`continue-on-error: true` მთელ სამუშაოზე) |

### სამსახური: `pr-test-policy`

მუშაობს მხოლოდ გაყვანის მოთხოვნით.

| სკრიპტი                | ამოწმებს                                                                                                                            | ბლოკირება |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PRs, რომელიც ცვლის წარმოების კოდს `src/`, `open-sse/`, `electron/` ან `bin/` ში, უნდა შეიცავდეს ან განაახლოს ტესტები (Hard Rule #8) | დიახ      |
| `check:test-masking`   | შეცვლილი სატესტო ფაილები არ ამცირებს მტკიცების წმინდა რაოდენობას და არ ამატებს `assert.ok(true)` ტავტოლოგიას                        | დიახ      |
| `check:pr-evidence`    | PR ორგანო მოჰყავს test/VPS მტკიცებულებებს ცვლილებისთვის (მექანიზებს Hard Rule #18 PR პროზას — fragile-ის შესწავლით, იხილეთ Backlog) | დიახ      |

### სამსახური: `test-vitest`

ეშვება `build` შემდეგ. ბლოკები ერწყმის წარუმატებლობას.

| ლუქსი            | ამოწმებს                                                       | ბლოკირება                                                                                                                          |
| ---------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP სერვერი (110 ინსტრუმენტი), autoCombo, ქეში — vitest runner | დიახ                                                                                                                               |
| `test:vitest:ui` | UI კომპონენტი ამოწმებს — vitest runner-ს                       | **ბლოკირება** — წინასწარ არსებული წარუმატებლობები აშკარად გამორიცხულია `vitest.config.ts` ში; ახალი წარუმატებლობები არღვევს საქმეს |

### ღამის სამუშაო ნაკადები (დაგეგმილი, საკონსულტაციო)

ისინი მუშაობს cron გრაფიკით (და `workflow_dispatch`), არასდროს PRs ზე. ყველა საკონსულტაციოა.

| სამუშაო პროცესი        | ამოწმებს                                                                                                                                                                  | ბლოკირება         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `nightly-property`     | სწრაფად შეამოწმეთ ქონების ტესტები შემთხვევითი თესლის + მაღალი პერსპექტივით                                                                                                | **საკონსულტაციო** |
| `nightly-resilience`   | გროვის ზრდის კარიბჭე, ქაოსის ხარვეზი-ინექციური, k6 load/soak                                                                                                              | **საკონსულტაციო** |
| `nightly-llm-security` | promptfoo injection guard (ბლოკის რეჟიმი) + garak ზონდები (გამოტოვებული პროვაიდერის საიდუმლოების გარეშე)                                                                  | **საკონსულტაციო** |
| `nightly-schemathesis` | OpenAPI კონტრაქტის ფუზირება (სქემათეზა) ცოცხალი OmniRoute წინააღმდეგ `docs/openapi.yaml` — ზედაპირების სპეციფიკური დარღვევების გამოყენებით / გაუმართავი 500s (ფაზა 8 B.4) | **საკონსულტაციო** |
| `nightly-mutation`     | სტრაიკერის მუტაციის ტესტირების ქულა სწრაფი ერთეულის ზოლზე — გადარჩენილი მუტანტების ზედაპირზე სუსტი ამტკიცებს                                                              | **საკონსულტაციო** |
| `nightly-compat`       | კვანძის ძრავის თავსებადობის მატრიცა მხარდაჭერილ `engines.node` დიაპაზონში                                                                                                 | **საკონსულტაციო** |

შესრულების საბაზისო ხაზები (გროვა, TTFB, აშენების დრო) ჩაწერილია, არ არის დაბლოკილი: იხილეთ [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
