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

CI සහ Quality Gates කාර්ය ප්‍රවාහයන් එක් එක් ස්ථාවර තීන්දුවක් නිකුත් කරයි: `Gate / CI` සහ `Gate / Quality`. ඔවුන්ගේ අනුවාදගත ඇතුළත් වීමේ ප්‍රතිපත්තිය අවශ්‍ය හෝ උපදේශන ලෙස සෑම ඉහළ ප්‍රවාහ රැකියාවක්ම ගණන් කරයි. අදාළ අවශ්‍ය කාර්යයක් සාර්ථක විය යුතුය: අතුරුදහන්, අවලංගු, මඟ හැරුණු, පොරොත්තු සහ නොදන්නා ප්‍රතිඵලවලට PASS පිහිටුවිය නොහැක. වලංගු ලේඛන-පමණි හෝ නාමාවලිය-පමණක් වර්ගීකරණයක් කේත මංතීරුවක් අදාළ නොවන බවට පත් කළ හැක; PR කෙටුම්පතක් පිළිගත් අපේක්ෂකයෙකු නොවේ. `hotfix` ලේබලයක් සාක්ෂි අත්හරින්නේ නැත.

කාර්ය ප්‍රවාහ දෙකම PRs main/release ශාඛාවලට ආවරණය කරයි, `main` වෙත තල්ලු කරයි, අතින් යැවීම සහ සමූහ සිදුවීම් ඒකාබද්ධ කරයි. තල්ලු කිරීම, යැවීම සහ ඒකාබද්ධ-කණ්ඩායම සම්පූර්ණ තේරීම ධාවනය කරන්න. `release/**` වෙත තල්ලු කිරීම් ඒවා ආරම්භ නොකරන්න (2026-10-18): සෑම වෙනස්කමක්ම දැනටමත් එහි PR මත න්‍යාසය ධාවනය කර ඇති අතර ඒකාබද්ධ කළ සංයෝජනය වන්නේ Release-Green's job (`docs/ops/RUNNER_BOX.md` → Hosted lane) ය. ගෑරුප්පු සහ ඒකාබද්ධ කණ්ඩායම් වෙනත් ආකාරයකින් ස්වයං-සත්කාරක ධාවකයන් තෝරා ගන්නා රැකියා සඳහා සත්කාරක ධාවකයන් භාවිතා කරයි; ප්‍රමාණවත් සත්කාරක ධාරිතාව ප්‍රචාරණයට පෙර සත්‍යාපනය කළ යුතුය.

සාමාන්‍ය PR එකක් වේගවත් තේරීම ක්‍රියාත්මක කරයි. ඇතුළත් වීමේ ප්‍රතිපත්තියේ `full-code` සහ `full-code-e2e` මංතීරු (E2E, ඒකාබද්ධ කිරීම, පැකේජ පුරාවස්තු, Electron දුම්, Bun SQLite, පරිසර පද්ධතිය සහ ප්‍රොටෝකෝල සේවාලාභීන්) ධාවනය වන්නේ Mergify පෝලිම් කෙටුම්පතක් මත හෝ සම්පූර්ණ ධාවන කාලයකදී පමණි: `gh workflow run ci.yml --ref <branch>`.

සෑම JSON රිසිට්පතක්ම පරීක්ෂා කළ SHA, කාර්ය ප්‍රවාහ ධාවනය සහ උත්සාහය හඳුනා ගනී. CLI checkout/event SHA නොගැලපීම ප්‍රතික්ෂේප කරයි. කාර්ය ප්‍රවාහ පරීක්ෂණ මගින් ප්‍රතිපත්ති සාමාජිකත්වය විනිශ්චය කාර්යයේ `needs` ලැයිස්තුවට බැඳේ, එබැවින් නව හෝ ඉවත් කරන ලද මංතීරුවක් නිහඬව අතුරුදහන් විය නොහැක. රිසිට්පත් ඔවුන්ගේම කාර්ය ප්‍රවාහය ආවරණය කරයි, ප්‍රකාශනය, යෙදවීම හෝ පවතින උපදේශක ස්කෑනරයක අභ්‍යන්තරය නොවේ. ශාඛා නීතිවල චෙක්පත් නාම දෙකම සක්රිය කිරීම වෙනම පරිපාලනමය වෙනසක් වේ; මෙම රැකියා එකතු කිරීමෙන් ශාඛාවක් ආරක්ෂා නොවේ.

### පෝලිම ඒකාබද්ධ කරන්න

`queue` ලේබලය Mergify පෝලිමට (`.mergify.yml`) PR යවයි. Mergify විසින් `mergify/merge-queue/` ශාඛාවක් මත PR කෙටුම්පතක් විවෘත කරයි, CI එහි සම්පූර්ණ තේරීම ධාවනය කරයි, සහ `Gate / CI`, `Gate / Quality` සහ `Merge integrity (changelog + generated skills)` සමත් වූ විට මුල් PR ඒකාබද්ධ වේ.

Mergify එහි පෝලිම් සාරාංශය කෙටුම්පතේ විස්තරයට ලියන අතර අනෙකුත් යෙදුම් වලටද එය සංස්කරණය කළ හැක. එවැනි කෙටුම්පතක `pull_request` `edited` සිදුවීමක් එහිම සමගාමී කණ්ඩායමක් (`-queue-edit-<run_id>`) ගන්නා බැවින් එයට කෙටුම්පතේ සැබෑ ධාවනය අවලංගු කළ නොහැකි අතර එය ගේට්ටුව සහ අනුකෘතිය මඟ හරියි. තාම දුවන්නේ `Merge integrity` විතරයි. Mergify විසින් මඟ හැරුණු `Gate / CI` එකක් අසාර්ථක චෙක්පතක් ලෙස කියවා PR dequeue කරන නිසා, මඟ හැරුණු ගේට් කාර්යය වෙනස් චෙක්පත් නාමයක් දරයි.

dequeue එකකින් පසු, තල්ලුවක් සෑම විටම PR ඉල්ලන්නේ නැත. ඒකට `@mergifyio queue` කමෙන්ට් කරන්න.

### පිළිගැනීම් අඩු කරන්නා තුළ රඳවා ගත් සාක්ෂි

`scripts/quality/validate-release-acceptance.mjs` විසින් සපයන ලද සැලැස්මක් අඩු කරන අතර එහි ප්‍රකාශනය; සැලැස්ම සම්පූර්ණ මුදා හැරීමේ නල මාර්ගය ආවරණය කරන බව තහවුරු නොවේ. එම සැලැස්ම `VERIFIED` වන විට පවා එහි වාර්තා පැහැදිලිවම `releaseAcceptance: false` සකසා ඇත. `release-acceptance.yml` කාර්ය ප්‍රවාහය තවමත් සෙවනැලි සවිකිරීම් භාවිතා කරයි, සැබෑ ගොඩනැගීම, පැකේජය, ඇරඹුම් හෝ ප්‍රවර්ධන ලදුපත් නොවේ.

රඳවාගත් සාක්ෂි සත්‍යාපනය කිරීමට CLI හට `--evidence-root` අවශ්‍ය වේ. ගොනු `<evidence-root>/<artifact_id>/<member>` ලෙස විසඳා SHA-256 ලෙස හැෂ් කර ඇත. සාක්ෂි නොමැති PASS වාර්තාවක්, නැතිවූ හෝ වෙනස් වූ ගොනුවක්, අනාරක්ෂිත මාර්ගයක් හෝ symlink එකක් සත්‍යාපනය වළක්වයි. නැතිවූ ගොනු හිස් සාර්ථක ලොගවලට සමාන නොවේ. පවතින SHA/run/attempt චෙක්පත් ස්වාධීනව පවතී: ගැළපෙන බයිට් වලට පරණ ලදුපතක් සුරැකිය නොහැක. ගොනු අඛණ්ඩතාව ක්‍රියාත්මක කිරීමේ සත්‍යතාව හෝ කෞතුක භාණ්ඩ ප්‍රවර්ධනය පිළිබඳ සාක්ෂි නොවේ.

### ස්ථිතික ස්කෑන් ඉන්වෙන්ටරි

අනුවාදිත npm-අන්වර්ථ ඉන්වෙන්ටරි සහ ස්ථිතික-ස්කෑන් සාමාජිකත්වය `config/quality/gate-manifest.json` හි ජීවත් වේ. `package.json` ට එරෙහිව ස්ක්‍රිප්ට් නම් සහ නියම විධාන වලංගු කිරීමට `npm run check:gate-manifest` ධාවනය කරන්න; එකතු කිරීම්, ඉවත් කිරීම් සහ විධාන ප්ලාවිතය CI හි දේශීය කොක්ක සහ වෙනස් කිරීමේ වර්ගීකරණ කාර්යයන් දෙකම අසාර්ථක වේ. අන්වර්ථයක් යනු කාර්ය ප්‍රවාහ කාර්යයක්, න්‍යාස අවස්ථාවක් හෝ පරීක්ෂණ අවස්ථාවක් නොවේ: මෙම ගණන් එකිනෙකට හුවමාරු කළ හැකි ලෙස ඉදිරිපත් නොකළ යුතුය.

තෝරාගත් අන්වර්ථ ක්‍රියාත්මක නොකර පරීක්ෂා කිරීමට `npm run quality:scan -- --list` හෝ `npm run quality:scan:fast -- --list` භාවිතා කරන්න. ධාවකය npm පිවිසුම් ලක්ෂ්‍යය ආයාචනා කරයි, එබැවින් එහි ධාවන කාලය (වින්‍යාස කර ඇති Bun ඇතුළුව) සංරක්ෂණය කර ඇත. මැනිෆෙස්ට් වාර්තා එම පැතිකඩවලින් පිටත අන්වර්ථ නාමයන් වෙන වෙනම ඉල්ලා ඇති අතර, කියවීමට පමණක් ස්කෑන් පැතිකඩවල නඩත්තු විධාන තහනම් වේ.

මෙම පැතිකඩ ස්ථිතික ස්කෑන් කිරීම පමණක් ආවරණය කරයි. ඔවුන් නිෂ්පාදන පරීක්ෂණ, ආවරණය, ඇසුරුම්කරණය, බාහිර චෙක්පත් හෝ අපේක්ෂකයෙකුගේ සම්පූර්ණ නිකුතුව පිළිගැනීම සහතික නොකරයි. කාර්ය ප්‍රවාහ ඇතුළත් කිරීම සම්බන්ධිත `config/quality/admission-policy.json` සහ `scripts/quality/admission-verdict.mjs` භාවිතා කරයි. නිකුතු-නිරීක්ෂක පැතිකඩ වෙන්ව පවතී; ඔවුන්ගේ අදාළ චෙක්පත් සහ රිසිට්පත් ස්වාධීනව පරීක්ෂා කරන්න. සම්පූර්ණ නිරීක්ෂකයාගේ ස්ථිතික විධාන `audit:deps`, විකෘති-පරීක්ෂණ තේරීම සහ පරිවර්තන චෙක්පත් ඇතුළුව `config/quality/release-green-static-profile.json` හි ප්‍රකාශ කර ඇත. පූරකය package.json සහ ආකෘතිගත CI/Quality ප්‍රකාශයන්ට එරෙහිව npm විධාන වලංගු කරයි; එය ෂෙල් ටෝකන තර්ක ලෙස ක්‍රියාත්මක කිරීම වෙනුවට ප්ලාවිතය ප්‍රතික්ෂේප කරයි. අවශ්‍ය ස්කෑනර් SKIP/INCOMPLETE ප්‍රතිදානයට PASS ස්ථාපිත කළ නොහැක. පැතිකඩ එහි බාහිර බැහැර කිරීම් වාර්තා කරන අතර සත්කාරක ආවරණය, පරීක්ෂණ න්‍යාස, පැකේජය හෝ යෙදවීමේ සාක්ෂි ප්‍රතිස්ථාපනය නොකරයි. පහත ගද්‍ය ඉන්වෙන්ටරිය යොමුවකි, ගේට්ටුවක් සැබවින්ම ක්‍රියාත්මක වූ බවට සාක්ෂි නොවේ.

ස්ක්‍රිප්ට් `scripts/check/` (ප්‍රතිපත්ති දොරටු) සහ `scripts/quality/` (රැට්චෙට් එන්ජිම) යටතේ ජීවත් වේ. සත්‍යයේ CI මූලාශ්‍රය `.github/workflows/ci.yml` වේ.

### PR වේගවත් මාවත මුදා හරින්න (`quality.yml`)

`.github/workflows/quality.yml` main/release PRs මත CI සම්පූර්ණ කරයි, `main` වෙත තල්ලු කරයි, කණ්ඩායම් යැවීම සහ ඒකාබද්ධ කිරීම. PRs මාර්ගයෙන් පෙරන ලද වේගවත් චෙක්පත් භාවිතා කරයි. ස්ථිරව අබල කළ අනුපිටපත් ගොඩනැගීම ඉවත් කරන ලදී; සැබෑ build/package/boot චෙක්පත් CI හි පවතී. ඒකක කට්ටලය සහ vitest ධාවනය වන්නේ CI (`Unit Tests (N/8)` සහ `Vitest`) තුළ පමණි.

| රැකියාව                                          | විෂය පථය                                                                                                                          | අවහිර කිරීම          |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs සහ docs-all                                                                                          | ඔව්                  |
| `Fast Quality Gates`                             | කේතය PRs; ස්ථිතික චෙක්පත්, ටයිප් චෙක්, ඩෑෂ්බෝඩ් ටයිප් චෙක්, බලපෑමට ලක් වූ ඒකක පරීක්ෂණ, අමතක වූ සහෝදර සහෝදරියන්ගේ පරීක්ෂණ (උපදේශන) |
| `No new ESLint warnings`                         | කේතය PRs; මර්දනය-දැනුවත් lint guard                                                                                               | ඔව්, ගෑරුප්පු ඇතුළුව |
| `Merge integrity (changelog + generated skills)` | කෙටුම්පත් නොවන PRs; changelog සහ ජනනය කරන ලද කුසලතා සමමුහුර්තකරණය                                                                 | ඔව්, ගෑරුප්පු ඇතුළුව |

#### අමතක වූ සහෝදර සහෝදරියන්ගේ පරීක්ෂණ වාර්තාව

`npm run check:forgotten-sibling-tests` `Fast Quality Gates` හි උපදේශන පියවරක් ලෙස ක්‍රියාත්මක වන අතර පරීක්ෂණ-බලපෑම් සිතියම පිටුපස ආයාත විසදුම නැවත භාවිතා කරයි. වෙනස් කරන ලද සෑම නිෂ්පාදන මොඩියුලයක් සඳහාම, අපේක්ෂක පරීක්ෂණය අදින්න-ඉල්ලීමේ වෙනසෙන් නොමැති විට එය නියතිවාදී `changed module/symbol -> static consumer -> candidate sibling test` දාමයන් වාර්තා කරයි. Markdown සාරාංශය සහ JSON ප්‍රතිඵලය කිසියම් අවහිර කිරීම් පෙරළීමකට පෙර ක්‍රමාංකනය සඳහා `forgotten-sibling-tests` කාර්ය ප්‍රවාහ කෞතුක වස්තුව ලෙස රඳවා තබා ගනී.

