# CLAUDE.md (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**همه قوانین پروژه در [`AGENTS.md`](AGENTS.md) زندگی می کنند** — منبع واحد حقیقت برای هر دستیار AI. واردات بالا قبلاً آن را بارگیری می کند. قوانین پروژه را دوباره در اینجا اضافه نکنید. همه چیز زیر ONLY را برای اصلاحات عملیاتی کد Claude قوانینی — قبلاً در `AGENTS.md` تعریف شده اند، اعمال می کند.

## ویژگی های کد جداسازی درخت کاری — Claude

- انشعاب پایه را با اپراتور از طریق `AskUserQuestion` (Hard Rule #19) تأیید کنید، مگر اینکه قبلاً به شما گفته باشند.
- درخت کاری را با `scripts/dev/new-worktree.sh <branch> <confirmed-base>` ایجاد کنید (زیر `.claude/worktrees/` قرار میگیرد، `node_modules` را پیوند میدهد و `.husky/_` کپی میکند)، سپس `EnterWorktree` با `path` آن فراخوانی کنید. همیشه از پایه عبور کنید: بدون آن اسکریپت بالاترین `release/*` انتخاب می کند، که ممکن است همان چیزی نباشد که اپراتور تأیید کرده است. درخت کاری که `EnterWorktree` به خودی خود ایجاد میکند، نه پیوندهای سخت دارد و نه قلاب، بنابراین هیچ گیت Pre-Commit در آن اجرا نمیشود.

## subagents و git

هر عامل فرعی که git (ابزار عامل یا اسکریپت گردش کار) را لمس میکند، به کلمه ممنوعیت `git stash` #22 a's Hard Rule را در دستور — خود دریافت میکند.

## مصنوعات برنامه ریزی — مسیر ابرقدرت ها را نادیده می گیرد

مهارتهای ابرقدرتها پیشفرضها را تحت `docs/superpowers/plans/`، `docs/superpowers/specs/` و `docs/research/` اعلام میکنند. قبل از نوشتن، هر کدام را به معادل `_tasks/` خود در `AGENTS.md` → "Planning & Research Artifacts" بازنویسی کنید، و آن را با `git -C _tasks …` انجام دهید، هرگز در مخزن اصلی.

## فایلهای — `_artifacts/` را خراش دهید، نه `/tmp`

این پروژه اسکراچ پد جلسه مهار (`/tmp/claude-*/…`) را لغو می کند. فایلهای موقت صادرات — ، زیپهای تولید شده، خروجیهای میانی یکباره — به `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` را بنویسید: یک مسیر `_*` ریشه گیتینگریشده، بنابراین اپراتور تمام خراشها را در یک مکان پیدا کرده و حذف میکند. طرحهای بادوام، مشخصات، تحقیقات و دستآفها به جای آن به `_tasks/` میروند (Hard Rule #23).

## پایه قرمز

برای تخلیه حالت قرمز انباشته شده (نوک پایه + red PRs)، از مهارت `/sweep-reds` استفاده کنید.
