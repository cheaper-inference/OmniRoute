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

## Inventarju tal-gates u profili tal-eżekuzzjoni

### Aċċettazzjoni tal-kandidat

Il-workflows ta’ CI u Quality Gates kull wieħed joħroġ verdett stabbli: `Gate / CI` u
`Gate / Quality`. Il-politika tagħhom ta’ aċċettazzjoni b’verżjoni telenka kull job upstream
bħala meħtieġ jew konsultattiv. Job meħtieġ u applikabbli jrid jirnexxi: riżultati neqsin,
ikkanċellati, maqbuża, pendenti u mhux magħrufa ma jistgħux jistabbilixxu PASS. Klassifikazzjoni valida
ta’ docs-only jew catalog-only tista’ tagħmel lane tal-kodiċi mhux applikabbli;
draft PR mhuwiex kandidat aċċettat. Label `hotfix` ma jneħħix ir-rekwiżit tal-evidenza.

Iż-żewġ workflows ikopru PRs lejn fergħat main/release, pushes lejn `main`, dispatch manwali
u avvenimenti ta’ merge-group. Push, dispatch u merge-group iħaddmu l-għażla sħiħa. Pushes lejn
`release/**` ma jibdewhomx (2026-10-18): kull bidla tkun diġà ħaddmet il-matriċi fuq il-PR tagħha
u l-kombinazzjoni magħquda hija r-responsabbiltà ta’ Release-Green (`docs/ops/RUNNER_BOX.md` → lane Hosted). Forks
u merge groups jużaw runners ospitati għal jobs li kieku kienu jagħżlu runners self-hosted;
qabel ir-rollout trid tiġi vverifikata kapaċità ospitata suffiċjenti.

Kull riċevuta JSON tidentifika s-SHA checked-out, il-workflow run u l-attempt.
Is-CLI jirrifjuta nuqqas ta’ tqabbil bejn is-SHA taċ-checkout u dak tal-event. It-testijiet tal-workflow jorbtu s-sħubija fil-politika
mal-lista `needs` tal-job tal-verdett sabiex lane ġdida jew imneħħija ma tkunx tista’ tisparixxi fis-skiet.
L-irċevuti jkopru l-fluss tax-xogħol tagħhom stess, mhux il-pubblikazzjoni, id-distribuzzjoni, jew il-mekkaniżmi interni ta’ skaner konsultattiv eżistenti. Li l-kontrolli applikabbli jsiru obbligatorji fir-regoli tal-fergħat hija bidla amministrattiva separata; id-definizzjoni tal-kompiti tagħhom minnha nnifisha ma tipproteġix fergħa.

`API Route Typecheck` huwa kontroll indipendenti tal-fluss tax-xogħol, barra miż-żewġ verdetti aggregati u mill-profil statiku tal-osservatur sħiħ lokali. Spezzjona r-riżultat tiegħu separatament għall-kandidat eżatt. `.github/workflows/api-route-typecheck.yml` jitħaddem fuq PRs lejn `main` jew `release/**`, fuq pushes lejn kwalunkwe waħda miż-żewġ familji ta’ fergħat, u permezz ta’ tħaddim manwali. Ma għandu l-ebda filtru tal-mogħdijiet. It-tibdil tal-fergħa bażi tal-PR jitlob kontroll ġdid; il-modifiki fil-korp/titlu jużaw l-isem ta’ osservazzjoni biss `Admission not requested / API Route Typecheck` u ma jistgħux jissostitwixxu l-kontroll tal-ammissjoni. Il-fluss tax-xogħol ma jiddikjarax skattatur għal grupp ta’ merges. Kwalunkwe introduzzjoni ta’ kju ta’ merges li teħtieġ dan il-kontroll trid l-ewwel tistabbilixxi t-tħaddim tiegħu għal dak l-avveniment.

### Kapaċità tal-eżekuzzjoni tal-UI

CI jħaddem l-inventarju sħiħ tal-UI bħala erba’ shards tal-matriċi `test-vitest`, kull wieħed b’mhux aktar minn
żewġ workers u bid-deadline eżistenti ta’ 15-il minuta għall-job. L-ewwel shard iħaddem ukoll
is-suite Vitest tal-MCP/autoCombo. Ir-riżultat tal-job meħtieġ ikopri kull parti tal-matriċi; falliment
jew kanċellazzjoni ta’ shard wieħed ma jistgħux jistabbilixxu l-aċċettazzjoni tal-kandidat.

L-osservatur ta’ kull lejl iżomm riċevuta separata tal-kandidat eżatt għal kull shard tal-UI,
inkluża l-eżekuzzjoni tal-MCP fl-ewwel riċevuta. L-erba’ riċevuti, il-logs u l-identitajiet tal-eżekuzzjoni
korrispondenti kollha huma meħtieġa. `npm run test:vitest:ui` lokali xorta jagħżel
is-suite sħiħa; run wieħed b’`--shard` huwa biss evidenza parzjali.

### Ġbir tal-coverage tal-unit tests

It-tnax-il unit shard jiġbru V8 coverage waqt l-eżekuzzjoni eżistenti tat-testijiet tagħhom. Shard li jirnexxi
jħaddem `scripts/ci/compact-v8-coverage.mjs` biex jikkompressa l-files oriġinali mingħajr ma jiġġenera
rapport Istanbul intermedju. Il-job finali Coverage jivverifika t-tnax-il manifest kollha kontra
s-SHA tal-kandidat, ir-runtime, is-source root u d-data hashes, imbagħad iħaddem ir-reporters ta’ c8 u t-thresholds
eżistenti tal-coverage. L-inputs iżommu l-ordni globali tal-ismijiet tal-files ta’ c8; pre-merging għal kull shard mhuwiex sikur
għal coverage imħallat ta’ functions/blocks. Shards neqsin, ifformattjati ħażin jew inkompatibbli jwasslu biex
l-aċċettazzjoni tfalli. Shards tat-testijiet li jfallu jżommu coverage dijanjostiku mhux ipproċessat separatament; dan ma jistax
jidħol fil-merge finali.

### Riċevuti tal-progress tal-eżekuzzjoni tat-testijiet unitarji

Il-kmand kondiviż `test:unit:ci:shard` jirreġistra l-fażijiet `primary`, `dashboard` u `serial`
permezz ta’ `scripts/ci/unit-progress-reporter.mjs`. Ir-rapport normali tat-testijiet jibqa’
disponibbli. Riċevuta separata li tinkludi biss metadata tirreġistra l-bidu u t-tlestija ta’
kull fajl, u sinjal ta’ attività kull 30 sekonda jelenka l-fajls li għadhom attivi u l-ħin
li jkun għadda għalihom. Din tirreġistra biss metadata tal-eżekuzzjoni mil-lista permessa;
id-deskrizzjonijiet tat-testijiet, l-output, il-kontenut tal-iżbalji u l-ambjent sħiħ ma jiġux
serializzati.

CI u Quality iżommu l-fajls JSONL bħala `unit-progress-ci-<run>-<attempt>-<shard>` u
`unit-progress-quality-<run>-<attempt>-<shard>`. Skadenza tal-ħin tal-biċċa xogħol tista’
tipprevjeni t-tlugħ sussegwenti; is-sinjali ta’ attività li jkunu diġà ntbagħtu jibqgħu
evidenza dijanjostika. In-nuqqas ta’ sinjali ta’ attività jista’ jindika wkoll proċess
runner imblukkat jew mitmum. Dawn l-irċevuti jippreservaw l-għażla eżistenti tat-testijiet,
il-konkorrenza, l-iskadenzi u l-istatus tal-ħruġ; mhumiex verdetti dwar l-ammissjoni
tal-kandidati.

### Evidenza miżmuma fil-modulu li jiġbor ir-riżultati tal-aċċettazzjoni

