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

CI සහ Quality Gates වැඩප්රවාහ දෙකම ස්ථාවර තීන්දුවක් නිකුත් කරයි: `Gate / CI` සහ
`Gate / Quality`. ඒවායේ අනුවාදගත ඇතුළත් කිරීමේ ප්රතිපත්තිය සෑම upstream job එකක්ම
අවශ්ය හෝ උපදේශාත්මක ලෙස ලැයිස්තුගත කරයි. අදාළ අවශ්ය job එකක් සාර්ථක විය යුතුය:
නොමැති, අවලංගු කළ, මඟහැරුණු, පොරොත්තුවේ පවතින සහ නොදන්නා ප්රතිඵලවලින් PASS
ස්ථාපිත කළ නොහැක. වලංගු docs-only හෝ catalog-only වර්ගීකරණයකින් code lane එකක්
අදාළ නොවන එකක් බවට පත් කළ හැක; draft PR එකක් පිළිගත් අපේක්ෂකයෙකු නොවේ. `hotfix`
ලේබලයකින් සාක්ෂි අවශ්යතාව ඉවත් නොවේ.

වැඩප්රවාහ දෙකම main/release ශාඛාවලට යොමු වන PR, `main` වෙත push, manual dispatch
සහ merge-group සිදුවීම් ආවරණය කරයි. Push, dispatch සහ merge-group මගින් සම්පූර්ණ
තේරීම ක්රියාත්මක වේ. `release/**` වෙත කරන push ඒවා ආරම්භ නොකරයි (2026-10-18):
සෑම වෙනසක්ම එහි PR මත matrix එක දැනටමත් ක්රියාත්මක කර ඇති අතර, ඒකාබද්ධ කළ
සංයෝජනය Release-Green හි වගකීමකි (`docs/ops/RUNNER_BOX.md` → Hosted lane).
Fork සහ merge group, සාමාන්යයෙන් self-hosted runners තෝරන jobs සඳහා hosted runners
භාවිත කරයි; rollout කිරීමට පෙර ප්රමාණවත් hosted ධාරිතාව සත්යාපනය කළ යුතුය.

සෑම JSON receipt එකක්ම checkout කළ SHA, workflow run සහ attempt හඳුනා ගනී.
CLI එක checkout/event SHA නොගැළපීම ප්රතික්ෂේප කරයි. නව හෝ ඉවත් කළ lane එකක්
නිහඬව අතුරුදන් විය නොහැකි බව තහවුරු කිරීමට, workflow tests ප්රතිපත්ති සාමාජිකත්වය
verdict job හි `needs` ලැයිස්තුවට බැඳ තබයි. Receipts මගින් ආවරණය කරන්නේ තමන්ගේම
workflow එක පමණි; publication, deployment හෝ පවතින advisory scanner එකක අභ්යන්තර
ක්රියාකාරිත්වය ඒවා ආවරණය නොකරයි. branch rules තුළ check names දෙකම සක්රීය කිරීම
වෙනම පරිපාලන වෙනසකි; මෙම jobs එක් කිරීමෙන් පමණක් branch එකක් ආරක්ෂා නොවේ.

### ස්ථිතික scan ඉන්වෙන්ටරිය

අනුවාදගත npm-alias ඉන්වෙන්ටරිය සහ static-scan සාමාජිකත්වය
`config/quality/gate-manifest.json` තුළ පවතී. `package.json` සමඟ script names සහ
නිශ්චිත commands වලංගු බව තහවුරු කිරීමට `npm run check:gate-manifest` ක්රියාත්මක
කරන්න; එකතු කිරීම්, ඉවත් කිරීම් සහ command drift යන සියල්ලම local hook එක සහ CI හි
change-classification jobs දෙකම අසමත් කරයි. Alias එකක් workflow job එකක්, matrix
instance එකක් හෝ test case එකක් නොවේ: මෙම ගණන් එකිනෙකට හුවමාරු කළ හැකි ලෙස
ඉදිරිපත් නොකළ යුතුය.

ක්රියාත්මක නොකර තෝරාගත් aliases පරීක්ෂා කිරීමට `npm run quality:scan -- --list`
හෝ `npm run quality:scan:fast -- --list` භාවිත කරන්න. Runner එක npm entrypoint එක
ආයාචනා කරන බැවින්, එහි runtime එක (වින්යාස කර ඇති විට Bun ඇතුළුව) සංරක්ෂණය වේ.
එම profiles වලින් පිටත aliases වෙනම ආයාචනා කරන බව manifest එක සටහන් කරයි; read-only
scan profiles තුළ maintenance commands තහනම් වේ.

