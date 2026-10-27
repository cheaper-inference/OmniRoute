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

## Danh mục gate và các profile thực thi

### Tiếp nhận ứng viên

Mỗi workflow CI và Quality Gates đều đưa ra một kết luận ổn định: `Gate / CI` và
`Gate / Quality`. Chính sách tiếp nhận có phiên bản của chúng liệt kê mọi job thượng nguồn
là bắt buộc hoặc mang tính tư vấn. Một job bắt buộc áp dụng được phải thành công: các kết quả
thiếu, bị hủy, bị bỏ qua, đang chờ xử lý và không xác định không thể xác lập PASS. Một phân loại
hợp lệ chỉ có tài liệu hoặc chỉ có danh mục có thể khiến một lane mã không áp dụng;
PR nháp không phải là ứng viên được chấp nhận. Nhãn `hotfix` không miễn trừ yêu cầu bằng chứng.

Cả hai workflow đều bao phủ các PR vào nhánh main/release, các lượt push lên `main`, kích hoạt thủ công
và các sự kiện merge-group. Push, dispatch và merge-group chạy toàn bộ lựa chọn. Các lượt push lên
`release/**` không khởi chạy chúng (2026-10-18): mỗi thay đổi đã chạy ma trận trên PR tương ứng
và tổ hợp sau khi merge là nhiệm vụ của Release-Green (`docs/ops/RUNNER_BOX.md` → Lane được lưu trữ). Các fork
và merge group sử dụng runner được lưu trữ cho những job vốn sẽ chọn runner tự lưu trữ;
phải xác minh đủ dung lượng được lưu trữ trước khi triển khai.

Mỗi biên nhận JSON xác định SHA đã checkout, lượt chạy workflow và lần thử.
CLI từ chối khi SHA của checkout/sự kiện không khớp. Các bài kiểm thử workflow liên kết thành viên chính sách
với danh sách `needs` của job kết luận để một lane mới hoặc bị xóa không thể âm thầm biến mất.
Các biên nhận chỉ bao phủ workflow của chính chúng, không bao gồm việc phát hành, triển khai hoặc phần nội bộ
của một trình quét tư vấn hiện có. Việc kích hoạt cả hai tên kiểm tra trong quy tắc nhánh là
một thay đổi quản trị riêng biệt; chỉ thêm các job này không tự bảo vệ nhánh.

### Bằng chứng được lưu giữ trong bộ rút gọn chấp nhận

`scripts/quality/validate-release-acceptance.mjs` rút gọn một kế hoạch được cung cấp và các
manifest của kế hoạch đó; nó không xác lập rằng kế hoạch bao phủ toàn bộ pipeline phát hành.
Các báo cáo của nó đặt rõ ràng `releaseAcceptance: false`, ngay cả khi kế hoạch đó là
`VERIFIED`. Workflow `release-acceptance.yml` vẫn sử dụng fixture mô phỏng, không phải
biên nhận build, package, khởi động hoặc thăng cấp thực tế.

CLI yêu cầu `--evidence-root` để xác minh bằng chứng được lưu giữ. Các tệp được phân giải
theo dạng `<evidence-root>/<artifact_id>/<member>` và được băm bằng SHA-256. Một bản ghi PASS
không có bằng chứng, tệp bị thiếu hoặc bị thay đổi, đường dẫn không an toàn hoặc liên kết tượng trưng sẽ ngăn cản
việc xác minh. Tệp bị thiếu không tương đương với nhật ký thành công rỗng. Các bước kiểm tra
SHA/lượt chạy/lần thử hiện có vẫn độc lập: byte khớp không thể cứu một biên nhận lỗi thời.
Tính toàn vẹn của tệp không phải là bằng chứng về tính xác thực của quá trình thực thi hoặc việc thăng cấp artifact.

### Năng lực thực thi UI

CI chạy toàn bộ danh mục UI dưới dạng bốn shard ma trận `test-vitest`, mỗi shard có tối đa
hai worker và thời hạn job 15 phút hiện có. Shard đầu tiên cũng chạy bộ Vitest
MCP/autoCombo. Kết quả job bắt buộc bao phủ mọi nhánh ma trận; lỗi
hoặc việc hủy một shard không thể xác lập việc tiếp nhận ứng viên.

Trình quan sát chạy hằng đêm lưu giữ một biên nhận ứng viên chính xác riêng biệt cho từng shard UI,
bao gồm việc thực thi MCP trong biên nhận đầu tiên. Cả bốn biên nhận, nhật ký và
danh tính thực thi khớp nhau đều là bắt buộc. `npm run test:vitest:ui` cục bộ vẫn chọn
toàn bộ bộ kiểm thử; một lượt chạy `--shard` chỉ là bằng chứng một phần.

### Thu thập độ bao phủ unit

Mười hai shard unit thu thập độ bao phủ V8 trong quá trình thực thi kiểm thử hiện có. Một shard
thành công chạy `scripts/ci/compact-v8-coverage.mjs` để nén các tệp gốc mà không tạo
báo cáo Istanbul trung gian. Job Coverage cuối cùng xác minh toàn bộ mười hai manifest dựa trên
SHA ứng viên, runtime, thư mục gốc mã nguồn và các hàm băm dữ liệu, sau đó chạy các reporter của c8 và
các ngưỡng độ bao phủ hiện có. Đầu vào giữ nguyên thứ tự tên tệp toàn cục của c8; việc hợp nhất trước
theo từng shard không an toàn đối với độ bao phủ hỗn hợp function/block. Shard bị thiếu, sai định dạng hoặc
không tương thích khiến việc tiếp nhận thất bại. Các shard kiểm thử thất bại lưu riêng độ bao phủ chẩn đoán thô;
dữ liệu đó không thể tham gia lần hợp nhất cuối cùng.

### Danh mục quét tĩnh

Danh mục npm-alias có phiên bản và thành viên quét tĩnh nằm trong
`config/quality/gate-manifest.json`. Chạy `npm run check:gate-manifest` để xác thực
tên script và lệnh chính xác dựa trên `package.json`; việc thêm, xóa và
sai lệch lệnh khiến cả hook cục bộ lẫn các job phân loại thay đổi trong CI đều thất bại.
Một alias không phải là job workflow, phiên bản ma trận hoặc trường hợp kiểm thử: không được
trình bày các số lượng này như thể chúng có thể hoán đổi cho nhau.

Dùng `npm run quality:scan -- --list` hoặc `npm run quality:scan:fast -- --list`
để kiểm tra các alias đã chọn mà không thực thi chúng. Runner gọi
điểm vào npm, vì vậy runtime của nó (bao gồm Bun tại nơi được cấu hình) được giữ nguyên.
Manifest ghi nhận các alias bên ngoài những profile đó là được gọi riêng, và
các lệnh bảo trì bị cấm trong profile quét chỉ đọc.

