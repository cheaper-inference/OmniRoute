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

Mỗi quy trình công việc CI và Cổng chất lượng đều đưa ra phán quyết ổn định: `Gate / CI` và `Gate / Quality`. Chính sách tuyển sinh theo phiên bản của họ liệt kê mọi công việc ngược dòng theo yêu cầu hoặc tư vấn. Một công việc bắt buộc phải thành công: các kết quả bị thiếu, bị hủy, bị bỏ qua, đang chờ xử lý và không xác định thì không thể thiết lập PASS. Phân loại chỉ tài liệu hoặc danh mục hợp lệ có thể khiến làn mã không thể áp dụng được; một bản dự thảo PR thông thường không phải là một ứng cử viên được chấp nhận. Nhãn `hotfix` không từ bỏ bằng chứng.

Cả hai quy trình công việc đều bao gồm PRs thành các nhánh main/release, đẩy tới `main`, gửi thủ công và các sự kiện nhóm hợp nhất. Đẩy, gửi và nhóm hợp nhất chạy toàn bộ lựa chọn. Bản nháp hàng đợi Hợp nhất đáng tin cậy cũng chạy các công việc `full-code`/`full-code-e2e` hiện hành; PRs thông thường bỏ qua chúng. Trước khi hợp nhất thủ công, hãy chạy một công văn đầy đủ trên ứng viên chính xác. Việc đẩy tới `release/**` không bắt đầu các quy trình công việc này; Release-Green quan sát riêng căn cứ đã hợp nhất ( làn đường được lưu trữ `docs/ops/RUNNER_BOX.md` → ). Nhóm phân nhánh và hợp nhất sử dụng các trình chạy được lưu trữ cho các công việc mà mặt khác sẽ chọn các trình chạy tự lưu trữ; đủ dung lượng lưu trữ phải được xác minh trước khi triển khai.

Một PR bình thường chạy lựa chọn nhanh. Các làn `full-code` và `full-code-e2e` của chính sách tiếp nhận (E2E, tích hợp, tạo phẩm gói, Electron smoke, Bun SQLite, hệ sinh thái và giao thức khách hàng) chỉ chạy trên bản nháp hàng đợi Hợp nhất hoặc chạy đầy đủ: `gh workflow run ci.yml --ref <branch>`.

Mỗi biên nhận JSON xác định SHA đã kiểm xuất, lần chạy và lần thử quy trình làm việc. CLI từ chối checkout/event SHA không khớp. Kiểm tra quy trình làm việc liên kết tư cách thành viên chính sách với danh sách `needs` của công việc phán quyết để làn đường mới hoặc làn đường bị xóa không thể biến mất một cách âm thầm. Biên nhận bao gồm quy trình làm việc của riêng họ, không phải xuất bản, triển khai hoặc nội bộ của máy quét tư vấn hiện có. Việc thực hiện các bước kiểm tra hiện hành được yêu cầu trong quy định của chi nhánh là một thay đổi hành chính riêng biệt; việc xác định công việc của họ không tự nó bảo vệ một chi nhánh.

`API Route Typecheck` là một quy trình kiểm tra quy trình làm việc độc lập, bên ngoài cả các phán quyết tổng hợp và hồ sơ tĩnh đầy đủ của người quan sát cục bộ. Kiểm tra kết quả của nó một cách riêng biệt cho ứng cử viên chính xác. `.github/workflows/api-route-typecheck.yml` chạy trên PRs vào `main` hoặc `release/**`, đẩy tới họ nhánh, gửi thủ công và các sự kiện `merge_group` thuộc loại `checks_requested`. Nó không có bộ lọc đường dẫn. Hợp nhất các nhóm kiểm tra `merge_group.head_sha`; các sự kiện khác hãy xem `github.sha`. Tất cả các sự kiện đều sử dụng cùng một cổng chẩn đoán API và các bài kiểm tra đơn vị cổng. nhắm mục tiêu lại cơ sở PR yêu cầu kiểm tra mới; Các chỉnh sửa body/title sử dụng tên chỉ quan sát `Admission not requested / API Route Typecheck` và không thể thay thế kiểm tra nhập học.

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

### DAST sử dụng bản dựng CI đã được xác minh

Tác vụ CI bắt buộc `dast-smoke` gọi `.github/workflows/dast-smoke.yml` sau `build`. Nó áp dụng cùng cách chọn thay đổi mã và trạng thái bản nháp như bản dựng, bao gồm PR từ fork được hỗ trợ, PR nhắm vào release và nhóm hợp nhất. Tác vụ DAST thiếu, thất bại, bị hủy hoặc bị bỏ qua ngoài dự kiến sẽ chặn `Gate / CI`. Quy trình tái sử dụng không có trình kích hoạt PR hay thủ công độc lập; xác minh thủ công dùng chức năng kích hoạt của CI để bản dựng và bên tiêu thụ ở cùng một lần chạy.

