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

## 4. Đích BigQuery

Các khóa cấu hình (`type: "bigquery"`):

| Key                  | Notes                                                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `projectId`          | Dự án GCP chứa dataset                                                                                              |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                     |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                     |
| `location`           | Chỉ được sử dụng khi dataset cần được tạo (mặc định là `EU`)                                                        |
| `serviceAccountJson` | Khóa tài khoản dịch vụ. Bí mật: được mã hóa khi lưu trữ, không bao giờ được trả về                                  |
| `autoCreate`         | Tạo dataset/table còn thiếu; có điều kiện thêm các cột usage-evidence có thể nhận giá trị null (mặc định là `true`) |

Tài khoản dịch vụ cần có quyền `bigquery.tables.updateData` trên table đích, cùng với
`bigquery.datasets.create` / `bigquery.tables.create` khi `autoCreate` được bật.
Việc cập nhật một table hiện có để thêm hai trường usage-evidence có thể nhận giá trị null cũng yêu cầu
`bigquery.tables.update`. Quyền bị thiếu sẽ khiến quá trình xuất thất bại mà không làm tiến con trỏ.

Một batch được cấu hình là một đơn vị **con trỏ**, không phải đơn vị HTTP: `send()` chia batch thành các lệnh gọi
insertAll, mỗi lệnh tối đa 500 hàng, vì vậy `batch_size` lớn không thể làm vượt giới hạn yêu cầu 10 MB của BigQuery.
Các trạng thái tạm thời (408/429/500/502/503/504) được thử lại tối đa ba lần với
thời gian chờ tăng theo cấp số nhân, sử dụng lại cùng các insertIds; lỗi xác thực và lỗi schema sẽ ném lỗi ngay ở lần thử đầu tiên
thay vì tiêu tốn lượt chạy.

Một table vừa được tạo chưa hiển thị ngay với endpoint streaming, endpoint này trả về
404 trong vài giây. 404 đó sẽ được thử lại, nhưng **chỉ khi lượt chạy này đã tạo table** —
một table thực sự bị thiếu vẫn sẽ thất bại ngay. Lưu ý rằng việc tạo lại table dưới một tên
vừa bị xóa gần đây khiến BigQuery từ chối các thao tác chèn streaming trong vài phút; đây là
đặc tính của việc xóa rồi tạo lại, vì vậy nên ưu tiên tên table mới thay vì xóa và thêm lại table cũ.

**Lỗi một phần được trả về dưới dạng HTTP 200 với `insertErrors[]` không rỗng.** Trường hợp này được xử lý như
một lỗi và ném exception, nhờ đó ngăn con trỏ tiến vượt qua các hàng mà BigQuery chưa chấp nhận;
`tests/unit/log-export-bigquery.test.ts` cố định hành vi này.

Lớp truyền tải là REST thuần túy — một assertion RS256 tự ký được trao đổi lấy access token tại
`https://oauth2.googleapis.com/token`, sau đó các hàng được gửi đến `tabledata.insertAll`. Không có Google SDK nào được
đưa vào. Access token được lưu trong bộ nhớ tiến trình theo từng cặp (tài khoản dịch vụ, scope).

Table được tạo sẽ chứa một cột cho mỗi trường của tab Logs cùng với `exported_at`, và được bố trí để
phù hợp với cách các nhật ký cuộc gọi thực sự được truy vấn:

- **Phân vùng theo ngày dựa trên `timestamp`**, vì vậy truy vấn giới hạn theo ngày chỉ quét các ngày đó.
- **Phân cụm theo `api_key_name`, `provider`, `model`, `status`** (theo thứ tự này), nhờ đó việc lọc theo
  người đã chạy, nơi yêu cầu được chuyển đến hoặc yêu cầu có thất bại hay không sẽ loại bỏ các khối bên trong mỗi phân vùng. BigQuery
  cho phép tối đa bốn cột phân cụm và thứ tự có ý nghĩa: bộ lọc chỉ trên `api_key_name` sẽ
  loại bỏ các khối, còn bộ lọc chỉ trên `status` thì không.
- **Lưu giữ phân vùng tùy chọn** thông qua `partitionExpirationDays` (0 là giữ lại mọi thứ), được áp dụng
  khi table được tạo.

