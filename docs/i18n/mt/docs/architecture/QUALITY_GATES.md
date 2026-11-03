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

## Inventar tal-gates u profili tal-eżekuzzjoni

### Aċċettazzjoni tal-kandidati

Il-flussi tax-xogħol CI u Quality Gates kull wieħed joħroġ verdett stabbli: `Gate / CI` u
`Gate / Quality`. Il-politika tal-aċċettazzjoni verżjonata tagħhom telenka kull xogħol upstream
bħala meħtieġ jew konsultattiv. Xogħol meħtieġ applikabbli għandu jirnexxi: riżultati nieqsa,
ikkanċellati, maqbuża, pendenti u mhux magħrufa ma jistgħux jistabbilixxu PASS. Klassifikazzjoni valida
ta’ dokumentazzjoni biss jew katalgu biss tista’ tagħmel lane tal-kodiċi mhux applikabbli;
PR abbozzat mhuwiex kandidat aċċettat. Tikketta `hotfix` ma teżentax l-evidenza.

Iż-żewġ flussi tax-xogħol ikopru PRs lejn il-fergħat main/release, pushes lejn `main`, dispatch manwali
u avvenimenti merge-group. Push, dispatch u merge-group iħaddmu l-għażla sħiħa. Pushes lejn
`release/**` ma jibdewhomx (2026-10-18): kull bidla diġà ħaddmet il-matriċi fuq il-PR tagħha
u l-kombinazzjoni magħquda hija xogħol Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane).
Forks u merge groups jużaw runners ospitati għal xogħlijiet li inkella jagħżlu runners self-hosted;
il-kapaċità ospitata suffiċjenti għandha tiġi vverifikata qabel it-tnedija.

Kull riċevuta JSON tidentifika s-SHA checked-out, il-run u l-attentat tal-fluss tax-xogħol.
Is-CLI tirrifjuta diskrepanza bejn is-SHA tal-checkout u dak tal-avveniment. It-testijiet tal-fluss
tax-xogħol jorbtu s-sħubija fil-politika mal-lista `needs` tax-xogħol tal-verdetti sabiex lane ġdida
jew imneħħija ma tkunx tista’ tisparixxi bil-moħbi. Ir-riċevuti jkopru l-fluss tax-xogħol tagħhom stess,
mhux il-pubblikazzjoni, l-iskjerament jew l-interni ta’ skaner konsultattiv eżistenti. L-attivazzjoni
taż-żewġ ismijiet tal-kontrolli fir-regoli tal-fergħa hija bidla amministrattiva separata; iż-żieda ta’
dawn ix-xogħlijiet waħedha ma tipproteġix fergħa.

### Inventar tal-iskans statiċi

L-inventar verżjonat tal-aliases npm u s-sħubija fl-iskans statiċi jinsabu f’
`config/quality/gate-manifest.json`. Ħaddem `npm run check:gate-manifest` biex tivvalida l-ismijiet
tal-iskripts u l-kmandi eżatti kontra `package.json`; żidiet, tneħħijiet u drift fil-kmandi jfallu
kemm il-hook lokali kif ukoll ix-xogħlijiet tal-klassifikazzjoni tal-bidliet f’CI.
Alias mhuwiex xogħol tal-fluss tax-xogħol, istanza tal-matriċi jew każ tat-test: dawn l-għaddijiet
m’għandhomx jiġu ppreżentati bħala interkambjabbli.

Uża `npm run quality:scan -- --list` jew `npm run quality:scan:fast -- --list`
biex tispezzjona l-aliases magħżula mingħajr ma tesegwihom. Ir-runner isejjaħ l-entrypoint ta’
npm, għalhekk ir-runtime tiegħu (inkluż Bun fejn ikkonfigurat) jinżamm.
Il-manifest jirreġistra aliases barra minn dawk il-profili bħala invokati separatament, u
kmandi ta’ manutenzjoni huma pprojbiti fil-profili tal-iskans li jinqraw biss.

Dawn il-profili jkopru l-iskan statiku biss. Ma jiċċertifikawx it-testijiet tal-prodott,
il-kopertura, l-ippakkjar, il-kontrolli esterni jew l-aċċettazzjoni sħiħa tar-rilaxx ta’ kandidat.
L-aċċettazzjoni tal-fluss tax-xogħol tuża `config/quality/admission-policy.json` u
`scripts/quality/admission-verdict.mjs`. Il-profili tal-osservatur tar-rilaxx jibqgħu separati;
ispezzjona l-kontrolli u r-riċevuti applikabbli tagħhom b’mod indipendenti. L-inventarju deskritt
hawn taħt huwa referenza, mhux prova li gate fil-fatt tħaddem.

L-iskripts jinsabu taħt `scripts/check/` (gates tal-politika) u `scripts/quality/` (magna tar-ratchet).
Is-sors awtorevoli ta’ CI huwa `.github/workflows/ci.yml`.

### Mogħdija mgħaġġla għall-PRs tar-rilaxx (`quality.yml`)

`.github/workflows/quality.yml` jikkomplementa lil CI fuq PRs ta’ main/release, pushes lejn `main`,
dispatch u merge groups. Il-PRs jużaw kontrolli mgħaġġla ffiltrati skont il-mogħdija. Il-build duplikat
diżattivat b’mod permanenti tneħħa; il-kontrolli reali tal-build/package/boot jibqgħu f’CI.