බැරල් ප්‍රති-අපනයන සහ ගතික ආනයනයන් විභේදන රෝග විනිශ්චයන් පමණි; ඔවුන් කිසි විටෙකත් අවහිර සොයාගැනීමක් නිර්මාණය නොකරයි. සමාලෝචිත ව්‍යතිරේක සජීවීව `config/quality/forgotten-sibling-allowlist.json`. සෑම ප්‍රවේශයක්ම පාරිභෝගික සහ අපේක්ෂක පරීක්‍ෂණය නම් කළ යුතුය, නිශ්චිත තාර්කිකත්වයක් ලබා දිය යුතුය, සහ GitHub නිකුතුවක් හෝ අදින්න ඉල්ලීමක් සම්බන්ධ කළ යුතුය. විකෘති ඇතුළත් කිරීම් අසාර්ථකයි වසා ඇත. ව්‍යතිරේකවලට මකා දැමූ අපේක්ෂක පරීක්ෂණයක් හෝ `.skip`/`.todo` එකතු කරන වෙනස මැඩපැවැත්විය නොහැක ; ප්‍රකාශය දුර්වල කිරීම සහ වෙනත් ආවරණ ස්වාධීනව අවහිර කරන `check:test-masking` ගේට්ටුව සතු වේ.

### රැකියාව: `lint`

සෑම PR සිට `main` දක්වා ධාවනය වේ. අසාර්ථක වූ විට අවහිර කිරීම් ඒකාබද්ධ වේ.

