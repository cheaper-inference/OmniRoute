# CLAUDE.md (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**அனைத்து திட்ட விதிகளும் [`AGENTS.md`](AGENTS.md) இல் உள்ளன** — ஒவ்வொரு AI உதவியாளருக்கும் உண்மையின் ஒற்றை ஆதாரம்; மேலே உள்ள இறக்குமதி ஏற்கனவே அதை ஏற்றுகிறது. திட்ட விதிகளை இங்கே மீண்டும் சேர்க்க வேண்டாம். கீழே உள்ள அனைத்தும் Claude குறியீடு — க்கு ONLY பொருந்தும் `AGENTS.md`

## ஒர்க்ட்ரீ தனிமைப்படுத்தல் — Claude குறியீடு விவரங்கள்

- `AskUserQuestion` (ஹார்ட் ரூல் #19) மூலம் ஆபரேட்டருடன் அடிப்படைக் கிளையை உறுதிப்படுத்தவும்.
- `scripts/dev/new-worktree.sh <branch> <confirmed-base>` உடன் ஒர்க்ட்ரீயை உருவாக்கவும் (அது `.claude/worktrees/`, கடின இணைப்புகள் `node_modules` மற்றும் பிரதிகள் `.husky/_`), பின்னர் `EnterWorktree` அதன் `path` உடன் அழைக்கவும். எப்போதும் அடிப்படையை அனுப்பவும்: அது இல்லாமல் ஸ்கிரிப்ட் மிக உயர்ந்த `release/*` தேர்ந்தெடுக்கிறது, இது ஆபரேட்டர் உறுதிப்படுத்தியதாக இருக்காது. `EnterWorktree` தானே உருவாக்கும் ஒரு பணிமரத்தில் கடினமான இணைப்புகள் அல்லது கொக்கிகள் எதுவும் இல்லை, எனவே முன்-கமிட் கேட் அதில் இயங்காது.

## துணைப் பொருட்கள் மற்றும் ஜிட்

ஜிட் (ஏஜெண்ட் கருவி அல்லது பணிப்பாய்வு ஸ்கிரிப்ட்) தொடும் ஒவ்வொரு துணைப்பொருளும் அதன் ப்ராம்ட் — இல் ஹார்ட் ரூல் #22 a's `git stash` தடைச்சொல்லைப் பெறுகிறது.

## திட்டமிடல் கலைப்பொருட்கள் — வல்லரசுகளின் பாதை மேலெழுகிறது

வல்லரசு திறன்கள் `docs/superpowers/plans/`, `docs/superpowers/specs/` மற்றும் `docs/research/` ஆகியவற்றின் கீழ் இயல்புநிலைகளை அறிவிக்கின்றன. எழுதும் முன், `AGENTS.md` → "திட்டமிடல் & ஆராய்ச்சி கலைப்பொருட்கள்" இல் ஒவ்வொன்றையும் அதன் `_tasks/` க்கு சமமானதாக மீண்டும் எழுதவும், மேலும் `git -C _tasks …` க்கு சமமானதாக எழுதவும்.

## கீறல் கோப்புகள் — `_artifacts/`, `/tmp` அல்ல

இந்த திட்டம் சேனலின் அமர்வு ஸ்கிராட்ச்பேடை (`/tmp/claude-*/…`) மேலெழுதுகிறது. தற்காலிக கோப்புகள் — ஏற்றுமதிகள், உருவாக்கப்பட்ட ஜிப்கள், ஒருமுறை இடைநிலை வெளியீடுகள் — `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` எழுதவும்: ஒரு gitignored root `_*` பாதை, எனவே ஆபரேட்டர் அனைத்து கீறல்களையும் ஒரே இடத்தில் கண்டுபிடித்து நீக்குகிறார். நீடித்த திட்டங்கள், விவரக்குறிப்புகள், ஆராய்ச்சி மற்றும் கைமாறுகள் பதிலாக `_tasks/` க்கு செல்கின்றன (கடின விதி #23).

## சிவப்பு அடித்தளம்

திரட்டப்பட்ட சிவப்பு நிலையை (அடிப்படை முனை + சிவப்பு PRs) வடிகட்ட, `/sweep-reds` திறனைப் பயன்படுத்தவும்.
