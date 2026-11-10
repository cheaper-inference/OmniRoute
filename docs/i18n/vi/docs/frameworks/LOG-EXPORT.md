# Log export (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Xuất liên tục, gia tăng nhật ký lệnh gọi OmniRoute sang kho phân tích bên ngoài.

Tab Nhật ký trên bảng điều khiển lưu lịch sử yêu cầu trong SQLite (`call_logs`), được giới hạn bởi
cơ chế luân chuyển và lưu giữ. Tính năng xuất nhật ký chuyển cùng tập bản ghi đó ra ngoài theo lịch để dữ liệu có thể tồn tại lâu hơn
cơ sở dữ liệu cục bộ và được kết hợp với dữ liệu khác. BigQuery là đích đến đầu tiên;
quy trình xử lý sử dụng cơ chế đăng ký, nên có thể bổ sung thêm các đích đến.

---

## 1. Cách hoạt động

```
máy chủ (giải mã + xác thực cấu hình, đối soát con trỏ)
  → khởi động IPC → tiến trình HĐH exportChild biệt lập
    → storage.sqlite chỉ đọc → truy vấn/ánh xạ nhật ký lệnh gọi dùng chung
      → nạp dữ liệu hiện vật bất đồng bộ → prepare()/send() của đích đến
        → IPC lô → máy chủ lưu con trỏ → IPC xác nhận
          → lô tiếp theo; IPC hoàn tất → máy chủ ghi nhận thành công
```

- **Lịch chạy** — một tác vụ cron `JobRegistry`, `log_export`, mặc định là `0 * * * *` (hằng giờ,
  UTC). Được đăng ký trong `src/lib/initCloudSync.ts`; có thể ghi đè bằng `OMNIROUTE_LOG_EXPORT_CRON`.
  Mỗi lần kích hoạt sẽ lần lượt xử lý hết dữ liệu của từng đích đến **đã bật**.
- **Con trỏ** — `call_logs.rowid` ngầm định của SQLite, được lưu riêng cho từng đích đến trong
  `log_export_destinations.cursor_row_id`. `timestamp` được chủ ý không dùng làm con trỏ: bên gọi
  có thể cung cấp giá trị riêng, nên một yêu cầu chậm có thể được ghi sau một yêu cầu nhanh hơn nhưng bắt đầu
  muộn hơn, và con trỏ dấu thời gian sẽ bỏ sót yêu cầu đó.
- **Chia lô** — `batch_size` hàng cho mỗi yêu cầu (mặc định 500), `max_rows_per_run` hàng cho mỗi lần chạy
  (mặc định 10000) để lượng dữ liệu tồn đọng lớn được xử lý qua nhiều lần kích hoạt thay vì chặn một lần.
- **Phân phối** — con trỏ chỉ tiến lên sau khi `send()` hoàn tất thành công. Khi một lô thất bại,
  con trỏ giữ nguyên vị trí, nên các hàng đó sẽ được thử lại vào lần chạy tiếp theo. Cơ chế bảo đảm là
  ít nhất một lần kết hợp với loại bỏ trùng lặp ở phía đích đến, chứ không thực sự là đúng một lần: BigQuery dùng
  id nhật ký lệnh gọi làm khóa cho từng hàng và xử lý khóa đó theo nguyên tắc nỗ lực tối đa trong cửa sổ loại bỏ trùng lặp của chính nó.
- **Chống chạy chồng lấn** — lần kích hoạt cron và `POST .../run` có thể xảy ra cùng lúc. Một đích đến
  đang được xử lý sẽ bị bỏ qua thay vì được xử lý hai lần (`skipped: true` trong kết quả chạy),
  nên một lần chạy đồng thời không thể gửi lại một lô hoặc ghi lùi con trỏ.
- **Khôi phục sau khi xóa sạch** — nếu `cursor_row_id` lớn hơn `MAX(rowid)` (toàn bộ bảng đã bị
  xóa sạch và rowid bắt đầu lại), trình chạy sẽ đặt lại về 0 thay vì vĩnh viễn không nhận thấy dữ liệu.

### Trình chạy biệt lập và các giới hạn

Mỗi lần chạy cho một đích đến trên Node đều khởi động một tiến trình con HĐH riêng biệt, tồn tại ngắn hạn (`child_process`
với IPC, không phải `worker_threads`). Việc đọc phần thân, phân tích cú pháp/tuần tự hóa JSON của tải dữ liệu,
`prepare()` của đích đến và I/O mạng đến đích đều chạy tại đó, không chạy trên vòng lặp sự kiện của máy chủ.
Chỉ cấu hình và các thông báo tiến độ nhỏ đi qua IPC; các bản ghi được xuất không bao giờ quay về
máy chủ. Tác vụ cron và tuyến Chạy ngay vẫn giữ nguyên kết quả công khai và cơ chế chống chạy chồng lấn.

Tiến trình con mở `DATA_DIR/storage.sqlite` đã được máy chủ phân giải ở chế độ chỉ đọc bằng `node:sqlite`,
với `busy_timeout=5000` và `query_only=ON`. Nó không nhập singleton cơ sở dữ liệu và không thực hiện
di chuyển lược đồ, sao lưu hay cập nhật SQLite. Việc quản lý trạng thái hiện vật bị thiếu/hỏng (bao gồm
thao tác UPDATE cho hiện vật hỏng) vẫn chỉ nằm trong luồng xử lý chi tiết của bảng điều khiển. Cả hai luồng dùng chung một
bộ phân giải chi tiết thuần túy; tính năng xuất sử dụng các thao tác đọc hệ thống tệp bất đồng bộ và cùng thứ tự phân giải hiện vật → dữ liệu
nội tuyến kiểu cũ → dữ liệu trên đĩa kiểu cũ → không có. Một lần chạy chụp lại rowid chèn lớn nhất
khi tiến trình con mở bộ đọc; các bản ghi được chèn sau đó sẽ chờ lần chạy tiếp theo. Đây là ranh giới
chèn dữ liệu, không phải giao dịch SQLite kéo dài: các bên ghi WAL và các điểm kiểm tra vẫn hoạt động tự do trong
thời gian chờ mạng. Việc cập nhật/xóa các hàng hiện có không bị đóng băng bởi ranh giới này.

