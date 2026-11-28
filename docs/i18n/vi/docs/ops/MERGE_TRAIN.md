# Merge Queue & Manual Merge-Train Runbook (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Hạ cánh trên một nhánh phát hành

Hàng đợi omni chi phối việc hạ cánh vào `release/vX.Y.Z`. Đọc `mode` cấp cao nhất trong `config/merge-queue/config.json` trên nhánh mặc định trước khi hạ cánh PR. Xem [Hàng đợi Omni](OMNI_QUEUE.md).

- **`shadow`** chạy xác thực và chuyển sang hợp nhất thủ công. Áp dụng `omni-queue` cho PR đã được phê duyệt ở đầu cuối cùng của nó. Kiểm tra tính đủ điều kiện với `npm run queue -- why <PR>`. Chờ phán quyết cho cái đầu đó ở `npm run queue -- history --base <branch>`. Tiếp tục `would-land`. Trên `culprit-found` hoặc `would-dequeue`, giữ phần hợp nhất và khắc phục nguyên nhân.
- **Ngoại lệ bóng tối.** Một chuyến tàu với CI đầy đủ màu xanh lá cây so với đầu cơ sở hiện tại có thể tiếp tục mà không cần có phán quyết xếp hàng riêng. Ngoại lệ tương tự được áp dụng khi đầu PR đã chứa đầu cơ sở hiện tại.
- **`live`** sử dụng nhãn `omni-queue` để kích hoạt hạ cánh. Hàng đợi một mình hạ cánh PR. Để lại các lệnh hợp nhất và đẩy trực tiếp vào hàng đợi.

Mỗi lần hạ cánh đều cần có sự cho phép của chủ sở hữu và các biện pháp kiểm tra bắt buộc hiện hành. Chỉ áp dụng `omni-queue` sau khi chủ sở hữu đã cho phép hạ cánh. Hàng đợi PRs chạm vào các đường dẫn được bảo vệ cũng yêu cầu quyết định `protected-approved` của chủ sở hữu đối với PR đó.

Bộ quy tắc "Yêu cầu cổng xanh khi phát hành đang hoạt động" yêu cầu `Gate / CI` và `Gate / Quality` màu xanh lá cây trên đầu. Không bao giờ sử dụng `--admin` để vượt qua cổng màu đỏ. Một khối đóng băng phát hành hợp nhất vào nhánh đóng băng. Xem [Quy tắc cứng 21](HARD_RULES_DETAIL.md). Không bao giờ gắn nhãn, hợp nhất hoặc đẩy vào yêu cầu kéo mà phiên khác đang hoạt động. Xem [Quy tắc cứng 22](HARD_RULES_DETAIL.md).

## Yêu cầu kéo tàu

1. Bắt đầu một nhánh xe lửa ở đầu cơ sở phát hành hiện tại. Tích hợp chính xác các thành viên đứng đầu đã được phê duyệt bằng cách sử dụng các cam kết hợp nhất. Bảo tồn lịch sử cam kết của họ bằng cách tránh đè bẹp và rebase.
2. Mở một yêu cầu kéo cho nhánh tàu. Xác thực PR đó bằng CI đầy đủ của chính nó trên mẹo cơ sở hiện tại. Kiểm tra lại đầu đế và các đầu thành viên đã được phê duyệt trước khi hạ cánh. Làm mới tàu và CI của nó khi ứng viên được xác thực thay đổi.
3. Hạ cánh tàu PR bằng cam kết hợp nhất trong chế độ xếp hàng hiện hành. Trong chế độ trực tiếp, phương thức hạ cánh `merge-ff` của hàng đợi sẽ duy trì các cam kết hợp nhất. Những người đứng đầu thành viên ban đầu có thể truy cập được từ nhánh phát hành. GitHub đánh dấu thành viên PRs là đã hợp nhất và các cam kết giữ lại tác giả của chúng.

