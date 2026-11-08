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

CI සහ Quality Gates කාර්ය ප්‍රවාහයන් එක් එක් ස්ථාවර තීන්දුවක් නිකුත් කරයි: `Gate / CI` සහ `Gate / Quality`. ඔවුන්ගේ අනුවාදගත ඇතුළත් වීමේ ප්‍රතිපත්තිය අවශ්‍ය හෝ උපදේශන ලෙස සෑම ඉහළ ප්‍රවාහ රැකියාවක්ම ගණන් කරයි. අදාළ අවශ්‍ය කාර්යයක් සාර්ථක විය යුතුය: අතුරුදහන්, අවලංගු, මඟ හැරුණු, පොරොත්තු සහ නොදන්නා ප්‍රතිඵලවලට PASS පිහිටුවිය නොහැක. වලංගු ලේඛන-පමණක් හෝ නාමාවලිය-පමණක් වර්ගීකරණයක් කේත මංතීරුවක් අදාළ නොවන බවට පත් කළ හැක; PR කෙටුම්පතක් පිළිගත් අපේක්ෂකයෙකු නොවේ. `hotfix` ලේබලයක් සාක්ෂි අත්හරින්නේ නැත.

කාර්ය ප්‍රවාහ දෙකම PRs main/release ශාඛාවලට ආවරණය කරයි, `main` වෙත තල්ලු කරයි, අතින් යැවීම සහ සමූහ සිදුවීම් ඒකාබද්ධ කරයි. තල්ලු කිරීම, යැවීම සහ ඒකාබද්ධ-කණ්ඩායම සම්පූර්ණ තේරීම ධාවනය කරන්න. `release/**` වෙත තල්ලු කිරීම් ඒවා ආරම්භ නොකරන්න (2026-10-18): සෑම වෙනස්කමක්ම දැනටමත් එහි PR මත න්‍යාසය ධාවනය කර ඇති අතර ඒකාබද්ධ කළ සංයෝජනය වන්නේ Release-Green's job (`docs/ops/RUNNER_BOX.md` → Hosted lane) ය. ගෑරුප්පු සහ ඒකාබද්ධ කණ්ඩායම් වෙනත් ආකාරයකින් ස්වයං-සත්කාරක ධාවකයන් තෝරා ගන්නා රැකියා සඳහා සත්කාරක ධාවකයන් භාවිතා කරයි; ප්‍රමාණවත් සත්කාරක ධාරිතාව ප්‍රචාරණයට පෙර සත්‍යාපනය කළ යුතුය.

සාමාන්‍ය PR එකක් වේගවත් තේරීම ක්‍රියාත්මක කරයි. ඇතුළත් වීමේ ප්‍රතිපත්තියේ `full-code` සහ `full-code-e2e` මංතීරු (E2E, ඒකාබද්ධ කිරීම, පැකේජ පුරාවස්තු, Electron දුම්, Bun SQLite, පරිසර පද්ධතිය සහ ප්‍රොටෝකෝල සේවාලාභීන්) ධාවනය වන්නේ Mergify පෝලිම් කෙටුම්පතක් මත හෝ සම්පූර්ණ ධාවන කාලයකදී පමණි: `gh workflow run ci.yml --ref <branch>`.

සෑම JSON කුවිතාන්සියක්ම පරීක්ෂා කළ SHA, කාර්ය ප්‍රවාහ ධාවනය සහ උත්සාහය හඳුනා ගනී. CLI checkout/event SHA නොගැලපීම ප්‍රතික්ෂේප කරයි. කාර්ය ප්‍රවාහ පරීක්‍ෂණ මගින් ප්‍රතිපත්ති සාමාජිකත්වය තීරන කාර්යයේ `needs` ලැයිස්තුවට බැඳී ඇත, එබැවින් නව හෝ ඉවත් කරන ලද මංතීරුවක් නිහඬව අතුරුදහන් විය නොහැක. රිසිට්පත් ඔවුන්ගේම කාර්ය ප්‍රවාහය ආවරණය කරයි, ප්‍රකාශනය, යෙදවීම හෝ පවතින උපදේශක ස්කෑනරයක අභ්‍යන්තරය නොවේ. ශාඛා නීතිවල චෙක්පත් නාම දෙකම සක්රිය කිරීම වෙනම පරිපාලනමය වෙනසක් වේ; මෙම රැකියා එකතු කිරීමෙන් ශාඛාවක් ආරක්ෂා නොවේ.

### පෝලිම ඒකාබද්ධ කරන්න

`queue` ලේබලය Mergify පෝලිමට (`.mergify.yml`) PR යවයි. Mergify විසින් `mergify/merge-queue/` ශාඛාවක් මත PR කෙටුම්පතක් විවෘත කරයි, CI එහි සම්පූර්ණ තේරීම ධාවනය කරයි, සහ `Gate / CI`, `Gate / Quality` සහ `Merge integrity (changelog + generated skills)` සමත් වූ විට මුල් PR ඒකාබද්ධ වේ.

Mergify එහි පෝලිම් සාරාංශය කෙටුම්පතේ විස්තරයට ලියන අතර අනෙකුත් යෙදුම් වලටද එය සංස්කරණය කළ හැක. එවැනි කෙටුම්පතක `pull_request` `edited` සිදුවීමක් එහිම සමගාමී කණ්ඩායමක් (`-queue-edit-<run_id>`) ගන්නා බැවින් එයට කෙටුම්පතේ සැබෑ ධාවනය අවලංගු කළ නොහැකි අතර එය ගේට්ටුව සහ අනුකෘතිය මඟ හරියි. තාම දුවන්නේ `Merge integrity` විතරයි. Mergify විසින් මඟ හැරුණු `Gate / CI` එකක් අසාර්ථක චෙක්පතක් ලෙස කියවා PR dequeue කරන නිසා, මඟ හැරුණු ගේට් කාර්යය වෙනස් චෙක්පත් නාමයක් දරයි.

dequeue එකකින් පසු, push එකක් සෑම විටම PR ඉල්ලන්නේ නැත. ඒකට `@mergifyio queue` කමෙන්ට් කරන්න.

### ස්ථිතික ස්කෑන් ඉන්වෙන්ටරි