Sau mỗi lô được chấp nhận, tiến trình con chờ xác nhận. Trước tiên máy chủ lưu
con trỏ bằng `advanceLogExportCursor`, rồi gửi `ack`; không lô tiếp theo nào bắt đầu trước bước đó.
Lỗi gửi, sự cố hoặc hết thời gian chờ sẽ ghi nhận thất bại mà không tiến con trỏ cho lô đó. Các lô
đã được xác nhận trước đó vẫn được lưu nhận; nhiều nhất chỉ một lô chưa được xác nhận có thể bị gửi lại.
Thành công chỉ được ghi nhận sau `done` và khi tiến trình con thoát bình thường. Khi thất bại, tiến trình con bị chấm dứt
bằng SIGTERM, nâng lên SIGKILL sau 500 ms, và trình chạy chờ tiến trình đóng hoàn toàn.

| Biến môi trường                               | Mặc định | Mục đích                                                      |
| --------------------------------------------- | -------- | ------------------------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000   | Giới hạn thời gian thực cho mỗi đích đến                      |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024     | Giới hạn vùng old-space của V8 ở tiến trình con, tính bằng MB |

Các giá trị không hợp lệ/không dương/không phải số nguyên sẽ dùng giá trị mặc định. Thiết lập heap không phải là giới hạn
tổng RSS; các lô rất lớn vẫn có thể làm cạn bộ nhớ của tiến trình con và khiến lần chạy thất bại an toàn.
Giá trị mặc định 1024 MB chừa dung lượng dự phòng cho lô mặc định 500 hàng với các hiện vật 512 KiB khi
bật phần thân, bao gồm cả việc tuần tự hóa JSON chia khối theo byte của BigQuery. Giá trị này không bảo đảm an toàn cho
một lô 10000 hàng có phần thân. Khi heap V8 cạn, hệ thống ghi nhận lỗi kèm hướng xử lý: giảm kích thước
lô hoặc tăng `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; con trỏ giữ nguyên tại lô
được xác nhận gần nhất. Phần thân nội tuyến/trên đĩa từ trước không chịu giới hạn dung lượng hiện vật hiện đại.
Người vận hành phải dự trù RSS riêng, đặc biệt trong các container bị giới hạn bộ nhớ.

Tiến trình con chỉ kế thừa `DATA_DIR` đã được phân giải, `NODE_ENV`, `TZ` được chỉ định tường minh (phân giải
giờ địa phương cho tên tệp kiểu cũ), `ELECTRON_RUN_AS_NODE` nếu có, và các đầu vào cho kết nối đi sau:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (và các dạng chữ thường tương ứng),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Một dispatcher Undici toàn cục dùng chung cơ chế phân giải proxy chỉ dựa trên biến môi trường và các quy tắc
bỏ qua proxy cho máy chủ cục bộ của máy chủ, bao gồm `NO_PROXY`; nó không nhập `proxyFetch.ts` hay các cờ cơ sở dữ liệu/tính năng của mô-đun đó.
Thông tin xác thực proxy được che khỏi đầu ra được chuyển tiếp và các lỗi được ghi lại. Thông tin xác thực đích
chỉ được truyền trong một thông điệp IPC khởi động, không bao giờ qua argv hoặc biến môi trường; đầu ra/lỗi được chuyển tiếp
đều được thêm tiền tố và làm sạch. Chỉ `ExperimentalWarning` bị tắt trong các đối số thực thi của tiến trình con để tránh
lặp lại cảnh báo SQLite của Node mỗi lần cron chạy; các loại cảnh báo khác vẫn hiển thị.

Các mô-đun đích phải có thể được nhập mà không cần các phần phụ thuộc Next.js/chỉ dành cho máy chủ. Triển khai
BigQuery hiện tại đã đáp ứng yêu cầu đó. Bộ nhớ đệm token truy cập chỉ tồn tại trong lần chạy của tiến trình
con, không được giữ lại giữa các lần chạy. Node là môi trường chạy được hỗ trợ (trường engines trong `package.json`), nhưng mục
cài đặt Bun trong README và `Dockerfile.bun` cũng giới thiệu một phương án tương thích cho môi trường sản xuất sử dụng
`bun:sqlite` (`src/lib/db/core.ts` / các adapter). Vì vậy, khi chạy trên Bun, các tác vụ xuất vẫn giữ
cách xử lý trong cùng tiến trình như trước và phát cảnh báo một lần: không có cơ chế cô lập heap/thời gian chờ bằng tiến trình con. Hãy dùng
Node để cô lập vòng lặp sự kiện và tình trạng hết bộ nhớ (OOM); ở đây Bun không được xem là chỉ dành cho phát triển.

Khi bật `includeBodies`, nên ưu tiên lịch chạy theo phút như
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` thay vì để tồn đọng tải dữ liệu theo giờ.
Giới hạn lô và số hàng vẫn giới hạn mỗi lần chạy. Chi phí khởi động tiến trình phát sinh cho từng đích trong mỗi lần chạy;
cách này đánh đổi một khoản chi phí khởi động nhỏ để cô lập vòng lặp sự kiện của máy chủ, chứ không giảm tổng mức sử dụng CPU.

### Tải dữ liệu (lời nhắc và nội dung hoàn thành)