`scripts/ci/next-build-provenance.mjs` niêm phong toàn bộ tạo tác Next cùng giá trị băm tar, kho mã/sự kiện/lần chạy, lần thử của bên tạo, head/base/checkout/tree, định danh quy trình, tệp khóa, phiên bản/ABI Node chính xác, nền tảng và công cụ đóng gói. DAST chọn ID tạo tác bất biến từ `needs.build.outputs`, yêu cầu xác minh giá trị băm tải xuống, rồi tự tính băm ZIP để so với giá trị của bên tạo trước khi giải nén hai thành viên trong danh sách cho phép bằng `scripts/ci/unpack-ci-build.py`. Bản kê và tệp tar cũng phải khớp với các đầu ra độc lập của bên tạo trước khi giải nén cây Next. Nó không bao giờ tìm bản dựng thành công mới nhất của nhánh. Chạy lại một phần có thể dùng lại đúng lần thử của bên tạo khi ID và mọi đầu vào vẫn khớp; biên nhận ghi cả hai lần thử.

Bên tiêu thụ tiếp tục chạy trên runner Linux được lưu trữ, chỉ có quyền đọc kho mã và không có bí mật của kho mã. Nó cài đúng phiên bản Node của bên tạo, rồi lắp ráp CLI với `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` từ chối đầu vào thiếu máy chủ standalone trước khi thực hiện bất kỳ bản dựng dự phòng nào; các bản dựng CLI cục bộ thông thường giữ nguyên cơ chế dự phòng. Kiểm tra máy chủ sẵn sàng, Schemathesis và promptfoo đều phải thành công trong giới hạn tác vụ 25 phút không đổi. Biên nhận nguồn gốc chứng minh định danh và byte đầu vào, không chứng minh quét DAST thành công. Tạo tác hết hạn, runner bị gián đoạn hoặc máy quét thất bại vẫn là bằng chứng chưa đầy đủ hoặc thất bại; không thể biến thành PASS thông qua lớp bọc chỉ mang tính khuyến nghị.

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

### Biên nhận tiến trình thực thi kiểm thử đơn vị

Lệnh dùng chung `test:unit:ci:shard` ghi lại các giai đoạn `primary`, `dashboard` và `serial`
thông qua `scripts/ci/unit-progress-reporter.mjs`. Báo cáo kiểm thử thông thường vẫn được
cung cấp. Một biên nhận riêng chỉ chứa siêu dữ liệu sẽ ghi lại thời điểm bắt đầu và hoàn tất
của từng tệp, đồng thời một tín hiệu nhịp tim mỗi 30 giây sẽ liệt kê các tệp vẫn đang hoạt động
và thời gian đã trôi qua của chúng. Biên nhận chỉ ghi lại siêu dữ liệu thực thi có trong danh sách
cho phép; mô tả kiểm thử, đầu ra, nội dung lỗi và toàn bộ môi trường không được tuần tự hóa.

CI giữ lại các tệp JSONL dưới tên `unit-progress-ci-<run>-<attempt>-<shard>`. Việc hết thời gian chờ của một tác vụ có thể
ngăn quá trình tải lên sau đó; các tín hiệu nhịp tim đã được phát vẫn là bằng chứng chẩn đoán.
Việc thiếu tín hiệu nhịp tim cũng có thể phản ánh một tiến trình runner bị chặn hoặc chấm dứt.
Các biên nhận này duy trì nguyên trạng cách lựa chọn kiểm thử, mức độ đồng thời, thời hạn và
trạng thái thoát hiện có; chúng không phải là phán quyết tiếp nhận ứng viên.

### Hợp nhất hàng đợi

Nhãn `queue` gửi PR đến hàng đợi Hợp nhất (`.mergify.yml`). Hợp nhất mở một bản nháp PR trên một nhánh `mergify/merge-queue/`, CI chạy toàn bộ lựa chọn ở đó và PR ban đầu hợp nhất khi `Gate / CI`, `Gate / Quality` và `Merge integrity (changelog + generated skills)` vượt qua.

Hợp nhất ghi tóm tắt hàng đợi của nó vào mô tả của bản nháp và các ứng dụng khác cũng có thể chỉnh sửa nó. Sự kiện `pull_request` `edited` trên bản nháp như vậy có nhóm tương tranh riêng (`-queue-edit-<run_id>`) nên nó không thể hủy quá trình chạy thực sự của bản nháp và nó bỏ qua cổng và ma trận. Chỉ `Merge integrity` vẫn chạy. Công việc cổng bị bỏ qua mang một tên kiểm tra khác, vì Mergify đọc `Gate / CI` bị bỏ qua là kiểm tra không thành công và loại bỏ PR.

Sau một lần dequeue, một lần đẩy không phải lúc nào cũng yêu cầu PR. Bình luận `@mergifyio queue` về nó.

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

### Tình trạng tài liệu cơ sở đã xuất bản