Cả hai thiết lập đều được áp dụng tại thời điểm tạo. Table hiện có sẽ giữ nguyên bố cục hiện tại, vì vậy
hãy trỏ đích đến một table id mới nếu muốn áp dụng các thiết lập này.

`tests/unit/log-export-bigquery.test.ts` đảm bảo mapper và schema của table luôn đồng bộ,
vì vậy một cột nhật ký cuộc gọi mới không thể bị âm thầm loại bỏ trong quá trình xuất.

Batch được chia theo **cả số lượng hàng và số byte sau khi tuần tự hóa**. Chỉ dựa vào số lượng hàng là không đủ
khi payload được xuất: 500 hàng chứa prompt có thể chiếm hàng chục megabyte, và insertAll
sẽ từ chối yêu cầu vượt quá 10 MB. Các phần được đóng ở mức 500 hàng hoặc 9 MB, tùy điều kiện nào đến trước.

---

## 5. Đích traces OTLP/HTTP

Cấu hình sử dụng `type: "otlp-http"`. Đây là hoạt động xuất dữ liệu theo lịch, có cursor, đối với
nhật ký cuộc gọi đã được lưu trữ, không phải bộ tiếp nhận các sự kiện định tuyến trực tiếp theo cơ chế
best-effort trong `open-sse/services/routing/otel.ts`. Nó không đọc hoặc thay đổi các biến môi trường,
bộ hẹn giờ hay bộ đệm của bộ tiếp nhận đó. Việc bật cả hai có thể tạo ra hai loại span độc lập;
sử dụng scope instrumentation `omniroute.log-export` để phân biệt các span nhật ký cuộc gọi này.

| Key                      | Mặc định / mục đích                                                             |
| ------------------------ | ------------------------------------------------------------------------------- |
| `endpoint`               | URL traces HTTP(S) đầy đủ bắt buộc; không tự động thêm hậu tố `/v1/traces`      |
| `headers`                | Các dòng `Name: value` hoặc đối tượng JSON gồm các chuỗi, tùy chọn; được mã hóa |
| `requestHeaderAllowlist` | Rỗng (tắt); tên/prefix của header client cần thu thập làm thuộc tính span       |
| `serviceName`            | `omniroute`; resource `service.name`                                            |
| `langfuseMapping`        | `false`; thêm các thuộc tính generation/session/user của Langfuse               |
| `identity`               | `pseudonymous`, `keyName` hoặc `none`                                           |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                         |
| `timeoutMs`              | `30000` cho mỗi lần thử HTTP                                                    |
| `environment`            | Không đặt; `langfuse.environment` tùy chọn                                      |

Dashboard chung hiển thị các trường này. `paths` chấp nhận một mảng API hoặc textarea
với các path chính xác được phân tách bằng dòng mới/dấu phẩy. Embeddings, rerank và các
path khác sẽ bị bỏ qua trừ khi được cho phép rõ ràng. Các dòng bị bỏ qua vẫn làm tăng
cursor; các bộ đếm `exported`/`exportedTotal` của runner hiện tại đếm số dòng nguồn đã
xử lý, bao gồm cả các dòng bị lọc, thay vì số span được chấp nhận. Việc lọc được thực hiện
trong child mà không thay đổi contract IPC/cursor của nó.

Việc xác thực URL sử dụng helper `parseAndValidateNonMetadataUrl` không phụ thuộc DB từ
`src/shared/network/outboundUrlGuard.ts`: chính sách `block-metadata`. Helper này có cùng
các kiểm tra metadata/protocol/credential nhúng luôn được thực hiện như validator webhook,
với các URL private được cho phép, nhưng chủ ý cho phép các đích localhost/LAN mà không cần
ghi đè feature flag toàn cục. Điều này cho phép các endpoint Langfuse, Phoenix, Tempo và
Collector tự lưu trữ, bao gồm cả các endpoint HTTP private. Các host cloud-metadata luôn bị
chặn. Redirect không được theo dõi, vì vậy collector không thể chuyển hướng credential đến
một host khác. Giống như bộ bảo vệ URL theo lexical hiện tại, cơ chế này không cố định
việc phân giải DNS; chỉ cấu hình các host do operator kiểm soát. Ưu tiên HTTPS bất cứ khi
nào endpoint không nằm trên mạng đáng tin cậy.

