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

## გეითების ინვენტარი და შესრულების პროფილები

### კანდიდატის დაშვება

CI-ისა და Quality Gates-ის სამუშაო პროცესები თითოეული გამოსცემს სტაბილურ ვერდიქტს: `Gate / CI` და
`Gate / Quality`. მათი ვერსიონირებული დაშვების პოლიტიკა ყველა ზედა დონის დავალებას
სავალდებულოდ ან სარეკომენდაციოდ განსაზღვრავს. შესაბამისი სავალდებულო დავალება წარმატებით
უნდა დასრულდეს: არარსებული, გაუქმებული, გამოტოვებული, მოლოდინის რეჟიმში მყოფი და უცნობი
შედეგები PASS-ის დადასტურებას ვერ უზრუნველყოფს. მხოლოდ დოკუმენტაციის ან მხოლოდ კატალოგის
ვალიდურმა კლასიფიკაციამ შესაძლოა კოდის ნაკადი შეუსაბამოდ აქციოს;
შავი PR მიღებულ კანდიდატად არ ითვლება. `hotfix` ჭდე მტკიცებულების საჭიროებას არ აუქმებს.

ორივე სამუშაო პროცესი მოიცავს PR-ებს main/release განშტოებებში, `main`-ზე push-ებს, ხელით გაშვებას
და merge-group მოვლენებს. Push, dispatch და merge-group სრულ არჩევანს უშვებს. Push-ები
`release/**`-ზე მათ არ უშვებს (2026-10-18): თითოეულმა ცვლილებამ მატრიცა უკვე გაიარა საკუთარ PR-ზე,
ხოლო გაერთიანებული კომბინაცია Release-Green-ის დავალებაა (`docs/ops/RUNNER_BOX.md` → Hosted lane). ფორკები
და merge group-ები ჰოსტირებულ რანერებს იყენებს იმ დავალებებისთვის, რომლებიც სხვა შემთხვევაში თვითჰოსტირებულ
რანერებს აირჩევდა; გაშვებამდე უნდა დადასტურდეს ჰოსტირებული რესურსების საკმარისი მოცულობა.

თითოეული JSON ქვითარი განსაზღვრავს checkout-ით მიღებულ SHA-ს, სამუშაო პროცესის გაშვებასა და მცდელობას.
CLI უარყოფს checkout-ისა და მოვლენის SHA-ების შეუსაბამობას. სამუშაო პროცესის ტესტები პოლიტიკის წევრობას
ვერდიქტის დავალების `needs` სიასთან აკავშირებს, რათა ახალი ან წაშლილი ნაკადი შეუმჩნევლად ვერ გაქრეს.
ქვითრები მოიცავს საკუთარ სამუშაო პროცესს და არა გამოქვეყნებას, განთავსებას ან არსებული
სარეკომენდაციო სკანერის შიდა მუშაობას. განშტოების წესებში ორივე შემოწმების სახელის გააქტიურება
ცალკე ადმინისტრაციული ცვლილებაა; ამ დავალებების დამატება თავისთავად განშტოებას არ იცავს.

### სტატიკური სკანირების ინვენტარი

ვერსიონირებული npm-ფსევდონიმების ინვენტარი და სტატიკური სკანირების წევრობა ინახება
`config/quality/gate-manifest.json`-ში. გაუშვით `npm run check:gate-manifest`, რათა
სკრიპტების სახელები და ზუსტი ბრძანებები `package.json`-თან მიმართებით შეამოწმოთ; დამატებები, წაშლები და
ბრძანებების ცვლილებები იწვევს როგორც ლოკალური hook-ის, ისე CI-ში ცვლილების კლასიფიკაციის დავალებების
წარუმატებლობას. ფსევდონიმი არ არის სამუშაო პროცესის დავალება, მატრიცის ეგზემპლარი ან ტესტ-ქეისი: ეს რაოდენობები
ურთიერთჩანაცვლებადად არ უნდა იყოს წარმოდგენილი.

გამოიყენეთ `npm run quality:scan -- --list` ან `npm run quality:scan:fast -- --list`,
რათა არჩეული ფსევდონიმები მათი შესრულების გარეშე შეამოწმოთ. რანერი npm-ის
entrypoint-ს იძახებს, ამიტომ მისი შესრულების გარემო (მათ შორის Bun, სადაც კონფიგურირებულია) შენარჩუნებულია.
მანიფესტი ამ პროფილებს მიღმა არსებულ ფსევდონიმებს ცალკე გამოძახებულად აღრიცხავს, ხოლო
ტექნიკური მომსახურების ბრძანებები მხოლოდ წაკითხვის სკანირების პროფილებში აკრძალულია.

ეს პროფილები მხოლოდ სტატიკურ სკანირებას მოიცავს. ისინი არ ადასტურებს პროდუქტის ტესტებს,
დაფარვას, შეფუთვას, გარე შემოწმებებს ან კანდიდატის გამოშვებისთვის სრულად მისაღებობას.
სამუშაო პროცესის დაშვება იყენებს დაკავშირებულ `config/quality/admission-policy.json`-სა და
`scripts/quality/admission-verdict.mjs`-ს. Release-observer-ის პროფილები ცალკე რჩება;
მათი შესაბამისი შემოწმებები და ქვითრები დამოუკიდებლად შეამოწმეთ. ქვემოთ მოცემული ტექსტური
ინვენტარი საცნობაროა და არა იმის მტკიცებულება, რომ გეითი რეალურად გაეშვა.

