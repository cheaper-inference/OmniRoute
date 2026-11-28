# CLAUDE.md (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**پروجیکٹ کے تمام قواعد [`AGENTS.md`](AGENTS.md) میں رہتے ہیں۔** — ہر AI اسسٹنٹ کے لیے سچائی کا واحد ذریعہ ہے۔ اوپر کی درآمد پہلے ہی اسے لوڈ کرتی ہے۔ یہاں پراجیکٹ کے قواعد کو دوبارہ شامل نہ کریں۔ نیچے دی گئی ہر چیز ONLY کا اطلاق Claude کوڈ — پر پہلے سے ہی `AGENTS.md` میں بیان کردہ قواعد کی آپریشنل اصلاحات پر ہوتی ہے۔

## ورک ٹری آئسولیشن — Claude کوڈ کی تفصیلات

- آپریٹر کے ساتھ `AskUserQuestion` (Hard Rule #19) کے ذریعے بیس برانچ کی تصدیق کریں جب تک کہ وہ آپ کو پہلے ہی نہ بتا دیں۔
- ورک ٹری کو `scripts/dev/new-worktree.sh <branch> <confirmed-base>` کے ساتھ بنائیں (یہ `.claude/worktrees/` کے نیچے آتا ہے، ہارڈ لنکس `node_modules` اور کاپی کرتا ہے `.husky/_`)، پھر `EnterWorktree` اس کے `path` کے ساتھ کال کریں۔ ہمیشہ بیس پاس کریں: اس کے بغیر اسکرپٹ سب سے زیادہ `release/*` چنتا ہے، جس کی آپریٹر نے تصدیق نہیں کی۔ ایک ورک ٹری جو `EnterWorktree` خود بناتا ہے اس میں نہ تو سخت روابط ہوتے ہیں اور نہ ہی ہکس، لہذا اس میں کوئی پری کمٹ گیٹ نہیں چلتا ہے۔

## ذیلی ایجنٹ اور گٹ

گٹ (ایجنٹ ٹول یا ورک فلو اسکرپٹ) کو چھونے والے ہر ذیلی ایجنٹ کو اس کے فوری طور پر — میں ہارڈ رول #22 a's `git stash` ban verbatim ملتا ہے stash واقعے کی ریکارڈ شدہ تکرار ایک subagent کے ذریعے آئی۔

## نمونے کی منصوبہ بندی — سپر پاورز کے راستے کو اوور رائیڈ کرتی ہے۔

سپر پاور کی مہارتیں `docs/superpowers/plans/`، `docs/superpowers/specs/` اور `docs/research/` کے تحت ڈیفالٹس کا اعلان کرتی ہیں۔ لکھنے سے پہلے ہر ایک کو `AGENTS.md` → "پلاننگ اینڈ ریسرچ آرٹیفیکٹس" میں اس کے `_tasks/` کے برابر دوبارہ لکھیں، اور `git -C _tasks …` کے ساتھ اس کا ارتکاب کریں، کبھی بھی مین ریپو میں نہیں۔

## فائلوں کو سکریچ کریں — `_artifacts/`، `/tmp` نہیں۔

یہ پروجیکٹ ہارنس کے سیشن سکریچ پیڈ (`/tmp/claude-*/…`) کو اوور رائیڈ کرتا ہے۔ عارضی فائلیں — برآمدات، جنریٹڈ زپس، ون آف انٹرمیڈیٹ آؤٹ پٹ — سے `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` تک لکھیں: ایک gitignored root `_*` پاتھ، تاکہ آپریٹر تمام خروںچ کو ایک جگہ پر تلاش کر کے حذف کر دے۔ پائیدار منصوبے، چشمی، تحقیق اور ہینڈ آف اس کے بجائے `_tasks/` پر جائیں (Hard Rule #23)۔

## ریڈ بیس

جمع شدہ سرخ حالت کو نکالنے کے لیے (بیس ٹپ + red PRs)، `/sweep-reds` مہارت کا استعمال کریں۔
