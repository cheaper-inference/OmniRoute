# Log export (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Xuất liên tục, tăng dần nhật ký cuộc gọi OmniRoute sang một kho phân tích bên ngoài.

Tab Logs trên bảng điều khiển lưu lịch sử yêu cầu trong SQLite (`call_logs`), với dung lượng bị giới hạn bởi cơ chế
xoay vòng và chính sách lưu giữ. Tính năng xuất nhật ký chuyển cùng một tập bản ghi ra ngoài theo lịch để dữ liệu có thể tồn tại lâu hơn
cơ sở dữ liệu cục bộ và được kết hợp với dữ liệu khác. BigQuery là đích đầu tiên; pipeline sử dụng một registry, vì vậy có thể bổ sung
thêm các đích khác.

---

## 1. Cách thức hoạt động

```
máy chủ (giải mã + xác thực cấu hình, đối soát con trỏ)
  → khởi động IPC → tiến trình HĐH exportChild biệt lập
    → storage.sqlite chỉ đọc → truy vấn/ánh xạ nhật ký cuộc gọi dùng chung
      → nạp artifact bất đồng bộ → prepare()/send() của đích
        → IPC theo lô → máy chủ lưu con trỏ → IPC ack
          → lô tiếp theo; IPC done → máy chủ ghi nhận thành công
```

- **Lịch chạy** — một tác vụ cron `JobRegistry`, `log_export`, mặc định là `0 * * * *` (hàng giờ,
  UTC). Được đăng ký trong `src/lib/initCloudSync.ts`; có thể ghi đè bằng `OMNIROUTE_LOG_EXPORT_CRON`.
  Mỗi lần chạy sẽ lần lượt xử lý mọi đích **đã bật**.
- **Con trỏ** — `call_logs.rowid` ngầm định của SQLite, được lưu riêng cho từng đích trong
  `log_export_destinations.cursor_row_id`. `timestamp` được chủ ý không dùng làm con trỏ: bên gọi
  có thể cung cấp giá trị riêng, vì vậy một yêu cầu chậm có thể được ghi sau một yêu cầu nhanh hơn
  dù yêu cầu nhanh bắt đầu muộn hơn, và con trỏ dựa trên dấu thời gian sẽ bỏ qua yêu cầu đó.
- **Chia lô** — `batch_size` hàng cho mỗi yêu cầu (mặc định 500), `max_rows_per_run` hàng cho mỗi lần chạy
  (mặc định 10000), để lượng tồn đọng lớn được xử lý qua nhiều lần chạy thay vì chặn trong một lần.
- **Phân phối** — con trỏ chỉ tiến lên sau khi `send()` hoàn tất. Một lô thất bại sẽ giữ nguyên
  con trỏ, vì vậy các hàng đó được thử lại trong lần chạy tiếp theo. Cơ chế bảo đảm là
  ít nhất một lần cộng với việc loại bỏ trùng lặp ở phía đích, chứ không phải chính xác một lần thực sự: BigQuery
  định danh từng hàng bằng id của nhật ký cuộc gọi và áp dụng điều này theo khả năng tối đa trong cửa sổ khử trùng lặp riêng.
- **Bảo vệ khỏi chạy chồng lấn** — lần chạy cron và `POST .../run` có thể được kích hoạt cùng lúc. Một đích
  đang được xử lý sẽ bị bỏ qua thay vì được xử lý hai lần (`skipped: true` trong kết quả chạy),
  vì vậy một lần chạy đồng thời không thể gửi lại một lô hoặc ghi lùi con trỏ.
- **Khôi phục sau khi xóa dữ liệu** — nếu `cursor_row_id` lớn hơn `MAX(rowid)` (toàn bộ bảng đã bị
  xóa sạch và rowid bắt đầu lại), trình chạy sẽ tua con trỏ về 0 thay vì vĩnh viễn không thấy dữ liệu mới.

### Trình chạy biệt lập và các giới hạn

