# Quality Gates Reference (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

இந்த ஆவணம் OmniRoute-இல் உள்ள அனைத்து CI தர வாயில்களுக்குமான அதிகாரப்பூர்வ மேற்கோளாகும்.
ஒவ்வொரு வாயிலையும், அது எதைச் சரிபார்க்கிறது, எந்த CI job-இல் இயங்குகிறது, அது
ratchet baseline அல்லது pass/fail கொள்கையைப் பயன்படுத்துகிறதா, மேலும் அது build-ஐத் தடுக்கிறதா அல்லது ஆலோசனை சார்ந்ததா என்பதை விவரிக்கிறது.

சுருக்கமான தொகுப்புக்கும் allowlist கொள்கைக்கும், `AGENTS.md`-இல் உள்ள
"தர வாயில்கள் & Ratchet-கள்" பகுதியைப் பார்க்கவும். அதே அமைப்பின் முக்கியமான மதிப்பீடு,
முதிர்ச்சி வகைப்பாடு மற்றும் கருவி-சார்பற்ற மறுஉருவாக்கத் திட்டத்திற்கு,
[தர வாயில் செயல்திட்டம்](../ops/QUALITY_GATE_PLAYBOOK.md)-ஐப் பார்க்கவும்.

---

## கேட் பட்டியல் மற்றும் செயலாக்கச் சுயவிவரங்கள்

### வேட்பாளர் ஏற்பு

CI மற்றும் Quality Gates பணிப்பாய்வுகள் ஒவ்வொன்றும் நிலையான தீர்ப்பை வெளியிடுகின்றன: `Gate / CI` மற்றும்
`Gate / Quality`. அவற்றின் பதிப்பிடப்பட்ட ஏற்புக் கொள்கை, ஒவ்வொரு மேல்நிலைப் பணியையும்
கட்டாயமானது அல்லது ஆலோசனைக்குரியது எனப் பட்டியலிடுகிறது. பொருந்தக்கூடிய கட்டாயப் பணி வெற்றிபெற வேண்டும்:
காணாமற்போன, ரத்துசெய்யப்பட்ட, தவிர்க்கப்பட்ட, நிலுவையிலுள்ள மற்றும் அறியப்படாத முடிவுகள் PASS என்பதை நிறுவ முடியாது. செல்லுபடியாகும்
ஆவணங்கள்-மட்டும் அல்லது பட்டியல்-மட்டும் வகைப்பாடு, குறியீட்டுப் பாதையைப் பொருந்தாததாக மாற்றலாம்;
வரைவு PR ஏற்கப்பட்ட வேட்பாளர் அல்ல. `hotfix` லேபிள் ஆதாரத் தேவையை விலக்காது.

இரு பணிப்பாய்வுகளும் main/release கிளைகளுக்கான PR-கள், `main`-க்கான push-கள், கைமுறை dispatch
மற்றும் merge-group நிகழ்வுகளை உள்ளடக்குகின்றன. Push, dispatch மற்றும் merge-group ஆகியவை முழுத் தேர்வையும் இயக்குகின்றன.
`release/**`-க்கான push-கள் அவற்றைத் தொடங்காது (2026-10-18): ஒவ்வொரு மாற்றமும் ஏற்கெனவே அதன் PR-இல் matrix-ஐ இயக்கியுள்ளது,
மேலும் ஒன்றிணைக்கப்பட்ட சேர்க்கை Release-Green-இன் பணியாகும் (`docs/ops/RUNNER_BOX.md` → Hosted பாதை). Fork-களும்
merge group-களும், இல்லையெனில் self-hosted runner-களைத் தேர்ந்தெடுக்கும் பணிகளுக்கு hosted runner-களைப் பயன்படுத்துகின்றன;
வெளியீட்டிற்கு முன் போதுமான hosted திறன் சரிபார்க்கப்பட வேண்டும்.

ஒவ்வொரு JSON ரசீதும் checkout செய்யப்பட்ட SHA, பணிப்பாய்வு இயக்கம் மற்றும் முயற்சியை அடையாளப்படுத்துகிறது.
checkout/event SHA பொருந்தாமையை CLI நிராகரிக்கிறது. புதிய அல்லது நீக்கப்பட்ட பாதை ஒன்று அமைதியாக மறைந்துவிடாதபடி,
பணிப்பாய்வுச் சோதனைகள் கொள்கை உறுப்பினர்தன்மையைத் தீர்ப்புப் பணியின் `needs` பட்டியலுடன் பிணைக்கின்றன.
ரசீதுகள் அவற்றின் சொந்தப் பணிப்பாய்வை மட்டுமே உள்ளடக்குகின்றன; வெளியீடு, பயன்பாட்டுநிறுவல் அல்லது ஏற்கனவே உள்ள ஆலோசனை ஸ்கேனரின் உள்செயல்பாடுகளை அல்ல. பொருந்தக்கூடிய சரிபார்ப்புகளை கிளை விதிகளில் கட்டாயமாக்குவது ஒரு தனியான நிர்வாக மாற்றமாகும்; அவற்றின் பணிகளை வரையறுப்பது மட்டுமே ஒரு கிளையைப் பாதுகாக்காது.

`API Route Typecheck` என்பது இரண்டு ஒருங்கிணைந்த முடிவுகளுக்கும் உள்ளூர் முழுமையான கண்காணிப்பாளரின் நிலையான சுயவிவரத்திற்கும் வெளியே உள்ள ஒரு சுயாதீன பணிப்பாய்வு சரிபார்ப்பாகும். துல்லியமான வேட்புநிலைக்காக அதன் முடிவைத் தனியாக ஆய்வு செய்யவும். `.github/workflows/api-route-typecheck.yml` ஆனது `main` அல்லது `release/**` கிளைகளுக்கான PR-கள், இந்த இரு கிளைக் குடும்பங்களில் ஏதேனும் ஒன்றிற்கான push-கள் மற்றும் கைமுறை இயக்கம் ஆகியவற்றில் இயங்குகிறது. இதில் பாதை வடிகட்டி இல்லை. PR அடிப்படைக் கிளையை மாற்றுவது ஒரு புதிய சரிபார்ப்பைக் கோருகிறது; body/title திருத்தங்கள் கண்காணிப்புக்கு மட்டுமான `Admission not requested / API Route Typecheck` என்ற பெயரைப் பயன்படுத்துகின்றன, மேலும் அவை அனுமதிச் சரிபார்ப்பை மாற்றியமைக்க முடியாது. இந்தப் பணிப்பாய்வு merge-group தூண்டியை அறிவிக்கவில்லை. இந்தச் சரிபார்ப்பைக் கட்டாயமாக்கும் எந்தவொரு merge-queue அறிமுகமும், முதலில் அந்த நிகழ்விற்காக இது செயல்படுவதை நிறுவ வேண்டும்.

### UI செயலாக்கத் திறன்

CI முழு UI பட்டியலையும் நான்கு `test-vitest` matrix shard-களாக இயக்குகிறது; ஒவ்வொன்றிலும் அதிகபட்சம்
இரண்டு worker-களும், ஏற்கெனவே உள்ள 15 நிமிடப் பணி காலக்கெடுவும் உள்ளன. முதல் shard,
MCP/autoCombo Vitest தொகுப்பையும் இயக்குகிறது. கட்டாயப் பணியின் முடிவு ஒவ்வொரு matrix பகுதியையும் உள்ளடக்குகிறது;
ஒரு shard-இன் தோல்வி அல்லது ரத்துசெய்தல் வேட்பாளர் ஏற்பை நிறுவ முடியாது.

இரவுநேரக் கண்காணிப்பான் ஒவ்வொரு UI shard-க்கும் தனித்தனி துல்லிய-வேட்பாளர் ரசீதைத் தக்கவைக்கிறது;
முதல் ரசீதில் MCP செயலாக்கமும் அடங்கும். நான்கு ரசீதுகள், பதிவுகள் மற்றும் பொருந்தும்
செயலாக்க அடையாளங்கள் அனைத்தும் தேவை. உள்ளக `npm run test:vitest:ui` இன்னும் முழுத்
தொகுப்பையே தேர்ந்தெடுக்கிறது; ஒரே ஒரு `--shard` இயக்கம் பகுதியளவு ஆதாரம் மட்டுமே.

### Unit coverage சேகரிப்பு

பன்னிரண்டு unit shard-கள் தங்களின் தற்போதைய சோதனைச் செயலாக்கத்தின் போது V8 coverage-ஐச் சேகரிக்கின்றன. வெற்றிகரமான
shard, இடைநிலை Istanbul அறிக்கையை உருவாக்காமல் அசல் கோப்புகளைச் சுருக்குவதற்கு
`scripts/ci/compact-v8-coverage.mjs`-ஐ இயக்குகிறது. இறுதி Coverage பணி, வேட்பாளர் SHA, runtime,
மூல root மற்றும் தரவு hash-களுக்கு எதிராகப் பன்னிரண்டு manifest-களையும் சரிபார்த்து, பின்னர் c8-இன் reporter-களையும்
தற்போதுள்ள coverage threshold-களையும் இயக்குகிறது. உள்ளீடுகள் c8-இன் global filename வரிசையைத் தக்கவைக்கின்றன;
கலப்பு function/block coverage-க்கு ஒவ்வொரு shard-க்கும் முன்கூட்டியே merge செய்வது பாதுகாப்பற்றது.
காணாமற்போன, தவறாக வடிவமைக்கப்பட்ட அல்லது பொருந்தாத shard-கள் ஏற்பைத் தோல்வியடையச் செய்கின்றன.
தோல்வியடைந்த test shard-கள் மூல diagnostic coverage-ஐத் தனியாகத் தக்கவைக்கின்றன; அது இறுதி merge-க்குள் நுழைய முடியாது.

### அலகுச் சோதனை செயல்படுத்தல் முன்னேற்ற ரசீதுகள்

பகிரப்பட்ட `test:unit:ci:shard` கட்டளை, `scripts/ci/unit-progress-reporter.mjs` மூலம் `primary`, `dashboard` மற்றும் `serial`
கட்டங்களைப் பதிவுசெய்கிறது. வழக்கமான சோதனை அறிக்கை தொடர்ந்து
கிடைக்கும். ஒவ்வொரு கோப்பின் தொடக்கத்தையும் நிறைவையும் தனியான, மெட்டாடேட்டா-மட்டும் கொண்ட ரசீது பதிவுசெய்கிறது;
மேலும், 30-விநாடி இதயத்துடிப்பு, இன்னும் செயலில் உள்ள கோப்புகளையும் அவற்றின் கடந்த நேரத்தையும் பட்டியலிடுகிறது. அனுமதிப்பட்டியலில் உள்ள
செயல்படுத்தல் மெட்டாடேட்டாவை மட்டுமே இது பதிவுசெய்கிறது; சோதனை விளக்கங்கள், வெளியீடு, பிழை விவரங்கள் மற்றும் முழு
சூழல் ஆகியவை தொடர் வடிவாக்கப்படுவதில்லை.

CI மற்றும் Quality ஆகியவை JSONL கோப்புகளை `unit-progress-ci-<run>-<attempt>-<shard>` மற்றும்
`unit-progress-quality-<run>-<attempt>-<shard>` எனத் தக்கவைக்கின்றன. ஒரு பணியின் காலக்கெடு முடிவடைவதால் பின்னர் நிகழ வேண்டிய பதிவேற்றம்
தடுக்கப்படலாம்; ஏற்கெனவே வெளியிடப்பட்ட இதயத்துடிப்புகள் கண்டறிதலுக்கான ஆதாரமாகத் தொடர்கின்றன. இதயத்துடிப்புகள் இல்லாதிருப்பது,
தடுக்கப்பட்ட அல்லது நிறுத்தப்பட்ட ரன்னர் செயல்முறையையும் குறிக்கலாம். இந்த ரசீதுகள் தற்போதுள்ள சோதனைத் தேர்வு,
ஒரேநேரச் செயல்பாடு, காலக்கெடுக்கள் மற்றும் வெளியேறும் நிலை ஆகியவற்றைப் பாதுகாக்கின்றன; இவை வேட்பாளர்-அனுமதித் தீர்ப்புகள் அல்ல.

### ஏற்பு முடிவுகளைத் தொகுக்கும் கூறில் தக்கவைக்கப்பட்ட சான்றுகள்

`scripts/quality/validate-release-acceptance.mjs` வழங்கப்பட்ட திட்டத்தையும் அதன் manifest-களையும் தொகுக்கிறது; அந்தத் திட்டம் முழு வெளியீட்டு pipeline-ஐ உள்ளடக்குகிறது என்பதை இது நிறுவாது. திட்டம் `VERIFIED` ஆக இருந்தாலும் அதன் அறிக்கைகள் வெளிப்படையாக `releaseAcceptance: false` என அமைக்கின்றன. `release-acceptance.yml` workflow இன்னும் shadow சோதனை fixture-களையே பயன்படுத்துகிறது; உண்மையான build, package, boot அல்லது promotion ரசீதுகளை அல்ல.

தக்கவைக்கப்பட்ட சான்றுகளைச் சரிபார்க்க CLI-க்கு `--evidence-root` தேவை. கோப்புகள் `<evidence-root>/<artifact_id>/<member>` பாதையில் கண்டறியப்பட்டு SHA-256 hash கணக்கிடப்படுகிறது. சான்றில்லாத PASS பதிவு, காணாமல்போன அல்லது மாற்றப்பட்ட கோப்பு, பாதுகாப்பற்ற பாதை அல்லது symlink சரிபார்ப்பைத் தடுக்கிறது. காணாமல்போன கோப்புகள் வெற்றிகரமான இயக்கங்களின் வெற்று log-களுக்கு இணையானவை அல்ல. ஏற்கெனவே உள்ள SHA/run/attempt சரிபார்ப்புகள் சுயாதீனமாகத் தொடர்கின்றன: பொருந்தும் byte-கள் காலாவதியான ரசீதைச் செல்லுபடியாக்க முடியாது. கோப்பின் ஒருமைப்பாடு இயக்கத்தின் உண்மைத்தன்மை அல்லது artifact promotion-க்கான சான்று அல்ல.

### Static scan பட்டியல்

பதிப்பிடப்பட்ட npm-alias பட்டியலும் static-scan உறுப்பினர்தன்மையும்
`config/quality/gate-manifest.json`-இல் உள்ளன. script பெயர்களையும் துல்லியமான command-களையும்
`package.json`-க்கு எதிராகச் சரிபார்க்க `npm run check:gate-manifest`-ஐ இயக்கவும்; சேர்த்தல்கள், நீக்கங்கள் மற்றும்
command மாற்றங்கள், உள்ளக hook மற்றும் CI-இல் உள்ள change-classification பணிகள் இரண்டையும் தோல்வியடையச் செய்கின்றன.
alias என்பது பணிப்பாய்வுப் பணி, matrix instance அல்லது test case அல்ல: இந்த எண்ணிக்கைகளை
ஒன்றுக்கொன்று மாற்றிப் பயன்படுத்தக்கூடியவையாகக் காட்டக்கூடாது.

தேர்ந்தெடுக்கப்பட்ட alias-களை இயக்காமல் ஆய்வுசெய்ய `npm run quality:scan -- --list` அல்லது
`npm run quality:scan:fast -- --list`-ஐப் பயன்படுத்தவும். runner, npm entrypoint-ஐ இயக்குவதால்,
அதன் runtime பாதுகாக்கப்படுகிறது (அமைக்கப்பட்டுள்ள இடங்களில் Bun உட்பட).
அந்தச் சுயவிவரங்களுக்கு வெளியிலுள்ள alias-களைத் தனித்தனியாக இயக்கப்பட்டவையாக manifest பதிவுசெய்கிறது;
மேலும் read-only scan சுயவிவரங்களில் பராமரிப்பு command-கள் தடைசெய்யப்பட்டுள்ளன.