Các profile này chỉ bao phủ quét tĩnh. Chúng không chứng nhận các bài kiểm thử sản phẩm,
độ bao phủ, đóng gói, kiểm tra bên ngoài hoặc toàn bộ quy trình chấp nhận phát hành của ứng viên.
Việc tiếp nhận của workflow sử dụng `config/quality/admission-policy.json` được liên kết và
`scripts/quality/admission-verdict.mjs`. Các profile release-observer vẫn tách biệt;
hãy kiểm tra độc lập các bước kiểm tra và biên nhận áp dụng của chúng. Các lệnh tĩnh của trình quan sát đầy đủ
được khai báo trong `config/quality/release-green-static-profile.json`, bao gồm
`audit:deps`, lựa chọn kiểm thử đột biến và kiểm tra bản dịch. Trình nạp xác thực các lệnh npm
dựa trên package.json và các khai báo CI/Quality đã được mô hình hóa; nó từ chối sai lệch
thay vì thực thi các token shell dưới dạng đối số. Đầu ra SKIP/INCOMPLETE của trình quét bắt buộc
không thể xác lập PASS. Profile ghi nhận các phần loại trừ bên ngoài và không thay thế
bằng chứng độ bao phủ được lưu trữ, ma trận kiểm thử, package hoặc triển khai. Danh mục dạng văn xuôi bên dưới
là tài liệu tham khảo, không phải bằng chứng cho thấy một gate thực sự đã chạy.

Các script nằm trong `scripts/check/` (gate chính sách) và `scripts/quality/` (công cụ ratchet).
Nguồn sự thật của CI là `.github/workflows/ci.yml`.

### Đường dẫn nhanh cho PR phát hành (`quality.yml`)

`.github/workflows/quality.yml` bổ sung cho CI trên các PR vào main/release, các lần đẩy lên `main`,
kích hoạt thủ công và các nhóm hợp nhất. PR sử dụng các bước kiểm tra nhanh được lọc theo đường dẫn. Bản dựng trùng lặp bị
vô hiệu hóa vĩnh viễn đã được loại bỏ; các bước kiểm tra bản dựng/đóng gói/khởi động thực tế vẫn còn trong CI.

| Tác vụ                                           | Phạm vi                                                                                                                                                                                                                                         | Chặn            |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `Docs Gates (fast-path)`                         | PR tài liệu/mã nguồn; tham chiếu tài liệu API và docs-all                                                                                                                                                                                       | Có              |
| `Fast Quality Gates`                             | PR mã nguồn; kiểm tra tĩnh, kiểm tra kiểu, kiểm tra kiểu dashboard, các bài kiểm thử đơn vị chịu ảnh hưởng                                                                                                                                      | Có              |
| `Forgotten sibling tests`                        | PR mã nguồn; truy vết các mô-đun đã thay đổi đến các thành phần sử dụng tĩnh và bài kiểm thử sibling tiềm năng; các đường dẫn barrel và nhập động được báo cáo dưới dạng chẩn đoán khuyến nghị, cùng với các ngoại lệ allowlist được tham chiếu | **Khuyến nghị** |
| `Vitest (fast-path)`                             | PR mã nguồn; bộ kiểm thử vitest nhanh                                                                                                                                                                                                           | Có              |
| `Unit Tests fast-path`                           | PR mã nguồn; bộ kiểm thử đơn vị gồm 4 shard                                                                                                                                                                                                     | Có              |
| `No new ESLint warnings`                         | PR mã nguồn; hàng rào lint có nhận biết các mục vô hiệu hóa                                                                                                                                                                                     | Có, kể cả fork  |
| `Merge integrity (changelog + generated skills)` | PR không phải bản nháp; đồng bộ changelog và skill được tạo                                                                                                                                                                                     | Có, kể cả fork  |

#### Báo cáo Forgotten sibling tests

`npm run check:forgotten-sibling-tests` tái sử dụng trình phân giải import đứng sau bản đồ tác động của kiểm thử.
Đối với mỗi mô-đun production đã thay đổi, tác vụ này báo cáo các chuỗi xác định
`changed module/symbol -> static consumer -> candidate sibling test` khi bài kiểm thử tiềm năng
không có trong phần diff của pull request. Bản tóm tắt Markdown và kết quả JSON được lưu giữ dưới dạng
artifact quy trình làm việc `forgotten-sibling-tests` để hiệu chỉnh trước khi triển khai dưới dạng bước chặn.

Các lần tái xuất barrel và import động chỉ là chẩn đoán phân giải; chúng không bao giờ tạo ra một
phát hiện có tính chặn. Các ngoại lệ đã được xem xét nằm trong
`config/quality/forgotten-sibling-allowlist.json`. Mỗi mục phải nêu rõ thành phần sử dụng và bài kiểm thử
tiềm năng, đưa ra lý do cụ thể và liên kết đến một issue hoặc pull request trên GitHub. Các mục sai định dạng sẽ
bị từ chối theo nguyên tắc fail-closed. Ngoại lệ không thể loại trừ một bài kiểm thử tiềm năng đã bị xóa hoặc một diff thêm `.skip`/`.todo`;
việc làm suy yếu assertion và các hình thức che giấu khác vẫn thuộc trách nhiệm của hàng rào chặn độc lập
`check:test-masking`.

### Tác vụ: `lint`

Chạy trên mọi PR vào `main`. Chặn hợp nhất khi thất bại.

