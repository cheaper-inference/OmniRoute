# CLAUDE.md (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**ਸਾਰੇ ਪ੍ਰੋਜੈਕਟ ਨਿਯਮ [`AGENTS.md`](AGENTS.md) ਵਿੱਚ ਰਹਿੰਦੇ ਹਨ** — ਹਰੇਕ AI ਸਹਾਇਕ ਲਈ ਸੱਚਾਈ ਦਾ ਇੱਕੋ ਇੱਕ ਸਰੋਤ ਹੈ; ਉਪਰੋਕਤ ਆਯਾਤ ਪਹਿਲਾਂ ਹੀ ਇਸਨੂੰ ਲੋਡ ਕਰਦਾ ਹੈ. ਇੱਥੇ ਪ੍ਰੋਜੈਕਟ ਨਿਯਮਾਂ ਨੂੰ ਦੁਬਾਰਾ ਨਾ ਜੋੜੋ। ਹੇਠਾਂ ਦਿੱਤੀ ਹਰ ਚੀਜ਼ ONLY ਨੂੰ Claude ਕੋਡ — ਵਿੱਚ ਪਹਿਲਾਂ ਹੀ ਪਰਿਭਾਸ਼ਿਤ ਨਿਯਮਾਂ ਦੇ ਸੰਚਾਲਨ ਸੁਧਾਰਾਂ 'ਤੇ ਲਾਗੂ ਹੁੰਦੀ ਹੈ `AGENTS.md`

## ਵਰਕਟਰੀ ਆਈਸੋਲੇਸ਼ਨ — Claude ਕੋਡ ਦੀਆਂ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ

