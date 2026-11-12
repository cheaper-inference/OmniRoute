# Self-Hosted Runner Box Operations (.113 pool) (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Nhóm tự lưu trữ chạy trên **.113** hộp (`tomni-proxmox-113`). Kể từ ngày 18-10-2026, mỗi vận động viên OmniRoute đều có **một vai trò** , một nhãn và ngân sách memory/CPU có quy mô phù hợp với khối lượng công việc của nó đo được. Khe Turbopack đáp ứng được những gì bản dựng cần; các khe khác có kích thước theo kích thước đỉnh đo được của chúng. Hộp chỉ cam kết quá mức khi bản dựng Turbopack trùng với bản dựng gói web Release-Green và công việc tìm lỗi mã nguồn; trao đổi máy chủ (16 GB) hấp thụ điều đó và vì các Bản dựng yêu cầu kéo chạy được lưu trữ trên máy chủ, nên vị trí Turbopack hầu như không hoạt động:

| Á hậu                | nhãn                            | vai trò                                                                                                                                                  | `MemoryHigh` / `MemoryMax`    | `CPUQuota`    |
| -------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------------- |
| `omniroute-113-5`    | `omni-build`, `omni-build-60gb` | Bản dựng Turbopack : `ci.yml` `Build` ( chỉ push/dispatch ), Docker AMD64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, bản dựng a11y hàng đêm | 56 GB / 60 GB (hoán đổi 0)    | 1600 %        |
| `omniroute-113-6`    | `omni-release`                  | Release-Green (`release-green` + `main-green`), bản dựng webpack                                                                                         | 20 GB / 24 GB (hoán đổi 4 GB) | 800 %         |
| `omniroute-113-2`    | `omni-light`                    | nightlies (Lược đồ, nhắcfoo, garak, k6) và `quality.yml` `lint-guard`                                                                                    | 12 GB / 16 GB (hoán đổi 4 GB) | 600 %         |
| `omniroute-113`      | `omni-light`                    | cùng một hồ bơi như trên                                                                                                                                 | 8 GB / 12 GB                  | 400 %         |
| OmniHeuris, OmniMind | (repo của họ)                   | Chỉ Dependabot (cao nhất 155 MB mỗi loại, 18-10-2026)                                                                                                    | 4 GB / 6 GB                   | 200 % mỗi cái |

Được đo vào ngày 18-10-2026:

