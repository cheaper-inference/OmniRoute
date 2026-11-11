# Release-Green: candidate validation and evidence (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green quan sát một cam kết cụ thể và báo cáo kết quả xác nhận của nó. [Tham chiếu Cổng Chất lượng](../architecture/QUALITY_GATES.md) xác định các cấu hình CI hiện tại, các kiểm tra bắt buộc và chính sách chấp nhận. Chính sách nhập học được phiên bản trong `config/quality/admission-policy.json` là hợp đồng thực thi cho `Gate / CI` và `Gate / Quality`.

## CI và phạm vi quan sát

`ci.yml` và `quality.yml` bao gồm các yêu cầu kéo vào các nhánh chính và nhánh phát hành. Hồ sơ được chọn sẽ xác định công việc nào được áp dụng. CI đầy đủ cũng bao gồm các làn đường mà yêu cầu kéo thông thường không thực hiện. Kết quả quan sát nhanh không thể thay thế các công việc đó và trình bao bọc quy trình làm việc đã hoàn thành không thể thay thế biên nhận của nó.

Việc xây dựng sản xuất thuộc về CI. Không có bản dựng tư vấn trùng lặp trong `quality.yml`. Các đồ tạo tác bị thiếu, công việc bị hủy và các phép đo không đầy đủ không tạo nên bước kiểm tra bắt buộc thành công. Xác nhận cơ sở, người đứng đầu và ứng cử viên kết hợp hiện tại trước khi chấp nhận kết quả.

## Xác thực cục bộ

Chạy trình quan sát trong cây làm việc được sở hữu sau khi chuẩn bị các phần phụ thuộc của nó. Thực hiện theo cây công việc và giao thức tài nguyên trong `docs/ops/WORKTREE_ISOLATION.md` trước khi xác thực kỹ lưỡng.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Hồ sơ nhanh chóng là một phần. Hồ sơ đầy đủ kiểm tra các yêu cầu được mô hình hóa của nó và lưu giữ biên nhận lệnh; nó không chứng nhận việc triển khai hoặc thay thế cho các hoạt động kiểm tra được lưu trữ hiện hành. Báo cáo phân biệt lỗi thực thi với độ lệch số liệu. Các bánh cóc cần thiết vẫn bị chặn theo chính sách đã chọn. Đừng nâng đường cơ sở chỉ để đạt được kết quả vượt qua.

## Quét hàng đêm và thủ công

Trình giải quyết khả năng tương thích và bản phát hành hàng đêm chọn một nhánh phát hành chuẩn. Lựa chọn đó phải khớp với nhánh đã kích hoạt quy trình làm việc và các bộ sử dụng SHA bất biến của sự kiện. Để thực hiện thủ công, hãy chọn bản phát hành dự định trong `release_branch` và gửi đi trên cùng một tham chiếu đó:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Công văn liên chi nhánh bị từ chối trước khi thực thi mã đã chọn. Các bộ chính được lưu trữ sẽ kiểm tra `main` và xác minh rằng SHA của nó vẫn khớp với mục tiêu đã giải quyết trước khi cài đặt. Nếu di chuyển chính trong quá trình phân giải, hãy chạy lại quá trình quét chưa hoàn tất trên cam kết mới. Không gộp các khoản thu từ các ứng viên khác nhau.

## Phân loại lỗi và phục hồi

Sử dụng sự cố làm chỉ số chẩn đoán, sau đó kiểm tra chính xác lần chạy, lần thử, bước thất bại và tạo tác. So sánh cơ sở tương đương và bằng chứng ứng viên trước khi quy lỗi cho người đóng góp. Lỗi cơ sở hạ tầng, khiếm khuyết kế thừa, sự hồi quy của ứng viên và các phê duyệt đang chờ xử lý đòi hỏi các biện pháp khắc phục khác nhau.

Các kỹ năng `/green-prs`, `/sweep-reds`, `/validate-release-green` và `/babysit` thu thập bằng chứng và chuẩn bị các bản sửa lỗi trong phạm vi tài liệu của chúng. Giữ tín dụng của người đóng góp, sử dụng các chi nhánh sửa chữa riêng biệt và xác minh tất cả các bước kiểm tra bắt buộc trước khi hợp nhất được ủy quyền. Không có sự thay đổi cơ bản tự động hoặc kết thúc sự cố nào thay thế cho ứng cử viên hiện tại đã vượt qua.