Theo mặc định, bản xuất chỉ chứa các trường tóm tắt mà **danh sách** Nhật ký hiển thị. Bật
**Xuất lời nhắc và phản hồi** (`includeBodies`) sẽ xuất thêm những gì ngăn **chi tiết** Nhật ký
hiển thị cho mỗi lệnh gọi:

| Trường                           | Nội dung                                                               |
| -------------------------------- | ---------------------------------------------------------------------- |
| `request_body` / `response_body` | Tải dữ liệu của lệnh gọi như được hiển thị trên bảng điều khiển        |
| `pipeline_route_decision`        | Đích và mô hình mà bộ định tuyến đã chọn                               |
| `pipeline_client_request`        | Yêu cầu thô đúng như máy khách đã gửi                                  |
| `pipeline_openai_request`        | Sau khi chuyển đổi sang định dạng OpenAI nội bộ                        |
| `pipeline_provider_request`      | Dữ liệu thực tế được gửi lên nhà cung cấp, theo định dạng riêng của họ |
| `pipeline_provider_response`     | Phản hồi thô từ nhà cung cấp                                           |
| `pipeline_client_response`       | Nội dung được trả lại cho bên gọi                                      |
| `pipeline_error`                 | Chi tiết lỗi ở cấp pipeline của một lệnh gọi thất bại                  |
| `bodies_truncated`               | True khi bất kỳ trường nào ở trên chạm giới hạn `maxBodyBytes`         |

Đây là nội dung lời nhắc, vì vậy tính năng này **mặc định bị tắt** và được chủ ý thiết kế để lựa chọn riêng cho từng đích.
Nội dung được xuất chính là nội dung bảng điều khiển hiển thị, vì chức năng xuất và `getCallLogById` dùng chung cơ chế
phân giải chi tiết: tải dữ liệu
đã được làm sạch thông tin nhận dạng cá nhân (PII) và che thông tin bí mật ngay khi ghi, còn lệnh gọi dùng
khóa API `noLog` hoàn toàn không lưu tải dữ liệu, nên không có gì để xuất.

Tải dữ liệu được đọc theo từng hàng từ tệp dữ liệu trên hệ thống tệp, vì vậy việc nạp bổ sung chỉ chạy cho các đích
đã yêu cầu. Nếu tệp dữ liệu bị thiếu hoặc hỏng, bản tóm tắt vẫn được xuất với tải dữ liệu null thay vì
làm cả lô thất bại và khiến con trỏ bị kẹt.

`maxBodyBytes` (mặc định 262144) giới hạn kích thước từng trường. Tải dữ liệu dài hơn sẽ được **cắt ngắn thay vì
loại bỏ** — lời nhắc bị cắt vẫn cho biết "đã hỏi gì" — và hàng đó được đánh dấu bằng
`bodies_truncated`. Các phần thay đổi được truyền trực tuyến theo từng đoạn không được xuất; phản hồi đã ghép hoàn chỉnh
đã có trong `pipeline_provider_response` và `pipeline_client_response`.

---

## 2. Tệp

| Thành phần                            | Vị trí                                       |
| ------------------------------------- | -------------------------------------------- |
| Hợp đồng đích xuất                    | `src/lib/logExport/types.ts`                 |
| Sổ đăng ký                            | `src/lib/logExport/registry.ts`              |
| Xử lý bí mật                          | `src/lib/logExport/secrets.ts`               |
| Bộ thực thi (IPC phía tiến trình cha) | `src/lib/logExport/runner.ts`                |
| Vòng đời tiến trình                   | `src/lib/logExport/childRunner.ts`           |
| Điểm vào tiến trình con               | `src/lib/logExport/exportChild.ts`           |
| Bộ mở chỉ đọc                         | `src/lib/db/logExportReadOnly.ts`            |
| Truy vấn/ánh xạ dùng chung            | `src/lib/usage/callLogExportQueries.ts`      |
| Bộ phân giải chi tiết                 | `src/lib/usage/callLogDetailResolver.ts`     |
| Phép chiếu API                        | `src/lib/logExport/presenter.ts`             |
| Đích xuất BigQuery                    | `src/lib/logExport/destinations/bigquery.ts` |
| Xác thực tài khoản dịch vụ Google     | `src/lib/logExport/googleServiceAccount.ts`  |
| Nguồn nhật ký cuộc gọi                | `src/lib/usage/callLogExportSource.ts`       |
| Lưu trữ bền vững                      | `src/lib/db/logExportDestinations.ts`        |
| Tác vụ cron                           | `src/lib/jobs/logExportJob.ts`               |
| Lớp REST                              | `src/app/api/log-export/`                    |
| Trang bảng điều khiển                 | `src/app/(dashboard)/dashboard/log-export/`  |

Lược đồ: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Tất cả các tuyến đều yêu cầu xác thực quản trị (`requireManagementAuth`). Bí mật không bao giờ được trả về:
bí mật đã lưu được trả về dưới dạng giá trị nguyên văn `__stored__`, và việc gửi lại giá trị đó khi cập nhật
sẽ giữ nguyên thông tin xác thực đã lưu.

Việc tạo hoặc cập nhật một đích xuất có kiểu khai báo bí mật **yêu cầu
`STORAGE_ENCRYPTION_KEY`**. Nếu không có khóa này, `encrypt()` sẽ âm thầm trả nguyên dữ liệu đầu vào, nên thao tác ghi bị
từ chối với mã 400 thay vì đưa thông tin xác thực vào SQLite dưới dạng văn bản thuần (cùng cơ chế bảo vệ mà
webhook Telegram áp dụng).