| tài nguyên    | giá trị                          | ý nghĩa của việc lập kế hoạch                                                                                                                                                                                                                                                                                                                                                                              |
| ------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU     | **78 GB / 32 lõi**               | một bản dựng sản xuất Turbopack đạt đỉnh 49 GB chưa được khai thác (`tests/unit/ci-build-bundler-webpack.test.ts`); vào ngày 16.3.8 tiếp theo, riêng giai đoạn biên dịch đã giữ ~ 40 GB (36 GB RSS trong `next-build` cộng với 17 công nhân tải ở 3 GB, được đo vào ngày 18-10-2026); bản dựng webpack tại ~ 14–16 GB. Một bản dựng gói web Turbopack + phù hợp với nhau; hai bản dựng Turbopack thì không |
| tráo đổi      | 16 GB                            | `omniroute-113-5` chạy với tính năng tắt trao đổi (`MemorySwapMax=0`) nên bản dựng chạy trốn sẽ bị cắt ở giới hạn thay vì hoán đổi hộp                                                                                                                                                                                                                                                                     |
| `/tmp`        | **12 GB tmpfs = RAM**            | bất cứ thứ gì đậu ở đó đều là ký ức; thức ăn thừa được quét sau 3 giờ                                                                                                                                                                                                                                                                                                                                      |
| CPU           | tải 60 trên 32 lõi được quan sát | trước hạn ngạch, một bản dựng Turbopack (~ 1166 % CPU) cộng với bộ phủ sóng trên cùng một hộp đã khiến nhịp tim của những người nghe khác bị đói (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                                                     |
| người chạy bộ | **7 người nghe** (28-10-2026)    | 5 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-5` cũng mang `omni-build-60gb`; `omniroute-113-3/-4/-8` đã bị xóa khỏi repo (28-10-2026)                                                                                                                                                                                                                                                               |

Các giới hạn tồn tại trong `/etc/systemd/system/actions.runner.<…>.service.d/override.conf` của mỗi đơn vị (các giá trị trước đó được giữ là `override.conf.bak-20261018`) và được áp dụng trực tiếp với `systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — mà không cần khởi động lại, do đó không có tác vụ đang chạy nào được chạm vào. Nhãn được thay đổi thông qua các vận động viên API (`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` / `gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), cũng trực tiếp.

## Cài đặt người gác cổng (một lần, trên hộp)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): every 30 min, log to /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

Bắt buộc phải có `lsof` : người gác cổng chứng minh một đường dẫn không hoạt động bằng một ảnh chụp nhanh các tệp đang mở trước khi xóa nó và nếu không có công cụ, người gác cổng sẽ không xóa gì và thông báo như vậy (thoát 1). Hãy thử bất kỳ thay đổi nào với `--dry-run` trước tiên. — sẽ in chính xác những gì nó sẽ làm và không chạm vào gì cả.

Công việc nó thực hiện mỗi lần chạy: quét phần còn lại của chúng ta (`runner-*`, `omniroute-*`, `next-build*`, `e2e-build.tar.gz`) sau **3 giờ trên tmpfs** và 24 giờ trên đĩa `_work/_temp`; cảnh báo về `next-build` cũ hơn 75 phút và duy trì hoạt động của nó; cắt tỉa 48 lượt kiểm tra cũ của các vận động viên có đơn vị **dừng lại** ; cảnh báo trên đĩa ≥ 85%, bộ nhớ PSI `full/avg60` ≥ 10% và nhiều người nghe hơn `MAX_ACTIVE_RUNNERS` (có phân tích omniroute/other ). Thoát 1 = cần chú ý; đọc nhật ký.

Chỉ riêng thời gian đã trôi qua không chứng minh được rằng một quá trình là mồ côi. Người gác cổng không bao giờ gửi tín hiệu dựa trên độ tuổi. Tên môi trường `ZOMBIE_BUILD_MAX_MIN` và `ZOMBIE_BUILD_COMM` hiện tại vẫn được hỗ trợ cho cấu hình cron. Trước khi dọn dẹp một trẻ mồ côi bị nghi ngờ, hãy xác nhận rằng công việc GitHub chính xác của nó là thiết bị đầu cuối và xác định các quy trình thuộc công việc đó. Khi `Runner.Listener` không thể gia hạn công việc của mình, `_diag/Runner_*.log` hiển thị `POST request to …/renewjob timed out after 100 seconds`, API báo cáo công việc `completed` (lỗi) khoảng mười phút sau lần gia hạn thành công cuối cùng và `next-build` tiếp tục chạy mà không có công việc nào kèm theo (18-10-2026: Bản dựng #17066 không thành công lúc 19:43 và bản dựng của nó vẫn giữ 40 GB năm phút sau đó). Xác nhận giới thiệu trong `_diag/Worker_*.log` mới nhất, sau đó SIGTERM chỉ là cây xây dựng của PID — `next-build`, `npm run build`, `build-next-isolated.mjs` và các nhân viên `_work`. Không bao giờ chạm vào `Runner.Listener`, `RunnerService.js` hoặc `Runner.Worker`: nhân viên báo cáo công việc là đã bị hủy và người nghe sẽ tự quay lại trực tuyến.

## Các unit của runner: KillMode

`KillMode=process` mặc định của runner khiến `Runner.Worker → npm → next-build` vẫn chạy khi một unit bị dừng hoặc khởi động lại — một build mồ côi tiếp tục tiêu tốn RAM và CPU mà không gắn với job nào. Mỗi unit OmniRoute đều có một drop-in (`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`) với `KillMode=mixed`: trước tiên gửi SIGTERM đến listener, sau đó gửi SIGKILL đến toàn bộ cgroup tại `TimeoutStop`. Thiết lập này có hiệu lực trong lần khởi động lại tiếp theo của unit — chỉ khởi động lại **từng runner một, khi runner đang rảnh**, với thao tác kiểm tra trạng thái rảnh và khởi động lại nằm trong cùng một lệnh.

## Quy tắc vận hành

- **Mỗi lần chỉ một bản dựng Turbopack — được thực thi bằng nhãn.** Mọi job chạy lệnh Turbopack
  `next build` đầy đủ đều nhắm đến `[self-hosted, omni-build, omni-build-60gb]`, và chỉ **`omniroute-113-5`** mang
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
  janitor là 8 (`MAX_ACTIVE_RUNNERS=8` trong cron): nó đếm mọi `Runner.Listener` trên máy, còn
  OmniHeuris + OmniMind bổ sung hai listener vào năm listener của chúng ta.
- **Các job unit và Vitest vẫn chạy trên runner hosted.** `ci.yml` chỉ gửi các shard unit và job Vitest đến `[self-hosted, omni-ci]` khi biến repository `vars.USE_VPS_TEST_RUNNER` là `true`, và kể cả khi đó cũng chỉ cho các lượt chạy `pull_request` từ cùng repository; fork, `merge_group` và push vẫn ở trên `ubuntu-latest` (`tests/unit/vps-runner-variable-scope.test.ts`). Biến này đang là `false`. Ngày 2026-10-28, ba listener `omni-ci` 4 nhân mất 250–270 s cho `npm ci` và mọi shard unit đều chạm giới hạn job 30 phút, so với ~634 s cho một shard hosted, trong khi máy ở mức tải 17–24. Các listener đó đã bị xóa. Không bật lại biến này khi chưa có listener được định cỡ phù hợp cho một shard unit.
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

Repository thuộc tổ chức `cheaper-inference`, sử dụng gói **Team**: **60 công việc hosted chạy đồng thời**, được dùng chung cho mọi repository trong tổ chức, mọi lượt kiểm tra PR, mọi workflow được kích hoạt khi push và thiết lập mặc định của CodeQL. Các số liệu dưới đây được đo trên gói **Pro** (40 công việc hosted chạy đồng thời). Theo số liệu đo ngày 2026-10-18 trong một
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
