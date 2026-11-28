# CLAUDE.md (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**ಎಲ್ಲಾ ಯೋಜನೆಯ ನಿಯಮಗಳು [`AGENTS.md`](AGENTS.md) ನಲ್ಲಿ ವಾಸಿಸುತ್ತವೆ** — ಪ್ರತಿ AI ಸಹಾಯಕ ಸತ್ಯದ ಏಕೈಕ ಮೂಲವಾಗಿದೆ; ಮೇಲಿನ ಆಮದು ಈಗಾಗಲೇ ಅದನ್ನು ಲೋಡ್ ಮಾಡುತ್ತದೆ. ಯೋಜನೆಯ ನಿಯಮಗಳನ್ನು ಇಲ್ಲಿ ಮರು-ಸೇರಿಸಬೇಡಿ. ಕೆಳಗಿನ ಎಲ್ಲವೂ Claude ಕೋಡ್ — ಗೆ ONLY ಅನ್ವಯಿಸುತ್ತದೆ `AGENTS.md` ನಲ್ಲಿ ಈಗಾಗಲೇ ವ್ಯಾಖ್ಯಾನಿಸಲಾದ ನಿಯಮಗಳ ಕಾರ್ಯಾಚರಣೆಯ ಪರಿಷ್ಕರಣೆಗಳು.

## ವರ್ಕ್ಟ್ರೀ ಐಸೋಲೇಶನ್ — Claude ಕೋಡ್ ನಿರ್ದಿಷ್ಟತೆಗಳು