| Phương thức | Đường dẫn                                | Mục đích                                                                |
| ----------- | ---------------------------------------- | ----------------------------------------------------------------------- |
| `GET`       | `/api/log-export/types`                  | Các kiểu đích xuất + danh sách trường cấu hình tương ứng                |
| `GET`       | `/api/log-export/destinations`           | Liệt kê các đích xuất (ẩn bí mật)                                       |
| `POST`      | `/api/log-export/destinations`           | Tạo đích xuất                                                           |
| `GET`       | `/api/log-export/destinations/{id}`      | Đọc một đích xuất                                                       |
| `PUT`       | `/api/log-export/destinations/{id}`      | Cập nhật tên / trạng thái bật / cấu hình / xử lý theo lô                |
| `DELETE`    | `/api/log-export/destinations/{id}`      | Xóa                                                                     |
| `POST`      | `/api/log-export/destinations/{id}/test` | Kiểm tra thông tin xác thực, không ghi dữ liệu                          |
| `POST`      | `/api/log-export/destinations/{id}/run`  | Xuất hết dữ liệu chờ ngay, dùng cùng luồng xử lý như lần chạy theo lịch |
| `GET`       | `/api/log-export/status`                 | Trạng thái cron, các lần chạy gần đây, dữ liệu tồn đọng theo từng đích  |

`GET /api/log-export/types` giúp giao diện người dùng có tính tổng quát: biểu mẫu trên bảng điều khiển được kết xuất từ
các mô tả trường được trả về, nên việc thêm đích xuất mới không cần thay đổi giao diện.

---

## 4. Đích xuất BigQuery

Các khóa cấu hình (`type: "bigquery"`):

| Khóa                 | Ghi chú                                                                            |
| -------------------- | ---------------------------------------------------------------------------------- |
| `projectId`          | Dự án GCP chứa tập dữ liệu                                                         |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                    |
| `tableId`            | `[A-Za-z0-9_]+`                                                                    |
| `location`           | Chỉ dùng khi cần tạo tập dữ liệu (mặc định là `EU`)                                |
| `serviceAccountJson` | Khóa tài khoản dịch vụ. Bí mật: được mã hóa khi lưu trữ, không bao giờ được trả về |
| `autoCreate`         | Tạo tập dữ liệu và bảng trong lần xuất đầu tiên (mặc định là `true`)               |

Tài khoản dịch vụ cần có quyền `bigquery.tables.updateData` trên bảng đích, cùng với
`bigquery.datasets.create` / `bigquery.tables.create` khi bật `autoCreate`.

Một lô được cấu hình là đơn vị của **con trỏ**, không phải đơn vị HTTP: `send()` chia lô thành các lệnh gọi insertAll
với tối đa 500 hàng mỗi lần, nên `batch_size` lớn không thể vượt giới hạn yêu cầu 10 MB của BigQuery.
Các mã trạng thái tạm thời (408/429/500/502/503/504) được thử lại tối đa ba lần với thời gian chờ
tăng theo cấp số nhân, sử dụng lại cùng các insertIds; lỗi xác thực và lược đồ sẽ phát sinh ngoại lệ ngay lần thử đầu tiên thay vì
lãng phí cả lượt chạy.

Bảng vừa được tạo chưa hiển thị ngay với điểm cuối truyền trực tuyến, nên điểm cuối này trả về
404 trong vài giây. Mã 404 đó sẽ được thử lại, nhưng **chỉ khi bảng được tạo trong lượt chạy này** —
bảng thực sự không tồn tại vẫn sẽ báo lỗi ngay. Lưu ý rằng việc tạo lại bảng bằng tên
vừa bị xóa gần đây khiến BigQuery từ chối chèn dữ liệu trực tuyến trong vài phút; đây là
đặc tính của thao tác xóa rồi tạo lại, vì vậy hãy ưu tiên tên bảng mới thay vì xóa rồi thêm lại bảng cũ.

**Lỗi một phần được trả về dưới dạng HTTP 200 với `insertErrors[]` không rỗng.** Trường hợp này được coi là
thất bại và phát sinh ngoại lệ, nhờ đó ngăn con trỏ tiến qua các hàng mà BigQuery chưa từng
chấp nhận; `tests/unit/log-export-bigquery.test.ts` kiểm chứng hành vi này.

Việc truyền dữ liệu sử dụng REST thuần — một xác nhận RS256 tự ký được đổi lấy mã thông báo truy cập tại
`https://oauth2.googleapis.com/token`, sau đó các hàng được gửi đến `tabledata.insertAll`. Không đưa thêm Google SDK
vào làm phần phụ thuộc. Mã thông báo truy cập được lưu đệm trong tiến trình theo từng cặp (tài khoản dịch vụ, phạm vi).

Bảng được tạo có một cột cho mỗi trường trong thẻ Logs cùng với `exported_at`, và được bố trí theo
cách truy vấn nhật ký lệnh gọi trong thực tế:

- **Phân vùng theo ngày trên `timestamp`**, để truy vấn giới hạn theo ngày chỉ quét những ngày đó.
- **Phân cụm theo `api_key_name`, `provider`, `model`, `status`** (theo thứ tự đó), để khi lọc theo
  người thực hiện, đích đến hoặc trạng thái thất bại, các khối trong mỗi phân vùng được loại bớt. BigQuery
  cho phép tối đa bốn cột phân cụm và thứ tự có ý nghĩa: chỉ lọc theo `api_key_name`
  sẽ loại bớt các khối, còn chỉ lọc theo `status` thì không.
- **Thời hạn lưu giữ phân vùng tùy chọn** thông qua `partitionExpirationDays` (0 giữ lại mọi dữ liệu), được áp dụng
  khi tạo bảng.

Cả hai thiết lập đều áp dụng tại thời điểm tạo. Bảng hiện có giữ nguyên bố cục sẵn có, vì vậy
hãy trỏ đích xuất đến một mã định danh bảng mới nếu bạn muốn áp dụng chúng.

`tests/unit/log-export-bigquery.test.ts` xác nhận rằng bộ ánh xạ và lược đồ bảng luôn đồng bộ,
để không có cột nhật ký lệnh gọi mới nào bị âm thầm bỏ qua khi xuất.