### Payload và việc phân phối

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) mang một
CLIENT span cho mỗi dòng được cho phép, được đặt tên theo path request chính xác. Việc đặt
tên theo path phân biệt Chat Completions, Responses và Messages mà không nhúng dữ liệu model
hoặc identity vào tên span. Các thuộc tính resource bao gồm `service.name` và
`service.version` của package.

Bộ ghi nhật ký lần thử chat thông thường (`open-sse/handlers/chatCore/attemptLogging.ts`) ghi
`duration = Date.now() - startTime` khi hoàn tất và không cung cấp timestamp;
`saveCallLogOperation` trong `src/lib/usage/callLogs.ts` mặc định timestamp là thời điểm ghi
(hoàn tất). Vì vậy, quá trình xuất đặt end = timestamp của dòng và start = end − duration
(mili giây, được chuyển đổi thành nanosecond thập phân). Các timestamp lịch sử do caller cung
cấp cũng được giữ làm thời điểm end; không có cơ chế phân biệt start/completion cho từng dòng.
Duration null trở thành zero. Timestamp không hợp lệ/thiếu sẽ làm batch thất bại thay vì tạo
các span không xác định. `ttftMs` có thể là null và được ánh xạ thành `omniroute.ttft_ms`.

Các thuộc tính bao gồm `gen_ai.operation.name="chat"`, provider, model được yêu cầu/model
phản hồi, token input/output, token cache-read/cache-creation/reasoning tùy chọn, HTTP status,
combo, nguồn cache, session tag và correlation id. Các giá trị OTLP dạng integer và timestamp
là chuỗi thập phân; chuỗi, boolean và số phân số sử dụng các biến thể giá trị OTLP native
tương ứng. Span lỗi có status ERROR và thông báo status đã được làm sạch. Bản ghi chuẩn
không có URL host upstream, vì vậy `server.address` được bỏ qua thay vì xác định sai
collector là model server. Cost không được xuất.

Chỉ `includeBodies=true` mới hydrate nội dung. Khi `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` chứa JSON body request/response đã được
làm sạch như được OmniRoute lưu trữ (được canonicalize khi có thể parse), không phải một
mảng messages semconv đã được định hình lại. Body bị cắt/không phải JSON vẫn giữ dạng văn bản
thô. Khi `langfuseMapping=true`, body chỉ được phát ra dưới dạng
`langfuse.observation.input` / `langfuse.observation.output`; các thuộc tính
`gen_ai.*.messages` được bỏ qua để mỗi body chỉ được gửi một lần. Cả hai chế độ đều kế thừa
`maxBodyBytes` từ đường dẫn hydration hiện có;
`omniroute.bodies_truncated=true` đánh dấu việc cắt bớt.
Đích này không bổ sung snapshot pipeline hoặc việc đọc artifact chưa được làm sạch nào;
việc thu thập header request tùy chọn sử dụng snapshot client đã hydrate hiện có được mô tả
bên dưới. Sử dụng chu kỳ theo phút, chẳng hạn như `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`,
khi xuất body, thay vì tích lũy backlog hàng giờ.

### Header request client tùy chọn

Việc thu thập header **được tắt theo mặc định**. Đặt `requestHeaderAllowlist` trong cấu hình
destination và bật **Export prompts and responses** (`includeBodies: true` trên destination).
Allowlist chấp nhận một mảng API hoặc textarea với các tên được phân tách bằng dòng mới/dấu phẩy:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Tên được so khớp không phân biệt chữ hoa chữ thường và phải khớp chính xác, trừ khi một dấu `*` duy nhất ở cuối chọn tiền tố không rỗng của tên header. Dấu `*` đứng riêng, ký tự đại diện được chèn giữa chuỗi và tên header HTTP không hợp lệ đều bị từ chối.
Có tối đa 64 bộ chọn, mỗi bộ chọn có tên/tiền tố dài tối đa 256 byte ASCII.
Thiết lập này tách biệt với `headers`, vốn dùng để xác thực exporter với collector.