| Xogħol                                           | Ambitu                                                                                                                                                                                                                                                | Imblukkanti        |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `Docs Gates (fast-path)`                         | PRs tad-dokumentazzjoni/kodiċi; referenzi tad-dokumentazzjoni tal-API u docs-all                                                                                                                                                                      | Iva                |
| `Fast Quality Gates`                             | PRs tal-kodiċi; kontrolli statiċi, typecheck, typecheck tad-dashboard, testijiet tal-unitajiet affettwati                                                                                                                                             | Iva                |
| `Forgotten sibling tests`                        | PRs tal-kodiċi; moduli mibdula traċċati lejn konsumaturi statiċi u testijiet kandidati tal-aħwa; il-mogħdijiet tal-barrel u tal-importazzjoni dinamika jiġu rrappurtati bħala dijanjostiċi konsultattivi, b’eċċezzjonijiet referenzjati tal-allowlist | **Konsultattiv**   |
| `Vitest (fast-path)`                             | PRs tal-kodiċi; suite vitest mgħaġġla                                                                                                                                                                                                                 | Iva                |
| `Unit Tests fast-path`                           | PRs tal-kodiċi; suite tal-unitajiet b’4 shards                                                                                                                                                                                                        | Iva                |
| `No new ESLint warnings`                         | PRs tal-kodiċi; kontroll tal-lint konxju tas-suppressions                                                                                                                                                                                             | Iva, inklużi forks |
| `Merge integrity (changelog + generated skills)` | PRs mhux abbozzati; sinkronizzazzjoni taċ-changelog u tal-ħiliet iġġenerati                                                                                                                                                                           | Iva, inklużi forks |

#### Rapport tat-testijiet tal-aħwa minsija

`npm run check:forgotten-sibling-tests` jerġa’ juża r-riżolver tal-importazzjonijiet li jinsab wara l-mappa tal-impatt tat-testijiet.
Għal kull modulu tal-produzzjoni mibdul, jirrapporta ktajjen deterministiċi ta’
`changed module/symbol -> static consumer -> candidate sibling test` meta t-test kandidat
ma jkunx preżenti fid-diff tal-pull request. Is-sommarju Markdown u r-riżultat JSON jinżammu bħala
l-artifatt tal-workflow `forgotten-sibling-tests` għall-kalibrazzjoni qabel kwalunkwe introduzzjoni li timblokka.

L-esportazzjonijiet mill-ġdid tal-barrel u l-importazzjonijiet dinamiċi huma biss dijanjostiċi tar-riżoluzzjoni; qatt ma joħolqu
sejbien li jimblokka. L-eċċezzjonijiet riveduti jinsabu f’
`config/quality/forgotten-sibling-allowlist.json`. Kull entrata trid tissemma lill-konsumatur u lit-test kandidat,
tagħti raġuni speċifika, u tinkludi link għal issue jew pull request ta’ GitHub. Entrati b’format mhux validu jfallu b’mod magħluq. L-eċċezzjonijiet ma jistgħux jinjoraw test kandidat imħassar jew diff li jżid `.skip`/`.todo`;
it-tnaqqis tal-affermazzjonijiet u l-forom l-oħra ta’ masking jibqgħu r-responsabbiltà tal-gate
indipendentement li jimblokka `check:test-masking`.

### Xogħol: `lint`

Jitħaddem fuq kull PR lejn `main`. Jimblokka l-merge jekk ifalli.