სკრიპტები განთავსებულია `scripts/check/`-ში (პოლიტიკის გეითები) და `scripts/quality/`-ში (ratchet-ის ძრავა).
CI-ის ჭეშმარიტების წყაროა `.github/workflows/ci.yml`.

### Release PR-ის სწრაფი გზა (`quality.yml`)

`.github/workflows/quality.yml` ავსებს CI-ს main/release PR-ებზე, `main`-ზე push-ებზე,
dispatch-სა და merge group-ებზე. PR-ები გზების მიხედვით გაფილტრულ სწრაფ შემოწმებებს იყენებს. მუდმივად
გამორთული დუბლირებული build წაიშალა; რეალური build/package/boot შემოწმებები CI-ში რჩება.

| დავალება                                         | მოქმედების არეალი                                                                                                                                                                                                                         | ბლოკირებადი            |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `Docs Gates (fast-path)`                         | დოკუმენტაციის/კოდის PR-ები; API დოკუმენტაციის ბმულები და docs-all                                                                                                                                                                         | დიახ                   |
| `Fast Quality Gates`                             | კოდის PR-ები; სტატიკური შემოწმებები, typecheck, dashboard-ის typecheck, ცვლილებით დაზ affected unit-ტესტები                                                                                                                               | დიახ                   |
| `Forgotten sibling tests`                        | კოდის PR-ები; შეცვლილი მოდულების კვალის მიყოლა სტატიკურ მომხმარებლებამდე და შესაძლო მონათესავე ტესტებამდე; barrel-ისა და dynamic-import-ის გზები აისახება სარეკომენდაციო დიაგნოსტიკის სახით, allowlist-ში მითითებულ გამონაკლისებთან ერთად | **სარეკომენდაციო**     |
| `Vitest (fast-path)`                             | კოდის PR-ები; სწრაფი vitest კომპლექტი                                                                                                                                                                                                     | დიახ                   |
| `Unit Tests fast-path`                           | კოდის PR-ები; 4-შარდიანი unit-ტესტების კომპლექტი                                                                                                                                                                                          | დიახ                   |
| `No new ESLint warnings`                         | კოდის PR-ები; suppression-ების გათვალისწინების მქონე lint-ის დამცავი შემოწმება                                                                                                                                                            | დიახ, ფორკების ჩათვლით |
| `Merge integrity (changelog + generated skills)` | არაშავი PR-ები; changelog-ისა და გენერირებული skills-ის სინქრონიზაცია                                                                                                                                                                     | დიახ, ფორკების ჩათვლით |

#### დავიწყებული მონათესავე ტესტების ანგარიში

`npm run check:forgotten-sibling-tests` ხელახლა იყენებს იმპორტების გადამწყვეტ მექანიზმს, რომელიც ტესტების გავლენის რუკის საფუძველს წარმოადგენს.
ყოველი შეცვლილი საწარმოო მოდულისთვის ის წარმოქმნის დეტერმინისტულ
`changed module/symbol -> static consumer -> candidate sibling test` ჯაჭვებს, როდესაც კანდიდატი
ტესტი pull request-ის diff-ში არ არის. Markdown-ის შეჯამება და JSON-ის შედეგი ინახება
`forgotten-sibling-tests` workflow-ის არტეფაქტის სახით, რათა ნებისმიერი დამბლოკავი დანერგვის წინ კალიბრაცია მოხდეს.

Barrel-იდან ხელახალი ექსპორტები და დინამიკური იმპორტები მხოლოდ გარჩევადობის დიაგნოსტიკაა; ისინი არასოდეს
ქმნიან დამბლოკავ აღმოჩენას. განხილული გამონაკლისები ინახება
`config/quality/forgotten-sibling-allowlist.json`-ში. თითოეულ ჩანაწერში მითითებული უნდა იყოს მომხმარებელი და კანდიდატი
ტესტი, მოცემული უნდა იყოს კონკრეტული დასაბუთება და GitHub-ის issue-ზე ან pull request-ზე ბმული. არასწორად
შედგენილი ჩანაწერები შემოწმების ჩავარდნას იწვევს. გამონაკლისები ვერ უგულებელყოფს წაშლილ კანდიდატ ტესტს ან diff-ს, რომელიც ამატებს `.skip`-ს/`.todo`-ს;
assertion-ების შესუსტება და სხვა სახის შენიღბვა კვლავ დამოუკიდებლად დამბლოკავი
`check:test-masking` შემოწმების პასუხისმგებლობაში რჩება.

### დავალება: `lint`

ეშვება `main`-ზე მიმართულ ყოველ PR-ზე. წარუმატებლობის შემთხვევაში merge-ს ბლოკავს.