Một ví dụ công khai là [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Nó kết hợp 18 thành viên PRs và đạt được cam kết hợp nhất vào ngày 24-11-2026.

Quá trình đồng bộ hóa ngược từ `main` sang nhánh phát hành tiếp theo cũng được thực hiện thông qua cam kết hợp nhất. Cần phải bảo tồn tổ tiên `main` cho các lần đồng bộ hóa sau này. Xem [Cách ly Worktree](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Trình xác nhận hợp nhất cục bộ

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Trình xác thực tìm nạp phần đầu cơ sở và đầu PR rồi kết hợp chúng trong một cây làm việc dùng một lần. Nó chạy bộ chẵn lẻ một lần trên cây kết quả. Xung đột tìm nạp hoặc hợp nhất phần đầu không thành công sẽ loại bỏ PR đó và tập lệnh tiếp tục với PRs còn lại.

- **`--plan`** in các bước và thoát của chế độ đã chọn mà không tạo cây làm việc hoặc liên hệ với điều khiển từ xa. Kết hợp nó với `--fast` để kiểm tra kế hoạch nhanh.
- **`--fast`** chạy các cổng tĩnh chung, các tệp `node:test` đã thay đổi đã chọn trong `tests/unit/` và `npm run test:vitest`. Chạy xác thực cục bộ đầy đủ ít nhất một lần một ngày trên số tiền boa tích lũy khi sử dụng chế độ nhanh.
- **Chế độ đầy đủ** thêm các cổng tĩnh chỉ đầy đủ và chạy `npm run test:unit` và `npm run test:vitest`.

Một cổng tĩnh bị lỗi sẽ được chạy lại trên cơ sở nguyên vẹn nếu có sẵn đầu dò cơ sở. Tập lệnh báo cáo các lỗi kế thừa và tiếp tục khi mọi dòng vi phạm được nhận dạng cũng xuất hiện trên cơ sở và tổng số lượng không tăng.

| Ra  | Nghĩa                                                                                                                               |
| --- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `0` | In kế hoạch hoặc hoàn thành bộ phần mềm. Bản tóm tắt bộ phần mềm liệt kê mọi lỗi tĩnh kế thừa và bị loại bỏ PRs.                    |
| `1` | Đối số không hợp lệ, không kiểm tra Git, kiểm tra trước không thành công hoặc không có PR được đưa lên.                             |
| `2` | Kiểm tra bộ không thành công và không đủ điều kiện được kế thừa. Người vận hành có thể chia đôi lô, loại bỏ PR vi phạm và chạy lại. |

Thẻ địa phương chỉ cung cấp bằng chứng chẩn đoán cho hồ sơ của chủ sở hữu. Mỗi lần hạ cánh vẫn cần có sự cho phép của chủ sở hữu, các bước kiểm tra bắt buộc riêng và phán quyết về hàng đợi trong bóng tối khi áp dụng.

## Xếp tầng

- **Mỗi PR.** kiểm tra chọn CI và Chất lượng dựa trên các đường dẫn đã thay đổi. Mã PRs chạy các cổng chất lượng nhanh và các thử nghiệm tác động, với các công việc đơn vị và Vitest riêng biệt trong CI.
- **Mỗi ứng viên xếp hàng.** CI và Quality chạy hồ sơ đầy đủ cho ứng viên đã soạn thảo trên hàng đợi của nó.
- **Mỗi mẹo phát hành.** Release-Green chạy các cổng cứng nhanh chóng trên các lần đẩy phù hợp với bộ lọc đường dẫn của nó. Ba lần chạy theo lịch trình mỗi ngày sử dụng toàn bộ quá trình quét cho nhánh phát hành.
- **Mỗi lần phát hành.** Ma trận CI đầy đủ bao gồm các phân đoạn E2E, xác thực gói, khói khởi động tarball và kiểm tra phạm vi bảo hiểm. Xem Danh [sách kiểm tra phát hành](RELEASE_CHECKLIST.md).

## Điều kiện tiên quyết khi thanh toán mới cho `merge-train.sh`

Preflight chạy trước khi tạo cây công việc. Cài đặt phụ thuộc với `npm ci`. Xác nhận rằng `node_modules/.bin/tsc` có thể thực thi được và `node_modules/node_modules` không có. Kiểm tra xem `node_modules/.bin/bun --version` có thành công không.

Nếu quá trình cài đặt sau Bun bị bỏ qua, hãy chạy `(cd node_modules/bun && node install.js)`. Tính nhất quán của nhà cung cấp và kiểm tra ký hiệu đã biết sử dụng Bun. Trình xác thực chạy `npm run check:cycles:ratchet` làm cổng chặn. Lệnh `npm run check:cycles` độc lập mang tính tư vấn.

## Lịch sử

Hàng đợi hợp nhất Hợp nhất đã ngừng hoạt động vào ngày 19 tháng 11 năm 2026.
