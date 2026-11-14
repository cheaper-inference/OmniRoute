# Quality Gates Reference (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Dan id-dokument huwa r-referenza awtorevoli għall-gates kollha tal-kwalità tas-CI f’OmniRoute.
Jiddeskrivi kull gate, x’jivvalida, f’liema job tas-CI jitħaddem, jekk jużax
linja bażi ratchet jew politika ta’ suċċess/falliment, u jekk jimblokkax il-build jew huwiex konsultattiv.

Għal sommarju qasir u l-politika tal-allowlist, ara t-taqsima "Quality Gates & Ratchets"
f’`AGENTS.md`. Għall-valutazzjoni kritika, il-klassifikazzjoni tal-maturità, u l-pjan
ta’ replikazzjoni indipendenti mill-għodda tal-istess sistema, ara l-
[Manwal tal-Gates tal-Kwalità](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inventarju tal-bieb u profili ta 'eżekuzzjoni

### Dħul tal-kandidat

Il-flussi tax-xogħol CI u Quality Gates kull wieħed jarmu verdett stabbli: `Gate / CI` u `Gate / Quality`. Il-politika ta' ammissjoni verġjonata tagħhom tinnumera kull xogħol upstream kif meħtieġ jew konsultattiv. Xogħol meħtieġ applikabbli għandu jirnexxi: riżultati nieqes, ikkanċellati, maqbuż, pendenti u mhux magħrufa ma jistgħux jistabbilixxu PASS. Klassifikazzjoni valida ta' docs-only jew ta' katalgu biss tista' tagħmel korsija tal-kodiċi inapplikabbli; abbozz PR mhux kandidat a//ettat. Tikketta `hotfix` ma tirrinunzjax evidenza.

Iż-żewġ flussi tax-xogħol ikopru PRs f'fergħat main/release, pushes to `main`, dispaċċ manwali u avvenimenti ta' grupp ta' amalgamazzjoni. Imbotta, dispaċċ u merge-group imexxu l-għażla sħiħa. Pushes għal `release/**` ma jibdewhom (2026-10-18): kull bidla diġà dam il-matriċi fuq PR tagħha u l-kombinazzjoni magħquda hija l-impjieg ta 'Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane). Il-frieket u l-gruppi jingħaqdu jużaw runners ospitati għal impjiegi li inkella jagħżlu runners li jospitaw lilhom infushom; kapaċità ospitata suffiċjenti għandha tiġi vverifikata qabel it-tnedija.

PR ordinarja tmexxi l-għażla veloċi. Il-korsiji `full-code` u `full-code-e2e` tal-politika tad-dħul (E2E, integrazzjoni, pakkett artifact, Electron smoke, Bun SQLite, ekosystem and protocol clients) jimxu biss fuq Mergify queue draft jew fuq run sħiħa: `gh workflow run ci.yml --ref <branch>`.

Kull irċevuta JSON tidentifika l- SHA iċċekkjat, il-fluss tax-xogħol u t-tentattiv. CLI jirrifjuta checkout/event SHA diskrepanza. It-testijiet tal-fluss tax-xogħol jorbtu s-sħubija tal-politika mal-lista `needs` tax-xogħol tal-verdett sabiex korsija ġdida jew imneħħija ma tistax tisparixxi fis-skiet. L-irċevuti jkopru l-fluss tax-xogħol tagħhom stess, mhux il-pubblikazzjoni, l-iskjerament, jew l-intern ta 'skaner konsultattiv eżistenti. L-attivazzjoni taż-żewġ ismijiet tal-kontroll fir-regoli tal-fergħat hija bidla amministrattiva separata; iż-żieda ta' dawn l-impjiegi ma tipproteġix fergħa hi stess.

### Merge kju

It-tikketta `queue` tibgħat PR lill-kju Mergify (`.mergify.yml`). Mergify tiftaħ abbozz PR fuq fergħa `mergify/merge-queue/`, CI imexxi l-għażla sħiħa hemmhekk, u l- PR oriġinali jingħaqad meta jgħaddu `Gate / CI`, `Gate / Quality` u `Merge integrity (changelog + generated skills)`.

Mergify jikteb is-sommarju tal-kju tiegħu fid-deskrizzjoni tal-abbozz, u apps oħra jistgħu jeditjawh ukoll. Avveniment `pull_request` `edited` fuq abbozz bħal dan jieħu l-grupp tal-konkorrenza tiegħu stess (`-queue-edit-<run_id>`) u għalhekk ma jistax jikkanċella l-ġirja reali tal-abbozz, u taqbeż il-bieb u l-matriċi. Biss `Merge integrity` ghadu jigri. Ix-xogħol ta' gate skipped għandu isem ta' kontroll differenti, minħabba li Mergify jaqra `Gate / CI` skipped bħala verifika falluta u tneħħi PR.

Wara dequeue, push mhux dejjem jerġa' jpoġġi l- PR. Ikkummenta `@mergifyio queue` fuqha.

### Evidenza miżmuma fir-reducer ta 'aċċettazzjoni

`scripts/quality/validate-release-acceptance.mjs` tnaqqas pjan fornut u l-manifesti taghha; ma jistabbilixxix li l-pjan ikopri l-pipeline tar-rilaxx sħiħ. Ir-rapporti tagħha jistabbilixxu b'mod espliċitu `releaseAcceptance: false`, anki meta dak il-pjan huwa `VERIFIED`. Il-fluss tax-xogħol `release-acceptance.yml` għadu juża shadow fixtures, mhux irċevuti ta 'bini reali, pakkett, boot jew promozzjoni.

Iż CLI teħtieġ `--evidence-root` tivverifika l-evidenza miżmuma. Il-fajls jiġu solvuti bħala `<evidence-root>/<artifact_id>/<member>` u bil-haxx bħala SHA-256. Rekord PASS mingħajr evidenza, fajl nieqes jew mibdul, passaġġ mhux sikur jew symlink jipprevjeni l-verifika. Fajls neqsin mhumiex ekwivalenti għal zkuk ta' suċċess vojta. Il-kontrolli SHA/run/attempt eżistenti jibqgħu indipendenti: bytes li jaqblu ma jistgħux isalvaw irċevuta skaduta. L-integrità tal-fajl mhijiex prova tal-awtentiċità tal-eżekuzzjoni jew il-promozzjoni tal-artifact.

### Inventarju ta 'skannjar statiku

L-inventarju verżjoni npm-alias u s-sħubija static-scan jgħixu `config/quality/gate-manifest.json`. Mexxi `npm run check:gate-manifest` biex tivvalida l-ismijiet tal-iskript u l-kmandi eżatti kontra `package.json`; iż-żidiet, it-tneħħija u d-drift tal-kmand ifallu kemm il-ganċ lokali kif ukoll l-impjiegi tal-klassifikazzjoni tal-bidla CI. Psewdonimu mhuwiex xogħol ta' fluss tax-xogħol, istanza ta' matriċi jew każ ta' test: dawn l-għadd m'għandhomx jiġu ppreżentati bħala interkambjabbli.

Uża `npm run quality:scan -- --list` jew `npm run quality:scan:fast -- --list` biex tispezzjona l-psewdonimi magħżula mingħajr ma tesegwihom. Ir-runner jinvoka l-punt tad-dħul npm, għalhekk ir-runtime tiegħu (inkluż Bun fejn ikkonfigurat) huwa ppreservat. Il-manifest jirreġistra psewdonimi barra dawk il-profili kif invokati separatament, u l-kmandi tal-manutenzjoni huma pprojbiti fil-profili tal-iskannjar li jinqraw biss.

Dawn il-profili jkopru l-iskan statiku biss. Ma jiċċertifikawx it-testijiet tal-prodott, il-kopertura, l-ippakkjar, il-kontrolli esterni jew l-aċċettazzjoni tar-rilaxx sħiħ tal-kandidat. Id-dħul tal-fluss tax-xogħol juża `config/quality/admission-policy.json` u `scripts/quality/admission-verdict.mjs` konnessi. Il-profili tal-osservatur tar-rilaxx jibqgħu separati; jispezzjonaw il-kontrolli u l-irċevuti applikabbli tagħhom b'mod indipendenti. Il-kmandi statiċi sħaħ tal-osservatur huma ddikjarati `config/quality/release-green-static-profile.json`, inklużi `audit:deps`, l-għażla tat-test tal-mutazzjoni u l-kontrolli tat-traduzzjoni. Il-loader jivvalida kmandi npm kontra dikjarazzjonijiet package.json u CI/Quality immudellati; tirrifjuta drift minflok tesegwixxi shell tokens bħala argumenti. L-output SKIP/INCOMPLETE tal-iskaner meħtieġ ma jistax jistabbilixxi PASS. Il-profil jirreġistra l-esklużjonijiet esterni tiegħu u ma jissostitwixxix il-kopertura ospitata, il-matriċi tat-test, il-pakkett jew l-evidenza tal-iskjerament. L-inventarju tal-proża hawn taħt huwa referenza, mhux prova li gate fil-fatt dam.

Skripts jgħixu taħt `scripts/check/` (policy gates) u `scripts/quality/` (ratchet engine). Is-sors CI tal-verità huwa `.github/workflows/ci.yml`.

### Eħles PR fast-path (`quality.yml`)