Mỗi lần chạy một đích trên Node sẽ khởi động một tiến trình con HĐH riêng biệt, tồn tại trong thời gian ngắn (`child_process`
với IPC, không phải `worker_threads`). Việc đọc nội dung, phân tích/chuyển đổi tuần tự JSON của payload, thao tác
`prepare()` của đích và I/O mạng của đích đều chạy tại đó, không chạy trên vòng lặp sự kiện của máy chủ.
Chỉ cấu hình và các thông báo tiến độ nhỏ được truyền qua IPC; các bản ghi đã xuất không bao giờ quay lại
máy chủ. Tác vụ cron và route Chạy ngay vẫn giữ nguyên kết quả công khai và cơ chế bảo vệ khỏi chạy chồng lấn.

Tiến trình con mở `DATA_DIR/storage.sqlite` đã được máy chủ phân giải ở chế độ chỉ đọc bằng `node:sqlite`,
với `busy_timeout=5000` và `query_only=ON`. Nó không nhập singleton DB và không thực hiện
migration, sao lưu hay cập nhật SQLite. Việc theo dõi artifact bị thiếu/hỏng (bao gồm cả
UPDATE cho artifact hỏng) chỉ nằm trong đường dẫn chi tiết của bảng điều khiển. Cả hai đường dẫn dùng chung một
trình phân giải chi tiết thuần túy; thao tác xuất dùng các lần đọc hệ thống tệp bất đồng bộ và cùng thứ tự phân giải
artifact → nội tuyến kiểu cũ → đĩa kiểu cũ → không có. Một lần chạy sẽ chụp lại rowid chèn tối đa
khi tiến trình con mở trình đọc; các bản ghi được chèn sau đó sẽ chờ đến lần chạy tiếp theo. Đây là một ranh giới
chèn, không phải một giao dịch SQLite tồn tại lâu: các trình ghi WAL và checkpoint vẫn có thể hoạt động tự do trong
thời gian chờ mạng. Các thao tác cập nhật/xóa hàng hiện có không bị đóng băng bởi ranh giới này.

Sau mỗi lô được chấp nhận, tiến trình con sẽ chờ xác nhận. Trước tiên, máy chủ lưu
con trỏ bằng `advanceLogExportCursor`, sau đó gửi `ack`; lô tiếp theo sẽ không bắt đầu trước thời điểm đó.
Lỗi gửi, sự cố tiến trình hoặc hết thời gian chờ sẽ được ghi nhận là thất bại mà không đẩy con trỏ qua lô đó. Các lô
đã được xác nhận trước đó vẫn được cam kết; nhiều nhất chỉ lô chưa được xác nhận mới có thể bị gửi lại.
Thành công chỉ được ghi nhận sau `done` và khi tiến trình con thoát sạch. Khi có lỗi, tiến trình con bị kết thúc
bằng SIGTERM, sau 500 ms sẽ nâng lên SIGKILL, và trình chạy chờ tiến trình đóng hoàn toàn.

| Biến môi trường                               | Mặc định | Mục đích                                               |
| --------------------------------------------- | -------- | ------------------------------------------------------ |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000   | Giới hạn thời gian thực cho mỗi đích                   |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024     | Giới hạn old-space V8 của tiến trình con, tính bằng MB |

