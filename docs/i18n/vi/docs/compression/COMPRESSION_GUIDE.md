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

## Chế độ nén

### Tắt

Không áp dụng nén. Tất cả tin nhắn được truyền qua mà không thay đổi.

### Chế độ Lite (~tiết kiệm 15%, độ trễ <1ms)

Chế độ an toàn nhất — dọn dẹp định dạng. Việc cắt ngắn kết quả công cụ của chế độ này gây mất dữ liệu, vì vậy đường dẫn mặc định (không có `allow-lossy`, `engine:lite` hoặc tùy chọn tham gia named-combo) chạy lite với
`compressToolResults: false`: các kết quả công cụ trước đó được chuyển đến nhà cung cấp mà không thay đổi.

| Kỹ thuật                 | Mô tả                                                                                                             |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Gộp các dòng trống liên tiếp và khoảng trắng ở cuối                                                               |
| `dedupSystemPrompt`      | Xóa các tin nhắn hệ thống trùng lặp                                                                               |
| `compressToolResults`    | Cắt ngắn các kết quả công cụ trước đó theo giới hạn lite (gây mất dữ liệu: chỉ thực hiện khi có yêu cầu cho phép) |
| `removeRedundantContent` | Loại bỏ các hướng dẫn lặp lại                                                                                     |
| `replaceImageUrls`       | Rút ngắn URI dữ liệu hình ảnh base64                                                                              |

**Phù hợp nhất cho:** Sử dụng luôn bật, các quy trình quan trọng về an toàn.

### Chế độ Standard (~tiết kiệm 30%)

Lấy cảm hứng từ [Caveman](https://github.com/JuliusBrussee/caveman) — loại bỏ các từ thừa và cách diễn đạt dài dòng trong khi vẫn giữ nguyên ý nghĩa:

- Loại bỏ các từ thừa ("please", "I think", "basically", "actually")
- Cô đọng các cụm từ dài dòng ("in order to" → "to", "as a result of" → "because")
- Loại bỏ cách diễn đạt dè dặt mang tính lịch sự ("Would you mind...", "If you could possibly...")
- Hơn 30 quy tắc regex được tinh chỉnh cho các prompt lập trình

**Phù hợp nhất cho:** Quy trình lập trình hằng ngày, các nhóm quan tâm đến chi phí.

### Chế độ Aggressive (~tiết kiệm 50%)

Quản lý lịch sử thông minh cho các phiên làm việc dài:

- **Làm cũ tin nhắn** — các tin nhắn cũ hơn được nén dần
- **Nén kết quả công cụ** — đầu ra công cụ dài bị cắt ngắn hoặc lược bỏ (các dòng đầu/cuối,
  lọc theo dòng khớp, rút gọn khóa JSON)
- **Bộ bảo vệ tính toàn vẹn cấu trúc** — đảm bảo các cặp `tool_use` + `tool_result` vẫn nhất quán
- **Nhận biết cửa sổ ngữ cảnh** — tuân thủ giới hạn token theo từng mô hình

**Phù hợp nhất cho:** Các phiên gỡ lỗi kéo dài, các cơ sở mã lớn.

### Chế độ Ultra (~tiết kiệm 75%)

Nén tối đa cho các tình huống bị giới hạn token:

- **Cắt tỉa theo heuristic** — cắt tỉa token trong phần văn bản dựa trên điểm số
- **Bảo toàn cấu trúc** — các khối mã có rào, mã nội tuyến, URL và mã định danh được đánh dấu và ghép lại nguyên văn, không bao giờ bị cắt tỉa
- **Tầng SLM tùy chọn** — một mô hình cục bộ nhỏ có thể tinh chỉnh việc cắt tỉa khi được cấu hình
- Hoạt động độc lập với chế độ Aggressive: không thực hiện làm cũ tin nhắn, nén kết quả công cụ
  hoặc bộ tóm tắt dự phòng (chỉ khi tầng SLM gặp lỗi mới có thể chuyển một lượt dự phòng qua
  aggressive)

**Phù hợp nhất cho:** Khi bạn liên tục gặp giới hạn ngữ cảnh.

### Chế độ RTK (phạm vi upstream 60-90%)

Chế độ RTK được tối ưu hóa cho các đầu ra công cụ dài thường xuất hiện trong các phiên coding-agent:

- Phát hiện các lớp lệnh/đầu ra như `git status`, `git diff`, `git log`, trình chạy kiểm thử,
  các bản build TypeScript/Vite/Webpack, ESLint/Biome/Prettier, npm audit/cài đặt, nhật ký Docker, đầu ra hạ tầng
  và đầu ra shell chung
- Áp dụng các gói bộ lọc JSON từ `open-sse/services/compression/engines/rtk/filters/`
- Nhập các bộ lọc lược đồ TOML RTK v1 từ các tệp `filters.toml` của dự án hoặc toàn cục, kèm xác thực
  kiểm thử nội tuyến và kiểm soát độ tin cậy đối với các tệp dự án
- Cung cấp 56 bộ lọc tích hợp sẵn cùng các mẫu xác minh nội tuyến
- Loại bỏ chuỗi điều khiển ANSI, thanh tiến trình, các dòng lặp lại và nhiễu không thể hành động
- Giữ lại các lỗi thất bại, lỗi, cảnh báo, tệp đã thay đổi, bản tóm tắt và phần cuối của đầu ra dài
- Hỗ trợ các bộ lọc dự án được kiểm soát độ tin cậy, bộ lọc toàn cục và tùy chọn khôi phục đầu ra thô đã biên tập

**Phù hợp nhất cho:** Các phiên agent có bản ghi shell, build, kiểm thử, git, grep và đầu ra tệp.

### Chế độ Stacked (phạm vi đủ điều kiện 78-95%)

Chế độ Stacked chạy nhiều công cụ nén theo một thứ tự xác định. Quy trình mặc định là:

```txt
RTK -> Caveman
```

Thứ tự này trước tiên giữ cho đầu ra terminal/công cụ ở dạng cô đọng, sau đó áp dụng phép cô đọng ngữ nghĩa của Caveman
cho prompt ngôn ngữ tự nhiên còn lại. Các quy trình Stacked có thể được cấu hình toàn cục hoặc thông qua các tổ hợp nén được gán cho các tổ hợp định tuyến.

**Phù hợp nhất cho:** Ngữ cảnh hỗn hợp với nhật ký công cụ lớn cùng hướng dẫn của con người hoặc bản tóm tắt của assistant.

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

- **Caveman** — lựa chọn chế độ, gói ngôn ngữ, bản xem trước và các mặc định toàn cục
- **RTK** — bản xem trước bộ lọc lệnh, cài đặt an toàn RTK và danh mục bộ lọc
- **Compression Combos** — các pipeline engine được đặt tên và gán cho các combo định tuyến
- **Auto-Trigger Threshold** — tự động bật tính năng nén khi số lượng token vượt quá ngưỡng

### Ghi đè theo combo

Trong `Dashboard → Context & Cache → Compression Combos`, hãy gán một combo nén cho một
combo định tuyến:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Điều này cho phép bạn sử dụng tính năng nén theo tầng với các nhà cung cấp gói miễn phí/lập trình,
đồng thời giữ chế độ lite trên các gói thuê bao trả phí.

Việc gán **Per-Combo Override** này là một điều khiển khác với phần ghi đè **routing-combo compression
mode** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — schema của trường này cũng chấp
nhận `rtk`, `stacked` và `omniglyph`) — phần ghi đè đó không chọn một pipeline compression-combo có tên;
nó chỉ đặt trường `compressionMode` được `resolveCompressionPlan` tham chiếu. Có thể đặt phần này
trên thẻ combo (`Dashboard → Combos`) hoặc, kể từ #6760, cho từng combo định tuyến trong danh sách
"Assign to routing" trên `Dashboard → Context & Cache → Compression Combos`, ngay cạnh checkbox gán
pipeline được mô tả ở trên. Cả hai giao diện đều lưu thông qua cùng một endpoint
`PUT /api/combos/{id}`.