මෙම profiles ආවරණය කරන්නේ static scan එක පමණි. ඒවා product tests, coverage,
packaging, external checks හෝ අපේක්ෂකයෙකුගේ සම්පූර්ණ release acceptance සහතික නොකරයි.
Workflow admission `config/quality/admission-policy.json` සහ
`scripts/quality/admission-verdict.mjs` සම්බන්ධ කර භාවිත කරයි. Release-observer
profiles වෙනම පවතී; ඒවාට අදාළ checks සහ receipts ස්වාධීනව පරීක්ෂා කරන්න. පහත
ගද්යමය ඉන්වෙන්ටරිය යොමු ද්රව්යයක් පමණි; gate එකක් සැබවින්ම ක්රියාත්මක වූ බවට
සාක්ෂියක් නොවේ.

Scripts `scripts/check/` (policy gates) සහ `scripts/quality/` (ratchet engine)
යටතේ පවතී. CI සඳහා සත්යයේ ප්රධාන මූලාශ්රය `.github/workflows/ci.yml` වේ.

### Release PR වේගවත් මාර්ගය (`quality.yml`)

`.github/workflows/quality.yml` මගින් main/release PR, `main` වෙත push,
dispatch සහ merge group සඳහා CI පූරණය කරයි. PR සඳහා path-filtered වේගවත් checks
භාවිත කරයි. ස්ථිරව අක්රීය කර තිබූ duplicate build ඉවත් කර ඇත; සැබෑ
build/package/boot checks CI තුළ ඉතිරිව පවතී.

| Job                                              | Scope                                                                                                                                                                                         | Blocking          |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `Docs Gates (fast-path)`                         | Docs/code PR; API docs refs සහ docs-all                                                                                                                                                       | ඔව්               |
| `Fast Quality Gates`                             | Code PR; static checks, typecheck, dashboard typecheck, බලපෑමට ලක් වූ unit tests                                                                                                              | ඔව්               |
| `Forgotten sibling tests`                        | Code PR; static consumers සහ candidate sibling tests වෙත සොයාගත් වෙනස් කළ modules; barrel සහ dynamic-import paths උපදේශාත්මක diagnostics ලෙස වාර්තා කරයි, referenced allowlist exceptions සමඟ | **උපදේශාත්මක**    |
| `Vitest (fast-path)`                             | Code PR; වේගවත් vitest suite                                                                                                                                                                  | ඔව්               |
| `Unit Tests fast-path`                           | Code PR; 4-shard unit suite                                                                                                                                                                   | ඔව්               |
| `No new ESLint warnings`                         | Code PR; suppressions-aware lint guard                                                                                                                                                        | ඔව්, forks ඇතුළුව |
| `Merge integrity (changelog + generated skills)` | Non-draft PR; changelog සහ generated skill sync                                                                                                                                               | ඔව්, forks ඇතුළුව |

#### Forgotten sibling tests වාර්තාව

`npm run check:forgotten-sibling-tests` යනු test-impact map පිටුපස ඇති import resolver නැවත භාවිත කරයි.
වෙනස් වූ සෑම production module එකක් සඳහාම, candidate test එක pull-request diff එකේ නොමැති විට,
එය නියත `changed module/symbol -> static consumer -> candidate sibling test` දාමයන් වාර්තා කරයි.
Markdown සාරාංශය සහ JSON ප්රතිඵලය, ඕනෑම blocking rollout එකකට පෙර calibration සඳහා
`forgotten-sibling-tests` workflow artifact ලෙස රඳවා ගනී.

Barrel re-exports සහ dynamic imports වන්නේ resolution diagnostics පමණි; ඒවා කිසිවිටෙක blocking
finding එකක් සාදන්නේ නැත. සමාලෝචනය කළ ව්යතිරේක
`config/quality/forgotten-sibling-allowlist.json` තුළ පිහිටයි. සෑම entry එකක්ම consumer සහ candidate
test නම් කළ යුතුය, නිශ්චිත හේතුවක් දිය යුතුය, සහ GitHub issue එකක් හෝ pull request එකක් සබැඳිය යුතුය.
වැරදි ස්වරූපයේ entries fail closed වේ. ව්යතිරේක මගින් මකා දැමූ candidate test එකක් හෝ `.skip`/`.todo`
එකතු කරන diff එකක් මැඩපවත්වා ගත නොහැක; assertion weakening සහ අනෙකුත් masking,
ස්වාධීනව blocking වන `check:test-masking` gate එකට අයත් වේ.

### කාර්යය: `lint`

`main` වෙත සෑම PR එකකම ධාවනය වේ. අසාර්ථක වූ විට merge වීම අවහිර කරයි.