Các giá trị không hợp lệ/không dương/không phải số nguyên sẽ dùng giá trị mặc định. Thiết lập heap không phải là giới hạn
RSS tổng thể; các lô rất lớn vẫn có thể làm cạn bộ nhớ của tiến trình con và khiến lần chạy thất bại một cách an toàn.
Mức mặc định 1024 MB chừa đủ dung lượng cho lô mặc định 500 hàng gồm các artifact 512 KiB khi
bật nội dung, bao gồm cả quá trình chuyển đổi tuần tự JSON theo từng khối byte của BigQuery. Mức này không bảo đảm an toàn cho
một lô 10000 hàng có kèm nội dung. Khi V8 cạn heap, hệ thống sẽ ghi lại lỗi kèm hành động khắc phục: giảm kích thước lô
hoặc tăng `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; con trỏ vẫn ở lô cuối cùng
đã được xác nhận. Các nội dung nội tuyến/trên đĩa kiểu cũ không chịu giới hạn artifact hiện đại.
Đơn vị vận hành phải lập ngân sách RSS riêng, đặc biệt là bên trong các container bị giới hạn bộ nhớ.

Tiến trình con chỉ kế thừa `DATA_DIR` đã phân giải, `NODE_ENV`, `TZ` được chỉ định rõ ràng (để phân giải
giờ địa phương trong tên tệp kiểu cũ), `ELECTRON_RUN_AS_NODE` khi có, và các đầu vào kết nối ra ngoài sau:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (cùng các dạng viết thường tương ứng),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Một dispatcher Undici toàn cục dùng chung logic thuần túy của máy chủ để phân giải proxy từ môi trường và các quy tắc
bỏ qua proxy cho máy chủ cục bộ, bao gồm `NO_PROXY`; nó không nhập `proxyFetch.ts` hoặc các cờ DB/tính năng của tệp này.
Thông tin xác thực proxy được che khỏi đầu ra được chuyển tiếp và các lỗi được ghi nhận. Thông tin xác thực của đích
chỉ được truyền trong một thông báo IPC khởi động, không bao giờ qua argv hoặc môi trường; việc chuyển tiếp đầu ra/lỗi
được thêm tiền tố và làm sạch. Chỉ `ExperimentalWarning` bị tắt trong các đối số thực thi của tiến trình con để tránh
lặp lại cảnh báo SQLite của Node trong mỗi lần chạy cron; các loại cảnh báo khác vẫn hiển thị.

Các mô-đun đích phải có thể được import mà không cần các phần phụ thuộc chỉ dành cho Next.js/máy chủ. Phần triển khai
BigQuery hiện tại đã đáp ứng hợp đồng đó. Bộ nhớ đệm access token chỉ tồn tại trong lần chạy của tiến trình con,
không tồn tại xuyên suốt nhiều lần chạy. Node là runtime được hỗ trợ (`package.json` engines), nhưng phần cài đặt
Bun trong README và `Dockerfile.bun` cũng công bố một lộ trình tương thích cho môi trường production sử dụng
`bun:sqlite` (`src/lib/db/core.ts` / các adapter). Vì vậy, dưới Bun, các tác vụ xuất vẫn giữ lại
luồng xử lý trong cùng tiến trình trước đây và phát cảnh báo một lần: không hỗ trợ cô lập heap/timeout của tiến trình con. Hãy dùng
Node để cô lập event loop và OOM; Bun không được xem là chỉ dành cho môi trường phát triển ở đây.

Khi bật `includeBodies`, nên ưu tiên tần suất theo phút, chẳng hạn như
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, thay vì tích lũy lượng payload tồn đọng trong một giờ.
Các giới hạn về batch và hàng vẫn ràng buộc mỗi lần chạy. Chi phí khởi động tiến trình được tính cho từng đích trong mỗi lần chạy;
đây là sự đánh đổi một khoản chi phí khởi động nhỏ để đổi lấy khả năng cô lập event loop của máy chủ, chứ không làm giảm tổng mức sử dụng CPU.

### Payload (prompt và phần hoàn thành)

Theo mặc định, dữ liệu xuất chỉ chứa các trường tóm tắt mà danh sách **list** của Logs hiển thị. Việc bật
**Xuất prompt và phản hồi** (`includeBodies`) sẽ gửi thêm những gì ngăn **detail**
của Logs hiển thị cho mỗi lệnh gọi:

| Trường                           | Nội dung                                                                    |
| -------------------------------- | --------------------------------------------------------------------------- |
| `request_body` / `response_body` | Payload của lệnh gọi như được hiển thị trên bảng điều khiển                 |
| `pipeline_route_decision`        | Đích và model mà bộ định tuyến đã chọn                                      |
| `pipeline_client_request`        | Yêu cầu thô chính xác như client đã gửi                                     |
| `pipeline_openai_request`        | Sau khi được chuyển đổi sang cấu trúc OpenAI nội bộ                         |
| `pipeline_provider_request`      | Dữ liệu thực tế được gửi lên thượng nguồn, theo phương ngữ của nhà cung cấp |
| `pipeline_provider_response`     | Phản hồi thô từ thượng nguồn                                                |
| `pipeline_client_response`       | Nội dung được trả lại cho bên gọi                                           |
| `pipeline_error`                 | Chi tiết lỗi ở cấp pipeline cho một lệnh gọi thất bại                       |
| `bodies_truncated`               | True khi bất kỳ trường nào ở trên đạt `maxBodyBytes`                        |

Đây là nội dung prompt, vì vậy tính năng này **bị tắt theo mặc định** và được thiết kế để lựa chọn riêng cho từng đích.
Nội dung được gửi chính là những gì bảng điều khiển hiển thị, vì dữ liệu xuất và `getCallLogById` dùng chung cơ chế
phân giải chi tiết: các payload
đã được loại bỏ PII và che thông tin bí mật khi ghi, đồng thời một lệnh gọi được thực hiện bằng
API key `noLog` hoàn toàn không lưu payload, nên không có gì để xuất.

Payload được đọc theo từng hàng từ artifact trên hệ thống tệp, vì vậy quá trình hydrate chỉ chạy cho những đích
đã yêu cầu dữ liệu này. Khi artifact bị thiếu hoặc hỏng, phần tóm tắt của hàng vẫn được xuất với các payload null
thay vì khiến batch thất bại và làm con trỏ bị mắc kẹt.

`maxBodyBytes` (mặc định 262144) giới hạn kích thước từng trường. Các payload dài hơn sẽ **bị cắt ngắn thay vì
bị loại bỏ** — một prompt bị cắt vẫn trả lời được câu hỏi "đã hỏi điều gì" — và hàng đó được đánh dấu bằng
`bodies_truncated`. Các delta được truyền trực tuyến theo từng chunk không được xuất; phản hồi đã lắp ráp
đã có trong `pipeline_provider_response` và `pipeline_client_response`.

---

## 2. Tệp

| Thành phần                 | Vị trí                                       |
| -------------------------- | -------------------------------------------- |
| Hợp đồng đích              | `src/lib/logExport/types.ts`                 |
| Registry                   | `src/lib/logExport/registry.ts`              |
| Xử lý bí mật               | `src/lib/logExport/secrets.ts`               |
| Trình chạy (IPC cha)       | `src/lib/logExport/runner.ts`                |
| Vòng đời tiến trình        | `src/lib/logExport/childRunner.ts`           |
| Điểm vào tiến trình con    | `src/lib/logExport/exportChild.ts`           |
| Trình mở chỉ đọc           | `src/lib/db/logExportReadOnly.ts`            |
| Truy vấn/ánh xạ dùng chung | `src/lib/usage/callLogExportQueries.ts`      |
| Trình phân giải chi tiết   | `src/lib/usage/callLogDetailResolver.ts`     |
| Phép chiếu API             | `src/lib/logExport/presenter.ts`             |
| Đích BigQuery              | `src/lib/logExport/destinations/bigquery.ts` |
| Xác thực SA của Google     | `src/lib/logExport/googleServiceAccount.ts`  |
| Nguồn nhật ký cuộc gọi     | `src/lib/usage/callLogExportSource.ts`       |
| Lưu trữ bền vững           | `src/lib/db/logExportDestinations.ts`        |
| Tác vụ cron                | `src/lib/jobs/logExportJob.ts`               |
| Lớp REST                   | `src/app/api/log-export/`                    |
| Trang bảng điều khiển      | `src/app/(dashboard)/dashboard/log-export/`  |

Lược đồ: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API REST

Tất cả các tuyến đều yêu cầu xác thực quản trị (`requireManagementAuth`). Bí mật không bao giờ được trả về:
một bí mật đã lưu sẽ được trả về dưới dạng giá trị chữ `__stored__`, và việc gửi lại giá trị đó trong một lần cập nhật
sẽ giữ nguyên thông tin xác thực đã lưu.

Việc tạo hoặc cập nhật một đích mà kiểu của nó khai báo có bí mật **yêu cầu
`STORAGE_ENCRYPTION_KEY`**. Nếu không có biến này, `encrypt()` sẽ âm thầm truyền nguyên giá trị, vì vậy thao tác ghi
sẽ bị từ chối với mã 400 thay vì đưa thông tin xác thực vào SQLite dưới dạng văn bản thuần túy (cùng cơ chế bảo vệ mà
webhook Telegram áp dụng).

| Phương thức | Đường dẫn                                | Mục đích                                                       |
| ----------- | ---------------------------------------- | -------------------------------------------------------------- |
| `GET`       | `/api/log-export/types`                  | Các kiểu đích + danh sách trường cấu hình của chúng            |
| `GET`       | `/api/log-export/destinations`           | Liệt kê các đích (bí mật đã được che)                          |
| `POST`      | `/api/log-export/destinations`           | Tạo một đích                                                   |
| `GET`       | `/api/log-export/destinations/{id}`      | Đọc một đích                                                   |
| `PUT`       | `/api/log-export/destinations/{id}`      | Cập nhật tên / trạng thái bật / cấu hình / chia lô             |
| `DELETE`    | `/api/log-export/destinations/{id}`      | Xóa                                                            |
| `POST`      | `/api/log-export/destinations/{id}/test` | Kiểm tra thông tin xác thực, không ghi gì                      |
| `POST`      | `/api/log-export/destinations/{id}/run`  | Xử lý ngay, cùng luồng với lần chạy theo lịch                  |
| `GET`       | `/api/log-export/status`                 | Trạng thái cron, các lần chạy gần đây, tồn đọng theo từng đích |

`GET /api/log-export/types` là yếu tố giúp giao diện người dùng trở nên tổng quát: biểu mẫu trên bảng điều khiển được kết xuất từ
các mô tả trường được trả về, vì vậy việc thêm một đích mới không yêu cầu thay đổi giao diện người dùng.

---

## 4. Đích BigQuery

Các khóa cấu hình (`type: "bigquery"`):

| Khóa                 | Ghi chú                                                                   |
| -------------------- | ------------------------------------------------------------------------- |
| `projectId`          | Dự án GCP chứa tập dữ liệu                                                |
| `datasetId`          | `[A-Za-z0-9_]+`                                                           |
| `tableId`            | `[A-Za-z0-9_]+`                                                           |
| `location`           | Chỉ được dùng khi cần tạo tập dữ liệu (mặc định `EU`)                     |
| `serviceAccountJson` | Khóa tài khoản dịch vụ. Bí mật: được mã hóa khi lưu, không bao giờ trả về |
| `autoCreate`         | Tạo tập dữ liệu và bảng trong lần xuất đầu tiên (mặc định `true`)         |

Tài khoản dịch vụ cần quyền `bigquery.tables.updateData` trên bảng đích, cùng với
`bigquery.datasets.create` / `bigquery.tables.create` khi `autoCreate` được bật.

Một lô đã cấu hình là đơn vị **con trỏ**, không phải đơn vị HTTP: `send()` chia lô đó thành các lời gọi insertAll
với tối đa 500 hàng, vì vậy một `batch_size` lớn không thể vượt quá giới hạn yêu cầu 10 MB của BigQuery.
Các trạng thái tạm thời (408/429/500/502/503/504) được thử lại tối đa ba lần với thời gian chờ tăng theo cấp số nhân,
đồng thời tái sử dụng cùng các insertIds; lỗi xác thực và lược đồ sẽ ném lỗi ngay trong lần thử đầu tiên thay vì
lãng phí cả lượt chạy.

Một bảng vừa được tạo chưa thể xuất hiện ngay với điểm cuối truyền phát, nên điểm cuối này sẽ trả về
404 trong vài giây. Lỗi 404 đó được thử lại, nhưng **chỉ khi lượt chạy này đã tạo bảng** —
một bảng thực sự không tồn tại vẫn sẽ thất bại ngay. Lưu ý rằng việc tạo lại một bảng bằng tên của
một bảng vừa bị xóa gần đây khiến BigQuery từ chối các thao tác chèn truyền phát trong vài phút; đây là
đặc tính của quy trình xóa rồi tạo lại, vì vậy hãy ưu tiên dùng tên bảng mới thay vì xóa và thêm lại bảng.

**Lỗi một phần được trả về dưới dạng HTTP 200 với `insertErrors[]` không rỗng.** Trường hợp này được xem là
lỗi và sẽ ném lỗi, nhờ đó con trỏ không tiến qua những hàng mà BigQuery chưa từng chấp nhận;
`tests/unit/log-export-bigquery.test.ts` cố định hành vi này.

Giao vận sử dụng REST thuần túy — một assertion RS256 tự ký được trao đổi để lấy mã truy cập tại
`https://oauth2.googleapis.com/token`, sau đó các hàng được gửi đến `tabledata.insertAll`. Không sử dụng
Google SDK. Các mã truy cập được lưu vào bộ nhớ đệm trong tiến trình theo từng cặp (tài khoản dịch vụ, phạm vi).

