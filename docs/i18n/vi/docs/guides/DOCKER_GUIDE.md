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

> **Tự lưu trữ trong một lệnh?** Xem [Hướng dẫn tự lưu trữ](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (hình ảnh đã xuất bản + Redis, chỉ lặp lại, không có lựa chọn cấu hình). Chạy nhanh bên dưới là đường dẫn một vùng chứa dành cho người dùng đã chạy Redis ở nơi khác.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Với tệp môi trường

```bash
# Copy and edit .env first
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
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

## Các giai đoạn của Dockerfile

Kho lưu trữ chứa Dockerfile nhiều giai đoạn (`Dockerfile`). Bốn giai đoạn được phơi bày; chọn `target` phù hợp cho trường hợp sử dụng của bạn.

| Sân khấu      | Hình ảnh cơ sở        | Mục đích                                                                                                                                                                                                                                                                                                             |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Cài đặt deps (`npm ci --legacy-peer-deps`) và chạy `npm run build` (Turbopack theo mặc định — xem Tài nguyên thời gian xây dựng bên dưới)                                                                                                                                                                            |
| `runner-base` | `node:26-trixie-slim` | Thời gian chạy sản xuất với đầu ra độc lập Next.js.** Không có nhà cung cấp CLIs đi kèm.**                                                                                                                                                                                                                           |
| `runner-cli`  | `runner-base`         | Thêm `git`, `docker.io`, `docker-compose` và CLIs toàn cầu : `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Chọn tùy chọn này cho quy trình làm việc tác nhân.**                                                                                                                               |
| `runner-web`  | `runner-base`         | Thêm Playwright + một trình duyệt Chrome (`--with-deps`) cho các nhà cung cấp phiên web: `gemini-web`, `claude-web`, `claude-turnstile`.** Chọn điều này khi bạn sử dụng các nhà cung cấp đó** — hình ảnh đơn giản không thành công tại thời điểm yêu cầu nếu không có nó (xem ghi chú `-web` trong Kênh phát hành). |

Xây dựng mục tiêu cụ thể theo cách thủ công:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Tài nguyên thời gian xây dựng

Ba đối số xây dựng kiểm soát chi phí của giai đoạn `builder`. Chúng chỉ có trong thời gian xây dựng — `OMNIROUTE_MEMORY_MB` (bên dưới) là một núm thời gian chạy riêng biệt.

| Xây dựng đối số             | Mặc định | Tác dụng                                                                                          |
| --------------------------- | -------- | ------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`      | xây dựng `0` bằng webpack: bộ nhớ tối đa thấp hơn, chậm hơn. `1` chọn tham gia Turbopack.         |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | Trần đống V8 (`--max-old-space-size`) cho `next build` sinh ra .                                  |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | Nguồn cấp dữ liệu `CIRCLE_NODE_TOTAL`; Tiếp theo lấy `workers = N - 1` để thu thập dữ liệu trang. |

`OMNIROUTE_BUILD_WORKERS` là người kêu gọi một người xây dựng lớn và là người nghi ngờ khi một công trình bị hạn chế chết** sau đó** `✓ Compiled successfully`. Mỗi nhân viên dữ liệu trang là một quy trình riêng và bản thân `next build` gốc cũng vậy; một bản sao VPS trực tiếp (vấn đề #7518) đã đo RSS đỉnh của mỗi quá trình ở ~ 4,5 GB độc lập với cờ heap `NODE_OPTIONS` (Turbopack biên dịch trong bộ nhớ native/Rust bên ngoài vùng heap V8). Mặc định của `2` (→ 1 worker, tổng cộng 2 quy trình) có kích thước cho 16 GB / 4 vCPU chạy trên máy chủ GitHub mà đường dẫn xuất bản sử dụng. Tại `8` (→ 7 công nhân), Á hậu đó đã hết bộ nhớ và buildkit không thực hiện được bước `ResourceExhausted: ... cannot allocate memory`; `3` (→ 2 công nhân) vẫn không phù hợp khi RSS trên mỗi quy trình được đo trực tiếp thay vì suy ra. `tests/unit/docker-build-memory-budget.test.ts` thực hiện phép tính số học so với số đo được và không thành công nếu một trong hai núm vượt quá đường chạy.

Turbopack biên dịch trong bộ nhớ Rust gốc tồn tại** ngoài** đống V8, vì vậy `OMNIROUTE_BUILD_MEMORY_MB` không ràng buộc nó. Trên máy chủ có trần bộ nhớ, bản dựng sau đó sẽ là SIGKILLed bởi OOM Killer mà không có văn bản lỗi nào cả — nó chỉ dừng ở giữa `Creating an optimized production build`, đọc giống như bị treo chứ không phải là hết bộ nhớ. Đó là lý do tại sao `Dockerfile` mặc định là webpack (`OMNIROUTE_USE_TURBOPACK=0`), không giống như `npm run dev` / `npm run build`, trong đó Turbopack là mã mặc định: một `docker build .` trần không có đối số xây dựng (những gì Đường sắt và các máy chủ một cú nhấp chuột khác chạy) không được chết lặng lẽ trên trình tạo giới hạn bộ nhớ. Các hình ảnh được xuất bản đã vượt qua `OMNIROUTE_USE_TURBOPACK=0` một cách rõ ràng trong `docker-publish.yml`. Trên trình tạo có nhiều RAM, hãy chọn tham gia Turbopack để xây dựng nhanh hơn:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` được bật, vì vậy `next build` chạy cha mẹ** Và** một quy trình công nhân và mỗi quy trình tôn vinh `OMNIROUTE_BUILD_MEMORY_MB` riêng biệt. Kích thước trần container ở trên gần gấp đôi giá trị đó chứ không phải một lần.

Đo trên cây này (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| người đóng gói | Trần container | Kết quả                          |
| -------------- | -------------- | -------------------------------- |
| Turbopack      | 8 GiB / 16 GiB | OOM-giết cả hai, âm thầm         |
| gói web        | 8 GiB          | công nhân xây dựng SIGKILLed     |
| gói web        | 12 GiB         | đã thành công, đạt đỉnh 11,1 GiB |

### Mặc định thời gian chạy

Mặc định được xuất bởi `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Hành vi bộ nhớ trong Docker:

- Hình ảnh đặt `OMNIROUTE_MEMORY_MB=1024` và lấy `NODE_OPTIONS=--max-old-space-size=1024` từ nó.
- Quá trình máy chủ thực tế được bắt đầu bởi trình khởi chạy độc lập, trình khởi chạy này đọc `OMNIROUTE_MEMORY_MB` và nối thêm `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Nút sử dụng giá trị `--max-old-space-size` lặp lại lần cuối, do đó, việc đặt `OMNIROUTE_MEMORY_MB` sẽ kiểm soát giới hạn vùng nhớ Docker hiệu quả.
- Bởi vì hình ảnh luôn đặt nó nên dự phòng hiệu chỉnh RAM của trình khởi chạy không bao giờ áp dụng theo Docker. Tăng nó một cách rõ ràng cho khối lượng công việc (bảng bên dưới). `2048` vẫn còn quá nhỏ đối với tác nhân mã hóa `/v1/responses`.

### Thời gian chạy RAM cho các tác nhân mã hóa

Mặc định 1 GiB Docker là sàn dashboard/light-chat, không phải quy mô sản xuất. Phần thân `POST /v1/responses` dài (hàng trăm tin nhắn, hàng chục công cụ) giữ lại nhiều biểu đồ trong bộ nhớ trong quá trình nén. Hai yêu cầu mã thông báo ~ 3 MiB / ~ 750k chồng chéo đã hủy bỏ V8 tại một** 12 GiB** không gian cũ (`FATAL ERROR: Reached heap limit`) và cũng đạt 16 GiB cgroup OOM. Xem [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Kích cỡ** cgroup `--memory` phía trên heap** bộ đệm gốc —, SQLite và các trung gian nén nằm bên ngoài V8.

| Khối lượng công việc                           | `OMNIROUTE_MEMORY_MB`        | Vùng chứa / nhóm       | Ghi chú                                                                                                    |
| ---------------------------------------------- | ---------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| Trang tổng quan, một cuộc trò chuyện nhẹ nhàng | `1024` (hình ảnh mặc định)   | ≥2 GiB                 |                                                                                                            |
| Một tác nhân mã hóa (Claude/Codex/Grok)        | `8192`                       | ≥10 GiB                | `/v1/responses` một phiên điển hình                                                                        |
| Hai `/v1/responses` dài đồng thời              | `10240`–`12288`              | ≥12–16 GiB             | Đã đo V8 bị hủy bỏ ở ~ 12 GiB                                                                              |
| Ba bối cảnh dài đồng thời +                    | không làm trên một quy trình | tuần tự hóa / thêm RAM | Tỷ lệ nhập học hạng nặng mặc định là 1 trên chuyến bay; nuôi nó mà không có RAM giới thiệu lại việc hủy bỏ |

`omniroute serve` trên kim loại trần hiệu chỉnh ~ 35% RAM ( `[512, 4096]` được kẹp) khi `OMNIROUTE_MEMORY_MB`** bỏ đặt** . Docker luôn đặt `1024`, do đó hiệu chuẩn không bao giờ chạy trong hình ảnh chính thức.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
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

## Proxy ngược trên đường dẫn phụ (Traefik/nginx)

Next.js `basePath` được biên dịch thành gói độc lập. OmniRoute ghi lại giá trị đã nướng trong tệp canh gác ở thư mục gốc của ứng dụng (được viết trong `npm run build`; được đọc bởi `scripts/docker/ensure-docker-base-path.mjs`) và so sánh nó với `OMNIROUTE_BASE_PATH` khi vùng chứa khởi động. Khi chúng khác nhau và hình ảnh được tạo cho miền gốc, điểm nhập sẽ ghi lại các tệp kê khai độc lập, các ký tự `basePath`/`assetPrefix` được nhúng (Phần 16 tiếp theo hiển thị nội dung SSR URLs chỉ từ `assetPrefix` —, trình vá lỗi phản ánh đường dẫn con vào đó), nội dung `/_next/static` đã nướng URLs (các bảng kê khai tham chiếu máy khách, nhập phương tiện, các trang lỗi được hiển thị trước) và `process.env` shim máy khách trước khi `node dev/run-standalone.mjs` chạy.

### Soạn bản dựng (được đề xuất)

Đặt cả hai biến trong `.env`, sau đó xây dựng lại để hình ảnh và thời gian chạy đồng ý:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` chuyển tiếp `OMNIROUTE_BASE_PATH` dưới dạng Docker build-arg và dưới dạng biến môi trường thời gian chạy.

### Đường dẫn con thời gian chạy + hình ảnh gốc dựng sẵn

Hình ảnh `cheaperinference/omniroute:*` đã xuất bản được xây dựng cho miền gốc. Bạn vẫn có thể đặt `OMNIROUTE_BASE_PATH` khi chạy; vùng chứa sẽ vá gói đó một lần khi khởi động. Ghép nối nó với nguồn gốc công khai phù hợp:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Định cấu hình proxy ngược để chuyển tiếp** đầy** đường dẫn bên ngoài (không loại bỏ tiền tố). Traefik nên định tuyến `PathPrefix(`/omniroute `)` đến vùng chứa không có `StripPrefix`, để Next.js nhận `/omniroute/...` và phân phát nội dung từ `/omniroute/_next/...`.

Kiểm tra sức khỏe Docker thăm dò điểm cuối vòng đời `/healthz` hạng nhẹ có tiền `OMNIROUTE_BASE_PATH` hoạt động. `/api/monitoring/health` vẫn có sẵn để chẩn đoán human/dashboard ; để trỏ lại vùng chứa HEALTHCHECK vào nó (ví dụ: để thực thi sức khỏe sâu), hãy đặt `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Con đường đó là một** sâu** kiểm tra (DB + tóm tắt giám sát) — phù hợp với `HEALTHCHECK` không thường xuyên của Docker nếu bạn chọn tham gia lại, nhưng** không** cho các khoảng `livenessProbe` Kubernetes.

Dành cho người điều phối (Kubernetes, Nomad, v.v.):

| thăm dò           | Thích hơn                                                             | Tránh xa                                                    |
| ----------------- | --------------------------------------------------------------------- | ----------------------------------------------------------- |
| Sự sống động      | HTTP `GET /livez` hoặc TCP trên cổng chính (`PORT`, `20128` mặc định) | `/api/monitoring/health` như sự sống động                   |
| Sẵn sàng          | HTTP `GET /healthz`                                                   | Thời gian chờ chặt chẽ coi vòng lặp sự kiện bận như đã chết |
| Hộp sâu / hộp đen | `/api/monitoring/health`                                              | —                                                           |

`/healthz` báo cáo vòng đời của quá trình (`ok` / `starting` / `stopping`). `/livez` chỉ hoạt động trong quá trình (200 bất cứ khi nào trình xử lý có thể chạy; nó không chờ sẵn sàng). Cả hai vẫn chạy trên cùng một vòng lặp sự kiện Node khi xử lý yêu cầu, do đó, công việc nén hoặc danh mục giới hạn CPU có thể khiến chúng bị trì hoãn — bận ≠ chết. Thích sự sống động TCP nếu HTTP thăm dò hết thời gian. Hướng dẫn thăm dò đầy đủ: [Hướng dẫn giám sát — Đề xuất thăm dò Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Soạn với Caddy (HTTPS Auto-TLS)

OmniRoute có thể được hiển thị một cách an toàn bằng cách sử dụng tính năng cung cấp SSL tự động của Caddy. Đảm bảo bản ghi DNS A của miền của bạn trỏ đến IP của máy chủ của bạn.

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Browser-facing origin for OAuth callbacks, dashboard links, and generated public URLs.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Internal server-to-server URL for scheduled jobs / self-fetches.
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

Caddy đặt tiêu đề chuyển tiếp tiêu chuẩn cho vùng chứa ngược dòng. OmniRoute sử dụng `NEXT_PUBLIC_BASE_URL` làm nguồn gốc công khai chuẩn cho các lệnh gọi lại OAuth và các liên kết công khai được tạo; Việc ghi bảng điều khiển đã xác thực sử dụng các yêu cầu có cùng nguồn gốc cộng với tính năng bảo vệ CSRF theo phiên. Chỉ bật `OMNIROUTE_TRUST_PROXY` cho các triển khai nâng cao mà bạn cố tình muốn OmniRoute lấy nguồn gốc công khai từ các tiêu đề được chuyển tiếp đáng tin cậy thay vì cấu hình rõ ràng.

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

## Thẻ hình ảnh

| Hình ảnh                     | Nhãn     | Kích cỡ | Sự miêu tả                                                        |
| ---------------------------- | -------- | ------- | ----------------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250MB | Cao nhất** được xuất bản** SemVer ổn định (không phải git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250MB | Ghim lớp thẻ này cho GitOps                                       |

Các hình ảnh tương tự được xuất bản lên ba kho lưu trữ, với cùng một bản tóm tắt cho mỗi kiến trúc: `cheaperinference/omniroute` (Docker Hub, tổ chức Suy luận rẻ hơn, từ 3.8.53 trở đi), `ghcr.io/cheaper-inference/omniroute` và `diegosouzapw/omniroute` kế thừa, lưu giữ lịch sử kéo của nó và vẫn nhận được mọi bản phát hành. Triển khai `diegosouzapw/omniroute` hiện tại tiếp tục cập nhật; chuyển đổi tên hình ảnh là tùy chọn. Kênh phát hành trước `:next` / `:next-web` bên dưới chỉ được xuất bản lên `diegosouzapw/omniroute` và GHCR.

Bảng kê khai đa nền tảng: `linux/amd64` + `linux/arm64` bản địa (Apple Silicon, AWS Graviton, Raspberry Pi). Docker tự động chọn kiến trúc phù hợp; vượt qua `--platform linux/amd64` nếu bạn cần buộc mô phỏng AMD64 trên máy chủ ARM.

### Kênh phát hành

OmniRoute xuất bản các kênh Docker riêng biệt cho các bản phát hành ổn định, thử nghiệm nhánh phát hành đang hoạt động và các bản dựng phát triển.

| Kênh                            | Nguồn                                     | Khả năng thay đổi                       | Khuyến nghị sử dụng                                                                                                                                             |
| ------------------------------- | ----------------------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | phát hành Signed/versioned                | bất biến                                | Triển khai sản xuất nhằm ghim một bản phát hành chính xác                                                                                                       |
| `:latest` / `:latest-web`       | Cao nhất** được xuất bản** SemVer ổn định | Con trỏ ổn định có thể thay đổi         | Theo dõi các bản phát hành ổn định** sau đó** công việc xuất bản SemVer — thực hiện** không** theo dõi các cam kết `main` hoặc `release/v*` chưa được phát hành |
| `:next` / `:next-web`           | Nhánh `release/v*` mặc định hiện tại      | Con trỏ phát hành trước có thể thay đổi | Kiểm tra các bản sửa lỗi đã có trên nhánh phát hành đang hoạt động nhưng chưa ở bản phát hành ổn định                                                           |
| `:main` / `:main-web`           | chi nhánh `main`                          | Con trỏ phát triển có thể thay đổi      | Chỉ thử nghiệm phát triển và tích hợp                                                                                                                           |

#### Nhà cung cấp phiên web: hình ảnh `-web`

Mọi kênh ở trên đều đóng vai trò như một thẻ `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), được xây dựng từ giai đoạn `runner-web` — cùng một hình ảnh cộng với Playwright và trình duyệt Chrome. Hình ảnh đơn giản của tàu** không có** crom; `gemini-web`, `claude-web` và `claude-turnstile` cần nó.

Lỗi được hoãn lại, không phải thời gian khởi động: các nhà cung cấp đó liệt kê các mô hình của họ và hiển thị là đã kết nối trong bảng điều khiển và chỉ yêu cầu đầu tiên không thành công với

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Nếu bạn sử dụng các nhà cung cấp đó, hãy kéo thẻ `-web` của kênh bạn đã sử dụng — không có gì thay đổi khác. Khi cài đặt npm/CLI (không có hình ảnh Docker ), phần còn thiếu tương đương là tệp nhị phân của trình duyệt: chạy `npx playwright install chromium` trên máy chủ.

#### Sử dụng kênh phát hành trước

Kênh `next` được xây dựng lại sau mỗi lần đẩy tới nhánh `release/v*` mặc định hiện tại và được xuất bản cho cả AMD64 và ARM64. Các nhánh bảo trì cũ hơn không thể ghi đè lên nó. Kênh này cung cấp hình ảnh có thể kéo được cho các bản sửa lỗi đã hợp nhất vào nhánh phát hành đang hoạt động trước khi cắt thẻ ổn định tiếp theo.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Đối với Docker Compose, ghi đè thẻ hình ảnh được cấu hình đã chọn sử dụng, sau đó kéo và tạo lại dịch vụ:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### An toàn và khôi phục

`next` là kênh phát hành trước nổi. Nó có thể thay đổi khi có bất kỳ lần đẩy nào tới nhánh phát hành đang hoạt động và được** không được hỗ trợ cho việc sử dụng sản xuất** . Ghim thông báo hình ảnh trong khi đánh giá một bản dựng cụ thể:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Trước khi kiểm tra, hãy sao lưu khối lượng dữ liệu OmniRoute hoặc thư mục dữ liệu được gắn kết. Để quay lại, hãy khôi phục phiên bản ổn định đã sử dụng trước đó hoặc phân tích và tạo lại vùng chứa:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Bản dựng nhánh phát hành không bao giờ có thể di chuyển `latest`; chỉ phiên bản ngữ nghĩa ổn định đủ điều kiện mới có thể quảng bá con trỏ ổn định. Các hình ảnh `next` giữ lại việc kiểm tra hình ảnh phát hành và chặn cổng lỗ hổng TIÊU CHUẨN.

**`latest` không phải là sự đảm bảo tiền tệ cho git.** Các bản sửa lỗi đã hợp nhất trên `main` hoặc trên nhánh `release/v*` đang hoạt động là** không** trong `:latest` cho đến khi hình ảnh SemVer ổn định được xuất bản và công việc xuất bản quảng bá `:latest` (thông báo tương tự như SemVer). Nếu `latest` có vẻ bị treo trong khi GitHub đã hiển thị bản sửa lỗi, hãy kéo `:next` để kiểm tra nhánh phát hành hoặc đợi thẻ SemVer.

| Bạn muốn                                                                    | Sử dụng                                 |
| --------------------------------------------------------------------------- | --------------------------------------- |
| GitOps / sản xuất không được trôi dạt                                       | Ghim `:X.Y.Z` (hoặc thông báo hình ảnh) |
| Theo dõi các chuồng đã xuất bản và chấp nhận tạo lại trên mỗi bản phát hành | `:latest`                               |
| Kiểm tra các cam kết `release/v*` chưa được phát hành                       | `:next` (không sản xuất)                |
| Kiểm tra `main`                                                             | `:main` (không sản xuất)                |

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

## Tính khả dụng: SQLite mặc định là bản sao đơn

Cổ phiếu Docker / Kubernetes OmniRoute là** một quy trình nút + một nhà văn SQLite** . Tính sẵn sàng cao là** không được hỗ trợ** trên cấu trúc liên kết đó.

| ràng buộc                                   | Kết quả                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nhà văn độc thân                            | LÀM** không** chạy nhiều bản sao đối với cùng một tệp SQLite. Điều đó làm hỏng DB.                                                                                                                                                                                                                                                                                   |
| Tái tạo/khởi động lại/tiêu diệt HEALTHCHECK | **Mất điện hoàn toàn** về SSE trong chuyến bay, các phiên trên trang tổng quan và trạng thái trong bộ nhớ. Mọi máy khách được kết nối đều bị rớt. Các yêu cầu mới trong cửa sổ điểm cuối trống sẽ nhận được proxy ngược**`502 Bad Gateway: Unknown error`** , không phải OmniRoute JSON — khách hàng không thể phân biệt điều này với lỗi của nhà cung cấp (#11015). |
| Vòng lặp sự kiện tương tự như `/healthz`    | Danh mục bận rộn hoặc đánh dấu nén có thể trì hoãn việc thăm dò; một thời gian chờ ngắn sau đó khởi động lại** chỉ một** bản sao.                                                                                                                                                                                                                                    |

**Ma trận thăm dò** (xem thêm [đề xuất thăm dò Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| thăm dò         | Mục tiêu                                                     | không sử dụng                                               |
| --------------- | ------------------------------------------------------------ | ----------------------------------------------------------- |
| Sự sống động    | TCP trên `PORT` ( `20128` mặc định) hoặc HTTP `/healthz` mềm | `/api/monitoring/health`                                    |
| Sẵn sàng        | HTTP `GET /healthz`                                          | Thời gian chờ chặt chẽ coi vòng lặp sự kiện bận như đã chết |
| Sâu / con người | `/api/monitoring/health`                                     | Hoạt động kubelet tự động                                   |

**Nâng cấp:** mong mỗi phiên sẽ giảm. Hãy rút cạn khách hàng nếu bạn có thể; không có bản cập nhật luân phiên trên SQLite mặc định. Soạn `restart: unless-stopped` cộng với Docker `HEALTHCHECK` cũng sẽ thay thế quy trình duy nhất khi vùng chứa không tốt - cùng bán kính vụ nổ.

Các bảng kê khai được tạo sẵn và biểu đồ Helm tồn tại ở `deploy/kubernetes/` và `deploy/helm/omniroute/` — xem [hướng dẫn triển khai Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Đoạn mã Kubernetes cho một** bản sao duy nhất** (Cần phải tạo lại; không nâng `replicas` lên một tệp SQLite ):

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

`preStop` sleep cho phép kube bỏ điểm cuối dịch vụ trước SIGTERM vậy** mới** giao thông dừng lại quá trình chết. `/v1/responses` SSE trên chuyến bay được tiêu tốn tới `SHUTDOWN_TIMEOUT_MS` (mặc định là 30 giây) thông qua hợp đồng thuê nhập học hạng nặng (#11015). Các yêu cầu mới vẫn đạt được quy trình sẽ nhận được `503` + `Retry-After: 5`. Khoảng trống điểm cuối trống cho đến khi thay thế sẵn sàng vẫn bị ngừng hoạt động nghiêm trọng — đó là cấu trúc liên kết SQLite, không phải là cấu hình sai thăm dò.

Postgres bên ngoài / HA nhiều người viết là** không** một đường dẫn chứng khoán được ghi lại. Nếu bạn cần HA, hãy giữ một bản sao duy nhất hoặc chạy cấu trúc liên kết mà dự án đã kiểm tra và ghi lại riêng biệt. Công việc Postgres/MySQL tồn tại ở [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Cho đến khi tàu được vận chuyển, cách duy nhất được hỗ trợ để nhân lên** lớn** dung lượng `/v1/responses` là N quy trình độc lập (phần tiếp theo), không phải `replicas > 1` trên một ổ đĩa.

## Mở rộng quy mô: N quy trình độc lập

### quyền sở hữu xoay vòng mã thông báo Codex

Bản sao của một tài khoản Codex không được sử dụng độc lập mã thông báo làm mới sử dụng một lần. Trên các trường hợp chỉ sử dụng thông tin xác thực được đồng bộ hóa, hãy đặt `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (bí danh `cx`). Để nó không được đặt trên chủ sở hữu vòng quay duy nhất. Mỗi tiến trình vẫn cần có `DATA_DIR` riêng; tùy chọn này không chia sẻ SQLite cũng như không cung cấp đồng bộ hóa mã thông báo hoặc khóa phân tán.

Phiên bản thụ động đọc lại kết nối khi cần làm mới và chỉ chấp nhận một mã thông báo truy cập khác, chưa hết hạn. Nếu không, việc làm mới sẽ bị vô hiệu hóa mà không hết hạn hoặc hủy kích hoạt kết nối hoặc tính lỗi ngắt làm mới. Lỗi xác thực ngược dòng thực sự vẫn sử dụng tính toán lỗi thông thường, thời gian hồi chiêu theo cấp số nhân và lỗi máy khách thông thường; việc vô hiệu hóa tài khoản vẫn còn vĩnh viễn. Đồng bộ hóa mã thông báo đã xoay vòng của chủ sở hữu trước khi mã thông báo truy cập hết hạn (thời gian làm mới chủ động mặc định là năm phút) hoặc nhập lại tệp xác thực Codex. Nhập thụ động lưu trữ mã thông báo được cung cấp mà không xác thực chúng tại điểm cuối mã thông báo. Làm mới dashboard/API thủ công trả về `409 refresh_disabled`; thông tin đăng nhập OAuth mới không thay đổi. Xem [tài liệu tham khảo môi trường](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

Quá trình một nút là** một đống V8** . Hai ~ 3 MiB / ~ 750k-token mã hóa-agent `POST /v1/responses` (RTK + Caveman) chồng chéo hủy bỏ đống đó ở ~ 12 Gi (`FATAL ERROR: Reached heap limit`) và có thể OOM a 16 Gi cgroup. Xem [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Phép đo đó là một** ngân sách bộ nhớ** cảnh báo, không phải là sản phẩm hard-max của hai `/v1/responses` dài đồng thời. Quyền truy cập trò chuyện hạng nặng được kiểm soát bởi ngân sách byte nhập vào có nguồn gốc tự động (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) có kích thước từ cùng mức V8/cgroup trần — ghi đè lên trên (hoặc đặt giới hạn số lượng yêu cầu `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` cũ) trên một quy trình đã có kích thước sẵn sẽ giới thiệu lại việc hủy bỏ. Các cuộc trò chuyện nhỏ, `/healthz`, `/v1/models` và MCP là** không** trong chiếc mũ đó.

### Một quy trình: nhiều hơn hai `/v1/responses` dài

MỘT** khỏe mạnh** quá trình (đống bên dưới `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, `0.75` mặc định )** có thể** chạy nhiều hơn hai `POST /v1/responses` dài đồng thời khi ngân sách byte trong toàn bộ quy trình (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) vẫn còn chỗ. Các phần bằng hoặc cao hơn `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (mặc định 256 KiB) nhận cùng mức thuê hạng nặng như các yêu cầu nặng về cấu trúc và sử dụng cùng một lối thoát [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Hàng chục máy khách SSE dài đồng thời (người vận hành thường cần 40–50) là một** ngân sách bộ nhớ** câu hỏi — size heap + primary/headroom slot + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — không phải là giới hạn sản phẩm cứng “tối đa 2”. Một đống bị nén vẫn bị loại bỏ với `503` có thể thử lại nên #7849 không quay trở lại.

ĐẾN** nhân đống** (không gian cũ V8 độc lập)** Hôm nay** :

| LÀM                                                                                                                                                                                       | Đừng                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Chạy** N containers/pods** , mỗi cái có** sở hữu** `DATA_DIR` / khối lượng                                                                                                                | Đặt `replicas > 1` dựa trên một tệp SQLite                                   |
| Kích thước khoảng không gian lành mạnh + nặng trên chuyến bay từ ngân sách heap / trên chuyến bay-byte; 1–2 là giá trị mặc định #7849 thận trọng, không phải mức tối đa của sản phẩm cứng | Cung cấp cho một quy trình 8 × RAM và giới hạn số lượng không giới hạn       |
| Tùy chọn: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` cho** quầy hạn ngạch được chia sẻ**                                                                                        | Hãy coi Redis như SQLite — được chia sẻ thì không phải vậy                   |
| Sao chép bí mật của nhà cung cấp vào từng phiên bản (hoặc chấp nhận bảng thông tin được phân vùng)                                                                                        | Yêu cầu một bảng thông tin/một nhật ký cuộc gọi trên các phiên bản           |
| Mặt trước có bất kỳ bộ cân bằng tải nào; dính bằng API key hoặc session là đủ                                                                                                             | Yêu cầu phần mềm trung gian nhận biết kích thước dành riêng cho nhà cung cấp |

Mối quan hệ giữa phiên với tài khoản cũng có thể được chia sẻ thông qua Redis: đặt `OMNIROUTE_SESSION_AFFINITY_STORE=redis` và `REDIS_URL` trên mỗi quy trình, với cùng `REDIS_KEY_PREFIX` và cài đặt `sessionAffinityTtlMs` dương. Các ghim phân giải danh tính tài khoản sử dụng đã băm cho kết nối cục bộ đủ điều kiện của từng quy trình, do đó, các tài khoản OAuth có siêu dữ liệu nhận dạng phù hợp không cần phải có kết nối phù hợp IDs. Danh tính tài khoản đã biết được ưu tiên hơn IDs cục bộ mâu thuẫn trong độ phân giải mã pin và trục xuất được bảo vệ; hồ sơ không có danh tính (hoặc người gọi bị trục xuất không có danh tính) vẫn giữ lại phần bảo vệ ID kế thừa. Các tài khoản không có danh tính sử dụng ổn định vẫn yêu cầu IDs khớp. lỗi Redis hoặc cuộc gọi vượt quá 100 ms sẽ quay trở lại SQLite cục bộ. Mỗi cửa hàng ái lực Redis giới hạn các hoạt động nổi bật ở mức 8, bỏ qua Redis ngay lập tức khi đầy và chỉ giải phóng các vị trí khi công việc cơ bản đã giải quyết chứ không phải vào thời hạn của người gọi. Trong thời gian ngừng hoạt động Redis không có sự thật chung nào: mỗi phiên bản quay trở lại mối quan hệ cục bộ của chính nó, các phiên có thể ghim lại một lần cho mỗi phiên bản và các phiên bản có thể khác nhau. Độ dính tái hội tụ thông qua Redis khi nó phục hồi. Giới hạn thời gian chờ đang chờ, không phải EVAL đã gửi, có thể hạ cánh sau khi dự phòng. Việc ghi định tuyến so sánh giá trị chính xác được quan sát bởi quyết định định tuyến, chứ không phải giá trị đọc tại thời điểm đột biến mới; một lần bỏ sót được quan sát hoặc một quan sát dự phòng SQLite được so sánh như một khóa Redis vắng mặt. Các chân lỗi thời được thay thế trong một CAS, do đó, một lệnh muộn không thể thay thế hoặc xóa một chân mới hơn, khác. Redis đọc nguyên tử trả về giá trị và máy chủ còn lại TTL; PTTL dương (hoặc không hết hạn) xác định độ sống, không phải dấu thời gian JSON của người viết hay đồng hồ của người đọc. Ảnh chụp nhanh cục bộ ánh xạ TTL còn lại tới thời hạn cục bộ; các khóa JSON hiện tại vẫn có thể đọc được và các byte thô của chúng được giữ lại cho CAS. Redis là nguồn sự thật duy nhất trong khi nó trả lời. Các cập nhật được chia sẻ đã được xác nhận, chạm và xóa sẽ xóa mục nhập cục bộ, không bao giờ cài đặt hoặc làm mới mục đó. SQLite trên đường dẫn Redis chỉ giữ các quyết định dự phòng của riêng phiên bản này khỏi lỗi Redis, hết thời gian chờ hoặc bão hòa nhập học, giới hạn TTL như trước. Một mã pin cục bộ bị thiếu trong lần ngừng hoạt động sau này sẽ tốn một lượt chọn mới (một lần bỏ sót bộ nhớ đệm nhắc nhở), không phải là một tài khoản sai hoặc bị đuổi. Các bản nâng cấp bị từ chối sẽ trả về nguyên tử người chiến thắng được chia sẻ và TTL còn lại của nó: lựa chọn thông thường kiểm tra lại thời hạn cục bộ được ánh xạ và sử dụng người chiến thắng đủ điều kiện vẫn còn tồn tại, chạm vào việc sử dụng và ghi nhật ký tài khoản đó mà không cần ghi chung. Nếu không có sẵn, lựa chọn sẽ giữ nguyên ứng cử viên cục bộ, giữ nguyên mã pin được chia sẻ và phát ra một thông báo gỡ lỗi. Bị từ chối CAS không viết SQLite; Thay vào đó, lỗi Redis, thời gian chờ hoặc bão hòa nhập học sẽ áp dụng thao tác cục bộ hiện có. Nếu câu trả lời của đột biến đã gửi đến sau khi hết thời gian chờ (được chấp nhận, bị từ chối hoặc có lỗi), thì việc so sánh và xóa giá trị được tuần tự hóa chính xác đồng bộ sẽ chỉ loại bỏ hàng dự phòng hết thời gian chờ giống hệt byte. Không có sự chờ đợi giữa việc so sánh và việc xóa bỏ đó; một lần ghi ngừng hoạt động mới hơn được bảo tồn. Việc trục xuất được bảo vệ sẽ xóa mã pin cục bộ của chính tài khoản không thành công ngay cả khi Redis bị hỏng và xóa lại sau khi đã xác nhận việc trục xuất được chia sẻ. Đang chờ trả lời chia sẻ trước đó không thể khôi phục mã pin cục bộ đã bị loại bỏ vì những thành công được chia sẻ không bao giờ ghi SQLite. Dự phòng ngừng hoạt động sau này có thể ghim lại tài khoản; một bài viết chia sẻ được chấp nhận sau này chỉ tồn tại trong Redis. Redis bỏ lỡ không tham khảo trạng thái dự phòng cục bộ. Khi tắt trình điều khiển, các chân mới được chọn vẫn giữ nguyên hình dạng SQLite JSON bốn trường cũ; chỉ định tuyến Redis mới thêm danh tính tài khoản được băm. Các chân được tìm nạp trước được kiểm tra lại ở ranh giới hết hạn của chúng. Lựa chọn không cho thuê Redis sẽ đọc lại cửa hàng, nhưng việc lập kế hoạch cho thuê đồng bộ vẫn có thể sử dụng mã pin bị loại bỏ giữa tìm nạp trước và lập kế hoạch (một khoảng thời gian nỗ lực tốt nhất được chấp nhận). Một cam kết cho thuê không thể chuyển đổi tài khoản sau một yêu cầu lâu dài: khi bị từ chối, nó chỉ giữ lại ứng viên được yêu cầu cho yêu cầu đó và không ảnh hưởng đến người chiến thắng chung, do đó, thỏa thuận giữa các trường hợp bị ràng buộc trên con đường đó. Phần còn lại của bảng vẫn được áp dụng: điều này không chia sẻ độ kết dính của phiên kết hợp, ghim xoay Codex gốc, ngữ nghĩa tài khoản, khóa, giới hạn chi tiêu, cấu hình hoặc nhật ký cuộc gọi.

Phần cứng: `/v1/responses` dài đồng thời trên mỗi cá thể là một** ngân sách bộ nhớ** câu hỏi (heap + inflight-byte/#10110). `N` `DATA_DIR` s độc lập vẫn nhân lên nhiều đống: máy chủ RAM phải bao gồm `N × cgroup`, chứ không phải “một pod 16 Gi có N = 8.” Không bao giờ `replicas > 1` trên một tệp SQLite.

Soạn thảo bản phác thảo (hai đống, hai tập — không phải `deploy.replicas: 2`):

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

Mật độ trong quá trình (nén tách HTTP ) là [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Một cụm logic ở trạng thái bền được chia sẻ là [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

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
