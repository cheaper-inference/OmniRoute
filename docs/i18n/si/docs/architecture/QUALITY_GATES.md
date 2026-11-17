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

## Gate ඉන්වෙන්ටරිය සහ ක්රියාත්මක කිරීමේ පැතිකඩ

### අපේක්ෂක ඇතුළත් කිරීම

CI සහ Quality Gates workflows දෙකම ස්ථාවර තීන්දුවක් නිකුත් කරයි: `Gate / CI` සහ
`Gate / Quality`। ඒවායේ අනුවාදගත ඇතුළත් කිරීමේ ප්රතිපත්තිය මඟින් upstream job සෑම එකක්ම
අවශ්ය හෝ උපදේශාත්මක ලෙස ලැයිස්තුගත කරයි. අදාළ අවශ්ය job එකක් සාර්ථක විය යුතුය: නොමැති,
අවලංගු කළ, මඟහැරුණු, පොරොත්තු සහ නොදන්නා ප්රතිඵලවලින් PASS ස්ථාපිත කළ නොහැක. වලංගු
docs-only හෝ catalog-only වර්ගීකරණයකින් code lane එකක් අදාළ නොවන එකක් කළ හැක;
draft PR එකක් පිළිගත් අපේක්ෂකයෙකු නොවේ. `hotfix` ලේබලයකින් සාක්ෂි අවශ්යතාව ඉවත් නොවේ.

