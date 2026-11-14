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

## Hồ sơ thực hiện và kiểm kê cổng

### Tuyển sinh ứng viên

Mỗi quy trình công việc CI và Cổng chất lượng đều đưa ra phán quyết ổn định: `Gate / CI` và `Gate / Quality`. Chính sách tuyển sinh theo phiên bản của họ liệt kê mọi công việc ngược dòng theo yêu cầu hoặc tư vấn. Một công việc bắt buộc phải thành công: các kết quả bị thiếu, bị hủy, bị bỏ qua, đang chờ xử lý và không xác định thì không thể thiết lập PASS. Phân loại chỉ tài liệu hoặc danh mục hợp lệ có thể khiến làn mã không thể áp dụng được; bản nháp PR không phải là ứng cử viên được chấp nhận. Nhãn `hotfix` không từ bỏ bằng chứng.

Cả hai quy trình công việc đều bao gồm PRs vào các nhánh main/release, đẩy tới `main`, gửi thủ công và các sự kiện nhóm hợp nhất. Đẩy, gửi và nhóm hợp nhất chạy toàn bộ lựa chọn. Các lần đẩy tới `release/**` không khởi động chúng (2026-10-18): mỗi thay đổi đã chạy ma trận trên PR của nó và sự kết hợp được hợp nhất là công việc của Release-Green ( làn đường được lưu trữ `docs/ops/RUNNER_BOX.md` → ). Nhóm phân nhánh và hợp nhất sử dụng các trình chạy được lưu trữ cho các công việc mà mặt khác sẽ chọn các trình chạy tự lưu trữ; đủ dung lượng lưu trữ phải được xác minh trước khi triển khai.

Một PR bình thường chạy lựa chọn nhanh. Các làn `full-code` và `full-code-e2e` của chính sách tiếp nhận (E2E, tích hợp, tạo phẩm gói, Electron smoke, Bun SQLite, hệ sinh thái và giao thức khách hàng) chỉ chạy trên bản nháp hàng đợi Hợp nhất hoặc chạy đầy đủ: `gh workflow run ci.yml --ref <branch>`.

Mỗi biên nhận JSON xác định SHA đã kiểm xuất, lần chạy và lần thử quy trình công việc. CLI từ chối checkout/event SHA không khớp. Kiểm tra quy trình làm việc liên kết tư cách thành viên chính sách với danh sách `needs` của công việc phán quyết để làn đường mới hoặc làn đường bị xóa không thể biến mất một cách âm thầm. Biên nhận bao gồm quy trình làm việc của riêng họ, không phải xuất bản, triển khai hoặc nội bộ của máy quét tư vấn hiện có. Kích hoạt cả hai tên kiểm tra trong quy tắc chi nhánh là một thay đổi quản trị riêng biệt; việc thêm những công việc này bản thân nó không bảo vệ một chi nhánh.

### Hợp nhất hàng đợi

Nhãn `queue` gửi PR đến hàng đợi Hợp nhất (`.mergify.yml`). Hợp nhất mở một bản nháp PR trên một nhánh `mergify/merge-queue/`, CI chạy toàn bộ lựa chọn ở đó và PR ban đầu hợp nhất khi `Gate / CI`, `Gate / Quality` và `Merge integrity (changelog + generated skills)` vượt qua.

Hợp nhất ghi tóm tắt hàng đợi của nó vào mô tả của bản nháp và các ứng dụng khác cũng có thể chỉnh sửa nó. Sự kiện `pull_request` `edited` trên bản nháp như vậy có nhóm tương tranh riêng (`-queue-edit-<run_id>`) nên nó không thể hủy quá trình chạy thực sự của bản nháp và nó bỏ qua cổng và ma trận. Chỉ `Merge integrity` vẫn chạy. Công việc cổng bị bỏ qua mang một tên kiểm tra khác, vì Mergify đọc `Gate / CI` bị bỏ qua là kiểm tra không thành công và loại bỏ PR.

Sau một lần dequeue, một lần đẩy không phải lúc nào cũng yêu cầu PR. Bình luận `@mergifyio queue` về nó.

### Bằng chứng được giữ lại trong bộ giảm chấp nhận

`scripts/quality/validate-release-acceptance.mjs` giảm kế hoạch được cung cấp và các bảng kê khai của nó; nó không chứng minh rằng kế hoạch bao trùm toàn bộ quy trình phát hành. Báo cáo của nó đặt rõ ràng `releaseAcceptance: false`, ngay cả khi kế hoạch đó là `VERIFIED`. Quy trình làm việc `release-acceptance.yml` vẫn sử dụng các thiết bị cố định bóng, không phải biên lai xây dựng, gói, khởi động hoặc khuyến mãi thực.

CLI yêu cầu `--evidence-root` xác minh bằng chứng được lưu giữ. Các tệp được phân giải dưới dạng `<evidence-root>/<artifact_id>/<member>` và được băm dưới dạng SHA-256. Bản ghi PASS không có bằng chứng, tệp bị thiếu hoặc bị thay đổi, đường dẫn không an toàn hoặc liên kết tượng trưng sẽ ngăn cản việc xác minh. Tệp bị thiếu không tương đương với nhật ký thành công trống. Kiểm tra SHA/run/attempt hiện tại vẫn độc lập: các byte phù hợp không thể giải cứu biên nhận cũ. Tính toàn vẹn của tệp không phải là bằng chứng về tính xác thực thực thi hoặc quảng cáo tạo phẩm.

### Kiểm kê quét tĩnh

Khoảng không quảng cáo bí danh npm được phiên bản và tư cách thành viên quét tĩnh có trong `config/quality/gate-manifest.json`. Chạy `npm run check:gate-manifest` để xác thực tên tập lệnh và các lệnh chính xác đối với `package.json`; việc bổ sung, xóa và trôi lệnh đều thất bại cả công việc hook cục bộ và công việc phân loại thay đổi trong CI. Bí danh không phải là công việc trong quy trình làm việc, phiên bản ma trận hoặc trường hợp kiểm thử: các số đếm này không được trình bày dưới dạng có thể hoán đổi cho nhau.

