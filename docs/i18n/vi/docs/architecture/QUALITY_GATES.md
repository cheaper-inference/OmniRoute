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

Mỗi quy trình làm việc của CI và Quality Gates đều đưa ra phán quyết ổn định: `Gate / CI` và `Gate / Quality`. Chính sách tuyển sinh theo phiên bản của họ liệt kê mọi công việc ngược dòng theo yêu cầu hoặc tư vấn. Một công việc bắt buộc phải thành công: kết quả bị thiếu, bị hủy, bị bỏ qua, đang chờ xử lý và không xác định thì không thể thiết lập PASS. Phân loại chỉ tài liệu hoặc danh mục hợp lệ có thể khiến làn mã không thể áp dụng được; một bản dự thảo PR thông thường không phải là một ứng cử viên được chấp nhận. Nhãn `hotfix` không từ bỏ bằng chứng.

Cả hai quy trình công việc đều bao gồm PRs thành các nhánh main/release, đẩy tới `main`, gửi thủ công và các sự kiện nhóm hợp nhất. Đẩy, gửi và nhóm hợp nhất chạy toàn bộ lựa chọn. Bản nháp hàng đợi Hợp nhất đáng tin cậy cũng chạy các công việc `full-code`/`full-code-e2e` hiện hành; PRs thông thường bỏ qua chúng. Trước khi hợp nhất thủ công, hãy chạy một công văn đầy đủ trên ứng viên chính xác. Việc đẩy tới `release/**` không bắt đầu các quy trình công việc này; Release-Green quan sát riêng cơ sở được sáp nhập (Làn đường được lưu trữ `docs/ops/RUNNER_BOX.md` → ). Nhóm phân nhánh và hợp nhất sử dụng các trình chạy được lưu trữ cho các công việc mà chọn các trình chạy tự lưu trữ; đủ dung lượng lưu trữ phải được xác minh trước khi triển khai.

Một PR thông thường sẽ chạy lựa chọn nhanh. Các làn `full-code` và `full-code-e2e` của chính sách tiếp nhận (E2E, tích hợp, tạo phẩm gói, Electron smoke, Bun SQLite, hệ sinh thái và ứng dụng khách giao thức) chỉ chạy trên bản nháp hàng đợi Hợp nhất hoặc chạy đầy đủ: `gh workflow run ci.yml --ref <branch>`.

Mỗi biên nhận JSON xác định SHA đã kiểm xuất, lần chạy và lần thử quy trình công việc. CLI từ chối checkout/event SHA không khớp. Kiểm tra quy trình làm việc liên kết tư cách thành viên chính sách với danh sách `needs` của công việc phán quyết để làn đường mới hoặc làn đường bị xóa không thể biến mất một cách âm thầm. Biên nhận bao gồm quy trình làm việc của riêng họ, không phải xuất bản, triển khai hoặc nội bộ của máy quét tư vấn hiện có. Việc thực hiện các bước kiểm tra hiện hành được yêu cầu trong quy định của chi nhánh là một thay đổi hành chính riêng biệt; việc xác định công việc của họ không tự nó bảo vệ một chi nhánh.

`API Route Typecheck` là một quy trình kiểm tra quy trình làm việc độc lập, bên ngoài cả các phán quyết tổng hợp và hồ sơ tĩnh đầy đủ của người quan sát cục bộ. Kiểm tra kết quả của nó một cách riêng biệt cho ứng cử viên chính xác. `.github/workflows/api-route-typecheck.yml` chạy trên PRs vào `main` hoặc `release/**`, đẩy tới họ nhánh, gửi thủ công và các sự kiện `merge_group` thuộc loại `checks_requested`. Nó không có bộ lọc đường dẫn. Hợp nhất các nhóm kiểm tra `merge_group.head_sha`; các sự kiện khác hãy xem `github.sha`. Tất cả các sự kiện đều sử dụng cùng một cổng chẩn đoán API và các bài kiểm tra đơn vị cổng. Nhắm mục tiêu lại cơ sở PR yêu cầu kiểm tra mới; Các chỉnh sửa body/title sử dụng tên chỉ dành cho quan sát `Admission not requested / API Route Typecheck` và không thể thay thế kiểm tra nhập học.

### Bằng chứng được giữ lại trong bộ giảm chấp nhận

`scripts/quality/validate-release-acceptance.mjs` giảm kế hoạch được cung cấp và các bảng kê khai của nó; nó không chứng minh rằng kế hoạch bao trùm toàn bộ quy trình phát hành. Các báo cáo của nó đặt ra `releaseAcceptance: false` một cách rõ ràng, ngay cả khi kế hoạch đó là `VERIFIED`. Quy trình làm việc `release-acceptance.yml` vẫn sử dụng các thiết bị cố định bóng, không phải biên nhận bản dựng, gói, khởi động hoặc khuyến mãi thực.

CLI yêu cầu `--evidence-root` xác minh bằng chứng được lưu giữ. Các tệp được phân giải dưới dạng `<evidence-root>/<artifact_id>/<member>` và được băm dưới dạng SHA-256. Bản ghi PASS không có bằng chứng, tệp bị thiếu hoặc bị thay đổi, đường dẫn không an toàn hoặc liên kết tượng trưng sẽ ngăn cản việc xác minh. Tệp bị thiếu không tương đương với nhật ký thành công trống. Kiểm tra SHA/run/attempt hiện tại vẫn độc lập: các byte phù hợp không thể giải cứu biên nhận cũ. Tính toàn vẹn của tệp không phải là bằng chứng về tính xác thực thực thi hoặc quảng cáo tạo phẩm.

### DAST sử dụng bản dựng CI đã được xác minh

Công việc `dast-smoke` CI được yêu cầu gọi `.github/workflows/dast-smoke.yml` sau `build`. Nó tuân theo lựa chọn code/draft giống như bản dựng, bao gồm PRs phân nhánh được hỗ trợ, PRs mục tiêu phát hành và các nhóm hợp nhất. Một công việc DAST bị thiếu, không thành công, bị hủy hoặc bị bỏ qua bất ngờ sẽ chặn `Gate / CI`. Quy trình làm việc có thể tái sử dụng không có trình kích hoạt PR/dispatch độc lập; xác thực thủ công sử dụng công văn của CI để bản dựng và người tiêu dùng vẫn ở trong một lần chạy.

`scripts/ci/next-build-provenance.mjs` niêm phong toàn bộ tạo phẩm Tiếp theo bằng bản tóm tắt tar, repository/event/run, nỗ lực của nhà sản xuất, head/base/checkout/tree, nhận dạng quy trình làm việc, tệp khóa, Nút version/ABI chính xác, nền tảng và trình đóng gói. DAST chọn cấu phần phần mềm bất biến ID từ `needs.build.outputs`, yêu cầu xác minh bản tóm tắt tải xuống và băm ZIP một cách độc lập với bản tóm tắt của nhà sản xuất trước khi trích xuất hai thành viên trong danh sách cho phép thông qua `scripts/ci/unpack-ci-build.py`. Kho lưu trữ tệp kê khai và tar cũng phải khớp với đầu ra của nhà sản xuất độc lập trước khi cây Tiếp theo được trích xuất. Nó không bao giờ tìm kiếm bản dựng chi nhánh thành công mới nhất. Việc chạy lại một phần có thể sử dụng lại nỗ lực của nhà sản xuất đó khi ID của nó và tất cả các đầu vào vẫn khớp; biên nhận ghi lại cả hai lần thử.

Người tiêu dùng vẫn sử dụng trình chạy Linux được lưu trữ với quyền lưu trữ chỉ đọc và không có bí mật về kho lưu trữ. Nó cài đặt phiên bản Node chính xác của nhà sản xuất, sau đó lắp ráp CLI với `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` từ chối một máy chủ độc lập bị thiếu trước bất kỳ bản dựng dự phòng nào; Các bản dựng CLI cục bộ thông thường vẫn giữ lại bản dự phòng hiện có của chúng. Sự sẵn sàng của máy chủ, Sơ đồ và nhắc nhở đều phải thành công trong giới hạn công việc 25 phút không thay đổi. Biên nhận xuất xứ chứng minh danh tính đầu vào và byte chứ không phải quét DAST thành công. Hiện vật hết hạn, gián đoạn chạy hoặc máy quét bị lỗi vẫn là bằng chứng không đầy đủ hoặc không thành công; nó không thể trở thành PASS thông qua trình bao bọc tư vấn.

