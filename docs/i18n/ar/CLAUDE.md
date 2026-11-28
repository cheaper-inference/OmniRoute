# CLAUDE.md (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**جميع قواعد المشروع تعيش في [`AGENTS.md`](AGENTS.md)** — المصدر الوحيد للحقيقة لكل مساعد AI ؛ يقوم الاستيراد أعلاه بتحميله بالفعل. لا تقم بإعادة إضافة قواعد المشروع هنا. ينطبق كل ما يلي على ONLY على Claude Code — والتحسينات التشغيلية للقواعد المحددة بالفعل في `AGENTS.md`.

## عزل شجرة العمل — Claude تفاصيل الكود

- قم بتأكيد الفرع الأساسي مع المشغل عبر `AskUserQuestion` (القاعدة الصعبة #19) ما لم يخبرك بذلك بالفعل.
- قم بإنشاء شجرة العمل باستخدام `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (تهبط تحت `.claude/worktrees/`، والارتباطات الثابتة `node_modules` وتنسخ `.husky/_`)، ثم اتصل بـ `EnterWorktree` مع `path` الخاص بها. قم دائمًا بتمرير القاعدة: بدونها يختار البرنامج النصي أعلى مستوى `release/*`، والذي قد لا يكون هو الذي أكده عامل التشغيل. شجرة العمل التي تنشئها `EnterWorktree` بنفسها لا تحتوي على روابط صلبة ولا خطافات، لذلك لا تعمل بها بوابة الالتزام المسبق.

## الوكلاء الفرعيون و git

يحصل كل وكيل فرعي يلمس git (أداة الوكيل أو البرنامج النصي لسير العمل) على الحظر الصارم #22 a's `git stash` حرفيًا في موجهه — جاء التكرار المسجل لحادثة التخزين من خلال وكيل فرعي.

## تخطيط القطع الأثرية — يتجاوز مسار القوى العظمى

تعلن مهارات القوى العظمى عن التخلف عن السداد ضمن `docs/superpowers/plans/` و `docs/superpowers/specs/` و `docs/research/`. أعد كتابة كل منها إلى مكافئها `_tasks/` في `AGENTS.md` → "مصنوعات التخطيط والبحث" قبل الكتابة، والتزم بها مع `git -C _tasks …`، وليس في الريبو الرئيسي أبدًا.

## ملفات الصفر — `_artifacts/`، وليس `/tmp`

يتجاوز هذا المشروع لوحة مسودة جلسة تسخير (`/tmp/claude-*/…`). اكتب ملفات مؤقتة صادرات — ، وملفات مضغوطة تم إنشاؤها، ومخرجات وسيطة لمرة واحدة — إلى `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: مسار `_*` جذر gitignored، بحيث يعثر المشغل على كل الخدوش ويحذفها في مكان واحد. تنتقل الخطط والمواصفات والأبحاث وعمليات التسليم الدائمة إلى `_tasks/` بدلاً من ذلك (Hard Rule #23).

## قاعدة حمراء

لتصريف الحالة الحمراء المتراكمة (طرف القاعدة + الأحمر PRs)، استخدم مهارة `/sweep-reds`.