Sử dụng `npm run quality:scan -- --list` hoặc `npm run quality:scan:fast -- --list` để kiểm tra các bí danh đã chọn mà không thực thi chúng. Trình chạy gọi điểm vào npm, do đó thời gian chạy của nó (bao gồm cả Bun được định cấu hình) được giữ nguyên. Tệp kê khai ghi lại các bí danh bên ngoài các cấu hình đó dưới dạng được gọi riêng và các lệnh bảo trì bị cấm trong các cấu hình quét chỉ đọc.

Những cấu hình này chỉ bao gồm quét tĩnh. Họ không chứng nhận các thử nghiệm sản phẩm, phạm vi bảo hiểm, bao bì, kiểm tra bên ngoài hoặc sự chấp nhận phát hành hoàn toàn của ứng viên. Việc tiếp nhận quy trình làm việc sử dụng `config/quality/admission-policy.json` và `scripts/quality/admission-verdict.mjs` được liên kết. Hồ sơ người quan sát phát hành vẫn riêng biệt; kiểm tra các séc và biên lai hiện hành của họ một cách độc lập. Các lệnh tĩnh đầy đủ của người quan sát được khai báo trong `config/quality/release-green-static-profile.json`, bao gồm `audit:deps`, lựa chọn kiểm tra đột biến và kiểm tra dịch thuật. Trình tải xác thực các lệnh npm dựa trên các khai báo package.json và CI/Quality được mô hình hóa; nó từ chối sự trôi dạt thay vì thực thi mã thông báo shell làm đối số. Đầu ra SKIP/INCOMPLETE của máy quét được yêu cầu không thể thiết lập PASS. Hồ sơ ghi lại các loại trừ bên ngoài của nó và không thay thế phạm vi bảo hiểm được lưu trữ trên máy chủ, ma trận kiểm tra, gói hoặc bằng chứng triển khai. Kho văn xuôi dưới đây là tài liệu tham khảo, không phải bằng chứng cho thấy một cánh cổng đã thực sự chạy.

Các tập lệnh tồn tại dưới `scripts/check/` (cổng chính sách) và `scripts/quality/` (công cụ bánh cóc). Nguồn sự thật của CI là `.github/workflows/ci.yml`.

### Phát hành đường dẫn nhanh PR (`quality.yml`)

`.github/workflows/quality.yml` bổ sung CI trên main/release PRs, đẩy tới `main`, gửi và hợp nhất các nhóm. PRs sử dụng kiểm tra nhanh được lọc theo đường dẫn. Bản dựng trùng lặp bị vô hiệu hóa vĩnh viễn đã bị xóa; séc build/package/boot thực vẫn ở CI. Bộ đơn vị và vitest chỉ chạy bằng CI (`Unit Tests (N/8)` và `Vitest`).

| Công việc                                        | Phạm vi                                                                                                                                                   | Chặn               |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `Docs Gates (fast-path)`                         | Docs/code PRs; tài liệu API ref và docs-all                                                                                                               | Đúng               |
| `Fast Quality Gates`                             | Mã PRs; kiểm tra tĩnh, kiểm tra đánh máy, kiểm tra đánh máy trên bảng điều khiển, kiểm tra đơn vị bị ảnh hưởng, kiểm tra anh chị em bị lãng quên (tư vấn) |
| `No new ESLint warnings`                         | Mã PRs; bảo vệ lint nhận biết được sự ức chế                                                                                                              | Có, bao gồm cả nĩa |
| `Merge integrity (changelog + generated skills)` | PRs không dự thảo ; đồng bộ hóa thay đổi và kỹ năng được tạo                                                                                              | Có, bao gồm cả nĩa |

#### Báo cáo kiểm tra anh chị em bị lãng quên

`npm run check:forgotten-sibling-tests` chạy như một bước tư vấn của `Fast Quality Gates` và sử dụng lại trình phân giải nhập đằng sau bản đồ tác động thử nghiệm. Đối với mỗi mô-đun sản xuất đã thay đổi, nó sẽ báo cáo các chuỗi `changed module/symbol -> static consumer -> candidate sibling test` xác định khi bài kiểm tra ứng viên không có trong khác biệt yêu cầu kéo. Tóm tắt Markdown và kết quả JSON được giữ lại dưới dạng cấu phần công việc `forgotten-sibling-tests` để hiệu chỉnh trước khi triển khai chặn.

Tái xuất thùng và nhập khẩu động chỉ là chẩn đoán giải quyết; họ không bao giờ tạo ra một phát hiện chặn. Đã xem xét các trường hợp ngoại lệ trực tiếp trong `config/quality/forgotten-sibling-allowlist.json`. Mỗi mục nhập phải nêu tên bài kiểm tra của người tiêu dùng và ứng viên, đưa ra lý do cụ thể và liên kết một vấn đề GitHub hoặc yêu cầu kéo. Các mục không đúng định dạng không đóng được. Các ngoại lệ không thể ngăn chặn một bài kiểm tra ứng viên đã bị xóa hoặc một khác biệt bổ sung `.skip`/`.todo`; khẳng định sự suy yếu và việc che giấu khác vẫn thuộc sở hữu của cổng `check:test-masking` chặn độc lập.

### Công việc: `lint`

Chạy trên mọi PR đến `main`. Khối hợp nhất khi thất bại.

