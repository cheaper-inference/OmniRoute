# CLAUDE.md (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**සියලුම ව්‍යාපෘති නීති [`AGENTS.md`](AGENTS.md) හි ජීවත් වේ** — සෑම AI සහායකයෙකු සඳහාම සත්‍යයේ තනි මූලාශ්‍රය; ඉහත ආනයනය දැනටමත් එය පූරණය කරයි. මෙහි ව්‍යාපෘති රීති නැවත එකතු නොකරන්න. `AGENTS.md` හි දැනටමත් අර්ථ දක්වා ඇති නීතිරීතිවල ONLY මෙහෙයුම් ශෝධනය Claude කේතය — සඳහා පහත සෑම දෙයක්ම අදාළ වේ.

## වැඩ ගස් හුදකලා කිරීම — Claude කේතයේ විශේෂතා

- ඔවුන් දැනටමත් ඔබට පවසා නොමැති නම් `AskUserQuestion` (Hard Rule #19) හරහා ක්‍රියාකරු සමඟ මූලික ශාඛාව තහවුරු කරන්න.
- `scripts/dev/new-worktree.sh <branch> <confirmed-base>` සමඟ වැඩ ගස සාදන්න (එය `.claude/worktrees/` යටතේ ගොඩබසිනු ඇත, දෘඪ-සබැඳි `node_modules` සහ පිටපත් `.husky/_`), ඉන්පසු එහි `path` සමඟ `EnterWorktree` අමතන්න. සෑම විටම පාදම පසු කරන්න: එය නොමැතිව ස්ක්‍රිප්ටය ඉහළම `release/*` තෝරා ගනී, එය ක්‍රියාකරු තහවුරු කළ එක නොවිය හැක. `EnterWorktree` විසින්ම නිර්මාණය කරන ලද වැඩ ගසක දෘඩ සබැඳි හෝ කොකු නොමැති බැවින් එහි පූර්ව කැපවීමේ දොරටුවක් ධාවනය නොවේ.

## උපකාරක සහ git

git ස්පර්ශ කරන සෑම උප නියෝජිතයෙකුටම (Agent tool හෝ Workflow script) Hard Rule #22 a's `git stash` ban වාචිකව එහි prompt — වලදී ස්ටෑෂ් සිද්ධියේ වාර්තාගත පුනරාවර්තනය උප කාරකයක් හරහා ලැබේ.

## සැලසුම් කෞතුක වස්තු — superpowers මාර්ගය අභිබවා යයි

Superpowers කුසලතා `docs/superpowers/plans/`, `docs/superpowers/specs/` සහ `docs/research/` යටතේ පෙරනිමිය නිවේදනය කරයි. ලිවීමට පෙර `AGENTS.md` → "සැලසුම් සහ පර්යේෂණ කෞතුක වස්තු" හි `_tasks/` ට සමාන සෑම එකක්ම නැවත ලියන්න, සහ `git -C _tasks …` සමඟ එය සිදු කරන්න, කිසි විටෙක ප්‍රධාන ප්‍රතිපෝෂණයේ නොවේ.

## — `_artifacts/` ගොනු සීරීමට, `/tmp` නොවේ

මෙම ව්‍යාපෘතිය පටිවල සැසි සීරීම් පෑඩ් (`/tmp/claude-*/…`) අභිබවා යයි. තාවකාලික ගොනු — අපනයන, ජනනය කරන ලද සිප්, — සිට `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` දක්වා එක්-ඕෆ් අතරමැදි ප්‍රතිදානයන් ලියන්න: gitignored root `_*` මාර්ගයක්, එම නිසා ක්‍රියාකරු සියලු සීරීම් එක තැනකින් සොයාගෙන මකා දමයි. කල්පවත්නා සැලසුම්, පිරිවිතර, පර්යේෂණ සහ ප්‍රතිවිපාක වෙනුවට `_tasks/` වෙත යන්න (Hard Rule #23).

## රතු පදනම

සමුච්චිත රතු තත්ත්‍වයක් (පාදක තුඩ + රතු PRs) ඉවත් කිරීමට `/sweep-reds` කුසලතාව භාවිතා කරන්න.