Các lô được chia thành các phần dựa trên **cả** số hàng và số byte sau khi tuần tự hóa. Chỉ dựa vào số hàng là chưa đủ
khi xuất cả dữ liệu tải: 500 hàng chứa câu lệnh đầu vào có thể lên tới hàng chục megabyte, và insertAll
từ chối yêu cầu vượt quá 10 MB. Mỗi phần kết thúc khi đạt 500 hàng hoặc 9 MB, tùy giới hạn nào đến trước.

---

## 5. Đích xuất trace OTLP/HTTP

Cấu hình sử dụng `type: "otlp-http"`. Đây là cơ chế xuất nhật ký lệnh gọi đã lưu theo lịch,
có con trỏ theo dõi, không phải đích nhận sự kiện định tuyến trực tiếp theo cơ chế nỗ lực tối đa trong
`open-sse/services/routing/otel.ts`. Cơ chế này không đọc hoặc thay đổi các biến môi trường,
bộ định thời hay bộ đệm của đích nhận đó. Bật cả hai có thể tạo ra hai loại span độc lập;
hãy dùng phạm vi đo lường `omniroute.log-export` để phân biệt các span nhật ký lệnh gọi này.

| Khóa                     | Mặc định / mục đích                                                                |
| ------------------------ | ---------------------------------------------------------------------------------- |
| `endpoint`               | URL trace HTTP(S) đầy đủ, bắt buộc; không tự thêm hậu tố `/v1/traces`              |
| `headers`                | Các dòng `Name: value` hoặc đối tượng JSON chứa chuỗi, không bắt buộc; được mã hóa |
| `requestHeaderAllowlist` | Trống (tắt); tên/tiền tố header của máy khách cần thu thập làm thuộc tính span     |
| `serviceName`            | `omniroute`; thuộc tính tài nguyên `service.name`                                  |
| `langfuseMapping`        | `false`; thêm các thuộc tính generation/session/user của Langfuse                  |
| `identity`               | `pseudonymous`, `keyName` hoặc `none`                                              |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                            |
| `timeoutMs`              | `30000` cho mỗi lần thử HTTP                                                       |
| `environment`            | Chưa đặt; `langfuse.environment` không bắt buộc                                    |

Bảng điều khiển chung hiển thị các trường này. `paths` chấp nhận một mảng qua API hoặc một vùng nhập văn bản
chứa các đường dẫn chính xác, phân tách bằng ký tự xuống dòng/dấu phẩy. Các đường dẫn embeddings, rerank và đường dẫn khác
sẽ bị bỏ qua trừ khi được cho phép rõ ràng. Các hàng bị bỏ qua vẫn làm con trỏ tiến lên; các bộ đếm
`exported`/`exportedTotal` của trình chạy hiện có đếm các hàng nguồn đã xử lý, bao gồm cả các hàng
bị lọc, thay vì số span được chấp nhận. Việc lọc được thực hiện trong tiến trình con, không thay đổi
giao ước IPC/con trỏ của nó.

Việc xác thực URL sử dụng hàm trợ giúp `parseAndValidateNonMetadataUrl` không phụ thuộc cơ sở dữ liệu từ
`src/shared/network/outboundUrlGuard.ts`: chính sách `block-metadata`. Chính sách này có cùng
các kiểm tra vô điều kiện đối với metadata/giao thức/thông tin xác thực nhúng như trình xác thực webhook khi
cho phép URL riêng tư, nhưng chủ động cho phép các đích localhost/LAN mà không cần ghi đè
bằng cờ tính năng toàn cục. Điều này cho phép các endpoint Langfuse, Phoenix, Tempo và Collector
tự lưu trữ, bao gồm cả các endpoint HTTP riêng tư. Các máy chủ metadata đám mây luôn bị chặn.
Không thực hiện theo chuyển hướng, nên collector không thể chuyển hướng thông tin xác thực sang máy chủ khác.
Giống như cơ chế bảo vệ URL dựa trên chuỗi hiện có, cơ chế này không cố định kết quả phân giải DNS; chỉ cấu hình
các máy chủ do người vận hành kiểm soát. Ưu tiên HTTPS bất cứ khi nào endpoint không nằm trên mạng đáng tin cậy.

### Payload và việc phân phối

JSON OTLP/HTTP (`ExportTraceServiceRequest`, `Content-Type: application/json`) mang một
span CLIENT cho mỗi hàng được cho phép, được đặt tên theo đường dẫn yêu cầu chính xác của hàng đó. Việc đặt tên theo đường dẫn giúp phân biệt
Chat Completions, Responses và Messages mà không nhúng dữ liệu mô hình hay danh tính vào
tên span. Các thuộc tính tài nguyên bao gồm `service.name` và `service.version` của gói.

Trình ghi nhật ký lần thử chat thông thường (`open-sse/handlers/chatCore/attemptLogging.ts`) ghi
`duration = Date.now() - startTime` khi hoàn tất và không cung cấp dấu thời gian;
`saveCallLogOperation` trong `src/lib/usage/callLogs.ts` mặc định đặt dấu thời gian là thời điểm ghi
(hoàn tất). Vì vậy, quá trình xuất đặt thời điểm kết thúc = dấu thời gian của hàng và thời điểm bắt đầu = thời điểm kết thúc − thời lượng
(mili giây, được chuyển đổi sang nano giây dạng thập phân). Các dấu thời gian quá khứ do bên gọi cung cấp
cũng được giữ nguyên làm thời điểm kết thúc; không có thông tin phân biệt thời điểm bắt đầu/hoàn tất cho từng hàng.
Thời lượng null được chuyển thành không. Dấu thời gian không hợp lệ/bị thiếu khiến cả lô thất bại thay vì tạo ra
các span không xác định. `ttftMs` có thể là null và được ánh xạ sang `omniroute.ttft_ms`.

