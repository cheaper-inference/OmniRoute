# CLAUDE.md (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**सभी प्रोजेक्ट नियम [`AGENTS.md`](AGENTS.md) में रहते हैं** — प्रत्येक AI सहायक के लिए सत्य का एकल स्रोत; उपरोक्त आयात इसे पहले ही लोड कर चुका है। यहां प्रोजेक्ट नियम दोबारा न जोड़ें. नीचे दी गई हर चीज़ ONLY को Claude कोड — पर लागू करती है और `AGENTS.md` में पहले से परिभाषित नियमों का परिचालन परिशोधन करती है।

## वर्कट्री आइसोलेशन — Claude कोड विशिष्टताएँ

- `AskUserQuestion` (हार्ड रूल #19) के माध्यम से ऑपरेटर के साथ आधार शाखा की पुष्टि करें, जब तक कि उन्होंने आपको पहले ही नहीं बताया हो।
- `scripts/dev/new-worktree.sh <branch> <confirmed-base>` के साथ वर्कट्री बनाएं (यह `.claude/worktrees/` के अंतर्गत आता है, हार्ड-लिंक `node_modules` और `.husky/_` प्रतिलिपि बनाता है), फिर `EnterWorktree` इसके `path` के साथ कॉल करें। हमेशा आधार को पास करें: इसके बिना स्क्रिप्ट उच्चतम `release/*` चुनती है, जो ऑपरेटर द्वारा पुष्टि की गई नहीं हो सकती है। एक वर्कट्री जो `EnterWorktree` स्वयं बनाता है उसमें न तो हार्ड लिंक होते हैं और न ही हुक होते हैं, इसलिए इसमें कोई प्री-कमिट गेट नहीं चलता है।

## सबएजेंट और गिट

प्रत्येक सबएजेंट जो गिट (एजेंट टूल या वर्कफ़्लो स्क्रिप्ट) को छूता है, उसे अपने प्रॉम्प्ट — में हार्ड रूल #22 a का `git stash` प्रतिबंध शब्दशः मिलता है, स्टैश घटना की रिकॉर्ड की गई पुनरावृत्ति एक सबएजेंट के माध्यम से आती है।

## कलाकृतियों की योजना बनाना — महाशक्तियों का पथ ओवरराइड करता है

सुपरपावर कौशल `docs/superpowers/plans/`, `docs/superpowers/specs/` और `docs/research/` के तहत डिफ़ॉल्ट की घोषणा करते हैं। लिखने से पहले `AGENTS.md` → "प्लानिंग एंड रिसर्च आर्टिफैक्ट्स" में प्रत्येक को उसके `_tasks/` समकक्ष में फिर से लिखें, और इसे `git -C _tasks …` के साथ प्रतिबद्ध करें, मुख्य रेपो में कभी नहीं।

## फ़ाइलें स्क्रैच करें — `_artifacts/`, `/tmp` नहीं

यह प्रोजेक्ट हार्नेस के सत्र स्क्रैचपैड (`/tmp/claude-*/…`) को ओवरराइड करता है। अस्थायी फ़ाइलें — निर्यात, जेनरेट किए गए ज़िप, एकबारगी मध्यवर्ती आउटपुट — से `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` लिखें: एक gitignored रूट `_*` पथ, ताकि ऑपरेटर एक ही स्थान पर सभी स्क्रैच ढूंढ सके और हटा सके। टिकाऊ योजनाएँ, विशेषताएँ, अनुसंधान और हैंड-ऑफ़ इसके बजाय `_tasks/` पर जाते हैं (हार्ड रूल #23)।

## लाल आधार

संचित लाल अवस्था (आधार टिप + लाल PRs) को निकालने के लिए, `/sweep-reds` कौशल का उपयोग करें।
