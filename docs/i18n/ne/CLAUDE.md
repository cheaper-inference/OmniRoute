# CLAUDE.md (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**सबै परियोजना नियमहरू [`AGENTS.md`](AGENTS.md) मा बस्छन्** प्रत्येक AI सहायकको लागि सत्यको एकमात्र स्रोत — ; माथिको आयात पहिले नै लोड हुन्छ। यहाँ परियोजना नियमहरू पुन: नथप्नुहोस्। तलका सबै कुरा Claude कोडमा ONLY लागू हुन्छ `AGENTS.md` मा पहिले नै परिभाषित नियमहरूको — परिचालन परिशोधन।

## Worktree अलगाव — Claude कोड विवरण

- `AskUserQuestion` (हार्ड नियम #19) मार्फत अपरेटरसँग आधार शाखा पुष्टि गर्नुहोस् जबसम्म तिनीहरूले तपाईंलाई पहिले नै बताएको छैन।
- `scripts/dev/new-worktree.sh <branch> <confirmed-base>` सँग worktree सिर्जना गर्नुहोस् (यो `.claude/worktrees/` अन्तर्गत अवतरण गर्दछ, हार्ड-लिङ्कहरू `node_modules` र `.husky/_` को प्रतिलिपि गर्दछ), त्यसपछि `EnterWorktree` यसको `path` सँग कल गर्नुहोस्। सधैं आधार पास गर्नुहोस्: यो बिना स्क्रिप्टले उच्चतम `release/*` छान्छ, जुन अपरेटरले पुष्टि गरेको नहुन सक्छ। `EnterWorktree` आफैंले सिर्जना गर्ने worktree मा न त कडा लिङ्कहरू छन् न हुकहरू छन्, त्यसैले यसमा कुनै पूर्व-कमिट गेट चल्दैन।

## Subagents र git

git (एजेन्ट उपकरण वा कार्यप्रवाह स्क्रिप्ट) छुने हरेक सबएजेन्टले यसको प्रम्प्ट — मा हार्ड नियम #22 a's `git stash` ban verbatim प्राप्त गर्दछ stash घटनाको रेकर्ड गरिएको पुनरावृत्ति subagent मार्फत आयो।

## योजना कलाकृतिहरू — महाशक्ति मार्ग ओभरराइड

सुपरपावर कौशलले `docs/superpowers/plans/`, `docs/superpowers/specs/` र `docs/research/` अन्तर्गत पूर्वनिर्धारित घोषणा गर्दछ। लेख्नु अघि प्रत्येकलाई `AGENTS.md` → "योजना र अनुसन्धान कलाकृतिहरू" मा यसको `_tasks/` बराबरमा पुन: लेख्नुहोस्, र यसलाई `git -C _tasks …` सँग कमिट गर्नुहोस्, मुख्य रिपोमा कहिले पनि।

## स्क्र्याच फाइलहरू — `_artifacts/`, `/tmp` होइन

यो परियोजनाले हार्नेसको सेसन स्क्र्याचप्याड (`/tmp/claude-*/…`) लाई ओभरराइड गर्छ। अस्थायी फाइलहरू — निर्यात, उत्पन्न zips, एक-अफ मध्यवर्ती आउटपुटहरू — लाई `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` लेख्नुहोस्: एक gitigned root `_*` मार्ग, त्यसैले अपरेटरले सबै स्क्र्याचहरू एकै ठाउँमा फेला पार्छ र मेटाउँछ। टिकाऊ योजनाहरू, चश्मा, अनुसन्धान र ह्यान्ड-अफहरू `_tasks/` मा जानुहोस् (हार्ड नियम #23)।

## रातो आधार

एक संचित रातो अवस्था (बेस टिप + red PRs) नाली गर्न, `/sweep-reds` कौशल प्रयोग गर्नुहोस्।
