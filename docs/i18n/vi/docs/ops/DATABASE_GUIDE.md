# Database Schema & Operations Guide (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Tóm tắt**: OmniRoute sử dụng **SQLite với cơ chế ghi nhật ký WAL** làm kho lưu trữ chính, cùng mã hóa **AES-256-GCM** cho dữ liệu nhạy cảm khi lưu trữ. Hướng dẫn này đề cập đến lược đồ, quá trình di chuyển, sao lưu/khôi phục và các quy trình vận hành.

**Nguồn:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 bảng cơ sở)
- `src/lib/db/migrationRunner.ts` — các bản di chuyển được quản lý theo phiên bản
- `src/lib/db/migrations/` — 167 tệp SQL được quản lý theo phiên bản
- `src/lib/db/encryption.ts` — các hàm hỗ trợ mã hóa
- `src/lib/db/backup.ts` — xuất/nhập bản sao lưu
- `src/lib/db/healthCheck.ts` — chẩn đoán tình trạng hoạt động

---

## Tại sao chọn SQLite?

OmniRoute chọn SQLite thay vì PostgreSQL/MySQL vì một số lý do:

| Yếu tố                 | SQLite                                     | PostgreSQL                                 |
| ---------------------- | ------------------------------------------ | ------------------------------------------ |
| **Triển khai**         | Nhúng — không cần máy chủ riêng            | Cần thiết lập máy chủ                      |
| **Mã hóa**             | Tầng ứng dụng (AES-256-GCM)                | TDE tích hợp sẵn                           |
| **Hiệu năng**          | Nhanh hơn với khối lượng công việc nhỏ/vừa | Tốt hơn khi có lượng ghi đồng thời rất lớn |
| **Tính đồng thời**     | Chế độ WAL cho phép đọc đồng thời          | MVCC đầy đủ                                |
| **Sao lưu**            | Sao chép một tệp duy nhất                  | `pg_dump` hoặc ảnh chụp nhanh hệ thống tệp |
| **Trường hợp sử dụng** | Cài đặt theo từng người dùng, dạng nhúng   | SaaS đa đối tượng thuê                     |

Đối với các triển khai **một người dùng, một phiên bản** (trường hợp sử dụng chính của OmniRoute), SQLite đơn giản và nhanh hơn.

### Ghi nhật ký WAL

`core.ts` mở cơ sở dữ liệu ở **chế độ WAL (Write-Ahead Logging — ghi nhật ký trước)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL cho phép **đọc đồng thời** trong khi ghi — điều này rất quan trọng đối với bảng điều khiển, vì bảng điều khiển thực hiện truy vấn trong lúc các yêu cầu đang được ghi lại.

Kích thước bộ nhớ đệm mặc định là **65.536 KiB (64 MiB)**. SQLite diễn giải giá trị âm của
`cache_size` là giới hạn trên xấp xỉ tính theo KiB và phân bổ các trang theo nhu cầu.
**Cài đặt > Hệ thống & Lưu trữ > Kích thước bộ nhớ đệm** chấp nhận các giá trị nguyên từ **1 đến
1.000.000 KiB**; khi lưu cài đặt, giá trị này được áp dụng cho kết nối cơ sở dữ liệu đang hoạt động,
và OmniRoute khôi phục giá trị đã lưu khi khởi động.

---

## Vị trí cơ sở dữ liệu

Tệp SQLite được lưu trữ tại:

| Hệ điều hành | Đường dẫn                                                   |
| ------------ | ----------------------------------------------------------- |
| Linux        | `~/.omniroute/storage.sqlite`                               |
| macOS        | `~/.omniroute/storage.sqlite`                               |
| Windows      | `%USERPROFILE%\.omniroute\storage.sqlite`                   |
| Docker       | `/app/data/storage.sqlite` (có thể cấu hình qua `DATA_DIR`) |

Các tệp và thư mục đi kèm:

- `storage.sqlite-wal` — nhật ký ghi trước
- `storage.sqlite-shm` — tệp bộ nhớ dùng chung
- `call_logs/` — các thành phần dữ liệu tải trọng của yêu cầu (nếu được bật)

**Ghi đè vị trí:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Kiến trúc mô-đun miền

Cơ sở dữ liệu của OmniRoute có **110 mô-đun TypeScript cấp cao nhất** trong `src/lib/db/`. Mỗi mô-đun miền:

- Sở hữu một hoặc nhiều bảng cụ thể
- Xuất các hàm CRUD có kiểu dữ liệu
- Không bao giờ truy cập các bảng của mô-đun khác
- Sử dụng `getDbInstance()` từ `core.ts` để truy cập DB

### 110 mô-đun DB cấp cao nhất

OmniRoute có **110 tệp TypeScript cấp cao nhất** trong `src/lib/db/`. Dưới đây là một số mô-đun cốt lõi tiêu biểu; hãy xem danh sách thư mục để biết danh sách đầy đủ:

