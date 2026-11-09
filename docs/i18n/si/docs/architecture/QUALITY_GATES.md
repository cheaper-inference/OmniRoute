# Quality Gates Reference (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

මෙම ලේඛනය OmniRoute හි සියලුම CI තත්ත්ව ද්වාර සඳහා බලයලත් යොමුව වේ.
එය එක් එක් ද්වාරය, එය වලංගු කරන්නේ කුමක්ද, එය ක්රියාත්මක වන්නේ කුමන CI කාර්යයේද, එය
ratchet මූලික රේඛාවක් හෝ සමත්/අසමත් ප්රතිපත්තියක් භාවිත කරන්නේද, සහ එය build එක අවහිර කරන්නේද නැතහොත් උපදේශාත්මකද යන්න විස්තර කරයි.

කෙටි සාරාංශයක් සහ අවසර ලැයිස්තු ප්රතිපත්තිය සඳහා, `AGENTS.md` හි
"තත්ත්ව ද්වාර සහ Ratchets" කොටස බලන්න. එම පද්ධතියේ විවේචනාත්මක ඇගයීම, පරිණතභාව වර්ගීකරණය සහ මෙවලම්-ස්වාධීන
ප්රතිනිර්මාණ සැලැස්ම සඳහා,
[තත්ත්ව ද්වාර ක්රියාමාර්ග අත්පොත](../ops/QUALITY_GATE_PLAYBOOK.md) බලන්න.

---

## ගේට් ඉන්වෙන්ටරි සහ ක්‍රියාත්මක කිරීමේ පැතිකඩ

### අපේක්ෂක ඇතුළත් කිරීම

CI සහ Quality Gates කාර්ය ප්‍රවාහයන් එක් එක් ස්ථාවර තීන්දුවක් නිකුත් කරයි: `Gate / CI` සහ `Gate / Quality`. ඔවුන්ගේ අනුවාදගත ඇතුළත් වීමේ ප්‍රතිපත්තිය අවශ්‍ය හෝ උපදේශන ලෙස සෑම ඉහළ ප්‍රවාහ රැකියාවක්ම ගණන් කරයි. අදාළ අවශ්‍ය කාර්යයක් සාර්ථක විය යුතුය: අතුරුදහන්, අවලංගු, මඟ හැරුණු, පොරොත්තු සහ නොදන්නා ප්‍රතිඵලවලට PASS පිහිටුවිය නොහැක. වලංගු ලේඛන-පමණක් හෝ නාමාවලිය-පමණක් වර්ගීකරණයක් කේත මංතීරුවක් අදාළ නොවන බවට පත් කළ හැක; සාමාන්‍ය කෙටුම්පතක් PR පිළිගත් අපේක්ෂකයෙකු නොවේ. `hotfix` ලේබලයක් සාක්ෂි අත්හරින්නේ නැත.

කාර්ය ප්‍රවාහ දෙකම PRs main/release ශාඛාවලට ආවරණය කරයි, `main` වෙත තල්ලු කරයි, අතින් යැවීම සහ සමූහ සිදුවීම් ඒකාබද්ධ කරයි. තල්ලු කිරීම, යැවීම සහ ඒකාබද්ධ-කණ්ඩායම සම්පූර්ණ තේරීම ධාවනය කරන්න. විශ්වාසදායී Mergify පෝලිම් කෙටුම්පතක් අදාළ `full-code`/`full-code-e2e` රැකියා ද ධාවනය කරයි; සාමාන්‍ය PRs ඒවා මඟ හරින්න. හස්තීය ඒකාබද්ධ කිරීමකට පෙර, නිශ්චිත අපේක්ෂකයා මත සම්පූර්ණ යැවීමක් ධාවනය කරන්න. `release/**` වෙත තල්ලු කිරීම් මෙම වැඩ ප්‍රවාහයන් ආරම්භ නොකරයි; Release-Green ඒකාබද්ධ කළ පදනම වෙන වෙනම නිරීක්ෂණය කරයි (`docs/ops/RUNNER_BOX.md` → Hosted lane). ගෑරුප්පු සහ ඒකාබද්ධ කණ්ඩායම් වෙනත් ආකාරයකින් ස්වයං-සත්කාරක ධාවකයන් තෝරා ගන්නා රැකියා සඳහා සත්කාරක ධාවකයන් භාවිතා කරයි; ප්‍රමාණවත් සත්කාරක ධාරිතාව ප්‍රචාරණයට පෙර සත්‍යාපනය කළ යුතුය.

සාමාන්‍ය PR එකක් වේගවත් තේරීම ක්‍රියාත්මක කරයි. ඇතුළත් වීමේ ප්‍රතිපත්තියේ `full-code` සහ `full-code-e2e` මංතීරු (E2E, ඒකාබද්ධ කිරීම, පැකේජ පුරාවස්තු, Electron දුම්, Bun SQLite, පරිසර පද්ධතිය සහ ප්‍රොටෝකෝල සේවාලාභීන්) ධාවනය වන්නේ Mergify පෝලිම් කෙටුම්පතක් මත හෝ සම්පූර්ණ ධාවන කාලයකදී පමණි: `gh workflow run ci.yml --ref <branch>`.

සෑම JSON රිසිට්පතක්ම පරීක්ෂා කළ SHA, කාර්ය ප්‍රවාහ ධාවනය සහ උත්සාහය හඳුනා ගනී. CLI checkout/event SHA නොගැලපීම ප්‍රතික්ෂේප කරයි. කාර්ය ප්‍රවාහ පරීක්‍ෂණ මගින් ප්‍රතිපත්ති සාමාජිකත්වය තීරන කාර්යයේ `needs` ලැයිස්තුවට බැඳී ඇත, එබැවින් නව හෝ ඉවත් කරන ලද මංතීරුවක් නිහඬව අතුරුදහන් විය නොහැක. රිසිට්පත් ඔවුන්ගේම කාර්ය ප්‍රවාහය ආවරණය කරයි, ප්‍රකාශනය, යෙදවීම හෝ පවතින උපදේශක ස්කෑනරයක අභ්‍යන්තරය නොවේ. ශාඛා නීතිවල අවශ්‍ය අදාළ චෙක්පත් සිදු කිරීම වෙනම පරිපාලනමය වෙනසක් වේ; ඔවුන්ගේ රැකියා නිර්වචනය කිරීම ශාඛාවක් ආරක්ෂා නොකරයි.

`API Route Typecheck` යනු සමස්ථ තීන්දු සහ දේශීය පූර්ණ නිරීක්ෂකයාගේ ස්ථිතික පැතිකඩ යන දෙකටම පිටතින් ස්වාධීන කාර්ය ප්‍රවාහ පරීක්ෂාවකි. නිශ්චිත අපේක්ෂකයා සඳහා එහි ප්‍රතිඵලය වෙන වෙනම පරීක්ෂා කරන්න. `.github/workflows/api-route-typecheck.yml` PRs මත `main` හෝ `release/**` බවට ක්‍රියා කරයි, ශාඛා පවුල, අතින් යැවීම සහ `checks_requested` වර්ගයේ `merge_group` සිදුවීම් වෙත තල්ලු කරයි. එහි පාත් ෆිල්ටරයක් නොමැත. කණ්ඩායම් ඒකාබද්ධ කරන්න `merge_group.head_sha` පරීක්ෂා කරන්න ; වෙනත් සිදුවීම් `github.sha` පරීක්ෂා කරන්න. සියලුම සිදුවීම් එකම API රෝග විනිශ්චය ද්වාරය සහ ද්වාර ඒකක පරීක්ෂණ භාවිතා කරයි. PR base retargets නව චෙක්පතක් ඉල්ලා සිටී; body/title සංස්කරණ සඳහා නිරීක්ෂණ-පමණක් නම `Admission not requested / API Route Typecheck` භාවිතා කරන අතර ඇතුළත් කිරීමේ චෙක්පත ප්‍රතිස්ථාපනය කළ නොහැක.

### පිළිගැනීමේ reducer තුළ රඳවාගත් සාක්ෂි

`scripts/quality/validate-release-acceptance.mjs` සපයන ලද සැලැස්මක් සහ එහි manifest සාරාංශගත කරයි;
එම සැලැස්ම සම්පූර්ණ නිකුතු නලමාර්ගය ආවරණය කරන බව එය තහවුරු නොකරයි.
එම සැලැස්ම `VERIFIED` වූ විට පවා, එහි වාර්තා `releaseAcceptance: false` ලෙස පැහැදිලිව සකසයි.
`release-acceptance.yml` කාර්යප්රවාහය තවමත් සැබෑ build, package, boot හෝ promotion ලදුපත් වෙනුවට
shadow fixture භාවිත කරයි.

රඳවාගත් සාක්ෂි සත්යාපනය කිරීමට CLI එකට `--evidence-root` අවශ්ය වේ. ගොනු
`<evidence-root>/<artifact_id>/<member>` ලෙස නිරාකරණය කර SHA-256 ලෙස hash කරනු ලැබේ. සාක්ෂි නොමැති
PASS වාර්තාවක්, නොමැති හෝ වෙනස් වූ ගොනුවක්, අනාරක්ෂිත මාර්ගයක් හෝ symlink එකක් සත්යාපනය වළක්වයි.
නොමැති ගොනු හිස් සාර්ථක ලොග්වලට සමාන නොවේ. පවතින SHA/run/attempt පරීක්ෂණ ස්වාධීනව පවතී:
ගැළපෙන byte වලට කල් ඉකුත් වූ ලදුපතක් වලංගු කළ නොහැක. ගොනු අඛණ්ඩතාව යනු ක්රියාත්මක කිරීමේ
සත්යතාව හෝ artifact ප්රවර්ධනය පිළිබඳ සාක්ෂියක් නොවේ.

### DAST භාවිත කරන්නේ තහවුරු කළ CI build එකයි

අනිවාර්ය `dast-smoke` CI job එක, `build` පසු `.github/workflows/dast-smoke.yml` කැඳවයි. සහාය දක්වන fork PR, release ඉලක්ක කරන PR සහ merge group ඇතුළුව build එකේම code/draft තේරීම එය අනුගමනය කරයි. DAST job එක නොමැති නම්, අසාර්ථක නම්, අවලංගු නම් හෝ අනපේක්ෂිතව මඟහැරී ඇත්නම් `Gate / CI` අවහිර වේ. නැවත භාවිත කළ හැකි workflow එකට ස්වාධීන PR/dispatch trigger එකක් නැත; අතින් කරන validation සඳහා CI dispatch යොදාගන්නා නිසා build සහ consumer එකම run එක තුළ පවතී.

`scripts/ci/next-build-provenance.mjs`, සම්පූර්ණ Next artifact එක එහි tar digest, repository/event/run, producer attempt, head/base/checkout/tree, workflow අනන්‍යතා, lockfile, නිශ්චිත Node version/ABI, platform සහ bundler සමඟ බැඳ තහවුරු කරයි. DAST, `needs.build.outputs` වෙතින් වෙනස් කළ නොහැකි artifact ID තෝරා, download digest තහවුරු කිරීම අනිවාර්ය කරයි. අවසර ලැයිස්තුවේ සාමාජිකයන් දෙදෙනා `scripts/ci/unpack-ci-build.py` හරහා උපුටාගැනීමට පෙර ZIP hash ස්වාධීනව ගණනය කර producer digest සමඟ සසඳයි. Next tree උපුටාගැනීමට පෙර manifest සහ tar archive ද ස්වාධීන producer output සමඟ ගැළපිය යුතුය. Branch එකේ අවසන් සාර්ථක build එක කිසිවිටක සොයන්නේ නැත. ID සහ සියලු input තවමත් ගැළපේ නම් partial rerun එකට එම producer attempt නැවත භාවිත කළ හැක; receipt එක attempt දෙකම සටහන් කරයි.

Consumer ක්‍රියාත්මක වන්නේ repository කියවීමට පමණක් අවසර ඇති hosted Linux runner එකකය; repository secret නොමැත. එය producer භාවිත කළ නිශ්චිත Node version ස්ථාපනය කර `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1` සමඟ CLI සකස් කරයි. ඕනෑම fallback build එකකට පෙර standalone server නොමැති අවස්ථාව `scripts/build/standaloneInput.mjs` ප්‍රතික්ෂේප කරයි; සාමාන්‍ය දේශීය CLI build දැනට ඇති fallback රඳවාගනී. Server readiness, Schemathesis සහ promptfoo සියල්ල වෙනස් නොකළ මිනිත්තු 25 job සීමාව තුළ සාර්ථක විය යුතුය. Provenance receipt එක input අනන්‍යතාව සහ bytes සනාථ කරයි; සාර්ථක DAST scan එකක් සනාථ නොකරයි. Artifact කල් ඉකුත් වීම, runner බාධාව හෝ scanner අසාර්ථක වීම අසම්පූර්ණ හෝ අසාර්ථක සාක්ෂි ලෙසම පවතී; advisory wrapper එකක් හරහා ඒවා PASS බවට පත් කළ නොහැක.

### UI ක්රියාත්මක කිරීමේ ධාරිතාව

CI එක සම්පූර්ණ UI ඉන්වෙන්ටරිය `test-vitest` matrix shard හතරක් ලෙස ධාවනය කරයි; එක් එක් shard එකකට
උපරිම worker දෙකක් සහ දැනට පවතින මිනිත්තු 15 ක කාර්ය කාලසීමාව ඇත. පළමු shard එක MCP/autoCombo
Vitest කට්ටලයද ධාවනය කරයි. අනිවාර්ය කාර්ය ප්රතිඵලය සෑම matrix කොටසක්ම ආවරණය කරයි; එක් shard එකක්
අසාර්ථක වීමෙන් හෝ අවලංගු වීමෙන් අපේක්ෂක ඇතුළත් කිරීම තහවුරු කළ නොහැක.

රාත්රී නිරීක්ෂකය සෑම UI shard එකක් සඳහාම වෙනම, නිශ්චිත අපේක්ෂක ලදුපතක් රඳවා ගනී;
පළමු ලදුපතෙහි MCP ක්රියාත්මක කිරීමද ඇතුළත් වේ. ලදුපත් හතරම, ලොග් සහ ගැළපෙන ක්රියාත්මක කිරීමේ
අනන්යතා අවශ්ය වේ. දේශීය `npm run test:vitest:ui` තවමත් සම්පූර්ණ කට්ටලය තෝරාගනී;
එක් `--shard` ධාවනයක් අර්ධ සාක්ෂියක් පමණි.

### ඒකක ආවරණ එකතු කිරීම

ඒකක shard දොළහ ඒවායේ පවතින පරීක්ෂණ ක්රියාත්මක කිරීම අතරතුර V8 ආවරණය එකතු කරයි. සාර්ථක
shard එකක් අතරමැදි Istanbul වාර්තාවක් ජනනය නොකර මුල් ගොනු සම්පීඩනය කිරීමට
`scripts/ci/compact-v8-coverage.mjs` ධාවනය කරයි. අවසාන Coverage කාර්යය අපේක්ෂක SHA, runtime,
source root සහ data hash වලට එරෙහිව manifest දොළහම සත්යාපනය කර, අනතුරුව c8 හි reporter සහ පවතින
ආවරණ සීමා ධාවනය කරයි. ආදාන c8 හි ගෝලීය ගොනුනාම අනුපිළිවෙළ රඳවා ගනී; මිශ්ර function/block
ආවරණය සඳහා shard-මට්ටමේ පූර්ව-ඒකාබද්ධ කිරීම අනාරක්ෂිතය. නොමැති, දෝෂ සහිත හෝ නොගැළපෙන shard
ඇතුළත් කිරීම අසාර්ථක කරයි. අසාර්ථක පරීක්ෂණ shard, raw රෝගනිශ්චය ආවරණය වෙනම රඳවා ගනී;
එයට අවසාන ඒකාබද්ධ කිරීමට ඇතුළත් විය නොහැක.

### ඒකක ක්රියාත්මක කිරීමේ ප්රගති ලදුපත්

හවුල් `test:unit:ci:shard` විධානය `scripts/ci/unit-progress-reporter.mjs` හරහා `primary`, `dashboard` සහ `serial` අදියර වාර්තා කරයි. සාමාන්ය පරීක්ෂණ වාර්තාව දිගටම ලබාගත හැකිය. වෙනම, පාරදත්ත පමණක් අඩංගු ලදුපතක් සෑම ගොනුවකම ආරම්භය සහ සම්පූර්ණ වීම වාර්තා කරන අතර, තත්පර 30ක හෘදස්පන්දන සංඥාවක් තවමත් සක්රිය ගොනු සහ ඒවායේ ගත වූ කාලය ලැයිස්තුගත කරයි. එය වාර්තා කරන්නේ අවසර ලැයිස්තුවට ඇතුළත් ක්රියාත්මක කිරීමේ පාරදත්ත පමණි; පරීක්ෂණ විස්තර, ප්රතිදානය, දෝෂ අන්තර්ගත සහ සම්පූර්ණ පරිසරය අනුක්රමීකරණය නොකෙරේ.