### Ghi đè theo yêu cầu

Gửi header yêu cầu `x-omniroute-compression` để ghi đè kế hoạch nén cho một yêu cầu duy nhất. Header
này có mức ưu tiên cao nhất — nó được ưu tiên hơn phần ghi đè combo định tuyến, profile đang hoạt động,
tính năng tự động kích hoạt và giá trị Default trong panel. Các giá trị không xác định sẽ bị bỏ qua
(yêu cầu không bao giờ bị từ chối), đồng thời công tắc chính toàn cục vẫn kiểm soát tất cả: khi tính
năng nén bị tắt trên toàn cục, header không thể bật tính năng này. Các giá trị:

| Giá trị       | Hiệu ứng                                                                                                               |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `off`         | Không nén cho yêu cầu này.                                                                                             |
| `default`     | Profile Default được suy ra từ panel (bỏ qua profile đang hoạt động). Các engine gây mất dữ liệu vẫn bị tắt.           |
| `safe`        | Giống như khi không cung cấp header.                                                                                   |
| `allow-lossy` | Giữ lại kế hoạch operator của yêu cầu này, bao gồm các bản tóm tắt, bộ lọc mức độ liên quan và các phép viết lại kiểu. |
| `engine:<id>` | Một engine duy nhất khi được bật, ví dụ `engine:rtk`. Đây là cách opt-in theo yêu cầu cho engine đó.                   |
| `<combo>`     | Một combo có tên, được khớp trước theo tên (không phân biệt chữ hoa chữ thường), sau đó theo id.                       |

Nếu không có `allow-lossy`, `engine:<id>` hoặc combo có tên, các engine gây mất dữ liệu sẽ không được
áp dụng. Khi Default gây mất dữ liệu, tính năng tự động kích hoạt hoặc phần ghi đè định tuyến bị hạ
cấp, OmniRoute vẫn giữ lại các bước không gây mất dữ liệu đã được nhận diện từ pipeline theo tầng
được cấu hình, theo đúng thứ tự đã cấu hình. Hệ thống chỉ chuyển về
`session-dedup → lite` khi không còn bước không gây mất dữ liệu nào đã cấu hình.