| Mô-đun                  | Bảng                                                           | Trách nhiệm                                                                  |
| ----------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Đăng ký nhà cung cấp bằng OAuth/khóa API và quản lý thông tin xác thực       |
| `models.ts`             | `key_value` (dữ liệu mô hình)                                  | Định nghĩa mô hình, khả năng, giá cả                                         |
| `combos.ts`             | `combos`                                                       | Cấu hình định tuyến combo và thứ tự                                          |
| `apiKeys.ts`            | `api_keys`                                                     | Vòng đời khóa API, phạm vi quyền, theo dõi hạn ngạch                         |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Cấu hình hệ thống và kho KV dùng chung                                       |
| `backup.ts`             | —                                                              | Các thao tác xuất/nhập bản sao lưu                                           |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Cấu hình proxy và quy tắc định tuyến                                         |
| `prompts.ts`            | `prompt_templates`                                             | Mẫu prompt có thể tái sử dụng, quản lý phiên bản                             |
| `webhooks.ts`           | `webhooks`                                                     | Đăng ký webhook hướng sự kiện và nhật ký                                     |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Ghi nhật ký kiểm tra theo từng yêu cầu (tùy chọn, khối lượng lớn)            |
| `domainState.ts`        | `domain_*` (5 bảng)                                            | Ngân sách miền, bộ ngắt mạch, khóa truy cập, chuỗi dự phòng, lịch sử chi phí |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Các khóa API trong danh sách cho phép dành cho MCP/A2A                       |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Lịch sử sử dụng hạn ngạch                                                    |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Ánh xạ mô hình tới combo mặc định                                            |
| `cliToolState.ts`       | `cli_tool_state`                                               | Trạng thái bền vững dành riêng cho CLI                                       |
| `encryption.ts`         | —                                                              | Các hàm hỗ trợ mã hóa/giải mã trường                                         |
| `readCache.ts`          | —                                                              | Bộ nhớ đệm trong bộ nhớ dành cho các thao tác đọc nhiều                      |
| `secrets.ts`            | `key_value` (các mục được mã hóa)                              | Lưu trữ bí mật được mã hóa                                                   |
| `stateReset.ts`         | —                                                              | Xóa/đặt lại trạng thái DB để kiểm thử                                        |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Ngữ cảnh phiên để chuyển giao tác nhân                                       |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Theo dõi mức sử dụng                                                         |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Cấu hình nén                                                                 |

### Ranh giới mô-đun

Một quy tắc kiến trúc cốt lõi: **các mô-đun không truy cập trực tiếp vào bảng của nhau**. Để làm việc với dữ liệu của mô-đun khác, hãy nhập hàm từ mô-đun đó.

```ts
// ❌ SAI: SQL trực tiếp từ một mô-đun khác
db.prepare("SELECT * FROM provider_connections").all();

// ✅ ĐÚNG: sử dụng hàm của mô-đun providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Quy tắc này được thực thi thông qua quá trình đánh giá mã — không có cơ chế kiểm tra tĩnh, nhưng các vi phạm sẽ bị đánh dấu.

---

## Lược đồ cơ sở (17 bảng)

`core.ts` định nghĩa 17 bảng cơ sở trong `SCHEMA_SQL`. Các bảng này được tạo bởi migration `001_initial_schema.sql` và cấu thành lược đồ cốt lõi.

### Các bảng cốt lõi (được tạo trong migration ban đầu)

| Bảng                       | Mục đích                                    | Các cột chính                                                           |
| -------------------------- | ------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Thông tin xác thực nhà cung cấp (đã mã hóa) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Thông tin định tuyến nút của nhà cung cấp   | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Kho lưu trữ KV dùng chung                   | `namespace`, `key`, `value`                                             |
| `combos`                   | Định nghĩa tổ hợp định tuyến                | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Khóa API cho gateway                        | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Siêu dữ liệu cơ sở dữ liệu                  | `key`, `value`                                                          |
| `usage_history`            | Bản ghi mức sử dụng của yêu cầu             | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Payload yêu cầu và phản hồi                 | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Nhật ký yêu cầu proxy                       | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Chuỗi ánh xạ mô hình đến nhà cung cấp       | `model`, `chain`                                                        |
| `domain_budgets`           | Ngân sách chi tiêu theo từng miền           | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Lịch sử đặt lại ngân sách                   | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Theo dõi chi phí theo từng miền             | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Trạng thái giới hạn tốc độ của miền         | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Trạng thái bộ ngắt mạch theo từng miền      | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Bộ nhớ đệm phản hồi LLM                     | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Ảnh chụp hạn ngạch lịch sử                  | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Các bảng bổ sung (được thêm bởi các migration sau)

Các migration tiếp theo bổ sung những bảng như:

- `cli_tool_state` (migration 011) — trạng thái công cụ CLI
- Các bảng `mcp_*` — kiểm tra máy chủ MCP
- Các bảng `a2a_*` — trạng thái tác vụ A2A
- Các bảng `usage_*` — theo dõi mức sử dụng
- Các bảng `plugin_*` — hệ thống plugin
- `skill_executions` — lịch sử thực thi kỹ năng
- Các bảng `memory_*` — hệ thống bộ nhớ
- Các bảng `compression_*` — hệ thống nén
- Các bảng `webhook_*` — nhật ký phân phối webhook
- Các bảng `acp_*` — Agent Client Protocol
- Các bảng `oneproxy_*` — chợ 1proxy
- `proxy_assignments` — liên kết phạm vi proxy
- `detailed_call_artifacts` — siêu dữ liệu artifact của nhật ký lệnh gọi
- `quota_alert_history` — lịch sử kiểm tra cảnh báo hạn ngạch
- `command_code_auth_sessions` — các phiên OAuth của Command Code

Danh sách đầy đủ gồm hơn 30 bảng nằm trong `src/lib/db/migrations/`.

---

## Di chuyển

công dụng OmniRoute** di chuyển bình thường, được phiên bản** trong `src/lib/db/migrations/`. Mỗi lần di chuyển là một tệp SQL duy nhất. Hai định dạng đặt tên cùng tồn tại; phiên bản được ghi trong `_omniroute_migrations` là tiền tố số.

### Đặt tên di chuyển

| Định dạng                                         | Ví dụ                                | Dùng cho                                                                                                                                                         |
| ------------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (chính xác là 3 chữ số)     | `241_seen_models.sql`                | Dòng cũ `001`–`241`. Bị đóng băng khi định dạng dấu thời gian hạ cánh (`240` và `241` đã được hợp nhất ngay trước nó): không có tệp mới nào nhận được số thứ tự. |
| `YYYYMMDDHHMMSS_description.sql` (14 chữ số, UTC) | `20261113120000_add_usage_index.sql` | Mọi hoạt động di chuyển được tạo từ ngày 13 tháng 11 năm 2026 trở đi.                                                                                            |

Tại sao lại thay đổi: với các số liên tiếp, PRs song song đã chọn cùng một số tiếp theo và tất cả trừ một số phải đánh số lại trước khi hợp nhất. Dấu thời gian UTC cung cấp cho mỗi PR phiên bản riêng.

Quy tắc về định dạng dấu thời gian (được thực thi bởi `npm run check:migration-numbering`, được chia sẻ với trình tạo trong `scripts/check/lib/migrationNaming.mjs`):

- Dấu thời gian là ngày và giờ UTC thực, không sớm hơn `20261113000000` và không quá 10 phút trong tương lai.
- Mô tả là chữ thường `snake_case` bắt đầu bằng một chữ cái (`a-z`, `0-9`, `_` đơn giữa các từ), tối đa 80 ký tự.
- Hai tệp có cùng dấu thời gian là trùng lặp.
- Quy tắc không có khoảng cách chỉ áp dụng cho chuỗi cũ: mọi số từ `001` đến `241` phải tồn tại, ngoại trừ các khoảng trống đã biết `026`, `055` và `121`. Xóa `241` (hoặc bất kỳ tệp cũ nào) sẽ không thành công. `001` và `241` không bao giờ có thể được thêm vào danh sách cho phép `KNOWN_GAPS`. Các tập tin được đánh dấu thời gian không bao giờ tạo ra khoảng trống.
- Mỗi mục trong `src/lib/db/migrations/` phải là một tệp thông thường có tên `.sql` viết thường hợp lệ. Một thư mục, một liên kết tượng trưng, một tệp `.SQL` hoặc `.sql.bak`, một tệp ẩn hoặc một tên có khoảng trắng sẽ không thực hiện được cổng vì người chạy sẽ bỏ qua nó một cách im lặng hoặc gặp sự cố khi khởi động.

**Áp dụng đơn đặt hàng.** Trình chạy sắp xếp theo giá trị số của tiền tố, không phải theo văn bản: trước tiên là các tệp `001`–`241` cũ, sau đó là các tệp được đánh dấu thời gian theo thứ tự dấu thời gian, sau đó là bất kỳ thư mục được đặt tên nào đã đăng ký với `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (các phiên bản như `ee-001`). Di chuyển đang chờ xử lý là bất kỳ tệp nào có phiên bản không có trong `_omniroute_migrations`, do đó, việc di chuyển từ nhánh cũ hợp nhất sau nhánh mới hơn vẫn áp dụng trên cơ sở dữ liệu hiện có.