Các thuộc tính bao gồm `gen_ai.operation.name="chat"`, nhà cung cấp, mô hình được yêu cầu/mô hình phản hồi,
token đầu vào/đầu ra, token đọc bộ nhớ đệm/tạo bộ nhớ đệm/suy luận không bắt buộc, trạng thái HTTP,
combo, nguồn bộ nhớ đệm, thẻ phiên và ID tương quan. Các giá trị OTLP kiểu số nguyên và dấu thời gian
là chuỗi thập phân; chuỗi, boolean và số có phần thập phân sử dụng các biến thể giá trị OTLP gốc
tương ứng. Span lỗi có trạng thái ERROR và thông báo trạng thái đã được làm sạch. Bản ghi chuẩn
không có URL máy chủ thượng nguồn, vì vậy `server.address` được lược bỏ thay vì xác định sai
collector là máy chủ mô hình. Chi phí không được xuất.

Chỉ `includeBodies=true` mới nạp nội dung. Với `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` chứa JSON phần thân yêu cầu/phản hồi
đã được làm sạch như được lưu bởi OmniRoute (được chuẩn hóa khi có thể phân tích cú pháp), không phải mảng
thông điệp semconv đã được định dạng lại. Phần thân bị cắt ngắn/không phải JSON vẫn giữ dạng văn bản thô. Với `langfuseMapping=true`,
phần thân chỉ được xuất dưới dạng `langfuse.observation.input` / `langfuse.observation.output`;
các thuộc tính `gen_ai.*.messages` được lược bỏ để mỗi phần thân chỉ được gửi một lần. Cả hai chế độ
đều kế thừa `maxBodyBytes` từ luồng nạp nội dung hiện có;
`omniroute.bodies_truncated=true` đánh dấu việc cắt ngắn.
Đích này không bổ sung bản chụp pipeline hay thao tác đọc hiện vật chưa được làm sạch nào;
tính năng thu thập header yêu cầu tùy chọn sử dụng bản chụp máy khách đã nạp hiện có được mô tả bên dưới.
Hãy sử dụng chu kỳ ở mức phút như `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` khi xuất
phần thân, thay vì để tích tụ lượng tồn đọng theo giờ.

### Header yêu cầu của máy khách tùy chọn

Việc thu thập header **mặc định bị tắt**. Đặt `requestHeaderAllowlist` trong cấu hình đích
và bật **Xuất prompt và phản hồi** (`includeBodies: true` trên đích).
Danh sách cho phép chấp nhận một mảng qua API hoặc một vùng nhập văn bản chứa các tên được phân tách bằng ký tự xuống dòng/dấu phẩy:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Tên được so khớp chính xác và không phân biệt chữ hoa chữ thường, trừ khi một dấu `*` duy nhất ở cuối chọn một
tiền tố tên header không rỗng. Dấu `*` đứng riêng, ký tự đại diện nằm giữa và tên header HTTP không hợp lệ đều bị từ chối.
Có tối đa 64 bộ chọn, mỗi bộ có tên/tiền tố dài tối đa 256 byte ASCII.
Thiết lập này tách biệt với `headers`, vốn dùng để xác thực trình xuất với bộ thu thập.

Việc thu thập chỉ đọc `pipeline_client_request`, được điền từ
`clientRawRequest` (hoặc `clientRequest` kiểu cũ) của pipeline chi tiết đã lưu. Cơ chế này không bao giờ dùng header yêu cầu của nhà cung cấp làm nguồn dự phòng.
Tính năng ghi nhật ký pipeline chi tiết phải được bật tại thời điểm yêu cầu được ghi lại. Khi
`includeBodies` bị tắt, hoặc JSON ảnh chụp trạng thái phía máy khách bị thiếu, hỏng hoặc cắt bớt, sẽ không có thuộc tính
header nào được xuất. Tăng `maxBodyBytes` có thể tránh việc ảnh chụp trạng thái bị cắt bớt khi xuất;
nhưng không thể khôi phục chi tiết chưa từng được lưu. Ảnh chụp trạng thái lớn hơn 1 MiB hoặc chứa hơn
256 mục header sẽ bị bỏ qua. Việc xuất lời nhắc/phản hồi hiện có vẫn được bật song song với
việc thu thập header; danh sách cho phép không cung cấp chế độ nạp dữ liệu chỉ dành cho header.

Các giá trị được chọn trở thành mảng chuỗi OTLP `http.request.header.<full lowercase header name>`,
ngay cả khi chỉ có một chuỗi. Ví dụ, `X-OmniRoute-Meta-Team: example-team` trở thành
`http.request.header.x-omniroute-meta-team` với
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Toàn bộ tiền tố được giữ nguyên: đây là các header thông thường, không có phân tích trường nghiệp vụ hay
chuyển đổi sang `omniroute.metadata.*` / siêu dữ liệu Langfuse. `langfuseMapping` không thay đổi ngữ nghĩa
của header. Một `User-Agent` được chọn có một giá trị duy nhất cũng đặt thuộc tính vô hướng tiêu chuẩn
`user_agent.original`. Dấu phẩy trong một giá trị không được dùng để tách giá trị đó. Các biến thể chữ hoa chữ thường được gộp theo thứ tự
mục đã lưu; bất kỳ biến thể không hợp lệ nào cũng khiến toàn bộ header đó bị loại bỏ. Các thuộc tính được sắp xếp theo tên viết thường.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, các header khóa API, tên chứa
dấu hiệu auth/token/secret/password/credential và thông tin xác thực nội bộ của cổng kết nối luôn
bị loại trừ, ngay cả khi được chọn hoặc đã được che một phần trong bộ nhớ lưu trữ. Các mẫu thông tin xác thực đã biết sử dụng lại
bộ phát hiện thông tin xác thực dùng chung; các dấu đánh dấu che dữ liệu bị loại bỏ, không được xuất dưới dạng giá trị an toàn.
Chỉ chấp nhận chuỗi và mảng chuỗi không rỗng; không ép kiểu số hoặc đối tượng.
Tên không hợp lệ, khóa prototype, ký tự điều khiển (ngoại trừ tab ngang) và Unicode sai định dạng
đều bị bỏ qua mà không làm lô thất bại hoặc đưa nội dung của chúng vào lỗi.

