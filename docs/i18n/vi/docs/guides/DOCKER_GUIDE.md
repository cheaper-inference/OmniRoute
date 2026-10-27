# 🐳 Docker Guide — OmniRoute (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Tài liệu tham khảo đầy đủ về triển khai Docker. Để bắt đầu nhanh, hãy xem [phần Docker trong README](../README.md#-docker).

## Mục lục

- [Chạy nhanh](#quick-run)
- [Sử dụng tệp môi trường](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Các profile có sẵn](#available-profiles)
- [Cấu hình các công cụ CLI trên máy chủ khi OmniRoute chạy trong Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Compose cho môi trường production](#production-compose)
- [Các stage của Dockerfile](#dockerfile-stages)
- [Các biến môi trường quan trọng](#critical-environment-variables)
- [Docker Compose với Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Các tag image](#image-tags)
- [Cập nhật dashboard trong Docker](#dashboard-updates-in-docker)
- [Tính sẵn sàng: SQLite mặc định chỉ hỗ trợ một replica](#availability-default-sqlite-is-single-replica)
- [Lỗi khu vực của Gemini bên trong Docker](#gemini-regional-errors-inside-docker)
- [Lưu ý quan trọng](#important-notes)

---

## Chạy nhanh

> **Tự host chỉ bằng một lệnh?** Hãy xem
> [Hướng dẫn tự host](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (image đã phát hành +
> Redis, chỉ loopback, không cần chọn profile). Phần Chạy nhanh bên dưới là
> phương thức dùng một container dành cho người dùng đã chạy Redis ở nơi khác.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Sử dụng tệp môi trường

```bash
# Trước tiên, sao chép và chỉnh sửa .env
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Docker Compose

```bash
# Profile cơ bản (không có công cụ CLI)
docker compose --profile base up -d

# Profile CLI (tích hợp sẵn Claude Code, Codex, OpenClaw)
docker compose --profile cli up -d

# Profile máy chủ (ưu tiên Linux; gắn các tệp nhị phân CLI của máy chủ ở chế độ chỉ đọc)
docker compose --profile host up -d

# Profile web (Chromium/Playwright dành cho các nhà cung cấp phiên web)
docker compose --profile web up -d

# Kết hợp CLI + sidecar CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Các profile có sẵn

OmniRoute cung cấp các profile Compose cho những mô hình triển khai chính. Hãy chọn profile phù hợp với môi trường của bạn.

| Profile           | Dịch vụ          | Khi nào nên sử dụng                                                                                                                                                | Lệnh                                         |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (mặc định) | `omniroute-base` | Máy chủ headless / runtime tối thiểu, không kèm theo CLI của nhà cung cấp                                                                                          | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | Các quy trình agent gọi `omniroute providers/setup/doctor` và các CLI đi kèm (Codex, Claude Code, Droid, OpenClaw)                                                 | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | Máy chủ Linux muốn có quyền truy cập tương tự `network_mode` vào các CLI trên máy chủ bằng cách gắn `~/.local/bin`, `~/.codex`, `~/.claude`, v.v. ở chế độ chỉ đọc | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Chạy sidecar [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) trên cổng `8317` để proxy CLI upstream                                                    | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | Các nhà cung cấp phiên web cần trình duyệt: `gemini-web`, `claude-web`, `claude-turnstile` (build `runner-web`, bao gồm Chromium)                                  | `docker compose --profile web up -d`         |

> Có thể kết hợp nhiều profile: `docker compose --profile cli --profile cliproxyapi up -d`.

## Cấu hình các công cụ CLI trên máy chủ khi OmniRoute chạy trong Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` và nút
**Lưu cấu hình** trên bảng điều khiển đều ghi các tệp như `~/.codex/*.config.toml`. Những đường dẫn này
chỉ có ý nghĩa trên máy nơi CLI thực sự chạy. Nếu chạy chúng bên trong
container, dữ liệu sẽ được ghi vào thư mục home riêng của container (`/home/node` —
image chạy với `USER node`), nơi không có CLI nào trên máy chủ đọc được và dữ liệu sẽ bị
xóa ngay khi container được tạo lại.

OmniRoute phát hiện trường hợp này và từ chối ghi, đồng thời đưa ra hướng dẫn thay vì
báo thành công nhưng không thể sử dụng: CLI thoát với mã `2`, còn API phản hồi `422`
với `containerEphemeralTarget: true`.

### Khuyến nghị: chạy CLI trên máy chủ, OmniRoute trong Docker

Container cung cấp API; CLI cấu hình các công cụ trên máy chủ của bạn.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # trỏ CLI đến container
omniroute setup-codex                      # ghi vào ~/.codex thực trên máy chủ của bạn
```

Đây là lựa chọn phù hợp khi Codex, Claude Code, Cursor hoặc các công cụ tương tự chạy trên
máy tính xách tay của bạn — đây cũng là cách thiết lập thông thường.

### Phương án thay thế: bind-mount các thư mục cấu hình của máy chủ (profile `host`)

Nếu bạn muốn chính container ghi cấu hình lên máy chủ, hãy mount các
thư mục vào container và trỏ `CLI_CONFIG_HOME` đến thư mục gốc của mount. Profile `host`
đã thực hiện sẵn việc này:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount là cơ chế giúp đường dẫn trở nên đáng tin cậy: OmniRoute đọc
`/proc/self/mountinfo` và cho phép ghi vào các đường dẫn đã được mount (cũng như các thư mục
có thư mục con là mount, đúng với cấu trúc `/host-home` ở trên), trong khi
vẫn từ chối các đường dẫn chưa được mount.

### Lối thoát: cấu hình các CLI riêng của container (chỉ dùng khi cần thiết)

Khi các CLI thực sự nằm bên trong container (profile `cli`), thao tác ghi
là có chủ đích. Truyền `--allow-container-write` cho bất kỳ lệnh `setup-*` nào hoặc đặt
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` cho máy chủ. Thao tác ghi sẽ được thực hiện
kèm theo cảnh báo rằng dữ liệu sẽ không tồn tại sau khi container bị xóa.

> **Cảnh báo bảo mật — profile `cli` + mount `docker.sock`.**
> Profile `cli` bind-mount `/var/run/docker.sock` để trình tự động cập nhật
> bên trong container có thể tạo lại stack thông qua daemon trên máy chủ
> (`src/lib/system/autoUpdate.ts` dò tìm socket đó và bỏ qua
> đường dẫn Docker khi không tìm thấy). Socket đó là **ranh giới tin cậy cấp root
> của máy chủ**: bất kỳ thành phần nào có thể truy cập socket đều điều khiển Docker daemon trên máy chủ với
> quyền root — nó có thể tạo, kiểm tra, dừng và xóa bất kỳ container nào trên máy chủ.
> Hệ quả:
>
> 1. **Tuyệt đối không để cổng của profile `cli` truy cập được từ mạng.** Chỉ công khai
>    cổng trên `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — nếu profile `cli` có thể được truy cập từ mạng LAN, mọi lỗ hổng RCE ở cấp
>    bảng điều khiển đều có thể dẫn đến việc toàn bộ máy chủ bị xâm phạm.
> 2. **Không bind thêm bất kỳ thư mục nào trên máy chủ vào profile `cli`.**
>    Docker socket kết hợp với bất kỳ mount bổ sung nào sẽ cấp cho container toàn quyền
>    đọc/ghi hệ thống tệp và cấu hình máy chủ của bạn. Nếu cần một công cụ
>    truy cập dự án, hãy chạy công cụ đó cục bộ bằng tệp nhị phân CLI — không mount dự án
>    vào container `cli`.
>
> Nếu không cần tự động cập nhật bên trong container, hãy tắt profile `cli`
> (`COMPOSE_PROFILES=core,redis` hoặc ngắn hơn). Các profile khác không
> mount Docker socket.
>
> Xem `docs/security/MITM-TPROXY-DECRYPT.md` (trong git; không được biên dịch vào `/docs`) để biết mô hình mối đe dọa liên quan
> đến MITM, và `docs/security/SUPPLY_CHAIN.md` để biết chuỗi nguồn gốc của các tệp nhị phân
> `codex`/`claude-code`/`droid`/`openclaw`.

## Redis Sidecar

OmniRoute sử dụng Redis để hỗ trợ bộ giới hạn tốc độ phân tán và bộ nhớ đệm dùng chung. Dịch vụ `redis` **luôn được định nghĩa** trong `docker-compose.yml` (không bị giới hạn bởi profile) và khởi động cùng với bất kỳ profile nào khác.

| Chi tiết                   | Giá trị                                     |
| -------------------------- | ------------------------------------------- |
| Image                      | `redis:7-alpine`                            |
| Tên container              | `omniroute-redis`                           |
| Cổng nội bộ                | `6379`                                      |
| Cổng host (ghi đè)         | `REDIS_PORT` (mặc định là `6379`)           |
| Địa chỉ bind host (ghi đè) | `REDIS_BIND_HOST` (mặc định là `127.0.0.1`) |
| Volume                     | `omniroute-redis-data` → `/data`            |
| Kiểm tra tình trạng        | `redis-cli ping` (khoảng thời gian 10 giây) |

Các biến môi trường liên quan:

- `REDIS_URL` — chuỗi kết nối được truyền vào ứng dụng (mặc định là `redis://redis:6379`).
- `REDIS_PORT` — ánh xạ cổng phía host cho container Redis.
- `REDIS_BIND_HOST` — giao diện mạng host nơi cổng được công khai. Mặc định là `127.0.0.1`.

> **Tại sao mặc định dùng loopback:** sidecar chạy mà không có `requirepass`, còn các container
> ứng dụng kết nối đến nó qua mạng compose (`redis:6379`) — cổng được công khai
> chỉ dành cho các công cụ phía host (`redis-cli`, một tiến trình `npm run dev` cục bộ). Việc công khai trên
> `0.0.0.0` sẽ khiến Redis không có xác thực bị phơi bày cho mọi host trong mạng LAN của bạn. Nếu bạn đặt
> `REDIS_BIND_HOST=0.0.0.0`, hãy thêm cả `--requirepass` vào `command:` của dịch vụ.

**Không nên vô hiệu hóa Redis** (bộ giới hạn tốc độ sẽ chuyển sang cơ chế dự phòng trong bộ nhớ với hiệu năng suy giảm). Nếu bắt buộc, hãy xóa/chú thích khối dịch vụ `redis:` trong `docker-compose.yml` hoặc thu nhỏ số lượng instance xuống 0:

```bash
docker compose up -d --scale redis=0
```

## Compose cho môi trường production

Để chạy một bản snapshot production độc lập song song với môi trường dev, hãy sử dụng `docker-compose.prod.yml`.

| Chi tiết                | Giá trị                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------ |
| Tệp                     | `docker-compose.prod.yml`                                                                        |
| Cổng dashboard mặc định | `PROD_DASHBOARD_PORT=20130` (được ánh xạ tới `${DASHBOARD_PORT:-20128}` nội bộ)                  |
| Cổng API mặc định       | `PROD_API_PORT=20131`                                                                            |
| Image                   | `omniroute:prod` (được build từ target `runner-cli`)                                             |
| Container Redis         | `omniroute-redis-prod` (`redis:8.6.2`, volume `redis-prod-data` chuyên dụng)                     |
| Volume dữ liệu          | `omniroute-prod-data` (có tên, được duy trì qua các lần build lại)                               |
| Kiểm tra tình trạng     | `node healthcheck.mjs` + `redis-cli ping`, với `depends_on` được ràng buộc theo tình trạng Redis |

Cách sử dụng:

```bash
# Build và khởi động stack production
docker compose -f docker-compose.prod.yml up -d --build

# Theo dõi log theo thời gian thực
docker compose -f docker-compose.prod.yml logs -f

# Dừng và gỡ bỏ (giữ lại các volume)
docker compose -f docker-compose.prod.yml down
```

Stack production chạy song song với compose dev (tên container, cổng và volume khác nhau), vì vậy bạn có thể tiếp tục lặp lại quá trình phát triển cục bộ trong khi môi trường production vẫn hoạt động.

## Các giai đoạn Dockerfile

Kho lưu trữ cung cấp một Dockerfile nhiều giai đoạn (`Dockerfile`). Có bốn giai đoạn được cung cấp; hãy chọn `target` phù hợp với trường hợp sử dụng của bạn.

| Giai đoạn     | Image cơ sở           | Mục đích                                                                                                                                                                                                                                                                                                       |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Cài đặt các dependency (`npm ci --legacy-peer-deps`) và chạy `npm run build` (mặc định dùng Turbopack — xem phần Tài nguyên khi build bên dưới)                                                                                                                                                                |
| `runner-base` | `node:26-trixie-slim` | Môi trường chạy production với đầu ra standalone của Next.js. **Không bao gồm CLI của nhà cung cấp.**                                                                                                                                                                                                          |
| `runner-cli`  | `runner-base`         | Bổ sung `git`, `docker.io`, `docker-compose` và các CLI toàn cục: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Chọn giai đoạn này cho các quy trình tác tử.**                                                                                                                          |
| `runner-web`  | `runner-base`         | Bổ sung Playwright + trình duyệt Chromium (`--with-deps`) cho các nhà cung cấp phiên web: `gemini-web`, `claude-web`, `claude-turnstile`. **Chọn giai đoạn này khi bạn sử dụng các nhà cung cấp đó** — image thông thường sẽ lỗi tại thời điểm yêu cầu nếu thiếu nó (xem ghi chú `-web` trong Kênh phát hành). |

Build thủ công một target cụ thể:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Tài nguyên khi build

Ba đối số build kiểm soát lượng tài nguyên mà giai đoạn `builder` tiêu tốn. Chúng chỉ áp dụng tại thời điểm build —
`OMNIROUTE_MEMORY_MB` (bên dưới) là một tùy chỉnh riêng cho thời gian chạy.

| Đối số build                | Mặc định | Tác dụng                                                                                         |
| --------------------------- | -------- | ------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`      | `0` build bằng webpack: mức sử dụng bộ nhớ đỉnh thấp hơn nhưng chậm hơn. `1` bật Turbopack.      |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | Giới hạn heap V8 (`--max-old-space-size`) cho tiến trình `next build` được khởi chạy.            |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | Truyền giá trị vào `CIRCLE_NODE_TOTAL`; Next suy ra `workers = N - 1` để thu thập dữ liệu trang. |

`OMNIROUTE_BUILD_WORKERS` là giá trị cần tăng trên một máy build lớn và là giá trị
cần nghi ngờ khi một bản build bị dừng **sau khi** `✓ Compiled successfully` trong
môi trường hạn chế tài nguyên. Mỗi worker xử lý dữ liệu trang là một tiến trình
riêng, và bản thân tiến trình cha `next build` cũng vậy; một lần tái hiện trực tiếp
trên VPS (issue #7518) đo được RSS đỉnh của mỗi tiến trình là ~4.5 GB, không phụ
thuộc vào cờ heap `NODE_OPTIONS` (Turbopack biên dịch trong bộ nhớ native/Rust nằm
ngoài heap V8). Giá trị mặc định `2` (→ 1 worker, tổng cộng 2 tiến trình) được định
cỡ cho các runner do GitHub lưu trữ với 16 GB / 4 vCPU mà pipeline phát hành sử
dụng. Với `8` (→ 7 worker), runner đó đã hết bộ nhớ và buildkit làm bước này thất
bại với `ResourceExhausted: ... cannot allocate memory`; `3` (→ 2 worker) vẫn
không vừa khi RSS trên mỗi tiến trình được đo trực tiếp thay vì suy luận.
`tests/unit/docker-build-memory-budget.test.ts` thực hiện phép tính dựa trên số
liệu đo được và sẽ thất bại nếu một trong hai tùy chỉnh vượt quá khả năng của
runner.

Turbopack biên dịch trong bộ nhớ Rust native nằm **ngoài** heap V8, vì vậy
`OMNIROUTE_BUILD_MEMORY_MB` không giới hạn được bộ nhớ đó. Trên máy chủ có giới
hạn bộ nhớ, bản build sau đó sẽ bị OOM killer gửi SIGKILL mà hoàn toàn không có
thông báo lỗi — nó chỉ đơn giản dừng giữa chừng tại `Creating an optimized production build`,
trông giống như bị treo hơn là hết bộ nhớ. Đó là lý do `Dockerfile` mặc định dùng
webpack (`OMNIROUTE_USE_TURBOPACK=0`), không giống `npm run dev` / `npm run build`,
nơi Turbopack là mặc định trong mã nguồn: một lệnh `docker build .` thuần túy
không có đối số build (cách Railway và các nền tảng triển khai một cú nhấp khác
thực thi) không được phép âm thầm bị dừng trên máy build bị giới hạn bộ nhớ. Các
image đã phát hành vốn đã truyền `OMNIROUTE_USE_TURBOPACK=0` một cách tường minh
trong `docker-publish.yml`. Trên máy build có nhiều RAM, hãy bật Turbopack để
build nhanh hơn:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` được bật, vì vậy `next build` chạy một tiến trình cha **và**
một tiến trình worker, đồng thời mỗi tiến trình tuân theo
`OMNIROUTE_BUILD_MEMORY_MB` một cách riêng biệt. Hãy đặt giới hạn bộ nhớ container
cao hơn khoảng gấp đôi giá trị đó, không phải chỉ bằng một lần.

Đo trên cây mã nguồn này (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Trình đóng gói | Giới hạn container | Kết quả                                      |
| -------------- | ------------------ | -------------------------------------------- |
| Turbopack      | 8 GiB / 16 GiB     | Bị OOM kill ở cả hai mức, không có thông báo |
| webpack        | 8 GiB              | Worker build bị SIGKILL                      |
| webpack        | 12 GiB             | Thành công, đạt đỉnh ở 11.1 GiB              |

### Giá trị mặc định khi chạy

Các giá trị mặc định được `runner-base` export: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Hành vi bộ nhớ trong Docker:

- Image đặt `OMNIROUTE_MEMORY_MB=1024` và từ đó suy ra `NODE_OPTIONS=--max-old-space-size=1024`.
- Tiến trình máy chủ thực tế được khởi chạy bởi trình khởi chạy độc lập; trình này đọc `OMNIROUTE_MEMORY_MB` và nối thêm `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node sử dụng giá trị `--max-old-space-size` được lặp lại sau cùng, vì vậy việc đặt `OMNIROUTE_MEMORY_MB` sẽ kiểm soát giới hạn heap Docker thực tế.
- Vì image luôn đặt biến này nên cơ chế dự phòng tự hiệu chỉnh theo RAM của trình khởi chạy không bao giờ được áp dụng trong Docker. Hãy tăng giá trị này một cách rõ ràng cho khối lượng công việc (bảng bên dưới). `2048` vẫn quá nhỏ cho `/v1/responses` của tác nhân lập trình.

### RAM khi chạy cho các tác nhân lập trình

Mức mặc định 1 GiB của Docker chỉ là ngưỡng tối thiểu dành cho bảng điều khiển/trò chuyện nhẹ, không phải mức dùng cho môi trường production. Các phần thân `POST /v1/responses` dài (hàng trăm tin nhắn, hàng chục công cụ) giữ lại nhiều đồ thị trong bộ nhớ trong quá trình nén. Hai yêu cầu chồng lấn, mỗi yêu cầu khoảng ~3 MiB / ~750k token, đã khiến V8 dừng bất thường ở mức old-space **12 GiB** (`FATAL ERROR: Reached heap limit`) và cũng gặp lỗi OOM cgroup 16 GiB. Xem [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Hãy đặt kích thước **cgroup `--memory` cao hơn heap** — bộ đệm native, SQLite và dữ liệu trung gian trong quá trình nén nằm ngoài V8.

| Khối lượng công việc                       | `OMNIROUTE_MEMORY_MB`           | Container / cgroup       | Ghi chú                                                                                                                  |
| ------------------------------------------ | ------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Bảng điều khiển, một phiên trò chuyện nhẹ  | `1024` (mặc định của image)     | ≥2 GiB                   |                                                                                                                          |
| Một tác nhân lập trình (Claude/Codex/Grok) | `8192`                          | ≥10 GiB                  | Một phiên `/v1/responses` điển hình                                                                                      |
| Hai `/v1/responses` dài đồng thời          | `10240`–`12288`                 | ≥12–16 GiB               | Đã đo được V8 dừng bất thường ở heap khoảng ~12 GiB                                                                      |
| Từ ba ngữ cảnh dài đồng thời trở lên       | không chạy trong một tiến trình | xử lý tuần tự / thêm RAM | Mặc định chỉ cho phép 1 yêu cầu nặng đang xử lý; tăng giới hạn này khi không có thêm RAM sẽ tái diễn lỗi dừng bất thường |

`omniroute serve` trên bare metal hiệu chỉnh ở mức khoảng 35% RAM (giới hạn trong `[512, 4096]`) khi `OMNIROUTE_MEMORY_MB` **chưa được đặt**. Docker luôn đặt `1024`, vì vậy quá trình hiệu chỉnh đó không bao giờ chạy trong image chính thức.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Các biến môi trường quan trọng

Ngoài các giá trị mặc định được ghi lại trong [ENVIRONMENT.md](../reference/ENVIRONMENT.md), các biến sau đây là quan trọng nhất khi chạy trong Docker:

| Biến                          | Mục đích                                                                                                                                                                                                                                                                          | Mặc định                      |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Bí mật dùng chung cho cầu nối WebSocket. **Bắt buộc trong môi trường production** — hãy đặt thành một chuỗi ngẫu nhiên mạnh.                                                                                                                                                      | chưa đặt (phải được cung cấp) |
| `REDIS_URL`                   | Chuỗi kết nối cho backend giới hạn tốc độ / bộ nhớ đệm                                                                                                                                                                                                                            | `redis://redis:6379`          |
| `REDIS_PORT`                  | Cổng phía host cho container Redis đi kèm                                                                                                                                                                                                                                         | `6379`                        |
| `REDIS_BIND_HOST`             | Giao diện mạng của host mà cổng Redis đi kèm được công bố trên đó (loopback trừ khi bạn thêm AUTH)                                                                                                                                                                                | `127.0.0.1`                   |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Đường dẫn trên host được gắn vào profile `cli` tại `/workspace/omniroute` cho các quy trình tự cập nhật                                                                                                                                                                           | `.` (thư mục hiện tại)        |
| `OMNIROUTE_MEMORY_MB`         | Giới hạn heap Node khi chạy cho máy chủ Docker độc lập; ghi đè giá trị mặc định của image ở trên. Các tác nhân lập trình: `8192`+ (xem [RAM khi chạy](#runtime-ram-for-coding-agents)).                                                                                           | `1024`                        |
| `DASHBOARD_PORT` / `API_PORT` | Ghi đè các cổng được công bố cho dashboard (20128) và API (20129)                                                                                                                                                                                                                 | `20128` / `20129`             |
| `APP_BIND_HOST`               | Giao diện mạng của host mà docker-compose công bố các cổng dashboard/API/live-WS trên đó. Với `REQUIRE_API_KEY=false` (mặc định), `0.0.0.0` sẽ mở proxy `/v1` ẩn danh cho mạng LAN — chỉ mở rộng phạm vi khi dùng `REQUIRE_API_KEY=true` hoặc đặt một reverse proxy ở phía trước. | `127.0.0.1`                   |
| `CLIPROXY_BIND_HOST`          | Giao diện mạng của host mà docker-compose công bố sidecar `cliproxyapi` trên đó — volume dữ liệu của nó chứa thông tin xác thực của nhà cung cấp.                                                                                                                                 | `127.0.0.1`                   |
| `OMNIROUTE_PLUGINS_DIR`       | Thư mục mà trình quét plugin trong runtime đọc và cài đặt vào. Hãy thiết lập biến này khi các plugin được bind-mount: giá trị mặc định phụ thuộc vào `HOME`, nhưng image không nhất thiết phải export biến này.                                                                   | `~/.omniroute/plugins`        |
| `OMNIROUTE_BASE_PATH`         | Đường dẫn con URL khi ứng dụng được công bố phía sau reverse proxy (ví dụ: `/omniroute`)                                                                                                                                                                                          | _(trống = thư mục gốc)_       |
| `NEXT_PUBLIC_BASE_URL`        | Origin công khai trên trình duyệt, bao gồm cả đường dẫn con (ví dụ: `https://host/omniroute`)                                                                                                                                                                                     | chưa đặt                      |
| `PROD_DASHBOARD_PORT`         | Cổng dashboard phía host cho `docker-compose.prod.yml`                                                                                                                                                                                                                            | `20130`                       |
| `CLIPROXYAPI_PORT`            | Cổng phía host cho sidecar `cliproxyapi`                                                                                                                                                                                                                                          | `8317`                        |

## Reverse Proxy trên đường dẫn con (Traefik / nginx)

`basePath` của Next.js được biên dịch vào bundle standalone. OmniRoute ghi lại giá trị
đã được nhúng trong một tệp sentinel tại thư mục gốc của ứng dụng (được ghi trong quá
trình `npm run build`; được đọc bởi `scripts/docker/ensure-docker-base-path.mjs`) và so
sánh giá trị đó với `OMNIROUTE_BASE_PATH` khi container khởi động. Khi các giá trị khác
nhau và image được build cho thư mục gốc của domain, entrypoint sẽ ghi lại các manifest
standalone, các literal `basePath`/`assetPrefix` được nhúng (Next 16 chỉ render URL tài
nguyên SSR từ `assetPrefix` — trình vá sẽ sao chép đường dẫn con vào đó), các URL tài
nguyên `/_next/static` được nhúng (manifest tham chiếu phía client, nội dung media được
import, các trang lỗi được prerender) và shim `process.env` phía client trước khi
`node dev/run-standalone.mjs` chạy.

### Build bằng Compose (khuyến nghị)

Đặt cả hai biến trong `.env`, sau đó build lại để image và môi trường runtime đồng nhất:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` chuyển tiếp `OMNIROUTE_BASE_PATH` dưới dạng build-arg của Docker và
biến môi trường runtime.

### Image gốc được build sẵn + đường dẫn con runtime

Các image `diegosouzapw/omniroute:*` đã phát hành được build cho thư mục gốc của domain.
Bạn vẫn có thể đặt `OMNIROUTE_BASE_PATH` tại runtime; container sẽ vá bundle một lần khi
khởi động. Hãy kết hợp biến này với origin công khai tương ứng:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Cấu hình reverse proxy để chuyển tiếp **toàn bộ** đường dẫn bên ngoài (không loại bỏ
prefix). Traefik nên định tuyến `PathPrefix(`/omniroute`)` đến container mà không dùng
`StripPrefix`, để Next.js nhận `/omniroute/...` và phục vụ tài nguyên từ
`/omniroute/_next/...`.

Healthcheck của Docker thăm dò endpoint vòng đời nhẹ `/healthz`, với prefix là
`OMNIROUTE_BASE_PATH` đang hoạt động. `/api/monitoring/health` vẫn khả dụng cho việc chẩn
đoán bởi con người/dashboard; để trỏ HEALTHCHECK của container trở lại endpoint này (ví
dụ nhằm thực thi kiểm tra sức khỏe chuyên sâu), hãy đặt
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Đường dẫn này là một phép kiểm tra
**chuyên sâu** (DB + bản tóm tắt giám sát) — phù hợp với `HEALTHCHECK` không thường xuyên
của Docker nếu bạn chọn bật lại, nhưng **không** phù hợp với các khoảng thời gian
`livenessProbe` của Kubernetes.

Đối với các trình điều phối (Kubernetes, Nomad, v.v.):

| Probe           | Nên dùng                                                               | Tránh                                                |
| --------------- | ---------------------------------------------------------------------- | ---------------------------------------------------- |
| Liveness        | HTTP `GET /livez`, hoặc TCP trên cổng chính (`PORT`, mặc định `20128`) | Dùng `/api/monitoring/health` làm liveness           |
| Readiness       | HTTP `GET /healthz`                                                    | Timeout quá ngắn khiến event loop bận bị xem là chết |
| Deep / blackbox | `/api/monitoring/health`                                               | —                                                    |

`/healthz` báo cáo vòng đời của tiến trình (`ok` / `starting` / `stopping`). `/livez`
chỉ kiểm tra tiến trình còn hoạt động (trả về 200 bất cứ khi nào handler có thể chạy;
endpoint này không chờ trạng thái sẵn sàng). Cả hai vẫn chạy trên cùng event loop Node
với việc xử lý request, vì vậy các tác vụ catalog hoặc nén sử dụng nhiều CPU có thể làm
chậm chúng — bận ≠ chết. Ưu tiên liveness qua TCP nếu các probe HTTP bị timeout. Hướng
dẫn đầy đủ về probe:
[Hướng dẫn giám sát — các khuyến nghị về probe Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose với Caddy (HTTPS Auto-TLS)

OmniRoute có thể được cung cấp an toàn bằng khả năng tự động cấp chứng chỉ SSL của Caddy. Hãy đảm bảo bản ghi DNS A của tên miền trỏ đến địa chỉ IP máy chủ của bạn.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Origin hướng đến trình duyệt dành cho callback OAuth, liên kết bảng điều khiển và các URL công khai được tạo.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL nội bộ giữa các máy chủ dành cho tác vụ theo lịch / yêu cầu tự truy xuất.
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

Caddy thiết lập các header chuyển tiếp tiêu chuẩn cho container thượng nguồn. OmniRoute sử dụng
`NEXT_PUBLIC_BASE_URL` làm origin công khai chuẩn cho callback OAuth và các liên kết công khai
được tạo; các thao tác ghi đã xác thực trên bảng điều khiển sử dụng yêu cầu cùng origin cùng với cơ chế bảo vệ CSRF
gắn với phiên. Chỉ bật `OMNIROUTE_TRUST_PROXY` cho các triển khai nâng cao khi bạn chủ động
muốn OmniRoute suy ra origin công khai từ các header chuyển tiếp đáng tin cậy thay vì cấu hình
tường minh.

## Cloudflare Quick Tunnel

Khả năng hỗ trợ bảng điều khiển cho các bản triển khai Docker bao gồm **Cloudflare Quick Tunnel** chỉ với một cú nhấp tại `Dashboard → Endpoints`. Lần bật đầu tiên chỉ tải xuống `cloudflared` khi cần, khởi chạy một tunnel tạm thời đến endpoint `/v1` hiện tại của bạn và hiển thị URL `https://*.trycloudflare.com/v1` được tạo ngay bên dưới URL công khai thông thường.

Các bảng tunnel endpoint (Cloudflare, Tailscale, ngrok) có thể được hiển thị hoặc ẩn tại `Settings → Appearance` mà không làm thay đổi trạng thái tunnel đang hoạt động.

### Lưu ý về tunnel

- URL Quick Tunnel chỉ là tạm thời và thay đổi sau mỗi lần khởi động lại.
- Quick Tunnel không được tự động khôi phục sau khi OmniRoute hoặc container khởi động lại. Hãy bật lại từ bảng điều khiển khi cần.
- Trình cài đặt được quản lý hiện hỗ trợ Linux, macOS và Windows trên `x64` / `arm64`.
- Quick Tunnel được quản lý mặc định sử dụng phương thức truyền tải HTTP/2 để tránh các cảnh báo ồn ào về bộ đệm UDP của QUIC trong môi trường container bị giới hạn. Đặt `CLOUDFLARED_PROTOCOL=quic` hoặc `auto` nếu bạn muốn sử dụng phương thức truyền tải khác.
- Các image Docker tích hợp sẵn chứng chỉ CA gốc của hệ thống và chuyển chúng đến `cloudflared` được quản lý, giúp tránh lỗi tin cậy TLS khi tunnel khởi tạo bên trong container.
- Đặt `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` nếu bạn muốn OmniRoute sử dụng tệp nhị phân hiện có thay vì tải xuống.

## Thẻ image

| Image                    | Thẻ      | Kích thước | Mô tả                                                            |
| ------------------------ | -------- | ---------- | ---------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB     | SemVer ổn định **đã phát hành** cao nhất (không phải git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB     | Ghim loại thẻ này cho GitOps                                     |

Manifest đa nền tảng: `linux/amd64` + `linux/arm64` nguyên bản (Apple Silicon, AWS Graviton, Raspberry Pi). Docker tự động chọn kiến trúc phù hợp; truyền `--platform linux/amd64` nếu bạn cần buộc giả lập AMD64 trên máy chủ ARM.

### Các kênh phát hành

OmniRoute phát hành các kênh Docker riêng biệt cho bản phát hành ổn định, hoạt động kiểm thử trên nhánh phát hành và bản dựng phát triển.

| Kênh                            | Nguồn                                    | Khả năng thay đổi                      | Mục đích sử dụng được khuyến nghị                                                                                                                   |
| ------------------------------- | ---------------------------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Bản phát hành đã ký/có phiên bản         | Bất biến                               | Các bản triển khai production ghim vào một bản phát hành cụ thể                                                                                     |
| `:latest` / `:latest-web`       | SemVer ổn định **đã phát hành** cao nhất | Con trỏ ổn định có thể thay đổi        | Theo các bản phát hành ổn định **sau khi** tác vụ phát hành SemVer hoàn tất — **không** theo dõi `main` hoặc các commit `release/v*` chưa phát hành |
| `:next` / `:next-web`           | Nhánh `release/v*` mặc định hiện tại     | Con trỏ tiền phát hành có thể thay đổi | Kiểm thử các bản sửa lỗi đã được đưa vào nhánh phát hành đang hoạt động nhưng chưa có trong bản phát hành ổn định                                   |
| `:main` / `:main-web`           | Nhánh `main`                             | Con trỏ phát triển có thể thay đổi     | Chỉ dành cho kiểm thử phát triển và tích hợp                                                                                                        |

#### Các nhà cung cấp phiên web: image `-web`

Mỗi kênh ở trên đều có thêm một thẻ `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), được dựng từ stage `runner-web` — cùng image đó nhưng có thêm Playwright và trình duyệt Chromium. Image thông thường được cung cấp **không kèm** Chromium; `gemini-web`, `claude-web` và `claude-turnstile` cần Chromium.

Lỗi xảy ra muộn hơn, không phải lúc khởi động: các nhà cung cấp đó vẫn liệt kê model và hiển thị là đã kết nối trong bảng điều khiển, và chỉ yêu cầu đầu tiên mới thất bại với thông báo

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Nếu bạn sử dụng các nhà cung cấp đó, hãy kéo thẻ `-web` của kênh mà bạn đang dùng — không có gì khác thay đổi. Với bản cài đặt npm/CLI (không dùng image Docker), thành phần tương ứng còn thiếu là tệp nhị phân của trình duyệt: chạy `npx playwright install chromium` trên máy chủ.

#### Sử dụng kênh tiền phát hành

Kênh `next` được dựng lại sau mỗi lần push vào nhánh `release/v*` mặc định hiện tại và được phát hành cho cả AMD64 lẫn ARM64. Các nhánh bảo trì cũ hơn không thể ghi đè lên kênh này. Kênh này cung cấp một image có thể pull chứa các bản sửa lỗi đã được merge vào nhánh phát hành đang hoạt động trước khi tag ổn định tiếp theo được tạo.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Đối với Docker Compose, hãy ghi đè tag image được profile đã chọn sử dụng, sau đó pull và tạo lại service:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### An toàn và khôi phục phiên bản

`next` là một kênh tiền phát hành không cố định. Kênh này có thể thay đổi sau bất kỳ lần push nào vào nhánh phát hành đang hoạt động và **không được hỗ trợ cho môi trường production**. Hãy cố định digest của image khi đánh giá một bản dựng cụ thể:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Trước khi kiểm thử, hãy sao lưu volume dữ liệu OmniRoute hoặc thư mục dữ liệu được bind mount. Để khôi phục phiên bản, hãy khôi phục phiên bản ổn định hoặc digest đã dùng trước đó và tạo lại container:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Một bản dựng từ nhánh phát hành không bao giờ có thể thay đổi `latest`; chỉ một phiên bản ngữ nghĩa ổn định đủ điều kiện mới có thể cập nhật con trỏ ổn định. Các image `next` vẫn duy trì bước kiểm tra image phát hành và cổng chặn đối với các lỗ hổng có mức độ CRITICAL.

**`latest` không đảm bảo luôn cập nhật theo git.** Các bản sửa lỗi đã được merge vào `main` hoặc nhánh `release/v*` đang hoạt động **không** có trong `:latest` cho đến khi một image SemVer ổn định được phát hành và tác vụ phát hành cập nhật `:latest` (cùng digest với SemVer đó). Nếu `latest` có vẻ không thay đổi trong khi GitHub đã hiển thị bản sửa lỗi, hãy pull `:next` để kiểm thử nhánh phát hành hoặc chờ tag SemVer.

| Bạn muốn                                                                       | Sử dụng                              |
| ------------------------------------------------------------------------------ | ------------------------------------ |
| GitOps / production không được phép sai lệch                                   | Cố định `:X.Y.Z` (hoặc digest image) |
| Theo dõi các bản ổn định đã phát hành và chấp nhận tạo lại ở mỗi bản phát hành | `:latest`                            |
| Kiểm thử các commit `release/v*` chưa phát hành                                | `:next` (không dùng cho production)  |
| Kiểm thử `main`                                                                | `:main` (không dùng cho production)  |

## Cập nhật dashboard trong Docker

Một container từ image đã phát hành không thể tự thay thế chính nó. Khi OmniRoute phát hiện rằng nó đang chạy bên trong một container (không có bản checkout `.git`, không phải bản cài đặt npm), biểu ngữ cập nhật trên dashboard chính sẽ hiển thị lệnh cần chạy trên máy chủ thay vì hướng dẫn npm/git, kèm theo nút sao chép:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Tên dịch vụ được lấy từ `AUTO_UPDATE_SERVICE` (mặc định là `omniroute`, dịch vụ trong
`docker-compose.selfhost.yml`). `pull` chỉ cập nhật một thẻ động (`latest`, `next`); với thẻ
`:X.Y.Z` được ghim cố định, hãy chỉnh sửa thẻ trước.

### Cập nhật bằng một cú nhấp chuột với tệp kích hoạt trên máy chủ

Để tiếp tục sử dụng được **Update Now** mà không cần gắn kết `/var/run/docker.sock` (việc này cấp cho container quyền root trên máy chủ — xem cảnh báo về profile `cli` ở trên), hãy đặt `DOCKER_UPDATE_TRIGGER_FILE` trên dịch vụ OmniRoute và chạy một trình theo dõi trên máy chủ:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Đường dẫn phải nằm bên trong `DATA_DIR` (các giá trị tương đối được phân giải dựa trên thư mục này); mọi đường dẫn khác đều bị từ chối. Sau đó, **Update Now** sẽ ghi `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` vào tệp đó, trả về `202`, và dashboard sẽ thăm dò `/api/system/version` cho đến khi phiên bản mới hoạt động rồi tải lại. OmniRoute không bao giờ chạy lệnh shell hoặc Docker trong chế độ này. Giống như mọi thao tác cập nhật, yêu cầu chỉ được chấp nhận từ các máy khách loopback/LAN.

Một thư mục dữ liệu được bind mount cung cấp cho máy chủ một đường dẫn ổn định để theo dõi. Các unit `systemd` mẫu (hãy điều chỉnh `/srv/omniroute` thành thư mục chứa tệp compose và `data/` của bạn):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Theo dõi các yêu cầu cập nhật từ dashboard OmniRoute

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Kéo image và tạo lại container OmniRoute

[Service]
Type=oneshot
WorkingDirectory=/srv/omniroute
ExecStartPre=/usr/bin/rm -f /srv/omniroute/data/update/docker-update.request
ExecStart=/bin/sh -c 'docker compose pull omniroute || (sleep 15 && docker compose pull omniroute)'
ExecStart=/usr/bin/docker compose up -d --force-recreate omniroute
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now omniroute-update.path
```

Dịch vụ xóa yêu cầu trước khi kéo image để một lần chạy thất bại không tạo thành vòng lặp. Nếu không có `DOCKER_UPDATE_TRIGGER_FILE`, dashboard sẽ tiếp tục sử dụng quy trình lệnh thủ công.

## Khả năng sẵn sàng: SQLite mặc định chỉ hỗ trợ một replica

Cấu hình Docker / Kubernetes OmniRoute tiêu chuẩn là **một tiến trình Node + một trình ghi SQLite**. Khả năng sẵn sàng cao **không được hỗ trợ** trên cấu trúc này.

| Ràng buộc                                     | Hệ quả                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Một trình ghi                                 | **Không** chạy nhiều replica dùng chung một tệp SQLite. Việc đó sẽ làm hỏng DB.                                                                                                                                                                                                                                                                                                              |
| Tạo lại / khởi động lại / bị HEALTHCHECK dừng | **Gián đoạn hoàn toàn** đối với các kết nối SSE đang hoạt động, phiên dashboard và trạng thái trong bộ nhớ. Mọi máy khách đang kết nối đều bị ngắt. Các yêu cầu mới trong khoảng thời gian không có endpoint sẽ nhận được lỗi **`502 Bad Gateway: Unknown error`** từ reverse proxy, không phải JSON của OmniRoute — máy khách không thể phân biệt lỗi này với lỗi từ nhà cung cấp (#11015). |
| Cùng event loop với `/healthz`                | Một lượt xử lý catalog hoặc nén bận có thể làm chậm các probe; timeout ngắn sau đó sẽ khởi động lại replica **duy nhất**.                                                                                                                                                                                                                                                                    |

**Ma trận probe** (xem thêm [khuyến nghị về probe Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe           | Mục tiêu                                                     | Không sử dụng                                             |
| --------------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| Liveness        | TCP trên `PORT` (mặc định `20128`), hoặc HTTP mềm `/healthz` | `/api/monitoring/health`                                  |
| Readiness       | HTTP `GET /healthz`                                          | Timeout ngắn coi event loop đang bận là đã dừng hoạt động |
| Sâu / con người | `/api/monitoring/health`                                     | Liveness tự động của kubelet                              |

**Nâng cấp:** mọi phiên đều sẽ bị ngắt. Hãy ngừng tiếp nhận máy khách nếu có thể; không có cập nhật cuốn chiếu trên SQLite mặc định. Compose `restart: unless-stopped` kết hợp với Docker `HEALTHCHECK` cũng sẽ thay thế tiến trình duy nhất khi container ở trạng thái Unhealthy — phạm vi ảnh hưởng là như nhau.

Đoạn cấu hình Kubernetes cho **một replica** (bắt buộc sử dụng Recreate; không tăng `replicas` khi chỉ dùng một tệp SQLite):

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

Khoảng chờ `preStop` cho phép kube loại bỏ các endpoint của Service trước SIGTERM để lưu lượng truy cập **mới** ngừng được chuyển đến tiến trình đang dừng. Các kết nối SSE `/v1/responses` đang diễn ra được chờ hoàn tất trong tối đa `SHUTDOWN_TIMEOUT_MS` (mặc định là 30 giây) thông qua các lease tiếp nhận heavyweight (#11015). Những yêu cầu mới vẫn đến được tiến trình sẽ nhận `503` + `Retry-After: 5`. Khoảng trống không có endpoint của Recreate cho đến khi bản thay thế ở trạng thái Ready vẫn là một sự cố gián đoạn hoàn toàn — đó là đặc điểm của cấu trúc liên kết SQLite, không phải do cấu hình probe sai.

Postgres bên ngoài / HA đa trình ghi **không** phải là một phương án mặc định đã được ghi tài liệu. Nếu cần HA, hãy duy trì một replica duy nhất hoặc chạy một cấu trúc liên kết đã được dự án kiểm thử và ghi tài liệu riêng. Công việc về Postgres/MySQL nằm trong [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Cho đến khi tính năng đó được phát hành, cách duy nhất được hỗ trợ để nhân rộng dung lượng `/v1/responses` **lớn** là chạy N tiến trình độc lập (phần tiếp theo), không phải `replicas > 1` trên cùng một volume.

## Mở rộng theo chiều ngang: N tiến trình độc lập

Một tiến trình Node tương ứng với **một heap V8**. Hai yêu cầu `POST /v1/responses` của coding agent (RTK + Caveman) chồng lấn, mỗi yêu cầu khoảng ~3 MiB / ~750k token, sẽ làm heap đó dừng ở khoảng ~12 Gi (`FATAL ERROR: Reached heap limit`) và có thể gây OOM cho một cgroup 16 Gi. Xem [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Phép đo đó là một cảnh báo về **ngân sách bộ nhớ**, không phải giới hạn tối đa cứng của sản phẩm ở mức hai yêu cầu `/v1/responses` dài chạy đồng thời. Việc tiếp nhận các yêu cầu chat nặng được kiểm soát bằng ngân sách byte đầu vào tự động suy ra (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), được định cỡ từ chính giới hạn V8/cgroup đó — việc ghi đè để tăng giá trị này (hoặc thiết lập giới hạn số lượng yêu cầu cũ `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) trên một tiến trình đã được định cỡ sẽ khiến lỗi dừng tiến trình tái diễn. Các yêu cầu chat nhỏ, `/healthz`, `/v1/models` và MCP **không** nằm trong giới hạn đó.

### Một tiến trình: nhiều hơn hai yêu cầu `/v1/responses` dài

Một tiến trình **khỏe mạnh** (heap thấp hơn `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, mặc định là `0.75`) **có thể** chạy đồng thời nhiều hơn hai yêu cầu `POST /v1/responses` dài khi ngân sách byte đang xử lý trên toàn tiến trình (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) vẫn còn dung lượng. Các phần thân yêu cầu có kích thước bằng hoặc lớn hơn `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (mặc định 256 KiB) sử dụng cùng một lease hạng nặng như các yêu cầu có cấu trúc phức tạp và dùng cùng cơ chế thoát `tryAcquireHealthyHeadroom` trong [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Việc có hàng chục máy khách SSE dài chạy đồng thời (các đơn vị vận hành thường cần 40–50) là vấn đề về **ngân sách bộ nhớ** — cần định cỡ heap + các slot chính/headroom + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — chứ không phải giới hạn cứng “tối đa 2” của sản phẩm. Khi heap chịu áp lực, tiến trình vẫn loại bớt yêu cầu bằng phản hồi `503` có thể thử lại để sự cố #7849 không tái diễn.

Để **nhân số lượng heap** (các old-space V8 độc lập) **ngay hôm nay**:

| Nên làm                                                                                                                                                                       | Không nên làm                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Chạy **N container/pod**, mỗi container/pod có `DATA_DIR` / volume **riêng**                                                                                                  | Đặt `replicas > 1` dùng chung một tệp SQLite                        |
| Định cỡ số yêu cầu nặng đang xử lý + healthy headroom dựa trên heap / ngân sách byte đang xử lý; 1–2 là mặc định thận trọng theo #7849, không phải giới hạn cứng của sản phẩm | Cấp cho một tiến trình RAM gấp 8 lần và giới hạn số lượng vô hạn    |
| Tùy chọn: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` để dùng **chung các bộ đếm hạn ngạch**                                                                         | Xem Redis như SQLite dùng chung — Redis không phải như vậy          |
| Sao chép các secret của nhà cung cấp sang từng instance (hoặc chấp nhận các dashboard bị phân tách)                                                                           | Kỳ vọng một dashboard / một nhật ký cuộc gọi trên mọi instance      |
| Đặt phía trước bất kỳ bộ cân bằng tải nào; sticky theo API key hoặc session là đủ                                                                                             | Yêu cầu middleware nhận biết kích thước dành riêng cho nhà cung cấp |

Phần cứng: số yêu cầu `/v1/responses` dài chạy đồng thời trên mỗi instance là vấn đề về **ngân sách bộ nhớ** (heap + byte đang xử lý / #10110). `N` `DATA_DIR` độc lập vẫn nhân số lượng heap: RAM của máy chủ phải đáp ứng `N × cgroup`, không phải “một pod 16 Gi với N=8”. Tuyệt đối không đặt `replicas > 1` dùng chung một tệp SQLite.

Ví dụ Compose (hai heap, hai volume — không phải `deploy.replicas: 2`):

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

Mật độ trong tiến trình (chuyển tác vụ nén ra khỏi HTTP isolate) được theo dõi tại [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Một cụm logic duy nhất dùng chung trạng thái bền vững được theo dõi tại [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Lỗi khu vực của Gemini bên trong Docker

Google AI Studio / Gemini API có thể trả về HTTP 400 với FAILED_PRECONDITION và
`User location is not supported for the API use.` Một yêu cầu thành công trên máy chủ
không chứng minh rằng container sử dụng cùng một tuyến đi ra ngoài. Thứ tự DNS,
khả năng kết nối IPv4/IPv6, định tuyến VPN và proxy được cấu hình có thể khác nhau. Hãy kiểm tra
[các khu vực được Google hỗ trợ](https://ai.google.dev/gemini-api/docs/available-regions)
cũng như tuyến kết nối thực tế; chỉ riêng lỗi này không cho thấy API key không hợp lệ.

### Ưu tiên proxy dành riêng cho kết nối

Sử dụng [cấu hình proxy theo từng kết nối](../ops/PROXY_GUIDE.md#4-level-proxy-system) của OmniRoute
cho kết nối Gemini bị ảnh hưởng, sau đó lặp lại **Kiểm tra kết nối** và một yêu cầu nhỏ
với cùng model. Điều này giới hạn thay đổi định tuyến trong phạm vi kết nối đó. Hãy xác minh
rằng container có thể truy cập proxy và kết nối thực sự chọn
proxy đó. Việc thay đổi tuyến không đảm bảo đáp ứng điều kiện khu vực của dịch vụ thượng nguồn.

### So sánh kết nối mạng của máy chủ và container

Giữ nguyên key, model và yêu cầu khi so sánh các kết quả đã xác thực; tuyệt đối không
dán thông tin xác thực, mật khẩu proxy hoặc toàn bộ header ủy quyền vào một issue.
Trước tiên, hãy kiểm tra các họ địa chỉ mà trình phân giải của hệ điều hành cung cấp bằng cách sử dụng cùng một lệnh
trên máy chủ và bên trong container:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Thay `omniroute` bằng service mà bạn chạy (ví dụ: `omniroute-web`). Các
lệnh này in ra các họ địa chỉ mà không để lộ thông tin xác thực hoặc địa chỉ IP. Giá trị `6`
được trả về chỉ cho biết có kết quả DNS IPv6: nó **không** chứng minh có một tuyến IPv6 khả dụng hoặc có quyền truy cập API.
Ở nơi đã cài đặt `curl`, hãy so sánh `curl -4 -I https://generativelanguage.googleapis.com`
với `curl -6 -I https://generativelanguage.googleapis.com` trong cả hai môi trường.
Một phản hồi HTTP chứng minh khả năng kết nối cho lần kiểm tra đó, ngay cả khi đó là lỗi
chưa xác thực; chỉ yêu cầu model đã xác thực mới kiểm tra được điều kiện sử dụng Gemini.

### Phương án thay thế ở cấp máy chủ: IPv6 hoạt động và chính sách trình phân giải

Người báo cáo [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) đã khôi phục
quyền truy cập trong môi trường của họ bằng cách bật IPv6 cho container và thay đổi cách
glibc lựa chọn địa chỉ. Hãy xem đây là một phương án thay thế dành riêng cho từng môi trường. Xác nhận IPv6 trên máy chủ
đang hoạt động, lưu lượng đi ra ngoài/định tuyến của container và các quy tắc tường lửa trước khi điều chỉnh tùy chọn của trình phân giải.
Chỉ riêng một địa chỉ ULA riêng tư không chứng minh có kết nối IPv6 công cộng.

Đối với các service đã được gắn vào mạng mặc định của Compose, đoạn cấu hình này sẽ bật
IPv6 trên mạng đó; hãy giữ nguyên phần còn lại của service, các cổng, volume và cấu hình:

```yaml
networks:
  default:
    enable_ipv6: true
```

Đối với mạng có tên, hãy bật tính năng này trên mạng mà service thực sự tham gia. Docker có thể
cấp phát một subnet ULA; chỉ chọn một subnet rõ ràng, không chồng lấn khi mạng của bạn
yêu cầu điều đó. Xem [kết nối mạng IPv6 của Docker](https://docs.docker.com/engine/daemon/ipv6/)
và [các tùy chọn mạng của Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Trên một **image dựa trên glibc**, `/etc/gai.conf` có thể thay đổi cách lựa chọn địa chỉ. Dockerfile
hiện tại của repository sử dụng Debian; các image tùy chỉnh dựa trên musl không dùng chung cơ chế này.
Điều chỉnh được báo cáo thay đổi nhãn ULA từ `label fc00::/7 6` thành
`label fc00::/7 1`. Hãy bắt đầu từ bảng chính sách đầy đủ của image và giữ nguyên các mục
khác: việc thêm một mục `label` hoặc `precedence` sẽ thay thế bảng mặc định đó, vì vậy một file
chỉ chứa dòng đã thay đổi là không đủ. Tài liệu
[tham khảo cấu hình glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
mô tả các quy tắc đó. Hãy bind-mount file đã được xem xét ở chế độ chỉ đọc vào `/etc/gai.conf`
và tạo lại service để áp dụng.

Thay đổi này tác động đến cách hệ điều hành lựa chọn địa chỉ cho **toàn bộ lưu lượng đi ra ngoài trong container đó**.
Nó không buộc mọi ứng dụng phải chọn IPv6: thứ tự DNS và cách lựa chọn kết nối
của Node cũng có ảnh hưởng. Cụ thể, `--dns-result-order=ipv4first` ưu tiên IPv4 và
không phải là giải pháp cho lỗi chỉ xảy ra với IPv4. Xem [thứ tự DNS của Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Hãy kiểm tra lại Gemini và các nhà cung cấp khác sau mọi thay đổi ở cấp máy chủ. Để hoàn tác,
hãy xóa mount `gai.conf` tùy chỉnh, khôi phục cấu hình mạng trước đó và
tạo lại service/mạng bị ảnh hưởng trong thời gian bảo trì. Việc tạo lại mạng
có thể làm gián đoạn các container khác đang kết nối với mạng đó; không xóa volume dữ liệu bền vững.

## Lưu ý quan trọng

- **Chế độ WAL của SQLite:** Cần cho phép `docker stop` hoàn tất để OmniRoute có thể checkpoint các thay đổi mới nhất trở lại `storage.sqlite`. Các tệp Compose đi kèm đã đặt thời gian chờ dừng là 40 giây. Nếu chạy image trực tiếp, hãy giữ `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Đặt thành `true` nếu các bản sao lưu định kỳ/trước khi ghi được quản lý bên ngoài. Việc di chuyển cơ sở dữ liệu hiện có vẫn yêu cầu một snapshot an toàn, bền vững riêng và cơ chế bảo vệ khi di chuyển hàng loạt.
- **Lưu trữ dữ liệu bền vững:** Luôn mount một volume vào `/app/data` để duy trì cơ sở dữ liệu, khóa và cấu hình qua các lần khởi động lại container.
- **Cấu hình cổng:** Ghi đè biến môi trường `PORT` để thay đổi cổng mặc định `20128`.

## Xem thêm

- [Hướng dẫn triển khai trên VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Thiết lập VM + nginx + Cloudflare
- [Hướng dẫn triển khai trên Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Triển khai lên Fly.io
- [Cấu hình môi trường](../reference/ENVIRONMENT.md) — Tài liệu tham chiếu `.env` đầy đủ