`.github/workflows/quality.yml` tikkumplimenta CI fuq main/release PRs, timbotta għal `main`, tibgħat u tgħaqqad gruppi. PRs juża kontrolli veloċi ffiltrati mill-mogħdija. Il-bini duplikat b'diżabbiltà permanenti tneħħa; il-kontrolli build/package/boot reali jibqgħu CI. L-unità suite u vitest jimxu biss CI (`Unit Tests (N/8)` u `Vitest`).

| Job                                              | Ambitu                                                                                                                                                | Imblukkar            |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs u docs-all                                                                                                               | Iva                  |
| `Fast Quality Gates`                             | Code PRs; kontrolli statiċi, verifika tat-tip, verifika tat-tip tad-dashboard, testijiet tal-unità milquta, testijiet ta' aħwa minsija (konsultattiv) |
| `No new ESLint warnings`                         | Code PRs; gwardja tal-lint konxja tas-soppressjonijiet                                                                                                | Iva, inklużi frieket |
| `Merge integrity (changelog + generated skills)` | Non-draft PRs; changelog u s-sinkronizzazzjoni tal-ħiliet ġġenerati                                                                                   | Iva, inklużi frieket |

#### Rapport tat-testijiet tal-aħwa minsija

`npm run check:forgotten-sibling-tests` jimxi bħala pass konsultattiv ta' `Fast Quality Gates` u juża mill-ġdid is-solvent tal-importazzjoni wara l-mappa tal-impatt tat-test. Għal kull modulu ta 'produzzjoni mibdul, jirrapporta ktajjen `changed module/symbol -> static consumer -> candidate sibling test` deterministiċi meta t-test tal-kandidat ikun assenti mid-diff tat-talba tal-ġibda. Is-sommarju tal-Markdown u r-riżultat JSON jinżammu bħala l-artifact tal-fluss tax-xogħol `forgotten-sibling-tests` għall-kalibrazzjoni qabel kwalunkwe rollout li jimblokka.

L-esportazzjoni mill-ġdid tal-barmil u l-importazzjonijiet dinamiċi huma dijanjostiċi tar-riżoluzzjoni biss; huma qatt ma joħolqu sejba imblukkata. Eccezzjonijiet riveduti live in `config/quality/forgotten-sibling-allowlist.json`. Kull entrata trid issemmi t-test tal-konsumatur u l-kandidat, tagħti raġunament speċifiku, u torbot kwistjoni GitHub jew pull request. L-entrati fformati ħażin ma jingħalqu. Eċċezzjonijiet ma jistgħux jrażżnu test tal-kandidati mħassra jew diff li jżid `.skip`/`.todo`; asserzjoni tiddgħajjef u maskra oħra jibqgħu proprjetà tal-bieb `check:test-masking` li jimblokka b'mod indipendenti.

### Job: `lint`

Runs on every PR to `main`. Blokki jingħaqdu mal-falliment.

