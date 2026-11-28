# CLAUDE.md (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Bütün layihə qaydaları [`AGENTS.md`](AGENTS.md) -da yaşayır** — hər AI köməkçisi üçün yeganə həqiqət mənbəyi; yuxarıdakı idxal artıq onu yükləyir. Layihə qaydalarını bura yenidən əlavə etməyin. Aşağıdakı hər şey artıq `AGENTS.md` — Claude ONLY aiddir.

## İş ağacı izolyasiyası — Claude Kodunun xüsusiyyətləri

- Əgər onlar sizə deməsələr, `AskUserQuestion` (Hard Rule #19) vasitəsilə operatorla baza filialını təsdiqləyin.
- `scripts/dev/new-worktree.sh <branch> <confirmed-base>` ilə iş ağacını yaradın ( `.claude/worktrees/` altına enir, `node_modules` bərk bağlayır və `.husky/_` kopyalayır), sonra `path` ilə `EnterWorktree` çağırın. Həmişə bazanı keçin: onsuz skript operatorun təsdiq etdiyi ən yüksək `release/*` seçir. `EnterWorktree` öz-özünə yaratdığı iş ağacının nə sərt keçidləri, nə də qarmaqları var, ona görə də onun içərisində heç bir əvvəlcədən icra qapısı işləmir.

## Subagentlər və git

Every subagent that touches git (Agent tool or Workflow script) gets Hard Rule #22a's `git stash` ban verbatim in its prompt — the recorded recurrence of the stash incident came through a subagent.

## Planlaşdırma artefaktları — supergüclərin yolunu ləğv edir

Supergüclər bacarıqları `docs/superpowers/plans/`, `docs/superpowers/specs/` və `docs/research/` altında defoltları elan edir . Yazmadan əvvəl hər birini `AGENTS.md` → "Planlaşdırma və Tədqiqat Artefaktları" ilə öz `_tasks/` ekvivalentinə yenidən yazın və bunu heç vaxt əsas repoda deyil, `git -C _tasks …` ilə yerinə yetirin.

## Scratch faylları — `_artifacts/`, `/tmp` deyil

Bu layihə qoşqunun seans skreçpadını (`/tmp/claude-*/…`) ləğv edir. Müvəqqəti faylları yazın — ixracı, yaradılan ziplər, birdəfəlik ara çıxışlar — to `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: gitignored root `_*` yolu, beləliklə operator bütün cızıqları bir yerdə tapıb silir. Davamlı planlar, spesifikasiyalar, tədqiqatlar və təhvil-təslimlər əvəzinə `_tasks/` -ə keçir (Hard Rule #23).

## Qırmızı baza

Yığılmış qırmızı vəziyyəti boşaltmaq üçün (əsas uc + qırmızı PRs) `/sweep-reds` bacarığından istifadə edin.