`.github/workflows/i18n-base-health.yml` theo dõi tình trạng tài liệu sau một số lần
push được chọn lên `main` và `release/v*`, cũng như khi được kích hoạt thủ công. Các bộ lọc của quy trình bao quát tài liệu,
Markdown ở thư mục gốc, `llm.txt`, trạng thái/cấu hình bản dịch và công cụ i18n liên quan.
Job duy nhất `Published base documentation health` sử dụng Ubuntu được lưu trữ và có thời hạn
năm phút. Job này thực hiện xác thực chỉ đọc và ghi biên nhận chẩn đoán mà không
cài đặt phần phụ thuộc, dịch hay tiếp nhận trạng thái.

`scripts/i18n/check-base-health.mjs` yêu cầu không có bất kỳ sự không nhất quán nào về hàm băm nguồn, đích bị thiếu, hàm băm đích,
bản dịch lỗi thời và bộ nhớ đệm phần. Script này cũng xác thực phạm vi tài liệu cốt lõi/ngôn ngữ hiện tại
cùng nguồn gốc đã ghi nhận của phạm vi đó. Ngữ cảnh không hợp lệ, phạm vi bao phủ không đầy đủ
hoặc trình kiểm tra bị gián đoạn sẽ tạo ra `INCOMPLETE`; độ lệch đã xác nhận sẽ tạo ra `FAIL`. Cả hai
đều trả về trạng thái thoát thất bại. Biên nhận được liên kết với SHA của bản checkout, quy trình công việc, lượt chạy và
lần thử, đồng thời được lưu giữ dưới tên `i18n-base-health-<sha>-<run>-<attempt>`.

Đây là hoạt động quan sát độc lập đối với cơ sở đã xuất bản. Hoạt động này không thêm sự kiện PR hoặc
nhóm hợp nhất, kiểm tra PR bắt buộc, bí danh npm hay thành viên hồ sơ quét tĩnh.
Chính sách PR vi sai hiện có và các phân loại tư vấn của trình kiểm tra nền tảng
vẫn tách biệt. Việc tải lên thành công không thể biến kết quả tình trạng thất bại thành PASS.

### Phát hành đường dẫn nhanh PR (`quality.yml`)

`.github/workflows/quality.yml` bổ sung CI trên main/release PRs, đẩy tới `main`, gửi và hợp nhất các nhóm. PRs sử dụng kiểm tra nhanh được lọc theo đường dẫn. Bản dựng trùng lặp bị vô hiệu hóa vĩnh viễn đã bị xóa; séc build/package/boot thực vẫn ở CI. Bộ đơn vị và vitest chỉ chạy bằng CI (`Unit Tests (N/8)` và `Vitest`).

| Công việc                                        | phạm vi                                                                                                                                                                                                                                               | Chặn               |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `Docs Gates (fast-path)`                         | Docs/code PRs; tài liệu API ref và docs-all                                                                                                                                                                                                           | Đúng               |
| `Fast Quality Gates`                             | Mã PRs; kiểm tra tĩnh, kiểm tra đánh máy, kiểm tra đánh máy bảng điều khiển, kiểm tra đơn vị bị ảnh hưởng                                                                                                                                             | Đúng               |
| `Forgotten sibling tests`                        | Mã PRs; đã thay đổi các mô-đun truy tìm người tiêu dùng tĩnh và các bài kiểm tra anh chị em ứng viên; đường dẫn nhập thùng và nhập động được báo cáo dưới dạng chẩn đoán tư vấn, với các trường hợp ngoại lệ trong danh sách cho phép được tham chiếu | **tư vấn**         |
| `No new ESLint warnings`                         | Mã PRs; bảo vệ lint nhận biết được sự ức chế                                                                                                                                                                                                          | Có, bao gồm cả nĩa |
| `Merge integrity (changelog + generated skills)` | PRs không dự thảo ; đồng bộ hóa thay đổi và kỹ năng được tạo                                                                                                                                                                                          | Có, bao gồm cả nĩa |

#### Báo cáo kiểm tra anh chị em bị lãng quên

`npm run check:forgotten-sibling-tests` chạy như một bước tư vấn của `Fast Quality Gates` và sử dụng lại trình phân giải nhập đằng sau bản đồ tác động thử nghiệm. Đối với mỗi mô-đun sản xuất đã thay đổi, nó sẽ báo cáo các chuỗi `changed module/symbol -> static consumer -> candidate sibling test` xác định khi bài kiểm tra ứng viên không có trong khác biệt yêu cầu kéo. Tóm tắt Markdown và kết quả JSON được giữ lại dưới dạng cấu phần công việc `forgotten-sibling-tests` để hiệu chỉnh trước khi triển khai chặn.

Tái xuất thùng và nhập khẩu động chỉ là chẩn đoán giải pháp; họ không bao giờ tạo ra một phát hiện chặn. Đã xem xét các trường hợp ngoại lệ trực tiếp trong `config/quality/forgotten-sibling-allowlist.json`. Mỗi mục nhập phải nêu tên bài kiểm tra của người tiêu dùng và ứng viên, đưa ra lý do cụ thể và liên kết một vấn đề GitHub hoặc yêu cầu kéo. Các mục không đúng định dạng không đóng được. Các ngoại lệ không thể ngăn chặn một bài kiểm tra ứng viên đã bị xóa hoặc một khác biệt có thêm `.skip`/`.todo`; khẳng định sự suy yếu và việc che giấu khác vẫn thuộc quyền sở hữu của cổng `check:test-masking` chặn độc lập.

