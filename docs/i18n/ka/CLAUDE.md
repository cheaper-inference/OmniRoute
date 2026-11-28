# CLAUDE.md (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**პროექტის ყველა წესი ცხოვრობს [`AGENTS.md`](AGENTS.md) ში** — ჭეშმარიტების ერთადერთი წყარო ყველა AI ასისტენტისთვის; იმპორტი ზემოთ უკვე იტვირთება. არ დაამატო პროექტის წესები აქ. ქვემოთ მოყვანილი ყველაფერი ეხება ONLY Claude Code — ის ოპერაციულ დახვეწას უკვე განსაზღვრული `AGENTS.md` ში.

## სამუშაო ხის იზოლაცია — Claude კოდის სპეციფიკა

- დაადასტურეთ ბაზის ფილიალი ოპერატორთან `AskUserQuestion` (Hard Rule #19) მეშვეობით, თუ მათ უკვე არ გითხარით.
- შექმენით სამუშაო ხე `scripts/dev/new-worktree.sh <branch> <confirmed-base>` ით (ის ჩამოდის `.claude/worktrees/` ქვეშ, აკავშირებს `node_modules` და აკოპირებს `.husky/_`), შემდეგ დარეკეთ `EnterWorktree` თავისი `path` ით. ყოველთვის გაიარეთ ბაზა: ამის გარეშე სკრიპტი ირჩევს ყველაზე მაღალ `release/*`, რომელიც შეიძლება არ იყოს ის, რაც ოპერატორმა დაადასტურა. სამუშაო ხეს, რომელსაც `EnterWorktree` ქმნის თავისთავად, არ აქვს არც მყარი ბმულები და არც კაკვები, ამიტომ მასში წინასწარი ჩართვის კარი არ გადის.

## სუბაგენტები და გიტ

ყველა ქვეაგენტი, რომელიც ეხება git-ს (აგენტის ხელსაწყოს ან სამუშაო პროცესის სკრიპტს) იღებს Hard Rule #22 a-ს `git stash` აკრძალვას სიტყვასიტყვით მის მოთხოვნაში — დამახსოვრების ინციდენტის ჩაწერილი განმეორება მოხდა სუბაგენტის მეშვეობით.

## დაგეგმვის არტეფაქტები — superpowers გზა გადალახავს

სუპერსახელმწიფოების უნარები აცხადებენ ნაგულისხმევს `docs/superpowers/plans/`, `docs/superpowers/specs/` და `docs/research/`. ხელახლა ჩაწერეთ თითოეული მისი `_tasks/` ეკვივალენტით `AGENTS.md` → "დაგეგმვა და კვლევის არტეფაქტები" დაწერამდე და ჩაიდინეთ იგი `git -C _tasks …` ით, არასოდეს მთავარ რეპოში.

## Scratch ფაილები — `_artifacts/`, არა `/tmp`

ეს პროექტი არღვევს აღკაზმულობის სესიის scratchpad (`/tmp/claude-*/…`). დროებითი ფაილების დაწერა — ექსპორტი, გენერირებული zips, ერთჯერადი შუალედური გამომავალი — to `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: იგნორირებული root `_*` გზა, ასე რომ ოპერატორი იპოვის და წაშლის ყველა ნაკაწრს ერთ ადგილას. მდგრადი გეგმები, სპეციფიკაციები, კვლევა და ხელფასები გადადის `_tasks/` ზე (Hard Rule #23).

## წითელი ბაზა

დაგროვილი წითელი მდგომარეობის გასაშრობად (ძირის წვერი + red PRs), გამოიყენეთ `/sweep-reds` უნარი.
