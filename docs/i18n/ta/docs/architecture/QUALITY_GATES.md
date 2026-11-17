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

## கேட் பட்டியல் மற்றும் செயலாக்க சுயவிவரங்கள்

### வேட்பாளர் சேர்க்கை

CI மற்றும் Quality Gates பணிப்பாய்வுகள் ஒவ்வொன்றும் நிலையான தீர்ப்பை வெளியிடுகின்றன: `Gate / CI` மற்றும்
`Gate / Quality`. அவற்றின் பதிப்பு செய்யப்பட்ட சேர்க்கைக் கொள்கை, ஒவ்வொரு மேல்நிலைப் பணியையும்
தேவையானது அல்லது ஆலோசனைக்குரியது எனக் குறிப்பிடுகிறது. பொருந்தக்கூடிய தேவையான பணி வெற்றியடைய
வேண்டும்: இல்லாத, ரத்துசெய்யப்பட்ட, தவிர்க்கப்பட்ட, நிலுவையில் உள்ள மற்றும் அறியப்படாத முடிவுகள்
PASS-ஐ நிறுவ முடியாது. செல்லுபடியாகும் docs-only அல்லது catalog-only வகைப்பாடு, குறியீட்டு
லேனைப் பொருந்தாததாக மாற்றலாம்; draft PR ஏற்றுக்கொள்ளப்பட்ட வேட்பாளர் அல்ல. `hotfix` லேபிள்
ஆதாரத் தேவையைத் தள்ளுபடி செய்யாது.

இரு பணிப்பாய்வுகளும் main/release கிளைகளுக்கான PR-கள், `main`-க்கு push-கள், கைமுறை dispatch
மற்றும் merge-group நிகழ்வுகளை உள்ளடக்குகின்றன. Push, dispatch மற்றும் merge-group ஆகியவை முழுத்
தேர்வையும் இயக்குகின்றன. `release/**`-க்கு செய்யப்படும் push-கள் அவற்றைத் தொடங்காது
(2026-10-18): ஒவ்வொரு மாற்றமும் ஏற்கனவே அதன் PR-ல் matrix-ஐ இயக்கியுள்ளது; இணைக்கப்பட்ட
கலவையின் பொறுப்பு Release-Green-க்குரியது (`docs/ops/RUNNER_BOX.md` → Hosted lane).
Fork-களும் merge group-களும், இல்லையெனில் self-hosted runners-ஐத் தேர்ந்தெடுக்கும் பணிகளுக்கு
hosted runners-ஐப் பயன்படுத்துகின்றன; வெளியீட்டுக்கு முன் போதுமான hosted திறன்
சரிபார்க்கப்பட வேண்டும்.

ஒரு வழக்கமான PR வேகமான தேர்வை இயக்குகிறது. சேர்க்கைக் கொள்கையின் `full-code` மற்றும்
`full-code-e2e` லேன்கள் (E2E, ஒருங்கிணைப்பு, package artifact, Electron smoke, Bun SQLite,
சுற்றுச்சூழல் மற்றும் protocol clients) Mergify queue draft-ல் அல்லது முழு இயக்கத்தில் மட்டும்
இயங்கும்:
`gh workflow run ci.yml --ref <branch>`.

ஒவ்வொரு JSON ரசீதும் checkout செய்யப்பட்ட SHA, workflow run மற்றும் attempt ஆகியவற்றை
அடையாளப்படுத்துகிறது. CLI, checkout/event SHA பொருந்தாமையை நிராகரிக்கிறது. புதிய அல்லது
நீக்கப்பட்ட லேன் அமைதியாக மறைந்துவிடாதபடி, workflow சோதனைகள் கொள்கை உறுப்பினர்தன்மையை
verdict job-இன் `needs` பட்டியலுடன் இணைக்கின்றன. ரசீதுகள் அவற்றின் சொந்த workflow-ஐ மட்டுமே
உள்ளடக்குகின்றன; publication, deployment அல்லது ஏற்கனவே உள்ள advisory scanner-இன்
உள்ளகங்களை அல்ல. branch rules-ல் இரு check பெயர்களையும் செயல்படுத்துவது தனியான
நிர்வாக மாற்றமாகும்; இந்தப் பணிகளைச் சேர்ப்பது மட்டும் ஒரு branch-ஐப் பாதுகாக்காது.

### Merge queue

`queue` லேபிள் ஒரு PR-ஐ Mergify queue-க்கு (`.mergify.yml`) அனுப்புகிறது. Mergify, ஒரு
`mergify/merge-queue/` கிளையில் draft PR-ஐத் திறக்கிறது; CI அங்கே முழுத் தேர்வையும் இயக்குகிறது;
`Gate / CI`, `Gate / Quality` மற்றும் `Merge integrity (changelog + generated skills)` ஆகியவை
வெற்றியடைந்ததும் அசல் PR இணைக்கப்படுகிறது.

Mergify தனது queue சுருக்கத்தை draft-இன் விளக்கத்தில் எழுதுகிறது; பிற பயன்பாடுகளும் அதைத்
திருத்தலாம். அத்தகைய draft-ல் ஏற்படும் `pull_request` `edited` நிகழ்வு தனக்கென ஒரு
concurrency group (`-queue-edit-<run_id>`) எடுக்கிறது; இதனால் அது draft-இன் உண்மையான
இயக்கத்தை ரத்து செய்ய முடியாது, மேலும் gate மற்றும் matrix தவிர்க்கப்படுகின்றன. `Merge integrity`
மட்டுமே இன்னும் இயங்கும். தவிர்க்கப்பட்ட gate job வேறுபட்ட check பெயரைத் தாங்குகிறது, ஏனெனில்
Mergify, தவிர்க்கப்பட்ட `Gate / CI`-ஐ தோல்வியுற்ற check எனக் கருதி PR-ஐ queue-இலிருந்து
நீக்குகிறது.

dequeue செய்யப்பட்ட பிறகு, ஒரு push எப்போதும் PR-ஐ மீண்டும் queue-க்கு அனுப்பாது. அதில்
`@mergifyio queue` எனக் கருத்திடவும்.

### acceptance reducer-ல் தக்கவைக்கப்பட்ட ஆதாரங்கள்

`scripts/quality/validate-release-acceptance.mjs`, வழங்கப்பட்ட plan மற்றும் அதன் manifests-ஐ
குறைக்கிறது; அந்த plan முழுமையான release pipeline-ஐ உள்ளடக்குகிறது என்பதை அது நிறுவாது.
அதன் அறிக்கைகள், அந்த plan `VERIFIED` ஆக இருந்தாலும், `releaseAcceptance: false` என
வெளிப்படையாக அமைக்கின்றன. `release-acceptance.yml` workflow இன்னும் உண்மையான build,
package, boot அல்லது promotion ரசீதுகளுக்குப் பதிலாக shadow fixtures-ஐப் பயன்படுத்துகிறது.

தக்கவைக்கப்பட்ட ஆதாரத்தைச் சரிபார்க்க CLI-க்கு `--evidence-root` தேவை. கோப்புகள்
`<evidence-root>/<artifact_id>/<member>` எனத் தீர்மானிக்கப்பட்டு SHA-256 ஆக hash செய்யப்படுகின்றன.
ஆதாரம் இல்லாத PASS பதிவு, காணாமல் போன அல்லது மாற்றப்பட்ட கோப்பு, பாதுகாப்பற்ற பாதை அல்லது
symlink ஆகியவை சரிபார்ப்பைத் தடுக்கின்றன. காணாமல் போன கோப்புகள் வெற்றிகரமான காலியான
பதிவுகளுக்குச் சமமானவை அல்ல. ஏற்கனவே உள்ள SHA/run/attempt சரிபார்ப்புகள் சுயாதீனமாகவே
இருக்கும்: பொருந்தும் bytes பழைய ரசீதைச் சரிசெய்ய முடியாது. கோப்பு ஒருமைப்பாடு, செயல்படுத்தலின்
நம்பகத்தன்மைக்கோ artifact promotion-க்கோ சான்றல்ல.

### Static scan பட்டியல்

பதிப்பு செய்யப்பட்ட npm-alias பட்டியலும் static-scan உறுப்பினர்தன்மையும்
`config/quality/gate-manifest.json`-ல் உள்ளன. `package.json`-க்கு எதிராக script பெயர்களையும்
சரியான கட்டளைகளையும் சரிபார்க்க `npm run check:gate-manifest` இயக்கவும்; சேர்த்தல்கள்,
நீக்கங்கள் மற்றும் கட்டளை மாறுபாடுகள் உள்ளூர் hook மற்றும் CI-யில் உள்ள change-classification
பணிகள் இரண்டிலும் தோல்வியை ஏற்படுத்தும். ஒரு alias என்பது workflow job, matrix instance அல்லது
test case அல்ல: இந்த எண்ணிக்கைகள் ஒன்றுக்கொன்று மாற்றாகக் காட்டப்படக்கூடாது.

அவற்றை இயக்காமல் தேர்ந்தெடுக்கப்பட்ட alias-களை ஆய்வு செய்ய
`npm run quality:scan -- --list` அல்லது `npm run quality:scan:fast -- --list` பயன்படுத்தவும்.
Runner npm entrypoint-ஐ அழைக்கிறது; எனவே அதன் runtime (கட்டமைக்கப்பட்ட இடங்களில் Bun உட்பட)
பாதுகாக்கப்படுகிறது. அந்த profiles-க்கு வெளியிலுள்ள alias-களை தனித்தனியாக அழைக்கப்படுபவையாக
manifest பதிவு செய்கிறது; மேலும் read-only scan profiles-ல் maintenance commands
தடைசெய்யப்பட்டுள்ளன.

இந்த profiles static scan-ஐ மட்டுமே உள்ளடக்குகின்றன. அவை product tests, coverage, packaging,
external checks அல்லது வேட்பாளரின் முழுமையான release acceptance ஆகியவற்றைச் சான்றளிக்காது.
Workflow admission, இணைக்கப்பட்ட `config/quality/admission-policy.json` மற்றும்
`scripts/quality/admission-verdict.mjs` ஆகியவற்றைப் பயன்படுத்துகிறது. Release-observer
profiles தனித்தனியாகவே இருக்கும்; அவற்றுக்குப் பொருந்தும் checks மற்றும் receipts-ஐத்
தனித்தனியாக ஆய்வு செய்யவும். முழு observer-இன் static commands
`config/quality/release-green-static-profile.json`-ல் அறிவிக்கப்பட்டுள்ளன; இதில் `audit:deps`,
mutation-test selection மற்றும் translation checks ஆகியவை அடங்கும். Loader, npm commands-ஐ
package.json-க்கு எதிராகவும் மாதிரியாக்கப்பட்ட CI/Quality declarations-க்கு எதிராகவும்
சரிபார்க்கிறது; shell tokens-ஐ arguments ஆக இயக்குவதற்குப் பதிலாக drift-ஐ நிராகரிக்கிறது.
தேவையான scanner-இன் SKIP/INCOMPLETE வெளியீடு PASS-ஐ நிறுவ முடியாது. Profile, அதன் வெளிப்புற
விலக்குகளைப் பதிவு செய்கிறது; hosted coverage, test matrices, package அல்லது deployment
ஆதாரங்களுக்கு மாற்றாக அது அமையாது. கீழே உள்ள உரைப் பட்டியல் ஒரு குறிப்பு மட்டுமே; ஒரு gate
உண்மையில் இயங்கியது என்பதற்கான சான்றல்ல.

Scripts `scripts/check/` (policy gates) மற்றும் `scripts/quality/` (ratchet engine) ஆகியவற்றின்
கீழ் உள்ளன. CI-க்கான ஒரே உண்மை ஆதாரம் `.github/workflows/ci.yml` ஆகும்.

### Release PR fast-path (`quality.yml`)

`.github/workflows/quality.yml`, main/release PR-கள், `main`-க்கு push-கள், dispatch மற்றும்
merge groups ஆகியவற்றில் CI-யை நிறைவு செய்கிறது. PR-கள் path-filtered fast checks-ஐப்
பயன்படுத்துகின்றன. நிரந்தரமாக முடக்கப்பட்ட duplicate build நீக்கப்பட்டது; உண்மையான
build/package/boot checks CI-யில் தொடர்கின்றன. Unit suite மற்றும் vitest ஆகியவை CI-யில் மட்டும்
இயங்குகின்றன (`Unit Tests (N/8)` மற்றும் `Vitest`).

| பணி                                              | வரம்பு                                                                                                                                                    | தடுக்கும் நிலை         |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `Docs Gates (fast-path)`                         | ஆவணங்கள்/குறியீடு PRகள்; API ஆவணக் குறிப்புகள் மற்றும் docs-all                                                                                           | ஆம்                    |
| `Fast Quality Gates`                             | குறியீடு PRகள்; நிலையான சரிபார்ப்புகள், வகைச் சரிபார்ப்பு, டாஷ்போர்டு வகைச் சரிபார்ப்பு, பாதிக்கப்பட்ட unit சோதனைகள், மறக்கப்பட்ட இணைச் சோதனைகள் (ஆலோசனை) |
| `No new ESLint warnings`                         | குறியீடு PRகள்; suppression-களை கருத்தில் கொண்ட lint பாதுகாப்பு                                                                                           | ஆம், forkகளையும் உட்பட |
| `Merge integrity (changelog + generated skills)` | draft அல்லாத PRகள்; changelog மற்றும் உருவாக்கப்பட்ட skill ஒத்திசைவு                                                                                      | ஆம், forkகளையும் உட்பட |

#### மறக்கப்பட்ட இணைச் சோதனைகள் அறிக்கை

`npm run check:forgotten-sibling-tests` என்பது `Fast Quality Gates`-ன் ஆலோசனைப் படியாக இயங்கி,
test-impact map-க்குப் பின்னால் உள்ள அதே import resolver-ஐ மீண்டும் பயன்படுத்துகிறது.
மாற்றப்பட்ட ஒவ்வொரு production module-க்கும், pull-request diff-இல் candidate
test இல்லாதபோது, இது தீர்மானிக்கக்கூடிய
`changed module/symbol -> static consumer -> candidate sibling test` சங்கிலிகளை அறிக்கையிடுகிறது. Markdown சுருக்கமும் JSON முடிவும்
அளவுத்திருத்தத்திற்காக `forgotten-sibling-tests` workflow artifact ஆகத் தக்கவைக்கப்படுகின்றன; எந்த blocking rollout-க்கும் முன்பு இது செய்யப்படுகிறது.

Barrel re-exports மற்றும் dynamic imports ஆகியவை resolution diagnostics மட்டுமே; அவை ஒருபோதும்
blocking finding-ஐ உருவாக்காது. மதிப்பாய்வு செய்யப்பட்ட விதிவிலக்குகள்
`config/quality/forgotten-sibling-allowlist.json`-ல் உள்ளன. ஒவ்வொரு பதிவும் consumer மற்றும் candidate
test-ஐக் குறிப்பிட வேண்டும், குறிப்பிட்ட காரணத்தை வழங்க வேண்டும், மேலும் GitHub issue அல்லது pull request-க்கு இணைப்பு வழங்க வேண்டும். தவறான வடிவிலான பதிவுகள் fail closed ஆகும். விதிவிலக்குகள் நீக்கப்பட்ட candidate test-ஐ அல்லது `.skip`/`.todo`-ஐச் சேர்க்கும் diff-ஐ ஒடுக்க முடியாது;
assertion-ஐ பலவீனப்படுத்துதல் மற்றும் பிற மறைப்பு நடவடிக்கைகள், தனித்தனியாக blocking செய்யும்
`check:test-masking` gate-ன் பொறுப்பில் உள்ளன.

### பணி: `lint`

`main`-க்கு செய்யப்படும் ஒவ்வொரு PR-லும் இயங்கும். தோல்வியுற்றால் merge-ஐத் தடுக்கிறது.