### Tác vụ: `lint`

Chạy trên mọi PR vào `main`. Chặn hợp nhất khi thất bại.

| Script (`npm run ...`)            | Xác thực                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Chặn                                        |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | Phiên bản Node.js nằm trong phạm vi được hỗ trợ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Có                                          |
| `check:cycles`                    | Các import vòng trên toàn bộ `src/` + `open-sse/` (dựa trên AST, đã phân giải `paths` của tsconfig). Lệnh cơ bản thoát với mã 1 bất cứ khi nào tồn tại chu trình (đóng khi lỗi kể từ #15281) và liệt kê các SCC. `check:cycles:ratchet` (lệnh CI chạy) sẽ chặn khi số lượng vượt quá mức trần `metrics.cycles` trong `quality-baseline.json` — hiện là 14, `direction: down`, vì vậy giá trị này chỉ có thể giảm (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Có (ratchet)                                |
| `check:boundary`                  | Mức liên kết `open-sse → src`: các import duy nhất từ tệp đến tệp, từ engine vào ứng dụng (`scripts/quality/measure-boundary.mjs`; danh sách cạnh là backlog khắc phục cho việc tách core/module v4). Lệnh cơ bản = báo cáo tư vấn (giống `quality:boundary`). `check:boundary:ratchet` (lệnh CI chạy, cũng nằm trong vòng lặp ratchet fast-gates của `quality.yml`) sẽ chặn khi số lượng vượt quá mức trần `metrics.boundaryOpenSseToSrc` trong `quality-baseline.json` — được khởi tạo ở giá trị đo được là 771, `direction: down`; `--update` chỉ giảm giá trị này; tương đối so với nhánh cơ sở trên các PR (`--base-ref`, xem bên dưới)                                                                                                                                                                                                                                                                                                                                                                                                   | Có (ratchet)                                |
| `check:route-validation:t06`      | Các schema Zod hiện diện trên tất cả các route (chính sách Cấp 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Có                                          |
| `check:any-budget:t11`            | Số lượng `@ts-expect-error // any` không vượt quá ngân sách (cổng kiểm soát Tier 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Có                                          |
| `check:provider-consistency`      | Mọi nhà cung cấp trong `providers.ts` đều có mục tương ứng trong `providerRegistry.ts` (và ngược lại, trong phạm vi danh sách cho phép)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Có                                          |
| `check:model-lifecycle`           | Ba bảng định tuyến được duy trì thủ công luôn nhất quán với bản chụp vòng đời đã được đưa vào kho mã nguồn (#11503): `FITNESS_TABLE` (`taskFitness.ts`) không chấm điểm bất kỳ id đã ngừng hoạt động nào mà `REGISTRY` có thể định tuyến; mọi đích của `BUILT_IN_ALIASES` đều có trong `REGISTRY` và không có trong bản chụp id đã ngừng hoạt động; mọi id đã ngừng hoạt động nhưng vẫn còn trong `REGISTRY` đều được chuyển tiếp hoặc được liệt kê trong `allowedRetiredInCatalog`; và không có nguồn hoặc đích nào của `DEFAULT_DEGRADATION_MAP` xuất hiện dưới dạng đã ngừng hoạt động trong bản chụp đó. Điều này không chứng minh rằng một mô hình hiện đang được cung cấp bởi một dịch vụ thượng nguồn đang hoạt động. Ngoại tuyến — so sánh với `config/quality/model-lifecycle.json`, được làm mới thủ công bằng `npm run quality:refresh-model-lifecycle` (cần mạng; không được tích hợp vào CI). `allowedRetiredInCatalog` là một cơ chế siết dần: chỉ thêm mục khi có vấn đề theo dõi.                                              | Có                                          |
| `check:fetch-targets`             | Mọi `fetch("/api/...")` trong `src/` phía máy khách đều phân giải đến một `route.ts` thực sự                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Có                                          |
| `check:deps`                      | Tất cả phần phụ thuộc có thể cài đặt bằng `npm install` trong mọi `package.json` của kho mã nguồn đều có trong `dependency-allowlist.json`; các gói mới không được ghim phiên bản hoặc có tên dễ bị chiếm dụng sẽ bị gắn cờ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Có                                          |
| `audit:deps`                      | Kiểm tra bảo mật npm đối với cả năm tệp khóa độc lập (gốc, Electron, plugin OpenCode v1/v2 và nhà cung cấp). Các cảnh báo nghiêm trọng sẽ chặn; các cảnh báo mức cao vẫn hiển thị dưới dạng cảnh báo. Các lần kiểm tra bị thiếu/thất bại được đánh dấu là INCOMPLETE và sẽ chặn; hàm băm của tệp khóa và báo cáo theo từng phạm vi được lưu giữ.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Có                                          |
| `check:lockfile`                  | Tính toàn vẹn của `package-lock.json` — registry https, hàm băm toàn vẹn, không ghi đè máy chủ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Có                                          |
| `check:licenses`                  | Danh sách cho phép giấy phép SPDX dành cho các dependency production                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Có                                          |
| `check:tracked-artifacts`         | Không có artifact bản dựng / symlink `node_modules` đã commit (cũng chạy trong pre-commit của husky; pre-push được chủ ý giữ ở mức nhẹ — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Có                                          |
| `check:ai-attribution`            | Không có trailer `Co-Authored-By` của AI/bot hoặc phần chân trang cho biết nội dung do AI tạo trong các commit, tiêu đề hoặc nội dung PR — Quy tắc cứng #16 (trong vòng lặp cổng kiểm tra nhanh của `quality.yml` cho PR→`release/**` — đọc payload sự kiện, không thực hiện thao tác ngoài PR — và một bước chỉ dành cho PR trong bước lint của `ci.yml` đối với PR→`main`; cũng áp dụng trong hook `commit-msg` của husky; cho phép đồng tác giả là con người; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:vitest-exclusions`         | Mỗi mục loại trừ Vitest phải nêu một issue theo dõi và xuất hiện trong `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Có                                          |
| `check:file-size`                 | Các tệp nguồn (`.ts`/`.tsx` trong `src/`, `open-sse/`, `electron/`, `bin/`) phải nằm trong giới hạn `cap` và các tệp kiểm thử (`*.test.ts(x)`) trong giới hạn `testCap`; các tệp bị đóng băng trong `file-size-baseline.json` (`frozen` / `testFrozen`) không được tăng vượt quá kích thước đã ghi nhận                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Có                                          |
| `check:error-helper`              | Phản hồi lỗi trong executor/handler sử dụng `buildErrorBody()` / `sanitizeErrorMessage()` (Quy tắc bắt buộc #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Có                                          |
| `check:migration-numbering`       | Các tệp SQL migration được đánh số tuần tự, không có khoảng trống hoặc số trùng lặp                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Có                                          |
| `check:public-creds`              | Không có giá trị OAuth `client_id`/`client_secret` hoặc khóa Firebase Web dạng ký tự cố định bên ngoài `publicCreds.ts` (Quy tắc bắt buộc #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Có                                          |
| `check:db-rules`                  | Không có SQL thô bên ngoài các module `src/lib/db/`; không có barrel import từ `localDb.ts` (Quy tắc bắt buộc #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Có                                          |
| `check:known-symbols`             | Các executor của nhà cung cấp, chiến lược định tuyến và trình chuyển đổi được đăng ký trong bảng điều phối tương ứng phải khớp với các tệp trên đĩa — không có symbol mồ côi hoặc chưa được khai báo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Có                                          |
| `check:route-guard-membership`    | Mọi route tạo tiến trình con đều được phân loại bởi `isLocalOnlyPath()` (Quy tắc bắt buộc #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Có                                          |
| `check:test-discovery`            | Mọi tệp `*.test.ts` / `*.spec.ts` trong repo đều được ít nhất một trình chạy kiểm thử thu thập (ratchet: danh sách tệp mồ côi trong `test-discovery-baseline.json` chỉ có thể thu hẹp)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Có                                          |
| `check:test-tla-order`            | Không có tệp `node:test` nào trong `tests/unit` đăng ký một bài kiểm thử, gặp một `await` ở cấp cao nhất, rồi tiếp tục đăng ký thêm (#18045; ratchet: `test-tla-order-allowlist.json` chỉ có thể thu hẹp)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Có                                          |
| `check:agent-skills-sync`         | Các artifact agent-skills đã tạo khớp với danh mục nguồn của chúng (không sai lệch)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:provider-asset-provenance` | Logo/tài nguyên của nhà cung cấp có mục thông tin nguồn gốc được ghi lại                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `lint:json`                       | Các tệp cấu hình JSON được phân tích cú pháp thành công và đáp ứng các quy tắc lint của repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `typecheck:core`                  | Biên dịch TypeScript không có lỗi (chỉ có cảnh báo mang tính khuyến nghị)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Có                                          |
| `typecheck:noimplicit:core`       | `noImplicitAny` nghiêm ngặt — hướng tới tương lai; nhiều vị trí gọi có sẵn vẫn cần chú thích                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **Khuyến nghị** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` được giới hạn trong `src/app/(dashboard)/**` (#7033) — danh sách cho phép gồm 27 tệp đã được chọn lọc của `typecheck:core` không bao gồm bất kỳ tệp TSX nào của dashboard, và `next build` cũng không bao giờ kiểm tra kiểu cho chúng (`next.config.mjs` đặt `ignoreBuildErrors: true`), vì vậy các lỗi hồi quy về định danh không còn được tham chiếu tại đó (#6625/#6909) không bị CI phát hiện. So sánh chênh lệch với đường cơ sở cố định về số lượng theo từng tệp/từng mã TS (`config/quality/dashboard-typecheck-baseline.json`, cùng mẫu thực thi kiểm tra lỗi thời như `check:known-symbols`) — chỉ các lỗi MỚI vượt quá số lượng trong đường cơ sở mới khiến cổng kiểm tra thất bại; hạ dần đường cơ sở bằng `--update` khi một lỗi tồn tại từ trước được sửa.                                                                                                                                                                                                                                                                 | Có                                          |
| `check:build-typecheck`           | Kiểm tra kiểu production trên toàn bộ ứng dụng đối với `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), là phần mà danh sách cho phép 27 tệp của `typecheck:core` và cổng dashboard không bao phủ. So sánh các khác biệt với `config/quality/build-typecheck-baseline.json`; số lượng theo từng cặp (tệp, mã) mới hoặc tăng lên sẽ làm kiểm tra thất bại, còn số lượng giảm xuống sẽ yêu cầu bạn giảm dần cơ sở. `--update` sẽ từ chối khi lần chạy chứa một cặp mới hoặc tăng lên nếu không truyền `--force-regressions`, đồng thời từ chối một tệp mới bị tắt kiểm tra nếu không truyền `--force-nocheck`, vì vậy việc mở rộng cơ sở để đạt trạng thái thành công và cấp quyền im lặng vĩnh viễn là hai hành động có chủ đích riêng biệt. Một `--force` đơn lẻ sẽ bị từ chối. Đồng thời quét phạm vi build để tìm `@ts-nocheck` dựa trên `config/quality/ts-nocheck-baseline.json`, vì một tệp sử dụng nó sẽ không báo bất kỳ chẩn đoán nào và nếu không sẽ vô hình đối với mọi cổng kiểm tra. | Có                                          |

#### Hai chương trình kiểm tra kiểu cho các câu trả lời khác nhau

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) và `check:build-typecheck` biên dịch các chương trình khác nhau với
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

Chạy sau `test-coverage`. Chặn hợp nhất khi thất bại.

| Tập lệnh                     | Nội dung xác thực                                                                                                                                                                     | Chặn                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `quality:collect`            | Xuất `quality-metrics.json` (số lượng cảnh báo ESLint, độ bao phủ từ báo cáo phân đoạn đã hợp nhất)                                                                                   | Có (đầu vào của cơ chế điều chỉnh tăng dần) |
| `quality:ratchet`            | Mỗi chỉ số trong `quality-baseline.json` không bị suy giảm (cảnh báo ESLint ≤ đường cơ sở; độ bao phủ ≥ đường cơ sở)                                                                  | Có                                          |
| `check:duplication`          | Mức độ trùng lặp mã (jscpd@4) không vượt quá đường cơ sở trong `quality-baseline.json`                                                                                                | Có                                          |
| `check:complexity`           | Độ phức tạp cyclomatic ở cấp tệp không vượt quá giới hạn (các quy tắc ESLint cốt lõi `complexity` + `max-lines-per-function`)                                                         | Có                                          |
| `check:cognitive-complexity` | Cơ chế điều chỉnh tăng dần độ phức tạp nhận thức (`eslint-plugin-sonarjs`) — một lượt ESLint riêng; CI chạy cả hai, được hợp nhất thành một bước `check:complexity-ratchets` duy nhất | Có                                          |
| `check:dead-code`            | Cơ chế điều chỉnh tăng dần đối với tệp / mục xuất không được sử dụng (knip) không bị suy giảm so với đường cơ sở                                                                      | Có                                          |
| `check:compression-budget`   | Ngân sách điểm chuẩn nén — mức tiết kiệm token tối thiểu của từng công cụ không được suy giảm                                                                                         | Có                                          |
| `check:type-coverage`        | Cơ chế điều chỉnh tăng dần tỷ lệ phần trăm được định kiểu (`type-coverage`) không bị suy giảm; phần lớn bao hàm `typecheck:noimplicit:core`                                           | Có                                          |

### Tác vụ: `codeql-scan` và `codeql-admission`

`codeql-scan` tạo tất cả các loại phân tích đã cấu hình. Sau khi tác vụ đó thành công, `codeql-admission` xác minh đúng các lượt tải lên của nó và cơ chế siết ngưỡng cảnh báo của ứng viên. Cả hai đều là phụ thuộc bắt buộc của `Gate / CI`, kể cả với ứng viên chỉ sửa tài liệu. Các yêu cầu kích hoạt quản trị và thử nghiệm canary được mô tả ở mục “Siết ngưỡng CodeQL” bên dưới.

| Tập lệnh               | Nội dung xác minh                                                                                                                                                                                             | Chặn |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| `check:codeql-ratchet` | ref/SHA của ứng viên và tất cả các loại phân tích đã cấu hình phải hiện hành trước khi kiểm tra ngưỡng cảnh báo; thiếu bằng chứng sẽ chặn. Kiểm kê toàn cục vẫn tách biệt — xem “Siết ngưỡng CodeQL” bên dưới | Có   |

### Job: `quality-extended`

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

### Job: `docs-sync-strict`

Đối với pull request vào `main` hoặc `release/**`, job này chỉ chạy cho các ứng viên không phải bản nháp (hoặc thuộc hàng đợi tin cậy), được phân loại là thay đổi tài liệu hoặc mã nguồn. Job cũng chạy trên các sự kiện CI không phải PR; trình kích hoạt push của workflow này chỉ áp dụng cho `main`, không áp dụng cho `release/**`. Bước kết thúc với mã khác 0 sẽ chặn job; các phát hiện chỉ để báo cáo và các ngoại lệ được ghi rõ bên dưới không chặn job.

| Script                         | Xác thực                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Chặn                                                                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-gate chạy tuần tự 7 cổng con bên dưới                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Có                                                                                                                                    |
| ↳ `check:docs-sync`            | Tính nhất quán về phiên bản giữa package/OpenAPI/CHANGELOG, các bản sao chính xác của `llm.txt`, các bất biến về phần/kích thước của CHANGELOG đã dịch và việc không còn các tài liệu trùng lặp đã được thay thế                                                                                                                                                                                                                                                                                             | Có                                                                                                                                    |
| ↳ `check:docs-frontmatter`     | Các trang tài liệu đã biên dịch có tiêu đề frontmatter hợp lệ                                                                                                                                                                                                                                                                                                                                                                                                                                                | Có                                                                                                                                    |
| ↳ `check:docs-counts`          | Các bất biến số lượng có độ tin cậy cao được kiểm tra nghiêm ngặt; các kiểm tra số lượng tệp dựa trên heuristic chỉ cảnh báo trừ khi script nhận `--strict` (meta-gate của CI không truyền cờ này)                                                                                                                                                                                                                                                                                                           | Cấp nghiêm ngặt chặn; cấp mềm chỉ mang tính khuyến nghị                                                                               |
| ↳ `check:env-doc-sync`         | Các biến môi trường được đọc trong mã nguồn, `.env.example` và `docs/reference/ENVIRONMENT.md` thống nhất sau khi áp dụng các danh sách ngoại lệ rõ ràng ignore, doc-only và env-only                                                                                                                                                                                                                                                                                                                        | Có, ngoài các danh sách ngoại lệ đã ghi rõ                                                                                            |
| ↳ `check:deprecated-versions`  | Báo cáo các phiên bản có thể đã cũ ngoài những ngữ cảnh lịch sử an toàn và các ngày cập nhật đã cũ, loại trừ các tài liệu bị bỏ qua                                                                                                                                                                                                                                                                                                                                                                          | Chỉ mang tính khuyến nghị trong cấu hình CI hiện tại (không truyền `--strict`)                                                        |
| ↳ `check:doc-links`            | Các liên kết markdown nội bộ trong tài liệu phân giải thành tệp thực (`[text]`/`(path)` form)                                                                                                                                                                                                                                                                                                                                                                                                                | Có                                                                                                                                    |
| ↳ `check:fabricated-docs`      | Các route, biến môi trường, lệnh CLI, tên hook và đường dẫn tệp được viện dẫn trong tài liệu phải tồn tại trong codebase. Cổng cứng thông qua `--strict`; thất bại mềm khi không có cờ.                                                                                                                                                                                                                                                                                                                      | Có (thông qua `--strict` trong CI)                                                                                                    |
| `check:cli-i18n`               | Các khóa `t()` mà CLI sử dụng tồn tại trong `en`; `pt-BR` giữ mọi phần cấp cao nhất; `zh-CN` và `zh-TW` chứa mọi khóa từ `en`                                                                                                                                                                                                                                                                                                                                                                                | Có                                                                                                                                    |
| `check:openapi-coverage`       | Đặc tả OpenAPI bao phủ ít nhất mức sàn được điều chỉnh bằng ratchet của các route thực                                                                                                                                                                                                                                                                                                                                                                                                                       | Có                                                                                                                                    |
| `check:openapi-security-tiers` | Các chú thích `x-loopback-only`/`x-always-protected` đã khai báo phải có cơ sở trong `routeGuard.ts`; lỗi bộ phân tích và các sai lệch trong kiểm tra thuận sẽ chặn. Kiểm tra ngược về việc thiếu `x-loopback-only` dưới các tiền tố chỉ dành cho truy cập cục bộ đưa ra cảnh báo; các route chỉ được xác định bằng mẫu được loại khỏi lượt kiểm tra ngược này.                                                                                                                                              | Bộ phân tích/kiểm tra thuận chặn; kiểm tra ngược chỉ mang tính khuyến nghị                                                            |
| `check:openapi-routes`         | Mỗi đường dẫn `/api...` trong `openapi.yaml` phân giải thành một route thực, không phụ thuộc vào khác biệt tham số, sau khi áp dụng danh sách ngoại lệ `KNOWN_STALE_SPEC` có lý do; các mục ngoại lệ đã cũ cũng làm kiểm tra thất bại                                                                                                                                                                                                                                                                        | Có                                                                                                                                    |
| `check:docs-symbols`           | Các tham chiếu URL nội bộ `/api/...` trong tài liệu chuẩn không phải bản sao phân giải thành một route thực hoặc một nhóm route; các tham chiếu proxy/upstream/placeholder/tệp và các mục `KNOWN_STALE_DOC_REFS` có lý do được loại trừ, còn các mục ngoại lệ đã cũ làm kiểm tra thất bại                                                                                                                                                                                                                    | Có                                                                                                                                    |
| `i18n translation drift`       | Kiểm tra hàm băm nguồn/đích của các tài liệu cốt lõi và nguồn gốc bản dịch. So sánh PR chỉ cho phép các lỗi kế thừa giống hệt; những điểm không nhất quán mới hoặc chưa được xác minh về nguồn, đích bị thiếu, hàm băm đích, bản dịch lỗi thời hoặc bộ nhớ đệm theo phần sẽ chặn. Ngoài so sánh PR, lỗi về nguồn/đích bị thiếu/hàm băm đích sẽ chặn, còn bản dịch lỗi thời và bộ nhớ đệm theo phần không nhất quán vẫn chỉ là cảnh báo. Việc không có bộ nhớ đệm theo phần ở định dạng cũ không phải là lỗi. | Sai lệch mới/chưa được xác minh trong PR sẽ chặn; sai lệch kế thừa giống hệt chỉ là cảnh báo; quy tắc ngoài PR phụ thuộc vào loại lỗi |

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

| Script                            | Xác thực                                                                                                                                                                                           | Chặn        |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (inline) | Độ bao phủ khóa i18n của UI đạt ≥ 65%                                                                                                                                                              | Có          |
| `check-ui-value-drift` (inline)   | Một **giá trị** tiếng Anh được viết lại không để lại bản dịch lỗi thời nào                                                                                                                         | Có          |
| `check-new-key-coverage` (inline) | Một khóa tiếng Anh **mới** được dịch trong mọi locale — dấu `__MISSING__:` sẽ bị từ chối                                                                                                           | Có          |
| `check-translation-ratio`         | Tỷ lệ bản dịch thực tế theo từng locale (giống tiếng Anh / phần giữ chỗ / thiếu các lá nằm ngoài danh sách cho phép) không được vượt quá `config/quality/i18n-translation-baseline.json` + biên độ | **Có chặn** |

Cần `fetch-depth: 0` — cổng kiểm tra độ lệch giá trị so sánh khác biệt của `en.json` với merge base.

#### `check-ui-value-drift` — gate kiểm tra bản dịch cũ

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

Cổng độ lệch giá trị và cổng khóa mới dùng chung một phép so sánh bất biến từ
`scripts/i18n/resolve-ui-diff-base.mjs`. Quy trình làm việc truyền cùng các SHA cơ sở, đầu mút cơ sở và
ứng viên cho cả hai bước kiểm tra. Các lần chạy PR/đổi mục tiêu cơ sở, push và merge-group sử dụng ngữ cảnh
sự kiện tương ứng. Việc điều phối một nhánh ứng viên yêu cầu PR đang mở chính xác của nhánh đó hoặc đầu vào
`i18n_base_sha` tường minh. Việc điều phối hoặc quan sát theo lịch đối với `main` hay `release/vX.Y.Z`
mà không có đầu vào đó sẽ so sánh commit cuối cùng với commit cha đầu tiên của nó; đây không phải là quá trình kiểm tra
toàn bộ nợ bản dịch kế thừa. Việc gọi cục bộ yêu cầu một cơ sở so sánh tường minh,
ví dụ như lệnh `BASE_REF` ở trên.

Ngữ cảnh so sánh bị thiếu hoặc không rõ ràng, danh mục bắt buộc không thể đọc hoặc không hợp lệ, và
ứng viên đã thay đổi sẽ tạo ra `INCOMPLETE` với mã thoát **2**, kể cả trong chế độ cảnh báo.
Việc đọc danh mục sử dụng `scripts/i18n/read-ui-catalog.mjs`; lỗi đọc không được thay thế
bằng các đối tượng rỗng. Cả cơ sở không khả dụng lẫn đầu vào không đầy đủ đều không xác lập PASS.

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

### Job: `test-vitest`

Yêu cầu tác vụ phân loại `changes`. Các phân đoạn ma trận áp dụng sẽ chặn việc hợp nhất nếu thất bại.

| Bộ kiểm thử      | Xác thực                                                             | Chặn                                                                                                           |
| ---------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Máy chủ MCP (110 công cụ), autoCombo, bộ nhớ đệm — trình chạy vitest | Có                                                                                                             |
| `test:vitest:ui` | Kiểm thử thành phần UI — trình chạy vitest                           | **Chặn** — các lỗi đã tồn tại được loại trừ rõ ràng trong `vitest.config.ts`; lỗi mới sẽ khiến tác vụ thất bại |

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
