# CLAUDE.md (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Tất cả các quy tắc dự án đều có trong [`AGENTS.md`](AGENTS.md)** — nguồn sự thật duy nhất cho mọi trợ lý AI ; quá trình nhập ở trên đã tải nó. Không thêm lại các quy tắc dự án ở đây. Mọi thứ bên dưới áp dụng ONLY cho Claude Code — sàng lọc hoạt động của các quy tắc đã được xác định trong `AGENTS.md`.

## Cách ly Worktree — Claude Mã cụ thể

- Xác nhận nhánh cơ sở với nhà điều hành thông qua `AskUserQuestion` (Quy tắc cứng #19) trừ khi họ đã thông báo cho bạn.
- Tạo cây làm việc với `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (nó nằm dưới `.claude/worktrees/`, liên kết cứng `node_modules` và sao chép `.husky/_`), sau đó gọi `EnterWorktree` bằng `path` của nó. Luôn vượt qua cơ sở: nếu không có nó, tập lệnh sẽ chọn `release/*` cao nhất, đây có thể không phải là giá trị mà nhà điều hành đã xác nhận. Một cây làm việc mà `EnterWorktree` tự tạo ra không có liên kết cứng cũng như không có móc nối, do đó không có cổng xác nhận trước nào chạy trong đó.

## Các chất phụ và git

Mọi tác nhân phụ chạm vào git (Công cụ tác nhân hoặc tập lệnh Quy trình công việc) đều nhận được nguyên văn `git stash` cấm của Quy tắc cứng #22 a trong lời nhắc của nó — sự tái diễn được ghi lại của sự cố cất giấu đến từ một tác nhân phụ.

## Lập kế hoạch tạo tác — siêu năng lực ghi đè đường dẫn

Kỹ năng siêu năng lực thông báo mặc định theo `docs/superpowers/plans/`, `docs/superpowers/specs/` và `docs/research/`. Viết lại từng cái thành `_tasks/` tương đương với nó trong `AGENTS.md` → "Các hiện vật lập kế hoạch và nghiên cứu" trước khi viết và cam kết nó với `git -C _tasks …`, không bao giờ có trong repo chính.

## Tập tin cào — `_artifacts/`, không phải `/tmp`

Dự án này ghi đè bảng ghi phiên của bộ khai thác (`/tmp/claude-*/…`). Viết các tệp tạm thời — xuất, zip được tạo, đầu ra trung gian một lần — đến `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: một đường dẫn `_*` gốc được gitignored, do đó người vận hành tìm và xóa tất cả vết xước ở một nơi. Thay vào đó, các kế hoạch, thông số kỹ thuật, nghiên cứu và bàn giao lâu dài sẽ được chuyển đến `_tasks/` (Quy tắc cứng #23).

## Đế đỏ

Để tiêu hao trạng thái màu đỏ tích lũy (mũi cơ bản + đỏ PRs), hãy sử dụng kỹ năng `/sweep-reds`.