### Năng lực thực thi UI

CI chạy toàn bộ kho UI dưới dạng bốn phân đoạn ma trận `test-vitest`, mỗi phân đoạn có tối đa hai công nhân trên mỗi phân đoạn và thời hạn công việc hiện tại là 15 phút. Phân đoạn đầu tiên cũng chạy bộ MCP/autoCombo Vitest. Kết quả công việc yêu cầu bao gồm mọi chân ma trận; việc thất bại hoặc hủy bỏ một phân đoạn không thể thiết lập việc tiếp nhận ứng viên.

Người quan sát hàng đêm giữ lại biên nhận ứng cử viên chính xác riêng biệt cho từng phân đoạn UI, bao gồm cả việc thực thi MCP trong lần nhận đầu tiên. Tất cả bốn biên lai, nhật ký và thông tin nhận dạng thực thi trùng khớp đều được yêu cầu. `npm run test:vitest:ui` địa phương vẫn chọn bộ hoàn chỉnh; một lần chạy `--shard` chỉ là một phần bằng chứng.

### Bộ sưu tập bảo hiểm đơn vị

Mười hai phân đoạn đơn vị thu thập phạm vi phủ sóng của V8 trong quá trình thực hiện thử nghiệm hiện tại của chúng. Phân đoạn thành công chạy `scripts/ci/compact-v8-coverage.mjs` để nén các tệp gốc mà không tạo báo cáo Istanbul trung gian. Công việc Bảo hiểm cuối cùng xác minh tất cả mười hai bảng kê khai đối với ứng viên SHA, thời gian chạy, gốc nguồn và băm dữ liệu, sau đó chạy các trình báo cáo của c8 và các ngưỡng bảo hiểm hiện có. Đầu vào giữ nguyên thứ tự tên tệp chung của c8; việc hợp nhất trước mỗi phân đoạn là không an toàn đối với phạm vi phủ sóng function/block hỗn hợp. Các phân đoạn bị thiếu, không đúng định dạng hoặc không tương thích không được chấp nhận. Các phân đoạn thử nghiệm không thành công giữ lại phạm vi chẩn đoán thô riêng biệt; nó không thể nhập vào sự hợp nhất cuối cùng.

### Biên lai tiến độ thực hiện đơn vị

Lệnh `test:unit:ci:shard` được chia sẻ ghi lại các pha `primary`, `dashboard` và `serial` thông qua `scripts/ci/unit-progress-reporter.mjs`. Báo cáo thử nghiệm bình thường vẫn có sẵn. Biên nhận chỉ có siêu dữ liệu riêng biệt ghi lại thời điểm bắt đầu và hoàn thành của mỗi tệp, đồng thời nhịp tim 30 giây liệt kê các tệp vẫn hoạt động và thời gian đã trôi qua của chúng. Nó chỉ ghi lại siêu dữ liệu thực thi được đưa vào danh sách cho phép; mô tả kiểm tra, đầu ra, nội dung lỗi và môi trường đầy đủ không được tuần tự hóa.

CI giữ lại các tệp JSONL dưới dạng `unit-progress-ci-<run>-<attempt>-<shard>`. Thời gian chờ công việc có thể ngăn cản việc tải lên sau này; nhịp tim đã phát ra vẫn là bằng chứng chẩn đoán. Nhịp tim bị thiếu cũng có thể phản ánh quá trình chạy bị chặn hoặc chấm dứt. Các biên nhận này bảo lưu lựa chọn bài kiểm tra hiện tại, tính đồng thời, thời hạn và trạng thái thoát; chúng không phải là những phán quyết tuyển sinh của ứng cử viên.

### Hợp nhất hàng đợi

Nhãn `queue` gửi PR đến hàng đợi Hợp nhất (`.mergify.yml`). Hợp nhất mở bản nháp PR trên nhánh `mergify/merge-queue/`, CI chạy toàn bộ lựa chọn ở đó và PR ban đầu hợp nhất khi `Gate / CI`, `Gate / Quality` và `Merge integrity (changelog + generated skills)` vượt qua.

Hợp nhất ghi tóm tắt hàng đợi của nó vào mô tả của bản nháp. Các sự kiện Body/title-only `pull_request` `edited` sử dụng nhóm đồng thời dành riêng cho lần chạy và không chạy lại phân loại, kiểm tra ma trận, tính toàn vẹn hợp nhất hoặc kết quả thừa nhận. Tên kiểm tra chỉ dành cho quan sát không thể thay thế `Gate / CI` hoặc `Gate / Quality`. Một chỉnh sửa làm thay đổi cơ sở mục tiêu yêu cầu xác thực ứng viên mới.

Sau khi dequeue, một lần đẩy không phải lúc nào cũng yêu cầu PR. Bình luận `@mergifyio queue` về nó.

### Kiểm kê quét tĩnh

Khoảng không quảng cáo bí danh npm được phiên bản và tư cách thành viên quét tĩnh có sẵn trong `config/quality/gate-manifest.json`. Chạy `npm run check:gate-manifest` để xác thực tên tập lệnh và các lệnh chính xác đối với `package.json`; các thao tác bổ sung, xóa và trôi lệnh đều không thành công ở cả công việc hook cục bộ và công việc phân loại thay đổi trong CI. Bí danh không phải là công việc trong quy trình làm việc, phiên bản ma trận hoặc trường hợp kiểm thử: các số đếm này không được trình bày dưới dạng có thể hoán đổi cho nhau.

Sử dụng `npm run quality:scan -- --list` hoặc `npm run quality:scan:fast -- --list` để kiểm tra các bí danh đã chọn mà không thực thi chúng. Trình chạy gọi điểm vào npm, do đó thời gian chạy của nó (bao gồm cả Bun được định cấu hình) được giữ nguyên. Tệp kê khai ghi lại các bí danh bên ngoài các cấu hình đó dưới dạng được gọi riêng và các lệnh bảo trì bị cấm trong cấu hình quét chỉ đọc.

Những cấu hình này chỉ bao gồm quét tĩnh. Họ không chứng nhận các thử nghiệm sản phẩm, phạm vi bảo hiểm, bao bì, kiểm tra bên ngoài hoặc sự chấp nhận phát hành hoàn toàn của ứng viên. Việc nhập quy trình làm việc sử dụng `config/quality/admission-policy.json` và `scripts/quality/admission-verdict.mjs` được liên kết. Hồ sơ người quan sát phát hành vẫn riêng biệt; kiểm tra các séc và biên lai hiện hành của họ một cách độc lập. Các lệnh tĩnh đầy đủ của người quan sát được khai báo trong `config/quality/release-green-static-profile.json`, bao gồm `audit:deps`, lựa chọn kiểm tra đột biến và kiểm tra dịch thuật. Trình tải xác thực các lệnh npm dựa trên các khai báo package.json và CI/Quality được mô hình hóa; nó từ chối sự trôi dạt thay vì thực thi mã thông báo shell làm đối số. Đầu ra SKIP/INCOMPLETE của máy quét được yêu cầu không thể thiết lập PASS. Hồ sơ ghi lại các loại trừ bên ngoài của nó và không thay thế phạm vi bảo hiểm được lưu trữ trên máy chủ, ma trận kiểm tra, gói hoặc bằng chứng triển khai. Kho văn xuôi dưới đây là tài liệu tham khảo, không phải bằng chứng cho thấy một cánh cổng đã thực sự chạy.

Các tập lệnh tồn tại dưới `scripts/check/` (cổng chính sách) và `scripts/quality/` (công cụ bánh cóc). Nguồn sự thật của CI là `.github/workflows/ci.yml`.

### Sức khỏe tài liệu cơ sở đã xuất bản

`.github/workflows/i18n-base-health.yml` quan sát tình trạng của tài liệu sau khi đẩy các lần đẩy được chọn tới `main` và `release/v*` cũng như khi gửi thủ công. Các bộ lọc của nó bao gồm tài liệu, Markdown gốc, `llm.txt`, state/configuration dịch thuật và công cụ i18n có liên quan. Công việc `Published base documentation health` duy nhất sử dụng Ubuntu được lưu trữ trên máy chủ và thời hạn 5 phút. Nó thực hiện xác thực chỉ đọc và viết biên nhận chẩn đoán mà không cần cài đặt phụ thuộc, dịch thuật hoặc áp dụng trạng thái.

