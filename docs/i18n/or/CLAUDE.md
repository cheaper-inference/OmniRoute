# CLAUDE.md (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**ସମସ୍ତ ପ୍ରକଳ୍ପ ନିୟମ [`AGENTS.md`](AGENTS.md) ରେ ବାସ କରେ।** — ପ୍ରତ୍ୟେକ AI ସହାୟକ ପାଇଁ ସତ୍ୟର ଏକକ ଉତ୍ସ; ଉପରୋକ୍ତ ଆମଦାନୀ ଏହାକୁ ଲୋଡ୍ କରିସାରିଛି। ଏଠାରେ ପ୍ରୋଜେକ୍ଟ ନିୟମକୁ ପୁନ add ଯୋଡନ୍ତୁ ନାହିଁ। ନିମ୍ନରେ ସବୁକିଛି ONLY କୁ Claude କୋଡ୍ — ପ୍ରୟୋଗ କରିଥାଏ ଯାହାକି ପୂର୍ବରୁ `AGENTS.md` ରେ ବ୍ୟାଖ୍ୟା କରାଯାଇଛି।

## ୱାର୍କଟ୍ରି ବିଚ୍ଛିନ୍ନତା — Claude କୋଡ୍ ନିର୍ଦ୍ଦିଷ୍ଟତା।

- `AskUserQuestion` (ହାର୍ଡ ନିୟମ #19) ମାଧ୍ୟମରେ ଅପରେଟର୍ ସହିତ ଆଧାର ଶାଖା ନିଶ୍ଚିତ କରନ୍ତୁ ଯଦି ସେମାନେ ଆପଣଙ୍କୁ ପୂର୍ବରୁ କହି ନାହାଁନ୍ତି।
- `scripts/dev/new-worktree.sh <branch> <confirmed-base>` ସହିତ ୱାର୍କଟ୍ରି ସୃଷ୍ଟି କରନ୍ତୁ (ଏହା `.claude/worktrees/` ଅଧୀନରେ ଅଛି, ହାର୍ଡ-ଲିଙ୍କ୍ `node_modules` ଏବଂ `.husky/_` କପି କରେ), ତାପରେ `EnterWorktree` `path` ସହିତ କଲ୍ କରନ୍ତୁ। ସର୍ବଦା ଆଧାର ପାସ୍ କରନ୍ତୁ: ଏହା ବିନା ସ୍କ୍ରିପ୍ଟ ସର୍ବାଧିକ `release/*` ବାଛିଥାଏ, ଯାହା ଅପରେଟର୍ ନିଶ୍ଚିତ କରିଥିବା ହୋଇନପାରେ। `EnterWorktree` ନିଜେ ସୃଷ୍ଟି କରୁଥିବା ଏକ ୱାର୍କଟ୍ରିରେ କ hard ଣସି ହାର୍ଡ ଲିଙ୍କ୍ ନାହିଁ କିମ୍ବା ହୁକ୍ ନାହିଁ, ତେଣୁ ଏଥିରେ କ pre ଣସି ପ୍ରି-କମାଇଟ୍ ଗେଟ୍ ଚାଲିବ ନାହିଁ।

## ସବଜେଣ୍ଟସ୍ ଏବଂ ଗିଟ୍।

Git କୁ ସ୍ପର୍ଶ କରୁଥିବା ପ୍ରତ୍ୟେକ ସବଜେଣ୍ଟ୍ (ଏଜେଣ୍ଟ୍ ଟୁଲ୍ କିମ୍ବା ୱାର୍କଫ୍ଲୋ ସ୍କ୍ରିପ୍ଟ) ହାର୍ଡ ନିୟମ #22 a ର `git stash` ବ୍ୟାନ୍ ଭର୍ବାଟିମ୍ ପାଇଥାଏ ଏହାର ପ୍ରମ୍ପ୍ଟ — ରେ ଷ୍ଟାଶ ଘଟଣାର ରେକର୍ଡ ହୋଇଥିବା ପୁନରାବୃତ୍ତି ଏକ ସବଜେଣ୍ଟ ମାଧ୍ୟମରେ ଆସିଥିଲା।

## ଯୋଜନା କଳାକୃତି — ସୁପର ପାୱାର୍ ପଥ ଓଭରବ୍ରିଡ୍।

ସୁପର ପାୱାର୍ କ skills ଶଳ `docs/superpowers/plans/`, `docs/superpowers/specs/` ଏବଂ `docs/research/` ଅଧୀନରେ ଡିଫଲ୍ଟ ଘୋଷଣା କରେ। ଲେଖିବା ପୂର୍ବରୁ `AGENTS.md` → "ଯୋଜନା ଏବଂ ଅନୁସନ୍ଧାନ କଳାକୃତି" ରେ ଏହାର `_tasks/` ସମକକ୍ଷକୁ ପ୍ରତ୍ୟେକକୁ ପୁନ r ଲେଖନ୍ତୁ, ଏବଂ ଏହାକୁ `git -C _tasks …` ସହିତ କର, ମୂଖ୍ୟ ରେପୋରେ କେବେବି ନୁହେଁ।

## — `_artifacts/` ଫାଇଲଗୁଡିକ ସ୍କ୍ରାଚ୍ କରନ୍ତୁ, `/tmp` ନୁହେଁ।

ଏହି ପ୍ରୋଜେକ୍ଟ ହର୍ଣ୍ଣର ଅଧିବେଶନ ସ୍କ୍ରାଚପ୍ୟାଡ୍ (`/tmp/claude-*/…`) କୁ ନବଲିଖନ କରେ। ଅସ୍ଥାୟୀ ଫାଇଲଗୁଡ଼ିକ — ରପ୍ତାନି, ଉତ୍ପାଦିତ ଜିପ୍ସ, `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` ରୁ ଗୋଟିଏ ଅଫ୍ ମଧ୍ୟବର୍ତ୍ତୀ ଆଉଟପୁଟ୍ — ଲେଖନ୍ତୁ: ଏକ gitignored ମୂଳ `_*` ପଥ, ତେଣୁ ଅପରେଟର୍ ଗୋଟିଏ ସ୍ଥାନରେ ସମସ୍ତ ସ୍କ୍ରାଚ୍ ଖୋଜି ଡିଲିଟ୍ କରେ। ସ୍ଥାୟୀ ଯୋଜନା, ଚରିତ୍ର, ଅନୁସନ୍ଧାନ ଏବଂ ହ୍ୟାଣ୍ଡ-ଅଫ୍ ବଦଳରେ `_tasks/` କୁ ଯାଏ (ହାର୍ଡ ନିୟମ #23)।

## ଲାଲ୍ ଆଧାର।

ଏକ ଜମା ହୋଇଥିବା ଲାଲ୍ ଅବସ୍ଥା (ବେସ୍ ଟିପ୍ + ଲାଲ୍ PRs) ନିଷ୍କାସନ କରିବାକୁ, `/sweep-reds` କ ill ଶଳ ବ୍ୟବହାର କରନ୍ତୁ।