`scripts/quality/validate-release-acceptance.mjs` jiġbor flimkien pjan ipprovdut u l-manifests tiegħu; ma jistabbilixxix li l-pjan ikopri l-pipeline kollu tar-rilaxx. Ir-rapporti tiegħu jistabbilixxu espliċitament `releaseAcceptance: false`, anki meta l-pjan ikun `VERIFIED`. Il-workflow `release-acceptance.yml` għadu juża data tat-test shadow, mhux irċevuti reali ta’ build, package, boot jew promotion.

Is-CLI jeħtieġ `--evidence-root` biex jivverifika l-evidenza miżmuma. Il-fajls jinstabu bħala `<evidence-root>/<artifact_id>/<member>` u jiġi kkalkolat il-hash SHA-256 tagħhom. Rekord PASS mingħajr evidenza, fajl nieqes jew mibdul, mogħdija mhux sigura jew link simboliku jipprevjeni l-verifika. Fajls neqsin mhumiex ekwivalenti għal logs vojta ta’ eżekuzzjonijiet li rnexxew. Il-kontrolli eżistenti SHA/run/attempt jibqgħu indipendenti: bytes li jaqblu ma jistgħux jagħmlu rċevuta skaduta valida. L-integrità tal-fajl mhijiex prova tal-awtentiċità tal-eżekuzzjoni jew tal-promozzjoni tal-artifatt.

### Inventarju tal-iscan statiku

L-inventarju b’verżjoni tal-npm-aliases u s-sħubija fl-iscan statiku jinsabu f’
`config/quality/gate-manifest.json`. Ħaddem `npm run check:gate-manifest` biex tivvalida
l-ismijiet tal-scripts u l-commands eżatti kontra `package.json`; żidiet, tneħħijiet u
devjazzjoni fil-commands iwasslu biex ifallu kemm il-hook lokali kif ukoll il-jobs tal-klassifikazzjoni tal-bidliet f’CI.
Alias mhuwiex workflow job, instance tal-matriċi jew test case: dawn l-għaddijiet ma għandhomx
jiġu ppreżentati bħala ekwivalenti.

Uża `npm run quality:scan -- --list` jew `npm run quality:scan:fast -- --list`
biex tispezzjona l-aliases magħżula mingħajr ma teżegwihom. Ir-runner jinvoka l-
npm entrypoint, għalhekk ir-runtime tiegħu (inkluż Bun fejn ikun ikkonfigurat) jiġi ppreservat.
Il-manifest jirreġistra aliases barra dawk il-profili bħala invokati separatament, u
commands ta’ manutenzjoni huma pprojbiti fi profili ta’ scan read-only.

Dawn il-profili jkopru biss l-iscan statiku. Ma jiċċertifikawx it-testijiet tal-prodott,
il-coverage, il-packaging, checks esterni jew l-aċċettazzjoni sħiħa ta’ kandidat għar-release.
L-aċċettazzjoni tal-workflow tuża `config/quality/admission-policy.json` marbut u
`scripts/quality/admission-verdict.mjs`. Il-profili tar-release-observer jibqgħu separati;
ispezzjona l-checks u r-riċevuti applikabbli tagħhom b’mod indipendenti. Il-commands statiċi tal-osservatur sħiħ
huma ddikjarati f’`config/quality/release-green-static-profile.json`, inklużi
`audit:deps`, l-għażla tal-mutation tests u l-checks tat-traduzzjoni. Il-loader jivvalida l-commands npm
kontra package.json u d-dikjarazzjonijiet immudellati ta’ CI/Quality; dan jirrifjuta d-devjazzjoni
minflok ma jeżegwixxi tokens tas-shell bħala arguments. Output SKIP/INCOMPLETE ta’ scanner meħtieġ
ma jistax jistabbilixxi PASS. Il-profil jirreġistra l-esklużjonijiet esterni tiegħu u ma jissostitwixxix
coverage ospitat, matriċijiet tat-testijiet, package jew evidenza tad-deployment. L-inventarju deskrittiv hawn taħt
huwa referenza, mhux prova li gate fil-fatt ġie eżegwit.

L-iscripts jinsabu taħt `scripts/check/` (gates tal-politika) u `scripts/quality/` (magna tar-ratchet).
Is-sors tal-verità ta’ CI huwa `.github/workflows/ci.yml`.

### Saħħa tad-dokumentazzjoni tal-bażi ppubblikata

`.github/workflows/i18n-base-health.yml` josserva s-saħħa tad-dokumentazzjoni wara ċerti
pushes lejn `main` u `release/v*`, kif ukoll meta jitħaddem manwalment. Il-filtri tiegħu jkopru d-dokumentazzjoni,
il-fajls Markdown fl-għerq, `llm.txt`, l-istat/il-konfigurazzjoni tat-traduzzjoni u l-għodod i18n rilevanti.
Il-job uniku `Published base documentation health` juża Ubuntu ospitat u limitu ta’ ħames minuti.
Dan iwettaq validazzjoni għall-qari biss u jikteb irċevuta dijanjostika mingħajr
installazzjoni tad-dipendenzi, traduzzjoni jew adozzjoni tal-istat.

`scripts/i18n/check-base-health.mjs` jirrikjedi li ma jkun hemm l-ebda inkonsistenza fil-hash tas-sors, fil-mira nieqsa, fil-hash tal-mira,
fit-traduzzjoni skaduta jew fil-cache tas-sezzjonijiet. Jivvalida wkoll l-ambitu attwali tad-dokumenti/lokalitajiet ewlenin
u l-provenjenza rreġistrata tiegħu. Kuntest invalidu, kopertura mhux kompluta
jew verifikatur interrott jipproduċi `INCOMPLETE`; devjazzjoni kkonfermata tipproduċi `FAIL`. It-tnejn
jirritornaw status ta’ ħruġ li jindika falliment. L-irċevuta hija marbuta max-SHA taċ-checkout, mal-workflow, mal-ġirja u
mat-tentattiv, u tinżamm bħala `i18n-base-health-<sha>-<run>-<attempt>`.

Din hija osservazzjoni indipendenti tal-bażi ppubblikata. Ma żżidx avveniment ta’ PR jew
ta’ merge-group, verifika obbligatorja tal-PR, alias ta’ npm jew membru ta’ profil ta’ skennjar statiku.
Il-politika differenzjali eżistenti tal-PR u l-klassifikazzjonijiet konsultattivi tal-verifikatur sottostanti
jibqgħu separati. Upload b’suċċess ma jistax ibiddel riżultat tas-saħħa li falla f’PASS.

### Fast-path tal-PR tar-release (`quality.yml`)

`.github/workflows/quality.yml` jikkomplementa lil CI fuq PRs ta’ main/release, pushes lejn `main`,
dispatch u merge groups. Il-PRs jużaw fast checks iffiltrati skont il-path. Id-duplicate build li kien
diżattivat b’mod permanenti tneħħa; il-checks reali tal-build/package/boot jibqgħu f’CI.

| Kompitu                                          | Ambitu                                                                                                                                                                                                                                                               | Jimblokka            |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | PRs tad-dokumentazzjoni/kodiċi; referenzi tad-dokumentazzjoni tal-API u docs-all                                                                                                                                                                                     | Iva                  |
| `Fast Quality Gates`                             | PRs tal-kodiċi; kontrolli statiċi, verifika tat-tipi, verifika tat-tipi tad-dashboard, testijiet unitarji affettwati                                                                                                                                                 | Iva                  |
| `Forgotten sibling tests`                        | PRs tal-kodiċi; moduli mibdula jiġu traċċati sal-konsumaturi statiċi u t-testijiet relatati kandidati; il-barrels u l-mogħdijiet ta’ importazzjoni dinamika jiġu rrappurtati bħala dijanjostiċi konsultattivi, bl-eċċezzjonijiet referenzjati tal-lista ta’ permessi | **Konsultattiv**     |
| `Vitest (fast-path)`                             | PRs tal-kodiċi; sett rapidu ta’ testijiet vitest                                                                                                                                                                                                                     | Iva                  |
| `Unit Tests fast-path`                           | PRs tal-kodiċi; sett ta’ testijiet unitarji maqsum f’4 shards                                                                                                                                                                                                        | Iva                  |
| `No new ESLint warnings`                         | PRs tal-kodiċi; kontroll tal-lint konxju tas-soppressjonijiet                                                                                                                                                                                                        | Iva, inklużi l-forks |
| `Merge integrity (changelog + generated skills)` | PRs li mhumiex abbozzi; sinkronizzazzjoni tal-changelog u tal-ħiliet iġġenerati                                                                                                                                                                                      | Iva, inklużi l-forks |