**Dấu thời gian là thứ tự tạo chứ không phải thứ tự hợp nhất.** Nếu quá trình di chuyển của bạn phụ thuộc vào một bảng hoặc cột được tạo bởi quá trình di chuyển có** mới hơn** dấu thời gian (ví dụ: một dấu thời gian từ một PR khác được hợp nhất trước), cơ sở dữ liệu mới sẽ chạy cơ sở dữ liệu của bạn trước và không thành công. Trong khi PR của bạn vẫn mở, hãy tạo lại tên tệp bằng `npm run db:new-migration` để nó có dấu thời gian mới hơn hoặc làm cho nó độc lập. `npm run test:migrations:fresh` áp dụng mọi di chuyển vào cơ sở dữ liệu trống và nắm bắt điều này.

### Di chuyển đã hợp nhất không bao giờ bị xóa hoặc đổi tên

Khi tệp di chuyển nằm trên nhánh phát hành hoặc `main`, nó đã chạy trên cơ sở dữ liệu tương đồng và nhà phát triển, trên các bản cài đặt VPS và trong đồng bộ hóa Doanh nghiệp. Từ đó trở đi:

- **Không bao giờ xóa nó.** Các lượt cài đặt mới sẽ mất lược đồ trong khi cơ sở dữ liệu được nâng cấp sẽ giữ lại lược đồ đó.
- **Không bao giờ đổi tên nó.** Phiên bản trong `_omniroute_migrations` sẽ không còn khớp với một tệp nữa, vì vậy mọi cơ sở dữ liệu đã áp dụng nó sẽ chạy lại. SQL không bình thường sẽ sao chép dữ liệu hoặc dừng khởi động.
- **Cần một lược đồ khác?** Tạo một di chuyển mới với `npm run db:new-migration`.

Việc đổi tên chỉ an toàn đối với tệp chưa được hợp nhất, đó là trường hợp mà gợi ý của cổng đề cập đến. Thẻ phát hành không thay đổi gì ở đây: mỗi lần đẩy tới nhánh `release/v*` sẽ xuất bản hình ảnh Docker `:next` và chạy trên các bản cài đặt tương đồng, VPS và đồng bộ hóa doanh nghiệp, do đó quá trình di chuyển đã hợp nhất đã chạy trên cơ sở dữ liệu thực trước khi có bất kỳ thẻ `vX.Y.Z` nào tồn tại. Cổng không thành công trong mỗi lần xóa tệp cơ sở, được gắn thẻ hay không.

