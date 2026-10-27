# Self-Hosted Runner Box Operations (.113 pool) (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Nhóm runner tự lưu trữ chạy trên máy **.113** (`tomni-proxmox-113`). Kể từ 2026-10-18, mỗi
runner OmniRoute có **một vai trò**, một nhãn và ngân sách bộ nhớ/CPU được định cỡ theo mức tải
đã đo được. Slot Turbopack nhận tài nguyên theo nhu cầu của quá trình build; các slot còn lại được định cỡ theo
mức đỉnh đã đo được. Máy chỉ cấp phát vượt mức khi một bản build Turbopack trùng thời điểm với một bản build webpack
Release-Green và một job lint; swap của host (16 GB) sẽ hấp thụ phần vượt mức đó, và vì các bản Build của pull request chạy
trên runner được lưu trữ, slot Turbopack hầu như luôn ở trạng thái nhàn rỗi:

| runner               | nhãn             | vai trò                                                                                                                                                     | `MemoryHigh` / `MemoryMax` | `CPUQuota`       |
| -------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------------- |
| `omniroute-113-5`    | `omni-build`     | Các bản build Turbopack: `ci.yml` `Build` (chỉ push/dispatch), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, bản build a11y hằng đêm | 56 GB / 60 GB (swap 0)     | 1600 %           |
| `omniroute-113-6`    | `omni-release`   | Release-Green (`release-green` + `main-green`), bản build webpack                                                                                           | 20 GB / 24 GB (swap 4 GB)  | 800 %            |
| `omniroute-113-2`    | `omni-light`     | Các job hằng đêm (Schemathesis, promptfoo, garak, k6) và `quality.yml` `lint-guard`                                                                         | 12 GB / 16 GB (swap 4 GB)  | 600 %            |
| `omniroute-113`      | `omni-light`     | cùng nhóm như trên                                                                                                                                          | 8 GB / 12 GB               | 400 %            |
| OmniHeuris, OmniMind | (repo của chúng) | chỉ Dependabot (mức đỉnh 155 MB mỗi runner, 2026-10-18)                                                                                                     | 4 GB / 6 GB                | 200 % mỗi runner |

Đo vào 2026-10-18:

| tài nguyên | giá trị                             | ý nghĩa đối với việc lập lịch                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| RAM / CPU  | **78 GB / 32 lõi**                  | một bản build production bằng Turbopack đạt đỉnh 49 GB khi không bị giới hạn (`tests/unit/ci-build-bundler-webpack.test.ts`); trên Next 16.3.8, chỉ riêng giai đoạn biên dịch đã chiếm khoảng 40 GB (36 GB RSS trong `next-build` cộng với 17 worker loader, mỗi worker 3 GB, đo vào 2026-10-18); một bản build webpack dùng khoảng 14–16 GB. Một bản build Turbopack + một bản build webpack có thể chạy cùng nhau; hai bản build Turbopack thì không |
| swap       | 16 GB                               | `omniroute-113-5` chạy với swap bị tắt (`MemorySwapMax=0`), vì vậy một bản build mất kiểm soát sẽ bị dừng tại giới hạn thay vì khiến cả máy phải dùng swap                                                                                                                                                                                                                                                                                             |
| `/tmp`     | **tmpfs 12 GB = RAM**               | mọi thứ được lưu ở đó đều chiếm bộ nhớ; dữ liệu còn sót lại được dọn sau 3 giờ                                                                                                                                                                                                                                                                                                                                                                         |
| CPU        | đã quan sát thấy tải 60 trên 32 lõi | trước khi áp dụng hạn ngạch, một bản build Turbopack (~1166 % CPU) cộng với một bộ kiểm thử coverage trên cùng máy đã làm gián đoạn heartbeat của các listener khác (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                                                                              |
| runner     | **6 listener**                      | 4 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-3/-4/-7/-8` bị vô hiệu hóa (`systemctl enable --now` sẽ kích hoạt lại một runner)                                                                                                                                                                                                                                                                                                                  |

Các giới hạn nằm trong `/etc/systemd/system/actions.runner.<…>.service.d/override.conf` của từng unit
(các giá trị trước đó được giữ lại dưới tên `override.conf.bak-20261018`) và đã được áp dụng trực tiếp bằng
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — không cần khởi động lại, vì vậy không
job đang chạy nào bị ảnh hưởng. Các nhãn được thay đổi thông qua API runner
(`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), cũng theo thời gian thực.