Mỗi span thu thập tối đa 32 header, 16 giá trị cho mỗi header, 4096 byte UTF-8 cho mỗi giá trị,
và tổng cộng 16384 byte UTF-8 cho tên và giá trị của các header được thu thập. Các header quá lớn/không hợp lệ
bị loại bỏ toàn bộ, không bị cắt bớt. Việc lựa chọn là quyết định về quyền riêng tư của người vận hành: những tên có vẻ an toàn
vẫn có thể chứa dữ liệu cá nhân, và các giới hạn/bộ phát hiện này không phải là công cụ làm sạch PII tổng quát.

### Giới hạn gửi dữ liệu

Mỗi yêu cầu bị giới hạn ở 500 span và 4 MiB JSON UTF-8, bao gồm cả phần bao ngoài.
Mọi span được phép đều được kiểm tra kích thước trước yêu cầu đầu tiên của một lô con trỏ. Nếu một
span riêng lẻ vượt giới hạn, không phần nào của lô đó được gửi và thao tác sẽ thất bại kèm hướng dẫn giảm
`maxBodyBytes`; span đó không bị âm thầm loại bỏ. Bước kiểm tra trước chỉ giữ lại tham chiếu bản ghi và
số byte, loại bỏ từng span/JSON tạm thời; các span được dựng lại cho các phần có kích thước giới hạn
thay vì giữ thêm một bản sao đã tuần tự hóa của lô. HTTP 408/429/5xx, lỗi mạng và hết thời gian chờ được thử tối đa
ba lần, với thời gian chờ tăng theo cấp số nhân là 250/500 ms. `Retry-After` ở dạng giây hoặc ngày giờ HTTP
có thể kéo dài thời gian chờ lên tối đa 5 giây. Các mã trạng thái khác khiến thao tác thất bại ngay lập tức. Việc OTLP 2xx từ chối một phần cũng phát sinh lỗi thay vì
xác nhận một span đã bị mất; chấp nhận phản hồi xác nhận rỗng hoặc JSON hợp lệ, với
giới hạn đọc phản hồi là 64 KiB.

Lỗi chỉ chứa các thông tin do trình xuất quản lý: trạng thái HTTP, loại thử lại, số lần thử và số span
đã gửi, hoặc thông báo cố định về lỗi xác nhận/lỗi mạng. Nội dung phản hồi của bộ thu thập,
số lượng thành công một phần và header phản hồi không bao giờ được sao chép vào lỗi, nhật ký hoặc
bảng điều khiển. Một lô thất bại hoặc chỉ được chấp nhận một phần sẽ không được xác nhận: đích đến hiển thị
Đang lỗi với trạng thái đó, con trỏ giữ nguyên ở lô được xác nhận gần nhất, và lần chạy tiếp theo
gửi lại cùng các hàng đó. Các mã trạng thái lỗi vĩnh viễn tiếp tục gây thất bại cho đến khi bộ thu thập hoặc cấu hình
được sửa. Hãy dùng nhật ký của chính bộ thu thập để xem chi tiết phản hồi. Các bản tóm tắt lỗi trong nhật ký cuộc gọi vẫn giữ
cơ chế che dữ liệu riêng.
`prepare()` không cấp phát tài nguyên nào; Kiểm tra gửi POST chính xác `{"resourceSpans":[]}` và báo cáo
trạng thái HTTP mà không ghi span nhật ký cuộc gọi.

ID trace và ID span là 32/16 chữ số thập lục phân đầu tiên của SHA-256 tính trên
`"omniroute.trace\\0" + callLogId` và `"omniroute.span\\0" + callLogId`. Các lần gửi lại mang
ID giống hệt nhau. Điều này không bảo đảm loại bỏ trùng lặp: một số hệ thống phía sau, bao gồm cơ chế tiếp nhận của Langfuse
v4, không loại bỏ các span có cùng ID. Sự cố hoặc lỗi ở một phần dữ liệu có thể
khiến tối đa một lô con trỏ chưa được xác nhận được gửi lại; toàn bộ lô đó có thể bị trùng lặp,
chứ không chỉ phần HTTP cuối cùng. Hãy cân nhắc sự đánh đổi này khi chọn kích thước lô con trỏ.

### Ví dụ về Langfuse

Cấu hình các trường sau cho một phiên bản Langfuse tự lưu trữ:

```json
{
  "endpoint": "https://langfuse.example.com/api/public/otel/v1/traces",
  "headers": "Authorization: Basic <base64-of-public-key:secret-key>",
  "serviceName": "omniroute",
  "langfuseMapping": true,
  "identity": "pseudonymous",
  "environment": "production"
}
```