Bảng được tạo có một cột cho mỗi trường trong thẻ Logs, cùng với `exported_at`, và được bố trí phù hợp với
cách nhật ký cuộc gọi thực sự được truy vấn:

- **Phân vùng theo ngày dựa trên `timestamp`**, vì vậy một truy vấn bị giới hạn theo ngày chỉ quét những ngày đó.
- **Phân cụm theo `api_key_name`, `provider`, `model`, `status`** (theo thứ tự đó), nhờ vậy việc lọc theo
  người chạy, nơi yêu cầu được gửi đến hoặc liệu yêu cầu có thất bại hay không sẽ loại bỏ các khối không liên quan trong mỗi phân vùng. BigQuery
  cho phép tối đa bốn cột phân cụm và thứ tự có ý nghĩa quan trọng: chỉ riêng bộ lọc theo `api_key_name`
  có thể loại bỏ các khối, còn chỉ riêng bộ lọc theo `status` thì không.
- **Thời gian lưu giữ phân vùng tùy chọn** thông qua `partitionExpirationDays` (0 giữ lại mọi thứ), được áp dụng
  khi bảng được tạo.

Cả hai thiết lập đều được áp dụng tại thời điểm tạo. Một bảng hiện có sẽ giữ nguyên bố cục hiện tại, vì vậy
hãy trỏ đích đến một table id mới nếu bạn muốn áp dụng chúng.