## Cài đặt trình dọn dẹp (một lần, trên máy chủ)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): mỗi 30 phút, ghi nhật ký vào /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` là bắt buộc: trình dọn dẹp xác minh một đường dẫn đang không được sử dụng bằng một ảnh chụp nhanh duy nhất về các tệp đang mở trước khi xóa đường dẫn đó; nếu không có công cụ này, nó sẽ không xóa gì và sẽ thông báo rõ như vậy (thoát với mã 1). Trước tiên, hãy thử mọi thay đổi bằng `--dry-run` — tùy chọn này in chính xác những gì sẽ được thực hiện và không động đến bất kỳ thứ gì.

Những việc nó thực hiện trong mỗi lần chạy: dọn các tệp tồn dư của chính chúng ta (`runner-*`, `omniroute-*`, `next-build*`, `e2e-build.tar.gz`) sau **3 giờ trên tmpfs** và 24 giờ trên `_work/_temp` thuộc ổ đĩa; kết thúc một `next-build` cũ hơn 75 phút (không job nào chạy lâu đến vậy — vào 2026-08-27, một job đã chạy 70 phút sau khi GitHub tuyên bố job đó bị mất); loại bỏ các checkout cũ hơn 48 giờ của những runner có unit **đã dừng**; cảnh báo khi mức sử dụng ổ đĩa ≥ 85 %, PSI bộ nhớ `full/avg60` ≥ 10 %, và số listener lớn hơn `MAX_ACTIVE_RUNNERS` (kèm phân tích theo omniroute/khác). Thoát với mã 1 = cần chú ý; hãy đọc nhật ký.

