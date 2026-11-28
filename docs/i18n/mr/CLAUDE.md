# CLAUDE.md (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**सर्व प्रकल्प नियम [`AGENTS.md`](AGENTS.md) मध्ये राहतात** — प्रत्येक AI सहाय्यकासाठी सत्याचा एकमेव स्त्रोत आहे; वरील आयात आधीच लोड करते. येथे प्रकल्प नियम पुन्हा जोडू नका. खालील सर्व काही Claude कोडवर ONLY लागू होते `AGENTS.md` मध्ये आधीच परिभाषित केलेल्या नियमांचे — ऑपरेशनल शुद्धीकरण.

## वर्कट्री आयसोलेशन — Claude कोड तपशील

- ऑपरेटरने `AskUserQuestion` (हार्ड रूल #19) द्वारे बेस शाखेची पुष्टी करा जोपर्यंत त्यांनी तुम्हाला आधीच सांगितले नाही.
- `scripts/dev/new-worktree.sh <branch> <confirmed-base>` सह वर्कट्री तयार करा (ते `.claude/worktrees/` अंतर्गत येते, हार्ड-लिंक `node_modules` आणि कॉपी करते `.husky/_`), नंतर `EnterWorktree` त्याच्या `path` सह कॉल करा. नेहमी बेस पास करा: त्याशिवाय स्क्रिप्ट सर्वोच्च `release/*` निवडते, जे ऑपरेटरने पुष्टी केलेले असू शकत नाही. `EnterWorktree` स्वतः तयार केलेल्या वर्कट्रीमध्ये हार्ड लिंक किंवा हुक नसतात, त्यामुळे त्यात कोणतेही प्री-कमिट गेट चालत नाही.

## सबएजंट आणि गिट

git (एजंट टूल किंवा वर्कफ्लो स्क्रिप्ट) ला स्पर्श करणाऱ्या प्रत्येक सबएजंटला त्याच्या प्रॉम्प्ट — मध्ये हार्ड नियम #22 a's `git stash` बंदी शब्दशः मिळते, स्टॅश घटनेची रेकॉर्ड केलेली पुनरावृत्ती सबएजंटद्वारे आली.

## — सुपरपॉवर्स पाथ ओव्हरराइड्सचे नियोजन करणे

सुपरपॉवर कौशल्ये `docs/superpowers/plans/`, `docs/superpowers/specs/` आणि `docs/research/` अंतर्गत डीफॉल्ट घोषित करतात. लिहिण्यापूर्वी प्रत्येकाला `AGENTS.md` → "प्लॅनिंग आणि रिसर्च आर्टिफॅक्ट्स" मध्ये त्याच्या `_tasks/` समतुल्य पुन्हा लिहा आणि `git -C _tasks …` सह वचनबद्ध करा, मुख्य रेपोमध्ये कधीही नाही.

## स्क्रॅच फाइल्स — `_artifacts/`, `/tmp` नाही

हा प्रकल्प हार्नेसचे सत्र स्क्रॅचपॅड (`/tmp/claude-*/…`) ओव्हरराइड करतो. तात्पुरत्या फाइल्स — एक्सपोर्ट्स, व्युत्पन्न केलेल्या zips, — ते `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` एक-ऑफ इंटरमीडिएट आउटपुट लिहा: एक gitigned रूट `_*` मार्ग, त्यामुळे ऑपरेटर एकाच ठिकाणी सर्व स्क्रॅच शोधतो आणि हटवतो. टिकाऊ योजना, चष्मा, संशोधन आणि हँड-ऑफ त्याऐवजी `_tasks/` वर जातात (कठीण नियम #23).

## लाल बेस

संचित लाल स्थिती (बेस टीप + रेड PRs) काढून टाकण्यासाठी, `/sweep-reds` कौशल्य वापरा.