- `AskUserQuestion` (ਹਾਰਡ ਰੂਲ #19) ਰਾਹੀਂ ਓਪਰੇਟਰ ਨਾਲ ਅਧਾਰ ਸ਼ਾਖਾ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ ਜਦੋਂ ਤੱਕ ਉਹ ਤੁਹਾਨੂੰ ਪਹਿਲਾਂ ਹੀ ਨਹੀਂ ਦੱਸਦਾ।
- `scripts/dev/new-worktree.sh <branch> <confirmed-base>` ਨਾਲ ਵਰਕਟਰੀ ਬਣਾਓ (ਇਹ `.claude/worktrees/` ਦੇ ਹੇਠਾਂ ਆਉਂਦਾ ਹੈ, ਹਾਰਡ-ਲਿੰਕ `node_modules` ਅਤੇ ਕਾਪੀ ਕਰਦਾ ਹੈ `.husky/_`), ਫਿਰ `EnterWorktree` ਇਸਦੇ `path` ਨਾਲ ਕਾਲ ਕਰੋ। ਹਮੇਸ਼ਾ ਬੇਸ ਪਾਸ ਕਰੋ: ਇਸ ਤੋਂ ਬਿਨਾਂ ਸਕ੍ਰਿਪਟ ਸਭ ਤੋਂ ਉੱਚੇ `release/*` ਚੁਣਦੀ ਹੈ, ਜੋ ਓਪਰੇਟਰ ਦੁਆਰਾ ਪੁਸ਼ਟੀ ਕੀਤੀ ਨਹੀਂ ਹੋ ਸਕਦੀ। ਇੱਕ ਵਰਕਟ੍ਰੀ ਜੋ `EnterWorktree` ਆਪਣੇ ਆਪ ਬਣਾਉਂਦਾ ਹੈ ਉਸ ਵਿੱਚ ਨਾ ਤਾਂ ਹਾਰਡ ਲਿੰਕ ਅਤੇ ਨਾ ਹੀ ਹੁੱਕ ਹੁੰਦੇ ਹਨ, ਇਸਲਈ ਇਸ ਵਿੱਚ ਕੋਈ ਪ੍ਰੀ-ਕਮਿਟ ਗੇਟ ਨਹੀਂ ਚੱਲਦਾ।

## ਸਬਜੈਂਟ ਅਤੇ ਗਿੱਟ

ਹਰ ਉਪ-ਏਜੰਟ ਜੋ git (ਏਜੰਟ ਟੂਲ ਜਾਂ ਵਰਕਫਲੋ ਸਕ੍ਰਿਪਟ) ਨੂੰ ਛੂਹਦਾ ਹੈ, ਨੂੰ ਇਸਦੇ ਪ੍ਰੋਂਪਟ — ਵਿੱਚ ਹਾਰਡ ਨਿਯਮ #22 a's `git stash` ਬੈਨ ਵਰਬੈਟੀਮ ਮਿਲਦਾ ਹੈ, ਸਟੈਸ਼ ਘਟਨਾ ਦੀ ਰਿਕਾਰਡ ਕੀਤੀ ਆਵਰਤੀ ਇੱਕ ਸਬਜੈਂਟ ਦੁਆਰਾ ਆਈ ਹੈ।

## ਕਲਾਤਮਕ ਚੀਜ਼ਾਂ ਦੀ ਯੋਜਨਾ ਬਣਾਉਣਾ — ਸੁਪਰਪਾਵਰਜ਼ ਮਾਰਗ ਨੂੰ ਓਵਰਰਾਈਡ ਕਰਦਾ ਹੈ

ਸੁਪਰਪਾਵਰ ਦੇ ਹੁਨਰ `docs/superpowers/plans/`, `docs/superpowers/specs/` ਅਤੇ `docs/research/` ਦੇ ਅਧੀਨ ਡਿਫੌਲਟ ਘੋਸ਼ਿਤ ਕਰਦੇ ਹਨ। ਲਿਖਣ ਤੋਂ ਪਹਿਲਾਂ ਹਰ ਇੱਕ ਨੂੰ `AGENTS.md` → "ਯੋਜਨਾ ਅਤੇ ਖੋਜ ਕਲਾਤਮਕ ਚੀਜ਼ਾਂ" ਵਿੱਚ ਇਸਦੇ `_tasks/` ਦੇ ਬਰਾਬਰ ਲਿਖੋ, ਅਤੇ ਇਸਨੂੰ `git -C _tasks …` ਨਾਲ ਕਮਿਟ ਕਰੋ, ਕਦੇ ਵੀ ਮੁੱਖ ਰੈਪੋ ਵਿੱਚ ਨਹੀਂ।

## ਸਕ੍ਰੈਚ ਫਾਈਲਾਂ — `_artifacts/`, `/tmp` ਨਹੀਂ

ਇਹ ਪ੍ਰੋਜੈਕਟ ਹਾਰਨੇਸ ਦੇ ਸੈਸ਼ਨ ਸਕ੍ਰੈਚਪੈਡ (`/tmp/claude-*/…`) ਨੂੰ ਓਵਰਰਾਈਡ ਕਰਦਾ ਹੈ। ਆਰਜ਼ੀ ਫਾਈਲਾਂ — ਐਕਸਪੋਰਟ, ਜਨਰੇਟਿਡ ਜ਼ਿਪ, ਵਨ-ਆਫ ਇੰਟਰਮੀਡੀਏਟ ਆਉਟਪੁੱਟ — ਤੋਂ `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` ਲਿਖੋ: ਇੱਕ gitignored ਰੂਟ `_*` ਮਾਰਗ, ਇਸ ਲਈ ਓਪਰੇਟਰ ਇੱਕ ਥਾਂ 'ਤੇ ਸਾਰੇ ਸਕ੍ਰੈਚ ਲੱਭਦਾ ਅਤੇ ਮਿਟਾਉਂਦਾ ਹੈ। ਟਿਕਾਊ ਯੋਜਨਾਵਾਂ, ਸਪੈਕਸ, ਖੋਜ ਅਤੇ ਹੈਂਡ-ਆਫ ਇਸ ਦੀ ਬਜਾਏ `_tasks/` 'ਤੇ ਜਾਂਦੇ ਹਨ (ਹਾਰਡ ਨਿਯਮ #23)।

## ਲਾਲ ਅਧਾਰ

ਇੱਕ ਸੰਚਿਤ ਲਾਲ ਅਵਸਥਾ (ਬੇਸ ਟਿਪ + red PRs) ਨੂੰ ਕੱਢਣ ਲਈ, `/sweep-reds` ਹੁਨਰ ਦੀ ਵਰਤੋਂ ਕਰੋ।