- **Hoàn nguyên quá trình di chuyển đã hợp nhất.** Một `git revert` xóa tập tin không thành công. Giữ tệp và hoàn tác lược đồ của nó trong một lần di chuyển mới: `npm run db:new-migration -- <description>`, với `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS`, v.v. Cơ sở dữ liệu mới và được nâng cấp sau đó kết thúc với cùng một lược đồ.
- **Đổi tên được chấp nhận: mục nhập tương thích và nội dung giống hệt nhau.** Nếu một tệp đã hợp nhất phải di chuyển (ví dụ: hai tệp đã hợp nhất chia sẻ dấu thời gian và trình chạy dừng do xung đột phiên bản), hãy đổi tên tệp sau mà không chạm vào SQL của nó và thêm `{ fromVersion, fromName, toVersion, toName }` vào `RENAMED_MIGRATION_COMPATIBILITY` trong `src/lib/db/migrationRunner/constants.ts`. Cơ sở dữ liệu áp dụng phiên bản cũ sẽ di chuyển hàng `_omniroute_migrations` thay vì chạy lại tệp. Cổng cảnh báo về việc đổi tên như vậy và luôn chạy kiểm tra giao hoán trên đó, bất kể dấu thời gian mới: các bản cài đặt mới áp dụng tệp ở vị trí mới, cơ sở dữ liệu đã nâng cấp thì không, vì vậy hãy chọn dấu thời gian mới gần dấu thời gian cũ. Cổng không đổi tên được nếu nội dung đã thay đổi (thay đổi lược đồ vẫn diễn ra trong quá trình di chuyển mới) hoặc nếu tệp mục tiêu của mục nhập không có trên đĩa.
- **Không bao giờ đổi tên trong cùng một dấu thời gian.** Việc đổi tên giữ dấu thời gian và chỉ thay đổi mô tả không thành công, có hoặc không có mục nhập. Với một mục có `toVersion` bằng `fromVersion` của nó, trình chạy sẽ xóa hàng `_omniroute_migrations` cũ và áp dụng lại tệp trên mọi cơ sở dữ liệu đã chạy nó. Nếu không có mục nhập, trình chạy chỉ theo dõi phiên bản: nó bỏ qua tệp trên các cơ sở dữ liệu đó (nội dung mới không bao giờ chạy ở đó) và ghi lại lỗi đánh số lại trong mỗi lần khởi động. Sử dụng dấu thời gian khác cùng với mục nhập tương thích hoặc giữ nguyên tên.
- **Cổng kiểm tra xem tệp đã đổi tên có chạy lại không.** Đối với mỗi lần đổi tên được bảo hiểm, cổng sẽ chuyển tên tệp mới để kiểm tra giao hoán với `--must-not-apply`. Việc kiểm tra khởi động cơ sở dữ liệu đã nâng cấp với trình chạy thực và nếu trình chạy áp dụng lại tệp đó (ví dụ: do mục nhập có phiên bản hoặc tên sai hoặc do trình phân tích cú pháp văn bản của cổng đọc `constants.ts` khác với TypeScript), cổng không thành công với `migration renomeada rodaria de novo` và yêu cầu bạn kiểm tra tên và phiên bản cũ và mới của mục nhập.

### Cổng kiểm tra những gì so với cơ sở

Khi yêu cầu kéo và chạy hàng đợi hợp nhất, `npm run check:migration-numbering` so sánh `src/lib/db/migrations/` trên đĩa với cùng thư mục trên nhánh cơ sở. Cơ sở, theo thứ tự này: `--base-latest-tag`, `--base <ref>`, biến `MIGRATION_BASE_REF` hoặc khi `GITHUB_EVENT_NAME` là `pull_request`, `pull_request_target` hoặc `merge_group`, cha mẹ đầu tiên của cam kết hợp nhất, `merge_group.base_sha` của tải trọng sự kiện hoặc `git merge-base HEAD origin/$GITHUB_BASE_REF`. Trong một yêu cầu kéo hoặc chạy hàng đợi hợp nhất mà không có cơ sở có thể phân giải được, cổng không thành công. Bên ngoài CI không có `--base`, nó in `comparação com a base: pulada (sem --base)` và bỏ qua các quy tắc này.