Capture chỉ đọc `pipeline_client_request`, được điền từ `clientRawRequest` (hoặc `clientRequest` trong phiên bản cũ) của pipeline chi tiết đã lưu. Nó không bao giờ dự phòng sang các header request của provider.
Tính năng ghi log pipeline chi tiết phải được bật tại thời điểm request được ghi nhận. Khi `includeBodies` bị tắt, hoặc JSON client-snapshot bị thiếu, hỏng hay bị cắt bớt, không có thuộc tính header nào được phát ra. Việc tăng `maxBodyBytes` có thể tránh snapshot bị cắt tại thời điểm export;
nhưng không thể khôi phục chi tiết chưa từng được lưu. Snapshot lớn hơn 1 MiB hoặc chứa hơn
256 mục header sẽ bị bỏ qua. Tính năng export prompt/response hiện có vẫn được bật cùng với việc capture header; allowlist không cung cấp chế độ hydrate chỉ dành cho header.

Các giá trị được chọn trở thành các mảng chuỗi OTLP `http.request.header.<full lowercase header name>`,
kể cả khi chỉ có một chuỗi. Ví dụ, `X-OmniRoute-Meta-Team: example-team` trở thành
`http.request.header.x-omniroute-meta-team` với
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Toàn bộ tiền tố được giữ nguyên: đây là các header thông thường, không có hoạt động phân tích trường nghiệp vụ hay chuyển đổi sang `omniroute.metadata.*` / metadata của Langfuse. `langfuseMapping` không thay đổi ngữ nghĩa của header. Một `User-Agent` được chọn có một giá trị cũng thiết lập scalar chuẩn
`user_agent.original`. Dấu phẩy bên trong một giá trị không bị tách. Các biến thể chữ hoa chữ thường được hợp nhất theo thứ tự mục đã lưu; bất kỳ biến thể nào không hợp lệ cũng khiến toàn bộ header đó bị loại bỏ. Các thuộc tính được sắp xếp theo tên viết thường.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, các header API-key, tên chứa các dấu hiệu
auth/token/secret/password/credential và thông tin xác thực nội bộ của gateway luôn bị loại trừ, ngay cả khi được chọn hoặc bị che một phần trong bộ nhớ lưu trữ. Các mẫu thông tin xác thực đã biết sử dụng lại bộ phát hiện thông tin xác thực dùng chung; các dấu hiệu che dữ liệu bị loại bỏ, không được export dưới dạng giá trị an toàn.
Chỉ chấp nhận chuỗi và mảng chuỗi không rỗng; không ép kiểu số hoặc object. Tên không hợp lệ, khóa prototype, ký tự điều khiển (ngoại trừ tab ngang) và Unicode không hợp lệ đều bị bỏ qua mà không làm hỏng batch hoặc phản ánh nội dung của chúng trong lỗi.

Mỗi span capture tối đa 32 header, 16 giá trị cho mỗi header, 4096 byte UTF-8 cho mỗi giá trị
và tổng cộng 16384 byte UTF-8 cho tên và giá trị header được capture. Header quá lớn/không hợp lệ
bị loại bỏ toàn bộ, không bị cắt bớt. Việc lựa chọn là quyết định về quyền riêng tư của operator: các tên trông có vẻ an toàn vẫn có thể chứa dữ liệu cá nhân, và các giới hạn/bộ phát hiện này không phải là công cụ xóa PII tổng quát.

### Giới hạn phân phối

Request được giới hạn ở 500 span và 4 MiB JSON UTF-8, bao gồm cả envelope.
Mọi span được cho phép đều được kiểm tra kích thước trước request đầu tiên của một batch cursor. Một
span riêng lẻ lớn hơn giới hạn sẽ khiến không phần nào của batch đó được gửi và thao tác thất bại với hướng dẫn giảm
`maxBodyBytes`; span đó không bị âm thầm loại bỏ. Preflight chỉ giữ lại các tham chiếu bản ghi và số byte,
loại bỏ từng span/JSON tạm thời; các span được dựng lại cho những chunk có kích thước giới hạn
thay vì giữ một bản sao đã tuần tự hóa thứ hai của batch. HTTP 408/429/5xx, lỗi mạng và timeout được thử lại tối đa
ba lần, với thời gian chờ lũy thừa 250/500 ms. `Retry-After` tính theo giây hoặc ngày HTTP
có thể kéo dài thời gian chờ lên tối đa 5 giây. Các status khác sẽ thất bại ngay lập tức. Việc từ chối một phần OTLP 2xx cũng ném lỗi thay vì
xác nhận một span đã mất; phản hồi xác nhận JSON rỗng hoặc hợp lệ được chấp nhận, với
giới hạn đọc phản hồi 64 KiB.

