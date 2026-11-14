# Release Checklist (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Cập nhật lần cuối:** 2026-08-28 — v3.8.51
> Quy trình phát hành được tinh gọn, tận dụng các kỹ năng Claude Code để tự động hóa.
>
> **Giữ cho hàng đợi/nhánh luôn xanh giữa các lần phát hành:** xem [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (nhóm `/green-prs` + `npm run check:release-green` + `/babysit` + chạy hằng đêm). Việc chạy
> quy trình này định kỳ — và đặc biệt là **trước** danh sách kiểm tra này — giúp PR phát hành có trạng thái xanh ngay từ đầu.

## Tóm tắt

```bash
# 1. Tăng phiên bản + tạo CHANGELOG (kỹ năng)
/version-bump-cc patch    # hoặc minor/major

# 2. Chạy cổng kiểm tra chất lượng cục bộ
npm run check              # lint + kiểm thử
npm run test:coverage      # cổng kiểm tra độ bao phủ đầy đủ (60/60/60/60)

# 3. Build và kiểm tra nhanh
npm run build
npm run test:e2e           # không bắt buộc nhưng được khuyến nghị

# 4. Tạo bản phát hành (kỹ năng)
/generate-release-cc

# 5. Triển khai (kỹ năng)
/deploy-vps-both-cc        # hoặc akamai-cc / local-cc

# 6. Thu thập bằng chứng phát hành (kỹ năng)
/capture-release-evidences-cc
```

## npm Trusted Publishing (mặc định kể từ v3.8.51) — staged theo yêu cầu, direct làm phương án dự phòng

Theo mặc định, `npm-publish.yml` phát hành thông qua **npm Trusted Publishing (OIDC)**: job
`stage-npm` (do GitHub lưu trữ) trao đổi id-token của GitHub để lấy thông tin xác thực npm
ngắn hạn cho lần chạy đó — không có token npm dài hạn trong các secret của kho lưu trữ, không có lời nhắc 2FA, và có kèm chứng thực nguồn gốc.
Đây là cơ chế bỏ qua được npm chấp thuận trong bối cảnh các token bỏ qua 2FA đang dần bị loại bỏ;
nó khôi phục quy trình hoàn toàn tự động mà dự án đã có cho đến v3.8.48, đồng thời duy trì
đảm bảo WS1.3 (một token bị rò rỉ không thể tự phát hành — vì không tồn tại token nào).

**Thiết lập một lần (chủ sở hữu):** npmjs.com → package `omniroute` → Settings → _Trusted
Publisher_ → GitHub: owner `diegosouzapw`, repo `OmniRoute`, workflow `npm-publish.yml`
(environment: none). Cho đến khi cấu hình này tồn tại, bước tự động sẽ thất bại với `ENEEDAUTH`:
kích hoạt lại với `publish_mode=staged` (bên dưới) hoặc `direct`.

### Phát hành staged (theo yêu cầu — `publish_mode=staged`)

Workflow npm-publish không còn phát hành trực tiếp: nó khởi động tarball đã đóng gói
(`check:pack-boot`) rồi chạy `npm stage publish` — các byte chính xác được lưu tạm trên
registry, **không thể cài đặt** cho đến khi chủ sở hữu phê duyệt. Cổng 2FA do con người thực hiện đã được chuyển
sang SAU bước xác minh, thay vì trước đó.

**Quy trình của chủ sở hữu sau khi workflow chuyển sang trạng thái xanh:**

1. `npm stage list omniroute` — tìm stage id (cũng được in trong phần tóm tắt workflow).
2. Xác minh các byte đã được staged (khuyến nghị): `npm stage download <id>`, sau đó cài đặt
   tarball đã tải xuống vào một prefix tạm thời và khởi động nó (`npm run check:pack-boot` tự động hóa
   cùng kết luận pack→install→boot trong CI).
3. `npm stage approve <id>` — lời nhắc 2FA CHÍNH LÀ thao tác phát hành. `npm stage reject <id>` sẽ loại bỏ.
4. Lưới an toàn sau phát hành: trình xác minh sau phát hành (WS1.4 của kế hoạch v3.8.49) cài đặt
   phiên bản đã phát hành từ registry công khai trong một container sạch và khởi động nó.

**Phương án dự phòng khẩn cấp:** `workflow_dispatch` với `publish_mode=direct` khôi phục
`npm publish` tức thì theo cơ chế cũ (chỉ sử dụng nếu chính quy trình staging gặp lỗi; ghi lại lý do).

**Gia cố một lần (chủ sở hữu, npmjs.com):** cấu hình Trusted Publisher cho
`omniroute` ở chế độ chỉ stage để một token dài hạn bị rò rỉ không thể chạy `npm publish`
trực tiếp từ bất kỳ đâu — CI chỉ có thể stage; chỉ 2FA của chủ sở hữu mới có thể phát hành.

**Quy trình xử lý artifact bị lỗi (không thay đổi):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
là phản xạ mặc định (chỉ mất vài phút, có thể đảo ngược); chỉ dùng `npm unpublish` trong khoảng thời gian 72 giờ/không có gói phụ thuộc
và không bao giờ dùng làm bước đầu tiên. Docker: không bao giờ ghi đè một thẻ phiên bản — rollback nghĩa là
trỏ lại `latest` đến digest tốt gần nhất.

**Docker Hub `latest` (bắt buộc đối với mọi lần phát hành SemVer ổn định):** workflow
`docker-publish` phải gắn thẻ **cả** `X.Y.Z` và, khi
`should-promote-latest.sh` xác nhận đây là SemVer ổn định cao nhất, `:latest`
với **cùng một digest**. Sau khi job hoàn tất: digest `latest` trên Hub phải bằng digest SemVer mới
và `last_updated` phải được cập nhật. Không được để `:latest` trỏ đến một
bản build cũ hơn trong khi ghi chú phát hành đề cập đến các bản sửa lỗi chỉ tồn tại trên git. Các cấu hình Compose
khởi động nhanh sử dụng `:latest`; GitOps nên tiếp tục ghim vào `X.Y.Z`. Xem
[Các kênh phát hành Docker](../guides/DOCKER_GUIDE.md#release-channels) và #10317.

## Luồng Nhanh Hotfix (nhãn `hotfix`)

Một PR được gắn nhãn `hotfix` sẽ bỏ qua ma trận CI nặng (E2E 9 phân đoạn, coverage ratchet,
quality-gate, quality-extended) và giữ lại các cổng kiểm tra nhanh, có tín hiệu cao: build,
các phân đoạn unit, integration, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
và kiểm tra boot-smoke của tarball (`check:pack-boot`). Mục tiêu: xanh trong ≤15 phút thay vì ~33 phút.

**Chính sách tham gia — bắt buộc đáp ứng cả bốn điều kiện (mô phỏng theo các luồng khẩn cấp của Chromium/VS Code/Node):**

1. **Mức độ nghiêm trọng**: môi trường production bị hỏng — artifact đã phát hành bị crash khi khởi động /
   bản sửa lỗi bảo mật / mọi người dùng của bản phát hành đều bị ảnh hưởng. "Quan trọng" không có nghĩa là "bị hỏng".
2. **Thẩm quyền**: chỉ chủ sở hữu repository mới được áp dụng nhãn `hotfix`. Chính nhãn này LÀ
   sự phê duyệt — tuyệt đối không tự áp dụng cho PR thuộc một chiến dịch.
3. **Bằng chứng**: phần nội dung PR liên kết đến lần chạy nặng hoàn toàn xanh trước đó (bộ kiểm thử mà
   các job bị bỏ qua lẽ ra sẽ xác thực lại), cùng với kiểm thử riêng của bản sửa lỗi thể hiện trạng thái lỗi trước, đạt sau.
4. **Phạm vi**: chỉ cherry-pick — bản sửa lỗi tối thiểu, không refactor, không kèm thay đổi ngoài phạm vi.

Phạm vi coverage/ratchet bị bỏ qua sẽ được xác thực lại bởi lần chạy đầy đủ tiếp theo trên
nhánh phát hành (release-green liên tục) — luồng này chỉ bỏ qua VIỆC CHỜ ĐỢI, không bao giờ bỏ qua xác thực.
Các diff chỉ liên quan đến kiểm thử (tất cả file nằm trong `tests/`, không có file nào trong `tests/e2e/`) sẽ tự động bỏ qua ma trận E2E
mà không cần bất kỳ nhãn nào.

## Danh sách kiểm tra chi tiết

### Phát hành trước

- [ ] Tất cả PRs được nhắm mục tiêu cho bản phát hành này sẽ được hợp nhất thành `release/vX.Y.0`
- [ ] Tất cả các mục Linear/issue đang mở cho phiên bản này đều bị đóng hoặc đẩy sang cột mốc tiếp theo
- [ ] CI xanh trên nhánh `release/vX.Y.0`
- [ ] Không có điểm đánh dấu `TODO(release)` trong mã: `grep -r "TODO(release)" src/ open-sse/`
- [ ] hình ảnh cơ sở Docker được cập nhật (hiện tại `node:24.15.0-trixie-slim`)

### Phiên bản & Nhật ký thay đổi

- [ ] Chạy `/version-bump-cc <patch|minor|major>` (kỹ năng mã Claude )
  - Va chạm `package.json`, `electron/package.json`
  - Tạo lại `CHANGELOG.md` từ các cam kết git kể từ thẻ cuối cùng
  - Cập nhật huy hiệu README.md
- [ ] Xem lại CHANGELOG.md theo cách thủ công và dọn sạch các thông báo cam kết nếu cần
- [ ] Đảm bảo phần học kỳ mới nhất trong `CHANGELOG.md` bằng phiên bản `package.json`
- [ ] Giữ `## [Unreleased]` làm phần nhật ký thay đổi đầu tiên cho công việc sắp tới
- [ ] Cập nhật `docs/openapi.yaml` → `info.version` phải bằng phiên bản `package.json`

### Chất lượng mã

- [ ] lỗi `npm run lint` — 0 (cảnh báo đã có sẵn)
- [ ] `npm run typecheck:core` — sạch sẽ
- [ ] `npm run typecheck:noimplicit:core` — sạch (nghiêm ngặt)
- [ ] `npm run check:cycles:ratchet` — trong trần `metrics.cycles` cố định ( `check:cycles` trần thoát ra 1 trên bất kỳ chu kỳ nào, #15281)
- [ ] `npm run check:any-budget:t11` — trong ngân sách
- [ ] `npm run check:route-validation:t06` — sạch sẽ
- [ ] đã đáp ứng sàn thời gian chạy được hỗ trợ `npm run check:node-runtime` — (`>=22.22.2 <23`, `>=24.0.0 <27`, per `SUPPORTED_NODE_RANGE` in `src/shared/utils/nodeRuntimeSupport.ts`; căn chỉnh với `package.json` `engines`)

### Kiểm tra

- [ ] vượt qua `npm run test:unit` —
- [ ] `npm run test:vitest` — pass (máy chủ MCP, autoCombo, bộ đệm)
- [ ] cổng `npm run test:coverage` — 60/60/60/60 hài lòng (statements/lines/functions/branches)
- [ ] `npm run test:integration` — pass (nếu thay đổi chạm vào DB / trình xử lý)
- [ ] `npm run test:combo:matrix` — pass (ma trận chiến lược kết hợp: chứng minh tất cả 22 quyết định lựa chọn chiến lược định tuyến công cộng một cách xác định; chạy khi chạm vào định tuyến kết hợp, giải quyết chiến lược hoặc logic dự phòng)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` —**optional/manual** (khói ngược dòng thực được kiểm soát; lấy ảnh chụp nhanh DB chỉ đọc từ VPS `root@192.168.0.15`; truy cập các nhà cung cấp thực sự, tính phí tín dụng; không bao giờ chạy trong CI; bỏ qua hoàn toàn mà không cần cổng)
- [ ] `npm run test:combo:live:vps` —**optional/manual** (Phase-3 VPS khói trực tiếp: 7 kịch bản HTTP đối với máy chủ `.15` trực tiếp thông qua Node ESM đơn giản; yêu cầu `ssh root@192.168.0.15`; creates/deletes chỉ kết hợp `__live_test__*` ; đánh vào các nhà cung cấp thực sự; không bao giờ chạy trong CI)
- [ ] `npm run test:e2e` — pass (UI thay đổi)
- [ ] `npm run test:protocols:e2e` — pass (MCP/A2A thay đổi)
- [ ] vượt qua `npm run test:ecosystem` —

### Móc (Husky xác nhận)

Husky hook sống trong `.husky/` và chạy tự động trên các hoạt động git.

- **cam kết trước:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **đẩy trước:** cổng xác định nhanh — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (kích hoạt 2026-06-13). Cố ý loại trừ `test:unit` (chậm; được bao phủ bởi công việc CI `test-unit` ).
  - Chạy `npm run test:unit` theo cách thủ công trước khi đẩy các nhánh phát hành.

Nếu hook không thành công: hãy khắc phục sự cố cơ bản, đừng bỏ qua bằng `--no-verify`.

### Cam kết thông thường

Tất cả các cam kết ràng buộc phát hành phải tuân theo định dạng `type(scope): subject`.

**Các loại hợp lệ:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Phạm vi hợp lệ:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Những thay đổi mang tính đột phá: thêm chân trang `BREAKING CHANGE:` hoặc `!` sau phạm vi (ví dụ `feat(api)!: drop /v0`).

### Tài liệu

- [ ] thẻ `npm run check:docs-sync` (tự động chạy bằng cách xác nhận trước)
- [ ] thẻ `npm run check:docs-all` (ô: docs-sync + docs-counts + env-doc-sync + phiên bản không dùng nữa + doc-links)
- [ ] `npm run check:env-doc-sync` thoát 0 mã — ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` hợp đồng env còn nguyên vẹn
- [ ] `npm run check:doc-links` thoát 0 — không có tham chiếu đánh dấu nội bộ bị hỏng sau khi tái cấu trúc
- [ ] `docs/architecture/ARCHITECTURE.md` được xem xét cho storage/runtime trôi dạt
- [ ] `docs/guides/TROUBLESHOOTING.md` đã được xem xét về env var và độ lệch hoạt động
- [ ] Nếu `.env.example` thay đổi: `docs/reference/ENVIRONMENT.md` đã cập nhật
- [ ] Nếu tính năng mới có UI: `docs/guides/USER_GUIDE.md` đề cập đến nó
- [ ] Nếu tính năng mới có API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` đã cập nhật
- [ ] Nếu tính năng mới là một mô-đun: `docs/<MODULE>.md` chuyên dụng tồn tại
- [ ] Nếu vi phạm thay đổi: `docs/guides/TROUBLESHOOTING.md` có ghi chú di chuyển

### i18n

- [ ] `npm run i18n:check` thoát khỏi trạng thái dịch 0 — (`.i18n-state.json`) đồng bộ với tài liệu nguồn (không có nguồn nào bị trôi ở chế độ nghiêm ngặt; tư vấn về chế độ cảnh báo có thể được chấp nhận đối với các lần chỉnh sửa tài liệu vào phút cuối, nhưng phải bằng 0 trước khi gắn thẻ)
- [ ] `npm run i18n:check-ui-coverage` thoát 0 — mỗi địa điểm UI bằng hoặc cao hơn mức sàn bao phủ 80%
- [ ] `npm run i18n:sync-ui:dry` báo cáo 0 khóa bị thiếu trên tất cả 66 ngôn ngữ đích (mọi ngôn ngữ ngoại trừ nguồn `en` )
- [ ] Nếu tài liệu tiếng Anh nguồn thay đổi, hãy chạy `npm run i18n:run` (yêu cầu `OMNIROUTE_TRANSLATION_API_KEY` trong `.env`) trước khi gắn thẻ
- [ ] Đóng góp bản dịch có thể được hoãn lại cho bản phát hành tiếp theo nếu nhỏ (theo dõi trong CHANGELOG)

### Di chuyển cơ sở dữ liệu

- [ ] Nếu `src/lib/db/migrations/` có tệp mới:
  - [ ] Mỗi lần di chuyển là bình thường (`CREATE TABLE IF NOT EXISTS`, v.v.)
  - [ ] Di chuyển được bao bọc trong các giao dịch
  - [ ] Đánh số chính xác (không có khoảng trống trong chuỗi)
- [ ] Kiểm tra cài đặt mới: xóa `~/.omniroute/omniroute.db` và chạy `npm run dev`
- [ ] Kiểm tra cài đặt hiện có: sao lưu DB, chạy di chuyển, xác minh lược đồ
- [ ] các tệp WAL (`-wal`, `-shm`) được xử lý chính xác nếu quá trình di chuyển ghi lại các bảng

### Danh mục nhà cung cấp (được Zod xác thực)

- [ ] lược đồ `src/shared/constants/providers.ts` Zod hợp lệ tại thời điểm tải
  - [ ] Tất cả các nhà cung cấp đều có các trường bắt buộc (`id`, `label`, `kind`, v.v.)
  - [ ] `freeNote` được cung cấp cho các nhà cung cấp miễn phí mới
  - [ ] nhà cung cấp OAuth đã đăng ký `oauthConfig` trong `src/lib/oauth/constants/oauth.ts`
- [ ] Nếu nhà cung cấp mới được thêm: người thực thi tương ứng trong `open-sse/executors/`
- [ ] Nếu định dạng không phải OpenAI: trình dịch trong `open-sse/translator/`
- [ ] Người mẫu đã đăng ký tại `open-sse/config/providerRegistry.ts`
- [ ] Kiểm tra đơn vị trong phân loại và định tuyến nhà cung cấp trang bìa `tests/unit/`

### Máy tính để bàn (Electron)

Nếu `electron/` thay đổi:

- [ ] vượt qua `npm run electron:smoke:packaged`
- [ ] Các bản dựng đã được thử nghiệm cho ít nhất một trong số `:win`, `:mac`, `:linux`
- [ ] Chứng chỉ ký mã chưa hết hạn (nếu ký)
- [ ] phiên bản `electron/package.json` khớp với `package.json` gốc
- [ ] Con trỏ kênh tự động cập nhật được cập nhật nếu phát hành lên `stable`

### Xây dựng bố cục

Kho lưu trữ sử dụng ba thư mục đầu ra riêng biệt — không bao giờ trộn lẫn chúng:

| Thư mục   | Mục đích                                                         | Đã theo dõi?        |
| --------- | ---------------------------------------------------------------- | ------------------- |
| `src/`    | Nguồn ứng dụng (TypeScript / TSX)                                | Đúng                |
| `.build/` | Xây dựng đầu ra trung gian — `next build` (`distDir`)            | Không (được bỏ qua) |
| `dist/`   | Gói npm có thể vận chuyển được — do `assembleStandalone` lắp ráp | Không (được bỏ qua) |

> **Lưu ý của nhà điều hành:** thư mục hình ảnh VPS từ xa vẫn là `/usr/lib/node_modules/omniroute/app/`. Chỉ có** trong kho** đầu ra bản dựng đã được di chuyển (`app/` → `dist/`). Triển khai các kỹ năng rsync nội dung `dist/` vào `app/` dir — từ xa mà không cần thay đổi đường dẫn VPS.

**Luồng xây dựng đơn:**

```
npm run build:release
  └─ rm -rf .build dist          (clean)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (copies standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

Do NOT chạy `npm run build` theo sau là một `npm run build:cli` riêng để triển khai — hãy sử dụng `npm run build:release` để xây dựng lại + trọng điểm trong một lệnh.

### Xác thực hiện vật

- [ ] `npm run build:release` thành công và `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` clean — no `app.__qa_backup`, `scripts/scratch`, `package-lock.json` hoặc dư lượng cục bộ khác
- [ ] `dist/server.js` tồn tại sau khi xây dựng
- [ ] Khói thời gian chạy đóng gói cục bộ tùy chọn: `npm run dev:candidate -- validate` sau `npm run dev:candidate -- build` khởi động tarball được đóng gói trên `DATA_DIR` bị cô lập và kiểm tra `/api/health` + `/v1/models` (xem [Con đường vàng đóng góp](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop) )

### Gắn thẻ và phát hành

- [ ] Chạy `/generate-release-cc` (kỹ năng Mã Claude ):
  - Tạo thẻ `vX.Y.Z`
  - Đẩy thẻ và nhánh
  - Mở bản phát hành GitHub với nội dung thay đổi
  - Đính kèm trình cài đặt Electron (nếu được xây dựng)
- [ ] Hoặc bằng tay:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Triển khai

Triển khai các kỹ năng sử dụng luồng rsync nhẹ — no `npm pack`, no `npm i -g`:

- [ ] Sử dụng kỹ năng triển khai phù hợp với mục tiêu:
  - `/deploy-vps-local-cc` — VPS cục bộ (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — cả hai
- [ ] Trước khi triển khai, hãy xác nhận `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Bản dựng phải chạy ở nơi `node_modules` là có thật (thanh toán chính hoặc cây làm việc của `npm ci` — NOT một cây làm việc được liên kết tượng trưng)
- [ ] Phiên bản triển khai thử nghiệm khói:
  - Mở `/dashboard/health` → kiểm tra chuỗi phiên bản khớp với bản phát hành
  - Chạy yêu cầu `/v1/chat/completions` đối với nhà cung cấp đã biết
  - Xác minh `/api/monitoring/health` trả về bộ ngắt mạch `CLOSED`
  - Xác nhận việc vận chuyển MCP phản hồi (`/mcp` HTTP, `/mcp-sse` SSE)

### Sau phát hành

- [ ] Chạy `/capture-release-evidences-cc` (kỹ năng mã Claude )
  - Ghi lại WebP screenshots/recordings các tính năng mới
  - Đính kèm ghi chú phát hành/bài viết blog
- [ ] Cập nhật GitHub Thảo luận / Discord với thông báo phát hành
- [ ] Cột mốc mở cho phiên bản tiếp theo
- [ ] Nếu quan trọng: ghim thảo luận hoặc đăng trong `news.json` để có biểu ngữ trong ứng dụng

### Cổng phóng radar công cộng

Thông báo Radar được thực hiện có chủ ý với `active: false`. Kích hoạt là một thay đổi riêng biệt sau khi mỗi mục dưới đây được chứng minh:

- [ ] Tất cả Radar PRs xếp chồng lên nhau được hợp nhất và CI ở đầu phát hành có màu xanh lục
- [ ] Triển khai và hút các tuyến Radar OSS với `RADAR_ENABLED` vẫn tắt theo mặc định
- [ ] Khói `GET /planos`, `/termos`, `/privacidade` và `/reembolso` trên máy chủ Radar được đặt tên
- [ ] Ghi lại nhà điều hành identity/contact/address và đánh giá pháp lý được chủ sở hữu phê duyệt trong dịch vụ tư nhân
- [ ] Thực hiện Stripe Checkout và webhook đã ký chỉ ở chế độ thử nghiệm
- [ ] Thực hiện một lần gửi email giao dịch được mã hóa với sender/domain đã được phê duyệt
- [ ] Chứng minh khôi phục sao lưu và một lần chạy nghiên cứu được giám sát, giới hạn ngân sách
- [ ] Phê duyệt chính sách xem xét BRL/PIX trước khi chấp nhận bằng chứng quyên góp
- [ ] Chỉ bật Checkout công khai sau các cổng trước, sau đó kích hoạt ID `news.json`
- [ ] Xác minh biểu ngữ Trang chủ sử dụng bản sao đã bản địa hóa và ID mới xuất hiện lại sau khi ID cũ hơn bị loại bỏ

## Kiểm tra nhanh Dịch vụ Nhúng (v3.8.4+)

Trước khi phát hành bất kỳ bản phát hành nào có thay đổi đối với các dịch vụ nhúng, hãy xác minh:

### Khởi động với DB mới (phát hiện xung đột migration — được bổ sung sau hotfix v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — chờ 10 giây để khởi động
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` trả về `"9router"` (KHÔNG PHẢI 404, KHÔNG PHẢI 500). Xác nhận migration `071_services.sql` đã được áp dụng + hàng dữ liệu đã được seed.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` trả về 3 hàng.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` trả về 2 hàng (xác thực rằng `070_webhooks_kind_metadata.sql` đã được áp dụng).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` chạy thành công — ngăn ngừa các xung đột trong tương lai.

### 9Router

- [ ] `POST /api/services/9router/install` trả về 200 cùng với `installedVersion` trong vòng dưới 2 phút
- [ ] `POST /api/services/9router/start` trả về 200 và `state: "running"` trong vòng dưới 30 giây
- [ ] `GET /api/services/9router/status` báo cáo `health: "healthy"`
- [ ] `POST /v1/chat/completions` với `"model": "9router/auto/..."` trả về 200 (định tuyến đầu cuối qua 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` hiển thị giao diện người dùng gốc của 9Router bên trong proxy (không dùng iframe trực tiếp tới `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` trả về `{ keyRotated: true }` và dịch vụ khởi động lại bình thường
- [ ] `POST /api/services/9router/stop` trả về 200 và `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` trả về luồng SSE với sự kiện `snapshot` chứa các dòng gần đây
- [ ] Cài đặt trong môi trường không có `npm` trong PATH trả về 500 cùng thông báo lỗi thân thiện (không chứa stack trace)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` trả về 200 trong vòng dưới 2 phút
- [ ] `POST /api/services/cliproxy/start` trả về 200 và `state: "running"` trong vòng dưới 30 giây
- [ ] `GET /api/services/cliproxy/status` báo cáo `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` trả về 200 và `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` trả về luồng SSE

### Kiểm tra hồi quy bảo mật

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` trả về `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` trả về `403 LOCAL_ONLY`
- [ ] Các phản hồi lỗi từ `/api/services/*` không chứa `err.stack` hoặc đường dẫn tệp tuyệt đối

## Các bước kiểm tra cho v3.8.0+

Trước khi phát hành bất kỳ bản phát hành v3.8.x nào, hãy xác minh thêm các mục sau:

- [ ] `omniroute --tray` khởi động trên macOS (systray2 được cài đặt vào `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` khởi động trên Linux (yêu cầu DISPLAY; báo lỗi hợp lý nếu chưa được đặt)
- [ ] `omniroute --tray` khởi động trên Windows (PowerShell NotifyIcon, không có tệp nhị phân bổ sung)
- [ ] `omniroute config tray enable` tạo mục tự động khởi động; thao tác vô hiệu hóa sẽ xóa mục đó
- [ ] `npm install -g omniroute@<this-version>` chạy postinstall mà không thoát do lỗi nghiêm trọng
- [ ] Quá trình cập nhật giữ lại các dependency tùy chọn: `omniroute update --apply` và trình tự động cập nhật
      chạy `npm install -g … --include=optional` để `optionalDependencies` (better-sqlite3,
      keytar, tls-client và ngăn xếp SLM llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) vẫn tồn tại sau khi cập nhật. Tầng SLM ultra `modelPath` cũng cần mô hình
      tinybert, được tự động tải xuống `${DATA_DIR}/models/llmlingua` trong lần sử dụng đầu tiên. Postinstall
      (`scripts/build/colocateOptionals.mjs`) sau đó đặt closure tùy chọn của SLM vào cùng vị trí trong
      `dist/node_modules` để worker phân giải MỘT instance `@huggingface/transformers` ^4.2.0
      DUY NHẤT — trace độc lập chỉ đóng gói transformers, không đóng gói các dependency tùy chọn được import động,
      vì vậy nếu không có bước này, worker sẽ tải llmlingua-2 với transformers ở root
      và tầng SLM sẽ âm thầm chuyển sang chế độ fail-open.
- [ ] `omniroute status` hoạt động khi không có `.env` (đường dẫn token CLI, chỉ loopback)
- [ ] `curl http://localhost:20128/api/shutdown` trả về 401 (route luôn được bảo vệ)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` trả về 401 (bộ bảo vệ loopback)
- [ ] Runtime SQLite phân giải thành `bundled` trong lần chạy đầu tiên (tệp nhị phân đi kèm hợp lệ cho nền tảng)
- [ ] Runtime SQLite chuyển sang `runtime` khi `node_modules/better-sqlite3` bị xóa
- [ ] Bộ lọc MCP thông minh nén đầu ra thực tế của `playwright-mcp browser_snapshot` (mức giảm ≥50%)
- [ ] Tất cả 10 tệp `skills/omniroute*/SKILL.md` đều có thể được truy xuất công khai qua URL GitHub raw
- [ ] Trình hướng dẫn làm quen hiển thị bước giới thiệu các tầng "Cách thức hoạt động" khi thiết lập mới
- [ ] Tiện ích phạm vi tầng trên bảng điều khiển chính hiển thị số lượng đã cấu hình/đang hoạt động

---

## Cắt bản 3.9.0 LTS (đã diễn tập trong 3.8.58)

Sau v3.8.59, phiên bản tiếp theo là 3.9.0 và đầu nhánh của phiên bản này trở thành hai nhánh tồn tại lâu dài:
`stable/v3` (dòng v3 LTS, npm `latest`) và `develop` (v4, được tăng lên 4.0.0, npm
`nightly`). Mô hình nhánh/kênh, quy trình forward-port và các nhãn được mô tả trong
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md); kế hoạch nằm trong [ROADMAP](../../ROADMAP.md) (Giai đoạn 3). Việc cắt bản chỉ chạy một lần;
3.8.58 diễn tập toàn bộ quy trình trên một fork, còn 3.8.59 kết thúc bằng
[danh sách kiểm tra GO/NO-GO](./LTS_GO_NO_GO.md).

### Chạy thử (chỉ đọc, luôn an toàn)

```bash
npm run release:dry-run-lts-cut                       # lần cắt bản thực tế: 3.9.0 từ HEAD, thẻ trước đó là v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # cố định commit nguồn
```

`scripts/release/dry-run-lts-cut.mjs` không thực thi bất kỳ thao tác nào: nó đọc git và `gh`, rồi in ra
toàn bộ trình tự — các điều kiện tiên quyết (nguồn có thể được phân giải, kho lưu trữ nguồn có đầy đủ lịch sử —
một bản sao nông không thể đẩy `stable/v3`, phía nhận sẽ từ chối gói tại phần tử cha ghép đầu tiên,
vì vậy trước hết hãy cắt bản từ một bản sao đầy đủ hoặc chạy `git fetch --unshallow origin` — thẻ trước đó
tồn tại, `package.json` có phiên bản đích, một issue `release-freeze` đang mở, không có issue
`Release branch not green` đang mở
trên một nhánh phát hành hiện có — một nhánh không tồn tại sẽ báo `?` không xác định, không bao giờ
là xanh — hàng đợi `release` của Mergify đã được cấu hình (G11: `queue_rules`, `checks_timeout`,
nhãn `queue`), bộ quy tắc `release/*` vẫn chặn việc xóa và force-push, đồng thời
`stable/v3` và `develop` chưa tồn tại), hai bước tạo nhánh, những trình kích hoạt workflow đang bất hoạt
và điều kiện `if:` nào trở thành đúng (cũng như những điều kiện nào vẫn bị chặn bởi một biến kho lưu trữ hoặc
được ghim vào kho lưu trữ chuẩn), các dist-tag dự kiến (`latest` → 3.9.0, `next` và
`nightly` trống) và quy trình hoàn tác. Mã thoát `0` = `RESULT: READY`, `1` = một điều kiện tiên quyết
có tính chặn đã thất bại (`✗`), `2` = lỗi sử dụng. `--advisory <id,...>` hạ cấp một lượt kiểm tra thành cảnh báo (`!`)
mà không ẩn nó.

Hãy chạy thử lần cắt bản thực tế trong khi thời gian đóng băng phát hành 3.9.0 vẫn còn hiệu lực — các nhánh được
tạo sau thẻ và trước khi Giai đoạn 12c dỡ bỏ trạng thái đóng băng.

### Diễn tập 3.8.58 (chỉ trên fork)

```bash
# 1. Chạy thử trên đầu nhánh hiện tại với các tham số diễn tập
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Thực thi với một remote FORK (origin hoặc bất kỳ remote nào có URL là kho lưu trữ
#    chuẩn đều bị từ chối; mỗi bước đều yêu cầu xác nhận trong terminal)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Chạy thử các workflow đang bất hoạt trong fork (workflow_dispatch tại nơi kết quả chạy thử
#    báo có ghim vào kho lưu trữ chuẩn), sau đó hoàn tác
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

Commit tăng phiên bản develop được tạo bằng hệ thống lệnh plumbing của git (không tác động đến cây làm việc) và tăng phiên bản
cho cùng năm tệp như một commit mở chu kỳ: `package.json`, `open-sse/package.json`,
`electron/package.json`, `package-lock.json` và `docs/openapi.yaml`. Sau đó, mục `[4.0.0]`
trong CHANGELOG và các bản sao i18n của mục này được mở trên `develop`, trước PR đầu tiên của nhánh.
Script không bao giờ thay đổi các dist-tag của npm — hãy diễn tập chúng trên một gói thử nghiệm.

### Artifact xem trước của PR (build một lần, quảng bá đúng các byte đó)

`.github/workflows/preview-artifact.yml` build một tarball production từ đầu nhánh PR và
xác thực chính xác bản build đó (phần (a) của #8084). Chỉ dành cho các PR trong cùng kho lưu trữ; không có nội dung nào được phát hành.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # hoặc thêm nhãn `preview-artifact`
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # cài đặt bản xem trước
```

Lượt chạy thực hiện `npm ci`, `npm run build:release`, `npm run check:pack-artifact`, đóng gói
tarball, chạy `npm run check:pack-boot` (secret giả, thư mục dữ liệu tạm thời), đóng gói lại và
thất bại nếu digest không giống hệt, sau đó ghi lại `artifact-identity.json` (SHA đầu nhánh, SHA cơ sở,
hash của lockfile, nền tảng, kiến trúc, ABI của node, bundler, chính sách build —
`scripts/release/artifact-identity.mjs`) và chứng thực tarball trong một job riêng biệt. Việc quảng bá
một bản xem trước có nghĩa là cài đặt tarball đó: tuyệt đối không build lại từ mã nguồn.

### Cắt bản (3.9.0, sau GO)

1. GO được ghi lại trong [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` in ra `RESULT: READY`.
3. Tạo thủ công các nhánh trên `origin` bằng các lệnh do lượt chạy thử in ra — script
   từ chối đẩy lên `origin`. Để tái sử dụng một commit develop đã được rà soát, trước tiên hãy chạy
   diễn tập `--execute` trên đầu nhánh 3.9.0 với fork của bạn; thao tác này in ra cả hai SHA và
   có thể đẩy chính các commit đó:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. Bảo vệ `stable/v3` và `develop` (ruleset + hàng đợi hợp nhất) trước khi PR đầu tiên được hợp nhất.
5. Các workflow không hoạt động sẽ được bật khi nhánh tồn tại: `forward-port.yml` (push đến
   `stable/v3`), `validate-stable-pr.yml` (các PR đến `stable/v3`) và `nightly-v4-build.yml`
   (build `develop`). Trước khi chính thức vận hành, hãy thiết lập repository secret `secrets.FORWARD_PORT_TOKEN` (để CI chạy trên
   các PR forward-port); việc phát hành hằng đêm vẫn bị tắt cho đến khi chủ sở hữu đặt repository
   variable `vars.NIGHTLY_PUBLISH` thành `true` và npm Trusted Publishing chấp nhận
   `nightly-v4-build.yml`. Việc phân giải kênh nằm trong `scripts/release/dist-tag.mjs`, cũng là
   trình phân giải mà `npm-publish.yml` sử dụng.
6. Xác minh các kênh: `npm view omniroute dist-tags --json` hiển thị `latest` = 3.9.0 và không có
   `next` / `nightly` cho đến khi v4 được phát hành.
7. Khôi phục nếu cần: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   và `npm dist-tag add omniroute@3.8.59 latest`.

---

## Hoàn tác

Nếu bản phát hành gặp sự cố nghiêm trọng:

1. `gh release edit vX.Y.Z --prerelease` (đánh dấu là không phải bản mới nhất)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (chỉ khi người dùng chưa sử dụng)
3. Hoặc: tạo bản sửa lỗi khẩn cấp trên `release/vX.Y.0` → phát hành bản vá `vX.Y.(Z+1)`
4. Thông báo ngay trong GitHub Discussions và Discord

## Quy tắc bắt buộc

- Không bao giờ commit trực tiếp vào `main`
- Không bao giờ sử dụng `git push --force` lên các nhánh `main` hoặc `release/*`
- Không bao giờ bỏ qua các hook Husky (`--no-verify`)
- Không bao giờ commit bí mật, thông tin xác thực hoặc các tệp `.env`
- Độ bao phủ phải luôn ≥60/60/60/60 (câu lệnh/dòng/hàm/nhánh)
- Luôn bổ sung hoặc cập nhật kiểm thử khi thay đổi mã nguồn dùng trong môi trường production tại `src/`, `open-sse/`, `electron/` hoặc `bin/`

## Kiểm tra đồng bộ tự động

Chạy trình kiểm tra bảo vệ đồng bộ tài liệu trên máy cục bộ trước khi mở PR:

```bash
npm run check:docs-sync
```

CI cũng chạy bước kiểm tra này trong `.github/workflows/ci.yml` (tác vụ lint).
