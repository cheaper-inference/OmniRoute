# GEMINI.md (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../GEMINI.md) · 🇪🇹 [am](../am/GEMINI.md) · 🇸🇦 [ar](../ar/GEMINI.md) · 🇦🇿 [az](../az/GEMINI.md) · 🇧🇬 [bg](../bg/GEMINI.md) · 🇧🇩 [bn](../bn/GEMINI.md) · 🇧🇦 [bs](../bs/GEMINI.md) · 🇨🇿 [cs](../cs/GEMINI.md) · 🇩🇰 [da](../da/GEMINI.md) · 🇩🇪 [de](../de/GEMINI.md) · 🇬🇷 [el](../el/GEMINI.md) · 🇪🇸 [es](../es/GEMINI.md) · 🇪🇪 [et](../et/GEMINI.md) · 🇮🇷 [fa](../fa/GEMINI.md) · 🇫🇮 [fi](../fi/GEMINI.md) · 🇫🇷 [fr](../fr/GEMINI.md) · 🇮🇪 [ga](../ga/GEMINI.md) · 🇮🇳 [gu](../gu/GEMINI.md) · 🇳🇬 [ha](../ha/GEMINI.md) · 🇮🇱 [he](../he/GEMINI.md) · 🇮🇳 [hi](../hi/GEMINI.md) · 🇭🇷 [hr](../hr/GEMINI.md) · 🇭🇺 [hu](../hu/GEMINI.md) · 🇦🇲 [hy](../hy/GEMINI.md) · 🇮🇩 [id](../id/GEMINI.md) · 🇳🇬 [ig](../ig/GEMINI.md) · 🇮🇹 [it](../it/GEMINI.md) · 🇯🇵 [ja](../ja/GEMINI.md) · 🇬🇪 [ka](../ka/GEMINI.md) · 🇰🇭 [km](../km/GEMINI.md) · 🇮🇳 [kn](../kn/GEMINI.md) · 🇰🇷 [ko](../ko/GEMINI.md) · 🇱🇹 [lt](../lt/GEMINI.md) · 🇱🇻 [lv](../lv/GEMINI.md) · 🇮🇳 [ml](../ml/GEMINI.md) · 🇮🇳 [mr](../mr/GEMINI.md) · 🇲🇾 [ms](../ms/GEMINI.md) · 🇲🇹 [mt](../mt/GEMINI.md) · 🇲🇲 [my](../my/GEMINI.md) · 🇳🇵 [ne](../ne/GEMINI.md) · 🇳🇱 [nl](../nl/GEMINI.md) · 🇳🇴 [no](../no/GEMINI.md) · 🇮🇳 [or](../or/GEMINI.md) · 🇮🇳 [pa](../pa/GEMINI.md) · 🇵🇭 [phi](../phi/GEMINI.md) · 🇵🇱 [pl](../pl/GEMINI.md) · 🇵🇹 [pt](../pt/GEMINI.md) · 🇧🇷 [pt-BR](../pt-BR/GEMINI.md) · 🇷🇴 [ro](../ro/GEMINI.md) · 🇷🇺 [ru](../ru/GEMINI.md) · 🇱🇰 [si](../si/GEMINI.md) · 🇸🇰 [sk](../sk/GEMINI.md) · 🇸🇮 [sl](../sl/GEMINI.md) · 🇷🇸 [sr](../sr/GEMINI.md) · 🇸🇪 [sv](../sv/GEMINI.md) · 🇰🇪 [sw](../sw/GEMINI.md) · 🇮🇳 [ta](../ta/GEMINI.md) · 🇹🇭 [th](../th/GEMINI.md) · 🇹🇷 [tr](../tr/GEMINI.md) · 🇺🇦 [uk-UA](../uk-UA/GEMINI.md) · 🇵🇰 [ur](../ur/GEMINI.md) · 🇺🇿 [uz](../uz/GEMINI.md) · 🇻🇳 [vi](../vi/GEMINI.md) · 🇳🇬 [yo](../yo/GEMINI.md) · 🇨🇳 [zh-CN](../zh-CN/GEMINI.md) · 🇹🇼 [zh-TW](../zh-TW/GEMINI.md)

---

> **ఏకైక ప్రామాణిక మూలం:** AI సహాయకుల కోసం అన్ని ప్రాజెక్ట్ నియమాలు
> [`AGENTS.md`](AGENTS.md)లో ఉన్నాయి. ఏ మార్పు చేయడానికి ముందైనా దానిని పూర్తిగా చదవండి — 23 కఠిన నియమాలు,
> నాణ్యతా ప్రమాణాలు, కోడ్ సంప్రదాయాలు, ఫైల్-స్థానం / repo-root పరిశుభ్రత నియమాలు, రిపోజిటరీ మ్యాప్
> మరియు గతంలో ఈ ఫైల్లో ఉన్న స్థానిక డెవలప్మెంట్ యాక్సెస్ గమనికలు ఇందులో ఉన్నాయి.

Gemini-నిర్దిష్ట గమనికలు:

- నైపుణ్యాలు `activate_skill` సాధనం ద్వారా సక్రియమవుతాయి (సెషన్ ప్రారంభంలో నైపుణ్య మెటాడేటా లోడ్ అవుతుంది మరియు
  అవసరమైనప్పుడు పూర్తి కంటెంట్ సక్రియం చేయబడుతుంది).
- ప్రస్తుతం Geminiకి మాత్రమే వర్తించే ఇతర నియమాలు ఏవీ లేవు. ప్రాజెక్ట్ నియమాలను ఇక్కడ మళ్లీ జోడించవద్దు — బదులుగా
  `AGENTS.md`ను సవరించండి, తద్వారా ప్రతి సహాయకుడు ఒకే సూచనలను చూస్తారు.
