# Quality Gates Reference (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Tài liệu này là tài liệu tham chiếu chính thức cho tất cả các cổng chất lượng CI trong OmniRoute.
Tài liệu mô tả từng cổng, nội dung được xác thực, công việc CI nơi cổng đó chạy, việc cổng có sử dụng
đường cơ sở ratchet hay chính sách đạt/không đạt, cũng như việc cổng chặn bản dựng hay chỉ mang tính tư vấn.

Để xem bản tóm tắt ngắn và chính sách danh sách cho phép, hãy xem phần "Quality Gates & Ratchets"
trong `AGENTS.md`. Để xem đánh giá chuyên sâu, phân loại mức độ trưởng thành và kế hoạch
tái triển khai không phụ thuộc công cụ của cùng hệ thống này, hãy xem
[Hướng dẫn về Cổng Chất lượng](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Danh mục gate và các cấu hình thực thi

### Tiếp nhận ứng viên

Các workflow CI và Quality Gates đều phát ra một kết luận ổn định: `Gate / CI` và
`Gate / Quality`. Chính sách tiếp nhận có phiên bản của chúng liệt kê mọi job thượng nguồn
dưới dạng bắt buộc hoặc khuyến nghị. Một job bắt buộc áp dụng phải thành công: kết quả
thiếu, bị hủy, bị bỏ qua, đang chờ và không xác định không thể thiết lập PASS. Phân loại
chỉ-docs hoặc chỉ-catalog hợp lệ có thể khiến một lane mã nguồn không áp dụng;
PR nháp không phải là ứng viên được chấp nhận. Nhãn `hotfix` không miễn trừ yêu cầu về bằng chứng.

Cả hai workflow đều bao phủ các PR vào các nhánh main/release, các lần push vào
`main`, dispatch thủ công và các sự kiện merge-group. Push, dispatch và merge-group chạy toàn bộ
phần lựa chọn. Các lần push vào `release/**` không khởi chạy chúng (2026-10-18): mỗi thay đổi
đã chạy ma trận trên PR của nó và tổ hợp sau khi merge là công việc của Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane).
Fork và merge group sử dụng hosted runner cho các job mà thông thường sẽ chọn
self-hosted runner; phải xác minh đủ năng lực hosted trước khi triển khai.

Mỗi biên nhận JSON xác định SHA đã checkout, lần chạy workflow và lần thử.
CLI từ chối trường hợp SHA của checkout/sự kiện không khớp. Các bài kiểm thử workflow gắn việc
thuộc chính sách với danh sách `needs` của job kết luận để một lane mới hoặc bị xóa không thể
âm thầm biến mất. Các biên nhận bao phủ chính workflow của chúng, không bao phủ việc phát hành,
triển khai hoặc nội bộ của một trình quét khuyến nghị hiện có. Việc kích hoạt cả hai tên kiểm tra
trong quy tắc nhánh là một thay đổi quản trị riêng; chỉ thêm các job này không tự bảo vệ một nhánh.

### Danh mục quét tĩnh

Danh mục bí danh npm có phiên bản và tập thành viên quét tĩnh nằm trong
`config/quality/gate-manifest.json`. Chạy `npm run check:gate-manifest` để xác thực
tên script và các lệnh chính xác đối chiếu với `package.json`; việc thêm, xóa và sai lệch
lệnh sẽ làm lỗi cả hook cục bộ lẫn các job phân loại thay đổi trong CI.
Một bí danh không phải là job workflow, instance của ma trận hoặc trường hợp kiểm thử:
không được trình bày các số lượng này như những khái niệm có thể thay thế cho nhau.

Sử dụng `npm run quality:scan -- --list` hoặc `npm run quality:scan:fast -- --list`
để kiểm tra các bí danh được chọn mà không thực thi chúng. Runner gọi entrypoint npm,
do đó runtime của nó (bao gồm Bun khi được cấu hình) được giữ nguyên.
Manifest ghi nhận các bí danh nằm ngoài những profile đó là được gọi riêng,
và các lệnh bảo trì bị cấm trong các profile quét chỉ-đọc.

Các profile này chỉ bao phủ quá trình quét tĩnh. Chúng không chứng nhận các bài kiểm thử sản phẩm,
độ bao phủ, đóng gói, các kiểm tra bên ngoài hoặc việc chấp nhận phát hành đầy đủ của một ứng viên.
Việc tiếp nhận workflow sử dụng `config/quality/admission-policy.json` được liên kết và
`scripts/quality/admission-verdict.mjs`. Các profile release-observer vẫn tách biệt;
hãy kiểm tra độc lập các kiểm tra và biên nhận áp dụng cho chúng. Phần danh mục bằng văn bản
bên dưới chỉ là tài liệu tham khảo, không phải bằng chứng rằng một gate thực sự đã chạy.

Các script nằm dưới `scripts/check/` (các gate chính sách) và `scripts/quality/` (công cụ ratchet).
Nguồn chuẩn của CI là `.github/workflows/ci.yml`.

### Đường dẫn nhanh cho PR phát hành (`quality.yml`)

`.github/workflows/quality.yml` bổ trợ cho CI trên các PR main/release, các lần push vào `main`,
dispatch và merge group. PR sử dụng các kiểm tra nhanh được lọc theo đường dẫn.
Bản build trùng lặp bị vô hiệu hóa vĩnh viễn đã được xóa; các kiểm tra build/package/boot thực
vẫn nằm trong CI.

| Job                                              | Phạm vi                                                                                                                                                                                                                                            | Chặn             |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `Docs Gates (fast-path)`                         | PR tài liệu/mã nguồn; tham chiếu tài liệu API và docs-all                                                                                                                                                                                          | Có               |
| `Fast Quality Gates`                             | PR mã nguồn; kiểm tra tĩnh, typecheck, typecheck dashboard, các bài kiểm thử unit bị ảnh hưởng                                                                                                                                                     | Có               |
| `Forgotten sibling tests`                        | PR mã nguồn; các module đã thay đổi được truy vết đến các consumer tĩnh và các bài kiểm thử sibling ứng viên; các đường dẫn barrel và dynamic-import được báo cáo dưới dạng chẩn đoán khuyến nghị, cùng với các ngoại lệ allowlist được tham chiếu | **Khuyến nghị**  |
| `Vitest (fast-path)`                             | PR mã nguồn; bộ kiểm thử vitest nhanh                                                                                                                                                                                                              | Có               |
| `Unit Tests fast-path`                           | PR mã nguồn; bộ unit test gồm 4 shard                                                                                                                                                                                                              | Có               |
| `No new ESLint warnings`                         | PR mã nguồn; bộ bảo vệ lint có nhận biết các suppression                                                                                                                                                                                           | Có, bao gồm fork |
| `Merge integrity (changelog + generated skills)` | PR không phải bản nháp; đồng bộ changelog và skill được tạo tự động                                                                                                                                                                                | Có, bao gồm fork |

#### Báo cáo Forgotten sibling tests

`npm run check:forgotten-sibling-tests` sử dụng lại trình phân giải import đứng sau bản đồ tác động của bài kiểm thử.
Đối với mọi mô-đun sản xuất đã thay đổi, công cụ báo cáo các chuỗi
`changed module/symbol -> static consumer -> candidate sibling test` một cách xác định khi bài kiểm thử
ứng viên không có trong diff của pull request. Bản tóm tắt Markdown và kết quả JSON được giữ lại dưới dạng
artifact của workflow `forgotten-sibling-tests` để hiệu chỉnh trước khi triển khai cơ chế chặn.

Các lần tái xuất từ barrel và các import động chỉ là chẩn đoán phân giải; chúng không bao giờ tạo ra
phát hiện chặn. Các ngoại lệ đã được xem xét nằm trong
`config/quality/forgotten-sibling-allowlist.json`. Mỗi mục phải nêu rõ consumer và
bài kiểm thử ứng viên, đưa ra lý do cụ thể, đồng thời liên kết đến một issue hoặc pull request trên GitHub. Các mục không hợp lệ sẽ mặc định bị từ chối. Các ngoại lệ không thể vô hiệu hóa phát hiện bài kiểm thử ứng viên đã bị xóa hoặc diff thêm `.skip`/`.todo`;
việc làm yếu assertion và các hình thức che giấu khác vẫn thuộc phạm vi quản lý của gate
`check:test-masking`, vốn chặn độc lập.

### Job: `lint`

Chạy trên mọi PR đến `main`. Chặn việc hợp nhất nếu thất bại.

