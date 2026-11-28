# CLAUDE.md (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**সমস্ত প্রকল্পের নিয়ম [`AGENTS.md`](AGENTS.md) তে থাকে** — প্রত্যেক AI সহকারীর জন্য সত্যের একক উৎস; উপরে আমদানি ইতিমধ্যে এটি লোড. এখানে প্রকল্পের নিয়ম পুনরায় যোগ করবেন না। নীচের সবকিছু Claude কোডে ONLY প্রয়োগ করে `AGENTS.md` এ ইতিমধ্যে সংজ্ঞায়িত নিয়মের — অপারেশনাল পরিমার্জন।

## ওয়ার্কট্রি আইসোলেশন — Claude কোড সুনির্দিষ্ট

- `AskUserQuestion` (হার্ড রুল #19) এর মাধ্যমে অপারেটরের সাথে বেস শাখা নিশ্চিত করুন যদি না তারা আপনাকে আগেই বলে দেয়।
- `scripts/dev/new-worktree.sh <branch> <confirmed-base>` দিয়ে ওয়ার্কট্রি তৈরি করুন (এটি `.claude/worktrees/` অধীনে আসে, হার্ড-লিংক `node_modules` এবং `.husky/_`কপি করে), তারপর `EnterWorktree` `path` দিয়ে কল করুন। সর্বদা বেস পাস করুন: এটি ছাড়া স্ক্রিপ্ট সর্বোচ্চ `release/*` বাছাই করে, যা অপারেটর নিশ্চিত নাও হতে পারে। একটি ওয়ার্কট্রি যা `EnterWorktree` নিজে থেকেই তৈরি করে তাতে হার্ড লিঙ্ক বা হুক নেই, তাই এতে কোনো প্রাক-কমিট গেট চলে না।

## Subagents এবং git

গিট (এজেন্ট টুল বা ওয়ার্কফ্লো স্ক্রিপ্ট) স্পর্শ করে এমন প্রতিটি সাবএজেন্ট তার প্রম্পট — এ হার্ড রুল #22 এর `git stash` নিষেধাজ্ঞা পায়।

## পরিকল্পনা নিদর্শন — পরাশক্তি পথ ওভাররাইড

সুপার পাওয়ারের দক্ষতা `docs/superpowers/plans/`, `docs/superpowers/specs/` এবং `docs/research/` এর অধীনে ডিফল্ট ঘোষণা করে। লেখার আগে `AGENTS.md` → "প্ল্যানিং অ্যান্ড রিসার্চ আর্টিফ্যাক্টস"-এ প্রতিটিকে তার `_tasks/` সমতুল্য লিখুন এবং এটি `git -C _tasks …` দিয়ে কমিট করুন, মূল রেপোতে কখনই নয়।

## স্ক্র্যাচ ফাইল — `_artifacts/`, `/tmp` নয়

এই প্রকল্পটি জোতা সেশন স্ক্র্যাচপ্যাড (`/tmp/claude-*/…`) ওভাররাইড করে। অস্থায়ী ফাইল লিখুন — এক্সপোর্ট, জেনারেটেড জিপ, ওয়ান-অফ ইন্টারমিডিয়েট আউটপুট — থেকে `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: একটি gitigned root `_*` পাথ, যাতে অপারেটর এক জায়গায় সমস্ত স্ক্র্যাচ খুঁজে পায় এবং মুছে দেয়। টেকসই পরিকল্পনা, চশমা, গবেষণা এবং হ্যান্ড-অফ পরিবর্তে `_tasks/` এ যায় (হার্ড রুল #23)।

## লাল বেস

একটি জমে থাকা লাল অবস্থা (বেস টিপ + লাল PRs) নিষ্কাশন করতে, `/sweep-reds` দক্ষতা ব্যবহার করুন।