`scripts/i18n/check-base-health.mjs` yêu cầu không có sự không nhất quán về hàm băm nguồn, thiếu mục tiêu, hàm băm mục tiêu, bản dịch cũ và bộ đệm phần. Nó cũng xác nhận phạm vi document/locale cốt lõi hiện tại và nguồn gốc được ghi lại của nó. Ngữ cảnh không hợp lệ, mức độ bao phủ không đầy đủ hoặc trình kiểm tra bị gián đoạn tạo ra `INCOMPLETE`; sự trôi dạt được xác nhận tạo ra `FAIL`. Cả hai đều trả về trạng thái thoát không thành công. Biên nhận nhất định phải kiểm tra SHA, quy trình làm việc , chạy và thử và được giữ lại dưới dạng `i18n-base-health-<sha>-<run>-<attempt>`.

Đây là một quan sát độc lập của cơ sở được công bố. Nó không thêm sự kiện PR hoặc nhóm hợp nhất, kiểm tra PR bắt buộc, bí danh npm hoặc thành viên hồ sơ quét tĩnh. Trình kiểm tra cơ bản cũng chặn tất cả năm lớp ở chế độ tuyệt đối. Việc chuẩn bị PR thông thường vẫn tách biệt với việc nhập học. Tải lên thành công không thể biến kết quả tình trạng không thành công thành PASS.

PR thông thường sử dụng `--preflight` với báo cáo cơ sở do `--baseline-evidence` tạo ra. Nó có thể chỉ để lại nguồn tiếng Anh đang chờ xử lý khi bản ghi dịch hoàn chỉnh và byte mục tiêu thực tế không thay đổi so với cơ sở chính xác đó. Sự không nhất quán về mục tiêu hoặc bộ nhớ đệm phần mới vẫn bị chặn và bằng chứng không đầy đủ không thể cho phép chuẩn bị. Báo cáo trình bày riêng `preparationPending` và `mergeReady` : việc chuẩn bị thành công không làm cho các bản dịch đang chờ xử lý sẵn sàng hợp nhất. Làm mới những tấm gương bị ảnh hưởng trong ứng viên điềm tĩnh trước khi nhập học. Ứng cử viên hàng đợi Hợp nhất đáng tin cậy, `merge_group`, đẩy nhánh và chạy CI thủ công sử dụng trình kiểm tra tuyệt đối, không có `--warn` hoặc tha thứ cho lỗi kế thừa. Việc thiếu băm mục tiêu và phạm vi bị giảm do các tệp lõi được ghi đã bị xóa không thể tạo ra phán quyết tuyệt đối thành công.

### Phát hành đường dẫn nhanh PR (`quality.yml`)

`.github/workflows/quality.yml` bổ sung CI trên main/release PRs, đẩy lên `main`, điều phối và hợp nhất các nhóm. PRs sử dụng kiểm tra nhanh được lọc theo đường dẫn. Bản dựng trùng lặp bị vô hiệu hóa vĩnh viễn đã bị xóa; séc build/package/boot thực vẫn còn trong CI. Bộ đơn vị và vitest chỉ chạy trong CI (`Unit Tests (N/12)` và `Vitest`).

| Công việc                                        | Phạm vi                                                                                                                                                                                                                                               | Chặn               |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `Docs Gates (fast-path)`                         | Docs/code PRs; Tài liệu giới thiệu API và tài liệu-tất cả                                                                                                                                                                                             | Đúng               |
| `Fast Quality Gates`                             | Mã PRs; kiểm tra tĩnh, kiểm tra đánh máy, kiểm tra đánh máy bảng điều khiển, kiểm tra đơn vị bị ảnh hưởng                                                                                                                                             | Đúng               |
| `Forgotten sibling tests`                        | Mã PRs; đã thay đổi các mô-đun truy tìm người tiêu dùng tĩnh và các bài kiểm tra anh chị em ứng viên; đường dẫn nhập thùng và nhập động được báo cáo dưới dạng chẩn đoán tư vấn, với các trường hợp ngoại lệ trong danh sách cho phép được tham chiếu | **tư vấn**         |
| `No new ESLint warnings`                         | Mã PRs; bảo vệ lint nhận biết được sự ức chế                                                                                                                                                                                                          | Có, bao gồm cả nĩa |
| `Merge integrity (changelog + generated skills)` | PRs không dự thảo; đồng bộ hóa thay đổi và kỹ năng được tạo                                                                                                                                                                                           | Có, bao gồm cả nĩa |

#### Báo cáo kiểm tra anh chị em bị lãng quên

`npm run check:forgotten-sibling-tests` hoạt động như một bước tư vấn của `Fast Quality Gates` và sử dụng lại trình phân giải nhập đằng sau bản đồ tác động thử nghiệm. Đối với mỗi mô-đun sản xuất đã thay đổi, nó sẽ báo cáo chuỗi `changed module/symbol -> static consumer -> candidate sibling test` xác định khi bài kiểm tra ứng viên không có trong khác biệt yêu cầu kéo. Tóm tắt Markdown và kết quả JSON được giữ lại dưới dạng tạo phẩm quy trình công việc `forgotten-sibling-tests` để hiệu chỉnh trước khi triển khai chặn.

Tái xuất thùng và nhập khẩu động chỉ là chẩn đoán giải quyết; họ không bao giờ tạo ra một phát hiện chặn. Các trường hợp ngoại lệ được xem xét trực tiếp trong `config/quality/forgotten-sibling-allowlist.json`. Mỗi mục nhập phải nêu tên bài kiểm tra của người tiêu dùng và ứng viên, đưa ra lý do cụ thể và liên kết vấn đề GitHub hoặc yêu cầu kéo. Các mục không đúng định dạng không đóng được. Các ngoại lệ không thể chặn một bài kiểm tra ứng viên đã bị xóa hoặc một khác biệt bổ sung `.skip`/`.todo`; khẳng định sự suy yếu và việc che giấu khác vẫn thuộc quyền sở hữu của cổng `check:test-masking` chặn độc lập.

### Công việc: `lint`

Chạy trên mọi PR đến `main`. Khối hợp nhất khi thất bại.

