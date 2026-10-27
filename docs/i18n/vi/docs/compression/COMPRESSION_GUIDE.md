# 🗜️ Prompt Compression Guide — OmniRoute (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Tự động tiết kiệm 15-95% đối với ngữ cảnh đủ điều kiện. Để xem tổng quan nhanh, hãy xem [phần Compression trong README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Tổng quan

OmniRoute triển khai một quy trình nén prompt theo mô-đun, chạy **chủ động** trước khi các yêu cầu được gửi đến nhà cung cấp thượng nguồn. Điều này có nghĩa là việc tiết kiệm token diễn ra một cách minh bạch — bạn không cần thay đổi quy trình làm việc.

```
Yêu cầu từ máy khách
  → Bộ chọn chiến lược nén
    → Có cấu hình ghi đè theo combo? → Sử dụng cài đặt combo
    → Đạt ngưỡng tự động kích hoạt? → Sử dụng chế độ tự động
    → Có chế độ mặc định? → Sử dụng cài đặt toàn cục
    → Tắt? → Bỏ qua quá trình nén
  → Chế độ nén đã chọn
    → Tắt: Không nén
    → Nhẹ: Dọn dẹp khoảng trắng/định dạng an toàn (~15%)
    → Tiêu chuẩn: Loại bỏ từ ngữ dư thừa theo kiểu Caveman (~30%)
    → Mạnh: Giảm chi tiết lịch sử + tóm tắt (~50%)
    → Cực đại: Lược bỏ theo heuristic + tinh giản khối mã (~75%)
    → RTK: Lọc đầu ra terminal/công cụ có nhận biết lệnh (phạm vi thượng nguồn 60-90%)
    → Xếp chồng: Quy trình đa công cụ theo thứ tự, thường là RTK rồi Caveman (phạm vi đủ điều kiện 78-95%)
  → Yêu cầu đã nén → Nhà cung cấp
```

---

## Các chế độ nén

### Tắt

Không áp dụng nén. Tất cả thông điệp được chuyển tiếp mà không thay đổi.

### Chế độ nhẹ (tiết kiệm ~15%, độ trễ <1ms)

Chế độ an toàn nhất — không thay đổi ngữ nghĩa, chỉ dọn dẹp định dạng:

| Kỹ thuật                 | Mô tả                                                  |
| ------------------------ | ------------------------------------------------------ |
| `collapseWhitespace`     | Gộp các dòng trống liên tiếp và khoảng trắng cuối dòng |
| `dedupSystemPrompt`      | Loại bỏ các thông điệp hệ thống trùng lặp              |
| `compressToolResults`    | Nén đầu ra dài dòng của công cụ/hàm                    |
| `removeRedundantContent` | Loại bỏ các chỉ dẫn lặp lại                            |
| `replaceImageUrls`       | Rút gọn URI dữ liệu hình ảnh base64                    |

**Phù hợp nhất cho:** Sử dụng thường xuyên, các quy trình làm việc yêu cầu độ an toàn cao.

### Chế độ tiêu chuẩn (tiết kiệm ~30%)