`--base-latest-tag` so sánh với thẻ phát hành mới nhất (`vX.Y.Z` theo thứ tự semver; các thẻ hậu tố như nightlies không được tính) có trong lịch sử của `HEAD`, với các quy tắc tương tự như `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) chạy cổng theo cách này, vì các lần chạy đẩy và chạy theo lịch trình không có cơ sở yêu cầu kéo và việc hợp nhất có thể hạ cánh mà không cần chạy CI mới. Không có thẻ phát hành trong lịch sử nên cổng không thành công; chạy `git fetch --tags` (trong CI, `actions/checkout` với `fetch-depth: 0` mang theo các thẻ).

| Thay đổi theo yêu cầu kéo                                                                                            | Kết quả                                                                                                                                                                                                                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Một tệp tồn tại trên cơ sở được đổi tên, với mục nhập `RENAMED_MIGRATION_COMPATIBILITY`                              | **Cảnh báo** nếu nội dung giống hệt nhau và kiểm tra giao hoán sẽ chạy bất kể dấu thời gian mới; nó không thành công nếu vị trí mới thay đổi lược đồ cuối cùng (hoàn tác việc đổi tên hoặc chọn một dấu thời gian mới khác nơi nó di chuyển) hoặc nếu người chạy áp dụng lại tệp đã đổi tên trên cơ sở dữ liệu đã nâng cấp.** Thất bại** nếu nội dung thay đổi. |
| Một tệp tồn tại trên cơ sở được đổi tên theo dấu thời gian của nó (chỉ thay đổi mô tả)                               | **Thất bại** , có hoặc không có mục nhập: người chạy sẽ áp dụng lại (có mục nhập) hoặc bỏ qua theo phiên bản (không có mục nhập). Sử dụng dấu thời gian khác cùng với mục nhập tương thích hoặc giữ nguyên tên.                                                                                                                                                 |
| Một tập tin tồn tại trên cơ sở sẽ bị xóa hoặc đổi tên mà không có mục nhập                                           | **Thất bại** , cho dù tệp có nằm trong thẻ phát hành hay không. Để hoàn tác, hãy khôi phục tệp bằng `git checkout <base> -- src/lib/db/migrations/<file>`; để hoàn nguyên lược đồ của nó, hãy thêm một di chuyển mới với `DROP ... IF EXISTS`.                                                                                                                  |
| Một tập tin tồn tại trên cơ sở có nội dung khác nhau                                                                 | **Cảnh báo** (chú thích `::warning` trong Hành động GitHub ) và quá trình kiểm tra giao hoán sẽ diễn ra. Sẽ không thành công nếu chỉnh sửa thay đổi lược đồ cuối cùng, vì cơ sở dữ liệu được nâng cấp không áp dụng lại tệp đã chỉnh sửa: đưa thay đổi vào một lần di chuyển mới. Một chỉnh sửa vô hại (một bình luận, `IF NOT EXISTS`) chỉ cảnh báo.           |
| Tệp có dấu thời gian được thêm vào với dấu thời gian không mới hơn tệp mới nhất của cơ sở                            | Chạy kiểm tra chuyển mạch, được mô tả dưới đây.                                                                                                                                                                                                                                                                                                                 |
| Tệp `NNN_` định dạng cũ được thêm vào với một số bên dưới tệp định dạng cũ mới nhất của cơ sở                        | **Thất bại** , ngay cả khi `KNOWN_GAPS` được chỉnh sửa trong cùng một yêu cầu kéo: chuỗi cũ bị đóng băng, hãy tạo di chuyển bằng `npm run db:new-migration`. Các tệp định dạng cũ phía trên tệp mới nhất của cơ sở (yêu cầu kéo `release/v*` sang `main` ) được chấp nhận.                                                                                      |
| Một tệp không đúng thứ tự, được chỉnh sửa hoặc đổi tên chứa các câu lệnh `INSERT`, `UPDATE`, `DELETE` hoặc `REPLACE` | **Cảnh báo** : kiểm tra giao hoán không so sánh dữ liệu, vì vậy hãy xem lại xem thứ tự áp dụng cơ sở dữ liệu mới và nâng cấp có làm thay đổi kết quả hay không.                                                                                                                                                                                                 |

Một lần kiểm tra giao hoán bao gồm các tệp không đúng thứ tự, các tệp đã chỉnh sửa và các tệp được đổi tên cùng nhau.

Kiểm tra giao hoán (`scripts/check/migration-commutation.ts`) xây dựng hai cơ sở dữ liệu tạm thời với đường dẫn cài đặt thực: một** nâng cấp** một (khởi động bằng các lần di chuyển cơ sở, sau đó khởi động lại trên cùng một tệp với các lần di chuyển của yêu cầu kéo) và một** tươi** một (một lần khởi động với quá trình di chuyển của yêu cầu kéo). Nó so sánh các lược đồ kết quả: bảng và cột (bỏ qua thứ tự cột), ràng buộc UNIQUE / PRIMARY KEY và FOREIGN KEY, văn bản `CREATE TABLE` chuẩn hóa của mỗi bảng (bao gồm các ràng buộc CHECK, đối chiếu, cột được tạo và tùy chọn bảng), chỉ mục, trình kích hoạt và dạng xem. Dữ liệu hàng không được so sánh. Nếu chúng khớp nhau, cổng sẽ in ra rằng tệp không đúng thứ tự nhưng vẫn hoạt động và được chuyển. Nếu chúng khác nhau, cổng không thành công với sự khác biệt và gợi ý cho trường hợp: đối với một tệp không đúng thứ tự, hãy tạo lại tên của nó bằng `npm run db:new-migration`, điều này an toàn vì tệp chưa được hợp nhất; đối với tệp cơ sở đã chỉnh sửa, hãy khôi phục nội dung cơ sở và thực hiện thay đổi trong quá trình di chuyển mới; đối với một tệp đã được đổi tên, hãy hoàn tác việc đổi tên hoặc chọn một dấu thời gian mới khác nơi nó di chuyển, không bao giờ đặt cùng một dấu thời gian với một tên khác. Nếu bản thân việc kiểm tra không thể chạy, cổng sẽ bị lỗi ở CI và chỉ cảnh báo cục bộ. Đối với tệp cơ sở đã chỉnh sửa, cơ sở dữ liệu đã nâng cấp được xây dựng bằng nội dung cơ sở của tệp đó và lần khởi động thứ hai sẽ bỏ qua cơ sở dữ liệu đó vì phiên bản của nó đã được ghi lại. Đối với một tệp đã được đổi tên, cơ sở dữ liệu đã nâng cấp được xây dựng với tệp dưới tên cũ của nó và lần khởi động thứ hai sẽ di chuyển hàng `_omniroute_migrations` của nó qua mục nhập tương thích thay vì chạy lại; cổng chuyển tên mới bằng `--must-not-apply`, do đó việc kiểm tra không thành công nếu lần khởi động thứ hai áp dụng nó. Nếu quá trình di chuyển yêu cầu kéo không áp dụng được trên đường dẫn đã nâng cấp, tức là sau mỗi lần di chuyển cơ sở (dù có thất bại trong lần cài đặt mới hay không), cổng sẽ báo cáo `migration do PR não aplica` và yêu cầu bạn sửa SQL theo lược đồ hiện tại của cơ sở; nếu tệp phụ thuộc vào quá trình di chuyển yêu cầu kéo khác có dấu thời gian muộn hơn, hãy tạo lại tên của nó bằng `npm run db:new-migration`.

Để chạy cùng một so sánh cục bộ, hãy chuyển cơ sở một cách rõ ràng, ví dụ `npm run check:migration-numbering -- --base origin/<base-branch>` hoặc `npm run check:migration-numbering -- --base-latest-tag` để so sánh với bản phát hành mới nhất.

### Chuyển đổi di chuyển `NNN` của PR mở

Yêu cầu kéo được mở trước khi chuyển đổi vẫn có thể mang tệp tuần tự như `242_add_widgets.sql`. Các số cũ trên `241` bị từ chối, vì vậy hãy chuyển đổi nó trước khi hợp nhất:

1. **Đổi tên tệp bằng trình tạo, giữ nguyên mô tả.** Chạy `npm run db:new-migration -- <same description>` để lấy tên mới, di chuyển SQL vào đó và xóa tệp `NNN_` cũ. Mô tả phải giống hệt nhau: mục tương thích bên dưới khớp với mô tả đó.
2. **Thêm mục nhập tương thích nếu cơ sở dữ liệu liên tục chạy số cũ.** Nếu bất kỳ cơ sở dữ liệu nào được lưu giữ (tương đồng, a VPS, bản cài đặt của chính người đóng góp) chạy bản dựng PR với tệp `NNN_`, hãy thêm `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` vào `RENAMED_MIGRATION_COMPATIBILITY` trong `src/lib/db/migrationRunner/constants.ts`. Đây là** cần thiết cho `237` đến `241`** : các vị trí đó hiện chứa `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` và `241_seen_models.sql` và không có mục nhập, cơ sở dữ liệu như vậy sẽ bỏ qua quá trình di chuyển chính tắc mãi mãi và chạy lại chuyển đổi. Nó cũng hoạt động cho một vị trí trống, chẳng hạn như `242`, khi đích đến là dấu thời gian. Khi nghi ngờ, hãy thêm mục nhập. Vị trí bạn thêm nó vào mảng không quan trọng: khi vị trí mục tiêu của mục nhập vẫn giữ một hàng mà mục nhập khác sẽ di chuyển đi (ví dụ: `237` giữ một hàng PR trong khi một hàng `usage_history_calculated_cost` cũ hơn chờ di chuyển vào `237`), người chạy sẽ cho phép mục nhập đó đợi cho đến khi vị trí còn trống. Chỉ có xung đột thực sự, chẳng hạn như một vị trí được giữ bởi một hàng không có mục nào di chuyển hoặc hai mục nhập hoán đổi vị trí, sẽ dừng khởi động bằng `Cannot reconcile ...`.
3. **Giữ SQL bình thường** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), vì quá trình di chuyển được chuyển đổi có thể gặp cơ sở dữ liệu đã tồn tại lược đồ của nó.
4. **Di chuyển các trường hợp đặc biệt có khóa phiên bản.** Nếu PR đã thêm một trường hợp cho số cũ của nó bằng `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) hoặc `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), hãy thay đổi khóa thành dấu thời gian mới.

`tests/unit/db/codex-fence-migration-rename.test.ts` là một ví dụ hoạt động về thử nghiệm di chuyển được đổi tên.

### Chuyển ngược lại các nhánh trước khi chuyển đổi

Không bao giờ chọn anh đào hoặc chuyển ngược tệp `YYYYMMDDHHMMSS_` sang một nhánh có trước nút chuyển (ví dụ: nhánh `release/v*` cũ hơn). Trình chạy ở đó sắp xếp tên tệp dưới dạng văn bản, do đó, tệp có dấu thời gian sẽ chạy giữa `201_` và `202_` trên cơ sở dữ liệu mới và cổng cũ ở đó không hiểu tiền tố 14 chữ số. Trên nhánh như vậy, hãy viết thay đổi dưới dạng tệp `NNN_` tiếp theo của chính nhánh đó, idempotent, do đó, sẽ không hoạt động khi phiên bản có dấu thời gian đến sau.

### Quá trình di chuyển diễn ra như thế nào

Khi khởi động, `migrationRunner.ts`:

1. Tạo bảng `_omniroute_migrations` nếu chưa tồn tại
2. Truy vấn về các lần di chuyển đã được áp dụng
3. Áp dụng mọi di chuyển mới theo thứ tự, mỗi lần di chuyển trong một giao dịch
4. Ghi lại từng lần di chuyển được áp dụng bằng dấu thời gian

```ts
// src/lib/db/migrationRunner.ts (simplified)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### sự bình thường