இந்தச் சுயவிவரங்கள் static scan-ஐ மட்டுமே உள்ளடக்குகின்றன. அவை தயாரிப்புச் சோதனைகள்,
coverage, packaging, வெளிப்புறச் சரிபார்ப்புகள் அல்லது வேட்பாளரின் முழுமையான release ஏற்பைச் சான்றளிக்காது.
பணிப்பாய்வு ஏற்பு, இணைக்கப்பட்ட `config/quality/admission-policy.json` மற்றும்
`scripts/quality/admission-verdict.mjs`-ஐப் பயன்படுத்துகிறது. Release-observer சுயவிவரங்கள் தனியாகவே உள்ளன;
அவற்றின் பொருந்தக்கூடிய சரிபார்ப்புகளையும் ரசீதுகளையும் தனித்தனியாக ஆய்வுசெய்யவும். முழு observer-இன் static
command-கள் `config/quality/release-green-static-profile.json`-இல் அறிவிக்கப்பட்டுள்ளன; அவற்றில்
`audit:deps`, mutation-test தேர்வு மற்றும் மொழிபெயர்ப்புச் சரிபார்ப்புகள் அடங்கும். loader, npm
command-களை package.json மற்றும் மாதிரியாக்கப்பட்ட CI/Quality அறிவிப்புகளுக்கு எதிராகச் சரிபார்க்கிறது; shell token-களை
argument-களாக இயக்குவதற்குப் பதிலாக மாற்றத்தை நிராகரிக்கிறது. கட்டாய scanner-இன் SKIP/INCOMPLETE வெளியீடு
PASS என்பதை நிறுவ முடியாது. சுயவிவரம் அதன் வெளிப்புற விலக்குகளைப் பதிவுசெய்கிறது; மேலும் அது
hosted coverage, test matrix-கள், package அல்லது deployment ஆதாரத்திற்குப் பதிலாக அமையாது. கீழேயுள்ள உரைநடைப் பட்டியல்
ஒரு மேற்கோள் மட்டுமே; கேட் உண்மையில் இயக்கப்பட்டது என்பதற்கான சான்றல்ல.

Script-கள் `scripts/check/` (கொள்கை கேட்கள்) மற்றும் `scripts/quality/` (ratchet engine) ஆகியவற்றின் கீழ் உள்ளன.
CI-க்கான ஒற்றை உண்மை ஆதாரம் `.github/workflows/ci.yml` ஆகும்.

### வெளியிடப்பட்ட அடிப்படை ஆவணங்களின் நிலை

`.github/workflows/i18n-base-health.yml` தேர்ந்தெடுக்கப்பட்ட `main` மற்றும் `release/v*`
push-களுக்குப் பிறகும், கைமுறை dispatch நிகழும்போதும் ஆவணங்களின் நிலையைக் கண்காணிக்கிறது. அதன் வடிப்பான்கள் ஆவணங்கள்,
மூல Markdown, `llm.txt`, மொழிபெயர்ப்பு நிலை/உள்ளமைவு மற்றும் தொடர்புடைய i18n கருவிகளை உள்ளடக்குகின்றன.
ஒற்றை `Published base documentation health` job, hosted Ubuntu-ஐயும் ஐந்து நிமிட
காலக்கெடுவையும் பயன்படுத்துகிறது. இது வாசிப்பு-மட்டும் சரிபார்ப்பை மேற்கொண்டு, dependency நிறுவல்,
மொழிபெயர்ப்பு அல்லது நிலை ஏற்றுக்கொள்ளல் எதுவுமின்றி கண்டறிதல் ரசீதை எழுதுகிறது.

`scripts/i18n/check-base-health.mjs`-க்கு source-hash முரண்பாடுகள், target இல்லாமை, target-hash முரண்பாடுகள்,
காலாவதியான மொழிபெயர்ப்பு மற்றும் section-cache முரண்பாடுகள் எதுவும் இருக்கக் கூடாது. இது தற்போதைய மைய
ஆவணம்/locale வரம்பையும், அதன் பதிவுசெய்யப்பட்ட மூலத்தையும் சரிபார்க்கிறது. செல்லாத சூழல், முழுமையற்ற கவரேஜ்
அல்லது இடைநிறுத்தப்பட்ட checker ஆகியவை `INCOMPLETE`-ஐ உருவாக்கும்; உறுதிப்படுத்தப்பட்ட விலகல் `FAIL`-ஐ உருவாக்கும். இரண்டுமே
தோல்வியைக் குறிக்கும் exit status-ஐ வழங்கும். ரசீது checkout SHA, workflow, run மற்றும்
attempt ஆகியவற்றுடன் பிணைக்கப்பட்டு, `i18n-base-health-<sha>-<run>-<attempt>` என்ற பெயரில் தக்கவைக்கப்படுகிறது.

இது வெளியிடப்பட்ட அடிப்படையின் ஒரு சுயாதீனக் கண்காணிப்பாகும். இது PR அல்லது
merge-group நிகழ்வு, கட்டாய PR check, npm மாற்றுப்பெயர் அல்லது static-scan profile உறுப்பினர் ஆகியவற்றைச் சேர்க்காது.
ஏற்கனவே உள்ள வேறுபாட்டு PR கொள்கையும், அடிப்படையான checker-இன் ஆலோசனை வகைப்பாடுகளும்
தனித்தனியாகவே இருக்கும். வெற்றிகரமான upload, தோல்வியடைந்த health முடிவை PASS ஆக மாற்ற முடியாது.

### Release PR விரைவுப் பாதை (`quality.yml`)

`.github/workflows/quality.yml`, main/release PR-கள், `main`-க்கான push-கள்,
dispatch மற்றும் merge group-களில் CI-ஐ நிறைவுசெய்கிறது. PR-கள் path-filtered விரைவுச் சரிபார்ப்புகளைப் பயன்படுத்துகின்றன.
நிரந்தரமாக முடக்கப்பட்டிருந்த நகல் build அகற்றப்பட்டது; உண்மையான build/package/boot சரிபார்ப்புகள் CI-இல் தொடர்ந்து உள்ளன.

| பணி                                              | வரம்பு                                                                                                                                                                                                                                                                                        | தடுக்கும் நிலை      |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `Docs Gates (fast-path)`                         | ஆவணங்கள்/குறியீட்டு PR-கள்; API ஆவணக் குறிப்புகள் மற்றும் docs-all                                                                                                                                                                                                                            | ஆம்                 |
| `Fast Quality Gates`                             | குறியீட்டு PR-கள்; நிலையான சரிபார்ப்புகள், வகைச் சரிபார்ப்பு, டாஷ்போர்டு வகைச் சரிபார்ப்பு, பாதிக்கப்பட்ட அலகுச் சோதனைகள்                                                                                                                                                                     | ஆம்                 |
| `Forgotten sibling tests`                        | குறியீட்டு PR-கள்; மாற்றப்பட்ட தொகுதிகளிலிருந்து நிலையான பயன்பாட்டாளர்கள் மற்றும் சாத்தியமான உடன்பிறப்புச் சோதனைகள் வரை தடமறியப்படும்; barrel மற்றும் dynamic-import பாதைகள் ஆலோசனை நோயறிதல்களாகப் புகாரளிக்கப்படும், மேலும் குறிப்பிடப்பட்ட அனுமதிப்பட்டியல் விதிவிலக்குகளும் சேர்க்கப்படும் | **ஆலோசனை மட்டும்**  |
| `Vitest (fast-path)`                             | குறியீட்டு PR-கள்; விரைவான vitest தொகுப்பு                                                                                                                                                                                                                                                    | ஆம்                 |
| `Unit Tests fast-path`                           | குறியீட்டு PR-கள்; 4-shard அலகுச் சோதனைத் தொகுப்பு                                                                                                                                                                                                                                            | ஆம்                 |
| `No new ESLint warnings`                         | குறியீட்டு PR-கள்; ஒடுக்கல்களைக் கருத்தில் கொள்ளும் lint பாதுகாப்புச் சரிபார்ப்பு                                                                                                                                                                                                             | ஆம், fork-கள் உட்பட |
| `Merge integrity (changelog + generated skills)` | வரைவல்லாத PR-கள்; changelog மற்றும் உருவாக்கப்பட்ட skill ஒத்திசைவு                                                                                                                                                                                                                            | ஆம், fork-கள் உட்பட |

#### மறக்கப்பட்ட உடன்பிறப்புச் சோதனைகள் அறிக்கை

`npm run check:forgotten-sibling-tests`, சோதனைப் பாதிப்பு வரைபடத்தின் பின்னால் உள்ள import resolver-ஐ மீண்டும் பயன்படுத்துகிறது.
மாற்றப்பட்ட ஒவ்வொரு production தொகுதிக்கும், சாத்தியமான சோதனை
pull-request diff-இல் இல்லாதபோது, தீர்மானகரமான `changed module/symbol -> static consumer -> candidate sibling test`
சங்கிலிகளை இது அறிக்கையிடுகிறது. எந்தவொரு தடுக்கும் வெளியீட்டுக்கும் முன் அளவுத்திருத்தத்திற்காக, Markdown சுருக்கமும் JSON முடிவும்
`forgotten-sibling-tests` workflow artifact ஆகத் தக்கவைக்கப்படுகின்றன.

Barrel re-export-களும் dynamic import-களும் resolution நோயறிதல்கள் மட்டுமே; அவை ஒருபோதும்
தடுக்கும் கண்டறிதலை உருவாக்காது. மதிப்பாய்வு செய்யப்பட்ட விதிவிலக்குகள்
`config/quality/forgotten-sibling-allowlist.json`-இல் உள்ளன. ஒவ்வொரு பதிவும் consumer மற்றும் candidate
test-ஐக் குறிப்பிட வேண்டும், குறிப்பிட்ட காரணத்தை வழங்க வேண்டும், மேலும் ஒரு GitHub issue அல்லது pull request-க்கு இணைக்க வேண்டும். தவறான வடிவமைப்புடைய பதிவுகள்
மூடிய நிலையில் தோல்வியடையும். நீக்கப்பட்ட candidate test அல்லது `.skip`/`.todo`-ஐச் சேர்க்கும் diff-ஐ
விதிவிலக்குகளால் ஒடுக்க முடியாது; assertion-ஐ வலுவிழக்கச் செய்தல் மற்றும் பிற மறைத்தல் செயல்கள், சுயாதீனமாகத் தடுக்கும்
`check:test-masking` gate-இன் பொறுப்பாகவே தொடர்கின்றன.

### பணி: `lint`

`main`-க்கான ஒவ்வொரு PR-இலும் இயங்கும். தோல்வியடைந்தால் merge செய்வதைத் தடுக்கும்.