`tests/unit/log-export-bigquery.test.ts` xác nhận rằng mapper và schema của bảng luôn
đồng bộ chặt chẽ, nhờ đó một cột call-log mới không thể bị âm thầm loại bỏ trong quá trình xuất.

Các batch được chia chunk dựa trên **cả** số lượng hàng và số byte sau khi tuần tự hóa. Chỉ số lượng hàng là không đủ
khi payload được xuất: 500 hàng chứa prompt có thể chiếm hàng chục megabyte, và insertAll
từ chối yêu cầu vượt quá 10 MB. Các chunk được đóng khi đạt 500 hàng hoặc 9 MB, tùy điều kiện nào đến trước.

---

## 5. Thêm một đích đến

1. Tạo `src/lib/logExport/destinations/<name>.ts` để export một `LogExportDestinationType`:
   một `configSchema` của Zod, một mảng mô tả `fields` cho UI, `secretFields`, và một
   `createClient(config)` trả về `test()` / `prepare()` / `send(records)`.
2. Thêm nó vào mảng `DESTINATIONS` trong `src/lib/logExport/registry.ts`.
3. Viết các bài kiểm thử trong `tests/unit/`.

Đó là toàn bộ thay đổi: cơ chế lưu trữ, cron job, lớp REST, mã hóa thông tin bí mật và biểu mẫu
trên dashboard đều đọc từ registry.