Lỗi chỉ chứa các thông tin do exporter sở hữu: status HTTP, lớp retry, số lần thử và số span đã gửi,
hoặc nội dung cố định về lỗi xác nhận/mạng. Nội dung body phản hồi của collector,
số lượng thành công một phần và response header không bao giờ được sao chép vào lỗi,
log hoặc dashboard. Batch thất bại hoặc chỉ được chấp nhận một phần sẽ không được xác nhận: đích đến hiển thị trạng thái Failing cùng status đó, cursor vẫn ở batch được xác nhận gần nhất và lần chạy tiếp theo sẽ gửi lại các hàng tương tự. Các status vĩnh viễn tiếp tục gây lỗi cho đến khi collector hoặc cấu hình được sửa. Hãy sử dụng log riêng của collector để xem chi tiết phản hồi. Các bản tóm tắt lỗi trong call-log vẫn giữ cơ chế che dữ liệu riêng.
`prepare()` không provision gì; Test chỉ post chính xác `{"resourceSpans":[]}` và báo cáo
status HTTP mà không ghi các span call-log.

Trace id và span id là 32/16 chữ số hex đầu tiên của SHA-256 trên
`"omniroute.trace\\0" + callLogId` và `"omniroute.span\\0" + callLogId`. Các lần gửi lại mang
id giống hệt nhau. Đây không phải là bảo đảm chống trùng lặp: một số backend, bao gồm việc ingest Langfuse
v4, không loại bỏ trùng lặp các span có cùng id. Sự cố hoặc lỗi một phần của chunk có thể
gửi lại tối đa một batch cursor chưa được xác nhận; toàn bộ batch đó có thể bị nhân đôi,
không chỉ chunk HTTP cuối cùng của nó. Hãy cân nhắc đánh đổi này khi chọn kích thước batch cursor.

### Ví dụ về Langfuse

Cấu hình các trường sau cho một instance Langfuse tự lưu trữ:

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