| ஸ்கிரிப்ட் (`npm run ...`)        | சரிபார்ப்பவை                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | தடுக்கும் தன்மை                        |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `check:node-runtime`              | Node.js பதிப்பு ஆதரிக்கப்படும் வரம்பிற்குள் உள்ளது                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ஆம்                                    |
| `check:test-tla-order`            | `tests/unit`-இன் கீழுள்ள எந்த `node:test` கோப்பும் ஒரு சோதனையைப் பதிவுசெய்து, மேல்-நிலை `await`-ஐ அடைந்த பின், மேலும் சோதனைகளைப் பதிவுசெய்வதில்லை (#18045; ராட்செட்: `test-tla-order-allowlist.json` சுருங்க மட்டுமே முடியும்)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ஆம்                                    |
| `check:cycles`                    | `src/` + `open-sse/` முழுவதிலும் உள்ள சுழற்சி இறக்குமதிகள் (AST-அடிப்படையிலானது, tsconfig `paths` தீர்க்கப்பட்டவை). ஏதேனும் சுழற்சி இருந்தால், எந்தக் கூடுதல் விருப்பங்களும் இல்லாத இயக்கம் 1 என்ற வெளியேற்றக் குறியீட்டுடன் முடிந்து (fail-closed since #15281), SCC-களைப் பட்டியலிடும். `check:cycles:ratchet` (CI இயக்குவது) எண்ணிக்கை `quality-baseline.json`-இல் உள்ள `metrics.cycles` உச்சவரம்பை மீறும்போது தடுக்கும் — தற்போது 14, `direction: down`, எனவே அது குறைய மட்டுமே முடியும் (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | ஆம் (ராட்செட்)                         |
| `check:boundary`                  | `open-sse → src` இணைப்பு: என்ஜினிலிருந்து செயலிக்கான தனித்துவமான கோப்பு-முதல்-கோப்பு இறக்குமதிகள் (`scripts/quality/measure-boundary.mjs`; விளிம்புப் பட்டியல் என்பது v4 மைய/தொகுதிப் பிரிப்புச் சீரமைப்பிற்கான நிலுவைப் பணிப்பட்டியல்). எந்தக் கூடுதல் விருப்பங்களும் இல்லாத இயக்கம் = ஆலோசனை அறிக்கை (`quality:boundary` போன்றதே). `check:boundary:ratchet` (CI இயக்குவது, மேலும் `quality.yml` விரைவு-கேட்ஸ் ராட்செட் சுழற்சியிலும் உள்ளது) எண்ணிக்கை `quality-baseline.json`-இல் உள்ள `metrics.boundaryOpenSseToSrc` உச்சவரம்பை மீறும்போது தடுக்கும் — அளவிடப்பட்ட 771-ஐத் தொடக்க மதிப்பாகக் கொண்டது, `direction: down`; `--update` அதை மட்டுமே குறைக்கும்; PR-களில் அடிப்படைக் கிளையுடன் ஒப்பிடப்பட்டது (`--base-ref`, கீழே காண்க)                                                                                                                                                                                                                                                                        | ஆம் (ராட்செட்)                         |
| `check:route-validation:t06`      | அனைத்து வழித்தடங்களிலும் Zod schemas உள்ளன (Tier 6 கொள்கை)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ஆம்                                    |
| `check:any-budget:t11`            | `@ts-expect-error // any` எண்ணிக்கை வரம்பை மீறவில்லை (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ஆம்                                    |
| `check:provider-consistency`      | `providers.ts`-இல் உள்ள ஒவ்வொரு provider-க்கும் `providerRegistry.ts`-இல் பொருந்தும் பதிவு உள்ளது (மேலும் இதன் மறுதிசையிலும், allowlist-க்குள்)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | ஆம்                                    |
| `check:model-lifecycle`           | கைமுறையாகப் பராமரிக்கப்படும் மூன்று routing tables, repository-இல் சேர்க்கப்பட்ட lifecycle snapshot-உடன் (#11503) ஒத்திசைவாக உள்ளன: `FITNESS_TABLE` (`taskFitness.ts`), `REGISTRY` route செய்யக்கூடிய ஓய்வுபெற்ற எந்த id-க்கும் மதிப்பெண் வழங்காது; ஒவ்வொரு `BUILT_IN_ALIASES` இலக்கும் `REGISTRY`-இல் உள்ளது மற்றும் ஓய்வுபெற்ற id snapshot-இல் இல்லை; `REGISTRY`-இல் இன்னும் உள்ள ஒவ்வொரு ஓய்வுபெற்ற id-மும் forward செய்யப்பட்டுள்ளது அல்லது `allowedRetiredInCatalog`-இல் பட்டியலிடப்பட்டுள்ளது; மேலும் எந்த `DEFAULT_DEGRADATION_MAP` மூலமோ இலக்கோ அந்த snapshot-இல் ஓய்வுபெற்றதாகத் தோன்றாது. ஒரு model தற்போது நேரடி upstream மூலம் வழங்கப்படுகிறது என்பதை இது நிரூபிக்காது. Offline — `config/quality/model-lifecycle.json`-உடன் ஒப்பிடுகிறது; இது `npm run quality:refresh-model-lifecycle` மூலம் கைமுறையாகப் புதுப்பிக்கப்படுகிறது (network; CI-உடன் இணைக்கப்படவில்லை). `allowedRetiredInCatalog` என்பது படிப்படியாகக் குறைக்கும் ratchet: tracking issue இருந்தால் மட்டுமே ஒரு பதிவைச் சேர்க்கவும். | ஆம்                                    |
| `check:fetch-targets`             | client-side `src/`-இல் உள்ள ஒவ்வொரு `fetch("/api/...")`-உம் உண்மையான `route.ts`-க்குத் தீர்மானிக்கப்படுகிறது                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ஆம்                                    |
| `check:deps`                      | repository-இல் உள்ள ஒவ்வொரு `package.json`-இலும் காணப்படும், `npm install` மூலம் நிறுவக்கூடிய அனைத்து deps-உம் `dependency-allowlist.json`-இல் உள்ளன; புதிதாக pin செய்யப்படாத அல்லது slopsquatting செய்யப்பட்ட packages குறிக்கப்படுகின்றன                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ஆம்                                    |
| `audit:deps`                      | தனித்தனியான ஐந்து lockfile-களுக்குமான npm audit (root, Electron, OpenCode plugins v1/v2 மற்றும் provider). Critical அறிவுறுத்தல்கள் தடுக்கின்றன; high அறிவுறுத்தல்கள் தென்படும் எச்சரிக்கைகளாகத் தொடர்கின்றன. விடுபட்ட/தோல்வியடைந்த audit-கள் INCOMPLETE எனக் கருதப்பட்டுத் தடுக்கின்றன; ஒவ்வொரு scope-க்குமான lock hash-களும் அறிக்கைகளும் தக்கவைக்கப்படுகின்றன.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ஆம்                                    |
| `check:lockfile`                  | `package-lock.json` ஒருமைப்பாடு — https registry, integrity hash-கள், host override-கள் இல்லை                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ஆம்                                    |
| `check:licenses`                  | production dependency-களுக்கான SPDX உரிம allowlist                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ஆம்                                    |
| `check:tracked-artifacts`         | build artifact-கள் / commit செய்யப்பட்ட `node_modules` symlink-கள் இல்லை (husky pre-commit-லும் இயங்குகிறது; pre-push வேண்டுமென்றே இலகுவாக வைக்கப்பட்டுள்ளது — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ஆம்                                    |
| `check:ai-attribution`            | PR commit-கள், title அல்லது body-இல் AI/bot `Co-Authored-By` trailer அல்லது AI உருவாக்க footer இல்லை — கடுமையான விதி #16 (`quality.yml` fast-gates loop-இல் PR→`release/**` என்பதற்கு — event payload-ஐப் படிக்கிறது, PR அல்லாதவற்றில் no-op ஆகும் — மேலும் `ci.yml` lint-இல் PR→`main` என்பதற்கான PR-only படிநிலை; husky `commit-msg` hook-லும்; மனித co-author-கள் அனுமதிக்கப்படுகின்றனர்; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:vitest-exclusions`         | ஒவ்வொரு Vitest exclusion-உம் ஒரு tracking issue-ஐக் குறிப்பிடுவதுடன் `config/quality/vitest-exclusions.json`-இல் இடம்பெற வேண்டும் (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ஆம்                                    |
| `check:file-size`                 | மூலக் கோப்புகள் (`src/`, `open-sse/`, `electron/`, `bin/` ஆகியவற்றில் உள்ள `.ts`/`.tsx`) `cap` வரம்பிற்குள்ளும், சோதனைக் கோப்புகள் (`*.test.ts(x)`) `testCap` வரம்பிற்குள்ளும் இருக்க வேண்டும்; `file-size-baseline.json` இல் உறையவைக்கப்பட்ட (`frozen` / `testFrozen`) கோப்புகள், பதிவுசெய்யப்பட்ட அளவைத் தாண்டி வளரக்கூடாது                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ஆம்                                    |
| `check:error-helper`              | செயல்படுத்திகள்/கையாளிகளில் உள்ள பிழைப் பதில்கள் `buildErrorBody()` / `sanitizeErrorMessage()` ஐப் பயன்படுத்த வேண்டும் (கடுமையான விதி #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ஆம்                                    |
| `check:migration-numbering`       | இடம்பெயர்வு SQL கோப்புகள் இடைவெளிகளோ நகல்களோ இல்லாமல் தொடர்ச்சியாக எண்ணிடப்பட்டிருக்க வேண்டும்                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ஆம்                                    |
| `check:public-creds`              | `publicCreds.ts` க்கு வெளியே நேரடி OAuth `client_id`/`client_secret` அல்லது Firebase Web விசைகள் இருக்கக்கூடாது (கடுமையான விதி #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ஆம்                                    |
| `check:db-rules`                  | `src/lib/db/` தொகுதிகளுக்கு வெளியே நேரடி SQL இருக்கக்கூடாது; `localDb.ts` இலிருந்து barrel-imports இருக்கக்கூடாது (கடுமையான விதிகள் #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ஆம்                                    |
| `check:known-symbols`             | தத்தமது dispatch அட்டவணைகளில் பதிவுசெய்யப்பட்ட வழங்குநர் செயல்படுத்திகள், வழிப்படுத்தல் உத்திகள் மற்றும் மொழிபெயர்ப்பிகள் வட்டில் உள்ள கோப்புகளுடன் பொருந்த வேண்டும் — தொடர்பற்ற அல்லது அறிவிக்கப்படாத குறியீடுகள் இருக்கக்கூடாது                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ஆம்                                    |
| `check:route-guard-membership`    | துணைச் செயல்முறையை உருவாக்கும் ஒவ்வொரு வழித்தடமும் `isLocalOnlyPath()` மூலம் வகைப்படுத்தப்படுகிறது (கடுமையான விதிகள் #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ஆம்                                    |
| `check:test-discovery`            | களஞ்சியத்தில் உள்ள ஒவ்வொரு `*.test.ts` / `*.spec.ts` கோப்பும் குறைந்தது ஒரு சோதனை இயக்கியால் சேகரிக்கப்படுகிறது (ratchet: `test-discovery-baseline.json`-இல் உள்ள அனாதைப் பட்டியல் சுருங்க மட்டுமே முடியும்)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ஆம்                                    |
| `check:agent-skills-sync`         | உருவாக்கப்பட்ட agent-skills கலைப்பொருட்கள் அவற்றின் மூலப் பட்டியலுடன் பொருந்துகின்றன (விலகல் இல்லை)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:provider-asset-provenance` | வழங்குநர் இலச்சினைகள்/சொத்துகளுக்குப் பதிவுசெய்யப்பட்ட மூலாதார உள்ளீடு உள்ளது                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `lint:json`                       | JSON கட்டமைப்புக் கோப்புகள் பாகுபடுத்தப்பட்டு, களஞ்சியத்தின் lint விதிகளைப் பூர்த்தி செய்கின்றன                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `typecheck:core`                  | பிழைகள் இல்லாத TypeScript தொகுப்பு (ஆலோசனை எச்சரிக்கைகள் மட்டும்)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ஆம்                                    |
| `typecheck:noimplicit:core`       | கடுமையான `noImplicitAny` — எதிர்கால நோக்குடையது; முன்பே உள்ள பல அழைப்பிடங்களுக்கு இன்னும் வகைக் குறிப்புகள் தேவை                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | **ஆலோசனை** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**`-க்கு வரம்பிடப்பட்ட `tsc` (#7033) — `typecheck:core`-இன் கவனமாகத் தேர்ந்தெடுக்கப்பட்ட 27-கோப்பு அனுமதிப்பட்டியலில் எந்த dashboard TSX-உம் சேர்க்கப்படவில்லை; மேலும் `next build` அதற்கான வகைச் சரிபார்ப்பை ஒருபோதும் செய்வதில்லை (`next.config.mjs`, `ignoreBuildErrors: true` என அமைக்கிறது). எனவே அங்கிருந்த தொடர்பற்ற-அடையாளங்காட்டி பின்னடைவுகள் (#6625/#6909) CI-க்குத் தெரியாமல் இருந்தன. உறையவைக்கப்பட்ட கோப்புவாரியான/TS-code எண்ணிக்கை அடிப்படையுடன் (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` பயன்படுத்தும் அதே காலாவதியான-அமலாக்க முறை) வேறுபாடுகள் ஒப்பிடப்படுகின்றன — அடிப்படையாக்கப்பட்ட எண்ணிக்கையைத் தாண்டிய புதிய பிழைகள் மட்டுமே gate-ஐத் தோல்வியடையச் செய்யும்; முன்பே இருந்த ஒரு பிழை சரிசெய்யப்படும்போது `--update` மூலம் அடிப்படையைப் படிப்படியாகக் குறைக்கவும்.                                                                                                                                                                | ஆம்                                    |

### பணி: `quality-gate`

`test-coverage`-க்குப் பிறகு இயங்குகிறது. தோல்வியுற்றால் merge செய்வதைத் தடுக்கிறது.

| Script                       | சரிபார்ப்பது                                                                                                                                                                                                                   | தடுக்கும் தன்மை              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| `quality:collect`            | `quality-metrics.json`-ஐ வெளியிடுகிறது (ESLint எச்சரிக்கை எண்ணிக்கை, ஒன்றிணைக்கப்பட்ட shard அறிக்கையிலிருந்து coverage)                                                                                                        | ஆம் (ratchet-க்கு முந்தையது) |
| `quality:ratchet`            | `quality-baseline.json`-இல் உள்ள ஒவ்வொரு metric-உம் பின்னடையவில்லை (ESLint எச்சரிக்கைகள் ≤ baseline; coverage ≥ baseline)                                                                                                      | ஆம்                          |
| `check:duplication`          | Code duplication (jscpd@4), `quality-baseline.json`-இல் உள்ள baseline-ஐத் தாண்டவில்லை                                                                                                                                          | ஆம்                          |
| `check:complexity`           | கோப்பு-நிலை cyclomatic complexity வரம்பைத் தாண்டவில்லை (மைய ESLint `complexity` + `max-lines-per-function`)                                                                                                                    | ஆம்                          |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — தனித்த ESLint இயக்கம்; CI இரண்டையும் ஒற்றை `check:complexity-ratchets` படிநிலையாக ஒன்றிணைத்து இயக்குகிறது                                                             | ஆம்                          |
| `check:dead-code`            | பயன்படுத்தப்படாத exports / files ratchet (knip), baseline-உடன் ஒப்பிடும்போது பின்னடையவில்லை                                                                                                                                    | ஆம்                          |
| `check:compression-budget`   | Compression benchmark budget — engine-வாரியான token-savings குறைந்தபட்ச அளவுகள் பின்னடையக்கூடாது                                                                                                                               | ஆம்                          |
| `check:type-coverage`        | Percent-typed ratchet (`type-coverage`) பின்னடையவில்லை; பெருமளவில் `typecheck:noimplicit:core`-ஐ உள்ளடக்குகிறது                                                                                                                | ஆம்                          |
| `check:codeql-ratchet`       | திறந்த CodeQL alert எண்ணிக்கை பின்னடையவில்லை (`gh api` வழியாகப் படிக்கிறது; token இல்லாவிட்டால் சுமுகமாகத் தவிர்க்கிறது) — புதுப்பிப்பு இடைவெளி மற்றும் கைமுறைத் தூண்டலுக்கு: கீழே உள்ள "CodeQL ratchet" பகுதியைப் பார்க்கவும் | ஆம்                          |

### பணி: `quality-extended`

இந்தப் பணி பொருந்தக்கூடிய candidates-ஐத் தடுக்கிறது. Bundle அளவு, secret கண்டுபிடிப்புகள், vulnerability
கண்டுபிடிப்புகள், workflow கண்டுபிடிப்புகள் மற்றும் OpenAPI மாற்றங்கள் தேவையான ratchets மூலம்
சரிபார்க்கப்படுகின்றன. Circular-dependency diagnostics தொடர்ந்து ஆலோசனை நோக்கிலேயே உள்ளன. Scanner நிறுவல் கட்டாயம்:
`scripts/ci/install-quality-scanners.sh`, நிலைநிறுத்தப்பட்ட versions-ஐ வழங்கி நிறுவல்
தோல்விகளைப் பரப்புகிறது. கருவிகள் இல்லாமை, செல்லுபடியாகாத அறிக்கைகள் அல்லது baselines இல்லாமை
தேவையான scanner gate-ஐ INCOMPLETE நிலையில் விடும்.

| ஸ்கிரிப்ட்               | சரிபார்ப்பவை                                                                                                                                                                                                                                                      | தடுக்கும் நிலை                                          |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `check:circular-deps`    | சுழற்சி சார்புகள் இல்லை (dpdm)                                                                                                                                                                                                                                    | **ஆலோசனை மட்டும்**                                      |
| `check:bundle-size`      | பண்டில் அளவு வரம்பை மீறவில்லை; அளவீடு கிடைக்கவில்லை என்றால் தோல்வியடையும்                                                                                                                                                                                         | **--ratchet உடன் தடுக்கும்**                            |
| `check:secrets`          | Gitleaks கண்டறிதல்கள் பின்னடையவில்லை; கட்டாய ஸ்கேன்கள் கருவி/மூலம்/அடிப்படை இல்லாமை, தோல்வியடைந்த ஸ்கேன்கள் மற்றும் செல்லாத அறிக்கைகளை நிராகரிக்கும்                                                                                                              | **--ratchet உடன் தடுக்கும்**                            |
| `check:vuln-ratchet`     | சார்பு பாதிப்புகள் பின்னடையவில்லை; கட்டாய ஸ்கேன்கள் கருவிகள் இல்லாமை, செல்லாத அறிக்கைகள் அல்லது அடிப்படைகள் இல்லாமையை நிராகரிக்கும்                                                                                                                               | **--ratchet உடன் தடுக்கும்**                            |
| `check:workflows`        | பணிப்பாய்வு lint (actionlint + zizmor); காணாமல்போன/செயலிழந்த ஸ்கேனர்கள், செல்லாத அறிக்கைகள் அல்லது காணாமல்போன ratchet அடிப்படை ஆகியவை INCOMPLETE எனத் தோல்வியடையும். செல்லுபடியான கண்டறிதல்கள் தேர்ந்தெடுக்கப்பட்ட strict/advisory/ratchet கொள்கையைப் பின்பற்றும் | செயல்படுத்தல் கட்டாயம்; CI-இல் zizmor ratchet தடுக்கும் |
| `check:openapi-breaking` | நிலைப்படுத்தப்பட்ட நிகழ்வு commit-களுக்கு எதிரான பொது API ஒப்பந்தம் (PR merge-base, push before, merge-group base; திட்டமிடப்பட்ட/கைமுறை checkout-க்கு முதல் parent); கட்டாய அளவீடு கிடைக்காவிட்டால் மூடப்பட்ட நிலையில் தோல்வியடையும்                             | **--ratchet உடன் தடுக்கும்**                            |

### பணி: `docs-sync-strict`

`main` அல்லது `release/**`-ஐ நோக்கிய pull request-களுக்கு, வரைவுகளாக இல்லாத (அல்லது நம்பகமான வரிசையிலிருந்து வரும்), ஆவணம் அல்லது குறியீட்டு மாற்றங்கள் என வகைப்படுத்தப்பட்ட வேட்புகளுக்கு மட்டுமே இந்தப் பணி இயங்கும். PR அல்லாத CI நிகழ்வுகளிலும் இது இயங்கும்; இந்தப் பணிப்பாய்வின் push தூண்டி `main`-க்கு மட்டுமே பொருந்தும், `release/**`-க்கு அல்ல. பூஜ்ஜியமல்லாத வெளியேற்றக் குறியீட்டுடன் முடியும் படி பணியைத் தடுக்கும்; அறிக்கையில் மட்டும் தெரிவிக்கப்படும் கண்டுபிடிப்புகளும் கீழே ஆவணப்படுத்தப்பட்ட விதிவிலக்குகளும் அதைத் தடுக்காது.

| ஸ்கிரிப்ட்                     | சரிபார்ப்பவை                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | தடுக்கும் நிலை                                                                                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | கீழே உள்ள 7 துணை-வாயில்களையும் வரிசையாக இயக்கும் மேல்-வாயில்                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ஆம்                                                                                                                                                                 |
| ↳ `check:docs-sync`            | தொகுப்பு/OpenAPI/CHANGELOG பதிப்புகளின் ஒத்திசைவு, `llm.txt`-இன் துல்லியமான பிரதிகள், மொழிபெயர்க்கப்பட்ட CHANGELOG-இன் பிரிவுகள் மற்றும் அளவு குறித்த மாறாத நிபந்தனைகள், புதிய ஆவணங்களால் மாற்றப்பட்ட பழைய நகல் ஆவணங்கள் இல்லாமை                                                                                                                                                                                                                                                                                                                                                                                   | ஆம்                                                                                                                                                                 |
| ↳ `check:docs-frontmatter`     | தொகுக்கப்பட்ட ஆவணப் பக்கங்களில் செல்லுபடியான frontmatter தலைப்புகள் உள்ளன                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ஆம்                                                                                                                                                                 |
| ↳ `check:docs-counts`          | அதிக நம்பகத்தன்மை கொண்ட எண்ணிக்கை சார்ந்த மாறாத நிபந்தனைகள் கண்டிப்பாகச் செயல்படுத்தப்படுகின்றன; கோப்பு எண்ணிக்கைக்கான தோராயமான சரிபார்ப்புகள், ஸ்கிரிப்ட்டுக்கு `--strict` வழங்கப்படாவிட்டால் எச்சரிக்கைகள் மட்டுமே அளிக்கும் (CI-இன் மேல்-வாயில் இதை வழங்குவதில்லை)                                                                                                                                                                                                                                                                                                                                              | கடுமையான நிலை தடுக்கும்; மென்மையான நிலை ஆலோசனை மட்டுமே                                                                                                              |
| ↳ `check:env-doc-sync`         | புறக்கணிக்கப்படுபவை, ஆவணங்களில் மட்டும் இருப்பவை, சூழலில் மட்டும் இருப்பவை ஆகியவற்றுக்கான வெளிப்படையான அனுமதிப் பட்டியல்களைப் பயன்படுத்திய பிறகு, மூலக் குறியீட்டில் வாசிக்கப்படும் சூழல் மாறிகள், `.env.example` மற்றும் `docs/reference/ENVIRONMENT.md` ஒன்றுக்கொன்று பொருந்துகின்றன                                                                                                                                                                                                                                                                                                                             | ஆம், ஆவணப்படுத்தப்பட்ட அனுமதிப் பட்டியல்களுக்கு வெளியே                                                                                                              |
| ↳ `check:deprecated-versions`  | புறக்கணிக்கப்பட்ட ஆவணங்களைத் தவிர்த்து, பாதுகாப்பான வரலாற்றுச் சூழல்களுக்கு வெளியே பழையதாக இருக்கக்கூடிய பதிப்புகளையும் பழைய புதுப்பிப்புத் தேதிகளையும் தெரிவிக்கிறது                                                                                                                                                                                                                                                                                                                                                                                                                                              | தற்போதைய CI அமைப்பில் ஆலோசனை மட்டுமே (`--strict` வழங்கப்படுவதில்லை)                                                                                                 |
| ↳ `check:doc-links`            | ஆவணங்களில் உள்ள அக markdown இணைப்புகள் உண்மையான கோப்புகளுக்குத் தீர்மானிக்கப்படுகின்றன (`[text]`/`(path)` வடிவம்)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ஆம்                                                                                                                                                                 |
| ↳ `check:fabricated-docs`      | ஆவணங்களில் குறிப்பிடப்பட்ட வழித்தடங்கள், env var-கள், CLI கட்டளைகள், hook பெயர்கள் மற்றும் கோப்புப் பாதைகள் codebase-இல் உள்ளன. `--strict` வழியாகக் கடுமையான வாயில்; கொடி இல்லாமல் மென்மையான தோல்வி.                                                                                                                                                                                                                                                                                                                                                                                                               | ஆம் (CI-இல் `--strict` வழியாக)                                                                                                                                      |
| `check:cli-i18n`               | CLI-இல் பயன்படுத்தப்படும் `t()` விசைகள் `en`-இல் உள்ளன; `pt-BR` ஒவ்வொரு மேல்நிலைப் பிரிவையும் தக்கவைக்கிறது; `zh-CN` மற்றும் `zh-TW` ஆகியவற்றில் `en`-இன் ஒவ்வொரு விசையும் உள்ளது                                                                                                                                                                                                                                                                                                                                                                                                                                  | ஆம்                                                                                                                                                                 |
| `check:openapi-coverage`       | OpenAPI விவரக்குறிப்பு, உண்மையான வழித்தடங்களின் ratchet மூலம் நிர்ணயிக்கப்பட்ட குறைந்தபட்ச அளவையாவது உள்ளடக்குகிறது                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | ஆம்                                                                                                                                                                 |
| `check:openapi-security-tiers` | அறிவிக்கப்பட்ட `x-loopback-only`/`x-always-protected` சிறுகுறிப்புகளுக்கு `routeGuard.ts`-இல் ஆதரவு இருக்க வேண்டும்; பாகுபடுத்தியின் பிழைகளும் முன்னோக்குச் சரிபார்ப்பின் முரண்பாடுகளும் தடுக்கும். உள்ளூர் அணுகலுக்கு மட்டும் உரிய முன்னொட்டுகளின் கீழ் `x-loopback-only` இல்லாததைத் தேடும் பின்னோக்குச் சரிபார்ப்பு எச்சரிக்கிறது; வடிவங்களால் மட்டுமே வரையறுக்கப்பட்ட வழித்தடங்கள் அந்தப் பின்னோக்குச் சரிபார்ப்பிலிருந்து விலக்கப்படுகின்றன.                                                                                                                                                                   | பாகுபடுத்தி மற்றும் முன்னோக்குச் சரிபார்ப்புகள் தடுக்கும்; பின்னோக்குச் சரிபார்ப்பு ஆலோசனை மட்டுமே                                                                  |
| `check:openapi-routes`         | நியாயமான காரணங்களுடன் அமைக்கப்பட்ட `KNOWN_STALE_SPEC` அனுமதிப் பட்டியலைப் பயன்படுத்திய பிறகு, `openapi.yaml`-இல் உள்ள ஒவ்வொரு `/api...` பாதையும் அளவுரு வேறுபாடுகளைப் பொருட்படுத்தாமல் உண்மையான வழித்தடத்துடன் பொருந்துகிறது; அனுமதிப் பட்டியலில் காலாவதியான பதிவுகளும் தோல்வியை ஏற்படுத்தும்                                                                                                                                                                                                                                                                                                                      | ஆம்                                                                                                                                                                 |
| `check:docs-symbols`           | பிரதிகளாக இல்லாத அதிகாரப்பூர்வ மூல ஆவணங்களில் உள்ள அக `/api/...` URL குறிப்புகள் உண்மையான வழித்தடம் அல்லது வழித்தடக் குடும்பத்துடன் பொருந்துகின்றன; இடைநிலைச் சேவையகம், மேல்நிலைச் சேவை, இடநிரப்பி மற்றும் கோப்புக் குறிப்புகளும் நியாயமான காரணங்களுடன் உள்ள `KNOWN_STALE_DOC_REFS` பதிவுகளும் விலக்கப்படுகின்றன; அனுமதிப் பட்டியலின் காலாவதியான பதிவுகள் தோல்வியை ஏற்படுத்தும்                                                                                                                                                                                                                                    | ஆம்                                                                                                                                                                 |
| `i18n translation drift`       | முக்கிய ஆவணங்களின் மூலம்/இலக்கு ஹாஷ்களையும் மொழிபெயர்ப்பின் தோற்றத்தையும் சரிபார்க்கிறது. PR ஒப்பீடு முற்றிலும் ஒரே மாதிரியான மரபுவழியாக வந்த தோல்விகளை மட்டுமே அனுமதிக்கிறது; மூலம், இல்லாத இலக்கு, இலக்கு ஹாஷ், காலாவதியான மொழிபெயர்ப்பு அல்லது பிரிவுத் தற்காலிகச் சேமிப்பில் உள்ள புதிய அல்லது சரிபார்க்கப்படாத முரண்பாடுகள் தடுக்கின்றன. PR ஒப்பீட்டிற்கு வெளியே மூலம்/இல்லாத இலக்கு/இலக்கு ஹாஷ் தோல்விகள் தடுக்கின்றன; காலாவதியான மொழிபெயர்ப்புகளும் முரண்பாடான பிரிவுத் தற்காலிகச் சேமிப்புகளும் எச்சரிக்கைகளாக மட்டுமே தொடர்கின்றன. பழைய வடிவிலான பிரிவுத் தற்காலிகச் சேமிப்பு இல்லாதிருப்பது தோல்வி அல்ல. | PR-இல் புதிய/சரிபார்க்கப்படாத விலகல் தடுக்கிறது; முற்றிலும் ஒரே மாதிரியான மரபுவழி விலகல் எச்சரிக்கை மட்டுமே; PR-க்கு வெளியேயான விதிகள் தோல்வியின் வகையைச் சார்ந்தவை |

### பணி: `i18n-ui-coverage`

| ஸ்கிரிப்ட்                         | சரிபார்ப்பது                                                                                                                                                                                                                | தடுக்கும் தன்மை |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (இன்லைன்) | UI i18n விசைகளின் கவரேஜ் ≥ 65% ஆக உள்ளது                                                                                                                                                                                    | ஆம்             |
| `check-ui-value-drift` (இன்லைன்)   | மீண்டும் எழுதப்பட்ட ஆங்கில **மதிப்பு**, காலாவதியான மொழிபெயர்ப்பு எதையும் விட்டுச் செல்லவில்லை                                                                                                                               | ஆம்             |
| `check-new-key-coverage` (இன்லைன்) | ஒரு **புதிய** ஆங்கில விசை ஒவ்வொரு மொழியமைவிலும் மொழிபெயர்க்கப்பட்டுள்ளது — `__MISSING__:` குறியீடு நிராகரிக்கப்படும்                                                                                                        | ஆம்             |
| `check-translation-ratio`          | ஒவ்வொரு மொழியமைவிற்குமான உண்மையான மொழிபெயர்ப்பு விகிதம் (அனுமதிப்புப் பட்டியலுக்கு வெளியே ஆங்கிலத்துடன் ஒத்திருப்பவை / இடநிரப்பிகள் / விடுபட்ட இலைகள்) `config/quality/i18n-translation-baseline.json` + தளர்வை மீறக்கூடாது | **தடுக்கும்**   |

`fetch-depth: 0` தேவை — மதிப்பு விலகல் கேட், merge base-க்கு எதிராக `en.json`-ஐ வேறுபடுத்திப் பார்க்கிறது.

#### `check-ui-value-drift` — காலாவதியான மொழிபெயர்ப்பு கேட்

மற்ற கேட்களால் கட்டமைப்பு ரீதியாகக் கண்டறிய முடியாத ஒரே i18n பின்னடைவை இது கண்டறிகிறது: ஓர் ஆங்கில மதிப்பு
மீண்டும் எழுதப்பட்ட பிறகும், _முந்தைய_ ஆங்கிலத்திலிருந்து உருவாக்கப்பட்ட மொழிபெயர்ப்புகள் அப்படியே எஞ்சுவதால்,
ஆங்கிலம் அல்லாத பயனர்கள் உறுதியான நடையில் எழுதப்பட்ட, ஆனால் இப்போது தவறான உரையைத் தொடர்ந்து படிக்கிறார்கள்.

இது உண்மையிலேயே வெளியீட்டில் இடம்பெற்றது. Antigravity உள்நுழைவு உதவியாளர் சேர்க்கப்பட்டபோது (#5203),
`oauthModal.googleOAuthWarning` மீண்டும் எழுதப்பட்டது; **43 மொழியமைவுகளில் 39**, ஆபரேட்டர்களிடம் "முழு
URL-ஐ நகலெடுத்து கீழே ஒட்டவும்" என்று கூறும் உரையை வைத்திருந்தன — அந்த வழங்குநருக்கு நிறைவுசெய்ய முடியாத
ஒரு செயல்முறை அது. பின்வரும் காரணங்களால் #8463 வரை இது கவனிக்கப்படவில்லை:

- `sync-ui-keys`, **இல்லாத** விசைகளை மட்டுமே பின்நிரப்புகிறது; **காலாவதியானவற்றை** ஒருபோதும் நிரப்புவதில்லை;
- `check-ui-keys-coverage`, விசை _இருப்பதை_ மட்டுமே கணக்கிடுகிறது; எனவே காலாவதியான மொழிபெயர்ப்பும் கவரேஜில் உள்ளதாக மதிப்பிடப்படுகிறது;
- `check-translation-drift`, `docs/i18n/<locale>/**.md` ஆவணப் பிரதிகளைக் கண்காணிக்கிறது —
  அது `src/i18n/messages/*.json`-ஐ ஒருபோதும் படிப்பதில்லை. 2026-09 மறுஒத்திசைவிலிருந்து `docs-sync-strict`
  பணியில் தடுப்பாக உள்ளது: ஒரு முதன்மை ஆவணத்தைத் திருத்தினால் → `npm run i18n:run -- --files=<doc>` (பிரிவு மட்டத்தில், குறைந்த செலவு).

**வேறுபாட்டை உணரக்கூடியது; அடிப்படை அளவைச் சார்ந்ததல்ல.** இது merge base-இல் உள்ள `en.json`-ஐ
வேலை மரத்துடன் ஒப்பிடுகிறது; ஆங்கில மதிப்பு மாறிய ஒவ்வொரு விசைக்கும், தொடப்படாத மொழிபெயர்ப்பை இன்னமும்
வைத்திருக்கும் எந்த மொழியமைவும் காலாவதியானதாகும். இது திட்டமிட்டே **முன்பிருந்த தொழில்நுட்பக் கடனை உறையவைக்கிறது** —
நீண்டகாலமாக உள்ள ஒரு மொழிபெயர்ப்பு எந்தப் பழைய ஆங்கிலத்திலிருந்து வந்தது என்பதை வேறுபாட்டால் கண்டறிய முடியாது;
எனவே தற்போதைய மாற்றம் தொடும் பகுதிகளை மட்டுமே கேட் மதிப்பிடுகிறது. மாற்று வழியான, விசை ஒன்றுக்கு ஒரு hash
அடிப்படை அளவு, சுமார் 600 KB அளவிலான உருவாக்கப்பட்ட கோப்பைத் தேவைப்படுத்தும்; இது ஏற்கெனவே உள்ள மிகப்பெரிய
அடிப்படை அளவைவிட 3 மடங்கு பெரியது, மேலும் ஒவ்வொரு i18n PR-இலும் தேவையற்ற மாற்றங்களை உருவாக்கும்.

இதை நிறைவேற்ற இரண்டு வழிகள் உள்ளன:

1. பாதிக்கப்பட்ட மொழிபெயர்ப்புகளைப் புதுப்பிக்கவும், அல்லது
2. அவற்றை `__MISSING__:<new english>` என அமைக்கவும் — பின்னர் இயக்கநேரம் திருத்தப்பட்ட ஆங்கிலத்தை வழங்கும்
   (`src/i18n/request.ts::deepMergeFallback`, #7258), மேலும் அந்த விசை மொழிபெயர்ப்புக்கான வரிசையில் சேர்க்கப்படும்.

சரத்தின் **பொருள்** மாறியிருந்தால், **விசையின் பெயரை மாற்றுவதை** விரும்புங்கள்: ஒரு புதிய விசையால்
காலாவதியான மொழிபெயர்ப்பை மரபாகப் பெற முடியாது. #8463 பயன்படுத்திய முறை இதுவே.

```bash
npm run i18n:check-value-drift          # கடுமையானது (CI இயக்குவது)
npm run i18n:check-value-drift:warn     # அறிக்கை மட்டும்
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

மதிப்பு-மாற்றம் மற்றும் புதிய-விசை தடுப்புகள்
`scripts/i18n/resolve-ui-diff-base.mjs` இலிருந்து ஒரே மாற்றமுடியாத ஒப்பீட்டைப் பகிர்கின்றன. பணிப்பாய்வு, இரண்டு சரிபார்ப்புகளுக்கும் ஒரே அடிப்படை, அடிப்படை முனை மற்றும்
வேட்பாளர் SHAs-ஐ அனுப்புகிறது. PR/அடிப்படை-மறுஇலக்கிடல், push மற்றும் merge-group இயக்கங்கள் அவற்றின் event
சூழலைப் பயன்படுத்துகின்றன. ஒரு வேட்பாளர் கிளையை dispatch செய்வதற்கு, அதன் துல்லியமான திறந்த PR அல்லது வெளிப்படையான
`i18n_base_sha` உள்ளீடு தேவை. அந்த உள்ளீடு இல்லாமல் `main` அல்லது `release/vX.Y.Z`-ஐ dispatch செய்வது அல்லது திட்டமிட்ட முறையில் கண்காணிப்பது,
கடைசி commit-ஐ அதன் முதல் parent உடன் ஒப்பிடுகிறது; இது மரபாகப் பெறப்பட்ட அனைத்து மொழிபெயர்ப்புக் கடனுக்குமான தணிக்கை அல்ல.
உள்ளூரில் இயக்குவதற்கு வெளிப்படையான ஒப்பீட்டு அடிப்படை தேவை,
எடுத்துக்காட்டாக மேலே உள்ள `BASE_REF` command.

விடுபட்ட அல்லது தெளிவற்ற ஒப்பீட்டுச் சூழல், படிக்க முடியாத அல்லது செல்லாத அவசியமான catalog மற்றும்
மாற்றப்பட்ட வேட்பாளர் ஆகியவை warn mode உட்பட, exit code **2** உடன் `INCOMPLETE` நிலையை உருவாக்குகின்றன.
Catalog வாசிப்புகள் `scripts/i18n/read-ui-catalog.mjs`-ஐப் பயன்படுத்துகின்றன; வாசிப்புத் தோல்விகள்
வெற்றுப் பொருட்களால் மாற்றீடு செய்யப்படுவதில்லை. கிடைக்காத அடிப்படையோ முழுமையற்ற உள்ளீடோ `PASS` நிலையை உறுதிப்படுத்தாது.

### பணி: `i18n`

முழுமையான i18n சரிபார்ப்பு அணி (ஒவ்வொரு மொழியமைவுக்கும் ஒரு பணி). முழுப் பணியும் ஆலோசனை மட்டுமே.

| ஸ்கிரிப்ட்                      | சரிபார்ப்பது                                  | தடுக்கும் தன்மை                                                 |
| ------------------------------- | --------------------------------------------- | --------------------------------------------------------------- |
| `validate_translation.py quick` | ஒவ்வொரு மொழியமைவிற்குமான மொழிபெயர்ப்பு முழுமை | **ஆலோசனை மட்டும்** (முழுப் பணியிலும் `continue-on-error: true`) |

### பணி: `pr-test-policy`

Pull request-களில் மட்டும் இயங்கும்.

| ஸ்கிரிப்ட்             | சரிபார்ப்பது                                                                                                                                                                         | தடுக்கும் தன்மை |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, அல்லது `bin/` ஆகியவற்றிலுள்ள தயாரிப்புக் குறியீட்டை மாற்றும் PR-கள் சோதனைகளைச் சேர்க்கவோ புதுப்பிக்கவோ வேண்டும் (கடுமையான விதி #8)                 | ஆம்             |
| `check:test-masking`   | மாற்றப்பட்ட சோதனைக் கோப்புகள் நிகர assertion எண்ணிக்கையைக் குறைக்கவில்லை அல்லது `assert.ok(true)` போன்ற தன்னைத்தானே உண்மையாக்கும் கூற்றுகளைச் சேர்க்கவில்லை                          | ஆம்             |
| `check:pr-evidence`    | PR உள்ளடக்கம், மாற்றத்திற்கான சோதனை/VPS ஆதாரத்தை மேற்கோள் காட்டுகிறது (PR உரையை grep செய்வதன் மூலம் கடுமையான விதி #18-ஐ இயந்திரமயமாக்குகிறது — உறுதியற்றது, Backlog-ஐப் பார்க்கவும்) | ஆம்             |

### பணி: `test-vitest`

`changes` வகைப்படுத்தல் பணி தேவை. பொருந்தக்கூடிய மேட்ரிக்ஸ் ஷார்டுகள் தோல்வியடைந்தால் ஒன்றிணைப்பைத் தடுக்கும்.

| தொகுப்பு         | சரிபார்ப்பவை                                                                | தடுக்கும் நிலை                                                                                                                              |
| ---------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP சேவையகம் (110 கருவிகள்), autoCombo, தற்காலிகச் சேமிப்பு — vitest இயக்கி | ஆம்                                                                                                                                         |
| `test:vitest:ui` | UI கூறு சோதனைகள் — vitest இயக்கி                                            | **தடுக்கும்** — ஏற்கனவே உள்ள தோல்விகள் `vitest.config.ts`-இல் வெளிப்படையாக விலக்கப்பட்டுள்ளன; புதிய தோல்விகள் பணியைத் தோல்வியடையச் செய்யும் |

### இரவுநேரப் பணிப்பாய்வுகள் (திட்டமிடப்பட்டவை, ஆலோசனைக்குரியவை)

இவை cron அட்டவணைப்படி (மற்றும் `workflow_dispatch` வழியாக) இயங்கும்; PR-களில் ஒருபோதும் இயங்காது. இவை அனைத்தும் ஆலோசனைக்குரியவை.

| பணிப்பாய்வு            | சரிபார்ப்பவை                                                                                                                                                                               | தடுக்கும் நிலை      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| `nightly-property`     | சீரற்ற seed மற்றும் அதிக இயக்க எண்ணிக்கையுடன் கூடிய fast-check பண்பு சோதனைகள்                                                                                                              | **ஆலோசனைக்குரியது** |
| `nightly-resilience`   | heap வளர்ச்சி வாயில், chaos fault-injection, k6 சுமை/நீடித்த சோதனை                                                                                                                         | **ஆலோசனைக்குரியது** |
| `nightly-llm-security` | promptfoo injection பாதுகாப்பு (தடுப்பு முறை) + garak ஆய்வுகள் (வழங்குநர் ரகசியம் இல்லையெனில் தவிர்க்கப்படும்)                                                                             | **ஆலோசனைக்குரியது** |
| `nightly-schemathesis` | `docs/openapi.yaml`-ஐப் பயன்படுத்தி இயங்கும் OmniRoute-க்கு எதிரான OpenAPI ஒப்பந்த fuzzing (schemathesis) — விவரக்குறிப்பு மீறல்கள் / கையாளப்படாத 500 பிழைகளை வெளிக்கொணரும் (கட்டம் 8 B.4) | **ஆலோசனைக்குரியது** |
| `nightly-mutation`     | விரைவான unit lane மீதான Stryker mutation-testing மதிப்பெண் — எஞ்சியிருக்கும் mutants பலவீனமான assertions-ஐ வெளிக்கொணரும்                                                                   | **ஆலோசனைக்குரியது** |
| `nightly-compat`       | ஆதரிக்கப்படும் `engines.node` வரம்புகள் முழுவதுமான Node engine இணக்கத்தன்மை அணி                                                                                                            | **ஆலோசனைக்குரியது** |

செயல்திறன் அடிப்படைகள் (heap, TTFB, build நேரம்) பதிவு செய்யப்படுகின்றன; அவை வாயிலால் கட்டுப்படுத்தப்படுவதில்லை: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`)-ஐப் பார்க்கவும்.

---

## வேகக் கட்டம் (2026-08-30 → v4.0 LTS): ஒவ்வொரு அடிப்படையும் 20% தளர்த்தப்பட்டது

உரிமையாளர் முடிவு (2026-08-30): v4.0 தொகுதியாக்கம் வரை, தொழில்நுட்பக் கடனை வரம்பிற்குள் வைத்திருப்பதைவிட
வெளியீட்டு வேகம் முக்கியமானது. ஒவ்வொரு **எண்ணியல்** ratchet அடிப்படையும் தணிக்கை செய்யக்கூடிய ஒரே
செயல்பாட்டில் 20% தளர்த்தப்பட்டது; மேலும் அந்தக் கட்டம் `config/quality/quality-baseline.json`-இல் அறிவிக்கப்பட்டுள்ளது:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| என்ன மாற்றப்பட்டது                                                                                                                                                                                                                                                         | எங்கே                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — குறைவாக இருப்பது சிறந்தது என்ற எண்ணிக்கைகள் ×1.2, அதிகமாக இருப்பது சிறந்தது என்ற சதவீதங்கள் ÷1.2 (coverage குறைந்தபட்ச வரம்பு 60 ஆகவே வைக்கப்பட்டது, `eslintErrors` 0 ஆகவே உள்ளது, `eslintWarnings` 0 → உறையவைக்கப்பட்ட suppression எண்ணிக்கையின் 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` குறிப்பு ஒவ்வொரு முன்பு → பின்பு மதிப்பையும் பட்டியலிடுகிறது) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                                                           | `complexity-baseline.json`, `duplication-baseline.json`                                                             |
| `cap`, `testCap`, ஒவ்வொரு `frozen[*]` / `testFrozen[*]` வரி வரம்பும் ×1.2                                                                                                                                                                                                  | `file-size-baseline.json`                                                                                           |
| ஒவ்வொரு கோப்பிற்கான / ஒவ்வொரு TS குறியீட்டிற்கான எண்ணிக்கைகள் ×1.2                                                                                                                                                                                                         | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`              |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                                                        | `scripts/check/check-openapi-coverage.mjs`                                                                          |
| `_policy.requireTighten === false` ஆக இருக்கும்போது `--require-tighten` ஆலோசனையாகிறது                                                                                                                                                                                      | `scripts/quality/check-quality-ratchet.mjs`                                                                         |
| இரவுநேர `bank-ratchet-shrinks` இடைநிறுத்தப்படுகிறது (அது அளவிடப்பட்ட சுருக்கத்தைப் பதிவு செய்து, கூடுதல் இடத்தை நீக்கிவிடும்)                                                                                                                                              | `.github/workflows/nightly-release-green.yml`                                                                       |

அனுமதிப் பட்டியல்கள் (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) வரம்புகள் **அல்ல**, எனவே அவை மாற்றப்படவில்லை. தேர்ச்சி/தோல்விக் கொள்கைத் தடைகள் (ரகசியங்கள், SQL விதிகள்,
docs/env ஒப்பந்தம், i18n சமநிலை, அலகுச் சோதனைகள்) மாறவில்லை — தோல்வியடைந்த சோதனை இன்னும் தோல்வியடைந்த சோதனையே.

**கருவிகள்**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — ஒருமுறை மட்டும் செய்யப்படும்
  தளர்த்தல் (`scripts/quality/relax-baselines.mjs`); அதே குறிப்புடன் இரண்டாவது முறை இயங்க மறுக்கும்.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  CI அளவிடுவதைப் போலவே ஒவ்வொரு எண்ணியல் தடையையும் அளவிட்டு, ஒவ்வொரு தடையிலும் மீதமுள்ள கூடுதல் இடத்தை
  அச்சிடுகிறது (`scripts/quality/baseline-headroom.mjs`). இரவுநேர `baseline-headroom` பணி,
  workflow இயக்கச் சுருக்கத்தில் அட்டவணையை வெளியிட்டு, அதன் JSON/Markdown அறிக்கையை
  `baseline-headroom-<run_id>` என்ற பெயரில் பதிவேற்றுகிறது; அது 90 நாட்களுக்குத் தக்கவைக்கப்படும். எச்சரிக்கை மற்றும்
  தீவிர வரிசைகள், தங்களின் வரம்பிலிருந்து 10%-க்குள் உள்ள அல்லது ஏற்கெனவே அதை மீறிய தடைகளை அடையாளப்படுத்துகின்றன.
  வரம்புகள் பயன்படுத்தப்பட்டு வருவதற்கான முன்னெச்சரிக்கையாக இந்த அறிக்கைகளை மதிப்பாய்வு செய்யவும்; சிக்கலுக்குரிய
  தடையின் `_rebaseline_*` குறிப்புகளை ஆராயவும். இந்தப் பணி இனி நிரந்தர issue ஒன்றை உருவாக்கவோ புதுப்பிக்கவோ
  செய்யாது; முந்தைய அறிக்கை வரலாற்றை #12149 பாதுகாக்கிறது.

**புதிய-குறியீட்டு முறை (Clean-as-You-Code) — 2026-08-30 முதல், PR விரைவுப் பாதைக்கு மட்டும்**

`pull_request` நிகழ்வுகளில், `quality.yml` ஆனது `--base-ref <PR base SHA>` என்பதை `check:file-size`,
`check:complexity-ratchets` மற்றும் `check:dead-code` ஆகியவற்றுக்கு அனுப்புகிறது. `check:complexity-ratchets` மற்றும்
`check:dead-code` ஆகியவற்றுக்கு, தடை HEAD-ஐ merge-base உடன் ஒப்பிடுகிறது; இந்த ஒப்பீடு **PR மாற்றிய கோப்புகளுக்கு
மட்டுமே** வரையறுக்கப்படுகிறது (`scripts/check/newCodeMode.mjs`: merge-base ஒரு தற்காலிக
`git worktree`-இல் உருவாக்கப்படுகிறது; ESLint/knip அங்கேயும் HEAD-இலும் இயக்கப்பட்டு, ஒவ்வொரு கோப்பிற்குமான
எண்ணிக்கைகளின் வேறுபாடு கணக்கிடப்படுகிறது):

- **தடுக்கும்** — PR மாற்றிய கோப்புகளில் cyclomatic/cognitive மீறல்கள் அல்லது dead exports சேர்க்கப்பட்டுள்ளன
  (பதிவில் `complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=`);
- **ஆலோசனை** — ஒட்டுமொத்த மொத்த மதிப்பு மற்றும் உறையவைக்கப்பட்ட அடிப்படை மதிப்புக்கு இடையிலான ஒப்பீடு. மரபுரிமையாக வந்த விலகல்
  குற்றமற்ற PR-ஐ ஒருபோதும் சிவப்பு நிலைக்குக் கொண்டுசெல்லாது; அந்த விலகல், வெளியீட்டு ஒத்திசைவின்போது சரிசெய்வதற்காகக் கண்காணிக்கப்பட்டு,
  headroom பணியால் மேற்பார்வையிடப்படுகிறது.

`check:file-size` அதன் சொந்த விதிகளின்படி base ref-ஐப் பயன்படுத்துகிறது (`scripts/check/check-file-size.mjs`, #8522):
அது tree-இல் உள்ள ஒவ்வொரு source மற்றும் test கோப்பையும் சரிபார்த்து, PR base-இல் ஒவ்வொன்றின் வரி எண்ணிக்கையையும்
`git show` மூலம் வாசிக்கிறது; பின்னர் அந்தக் கோப்பு அதன் அடிப்படை உச்சவரம்பு
(`frozen` / `testFrozen`, அல்லது அடிப்படைக்கு வெளியேயுள்ள கோப்பிற்கு `cap` / `testCap`) மற்றும் அதன் base அளவு
ஆகியவற்றில் பெரியதைத் தாண்டி வளர்ந்தால் மட்டுமே தோல்வியடையச் செய்கிறது. எனவே base-இல் ஏற்கெனவே விலகியுள்ள ஒரு கோப்பு,
குற்றமற்ற PR-ஐ ஒருபோதும் தோல்வியடையச் செய்யாது.

`check:boundary:ratchet` அதன் ஒற்றை எண்ணுக்கும் அதே விதியைப் பயன்படுத்துகிறது
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR நிகழ்வுகளில்
`quality.yml` fast-gates மற்றும் `ci.yml` lint job ஆகிய இரண்டும் PR base SHA-ஐ அனுப்புகின்றன; base commit
ஒரு `git archive` export-இலிருந்து அளவிடப்படுகிறது; மேலும் PR-இன் `open-sse → src` edge
எண்ணிக்கை, `metrics.boundaryOpenSseToSrc` மற்றும் base-இல் உள்ள எண்ணிக்கை ஆகியவற்றில் பெரியதை மீறும்போது மட்டுமே PR தோல்வியடைகிறது. உச்சவரம்புக்கு
மேலான base drift புகாரளிக்கப்படுகிறது (`base drift herdado`), ஆனால் குற்றமற்ற PR-ஐ ஒருபோதும் தோல்வியடையச் செய்யாது; push → main
முழுமையான உச்சவரம்பைத் தொடர்ந்து பயன்படுத்துகிறது; மேலும் தீர்மானிக்க முடியாத base SHA, எச்சரிக்கையுடன் அதற்கே fallback செய்கிறது.

`workflow_dispatch` இயக்கங்கள், release-green sweep மற்றும் nightly headroom job ஆகியவற்றுக்கு PR base
இல்லாததால், அவை முழுமையான (global) ஒப்பீட்டையே தொடர்ந்து பயன்படுத்துகின்றன. Coverage, duplication மற்றும் type-coverage ஆகியவை இப்போதைக்கு global ஆகவே
உள்ளன (அவற்றின் கருவிகள் per-file diff-ஐ குறைந்த செலவில் உருவாக்குவதில்லை) — இதே அணுகுமுறைக்கான சாத்தியமான வேட்பாளர்கள்.

**v4.0-இல் கட்டத்தை முடித்தல் (LTS = முன்பைவிட இறுக்கமானது, "back to normal" அல்ல)**

1. தூய `release/v4.0.0` tip-இல்: பதிவுக்காக `npm run quality:headroom --json`, பின்னர்
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, ஒவ்வொரு typecheck gate-இன்
   `--update` — ஒவ்வொரு baseline-மும் அளவிடப்பட்ட மதிப்புக்குக் குறைகிறது.
2. `quality-baseline.json`-இலிருந்து `_policy`-ஐ நீக்கவும் (`--require-tighten` மற்றும் nightly
   banking-ஐ மீண்டும் செயல்படுத்துகிறது), `check-openapi-coverage.mjs`-இல் `THRESHOLD = 36` (அல்லது அதற்கு மேல்) என்பதை மீட்டமைக்கவும்.
3. modularization பலனளித்த இடங்களில் அளவிடப்பட்ட மதிப்பைத் தாண்டி இறுக்கவும்: file-size `cap`-ஐ மீண்டும் 1000
   (அல்லது 800) ஆகவும், coverage floors-ஐ +5 ஆகவும், modularized packages-க்கான dead exports-ஐ 0 ஆகவும் அமைக்கவும்.

## ராட்செட் அடிப்படை (`quality-baseline.json`)

ராட்செட் இயந்திரம் (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json`-ஐப் படித்து,
புதிதாகச் சேகரிக்கப்பட்ட `quality-metrics.json` உடன் ஒப்பிடுகிறது. அதன் எப்சிலான் வரம்பைத் தாண்டிப்
பின்னடையும் எந்த அளவீடும் பில்டைத் தோல்வியடையச் செய்யும்.

தற்போது கண்காணிக்கப்படும் அளவீடுகள்:

| அளவீடு                | திசை   | பொருள்                                              |
| --------------------- | ------ | --------------------------------------------------- |
| `eslintWarnings`      | `down` | ESLint எச்சரிக்கைகளின் எண்ணிக்கை அதிகரிக்கக் கூடாது |
| `coverage.statements` | `up`   | ஸ்டேட்மென்ட் கவரேஜ் குறையக் கூடாது                  |
| `coverage.lines`      | `up`   | வரி கவரேஜ் குறையக் கூடாது                           |
| `coverage.functions`  | `up`   | செயல்பாடு கவரேஜ் குறையக் கூடாது                     |
| `coverage.branches`   | `up`   | கிளை கவரேஜ் குறையக் கூடாது                          |

உண்மையான மேம்பாட்டிற்குப் பிறகு அடிப்படையைப் புதுப்பிக்க:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` கொடி தற்போது அளவிடப்பட்ட மதிப்புகளை `quality-baseline.json`-இல் எழுதுகிறது.
அளவீட்டை மேம்படுத்திய மாற்றத்துடன் இந்தக் கோப்பையும் கமிட் செய்யவும். அடிப்படையைப் புதுப்பிக்காமல்
ஒரு அளவீட்டை மேம்படுத்தும் PR, `--require-tighten` மூலம் கண்டறியப்படும் (கட்டம் 6A.5,
செயல்படுத்தல் நிலுவையில் உள்ளது).

### CodeQL ராட்செட்: புதுப்பிப்பு இடைவெளி மற்றும் கைமுறைத் தூண்டல்

`check:codeql-ratchet`, **ஒவ்வொரு PR-க்கும் அல்லாமல், அட்டவணைப்படி புதுப்பிக்கப்படும் ரெப்போ நிலையையே**
படிக்கிறது. `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup`,
`state: configured`, `schedule: weekly` எனத் தெரிவிக்கிறது: இது GitHub-இன் இயல்புநிலை அமைப்பு ஸ்கேன்,
ஒவ்வொரு push-க்கும் செய்யப்படும் பகுப்பாய்வு அல்ல. விளைவு: விழிப்பூட்டல்களைச் சரிசெய்யும் PR மெர்ஜ் செய்யப்பட்ட பிறகு,
அடுத்த திட்டமிடப்பட்ட ஸ்கேன் இயங்கும் வரை ராட்செட் பழைய, அதிகமான எண்ணிக்கையையே தொடர்ந்து படிக்கும் — எனவே ஸ்கேன்
புதுப்பிக்கப்படும் வரை, சரிசெய்த PR-இன் சொந்த தொடர்ச்சிப் PR-கள் உட்பட, திறந்திருக்கும் ஒவ்வொரு PR-இலும் இது பின்னடைவைத் தெரிவிக்கும்.

**கைமுறைப் புதுப்பிப்பு**: `gh workflow run codeql.yml --ref release/vX.Y.Z` பகுப்பாய்வை மீண்டும்
இயக்கி, சில நிமிடங்களுக்குள் விழிப்பூட்டல்களை மீண்டும் வெளியிடுகிறது. முதலில் `.github/workflows/codeql.yml`-ஐப்
படிக்கவும் — GitHub-இன் "இயல்புநிலை அமைப்புடன்" முரண்படுவதன் காரணமாகவே அது `workflow_dispatch`-க்கு மட்டுமே
உரியது என்பதை அதன் தலைப்பு விளக்குகிறது (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). `push`/`pull_request`/
`schedule` தூண்டல்களை மீட்டமைப்பதற்கு முதலில் **உரிமையாளரின் நடவடிக்கை** தேவை: Settings → Code security →
CodeQL: Default → Advanced. அந்த மாற்றத்தைச் செய்யாமல் `schedule:` தூண்டலைச் சேர்க்க வேண்டாம் — அது
தோல்வியடையும் ரன்களை மட்டுமே உருவாக்கும்.

**எண்ணிக்கை குறைந்த பிறகு அடிப்படையை இறுக்கவும்** — `node scripts/check/check-codeql-ratchet.mjs
--update`, புதிதாக அளவிடப்பட்ட எண்ணிக்கையை `quality-baseline.json` →
`metrics.codeqlAlerts.value`-இல் எழுதுகிறது; எனவே பழைய உச்சவரம்பு வரை மீண்டும் ஏற்படும் பின்னடைவை ராட்செட்
மறைமுகமாக அனுமதிக்காது. செயல்முறை எடுத்துக்காட்டு (2026-09-02/03): PR #12502, 7 உண்மையான விழிப்பூட்டல்களைச்
சரிசெய்தது (அளவிடப்பட்ட திறந்த விழிப்பூட்டல்கள் 13 → 6); PR #12530, பொருந்தும் வகையில் உறையவைக்கப்பட்ட அடிப்படையை
11 → 6 என இறுக்கியது; பின்னர் மீதமிருந்த 6 விழிப்பூட்டல்களும் ஒவ்வொன்றிற்குமான நியாயவிளக்கத்துடன் நிராகரிக்கப்பட்டு,
திறந்த விழிப்பூட்டல்களின் எண்ணிக்கை 0 ஆகக் குறைக்கப்பட்டது.

**நிராகரிப்புகள் ஆபரேட்டரின் முடிவு (கடுமையான விதி #14)** — நிராகரிப்புக் கருத்தில் தொழில்நுட்ப
நியாயவிளக்கத்தைப் பதிவு செய்யாமல் ஒருபோதும் CodeQL விழிப்பூட்டலை நிராகரிக்க வேண்டாம்: அப்ஸ்ட்ரீம் நெறிமுறைத்
தேவைக்கு `won't fix`, சோதனை ஃபிக்சருக்கு `used in tests`, CodeQL-ஆல் கண்டறிய முடியாத சுத்திகரிப்பானுக்கு
`false positive` (முன்னுதாரணம்: `docs/security/ERROR_SANITIZATION.md`).

---

## சோதனை மறுமுயற்சிக் கொள்கை (WS5.4, v3.8.49)

மறுமுயற்சி ஒவ்வொரு runner-க்கும் தனிப்பட்டது; ஒருபோதும் ஒட்டுமொத்தமாகப் பயன்படுத்தப்படாது — ஒட்டுமொத்த மறுமுயற்சி உண்மையான பின்னடைவுகளைப் புலப்படாத நிலையற்ற தோல்விகளாக மாற்றிவிடும்:

| Runner           | கொள்கை                                                                                                                                                                               | காரணம்                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | CI-இல் மட்டும் `retries: 1`, மேலும் `trace: on-first-retry`                                                                                                                          | உலாவி/பிணைய நேர அமைவு உண்மையிலேயே நிர்ணயமற்றது; trace உடன் கூடிய ஒரு மறுமுயற்சி, நிலையற்ற தோல்வியை ஆராய்ந்து கண்டறியக்கூடிய artifact-ஆக மாற்றுகிறது |
| Vitest           | ஒட்டுமொத்த மறுமுயற்சி இல்லை. நிலையற்றது என நிரூபிக்கப்பட்ட சோதனைக்கு வெளிப்படையான, ஒவ்வொரு சோதனைக்குமான மறுமுயற்சி வழங்கப்படும் (diff-இல் தெரியும், PR-இல் மதிப்பாய்வு செய்யப்படும்) | தனிமைப்படுத்தப்பட்ட சோதனைகளின் பட்டியலை repo-இல் வெளிப்படையாக வைத்திருக்கிறது                                                                       |
| node:test (unit) | ஒருபோதும் மறுமுயற்சி இல்லை                                                                                                                                                           | நிலையற்ற unit test என்பது சோதனையிலுள்ள பிழை — அதைச் சரிசெய்யுங்கள்; மீண்டும் இயக்கி வெற்றியை எதிர்பார்க்காதீர்கள்                                   |

நிலையற்ற தோல்விகளுக்கான telemetry கிடைத்ததும் இலக்கு SLO-கள் (WS5.2/5.3): ஒவ்வொரு சோதனைக்கும் <1% நிலையற்ற தோல்வி விகிதம்
("உடனே சரிசெய்" வரம்பு), ஒவ்வொரு pipeline-க்கும் ≥95% வெற்றி விகிதம். இவை தொழில்துறை மேற்கோள் மதிப்புகள் —
நமது சொந்த அளவீடுகளுக்கு ஏற்ப மறுஅளவீடு செய்ய வேண்டும்.

## Release-நிலை Ratchet விலகல் (WS5.5, v3.8.49)

ஒரு ratchet (கோப்பு அளவு, சிக்கல்தன்மை, eslint எச்சரிக்கைகள்) தூய release
tip-இல் பின்னடைந்தால் — அதாவது merge-களின் சேர்க்கை அதைப் பின்னடையச் செய்திருந்தாலும், எந்த ஒரு PR-உம் அதன்
சொந்த branch-இல் தனியாக அந்தப் பின்னடைவை மறுஉருவாக்கவில்லை என்றால் — சரிசெய்வது **release captain-இன் பொறுப்பு; ஒருமுறை, release
branch-இல்**: extraction/refactor-ஐ விரும்புங்கள்; ஆவணப்படுத்தப்பட்ட நியாயப்படுத்தல் பதிவு இருந்தால் மட்டுமே baseline-ஐப் புதுப்பியுங்கள்.
சேர்க்கையால் ஏற்பட்ட விலகலை ஒருபோதும் contributor PR மீது திணிக்காதீர்கள்; ஒவ்வொரு PR-க்கும் தனித்தனியாக
baseline-ஐப் புதுப்பிக்காதீர்கள் (அது உண்மையான பின்னடைவுகளை மறைக்கும்). முதலில் வேறுபடுத்திக் கண்டறியுங்கள்: உங்கள் PR அதற்குக் காரணம் எனக் கருதுவதற்கு முன்,
probe worktree ஒன்றில் தூய tip-க்கு எதிராகத் தோல்வியை மறுஉருவாக்குங்கள்.

## Ratchet குறைப்புகளை வங்கிப்படுத்துதல் — கீழ்நோக்கிய திசை (#8584)

Ratchet பாதி மட்டுமே தானியங்கியாக உள்ளது; அதுவும் தவறான பாதி. ஒரு cap-ஐ **உயர்த்துவது** பத்து விநாடிகள் எடுக்கும்
கைமுறை JSON திருத்தம்; தோல்வியடைந்த PR ஒன்றைத் தடையிலிருந்து விடுவிப்பதற்கான மிக விரைவான வழியும் அதுதான்.
ஒரு cap-ஐ **குறைப்பதற்கு**, யாராவது `--update`-ஐ இயக்கி முடிவை commit செய்ய வேண்டும் — மேலும்
`bank-ratchet-shrinks` job அறிமுகமாகும் வரை, எந்த workflow-வும் அதை இயக்கவில்லை. அளவிடப்பட்ட விளைவு
(2026-07-25): 800 வரிகள் என்ற புதிய-கோப்பு cap-க்கு உட்பட்டோ அல்லது அதற்குச் சமமாகவோ ஏற்கனவே உள்ள 18 frozen கோப்புகள்; மிக மோசமானது
132× (`src/shared/validation/schemas.ts`, 2,523 cap-ஐத் தாங்கும் 19 வரிகள்); சிக்கல்தன்மை உச்சவரம்பு ஏறத்தாழ 37 rebaseline குறிப்புகளின் வழியாக
`1794 → 2169` என உயர்ந்தது, அதில் சரியாக ஒரே ஒரு குறைவு மட்டுமே இருந்தது (−1); மேலும் "அடுத்த சுழற்சியில் `--update` வழியாக இறுக்கு" என்று
31 முறை எழுதப்பட்டு, ஒரே ஒரு முறை மட்டுமே நிறைவேற்றப்பட்டது. அதைப் பெற்றுத்தந்த code-ஐ விட நீண்ட காலம் நீடிக்கும் ஒரு cap,
நிறைவடைந்த ஒவ்வொரு decomposition-ஐயும் அடுத்ததாக அந்தக் கோப்பைத் திருத்துபவருக்கான வளர்ச்சி அனுமதியாக அமைதியாக மாற்றுகிறது.

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** அந்தச் சுழற்சியை நிறைவு செய்கிறது:

|              |                                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| இயங்குவது    | `schedule` (ஒரு நாளுக்கு 3×) + `workflow_dispatch` — திட்டமிட்டே `push` அல்ல                                                         |
| அளவிடுவது    | மிக உயர்ந்த `release/vX.Y.Z`; `release-green` பயன்படுத்தும் அதே resolution + injection guard                                         |
| எழுதுவது     | `check:file-size --update` மற்றும் `check:complexity-ratchets --update` (இரண்டும் வடிவமைப்பிலேயே குறைக்க மட்டும் அனுமதிப்பவை)        |
| சரிபார்ப்பது | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                                             |
| வழங்குவது    | release branch-க்கு எதிராக எப்போதும் தற்போதைய நிலையில் இருக்கும் ஒரே ஒரு PR — force-update செய்யப்படும்; ஒருபோதும் spam செய்யப்படாது |

ஒவ்வொரு push-க்கும் பதிலாக banking தொகுதியாகச் செய்யப்படுகிறது; ஏனெனில் அதற்கு latency தேவை இல்லை (8 மணிநேரத்திற்குள்
bank செய்யப்படும் குறைப்பு போதுமானது), ஆனால் ஒவ்வொரு merge-க்கும் இயக்குவது merge campaign-களின்போது PR branch-ஐ மீண்டும் மீண்டும்
உருவாக்குவதோடு, ஒவ்வொரு முறையும் முழுமையான ESLint ஆய்வுக்கான செலவையும் ஏற்படுத்தும். கண்டறிதல் தொடர்ந்து
push-இல் (`release-green`) நடைபெறும்; banking மட்டும் தொகுதியாகச் செய்யப்படுகிறது.

### பாதுகாப்புச் சரிபார்ப்பான்

இந்த job மனிதக் கண்காணிப்பின்றி baseline-களில் எழுதுகிறது; எனவே அதை ஏற்றுக்கொள்ளத்தக்கதாக ஆக்குவது `verify-ratchet-bank.mjs` ஆகும்.
இது `--update`-க்குப் பிந்தைய tree-ஐ `HEAD` உடன் diff செய்து, ஒவ்வொரு மாற்றமும் கீழ்க்கண்டவற்றில் ஒன்றாக இல்லாவிட்டால்,
**எந்த commit-உம் உருவாகும் முன்பே job-ஐ நிறுத்திவிடும்** — எந்த PR-உம் திறக்கப்படாது:

- ஒரு `frozen` / `testFrozen` எண் பதிவு **குறைக்கப்பட்டது** அல்லது **அகற்றப்பட்டது**
- `complexity-baseline.json` → `count` **குறைக்கப்பட்டது**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **குறைக்கப்பட்டது**

வேறு எதுவும் தோல்வியடையும்: எண்ணை உயர்த்துவது, பதிவைச் சேர்ப்பது, `cap`/`testCap`-ஐ மாற்றுவது, அல்லது
`_rebaseline_*` குறிப்பை நீக்குவது/மீண்டும் எழுதுவது (ஒவ்வொரு உச்சவரம்பும் ஏன் உள்ளது என்பதற்கான audit trail அந்தக் குறிப்புகளாகும்;
அவை கோப்புப் பதிவுகள் இருக்கும் அதே `frozen` object-இன் உள்ளே சேமிக்கப்படுகின்றன).
ஒரு cap-ஐ உயர்த்தக்கூடிய bot தற்போதைய நிலையைவிட முற்றிலும் மோசமானதாக இருக்கும். பின்னடைவு
guard: `tests/unit/verify-ratchet-bank.test.ts`.

இந்த job ஒருபோதும் `release/*`-க்கு push செய்யாது — ஒரு மனிதர் PR-ஐ merge செய்வார்; எனவே தவறான அளவீடு
மதிப்பாய்வு இல்லாமல் சேர்க்கப்பட முடியாது.

## அனுமதிப்பட்டியல் கொள்கை

முன்பே இருக்கும் மீறல்களால் தோல்வியடையக் கூடாத ஒவ்வொரு வாயிலும் உறையவைக்கப்பட்ட அனுமதிப்பட்டியலைப் பயன்படுத்துகிறது
(எ.கா., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). கொள்கை:

**மூலக் காரணத்தைச் சரிசெய்யவும்; மீறல் முன்பே இருந்தால் மற்றும் அதே PR-இல் அதைச்
சரிசெய்ய முடியாவிட்டால் மட்டுமே அனுமதிப்பட்டியலைப் பயன்படுத்தவும்.**

அனுமதிப்பட்டியலில் ஓர் உள்ளீட்டைச் சேர்க்கும்போது:

1. அதற்கான நியாயப்படுத்தலுடன் ஒரு கருத்துரையைச் சேர்க்கவும்.
2. கண்காணிப்புச் சிக்கலைக் குறிப்பிடவும் (எ.கா., `// #3498 — Phase 2 feature, not yet implemented`).
3. மீறலைச் சரிசெய்யும் அதே PR-இல் உள்ளீட்டை அகற்றவும் — செயலில் உள்ள மீறலை இனி
   ஒடுக்காத காலாவதியான உள்ளீடு தானே ஒரு குறைபாடாகும் (6A.3 காலாவதியான-அமலாக்கம்
   செயல்படுத்தப்பட்டதும், ஆதரவற்ற அனுமதிப்பட்டியல் உள்ளீடு வாயிலைத் தோல்வியடையச் செய்யும்).

சோதனைகள் விரைவாகத் தேர்ச்சி பெறுவதற்காக அனுமதிப்பட்டியல் உள்ளீடுகளைச் சேர்க்க **வேண்டாம்**. தொடர்ந்து
வளரும் அனுமதிப்பட்டியலுடன் கூடிய பச்சை வாயில், தரம் குறித்த தவறான நம்பிக்கையை அளிக்கிறது.

### உங்கள் PR-இல் ஒரு வாயில் தோல்வியடையும்போது

1. **வாயிலின் வெளியீட்டைக் கவனமாகப் படிக்கவும்** — எந்தக் கோப்பு அல்லது குறியீடு விதியை
   மீறியது என்பதை அது துல்லியமாகக் கூறும்.
2. **மீறலைச் சரிசெய்யவும்** — பெரும்பாலான வாயில்கள் தீர்மானகரமான கோப்பு முறைமைச் சோதனைகள்; குறியீடு
   சரியானவுடன் அவை தேர்ச்சி பெறும்.
3. **மீறல் முன்பே இருந்தால்** (அதாவது, அதை நீங்கள் அறிமுகப்படுத்தவில்லை; ஆனால் வாயில் இப்போது
   அதை உள்ளடக்குகிறது): நியாயப்படுத்தும் கருத்துரை மற்றும் கண்காணிப்புச் சிக்கலுடன் ஓர் அனுமதிப்பட்டியல் உள்ளீட்டைச் சேர்க்கவும்.
4. **வாயில் ஒரு ராட்செட் என்றால்** (கவரேஜ், ESLint எச்சரிக்கைகள், நகலாக்கம், சிக்கல்தன்மை):
   உங்கள் மாற்றம் அளவீட்டை மோசமாக்கியுள்ளது. அடிப்படைச் சிக்கலைச் சரிசெய்யவும் அல்லது (அரிதாக) மாற்றம்
   வேண்டுமென்றே செய்யப்பட்டு, அளவீட்டுச் சரிவு ஏற்கத்தக்கதாக இருந்தால் `npm run quality:ratchet -- --update`
   என்பதை இயக்கவும் — ஆனால் அதற்கான காரணத்தை PR விளக்கத்தில் ஆவணப்படுத்தவும்.
5. **ஆலோசனை வாயில்கள்** (`continue-on-error: true`) தகவலுக்காக மட்டுமே — அவை ஒன்றிணைப்பைத்
   தடுக்காது; ஆனால் CI சுருக்கத்தில் தோன்றும். இருப்பினும் அவற்றைச் சரிசெய்யவும்.

---

## புதிய வாயிலைச் சேர்த்தல்

1. `scripts/check/check-<name>.mjs` (அல்லது `.ts`) உருவாக்கவும். கொள்கை வாயில்கள் 0/1 வெளியேறும் குறியீட்டுடன் முடிவடையும்.
   Ratchet-பாணி வாயில்கள் `collect-metrics.mjs` வழியாக `quality-metrics.json`-க்கு ஓர் அளவீட்டை வெளியிடும்.
2. `package.json`-இல் `"check:<name>": "node scripts/check/check-<name>.mjs"` என்பதைச் சேர்த்து,
   அதன் மாற்றுப்பெயரையும் அதற்கான துல்லியமான கட்டளையையும் `config/quality/gate-manifest.json`-இல் ஒத்திசைக்கவும்.
   ஏற்கனவே உள்ள சரிபார்ப்பு மாற்றுப்பெயரை மாற்றும்போதோ அகற்றும்போதோ இதே ஒத்திசைவைப் பயன்படுத்தவும்.
   `npm run check:gate-manifest`-ஐ இயக்கவும்; pre-commit hook மற்றும் CI மாற்ற வகைப்பாடு
   இந்த ஒப்பந்தத்தை அமல்படுத்துகின்றன.
3. பொருத்தமான பணியின் கீழ் `.github/workflows/ci.yml`-இல் அதை இணைக்கவும்
   (கொள்கை → `lint` அல்லது `docs-sync-strict`; ratchet → `quality-gate`).
4. அதற்கு அனுமதிப்பட்டியல் இருந்தால், காலாவதியான உள்ளீடுகள் தானாகக் கண்டறியப்படுவதற்காக
   `scripts/check/lib/allowlist.mjs`-இலிருந்து `reportStaleEntries()`-ஐப் பயன்படுத்தவும்.
5. வாயிலின் கண்டறிதல் தர்க்கத்தை உள்ளடக்கும் சோதனையை `tests/unit/build/`-இல் எழுதவும்.
6. இந்த ஆவணத்தைப் புதுப்பிக்கவும் (தொடர்புடைய பணியின் அட்டவணையில் ஒரு வரியைச் சேர்க்கவும்).

---

## முகவர் கருவியமைப்பு: சுழற்சிக்குள் LSP (விருப்பத் தேர்வு)

CI வாயில்களுக்கு அப்பால், OmniRoute ஒரு **விருப்பத் தேர்வான** `agent-lsp` அடித்தளத்தை
(திட்ட-நிலை `.mcp.json`, Fase 7 Task 15) வழங்குகிறது. குறியீட்டு முகவர்களுக்கு ஒரு TypeScript மொழிச் சேவையகத்தை வெளிப்படுத்த
`.mcp.json`-ஐ உருவாக்கவும்; இதனால் அவர்கள் குறியீட்டை எழுதுவதற்கு **முன்பே** குறியீடுகள் /
கண்டறிதல்களைத் தீர்மானிப்பார்கள் — மூலத்திலேயே "கற்பனையான குறியீடு" பிழைகளைக் குறைக்கும்
`typecheck:core`-க்கான compile-before-claim துணை இது. இது வேண்டுமென்றே
தானாக ஏற்றப்படுவதில்லை (MCP↔LSP பாலத்தை நீங்கள் தேர்ந்தெடுத்துச் சரிபார்க்க வேண்டும்); பழுதான உள்ளீடு ஓர்
இணைப்புப் பிழையை மட்டுமே பதிவு செய்யும், அமர்வுகளை ஒருபோதும் பாதிக்காது.

---

## பகுத்தறிவாக்கப் பின்னடைவு (ROI மதிப்பாய்வு — கட்டம் 9 அலை 3)

இந்தப் பட்டியல் 2026-06-17 அன்று `ci.yml` உடன் ஒப்பிட்டுச் சரிசெய்யப்பட்டது (முந்தைய பதிப்பில்
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` ஆகியவை விடுபட்டிருந்தன). சரிசெய்யப்பட்ட தொகுப்பின் ROI மதிப்பாய்வு
பின்வரும் பகுத்தறிவாக்கத் தேர்வுகளை அடையாளம் கண்டது. **இணைப்புகள் இயந்திரரீதியான CI
மாற்றங்கள்; நிலைமாற்றங்கள்/நீக்கங்கள் இயக்குநருக்காக ஒதுக்கப்பட்ட கொள்கை முடிவுகள்.** கீழே உள்ள எதுவும்
இன்னும் செயல்படுத்தப்படவில்லை.

**மேலே ஆவணப்படுத்தப்படாதவையும் உள்ளன** (ஆலோசனை மட்டுமே, குறைந்த சமிக்ஞை): `docs-lint` பணி
(markdownlint + Vale, முழுப் பணிக்கும் `continue-on-error`) மற்றும் தனித்தியங்கும் ஸ்கேனர் பணிப்பாய்வுகளான
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` என்பது
`quality-baseline.json`-இல் உள்ளது; ஆனால் `ci.yml`-இல் தடைசெய்யும் ராட்செட்டுடன் இணைக்கப்படவில்லை — இந்த அளவீடு
தற்போது தனிமைப்படுத்தப்பட்டுள்ளது.

### இணைத்தல் / நகல்நீக்கம் (இயந்திரரீதியானது, குறைந்த ஆபத்து)

ஒவ்வொரு தேர்வும் 2026-06-17 அன்று நடைமுறையிலிருந்த கேட் நிலைக்கு எதிராகச் சரிபார்க்கப்பட்டது (நம்புங்கள், ஆனால் சரிபாருங்கள்);
“வெளிப்படையானவை” எனத் தோன்றிய பல இணைப்புகள் தொழில்நுட்பக் கடனை மறைத்திருப்பது தெரியவந்தது; எனவே அவை **சிக்கலற்ற** நேரடி மாற்றீடுகள் அல்ல.

- **`check:docs-sync` இருமுறை இயங்குகிறது** — `lint` பணியில் தனியாகவும், `check:docs-all` (`docs-sync-strict`) உள்ளேயும், husky முன்-கமிட் ஹுக்கிலும் இயங்குகிறது. ✅ **முடிந்தது** — தனியான `lint` இயக்கம் அகற்றப்பட்டது.
- **CVE ஸ்கேனிங்** — ❌ **சிக்கலற்ற இணைப்பு அல்ல.** `audit:deps` ஐந்து lockfile-களிலும் உள்ள தீவிர ஆலோசனைகள் மற்றும் முழுமையற்ற தணிக்கைகளைத் தடுக்கிறது; தற்போதைய கொள்கையின் கீழ் உயர்-தீவிர ஆலோசனைகளை எச்சரிக்கைகளாகத் தெரிவிக்கிறது. ஆனால் `check:vuln-ratchet` (osv), செக்-இன் செய்யப்பட்ட அடிப்படையுடன் ஒப்பிடுகையில் ஒரு _பின்னடைவு_ ஏற்பட்டால் மட்டுமே தோல்வியடைகிறது; தேவைப்படும் போது அளவீடுகள் இல்லாவிட்டால் அவற்றை நிராகரிக்கிறது. இவற்றின் பொருளியல் வெவ்வேறானது — `audit:deps`-ஐ நீக்குவது முழுமையான தீவிர கேட் மற்றும் தனித்தனி தொகுப்புத் தணிக்கைச் சான்றுகளை இழக்கச் செய்யும். இரண்டையும் வைத்திருக்கவும்.
- **சுழற்சி கண்டறிதல்** — ✅ **முடிந்தது** (#15159 G-01/G-02). இங்கிருந்த பழைய உரை `check:cycles`-ஐ “பச்சை நிலையில் உள்ள, தேர்ந்தெடுத்தமைக்கப்பட்ட” கேட் எனக் குறிப்பிட்டு, `check:circular-deps` (dpdm) 91 சுழற்சிகளை அறிவித்ததால் அதைத் தடுப்புக் கேட்டாக வைத்திருப்பதை நியாயப்படுத்தியது. அந்தப் பச்சை நிலை ஒரு **தவறான பச்சை நிலை**: `check:cycles` 5 துணைக் கோப்பகங்களை (450 கோப்புகள்) ஸ்கேன் செய்தது; நிலையான `import|export … from` உடன் மட்டுமே பொருத்தியது; மேலும் ஒவ்வொரு `@/` மற்றும் `@omniroute/open-sse/` குறிப்பானையும் கைவிட்டது. எனவே ரெப்போவில் ஆதிக்கம் செலுத்திய dynamic-import + alias சுழற்சிகளை அதனால் காண முடியவில்லை. இது சரிசெய்யப்பட்டது: கேட் இப்போது `src` + `open-sse` முழுவதையும் (5023 கோப்புகள்) கடந்து செல்கிறது; TypeScript AST-இலிருந்து குறிப்பான்களைச் சேகரிக்கிறது (எனவே `import("…")` கணக்கிடப்படும்; type-position `typeof import("…")` கணக்கிடப்படாது); மேலும் tsconfig `paths`-ஐத் தீர்க்கிறது. இது 0 அல்ல, **14** சுழற்சிகளைக் கண்டறிகிறது. முன்பே இருந்த 14 சுழற்சிகளை ஒரு கேட் PR-இல் சரிசெய்ய முடியாது என்பதால், `check:cycles` இப்போது ஒரு **ராட்செட்** (`--ratchet`, `quality-baseline.json`-இல் உச்சவரம்பு `metrics.cycles.value = 14`, `direction: down`) — இது எந்தவொரு _பின்னடைவையும்_ தடுக்கிறது; எண்ணிக்கை குறைய மட்டுமே முடியும். CI `npm run check:cycles:ratchet`-ஐ இயக்குகிறது. படிப்படியான குறைப்பு **A-01** உடன் தொடரும். பரந்த இரண்டாவது கருத்தாக `check:circular-deps` (dpdm) ஆலோசனை நிலையில் தொடர்கிறது.
- **சிக்கல்தன்மை** — ✅ **முடிந்தது** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): ஒரே ESLint நடை, ruleId அடிப்படையிலான எண்ணிக்கை; இதனால் cyclomatic+max-lines மற்றும் cognitive அடிப்படைகள் தனித்தனியாக உள்ளன; தனிப்பட்ட `check:complexity` / `check:cognitive-complexity` ஆகியவை உள்ளூர் `--update` பயன்பாட்டிற்குத் தொடர்கின்றன.
- **`/api` கற்பனைத் தடுப்பு** — ✅ **முடிந்தது** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api`-க்கு ஒரே FS பட்டியல்; openapi-routes + docs-symbols இன்னும் தனித்தனியாக அறிக்கையிடுகின்றன; தனிப்பட்டவை உள்ளூர் இயக்கங்களுக்குத் தொடர்கின்றன.
- **`check:node-runtime` 11 பணிகளில் இயங்குகிறது** — ⚠️ **குறைந்த ROI.** ஒவ்வொன்றும் தனித்தனி runner; சரிபார்ப்பு <1s; மொத்தச் சேமிப்பு ~10s மட்டுமே, அதற்குப் பதிலாக ஒவ்வொரு பணிக்கும் மலிவான பாதுகாப்புக் கட்டுப்பாட்டை இழக்க நேரிடும். இந்த மாற்றக் குழப்பத்துக்கு மதிப்பில்லை.
- **CI lint-இல் `typecheck:noimplicit:core`** — ✅ **lint பணியிலிருந்து அகற்றப்பட்டது** (ஆலோசனை நிலை `continue-on-error` ஆக இருந்தது); தடைசெய்யும் வகை மேற்பரப்பு `typecheck:core` + `check:type-coverage` ஆகும். உள்ளூர் script தக்கவைக்கப்பட்டது.

### நிலைமாற்றம் / முடிவெடுத்தல் (இயக்குநர் கொள்கை)

- `check:openapi-security-tiers` (ஆலோசனை நிலை) — ❌ **சிக்கலின்றி நிலைமாற்ற முடியாது.** இது 0 நிலையுடன் வெளியேறுகிறது; ஆனால் `LOCAL_ONLY_API_PREFIXES`-இன் கீழுள்ள பல `traffic-inspector` வழித்தடங்களில் `x-loopback-only: true` சிறுகுறிப்பு இல்லை என எச்சரிக்கிறது. இதை அமல்படுத்துவதற்கு முதலில் அந்தச் சிறுகுறிப்புகளை `openapi.yaml`-இல் சேர்க்க வேண்டும்.
- `typecheck:noimplicit:core` (ஆலோசனை நிலை) — தடைசெய்யும் `check:type-coverage` ராட்செட்டால் பெருமளவில் உள்ளடக்கப்படுகிறது. இதை ஒரு ராட்செட்டாக மாற்றவும் அல்லது தேவையற்ற இரண்டாவது `tsc` சுற்றை நீக்கவும்.
- `test:vitest:ui` (இப்போது **தடைசெய்யும் நிலையில்**) — முன்பே இருந்த தோல்விகள் `vitest.config.ts`-இல் `// #8618` கண்காணிப்புக் கருத்துகளுடன் வெளிப்படையாக விலக்கப்பட்டுள்ளன; புதிய தோல்விகள் பணியைத் தோல்வியடையச் செய்யும்.
- `check:secrets` (gitleaks, தடைசெய்யும் ராட்செட்) — தற்போதைய உச்சவரம்பு `quality-baseline.json`-இல் உள்ள `metrics.secretFindings` ஆகும். எந்த விதிவிலக்கிற்கும் நியாயப்படுத்தப்பட்ட `.gitleaks.toml` பதிவு தேவை; அளவீடு கிடைக்கவில்லை என்றால் அது முழுமையற்றதாகும். இந்த ஸ்கேன் GitHub-இன் சொந்த secret scanning மற்றும் `check:public-creds` ஆகியவற்றுக்குத் துணையாகிறது.
- `check:pr-evidence` (தடைசெய்யும் நிலை, PR-body உரைநடையை grep செய்கிறது) — தவறான நேர்மறை முடிவுகளுக்கான ஆபத்து அதிகம்; இதை நீக்கினால் Hard Rule #18 அமலாக்கம் பலவீனமடையும், எனவே இது உண்மையான கொள்கை முடிவாகும்.
- `semgrep` (தனித்தியங்கும் ஆலோசனை நிலை) — OWASP குடும்பங்களில் CodeQL உடன் ஒன்றுபடுகிறது; அதன் அடிப்படையை ஒரு ராட்செட்டுடன் இணைக்கவும் அல்லது அதை நீக்கவும்.

---

## தொடர்புடைய ஆவணங்கள்

- மென்பொருள் வழங்கல் சங்கிலி (provenance, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — விசைத் தொகுப்பு சமநிலைத் தடுப்பு

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, பணி `i18n-ui-coverage`).
ஒவ்வொரு `src/i18n/messages/<locale>.json` கோப்பின் இலை விசைத் தொகுப்பையும் `en.json` உடன் ஒப்பிட்டு,
விசை எப்போது சேர்க்கப்பட்டது என்பதைப் பொருட்படுத்தாமல், இல்லாத அல்லது கூடுதலான எந்த இலை விசைக்காகவும்
தோல்வியடைகிறது. `__MISSING__:` இடநிரப்பிகள் இருப்பதாகக் கணக்கிடப்படுகின்றன (அவற்றின் உள்ளடக்கம்
விகிதத் தடுப்பின் பொறுப்பு). இது diff-அடிப்படையிலான/சதவீத அடிப்படையிலான மற்ற இரண்டு தடுப்புகளின்
முழுமையான நிரப்பியாகும்: `check-ui-keys-coverage` ஒவ்வொரு locale-க்கும் 80 % குறைந்தபட்ச வரம்பைச்
செயல்படுத்துகிறது (~13,000 விசைகளில் 43 இல்லாவிட்டாலும் அது இன்னும் 99.7 % எனக் காட்டும்), மேலும்
`check-new-key-coverage` ஒரு PR `en.json`-இல் சேர்க்கும் விசைகளை மட்டுமே மதிப்பிடுகிறது. ஒரு locale
தொகுதியின் branch பிரிக்கப்படும் நாளில் உள்ள `en.json`-இலிருந்து அது உருவாக்கப்பட்டு, base தொடர்ந்து
விசைகளைச் சேர்த்துக்கொண்டிருக்கும்போது பல நாட்களுக்கு மொழிபெயர்ப்பு நடைபெறுகிறது; அந்தத் தொகுதி PR
தானாக எந்த விசையையும் சேர்ப்பதில்லை. எனவே தொகுதி 1 (#13044) ஒன்பது locale-களில் 43 விசைகள்
குறைவாகவும், தொகுதி 2 (#13660) எட்டு locale-களில் 10 விசைகள் குறைவாகவும் இணைக்கப்பட்டபோது
(2026-09-15), மற்ற இரண்டு தடுப்புகளும் எச்சரிக்கவில்லை. தோல்வியைச் சரிசெய்ய
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` பயன்படுத்தவும்; `extra`
இலை என்பது மூலத்திலிருந்து அது நீக்கப்பட்டதைக் குறிக்கிறது — locale-இலிருந்தும் அதை நீக்கவும்.
`--warn` தோல்வியடையாமல் அறிக்கையிடுகிறது. `--catalog=cli` அதே ஒப்பீட்டை `bin/cli/locales` மீது
இயக்குகிறது (`npm run i18n:check-keys:cli`); இரண்டு படிகளும் `i18n-ui-coverage` பணியில் உள்ளன.

#### `check-new-key-coverage` — புதிய விசைக்கான i18n தடுப்பு

`check-ui-value-drift`-இன் இணைத் தடுப்பு. ஆங்கில மதிப்பு ஒன்று **மீண்டும் எழுதப்பட்டும்** அதன்
மொழிபெயர்ப்புகள் புதுப்பிக்கப்படாமல் விடப்பட்டதை அது கண்டறிகிறது; இது ஆங்கில விசை ஒன்று
**சேர்க்கப்பட்டும்** சில locale-கள் அதைப் பெறாமல் விடப்பட்டதை கண்டறிகிறது.

`check-ui-keys-coverage` இந்த வகையைப் பார்க்க முடியாது: அது ஒவ்வொரு locale-க்கும் ஒரு சதவீத
குறைந்தபட்ச வரம்பைச் செயல்படுத்துகிறது; ~13,000 இலைகளில் பதினொன்று இல்லாவிட்டாலும் coverage
99.9% ஆகவே இருக்கும். ஒரு மொழிக்கான சதவீதத்தால் "இந்த அம்சம் மொழிபெயர்க்கப்படாமல் வெளியிடப்பட்டது"
என்பதை வெளிப்படுத்த முடியாது — ஒரு முழு அம்சமும் எந்த உரையும் இல்லாமல் புதிய locale ஒன்றில்
சேர்க்கப்பட்டாலும் அந்த எண் மாறாமலேயே இருக்கலாம்.

இது பதிவு செய்யும் சம்பவம்: Orchestration Canvas-இன் Phase 3, அப்போது இருந்த 42 locale-களிலும்
அதன் பதினொன்று விசைகளை மொழிபெயர்த்தது. சில மணி நேரங்களுக்குப் பிறகு EU மொழித் தொகுதி (#13044)
repo-வை 51 locale-களாக உயர்த்தியது; புதிதாக வந்த ஒன்பது locale-களும் (`el`, `et`, `ga`, `hr`,
`lt`, `lv`, `mt`, `sl`, `sr`) அந்த விசைகளைப் பெறவில்லை. இல்லாத விசைக்குப் பதிலாக
`deepMergeFallback` ஆங்கிலத்தை வழங்குவதால், வெற்றிட UI-க்குப் பதிலாக மொழிபெயர்க்கப்படாத UI
தோன்றியது — இது உண்மையான தோல்வி; மேலும் வடிவமைப்பின்படியே அமைதியாக இருந்தது.

அதன் இணைத் தடுப்பைப் போலவே இதுவும் **diff-aware** ஆகும்; merge base-இல் உள்ள ஆங்கிலத்தையும்
working tree-ஐயும் ஒப்பிடுவதால், முன்பே இருந்த இடைவெளிகள் உறைந்த நிலையிலேயே இருக்கும்; எனவே
இந்தத் தடுப்பைச் செயல்படுத்த எந்த migration-உம் தேவையில்லை.

**`__MISSING__:<english>` குறியீடு இதை நிறைவேற்றாது (2026-09-17 முதல்).** முன்னர் இது
ஆவணப்படுத்தப்பட்ட ஒத்திவைப்பாக இருந்தது — runtime சரியான ஆங்கிலத்திற்கு fallback ஆகும் — ஆனால்
2026-09-16 அன்று எட்டு அம்ச PR-கள் 61 விசைகளைச் சேர்த்து, அவற்றை மொழிபெயர்ப்பதற்குப் பதிலாக அனைத்து
65 locale-களிலும் அந்தக் குறியீட்டைச் சேர்த்தன: இந்தத் தடுப்பு ஒவ்வொன்றையும் ஏற்றுக்கொண்டது, PR-களை
எதுவும் தடுக்கவில்லை; பின்னர் தடுக்கும் இயல்புடைய உண்மையான மொழிபெயர்ப்பு விகிதத் தடுப்பு release
tip-இல் அனைவருக்கும் தோல்வியடைந்தது (pt-BR 3.2 % > 2.5 % + 0.5). இப்போது ஒரு குறியீடு இல்லாத
மொழிபெயர்ப்பாகவே மதிப்பிடப்படுகிறது. தோல்வியைச் சரிசெய்ய
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`
பயன்படுத்தவும்; அல்லது `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, detached-safe, `OMNIROUTE_TRANSLATION_*` env இல்லாமல்
தொடங்க மறுக்கும்) மூலம் அனைத்து locale-களையும் இணையாகச் செயலாக்கவும். ஆங்கிலத்திலேயே இருக்க
வேண்டிய விசை (நிலையாக நிர்ணயிக்கப்பட்ட product/engine/flag பெயர்)
`scripts/i18n/untranslatable-keys.json`-இல் இருக்க வேண்டும்; ஒருபோதும் ஒரு குறியீட்டின் பின்னால்
இருக்கக் கூடாது. `vi` குறியீடுகளை முற்றிலும் தடை செய்கிறது
(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — ஒத்திவைக்கப்பட்ட சோதனைத் தடுப்பு

`vitest.config.ts`-இன் `exclude` பட்டியலில் உள்ள ஒரு கோப்பு இயங்காத சோதனையாகும்; ஆனால் tree-ஐப்
பார்ப்பவருக்கு அது coverage போலத் தோன்றும். அறுபத்திரண்டு கோப்புகள்
`// #8618 — pre-existing failure; remove this exclusion when fixed` என்ற comment-க்குப் பின்னால்
சேர்ந்திருந்தன. Issue #8618, 2026-08-11 அன்று மூடப்பட்டது; ஆனால் அது கண்காணித்த பட்டியல் 45
உள்ளீடுகளிலிருந்து 62 ஆக வளர்ந்தது, ஒவ்வொரு புதிய உள்ளீடும் செயலற்ற issue-ஐச் சுட்டும் comment-ஐப்
பெற்றிருந்தது. இறுதியாக அந்தப் பட்டியல் கோப்பு வாரியாக அளவிடப்பட்டபோது (#13204), **62 கோப்புகளில்
51 தற்போதைய tree-க்கு எதிராக எந்த மூல மாற்றமும் இல்லாமல் தேர்ச்சி பெற்றன**.

உண்மையான கோப்பாக resolve ஆகும் ஒவ்வொரு exclusion-உம் (a) ஒரு tracking issue-ஐக் குறிப்பிடவும்,
(b) அதன் அளவிடப்பட்ட நிலையுடன் `config/quality/vitest-exclusions.json`-இல் இடம்பெறவும் இந்தத்
தடுப்பு கட்டாயப்படுத்துகிறது. இதனால் ஒன்றைச் சேர்ப்பது, 60 உள்ளீடுகளைக் கொண்ட array-இல் மேலும்
ஒரு வரியாக இல்லாமல், அதற்கென ஒதுக்கப்பட்ட கோப்பில் மதிப்பாய்வு செய்யக்கூடிய diff ஆகிறது. இது
வேண்டுமென்றே விலக்கப்பட்ட சோதனைகளை மீண்டும் இயக்குவதில்லை — அதற்கு ~10 நிமிடங்கள் செலவாகும்;
அது ஒரு காலமுறைப் பணிக்குரியது. ஒவ்வொன்றும் கடைசியாக எப்போது அளவிடப்பட்டது என்பதை inventory
பதிவு செய்கிறது.
