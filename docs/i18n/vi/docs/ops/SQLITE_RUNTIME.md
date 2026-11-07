# SQLite Runtime Resolution (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute phân giải trình điều khiển SQLite khi khởi động thông qua chuỗi dự phòng gồm 5 bước:

1. **`better-sqlite3` đi kèm** (thông qua `dependencies` trong `package.json`)
   — nhanh nhất, sử dụng tệp nhị phân gốc, được cài đặt bởi `npm install` khi có sẵn các công cụ dựng.

2. **`better-sqlite3` được cài đặt trong thời gian chạy** (trong `~/.omniroute/runtime/`)
   — được cài đặt trì hoãn trong lần chạy đầu tiên **HOẶC** bởi `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Xác thực các byte magic của tệp `.node` gốc (ELF / Mach-O / PE) trước khi tải
   để bảo vệ khỏi các tệp nhị phân bị hỏng hoặc không đúng nền tảng.

3. **`node:sqlite`** (thư viện chuẩn của Node ≥22.5) — không cần dựng tệp nhị phân gốc; được dùng khi
   cả hai đường dẫn better-sqlite3 đều thất bại. Tập tính năng bị giới hạn.

4. **`sql.js`** (WASM) — phương án dự phòng cuối cùng. Hoạt động ở mọi nơi nhưng chậm hơn
   và ghi dữ liệu theo chu kỳ thay vì đồng bộ.

## Tại sao lại phức tạp như vậy?

- **Windows EBUSY**: `npm install -g omniroute@latest` có thể thất bại nếu
  `better_sqlite3.node` của phiên bản trước bị một tiến trình đang chạy khóa. Việc cài đặt trong thời gian chạy
  tại `~/.omniroute/runtime/` giúp tránh bộ nhớ đệm npm toàn cục.
- **Không có công cụ dựng**: Một số môi trường (Windows doanh nghiệp không có VS Build
  Tools, các image Docker tối giản) không thể biên dịch `better-sqlite3`. Trình cài đặt trong thời gian chạy
  phân giải một tệp nhị phân dựng sẵn từ registry npm; các trình điều khiển dự phòng
  đảm bảo OmniRoute vẫn có thể khởi động ngay cả khi việc đó thất bại.
- **Hệ thống cách ly mạng**: Nếu không thể truy cập registry npm, `node:sqlite`
  hoặc `sql.js` đảm bảo chức năng cơ bản.

## Xác thực byte magic

Trước khi tải tệp `.node` được cài đặt trong thời gian chạy, OmniRoute đọc 8
byte đầu tiên và đối chiếu với các giá trị magic đã biết của nền tảng:

| Nền tảng              | Byte (hex)    | Nhãn        |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

Nếu giá trị magic không khớp → tệp bị bỏ qua và quy trình dự phòng tiếp tục sang bước tiếp theo.

## Kiểm tra trình điều khiển đang hoạt động

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Điều khiển thủ công

```bash
# Bỏ qua bước khởi động sơ bộ sau khi cài đặt (để cài đặt CI nhanh)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Buộc cài đặt lại better-sqlite3 trong thời gian chạy
rm -rf ~/.omniroute/runtime
omniroute  # sẽ cài đặt lại trong lần khởi động tiếp theo

# Kiểm tra trình điều khiển nào đang hoạt động
omniroute config db-info  # (nếu lệnh CLI tồn tại)
```

## Chẩn đoán tình trạng đình trệ đồng bộ

Với `better-sqlite3`, hãy đặt `OMNIROUTE_SQLITE_SLOW_MS=200` trước khi khởi động để chủ động
bật tính năng đo thời gian của bộ điều hợp đồng bộ. Tính năng này mặc định bị tắt. Một thao tác hoàn tất mất
ít nhất số mili giây đó sẽ phát cảnh báo `[SQLITE-SLOW]`, tối đa một lần trong mỗi
mười giây cho mỗi bộ điều hợp. Cảnh báo chỉ chứa trình điều khiển, lớp thao tác
(`prepare`, `get`, `all`, `run`, `exec`, `pragma`, giao dịch hoặc bảo trì) và
số mili giây đã trôi qua: không có SQL, giá trị liên kết, hàng dữ liệu, đường dẫn hay nội dung ngoại lệ.

Đây là công cụ hỗ trợ chẩn đoán, không phải cơ chế hết thời gian chờ hay tối ưu hóa truy vấn. Nó không thể báo cáo
một thao tác không bao giờ trả về, phân biệt công việc CPU với thời gian chờ ổ đĩa, xác định
câu SQL chính xác hoặc quan sát các thao tác được thực hiện thông qua handle trình điều khiển thô.
Thời lượng sao lưu bất đồng bộ được chủ ý loại trừ; các trình điều khiển SQLite khác không được
đo đạc bởi tính năng tùy chọn này. Việc vô hiệu hóa biến sẽ khôi phục bộ điều hợp ban đầu
mà không có các lớp bao đo thời gian. Không có thay đổi nào đối với schema cơ sở dữ liệu hoặc cấu hình đã lưu.

Cảnh báo độ trễ `/healthz` báo cáo mức đỉnh của vòng lặp sự kiện kể từ mẫu trước,
không phải mức trung bình trong toàn bộ vòng đời. Hãy đối chiếu dấu thời gian của cảnh báo này với các cảnh báo thao tác chậm
và số liệu của máy chủ/hệ thống lưu trữ trước khi quy nguyên nhân đình trệ cho SQLite hoặc lỗi ổ đĩa.

## Tham khảo

Phần triển khai:

- `bin/cli/runtime/magicBytes.mjs` — các hàm trợ giúp xác thực byte magic của tệp nhị phân
- `bin/cli/runtime/sqliteRuntime.mjs` — bộ phân giải thời gian chạy 5 bước + trình cài đặt trì hoãn
- `bin/cli/runtime/index.mjs` — bộ điều phối khởi động (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — hook sau cài đặt npm (khởi động sơ bộ không gây lỗi nghiêm trọng)
- `src/lib/db/core.ts` — các export `ensureDbInitialized()` / `getDriverInfo()`

## Mô hình một trình ghi (không hỗ trợ HA)

Chuỗi dự phòng trình điều khiển ở trên vẫn chạy trong **một tiến trình**. Theo mặc định, SQLite
của OmniRoute là hệ thống **một trình ghi**:

- Không gắn hai replica OmniRoute vào cùng một tệp `storage.sqlite`.
- Việc khởi động lại container, triển khai Recreate, OOM kill hoặc khởi động lại do HEALTHCHECK sẽ ngắt
  mọi phiên SSE đang xử lý. Luồng mặc định không có cơ chế rút cạn phiên.
- Kiểm tra liveness của trình điều phối coi `/healthz` chậm là đã chết sẽ hủy replica
  duy nhất. Nên dùng liveness TCP + readiness HTTP `/healthz`. Xem
  [Hướng dẫn Docker — tính sẵn sàng](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  và [khuyến nghị về probe Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