CI විසින් JSONL ගොනු `unit-progress-ci-<run>-<attempt>-<shard>` ලෙස රඳවා ගනී. කාර්ය කාලසීමාව ඉක්මවීමක් හේතුවෙන් පසුකාලීන උඩුගත කිරීම වැළැක්විය හැකිය; දැනටමත් නිකුත් කර ඇති හෘදස්පන්දන සංඥා රෝගනිශ්චය සාක්ෂි ලෙස පවතී. හෘදස්පන්දන සංඥා නොමැති වීම අවහිර වූ හෝ අවසන් කරන ලද ධාවක ක්රියාවලියක් ද පෙන්නුම් කළ හැකිය. මෙම ලදුපත් දැනට පවතින පරීක්ෂණ තේරීම, සමගාමීත්වය, නියමිත කාලසීමා සහ පිටවීමේ තත්ත්වය ආරක්ෂා කරයි; ඒවා අපේක්ෂක-ඇතුළත් කිරීමේ තීන්දු නොවේ.

### පෝලිම ඒකාබද්ධ කරන්න

`queue` ලේබලය Mergify පෝලිමට (`.mergify.yml`) PR යවයි. Mergify විසින් `mergify/merge-queue/` ශාඛාවක් මත PR කෙටුම්පතක් විවෘත කරයි, CI එහි සම්පූර්ණ තේරීම ධාවනය කරයි, සහ `Gate / CI`, `Gate / Quality` සහ `Merge integrity (changelog + generated skills)` සමත් වූ විට මුල් PR ඒකාබද්ධ වේ.

Mergify එහි පෝලිම් සාරාංශය කෙටුම්පතේ විස්තරයට ලියන අතර අනෙකුත් යෙදුම් වලටද එය සංස්කරණය කළ හැක. එවැනි කෙටුම්පතක `pull_request` `edited` සිදුවීමක් එහිම සමගාමී කණ්ඩායමක් (`-queue-edit-<run_id>`) ගන්නා බැවින් එයට කෙටුම්පතේ සැබෑ ධාවනය අවලංගු කළ නොහැකි අතර එය ගේට්ටුව සහ අනුකෘතිය මඟ හරියි. තාම දුවන්නේ `Merge integrity` විතරයි. Mergify විසින් මඟ හැරුණු `Gate / CI` එකක් අසාර්ථක චෙක්පතක් ලෙස කියවා PR dequeue කරන නිසා, මඟ හැරුණු ගේට් කාර්යය වෙනස් චෙක්පත් නාමයක් දරයි.

dequeue එකකින් පසු, push එකක් සෑම විටම PR ඉල්ලන්නේ නැත. ඒකට `@mergifyio queue` කමෙන්ට් කරන්න.

### ස්ථිතික ස්කෑන් ඉන්වෙන්ටරිය

අනුවාදගත npm-alias ඉන්වෙන්ටරිය සහ static-scan සාමාජිකත්වය
`config/quality/gate-manifest.json` තුළ පවතී. `package.json` සමඟ script නාම සහ නිශ්චිත විධාන
සත්යාපනය කිරීමට `npm run check:gate-manifest` ධාවනය කරන්න; එක් කිරීම්, ඉවත් කිරීම් සහ විධාන වෙනස්වීම්
දේශීය hook එක සහ CI හි වෙනස්කම්-වර්ගීකරණ කාර්ය දෙකම අසාර්ථක කරයි.
alias එකක් යනු කාර්යප්රවාහ කාර්යයක්, matrix instance එකක් හෝ test case එකක් නොවේ: මෙම ගණන්
එකිනෙකට හුවමාරු කළ හැකි ලෙස ඉදිරිපත් නොකළ යුතුය.

තෝරාගත් alias ක්රියාත්මක නොකර පරීක්ෂා කිරීමට `npm run quality:scan -- --list` හෝ
`npm run quality:scan:fast -- --list` භාවිත කරන්න. runner එක npm entrypoint එක ආරාධනය කරන බැවින්,
එහි runtime එක (වින්යාස කර ඇති තැන්වල Bun ඇතුළුව) රඳවා ගැනේ. manifest එක එම පැතිකඩවලින් පිටත alias,
වෙනම ආරාධනය කරන ඒවා ලෙස වාර්තා කරන අතර read-only scan පැතිකඩවල maintenance විධාන තහනම් වේ.

මෙම පැතිකඩ ආවරණය කරන්නේ static scan එක පමණි. ඒවා product test, coverage, packaging, external check
හෝ අපේක්ෂකයෙකුගේ සම්පූර්ණ release acceptance සහතික නොකරයි. කාර්යප්රවාහ ඇතුළත් කිරීම සම්බන්ධිත
`config/quality/admission-policy.json` සහ `scripts/quality/admission-verdict.mjs` භාවිත කරයි.
Release-observer පැතිකඩ වෙනම පවතී; ඒවායේ අදාළ පරීක්ෂණ සහ ලදුපත් ස්වාධීනව පරීක්ෂා කරන්න.
සම්පූර්ණ observer එකේ static විධාන `config/quality/release-green-static-profile.json` තුළ ප්රකාශ කර ඇත;
එයට `audit:deps`, mutation-test තේරීම සහ පරිවර්තන පරීක්ෂණ ඇතුළත් වේ. loader එක npm විධාන
package.json සහ ආකෘතිගත කළ CI/Quality ප්රකාශනවලට එරෙහිව සත්යාපනය කරයි; shell token තර්ක ලෙස
ක්රියාත්මක කිරීම වෙනුවට එය වෙනස්වීම් ප්රතික්ෂේප කරයි. අනිවාර්ය scanner එකක SKIP/INCOMPLETE ප්රතිදානයට
PASS තහවුරු කළ නොහැක. පැතිකඩ එහි external exclusion වාර්තා කරන අතර hosted coverage, test matrix,
package හෝ deployment සාක්ෂි ප්රතිස්ථාපනය නොකරයි. පහත ගද්ය ඉන්වෙන්ටරිය යොමුවක් පමණි;
ගේට් එකක් සැබවින්ම ධාවනය වූ බවට එය සාක්ෂියක් නොවේ.

Script, `scripts/check/` (ප්රතිපත්ති ගේට්) සහ `scripts/quality/` (ratchet engine) යටතේ පවතී.
CI සඳහා සත්යයේ මූලාශ්රය `.github/workflows/ci.yml` වේ.

### ප්රකාශිත මූලික ලේඛනවල සෞඛ්ය තත්ත්වය

`.github/workflows/i18n-base-health.yml` මඟින් තෝරාගත් `main` සහ `release/v*` වෙත සිදු කරන
push කිරීම්වලින් පසුව සහ අතින් ක්රියාත්මක කිරීමේදී ලේඛනවල සෞඛ්ය තත්ත්වය නිරීක්ෂණය කරයි. එහි පෙරහන් ලේඛන,
මූල Markdown, `llm.txt`, පරිවර්තන තත්ත්වය/වින්යාසය සහ අදාළ i18n මෙවලම් ආවරණය කරයි.
එකම `Published base documentation health` කාර්යය සත්කාරකත්වය සපයන Ubuntu පරිසරයක් සහ මිනිත්තු පහක
කාල සීමාවක් භාවිත කරයි. එය කියවීමට පමණක් සීමා වූ වලංගුකරණයක් සිදු කරන අතර
පරායත්තතා ස්ථාපනයකින්, පරිවර්තනයකින් හෝ තත්ත්වය භාරගැනීමකින් තොරව රෝගනිශ්චය ලදුපතක් ලියයි.

`scripts/i18n/check-base-health.mjs` සඳහා මූලාශ්ර-hash, අස්ථානගත ඉලක්ක, ඉලක්ක-hash,
යල් පැනගිය පරිවර්තන සහ අංශ-cache නොගැළපීම් කිසිවක් නොතිබීම අවශ්ය වේ. එය වත්මන් මූලික
ලේඛන/locale විෂය පථය සහ එහි වාර්තාගත මූලාරම්භ තොරතුරු ද වලංගු කරයි. වලංගු නොවන සන්දර්භයක්, අසම්පූර්ණ ආවරණයක්
හෝ බාධා වූ පරීක්ෂකයක් `INCOMPLETE` ප්රතිඵලය ලබා දෙයි; තහවුරු කළ වෙනස්වීමක් `FAIL` ප්රතිඵලය ලබා දෙයි. අවස්ථා දෙකේදීම
අසාර්ථක පිටවීමේ තත්ත්වයක් ලබා දෙයි. ලදුපත checkout SHA, workflow, run සහ
attempt සමඟ බැඳී ඇති අතර `i18n-base-health-<sha>-<run>-<attempt>` ලෙස රඳවා තබා ගනී.

මෙය ප්රකාශිත මූලික අන්තර්ගතය පිළිබඳ ස්වාධීන නිරීක්ෂණයකි. එය PR හෝ
merge-group සිදුවීමක්, අනිවාර්ය PR පරීක්ෂාවක්, npm අන්වර්ථ නාමයක් හෝ static-scan පැතිකඩ සාමාජිකයෙකු එක් නොකරයි.
පවතින වෙනස්කම්-පදනම් වූ PR ප්රතිපත්තිය සහ යටින් පවතින පරීක්ෂකයේ උපදේශනාත්මක වර්ගීකරණ
වෙන්ව පවතී. සාර්ථක upload කිරීමකට අසාර්ථක සෞඛ්ය ප්රතිඵලයක් PASS බවට පත් කළ නොහැක.

### PR වේගවත් මාවත මුදා හරින්න (`quality.yml`)

`.github/workflows/quality.yml` main/release PRs මත CI සම්පූර්ණ කරයි, `main` වෙත තල්ලු කරයි, කණ්ඩායම් යැවීම සහ ඒකාබද්ධ කිරීම. PRs මාර්ගයෙන් පෙරන ලද වේගවත් චෙක්පත් භාවිතා කරයි. ස්ථිරවම අබල කළ අනුපිටපත් ගොඩනැගීම ඉවත් කරන ලදී; සැබෑ build/package/boot චෙක්පත් CI හි පවතී. ඒකක කට්ටලය සහ vitest ධාවනය වන්නේ CI (`Unit Tests (N/8)` සහ `Vitest`) තුළ පමණි.

| රැකියාව                                          | විෂය පථය                                                                                                                                                                                           | අවහිර කිරීම          |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs සහ docs-all                                                                                                                                                           | ඔව්                  |
| `Fast Quality Gates`                             | කේතය PRs; ස්ථිතික චෙක්පත්, ටයිප් චෙක්, ඩෑෂ්බෝඩ් ටයිප් චෙක්, බලපෑමට ලක් වූ ඒකක පරීක්ෂණ                                                                                                              | ඔව්                  |
| `Forgotten sibling tests`                        | කේතය PRs; ස්ථිතික පාරිභෝගිකයින් සහ අපේක්ෂක සහෝදර සහෝදරියන්ගේ පරීක්ෂණ සඳහා වෙනස් කරන ලද මොඩියුල; බැරල් සහ ගතික-ආනයන මාර්ග නිර්දේශිත අවසර ලැයිස්තු ව්‍යතිරේක සහිතව උපදේශන රෝග විනිශ්චය ලෙස වාර්තා වේ | **උපදේශන**           |
| `No new ESLint warnings`                         | කේතය PRs; මර්දනය-දැනුවත් lint guard                                                                                                                                                                | ඔව්, ගෑරුප්පු ඇතුළුව |
| `Merge integrity (changelog + generated skills)` | කෙටුම්පත් නොවන PRs; changelog සහ ජනනය කරන ලද කුසලතා සමමුහුර්තකරණය                                                                                                                                  | ඔව්, ගෑරුප්පු ඇතුළුව |

#### අමතක වූ සහෝදර සහෝදරියන්ගේ පරීක්ෂණ වාර්තාව

`npm run check:forgotten-sibling-tests` `Fast Quality Gates` හි උපදේශන පියවරක් ලෙස ක්‍රියාත්මක වන අතර පරීක්ෂණ-බලපෑම් සිතියම පිටුපස ආයාත විසදුම නැවත භාවිතා කරයි. වෙනස් කරන ලද සෑම නිෂ්පාදන මොඩියුලයක් සඳහාම, අපේක්ෂක පරීක්ෂණය අදින්න-ඉල්ලීමේ වෙනසෙන් නොමැති විට එය නියතිවාදී `changed module/symbol -> static consumer -> candidate sibling test` දාමයන් වාර්තා කරයි. Markdown සාරාංශය සහ JSON ප්‍රතිඵලය ඕනෑම අවහිර කිරීම් පෙරළීමකට පෙර ක්‍රමාංකනය සඳහා `forgotten-sibling-tests` කාර්ය ප්‍රවාහ කෞතුක වස්තුව ලෙස රඳවා තබා ගනී.

බැරල් ප්‍රති-අපනයන සහ ගතික ආනයනයන් විභේදන රෝග විනිශ්චයන් පමණි; ඔවුන් කිසි විටෙකත් අවහිර සොයාගැනීමක් නිර්මාණය නොකරයි. සමාලෝචිත ව්‍යතිරේක සජීවීව `config/quality/forgotten-sibling-allowlist.json`. සෑම ප්‍රවේශයක්ම පාරිභෝගික සහ අපේක්ෂක පරීක්‍ෂණය නම් කළ යුතුය, නිශ්චිත තාර්කිකත්වයක් ලබා දිය යුතුය, සහ GitHub නිකුතුවක් හෝ අදින්න ඉල්ලීමක් සම්බන්ධ කළ යුතුය. විකෘති ඇතුළත් කිරීම් අසාර්ථකයි වසා ඇත. ව්‍යතිරේකවලට මකා දැමූ අපේක්ෂක පරීක්ෂණයක් හෝ `.skip`/`.todo` එකතු කරන වෙනස මැඩපැවැත්විය නොහැක ; ප්‍රකාශය දුර්වල කිරීම සහ වෙනත් ආවරණ ස්වාධීනව අවහිර කරන `check:test-masking` ගේට්ටුව සතු වේ.

### කාර්යය: `lint`

`main` වෙත යොමු කරන සෑම PR එකකම ක්රියාත්මක වේ. අසමත් වුවහොත් merge කිරීම අවහිර කරයි.