#### Rapport dwar testijiet relatati minsija

`npm run check:forgotten-sibling-tests` jerġa’ juża r-risolutur tal-importazzjonijiet wara l-mappa tal-impatt tat-testijiet.
Għal kull modulu tal-produzzjoni mibdul, jirrapporta ktajjen deterministiċi
`changed module/symbol -> static consumer -> candidate sibling test` meta t-test kandidat
ma jkunx preżenti fid-differenza tal-pull request. Is-sommarju Markdown u r-riżultat JSON jinżammu bħala
l-artefatt tal-fluss tax-xogħol `forgotten-sibling-tests` għall-kalibrazzjoni qabel kwalunkwe introduzzjoni bħala kontroll li jimblokka.

L-esportazzjonijiet mill-ġdid permezz ta’ barrels u l-importazzjonijiet dinamiċi huma biss dijanjostiċi tar-riżoluzzjoni; qatt ma joħolqu
sejba li timblokka. L-eċċezzjonijiet rieżaminati jinsabu f’
`config/quality/forgotten-sibling-allowlist.json`. Kull entrata trid issemmi l-konsumatur u t-test
kandidat, tagħti ġustifikazzjoni speċifika, u tinkludi link għal issue jew pull request ta’ GitHub. Entrati b’format ħażin
iwasslu għal falliment b’mod restrittiv. L-eċċezzjonijiet ma jistgħux jissopprimu test kandidat imħassar jew differenza li żżid `.skip`/`.todo`;
id-dgħufija tal-asserzjonijiet u forom oħra ta’ maskra jibqgħu taħt ir-responsabbiltà tal-kontroll
`check:test-masking`, li jimblokka b’mod indipendenti.

### Kompitu: `lint`

Jitħaddem fuq kull PR lejn `main`. Jimblokka l-merge jekk ifalli.