Tạo giá trị Authorization cục bộ bằng cách mã hóa Base64 chuỗi nguyên văn `public-key:secret-key`
(ví dụ với `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Không dán thông tin xác thực thật vào nhật ký, ảnh chụp màn hình hoặc báo cáo vấn đề. Cơ chế ánh xạ tự động
đặt `x-langfuse-ingestion-version: 4`; Authorization vẫn được cung cấp trong `headers`.
Cả header và giá trị salt định danh được tạo đều sử dụng cơ chế trường bí mật được mã hóa
và giá trị giữ chỗ API hiện có; bắt buộc phải có `STORAGE_ENCRYPTION_KEY`.

Ánh xạ bổ sung loại/mô hình sinh, chi tiết sử dụng dạng JSON (đầu vào/đầu ra/tổng và các
khóa bộ nhớ đệm hiện có), ảnh chụp nhanh đầu vào/đầu ra dạng JSON, mức ERROR/DEFAULT, thông báo trạng thái đã được làm sạch,
tên dấu vết, id phiên, môi trường tùy chọn và
`langfuse.observation.metadata.<key>` có thể lọc cho nhà cung cấp, mô hình được yêu cầu, đường dẫn, tổ hợp, nguồn bộ nhớ
đệm và trạng thái. `langfuse.observation.completion_start_time` có định dạng ISO 8601, bằng
thời điểm bắt đầu + TTFT chỉ khi biết TTFT và giá trị này nằm trong khoảng thời lượng. Không gửi thuộc tính chi phí nào.

Các chế độ định danh áp dụng cho `langfuse.user.id`:

- `pseudonymous` (mặc định): HMAC-SHA256 của id nội bộ của khóa API với một salt ngẫu nhiên
  32 byte riêng cho từng đích. Salt được tạo khi khởi tạo nếu chưa có, được mã hóa
  dưới dạng `identitySalt`, không bao giờ được trả về và được giữ lại khi chỉnh sửa. Id khóa thô không bao giờ
  được đưa vào thuộc tính span. Việc tạo lại/luân chuyển salt của một đích sẽ làm thay đổi các định danh.
- `keyName`: tên khóa API đã cấu hình, cố ý tiết lộ nhãn đó do người vận hành đặt.
- `none`: không có id người dùng. Các thẻ phiên vẫn được xuất khi có; những chế độ này không
  ẩn danh hóa nội dung lời nhắc tùy ý hoặc các nhãn phiên/tương quan do người vận hành cung cấp.

### Bắt đầu mà không nạp bù dữ liệu

Chỉ khi tạo mới, hãy bật **Bắt đầu từ vị trí hiện tại (bỏ qua nhật ký hiện có)** hoặc truyền
`startFromCurrentPosition: true` ở cấp cao nhất của payload API tạo mới. Tùy chọn này khởi tạo
`cursor_row_id` thành rowid lớn nhất hiện tại của nhật ký cuộc gọi còn được lưu giữ bằng các hàm hỗ trợ con trỏ
hiện có, không cần di chuyển dữ liệu. Giá trị mặc định là false (con trỏ 0 và nạp bù lịch sử còn được lưu giữ).
Đây không phải là thiết lập đặt lại con trỏ khi cập nhật.

Phần bổ sung `ttftMs` dùng chung cũng thêm cột `ttft_ms` cho phép null vào bộ ánh xạ BigQuery
và lược đồ bảng mới: kiểm thử lược đồ yêu cầu mọi trường bản ghi chuẩn tắc đều phải có một
cột tương ứng. Các bảng hiện có tiếp tục xuất dữ liệu như trước: `prepare()` đọc lược đồ bảng và
chỉ bỏ qua `ttft_ms` khi không có cột đó. Thêm cột INT64 cho phép null để nhận TTFT
ở lần chạy tiếp theo, hoặc sử dụng bảng mới. Không cần PATCH, thay đổi lược đồ tự động hay
quyền bổ sung; tất cả các trường khác của hàng vẫn được kiểm tra lược đồ nghiêm ngặt.

---

## 6. Thêm đích đến

1. Tạo `src/lib/logExport/destinations/<name>.ts` xuất một `LogExportDestinationType`:
   một `configSchema` của Zod, một mảng mô tả `fields` cho giao diện người dùng, `secretFields`, và một
   `createClient(config)` trả về `test()` / `prepare()` / `send(records)`.
2. Thêm đích đến đó vào mảng `DESTINATIONS` trong `src/lib/logExport/registry.ts`.
3. Viết các bài kiểm thử trong `tests/unit/`.

Đó là toàn bộ thay đổi: cơ chế lưu trữ bền vững, tác vụ cron, lớp REST, cơ chế mã hóa thông tin bí mật và
biểu mẫu trên bảng điều khiển đều đọc registry.

Hai quy tắc dành cho đích đến mới:

- `send()` **phải ném ngoại lệ** khi xảy ra lỗi một phần. Hoàn tất thành công có nghĩa là "đích đến đã có các hàng này",
  và con trỏ sẽ vĩnh viễn di chuyển qua chúng.
- Đích đến nhận URL do người dùng cung cấp phải xác thực URL đó qua
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) trước khi gửi yêu cầu,
  giống như cách webhook thực hiện. BigQuery không cần điều này: các máy chủ của nó là hằng số.

---

## 7. Vận hành

- **Bảng điều khiển**: Tích hợp → Xuất nhật ký. Thêm đích đến, chạy **Kiểm tra** để kiểm tra thông tin xác thực
  mà không ghi hàng nào, sau đó bật đích đến.
- **Dữ liệu tồn đọng**: mỗi thẻ đích đến hiển thị các hàng đang chờ và con trỏ; `GET
/api/log-export/status` trả về các số liệu tương tự cùng 20 lần chạy tác vụ gần nhất.
- **Một đích đến bị lỗi không khiến các đích đến khác bị lỗi** — bản tóm tắt lần chạy ghi lại trạng thái của từng đích đến
  trong `last_status` / `last_error`, còn lịch sử chạy tác vụ lưu kết quả tổng hợp.
- **Xóa đích đến sẽ xóa cả con trỏ của nó.** Khi thêm lại, quá trình sẽ bắt đầu từ nhật ký cuộc gọi cũ nhất còn được lưu giữ,
  do đó gửi lại các hàng mà đích đến có thể đã có. Trên BigQuery, `insertId`
  của từng hàng chỉ xử lý được việc trùng lặp này trong khoảng thời gian khử trùng lặp riêng của BigQuery, vì vậy nên tắt
  đích đến thay vì xóa.