- `AskUserQuestion` (ಹಾರ್ಡ್ ರೂಲ್ #19) ಮೂಲಕ ಆಪರೇಟರ್ನೊಂದಿಗೆ ಮೂಲ ಶಾಖೆಯನ್ನು ದೃಢೀಕರಿಸಿ ಅವರು ಈಗಾಗಲೇ ನಿಮಗೆ ತಿಳಿಸದ ಹೊರತು.
- `scripts/dev/new-worktree.sh <branch> <confirmed-base>` ನೊಂದಿಗೆ ವರ್ಕ್ಟ್ರೀ ಅನ್ನು ರಚಿಸಿ (ಇದು `.claude/worktrees/` ಅಡಿಯಲ್ಲಿ ಇಳಿಯುತ್ತದೆ, ಹಾರ್ಡ್-ಲಿಂಕ್ಗಳು `node_modules` ಮತ್ತು ನಕಲುಗಳು `.husky/_`), ನಂತರ `EnterWorktree` ಅದರ `path` ನೊಂದಿಗೆ ಕರೆ ಮಾಡಿ. ಯಾವಾಗಲೂ ಬೇಸ್ ಅನ್ನು ರವಾನಿಸಿ: ಅದು ಇಲ್ಲದೆಯೇ ಸ್ಕ್ರಿಪ್ಟ್ ಅತ್ಯಧಿಕ `release/*` ಆಯ್ಕೆಮಾಡುತ್ತದೆ, ಅದು ಆಪರೇಟರ್ ದೃಢೀಕರಿಸದಿರಬಹುದು. `EnterWorktree` ಸ್ವತಃ ರಚಿಸುವ ವರ್ಕ್ಟ್ರೀ ಗಟ್ಟಿಯಾದ ಲಿಂಕ್ಗಳು ಅಥವಾ ಕೊಕ್ಕೆಗಳನ್ನು ಹೊಂದಿರುವುದಿಲ್ಲ, ಆದ್ದರಿಂದ ಯಾವುದೇ ಪೂರ್ವ ಬದ್ಧತೆಯ ಗೇಟ್ ಅದರಲ್ಲಿ ಚಲಿಸುವುದಿಲ್ಲ.

## ಉಪಕಾರಕಗಳು ಮತ್ತು ಜಿಟ್

Git (ಏಜೆಂಟ್ ಟೂಲ್ ಅಥವಾ ವರ್ಕ್ಫ್ಲೋ ಸ್ಕ್ರಿಪ್ಟ್) ಅನ್ನು ಸ್ಪರ್ಶಿಸುವ ಪ್ರತಿಯೊಂದು ಸಬ್ಜೆಂಟ್ಗೆ ಹಾರ್ಡ್ ರೂಲ್ #22 a's `git stash` ಬ್ಯಾನ್ ವರ್ಬ್ಯಾಟಿಮ್ ಅನ್ನು ಅದರ ಪ್ರಾಂಪ್ಟ್ — ನಲ್ಲಿ ಪಡೆಯುತ್ತದೆ, ಸ್ಟ್ಯಾಶ್ ಘಟನೆಯ ರೆಕಾರ್ಡ್ ಪುನರಾವರ್ತನೆಯು ಸಬ್ಜೆಂಟ್ ಮೂಲಕ ಬಂದಿದೆ.

## ಯೋಜನೆ ಕಲಾಕೃತಿಗಳು — ಮಹಾಶಕ್ತಿಗಳ ಮಾರ್ಗವನ್ನು ಅತಿಕ್ರಮಿಸುತ್ತದೆ

ಸೂಪರ್ ಪವರ್ಸ್ ಕೌಶಲ್ಯಗಳು `docs/superpowers/plans/`, `docs/superpowers/specs/` ಮತ್ತು `docs/research/` ಅಡಿಯಲ್ಲಿ ಡಿಫಾಲ್ಟ್ಗಳನ್ನು ಪ್ರಕಟಿಸುತ್ತವೆ. ಬರೆಯುವ ಮೊದಲು `AGENTS.md` → "ಪ್ಲಾನಿಂಗ್ & ರಿಸರ್ಚ್ ಆರ್ಟಿಫ್ಯಾಕ್ಟ್ಸ್" ನಲ್ಲಿ ಪ್ರತಿಯೊಂದನ್ನು ಅದರ `_tasks/` ಸಮಾನಕ್ಕೆ ಪುನಃ ಬರೆಯಿರಿ ಮತ್ತು ಮುಖ್ಯ ರೆಪೊದಲ್ಲಿ ಎಂದಿಗೂ `git -C _tasks …` ನೊಂದಿಗೆ ಒಪ್ಪಿಸಿ.

## ಸ್ಕ್ರ್ಯಾಚ್ ಫೈಲ್ಗಳು — `_artifacts/`, `/tmp` ಅಲ್ಲ

ಈ ಯೋಜನೆಯು ಹಾರ್ನೆಸ್ನ ಸೆಷನ್ ಸ್ಕ್ರ್ಯಾಚ್ಪ್ಯಾಡ್ (`/tmp/claude-*/…`) ಅನ್ನು ಅತಿಕ್ರಮಿಸುತ್ತದೆ. ತಾತ್ಕಾಲಿಕ ಫೈಲ್ಗಳನ್ನು ಬರೆಯಿರಿ — ರಫ್ತುಗಳು, ರಚಿಸಲಾದ ಜಿಪ್ಗಳು, ಒಂದು-ಆಫ್ ಮಧ್ಯಂತರ ಔಟ್ಪುಟ್ಗಳು — ಗೆ `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: ಒಂದು gitignored root `_*` ಮಾರ್ಗ, ಆದ್ದರಿಂದ ಆಪರೇಟರ್ ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ ಎಲ್ಲಾ ಸ್ಕ್ರ್ಯಾಚ್ಗಳನ್ನು ಹುಡುಕುತ್ತದೆ ಮತ್ತು ಅಳಿಸುತ್ತದೆ. ಬಾಳಿಕೆ ಬರುವ ಯೋಜನೆಗಳು, ಸ್ಪೆಕ್ಸ್, ಸಂಶೋಧನೆ ಮತ್ತು ಹ್ಯಾಂಡ್-ಆಫ್ಗಳು ಬದಲಾಗಿ `_tasks/` ಗೆ ಹೋಗುತ್ತವೆ (ಹಾರ್ಡ್ ರೂಲ್ #23).

## ಕೆಂಪು ಬೇಸ್

ಸಂಗ್ರಹವಾದ ಕೆಂಪು ಸ್ಥಿತಿಯನ್ನು (ಮೂಲ ತುದಿ + ಕೆಂಪು PRs) ಬರಿದಾಗಿಸಲು, `/sweep-reds` ಕೌಶಲ್ಯವನ್ನು ಬಳಸಿ.