Hai quy tắc dành cho đích đến mới:

- `send()` **phải throw** khi xảy ra lỗi một phần. Việc resolve có nghĩa là "đích đến đã có các hàng này",
  và con trỏ sẽ vĩnh viễn di chuyển qua chúng.
- Một đích đến nhận URL do người dùng cung cấp phải xác thực URL đó thông qua
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) trước khi fetch,
  tương tự như cách webhook thực hiện. BigQuery không cần bước này vì các host của nó là hằng số.

---

## 6. Vận hành

- **Dashboard**: Integrations → Log export. Thêm một đích đến, chạy **Test** để kiểm tra thông tin xác thực
  mà không ghi các hàng, sau đó bật đích đến.
- **Dữ liệu tồn đọng**: mỗi thẻ đích đến hiển thị số hàng đang chờ và con trỏ; `GET
/api/log-export/status` trả về các số liệu tương tự cùng 20 lần chạy job gần nhất.
- **Một đích đến bị lỗi không làm các đích đến khác thất bại** — bản tóm tắt lần chạy ghi lại trạng thái
  của từng đích đến trong `last_status` / `last_error`, còn lịch sử chạy job lưu giữ thông tin tổng hợp.
- **Xóa một đích đến cũng sẽ xóa con trỏ của nó.** Khi thêm lại, hệ thống sẽ bắt đầu từ nhật ký cuộc gọi
  cũ nhất còn được lưu giữ, khiến các hàng mà đích đến có thể đã lưu bị gửi lại. Trên BigQuery, `insertId`
  của từng hàng chỉ xử lý việc này trong khoảng thời gian chống trùng lặp riêng của BigQuery, vì vậy nên
  ưu tiên tắt một đích đến thay vì xóa nó.