Xây dựng giá trị Authorization cục bộ dưới dạng Base64 của chuỗi literal `public-key:secret-key`
(ví dụ bằng `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Không dán thông tin xác thực thực vào log, ảnh chụp màn hình hoặc issue. Việc mapping tự động
thiết lập `x-langfuse-ingestion-version: 4`; Authorization vẫn được cung cấp trong `headers`.
Cả header và salt identity được tạo đều sử dụng cơ chế trường secret được mã hóa hiện có và API placeholder;
`STORAGE_ENCRYPTION_KEY` là bắt buộc.

Ánh xạ bổ sung loại/mô hình sinh, thông tin chi tiết về mức sử dụng JSON (đầu vào/đầu ra/tổng và các khóa
bộ nhớ đệm khả dụng), ảnh chụp nhanh đầu vào/đầu ra JSON, cấp độ ERROR/DEFAULT, thông báo trạng thái
đã loại bỏ thông tin nhạy cảm, tên trace, ID phiên, môi trường tùy chọn và
`langfuse.observation.metadata.<key>` có thể lọc cho nhà cung cấp, mô hình được yêu cầu, đường dẫn, combo, nguồn
bộ nhớ đệm và trạng thái. `langfuse.observation.completion_start_time` là thời gian ISO 8601 tại
thời điểm bắt đầu + TTFT chỉ khi TTFT đã biết và nằm trong khoảng thời lượng. Không có thuộc tính chi phí nào được gửi.

Các chế độ danh tính áp dụng cho `langfuse.user.id`:

- `pseudonymous` (mặc định): HMAC-SHA256 của ID nội bộ của khóa API với một salt 32 byte ngẫu nhiên
  cho mỗi đích. Salt được tạo khi khởi tạo nếu chưa tồn tại, được mã hóa dưới dạng
  `identitySalt`, không bao giờ được trả về và được giữ nguyên trong quá trình chỉnh sửa. ID khóa thô không bao giờ được
  đưa vào các thuộc tính span. Việc tạo lại/xoay vòng salt của một đích sẽ thay đổi danh tính.
- `keyName`: tên khóa API được cấu hình, cố ý để lộ nhãn do nhà vận hành đặt.
- `none`: không có user ID. Các thẻ phiên vẫn được xuất khi có; các chế độ này không
  ẩn danh nội dung prompt tùy ý hoặc các nhãn phiên/tương quan do nhà vận hành cung cấp.

### Bắt đầu mà không backfill

Chỉ khi tạo, hãy bật **Bắt đầu từ vị trí hiện tại (bỏ qua log hiện có)** hoặc truyền
`startFromCurrentPosition: true` ở cấp cao nhất của payload API tạo. Tùy chọn này khởi tạo
`cursor_row_id` bằng rowid tối đa hiện được giữ lại của call-log bằng các helper cursor hiện có,
mà không cần migration. Giá trị mặc định là false (cursor 0 và backfill lịch sử được giữ lại).
Đây không phải là tùy chọn đặt lại cursor khi cập nhật.

Việc bổ sung `ttftMs` dùng chung cũng thêm một cột nullable `ttft_ms` vào mapper BigQuery
và lược đồ bảng mới: bài kiểm thử lược đồ yêu cầu mọi trường bản ghi chuẩn đều có một cột. Các
bảng hiện có vẫn tiếp tục xuất không thay đổi: `prepare()` đọc lược đồ bảng và chỉ bỏ qua
`ttft_ms` khi cột đó không tồn tại. Hãy thêm cột INT64 nullable để nhận TTFT
trong lần chạy tiếp theo hoặc sử dụng bảng mới. Cột TTFT tùy chọn không kích hoạt cập nhật lược đồ. Các cột bằng chứng sử dụng
tuân theo quy trình tương thích có điều kiện, opt-in bên dưới; các trường hàng khác vẫn áp dụng
việc kiểm tra lược đồ nghiêm ngặt.

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

- **Bảng điều khiển**: Tích hợp → Xuất nhật ký. Thêm một đích đến, chạy **Kiểm tra** để xác minh thông tin xác thực
  mà không ghi các hàng, sau đó bật đích đến.
- **Tồn đọng**: mỗi thẻ đích đến hiển thị số hàng đang chờ xử lý và con trỏ; `GET
/api/log-export/status` trả về các số liệu tương tự cùng với 20 lần chạy công việc gần nhất.
- **Một đích đến bị lỗi không làm các đích đến khác thất bại** — bản tóm tắt lần chạy ghi lại trạng thái theo từng đích đến
  trong `last_status` / `last_error`, còn lịch sử lần chạy công việc lưu trạng thái tổng hợp.
- **Xóa một đích đến sẽ xóa con trỏ của đích đến đó.** Việc thêm lại sẽ bắt đầu từ nhật ký cuộc gọi được lưu giữ lâu nhất,
  khiến các hàng mà đích đến có thể đã lưu bị gửi lại. Trên BigQuery, `insertId` theo từng hàng chỉ xử lý được việc này trong
  khoảng thời gian khử trùng lặp riêng của BigQuery, vì vậy nên tắt đích đến thay vì xóa đích đến.

### Khả năng tương thích của lược đồ bằng chứng sử dụng

Các bảng BigQuery mới bao gồm `usage_evidence` có thể nhận giá trị null (STRING chứa JSON) và
`usage_estimated` (BOOL). Khi bật `autoCreate`, một bảng hiện có chỉ có thể nhận
các cột nullable còn thiếu này. Trình xuất giữ nguyên toàn bộ lược đồ hiện có, bao gồm siêu dữ liệu trường,
và gửi PATCH có điều kiện bằng etag được trả về. Một thay đổi lược đồ đồng thời sẽ khiến việc xuất thất bại thay vì ghi đè
lược đồ; lần chạy tiếp theo sẽ đọc lại bảng.

Khi tắt `autoCreate`, hãy tự thêm các cột này trước khi xuất các bản ghi
có bằng chứng sử dụng. Thiếu siêu dữ liệu lược đồ/etag hoặc cập nhật không thành công cũng ngăn các thao tác chèn có bằng chứng. Con trỏ xuất không tiến lên khi xảy ra lỗi đó và
bằng chứng không bao giờ bị loại bỏ âm thầm. Việc lưu giữ nhật ký cục bộ vẫn được áp dụng trong khi quá trình xuất bị chặn, vì vậy hãy giải quyết lỗi trước khi các hàng nguồn được lưu giữ hết hạn.