| Kịch bản (`npm run ...`)          | Xác thực                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Chặn                                   |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `check:node-runtime`              | Phiên bản Node.js nằm trong phạm vi được hỗ trợ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Đúng                                   |
| `check:cycles`                    | Nhập thông tư trên tất cả `src/` + `open-sse/` (dựa trên AST, tsconfig `paths` đã giải quyết). Bare thoát 1 bất cứ khi nào có bất kỳ chu kỳ nào tồn tại (đóng không thành công kể từ #15281) và liệt kê SCCs. `check:cycles:ratchet` (những gì CI chạy) chặn khi số lượng vượt quá trần `metrics.cycles` trong `quality-baseline.json` — hiện là 14, `direction: down`, vì vậy nó chỉ có thể giảm (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Có (bánh cóc)                          |
| `check:boundary`                  | Khớp nối `open-sse → src` : nhập tệp duy nhất từ công cụ vào ứng dụng (`scripts/quality/measure-boundary.mjs`; danh sách cạnh là tồn đọng khắc phục core/module-split v4). Báo cáo tư vấn = trần (giống như `quality:boundary`). `check:boundary:ratchet` (những gì CI chạy, cũng trong vòng lặp bánh cóc cổng nhanh `quality.yml` ) chặn khi số lượng vượt quá trần `metrics.boundaryOpenSseToSrc` trong `quality-baseline.json` — được gieo ở mức đo được là 771, `direction: down`; `--update` chỉ hạ thấp nó; tương đối cơ sở trên PRs (`--base-ref`, xem bên dưới)                                                                                                                                                                                                                                                                                                                                                                                                                        | Có (bánh cóc)                          |
| `check:route-validation:t06`      | Lược đồ Zod hiện diện trên tất cả các tuyến đường (Chính sách cấp 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Đúng                                   |
| `check:any-budget:t11`            | Số lượng `@ts-expect-error // any` không vượt quá ngân sách (Catraca cấp 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Đúng                                   |
| `check:provider-consistency`      | Mọi nhà cung cấp trong `providers.ts` đều có mục nhập phù hợp trong `providerRegistry.ts` (và ngược lại, trong danh sách cho phép)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Đúng                                   |
| `check:model-lifecycle`           | Ba bảng định tuyến được duy trì bằng tay luôn nhất quán với ảnh chụp nhanh vòng đời đã đăng ký (#11503): `FITNESS_TABLE` (`taskFitness.ts`) không có id đã ngừng hoạt động mà `REGISTRY` có thể định tuyến; mọi mục tiêu `BUILT_IN_ALIASES` đều có trong `REGISTRY` và không có trong ảnh chụp nhanh id đã ngừng hoạt động; mọi id đã ngừng hoạt động vẫn còn trong `REGISTRY` đều được chuyển tiếp hoặc liệt kê trong `allowedRetiredInCatalog`; và không có nguồn hoặc mục tiêu `DEFAULT_DEGRADATION_MAP` xuất hiện trong ảnh chụp nhanh đó. Điều này không chứng minh rằng một mô hình hiện đang được phục vụ bởi một tuyến thượng nguồn trực tiếp. — ngoại tuyến so sánh với `config/quality/model-lifecycle.json`, được làm mới bằng tay với `npm run quality:refresh-model-lifecycle` (mạng; không nối dây vào CI). `allowedRetiredInCatalog` là một bánh cóc cố định: chỉ thêm một mục nhập có vấn đề về theo dõi.                                                                      | Đúng                                   |
| `check:fetch-targets`             | Mọi `fetch("/api/...")` trong `src/` phía máy khách đều phân giải thành `route.ts` thực                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Đúng                                   |
| `check:deps`                      | Tất cả các bản ghi `npm install` -able trên mỗi `package.json` trong kho lưu trữ đều ở dạng `dependency-allowlist.json`; các gói mới chưa được ghim hoặc bị cẩu thả được gắn cờ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Đúng                                   |
| `audit:deps`                      | kiểm tra npm của tất cả năm tệp khóa độc lập (root, Electron, OpenCode plugin v1/v2 và nhà cung cấp). Khối tư vấn quan trọng; lời khuyên cao vẫn là cảnh báo rõ ràng. Kiểm toán Missing/failed là INCOMPLETE và khối; báo cáo và băm khóa trên mỗi phạm vi được giữ lại.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Đúng                                   |
| `check:lockfile`                  | Tính toàn vẹn `package-lock.json` Đăng ký — https, băm toàn vẹn, không ghi đè máy chủ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Đúng                                   |
| `check:licenses`                  | Danh sách cho phép giấy phép SPDX dành cho các phần phụ thuộc sản xuất                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Đúng                                   |
| `check:tracked-artifacts`         | Không có tạo phẩm xây dựng/liên kết tượng trưng `node_modules` đã cam kết (cũng chạy trong cam kết trước khàn khàn; đẩy trước là cố tình làm nhẹ — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Đúng                                   |
| `check:ai-attribution`            | Không có đoạn giới thiệu AI/bot `Co-Authored-By` hoặc chân trang do AI tạo ra trong PR cam kết, tiêu đề hoặc nội dung — Hard Rule #16 (trong vòng lặp cổng nhanh `quality.yml` dành cho PR→ `release/**` — đọc tải trọng sự kiện, không tắt PRs — và một bước chỉ PR trong `ci.yml` lint cho PR→ `main`; cũng là hook `commit-msg` khàn khàn; cho phép đồng tác giả là con người; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:vitest-exclusions`         | Mỗi loại trừ Vitest đặt tên cho một vấn đề theo dõi và xuất hiện trong `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Đúng                                   |
| `check:file-size`                 | Các tệp nguồn (`.ts`/`.tsx` trong `src/`, `open-sse/`, `electron/`, `bin/`) nằm trong `cap` và các tệp kiểm tra (`*.test.ts(x)`) trong `testCap`; các tệp bị đóng băng trong `file-size-baseline.json` (`frozen` / `testFrozen`) không được vượt quá kích thước đã ghi của chúng                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Đúng                                   |
| `check:error-helper`              | Phản hồi lỗi trong executors/handlers sử dụng `buildErrorBody()` / `sanitizeErrorMessage()` (Quy tắc cứng #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Đúng                                   |
| `check:migration-numbering`       | Các tệp SQL di chuyển được đánh số tuần tự, không có khoảng trống hoặc trùng lặp                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Đúng                                   |
| `check:public-creds`              | Không có khóa Web OAuth `client_id`/`client_secret` hoặc Firebase theo nghĩa đen bên ngoài `publicCreds.ts` (Quy tắc cứng #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Đúng                                   |
| `check:db-rules`                  | Không có SQL thô bên ngoài các mô-đun `src/lib/db/` ; không nhập khẩu thùng từ `localDb.ts` (Quy tắc cứng #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Đúng                                   |
| `check:known-symbols`             | Trình thực thi, chiến lược định tuyến và trình dịch của nhà cung cấp đã đăng ký trong bảng điều phối của họ khớp với các tệp trên đĩa — không có ký hiệu mồ côi hoặc không được khai báo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Đúng                                   |
| `check:route-guard-membership`    | Mọi tuyến đường sinh ra một tiến trình con đều được phân loại theo `isLocalOnlyPath()` (Quy tắc cứng #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Đúng                                   |
| `check:test-discovery`            | Mỗi tệp `*.test.ts` / `*.spec.ts` trong repo được thu thập bởi ít nhất một người chạy thử nghiệm (ratchet: danh sách mồ côi trong `test-discovery-baseline.json` chỉ có thể thu nhỏ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Đúng                                   |
| `check:test-tla-order`            | Không có tệp `node:test` nào trong `tests/unit` đăng ký kiểm tra, đạt `await` cấp cao nhất, sau đó đăng ký thêm (#18045; ratchet: `test-tla-order-allowlist.json` chỉ có thể thu nhỏ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Đúng                                   |
| `check:agent-skills-sync`         | Các tạo phẩm kỹ năng của tác nhân được tạo khớp với danh mục nguồn của chúng (không bị trôi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:provider-asset-provenance` | Nhà cung cấp logos/assets có mục nhập xuất xứ được ghi lại                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `lint:json`                       | Tệp cấu hình JSON phân tích cú pháp và đáp ứng các quy tắc repo lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `typecheck:core`                  | Biên dịch TypeScript không có lỗi (chỉ cảnh báo tư vấn)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Đúng                                   |
| `typecheck:noimplicit:core`       | `noImplicitAny` — nghiêm ngặt hướng tới tương lai; nhiều trang web cuộc gọi có sẵn vẫn cần chú thích                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | **tư vấn** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` nằm trong phạm vi `src/app/(dashboard)/**` (#7033) Danh sách cho phép gồm 27 tệp được tuyển chọn của — `typecheck:core` không bao gồm bất kỳ trang tổng quan nào TSX và `next build` cũng không bao giờ kiểm tra loại nó (`next.config.mjs` đặt `ignoreBuildErrors: true`), do đó, hồi quy số nhận dạng mồ côi ở đó (#6625/#6909) là vô hình đối với CI. Khác với đường cơ sở đếm per-file/per-TS-code bị đóng băng (`config/quality/dashboard-typecheck-baseline.json`, mẫu thực thi cũ tương tự như `check:known-symbols`) — chỉ có các lỗi NEW vượt quá số lượng đường cơ sở không đạt cổng; giảm tốc độ bằng `--update` khi lỗi tồn tại từ trước đã được khắc phục.                                                                                                                                                                                                                                                                                                                  | Đúng                                   |
| `check:build-typecheck`           | Kiểm tra loại sản xuất toàn bộ ứng dụng đối với `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), danh sách cho phép 27 tệp của `typecheck:core` trên bề mặt và cổng trang tổng quan không bao gồm. Khác biệt với `config/quality/build-typecheck-baseline.json`; số lượng mới hoặc tăng lên trên mỗi (tệp, mã) không thành công, số lượng thấp hơn yêu cầu bạn phải ratchet. `--update` từ chối trong khi quá trình chạy chứa cặp mới hoặc được nâng cấp trừ khi `--force-regressions` được thông qua và từ chối tệp mới bị im lặng trừ khi `--force-nocheck` được thông qua, do đó, việc mở rộng đường cơ sở để có màu xanh lục và cấp quyền im lặng vĩnh viễn là hai hành động có chủ ý riêng biệt. Một `--force` trần bị từ chối. Đồng thời quét phạm vi xây dựng cho `@ts-nocheck` dựa trên `config/quality/ts-nocheck-baseline.json`, vì tệp sử dụng nó không báo cáo bất kỳ chẩn đoán nào cả và nếu không thì sẽ vô hình đối với mọi cổng. | Đúng                                   |

#### Hai chương trình đánh máy trả lời khác nhau

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) và `check:build-typecheck` biên dịch các chương trình khác nhau theo các tùy chọn khác nhau và cùng một tệp có thể sạch ở một tệp và đầy lỗi ở tệp kia.

`tsconfig.build.json` đặt `"strict": false`, vì vậy `noImplicitAny` bị tắt. Cấu hình lõi biên dịch danh sách cho phép gồm 27 tệp được tuyển chọn với các tùy chọn chặt chẽ hơn và tuân theo biểu đồ nhập của từng mục nhập, do đó, các tệp không bao giờ xuất hiện trong chương trình xây dựng vẫn được kiểm tra ở đó.

Hậu quả quan trọng khi đánh giá liệu một tập tin có được gõ hay không:**chẩn đoán bằng không theo `check:build-typecheck` không có nghĩa là bằng không** . Việc loại bỏ `@ts-nocheck` khỏi 26 tệp cho thấy 23 tệp trong số đó sạch trong chương trình xây dựng; 16 trong số đó cho thấy có khoảng 120 lỗi tiềm ẩn trong lỗi nghiêm ngặt. Kiểm tra cả hai trước khi gọi một tập tin sạch.

### Công việc: `quality-gate`

Chạy theo `test-coverage`. Khối hợp nhất khi thất bại.

| Kịch bản                     | Xác thực                                                                                                                                                         | Chặn                     |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | Phát ra `quality-metrics.json` (Số lượng cảnh báo ESLint, mức độ phù hợp từ báo cáo phân đoạn được hợp nhất)                                                     | Có (ngược dòng bánh cóc) |
| `quality:ratchet`            | Mỗi số liệu trong `quality-baseline.json` chưa bị thoái lui (ESLint cảnh báo đường cơ sở ≤ ; đường cơ sở ≥ bao phủ)                                              | Đúng                     |
| `check:duplication`          | Sao chép mã (jscpd@4) không vượt quá đường cơ sở trong `quality-baseline.json`                                                                                   | Đúng                     |
| `check:complexity`           | Độ phức tạp chu kỳ ở cấp độ tệp không vượt quá giới hạn (lõi ESLint `complexity` + `max-lines-per-function`)                                                     | Đúng                     |
| `check:cognitive-complexity` | Bánh cóc phức tạp nhận thức (`eslint-plugin-sonarjs`) — vượt qua ESLint riêng biệt; CI chạy cả hai được hợp nhất thành bước `check:complexity-ratchets` duy nhất | Đúng                     |
| `check:dead-code`            | Các tệp xuất / tệp ratchet (knip) không được sử dụng không hồi quy so với đường cơ sở                                                                            | Đúng                     |
| `check:compression-budget`   | Ngân sách chuẩn nén — sàn tiết kiệm mã thông báo cho mỗi động cơ không được thoái lui                                                                            | Đúng                     |
| `check:type-coverage`        | Bánh cóc gõ phần trăm (`type-coverage`) không thoái lui; phần lớn bao gồm `typecheck:noimplicit:core`                                                            | Đúng                     |

### Công việc: `codeql-scan` và `codeql-admission`

`codeql-scan` tạo ra tất cả các danh mục phân tích được cấu hình. Sau khi công việc đó thành công, `codeql-admission` xác thực các bản tải lên chính xác của nó và bánh cóc cảnh báo ứng viên. Cả hai đều là phần phụ thuộc bắt buộc của `Gate / CI`, bao gồm cả các ứng cử viên chỉ dành cho tài liệu. Các yêu cầu về kích hoạt quản trị và canary được mô tả trong phần "CodeQL ratchet" bên dưới.

| Kịch bản               | Xác thực                                                                                                                                                                                                    | Chặn |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| `check:codeql-ratchet` | ref/SHA ứng viên và tất cả các danh mục phân tích được định cấu hình phải có mặt trước khi có cảnh báo; khối bằng chứng bị thiếu. Hàng tồn kho toàn cầu vẫn còn — riêng biệt, xem "CodeQL ratchet" bên dưới | Đúng |

### Công việc: `quality-extended`

Công việc chặn các ứng viên phù hợp. Kích thước gói, phát hiện bí mật, phát hiện lỗ hổng, phát hiện quy trình làm việc và các thay đổi OpenAPI được kiểm tra bằng các bánh cóc cần thiết. Chẩn đoán phụ thuộc vòng tròn vẫn mang tính tư vấn. Cần phải cài đặt máy quét: `scripts/ci/install-quality-scanners.sh` cung cấp các phiên bản được ghim và truyền bá các lỗi cài đặt. Thiếu công cụ, báo cáo không hợp lệ hoặc thiếu đường cơ sở sẽ khiến cổng quét INCOMPLETE được yêu cầu.

| Kịch bản                 | Xác thực                                                                                                                                                                                                                                               | Chặn                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| `check:circular-deps`    | Không có phụ thuộc vòng tròn (dpdm)                                                                                                                                                                                                                    | **tư vấn**                                       |
| `check:bundle-size`      | Kích thước gói không vượt quá giới hạn; một phép đo không khả dụng không thành công                                                                                                                                                                    | **Chặn bằng --ratchet**                          |
| `check:secrets`          | Những phát hiện của Gileaks không thoái lui; quét bắt buộc từ chối tools/source/baseline bị thiếu, quét không thành công và báo cáo không hợp lệ                                                                                                       | **Chặn bằng --ratchet**                          |
| `check:vuln-ratchet`     | Lỗ hổng phụ thuộc không hồi phục; quét bắt buộc sẽ loại bỏ các công cụ bị thiếu, báo cáo không hợp lệ hoặc đường cơ sở bị thiếu                                                                                                                        | **Chặn bằng --ratchet**                          |
| `check:workflows`        | Tìm lỗi mã nguồn quy trình làm việc (actionlint + zizmor); Máy quét missing/broken, báo cáo không hợp lệ hoặc đường cơ sở bánh cóc bị thiếu không thành công như INCOMPLETE. Các phát hiện hợp lệ tuân theo chính sách strict/advisory/ratchet đã chọn | Yêu cầu thực hiện; chặn bánh cóc zizmor trong CI |
| `check:openapi-breaking` | Hợp đồng API công khai chống lại các cam kết sự kiện được ghim ( cơ sở hợp nhất PR, đẩy trước, cơ sở nhóm hợp nhất; thanh toán scheduled/manual cha mẹ đầu tiên); phép đo yêu cầu không đóng được                                                      | **Chặn bằng --ratchet**                          |

### Công việc: `docs-sync-strict`

Đối với các yêu cầu kéo tới `main` hoặc `release/**`, công việc này chỉ chạy đối với các ứng viên không phải bản nháp (hoặc hàng đợi đáng tin cậy) được phân loại là thay đổi tài liệu hoặc mã. Nó cũng chạy trên các sự kiện CI không phải PR; trình kích hoạt đẩy của quy trình công việc này chỉ bao gồm `main` chứ không phải `release/**`. Một bước thoát ra khác 0 sẽ chặn công việc; những phát hiện chỉ báo cáo và các trường hợp miễn trừ được ghi chép dưới đây thì không.

| Kịch bản                       | Xác thực                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Chặn                                                                                                                                                                     |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `check:docs-all`               | Cổng meta chạy tuần tự 7 cổng phụ bên dưới                                                                                                                                                                                                                                                                                                                                                                                                                                              | Đúng                                                                                                                                                                     |
| ↳ `check:docs-sync`            | Tính nhất quán của phiên bản Package/OpenAPI/CHANGELOG, bản sao `llm.txt` chính xác, các bất biến CHANGELOG section/size được dịch và không có tài liệu trùng lặp được thay thế                                                                                                                                                                                                                                                                                                         | Đúng                                                                                                                                                                     |
| ↳ `check:docs-frontmatter`     | Các trang tài liệu được biên soạn có tiêu đề hợp lệ                                                                                                                                                                                                                                                                                                                                                                                                                                     | Đúng                                                                                                                                                                     |
| ↳ `check:docs-counts`          | Các bất biến về số lượng có độ tin cậy cao là nghiêm ngặt; kiểm tra số lượng tệp heuristic chỉ cảnh báo trừ khi tập lệnh nhận được `--strict` (cổng meta CI không vượt qua nó)                                                                                                                                                                                                                                                                                                          | Chặn cấp độ nghiêm ngặt; tư vấn cấp mềm                                                                                                                                  |
| ↳ `check:env-doc-sync`         | Nguồn env đọc, `.env.example` và `docs/reference/ENVIRONMENT.md` đồng ý sau khi danh sách cho phép bỏ qua, chỉ tài liệu và chỉ env rõ ràng                                                                                                                                                                                                                                                                                                                                              | Có, nằm ngoài danh sách cho phép được ghi lại                                                                                                                            |
| ↳ `check:deprecated-versions`  | Báo cáo các phiên bản cũ có thể nằm ngoài bối cảnh lịch sử an toàn và ngày cập nhật cũ, ngoại trừ các tài liệu bị bỏ qua                                                                                                                                                                                                                                                                                                                                                                | Tư vấn về hệ thống dây CI hiện tại (`--strict` không được thông qua)                                                                                                     |
| ↳ `check:doc-links`            | Liên kết đánh dấu nội bộ trong tài liệu phân giải thành tệp thực (dạng `[text]`/`(path)` )                                                                                                                                                                                                                                                                                                                                                                                              | Đúng                                                                                                                                                                     |
| ↳ `check:fabricated-docs`      | Các tuyến đường, env vars, lệnh CLI, tên hook và đường dẫn tệp được trích dẫn trong tài liệu đều tồn tại trong cơ sở mã. Cổng cứng qua `--strict`; lỗi mềm không có cờ.                                                                                                                                                                                                                                                                                                                 | Có (thông qua `--strict` trong CI)                                                                                                                                       |
| `check:cli-i18n`               | Các khóa CLI `t()` đã sử dụng tồn tại trong `en`; `pt-BR` giữ lại mọi phần cấp cao nhất; `zh-CN` và `zh-TW` chứa mọi khóa từ `en`                                                                                                                                                                                                                                                                                                                                                       | Đúng                                                                                                                                                                     |
| `check:openapi-coverage`       | Thông số OpenAPI bao gồm ít nhất một tầng các tuyến đường thực                                                                                                                                                                                                                                                                                                                                                                                                                          | Đúng                                                                                                                                                                     |
| `check:openapi-security-tiers` | Các chú thích `x-loopback-only`/`x-always-protected` được khai báo phải được hỗ trợ bởi `routeGuard.ts`; trình phân tích cú pháp và chuyển tiếp khối không khớp. Kiểm tra ngược để tìm `x-loopback-only` bị thiếu trong các tiền tố chỉ cục bộ sẽ cảnh báo và các tuyến đường chỉ có mẫu sẽ bị loại khỏi đường chuyền ngược đó.                                                                                                                                                         | Parser/forward kiểm tra việc chặn; tư vấn kiểm tra ngược                                                                                                                 |
| `check:openapi-routes`         | Mỗi đường dẫn `/api...` trong `openapi.yaml` phân giải tham số không nhạy cảm thành một tuyến thực sau danh sách cho phép `KNOWN_STALE_SPEC` hợp lý; các mục trong danh sách cho phép cũ cũng không thành công                                                                                                                                                                                                                                                                          | Đúng                                                                                                                                                                     |
| `check:docs-symbols`           | Các tham chiếu `/api/...` URL nội bộ trong các tài liệu không phản chiếu chính tắc phân giải thành một tuyến đường thực hoặc họ tuyến đường; Các tham chiếu proxy/upstream/placeholder/file và các mục nhập `KNOWN_STALE_DOC_REFS` hợp lý bị loại trừ và các mục nhập trong danh sách cho phép cũ không thành công                                                                                                                                                                      | Đúng                                                                                                                                                                     |
| `i18n translation drift`       | Việc nhập học tuyệt đối yêu cầu không có nguồn, thiếu mục tiêu, hàm băm mục tiêu, bản dịch cũ và bộ đệm phần không nhất quán. Việc chuẩn bị PR thông thường có thể giữ lại bằng chứng kế thừa chính xác hoặc thay đổi đang chờ xử lý chỉ bằng tiếng Anh với trạng thái hoàn chỉnh và byte mục tiêu không thay đổi; báo cáo của nó tuyên bố riêng về sự sẵn sàng hợp nhất. Thiếu mục tiêu băm và khối bằng chứng cơ sở không đầy đủ. Bộ nhớ đệm phần kế thừa vắng mặt không phải là lỗi. | Tất cả năm lớp đều chặn việc nhập học queue/base ; giấy phép chuẩn bị thông thường chỉ được chứng minh là công việc kế thừa hoặc công việc đang chờ xử lý bằng tiếng Anh |

Mười hai README SVGs trong `docs/diagrams/` được tạo ra (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` tái tạo tất cả chúng). Mỗi cái có một bài kiểm tra đơn vị so sánh byte (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) không thành công khi tệp đã cam kết cũ và `check:docs-counts` đọc các số chuẩn từ các nút `<text>` — của chúng, đó là lý do tại sao bước phác thảo giữ mọi chuỗi được phác thảo trong tệp dưới dạng `<text>` ẩn. Kiểm tra số chuẩn SVG đọc các tệp được liệt kê trong `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, cộng với `public/images/tier-flow-dark.svg` và `tier-flow-light.svg`; các xác nhận quyền sở hữu miễn phí vĩnh viễn, mục nhập danh mục, nhóm định kỳ và yếu tố tính điểm cũng có nội dung là `promise-pillars.svg`, `free-tier-budget.svg` và `strategies-grid.svg`. `free-tier-budget.svg` lấy số liệu từ trình tải danh mục trực tiếp, do đó, thay đổi đối với `FREE_MODEL_BUDGETS` hoặc tên hiển thị của nhà cung cấp sẽ chuyển sang màu đỏ CI cho đến khi tệp đó được tạo lại.

### Công việc: `i18n-ui-coverage`

| Kịch bản                             | Xác thực                                                                                                                                                                                              | Chặn     |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check-ui-keys-coverage` (nội tuyến) | Độ bao phủ của khóa UI i18n là ≥ 65%                                                                                                                                                                  | Đúng     |
| `check-ui-value-drift` (nội tuyến)   | Tiếng Anh được viết lại **giá trị** không để lại bản dịch cũ                                                                                                                                          | Đúng     |
| `check-new-key-coverage` (nội tuyến) | MỘT **mới** Khóa tiếng Anh được dịch sang mọi ngôn ngữ — điểm đánh dấu `__MISSING__:` bị từ chối                                                                                                      | Đúng     |
| `check-translation-ratio`            | Tỷ lệ bản dịch thực trên mỗi ngôn ngữ (giống hệt tiếng Anh / phần giữ chỗ / các trang bị thiếu ngoài danh sách cho phép) không được vượt quá độ trễ `config/quality/i18n-translation-baseline.json` + | **Chặn** |

Cần `fetch-depth: 0` — cổng trôi giá trị khác `en.json` so với cơ sở hợp nhất.

#### Cổng dịch cũ `check-ui-value-drift` —

Nắm bắt được một hồi quy i18n mà các cổng khác về mặt cấu trúc không thể nhìn thấy: một giá trị tiếng Anh được viết lại và các bản dịch bắt nguồn từ tiếng Anh _previous_ được giữ lại, vì vậy những người dùng không phải tiếng Anh vẫn tiếp tục đọc bản sao có từ ngữ tự tin nhưng giờ đã sai.

Điều này được vận chuyển thực sự. `oauthModal.googleOAuthWarning` được viết lại khi trình trợ giúp đăng nhập Antigravity hạ cánh (#5203);**39 trên 43 địa phương** giữ lại văn bản yêu cầu người vận hành "sao chép URL đầy đủ và dán vào bên dưới" — một quy trình không thể hoàn thành đối với nhà cung cấp đó. Nó không được chú ý cho đến #8463 vì:

- `sync-ui-keys` chỉ chèn lấp các khóa được **vắng mặt** , không bao giờ là những cái đó **cũ kỹ** ;
- `check-ui-keys-coverage` tính khóa _hiện diện_, do đó, bản dịch cũ sẽ được coi là đã được che phủ;
- `check-translation-drift` theo dõi tài liệu `docs/i18n/<locale>/**.md` phản ánh — nó không bao giờ đọc `src/i18n/messages/*.json`. Chặn `docs-sync-strict` công việc kể từ lần đồng bộ hóa lại 2026-09: chỉnh sửa tài liệu cốt lõi → `npm run i18n:run -- --files=<doc>` (cấp phần, giá rẻ).

**Nhận biết khác biệt, không được hỗ trợ cơ bản.** Nó so sánh `en.json` ở cơ sở hợp nhất với cây đang hoạt động; đối với mọi khóa có giá trị tiếng Anh thay đổi, bất kỳ ngôn ngữ nào vẫn giữ bản dịch nguyên đều là cũ. Điều này cố tình **đóng băng khoản nợ hiện có** — a diff không thể tiết lộ bản dịch lâu đời đến từ tiếng Anh cổ nào, vì vậy cổng chỉ đánh giá những gì thay đổi hiện tại chạm đến. Giải pháp thay thế (đường cơ sở băm cho mỗi khóa) sẽ tiêu tốn một tệp được tạo ~ 600 KB, 3 × đường cơ sở lớn nhất hiện có, chạy trên mỗi i18n PR.

Hai cách để thỏa mãn nó:

1. cập nhật các bản dịch bị ảnh hưởng, hoặc
2. đặt chúng thành `__MISSING__:<new english>` — trong thời gian chạy, sau đó phục vụ tiếng Anh đã sửa (`src/i18n/request.ts::deepMergeFallback`, #7258) và các hàng đợi chính để dịch.

Nếu chuỗi của **nghĩa** đã thay đổi, thích hơn **đổi tên chìa khóa** : khóa mới không thể kế thừa bản dịch cũ. Đó là mẫu #8463 được sử dụng.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Các cổng khóa giá trị và khóa mới có chung một so sánh bất biến với `scripts/i18n/resolve-ui-diff-base.mjs`. Quy trình làm việc chuyển cùng một cơ sở, đầu cơ sở và SHAs ứng cử viên cho cả hai lần kiểm tra. Các lần chạy PR/base-retarget, đẩy và hợp nhất nhóm sử dụng bối cảnh sự kiện của chúng. Việc gửi một nhánh ứng cử viên yêu cầu PR mở chính xác hoặc đầu vào `i18n_base_sha` rõ ràng. Việc gửi đi hoặc quan sát theo lịch trình đối với `main` hoặc `release/vX.Y.Z` mà không có thông tin đầu vào đó sẽ so sánh cam kết cuối cùng với cam kết gốc đầu tiên của nó; nó không phải là một cuộc kiểm toán tất cả các khoản nợ dịch thuật kế thừa. Lệnh gọi cục bộ yêu cầu cơ sở so sánh rõ ràng, ví dụ như lệnh `BASE_REF` ở trên.

Bối cảnh so sánh bị thiếu hoặc mơ hồ, danh mục bắt buộc không thể đọc được hoặc không hợp lệ và ứng viên đã thay đổi tạo ra `INCOMPLETE` có mã thoát **2** , kể cả ở chế độ cảnh báo. Đọc danh mục sử dụng `scripts/i18n/read-ui-catalog.mjs`; lỗi đọc không được thay thế bằng các đối tượng trống. Cả cơ sở không có sẵn và đầu vào không đầy đủ đều không thiết lập được PASS.

### Công việc: `i18n`

Ma trận xác thực i18n đầy đủ (một công việc cho mỗi ngôn ngữ). Toàn bộ công việc là tư vấn.

| Kịch bản                        | Xác thực                               | Chặn                                                           |
| ------------------------------- | -------------------------------------- | -------------------------------------------------------------- |
| `validate_translation.py quick` | Tính đầy đủ của bản dịch theo ngôn ngữ | **tư vấn** (`continue-on-error: true` trong toàn bộ công việc) |

### Công việc: `pr-test-policy`

Chỉ chạy trên các yêu cầu kéo.

| Kịch bản               | Xác thực                                                                                                                                   | Chặn |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---- |
| `check:pr-test-policy` | PRs thay đổi mã sản xuất trong `src/`, `open-sse/`, `electron/` hoặc `bin/` phải bao gồm hoặc cập nhật các thử nghiệm (Quy tắc cứng #8)    | Đúng |
| `check:test-masking`   | Các tệp kiểm tra đã thay đổi không làm giảm số lượng xác nhận ròng hoặc thêm các phép lặp `assert.ok(true)`                                | Đúng |
| `check:pr-evidence`    | Cơ quan PR trích dẫn bằng chứng test/VPS cho sự thay đổi (cơ giới hóa #18 Quy tắc cứng bằng cách lấy văn xuôi PR — mong manh, xem Backlog) | Đúng |

### Công việc: `test-vitest`

Cần công việc phân loại `changes`. Hợp nhất các khối ma trận có thể áp dụng khi không thành công.

| Suite            | Xác thực                                              | Chặn                                                                                                                    |
| ---------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Máy chủ MCP (110 công cụ), autoCombo, bộ đệm — vitest | Đúng                                                                                                                    |
| `test:vitest:ui` | Thành phần UI kiểm tra Á hậu vitest —                 | **Chặn** Các lỗi tồn tại từ trước — được loại trừ rõ ràng trong `vitest.config.ts`; thất bại mới làm thất bại công việc |

### Quy trình làm việc hàng đêm (theo lịch trình, tư vấn)

Chúng chạy theo lịch trình định kỳ (và `workflow_dispatch`), không bao giờ chạy trên PRs. Tất cả đều mang tính chất tư vấn.

| Quy trình làm việc     | Xác thực                                                                                                                                                                            | Chặn       |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `nightly-property`     | kiểm tra thuộc tính nhanh bằng số lần chạy cao + hạt giống ngẫu nhiên                                                                                                               | **tư vấn** |
| `nightly-resilience`   | cổng tăng trưởng heap, tiêm lỗi hỗn loạn, k6 load/soak                                                                                                                              | **tư vấn** |
| `nightly-llm-security` | bộ bảo vệ tiêm nhắc nhở (chế độ chặn) Đầu dò garak + (bị bỏ qua mà không có bí mật của nhà cung cấp)                                                                                | **tư vấn** |
| `nightly-schemathesis` | Làm mờ hợp đồng OpenAPI (lược đồ) đối với OmniRoute trực tiếp bằng cách sử dụng `docs/openapi.yaml` — vi phạm thông số kỹ thuật bề mặt / 500 giây chưa được xử lý (Giai đoạn 8 B.4) | **tư vấn** |
| `nightly-mutation`     | Điểm kiểm tra đột biến của Stryker trên làn đường đơn vị nhanh — khẳng định các đột biến sống sót trên bề mặt yếu                                                                   | **tư vấn** |
| `nightly-compat`       | Ma trận tương thích công cụ nút trên các phạm vi `engines.node` được hỗ trợ                                                                                                         | **tư vấn** |

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
- **khuyến cáo** — tổng toàn cục so với đường cơ sở đã đóng băng. Độ lệch kế thừa không bao giờ khiến một
  PR vô can bị đánh dấu đỏ; độ lệch được theo dõi để khắc phục khi đối soát bản phát hành và được giám sát bởi
  tác vụ headroom.

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

### CodeQL ratchet: tuyển sinh ứng viên và kiểm kê kho lưu trữ

CI sở hữu việc tiếp nhận CodeQL của ứng viên thông qua chuỗi phụ thuộc rõ ràng: `codeql-scan` gọi ma trận bốn ngôn ngữ trong `codeql.yml`, sau đó `codeql-admission` chạy `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` yêu cầu cả hai kết quả. Chất lượng giữ lại các kiểm tra số của riêng nó nhưng không truy vấn máy quét trước khi nhà sản xuất kết thúc; Chỉ `Gate / Quality` thôi thì chưa đủ để tuyển sinh ứng viên. CodeQL vẫn được yêu cầu đối với những ứng viên chỉ có tài liệu.

Chính sách trong `config/quality/codeql-admission-policy.json` chọn Hành động, C/C++, JavaScript/TypeScript và Python, mặc định của bộ truy vấn, mô hình mối đe dọa từ xa và chế độ xây dựng không có. Nhà sản xuất preflight từ chối bản ghi kích hoạt đang chờ xử lý và phân nhánh bên ngoài danh sách mục tiêu rõ ràng. Mục tiêu hiện tại là các thử nghiệm Hợp đồng chính và release/v3.8.54. so sánh danh sách hữu hạn này và trình kích hoạt đẩy bảo trì với phiên bản gói; bản phát hành tiếp theo cần được xem xét tích hợp. Trình kích hoạt PR bản phát hành rộng hơn hiện có của CI vẫn được giữ lại, nhưng mục tiêu không được đưa lên báo cáo HOLD trước khi trích xuất thay vì thu được PASS không được đo lường.

Mỗi công việc ma trận ghi lại ID tải lên SARIF thực tế của nó, ngôn ngữ, danh mục, lần chạy và thử, nhận dạng quy trình làm việc của người gọi, ref/head/base/merge SHA sự kiện và hàm băm chính sách. Công việc phụ thuộc chỉ tải xuống các biên nhận của lần chạy này và xác thực các bản tóm tắt giả tạo. Nó yêu cầu tất cả bốn danh mục, một nhà sản xuất thành công và xử lý hoàn tất từng lần tải lên chính xác. Nó sử dụng bộ lọc sarif_id của API, không phải phân tích mới nhất được tìm thấy trên một nhánh. Việc chạy lại một phần có thể sử dụng lại các danh mục thành công từ lần thử trước đó của cùng một lần chạy và ứng cử viên, duy trì nỗ lực sản xuất; nhà sản xuất hiện tại thất bại không thể tái sử dụng bằng chứng xanh trước đó.

Hành động CodeQL chờ xử lý, nhưng việc triển khai được ghim của nó có thể cảnh báo và tiếp tục sau khi đọc trạng thái không thành công hoặc chờ hết. Do đó, việc nhập học sẽ xác minh lại quá trình xử lý. Thiếu danh mục, xử lý đang chờ xử lý, công việc không thành công hoặc bị hủy, danh tính cũ, phân trang không đầy đủ hoặc APIs không có sẵn tạo ra HOLD và thoát 2. Không có sự chờ đợi cố định nào cho quy trình quét độc lập. PR chưa được quét không thể vượt qua vì truy vấn cảnh báo trả về 0. Số lượng đo được trên `metrics.codeqlAlerts.value` thoát ra 1; đường cơ sở không được nâng lên để hấp thụ các cảnh báo của chi nhánh khác. [Tải lên trạng thái và tra cứu phân tích](https://docs.github.com/en/rest/code-scanning/code-scanning).

Hồ sơ biên nhận tải lên và phân tích IDs, danh mục, phiên bản công cụ, ref/SHA, số cơ sở và cảnh báo. Số lượng SARIF identity/result, số lượng quy tắc tối thiểu và các trường hợp cảnh báo chính xác vẫn là bắt buộc. Danh tính PR/analysis được kiểm tra lại trước khi chấp nhận. Những kiểm tra này thiết lập phạm vi danh mục được định cấu hình chứ không phải bản kiểm kê của mọi tệp nguồn được trích xuất. Trích xuất không xây dựng C/C++ không bao gồm mã được tạo trong quá trình xây dựng dự án. Các loại trừ nguồn vẫn cần được xem xét và việc ghi công của người đóng góp cần có bằng chứng cơ sở chính xác có thể so sánh được.

`codeql-maintenance.yml` cung cấp các bản quét đẩy phát hành tích cực và lịch trình hàng tuần mà không trùng lặp với các nhà sản xuất PR/main. `nightly-codeql-inventory.yml` giữ đường cơ sở trên toàn kho lưu trữ riêng biệt, có `--strict-measurement` và lỗi khi không có phép đo. Sự bỏ qua duyên dáng của nhà sưu tập di sản địa phương không phải là ứng cử viên. Thắt chặt vẫn là một `--update` rõ ràng sau khi số lượng toàn cầu được xác minh thấp hơn.

Quy trình công việc Nâng cao không được xuất bản trong khi Thiết lập mặc định được định cấu hình: GitHub từ chối sự kết hợp đó. Chính sách được phiên bản của nó vẫn đang chờ xử lý cho đến khi quá trình chuyển đổi quản trị đã xem xét được đọc lại. Trước khi xuất bản, kho lưu trữ ghim toán tử, hàm băm head/base/tree, policy/patch/rollback và trạng thái thiết lập được quan sát; `node scripts/quality/codeql-producer.mjs verify-admin-readback` kiểm tra các bản ghi JSON thực tế và dự kiến được cung cấp. Đây là biện pháp bảo vệ kỹ thuật, không phải là sự chấp thuận của nhà điều hành hoặc sự thay thế để tìm nạp các bản đọc lại mới. Mã thông báo PR không bao giờ yêu cầu quyền truy cập Quản trị. Việc triển khai và bất kỳ thay đổi nào về máy quét đều yêu cầu đọc lại riêng biệt cộng với bằng chứng thực tế về khả năng tương thích PR, phân nhánh và nhóm hợp nhất.

Các fork sử dụng các trình chạy được lưu trữ, kiểm tra mà không có thông tin xác thực lâu dài, không có install/build dự án trong nhà sản xuất và không có bí mật kho lưu trữ được kế thừa. GitHub hỗ trợ tải lên SARIF cho sự kiện pull_request với mã thông báo phân nhánh đã giảm bớt; phê duyệt thực hiện đóng góp lần đầu vẫn là chính sách GitHub. Không bao giờ sử dụng pull_request_target để thực thi mã không đáng tin cậy. Xác nhận quyền thực tế của mã thông báo, phân tích_key và tất cả các môi trường danh mục trong canary được kiểm soát trước khi xem xét quá trình di chuyển hoàn tất. [Quy tắc tải lên phân nhánh](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [chế độ thiết lập xung đột](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Việc sa thải là lời kêu gọi của nhà điều hành (Quy tắc cứng #14)** — không bao giờ loại bỏ cảnh báo CodeQL mà không ghi lại lý do kỹ thuật trong nhận xét loại bỏ: `won't fix` cho yêu cầu giao thức ngược dòng, `used in tests` cho thiết bị thử nghiệm, `false positive` cho chất khử trùng CodeQL không thể nhìn thấy (tiền lệ: `docs/security/ERROR_SANITIZATION.md`).

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
2. Thêm `"check:<name>": "node scripts/check/check-<name>.mjs"` vào `package.json`, và
   đồng bộ bí danh cùng lệnh chính xác của bí danh đó trong `config/quality/gate-manifest.json`.
   Áp dụng quy trình đồng bộ tương tự khi thay đổi hoặc xóa một bí danh xác thực hiện có.
   Chạy `npm run check:gate-manifest`; hook pre-commit và cơ chế phân loại thay đổi của CI
   sẽ thực thi hợp đồng này.
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

**Các mục cũng chưa được ghi ở trên** (khuyến nghị, tín hiệu thấp): tác vụ `docs-lint` (markdownlint + Vale, toàn tác vụ dùng `continue-on-error`) và các quy trình máy quét độc lập `semgrep.yml` / `scorecard.yml`. CodeQL hiện có các tác vụ tạo và tiếp nhận bắt buộc dưới `Gate / CI`, chịu các yêu cầu kích hoạt đã nêu. `semgrepFindings: 0` có trong `quality-baseline.json` nhưng chưa nối vào cơ chế siết ngưỡng chặn trong `ci.yml` — chỉ số này hiện chưa có kiểm tra thực thi tương ứng.

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