| පිටපත (`npm run ...`)             | වලංගු කරයි                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | අවහිර කිරීම                            |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| `check:node-runtime`              | Node.js අනුවාදය සහය දක්වන පරාසය තුළ ඇත                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ඔව්                                    |
| `check:cycles`                    | සියලුම `src/` + `open-sse/` හරහා චක්‍රලේඛ ආයාත (AST-පාදක, tsconfig `paths` විසඳා ඇත). ඕනෑම චක්‍රයක් පවතින විට Bare පිටවීම් 1 ( #15281 සිට අසාර්ථක-වසා ඇත) සහ SCCs ලැයිස්තුගත කරයි. `check:cycles:ratchet` `direction: down` CI ධාවනය වන G-01/G-02) `quality-baseline.json` — #15159 `metrics.cycles` සිවිලිම ඉක්මවා යන විට අවහිර කරයි                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ඔව් (රැට්චෙට්)                         |
| `check:boundary`                  | `open-sse → src` සම්බන්ධ කිරීම: එන්ජිමේ සිට යෙදුම වෙතට අනන්‍ය ගොනු-ගොනු ආයාත කිරීම (`scripts/quality/measure-boundary.mjs`; දාර ලැයිස්තුව v4 core/module-split ප්‍රතිකර්ම පසුබෑම වේ). Bare = උපදේශන වාර්තාව ( `quality:boundary` ලෙසම). `check:boundary:ratchet` ( CI දිවෙන දේ, `quality.yml` fast-gates ratchet loop තුළද) මනින ලද 771, `direction: down` හි `quality-baseline.json` — බීජයේ ගණන් කිරීම `metrics.boundaryOpenSseToSrc` සිවිලිම ඉක්මවන විට අවහිර කරයි; `--update` එය අඩු කරයි; PRs මත පදනම්-සාපේක්ෂ (`--base-ref`, පහත බලන්න)                                                                                                                                                                                                                                                                                                                                                                                                                            | ඔව් (රැට්චෙට්)                         |
| `check:route-validation:t06`      | Zod යෝජනා ක්‍රම සියලු මාර්ගවල පවතී (ස්ථර 6 ප්‍රතිපත්තිය)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ඔව්                                    |
| `check:any-budget:t11`            | `@ts-expect-error // any` ගණන අයවැය ඉක්මවා නොයයි (ස්ථර 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ඔව්                                    |
| `check:provider-consistency`      | `providers.ts` හි සෑම සැපයුම්කරුවෙකුටම `providerRegistry.ts` හි ගැළපෙන ප්‍රවේශයක් ඇත (සහ අනෙක් අතට, අවසර ලැයිස්තුව තුළ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ඔව්                                    |
| `check:model-lifecycle`           | අතින් නඩත්තු කරන ලද මාර්ගගත කිරීමේ වගු තුන පිරික්සූ ජීවන චක්‍ර සැණෙපොට (#11503) අනුකූලව පවතී: `FITNESS_TABLE` (`taskFitness.ts`) ලකුණු `REGISTRY` හට ගමන් කළ හැකි විශ්‍රාමික හැඳුනුම්පතක් නොමැත; සෑම `BUILT_IN_ALIASES` ඉලක්කයක්ම `REGISTRY` හි පවතින අතර විශ්‍රාමික-id සැණරුවෙන් නොමැත; තවමත් `REGISTRY` හි ඇති සෑම විශ්‍රාමික හැඳුනුම්පතක්ම ඉදිරියට යවනු ලැබේ හෝ `allowedRetiredInCatalog` හි ලැයිස්තුගත කර ඇත; සහ එම ස්නැප්ෂොට් එකේ `DEFAULT_DEGRADATION_MAP` මූලාශ්‍රයක් හෝ ඉලක්කයක් විශ්‍රාම ගොස් ඇති බවක් නොපෙනේ. ආකෘතියක් දැනට සජීවී උඩු ප්‍රවාහයක් මගින් සපයන බව මින් ඔප්පු නොවේ. නොබැඳි — `config/quality/model-lifecycle.json` සමඟ සංසන්දනය කරයි, `npm run quality:refresh-model-lifecycle` සමඟ අතින් නැවුම් කර ඇත (ජාලය; CI වෙත රැහැන්ගත නොවේ). `allowedRetiredInCatalog` යනු දැවී යාමකි: ලුහුබැඳීමේ ගැටලුවක් සමඟ පමණක් ප්‍රවේශයක් එක් කරන්න.                                                                                                                 | ඔව්                                    |
| `check:fetch-targets`             | සේවාදායක පැත්තේ `src/` හි සෑම `fetch("/api/...")` සැබෑ `route.ts` බවට නිරාකරණය වේ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ඔව්                                    |
| `check:deps`                      | repo හි සෑම `package.json` හරහා ඇති සියලුම `npm install` -able deps `dependency-allowlist.json` හි ඇත; නව ඇමිණුම් නොකළ හෝ බෑවුම් සහිත පැකේජ සලකුණු කර ඇත                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ඔව්                                    |
| `audit:deps`                      | ස්වාධීන අගුළු ගොනු පහේම npm විගණනය (root, Electron, OpenCode ප්ලගීන v1/v2 සහ සපයන්නා). විවේචනාත්මක උපදේශන අවහිර කිරීම; ඉහළ උපදෙස් දෘශ්‍ය අනතුරු ඇඟවීම් ලෙස පවතී. Missing/failed විගණන යනු INCOMPLETE සහ block; එක් විෂය පථයකට අගුළු හෑෂ් සහ වාර්තා රඳවා තබා ඇත.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ඔව්                                    |
| `check:lockfile`                  | `package-lock.json` integrity — https රෙජිස්ට්‍රි, අඛණ්ඩතා හැෂ්, ධාරක අභිබවා යාමක් නැත                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ඔව්                                    |
| `check:licenses`                  | නිෂ්පාදන පරායත්තතා සඳහාSPDX බලපත්‍ර අවසර ලැයිස්තුව                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ඔව්                                    |
| `check:tracked-artifacts`         | ගොඩනැංවීමේ කෞතුක වස්තු / කැපවූ `node_modules` symlinks නැත (husky pre-commit තුළ ද ධාවනය වේ; පෙර තල්ලු කිරීම හිතාමතාම සැහැල්ලු — #6716 වේ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ඔව්                                    |
| `check:ai-attribution`            | PR කැපවීම්වල AI/bot `Co-Authored-By` ට්‍රේලරයක් හෝ AI-පරම්පරාවේ පාදකයක් නොමැත, මාතෘකාව හෝ ශරීර — දෘඪ රීතිය #16 ( PR→ `release/**` — සඳහා `quality.yml` fast-gates loop හි සිදුවීම් ගෙවීම කියවන, `ci.yml` -op off PRs — `main` PR→ `commit-msg` හක්ක #14436                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:vitest-exclusions`         | සෑම Vitest බැහැර කිරීමක් ලුහුබැඳීමේ ගැටලුවක් නම් කරන අතර `config/quality/vitest-exclusions.json` (#13204) හි දිස් වේ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ඔව්                                    |
| `check:file-size`                 | මූලාශ්‍ර ගොනු (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) `cap` තුළ පවතින අතර ගොනු (`*.test.ts(x)`) `testCap` තුළ පරීක්ෂා කරන්න; `file-size-baseline.json` (`frozen` / `testFrozen`) හි ශීත කළ ගොනු ඒවායේ වාර්තාගත ප්‍රමාණය ඉක්මවා වර්ධනය නොවිය යුතුය.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ඔව්                                    |
| `check:error-helper`              | executors/handlers හි දෝෂ ප්‍රතිචාර `buildErrorBody()` / `sanitizeErrorMessage()` භාවිතා කරයි (දෘඩ රීතිය #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ඔව්                                    |
| `check:migration-numbering`       | සංක්‍රමණ ගොනු නාම: පැරණි `001`–`241` ශ්‍රේණිය ශීත කළ අතර නව ගොනු `YYYYMMDDHHMMSS_<description>.sql` වේ. PR පදනමට එරෙහිව එය ඉවත් කරන ලද සංක්‍රමණයක්, ගැළපුම් ප්‍රවේශයක් නොමැතිව නැවත නම් කරන ලද එකක් සහ අවසාන ක්‍රමානුකුලව ගමන් නොකරන පිළිවෙලින් බැහැර හෝ සංස්කරණය කළ එකක් ප්‍රතික්ෂේප කරයි.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:public-creds`              | `publicCreds.ts` පිටත වචනාර්ථයෙන් OAuth `client_id`/`client_secret` හෝ Firebase Web යතුරු නැත (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ඔව්                                    |
| `check:db-rules`                  | `src/lib/db/` මොඩියුලවලින් පිටත අමු SQL නැත; `localDb.ts` වෙතින් බැරල්-ආනයන නැත (දැඩි නීති #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ඔව්                                    |
| `check:known-symbols`             | සපයන්නන් ක්‍රියාත්මක කරන්නන්, මාර්ගගත කිරීමේ ක්‍රමෝපායන් සහ පරිවර්තකයින් ඔවුන්ගේ යැවීමේ වගු වල ලියාපදිංචි වී ඇති — තැටියේ ඇති ලිපිගොනු වලට අනාථ හෝ ප්‍රකාශ නොකළ සංකේත ගැලපේ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ඔව්                                    |
| `check:route-guard-membership`    | ළමා ක්‍රියාවලියක් ඇති කරන සෑම මාර්ගයක්ම `isLocalOnlyPath()` (දෘඪ රීති #15/#17) මගින් වර්ග කෙරේ.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ඔව්                                    |
| `check:test-discovery`            | Repo හි ඇති සෑම `*.test.ts` / `*.spec.ts` ගොනුවක්ම අවම වශයෙන් එක් ටෙස්ට් ධාවකයෙකු විසින් එකතු කරනු ලැබේ (රැට්චෙට්: `test-discovery-baseline.json` හි අනාථ ලැයිස්තුව හැකිලීම පමණි)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ඔව්                                    |
| `check:test-tla-order`            | `tests/unit` යටතේ ඇති කිසිදු `node:test` ගොනුවක් පරීක්‍ෂණයක් ලියාපදිංචි නොකරයි, ඉහළ මට්ටමේ `await` වෙත පහර දෙයි, පසුව තවත් ලියාපදිංචි වේ (#18045; ratchet: `test-tla-order-allowlist.json` හැකිලීම පමණි)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ඔව්                                    |
| `check:agent-skills-sync`         | උත්පාදනය කරන ලද නියෝජිත කුසලතා කෞතුක වස්තු ඒවායේ මූලාශ්‍ර නාමාවලියට ගැලපේ (ප්ලාවිතය නැත). මුදා හැරීමේ මාදිලිය සෑම කුසලතාවයක්ම පරීක්ෂා කරයි; විශේෂාංගයක් PR (`pr` මාදිලිය) පරීක්ෂා කරන්නේ එය — සංස්කරණය කරන උත්පාදනය කරන ලද පෙළෙහි කුසලතා පමණක් [උත්පාදනය කරන ලද ගොනු සහ ව්‍යුත්පන්න පාදක](#generated-files-and-derived-baselines-written-at-release) බලන්න                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:provider-asset-provenance` | සපයන්නා logos/assets වාර්තාගත මූලාරම්භයක් දරයි                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `lint:json`                       | JSON config ගොනු විග්‍රහ කර repo lint රීති තෘප්තිමත් කරයි                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `typecheck:core`                  | දෝෂයකින් තොරව TypeScript සම්පාදනය (උපදේශන අනතුරු ඇඟවීම් පමණි)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ඔව්                                    |
| `typecheck:noimplicit:core`       | දැඩි `noImplicitAny` — ඉදිරි දැක්ම; බොහෝ පෙර පැවති ඇමතුම් අඩවි වලට තවමත් අනුසටහන් අවශ්‍ය වේ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **උපදේශන** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` විෂය පථය `src/app/(dashboard)/**` (#7033) — `typecheck:core` හි සංක්ෂිප්ත ගොනු 27 අවසර ලැයිස්තුවේ කිසිදු උපකරණ පුවරුවක් TSX ඇතුළත් නොවේ, සහ `next build` කිසි විටෙක එය ටයිප්-පරීක්ෂා නොකරයි (`next.config.mjs` සකසයි `ignoreBuildErrors: true`), එබැවින් අනාථ-හඳුනාගැනීමේ ප්‍රතික්‍ෂේපයන් එහි විය (#6625.#6909CI ශීත කළ per-file/per-TS-code ගණන් කිරීමේ මූලික රේඛාවට එරෙහිව ඇති වෙනස්කම් (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` වැනි පරණ-බලාත්මක කිරීමේ රටාව) NEW — පමණක් ගේට්ටුව අසාර්ථක වේ; කලින් පැවති දෝෂයක් නිවැරදි කළ විට `--update` සමඟ ratchet down කරන්න.                                                                                                                                                                                                                                                                                                                                                            | ඔව්                                    |
| `check:build-typecheck`           | `tsconfig.build.json` හරහා සම්පූර්ණ යෙදුම් නිෂ්පාදන වර්ගය පරීක්ෂා කිරීම (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), මතුපිට `typecheck:core` හි 27-ගොනු අවසර ලැයිස්තුව සහ උපකරණ පුවරු ගේට්ටුව ආවරණය නොවේ. `config/quality/build-typecheck-baseline.json` වලට එරෙහිව වෙනස්කම්; නව හෝ ඉහළ නැංවූ එක්-(ගොනුව, කේතය) ගණන අසමත් වේ, අඩු සංඛ්‍යාවක් ඔබෙන් රැට්චෙට් කිරීමට අසයි. `--update` ප්‍රතික්‍ෂේප කරයි, ධාවනයේ `--force-regressions` සමත් වුවහොත් මිස නව හෝ උස් වූ යුගලයක් අඩංගු වන අතර, `--force-nocheck` සම්මත නොකළහොත් අලුතින් නිශ්ශබ්ද කරන ලද ගොනුවක් ප්‍රතික්ෂේප කරයි, එබැවින් හරිත වර්ණ ලබා ගැනීම සඳහා මූලික රේඛාව පුළුල් කිරීම සහ ස්ථිර නිශ්ශබ්දතාවයක් ලබා දීම වෙනම හිතාමතා ක්‍රියා දෙකකි. හිස් `--force` ප්‍රතික්ෂේප වේ. `config/quality/ts-nocheck-baseline.json` එරෙහිව `@ts-nocheck` සඳහා ගොඩනැගීමේ විෂය පථය පරිලෝකනය කරයි, මන්ද එය භාවිතා කරන ගොනුවක් කිසිදු රෝග විනිශ්චයක් වාර්තා නොකරන අතර එසේ නොමැතිනම් සෑම ගේට්ටුවකටම නොපෙනේ. | ඔව්                                    |

#### ටයිප් චෙක් වැඩසටහන් දෙකක් වෙනස් ලෙස පිළිතුරු දෙයි

`typecheck:core` සහ `check:build-typecheck` විවිධ විකල්ප යටතේ විවිධ වැඩසටහන් සම්පාදනය කරන අතර එකම ගොනුව එකක පිරිසිදු විය හැකි අතර අනෙකෙහි දෝෂ වලින් පිරී ඇත.

`tsconfig.build.json` `"strict": false` සකසයි, එබැවින් `noImplicitAny` අක්‍රියයි. මූලික වින්‍යාසය දැඩි විකල්ප සමඟ සංක්‍ෂිප්ත ගොනු 27 අවසර ලැයිස්තුවක් සම්පාදනය කරන අතර එක් එක් ප්‍රවේශයේ ආයාත ප්‍රස්ථාරය අනුගමනය කරයි, එබැවින් ගොඩනැගීමේ වැඩසටහනේ කිසිදා නොපෙන්වන ගොනු තවමත් එහි පරීක්ෂා කෙරේ.

ගොනුවක් ටයිප් කර ඇත්ද යන්න විනිශ්චය කිරීමේදී ප්‍රතිවිපාකය වැදගත් වේ:** `check:build-typecheck` යටතේ zero diagnostics යන්නෙන් අදහස් වන්නේ ශුන්‍ය නොවේ** . ගොනු 26 කින් `@ts-nocheck` ඉවත් කිරීමෙන් ඒවායින් 23 ක් ගොඩනැගීමේ වැඩසටහනේ පිරිසිදු බව පෙන්නුම් කරයි; ඒවායින් 16ක් 120ක් පමණ මතු විය - දැඩි දෝෂයේ කිසියම් දෝෂයක් තිබේ. ගොනුවක් පිරිසිදු කිරීමට පෙර දෙකම පරීක්ෂා කරන්න.

### රැකියාව: `quality-gate`

`test-coverage` පසු ධාවනය වේ. අසාර්ථක වූ විට අවහිර කිරීම් ඒකාබද්ධ වේ.

| පිටපත                        | වලංගු කරයි                                                                                                                                                        | අවහිර කිරීම         |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `quality:collect`            | `quality-metrics.json` විමෝචනය කරයි (ESLint අනතුරු ඇඟවීමේ ගණන, ඒකාබද්ධ කළ ෂාර්ඩ් වාර්තාවෙන් ආවරණය)                                                                | ඔව් (රැට්චෙට් ඉහළට) |
| `quality:ratchet`            | `quality-baseline.json` හි සෑම මෙට්‍රික් එකක්ම ප්‍රතිගාමී වී නොමැත (ESLint අනතුරු ඇඟවීම් ≤ මූලික රේඛාව; ආවරණය ≥ මූලික රේඛාව)                                      | ඔව්                 |
| `check:duplication`          | කේත අනුපිටපත් කිරීම (jscpd@4) `quality-baseline.json` හි මූලික රේඛාව නොඉක්මවයි                                                                                    | ඔව්                 |
| `check:complexity`           | ගොනු මට්ටමේ චක්‍රීය සංකීර්ණත්වය සීමාව ඉක්මවා නොයයි (core ESLint `complexity` + `max-lines-per-function`)                                                          | ඔව්                 |
| `check:cognitive-complexity` | සංජානන සංකීර්ණතා ratchet (`eslint-plugin-sonarjs`) — වෙනම ESLint සමත්; CI දෙකම එක `check:complexity-ratchets` පියවර ලෙස ඒකාබද්ධ කර ධාවනය කරයි                     | ඔව්                 |
| `check:dead-code`            | භාවිතයට නොගත් නිර්යාත / ගොනු රැට්චෙට් (knip) මූලික මට්ටමට එරෙහිව ප්‍රතිගාමී නොවේ                                                                                  | ඔව්                 |
| `check:compression-budget`   | සම්පීඩන මිණුම් ලකුණ අයවැය — එක් එන්ජිමක් ටෝකන-ඉතුරුම් තට්ටු ප්‍රතිගාමී නොවිය යුතුය                                                                                | ඔව්                 |
| `check:type-coverage`        | ප්‍රතිශත-ටයිප් කළ රැට්චෙට් (`type-coverage`) ප්‍රතිගාමී නොවේ; බොහෝ දුරට `typecheck:noimplicit:core` යටපත් කරයි                                                    | ඔව්                 |
| `check:codeql-ratchet`       | විවෘත CodeQL ඇඟවීම් ගණන ප්‍රතික්‍ෂේප නොවේ ( `gh api` හරහා කියවයි; මනරම්-ටෝකනයකින් තොරව මඟ හරින්න) — refresh cadence සහ manual trigger: පහත "CodeQL ratchet" බලන්න | ඔව්                 |
| `check:type-scale-ratchet`   | කට්ටල වර්ගයේ පරිමාණය: 12 px ට අඩු ප්‍රමාණයන් සහ `src/` හි `font-bold` පමණක් පහළට යයි (`typeScaleSubFloorSizes`, `typeScaleFontBold`); පූර්ව කැපවීමේ කොක්කෙහි ද    | ඔව්                 |

### රැකියාව: `quality-extended`

රැකියා මට්ටමේ `continue-on-error` නොමැතිව මිශ්‍ර රැකියාව: `--ratchet` පසු කරන පියවරක් මනින ලද ප්‍රතිගාමීත්වය එදිරිව `quality-baseline.json` මත කාර්යය අසාර්ථක වේ. `check:circular-deps` සහ ස්කෑනර් ස්ථාපන පියවර පමණක් උපදේශාත්මක වේ (පියවර මට්ටමේ `continue-on-error: true`). බාහිර ස්කෑනර් `gh release download` හරහා ස්ථාපනය කරයි; gitleaks නොමැති විට `check:secrets` self-skips (පිටවීම 0), `check:vuln-ratchet`, `check:workflows` සහ `check:openapi-breaking` අසාර්ථක වන විට ඒවායේ මිනුම් නොමැති විට වසා ඇත.

| පිටපත                    | වලංගු කරයි                                                                                                                                                                                                                   | අවහිර කිරීම                                                 |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `check:circular-deps`    | වෘත්තාකාර පරායත්තතා නොමැත (dpdm)                                                                                                                                                                                             | **උපදේශන**                                                  |
| `check:bundle-size`      | බණ්ඩල් ප්රමාණය තොප්පිය ඉක්මවා නැත; මැනිය නොහැකි ප්රමාණය ද අසාර්ථක වේ                                                                                                                                                         | **--ratchet සමඟ අවහිර කිරීම**                               |
| `check:secrets`          | ද්විමය නොමැති නම් රහස් පරිලෝකනය (gitleaks) — මඟ හැරේ                                                                                                                                                                         | **--ratchet සමඟ අවහිර කිරීම**                               |
| `check:vuln-ratchet`     | යැපුම් දුර්වලතා (osv-scanner) ප්‍රතික්‍ෂේප නොකරන්න — `--ratchet` INCOMPLETE ලෙස අසමත් වේ (පිටවීම 2) මැනිය නොහැකි නම්                                                                                                         | **--ratchet සමඟ අවහිර කිරීම**                               |
| `check:workflows`        | වැඩ ප්‍රවාහ ලින්ට් (actionlint + zizmor); missing/broken ස්කෑනර්, වලංගු නොවන වාර්තා හෝ අතුරුදහන් වූ රැට්චෙට් මූලික රේඛාව INCOMPLETE ලෙස අසමත් වේ. වලංගු සොයාගැනීම් තෝරාගත් strict/advisory/ratchet ප්‍රතිපත්තිය අනුගමනය කරයි | ක්රියාත්මක කිරීම අවශ්ය වේ; CI හි zizmor ratchet අවහිර කිරීම |
| `check:openapi-breaking` | Pinned event commits (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent) එරෙහිව පොදු API ගිවිසුම; අවශ්ය මිනුම් අසාර්ථකයි වසා ඇත                                                           | **--ratchet සමඟ අවහිර කිරීම**                               |

### රැකියාව: `docs-sync-strict`

සෑම PR සිට `main` දක්වා ධාවනය වේ. අසාර්ථක වූ විට අවහිර කිරීම් ඒකාබද්ධ වේ.

| පිටපත                          | වලංගු කරයි                                                                                                                                   | අවහිර කිරීම                  |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `check:docs-all`               | පහත උප දොරටු 6 අනුක්‍රමිකව ධාවනය කරන මෙටා-ගේට්ටුව                                                                                            | ඔව්                          |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI අනුවාද අනුකූලතාව; මුදා හැරීමේ මාදිලිය 66 `llm.txt` දර්පණ සහ පරිවර්තිත CHANGELOG කොටස් ද (PR මාදිලිය: දර්පණ එකඟ වේ)       | ඔව්                          |
| ↳ `check:docs-counts`          | ගද්‍යයේ ගණන් (සැපයුම්කරු ගණන, සංක්‍රමණ ගණන, ආදිය). මාතයන් දෙකක්: විශේෂාංගය මත `pr` PRs, `release` වෙනත් තැනක — පහත "ව්‍යුත්පන්න අගයන්" බලන්න | ඔව්                          |
| ↳ `check:env-doc-sync`         | `.env.example` හි සෑම env var එකක්ම docs වගුවක ලේඛනගත කර ඇත, සහ අනෙක් අතට                                                                    | ඔව්                          |
| ↳ `check:deprecated-versions`  | docs තුළ අත් හරින ලද අනුවාද තන්තු නැත                                                                                                        | ඔව්                          |
| ↳ `check:doc-links`            | ලේඛනවල අභ්‍යන්තර සලකුණු සබැඳි සැබෑ ගොනු වෙත විසඳයි (`[text]`/`(path)` ආකෘතිය)                                                                | ඔව්                          |
| ↳ `check:fabricated-docs`      | ලේඛනවල දක්වා ඇති මාර්ග, env vars, CLI විධාන, හක්ක නම් සහ ගොනු මාර්ග කේත පදනමේ පවතී. `--strict` හරහා දෘඪ ගේට්ටුව; ධජය නොමැතිව soft-fail.      | ඔව් ( CI හි `--strict` හරහා) |
| `check:cli-i18n`               | CLI `t()` යතුරු `bin/cli/locales/en.json` හි පවතී (මාදි දෙකම); pt-BR / zh-CN / zh-TW සමානාත්මතාවය `en.json` සමඟ මුදා හැරීමේ මාදිලියේ පමණි    | ඔව්                          |
| `check:openapi-coverage`       | OpenAPI spec අවම වශයෙන් සැබෑ මාර්ගවල ratcheted තට්ටුවක් ආවරණය කරයි                                                                           | ඔව්                          |
| `check:openapi-security-tiers` | `openapi.yaml` හි ආරක්ෂක ස්ථර විවරණ `routeGuard.ts` වර්ගීකරණයන්ට අනුකූල වේ                                                                   | **උපදේශන**                   |
| `check:openapi-routes`         | `openapi.yaml` හි සෑම මාර්ගයක්ම සැබෑ `route.ts` (ප්‍රති-මායාව) වෙත නිරාකරණය වේ.                                                              | ඔව්                          |
| `check:docs-symbols`           | `docs/**/*.md` හි සෑම `/api/...` සඳහනක්ම සැබෑ `route.ts` (ප්‍රති-මායාව) වෙත නිරාකරණය වේ.                                                     | ඔව්                          |
| `i18n translation drift`       | `docs/i18n/**` දර්පණ එදිරිව `.i18n-state.json` — උපදේශනය PRs (පරිවර්තන තරංගයෙන් දර්පණ ප්‍රබෝධමත් වේ), තල්ලු කිරීම සහ රාත්‍රී කාලයේ දැඩි      | **උපදේශන** PRs මත            |

#### පරිවර්තන දර්පණ ව්‍යුත්පන්න ගොනු වේ (PR මාදිලිය එදිරිව මුදා හැරීමේ මාදිලිය)

විශේෂාංගයක් PR සංස්කරණය කරන්නේ ඉංග්‍රීසි මූලාශ්‍ර පමණි. `docs/i18n/<locale>/**` දර්පණ (66 `llm.txt` පිටපත් සහ පරිවර්තනය කරන ලද `CHANGELOG.md` ගොනු ඇතුළුව) සහ `.i18n-state.json` පරිවර්තන තරංගය (`docs/i18n-*` / `chore/i18n-*` ශාඛා, නියමිත `i18n-mirror-refresh.yml`) සහ නිකුතුව (`npm run release:sync-changelog-i18n`) මගින් එක් පියවරකින් නැවත ලියා ඇත. එබැවින් දර්පණ දොරටු ක්‍රම දෙකකින් ක්‍රියාත්මක වේ, එය `scripts/check/lib/gateMode.mjs` මගින් විසඳනු ලැබේ (`--mode=pr|release`, පසුව `OMNIROUTE_GATE_MODE`, පසුව ක්‍රියා සිදුවීම; දේශීය ධාවනයක් `release` වේ):

- `check:docs-sync` — release mode runs every check. PR mode keeps the package.json/OpenAPI version, the root CHANGELOG headings and the superseded-docs guard, and prints `SKIP reason=pr-mode` for the `llm.txt` mirror copies and the translated CHANGELOG sections — unless the PR writes mirrors: a head branch declared as a writer of the `docs/i18n/**` family in `config/quality/derived-paths/*.json` runs both checks strictly, and, when the diff base resolves, a change whose own diff edits `docs/i18n/<locale>/llm.txt` or `CHANGELOG.md` runs that check strictly. The diff base does not resolve in a depth-1 checkout (the `docs-sync-strict` job), so PR mode also runs one check that needs no base: every `llm.txt` mirror must exist, keep its `---` separator and carry either the root body or the body most mirrors share. A base that moved leaves all mirrors equally stale and passes; a hand edit to one mirror fails. The translated `CHANGELOG.md` files have no such check in a depth-1 PR checkout.

- පූර්ව වගකීම් හක්ක `check-docs-sync.mjs --mode=pr` ධාවනය කරයි : කැපවීමක් එය කරන දේ මත විනිශ්චය කරනු ලැබේ. ධජය නොමැතිව දේශීය ධාවනයක් මුදා හැරීමේ මාදිලියක් වන අතර, මූල `llm.txt` සංස්කරණය කරන එක් ඒකාබද්ධ PR තරංගය ධාවනය වන තෙක් එම පදනමේ පසුව කරන සෑම කැපවීමක්ම අවහිර කරයි. හස්කි කොක්කක් ධාවනය වන ඕනෑම මාදිලිය-දැනුවත් ගේට්ටුවක් සඳහා එකම රීතිය පවතී: කොක්ක `--mode=pr` පසු කරයි, සහ දැඩි තීන්දුව මුදා හැරීමේ මාදිලියේ ධාවනය සමඟ පවතී (නිදහස් PR, `main` වෙත තල්ලු කරයි, සරල දේශීය ධාවනයකි).
- දර්පණ-අන්තර්ගත ඒකක පරීක්ෂණ (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`, `resilience-pre-dispatch-docs-mirrors`, `cli-env-quality-docs-mirrors`, `docs/*-locales`) — මුදා හැරීමේ මාදිලිය සෑම පෙදෙසක්ම තහවුරු කරයි. PR මාදිලිය `.i18n-state.json` (සම්පූර්ණ-ගොනු හෑෂ්, හෝ කොටසේ පටිගත කරන ලද කොටස් හෑෂ් පරීක්ෂණ පින්) අනුව ඉංග්‍රීසි මූලාශ්‍රය සමඟ පවතින දර්පණ පමණක් ප්‍රකාශ කරන අතර පරණ ඒවා හේතුවක් ඇතිව මඟ හරියි. `target_hash` ප්‍රොවෙන්න්ස් චෙක්පත් සෑම පෙදෙසක් සඳහාම ක්‍රම දෙකෙන්ම ක්‍රියාත්මක වේ. නැවුම්බව `## ` කොටසකට, ඒකකය `run-translation.mjs` හෑෂ්; දිගු කොටසක් (මෙම ගොනුවේ ද්වාර ඉන්වෙන්ටරිය එයින් අඩක් පමණ වේ) යන්නෙන් අදහස් වන්නේ එහි ඇති ඕනෑම සංස්කරණයක් එම දර්පණ යල් පැන ගිය අතර, ඔවුන්ගේ PR මාදිලියේ ප්‍රකාශයන් ඊළඟ තරංගය දක්වා මඟ හැරේ. ඉංග්‍රීසි මූලාශ්‍රයේ තවදුරටත් අඩංගු නොවන නැංගුරමක් සම්පූර්ණ ගොනු සංසන්දනය වෙත ආපසු වැටේ.
- PRs මත `i18n translation drift` — උපදේශනය , තල්ලු කිරීම මත දැඩි, රාත්‍රී සහ මුදා හැරීම කැපීම, එබැවින් පරණ දර්පණයකට නිකුතුවක් තුළ නැව්ගත කළ නොහැක.

`scripts/i18n/sync-llm-mirrors.mjs` ( `syncLlmMirrors()` ලෙසද අපනයනය කරයි, `--dry-run` සමඟ) `llm.txt` දර්පණ නැවත ලියයි; මුදා හැරීම නැවුම් කිරීම, පරිවර්තන තරංගය සහ නියමිත `i18n-mirror-refresh.yml` එය ක්‍රියාත්මක කරයි (ප්‍රවාහය මඟින් පරණ `llm.txt` දර්පණ වියළි ධාවනයකින් හඳුනා ගනී, මන්ද ප්ලාවිත වාර්තාව ඒවා ලැයිස්තුගත නොකරන අතර `check:docs-all` ට පෙර සමමුහුර්ත කරයි).

`docs/diagrams/` යටතේ ඇති README SVGs දොළහ ජනනය වේ (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` ඒවා සියල්ල නැවත උත්පාදනය කරයි). සෑම එකකටම බයිට් සංසන්දනය කිරීමේ ඒකක පරීක්ෂණයක් ඇත (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) එය කැපවූ ගොනුව මුදා හැරීමේ මාදිලියේ පරණ වූ විට අසමත් වේ; PR හි, `check:generated-artifacts` විසින් SVG විනිශ්චය කරයි, PR සංස්කරණය කරන අතර පාදයේ ප්ලාවිතය මුදා හැරීමේ නැවුම් කිරීමට ඉතිරි වේ ( [උත්පාදනය කරන ලද ගොනු සහ ව්‍යුත්පන්න මූලික රේඛා](#generated-files-and-derived-baselines-written-at-release) බලන්න) — සහ `check:docs-counts` ඔවුන්ගේ `<text>` නෝඩ් වලින් කැනොනිකල් සංඛ්‍යා — කියවයි, එම නිසා ලුහුඬු සටහන් කරන ලද සෑම පියවරක්ම ගොනුව තුළ `<text>` වේ. SVG කැනොනිකල්-සංඛ්‍යා චෙක්පත `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) හි ලැයිස්තුගත කර ඇති ගොනු කියවයි: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` සහ `tier-flow-light.svg`; free-forever, catalog-entry, recurring-pool සහ ලකුණු කිරීමේ සාධක හිමිකම් ද `promise-pillars.svg`, `free-tier-budget.svg` සහ `strategies-grid.svg` කියවනු ලැබේ. මෙම උත්පාදක යන්ත්‍ර අඳින ගණන් (සැපයුම්කරුගේ මුළු, MCP මෙවලම්, මාර්ගගත කිරීමේ උපාය මාර්ග, නොමිලේ-සදහටම සපයන්නන්, ...) `scripts/docs/readmeFacts.mjs` හරහා `docs/reference/derived-facts.json` snapshot වලින් පැමිණේ, වචන වලින් නොවේ, එබැවින් ඕනෑම ශාඛාවක රූප සටහනක් ප්‍රතිනිර්මාණය කිරීම කැප වූ ගොනුව ප්‍රතිනිෂ්පාදනය කරයි. `free-tier-budget.svg` එහි පේළි අඳින්නේ එකම ස්නැප්ෂොට් එකෙන් (`code.freeTierBudget`, නාමාවලිය කරුණු විමර්ශන වාර්තා සාරාංශ කරයි), එබැවින් `FREE_MODEL_BUDGETS` වෙත වෙනස් කිරීමක් CI රතු පැහැයට හැරවීම වෙනුවට ඊළඟ නැවුම් කිරීමේදී කාඩ්පතට ළඟා වේ.

### ව්‍යුත්පන්න අගයන්: `pr` සහ `release` ද්වාර මාතයන්

විශේෂාංගයක් PR කිසිවිටක එහි පාදයේ තත්ත්වය මත රඳා පවතින අගයක් ලියන්නේ නැත: සපයන්නා, සංක්‍රමණය, MCP-මෙවලම් සහ උපාය මාර්ග ගණන්, README SVG අංක, කරුණු සැණ රුව. එක් පියවරක් ඒවා සියල්ල නැවත ගණනය කරයි, `npm run release:refresh-derived`, නිකුත් කිරීම සහ රාත්‍රී ව්‍යුත්පන්න-refresh PR මගින් ධාවනය වේ. ඉතින්** මුදා හැරීම් අතර පදනම නිර්මාණය අනුව සජීවී කේතය පිටුපස ඇත** , සහ සජීවී කේතය සමඟ ගස සංසන්දනය කළ ගේට්ටුවක් හෝ පරීක්ෂණයක් සහෝදරයෙකු සැපයුම්කරුවෙකු එක් කළ පසු සෑම PR මත රතු වනු ඇත. එබැවින් ව්‍යුත්පන්න අගයන් විනිශ්චය කරන ද්වාර ක්‍රම දෙකෙන් එකකින් ක්‍රියාත්මක වේ, `scripts/check/lib/gateMode.mjs` මගින් විසඳනු ලැබේ (පළමු තරගයේ ජයග්‍රහණ):

1. විධාන රේඛාවේ`--mode=pr|release` ;
2. `OMNIROUTE_GATE_MODE` පරිසර විචල්‍යය (`pr` හෝ `release`);
3. ස්වයංක්‍රීය, GitHub ක්‍රියා ඉසව්වෙන්: හිස `release/v*` නොවන `pull_request`, `merge_group` හෝ `omni-queue/**` → `pr` වෙත තල්ලු කිරීම; අනෙක් සියල්ල (තල්ලු කිරීම, කාලසටහන, යැවීම, මුදා හැරීම PR `release/v* → main`, ඕනෑම දේශීය ධාවනය) → `release`.

එක් එක් මාදිලියේ `check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) අසමත් වන්නේ කුමක්ද:

| මාදිලිය   | අසාර්ථකයි                                                                                                                                                                                                                                                                                                                                                                                                                 | සජීවී කරුණු අවශ්‍යයි |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `release` | සෑම චෙක්පතක්ම, ගසෙන් එකතු කරන ලද කරුණු වලට එරෙහිව දැඩි සමානාත්මතාවය (ගේට්ටුව සැමවිටම පැවති හැසිරීම): පරණ ගණන් කිරීම, අනුවාදය, ආවරණ තට්ටුව හෝ SVG අංකය STRICT ප්ලාවිතය වේ                                                                                                                                                                                                                                                  | ඔව්                  |
| `pr`      | එකම හිමිකම් නිස්සාරක සහිත PR පදනමට එරෙහිව වෙනස් වූ වෙනස සිදු කළ දේ පමණි: (1) එම චෙක්පත සහ ගොනුව සඳහා පාදකයේ නොතිබූ කළමනාකරණය කළ අගයක් ("PR සංස්කරණය කළ කළමනාකරණය කළ අංකයක් — රේඛාව පාදක පෙළට ප්‍රතිසාධනය කරයි"); (2) අත්‍යවශ්‍ය හිමිකම් පෑමක් ගෙන යන ලද පදනම සහ හිස නැති විය. කිසිදු කරුණක් අවශ්‍ය නොවන අන්තර්ගත විචල්‍යයන් මුදා හැරීමේ ආකාරයෙන් ක්‍රියාත්මක වේ; මුදා හැරීමට පමණක් වන චෙක්පත් ලැයිස්තුගත කර මඟ හරිනු ලැබේ | නැත                  |

නියෝජිත උපදෙස් ගොනු රැගෙන යයි** නැත** ව්‍යුත්පන්න ගණන මුළුමනින්ම: `AGENTS.md`, `llm.txt` (සහ එහි `docs/i18n/*/llm.txt` පිටපත්), bs `AGENTS.md` fork, `open-sse/services/AGENTS.md`, `src/shared/constants/agentSkills.ts`, `skills/README.md` සහ සෑම `skills/*/SKILL.md` ලක්ෂ්‍යයක්ම ප්‍රභවයට (උදාහරණයක් ලෙස `src/shared/constants/routingStrategies.ts` හි `ROUTING_STRATEGY_VALUES` ) සහ ඒ වෙනුවට `npm run facts` වෙත. වෙනස් නොවන "ව්‍යුත්පන්න ගණන් නොමැත (නියෝජිත-උපදෙස් ගොනුව ...)" එහි ගණන් කිරීම අසාර්ථක වේ (සැපයුම්කරුවන්, සංක්‍රමණයන්, MCP මෙවලම් සහ විෂය පථයන්, මාර්ගගත කිරීමේ උපාය මාර්ග, ලකුණු කිරීමේ සාධක, මාදිලි ඇසුරුම්), එබැවින් නිකුතු නැවුම් කිරීම කිසි විටෙක උපදෙස් ගොනුවක් නැවත ලිවිය යුතු නොවේ.

`pr` ප්‍රකාරයේදී ලේඛක ශාඛාවලට කළමනා කළ අගයන් සංස්කරණය කළ හැක: `chore/derived-*` (රාත්‍රී නැවුම් කිරීම PR), `release/v*`, සහ පරිවර්තන තරංග `docs/i18n-*` සහ `chore/i18n-*` (`scripts/check/lib/derivedClaimsDiff.mjs`). පෝලිම් කාණ්ඩ (`merge_group`, Mergify drafts, `omni-queue/**`) නැවත විනිශ්චය නොකෙරේ: ඒවා දැනටමත් එකින් එක විනිශ්චය කර ඇති ගේට්ටුව PRs එකතු කරයි.

පිටවීමේ කේත: `0` clean · `1` STRICT ප්ලාවිතය (හෝ `--strict` සමඟ මෘදු ප්ලාවිතය ) හෝ කළමනාකරණය කළ අගය උල්ලංඝනය කිරීම · `2` යටිතල පහසුකම් — කේත කරුණු රැස් කළ නොහැකි විය (tsx පරීක්ෂණය අසාර්ථක වී හෝ කල් ඉකුත් වී ඇත; කල් ඉකුත්වීම `OMNIROUTE_FACTS_TIMEOUT_MS`, CI 0, පෙරනිමිය 00 PR diff පදනම විසඳිය නොහැක. පිටවීම 2 කිසි විටෙක ලේඛන අපසරනය නොවේ: කාර්යය නැවත ධාවනය කිරීම හෝ පරිසරය නිවැරදි කිරීම.

එක් එක් මාදිලිය ක්‍රියාත්මක වන තැන:

| කොහෙද                                                                                                            | මාදිලිය                                                                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| විශේෂාංගය PR — `ci.yml` job `docs-sync-strict`, `quality.yml` පියවර "Docs නිරවද්‍යතාවය"                          | `pr` (ස්වයංක්රීය); කාර්යය `BASE_SHA` ලෙස පදනම පසුකර `fetch-depth: 2` සමඟ පරීක්ෂා කරයි                                                                                                                         |
| `merge_group`, `omni-queue/**` අපේක්ෂකයින්, ඒකාබද්ධ දුම්රියේ සම්පූර්ණ ගේට්ටු ලැයිස්තුව                           | `pr`                                                                                                                                                                                                          |
| PR (`release/v* → main`), තල්ලු කිරීම්, කාලසටහන්ගත සහ අතින් ධාවනය මුදා හරින්න                                    | `release`                                                                                                                                                                                                     |
| නිකුතුව-කොළ (`scripts/quality/validate-release-green.mjs`)                                                       | HARD අයිතම `OMNIROUTE_GATE_MODE=pr` සමඟ ධාවනය වේ ("පාදම කැඩී ගියේද?"); DRIFT අයිතමය `derived-refresh` `npm run release:refresh-derived -- --check` ධාවනය කරයි (දැඩි දසුන, කිසි විටෙකත් පාදම-රතු විවෘත නොකරයි) |
| මුදා හැරීම (`/generate-release` අදියර 0a සහ 1; නිපුණතා රැහැන්වීම වෙනම හිමිකරු විසින් අනුමත කරන ලද වෙනස් කිරීමකි) | `npm run release:refresh-derived` ව්‍යුත්පන්න ගොනු ලියයි; PR ගේම චෙක්පත් නිකුත් කර පසුව `release` ආකාරයෙන් ක්‍රියාත්මක වේ                                                                                     |
| `nightly-derived-refresh.yml` (දෛනික, ඉහළම `release/vX.Y.Z`, මුදා හැරීම-කැටි කිරීම යටතේ මඟ හැරිය)                | `npm run release:refresh-derived -- --profile=nightly`; වෙනසක් මත එය `chore/derived-refresh` සිට ONE PR විවෘතව තබයි; කිසි විටෙකත් ඒකාබද්ධ නොවේ                                                                |

එය පිටුපස ඇති විධාන:

- `npm run facts` සෑම ව්‍යුත්පන්න සංඛ්‍යාවක්ම JSON (`scripts/release/facts.mjs`) ලෙස මුද්‍රණය කරයි. `--key=code.mcpTools` එක අගයක් මුද්‍රණය කරයි, `--snapshot` සජීවී ගස වෙනුවට කැප වූ සැණ රුව කියවයි. කරුණු එකතු කළ නොහැකි වූ විට 2 පිටවන්න.
- `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) ව්‍යුත්පන්න ගොනු මෙම අනුපිළිවෙලින් එක් අවසරයකින් නැවත ගණනය කරයි ( `--only=` සඳහා පියවර id): `provider-reference` (`docs/reference/PROVIDER_REFERENCE.md`), `facts` (snapshot), `numbers` (ගණන් ද්වාරයෙහි නැවත ලිවීමේ සැලැස්ම ලේඛනවලට යොදනු ලැබේ, පසුව ඔවුන්ගේ `docs/i18n/` වෙත ගෙන යනු ලැබේ), `readme-diagrams` වෙත ගෙන යනු ලැබේ ), `skills` (ගස `SKILL.md` වන තුරු `syncE2eTimings` `en.json` `e2e-timings` `ui-keys` ඇත, සහ `--rewritten-since=<ref>` — පෙරනිමි `origin/main` — සමඟින් පසුගිය නිකුතුවේ සිට නැවත ලියූ ඉංග්‍රීසි අගයන් නැවත පෝලිම් කරයි; අගයන් එකම ධාවනයේදී පරිවර්තනය කරනු ලබන්නේ පසුපෙළ මඟින් හෝ වින්‍යාස කර ඇති යතුර මගින් පමණි Google `.env` `OMNIROUTE_TRANSLATION_*` එය කිසි විටෙකත් `__MISSING__` සලකුණු ලියන්නේ නැත: මුදා හැරීමේ පැතිකඩ අසමත් වේ, රාත්‍රියේදී යතුරු මඟ හරියි, සහ `--allow-untranslated` ඒවා හිතාමතාම ලියයි), `llm-mirrors` සහ `verify-generated` (ලිවීමකින් පසු, `check:generated-artifacts` සහ `check:agent-skills-sync` නිකුත් කළ යුතුය; `--check` හිදී මග හැරිය විට එය `--only` පිටව ගිය විට; `changelog` පියවර තේරීම වේ (`--with-changelog`, මුදා හැරීමේ පැතිකඩ පමණි). `--profile=nightly` කිසි විටෙකත් අනුවාද හිමිකම් පෑමක් ස්පර්ශ නොකරයි. `-- --check` සමඟින් එය කිසිවක් නොලියන අතර ඕනෑම ගොනුවක් වෙනස් වන විට හෝ කළමනාකරණය කළ අගයකට අතින් සංස්කරණයක් අවශ්‍ය වූ විට 1 පිටවෙයි (දෙකම ලැයිස්තුගත කිරීම); යටිතල පහසුකම් අසාර්ථක වීමක් මත 2 පිටවීම. `--json` ප්‍රතිඵලය JSON ලෙස මුද්‍රණය කරයි.
- `docs/reference/derived-facts.json` යනු අවසන් වරට භාවිතා කළ කරුණු වල සැණෙපොට් එකයි. එය ලියන්නේ නැවුම් කිරීම පමණි. README SVG උත්පාදක යන්ත්‍ර එය කියවන අතර, PR-කාල ඒකක පරීක්ෂණ මගින් කැප වූ ලේඛන සහ ජනනය කරන ලද ගොනු — සමඟ සජීවී කේතය සමඟ සසඳන්නේ නැත. කට්ටලයේ තනි සජීවී සංසන්දනය වන්නේ `tests/unit/check-docs-counts-sync.test.ts` හි "නිදහස් නැවුම් කිරීම චක්‍රය වසා දමයි" : සජීවී කරුණු සමඟ, මතකයේ යෙදෙන refresh හි නැවත ලිවීමේ සැලැස්ම එය වාර්තා නොකරන STRICT ප්ලාවිතයක් ඉතිරි නොකරන අතර නැවත සැලසුම් කිරීම කිසිවක් වෙනස් නොකරයි.

දේශීයව ප්‍රතිනිෂ්පාදනය කිරීමට (දේශීය ධාවනයක් පෙරනිමියෙන් `release` වෙත ):

```bash
npm run check:docs-counts                                       # release: strict, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # what a feature PR is judged on
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # what the release would rewrite
```

විසඳිය හැකි පදනමක් නොමැතිව ( `BASE_SHA`/`BASE_REF` නැත, දේශීය `origin/release/v<version>` නැත) දේශීය `pr` ධාවනය අනතුරු ඇඟවීමක් මුද්‍රණය කර අසාර්ථක වීම වෙනුවට වෙනස මඟ හරියි.

### රැකියාව: `i18n-ui-coverage`

| පිටපත                             | වලංගු කරයි                                                                                                                                                                             | අවහිර කිරීම               |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `check-ui-keys-coverage` (පේළිගත) | UI i18n යතුරු ආවරණය ≥ 65% වේ                                                                                                                                                           | ඔව් (මාදි දෙකම)           |
| `check:ui-icu`                    | සෑම UI නාමාවලියකම සෑම පණිවිඩයක්ම `IntlMessageFormat` සමඟ සම්පාදනය වේ                                                                                                                   | ඔව් (මාදි දෙකම)           |
| `check-ui-value-drift` (පේළිගත)   | නැවත ලියූ ඉංග්‍රීසියකි** වටිනාකම** කිසිදු පරණ පරිවර්තනයක් ඉතිරි නොකරයි                                                                                                                 | ඔව් (නිදහස් මාදිලිය පමණි) |
| `check-new-key-coverage` (පේළිගත) | ඒ** අලුත්** ඉංග්‍රීසි යතුර සෑම පෙදෙසියකම පරිවර්තනය කර ඇත — a `__MISSING__:` ලකුණුකරය ප්‍රතික්ෂේප වේ                                                                                    | ඔව් (නිදහස් මාදිලිය පමණි) |
| `check-key-completeness` (පේළිගත) | සෑම UI නාමාවලියක්ම (සහ, `--catalog=cli` සමඟ සෑම CLI නාමාවලියක්ම) එහි `en.json` හි යතුරු කට්ටලය හරියටම දරයි; `pr` ප්‍රකාරයේදී, එක් එක් නාමාවලිය PR ඒකාබද්ධ පදනමේදී තමන්ටම වෙනස් විය     | ඔව් (මාදි දෙකම)           |
| `check-translation-ratio`         | එක් පෙදෙසකට තත්‍ය පරිවර්තන අනුපාතය (ඉංග්‍රීසියට සමාන / තැන් දරන්නා / අවසර ලැයිස්තුවෙන් පිටත අතුරුදහන් වූ කොළ) `config/quality/i18n-translation-baseline.json` + ස්ලැක් නොඉක්මවිය යුතුය | ඔව් (නිදහස් මාදිලිය පමණි) |

`fetch-depth: 0` — අගය-ප්ලාවිත ද්වාරය ඒකාබද්ධ පදනමට එරෙහිව `en.json` වෙනස් වේ.

**ආකාර දෙකක් (2026-11-13 සිට).** විශේෂාංගයක් PR `en.json` (සහ `bin/cli/locales/en.json`) හි යතුරු එකතු කරයි හෝ නැවත ලියයි සහ වෙනත් ස්ථාන ස්පර්ශ නොකරයි; `check:pr-derived-paths` (රැකියාව `pr-test-policy`, Family `config/quality/derived-paths/translation.json`) විශේෂාංග PR අසමත් වේ. අනෙක් පෙදෙසි නිකුතුවකට වරක් `release:refresh-derived` මගින් සම්පූර්ණ වේ, එය `scripts/i18n/sync-ui-keys.mjs` හි `syncUiKeys()` ලෙස හඳුන්වයි (අතුරුදහන් යතුරු එකතු කරන්න, වැටුණු ඒවා කප්පාදු කරන්න, නැවත ලියන ලද ඉංග්‍රීසි පරිවර්තන `rewrittenSinceRef` සමඟ ලකුණු කරන්න, පරිවර්තනය කරන්න) හෝ පරිවර්තන තරංගයකින්. දොරටු `scripts/check/lib/gateMode.mjs` වෙතින් මාදිලිය කියවයි: `pr` මාදිලියේ (විශේෂාංග PRs, `merge_group`, `omni-queue/**`) මුදා හැරීමේ මාදිලියේ දොරටු `SKIP reason=pr-mode` මුද්‍රණය කර 0 පිටවීම; `release` ප්‍රකාරයේදී ( PR මුදා හැරීම, `main`, `workflow_dispatch`, local run වෙත තල්ලු කරයි) ඒවා පෙර පරිදිම දැඩි වන අතර, PR මුදා හැරීමේදී diff-aware අයට `BASE_REF=origin/main` ලැබේ, එබැවින් ඔවුන් චක්‍රය එකතු කරන ලද හෝ නැවත ලියන ලද සෑම යතුරක්ම විනිශ්චය කරයි. විශේෂාංග-PR තීන්දුව දේශීයව `--mode=pr` සමඟින් පෙරදසුන් කරන්න.

තවමත් `pr` ප්‍රකාරයේදී ස්ථාන නාමාවලි වෙනස් කරන PR (පරිවර්තන තරංගයක්, මුදා හැරීම නැවුම් කිරීම, පරිවර්තනයට පමණක් නිවැරදි කිරීමක්) මඟ හරිනු නොලැබේ: `check-key-completeness` එය වෙනස් කරන ලද එක් එක් නාමාවලිය එකම නාමාවලියට එරෙහිව ඒකාබද්ධ කිරීමේ පදනමේදී විනිශ්චය කරයි (`scripts/i18n/lib/touched-catalogs.mjs`) සහ යතුරක් මත අසමත් වීම, නාමාවලිය නැති වී යයි, යතුරු `en.json` තවදුරටත් ඉංග්‍රීසි පරිවර්තනයක් බවට පත් නොවේ, සැබෑ පරිවර්තනයක් බවට පරිවර්තනය නොවේ `__MISSING__:` ස්පර්ශ නොකළ ඉංග්‍රීසි තන්තුවක placeholders/tags අන්තර් ඛණ්ඩනය PR. PR හි නව නාමාවලියක් මුළු `en.json` යතුරු කට්ටලයම රැගෙන යා යුතුය. එය PR ස්පර්ශ කරන නාමාවලි සඳහා, අනුපාතය සහ CLI සමානාත්මතාවයේ දොරටු දකින දේ ආවරණය කරයි.

ප්‍රාදේශීය සමානාත්මතා ඒකක පරීක්ෂණ (`cli-i18n-catalog`, `i18n-pt-br`, `i18n-vi-completeness`, `i18n-placeholder-parity`) `tests/_helpers/localeParityMode.ts` හරහා එම මාතයන් අනුගමනය කරයි: `pr` ප්‍රකාරයේදී ඔවුන් ප්‍රධාන සමානාත්මතා ප්‍රකාශයන් මඟහරින අතර ඒකාබද්ධ කිරීමේ සිට ඉංග්‍රීසියෙන් වෙනස් වූ යතුරුවල තැන් දරන්නා සමානාත්මතාවය යාවත්කාලීන කිරීමට පිටත් වේ (සෑම යතුරක්ම ඒකක පාදය කියවීමට නොහැකි වූ විට) ඒ උපකාරකයා තමයි** පමණි** අනුමත ප්‍රකාරය-කොන්දේසි සහිත මඟ හැරීම: `check:test-masking` ගණන් කරන්නේ `.skip(` සහ `{ skip: true }` නමුත් එය ආපසු ලබා දෙන ගණනය කළ `{ skip: "<reason>" }` නොවේ, එබැවින් `tests/unit/locale-parity-mode.test.ts` එය භාවිතා කිරීමට අවසර දී ඇති පරීක්ෂණ ලැයිස්තුව pins — එකක් එකතු කිරීම එම ලැයිස්තුවට සමාලෝචනය කළ සංස්කරණයකි.

#### `check-ui-value-drift` — පරණ-පරිවර්තන දොරටුව

එක් i18n ප්‍රතිගාමීත්වය අනෙක් දොරටුවලට ව්‍යුහාත්මකව නොපෙනේ: ඉංග්‍රීසි අගයක් නැවත ලියා ඇති අතර _previous_ ඉංග්‍රීසියෙන් ලබාගත් පරිවර්තන පිටුපසින් පවතිනු ඇත, එබැවින් ඉංග්‍රීසි නොවන පරිශීලකයින් විශ්වාසයෙන් වචන සහිත, දැන් වැරදි පිටපතක් කියවමින් සිටිති.

මෙය සැබෑ ලෙස නැව්ගත කරන ලදී. Antigravity login helper ගොඩ බැස්ස විට `oauthModal.googleOAuthWarning` නැවත ලියා ඇත (#5203);** ස්ථාන 43න් 39ක්** එම සැපයුම්කරුට සම්පූර්ණ කළ නොහැකි ප්‍රවාහයක් — "සම්පූර්ණ URL පිටපත් කර පහතින් අලවන්න" ලෙස ක්‍රියාකරුවන්ට කියමින් පෙළ තබා ඇත. එය #8463 තෙක් නොපෙනී ගියේ මන්ද:

- `sync-ui-keys` නැවත පිරවීමේ යතුරු පමණි** නොපැමිණීම** , කවදාවත් එහෙම නැති ඒවා** පරණයි** ;
- `check-ui-keys-coverage` යතුර _පැමිණීම_ ගණන් කරයි, එබැවින් පරණ පරිවර්තනයක් ආවරණය කර ඇති පරිදි ලකුණු කරයි;
- `check-translation-drift` `docs/i18n/<locale>/**.md` ලේඛන දර්පණ — නිරීක්ෂණය කරයි එය කිසි විටෙකත් `src/i18n/messages/*.json` කියවන්නේ නැත. එය ජොබ් `docs-sync-strict` හි ක්‍රියාත්මක වේ: PRs මත උපදේශනය, තල්ලු කිරීම සහ රාත්‍රියේදී දැඩි; පරිවර්තන තරංගය දර්පණ නැවුම් කරයි, විශේෂාංගය නොවේ PR.

**වෙනස්-දැනුවත්, මූලික පිටුබලය සහිත නොවේ.** එය වැඩ කරන ගසට එරෙහිව ඒකාබද්ධ පදනමේ `en.json` සංසන්දනය කරයි; ඉංග්‍රීසි අගය වෙනස් වූ සෑම යතුරක් සඳහාම, තවමත් ස්පර්ශ නොකළ පරිවර්තනයක් ඇති ඕනෑම පෙදෙසක් පරණ වේ. මෙය හිතාමතාම** පෙර පැවති ණය කැටි කරයි** — a diff දිගුකාලීන පරිවර්තනයක් පැමිණියේ කුමන පැරණි ඉංග්‍රීසියෙන්දැයි හෙළි කළ නොහැක, එබැවින් ගේට්ටුව විනිශ්චය කරන්නේ වත්මන් වෙනස ස්පර්ශ කරන දේ පමණි. විකල්පය (එක් ප්‍රධාන හෑෂ් බේස්ලයින් එකක්) සඳහා ~ 600 KB ජනනය කරන ලද ගොනුවක්, 3 × දැනට පවතින විශාලතම බේස්ලයින් එකක්, සෑම i18n PR මතම වැය වේ.

එය තෘප්තිමත් කිරීමට ක්රම දෙකක්:

1. බලපෑමට ලක් වූ පරිවර්තන යාවත්කාලීන කරන්න, හෝ
2. ඒවා `__MISSING__:<new english>` — ලෙස සකසන්න ධාවන කාලය පසුව නිවැරදි කරන ලද ඉංග්‍රීසි (`src/i18n/request.ts::deepMergeFallback`, #7258) සහ පරිවර්තනය සඳහා ප්‍රධාන පෝලිම් සේවය කරයි.

තන්තුව නම්** අර්ථය** වෙනස්, කැමති** යතුර නැවත නම් කිරීම** : නව යතුරකට පරණ පරිවර්තනයක් උරුම විය නොහැක. එනම් #8463 රටාවයි.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

පාදක නාමාවලිය කියවිය නොහැකි විට `SKIP reason=base-unresolved` සමඟින් 0 පිටවෙයි (පාදක ref නොමැති නොගැඹුරු ක්ලෝනය), `check-openapi-breaking` පිළිබිඹු කරයි. මුදා හැරීමේ මාදිලිය පමණි: විශේෂාංගයක් PR ඉංග්‍රීසි නැවත ලියන අතර එහි නතර වේ; නිකුතුව refresh එය අත්හැර දැමූ පරිවර්තන සලකුණු කරයි (`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`, same `findStaleTranslations`).

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

### රැකියාව: `test-vitest`

`build` පසු ධාවනය වේ. අසාර්ථක වූ විට අවහිර කිරීම් ඒකාබද්ධ වේ.

| කට්ටලය           | වලංගු කරයි                                                  | අවහිර කිරීම                                                                                                                |
| ---------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP සේවාදායකය (මෙවලම් 110), autoCombo, cache — vitest ධාවකය | ඔව්                                                                                                                        |
| `test:vitest:ui` | UI සංරචක පරීක්ෂණ — vitest ධාවකය                             | **අවහිර කිරීම** — පෙර පවතින අසාර්ථකත්වයන් `vitest.config.ts` හි පැහැදිලිවම බැහැර කර ඇත; නව අසාර්ථකත්වයන් කාර්යය අසාර්ථක වේ |

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

## වේග අදියර (2026-08-30 → v4.0 LTS): සෑම මූලික සීමාවක්ම 20% කින් ලිහිල් කර ඇත

හිමිකරුගේ තීරණය (2026-08-30): v4.0 මොඩියුලීකරණය සිදු වන තෙක්, තාක්ෂණික ණය සීමාව පවත්වාගෙන යාමට වඩා
නිකුත් කිරීමේ වේගය වැදගත් වේ. සෑම **සංඛ්යාත්මක** ratchet මූලික සීමාවක්ම විගණනය කළ හැකි එක් පියවරකින් 20% කින් ලිහිල් කර ඇති අතර, අදියර `config/quality/quality-baseline.json` තුළ ප්රකාශ කර ඇත:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| වෙනස් කළ දේ                                                                                                                                                                                      | ස්ථානය                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — අඩු වීම වඩා හොඳ ගණන් ×1.2, වැඩි වීම වඩා හොඳ ප්රතිශත ÷1.2 (coverage floor 60 එලෙසම තබා ඇත, `eslintErrors` තවමත් 0 වන අතර, `eslintWarnings` 0 → ස්ථාවර suppression ගණනෙන් 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` සටහන සෑම පෙර → පසු අගයක්ම ලැයිස්තුගත කරයි)       |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                 | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, සෑම `frozen[*]` / `testFrozen[*]` පේළි සීමාවක්ම ×1.2                                                                                                                           | `file-size-baseline.json`                                                                              |
| එක්-ගොනුවකට / එක්-TS-code එකකට ඇති ගණන් ×1.2                                                                                                                                                     | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                              | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `_policy.requireTighten === false` වන විට `--require-tighten` උපදේශාත්මක බවට පත් වේ                                                                                                              | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| රාත්රී `bank-ratchet-shrinks` විරාම කර ඇත (එය මනින ලද අඩුවීම bank කර headroom අවලංගු කරනු ඇත)                                                                                                    | `.github/workflows/nightly-release-green.yml`                                                          |

Allowlist (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **අයවැය නොවන** බැවින් ඒවාට වෙනස්කම් කර නැත. සම්මත/අසම්මත ප්රතිපත්ති දොරටු (secrets, SQL නීති,
docs/env ගිවිසුම, i18n සමාන්තරතාව, unit tests) වෙනස් කර නැත — අසමත් පරීක්ෂණයක් තවමත් අසමත් පරීක්ෂණයකි.

**මෙවලම්**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — එක් වරක් සිදු කරන
  ලිහිල් කිරීම (`scripts/quality/relax-baselines.mjs`); එකම සටහන සමඟ දෙවරක් ක්රියාත්මක වීම ප්රතික්ෂේප කරයි.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  CI සිදු කරන ආකාරයට සෑම සංඛ්යාත්මක දොරටුවක්ම මැන, එක් එක් දොරටුව සඳහා ඉතිරි headroom මුද්රණය කරයි
  (`scripts/quality/baseline-headroom.mjs`). රාත්රී `baseline-headroom` job එක workflow ක්රියාත්මක කිරීමේ සාරාංශයේ
  වගුව ප්රකාශයට පත් කරන අතර, එහි JSON/Markdown වාර්තාව `baseline-headroom-<run_id>` ලෙස upload කර
  දින 90ක් රඳවා තබයි. Warning සහ critical පේළි තම cap එකෙන් 10%ක් ඇතුළත ඇති හෝ දැනටමත් එය ඉක්මවා ඇති දොරටු හඳුනා ගනී. අයවැය වැය වෙමින් පවතින බවට පූර්ව අනතුරු ඇඟවීමක් ලෙස මෙම වාර්තා සමාලෝචනය කරන්න; ගැටලුව ඇති දොරටුවේ `_rebaseline_*` සටහන් පරීක්ෂා කරන්න. Job එක තවදුරටත් ස්ථිර issue එකක් සාදන්නේ හෝ යාවත්කාලීන කරන්නේ නැත; #12149 මඟින් පෙර වාර්තා ඉතිහාසය සුරක්ෂිත කරයි.

**නව-කේත මාදිලිය (Clean-as-You-Code) — 2026-08-30 සිට, PR fast-path සඳහා පමණි**

`pull_request` සිදුවීම්වලදී `quality.yml`, `check:file-size`,
`check:complexity-ratchets` සහ `check:dead-code` වෙත `--base-ref <PR base SHA>` ලබා දෙයි. `check:complexity-ratchets` සහ
`check:dead-code` සඳහා දොරටුව merge-base එක සමඟ HEAD සංසන්දනය කරන්නේ **PR එක වෙනස් කළ ගොනු වලට පමණක් සීමා කරමිනි**
(`scripts/check/newCodeMode.mjs`: merge-base එක තාවකාලික `git worktree` එකක materialize කර, එහි සහ HEAD මත ESLint/knip ක්රියාත්මක කර, එක්-ගොනුවකට ඇති ගණන් අතර වෙනස්කම් ගණනය කරයි):

- **blocking** — PR එක වෙනස් කළ ගොනු තුළ cyclomatic/cognitive උල්ලංඝනයන් හෝ dead exports එක් කර තිබේ
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` log එකේ දැක්වේ);
- **advisory** — ස්ථාවර මූලික අගයට සාපේක්ෂව ගෝලීය එකතුව. උරුම වූ drift එකක් නිර්දෝෂී PR එකක් කිසිවිටෙක reds නොකරයි; එම drift එක release reconciliation අවස්ථාවේදී නැවත ස්ථාවර කර headroom job එක මඟින් නිරීක්ෂණය කරයි.

`check:file-size` තමන්ගේම නියමයන්ට අනුව base ref භාවිත කරයි (`scripts/check/check-file-size.mjs`, #8522):
එය tree එකේ ඇති සෑම source සහ test ගොනුවක්ම පරීක්ෂා කර, `git show` භාවිතයෙන් PR base හි එක් එක් ගොනුවේ පේළි ගණන කියවා, ගොනුවක් අසමත් කරන්නේ එය එහි මූලික ceiling එක (`frozen` / `testFrozen`, හෝ baseline එකෙන් පිටත ගොනුවක් සඳහා `cap` / `testCap`) සහ එහි base size යන දෙකෙන් විශාල අගය ඉක්මවා වර්ධනය වූ විට පමණි. Base එකේදී දැනටමත් drift වී ඇති ගොනුවක් එබැවින් කිසිවිටෙක නිර්දෝෂී PR එකක් reds නොකරයි.

`check:boundary:ratchet` එක එහි එකම සංඛ්යාවට ද එම රීතියම යොදයි
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR සිදුවීම්වලදී
`quality.yml` fast-gates සහ `ci.yml` lint job යන දෙකම PR base SHA එක ලබා දෙයි, base commit එක
`git archive` export එකකින් මනිනු ලබයි, එසේම PR එක අසමත් වන්නේ එහි
`open-sse → src` edge count එක `metrics.boundaryOpenSseToSrc` සහ base එකේ count එක අතරින්
විශාලතම අගය ඉක්මවූ විට පමණි. ceiling එකට වඩා වැඩි base drift එක
(`base drift herdado`) ලෙස වාර්තා කරනු ලබන නමුත්, නිවැරදි PR එකක් කිසිවිටෙක අසමත් නොකරයි;
push → main අවස්ථාව නිරපේක්ෂ ceiling එකම පවත්වා ගනී, එසේම විසඳිය නොහැකි base SHA එකක්
අවවාදයක් සමඟ එම ceiling එකට fallback වේ.

Omni-queue candidate එකක් ( `omni-queue/**` වෙත push කිරීමක්, [OMNI_QUEUE.md](../ops/OMNI_QUEUE.md)
බලන්න) pull request එකකට සමානව සලකනු ලබයි: workflows දෙකම candidate base එක
(`needs.changes.outputs.candidateBase`) `--base-ref` ලෙස ලබා දෙන අතර,
`check:ts7-diagnostics-ratchet` ද එයට එරෙහිව ක්රියාත්මක වේ. නව-code gates දෙක සඳහා comparison
base එක එම SHA එකම වන අතර, ඉහළ merge commit එකේ පළමු parent එක නොවේ; එබැවින් batch එකේ
සෑම pull request එකක්ම විනිශ්චය කරනු ලබයි.

`workflow_dispatch` runs, release-green sweep සහ nightly headroom job වලට PR base එකක් නොමැති
නිසා, ඒවා නිරපේක්ෂ (global) comparison එක පවත්වා ගනී. Coverage, duplication සහ type-coverage
දැනට global ලෙසම පවතී (ඒවායේ tools මඟින් එක් එක් file diff එකක් අඩු වියදමකින් නිපදවිය නොහැක) —
එම ප්රතිකාරය සඳහා candidates වේ.

**v4.0 හි අදියර අවසන් කිරීම (LTS = පෙරට වඩා දැඩි, “සාමාන්ය තත්ත්වයට ආපසු” නොවේ)**

1. පිරිසිදු `release/v4.0.0` tip එකේ: වාර්තාව සඳහා `npm run quality:headroom --json` ධාවනය කර,
   ඉන්පසු `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, සහ එක් එක් typecheck gate එකේ
   `--update` ධාවනය කරන්න — සෑම baseline එකක්ම මනින ලද අගයට පහත වැටේ.
2. `quality-baseline.json` වෙතින් `_policy` මකා දමන්න (`--require-tighten` සහ nightly
   banking නැවත සක්රිය කරයි), එසේම `check-openapi-coverage.mjs` හි
   `THRESHOLD = 36` (හෝ ඊට වැඩි) ප්රතිස්ථාපනය කරන්න.
3. modularization මඟින් ලැබුණු ප්රතිලාභය මත මනින ලද අගයටත් වඩා දැඩි කරන්න: file-size `cap`
   නැවත 1000 (හෝ 800) දක්වා, coverage floors +5 දක්වා, modularized packages සඳහා dead exports 0
   දක්වා.

## රැචට් මූලික අගය (`quality-baseline.json`)

රැචට් එන්ජිම (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json` කියවා,
එය අලුතින් එකතු කළ `quality-metrics.json` සමඟ සංසන්දනය කරයි. කිසියම් මිනුමක් එහි
epsilon අගය ඉක්මවා පිරිහුණහොත් build එක අසමත් වේ.

දැනට නිරීක්ෂණය කරන මිනුම්:

| මිනුම                 | දිශාව  | අර්ථය                                     |
| --------------------- | ------ | ----------------------------------------- |
| `eslintWarnings`      | `down` | ESLint අනතුරු ඇඟවීම් ගණන වැඩි නොවිය යුතුය |
| `coverage.statements` | `up`   | Statement ආවරණය අඩු නොවිය යුතුය           |
| `coverage.lines`      | `up`   | Line ආවරණය අඩු නොවිය යුතුය                |
| `coverage.functions`  | `up`   | Function ආවරණය අඩු නොවිය යුතුය            |
| `coverage.branches`   | `up`   | Branch ආවරණය අඩු නොවිය යුතුය              |

සත්ය වැඩිදියුණු කිරීමකින් පසු මූලික අගය යාවත්කාලීන කිරීමට:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` ධජය වත්මන් මැනගත් අගයන් `quality-baseline.json` තුළ ලියයි.
වැඩිදියුණු කිරීමක් බැංකුගත කිරීම release/nightly කාර්යයකි, feature PR එකක කාර්යයක් නොවේ:
`--require-tighten` (Fase 6A.5) බැංකුගත නොකළ වැඩිදියුණු කිරීමක් release මාදිලියේදී පමණක්
(push, schedule, release PR, local runs) අසමත් කරයි. Feature PR එකක (`pr` gate mode) එය
වැඩිදියුණු කිරීම තොරතුරක් ලෙස පෙන්වා සාර්ථක වේ; regression එකක් මාදිලි දෙකෙහිම අසමත් වේ.
Velocity අදියරේදී එය සෑම තැනකම උපදේශාත්මක වේ
(`_policy.requireTighten: false`). බලන්න
[Generated files and derived baselines](#generated-files-and-derived-baselines-written-at-release).

### CodeQL රැචට්: නැවුම් කිරීමේ වාර ගණන සහ අතින් ක්රියාත්මක කිරීම

`check:codeql-ratchet` **එක් එක් PR එකකට නොව, කාලසටහනකට අනුව නැවුම් කරන ලද
repo state, refreshed on a schedule — not per PR.** කියවයි.
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` මඟින්
`state: configured`, `schedule: weekly` වාර්තා කරයි: එය එක් එක් push එකකට නොව,
GitHub හි default-setup scan එකකි. එහි ප්රතිඵලයක් ලෙස, alerts නිවැරදි කරන PR එකක්
merge වූ පසු, ඊළඟ නියමිත scan එක ක්රියාත්මක වන තුරු රැචට් එක පැරණි, ඉහළ ගණන කියවයි —
එබැවින් scan එක යාවත්කාලීන වන තුරු, නිවැරදි කරන PR එකේම පසු විපරම් ඇතුළුව,
විවෘත සෑම PR එකකදීම regression එකක් වාර්තා කරයි.

**අතින් නැවුම් කිරීම**: `gh workflow run codeql.yml --ref release/vX.Y.Z` මඟින්
විශ්ලේෂණය නැවත ක්රියාත්මක කර මිනිත්තු කිහිපයක් ඇතුළත alerts නැවත ප්රකාශයට පත් කරයි.
මුලින් `.github/workflows/codeql.yml` කියවන්න — එහි ශීර්ෂය එය
**`workflow_dispatch`-only වන්නේ GitHub හි "default setup" සමඟ ගැටෙන බැවින් බව**
විස්තර කරයි (`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`).
`push`/`pull_request`/`schedule` trigger නැවත සක්රීය කිරීමට පෙර
**හිමිකරුගේ ක්රියාමාර්ගයක් අවශ්ය වේ**: Settings → Code security →
CodeQL: Default → Advanced. එම මාරුව සිදු නොකර `schedule:` trigger එකක් එක් නොකරන්න —
එය අසමත් runs පමණක් නිපදවනු ඇත.

**ගණන අඩු වූ පසු මූලික අගය තද කරන්න** — `node scripts/check/check-codeql-ratchet.mjs
--update` මඟින් නව මැනගත් ගණන `quality-baseline.json` →
`metrics.codeqlAlerts.value` තුළ ලියයි. එමඟින් පැරණි සීමාව දක්වා නැවත ඉහළ යන
regression එකක් රැචට් එක නිහඬව ඉඩ නොදේ. ක්රියාත්මක කළ උදාහරණයක් (2026-09-02/03):
PR #12502 මඟින් සැබෑ alerts 7ක් නිවැරදි කරන ලදී (මැනගත් විවෘත ගණන 13 → 6);
PR #12530 මඟින් ගැළපෙන ලෙස ස්ථිර කළ මූලික අගය 11 → 6 දක්වා තද කරන ලදී; ඉන්පසු
ඉතිරි alerts 6, එක් එක් alert සඳහා වූ සාධාරණීකරණ සමඟ dismiss කර, විවෘත ගණන 0 දක්වා අඩු කරන ලදී.

**Dismissals ක්රියාකරුගේ තීරණයකි (දැඩි නීතිය #14)** — dismissal comment එකේ
තාක්ෂණික සාධාරණීකරණය සටහන් නොකර කිසිවිටෙක CodeQL alert එකක් dismiss නොකරන්න:
upstream-protocol අවශ්යතාවක් සඳහා `won't fix`, test fixture එකක් සඳහා
`used in tests`, CodeQL හඳුනාගත නොහැකි sanitizer එකක් සඳහා `false positive`
(පූර්වාදර්ශය: `docs/security/ERROR_SANITIZATION.md`).

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

## ජනනය කරන ලද ගොනු සහ ව්‍යුත්පන්න පාදක (නිකුතුවේදී ලියා ඇත)

සැලැස්ම 2026-11-13 ("ව්යුත්පන්න අංක සහ පෙළ නිකුතුවේදී පමණක් විසඳනු ලැබේ"): විශේෂාංගයක් PR වෙනස් කරයි** මූලාශ්රය** — `src/shared/constants/providers.ts`, `docs/openapi.yaml`, කුසලතා නාමාවලිය, නිදහස් ස්ථර නාමාවලිය, නව e2e පිරිවිතර. එය එම මූලාශ්‍රයෙන් ගණනය කරන ලද ගොනු නැවත උත්පාදනය නොකරන අතර, එය මනින ලද දියුණුවක් මූලික පදනමක් බවට පත් නොකරයි. එම ගොනු එක් වරක් නැවත ලියා ඇත, මුදා හැරීමේ නැවුම් කිරීම (`release:refresh-derived`) හෝ රාත්‍රී refresh PR. මෙයට පෙර, සෑම සහෝදර PR ම තමන්ගේම ප්‍රතිජනනය කළ පිටපතක් රැගෙන ඊළඟ ඒකාබද්ධ කිරීම සමඟ ගැටී ඇත (2026-11-13: 321 න් 30 විවෘත PRs නැවත ලිවීය `PROVIDER_REFERENCE.md`, 26-28 README රූප සටහන් නැවත ලිවීය).

**ආරක්ෂකයා.** `check:pr-derived-paths` (job `pr-test-policy`) `config/quality/derived-paths/` හි පවුලක ගොනුවක් ස්පර්ශ කරන විශේෂාංගයක් PR අසමත් වේ:

| පවුල        | ගොනු                                                                                                                                                                      | නැවත ලියන්නේ                                                                                                             |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `generated` | `docs/reference/derived-facts.json`; `docs/reference/PROVIDER_REFERENCE.md`; ජනනය කළ README SVG දොළහ; `skills/*/references/**`; අභිරුචි block එකක් නොමැති `SKILL.md` ගොනු | `release:refresh-derived` (facts), `gen:provider-reference`, `docs:readme-diagrams`, `generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                                         | `balance-e2e-shards.mjs --sync` (`syncE2eTimings()`)                                                                     |

ලේඛකයින් (`release/v*`, `chore/derived-*`, සහ `chore/bank-ratchet-*` මූලික කරුණු සඳහා) නිදහස් කර ඇත; එසේ වන්නේ එක් පවුලක් සහ එහි සගයන් පමණක් වෙනස් කරන PR ( `generated` සඳහා: උත්පාදක ස්ක්‍රිප්ට්, ඒවායේ පරීක්ෂණ, නියෝජිත-නිපුණතා යෙදවුම් — `src/shared/constants/agentSkills.ts`, අතින් ලියන ලද `skills/**` ලේඛන, `docs/openapi.yaml` — සහ `changelog.d/**`), උදා: එහි වීරයකුගේ පිරිසැලසුම කියවා වෙනස් කරන ලද ප්‍රතිනිර්මාණය කරන ලද SVG නැවත උත්පාදනය කරන ලද `SKILL.md` ගොනු. අතින් ලියන ලද `<!-- skill:custom-start -->` බ්ලොක් එකක් සහිත `SKILL.md` පවුල තුළ නොමැත: එහි අභිරුචි අවහිර කිරීම විශේෂාංගයක් අසල සංස්කරණය කළ හැකිව පවතී.

අනාථ පිරිසිදු කිරීම පවුල් විසින් ද විනිශ්චය නොකෙරේ: PR `docs/i18n/<locale>/<doc>` මකා දැමිය හැක ඒකාබද්ධ පදනමේ එම කැඩපත සහ `<doc>` තවදුරටත් PR හි හිසෙහි නොමැති විට, සහ `sources` වෙතින් එවැනි ලේඛන අතහැරීමට පමණක් `.i18n-state.json` සංස්කරණය කළ හැකිය. ආරක්ෂකයා එම ගොනු `orphan-cleanup` යටතේ ලැයිස්තුගත කරයි. තවමත් පවතින ලේඛනයක කැඩපත මකාදැමීම උල්ලංඝනයක් ලෙස පවතී: වෙනත් කිසිදු නල මාර්ගයක් සඳහන් නොවන අතර `llm.txt` සහ `CHANGELOG.md` දර්පණවලට ඔවුන්ගේම ලේඛකයින් ඇත.

**චෙක්පත්, ගේට්ටුවකට අනුව** (`scripts/check/lib/gateMode.mjs`; උපකාරක `scripts/check/lib/derivedArtifactScope.mjs`):

| පරීක්ෂා කරන්න                                                                      | `release` (තල්ලු කිරීම, කාලසටහන, මුදා හැරීම PR, දේශීය)                     | `pr` (විශේෂාංග PR, පෝලිම් කණ්ඩායම)                                                                                                                                                                          |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:agent-skills-sync`                                                          | සෑම නිපුණතාවයක්ම උත්පාදක නිමැවුමට සමාන විය යුතුය                           | උත්පාදනය කරන ලද පෙළ (අභිරුචි බ්ලොක් එකෙන් පිටත) හෝ `references/` PR සංස්කරණය කරන කුසලතා පමණි; එසේ නොමැති නම් `SKIP reason=pr-mode`                                                                          |
| `check:generated-artifacts` (README SVGs + e2e වේලාවන්; සම්පූර්ණ ඉතිහාසය අවශ්‍යයි) | සෑම SVG එහි උත්පාදක යන්ත්රයට සමාන වේ; සෑම පිරිවිතරයකටම කාල සටහන් ඇතුළත් වේ | PR සංස්කරණය කරන පුරාවස්තු පමණි; ඉතිරිය `SKIP reason=pr-mode`; සෑම කෞතුක වස්තුවක්ම විනිශ්චය කරන ලද (අසාර්ථක-වසා ඇති) වෙනසක් නැත →                                                                            |
| README SVG බයිට්-සසඳන පරීක්ෂණ (`tests/unit/docs/readme-*-svg.test.ts`)             | සෑම SVG                                                                    | පාදය විසඳන විට PR සංස්කරණය කරන්නේ SVG පමණි; `test-unit` හි නොගැඹුරු PR පිරික්සුමට පදනමක් නැත, එබැවින් එහි `SKIP reason=base-unresolved` සමඟ පරීක්ෂණය මඟ හැරෙන අතර සැසඳීම `check:generated-artifacts` සතු වේ |
| e2e කාල සම්පූර්ණත්වය (`tests/unit/balance-e2e-shards.test.ts`)                     | සෑම පිරිවිතරයකටම ඇතුල්වීමක් ඇත                                             | SVG පරීක්ෂණ හා සමාන රීතිය (නව පිරිවිතර මධ්‍යස්ථ බර සමඟ ධාවනය වේ)                                                                                                                                            |
| `check-quality-ratchet.mjs --require-tighten`                                      | බැංකු නොවන වැඩිදියුණු කිරීම් අසාර්ථක වේ ( `_policy` නම් මිස)               | වැඩිදියුණු කිරීම් වාර්තා කර ඇත, කිසි විටෙකත් අසාර්ථක නොවේ; ප්‍රතිගමනය තවමත් අසාර්ථකයි                                                                                                                       |

මුදා හැරීමේ මාදිලිය බෙදීමට පෙර මෙම චෙක්පත්වල තිබූ තීන්දු, පිටවීමේ කේත සහ පණිවිඩ තබා ගනී; උපරිම වශයෙන් එක් පේළියක් එකතු කරනු ලැබේ, විසඳන ලද මාදිලිය නම් කරයි (`[agent-skills-sync] mode=release (auto: local run)`). පරීක්ෂණ node:test's `{ skip: releaseOnlyUnlessTouched(...) }` විකල්පය හරහා මග හැරේ, එය `check:test-masking` වාර්තා-පමණි බ්ලොක් එකක ලැයිස්තුගත කරයි (එය `.skip(` හෝ `{ skip: true }` නොවේ, එබැවින් එය දැඩි මඟ හැරීමක් ලෙස ගණන් නොගනී). `check:generated-artifacts` පාදම විසඳිය හැකි තැන ධාවනය වේ: job `lint` (`fetch-depth: 0`), `check:agent-skills-sync` ට පසුව . දේශීය වශයෙන්, `npm run check:generated-artifacts -- --mode=pr` පෙන්නුම් කරන්නේ PR මත එම පියවර විනිශ්චය කරන්නේ කුමක්ද යන්නයි. `check:docs-counts` හි සැපයුම්කරු-සම්පූර්ණ හරස්පරීක්ෂාව ("සැපයුම්කරු යොමු මුළු (ලේඛනය එදිරිව සජීවී මොඩියුල)") ගණන් කිරීමේ දොරටුවේ කොටසක් වන අතර එම ද්වාරයෙහිම මාතයන් අනුගමනය කරයි.

හිතාමතාම කිසිදු පවුලකට ඇතුළත් නොකළ දෑ: පුද්ගලයන් විසින් තීරණය කරන policy files (`gate-manifest.json`, allowlists, `admission-policy.json`, `provider-assets-provenance.jsonl`, `model-lifecycle.json`) සහ feature PR එකකට code සමඟ එක්ව සංස්කරණය කිරීමට සිදු විය හැකි සීමාවන් (`quality-baseline.json` metric entries, typecheck/file-size/complexity baselines, `eslint-suppressions.json` — PR එකක් frozen violation එකක් නිවැරදි කරන විට pre-commit ESLint run එකෙන් prune කරනු ලැබේ). `src/i18n/routeNamespaces.generated.json` ද ජනනය කරන ලද්දක් වුවත් feature PR තුළම පවතී: යෙදුම එය runtime වේලාවේ import කරන බැවින්, එයට refresh එකක් ලැබෙන තෙක් බලා සිටිය නොහැක.

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

පෙර සිට පවතින උල්ලංඝනයන් හේතුවෙන් අසමත් විය නොහැකි සෑම ගේට්ටුවක්ම ස්ථාවර අවසර ලැයිස්තුවක් භාවිත කරයි
(උදා., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). ප්රතිපත්තිය මෙයයි:

**මූලික හේතුව නිවැරදි කරන්න; උල්ලංඝනය පෙර සිට පවතින එකක් නම් සහ එම PR එක තුළ
නිවැරදි කළ නොහැකි නම් පමණක් අවසර ලැයිස්තුව භාවිත කරන්න.**

අවසර ලැයිස්තුවකට ප්රවේශයක් එක් කරන විට:

1. සාධාරණීකරණය සහිත අදහස් දැක්වීමක් එක් කරන්න.
2. ට්රැකින් ඉෂ්යුව වෙත යොමුවක් දක්වන්න (උදා., `// #3498 — Phase 2 feature, not yet implemented`).
3. උල්ලංඝනය නිවැරදි කරන එම PR එක තුළම ප්රවේශය ඉවත් කරන්න — සක්රිය උල්ලංඝනයක් තවදුරටත්
   යටපත් නොකරන යල්පැන ගිය ප්රවේශයක්ම දෝෂයකි (ක්රියාත්මක කළ පසු 6A.3 stale-enforcement මඟින්
   අනාථ අවසර ලැයිස්තු ප්රවේශයක් හේතුවෙන් ගේට්ටුව අසමත් වේ).

පරීක්ෂණ වේගයෙන් සමත් කරවීම සඳහා අවසර ලැයිස්තු ප්රවේශ එක් **නොකරන්න**. වර්ධනය වන අවසර ලැයිස්තුවක් සහිත හරිත ගේට්ටුවක් ගුණාත්මකභාවය පිළිබඳ ව්යාජ විශ්වාසයකි.

### ඔබගේ PR එකේ ගේට්ටුවක් අසමත් වූ විට

1. **ගේට්ටුවේ ප්රතිදානය ප්රවේශමෙන් කියවන්න** — නීතිය උල්ලංඝනය කළේ කුමන ගොනුව හෝ සංකේතයදැයි එය නිශ්චිතව පෙන්වයි.
2. **උල්ලංඝනය නිවැරදි කරන්න** — බොහෝ ගේට්ටු නිර්ණායක ගොනු පද්ධති පරීක්ෂා වන බැවින් කේතය නිවැරදි වූ විගස සමත් වේ.
3. **උල්ලංඝනය පෙර සිට පවතින එකක් නම්** (එනම්, ඔබ එය හඳුන්වා නොදුන්නත් ගේට්ටුව දැන් එය ආවරණය කරන්නේ නම්): සාධාරණීකරණ අදහස් දැක්වීමක් සහ ට්රැකින් ඉෂ්යුවක් සහිත අවසර ලැයිස්තු ප්රවේශයක් එක් කරන්න.
4. **ගේට්ටුව රැචට් එකක් නම්** (ආවරණය, ESLint අනතුරු ඇඟවීම්, අනුපිටපත්භාවය, සංකීර්ණත්වය):
   ඔබගේ වෙනස්කම මිනුම වඩා නරක කර ඇත. යටින් පවතින ගැටලුව නිවැරදි කරන්න, නැතහොත් (ඉතා දුර්ලභ අවස්ථාවක) `npm run quality:ratchet -- --update` ක්රියාත්මක කරන්න
   වෙනස්කම චේතනාන්විත නම් සහ මිනුමේ පිරිහීම පිළිගත හැකි නම් පමණි — එයට හේතුව PR විස්තරය තුළ ලේඛනගත කරන්න.
5. **උපදේශාත්මක ගේට්ටු** (`continue-on-error: true`) තොරතුරු ලබාදීම සඳහා පමණි — ඒවා
   merge වීම අවහිර නොකරන නමුත් CI සාරාංශයේ දිස් වේ. ඒවා කෙසේ වෙතත් නිවැරදි කරන්න.

---

## නව Gate එකක් එක් කිරීම

1. `scripts/check/check-<name>.mjs` (හෝ `.ts`) සාදන්න. ප්රතිපත්ති gate 0/1 සමඟ පිටවෙයි.
   Ratchet-ආකාරයේ gate, `collect-metrics.mjs` හරහා `quality-metrics.json` වෙත metric එකක් නිකුත් කරයි.
2. `package.json` වෙත `"check:<name>": "node scripts/check/check-<name>.mjs"` එක් කරන්න.
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

## තාර්කීකරණ Backlog (ROI සමාලෝචනය — අදියර 9 තරංගය 3)

මෙම ඉන්වෙන්ටරිය 2026-06-17 දින `ci.yml` සමඟ ප්රතිසන්ධානය කරන ලදී (පෙර අනුවාදයේ
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` ඇතුළත් නොවීය). ප්රතිසන්ධානය කළ කට්ටලය පිළිබඳ ROI
සමාලෝචනයකින් පහත තාර්කීකරණ අපේක්ෂකයන් හඳුනා ගන්නා ලදී. **ඒකාබද්ධ කිරීම් යාන්ත්රික CI
වෙනස්කම් වන අතර; flip/drop තීරණ ක්රියාකරු සඳහා වෙන් කළ ප්රතිපත්ති තීරණ වේ.** පහත කිසිවක්
තවම යෙදවා නොමැත.

**ඉහත සඳහන් නොකළ තවත් දේවල්** (උපදේශාත්මක, අඩු සංඥා): `docs-lint` job එක
(markdownlint + Vale, සම්පූර්ණ job එකේ `continue-on-error`) සහ ස්වාධීන scanner workflows
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` `quality-baseline.json` තුළ
ඇති නමුත් `ci.yml` හි blocking ratchet එකකට සම්බන්ධ කර නොමැත — එම මිනුම දැනට අනාථ වී ඇත.

### ඒකාබද්ධ කිරීම / අනුපිටපත් ඉවත් කිරීම (යාන්ත්රික, අඩු අවදානම)

සෑම අපේක්ෂකයෙකුම 2026-06-17 දින සජීවී gate තත්ත්වයට එරෙහිව වලංගු කරන ලදී (විශ්වාස කරන්න—නමුත්
තහවුරු කරන්න); "පැහැදිලි" ලෙස පෙනුණු ඒකාබද්ධ කිරීම් කිහිපයක් ණය සඟවා තිබූ අතර ඒවා **පිරිසිදු
drop-in වෙනස්කම් නොවේ.**

- **`check:docs-sync` දෙවරක් ධාවනය වේ** — `lint` job එකේ ස්වාධීනව සහ නැවත `check:docs-all` තුළ (`docs-sync-strict`) සහ husky pre-commit hook එකේ. ✅ **අවසන්** — ස්වාධීන `lint` invocation ඉවත් කරන ලදී.
- **CVE ස්කෑන් කිරීම** — ❌ **පිරිසිදු ඒකාබද්ධ කිරීමක් නොවේ.** `audit:deps` සියලු lockfiles පහ තුළ critical advisories සහ අසම්පූර්ණ audits අවහිර කරන අතර, වත්මන් ප්රතිපත්තිය යටතේ high advisories අනතුරු ඇඟවීම් ලෙස වාර්තා කරයි; `check:vuln-ratchet` (osv) පරීක්ෂා කර ඇති baseline එකට සාපේක්ෂව _regression_ එකක් ඇති විට පමණක් අසාර්ථක වන අතර, අවශ්ය වූ විට මිනුම් නොමැති වීම ප්රතික්ෂේප කරයි. අර්ථකථන වෙනස් ය — `audit:deps` ඉවත් කළහොත් absolute critical gate එක සහ ස්වාධීන package audit receipts නැති වේ. දෙකම තබා ගන්න.
- **Cycle හඳුනාගැනීම** — ✅ **අවසන්** (#15159 G-01/G-02). මෙහි පැරණි පාඨය `check:cycles` "හරිත, curated" gate එකක් ලෙස හැඳින්වූ අතර, `check:circular-deps` (dpdm) cycles 91ක් වාර්තා කළ නිසා එය blocking ලෙස තබා ගැනීම සාධාරණීකරණය කළේය. එම හරිත තත්ත්වය **ව්යාජ හරිත තත්ත්වයක්** විය: `check:cycles` subdirectories 5ක් (ගොනු 450ක්) ස්කෑන් කර, static `import|export … from` පමණක් ගැළපූ අතර, සෑම `@/` සහ `@omniroute/open-sse/` specifier එකක්ම ඉවත් කළ බැවින්, repository එකේ ප්රමුඛ වූ dynamic-import + alias cycles දැකිය නොහැකි විය. නිවැරදි කරන ලදී: gate එක දැන් `src` + `open-sse` (ගොනු 5023ක්) හරහා ගමන් කරයි, TypeScript AST වෙතින් specifiers එකතු කරයි (`import("…")` ගණන් ගන්නා අතර type-position `typeof import("…")` ගණන් නොගනී), සහ tsconfig `paths` resolve කරයි. එය cycles **14ක්** සොයා ගනී, 0ක් නොවේ. Gate PR එකකින් පෙර සිට පැවති cycles 14ක් නිවැරදි කළ නොහැකි බැවින්, `check:cycles` දැන් **ratchet** එකකි (`--ratchet`, `quality-baseline.json` හි `metrics.cycles.value = 14` ceiling එක, `direction: down`) — එය _regression_ එකක් අවහිර කරන අතර count එක අඩු විය හැක්කේ පමණි. CI `npm run check:cycles:ratchet` ධාවනය කරයි. අඩු කිරීම **A-01** සමඟ සිදු වේ. `check:circular-deps` (dpdm) වඩා පුළුල් දෙවන මතයක් ලෙස advisory තත්ත්වයේ පවතී.
- **Complexity** — ✅ **අවසන්** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): එක් ESLint walk එකක්, ruleId අනුව ගණන් කිරීම නිසා cyclomatic+max-lines සහ cognitive baselines ස්වාධීනව පවතී; තනි `check:complexity` / `check:cognitive-complexity` දේශීය `--update` සඳහා තවදුරටත් පවතී.
- **`/api` anti-hallucination** — ✅ **අවසන්** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` හි එක් FS inventory එකක්, openapi-routes + docs-symbols තවදුරටත් ස්වාධීනව වාර්තා කරයි; තනි checks දේශීය ධාවනය සඳහා පවතී.
- **`check:node-runtime` jobs 11ක ධාවනය වේ** — ⚠️ **අඩු ROI.** සෑම එකක්ම වෙනම runner එකක් වන අතර check එක <1s වේ; එක් job එකකට ලාභදායී guard එකක් නැතිවීම වෙනුවෙන් මුළු ඉතිරිය ~10s පමණි. මෙම churn එක වටින්නේ නැත.
- **CI lint මත `typecheck:noimplicit:core`** — ✅ **lint job එකෙන් ඉවත් කරන ලදී** (advisory `continue-on-error` විය); blocking type surface එක `typecheck:core` + `check:type-coverage` වේ. Local script එක තබා ඇත.

### Flip / තීරණය කරන්න (ක්රියාකරුගේ ප්රතිපත්තිය)

- `check:openapi-security-tiers` (advisory) — ❌ **පිරිසිදුව flip කළ නොහැක.** `LOCAL_ONLY_API_PREFIXES` යටතේ ඇති `traffic-inspector` routes කිහිපයකට `x-loopback-only: true` annotation නොමැති බව එය exit 0 සමඟ අනතුරු අඟවයි. එය enforce කිරීම සඳහා පළමුව `openapi.yaml` වෙත එම annotations එක් කළ යුතුය.
- `typecheck:noimplicit:core` (advisory) — blocking `check:type-coverage` ratchet එකෙන් බොහෝ දුරට ආවරණය වී ඇත. එය ratchet එකක් බවට flip කරන්න හෝ අතිරික්ත දෙවන `tsc` pass එක ඉවත් කරන්න.
- `test:vitest:ui` (දැන් **blocking**) — පෙර සිට පැවති failures `vitest.config.ts` හි `// #8618` tracking comments සමඟ පැහැදිලිව බැහැර කර ඇත; නව failures මඟින් job එක අසාර්ථක වේ.
- `check:secrets` (gitleaks, ලේඛනගත false-positives 3කට frozen වූ blocking ratchet එක) — 0 දක්වා ළඟා වීමට එම 3 allowlist කරන්න, නැතහොත් advisory තත්ත්වයට පහත දමන්න. GitHub native secret-scanning + `check:public-creds` සමඟ overlap වේ.
- `check:pr-evidence` (blocking, PR-body prose grep කරයි) — false-positive අවදානම ඉහළය; එය ඉවත් කළහොත් Hard Rule #18 enforcement දුර්වල වන බැවින්, මෙය සැබෑ ප්රතිපත්ති තීරණයකි.
- `semgrep` (advisory standalone) — OWASP families සඳහා CodeQL සමඟ overlap වේ; එහි baseline එක ratchet එකකට සම්බන්ධ කරන්න හෝ ඉවත් කරන්න.

## සම්බන්ධිත ලේඛන

- Supply-chain (provenance, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — යතුරු-සමුහ සමානතා ගේට්ටුව

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, job `i18n-ui-coverage`).
සෑම `src/i18n/messages/<locale>.json` එකකම leaf යතුරු සමුහය `en.json` සමඟ සසඳා, යතුර එක් කළේ කවදාද යන්න නොසලකා, කිසියම් අස්ථානගත හෝ අතිරේක leaf එකක් තිබේ නම් අසමත් වේ. `__MISSING__:` placeholder යතුරු පවතින ඒවා ලෙස ගණන් ගනී (ඒවායේ අන්තර්ගතය ratio gate හි කාර්යභාරය වේ). මෙය diff මත පදනම් වූ/ප්රතිශත මත පදනම් වූ gate දෙකෙහි සම්පූර්ණ ප්රතිපූරකයයි: `check-ui-keys-coverage` සෑම locale එකක් සඳහාම 80 % අවම සීමාවක් බලාත්මක කරයි (යතුරු ~13,000කින් 43ක් අස්ථානගත වුවද 99.7 % ලෙස කියවිය හැක) සහ `check-new-key-coverage` විනිශ්චය කරන්නේ PR එකක් `en.json` වෙත එක් කරන යතුරු පමණි. Locale batch එකක් එහි branch එක cut කරන දිනයේ `en.json` වෙතින් ජනනය කර දින ගණනක් පරිවර්තනය කරන අතර base එක නව යතුරු එක් කරමින් පවතී; batch PR එකම යතුරක්වත් එක් නොකරන බැවින් siblings දෙකම batch 1 (#13044) locale නවයක යතුරු 43කින් අඩුවෙන් පැමිණි විට සහ batch 2 (#13660) locale අටක යතුරු 10කින් අඩුවෙන් පැමිණි විට (2026-09-15) නිහඬව සිටියේය. රතු ප්රතිඵලයක් `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` මඟින් නිවැරදි කරන්න; `extra` leaf එකක් යනු source එක එය ඉවත් කර ඇති බවයි — `sync-ui-keys` එය ඉවත් කරයි (`--prune-extra`, පෙරනිමිය). `--warn` අසමත් නොකර වාර්තා කරයි.
`--catalog=cli` මඟින් `bin/cli/locales` හරහා එකම සැසඳීම සිදු කරයි (`npm run i18n:check-keys:cli`); පියවර දෙකම `i18n-ui-coverage` job එක තුළ පවතී. මෙම absolute check එක release mode සඳහා පමණි: feature PR එකක් `SKIP reason=pr-mode` දකින අතර fix එක සිදු වන්නේ release refresh එකකදී හෝ translation wave එකකදී මිස feature PR එකකදී නොවේ; locale catalogs වෙනස් කරන PR එකක් සෑම catalog එකක්ම merge base එකට එරෙහිව විනිශ්චය කරයි (job `i18n-ui-coverage` යටතේ "Two modes" බලන්න).

#### `check-new-key-coverage` — නව-යතුරු i18n gate

`check-ui-value-drift` හි සහෝදරයාය. එය පරිවර්තන පසුපස තබා **නැවත ලියන ලද** English value එකක් හඳුනා ගනී; මෙය සමහර locale වෙත කිසිදා නොලැබුණු **එක් කළ** English key එකක් හඳුනා ගනී.

`check-ui-keys-coverage` හට මෙම පන්තිය දැකිය නොහැක: එය සෑම locale එකක් සඳහාම ප්රතිශත අවම සීමාවක් බලාත්මක කරන අතර, leaf ~13,000කින් යතුරු එකොළහක් අස්ථානගත වුවද coverage 99.9%ක් වේ. භාෂාවකට එක් ප්රතිශතයකට "මෙම feature එක පරිවර්තනය නොකර නිකුත් විය" යන්න ප්රකාශ කළ නොහැක — සම්පූර්ණ feature එකක් කිසිදු පෙළකින් තොරව නව locale එකකට එක් වී එම සංඛ්යාව කිසිදා වෙනස් නොකර සිටිය හැක.

එය සටහන් කරන සිදුවීම මෙයයි: Orchestration Canvas හි Phase 3 එවකට පැවති locale 42 පුරා සිය යතුරු එකොළහ පරිවර්තනය කළේය. පැය කිහිපයකට පසුව EU-language batch (#13044) මඟින් repo එක locale 51ක් දක්වා ගෙන ගිය අතර, අලුතින් එක් වූ locale නවය (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) වෙත ඒවා කිසිදා නොලැබුණි. `deepMergeFallback` අස්ථානගත key එකක් සඳහා English ආදේශ කරන බැවින්, අසාර්ථක ආකාරය හිස් UI එකක් නොව පරිවර්තනය නොකළ UI එකක් විය — එය සැබෑ වූ අතර සැලසුමෙන්ම නිහඬ විය.

එහි සහෝදරයා මෙන්ම මෙයද **diff-aware** වන අතර, merge base හි English එක working tree එකට එරෙහිව සසඳයි; එබැවින් පෙර සිට පැවති හිස්තැන් ස්ථාවරව තබා gate එක සක්රිය කිරීමට migration එකක් අවශ්ය නොවීය.

**`__MISSING__:<english>` marker එකක් මෙය සපුරාලන්නේ නැත (2026-09-17 සිට).** පෙර එය ලේඛනගත කළ deferral එක විය — runtime එක නිවැරදි English වෙත fallback වේ — එහෙත් 2026-09-16 දින feature PR අටක් යතුරු 61ක් එක් කර ඒවා පරිවර්තනය කරනවා වෙනුවට locale 65ම තුළ marker එක යෙදූ බැවින්, මෙම gate එක ඒ සෑම එකක්ම පිළිගත්තේය, කිසිවක් PR අවහිර නොකළේය, පසුව අවහිර කරන real-translation ratio gate එක release tip හි සියලු දෙනා සඳහා අසමත් විය (pt-BR 3.2 % > 2.5 % + 0.5). Marker එකක් දැන් අස්ථානගත පරිවර්තනයක් ලෙස විනිශ්චය කරයි. 2026-11-13 සිට release mode පමණි: feature PR එකක් `SKIP reason=pr-mode` දකින අතර release PR (`BASE_REF=origin/main`) මඟින් cycle එක එක් කළ සෑම යතුරක්ම gate එක විනිශ්චය කරයි. රතු ප්රතිඵලයක් release refresh එකකදී හෝ translation wave එකකදී `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` මඟින් නිවැරදි කරන්න, නැතහොත් `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`, detached-safe, `OMNIROUTE_TRANSLATION_*` env නොමැතිව ආරම්භ වීම ප්රතික්ෂේප කරයි) මඟින් සියලු locale සමාන්තරව ක්රියාත්මක කරන්න. English ලෙසම පැවතිය යුතු යතුරක් (pin කළ product/engine/flag නාමයක්) `scripts/i18n/untranslatable-keys.json` තුළට අයත් වන අතර marker එකක් පිටුපස කිසිදා නොතැබිය යුතුය. `vi` marker සම්පූර්ණයෙන්ම තහනම් කරයි (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — නවතා තැබූ පරීක්ෂණ gate

`vitest.config.ts` හි `exclude` ලැයිස්තුවේ ඇති ගොනුවක් ධාවනය නොවන test එකක් වන අතර, tree එක කියවන ඕනෑම අයෙකුට එය coverage ලෙස පෙනේ. `// #8618 — pre-existing failure; remove this exclusion when fixed` යන comment එක පිටුපස ගොනු හැට දෙකක් එකතු වී තිබුණි. Issue #8618 2026-08-11 දින වසා දැමූ විට, එය අනුගමනය කළ ලැයිස්තුව entries 45කින් 62ක් දක්වා වර්ධනය වී තිබූ අතර, අලුත් සෑම එකක්ම මියගිය issue එකක් වෙත යොමු වන comment එකක් උරුම කරගෙන තිබුණි. ලැයිස්තුව අවසානයේ ගොනුවෙන් ගොනුව මැන බැලූ විට (#13204), **62න් 51ක් source එක වෙනස් නොකර වත්මන් tree එකට එරෙහිව සමත් විය**.

සැබෑ ගොනුවකට resolve වන සෑම exclusion එකක්ම (a) tracking issue එකක් නම් කළ යුතු අතර (b) මැනූ status එක සමඟ `config/quality/vitest-exclusions.json` තුළ පෙනී සිටිය යුතු බව gate එක ඉල්ලා සිටී. එමඟින් එකක් එක් කිරීම 60-entry array එකකට තවත් එක් පේළියක් එක් කිරීම වෙනුවට, වෙන් කළ ගොනුවක review කළ හැකි diff එකක් වේ. එය excluded tests නැවත ධාවනය නොකරයි — ඒ සඳහා විනාඩි ~10ක් වැය වන අතර periodic job එකකට අයත් වේ; inventory එක සෑම එකක්ම අවසන් වරට මැනූ වේලාව සටහන් කරයි.