අනුවාදිත npm-අන්වර්ථ ඉන්වෙන්ටරි සහ ස්ථිතික-ස්කෑන් සාමාජිකත්වය `config/quality/gate-manifest.json` හි ජීවත් වේ. `package.json` ට එරෙහිව ස්ක්‍රිප්ට් නම් සහ නියම විධාන වලංගු කිරීමට `npm run check:gate-manifest` ධාවනය කරන්න; එකතු කිරීම්, ඉවත් කිරීම් සහ විධාන ප්ලාවිතය CI හි දේශීය කොක්ක සහ වෙනස් කිරීමේ වර්ගීකරණ කාර්යයන් දෙකම අසාර්ථක වේ. අන්වර්ථයක් යනු කාර්ය ප්‍රවාහ කාර්යයක්, න්‍යාස අවස්ථාවක් හෝ පරීක්ෂණ අවස්ථාවක් නොවේ: මෙම ගණන් එකිනෙකට හුවමාරු කළ හැකි ලෙස ඉදිරිපත් නොකළ යුතුය.

තෝරාගත් අන්වර්ථ ක්‍රියාත්මක නොකර පරීක්ෂා කිරීමට `npm run quality:scan -- --list` හෝ `npm run quality:scan:fast -- --list` භාවිතා කරන්න. ධාවකය npm පිවිසුම් ලක්ෂ්‍යය ආයාචනා කරයි, එබැවින් එහි ධාවන කාලය (වින්‍යාස කර ඇති Bun ඇතුළුව) සංරක්ෂණය කර ඇත. මැනිෆෙස්ට් වාර්තා එම පැතිකඩවලින් පිටත අන්වර්ථ නාමයන් වෙන වෙනම ඉල්ලා ඇති අතර, කියවීමට පමණක් ස්කෑන් පැතිකඩවල නඩත්තු විධාන තහනම් වේ.

මෙම පැතිකඩ ස්ථිතික ස්කෑන් කිරීම පමණක් ආවරණය කරයි. ඔවුන් නිෂ්පාදන පරීක්ෂණ, ආවරණය, ඇසුරුම්කරණය, බාහිර චෙක්පත් හෝ අපේක්ෂකයෙකුගේ සම්පූර්ණ නිකුතුව පිළිගැනීම සහතික නොකරයි. කාර්ය ප්‍රවාහ ඇතුළත් කිරීම සම්බන්ධිත `config/quality/admission-policy.json` සහ `scripts/quality/admission-verdict.mjs` භාවිතා කරයි. නිකුතු-නිරීක්ෂක පැතිකඩ වෙන්ව පවතී; ඔවුන්ගේ අදාළ චෙක්පත් සහ රිසිට්පත් ස්වාධීනව පරීක්ෂා කරන්න. පහත ගද්‍ය ඉන්වෙන්ටරිය යොමුවකි, ගේට්ටුවක් සැබවින්ම ක්‍රියාත්මක වූ බවට සාක්ෂි නොවේ.

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