Quy tắc 75 phút không phát hiện được một build mà GitHub đã từ bỏ job tương ứng. Khi `Runner.Listener` không thể gia hạn job, `_diag/Runner_*.log` hiển thị `POST request to …/renewjob timed out after 100 seconds`, API báo cáo job là `completed` (thất bại) khoảng mười phút sau lần gia hạn thành công cuối cùng, còn `next-build` tiếp tục chạy mà không gắn với job nào (2026-10-18: Build của #17066 bị đánh dấu thất bại lúc 19:43 nhưng build của nó vẫn chiếm 40 GB sau đó năm phút). Xác nhận ref trong `_diag/Worker_*.log` mới nhất, sau đó chỉ gửi SIGTERM đến cây tiến trình build theo PID — `next-build`, `npm run build`, `build-next-isolated.mjs` và các worker trong `_work`. Tuyệt đối không động đến `Runner.Listener`, `RunnerService.js` hoặc `Runner.Worker`: worker sẽ báo cáo job là đã bị hủy và listener sẽ tự trực tuyến trở lại.

## Các unit của runner: KillMode

`KillMode=process` mặc định của runner khiến `Runner.Worker → npm → next-build` vẫn chạy khi một unit bị dừng hoặc khởi động lại — một build mồ côi tiếp tục tiêu tốn RAM và CPU mà không gắn với job nào. Mỗi unit OmniRoute đều có một drop-in (`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`) với `KillMode=mixed`: trước tiên gửi SIGTERM đến listener, sau đó gửi SIGKILL đến toàn bộ cgroup tại `TimeoutStop`. Thiết lập này có hiệu lực trong lần khởi động lại tiếp theo của unit — chỉ khởi động lại **từng runner một, khi runner đang rảnh**, với thao tác kiểm tra trạng thái rảnh và khởi động lại nằm trong cùng một lệnh.

## Quy tắc vận hành

- **Mỗi lần chỉ một bản dựng Turbopack — được thực thi bằng nhãn.** Mọi job chạy lệnh Turbopack
  `next build` đầy đủ đều nhắm đến `[self-hosted, omni-build]`, và chỉ **`omniroute-113-5`** mang
  nhãn đó: `ci.yml` `Build`, `npm-publish.yml` `publish`, `nightly-v4-build`, `preview-artifact`,
  bản dựng a11y hằng đêm (#16853) và **amd64** của `docker-publish.yml` (webpack bên trong BuildKit —
  Turbopack đã bị panic tại đó, lượt chạy 33253576569). Nhánh Docker arm64 vẫn chạy trên `ubuntu-24.04-arm`.
  amd64 của `docker-publish` dùng chung nhóm đồng thời `heavy-build-main` với `Build` của `ci.yml`
  (`cancel-in-progress: false`). Docker Engine phải nằm trên `omniroute-113-5`. Slot Turbopack
  thứ hai không vừa trong 78 GB (2 × 33–37 GB cộng với phần còn lại của máy); slot thứ hai chỉ an toàn
  cho các bản dựng webpack.
- **Các bản dựng pull request chạy trên hạ tầng hosted (2026-10-18).** `Build` của `ci.yml` chỉ đến
  `omni-build` đối với `push` và `workflow_dispatch`; mọi `Build` của `pull_request` (từ chính nguồn
  hoặc fork) và `merge_group` đều chạy trên `ubuntu-latest` bằng webpack. Khi mọi PR từ chính nguồn
  đều được định tuyến đến slot này, một bản dựng Turbopack chiếm slot trong 29–58 phút, 18 bản dựng
  phải xếp hàng tới 18 giờ, và bản dựng push của chính nhánh phát hành chỉ giành được slot một lần
  trong 40 job. Trên hạ tầng hosted, cùng bản dựng PR đó mất 8–12 phút khi chạy cùng các job khác
  của PR. Turbopack, bundler được `npm-publish` phát hành, vẫn được kiểm thử trên nhánh phát hành
  thông qua bản dựng a11y hằng đêm của nhánh mặc định (04:41 UTC), qua mọi bản dựng push hoặc dispatch
  đến được slot, và qua chính `npm-publish`. `tests/unit/build/heavy-build-queue.test.ts`
  cố định cổng kiểm tra gồm bốn điều kiện.
- **Không bao giờ đặt kích thước slot Turbopack thấp hơn nhu cầu đã đo được.** Vào 18:06 ngày
  2026-10-18, slot đã bị hạ từ 56G/60G xuống 40G/44G để nhường chỗ cho `omni-release`. Giai đoạn
  biên dịch nằm ở mức `MemoryHigh` trong toàn bộ lượt chạy (memory PSI `full` 30–43 %), và
  `Runner.Listener`, vốn dùng chung cgroup, không thể gia hạn job của mình. Mức 56G/60G do chủ sở hữu
  đặt vào 2026-10-17 đã được khôi phục ngay trong ngày. Dưới mức đó, bản dựng không thất bại; nó bị
  thrashing và job bị mất.
- **Release-Green có slot riêng (2026-10-18).** Trước đó, cả hai quy trình xác thực Release-Green
  đều chạy trên `omni-build`: ở mỗi lần push (~10/giờ, 97 trong số 100 lượt chạy push bị hủy giữa
  chừng chỉ trong một ngày) và ba lượt quét đầy đủ kéo dài ~2 giờ mỗi ngày (lượt quét lúc 05:29 phải
  chờ slot 6 giờ) — slot dựng duy nhất đã bị đăng ký vượt công suất gấp nhiều lần và các bản dựng PR
  từ chính nguồn phải chờ hàng giờ. `release-green` và `main-green` giờ đây nhắm đến `omni-release`
  (chỉ `omniroute-113-6`) với `OMNIROUTE_USE_TURBOPACK=0`, và một lượt chạy đã bắt đầu sẽ không còn
  bị hủy bởi một lần push mới hơn (slot đang chờ vẫn gộp cơn bão yêu cầu).
  `tests/unit/build/runner-capacity-routing.test.ts` cố định việc định tuyến, chuyển sang webpack
  và bảo đảm không có gì trên `omni-release` được dựng bằng Turbopack.
- **Nhóm nhẹ: `omni-light`.** `omniroute-113` và `omniroute-113-2` chạy các tác vụ hằng đêm cần
  một lệnh `next build` chỉ dành cho backend (~5–6 GB; webpack) và `lint-guard` của `quality.yml`.
  `omniroute-113` có `MemoryHigh=4G` cho đến 2026-10-18 — bản dựng promptfoo phải liên tục thu hồi
  bộ nhớ suốt 54 phút tại đó; 8 GB loại bỏ tình trạng điều tiết.
- **Chủ đích sử dụng ít listener hơn.** Bốn unit OmniRoute đã bị vô hiệu hóa vào 2026-08-29 — mỗi
  listener bổ sung là một tenant khác dùng chung ngân sách bộ nhớ nêu trên. Giới hạn tối đa của
  janitor là 6 (`MAX_ACTIVE_RUNNERS=6` trong cron): nó đếm mọi `Runner.Listener` trên máy, còn
  OmniHeuris + OmniMind bổ sung hai listener vào bốn listener của chúng ta.
- **Không bao giờ dọn `/tmp` hoặc `_work` thủ công khi bất kỳ runner nào đang bận.** Việc
  kiểm tra rồi xóa với một khoảng trễ giữa hai thao tác là nguyên nhân khiến một job `Build` đang
  chạy bị mất `_work` vào 2026-08-27. Janitor thực hiện việc kiểm tra và xóa trong một bước;
  hãy để nó làm.
- Dừng runner giữa lúc đang chạy job sẽ hủy job đó (đã quan sát trực tiếp): chỉ dùng `systemctl stop`
  khi listener của runner không có tiến trình con `Runner.Worker` — và hãy thực hiện trong một lệnh.
- Workflow không được lưu artefact trong `/tmp` (đó là RAM). Hãy tải xuống
  `$RUNNER_TEMP` (nằm trên đĩa, riêng cho từng runner) — artefact `next-build` 1.3 GB mất 27–32
  phút để được ghi xuống tmpfs và 2 phút để tải lên từ đĩa.
- VPS `.15` chỉ dành cho homologation — tuyệt đối không chạy runner CI.

## Luồng hosted (runner do GitHub lưu trữ)

Tài khoản đang sử dụng gói **Pro**: **40 công việc hosted chạy đồng thời**, được dùng chung cho mọi lượt kiểm tra PR,
mọi workflow được kích hoạt khi push và thiết lập mặc định của CodeQL. Theo số liệu đo ngày 2026-10-18 trong một
chiến dịch merge (~10 lượt merge/giờ trên `release/v3.8.52`): **2.500 lượt chạy workflow được tạo trong
24 giờ**, 44 lượt push lên nhánh trong 6 giờ, **106 công việc hosted nằm trong hàng đợi** trong khi các lượt kiểm tra PR phải chờ
hàng giờ và các PR được merge mà không có chúng. Chín workflow được kích hoạt sau mỗi lượt push lên nhánh:

| mỗi lượt push lên `release/v*`              | công việc hosted | kết quả trong đợt quá tải                                               | kể từ 2026-10-18                                                                 |
| ------------------------------------------- | ---------------: | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `ci.yml` (ma trận đầy đủ)                   |        tối đa 30 | bị lượt push tiếp theo hủy, 24 trên 24 trong một ngày                   | không khởi chạy khi push lên `release/**` (lượt chạy PR + Release-Green)         |
| `quality.yml`                               |               ~6 | bị hủy, 23 trên 23                                                      | không khởi chạy khi push lên `release/**`                                        |
| `Release-Green` `--quick`                   |                0 | chạy trên `omni-build`, 97 trên 100 bị hủy                              | slot `omni-release`, không bao giờ bị hủy, các lượt chờ được gộp lại             |
| `Lock released branch`, `OpenSSF Scorecard` |                2 | một lượt chạy nằm trong hàng đợi cho mỗi lượt push                      | một lượt chạy trên mỗi ref (`tests/unit/build/hosted-lane-concurrency.test.ts`)  |
| `Release acceptance` (báo cáo ngầm)         |                1 | một `npm ci` hosted cho mỗi lượt push, không bao giờ bị hủy             | không thay đổi — ứng viên để áp dụng bộ lọc `paths:`                             |
| `Publish to Docker Hub` → `Deploy to VPS`   |                2 | bị hủy theo mỗi lượt push; nhánh amd64 tranh chấp trên `omni-build`     | không thay đổi — kênh triển khai của chủ sở hữu                                  |
| Thiết lập mặc định CodeQL (`dynamic`)       |                4 | `javascript-typescript`, `actions`, `c-cpp`, `python` cho mỗi lượt push | không thay đổi — Cài đặt → Bảo mật mã; `c-cpp`/`python` không quét được gì ở đây |

`tests/unit/build/push-storm-diet.test.ts` cố định trigger push chỉ dành cho `main` của `ci.yml` và
`quality.yml`. Tác dụng phụ: Codecov không còn nhận được bản tải coverage cơ sở cho mỗi lượt push lên nhánh release (bước này
chỉ mang tính thông tin và có `continue-on-error`); cổng coverage trong repo và bình luận PR
không bị ảnh hưởng.

**Tăng thêm năng lực self-hosted không giải quyết được hàng đợi hosted.** Devbox
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) có thể chạy một runner, nhưng các phiên agent hiện đã
duy trì mức tải 20–26, container của agent không có Docker daemon, và luồng đang bão hòa
là luồng hosted. Máy `.113` còn trống 71 GB và có mức tải 5–8 tại cùng thời điểm; giới hạn của máy này
là ngân sách bộ nhớ cho mỗi listener nêu trên (tối đa 6 listener), không phải CPU. Các biện pháp còn lại
thuộc về quy trình: merge các PR trong chiến dịch thông qua hàng đợi Mergify (`label=queue`, các batch dùng chung
một lượt chạy CI `merge_group` thay vì một lượt chạy cho mỗi PR cộng thêm một lượt cho mỗi lần push), tinh giản các ngôn ngữ
trong thiết lập mặc định của CodeQL, và lọc `release-acceptance.yml` theo các tệp mà nó đọc.