| Script (`npm run ...`)            | Jivverifika                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Imblukkar                                    |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:node-runtime`              | Il-verżjoni ta’ Node.js tinsab fil-medda appoġġjata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Iva                                          |
| `check:cycles`                    | Importazzjonijiet ċirkolari fil-`src/` + `open-sse/` kollha (ibbażati fuq AST, b’`paths` ta’ tsconfig riżolti). Il-ħruġ bażiku huwa 1 kull meta teżisti kwalunkwe ċiklu (mekkaniżmu fail-closed minn #15281) u jelenka l-SCCs. `check:cycles:ratchet` (dak li jmexxi CI) jimblokka meta l-għadd jaqbeż il-limitu `metrics.cycles` f’`quality-baseline.json` — bħalissa 14, `direction: down`, għalhekk jista’ jonqos biss (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Iva (ratchet)                                |
| `check:boundary`                  | Akkoppjament `open-sse → src`: importazzjonijiet uniċi minn fajl għal fajl mill-magna lejn l-applikazzjoni (`scripts/quality/measure-boundary.mjs`; il-lista tal-edges hija l-backlog ta’ rimedjazzjoni tal-qsim tal-qalba/moduli v4). Il-ħruġ bażiku huwa rapport konsultattiv (l-istess bħal `quality:boundary`). `check:boundary:ratchet` (dak li jmexxi CI, inkluż fil-loop tar-ratchet tal-fast-gates ta’ `quality.yml`) jimblokka meta l-għadd jaqbeż il-limitu `metrics.boundaryOpenSseToSrc` f’`quality-baseline.json` — inizjalizzat għal 771, `direction: down`; `--update` inaqqsu biss; relattiv għall-base fuq il-PRs (`--base-ref`, ara hawn taħt)                                                                                                                                                                                                                                                                                | Iva (ratchet)                                |
| `check:route-validation:t06`      | Skemi Zod preżenti fir-rotot kollha (politika tat-Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Iva                                          |
| `check:any-budget:t11`            | L-għadd ta' `@ts-expect-error // any` ma jaqbiżx il-baġit (catraca ta' Tier 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Iva                                          |
| `check:provider-consistency`      | Kull provider f'`providers.ts` għandu entrata korrispondenti f'`providerRegistry.ts` (u viċi versa, fil-limiti tal-lista permessa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Iva                                          |
| `check:model-lifecycle`           | It-tliet tabelli tar-routing miżmuma manwalment jibqgħu konsistenti mal-istampa tal-istat taċ-ċiklu tal-ħajja inkluża fir-repożitorju (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ma jagħti punteġġ lil ebda ID irtirat li `REGISTRY` jista' juża fir-routing; kull mira ta' `BUILT_IN_ALIASES` hija preżenti f'`REGISTRY` u assenti mill-istampa tal-IDs irtirati; kull ID irtirat li għadu f'`REGISTRY` jiġi mibgħut 'il quddiem jew ikun elenkat f'`allowedRetiredInCatalog`; u l-ebda sors jew mira ta' `DEFAULT_DEGRADATION_MAP` ma tidher bħala rtirata f'dik l-istampa. Dan ma jippruvax li mudell bħalissa qed jiġi moqdi minn upstream attiv. Offline — iqabbel ma' `config/quality/model-lifecycle.json`, aġġornat manwalment permezz ta' `npm run quality:refresh-model-lifecycle` (netwerk; mhux imqabbad ma' CI). `allowedRetiredInCatalog` huwa ratchet għat-tnaqqis tal-lista: żid entrata biss flimkien ma' issue ta' traċċar. | Iva                                          |
| `check:fetch-targets`             | Kull `fetch("/api/...")` f'`src/` fuq in-naħa tal-klijent jirriżulta f'`route.ts` reali                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Iva                                          |
| `check:deps`                      | Id-dependencies kollha li jistgħu jiġu installati permezz ta' `npm install` f'kull `package.json` fir-repo jinsabu f'`dependency-allowlist.json`; pakketti ġodda mhux pinjati jew slopsquatted jiġu mmarkati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Iva                                          |
| `audit:deps`                      | `npm audit` (root + electron) — l-ebda avviż ta' severità għolja/kritika (jikkoinċidi ma' `check:vuln-ratchet` ta' osv; ara l-Backlog tar-Razzjonalizzazzjoni)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Iva                                          |
| `check:lockfile`                  | Integrità ta’ `package-lock.json` — reġistru https, hashes tal-integrità, l-ebda override tal-host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Iva                                          |
| `check:licenses`                  | Lista ta’ permessi tal-liċenzji SPDX għad-dipendenzi tal-produzzjoni                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Iva                                          |
| `check:tracked-artifacts`         | L-ebda artifact tal-build / symlink ta’ `node_modules` ikkummittjat (jitħaddem ukoll fil-pre-commit ta’ husky; il-pre-push huwa intenzjonalment ħafif — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Iva                                          |
| `check:ai-attribution`            | L-ebda trailer `Co-Authored-By` ta’ AI/bot jew footer ta’ ġenerazzjoni bl-AI fil-commits, fit-titlu jew fil-korp tal-PR — Regola Iebsa #16 (fil-loop tal-fast-gates ta’ `quality.yml` għal PR→`release/**` — jaqra l-payload tal-avveniment, ma jagħmel xejn barra mill-PRs — u pass speċifiku għall-PR fil-lint ta’ `ci.yml` għal PR→`main`; kif ukoll fil-hook `commit-msg` ta’ husky; koawturi umani permessi; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:vitest-exclusions`         | Kull esklużjoni ta’ Vitest tispeċifika issue ta’ traċċar u tidher f’`config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Iva                                          |
| `check:file-size`                 | Il-fajls tas-sors (`.ts`/`.tsx` f’`src/`, `open-sse/`, `electron/`, `bin/`) jibqgħu fil-limitu ta’ `cap` u l-fajls tat-test (`*.test.ts(x)`) fil-limitu ta’ `testCap`; il-fajls iffriżati f’`file-size-baseline.json` (`frozen` / `testFrozen`) ma għandhomx jikbru lil hinn mid-daqs irreġistrat tagħhom                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Iva                                          |
| `check:error-helper`              | Ir-risposti tal-iżbalji fl-eżekuturi/handlers jużaw `buildErrorBody()` / `sanitizeErrorMessage()` (Regola Stretta #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Iva                                          |
| `check:migration-numbering`       | Il-fajls SQL tal-migrazzjonijiet huma nnumerati b’mod sekwenzjali, mingħajr lakuni jew duplikati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Iva                                          |
| `check:public-creds`              | L-ebda `client_id`/`client_secret` litterali ta’ OAuth jew Web keys ta’ Firebase barra minn `publicCreds.ts` (Regola Stretta #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Iva                                          |
| `check:db-rules`                  | L-ebda SQL mhux ipproċessat barra mill-moduli ta’ `src/lib/db/`; l-ebda barrel-imports minn `localDb.ts` (Regoli Stretti #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Iva                                          |
| `check:known-symbols`             | L-eżekuturi tal-fornituri, l-istrateġiji tar-routing, u t-tradutturi rreġistrati fit-tabelli tad-dispatch jaqblu mal-fajls fuq id-diska — l-ebda simbolu orfni jew mhux iddikjarat                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Iva                                          |
| `check:route-guard-membership`    | Kull rotta li tniedi proċess tifel hija kklassifikata minn `isLocalOnlyPath()` (Regoli Stretti #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Iva                                          |
| `check:test-discovery`            | Kull fajl `*.test.ts` / `*.spec.ts` fir-repożitorju jinġabar minn tal-inqas test runner wieħed (ratchet: il-lista ta’ fajls orfni f’`test-discovery-baseline.json` tista’ tonqos biss)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Iva                                          |
| `check:test-tla-order`            | L-ebda fajl `node:test` taħt `tests/unit` ma jirreġistra test, jilħaq `await` fil-livell ta’ fuq, u mbagħad jirreġistra aktar (#18045; ratchet: `test-tla-order-allowlist.json` tista’ tonqos biss)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Iva                                          |
| `check:agent-skills-sync`         | L-artifatti ġġenerati ta’ agent-skills jaqblu mal-katalgu tas-sors tagħhom (l-ebda diverġenza)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:provider-asset-provenance` | Il-logos/assi tal-provider għandhom entrata ta’ provenjenza rreġistrata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `lint:json`                       | Il-fajls ta’ konfigurazzjoni JSON jiġu pparsjati u jissodisfaw ir-regoli tal-lint tar-repożitorju                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `typecheck:core`                  | Kumpilazzjoni ta’ TypeScript mingħajr żbalji (twissijiet konsultattivi biss)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Iva                                          |
| `typecheck:noimplicit:core`       | `noImplicitAny` strett — maħsub għall-ġejjieni; ħafna siti ta’ sejħiet eżistenti għadhom jeħtieġu annotazzjonijiet                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **Konsultattiv** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` limitat għal `src/app/(dashboard)/**` (#7033) — l-allowlist ikkurata ta’ 27 fajl ta’ `typecheck:core` ma tinkludi l-ebda TSX tad-dashboard, u `next build` lanqas ma jwettaq type-checking fuqu (`next.config.mjs` jistabbilixxi `ignoreBuildErrors: true`), għalhekk regressjonijiet ta’ identifikaturi orfni hemmhekk (#6625/#6909) ma kinux viżibbli fis-CI. Id-differenzi jitqabblu ma’ baseline ffriżat tal-għadd għal kull fajl/kodiċi TS (`config/quality/dashboard-typecheck-baseline.json`, bl-istess mudell ta’ infurzar ta’ dejta skaduta bħal `check:known-symbols`) — huma biss żbalji ĠODDA lil hinn mill-għadd fil-baseline li jfallu l-gate; naqqas il-limitu b’`--update` meta jiġi rranġat żball pre-eżistenti.                                                                                                                                                                                                         | Iva                                          |

### Xogħol: `quality-gate`

Jibda wara `test-coverage`. Jipprevjeni l-merge jekk ifalli.

| Script                       | Jivvalida                                                                                                                                                                                                       | Jimblokka                  |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `quality:collect`            | Joħroġ `quality-metrics.json` (l-għadd ta’ twissijiet tal-ESLint, u l-coverage mir-rapport magħqud tal-shards)                                                                                                  | Iva (upstream tar-ratchet) |
| `quality:ratchet`            | Kull metrika f’`quality-baseline.json` ma tkunx marret lura (it-twissijiet tal-ESLint ≤ baseline; coverage ≥ baseline)                                                                                          | Iva                        |
| `check:duplication`          | Id-duplikazzjoni tal-kodiċi (jscpd@4) ma taqbiżx il-baseline f’`quality-baseline.json`                                                                                                                          | Iva                        |
| `check:complexity`           | Il-kumplessità ċiklomatikka fil-livell tal-fajl ma taqbiżx il-limitu (core ESLint `complexity` + `max-lines-per-function`)                                                                                      | Iva                        |
| `check:cognitive-complexity` | Ratchet tal-kumplessità konjittiva (`eslint-plugin-sonarjs`) — pass separat tal-ESLint; is-CI iħaddem it-tnejn magħqudin bħala l-pass uniku `check:complexity-ratchets`                                         | Iva                        |
| `check:dead-code`            | Ir-ratchet tal-esportazzjonijiet/fajls mhux użati (knip) ma jmurx lura meta mqabbel mal-baseline                                                                                                                | Iva                        |
| `check:compression-budget`   | Il-baġit tal-benchmark tal-kompressjoni — l-artijiet minimi tal-iffrankar tat-tokens għal kull engine ma għandhomx imorru lura                                                                                  | Iva                        |
| `check:type-coverage`        | Ir-ratchet tal-perċentwal tat-tipjar (`type-coverage`) ma jmurx lura; fil-biċċa l-kbira jinkludi `typecheck:noimplicit:core`                                                                                    | Iva                        |
| `check:codeql-ratchet`       | L-għadd ta’ twissijiet miftuħa ta’ CodeQL ma jmurx lura (jaqra permezz ta’ `gh api`; jaqbeż b’mod grazzjuż mingħajr token) — għall-frekwenza tat-tiġdid u l-trigger manwali: ara "Ratchet ta’ CodeQL" hawn taħt | Iva                        |

### Xogħol: `quality-extended`

Ix-xogħol kollu huwa konsultattiv (`continue-on-error: true`). Ir-ratchets ibbażati fuq npm jaħdmu
verament; l-iskanners esterni jiġu installati permezz ta’ `gh release download` u jaqbżu lilhom infushom
(exit 0) meta binarju jkun għadu nieqes.

| Script                   | Jivvalida                                                                                                                                                                                                                          | Jimblokka                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `check:circular-deps`    | L-ebda dipendenza ċirkolari (dpdm)                                                                                                                                                                                                 | **Konsultattiv**                                             |
| `check:bundle-size`      | Id-daqs tal-bundle ma jaqbiżx il-limitu                                                                                                                                                                                            | **Konsultattiv**                                             |
| `check:secrets`          | Skannjar ta’ sigrieti (gitleaks) — jaqbeż jekk il-binarju jkun nieqes                                                                                                                                                              | **Konsultattiv**                                             |
| `check:vuln-ratchet`     | Il-vulnerabbiltajiet tad-dipendenzi (osv-scanner) ma jmorrux lura — jaqbeż jekk il-binarju jkun nieqes                                                                                                                             | **Konsultattiv**                                             |
| `check:workflows`        | Lint tal-workflows (actionlint + zizmor); skanners neqsin/miksura, rapporti invalidi jew baseline tar-ratchet nieqes ifallu bħala INCOMPLETE. Sejbiet validi jsegwu l-politika magħżula ta’ strict/advisory/ratchet                | Eżekuzzjoni meħtieġa; ir-ratchet ta’ zizmor jimblokka fis-CI |
| `check:openapi-breaking` | Bidliet li jkissru l-kuntratt pubbliku tal-API (`openapi.yaml`) meta mqabbel mal-branch bażi (oasdiff) — joħroġ `openapiBreaking=N`; jaqbeż jekk oasdiff ikun nieqes jew jekk l-ispeċifikazzjoni bażi ma tkunx tista’ tiġi solvuta | **Konsultattiv**                                             |

### Xogħol: `docs-sync-strict`

Jitħaddem fuq kull PR lejn `main`. Jipprevjeni l-merge jekk ifalli.

| Skript                         | Jivvalida                                                                                                                                                                                                       | Imblokkanti                       |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `check:docs-all`               | Meta-gate li jmexxi s-6 sub-gates ta’ hawn taħt b’mod sekwenzjali                                                                                                                                               | Iva                               |
| ↳ `check:docs-sync`            | Konsistenza tal-verżjonijiet ta’ CHANGELOG / OpenAPI / llm.txt                                                                                                                                                  | Iva                               |
| ↳ `check:docs-counts`          | L-għadd fil-proża (għadd ta’ providers, għadd ta’ migrazzjonijiet, eċċ.) ikun fi ħdan it-tieqa tar-ratcheting tal-għadd reali                                                                                   | Iva                               |
| ↳ `check:env-doc-sync`         | Kull env var f’`.env.example` tkun dokumentata f’tabella tad-dokumentazzjoni, u viċi versa                                                                                                                      | Iva                               |
| ↳ `check:deprecated-versions`  | Ma jkunx hemm strings ta’ verżjonijiet deprekkati fid-dokumentazzjoni                                                                                                                                           | Iva                               |
| ↳ `check:doc-links`            | Il-links interni tal-Markdown fid-dokumentazzjoni jwasslu għal fajls reali (format `[text]`/`(path)`)                                                                                                           | Iva                               |
| ↳ `check:fabricated-docs`      | Ir-rotot, l-env vars, il-kmandi CLI, l-ismijiet tal-hooks u l-mogħdijiet tal-fajls imsemmija fid-dokumentazzjoni jeżistu fil-codebase. Gate strett permezz ta’ `--strict`; mingħajr il-flag ifalli b’mod artab. | Iva (permezz ta’ `--strict` f’CI) |
| `check:cli-i18n`               | Il-strings tal-kmandi CLI jkunu preżenti fil-fajls kollha tal-locale tal-i18n                                                                                                                                   | Iva                               |
| `check:openapi-coverage`       | L-ispeċifikazzjoni OpenAPI tkopri mill-inqas limitu minimu ratcheted tar-rotot reali                                                                                                                            | Iva                               |
| `check:openapi-security-tiers` | L-annotazzjonijiet tal-livelli tas-sigurtà f’`openapi.yaml` ikunu konsistenti mal-klassifikazzjonijiet ta’ `routeGuard.ts`                                                                                      | **Konsultattiv**                  |
| `check:openapi-routes`         | Kull path f’`openapi.yaml` iwassal għal `route.ts` reali (kontra l-alluċinazzjonijiet)                                                                                                                          | Iva                               |
| `check:docs-symbols`           | Kull referenza `/api/...` f’`docs/**/*.md` twassal għal `route.ts` reali (kontra l-alluċinazzjonijiet)                                                                                                          | Iva                               |
| `i18n translation drift`       | Keys mhux tradotti fil-fajls tal-locale tal-i18n — twissija biss                                                                                                                                                | **Konsultattiv**                  |

It-tnax-il SVG tal-README taħt `docs/diagrams/` huma ġġenerati (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` jerġa’ jiġġenera kollha). Kull wieħed għandu test unitarju ta’ tqabbil tal-bytes (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) li jfalli meta l-fajl committjat ikun skadut, u `check:docs-counts` jaqra n-numri kanoniċi min-nodi `<text>` tagħhom — u għalhekk il-pass tal-outlining iżomm kull string outline fil-fajl bħala `<text>` inviżibbli. Il-kontroll tan-numri kanoniċi tal-SVG jaqra l-fajls elenkati f’`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, kif ukoll `public/images/tier-flow-dark.svg` u `tier-flow-light.svg`; il-claims free-forever, catalog-entry, recurring-pool u scoring-factors jaqraw ukoll `promise-pillars.svg`, `free-tier-budget.svg` u `strategies-grid.svg`. `free-tier-budget.svg` jiġbed iċ-ċifri tiegħu mill-catalog loader attiv, għalhekk bidla f’`FREE_MODEL_BUDGETS` jew f’isem ta’ provider muri tagħmel CI aħmar sakemm dak il-fajl jerġa’ jiġi ġġenerat.

### Job: `i18n-ui-coverage`

| Skript                            | Jivvalida                                                                                                                                                                                   | Imblokkanti      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage` (inline) | Il-kopertura tal-UI i18n keys tkun ≥ 65%                                                                                                                                                    | Iva              |
| `check-ui-value-drift` (inline)   | Valur **English** miktub mill-ġdid ma jħalli l-ebda traduzzjoni skaduta warajh                                                                                                              | Iva              |
| `check-new-key-coverage` (inline) | Key **ġdida** bl-Ingliż tkun tradotta f’kull locale — marker `__MISSING__:` jiġi rrifjutat                                                                                                  | Iva              |
| `check-translation-ratio`         | Il-proporzjon ta’ traduzzjoni reali għal kull locale (identiku għall-Ingliż / placeholder / nieqes barra mill-allowlist) ma jaqbiżx `config/quality/i18n-translation-baseline.json` + slack | **Konsultattiv** |

Jeħtieġ `fetch-depth: 0` — il-gate tal-value-drift iqabbel `en.json` mal-merge base.

#### `check-ui-value-drift` — gate ta’ traduzzjonijiet skaduti

Jaħtaf ir-rigressjoni waħda tal-i18n li l-kontrolli strutturali l-oħra ma jistgħux jaraw: valur bl-Ingliż
jinkiteb mill-ġdid u t-traduzzjonijiet derivati mill-Ingliż _preċedenti_ jibqgħu lura, u għalhekk
l-utenti mhux Ingliżi jibqgħu jaqraw test b’kunfidenza, iżda issa żbaljat.

Dan ġara tassew. `oauthModal.googleOAuthWarning` inkiteb mill-ġdid meta daħal il-helper tal-login ta’ Antigravity
(#5203); **39 minn 43 locale** żammew test li jgħid lill-operaturi biex “jikkupjaw il-URL sħiħ u jwaħħluh
hawn taħt” — fluss li ma jistax jitlesta għal dak il-provider. Ma ndunawx bih qabel #8463 minħabba li:

- `sync-ui-keys` jimla biss iċ-ċwievet li huma **assenti**, qatt dawk li huma **skaduti**;
- `check-ui-keys-coverage` jgħodd il-_preżenza_ taċ-ċwievet, għalhekk traduzzjoni skaduta titqies koperta;
- `check-translation-drift` isegwi l-mirja tad-dokumentazzjoni `docs/i18n/<locale>/**.md` —
  qatt ma jaqra `src/i18n/messages/*.json`. Imblukkat fil-job `docs-sync-strict` mir-resinkronizzazzjoni
  ta’ 2026-09: editja dokument ewlieni → `npm run i18n:run -- --files=<doc>` (fil-livell tat-taqsima, irħis).

**Jikkunsidra d-diff, mhux il-baseline.** IQabbel `en.json` fil-merge base mas-siġra tax-xogħol; għal kull
ċavetta li l-valur Ingliż tagħha nbidel, kwalunkwe locale li għad għandha traduzzjoni mhux mittiefsa hija skaduta.
Dan intenzjonalment **jiffriża d-dejn eżistenti** — diff ma jistax jikxef minn liema Ingliż qadim ġiet traduzzjoni li ilha teżisti,
għalhekk il-kontroll jiġġudika biss dak li tmiss il-bidla kurrenti. L-alternattiva (baseline hash għal kull ċavetta)
kienet tiswa fajl iġġenerat ta’ madwar 600 KB, 3 darbiet l-akbar baseline eżistenti, u tinbidel ma’ kull PR tal-i18n.

Żewġ modi kif tissodisfah:

1. aġġorna t-traduzzjonijiet affettwati, jew
2. issettjahom għal `__MISSING__:<new english>` — ir-runtime mbagħad iservi l-Ingliż ikkoreġut
   (`src/i18n/request.ts::deepMergeFallback`, #7258) u ċ-ċavetta titqiegħed fil-kju għat-traduzzjoni.

Jekk inbidel il-**tifsira** tas-sekwenza, ippreferi **semmi mill-ġdid iċ-ċavetta**: ċavetta ġdida ma tistax tiret
traduzzjoni skaduta. Dan huwa l-mudell li uża #8463.

```bash
npm run i18n:check-value-drift          # strett (dak li jmexxi CI)
npm run i18n:check-value-drift:warn     # irrapporta biss
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Joħroġ b’0 b’`SKIP reason=base-unresolved` meta l-katalgu bażi ma jkunx jista’ jinqara (klonu shallow
mingħajr ir-ref bażi), b’mod li jirrifletti `check-openapi-breaking`.

### Job: `i18n`

Matriċi sħiħa ta’ validazzjoni tal-i18n (job wieħed għal kull locale). Il-job kollu huwa konsultiv.

| Script                          | Jivvalida                                    | Imblukkar                                                  |
| ------------------------------- | -------------------------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | Kompletezza tat-traduzzjoni għal kull locale | **Konsultiv** (`continue-on-error: true` fuq il-job kollu) |

### Job: `pr-test-policy`

Jitħaddem fuq pull requests biss.

| Script                 | Jivvalida                                                                                                                                              | Imblukkar |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `check:pr-test-policy` | PRs li jibdlu l-kodiċi tal-produzzjoni f’`src/`, `open-sse/`, `electron/`, jew `bin/` għandhom jinkludu jew jaġġornaw it-testijiet (Regola Stretta #8) | Iva       |
| `check:test-masking`   | Il-fajls tat-test mibdula ma jnaqqsux l-għadd nett ta’ assert jew iżidu tautoloġiji `assert.ok(true)`                                                  | Iva       |
| `check:pr-evidence`    | Il-korp tal-PR jikkwota evidenza minn test/VPS għall-bidla (jimmanizza r-Regola Stretta #18 billi jfittex fil-proża tal-PR — fraġli, ara Backlog)      | Iva       |

### Job: `test-vitest`

Jitħaddem wara `build`. Jimblokka l-merge jekk ifalli.

| Suite            | Jivvalida                                                 | Imblukkar                                                                                                                 |
| ---------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Server MCP (110 għodda), autoCombo, cache — vitest runner | Iva                                                                                                                       |
| `test:vitest:ui` | Testijiet tal-komponenti tal-UI — vitest runner           | **Imblukkar** — fallimenti pre-eżistenti huma esklużi b’mod espliċitu f’`vitest.config.ts`; fallimenti ġodda jfallu l-job |

### Workflows ta’ kull lejl (skedati, konsultivi)

Dawn jitħaddmu skont skeda cron (u `workflow_dispatch`), qatt fuq PRs. Kollha huma konsultivi.

| Workflow               | Jivvalida                                                                                                                                                                      | Imblokkanti      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `nightly-property`     | testijiet tal-proprjetajiet fast-check b’seed każwali + għadd għoli ta’ eżekuzzjonijiet                                                                                        | **Konsultattiv** |
| `nightly-resilience`   | limitu tat-tkabbir tal-heap, injettar kaotiku tal-ħsarat, k6 load/soak                                                                                                         | **Konsultattiv** |
| `nightly-llm-security` | kontroll tal-injezzjoni ta’ promptfoo (modalità ta’ mblukkar) + sondi ta’ garak (jinqabżu mingħajr sigriet tal-provider)                                                       | **Konsultattiv** |
| `nightly-schemathesis` | fuzzing tal-kuntratt OpenAPI (schemathesis) kontra OmniRoute attiv bl-użu ta’ `docs/openapi.yaml` — jikxef ksur tal-ispeċifikazzjoni / żbalji 500 mhux ittrattati (Fażi 8 B.4) | **Konsultattiv** |
| `nightly-mutation`     | punteġġ tal-ittestjar tal-mutazzjoni ta’ Stryker fuq il-lane tal-unit tests veloċi — mutanti li jibqgħu ħajjin jikxfu assert dgħajfin                                          | **Konsultattiv** |
| `nightly-compat`       | matriċi tal-kompatibbiltà tal-engine Node fil-firxiet appoġġjati ta’ `engines.node`                                                                                            | **Konsultattiv** |

Il-linji bażi tal-prestazzjoni (heap, TTFB, ħin tal-build) jiġu rreġistrati, mhux użati bħala kriterju ta’ imblukkar: ara [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

## Politika tal-Lista ta' Permessi

Kull gate li ma jistax ifalli minħabba ksur eżistenti juża lista ta' permessi ffrizzata
(eż., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Il-politika hija:

**Irranġa l-kawża ewlenija; uża l-lista ta' permessi biss meta l-ksur ikun diġà jeżisti u
ma jkunx jista' jiġi rranġat fl-istess PR.**

Meta żżid entrata ma' lista ta' permessi:

1. Inkludi kumment bil-ġustifikazzjoni.
2. Irreferi għall-issue tat-traċċar (eż., `// #3498 — Karatteristika tal-Fażi 2, għadha ma ġietx implimentata`).
3. Neħħi l-entrata fl-istess PR li jirranġa l-ksur — entrata skaduta li ma tibqax
   trażżan ksur attiv hija fiha nnifisha difett (l-infurzar kontra entrati skaduti ta' 6A.3
   se jfalli l-gate fuq entrata orfni fil-lista ta' permessi ladarba jiġi implimentat).

**Iżżidx** entrati fil-lista ta' permessi biex it-testijiet jgħaddu aktar malajr. Gate aħdar b'lista
ta' permessi li dejjem tikber jagħti sens falz ta' kwalità.

### Meta gate ifalli fuq il-PR tiegħek

1. **Aqra bir-reqqa l-output tal-gate** — jgħidlek eżattament liema fajl jew simbolu kiser
   ir-regola.
2. **Irranġa l-ksur** — il-biċċa l-kbira tal-gates huma kontrolli deterministiċi tas-sistema tal-fajls li jgħaddu malli
   l-code jkun korrett.
3. **Jekk il-ksur kien diġà jeżisti** (jiġifieri, ma introduċejtux int iżda l-gate issa
   jkoprih): żid entrata fil-lista ta' permessi b'kumment ta' ġustifikazzjoni u issue tat-traċċar.
4. **Jekk il-gate huwa ratchet** (kopertura, twissijiet ta' ESLint, duplikazzjoni, kumplessità):
   il-bidla tiegħek għamlet il-metrika agħar. Irranġa l-problema sottostanti, jew (rarament) ħaddem
   `npm run quality:ratchet -- --update` jekk il-bidla tkun intenzjonata u d-deterjorament
   tal-metrika jkun aċċettabbli — iżda ddokumenta għaliex fid-deskrizzjoni tal-PR.
5. **Gates konsultattivi** (`continue-on-error: true`) huma informattivi — ma jimblukkawx
   il-merge iżda jidhru fis-sommarju tas-CI. Irranġahom xorta waħda.

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

## Lista Pendenti ta’ Razzjonalizzazzjoni (rieżami tar-ROI — Fażi 9 Mewġa 3)

Dan l-inventarju ġie rrikonċiljat ma’ `ci.yml` fis-2026-06-17 (il-verżjoni preċedenti ħalliet barra
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Rieżami tar-ROI tas-sett irrikonċiljat
identifika l-kandidati għar-razzjonalizzazzjoni li ġejjin. **L-għaqdiet huma bidliet mekkaniċi fis-CI;
il-qlib/tneħħija huma deċiżjonijiet ta’ politika riżervati għall-operatur.** Xejn minn dan ta’ hawn taħt
għadu ma ġie applikat.

**Ukoll mhux iddokumentati hawn fuq** (konsultattivi, sinjal dgħajjef): il-job `docs-lint`
(markdownlint + Vale, il-job kollu b’`continue-on-error`) u l-workflows awtonomi tal-iskanners
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` jinsab f’
`quality-baseline.json` iżda mhuwiex marbut ma’ ratchet li jimblokka f’`ci.yml` — il-metrika
bħalissa hija orfni.

### Għaqda / deduplikazzjoni (mekkanika, riskju aktar baxx)

Kull kandidat ġie vvalidat kontra l-istat attiv tal-kontrolli fis-2026-06-17 (afda-iżda-vverifika);
diversi għaqdiet “ovvji” irriżultaw li jaħbu dejn u **mhumiex** sostituzzjonijiet diretti nodfa.

- **`check:docs-sync` jitħaddem darbtejn** — b’mod awtonomu fil-job `lint` u għal darb’oħra ġewwa `check:docs-all` (`docs-sync-strict`) u l-hook pre-commit ta’ husky. ✅ **LEST** — l-invokazzjoni awtonoma f’`lint` tneħħiet.
- **Skennjar tas-CVE** — ❌ **MHUX għaqda nadifa.** `audit:deps` ifalli b’mod strett għal kwalunkwe CVE ta’ severità għolja/kritika; `check:vuln-ratchet` (osv) ifalli biss meta jkun hemm _rigressjoni_ meta mqabbel mal-linja bażi (bħalissa 1 MODERATE). Semantika differenti — it-tneħħija ta’ `audit:deps` telimina l-kontroll assolut għal severità għolja/kritika. Żomm it-tnejn.
- **Individwazzjoni taċ-ċikli** — ✅ **LEST** (#15159 G-01/G-02). It-test l-antik hawn sejjaħ lil `check:cycles` il-kontroll “aħdar u kkurat” u ġġustifika li jibqa’ jimblokka minħabba li `check:circular-deps` (dpdm) irrapporta 91 ċiklu. Dak l-aħdar kien **aħdar falz**: `check:cycles` skennja 5 sottodirettorji (450 fajl), qabbel biss `import|export … from` statiċi, u warrab kull speċifikatur `@/` u `@omniroute/open-sse/`, għalhekk ma setax jara ċ-ċikli ta’ importazzjoni dinamika + aliases li kienu jiddominaw ir-repo. Irranġat: il-kontroll issa jgħaddi minn `src` + `open-sse` (5023 fajl), jiġbor speċifikaturi mill-AST ta’ TypeScript (għalhekk `import("…")` jingħadd filwaqt li `typeof import("…")` f’pożizzjoni ta’ tip ma jingħaddx), u jirriżolvi `paths` ta’ tsconfig. Isib **14-il** ċiklu, mhux 0. Minħabba li 14-il ċiklu preeżistenti ma jistgħux jiġu rranġati fi PR ta’ kontroll, `check:cycles` issa huwa **ratchet** (`--ratchet`, limitu massimu `metrics.cycles.value = 14` f’`quality-baseline.json`, `direction: down`) — jimblokka kwalunkwe _rigressjoni_ u l-għadd jista’ jonqos biss. Is-CI jħaddem `npm run check:cycles:ratchet`. It-tnaqqis progressiv jimxi ma’ **A-01**. `check:circular-deps` (dpdm) jibqa’ konsultattiv bħala t-tieni opinjoni usa’.
- **Kumplessità** — ✅ **LEST** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): passaġġ wieħed ta’ ESLint, jgħodd skont ruleId sabiex il-linji bażi ta’ cyclomatic+max-lines u dawk konjittivi jibqgħu indipendenti; `check:complexity` / `check:cognitive-complexity` individwali jibqgħu għal `--update` lokali.
- **Kontra l-alluċinazzjoni ta’ `/api`** — ✅ **LEST** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): inventarju wieħed tas-sistema tal-fajls ta’ `src/app/api`, openapi-routes + docs-symbols xorta jirrapportaw b’mod indipendenti; il-kontrolli individwali jibqgħu għal eżekuzzjonijiet lokali.
- **`check:node-runtime` jitħaddem fi 11-il job** — ⚠️ **ROI baxx.** Kull wieħed juża runner separat u l-kontroll jieħu <1s; iffrankar totali ta’ ~10s, bir-riskju li jintilef kontroll irħis għal kull job. Ma jiswiex it-taqlib.
- **`typecheck:noimplicit:core` fil-lint tas-CI** — ✅ **tneħħa mill-job lint** (kien konsultattiv b’`continue-on-error`); is-superfiċje tal-kontroll tat-tipi li timblokka hija `typecheck:core` + `check:type-coverage`. L-iskript lokali nżamm.

### Aqleb / iddeċiedi (politika tal-operatur)

- `check:openapi-security-tiers` (konsultattiv) — ❌ **MA JISTAX jinqaleb b’mod nadif.** Joħroġ b’0 iżda jwissi li diversi routes ta’ `traffic-inspector` taħt `LOCAL_ONLY_API_PREFIXES` m’għandhomx l-annotazzjoni `x-loopback-only: true`. Biex jiġi infurzat, l-ewwel iridu jiżdiedu dawk l-annotazzjonijiet ma’ `openapi.yaml`.
- `typecheck:noimplicit:core` (konsultattiv) — fil-biċċa l-kbira sostitwit mir-ratchet `check:type-coverage` li jimblokka. Aqilbu għal ratchet jew neħħi t-tieni passaġġ żejjed ta’ `tsc`.
- `test:vitest:ui` (issa **jimblokka**) — fallimenti preeżistenti huma espliċitament esklużi f’`vitest.config.ts` b’kummenti ta’ traċċar `// #8618`; fallimenti ġodda jfallu l-job.
- `check:secrets` (gitleaks, ratchet li jimblokka ffriżat fuq 3 pożittivi foloz iddokumentati) — żid it-3 mal-lista ta’ permessi biex tilħaq 0, jew iddegradah għal konsultattiv. Jikkoinċidi mal-iskannjar nattiv tas-sigrieti ta’ GitHub + `check:public-creds`.
- `check:pr-evidence` (jimblokka, ifittex fit-test tal-korp tal-PR) — riskju għoli ta’ pożittivi foloz; jekk jitneħħa jdgħajjef l-infurzar ta’ Hard Rule #18, għalhekk din hija deċiżjoni ġenwina ta’ politika.
- `semgrep` (awtonomu konsultattiv) — jikkoinċidi ma’ CodeQL għall-familji OWASP; qabbad il-linja bażi tiegħu ma’ ratchet jew neħħih.

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