| Skritt (`npm run ...`)            | Jivvalida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Jimblokka                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `check:node-runtime`              | Il-verżjoni ta’ Node.js tinsab fil-medda appoġġjata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Iva                                          |
| `check:test-tla-order`            | L-ebda fajl `node:test` taħt `tests/unit` ma jirreġistra test, jilħaq `await` fl-ogħla livell, u mbagħad jirreġistra aktar testijiet (#18045; ratchet: `test-tla-order-allowlist.json` jista’ biss jiċkien)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Iva                                          |
| `check:cycles`                    | Importazzjonijiet ċirkolari madwar `src/` + `open-sse/` kollha (ibbażati fuq AST, bil-`paths` ta’ tsconfig solvuti). L-eżekuzzjoni bażika toħroġ b’1 kull meta jeżisti xi ċiklu (fail-closed minn #15281 ’l hawn) u telenka l-SCCs. `check:cycles:ratchet` (dak li jħaddem is-CI) jimblokka meta l-għadd jaqbeż il-limitu massimu ta’ `metrics.cycles` f’`quality-baseline.json` — bħalissa 14, `direction: down`, għalhekk jista’ biss jonqos (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Iva (ratchet)                                |
| `check:boundary`                  | Akkoppjament `open-sse → src`: importazzjonijiet uniċi minn fajl għal fajl mill-magna għall-applikazzjoni (`scripts/quality/measure-boundary.mjs`; il-lista ta’ konnessjonijiet hija x-xogħol pendenti ta’ rimedju għall-qalba v4/qsim tal-moduli). Bażiku = rapport konsultattiv (l-istess bħal `quality:boundary`). `check:boundary:ratchet` (dak li jħaddem is-CI, inkluż ukoll fil-loop tar-ratchet tal-fast-gates ta’ `quality.yml`) jimblokka meta l-għadd jaqbeż il-limitu massimu ta’ `metrics.boundaryOpenSseToSrc` f’`quality-baseline.json` — inizjalizzat bil-valur imkejjel ta’ 771, `direction: down`; `--update` inaqqsu biss; relattiv għall-bażi fuq PRs (`--base-ref`, ara hawn taħt)                                                                                                                                                                                                                        | Iva (ratchet)                                |
| `check:route-validation:t06`      | Skemi Zod preżenti fir-rotot kollha (politika tal-Livell 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Iva                                          |
| `check:any-budget:t11`            | L-għadd ta’ `@ts-expect-error // any` ma jaqbiżx il-baġit (catraca tal-Livell 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Iva                                          |
| `check:provider-consistency`      | Kull fornitur f’`providers.ts` għandu entrata korrispondenti f’`providerRegistry.ts` (u viċi versa, fi ħdan il-lista permessa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Iva                                          |
| `check:model-lifecycle`           | It-tliet tabelli tar-routing miżmuma manwalment jibqgħu konsistenti mal-istampa tal-istat taċ-ċiklu tal-ħajja vverifikata fir-repożitorju (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ma tagħti punteġġ lill-ebda id irtirat li `REGISTRY` jista’ jirrotja; kull mira ta’ `BUILT_IN_ALIASES` hija preżenti f’`REGISTRY` u assenti mill-istampa tal-ids irtirati; kull id irtirat li għadu f’`REGISTRY` jiġi mgħoddi jew elenkat f’`allowedRetiredInCatalog`; u l-ebda sors jew mira ta’ `DEFAULT_DEGRADATION_MAP` ma jidher bħala rtirat f’dik l-istampa. Dan ma jagħtix prova li mudell bħalissa qed jiġi servut minn upstream attiv. Offline — iqabbel ma’ `config/quality/model-lifecycle.json`, aġġornat manwalment b’`npm run quality:refresh-model-lifecycle` (jeħtieġ in-network; mhux integrat fis-CI). `allowedRetiredInCatalog` huwa ratchet ta’ tnaqqis gradwali: żid entrata biss flimkien ma’ issue ta’ traċċar. | Iva                                          |
| `check:fetch-targets`             | Kull `fetch("/api/...")` f’`src/` fuq in-naħa tal-klijent jirrisolvi għal `route.ts` reali                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Iva                                          |
| `check:deps`                      | Id-dipendenzi kollha li jistgħu jiġu installati b’`npm install` fil-fajls `package.json` kollha fir-repożitorju jinsabu f’`dependency-allowlist.json`; pakketti ġodda mhux ippinnjati jew slopsquatted jiġu mmarkati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Iva                                          |
| `audit:deps`                      | Verifika npm tal-ħames lockfiles indipendenti kollha (l-għerq, Electron, il-plugins OpenCode v1/v2 u l-fornitur). Avviżi kritiċi jimblukkaw; avviżi ta’ severità għolja jibqgħu twissijiet viżibbli. Verifiki neqsin/li fallew huma INCOMPLETE u jimblukkaw; il-hashes tal-lock u r-rapporti għal kull ambitu jinżammu.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Iva                                          |
| `check:lockfile`                  | Integrità ta’ `package-lock.json` — reġistru https, hashes tal-integrità, ebda sostituzzjoni tal-host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Iva                                          |
| `check:licenses`                  | Lista ta’ permessi għal-liċenzji SPDX għad-dipendenzi tal-produzzjoni                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Iva                                          |
| `check:tracked-artifacts`         | Ebda artefatt tal-build / symlinks ta’ `node_modules` ikkommittjati (jitħaddem ukoll fil-pre-commit ta’ husky; il-pre-push huwa intenzjonalment ħafif — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Iva                                          |
| `check:ai-attribution`            | Ebda trailer `Co-Authored-By` ta’ AI/bot jew footer dwar ġenerazzjoni bl-AI fil-commits, fit-titlu jew fil-kontenut tal-PR — Regola Stretta #16 (fil-loop ta’ kontrolli rapidi ta’ `quality.yml` għal PR→`release/**` — jaqra l-payload tal-avveniment, ma jagħmel xejn barra mill-PRs — u pass għall-PRs biss fil-lint ta’ `ci.yml` għal PR→`main`; kif ukoll il-hook `commit-msg` ta’ husky; koawturi umani permessi; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:vitest-exclusions`         | Kull esklużjoni ta’ Vitest issemmi issue ta’ traċċar u tidher f’`config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Iva                                          |
| `check:file-size`                 | Il-fajls tas-sors (`.ts`/`.tsx` f’`src/`, `open-sse/`, `electron/`, `bin/`) jibqgħu fil-limitu ta’ `cap` u l-fajls tat-test (`*.test.ts(x)`) fil-limitu ta’ `testCap`; il-fajls iffriżati f’`file-size-baseline.json` (`frozen` / `testFrozen`) ma jistgħux jaqbżu d-daqs irreġistrat tagħhom                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Iva                                          |
| `check:error-helper`              | Ir-risposti tal-iżbalji fl-eżekuturi/handlers jużaw `buildErrorBody()` / `sanitizeErrorMessage()` (Regola Stretta #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Iva                                          |
| `check:migration-numbering`       | Il-fajls SQL tal-migrazzjoni huma nnumerati b’mod sekwenzjali, mingħajr lakuni jew duplikati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Iva                                          |
| `check:public-creds`              | Ma hemm l-ebda valur letterali OAuth `client_id`/`client_secret` jew ċwievet tal-Firebase Web barra minn `publicCreds.ts` (Regola Stretta #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Iva                                          |
| `check:db-rules`                  | Ma hemm l-ebda SQL mhux ipproċessat barra mill-moduli ta’ `src/lib/db/`; ma hemm l-ebda importazzjoni aggregata minn `localDb.ts` (Regoli Stretti #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Iva                                          |
| `check:known-symbols`             | L-eżekuturi tal-fornituri, l-istrateġiji tar-routing, u t-tradutturi rreġistrati fit-tabelli tad-dispaċċ tagħhom jaqblu mal-fajls fuq id-diska — mingħajr simboli orfni jew mhux iddikjarati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Iva                                          |
| `check:route-guard-membership`    | Kull rotta li tniedi proċess sekondarju hija kklassifikata minn `isLocalOnlyPath()` (Regoli Stretti #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Iva                                          |
| `check:test-discovery`            | Kull fajl `*.test.ts` / `*.spec.ts` fir-repo jinġabar minn tal-inqas test runner wieħed (ratchet: il-lista ta’ fajls orfni f’`test-discovery-baseline.json` tista’ tonqos biss)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Iva                                          |
| `check:agent-skills-sync`         | L-artefatti ġġenerati tal-ħiliet tal-aġent jaqblu mal-katalgu tas-sors tagħhom (mingħajr devjazzjoni)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:provider-asset-provenance` | Il-logos/assi tal-fornitur għandhom entrata rreġistrata tal-provenjenza                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `lint:json`                       | Il-fajls tal-konfigurazzjoni JSON jiġu analizzati b’suċċess u jissodisfaw ir-regoli tal-lint tar-repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `typecheck:core`                  | Kompilazzjoni ta’ TypeScript mingħajr żbalji (twissijiet konsultattivi biss)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Iva                                          |
| `typecheck:noimplicit:core`       | `noImplicitAny` strett — orjentat lejn il-futur; ħafna postijiet tas-sejħa preeżistenti għadhom jeħtieġu annotazzjonijiet                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | **Konsultattiv** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` limitat għal `src/app/(dashboard)/**` (#7033) — il-lista kkurata ta' 27 fajl permessi ta' `typecheck:core` ma tinkludi ebda TSX tad-dashboard, u lanqas `next build` ma jwettaq verifika tat-tipi tiegħu (`next.config.mjs` jistabbilixxi `ignoreBuildErrors: true`), għalhekk ir-rigressjonijiet ta' identifikaturi orfni hemmhekk (#6625/#6909) ma kinux viżibbli għas-CI. Jqabbel id-differenzi ma' linja bażi ffriżata tal-għadd għal kull fajl/kodiċi TS (`config/quality/dashboard-typecheck-baseline.json`, l-istess mudell ta' infurzar kontra dejta skaduta bħal `check:known-symbols`) — żbalji ĠODDA biss lil hinn mill-għadd fil-linja bażi jġiegħlu lill-kontroll ifalli; baxxi progressivament il-linja bażi b'`--update` meta jiġi rranġat żball eżistenti.                                                                                                                                               | Iva                                          |

### Kompitu: `quality-gate`

Jitħaddem wara `test-coverage`. Jimblokka l-inkorporazzjoni jekk ifalli.

| Skritt                       | Jivvalida                                                                                                                                                                                                     | Jimblokka              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `quality:collect`            | Jiġġenera `quality-metrics.json` (għadd ta' twissijiet tal-ESLint, kopertura mir-rapport ikkombinat tax-shards)                                                                                               | Iva (qabel ir-ratchet) |
| `quality:ratchet`            | Kull metrika f'`quality-baseline.json` ma marritx lura (twissijiet tal-ESLint ≤ il-linja bażi; kopertura ≥ il-linja bażi)                                                                                     | Iva                    |
| `check:duplication`          | Id-duplikazzjoni tal-kodiċi (jscpd@4) ma taqbiżx il-linja bażi f'`quality-baseline.json`                                                                                                                      | Iva                    |
| `check:complexity`           | Il-kumplessità ċiklomatika fil-livell tal-fajl ma taqbiżx il-limitu (ir-regoli ewlenin tal-ESLint `complexity` + `max-lines-per-function`)                                                                    | Iva                    |
| `check:cognitive-complexity` | Ratchet tal-kumplessità konjittiva (`eslint-plugin-sonarjs`) — pass separat tal-ESLint; is-CI jħaddem it-tnejn magħquda bħala l-pass uniku `check:complexity-ratchets`                                        | Iva                    |
| `check:dead-code`            | Ir-ratchet ta' exports/fajls mhux użati (knip) ma jmurx lura meta mqabbel mal-linja bażi                                                                                                                      | Iva                    |
| `check:compression-budget`   | Baġit tal-benchmark tal-kompressjoni — il-limiti minimi tal-iffrankar ta' tokens għal kull magna ma jistgħux imorru lura                                                                                      | Iva                    |
| `check:type-coverage`        | Ir-ratchet tal-perċentwal b'tipi (`type-coverage`) ma jmurx lura; fil-biċċa l-kbira jissostitwixxi `typecheck:noimplicit:core`                                                                                | Iva                    |
| `check:codeql-ratchet`       | L-għadd ta' allerti CodeQL miftuħa ma jmurx lura (jaqra permezz ta' `gh api`; jinqabeż b'mod sikur mingħajr token) — għall-frekwenza tal-aġġornament u l-attivazzjoni manwali: ara "CodeQL ratchet" hawn taħt | Iva                    |

### Kompitu: `quality-extended`

Il-kompitu jimblokka l-kandidati applikabbli. Id-daqs tal-bundle, is-sejbiet ta' sigrieti, is-sejbiet ta' vulnerabbiltajiet,
is-sejbiet tal-workflow u l-bidliet tal-OpenAPI jiġu ċċekkjati b'ratchets obbligatorji.
Id-dijanjostika tad-dipendenzi ċirkolari tibqa' konsultattiva. L-installazzjoni tal-iscanner hija obbligatorja:
`scripts/ci/install-quality-scanners.sh` jipprovdi verżjonijiet iffissati u jxerred
il-fallimenti tal-installazzjoni. Għodod neqsin, rapporti invalidi jew linji bażi neqsin iħallu
l-kontroll obbligatorju tal-iscanner INKOMPLET.

| Skript                   | Jivvalida                                                                                                                                                                                                                                                        | Imblukkar                                                           |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `check:circular-deps`    | L-ebda dipendenza ċirkolari (dpdm)                                                                                                                                                                                                                               | **Konsultattiv**                                                    |
| `check:bundle-size`      | Id-daqs tal-bundle ma jaqbiżx il-limitu; kejl mhux disponibbli jitqies bħala falliment                                                                                                                                                                           | **Jimblokka b’--ratchet**                                           |
| `check:secrets`          | Is-sejbiet ta’ Gitleaks ma jmorru lura; skennijiet meħtieġa jirrifjutaw għodod/kodiċi sors/linja bażi neqsin, skennijiet li fallew u rapporti invalidi                                                                                                           | **Jimblokka b’--ratchet**                                           |
| `check:vuln-ratchet`     | Il-vulnerabbiltajiet tad-dipendenzi ma jmorrux lura; skennijiet meħtieġa jirrifjutaw għodod neqsin, rapporti invalidi jew linji bażi neqsin                                                                                                                      | **Jimblokka b’--ratchet**                                           |
| `check:workflows`        | Verifika statika tal-workflow (actionlint + zizmor); skeners neqsin/miksurin, rapporti invalidi jew linja bażi tar-ratchet nieqsa jfallu bħala INCOMPLETE. Sejbiet validi jsegwu l-politika magħżula stretta/konsultattiva/ratchet                               | L-eżekuzzjoni hija meħtieġa; ir-ratchet ta’ zizmor jimblokka fis-CI |
| `check:openapi-breaking` | Il-kuntratt tal-API pubblika jiġi ċċekkjat ma’ commits tal-avvenimenti ffissati (il-bażi tal-merge tal-PR, l-istat qabel il-push, il-bażi tal-grupp tal-merge; għal eżekuzzjoni skedata/manwali, l-ewwel parent taċ-checkout); kejl meħtieġ ifalli b’mod magħluq | **Jimblokka b’--ratchet**                                           |

### Kompitu: `docs-sync-strict`

Għal pull requests lejn `main` jew `release/**`, dan il-kompitu jitħaddem biss għal kandidati li mhumiex abbozzi (jew li jinsabu f’kju affidabbli) u li huma kklassifikati bħala bidliet fid-dokumentazzjoni jew fil-kodiċi. Jitħaddem ukoll fuq avvenimenti CI li mhumiex PR; it-trigger tal-push ta’ dan il-fluss tax-xogħol ikopri biss `main`, mhux `release/**`. Pass li jintemm b’kodiċi ta’ ħruġ mhux żero jimblokka l-kompitu; sejbiet li jiġu rrappurtati biss u l-eżenzjonijiet iddokumentati hawn taħt ma jimblukkawhx.

| Skript                         | Jivvalida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Imblukkar                                                                                                                                                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `check:docs-all`               | Meta-gate li jħaddem is-7 sub-gates ta’ hawn taħt b’mod sekwenzjali                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Iva                                                                                                                                                                |
| ↳ `check:docs-sync`            | Konsistenza tal-verżjonijiet tal-pakkett/OpenAPI/CHANGELOG, kopji mera eżatti ta’ `llm.txt`, invarjanti tas-sezzjonijiet u tad-daqs taċ-CHANGELOG tradott, u assenza ta’ dokumenti duplikati li diġà ġew sostitwiti                                                                                                                                                                                                                                                                                                                                                                   | Iva                                                                                                                                                                |
| ↳ `check:docs-frontmatter`     | Il-paġni tad-dokumentazzjoni kkompilati ikollhom titli validi fil-frontmatter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Iva                                                                                                                                                                |
| ↳ `check:docs-counts`          | L-invarjanti tal-għadd b’kunfidenza għolja jiġu infurzati b’mod strett; il-kontrolli euristiċi tal-għadd tal-fajls jagħtu biss twissijiet sakemm l-iskript ma jirċevix `--strict` (il-meta-gate tas-CI ma jgħaddihx)                                                                                                                                                                                                                                                                                                                                                                  | Il-livell strett jimblokka; il-livell ħafif huwa konsultattiv                                                                                                      |
| ↳ `check:env-doc-sync`         | Il-qari tal-varjabbli tal-ambjent fil-kodiċi sors, `.env.example` u `docs/reference/ENVIRONMENT.md` jaqblu wara l-applikazzjoni tal-listi espliċiti ta’ eċċezzjonijiet għal elementi injorati, elementi fid-dokumentazzjoni biss u elementi fl-ambjent biss                                                                                                                                                                                                                                                                                                                           | Iva, barra mil-listi ta’ eċċezzjonijiet iddokumentati                                                                                                              |
| ↳ `check:deprecated-versions`  | Jirrapporta verżjonijiet li jistgħu jkunu qodma barra minn kuntesti storiċi sikuri u dati ta’ aġġornament qodma, filwaqt li jeskludi d-dokumenti injorati                                                                                                                                                                                                                                                                                                                                                                                                                             | Konsultattiv fil-konfigurazzjoni attwali tas-CI (`--strict` ma jingħaddiex)                                                                                        |
| ↳ `check:doc-links`            | Il-links interni tal-markdown fid-dokumentazzjoni jirriżolvu għal fajls reali (forma `[text]`/`(path)`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Iva                                                                                                                                                                |
| ↳ `check:fabricated-docs`      | Ir-rotot, il-varjabbli tal-ambjent, il-kmandi tas-CLI, l-ismijiet tal-hooks, u l-mogħdijiet tal-fajls iċċitati fid-dokumentazzjoni jeżistu fil-codebase. Gate strett permezz ta’ `--strict`; falliment mhux imblokkanti mingħajr il-flag.                                                                                                                                                                                                                                                                                                                                             | Iva (permezz ta’ `--strict` fis-CI)                                                                                                                                |
| `check:cli-i18n`               | Il-keys ta’ `t()` użati mis-CLI jeżistu f’`en`; `pt-BR` iżomm kull sezzjoni tal-ogħla livell; `zh-CN` u `zh-TW` fihom kull key minn `en`                                                                                                                                                                                                                                                                                                                                                                                                                                              | Iva                                                                                                                                                                |
| `check:openapi-coverage`       | L-ispeċifikazzjoni OpenAPI tkopri mill-inqas limitu minimu, ikkontrollat b’ratchet, tar-rotot reali                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Iva                                                                                                                                                                |
| `check:openapi-security-tiers` | L-annotazzjonijiet iddikjarati `x-loopback-only`/`x-always-protected` iridu jkunu sostnuti minn `routeGuard.ts`; żbalji tal-parser u nuqqasijiet ta’ qbil fil-kontroll ’il quddiem jimblukkaw. Il-kontroll bil-maqlub għal `x-loopback-only` nieqes taħt prefissi għal aċċess lokali biss jagħti twissijiet, u r-rotot definiti biss permezz ta’ pattern huma esklużi minn dan il-kontroll bil-maqlub.                                                                                                                                                                                | Il-kontrolli tal-parser u ’l quddiem jimblukkaw; il-kontroll bil-maqlub huwa konsultattiv                                                                          |
| `check:openapi-routes`         | Kull mogħdija `/api...` f’`openapi.yaml` tikkorrispondi għal rotta reali indipendentement mill-parametri wara l-applikazzjoni tal-lista ġġustifikata ta’ eċċezzjonijiet `KNOWN_STALE_SPEC`; entrati qodma fil-lista wkoll iwasslu għal falliment                                                                                                                                                                                                                                                                                                                                      | Iva                                                                                                                                                                |
| `check:docs-symbols`           | Ir-referenzi URL interni `/api/...` fid-dokumenti kanoniċi li mhumiex kopji mera jikkorrispondu għal rotta reali jew familja ta’ rotot; ir-referenzi għal proxy/upstream/placeholder/fajl u l-entrati ġġustifikati f’`KNOWN_STALE_DOC_REFS` huma esklużi, u l-entrati qodma fil-lista ta’ eċċezzjonijiet iwasslu għal falliment                                                                                                                                                                                                                                                       | Iva                                                                                                                                                                |
| `i18n translation drift`       | Jiċċekkja l-hashes tas-sors/mira tad-dokumenti ewlenin u l-provenjenza tat-traduzzjoni. It-tqabbil tal-PR jippermetti biss fallimenti li ntirtu u li huma identiċi; inkonsistenzi ġodda jew mhux ivverifikati fis-sors, f'mira nieqsa, fil-hash tal-mira, fi traduzzjoni skaduta jew fil-cache tat-taqsimiet jimblukkaw. Barra mit-tqabbil tal-PR, fallimenti tas-sors/mira nieqsa/hash tal-mira jimblukkaw, filwaqt li traduzzjonijiet skaduti u caches tat-taqsimiet inkonsistenti jibqgħu biss twissijiet. In-nuqqas ta' cache tat-taqsimiet fil-format l-antik mhuwiex falliment. | Devjazzjoni ġdida/mhux ivverifikata fil-PR timblokka; devjazzjoni identika li ntirtet hija biss twissija; ir-regoli barra mill-PR jiddependu mit-tip ta' falliment |

### Kompitu: `i18n-ui-coverage`

| Skript                                | Jivvalida                                                                                                                                                                                                        | Jimblokka     |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check-ui-keys-coverage` (inkorporat) | Il-kopertura taċ-ċwievet i18n tal-UI hija ≥ 65%                                                                                                                                                                  | Iva           |
| `check-ui-value-drift` (inkorporat)   | **Valur** bl-Ingliż miktub mill-ġdid ma jħalli l-ebda traduzzjoni skaduta warajh                                                                                                                                 | Iva           |
| `check-new-key-coverage` (inkorporat) | Ċavetta Ingliża **ġdida** tkun tradotta f'kull locale — markatur `__MISSING__:` jiġi rrifjutat                                                                                                                   | Iva           |
| `check-translation-ratio`             | Il-proporzjon ta' traduzzjonijiet reali għal kull locale (identiċi għall-Ingliż / placeholders / entrati nieqsa barra l-lista permessa) ma jridx jaqbeż `config/quality/i18n-translation-baseline.json` + marġni | **Imblukkar** |

Jeħtieġ `fetch-depth: 0` — il-gate tad-drift tal-valuri jqabbel id-differenzi ta' `en.json` mal-bażi tal-merge.

#### `check-ui-value-drift` — gate kontra traduzzjonijiet skaduti

Jidentifika r-rigressjoni waħda tal-i18n li l-gates l-oħra ma jistgħux jaraw strutturalment: valur bl-Ingliż
jinkiteb mill-ġdid u t-traduzzjonijiet derivati mill-Ingliż _preċedenti_ jibqgħu hemm, għalhekk
utenti li ma jużawx l-Ingliż jibqgħu jaqraw test miktub b'ċertezza iżda li issa huwa żbaljat.

Dan tassew ġie rilaxxat. `oauthModal.googleOAuthWarning` inkiteb mill-ġdid meta żdied l-għajnun tal-login
ta' Antigravity (#5203); **39 minn 43 locale** żammew test li kien jgħid lill-operaturi biex "jikkupjaw
il-URL sħiħ u jwaħħluh hawn taħt" — fluss li ma jistax jitlesta għal dak il-fornitur. Dan baqa'
ma nstabx sa #8463 għaliex:

- `sync-ui-keys` jimla biss ċwievet li huma **neqsin**, u qatt dawk li huma **skaduti**;
- `check-ui-keys-coverage` jgħodd il-_preżenza_ taċ-ċavetta, għalhekk traduzzjoni skaduta titqies bħala koperta;
- `check-translation-drift` isegwi l-mirja tad-dokumentazzjoni `docs/i18n/<locale>/**.md` —
  qatt ma jaqra `src/i18n/messages/*.json`. Ilu jimblokka fil-job `docs-sync-strict` mir-risinkronizzazzjoni
  tal-2026-09: editja dokument ewlieni → `npm run i18n:run -- --files=<doc>` (fil-livell tas-sezzjoni, irħis).

**Konxju tad-diff, mhux ibbażat fuq baseline.** Huwa jqabbel `en.json` fil-bażi tal-merge mas-siġra
tax-xogħol; għal kull ċavetta li l-valur Ingliż tagħha nbidel, kwalunkwe locale li għadu jżomm
traduzzjoni mhux mibdula huwa skadut. Dan deliberatament **jiffriża d-dejn preeżistenti** — diff
ma jistax juri minn liema Ingliż antik oriġinat traduzzjoni li ilha teżisti, għalhekk il-gate jiġġudika
biss dak li tmiss il-bidla attwali. L-alternattiva (baseline tal-hash għal kull ċavetta) tkun teħtieġ
fajl iġġenerat ta' ~600 KB, 3× akbar mill-akbar baseline eżistenti, li jinbidel ma' kull PR tal-i18n.

Hemm żewġ modi biex tissodisfah:

1. aġġorna t-traduzzjonijiet affettwati, jew
2. issettjahom għal `__MISSING__:<new english>` — waqt l-eżekuzzjoni mbagħad jiġi pprovdut l-Ingliż ikkoreġut
   (`src/i18n/request.ts::deepMergeFallback`, #7258) u ċ-ċavetta tidħol fil-kju għat-traduzzjoni.

Jekk it-**tifsira** tas-sekwenza nbidlet, ippreferi **tbiddel l-isem taċ-ċavetta**: ċavetta ġdida ma tistax tiret
traduzzjoni skaduta. Dan huwa l-mudell li ntuża f'#8463.

```bash
npm run i18n:check-value-drift          # strett (dak li teżegwixxi s-CI)
npm run i18n:check-value-drift:warn     # rapport biss
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Il-gates tad-drift tal-valuri u taċ-ċwievet ġodda jużaw l-istess paragun immutabbli minn
`scripts/i18n/resolve-ui-diff-base.mjs`. Il-workflow jgħaddi l-istess SHAs tal-bażi, tat-tip tal-bażi u
tal-kandidat liż-żewġ kontrolli. L-eżekuzzjonijiet ta’ PR/tibdil fil-mira tal-bażi, push u merge-group jużaw il-kuntest
tal-avveniment tagħhom. Id-dispaċċ ta’ branch kandidat jirrikjedi l-PR miftuħ eżatt tiegħu jew l-input espliċitu
`i18n_base_sha`. Id-dispaċċ jew l-osservazzjoni skedata ta’ `main` jew `release/vX.Y.Z`
mingħajr dak l-input iqabblu l-aħħar commit mal-ewwel parent tiegħu; din mhix verifika tad-dejn kollu
tat-traduzzjoni li ntiret. L-invokazzjoni lokali tirrikjedi bażi ta’ paragun espliċita,
pereżempju l-kmand `BASE_REF` t’hawn fuq.

Kuntest ta’ paragun nieqes jew ambigwu, katalogu meħtieġ li ma jistax jinqara jew li mhuwiex validu, u
kandidat mibdul jipproduċu `INCOMPLETE` bil-kodiċi tal-ħruġ **2**, inkluż fil-modalità ta’ twissija.
Il-qari tal-katalogi juża `scripts/i18n/read-ui-catalog.mjs`; il-fallimenti fil-qari ma jiġux sostitwiti
b’oġġetti vojta. La bażi mhux disponibbli u lanqas input mhux komplut ma jistabbilixxu PASS.

### Job: `i18n`

Matriċi sħiħa ta' validazzjoni tal-i18n (job wieħed għal kull locale). Il-job kollu huwa konsultattiv.

| Skript                          | Jivvalida                                       | Jimblokka                                                     |
| ------------------------------- | ----------------------------------------------- | ------------------------------------------------------------- |
| `validate_translation.py quick` | Il-kompletezza tat-traduzzjoni għal kull locale | **Konsultattiv** (`continue-on-error: true` fuq il-job kollu) |

### Job: `pr-test-policy`

Jiġi eżegwit fuq pull requests biss.

| Skript                 | Jivvalida                                                                                                                                                    | Jimblokka |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `check:pr-test-policy` | PRs li jbiddlu kodiċi tal-produzzjoni f'`src/`, `open-sse/`, `electron/`, jew `bin/` iridu jinkludu jew jaġġornaw it-testijiet (Regola Stretta #8)           | Iva       |
| `check:test-masking`   | Fajls tat-test mibdula ma jnaqqsux l-għadd nett ta' assertions u ma jżidux tautoloġiji `assert.ok(true)`                                                     | Iva       |
| `check:pr-evidence`    | Il-kontenut tal-PR jiċċita evidenza minn testijiet/VPS għall-bidla (jawtomatizza r-Regola Stretta #18 billi jfittex fit-test tal-PR — fraġli, ara l-Backlog) | Iva       |

### Job: `test-vitest`

Jeħtieġ il-job ta’ klassifikazzjoni `changes`. Ix-shards applikabbli tal-matriċi jimblukkaw il-merge jekk ifallu.

| Ġabra            | Tivvalida                                                     | Imblokkanti                                                                                                                     |
| ---------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Server MCP (110 għodod), autoCombo, cache — runner ta’ vitest | Iva                                                                                                                             |
| `test:vitest:ui` | Testijiet tal-komponenti tal-UI — runner ta’ vitest           | **Imblokkanti** — il-fallimenti preeżistenti huma esklużi espliċitament f’`vitest.config.ts`; fallimenti ġodda jfallu l-kompitu |

### Flussi tax-xogħol ta’ kull lejl (skedati, konsultattivi)

Dawn jitħaddmu skont skeda cron (u `workflow_dispatch`), u qatt fuq PRs. Kollha huma konsultattivi.

| Fluss tax-xogħol       | Tivvalida                                                                                                                                                                        | Imblokkanti      |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | Testijiet tal-proprjetajiet fast-check b’seed każwali + għadd għoli ta’ eżekuzzjonijiet                                                                                          | **Konsultattiv** |
| `nightly-resilience`   | limitu tat-tkabbir tal-heap, injezzjoni ta’ ħsarat kaotiċi, tagħbija/soak b’k6                                                                                                   | **Konsultattiv** |
| `nightly-llm-security` | protezzjoni minn injezzjoni promptfoo (modalità ta’ mblukkar) + sondi garak (maqbużin mingħajr sigriet tal-fornitur)                                                             | **Konsultattiv** |
| `nightly-schemathesis` | Fuzzing tal-kuntratt OpenAPI (schemathesis) kontra OmniRoute attiv bl-użu ta’ `docs/openapi.yaml` — jikxef ksur tal-ispeċifikazzjoni / żbalji 500 mhux immaniġġjati (Fażi 8 B.4) | **Konsultattiv** |
| `nightly-mutation`     | Punteġġ tal-ittestjar b’mutazzjonijiet ta’ Stryker fuq il-mogħdija mgħaġġla tat-testijiet tal-unità — mutanti li jibqgħu ħajjin jikxfu asserzjonijiet dgħajfa                    | **Konsultattiv** |
| `nightly-compat`       | Matriċi tal-kompatibbiltà tal-magna Node fil-firxiet appoġġjati ta’ `engines.node`                                                                                               | **Konsultattiv** |

Il-linji bażi tal-prestazzjoni (heap, TTFB, ħin tal-build) jiġu rreġistrati, mhux suġġetti għal limiti: ara [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
- **konsultattiv** — it-total globali mqabbel mal-linja bażi ffriżata. Devjazzjoni li tintiret qatt ma
  tfalli PR innoċenti; id-devjazzjoni tiġi segwita biex tissewwa waqt ir-rikonċiljazzjoni tar-rilaxx u tiġi mmonitorjata mix-
  xogħol tal-marġni disponibbli.

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

Kull kontroll li ma jistax ifalli minħabba ksur eżistenti juża lista ta' permessi ffrizzata
(eż., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Il-politika hija:

**Irranġa l-kawża ewlenija; uża l-lista ta' permessi biss meta l-ksur ikun diġà jeżisti u
ma jkunx jista' jiġi rranġat fl-istess PR.**

Meta żżid entrata ma' lista ta' permessi:

1. Inkludi kumment bil-ġustifikazzjoni.
2. Irreferi għall-kwistjoni ta' traċċar (eż., `// #3498 — Phase 2 feature, not yet implemented`).
3. Neħħi l-entrata fl-istess PR li jirranġa l-ksur — entrata skaduta li ma tibqax
   trażżan ksur attiv hija nnifisha difett (l-infurzar kontra entrati skaduti ta' 6A.3
   se jwaqqa' l-kontroll minħabba entrata orfni fil-lista ta' permessi ladarba jiġi implimentat).

Iżżidx entrati fil-lista ta' permessi biex it-testijiet jgħaddu aktar malajr. Kontroll li jgħaddi
b'lista ta' permessi li dejjem tikber jagħti sens falz ta' kwalità.

### Meta kontroll ifalli fuq il-PR tiegħek

1. **Aqra bir-reqqa l-output tal-kontroll** — jgħidlek eżattament liema fajl jew simbolu kiser
   ir-regola.
2. **Irranġa l-ksur** — il-biċċa l-kbira tal-kontrolli huma verifiki deterministiċi tas-sistema tal-fajls li jgħaddu malli
   l-kodiċi jkun korrett.
3. **Jekk il-ksur kien diġà jeżisti** (jiġifieri, ma introduċejtux int iżda l-kontroll issa
   jkoprih): żid entrata fil-lista ta' permessi b'kumment ta' ġustifikazzjoni u kwistjoni ta' traċċar.
4. **Jekk il-kontroll ikun ratchet** (kopertura, twissijiet ta' ESLint, duplikazzjoni, kumplessità):
   il-bidla tiegħek marret għall-agħar il-metrika. Irranġa l-problema sottostanti, jew (rarament) ħaddem
   `npm run quality:ratchet -- --update` jekk il-bidla tkun intenzjonata u d-deterjorament
   tal-metrika jkun aċċettabbli — iżda ddokumenta għaliex fid-deskrizzjoni tal-PR.
5. **Kontrolli konsultattivi** (`continue-on-error: true`) huma informattivi — ma jimblukkawx
   l-inkorporazzjoni iżda jidhru fis-sommarju tas-CI. Irranġahom xorta waħda.

---

## Żieda ta' Gate Ġdid

1. Oħloq `scripts/check/check-<name>.mjs` (jew `.ts`). Il-gates tal-politika joħorġu b'0/1.
   Gates tat-tip ratchet joħorġu metrika lejn `quality-metrics.json` permezz ta' `collect-metrics.mjs`.
2. Żid `"check:<name>": "node scripts/check/check-<name>.mjs"` ma' `package.json`, u
   ssinkronizza l-alias u l-kmand eżatt tiegħu f'`config/quality/gate-manifest.json`.
   Applika l-istess sinkronizzazzjoni meta tibdel jew tneħħi alias ta' validazzjoni eżistenti.
   Ħaddem `npm run check:gate-manifest`; il-hook ta' qabel il-commit u l-klassifikazzjoni tal-bidliet fis-CI
   jinfurzaw dan il-kuntratt.
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

Dan l-inventarju ġie rrikonċiljat ma’ `ci.yml` fis-2026-06-17 (il-verżjoni preċedenti kienet ħalliet barra
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Rieżami tar-ROI tas-sett irrikonċiljat
identifika l-kandidati ta’ razzjonalizzazzjoni li ġejjin. **L-għaqdiet huma bidliet mekkaniċi fis-CI;
il-qlib/tneħħijiet huma deċiżjonijiet ta’ politika riżervati għall-operatur.** Għadu ma ġie applikat
xejn minn dan ta’ hawn taħt.

**Lanqas ma huma ddokumentati hawn fuq** (konsultattivi, sinjal baxx): il-job `docs-lint`
(markdownlint + Vale, il-job kollu b’`continue-on-error`) u l-workflows awtonomi tal-iscanners
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` jinsab
f’`quality-baseline.json` iżda mhuwiex imqabbad ma’ ratchet li jimblokka f’`ci.yml` — il-metrika
bħalissa hija orfni.

### Għaqda / deduplikazzjoni (mekkaniċi, riskju aktar baxx)

Kull kandidat ġie vvalidat kontra l-istat attwali tal-gates fis-2026-06-17 (afda iżda vverifika);
diversi għaqdiet li dehru “ovvji” rriżultaw li kienu qed jaħbu dejn u **mhumiex** sostituzzjonijiet diretti u nodfa.

- **`check:docs-sync` jitħaddem darbtejn** — waħdu fil-job `lint` u għal darb’oħra ġewwa `check:docs-all` (`docs-sync-strict`) u l-hook pre-commit ta’ husky. ✅ **LEST** — l-invokazzjoni awtonoma ta’ `lint` tneħħiet.
- **Skennjar tas-CVE** — ❌ **MHUX għaqda nadifa.** `audit:deps` jimblokka avviżi kritiċi u awditi mhux kompluti fil-ħames lockfiles kollha, filwaqt li jirrapporta avviżi ta’ severità għolja bħala twissijiet skont il-politika attwali; `check:vuln-ratchet` (osv) ifalli biss meta jkun hemm _rigressjoni_ meta mqabbel mal-baseline irreġistrata fir-repożitorju u jirrifjuta kejl nieqes meta dan ikun meħtieġ. Semantika differenti — it-tneħħija ta’ `audit:deps` titlef il-gate kritiku assolut u l-provi indipendenti tal-awditjar tal-pakketti. Żomm it-tnejn.
- **Sejbien taċ-ċikli** — ✅ **LEST** (#15159 G-01/G-02). It-test l-antik hawnhekk kien isejjaħ lil `check:cycles` il-gate “aħdar u kkurat” u kien jiġġustifika li jibqa’ jimblokka minħabba li `check:circular-deps` (dpdm) irrapporta 91 ċiklu. Dak l-aħdar kien **aħdar falz**: `check:cycles` skennja 5 subdirettorji (450 fajl), qabbel biss `import|export … from` statiku, u warrab kull speċifikatur `@/` u `@omniroute/open-sse/`, għalhekk ma setax jara ċ-ċikli ta’ importazzjoni dinamika + aliases li ddominaw ir-repożitorju. Irranġat: il-gate issa jgħaddi minn `src` + `open-sse` (5023 fajl), jiġbor speċifikaturi mill-AST ta’ TypeScript (għalhekk `import("…")` jgħodd u `typeof import("…")` fil-pożizzjoni tat-tip ma jgħoddx), u jirriżolvi `paths` ta’ tsconfig. Isib **14-il** ċiklu, mhux 0. Minħabba li 14-il ċiklu preeżistenti ma jistgħux jissewwew f’PR tal-gate, `check:cycles` issa huwa **ratchet** (`--ratchet`, limitu massimu `metrics.cycles.value = 14` f’`quality-baseline.json`, `direction: down`) — jimblokka kull _rigressjoni_ u l-għadd jista’ jonqos biss. Is-CI jħaddem `npm run check:cycles:ratchet`. It-tnaqqis progressiv isir flimkien ma’ **A-01**. `check:circular-deps` (dpdm) jibqa’ konsultattiv bħala opinjoni sekondarja usa’.
- **Kumplessità** — ✅ **LEST** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): mogħdija waħda ta’ ESLint, b’għadd skont ruleId sabiex il-baselines ċiklomatiċi+max-lines u konjittivi jibqgħu indipendenti; `check:complexity` / `check:cognitive-complexity` individwali jibqgħu għall-użu lokali b’`--update`.
- **Kontra l-alluċinazzjoni ta’ `/api`** — ✅ **LEST** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): inventarju wieħed tas-sistema tal-fajls ta’ `src/app/api`, openapi-routes + docs-symbols għadhom jirrapportaw indipendentement; dawk individwali jibqgħu għall-eżekuzzjonijiet lokali.
- **`check:node-runtime` jitħaddem fi 11-il job** — ⚠️ **ROI baxx.** Kull wieħed huwa runner separat u l-kontroll jieħu <1s; iffrankar totali ta’ ~10s, bil-prezz li tintilef protezzjoni rħisa għal kull job. Ma jiswiex it-taqlib.
- **`typecheck:noimplicit:core` fil-lint tas-CI** — ✅ **tneħħa mill-job lint** (kien konsultattiv b’`continue-on-error`); is-superfiċje tat-tipi li timblokka hija `typecheck:core` + `check:type-coverage`. L-iskript lokali nżamm.

### Aqleb / iddeċiedi (politika tal-operatur)

- `check:openapi-security-tiers` (konsultattiv) — ❌ **MA JISTAX jinqaleb b’mod nadif.** Joħroġ b’0 iżda jwissi li diversi routes ta’ `traffic-inspector` taħt `LOCAL_ONLY_API_PREFIXES` m’għandhomx l-annotazzjoni `x-loopback-only: true`. L-infurzar tiegħu jeħtieġ li l-ewwel jiżdiedu dawk l-annotazzjonijiet ma’ `openapi.yaml`.
- `typecheck:noimplicit:core` (konsultattiv) — fil-biċċa l-kbira sostitwit mir-ratchet li jimblokka `check:type-coverage`. Aqilbu għal ratchet jew neħħi t-tieni pass żejjed ta’ `tsc`.
- `test:vitest:ui` (issa **jimblokka**) — fallimenti preeżistenti huma esklużi b’mod espliċitu f’`vitest.config.ts` permezz ta’ kummenti ta’ traċċar `// #8618`; fallimenti ġodda jfallu l-job.
- `check:secrets` (gitleaks, ratchet li jimblokka) — il-limitu massimu attwali huwa `metrics.secretFindings` f’`quality-baseline.json`. Kull eċċezzjoni teħtieġ entrata ġġustifikata f’`.gitleaks.toml`; kejl mhux disponibbli jitqies INKOMPLET. L-iskennjar jikkomplementa l-iskannjar nattiv tas-sigrieti ta’ GitHub u `check:public-creds`.
- `check:pr-evidence` (jimblokka, ifittex mudelli fit-test tal-body tal-PR) — riskju għoli ta’ pożittivi foloz; jekk jitneħħa jdgħajjef l-infurzar tar-Regola Stretta #18, għalhekk din hija deċiżjoni ġenwina ta’ politika.
- `semgrep` (awtonomu u konsultattiv) — jikkoinċidi ma’ CodeQL għall-familji OWASP; qabbad il-baseline tiegħu ma’ ratchet jew neħħih.

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
