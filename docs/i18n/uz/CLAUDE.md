# CLAUDE.md (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**All project rules live in [`AGENTS.md`](AGENTS.md)** — the single source of truth for every AI assistant; the import above already loads it. Do not re-add project rules here. Everything below applies ONLY to Claude Code — operational refinements of rules already defined in `AGENTS.md`.

## Ish daraxti izolyatsiyasi — Claude Kod xususiyatlari

- Asosiy filialni operator bilan `AskUserQuestion` (Qattiq qoida #19) orqali tasdiqlang, agar ular sizga aytmasa.
- Ish daraxtini `scripts/dev/new-worktree.sh <branch> <confirmed-base>` bilan yarating (u `.claude/worktrees/` ostiga tushadi, `node_modules` qattiq bog'laydi va `.husky/_` nusxalaydi), so'ngra `path` bilan `EnterWorktree` qo'ng'iroq qiling. Har doim bazani o'tkazing: usiz skript eng yuqori `release/*` tanlaydi, bu operator tasdiqlagani bo'lmasligi mumkin. `EnterWorktree` o'z-o'zidan yaratadigan ishchi daraxtda na qattiq bog'lanishlar, na ilgaklar mavjud, shuning uchun unda hech qanday oldindan topshirilgan eshik ishlamaydi.

## Subagentlar va git

Git (Agent vositasi yoki Ish jarayoni skripti) ga tegadigan har bir subagent Hard Rule #22 a ning `git stash` taqiqini so'zma-so'z oladi — stash hodisasining qayd etilgan takrorlanishi subagent orqali sodir bo'ladi.

## Rejalashtirish artefaktlari — super kuchlar yo'lini bekor qiladi

Superpowers ko'nikmalari `docs/superpowers/plans/`, `docs/superpowers/specs/` va `docs/research/` ostida standart sozlamalarni e'lon qiladi. Yozishdan oldin har birini `AGENTS.md` → "Rejalashtirish va tadqiqot artefaktlari" dagi `_tasks/` ekvivalentiga qayta yozing va uni hech qachon asosiy repoda emas, `git -C _tasks …` bilan bajaring.

## Scratch fayllari — `_artifacts/`, `/tmp` emas

Bu loyiha jabduqlar seans skretchpadini (`/tmp/claude-*/…`) bekor qiladi. Vaqtinchalik fayllarni yozing — eksporti, yaratilgan ziplar, bir martalik oraliq chiqishlar — to `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: gitignored root `_*` yo'li, shuning uchun operator barcha tirnalishlarni bir joyda topadi va o'chiradi. Bardoshli rejalar, spetsifikatsiyalar, tadqiqotlar va topshiriqlar o'rniga `_tasks/` ga o'tadi (Qattiq qoida #23).

## Qizil tayanch

Yig'ilgan qizil holatni (tayanch uchi + qizil PRs) o'chirish uchun `/sweep-reds` mahoratidan foydalaning.