| ස්ක්රිප්ට් (`npm run ...`)        | වලංගු කරන්නේ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | අවහිර කිරීම                                |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Node.js අනුවාදය සහාය දක්වන පරාසය තුළ පවතී                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ඔව්                                        |
| `check:cycles`                    | `src/` + `open-sse/` සියල්ල පුරා ඇති චක්රීය ආයාත (AST මත පදනම් වූ, tsconfig `paths` විසඳන ලද). කිසියම් චක්රයක් පවතින සෑම විටම මූලික විධානය 1 සමඟ පිටවෙයි (#15281 සිට fail-closed) සහ SCC ලැයිස්තුගත කරයි. `check:cycles:ratchet` (CI ධාවනය කරන විධානය) ගණන `quality-baseline.json` හි `metrics.cycles` උපරිමය ඉක්මවන විට අවහිර කරයි — දැනට 14, `direction: down`, එබැවින් එය අඩු වීමට පමණක් හැකිය (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ඔව් (රැචට්)                                |
| `check:boundary`                  | `open-sse → src` සම්බන්ධතාව: එන්ජිමෙන් යෙදුමට වන අනන්ය ගොනුවෙන්-ගොනුවට ආයාත (`scripts/quality/measure-boundary.mjs`; දාර ලැයිස්තුව v4 හරය/මොඩියුල-බෙදීමේ ප්රතිකර්ම පසුකාර්ය ලැයිස්තුවයි). මූලික විධානය = උපදේශනාත්මක වාර්තාව (`quality:boundary` හා සමාන). `check:boundary:ratchet` (CI ධාවනය කරන විධානය, එමෙන්ම `quality.yml` වේගවත්-ගේට්ටු රැචට් ලූපය තුළද ඇත) ගණන `quality-baseline.json` හි `metrics.boundaryOpenSseToSrc` උපරිමය ඉක්මවන විට අවහිර කරයි — මනින ලද 771 අගයෙන් ආරම්භ කර ඇත, `direction: down`; `--update` එය අඩු කිරීම පමණක් කරයි; PR මත පදනමට සාපේක්ෂ වේ (`--base-ref`, පහත බලන්න)                                                                                                                                                                                                                                                                                                                                                                                                                                        | ඔව් (රැචට්)                                |
| `check:route-validation:t06`      | සියලු මාර්ගවල Zod යෝජනාක්රම පවතී (Tier 6 ප්රතිපත්තිය)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ඔව්                                        |
| `check:any-budget:t11`            | `@ts-expect-error // any` ගණන අයවැය ඉක්මවා නොයයි (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ඔව්                                        |
| `check:provider-consistency`      | `providers.ts` හි සෑම provider එකකටම `providerRegistry.ts` හි ගැළපෙන entry එකක් ඇත (සහ ප්රතිවිරුද්ධ දිශාවටද, allowlist තුළ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ඔව්                                        |
| `check:model-lifecycle`           | අතින් නඩත්තු කරන routing table තුන checked-in lifecycle snapshot (#11503) සමඟ අනුකූලව පවතී: `FITNESS_TABLE` (`taskFitness.ts`) මඟින් `REGISTRY` හරහා route කළ හැකි retired id කිසිවකට score ලබා නොදේ; සෑම `BUILT_IN_ALIASES` target එකක්ම `REGISTRY` තුළ පවතින අතර retired-id snapshot එකෙහි නොපවතී; තවමත් `REGISTRY` තුළ ඇති සෑම retired id එකක්ම forward කර හෝ `allowedRetiredInCatalog` හි ලැයිස්තුගත කර ඇත; එමෙන්ම `DEFAULT_DEGRADATION_MAP` හි කිසිදු source එකක් හෝ target එකක් එම snapshot එකෙහි retired ලෙස නොපෙන්වයි. මෙමඟින් model එකක් දැනට සජීවී upstream එකක් මඟින් සපයන බව තහවුරු නොවේ. Offline — `config/quality/model-lifecycle.json` සමඟ සසඳයි; එය අතින් `npm run quality:refresh-model-lifecycle` භාවිතයෙන් refresh කරනු ලැබේ (network; CI වෙත සම්බන්ධ කර නැත). `allowedRetiredInCatalog` යනු burn-down ratchet එකකි: entry එකක් එක් කළ යුත්තේ tracking issue එකක් සමඟ පමණි.                                                                                                                                               | ඔව්                                        |
| `check:fetch-targets`             | client-side `src/` තුළ ඇති සෑම `fetch("/api/...")` එකක්ම සැබෑ `route.ts` එකකට resolve වේ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ඔව්                                        |
| `check:deps`                      | repo එකෙහි සෑම `package.json` එකක් පුරාම ඇති, `npm install` කළ හැකි සියලු deps `dependency-allowlist.json` තුළ ඇත; නව unpinned හෝ slopsquatted packages සලකුණු කරනු ලැබේ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ඔව්                                        |
| `audit:deps`                      | ස්වාධීන lockfile පහේම (root, Electron, OpenCode plugins v1/v2 සහ provider) npm audit එක. Critical advisories අවහිර කරයි; high advisories දෘශ්ය warnings ලෙස පවතී. අස්ථානගත/අසාර්ථක audits INCOMPLETE වන අතර අවහිර කරයි; scope එකකට අදාළ lock hashes සහ reports රඳවා තබා ගනී.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ඔව්                                        |
| `check:lockfile`                  | `package-lock.json` අඛණ්ඩතාව — https registry, අඛණ්ඩතා hashes, host අතික්රමණ නොමැත                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ඔව්                                        |
| `check:licenses`                  | නිෂ්පාදන dependencies සඳහා SPDX බලපත්ර allowlist                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ඔව්                                        |
| `check:tracked-artifacts`         | build artifacts / commit කළ `node_modules` symlinks නොමැත (husky pre-commit තුළද ධාවනය වේ; pre-push හිතාමතාම සැහැල්ලුව තබා ඇත — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ඔව්                                        |
| `check:ai-attribution`            | PR commits, title හෝ body තුළ AI/bot `Co-Authored-By` trailer හෝ AI-generation footer නොමැත — දැඩි නීතිය #16 (`quality.yml` හි PR→`release/**` සඳහා වන fast-gates loop තුළ — event payload කියවයි, PR නොවන අවස්ථාවල කිසිවක් නොකරයි — සහ PR→`main` සඳහා `ci.yml` lint තුළ ඇති PR-පමණක් step එකක්; එමෙන්ම husky `commit-msg` hook එකද; මානව co-authors සඳහා අවසර ඇත; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:vitest-exclusions`         | සෑම Vitest exclusion එකක්ම tracking issue එකක් නම් කරන අතර `config/quality/vitest-exclusions.json` තුළ දිස්වේ (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ඔව්                                        |
| `check:file-size`                 | source files (`src/`, `open-sse/`, `electron/`, `bin/` තුළ ඇති `.ts`/`.tsx`) `cap` සීමාව තුළද test files (`*.test.ts(x)`) `testCap` සීමාව තුළද පවතී; `file-size-baseline.json` තුළ ස්ථාවර කළ files (`frozen` / `testFrozen`) ඒවායේ වාර්තාගත ප්රමාණයට වඩා වර්ධනය නොවිය යුතුය                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ඔව්                                        |
| `check:error-helper`              | executors/handlers තුළ ඇති දෝෂ ප්රතිචාර `buildErrorBody()` / `sanitizeErrorMessage()` භාවිත කරයි (දැඩි රීතිය #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ඔව්                                        |
| `check:migration-numbering`       | Migration SQL ගොනු හිඩැස් හෝ අනුපිටපත් නොමැතිව අනුක්රමිකව අංකනය කර ඇත                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ඔව්                                        |
| `check:public-creds`              | `publicCreds.ts` පිටත සෘජුව සඳහන් කළ OAuth `client_id`/`client_secret` හෝ Firebase Web යතුරු නොමැත (දැඩි රීතිය #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ඔව්                                        |
| `check:db-rules`                  | `src/lib/db/` මොඩියුලවලින් පිටත raw SQL නොමැත; `localDb.ts` වෙතින් barrel-imports නොමැත (දැඩි රීති #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ඔව්                                        |
| `check:known-symbols`             | තම dispatch වගු තුළ ලියාපදිංචි කර ඇති provider executors, routing strategies සහ translators තැටියේ ඇති ගොනුවලට ගැළපේ — අනාථ හෝ ප්රකාශ නොකළ symbols නොමැත                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ඔව්                                        |
| `check:route-guard-membership`    | child process එකක් ආරම්භ කරන සෑම route එකක්ම `isLocalOnlyPath()` මඟින් වර්ගීකරණය කර ඇත (දැඩි රීති #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ඔව්                                        |
| `check:test-discovery`            | repo තුළ ඇති සෑම `*.test.ts` / `*.spec.ts` ගොනුවක්ම අවම වශයෙන් එක් පරීක්ෂණ ධාවකයක් මඟින් රැස් කරනු ලැබේ (ratchet: `test-discovery-baseline.json` තුළ ඇති අනාථ ලැයිස්තුව හැකිලීම පමණක් සිදු විය හැක)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ඔව්                                        |
| `check:test-tla-order`            | `tests/unit` යටතේ ඇති කිසිදු `node:test` ගොනුවක් පරීක්ෂණයක් ලියාපදිංචි කර, ඉහළ මට්ටමේ `await` එකකට ළඟා වී, ඉන්පසු තවත් පරීක්ෂණ ලියාපදිංචි නොකරයි (#18045; ratchet: `test-tla-order-allowlist.json` හැකිලීම පමණක් සිදු විය හැක)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ඔව්                                        |
| `check:agent-skills-sync`         | ජනනය කළ agent-skills කලාකෘති ඒවායේ මූලාශ්ර නාමාවලියට ගැළපේ (වෙනස් වීමක් නොමැත)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:provider-asset-provenance` | සැපයුම්කරුගේ ලාංඡන/වත්කම් සඳහා වාර්තා කළ ප්රභව සටහනක් ඇත                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `lint:json`                       | JSON වින්යාස ගොනු විග්රහ කළ හැකි අතර repo lint රීති සපුරාලයි                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `typecheck:core`                  | දෝෂ නොමැති TypeScript සම්පාදනය (උපදේශාත්මක අනතුරු ඇඟවීම් පමණි)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ඔව්                                        |
| `typecheck:noimplicit:core`       | දැඩි `noImplicitAny` — අනාගතය ඉලක්ක කරගත්; පෙර සිට පවතින බොහෝ ඇමතුම් ස්ථානවලට තවමත් විවරණ අවශ්ය වේ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | **උපදේශාත්මක** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` වෙත සීමා කළ `tsc` (#7033) — `typecheck:core` හි තෝරාගත් ගොනු 27ක අවසර ලැයිස්තුවට කිසිදු dashboard TSX ගොනුවක් ඇතුළත් නොවන අතර, `next build` ද එය කිසිවිටෙක type-check නොකරයි (`next.config.mjs` විසින් `ignoreBuildErrors: true` සකසයි); එබැවින් එහි orphaned-identifier regressions (#6625/#6909) CI වෙත නොපෙනුණි. ස්ථිර කළ එක්-ගොනුවකට/එක්-TS-code එකකට අදාළ ගණන් baseline එකකට (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` හා සමාන stale-enforcement රටාව) එරෙහිව වෙනස්කම් සසඳයි — baseline කළ ගණන ඉක්මවන නව දෝෂ පමණක් gate එක අසමත් කරයි; පෙර පැවති දෝෂයක් නිවැරදි කළ විට `--update` භාවිතයෙන් ratchet එක පහළ දමන්න.                                                                                                                                                                                                                                                                                                                                                             | ඔව්                                        |
| `check:build-typecheck`           | `tsconfig.build.json` හරහා සිදුකරන සම්පූර්ණ යෙදුම් production type check එකකි (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`). මෙය `typecheck:core` හි ගොනු 27ක allowlist එකෙන් සහ dashboard gate එකෙන් ආවරණය නොවන පරාසය පරීක්ෂා කරයි. `config/quality/build-typecheck-baseline.json` ට එරෙහිව වෙනස්කම් පරීක්ෂා කරයි; නව හෝ ඉහළ ගිය එක් එක් (ගොනුව, කේතය) ගණනක් gate එක අසමත් කරයි, අඩු වූ ගණනක් ratchet කිරීමට ඔබගෙන් ඉල්ලා සිටී. ධාවනය තුළ නව හෝ ඉහළ ගිය යුගලයක් තිබේ නම් `--force-regressions` ලබා නොදී `--update` ප්රතික්ෂේප කරයි. එසේම, `--force-nocheck` ලබා නොදී අලුතින් නිහඬ කළ ගොනුවක් ප්රතික්ෂේප කරයි. එබැවින් green තත්ත්වයක් ලබාගැනීමට baseline එක පුළුල් කිරීම සහ ස්ථිර silence එකක් ලබාදීම වෙනම, හිතාමතා කළ යුතු ක්රියා දෙකකි. හිස් `--force` ප්රතික්ෂේප කරයි. තවද, `@ts-nocheck` භාවිත කරන ගොනුවක් කිසිදු diagnostic එකක් වාර්තා නොකරන බැවින් සහ එසේ නොමැති නම් සෑම gate එකකින්ම නොපෙනී යන බැවින්, `config/quality/ts-nocheck-baseline.json` ට එරෙහිව build scope එක `@ts-nocheck` සඳහා පරීක්ෂා කරයි. | ඔව්                                        |

#### Typecheck වැඩසටහන් දෙක වෙනස් ආකාරයෙන් පිළිතුරු දෙයි

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) සහ `check:build-typecheck` විවිධ විකල්ප යටතේ විවිධ
වැඩසටහන් compile කරයි; එම ගොනුවම එකකදී දෝෂ රහිතව පවතින අතර අනෙකෙහි
දෝෂවලින් පිරී තිබිය හැක.

`tsconfig.build.json` මඟින් `"strict": false` සකසන බැවින් `noImplicitAny` අක්රියයි. Core
config එක වඩා දැඩි විකල්ප සහිතව තෝරාගත් ගොනු 27ක allowlist එකක් compile කර, එක් එක්
entry එකේ import graph එක අනුගමනය කරයි. එබැවින් build program එකෙහි කිසිදා
නොපෙන්වන ගොනු පවා එහිදී පරීක්ෂා වේ.

ගොනුවක් typed ද යන්න තීරණය කිරීමේදී මෙහි ප්රතිඵලය වැදගත් වේ: **`check:build-typecheck` යටතේ
diagnostics ශුන්ය වීම යනු ශුන්ය නොවේ**. ගොනු 26කින් `@ts-nocheck` ඉවත් කළ විට,
build program එකෙහි ඒවායින් 23ක් දෝෂ රහිත බව පෙනී ගියේය; ඒවායින් දහසයක් strict එකෙහි
implicit-any දෝෂ 120ක් පමණ මතු කළේය. ගොනුවක් clean ලෙස හැඳින්වීමට පෙර දෙකම
පරීක්ෂා කරන්න.

### Job: `quality-gate`

`test-coverage` පසු ධාවනය වේ. අසමත් වුවහොත් merge කිරීම අවහිර කරයි.

| ස්ක්රිප්ට් එක                | වලංගු කරන දේ                                                                                                                                                 | අවහිර කිරීම               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `quality:collect`            | `quality-metrics.json` නිකුත් කරයි (ESLint අනතුරු ඇඟවීම් ගණන, ඒකාබද්ධ කළ shard වාර්තාවෙන් coverage)                                                          | ඔව් (ratchet හි upstream) |
| `quality:ratchet`            | `quality-baseline.json` හි සෑම metric එකක්ම පසුබැසී නොමැත (ESLint අනතුරු ඇඟවීම් ≤ baseline; coverage ≥ baseline)                                             | ඔව්                       |
| `check:duplication`          | කේත අනුපිටපත් වීම (jscpd@4) `quality-baseline.json` හි baseline එක නොඉක්මවයි                                                                                 | ඔව්                       |
| `check:complexity`           | ගොනු-මට්ටමේ cyclomatic complexity එක cap එක නොඉක්මවයි (core ESLint `complexity` + `max-lines-per-function`)                                                  | ඔව්                       |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — වෙනම ESLint pass එකකි; CI විසින් දෙකම තනි `check:complexity-ratchets` පියවර ලෙස ඒකාබද්ධව ධාවනය කරයි | ඔව්                       |
| `check:dead-code`            | භාවිත නොකළ exports / files ratchet එක (knip) baseline එකට සාපේක්ෂව පසුබැසී නොමැත                                                                             | ඔව්                       |
| `check:compression-budget`   | Compression benchmark budget — එක් එක් engine එකේ token-savings අවම සීමා පසුබැසිය නොහැක                                                                      | ඔව්                       |
| `check:type-coverage`        | Percent-typed ratchet (`type-coverage`) පසුබැසී නොමැත; බොහෝ දුරට `typecheck:noimplicit:core` ආවරණය කරයි                                                      | ඔව්                       |

### Job: `codeql-scan` සහ `codeql-admission`

`codeql-scan` වින්‍යාස කළ සියලු analysis category නිපදවයි. එම job එක සාර්ථක වූ පසු `codeql-admission` එහි නිශ්චිත upload සහ candidate alert ratchet තහවුරු කරයි. ලේඛන පමණක් වෙනස් කරන candidate ඇතුළුව දෙකම `Gate / CI` හි අනිවාර්ය dependency වේ. පරිපාලන activation සහ canary අවශ්‍යතා පහත “CodeQL ratchet” කොටසේ විස්තර කෙරේ.

| Script                 | තහවුරු කරන්නේ                                                                                                                                                                  | අවහිර කරයිද |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `check:codeql-ratchet` | Alert ratchet ට පෙර candidate ref/SHA සහ වින්‍යාස කළ සියලු analysis category වත්මන් විය යුතුය; සාක්ෂි නැතිනම් අවහිර වේ. සමස්ත inventory වෙනම පවතී — පහත “CodeQL ratchet” බලන්න | ඔව්         |

### කාර්යය: `quality-extended`

මෙම කාර්යය අදාළ candidates අවහිර කරයි. Bundle ප්රමාණය, secret findings, vulnerability
findings, workflow findings සහ OpenAPI වෙනස්කම් අවශ්ය ratchets සමඟ පරීක්ෂා කෙරේ.
Circular-dependency diagnostics උපදේශාත්මක ලෙසම පවතී. Scanner ස්ථාපනය අවශ්ය වේ:
`scripts/ci/install-quality-scanners.sh` මඟින් pin කළ versions සපයා ස්ථාපන
අසමත්වීම් ප්රචාරණය කරයි. අස්ථානගත tools, වලංගු නොවන reports හෝ අස්ථානගත baselines නිසා
අවශ්ය scanner gate එක INCOMPLETE තත්ත්වයේ පවතී.

| ස්ක්රිප්ට්               | වලංගු කරන්නේ                                                                                                                                                                                                                         | අවහිර කිරීම                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| `check:circular-deps`    | චක්රීය පරායත්තතා නොමැති බව (dpdm)                                                                                                                                                                                                    | **උපදේශාත්මක**                                                |
| `check:bundle-size`      | බණ්ඩලයේ ප්රමාණය උපරිම සීමාව නොඉක්මවන බව; මිනුමක් ලබාගත නොහැකි නම් පරීක්ෂාව අසාර්ථක වේ                                                                                                                                                | **--ratchet සමඟ අවහිර කරයි**                                  |
| `check:secrets`          | Gitleaks සොයාගැනීම් පසුබැසීමක් නොපෙන්වන බව; අවශ්ය ස්කෑන්වලදී මෙවලම්/මූලාශ්රය/මූලික අගය නොමැති වීම, අසාර්ථක ස්කෑන් සහ වලංගු නොවන වාර්තා ප්රතික්ෂේප කරයි                                                                               | **--ratchet සමඟ අවහිර කරයි**                                  |
| `check:vuln-ratchet`     | පරායත්තතා අවදානම් පසුබැසීමක් නොපෙන්වන බව; අවශ්ය ස්කෑන්වලදී මෙවලම් නොමැති වීම, වලංගු නොවන වාර්තා හෝ මූලික අගයන් නොමැති වීම ප්රතික්ෂේප කරයි                                                                                            | **--ratchet සමඟ අවහිර කරයි**                                  |
| `check:workflows`        | කාර්ය ප්රවාහ lint කිරීම (actionlint + zizmor); ස්කෑනර් නොමැති/බිඳුණු විට, වාර්තා වලංගු නොවන විට හෝ ratchet මූලික අගය නොමැති විට INCOMPLETE ලෙස අසාර්ථක වේ. වලංගු සොයාගැනීම් තෝරාගත් strict/advisory/ratchet ප්රතිපත්තිය අනුගමනය කරයි | ක්රියාත්මක කිරීම අනිවාර්යයි; CI තුළ zizmor ratchet අවහිර කරයි |
| `check:openapi-breaking` | ස්ථාපිත event commitවලට සාපේක්ෂව පොදු API ගිවිසුම (PR merge-base, push කිරීමට පෙර, merge-group base; කාලසටහන්ගත/අතින් සිදුකරන checkout සඳහා පළමු parent); අවශ්ය මිනුම අසාර්ථක වුවහොත් ප්රවේශය වසා දමයි                               | **--ratchet සමඟ අවහිර කරයි**                                  |

### කාර්යය: `docs-sync-strict`

`main` හෝ `release/**` වෙත යොමු කරන pull request සඳහා මෙම කාර්යය ක්‍රියාත්මක වන්නේ කෙටුම්පත් නොවන (හෝ විශ්වාසදායක පෝලිමකින් එන), ප්‍රලේඛන හෝ කේත වෙනස්කම් ලෙස වර්ගීකරණය කළ අපේක්ෂකයන් සඳහා පමණි. PR නොවන CI සිදුවීම්වලදී ද එය ක්‍රියාත්මක වේ; මෙම කාර්ය ප්‍රවාහයේ push මගින් ආරම්භ කිරීම අදාළ වන්නේ `main` වෙත පමණි, `release/**` වෙත නොවේ. ශුන්‍ය නොවන පිටවීමේ කේතයකින් අවසන් වන පියවරක් කාර්යය අවහිර කරයි; වාර්තා කිරීම පමණක් සිදු කරන සොයාගැනීම් සහ පහත ලේඛනගත ව්‍යතිරේක එය අවහිර නොකරයි.

| ස්ක්රිප්ට්                     | වලංගු කරන්නේ                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | අවහිර කිරීම                                                                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | පහත උප-ගේට්ටු 7 අනුක්රමිකව ධාවනය කරන මෙටා-ගේට්ටුවක්                                                                                                                                                                                                                                                                                                                                                                                                                                       | ඔව්                                                                                                                                 |
| ↳ `check:docs-sync`            | පැකේජය/OpenAPI/CHANGELOG අතර අනුවාද අනුකූලතාව, `llm.txt` හි හරියටම ගැළපෙන දර්පණ පිටපත්, පරිවර්තනය කළ CHANGELOG හි කොටස් හා ප්‍රමාණය පිළිබඳ නොවෙනස් කොන්දේසි සහ අලුත් ලේඛන මගින් ප්‍රතිස්ථාපනය වූ පැරණි අනුපිටපත් ලේඛන නොමැති බව                                                                                                                                                                                                                                                           | ඔව්                                                                                                                                 |
| ↳ `check:docs-frontmatter`     | සම්පාදනය කළ ප්රලේඛන පිටුවල වලංගු frontmatter මාතෘකා තිබෙන බව                                                                                                                                                                                                                                                                                                                                                                                                                              | ඔව්                                                                                                                                 |
| ↳ `check:docs-counts`          | ඉහළ විශ්වාසයක් ඇති ගණන් පිළිබඳ නොවෙනස් කොන්දේසි දැඩිව ක්‍රියාත්මක කරයි; ගොනු ගණන පිළිබඳ අනුමාන පදනම් කරගත් පරීක්ෂණ ස්ක්‍රිප්ට් වෙත `--strict` ලබා නොදුන්නොත් අනතුරු අඟවයි පමණි (CI මෙටා-ගේට්ටුව එය ලබා නොදෙයි)                                                                                                                                                                                                                                                                            | දැඩි ස්තරය අවහිර කරයි; මෘදු ස්තරය උපදේශාත්මකය                                                                                       |
| ↳ `check:env-doc-sync`         | නොසලකා හැරෙන, ලේඛනවල පමණක් ඇති සහ පරිසරයේ පමණක් ඇති විචල්‍ය සඳහා පැහැදිලි අවසර ලැයිස්තු යෙදීමෙන් පසු මූලාශ්‍ර කේතයේ පරිසර විචල්‍ය කියවීම්, `.env.example` සහ `docs/reference/ENVIRONMENT.md` එකිනෙකට ගැළපේ                                                                                                                                                                                                                                                                                | ඔව්, ලේඛනගත අවසර ලැයිස්තුවලට පිටතින්                                                                                                |
| ↳ `check:deprecated-versions`  | නොසලකා හැරෙන ලේඛන බැහැර කරමින්, ආරක්ෂිත ඓතිහාසික සන්දර්භවලට පිටතින් යල් පැන තිබිය හැකි අනුවාද සහ පැරණි යාවත්කාලීන දින වාර්තා කරයි                                                                                                                                                                                                                                                                                                                                                         | වත්මන් CI සැකසුමේ උපදේශාත්මකය (`--strict` ලබා නොදෙයි)                                                                               |
| ↳ `check:doc-links`            | docs තුළ ඇති අභ්යන්තර markdown සබැඳි සැබෑ ගොනු වෙත විසඳෙන බව (`[text]`/`(path)` ආකෘතිය)                                                                                                                                                                                                                                                                                                                                                                                                   | ඔව්                                                                                                                                 |
| ↳ `check:fabricated-docs`      | docs තුළ සඳහන් routes, env vars, CLI commands, hook names සහ file paths කේත සමුදාය තුළ පවතින බව. `--strict` හරහා දැඩි ගේට්ටුවක්; ධජය නොමැතිව මෘදු අසමත් වීමක්.                                                                                                                                                                                                                                                                                                                            | ඔව් (CI තුළ `--strict` හරහා)                                                                                                        |
| `check:cli-i18n`               | CLI තුළ භාවිත කරන `t()` යතුරු `en` තුළ ඇත; `pt-BR` සෑම ඉහළම මට්ටමේ කොටසක්ම රඳවා ගනී; `zh-CN` සහ `zh-TW` තුළ `en` හි සෑම යතුරක්ම ඇත                                                                                                                                                                                                                                                                                                                                                        | ඔව්                                                                                                                                 |
| `check:openapi-coverage`       | OpenAPI පිරිවිතරය සැබෑ routes සඳහා අවම වශයෙන් ratchet කළ පහළ සීමාවක් ආවරණය කරන බව                                                                                                                                                                                                                                                                                                                                                                                                         | ඔව්                                                                                                                                 |
| `check:openapi-security-tiers` | ප්‍රකාශිත `x-loopback-only`/`x-always-protected` අනුසටහන් සඳහා `routeGuard.ts` තුළ සහාය තිබිය යුතුය; විග්‍රාහක දෝෂ සහ ඉදිරි දිශාවේ පරීක්ෂණයේ නොගැළපීම් අවහිර කරයි. දේශීය ප්‍රවේශයට පමණක් අදාළ උපසර්ග යටතේ `x-loopback-only` නැති බව සොයන ප්‍රතිලෝම පරීක්ෂණය අනතුරු අඟවයි, සහ රටා මගින් පමණක් නිර්වචනය කළ මාර්ග එම ප්‍රතිලෝම පරීක්ෂණයෙන් බැහැර කරයි.                                                                                                                                       | විග්‍රාහක සහ ඉදිරි දිශාවේ පරීක්ෂණ අවහිර කරයි; ප්‍රතිලෝම පරීක්ෂණය උපදේශාත්මකය                                                        |
| `check:openapi-routes`         | හේතු සහිත `KNOWN_STALE_SPEC` අවසර ලැයිස්තුව යෙදීමෙන් පසු `openapi.yaml` හි සෑම `/api...` මාර්ගයක්ම පරාමිතිවල වෙනස්කම් නොසලකා සැබෑ මාර්ගයකට ගැළපේ; අවසර ලැයිස්තුවේ යල් පැන ගිය සටහන් ද අසාර්ථක වීමට හේතු වේ                                                                                                                                                                                                                                                                                | ඔව්                                                                                                                                 |
| `check:docs-symbols`           | දර්පණ පිටපත් නොවන ප්‍රාමාණික ලේඛනවල අභ්‍යන්තර `/api/...` URL යොමු සැබෑ මාර්ගයකට හෝ මාර්ග පවුලකට ගැළපේ; ප්‍රොක්සි, ඉහළ සේවා, ස්ථානධාරක සහ ගොනු යොමු හා හේතු සහිත `KNOWN_STALE_DOC_REFS` සටහන් බැහැර කරයි, සහ අවසර ලැයිස්තුවේ යල් පැන ගිය සටහන් අසාර්ථක වීමට හේතු වේ                                                                                                                                                                                                                        | ඔව්                                                                                                                                 |
| `i18n translation drift`       | මූලික ලේඛනවල මූලාශ්‍ර/ඉලක්ක හැෂ් සහ පරිවර්තනයේ මූලාරම්භය පරීක්ෂා කරයි. PR සැසඳීමෙන් ඉඩ දෙන්නේ සම්පූර්ණයෙන්ම සමාන උරුම වූ අසමත්වීම්වලට පමණි; මූලාශ්‍රය, නොමැති ඉලක්කය, ඉලක්ක හැෂ්, යල්පැන ගිය පරිවර්තනය හෝ කොටස් හැඹිලිය සම්බන්ධ නව හෝ තහවුරු නොකළ නොගැළපීම් අවහිර කරයි. PR සැසඳීමෙන් පිටතදී මූලාශ්‍ර/නොමැති ඉලක්ක/ඉලක්ක හැෂ් අසමත්වීම් අවහිර කරන අතර, යල්පැන ගිය පරිවර්තන සහ නොගැළපෙන කොටස් හැඹිලි අනතුරු ඇඟවීම් පමණක් ලෙස පවතී. පැරණි ආකෘතියේ කොටස් හැඹිලියක් නොමැතිවීම අසමත්වීමක් නොවේ. | PR හි නව/තහවුරු නොකළ වෙනස අවහිර කරයි; සම්පූර්ණයෙන්ම සමාන උරුම වූ වෙනස අනතුරු ඇඟවීමක් පමණි; PR පිටත නීති අසමත්වීමේ වර්ගය මත රඳා පවතී |

`docs/diagrams/` යටතේ ඇති README SVG දොළහක් ජනනය කරන ලද ඒවා වේ (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` මඟින් ඒ සියල්ල නැවත ජනනය කරයි). සෑම එකකටම byte-compare unit test එකක්
(`tests/unit/docs/readme-*-svg.test.ts`, `test-unit` job) තිබෙන අතර, commit කළ ගොනුව පරණ වූ විට එය අසමත් වේ. එසේම
`check:docs-counts` ඒවායේ `<text>` nodes වෙතින් canonical numbers කියවයි — මේ නිසා outlining පියවර මඟින්
outline කළ සෑම string එකක්ම නොපෙනෙන `<text>` ලෙස ගොනුව තුළ තබා ගනී. SVG canonical-numbers check එක
`SVG_DIAGRAM_FILES` හි ලැයිස්තුගත කර ඇති ගොනු කියවයි (`scripts/check/check-docs-counts-sync.mjs`):
`docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, සහ `public/images/tier-flow-dark.svg` සහ `tier-flow-light.svg`; free-forever,
catalog-entry, recurring-pool සහ scoring-factors claims ද `promise-pillars.svg`, `free-tier-budget.svg` සහ
`strategies-grid.svg` කියවයි. `free-tier-budget.svg` එහි සංඛ්යා live catalog loader වෙතින් ලබා ගන්නා බැවින්,
`FREE_MODEL_BUDGETS` හෝ provider display name එකක වෙනසක් සිදු වූ විට එම ගොනුව නැවත ජනනය කරන තුරු CI අසමත් වේ.

### Job: `i18n-ui-coverage`

| ස්ක්රිප්ටය                        | වලංගු කරන්නේ                                                                                                                                                                           | අවහිර කරන්නේද  |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | UI i18n යතුරු ආවරණය ≥ 65% වේ                                                                                                                                                           | ඔව්            |
| `check-ui-value-drift` (inline)   | නැවත ලියන ලද ඉංග්රීසි **අගයක්** හේතුවෙන් යල් පැන ගිය පරිවර්තනයක් ඉතිරි නොවන බව                                                                                                         | ඔව්            |
| `check-new-key-coverage` (inline) | **නව** ඉංග්රීසි යතුරක් සෑම locale එකකම පරිවර්තනය කර ඇති බව — `__MISSING__:` සලකුණක් ප්රතික්ෂේප කෙරේ                                                                                    | ඔව්            |
| `check-translation-ratio`         | එක් locale එකකට සැබෑ පරිවර්තන අනුපාතය (allowlist එකෙන් පිටත ඉංග්රීසියට සමාන / placeholder / අස්ථානගත leaves) `config/quality/i18n-translation-baseline.json` + slack ඉක්මවා නොයා යුතුය | **අවහිර කරයි** |

`fetch-depth: 0` අවශ්ය වේ — value-drift gate එක merge base එකට සාපේක්ෂව `en.json` හි වෙනස්කම් සසඳයි.

#### `check-ui-value-drift` — පැරණි-පරිවර්තන gateેહ

අනෙකුත් gates වලට ව්යුහාත්මකව හඳුනාගත නොහැකි එකම i18n regression එක මෙය හඳුනාගනී: ඉංග්රීසි අගයක්
නැවත ලියන අතර _පෙර_ ඉංග්රීසි අගයෙන් සාදන ලද පරිවර්තන එලෙසම ඉතිරි වීම නිසා,
ඉංග්රීසි නොවන පරිශීලකයන් නිශ්චිත ලෙස ලියා ඇති, නමුත් දැන් වැරදි පිටපත දිගටම කියවීම.

මෙය සැබෑවටම නිකුත් විය. Antigravity පිවිසුම් උපකාරකය එක් කළ විට (#5203)
`oauthModal.googleOAuthWarning` නැවත ලියන ලදී; **locales 43න් 39කම** ක්රියාකරුවන්ට "සම්පූර්ණ
URL එක පිටපත් කර පහතින් අලවන්න" යැයි කියන පෙළ එලෙසම පැවතුණි — එම provider සඳහා සම්පූර්ණ
කළ නොහැකි ප්රවාහයකි. පහත හේතු නිසා #8463 තෙක් එය අවධානයට ලක් නොවීය:

- `sync-ui-keys` පසුපිරවීම සිදු කරන්නේ **නොපවතින** යතුරු සඳහා පමණි; **යල් පැන ගිය** යතුරු සඳහා කිසිවිටෙක නොවේ;
- `check-ui-keys-coverage` යතුරු _පැවතීම_ ගණනය කරන බැවින්, යල් පැන ගිය පරිවර්තනයක් ආවරණය වී ඇති ලෙස ලකුණු ලබයි;
- `check-translation-drift` `docs/i18n/<locale>/**.md` ලේඛන පිළිබිඹු නිරීක්ෂණය කරයි —
  එය කිසිවිටෙක `src/i18n/messages/*.json` කියවන්නේ නැත. 2026-09 නැවත සමමුහුර්ත කිරීමේ සිට `docs-sync-strict` job එකෙහි අවහිර කෙරේ:
  මූලික ලේඛනයක් සංස්කරණය කරන්න → `npm run i18n:run -- --files=<doc>` (කොටස් මට්ටමේ, අඩු වියදම්).

**වෙනස්කම් පිළිබඳ දැනුවත්ය, baseline මත පදනම් නොවේ.** එය merge base හි `en.json` එක
working tree එක සමඟ සසඳයි; ඉංග්රීසි අගය වෙනස් වූ සෑම යතුරක් සඳහාම, වෙනස් නොකළ
පරිවර්තනයක් තවමත් දරන ඕනෑම locale එකක් යල් පැන ගොස් ඇත. මෙය හිතාමතාම **පෙර පවතින ණය
ස්ථාවර කරයි** — දිගු කලක් පවතින පරිවර්තනයක් පැමිණියේ කුමන පැරණි ඉංග්රීසි අගයෙන්දැයි diff
එකකට හෙළි කළ නොහැකි බැවින්, gate එක විනිශ්චය කරන්නේ වත්මන් වෙනස ස්පර්ශ කරන දේ පමණි.
විකල්පය වන එක් යතුරකට hash baseline එකක් සඳහා ~600 KB ජනනය කළ ගොනුවක් අවශ්ය වන අතර,
එය දැනට පවතින විශාලතම baseline එක මෙන් 3× ක් වන අතර සෑම i18n PR එකකදීම වෙනස්කම්වලට ලක් වේ.

මෙය සපුරාලීමට ක්රම දෙකක් තිබේ:

1. බලපෑමට ලක් වූ පරිවර්තන යාවත්කාලීන කරන්න, හෝ
2. ඒවා `__MISSING__:<new english>` ලෙස සකසන්න — එවිට runtime එක නිවැරදි කළ ඉංග්රීසි අගය සපයයි
   (`src/i18n/request.ts::deepMergeFallback`, #7258), සහ යතුර පරිවර්තනය සඳහා පෝලිම්ගත වේ.

string එකේ **අර්ථය** වෙනස් වී ඇත්නම්, **යතුර නැවත නම් කිරීම** වඩාත් සුදුසුය: නව යතුරකට
යල් පැන ගිය පරිවර්තනයක් උරුම විය නොහැක. #8463 භාවිත කළ රටාව එයයි.

```bash
npm run i18n:check-value-drift          # දැඩි (CI ධාවනය කරන ආකාරය)
npm run i18n:check-value-drift:warn     # වාර්තා කිරීම පමණි
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

අගය-විස්ථාපන සහ නව-යතුරු ද්වාර `scripts/i18n/resolve-ui-diff-base.mjs` වෙතින් ලැබෙන එකම වෙනස් කළ නොහැකි සැසඳීමක් හවුලේ භාවිත කරයි. කාර්යප්රවාහය පරීක්ෂණ දෙකටම එකම පාදක, පාදක-අග සහ අපේක්ෂක SHA ලබා දෙයි. PR/පාදක-යළි-ඉලක්කගත කිරීම, push සහ merge-group ධාවන ඒවායේ සිදුවීම් සන්දර්භය භාවිත කරයි. අපේක්ෂක ශාඛාවක් dispatch කිරීමට එහි නිශ්චිත විවෘත PR එක හෝ පැහැදිලි `i18n_base_sha` ආදානය අවශ්ය වේ. එම ආදානය නොමැතිව `main` හෝ `release/vX.Y.Z` dispatch කිරීමේදී හෝ නියමිත කාලසටහනකට අනුව නිරීක්ෂණය කිරීමේදී, අවසන් commit එක එහි පළමු parent එක සමඟ සසඳයි; එය උරුම වූ සියලු පරිවර්තන ණය පිළිබඳ විගණනයක් නොවේ. දේශීය ආරාධනයකට පැහැදිලි සැසඳීම් පාදකයක් අවශ්ය වේ, උදාහරණයක් ලෙස ඉහත `BASE_REF` විධානය.

නොමැති හෝ අපැහැදිලි සැසඳීම් සන්දර්භයක්, කියවිය නොහැකි හෝ වලංගු නොවන අවශ්ය නාමාවලියක් සහ වෙනස් වූ අපේක්ෂකයක්, අනතුරු ඇඟවීම් ප්රකාරයේදී ද ඇතුළුව, පිටවීමේ කේතය **2** සමඟ `INCOMPLETE` ප්රතිඵලය ලබා දෙයි. නාමාවලි කියවීම් `scripts/i18n/read-ui-catalog.mjs` භාවිත කරයි; කියවීමේ අසාර්ථකවීම් හිස් වස්තු මඟින් ආදේශ නොකෙරේ. ලබාගත නොහැකි පාදකයක් හෝ අසම්පූර්ණ ආදානයක් `PASS` තත්ත්වය තහවුරු නොකරයි.

### රැකියාව: `i18n`

සම්පූර්ණ i18n වලංගුකරණ න්‍යාසය (එක් ස්ථානයකට එක් කාර්යයක්). සම්පූර්ණ කාර්යය උපදේශන වේ.

| පිටපත                           | වලංගු කරයි                        | අවහිර කිරීම                                                |
| ------------------------------- | --------------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | එක් පෙදෙසකට පරිවර්තන සම්පූර්ණත්වය | **උපදේශන** (සම්පූර්ණ කාර්යය මත `continue-on-error: true` ) |

### රැකියාව: `pr-test-policy`

ඇදීමේ ඉල්ලීම් මත පමණක් ධාවනය වේ.

| පිටපත                  | වලංගු කරයි                                                                                                                                       | අවහිර කිරීම |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, හෝ `bin/` හි නිෂ්පාදන කේතය වෙනස් කරන PRs පරීක්ෂණ ඇතුළත් කළ යුතුය හෝ යාවත්කාලීන කළ යුතුය (Hard Rule #8)         | ඔව්         |
| `check:test-masking`   | වෙනස් කරන ලද පරීක්ෂණ ගොනු ශුද්ධ තහවුරු කිරීම් ගණන අඩු නොකරයි හෝ `assert.ok(true)` tautologies එකතු නොකරයි                                        | ඔව්         |
| `check:pr-evidence`    | PR ශරීරය වෙනස් කිරීම සඳහා test/VPS සාක්ෂි උපුටා දක්වයි ( PR ගද්‍ය — බිඳෙනසුලු ග්‍රේප් කිරීමෙන් Hard Rule #18 යාන්ත්‍රිකකරණය කරයි, Backlog බලන්න) | ඔව්         |

### Job: `test-vitest`

`changes` වර්ගීකරණ කාර්යය අවශ්ය වේ. අදාළ matrix shards අසාර්ථක වුවහොත් ඒකාබද්ධ කිරීම අවහිර කරයි.

| පරීක්ෂණ කට්ටලය   | වලංගු කරන්නේ                                                | අවහිර කිරීම                                                                                                                 |
| ---------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP සේවාදායකය (මෙවලම් 110), autoCombo, cache — vitest ධාවකය | ඔව්                                                                                                                         |
| `test:vitest:ui` | UI සංරචක පරීක්ෂණ — vitest ධාවකය                             | **අවහිර කරයි** — පෙර සිට පවතින අසාර්ථකවීම් `vitest.config.ts` තුළ පැහැදිලිව බැහැර කර ඇත; නව අසාර්ථකවීම් කාර්යය අසාර්ථක කරයි |

### රාත්‍රී කාර්ය ප්‍රවාහ (කාලසටහන්ගත, උපදේශන)

මේවා ක්‍රෝන් කාලසටහනකට (සහ `workflow_dispatch`) ක්‍රියාත්මක වේ, කිසි විටෙක PRs මත නොවේ . සියල්ල උපදේශන වේ.

| කාර්ය ප්රවාහය          | වලංගු කරයි                                                                                                                                                                        | අවහිර කිරීම |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | අහඹු බීජ + ඉහළ ධාවන සංඛ්‍යාවක් සමඟ දේපල පරීක්ෂණ වේගයෙන් පරීක්ෂා කරන්න                                                                                                             | **උපදේශන**  |
| `nightly-resilience`   | ගොඩ-වර්ධන දොරටුව, අවුල් දෝෂ-එන්නත්, k6 load/soak                                                                                                                                  | **උපදේශන**  |
| `nightly-llm-security` | promptfoo injection guard (block mode) + garak probes (සැපයුම්කරු රහසක් නොමැතිව මග හැරිය)                                                                                         | **උපදේශන**  |
| `nightly-schemathesis` | `docs/openapi.yaml` — මතුපිට පිරිවිතර උල්ලංඝනය කිරීම් / හසුරුවා නොගත් 500s (Fase 8 B.4) භාවිතා කරමින් සජීවී OmniRoute එකකට එරෙහිව OpenAPI කොන්ත්‍රාත් ව්‍යාකූල කිරීම (ක්‍රමලේඛනය) | **උපදේශන**  |
| `nightly-mutation`     | ස්ට්‍රයිකර් විකෘති-පරීක්ෂණ ලකුණු වේගවත් ඒකක පටුමග — දිවි ගලවා ගත් විකෘති මතුපිට දුර්වල ප්‍රකාශයන්                                                                                 | **උපදේශන**  |
| `nightly-compat`       | සහාය දක්වන `engines.node` පරාසයන් හරහා නෝඩ් එන්ජින් අනුකූලතා අනුකෘතිය                                                                                                             | **උපදේශන**  |

කාර්ය සාධන මූලික (ගොඩ, TTFB, ගොඩනැගීමේ කාලය) වාර්තා කර ඇත, දොරටු නොවේ: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) බලන්න (`npm run perf:lts-baseline`).

---

## ප්රවේග අදියර (2026-08-30 → v4.0 LTS): සෑම මූලික සීමාවක්ම 20%කින් ලිහිල් කරන ලදී

හිමිකරුගේ තීරණය (2026-08-30): v4.0 මොඩියුලීකරණය දක්වා, තාක්ෂණික ණය සීමාව පවත්වා ගැනීමට වඩා
නිකුත් කිරීමේ වේගය වැදගත් වේ. සෑම **සංඛ්යාත්මක** ratchet මූලික සීමාවක්ම විගණනය කළ හැකි එක්
ක්රියාවලියකින් 20%කින් ලිහිල් කරන ලද අතර, එම අදියර `config/quality/quality-baseline.json` තුළ ප්රකාශ කර ඇත:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| වෙනස් වූ දේ                                                                                                                                                                             | ස්ථානය                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — අඩු අගය වඩා හොඳ වන ගණන් ×1.2, වැඩි අගය වඩා හොඳ වන ප්රතිශත ÷1.2 (ආවරණ අවමය 60 ලෙස තබා ඇත, `eslintErrors` තවමත් 0 වේ, `eslintWarnings` 0 → ස්ථිර කළ මර්දන ගණනින් 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` සටහනෙහි පෙර → පසු සෑම අගයක්ම ලැයිස්තුගත කර ඇත)   |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                        | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, සෑම `frozen[*]` / `testFrozen[*]` පේළි සීමාවක්ම ×1.2                                                                                                                  | `file-size-baseline.json`                                                                              |
| එක් ගොනුවකට / එක් TS කේතයකට අදාළ ගණන් ×1.2                                                                                                                                              | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                     | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `_policy.requireTighten === false` වන විට `--require-tighten` උපදේශාත්මක වේ                                                                                                             | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| රාත්රී `bank-ratchet-shrinks` නවතී (එය මනින ලද හැකිළීම තැන්පත් කර අමතර ඉඩ අවලංගු කරනු ඇත)                                                                                               | `.github/workflows/nightly-release-green.yml`                                                          |

අවසර ලැයිස්තු (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **අයවැය නොවන** අතර ඒවා වෙනස් කර නැත. සමත්/අසමත් ප්රතිපත්ති ද්වාර (රහස්, SQL නීති,
ලේඛන/env ගිවිසුම, i18n සමානාත්මතාව, ඒකක පරීක්ෂණ) වෙනස් වී නැත — අසමත් පරීක්ෂණයක් තවමත් අසමත් පරීක්ෂණයකි.

**මෙවලම්**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — එක් වරක් පමණක් සිදු කරන
  ලිහිල් කිරීම (`scripts/quality/relax-baselines.mjs`); එකම සටහන සමඟ දෙවරක් ධාවනය කිරීම ප්රතික්ෂේප කරයි.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  CI මනින ආකාරයටම සෑම සංඛ්යාත්මක ද්වාරයක්ම මැන, එක් එක් ද්වාරය සඳහා ඉතිරි අමතර ඉඩ
  මුද්රණය කරයි (`scripts/quality/baseline-headroom.mjs`). රාත්රී `baseline-headroom` කාර්යය
  workflow ධාවන සාරාංශයෙහි වගුව පළ කර, එහි JSON/Markdown වාර්තාව
  `baseline-headroom-<run_id>` ලෙස උඩුගත කර දින 90ක් රඳවා තබයි. අනතුරු ඇඟවීම් සහ තීරණාත්මක පේළි
  තම උපරිම සීමාවෙන් 10%ක් ඇතුළත ඇති හෝ දැනටමත් එය ඉක්මවා ඇති ද්වාර හඳුනා ගනී. අයවැය
  වැය වෙමින් පවතින බවට පූර්ව අනතුරු ඇඟවීමක් ලෙස මෙම වාර්තා සමාලෝචනය කරන්න; ගැටලුවට අදාළ
  ද්වාරයේ `_rebaseline_*` සටහන් පරීක්ෂා කරන්න. මෙම කාර්යය තවදුරටත් ස්ථිර issue එකක් නිර්මාණය
  හෝ යාවත්කාලීන නොකරයි; #12149 පෙර වාර්තා ඉතිහාසය සුරකියි.

**නව-කේත ප්රකාරය (Clean-as-You-Code) — 2026-08-30 සිට, PR වේගවත් මාර්ගය සඳහා පමණි**

`pull_request` සිදුවීම්වලදී `quality.yml`, `check:file-size`,
`check:complexity-ratchets` සහ `check:dead-code` වෙත `--base-ref <PR base SHA>` ලබා දෙයි.
`check:complexity-ratchets` සහ `check:dead-code` සඳහා, ද්වාරය HEAD එක merge-base සමඟ
සසඳන්නේ **PR එක වෙනස් කළ ගොනුවලට පමණක් සීමා කරමිනි** (`scripts/check/newCodeMode.mjs`: merge-base එක තාවකාලික
`git worktree` එකක ස්ථාපිත කර, ESLint/knip එහි සහ HEAD මත ධාවනය කර, එක් එක් ගොනුවේ ගණන්වල වෙනස්කම් ගණනය කරයි):

- **අවහිර කරන** — PR එක එය වෙනස් කළ ගොනුවලට cyclomatic/cognitive උල්ලංඝන හෝ dead exports එක් කර ඇත
  (ලොගයෙහි `complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=`);
- **උපදේශාත්මක** — ගෝලීය එකතුව හා ස්ථාවර කළ මූලික අගය අතර සැසඳීම. උරුම වූ අපගමනයක්
  නිදොස් PR එකක් කිසිවිටෙක රතු පැහැයෙන් සලකුණු නොකරයි; නිකුතු සැසඳීමේදී අලුත්වැඩියා කිරීම සඳහා එම අපගමනය නිරීක්ෂණය කෙරෙන අතර
  headroom කාර්යය මඟින් ද අධීක්ෂණය කෙරේ.

`check:file-size` තමන්ගේම නියමයන් අනුව base ref භාවිත කරයි (`scripts/check/check-file-size.mjs`, #8522):
එය tree එකෙහි ඇති සෑම source සහ test ගොනුවක්ම පරීක්ෂා කර, `git show` භාවිතයෙන් PR base එකේ එක් එක් ගොනුවේ
පේළි ගණන කියවා, ගොනුවක් අසමත් කරන්නේ එය එහි මූලික උපරිම සීමාව (`frozen` / `testFrozen`, හෝ මූලික සීමාවෙන්
පිටත ගොනුවක් සඳහා `cap` / `testCap`) සහ එහි base ප්රමාණය යන දෙකෙන් විශාල අගය ඉක්මවා වර්ධනය වූ විට පමණි.
එබැවින් base එකේ දැනටමත් අපගමනය වී ඇති ගොනුවක් කිසිවිටෙක නිර්දෝෂී PR එකක් අසමත් නොකරයි.

`check:boundary:ratchet` එහි තනි සංඛ්යාවටද එම රීතියම යොදයි
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR සිදුවීම්වලදී
`quality.yml` fast-gates සහ `ci.yml` lint කාර්යය යන දෙකම PR base SHA එක ලබා දෙයි, base commit එක
`git archive` export එකකින් මනින අතර, PR එක අසාර්ථක වන්නේ එහි `open-sse → src` edge
ගණන `metrics.boundaryOpenSseToSrc` සහ base එකේ ගණන අතරින් විශාල අගය ඉක්මවන විට පමණි. සීමාවට
ඉහළින් ඇති base drift එක වාර්තා කෙරේ (`base drift herdado`), නමුත් එය කිසිවිටෙකත් අදාළ නොවන PR එකක් අසාර්ථක නොකරයි; push → main
නිරපේක්ෂ සීමාව දිගටම භාවිත කරන අතර, resolve කළ නොහැකි base SHA එකක් අනතුරු ඇඟවීමක් සමඟ එම සීමාවට fallback වේ.

`workflow_dispatch` ධාවනයන්ට, release-green sweep එකට සහ nightly headroom කාර්යයට PR base එකක්
නොමැති බැවින් ඒවා නිරපේක්ෂ (global) සැසඳීම දිගටම භාවිත කරයි. Coverage, duplication සහ type-coverage දැනට
global ලෙසම පවතී (ඒවායේ මෙවලම් අඩු වියදමකින් per-file diff එකක් නිපදවන්නේ නැත) — ඒවාද එම ප්රතිකාරය සඳහා අපේක්ෂකයන් වේ.

**v4.0 දී අදියර අවසන් කිරීම (LTS = පෙරට වඩා දැඩි කිරීමක් මිස "නැවත සාමාන්ය තත්ත්වයට" යාමක් නොවේ)**

1. පිරිසිදු `release/v4.0.0` tip එක මත: වාර්තාව සඳහා `npm run quality:headroom --json`, ඉන්පසු
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, එක් එක් typecheck gate එකේ
   `--update` — සෑම baseline එකක්ම මනින ලද අගය දක්වා පහළ යයි.
2. `quality-baseline.json` වෙතින් `_policy` මකන්න (`--require-tighten` සහ nightly
   banking නැවත සක්රිය කරයි), `check-openapi-coverage.mjs` තුළ `THRESHOLD = 36` (හෝ ඊට වැඩි අගයක්) ප්රතිස්ථාපනය කරන්න.
3. modularization මඟින් ප්රතිලාභ ලැබුණු තැන්වල මනින ලද අගයටත් වඩා දැඩි කරන්න: file-size `cap` නැවත 1000
   (හෝ 800) දක්වා, coverage floors +5, modularize කළ packages සඳහා dead exports 0.

## Ratchet මූලික රේඛාව (`quality-baseline.json`)

Ratchet එන්ජිම (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json` කියවා,
අලුතින් රැස් කළ `quality-metrics.json` සමඟ එය සසඳයි. එහි epsilon සීමාව ඉක්මවා
පසුබැසෙන ඕනෑම ප්රමිතිකයක් build එක අසාර්ථක කරයි.

දැනට නිරීක්ෂණය කරන ප්රමිතික:

| ප්රමිතිකය             | දිශාව  | අර්ථය                                     |
| --------------------- | ------ | ----------------------------------------- |
| `eslintWarnings`      | `down` | ESLint අනතුරු ඇඟවීම් ගණන වැඩි නොවිය යුතුය |
| `coverage.statements` | `up`   | Statement coverage අඩු නොවිය යුතුය        |
| `coverage.lines`      | `up`   | Line coverage අඩු නොවිය යුතුය             |
| `coverage.functions`  | `up`   | Function coverage අඩු නොවිය යුතුය         |
| `coverage.branches`   | `up`   | Branch coverage අඩු නොවිය යුතුය           |

සැබෑ වැඩිදියුණු කිරීමකින් පසු මූලික රේඛාව යාවත්කාලීන කිරීමට:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` ධජය දැනට මනින ලද අගයන් `quality-baseline.json` වෙත ලියයි.
ප්රමිතිකය වැඩිදියුණු කළ වෙනස සමඟ මෙම ගොනුව commit කරන්න. මූලික රේඛාව යාවත්කාලීන
නොකර ප්රමිතිකයක් වැඩිදියුණු කරන PR එකක් `--require-tighten` මඟින් හඳුනාගනු ඇත
(අදියර 6A.5, ක්රියාත්මක කිරීම අපේක්ෂිතයි).

### CodeQL ratchet: අපේක්ෂකයින් ඇතුළත් කිරීම සහ ගබඩා තොගය

CI සතුව පැහැදිලි පරායත්ත දාමයක් හරහා අපේක්ෂක CodeQL ප්‍රවේශය හිමිවේ: `codeql-scan` `codeql.yml` හි සිව්-භාෂා න්‍යාසය අමතයි, පසුව `codeql-admission` `node scripts/check/check-codeql-ratchet.mjs --candidate` ධාවනය කරයි. `Gate / CI` හට ප්‍රතිඵල දෙකම අවශ්‍ය වේ. ගුණාත්මකභාවය එහිම සංඛ්‍යාත්මක චෙක්පත් රඳවා තබා ගන්නා නමුත් නිෂ්පාදකයා අවසන් කිරීමට පෙර ස්කෑනරය විමසන්නේ නැත; `Gate / Quality` පමණක් සම්පූර්ණ අපේක්ෂකයින් ඇතුළත් නොවේ. CodeQL අවශ්‍ය වන්නේ docs-පමණි අපේක්ෂකයින් සඳහා පමණි.

`config/quality/codeql-admission-policy.json` හි ප්‍රතිපත්තිය ක්‍රියා, C/C++, JavaScript/TypeScript සහ Python, විමසුම් කට්ටල පෙරනිමිය, දුරස්ථ තර්ජන ආකෘතිය සහ ගොඩනැගීමේ මාදිලිය කිසිවක් තෝරා ගනී. නිෂ්පාදක පූර්ව පියාසර කිරීම අපේක්ෂිත සක්‍රීය කිරීමේ වාර්තාවක් ප්‍රතික්ෂේප කරන අතර පැහැදිලි ඉලක්ක ලැයිස්තුවෙන් පිටත ශාඛා. වත්මන් ඉලක්ක ප්‍රධාන වන අතර release/v3.8.54. කොන්ත්‍රාත් පරීක්ෂණ මෙම සීමිත ලැයිස්තුව සහ නඩත්තු තල්ලු ප්‍රේරකය පැකේජ අනුවාදය සමඟ සංසන්දනය කරයි; මීළඟ නිකුතුවට ඇතුල්වීම සමාලෝචනය කළ යුතුය. CI හි දැනට පවතින පුළුල් නිකුතුව PR ප්‍රේරකය රඳවා තබා ඇත, නමුත් නොබැඳි ඉලක්කයක් මැනිය නොහැකි PASS ලබා ගැනීමට වඩා උපුටා ගැනීමට පෙර HOLD වාර්තා කරයි.

සෑම matrix කාර්යයක්ම එහි සත්‍ය SARIF උඩුගත කිරීම් ID, භාෂාව, කාණ්ඩය, ධාවනය සහ උත්සාහය, ඇමතුම්කරු කාර්ය ප්‍රවාහ අනන්‍යතාවය, සිදුවීම ref/head/base/merge SHA සහ ප්‍රතිපත්ති හැෂ් වාර්තා කරයි. යැපෙන රැකියාව මෙම ධාවන ලදුපත් පමණක් බාගත කර කෞතුක වස්තු සංග්‍රහයන් වලංගු කරයි. එයට කාණ්ඩ හතරම අවශ්‍ය වේ, සාර්ථක නිෂ්පාදකයෙකු සහ එක් එක් නිවැරදි උඩුගත කිරීම් සම්පූර්ණ කර ඇත. එය API හි sarif_id පෙරහන භාවිතා කරයි, ශාඛාවක සොයාගත් නවතම විශ්ලේෂණය නොවේ. අර්ධ නැවත ධාවනය, නිෂ්පාදන උත්සාහය ආරක්ෂා කරමින්, එකම ධාවන සහ අපේක්ෂකයාගේ පෙර උත්සාහයකින් සාර්ථක ප්‍රවර්ග නැවත භාවිතා කළ හැක; අසාර්ථක වත්මන් නිෂ්පාදකයෙකුට පෙර හරිත සාක්ෂි නැවත භාවිතා කළ නොහැක.

CodeQL ක්‍රියාව සැකසීම සඳහා රැඳී සිටින නමුත්, එහි අමුණන ලද ක්‍රියාත්මක කිරීම අනතුරු ඇඟවීමට සහ තත්ත්‍ව-කියවීම අසාර්ථක වීමකින් හෝ වෙහෙසකර බලා සිටීමෙන් පසුව සිදු විය හැක. එබැවින් ප්රවේශය නැවත සැකසීම තහවුරු කරයි. අස්ථානගත වූ ප්‍රවර්ග, පොරොත්තු සැකසුම්, අසාර්ථක හෝ අවලංගු කළ රැකියා, පරණ අනන්‍යතාව, අසම්පූර්ණ පේජිනේෂන් හෝ නොමැති APIs HOLD නිෂ්පාදනය කර පිටවීම 2. ස්වාධීන ස්කෑනර් කාර්ය ප්‍රවාහයක් සඳහා ස්ථාවර රැඳීමක් ඉතිරි නොවේ. ස්කෑන් නොකළ PR එකක් සමත් විය නොහැක්කේ අනතුරු ඇඟවීමේ විමසුමක් 0 ආපසු පැමිණි නිසාය. `metrics.codeqlAlerts.value` ඉහලින් මනින ලද ගණන 1 පිටවෙයි; වෙනත් ශාඛාවක ඇඟවීම් අවශෝෂණය කර ගැනීම සඳහා මූලික රේඛාව ඉහළ නංවා නැත. [උඩුගත තත්ත්වය සහ විශ්ලේෂණ බැලීම](https://docs.github.com/en/rest/code-scanning/code-scanning).

කුවිතාන්සි වාර්තා උඩුගත කිරීම සහ විශ්ලේෂණය කිරීම IDs, කාණ්ඩ, මෙවලම් අනුවාද, ref/SHA, මූලික සහ අනතුරු ඇඟවීමේ අංක. SARIF identity/result ගණන් කිරීම, අවම රීති ගණන සහ නිශ්චිත අනතුරු ඇඟවීමේ අවස්ථා අනිවාර්ය වේ. PR/analysis අනන්‍යතා පිළිගැනීමට පෙර නැවත පරීක්ෂා කරනු ලැබේ. මෙම චෙක්පත් මගින් වින්‍යාසගත ප්‍රවර්ග ආවරණයක් ස්ථාපිත කරයි, උපුටා ගත් සෑම මූලාශ්‍ර ගොනුවකම ඉන්වෙන්ටරියක් නොවේ. C/C++ no-build Extract හි ව්‍යාපෘති ගොඩනැගීමේදී ජනනය කරන ලද කේතය ඇතුළත් නොවේ. මූලාශ්‍ර බැහැර කිරීම්වලට තවමත් සමාලෝචනය අවශ්‍ය වන අතර දායක ආරෝපණයට සැසඳිය හැකි නිශ්චිත-පාදක සාක්ෂි අවශ්‍ය වේ.

`codeql-maintenance.yml` PR/main නිෂ්පාදකයින් අනුපිටපත් කිරීමකින් තොරව සක්‍රිය-නිදහස් තල්ලු ස්කෑන් සහ සතිපතා කාලසටහන සපයයි. `nightly-codeql-inventory.yml`, `--strict-measurement` සහ මිනුම් නොමැති විට අසාර්ථක වීමත් සමඟ, ගබඩාව-පුළුල් පාදක රේඛාව වෙනම තබා ගනී. ප්‍රාදේශීය උරුම එකතුකරන්නාගේ අලංකාර මඟහැරීම අපේක්ෂකයින් ඇතුළත් කිරීම නොවේ. සත්‍යාපිත අඩු ගෝලීය සංඛ්‍යාවකින් පසුව තද කිරීම පැහැදිලි `--update` ලෙස පවතී.

පෙරනිමි සැකසුම වින්‍යාස කර ඇති අතර උසස් කාර්ය ප්‍රවාහය ප්‍රකාශනය නොකළ යුතුය: GitHub එම සංයෝජනය ප්‍රතික්ෂේප කරයි. සමාලෝචනය කරන ලද පරිපාලන සංක්‍රාන්තිය නැවත කියවන තෙක් එහි අනුවාදිත ප්‍රතිපත්තිය පොරොත්තුවෙන් පවතී. ප්‍රකාශනය කිරීමට පෙර, ක්‍රියාකරු පින් නිධියක්, head/base/tree, policy/patch/rollback හෑෂ් සහ නිරීක්ෂිත සැකසුම් තත්ත්වය; `node scripts/quality/codeql-producer.mjs verify-admin-readback` සපයන ලද අපේක්ෂිත සහ සත්‍ය JSON වාර්තා පරීක්ෂා කරයි. මෙය තාක්‍ෂණික ආරක්‍ෂකයකි, ක්‍රියාකරුගේ අනුමැතිය හෝ නැවුම් කියවීම් ලබා ගැනීම සඳහා ආදේශකයක් නොවේ. PR ටෝකනය කිසි විටෙකත් පරිපාලන ප්‍රවේශය ඉල්ලා නොසිටියි. Rollout සහ ඕනෑම ස්කෑනර් වෙනසක් සඳහා වෙනම නැවත කියවීම සහ සැබෑ PR, දෙබලක සහ ඒකාබද්ධ-කණ්ඩායම් අනුකූලතා සාක්ෂි අවශ්‍ය වේ.

Forks විසින් සත්කාරක ධාවකයන් භාවිතා කරයි, නොනැසී පවතින අක්තපත්‍ර නොමැතිව පිටවීම, නිෂ්පාදකයා තුළ ව්‍යාපෘති install/build නැත, සහ උරුම වූ ගබඩා රහස් නොමැත. GitHub එහි අඩු කළ දෙබලක ටෝකනය සමඟ pull_request සිදුවීම සඳහා SARIF උඩුගත කිරීමට සහය දක්වයි; පළමු වරට දායකත්ව ක්‍රියාත්මක කිරීමේ අනුමැතිය GitHub ප්‍රතිපත්තිය ලෙස පවතී. විශ්වාස නොකළ කේතය ක්‍රියාත්මක කිරීමට කිසිවිටක pull_request_target භාවිතා නොකරන්න. සංක්‍රමණය සම්පූර්ණ කිරීම සලකා බැලීමට පෙර පාලිත කැනරි තුළ සත්‍ය ටෝකන් අවසර, විශ්ලේෂණ_යතුර සහ සියලුම ප්‍රවර්ග පරිසරයන් තහවුරු කරන්න. [ගෑරුප්පු උඩුගත කිරීමේ නීති](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [ගැටෙන සැකසුම් මාතයන්](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**සේවයෙන් පහ කිරීම යනු ක්‍රියාකරුගේ ඇමතුමයි (Hard Rule #14)** — කිසිවිටෙකත් සේවයෙන් පහකිරීමේ ප්‍රකාශයේ තාක්ෂණික සාධාරණීකරණය සටහන් නොකර CodeQL අනතුරු ඇඟවීමක් ඉවත නොදමනු ඇත: ඉහළ ප්‍රොටෝකෝල අවශ්‍යතාවයක් සඳහා `won't fix`, පරීක්ෂණ සවිකිරීමක් සඳහා `used in tests`, සනීපාරක්ෂක CodeQL සඳහා `false positive` නොපෙනේ (පූර්‍වාදර්ශය: `docs/security/ERROR_SANITIZATION.md`).

---

## පරීක්ෂණ නැවත උත්සාහ කිරීමේ ප්රතිපත්තිය (WS5.4, v3.8.49)

නැවත උත්සාහ කිරීම එක් එක් runner එකට අදාළ වන අතර, කිසිවිටෙකත් සමස්ත පද්ධතියටම අදාළ පොදු ආවරණයක් නොවේ — පොදු නැවත උත්සාහ කිරීමක් සැබෑ ප්රතිගමන
නොපෙනෙන අස්ථාවරතා බවට පත් කරයි:

| Runner           | ප්රතිපත්තිය                                                                                                                                                        | හේතුව                                                                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | CI තුළ පමණක් `retries: 1`, `trace: on-first-retry` සමඟ                                                                                                             | බ්රවුසර/ජාල කාලගැන්වීම සැබැවින්ම අනියතය; trace එකක් සහිත එක් නැවත උත්සාහයක් අස්ථාවරතාවක් විශ්ලේෂණය කළ හැකි artifact එකක් බවට පත් කරයි |
| Vitest           | ගෝලීය නැවත උත්සාහ කිරීමක් නැත. අස්ථාවර බව තහවුරු වූ පරීක්ෂණයකට පැහැදිලි, එක්-පරීක්ෂණ නැවත උත්සාහ කිරීමක් ලබා දෙයි (diff එකේ දෘශ්යමාන වන අතර, PR තුළ සමාලෝචනය කෙරේ) | නිරෝධායන ලැයිස්තුව repo එක තුළ තබයි, කිසිවිටෙකත් අපැහැදිලි නොවේ                                                                       |
| node:test (unit) | කිසිවිටෙකත් නැවත උත්සාහ නොකරන්න                                                                                                                                    | අස්ථාවර unit පරීක්ෂණයක් යනු පරීක්ෂණයේ දෝෂයකි — එය නිවැරදි කරන්න, නැවත වාසනාව උරගා නොබලන්න                                             |

අස්ථාවරතා telemetry එක ක්රියාත්මක වූ පසු ඉලක්කගත SLO (WS5.2/5.3): එක් පරීක්ෂණයකට <1% අස්ථාවරතා අනුපාතයක්
("දැන් නිවැරදි කරන්න" සීමාව), එක් pipeline එකකට ≥95% සමත් අනුපාතයක්. කර්මාන්තයේ යොමු අගයන් —
අපගේම මිනුම්වලට අනුව නැවත ක්රමාංකනය කරන්න.

## නිකුතු-මට්ටමේ Ratchet විස්ථාපනය (WS5.5, v3.8.49)

ratchet එකක් (ගොනු ප්රමාණය, සංකීර්ණත්වය, eslint අවවාද) පිරිසිදු නිකුතු
tip එක මත ප්රතිගමනය වන විට — එනම් merges වල **සංයෝජනය** එය ප්රතිගමනය කර ඇති අතර, කිසිදු තනි PR එකක් තමන්ගේම branch එක මත
එම ප්රතිගමනය ප්රතිනිෂ්පාදනය නොකරන විට — නිවැරදි කිරීම **release captainට, එක් වරක්,
release branch එක මත** අයත් වේ: extraction/refactor කිරීම වඩාත් සුදුසුය; ලේඛනගත
සාධාරණීකරණ සටහනක් සමඟ පමණක් rebaseline කරන්න. සංයෝජන විස්ථාපනයක් කිසිවිටෙකත් contributor PR එකකට පවරන්න එපා, එසේම
එක් එක් PR සඳහා rebaseline කරන්නත් එපා (එය සැබෑ ප්රතිගමන සඟවයි). පළමුව වෙනස හඳුනාගන්න: ඔබගේ PR එක එයට හේතු වූ බව උපකල්පනය කිරීමට පෙර
probe worktree එකක පිරිසිදු tip එකට එරෙහිව අසමත් තත්ත්වය ප්රතිනිෂ්පාදනය කරන්න.

## Ratchet හැකිළීම් බැංකුගත කිරීම — පහළට යන දිශාව (#8584)

ratchet එක අර්ධ වශයෙන් පමණක් ස්වයංක්රීය වන අතර, ස්වයංක්රීයව ඇත්තේ වැරදි අර්ධයයි. සීමාවක් **ඉහළ දැමීම**
තත්පර දහයක් ගතවන අතින් සිදුකරන JSON සංස්කරණයක් වන අතර, අසමත් PR එකක අවහිරතාව ඉවත් කිරීමට ඇති වේගවත්ම ක්රමයයි.
සීමාවක් **පහළ දැමීමට** යමෙකු `--update` ධාවනය කර ප්රතිඵලය commit කළ යුතුය — තවද
`bank-ratchet-shrinks` job එක එක් කරන තෙක්, කිසිදු workflow එකක් එය ධාවනය කළේ නැත. මනින ලද ප්රතිවිපාකය
(2026-07-25): frozen ගොනු 18ක් දැනටමත් පේළි 800ක නව-ගොනු සීමාවට හෝ ඊට පහළින් තිබූ අතර, නරකම එක
132× විය (`src/shared/validation/schemas.ts`, පේළි 19ක් සඳහා 2,523ක සීමාවක්); සංකීර්ණත්ව උපරිමය
~37 rebaseline සටහන් හරහා `1794 → 2169` දක්වා ගමන් කළ අතර අඩුවීමක් තිබුණේ හරියටම එකක් පමණි
(−1); තවද "ඊළඟ චක්රයේ `--update` හරහා තද කරන්න" යන්න 31 වතාවක් ලියා, ක්රියාත්මක කර තිබුණේ
එක් වරක් පමණි. එය උපයා දුන් කේතයට වඩා දිගුකල් පවතින සීමාවක්, සම්පූර්ණ කළ සෑම
විභජනයක්ම ඊළඟට එම ගොනුව සංස්කරණය කරන අය සඳහා වර්ධන දීමනාවක් බවට නිහඬව පරිවර්තනය කරයි.

`nightly-release-green.yml` → **`bank-ratchet-shrinks`** job එක එම චක්රය වසයි:

|                 |                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------ |
| ධාවනය වන්නේ     | `schedule` (දිනකට 3×) + `workflow_dispatch` මත — හිතාමතාම `push` මත **නොවේ**                                       |
| මනින්නේ         | ඉහළම `release/vX.Y.Z`, `release-green` හි ඇති resolution + injection guard එකම භාවිතයෙන්                           |
| ලියන්නේ         | `check:file-size --update` සහ `check:complexity-ratchets --update` (දෙකම සැලසුමෙන් හැකිළීමට පමණක් සීමා වේ)         |
| සත්යාපනය කරන්නේ | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                           |
| යවන්නේ          | release branch එකට එරෙහිව සෑමවිටම වත්මන්ව පවතින එක් PR එකක් — බලයෙන් යාවත්කාලීන කෙරෙන අතර, කිසිවිටෙකත් spam නොකෙරේ |

බැංකුගත කිරීම එක් එක් push එකකට නොව batch වශයෙන් සිදු කරන්නේ එයට ප්රමාද අවශ්යතාවක් නොමැති බැවිනි (පැය 8ක් ඇතුළත
බැංකුගත කළ හැකිළීමක් ප්රමාණවත්ය), නමුත් එක් එක් merge එකකට ධාවනය කිරීමක් merge ව්යාපාර අතරතුර
PR branch එක නැවත නැවත ගොඩනඟා, සෑම වරකම සම්පූර්ණ ESLint පරීක්ෂාවකට ගෙවීමට සිදුවනු ඇත. හඳුනාගැනීම
push මත (`release-green`) පවතී; batch කරන්නේ බැංකුගත කිරීම පමණි.

### ආරක්ෂිත සත්යාපකය

job එක අධීක්ෂණයකින් තොරව baselines වෙත ලියන බැවින්, එය පිළිගත හැකි කරන්නේ `verify-ratchet-bank.mjs` ය.
එය `--update` පසු tree එක `HEAD` සමඟ diff කර, සෑම වෙනස්කමක්ම පහත දැක්වෙන ඒවායින් එකක් නොවේ නම්
**කිසිදු commit එකක් සෑදීමට පෙර job එක නවතයි** — කිසිදු PR එකක් විවෘත නොකරයි:

- `frozen` / `testFrozen` සංඛ්යාත්මක ඇතුළත් කිරීමක් **පහළ දැමීම** හෝ **ඉවත් කිරීම**
- `complexity-baseline.json` → `count` **පහළ දැමීම**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **පහළ දැමීම**

වෙනත් ඕනෑම දෙයක් අසමත් වේ: අංකයක් ඉහළ දැමීම, ඇතුළත් කිරීමක් එක් කිරීම, `cap`/`testCap` වෙනස් කිරීම, හෝ
`_rebaseline_*` සටහනක් මකා දැමීම/නැවත ලිවීම (එම සටහන් එක් එක්
උපරිමය පවතින්නේ ඇයිද යන්න පිළිබඳ විගණන වාර්තාව වන අතර, ගොනු ඇතුළත් කිරීම් තිබෙන `frozen` object එක තුළම ගබඩා කර ඇත).
සීමාවක් ඉහළ දැමිය හැකි bot එකක් පවතින තත්ත්වයට වඩා නිසැකවම නරක වනු ඇත. ප්රතිගමන
guard: `tests/unit/verify-ratchet-bank.test.ts`.

job එක කිසිවිටෙකත් `release/*` වෙත push නොකරයි — මනුෂ්යයෙකු PR එක merge කරන බැවින්, වැරදි මිනුමක්
සමාලෝචනයකින් තොරව ඇතුළත් විය නොහැක.

## අවසර ලැයිස්තු ප්රතිපත්තිය

පෙර සිට පවතින උල්ලංඝනයන් හේතුවෙන් අසමත් විය නොහැකි සෑම gate එකක්ම ස්ථිර කළ අවසර ලැයිස්තුවක් භාවිත කරයි
(උදා., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). ප්රතිපත්තිය වන්නේ:

**මූලික හේතුව නිවැරදි කරන්න; උල්ලංඝනය පෙර සිට පවතින අතර එය එම PR එක තුළම
නිවැරදි කළ නොහැකි විට පමණක් අවසර ලැයිස්තුව භාවිත කරන්න.**

අවසර ලැයිස්තුවකට ඇතුළත් කිරීමක් එක් කරන විට:

1. සාධාරණීකරණය සහිත අදහස් දැක්වීමක් ඇතුළත් කරන්න.
2. ලුහුබැඳීමේ issue එක සඳහන් කරන්න (උදා., `// #3498 — Phase 2 feature, not yet implemented`).
3. උල්ලංඝනය නිවැරදි කරන එම PR එක තුළම ඇතුළත් කිරීම ඉවත් කරන්න — සක්රිය උල්ලංඝනයක් තවදුරටත්
   යටපත් නොකරන යල් පැන ගිය ඇතුළත් කිරීමක් ද දෝෂයකි (6A.3 යල් පැන ගිය-බලාත්මක කිරීම
   ක්රියාත්මක කළ පසු, අනාථ අවසර ලැයිස්තු ඇතුළත් කිරීමක් මත gate එක අසමත් වනු ඇත).

පරීක්ෂණ වේගයෙන් සමත් කරවීමට අවසර ලැයිස්තු ඇතුළත් කිරීම් එක් **නොකරන්න**. දිගින් දිගටම වර්ධනය වන
අවසර ලැයිස්තුවක් සහිත හරිත gate එකක් ගුණාත්මකභාවය පිළිබඳ ව්යාජ විශ්වාසයකි.

### ඔබගේ PR එක මත gate එකක් අසමත් වූ විට

1. **gate ප්රතිදානය සැලකිල්ලෙන් කියවන්න** — රීතිය උල්ලංඝනය කළ ගොනුව හෝ සංකේතය කුමක්දැයි එය ඔබට නිශ්චිතවම
   පවසයි.
2. **උල්ලංඝනය නිවැරදි කරන්න** — බොහෝ gates යනු කේතය නිවැරදි වූ විගස සමත් වන නියතික ගොනු පද්ධති පරීක්ෂාවන්ය.
3. **උල්ලංඝනය පෙර සිට පවතින්නක් නම්** (එනම්, ඔබ එය හඳුන්වා නොදුන් නමුත් gate එක දැන්
   එය ආවරණය කරයි නම්): සාධාරණීකරණ අදහස් දැක්වීමක් සහ ලුහුබැඳීමේ issue එකක් සමඟ අවසර ලැයිස්තු ඇතුළත් කිරීමක් එක් කරන්න.
4. **gate එක ratchet එකක් නම්** (coverage, ESLint warnings, duplication, complexity):
   ඔබගේ වෙනස නිසා මිනුම නරක අතට හැරී ඇත. යටින් පවතින ගැටලුව නිවැරදි කරන්න, නැතහොත් (කලාතුරකින්) වෙනස හිතාමතා කළ එකක් සහ මිනුමේ
   පිරිහීම පිළිගත හැකි නම් `npm run quality:ratchet -- --update` ක්රියාත්මක කරන්න — නමුත් PR විස්තරය තුළ එයට හේතුව ලේඛනගත කරන්න.
5. **උපදේශාත්මක gates** (`continue-on-error: true`) තොරතුරු සැපයීම සඳහා පමණි — ඒවා merge කිරීම
   අවහිර නොකරන නමුත් CI සාරාංශයේ දිස් වේ. එසේ වුවත් ඒවා නිවැරදි කරන්න.

---

## නව Gate එකක් එක් කිරීම

1. `scripts/check/check-<name>.mjs` (හෝ `.ts`) සාදන්න. ප්රතිපත්ති gate 0/1 සමඟ පිටවෙයි.
   Ratchet-ආකාරයේ gate, `collect-metrics.mjs` හරහා `quality-metrics.json` වෙත metric එකක් නිකුත් කරයි.
2. `package.json` වෙත `"check:<name>": "node scripts/check/check-<name>.mjs"` එක් කර,
   අන්වර්ථ නාමය සහ එහි නිශ්චිත විධානය `config/quality/gate-manifest.json` තුළ සමමුහුර්ත කරන්න.
   පවතින වලංගුකරණ අන්වර්ථ නාමයක් වෙනස් කිරීමේදී හෝ ඉවත් කිරීමේදීද එම සමමුහුර්තකරණයම යොදන්න.
   `npm run check:gate-manifest` ධාවනය කරන්න; pre-commit hook එක සහ CI වෙනස්කම් වර්ගීකරණය
   මෙම ගිවිසුම බලාත්මක කරයි.
3. සුදුසු job එක යටතේ `.github/workflows/ci.yml` තුළ එය සම්බන්ධ කරන්න
   (ප්රතිපත්තිය → `lint` හෝ `docs-sync-strict`; ratchet → `quality-gate`).
4. එයට අවසර ලැයිස්තුවක් තිබේ නම්, යල්පැනගිය ඇතුළත් කිරීම් ස්වයංක්රීයව හඳුනාගැනීමට
   `scripts/check/lib/allowlist.mjs` වෙතින් `reportStaleEntries()` යොදන්න.
5. gate එකේ හඳුනාගැනීමේ තර්කය ආවරණය කරමින් `tests/unit/build/` තුළ පරීක්ෂණයක් ලියන්න.
6. මෙම ලේඛනය යාවත්කාලීන කරන්න (අදාළ job වගුවට පේළියක් එක් කරන්න).

---

## Agent මෙවලම්කරණය: LSP-in-the-loop (තෝරාගත හැකි)

CI gate වලට අමතරව, OmniRoute විසින් **තෝරාගත හැකි** `agent-lsp` මූලික සැකිල්ලක්
(ව්යාපෘති මට්ටමේ `.mcp.json`, Fase 7 Task 15) සපයයි. coding agent වෙත TypeScript language server එකක්
නිරාවරණය කිරීමට `.mcp.json` සාදන්න, එවිට ඔවුන් code ලිවීමට **පෙර** symbol /
diagnostic විසඳයි — එය "invented symbol" දෝෂ මූලාශ්රයේදීම අඩු කරන
`typecheck:core` සඳහා compile-before-claim සහායකයකි. එය හිතාමතාම
ස්වයංක්රීයව load නොවේ (ඔබ MCP↔LSP bridge එක තෝරා සත්යාපනය කරයි); බිඳුණු ඇතුළත් කිරීමක්
connection error එකක් log කිරීම පමණක් කරන අතර session කිසිවිටෙක බිඳ නොදමයි.

---

## තාර්කිකකරණ පසුබැසීම (ROI සමාලෝචනය — අදියර 9 රැල්ල 3)

මෙම ඉන්වෙන්ටරිය 2026-06-17 දින `ci.yml` සමඟ සසඳා ප්රතිසන්ධානය කරන ලදී (පෙර අනුවාදයේ
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` අත්හැරී තිබුණි). ප්රතිසන්ධානය කළ කට්ටලය පිළිබඳ ROI සමාලෝචනයකින්
පහත තාර්කිකකරණ අපේක්ෂකයන් හඳුනා ගන්නා ලදී. **ඒකාබද්ධ කිරීම් යාන්ත්රික CI
වෙනස්කම් වේ; මාරු කිරීම්/ඉවත් කිරීම් ක්රියාකරුට වෙන් කර ඇති ප්රතිපත්ති තීරණ වේ.** පහත කිසිවක්
තවම යොදා නැත.

**ඉහත ලේඛනගත නොකළ අනෙක් කරුණු** (උපදේශනමය, අඩු ප්‍රයෝජනවත් සංඥාවක්): `docs-lint` job එක (markdownlint + Vale, සම්පූර්ණ job එකට `continue-on-error`) සහ ස්වාධීන scanner workflow වන `semgrep.yml` / `scorecard.yml`. ඉහත විස්තර කළ activation අවශ්‍යතාවලට යටත්ව CodeQL හි දැන් `Gate / CI` යටතේ අනිවාර්ය producer සහ admission job ඇත. `quality-baseline.json` තුළ `semgrepFindings: 0` ඇතත් එය `ci.yml` හි අවහිර කරන ratchet එකකට සම්බන්ධ කර නැත — දැනට මෙම metric සම්බන්ධතාවක් නොමැතිව පවතී.

### ඒකාබද්ධ කිරීම / අනුපිටපත් ඉවත් කිරීම (යාන්ත්රික, අඩු අවදානම)

සෑම අපේක්ෂකයෙකුම 2026-06-17 දින සජීවී ගේට්ටු තත්ත්වයට එරෙහිව වලංගු කරන ලදී (විශ්වාස කරන්න, නමුත් සත්යාපනය කරන්න);
“පැහැදිලි” ලෙස පෙනුණු ඒකාබද්ධ කිරීම් කිහිපයක් ණය සඟවා ඇති බව අනාවරණය වූ අතර ඒවා **පිරිසිදු සෘජු ආදේශන නොවේ**.

- **`check:docs-sync` දෙවරක් ධාවනය වේ** — `lint` කාර්යය තුළ ස්වාධීනව සහ `check:docs-all` (`docs-sync-strict`) තුළ නැවතත්, එමෙන්ම husky pre-commit hook එක තුළද. ✅ **සම්පූර්ණයි** — ස්වාධීන `lint` කැඳවීම ඉවත් කරන ලදී.
- **CVE ස්කෑන් කිරීම** — ❌ **පිරිසිදු ඒකාබද්ධ කිරීමක් නොවේ.** `audit:deps` මඟින් lockfile පහම හරහා බරපතළ උපදේශන සහ අසම්පූර්ණ විගණන අවහිර කරන අතර, වත්මන් ප්රතිපත්තිය යටතේ ඉහළ මට්ටමේ උපදේශන අනතුරු ඇඟවීම් ලෙස වාර්තා කරයි; `check:vuln-ratchet` (osv) අසමත් වන්නේ පරීක්ෂා කර ඇතුළත් කළ baseline එකට සාපේක්ෂව _පසුබෑමක්_ ඇති විට පමණක් වන අතර, අවශ්ය විට මිනුම් නොමැති නම් ඒවා ප්රතික්ෂේප කරයි. අර්ථකථන වෙනස්ය — `audit:deps` ඉවත් කිරීමෙන් නිරපේක්ෂ බරපතළ ගේට්ටුව සහ ස්වාධීන පැකේජ විගණන ලදුපත් අහිමි වනු ඇත. දෙකම තබා ගන්න.
- **චක්ර හඳුනාගැනීම** — ✅ **සම්පූර්ණයි** (#15159 G-01/G-02). මෙහි පැරණි පෙළ `check:cycles` “හරිත, තෝරාගත්” ගේට්ටුව ලෙස හැඳින්වූ අතර `check:circular-deps` (dpdm) චක්ර 91ක් වාර්තා කළ නිසා එය අවහිරකාරීව තබා ගැනීම සාධාරණීකරණය කළේය. එම හරිත තත්ත්වය **ව්යාජ හරිත තත්ත්වයක්** විය: `check:cycles` විසින් උපබහලුම් 5ක් (ගොනු 450ක්) ස්කෑන් කළ අතර, ස්ථිතික `import|export … from` පමණක් ගැළපූ අතර සෑම `@/` සහ `@omniroute/open-sse/` විශේෂකයක්ම ඉවත් කළ බැවින්, repo එකේ ප්රමුඛ වූ dynamic-import + alias චක්ර දැකිය නොහැකි විය. නිවැරදි කරන ලදී: ගේට්ටුව දැන් `src` + `open-sse` (ගොනු 5023ක්) හරහා ගමන් කර, TypeScript AST වෙතින් විශේෂක රැස් කරයි (එබැවින් `import("…")` ගණන් ගන්නා අතර type-position `typeof import("…")` ගණන් නොගනී), සහ tsconfig `paths` විසඳයි. එය 0ක් නොව චක්ර **14ක්** සොයා ගනී. ගේට්ටු PR එකක් තුළ පෙර සිට පවතින චක්ර 14ක් නිවැරදි කළ නොහැකි බැවින්, `check:cycles` දැන් **රැචට්** එකකි (`--ratchet`, `quality-baseline.json` තුළ සීමාව `metrics.cycles.value = 14`, `direction: down`) — එය ඕනෑම _පසුබෑමක්_ අවහිර කරන අතර ගණන අඩු විය හැක්කේ පමණි. CI විසින් `npm run check:cycles:ratchet` ධාවනය කරයි. ක්රමානුකූල අඩු කිරීම **A-01** සමඟ සිදු වේ. පුළුල් දෙවන මතය ලෙස `check:circular-deps` (dpdm) උපදේශනාත්මකව පවතී.
- **සංකීර්ණතාව** — ✅ **සම්පූර්ණයි** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): එක් ESLint ගමනක්, ruleId අනුව ගණන් කරන බැවින් cyclomatic+max-lines සහ cognitive baselines ස්වාධීනව පවතී; තනි `check:complexity` / `check:cognitive-complexity` දේශීය `--update` සඳහා පවතී.
- **`/api` ප්රති-භ්රාන්තිකරණය** — ✅ **සම්පූර්ණයි** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` හි එක් FS ඉන්වෙන්ටරියක්, openapi-routes + docs-symbols තවදුරටත් ස්වාධීනව වාර්තා කරයි; තනි ඒවා දේශීය ධාවන සඳහා පවතී.
- **`check:node-runtime` කාර්ය 11ක ධාවනය වේ** — ⚠️ **අඩු ROI.** සෑම එකක්ම වෙනම runner එකක් වන අතර පරීක්ෂාව තත්පර 1කට අඩුය; ලාභදායක නොවන වෙනස්කම් සඳහා වැය වන උත්සාහයට සාපේක්ෂව සමස්ත ඉතිරිය තත්පර ~10කි, තවද සෑම කාර්යයකම ඇති ලාභදායී ආරක්ෂකයක් අහිමි වේ. එය එතරම් වටින්නේ නැත.
- **CI lint මත `typecheck:noimplicit:core`** — ✅ **lint කාර්යයෙන් ඉවත් කරන ලදී** (උපදේශනාත්මක `continue-on-error` ලෙස තිබුණි); අවහිරකාරී type මතුපිට වන්නේ `typecheck:core` + `check:type-coverage` ය. දේශීය script එක තබා ඇත.

### මාරු කිරීම / තීරණය කිරීම (ක්රියාකරු ප්රතිපත්තිය)

- `check:openapi-security-tiers` (උපදේශනාත්මක) — ❌ **පිරිසිදුව මාරු කළ නොහැක.** එය 0 සමඟ අවසන් වන නමුත් `LOCAL_ONLY_API_PREFIXES` යටතේ ඇති `traffic-inspector` routes කිහිපයක `x-loopback-only: true` annotation එක නොමැති බවට අනතුරු අඟවයි. එය බලාත්මක කිරීමට පළමුව එම annotations `openapi.yaml` වෙත එක් කළ යුතුය.
- `typecheck:noimplicit:core` (උපදේශනාත්මක) — අවහිරකාරී `check:type-coverage` රැචට් එකෙන් බොහෝ දුරට ආවරණය වේ. එය රැචට් එකකට මාරු කරන්න හෝ අතිරික්ත දෙවන `tsc` ගමන ඉවත් කරන්න.
- `test:vitest:ui` (දැන් **අවහිරකාරී**) — පෙර සිට පවතින අසමත්වීම් `vitest.config.ts` තුළ `// #8618` හඹායෑමේ අදහස් සමඟ පැහැදිලිව බැහැර කර ඇත; නව අසමත්වීම් කාර්යය අසමත් කරයි.
- `check:secrets` (gitleaks, අවහිරකාරී රැචට්) — වත්මන් සීමාව `quality-baseline.json` තුළ ඇති `metrics.secretFindings` ය. ඕනෑම ව්යතිරේකයකට සාධාරණීකරණය කළ `.gitleaks.toml` ඇතුළත් කිරීමක් අවශ්ය වේ; මිනුම නොලැබීම INCOMPLETE ලෙස සැලකේ. මෙම ස්කෑන් කිරීම GitHub ස්වදේශීය රහස් ස්කෑන් කිරීම සහ `check:public-creds` සඳහා අනුපූරක වේ.
- `check:pr-evidence` (අවහිරකාරී, PR-body ගද්යය grep කරයි) — ව්යාජ ධනාත්මක ප්රතිඵල ඇතිවීමේ ඉහළ අවදානමක් ඇත; එය ඉවත් කළහොත් දැඩි රීතිය #18 බලාත්මක කිරීම දුර්වල වන බැවින්, මෙය සැබෑ ප්රතිපත්තිමය තීරණයකි.
- `semgrep` (උපදේශනාත්මක ස්වාධීන එකක්) — OWASP කාණ්ඩ සඳහා CodeQL සමඟ අතිච්ඡාදනය වේ; එහි baseline එක රැචට් එකකට සම්බන්ධ කරන්න හෝ එය ඉවත් කරන්න.

---

## අදාළ ලේඛන

- සැපයුම් දාමය (මූලාශ්ර විස්තර, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — යතුරු කට්ටල සමානතා ද්වාරය

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, කාර්යය `i18n-ui-coverage`).
සෑම `src/i18n/messages/<locale>.json` ගොනුවකම ඇති අවසාන මට්ටමේ යතුරු කට්ටලය `en.json` සමඟ සසඳන අතර, යතුර එක් කළේ කවදාද යන්න නොසලකා, කිසියම් අවසාන මට්ටමේ යතුරක් නොමැති හෝ අමතර නම් අසමත් වේ. `__MISSING__:` ස්ථානධාරක තිබෙන ලෙස ගණන් ගැනේ (ඒවායේ අන්තර්ගතය අනුපාත ද්වාරයේ වගකීමයි). මෙය වෙනස්කම් මත පදනම් වූ/ප්රතිශත මත පදනම් වූ අනෙක් ද්වාර දෙකට නිරපේක්ෂ පරිපූරකය වේ: `check-ui-keys-coverage` සෑම පෙදෙසකටම 80 % අවම සීමාවක් බලාත්මක කරයි (~13,000 අතරින් යතුරු 43ක් නොමැති වුවද එය තවමත් 99.7 % ලෙස පෙන්වයි), සහ `check-new-key-coverage` විනිශ්චය කරන්නේ PR එකක් `en.json` වෙත එක් කරන යතුරු පමණි. පෙදෙස් සමූහයක් උත්පාදනය කරන්නේ එහි ශාඛාව වෙන් කරන දිනයේ තිබෙන `en.json` වෙතින් වන අතර, මූලික ශාඛාව දිගටම යතුරු එක් කරන අතරතුර එය දින ගණනක් පරිවර්තනය කරයි; සමූහ PR එකම කිසිදු යතුරක් එක් නොකරන නිසා, 1 වන සමූහය (#13044) පෙදෙස් නවයක යතුරු 43ක් අඩුවෙන්ද, 2 වන සමූහය (#13660) පෙදෙස් අටක යතුරු 10ක් අඩුවෙන්ද එක් වූ විට (2026-09-15), සහෝදර පරීක්ෂණ දෙකම නිහඬව පැවතුණි. අසමත් තත්ත්වයක්
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` මඟින් නිවැරදි කරන්න; `extra` අවසාන මට්ටමේ යතුරක් යනු මූලාශ්රයෙන් එය ඉවත් කර ඇති බවයි — එය පෙදෙසෙන් මකා දමන්න. `--warn` අසමත් නොකර වාර්තා කරයි.
`--catalog=cli` භාවිතයෙන් `bin/cli/locales` මත එම සැසඳීමම ක්රියාත්මක වේ (`npm run i18n:check-keys:cli`); පියවර දෙකම `i18n-ui-coverage` කාර්යය තුළ ඇත.

#### `check-new-key-coverage` — නව යතුරු i18n ද්වාරය

`check-ui-value-drift` හි සහෝදර පරීක්ෂණයයි. පරිවර්තන යාවත්කාලීන නොකර ඉංග්රීසි අගයක් **නැවත ලියූ** විට එය හඳුනාගන්නේ පළමු පරීක්ෂණයයි; සමහර පෙදෙස්වලට කිසිදා නොලැබුණු ඉංග්රීසි යතුරක් **එක් කළ** විට එය හඳුනාගන්නේ මෙයයි.

`check-ui-keys-coverage` හට මෙම ප්රභේදය හඳුනාගත නොහැක: එය සෑම පෙදෙසකටම ප්රතිශත අවම සීමාවක් බලාත්මක කරන අතර, ~13,000ක් අතරින් යතුරු එකොළහක් නොමැති වුවද ආවරණය 99.9% ලෙස පවතී. භාෂාවකට ප්රතිශතයකින් "මෙම විශේෂාංගය පරිවර්තනය නොකර නිකුත් විය" යන්න ප්රකාශ කළ නොහැක — සම්පූර්ණ විශේෂාංගයක්ම නව පෙදෙසකට කිසිදු පෙළක් නොමැතිව එක් කළ හැකි අතර, එම අගය කිසිවිටෙක වෙනස් නොවිය හැක.

මෙය සංකේතනය කරන සිදුවීම: Orchestration Canvas හි 3 වන අදියර, එවකට පැවති පෙදෙස් 42 පුරා එහි යතුරු එකොළහ පරිවර්තනය කළේය. පැය කිහිපයකට පසු EU භාෂා සමූහය (#13044) ගබඩාව පෙදෙස් 51ක් දක්වා ගෙන ගිය අතර, නව පෙදෙස් නවයට (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) ඒවා කිසිදා නොලැබුණි. නොමැති යතුරක් සඳහා `deepMergeFallback` ඉංග්රීසි ආදේශ කරන බැවින්, අසමත් වීමේ ආකාරය හිස් UI එකක් වෙනුවට පරිවර්තනය නොකළ UI එකක් විය — සැබෑ ගැටලුවක් වූ අතර, සැලසුම අනුවම නිහඬ විය.

එහි සහෝදර පරීක්ෂණය මෙන්ම මෙයද **වෙනස්කම් පිළිබඳ දැනුවත්** වන අතර, ඒකාබද්ධ කිරීමේ මූලයේ ඇති ඉංග්රීසි අන්තර්ගතය ක්රියාකාරී ගස සමඟ සසඳයි. එබැවින් පෙර සිට පැවති හිඩැස් නොවෙනස්ව තබන අතර, ද්වාරය සක්රිය කිරීමට කිසිදු සංක්රමණයක් අවශ්ය නොවීය.

**`__MISSING__:<english>` සලකුණක් මෙය සපුරාලන්නේ නැත (2026-09-17 සිට).** පෙර එය ලේඛනගත කල් දැමීමේ ක්රමය විය — ධාවන කාලයේදී නිවැරදි ඉංග්රීසි පෙළ වෙත ආපසු යයි — නමුත් 2026-09-16 දින විශේෂාංග PR අටක් යතුරු 61ක් එක් කර ඒවා පරිවර්තනය කිරීම වෙනුවට පෙදෙස් 65ටම සලකුණ ඇතුළත් කළේය: මෙම ද්වාරය ඒ සියල්ල පිළිගත්තේය, කිසිවක් PR අවහිර නොකළ අතර, සැබෑ පරිවර්තන අනුපාතය බලාත්මක කරන ද්වාරය පසුව නිකුතු අග්රයේදී සියලු දෙනා සඳහා අසමත් විය (pt-BR 3.2 % > 2.5 % + 0.5). දැන් සලකුණක් නොමැති පරිවර්තනයක් ලෙස විනිශ්චය කෙරේ. අසමත් තත්ත්වයක්
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` මඟින්, හෝ සියලු පෙදෙස් සමාන්තරව `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
වෙන් කළ තත්ත්වයකදී ආරක්ෂිත වන අතර `OMNIROUTE_TRANSLATION_*` පරිසර විචල්ය නොමැතිව ආරම්භ වීම ප්රතික්ෂේප කරයි) මඟින් නිවැරදි කරන්න. ඉංග්රීසියෙන්ම පැවතිය යුතු යතුරක් (ස්ථාවර කළ නිෂ්පාදන/එන්ජින්/ධජ නාමයක්) සලකුණක් පිටුපස නොව, `scripts/i18n/untranslatable-keys.json` තුළ තිබිය යුතුය. `vi` සලකුණු සම්පූර්ණයෙන්ම තහනම් කරයි (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — අත්හිටවූ පරීක්ෂණ ද්වාරය

`vitest.config.ts` හි `exclude` ලැයිස්තුවේ ඇති ගොනුවක් යනු ක්රියාත්මක නොවන පරීක්ෂණයකි; එහෙත් ගස කියවන කෙනෙකුට එය ආවරණයක් ලෙස පෙනේ. ගොනු හැට දෙකක්
`// #8618 — pre-existing failure; remove this exclusion when fixed` අදහස් දැක්වීම පිටුපස එකතු වී තිබුණි. #8618 ගැටලුව 2026-08-11 දින වසා දැමූ නමුත්, එය නිරීක්ෂණය කළ ලැයිස්තුව ඇතුළත් කිරීම් 45 සිට 62 දක්වා වර්ධනය වූ අතර, සෑම නව ඇතුළත් කිරීමකටම අවසන් කළ ගැටලුවක් වෙත යොමු කරන අදහස් දැක්වීමක් උරුම විය. අවසානයේ ලැයිස්තුව ගොනුවෙන් ගොනුව මිනුම් කළ විට (#13204), **මූලාශ්රයේ කිසිදු වෙනසක් නොමැතිව 62න් 51ක් වත්මන් ගසට එරෙහිව සමත් විය**.

සැබෑ ගොනුවකට විසඳෙන සෑම බැහැර කිරීමක්ම (a) නිරීක්ෂණ ගැටලුවක් නම් කළ යුතු අතර (b) එහි මිනුම් කළ තත්ත්වය සමඟ `config/quality/vitest-exclusions.json` තුළ දිස්විය යුතු බව ද්වාරය නියම කරයි. එබැවින් එකක් එක් කිරීම, ඇතුළත් කිරීම් 60ක අරාවකට තවත් පේළියක් එක් කිරීම වෙනුවට, ඒ සඳහා වෙන්වූ ගොනුවක සමාලෝචනය කළ හැකි වෙනසක් වේ. එය හිතාමතාම බැහැර කළ පරීක්ෂණ නැවත ක්රියාත්මක නොකරයි — ඒ සඳහා මිනිත්තු ~10ක් වැය වන අතර එය ආවර්තික කාර්යයකට අයත් වේ; එක් එක් පරීක්ෂණය අවසන් වරට මිනුම් කළ වේලාව ඉන්වෙන්ටරිය වාර්තා කරයි.