Workflows දෙකම main/release ශාඛා වෙත යවන PR, `main` වෙත කරන pushes, manual dispatch
සහ merge-group සිදුවීම් ආවරණය කරයි. Push, dispatch සහ merge-group සම්පූර්ණ තේරීම ක්රියාත්මක
කරයි. `release/**` වෙත කරන pushes ඒවා ආරම්භ නොකරයි (2026-10-18): සෑම වෙනසක්ම එහි PR මත
matrix එක හරහා දැනටමත් ධාවනය වී ඇති අතර, ඒකාබද්ධ කළ සංයෝජනය Release-Green හි කාර්යයයි
(`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks සහ merge groups, වෙනත් ආකාරයකින් self-hosted
runners තෝරන jobs සඳහා hosted runners භාවිත කරයි; rollout කිරීමට පෙර ප්රමාණවත් hosted
ධාරිතාව තහවුරු කළ යුතුය.

සාමාන්ය PR එකක් වේගවත් තේරීම ක්රියාත්මක කරයි. ඇතුළත් කිරීමේ ප්රතිපත්තියේ
`full-code` සහ `full-code-e2e` lanes (E2E, integration, package artifact, Electron smoke,
Bun SQLite, ecosystem සහ protocol clients) ක්රියාත්මක වන්නේ Mergify queue draft එකක් මත හෝ
සම්පූර්ණ run එකකදී පමණි:
`gh workflow run ci.yml --ref <branch>`.

සෑම JSON receipt එකක්ම checkout කළ SHA, workflow run සහ attempt හඳුනා ගනී.
CLI එක checkout/event SHA නොගැළපීම ප්රතික්ෂේප කරයි. Workflow tests මඟින් ප්රතිපත්ති සාමාජිකත්වය
verdict job හි `needs` ලැයිස්තුවට බැඳ තබයි, එබැවින් අලුත් හෝ ඉවත් කළ lane එකක් නිහඬව
අතුරුදන් විය නොහැක. Receipts මඟින් ආවරණය කරන්නේ තමන්ගේ workflow එක පමණි; publication,
deployment හෝ පවතින advisory scanner එකක අභ්යන්තරය ඒවා ආවරණය නොකරයි. Branch rules තුළ
check නම් දෙකම සක්රීය කිරීම වෙනම පරිපාලන වෙනසකි; මෙම jobs එක් කිරීමෙන් පමණක් branch එකක්
ආරක්ෂිත නොවේ.

### Merge queue

`queue` ලේබලය PR එකක් Mergify queue වෙත (`.mergify.yml`) යවයි. Mergify විසින්
`mergify/merge-queue/` ශාඛාවක draft PR එකක් විවෘත කරයි, CI එහි සම්පූර්ණ තේරීම ක්රියාත්මක කරයි,
සහ `Gate / CI`, `Gate / Quality` සහ
`Merge integrity (changelog + generated skills)` සාර්ථක වූ විට මුල් PR එක merge වේ.

Mergify විසින් තම queue සාරාංශය draft හි විස්තරයට ලියන අතර, වෙනත් apps හටද එය සංස්කරණය කළ හැක.
එවැනි draft එකක `pull_request` `edited` සිදුවීම තමන්ගේම concurrency group එකක්
(`-queue-edit-<run_id>`) ලබා ගනී, එබැවින් එයට draft හි සැබෑ run එක අවලංගු කළ නොහැකි අතර, gate සහ
matrix මඟහරියි. තවමත් ක්රියාත්මක වන්නේ `Merge integrity` පමණි. Mergify විසින් මඟහැරුණු
`Gate / CI` එකක් අසාර්ථක check එකක් ලෙස කියවා PR එක queue එකෙන් ඉවත් කරන බැවින්, මඟහැරුණු gate
job එක වෙනස් check නාමයක් දරයි.

Queue එකෙන් ඉවත් කළ පසු, push එකක් සෑම විටම PR එක නැවත queue කරන්නේ නැත. එය මත
`@mergifyio queue` comment කරන්න.

### Acceptance reducer තුළ රඳවාගත් සාක්ෂි

`scripts/quality/validate-release-acceptance.mjs` ලබා දුන් plan එකක් සහ එහි
manifests අඩු කර සාරාංශ කරයි; එම plan එක සම්පූර්ණ release pipeline එක ආවරණය කරන බව එය
ස්ථාපිත නොකරයි. එහි reports මඟින් එම plan එක `VERIFIED` වූ විට පවා
`releaseAcceptance: false` ලෙස පැහැදිලිව සකසයි. `release-acceptance.yml` workflow එක තවමත්
සැබෑ build, package, boot හෝ promotion receipts වෙනුවට shadow fixtures භාවිත කරයි.

රඳවාගත් සාක්ෂි සත්යාපනය කිරීමට CLI එකට `--evidence-root` අවශ්ය වේ. Files
`<evidence-root>/<artifact_id>/<member>` ලෙස විසඳා SHA-256 ලෙස hash කරයි. සාක්ෂි නොමැති
PASS record එකක්, නොමැති හෝ වෙනස් කළ file එකක්, අනාරක්ෂිත path එකක් හෝ symlink එකක්
සත්යාපනය වළක්වයි. නොමැති files හිස් සාර්ථක logs වලට සමාන නොවේ. පවතින
SHA/run/attempt checks ස්වාධීනව පවතී: ගැළපෙන bytes මඟින් පරණ receipt එකක් නිවැරදි කළ නොහැක.
File integrity යනු ක්රියාත්මක කිරීමේ සත්යතාව හෝ artifact promotion පිළිබඳ සාක්ෂියක් නොවේ.

### ස්ථිතික scan ඉන්වෙන්ටරිය

අනුවාදගත npm-alias inventory සහ static-scan membership පවතින්නේ
`config/quality/gate-manifest.json` තුළය. `package.json` සමඟ script names සහ නිශ්චිත commands
වලංගු කිරීමට `npm run check:gate-manifest` ක්රියාත්මක කරන්න; එක් කිරීම්, ඉවත් කිරීම් සහ
command drift, local hook එක සහ CI හි change-classification jobs දෙකම අසාර්ථක කරයි.
Alias එකක් workflow job එකක්, matrix instance එකක් හෝ test case එකක් නොවේ: මෙම ගණන්
එකිනෙකට හුවමාරු කළ හැකි ලෙස ඉදිරිපත් නොකළ යුතුය.

ක්රියාත්මක නොකර තෝරාගත් aliases පරීක්ෂා කිරීමට `npm run quality:scan -- --list` හෝ
`npm run quality:scan:fast -- --list` භාවිත කරන්න. Runner එක npm entrypoint එක ආමන්ත්රණය කරන
බැවින්, එහි runtime එක (වින්යාස කර ඇති විට Bun ඇතුළුව) රඳවා ගනී. එම profiles වලින් පිටත
aliases වෙනම ආමන්ත්රණය කරන බව manifest එක සටහන් කරන අතර, read-only scan profiles තුළ
maintenance commands තහනම් වේ.

මෙම profiles ආවරණය කරන්නේ static scan එක පමණි. ඒවා product tests, coverage, packaging,
external checks හෝ අපේක්ෂකයෙකුගේ සම්පූර්ණ release acceptance සහතික නොකරයි.
Workflow admission සඳහා සම්බන්ධිත `config/quality/admission-policy.json` සහ
`scripts/quality/admission-verdict.mjs` භාවිත කරයි. Release-observer profiles වෙනම පවතී;
ඒවාට අදාළ checks සහ receipts ස්වාධීනව පරීක්ෂා කරන්න. සම්පූර්ණ observer හි static commands
`config/quality/release-green-static-profile.json` තුළ ප්රකාශ කර ඇති අතර, `audit:deps`,
mutation-test තේරීම සහ translation checks ද ඇතුළත් වේ. Loader එක package.json සමඟ npm
commands සහ ආකෘතිගත CI/Quality declarations වලංගු කරයි; shell tokens arguments ලෙස
ක්රියාත්මක කිරීම වෙනුවට drift ප්රතික්ෂේප කරයි. අවශ්ය scanner SKIP/INCOMPLETE output හට
PASS ස්ථාපිත කළ නොහැක. Profile එක එහි external exclusions සටහන් කරන අතර hosted coverage,
test matrices, package හෝ deployment evidence වෙනුවට භාවිත කළ නොහැක. පහත prose inventory එක
reference එකක් පමණි; gate එකක් සැබවින්ම ධාවනය වූ බවට සාක්ෂියක් නොවේ.

Scripts `scripts/check/` (policy gates) සහ `scripts/quality/` (ratchet engine) යටතේ පවතී.
CI හි සත්ය මූලාශ්රය `.github/workflows/ci.yml` වේ.

### Release PR වේගවත් මාර්ගය (`quality.yml`)

`.github/workflows/quality.yml` මඟින් main/release PR, `main` වෙත කරන pushes,
dispatch සහ merge groups මත CI සම්පූර්ණ කරයි. PR සඳහා path-filtered fast checks භාවිත කරයි.
ස්ථිරව අක්රීය කළ duplicate build එක ඉවත් කර ඇත; සැබෑ build/package/boot checks CI තුළ
තවමත් පවතී. Unit suite සහ vitest ධාවනය වන්නේ CI තුළ පමණි
(`Unit Tests (N/8)` සහ `Vitest`)۔

| කාර්යය                                           | පරාසය                                                                                                                  | අවහිර කිරීම      |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `Docs Gates (fast-path)`                         | ලේඛන/කේත PR; API ලේඛන යොමු සහ docs-all                                                                                 | ඔව්              |
| `Fast Quality Gates`                             | කේත PR; ස්ථිතික පරීක්ෂණ, typecheck, dashboard typecheck, බලපෑමට ලක් වූ ඒකක පරීක්ෂණ, අමතක වූ සහෝදර පරීක්ෂණ (උපදේශාත්මක) |
| `No new ESLint warnings`                         | කේත PR; suppressions-aware lint guard                                                                                  | ඔව්, forks සඳහාද |
| `Merge integrity (changelog + generated skills)` | draft නොවන PR; changelog සහ generated skill සමමුහුර්තකරණය                                                              | ඔව්, forks සඳහාද |

#### අමතක වූ සහෝදර පරීක්ෂණ වාර්තාව

`npm run check:forgotten-sibling-tests` `Fast Quality Gates` හි උපදේශාත්මක පියවරක් ලෙස ක්රියාත්මක වන අතර, පරීක්ෂණ-බලපෑම් සිතියම පිටුපස ඇති import resolver නැවත භාවිත කරයි.
වෙනස් කරන ලද සෑම production module එකක් සඳහාම, pull-request diff තුළ අපේක්ෂක පරීක්ෂණය නොමැති විට, එය නිශ්චිත
`changed module/symbol -> static consumer -> candidate sibling test` දාම වාර්තා කරයි. Markdown සාරාංශය සහ JSON ප්රතිඵලය
අවහිර කරන rollout එකකට පෙර calibration සඳහා `forgotten-sibling-tests` workflow artifact ලෙස රඳවා තබා ගනී.

Barrel re-exports සහ dynamic imports යනු resolution diagnostics සඳහා පමණි; ඒවා කිසිවිටෙකත් අවහිර කරන finding එකක් නිර්මාණය නොකරයි.
සමාලෝචනය කළ exceptions `config/quality/forgotten-sibling-allowlist.json` තුළ පවතී. සෑම entry එකක්ම consumer සහ candidate
test නම් කළ යුතු අතර, නිශ්චිත හේතුවක් ලබා දී, GitHub issue එකකට හෝ pull request එකකට සබැඳියක් ඇතුළත් කළ යුතුය. වැරදි
ආකෘතියේ entries fail closed වේ. මකා දැමූ candidate test එකක් හෝ `.skip`/`.todo` එකතු කරන diff එකක් exceptions මඟින්
සඟවා තැබිය නොහැක; assertions දුර්වල කිරීම සහ අනෙකුත් masking ස්වාධීනව අවහිර කරන
`check:test-masking` gate වෙත අයත් වේ.

### කාර්යය: `lint`

`main` වෙත යවන සෑම PR එකකම ක්රියාත්මක වේ. අසමත් වුවහොත් merge අවහිර කරයි.

| ස්ක්රිප්ට් (`npm run ...`)        | වලංගු කරන්නේ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | අවහිරකාරී                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Node.js අනුවාදය සහාය දක්වන පරාසය තුළ තිබේද යන්න                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ඔව්                                        |
| `check:cycles`                    | `src/` + `open-sse/` සියල්ල පුරා ඇති චක්රීය ආනයන (AST-පාදක, tsconfig `paths` විසඳා ඇත). කිසියම් චක්රයක් පවතින සෑම අවස්ථාවකම Bare මඟින් 1 ලෙස පිටවෙයි ( #15281 සිට fail-closed) සහ SCCs ලැයිස්තුගත කරයි. `check:cycles:ratchet` (CI ක්රියාත්මක කරන්නේ මෙයයි) `quality-baseline.json` හි ඇති `metrics.cycles` සීමාව ඉක්මවන විට අවහිර කරයි — දැනට 14කි, `direction: down` බැවින් එය අඩු විය හැකි පමණි (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ඔව් (ratchet)                              |
| `check:boundary`                  | `open-sse → src` සම්බන්ධතාව: එන්ජිමෙන් යෙදුමට ඇති අනන්ය ගොනුවෙන්-ගොනුවට ආනයන (`scripts/quality/measure-boundary.mjs`; edge ලැයිස්තුව v4 core/module-split ප්රතිසංස්කරණ backlog එකයි). Bare = උපදේශාත්මක වාර්තාවකි (`quality:boundary` හා සමාන). `check:boundary:ratchet` (CI ක්රියාත්මක කරන්නේ මෙයයි, `quality.yml` වේගවත්-ගේට් ratchet ලූපයෙහිද ඇත) `quality-baseline.json` හි ඇති `metrics.boundaryOpenSseToSrc` සීමාව ඉක්මවන විට අවහිර කරයි — මනින ලද 771 ලෙස ආරම්භ කර ඇත, `direction: down`; `--update` මඟින් එය අඩු කළ හැක්කේ පමණි; PRs සඳහා base-relative (`--base-ref`, පහත බලන්න)                                                                                                                                                                                                                                                                                                                                                                                                                                       | ඔව් (ratchet)                              |
| `check:route-validation:t06`      | සියලුම routes මත Zod schemas තිබීම (Tier 6 ප්රතිපත්තිය)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ඔව්                                        |
| `check:any-budget:t11`            | `@ts-expect-error // any` ගණන අයවැය ඉක්මවා නොයයි (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ඔව්                                        |
| `check:provider-consistency`      | `providers.ts` හි ඇති සෑම provider එකකටම `providerRegistry.ts` හි ගැළපෙන ඇතුළත් කිරීමක් ඇත (සහ අවසර ලැයිස්තුව තුළ, අනෙක් අතටද එසේම)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ඔව්                                        |
| `check:model-lifecycle`           | අතින් නඩත්තු කරන routing වගු තුන checked-in lifecycle snapshot (#11503) සමඟ අනුකූලව පවතී: `FITNESS_TABLE` (`taskFitness.ts`) මඟින් `REGISTRY` හට route කළ හැකි, විශ්රාම ගන්වා ඇති කිසිදු id එකකට ලකුණු ලබා නොදේ; සෑම `BUILT_IN_ALIASES` ඉලක්කයක්ම `REGISTRY` තුළ පවතින අතර විශ්රාම ගන්වා ඇති id snapshot තුළ නොපවතී; `REGISTRY` තුළ තවමත් පවතින සෑම විශ්රාම ගන්වා ඇති id එකක්ම forward කරනු ලැබේ හෝ `allowedRetiredInCatalog` හි ලැයිස්තුගත කර ඇත; සහ `DEFAULT_DEGRADATION_MAP` හි කිසිදු source හෝ target එකක් එම snapshot තුළ විශ්රාම ගන්වා ඇති එකක් නොවේ. මෙය දැනට live upstream එකක් මඟින් model එකක් සපයනු ලබන බව සනාථ නොකරයි. Offline — `config/quality/model-lifecycle.json` සමඟ සංසන්දනය කරයි; එය `npm run quality:refresh-model-lifecycle` මඟින් අතින් යාවත්කාලීන කරනු ලැබේ (ජාලය අවශ්යය; CI වෙත සම්බන්ධ කර නැත). `allowedRetiredInCatalog` යනු burn-down ratchet එකකි: tracking issue එකක් සමඟ පමණක් ඇතුළත් කිරීමක් එක් කරන්න.                                                                                        | ඔව්                                        |
| `check:fetch-targets`             | client-side `src/` තුළ ඇති සෑම `fetch("/api/...")` එකක්ම සැබෑ `route.ts` එකකට resolve වේ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ඔව්                                        |
| `check:deps`                      | repository එක පුරා ඇති සෑම `package.json` එකකම `npm install` කළ හැකි සියලු deps `dependency-allowlist.json` හි ඇත; නව unpinned හෝ slopsquatted packages සලකුණු කරනු ලැබේ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ඔව්                                        |
| `audit:deps`                      | ස්වාධීන lockfiles පහේම (root, Electron, OpenCode plugins v1/v2 සහ provider) npm audit. Critical advisories අවහිර කරයි; high advisories දෘශ්යමාන අනතුරු ඇඟවීම් ලෙස පවතී. අස්ථානගත හෝ අසාර්ථක audits INCOMPLETE ලෙස සලකා අවහිර කරනු ලැබේ; එක් එක් scope එකට අදාළ lock hashes සහ reports රඳවා තබා ගනී.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ඔව්                                        |
| `check:lockfile`                  | `package-lock.json` අඛණ්ඩතාව — https registry, integrity hashes, host overrides නොමැති බව                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ඔව්                                        |
| `check:licenses`                  | නිෂ්පාදන dependencies සඳහා SPDX license allowlist                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ඔව්                                        |
| `check:tracked-artifacts`         | build artifacts / commit කළ `node_modules` symlinks නොමැත (husky pre-commit තුළද ධාවනය වේ; pre-push හිතාමතාම සරලයි — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ඔව්                                        |
| `check:ai-attribution`            | PR commits, title හෝ body තුළ AI/bot `Co-Authored-By` trailer හෝ AI-generation footer නොමැත — Hard Rule #16 (`quality.yml` fast-gates loop තුළ PR→`release/**` සඳහා — event payload කියවා, PR නොවන අවස්ථාවල no-op වේ — සහ PR→`main` සඳහා `ci.yml` lint හි PR-only step එකක්; husky `commit-msg` hook එකද; human co-authors අවසර ඇත; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:vitest-exclusions`         | සෑම Vitest exclusion එකක්ම tracking issue එකක් නම් කළ යුතු අතර `config/quality/vitest-exclusions.json` තුළ දිස්විය යුතුය (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ඔව්                                        |
| `check:file-size`                 | Source files (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) `cap` සීමාව තුළද test files (`*.test.ts(x)`) `testCap` සීමාව තුළද පැවතිය යුතුය; `file-size-baseline.json` තුළ frozen කර ඇති files (`frozen` / `testFrozen`) ඒවායේ වාර්තාගත ප්රමාණය ඉක්මවා විශාල නොවිය යුතුය                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ඔව්                                        |
| `check:error-helper`              | executors/handlers හි දෝෂ ප්රතිචාර `buildErrorBody()` / `sanitizeErrorMessage()` භාවිත කරයි (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ඔව්                                        |
| `check:migration-numbering`       | Migration SQL ගොනු අනුක්රමිකව අංකනය කර ඇත; හිස්තැන් හෝ අනුපිටපත් නොමැත                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ඔව්                                        |
| `check:public-creds`              | `publicCreds.ts` වලින් පිටත OAuth `client_id`/`client_secret` හෝ Firebase වෙබ් යතුරුවල වචනාර්ථ අගයන් නොමැත (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ඔව්                                        |
| `check:db-rules`                  | `src/lib/db/` මොඩියුලවලින් පිටත අමු SQL නොමැත; `localDb.ts` වෙතින් barrel-imports නොමැත (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ඔව්                                        |
| `check:known-symbols`             | ඒවායේ dispatch වගුවල ලියාපදිංචි කර ඇති provider executors, routing strategies සහ translators තැටියේ ඇති ගොනු සමඟ ගැළපේ — orphaned හෝ ප්රකාශ නොකළ symbols නොමැත                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ඔව්                                        |
| `check:route-guard-membership`    | child process එකක් ආරම්භ කරන සෑම route එකක්ම `isLocalOnlyPath()` මඟින් වර්ගීකරණය කර ඇත (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ඔව්                                        |
| `check:test-discovery`            | repo එකේ ඇති සෑම `*.test.ts` / `*.spec.ts` ගොනුවක්ම අවම වශයෙන් එක් පරීක්ෂණ ධාවකයකින් එකතු කරනු ලැබේ (ratchet: `test-discovery-baseline.json` හි orphan ලැයිස්තුව අඩු විය හැක්කේ පමණි)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ඔව්                                        |
| `check:test-tla-order`            | `tests/unit` යටතේ ඇති කිසිදු `node:test` ගොනුවක් පරීක්ෂණයක් ලියාපදිංචි කර, ඉහළ-මට්ටමේ `await` එකකට ළඟා වී, ඉන්පසු තවත් පරීක්ෂණ ලියාපදිංචි නොකරයි (#18045; ratchet: `test-tla-order-allowlist.json` අඩු විය හැක්කේ පමණි)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ඔව්                                        |
| `check:agent-skills-sync`         | ජනනය කළ agent-skills කෞතුක වස්තු ඒවායේ මූලාශ්ර catalog එකට ගැළපේ (drift නොමැත). Release මාදිලිය සෑම skill එකක්ම පරීක්ෂා කරයි; feature PR එකක් (`pr` මාදිලිය) පරීක්ෂා කරන්නේ එය ජනනය කළ පෙළ සංස්කරණය කරන skills පමණි — [ජනනය කළ ගොනු සහ ව්යුත්පන්න baseline](#generated-files-and-derived-baselines-written-at-release) බලන්න                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | Provider logos/assets සඳහා වාර්තාගත provenance entry එකක් තිබිය යුතුය                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `lint:json`                       | JSON වින්යාස ගොනු parse වී repo lint නීති සපුරාලිය යුතුය                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `typecheck:core`                  | දෝෂ රහිත TypeScript සම්පාදනය (උපදේශාත්මක අනතුරු ඇඟවීම් පමණි)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ඔව්                                        |
| `typecheck:noimplicit:core`       | දැඩි `noImplicitAny` — අනාගතය ඉලක්ක කරගත් එකකි; පෙර සිට පවතින බොහෝ call site සඳහා තවමත් annotations අවශ්ය වේ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | **උපදේශාත්මක** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` `src/app/(dashboard)/**` වෙත සීමා කර ඇත (#7033) — `typecheck:core` හි තෝරාගත් 27-ගොනු allowlist එකට කිසිදු dashboard TSX ගොනුවක් ඇතුළත් නොවන අතර, `next build` ද එය type-check නොකරයි (`next.config.mjs` හි `ignoreBuildErrors: true` සකසා ඇති බැවින්). එබැවින් එහි orphaned-identifier ප්රතිගමන (#6625/#6909) CI වෙත නොපෙනී තිබුණි. ශීත කළ එක්-ගොනු/TS-code ගණන් baseline එකකට සාපේක්ෂව වෙනස්කම් පරීක්ෂා කරයි (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` හි ඇති stale-enforcement රටාවම) — baseline කළ ගණන ඉක්මවන **අලුත්** දෝෂ පමණක් gate එක අසමත් කරයි; පෙර සිට පැවති දෝෂයක් නිවැරදි කළ විට `--update` සමඟ අගය ratchet down කරන්න.                                                                                                                                                                                                                                                                                                                                                     | ඔව්                                        |
| `check:build-typecheck`           | `tsconfig.build.json` හරහා සම්පූර්ණ යෙදුමේ production type check එකක් (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`) සිදු කරයි. මෙය `typecheck:core` හි 27-ගොනු allowlist එක සහ dashboard gate එක ආවරණය නොකරන මතුපිටකි. `config/quality/build-typecheck-baseline.json` සමඟ වෙනස්කම් පරීක්ෂා කරයි; අලුත් හෝ ඉහළ ගිය එක්-ගොනු/කේත ගණනක් අසමත් වන අතර, අඩු වූ ගණනක් ratchet කිරීමට ඔබෙන් ඉල්ලා සිටී. නව හෝ ඉහළ ගිය යුගලයක් run එකේ අඩංගු වන විට `--update` ප්රතික්ෂේප කරයි, එවිට `--force-regressions` ලබා දිය යුතුය. එසේම අලුතින් නිහඬ කළ ගොනුවක් ඇති විට `--force-nocheck` ලබා නොදුන්නේ නම් එය ප්රතික්ෂේප කරයි. එබැවින් green තත්ත්වයක් ලබාගැනීමට baseline එක පුළුල් කිරීම සහ ස්ථිර silence එකක් ලබාදීම වෙන වෙනම සිතාමතා කරන ක්රියා දෙකකි. හිස් `--force` ප්රතික්ෂේප කරයි. `@ts-nocheck` භාවිත කරන ගොනුවක් කිසිදු diagnostic එකක් වාර්තා නොකරන බැවින්, එසේ නොකළහොත් සෑම gate එකකටම නොපෙනී යනු ඇත; ඒ නිසා `config/quality/ts-nocheck-baseline.json` සමඟ build scope එක `@ts-nocheck` සඳහාද පරීක්ෂා කරයි. | ඔව්                                        |

#### Typecheck වැඩසටහන් දෙක වෙනස් ආකාරයෙන් පිළිතුරු දෙයි

`typecheck:core` සහ `check:build-typecheck` විවිධ විකල්ප යටතේ විවිධ
වැඩසටහන් compile කරන අතර, එකම ගොනුවක් එකකදී දෝෂ රහිතවද අනෙකෙහි
දෝෂවලින් පිරීද තිබිය හැක.

`tsconfig.build.json` හි `"strict": false` සකසා ඇති බැවින් `noImplicitAny` අක්රිය වේ. Core
config එක දැඩි විකල්ප සහිතව තෝරාගත් 27-ගොනු allowlist එකක් compile කර, එක් එක්
entry එකේ import graph එක අනුගමනය කරයි. එබැවින් build program එකෙහි කිසිදා
නොපෙනෙන ගොනු පවා එහිදී පරීක්ෂා කරනු ලැබේ.

ගොනුවක් typed ද යන්න තීරණය කිරීමේදී මෙම ප්රතිවිපාකය වැදගත් වේ: **`check:build-typecheck` යටතේ ශුන්ය diagnostics යනු ශුන්ය දෝෂ බව අදහස් නොකරයි**. ගොනු 26කින්
`@ts-nocheck` ඉවත් කළ විට, ඒවායින් 23ක් build program එකෙහි පිරිසිදුව තිබුණි;
ඒවායින් දහසයක් strict එකෙහි implicit-any දෝෂ 120ක් පමණ මතු කළේය. ගොනුවක්
පිරිසිදු යැයි පැවසීමට පෙර දෙකම පරීක්ෂා කරන්න.

### Job: `quality-gate`

`test-coverage` පසු ධාවනය වේ. අසමත් වුවහොත් merge අවහිර කරයි.

| ස්ක්රිප්ට්                   | වලංගු කරන්නේ                                                                                                                                                          | අවහිර කිරීම               |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | `quality-metrics.json` නිකුත් කරයි (ESLint අනතුරු ඇඟවීම් ගණන, ඒකාබද්ධ කළ shard වාර්තාවෙන් coverage)                                                                   | ඔව් (ratchet හි upstream) |
| `quality:ratchet`            | `quality-baseline.json` හි ඇති සෑම metric එකක්ම regression වී නොමැත (ESLint අනතුරු ඇඟවීම් ≤ baseline; coverage ≥ baseline)                                            | ඔව්                       |
| `check:duplication`          | කේත අනුකරණය (jscpd@4) `quality-baseline.json` හි baseline ඉක්මවා නොයයි                                                                                                | ඔව්                       |
| `check:complexity`           | ගොනු-මට්ටමේ cyclomatic complexity සීමාව ඉක්මවා නොයයි (core ESLint `complexity` + `max-lines-per-function`)                                                            | ඔව්                       |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — වෙනම ESLint pass එකකි; CI විසින් දෙකම එකම `check:complexity-ratchets` පියවර ලෙස ඒකාබද්ධ කර ධාවනය කරයි        | ඔව්                       |
| `check:dead-code`            | භාවිත නොකරන exports / files ratchet (knip) baseline සමඟ සසඳන විට regression වී නොමැත                                                                                  | ඔව්                       |
| `check:compression-budget`   | Compression benchmark budget — එක් එක් engine එක සඳහා token-savings floors regression වී නොමැත                                                                        | ඔව්                       |
| `check:type-coverage`        | ප්රතිශත-typed ratchet (`type-coverage`) regression වී නොමැත; `typecheck:noimplicit:core` බොහෝ දුරට ආවරණය කරයි                                                         | ඔව්                       |
| `check:codeql-ratchet`       | විවෘත CodeQL alert ගණන regression වී නොමැත (`gh api` හරහා කියවයි; token නොමැති විට graceful-skip) — refresh cadence සහ manual trigger සඳහා පහත "CodeQL ratchet" බලන්න | ඔව්                       |

### Job: `quality-extended`

සම්පූර්ණ job එකම උපදේශාත්මක වේ (`continue-on-error: true`). npm-පාදක ratchets සැබෑ ලෙස ධාවනය වේ; බාහිර scanners `gh release download` හරහා ස්ථාපනය කර binary එක තවමත් නොමැති නම් තමන්ම skip කරයි (exit 0).

| ස්ක්රිප්ට්               | වලංගු කරන්නේ                                                                                                                                                                                                                | අවහිර කිරීම                                                |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `check:circular-deps`    | චක්රීය dependencies නොමැත (dpdm)                                                                                                                                                                                            | **උපදේශාත්මක**                                             |
| `check:bundle-size`      | Bundle size සීමාව ඉක්මවා නොයයි                                                                                                                                                                                              | **උපදේශාත්මක**                                             |
| `check:secrets`          | Secret scanning (gitleaks) — binary එක නොමැති නම් skip කරයි                                                                                                                                                                 | **උපදේශාත්මක**                                             |
| `check:vuln-ratchet`     | Dependency vulnerabilities (osv-scanner) regression වී නොමැත — මිනුම් නොගත් විට `--ratchet` INCOMPLETE ලෙස අසමත් වේ (exit 2)                                                                                                | **උපදේශාත්මක**                                             |
| `check:workflows`        | Workflow lint (actionlint + zizmor); scanners නොමැති හෝ බිඳී ඇති විට, වාර්තා වලංගු නොවන විට හෝ ratchet baseline නොමැති විට INCOMPLETE ලෙස අසමත් වේ. වලංගු findings තෝරාගත් strict/advisory/ratchet ප්රතිපත්තිය අනුගමනය කරයි | ක්රියාත්මක කිරීම අවශ්යයි; CI තුළ zizmor ratchet අවහිර කරයි |
| `check:openapi-breaking` | pin කර ඇති event commits වලට එරෙහි Public API contract (PR merge-base, push පෙර, merge-group base; scheduled/manual checkout පළමු parent); අවශ්ය measurement එක අසමත් වූ විට closed ලෙස අසමත් වේ                            | `--ratchet` සමඟ **අවහිර කිරීම**                            |

### Job: `docs-sync-strict`

`main` වෙත සෑම PR එකකදීම ධාවනය වේ. අසමත් වුවහොත් merge කිරීම අවහිර කරයි.

| Script                         | Validates                                                                                                                                                     | Blocking                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | පහත උප-ගේට් 6 අනුක්රමිකව ක්රියාත්මක කරන මෙටා-ගේට් එකකි                                                                                                        | Yes                        |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI අනුවාද අනුකූලතාව; release මාදිලියේදී 66 `llm.txt` දර්පණ සහ පරිවර්තිත CHANGELOG කොටස් ද පරීක්ෂා කරයි (PR මාදිලිය: දර්පණ එකිනෙකට එකඟ වේ)    | Yes                        |
| ↳ `check:docs-counts`          | ගද්යයේ ඇති ගණන් (සැපයුම්කරුවන්ගේ ගණන, migration ගණන ආදිය). මාදිලි දෙකක් ඇත: විශේෂාංග PR සඳහා `pr`, අනෙක් අවස්ථාවල `release` — පහත "ව්යුත්පන්න කළ අගයන්" බලන්න | Yes                        |
| ↳ `check:env-doc-sync`         | `.env.example` හි ඇති සෑම env විචල්යයක්ම docs වගුවක ලේඛනගත කර තිබිය යුතු අතර, අනෙක් අතටද එය එසේම විය යුතුය                                                    | Yes                        |
| ↳ `check:deprecated-versions`  | docs තුළ අවලංගු කළ අනුවාද තන්තු නොමැත                                                                                                                         | Yes                        |
| ↳ `check:doc-links`            | docs තුළ ඇති අභ්යන්තර markdown සබැඳි සැබෑ ගොනු වෙත විසඳේ (`[text]`/`(path)` ආකාරය)                                                                            | Yes                        |
| ↳ `check:fabricated-docs`      | docs තුළ සඳහන් routes, env විචල්ය, CLI විධාන, hook නම් සහ ගොනු මාර්ග codebase තුළ පවතී. `--strict` හරහා දැඩි gate එකක්; flag නොමැති විට මෘදු-අසමත් වීමක්.     | CI තුළ `--strict` හරහා Yes |
| `check:cli-i18n`               | CLI `t()` යතුරු `bin/cli/locales/en.json` තුළ පවතී (මාදිලි දෙකෙහිම); release මාදිලියේදී පමණක් pt-BR / zh-CN / zh-TW `en.json` සමඟ සමාන වේ                     | Yes                        |
| `check:openapi-coverage`       | OpenAPI විශේෂණය සැබෑ routes සඳහා ratchet කළ අවම සීමාවක් හෝ ඊට වැඩි ආවරණයක් සපයයි                                                                              | Yes                        |
| `check:openapi-security-tiers` | `openapi.yaml` හි ආරක්ෂක ස්ථර සටහන් `routeGuard.ts` වර්ගීකරණ සමඟ අනුකූල වේ                                                                                    | **උපදේශාත්මක**             |
| `check:openapi-routes`         | `openapi.yaml` හි සෑම path එකක්ම සැබෑ `route.ts` එකකට විසඳේ (භ්රාන්තියට එරෙහි පරීක්ෂාව)                                                                       | Yes                        |
| `check:docs-symbols`           | `docs/**/*.md` හි ඇති සෑම `/api/...` සඳහනක්ම සැබෑ `route.ts` එකකට විසඳේ (භ්රාන්තියට එරෙහි පරීක්ෂාව)                                                           | Yes                        |
| `i18n translation drift`       | `docs/i18n/**` දර්පණ සහ `.i18n-state.json` අතර වෙනස — PR මත උපදේශාත්මකයි (දර්පණ translation wave මඟින් නැවුම් කරනු ලැබේ), push සහ nightly මත දැඩි වේ          | PR මත **උපදේශාත්මකයි**     |

#### පරිවර්තන දර්පණ ව්යුත්පන්න කළ ගොනු වේ (PR මාදිලිය සහ release මාදිලිය)

විශේෂාංග PR එකක් සංස්කරණය කරන්නේ ඉංග්රීසි මූලාශ්ර පමණි. `docs/i18n/<locale>/**` දර්පණ (66
`llm.txt` පිටපත් සහ පරිවර්තිත `CHANGELOG.md` ගොනු ඇතුළුව) සහ `.i18n-state.json` එක පියවරකින්
translation wave (`docs/i18n-*` / `chore/i18n-*` ශාඛා, නියමිත
`i18n-mirror-refresh.yml`) සහ release (`npm run release:sync-changelog-i18n`) මඟින් නැවත ලියනු ලැබේ. එබැවින් දර්පණ
ගේට් `scripts/check/lib/gateMode.mjs` මඟින් විසඳනු ලබන මාදිලි දෙකකින් ක්රියාත්මක වේ (`--mode=pr|release`,
ඉන්පසු `OMNIROUTE_GATE_MODE`, ඉන්පසු Actions සිදුවීම; දේශීය ධාවනයක් `release` වේ):

- `check:docs-sync` — release mode සියලුම පරීක්ෂණ ධාවනය කරයි. PR mode මඟින් package.json/OpenAPI අනුවාදය,
  root CHANGELOG ශීර්ෂ සහ superseded-docs guard තබාගෙන, `llm.txt` mirror copies සහ පරිවර්තනය කළ CHANGELOG කොටස් සඳහා
  `SKIP reason=pr-mode` මුද්රණය කරයි — PR එක mirrors ලියන්නේ නම් හැර: `config/quality/derived-paths/*.json` තුළ
  `docs/i18n/**` family එකේ writer කෙනෙකු ලෙස ප්රකාශිත head branch එකක් checks දෙකම strict ලෙස ධාවනය කරයි,
  එසේම diff base එක විසඳිය හැකි විට, එහිම diff එක `docs/i18n/<locale>/llm.txt` හෝ `CHANGELOG.md` සංස්කරණය කරන
  වෙනසක් එම check එක strict ලෙස ධාවනය කරයි. depth-1 checkout එකක ( `docs-sync-strict` job එකේ) diff base එක විසඳිය
  නොහැකි බැවින්, PR mode මඟින් base එකක් අවශ්ය නොවන එක් check එකක්ද ධාවනය කරයි: සෑම `llm.txt` mirror එකක්ම තිබිය
  යුතු අතර, එහි `---` separator එක තබාගෙන root body එක හෝ බොහෝ mirrors අතර පොදු body එකක් අඩංගු විය යුතුය. Base එක
  වෙනස් වී තිබීමෙන් සියලු mirrors එකසේ stale වුවහොත් එය සමත් වේ; එක් mirror එකක් අතින් සංස්කරණය කළහොත් අසමත් වේ.
  depth-1 PR checkout එකක පරිවර්තනය කළ `CHANGELOG.md` files සඳහා එවැනි check එකක් නොමැත.
- Pre-commit hook එක `check-docs-sync.mjs --mode=pr` ධාවනය කරයි: commit එක තීරණය කරන්නේ එය සිදු කරන වෙනස මතය.
  flag එක නොමැතිව local run එකක් release mode වේ, එවිට root `llm.txt` සංස්කරණය කරන එක් merged PR එකක් wave එක
  ධාවනය වන තෙක් එම base එක මත පසුව කරන සෑම commit එකක්ම අවහිර කරනු ඇත. Husky hook එකක් ධාවනය කරන ඕනෑම
  mode-aware gate එකකටද එම නියමයම අදාළ වේ: hook එක `--mode=pr` ලබා දෙයි, strict verdict එක release-mode runs
  සමඟ පවතී (release PR, `main` වෙත pushes, සාමාන්ය local run එක).
- Mirror-content unit tests (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`,
  `resilience-pre-dispatch-docs-mirrors`, `cli-env-quality-docs-mirrors`,
  `docs/*-locales`) — release mode සෑම locale එකක්ම assert කරයි. PR mode මඟින් `.i18n-state.json` අනුව
  English source එක සමඟ current වන mirrors පමණක් assert කරයි (සම්පූර්ණ-file hash එක හෝ test එක pin කරන කොටසේ
  සටහන් කළ section hash එක) සහ stale ඒවා හේතුවක් සමඟ skip කරයි. `target_hash` provenance checks දෙකෙහිම
  සෑම locale එකක් සඳහාම ධාවනය වේ. Freshness එක `## ` section එකකට වෙන්ව පවතී, unit `run-translation.mjs`
  hash කරයි; දිගු section එකක් (මෙම file එකේ gate inventory එක එහි අඩක් පමණ වේ) යන්නෙන් එහි කරන ඕනෑම edit එකක්
  එම mirrors stale කරයි, එබැවින් ඊළඟ wave එක තෙක් ඒවායේ PR-mode assertions skip වේ. English source එකේ තවදුරටත්
  නොමැති anchor එකක් ඇත්නම්, එය whole-file comparison වෙත fallback වේ.
- `i18n translation drift` — PR වල advisory වේ, push, nightly සහ release cut මත strict වේ; එබැවින් stale mirror එකක්
  release එකක ship විය නොහැක.

`scripts/i18n/sync-llm-mirrors.mjs` (`syncLlmMirrors()` ලෙසද export කර ඇති අතර, `--dry-run` සමඟ)
`llm.txt` mirrors නැවත ලියයි; release refresh, translation wave සහ scheduled
`i18n-mirror-refresh.yml` එය ධාවනය කරයි (drift report එක ඒවා ලැයිස්තුගත නොකරන බැවින් refresh එක stale `llm.txt`
mirrors dry run එකකින් හඳුනාගෙන, `check:docs-all` ට පෙර ඒවා sync කරයි).

`docs/diagrams/` යටතේ ඇති README SVG දොළහ generated වේ (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` මඟින් ඒ සියල්ල නැවත generate කරයි). සෑම එකකටම byte-compare unit test එකක්
(`tests/unit/docs/readme-*-svg.test.ts`, `test-unit` job එක) ඇත; release mode හි committed file එක stale වූ විට එය
අසමත් වේ. PR එකකදී, `check:generated-artifacts` මඟින් PR එක සංස්කරණය කරන SVG එක තීරණය කරන අතර base හි drift එක
release refresh වෙත ඉතිරි වේ ([Generated files and derived baselines](#generated-files-and-derived-baselines-written-at-release)
බලන්න) — සහ `check:docs-counts` මඟින් canonical numbers ඒවායේ `<text>` nodes වෙතින් කියවයි — outlining step එක
outlined string සෑම එකක්ම file එකේ invisible `<text>` ලෙස තබා ගන්නේ ඒ නිසාය. SVG canonical-numbers check එක
`SVG_DIAGRAM_FILES` තුළ ලැයිස්තුගත files කියවයි (`scripts/check/check-docs-counts-sync.mjs`):
`docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`,
`cli-terminal.svg`, `tier-cascade.svg`, මෙන්ම `public/images/tier-flow-dark.svg` සහ
`tier-flow-light.svg`; free-forever, catalog-entry, recurring-pool සහ scoring-factors claims ද
`promise-pillars.svg`, `free-tier-budget.svg` සහ `strategies-grid.svg` කියවයි. මෙම generators මඟින් ඇඳෙන
counts (provider total, MCP tools, routing strategies, free-forever providers, …) literals වෙතින් නොව,
`scripts/docs/readmeFacts.mjs` හරහා facts snapshot `docs/reference/derived-facts.json` වෙතින් ලබා ගනී,
එබැවින් ඕනෑම branch එකක diagram එකක් නැවත generate කිරීමෙන් committed file එක ප්රතිනිර්මාණය වේ.
`free-tier-budget.svg` එහි rows එකම snapshot (`code.freeTierBudget`, facts probe එක record කරන catalog summary)
වෙතින් ඇඳෙන බැවින්, `FREE_MODEL_BUDGETS` හි වෙනසක් ඊළඟ refresh එකේදී card එක වෙත ළඟා වේ, CI රතු වීමට හේතුවක්
නොවෙයි.

### Derived values: the `pr` and `release` gate modes

Feature PR එකක් එහි base එකේ state මත රඳා පවතින value එකක් කිසිවිටෙක ලියන්නේ නැත: provider, migration,
MCP-tool සහ strategy counts, README SVG numbers, facts snapshot. එක් step එකකින් ඒ සියල්ල නැවත ගණනය කරයි,
release සහ nightly derived-refresh PR මඟින් ධාවනය කරන `npm run release:refresh-derived` හරහා. එබැවින්
**releases අතර base එක design අනුව live code එකට පසුපසින් පවතී**, සහ sibling එකක් provider එකක් එක් කළ පසු
tree එක live code සමඟ සසඳන gate එකක් හෝ test එකක් සෑම PR එකකදීම red වේ. Derived values තීරණය කරන gates
`pr` හෝ `release` modes දෙකෙන් එකක ධාවනය වේ; ඒවා `scripts/check/lib/gateMode.mjs` මඟින් විසඳනු ලැබේ
(පළමු match එක ජය ගනී):

1. command line හි `--mode=pr|release`;
2. `OMNIROUTE_GATE_MODE` environment variable (`pr` හෝ `release`);
3. GitHub Actions event එකෙන් ස්වයංක්රීයව: head එක `release/v*` නොවන `pull_request` එකක්,
   `merge_group` එකක් හෝ `omni-queue/**` වෙත push එකක් → `pr`; අනෙක් සියල්ල (push, schedule,
   dispatch, release PR `release/v* → main`, ඕනෑම local run එකක්) → `release`.

එක් එක් mode එකකදී `check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) අසමත් කරන්නේ:

| Mode      | Fails                                                                                                                                                                                                                                                                                                                                                                                                              | Needs the live facts |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| `release` | සෑම පරීක්ෂාවක්ම, ගසෙන් එකතු කළ කරුණු සමඟ දැඩි සමානතාවය පරීක්ෂා කරයි (gate එකට සැමවිටම තිබූ හැසිරීම): පරණ count එකක්, version එකක්, coverage floor එකක් හෝ SVG අංකයක් තිබීම දැඩි drift එකකි                                                                                                                                                                                                                         | Yes                  |
| `pr`      | වෙනස මඟින් සිදු කළ දේ පමණක්, එම claim extractors භාවිතයෙන් PR base එකට සාපේක්ෂව diff කරයි: (1) එම පරීක්ෂාව සහ ගොනුව සඳහා base එකේ නොතිබූ managed value එකක් ("PR edited a managed number — restore the line to the base text"); (2) base එකේ තිබූ නමුත් head එකෙන් අහිමි වූ අවශ්ය claim එකක්. facts අවශ්ය නොවන content invariants release mode ආකාරයෙන්ම ක්රියා කරයි; release-only පරීක්ෂා ලැයිස්තුගත කර skip කරයි | No                   |

Agent-instruction ගොනු කිසිදු derived count එකක් රැගෙන නොයයි: `AGENTS.md`, `llm.txt` (සහ එහි
`docs/i18n/*/llm.txt` පිටපත්), bs `AGENTS.md` fork එක, `open-sse/services/AGENTS.md`,
`src/shared/constants/agentSkills.ts`, `skills/README.md` සහ සෑම `skills/*/SKILL.md` ගොනුවක්ම
මූලාශ්රය වෙත (උදාහරණයක් ලෙස `src/shared/constants/routingStrategies.ts` හි
`ROUTING_STRATEGY_VALUES`) සහ `npm run facts` වෙත යොමු කරයි. "No derived counts (agent-instruction file …)" invariant එක modes දෙකේදීම එහි count එකක් (providers, migrations, MCP tools සහ scopes,
routing strategies, scoring factors, mode packs) හමු වූ විට අසමත් වේ. එබැවින් release refresh එකට instruction ගොනුවක් නැවත ලිවීමට කිසිවිටෙක සිදු නොවේ.

`pr` mode හි writer branches හට managed values සංස්කරණය කළ හැක: `chore/derived-*` (රාත්රී refresh
PR එක), `release/v*`, සහ translation waves `docs/i18n-*` සහ `chore/i18n-*`
(`scripts/check/lib/derivedClaimsDiff.mjs`). Queue batches (`merge_group`, Mergify drafts,
`omni-queue/**`) නැවත විනිශ්චය නොකෙරේ: gate එක විසින් දැනටමත් එකින් එක විනිශ්චය කළ PR එකතු කරයි.

Exit codes: `0` පිරිසිදු · `1` දැඩි drift (හෝ `--strict` සමඟ soft drift) හෝ managed-value
උල්ලංඝනයක් · `2` infrastructure — code facts එකතු කළ නොහැකි විය (tsx probe එක අසාර්ථක විය හෝ
කාලය ඉක්මවා ගියේය; timeout එක `OMNIROUTE_FACTS_TIMEOUT_MS` වන අතර පෙරනිමිය 600000 ms වේ) හෝ, CI තුළ,
PR diff base එක නිරාකරණය කළ නොහැකි විය. Exit 2 කිසිවිටෙක documentation divergence එකක් නොවේ:
job එක නැවත ධාවනය කරන්න හෝ environment එක නිවැරදි කරන්න.

එක් එක් mode එක ක්රියාත්මක වන ස්ථාන:

| Where                                                                                               | Mode                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Feature PR — `ci.yml` job `docs-sync-strict`, `quality.yml` step "Docs accuracy"                    | `pr` (ස්වයංක්රීය); job එක base එක `BASE_SHA` ලෙස ලබා දෙන අතර `fetch-depth: 2` සමඟ checkout කරයි                                                                                                                      |
| `merge_group`, `omni-queue/**` candidates, the merge train's full gate list                         | `pr`                                                                                                                                                                                                                 |
| Release PR (`release/v* → main`), pushes, scheduled and manual runs                                 | `release`                                                                                                                                                                                                            |
| Release-Green (`scripts/quality/validate-release-green.mjs`)                                        | HARD items `OMNIROUTE_GATE_MODE=pr` සමඟ ක්රියාත්මක වේ ("base එක කැඩුවේද?"); DRIFT item `derived-refresh` `npm run release:refresh-derived -- --check` ධාවනය කරයි (strict view, කිසිවිටෙක base-red එකක් විවෘත නොකරයි) |
| Release (`/generate-release` phases 0a and 1; the skill wiring is a separate owner-approved change) | `npm run release:refresh-derived` මඟින් derived files ලියයි; release PR හිම පරීක්ෂා පසුව `release` mode තුළ ක්රියාත්මක වේ                                                                                            |
| `nightly-derived-refresh.yml` (daily, highest `release/vX.Y.Z`, skipped under release-freeze)       | `npm run release:refresh-derived -- --profile=nightly`; diff එකක් ඇති විට `chore/derived-refresh` වෙතින් ONE PR එකක් විවෘතව තබයි; කිසිවිටෙක merge නොකරයි                                                             |

එයට පිටුපස ඇති commands:

- `npm run facts` ව්යුත්පන්න කළ සෑම සංඛ්යාවක්ම JSON ලෙස මුද්රණය කරයි (`scripts/release/facts.mjs`).
  `--key=code.mcpTools` එක් අගයක් මුද්රණය කරයි, `--snapshot` සජීවී tree එක වෙනුවට commit කළ snapshot එක කියවයි. facts එකතු කළ නොහැකි විට අවසන් තත්ත්වය 2 වේ.
- `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) ව්යුත්පන්න කළ ගොනු සියල්ල එක් පියවරකින්, පහත අනුපිළිවෙළට, නැවත ගණනය කරයි (`--only=` සඳහා පියවර IDs): `provider-reference`
  (`docs/reference/PROVIDER_REFERENCE.md`), `facts` (snapshot එක), `numbers` (counts gate හි නැවත ලිවීමේ සැලැස්ම docs වෙත යෙදූ පසු, එය ඔවුන්ගේ `docs/i18n/` mirror වෙත ගෙන යයි),
  `readme-diagrams`, `skills` (ජනනය කළ `SKILL.md`), `e2e-timings` (tree එක `syncE2eTimings` සමඟ ලබා දෙන තෙක් මඟ හරියි), `ui-keys` (`en.json` වෙතින් ඉවත් කළ keys ඉවත් කර, `--rewritten-since=<ref>` — පෙරනිමිය `origin/main` — සමඟ අවසන් release එකෙන් පසු නැවත ලියන ලද English values නැවත පෝලිමට එක් කරයි), `llm-mirrors` සහ `verify-generated` (ලිවීමකින් පසු, release mode තුළ `check:generated-artifacts`
  සහ `check:agent-skills-sync` සාර්ථක විය යුතුය; `--check` තුළ සහ `--only` මඟින් එය ඉවත් කළ විට මඟ හරියි; අසමත් වීම අවසන් තත්ත්වය 2කි). `changelog` පියවර opt-in වේ (`--with-changelog`, release profile පමණි). `--profile=nightly`
  කිසි විටෙක version claim එකක් ස්පර්ශ නොකරයි. `-- --check` සමඟ එය කිසිවක් නොලියා, කිසියම් ගොනුවක් වෙනස් වීමට ඉඩ තිබේ නම් හෝ කළමනාකරණය කළ අගයකට අතින් සංස්කරණයක් අවශ්ය නම් (දෙකම ලැයිස්තුගත කරමින්) අවසන් තත්ත්වය 1 සමඟ අවසන් වේ; යටිතල පහසුකම් දෝෂයකදී අවසන් තත්ත්වය 2 වේ. `--json` ප්රතිඵලය JSON ලෙස මුද්රණය කරයි.
- `docs/reference/derived-facts.json` යනු අවසන් refresh එක භාවිත කළ facts හි snapshot එකයි. එය ලියන්නේ refresh එක පමණි. README SVG generators එය කියවන අතර, PR-කාලීන unit tests commit කළ docs සහ ජනනය කළ ගොනු එය සමඟ සසඳයි — සජීවී code සමඟ කිසි විටෙක නොවේ. suite එකේ ඇති එකම සජීවී සැසඳීම වන්නේ `tests/unit/check-docs-counts-sync.test.ts` හි “the release refresh closes the cycle” යන්නයි: සජීවී facts සමඟ, refresh හි rewrite plan එක memory තුළ යෙදූ පසු එය වාර්තා නොකරන කිසිදු STRICT drift එකක් ඉතිරි නොකරන අතර, නැවත සැලසුම් කිරීම කිසිවක් වෙනස් නොකරයි.

ප්රාදේශීයව නැවත නිෂ්පාදනය කිරීමට (local run එකක් පෙරනිමියෙන් `release` භාවිත කරයි):

```bash
npm run check:docs-counts                                       # release: strict, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # what a feature PR is judged on
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # what the release would rewrite
```

විසඳිය හැකි base එකක් නොමැති විට (`BASE_SHA`/`BASE_REF` නොමැති වීම, හෝ local `origin/release/v<version>` නොමැති වීම), local
`pr` run එක warning එකක් මුද්රණය කර diff එක අසමත් වීම වෙනුවට මඟ හරියි.

### Job: `i18n-ui-coverage`

| Script                            | Validates                                                                                                                                                                                                       | Blocking                |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `check-ui-keys-coverage` (inline) | UI i18n key coverage ≥ 65% බව තහවුරු කරයි                                                                                                                                                                       | Yes (both modes)        |
| `check:ui-icu`                    | සෑම UI catalog එකකම සෑම message එකක්ම `IntlMessageFormat` සමඟ compile වන බව තහවුරු කරයි                                                                                                                         | Yes (both modes)        |
| `check-ui-value-drift` (inline)   | නැවත ලියන ලද English **value** එකක් stale translation එකක් ඉතිරි නොකරන බව තහවුරු කරයි                                                                                                                           | Yes (release mode only) |
| `check-new-key-coverage` (inline) | **new** English key එකක් සෑම locale එකකම පරිවර්තනය කර ඇති බව තහවුරු කරයි — `__MISSING__:` marker එකක් ප්රතික්ෂේප කරයි                                                                                           | Yes (release mode only) |
| `check-key-completeness` (inline) | සෑම UI catalog එකක්ම (සහ `--catalog=cli` සමඟ සෑම CLI catalog එකක්ම) එහි `en.json` හි key set එකම හරියටම රැගෙන යන බව තහවුරු කරයි; `pr` mode හිදී, PR එක වෙනස් කළ සෑම catalog එකක්ම merge base හිදී තමන්ටම එරෙහිව | Yes (both modes)        |
| `check-translation-ratio`         | locale එකකට real-translation ratio (allowlist එකෙන් පිටත ඇති English සමඟ සමාන / placeholder / missing leaves) `config/quality/i18n-translation-baseline.json` + slack ඉක්මවා නොයන බව තහවුරු කරයි                | Yes (release mode only) |

`fetch-depth: 0` අවශ්ය වේ — value-drift gate එක `en.json` merge base එකට එරෙහිව diff කරයි.

**Two modes (since 2026-11-13).** Feature PR එකක් `en.json` (සහ
`bin/cli/locales/en.json`) තුළ keys එක් කරයි හෝ නැවත ලියයි, වෙනත් locale එකක් ස්පර්ශ නොකරයි; `check:pr-derived-paths` (`pr-test-policy` job,
`config/quality/derived-paths/translation.json` family) එසේ කරන feature PR එකක් අසමත් කරයි. අනෙකුත් locales සෑම release එකකදීම
`release:refresh-derived` මඟින් සම්පූර්ණ කරනු ලබන අතර, එය `scripts/i18n/sync-ui-keys.mjs` හි `syncUiKeys()` කැඳවයි (missing keys එක් කිරීම, ඉවත් කළ ඒවා ඉවත් කිරීම, නැවත ලියන ලද English හි translations `rewrittenSinceRef` සමඟ සලකුණු කිරීම, පරිවර්තනය කිරීම), නැතහොත් translation wave එකක් මඟින් සම්පූර්ණ කරනු ලබයි. Gates mode එක කියවන්නේ `scripts/check/lib/gateMode.mjs` වෙතිනි: `pr` mode හි (feature PRs,
`merge_group`, `omni-queue/**`) ඉහත release-mode gates `SKIP reason=pr-mode` මුද්රණය කර 0 සමඟ අවසන් වේ; `release` mode හි (release PR, `main` වෙත pushes, `workflow_dispatch`, local runs) ඒවා පෙර පරිදි strict වේ, සහ release PR මත diff-aware ඒවාට `BASE_REF=origin/main` ලැබෙන බැවින්, cycle එක එක් කළ හෝ නැවත ලියූ සෑම key එකක්ම ඒවා විනිශ්චය කරයි. `--mode=pr` සමඟ feature-PR verdict එක local ලෙස පෙරදසුන් කරන්න.

`pr` මාදිලියේදී locale catalog වෙනස් කරන PR එකක් (පරිවර්තන wave එකක්, release refresh එකක්, පරිවර්තන-පමණක් නිවැරදි කිරීමක්) skip නොවේ: `check-key-completeness` මගින් එය වෙනස් කළ සෑම catalog එකක්ම merge base හි ඇති එම catalog එකට එරෙහිව (`scripts/i18n/lib/touched-catalogs.mjs`) පරීක්ෂා කරයි. Catalog එකෙන් ඉවත් වූ key එකක්, `en.json` හි නොමැති key එකක්, සැබෑ පරිවර්තනයක් `__MISSING__:` marker එකක් බවට හෝ ඉංග්රීසි පෙළ බවට පත්වීමක්, හෝ PR එක ස්පර්ශ නොකළ ඉංග්රීසි string එකක placeholders/tags තවදුරටත් interpolate නොකරන value එකක් තිබේ නම් එය අසමත් වේ. PR එක තුළ අලුතින් එක් කරන catalog එකක `en.json` හි සම්පූර්ණ key set එක තිබිය යුතුය. PR එකක් ස්පර්ශ කරන catalogs සඳහා ratio සහ CLI-parity gates දකින දේ එයින් ආවරණය වේ.

Locale-parity unit tests (`cli-i18n-catalog`, `i18n-pt-br`, `i18n-vi-completeness`, `i18n-placeholder-parity`) `tests/_helpers/localeParityMode.ts` හරහා එම modes අනුගමනය කරයි: `pr` මාදිලියේදී ඒවා key-parity assertions skip කරන අතර, merge base සිට ඉංග්රීසි වෙනස් වූ keys සඳහා placeholder parity release refresh වෙත භාර දෙයි (unit-test job එකේ shallow checkout එකට එය කියවිය නොහැකි විට සෑම key එකක්ම). එම helper එක **අවසර ලත් එකම mode-conditional skip එකයි**: `check:test-masking` මගින් `.skip(` සහ `{ skip: true }` ගණන් කරන නමුත් එය ආපසු ලබාදෙන computed `{ skip: "<reason>" }` ගණන් නොකරයි. එබැවින් `tests/unit/locale-parity-mode.test.ts` මගින් එය භාවිත කළ හැකි tests ලැයිස්තුව ස්ථාවර කරයි — එකක් එක් කිරීම එම ලැයිස්තුවට කළ යුතු reviewed edit එකකි.

#### `check-ui-value-drift` — පැරණි පරිවර්තන gate එක

අනෙක් gates වලට ව්යුහාත්මකව හඳුනාගත නොහැකි එකම i18n regression එක හඳුනාගනී: ඉංග්රීසි value එකක් නැවත ලියූ විට, _පෙර_ ඉංග්රීසි පෙළෙන් ලබාගත් translations පැරණි තත්ත්වයේම ඉතිරි වීම. එවිට ඉංග්රීසි නොවන පරිශීලකයන් විශ්වාසදායක ලෙස වචනගත කර ඇති නමුත් දැන් වැරදි copy එකක් දිගටම කියවති.

මෙය සැබෑවටම නිකුත් විය. Antigravity login helper එක එක් වූ විට `oauthModal.googleOAuthWarning` නැවත ලියන ලදී (#5203); **locales 43 න් 39ක්** operators හට “සම්පූර්ණ URL එක පිටපත් කර පහතින් paste කරන්න” යනුවෙන් කියන පෙළ තබා ගත්තේය — එම provider සඳහා සම්පූර්ණ කළ නොහැකි flow එකකි. #8463 වන තුරු මෙය නොදැනී පැවතුණේ:

- `sync-ui-keys` මගින් **නොමැති** keys පමණක් backfill කරයි; **පැරණි** ඒවා නොකරයි;
- `check-ui-keys-coverage` මගින් key _පැවතීම_ ගණන් කරන බැවින්, පැරණි translation එකක් covered ලෙස ලකුණු වේ;
- `check-translation-drift` මගින් `docs/i18n/<locale>/**.md` documentation mirrors පමණක් track කරයි —
  එය කිසිවිටෙක `src/i18n/messages/*.json` කියවන්නේ නැත. එය `docs-sync-strict` job එකේ ධාවනය වේ: PR වලදී advisory, push සහ nightly වලදී strict; translation wave එක mirrors refresh කරයි, feature PR එක නොවේ.

**Diff-aware, baseline-backed නොවේ.** එය merge base හි `en.json` එක working tree එක සමඟ සසඳයි; ඉංග්රීසි value එක වෙනස් වූ සෑම key එකක් සඳහාම, තවමත් untouched translation එකක් තබාගෙන සිටින ඕනෑම locale එකක් stale වේ. මෙය පෙර සිට පැවති debt හිතාමතාම **freeze කරයි** — දිගු කලක් පැවති translation එකක් ලබාගත්තේ කුමන පැරණි ඉංග්රීසි පෙළෙන්දැයි diff එකකින් හෙළි කළ නොහැකි බැවින්, gate එක වර්තමාන change එක ස්පර්ශ කරන දේ පමණක් විනිශ්චය කරයි. විකල්පය වන per-key hash baseline එකකට ~600 KB generated file එකක් වැය වන අතර, එය දැනට ඇති විශාලතම baseline එක මෙන් 3× වන අතර සෑම i18n PR එකකදීම වෙනස් වීමක් ඇති කරයි.

එය සපුරාලීමට ක්රම දෙකක් ඇත:

1. බලපෑමට ලක් වූ translations යාවත්කාලීන කරන්න, හෝ
2. ඒවා `__MISSING__:<new english>` ලෙස සකසන්න — එවිට runtime මගින් නිවැරදි කළ ඉංග්රීසි පෙළ සේවය කරයි (`src/i18n/request.ts::deepMergeFallback`, #7258), සහ key එක පරිවර්තනය සඳහා queue වේ.

String එකේ **අර්ථය** වෙනස් වී ඇත්නම්, key එක **rename කිරීම** වඩාත් සුදුසුය: අලුත් key එකකට stale translation එකක් inherit කළ නොහැක. #8463 භාවිත කළ රටාව මෙයයි.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Base catalog එක කියවිය නොහැකි විට (base ref නොමැති shallow clone එකක්), `check-openapi-breaking` අනුකරණය කරමින් `SKIP reason=base-unresolved` සමඟ 0 exit වේ. Release මාදිලියේදී පමණි: feature PR එක ඉංග්රීසි පෙළ නැවත ලියා එතැනින් නතර වේ; release refresh එක එය ඉතිරි කළ translations සලකුණු කරයි (`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`, එම `findStaleTranslations`).

### Job: `i18n`

සම්පූර්ණ i18n validation matrix එක (එක් locale එකකට එක් job එකක්). සම්පූර්ණ job එකම advisory වේ.

| Script                          | Validates                                | Blocking                                                  |
| ------------------------------- | ---------------------------------------- | --------------------------------------------------------- |
| `validate_translation.py quick` | එක් locale එකකට translation completeness | **Advisory** (සම්පූර්ණ job එකේ `continue-on-error: true`) |

### Job: `pr-test-policy`

Pull requests සඳහා පමණක් ධාවනය වේ.

| Script                 | Validates                                                                                                                                 | Blocking |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, හෝ `bin/` හි production code වෙනස් කරන PR වල tests ඇතුළත් කළ යුතු හෝ යාවත්කාලීන කළ යුතුය (Hard Rule #8) | Yes      |
| `check:test-masking`   | වෙනස් කළ test files මගින් net assert count අඩු නොකරන අතර `assert.ok(true)` tautologies එක් නොකරයි                                         | Yes      |
| `check:pr-evidence`    | වෙනස සඳහා test/VPS evidence PR body එකේ සඳහන් කරයි (PR prose grep කිරීමෙන් Hard Rule #18 ක්රියාත්මක කරයි — fragile, Backlog බලන්න)        | Yes      |

### Job: `test-vitest`

`build` පසු ධාවනය වේ. අසමත් වුවහොත් merge අවහිර කරයි.

| කට්ටලය           | වලංගු කරන්නේ                                                  | අවහිර කිරීම                                                                                                                |
| ---------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP සේවාදායකය (මෙවලම් 110ක්), autoCombo, cache — vitest ධාවකය | ඔව්                                                                                                                        |
| `test:vitest:ui` | UI සංරචක පරීක්ෂණ — vitest ධාවකය                               | **අවහිර කිරීම** — දැනටමත් පවතින අසමත්වීම් `vitest.config.ts` තුළ පැහැදිලිව බැහැර කර ඇත; නව අසමත්වීම් මඟින් කාර්යය අසමත් වේ |

### රාත්රී කාර්ය ප්රවාහ (කාලසටහන්ගත, උපදේශාත්මක)

මේවා cron කාලසටහනක් (සහ `workflow_dispatch`) මත ක්රියාත්මක වන අතර, කිසිවිටෙක PR මත ක්රියාත්මක නොවේ. සියල්ල උපදේශාත්මක වේ.

| කාර්ය ප්රවාහය          | වලංගු කරන්නේ                                                                                                                                                           | අවහිර කිරීම    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | අහඹු seed එකක් + ඉහළ ධාවන ගණනක් සහිත fast-check property පරීක්ෂණ                                                                                                       | **උපදේශාත්මක** |
| `nightly-resilience`   | heap-වර්ධන සීමාව, chaos දෝෂ-ඇතුළත් කිරීම, k6 load/soak                                                                                                                 | **උපදේශාත්මක** |
| `nightly-llm-security` | promptfoo injection guard (block මාදිලිය) + garak probes (provider secret එකක් නොමැති විට මඟහරිනු ලැබේ)                                                                | **උපදේශාත්මක** |
| `nightly-schemathesis` | සජීවී OmniRoute එකකට එරෙහි OpenAPI කොන්ත්රාත්තු fuzzing (schemathesis), `docs/openapi.yaml` භාවිතයෙන් — පිරිවිතර උල්ලංඝනයන් / හසුරුවා නොගත් 500s මතු කරයි (Fase 8 B.4) | **උපදේශාත්මක** |
| `nightly-mutation`     | වේගවත් unit lane එක හරහා Stryker mutation-testing ලකුණ — ඉතිරි වන mutants මඟින් දුර්වල asserts මතු කරයි                                                                | **උපදේශාත්මක** |
| `nightly-compat`       | සහාය දක්වන `engines.node` පරාස හරහා Node engine අනුකූලතා matrix                                                                                                        | **උපදේශාත්මක** |

කාර්යසාධන baseline (heap, TTFB, build කාලය) වාර්තා කරනු ලබන අතර, ඒවා gate නොකරයි: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) බලන්න (`npm run perf:lts-baseline`).

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

## ජනනය කළ ගොනු සහ ව්යුත්පන්න මූලික අගයන් (release එකේදී ලියනු ලැබේ)

2026-11-13 සැලැස්ම ("ව්යුත්පන්න සංඛ්යා සහ පෙළ release එකේදී පමණක් විසඳනු ලැබේ"): විශේෂාංග PR එකක්
**මූලාශ්රය** — `src/shared/constants/providers.ts`, `docs/openapi.yaml`, කුසලතා නාමාවලිය,
නොමිලේ-ස්තර නාමාවලිය, නව e2e spec එකක් — වෙනස් කරයි. එය එම මූලාශ්රයෙන් ගණනය කරන ලද ගොනු නැවත ජනනය
නොකරන අතර, මැනගත් වැඩිදියුණු වීමක් මූලික අගයකට ඇතුළත් නොකරයි. එම ගොනු එක් වරක්, release refresh එක
(`release:refresh-derived`) හෝ රාත්රී refresh PR එකක් මඟින් නැවත ලියනු ලැබේ. මීට පෙර, සෑම සහෝදර
PR එකක්ම තමන්ගේම නැවත ජනනය කළ පිටපතක් රැගෙන ආ අතර, ඊළඟ merge එක සමඟ ගැටුම් ඇති විය (2026-11-13:
විවෘත PR 321කින් 30ක් `PROVIDER_REFERENCE.md` නැවත ලියා තිබූ අතර, 26–28ක් README රූප සටහන් නැවත ලියා තිබුණි).

**ආරක්ෂක පරීක්ෂාව.** `check:pr-derived-paths` (`pr-test-policy` job එක) මඟින්
`config/quality/derived-paths/` හි පවුලකට අයත් ගොනුවක් ස්පර්ශ කරන විශේෂාංග PR එකක් අසමත් කරයි:

| පවුල        | ගොනු                                                                                                                                                                      | නැවත ලියන්නේ                                                                                                             |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `generated` | `docs/reference/derived-facts.json`; `docs/reference/PROVIDER_REFERENCE.md`; ජනනය කළ README SVG දොළහ; `skills/*/references/**`; අභිරුචි block එකක් නොමැති `SKILL.md` ගොනු | `release:refresh-derived` (facts), `gen:provider-reference`, `docs:readme-diagrams`, `generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                                         | `balance-e2e-shards.mjs --sync` (`syncE2eTimings()`)                                                                     |

Writers (`release/v*`, `chore/derived-*`, සහ baselines සඳහා `chore/bank-ratchet-*`) නිදහස් කර ඇත; එක්
පවුලක් පමණක් සහ එහි සහායක ගොනු වෙනස් කරන PR එකක්ද එසේම නිදහස් වේ (`generated` සඳහා: generator scripts,
ඒවායේ tests, agent-skill inputs — `src/shared/constants/agentSkills.ts`, අතින් ලියන ලද `skills/**`
docs, `docs/openapi.yaml` — සහ `changelog.d/**`). උදාහරණයක් ලෙස, hero layout වෙනසක් එහි නැවත ජනනය කළ SVG
සමඟ, හෝ නැවත ජනනය කළ `SKILL.md` ගොනු කියවන test එකක් සහිත skills fix එකක් දැක්විය හැක. අතින් ලියන ලද
`<!-- skill:custom-start -->` block එකක් සහිත `SKILL.md` ගොනුවක් එම පවුලට අයත් නොවේ: එහි custom block එක
විශේෂාංගයක් අසලින් සංස්කරණය කළ හැකි ලෙස පවතී.

**එක් එක් gate mode එක සඳහා පරීක්ෂා කිරීම්** (`scripts/check/lib/gateMode.mjs`; සහායකය
`scripts/check/lib/derivedArtifactScope.mjs`):

| පරීක්ෂාව                                                                          | `release` (push, schedule, release PR, local)                                                 | `pr` (feature PR, queue batch)                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:agent-skills-sync`                                                         | සෑම skill එකක්ම generator output එකට සමාන විය යුතුය                                           | PR එක සංස්කරණය කරන generated text එක (custom block එකෙන් පිටත) හෝ `references/` ඇති skills පමණි; එසේ නොමැති නම් `SKIP reason=pr-mode`                                                                                           |
| `check:generated-artifacts` (README SVGs + e2e timings; සම්පූර්ණ ඉතිහාසය අවශ්යයි) | සෑම SVG එකක්ම එහි generator එකට සමාන විය යුතුය; සෑම spec එකකටම timings entry එකක් තිබිය යුතුය | PR එක සංස්කරණය කරන artifacts පමණි; අනෙක් ඒවා `SKIP reason=pr-mode`; diff base එකක් නොමැති නම් → සෑම artifact එකක්ම විනිශ්චය කෙරේ (fail-closed)                                                                                  |
| README SVG byte-compare tests (`tests/unit/docs/readme-*-svg.test.ts`)            | සෑම SVG එකක්ම                                                                                 | PR එක සංස්කරණය කරන SVG එකක් පමණි, base එක විසඳිය හැකි විට; `test-unit` හි shallow PR checkout එකට base එකක් නොමැති බැවින්, එහි test එක `SKIP reason=base-unresolved` සමඟ මඟහරින අතර සංසන්දනය `check:generated-artifacts` සතු වේ |
| e2e timings completeness (`tests/unit/balance-e2e-shards.test.ts`)                | සෑම spec එකකටම entry එකක් තිබිය යුතුය                                                         | SVG tests සඳහා ඇති එකම නියමය (නව spec එක median weight සමඟ ධාවනය වේ)                                                                                                                                                            |
| `check-quality-ratchet.mjs --require-tighten`                                     | bank නොකළ වැඩිදියුණු වීමක් අසමත් වේ (`_policy` හැර)                                           | වැඩිදියුණු වීම වාර්තා කෙරේ, කිසිවිටෙක අසමත් වීමක් නොවේ; regression එකක් තවමත් අසමත් වේ                                                                                                                                          |

Release මාදිලිය මෙම පරීක්ෂණ බෙදීමට පෙර තිබූ verdict, exit code සහ පණිවිඩ තබා ගනී; එක් කළ හැක්කේ උපරිම වශයෙන් එක් පේළියක් පමණක් වන අතර, එය විසඳූ මාදිලිය නම් කරයි (`[agent-skills-sync] mode=release (auto: local run)`)।  
පරීක්ෂණ `node:test` හි `{ skip: releaseOnlyUnlessTouched(...) }` විකල්පය හරහා මඟ හැරේ. `check:test-masking` එය report-only කොටසක ලැයිස්තුගත කරයි (එය `.skip(` හෝ `{ skip: true }` එකක් නොවන බැවින්, එය hard skip එකක් ලෙස ගණන් නොගනී). `check:generated-artifacts` මූලික අගය විසඳිය හැකි ස්ථානවල ක්රියාත්මක වේ: `lint` job එකේ (`fetch-depth: 0`), `check:agent-skills-sync` ට වහාම පසුව. දේශීයව, PR එකකදී එම පියවර තීරණය කරන්නේ කුමක්දැයි `npm run check:generated-artifacts -- --mode=pr` පෙන්වයි. `check:docs-counts` හි provider-total හරස් පරීක්ෂාව ("Provider reference total (doc vs live modules)") counts gate එකේ කොටසක් වන අතර, එම gate හිම modes අනුගමනය කරයි।

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