| სკრიპტი (`npm run ...`)           | ამოწმებს                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ბლოკირებადი                                    |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `check:node-runtime`              | Node.js-ის ვერსია მხარდაჭერილ დიაპაზონშია                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | დიახ                                           |
| `check:cycles`                    | ციკლური იმპორტები მთლიანად `src/`-სა და `open-sse/`-ში (AST-ზე დაფუძნებული, tsconfig-ის `paths` გათვალისწინებულია). დამოუკიდებლად გაშვებისას აბრუნებს გასვლის კოდს 1, როცა არსებობს რომელიმე ციკლი (fail-closed მიდგომა #15281-დან), და ჩამოთვლის SCC-ებს. `check:cycles:ratchet` (რომელსაც CI უშვებს) ბლოკავს, როდესაც რაოდენობა აჭარბებს `quality-baseline.json`-ში განსაზღვრულ `metrics.cycles` ზედა ზღვარს — ამჟამად 14, `direction: down`, ამიტომ ის მხოლოდ შეიძლება შემცირდეს (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | დიახ (ratchet)                                 |
| `check:boundary`                  | `open-sse → src` კავშირი: უნიკალური ფაილიდან-ფაილში იმპორტები ძრავიდან აპლიკაციაში (`scripts/quality/measure-boundary.mjs`; კავშირების სია არის v4-ის ბირთვის/მოდულებად დაყოფის გამოსწორებათა სარეზერვო სია). დამოუკიდებლად გაშვება = საინფორმაციო ანგარიში (იგივე, რაც `quality:boundary`). `check:boundary:ratchet` (რომელსაც CI უშვებს და რომელიც ასევე შედის `quality.yml`-ის სწრაფი შემოწმებების ratchet-ციკლში) ბლოკავს, როდესაც რაოდენობა აჭარბებს `quality-baseline.json`-ში განსაზღვრულ `metrics.boundaryOpenSseToSrc` ზედა ზღვარს — საწყის მნიშვნელობად დაყენებულია გაზომილი 771, `direction: down`; `--update` მას მხოლოდ ამცირებს; PR-ებში საბაზისო ვერსიასთან შედარებით მუშაობს (`--base-ref`, იხილეთ ქვემოთ)                                                                                                                                                                                                                                                                            | დიახ (ratchet)                                 |
| `check:route-validation:t06`      | Zod-ის სქემების არსებობა ყველა მარშრუტზე (Tier 6-ის პოლიტიკა)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | დიახ                                           |
| `check:any-budget:t11`            | `@ts-expect-error // any`-ის რაოდენობა ბიუჯეტს არ აღემატება (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | დიახ                                           |
| `check:provider-consistency`      | `providers.ts`-ში მოცემულ თითოეულ პროვაიდერს `providerRegistry.ts`-ში შესაბამისი ჩანაწერი აქვს (და პირიქით, დაშვებული სიის ფარგლებში)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | დიახ                                           |
| `check:model-lifecycle`           | ხელით შენარჩუნებული მარშრუტიზაციის სამი ცხრილი შესაბამისობაში რჩება რეპოზიტორიაში შენახულ სასიცოცხლო ციკლის სნეპშოტთან (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ქულას არ ანიჭებს არცერთ გაუქმებულ id-ს, რომლის მარშრუტიზაციაც `REGISTRY`-ს შეუძლია; `BUILT_IN_ALIASES`-ის თითოეული სამიზნე წარმოდგენილია `REGISTRY`-ში და არ არის გაუქმებული id-ების სნეპშოტში; `REGISTRY`-ში ჯერ კიდევ არსებული თითოეული გაუქმებული id გადამისამართებულია ან ჩამოთვლილია `allowedRetiredInCatalog`-ში; და `DEFAULT_DEGRADATION_MAP`-ის არცერთი წყარო ან სამიზნე ამ სნეპშოტში გაუქმებულად არ არის მონიშნული. ეს არ ადასტურებს, რომ მოდელს ამჟამად აქტიური ზედა დონის სერვისი ემსახურება. ოფლაინ — შედარება ხდება `config/quality/model-lifecycle.json`-თან, რომელიც ხელით ახლდება `npm run quality:refresh-model-lifecycle`-ის მეშვეობით (საჭიროებს ქსელს; CI-ში ინტეგრირებული არ არის). `allowedRetiredInCatalog` ეტაპობრივი შემცირების მექანიზმია: ჩანაწერი დაამატეთ მხოლოდ თვალის მიდევნების issue-სთან ერთად. | დიახ                                           |
| `check:fetch-targets`             | კლიენტის მხარის `src/`-ში არსებული თითოეული `fetch("/api/...")` რეალურ `route.ts`-ზე მიუთითებს                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | დიახ                                           |
| `check:deps`                      | რეპოზიტორიაში არსებული თითოეული `package.json`-ის ყველა დამოკიდებულება, რომლის დაყენებაც `npm install`-ით შეიძლება, შეტანილია `dependency-allowlist.json`-ში; ახალი ვერსიაზე დაუფიქსირებელი ან slopsquatting-ის ნიშნების მქონე პაკეტები მონიშნულია                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | დიახ                                           |
| `audit:deps`                      | `npm audit` (ძირეული პროექტი + electron) — მაღალი/კრიტიკული დონის გაფრთხილებების გარეშე (ნაწილობრივ ემთხვევა osv `check:vuln-ratchet`-ს; იხილეთ რაციონალიზაციის ბექლოგი)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | დიახ                                           |
| `check:lockfile`                  | `package-lock.json`-ის მთლიანობა — https რეესტრი, მთლიანობის ჰეშები, ჰოსტის გადაფარვების გარეშე                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | დიახ                                           |
| `check:licenses`                  | საწარმოო დამოკიდებულებებისთვის დაშვებული SPDX ლიცენზიების სია                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | დიახ                                           |
| `check:tracked-artifacts`         | build-არტეფაქტებისა და commit-ში დამატებული `node_modules` სიმბოლური ბმულების გარეშე (ასევე სრულდება husky pre-commit-ში; pre-push განზრახ მსუბუქია — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | დიახ                                           |
| `check:ai-attribution`            | PR-ის commit-ებში, სათაურში ან აღწერაში AI/bot `Co-Authored-By` დაბოლოების ან AI-გენერაციის footer-ის გარეშე — მკაცრი წესი #16 (`quality.yml`-ის fast-gates ციკლში PR→`release/**`-ისთვის — კითხულობს მოვლენის payload-ს, ხოლო PR-ის გარეთ არაფერს აკეთებს — და `ci.yml`-ის lint-ში მხოლოდ PR-ისთვის განკუთვნილ ნაბიჯში PR→`main`-ისთვის; ასევე husky `commit-msg` hook-ში; ადამიან თანაავტორები დაშვებულია; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:vitest-exclusions`         | Vitest-ის თითოეული გამონაკლისი მიუთითებს თვალთვალის issue-ს და შეტანილია `config/quality/vitest-exclusions.json`-ში (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | დიახ                                           |
| `check:file-size`                 | წყაროს ფაილები (`.ts`/`.tsx` საქაღალდეებში `src/`, `open-sse/`, `electron/`, `bin/`) რჩება `cap`-ის, ხოლო სატესტო ფაილები (`*.test.ts(x)`) — `testCap`-ის ფარგლებში; `file-size-baseline.json`-ში გაყინული ფაილები (`frozen` / `testFrozen`) არ უნდა გაიზარდოს მათთვის დაფიქსირებულ ზომაზე მეტად                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | დიახ                                           |
| `check:error-helper`              | შემსრულებლებში/დამმუშავებლებში შეცდომის პასუხები იყენებს `buildErrorBody()` / `sanitizeErrorMessage()`-ს (მკაცრი წესი #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | დიახ                                           |
| `check:migration-numbering`       | მიგრაციის SQL ფაილები დანომრილია თანმიმდევრულად, გამოტოვებებისა და დუბლიკატების გარეშე                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | დიახ                                           |
| `check:public-creds`              | `publicCreds.ts`-ის გარეთ არ არის OAuth-ის ლიტერალური `client_id`/`client_secret` ან Firebase Web-ის გასაღებები (მკაცრი წესი #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | დიახ                                           |
| `check:db-rules`                  | `src/lib/db/` მოდულების გარეთ არ არის დაუმუშავებელი SQL; `localDb.ts`-დან არ გამოიყენება ერთიანი იმპორტები (მკაცრი წესები #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | დიახ                                           |
| `check:known-symbols`             | პროვაიდერის შემსრულებლები, მარშრუტიზაციის სტრატეგიები და მთარგმნელები, რომლებიც რეგისტრირებულია შესაბამის დისპეტჩერიზაციის ცხრილებში, ემთხვევა დისკზე არსებულ ფაილებს — ობოლი ან გამოუცხადებელი სიმბოლოების გარეშე                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | დიახ                                           |
| `check:route-guard-membership`    | ყოველი მარშრუტი, რომელიც შვილობილ პროცესს ქმნის, კლასიფიცირებულია `isLocalOnlyPath()`-ის მიერ (მკაცრი წესები #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | დიახ                                           |
| `check:test-discovery`            | რეპოზიტორიაში არსებული ყოველი `*.test.ts` / `*.spec.ts` ფაილი შეგროვებულია სულ მცირე ერთი ტესტის გამშვების მიერ (რაჩეტი: `test-discovery-baseline.json`-ში არსებული მიტოვებული ფაილების სია შეიძლება მხოლოდ შემცირდეს)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | დიახ                                           |
| `check:test-tla-order`            | `tests/unit`-ში არსებული არცერთი `node:test` ფაილი არ არეგისტრირებს ტესტს, არ აღწევს ზედა დონის `await`-ს და შემდეგ არ არეგისტრირებს დამატებით ტესტებს (#18045; რაჩეტი: `test-tla-order-allowlist.json` შეიძლება მხოლოდ შემცირდეს)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | დიახ                                           |
| `check:agent-skills-sync`         | გენერირებული agent-skills არტეფაქტები შეესაბამება მათ წყაროს კატალოგს (გადახრა არ არის)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:provider-asset-provenance` | პროვაიდერის ლოგოებსა და რესურსებს აქვთ ჩაწერილი წარმოშობის ჩანაწერი                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `lint:json`                       | JSON კონფიგურაციის ფაილები სწორად მუშავდება და აკმაყოფილებს რეპოზიტორიის ლინტინგის წესებს                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `typecheck:core`                  | TypeScript-ის კომპილაცია შეცდომების გარეშე (მხოლოდ სარეკომენდაციო გაფრთხილებები)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | დიახ                                           |
| `typecheck:noimplicit:core`       | მკაცრი `noImplicitAny` — მომავალზე ორიენტირებული; ბევრ მანამდე არსებულ გამოძახების ადგილს კვლავ სჭირდება ანოტაციები                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **სარეკომენდაციო** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, შემოსაზღვრული `src/app/(dashboard)/**`-ით (#7033) — `typecheck:core`-ის საგანგებოდ შერჩეული 27-ფაილიანი დაშვებული სია არ შეიცავს დაფის არცერთ TSX ფაილს, ხოლო `next build` მას არც არასდროს ამოწმებს ტიპებზე (`next.config.mjs`-ში დაყენებულია `ignoreBuildErrors: true`), ამიტომ იქ არსებული მიტოვებული იდენტიფიკატორების რეგრესიები (#6625/#6909) CI-სთვის უხილავი იყო. განსხვავებები მოწმდება თითოეული ფაილისა და TS კოდის შეცდომათა რაოდენობის გაყინულ საბაზისო მნიშვნელობასთან (`config/quality/dashboard-typecheck-baseline.json`, მოძველებულობის კონტროლის იგივე სქემა, რაც `check:known-symbols`-შია) — ბარიერს ვერ გაივლის მხოლოდ ის ახალი შეცდომები, რომელთა რაოდენობაც საბაზისო მნიშვნელობას აღემატება; როდესაც მანამდე არსებული შეცდომა გასწორდება, საბაზისო მნიშვნელობა შეამცირეთ `--update`-ით.                                                                                                                                                                                  | დიახ                                           |

### დავალება: `quality-gate`

ეშვება `test-coverage`-ის შემდეგ. წარუმატებლობის შემთხვევაში შერწყმას ბლოკავს.

| სკრიპტი                      | რას ამოწმებს                                                                                                                                                                                       | ბლოკირება                 |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | ქმნის `quality-metrics.json`-ს (ESLint-ის გაფრთხილებების რაოდენობა, დაფარვა გაერთიანებული შარდების ანგარიშიდან)                                                                                    | დიახ (რეჩეტის წინა ეტაპი) |
| `quality:ratchet`            | `quality-baseline.json`-ში მოცემული არცერთი მეტრიკა არ გაუარესებულა (ESLint-ის გაფრთხილებები ≤ საბაზისო მნიშვნელობა; დაფარვა ≥ საბაზისო მნიშვნელობა)                                               | დიახ                      |
| `check:duplication`          | კოდის დუბლირება (jscpd@4) არ აღემატება `quality-baseline.json`-ში მოცემულ საბაზისო მნიშვნელობას                                                                                                    | დიახ                      |
| `check:complexity`           | ფაილის დონის ციკლომატური სირთულე არ აღემატება ზღვარს (ძირითადი ESLint-ის `complexity` + `max-lines-per-function`)                                                                                  | დიახ                      |
| `check:cognitive-complexity` | კოგნიტიური სირთულის რეჩეტი (`eslint-plugin-sonarjs`) — ESLint-ის ცალკე გაშვება; CI ორივეს ერთად, ერთიან `check:complexity-ratchets` ეტაპად უშვებს                                                  | დიახ                      |
| `check:dead-code`            | გამოუყენებელი ექსპორტების / ფაილების რეჩეტი (knip) საბაზისო მნიშვნელობასთან შედარებით არ გაუარესებულა                                                                                              | დიახ                      |
| `check:compression-budget`   | შეკუმშვის საორიენტაციო ტესტის ბიუჯეტი — თითოეული ძრავისთვის ტოკენების ეკონომიის მინიმალური ზღვარი არ უნდა გაუარესდეს                                                                               | დიახ                      |
| `check:type-coverage`        | ტიპიზებული კოდის პროცენტული მაჩვენებლის რეჩეტი (`type-coverage`) არ გაუარესებულა; ძირითადად მოიცავს `typecheck:noimplicit:core`-ის ფუნქციონალს                                                     | დიახ                      |
| `check:codeql-ratchet`       | ღია CodeQL გაფრთხილებების რაოდენობა არ გაუარესებულა (კითხულობს `gh api`-ს მეშვეობით; ტოკენის გარეშე კორექტულად გამოტოვებს) — განახლების სიხშირე და ხელით გაშვება: იხილეთ „CodeQL-ის რეჩეტი“ ქვემოთ | დიახ                      |

### დავალება: `quality-extended`

მთელი დავალება სარეკომენდაციო ხასიათისაა (`continue-on-error: true`). npm-ზე დაფუძნებული რეჩეტები
რეალურად ეშვება; გარე სკანერები ინსტალირდება `gh release download`-ის მეშვეობით და თავად
ტოვებს შემოწმებას (გამოსვლის კოდი 0), როდესაც ბინარული ფაილი კვლავ არ არის ხელმისაწვდომი.

| სკრიპტი                  | რას ამოწმებს                                                                                                                                                                                                                                                                      | ბლოკირება                                              |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `check:circular-deps`    | ციკლური დამოკიდებულებები არ არის (dpdm)                                                                                                                                                                                                                                           | **სარეკომენდაციო**                                     |
| `check:bundle-size`      | ბანდლის ზომა ზღვარს არ აღემატება                                                                                                                                                                                                                                                  | **სარეკომენდაციო**                                     |
| `check:secrets`          | საიდუმლო მონაცემების სკანირება (gitleaks) — გამოტოვებს, თუ ბინარული ფაილი არ არსებობს                                                                                                                                                                                             | **სარეკომენდაციო**                                     |
| `check:vuln-ratchet`     | დამოკიდებულებების მოწყვლადობები (osv-scanner) არ გაუარესებულა — გამოტოვებს, თუ ბინარული ფაილი არ არსებობს                                                                                                                                                                         | **სარეკომენდაციო**                                     |
| `check:workflows`        | სამუშაო პროცესების ლინტინგი (actionlint + zizmor); არარსებული/გაფუჭებული სკანერები, არასწორი ანგარიშები ან რეჩეტის არარსებული საბაზისო მნიშვნელობა იწვევს INCOMPLETE სტატუსით ჩავარდნას. ნაპოვნი პრობლემები მუშავდება არჩეული მკაცრი/სარეკომენდაციო/რეჩეტის პოლიტიკის შესაბამისად | შესრულება სავალდებულოა; zizmor-ის რეჩეტი CI-ში ბლოკავს |
| `check:openapi-breaking` | საჯარო API კონტრაქტში (`openapi.yaml`) საბაზისო შტოსთან შედარებით შეუთავსებელი ცვლილებები (oasdiff) — გამოაქვს `openapiBreaking=N`; გამოტოვებს, თუ oasdiff არ არსებობს ან საბაზისო სპეციფიკაციის დამუშავება შეუძლებელია                                                           | **სარეკომენდაციო**                                     |

### დავალება: `docs-sync-strict`

ეშვება `main`-ში მიმართული ყოველი PR-ისთვის. წარუმატებლობის შემთხვევაში შერწყმას ბლოკავს.

| სკრიპტი                        | რას ამოწმებს                                                                                                                                                                                              | ბლოკირებადი                          |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `check:docs-all`               | მეტა-შემოწმება, რომელიც ქვემოთ მოცემულ 6 ქვე-შემოწმებას თანმიმდევრულად ასრულებს                                                                                                                           | დიახ                                 |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt ვერსიების შესაბამისობა                                                                                                                                                      | დიახ                                 |
| ↳ `check:docs-counts`          | პროზაში მითითებული რაოდენობები (პროვაიდერების რაოდენობა, მიგრაციების რაოდენობა და ა.შ.) რეალური რაოდენობების ratchet-დიაპაზონშია                                                                          | დიახ                                 |
| ↳ `check:env-doc-sync`         | `.env.example`-ში არსებული გარემოს თითოეული ცვლადი დოკუმენტაციის ცხრილშია აღწერილი და პირიქით                                                                                                             | დიახ                                 |
| ↳ `check:deprecated-versions`  | დოკუმენტაციაში მოძველებული ვერსიის სტრიქონები არ არის                                                                                                                                                     | დიახ                                 |
| ↳ `check:doc-links`            | დოკუმენტაციაში არსებული შიდა markdown-ბმულები რეალურ ფაილებზე მიუთითებს (`[text]`/`(path)` ფორმა)                                                                                                         | დიახ                                 |
| ↳ `check:fabricated-docs`      | დოკუმენტაციაში მოხსენიებული მარშრუტები, გარემოს ცვლადები, CLI ბრძანებები, ჰუკების სახელები და ფაილის ბილიკები კოდურ ბაზაში არსებობს. მკაცრი შემოწმება `--strict`-ით; დროშის გარეშე — რბილი წარუმატებლობა. | დიახ (`--strict`-ის მეშვეობით CI-ში) |
| `check:cli-i18n`               | CLI ბრძანებების სტრიქონები ყველა i18n ლოკალის ფაილშია წარმოდგენილი                                                                                                                                        | დიახ                                 |
| `check:openapi-coverage`       | OpenAPI სპეციფიკაცია რეალური მარშრუტების სულ მცირე ratchet-ით განსაზღვრულ ქვედა ზღვარს ფარავს                                                                                                             | დიახ                                 |
| `check:openapi-security-tiers` | `openapi.yaml`-ში უსაფრთხოების დონის ანოტაციები შეესაბამება `routeGuard.ts`-ის კლასიფიკაციებს                                                                                                             | **სარეკომენდაციო**                   |
| `check:openapi-routes`         | `openapi.yaml`-ში მოცემული თითოეული ბილიკი რეალურ `route.ts`-ს შეესაბამება (ჰალუცინაციის საწინააღმდეგო შემოწმება)                                                                                         | დიახ                                 |
| `check:docs-symbols`           | `docs/**/*.md`-ში არსებული თითოეული `/api/...` მითითება რეალურ `route.ts`-ს შეესაბამება (ჰალუცინაციის საწინააღმდეგო შემოწმება)                                                                            | დიახ                                 |
| `i18n translation drift`       | i18n ლოკალის ფაილებში უთარგმნელი გასაღებები — მხოლოდ გაფრთხილება                                                                                                                                          | **სარეკომენდაციო**                   |

### დავალება: `i18n-ui-coverage`

| სკრიპტი                           | რას ამოწმებს                                                                                                                                                                                                                       | ბლოკირებადი        |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `check-ui-keys-coverage` (inline) | UI-ის i18n გასაღებების დაფარვა ≥ 65%-ია                                                                                                                                                                                            | დიახ               |
| `check-ui-value-drift` (inline)   | ხელახლა დაწერილი ინგლისური **მნიშვნელობის** შემდეგ მოძველებული თარგმანი არ რჩება                                                                                                                                                   | დიახ               |
| `check-new-key-coverage` (inline) | **ახალი** ინგლისური გასაღები ყველა ლოკალზე თარგმნილია — `__MISSING__:` მარკერი უარყოფილია                                                                                                                                          | დიახ               |
| `check-translation-ratio`         | თითოეული ლოკალის რეალური თარგმანის კოეფიციენტი (ინგლისურის იდენტური / placeholder / allowlist-ის მიღმა გამოტოვებული ფოთლოვანი ჩანაწერები) არ უნდა აღემატებოდეს `config/quality/i18n-translation-baseline.json` + დასაშვებ გადახრას | **სარეკომენდაციო** |

საჭიროებს `fetch-depth: 0`-ს — მნიშვნელობის აცდენის შემოწმება `en.json`-ს merge base-თან ადარებს.

#### `check-ui-value-drift` — მოძველებული თარგმანის შემოწმება

ავლენს i18n-ის იმ ერთადერთ რეგრესიას, რომლის დანახვაც სხვა შემოწმებებს სტრუქტურულად
არ შეუძლიათ: ინგლისური მნიშვნელობა ხელახლა იწერება, ხოლო _წინა_ ინგლისური ტექსტიდან
მიღებული თარგმანები უცვლელი რჩება, რის გამოც არაინგლისურენოვანი მომხმარებლები
დამაჯერებლად ჩამოყალიბებულ, მაგრამ უკვე მცდარ ტექსტს კითხულობენ.

ეს რეალურად მოხვდა გამოშვებულ ვერსიაში. `oauthModal.googleOAuthWarning` ხელახლა დაიწერა,
როდესაც Antigravity-ის შესვლის დამხმარე დაემატა (#5203); **43 ლოკალიდან 39-ში** დარჩა
ტექსტი, რომელიც ოპერატორებს ეუბნებოდა, „დააკოპირეთ სრული URL და ჩასვით ქვემოთ“ — ნაკადი,
რომლის დასრულებაც ამ პროვაიდერისთვის შეუძლებელია. პრობლემა #8463-მდე შეუმჩნეველი დარჩა,
რადგან:

- `sync-ui-keys` მხოლოდ **არარსებულ** გასაღებებს ავსებს და არასდროს — **მოძველებულებს**;
- `check-ui-keys-coverage` გასაღების _არსებობას_ ითვლის, ამიტომ მოძველებული თარგმანიც დაფარულად ითვლება;
- `check-translation-drift` აკვირდება `docs/i18n/<locale>/**.md` დოკუმენტაციის სარკეებს —
  ის არასდროს კითხულობს `src/i18n/messages/*.json`-ს. 2026-09 ხელახალი სინქრონიზაციის შემდეგ
  `docs-sync-strict` დავალებაში ბლოკირებადია: შეცვალეთ ძირითადი დოკუმენტი → `npm run i18n:run -- --files=<doc>` (სექციის დონეზე, მცირე დანახარჯით).

**ითვალისწინებს diff-ს და არ ეყრდნობა baseline-ს.** ის merge base-ში არსებულ `en.json`-ს სამუშაო ხეს ადარებს; თითოეული გასაღებისთვის, რომლის ინგლისური მნიშვნელობაც შეიცვალა, ნებისმიერი ლოკალი, რომელშიც თარგმანი უცვლელი დარჩა, მოძველებულად ითვლება. ეს განზრახ **აფიქსირებს მანამდე არსებულ დავალიანებას** — diff ვერ განსაზღვრავს, ძველი ინგლისური ტექსტის რომელი ვერსიიდან მომდინარეობს დიდი ხნის წინ გაკეთებული თარგმანი, ამიტომ შემოწმება აფასებს მხოლოდ იმას, რასაც მიმდინარე ცვლილება ეხება. ალტერნატივა (თითოეული გასაღებისთვის hash baseline) მოითხოვდა დაახლოებით 600 KB-იან გენერირებულ ფაილს, რაც უდიდეს არსებულ baseline-ზე 3-ჯერ დიდია და ყოველი i18n PR-ის დროს შეიცვლებოდა.

მის დასაკმაყოფილებლად ორი გზა არსებობს:

1. განაახლეთ შესაბამისი თარგმანები, ან
2. დააყენეთ მათი მნიშვნელობა `__MISSING__:<new english>`-ზე — ამის შემდეგ runtime გასცემს შესწორებულ ინგლისურ ტექსტს
   (`src/i18n/request.ts::deepMergeFallback`, #7258), ხოლო გასაღები თარგმნის რიგში მოხვდება.

თუ სტრიქონის **მნიშვნელობა** შეიცვალა, უმჯობესია **გასაღებს სახელი შეუცვალოთ**: ახალი გასაღები მოძველებულ თარგმანს ვერ დაიმკვიდრებს. სწორედ ეს ნიმუში გამოიყენა #8463-მა.

```bash
npm run i18n:check-value-drift          # მკაცრი რეჟიმი (რასაც CI უშვებს)
npm run i18n:check-value-drift:warn     # მხოლოდ ანგარიშის შექმნა
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

ასრულებს მუშაობას 0 კოდით და `SKIP reason=base-unresolved` შეტყობინებით, როდესაც საბაზო კატალოგის წაკითხვა შეუძლებელია (shallow clone საბაზო ref-ის გარეშე), `check-openapi-breaking`-ის ანალოგიურად.

### დავალება: `i18n`

i18n-ის ვალიდაციის სრული მატრიცა (თითო დავალება თითო ლოკალზე). მთელი დავალება სარეკომენდაციო ხასიათისაა.

| სკრიპტი                         | რას ამოწმებს                            | ბლოკავს                                                            |
| ------------------------------- | --------------------------------------- | ------------------------------------------------------------------ |
| `validate_translation.py quick` | თარგმანის სისრულეს თითოეული ლოკალისთვის | **სარეკომენდაციო** (`continue-on-error: true` მთელი დავალებისთვის) |

### დავალება: `pr-test-policy`

ეშვება მხოლოდ pull request-ებზე.

| სკრიპტი                | რას ამოწმებს                                                                                                                                      | ბლოკავს |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:pr-test-policy` | PR-ები, რომლებიც ცვლიან production კოდს `src/`, `open-sse/`, `electron/` ან `bin/`-ში, უნდა შეიცავდეს ახალ ან განახლებულ ტესტებს (მკაცრი წესი #8) | დიახ    |
| `check:test-masking`   | შეცვლილი სატესტო ფაილები არ ამცირებს assert-ების ჯამურ რაოდენობას და არ ამატებს `assert.ok(true)` ტავტოლოგიებს                                    | დიახ    |
| `check:pr-evidence`    | PR-ის აღწერა ცვლილებისთვის ტესტის/VPS-ის მტკიცებულებას უთითებს (მკაცრი წესის #18 ავტომატიზაცია PR-ის ტექსტში ძიებით — მყიფეა, იხილეთ Backlog)     | დიახ    |

### დავალება: `test-vitest`

ეშვება `build`-ის შემდეგ. წარუმატებლობის შემთხვევაში merge-ს ბლოკავს.

| ნაკრები          | რას ამოწმებს                                                    | ბლოკავს                                                                                                                                   |
| ---------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP სერვერი (110 ინსტრუმენტი), autoCombo, cache — vitest runner | დიახ                                                                                                                                      |
| `test:vitest:ui` | UI კომპონენტების ტესტები — vitest runner                        | **ბლოკავს** — მანამდე არსებული წარუმატებელი ტესტები პირდაპირ გამორიცხულია `vitest.config.ts`-ში; ახალი წარუმატებლობები დავალებას ჩააგდებს |

### ღამის workflow-ები (დაგეგმილი, სარეკომენდაციო)

ისინი cron განრიგით (და `workflow_dispatch`-ით) ეშვება და არასოდეს ეშვება PR-ებზე. ყველა მათგანი სარეკომენდაციო ხასიათისაა.

| Workflow               | რას ამოწმებს                                                                                                                                                                  | ბლოკავს            |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `nightly-property`     | fast-check property ტესტები შემთხვევითი seed-ითა და გაშვებების დიდი რაოდენობით                                                                                                | **სარეკომენდაციო** |
| `nightly-resilience`   | heap-ის ზრდის შემოწმება, ხარვეზების ქაოსური ინიექცია, k6 დატვირთვის/ხანგრძლივი დატვირთვის ტესტები                                                                             | **სარეკომენდაციო** |
| `nightly-llm-security` | promptfoo-ს ინიექციისგან დაცვა (ბლოკირების რეჟიმი) + garak-ის probes (გამოტოვებულია პროვაიდერის საიდუმლო გასაღების გარეშე)                                                    | **სარეკომენდაციო** |
| `nightly-schemathesis` | OpenAPI კონტრაქტის fuzzing (schemathesis) მოქმედ OmniRoute-ზე `docs/openapi.yaml`-ის გამოყენებით — ავლენს სპეციფიკაციის დარღვევებს / დაუმუშავებელ 500 შეცდომებს (ეტაპი 8 B.4) | **სარეკომენდაციო** |
| `nightly-mutation`     | Stryker-ის mutation-testing ქულა სწრაფ unit ნაკრებზე — გადარჩენილი მუტანტები სუსტ assert-ებს ავლენს                                                                           | **სარეკომენდაციო** |
| `nightly-compat`       | Node engine-ის თავსებადობის მატრიცა მხარდაჭერილი `engines.node` დიაპაზონებისთვის                                                                                              | **სარეკომენდაციო** |

წარმადობის baseline-ები (heap, TTFB, build-ის დრო) იწერება, მაგრამ მათი მიხედვით ბლოკირება არ ხდება: იხილეთ [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