| Script (`npm run ...`)            | Kiểm tra                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Chặn                                        |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | Phiên bản Node.js nằm trong phạm vi được hỗ trợ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Có                                          |
| `check:cycles`                    | Các import vòng giữa toàn bộ `src/` + `open-sse/` (dựa trên AST, đã phân giải `paths` của tsconfig). Chế độ cơ bản thoát với mã 1 bất cứ khi nào tồn tại chu kỳ nào (fail-closed kể từ #15281) và liệt kê các SCC. `check:cycles:ratchet` (được CI chạy) chặn khi số lượng vượt quá ngưỡng `metrics.cycles` trong `quality-baseline.json` — hiện là 14, `direction: down`, vì vậy chỉ có thể giảm (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Có (ratchet)                                |
| `check:boundary`                  | Mức độ liên kết `open-sse → src`: các import duy nhất giữa các tệp từ engine vào app (`scripts/quality/measure-boundary.mjs`; danh sách cạnh là backlog khắc phục việc tách core/module v4). Chế độ cơ bản chỉ tạo báo cáo tham khảo (giống `quality:boundary`). `check:boundary:ratchet` (được CI chạy, đồng thời nằm trong vòng lặp ratchet của các fast-gate trong `quality.yml`) chặn khi số lượng vượt quá ngưỡng `metrics.boundaryOpenSseToSrc` trong `quality-baseline.json` — được khởi tạo ở mức đo được là 771, `direction: down`; `--update` chỉ có thể hạ ngưỡng này; so với base trên các PR (`--base-ref`, xem bên dưới)                                                                                                                                                                                                                                                                                                                                                                                                         | Có (ratchet)                                |
| `check:route-validation:t06`      | Các schema Zod hiện diện trên tất cả các route (chính sách Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Có                                          |
| `check:any-budget:t11`            | Số lượng `@ts-expect-error // any` không vượt quá ngân sách (cổng quay Tầng 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Có                                          |
| `check:provider-consistency`      | Mọi provider trong `providers.ts` đều có mục tương ứng trong `providerRegistry.ts` (và ngược lại, trong phạm vi allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Có                                          |
| `check:model-lifecycle`           | Ba bảng định tuyến được duy trì thủ công luôn nhất quán với ảnh chụp vòng đời đã được kiểm tra vào kho (#11503): `FITNESS_TABLE` (`taskFitness.ts`) không chấm điểm id đã ngừng hoạt động nào mà `REGISTRY` có thể định tuyến; mọi đích `BUILT_IN_ALIASES` đều có trong `REGISTRY` và không có trong ảnh chụp id đã ngừng hoạt động; mọi id đã ngừng hoạt động vẫn còn trong `REGISTRY` đều được chuyển tiếp hoặc được liệt kê trong `allowedRetiredInCatalog`; và không có nguồn hoặc đích `DEFAULT_DEGRADATION_MAP` nào xuất hiện là đã ngừng hoạt động trong ảnh chụp đó. Điều này không chứng minh rằng một model hiện đang được upstream đang hoạt động cung cấp. Ngoại tuyến — so sánh với `config/quality/model-lifecycle.json`, được làm mới thủ công bằng `npm run quality:refresh-model-lifecycle` (mạng; không được tích hợp vào CI). `allowedRetiredInCatalog` là một ratchet giảm dần tồn đọng: chỉ thêm một mục khi có issue theo dõi.                                                                                           | Có                                          |
| `check:fetch-targets`             | Mọi `fetch("/api/...")` trong `src/` phía client đều phân giải đến một `route.ts` thực                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Có                                          |
| `check:deps`                      | Tất cả dependency có thể cài đặt bằng `npm install` trong mọi `package.json` của repo đều có trong `dependency-allowlist.json`; các package mới chưa ghim phiên bản hoặc bị slopsquat sẽ được gắn cờ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Có                                          |
| `audit:deps`                      | `npm audit` (root + electron) — không có cảnh báo mức cao/nghiêm trọng (trùng lặp với `check:vuln-ratchet` của osv; xem Rationalization Backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Có                                          |
| `check:lockfile`                  | Tính toàn vẹn của `package-lock.json` — registry https, các mã băm integrity, không ghi đè host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Có                                          |
| `check:licenses`                  | Danh sách cho phép giấy phép SPDX cho các dependency production                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Có                                          |
| `check:tracked-artifacts`         | Không có artifact bản dựng / symlink `node_modules` được commit (cũng chạy trong husky pre-commit; pre-push được cố ý giữ nhẹ — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Có                                          |
| `check:ai-attribution`            | Không có trailer `Co-Authored-By` của AI/bot hoặc footer do AI tạo trong các commit, tiêu đề hoặc nội dung PR — Quy tắc cứng #16 (trong vòng lặp fast-gates của `quality.yml` cho PR→`release/**` — đọc event payload, không thực hiện gì ngoài PR — và một bước chỉ dành cho PR trong lint của `ci.yml` cho PR→`main`; đồng thời là hook husky `commit-msg`; cho phép đồng tác giả là con người; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:vitest-exclusions`         | Mọi loại trừ Vitest phải nêu một issue theo dõi và xuất hiện trong `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Có                                          |
| `check:file-size`                 | Các tệp mã nguồn (`.ts`/`.tsx` trong `src/`, `open-sse/`, `electron/`, `bin/`) phải nằm trong giới hạn `cap` và các tệp kiểm thử (`*.test.ts(x)`) trong `testCap`; các tệp được đóng băng trong `file-size-baseline.json` (`frozen` / `testFrozen`) không được tăng vượt quá kích thước đã ghi nhận                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Có                                          |
| `check:error-helper`              | Phản hồi lỗi trong các executor/handler sử dụng `buildErrorBody()` / `sanitizeErrorMessage()` (Quy tắc bắt buộc #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Có                                          |
| `check:migration-numbering`       | Các tệp SQL migration được đánh số tuần tự, không có khoảng trống hoặc số trùng lặp                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Có                                          |
| `check:public-creds`              | Không có OAuth `client_id`/`client_secret` dạng literal hoặc Web key của Firebase bên ngoài `publicCreds.ts` (Quy tắc bắt buộc #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Có                                          |
| `check:db-rules`                  | Không có SQL thô bên ngoài các module `src/lib/db/`; không import theo kiểu barrel từ `localDb.ts` (Quy tắc bắt buộc #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Có                                          |
| `check:known-symbols`             | Các provider executor, chiến lược định tuyến và translator được đăng ký trong các bảng dispatch phải khớp với các tệp trên đĩa — không có symbol mồ côi hoặc chưa khai báo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Có                                          |
| `check:route-guard-membership`    | Mọi route tạo tiến trình con đều được phân loại bởi `isLocalOnlyPath()` (Quy tắc bắt buộc #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Có                                          |
| `check:test-discovery`            | Mọi tệp `*.test.ts` / `*.spec.ts` trong kho lưu trữ đều được ít nhất một trình chạy kiểm thử thu thập (cơ chế ratchet: danh sách tệp mồ côi trong `test-discovery-baseline.json` chỉ có thể thu hẹp)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Có                                          |
| `check:test-tla-order`            | Không có tệp `node:test` nào bên dưới `tests/unit` đăng ký một kiểm thử, gặp `await` cấp cao nhất, rồi đăng ký thêm kiểm thử (#18045; cơ chế ratchet: `test-tla-order-allowlist.json` chỉ có thể thu hẹp)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Có                                          |
| `check:agent-skills-sync`         | Các tạo phẩm agent-skills được tạo tự động khớp với danh mục nguồn (không bị sai lệch)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:provider-asset-provenance` | Logo/tài sản của nhà cung cấp có mục nguồn gốc được ghi nhận                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `lint:json`                       | Các tệp cấu hình JSON được phân tích cú pháp và đáp ứng các quy tắc lint của kho lưu trữ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `typecheck:core`                  | Biên dịch TypeScript không có lỗi (chỉ có các cảnh báo mang tính tham khảo)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Có                                          |
| `typecheck:noimplicit:core`       | `noImplicitAny` nghiêm ngặt — định hướng cho tương lai; nhiều vị trí gọi có sẵn vẫn cần được chú thích                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **Khuyến nghị** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` giới hạn trong `src/app/(dashboard)/**` (#7033) — danh sách cho phép 27 tệp được tuyển chọn của `typecheck:core` không bao gồm bất kỳ TSX dashboard nào, và `next build` cũng không bao giờ kiểm tra kiểu của chúng (`next.config.mjs` đặt `ignoreBuildErrors: true`), vì vậy các lỗi hồi quy do định danh mồ côi ở đó (#6625/#6909) đã không được CI phát hiện. So sánh các khác biệt với số lượng cơ sở cố định theo từng tệp/mã TS (`config/quality/dashboard-typecheck-baseline.json`, cùng kiểu thực thi lỗi thời như `check:known-symbols`) — chỉ các lỗi MỚI vượt quá số lượng trong cơ sở mới làm cổng kiểm tra thất bại; giảm dần cơ sở bằng `--update` khi một lỗi có sẵn được sửa.                                                                                                                                                                                                                                                                                                                                            | Có                                          |
| `check:build-typecheck`           | Kiểm tra kiểu production trên toàn bộ ứng dụng đối với `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), là phần mà danh sách cho phép 27 tệp của `typecheck:core` và cổng dashboard không bao phủ. So sánh các khác biệt với `config/quality/build-typecheck-baseline.json`; số lượng theo từng cặp (tệp, mã) mới hoặc tăng lên sẽ làm kiểm tra thất bại, còn số lượng giảm xuống sẽ yêu cầu bạn giảm dần cơ sở. `--update` sẽ từ chối khi lần chạy chứa một cặp mới hoặc tăng lên nếu không truyền `--force-regressions`, đồng thời từ chối một tệp mới bị tắt kiểm tra nếu không truyền `--force-nocheck`, vì vậy việc mở rộng cơ sở để đạt trạng thái thành công và cấp quyền im lặng vĩnh viễn là hai hành động có chủ đích riêng biệt. Một `--force` đơn lẻ sẽ bị từ chối. Đồng thời quét phạm vi build để tìm `@ts-nocheck` dựa trên `config/quality/ts-nocheck-baseline.json`, vì một tệp sử dụng nó sẽ không báo bất kỳ chẩn đoán nào và nếu không sẽ vô hình đối với mọi cổng kiểm tra. | Có                                          |

#### Hai chương trình kiểm tra kiểu cho các câu trả lời khác nhau

`typecheck:core` và `check:build-typecheck` biên dịch các chương trình khác nhau với
các tùy chọn khác nhau, và cùng một tệp có thể không có lỗi ở chương trình này nhưng
lại đầy lỗi ở chương trình kia.

`tsconfig.build.json` đặt `"strict": false`, vì vậy `noImplicitAny` bị tắt. Cấu hình
core biên dịch danh sách cho phép 27 tệp được tuyển chọn với các tùy chọn nghiêm ngặt
hơn và đi theo đồ thị import của từng mục, vì vậy những tệp không bao giờ xuất hiện
trong chương trình build vẫn được kiểm tra ở đó.

Hệ quả này rất quan trọng khi đánh giá một tệp đã được định kiểu hay chưa: **không có
chẩn đoán nào dưới `check:build-typecheck` không có nghĩa là không có lỗi nào**. Gỡ
`@ts-nocheck` khỏi 26 tệp cho thấy 23 tệp trong số đó không có lỗi trong chương trình
build; mười sáu tệp trong số đó lại phát sinh khoảng 120 lỗi implicit-any trong chương
trình nghiêm ngặt. Hãy kiểm tra cả hai trước khi kết luận một tệp là sạch.

### Công việc: `quality-gate`

Chạy sau `test-coverage`. Chặn việc hợp nhất khi thất bại.

| Script                       | Validates                                                                                                                                                                                        | Blocking                   |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `quality:collect`            | Phát ra `quality-metrics.json` (số lượng cảnh báo ESLint, độ bao phủ từ báo cáo shard đã hợp nhất)                                                                                               | Có (phụ thuộc vào ratchet) |
| `quality:ratchet`            | Mỗi chỉ số trong `quality-baseline.json` không bị suy giảm (số cảnh báo ESLint ≤ baseline; độ bao phủ ≥ baseline)                                                                                | Có                         |
| `check:duplication`          | Mức độ trùng lặp mã (jscpd@4) không vượt quá baseline trong `quality-baseline.json`                                                                                                              | Có                         |
| `check:complexity`           | Độ phức tạp cyclomatic ở cấp tệp không vượt quá giới hạn (ESLint core `complexity` + `max-lines-per-function`)                                                                                   | Có                         |
| `check:cognitive-complexity` | Ratchet độ phức tạp nhận thức (`eslint-plugin-sonarjs`) — một lượt kiểm tra ESLint riêng; CI chạy cả hai và hợp nhất thành một bước `check:complexity-ratchets`                                  | Có                         |
| `check:dead-code`            | Ratchet các export / tệp không được sử dụng (knip) không suy giảm so với baseline                                                                                                                | Có                         |
| `check:compression-budget`   | Ngân sách benchmark nén — các mức sàn tiết kiệm token theo từng engine không được suy giảm                                                                                                       | Có                         |
| `check:type-coverage`        | Ratchet tỷ lệ mã có kiểu (`type-coverage`) không suy giảm; phần lớn thay thế `typecheck:noimplicit:core`                                                                                         | Có                         |
| `check:codeql-ratchet`       | Số lượng cảnh báo CodeQL đang mở không suy giảm (đọc qua `gh api`; bỏ qua một cách an toàn khi không có token) — xem "Ratchet CodeQL" bên dưới để biết chu kỳ làm mới và cách kích hoạt thủ công | Có                         |

### Job: `quality-extended`

Toàn bộ job chỉ mang tính tham khảo (`continue-on-error: true`). Các ratchet dựa trên npm vẫn thực sự chạy; các trình quét bên ngoài được cài đặt qua `gh release download` và tự bỏ qua (thoát với mã 0)
khi tệp nhị phân vẫn chưa có.

| Script                   | Validates                                                                                                                                                                                                                                            | Blocking                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `check:circular-deps`    | Không có dependency vòng (dpdm)                                                                                                                                                                                                                      | **Chỉ mang tính tham khảo**                     |
| `check:bundle-size`      | Kích thước bundle không vượt quá giới hạn                                                                                                                                                                                                            | **Chỉ mang tính tham khảo**                     |
| `check:secrets`          | Quét secret (gitleaks) — bỏ qua nếu không có tệp nhị phân                                                                                                                                                                                            | **Chỉ mang tính tham khảo**                     |
| `check:vuln-ratchet`     | Các lỗ hổng dependency (osv-scanner) không suy giảm — bỏ qua nếu không có tệp nhị phân                                                                                                                                                               | **Chỉ mang tính tham khảo**                     |
| `check:workflows`        | Kiểm tra workflow (actionlint + zizmor); trình quét bị thiếu/hỏng, báo cáo không hợp lệ hoặc thiếu baseline ratchet sẽ khiến quá trình thất bại với trạng thái INCOMPLETE. Các phát hiện hợp lệ tuân theo chính sách strict/advisory/ratchet đã chọn | Bắt buộc thực thi; ratchet zizmor chặn trong CI |
| `check:openapi-breaking` | Các thay đổi phá vỡ hợp đồng API công khai (`openapi.yaml`) so với nhánh cơ sở (oasdiff) — phát ra `openapiBreaking=N`; bỏ qua nếu không có oasdiff hoặc không thể phân giải đặc tả cơ sở                                                            | **Chỉ mang tính tham khảo**                     |

### Job: `docs-sync-strict`

Chạy trên mọi PR vào `main`. Chặn việc hợp nhất nếu thất bại.

| Script                         | Xác thực                                                                                                                                                                                            | Chặn                               |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `check:docs-all`               | Meta-gate chạy tuần tự 6 sub-gate bên dưới                                                                                                                                                          | Có                                 |
| ↳ `check:docs-sync`            | Tính nhất quán phiên bản giữa CHANGELOG / OpenAPI / llm.txt                                                                                                                                         | Có                                 |
| ↳ `check:docs-counts`          | Các số liệu trong phần văn bản (số lượng provider, số lượng migration, v.v.) nằm trong phạm vi ratchet của số liệu thực tế                                                                          | Có                                 |
| ↳ `check:env-doc-sync`         | Mọi biến môi trường trong `.env.example` đều được mô tả trong một bảng tài liệu, và ngược lại                                                                                                       | Có                                 |
| ↳ `check:deprecated-versions`  | Không có chuỗi phiên bản đã ngừng hỗ trợ trong tài liệu                                                                                                                                             | Có                                 |
| ↳ `check:doc-links`            | Các liên kết markdown nội bộ trong tài liệu trỏ đến các tệp thực (`[text]`/`(path)`)                                                                                                                | Có                                 |
| ↳ `check:fabricated-docs`      | Các route, biến môi trường, lệnh CLI, tên hook và đường dẫn tệp được trích dẫn trong tài liệu phải tồn tại trong codebase. Gate cứng khi dùng `--strict`; nếu không có cờ này thì chỉ thất bại mềm. | Có (thông qua `--strict` trong CI) |
| `check:cli-i18n`               | Các chuỗi lệnh CLI có mặt trong tất cả tệp locale i18n                                                                                                                                              | Có                                 |
| `check:openapi-coverage`       | Đặc tả OpenAPI bao phủ ít nhất mức sàn ratchet của các route thực tế                                                                                                                                | Có                                 |
| `check:openapi-security-tiers` | Các chú thích security tier trong `openapi.yaml` nhất quán với phân loại trong `routeGuard.ts`                                                                                                      | **Khuyến nghị**                    |
| `check:openapi-routes`         | Mọi path trong `openapi.yaml` đều trỏ đến một `route.ts` thực tế (chống ảo giác)                                                                                                                    | Có                                 |
| `check:docs-symbols`           | Mọi tham chiếu `/api/...` trong `docs/**/*.md` đều trỏ đến một `route.ts` thực tế (chống ảo giác)                                                                                                   | Có                                 |
| `i18n translation drift`       | Các key chưa được dịch trong tệp locale i18n — chỉ cảnh báo                                                                                                                                         | **Khuyến nghị**                    |

Mười hai SVG README trong `docs/diagrams/` được tạo tự động (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` sẽ tạo lại tất cả). Mỗi tệp có một bài kiểm thử unit so sánh từng byte
(`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) sẽ thất bại khi tệp đã commit bị cũ,
và `check:docs-counts` đọc các số liệu chuẩn từ các node `<text>` — đó là lý do bước chuyển
sang outline vẫn giữ mọi chuỗi đã chuyển outline trong tệp dưới dạng `<text>` vô hình. Việc kiểm tra số liệu chuẩn của SVG đọc các tệp được liệt kê trong
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, cùng với `public/images/tier-flow-dark.svg` và `tier-flow-light.svg`;
các claim free-forever, catalog-entry, recurring-pool và scoring-factors cũng đọc
`promise-pillars.svg`, `free-tier-budget.svg` và `strategies-grid.svg`. `free-tier-budget.svg`
lấy các số liệu từ trình tải catalog đang hoạt động, vì vậy thay đổi đối với `FREE_MODEL_BUDGETS`
hoặc tên hiển thị của provider sẽ khiến CI thất bại cho đến khi tệp đó được tạo lại.

### Job: `i18n-ui-coverage`

| Script                            | Xác thực                                                                                                                                                                                        | Chặn            |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (inline) | Mức độ bao phủ key i18n của UI ≥ 65%                                                                                                                                                            | Có              |
| `check-ui-value-drift` (inline)   | Một **value** tiếng Anh được viết lại không để lại bản dịch cũ                                                                                                                                  | Có              |
| `check-new-key-coverage` (inline) | Một key tiếng Anh **mới** được dịch trong mọi locale — marker `__MISSING__:` sẽ bị từ chối                                                                                                      | Có              |
| `check-translation-ratio`         | Tỷ lệ bản dịch thực tế theo locale (các mục giống hệt tiếng Anh / placeholder / thiếu bản dịch nằm ngoài allowlist) không được vượt quá `config/quality/i18n-translation-baseline.json` + slack | **Khuyến nghị** |

Cần `fetch-depth: 0` — gate kiểm tra độ lệch giá trị sẽ so sánh `en.json` với merge base.

#### `check-ui-value-drift` — gate kiểm tra bản dịch cũ

Phát hiện hồi quy i18n duy nhất mà các cổng kiểm tra khác không thể nhận ra về mặt cấu trúc: một giá trị tiếng Anh
bị viết lại nhưng các bản dịch được tạo từ tiếng Anh _trước đó_ vẫn không thay đổi, khiến
người dùng không nói tiếng Anh tiếp tục đọc nội dung được diễn đạt chắc chắn nhưng nay đã sai.

Điều này thực sự đã được phát hành. `oauthModal.googleOAuthWarning` đã được viết lại khi helper
đăng nhập Antigravity được thêm vào (#5203); **39 trên 43 locale** vẫn giữ nội dung yêu cầu người vận hành "sao chép
URL đầy đủ rồi dán vào bên dưới" — một quy trình không thể hoàn tất đối với nhà cung cấp đó. Sự việc không được phát hiện cho đến #8463 vì:

- `sync-ui-keys` chỉ bổ sung các key **bị thiếu**, không bao giờ bổ sung các key **đã cũ**;
- `check-ui-keys-coverage` đếm sự _hiện diện_ của key, vì vậy một bản dịch cũ vẫn được tính là đã bao phủ;
- `check-translation-drift` theo dõi các bản sao tài liệu `docs/i18n/<locale>/**.md` —
  nó không bao giờ đọc `src/i18n/messages/*.json`. Đang chặn trong job `docs-sync-strict` kể từ lần đồng bộ lại
  2026-09: chỉnh sửa tài liệu cốt lõi → `npm run i18n:run -- --files=<doc>` (theo từng section, chi phí thấp).

**Nhận biết diff, không dựa trên baseline.** Nó so sánh `en.json` tại merge base với
working tree; với mọi key có giá trị tiếng Anh thay đổi, bất kỳ locale nào vẫn giữ bản dịch
chưa được chạm đến đều bị xem là đã cũ. Điều này có chủ đích **đóng băng các khoản nợ tồn tại từ trước** — một diff không thể cho biết bản dịch lâu năm bắt nguồn từ tiếng Anh cũ nào, vì vậy cổng kiểm tra chỉ đánh giá những gì thay đổi hiện tại tác động đến. Phương án thay thế (baseline hash cho từng key) sẽ tốn một file được tạo khoảng ~600 KB, lớn gấp 3 lần baseline hiện có lớn nhất, và thay đổi liên tục trong mọi PR i18n.

Có hai cách để đáp ứng yêu cầu:

1. cập nhật các bản dịch bị ảnh hưởng, hoặc
2. đặt chúng thành `__MISSING__:<new english>` — khi đó runtime sẽ cung cấp tiếng Anh đã được sửa
   (`src/i18n/request.ts::deepMergeFallback`, #7258) và key sẽ được đưa vào hàng đợi dịch.

Nếu **ý nghĩa** của chuỗi đã thay đổi, hãy ưu tiên **đổi tên key**: một key mới không thể kế thừa
bản dịch cũ. Đó là cách #8463 đã sử dụng.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Thoát với mã 0 cùng `SKIP reason=base-unresolved` khi không thể đọc catalog cơ sở (bản sao nông
không có base ref), tương tự `check-openapi-breaking`.

### Job: `i18n`

Ma trận kiểm tra i18n đầy đủ (mỗi locale một job). Toàn bộ job chỉ mang tính tham khảo.

| Script                          | Kiểm tra                             | Chặn                                                       |
| ------------------------------- | ------------------------------------ | ---------------------------------------------------------- |
| `validate_translation.py quick` | Tính đầy đủ của bản dịch theo locale | **Tham khảo** (`continue-on-error: true` trên toàn bộ job) |

### Job: `pr-test-policy`

Chỉ chạy trên các pull request.

| Script                 | Kiểm tra                                                                                                                        | Chặn |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---- |
| `check:pr-test-policy` | Các PR thay đổi mã production trong `src/`, `open-sse/`, `electron/` hoặc `bin/` phải bổ sung hoặc cập nhật test (Hard Rule #8) | Có   |
| `check:test-masking`   | Các file test đã thay đổi không làm giảm tổng số assert hoặc thêm các tautology `assert.ok(true)`                               | Có   |
| `check:pr-evidence`    | Nội dung PR dẫn chứng test/VPS cho thay đổi (cơ chế hóa Hard Rule #18 bằng cách tìm trong văn bản PR — mong manh, xem Backlog)  | Có   |

### Job: `test-vitest`

Chạy sau `build`. Chặn việc merge nếu thất bại.

| Suite            | Kiểm tra                                                 | Chặn                                                                                                           |
| ---------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 tools), autoCombo, cache — vitest runner | Có                                                                                                             |
| `test:vitest:ui` | Test component UI — vitest runner                        | **Chặn** — các lỗi có sẵn từ trước được loại trừ rõ ràng trong `vitest.config.ts`; lỗi mới sẽ làm job thất bại |

### Các workflow chạy hằng đêm (theo lịch, mang tính tham khảo)

Các workflow này chạy theo lịch cron (và `workflow_dispatch`), không bao giờ chạy trên PR. Tất cả chỉ mang tính tham khảo.

| Quy trình              | Nội dung xác thực                                                                                                                                                           | Chặn            |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | các bài kiểm thử thuộc tính fast-check với seed ngẫu nhiên + số lần chạy cao                                                                                                | **Khuyến nghị** |
| `nightly-resilience`   | ngưỡng tăng trưởng heap, chèn lỗi hỗn loạn, kiểm thử tải/duy trì tải bằng k6                                                                                                | **Khuyến nghị** |
| `nightly-llm-security` | bộ bảo vệ chống injection của promptfoo (chế độ block) + các probe của garak (bị bỏ qua nếu không có secret của provider)                                                   | **Khuyến nghị** |
| `nightly-schemathesis` | fuzzing hợp đồng OpenAPI (schemathesis) đối với OmniRoute đang chạy, sử dụng `docs/openapi.yaml` — phát hiện các vi phạm đặc tả / lỗi 500 chưa được xử lý (Giai đoạn 8 B.4) | **Khuyến nghị** |
| `nightly-mutation`     | điểm kiểm thử đột biến của Stryker trên lane kiểm thử đơn vị nhanh — các mutant còn tồn tại cho thấy các assertion còn yếu                                                  | **Khuyến nghị** |
| `nightly-compat`       | ma trận tương thích engine Node trên các dải `engines.node` được hỗ trợ                                                                                                     | **Khuyến nghị** |

Các baseline hiệu năng (heap, TTFB, thời gian build) được ghi nhận, không dùng làm điều kiện chặn: xem [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Giai đoạn ưu tiên tốc độ (2026-08-30 → v4.0 LTS): mọi đường cơ sở được nới lỏng 20%

Quyết định của chủ sở hữu (2026-08-30): cho đến khi hoàn tất mô-đun hóa trong v4.0, tốc độ
phát hành quan trọng hơn việc giữ nguyên mức nợ kỹ thuật. Mọi đường cơ sở chốt tăng dần dạng
**số** đã được nới lỏng 20% trong một lượt có thể kiểm toán, và giai đoạn này được khai báo trong
`config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Nội dung thay đổi                                                                                                                                                                                                             | Vị trí                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — các số đếm càng thấp càng tốt ×1.2, các tỷ lệ phần trăm càng cao càng tốt ÷1.2 (giữ ngưỡng coverage tối thiểu là 60, `eslintErrors` vẫn là 0, `eslintWarnings` 0 → 20% số lượng suppression đã đóng băng) | `quality-baseline.json` (ghi chú `_relax_velocity_2026_08_30` liệt kê mọi giá trị trước → sau)         |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                              | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, mọi giới hạn dòng `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                        | `file-size-baseline.json`                                                                              |
| số đếm theo từng tệp / theo từng mã TS ×1.2                                                                                                                                                                                   | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                           | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` chuyển thành khuyến nghị khi `_policy.requireTighten === false`                                                                                                                                           | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| tác vụ hằng đêm `bank-ratchet-shrinks` tạm dừng (nếu không, nó sẽ ghi nhận mức thu hẹp đo được và triệt tiêu phần dư địa)                                                                                                     | `.github/workflows/nightly-release-green.yml`                                                          |

Các danh sách cho phép (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **không** phải là ngân sách và không được thay đổi. Các cổng chính sách đạt/không đạt
(bí mật, quy tắc SQL, hợp đồng tài liệu/biến môi trường, tính đồng nhất i18n, kiểm thử đơn vị)
không thay đổi — một kiểm thử đỏ vẫn là một kiểm thử đỏ.

**Công cụ**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — thao tác
  nới lỏng một lần (`scripts/quality/relax-baselines.mjs`); từ chối chạy hai lần với cùng một
  ghi chú.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  đo mọi cổng dạng số theo đúng cách CI thực hiện và in ra dư địa còn lại cho từng cổng
  (`scripts/quality/baseline-headroom.mjs`). Tác vụ hằng đêm `baseline-headroom` công bố
  bảng trong phần tóm tắt lượt chạy workflow và tải báo cáo JSON/Markdown lên dưới tên
  `baseline-headroom-<run_id>`, được lưu giữ trong 90 ngày. Các hàng cảnh báo và nghiêm trọng
  xác định những cổng còn cách mức trần không quá 10% hoặc đã vượt mức trần. Hãy xem các báo cáo
  này như cảnh báo sớm về việc ngân sách đang bị sử dụng; kiểm tra các ghi chú `_rebaseline_*`
  của cổng vi phạm. Tác vụ này không còn tạo hoặc cập nhật issue cố định; #12149 lưu giữ lịch sử
  báo cáo trước đó.

**Chế độ mã mới (Clean-as-You-Code) — từ 2026-08-30, chỉ dành cho luồng nhanh PR**

Trên các sự kiện `pull_request`, `quality.yml` truyền `--base-ref <PR base SHA>` đến
`check:file-size`, `check:complexity-ratchets` và `check:dead-code`. Đối với
`check:complexity-ratchets` và `check:dead-code`, cổng sẽ so sánh HEAD với merge-base,
**chỉ giới hạn trong các tệp mà PR đã thay đổi** (`scripts/check/newCodeMode.mjs`: merge-base
được hiện thực hóa trong một `git worktree` dùng tạm, ESLint/knip chạy tại đó và trên HEAD,
sau đó các số đếm theo từng tệp được đối chiếu):

- **chặn** — PR đã thêm các vi phạm về độ phức tạp cyclomatic/cognitive hoặc dead export trong
  những tệp mà nó thay đổi (`complexityNewCode=`, `cognitiveComplexityNewCode=`,
  `deadExportsNewCode=` trong nhật ký);
- **khuyến nghị** — tổng toàn cục so với đường cơ sở đã đóng băng. Độ lệch kế thừa không bao giờ
  khiến một PR vô can bị đỏ; độ lệch được đóng băng lại khi đối soát bản phát hành và được tác vụ
  headroom theo dõi.

`check:file-size` sử dụng base ref theo quy tắc riêng (`scripts/check/check-file-size.mjs`, #8522):
nó kiểm tra mọi tệp mã nguồn và kiểm thử trong cây, đọc số dòng của từng tệp tại base của PR
bằng `git show`, và chỉ đánh trượt một tệp khi tệp đó tăng vượt quá giá trị lớn hơn giữa mức trần
đường cơ sở của nó (`frozen` / `testFrozen`, hoặc `cap` / `testCap` đối với tệp nằm ngoài đường
cơ sở) và kích thước tại base. Vì vậy, một tệp đã bị lệch tại base sẽ không bao giờ khiến một PR
vô can bị đỏ.

`check:boundary:ratchet` áp dụng cùng một quy tắc cho con số duy nhất của nó
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): trên các sự kiện PR, cả cổng kiểm tra nhanh
`quality.yml` và tác vụ lint của `ci.yml` đều truyền SHA cơ sở của PR, commit cơ sở được
đo từ bản xuất `git archive`, và PR chỉ thất bại khi số lượng cạnh `open-sse → src`
vượt quá giá trị lớn hơn giữa `metrics.boundaryOpenSseToSrc` và số lượng trên cơ sở. Độ trôi của cơ sở
vượt quá mức trần sẽ được báo cáo (`base drift herdado`) nhưng không bao giờ khiến một PR vô tội bị đỏ; push → main
vẫn giữ mức trần tuyệt đối, và SHA cơ sở không thể phân giải sẽ quay về dùng mức trần đó kèm cảnh báo.

Các lần chạy `workflow_dispatch`, đợt rà soát trạng thái xanh của bản phát hành và tác vụ khoảng dư hằng đêm không có cơ sở PR
nên vẫn giữ phép so sánh tuyệt đối (toàn cục). Độ bao phủ, mức trùng lặp và độ bao phủ kiểu hiện vẫn
được áp dụng toàn cục (các công cụ của chúng không thể tạo diff theo từng tệp với chi phí thấp) — đây là các ứng viên để được xử lý tương tự.

**Khép lại giai đoạn ở v4.0 (LTS = chặt chẽ hơn trước, không phải "trở lại bình thường")**

1. Trên đúng tip của `release/v4.0.0`: chạy `npm run quality:headroom --json` để lưu hồ sơ, sau đó
   chạy `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, và `--update` cho từng cổng typecheck
   — mọi đường cơ sở đều giảm xuống giá trị đo được.
2. Xóa `_policy` khỏi `quality-baseline.json` (kích hoạt lại `--require-tighten` và việc
   tích lũy hằng đêm), khôi phục `THRESHOLD = 36` (hoặc cao hơn) trong `check-openapi-coverage.mjs`.
3. Siết chặt hơn mức đo được ở những nơi việc mô-đun hóa đã phát huy hiệu quả: đưa `cap` kích thước tệp trở lại 1000
   (hoặc 800), tăng các ngưỡng tối thiểu về độ bao phủ thêm 5, đặt số export không được sử dụng là 0 cho các package đã mô-đun hóa.

## Đường cơ sở Ratchet (`quality-baseline.json`)

Công cụ ratchet (`scripts/quality/check-quality-ratchet.mjs`) đọc `quality-baseline.json`
và so sánh tệp này với `quality-metrics.json` vừa được thu thập. Bất kỳ chỉ số nào suy giảm
vượt quá epsilon tương ứng đều khiến bản dựng thất bại.

Các chỉ số hiện đang được theo dõi:

| Chỉ số                | Hướng  | Ý nghĩa                             |
| --------------------- | ------ | ----------------------------------- |
| `eslintWarnings`      | `down` | Số cảnh báo ESLint không được tăng  |
| `coverage.statements` | `up`   | Độ bao phủ câu lệnh không được giảm |
| `coverage.lines`      | `up`   | Độ bao phủ dòng không được giảm     |
| `coverage.functions`  | `up`   | Độ bao phủ hàm không được giảm      |
| `coverage.branches`   | `up`   | Độ bao phủ nhánh không được giảm    |

Để cập nhật đường cơ sở sau một cải thiện thực sự:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Cờ `--update` ghi các giá trị đo được hiện tại vào `quality-baseline.json`.
Hãy commit tệp này cùng với thay đổi đã cải thiện chỉ số. Một PR cải thiện một
chỉ số mà không cập nhật đường cơ sở sẽ bị `--require-tighten` phát hiện (Giai đoạn 6A.5,
đang chờ triển khai).

### Ratchet CodeQL: tần suất làm mới và kích hoạt thủ công

`check:codeql-ratchet` đọc **trạng thái repo, được làm mới theo lịch — không phải theo từng PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` báo cáo
`state: configured`, `schedule: weekly`: đây là lượt quét theo cấu hình mặc định của GitHub, không phải
phân tích sau mỗi lần push. Hệ quả: sau khi một PR SỬA các cảnh báo được merge, ratchet vẫn tiếp tục đọc
số lượng cũ, cao hơn cho đến khi lượt quét theo lịch tiếp theo chạy — vì vậy, nó báo cáo một sự suy giảm
trên mọi PR đang mở, bao gồm cả các PR tiếp nối của chính PR sửa lỗi, cho đến khi lượt quét cập nhật kịp.

**Làm mới thủ công**: `gh workflow run codeql.yml --ref release/vX.Y.Z` chạy lại
phân tích và công bố lại các cảnh báo trong vòng vài phút. Hãy đọc `.github/workflows/codeql.yml`
trước — phần đầu tệp giải thích rằng nó chỉ dùng `workflow_dispatch` **vì xung đột với
"cấu hình mặc định" của GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Việc khôi phục các trigger `push`/`pull_request`/
`schedule` trước tiên yêu cầu **chủ sở hữu thực hiện một thao tác**: Settings → Code security →
CodeQL: Default → Advanced. Không thêm trigger `schedule:` nếu chưa chuyển đổi như trên — việc đó
sẽ chỉ tạo ra các lượt chạy thất bại.

**Siết chặt đường cơ sở sau khi số lượng giảm** — `node scripts/check/check-codeql-ratchet.mjs
--update` ghi số lượng mới đo được vào `quality-baseline.json` →
`metrics.codeqlAlerts.value`, để ratchet không âm thầm cho phép chỉ số suy giảm trở lại
mức trần cũ. Ví dụ thực tế (2026-09-02/03): PR #12502 đã sửa 7 cảnh báo thực sự
(13 → 6 cảnh báo đang mở được đo); PR #12530 đã siết chặt đường cơ sở cố định từ 11 → 6 cho khớp; sau đó,
6 cảnh báo còn lại đã được loại bỏ kèm phần giải trình riêng cho từng cảnh báo, đưa số cảnh báo đang mở xuống 0.

**Việc loại bỏ cảnh báo do người vận hành quyết định (Quy tắc cứng #14)** — không bao giờ loại bỏ một cảnh báo CodeQL
mà không ghi lại lý do kỹ thuật trong nhận xét loại bỏ: `won't fix` cho
một yêu cầu từ giao thức thượng nguồn, `used in tests` cho một fixture kiểm thử, `false positive`
cho một trình làm sạch mà CodeQL không thể nhận biết (tiền lệ: `docs/security/ERROR_SANITIZATION.md`).

---

## Chính sách thử lại kiểm thử (WS5.4, v3.8.49)

Việc thử lại được áp dụng theo từng runner, tuyệt đối không áp dụng đại trà trên toàn cục — thử lại đại trà sẽ biến các hồi quy thực sự thành những lỗi chập chờn vô hình:

| Runner           | Chính sách                                                                                                                                                     | Lý do                                                                                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` chỉ trong CI, với `trace: on-first-retry`                                                                                                         | Thời gian của trình duyệt/mạng thực sự không mang tính tất định; một lần thử lại kèm trace biến lỗi chập chờn thành một artifact có thể chẩn đoán |
| Vitest           | KHÔNG thử lại toàn cục. Một kiểm thử đã được xác nhận là chập chờn sẽ có cấu hình thử lại riêng cho từng kiểm thử (hiển thị trong diff, được xem xét trong PR) | Giữ danh sách cách ly trong repo, không bao giờ thiếu minh bạch                                                                                   |
| node:test (unit) | KHÔNG BAO GIỜ thử lại                                                                                                                                          | Một kiểm thử đơn vị chập chờn là lỗi trong chính kiểm thử đó — hãy sửa nó, đừng chạy lại để cầu may                                               |

Các SLO mục tiêu sau khi có dữ liệu đo từ xa về lỗi chập chờn (WS5.2/5.3): tỷ lệ lỗi chập chờn <1% trên mỗi kiểm thử
(ngưỡng "sửa ngay"), tỷ lệ thành công ≥95% trên mỗi pipeline. Đây là các giá trị tham chiếu trong ngành —
hãy hiệu chỉnh lại dựa trên số liệu đo lường của chính chúng ta.

## Độ trôi ratchet ở cấp bản phát hành (WS5.5, v3.8.49)

Khi một ratchet (kích thước tệp, độ phức tạp, cảnh báo eslint) bị hồi quy trên đầu mút bản phát hành THUẦN TÚY
— tức là SỰ KẾT HỢP của các lần merge gây ra hồi quy, còn không PR riêng lẻ nào tái hiện được
hồi quy trên nhánh của chính nó — việc khắc phục thuộc trách nhiệm của **release captain, thực hiện một lần, trên
nhánh phát hành**: ưu tiên trích xuất/tái cấu trúc; chỉ tái lập baseline khi có mục giải trình
được ghi lại đầy đủ. Không bao giờ đẩy độ trôi do kết hợp sang PR của người đóng góp, và không bao giờ
tái lập baseline theo từng PR (điều đó che giấu các hồi quy thực sự). Trước tiên phải phân biệt nguyên nhân: tái hiện
trạng thái đỏ trên đầu mút thuần túy trong một worktree thăm dò trước khi cho rằng PR của bạn đã gây ra nó.

## Ghi nhận các mức giảm ratchet — chiều đi xuống (#8584)

Ratchet chỉ tự động một nửa, và đó lại là nửa không phù hợp. **Nâng** giới hạn là một
thao tác chỉnh sửa JSON thủ công mất mười giây và là cách nhanh nhất để gỡ chặn một PR đang đỏ.
**Hạ** giới hạn yêu cầu ai đó chạy `--update` và commit kết quả — và trước khi
job `bank-ratchet-shrinks` được đưa vào, không workflow nào thực hiện việc đó. Hệ quả đo được
(2026-07-25): 18 tệp bị đóng băng đã bằng hoặc thấp hơn giới hạn 800 dòng dành cho tệp mới, trường hợp tệ nhất
là 132× (`src/shared/validation/schemas.ts`, 19 dòng nhưng mang giới hạn 2,523); trần
độ phức tạp đã tăng từ `1794 → 2169` qua khoảng 37 ghi chú tái lập baseline, với đúng một
lần giảm (−1); và câu "siết lại qua `--update` trong chu kỳ tiếp theo" đã được viết 31 lần nhưng chỉ được
thực hiện một lần. Một giới hạn tồn tại lâu hơn đoạn mã từng khiến nó được thiết lập sẽ âm thầm biến mọi
đợt phân rã đã hoàn tất thành dư địa tăng trưởng cho người tiếp theo chỉnh sửa tệp.

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** khép kín vòng lặp đó:

|           |                                                                                                                         |
| --------- | ----------------------------------------------------------------------------------------------------------------------- |
| Chạy khi  | `schedule` (3×/ngày) + `workflow_dispatch` — chủ ý **không** chạy khi `push`                                            |
| Đo lường  | `release/vX.Y.Z` cao nhất, cùng cơ chế phân giải + biện pháp bảo vệ chống chèn như `release-green`                      |
| Ghi       | `check:file-size --update` và `check:complexity-ratchets --update` (theo thiết kế, cả hai chỉ có thể giảm)              |
| Xác minh  | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                                |
| Phân phối | một PR luôn được cập nhật theo trạng thái mới nhất nhắm vào nhánh phát hành — được force-update, không bao giờ gây spam |

Việc ghi nhận được thực hiện theo lô thay vì theo mỗi lần push vì nó không có yêu cầu về độ trễ (mức giảm
được ghi nhận trong vòng 8 giờ là chấp nhận được), trong khi chạy theo từng lần merge sẽ liên tục dựng lại nhánh PR
trong các chiến dịch merge và phải trả chi phí cho một lượt quét ESLint đầy đủ mỗi lần. Việc phát hiện vẫn diễn ra khi
push (`release-green`); chỉ việc ghi nhận mới được thực hiện theo lô.

### Bộ xác minh an toàn

Job ghi vào các baseline mà không có người giám sát, vì vậy `verify-ratchet-bank.mjs` là yếu tố giúp
việc đó trở nên chấp nhận được. Nó tạo diff giữa cây sau `--update` và `HEAD`, đồng thời **hủy job
trước khi bất kỳ commit nào tồn tại** — không mở PR — trừ khi mọi thay đổi đều thuộc một trong các trường hợp sau:

- một mục số `frozen` / `testFrozen` được **hạ xuống** hoặc **xóa**
- `complexity-baseline.json` → `count` được **hạ xuống**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` được **hạ xuống**

Mọi thay đổi khác đều thất bại: nâng một con số, thêm một mục, thay đổi `cap`/`testCap`, hoặc
xóa/viết lại ghi chú `_rebaseline_*` (các ghi chú đó là dấu vết kiểm toán giải thích lý do tồn tại của từng
mức trần và được lưu bên trong cùng đối tượng `frozen` với các mục tệp).
Một bot có thể nâng giới hạn sẽ còn tệ hơn hiện trạng. Biện pháp bảo vệ chống hồi quy:
`tests/unit/verify-ratchet-bank.test.ts`.

Job không bao giờ push lên `release/*` — một người sẽ merge PR, vì vậy phép đo sai
không thể được đưa vào mà chưa qua xem xét.

## Chính sách danh sách cho phép

Mọi cổng kiểm tra không thể thất bại do các vi phạm đã tồn tại từ trước đều sử dụng một danh sách cho phép cố định
(ví dụ: `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Chính sách như sau:

**Khắc phục nguyên nhân gốc rễ; chỉ sử dụng danh sách cho phép khi vi phạm đã tồn tại từ trước và
không thể được khắc phục trong cùng PR.**

Khi thêm một mục vào danh sách cho phép:

1. Bao gồm một chú thích nêu rõ lý do.
2. Tham chiếu đến issue theo dõi (ví dụ: `// #3498 — Tính năng Giai đoạn 2, chưa được triển khai`).
3. Xóa mục đó trong cùng PR khắc phục vi phạm — một mục lỗi thời không còn
   bỏ qua vi phạm đang tồn tại thì bản thân nó cũng là một lỗi (cơ chế thực thi-phát hiện-mục-lỗi-thời 6A.3
   sẽ khiến cổng thất bại khi gặp một mục danh sách cho phép mồ côi sau khi được triển khai).

**Không** thêm các mục vào danh sách cho phép để giúp các bài kiểm thử vượt qua nhanh hơn. Một cổng xanh đi kèm
danh sách cho phép ngày càng dài chỉ tạo ra cảm giác sai lầm về chất lượng.

### Khi một cổng thất bại trên PR của bạn

1. **Đọc kỹ đầu ra của cổng** — đầu ra cho bạn biết chính xác tệp hoặc ký hiệu nào đã vi phạm
   quy tắc.
2. **Khắc phục vi phạm** — hầu hết các cổng là những phép kiểm tra hệ thống tệp có tính xác định và sẽ vượt qua ngay khi
   mã đã chính xác.
3. **Nếu vi phạm đã tồn tại từ trước** (tức là bạn không tạo ra vi phạm đó nhưng giờ đây cổng
   mới kiểm tra nó): hãy thêm một mục vào danh sách cho phép kèm theo chú thích giải thích lý do và một issue theo dõi.
4. **Nếu cổng là một cơ chế ratchet** (độ bao phủ, cảnh báo ESLint, trùng lặp, độ phức tạp):
   thay đổi của bạn đã làm chỉ số trở nên xấu hơn. Hãy khắc phục vấn đề gốc rễ, hoặc (hiếm khi) chạy
   `npm run quality:ratchet -- --update` nếu thay đổi là có chủ đích và mức suy giảm
   của chỉ số là chấp nhận được — nhưng hãy ghi rõ lý do trong phần mô tả PR.
5. **Các cổng tư vấn** (`continue-on-error: true`) chỉ mang tính cung cấp thông tin — chúng không chặn
   việc hợp nhất nhưng sẽ xuất hiện trong bản tóm tắt CI. Dù vậy, hãy khắc phục chúng.

---

## Thêm một cổng mới

1. Tạo `scripts/check/check-<name>.mjs` (hoặc `.ts`). Các cổng chính sách thoát với mã 0/1.
   Các cổng kiểu ratchet xuất một chỉ số vào `quality-metrics.json` thông qua `collect-metrics.mjs`.
2. Thêm `"check:<name>": "node scripts/check/check-<name>.mjs"` vào `package.json`.
3. Kết nối cổng đó trong `.github/workflows/ci.yml` dưới job phù hợp
   (chính sách → `lint` hoặc `docs-sync-strict`; ratchet → `quality-gate`).
4. Nếu cổng có danh sách cho phép, hãy áp dụng `reportStaleEntries()` từ
   `scripts/check/lib/allowlist.mjs` để các mục lỗi thời được tự động phát hiện.
5. Viết một bài kiểm thử trong `tests/unit/build/` bao quát logic phát hiện của cổng.
6. Cập nhật tài liệu này (thêm một hàng vào bảng job liên quan).

---

## Công cụ cho agent: LSP-in-the-loop (tùy chọn)

Ngoài các cổng CI, OmniRoute còn cung cấp một bộ khung `agent-lsp` **tùy chọn**
(một `.mcp.json` ở cấp dự án, Fase 7 Task 15). Tạo `.mcp.json`
để cung cấp máy chủ ngôn ngữ TypeScript cho các agent lập trình, nhờ đó chúng phân giải các ký hiệu /
chẩn đoán **trước khi** viết mã — một công cụ đồng hành theo nguyên tắc biên dịch-trước-khi-tuyên-bố dành cho
`typecheck:core`, giúp loại bỏ lỗi "ký hiệu bịa đặt" ngay từ nguồn. Công cụ này được chủ ý
không tự động tải (bạn tự chọn và xác minh cầu nối MCP↔LSP); một mục cấu hình bị lỗi chỉ ghi nhật ký
lỗi kết nối và không bao giờ làm gián đoạn các phiên làm việc.

---

## Danh sách tồn đọng cần hợp lý hóa (rà soát ROI — Giai đoạn 9 Đợt 3)

Danh mục này đã được đối chiếu với `ci.yml` vào ngày 2026-06-17 (phiên bản trước đã bỏ sót
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Quá trình rà soát ROI của tập hợp đã đối chiếu
xác định các ứng viên hợp lý hóa sau đây. **Các mục hợp nhất là thay đổi CI mang tính
cơ học; việc chuyển đổi/loại bỏ là các quyết định chính sách dành cho người vận hành.** Chưa có
nội dung nào dưới đây được áp dụng.

**Ngoài ra còn chưa được ghi lại ở trên** (mang tính tư vấn, tín hiệu thấp): tác vụ `docs-lint`
(markdownlint + Vale, toàn bộ tác vụ dùng `continue-on-error`) và các quy trình quét độc lập
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` có trong
`quality-baseline.json` nhưng chưa được kết nối với một cơ chế chốt chặn tăng dần có tính ngăn chặn trong `ci.yml` — chỉ số này
hiện đang bị bỏ rời.

### Hợp nhất / khử trùng lặp (mang tính cơ học, rủi ro thấp hơn)

Mỗi ứng viên đã được xác thực dựa trên trạng thái cổng kiểm soát thực tế vào ngày 2026-06-17 (tin tưởng nhưng phải xác minh);
một số phép hợp nhất “hiển nhiên” hóa ra lại che giấu nợ kỹ thuật và **không** thể thay thế trực tiếp một cách an toàn.

- **`check:docs-sync` chạy hai lần** — chạy độc lập trong tác vụ `lint` và chạy lại bên trong `check:docs-all` (`docs-sync-strict`) cũng như hook pre-commit của husky. ✅ **ĐÃ XONG** — đã loại bỏ lệnh gọi độc lập trong `lint`.
- **Quét CVE** — ❌ **KHÔNG thể hợp nhất một cách an toàn.** `audit:deps` dừng với lỗi cứng khi có bất kỳ CVE mức cao/nghiêm trọng nào; `check:vuln-ratchet` (osv) chỉ thất bại khi có _hồi quy_ so với đường cơ sở (hiện có 1 MODERATE). Ngữ nghĩa khác nhau — loại bỏ `audit:deps` sẽ làm mất cổng kiểm soát tuyệt đối cho mức cao/nghiêm trọng. Giữ cả hai.
- **Phát hiện chu trình** — ✅ **ĐÃ XONG** (#15159 G-01/G-02). Nội dung cũ ở đây gọi `check:cycles` là cổng kiểm soát “xanh, được tuyển chọn” và biện minh cho việc duy trì trạng thái ngăn chặn của nó vì `check:circular-deps` (dpdm) báo cáo 91 chu trình. Trạng thái xanh đó là **xanh giả**: `check:cycles` quét 5 thư mục con (450 tệp), chỉ khớp với `import|export … from` tĩnh và loại bỏ mọi specifier `@/` cùng `@omniroute/open-sse/`, nên không thể thấy các chu trình dynamic-import + alias chiếm ưu thế trong kho mã. Đã khắc phục: cổng kiểm soát giờ duyệt `src` + `open-sse` (5023 tệp), thu thập các specifier từ TypeScript AST (do đó `import("…")` được tính còn `typeof import("…")` ở vị trí kiểu thì không) và phân giải `paths` của tsconfig. Nó tìm thấy **14** chu trình, không phải 0. Vì 14 chu trình tồn tại từ trước không thể được khắc phục trong một PR cổng kiểm soát, `check:cycles` hiện là một **cơ chế chốt chặn tăng dần** (`--ratchet`, mức trần `metrics.cycles.value = 14` trong `quality-baseline.json`, `direction: down`) — nó chặn mọi _hồi quy_ và số lượng chỉ có thể giảm. CI chạy `npm run check:cycles:ratchet`. Việc giảm dần được thực hiện cùng với **A-01**. `check:circular-deps` (dpdm) vẫn mang tính tư vấn như một ý kiến thứ hai có phạm vi rộng hơn.
- **Độ phức tạp** — ✅ **ĐÃ XONG** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): một lượt duyệt ESLint, đếm theo ruleId để các đường cơ sở cyclomatic+max-lines và cognitive vẫn độc lập; từng lệnh `check:complexity` / `check:cognitive-complexity` vẫn được giữ lại cho `--update` cục bộ.
- **Chống ảo giác `/api`** — ✅ **ĐÃ XONG** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): một lần kiểm kê hệ thống tệp của `src/app/api`, openapi-routes + docs-symbols vẫn báo cáo độc lập; các lệnh riêng lẻ vẫn được giữ lại để chạy cục bộ.
- **`check:node-runtime` chạy trong 11 tác vụ** — ⚠️ **ROI thấp.** Mỗi tác vụ dùng một runner riêng và phép kiểm tra mất <1 giây; tổng mức tiết kiệm khoảng 10 giây, nhưng đổi lại sẽ mất một cơ chế bảo vệ rẻ tiền cho từng tác vụ. Không đáng để gây xáo trộn.
- **`typecheck:noimplicit:core` trong lint CI** — ✅ **đã loại bỏ khỏi tác vụ lint** (trước đây mang tính tư vấn với `continue-on-error`); bề mặt kiểu có tính ngăn chặn là `typecheck:core` + `check:type-coverage`. Script cục bộ vẫn được giữ lại.

### Chuyển đổi / quyết định (chính sách của người vận hành)

- `check:openapi-security-tiers` (mang tính tư vấn) — ❌ **KHÔNG thể chuyển đổi trực tiếp một cách an toàn.** Nó thoát với mã 0 nhưng cảnh báo rằng một số route `traffic-inspector` bên dưới `LOCAL_ONLY_API_PREFIXES` thiếu chú thích `x-loopback-only: true`. Muốn thực thi bắt buộc, trước tiên phải thêm các chú thích đó vào `openapi.yaml`.
- `typecheck:noimplicit:core` (mang tính tư vấn) — phần lớn đã được cơ chế chốt chặn tăng dần có tính ngăn chặn `check:type-coverage` bao hàm. Chuyển thành cơ chế chốt chặn tăng dần hoặc loại bỏ lượt chạy `tsc` thứ hai bị trùng lặp.
- `test:vitest:ui` (hiện **có tính ngăn chặn**) — các lỗi tồn tại từ trước được loại trừ rõ ràng trong `vitest.config.ts` bằng các chú thích theo dõi `// #8618`; lỗi mới sẽ khiến tác vụ thất bại.
- `check:secrets` (gitleaks, cơ chế chốt chặn tăng dần có tính ngăn chặn được cố định ở 3 trường hợp dương tính giả đã được ghi lại) — đưa 3 trường hợp này vào danh sách cho phép để đạt 0, hoặc hạ xuống thành tư vấn. Trùng lặp với tính năng quét bí mật gốc của GitHub + `check:public-creds`.
- `check:pr-evidence` (có tính ngăn chặn, dùng grep trên văn bản phần thân PR) — nguy cơ dương tính giả cao; nếu loại bỏ sẽ làm suy yếu việc thực thi Quy tắc Cứng #18, vì vậy đây thực sự là một quyết định chính sách.
- `semgrep` (quy trình độc lập mang tính tư vấn) — trùng lặp với CodeQL đối với các nhóm OWASP; kết nối đường cơ sở của nó với một cơ chế chốt chặn tăng dần hoặc loại bỏ.

---

## Tài liệu liên quan

- Chuỗi cung ứng (nguồn gốc, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — cổng kiểm tra tính tương đương của tập khóa

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, tác vụ `i18n-ui-coverage`).
So sánh tập khóa lá của từng tệp `src/i18n/messages/<locale>.json` với `en.json` và báo lỗi
khi có bất kỳ khóa lá nào bị thiếu hoặc dư, bất kể khóa đó được thêm vào lúc nào. Các phần giữ chỗ
`__MISSING__:` được tính là hiện diện (nội dung của chúng thuộc phạm vi xử lý của cổng tỷ lệ). Đây
là phần bổ sung tuyệt đối cho hai cổng dựa trên khác biệt/tỷ lệ phần trăm: `check-ui-keys-coverage`
áp dụng ngưỡng tối thiểu 80 % cho mỗi locale (thiếu 43 khóa trong tổng số ~13.000 vẫn cho kết quả
99,7 %), còn `check-new-key-coverage` chỉ đánh giá các khóa mà một PR thêm vào `en.json`. Một lô
locale được tạo từ phiên bản `en.json` tại thời điểm nhánh của lô được tách ra và được dịch trong
nhiều ngày trong khi nhánh cơ sở vẫn tiếp tục thêm khóa; bản thân PR của lô không thêm khóa nào,
vì vậy cả hai cổng cùng loại đều không phát hiện khi lô 1 (#13044) được hợp nhất trong tình trạng
thiếu 43 khóa ở chín locale và lô 2 (#13660) thiếu 10 khóa ở tám locale (2026-09-15). Khắc phục
lỗi đỏ bằng `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; một khóa lá
`extra` có nghĩa là nguồn đã loại bỏ khóa đó — hãy xóa nó khỏi locale. `--warn` chỉ báo cáo mà
không làm tác vụ thất bại. `--catalog=cli` chạy phép so sánh tương tự trên `bin/cli/locales`
(`npm run i18n:check-keys:cli`); cả hai bước đều nằm trong tác vụ `i18n-ui-coverage`.

#### `check-new-key-coverage` — cổng i18n cho khóa mới

Cổng cùng loại với `check-ui-value-drift`. Cổng kia phát hiện một giá trị tiếng Anh đã được
**viết lại** trong khi các bản dịch của nó không được cập nhật; cổng này phát hiện một khóa
tiếng Anh đã được **thêm vào** trong khi một số locale chưa bao giờ nhận được khóa đó.

`check-ui-keys-coverage` không thể phát hiện trường hợp này: nó áp dụng một ngưỡng tỷ lệ phần trăm
cho mỗi locale, và việc thiếu mười một khóa trong tổng số ~13.000 vẫn để độ bao phủ ở mức 99,9%.
Tỷ lệ phần trăm theo từng ngôn ngữ không thể biểu thị rằng "tính năng này được phát hành mà chưa
được dịch" — toàn bộ một tính năng có thể được đưa vào một locale mới mà không có văn bản nào,
nhưng con số vẫn không thay đổi.

Sự cố được mã hóa thành quy tắc này: Giai đoạn 3 của Orchestration Canvas đã dịch mười một khóa
của mình trên 42 locale tồn tại vào thời điểm đó. Vài giờ sau, lô ngôn ngữ EU (#13044) đã nâng
kho mã nguồn lên 51 locale, nhưng chín locale mới (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`,
`sr`) không bao giờ nhận được các khóa đó. `deepMergeFallback` thay thế một khóa bị thiếu bằng
tiếng Anh, vì vậy biểu hiện lỗi là giao diện người dùng chưa được dịch thay vì giao diện trống —
một lỗi có thật và vốn dĩ không phát ra cảnh báo.

Tương tự cổng cùng loại, cổng này **nhận biết khác biệt**, bằng cách so sánh tiếng Anh tại merge
base với cây làm việc, nhờ đó các khoảng trống đã tồn tại từ trước được giữ nguyên và không cần
di chuyển dữ liệu để bật cổng.

**Một dấu `__MISSING__:<english>` không đáp ứng yêu cầu (kể từ 2026-09-17).** Trước đây, đây là
cơ chế trì hoãn được ghi trong tài liệu — lúc chạy, hệ thống sẽ dự phòng về tiếng Anh chính xác —
cho đến khi tám PR tính năng vào 2026-09-16 thêm 61 khóa và gắn dấu này vào cả 65 locale thay vì
dịch: cổng này đã chấp nhận tất cả, không có gì chặn các PR, rồi cổng tỷ lệ bản dịch thực bắt buộc
đã thất bại tại đầu mút bản phát hành đối với tất cả mọi người (pt-BR 3,2 % > 2,5 % + 0,5). Giờ
đây một dấu được đánh giá là bản dịch bị thiếu. Khắc phục lỗi đỏ bằng
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, hoặc
xử lý song song tất cả locale bằng `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, an toàn khi chạy detached, từ chối khởi động nếu thiếu biến
môi trường `OMNIROUTE_TRANSLATION_*`). Một khóa bắt buộc phải giữ nguyên tiếng Anh (tên sản phẩm/
engine/flag được cố định) phải nằm trong `scripts/i18n/untranslatable-keys.json`, tuyệt đối không
được ẩn sau một dấu. `vi` cấm hoàn toàn các dấu này
(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — cổng kiểm tra các bài kiểm thử bị tạm gác

Một tệp nằm trong danh sách `exclude` của `vitest.config.ts` là một bài kiểm thử không được chạy,
nhưng đối với người đọc cây mã nguồn thì nó trông như thể vẫn góp phần vào độ bao phủ. Sáu mươi
hai tệp đã tích tụ phía sau chú thích
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Vấn đề #8618 đã được đóng vào
2026-08-11 trong khi danh sách mà nó theo dõi tăng từ 45 lên 62 mục, mỗi mục mới đều kế thừa một
chú thích trỏ đến một vấn đề đã đóng. Cuối cùng, khi danh sách được đo lường theo từng tệp (#13204),
**51 trong số 62 tệp đã vượt qua trên cây mã nguồn hiện tại mà không cần thay đổi mã nguồn nào**.

Cổng này yêu cầu mọi mục loại trừ phân giải thành một tệp thực phải (a) nêu rõ vấn đề theo dõi và
(b) xuất hiện trong `config/quality/vitest-exclusions.json` cùng với trạng thái đã đo lường, để việc
thêm một mục trở thành một khác biệt có thể xem xét trong tệp chuyên dụng thay vì chỉ là thêm một
dòng nữa vào mảng có 60 mục. Cổng chủ ý không chạy lại các bài kiểm thử bị loại trừ — việc đó tốn
khoảng 10 phút và thuộc về một tác vụ định kỳ; bản kiểm kê ghi lại thời điểm mỗi bài được đo lường
lần gần nhất.