| Kịch bản (`npm run ...`)          | Xác thực                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Chặn                                   |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `check:node-runtime`              | phiên bản Node.js nằm trong phạm vi được hỗ trợ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Đúng                                   |
| `check:cycles`                    | Nhập thông tư trên tất cả `src/` + `open-sse/` (dựa trên AST, tsconfig `paths` đã giải quyết). Bare thoát 1 bất cứ khi nào có bất kỳ chu kỳ nào tồn tại (đóng không thành công kể từ #15281) và liệt kê SCCs. `check:cycles:ratchet` (những gì CI chạy) chặn khi số lượng vượt quá trần `metrics.cycles` trong `quality-baseline.json` — hiện là 14, `direction: down`, vì vậy nó chỉ có thể giảm (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Có (bánh cóc)                          |
| `check:boundary`                  | khớp nối `open-sse → src` : nhập tệp từ tệp này sang tệp duy nhất từ công cụ vào ứng dụng (`scripts/quality/measure-boundary.mjs`; danh sách cạnh là tồn đọng khắc phục v4 core/module-split ). Báo cáo tư vấn = trần (giống như `quality:boundary`). `check:boundary:ratchet` (những gì CI chạy, cũng trong vòng lặp ratchet cổng nhanh `quality.yml` ) chặn khi số lượng vượt quá trần `metrics.boundaryOpenSseToSrc` trong `quality-baseline.json` — được gieo ở mức đo được 771, `direction: down`; `--update` chỉ làm giảm nó; tương đối cơ sở trên PRs (`--base-ref`, xem bên dưới)                                                                                                                                                                                                                                                                                                                                                                                                          | Có (bánh cóc)                          |
| `check:route-validation:t06`      | Lược đồ Zod hiện diện trên tất cả các tuyến (Chính sách cấp 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Đúng                                   |
| `check:any-budget:t11`            | số lượng `@ts-expect-error // any` không vượt quá ngân sách (catraca cấp 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Đúng                                   |
| `check:provider-consistency`      | Mọi nhà cung cấp trong `providers.ts` đều có mục nhập phù hợp trong `providerRegistry.ts` (và ngược lại, trong danh sách cho phép)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Đúng                                   |
| `check:model-lifecycle`           | Ba bảng định tuyến được duy trì bằng tay luôn nhất quán với ảnh chụp nhanh vòng đời đã đăng ký (#11503): `FITNESS_TABLE` (`taskFitness.ts`) không có id đã ngừng hoạt động mà `REGISTRY` có thể định tuyến; mọi mục tiêu `BUILT_IN_ALIASES` đều có trong `REGISTRY` và không có trong ảnh chụp nhanh id đã ngừng hoạt động; mọi id đã nghỉ hưu vẫn còn trong `REGISTRY` đều được chuyển tiếp hoặc liệt kê trong `allowedRetiredInCatalog`; và không có nguồn hoặc mục tiêu `DEFAULT_DEGRADATION_MAP` xuất hiện trong ảnh chụp nhanh đó. Điều này không chứng minh rằng một mô hình hiện đang được phục vụ bởi một tuyến thượng nguồn trực tiếp. — ngoại tuyến so sánh với `config/quality/model-lifecycle.json`, được làm mới bằng tay với `npm run quality:refresh-model-lifecycle` (mạng; không được nối vào CI). `allowedRetiredInCatalog` là một bánh cóc bị cháy: chỉ thêm một mục nhập có vấn đề về theo dõi.                                                                                | Đúng                                   |
| `check:fetch-targets`             | Mọi `fetch("/api/...")` trong `src/` phía máy khách sẽ phân giải thành `route.ts` thực                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Đúng                                   |
| `check:deps`                      | All `npm install`-able deps across every `package.json` in the repo are in `dependency-allowlist.json`; new unpinned or slopsquatted packages flagged                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Đúng                                   |
| `audit:deps`                      | kiểm tra npm của tất cả năm tệp khóa độc lập (root, Electron, OpenCode plugin v1/v2 và nhà cung cấp). Khối tư vấn quan trọng; lời khuyên cao vẫn là cảnh báo rõ ràng. kiểm toán Missing/failed là INCOMPLETE và khối; băm khóa trên mỗi phạm vi và báo cáo được giữ lại.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Đúng                                   |
| `check:lockfile`                  | `package-lock.json` tính toàn vẹn — https đăng ký, băm toàn vẹn, không ghi đè máy chủ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Đúng                                   |
| `check:licenses`                  | danh sách cho phép giấy phép SPDX cho các phụ thuộc sản xuất                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Đúng                                   |
| `check:tracked-artifacts`         | Không có tạo phẩm xây dựng/liên kết tượng trưng `node_modules` đã cam kết (cũng chạy trong cam kết trước husky; đẩy trước là cố ý nhẹ — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Đúng                                   |
| `check:ai-attribution`            | Không có đoạn giới thiệu AI/bot `Co-Authored-By` hoặc chân trang do AI tạo ra trong cam kết PR, tiêu đề hoặc nội dung — Quy tắc cứng #16 (trong vòng lặp cổng nhanh `quality.yml` cho PR→ `release/**` — đọc tải trọng sự kiện, không tắt PRs — và một bước chỉ PR trong `ci.yml` lint cho PR→ `main`; cũng là hook `commit-msg` khàn; cho phép đồng tác giả con người; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:vitest-exclusions`         | Mỗi loại trừ Vitest đặt tên cho một vấn đề theo dõi và xuất hiện trong `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Đúng                                   |
| `check:file-size`                 | Các tệp nguồn (`.ts`/`.tsx` trong `src/`, `open-sse/`, `electron/`, `bin/`) nằm trong `cap` và các tệp kiểm tra (`*.test.ts(x)`) trong `testCap`; các tập tin bị đóng băng trong `file-size-baseline.json` (`frozen` / `testFrozen`) không được vượt quá kích thước đã ghi của chúng                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Đúng                                   |
| `check:error-helper`              | Phản hồi lỗi trong executors/handlers sử dụng `buildErrorBody()` / `sanitizeErrorMessage()` (Quy tắc cứng #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Đúng                                   |
| `check:migration-numbering`       | Các tệp SQL di chuyển được đánh số tuần tự, không có khoảng trống hoặc trùng lặp                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Đúng                                   |
| `check:public-creds`              | Không có khóa Web OAuth `client_id`/`client_secret` hoặc Firebase theo nghĩa đen bên ngoài `publicCreds.ts` (Quy tắc cứng #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Đúng                                   |
| `check:db-rules`                  | Không có SQL thô bên ngoài các mô-đun `src/lib/db/` ; không nhập thùng từ `localDb.ts` (Quy tắc cứng #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Đúng                                   |
| `check:known-symbols`             | Trình thực thi, chiến lược định tuyến và trình dịch của nhà cung cấp đã đăng ký trong bảng điều phối của họ khớp với các tệp trên đĩa — không có ký hiệu mồ côi hoặc không được khai báo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Đúng                                   |
| `check:route-guard-membership`    | Mỗi tuyến đường sinh ra một tiến trình con được phân loại theo `isLocalOnlyPath()` (Quy tắc cứng #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Đúng                                   |
| `check:test-discovery`            | Mỗi tệp `*.test.ts` / `*.spec.ts` trong repo được thu thập bởi ít nhất một người chạy thử nghiệm (ratchet: danh sách mồ côi trong `test-discovery-baseline.json` chỉ có thể thu nhỏ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Đúng                                   |
| `check:test-tla-order`            | Không có tệp `node:test` trong `tests/unit` đăng ký kiểm tra, đạt `await` cấp cao nhất, sau đó đăng ký thêm (#18045; ratchet: `test-tla-order-allowlist.json` chỉ có thể thu nhỏ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Đúng                                   |
| `check:agent-skills-sync`         | Các tạo phẩm kỹ năng của tác nhân được tạo khớp với danh mục nguồn của chúng (không bị trôi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:provider-asset-provenance` | Nhà cung cấp logos/assets có mục nhập xuất xứ được ghi lại                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `lint:json`                       | Tệp cấu hình JSON phân tích cú pháp và đáp ứng các quy tắc repo lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `typecheck:core`                  | biên dịch TypeScript không có lỗi (chỉ cảnh báo tư vấn)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Đúng                                   |
| `typecheck:noimplicit:core`       | `noImplicitAny` — nghiêm ngặt hướng tới tương lai; nhiều trang web cuộc gọi có sẵn vẫn cần chú thích                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | **tư vấn** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` scoped to `src/app/(dashboard)/**` (#7033) — `typecheck:core`'s curated 27-file allowlist does not include any dashboard TSX, and `next build` never type-checks it either (`next.config.mjs` sets `ignoreBuildErrors: true`), so orphaned-identifier regressions there (#6625/#6909) were invisible to CI. Diffs against a frozen per-file/per-TS-code count baseline (`config/quality/dashboard-typecheck-baseline.json`, same stale-enforcement pattern as `check:known-symbols`) — only NEW errors beyond the baselined count fail the gate; ratchet down with `--update` when a pre-existing error is fixed.                                                                                                                                                                                                                                                                                                                                                                            | Đúng                                   |
| `check:build-typecheck`           | Kiểm tra loại sản xuất toàn bộ ứng dụng đối với `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), danh sách cho phép 27 tệp của `typecheck:core` trên bề mặt và cổng trang tổng quan không bao gồm. Khác với `config/quality/build-typecheck-baseline.json`; số lượng mới hoặc tăng lên trên mỗi (tệp, mã) không thành công, số lượng thấp hơn yêu cầu bạn phải ratchet. `--update` từ chối trong khi quá trình chạy chứa cặp mới hoặc cặp nâng cấp trừ khi `--force-regressions` được thông qua và từ chối tệp mới bị tắt tiếng trừ khi `--force-nocheck` được thông qua, do đó, việc mở rộng đường cơ sở để có màu xanh lục và cấp quyền im lặng vĩnh viễn là hai hành động có chủ ý riêng biệt. Một `--force` trần bị từ chối. Đồng thời quét phạm vi xây dựng cho `@ts-nocheck` dựa trên `config/quality/ts-nocheck-baseline.json`, bởi vì một tệp sử dụng nó không báo cáo bất kỳ chẩn đoán nào cả và nếu không thì sẽ vô hình đối với mọi cổng. | Đúng                                   |

#### Hai chương trình đánh máy trả lời khác nhau

`typecheck:core` và `check:build-typecheck` biên dịch các chương trình khác nhau theo các tùy chọn khác nhau và cùng một tệp có thể sạch ở một tệp nhưng lại đầy lỗi ở tệp kia.

`tsconfig.build.json` đặt `"strict": false`, vì vậy `noImplicitAny` bị tắt. Cấu hình lõi biên dịch danh sách cho phép gồm 27 tệp được tuyển chọn với các tùy chọn chặt chẽ hơn và tuân theo biểu đồ nhập của từng mục nhập, do đó, các tệp không bao giờ xuất hiện trong chương trình xây dựng vẫn được kiểm tra ở đó.

Hậu quả quan trọng khi đánh giá liệu một tập tin có được gõ hay không:** chẩn đoán bằng không theo `check:build-typecheck` không có nghĩa là không** . Việc loại bỏ `@ts-nocheck` khỏi 26 tệp cho thấy 23 tệp trong số đó sạch trong chương trình xây dựng; 16 trong số đó nổi lên khoảng 120 lỗi tiềm ẩn trong lỗi nghiêm ngặt. Kiểm tra cả hai trước khi gọi một tập tin sạch.

### Công việc: `quality-gate`

Chạy theo `test-coverage`. Khối hợp nhất khi thất bại.

| Kịch bản                     | Xác thực                                                                                                                                                                      | Chặn                     |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | Phát ra `quality-metrics.json` ( số lượng cảnh báo ESLint, mức độ phù hợp từ báo cáo phân đoạn được hợp nhất)                                                                 | Có (ngược dòng bánh cóc) |
| `quality:ratchet`            | Mỗi số liệu trong `quality-baseline.json` chưa hồi quy (ESLint cảnh báo đường cơ sở ≤ ; đường cơ sở ≥ phù hợp)                                                                | Đúng                     |
| `check:duplication`          | Sao chép mã (jscpd@4) không vượt quá đường cơ sở trong `quality-baseline.json`                                                                                                | Đúng                     |
| `check:complexity`           | Độ phức tạp chu kỳ ở cấp độ tệp không vượt quá giới hạn (lõi ESLint `complexity` + `max-lines-per-function`)                                                                  | Đúng                     |
| `check:cognitive-complexity` | Nhận thức phức tạp ratchet (`eslint-plugin-sonarjs`) — ESLint pass riêng biệt; CI chạy cả hai được hợp nhất thành bước `check:complexity-ratchets` duy nhất                   | Đúng                     |
| `check:dead-code`            | Các tệp xuất / tệp ratchet (knip) không được sử dụng không hồi quy so với đường cơ sở                                                                                         | Đúng                     |
| `check:compression-budget`   | Ngân sách chuẩn nén — sàn tiết kiệm mã thông báo cho mỗi động cơ không được thoái lui                                                                                         | Đúng                     |
| `check:type-coverage`        | Bánh cóc gõ phần trăm (`type-coverage`) không thoái lui; phần lớn bao gồm `typecheck:noimplicit:core`                                                                         | Đúng                     |
| `check:codeql-ratchet`       | Số lượng cảnh báo CodeQL mở không hồi quy (đọc qua `gh api`; bỏ qua duyên dáng mà không cần mã thông báo) nhịp làm mới — và kích hoạt thủ công: xem "CodeQL ratchet" bên dưới | Đúng                     |

### Công việc: `quality-extended`

Toàn bộ công việc là tư vấn (`continue-on-error: true`). Các bánh cóc dựa trên npm chạy thực sự; các máy quét bên ngoài cài đặt qua `gh release download` và tự bỏ qua (thoát 0) khi vẫn không có tệp nhị phân.

| Kịch bản                 | Xác thực                                                                                                                                                                                                                                              | Chặn                                         |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:circular-deps`    | Không có phụ thuộc vòng tròn (dpdm)                                                                                                                                                                                                                   | **tư vấn**                                   |
| `check:bundle-size`      | Kích thước gói không vượt quá giới hạn                                                                                                                                                                                                                | **tư vấn**                                   |
| `check:secrets`          | Quét bí mật (gileaks) — bỏ qua nếu không có nhị phân                                                                                                                                                                                                  | **tư vấn**                                   |
| `check:vuln-ratchet`     | Lỗ hổng phụ thuộc (osv-scanner) không hồi quy — `--ratchet` không thành công như INCOMPLETE (thoát 2) nếu không đo được                                                                                                                               | **tư vấn**                                   |
| `check:workflows`        | Tìm lỗi mã nguồn quy trình làm việc (actionlint + zizmor); máy quét missing/broken, báo cáo không hợp lệ hoặc đường cơ sở bánh cóc bị thiếu không thành công vì INCOMPLETE. Các phát hiện hợp lệ tuân theo chính sách strict/advisory/ratchet đã chọn | Yêu cầu thực hiện; chặn bánh cóc zizmor ở CI |
| `check:openapi-breaking` | Hợp đồng API công khai chống lại các cam kết sự kiện được ghim (PR merge-base, push before, merge-group base; scheduled/manual kiểm tra cha mẹ đầu tiên); phép đo yêu cầu không đóng được                                                             | **Chặn bằng --ratchet**                      |

### Công việc: `docs-sync-strict`

Chạy trên mọi PR đến `main`. Khối hợp nhất khi thất bại.

| Kịch bản                       | Xác thực                                                                                                                                                                | Chặn                               |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `check:docs-all`               | Cổng meta chạy tuần tự 6 cổng phụ bên dưới                                                                                                                              | Đúng                               |
| ↳ `check:docs-sync`            | tính nhất quán của phiên bản CHANGELOG / OpenAPI / llm.txt                                                                                                              | Đúng                               |
| ↳ `check:docs-counts`          | Số lượng trong văn xuôi (số lượng nhà cung cấp, số lượng di chuyển, v.v.) nằm trong cửa sổ bánh cóc của số lượng thực                                                   | Đúng                               |
| ↳ `check:env-doc-sync`         | Mọi env var trong `.env.example` đều được ghi lại trong bảng tài liệu và ngược lại                                                                                      | Đúng                               |
| ↳ `check:deprecated-versions`  | Không có chuỗi phiên bản không được dùng nữa trong tài liệu                                                                                                             | Đúng                               |
| ↳ `check:doc-links`            | Liên kết đánh dấu nội bộ trong tài liệu phân giải thành tệp thực (dạng `[text]`/`(path)` )                                                                              | Đúng                               |
| ↳ `check:fabricated-docs`      | Các tuyến đường, env vars, lệnh CLI, tên hook và đường dẫn tệp được trích dẫn trong tài liệu đều tồn tại trong cơ sở mã. Cổng cứng qua `--strict`; lỗi mềm không có cờ. | Có (thông qua `--strict` trong CI) |
| `check:cli-i18n`               | Chuỗi lệnh CLI có trong tất cả các tệp ngôn ngữ i18n                                                                                                                    | Đúng                               |
| `check:openapi-coverage`       | thông số kỹ thuật OpenAPI bao gồm ít nhất một tầng của các tuyến đường thực                                                                                             | Đúng                               |
| `check:openapi-security-tiers` | Chú thích cấp độ bảo mật trong `openapi.yaml` nhất quán với phân loại `routeGuard.ts`                                                                                   | **tư vấn**                         |
| `check:openapi-routes`         | Mọi đường dẫn trong `openapi.yaml` đều chuyển thành `route.ts` thực (chống ảo giác)                                                                                     | Đúng                               |
| `check:docs-symbols`           | Mọi tham chiếu `/api/...` trong `docs/**/*.md` đều chuyển thành `route.ts` thực (chống ảo giác)                                                                         | Đúng                               |
| `i18n translation drift`       | Các khóa chưa được dịch trong tệp ngôn ngữ i18n — chỉ cảnh báo                                                                                                          | **tư vấn**                         |

Mười hai README SVGs dưới `docs/diagrams/` được tạo ra (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` tái tạo tất cả chúng). Mỗi cái có một bài kiểm tra đơn vị so sánh byte (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) không thành công khi tệp đã cam kết cũ và `check:docs-counts` đọc các số chuẩn từ các nút `<text>` của chúng — đó là lý do tại sao bước phác thảo giữ mọi chuỗi được phác thảo trong tệp dưới dạng ẩn `<text>`. Kiểm tra số chuẩn SVG đọc các tệp được liệt kê trong `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` và `tier-flow-light.svg`; các yêu cầu về yếu tố tính điểm, mục nhập danh mục, nhóm định kỳ và yếu tố tính điểm cũng được đọc là `promise-pillars.svg`, `free-tier-budget.svg` và `strategies-grid.svg`. `free-tier-budget.svg` lấy số liệu từ trình tải danh mục trực tiếp, do đó, thay đổi đối với `FREE_MODEL_BUDGETS` hoặc tên hiển thị của nhà cung cấp sẽ chuyển sang màu đỏ CI cho đến khi tệp đó được tạo lại.

### Công việc: `i18n-ui-coverage`

| Kịch bản                             | Xác thực                                                                                                                                                                                              | Chặn       |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check-ui-keys-coverage` (nội tuyến) | Độ bao phủ của khóa UI i18n là ≥ 65%                                                                                                                                                                  | Đúng       |
| `check-ui-value-drift` (nội tuyến)   | Tiếng Anh được viết lại** giá trị** không để lại bản dịch cũ                                                                                                                                          | Đúng       |
| `check-new-key-coverage` (nội tuyến) | MỘT** mới** Khóa tiếng Anh được dịch sang mọi ngôn ngữ — điểm đánh dấu `__MISSING__:` bị từ chối                                                                                                      | Đúng       |
| `check-translation-ratio`            | Tỷ lệ bản dịch thực trên mỗi ngôn ngữ (giống hệt tiếng Anh / phần giữ chỗ / các trang bị thiếu ngoài danh sách cho phép) không được vượt quá độ trễ `config/quality/i18n-translation-baseline.json` + | **tư vấn** |

Cần `fetch-depth: 0` —, cổng trôi giá trị khác `en.json` so với cơ sở hợp nhất.

#### cổng dịch cũ `check-ui-value-drift` —

Nắm bắt được một hồi quy i18n mà các cổng khác về mặt cấu trúc không thể nhìn thấy: một giá trị tiếng Anh được viết lại và các bản dịch bắt nguồn từ tiếng Anh _previous_ được giữ lại, vì vậy những người dùng không phải tiếng Anh vẫn tiếp tục đọc bản sao có từ ngữ tự tin nhưng giờ đã sai.

Điều này được vận chuyển thực sự. `oauthModal.googleOAuthWarning` được viết lại khi trình trợ giúp đăng nhập Antigravity hạ cánh (#5203);** 39 trên 43 địa phương** giữ văn bản yêu cầu người vận hành "sao chép toàn bộ URL và dán vào bên dưới" — một luồng không thể hoàn thành đối với nhà cung cấp đó. Nó không được chú ý cho đến khi #8463 vì:

- `sync-ui-keys` chỉ chèn lấp các khóa** vắng mặt** , không bao giờ là những cái đó** cũ kỹ** ;
- `check-ui-keys-coverage` đếm khóa _hiện diện_, do đó, bản dịch cũ sẽ được coi là đã được che đậy;
- `check-translation-drift` theo dõi tài liệu `docs/i18n/<locale>/**.md` phản ánh — nó không bao giờ đọc `src/i18n/messages/*.json`. Chặn công việc `docs-sync-strict` kể từ lần đồng bộ hóa lại 2026-09: chỉnh sửa tài liệu cốt lõi → `npm run i18n:run -- --files=<doc>` (cấp phần, giá rẻ).

**Nhận biết khác biệt, không được hỗ trợ cơ bản.** Nó so sánh `en.json` ở cơ sở hợp nhất với cây đang làm việc; đối với mọi khóa có giá trị tiếng Anh thay đổi, bất kỳ ngôn ngữ nào vẫn giữ bản dịch nguyên đều là cũ. Điều này cố tình** đóng băng khoản nợ hiện có** — a diff không thể tiết lộ bản dịch lâu đời đến từ tiếng Anh cổ nào, vì vậy cổng chỉ đánh giá những gì thay đổi hiện tại chạm đến. Giải pháp thay thế (đường cơ sở băm cho mỗi khóa) sẽ tiêu tốn một tệp được tạo ~ 600 KB, 3 × đường cơ sở lớn nhất hiện có, chạy trên mỗi i18n PR.

Hai cách để thỏa mãn nó:

1. cập nhật các bản dịch bị ảnh hưởng, hoặc
2. đặt chúng thành `__MISSING__:<new english>` — trong thời gian chạy, sau đó phục vụ tiếng Anh đã sửa (`src/i18n/request.ts::deepMergeFallback`, #7258) và các hàng đợi chính để dịch.

Nếu chuỗi của** nghĩa** đã thay đổi, thích hơn** đổi tên chìa khóa** : khóa mới không thể kế thừa bản dịch cũ. Đó là mẫu #8463 được sử dụng.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Thoát 0 với `SKIP reason=base-unresolved` khi không thể đọc được danh mục cơ sở (bản sao nông không có tham chiếu cơ sở), phản chiếu `check-openapi-breaking`.

### Công việc: `i18n`

Ma trận xác thực i18n đầy đủ (một công việc cho mỗi ngôn ngữ). Toàn bộ công việc là tư vấn.

| Kịch bản                        | Xác thực                               | Chặn                                                           |
| ------------------------------- | -------------------------------------- | -------------------------------------------------------------- |
| `validate_translation.py quick` | Tính đầy đủ của bản dịch theo ngôn ngữ | **tư vấn** (`continue-on-error: true` trong toàn bộ công việc) |

### Công việc: `pr-test-policy`

Chỉ chạy trên các yêu cầu kéo.

| Kịch bản               | Xác thực                                                                                                                                         | Chặn |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---- |
| `check:pr-test-policy` | PRs thay đổi mã sản xuất trong `src/`, `open-sse/`, `electron/` hoặc `bin/` phải bao gồm hoặc cập nhật các thử nghiệm (Quy tắc cứng #8)          | Đúng |
| `check:test-masking`   | Các tệp kiểm tra đã thay đổi không làm giảm số lượng xác nhận ròng hoặc thêm các tautology `assert.ok(true)`                                     | Đúng |
| `check:pr-evidence`    | nội dung PR trích dẫn bằng chứng test/VPS cho sự thay đổi (cơ giới hóa #18 Quy tắc cứng bằng cách grepping PR văn xuôi — mong manh, xem Backlog) | Đúng |

### Công việc: `test-vitest`

Chạy theo `build`. Khối hợp nhất khi thất bại.

| Suite            | Xác thực                                              | Chặn                                                                                                                    |
| ---------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | máy chủ MCP (110 công cụ), autoCombo, bộ đệm — vitest | Đúng                                                                                                                    |
| `test:vitest:ui` | kiểm tra thành phần UI — vitest Á hậu                 | **Chặn** Các lỗi tồn tại từ trước — được loại trừ rõ ràng trong `vitest.config.ts`; thất bại mới làm thất bại công việc |

### Quy trình làm việc hàng đêm (theo lịch trình, tư vấn)

Chúng chạy theo lịch trình cron (và `workflow_dispatch`), không bao giờ chạy trên PRs. Tất cả đều mang tính chất tư vấn.

| Quy trình làm việc     | Xác thực                                                                                                                                                                          | Chặn       |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `nightly-property`     | kiểm tra nhanh thuộc tính với số lần chạy cao + hạt giống ngẫu nhiên                                                                                                              | **tư vấn** |
| `nightly-resilience`   | cổng tăng trưởng đống, tiêm lỗi hỗn loạn, k6 load/soak                                                                                                                            | **tư vấn** |
| `nightly-llm-security` | bộ bảo vệ tiêm nhắc nhở (chế độ chặn) đầu dò + garak (bỏ qua mà không có bí mật của nhà cung cấp)                                                                                 | **tư vấn** |
| `nightly-schemathesis` | hợp đồng OpenAPI làm mờ (lược đồ) đối với OmniRoute trực tiếp bằng cách sử dụng `docs/openapi.yaml` — vi phạm thông số kỹ thuật bề mặt/500 giây chưa được xử lý (Giai đoạn 8 B.4) | **tư vấn** |
| `nightly-mutation`     | Điểm kiểm tra đột biến của Stryker trên làn đường đơn vị nhanh — các đột biến sống sót trên bề mặt khẳng định yếu                                                                 | **tư vấn** |
| `nightly-compat`       | Ma trận tương thích của công cụ nút trên các phạm vi `engines.node` được hỗ trợ                                                                                                   | **tư vấn** |

Đường cơ sở hiệu suất (đống, TTFB, thời gian xây dựng) được ghi lại, không bị kiểm soát: xem [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

Mọi cổng không thể thất bại do vi phạm từ trước đều sử dụng danh sách cho phép cố định (ví dụ: `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Chính sách là:

**Khắc phục nguyên nhân gốc rễ; chỉ sử dụng danh sách cho phép khi vi phạm đã tồn tại từ trước và không thể khắc phục được trong cùng một PR.**

Khi thêm một mục vào danh sách cho phép:

1. Bao gồm một nhận xét với sự biện minh.
2. Tham khảo vấn đề theo dõi (ví dụ: `// #3498 — Phase 2 feature, not yet implemented`).
3. Xóa mục nhập trong cùng một PR đã sửa lỗi vi phạm — một mục nhập cũ không còn ngăn chặn một vi phạm đang hoạt động nữa chính là một khiếm khuyết (việc thực thi cũ 6A.3 sẽ không vượt qua được cổng trên một mục nhập danh sách cho phép mồ côi sau khi được triển khai).

LÀM** không** thêm các mục trong danh sách cho phép để vượt qua bài kiểm tra nhanh hơn. Cổng xanh với danh sách cho phép ngày càng tăng là cảm giác sai lầm về chất lượng.

### Khi một cổng bị lỗi trên PR của bạn

1. **Đọc đầu ra cổng một cách cẩn thận** — nó sẽ cho bạn biết chính xác tệp hoặc biểu tượng nào đã vi phạm quy tắc.
2. **Khắc phục vi phạm** — hầu hết các cổng đều là các bước kiểm tra hệ thống tệp xác định sẽ vượt qua ngay khi mã đúng.
3. **Nếu vi phạm đã có từ trước** (tức là bạn không giới thiệu mà giờ cổng lại che): thêm mục danh sách cho phép kèm theo nhận xét biện minh và vấn đề theo dõi.
4. **Nếu cổng là một cái bánh cóc** (phạm vi bao phủ, cảnh báo ESLint, trùng lặp, độ phức tạp): thay đổi của bạn đã làm cho số liệu trở nên tồi tệ hơn. Khắc phục sự cố cơ bản hoặc (hiếm khi) chạy `npm run quality:ratchet -- --update` nếu thay đổi là có chủ ý và độ suy giảm số liệu có thể chấp nhận được — nhưng hãy ghi lại lý do trong mô tả PR.
5. **Cổng tư vấn** (`continue-on-error: true`) là — thông tin, chúng không chặn việc hợp nhất mà xuất hiện trong bản tóm tắt CI. Hãy sửa chúng bằng mọi cách.

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

## Hợp lý hóa tồn đọng (ROI review — Fase 9 Onda 3)

Khoảng không quảng cáo này đã được đối chiếu với `ci.yml` vào ngày 17 tháng 6 năm 2026 (phiên bản trước đã bỏ qua `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence`). Một bản xem xét ROI của tập hợp đã được điều chỉnh đã xác định các ứng cử viên hợp lý hóa sau đây.** Việc hợp nhất là những thay đổi CI cơ học; flips/drops là các quyết định chính sách dành riêng cho nhà điều hành.** Chưa có nội dung nào dưới đây được áp dụng.

**Cũng không có giấy tờ ở trên** (tư vấn, tín hiệu thấp): công việc `docs-lint` (markdownlint + Vale, toàn bộ công việc `continue-on-error`) và quy trình làm việc của máy quét độc lập `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` ở dạng `quality-baseline.json` nhưng không được nối với bánh cóc chặn trong `ci.yml` — số liệu hiện ở dạng mồ côi.

### Hợp nhất/loại bỏ (cơ học, rủi ro thấp hơn)

Mỗi ứng cử viên đã được xác thực theo trạng thái cổng trực tiếp vào ngày 17 tháng 6 năm 2026 (tin cậy nhưng xác minh); một số vụ sáp nhập "rõ ràng" hóa ra là để che giấu nợ nần và** không** sạch sẽ thả vào.

- **`check:docs-sync` chạy hai lần** — độc lập trong công việc `lint` và một lần nữa bên trong `check:docs-all` (`docs-sync-strict`) và hook pre-commit khàn khàn. ✅**DONE** lệnh gọi `lint` độc lập — đã bị loại bỏ.
- **CVE** — ❌**NOT một sự hợp nhất rõ ràng.** `audit:deps` chặn các tư vấn quan trọng và kiểm tra chưa đầy đủ trên tất cả năm tệp khóa, đồng thời báo cáo các tư vấn cấp cao dưới dạng cảnh báo theo chính sách hiện tại; `check:vuln-ratchet` (osv) chỉ thất bại trên _regression_ so với đường cơ sở đã đăng ký và từ chối các phép đo bị thiếu khi được yêu cầu. Các ngữ nghĩa khác nhau — loại bỏ `audit:deps` sẽ làm mất cổng quan trọng tuyệt đối và biên lai kiểm tra gói độc lập. Giữ cả hai.
- **Phát hiện chu kỳ** — ✅**DONE** (#15159 G-01/G-02). Văn bản cũ ở đây gọi cổng `check:cycles` là "cổng xanh, được quản lý" và biện minh cho việc giữ nó chặn vì `check:circular-deps` (dpdm) đã báo cáo 91 chu kỳ. Màu xanh lá cây đó là một** màu xanh lá cây giả** : `check:cycles` đã quét 5 thư mục con (450 tệp), chỉ khớp với `import|export … from` tĩnh và loại bỏ mọi chỉ định `@/` và `@omniroute/open-sse/`, vì vậy nó không thể thấy các chu kỳ bí danh + nhập động thống trị repo. Đã sửa: cổng hiện đi `src` + `open-sse` (tệp 5023), thu thập các công cụ xác định từ TypeScript AST (vì vậy `import("…")` đếm và `typeof import("…")` vị trí loại không) và giải quyết tsconfig `paths`. Nó tìm thấy** 14** chu kỳ, không phải 0. Bởi vì 14 chu kỳ tồn tại từ trước không thể cố định trong một cổng PR, `check:cycles` bây giờ là một** bánh cóc** (`--ratchet`, trần `metrics.cycles.value = 14` trong `quality-baseline.json`, `direction: down`) — nó chặn bất kỳ _hồi quy_ nào và số lượng chỉ có thể giảm. CI chạy `npm run check:cycles:ratchet`. Chuyến đi đốt cháy với**A-01** . `check:circular-deps` (dpdm) vẫn mang tính tư vấn như ý kiến thứ hai rộng hơn.
- **Độ phức tạp** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): một lần đi bộ ESLint, được tính bằng ruleId để các đường tối đa chu kỳ + và đường cơ sở nhận thức luôn độc lập; `check:complexity` / `check:cognitive-complexity` riêng lẻ vẫn dành cho `--update` cục bộ.
- **`/api` chống ảo giác** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): một kho lưu trữ FS của `src/app/api`, openapi-routes + docs-symbols vẫn báo cáo độc lập; các cá nhân vẫn ở lại để chạy tại địa phương.
- **`check:node-runtime` chạy trong 11 công việc** — ⚠️** ROI thấp.** Mỗi người là một người chạy riêng biệt và séc là < 1s; tổng số tiền tiết kiệm được ~ là 10 giây, chống lại việc mất đi một người bảo vệ giá rẻ cho mỗi công việc. Không có giá trị khuấy động.
- **`typecheck:noimplicit:core` trên CI lint** — ✅** đã bị xóa khỏi công việc tìm lỗi mã nguồn** (là lời khuyên `continue-on-error`); bề mặt loại chặn là `typecheck:core` + `check:type-coverage`. Tập lệnh cục bộ được giữ lại.

### Lật/quyết định (chính sách điều hành)

- `check:openapi-security-tiers` (tư vấn) — ❌**NOT có thể lật được một cách dễ dàng.** Nó thoát 0 nhưng cảnh báo rằng một số tuyến `traffic-inspector` trong `LOCAL_ONLY_API_PREFIXES` thiếu chú thích `x-loopback-only: true`. Việc thực thi nó yêu cầu thêm các chú thích đó vào `openapi.yaml` trước.
- `typecheck:noimplicit:core` (tư vấn) — phần lớn được bao gồm bởi bánh cóc `check:type-coverage` chặn. Lật sang bánh cóc hoặc thả đường chuyền `tsc` thứ hai dư thừa.
- `test:vitest:ui` (bây giờ** chặn** ) các lỗi tồn tại từ trước — được loại trừ rõ ràng trong `vitest.config.ts` với các nhận xét theo dõi `// #8618` ; những thất bại mới làm thất bại công việc.
- `check:secrets` (gileaks, chặn bánh cóc bị đóng băng ở 3 kết quả dương tính giả được ghi nhận) — cho phép đưa 3 về 0 hoặc hạ cấp xuống mức tư vấn. Chồng chéo GitHub quét bí mật gốc + `check:public-creds`.
- `check:pr-evidence` (chặn, greps PR-body văn xuôi) — có nguy cơ dương tính giả cao; làm suy yếu việc thực thi #18 Quy tắc cứng nếu bị hủy bỏ, vì vậy đây là một lời kêu gọi chính sách thực sự.
- `semgrep` (tư vấn độc lập) — chồng lên CodeQL cho các họ OWASP ; nối đường cơ sở của nó vào bánh cóc hoặc thả.

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