| Script (`npm run ...`)            | Jivvalida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Imblukkar                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:node-runtime`              | Node.js verżjoni hija fil-medda appoġġjata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Iva                                          |
| `check:cycles`                    | Importazzjonijiet ċirkolari madwar `src/` + `open-sse/` kollha (ibbażati fuq AST, tsconfig `paths` solvuti). Bare exits 1 kull meta jeżisti xi ċiklu (fail-closed peress #15281) u telenka l- SCCs. `check:cycles:ratchet` (dak li jmexxi CI ) jimblokka meta l-għadd jaqbeż il-limitu `metrics.cycles` `quality-baseline.json` — bħalissa 14, `direction: down`, għalhekk jista' jaqa' biss (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Iva (ratchet)                                |
| `check:boundary`                  | `open-sse → src` coupling: importazzjonijiet uniċi minn fajl għal fajl mill-magna fl-app (`scripts/quality/measure-boundary.mjs`; il-lista tat-tarf hija l-backlog tar-rimedju v4 core/module-split ). Bare = advisory report (l-istess bħal `quality:boundary`). `check:boundary:ratchet` (what CI runs, also in the `quality.yml` fast-gates ratchet loop) blokki meta l-għadd jaqbeż il-limitu `metrics.boundaryOpenSseToSrc` `quality-baseline.json` — miżrugħa fil-kejl 771, `direction: down`; `--update` inaqqasha biss; relattiv bażi fuq PRs (`--base-ref`, ara hawn taħt)                                                                                                                                                                                                                                                                                                                                                                                 | Iva (ratchet)                                |
| `check:route-validation:t06`      | skemi Zod preżenti fuq ir-rotot kollha (politika tal-Livell 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Iva                                          |
| `check:any-budget:t11`            | għadd ta `@ts-expect-error // any` ma jaqbiżx il-baġit (Livell 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Iva                                          |
| `check:provider-consistency`      | Kull fornitur `providers.ts` għandu entrata li taqbel `providerRegistry.ts` (u viċeversa, fil-lista ta' permessi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Iva                                          |
| `check:model-lifecycle`           | It-tliet tabelli tar-rotot miżmuma bl-idejn jibqgħu konsistenti mal-istampa taċ-ċiklu tal-ħajja checked-in (#11503): `FITNESS_TABLE` (`taskFitness.ts`) punteġġi l-ebda id irtirat li `REGISTRY` jista 'jrotta; kull mira `BUILT_IN_ALIASES` hija preżenti `REGISTRY` u assenti mill-istampa tal-id irtirat; kull id irtirat li jkun ghadu `REGISTRY` jintbaghat jew imniżżel `allowedRetiredInCatalog`; u l-ebda sors jew mira `DEFAULT_DEGRADATION_MAP` ma jidher irtirat f'dik l-istampa. Dan ma jipprovax li mudell huwa attwalment moqdi minn live upstream. Offline — iqabbel ma' `config/quality/model-lifecycle.json`, aggornat bl-idejn `npm run quality:refresh-model-lifecycle` (netwerk; mhux bil-fili CI). `allowedRetiredInCatalog` huwa ratchet burn-down: żid dħul biss bi kwistjoni ta 'traċċar.                                                                                                                                                   | Iva                                          |
| `check:fetch-targets`             | Kull `fetch("/api/...")` `src/` min-naħa tal-klijent jirrisolvi għal `route.ts` reali                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Iva                                          |
| `check:deps`                      | Kollha `npm install` -able deps madwar kull `package.json` fir-repo huma `dependency-allowlist.json`; pakketti ġodda unpinned jew slopsquatted mmarkati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Iva                                          |
| `audit:deps`                      | verifika npm tal-ħames lockfiles indipendenti kollha (root, Electron, plugins OpenCode v1/v2 u fornitur). Blokk ta' konsulenzi kritiċi; pariri għoljin jibqgħu twissijiet viżibbli. Missing/failed verifiki huma INCOMPLETE u blokk; per-scope lock hashes u rapporti jinżammu.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Iva                                          |
| `check:lockfile`                  | `package-lock.json` integrity — https reġistru, integrity hashes, ebda host overrides                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Iva                                          |
| `check:licenses`                  | lista ta' permessi ta' liċenzja SPDX għal dipendenzi tal-produzzjoni                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Iva                                          |
| `check:tracked-artifacts`         | L-ebda artifacts tal-bini / symlinks `node_modules` impenjati (jiġi wkoll f'husky pre-commit; pre-push huwa intenzjonalment ħafif — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Iva                                          |
| `check:ai-attribution`            | L-ebda karru AI/bot `Co-Authored-By` jew footer tal-ġenerazzjoni AI PR ma jikkommetti, titolu jew korp — Hard Rule #16 (fil-loop `quality.yml` fast-gates għal PR→ `release/**` — jaqra l-loadload tal-avveniment, no-op off PRs — → pass PR-only lint PR in `ci.yml` `main` ukoll il-husky `commit-msg` ko-awturi #14436;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:vitest-exclusions`         | Kull esklużjoni Vitest issemmi kwistjoni ta' traċċar u tidher `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Iva                                          |
| `check:file-size`                 | Fajls tas-sors (`.ts`/`.tsx` `src/`, `open-sse/`, `electron/`, `bin/`) jibqgħu fi ħdan `cap` u test files (`*.test.ts(x)`) fi ħdan `testCap`; fajls iffriżati `file-size-baseline.json` (`frozen` / `testFrozen`) m'għandhomx jikbru wara d-daqs irreġistrat tagħhom                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Iva                                          |
| `check:error-helper`              | Risposti għall-iżbalji executors/handlers jużaw `buildErrorBody()` / `sanitizeErrorMessage()` (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Iva                                          |
| `check:migration-numbering`       | Il-fajls SQL tal-migrazzjoni huma numerati b'mod sekwenzjali, l-ebda vojt jew duplikati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Iva                                          |
| `check:public-creds`              | L-ebda ċwievet litterali OAuth `client_id`/`client_secret` jew Firebase Web barra `publicCreds.ts` (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Iva                                          |
| `check:db-rules`                  | Ebda SQL mhux maħdum barra `src/lib/db/` moduli; l-ebda barmil-importazzjonijiet minn `localDb.ts` (Regoli iebsa #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Iva                                          |
| `check:known-symbols`             | L-eżekuturi tal-fornitur, l-istrateġiji tar-routing, u t-tradutturi rreġistrati fit-tabelli tad-dispaċċ tagħhom jaqblu mal-fajls fuq id-diska — ebda simboli orfni jew mhux iddikjarati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Iva                                          |
| `check:route-guard-membership`    | Kull rotta li tbid proċess tifel hija kklassifikata minn `isLocalOnlyPath()` (Regoli Ibsin #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Iva                                          |
| `check:test-discovery`            | Kull fajl `*.test.ts` / `*.spec.ts` fir-repo jinġabar minn mill-inqas test runner wieħed (ratchet: lista orfni `test-discovery-baseline.json` tista' tiċkien biss)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Iva                                          |
| `check:test-tla-order`            | L-ebda fajl `node:test` taħt `tests/unit` ma jirreġistra test, jolqot `await` tal-ogħla livell, imbagħad jirreġistra aktar (#18045; ratchet: `test-tla-order-allowlist.json` jista 'jiċkien biss)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Iva                                          |
| `check:agent-skills-sync`         | L-artifatti tal-ħiliet tal-aġent iġġenerati jaqblu mal-katalogu tas-sors tagħhom (l-ebda drift)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:provider-asset-provenance` | Provider logos/assets iġorr reġistrazzjoni ta’ provenjenza reġistrata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `lint:json`                       | JSON config files parse u jissodisfaw ir-regoli lint repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `typecheck:core`                  | TypeScript kumpilazzjoni mingħajr żbalji (twissijiet konsultattivi biss)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Iva                                          |
| `typecheck:noimplicit:core`       | Strict `noImplicitAny` — li jhares 'il quddiem; ħafna siti ta' sejħiet pre-eżistenti għadhom jeħtieġu annotazzjonijiet                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **Konsultattiv** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` skoped to `src/app/(dashboard)/**` (#7033) — `typecheck:core`'s 27-file allowlist ikkurat ma tinkludi ebda dashboard TSX, u `next build` qatt ma tiċċekkjaha lanqas (`next.config.mjs` settijiet `ignoreBuildErrors: true`), sabiex ir-rigressjonijiet ta' identifikatur orfni hemmhekk (#6625/#6909) kienu inviżibbli għal CI. Diffs kontra linja bażi ta' għadd iffriżat per-file/per-TS-code (`config/quality/dashboard-typecheck-baseline.json`, l-istess mudell ta' infurzar mhux użat bħal `check:known-symbols`) — biss NEW żbalji lil hinn mill-għadd tal-linja bażi jonqsu l-bieb; ratchet isfel ma `--update` meta żball pre-eżistenti huwa ffissat.                                                                                                                                                                                                                                                                                                | Iva                                          |
| `check:build-typecheck`           | Iċċekkja tat-tip tal-produzzjoni ta 'app kollu fuq `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), il-lista ta' permessi ta' 27 fajl tal-wiċċ `typecheck:core` u l-bieb tad-dashboard ma jkoprux. Diffs kontra `config/quality/build-typecheck-baseline.json`; għadd ġdid jew mgħolli għal kull (fajl, kodiċi) jonqos, għadd aktar baxx jitloblek ratchet. `--update` jirrifjuta waqt li l-ġirja jkun fiha par ġdid jew imqajjem sakemm `--force-regressions` ma jgħaddix, u jirrifjuta fajl imsikkta ġdid sakemm ma jgħaddix `--force-nocheck`, għalhekk it-twessigħ tal-linja bażi biex isir aħdar u l-għoti ta 'silenzju permanenti huma żewġ atti deliberati separati. A bare `--force` huwa miċħud. Skennja wkoll l-ambitu tal-bini għal `@ts-nocheck` kontra `config/quality/ts-nocheck-baseline.json`, minħabba li fajl li jużah ma jirrapporta l-ebda dijanjostika u inkella jkun inviżibbli għal kull gate. | Iva                                          |

#### Żewġ programmi typecheck iwieġbu b'mod differenti

`typecheck:core` u `check:build-typecheck` jikkompilaw programmi differenti taħt għażliet differenti, u l-istess fajl jista 'jkun nadif f'wieħed u mimli żbalji fl-ieħor.

`tsconfig.build.json` jistabbilixxi `"strict": false`, għalhekk `noImplicitAny` huwa mitfi. Il-konfigurazzjoni tal-qalba tiġbor lista permessa ta' 27 fajl b'għażliet aktar stretti u ssegwi l-graff ta' importazzjoni ta' kull entrata, għalhekk fajls li qatt ma jidhru fil-programm tal-bini jkunu għadhom iċċekkjati hemmhekk.

Il-konsegwenza hija importanti meta tiġġudika jekk fajl huwiex ittajpjat:** zero diagnostics taht `check:build-typecheck` ma jfissirx zero** . It-tqaxxir ta `@ts-nocheck` minn 26 fajl wera 23 minnhom nodfa fil-programm tal-bini; sittax minn dawk ħarġu madwar 120 impliċita-kwalunkwe żball f'dik stretta. Iċċekkja t-tnejn qabel issejjaħ fajl nadif.

### Job: `quality-gate`

Tigi wara `test-coverage`. Blokki jingħaqdu mal-falliment.

| Iskript                      | Jivvalida                                                                                                                                                                   | Imblukkar                  |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `quality:collect`            | Jarmi `quality-metrics.json` (għadd ta' twissija ESLint, kopertura minn rapport ta' shard magħqud)                                                                          | Iva (upstream tar-ratchet) |
| `quality:ratchet`            | Kull metrika `quality-baseline.json` ma naqsitx lura (ESLint twissijiet ≤ linja bażi; kopertura ≥ linja bażi)                                                               | Iva                        |
| `check:duplication`          | Id-duplikazzjoni tal-kodiċi (jscpd@4) ma taqbiżx il-linja bażi `quality-baseline.json`                                                                                      | Iva                        |
| `check:complexity`           | Il-kumplessità ċiklomatika fil-livell tal-fajl ma taqbiżx il-limitu (qalba ESLint `complexity` + `max-lines-per-function`)                                                  | Iva                        |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — separat ESLint pass; CI runs kemm magħquda bħala l-pass `check:complexity-ratchets` wieħed                         | Iva                        |
| `check:dead-code`            | Esportazzjonijiet / fajls mhux użati ratchet (knip) ma jirrigressux vs linja bażi                                                                                           | Iva                        |
| `check:compression-budget`   | Baġit ta 'referenza ta' kompressjoni — għal kull magna token-saving floors m'għandhomx imorru lura                                                                          | Iva                        |
| `check:type-coverage`        | ratchet ittajpjat fil-mija (`type-coverage`) ma jmurx lura; fil-biċċa l-kbira tassumi `typecheck:noimplicit:core`                                                           | Iva                        |
| `check:codeql-ratchet`       | L-għadd ta' twissija CodeQL miftuħ ma jmurx lura (jaqra permezz `gh api`; graceful-skip mingħajr token) — refresh cadence u manwali trigger: ara "CodeQL ratchet" hawn taħt | Iva                        |

### Job: `quality-extended`

L-impjieg kollu huwa konsultattiv (`continue-on-error: true`). Il-ratchets ibbażati fuq npm jimxu għal reali; l-iskaners esterni jinstallaw permezz ta `gh release download` u awto-skip (ħruġ 0) meta binarju għadu assenti.

| Iskript                  | Jivvalida                                                                                                                                                                                                | Imblukkar                                           |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `check:circular-deps`    | L-ebda dipendenzi ċirkolari (dpdm)                                                                                                                                                                       | **Konsultattiv**                                    |
| `check:bundle-size`      | Id-daqs tal-pakkett ma jaqbiżx il-kappa                                                                                                                                                                  | **Konsultattiv**                                    |
| `check:secrets`          | Skennjar sigriet (gitleaks) — skips jekk binarju assenti                                                                                                                                                 | **Konsultattiv**                                    |
| `check:vuln-ratchet`     | Vulnerabbiltajiet tad-dipendenza (osv-scanner) ma jmurx lura — `--ratchet` ifalli bħala INCOMPLETE (ħruġ 2) jekk mhux imkejjel                                                                           | **Konsultattiv**                                    |
| `check:workflows`        | Workflow lint (actionlint + zizmor); missing/broken scanners, rapporti invalidi jew ratchet linja bażi nieqsa jfallu bħala INCOMPLETE. Sejbiet validi jsegwu l-politika strict/advisory/ratchet magħżula | Eżekuzzjoni meħtieġa; zizmor ratchet blocking fi CI |
| `check:openapi-breaking` | Kuntratt API pubbliku kontra kommessi ta 'avveniment ippinjat (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); kejl meħtieġ jonqos magħluqa                       | **Imblukkar bi --ratchet**                          |

### Job: `docs-sync-strict`

Runs on every PR to `main`. Blokki jingħaqdu mal-falliment.

| Iskript                        | Jivvalida                                                                                                                                                              | Imblukkar                      |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `check:docs-all`               | Meta-gate li tmexxi s-6 sub-gates hawn taħt sekwenzjali                                                                                                                | Iva                            |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt konsistenza tal-verżjoni                                                                                                                 | Iva                            |
| ↳ `check:docs-counts`          | L-għadd fil-proża (l-għadd tal-fornitur, l-għadd tal-migrazzjoni, eċċ.) jinsabu fit-tieqa tar-ratchet tal-għadd reali                                                  | Iva                            |
| ↳ `check:env-doc-sync`         | Kull env var `.env.example` hija dokumentata f'tabella docs, u viċi versa                                                                                              | Iva                            |
| ↳ `check:deprecated-versions`  | L-ebda string verżjoni deprecated fid-doks                                                                                                                             | Iva                            |
| ↳ `check:doc-links`            | Il-links interni tal-markdown fid-doks jirrisolvu għal fajls reali (formola `[text]`/`(path)` )                                                                        | Iva                            |
| ↳ `check:fabricated-docs`      | Rotot, vars env, kmandi CLI, ismijiet tal-ganċ, u mogħdijiet tal-fajls ikkwotati fid-doks jeżistu fil-codebase. Hard gate via `--strict`; soft-fail mingħajr bandiera. | Iva (permezz ta `--strict` CI) |
| `check:cli-i18n`               | strings tal-kmand CLI huma preżenti fil-fajls kollha tal-lokal i18n                                                                                                    | Iva                            |
| `check:openapi-coverage`       | OpenAPI spec tkopri mill-inqas art ratcheted ta 'rotot reali                                                                                                           | Iva                            |
| `check:openapi-security-tiers` | L-annotazzjonijiet tal-livell tas-sigurtà `openapi.yaml` huma konsistenti mal-klassifikazzjonijiet `routeGuard.ts`                                                     | **Konsultattiv**               |
| `check:openapi-routes`         | Kull mogħdija fiż `openapi.yaml` tissolva għal `route.ts` reali (kontra l-alluċinazzjoni)                                                                              | Iva                            |
| `check:docs-symbols`           | Kull referenza `/api/...` `docs/**/*.md` tissolva għal `route.ts` reali (kontra l-alluċinazzjoni)                                                                      | Iva                            |
| `i18n translation drift`       | Ċwievet mhux tradotti fil-fajls lokali i18n — twissi biss                                                                                                              | **Konsultattiv**               |

It-tnax- README SVGs taħt `docs/diagrams/` jiġu ġġenerati (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` jirriġenerahom kollha). Kull wieħed għandu byte-compare unit test (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) li jfalli meta l-fajl kommess ikun skadut, u `check:docs-counts` jaqra numri kanoniċi min-nodi `<text>` tagħhom — u huwa għalhekk li l-pass tal-kontorn iżomm kull string deskritta fil-fajl bħala `<text>` inviżibbli. Il-kontroll SVG canonical-numbers jaqra l-fajls elenkati `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` and `tier-flow-light.svg`; il-pretensjonijiet ta 'free-forever, catalog-entry, rikorrenti-pool u scoring-factors jaqraw ukoll `promise-pillars.svg`, `free-tier-budget.svg` u `strategies-grid.svg`. `free-tier-budget.svg` jiġbed il-figuri tiegħu mill-loader tal-katalgu ħajjin, għalhekk bidla għal `FREE_MODEL_BUDGETS` jew għal isem tal-wiri tal-fornitur reds CI sakemm dak il-fajl jiġi riġenerat.

### Job: `i18n-ui-coverage`

| Iskript                           | Jivvalida                                                                                                                                                                                                      | Imblukkar        |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage` (inline) | kopertura taċ-ċavetta UI i18n hija ≥ 65%                                                                                                                                                                       | Iva              |
| `check-ui-value-drift` (inline)   | Ingliż miktub mill-ġdid** valur** ma jħalli l-ebda traduzzjoni qadima lura                                                                                                                                     | Iva              |
| `check-new-key-coverage` (inline) | A** ġdid** Ċavetta Ingliża tiġi tradotta f'kull lokalità — a marker `__MISSING__:` jiġi miċħud                                                                                                                 | Iva              |
| `check-translation-ratio`         | Proporzjon ta' traduzzjoni reali għal kull lokalità (identiku għall-Ingliż / placeholder / weraq nieqsa barra mil-lista ta' permessi) m'għandux jaqbeż `config/quality/i18n-translation-baseline.json` + slack | **Konsultattiv** |

Bżonnijiet `fetch-depth: 0` — il-gate value-drift diffs `en.json` kontra l-bażi tal-għaqda.

#### `check-ui-value-drift` — stale-translation gate

Qabdiet ir-rigressjoni waħda i18n li l-gradi l-oħra ma jistgħux jaraw strutturalment: valur Ingliż jinkiteb mill-ġdid u t-traduzzjonijiet derivati mill-Ingliż _previous_ jibqgħu lura, sabiex utenti mhux Ingliżi jibqgħu jaqraw kopja miktuba b'mod kunfidenti, issa żbaljata.

Dan mibgħut għal reali. `oauthModal.googleOAuthWarning` nkiteb mill-ġdid meta żbarka l-helper tal-login Antigravity (#5203);** 39 minn 43 lokali** żammet test li jgħid lill-operaturi biex "kopja l- URL sħiħ u waħħalha taħt" — fluss li ma jistax jitlesta għal dak il-fornitur. Baqgħet inosservata sa #8463 għax:

- `sync-ui-keys` biss backfills ċwievet li huma** assenti** , qatt dawk li huma** friska** ;
- `check-ui-keys-coverage` jgħodd _presence_ ewlenin, għalhekk traduzzjoni mhux użata tiskurja kif kopert;
- `check-translation-drift` jsegwi d-dokumentazzjoni `docs/i18n/<locale>/**.md` tirrifletti — qatt ma jaqra `src/i18n/messages/*.json`. Imblukkar fl-impjieg `docs-sync-strict` mis-sinkronizzazzjoni mill-ġdid tal-2026-09: editja dokument ewlieni → `npm run i18n:run -- --files=<doc>` (livell ta' sezzjoni, irħis).

**Diff-konxju, mhux appoġġjat mill-linja bażi.** Tqabbel `en.json` fil-bażi tal-għaqda kontra s-siġra tax-xogħol; għal kull ċavetta li l-valur Ingliż tagħha nbidel, kwalunkwe lokalità li għadha żżomm traduzzjoni mhux mittiefsa hija skaduta. Dan apposta** jiffriża dejn pre-eżistenti** — a diff ma jistax jiżvela minn liema Ingliż antik ġiet traduzzjoni li ilha teżisti, għalhekk il-gate jiġġudika biss dak li tmiss il-bidla attwali. L-alternattiva (linja bażi tal-hash għal kull ċavetta) tkun tiswa fajl iġġenerat ~ 600 KB, 3 × l-akbar linja bażi eżistenti, taqlib fuq kull i18n PR.

Żewġ modi kif tissodisfah:

1. taġġorna t-traduzzjonijiet affettwati, jew
2. issettjahom għal `__MISSING__:<new english>` — ir-runtime imbagħad iservi l-Ingliż ikkoreġut (`src/i18n/request.ts::deepMergeFallback`, #7258) u l-kjuwijiet ewlenin għat-traduzzjoni.

Jekk is-sekwenza** tifsira** mibdula, jippreferu** tibdel l-isem taċ-ċavetta** : ċavetta ġdida ma tistax tirret traduzzjoni skaduta. Dik hija l-mudell #8463 użat.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Joħroġ 0 bi `SKIP reason=base-unresolved` meta l-katalgu bażi ma jistax jinqara (klonu baxx mingħajr ir-ref bażi), li jirrifletti `check-openapi-breaking`.

### Job: `i18n`

Matriċi ta' validazzjoni sħiħa tal-i18n (biċċa xogħol waħda għal kull lokalità). L-impjieg kollu huwa konsultattiv.

| Iskript                         | Jivvalida                                      | Imblukkar                                                     |
| ------------------------------- | ---------------------------------------------- | ------------------------------------------------------------- |
| `validate_translation.py quick` | Kompletezza tat-traduzzjoni għal kull lokalità | **Konsultattiv** (`continue-on-error: true` fuq xoghol kollu) |

### Job: `pr-test-policy`

Timxi fuq talbiet tal-ġibda biss.

| Iskript                | Jivvalida                                                                                                                                    | Imblukkar |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PRs li jibdlu l-kodiċi tal-produzzjoni `src/`, `open-sse/`, `electron/`, jew `bin/` għandhom jinkludu jew jaġġornaw testijiet (Hard Rule #8) | Iva       |
| `check:test-masking`   | Fajls tat-test mibdula ma jnaqqsux l-għadd nett tal-asserzjonijiet jew iżidu tawtoloġiji `assert.ok(true)`                                   | Iva       |
| `check:pr-evidence`    | PR body jiċċita evidenza test/VPS għall-bidla (jimkanalizza Hard Rule #18 billi grepping PR prose — fraġli, ara Backlog)                     | Iva       |

### Job: `test-vitest`

Tigi wara `build`. Blokki jingħaqdu mal-falliment.

| Suite            | Jivvalida                                                 | Imblukkar                                                                                                                 |
| ---------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 għodda), autoCombo, cache — vitest runner | Iva                                                                                                                       |
| `test:vitest:ui` | UI komponenti testijiet — vitest runner                   | **Imblukkar** — fallimenti pre-eżistenti huma espliċitament esklużi `vitest.config.ts`; fallimenti ġodda jfallu l-impjieg |

### Flussi tax-xogħol filgħaxija (skedati, konsultattivi)

Dawn jimxu fuq skeda cron (u `workflow_dispatch`), qatt fuq PRs. Kollha huma konsultattivi.

| Fluss tax-xogħol       | Jivvalida                                                                                                                                                                     | Imblukkar        |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | iċċekkja malajr testijiet tal-proprjetà b’għadd ta’ runs għoli ta’ żerriegħa każwali +                                                                                        | **Konsultattiv** |
| `nightly-resilience`   | heap-growth gate, chaos fault-injection, k6 load/soak                                                                                                                         | **Konsultattiv** |
| `nightly-llm-security` | promptfoo injection guard (block mode) + garak probes (skipped mingħajr sigriet tal-fornitur)                                                                                 | **Konsultattiv** |
| `nightly-schemathesis` | OpenAPI kuntratt fuzzing (skematesi) kontra OmniRoute ħaj bl-użu ta `docs/openapi.yaml` — uċuħ vjolazzjonijiet tal-ispeċifikazzjonijiet / 500s mhux immaniġġjati (Fase 8 B.4) | **Konsultattiv** |
| `nightly-mutation`     | Punteġġ tal-ittestjar tal-mutazzjoni Stryker fuq il-korsija tal-unità mgħaġġla — mutanti superstiti wiċċ asserzjonijiet dgħajfa                                               | **Konsultattiv** |
| `nightly-compat`       | Matriċi tal-kompatibilità tal-magna tan-nodi tul il-firxiet `engines.node` appoġġjati                                                                                         | **Konsultattiv** |

Linji bażi tal-prestazzjoni (heap, TTFB, build time) huma rreġistrati, mhux gated: ara [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Fażi tal-veloċità (2026-08-30 → v4.0 LTS): kull linja bażi tħalliet 20% aktar laxka

Deċiżjoni tas-sid (2026-08-30): sal-modularizzazzjoni ta’ v4.0, il-veloċità tar-rilaxx hija aktar importanti
milli jinżamm il-limitu tad-dejn. Kull linja bażi **numerika** tal-mekkaniżmu ratchet tħalliet 20% aktar laxka f’pass
wieħed awditabbli, u l-fażi hija ddikjarata f’`config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| X’inbidel                                                                                                                                                                                                                              | Fejn                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — għadd fejn inqas huwa aħjar ×1.2, perċentwali fejn aktar huwa aħjar ÷1.2 (il-limitu minimu tal-kopertura ta’ 60 inżamm, `eslintErrors` jibqa’ 0, `eslintWarnings` 0 → 20% tal-għadd iffriżat tas-soppressjonijiet) | `quality-baseline.json` (in-nota `_relax_velocity_2026_08_30` telenka kull valur ta’ qabel → wara)     |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                       | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, kull limitu ta’ linji `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                             | `file-size-baseline.json`                                                                              |
| għadd għal kull fajl / għal kull kodiċi TS ×1.2                                                                                                                                                                                        | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                    | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` isir konsultattiv waqt li `_policy.requireTighten === false`                                                                                                                                                       | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| il-proċess ta’ billejl `bank-ratchet-shrinks` jitwaqqaf temporanjament (inkella jirreġistra t-tnaqqis imkejjel u jħassar l-ispazju ta’ manuvra)                                                                                        | `.github/workflows/nightly-release-green.yml`                                                          |

Il-listi ta’ permessi (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **mhumiex** baġits u ma ntmessux. Il-kriterji tal-politika biex test jgħaddi jew ifalli (sigrieti, regoli SQL,
il-kuntratt tad-dokumentazzjoni/ambjent, il-parità tal-i18n, testijiet tal-unitajiet) ma nbidlux — test aħmar għadu test aħmar.

**Għodod**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — ir-rilassament
  ta’ darba (`scripts/quality/relax-baselines.mjs`); jirrifjuta li jaħdem darbtejn bl-istess nota.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  ikejjel kull kriterju numeriku bl-istess mod bħas-CI u jistampa l-ispazju ta’ manuvra li jifdal għal kull kriterju
  (`scripts/quality/baseline-headroom.mjs`). Il-job ta’ billejl `baseline-headroom` jippubblika
  t-tabella fis-sommarju tal-eżekuzzjoni tal-workflow u jtella’ r-rapport JSON/Markdown tiegħu bħala
  `baseline-headroom-<run_id>`, miżmum għal 90 jum. Ir-ringieli ta’ twissija u kritiċi jidentifikaw kriterji
  li jinsabu sa 10% mil-limitu tagħhom jew li diġà qabżuh. Irrieżamina dawn ir-rapporti bħala twissija bikrija li
  l-baġits qegħdin jintużaw; eżamina n-noti `_rebaseline_*` tal-kriterju responsabbli. Il-job ma jibqax
  joħloq jew jaġġorna issue permanenti; #12149 iżomm l-istorja tar-rapporti preċedenti.

**Modalità ta’ kodiċi ġdid (Clean-as-You-Code) — mill-2026-08-30, mogħdija rapida għall-PR biss**

Fuq avvenimenti `pull_request`, `quality.yml` jgħaddi `--base-ref <PR base SHA>` lil `check:file-size`,
`check:complexity-ratchets` u `check:dead-code`. Għal `check:complexity-ratchets` u
`check:dead-code`, il-kriterju jqabbel HEAD mal-merge-base **ristrett għall-fajls li mess il-PR**
(`scripts/check/newCodeMode.mjs`: il-merge-base jiġi mmaterjalizzat f’`git worktree`
temporanju, ESLint/knip jitħaddmu hemmhekk u fuq HEAD, u l-għadd għal kull fajl jiġi mqabbel):

- **imblukkar** — il-PR żied ksur ċiklomatiċi/konjittivi jew exports mhux użati fil-fajls li biddel
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` fil-log);
- **konsultattiv** — it-total globali mqabbel mal-linja bażi ffriżata. Devjazzjoni li tintiret qatt ma tagħmel
  PR innoċenti aħmar; id-devjazzjoni terġa’ tiġi ffriżata waqt ir-rikonċiljazzjoni tar-rilaxx u tiġi mmonitorjata mill-job tal-ispazju ta’ manuvra.

`check:file-size` juża r-referenza bażi skont ir-regoli tiegħu stess (`scripts/check/check-file-size.mjs`, #8522):
jiċċekkja kull fajl tas-sors u tat-testijiet fis-siġra, jaqra l-għadd ta’ linji ta’ kull wieħed fil-bażi tal-PR
permezz ta’ `git show`, u jfalli fajl biss meta jikber lil hinn mill-akbar valur bejn il-limitu tal-linja bażi tiegħu
(`frozen` / `testFrozen`, jew `cap` / `testCap` għal fajl barra mil-linja bażi) u d-daqs bażi tiegħu.
Għalhekk, fajl li diġà ddevja fil-bażi qatt ma jagħmel PR innoċenti aħmar.

`check:boundary:ratchet` japplika l-istess regola għan-numru uniku tiegħu
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): fuq avvenimenti PR, kemm
il-fast-gates ta’ `quality.yml` kif ukoll il-job tal-lint ta’ `ci.yml` jgħaddu l-SHA bażi tal-PR, il-commit
bażi jitkejjel minn esportazzjoni ta’ `git archive`, u l-PR ifalli biss meta l-għadd tal-konnessjonijiet
`open-sse → src` tiegħu jaqbeż l-akbar valur bejn `metrics.boundaryOpenSseToSrc` u l-għadd fil-bażi. Devjazzjoni
tal-bażi ’l fuq mil-limitu tiġi rrappurtata (`base drift herdado`) iżda qatt ma tagħmel PR innoċenti aħmar; push → main
iżomm il-limitu assolut, u SHA bażi li ma jistax jiġi riżolt jerġa’ lura għalih bi twissija.

L-eżekuzzjonijiet ta’ `workflow_dispatch`, il-verifika sħiħa għal release-green u l-job ta’ headroom ta’ billejl ma għandhomx bażi tal-PR
u jżommu t-tqabbil assolut (globali). Il-kopertura, id-duplikazzjoni u l-kopertura tat-tipi jibqgħu globali
għalissa (l-għodod tagħhom ma jipproduċux diff għal kull fajl b’mod effiċjenti) — huma kandidati għall-istess trattament.

**Għeluq tal-fażi f’v4.0 (LTS = aktar strett minn qabel, mhux “lura għan-normal”)**

1. Fuq it-tip pur ta’ `release/v4.0.0`: `npm run quality:headroom --json` għar-rekord, imbagħad
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, u l-`--update` ta’ kull gate tat-typecheck
   — kull baseline jinżel għall-valur imkejjel.
2. Ħassar `_policy` minn `quality-baseline.json` (jerġa’ jattiva `--require-tighten` u l-akkumulazzjoni
   ta’ billejl), u rrestawra `THRESHOLD = 36` (jew ogħla) f’`check-openapi-coverage.mjs`.
3. Issikka lil hinn mill-valur imkejjel fejn il-modularizzazzjoni tat riżultati: il-`cap` tad-daqs tal-fajl lura għal 1000
   (jew 800), il-limiti minimi tal-kopertura +5, u 0 esportazzjonijiet mhux użati għall-pakketti modularizzati.

## Linja bażi tar-ratchet (`quality-baseline.json`)

Il-magna tar-ratchet (`scripts/quality/check-quality-ratchet.mjs`) taqra `quality-baseline.json`
u tqabblu mal-`quality-metrics.json` li jkun għadu kif inġabar. Kwalunkwe metrika li tmur lura
lil hinn mill-epsilon tagħha twassal biex il-build ifalli.

Il-metriki li bħalissa qed jiġu ssorveljati:

| Metrika               | Direzzjoni | Tifsira                                             |
| --------------------- | ---------- | --------------------------------------------------- |
| `eslintWarnings`      | `down`     | L-għadd ta’ twissijiet ta’ ESLint ma jistax jiżdied |
| `coverage.statements` | `up`       | Il-kopertura tal-istqarrijiet ma tistax tonqos      |
| `coverage.lines`      | `up`       | Il-kopertura tal-linji ma tistax tonqos             |
| `coverage.functions`  | `up`       | Il-kopertura tal-funzjonijiet ma tistax tonqos      |
| `coverage.branches`   | `up`       | Il-kopertura tal-fergħat ma tistax tonqos           |

Biex taġġorna l-linja bażi wara titjib ġenwin:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Il-flag `--update` jikteb il-valuri mkejla attwali f’`quality-baseline.json`.
Agħmel commit ta’ dan il-fajl flimkien mal-bidla li tejbet il-metrika. PR li ttejjeb
metrika mingħajr ma taġġorna l-linja bażi tinqabad minn `--require-tighten` (Fażi 6A.5,
l-implimentazzjoni għadha pendenti).

### Ratchet ta’ CodeQL: frekwenza tal-aġġornament u attivazzjoni manwali

`check:codeql-ratchet` jaqra **l-istat tar-repożitorju, aġġornat skont skeda — mhux għal kull PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` jirrapporta
`state: configured`, `schedule: weekly`: l-iskan tad-default setup ta’ GitHub, mhux analiżi
għal kull push. Konsegwenza: wara li jingħaqad PR li JIRRANĠA l-allerti, ir-ratchet jibqa’
jaqra l-għadd l-antik u ogħla sakemm jitħaddem l-iskan skedat li jmiss — għalhekk jirrapporta
rigressjoni fuq kull PR miftuħ, inklużi l-bidliet sussegwenti tal-istess PR li jkun wettaq
it-tiswija, sakemm l-iskan ilaħħaq.

**Aġġornament manwali**: `gh workflow run codeql.yml --ref release/vX.Y.Z` jerġa’ jħaddem
l-analiżi u jerġa’ jippubblika l-allerti fi ftit minuti. L-ewwel aqra `.github/workflows/codeql.yml`
— l-intestatura tiegħu tispjega li huwa għal `workflow_dispatch` biss **għax joħloq kunflitt mad-
"default setup" ta’ GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Ir-restawr tal-attivaturi `push`/`pull_request`/
`schedule` l-ewwel jirrikjedi **azzjoni mis-sid**: Settings → Code security →
CodeQL: Default → Advanced. Iżżidx attivatur `schedule:` mingħajr dik il-bidla — dan
jirriżulta biss f’eżekuzzjonijiet li jfallu.

**Issikka l-linja bażi wara li jonqos l-għadd** — `node scripts/check/check-codeql-ratchet.mjs
--update` jikteb l-għadd il-ġdid imkejjel f’`quality-baseline.json` →
`metrics.codeqlAlerts.value`, sabiex ir-ratchet ma jippermettix b’mod sieket rigressjoni lura
sal-limitu l-antik. Eżempju prattiku (2026-09-02/03): PR #12502 irranġa 7 allerti reali
(13 → 6 miftuħa kif imkejla); PR #12530 issikka l-linja bażi ffriżata minn 11 → 6 biex taqbel;
is-6 li kien fadal imbagħad ġew miċħuda b’ġustifikazzjoni għal kull allert sakemm ma baqa’
ebda wieħed miftuħ.

**Iċ-ċaħdiet huma deċiżjoni tal-operatur (Regola Stretta #14)** — qatt tiċħad allert ta’ CodeQL
mingħajr ma tirreġistra l-ġustifikazzjoni teknika fil-kumment taċ-ċaħda: `won't fix` għal
rekwiżit ta’ protokoll upstream, `used in tests` għal fixture tat-testijiet, `false positive`
għal sanitizer li CodeQL ma jistax jara (preċedent: `docs/security/ERROR_SANITIZATION.md`).

---

## Politika ta' Ripetizzjoni tat-Testijiet (WS5.4, v3.8.49)

Ir-ripetizzjoni hija għal kull runner separatament, qatt politika ġenerali — ripetizzjoni ġenerali tibdel rigressjonijiet reali
fi flakes inviżibbli:

| Runner           | Politika                                                                                                                                        | Għaliex                                                                                                                                  |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` fis-CI biss, bi `trace: on-first-retry`                                                                                            | It-timing tal-browser/netwerk huwa ġenwinament mhux deterministiku; ripetizzjoni waħda bi trace tibdel flake f'artefatt dijanjostikabbli |
| Vitest           | L-EBDA ripetizzjoni globali. Test ippruvat li hu flaky jingħata ripetizzjoni espliċita għal dak it-test (viżibbli fid-diff, rieżaminata fil-PR) | Iżżomm il-lista ta' kwarantina fir-repo, u qatt opaka                                                                                    |
| node:test (unit) | L-EBDA ripetizzjoni, qatt                                                                                                                       | Test tal-unità flaky huwa bug fit-test — irranġah, terġax tippruvah b'mod każwali                                                        |

SLOs fil-mira ladarba tidħol it-telemetrija tal-flakes (WS5.2/5.3): rata ta' flakes <1% għal kull test
(limitu ta' "irranġa issa"), rata ta' suċċess ≥95% għal kull pipeline. Valuri ta' referenza tal-industrija —
ikkalibrahom mill-ġdid skont il-kejl tagħna stess.

## Devjazzjoni tar-Ratchet fil-Livell tar-Release (WS5.5, v3.8.49)

Meta ratchet (daqs tal-fajl, kumplessità, twissijiet tal-eslint) jirrigressa fit-tip PUR tar-release
— jiġifieri l-KOMBINAZZJONI tal-merges ikkawżat ir-rigressjoni, u l-ebda PR waħdu ma jirriproduċi
r-rigressjoni fuq il-branch tiegħu stess — ir-responsabbiltà għat-tiswija hija tal-**kaptan tar-release, darba biss, fuq
il-branch tar-release**: ippreferi estrazzjoni/refactor; erġa' stabbilixxi l-baseline biss b'entrata ta'
ġustifikazzjoni ddokumentata. Qatt titfa' devjazzjoni kkawżata mill-kombinazzjoni fuq PR ta' kontributur, u qatt
terġa' tistabbilixxi l-baseline għal kull PR (dan jaħbi rigressjonijiet reali). L-ewwel iddistingwi: irriproduċi
l-istatus aħmar fuq it-tip pur f'worktree ta' prova qabel tassumi li l-PR tiegħek ikkawżah.

## Kif Jiġu Bankjati t-Tnaqqisiet tar-Ratchet — id-direzzjoni 'l isfel (#8584)

Ir-ratchet huwa awtomatiku biss bin-nofs, u huwa n-nofs il-ħażin. **Li tgħolli** limitu huwa
editjar manwali tal-JSON li jieħu għaxar sekondi u huwa l-aktar mod veloċi biex tiżblokka PR aħmar.
**Li tbaxxi** limitu jeħtieġ li xi ħadd iħaddem `--update` u jagħmel commit tar-riżultat — u sakemm
daħal il-job `bank-ratchet-shrinks`, l-ebda workflow ma kien iħaddmu. Il-konsegwenza mkejla
(2026-07-25): 18-il fajl iffriżat diġà kienu fil-limitu l-ġdid ta' 800 linja għal kull fajl jew taħtu, bl-agħar wieħed
f'132× (`src/shared/validation/schemas.ts`, 19-il linja b'limitu ta' 2,523); il-limitu massimu
tal-kumplessità mexa `1794 → 2169` tul ~37 nota ta' stabbiliment mill-ġdid tal-baseline b'tnaqqis wieħed eżatt
(−1); u "issikka permezz ta' `--update` fiċ-ċiklu li jmiss" inkiteb 31 darba u ġie rrispettat
darba. Limitu li jibqa' jeżisti wara l-kodiċi li ġġustifikah jikkonverti fis-skiet kull
dekompożizzjoni kompluta f'konċessjoni għat-tkabbir għal min imiss li jeditja l-fajl.

`nightly-release-green.yml` → il-job **`bank-ratchet-shrinks`** jagħlaq dak iċ-ċiklu:

|             |                                                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------------------------- |
| Jaħdem fuq  | `schedule` (3×/jum) + `workflow_dispatch` — deliberatament **mhux** `push`                                          |
| Ikejjel     | l-ogħla `release/vX.Y.Z`, bl-istess riżoluzzjoni + protezzjoni kontra l-injezzjoni bħal `release-green`             |
| Jikteb      | `check:file-size --update` u `check:complexity-ratchets --update` (it-tnejn inaqqsu biss minħabba d-disinn tagħhom) |
| Jivverifika | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                            |
| Jibgħat     | PR wieħed dejjem aġġornat kontra l-branch tar-release — aġġornat bil-forza, qatt ripetut bħala spam                 |

L-ibbankjar isir f'lottijiet minflok ma' kull push għax m'għandu l-ebda rekwiżit ta' latenza (tnaqqis
ibbankjat fi żmien 8 sigħat huwa aċċettabbli), filwaqt li eżekuzzjoni għal kull merge terġa' tibni l-branch tal-PR ripetutament
waqt kampanji ta' merge u tħallas għal passaġġ sħiħ tal-ESLint kull darba. Id-detezzjoni tibqa' ssir fuq
push (`release-green`); l-ibbankjar biss isir f'lottijiet.

### Il-verifikatur tas-sigurtà

Il-job jikteb fil-baselines mingħajr superviżjoni, għalhekk `verify-ratchet-bank.mjs` huwa dak li jagħmel
dan aċċettabbli. Huwa jqabbel id-differenzi tas-siġra wara `--update` ma' `HEAD` u **jwaqqaf il-job
qabel ma jeżisti kwalunkwe commit** — mingħajr ma jiftaħ PR — sakemm kull bidla ma tkunx waħda minn dawn:

- entrata numerika `frozen` / `testFrozen` **imnaqqsa** jew **imneħħija**
- `complexity-baseline.json` → `count` **imnaqqas**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **imnaqqas**

Kull ħaġa oħra tfalli: li tgħolli numru, iżżid entrata, tibdel `cap`/`testCap`, jew
tħassar/tikteb mill-ġdid nota `_rebaseline_*` (dawk in-noti huma r-rekord tal-awditjar ta' għaliex jeżisti kull
limitu massimu u huma maħżuna fl-istess oġġett `frozen` bħall-entrati tal-fajls).
Bot li jista' jgħolli limitu jkun strettament agħar mill-istatus quo. Protezzjoni kontra r-rigressjoni:
`tests/unit/verify-ratchet-bank.test.ts`.

Il-job qatt ma jagħmel push lejn `release/*` — bniedem jagħmel merge tal-PR, għalhekk kejl ħażin
ma jistax jidħol mingħajr rieżami.

## Politika tal-lista ta' permessi

Kull xatba li ma tistax tfalli fuq vjolazzjonijiet pre-eżistenti juża allowlist iffriżat (eż., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Il-politika hija:

**Waħħal il-kawża ewlenija; uża l-lista ta' permessi biss meta l-vjolazzjoni tkun teżisti minn qabel u ma tistax tiġi ffissata fl-istess PR.**

Meta żżid dħul għal lista ta' permessi:

1. Inkludi kumment mal-ġustifikazzjoni.
2. Irreferi għall-kwistjoni tat-traċċar (eż., `// #3498 — Phase 2 feature, not yet implemented`).
3. Neħħi l-iskrizzjoni fl-istess PR li tiffissa l-ksur — dħul qadim li ma jibqax trażżan vjolazzjoni attiva hija nnifisha difett (6A.3 stale-enforcement se tfalli l-gate fuq dħul orfni fil-lista ta' permessi ladarba jiġi implimentat).

Do** le** żid entrati tal-lista ta' permessi biex it-testijiet jgħaddu aktar malajr. Gejt aħdar b'lista ta 'permessi li qed tikber huwa sens falz ta' kwalità.

### Meta gate jonqos fuq PR tieghek

1. **Aqra bir-reqqa l-output tal-bieb** — jgħidlek eżattament liema fajl jew simbolu kiser ir-regola.
2. **Waħħal il-ksur** — l-biċċa l-kbira tal-gradi huma kontrolli tas-sistema tal-fajls deterministiċi li jgħaddu hekk kif il-kodiċi huwa korrett.
3. **Jekk il-ksur ikun pre-eżistenti** (jiġifieri, ma daħħalhiex imma l-bieb issa jkopriha): żid entrata tal-lista ta' permessi b'kumment ta' ġustifikazzjoni u kwistjoni ta' traċċar.
4. **Jekk il-bieb huwa ratchet** (kopertura, twissijiet ESLint, duplikazzjoni, kumplessità): il-bidla tiegħek għamlet il-metrika agħar. Waħħal il-kwistjoni sottostanti, jew (rari) ħaddem `npm run quality:ratchet -- --update` jekk il-bidla hija intenzjonata u d-degradazzjoni metrika hija aċċettabbli — iżda ddokumenta għaliex fid-deskrizzjoni PR.
5. **Xtiebi ta' konsulenza** (`continue-on-error: true`) huma informattivi — ma jimblukkawx merge imma jidhru fis-sommarju CI. Waħħalhom xorta waħda.

---

## Żieda ta' Gate Ġdid

1. Oħloq `scripts/check/check-<name>.mjs` (jew `.ts`). Il-gates tal-politika joħorġu b'0/1.
   Gates tat-tip ratchet joħorġu metrika lejn `quality-metrics.json` permezz ta' `collect-metrics.mjs`.
2. Żid `"check:<name>": "node scripts/check/check-<name>.mjs"` ma' `package.json`.
3. Qabbdu f'`.github/workflows/ci.yml` taħt il-job xieraq
   (politika → `lint` jew `docs-sync-strict`; ratchet → `quality-gate`).
4. Jekk ikollu lista ta' permessi, applika `reportStaleEntries()` minn
   `scripts/check/lib/allowlist.mjs` sabiex l-entrati skaduti jiġu identifikati awtomatikament.
5. Ikteb test f'`tests/unit/build/` li jkopri l-loġika ta' identifikazzjoni tal-gate.
6. Aġġorna dan id-dokument (żid ringiela mat-tabella tal-job rilevanti).

---

## Għodod għall-aġenti: LSP-in-the-loop (opt-in)

Lil hinn mill-gates tas-CI, OmniRoute jipprovdi scaffold **opt-in** `agent-lsp`
(`.mcp.json` fil-livell tal-proġett, Fażi 7 Kompitu 15). Oħloq `.mcp.json`
biex tesponi server tal-lingwa TypeScript lill-aġenti tal-ipprogrammar, sabiex isolvu s-simboli /
id-dijanjostiċi **qabel** jiktbu l-code — għodda komplementari ta' kompilazzjoni qabel dikjarazzjoni għal
`typecheck:core` li tnaqqas l-iżbalji ta' "simboli vvintati" mis-sors tagħhom. Intenzjonalment
ma jitgħabbiex awtomatikament (int tagħżel u tivverifika l-bridge MCP↔LSP); entrata difettuża tirreġistra biss
żball ta' konnessjoni u qatt ma tinterrompi s-sessjonijiet.

---

## Razzjonalizzazzjoni Backlog (ROI review — Fase 9 Onda 3)

Dan l-inventarju ġie rikonċiljat ma’ `ci.yml` fl-2026-06-17 (il-verżjoni preċedenti tħalliet barra `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence`). Reviżjoni ROI tas-sett rikonċiljat identifikat il-kandidati ta 'razzjonalizzazzjoni li ġejjin.** L-għaqdiet huma bidliet mekkaniċi CI ; iż flips/drops huma deċiżjonijiet ta’ politika riżervati għall-operatur.** Xejn hawn taħt għadu ma ġie applikat.

**Mhux dokumentat ukoll hawn fuq** (konsultattiv, sinjal baxx): ix-xogħol `docs-lint` (markdownlint + Vale, xogħol sħiħ `continue-on-error`) u l-flussi tax-xogħol tal-iskaner waħedhom `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` huwa `quality-baseline.json` iżda mhux irbit ma' ratchet imblukkar `ci.yml` — il-metrika bħalissa hija orfni.

### Amalgamazzjoni / dedup (mekkanika, riskju aktar baxx)

Kull kandidat ġie vvalidat kontra l-istat tal-bieb ħaj fl-2026-06-17 (trust-but-verify); diversi amalgamazzjonijiet "ovvji" irriżultaw li jaħbu d-dejn u huma** le** drop-ins nadif.

- **`check:docs-sync` tigi darbtejn** — waħdu fix-xogħol `lint` u għal darb'oħra ġewwa `check:docs-all` (`docs-sync-strict`) u l-husky pre-commit hook. ✅**DONE** — standalone `lint` invokazzjoni mneħħija.
- **CVE scanning** — ❌**NOT a clean merge.** `audit:deps` jimblokka pariri kritiċi u verifiki mhux kompluti fil-ħames lockfiles kollha, filwaqt li jirrappurtaw konsulenzi għoljin bħala twissijiet taħt il-politika attwali; `check:vuln-ratchet` (osv) jonqos biss fuq _regression_ vs il-linja bażi ċċekkjata u jirrifjuta kejl nieqes meta meħtieġ. Semantika differenti — twaqqa `audit:deps` titlef il-bieb kritiku assolut u l-irċevuti tal-verifika tal-pakkett indipendenti. Żomm it-tnejn.
- **Sejbien taċ-ċiklu** — ✅**DONE** (#15159 G-01/G-02). It-test il-qadim hawnhekk imsejjaħ `check:cycles` "il-bieb aħdar, ikkurat" u ġġustifika li jżommu jimblokka minħabba `check:circular-deps` (dpdm) irrapporta 91 ċiklu. Dak l-aħdar kien a** aħdar falz** : `check:cycles` skennja 5 sottodirettorji (450 fajl), qabbel biss `import|export … from` statiku , u niżel kull speċifikatur `@/` u `@omniroute/open-sse/`, għalhekk ma setax jara ċ-ċikli tal-alias + ta 'importazzjoni dinamika li ddominaw ir-repo. Fiss: il-bieb issa jimxi `src` + `open-sse` (5023 fajls), jiġbor specifiers mill- TypeScript AST (hekk `import("…")` jgħodd u t-tip-pożizzjoni `typeof import("…")` ma jagħmilx), u jsolvi tsconfig `paths`. Hija ssib** 14** ċikli, mhux 0. Minħabba li 14-il ċiklu pre-eżistenti ma jistgħux jiġu ffissati f'bieb PR, `check:cycles` issa huwa a** ratchet** (`--ratchet`, ceiling `metrics.cycles.value = 14` in `quality-baseline.json`, `direction: down`) — jimblokka kull _rigressjoni_ u l-għadd jista' jaqa' biss. CI runs `npm run check:cycles:ratchet`. Rides tal-ħruq bil**A-01** . `check:circular-deps` (dpdm) jibqa' konsultattiv bħala t-tieni opinjoni usa'.
- **Kumplessità** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): mixja waħda ESLint, tgħodd ruleId hekk ċiklomatika + max-lines u linji bażi konjittivi jibqgħu indipendenti; `check:complexity` / `check:cognitive-complexity` individwali jibqgħu għal `--update` lokali .
- **`/api` anti-hallucination** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): inventarju FS wieħed ta `src/app/api`, openapi-routes + docs-simboli għadhom jirrapportaw b'mod indipendenti; individwi jibqgħu għal ġirjiet lokali.
- **`check:node-runtime` taħdem fi 11-il impjieg** — ⚠️** ROI baxx .** Kull wieħed huwa runner separat u l-kontroll huwa < 1s; tfaddil totali ~ 10s, kontra li titlef gwardja rħisa għal kull xogħol. Mhux jiswew it-turn.
- **`typecheck:noimplicit:core` fuq CI lint** — ✅** jitneħħa mill-lint job** (kien konsultattiv `continue-on-error`); wiċċ tip imblukkar huwa `typecheck:core` + `check:type-coverage`. Iskrittura lokali miżmuma.

### Aqleb / tiddeċiedi (politika tal-operatur)

- `check:openapi-security-tiers` (advisory) — ❌**NOT cleanly flippable.** Joħroġ minn 0 iżda jwissi li diversi rotot `traffic-inspector` taħt `LOCAL_ONLY_API_PREFIXES` m'għandhomx l-annotazzjoni `x-loopback-only: true`. L-infurzar tiegħu jeħtieġ li jiżdiedu dawk l-annotazzjonijiet ma ' `openapi.yaml` l-ewwel.
- `typecheck:noimplicit:core` (konsultattiv) — fil-biċċa l-kbira subsumed by the blocking `check:type-coverage` ratchet. Flip għal ratchet jew waqqa t-tieni `tsc` pass żejda.
- `test:vitest:ui` (issa** imblukkar** ) — fallimenti pre-eżistenti huma espliċitament esklużi `vitest.config.ts` b'kummenti ta' traċċar `// #8618` ; fallimenti ġodda jfallu l-impjieg.
- `check:secrets` (gitleaks, ratchet imblukkar iffriżat fi 3 pożittivi foloz dokumentati) — allowlist it-3 biex tilħaq 0, jew demote għal konsultattiv. Jikkoinċidi GitHub native secret-scanning + `check:public-creds`.
- `check:pr-evidence` (imblukkar, greps PR-body prose) — high false-positive risk; idgħajjef l-infurzar ta' Hard Rule #18 jekk jitwaqqa', għalhekk din hija sejħa ta' politika ġenwina.
- `semgrep` (advisory standalone) — overlaps CodeQL għall-familji OWASP ; wajer il-linja bażi tagħha għal ratchet jew qatra.

---

## Dokumentazzjoni Relatata

- Katina tal-provvista (provenjenza, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — kontroll tal-parità tas-sett taċ-ċwievet

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, xogħol `i18n-ui-coverage`).
Iqabbel is-sett taċ-ċwievet terminali ta’ kull `src/i18n/messages/<locale>.json` ma’ `en.json` u jfalli
jekk ikun hemm xi ċavetta terminali nieqsa jew żejda, irrispettivament minn meta żdiedet iċ-ċavetta. Il-markaturi
`__MISSING__:` jitqiesu bħala preżenti (il-kontenut tagħhom jaqa’ taħt ir-responsabbiltà tal-kontroll tal-proporzjon). Dan huwa l-komplement assolut
taż-żewġ kontrolli bbażati fuq id-differenzi/il-perċentwali: `check-ui-keys-coverage` jinforza minimu ta’ 80 % għal kull
locale (43 ċavetta nieqsa minn ~13,000 xorta jidhru bħala 99.7 %) u `check-new-key-coverage` jevalwa
biss iċ-ċwievet li PR iżid ma’ `en.json`. Lott ta’ locales jiġi ġġenerat mill-`en.json` tal-jum
li fih tinħoloq il-fergħa tiegħu u jibqa’ jiġi tradott għal jiem sħaħ filwaqt li l-bażi tkompli żżid iċ-ċwievet; il-PR tal-lott innifsu ma jżid
l-ebda ċavetta, għalhekk iż-żewġ kontrolli relatati baqgħu siekta meta l-lott 1 (#13044) ġie integrat b’43 ċavetta nieqsa f’disa’
locales u l-lott 2 (#13660) b’10 ċwievet neqsin fi tmienja (2026-09-15). Irranġa falliment b’
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; ċavetta terminali `extra`
tfisser li s-sors neħħieha — ħassarha mil-locale. `--warn` jirrapporta mingħajr ma jfalli.
`--catalog=cli` iwettaq l-istess tqabbil fuq `bin/cli/locales` (`npm run i18n:check-keys:cli`);
iż-żewġ passi jinsabu fix-xogħol `i18n-ui-coverage`.

#### `check-new-key-coverage` — kontroll i18n għal ċwievet ġodda

Kontroll relatat ma’ `check-ui-value-drift`. Dak jaqbad valur bl-Ingliż li jkun ġie **miktub mill-ġdid**
filwaqt li t-traduzzjonijiet tiegħu jkunu tħallew kif kienu; dan jaqbad ċavetta bl-Ingliż li tkun ġiet **miżjuda**
filwaqt li xi locales qatt ma jkunu rċevewha.

`check-ui-keys-coverage` ma jistax jinduna b’din il-klassi ta’ problema: huwa jinforza minimu perċentwali għal kull locale, u
ħdax-il ċavetta nieqsa minn ~13,000 iħallu l-kopertura f’99.9%. Perċentwal għal kull lingwa ma jistax
jesprimi “din il-karatteristika ġiet rilaxxata mingħajr traduzzjoni” — karatteristika sħiħa tista’ tasal f’locale ġdid mingħajr
ebda test u qatt ma tbiddel iċ-ċifra.

L-inċident li jirrappreżenta: Fażi 3 tal-Orchestration Canvas ittraduċiet il-ħdax-il ċavetta tagħha fil-
42 locale li kienu jeżistu dak iż-żmien. Sigħat wara, il-lott tal-lingwi tal-UE (#13044) wassal ir-repo
għal 51 locale, u d-disa’ locales ġodda (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) qatt ma
rċevewhom. `deepMergeFallback` jissostitwixxi ċavetta nieqsa bl-Ingliż, għalhekk il-mod tal-falliment kien
UI mhux tradotta minflok UI vojta — problema reali, u siekta skont id-disinn.

Bħall-kontroll relatat miegħu, dan huwa **konxju mid-differenzi**, billi jqabbel l-Ingliż fil-bażi tal-merge mas-siġra
tax-xogħol, għalhekk il-lakuni li kienu jeżistu minn qabel jibqgħu ffriżati u ma kienx hemm bżonn ta’ migrazzjoni biex il-kontroll jiġi attivat.

**Markatur `__MISSING__:<english>` ma jissodisfax dan il-kontroll (mill-2026-09-17).** Qabel kien
il-posponiment dokumentat — waqt l-eżekuzzjoni s-sistema taqa’ lura għall-Ingliż korrett — sakemm tmien PRs ta’ karatteristiċi fl-
2026-09-16 żiedu 61 ċavetta u poġġew il-markatur fis-65 locale kollha minflok ma ttraduċewhom: dan
il-kontroll aċċetta kull waħda minnhom, xejn ma mblokka l-PRs, u l-kontroll imblokkanti tal-proporzjon ta’ traduzzjonijiet reali
mbagħad falla fil-punt tar-rilaxx għal kulħadd (pt-BR 3.2 % > 2.5 % + 0.5). Markatur issa jiġi ġġudikat
bħala traduzzjoni nieqsa. Irranġa falliment b’
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, jew
il-locales kollha b’mod parallel permezz ta’ `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
sikur meta jintuża b’mod detached, u jirrifjuta li jibda mingħajr il-varjabbli tal-ambjent `OMNIROUTE_TRANSLATION_*`). Ċavetta li trid tibqa’
bl-Ingliż (isem fiss ta’ prodott/magna/flag) għandha tkun f’`scripts/i18n/untranslatable-keys.json`,
qatt wara markatur. `vi` jipprojbixxi l-markaturi għalkollox (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — kontroll tat-testijiet sospiżi

Fajl fil-lista `exclude` ta’ `vitest.config.ts` huwa test li ma jitħaddimx, u jidher bħala
kopertura għal min jaqra s-siġra. Tnejn u sittin fajl akkumulaw wara l-kumment
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Il-kwistjoni #8618 ingħalqet fil-
2026-08-11 filwaqt li l-lista li kienet issegwi kibret minn 45 entrata għal 62, b’kull waħda ġdida tiret kumment
li jindika kwistjoni magħluqa. Meta l-lista finalment tkejlet fajl b’fajl (#13204), **51 mit-62
għaddew kontra s-siġra attwali mingħajr ebda bidla fis-sors**.

Il-kontroll jirrikjedi li kull esklużjoni li tirriżolvi għal fajl reali (a) issemmi kwistjoni ta’ traċċar u
(b) tidher f’`config/quality/vitest-exclusions.json` bl-istatus imkejjel tagħha, sabiex iż-żieda ta’ waħda tkun
differenza li tista’ tiġi rieżaminata f’fajl apposta minflok sempliċement linja oħra f’array ta’ 60 entrata. Huwa intenzjonalment
ma jerġax iħaddem it-testijiet esklużi — dan jieħu ~10 minuti u għandu jsir f’xogħol perjodiku; l-
inventarju jirreġistra meta kull wieħed tkejjel l-aħħar.
