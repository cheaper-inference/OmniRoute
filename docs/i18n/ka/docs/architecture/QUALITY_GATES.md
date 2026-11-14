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

CI და Quality Gates სამუშაო ნაკადები გამოსცემს სტაბილურ ვერდიქტს: `Gate / CI` და `Gate / Quality`. მათი ვერსიით დაშვების პოლიტიკა ჩამოთვლის ყველა ზემოთ ნაკადის სამუშაოს, როგორც საჭირო ან საკონსულტაციო. საჭირო სამუშაო უნდა იყოს წარმატებული: გამოტოვებული, გაუქმებული, გამოტოვებული, მომლოდინე და უცნობი შედეგები ვერ დაადგენს PASS. მხოლოდ დოკუმენტებისთვის ან მხოლოდ კატალოგისთვის განკუთვნილი მოქმედი კლასიფიკაციით შეიძლება კოდის ზოლი გამოუსადეგარი გახდეს; პროექტი PR არ არის მიღებული კანდიდატი. `hotfix` იარლიყი არ უარყოფს მტკიცებულებებს.

ორივე სამუშაო ნაკადი მოიცავს PRs main/release ტოტებად, უბიძგებს `main`, ხელით გაგზავნას და გაერთიანების მოვლენებს. დააწკაპუნეთ, გაგზავნეთ და შერწყმა-ჯგუფური გაუშვით სრული შერჩევა. `release/**` ზე გადასვლები არ იწყებენ მათ (2026-10-18): ყოველმა ცვლილებამ უკვე გაუშვა მატრიცა მის PR ზე და გაერთიანებული კომბინაცია არის Release-Green-ის სამუშაო (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks და შერწყმის ჯგუფები იყენებენ მასპინძელ მორბენლებს სამუშაოებისთვის, რომლებიც სხვაგვარად ირჩევენ თვითმასპინძელ მორბენლებს; საკმარისი ჰოსტინგის მოცულობა უნდა დადასტურდეს გაშვებამდე.

ჩვეულებრივი PR მართავს სწრაფ შერჩევას. დაშვების პოლიტიკის `full-code` და `full-code-e2e` ზოლები (E2E, ინტეგრაცია, პაკეტის არტეფაქტი, Electron smoke, Bun SQLite, ეკოსისტემის და პროტოკოლის კლიენტები) მუშაობს მხოლოდ Mergify რიგის პროექტზე ან სრულ გაშვებაზე: `gh workflow run ci.yml --ref <branch>`.

თითოეული JSON ქვითარი განსაზღვრავს გამოტანილ SHA, სამუშაო პროცესის გაშვებას და მცდელობას. CLI უარყოფს checkout/event SHA შეუსაბამობას. სამუშაო პროცესის ტესტები აკავშირებს პოლიტიკის წევრობას ვერდიქტის სამუშაოს `needs` სიაში, ასე რომ ახალი ან ამოღებული ზოლი არ შეიძლება ჩუმად გაქრეს. ქვითრები მოიცავს საკუთარ სამუშაო პროცესს და არა პუბლიკაციას, განლაგებას ან არსებული საკონსულტაციო სკანერის ინტერიერს. ფილიალის წესებში ორივე გამშვები სახელის გააქტიურება ცალკე ადმინისტრაციული ცვლილებაა; ამ სამუშაოების დამატება თავისთავად არ იცავს ფილიალს.

### რიგის შერწყმა

`queue` ლეიბლი აგზავნის PR Mergify რიგში (`.mergify.yml`). Mergify ხსნის PR მონახაზს `mergify/merge-queue/` ფილიალზე, CI აწარმოებს სრულ შერჩევას იქ და ორიგინალური PR ერწყმის, როდესაც `Gate / CI`, `Gate / Quality` და `Merge integrity (changelog + generated skills)` გაივლის.

Mergify წერს თავის რიგის შეჯამებას მონახაზის აღწერაში და სხვა აპებსაც შეუძლიათ მისი რედაქტირება. `pull_request` `edited` მოვლენა ასეთ დრაფტზე იღებს თავის კონკურენტულ ჯგუფს (`-queue-edit-<run_id>`), ამიტომ მას არ შეუძლია გააუქმოს მონახაზის რეალური გაშვება და გამოტოვებს კარიბჭეს და მატრიცას. მხოლოდ `Merge integrity` მუშაობს ჯერ კიდევ. გამოტოვებული კარიბჭის სამუშაოს აქვს სხვა შემოწმების სახელი, რადგან Mergify კითხულობს გამოტოვებულ `Gate / CI`, როგორც წარუმატებელ შემოწმებას და წყვეტს PR.

დეკეუის შემდეგ, ბიძგი ყოველთვის არ ითხოვს PR ს. კომენტარი `@mergifyio queue` ამაზე.

### შენახული მტკიცებულება მიღების რედუქტორში

`scripts/quality/validate-release-acceptance.mjs` ამცირებს მიწოდებულ გეგმას და ავლენს მას; იგი არ ადგენს, რომ გეგმა მოიცავს სრულ გაშვების მილსადენს. მისი ანგარიშები ცალსახად ადგენს `releaseAcceptance: false`, მაშინაც კი, როდესაც ეს გეგმა არის `VERIFIED`. `release-acceptance.yml` სამუშაო ნაკადი კვლავ იყენებს ჩრდილოვან მოწყობილობებს და არა რეალურ კონსტრუქციას, პაკეტს, ჩატვირთვის ან სარეკლამო ქვითრებს.

CLI მოითხოვს `--evidence-root` შენახული მტკიცებულებების გადამოწმებისთვის. ფაილები წყდება როგორც `<evidence-root>/<artifact_id>/<member>` და ჰეშირებულია როგორც SHA-256. PASS ჩანაწერი მტკიცებულების გარეშე, დაკარგული ან შეცვლილი ფაილი, სახიფათო გზა ან სიმბლაკი ხელს უშლის გადამოწმებას. დაკარგული ფაილები არ არის ცარიელი წარმატებული ჟურნალის ექვივალენტი. არსებული SHA/run/attempt ჩეკები რჩება დამოუკიდებლად: ბაიტების შესატყვისი ვერ გადაარჩენს შემორჩენილ ქვითარს. ფაილის მთლიანობა არ არის შესრულების ავთენტურობის ან არტეფაქტის პოპულარიზაციის მტკიცებულება.

### სტატიკური სკანირების ინვენტარი

ვერსიული npm-alias ინვენტარი და სტატიკური სკანირების წევრობა ცოცხალია `config/quality/gate-manifest.json` ში. გაუშვით `npm run check:gate-manifest` სკრიპტის სახელებისა და ზუსტი ბრძანებების დასადასტურებლად `package.json` მიმართებაში; დამატებები, ამოღება და ბრძანების დრიფტი ვერ ახერხებს როგორც ლოკალურ ჰუკს, ასევე ცვლილება-კლასიფიკაციის სამუშაოებს CI ში. მეტსახელი არ არის სამუშაო პროცესის სამუშაო, მატრიცის მაგალითი ან საცდელი შემთხვევა: ეს რიცხვები არ უნდა იყოს წარმოდგენილი, როგორც ურთიერთშემცვლელი.

გამოიყენეთ `npm run quality:scan -- --list` ან `npm run quality:scan:fast -- --list` არჩეული მეტსახელების შესამოწმებლად მათი შესრულების გარეშე. მორბენალი იწვევს npm შესვლის წერტილს, ასე რომ, მისი გაშვების დრო (მათ შორის, Bun სადაც არის კონფიგურირებული) შენარჩუნებულია. მანიფესტი იწერს ფსევდონიმებს ამ პროფილების გარეთ, როგორც ცალკე გამოძახებული, და ტექნიკური ბრძანებები აკრძალულია მხოლოდ წასაკითხად სკანირებულ პროფილებში.

ეს პროფილები მოიცავს მხოლოდ სტატიკურ სკანირებას. ისინი არ ამოწმებენ პროდუქტის ტესტებს, დაფარვას, შეფუთვას, გარე შემოწმებას ან კანდიდატის სრულ გამოშვებას. სამუშაო პროცესის დაშვება იყენებს დაკავშირებულ `config/quality/admission-policy.json` და `scripts/quality/admission-verdict.mjs`. გამოშვება-დამკვირვებლის პროფილები რჩება ცალკე; დამოუკიდებლად შეამოწმოს მათი შესაბამისი ჩეკები და ქვითრები. დამკვირვებლის სრული სტატიკური ბრძანებები გამოცხადებულია `config/quality/release-green-static-profile.json` ში, მათ შორის `audit:deps`, მუტაციის ტესტის შერჩევა და თარგმანის შემოწმება. ჩამტვირთავი ამოწმებს npm ბრძანებებს package.json და მოდელირებული CI/Quality დეკლარაციების წინააღმდეგ; ის უარყოფს დრიფტს, ნაცვლად იმისა, რომ არგუმენტად განახორციელოს shell ტოკენები. სკანერის საჭირო SKIP/INCOMPLETE გამომავალი ვერ ადგენს PASS. პროფილი აღრიცხავს მის გარე გამონაკლისებს და არ ცვლის ჰოსტირებული გაშუქებას, ტესტის მატრიცებს, პაკეტს ან განლაგების მტკიცებულებებს. ქვემოთ მოცემული პროზაული ინვენტარი არის მითითება და არა მტკიცებულება იმისა, რომ კარიბჭე რეალურად გაიქცა.

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

`npm run check:forgotten-sibling-tests` მუშაობს, როგორც `Fast Quality Gates` ის საკონსულტაციო ნაბიჯი და ხელახლა იყენებს იმპორტის გადამწყვეტს ტესტის ზემოქმედების რუკის უკან. ყოველი შეცვლილი წარმოების მოდულისთვის, ის აცნობებს განმსაზღვრელ `changed module/symbol -> static consumer -> candidate sibling test` ჯაჭვებს, როდესაც კანდიდატის ტესტი არ არის pull-მოთხოვნის განსხვავებაში. Markdown-ის შეჯამება და JSON შედეგი შენარჩუნებულია, როგორც `forgotten-sibling-tests` სამუშაო პროცესის არტეფაქტი კალიბრაციისთვის ნებისმიერი დაბლოკვის გაშვებამდე.

ლულის რეექსპორტი და დინამიური იმპორტი მხოლოდ გარჩევადობის დიაგნოსტიკაა; ისინი არასოდეს ქმნიან ბლოკირების აღმოჩენას. განხილული გამონაკლისები ცხოვრობს `config/quality/forgotten-sibling-allowlist.json` ში. თითოეულ ჩანაწერში უნდა იყოს მითითებული მომხმარებლისა და კანდიდატის ტესტი, მიუთითოს კონკრეტული დასაბუთება და დააკავშიროს GitHub საკითხი ან pull მოთხოვნა. არასწორი ჩანაწერები ვერ დაიხურა. გამონაკლისები ვერ ახშობს წაშლილი კანდიდატის ტესტს ან განსხვავებას, რომელიც ამატებს `.skip`/`.todo`; მტკიცების შესუსტება და სხვა ნიღბები რჩება დამოუკიდებლად ჩამკეტი `check:test-masking` კარიბჭის საკუთრებაში.

### სამსახური: `lint`

მუშაობს ყველა PR ზე `main` ზე. ბლოკები ერწყმის წარუმატებლობას.

| სკრიპტი (`npm run ...`)           | ამოწმებს                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ბლოკირება                                     |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `check:node-runtime`              | Node.js ვერსია მხარდაჭერილ დიაპაზონშია                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | დიახ                                          |
| `check:cycles`                    | წრიული იმპორტი ყველა `src/` + `open-sse/` ში (AST-ზე დაფუძნებული, tsconfig `paths` მოგვარებულია). Bare გამოდის 1-დან, როდესაც რაიმე ციკლი არსებობს (ჩავარდნა-დახურულია #15281 დან) და ჩამოთვლის SCCs. `check:cycles:ratchet` (რა CI მუშაობს) ბლოკავს, როდესაც რაოდენობა აღემატება `metrics.cycles` ჭერს `quality-baseline.json` — ში ამჟამად 14, `direction: down`, ასე რომ, ის შეიძლება მხოლოდ დაეცეს (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | დიახ (რაკეტი)                                 |
| `check:boundary`                  | `open-sse → src` დაწყვილება: უნიკალური ფაილიდან ფაილში იმპორტი ძრავიდან აპში (`scripts/quality/measure-boundary.mjs`; ზღვრული სია არის v4 core/module-split გამოსწორების ბექლოგი). Bare = საკონსულტაციო ანგარიში (იგივე `quality:boundary`). `check:boundary:ratchet` (რაც CI გადის, ასევე `quality.yml` fast-gates ratchet loop-ში) ბლოკავს, როდესაც რაოდენობა აღემატება `metrics.boundaryOpenSseToSrc` ჭერს `quality-baseline.json` — ში დათესილი გაზომილი 771, `direction: down`; `--update` მხოლოდ ამცირებს მას; ბაზა-ნათესავი PRs ზე (`--base-ref`, იხილეთ ქვემოთ)                                                                                                                                                                                                                                                                                                                                                                                                                        | დიახ (რაკეტი)                                 |
| `check:route-validation:t06`      | Zod სქემები წარმოდგენილია ყველა მარშრუტზე (მე-6 დონის პოლიტიკა)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | დიახ                                          |
| `check:any-budget:t11`            | `@ts-expect-error // any` რაოდენობა არ აღემატება ბიუჯეტს (11 კატრაკა)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | დიახ                                          |
| `check:provider-consistency`      | `providers.ts` ს ყველა პროვაიდერს აქვს შესაბამისი ჩანაწერი `providerRegistry.ts` ში (და პირიქით, დაშვებულ სიაში)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | დიახ                                          |
| `check:model-lifecycle`           | სამი ხელით შენახული მარშრუტიზაციის ცხრილი შეესაბამება შემოწმებულ სასიცოცხლო ციკლის სნეპშოტს (#11503): `FITNESS_TABLE` (`taskFitness.ts`) არ აგროვებს პენსიაზე გასული id-ს, რომლის მარშრუტიც `REGISTRY` შეუძლია; ყველა `BUILT_IN_ALIASES` სამიზნე იმყოფება `REGISTRY` ში და არ არის გადამდგარი ID სნეპშოტში; ყველა გადამდგარი ID ჯერ კიდევ `REGISTRY` ში გადაგზავნილია ან ჩამოთვლილია `allowedRetiredInCatalog` ში; და არც ერთი `DEFAULT_DEGRADATION_MAP` წყარო ან სამიზნე არ ჩანს ამ კადრში. ეს არ ადასტურებს, რომ მოდელს ამჟამად ემსახურება პირდაპირი ზემო დინებაში. ოფლაინ — ადარებს `config/quality/model-lifecycle.json`, განახლებულია ხელით `npm run quality:refresh-model-lifecycle` ით (ქსელი; არ არის ჩართული CI ში). `allowedRetiredInCatalog` არის დამწვრობის ჩამკეტი: დაამატეთ ჩანაწერი მხოლოდ თვალთვალის საკითხთან დაკავშირებით.                                                                                                                                                   | დიახ                                          |
| `check:fetch-targets`             | კლიენტის მხარის `src/` ში ყველა `fetch("/api/...")` გადადის რეალურ `route.ts` ზე                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | დიახ                                          |
| `check:deps`                      | ყველა `npm install` -able deps ყველა `package.json` რეპოში არის `dependency-allowlist.json`; ახალი მოხსნილი ან slopsquatted პაკეტები დროშით                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | დიახ                                          |
| `audit:deps`                      | ხუთივე დამოუკიდებელი დაბლოკვის ფაილის npm აუდიტი (root, Electron, OpenCode დანამატები v1/v2 და პროვაიდერი). კრიტიკული რჩევების ბლოკი; მაღალი რჩევები რჩება თვალსაჩინო გაფრთხილებად. Missing/failed აუდიტი არის INCOMPLETE და ბლოკი; თითო მასშტაბის დაბლოკვის ჰეშები და ანგარიშები შენარჩუნებულია.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | დიახ                                          |
| `check:lockfile`                  | `package-lock.json` მთლიანობა — https რეესტრი, მთლიანობის ჰეშები, ჰოსტის უგულებელყოფა                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | დიახ                                          |
| `check:licenses`                  | SPDX ლიცენზიის დასაშვები სია წარმოების დამოკიდებულებისთვის                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | დიახ                                          |
| `check:tracked-artifacts`         | არ არის build artifacts / ჩადენილი `node_modules` symlinks (ასევე გადის husky pre-commit; წინასწარი დაჭერა არის განზრახ მსუბუქი — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | დიახ                                          |
| `check:ai-attribution`            | არ არის AI/bot `Co-Authored-By` თრეილერი ან AI-ის თაობის ქვედა კოლონტიტული PR commits-ში, სათაური ან ტექსტი — Hard Rule #16 ( `quality.yml` fast `commit-msg` gates loop-ში PR→ `release/**` — კითხულობს მოვლენის დატვირთვას, no-op off PRs — და PR-მხოლოდ ნაბიჯს `ci.yml` → `main` PR; თანაავტორები დაშვებულია #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:vitest-exclusions`         | ყველა Vitest გამორიცხვა ასახელებს თვალთვალის პრობლემას და გამოჩნდება `config/quality/vitest-exclusions.json` ში (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | დიახ                                          |
| `check:file-size`                 | წყაროს ფაილები (`.ts`/`.tsx` `src/` ში, `open-sse/`, `electron/`, `bin/`) რჩება `cap` ში და სატესტო ფაილები (`*.test.ts(x)`) `testCap` ში; `file-size-baseline.json` ში (`frozen` / `testFrozen`) გაყინული ფაილები არ უნდა გაიზარდოს მათ ჩაწერილ ზომაზე                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | დიახ                                          |
| `check:error-helper`              | შეცდომის პასუხები executors/handlers ში იყენებს `buildErrorBody()` / `sanitizeErrorMessage()` (მყარი წესი #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | დიახ                                          |
| `check:migration-numbering`       | მიგრაციის SQL ფაილები თანმიმდევრულად დანომრილია, არ არის ხარვეზები ან დუბლიკატები                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | დიახ                                          |
| `check:public-creds`              | არ არის პირდაპირი OAuth `client_id`/`client_secret` ან Firebase ვებ კლავიშები `publicCreds.ts` გარეთ (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | დიახ                                          |
| `check:db-rules`                  | არ არის უმი SQL `src/lib/db/` მოდულების გარეთ; არ არის ლულის იმპორტი `localDb.ts` დან (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | დიახ                                          |
| `check:known-symbols`             | პროვაიდერის შემსრულებლები, მარშრუტიზაციის სტრატეგიები და მათ დისპეტჩერიზაციის ცხრილებში დარეგისტრირებული მთარგმნელები ემთხვევა ფაილებს დისკზე — ობოლი ან გამოუცხადებელი სიმბოლოების გარეშე                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | დიახ                                          |
| `check:route-guard-membership`    | ყველა მარშრუტი, რომელიც იწვევს ბავშვის პროცესს, კლასიფიცირებულია `isLocalOnlyPath()` მიხედვით (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | დიახ                                          |
| `check:test-discovery`            | რეპოში არსებული ყველა `*.test.ts` / `*.spec.ts` ფაილი აგროვებს მინიმუმ ერთი საცდელი მორბენის მიერ (რათეტი: `test-discovery-baseline.json` ში ობოლი სია შეიძლება მხოლოდ შემცირდეს)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | დიახ                                          |
| `check:test-tla-order`            | `tests/unit` ქვეშ არცერთი `node:test` ფაილი არ არეგისტრირებს ტესტს, ხვდება ზედა დონის `await`, შემდეგ დაარეგისტრირებს მეტს (#18045; ratchet: `test-tla-order-allowlist.json` შეიძლება მხოლოდ შემცირდეს)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | დიახ                                          |
| `check:agent-skills-sync`         | აგენტის უნარების გენერირებული არტეფაქტები ემთხვევა მათ წყაროს კატალოგს (დრიფტის გარეშე)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:provider-asset-provenance` | პროვაიდერი logos/assets ატარებს ჩაწერილი წარმოშობის ჩანაწერს                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `lint:json`                       | JSON კონფიგურაციის ფაილები აანალიზებენ და აკმაყოფილებენ რეპო ლინტის წესებს                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `typecheck:core`                  | TypeScript შედგენა შეცდომების გარეშე (მხოლოდ საკონსულტაციო გაფრთხილებები)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | დიახ                                          |
| `typecheck:noimplicit:core`       | მკაცრი `noImplicitAny` — წინდახედული; ბევრ ადრე არსებულ ზარის საიტს ჯერ კიდევ სჭირდება ანოტაციები                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **საკონსულტაციო** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ავრცელებს `src/app/(dashboard)/**` (#7033) — `typecheck:core` ს კურირებული 27-ფაილის ნებადართული სია არ შეიცავს დაფა TSX და `next build` არასოდეს ამოწმებს მას (`next.config.mjs` ადგენს `ignoreBuildErrors: true`), ამიტომ ობოლი იდენტიფიკატორის რეგრესია იქ (#6625/#6909) უხილავი იყო CI სთვის. განსხვავებები გაყინული per-file/per-TS-code დათვლის საბაზისო ხაზთან (`config/quality/dashboard-typecheck-baseline.json`, იგივე stale-enforcement pattern, როგორც `check:known-symbols`) — მხოლოდ NEW შეცდომები საბაზისო დათვლის მიღმა ვერ ხვდება კარიბჭეს; დააწიეთ `--update` ით, როცა უკვე არსებული შეცდომა დაფიქსირდა.                                                                                                                                                                                                                                                                                                                                                               | დიახ                                          |
| `check:build-typecheck`           | მთლიანი აპლიკაციის წარმოების ტიპის შემოწმება `tsconfig.build.json` ზე (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), ზედაპირის `typecheck:core` ის 27-ფაილის დაშვების სია და დაფის კარი არ ფარავს. განსხვავებები `config/quality/build-typecheck-baseline.json` სთან; ახალი ან გაზრდილი თითო (ფაილი, კოდი) რაოდენობა ვერ მოხერხდება, ქვედა რაოდენობა მოგთხოვთ, რომ დააფიქსიროთ. `--update` უარს ამბობს, სანამ გაშვება შეიცავს ახალ ან ამაღლებულ წყვილს, თუ `--force-regressions` არ არის გადაცემული, და უარს ამბობს ახლად გაჩუმებულ ფაილზე, თუ `--force-nocheck` არ არის გადაცემული, ამიტომ საბაზისო ხაზის გაფართოება მწვანედ და მუდმივი დუმილის მინიჭება არის ორი განცალკევებული მიზანმიმართული აქტი. შიშველი `--force` უარყოფილია. ასევე ასკანირებს build სკოპს `@ts-nocheck` სთვის `config/quality/ts-nocheck-baseline.json` სთან მიმართებაში, რადგან ფაილი, რომელიც მას იყენებს, საერთოდ არ აცნობებს დიაგნოზს და სხვაგვარად უხილავი იქნებოდა ყველა კარიბჭისთვის. | დიახ                                          |

#### ტიპის შემოწმების ორი პროგრამა განსხვავებულად პასუხობს

`typecheck:core` და `check:build-typecheck` აგროვებენ სხვადასხვა პროგრამებს სხვადასხვა ვარიანტში და ერთი და იგივე ფაილი შეიძლება იყოს სუფთა ერთში და სავსე იყოს შეცდომებით მეორეში.

`tsconfig.build.json` აყენებს `"strict": false`, ამიტომ `noImplicitAny` გამორთულია. ძირითადი კონფიგურაცია აგროვებს კურირებულ 27-ფაილის დაშვებულ სიას უფრო მკაცრი ვარიანტებით და მიჰყვება თითოეული ჩანაწერის იმპორტის გრაფიკს, ასე რომ ფაილები, რომლებიც არასოდეს გამოჩნდება build პროგრამაში, კვლავ იქ მოწმდება.

შედეგი მნიშვნელოვანია, როდესაც ვიმსჯელებთ, არის თუ არა ფაილის აკრეფილი:** ნულოვანი დიაგნოსტიკა `check:build-typecheck` ქვეშ არ ნიშნავს ნულს** . `@ts-nocheck` 26 ფაილიდან ამოღებამ აჩვენა, რომ 23 მათგანი სუფთაა build პროგრამაში; მათგან თექვსმეტმა გამოავლინა დაახლოებით 120 იმპლიციტური შეცდომა მკაცრში. გადაამოწმეთ ორივე სანამ ფაილის გაწმენდას გამოიძახებთ.

### სამსახური: `quality-gate`

გარბის `test-coverage` შემდეგ. ბლოკები ერწყმის წარუმატებლობას.

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
| `check:vuln-ratchet`     | დამოკიდებულების დაუცველობა (osv-სკანერი) არ რეგრესია — `--ratchet` იშლება როგორც INCOMPLETE (გასვლა 2) თუ არ არის გაზომილი                                                                                   | **საკონსულტაციო**                              |
| `check:workflows`        | Workflow lint (actionlint + zizmor); missing/broken სკანერები, არასწორი შეტყობინებები ან გამოტოვებული საბაზისო ხაზები არ არის INCOMPLETE. სწორი დასკვნები მიჰყვება შერჩეულ strict/advisory/ratchet პოლიტიკას | საჭიროა შესრულება; zizmor ratchet ბლოკირება CI |
| `check:openapi-breaking` | საჯარო API კონტრაქტი დამაგრებული ღონისძიების ჩადენების წინააღმდეგ (PR შერწყმა-ბაზა, წინ წაწევა, შერწყმა-ჯგუფის ბაზა; scheduled/manual გადახდა პირველი მშობელი); საჭირო გაზომვა ვერ დაიხურა                   | **ბლოკირება --ratchet ით**                     |

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

თორმეტი README SVGs `docs/diagrams/` ქვეშ არის გენერირებული (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` აღადგენს ყველა მათგანს). თითოეულ მათგანს აქვს ბაიტი-შედარების ერთეულის ტესტი (`tests/unit/docs/readme-*-svg.test.ts`, სამუშაო `test-unit`), რომელიც ვერ ხერხდება, როდესაც ჩადენილი ფაილი მოძველებულია და `check:docs-counts` კითხულობს კანონიკურ რიცხვებს მათი `<text>` კვანძებიდან — რის გამოც კონტურის საფეხური ინახავს ფაილში ყველა გამოკვეთილ სტრიქონს, როგორც უხილავ `<text>`. SVG კანონიკური რიცხვების შემოწმება კითხულობს `SVG_DIAGRAM_FILES` ში (`scripts/check/check-docs-counts-sync.mjs`) ჩამოთვლილ ფაილებს: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, პლუს `public/images/tier-flow-dark.svg` და `tier-flow-light.svg`; უფასო სამუდამოდ, კატალოგში შესვლის, განმეორებადი აუზის და ქულების ფაქტორების პრეტენზიები ასევე წაიკითხავს `promise-pillars.svg`, `free-tier-budget.svg` და `strategies-grid.svg`. `free-tier-budget.svg` ამახვილებს თავის ფიგურებს ცოცხალი კატალოგის ჩამტვირთველიდან, ასე რომ ცვლილება `FREE_MODEL_BUDGETS` ზე ან პროვაიდერის საჩვენებელ სახელზე წითელია CI სანამ ეს ფაილი რეგენერაცია არ მოხდება.

### სამსახური: `i18n-ui-coverage`

| სკრიპტი                           | ამოწმებს                                                                                                                                                                                                     | ბლოკირება         |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| `check-ui-keys-coverage` (inline) | UI i18n გასაღების დაფარვა არის ≥ 65%                                                                                                                                                                         | დიახ              |
| `check-ui-value-drift` (inline)   | გადაწერილი ინგლისური** ღირებულება** არ ტოვებს ძველ თარგმანს                                                                                                                                                  | დიახ              |
| `check-new-key-coverage` (inline) | ა** ახალი** ინგლისური გასაღები ითარგმნება ყველა ლოკალში — და `__MISSING__:` მარკერი უარყოფილია                                                                                                               | დიახ              |
| `check-translation-ratio`         | რეალური თარგმანის თანაფარდობა ლოკალზე (იდენტური-ინგლისური / ჩანაცვლების ადგილი / გამოტოვებული ფოთლები ნებადართული სიის გარეთ) არ უნდა აღემატებოდეს `config/quality/i18n-translation-baseline.json` + slack-ს | **საკონსულტაციო** |

სჭირდება `fetch-depth: 0` — ღირებულების დრიფტის კარიბჭე განსხვავდება `en.json` შერწყმის ფუძისგან.

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

გამოდის 0-დან `SKIP reason=base-unresolved` ით, როდესაც საბაზისო კატალოგის წაკითხვა შეუძლებელია (არაღრმა კლონი საბაზისო ref-ის გარეშე), ასახულია `check-openapi-breaking`.

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

გარბის `build` შემდეგ. ბლოკები ერწყმის წარუმატებლობას.

| ლუქსი            | ამოწმებს                                                       | ბლოკირება                                                                                                                               |
| ---------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP სერვერი (110 ინსტრუმენტი), autoCombo, ქეში — vitest runner | დიახ                                                                                                                                    |
| `test:vitest:ui` | UI კომპონენტი ამოწმებს — vitest runner-ს                       | **ბლოკირება** — წინასწარ არსებული წარუმატებლობები აშკარად გამორიცხულია `vitest.config.ts` ში; ახალი წარუმატებლობები ვერ ახერხებს საქმეს |

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

## ნებადართული სიის პოლიტიკა

ყველა კარიბჭე, რომელიც არ შეიძლება წარუმატებელი იყოს ადრე არსებულ დარღვევებზე, იყენებს გაყინულ დაშვებულ სიას (მაგ., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). პოლიტიკა არის:

**გამოასწორეთ ძირეული მიზეზი; გამოიყენეთ ნებადართული სია მხოლოდ მაშინ, როდესაც დარღვევა უკვე არსებობს და არ შეიძლება დაფიქსირდეს იმავე PR ში.**

დაშვებულ სიაში ჩანაწერის დამატებისას:

1. შეიტანეთ კომენტარი დასაბუთებით.
2. მიუთითეთ თვალთვალის საკითხი (მაგ., `// #3498 — Phase 2 feature, not yet implemented`).
3. წაშალეთ ჩანაწერი იმავე PR ში, რომელიც აფიქსირებს დარღვევას — შემორჩენილი ჩანაწერი, რომელიც აღარ თრგუნავს აქტიურ დარღვევას, თავისთავად დეფექტია (6A.3 შემორჩენილი აღსრულება გაუქმდება კარიბჭეზე ობოლი უფლებათა სიაში ჩანაწერის განხორციელების შემდეგ).

გააკეთე** არა** დაამატეთ ნებადართული ჩანაწერები, რათა ტესტები უფრო სწრაფად გაიაროს. მწვანე კარიბჭე მზარდი დაშვებული სიით არის ხარისხის ცრუ გრძნობა.

### როცა ჭიშკარი ჩავარდება შენს PR

1. **ყურადღებით წაიკითხეთ კარიბჭის გამოსავალი** — ის ზუსტად გეტყვით რომელმა ფაილმა ან სიმბოლომ დაარღვია წესი.
2. **გაასწორეთ დარღვევა** — კარიბჭეების უმეტესობა არის განმსაზღვრელი ფაილური სისტემის შემოწმება, რომელიც გადის როგორც კი კოდი სწორია.
3. **თუ დარღვევა უკვე არსებობს** (ანუ თქვენ არ გააცანი, მაგრამ კარიბჭე ახლა ფარავს მას): დაამატეთ ნებადართული ჩანაწერი დასაბუთებული კომენტარით და თვალთვალის საკითხით.
4. **თუ კარიბჭე არის რაჭეტი** (გაშუქება, ESLint გაფრთხილებები, დუბლირება, სირთულე): თქვენმა ცვლილებამ გააუარესა მეტრიკა. მოაგვარეთ ძირითადი პრობლემა, ან (იშვიათად) გაუშვით `npm run quality:ratchet -- --update` თუ ცვლილება განზრახ არის და მეტრიკული დეგრადაცია მისაღებია — მაგრამ დააფიქსირეთ რატომ PR აღწერაში.
5. **საკონსულტაციო კარიბჭეები** (`continue-on-error: true`) არის ინფორმაციული —, ისინი არ ბლოკავს შერწყმას, მაგრამ გამოჩნდება CI შეჯამებაში. გაასწორეთ ისინი მაინც.

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

## რაციონალიზაციის ბექლოგი (ROI მიმოხილვა — Fase 9 Onda 3)

ეს ინვენტარი შეჯერდა `ci.yml` სთან 2026-06-17 (წინა ვერსია გამოტოვებული იყო `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence`). შეჯერებული ნაკრების ROI მიმოხილვამ გამოავლინა შემდეგი რაციონალიზაციის კანდიდატები.** შერწყმა არის მექანიკური CI ცვლილებები; flips/drops არის პოლიტიკის გადაწყვეტილებები, რომლებიც დაცულია ოპერატორისთვის.** ქვემოთ ჯერ არაფერია გამოყენებული.

**ასევე ზემოთ დაუსაბუთებელი** (საკონსულტაციო, დაბალი სიგნალი): `docs-lint` სამუშაო (markdownlint + Vale, მთელი სამუშაო `continue-on-error`) და დამოუკიდებელი სკანერის სამუშაო ნაკადები `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` არის `quality-baseline.json` ში, მაგრამ არ არის მიბმული ბლოკირებულ ჩოგზე `ci.yml` — ში, მეტრიკა ამჟამად ობოლია.

### შერწყმა / გაუქმება (მექანიკური, დაბალი რისკი)

თითოეული კანდიდატი დამოწმებული იყო ცოცხალი კარიბჭის შტატის წინააღმდეგ 2026-06-17 (ნდობა-მაგრამ-შემოწმება); რამდენიმე „აშკარა“ შერწყმა ვალის დასამალად აღმოჩნდა და არის** არა** სუფთა წვეთები.

- **`check:docs-sync` ორჯერ გადის** — დამოუკიდებლად `lint` სამუშაოში და ისევ `check:docs-all` ში (`docs-sync-strict`) და ჰასკის წინასწარ ჩადენის კაუჭში. ✅**DONE** — დამოუკიდებელი `lint` მოწოდება ამოღებულია.
- **CVE სკანირება** — ❌**NOT სუფთა შერწყმა.** `audit:deps` ბლოკავს კრიტიკულ რჩევებს და არასრულ აუდიტს ხუთივე ჩაკეტილ ფაილში, ხოლო მაღალი რჩევების მოხსენებას, როგორც გაფრთხილებას, მიმდინარე პოლიტიკის შესაბამისად; `check:vuln-ratchet` (osv) ვერ ხერხდება მხოლოდ _რეგრესიაზე და შემოწმებულ საბაზისო ხაზთან შედარებით და საჭიროების შემთხვევაში უარყოფს გამოტოვებულ გაზომვებს. განსხვავებული სემანტიკა — ჩამოშვებით `audit:deps` დაკარგავს აბსოლუტურ კრიტიკულ კარიბჭეს და დამოუკიდებელი პაკეტის აუდიტის ქვითრებს. შეინახეთ ორივე.
- **ციკლის გამოვლენა** — ✅**DONE** (#15159 G-01/G-02). ძველი ტექსტი აქ უწოდებდა `check:cycles` „მწვანე, კურირებულ“ კარიბჭეს და ამართლებდა მის დაბლოკვას, რადგან `check:circular-deps` (dpdm) იტყობინება 91 ციკლი. რომ მწვანე იყო ა** ცრუ მწვანე** : `check:cycles` დაასკანირა 5 ქვედირექტორია (450 ფაილი), დაემთხვა მხოლოდ სტატიკური `import|export … from`, და ჩამოაგდო ყველა `@/` და `@omniroute/open-sse/` სპეციფიკატორი, ასე რომ ვერ ხედავდა დინამიური იმპორტის + ალიას ციკლებს, რომლებიც დომინირებდნენ რეპოში. დაფიქსირდა: კარიბჭე ახლა გადის `src` + `open-sse` (5023 ფაილი), აგროვებს სპეციფიკატორებს TypeScript AST დან (ასე რომ `import("…")` ითვლის და ტიპის პოზიცია `typeof import("…")` არა) და წყვეტს tsconfig `paths`. პოულობს** 14** ციკლები და არა 0. რადგანაც 14 წინასწარ არსებული ციკლი არ შეიძლება დაფიქსირდეს კარიბჭეში PR, `check:cycles` ახლა არის** ratchet** (`--ratchet`, ჭერი `metrics.cycles.value = 14` `quality-baseline.json` ში, `direction: down`) — ის ბლოკავს ნებისმიერ _რეგრესიას და რაოდენობა შეიძლება მხოლოდ დაეცეს. CI გადის `npm run check:cycles:ratchet`. დამწვარი ატრაქციონებით**A-01** . `check:circular-deps` (dpdm) რჩება საკონსულტაციოდ, როგორც უფრო ფართო მეორე მოსაზრება.
- **სირთულის** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): ერთი ESLint გასეირნება, ითვლის ruleId ით, ამიტომ ციკლომატური + max-ხაზები და კოგნიტური საბაზისო ხაზები დამოუკიდებლად რჩება; ინდივიდუალური `check:complexity` / `check:cognitive-complexity` რჩება ადგილობრივი `--update` სთვის.
- **`/api` ჰალუცინაციის საწინააღმდეგო** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` ერთი FS ინვენტარი, openapi-routes + docs-symbols კვლავ იუწყება დამოუკიდებლად; პირები რჩებიან ადგილობრივ გაშვებებზე.
- **`check:node-runtime` მუშაობს 11 ვაკანსიაზე** — ⚠️** დაბალი ROI.** თითოეული ცალკე მორბენალია და ჩეკი არის < 1s; ჯამური დანაზოგი ~ 10s, იაფი თითო სამუშაო მცველის დაკარგვის წინააღმდეგ. არ ღირს დათრგუნვა.
- **`typecheck:noimplicit:core` on CI lint** — ✅** ამოღებულია ლილვის სამუშაოდან** (იყო საკონსულტაციო `continue-on-error`); ბლოკირების ტიპის ზედაპირი არის `typecheck:core` + `check:type-coverage`. შენახულია ადგილობრივი დამწერლობა.

### გადაატრიალეთ / გადაწყვიტეთ (ოპერატორის პოლიტიკა)

- `check:openapi-security-tiers` (მრჩეველი) — ❌**NOT სუფთად ამობურცული.** ის გამოდის 0-დან, მაგრამ აფრთხილებს, რომ `LOCAL_ONLY_API_PREFIXES` ქვეშ რამდენიმე `traffic-inspector` მარშრუტს აკლია `x-loopback-only: true` ანოტაცია. მისი აღსრულება მოითხოვს ჯერ `openapi.yaml` ში ამ ანოტაციების დამატებას.
- `typecheck:noimplicit:core` (საკონსულტაციო) — დიდწილად ექვემდებარება ბლოკირებას `check:type-coverage` ratchet-ს. გადააბრუნეთ ღერძზე ან ჩამოაგდეთ ზედმეტი მეორე `tsc` საშვი.
- `test:vitest:ui` (ახლა** ბლოკირება** ) — წინასწარ არსებული წარუმატებლობები აშკარად გამორიცხულია `vitest.config.ts` ში `// #8618` თვალთვალის კომენტარებით; ახალი წარუმატებლობები ვერ ახერხებს საქმეს.
- `check:secrets` (gitleaks, ბლოკირება ratchet გაყინული 3 დოკუმენტირებული ცრუ დადებითი) — დაშვებული სიაში 3 მიაღწიოს 0, ან დაქვეითება საკონსულტაციო. გადაფარავს GitHub მშობლიურ საიდუმლო სკანირებას + `check:public-creds`.
- `check:pr-evidence` (ბლოკირება, greps PR-სხეულის პროზა) — მაღალი ცრუ-დადებითი რისკი; ასუსტებს Hard Rule #18 ის აღსრულებას, თუ გაუქმებულია, ასე რომ, ეს არის ნამდვილი პოლიტიკის მოწოდება.
- `semgrep` (საკონსულტაციო დამოუკიდებელი) — გადაფარავს CodeQL OWASP ოჯახებისთვის; მიამაგრეთ მისი საბაზისო ხაზი ღეროზე ან წვეთამდე.

---

## დაკავშირებული დოკუმენტაცია

- მიწოდების ჯაჭვი (წარმოშობა, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — ღილაკების დაყენების პარიტეტული კარიბჭე

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, სამუშაო `i18n-ui-coverage`). ადარებს ყველა `src/i18n/messages/<locale>.json` ის ფურცლის კლავიშების კომპლექტს `en.json` ს და ვერ ხერხდება რომელიმე არარსებულ ან დამატებით ფურცელზე, მიუხედავად იმისა, როდის დაემატა გასაღები. `__MISSING__:` ჩანაცვლების დამფუძნებლები ითვლება როგორც ამჟამინდელი (მათი შინაარსი თანაფარდობის კარიბჭის საქმეა). ეს არის ორი diff-based/percentage კარიბჭის აბსოლუტური შევსება: `check-ui-keys-coverage` ახორციელებს 80% სართულს თითო ლოკალზე (43 არარსებობის ~ 13000 კლავიშიდან კვლავ იკითხება 99.7%) და `check-new-key-coverage` განიხილავს მხოლოდ იმ კლავიშებს, რომლებიც PR ამატებს `en.json` ს. ლოკალური პარტია წარმოიქმნება `en.json` დან მისი ტოტის მოჭრის დღის და ითარგმნება დღეების განმავლობაში, ხოლო ბაზა განაგრძობს გასაღებების დამატებას; Batch PR არ ამატებს გასაღებს, ასე რომ, ორივე ძმა ჩუმად დარჩა, როდესაც პარტია 1 (#13044) დაეშვა 43 კლავიშს ცხრა ლოკალში, ხოლო ჯგუფი 2 (#13660) 10 კლავიშს მოკლე რვაში (2026-09-15). შეასწორეთ წითელი `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` ით; `extra` ფოთოლი ნიშნავს, რომ წყარომ ის დააგდო — წაშალე იგი ლოკალიდან. `--warn` იუწყება უშეცდომოდ. `--catalog=cli` აწარმოებს იგივე შედარებას `bin/cli/locales` ზე (`npm run i18n:check-keys:cli`); ორივე ნაბიჯი ცხოვრობს სამუშაო `i18n-ui-coverage` ში.

#### `check-new-key-coverage` — ახალი გასაღებით i18n კარიბჭე

`check-ui-value-drift` ძმა. ეს ერთი იჭერს ინგლისურ მნიშვნელობას, რომელიც იყო** გადაწერილი** ხოლო მისი თარგმანები დარჩა; ეს იჭერს ინგლისურ გასაღებს, რომელიც იყო** დაემატა** ხოლო ზოგიერთმა ადგილობრივმა ის არასოდეს მიიღო.

`check-ui-keys-coverage` ვერ ხედავს ამ კლასს: ის აძლიერებს პროცენტულ სართულს თითო ლოკალზე და თერთმეტი არარსებობის გასაღები ~ 13,000-დან ტოვებს დაფარვას 99,9%. პროცენტი თითოეულ ენაზე ვერ გამოხატავს "ეს ფუნქცია გადაუთარგმნელად არის გაგზავნილი" — მთელი ფუნქცია შეიძლება დაეშვას ახალ ლოკალს ტექსტის გარეშე და არასოდეს გადაიტანოს ნომერი.

ინციდენტი მასში დაშიფრულია: საორკესტრო ტილოს მე-3 ფაზამ თარგმნა მისი თერთმეტი გასაღები იმ 42 ლოკალზე, რომელიც იმ დროს არსებობდა. რამდენიმე საათის შემდეგ ევროკავშირის ენაზე (#13044) აიღო რეპო 51 ლოკალამდე, ხოლო ცხრა ახალმოსულმა (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) არასოდეს მიუღია ისინი. `deepMergeFallback` ანაცვლებს ინგლისურს არარსებული კლავიშით, ამიტომ წარუმატებლობის რეჟიმი იყო თარგმნილი UI და არა ცარიელი UI — რეალური და ჩუმად კონსტრუქციით.

როგორც მისი ძმა არის** განსხვავებულად შეგნებული** , ინგლისური ენის შერწყმის ბაზაზე სამუშაო ხესთან შედარება, ასე რომ, მანამდე არსებული ხარვეზები რჩება გაყინული და კარიბჭეს არ სჭირდებოდა მიგრაცია ჩასართავად.

**`__MISSING__:<english>` მარკერი არ აკმაყოფილებს მას (2026-09-17 წლიდან).** ეს იყო დოკუმენტირებული გადადება — გაშვების დრო ბრუნდება ინგლისური — შესწორებამდე, სანამ რვა ფუნქცია PRs 2026-09-16-ზე დაამატა 61 კლავიში და მარკერი თარგმნის ნაცვლად 65-ვე ლოკალში შეიტანა: ამ კარიბჭემ მიიღო ყველა, არაფერი დაბლოკა PRs და დაბლოკვა რეალური-თარგმანისთვის ვერ მოხერხდა %2 წვერი. > 2,5 % + 0,5). მარკერი ახლა განიხილება, როგორც არმყოფი თარგმანი. დააფიქსირეთ წითელი `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` ით, ან ყველა ლოკალი `npm run i18n:translate-new-keys` პარალელურად (`scripts/i18n/translate-new-keys.sh`, detached-safe, უარს ამბობს დაწყებაზე `OMNIROUTE_TRANSLATION_*` env-ის გარეშე). გასაღები, რომელიც უნდა დარჩეს ინგლისურად (დამაგრებული product/engine/flag სახელი) ეკუთვნის `scripts/i18n/untranslatable-keys.json` და არასოდეს არის მარკერის მიღმა. `vi` პირდაპირ კრძალავს მარკერებს (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — გაჩერებული-სატესტო კარიბჭე

ფაილი `vitest.config.ts` ს `exclude` სიაში არის ტესტი, რომელიც არ მუშაობს და ის გაშუქებას ჰგავს, ვინც კითხულობს ხეს. `// #8618 — pre-existing failure; remove this exclusion when fixed` კომენტარის მიღმა დაგროვდა 62 ფაილი. Issue #8618 დაიხურა 2026-08-11, ხოლო სია, რომელიც მას ადევნებდა თვალყურს, გაიზარდა 45 ჩანაწერიდან 62-მდე, ყოველი ახალი მემკვიდრეობით იღებდა კომენტარს, რომელიც მიუთითებს მკვდარ საკითხზე. როდესაც სია საბოლოოდ გაიზომა ფაილი ფაილი (#13204),** 62-დან 51 გავიდა მიმდინარე ხესთან, წყაროს ცვლილების გარეშე** .

კარიბჭე მოითხოვს ყველა გამორიცხვას, რომელიც გადაწყვეტს რეალურ ფაილს, რათა (ა) დაასახელოს თვალთვალის საკითხი და (ბ) გამოჩნდეს `config/quality/vitest-exclusions.json` ში მისი გაზომილი სტატუსით, ასე რომ, ერთის დამატება არის განხილვადი განსხვავება გამოყოფილ ფაილში და არა კიდევ ერთი ხაზი 60-ჩართულიანი მასივში. იგი განზრახ არ აწარმოებს გამორიცხულ ტესტებს —, რომელიც ღირს ~ 10 წუთი და მიეკუთვნება პერიოდულ სამუშაოს; ინვენტარის ჩანაწერები, როდესაც თითოეული იყო ბოლოს გაზომილი.