බැරල් ප්‍රති-අපනයන සහ ගතික ආනයනයන් විභේදන රෝග විනිශ්චයන් පමණි; ඔවුන් කිසි විටෙකත් අවහිර සොයාගැනීමක් නිර්මාණය නොකරයි. සමාලෝචිත ව්‍යතිරේක සජීවීව `config/quality/forgotten-sibling-allowlist.json`. සෑම ප්‍රවේශයක්ම පාරිභෝගික සහ අපේක්ෂක පරීක්‍ෂණය නම් කළ යුතුය, නිශ්චිත තාර්කිකත්වයක් ලබා දිය යුතුය, සහ GitHub නිකුතුවක් හෝ අදින්න ඉල්ලීමක් සම්බන්ධ කළ යුතුය. විකෘති ඇතුළත් කිරීම් අසාර්ථකයි වසා ඇත. ව්‍යතිරේකවලට මකා දැමූ අපේක්ෂක පරීක්ෂණයක් හෝ `.skip`/`.todo` එකතු කරන වෙනස මැඩපැවැත්විය නොහැක ; ප්‍රකාශය දුර්වල කිරීම සහ අනෙකුත් ආවරණ ස්වාධීනව අවහිර කරන `check:test-masking` ගේට්ටුව සතු වේ.

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
| `check:fetch-targets`             | සේවාදායක පාර්ශවයේ `src/` හි සෑම `fetch("/api/...")` සැබෑ `route.ts` බවට නිරාකරණය වේ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ඔව්                                    |
| `check:deps`                      | repo හි සෑම `package.json` හරහා ඇති සියලුම `npm install` -able deps `dependency-allowlist.json` හි ඇත; නව ඇමිණුම් නොකළ හෝ බෑවුම් සහිත පැකේජ සලකුණු කර ඇත                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ඔව්                                    |
| `audit:deps`                      | `npm audit` (root + ඉලෙක්ට්‍රෝනය) — නැත high/critical උපදේශන (අතිච්ඡාදනය osv `check:vuln-ratchet`; තාර්කික බැක්ලොග් බලන්න)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ඔව්                                    |
| `check:lockfile`                  | `package-lock.json` integrity — https රෙජිස්ට්‍රි, අඛණ්ඩතා හැෂ්, ධාරක අභිබවා යාමක් නැත                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ඔව්                                    |
| `check:licenses`                  | නිෂ්පාදන පරායත්තතා සඳහාSPDX බලපත්‍ර අවසර ලැයිස්තුව                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ඔව්                                    |
| `check:tracked-artifacts`         | ගොඩනැංවීමේ කෞතුක වස්තු / කැපවූ `node_modules` symlinks නැත (husky pre-commit තුළ ද ධාවනය වේ; පෙර තල්ලු කිරීම හිතාමතාම සැහැල්ලු — #6716 වේ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ඔව්                                    |
| `check:ai-attribution`            | PR කැපවීම්වල AI/bot `Co-Authored-By` ට්‍රේලරයක් හෝ AI-පරම්පරාවේ පාදකයක් නොමැත, මාතෘකාව හෝ ශරීර — දෘඪ රීතිය #16 ( PR→ `release/**` — සඳහා `quality.yml` fast-gates loop හි සිදුවීම් ගෙවීම කියවන, `ci.yml` -op off PRs — `main` PR→ `commit-msg` හක්ක #14436                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:vitest-exclusions`         | සෑම Vitest බැහැර කිරීමක් ලුහුබැඳීමේ ගැටලුවක් නම් කරන අතර `config/quality/vitest-exclusions.json` (#13204) හි දිස් වේ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ඔව්                                    |
| `check:file-size`                 | මූලාශ්‍ර ගොනු (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) `cap` තුළ පවතින අතර ගොනු (`*.test.ts(x)`) `testCap` තුළ පරීක්ෂා කරන්න; `file-size-baseline.json` (`frozen` / `testFrozen`) හි ශීත කළ ගොනු ඒවායේ වාර්තාගත ප්‍රමාණය ඉක්මවා වර්ධනය නොවිය යුතුය.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ඔව්                                    |
| `check:error-helper`              | executors/handlers හි දෝෂ ප්‍රතිචාර `buildErrorBody()` / `sanitizeErrorMessage()` භාවිතා කරයි (දෘඩ රීතිය #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ඔව්                                    |
| `check:migration-numbering`       | සංක්‍රමණ SQL ගොනු අනුක්‍රමිකව අංකනය කර ඇත, හිඩැස් හෝ අනුපිටපත් නොමැත                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ඔව්                                    |
| `check:public-creds`              | `publicCreds.ts` පිටත වචනාර්ථයෙන් OAuth `client_id`/`client_secret` හෝ Firebase Web යතුරු නැත (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ඔව්                                    |
| `check:db-rules`                  | `src/lib/db/` මොඩියුලවලින් පිටත අමු SQL නැත; `localDb.ts` වෙතින් බැරල්-ආනයන නැත (දැඩි නීති #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ඔව්                                    |
| `check:known-symbols`             | සපයන්නන් ක්‍රියාත්මක කරන්නන්, මාර්ගගත කිරීමේ ක්‍රමෝපායන් සහ පරිවර්තකයින් ඔවුන්ගේ යැවීමේ වගු වල ලියාපදිංචි වී ඇති — තැටියේ ඇති ලිපිගොනු වලට අනාථ හෝ ප්‍රකාශ නොකළ සංකේත ගැලපේ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ඔව්                                    |
| `check:route-guard-membership`    | ළමා ක්‍රියාවලියක් ඇති කරන සෑම මාර්ගයක්ම `isLocalOnlyPath()` (දෘඪ රීති #15/#17) මගින් වර්ග කෙරේ.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ඔව්                                    |
| `check:test-discovery`            | Repo හි ඇති සෑම `*.test.ts` / `*.spec.ts` ගොනුවක්ම අවම වශයෙන් එක් ටෙස්ට් ධාවකයෙකු විසින් එකතු කරනු ලැබේ (රැට්චෙට්: `test-discovery-baseline.json` හි අනාථ ලැයිස්තුව හැකිලීම පමණි)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ඔව්                                    |
| `check:test-tla-order`            | `tests/unit` යටතේ ඇති කිසිදු `node:test` ගොනුවක් පරීක්‍ෂණයක් ලියාපදිංචි නොකරයි, ඉහළ මට්ටමේ `await` වෙත පහර දෙයි, පසුව තවත් ලියාපදිංචි වේ (#18045; ratchet: `test-tla-order-allowlist.json` හැකිලීම පමණි)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ඔව්                                    |
| `check:agent-skills-sync`         | උත්පාදනය කරන ලද නියෝජිත කුසලතා කෞතුක වස්තු ඔවුන්ගේ මූලාශ්‍ර නාමාවලියට ගැලපේ (ප්ලාවිතය නැත)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:provider-asset-provenance` | සපයන්නා logos/assets වාර්තාගත මූලාරම්භයක් දරයි                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `lint:json`                       | JSON config ගොනු විග්‍රහ කර repo lint රීති තෘප්තිමත් කරයි                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `typecheck:core`                  | දෝෂයකින් තොරව TypeScript සම්පාදනය (උපදේශන අනතුරු ඇඟවීම් පමණි)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ඔව්                                    |
| `typecheck:noimplicit:core`       | දැඩි `noImplicitAny` — ඉදිරි දැක්ම; බොහෝ පෙර පැවති ඇමතුම් අඩවි වලට තවමත් අනුසටහන් අවශ්‍ය වේ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **උපදේශන** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` විෂය පථය `src/app/(dashboard)/**` (#7033) — `typecheck:core` හි සංක්ෂිප්ත ගොනු 27 අවසර ලැයිස්තුවේ කිසිදු උපකරණ පුවරුවක් TSX ඇතුළත් නොවේ, සහ `next build` කිසි විටෙක එය ටයිප්-පරීක්ෂා නොකරයි (`next.config.mjs` සකසයි `ignoreBuildErrors: true`), එබැවින් අනාථ-හඳුනාගැනීමේ ප්‍රතික්‍ෂේපයන් එහි විය (#6625.#6909CI ශීත කළ per-file/per-TS-code ගණන් කිරීමේ මූලික රේඛාවට එරෙහිව ඇති වෙනස්කම් (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` වැනි පරණ-බලාත්මක කිරීමේ රටාව) NEW — පමණක් ගේට්ටුව අසාර්ථක වේ; කලින් පැවති දෝෂයක් නිවැරදි කළ විට `--update` සමඟ ratchet down කරන්න.                                                                                                                                                                                                                                                                                                                                                            | ඔව්                                    |
| `check:build-typecheck`           | `tsconfig.build.json` හරහා සම්පූර්ණ යෙදුම් නිෂ්පාදන වර්ගය පරීක්ෂා කිරීම (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), මතුපිට `typecheck:core` හි 27-ගොනු අවසර ලැයිස්තුව සහ උපකරණ පුවරු ගේට්ටුව ආවරණය නොවේ. `config/quality/build-typecheck-baseline.json` වලට එරෙහිව වෙනස්කම්; නව හෝ ඉහළ නැංවූ එක්-(ගොනුව, කේතය) ගණන අසමත් වේ, අඩු සංඛ්‍යාවක් ඔබෙන් රැට්චෙට් කිරීමට අසයි. `--update` ප්‍රතික්‍ෂේප කරයි, ධාවනයේ `--force-regressions` සමත් වුවහොත් මිස නව හෝ උස් වූ යුගලයක් අඩංගු වන අතර, `--force-nocheck` සම්මත නොකළහොත් අලුතින් නිශ්ශබ්ද කරන ලද ගොනුවක් ප්‍රතික්ෂේප කරයි, එබැවින් හරිත වර්ණ ලබා ගැනීම සඳහා මූලික රේඛාව පුළුල් කිරීම සහ ස්ථිර නිශ්ශබ්දතාවයක් ලබා දීම වෙනම හිතාමතා ක්‍රියා දෙකකි. හිස් `--force` ප්‍රතික්ෂේප වේ. `config/quality/ts-nocheck-baseline.json` එරෙහිව `@ts-nocheck` සඳහා ගොඩනැගීමේ විෂය පථය පරිලෝකනය කරයි, මන්ද එය භාවිතා කරන ගොනුවක් කිසිදු රෝග විනිශ්චයක් වාර්තා නොකරන අතර එසේ නොමැතිනම් සෑම ගේට්ටුවකටම නොපෙනේ. | ඔව්                                    |

#### ටයිප් චෙක් වැඩසටහන් දෙකක් වෙනස් ලෙස පිළිතුරු දෙයි

`typecheck:core` සහ `check:build-typecheck` විවිධ විකල්ප යටතේ විවිධ වැඩසටහන් සම්පාදනය කරන අතර, එකම ගොනුව එකක පිරිසිදු විය හැකි අතර අනෙකෙහි දෝෂ වලින් පිරී ඇත.

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

### රැකියාව: `quality-extended`

සම්පූර්ණ කාර්යය උපදේශන වේ (`continue-on-error: true`). npm මත පදනම් වූ රැට්චෙට් සැබෑ සඳහා ධාවනය වේ; බාහිර ස්කෑනර් `gh release download` හරහා ස්ථාපනය කර ද්විමය තවමත් නොමැති විට ස්වයං-මඟහැරීම (පිටවීම 0).

| පිටපත                    | වලංගු කරයි                                                                                                                                                                                                                   | අවහිර කිරීම                                                 |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `check:circular-deps`    | වෘත්තාකාර පරායත්තතා නොමැත (dpdm)                                                                                                                                                                                             | **උපදේශන**                                                  |
| `check:bundle-size`      | බණ්ඩල් ප්රමාණය තොප්පිය ඉක්මවා නැත                                                                                                                                                                                            | **උපදේශන**                                                  |
| `check:secrets`          | ද්විමය නොමැති නම් රහස් පරිලෝකනය (gitleaks) — මඟ හැරේ                                                                                                                                                                         | **උපදේශන**                                                  |
| `check:vuln-ratchet`     | යැපුම් දුර්වලතා (osv-ස්කෑනරය) ද්විමය නොමැති නම් — skips පසුබෑමකට ලක් නොවේ                                                                                                                                                    | **උපදේශන**                                                  |
| `check:workflows`        | වැඩ ප්‍රවාහ ලින්ට් (actionlint + zizmor); missing/broken ස්කෑනර්, වලංගු නොවන වාර්තා හෝ අතුරුදහන් වූ රැට්චෙට් මූලික රේඛාව INCOMPLETE ලෙස අසමත් වේ. වලංගු සොයාගැනීම් තෝරාගත් strict/advisory/ratchet ප්‍රතිපත්තිය අනුගමනය කරයි | ක්රියාත්මක කිරීම අවශ්ය වේ; CI හි zizmor ratchet අවහිර කිරීම |
| `check:openapi-breaking` | පොදු API කොන්ත්‍රාත්තුවේ (`openapi.yaml`) වෙනස්කම් කඩ කිරීම , මූලික ශාඛාව (oasdiff) — විමෝචනය කරයි `openapiBreaking=N`; oasdiff නොමැති නම් හෝ පාදක පිරිවිතර විසඳිය නොහැකි නම් මඟ හැරේ                                        | **උපදේශන**                                                  |

### රැකියාව: `docs-sync-strict`

සෑම PR සිට `main` දක්වා ධාවනය වේ. අසාර්ථක වූ විට අවහිර කිරීම් ඒකාබද්ධ වේ.

| පිටපත                          | වලංගු කරයි                                                                                                                              | අවහිර කිරීම                  |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `check:docs-all`               | පහත උප දොරටු 6 අනුක්‍රමිකව ධාවනය කරන මෙටා-ගේට්ටුව                                                                                       | ඔව්                          |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt අනුවාද අනුකූලතාව                                                                                          | ඔව්                          |
| ↳ `check:docs-counts`          | ගද්‍යයේ ගණන් (සැපයුම්කරු ගණන, සංක්‍රමණ ගණන, ආදිය) සැබෑ ගණන්වල රැට්චෙට් කවුළුව තුළ ඇත.                                                   | ඔව්                          |
| ↳ `check:env-doc-sync`         | `.env.example` හි සෑම env var එකක්ම docs වගුවක ලේඛනගත කර ඇත, සහ අනෙක් අතට                                                               | ඔව්                          |
| ↳ `check:deprecated-versions`  | docs තුළ අත් හරින ලද අනුවාද තන්තු නැත                                                                                                   | ඔව්                          |
| ↳ `check:doc-links`            | ලේඛනවල අභ්‍යන්තර සලකුණු සබැඳි සැබෑ ගොනු වෙත විසඳයි (`[text]`/`(path)` ආකෘතිය)                                                           | ඔව්                          |
| ↳ `check:fabricated-docs`      | ලේඛනවල දක්වා ඇති මාර්ග, env vars, CLI විධාන, හක්ක නම් සහ ගොනු මාර්ග කේත පදනමේ පවතී. `--strict` හරහා දෘඪ ගේට්ටුව; ධජය නොමැතිව soft-fail. | ඔව් ( CI හි `--strict` හරහා) |
| `check:cli-i18n`               | CLI විධාන නූල් සියලුම i18n ස්ථානීය ගොනු වල පවතී                                                                                         | ඔව්                          |
| `check:openapi-coverage`       | OpenAPI spec අවම වශයෙන් සැබෑ මාර්ගවල ratcheted තට්ටුවක් ආවරණය කරයි                                                                      | ඔව්                          |
| `check:openapi-security-tiers` | `openapi.yaml` හි ආරක්ෂක ස්ථර විවරණ `routeGuard.ts` වර්ගීකරණයන්ට අනුකූල වේ                                                              | **උපදේශන**                   |
| `check:openapi-routes`         | `openapi.yaml` හි සෑම මාර්ගයක්ම සැබෑ `route.ts` (ප්‍රති-මායාව) වෙත නිරාකරණය වේ.                                                         | ඔව්                          |
| `check:docs-symbols`           | `docs/**/*.md` හි සෑම `/api/...` සඳහනක්ම සැබෑ `route.ts` (ප්‍රති-මායාව) වෙත නිරාකරණය වේ.                                                | ඔව්                          |
| `i18n translation drift`       | i18n ස්ථානීය ගොනු — හි පරිවර්තනය නොකළ යතුරු අනතුරු අඟවයි                                                                                | **උපදේශන**                   |

`docs/diagrams/` යටතේ ඇති README SVGs දොළහ ජනනය වේ (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` ඒවා සියල්ල නැවත උත්පාදනය කරයි). එක් එක් බයිට් සංසන්දනය කිරීමේ ඒකක පරීක්ෂණයක් (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) ඇති අතර එය කැපවූ ගොනුව යල් පැන ගිය විට අසමත් වන අතර `check:docs-counts` ඔවුන්ගේ `<text>` නෝඩ් — වෙතින් කැනොනිකල් සංඛ්‍යා කියවයි, එම නිසා ගෙනහැර දැක්වීමේ පියවර මඟින් ගොනුව තුළ සෑම ගෙනහැර දක්වන ලද තන්තුවක්ම අදෘශ්‍යමාන `<text>` ලෙස තබා ගනී. SVG කැනොනිකල් අංක චෙක්පත `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) හි ලැයිස්තුගත කර ඇති ගොනු කියවයි: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` සහ `tier-flow-light.svg`; free-forever, catalog-entry, recurring-pool සහ ලකුණු කිරීමේ සාධක හිමිකම් ද `promise-pillars.svg`, `free-tier-budget.svg` සහ `strategies-grid.svg` කියවනු ලැබේ. `free-tier-budget.svg` සජීවී නාමාවලි පූරණයෙන් එහි සංඛ්‍යා අඳියි, එබැවින් එම ගොනුව නැවත උත්පාදනය වන තෙක් `FREE_MODEL_BUDGETS` හෝ සැපයුම්කරු සංදර්ශක නාමයක් reds CI වෙත වෙනස් කිරීම.

### රැකියාව: `i18n-ui-coverage`

| පිටපත                             | වලංගු කරයි                                                                                                                                                                             | අවහිර කිරීම |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (පේළිගත) | UI i18n යතුරු ආවරණය ≥ 65% වේ                                                                                                                                                           | ඔව්         |
| `check-ui-value-drift` (පේළිගත)   | නැවත ලියූ ඉංග්‍රීසියකි** වටිනාකම** කිසිදු පරණ පරිවර්තනයක් ඉතිරි නොකරයි                                                                                                                 | ඔව්         |
| `check-new-key-coverage` (පේළිගත) | ඒ** අලුත්** ඉංග්‍රීසි යතුර සෑම පෙදෙසියකම පරිවර්තනය කර ඇත — a `__MISSING__:` ලකුණුකරය ප්‍රතික්ෂේප වේ                                                                                    | ඔව්         |
| `check-translation-ratio`         | එක් පෙදෙසකට තත්‍ය පරිවර්තන අනුපාතය (ඉංග්‍රීසියට සමාන / තැන් දරන්නා / අවසර ලැයිස්තුවෙන් පිටත අතුරුදහන් වූ කොළ) `config/quality/i18n-translation-baseline.json` + ස්ලැක් නොඉක්මවිය යුතුය | **උපදේශන**  |

`fetch-depth: 0` — අගය-ප්ලාවිත ද්වාරය ඒකාබද්ධ පදනමට එරෙහිව `en.json` වෙනස් වේ.

#### `check-ui-value-drift` — පරණ-පරිවර්තන දොරටුව

එක් i18n ප්‍රතිගාමීත්වය අනෙක් දොරටුවලට ව්‍යුහාත්මකව නොපෙනේ: ඉංග්‍රීසි අගයක් නැවත ලියා ඇති අතර _previous_ ඉංග්‍රීසියෙන් ලබාගත් පරිවර්තන පිටුපසින් පවතිනු ඇත, එබැවින් ඉංග්‍රීසි නොවන පරිශීලකයින් විශ්වාසයෙන් වචන සහිත, දැන් වැරදි පිටපතක් කියවමින් සිටිති.

මෙය සැබෑ ලෙස නැව්ගත කරන ලදී. Antigravity ලොගින් උපකාරකයා ගොඩ බැස්ස විට `oauthModal.googleOAuthWarning` නැවත ලියා ඇත (#5203);** ස්ථාන 43න් 39ක්** එම සැපයුම්කරුට සම්පූර්ණ කළ නොහැකි ප්‍රවාහයක් — "සම්පූර්ණ URL පිටපත් කර පහතින් අලවන්න" ලෙස ක්‍රියාකරුවන්ට කියමින් පෙළ තබා ඇත. එය #8463 දක්වා නොපෙනී ගියේ මන්ද:

- `sync-ui-keys` නැවත පිරවීමේ යතුරු පමණි** නොපැමිණීම** , කවදාවත් එහෙම නැති ඒවා** පරණයි** ;
- `check-ui-keys-coverage` යතුර _පැමිණීම_ ගණන් කරයි, එබැවින් පරණ පරිවර්තනයක් ආවරණය කර ඇති පරිදි ලකුණු කරයි;
- `check-translation-drift` `docs/i18n/<locale>/**.md` ලේඛන දර්පණ — නිරීක්ෂණය කරයි එය කිසි විටෙකත් `src/i18n/messages/*.json` කියවන්නේ නැත. 2026-09 නැවත සමමුහුර්ත කිරීමේ සිට රැකියා `docs-sync-strict` අවහිර කිරීම: මූලික ලේඛනයක් → `npm run i18n:run -- --files=<doc>` සංස්කරණය කරන්න (අංශ මට්ටම, ලාභ).

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

පාදක නාමාවලිය කියවිය නොහැකි විට `SKIP reason=base-unresolved` සමඟින් 0 පිටවෙයි (පාදක ref නොමැති නොගැඹුරු ක්ලෝනය), `check-openapi-breaking` පිළිබිඹු කරයි.

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
- **උපදේශාත්මක** — ගෝලීය එකතුව සහ ස්ථිර කළ මූලික සීමාව අතර සැසඳීම. උරුම වූ අපගමනයක්
  නිර්දෝෂී PR එකක් කිසිවිටෙක අසමත් නොකරයි; නිකුතු සැසඳීමේදී එම අපගමනය නැවත ස්ථිර කර
  headroom කාර්යය මඟින් නිරීක්ෂණය කෙරේ.

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

### CodeQL ratchet: නැවුම් කිරීමේ වාර ගණන සහ අතින් ක්රියාත්මක කිරීම

`check:codeql-ratchet` කියවන්නේ **කාලසටහනකට අනුව නැවුම් කරන repo තත්ත්වයයි — එක් එක් PR සඳහා නොවේ.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` මඟින්
`state: configured`, `schedule: weekly` වාර්තා කරයි: මෙය එක් එක් push සඳහා කරන
විශ්ලේෂණයක් නොව, GitHub හි default-setup scan එකයි. ප්රතිවිපාකය: alerts නිවැරදි කරන
PR එකක් merge කිරීමෙන් පසුව, ඊළඟ කාලසටහන්ගත scan එක ක්රියාත්මක වන තුරු ratchet එක
පැරණි, වැඩි ගණන දිගටම කියවයි — එබැවින් scan එක යාවත්කාලීන වන තුරු, නිවැරදි කිරීමේ
PR එකටම අදාළ follow-up ඇතුළුව සෑම විවෘත PR එකකම එය පසුබැසීමක් වාර්තා කරයි.

**අතින් නැවුම් කිරීම**: `gh workflow run codeql.yml --ref release/vX.Y.Z` මඟින්
විශ්ලේෂණය නැවත ක්රියාත්මක කර මිනිත්තු කිහිපයක් ඇතුළත alerts නැවත ප්රකාශයට පත් කරයි.
පළමුව `.github/workflows/codeql.yml` කියවන්න — එය `workflow_dispatch` පමණක් වන්නේ
**එය GitHub හි "default setup" සමඟ ගැටෙන නිසා** බව එහි ශීර්ෂකය පැහැදිලි කරයි
(`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`).
`push`/`pull_request`/`schedule` triggers නැවත ස්ථාපනය කිරීමට පෙර **owner ක්රියාවක්**
අවශ්ය වේ: Settings → Code security → CodeQL: Default → Advanced. එම මාරුව සිදු
නොකර `schedule:` trigger එකක් එක් නොකරන්න — එයින් සිදුවන්නේ අසාර්ථක runs පමණි.

**ගණන අඩු වූ පසු මූලික රේඛාව දැඩි කරන්න** — `node scripts/check/check-codeql-ratchet.mjs
--update` මඟින් අලුතින් මනින ලද ගණන `quality-baseline.json` →
`metrics.codeqlAlerts.value` වෙත ලියයි. එබැවින් පැරණි උපරිම සීමාව දක්වා නැවත සිදුවන
පසුබැසීමකට ratchet එක නිහඬව අවසර නොදෙයි. ක්රියාත්මක කළ උදාහරණය (2026-09-02/03):
PR #12502 මඟින් සැබෑ alerts 7ක් නිවැරදි කරන ලදී (මනින ලද විවෘත alerts 13 → 6);
PR #12530 මඟින් එයට ගැළපෙන ලෙස ස්ථාවර කළ මූලික රේඛාව 11 → 6 දක්වා දැඩි කරන ලදී;
ඉතිරි 6 පසුව එක් එක් alert සඳහා හේතු දැක්වීමක් සහිතව ඉවත් කර, විවෘත ගණන 0 දක්වා අඩු කරන ලදී.

**ඉවත් කිරීම් තීරණය කිරීම operator සතුය (දැඩි නීතිය #14)** — dismissal comment එකේ
තාක්ෂණික හේතුව සටහන් නොකර කිසිවිටෙක CodeQL alert එකක් ඉවත් නොකරන්න: upstream-protocol
අවශ්යතාවක් සඳහා `won't fix`, test fixture එකක් සඳහා `used in tests`, CodeQL හට
හඳුනාගත නොහැකි sanitizer එකක් සඳහා `false positive` (පූර්වාදර්ශය:
`docs/security/ERROR_SANITIZATION.md`).

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

පෙර සිට පවතින උල්ලංඝන හේතුවෙන් අසමත් විය නොහැකි සෑම gate එකක්ම ස්ථිර කළ අවසර ලැයිස්තුවක්
(උදා., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`) භාවිත කරයි. ප්රතිපත්තිය මෙයයි:

**මූලික හේතුව නිවැරදි කරන්න; උල්ලංඝනය පෙර සිට පවතින අතර එය එම PR එක තුළම
නිවැරදි කළ නොහැකි විට පමණක් අවසර ලැයිස්තුව භාවිත කරන්න.**

අවසර ලැයිස්තුවකට ඇතුළත් කිරීමක් එක් කරන විට:

1. සාධාරණීකරණය සහිත අදහස් දැක්වීමක් ඇතුළත් කරන්න.
2. හඹායෑමේ issue එක සඳහන් කරන්න (උදා., `// #3498 — අදියර 2 විශේෂාංගය, තවම ක්රියාත්මක කර නැත`).
3. උල්ලංඝනය නිවැරදි කරන PR එක තුළම ඇතුළත් කිරීම ඉවත් කරන්න — තවදුරටත් සක්රිය
   උල්ලංඝනයක් යටපත් නොකරන යල්පැනගිය ඇතුළත් කිරීමක් ද දෝෂයකි (6A.3 stale-enforcement
   ක්රියාත්මක කළ පසු, අනාථ අවසර ලැයිස්තු ඇතුළත් කිරීමක් හේතුවෙන් gate එක අසමත් වනු ඇත).

පරීක්ෂණ වේගයෙන් සමත් කරවා ගැනීමට අවසර ලැයිස්තු ඇතුළත් කිරීම් එක් **නොකරන්න**. වර්ධනය වන
අවසර ලැයිස්තුවක් සමඟ ඇති හරිත gate එකක් යනු ගුණාත්මකභාවය පිළිබඳ ව්යාජ විශ්වාසයකි.

### ඔබේ PR එක නිසා gate එකක් අසමත් වන විට

1. **gate ප්රතිදානය ප්රවේශමෙන් කියවන්න** — රීතිය උල්ලංඝනය කළ නිශ්චිත ගොනුව හෝ symbol එක එය ඔබට පෙන්වයි.
2. **උල්ලංඝනය නිවැරදි කරන්න** — බොහෝ gate යනු code එක නිවැරදි වූ සැණින් සමත් වන නියත filesystem පරීක්ෂණ වේ.
3. **උල්ලංඝනය පෙර සිට පවතී නම්** (එනම්, ඔබ එය හඳුන්වා නොදුන් නමුත් gate එක දැන්
   එය ආවරණය කරයි නම්): සාධාරණීකරණ අදහස් දැක්වීමක් සහ හඹායෑමේ issue එකක් සමඟ අවසර ලැයිස්තු ඇතුළත් කිරීමක් එක් කරන්න.
4. **gate එක ratchet එකක් නම්** (coverage, ESLint warnings, duplication, complexity):
   ඔබේ වෙනස metric එක වඩාත් නරක කර ඇත. යටින් පවතින ගැටලුව නිවැරදි කරන්න, නැතහොත් වෙනස
   හිතාමතා කළ එකක් සහ metric පිරිහීම පිළිගත හැකි එකක් නම් (කලාතුරකින්)
   `npm run quality:ratchet -- --update` ධාවනය කරන්න — නමුත් PR විස්තරයේ හේතුව ලේඛනගත කරන්න.
5. **උපදේශාත්මක gate** (`continue-on-error: true`) තොරතුරු සඳහා පමණි — ඒවා merge කිරීම
   අවහිර නොකරන නමුත් CI සාරාංශයේ දිස් වේ. එසේ වුවද ඒවා නිවැරදි කරන්න.

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

## තාර්කිකකරණ පසුබැසීම් ලැයිස්තුව (ROI සමාලෝචනය — අදියර 9 රැල්ල 3)

මෙම ලේඛනය 2026-06-17 දින `ci.yml` සමඟ සසඳා ප්රතිසන්ධානය කරන ලදී (පෙර අනුවාදයේ
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` අත්හැරී තිබුණි). ප්රතිසන්ධානය කළ කට්ටලයේ ROI සමාලෝචනයකින්
පහත තාර්කිකකරණ අපේක්ෂකයන් හඳුනාගන්නා ලදී. **ඒකාබද්ධ කිරීම් යාන්ත්රික CI
වෙනස්කම් වේ; මාරු කිරීම්/ඉවත් කිරීම් ක්රියාකරු සඳහා වෙන් කළ ප්රතිපත්තිමය තීරණ වේ.** පහත කිසිවක්
තවම ක්රියාත්මක කර නොමැත.

**ඉහත ලේඛනගත නොකළ තවත් දෑ** (උපදේශාත්මක, අඩු සංඥා සහිත): `docs-lint` කාර්යය
(markdownlint + Vale, සම්පූර්ණ කාර්යයටම `continue-on-error`) සහ ස්වාධීන ස්කෑනර් කාර්යප්රවාහ
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` යන්න
`quality-baseline.json` තුළ ඇත, නමුත් `ci.yml` හි අවහිරකාරී රැචට්ටුවකට සම්බන්ධ කර නැත — මෙම මෙට්රික් එක
දැනට අනාථව ඇත.

### ඒකාබද්ධ කිරීම / අනුපිටපත් ඉවත් කිරීම (යාන්ත්රික, අඩු අවදානමක්)

සෑම අපේක්ෂකයෙකුම 2026-06-17 දින සජීවී ද්වාර තත්ත්වයට එරෙහිව වලංගු කරන ලදී (විශ්වාස කරන්න-නමුත්-තහවුරු කරන්න);
“පැහැදිලි” ලෙස පෙනුණු ඒකාබද්ධ කිරීම් කිහිපයක් ණය සඟවා ඇති බව හෙළි වූ අතර ඒවා **පිරිසිදු** සෘජු ආදේශන නොවේ.

- **`check:docs-sync` දෙවරක් ධාවනය වේ** — `lint` කාර්යය තුළ ස්වාධීනව සහ නැවත `check:docs-all` (`docs-sync-strict`) තුළ මෙන්ම husky pre-commit හුක් එක තුළද. ✅ **නිමයි** — ස්වාධීන `lint` ආමන්ත්රණය ඉවත් කරන ලදී.
- **CVE ස්කෑන් කිරීම** — ❌ **පිරිසිදු ඒකාබද්ධ කිරීමක් නොවේ.** ඕනෑම ඉහළ/අතිශය වැදගත් CVE එකක් සඳහා `audit:deps` දැඩි ලෙස අසමත් වේ; `check:vuln-ratchet` (osv) අසමත් වන්නේ මූලික රේඛාවට සාපේක්ෂව _පසුබෑමක්_ ඇති විට පමණි (දැනට 1 MODERATE). අර්ථකථන වෙනස්ය — `audit:deps` ඉවත් කිරීමෙන් නිරපේක්ෂ ඉහළ/අතිශය වැදගත් ද්වාරය අහිමි වනු ඇත. දෙකම තබා ගන්න.
- **චක්ර හඳුනාගැනීම** — ✅ **නිමයි** (#15159 G-01/G-02). මෙහි පැරණි පාඨය `check:cycles` යන්න “හරිත, තෝරා සැකසූ” ද්වාරය ලෙස හැඳින්වූ අතර `check:circular-deps` (dpdm) චක්ර 91ක් වාර්තා කළ බැවින් එය අවහිරකාරීව තබා ගැනීම සාධාරණීකරණය කළේය. එම හරිත තත්ත්වය **ව්යාජ හරිත තත්ත්වයක්** විය: `check:cycles` උපබහලුම් 5ක් (ගොනු 450ක්) ස්කෑන් කළ අතර, ස්ථිතික `import|export … from` පමණක් ගැළපූ අතර, සෑම `@/` සහ `@omniroute/open-sse/` විශේෂකයක්ම ඉවත් කළේය; එබැවින් ගබඩාව පුරා ප්රමුඛ වූ ගතික-import + alias චක්ර එයට දැකගත නොහැකි විය. නිවැරදි කරන ලදී: ද්වාරය දැන් `src` + `open-sse` (ගොනු 5023ක්) හරහා ගමන් කරයි, TypeScript AST වෙතින් විශේෂක රැස් කරයි (ඒ අනුව `import("…")` ගණන් ගන්නා අතර type-position `typeof import("…")` ගණන් නොගනී), සහ tsconfig `paths` විසඳයි. එය 0ක් නොව, චක්ර **14ක්** සොයා ගනී. පෙර පැවති චක්ර 14ක් ද්වාර PR එකක් තුළ නිවැරදි කළ නොහැකි බැවින්, `check:cycles` දැන් **රැචට්ටුවකි** (`--ratchet`, `quality-baseline.json` තුළ සීමාව `metrics.cycles.value = 14`, `direction: down`) — එය ඕනෑම _පසුබෑමක්_ අවහිර කරන අතර ගණනට අඩු විය හැක්කේ පමණි. CI විසින් `npm run check:cycles:ratchet` ධාවනය කරයි. අඩු කිරීම **A-01** සමඟ සිදු වේ. පුළුල් දෙවන මතයක් ලෙස `check:circular-deps` (dpdm) උපදේශාත්මකව පවතී.
- **සංකීර්ණත්වය** — ✅ **නිමයි** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): එක් ESLint ගමන් කිරීමක්, චක්රීය+උපරිම-පේළි සහ සංජානන මූලික රේඛා ස්වාධීනව තබා ගැනීමට ruleId අනුව ගණන් කරයි; තනි `check:complexity` / `check:cognitive-complexity` දේශීය `--update` සඳහා පවතී.
- **`/api` ප්රති-මායාකල්පනය** — ✅ **නිමයි** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` සඳහා එක් FS ලැයිස්තුගත කිරීමක්, openapi-routes + docs-symbols තවමත් ස්වාධීනව වාර්තා කරයි; තනි ධාවන දේශීය ධාවන සඳහා පවතී.
- **`check:node-runtime` කාර්ය 11ක් තුළ ධාවනය වේ** — ⚠️ **අඩු ROI.** සෑම එකක්ම වෙනම ධාවකයක් වන අතර පරීක්ෂාව තත්පර 1කට අඩුය; ලාභය සමස්තයෙන් ~තත්පර 10ක් වන අතර, ඒ වෙනුවෙන් ලාභදායී එක්-කාර්ය ආරක්ෂකයක් අහිමි වේ. මෙතරම් වෙනස්කම් කිරීම වටින්නේ නැත.
- **CI lint හි `typecheck:noimplicit:core`** — ✅ **lint කාර්යයෙන් ඉවත් කරන ලදී** (එය උපදේශාත්මක `continue-on-error` එකක් විය); අවහිරකාරී වර්ග පෘෂ්ඨය `typecheck:core` + `check:type-coverage` වේ. දේශීය ස්ක්රිප්ටය තබා ගන්නා ලදී.

### මාරු කිරීම / තීරණය කිරීම (ක්රියාකරු ප්රතිපත්තිය)

- `check:openapi-security-tiers` (උපදේශාත්මක) — ❌ **පිරිසිදුව මාරු කළ නොහැක.** එය 0 සමඟ පිටවන නමුත් `LOCAL_ONLY_API_PREFIXES` යටතේ ඇති `traffic-inspector` මාර්ග කිහිපයක `x-loopback-only: true` සටහන නොමැති බවට අනතුරු අඟවයි. එය බලාත්මක කිරීමට පළමුව එම සටහන් `openapi.yaml` වෙත එක් කළ යුතුය.
- `typecheck:noimplicit:core` (උපදේශාත්මක) — අවහිරකාරී `check:type-coverage` රැචට්ටුව මගින් බොහෝ දුරට ආවරණය වේ. රැචට්ටුවකට මාරු කරන්න හෝ අතිරික්ත දෙවන `tsc` ගමන් කිරීම ඉවත් කරන්න.
- `test:vitest:ui` (දැන් **අවහිරකාරී**) — පෙර පැවති අසමත්වීම් `vitest.config.ts` තුළ `// #8618` ලුහුබැඳීමේ අදහස් සමඟ පැහැදිලිව බැහැර කර ඇත; නව අසමත්වීම් කාර්යය අසමත් කරයි.
- `check:secrets` (gitleaks, ලේඛනගත ව්යාජ-ධනාත්මක 3ක ස්ථිර කළ අවහිරකාරී රැචට්ටුවක්) — 0 වෙත ළඟා වීමට එම 3 අවසර ලැයිස්තුවට එක් කරන්න, නැතහොත් උපදේශාත්මක තත්ත්වයට පහත හෙළන්න. GitHub හි ස්වදේශීය රහස්-ස්කෑන් කිරීම + `check:public-creds` සමඟ අතිච්ඡාදනය වේ.
- `check:pr-evidence` (අවහිරකාරී, PR-body ගද්යය තුළ සොයයි) — ව්යාජ-ධනාත්මක අවදානම ඉහළය; ඉවත් කළහොත් දැඩි රීතිය #18 බලාත්මක කිරීම දුර්වල වන බැවින්, මෙය සැබෑ ප්රතිපත්තිමය තීරණයකි.
- `semgrep` (උපදේශාත්මක ස්වාධීන කාර්යප්රවාහයක්) — OWASP පවුල් සඳහා CodeQL සමඟ අතිච්ඡාදනය වේ; එහි මූලික රේඛාව රැචට්ටුවකට සම්බන්ධ කරන්න හෝ ඉවත් කරන්න.

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