Lấy cảm hứng từ [Caveman](https://github.com/JuliusBrussee/caveman) — loại bỏ các từ đệm và cách diễn đạt dài dòng trong khi vẫn giữ nguyên ý nghĩa:

- Loại bỏ các từ đệm ("vui lòng", "tôi nghĩ", "về cơ bản", "thực ra")
- Rút gọn các cụm từ dài dòng ("để nhằm mục đích" → "để", "do kết quả của" → "vì")
- Loại bỏ cách diễn đạt rào đón lịch sự ("Bạn có phiền...", "Nếu bạn có thể...")
- Hơn 30 quy tắc regex được tinh chỉnh cho prompt lập trình

**Phù hợp nhất cho:** Quy trình lập trình hằng ngày, các nhóm chú trọng chi phí.

### Chế độ mạnh (tiết kiệm ~50%)

Quản lý lịch sử thông minh cho các phiên làm việc dài:

- **Giảm chi tiết thông điệp theo thời gian** — các thông điệp cũ hơn được nén dần
- **Nén kết quả công cụ** — đầu ra dài của công cụ được cắt ngắn hoặc lược bỏ (các dòng đầu/cuối,
  lọc dòng khớp, thu gọn khóa JSON)
- **Cơ chế bảo vệ tính toàn vẹn cấu trúc** — đảm bảo các cặp `tool_use` + `tool_result` luôn nhất quán
- **Nhận biết cửa sổ ngữ cảnh** — tuân thủ giới hạn token của từng mô hình

**Phù hợp nhất cho:** Các phiên gỡ lỗi kéo dài, cơ sở mã lớn.

### Chế độ cực đại (tiết kiệm ~75%)

Mức nén tối đa cho các tình huống token mang tính quyết định:

- **Lược bỏ theo heuristic** — lược bỏ token trong văn bản dựa trên điểm số
- **Bảo toàn cấu trúc** — các khối mã có hàng rào, mã nội tuyến, URL và định danh được
  thay bằng dấu giữ chỗ rồi khôi phục nguyên văn, không bao giờ bị lược bỏ
- **Tầng SLM tùy chọn** — một mô hình cục bộ nhỏ có thể tinh chỉnh quá trình lược bỏ khi được cấu hình
- Độc lập với chế độ mạnh: không chạy quá trình giảm chi tiết thông điệp theo thời gian, nén kết quả công cụ
  hoặc trình tóm tắt dự phòng (chỉ khi tầng SLM gặp lỗi thì lượt xử lý dự phòng mới có thể được chuyển qua
  chế độ mạnh)

**Phù hợp nhất cho:** Khi bạn liên tục chạm giới hạn ngữ cảnh.

### Chế độ RTK (phạm vi thượng nguồn 60-90%)

Chế độ RTK được tối ưu hóa cho đầu ra dài dòng của công cụ xuất hiện trong các phiên tác nhân lập trình:

- Phát hiện các lớp lệnh/đầu ra như `git status`, `git diff`, `git log`, trình chạy kiểm thử,
  bản dựng TypeScript/Vite/Webpack, ESLint/Biome/Prettier, hoạt động kiểm tra/cài đặt npm, nhật ký Docker, đầu ra hạ tầng
  và đầu ra shell chung
- Áp dụng các bộ lọc JSON từ `open-sse/services/compression/engines/rtk/filters/`
- Nhập các bộ lọc theo schema RTK TOML v1 từ tệp `filters.toml` của dự án hoặc toàn cục, kèm quy trình xác thực
  kiểm thử nội tuyến và kiểm soát theo mức độ tin cậy đối với tệp dự án
- Đi kèm 55 bộ lọc tích hợp sẵn với các mẫu xác minh nội tuyến
- Loại bỏ chuỗi điều khiển ANSI, thanh tiến trình, dòng lặp lại và nội dung nhiễu không hỗ trợ hành động
- Giữ lại lỗi nghiêm trọng, lỗi, cảnh báo, tệp đã thay đổi, bản tóm tắt và phần cuối của đầu ra dài
- Hỗ trợ bộ lọc dự án có kiểm soát theo mức độ tin cậy, bộ lọc toàn cục và khả năng khôi phục tùy chọn đầu ra thô đã được biên tập

**Phù hợp nhất cho:** Các phiên tác nhân có bản ghi shell, bản dựng, kiểm thử, git, grep và đầu ra tệp.

### Chế độ xếp chồng (phạm vi đủ điều kiện 78-95%)

Chế độ xếp chồng chạy nhiều công cụ nén theo một thứ tự xác định. Quy trình mặc định là:

```txt
RTK -> Caveman
```

Thứ tự đó trước tiên thu gọn đầu ra terminal/công cụ, sau đó áp dụng phép cô đọng ngữ nghĩa Caveman cho
phần prompt ngôn ngữ tự nhiên còn lại. Có thể cấu hình các quy trình xếp chồng trên toàn cục hoặc thông qua
các combo nén được gán cho combo định tuyến.

**Phù hợp nhất cho:** Ngữ cảnh hỗn hợp có nhật ký công cụ lớn cùng với chỉ dẫn của con người hoặc bản tóm tắt của trợ lý.

---

## Phép tính mức tiết kiệm từ nguồn thượng nguồn

OmniRoute ghi nhận mức tiết kiệm nhờ nén từ hai nguồn: các phép đo hiệu năng của dự án thượng nguồn và
cách kết hợp công cụ riêng của OmniRoute.

| Nguồn   | Số liệu từ README thượng nguồn được sử dụng tại đây                                                                               |
| ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | Ít hơn `~75%` token đầu ra, mức tiết kiệm đầu ra trung bình theo phép đo là `65%`, phạm vi `22-87%` và công cụ nén đầu vào `~46%` |
| RTK     | Tiết kiệm `60-90%` đầu ra lệnh; phiên mẫu từ `~118,000 -> ~23,900` token, tương đương tiết kiệm `79.7%` (`~80%`)                  |

Đối với các tải trọng công cụ/ngữ cảnh chồng lấn, tổ hợp OmniRoute mặc định xếp chồng các công cụ:

```txt
RTK -> Caveman
```

Mức tiết kiệm kết hợp được tính theo phép nhân, không phải phép cộng:

```txt
combined = 1 - (1 - mức tiết kiệm RTK) * (1 - mức tiết kiệm đầu vào Caveman)
trung bình = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
phạm vi    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Con số `78-95%` đó áp dụng khi cả RTK và Caveman đều có thể giảm cùng một tải trọng đầu vào/ngữ cảnh.
Chế độ đầu ra phản hồi của Caveman là riêng biệt: khi được bật, hãy sử dụng mức tiết kiệm đầu ra riêng của Caveman (`65%`
trung bình, `~75%` tiêu biểu, phạm vi `22-87%`). Tổng mức tiết kiệm chi phí phụ thuộc vào tỷ lệ kết hợp lời nhắc/đầu ra của bạn.

### "Đủ điều kiện" thực sự có nghĩa là gì

Phạm vi tiêu biểu 15-95% là có thật, nhưng chỉ áp dụng cho nội dung **dư thừa hoặc dài dòng** — các dòng
lỗi lặp lại, nhật ký bản dựng liên tục phát cùng một cảnh báo, kết quả `grep`/đọc tệp quá lớn. Điều đó
**không** có nghĩa là mọi yêu cầu đều tiết kiệm được mức đó.

Đã được xác minh bằng thực nghiệm (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): một
lần chạy `stacked` (RTK + Caveman) đối với khối `tool_result` theo cấu trúc Anthropic chứa 300 dòng
lỗi giống hệt nhau tạo ra **mức tiết kiệm 95.93% token / 96.26% ký tự** — hoàn toàn nằm trong phạm vi
được công bố. Nhưng khi cùng quy trình đó chạy với đầu ra công cụ bình thường, không dư thừa (danh sách kết quả `grep` gọn gàng,
một lần đọc tệp ngắn, văn bản hội thoại thông thường), nó tạo ra **mức tiết kiệm gần bằng không** một cách chính xác, vì
không có nội dung lặp lại nào để loại bỏ và `validateCompression()` (`validation.ts`) từ chối gửi một
bản viết lại có thể làm mất hoặc thay đổi khối mã, URL, tiêu đề, phiên bản hoặc định danh hằng số VIẾT-HOA-TOÀN-BỘ.

Đây là hành vi an toàn được mong đợi, không phải lỗi: một phiên lập trình chủ yếu đọc/tìm kiếm bằng grep trong các tệp gọn gàng sẽ
có tổng mức tiết kiệm khiêm tốn ngay cả khi tính năng nén được bật hoàn toàn, trong khi một phiên gặp
vòng lặp lỗi hoặc trình kiểm tra mã dài dòng sẽ đạt đầy đủ phạm vi 78-95% trên lưu lượng đó. Đừng dùng
tỷ lệ tiết kiệm tổng hợp thấp của một phiên duy nhất làm bằng chứng rằng tính năng nén bị cấu hình sai — trước tiên hãy kiểm tra xem
đầu ra công cụ cơ bản có thực sự dư thừa hay không.

---

## Trực quan hóa mức tiết kiệm token

```
Không nén:              47K token được gửi đến LLM
Với Lite:               40K token được gửi          (tiết kiệm 15% — an toàn, luôn bật)
Với Standard:           33K token được gửi          (tiết kiệm 30% — quy tắc caveman-speak)
Với Aggressive:         24K token được gửi          (tiết kiệm 50% — lão hóa + tóm tắt)
Với Ultra:              12K token được gửi          (tiết kiệm 75% — lược bỏ theo heuristic)
Với RTK:                19K-5K token được gửi       (tiết kiệm 60-90% trên đầu ra lệnh/công cụ)
Với Stacked:            10K-2.5K token được gửi     (phạm vi RTK+Caveman đủ điều kiện 78-95%)
```

---

## Cấu hình

### Bảng điều khiển

Đi tới `Dashboard → Context & Cache`:

- **Caveman** — lựa chọn chế độ, gói ngôn ngữ, xem trước và các giá trị mặc định toàn cục
- **RTK** — xem trước bộ lọc lệnh, cài đặt an toàn RTK và danh mục bộ lọc
- **Compression Combos** — các pipeline engine có tên được gán cho các combo định tuyến
- **Auto-Trigger Threshold** — tự động kích hoạt tính năng nén khi số lượng token vượt quá ngưỡng

### Ghi đè theo từng combo

Trong `Dashboard → Context & Cache → Compression Combos`, hãy gán một combo nén cho một combo định tuyến:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Điều này cho phép bạn sử dụng cơ chế nén xếp chồng trên các nhà cung cấp miễn phí/lập trình, trong khi vẫn duy trì chế độ lite trên các gói đăng ký trả phí.

Việc gán "Ghi đè theo từng combo" này là một tùy chọn điều khiển khác với tùy chọn ghi đè **chế độ nén của combo định tuyến** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — schema của trường này cũng chấp nhận `rtk`, `stacked` và `omniglyph`) — tùy chọn ghi đè đó không chọn một pipeline combo nén có tên; nó chỉ thiết lập trường `compressionMode` được `resolveCompressionPlan` sử dụng. Có thể thiết lập tùy chọn này trên thẻ combo (`Dashboard → Combos`) hoặc, kể từ #6760, cho từng combo định tuyến trong danh sách "Assign to routing" tại `Dashboard → Context & Cache → Compression Combos`, ngay bên cạnh hộp kiểm gán pipeline được mô tả ở trên. Cả hai giao diện đều lưu thông qua cùng một endpoint `PUT /api/combos/{id}`.

### Ghi đè theo từng yêu cầu

Gửi header yêu cầu `x-omniroute-compression` để ghi đè kế hoạch nén cho một yêu cầu riêng lẻ. Header này có mức ưu tiên cao nhất — nó được ưu tiên hơn tùy chọn ghi đè của combo định tuyến, hồ sơ đang hoạt động, cơ chế tự động kích hoạt và giá trị Default trên bảng điều khiển. Các giá trị không xác định sẽ bị bỏ qua (yêu cầu không bao giờ bị từ chối), và công tắc chính toàn cục vẫn kiểm soát mọi thứ: khi tính năng nén bị tắt trên toàn cục, header không thể bật tính năng này. Các giá trị:

| Giá trị       | Hiệu ứng                                                                                                                            |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Không nén yêu cầu này.                                                                                                              |
| `default`     | Hồ sơ Default được xác định từ bảng điều khiển (bỏ qua hồ sơ đang hoạt động). Các engine gây mất dữ liệu sẽ bị tắt.                 |
| `safe`        | Tương tự như khi bỏ qua header: chỉ khử trùng lặp và thu gọn khoảng trắng.                                                          |
| `allow-lossy` | Giữ nguyên kế hoạch của người vận hành cho yêu cầu này, bao gồm bản tóm tắt, bộ lọc mức độ liên quan và các thao tác viết lại kiểu. |
| `engine:<id>` | Một engine duy nhất khi được bật, ví dụ: `engine:rtk`. Đây là tùy chọn bật riêng engine đó cho từng yêu cầu.                        |
| `<combo>`     | Một combo có tên, trước tiên được đối chiếu theo tên (không phân biệt chữ hoa chữ thường), sau đó theo id.                          |

Nếu không có `allow-lossy`, `engine:<id>` hoặc một combo có tên, các engine gây mất dữ liệu sẽ không được áp dụng. Yêu cầu vẫn được khử trùng lặp theo phiên và thu gọn khoảng trắng khi tính năng nén được bật.

Kế hoạch đã áp dụng được phản hồi lại trong header phản hồi `X-OmniRoute-Compression: <mode>; source=<source>`, trong đó `<source>` là một trong các giá trị `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` hoặc `off`.

### API

```bash
# Lấy cài đặt nén
curl http://localhost:20128/api/settings/compression

# Cập nhật cài đặt nén
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Xem trước một payload RTK/stacked cụ thể
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Liệt kê các gói bộ lọc RTK
curl http://localhost:20128/api/context/rtk/filters

# Kiểm thử RTK trực tiếp với metadata lệnh tùy chọn
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Nội dung được bảo vệ

Công cụ nén **luôn bảo toàn:**

- ✅ Khối mã (có hàng rào và nội dòng)
- ✅ URL và đường dẫn tệp
- ✅ Cấu trúc JSON và dữ liệu có cấu trúc
- ✅ Định danh và token kỹ thuật được bảo vệ
- ✅ Biểu thức toán học
- ✅ Định nghĩa lệnh gọi công cụ/hàm
- ✅ Lời nhắc hệ thống (trong chế độ lite)

Tính năng khôi phục đầu ra thô của RTK sẽ che giấu các khóa API phổ biến, bearer token, Slack token, khóa truy cập AWS,
mật khẩu, token và thông tin bí mật trước khi bất kỳ thứ gì được lưu trữ.

---

## Thống kê nén

Mỗi yêu cầu được nén đều bao gồm số liệu thống kê trong nhật ký máy chủ:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Lộ trình theo giai đoạn

| Giai đoạn    | Chế độ                                                                                                                                                                                           | Trạng thái      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| Giai đoạn 1  | Tắt, Nhẹ                                                                                                                                                                                         | ✅ Đã phát hành |
| Giai đoạn 2  | Tiêu chuẩn, Mạnh, Cực mạnh                                                                                                                                                                       | ✅ Đã phát hành |
| Giai đoạn 3  | RTK, Xếp chồng, Tổ hợp nén                                                                                                                                                                       | ✅ Đã phát hành |
| Giai đoạn 4  | Kiểu đầu ra, Ultra cấp SLM, bộ công cụ đánh giá                                                                                                                                                  | ✅ Đã phát hành |
| Giai đoạn 4C | Ngân sách ngữ cảnh thích ứng ("núm điều chỉnh") — công cụ tính toán + API (`contextBudget` trên `PUT /api/settings/compression`) + các tùy chọn kiểm soát chế độ/chính sách trên bảng điều khiển | ✅ Đã phát hành |

---

## Lời cảm ơn

Các quy tắc nén của chế độ Tiêu chuẩn được lấy cảm hứng từ **[Caveman](https://github.com/JuliusBrussee/caveman)** của **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — dự án lan truyền mạnh mẽ với phương châm "tại sao dùng nhiều token khi ít token vẫn làm được việc". Caveman báo cáo số token đầu ra ít hơn `~75%`, mức tiết kiệm đầu ra trung bình trong điểm chuẩn là `65%`, phạm vi đầu ra là `22-87%` và một công cụ nén đầu vào `~46%`.

Chế độ RTK được lấy cảm hứng từ **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** của **[RTK AI](https://github.com/rtk-ai)** — dự án nén đầu ra lệnh hiệu năng cao dành cho terminal, quy trình build, kiểm thử, git và lọc đầu ra công cụ. RTK báo cáo mức tiết kiệm `60-90%`, với phiên mẫu trong README cho thấy tiết kiệm được `~80%`.

---

## Các hệ thống nén nâng cao

Ngoài 7 chế độ được mô tả ở trên (mã nguồn cũng chấp nhận các chế độ `codex-responses` và
`omniglyph`, nhưng hướng dẫn này không đề cập đến chúng), các phần bên dưới trình bày những tính năng
hoạt động bên trong hoặc song song với các chế độ đó: Nén kết quả công cụ và Lão hóa lũy tiến
là bước 1 và 2 của công cụ nén mạnh (chế độ Aggressive và một bước `aggressive` trong
pipeline xếp chồng), Pipeline xếp chồng là cách chế độ Stacked vận hành, Nén có nhận biết bộ nhớ đệm
hạ cấp `aggressive` và `ultra` xuống `standard` đối với các nhà cung cấp có bộ nhớ đệm khi tính năng nén
đang bật, còn Chế độ đầu ra Caveman và Kiểu đầu ra là các chỉ dẫn system prompt tùy chọn,
mặc định bị tắt, dùng để định hình đầu ra của mô hình thay vì nén yêu cầu.

### Nén có nhận biết bộ nhớ đệm

Một số nhà cung cấp (như Anthropic với tính năng lưu prompt vào bộ nhớ đệm) hỗ trợ **lưu prompt vào bộ nhớ đệm**,
cho phép họ lưu các phần của prompt để giảm chi phí và độ trễ. Khi
bộ nhớ đệm được bật, việc nén mạnh thực tế có thể **làm giảm** hiệu năng
vì nó thay đổi các token đã được lưu, khiến bộ nhớ đệm mất hiệu lực.

Mô-đun `cachingAware.ts` giải quyết vấn đề này bằng cách **phát hiện ngữ cảnh bộ nhớ đệm** và
**điều chỉnh chiến lược nén** cho phù hợp.

#### Cách hoạt động

1. **Phát hiện ngữ cảnh bộ nhớ đệm** — Quét nội dung yêu cầu để tìm các dấu `cache_control`
2. **Xác định nhà cung cấp có bộ nhớ đệm** — Kiểm tra xem nhà cung cấp đích có hỗ trợ bộ nhớ đệm hay không
3. **Điều chỉnh chiến lược** — Hạ cấp `aggressive`/`ultra` xuống `standard` đối với các nhà cung cấp có bộ nhớ đệm
4. **Bỏ qua system prompt** — System prompt thường được lưu vào bộ nhớ đệm, vì vậy không nén chúng

Trình hỗ trợ chiến lược cũng trả về cờ `deterministicOnly`, nhưng trình dựng kế hoạch chỉ sử dụng
chiến lược — hiện không có thành phần hạ nguồn nào đọc cờ này.

#### Ví dụ mã

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Dấu hiệu bộ nhớ đệm
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Khi nào nên sử dụng

Nén có nhận biết bộ nhớ đệm **luôn được bật** — không cần cấu hình. Tính năng này được kích hoạt mỗi khi
chế độ nén được bật và nhà cung cấp đích hỗ trợ lưu prompt vào bộ nhớ đệm (Anthropic, OpenAI,
v.v.); không bắt buộc phải có các dấu `cache_control` rõ ràng — chỉ riêng một nhà cung cấp có bộ nhớ đệm
đã kích hoạt việc hạ cấp, còn chỉ có các dấu thì không bao giờ kích hoạt (việc phát hiện dấu cung cấp dữ liệu đo từ xa về
bộ nhớ đệm, không phải quyết định chiến lược).

### Lão hóa lũy tiến

Các cuộc hội thoại dài tích lũy nhiều lượt tin nhắn, nhưng các lượt cũ trở nên ít
liên quan hơn. Mô-đun `progressiveAging.ts` **làm suy giảm tin nhắn theo khoảng cách lượt**
(khoảng cách được đo từ cuối cuộc hội thoại). Với các giá trị mặc định được cung cấp
(`verbatim: 2, light: 2, moderate: 3`):

- **2 lượt cuối (khoảng cách ≤ 2)**: Được giữ nguyên văn
- **Khoảng cách 3**: Nén Caveman (loại bỏ từ ngữ thừa)
- **Khoảng cách 4+**: Tin nhắn của trợ lý được tóm tắt; tin nhắn của người dùng được rút gọn còn dòng
  đầu tiên, giới hạn ở 120 ký tự; các vai trò khác không bị thay đổi. System prompt, các tin nhắn
  đã được làm cũ và tin nhắn người dùng mới nhất luôn được giữ nguyên văn bất kể khoảng cách.
  Không có nội dung nào bị loại bỏ hoàn toàn, và dải `light`
  không thể đạt tới với các giá trị mặc định được cung cấp (`light` bằng `verbatim`).

#### Ví dụ mã

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... thêm 50 lượt nữa ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // 3 lượt cuối: giữ nguyên văn
  light: 8, // khoảng cách <= 8: nén nhẹ
  moderate: 20, // khoảng cách <= 20: nén caveman
  fullSummary: 5, // được kiểu dữ liệu yêu cầu, nhưng mã phân dải không đọc giá trị này
  // khoảng cách > 20: được tóm tắt (trợ lý) / giữ lại dòng đầu tiên (người dùng)
});

// saved = số token tiết kiệm được
```

#### Khi nào nên sử dụng

Lão hóa lũy tiến **luôn được bật** cho chế độ `aggressive` — đây là bước 2 của
`compressAggressive()`. Chế độ Ultra không chạy tính năng này. Tính năng này
đặc biệt hiệu quả cho:

- Các phiên lập trình kéo dài
- Các cuộc hội thoại kéo dài nhiều ngày
- Quy trình tác tử có nhiều lệnh gọi công cụ

### Chế độ đầu ra Caveman

Chế độ đầu ra Caveman thêm **các chỉ dẫn system prompt** yêu cầu chính mô hình tạo
đầu ra ngắn gọn — cấp độ `lite` yêu cầu câu trả lời súc tích nhưng vẫn giữ câu đầy đủ, `full`
yêu cầu mô hình "trả lời ngắn gọn như người hang động thông minh", còn `ultra` yêu cầu đầu ra kiểu điện tín;
các chỉ dẫn chỉ mang tính yêu cầu, không thể đảm bảo mô hình tuân thủ. Các yêu cầu nhận những chỉ dẫn này thông qua
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` trước tiên phân giải lựa chọn bằng lớp tương thích ngược
(`resolveOutputStyleSelection()` trong
`open-sse/services/compression/outputStyles/backCompat.ts`), lớp này, khi `outputStyles`
trống, ánh xạ một `cavemanOutputMode` đang được bật sang kiểu đầu ra `terse-prose` ở
mức `cavemanOutputMode.intensity` (xem phần Tương thích ngược bên dưới); một lựa chọn `outputStyles`
không trống được sử dụng nguyên trạng, và khi đó `cavemanOutputMode.enabled` cùng `intensity` không có
tác dụng, trong khi tùy chọn `autoClarity` của nó vẫn được áp dụng. `outputMode.ts` chứa
các văn bản chỉ dẫn (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), cơ chế bỏ qua nội dung và
trình hỗ trợ vị trí mà quá trình chèn sử dụng; trình chèn `applyCavemanOutputMode()` riêng của nó không có
thành phần gọi nào trong môi trường production.

#### Cách hoạt động

Chế độ này không nén đầu vào. Nó thêm một khối chỉ dẫn vào system prompt
(xem Cách chèn hoạt động bên dưới), và mọi chế độ nén đầu vào được chọn cho yêu cầu
vẫn chạy sau đó, trên phần nội dung hiện đã chứa khối này. Trước mệnh đề ranh giới dùng chung
mà mọi cấp độ đều kết thúc bằng nó, cấp độ `full` tiếng Anh có nội dung:

> "Trả lời ngắn gọn như người hang động thông minh. Bỏ mạo từ (a/an/the), từ thừa (just/really/basically/actually/simply), lời xã giao, cách diễn đạt dè dặt. Dùng câu rút gọn cũng được. Dùng từ đồng nghĩa ngắn (big thay vì extensive, fix thay vì implement). Giữ nguyên chính xác toàn bộ nội dung kỹ thuật, mã, lỗi, URL, định danh."

Chế độ này đặc biệt hiệu quả cho:

- Sinh mã (đầu ra ngắn gọn hơn = ít token hơn)
- Hỏi đáp nhanh (không cần giải thích dài dòng)
- Xử lý hàng loạt (tối đa hóa thông lượng)

#### Khi nào nên dùng

Chế độ đầu ra Caveman là **tùy chọn bật**. Khi bật tính năng nén (`enabled: true`, công tắc chính
trên trang Compression Settings), hãy bật chế độ này bằng `cavemanOutputMode.enabled`; `intensity`
chọn `lite`, `full` hoặc `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Công tắc **Output Mode** của một tổ hợp nén (`outputMode`, với cấp độ trong `outputModeIntensity`)
thiết lập cùng một tùy chọn cho các yêu cầu mà tổ hợp đó áp dụng, và công cụ MCP
`omniroute_set_compression_engine` ghi tùy chọn này thông qua đối số boolean `outputMode`.
Một lựa chọn `outputStyles` không rỗng sẽ được ưu tiên hơn công tắc này. Trên
dashboard, việc bật kiểu đầu ra **Terse prose** sẽ chèn cùng khối đó (xem Output
Styles bên dưới).

### Kiểu đầu ra (danh mục)

Chế độ đầu ra Caveman ở trên là **cơ chế một kiểu cũ**. Giai đoạn 4 đã tổng quát hóa nó
thành một danh mục các kiểu đầu ra có thể kết hợp: `OUTPUT_STYLE_CATALOG` trong
`open-sse/services/compression/outputStyles/catalog.ts`. Mỗi kiểu là một chỉ dẫn trong system prompt
yêu cầu chính mô hình tạo đầu ra tiết kiệm hơn; có thể bật nhiều kiểu
cùng lúc và chúng được chèn theo thứ tự trong danh mục.

| Kiểu                                            | `id`            | Tác dụng                                                                                                                                                                                                                                                                                                         | Ngôn ngữ chỉ dẫn                              |
| ----------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Văn phong ngắn gọn                              | `terse-prose`   | Bỏ từ thừa/mạo từ/cách diễn đạt dè dặt; giữ nguyên chính xác nội dung kỹ thuật. Cùng văn bản với chế độ đầu ra Caveman cũ (được tham chiếu, không nhập lại).                                                                                                                                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ít mã hơn                                       | `less-code`     | Thang YAGNI: thay đổi hoạt động nhỏ nhất, không tạo các lớp trừu tượng không được yêu cầu.                                                                                                                                                                                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ponytail (lập trình viên cấp cao lười biếng)    | `ponytail`      | "Mã tốt nhất là mã không bao giờ được viết": tái sử dụng > viết lại, nguyên nhân gốc > triệu chứng, diff hoạt động ngắn nhất.                                                                                                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Tôi bị ADHD (hành động trước)                   | `i-have-adhd`   | Hành động trước (lệnh/đường dẫn/đoạn mã trước phần diễn giải), các bước được đánh số và giới hạn, MỘT bước tiếp theo cụ thể, không có phần mở đầu/tóm tắt/kết lời. Phỏng theo [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                                                 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Bộ lọc giao diện chống nội dung rác             | `antislop-ui`   | Mọi kỹ thuật trực quan phải vượt qua kiểm tra mục đích (phân cấp, bản sắc, khả năng đọc); không mặc định dùng gradient/kính/phát sáng, giới hạn bảng màu, không dùng bố cục mẫu. Cả hai kiểu antislop đều bổ sung ranh giới không có điều khiển vô dụng / không có tuyên bố bịa đặt.                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Bộ lọc nội dung và con người chống nội dung rác | `antislop-copy` | Nội dung cụ thể (không dùng dấu gạch ngang dài, CTA chung chung, từ ngữ sáo rỗng, lời kết kiểu chatbot, dữ kiện bịa đặt), cộng với các quy tắc hướng đến con người: độ tương phản WCAG AA, tiêu điểm hiển thị rõ, khả năng truy cập bằng bàn phím, trạng thái trống/đang tải/lỗi, dàn lại trên thiết bị di động. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| CJK ngắn gọn (文言)                             | `terse-cjk`     | Câu trả lời `full`/`ultra` bằng Hán văn cổ điển (文言); `lite` chỉ yêu cầu câu trả lời ngắn gọn, không có hư từ, lời xã giao hoặc lời văn tô điểm.                                                                                                                                                               | zh (bị giới hạn theo locale, xem bên dưới)    |

Mỗi kiểu có ba cấp độ cường độ — `lite`, `full`, `ultra` — và mọi cấp độ
đều kết thúc bằng mệnh đề ranh giới dùng chung (`SHARED_BOUNDARIES` trong `outputMode.ts`), giúp
giữ nguyên chính xác các khối mã, đường dẫn tệp, lệnh, lỗi và URL. Văn bản cấp độ của `terse-prose` và
`terse-cjk` bổ sung cả định danh vào danh sách đó.

`terse-cjk` bị giới hạn theo locale `zh` ở hai nơi. Trang Compression Settings chỉ hiển thị
hàng của kiểu này khi ngôn ngữ giao diện dashboard là tiếng Trung (`zh-CN` hoặc `zh-TW`), và
`applyOutputStyles()` chỉ chèn nó khi ngôn ngữ đã phân giải của yêu cầu (xem phần Lựa chọn ngôn ngữ
bên dưới) là `zh`. Việc ẩn hàng này không xóa lựa chọn `terse-cjk` đã lưu:
API cài đặt chấp nhận mọi id kiểu, và việc lưu các kiểu khác trên trang vẫn giữ lại kiểu này. Tại
thời điểm xử lý yêu cầu, bước kiểm tra ngôn ngữ của `applyOutputStyles()` là cổng locale duy nhất.

#### Cách chèn hoạt động

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) đối chiếu
lựa chọn với danh mục (các id không xác định và các kiểu không khớp locale sẽ bị
loại bỏ, không bao giờ gây lỗi; một lựa chọn sau khi đối chiếu không còn kiểu nào sẽ giữ
nguyên phần body và được bỏ qua với lý do `no_styles`), nối các chỉ dẫn đã chọn theo thứ
tự trong danh mục,
chỉ thêm mệnh đề ranh giới **một lần** (cùng với mệnh đề an toàn,
`SAFETY_BOUNDARIES` hoặc bản dịch của nó, khi `less-code` hoặc `ponytail` được chọn),
và bắt đầu khối bằng một dấu idempotency duy nhất (`[OmniRoute Output Styles]`), vì vậy
việc áp dụng lại không tạo ra thay đổi. Khi ngôn ngữ đã phân giải (xem phần Lựa chọn
ngôn ngữ bên dưới) có bản dịch, chỉ dẫn đã bản địa hóa sẽ được chèn thay cho tiếng Anh.

Đối với body có mảng `messages` không rỗng, việc kiểm tra idempotency chạy trước cơ chế
bỏ qua theo nội dung: khi dấu `[OmniRoute Output Styles]` đã có trong trường `system`
cấp cao nhất (dạng chuỗi hoặc mảng khối nội dung), hoặc trong một system message có nội
dung dạng chuỗi, body được giữ nguyên với lý do `already_applied` và không thực hiện
kiểm tra từ khóa. Nếu không, cơ chế bỏ qua theo nội dung
(`shouldBypassCavemanOutputMode()` trong
`open-sse/services/compression/outputMode.ts`) sẽ kiểm tra văn bản của ba message cuối
cùng, bất kể vai trò của chúng, và bỏ qua các kiểu cho toàn bộ lượt khi văn bản đó khớp
với các từ khóa về bảo mật, hành động không thể đảo ngược hoặc yêu cầu làm rõ, hay một
chuỗi phụ thuộc thứ tự: `first`, `then`, `after that`, `before`, `rollback` hoặc
`backup`, theo sau trong phạm vi 240 ký tự bởi `delete`, `drop`, `migrate`, `deploy`
hoặc `release`. Cơ chế bỏ qua hoạt động khi nút chuyển **Auto-Clarity Bypass**
(`cavemanOutputMode.autoClarity`, bật theo mặc định) đang bật; tắt nút chuyển này sẽ bỏ
qua bước kiểm tra từ khóa.

Khi cơ chế bỏ qua cho phép lượt được xử lý, `placeSystemInstruction()` (trong cùng tệp),
vốn không bao giờ tạo `messages[0]` mới, sẽ đặt khối vào vị trí đầu tiên tìm thấy trong
các vị trí sau:

1. Một system message ở đầu có nội dung dạng chuỗi: khối được nối vào sau văn bản của
   message đó.
2. Trường `system` cấp cao nhất: khối được nối vào sau văn bản nếu là chuỗi, hoặc được
   thêm dưới dạng một khối văn bản mới nếu là mảng khối nội dung.
3. System message đầu tiên xuất hiện sau đó có nội dung dạng chuỗi: khối được nối vào
   sau văn bản của message đó.
4. Không có trường hợp nào ở trên: khối được đưa vào một system message mới ở cuối
   `messages`.

Đối với body không có mảng `messages` (hoặc có mảng rỗng), cơ chế bỏ qua theo nội dung
không chạy và trường `system` cấp cao nhất không được xét đến. Khối được nối vào sau văn
bản của trường `instructions` dạng chuỗi, trừ khi trường đó đã chứa dấu
`[OmniRoute Output Styles]`; trong trường hợp này, body được giữ nguyên với lý do
`already_applied`. Khi body không có trường `instructions` dạng chuỗi nhưng có `input`
(một chuỗi hoặc một mảng), khối sẽ trở thành `instructions`, thay thế mọi giá trị không
phải chuỗi mà trường đó từng chứa. Body không có cả trường `instructions` dạng chuỗi lẫn
`input` dạng chuỗi hoặc mảng sẽ được giữ nguyên và bỏ qua với lý do `no_messages`.

#### Cách bật

Trong bảng điều khiển: **Compression Context → Compression Settings**
(`/dashboard/context/settings`), phần Output styles: mỗi kiểu có một hàng với nút bật/tắt
và bộ chọn cấp độ. Các kiểu được chèn khi chính tính năng nén đang bật (nút chuyển chính
của trang, `enabled`). Nút chuyển **Auto-Clarity Bypass** nằm trên trang **Caveman**
(`/dashboard/context/caveman`), trong thẻ **Output Mode**. Khi cấu hình bằng mã, cấu
hình nén lưu lựa chọn dưới dạng:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Khả năng tương thích ngược: khi `outputStyles` trống, thiết lập cũ
`cavemanOutputMode.enabled` ánh xạ tới `terse-prose` ở mức
`cavemanOutputMode.intensity`. Khi đó, khối bắt đầu bằng dấu
`[OmniRoute Output Styles]`, trong khi bộ chèn `applyCavemanOutputMode()` cũ sử dụng
`[OmniRoute Caveman Output Mode]`. Bên dưới dấu này, văn bản khớp với nội dung chèn cũ
trong en, pt-BR, es, de, fr, it, ru, id và vi; trong ja và zh, văn bản có thêm một
khoảng trắng trước mệnh đề ranh giới. `terse-prose` được dịch sang pt-BR, es, de, fr,
it, ru, zh, ja, id và vi, vì vậy một yêu cầu có ngôn ngữ đã phân giải là `hu` sẽ nhận
văn bản tiếng Anh, trong khi bộ chèn cũ sử dụng bản tiếng Hungary.

Lựa chọn ngôn ngữ cho kiểu đầu ra (`resolveOutputStyleLanguage()` trong
`outputStyles/apply.ts`): khi `languageConfig.enabled` bật, `autoDetect` lấy mẫu từ
user message mới nhất có văn bản trong mảng `messages` của yêu cầu (nội dung dạng chuỗi,
hoặc `text` của các phần nội dung) và chạy bộ phát hiện của công cụ Caveman
(`detectCompressionLanguage()`) trên văn bản đó. Bộ phát hiện trả về `zh` cho văn bản
có ký tự Hán nhưng không có kana; nếu không, nó trả về ngôn ngữ có nhiều gợi ý khớp
nhất trong số `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` và `id`, và trả về
`en` khi không có gợi ý nào khớp — văn bản không thể phân loại sẽ nhận tiếng Anh, không
bao giờ nhận `defaultLanguage`, và `vi` không bao giờ được phát hiện mặc dù các kiểu có
kèm văn bản `vi`. Body của Responses API lưu các lượt trong `input`, trường này không
được lấy mẫu, vì vậy nó nhận `defaultLanguage`, rồi đến tiếng Anh. Khi không có user
message nào trong `messages` chứa văn bản, hoặc khi `autoDetect` tắt,
`defaultLanguage` được áp dụng, rồi đến tiếng Anh. Khi `languageConfig.enabled` tắt,
ngôn ngữ là tiếng Anh — trừ khi một combo nén được áp dụng cho yêu cầu (combo được gán
cho routing combo của yêu cầu, hoặc combo nén mặc định mà chatCore dùng làm phương án
dự phòng cho pipeline xếp chồng tích hợp sẵn): việc áp dụng combo sẽ bật
`languageConfig.enabled` cho yêu cầu đó và đặt `defaultLanguage` từ các gói ngôn ngữ
của combo (giá trị đã lưu nếu giá trị đó thuộc các gói của combo, nếu không thì dùng gói
đầu tiên của combo, mặc định là `en`), trong khi thiết lập `autoDetect` đã lưu (bật theo
mặc định) vẫn được áp dụng. Công cụ đầu vào Caveman chọn ngôn ngữ của gói quy tắc theo
cách khác — theo từng phần văn bản và, khi tính năng tự động phát hiện tắt, bị giới hạn
bởi `enabledPacks`.

Ma trận kiểu × ngôn ngữ được cố định bởi
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: mọi kiểu trong danh mục đều cần có một
mục trong `BASELINE_LANGUAGES` của bài kiểm thử; một kiểu không bị giới hạn theo locale phải cung cấp
bản dịch pt-BR (kiểu `terse-cjk` bị giới hạn theo locale được miễn quy tắc này), trừ khi kiểu đó được
liệt kê trong `KNOWN_ENGLISH_ONLY`, vốn chỉ được phép chứa các kiểu hoàn toàn không có bản dịch —
một kiểu được liệt kê mà có bất kỳ bản dịch nào sẽ khiến bài kiểm thử thất bại; và một kiểu sẽ khiến
bài kiểm thử thất bại khi mất đi một ngôn ngữ được liệt kê trong mục `BASELINE_LANGUAGES` tương ứng.
Để thêm một kiểu, hãy xem
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Nén kết quả công cụ

`compressToolResult()` trong `open-sse/services/compression/toolResultCompressor.ts`
nén văn bản kết quả công cụ bằng **5 chiến lược**. Hàm thử chúng theo thứ tự sau, và
chiến lược được bật đầu tiên có điều kiện kiểm tra khớp với nội dung sẽ quyết định kết quả:

1. **`fileContent`**: nội dung có từ 3 dòng trở lên, trong đó ít nhất một dòng, sau khi bỏ qua
   phần thụt lề đầu dòng, bắt đầu bằng `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` hoặc `return ` (từ khóa cộng với một dấu cách), hoặc bằng `if`,
   `for` hay `while` theo sau bởi `(` hoặc ` (`, sẽ giữ lại 20 dòng đầu và 5 dòng cuối, đồng thời
   đánh dấu phần giữa bị lược bỏ.
2. **`grepSearch`**: nội dung có ít nhất một dòng ở dạng `<path>:<digits>:`,
   trong đó phần văn bản trước dấu hai chấm đầu tiên không chứa khoảng trắng, sẽ chỉ giữ lại các dòng đó,
   tối đa 30 dòng, theo sau là số lượng các kết quả khớp còn lại và danh sách các tệp khớp;
   mọi dòng khác đều bị loại bỏ. Chỉ cần một dòng như vậy là đủ để kích hoạt chiến lược, vì vậy một
   dòng nhật ký bắt đầu bằng dấu thời gian như `12:30:45` cũng được tính.
3. **`shellOutput`**: đầu ra chứa chuỗi ANSI CSI (`ESC[` rồi đến các chữ số hoặc
   dấu chấm phẩy, sau đó là một chữ cái, như trong mã màu) hoặc một ký tự `$` theo sau bởi khoảng trắng
   ở bất kỳ vị trí nào trong văn bản sẽ bị loại bỏ các chuỗi đó (các escape khác, chẳng hạn như `ESC[?25l`
   hoặc chuỗi tiêu đề cửa sổ OSC, vẫn được giữ lại) và giữ 50 dòng cuối, đồng thời thu gọn các dòng
   lặp lại liên tiếp. Vì bước kiểm tra này chạy trước `json` và `errorMessage`,
   đầu ra JSON hoặc lỗi có chứa ký tự `$` như vậy sẽ không bao giờ đến được các chiến lược đó khi
   `shellOutput` đang bật.
4. **`json`**: một payload JSON dài hơn 2.000 ký tự, bắt đầu bằng `{` hoặc `[` (sau
   khoảng trắng tùy chọn) và phân tích cú pháp thành công, sẽ được tóm tắt: một mảng có hơn 7 phần tử sẽ giữ
   5 phần tử đầu, 2 phần tử cuối và tổng số phần tử; còn một đối tượng sẽ giữ 20
   khóa đầu tiên, trong đó mỗi giá trị là đối tượng hoặc mảng lồng nhau được thay bằng phần giữ chỗ `{…N keys}`
   (đối với mảng, N là độ dài của mảng) cùng với một dấu `_remaining_<N>_keys` đếm số khóa
   bị loại bỏ sau 20 khóa đầu tiên. Các giá trị vô hướng được sao chép nguyên vẹn, vì vậy một đối tượng có
   tối đa 20 khóa và không có giá trị lồng nhau chỉ được thụt lề lại — một đối tượng đã được thu gọn sẽ tăng
   số ký tự và được giữ nguyên.
5. **`errorMessage`**: đầu ra chứa, ở bất kỳ vị trí nào và không phân biệt chữ hoa chữ thường, `error:`,
   `error ` (từ này theo sau bởi một dấu cách, như trong `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` hoặc `traceback` sẽ giữ dòng đầu tiên,
   10 dòng tiếp theo và 3 dòng cuối, với dấu `… [N frames elided] …` thay thế cho
   các dòng nằm giữa. Dấu này chỉ xuất hiện khi có hơn 13 dòng theo sau dòng đầu tiên,
   vì vậy đầu ra lỗi gồm tối đa 14 dòng sẽ không bị rút ngắn (với 12 hoặc 13 dòng, 3 dòng
   cuối sẽ lặp lại các dòng đã được giữ).

Sau khi một chiến lược khớp, ngay cả khi chiến lược đó không tiết kiệm được gì, các chiến lược tiếp theo sẽ không
được thử. Khi chiến lược khớp không tiết kiệm được token ước tính nào (độ dài ÷ 4, làm tròn lên) —
ví dụ một tệp giống mã nguồn có tối đa 25 dòng, hoặc một mảng JSON dài hơn 2.000
ký tự với tối đa 7 phần tử — engine aggressive sẽ giữ nguyên kết quả công cụ:
cả hai hàm gọi (`compressAggressive()` và `compressAnthropicToolResultBlock()`)
đều giữ nguyên khi `saved` bằng 0 hoặc nhỏ hơn, trong khi bản thân `compressToolResult()` vẫn
trả về đầu ra của chiến lược đó. Bước xử lý kết quả công cụ không phải là quyết định cuối cùng:
bộ tóm tắt dự phòng của engine vẫn có thể rút ngắn một thông báo `tool` hoặc `function` dài hơn
8.192 ký tự (`maxTokensPerMessage`, 2.048, nhân với 4).

#### Khi nào nên sử dụng

Nén kết quả công cụ là bước 1 của engine aggressive (`compressAggressive()` trong
`open-sse/services/compression/aggressive.ts`), vì vậy nó chạy trong chế độ Aggressive và trong một
bước `aggressive` của pipeline xếp chồng. Nó nén các thông báo `tool` và `function`
theo cấu trúc OpenAI, cũng như văn bản bên trong các khối `tool_result` của Anthropic. Mỗi chiến lược có
công tắc riêng trong `aggressive.toolStrategies`, và tất cả đều được bật theo mặc định. Trên dashboard,
các công tắc nằm trong chế độ xem **Advanced** của trang Caveman khi tính năng nén đang bật và
chế độ mặc định là Aggressive.

### Pipeline xếp chồng

Chế độ xếp chồng chạy **nhiều engine nối tiếp nhau** — thường là RTK trước
(tiết kiệm 60-90% đối với đầu ra công cụ), sau đó là Caveman trên phần văn bản còn lại (tiết kiệm
~46% đầu vào). Khi kết hợp, mức tiết kiệm nằm trong **khoảng đủ điều kiện 78-95%** (xem Phép tính mức tiết kiệm ngược dòng
ở trên): `1 - (1 - 0.60..0.90) × (1 - 0.46)` trung bình ≈89%.

#### Cách thức hoạt động

```
Đầu vào (1000 token)
  → RTK (bộ lọc nhận biết lệnh) → 200 token
    → Caveman (loại bỏ nội dung dư thừa) → 108 token
  → Đầu ra (108 token, tiết kiệm ~89%)
```

#### Khi nào nên sử dụng

Sử dụng chế độ xếp chồng cho:

- Quy trình làm việc sử dụng nhiều công cụ (lập trình theo tác tử, nghiên cứu)
- Xử lý hàng loạt nhạy cảm về chi phí
- Khi bạn cần tiết kiệm token tối đa

Pipeline xếp chồng được cấu hình thông qua cài đặt nén `stackedPipeline`
toàn cục, hoặc thông qua một combo nén có tên được gán cho một combo định tuyến (xem
Ghi đè theo combo ở trên) — không phải thông qua `modePack` của auto-combo (trường đó chỉ
điều chỉnh lại trọng số lựa chọn mô hình của auto-combo, và `stacked` không phải là tên pack hợp lệ).

---

## Ghi đè chế độ nén cho từng combo

Bạn có thể ghi đè chế độ nén toàn cục **cho từng combo** để tinh chỉnh hành vi
cho các trường hợp sử dụng khác nhau:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Điều này hữu ích cho:

- **Combo lập trình**: Sử dụng chế độ `aggressive` cho các phiên dài
- **Combo hỏi đáp nhanh**: Sử dụng chế độ `lite` để phản hồi nhanh
- **Combo sử dụng nhiều công cụ**: Sử dụng chế độ `stacked` để tiết kiệm tối đa
- **Combo production**: không bật ghi đè đối với các nhà cung cấp có bộ nhớ đệm — cơ chế điều chỉnh nhận biết bộ nhớ đệm luôn bật sẽ tự động hạ `aggressive`/`ultra` xuống `standard`
  (không có chế độ `cache-aware` để lựa chọn)

---

## Xem thêm

- [Cấu hình môi trường](../reference/ENVIRONMENT.md) — Các biến môi trường về nén
- [Hướng dẫn kiến trúc](../architecture/ARCHITECTURE.md) — Cơ chế nội bộ của quy trình nén
- [Hướng dẫn sử dụng](../guides/USER_GUIDE.md) — Bắt đầu sử dụng tính năng nén
- [Nén RTK](./RTK_COMPRESSION.md) — Bộ lọc RTK, mô hình tin cậy, cổng xác minh, khôi phục đầu ra thô
- [Các công cụ nén](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API, MCP, bảng điều khiển
- [Định dạng quy tắc nén](./COMPRESSION_RULES_FORMAT.md) — Định dạng gói quy tắc JSON
- [Gói ngôn ngữ nén](./COMPRESSION_LANGUAGE_PACKS.md) — Các quy tắc Caveman dành riêng cho từng ngôn ngữ