| Script (`npm run ...`)            | Xác thực                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Chặn                                        |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | Phiên bản Node.js nằm trong phạm vi được hỗ trợ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Có                                          |
| `check:cycles`                    | Các import vòng trên toàn bộ `src/` + `open-sse/` (dựa trên AST, đã phân giải `paths` của tsconfig). Lệnh cơ bản thoát với mã 1 bất cứ khi nào tồn tại chu trình (đóng khi lỗi kể từ #15281) và liệt kê các SCC. `check:cycles:ratchet` (lệnh CI chạy) sẽ chặn khi số lượng vượt quá mức trần `metrics.cycles` trong `quality-baseline.json` — hiện là 14, `direction: down`, vì vậy giá trị này chỉ có thể giảm (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Có (ratchet)                                |
| `check:boundary`                  | Mức liên kết `open-sse → src`: các import duy nhất từ tệp đến tệp, từ engine vào ứng dụng (`scripts/quality/measure-boundary.mjs`; danh sách cạnh là backlog khắc phục cho việc tách core/module v4). Lệnh cơ bản = báo cáo tư vấn (giống `quality:boundary`). `check:boundary:ratchet` (lệnh CI chạy, cũng nằm trong vòng lặp ratchet fast-gates của `quality.yml`) sẽ chặn khi số lượng vượt quá mức trần `metrics.boundaryOpenSseToSrc` trong `quality-baseline.json` — được khởi tạo ở giá trị đo được là 771, `direction: down`; `--update` chỉ giảm giá trị này; tương đối so với nhánh cơ sở trên các PR (`--base-ref`, xem bên dưới)                                                                                                                                                                                                                                                                                                                                                      | Có (ratchet)                                |
| `check:route-validation:t06`      | Các schema Zod hiện diện trên tất cả các route (chính sách Cấp 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Có                                          |
| `check:any-budget:t11`            | Số lượng `@ts-expect-error // any` không vượt quá ngân sách (cổng kiểm soát Tier 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Có                                          |
| `check:provider-consistency`      | Mọi nhà cung cấp trong `providers.ts` đều có mục tương ứng trong `providerRegistry.ts` (và ngược lại, trong phạm vi danh sách cho phép)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Có                                          |
| `check:model-lifecycle`           | Ba bảng định tuyến được duy trì thủ công luôn nhất quán với bản chụp vòng đời đã được đưa vào kho mã nguồn (#11503): `FITNESS_TABLE` (`taskFitness.ts`) không chấm điểm bất kỳ id đã ngừng hoạt động nào mà `REGISTRY` có thể định tuyến; mọi đích của `BUILT_IN_ALIASES` đều có trong `REGISTRY` và không có trong bản chụp id đã ngừng hoạt động; mọi id đã ngừng hoạt động nhưng vẫn còn trong `REGISTRY` đều được chuyển tiếp hoặc được liệt kê trong `allowedRetiredInCatalog`; và không có nguồn hoặc đích nào của `DEFAULT_DEGRADATION_MAP` xuất hiện dưới dạng đã ngừng hoạt động trong bản chụp đó. Điều này không chứng minh rằng một mô hình hiện đang được cung cấp bởi một dịch vụ thượng nguồn đang hoạt động. Ngoại tuyến — so sánh với `config/quality/model-lifecycle.json`, được làm mới thủ công bằng `npm run quality:refresh-model-lifecycle` (cần mạng; không được tích hợp vào CI). `allowedRetiredInCatalog` là một cơ chế siết dần: chỉ thêm mục khi có vấn đề theo dõi. | Có                                          |
| `check:fetch-targets`             | Mọi `fetch("/api/...")` trong `src/` phía máy khách đều phân giải đến một `route.ts` thực sự                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Có                                          |
| `check:deps`                      | Tất cả phần phụ thuộc có thể cài đặt bằng `npm install` trong mọi `package.json` của kho mã nguồn đều có trong `dependency-allowlist.json`; các gói mới không được ghim phiên bản hoặc có tên dễ bị chiếm dụng sẽ bị gắn cờ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Có                                          |
| `audit:deps`                      | Kiểm tra bảo mật npm đối với cả năm tệp khóa độc lập (gốc, Electron, plugin OpenCode v1/v2 và nhà cung cấp). Các cảnh báo nghiêm trọng sẽ chặn; các cảnh báo mức cao vẫn hiển thị dưới dạng cảnh báo. Các lần kiểm tra bị thiếu/thất bại được đánh dấu là INCOMPLETE và sẽ chặn; hàm băm của tệp khóa và báo cáo theo từng phạm vi được lưu giữ.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Có                                          |
| `check:lockfile`                  | Tính toàn vẹn của `package-lock.json` — registry https, hàm băm toàn vẹn, không ghi đè máy chủ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Có                                          |
| `check:licenses`                  | Danh sách cho phép giấy phép SPDX dành cho các dependency production                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Có                                          |
| `check:tracked-artifacts`         | Không có artifact bản dựng / symlink `node_modules` đã commit (cũng chạy trong pre-commit của husky; pre-push được chủ ý giữ ở mức nhẹ — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Có                                          |
| `check:ai-attribution`            | Không có trailer `Co-Authored-By` của AI/bot hoặc phần chân trang cho biết nội dung do AI tạo trong các commit, tiêu đề hoặc nội dung PR — Quy tắc cứng #16 (trong vòng lặp cổng kiểm tra nhanh của `quality.yml` cho PR→`release/**` — đọc payload sự kiện, không thực hiện thao tác ngoài PR — và một bước chỉ dành cho PR trong bước lint của `ci.yml` đối với PR→`main`; cũng áp dụng trong hook `commit-msg` của husky; cho phép đồng tác giả là con người; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:vitest-exclusions`         | Mỗi mục loại trừ Vitest phải nêu một issue theo dõi và xuất hiện trong `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Có                                          |
| `check:file-size`                 | Các tệp nguồn (`.ts`/`.tsx` trong `src/`, `open-sse/`, `electron/`, `bin/`) phải nằm trong giới hạn `cap` và các tệp kiểm thử (`*.test.ts(x)`) trong giới hạn `testCap`; các tệp bị đóng băng trong `file-size-baseline.json` (`frozen` / `testFrozen`) không được tăng vượt quá kích thước đã ghi nhận                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Có                                          |
| `check:error-helper`              | Phản hồi lỗi trong executor/handler sử dụng `buildErrorBody()` / `sanitizeErrorMessage()` (Quy tắc bắt buộc #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Có                                          |
| `check:migration-numbering`       | Các tệp SQL migration được đánh số tuần tự, không có khoảng trống hoặc số trùng lặp                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Có                                          |
| `check:public-creds`              | Không có giá trị OAuth `client_id`/`client_secret` hoặc khóa Firebase Web dạng ký tự cố định bên ngoài `publicCreds.ts` (Quy tắc bắt buộc #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Có                                          |
| `check:db-rules`                  | Không có SQL thô bên ngoài các module `src/lib/db/`; không có barrel import từ `localDb.ts` (Quy tắc bắt buộc #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Có                                          |
| `check:known-symbols`             | Các executor của nhà cung cấp, chiến lược định tuyến và trình chuyển đổi được đăng ký trong bảng điều phối tương ứng phải khớp với các tệp trên đĩa — không có symbol mồ côi hoặc chưa được khai báo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Có                                          |
| `check:route-guard-membership`    | Mọi route tạo tiến trình con đều được phân loại bởi `isLocalOnlyPath()` (Quy tắc bắt buộc #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Có                                          |
| `check:test-discovery`            | Mọi tệp `*.test.ts` / `*.spec.ts` trong repo đều được ít nhất một trình chạy kiểm thử thu thập (ratchet: danh sách tệp mồ côi trong `test-discovery-baseline.json` chỉ có thể thu hẹp)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Có                                          |
| `check:test-tla-order`            | Không có tệp `node:test` nào trong `tests/unit` đăng ký một bài kiểm thử, gặp một `await` ở cấp cao nhất, rồi tiếp tục đăng ký thêm (#18045; ratchet: `test-tla-order-allowlist.json` chỉ có thể thu hẹp)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Có                                          |
| `check:agent-skills-sync`         | Các artifact agent-skills đã tạo khớp với danh mục nguồn của chúng (không sai lệch)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:provider-asset-provenance` | Logo/tài nguyên của nhà cung cấp có mục thông tin nguồn gốc được ghi lại                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `lint:json`                       | Các tệp cấu hình JSON được phân tích cú pháp thành công và đáp ứng các quy tắc lint của repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `typecheck:core`                  | Biên dịch TypeScript không có lỗi (chỉ có cảnh báo mang tính khuyến nghị)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Có                                          |
| `typecheck:noimplicit:core`       | `noImplicitAny` nghiêm ngặt — hướng tới tương lai; nhiều vị trí gọi có sẵn vẫn cần chú thích                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | **Khuyến nghị** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` được giới hạn trong `src/app/(dashboard)/**` (#7033) — danh sách cho phép gồm 27 tệp đã được chọn lọc của `typecheck:core` không bao gồm bất kỳ tệp TSX nào của dashboard, và `next build` cũng không bao giờ kiểm tra kiểu cho chúng (`next.config.mjs` đặt `ignoreBuildErrors: true`), vì vậy các lỗi hồi quy về định danh không còn được tham chiếu tại đó (#6625/#6909) không bị CI phát hiện. So sánh chênh lệch với đường cơ sở cố định về số lượng theo từng tệp/từng mã TS (`config/quality/dashboard-typecheck-baseline.json`, cùng mẫu thực thi kiểm tra lỗi thời như `check:known-symbols`) — chỉ các lỗi MỚI vượt quá số lượng trong đường cơ sở mới khiến cổng kiểm tra thất bại; hạ dần đường cơ sở bằng `--update` khi một lỗi tồn tại từ trước được sửa.                                                                                                                                                                                                                    | Có                                          |

### Tác vụ: `quality-gate`

Chạy sau `test-coverage`. Chặn hợp nhất khi thất bại.

| Tập lệnh                     | Nội dung xác thực                                                                                                                                                                               | Chặn                                        |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `quality:collect`            | Xuất `quality-metrics.json` (số lượng cảnh báo ESLint, độ bao phủ từ báo cáo phân đoạn đã hợp nhất)                                                                                             | Có (đầu vào của cơ chế điều chỉnh tăng dần) |
| `quality:ratchet`            | Mỗi chỉ số trong `quality-baseline.json` không bị suy giảm (cảnh báo ESLint ≤ đường cơ sở; độ bao phủ ≥ đường cơ sở)                                                                            | Có                                          |
| `check:duplication`          | Mức độ trùng lặp mã (jscpd@4) không vượt quá đường cơ sở trong `quality-baseline.json`                                                                                                          | Có                                          |
| `check:complexity`           | Độ phức tạp cyclomatic ở cấp tệp không vượt quá giới hạn (các quy tắc ESLint cốt lõi `complexity` + `max-lines-per-function`)                                                                   | Có                                          |
| `check:cognitive-complexity` | Cơ chế điều chỉnh tăng dần độ phức tạp nhận thức (`eslint-plugin-sonarjs`) — một lượt ESLint riêng; CI chạy cả hai, được hợp nhất thành một bước `check:complexity-ratchets` duy nhất           | Có                                          |
| `check:dead-code`            | Cơ chế điều chỉnh tăng dần đối với tệp / mục xuất không được sử dụng (knip) không bị suy giảm so với đường cơ sở                                                                                | Có                                          |
| `check:compression-budget`   | Ngân sách điểm chuẩn nén — mức tiết kiệm token tối thiểu của từng công cụ không được suy giảm                                                                                                   | Có                                          |
| `check:type-coverage`        | Cơ chế điều chỉnh tăng dần tỷ lệ phần trăm được định kiểu (`type-coverage`) không bị suy giảm; phần lớn bao hàm `typecheck:noimplicit:core`                                                     | Có                                          |
| `check:codeql-ratchet`       | Số lượng cảnh báo CodeQL đang mở không tăng (đọc qua `gh api`; bỏ qua an toàn khi không có token) — về tần suất làm mới và kích hoạt thủ công: xem "Cơ chế điều chỉnh tăng dần CodeQL" bên dưới | Có                                          |

### Tác vụ: `quality-extended`

Tác vụ này chặn các ứng viên áp dụng. Kích thước gói, các phát hiện về bí mật, các phát hiện
lỗ hổng, các phát hiện trong quy trình làm việc và các thay đổi OpenAPI được kiểm tra bằng
các cơ chế điều chỉnh tăng dần bắt buộc. Chẩn đoán phụ thuộc vòng vẫn chỉ mang tính tư vấn.
Việc cài đặt trình quét là bắt buộc:
`scripts/ci/install-quality-scanners.sh` cung cấp các phiên bản được cố định và lan truyền
lỗi cài đặt. Công cụ bị thiếu, báo cáo không hợp lệ hoặc đường cơ sở bị thiếu sẽ khiến
cổng trình quét bắt buộc ở trạng thái INCOMPLETE.

| Script                   | Xác thực                                                                                                                                                                                                                                                          | Chặn                                                |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `check:circular-deps`    | Không có phụ thuộc vòng (dpdm)                                                                                                                                                                                                                                    | **Khuyến nghị**                                     |
| `check:bundle-size`      | Kích thước bundle không vượt quá giới hạn; không đo được sẽ bị coi là thất bại                                                                                                                                                                                    | **Chặn với --ratchet**                              |
| `check:secrets`          | Các phát hiện của Gitleaks không tăng thêm; các lượt quét bắt buộc sẽ từ chối khi thiếu công cụ/mã nguồn/đường cơ sở, quét thất bại hoặc báo cáo không hợp lệ                                                                                                     | **Chặn với --ratchet**                              |
| `check:vuln-ratchet`     | Các lỗ hổng phụ thuộc không tăng thêm; các lượt quét bắt buộc sẽ từ chối khi thiếu công cụ, báo cáo không hợp lệ hoặc thiếu đường cơ sở                                                                                                                           | **Chặn với --ratchet**                              |
| `check:workflows`        | Kiểm tra workflow (actionlint + zizmor); trình quét bị thiếu/hỏng, báo cáo không hợp lệ hoặc thiếu đường cơ sở ratchet sẽ thất bại với trạng thái INCOMPLETE. Các phát hiện hợp lệ tuân theo chính sách nghiêm ngặt/khuyến nghị/ratchet đã chọn                   | Bắt buộc thực thi; ratchet của zizmor chặn trong CI |
| `check:openapi-breaking` | Kiểm tra hợp đồng API công khai dựa trên các commit được ghim theo sự kiện (merge-base của PR, trạng thái trước khi push, cơ sở của merge-group; với lịch chạy/thủ công thì dùng parent đầu tiên của checkout); phép đo bắt buộc sẽ thất bại theo nguyên tắc đóng | **Chặn với --ratchet**                              |

### Công việc: `docs-sync-strict`

Đối với pull request vào `main` hoặc `release/**`, job này chỉ chạy cho các ứng viên không phải bản nháp (hoặc thuộc hàng đợi tin cậy), được phân loại là thay đổi tài liệu hoặc mã nguồn. Job cũng chạy trên các sự kiện CI không phải PR; trình kích hoạt push của workflow này chỉ áp dụng cho `main`, không áp dụng cho `release/**`. Bước kết thúc với mã khác 0 sẽ chặn job; các phát hiện chỉ để báo cáo và các ngoại lệ được ghi rõ bên dưới không chặn job.

| Script                         | Xác thực                                                                                                                                                                                                                                                                                                                                                        | Chặn                                                                                                       |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-gate chạy tuần tự 7 cổng con bên dưới                                                                                                                                                                                                                                                                                                                      | Có                                                                                                         |
| ↳ `check:docs-sync`            | Tính nhất quán về phiên bản giữa package/OpenAPI/CHANGELOG, các bản sao chính xác của `llm.txt`, các bất biến về phần/kích thước của CHANGELOG đã dịch và việc không còn các tài liệu trùng lặp đã được thay thế                                                                                                                                                | Có                                                                                                         |
| ↳ `check:docs-frontmatter`     | Các trang tài liệu đã biên dịch có tiêu đề frontmatter hợp lệ                                                                                                                                                                                                                                                                                                   | Có                                                                                                         |
| ↳ `check:docs-counts`          | Các bất biến số lượng có độ tin cậy cao được kiểm tra nghiêm ngặt; các kiểm tra số lượng tệp dựa trên heuristic chỉ cảnh báo trừ khi script nhận `--strict` (meta-gate của CI không truyền cờ này)                                                                                                                                                              | Cấp nghiêm ngặt chặn; cấp mềm chỉ mang tính khuyến nghị                                                    |
| ↳ `check:env-doc-sync`         | Các biến môi trường được đọc trong mã nguồn, `.env.example` và `docs/reference/ENVIRONMENT.md` thống nhất sau khi áp dụng các danh sách ngoại lệ rõ ràng ignore, doc-only và env-only                                                                                                                                                                           | Có, ngoài các danh sách ngoại lệ đã ghi rõ                                                                 |
| ↳ `check:deprecated-versions`  | Báo cáo các phiên bản có thể đã cũ ngoài những ngữ cảnh lịch sử an toàn và các ngày cập nhật đã cũ, loại trừ các tài liệu bị bỏ qua                                                                                                                                                                                                                             | Chỉ mang tính khuyến nghị trong cấu hình CI hiện tại (không truyền `--strict`)                             |
| ↳ `check:doc-links`            | Các liên kết markdown nội bộ trong tài liệu phân giải thành tệp thực (`[text]`/`(path)` form)                                                                                                                                                                                                                                                                   | Có                                                                                                         |
| ↳ `check:fabricated-docs`      | Các route, biến môi trường, lệnh CLI, tên hook và đường dẫn tệp được viện dẫn trong tài liệu phải tồn tại trong codebase. Cổng cứng thông qua `--strict`; thất bại mềm khi không có cờ.                                                                                                                                                                         | Có (thông qua `--strict` trong CI)                                                                         |
| `check:cli-i18n`               | Các khóa `t()` mà CLI sử dụng tồn tại trong `en`; `pt-BR` giữ mọi phần cấp cao nhất; `zh-CN` và `zh-TW` chứa mọi khóa từ `en`                                                                                                                                                                                                                                   | Có                                                                                                         |
| `check:openapi-coverage`       | Đặc tả OpenAPI bao phủ ít nhất mức sàn được điều chỉnh bằng ratchet của các route thực                                                                                                                                                                                                                                                                          | Có                                                                                                         |
| `check:openapi-security-tiers` | Các chú thích `x-loopback-only`/`x-always-protected` đã khai báo phải có cơ sở trong `routeGuard.ts`; lỗi bộ phân tích và các sai lệch trong kiểm tra thuận sẽ chặn. Kiểm tra ngược về việc thiếu `x-loopback-only` dưới các tiền tố chỉ dành cho truy cập cục bộ đưa ra cảnh báo; các route chỉ được xác định bằng mẫu được loại khỏi lượt kiểm tra ngược này. | Bộ phân tích/kiểm tra thuận chặn; kiểm tra ngược chỉ mang tính khuyến nghị                                 |
| `check:openapi-routes`         | Mỗi đường dẫn `/api...` trong `openapi.yaml` phân giải thành một route thực, không phụ thuộc vào khác biệt tham số, sau khi áp dụng danh sách ngoại lệ `KNOWN_STALE_SPEC` có lý do; các mục ngoại lệ đã cũ cũng làm kiểm tra thất bại                                                                                                                           | Có                                                                                                         |
| `check:docs-symbols`           | Các tham chiếu URL nội bộ `/api/...` trong tài liệu chuẩn không phải bản sao phân giải thành một route thực hoặc một nhóm route; các tham chiếu proxy/upstream/placeholder/tệp và các mục `KNOWN_STALE_DOC_REFS` có lý do được loại trừ, còn các mục ngoại lệ đã cũ làm kiểm tra thất bại                                                                       | Có                                                                                                         |
| `i18n translation drift`       | Hash nguồn/đích của bộ tài liệu dịch cốt lõi khớp với `.i18n-state.json`. PR chỉ thất bại khi có sai lệch mới phát sinh ở nguồn, thiếu bản dịch đích hoặc sai lệch hash đích; các kiểm tra không phải PR áp dụng chế độ nghiêm ngặt. Sai lệch có sẵn mà PR kế thừa và hash nguồn của các bản dịch đích đã cũ chỉ tạo cảnh báo.                                  | Sai lệch mới trong PR/kiểm tra nghiêm ngặt ngoài PR chặn; sai lệch kế thừa/đã cũ chỉ mang tính khuyến nghị |

Mười hai SVG của README trong `docs/diagrams/` được sinh bằng `scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` sinh lại tất cả.
Mỗi tệp có một kiểm thử đơn vị so sánh từng byte (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`), sẽ thất bại khi tệp đã commit bị lỗi thời.
`check:docs-counts` đọc các số liệu chuẩn từ những nút `<text>` của chúng, vì vậy các chữ số không bao giờ được chuyển thành đường viền dạng path.
Phép kiểm tra số liệu chuẩn của SVG đọc các tệp liệt kê trong `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, `public/images/tier-flow-dark.svg`, `tier-flow-light.svg`.
Các phép kiểm tra khẳng định về nhà cung cấp miễn phí vĩnh viễn, mục danh mục, pool định kỳ và yếu tố chấm điểm cũng đọc `promise-pillars.svg`, `free-tier-budget.svg`, `strategies-grid.svg`.
`free-tier-budget.svg` lấy số liệu từ bộ nạp danh mục hiện tại, nên thay đổi `FREE_MODEL_BUDGETS` hoặc tên hiển thị của nhà cung cấp sẽ khiến CI thất bại cho đến khi tệp đó được sinh lại.

### Công việc: `i18n-ui-coverage`

| Script                            | Xác thực                                                                                                                                                                                           | Chặn            |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (inline) | Độ bao phủ khóa i18n của UI đạt ≥ 65%                                                                                                                                                              | Có              |
| `check-ui-value-drift` (inline)   | Một **giá trị** tiếng Anh được viết lại không để lại bản dịch lỗi thời nào                                                                                                                         | Có              |
| `check-new-key-coverage` (inline) | Một khóa tiếng Anh **mới** được dịch trong mọi locale — dấu `__MISSING__:` sẽ bị từ chối                                                                                                           | Có              |
| `check-translation-ratio`         | Tỷ lệ bản dịch thực tế theo từng locale (giống tiếng Anh / phần giữ chỗ / thiếu các lá nằm ngoài danh sách cho phép) không được vượt quá `config/quality/i18n-translation-baseline.json` + biên độ | **Khuyến nghị** |

Cần `fetch-depth: 0` — cổng kiểm tra độ lệch giá trị so sánh khác biệt của `en.json` với merge base.

#### `check-ui-value-drift` — cổng kiểm tra bản dịch lỗi thời

Phát hiện một kiểu hồi quy i18n mà các cổng khác không thể nhận biết về mặt cấu trúc: một giá trị tiếng Anh
được viết lại nhưng các bản dịch bắt nguồn từ tiếng Anh _trước đó_ vẫn còn nguyên, khiến
người dùng không dùng tiếng Anh tiếp tục đọc nội dung có vẻ chắc chắn nhưng giờ đã sai.

Điều này đã thực sự được phát hành. `oauthModal.googleOAuthWarning` đã được viết lại khi trình trợ giúp đăng nhập
Antigravity được đưa vào (#5203); **39 trong số 43 locale** vẫn giữ nội dung yêu cầu người vận hành "sao chép
URL đầy đủ và dán vào bên dưới" — một quy trình không thể hoàn tất với nhà cung cấp đó. Vấn đề này
không được phát hiện cho đến #8463 vì:

- `sync-ui-keys` chỉ điền bù các khóa **không tồn tại**, không bao giờ xử lý các khóa **lỗi thời**;
- `check-ui-keys-coverage` đếm sự _hiện diện_ của khóa, nên một bản dịch lỗi thời vẫn được tính là đã bao phủ;
- `check-translation-drift` theo dõi các bản sao tài liệu `docs/i18n/<locale>/**.md` —
  nó không bao giờ đọc `src/i18n/messages/*.json`. Chặn trong job `docs-sync-strict` kể từ lần đồng bộ lại
  2026-09: chỉnh sửa tài liệu cốt lõi → `npm run i18n:run -- --files=<doc>` (theo từng mục, ít tốn tài nguyên).

**Nhận biết khác biệt, không dựa trên baseline.** Nó so sánh `en.json` tại merge base với
working tree; với mọi khóa có giá trị tiếng Anh thay đổi, bất kỳ locale nào vẫn giữ một
bản dịch chưa được chỉnh sửa đều bị coi là lỗi thời. Cách này chủ ý **đóng băng khoản nợ tồn đọng** — một diff
không thể cho biết bản dịch lâu đời bắt nguồn từ phiên bản tiếng Anh cũ nào, vì vậy cổng kiểm tra
chỉ đánh giá những gì thay đổi hiện tại tác động đến. Phương án thay thế (baseline hàm băm theo từng khóa) sẽ tạo ra
một tệp sinh tự động khoảng 600 KB, lớn gấp 3 lần baseline hiện có lớn nhất và thay đổi liên tục trong mọi PR i18n.

Có hai cách để đáp ứng yêu cầu:

1. cập nhật các bản dịch bị ảnh hưởng, hoặc
2. đặt chúng thành `__MISSING__:<new english>` — khi đó runtime sẽ cung cấp nội dung tiếng Anh đã sửa
   (`src/i18n/request.ts::deepMergeFallback`, #7258) và khóa sẽ được đưa vào hàng đợi dịch.

Nếu **ý nghĩa** của chuỗi đã thay đổi, hãy ưu tiên **đổi tên khóa**: một khóa mới không thể kế thừa
bản dịch lỗi thời. Đây là mẫu mà #8463 đã sử dụng.

```bash
npm run i18n:check-value-drift          # nghiêm ngặt (CI chạy chế độ này)
npm run i18n:check-value-drift:warn     # chỉ báo cáo
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Thoát với mã 0 cùng `SKIP reason=base-unresolved` khi không thể đọc catalog cơ sở (bản clone nông
không có base ref), tương tự `check-openapi-breaking`.

### Job: `i18n`

Ma trận xác thực i18n đầy đủ (một job cho mỗi locale). Toàn bộ job mang tính khuyến nghị.

| Script                          | Xác thực                                   | Chặn                                                         |
| ------------------------------- | ------------------------------------------ | ------------------------------------------------------------ |
| `validate_translation.py quick` | Mức độ hoàn chỉnh của bản dịch theo locale | **Khuyến nghị** (`continue-on-error: true` trên toàn bộ job) |

### Job: `pr-test-policy`

Chỉ chạy trên pull request.

| Script                 | Xác thực                                                                                                                                     | Chặn |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| `check:pr-test-policy` | Các PR thay đổi mã production trong `src/`, `open-sse/`, `electron/` hoặc `bin/` phải bao gồm hoặc cập nhật kiểm thử (Quy tắc Cứng #8)       | Có   |
| `check:test-masking`   | Các tệp kiểm thử đã thay đổi không làm giảm tổng số assert ròng hoặc thêm các mệnh đề hiển nhiên `assert.ok(true)`                           | Có   |
| `check:pr-evidence`    | Nội dung PR dẫn chứng bằng chứng kiểm thử/VPS cho thay đổi (cơ giới hóa Quy tắc Cứng #18 bằng cách grep văn bản PR — mong manh, xem Backlog) | Có   |

### Job: `test-vitest`

Chạy sau `build`. Chặn hợp nhất khi thất bại.

| Bộ kiểm thử      | Xác thực                                                             | Chặn                                                                                                           |
| ---------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Máy chủ MCP (110 công cụ), autoCombo, bộ nhớ đệm — trình chạy vitest | Có                                                                                                             |
| `test:vitest:ui` | Kiểm thử thành phần UI — trình chạy vitest                           | **Chặn** — các lỗi đã tồn tại được loại trừ rõ ràng trong `vitest.config.ts`; lỗi mới sẽ khiến tác vụ thất bại |

### Quy trình hằng đêm (theo lịch, mang tính tham khảo)

Các quy trình này chạy theo lịch cron (và `workflow_dispatch`), không bao giờ chạy trên PR. Tất cả đều mang tính tham khảo.

| Quy trình              | Xác thực                                                                                                                                                    | Chặn                    |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `nightly-property`     | Kiểm thử thuộc tính fast-check với seed ngẫu nhiên + số lượt chạy lớn                                                                                       | **Mang tính tham khảo** |
| `nightly-resilience`   | Cổng kiểm soát tăng trưởng heap, chèn lỗi hỗn loạn, kiểm thử tải/độ bền bằng k6                                                                             | **Mang tính tham khảo** |
| `nightly-llm-security` | Cơ chế bảo vệ khỏi injection của promptfoo (chế độ chặn) + các phép dò garak (bỏ qua nếu không có secret của nhà cung cấp)                                  | **Mang tính tham khảo** |
| `nightly-schemathesis` | Fuzzing hợp đồng OpenAPI (schemathesis) trên OmniRoute đang chạy bằng `docs/openapi.yaml` — phát hiện vi phạm đặc tả / lỗi 500 chưa được xử lý (Fase 8 B.4) | **Mang tính tham khảo** |
| `nightly-mutation`     | Điểm kiểm thử đột biến Stryker trên luồng kiểm thử đơn vị nhanh — các đột biến còn tồn tại cho thấy các phép xác nhận yếu                                   | **Mang tính tham khảo** |
| `nightly-compat`       | Ma trận tương thích của Node engine trên các phạm vi `engines.node` được hỗ trợ                                                                             | **Mang tính tham khảo** |

Các đường cơ sở hiệu năng (heap, TTFB, thời gian build) được ghi lại chứ không dùng làm điều kiện chặn: xem [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

Mọi cổng kiểm tra không thể thất bại do các vi phạm đã tồn tại từ trước đều sử dụng một danh sách cho phép được cố định
(ví dụ: `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Chính sách là:

**Khắc phục nguyên nhân gốc; chỉ sử dụng danh sách cho phép khi vi phạm đã tồn tại từ trước và
không thể được khắc phục trong cùng PR.**

Khi thêm một mục vào danh sách cho phép:

1. Bao gồm một chú thích nêu rõ lý do.
2. Tham chiếu đến issue theo dõi (ví dụ: `// #3498 — Phase 2 feature, not yet implemented`).
3. Xóa mục đó trong cùng PR khắc phục vi phạm — một mục lỗi thời không còn
   bỏ qua một vi phạm đang tồn tại tự nó cũng là một lỗi (cơ chế thực thi mục lỗi thời 6A.3 sẽ
   khiến cổng kiểm tra thất bại khi phát hiện một mục mồ côi trong danh sách cho phép sau khi được triển khai).

**Không** thêm các mục vào danh sách cho phép để giúp các bài kiểm thử vượt qua nhanh hơn. Một cổng kiểm tra xanh cùng với một
danh sách cho phép ngày càng dài sẽ tạo ra cảm giác sai lệch về chất lượng.

### Khi một cổng kiểm tra thất bại trên PR của bạn

1. **Đọc kỹ đầu ra của cổng kiểm tra** — đầu ra cho bạn biết chính xác tệp hoặc ký hiệu nào đã vi phạm
   quy tắc.
2. **Khắc phục vi phạm** — hầu hết các cổng kiểm tra là những phép kiểm tra hệ thống tệp mang tính xác định và sẽ vượt qua ngay khi
   mã nguồn chính xác.
3. **Nếu vi phạm đã tồn tại từ trước** (tức là bạn không gây ra vi phạm đó nhưng hiện tại cổng kiểm tra
   đã bao phủ nó): thêm một mục vào danh sách cho phép kèm theo chú thích giải thích lý do và một issue theo dõi.
4. **Nếu cổng kiểm tra là một cơ chế chốt tăng dần** (độ bao phủ, cảnh báo ESLint, mã trùng lặp, độ phức tạp):
   thay đổi của bạn đã làm chỉ số xấu đi. Hãy khắc phục vấn đề cơ bản hoặc (hiếm khi) chạy
   `npm run quality:ratchet -- --update` nếu thay đổi là có chủ đích và mức suy giảm của chỉ số
   là chấp nhận được — nhưng hãy ghi rõ lý do trong phần mô tả PR.
5. **Các cổng kiểm tra mang tính tư vấn** (`continue-on-error: true`) chỉ cung cấp thông tin — chúng không chặn
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

## Danh sách tồn đọng cần tinh gọn (đánh giá ROI — Giai đoạn 9 Đợt 3)

Danh mục này đã được đối soát với `ci.yml` vào ngày 2026-06-17 (phiên bản trước đã bỏ sót
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Việc đánh giá ROI của tập hợp đã đối soát
đã xác định các ứng viên tinh gọn sau đây. **Các thao tác hợp nhất là những thay đổi CI
mang tính cơ học; việc chuyển trạng thái/loại bỏ là các quyết định chính sách dành cho người vận hành.** Chưa có nội dung nào
bên dưới được áp dụng.

**Ngoài ra chưa được ghi lại ở trên** (mang tính tham khảo, tín hiệu thấp): job `docs-lint`
(markdownlint + Vale, toàn bộ job dùng `continue-on-error`) và các workflow quét độc lập
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` có trong
`quality-baseline.json` nhưng chưa được kết nối với một ratchet chặn lỗi trong `ci.yml` — chỉ số này
hiện đang bị tách rời.

### Hợp nhất / loại bỏ trùng lặp (mang tính cơ học, rủi ro thấp hơn)

Mỗi ứng viên đã được xác thực dựa trên trạng thái cổng kiểm soát thực tế vào ngày 2026-06-17 (tin tưởng nhưng vẫn xác minh);
một số thao tác hợp nhất có vẻ "hiển nhiên" hóa ra lại che giấu nợ kỹ thuật và **không** thể thay thế trực tiếp một cách an toàn.

- **`check:docs-sync` chạy hai lần** — chạy độc lập trong job `lint`, rồi chạy lại bên trong `check:docs-all` (`docs-sync-strict`) và hook pre-commit của husky. ✅ **ĐÃ XONG** — đã loại bỏ lần gọi độc lập trong `lint`.
- **Quét CVE** — ❌ **KHÔNG thể hợp nhất một cách an toàn.** `audit:deps` chặn các cảnh báo nghiêm trọng và các lần kiểm tra không hoàn chỉnh trên cả năm lockfile, đồng thời báo cáo các cảnh báo mức cao dưới dạng cảnh báo theo chính sách hiện tại; `check:vuln-ratchet` (osv) chỉ thất bại khi có _sự hồi quy_ so với baseline đã được commit và từ chối các phép đo bị thiếu khi chúng là bắt buộc. Ngữ nghĩa khác nhau — loại bỏ `audit:deps` sẽ làm mất cổng kiểm soát tuyệt đối đối với mức nghiêm trọng và các biên nhận kiểm tra gói độc lập. Giữ cả hai.
- **Phát hiện chu trình** — ✅ **ĐÃ XONG** (#15159 G-01/G-02). Nội dung cũ ở đây gọi `check:cycles` là cổng kiểm soát "xanh, được tuyển chọn" và biện minh cho việc giữ nó ở trạng thái chặn vì `check:circular-deps` (dpdm) báo cáo 91 chu trình. Trạng thái xanh đó là **xanh giả**: `check:cycles` đã quét 5 thư mục con (450 tệp), chỉ khớp với `import|export … from` tĩnh và loại bỏ mọi specifier `@/` cùng `@omniroute/open-sse/`, vì vậy nó không thể phát hiện các chu trình dynamic-import + alias chiếm phần lớn repo. Đã khắc phục: cổng kiểm soát hiện duyệt `src` + `open-sse` (5023 tệp), thu thập specifier từ AST TypeScript (do đó `import("…")` được tính còn `typeof import("…")` ở vị trí kiểu thì không), và phân giải `paths` của tsconfig. Nó tìm thấy **14** chu trình, không phải 0. Vì không thể sửa 14 chu trình tồn tại từ trước trong một PR cổng kiểm soát, `check:cycles` hiện là một **ratchet** (`--ratchet`, ngưỡng trần `metrics.cycles.value = 14` trong `quality-baseline.json`, `direction: down`) — nó chặn mọi _sự hồi quy_ và số lượng chỉ có thể giảm. CI chạy `npm run check:cycles:ratchet`. Việc giảm dần được thực hiện cùng với **A-01**. `check:circular-deps` (dpdm) vẫn mang tính tham khảo như một ý kiến thứ hai có phạm vi rộng hơn.
- **Độ phức tạp** — ✅ **ĐÃ XONG** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): một lượt duyệt ESLint, đếm theo ruleId để các baseline cyclomatic+max-lines và cognitive vẫn độc lập; từng lệnh `check:complexity` / `check:cognitive-complexity` vẫn được giữ lại cho thao tác `--update` cục bộ.
- **Chống bịa đặt `/api`** — ✅ **ĐÃ XONG** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): một lần kiểm kê hệ thống tệp của `src/app/api`, openapi-routes + docs-symbols vẫn báo cáo độc lập; từng lệnh riêng vẫn được giữ lại để chạy cục bộ.
- **`check:node-runtime` chạy trong 11 job** — ⚠️ **ROI thấp.** Mỗi job dùng một runner riêng và bước kiểm tra mất <1 giây; tổng thời gian tiết kiệm khoảng 10 giây, đổi lại là mất một biện pháp bảo vệ rẻ cho từng job. Không đáng để tạo ra biến động.
- **`typecheck:noimplicit:core` trong lint của CI** — ✅ **đã loại bỏ khỏi job lint** (trước đây mang tính tham khảo với `continue-on-error`); bề mặt kiểu có tính chặn là `typecheck:core` + `check:type-coverage`. Script cục bộ vẫn được giữ lại.

### Chuyển trạng thái / quyết định (chính sách của người vận hành)

- `check:openapi-security-tiers` (mang tính tham khảo) — ❌ **KHÔNG thể chuyển trạng thái một cách an toàn.** Nó thoát với mã 0 nhưng cảnh báo rằng một số route `traffic-inspector` thuộc `LOCAL_ONLY_API_PREFIXES` thiếu annotation `x-loopback-only: true`. Muốn thực thi bắt buộc, trước tiên cần thêm các annotation đó vào `openapi.yaml`.
- `typecheck:noimplicit:core` (mang tính tham khảo) — phần lớn đã được ratchet chặn lỗi `check:type-coverage` bao phủ. Chuyển thành ratchet hoặc loại bỏ lượt chạy `tsc` thứ hai bị trùng lặp.
- `test:vitest:ui` (hiện **đang chặn**) — các lỗi tồn tại từ trước được loại trừ rõ ràng trong `vitest.config.ts` bằng các comment theo dõi `// #8618`; lỗi mới sẽ làm job thất bại.
- `check:secrets` (gitleaks, ratchet chặn lỗi) — ngưỡng trần hiện tại là `metrics.secretFindings` trong `quality-baseline.json`. Mọi ngoại lệ đều cần một mục có lý do chính đáng trong `.gitleaks.toml`; phép đo không khả dụng được coi là INCOMPLETE. Quá trình quét này bổ trợ cho tính năng quét bí mật gốc của GitHub và `check:public-creds`.
- `check:pr-evidence` (chặn lỗi, grep nội dung văn xuôi trong phần thân PR) — rủi ro dương tính giả cao; nếu loại bỏ sẽ làm suy yếu việc thực thi Hard Rule #18, vì vậy đây thực sự là một quyết định chính sách.
- `semgrep` (độc lập, mang tính tham khảo) — chồng lấn với CodeQL đối với các nhóm OWASP; kết nối baseline của nó với một ratchet hoặc loại bỏ.

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