| ස්ක්රිප්ට් (`npm run ...`)        | වලංගු කරයි                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | අවහිර කරන                                  |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Node.js අනුවාදය සහාය දක්වන පරාසය තුළ පවතී                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ඔව්                                        |
| `check:cycles`                    | `src/` + `open-sse/` සියල්ල හරහා චක්රීය imports (AST පාදක, tsconfig `paths` විසඳා ඇත). ඕනෑම චක්රයක් පවතින විට හුදෙක් (Bare) විධානය exit 1 වේ (fail-closed, #15281 සිට) සහ SCCs ලැයිස්තුගත කරයි. `check:cycles:ratchet` (CI ධාවනය කරන දෙය) ගණන `quality-baseline.json` හි `metrics.cycles` උපරිමය ඉක්මවන විට අවහිර කරයි — දැනට 14, `direction: down`, එබැවින් එයට අඩු වීමට පමණක් හැකිය (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ඔව් (ratchet)                              |
| `check:boundary`                  | `open-sse → src` සම්බන්ධතාව: engine සිට app වෙත අද්විතීය ගොනු-සිට-ගොනු imports (`scripts/quality/measure-boundary.mjs`; edge ලැයිස්තුව v4 core/module-split නිවැරදි කිරීමේ ලැයිස්තුවයි). හුදෙක් (Bare) = උපදේශන වාර්තාව (`quality:boundary` හා සමානයි). `check:boundary:ratchet` (CI ධාවනය කරන දෙය, `quality.yml` fast-gates ratchet loop තුළද ඇත) ගණන `quality-baseline.json` හි `metrics.boundaryOpenSseToSrc` උපරිමය ඉක්මවන විට අවහිර කරයි — මනින ලද 771 ට ආරම්භක අගය ලෙස සකසා ඇත, `direction: down`; `--update` එය අඩු කරන්නේ පමණි; PRs මත base-සාපේක්ෂ (`--base-ref`, පහත බලන්න)                                                                                                                                                                                                                                                                                            | ඔව් (ratchet)                              |
| `check:route-validation:t06`      | සියලු routes මත Zod schemas පවතී (Tier 6 ප්රතිපත්තිය)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ඔව්                                        |
| `check:any-budget:t11`            | `@ts-expect-error // any` ගණන අයවැය ඉක්මවා නොයයි (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ඔව්                                        |
| `check:provider-consistency`      | `providers.ts` හි ඇති සෑම provider එකකටම `providerRegistry.ts` හි ගැලපෙන සටහනක් ඇත (සහ අනෙක් අතට, allowlist තුළ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ඔව්                                        |
| `check:model-lifecycle`           | අතින් නඩත්තු කරන ලද routing වගු තුන, checked-in lifecycle snapshot (#11503) සමඟ අනුකූලව පවතී: `FITNESS_TABLE` (`taskFitness.ts`) මගින් `REGISTRY` හට route කළ හැකි retired id කිසිවක් score නොකරයි; සෑම `BUILT_IN_ALIASES` target එකක්ම `REGISTRY` හි පවතින අතර retired-id snapshot එකෙන් අතුරුදහන් වේ; `REGISTRY` හි තවමත් ඇති සෑම retired id එකක්ම forwarded වේ හෝ `allowedRetiredInCatalog` හි ලැයිස්තුගත කර ඇත; සහ `DEFAULT_DEGRADATION_MAP` source හෝ target කිසිවක් එම snapshot එකේ retired ලෙස නොපෙනේ. මෙයින් ඔප්පු නොවන්නේ මාදිලියක් දැනට සජීවී upstream එකක් මගින් serve වන බවයි. Offline — `config/quality/model-lifecycle.json` සමඟ සසඳයි, එය `npm run quality:refresh-model-lifecycle` මගින් අතින් refresh කරනු ලැබේ (network; CI වෙත සම්බන්ධ කර නැත). `allowedRetiredInCatalog` යනු burn-down ratchet එකකි: entry එකක් එකතු කරන්නේ tracking issue එකක් සමඟින් පමණි. | ඔව්                                        |
| `check:fetch-targets`             | client-side `src/` හි ඇති සෑම `fetch("/api/...")` එකක්ම සැබෑ `route.ts` එකකට resolve වේ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ඔව්                                        |
| `check:deps`                      | repo එකේ ඇති සෑම `package.json` එකකම `npm install` කළ හැකි සියලුම deps `dependency-allowlist.json` හි ඇත; නව unpinned හෝ slopsquatted packages flag කර ඇත                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ඔව්                                        |
| `audit:deps`                      | `npm audit` (root + electron) — high/critical advisories නැත (osv `check:vuln-ratchet` සමඟ අතිච්ඡාදනය වේ; Rationalization Backlog බලන්න)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ඔව්                                        |
| `check:lockfile`                  | `package-lock.json` අඛණ්ඩතාව — https registry, integrity hashes, host overrides නොමැත                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ඔව්                                        |
| `check:licenses`                  | production dependencies සඳහා SPDX බලපත්ර අනුමත ලැයිස්තුව                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ඔව්                                        |
| `check:tracked-artifacts`         | build artifacts / commit කළ `node_modules` symlinks නොමැත (husky pre-commit තුළද ක්රියාත්මක වේ; pre-push හිතාමතාම සැහැල්ලුයි — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ඔව්                                        |
| `check:ai-attribution`            | PR commits, title හෝ body තුළ AI/bot `Co-Authored-By` trailer හෝ AI-generation footer නොමැත — Hard Rule #16 (`quality.yml` හි PR→`release/**` සඳහා fast-gates loop තුළ — event payload කියවයි, PR නොවන විට no-op — සහ PR→`main` සඳහා `ci.yml` lint හි PR-only step එකක්; husky `commit-msg` hook ද; මානව co-authors සඳහා අවසරයි; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ඔව්                                        |
| `check:vitest-exclusions`         | සෑම Vitest exclusion එකක්ම tracking issue එකක් නම් කරන අතර `config/quality/vitest-exclusions.json` තුළ දිස්වේ (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ඔව්                                        |
| `check:file-size`                 | මූලාශ්ර ගොනු (`src/`, `open-sse/`, `electron/`, `bin/` තුළ `.ts`/`.tsx`) `cap` තුළත්, පරීක්ෂණ ගොනු (`*.test.ts(x)`) `testCap` තුළත් රැඳිය යුතුය; `file-size-baseline.json` (`frozen` / `testFrozen`) තුළ freeze කළ ගොනු ඒවායේ සටහන් කළ ප්රමාණය ඉක්මවා වර්ධනය නොවිය යුතුය                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ඔව්                                        |
| `check:error-helper`              | executors/handlers තුළ දෝෂ ප්රතිචාර `buildErrorBody()` / `sanitizeErrorMessage()` භාවිතා කරයි (දැඩි නියමය #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ඔව්                                        |
| `check:migration-numbering`       | Migration SQL ගොනු අනුක්රමිකව අංකනය කර ඇත, හිඩැස් හෝ අනුපිටපත් නොමැත                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ඔව්                                        |
| `check:public-creds`              | `publicCreds.ts` වලින් පිටත සෘජු OAuth `client_id`/`client_secret` හෝ Firebase Web යතුරු නොමැත (දැඩි නියමය #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ඔව්                                        |
| `check:db-rules`                  | `src/lib/db/` මොඩියුල වලින් පිටත අමු SQL නොමැත; `localDb.ts` වෙතින් barrel-imports නොමැත (දැඩි නියම #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ඔව්                                        |
| `check:known-symbols`             | ඔවුන්ගේ dispatch tables තුළ ලියාපදිංචි කර ඇති Provider executors, routing strategies සහ translators තැටියේ ඇති ගොනු සමඟ ගැළපේ — අනාථ හෝ ප්රකාශ නොකළ සංකේත නොමැත                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ඔව්                                        |
| `check:route-guard-membership`    | ළමා ක්රියාවලියක් බිහි කරන සෑම මාර්ගයක්ම `isLocalOnlyPath()` මගින් වර්ගීකරණය කර ඇත (දැඩි නියම #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ඔව්                                        |
| `check:test-discovery`            | රෙපෝ එකේ ඇති සෑම `*.test.ts` / `*.spec.ts` ගොනුවක්ම අවම වශයෙන් එක් ටෙස්ට් රනරයක් විසින් එකතු කරගනු ලැබේ (රැට්චෙට්: `test-discovery-baseline.json` හි ඇති orphan ලැයිස්තුව අඩු වීමට පමණක් හැකිය)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ඔව්                                        |
| `check:test-tla-order`            | `tests/unit` යටතේ ඇති කිසිදු `node:test` ගොනුවක් ටෙස්ට් එකක් ලියාපදිංචි කර, top-level `await` එකක් ක්රියාත්මක කර, පසුව තවත් ලියාපදිංචි නොකරයි (#18045; රැට්චෙට්: `test-tla-order-allowlist.json` අඩු වීමට පමණක් හැකිය)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ඔව්                                        |
| `check:agent-skills-sync`         | ජනනය කරන ලද agent-skills ප්රතිදාන ඒවායේ මූලාශ්ර නාමාවලිය සමඟ ගැළපේ (කිසිදු අපගමනයක් නැත)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:provider-asset-provenance` | Provider ලාංඡන/asset සඳහා වාර්තාගත provenance සටහනක් ඇත                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `lint:json`                       | JSON වින්යාස ගොනු parse වන අතර රෙපෝ lint නීති සපුරාලයි                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `typecheck:core`                  | දෝෂ රහිතව TypeScript සම්පාදනය (උපදේශාත්මක අවවාද පමණි)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ඔව්                                        |
| `typecheck:noimplicit:core`       | දැඩි `noImplicitAny` — අනාගතය ඉලක්ක කරගත්; පවතින බොහෝ call sites සඳහා තවමත් type annotations අවශ්ය වේ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | **උපදේශාත්මක** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` `src/app/(dashboard)/**` වෙත සීමා කර ඇත (#7033) — `typecheck:core` හි තෝරාගත් 27-ගොනු allowlist එකට dashboard TSX කිසිවක් ඇතුළත් නොවන අතර, `next build` මඟින්ද එය type-check නොකරයි (`next.config.mjs` හි `ignoreBuildErrors: true` සකසා ඇත). එබැවින් එහි ඇති orphaned-identifier regressions (#6625/#6909) CI වෙත නොපෙනී තිබුණි. ස්ථිර කළ එක්-ගොනුවකට/TS-code එකකට අදාළ ගණන් කිරීමේ baseline එකකට එරෙහිව වෙනස්කම් පරීක්ෂා කරයි (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` හි stale-enforcement රටාවට සමානව) — baseline කර ඇති ගණන ඉක්මවන **නව** errors පමණක් gate එක අසමත් කරයි; පෙර සිට පැවති error එකක් නිවැරදි කළ විට `--update` සමඟ ratchet down කරන්න.                                                                                                                                                                               | ඔව්                                        |

### Job: `quality-gate`

`test-coverage` පසුව ධාවනය වේ. අසමත් වුවහොත් merge අවහිර කරයි.

| Script                       | Validates                                                                                                                                                                   | Blocking                  |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | `quality-metrics.json` නිකුත් කරයි (ESLint warning ගණන, ඒකාබද්ධ shard report වෙතින් coverage)                                                                               | ඔව් (ratchet හි upstream) |
| `quality:ratchet`            | `quality-baseline.json` හි ඇති සෑම metric එකක්ම regression එකකට ලක් වී නොමැත (ESLint warnings ≤ baseline; coverage ≥ baseline)                                              | ඔව්                       |
| `check:duplication`          | Code duplication (jscpd@4) `quality-baseline.json` හි baseline එක ඉක්මවා නොයයි                                                                                              | ඔව්                       |
| `check:complexity`           | ගොනු මට්ටමේ cyclomatic complexity සීමාව ඉක්මවා නොයයි (core ESLint `complexity` + `max-lines-per-function`)                                                                  | ඔව්                       |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — වෙනම ESLint pass එකක්; CI මඟින් දෙකම තනි `check:complexity-ratchets` පියවරක් ලෙස ඒකාබද්ධ කර ධාවනය කරයි             | ඔව්                       |
| `check:dead-code`            | භාවිත නොවන exports / files සඳහා වන ratchet (knip) baseline එකට සාපේක්ෂව regression නොපෙන්වයි                                                                                | ඔව්                       |
| `check:compression-budget`   | Compression benchmark budget — එක් එක් engine එක සඳහා token-savings floors regression නොපෙන්වයි                                                                             | ඔව්                       |
| `check:type-coverage`        | Percent-typed ratchet (`type-coverage`) regression නොපෙන්වයි; `typecheck:noimplicit:core` බොහෝ දුරට මෙයට ඇතුළත් වේ                                                          | ඔව්                       |
| `check:codeql-ratchet`       | විවෘත CodeQL alert ගණන regression නොපෙන්වයි (`gh api` හරහා කියවයි; token නොමැති විට graceful-skip කරයි) — refresh cadence සහ manual trigger සඳහා පහත "CodeQL ratchet" බලන්න | ඔව්                       |

### Job: `quality-extended`

සම්පූර්ණ job එකම උපදේශාත්මක වේ (`continue-on-error: true`). npm-පාදක ratchets සැබෑ ලෙස ධාවනය වේ; බාහිර scanners `gh release download` හරහා ස්ථාපනය කර binary එකක් තවමත් නොමැති නම් තමන්ම skip කරයි (exit 0).

| Script                   | Validates                                                                                                                                                                                                              | Blocking                                                  |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `check:circular-deps`    | Circular dependencies නොමැත (dpdm)                                                                                                                                                                                     | **උපදේශාත්මක**                                            |
| `check:bundle-size`      | Bundle size සීමාව ඉක්මවා නොයයි                                                                                                                                                                                         | **උපදේශාත්මක**                                            |
| `check:secrets`          | Secret scanning (gitleaks) — binary එක නොමැති නම් skip කරයි                                                                                                                                                            | **උපදේශාත්මක**                                            |
| `check:vuln-ratchet`     | Dependency vulnerabilities (osv-scanner) regression නොපෙන්වයි — binary එක නොමැති නම් skip කරයි                                                                                                                         | **උපදේශාත්මක**                                            |
| `check:workflows`        | Workflow lint (actionlint + zizmor); scanners නොමැති/බිඳී ඇති විට, reports අවලංගු වූ විට හෝ ratchet baseline නොමැති විට INCOMPLETE ලෙස අසමත් වේ. වලංගු findings තෝරාගත් strict/advisory/ratchet policy එක අනුගමනය කරයි | ක්රියාත්මක කිරීම අවශ්යයි; CI හි zizmor ratchet අවහිර කරයි |
| `check:openapi-breaking` | Base branch එකට සාපේක්ෂව public API contract (`openapi.yaml`) හි breaking changes (oasdiff) — `openapiBreaking=N` නිකුත් කරයි; oasdiff නොමැති නම් හෝ base spec විසඳිය නොහැකි නම් skip කරයි                             | **උපදේශාත්මක**                                            |

### Job: `docs-sync-strict`

`main` වෙත සිදුකරන සෑම PR එකකම ධාවනය වේ. අසමත් වුවහොත් merge අවහිර කරයි.

| ස්ක්රිප්ට්                     | වලංගු කරයි                                                                                                                                     | අවහිර කරන                   |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `check:docs-all`               | පහත උප-ගේට් 6 අනුපිළිවෙලින් ධාවනය කරන මෙටා-ගේට් එකක්                                                                                           | ඔව්                         |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt අනුවාද අනුකූලතාව                                                                                                 | ඔව්                         |
| ↳ `check:docs-counts`          | ගද්යයේ ඇති ගණනයන් (සපයන්නා ගණන, සංක්රමණ ගණන ආදිය) සැබෑ ගණනයන්ගේ රැචෙට් කවුළුව තුළ පවතී                                                         | ඔව්                         |
| ↳ `check:env-doc-sync`         | `.env.example` හි ඇති සෑම env විචල්යයක්ම ලේඛන වගුවක ලේඛනගත කර ඇති අතර, අනෙක් අතටත් එසේය                                                        | ඔව්                         |
| ↳ `check:deprecated-versions`  | ලේඛනවල කල් ඉකුත් වූ අනුවාද තන්තු නොමැත                                                                                                         | ඔව්                         |
| ↳ `check:doc-links`            | ලේඛනවල ඇති අභ්යන්තර markdown සබැඳි සැබෑ ගොනු වෙත විසඳේ (`[text]`/`(path)` ආකෘතිය)                                                              | ඔව්                         |
| ↳ `check:fabricated-docs`      | ලේඛනවල උපුටා දක්වා ඇති මාර්ග, env විචල්ය, CLI විධාන, hook නම් සහ ගොනු මාර්ග කේත පදනමේ පවතී. `--strict` හරහා දෘඩ ගේට්; ධජය නොමැතිව මෘදු-අසාර්ථ. | ඔව් (CI හි `--strict` හරහා) |
| `check:cli-i18n`               | CLI විධාන තන්තු සියලු i18n භාෂා ගොනුවල පවතී                                                                                                    | ඔව්                         |
| `check:openapi-coverage`       | OpenAPI පිරිවිතරය සැබෑ මාර්ගවල රැචෙට් කළ අවම මට්ටම අවම වශයෙන් ආවරණය කරයි                                                                       | ඔව්                         |
| `check:openapi-security-tiers` | `openapi.yaml` හි ආරක්ෂක ස්ථර සටහන් `routeGuard.ts` වර්ගීකරණ සමඟ අනුකූලය                                                                       | **උපදේශාත්මක**              |
| `check:openapi-routes`         | `openapi.yaml` හි සෑම මාර්ගයක්ම සැබෑ `route.ts` වෙත විසඳේ (මිත්යා-විරෝධී)                                                                      | ඔව්                         |
| `check:docs-symbols`           | `docs/**/*.md` හි සෑම `/api/...` යොමුවක්ම සැබෑ `route.ts` වෙත විසඳේ (මිත්යා-විරෝධී)                                                            | ඔව්                         |
| `i18n translation drift`       | i18n භාෂා ගොනුවල පරිවර්තනය නොකළ යතුරු — අනතුරු ඇඟවීම පමණි                                                                                      | **උපදේශාත්මක**              |

`docs/diagrams/` යටතේ ඇති README SVG දොළහ ජනනය කරනු ලැබේ (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` මගින් ඒ සියල්ල නැවත ජනනය කරයි). එක් එක් ගොනුවට byte-compare ඒකක පරීක්ෂණයක්
ඇත (`tests/unit/docs/readme-*-svg.test.ts`, රැකියාව `test-unit`) එය කමිට් කළ ගොනුව කල් ඉකුත් වූ විට අසාර්ථ වේ, සහ
`check:docs-counts` ඒවායේ `<text>` නෝඩ්වලින් කැනොනිකල් සංඛ්යා කියවයි — එබැවින් සංඛ්යා කිසි විටෙකත් මාර්ග
ලෙස outline නොකෙරේ. SVG කැනොනිකල්-සංඛ්යා පරීක්ෂාව `SVG_DIAGRAM_FILES`
(`scripts/check/check-docs-counts-sync.mjs`) හි ලැයිස්තුගත කර ඇති ගොනු කියවයි: `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, සහ `public/images/tier-flow-dark.svg` සහ `tier-flow-light.svg`; free-forever, catalog-entry,
recurring-pool සහ scoring-factors හිමිකම් ද `promise-pillars.svg`, `free-tier-budget.svg` සහ
`strategies-grid.svg` කියවයි. `free-tier-budget.svg` එහි සංඛ්යා live catalog loader වෙතින් ලබා ගනී, එබැවින්
`FREE_MODEL_BUDGETS` වෙත හෝ සපයන්නාගේ දර්ශන නාමයට සිදු වන වෙනසක් එම ගොනුව නැවත ජනනය කරන තෙක් CI රතු කරයි.

### රැකියාව: `i18n-ui-coverage`

| ස්ක්රිප්ට්                        | වලංගු කරයි                                                                                                                                                                              | අවහිර කරන      |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | UI i18n යතුරු ආවරණය ≥ 65%                                                                                                                                                               | ඔව්            |
| `check-ui-value-drift` (inline)   | නැවත ලියන ලද ඉංග්රීසි **අගයක්** පසුපස කල් ඉකුත් වූ පරිවර්තනයක් ඉතිරි නොකරයි                                                                                                             | ඔව්            |
| `check-new-key-coverage` (inline) | **නව** ඉංග්රීසි යතුරක් සෑම භාෂාවකම පරිවර්තනය කර ඇත — `__MISSING__:` සලකුණක් ප්රතික්ෂේප වේ                                                                                               | ඔව්            |
| `check-translation-ratio`         | එක් එක් භාෂාව සඳහා සැබෑ-පරිවර්තන අනුපාතය (ඉංග්රීසියට සමාන / placeholder / අස්ථානගත කොළ අනුමත ලැයිස්තුවෙන් පිටත) `config/quality/i18n-translation-baseline.json` + slack නොඉක්මවිය යුතුය | **උපදේශාත්මක** |

`fetch-depth: 0` අවශ්යයි — value-drift ගේට් එක `en.json` merge base සමඟ වෙනස්කම් සසඳයි.

#### `check-ui-value-drift` — කල් ඉකුත් පරිවර්තන ගේට්

අනෙකුත් ගේට්ටුවලට ව්යුහාත්මකව හඳුනාගත නොහැකි එක් i18n regression එකක් මෙය හඳුනාගනී: ඉංග්රීසි අගයක්
නැවත ලියා ඇති නමුත්, _පෙර_ ඉංග්රීසි අගයෙන් ව්යුත්පන්න කළ පරිවර්තන එලෙසම පවතින බැවින්,
ඉංග්රීසි නොවන පරිශීලකයන් විශ්වාසදායක ලෙස පෙනෙන නමුත් දැන් වැරදි copy එක කියවමින් සිටී.

මෙය සැබෑ ලෙසම නිකුත් විය. Antigravity
login helper එක එක් කළ විට `oauthModal.googleOAuthWarning` නැවත ලියන ලදී (#5203); **භාෂා 43න් 39ක්** operators හට
"සම්පූර්ණ URL එක copy කර පහතින් paste කරන්න" යනුවෙන් කියන පෙළ තබාගෙන සිටියහ — එම provider සඳහා සම්පූර්ණ කළ
නොහැකි flow එකකි. #8463 දක්වා මෙය හඳුනා නොගැනීමට හේතු වූයේ:

- `sync-ui-keys` backfill කරන්නේ **නොමැති** keys පමණක් වන අතර, **stale** ඒවා කිසිවිටෙක නොවේ;
- `check-ui-keys-coverage` key _පවතිනවාද_ යන්න ගණනය කරන බැවින්, stale translation එකක් covered ලෙස ලකුණු වේ;
- `check-translation-drift` `docs/i18n/<locale>/**.md` documentation mirrors නිරීක්ෂණය කරයි —
  එය කිසිවිටෙක `src/i18n/messages/*.json` කියවන්නේ නැත. 2026-09 re-sync සිට `docs-sync-strict` job එකේ අවහිර කරයි:
  core doc එකක් සංස්කරණය කරන්න → `npm run i18n:run -- --files=<doc>` (section-level, අඩු වියදම්).

**Diff-aware, baseline-backed නොවේ.** මෙය merge base හි `en.json` working tree එක සමඟ සසඳයි; ඉංග්රීසි අගය
වෙනස් වූ සෑම key එකක් සඳහාම, කිසිදු වෙනසකට ලක් නොකළ translation එකක් තවමත් තබාගෙන සිටින ඕනෑම locale එකක් stale වේ.
මෙය හිතාමතාම **පෙර සිට පැවති debt එක freeze කරයි** — දිගුකාලීන translation එකක් පැමිණියේ කුමන පැරණි
ඉංග්රීසි අගයෙන්දැයි diff එකකට හෙළි කළ නොහැකි බැවින්, gate එක විනිශ්චය කරන්නේ වත්මන් වෙනස ස්පර්ශ කරන
දේවල් පමණි. විකල්පය (එක් එක් key එකකට hash baseline එකක්) සඳහා ~600 KB generated file එකක් වැය වන අතර,
එය දැනට පවතින විශාලතම baseline එක මෙන් 3× වන අතර, සෑම i18n PR එකකදීම වෙනස් වේ.

එය සපුරාලීමට ක්රම දෙකක් ඇත:

1. බලපෑමට ලක් වූ translations යාවත්කාලීන කරන්න, හෝ
2. ඒවා `__MISSING__:<new english>` ලෙස සකසන්න — එවිට runtime එක නිවැරදි කළ ඉංග්රීසි සේවය කරයි
   (`src/i18n/request.ts::deepMergeFallback`, #7258) සහ key එක translation සඳහා queue වේ.

String එකේ **අර්ථය** වෙනස් වී ඇත්නම්, **key එක rename කිරීම** වඩාත් සුදුසුය: නව key එකකට stale
translation එකක් උරුම කරගත නොහැක. #8463 භාවිත කළ රටාව එයයි.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Base catalog එක කියවිය නොහැකි විට (base ref නොමැති shallow clone එකක්), `SKIP reason=base-unresolved` සමඟ
0 exit වේ; මෙය `check-openapi-breaking` හි හැසිරීම අනුකරණය කරයි.

### Job: `i18n`

සම්පූර්ණ i18n validation matrix එක (එක් locale එකකට එක් job එකක්). සම්පූර්ණ job එකම උපදේශාත්මක වේ.

| Script                          | Validates                                   | Blocking                                                   |
| ------------------------------- | ------------------------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | එක් එක් locale එකේ translation completeness | **උපදේශාත්මක** (`continue-on-error: true` whole job එක මත) |

### Job: `pr-test-policy`

Pull requests මත පමණක් ධාවනය වේ.

| Script                 | Validates                                                                                                                                  | Blocking |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, හෝ `bin/` තුළ production code වෙනස් කරන PRs සඳහා tests එක් කළ යුතු හෝ යාවත්කාලීන කළ යුතුය (Hard Rule #8) | Yes      |
| `check:test-masking`   | වෙනස් කළ test files මඟින් net assert count අඩු නොකරන අතර `assert.ok(true)` tautologies එක් නොකරයි                                          | Yes      |
| `check:pr-evidence`    | වෙනස සඳහා test/VPS evidence PR body එකේ සඳහන් කරයි (PR prose grep කිරීමෙන් Hard Rule #18 ක්රියාත්මක කරයි — බිඳෙනසුලුය, Backlog බලන්න)      | Yes      |

### Job: `test-vitest`

`build` පසු ධාවනය වේ. අසාර්ථක වුවහොත් merge අවහිර කරයි.

| Suite            | Validates                                                  | Blocking                                                                                                           |
| ---------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP server (tools 110ක්), autoCombo, cache — vitest runner | Yes                                                                                                                |
| `test:vitest:ui` | UI component tests — vitest runner                         | **Blocking** — පෙර සිට පැවති failures `vitest.config.ts` තුළ පැහැදිලිව ඉවත් කර ඇත; නව failures job එක අසාර්ථක කරයි |

### Nightly workflows (scheduled, advisory)

මේවා cron schedule එකකට (සහ `workflow_dispatch`) ධාවනය වන අතර, PRs මත කිසිවිටෙක ධාවනය නොවේ. සියල්ල උපදේශාත්මක වේ.

| කාර්ය ප්රවාහය          | වලංගු කරන දේ                                                                                                                                                      | අවහිර කිරීම    |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | අහඹු seed එකක් සමඟ ඉහළ ධාවන ගණනක් සහිත fast-check property පරීක්ෂණ                                                                                                | **උපදේශාත්මක** |
| `nightly-resilience`   | heap වර්ධන ද්වාරය, chaos දෝෂ එන්නත්කරණය, k6 බර/soak                                                                                                               | **උපදේශාත්මක** |
| `nightly-llm-security` | promptfoo injection ආරක්ෂකය (block mode) + garak පරීක්ෂණ (සැපයුම්කරු රහසක් නොමැතිව මඟ හරියි)                                                                      | **උපදේශාත්මක** |
| `nightly-schemathesis` | සජීවී OmniRoute එකක් සමඟ `docs/openapi.yaml` භාවිතා කරමින් OpenAPI කොන්ත්රාත් fuzzing (schemathesis) — spec උල්ලංඝනයන් / හසුරුවා නොගත් 500s මතු කරයි (Fase 8 B.4) | **උපදේශාත්මක** |
| `nightly-mutation`     | වේගවත් unit lane එක මත Stryker mutation-testing ලකුණු ප්රමාණය — ඉතිරි වන mutants දුර්වල asserts මතු කරයි                                                          | **උපදේශාත්මක** |
| `nightly-compat`       | සහාය දක්වන `engines.node` පරාස හරහා Node engine අනුකූලතා න්යාසය                                                                                                   | **උපදේශාත්මක** |

කාර්ය සාධන මූලික රේඛා (heap, TTFB, build time) සටහන් වේ, gate නොකෙරේ: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) බලන්න (`npm run perf:lts-baseline`).

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