Bản xem trước **Effective pipeline** của panel Settings hiển thị kế hoạch thông thường được lưu
tại thời điểm hiện tại. Khi tính năng tự động kích hoạt có thể chạy, bản xem trước tương tự cũng
hiển thị pipeline hiệu lực có điều kiện của tính năng này để việc phân giải trong panel và runtime
không có header luôn nhất quán.

Kế hoạch được áp dụng sẽ được phản hồi trong header `X-OmniRoute-Compression: <mode>; source=<source>`,
trong đó `<source>` là một trong các giá trị `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` hoặc `off`.

### API

```bash
# Nhận cài đặt nén
curl http://localhost:20128/api/settings/compression

# Cập nhật cài đặt nén
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Xem trước một payload RTK/stacked cụ thể
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"đầu ra npm test tại đây"}]}'

# Liệt kê các gói bộ lọc RTK
curl http://localhost:20128/api/context/rtk/filters

# Kiểm thử trực tiếp RTK với siêu dữ liệu lệnh tùy chọn
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

Mọi yêu cầu nén đều bao gồm số liệu thống kê trong nhật ký máy chủ:

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

## Hệ thống nén tiên tiến

Ngoài 7 chế độ được mô tả ở trên (nguồn cũng chấp nhận các chế độ `codex-responses` và `omniglyph` mà hướng dẫn này không đề cập), các phần bên dưới bao gồm các tính năng hoạt động bên trong hoặc bên cạnh các chế độ đó: Nén kết quả công cụ và Lão hóa lũy tiến là bước 1 và 2 của công cụ tích cực (Chế độ linh hoạt và bước `aggressive` của đường ống xếp chồng), Đường ống xếp chồng là cách chạy chế độ Xếp chồng, Nén nhận biết bộ đệm hạ cấp `aggressive` và `ultra` xuống `standard` đối với các nhà cung cấp bộ nhớ đệm trong khi nén bật, Chế độ đầu ra Caveman và Kiểu đầu ra là các hướng dẫn chọn tham gia của lời nhắc hệ thống, tắt theo mặc định, định hình đầu ra của mô hình thay vì nén yêu cầu.

### Nén nhận biết bộ đệm

Một số nhà cung cấp (như Anthropic với bộ nhớ đệm nhanh chóng) hỗ trợ** bộ nhớ đệm nhanh chóng** , cho phép họ lưu vào bộ nhớ đệm các phần của lời nhắc để giảm chi phí và độ trễ. Khi bộ nhớ đệm được bật, tính năng nén mạnh mẽ thực sự có thể** đau** hiệu suất vì nó thay đổi mã thông báo được lưu trong bộ đệm, làm mất hiệu lực bộ đệm.

Mô-đun `cachingAware.ts` giải quyết vấn đề này bằng cách** phát hiện bối cảnh bộ nhớ đệm** Và** điều chỉnh chiến lược nén** tương ứng.

#### Nó hoạt động như thế nào

1. **Phát hiện bối cảnh bộ nhớ đệm** — Quét phần thân yêu cầu để tìm các điểm đánh dấu `cache_control`
2. **Xác định nhà cung cấp bộ nhớ đệm** — Kiểm tra xem nhà cung cấp mục tiêu có hỗ trợ bộ đệm không
3. **Điều chỉnh chiến lược** — Hạ cấp `aggressive`/`ultra` xuống `standard` dành cho nhà cung cấp bộ nhớ đệm
4. **Bỏ qua lời nhắc hệ thống** — Lời nhắc hệ thống thường được lưu vào bộ nhớ đệm, vì vậy đừng nén chúng

Trình trợ giúp chiến lược cũng trả về cờ `deterministicOnly`, nhưng trình xây dựng kế hoạch chỉ sử dụng chiến lược — không có gì ở phía dưới đọc cờ ngày hôm nay.

#### Ví dụ về mã

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Khi nào nên sử dụng

Nén nhận biết bộ đệm là** luôn bật** — không cần cấu hình. Nó khởi động bất cứ khi nào quá trình nén được bật và nhà cung cấp mục tiêu hỗ trợ bộ nhớ đệm nhanh chóng (Anthropic, OpenAI, v.v.); Không bắt buộc phải có các điểm đánh dấu `cache_control` rõ ràng — một mình nhà cung cấp bộ nhớ đệm kích hoạt việc hạ cấp và chỉ riêng các điểm đánh dấu thì không bao giờ làm được (việc phát hiện điểm đánh dấu cung cấp dữ liệu đo từ xa về bộ nhớ đệm chứ không phải quyết định chiến lược).

OpenRouter được tính là nhà cung cấp bộ nhớ đệm chỉ dành cho các mô hình `anthropic/*` : Yêu cầu mã Claude giữ các điểm dừng `cache_control` của chúng (tối đa là 4) và bộ bảo vệ bảo vệ tiền tố, trong khi mọi họ OpenRouter khác (`openai/`, `google/`, `qwen/`, …) vẫn bị loại bỏ và không được bảo vệ.

### Lão hóa tiến bộ

Những cuộc trò chuyện dài sẽ tích lũy nhiều lượt nhắn tin, nhưng những lượt cũ hơn sẽ trở nên ít liên quan hơn. mô-đun `progressiveAging.ts`** làm suy giảm tin nhắn theo khoảng cách lần lượt** (khoảng cách được đo từ khi kết thúc cuộc trò chuyện). Với các giá trị mặc định được vận chuyển (`verbatim: 2, light: 2, moderate: 3`):

- **2 lượt cuối (khoảng cách ≤ 2)** : Được giữ nguyên văn
- **Khoảng cách 3** : Nén Caveman (loại bỏ phụ)
- **Khoảng cách 4 +** : Tóm tắt tin nhắn trợ lý; tin nhắn của người dùng giảm xuống dòng đầu tiên, giới hạn ở 120 ký tự; các vai trò khác không bị ảnh hưởng. Lời nhắc của hệ thống, tin nhắn cũ và tin nhắn mới nhất của người dùng luôn được giữ nguyên nguyên văn bất kể khoảng cách. Không có gì bị loại bỏ hoàn toàn và không thể truy cập được dải `light` với các giá trị mặc định được vận chuyển (`light` bằng `verbatim`).

#### Ví dụ về mã

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // last 3 turns: verbatim
  light: 8, // distance <= 8: lite compression
  moderate: 20, // distance <= 20: caveman compression
  fullSummary: 5, // required by the type, not read by the banding code
  // distance > 20: summarized (assistant) / first line kept (user)
});

// saved = number of tokens saved
```

#### Khi nào nên sử dụng

Lão hóa tiến triển là** luôn bật** đối với chế độ `aggressive` — đây là bước 2 của `compressAggressive()`. Chế độ Ultra không chạy nó. Nó đặc biệt hiệu quả đối với:

- Phiên mã hóa chạy dài
- Cuộc trò chuyện nhiều ngày
- Quy trình công việc đại lý với nhiều lệnh gọi công cụ

### Chế độ đầu ra Caveman

Chế độ đầu ra Caveman bổ sung** hướng dẫn nhắc nhở hệ thống** yêu cầu chính mô hình cung cấp đầu ra ngắn gọn — cấp độ `lite` yêu cầu các câu trả lời ngắn gọn giữ nguyên các câu đầy đủ, `full` yêu cầu mô hình "trả lời ngắn gọn như người tiền sử thông minh" và `ultra` yêu cầu đầu ra bằng điện báo; hướng dẫn chỉ yêu cầu, họ không thể đảm bảo điều đó. Các yêu cầu nhận chúng thông qua `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`): `open-sse/handlers/chatCore.ts` trước tiên giải quyết lựa chọn bằng shim tương thích ngược (`resolveOutputStyleSelection()` trong `open-sse/services/compression/outputStyles/backCompat.ts`), trong khi `outputStyles` trống, ánh xạ `cavemanOutputMode` đã bật sang kiểu đầu ra `terse-prose` tại `cavemanOutputMode.intensity` (xem Back-compat bên dưới); một lựa chọn `outputStyles` không trống được sử dụng nguyên trạng, sau đó `cavemanOutputMode.enabled` và `intensity` không có hiệu lực, trong khi chuyển đổi `autoClarity` của nó vẫn được áp dụng. `outputMode.ts` chứa các văn bản hướng dẫn (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), bỏ qua nội dung và trình trợ giúp vị trí mà tính năng tiêm sử dụng; kim phun `applyCavemanOutputMode()` của riêng nó không có lệnh gọi sản xuất.

#### Nó hoạt động như thế nào

Chế độ này không nén đầu vào. Nó thêm một khối lệnh vào dấu nhắc hệ thống (xem Cách hoạt động của tính năng chèn bên dưới) và mọi chế độ nén đầu vào được chọn cho yêu cầu vẫn chạy sau đó, trên phần thân hiện mang khối đó. Trước mệnh đề ranh giới chung mà mọi cấp độ đều kết thúc, cấp độ `full` tiếng Anh có nội dung:

> "Trả lời ngắn gọn như người thượng cổ thông minh. Bỏ bài viết (a/an/the), phụ (just/really/basically/actually/simply), lời nói vui, phòng ngừa rủi ro. Đoạn OK. Từ đồng nghĩa ngắn (lớn không mở rộng, sửa lỗi không triển khai). Giữ tất cả nội dung kỹ thuật, mã, lỗi, URLs, số nhận dạng chính xác."

Điều này đặc biệt hiệu quả đối với:

- Tạo mã (đầu ra terser = ít mã thông báo hơn)
- Hỏi đáp nhanh (không cần giải thích phức tạp)
- Xử lý hàng loạt (tối đa hóa thông lượng)

#### Khi nào nên sử dụng

Chế độ đầu ra Caveman là** chọn tham gia** . Khi bật tính năng nén (`enabled: true`, nút bật tắt chính trên trang Cài đặt nén), hãy bật tính năng này bằng `cavemanOutputMode.enabled`; `intensity` chọn `lite`, `full` hoặc `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Một tổ hợp nén** Chế độ đầu ra** chuyển đổi (`outputMode`, cấp độ trong `outputModeIntensity`) đặt cùng một công tắc cho các yêu cầu mà kết hợp áp dụng và công cụ `omniroute_set_compression_engine` MCP ghi nó thông qua đối số `outputMode` boolean của nó. Lựa chọn `outputStyles` không trống sẽ được ưu tiên hơn công tắc này. Trong bảng điều khiển, việc bật** văn xuôi ngắn gọn** kiểu đầu ra chèn cùng một khối (xem Kiểu đầu ra bên dưới).

### Kiểu đầu ra (danh mục)

Chế độ đầu ra Caveman ở trên là** con đường kiểu đơn kế thừa** . Giai đoạn 4 đã khái quát nó thành một danh mục gồm các kiểu đầu ra có thể kết hợp: `OUTPUT_STYLE_CATALOG` in `open-sse/services/compression/outputStyles/catalog.ts`. Mỗi kiểu là một hướng dẫn do hệ thống nhắc nhở, yêu cầu chính mô hình đó để có đầu ra rẻ hơn; các kiểu có thể được kích hoạt cùng nhau và được đưa vào theo thứ tự danh mục.

| Phong cách                                        | `id`            | Nó làm gì                                                                                                                                                                                                                                                                                            | Ngôn ngữ hướng dẫn                                     |
| ------------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| văn xuôi ngắn gọn                                 | `terse-prose`   | Thả filler/articles/hedging; giữ chính xác nội dung kỹ thuật. Văn bản giống với chế độ đầu ra nguyên thủy (được tham chiếu, không được gõ lại).                                                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi          |
| Ít mã hơn                                         | `less-code`     | thang YAGNI : thay đổi hoạt động nhỏ nhất, không có sự trừu tượng không được yêu cầu.                                                                                                                                                                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi          |
| Tóc đuôi ngựa (nhà phát triển cao cấp lười biếng) | `ponytail`      | "Mã tốt nhất là mã không bao giờ được viết": tái sử dụng > viết lại, nguyên nhân gốc rễ của triệu chứng >, cách làm việc khác biệt ngắn nhất.                                                                                                                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi          |
| Tôi có ADHD (hành động trước tiên)                | `i-have-adhd`   | Hành động trước (command/path/snippet trước văn xuôi), các bước giới hạn được đánh số, ONE bước tiếp theo cụ thể, không preamble/recap/closers. Chuyển thể từ [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi          |
| Bộ lọc UI chống trượt                             | `antislop-ui`   | Mọi kỹ thuật hình ảnh đều phải vượt qua bài kiểm tra mục đích (thứ bậc, nhận dạng, khả năng đọc); không có gradients/glass/glow mặc định, bảng màu giới hạn, không có bố cục mẫu. Cả hai kiểu chống trượt đều bổ sung thêm ranh giới xác nhận quyền sở hữu không kiểm soát/không bịa đặt.            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi          |
| Bản sao chống trượt và bộ lọc con người           | `antislop-copy` | Bản sao cụ thể (không có dấu gạch ngang, CTAs chung, từ thông dụng, công cụ kết thúc chatbot, sự kiện được phát minh) cộng với các quy tắc về con người: độ tương phản WCAG AA, tiêu điểm hiển thị, phạm vi tiếp cận bàn phím, trạng thái empty/loading/error, chỉnh lại dòng trên thiết bị di động. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi          |
| Terse CJK (文言)                                  | `terse-cjk`     | câu trả lời `full`/`ultra` bằng tiếng Trung cổ (文言); `lite` chỉ yêu cầu những câu trả lời ngắn gọn mà không có từ chức năng, lời nói vui vẻ hay tô điểm.                                                                                                                                           | zh (được kiểm soát theo miền địa phương, xem bên dưới) |

Mỗi kiểu đều có ba mức cường độ — `lite`, `full`, `ultra` — và mọi cấp độ đều kết thúc bằng mệnh đề ranh giới chung (`SHARED_BOUNDARIES` trong `outputMode.ts`), giữ cho các khối mã, đường dẫn tệp, lệnh, lỗi và URLs luôn chính xác. Văn bản cấp độ `terse-prose` và `terse-cjk` thêm số nhận dạng vào danh sách đó.

`terse-cjk` được định vị địa phương cho `zh` ở hai nơi. Trang Cài đặt nén chỉ liệt kê hàng của nó khi ngôn ngữ UI của trang tổng quan là tiếng Trung Quốc (`zh-CN` hoặc `zh-TW`) và `applyOutputStyles()` chỉ chèn nó khi ngôn ngữ được giải quyết của yêu cầu (xem Lựa chọn ngôn ngữ bên dưới) là `zh`. Việc ẩn hàng không xóa lựa chọn `terse-cjk` đã lưu: cài đặt API chấp nhận bất kỳ id kiểu nào và việc lưu các kiểu khác trên trang sẽ giữ nguyên nó. Tại thời điểm yêu cầu, kiểm tra ngôn ngữ `applyOutputStyles()` là cổng ngôn ngữ duy nhất.

#### Cách tiêm hoạt động

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) giải quyết lựa chọn dựa trên danh mục (id không xác định và kiểu không khớp với miền địa phương bị loại bỏ, không bao giờ có lỗi; lựa chọn giải quyết không có kiểu nào khiến phần nội dung không thay đổi, bị bỏ qua dưới dạng `no_styles`), nối các hướng dẫn đã chọn theo thứ tự danh mục, nối thêm mệnh đề ranh giới** một lần** (cộng với mệnh đề an toàn, `SAFETY_BOUNDARIES` hoặc bản dịch của nó, khi `less-code` hoặc `ponytail` được chọn) và bắt đầu khối bằng một dấu hiệu bình thường duy nhất (`[OmniRoute Output Styles]`), vì vậy việc áp dụng lại là không thể thực hiện được. Khi ngôn ngữ đã giải quyết (xem phần Lựa chọn ngôn ngữ bên dưới) có bản dịch, hướng dẫn bản địa hóa sẽ được đưa vào thay vì tiếng Anh.

Trên phần nội dung có mảng `messages` không trống, kiểm tra idempotency sẽ chạy trước khi bỏ qua nội dung: khi điểm đánh dấu `[OmniRoute Output Styles]` đã ở trong trường `system` cấp cao nhất (một chuỗi hoặc một mảng khối nội dung) hoặc trong thông báo hệ thống có nội dung chuỗi, phần nội dung không thay đổi dưới dạng `already_applied` và không chạy kiểm tra từ khóa. Mặt khác, tính năng bỏ qua nội dung (`shouldBypassCavemanOutputMode()` trong `open-sse/services/compression/outputMode.ts`) sẽ kiểm tra văn bản của ba tin nhắn cuối cùng, bất kể vai trò của chúng là gì và bỏ qua kiểu cho toàn bộ lượt khi văn bản đó khớp với các từ khóa bảo mật, hành động không thể đảo ngược hoặc làm rõ hoặc một chuỗi nhạy cảm với thứ tự: `first`, `then`, `after that`, `before`, `rollback` hoặc `backup` theo sau trong vòng 240 ký tự là `delete`, `drop`, `migrate`, `deploy` hoặc `release`. Đường tránh chạy trong khi** Tự động bỏ qua rõ ràng** chuyển đổi (`cavemanOutputMode.autoClarity`, bật theo mặc định) được bật; tắt nút này sẽ bỏ qua việc kiểm tra từ khóa.

Khi đường vòng cho phép rẽ qua, `placeSystemInstruction()` (cùng một tệp), không bao giờ tạo `messages[0]` mới, đặt khối vào khối đầu tiên trong số này mà nó tìm thấy:

1. Thông báo hệ thống hàng đầu có nội dung chuỗi: khối được thêm vào sau văn bản của nó.
2. Trường `system` cấp cao nhất: khối được thêm vào sau văn bản của chuỗi hoặc được thêm dưới dạng khối văn bản mới vào mảng khối nội dung.
3. Thông báo hệ thống đầu tiên sau này có nội dung chuỗi: khối được thêm vào sau văn bản của nó.
4. Không có điều nào ở trên: khối đi vào thông báo hệ thống mới ở cuối `messages`.

Trên phần nội dung không có mảng `messages` (hoặc có mảng trống), không chạy bỏ qua nội dung và trường `system` cấp cao nhất không được tham khảo. Khối được thêm vào sau văn bản của trường chuỗi `instructions`, trừ khi trường đó đã chứa điểm đánh dấu `[OmniRoute Output Styles]`, trong trường hợp đó phần nội dung được giữ nguyên là `already_applied`. Khi nội dung không có trường `instructions` chuỗi nhưng mang `input` (một chuỗi hoặc một mảng), khối sẽ trở thành `instructions`, thay thế bất kỳ giá trị không phải chuỗi nào mà trường đó giữ. Phần nội dung không có trường `instructions` chuỗi cũng như chuỗi hoặc mảng `input` đều không thay đổi và bị bỏ qua dưới dạng `no_messages`.

#### Cách kích hoạt

Trong bảng điều khiển:** Bối cảnh nén Cài đặt nén →** (`/dashboard/context/settings`), Phần kiểu đầu ra: một hàng cho mỗi kiểu với chuyển đổi on/off và bộ chọn cấp độ. Kiểu được chèn trong khi tính năng nén được bật (chuyển đổi chính của trang, `enabled`). các** Tự động bỏ qua rõ ràng** chuyển đổi đang ở trên** người thượng cổ** trang (`/dashboard/context/caveman`), trong đó** Chế độ đầu ra** thẻ. Theo lập trình, cấu hình nén vẫn duy trì lựa chọn dưới dạng:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Tương thích ngược: trong khi `outputStyles` trống, cài đặt `cavemanOutputMode.enabled` kế thừa sẽ ánh xạ tới `terse-prose` tại `cavemanOutputMode.intensity`. Sau đó, khối bắt đầu bằng điểm đánh dấu `[OmniRoute Output Styles]`, trong đó bộ tiêm `applyCavemanOutputMode()` kế thừa đã viết `[OmniRoute Caveman Output Mode]`. Bên dưới điểm đánh dấu, văn bản khớp với nội dung kế thừa trong en, pt-BR, es, de, fr, it, ru, id và vi; trong ja và zh nó có thêm một khoảng trắng trước mệnh đề ranh giới. `terse-prose` dịch sang pt-BR, es, de, fr, it, ru, zh, ja, id và vi, do đó, một yêu cầu có ngôn ngữ được giải quyết là `hu` sẽ nhận được văn bản tiếng Anh trong đó trình tiêm kế thừa đã sử dụng văn bản tiếng Hungary của nó.

Lựa chọn ngôn ngữ kiểu đầu ra (`resolveOutputStyleLanguage()` trong `outputStyles/apply.ts`): khi `languageConfig.enabled` bật, `autoDetect` lấy mẫu tin nhắn người dùng mới nhất trong mảng `messages` của yêu cầu có văn bản (nội dung chuỗi hoặc `text` của các phần nội dung của nó) và chạy trình phát hiện của công cụ Caveman (`detectCompressionLanguage()`) trên đó. Trình phát hiện trả về `zh` cho văn bản có ký tự Hán và không có kana; nếu không nó sẽ trả về bất kỳ cái nào trong số `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` và `id` có nhiều gợi ý trùng khớp nhất và `en` khi không khớp với văn bản — thì nó không thể phân loại thành tiếng Anh, không bao giờ `defaultLanguage` và `vi` không bao giờ được phát hiện mặc dù các kiểu gửi văn bản `vi`. Nội dung API của Phản hồi giữ các lượt của nó trong `input`, không được lấy mẫu, do đó, nó nhận được `defaultLanguage`, sau đó là tiếng Anh. Khi không có tin nhắn người dùng nào trong `messages` có văn bản hoặc khi `autoDetect` tắt, `defaultLanguage` sẽ được áp dụng, sau đó là tiếng Anh. Khi tắt `languageConfig.enabled`, ngôn ngữ là — tiếng Anh trừ khi tổ hợp nén áp dụng cho yêu cầu (tổ hợp được gán cho tổ hợp định tuyến của yêu cầu hoặc tổ hợp nén mặc định chatCore quay trở lại cho đường ống xếp chồng tích hợp): áp dụng tổ hợp sẽ bật `languageConfig.enabled` cho yêu cầu đó và đặt `defaultLanguage` từ gói ngôn ngữ của tổ hợp (giá trị đã lưu nếu đó là một trong các gói của tổ hợp, nếu không thì gói đầu tiên của tổ hợp, mặc định là `en`), trong khi `autoDetect` đã lưu (bật theo mặc định) vẫn được áp dụng. Công cụ đầu vào Caveman chọn ngôn ngữ gói quy tắc — khác nhau cho mỗi phần văn bản và, khi tắt tính năng tự động phát hiện, sẽ chọn `enabledPacks`.

Ma trận ngôn ngữ kiểu × được ghim bởi `tests/unit/compression/output-styles-i18n-matrix.test.ts`: mọi kiểu danh mục đều cần một mục nhập trong `BASELINE_LANGUAGES` của bài kiểm tra; một kiểu không được kiểm soát ngôn ngữ phải gửi một bản dịch pt-BR ( `terse-cjk` được kiểm soát theo ngôn ngữ được miễn quy tắc này) trừ khi nó được liệt kê trong `KNOWN_ENGLISH_ONLY`, kiểu này chỉ có thể chứa các kiểu không có bản dịch nào — một kiểu được liệt kê có bất kỳ bản dịch nào không vượt qua bài kiểm tra; và một kiểu không vượt qua bài kiểm tra khi nó mất ngôn ngữ mà mục nhập `BASELINE_LANGUAGES` của nó liệt kê. Để thêm kiểu, hãy xem [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Công cụ nén kết quả

`compressToolResult()` trong `open-sse/services/compression/toolResultCompressor.ts` nén văn bản kết quả công cụ bằng** 5 chiến lược** . Nó thử chúng theo thứ tự này và chiến lược được kích hoạt đầu tiên có kiểm tra khớp với nội dung sẽ quyết định kết quả:

1. **`fileContent`** : nội dung từ 3 dòng trở lên trong đó có ít nhất một dòng, bỏ qua thụt đầu dòng, bắt đầu bằng `import `, `export `, `function `, `class `, `const `, `let `, `var ` hoặc `return ` (từ khóa cộng với khoảng trắng) hoặc với `if`, `for` hoặc `while` theo sau là `(` hoặc ` (`, giữ nguyên 20 dòng đầu tiên và 5 dòng cuối cùng, với phần giữa được đánh dấu.
2. **`grepSearch`** : nội dung có ít nhất một dòng có dạng `<path>:<digits>:`, trong đó văn bản trước dấu hai chấm đầu tiên không có khoảng trắng, chỉ giữ lại những dòng đó, tối đa là 30, theo sau là số lượng bất kỳ kết quả trùng khớp nào khác và danh sách các tệp phù hợp; mọi dòng khác đều bị loại bỏ. Một dòng như vậy là đủ để kích hoạt chiến lược, do đó, một dòng nhật ký bắt đầu bằng dấu thời gian chẳng hạn như `12:30:45` cũng được tính.
3. **`shellOutput`** : đầu ra chứa một chuỗi ANSI CSI (`ESC[` rồi đến các chữ số hoặc dấu chấm phẩy rồi đến một chữ cái, như trong mã màu) hoặc một `$` theo sau là khoảng trắng ở bất kỳ vị trí nào trong văn bản sẽ làm mất các chuỗi đó (các ký tự thoát khác, chẳng hạn như `ESC[?25l` hoặc chuỗi tiêu đề cửa sổ OSC, được giữ lại) và giữ lại 50 dòng cuối cùng, với các dòng lặp lại liên tiếp được thu gọn. Bởi vì kiểm tra này chạy trước `json` và `errorMessage`, JSON hoặc đầu ra lỗi có chứa `$` như vậy không bao giờ đạt được chúng khi `shellOutput` được bật.
4. **`json`** : tải trọng JSON trên 2.000 ký tự bắt đầu bằng `{` hoặc `[` (sau khoảng trắng tùy chọn) và các phân tích cú pháp được tóm tắt: một mảng gồm hơn 7 mục giữ 5 mục đầu tiên và 2 mục cuối cùng cùng tổng số lượng của nó, đồng thời một đối tượng giữ 20 khóa đầu tiên, với mỗi đối tượng lồng nhau hoặc giá trị mảng được thay thế bằng phần giữ chỗ `{…N keys}` (đối với một mảng, N là độ dài của nó) và điểm đánh dấu `_remaining_<N>_keys` đếm các khóa bị bỏ qua 20 khóa đầu tiên. được sao chép toàn bộ, do đó, một đối tượng có 20 khóa trở xuống không có giá trị lồng nhau chỉ được thụt lề lại — một đối tượng được rút gọn sẽ nhận được các ký tự và không thay đổi.
5. **`errorMessage`** : đầu ra chứa, ở bất kỳ đâu và trong bất kỳ trường hợp chữ cái nào, `error:`, `error ` (từ theo sau là khoảng trắng, như trong `no error found`), `[error]`, `exception:`, `exception `, `[exception]` hoặc `traceback` giữ dòng đầu tiên, 10 dòng tiếp theo và 3 dòng cuối cùng, với điểm đánh dấu `… [N frames elided] …` thay cho các dòng giữa chúng. Điểm đánh dấu chỉ xuất hiện khi có hơn 13 dòng theo sau dòng đầu tiên, do đó lỗi đầu ra từ 14 dòng trở xuống không được rút ngắn (ở mức 12 hoặc 13 dòng, 3 dòng lặp lại cuối cùng đã được giữ lại).

Sau khi một chiến lược phù hợp, ngay cả một chiến lược không tiết kiệm được gì, các chiến lược sau đó sẽ không được thử. Khi chiến lược so khớp không lưu mã thông báo ước tính (độ dài ÷ 4, làm tròn), — chẳng hạn như tệp giống mã có 25 dòng trở xuống hoặc mảng JSON trên 2.000 ký tự với 7 mục trở xuống — công cụ tích cực sẽ giữ kết quả công cụ ban đầu: cả hai người gọi (`compressAggressive()` và `compressAnthropicToolResultBlock()`) giữ nguyên bản gốc khi `saved` bằng 0 hoặc thấp hơn, trong khi bản thân `compressToolResult()` vẫn trả về kết quả đầu ra của chiến lược đó. Bước kết quả công cụ không phải là từ cuối cùng: trình tóm tắt dự phòng của công cụ vẫn có thể rút ngắn tin nhắn `tool` hoặc `function` dài hơn 8.192 ký tự (`maxTokensPerMessage`, 2.048, lần 4).

#### Khi nào nên sử dụng

Nén kết quả công cụ là bước 1 của công cụ tích cực (`compressAggressive()` trong `open-sse/services/compression/aggressive.ts`), do đó, nó chạy ở chế độ Linh hoạt và ở bước `aggressive` của một đường ống xếp chồng lên nhau. Nó nén các tin nhắn `tool` và `function` có hình dạng OpenAI cũng như văn bản bên trong các khối Anthropic `tool_result`. Mỗi chiến lược đều có công tắc riêng theo `aggressive.toolStrategies`, tất cả đều được bật theo mặc định. Trong bảng điều khiển, các công tắc nằm trong trang Caveman** Trình độ cao** xem trong khi tính năng nén được bật và chế độ mặc định là Linh hoạt.

### Đường ống xếp chồng lên nhau

Chế độ xếp chồng chạy** nhiều động cơ theo trình tự** — thường là RTK trước tiên (tiết kiệm 60-90% đầu ra công cụ), sau đó là Caveman trên văn bản còn lại ( tiết kiệm đầu vào ~ 46%). Sáng tác, đó là** Phạm vi đủ điều kiện 78-95%** (xem Toán tiết kiệm ngược dòng ở trên): `1 - (1 - 0.60..0.90) × (1 - 0.46)` trung bình ≈ 89%.

#### Nó hoạt động như thế nào

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### Khi nào nên sử dụng

Sử dụng chế độ xếp chồng cho:

- Quy trình làm việc nặng về công cụ (mã hóa tác nhân, nghiên cứu)
- Xử lý hàng loạt nhạy cảm với chi phí
- Khi bạn cần tiết kiệm token tối đa

Các đường ống xếp chồng được định cấu hình thông qua cài đặt nén `stackedPipeline` chung hoặc thông qua tổ hợp nén có tên được gán cho tổ hợp định tuyến (xem Ghi đè mỗi tổ hợp ở trên) — không thông qua `modePack` tự động kết hợp (trường đó chỉ tính lại lựa chọn mô hình kết hợp tự động và `stacked` không phải là tên gói hợp lệ).

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