Việc di cư phải được** bình thường** — chạy chúng hai lần sẽ không hoạt động:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Sử dụng các mệnh đề `IF NOT EXISTS`, `IF EXISTS` và `OR IGNORE` / `OR REPLACE` một cách tùy ý.

### Thêm một di chuyển mới

1. **Tạo tập tin với trình tạo** : `npm run db:new-migration -- <description>` (ví dụ `npm run db:new-migration -- add combo priority`). Nó ghi `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` với thời gian UTC hiện tại và tiêu đề nhận xét, tiến về phía trước một giây nếu dấu thời gian đó được lấy và không bao giờ ghi đè lên tệp. Đừng chọn số bằng tay.
2. **Sử dụng DDL an toàn** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Chèn lấp dữ liệu cẩn thận** : sử dụng `UPDATE ... WHERE ...` để xử lý các hàng hiện có
4. **Kiểm tra thứ tự và đặt tên** : `npm run test:migrations:fresh` (tất cả các lần di chuyển trên cơ sở dữ liệu trống) và `npm run check:migration-numbering`
5. **Kiểm tra trên một bản sao** : không bao giờ chạy các di chuyển chưa được kiểm tra trên sản xuất
6. **Một bảng được tạo từ mã cũng cần được di chuyển** : nếu một mô-đun cũng tạo bảng một cách lười biếng (`CREATE TABLE IF NOT EXISTS`, được giữ dưới dạng đường dẫn tự phục hồi), quá trình di chuyển phải tạo bảng đó với cùng một DDL. Nếu không, bản cài đặt sạch và bản cài đặt nâng cấp sẽ có các lược đồ khác nhau, tùy thuộc vào việc đường dẫn mã đó có chạy hay không. `tests/unit/db/lazy-table-migration-guard.test.ts` quét `src/` và `open-sse/` và thất bại trên `CREATE` lười biếng mà không di chuyển (#20557). Ví dụ: `src/lib/db/migrations/20261118120853_compression_run_telemetry.sql`.

Ví dụ:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Những thay đổi không tương thích ngược** (ví dụ: thả cột) rất phức tạp. OmniRoute không NOT hỗ trợ hạ cấp — sau khi áp dụng di chuyển, thay đổi lược đồ là vĩnh viễn. Lập kế hoạch cho phù hợp.

---

## Mã hóa dữ liệu lưu trữ

Các trường nhạy cảm (khóa API, token OAuth, chuỗi kết nối) được mã hóa khi lưu trữ bằng **AES-256-GCM**.

### Cách hoạt động

```ts
// src/lib/db/encryption.ts (đã đơn giản hóa)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Nơi áp dụng

- `provider_connections.api_key` — được mã hóa ở cấp ứng dụng
- `provider_connections.access_token`, `refresh_token`, `id_token` — được mã hóa ở cấp ứng dụng
- Các mục `key_value` có `namespace = "secrets"` — được mã hóa ở cấp ứng dụng
- `proxy_registry.auth` — được mã hóa ở cấp ứng dụng (nếu có)

### Khóa mã hóa

Khóa mã hóa được dẫn xuất từ một **cụm mật khẩu** (được thiết lập qua biến môi trường `STORAGE_ENCRYPTION_KEY`) và một **salt** (được lưu trong DB). Cả hai đều cần thiết để giải mã dữ liệu.

```bash
# Tạo một cụm mật khẩu an toàn
openssl rand -hex 32

# Thiết lập trong .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Quan trọng**: Việc làm mất khóa mã hóa đồng nghĩa với mất quyền truy cập vào toàn bộ dữ liệu đã mã hóa. **Hãy sao lưu khóa riêng biệt với cơ sở dữ liệu**.

### Những dữ liệu KHÔNG được mã hóa

Vì lý do hiệu năng, các dữ liệu sau được lưu dưới dạng văn bản thuần túy:

- Tên hiển thị của nhà cung cấp
- Định nghĩa mô hình (vốn đã công khai)
- Quy tắc định tuyến
- Bản ghi sử dụng (không chứa PII)

---

## Lưu ý về mã hóa (v3.8.16+)

OmniRoute sử dụng **`migrateLegacyEncryptedString()`** để xử lý hai cơ chế mã hóa một cách minh bạch:

- **Cũ** (trước v3.5.0): "mã hóa" dựa trên XOR (không phải mật mã thực sự)
- **Hiện tại**: AES-256-GCM với IV và thẻ xác thực phù hợp

Trình hỗ trợ di chuyển sẽ phát hiện định dạng cũ và mã hóa lại bằng cơ chế mới trong lần đọc đầu tiên. Điều này có nghĩa là bạn có thể nâng cấp cơ sở dữ liệu cũ mà không làm mất thông tin xác thực.

---

## Bộ nhớ đệm đọc

Đối với dữ liệu được đọc thường xuyên (mô hình, nhà cung cấp, cài đặt), `readCache.ts` cung cấp **bộ nhớ đệm trong bộ nhớ**:

```ts
// Được lưu vào bộ nhớ đệm khi khởi động, bị vô hiệu hóa khi ghi
const providers = await getCachedProviders(); // Nhanh, trong bộ nhớ
const fresh = await listProviders(); // Chậm, truy vấn DB
```

| Thực thể được lưu đệm  | Khóa bộ nhớ đệm | TTL             |
| ---------------------- | --------------- | --------------- |
| `models`               | `models:v1`     | Cho đến khi ghi |
| `provider_connections` | `providers:v1`  | Cho đến khi ghi |
| `settings`             | `settings:v1`   | Cho đến khi ghi |
| `combos`               | `combos:v1`     | Cho đến khi ghi |

Bộ nhớ đệm bị vô hiệu hóa mỗi khi có thao tác ghi vào bảng tương ứng.

---

## Sao lưu và khôi phục

### Sao lưu thủ công

```bash
# Sử dụng CLI để tạo bản sao lưu cục bộ
omniroute backup create --name pre-migration

# Hoặc thông qua API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Tệp sao lưu bao gồm:

- Tất cả các bảng DB (được tuần tự hóa thành JSON)
- Các thành phần nhật ký cuộc gọi (được mã hóa base64, không bắt buộc)
- Cài đặt + thông tin bí mật (được mã hóa)
- Cấu hình plugin

### Khôi phục

```bash
# Thông qua CLI
omniroute restore pre-migration

# Thông qua API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Cảnh báo**: Việc khôi phục sẽ ghi đè toàn bộ DB. Trước tiên, hãy dừng tất cả máy khách.

### Sao lưu tự động

```bash
# Bật sao lưu tự động hằng ngày thông qua CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Lịch biểu được thực thi ở phía máy chủ bởi một tác vụ nền chạy mỗi 30 giây
(mặc định) và đánh giá biểu thức cron theo giờ cục bộ của máy chủ.

| Biến                                        | Mặc định | Mô tả                                                                                                                              |
| ------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`  | Khoảng thời gian giữa các lần chạy tính bằng ms (tối thiểu `5000`). Phải ngắn hơn 60 giây để khớp đúng phút cron một cách ổn định. |

### Sao lưu nóng SQLite

Để sao lưu DB đang hoạt động mà không cần thời gian ngừng dịch vụ:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Lệnh này sử dụng API sao lưu trực tuyến của SQLite — có thể chạy an toàn trong khi OmniRoute đang hoạt động.

---

## Điều chỉnh hiệu suất

### Chế độ WAL

WAL được bật theo mặc định. Đối với khối lượng công việc ghi cao, hãy cân nhắc:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute không đặt `journal_size_limit`. Điểm kiểm tra di chuyển các khung WAL vào tệp chính, nhưng tệp WAL vẫn giữ kích thước được phân bổ lớn nhất. Người bảo vệ `OMNIROUTE_WAL_GUARD_MAX_MB` chỉ cảnh báo và chạy `wal_checkpoint(RESTART)`; nó không phải là giới hạn kích thước đĩa.

### Chỉ mục

Các chỉ mục chính cho hiệu suất (được tạo tự động bằng cách di chuyển):

- tra cứu mô hình `idx_models_provider` — theo nhà cung cấp
- mở rộng mục tiêu kết hợp `idx_combo_targets_combo_id` —
- phân tích sử dụng `idx_usage_history_api_key_timestamp` —
- theo dõi hạn ngạch `idx_quota_snapshots_api_key_window` —
- truy vấn nhật ký cuộc gọi `idx_call_logs_timestamp` —

Để thêm chỉ mục mới, hãy tạo di chuyển:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### I/O được ánh xạ bộ nhớ

Đối với cơ sở dữ liệu rất lớn (> 10GB), ánh xạ bộ nhớ có thể được điều chỉnh thông qua SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### nén chặt

Các phiên bản OmniRoute chạy dài được hưởng lợi từ `VACUUM` không thường xuyên:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Chạy hàng tháng trong thời gian có lưu lượng truy cập thấp. (chế độ WAL làm giảm nhu cầu nhưng không loại bỏ nó.)

---

## Kiểm tra tình trạng

`src/lib/db/healthCheck.ts` cung cấp **chẩn đoán tình trạng ở cấp độ CSDL**:

Cả hai phương thức đều yêu cầu xác thực (nếu không sẽ trả về `401`). `GET` chỉ chẩn đoán; `POST` chạy cùng một
quy trình kiểm tra với `autoRepair` được bật.

```bash
GET  /api/db/health   # chẩn đoán
POST /api/db/health   # chẩn đoán + sửa chữa
```

Phản hồi là `DbHealthCheckResult` do `runDbHealthCheck()` tạo ra
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Ngân sách miền tham chiếu đến các khóa API không còn tồn tại.",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| Trường            | Ý nghĩa                                                                                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | Là `true` khi `issues` trống. `driver` không bao giờ ảnh hưởng đến giá trị này.                                                                                      |
| `issues[].type`   | Một trong các giá trị `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                               |
| `repairedCount`   | Số hàng được sửa chữa trong lần chạy này; luôn là `0` khi `autoRepair` là false.                                                                                     |
| `backupCreated`   | Cho biết bản sao lưu có được tạo trước khi sửa chữa hay không.                                                                                                       |
| `checkedAt`       | Dấu thời gian ISO được dùng chung cho lần chạy và mọi ghi chú sửa chữa mà lần chạy đó ghi lại.                                                                       |
| `driver.name`     | Trình điều khiển SQLite phục vụ cơ sở dữ liệu được kiểm tra.                                                                                                         |
| `driver.degraded` | Là `true` khi các thao tác ghi không được lưu bền vững trong tệp cơ sở dữ liệu — phương án dự phòng WASM `sql.js` (lưu toàn bộ tệp) hoặc cơ sở dữ liệu trong bộ nhớ. |

Công cụ MCP `omniroute_db_health_check` cũng trả về cùng payload này.

Chạy `PRAGMA integrity_check` để phát hiện lỗi hỏng dữ liệu:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Kết quả nên là: ok
```

Nếu lệnh trả về bất kỳ nội dung nào khác `ok`, hãy **ngừng sử dụng cơ sở dữ liệu ngay lập tức** và khôi phục từ bản sao lưu.

---

## Khôi phục sau thảm họa

### Tình huống 1: Mất tệp WAL

Tệp `-wal` bị thiếu nhưng `-shm` và DB chính vẫn còn nguyên vẹn:

```bash
# Tự động khôi phục trong lần mở tiếp theo
omniroute
```

Nếu SQLite không thể tự động khôi phục:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Tình huống 2: Tệp DB chính bị hỏng

Khôi phục từ bản sao lưu:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` chỉ tải xuống một kho lưu trữ `.tar.gz` đầy đủ từ máy chủ đang chạy
(`GET /api/db-backups/exportAll`, yêu cầu thông tin xác thực của người vận hành); lệnh này không khôi phục bất kỳ dữ liệu nào.

### Tình huống 3: Mất khóa mã hóa

**Không thể khôi phục** nếu không có khóa. Các trường đã mã hóa sẽ không thể đọc được. Hãy thêm lại tất cả nhà cung cấp theo cách thủ công bằng thông tin xác thực mới.

> **Biện pháp giảm thiểu**: Luôn sao lưu riêng khóa mã hóa, lý tưởng nhất là trong trình quản lý mật khẩu hoặc KMS.

### Tình huống 4: Đĩa đầy

SQLite sẽ trả về lỗi `SQLITE_FULL`. Hãy giải phóng dung lượng đĩa, sau đó:

```bash
# Tạo checkpoint cho WAL để giải phóng dung lượng
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Các thao tác phổ biến

### Kiểm tra một bảng

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Đếm số hàng trong tất cả các bảng

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Đặt lại (xóa sạch) toàn bộ dữ liệu

```bash
# Trước tiên, dừng OmniRoute
omniroute stop

# Xóa tệp cơ sở dữ liệu
rm ~/.omniroute/storage.sqlite*

# Khởi động lại (sẽ tạo lại cơ sở dữ liệu trống)
omniroute
```

Để đặt lại **có chọn lọc** (giữ lại các nhà cung cấp, xóa dữ liệu sử dụng):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Xuất một bảng

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Khắc phục sự cố

### "Cơ sở dữ liệu bị khóa"

Một tiến trình khác đang giữ khóa ghi. Bạn có thể:

- Chờ tiến trình kia hoàn tất (kiểm tra bằng `lsof | grep storage.sqlite`)
- Chấm dứt tiến trình kia
- Nếu sự cố vẫn tiếp diễn, hãy khởi động lại OmniRoute

### "Ràng buộc khóa ngoại thất bại"

Một mô-đun miền đang vi phạm tính toàn vẹn tham chiếu. Hãy kiểm tra:

- Các hàng mồ côi trong những bảng phụ thuộc
- Các thao tác xóa theo tầng không được lan truyền
- Bản di chuyển gần đây đã thay đổi khóa ngoại

Chạy `PRAGMA foreign_key_check;` để tìm các vi phạm.

### "Hết bộ nhớ"

I/O ánh xạ bộ nhớ của SQLite đang vượt quá giới hạn của hệ điều hành. Giảm giới hạn bằng pragma của SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB thay vì 256MB
```

Hoặc vô hiệu hóa:

```sql
PRAGMA mmap_size = 0;
```

### "Bản di chuyển thất bại giữa chừng"

Bản di chuyển được chạy trong một giao dịch, vì vậy lẽ ra nó đã được hoàn tác. Nếu không:

1. **Dừng OmniRoute** (ngăn các lần thử tiếp theo)
2. **Kiểm tra trạng thái cơ sở dữ liệu** bằng `sqlite3`
3. **Sửa thủ công** phần di chuyển chưa hoàn tất
4. **Chạy lại** OmniRoute (bản di chuyển sẽ được thử lại)

Để ngăn tình trạng này, luôn kiểm thử các bản di chuyển trên một bản sao trước.

---

## Xem thêm

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — các bảng dữ liệu sử dụng
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — giám sát tình trạng hoạt động
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — quy trình phát hành
- Mã nguồn: `src/lib/db/` (hơn 80 tệp, khoảng 25 nghìn dòng mã)