| Script (`npm run ...`)            | சரிபார்ப்பவை                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | தடுக்கும்                              |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `check:node-runtime`              | Node.js பதிப்பு ஆதரிக்கப்படும் வரம்புக்குள் உள்ளது                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ஆம்                                    |
| `check:cycles`                    | `src/` + `open-sse/` ஆகிய அனைத்திலும் உள்ள சுற்று இறக்குமதிகள் (AST-அடிப்படையிலானது, tsconfig `paths` தீர்க்கப்பட்டவை). ஏதேனும் சுழற்சி இருந்தால் Bare எப்போதும் 1-ஐ வெளியேற்றும் ( #15281 முதல் fail-closed) மேலும் SCC-களைப் பட்டியலிடும். `check:cycles:ratchet` (CI இயக்குவது) `quality-baseline.json`-இல் உள்ள `metrics.cycles` உச்சவரம்பை மீறும் போது தடுக்கும் — தற்போது 14, `direction: down`; எனவே இது குறைய மட்டுமே முடியும் (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ஆம் (ratchet)                          |
| `check:boundary`                  | `open-sse → src` இணைப்பு: engine-இலிருந்து app-க்கான தனித்துவமான file-to-file இறக்குமதிகள் (`scripts/quality/measure-boundary.mjs`; edge பட்டியல் v4 core/module-split சரிசெய்தல் நிலுவைப் பணிகளின் பட்டியல்). Bare = ஆலோசனை அறிக்கை (`quality:boundary` போலவே). `check:boundary:ratchet` (CI இயக்குவது, `quality.yml` fast-gates ratchet loop-இலும் உள்ளது) `quality-baseline.json`-இல் உள்ள `metrics.boundaryOpenSseToSrc` உச்சவரம்பை மீறும் போது தடுக்கும் — அளக்கப்பட்ட 771-ல் தொடங்கப்பட்டது, `direction: down`; `--update` அதை மட்டுமே குறைக்கும்; PR-களில் base-relative (`--base-ref`, கீழே காண்க)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | ஆம் (ratchet)                          |
| `check:route-validation:t06`      | அனைத்து routes-களிலும் Zod schemas உள்ளன (Tier 6 கொள்கை)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ஆம்                                    |
| `check:any-budget:t11`            | `@ts-expect-error // any` எண்ணிக்கை பட்ஜெட்டை மீறாது (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ஆம்                                    |
| `check:provider-consistency`      | `providers.ts` இல் உள்ள ஒவ்வொரு provider-க்கும் `providerRegistry.ts` இல் பொருந்தும் பதிவு உள்ளது (மற்றும் அனுமதிப்பட்டியலுக்குள், இதன் மாறுபாடும் பொருந்தும்)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ஆம்                                    |
| `check:model-lifecycle`           | கைமுறையாக பராமரிக்கப்படும் மூன்று routing அட்டவணைகளும் check-in செய்யப்பட்ட lifecycle snapshot (#11503)-உடன் ஒத்திசைவாக உள்ளன: `FITNESS_TABLE` (`taskFitness.ts`) மதிப்பிடும் எந்த retired id-யையும் `REGISTRY` வழியாக route செய்யாது; ஒவ்வொரு `BUILT_IN_ALIASES` இலக்கும் `REGISTRY` இல் இருக்க வேண்டும், மேலும் retired-id snapshot-இல் இருக்கக்கூடாது; `REGISTRY` இல் இன்னும் உள்ள ஒவ்வொரு retired id-யும் forward செய்யப்பட வேண்டும் அல்லது `allowedRetiredInCatalog` இல் பட்டியலிடப்பட வேண்டும்; மேலும் எந்த `DEFAULT_DEGRADATION_MAP` மூலமும் இலக்கும் அந்த snapshot-இல் retired ஆக இருக்கக்கூடாது. ஒரு model தற்போது live upstream மூலம் வழங்கப்படுகிறதா என்பதை இது நிரூபிக்காது. Offline — `config/quality/model-lifecycle.json` உடன் ஒப்பிடுகிறது; இது `npm run quality:refresh-model-lifecycle` (network; CI உடன் இணைக்கப்படவில்லை) மூலம் கைமுறையாகப் புதுப்பிக்கப்படுகிறது. `allowedRetiredInCatalog` என்பது burn-down ratchet ஆகும்: tracking issue உடன் மட்டுமே ஒரு பதிவைச் சேர்க்கவும்.                                                                                                                                                                                     | ஆம்                                    |
| `check:fetch-targets`             | client-side `src/` இல் உள்ள ஒவ்வொரு `fetch("/api/...")`-ம் உண்மையான `route.ts`-க்கு resolve ஆகிறது                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ஆம்                                    |
| `check:deps`                      | repo-வில் உள்ள ஒவ்வொரு `package.json`-இலும் உள்ள அனைத்து `npm install` செய்யக்கூடிய deps-களும் `dependency-allowlist.json` இல் உள்ளன; pin செய்யப்படாத அல்லது slopsquatted புதிய packages கொடிகளிடப்படுகின்றன                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ஆம்                                    |
| `audit:deps`                      | ஐந்து சுயாதீன lockfiles-களின் (root, Electron, OpenCode plugins v1/v2 மற்றும் provider) npm audit. Critical advisories தடுக்கின்றன; high advisories காணக்கூடிய எச்சரிக்கைகளாகத் தொடர்கின்றன. விடுபட்ட அல்லது தோல்வியடைந்த audits INCOMPLETE ஆகக் கருதப்பட்டு தடுக்கின்றன; ஒவ்வொரு scope-க்குமான lock hashes மற்றும் reports பாதுகாக்கப்படுகின்றன.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ஆம்                                    |
| `check:lockfile`                  | `package-lock.json` ஒருமைப்பாடு — https registry, integrity hashes, host overrides இல்லை                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ஆம்                                    |
| `check:licenses`                  | உற்பத்திச் சார்புகளுக்கான SPDX உரிம அனுமதிப் பட்டியல்                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ஆம்                                    |
| `check:tracked-artifacts`         | build artifacts / commit செய்யப்பட்ட `node_modules` symlinks இல்லை (husky pre-commit-லும் இயங்கும்; pre-push திட்டமிட்டே இலகுவானது — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ஆம்                                    |
| `check:ai-attribution`            | PR commits, title அல்லது body-யில் AI/bot `Co-Authored-By` trailer அல்லது AI-generation footer இல்லை — Hard Rule #16 (`quality.yml`-இன் PR→`release/**`-க்கான fast-gates loop-ல் — event payload-ஐப் படிக்கும், PR-களுக்கு வெளியே no-op — மேலும் PR→`main`-க்கான `ci.yml` lint-இல் PR-only step; அத்துடன் husky `commit-msg` hook-லும்; மனித co-authors அனுமதிக்கப்படுவர்; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:vitest-exclusions`         | ஒவ்வொரு Vitest exclusion-மும் tracking issue-ஐக் குறிப்பிட வேண்டும் மற்றும் `config/quality/vitest-exclusions.json`-ல் இடம்பெற வேண்டும் (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ஆம்                                    |
| `check:file-size`                 | Source files (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) `cap` வரம்புக்குள் இருக்க வேண்டும்; test files (`*.test.ts(x)`) `testCap` வரம்புக்குள் இருக்க வேண்டும்; `file-size-baseline.json`-ல் frozen செய்யப்பட்ட files (`frozen` / `testFrozen`) பதிவுசெய்யப்பட்ட அளவைத் தாண்டி வளரக்கூடாது                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | ஆம்                                    |
| `check:error-helper`              | செயல்படுத்திகள்/கையாளிகளில் உள்ள பிழைப் பதில்கள் `buildErrorBody()` / `sanitizeErrorMessage()` (கடுமையான விதி #12) ஐப் பயன்படுத்துகின்றன                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ஆம்                                    |
| `check:migration-numbering`       | Migration SQL கோப்புகள் தொடர்ச்சியாக எண்ணிடப்பட்டுள்ளன; இடைவெளிகளோ நகல்களோ இல்லை                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ஆம்                                    |
| `check:public-creds`              | `publicCreds.ts` க்கு வெளியே எந்தவொரு நேரடி OAuth `client_id`/`client_secret` அல்லது Firebase Web விசைகளும் இல்லை (கடுமையான விதி #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ஆம்                                    |
| `check:db-rules`                  | `src/lib/db/` தொகுதிகளுக்கு வெளியே raw SQL இல்லை; `localDb.ts` இலிருந்து barrel-imports இல்லை (கடுமையான விதிகள் #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ஆம்                                    |
| `check:known-symbols`             | அவற்றின் dispatch அட்டவணைகளில் பதிவுசெய்யப்பட்ட provider executors, routing strategies மற்றும் translators ஆகியவை வட்டில் உள்ள கோப்புகளுடன் பொருந்துகின்றன — orphaned அல்லது அறிவிக்கப்படாத symbols எதுவும் இல்லை                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ஆம்                                    |
| `check:route-guard-membership`    | child process ஐ உருவாக்கும் ஒவ்வொரு route-உம் `isLocalOnlyPath()` மூலம் வகைப்படுத்தப்படுகிறது (கடுமையான விதிகள் #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ஆம்                                    |
| `check:test-discovery`            | களஞ்சியத்தில் உள்ள ஒவ்வொரு `*.test.ts` / `*.spec.ts` கோப்பும் குறைந்தது ஒரு சோதனை இயக்கியால் சேகரிக்கப்படுகிறது (ratchet: `test-discovery-baseline.json`-இல் உள்ள orphan பட்டியல் சுருங்க மட்டுமே முடியும்)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ஆம்                                    |
| `check:test-tla-order`            | `tests/unit`-இன் கீழ் உள்ள எந்த `node:test` கோப்பும் ஒரு சோதனையைப் பதிவுசெய்து, top-level `await`-ஐ எதிர்கொண்டு, பின்னர் மேலும் சோதனைகளைப் பதிவுசெய்யாது (#18045; ratchet: `test-tla-order-allowlist.json` சுருங்க மட்டுமே முடியும்)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ஆம்                                    |
| `check:agent-skills-sync`         | உருவாக்கப்பட்ட agent-skills கலைப்பொருட்கள் அவற்றின் மூலப் பட்டியலுடன் பொருந்துகின்றன (வேறுபாடு இல்லை). வெளியீட்டு முறை ஒவ்வொரு skill-ஐயும் சரிபார்க்கிறது; ஒரு அம்ச PR (`pr` mode), அது உருவாக்கிய உரையைத் திருத்தும் skills-ஐ மட்டுமே சரிபார்க்கிறது — [உருவாக்கப்பட்ட கோப்புகள் மற்றும் பெறப்பட்ட அடிப்படைகள்](#generated-files-and-derived-baselines-written-at-release) என்பதைப் பார்க்கவும்                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:provider-asset-provenance` | Provider லோகோக்கள்/கலைப்பொருட்கள் பதிவுசெய்யப்பட்ட provenance உள்ளடக்கத்தை கொண்டிருக்கின்றன                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `lint:json`                       | JSON கட்டமைப்புக் கோப்புகள் parse செய்யப்பட்டு, களஞ்சிய lint விதிகளைப் பூர்த்தி செய்கின்றன                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `typecheck:core`                  | பிழைகள் இல்லாத TypeScript தொகுப்பு (ஆலோசனைக்குரிய எச்சரிக்கைகள் மட்டுமே)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ஆம்                                    |
| `typecheck:noimplicit:core`       | கடுமையான `noImplicitAny` — எதிர்காலத்தை நோக்கியது; ஏற்கனவே உள்ள பல call site-களுக்கு இன்னும் annotations தேவை                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | **ஆலோசனை** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` என்பது `src/app/(dashboard)/**` வரம்பிற்குள் மட்டுமே செயல்படுகிறது (#7033) — `typecheck:core`-இன் தேர்ந்தெடுக்கப்பட்ட 27-கோப்பு allowlist-இல் எந்த dashboard TSX-வும் இல்லை; மேலும் `next.config.mjs` இல் `ignoreBuildErrors: true` அமைக்கப்பட்டுள்ளதால், `next build` கூட type-check செய்வதில்லை. எனவே அங்கிருந்த orphaned-identifier regression-கள் (#6625/#6909) CI-க்கு தெரியாமல் இருந்தன. உறைந்த, ஒவ்வொரு கோப்பு/TS-code எண்ணிக்கை baseline-க்கு எதிராக வேறுபாடுகளைச் சரிபார்க்கிறது (`config/quality/dashboard-typecheck-baseline.json`; `check:known-symbols` போன்ற அதே stale-enforcement முறை) — baseline எண்ணிக்கையை மீறும் புதிய பிழைகள் மட்டுமே gate-ஐ தோல்வியடையச் செய்யும்; ஏற்கனவே உள்ள பிழை சரிசெய்யப்பட்டால் `--update` மூலம் ratchet down செய்யவும்.                                                                                                                                                                                                                                                                                                                                                                                                               | ஆம்                                    |
| `check:build-typecheck`           | `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`) முழுவதிலும் செயல்படும், முழு பயன்பாட்டுக்கான production type check; `typecheck:core`-இன் 27-கோப்பு allowlist மற்றும் dashboard gate ஆகியவை உள்ளடக்காத பகுதிகளையும் இது சரிபார்க்கிறது. `config/quality/build-typecheck-baseline.json`-க்கு எதிராக வேறுபாடுகளைச் சரிபார்க்கிறது; ஒவ்வொரு (கோப்பு, code) எண்ணிக்கையிலும் புதிய அல்லது அதிகரித்த எண்ணிக்கை தோல்வியடையும், குறைந்த எண்ணிக்கை ஏற்பட்டால் ratchet செய்யுமாறு கேட்கும். இயக்கத்தின் போது புதிய அல்லது அதிகரித்த pair இருந்தால் `--update` மறுக்கும்; `--force-regressions` வழங்கப்பட்டால் மட்டுமே அனுமதிக்கும். புதிதாக அமைதிப்படுத்தப்பட்ட கோப்பு இருந்தால் `--force-nocheck` வழங்கப்படாத வரை மறுக்கும்; எனவே பச்சை நிலையைப் பெற baseline-ஐ விரிவுபடுத்துவதும், நிரந்தரமாக ஒரு silence வழங்குவதும் இரண்டு தனித்த, திட்டமிட்ட செயல்களாகும். வெறும் `--force` நிராகரிக்கப்படும். `@ts-nocheck` பயன்படுத்தும் கோப்புகள் எந்த diagnostics-ஐயும் தெரிவிக்காததால், அவை ஒவ்வொரு gate-க்கும் தெரியாமல் போகக்கூடும்; இதைத் தவிர்க்க, build scope-இல் உள்ளவற்றையும் `config/quality/ts-nocheck-baseline.json`-க்கு எதிராக ஸ்கேன் செய்கிறது. | ஆம்                                    |

#### இரண்டு typecheck நிரல்கள் வெவ்வேறு விதமாக பதிலளிக்கின்றன

`typecheck:core` மற்றும் `check:build-typecheck` ஆகியவை வெவ்வேறு options-களின் கீழ் வெவ்வேறு நிரல்களை compile செய்கின்றன; ஒரே கோப்பு ஒன்றில் பிழையின்றியும் மற்றொன்றில் பிழைகள் நிறைந்தும் இருக்கலாம்.

`tsconfig.build.json` இல் `"strict": false` அமைக்கப்பட்டுள்ளது, எனவே `noImplicitAny` முடக்கப்பட்டுள்ளது. core config கடுமையான options-களுடன் தேர்ந்தெடுக்கப்பட்ட 27-கோப்பு allowlist-ஐ compile செய்து, ஒவ்வொரு entry-யின் import graph-ஐப் பின்தொடர்கிறது; ஆகவே build program-இல் ஒருபோதும் தோன்றாத கோப்புகளும் அங்கே சரிபார்க்கப்படுகின்றன.

ஒரு கோப்பு typed என மதிப்பிடும்போது இதன் விளைவு முக்கியமானது: **`check:build-typecheck` இன் கீழ் zero diagnostics என்பது zero என்று பொருளல்ல**. 26 கோப்புகளிலிருந்து `@ts-nocheck` நீக்கப்பட்டபோது, அவற்றில் 23 build program-இல் பிழையின்றி இருந்தன; அவற்றில் பதினாறு, strict ஒன்றில் சுமார் 120 implicit-any பிழைகளை வெளிப்படுத்தின. ஒரு கோப்பு clean எனக் கூறுவதற்கு முன் இரண்டையும் சரிபார்க்கவும்.

### Job: `quality-gate`

`test-coverage` க்குப் பிறகு இயங்கும். தோல்வியுற்றால் merge-ஐத் தடுக்கிறது.

| ஸ்கிரிப்ட்                   | சரிபார்ப்பது                                                                                                                                                                                               | தடைசெய்வது                  |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `quality:collect`            | `quality-metrics.json` ஐ உருவாக்குகிறது (ESLint எச்சரிக்கை எண்ணிக்கை, இணைக்கப்பட்ட shard அறிக்கையிலிருந்து coverage)                                                                                       | ஆம் (ratchet-க்கு upstream) |
| `quality:ratchet`            | `quality-baseline.json` இல் உள்ள ஒவ்வொரு அளவீடும் பின்னடைந்திருக்கவில்லை (ESLint எச்சரிக்கைகள் ≤ baseline; coverage ≥ baseline)                                                                            | ஆம்                         |
| `check:duplication`          | குறியீட்டு நகலாக்கம் (jscpd@4), `quality-baseline.json` இல் உள்ள baseline-ஐ மீறவில்லை                                                                                                                      | ஆம்                         |
| `check:complexity`           | கோப்பு-நிலை cyclomatic complexity வரம்பை மீறவில்லை (core ESLint `complexity` + `max-lines-per-function`)                                                                                                   | ஆம்                         |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — தனி ESLint pass; CI இரண்டையும் ஒரே `check:complexity-ratchets` படியாக இணைத்து இயக்குகிறது                                                         | ஆம்                         |
| `check:dead-code`            | பயன்படுத்தப்படாத exports / கோப்புகளுக்கான ratchet (knip), baseline-ஐ ஒப்பிடும்போது பின்னடையவில்லை                                                                                                          | ஆம்                         |
| `check:compression-budget`   | Compression benchmark budget — ஒவ்வொரு engine-க்குமான token-savings floors பின்னடையக்கூடாது                                                                                                                | ஆம்                         |
| `check:type-coverage`        | Percent-typed ratchet (`type-coverage`) பின்னடையவில்லை; பெரும்பாலும் `typecheck:noimplicit:core` ஐ உள்ளடக்குகிறது                                                                                          | ஆம்                         |
| `check:codeql-ratchet`       | திறந்த CodeQL alert எண்ணிக்கை பின்னடையவில்லை (`gh api` மூலம் வாசிக்கிறது; token இல்லையெனில் தடையின்றி skip செய்கிறது) — refresh cadence மற்றும் manual trigger: கீழே உள்ள "CodeQL ratchet" ஐப் பார்க்கவும் | ஆம்                         |
| `check:type-scale-ratchet`   | Kit type scale: 12 px-க்கும் குறைவான sizes மற்றும் `font-bold` ஆகியவை `src/` இல் மட்டும் குறைய வேண்டும் (`typeScaleSubFloorSizes`, `typeScaleFontBold`); pre-commit hook-லும் உள்ளது                       | ஆம்                         |

### பணி: `quality-extended`

Job-level `continue-on-error` இல்லாத mixed job: `--ratchet` ஐக் கடந்து செல்லும் ஒரு step, `quality-baseline.json` உடன் ஒப்பிடும்போது அளவிடப்பட்ட பின்னடைவில் job-ஐ தோல்வியடையச் செய்கிறது. `check:circular-deps` மற்றும் scanner install step மட்டுமே advisory ஆகும் (step-level `continue-on-error: true`). வெளிப்புற scanners, `gh release download` மூலம் install செய்யப்படுகின்றன; gitleaks இல்லாதபோது `check:secrets` தானாகவே skip ஆகிறது (exit 0), அதேவேளை அவற்றின் measurement இல்லாதபோது `check:vuln-ratchet`, `check:workflows` மற்றும் `check:openapi-breaking` ஆகியவை fail closed ஆகின்றன.

| ஸ்கிரிப்ட்               | சரிபார்ப்பது                                                                                                                                                                                                                             | தடைசெய்வது                                     |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `check:circular-deps`    | Circular dependencies இல்லை (dpdm)                                                                                                                                                                                                       | **Advisory**                                   |
| `check:bundle-size`      | Bundle size வரம்பை மீறவில்லை; அளவிட முடியாத size-ம் தோல்வியடையும்                                                                                                                                                                        | **--ratchet உடன் Blocking**                    |
| `check:secrets`          | Secret scanning (gitleaks) — binary இல்லையெனில் skip செய்கிறது                                                                                                                                                                           | **--ratchet உடன் Blocking**                    |
| `check:vuln-ratchet`     | Dependency vulnerabilities (osv-scanner) பின்னடையவில்லை — அளவிடப்படவில்லை என்றால் `--ratchet`, INCOMPLETE ஆகத் தோல்வியடைகிறது (exit 2)                                                                                                   | **--ratchet உடன் Blocking**                    |
| `check:workflows`        | Workflow lint (actionlint + zizmor); scanners காணப்படாதது/பழுதடைந்தது, தவறான reports அல்லது ratchet baseline இல்லாதது INCOMPLETE ஆகத் தோல்வியடையும். சரியான findings, தேர்ந்தெடுக்கப்பட்ட strict/advisory/ratchet policy-ஐப் பின்பற்றும் | Execution தேவை; CI இல் zizmor ratchet blocking |
| `check:openapi-breaking` | Pin செய்யப்பட்ட event commits-க்கு எதிரான Public API contract (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); தேவையான measurement fail closed ஆகும்                                              | **--ratchet உடன் Blocking**                    |

### பணி: `docs-sync-strict`

`main` க்கான ஒவ்வொரு PR-லும் இயக்கப்படுகிறது. தோல்வியடைந்தால் merge-ஐத் தடுக்கிறது.

| Script                         | Validates                                                                                                                                                                                           | Blocking                     |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `check:docs-all`               | கீழே உள்ள 6 துணை-வாயில்களை வரிசையாக இயக்கும் மெட்டா-வாயில்                                                                                                                                          | ஆம்                          |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI பதிப்பு ஒத்திசைவு; release பயன்முறையில் 66 `llm.txt` பிரதிகளும் மொழிபெயர்க்கப்பட்ட CHANGELOG பிரிவுகளும் (PR பயன்முறை: பிரதிகள் ஒன்றுக்கொன்று ஒத்தவை)                           | ஆம்                          |
| ↳ `check:docs-counts`          | உரையில் உள்ள எண்ணிக்கைகள் (provider எண்ணிக்கை, migration எண்ணிக்கை போன்றவை). இரண்டு பயன்முறைகள்: feature PR-களில் `pr`, மற்ற இடங்களில் `release` — கீழே உள்ள "Derived values" பகுதியைப் பார்க்கவும் | ஆம்                          |
| ↳ `check:env-doc-sync`         | `.env.example`-இல் உள்ள ஒவ்வொரு env var-மும் docs அட்டவணையில் ஆவணப்படுத்தப்பட்டிருக்க வேண்டும், அதற்கு மாறாகவும் இருக்க வேண்டும்                                                                    | ஆம்                          |
| ↳ `check:deprecated-versions`  | docs-இல் deprecated பதிப்பு சரங்கள் எதுவும் இருக்கக்கூடாது                                                                                                                                          | ஆம்                          |
| ↳ `check:doc-links`            | docs-இல் உள்ள உள் markdown இணைப்புகள் உண்மையான கோப்புகளுக்குத் தீர்க்கப்பட வேண்டும் (`[text]`/`(path)` வடிவம்)                                                                                      | ஆம்                          |
| ↳ `check:fabricated-docs`      | docs-இல் குறிப்பிடப்பட்டுள்ள routes, env vars, CLI commands, hook names மற்றும் file paths ஆகியவை codebase-இல் இருக்க வேண்டும். `--strict` மூலம் கடுமையான gate; flag இல்லாமல் soft-fail.            | CI-இல் `--strict` வழியாக ஆம் |
| `check:cli-i18n`               | CLI `t()` keys `bin/cli/locales/en.json`-இல் இருக்க வேண்டும் (இரு பயன்முறைகளிலும்); release பயன்முறையில் மட்டும் pt-BR / zh-CN / zh-TW, `en.json` உடன் சமநிலையில் இருக்க வேண்டும்                   | ஆம்                          |
| `check:openapi-coverage`       | OpenAPI spec, உண்மையான routes-இன் ratcheted floor அளவையாவது உள்ளடக்கியிருக்க வேண்டும்                                                                                                               | ஆம்                          |
| `check:openapi-security-tiers` | `openapi.yaml`-இல் உள்ள Security tier annotations, `routeGuard.ts` வகைப்பாடுகளுடன் ஒத்திசைவாக இருக்க வேண்டும்                                                                                       | **ஆலோசனை**                   |
| `check:openapi-routes`         | `openapi.yaml`-இல் உள்ள ஒவ்வொரு path-மும் உண்மையான `route.ts`-க்கு தீர்க்கப்பட வேண்டும் (hallucination-க்கு எதிரானது)                                                                               | ஆம்                          |
| `check:docs-symbols`           | `docs/**/*.md`-இல் உள்ள ஒவ்வொரு `/api/...` குறிப்பும் உண்மையான `route.ts`-க்கு தீர்க்கப்பட வேண்டும் (hallucination-க்கு எதிரானது)                                                                   | ஆம்                          |
| `i18n translation drift`       | `docs/i18n/**` பிரதிகள் மற்றும் `.i18n-state.json` ஆகியவற்றுக்கு இடையிலான வேறுபாடு — PR-களில் ஆலோசனை (translation wave மூலம் பிரதிகள் புதுப்பிக்கப்படுகின்றன), push மற்றும் nightly-இல் கடுமையானது  | PR-களில் **ஆலோசனை**          |

#### மொழிபெயர்ப்பு பிரதிகள் பெறப்பட்ட கோப்புகள் (PR பயன்முறை vs release பயன்முறை)

ஒரு feature PR, ஆங்கில மூலங்களை மட்டுமே திருத்தும். `docs/i18n/<locale>/**` பிரதிகள் (66
`llm.txt` நகல்களும் மொழிபெயர்க்கப்பட்ட `CHANGELOG.md` கோப்புகளும் உட்பட) மற்றும் `.i18n-state.json` ஆகியவை translation wave மூலம் (`docs/i18n-*` / `chore/i18n-*` branches, திட்டமிடப்பட்ட
`i18n-mirror-refresh.yml`) ஒரே படியில் மீண்டும் எழுதப்படுகின்றன; மேலும் release மூலம் (`npm run release:sync-changelog-i18n`) புதுப்பிக்கப்படுகின்றன. ஆகவே mirror gates இரண்டு பயன்முறைகளில் இயங்குகின்றன; இவை `scripts/check/lib/gateMode.mjs` மூலம் தீர்மானிக்கப்படுகின்றன (`--mode=pr|release`,
பின்னர் `OMNIROUTE_GATE_MODE`, அதன் பிறகு Actions நிகழ்வு; local run என்பது `release`):

- `check:docs-sync` — வெளியீட்டு முறையில் ஒவ்வொரு சரிபார்ப்பையும் இயக்குகிறது. PR முறையில் package.json/OpenAPI பதிப்பு,
  மூல CHANGELOG தலைப்புகள் மற்றும் superseded-docs guard ஆகியவற்றை வைத்துக்கொண்டு,
  `llm.txt` mirror நகல்கள் மற்றும் மொழிபெயர்க்கப்பட்ட CHANGELOG பகுதிகளுக்கு
  `SKIP reason=pr-mode` என அச்சிடுகிறது —
  PR, `config/quality/derived-paths/*.json` இல் `docs/i18n/**` குடும்பத்திற்கான writer ஆக
  அறிவிக்கப்பட்ட head கிளையிலிருந்து mirrors-ஐ எழுதினால், இரு சரிபார்ப்புகளையும் கடுமையாக இயக்குகிறது,
  மேலும் diff base தீர்மானிக்கப்பட்டால், அதன் சொந்த diff `docs/i18n/<locale>/llm.txt` அல்லது
  `CHANGELOG.md`-ஐத் திருத்தும் மாற்றம் அந்தச் சரிபார்ப்பை கடுமையாக இயக்குகிறது. `docs-sync-strict`
  job-இல் depth-1 checkout ஆக இருப்பதால் diff base தீர்மானிக்கப்படாது; எனவே PR முறையும் base
  தேவையில்லாத ஒரு சரிபார்ப்பை இயக்குகிறது: ஒவ்வொரு `llm.txt` mirror-மும் இருக்க வேண்டும், அதன்
  `---` separator-ஐ வைத்திருக்க வேண்டும், மேலும் மூல body-யையோ அல்லது பெரும்பாலான mirrors பகிரும்
  body-யையோ கொண்டிருக்க வேண்டும். Base நகர்ந்தால் எல்லா mirrors-மும் சமமாக பழையதாகி pass ஆகும்;
  ஒரு mirror-ஐக் கைமுறையாகத் திருத்தினால் fail ஆகும். depth-1 PR checkout-இல் மொழிபெயர்க்கப்பட்ட
  `CHANGELOG.md` கோப்புகளுக்கு இதுபோன்ற சரிபார்ப்பு இல்லை.
- Pre-commit hook `check-docs-sync.mjs --mode=pr`-ஐ இயக்குகிறது: ஒரு commit அது செய்யும்
  மாற்றத்தின் அடிப்படையில் மதிப்பிடப்படுகிறது. Flag இல்லாமல் உள்ளூர் இயக்கம் release முறையாகும்;
  அப்போது `llm.txt` மூலக் கோப்பைத் திருத்தும் ஒரு merge செய்யப்பட்ட PR, அந்த wave இயங்கும் வரை
  அதே base-இல் பின்னர் வரும் ஒவ்வொரு commit-ஐயும் தடுத்துவிடும். Husky hook இயக்கும் mode-aware
  gate எதற்கும் இதே விதி பொருந்தும்: hook `--mode=pr`-ஐ வழங்கும், மேலும் strict தீர்ப்பு
  release-mode இயக்கங்களுடனேயே இருக்கும் (release PR, `main`-க்கு push, வழக்கமான உள்ளூர் இயக்கம்).
- Mirror-content unit tests (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`,
  `resilience-pre-dispatch-docs-mirrors`, `cli-env-quality-docs-mirrors`,
  `docs/*-locales`) — release முறையில் ஒவ்வொரு locale-ஐயும் உறுதிப்படுத்துகின்றன. PR முறை,
  `.i18n-state.json`-ன் படி ஆங்கில மூலத்துடன் தற்போதைய நிலையில் இருக்கும் mirrors-ஐ மட்டும்
  உறுதிப்படுத்துகிறது (முழுக் கோப்பு hash, அல்லது test pin செய்யும் section-ன் பதிவு செய்யப்பட்ட
  section hash) மற்றும் பழையவற்றை ஒரு காரணத்துடன் skip செய்கிறது. `target_hash` provenance
  சரிபார்ப்புகள் இரு முறைகளிலும் ஒவ்வொரு locale-க்கும் இயங்குகின்றன. Freshness ஒவ்வொரு `## `
  section-க்கும் தனித்தனியாகும்; unit `run-translation.mjs` hash செய்கிறது. நீண்ட section
  (இந்தக் கோப்பின் gate inventory அதன் சுமார் பாதியாகும்) என்றால், அதிலுள்ள எந்தத் திருத்தமும்
  அந்த mirrors-ஐ பழையதாகிவிடச் செய்கிறது; அடுத்த wave வரை அவற்றின் PR-mode assertions skip ஆகும்.
  ஆங்கில மூலத்தில் anchor இனி இல்லையெனில், முழுக் கோப்பு ஒப்பீடு பயன்படுத்தப்படும்.
- `i18n translation drift` — PR-களில் advisory, push, nightly மற்றும் release cut நேரங்களில்
  strict ஆகும்; இதனால் பழைய mirror release-இல் ship ஆகாது.

`scripts/i18n/sync-llm-mirrors.mjs` (`syncLlmMirrors()` ஆகவும் export செய்யப்படுகிறது,
`--dry-run` உடன்) `llm.txt` mirrors-ஐ மீண்டும் எழுதுகிறது; release refresh, translation wave
மற்றும் திட்டமிடப்பட்ட `i18n-mirror-refresh.yml` ஆகியவை இதை இயக்குகின்றன (drift report அவற்றைப்
பட்டியலிடாததால், refresh dry run மூலம் பழைய `llm.txt` mirrors-ஐக் கண்டறிந்து, பின்னர்
`check:docs-all`-க்கு முன் அவற்றை sync செய்கிறது).

`docs/diagrams/` கீழுள்ள பன்னிரண்டு README SVGகள் உருவாக்கப்பட்டவை
(`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` அனைத்தையும் மீண்டும்
உருவாக்குகிறது). ஒவ்வொன்றுக்கும் byte-compare unit test உள்ளது
(`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`); release முறையில் commit செய்யப்பட்ட
கோப்பு பழையதாக இருந்தால் அது fail ஆகும். PR-இல், `check:generated-artifacts` PR திருத்திய
SVG-ஐ மதிப்பிடுகிறது; base-ன் drift release refresh-க்கு விடப்படுகிறது
([உருவாக்கப்பட்ட கோப்புகள் மற்றும் release-இல் எழுதப்படும் derived baselines](#generated-files-and-derived-baselines-written-at-release)) — மேலும்
`check:docs-counts` அவற்றின் `<text>` nodes-லிருந்து canonical எண்களைப் படிக்கிறது — அதனால்
outlining step, outline செய்யப்பட்ட ஒவ்வொரு string-ஐயும் கோப்பில் invisible `<text>` ஆக வைத்திருக்கிறது.
SVG canonical-numbers check, `SVG_DIAGRAM_FILES`-ல் பட்டியலிடப்பட்ட கோப்புகளைப் படிக்கிறது
(`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, மேலும் `public/images/tier-flow-dark.svg` மற்றும்
`tier-flow-light.svg`; free-forever, catalog-entry, recurring-pool மற்றும் scoring-factors
claims ஆகியவை `promise-pillars.svg`, `free-tier-budget.svg` மற்றும் `strategies-grid.svg`-ஐயும்
படிக்கின்றன. இந்த generators வரையும் counts (provider total, MCP tools, routing strategies,
free-forever providers, …) literals-லிருந்து அல்ல; `scripts/docs/readmeFacts.mjs` வழியாக
facts snapshot `docs/reference/derived-facts.json`-லிருந்து வருகின்றன. எனவே எந்தக் கிளையிலும்
ஒரு diagram-ஐ மீண்டும் உருவாக்கினால் commit செய்யப்பட்ட கோப்பு மீண்டும் உருவாகும்.
`free-tier-budget.svg`, அதே snapshot-இலிருந்து (`code.freeTierBudget`, facts probe பதிவு செய்யும்
catalog summary) அதன் rows-ஐ வரைகிறது; ஆகவே `FREE_MODEL_BUDGETS`-இல் மாற்றம் ஏற்பட்டால்,
CI-ஐ red ஆக்குவதற்குப் பதிலாக அடுத்த refresh-இல் card-ஐ அடையும்.

### Derived values: `pr` மற்றும் `release` gate modes

ஒரு feature PR, அதன் base-ன் நிலையைச் சார்ந்த எந்த value-ஐயும் எழுதாது: provider, migration,
MCP-tool மற்றும் strategy counts, README SVG எண்கள், facts snapshot. ஒரே step இவை அனைத்தையும்
மீண்டும் கணக்கிடுகிறது; release மற்றும் nightly derived-refresh PR இயக்கும்
`npm run release:refresh-derived` இதைச் செய்கிறது. ஆகவே **releases-க்கு இடையில் base, live
code-ஐவிடப் பின்தங்கியிருப்பது திட்டமிட்டதே**, மேலும் live code-உடன் tree-ஐ ஒப்பிடும் gate அல்லது
test, sibling ஒன்று provider-ஐச் சேர்த்த பிறகு வரும் ஒவ்வொரு PR-லும் red ஆகிவிடும். Derived
values-ஐ மதிப்பிடும் gates, `scripts/check/lib/gateMode.mjs` மூலம் தீர்மானிக்கப்படும் இரு
முறைகளில் ஒன்றில் இயங்குகின்றன (முதல் பொருத்தமே வெல்லும்):

1. கட்டளை வரியில் `--mode=pr|release`;
2. `OMNIROUTE_GATE_MODE` environment variable (`pr` அல்லது `release`);
3. GitHub Actions event-இலிருந்து தானாக: head `release/v*` அல்லாத `pull_request`,
   `merge_group`, அல்லது `omni-queue/**`-க்கு push → `pr`; மற்ற அனைத்தும் (push, schedule,
   dispatch, release PR `release/v* → main`, எந்த உள்ளூர் இயக்கமும்) → `release`.

ஒவ்வொரு முறையிலும் `check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) எப்போது
fail ஆகிறது:

| Mode      | Fails                                                                                                                                                                                                                                                                                                                                                                                                                                              | Needs the live facts |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `release` | ஒவ்வொரு சரிபார்ப்பும், மரத்திலிருந்து சேகரிக்கப்பட்ட உண்மைகளுக்கு எதிரான கடுமையான சமத்துவச் சரிபார்ப்பு (கேட் எப்போதும் கொண்டிருந்த நடத்தை): காலாவதியான எண்ணிக்கை, பதிப்பு, கவரேஜ் குறைந்தபட்சம் அல்லது SVG எண் ஆகியவற்றில் ஏதேனும் STRICT drift ஆகும்                                                                                                                                                                                             | ஆம்                  |
| `pr`      | மாற்றம் செய்தவை மட்டுமே, அதே claim extractors-ஐப் பயன்படுத்தி PR base-க்கு எதிராக diff செய்யப்படும்: (1) அந்தச் சரிபார்ப்பு மற்றும் கோப்புக்கான base-ல் இல்லாத managed value ("PR edited a managed number — restore the line to the base text"); (2) base-ல் இருந்தும் head-ல் காணாமல் போன required claim. உண்மைகள் தேவையில்லாத content invariants, release mode-ல் இயங்குவது போலவே இயங்கும்; release-only checks பட்டியலிடப்பட்டு தவிர்க்கப்படும் | இல்லை                |

Agent-instruction கோப்புகளில் எந்த derived count-மும் இல்லை: `AGENTS.md`, `llm.txt` (மற்றும் அதன்
`docs/i18n/*/llm.txt` பிரதிகள்), bs `AGENTS.md` fork, `open-sse/services/AGENTS.md`,
`src/shared/constants/agentSkills.ts`, `skills/README.md` மற்றும் ஒவ்வொரு `skills/*/SKILL.md` கோப்பும்
மூலத்தையும் (உதாரணமாக `ROUTING_STRATEGY_VALUES` in `src/shared/constants/routingStrategies.ts`), மேலும்
`npm run facts`-ஐயும் சுட்டிக்காட்டுகின்றன. "No derived counts (agent-instruction file …)" என்ற invariant,
இரு modes-லும் அங்குள்ள எந்த count-ஐயும் (providers, migrations, MCP tools மற்றும் scopes,
routing strategies, scoring factors, mode packs) கண்டால் தோல்வியடையும்; ஆகவே release refresh,
instruction file-ஐ மீண்டும் எழுத வேண்டியதில்லை.

`pr` mode-ல் writer branches managed values-ஐத் திருத்தலாம்: `chore/derived-*` (nightly refresh
PR), `release/v*`, மற்றும் translation waves `docs/i18n-*` மற்றும் `chore/i18n-*`
(`scripts/check/lib/derivedClaimsDiff.mjs`). Queue batches (`merge_group`, Mergify drafts,
`omni-queue/**`) மீண்டும் மதிப்பிடப்படாது: gate ஏற்கனவே ஒவ்வொரு PR-ஐத் தனித்தனியாக மதிப்பிட்டவற்றை
அவை தொகுக்கின்றன.

Exit codes: `0` clean · `1` STRICT drift (அல்லது `--strict` உடன் soft drift) அல்லது managed-value
violation · `2` infrastructure — code facts சேகரிக்க முடியவில்லை (tsx probe தோல்வியடைந்தது அல்லது
timeout ஆனது; timeout என்பது `OMNIROUTE_FACTS_TIMEOUT_MS`, இயல்புநிலை 600000 ms) அல்லது, CI-ல், PR diff
base-ஐ resolve செய்ய முடியவில்லை. Exit 2 ஒருபோதும் documentation divergence அல்ல: job-ஐ மீண்டும்
இயக்கவும் அல்லது environment-ஐச் சரிசெய்யவும்.

ஒவ்வொரு mode இயங்கும் இடங்கள்:

| Where                                                                                                 | Mode                                                                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Feature PR — `ci.yml` job `docs-sync-strict`, `quality.yml` step "Docs accuracy"                      | `pr` (தானாக); job base-ஐ `BASE_SHA` ஆக வழங்கி, `fetch-depth: 2` உடன் checkout செய்கிறது                                                                                                                        |
| `merge_group`, `omni-queue/**` candidates, merge train-ன் முழு gate list                              | `pr`                                                                                                                                                                                                           |
| Release PR (`release/v* → main`), pushes, scheduled மற்றும் manual runs                               | `release`                                                                                                                                                                                                      |
| Release-Green (`scripts/quality/validate-release-green.mjs`)                                          | HARD items `OMNIROUTE_GATE_MODE=pr` உடன் இயங்கும் ("did the base break?"); DRIFT item `derived-refresh`, `npm run release:refresh-derived -- --check`-ஐ இயக்கும் (strict view, base-red-ஐ ஒருபோதும் திறக்காது) |
| Release (`/generate-release` phases 0a மற்றும் 1; skill wiring என்பது தனி owner-approved change)      | `npm run release:refresh-derived` derived files-ஐ எழுதும்; release PR-ன் சொந்த checks பின்னர் `release` mode-ல் இயங்கும்                                                                                       |
| `nightly-derived-refresh.yml` (தினசரி, உயர்ந்த `release/vX.Y.Z`, release-freeze கீழ் தவிர்க்கப்படும்) | `npm run release:refresh-derived -- --profile=nightly`; diff இருந்தால் `chore/derived-refresh` இலிருந்து ONE PR-ஐ open நிலையில் வைத்திருக்கும்; ஒருபோதும் merge செய்யாது                                       |

இதற்குப் பின்னால் இயங்கும் commands:

- `npm run facts` பெறப்பட்ட ஒவ்வொரு எண்ணையும் JSON ஆக அச்சிடுகிறது (`scripts/release/facts.mjs`).
  `--key=code.mcpTools` ஒரு மதிப்பை அச்சிடுகிறது, `--snapshot` நேரடி மரத்திற்குப் பதிலாக
  commit செய்யப்பட்ட snapshot-ஐப் படிக்கிறது. facts-ஐச் சேகரிக்க முடியாவிட்டால் வெளியேறும் குறியீடு 2.
- `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) பெறப்பட்ட கோப்புகளை ஒரே
  செயல்பாட்டில், பின்வரும் வரிசையில் மீண்டும் கணக்கிடுகிறது (`--only=`-க்கான படி ID-கள்):
  `provider-reference`
  (`docs/reference/PROVIDER_REFERENCE.md`), `facts` (snapshot), `numbers` (counts gate-ன்
  rewrite plan-ஐ docs-ல் செயல்படுத்தி, பின்னர் அவற்றின் `docs/i18n/` பிரதிகளிலும் செயல்படுத்துகிறது),
  `readme-diagrams`, `skills` (உருவாக்கப்பட்ட `SKILL.md`), `e2e-timings` (மரம்
  `syncE2eTimings`-ஐ வழங்கும் வரை தவிர்க்கப்படுகிறது), `ui-keys` (`en.json`-ல் நீக்கப்பட்ட keys-ஐ
  அகற்றி, `--rewritten-since=<ref>` — இயல்புநிலை `origin/main` — வழங்கப்பட்டால், கடைசி release-க்கு
  பிறகு மீண்டும் எழுதப்பட்ட English values-ஐ மீண்டும் வரிசைப்படுத்துகிறது),
  `llm-mirrors` மற்றும் `verify-generated` (எழுதிய பிறகு, release mode-ல்
  `check:generated-artifacts` மற்றும் `check:agent-skills-sync` வெற்றியடைய வேண்டும்; `--check`-ல்
  மற்றும் `--only` இதை விலக்கும்போது தவிர்க்கப்படும்; தோல்வி ஏற்பட்டால் வெளியேறும் குறியீடு 2).
  `changelog` படி opt-in (`--with-changelog`, release profile மட்டும்). `--profile=nightly`
  எந்த version claim-ஐயும் தொடாது. `-- --check` உடன் இது எதையும் எழுதாது; எந்தக் கோப்பும்
  மாற வேண்டியிருந்தாலோ அல்லது நிர்வகிக்கப்படும் மதிப்புக்கு கைமுறைத் திருத்தம் தேவைப்பட்டாலோ
  இரண்டையும் பட்டியலிட்டு வெளியேறும் குறியீடு 1 வழங்கும்; infrastructure தோல்விக்கு வெளியேறும்
  குறியீடு 2. `--json` முடிவை JSON ஆக அச்சிடுகிறது.
- `docs/reference/derived-facts.json` என்பது கடைசி refresh பயன்படுத்திய facts-ன் snapshot ஆகும்.
  இதை refresh மட்டுமே எழுதும். README SVG generators இதைப் படிக்கின்றன; PR நேர unit tests
  commit செய்யப்பட்ட docs மற்றும் உருவாக்கப்பட்ட கோப்புகளை live code-உடன் அல்ல, இதனுடன் ஒப்பிடுகின்றன.
  suite-ன் ஒரே live comparison ஆனது `tests/unit/check-docs-counts-sync.test.ts`-ல் உள்ள
  "the release refresh closes the cycle" ஆகும்: live facts உடன், refresh-ன் rewrite plan-ஐ
  memory-யில் செயல்படுத்தியபோது அது தெரிவிக்காத STRICT drift எதுவும் மீதமிருக்காது; மேலும்
  மீண்டும் திட்டமிடும்போது எதுவும் மாறாது.

உள்ளூரில் மீண்டும் உருவாக்க (local run இயல்பாக `release`-க்கு அமையும்):

```bash
npm run check:docs-counts                                       # release: strict, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # feature PR எதன் அடிப்படையில் மதிப்பிடப்படுகிறது
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # release எதை மீண்டும் எழுதும்
```

தீர்க்கக்கூடிய base இல்லாதபோது (`BASE_SHA`/`BASE_REF` இல்லை, உள்ளூர்
`origin/release/v<version>` இல்லை), உள்ளூர் `pr` run எச்சரிக்கையை அச்சிட்டு diff-ஐத் தவிர்க்கும்;
தோல்வியடையாது.

### Job: `i18n-ui-coverage`

| Script                            | Validates                                                                                                                                                                                                                                  | Blocking                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| `check-ui-keys-coverage` (inline) | UI i18n key coverage ≥ 65% ஆக இருப்பதைச் சரிபார்க்கிறது                                                                                                                                                                                    | Yes (both modes)        |
| `check:ui-icu`                    | ஒவ்வொரு UI catalog-இன் ஒவ்வொரு message-உம் `IntlMessageFormat` மூலம் compile ஆகிறதா என்பதைச் சரிபார்க்கிறது                                                                                                                                | Yes (both modes)        |
| `check-ui-value-drift` (inline)   | மீண்டும் எழுதப்பட்ட English **value** பழைய translation-ஐ விட்டுச் செல்லவில்லை என்பதைச் சரிபார்க்கிறது                                                                                                                                      | Yes (release mode only) |
| `check-new-key-coverage` (inline) | **புதிய** English key ஒவ்வொரு locale-லும் மொழிபெயர்க்கப்பட்டுள்ளதா என்பதைச் சரிபார்க்கிறது — `__MISSING__:` marker நிராகரிக்கப்படுகிறது                                                                                                    | Yes (release mode only) |
| `check-key-completeness` (inline) | ஒவ்வொரு UI catalog-உம் (மற்றும் `--catalog=cli` உடன் ஒவ்வொரு CLI catalog-உம்) அதன் `en.json`-ன் key set-ஐத் துல்லியமாகக் கொண்டிருக்கிறது; `pr` mode-ல், PR மாற்றிய ஒவ்வொரு catalog-உம் merge base-க்கு எதிராகத் தன்னைத்தானே சரிபார்க்கிறது | Yes (both modes)        |
| `check-translation-ratio`         | ஒவ்வொரு locale-க்குமான உண்மையான translation ratio (allowlist-க்கு வெளியே உள்ள English-க்கு ஒத்த / placeholder / missing) `config/quality/i18n-translation-baseline.json` + slack-ஐ மீறக்கூடாது                                             | Yes (release mode only) |

`fetch-depth: 0` தேவை — value-drift gate, merge base-க்கு எதிராக `en.json`-ஐ diff செய்கிறது.

**இரண்டு modes (2026-11-13 முதல்).** ஒரு feature PR `en.json`-ல் (மற்றும்
`bin/cli/locales/en.json`-ல்) keys-ஐச் சேர்க்கிறது அல்லது மீண்டும் எழுதுகிறது; வேறு எந்த locale-ஐயும்
தொடாது; `check:pr-derived-paths` (`pr-test-policy` job,
`config/quality/derived-paths/translation.json` family) அதைச் செய்யும் feature PR-ஐ
தோல்வியடையச் செய்கிறது. மற்ற locales ஒவ்வொரு release-லும் ஒருமுறை
`release:refresh-derived` மூலம் நிறைவு செய்யப்படுகின்றன; இது
`scripts/i18n/sync-ui-keys.mjs`-ல் உள்ள `syncUiKeys()`-ஐ அழைக்கிறது (காணாமல் போன keys-ஐச்
சேர்க்கிறது, நீக்கப்பட்டவற்றை அகற்றுகிறது, மீண்டும் எழுதப்பட்ட English-ன் translations-ஐ
`rewrittenSinceRef` மூலம் குறிக்கிறது, மொழிபெயர்க்கிறது), அல்லது translation wave மூலம் நிறைவு
செய்யப்படுகின்றன. Gates, `scripts/check/lib/gateMode.mjs`-ல் இருந்து mode-ஐப் படிக்கின்றன:
`pr` mode-ல் (feature PRs, `merge_group`, `omni-queue/**`) மேலே உள்ள release-mode gates
`SKIP reason=pr-mode`-ஐ அச்சிட்டு 0-ஐ வழங்குகின்றன; `release` mode-ல் (release PR,
`main`-க்கு pushes, `workflow_dispatch`, local runs) அவை முன்புபோல strict-ஆக இருக்கும்; மேலும்
release PR-ல் diff-aware gates-க்கு `BASE_REF=origin/main` வழங்கப்படுவதால், cycle சேர்த்த அல்லது
மீண்டும் எழுதிய ஒவ்வொரு key-ஐயும் அவை மதிப்பிடுகின்றன. `--mode=pr` மூலம் feature-PR verdict-ஐ
உள்ளூரில் முன்னோட்டமிடலாம்.

`pr` முறையில் locale catalogs-ஐ இன்னும் மாற்றும் PR (translation wave, release refresh, translation-only fix) தவிர்க்கப்படாது: `check-key-completeness`, அது மாற்றிய ஒவ்வொரு catalog-ஐ merge base-இல் உள்ள அதே catalog-உடன் (`scripts/i18n/lib/touched-catalogs.mjs`) ஒப்பிட்டு மதிப்பிடும்; catalog இழந்த key, `en.json`-இல் இல்லாத key, உண்மையான மொழிபெயர்ப்பு `__MISSING__:` marker-ஆக அல்லது ஆங்கில உரையாக மாறியது, அல்லது PR தொடாத ஆங்கில string-இன் placeholders/tags-ஐ இனி interpolate செய்யாத value ஆகியவற்றில் ஏதேனும் இருந்தால் தோல்வியடையும். PR-இல் புதிதாக சேர்க்கப்படும் catalog, முழு `en.json` key set-ஐ கொண்டிருக்க வேண்டும். PR தொடும் catalogs-க்கு ratio மற்றும் CLI-parity gates காண்பவற்றை இது உள்ளடக்குகிறது.

Locale-parity unit tests (`cli-i18n-catalog`, `i18n-pt-br`, `i18n-vi-completeness`, `i18n-placeholder-parity`), `tests/_helpers/localeParityMode.ts` வழியாக இதே modes-ஐப் பின்பற்றுகின்றன: `pr` முறையில் key-parity assertions-ஐத் தவிர்த்து, merge base-இலிருந்து ஆங்கிலம் மாறிய keys-க்கான placeholder parity-ஐ release refresh-க்கு விட்டுவிடுகின்றன (unit-test job-இன் shallow checkout அதைப் படிக்க முடியாதபோது ஒவ்வொரு key-க்கும்). அந்த helper மட்டுமே அனுமதிக்கப்பட்ட mode-conditional skip: `check:test-masking`, `.skip(` மற்றும் `{ skip: true }` ஆகியவற்றைக் கணக்கிடும், ஆனால் அது திருப்பி அளிக்கும் computed `{ skip: "<reason>" }`-ஐ கணக்கிடாது; ஆகவே `tests/unit/locale-parity-mode.test.ts`, இதைப் பயன்படுத்த அனுமதிக்கப்பட்ட tests-ன் பட்டியலை நிலைநிறுத்துகிறது — ஒன்றைச் சேர்ப்பது அந்தப் பட்டியலில் மதிப்பாய்வு செய்யப்பட்ட திருத்தமாகும்.

#### `check-ui-value-drift` — காலாவதியான மொழிபெயர்ப்பு gate

மற்ற gates கட்டமைப்பு ரீதியாகக் கண்டறிய முடியாத ஒரே i18n regression-ஐ இது கண்டறிகிறது: ஆங்கில value மறுஎழுதப்பட்டபோதும், முந்தைய ஆங்கிலத்திலிருந்து பெறப்பட்ட மொழிபெயர்ப்புகள் மாற்றமின்றி பின்னால் தங்கிவிடுகின்றன; இதனால் ஆங்கிலம் அல்லாத பயனர்கள் நம்பிக்கையுடன் எழுதப்பட்ட, ஆனால் இப்போது தவறான உரையைத் தொடர்ந்து படிக்கிறார்கள்.

இது உண்மையான production-ல் நடந்தது. Antigravity login helper வந்தபோது (`#5203`) `oauthModal.googleOAuthWarning` மறுஎழுதப்பட்டது; **43 locales-ல் 39** locales, operators-ஐ "copy the full URL and paste it below" என்று சொல்லும் உரையைத் தொடர்ந்து வைத்திருந்தன — அந்த provider-க்கு நிறைவு செய்ய முடியாத flow. இது #8463 வரை கவனிக்கப்படவில்லை, காரணங்கள்:

- `sync-ui-keys`, **இல்லாத** keys-ஐ மட்டுமே backfill செய்கிறது; stale keys-ஐ ஒருபோதும் செய்யாது;
- `check-ui-keys-coverage`, key _presence_-ஐக் கணக்கிடுகிறது; ஆகவே stale translation-ம் covered என மதிப்பெண் பெறுகிறது;
- `check-translation-drift`, `docs/i18n/<locale>/**.md` documentation mirrors-ஐக் கண்காணிக்கிறது — அது `src/i18n/messages/*.json`-ஐ ஒருபோதும் படிப்பதில்லை. இது `docs-sync-strict` job-இல் இயங்குகிறது: PR-களில் advisory, push மற்றும் nightly-ல் strict; translation wave mirrors-ஐ refresh செய்கிறது, feature PR-ஐ அல்ல.

**Diff-aware, baseline-backed அல்ல.** இது merge base-இல் உள்ள `en.json`-ஐ working tree-யுடன் ஒப்பிடுகிறது; ஆங்கில value மாறிய ஒவ்வொரு key-க்கும், இன்னும் untouched translation வைத்திருக்கும் locale stale ஆகும். இது ஏற்கெனவே உள்ள debt-ஐ வேண்டுமென்றே **freeze** செய்கிறது — நீண்டகாலமாக உள்ள translation எந்தப் பழைய ஆங்கிலத்திலிருந்து வந்தது என்பதை diff வெளிப்படுத்த முடியாது; ஆகவே தற்போதைய மாற்றம் தொடும் விஷயங்களை மட்டுமே gate மதிப்பிடுகிறது. மாற்று வழியான per-key hash baseline-க்கு சுமார் 600 KB generated file தேவைப்படும்; அது ஏற்கெனவே உள்ள மிகப்பெரிய baseline-ஐ விட 3× பெரியது, மேலும் ஒவ்வொரு i18n PR-லும் மாற்றங்களை உருவாக்கும்.

இதை நிறைவேற்ற இரண்டு வழிகள் உள்ளன:

1. பாதிக்கப்பட்ட மொழிபெயர்ப்புகளைப் புதுப்பிக்கவும், அல்லது
2. அவற்றை `__MISSING__:<new english>` ஆக அமைக்கவும் — runtime பின்னர் திருத்தப்பட்ட ஆங்கிலத்தை வழங்கும் (`src/i18n/request.ts::deepMergeFallback`, #7258), மேலும் அந்த key மொழிபெயர்ப்புக்கான queue-ல் சேரும்.

String-ன் **பொருள்** மாறியிருந்தால், key-ஐ **மறுபெயரிடுவதை** விரும்பவும்: புதிய key-க்கு stale translation மரபாக வர முடியாது. #8463 பயன்படுத்திய pattern இதுதான்.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Base catalog-ஐப் படிக்க முடியாதபோது (base ref இல்லாத shallow clone), `check-openapi-breaking` போலவே `SKIP reason=base-unresolved` உடன் 0-ஆக வெளியேறும். Release mode-ல் மட்டும்: feature PR ஆங்கிலத்தை மறுஎழுதி அங்கேயே நிற்கிறது; release refresh அது விட்டுச் சென்ற மொழிபெயர்ப்புகளைக் குறிக்கும் (`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`, அதே `findStaleTranslations`).

### Job: `i18n`

முழுமையான i18n validation matrix (ஒவ்வொரு locale-க்கும் ஒரு job). முழு job-மும் advisory.

| Script                          | Validates                                   | Blocking                                                |
| ------------------------------- | ------------------------------------------- | ------------------------------------------------------- |
| `validate_translation.py quick` | ஒவ்வொரு locale-க்குமான மொழிபெயர்ப்பு முழுமை | **Advisory** (முழு job-இலும் `continue-on-error: true`) |

### Job: `pr-test-policy`

Pull request-களில் மட்டும் இயங்கும்.

| Script                 | Validates                                                                                                                                                   | Blocking |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, அல்லது `bin/`-இல் production code-ஐ மாற்றும் PR-கள் tests-ஐச் சேர்க்க வேண்டும் அல்லது புதுப்பிக்க வேண்டும் (Hard Rule #8) | ஆம்      |
| `check:test-masking`   | மாற்றப்பட்ட test files net assert count-ஐக் குறைக்கவில்லை அல்லது `assert.ok(true)` tautologies-ஐச் சேர்க்கவில்லை                                            | ஆம்      |
| `check:pr-evidence`    | மாற்றத்திற்கான test/VPS evidence-ஐ PR body குறிப்பிடுகிறது (PR prose-ஐ grep செய்வதன் மூலம் Hard Rule #18-ஐ mechanize செய்கிறது — fragile, see Backlog)      | ஆம்      |

### Job: `test-vitest`

`build`-க்கு பிறகு இயங்கும். தோல்வியுற்றால் merge-ஐத் தடுக்கும்.

| Suite            | சரிபார்ப்பது                                            | தடுக்கும்                                                                                                                                  |
| ---------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP server (110 tools), autoCombo, கேச் — vitest இயக்கி | ஆம்                                                                                                                                        |
| `test:vitest:ui` | UI component tests — vitest இயக்கி                      | **தடுக்கும்** — முன்பே இருந்த தோல்விகள் `vitest.config.ts` இல் வெளிப்படையாக விலக்கப்பட்டுள்ளன; புதிய தோல்விகள் job-ஐ தோல்வியடையச் செய்யும் |

### இரவுநேர workflows (அட்டவணைப்படி, ஆலோசனைக்குரியவை)

இவை cron அட்டவணையிலும் (`workflow_dispatch`) இயங்கும்; PR-களில் ஒருபோதும் இயங்காது. அனைத்தும் ஆலோசனைக்குரியவை.

| Workflow               | சரிபார்ப்பது                                                                                                                                                                   | தடுக்கும்           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| `nightly-property`     | சீரற்ற seed + அதிக இயக்க எண்ணிக்கையுடன் fast-check property tests                                                                                                              | **ஆலோசனைக்குரியது** |
| `nightly-resilience`   | heap-growth gate, chaos fault-injection, k6 load/soak                                                                                                                          | **ஆலோசனைக்குரியது** |
| `nightly-llm-security` | promptfoo injection guard (block mode) + garak probes (provider secret இல்லையெனில் தவிர்க்கப்படும்)                                                                            | **ஆலோசனைக்குரியது** |
| `nightly-schemathesis` | `docs/openapi.yaml` ஐப் பயன்படுத்தி இயங்கும் OmniRoute-க்கு எதிரான OpenAPI contract fuzzing (schemathesis) — spec மீறல்கள் / கையாளப்படாத 500s (Fase 8 B.4) வெளிப்படுத்தப்படும் | **ஆலோசனைக்குரியது** |
| `nightly-mutation`     | fast unit lane முழுவதும் Stryker mutation-testing score — உயிர்வாழும் mutants பலவீனமான asserts-ஐ வெளிப்படுத்தும்                                                               | **ஆலோசனைக்குரியது** |
| `nightly-compat`       | ஆதரிக்கப்படும் `engines.node` வரம்புகள் முழுவதும் Node engine compatibility matrix                                                                                             | **ஆலோசனைக்குரியது** |

செயல்திறன் அடிப்படைகள் (heap, TTFB, build time) பதிவு செய்யப்படுகின்றன; அவை gate செய்யப்படுவதில்லை: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) ஐப் பார்க்கவும்.

---

## வேகநிலை (2026-08-30 → v4.0 LTS): ஒவ்வொரு அடிப்படையும் 20% தளர்த்தப்பட்டது

உரிமையாளரின் முடிவு (2026-08-30): v4.0 மாடுலராக்கம் முடியும் வரை, கடன் வரம்பைத்
தக்கவைப்பதைவிட வெளியீட்டு வேகம் முக்கியம். ஒவ்வொரு **எண்ணியல்** ratchet அடிப்படையும் ஒரே
தணிக்கை செய்யக்கூடிய செயல்பாட்டில் 20% தளர்த்தப்பட்டது, மேலும் இந்த நிலை
`config/quality/quality-baseline.json` இல் அறிவிக்கப்பட்டுள்ளது:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| மாற்றம்                                                                                                                                                                                                                         | இருப்பிடம்                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — குறைவாக இருப்பது சிறந்த எண்ணிக்கைகள் ×1.2, அதிகமாக இருப்பது சிறந்த சதவீதங்கள் ÷1.2 (coverage floor 60 தக்கவைக்கப்பட்டது, `eslintErrors` தொடர்ந்து 0, `eslintWarnings` 0 → உறைந்த suppression count-இன் 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` குறிப்பு ஒவ்வொரு before → after-ஐயும் பட்டியலிடுகிறது) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                | `complexity-baseline.json`, `duplication-baseline.json`                                                      |
| `cap`, `testCap`, ஒவ்வொரு `frozen[*]` / `testFrozen[*]` வரி வரம்பும் ×1.2                                                                                                                                                       | `file-size-baseline.json`                                                                                    |
| ஒவ்வொரு கோப்பு / ஒவ்வொரு TS-code எண்ணிக்கையும் ×1.2                                                                                                                                                                             | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`       |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                             | `scripts/check/check-openapi-coverage.mjs`                                                                   |
| `_policy.requireTighten === false` ஆக இருக்கும்போது `--require-tighten` அறிவுறுத்தலாக மாறுகிறது                                                                                                                                 | `scripts/quality/check-quality-ratchet.mjs`                                                                  |
| nightly `bank-ratchet-shrinks` இடைநிறுத்தப்படுகிறது (அது அளவிடப்பட்ட சுருக்கத்தை bank செய்து, கூடுதல் headroom-ஐ நீக்கிவிடும்)                                                                                                  | `.github/workflows/nightly-release-green.yml`                                                                |

Allowlist-கள் (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **budgets அல்ல**, அவற்றில் எந்த மாற்றமும் செய்யப்படவில்லை. Pass/fail policy gates (secrets, SQL rules,
docs/env contract, i18n parity, unit tests) மாற்றமின்றி உள்ளன — தோல்வியடைந்த test தொடர்ந்து தோல்வியடைந்த test-ஆகவே இருக்கும்.

**கருவிகள்**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — ஒருமுறை மட்டுமே செய்யப்படும்
  தளர்த்தல் (`scripts/quality/relax-baselines.mjs`); அதே note-ஐ பயன்படுத்தி இரண்டாவது முறை இயக்க மறுக்கும்.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  CI செய்வதைப் போல ஒவ்வொரு எண்ணியல் gate-ஐயும் அளந்து, ஒவ்வொரு gate-க்கும் மீதமுள்ள headroom-ஐ அச்சிடுகிறது
  (`scripts/quality/baseline-headroom.mjs`). nightly `baseline-headroom` job workflow run summary-யில்
  அட்டவணையை வெளியிடுகிறது, மேலும் அதன் JSON/Markdown அறிக்கையை
  `baseline-headroom-<run_id>` ஆகப் பதிவேற்றுகிறது; அவை 90 நாட்கள் தக்கவைக்கப்படும். Warning மற்றும் critical வரிசைகள்
  தங்கள் cap-இன் 10% வரம்புக்குள் உள்ள அல்லது ஏற்கனவே அதை மீறிய gate-களை அடையாளம் காட்டுகின்றன. Budgets
  பயன்படுத்தப்படுவதற்கான ஆரம்ப எச்சரிக்கையாக இந்த அறிக்கைகளை மதிப்பாய்வு செய்யுங்கள்; பாதிக்கப்பட்ட gate-இன்
  `_rebaseline_*` குறிப்புகளைப் பரிசோதிக்கவும். இந்த job இனி நிரந்தர issue-ஐ உருவாக்கவோ புதுப்பிக்கவோாது; முந்தைய
  அறிக்கை வரலாற்றை #12149 பாதுகாக்கிறது.

**புதிய-குறியீட்டு முறை (Clean-as-You-Code) — 2026-08-30 முதல், PR fast-path மட்டும்**

`pull_request` நிகழ்வுகளில் `quality.yml`, `check:file-size`,
`check:complexity-ratchets` மற்றும் `check:dead-code` ஆகியவற்றுக்கு `--base-ref <PR base SHA>`-ஐ வழங்குகிறது.
`check:complexity-ratchets` மற்றும் `check:dead-code` ஆகியவற்றுக்கு, gate HEAD-ஐ merge-base-உடன் ஒப்பிடுகிறது,
ஆனால் PR மாற்றிய கோப்புகளுக்கு மட்டும் வரையறுக்கப்படுகிறது
(`scripts/check/newCodeMode.mjs`: merge-base தற்காலிகமாக உருவாக்கப்படும்
`git worktree`-ல் materialize செய்யப்படுகிறது, அங்கு மற்றும் HEAD-ல் ESLint/knip இயக்கப்பட்டு, ஒவ்வொரு கோப்பின் எண்ணிக்கைகளும் diff செய்யப்படுகின்றன):

- **தடுக்கும்** — PR மாற்றிய கோப்புகளில் cyclomatic/cognitive violations அல்லது dead exports-ஐ PR சேர்த்திருந்தால்
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` log-ல்);
- **அறிவுறுத்தல்** — frozen baseline-க்கு எதிரான global total. மரபாக வந்த drift, குற்றமற்ற PR-ஐ ஒருபோதும் red ஆக்காது;
  release reconciliation-ல் drift மீண்டும் freeze செய்யப்படுகிறது, மேலும் headroom job மூலம் கண்காணிக்கப்படுகிறது.

`check:file-size` base ref-ஐ அதன் சொந்த விதிமுறைகளின்படி பயன்படுத்துகிறது
(`scripts/check/check-file-size.mjs`, #8522):
இது tree-இல் உள்ள ஒவ்வொரு source மற்றும் test கோப்பையும் சரிபார்க்கிறது, `git show` மூலம் PR base-இல்
ஒவ்வொரு கோப்பின் line count-ஐப் படிக்கிறது, மேலும் ஒரு கோப்பு அதன் baseline ceiling-ஐ
(`frozen` / `testFrozen`, அல்லது baseline-க்கு வெளியிலுள்ள கோப்புக்கு `cap` / `testCap`)
மற்றும் அதன் base size ஆகியவற்றில் பெரியதாக இருப்பதைவிட வளர்ந்தால் மட்டுமே தோல்வியடைகிறது.
Base-ல் ஏற்கனவே drift ஏற்பட்ட கோப்பு, ஆகவே குற்றமற்ற PR-ஐ ஒருபோதும் red ஆக்காது.

`check:boundary:ratchet` அதன் ஒற்றை எண்ணுக்கும் அதே விதியைப் பயன்படுத்துகிறது
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR நிகழ்வுகளில், இரண்டும்
`quality.yml` fast-gates மற்றும் `ci.yml` lint job ஆகியவை PR-ன் base SHA-ஐ அனுப்புகின்றன, base commit
`git archive` export-இலிருந்து அளவிடப்படுகிறது, மேலும் அதன்
`open-sse → src` edge எண்ணிக்கை `metrics.boundaryOpenSseToSrc` மற்றும் base-இல் உள்ள எண்ணிக்கை ஆகியவற்றில்
பெரியதைக் கடக்கும்போது மட்டுமே PR தோல்வியடைகிறது. ceiling-ஐ மீறும் base drift தெரிவிக்கப்படுகிறது (`base drift herdado`),
ஆனால் அது குற்றமற்ற PR-ஐ ஒருபோதும் சிவப்பாக்காது; push → main
முழுமையான ceiling-ஐத் தொடர்ந்து பயன்படுத்துகிறது, மேலும் தீர்க்க முடியாத base SHA எச்சரிக்கையுடன் அதற்குத் திரும்புகிறது.

ஒரு omni-queue candidate (`omni-queue/**`-க்கு push, [OMNI_QUEUE.md](../ops/OMNI_QUEUE.md)-ஐப் பார்க்கவும்)
pull request-க்கு இணையான செயல்முறையைப் பெறுகிறது: இரண்டு workflows-உம் candidate base-ஐ
(`needs.changes.outputs.candidateBase`) `--base-ref` ஆக அனுப்புகின்றன, மேலும் `check:ts7-diagnostics-ratchet` அதற்கு எதிராகவும் இயங்குகிறது.
புதிய code-க்கான இரண்டு gates-இல், ஒப்பீட்டுக்கான base அந்த SHA-யே; top merge commit-ன் முதல்
parent அல்ல. ஆகவே batch-இன் ஒவ்வொரு pull request-உம் மதிப்பிடப்படுகிறது.

`workflow_dispatch` runs, release-green sweep மற்றும் nightly headroom job ஆகியவற்றுக்கு PR base இல்லை;
அவை முழுமையான (global) ஒப்பீட்டையே தொடர்ந்து பயன்படுத்துகின்றன. Coverage, duplication மற்றும் type-coverage ஆகியவை
தற்போதைக்கு global-ஆகவே உள்ளன (அவற்றின் tools per-file diff-ஐ மலிவாக உருவாக்குவதில்லை) — இதே சிகிச்சைக்கான
candidate-கள்.

**v4.0-இல் கட்டத்தை நிறைவு செய்தல் (LTS = முன்பைவிடக் கடுமையானது, "இயல்புநிலைக்குத் திரும்புதல்" அல்ல)**

1. தூய `release/v4.0.0` tip-இல்: பதிவுக்காக `npm run quality:headroom --json`-ஐ இயக்கவும், பின்னர்
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, ஒவ்வொரு typecheck gate-இன்
   `--update` ஆகியவற்றை இயக்கவும் — ஒவ்வொரு baseline-உம் அளவிடப்பட்ட மதிப்புக்குக் குறையும்.
2. `quality-baseline.json` இலிருந்து `_policy`-ஐ நீக்கவும் (`--require-tighten` மற்றும் nightly
   banking மீண்டும் செயல்படும்), மேலும் `check-openapi-coverage.mjs`-இல் `THRESHOLD = 36` (அல்லது அதற்கு மேல்) என்பதை மீட்டமைக்கவும்.
3. modularization மூலம் கிடைத்த பலனை அடிப்படையாகக் கொண்டு, அளவிடப்பட்ட மதிப்பை விடக் கடுமையாக்கவும்:
   file-size `cap`-ஐ மீண்டும் 1000 (அல்லது 800) ஆக அமைக்கவும், coverage floors-ஐ +5 ஆக உயர்த்தவும்,
   modularized packages-க்கான dead exports-ஐ 0 ஆக அமைக்கவும்.

## Ratchet அடிப்படை (`quality-baseline.json`)

Ratchet engine (`scripts/quality/check-quality-ratchet.mjs`) ஆனது `quality-baseline.json` கோப்பைப் படித்து,
புதிதாகச் சேகரிக்கப்பட்ட `quality-metrics.json` உடன் ஒப்பிடுகிறது. எந்த அளவீடும் அதன் epsilon-ஐத்
தாண்டி பின்னடைந்தால் build தோல்வியடையும்.

தற்போது கண்காணிக்கப்படும் அளவீடுகள்:

| அளவீடு                | திசை   | பொருள்                                              |
| --------------------- | ------ | --------------------------------------------------- |
| `eslintWarnings`      | `down` | ESLint எச்சரிக்கைகளின் எண்ணிக்கை அதிகரிக்கக் கூடாது |
| `coverage.statements` | `up`   | Statement coverage குறையக் கூடாது                   |
| `coverage.lines`      | `up`   | Line coverage குறையக் கூடாது                        |
| `coverage.functions`  | `up`   | Function coverage குறையக் கூடாது                    |
| `coverage.branches`   | `up`   | Branch coverage குறையக் கூடாது                      |

உண்மையான மேம்பாட்டிற்குப் பிறகு அடிப்படையைப் புதுப்பிக்க:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` flag, தற்போதைய அளவிடப்பட்ட மதிப்புகளை `quality-baseline.json`-க்குள் எழுதுகிறது.
மேம்பாட்டை பதிவு செய்வது release/nightly பணியாகும்; feature PR-க்கான பணி அல்ல: `--require-tighten`
(Fase 6A.5), release mode-ல் (push, schedule, release PR,
local runs) மட்டுமே பதிவு செய்யப்படாத மேம்பாட்டைத் தோல்வியடையச் செய்கிறது. Feature PR-ல் (`pr` gate mode)
அது மேம்பாட்டைத் தகவலாக அச்சிட்டு வெற்றியடைகிறது; regression இரு mode-களிலும் தோல்வியடையும்.
Velocity கட்டத்தில் அது எங்கும் அறிவுறுத்தல் மட்டுமே
(`_policy.requireTighten: false`). இதையும் பார்க்கவும்:
[Generated files and derived baselines](#generated-files-and-derived-baselines-written-at-release).

### CodeQL ratchet: புதுப்பிப்பு இடைவெளியும் கைமுறைத் தூண்டுதலும்

`check:codeql-ratchet` ஆனது **ஒவ்வொரு PR-க்கும் அல்ல, அட்டவணைப்படி புதுப்பிக்கப்படும் repo நிலையைப் படிக்கிறது.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` ஆனது
`state: configured`, `schedule: weekly` எனக் காட்டுகிறது: இது GitHub-ன் default-setup scan,
ஒவ்வொரு push-க்குமான analysis அல்ல. இதன் விளைவு: alert-களை **சரிசெய்யும்** PR merge ஆன பிறகு,
அடுத்த scheduled scan இயங்கும் வரை ratchet பழைய, அதிகமான எண்ணிக்கையையே தொடர்ந்து படிக்கும் — எனவே
scan புதுப்பிக்கப்படும் வரை, சரிசெய்யும் PR-ன் சொந்த follow-up-கள் உட்பட, திறந்திருக்கும் ஒவ்வொரு PR-லும்
regression எனப் புகாரளிக்கும்.

**கைமுறைப் புதுப்பிப்பு**: `gh workflow run codeql.yml --ref release/vX.Y.Z` கட்டளை
analysis-ஐ மீண்டும் இயக்கி, சில நிமிடங்களுக்குள் alert-களை மீண்டும் வெளியிடும். முதலில்
`.github/workflows/codeql.yml`-ஐப் படிக்கவும் — அதன் header, இது **`workflow_dispatch`-மட்டுமே**
என்பதை விளக்குகிறது; காரணம், இது GitHub-ன் **"default setup"** உடன் முரண்படுகிறது
(`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`).
`push`/`pull_request`/`schedule` triggers-ஐ மீட்டமைக்க முதலில் **owner action** தேவை:
Settings → Code security → CodeQL: Default → Advanced. அந்த மாற்றமின்றி `schedule:` trigger-ஐச்
சேர்க்க வேண்டாம் — அது தோல்வியடைந்த runs-ஐ மட்டுமே உருவாக்கும்.

**எண்ணிக்கை குறைந்த பிறகு அடிப்படையை இறுக்கமாக்கவும்** — `node scripts/check/check-codeql-ratchet.mjs
--update` ஆனது புதிய அளவிடப்பட்ட எண்ணிக்கையை `quality-baseline.json` →
`metrics.codeqlAlerts.value`-ல் எழுதுகிறது; இதனால் ratchet பழைய ceiling வரை மீண்டும் உயர்வதை
மறைமுகமாக அனுமதிக்காது. செயல்முறை எடுத்துக்காட்டு (2026-09-02/03): PR #12502 ஆனது
7 உண்மையான alert-களைச் சரிசெய்தது (அளவிடப்பட்ட திறந்த எண்ணிக்கை 13 → 6); PR #12530 ஆனது
உறையவைக்கப்பட்ட அடிப்படையைப் பொருந்துமாறு 11 → 6 என இறுக்கியது; பின்னர் மீதமிருந்த 6 alert-களும்
ஒவ்வொன்றிற்குமான காரண விளக்கத்துடன் dismiss செய்யப்பட்டு, திறந்த எண்ணிக்கை 0 ஆகக் குறைக்கப்பட்டது.

**Dismissal-கள் operator-ன் முடிவு (Hard Rule #14)** — dismissal comment-ல் தொழில்நுட்ப
காரணத்தைப் பதிவு செய்யாமல் CodeQL alert-ஐ ஒருபோதும் dismiss செய்ய வேண்டாம்: upstream-protocol
தேவைக்காக `won't fix`, test fixture-க்காக `used in tests`, CodeQL காண முடியாத sanitizer-க்காக
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

## உருவாக்கப்பட்ட கோப்புகள் மற்றும் பெறப்பட்ட அடிப்படைகள் (வெளியீட்டின்போது எழுதப்படுபவை)

திட்டம் 2026-11-13 ("பெறப்பட்ட எண்களும் உரைகளும் வெளியீட்டின்போது மட்டுமே தீர்க்கப்படும்"): ஒரு அம்ச PR
**மூலத்தை** — `src/shared/constants/providers.ts`, `docs/openapi.yaml`, திறன் பட்டியல்,
இலவச அடுக்கு பட்டியல், புதிய e2e spec — மாற்றுகிறது. அந்த மூலத்திலிருந்து கணக்கிடப்படும் கோப்புகளை அது
மீண்டும் உருவாக்காது; அளவிடப்பட்ட மேம்பாட்டையும் ஒரு அடிப்படையில் பதிவு செய்யாது. அந்தக் கோப்புகள்
வெளியீட்டு refresh (`release:refresh-derived`) அல்லது இரவுநேர refresh PR மூலம் ஒருமுறை மட்டுமே
மீண்டும் எழுதப்படும். இதற்கு முன், ஒவ்வொரு sibling PR-மும் தன்னுடன் மீண்டும் உருவாக்கப்பட்ட நகலைக்
கொண்டு வந்ததால், அடுத்த merge உடன் முரண்பட்டது (2026-11-13: திறந்த 321 PR-களில் 30,
`PROVIDER_REFERENCE.md`-ஐ மீண்டும் எழுதின; 26–28 PR-கள் README வரைபடங்களை மீண்டும் எழுதின).

**காவல் விதி.** `check:pr-derived-paths` (`pr-test-policy` job), ஒரு அம்ச PR ஆனது
`config/quality/derived-paths/`-இல் உள்ள ஒரு குடும்பத்தின் கோப்பைத் தொடும் போது தோல்வியடையும்:

| குடும்பம்   | கோப்புகள்                                                                                                                                                                                    | மீண்டும் எழுதுவது                                                                                                           |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `generated` | `docs/reference/derived-facts.json`; `docs/reference/PROVIDER_REFERENCE.md`; உருவாக்கப்பட்ட பன்னிரண்டு README SVG-கள்; `skills/*/references/**`; தனிப்பயன் block இல்லாத `SKILL.md` கோப்புகள் | facts-க்கு `release:refresh-derived`, `gen:provider-reference`, `docs:readme-diagrams`, `generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                                                            | `balance-e2e-shards.mjs --sync` (`syncE2eTimings()`)                                                                        |

எழுத்தாளர்கள் (`release/v*`, `chore/derived-*`, மேலும் baselines-க்கு `chore/bank-ratchet-*`) விலக்கு
பெறுகின்றனர்; அதேபோல் ஒரு குடும்பத்தை மட்டும் அதன் துணைக் கோப்புகளுடன் மாற்றும் PR-க்கும் விலக்கு
உண்டு (`generated`-க்கு: generator scripts, அவற்றின் tests, agent-skill inputs —
`src/shared/constants/agentSkills.ts`, கையால் எழுதப்பட்ட `skills/**` docs,
`docs/openapi.yaml` — மற்றும் `changelog.d/**`), எடுத்துக்காட்டாக, மீண்டும் உருவாக்கப்பட்ட SVG உடன்
hero layout மாற்றம், அல்லது மீண்டும் உருவாக்கப்பட்ட `SKILL.md` கோப்புகளைப் படிக்கும் test-உடன்
skills திருத்தம். கையால் எழுதப்பட்ட `<!-- skill:custom-start -->` block-ஐ கொண்ட `SKILL.md` அந்தக்
குடும்பத்தில் இல்லை: அதன் custom block ஒரு அம்சத்துடன் இணைந்து திருத்தக்கூடியதாகவே இருக்கும்.

**ஒவ்வொரு gate mode-க்குமான சோதனைகள்** (`scripts/check/lib/gateMode.mjs`; helper
`scripts/check/lib/derivedArtifactScope.mjs`):

| சோதனை                                                                       | `release` (push, schedule, release PR, local)                                                                 | `pr` (feature PR, queue batch)                                                                                                                                                                                                    |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:agent-skills-sync`                                                   | ஒவ்வொரு skill-மும் generator output-க்கு சமமாக இருக்க வேண்டும்                                                | PR திருத்தும் generated text-ஐ (custom block-க்கு வெளியே) அல்லது `references/`-ஐ கொண்ட skills மட்டும்; இல்லையெனில் `SKIP reason=pr-mode`                                                                                          |
| `check:generated-artifacts` (README SVGs + e2e timings; needs full history) | ஒவ்வொரு SVG-மும் அதன் generator-க்கு சமமாக இருக்க வேண்டும்; ஒவ்வொரு spec-க்கும் timings entry இருக்க வேண்டும் | PR திருத்தும் artifacts மட்டும்; மீதமுள்ளவை `SKIP reason=pr-mode`; diff base இல்லை → ஒவ்வொரு artifact-மும் மதிப்பிடப்படும் (தோல்வியைத் தடுக்கும் வகையில்)                                                                         |
| README SVG byte-compare tests (`tests/unit/docs/readme-*-svg.test.ts`)      | ஒவ்வொரு SVG-மும்                                                                                              | base தீர்மானிக்கப்படும்போது, PR திருத்தும் SVG மட்டும்; `test-unit`-ன் shallow PR checkout-இல் base இல்லை, எனவே அங்கு test `SKIP reason=base-unresolved` எனத் தவிர்க்கப்படும்; ஒப்பீட்டை `check:generated-artifacts` மேற்கொள்ளும் |
| e2e timings completeness (`tests/unit/balance-e2e-shards.test.ts`)          | ஒவ்வொரு spec-க்கும் ஒரு entry இருக்க வேண்டும்                                                                 | SVG tests-க்கான அதே விதி (புதிய spec median weight உடன் இயங்கும்)                                                                                                                                                                 |
| `check-quality-ratchet.mjs --require-tighten`                               | பதிவு செய்யப்படாத மேம்பாடு தோல்வியடையும் (`_policy` இல்லையெனில்)                                              | மேம்பாடு தெரிவிக்கப்படும், ஒருபோதும் தோல்வியல்ல; regression ஏற்பட்டால் இன்னும் தோல்வியடையும்                                                                                                                                      |

Release பயன்முறை, இந்தச் சரிபார்ப்புகள் split செய்யப்படுவதற்கு முன்பு கொண்டிருந்த verdicts, exit codes மற்றும் messages ஆகியவற்றையே வைத்திருக்கிறது; அதிகபட்சம் ஒரு வரி மட்டும் சேர்க்கப்படும், அதில் தீர்மானிக்கப்பட்ட mode (`[agent-skills-sync] mode=release (auto: local run)`) குறிப்பிடப்படும்.
சோதனைகள் node:test-இன் `{ skip: releaseOnlyUnlessTouched(...) }` விருப்பத்தின் மூலம் skip செய்யப்படுகின்றன; இதை
`check:test-masking` report-only block-இல் பட்டியலிடுகிறது (`.skip(` அல்லது `{ skip: true }` அல்ல, ஆகவே இது
hard skip ஆகக் கணக்கிடப்படாது). `check:generated-artifacts`, base-ஐ resolve செய்யக்கூடிய இடங்களில் இயங்குகிறது: job
`lint` (`fetch-depth: 0`), `check:agent-skills-sync`-க்கு உடனடியாக அடுத்து. உள்ளூரில்,
`npm run check:generated-artifacts -- --mode=pr`, PR-இல் அந்த step எதை மதிப்பிடுகிறது என்பதைக் காட்டும். `check:docs-counts`-இன்
"Provider reference total (doc vs live modules)" என்ற provider-total cross-check, counts gate-இன் ஒரு பகுதியாக இருந்து, அந்த gate-இன் சொந்த modes-ஐப் பின்பற்றுகிறது.

குடும்பம் ஒன்றிலும் சேராதவை, திட்டமிட்டே: மனிதர்களால் தீர்மானிக்கப்படும் policy files (`gate-manifest.json`, allowlists,
`admission-policy.json`, `provider-assets-provenance.jsonl`, `model-lifecycle.json`) மற்றும் ஒரு feature PR code-உடன் சேர்த்து
திருத்த வேண்டியிருக்கக்கூடிய ceilings (`quality-baseline.json` metric entries, typecheck/file-size/complexity baselines,
`eslint-suppressions.json` — ஒரு PR frozen violation-ஐ சரிசெய்யும்போது pre-commit ESLint run மூலம் prune செய்யப்படும்).
`src/i18n/routeNamespaces.generated.json` கூட generated ஆகும், ஆனால் feature PR-களிலேயே இருக்கும்: app அதை run time-இல்
import செய்கிறது, எனவே refresh வரும் வரை காத்திருக்க முடியாது.

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

முன்பே இருந்த மீறல்களால் தோல்வியடைய முடியாத ஒவ்வொரு கேட்டும் உறைந்த அனுமதிப்பட்டியலைப் பயன்படுத்துகிறது
(எ.கா., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). கொள்கை:

**மூலக் காரணத்தைச் சரிசெய்யுங்கள்; மீறல் ஏற்கனவே இருந்து, அதே PR-ல் அதைச்
சரிசெய்ய முடியாதபோது மட்டுமே அனுமதிப்பட்டியலைப் பயன்படுத்துங்கள்.**

அனுமதிப்பட்டியலில் ஒரு பதிவைச் சேர்க்கும்போது:

1. காரண விளக்கத்துடன் ஒரு கருத்தைச் சேர்க்கவும்.
2. கண்காணிப்பு issue-ஐக் குறிப்பிடவும் (எ.கா., `// #3498 — Phase 2 feature, not yet implemented`).
3. மீறலைச் சரிசெய்யும் அதே PR-ல் பதிவை அகற்றவும் — செயலில் உள்ள மீறலை இனி
   அடக்காத பழைய பதிவு, தானே ஒரு குறைபாடாகும் (செயல்படுத்தப்பட்டதும், 6A.3 பழைய-பதிவு
   அமலாக்கம், தொடர்பற்ற அனுமதிப்பட்டியல் பதிவில் கேட்டில் தோல்வியடையும்).

சோதனைகள் விரைவாக வெற்றி பெறச் செய்வதற்காக அனுமதிப்பட்டியல் பதிவுகளைச்
சேர்க்க வேண்டாம். வளர்ந்து கொண்டிருக்கும் அனுமதிப்பட்டியலுடன் பச்சை நிற கேட்,
தரத்தைப் பற்றிய தவறான நம்பிக்கையை உருவாக்குகிறது.

### உங்கள் PR-ல் ஒரு கேட் தோல்வியடையும்போது

1. **கேட் வெளியீட்டை கவனமாகப் படியுங்கள்** — எந்தக் கோப்பு அல்லது குறியீட்டு
   அடையாளங்காட்டி விதியை மீறியது என்பதை அது துல்லியமாகக் கூறுகிறது.
2. **மீறலைச் சரிசெய்யுங்கள்** — பெரும்பாலான கேட்டுகள், குறியீடு சரியானவுடன்
   வெற்றி பெறும் நிர்ணயிக்கப்பட்ட கோப்பு முறைமைச் சரிபார்ப்புகளாகும்.
3. **மீறல் முன்பே இருந்ததாக இருந்தால்** (அதாவது, அதை நீங்கள் அறிமுகப்படுத்தவில்லை,
   ஆனால் கேட் இப்போது அதைக் கண்காணிக்கிறது): காரண விளக்கக் கருத்துடனும்
   கண்காணிப்பு issue-உடனும் ஒரு அனுமதிப்பட்டியல் பதிவைச் சேர்க்கவும்.
4. **கேட் ஒரு ratchet ஆக இருந்தால்** (coverage, ESLint எச்சரிக்கைகள்,
   duplication, complexity): உங்கள் மாற்றம் அளவீட்டை மோசமாக்கியுள்ளது. அடிப்படைச்
   சிக்கலைச் சரிசெய்யவும் அல்லது (அரிதாக) மாற்றம் நோக்கமுடையதாகவும், அளவீட்டின்
   சரிவு ஏற்றுக்கொள்ளத்தக்கதாகவும் இருந்தால் `npm run quality:ratchet -- --update`
   இயக்கவும் — ஆனால் ஏன் என்று PR விளக்கத்தில் பதிவு செய்யவும்.
5. **ஆலோசனை கேட்டுகள்** (`continue-on-error: true`) தகவல் வழங்குவதற்கானவை —
   அவை merge-ஐத் தடுக்காது, ஆனால் CI சுருக்கத்தில் தோன்றும். இருந்தாலும் அவற்றைச்
   சரிசெய்யவும்.

---

## புதிய வாயிலைச் சேர்த்தல்

1. `scripts/check/check-<name>.mjs` (அல்லது `.ts`) உருவாக்கவும். கொள்கை வாயில்கள் 0/1 வெளியேறும் குறியீட்டுடன் முடிவடையும்.
   Ratchet-பாணி வாயில்கள் `collect-metrics.mjs` வழியாக `quality-metrics.json`-க்கு ஓர் அளவீட்டை வெளியிடும்.
2. `package.json`-இல் `"check:<name>": "node scripts/check/check-<name>.mjs"`-ஐச் சேர்க்கவும்.
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

## பகுத்தறிதல் நிலுவைப் பட்டியல் (ROI மதிப்பாய்வு — கட்டம் 9 அலை 3)

இந்தப் பட்டியல் 2026-06-17 அன்று `ci.yml`-க்கு எதிராகச் சரிபார்க்கப்பட்டது (முந்தைய பதிப்பில்
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` ஆகியவை விடுபட்டிருந்தன). சரிபார்க்கப்பட்ட தொகுப்பின்
ROI மதிப்பாய்வு பின்வரும் பகுத்தறிதல் வேட்பாளர்களை அடையாளம் கண்டது. **Merge-கள் இயந்திரமயமான CI
மாற்றங்கள்; flip/drop-கள் இயக்குநருக்காக ஒதுக்கப்பட்ட கொள்கை முடிவுகள்.** கீழே உள்ள எதுவும்
இன்னும் பயன்படுத்தப்படவில்லை.

**மேலும் மேலே ஆவணப்படுத்தப்படாதவை** (ஆலோசனைக்குரியவை, குறைந்த சமிக்ஞை): `docs-lint` job
(markdownlint + Vale, முழு job-க்கும் `continue-on-error`) மற்றும் தனித்த scanner workflows
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` என்பது
`quality-baseline.json`-ல் உள்ளது, ஆனால் `ci.yml`-ல் blocking ratchet-க்கு இணைக்கப்படவில்லை —
இந்த metric தற்போது orphaned நிலையில் உள்ளது.

### Merge / dedup (இயந்திரமயம், குறைந்த ஆபத்து)

ஒவ்வொரு வேட்பாளரும் 2026-06-17 அன்று செயல்பாட்டிலுள்ள gate நிலைக்கு எதிராகச் சரிபார்க்கப்பட்டார் (நம்புங்கள், ஆனால் சரிபார்க்கவும்);
பல "வெளிப்படையான" merge-கள் கடனை மறைத்திருப்பது தெரியவந்ததால், அவை **தயார்நிலை drop-in மாற்றுகள் அல்ல**.

- **`check:docs-sync` இரண்டு முறை இயங்குகிறது** — `lint` job-ல் standalone ஆகவும், மீண்டும் `check:docs-all` (`docs-sync-strict`) மற்றும் husky pre-commit hook-க்குள்ளும். ✅ **முடிந்தது** — standalone `lint` invocation அகற்றப்பட்டது.
- **CVE scanning** — ❌ **சுத்தமான merge அல்ல.** `audit:deps` அனைத்து ஐந்து lockfile-களிலும் critical advisories மற்றும் முழுமையற்ற audits-ஐத் தடுக்கிறது; தற்போதைய கொள்கையின் கீழ் high advisories-ஐ warnings ஆக அறிக்கையிடுகிறது; `check:vuln-ratchet` (osv) சரிபார்க்கப்பட்ட baseline-க்கு எதிரான _regression_ ஏற்பட்டால் மட்டுமே தோல்வியடைகிறது, மேலும் தேவைப்படும் போது missing measurements-ஐ நிராகரிக்கிறது. Semantics வேறுபட்டவை — `audit:deps`-ஐ அகற்றினால் absolute critical gate மற்றும் சுயாதீன package audit receipts இழக்கப்படும். இரண்டையும் வைத்திருக்கவும்.
- **Cycle detection** — ✅ **முடிந்தது** (#15159 G-01/G-02). இங்குள்ள பழைய உரை `check:cycles`-ஐ "green, curated" gate எனக் குறிப்பிட்டு, `check:circular-deps` (dpdm) 91 cycles-ஐ அறிக்கையிட்டதால் அதை blocking நிலையில் வைத்திருக்க வேண்டும் என நியாயப்படுத்தியது. அந்த green ஒரு **false green**: `check:cycles` 5 subdirectories-ஐ (450 files) scan செய்து, static `import|export … from`-ஐ மட்டுமே match செய்தது; ஒவ்வொரு `@/` மற்றும் `@omniroute/open-sse/` specifier-ஐயும் நீக்கியதால், repository-யில் பெரும்பான்மையாக இருந்த dynamic-import + alias cycles-ஐக் காண முடியவில்லை. சரிசெய்யப்பட்டது: gate இப்போது `src` + `open-sse` (5023 files) வழியாகச் சென்று, TypeScript AST-இலிருந்து specifier-களைச் சேகரிக்கிறது (`import("…")` கணக்கில் எடுத்துக்கொள்ளப்படும், type-position `typeof import("…")` கணக்கில் எடுத்துக்கொள்ளப்படாது), மேலும் tsconfig `paths`-ஐ resolve செய்கிறது. இது 0 அல்ல, **14** cycles-ஐக் கண்டறிகிறது. ஏற்கனவே உள்ள 14 cycles-ஐ gate PR-ல் சரிசெய்ய முடியாததால், `check:cycles` இப்போது ஒரு **ratchet** (`--ratchet`, `quality-baseline.json`-ல் ceiling `metrics.cycles.value = 14`, `direction: down`) ஆகும் — இது _regression_-ஐத் தடுக்கிறது, மேலும் எண்ணிக்கை குறைய மட்டுமே முடியும். CI `npm run check:cycles:ratchet`-ஐ இயக்குகிறது. Burn-down **A-01** உடன் நடைபெறும். `check:circular-deps` (dpdm) விரிவான இரண்டாவது கருத்தாக advisory நிலையில் தொடர்கிறது.
- **Complexity** — ✅ **முடிந்தது** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): ஒரு ESLint walk, ruleId அடிப்படையில் எண்ணுகிறது; இதனால் cyclomatic மற்றும் max-lines baselines சுயாதீனமாக இருக்கும்; தனித்த `check:complexity` / `check:cognitive-complexity` local `--update`-க்காகத் தொடர்கின்றன.
- **`/api` anti-hallucination** — ✅ **முடிந்தது** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api`-ன் ஒரு FS inventory; openapi-routes + docs-symbols ஆகியவை இன்னும் சுயாதீனமாக அறிக்கையிடுகின்றன; தனித்தவை local runs-க்காகத் தொடர்கின்றன.
- **`check:node-runtime` 11 jobs-ல் இயங்குகிறது** — ⚠️ **குறைந்த ROI.** ஒவ்வொன்றும் தனித்த runner ஆகும், check <1s; ஒவ்வொரு job-க்குமான மலிவான guard-ஐ இழப்பதற்கு எதிராக மொத்தச் சேமிப்பு ~10s மட்டுமே. இந்த churn மதிப்புக்குரியது அல்ல.
- **CI lint-ல் `typecheck:noimplicit:core`** — ✅ **lint job-லிருந்து அகற்றப்பட்டது** (advisory `continue-on-error` ஆக இருந்தது); blocking type surface என்பது `typecheck:core` + `check:type-coverage`; local script தக்கவைக்கப்பட்டது.

### Flip / decide (இயக்குநர் கொள்கை)

- `check:openapi-security-tiers` (advisory) — ❌ **சுத்தமாக flippable அல்ல.** `LOCAL_ONLY_API_PREFIXES`-ன் கீழுள்ள பல `traffic-inspector` routes-ல் `x-loopback-only: true` annotation இல்லை என இது exit 0 ஆனாலும் warning அளிக்கிறது. இதை enforce செய்ய முதலில் `openapi.yaml`-ல் அந்த annotations சேர்க்கப்பட வேண்டும்.
- `typecheck:noimplicit:core` (advisory) — blocking `check:type-coverage` ratchet-ஆல் பெரும்பாலும் subsume செய்யப்பட்டுள்ளது. இதை ratchet ஆக flip செய்யவும் அல்லது redundant இரண்டாவது `tsc` pass-ஐ அகற்றவும்.
- `test:vitest:ui` (இப்போது **blocking**) — ஏற்கனவே இருந்த failures `vitest.config.ts`-ல் `// #8618` tracking comments மூலம் வெளிப்படையாக exclude செய்யப்பட்டுள்ளன; புதிய failures job-ஐ fail செய்யும்.
- `check:secrets` (gitleaks, 3 documented false-positives-ல் blocking ratchet frozen) — 0-ஐ அடைய அந்த 3-ஐ allowlist செய்யவும் அல்லது advisory ஆக demote செய்யவும். GitHub native secret-scanning + `check:public-creds` உடன் overlap உள்ளது.
- `check:pr-evidence` (blocking, PR-body prose-ஐ greps செய்கிறது) — false-positive ஆபத்து அதிகம்; இதை drop செய்தால் Hard Rule #18 enforcement பலவீனமடையும், எனவே இது உண்மையான policy call.
- `semgrep` (advisory standalone) — OWASP families-க்கு CodeQL உடன் overlap உள்ளது; அதன் baseline-ஐ ratchet-க்கு wire செய்யவும் அல்லது drop செய்யவும்.

## தொடர்புடைய ஆவணங்கள்

- Supply-chain (provenance, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — key-set parity gate

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, job `i18n-ui-coverage`).
ஒவ்வொரு `src/i18n/messages/<locale>.json` கோப்பின் leaf key தொகுப்பையும் `en.json` உடன் ஒப்பிட்டு, key எப்போது சேர்க்கப்பட்டது என்பதைப் பொருட்படுத்தாமல், ஏதேனும் விடுபட்ட அல்லது கூடுதல் leaf இருந்தால் தோல்வியடையும். `__MISSING__:` placeholders இருந்ததாகக் கணக்கிடப்படும் (அவற்றின் உள்ளடக்கம் ratio gate-இன் பொறுப்பு). இது இரண்டு diff-அடிப்படையிலான/சதவீத gates-க்கு முழுமையான எதிர்மறைச் சரிபார்ப்பாகும்: `check-ui-keys-coverage` ஒவ்வொரு locale-க்கும் 80 % குறைந்தபட்ச அளவை அமல்படுத்துகிறது (சுமார் 13,000-இல் 43 key-கள் விடுபட்டிருந்தாலும் 99.7 % ஆகவே படிக்கப்படும்), மேலும் `check-new-key-coverage` PR `en.json`-இல் சேர்க்கும் key-களை மட்டுமே மதிப்பிடுகிறது. ஒரு locale batch, அதன் branch வெட்டப்பட்ட நாளின் `en.json`-இலிருந்து உருவாக்கப்பட்டு, base தொடர்ந்து key-களைச் சேர்த்துக்கொண்டிருக்கும்போது பல நாட்கள் மொழிபெயர்க்கப்படுகிறது; batch PR தானாக எந்த key-யையும் சேர்க்காது, ஆகவே batch 1 (#13044) ஒன்பது locale-களில் 43 key-கள் குறைவாகவும், batch 2 (#13660) எட்டு locale-களில் 10 key-கள் குறைவாகவும் வந்தபோது (2026-09-15), இரு sibling-களும் அமைதியாகவே இருந்தன. சிவப்பு status-ஐ `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` மூலம் சரிசெய்யவும்; `extra` leaf என்பது source அதைக் கைவிட்டுவிட்டது என்பதைக் குறிக்கும் — `sync-ui-keys` அதை நீக்குகிறது (`--prune-extra`, இயல்புநிலை). `--warn` தோல்வியடையாமல் அறிக்கை அளிக்கும்.
`--catalog=cli` என்பது `bin/cli/locales` மீது அதே ஒப்பீட்டை இயக்குகிறது (`npm run i18n:check-keys:cli`); இரண்டு படிகளும் `i18n-ui-coverage` job-இல் உள்ளன. இந்த முழுமையான சரிபார்ப்பு release mode-இல் மட்டுமே இயங்கும்: feature PR `SKIP reason=pr-mode`-ஐக் காணும், மேலும் fix release refresh அல்லது translation wave-இல் இயங்கும், feature PR-இல் அல்ல; locale catalogs-ஐ மாற்றும் PR-இல், அவை ஒவ்வொன்றும் merge base-க்கு எதிராக மதிப்பிடப்படும் (`i18n-ui-coverage` job-இன் “இரண்டு முறைகள்” பகுதியைப் பார்க்கவும்).

#### `check-new-key-coverage` — new-key i18n gate

`check-ui-value-drift`-இன் sibling. அது மொழிபெயர்ப்புகள் மாற்றப்படாமல் விடப்பட்டபோது, ஆங்கில value **மறுஎழுதப்பட்டதை** கண்டறியும்; இது சில locale-களுக்கு ஒருபோதும் வழங்கப்படாத நிலையில் ஆங்கில key **சேர்க்கப்பட்டதைக்** கண்டறியும்.

`check-ui-keys-coverage` இந்த வகையைப் பார்க்க முடியாது: அது ஒவ்வொரு locale-க்கும் ஒரு சதவீதக் குறைந்தபட்ச அளவை அமல்படுத்துகிறது, மேலும் சுமார் 13,000 leaf-களில் பதினொன்று key-கள் விடுபட்டிருந்தாலும் coverage 99.9% ஆக இருக்கும். ஒரு மொழிக்கான சதவீதம், “இந்த feature மொழிபெயர்க்கப்படாமல் வெளியிடப்பட்டது” என்பதை வெளிப்படுத்த முடியாது — முழு feature ஒன்றும் உரையில்லாமல் புதிய locale-இல் சேர்ந்து, அந்த எண்ணிக்கையை ஒருபோதும் மாற்றாமல் இருக்கலாம்.

இது பதிவுசெய்யும் சம்பவம்: Orchestration Canvas-இன் Phase 3, அப்போது இருந்த 42 locale-களிலும் அதன் பதினொன்று key-களை மொழிபெயர்த்தது. சில மணி நேரங்களுக்குப் பிறகு EU-language batch (#13044) repo-வை 51 locale-களாக உயர்த்தியது, மேலும் புதிதாக வந்த ஒன்பது (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) locale-களுக்கு அவை ஒருபோதும் கிடைக்கவில்லை. `deepMergeFallback`, விடுபட்ட key-க்கு ஆங்கிலத்தை மாற்றாகப் பயன்படுத்துகிறது; ஆகவே தோல்வி நிலை வெற்று UI அல்ல, மொழிபெயர்க்கப்படாத UI — உண்மையானதும், வடிவமைப்பிலேயே அமைதியானதுமாக இருந்தது.

அதன் sibling போலவே இது **diff-aware** ஆகும்; merge base-இல் உள்ள ஆங்கிலத்தை working tree-க்கு எதிராக ஒப்பிடுவதால், முன்பிருந்த gaps அப்படியே நிலைத்திருக்கும், மேலும் gate-ஐ இயக்க migration எதுவும் தேவையில்லை.

**`__MISSING__:<english>` marker இதை நிறைவு செய்யாது (2026-09-17 முதல்).** இது முன்பு ஆவணப்படுத்தப்பட்ட ஒத்திவைப்பாக இருந்தது — runtime சரியான ஆங்கிலத்தை fallback செய்கிறது — ஆனால் 2026-09-16 அன்று எட்டு feature PR-கள் 61 key-களைச் சேர்த்து, மொழிபெயர்ப்பதற்குப் பதிலாக அனைத்து 65 locale-களிலும் marker-ஐப் பதித்தன: இந்த gate ஒவ்வொன்றையும் ஏற்றுக்கொண்டது, PR-களை எதுவும் தடுக்கவில்லை, பின்னர் blocking real-translation ratio gate release tip-இல் அனைவருக்கும் தோல்வியடைந்தது (pt-BR 3.2 % > 2.5 % + 0.5). இப்போது marker, விடுபட்ட மொழிபெயர்ப்பாக மதிப்பிடப்படுகிறது. 2026-11-13 முதல் release mode-இல் மட்டுமே: feature PR `SKIP reason=pr-mode`-ஐக் காணும், மேலும் release PR-இல் (`BASE_REF=origin/main`) cycle சேர்த்த ஒவ்வொரு key-ஐயும் gate மதிப்பிடும். release refresh அல்லது translation wave-இல் `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` மூலம் சிவப்பு status-ஐ சரிசெய்யவும், அல்லது `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`, detached-safe, `OMNIROUTE_TRANSLATION_*` env இல்லாமல் தொடங்க மறுக்கும்) மூலம் அனைத்து locale-களிலும் இணையாகச் சரிசெய்யவும். ஆங்கிலத்திலேயே இருக்க வேண்டிய key (pinned product/engine/flag name) `scripts/i18n/untranslatable-keys.json`-இல் சேர வேண்டும்; ஒருபோதும் marker-க்கு பின்னால் இருக்கக்கூடாது. `vi`, marker-களை முற்றிலுமாகத் தடை செய்கிறது (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — parked-test gate

`vitest.config.ts`-இன் `exclude` பட்டியலில் உள்ள கோப்பு இயங்காத test ஆகும், மேலும் tree-ஐப் படிப்பவர்களுக்கு அது coverage போலத் தோன்றும். `// #8618 — pre-existing failure; remove this exclusion when fixed` என்ற comment-க்குப் பின்னால் அறுபத்திரண்டு கோப்புகள் சேர்ந்து கொண்டன. #8618 issue, 2026-08-11 அன்று மூடப்பட்டது; ஆனால் அது கண்காணித்த பட்டியல் 45 entries-இலிருந்து 62 ஆக வளர்ந்தது, புதிதாக வந்த ஒவ்வொன்றும் முடக்கப்பட்ட issue-ஐச் சுட்டும் comment-ஐப் பெற்றது. பட்டியல் இறுதியாக file-by-file அளவிடப்பட்டபோது (#13204), **62-இல் 51, source மாற்றமின்றி தற்போதைய tree-க்கு எதிராக வெற்றி பெற்றன**.

உண்மையான file-க்கு resolve ஆகும் ஒவ்வொரு exclusion-மும் (a) tracking issue ஒன்றைக் குறிப்பிட வேண்டும், மேலும் (b) அளவிடப்பட்ட status-உடன் `config/quality/vitest-exclusions.json`-இல் தோன்ற வேண்டும் என்று gate வலியுறுத்துகிறது; இதனால் ஒன்றைச் சேர்ப்பது 60-entry array-இல் இன்னொரு வரியாக இல்லாமல், தனிப்பட்ட கோப்பில் review செய்யக்கூடிய diff ஆகிறது. excluded tests-ஐ இது நோக்கமுடன் மீண்டும் இயக்காது — அதற்கு சுமார் 10 நிமிடங்கள் ஆகும், மேலும் அது periodic job-க்குச் சேரும்; inventory, ஒவ்வொன்றும் கடைசியாக எப்போது அளவிடப்பட்டது என்பதைப் பதிவு செய்கிறது.
