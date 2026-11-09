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

### Dħul tal-kandidat

Il-flussi tax-xogħol CI u Quality Gates kull wieħed jarmu verdett stabbli: `Gate / CI` u `Gate / Quality`. Il-politika ta' ammissjoni verġjonata tagħhom tinnumera kull xogħol upstream kif meħtieġ jew konsultattiv. Xogħol meħtieġ applikabbli għandu jirnexxi: riżultati nieqes, ikkanċellati, maqbuż, pendenti u mhux magħrufa ma jistgħux jistabbilixxu PASS. Klassifikazzjoni valida ta' docs-only jew ta' katalogu biss tista' tagħmel korsija tal-kodiċi inapplikabbli; abbozz ordinarju PR mhuwiex kandidat aċċettat. Tikketta `hotfix` ma tirrinunzjax evidenza.

Iż-żewġ flussi tax-xogħol ikopru PRs f'fergħat main/release, pushes to `main`, dispaċċ manwali u avvenimenti ta' grupp ta' amalgamazzjoni. Imbotta, dispaċċ u merge-group imexxu l-għażla sħiħa. Abbozz ta' kju ta' Mergify affidabbli jmexxi wkoll impjiegi `full-code`/`full-code-e2e` applikabbli; PRs ordinarji aqbezhom. Qabel ma tingħaqad manwali, agħmel dispaċċ sħiħ fuq il-kandidat eżatt. Pushes biex `release/**` ma jibdewx dawn il-flussi tax-xogħol; Release-Green josserva l-bażi magħquda separatament (`docs/ops/RUNNER_BOX.md` → Hosted lane). Il-frieket u l-gruppi jingħaqdu jużaw runners ospitati għal impjiegi li inkella jagħżlu runners li jospitaw lilhom infushom; kapaċità ospitata suffiċjenti għandha tiġi vverifikata qabel it-tnedija.

PR ordinarja tmexxi l-għażla veloċi. Il-korsiji `full-code` u `full-code-e2e` tal-politika tad-dħul (E2E, integrazzjoni, pakkett artifact, Electron smoke, Bun SQLite, ekosystem and protocol clients) jimxu biss fuq Mergify queue draft jew fuq run sħiħa: `gh workflow run ci.yml --ref <branch>`.

Kull irċevuta JSON tidentifika l- SHA iċċekkjat, il-fluss tax-xogħol u t-tentattiv. CLI jirrifjuta checkout/event SHA diskrepanza. It-testijiet tal-fluss tax-xogħol jorbtu s-sħubija tal-politika mal-lista `needs` tax-xogħol tal-verdett sabiex korsija ġdida jew imneħħija ma tistax tisparixxi fis-skiet. L-irċevuti jkopru l-fluss tax-xogħol tagħhom stess, mhux il-pubblikazzjoni, l-iskjerament, jew l-intern ta 'skaner konsultattiv eżistenti. It-twettiq tal-kontrolli applikabbli meħtieġa fir-regoli tal-fergħat hija bidla amministrattiva separata; id-definizzjoni tax-xogħol tagħhom ma tipproteġix fergħa hi stess.

`API Route Typecheck` huwa kontroll tal-fluss tax-xogħol indipendenti, barra kemm il-verdetti aggregati kif ukoll il-profil statiku sħiħ tal-osservatur lokali. Spezzjona r-riżultat tagħha separatament għall-kandidat eżatt. `.github/workflows/api-route-typecheck.yml` jimxi fuq PRs `main` jew `release/**`, jimbotta lil jew familja tal-fergħat, dispaċċ manwali, u avvenimenti `merge_group` tat-tip `checks_requested`. M'għandu l-ebda filtru tal-passaġġ. Għaqqad il-gruppi check out `merge_group.head_sha`; avvenimenti oħra check out `github.sha`. L-avvenimenti kollha jużaw l-istess gate dijanjostiċi API u testijiet tal-unità tal-bieb. PR base retargets jitolbu kontroll ġdid; body/title edits juża l-isem ta' osservazzjoni biss `Admission not requested / API Route Typecheck` u ma jistax jissostitwixxi l-kontroll tad-dħul.

### Evidenza miżmuma fir-reducer tal-aċċettazzjoni

`scripts/quality/validate-release-acceptance.mjs` jirriduċi plan ipprovdut u l-manifests tiegħu;
ma jistabbilixxix li l-plan ikopri l-pipeline sħiħ tar-release.
Ir-rapporti tiegħu jistabbilixxu b’mod espliċitu `releaseAcceptance: false`, anki meta dak il-plan ikun
`VERIFIED`. Il-workflow `release-acceptance.yml` għadu juża shadow fixtures, mhux
riċevuti reali ta’ build, package, boot jew promotion.

Is-CLI jeħtieġ `--evidence-root` biex jivverifika l-evidenza miżmuma. Il-files jiġu riżolti
bħala `<evidence-root>/<artifact_id>/<member>` u jiġu hashed bħala SHA-256. Rekord PASS
mingħajr evidenza, file nieqes jew mibdul, path mhux sikura jew symlink jipprevjenu
l-verifika. Files neqsin mhumiex ekwivalenti għal logs vojta li rnexxew. Il-checks eżistenti
ta’ SHA/run/attempt jibqgħu indipendenti: bytes li jaqblu ma jistgħux isalvaw riċevuta
skaduta. L-integrità tal-file mhijiex prova tal-awtentiċità tal-eżekuzzjoni jew tal-promotion tal-artifact.

### DAST jikkonsma l-build CI ivverifikat

Il-job CI obbligatorju `dast-smoke` isejjaħ `.github/workflows/dast-smoke.yml` wara `build`. Isegwi l-istess għażla ta' kodiċi u abbozzi bħall-build, inklużi PRs appoġġjati minn forks, PRs immirati lejn fergħat tar-rilaxx u gruppi ta' amalgamazzjoni. Job DAST nieqes, fallut, ikkanċellat jew maqbuż bla mistenni jimblokka `Gate / CI`. Il-fluss tax-xogħol li jista' jerġa' jintuża m'għandux trigger indipendenti għal PR jew tnedija manwali; il-validazzjoni manwali tuża t-tnedija ta' CI sabiex il-build u l-konsumatur jibqgħu fl-istess eżekuzzjoni.

`scripts/ci/next-build-provenance.mjs` jissiġilla l-artefatt Next sħiħ bid-digest tar tiegħu, ir-repożitorju/avveniment/eżekuzzjoni, it-tentattiv tal-produttur, head/base/checkout/tree, l-identitajiet tal-flussi tax-xogħol, il-lockfile, il-verżjoni eżatta ta' Node u l-ABI, il-pjattaforma u l-bundler. DAST jagħżel l-ID immutabbli tal-artefatt minn `needs.build.outputs`, jitlob il-verifika tad-digest tat-tniżżil, u jikkalkula l-hash taż-ZIP indipendentement biex iqabblu mad-digest tal-produttur qabel ma joħroġ iż-żewġ membri permessi permezz ta' `scripts/ci/unpack-ci-build.py`. Il-manifest u l-arkivju tar għandhom ukoll jaqblu mal-outputs indipendenti tal-produttur qabel ma tiġi estratta s-siġra Next. Qatt ma jfittex l-aħħar build ta' suċċess ta' fergħa. Eżekuzzjoni mill-ġdid parzjali tista' tuża mill-ġdid l-istess tentattiv tal-produttur meta l-ID tiegħu u l-inputs kollha jibqgħu jaqblu; ir-riċevuta tirreġistra ż-żewġ tentattivi.

Il-konsumatur jibqa' fuq runner Linux ospitat b'permess ta' qari biss għar-repożitorju u mingħajr sigrieti tar-repożitorju. Jinstalla l-verżjoni eżatta ta' Node tal-produttur, imbagħad jiġbor il-CLI b'`OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` jirrifjuta server standalone nieqes qabel kwalunkwe build ta' riżerva; il-builds CLI lokali normali jżommu l-mekkaniżmu ta' riżerva eżistenti tagħhom. Il-prontezza tas-server, Schemathesis u promptfoo għandhom kollha jirnexxu fil-limitu mhux mibdul ta' 25 minuta tal-job. Riċevuta tal-provenjenza tipprova l-identità u l-bytes tal-inputs, mhux skan DAST ta' suċċess. Skadenza tal-artefatt, interruzzjoni tar-runner jew skaner fallut jibqgħu evidenza mhux kompluta jew falluta; wrapper konsultattiv ma jistax ibiddilhom f'PASS.

### Kapaċità tal-eżekuzzjoni tal-UI

Is-CI jħaddem l-inventarju sħiħ tal-UI bħala erba’ shards tal-matriċi `test-vitest`, kull wieħed b’mhux aktar
minn żewġ workers għal kull shard u bid-deadline eżistenti ta’ 15-il minuta għall-job. L-ewwel shard iħaddem ukoll
is-suite Vitest ta’ MCP/autoCombo. Ir-riżultat meħtieġ tal-job ikopri kull leg tal-matriċi; il-falliment
jew il-kanċellazzjoni ta’ shard wieħed ma jistgħux jistabbilixxu l-aċċettazzjoni tal-kandidat.

L-osservatur ta’ billejl iżomm riċevuta separata tal-kandidat eżatt għal kull shard tal-UI,
inkluża l-eżekuzzjoni tal-MCP fl-ewwel riċevuta. L-erba’ riċevuti kollha, il-logs u
l-identitajiet tal-eżekuzzjoni li jaqblu huma meħtieġa. Lokalment, `npm run test:vitest:ui` xorta jagħżel
is-suite sħiħa; run wieħed ta’ `--shard` huwa biss evidenza parzjali.

### Ġbir tal-coverage tal-unit tests

It-tnax-il unit shard jiġbru coverage ta’ V8 waqt l-eżekuzzjoni eżistenti tat-testijiet tagħhom. Shard li jirnexxi
iħaddem `scripts/ci/compact-v8-coverage.mjs` biex jikkompressa l-files oriġinali mingħajr ma jiġġenera
rapport Istanbul intermedju. Il-job finali tal-Coverage jivverifika t-tnax-il manifest kollha kontra
x-SHA tal-kandidat, ir-runtime, is-source root u d-data hashes, imbagħad iħaddem ir-reporters ta’ c8 u
t-thresholds eżistenti tal-coverage. L-inputs iżommu l-ordni globali tal-ismijiet tal-files ta’ c8; pre-merging
għal kull shard mhuwiex sikur għal coverage imħallat ta’ functions/blocks. Shards neqsin, ifformattjati ħażin
jew inkompatibbli jwasslu biex l-aċċettazzjoni tfalli. Test shards li jfallu jżommu coverage dijanjostiku mhux ipproċessat
separatament; dan ma jistax jidħol fil-merge finali.

### Riċevuti tal-progress tal-eżekuzzjoni tat-testijiet unitarji

Il-kmand kondiviż `test:unit:ci:shard` jirreġistra l-fażijiet `primary`, `dashboard` u `serial`
permezz ta’ `scripts/ci/unit-progress-reporter.mjs`. Ir-rapport normali tat-testijiet jibqa’
disponibbli. Riċevuta separata li tinkludi biss metadata tirreġistra l-bidu u t-tlestija ta’
kull fajl, u sinjal ta’ attività kull 30 sekonda jelenka l-fajls li għadhom attivi u l-ħin
li jkun għadda għalihom. Din tirreġistra biss metadata tal-eżekuzzjoni mil-lista permessa;
id-deskrizzjonijiet tat-testijiet, l-output, il-kontenut tal-iżbalji u l-ambjent sħiħ ma jiġux
serializzati.

CI jżomm il-fajls JSONL bl-isem `unit-progress-ci-<run>-<attempt>-<shard>`. Skadenza tal-ħin tal-biċċa xogħol tista’
tipprevjeni t-tlugħ sussegwenti; is-sinjali ta’ attività li jkunu diġà ntbagħtu jibqgħu
evidenza dijanjostika. In-nuqqas ta’ sinjali ta’ attività jista’ jindika wkoll proċess
runner imblukkat jew mitmum. Dawn l-irċevuti jippreservaw l-għażla eżistenti tat-testijiet,
il-konkorrenza, l-iskadenzi u l-istatus tal-ħruġ; mhumiex verdetti dwar l-ammissjoni
tal-kandidati.

### Merge queue

It-tikketta `queue` tibgħat PR lejn il-queue ta’ Mergify (`.mergify.yml`). Mergify jiftaħ draft PR fuq
fergħa `mergify/merge-queue/`, CI jħaddem l-għażla sħiħa hemmhekk, u l-PR oriġinali jiġi merged
meta `Gate / CI`, `Gate / Quality` u `Merge integrity (changelog + generated skills)` jgħaddu.

Mergify jikteb is-sommarju tal-queue tiegħu fid-deskrizzjoni tad-draft, u apps oħra jistgħu jeditjawha wkoll.
Avveniment `pull_request` `edited` fuq draft bħal dan jieħu l-concurrency group tiegħu stess
(`-queue-edit-<run_id>`) sabiex ma jkunx jista’ jikkanċella l-eżekuzzjoni reali tad-draft, u jaqbeż il-gate u
l-matriċi. `Merge integrity` biss jibqa’ jitħaddem. Il-gate job maqbuż ikollu isem ta’ check differenti,
għax Mergify jaqra `Gate / CI` maqbuż bħala check li falla u jneħħi l-PR mill-queue.

Wara dequeue, push mhux dejjem jerġa’ jdaħħal il-PR fil-queue. Ikkummenta `@mergifyio queue` fuqu.

### Inventarju tal-iscan statiku

L-inventarju bl-aliases tal-npm li għandu verżjoni u s-sħubija fl-iscan statiku jinsabu f’
`config/quality/gate-manifest.json`. Ħaddem `npm run check:gate-manifest` biex tivvalida
l-ismijiet tal-scripts u l-commands eżatti kontra `package.json`; żidiet, tneħħijiet u
command drift iwasslu biex ifallu kemm il-hook lokali kif ukoll il-jobs tal-klassifikazzjoni tal-bidliet fis-CI.
Alias mhuwiex workflow job, istanza tal-matriċi jew test case: dawn l-għaddijiet ma jridux
jiġu ppreżentati bħala interkambjabbli.

Uża `npm run quality:scan -- --list` jew `npm run quality:scan:fast -- --list`
biex tispezzjona l-aliases magħżula mingħajr ma teżegwihom. Ir-runner jinvoka l-
entrypoint tal-npm, għalhekk ir-runtime tiegħu (inkluż Bun fejn ikun ikkonfigurat) jiġi ppreservat.
Il-manifest jirreġistra aliases barra minn dawk il-profili bħala invokati separatament, u
maintenance commands huma pprojbiti fi profili ta’ scan read-only.

Dawn il-profili jkopru biss l-iscan statiku. Ma jiċċertifikawx it-testijiet tal-prodott,
il-coverage, il-packaging, checks esterni jew l-aċċettazzjoni sħiħa tar-release ta’ kandidat.
L-aċċettazzjoni tal-workflow tuża `config/quality/admission-policy.json` marbut u
`scripts/quality/admission-verdict.mjs`. Il-profili tar-release-observer jibqgħu separati;
spezzjona l-checks u r-riċevuti applikabbli tagħhom b’mod indipendenti. Il-commands statiċi tal-osservatur sħiħ
huma ddikjarati f’`config/quality/release-green-static-profile.json`, inklużi
`audit:deps`, l-għażla tal-mutation tests u l-checks tat-traduzzjoni. Il-loader jivvalida l-commands tal-npm
kontra package.json u d-dikjarazzjonijiet immudellati taċ-CI/Quality; jirrifjuta drift
minflok ma jeżegwixxi shell tokens bħala arguments. Output SKIP/INCOMPLETE ta’ scanner meħtieġ
ma jistax jistabbilixxi PASS. Il-profil jirreġistra l-esklużjonijiet esterni tiegħu u ma jissostitwixxix
coverage ospitat, matriċijiet tat-testijiet, jew evidenza ta’ package jew deployment. L-inventarju deskrittiv hawn taħt
huwa referenza, mhux prova li gate fil-fatt tħaddem.

L-iscripts jinsabu taħt `scripts/check/` (policy gates) u `scripts/quality/` (ratchet engine).
Is-sors tal-verità tas-CI huwa `.github/workflows/ci.yml`.

### Dokumentazzjoni bażi ppublikata tas-saħħa

`.github/workflows/i18n-base-health.yml` josserva s-saħħa tad-dokumentazzjoni wara pushes magħżula lejn `main` u `release/v*`, u fuq id-dispaċċ manwali. Il-filtri tiegħu jkopru d-dokumentazzjoni, l-għeruq Markdown, `llm.txt`, it-traduzzjoni state/configuration u l-għodda rilevanti i18n. Ix-xogħol uniku `Published base documentation health` juża Ubuntu ospitat u skadenza ta 'ħames minuti. Iwettaq validazzjoni tal-qari biss u jikteb irċevuta dijanjostika mingħajr installazzjoni ta 'dipendenza, traduzzjoni jew adozzjoni mill-istat.

`scripts/i18n/check-base-health.mjs` teħtieġ żero inkonsistenzi sors-hash, missing-target, target-hash, stale-translation u section-cache. Jivvalida wkoll l-ambitu ċentrali attwali document/locale u l-provenjenza rreġistrata tiegħu. Kuntest invalidu, kopertura mhux kompluta jew kontrollur interrott jipproduċi `INCOMPLETE`; drift ikkonfermat jipproduċi `FAIL`. It-tnejn jirritornaw status ta' ħruġ li ma jonqosx. L-irċevuta hija marbuta li checkout SHA, workflow, run u attentat, u tinżamm bħala `i18n-base-health-<sha>-<run>-<attempt>`.

Din hija osservazzjoni indipendenti tal-bażi ppubblikata. Ma żżidx avveniment PR jew merge-group, verifika PR meħtieġa, alias npm jew membru tal-profil static-scan. Il-kontrollur sottostanti jimblokka wkoll il-ħames klassijiet kollha fil-modalità assoluta. Il-preparazzjoni PR ordinarja tibqa’ separata mid-dħul. Upload b'suċċess ma jistax ibiddel riżultat tas-saħħa fallut PASS.

PR ordinarju juża `--preflight` b'rapport bażi ġġenerat minn `--baseline-evidence`. Jista' jħalli sors Ingliż pendenti biss meta r-rekord sħiħ tat-traduzzjoni u l-bytes fil-mira attwali ma jinbidlux minn dik il-bażi eżatta. Inkonsistenzi ġodda fil-mira jew fil-cache tas-sezzjoni għadhom jimblukkaw, u evidenza mhux kompluta ma tistax tawtorizza l-preparazzjoni. Ir-rapport jesponi `preparationPending` u `mergeReady` separatament: tħejjija b'suċċess ma tagħmilx traduzzjonijiet pendenti lesti biex jingħaqdu. Aġġorna l-mirja affettwati fil-kandidat kompost qabel id-dħul. Il-kandidat fdat tal-kju Mergify, `merge_group`, pushes tal-fergħat u runs CI manwali jużaw il-kontrollur assolut, mingħajr `--warn` jew maħfra ta 'falliment wiret. Hashes fil-mira nieqsa u ambitu mnaqqas minn fajls ewlenin irreġistrati mħassra ma jistgħux jipproduċu verdett assolut ta 'suċċess.

### Eħles PR fast-path (`quality.yml`)

`.github/workflows/quality.yml` tikkumplimenta CI fuq main/release PRs, timbotta għal `main`, tibgħat u tgħaqqad gruppi. PRs juża kontrolli veloċi ffiltrati mill-mogħdija. Il-bini duplikat b'diżabbiltà permanenti tneħħa; il-kontrolli build/package/boot reali jibqgħu CI. L-unità suite u vitest jimxu biss CI (`Unit Tests (N/8)` u `Vitest`).

| Job                                              | Ambitu                                                                                                                                                                                                                                   | Imblukkar            |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs u docs-all                                                                                                                                                                                                  | Iva                  |
| `Fast Quality Gates`                             | Code PRs; kontrolli statiċi, typecheck, dashboard typecheck, testijiet tal-unità affettwati                                                                                                                                              | Iva                  |
| `Forgotten sibling tests`                        | Code PRs; moduli mibdula traċċati għal konsumaturi statiċi u testijiet ta' aħwa kandidati; barmil u mogħdijiet ta 'importazzjoni dinamika huma rrappurtati bħala dijanjostiċi konsultattivi, b'eċċezzjonijiet ta' allowlist referenzjati | **Konsultattiv**     |
| `No new ESLint warnings`                         | Code PRs; gwardja tal-lint konxja tas-soppressjonijiet                                                                                                                                                                                   | Iva, inklużi frieket |
| `Merge integrity (changelog + generated skills)` | Non-draft PRs; changelog u s-sinkronizzazzjoni tal-ħiliet ġġenerati                                                                                                                                                                      | Iva, inklużi frieket |

#### Rapport tat-testijiet tal-aħwa minsija

`npm run check:forgotten-sibling-tests` jaħdem bħala pass konsultattiv ta' `Fast Quality Gates` u juża mill-ġdid is-solvent tal-importazzjoni wara l-mappa tal-impatt tat-test. Għal kull modulu ta 'produzzjoni mibdul, jirrapporta ktajjen `changed module/symbol -> static consumer -> candidate sibling test` deterministiċi meta t-test tal-kandidat ikun assenti mid-diff tat-talba tal-ġibda. Is-sommarju tal-Markdown u r-riżultat JSON jinżammu bħala l-artifact tal-fluss tax-xogħol `forgotten-sibling-tests` għall-kalibrazzjoni qabel kwalunkwe rollout li jimblokka.

L-esportazzjonijiet mill-ġdid tal-barmil u l-importazzjonijiet dinamiċi huma dijanjostiċi tar-riżoluzzjoni biss; huma qatt ma joħolqu sejba imblukkata. Eccezzjonijiet riveduti live in `config/quality/forgotten-sibling-allowlist.json`. Kull entrata trid issemmi t-test tal-konsumatur u l-kandidat, tagħti raġunament speċifiku, u torbot kwistjoni GitHub jew pull request. Entrati b'forma ħażina ma jingħalqu. Eċċezzjonijiet ma jistgħux inaqqsu test ta' kandidat imħassra jew diff li jżid `.skip`/`.todo`; asserzjoni tiddgħajjef u maskra oħra jibqgħu proprjetà tal-bieb `check:test-masking` li jimblokka b'mod indipendenti.

### Job: `lint`

Jitħaddem fuq kull PR lejn `main`. Jimblokka l-merge jekk ifalli.

| Skritt (`npm run ...`)            | Jivvalida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jimblokka                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:node-runtime`              | Il-verżjoni ta’ Node.js tinsab fil-medda appoġġjata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Iva                                          |
| `check:cycles`                    | Imports ċirkolari f’`src/` + `open-sse/` kollha (ibbażati fuq AST, bil-`paths` ta’ tsconfig riżolti). Meta jitħaddem waħdu joħroġ b’1 kull meta jeżisti xi ċiklu (jagħlaq b’falliment minn #15281 ’l hawn) u jelenka l-SCCs. `check:cycles:ratchet` (dak li tħaddem CI) jimblokka meta l-għadd jaqbeż il-limitu massimu `metrics.cycles` f’`quality-baseline.json` — bħalissa 14, `direction: down`, għalhekk jista’ jonqos biss (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Iva (ratchet)                                |
| `check:boundary`                  | Akkoppjar `open-sse → src`: imports uniċi minn fajl għal fajl mill-engine għall-app (`scripts/quality/measure-boundary.mjs`; il-lista tal-konnessjonijiet hija l-backlog ta’ rimedju għas-separazzjoni tal-core/module tal-v4). Waħdu = rapport konsultattiv (l-istess bħal `quality:boundary`). `check:boundary:ratchet` (dak li tħaddem CI, u li jinsab ukoll fil-loop tar-ratchet tal-fast-gates ta’ `quality.yml`) jimblokka meta l-għadd jaqbeż il-limitu massimu `metrics.boundaryOpenSseToSrc` f’`quality-baseline.json` — inizjalizzat għall-valur imkejjel ta’ 771, `direction: down`; `--update` jista’ jbaxxih biss; relattiv għall-bażi fuq il-PRs (`--base-ref`, ara hawn taħt)                                                                                                                                                                                                                                                                                                                                          | Iva (ratchet)                                |
| `check:route-validation:t06`      | Skemi Zod preżenti fir-rotot kollha (politika tal-Livell 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Iva                                          |
| `check:any-budget:t11`            | L-għadd ta’ `@ts-expect-error // any` ma jaqbiżx il-baġit (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Iva                                          |
| `check:provider-consistency`      | Kull fornitur f’`providers.ts` għandu entrata korrispondenti f’`providerRegistry.ts` (u viċi versa, fil-limiti tal-lista ta’ permessi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Iva                                          |
| `check:model-lifecycle`           | It-tliet tabelli tar-routing miżmuma manwalment jibqgħu konsistenti mal-istampa taċ-ċiklu tal-ħajja inkluża fir-repożitorju (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ma tagħtix punteġġ lil ebda id irtirat li `REGISTRY` jista’ jirrotja; kull mira ta’ `BUILT_IN_ALIASES` hija preżenti f’`REGISTRY` u assenti mill-istampa tal-ids irtirati; kull id irtirat li għadu f’`REGISTRY` jiġi ridirezzjonat jew elenkat f’`allowedRetiredInCatalog`; u ebda sors jew mira ta’ `DEFAULT_DEGRADATION_MAP` ma jidher bħala rtirat f’dik l-istampa. Dan ma jagħtix prova li mudell bħalissa qed jiġi pprovdut minn upstream attiv. Offline — iqabbel ma’ `config/quality/model-lifecycle.json`, aġġornat manwalment b’`npm run quality:refresh-model-lifecycle` (jeħtieġ in-network; mhux integrat fis-CI). `allowedRetiredInCatalog` huwa mekkaniżmu ta’ ratchet għat-tnaqqis progressiv: żid entrata biss flimkien ma’ issue ta’ traċċar.                                                                                              | Iva                                          |
| `check:fetch-targets`             | Kull `fetch("/api/...")` f’`src/` min-naħa tal-klijent jirriżolvi għal `route.ts` reali                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Iva                                          |
| `check:deps`                      | Id-dipendenzi kollha li jistgħu jiġu installati b’`npm install` fil-fajls `package.json` kollha fir-repożitorju jinsabu f’`dependency-allowlist.json`; pakketti ġodda mhux ippinnjati jew slopsquatted jiġu mmarkati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Iva                                          |
| `audit:deps`                      | Awditu npm tal-ħames lockfiles indipendenti kollha (l-għerq, Electron, il-plugins OpenCode v1/v2 u l-fornitur). Avviżi kritiċi jimblukkaw; avviżi ta’ severità għolja jibqgħu twissijiet viżibbli. Awditi neqsin jew falluti jitqiesu bħala INKOMPLETI u jimblukkaw; il-hashes tal-locks u r-rapporti għal kull ambitu jinżammu.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Iva                                          |
| `check:lockfile`                  | Integrità ta' `package-lock.json` — reġistru https, hashes tal-integrità, ebda sostituzzjoni tal-host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Iva                                          |
| `check:licenses`                  | Lista ta' permessi għal-liċenzji SPDX għad-dipendenzi tal-produzzjoni                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Iva                                          |
| `check:tracked-artifacts`         | Ebda artefatt tal-build / symlink ta' `node_modules` ikkommittjat (jitħaddem ukoll fil-pre-commit ta' husky; il-pre-push huwa intenzjonalment ħafif — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Iva                                          |
| `check:ai-attribution`            | Ebda trailer `Co-Authored-By` ta' AI/bot jew footer ta' ġenerazzjoni bl-AI fil-commits, fit-titlu jew fil-kontenut tal-PR — Regola Stretta #16 (fiċ-ċiklu tal-fast-gates ta' `quality.yml` għal PR→`release/**` — jaqra l-payload tal-event, ma jagħmel xejn barra mill-PRs — u pass għal PR biss fil-lint ta' `ci.yml` għal PR→`main`; kif ukoll il-hook `commit-msg` ta' husky; koawturi umani permessi; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:vitest-exclusions`         | Kull esklużjoni ta' Vitest issemmi issue ta' traċċar u tidher f'`config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Iva                                          |
| `check:file-size`                 | Il-fajls tas-sors (`.ts`/`.tsx` f'`src/`, `open-sse/`, `electron/`, `bin/`) jibqgħu fil-limitu ta' `cap` u l-fajls tat-test (`*.test.ts(x)`) fil-limitu ta' `testCap`; il-fajls iffriżati f'`file-size-baseline.json` (`frozen` / `testFrozen`) ma jistgħux jikbru lil hinn mid-daqs irreġistrat tagħhom                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Iva                                          |
| `check:error-helper`              | It-tweġibiet ta' żball fl-eżekuturi/handlers jużaw `buildErrorBody()` / `sanitizeErrorMessage()` (Regola Stretta #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Iva                                          |
| `check:migration-numbering`       | Il-fajls SQL tal-migrazzjoni huma nnumerati sekwenzjalment, mingħajr lakuni jew duplikati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Iva                                          |
| `check:public-creds`              | L-ebda OAuth `client_id`/`client_secret` litterali jew ċwievet Firebase Web barra minn `publicCreds.ts` (Regola Stretta #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Iva                                          |
| `check:db-rules`                  | L-ebda SQL mhux ipproċessat barra mill-moduli `src/lib/db/`; l-ebda importazzjoni barrel minn `localDb.ts` (Regoli Stretti #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Iva                                          |
| `check:known-symbols`             | L-eżekuturi tal-fornituri, l-istrateġiji tar-routing, u t-tradutturi rreġistrati fit-tabelli tad-dispaċċ tagħhom jaqblu mal-fajls fuq id-diska — l-ebda simbolu orfni jew mhux iddikjarat                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Iva                                          |
| `check:route-guard-membership`    | Kull rotta li tniedi proċess wild hija kklassifikata minn `isLocalOnlyPath()` (Regoli Stretti #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Iva                                          |
| `check:test-discovery`            | Kull fajl `*.test.ts` / `*.spec.ts` fir-repo jinġabar minn mill-inqas test runner wieħed (ratchet: il-lista tal-orfni f’`test-discovery-baseline.json` tista’ biss tiċkien)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Iva                                          |
| `check:test-tla-order`            | L-ebda fajl `node:test` taħt `tests/unit` ma jirreġistra test, jasal għal `await` fl-ogħla livell, u mbagħad jirreġistra aktar testijiet (#18045; ratchet: `test-tla-order-allowlist.json` tista’ biss tiċkien)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Iva                                          |
| `check:agent-skills-sync`         | L-artefatti ġġenerati tal-ħiliet tal-aġent jaqblu mal-katalgu tas-sors tagħhom (l-ebda devjazzjoni)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:provider-asset-provenance` | Il-logos/assi tal-fornituri għandhom entrata rreġistrata tal-provenjenza                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `lint:json`                       | Il-fajls tal-konfigurazzjoni JSON jiġu pproċessati u jissodisfaw ir-regoli tal-lint tar-repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `typecheck:core`                  | Kompilazzjoni ta’ TypeScript mingħajr żbalji (twissijiet konsultattivi biss)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Iva                                          |
| `typecheck:noimplicit:core`       | `noImplicitAny` strett — orjentat lejn il-futur; ħafna siti ta’ sejħiet preeżistenti għadhom jeħtieġu annotazzjonijiet                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **Konsultattiv** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` limitat għal `src/app/(dashboard)/**` (#7033) — il-lista magħżula minn qabel ta’ 27 fajl ta’ `typecheck:core` ma tinkludi l-ebda TSX tad-dashboard, u lanqas `next build` ma jwettaq verifika tat-tipi tiegħu (`next.config.mjs` jistabbilixxi `ignoreBuildErrors: true`), għalhekk ir-rigressjonijiet ta’ identifikaturi orfni hemmhekk (#6625/#6909) ma kinux jidhru fis-CI. Iqabbel id-differenzi ma’ linja bażi ffriżata tal-għadd għal kull fajl/kodiċi TS (`config/quality/dashboard-typecheck-baseline.json`, bl-istess mudell ta’ infurzar kontra linja bażi skaduta bħal `check:known-symbols`) — huma biss żbalji ĠODDA lil hinn mill-għadd fil-linja bażi li jfallu l-gate; naqqas il-linja bażi b’`--update` meta jiġi rranġat żball eżistenti minn qabel.                                                                                                                                                                                                                                                          | Iva                                          |
| `check:build-typecheck`           | Type check tal-produzzjoni tal-app kollha fuq `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), li ma jkunx kopert mil-lista permessa ta’ 27 fajl ta’ `typecheck:core` u mill-kontroll tad-dashboard. Jagħmel differenza kontra `config/quality/build-typecheck-baseline.json`; għadd ġdid jew ogħla għal kull par (fajl, kodiċi) ifalli, filwaqt li għadd aktar baxx jitlob li tnaqqas il-limitu. `--update` jirrifjuta waqt li r-run ikun fih par ġdid jew ogħla sakemm ma jingħatax `--force-regressions`, u jirrifjuta fajl li jkun għadu kif ġie msikket sakemm ma jingħatax `--force-nocheck`, għalhekk it-twessigħ tal-bażi biex tikseb riżultat tajjeb u l-għoti ta’ silenzju permanenti huma żewġ azzjonijiet intenzjonati separati. `--force` waħdu jiġi rrifjutat. Jiskannja wkoll l-ambitu tal-build għal `@ts-nocheck` kontra `config/quality/ts-nocheck-baseline.json`, għaliex fajl li jużah ma jirrapporta l-ebda dijanjostika u inkella jkun inviżibbli għal kull gate. | Iva                                          |

#### Żewġ programmi ta’ typecheck jagħtu tweġibiet differenti

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) u `check:build-typecheck` jikkompilaw programmi differenti taħt
għażliet differenti, u l-istess fajl jista’ jkun nadif f’wieħed u mimli żbalji
fl-ieħor.

`tsconfig.build.json` jistabbilixxi `"strict": false`, għalhekk `noImplicitAny` huwa mitfi. Il-konfigurazzjoni tal-core
tikkompila lista permessa kkurata ta’ 27 fajl b’għażliet aktar stretti u ssegwi l-graff
tal-importazzjonijiet ta’ kull entrata, għalhekk fajls li qatt ma jidhru fil-programm
tal-build xorta jiġu kkontrollati hemmhekk.

Il-konsegwenza hija importanti meta tiġġudika jekk fajl għandux tipi: **żero dijanjostiċi
taħt `check:build-typecheck` ma jfissirx żero**. It-tneħħija ta’ `@ts-nocheck` minn 26
fajl uriet li 23 minnhom kienu nodfa fil-programm tal-build; sittax minn dawk żvelaw
madwar 120 żball ta’ implicit-any f’dak strett. Iċċekkja t-tnejn qabel tgħid li fajl huwa nadif.

### Job: `quality-gate`

Jaħdem wara `test-coverage`. Jibblokka l-merge jekk ifalli.

| Skritt                       | Jivvalida                                                                                                                                                                | Jimblokka              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| `quality:collect`            | Joħroġ `quality-metrics.json` (għadd ta’ twissijiet ta’ ESLint, kopertura mir-rapport magħqud tax-shards)                                                                | Iva (qabel ir-ratchet) |
| `quality:ratchet`            | Kull metrika f’`quality-baseline.json` ma marritx lura (twissijiet ta’ ESLint ≤ il-linja bażi; kopertura ≥ il-linja bażi)                                                | Iva                    |
| `check:duplication`          | Id-duplikazzjoni tal-kodiċi (jscpd@4) ma taqbiżx il-linja bażi f’`quality-baseline.json`                                                                                 | Iva                    |
| `check:complexity`           | Il-kumplessità ċiklomatika fil-livell tal-fajl ma taqbiżx il-limitu (ir-regoli ewlenin ta’ ESLint `complexity` + `max-lines-per-function`)                               | Iva                    |
| `check:cognitive-complexity` | Ratchet tal-kumplessità konjittiva (`eslint-plugin-sonarjs`) — pass separat ta’ ESLint; is-CI jħaddem lit-tnejn magħqudin bħala l-pass uniku `check:complexity-ratchets` | Iva                    |
| `check:dead-code`            | Ir-ratchet ta’ exports/fajls mhux użati (knip) ma jmurx lura meta mqabbel mal-linja bażi                                                                                 | Iva                    |
| `check:compression-budget`   | Baġit tal-benchmark tal-kompressjoni — il-limiti minimi tal-iffrankar ta’ tokens għal kull engine ma jridux imorru lura                                                  | Iva                    |
| `check:type-coverage`        | Ir-ratchet tal-perċentwal ittajpjat (`type-coverage`) ma jmurx lura; fil-biċċa l-kbira jissostitwixxi `typecheck:noimplicit:core`                                        | Iva                    |

### Jobs: `codeql-scan` u `codeql-admission`

`codeql-scan` jipproduċi l-kategoriji kollha ta' analiżi kkonfigurati. Wara li dak il-job jirnexxi, `codeql-admission` jivvalida l-uploads eżatti tiegħu u r-ratchet tat-twissijiet tal-kandidat. It-tnejn huma dipendenzi obbligatorji ta' `Gate / CI`, inklużi kandidati li jibdlu d-dokumentazzjoni biss. Ir-rekwiżiti tal-attivazzjoni amministrattiva u tat-test canary huma deskritti taħt “CodeQL ratchet” hawn taħt.

| Skript                 | Jivvalida                                                                                                                                                                                                                        | Jimblokka |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:codeql-ratchet` | Ir-ref/SHA tal-kandidat u l-kategoriji kollha tal-analiżi kkonfigurati għandhom ikunu aġġornati qabel ir-ratchet tat-twissijiet; evidenza nieqsa timblokka. L-inventarju globali jibqa' separat — ara “CodeQL ratchet” hawn taħt | Iva       |

### Impjieg: `quality-extended`

Il-kompitu jimblokka l-kandidati applikabbli. Id-daqs tal-bundle, is-sejbiet ta’ sigrieti, is-sejbiet
ta’ vulnerabbiltajiet, is-sejbiet tal-workflow u l-bidliet fl-OpenAPI jiġu ċċekkjati b’ratchets meħtieġa.
Id-dijanjostiċi tad-dipendenzi ċirkolari jibqgħu konsultattivi. L-installazzjoni tal-iscanner hija meħtieġa:
`scripts/ci/install-quality-scanners.sh` jipprovdi verżjonijiet iffissati u jgħaddi ’l quddiem
il-fallimenti tal-installazzjoni. Għodod neqsin, rapporti invalidi jew linji bażi neqsin iħallu
l-gate meħtieġ tal-iscanner MHUX KOMPLUT.

| Skript                   | Jivvalida                                                                                                                                                                                                                      | Imblukkar                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `check:circular-deps`    | L-ebda dipendenza ċirkolari (dpdm)                                                                                                                                                                                             | **Konsultattiv**                                             |
| `check:bundle-size`      | Id-daqs tal-bundle ma jaqbiżx il-limitu; kejl mhux disponibbli jitqies bħala falliment                                                                                                                                         | **Jimblokka b'--ratchet**                                    |
| `check:secrets`          | Is-sejbiet ta' Gitleaks ma jmorrrux lura; l-iskans meħtieġa jirrifjutaw għodod/sors/linja bażi neqsin, skans falluti u rapporti invalidi                                                                                       | **Jimblokka b'--ratchet**                                    |
| `check:vuln-ratchet`     | Il-vulnerabbiltajiet tad-dipendenzi ma jmorrux lura; l-iskans meħtieġa jirrifjutaw għodod neqsin, rapporti invalidi jew linji bażi neqsin                                                                                      | **Jimblokka b'--ratchet**                                    |
| `check:workflows`        | Verifika statika tal-workflow (actionlint + zizmor); scanners neqsin/bil-ħsara, rapporti invalidi jew linja bażi tar-ratchet nieqsa jfallu bħala INCOMPLETE. Sejbiet validi jsegwu l-politika strict/advisory/ratchet magħżula | Eżekuzzjoni meħtieġa; ir-ratchet ta' zizmor jimblokka fis-CI |
| `check:openapi-breaking` | Il-kuntratt tal-API pubblika mqabbel ma' commits ippinnjati tal-avvenimenti (merge-base tal-PR, l-istat ta' qabel il-push, bażi tal-merge-group; checkout skedat/manwali tal-ewwel parent); kejl meħtieġ ifalli b'mod magħluq  | **Jimblokka b'--ratchet**                                    |

### Job: `docs-sync-strict`

Għal talbiet ta' pull lil `main` jew `release/**`, dan ix-xogħol jaħdem biss għal kandidati mhux abbozzati (jew kju fdati) ikklassifikati bħala dokumentazzjoni jew bidliet fil-kodiċi. Tmexxi wkoll fuq avvenimenti CI mhux PR; il-push trigger ta' dan il-fluss tax-xogħol ikopri `main` biss, mhux `release/**`. Pass li joħroġ mhux żero jimblokka l-impjieg; is-sejbiet ta' rapport biss u l-eżenzjonijiet dokumentati hawn taħt ma jagħmlux dan.

| Skript                         | Jivvalida                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Imblukkar                                                                                                                                      |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-gate li jħaddem is-7 sub-gates ta’ hawn taħt b’mod sekwenzjali                                                                                                                                                                                                                                                                                                                                                                                                          | Iva                                                                                                                                            |
| ↳ `check:docs-sync`            | Konsistenza tal-verżjoni Package/OpenAPI/CHANGELOG, mirja `llm.txt` eżatti, invarjanti CHANGELOG section/size tradotti, u nuqqas ta' doks duplikati sostitwiti                                                                                                                                                                                                                                                                                                               | Iva                                                                                                                                            |
| ↳ `check:docs-frontmatter`     | Il-paġni ta' dokumentazzjoni ikkumpilati jġorru titoli validi ta' frontmatter                                                                                                                                                                                                                                                                                                                                                                                                | Iva                                                                                                                                            |
| ↳ `check:docs-counts`          | Invarjanti tal-għadd ta 'kunfidenza għolja huma stretti; Il-kontrolli tal-għadd tal-fajls euristiċi jwissu biss sakemm l-iskritt ma jirċievix `--strict` (il-meta-gate CI ma jgħaddihx)                                                                                                                                                                                                                                                                                      | Imblukkar strett tal-livelli; konsulenza ta' saff artab                                                                                        |
| ↳ `check:env-doc-sync`         | Sors env jaqra, `.env.example`, u `docs/reference/ENVIRONMENT.md` jaqblu wara l-listi ta' permessi espliċiti ta' injora, doc-only, u env-only                                                                                                                                                                                                                                                                                                                                | Iva, barra l-listi ta' permessi dokumentati                                                                                                    |
| ↳ `check:deprecated-versions`  | Jirrapporta verżjonijiet skaduti potenzjali barra minn kuntesti storiċi sikuri u dati ta' aġġornamenti skaduti, esklużi docs injorati                                                                                                                                                                                                                                                                                                                                        | Konsulenza fil-wajers CI attwali (`--strict` ma jgħaddix)                                                                                      |
| ↳ `check:doc-links`            | Il-links interni ta' markdown fid-doks jirrisolvu għal fajls reali (formola `[text]`/`(path)` )                                                                                                                                                                                                                                                                                                                                                                              | Iva                                                                                                                                            |
| ↳ `check:fabricated-docs`      | Rotot, vars env, kmandi CLI, ismijiet tal-ganċ, u mogħdijiet tal-fajls ikkwotati fid-doks jeżistu fil-codebase. Xatba iebes permezz `--strict`; soft-fail mingħajr bandiera.                                                                                                                                                                                                                                                                                                 | Iva (permezz ta' `--strict` CI)                                                                                                                |
| `check:cli-i18n`               | Il-keys ta’ `t()` użati mis-CLI jeżistu f’`en`; `pt-BR` iżomm kull sezzjoni tal-ogħla livell; `zh-CN` u `zh-TW` fihom kull key minn `en`                                                                                                                                                                                                                                                                                                                                     | Iva                                                                                                                                            |
| `check:openapi-coverage`       | L-ispeċifikazzjoni OpenAPI tkopri mill-inqas limitu minimu suġġett għar-ratchet tar-routes reali                                                                                                                                                                                                                                                                                                                                                                             | Iva                                                                                                                                            |
| `check:openapi-security-tiers` | L-annotazzjonijiet iddikjarati `x-loopback-only`/`x-always-protected` iridu jkunu sostnuti minn `routeGuard.ts`; żbalji tal-parser u nuqqasijiet ta’ qbil fil-kontroll ’il quddiem jimblukkaw. Il-kontroll bil-maqlub għal `x-loopback-only` nieqes taħt prefissi għal aċċess lokali biss jagħti twissijiet, u r-rotot definiti biss permezz ta’ pattern huma esklużi minn dan il-kontroll bil-maqlub.                                                                       | Il-kontrolli tal-parser u ’l quddiem jimblukkaw; il-kontroll bil-maqlub huwa konsultattiv                                                      |
| `check:openapi-routes`         | Kull mogħdija `/api...` f’`openapi.yaml` tikkorrispondi għal rotta reali indipendentement mill-parametri wara l-applikazzjoni tal-lista ġġustifikata ta’ eċċezzjonijiet `KNOWN_STALE_SPEC`; entrati qodma fil-lista wkoll iwasslu għal falliment                                                                                                                                                                                                                             | Iva                                                                                                                                            |
| `check:docs-symbols`           | Ir-referenzi URL interni `/api/...` fid-dokumenti kanoniċi li mhumiex kopji mera jikkorrispondu għal rotta reali jew familja ta’ rotot; ir-referenzi għal proxy/upstream/placeholder/fajl u l-entrati ġġustifikati f’`KNOWN_STALE_DOC_REFS` huma esklużi, u l-entrati qodma fil-lista ta’ eċċezzjonijiet iwasslu għal falliment                                                                                                                                              | Iva                                                                                                                                            |
| `i18n translation drift`       | L-ammissjoni assoluta teħtieġ żero sors, mira nieqsa, target-hash, stale-traduzzjoni u inkonsistenzi fil-cache tas-sezzjoni. Il-preparazzjoni PR ordinarja tista 'żżomm evidenza eżatta li tintiret jew bidla pendenti bl-Ingliż biss b'stat komplut mhux mibdul u bytes fil-mira; ir-rapport tiegħu separatament jiddikjara li huwa lest għall-għaqda. Hashes fil-mira nieqsa u blokk tal-evidenza bażi mhux kompluta. Cache tas-sezzjoni tal-legat assenti mhix falliment. | Il-ħames klassijiet kollha jimblukkaw id-dħul queue/base ; tħejjija ordinarja permessi biss ippruvati wiret jew bl-Ingliż biss xogħol pendenti |

It-tnax-il README SVGs taħt `docs/diagrams/` huma ġġenerati (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` jirriġenera kollha kemm huma). Kull wieħed għandu byte-compare unit test (`tests/unit/docs/readme-*-svg.test.ts`, xogħol `test-unit`) li jfalli meta l-fajl kommess ikun reġa, u `check:docs-counts` jaqra numri kanoniċi min-nodi `<text>` tagħhom — u huwa għalhekk li l-pass li jiddeskrivi jżomm kull string deskritt fil-fajl bħala `<text>` inviżibbli. Il-kontroll tan-numri kanoniċi SVG jaqra l-fajls elenkati `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, flimkien ma `public/images/tier-flow-dark.svg` u `tier-flow-light.svg`; il-pretensjonijiet b'xejn għal dejjem, dħul fil-katalogu, pool rikorrenti u fatturi ta 'punteġġ jaqraw ukoll `promise-pillars.svg`, `free-tier-budget.svg` u `strategies-grid.svg`. `free-tier-budget.svg` jiġbed iċ-ċifri tiegħu mill-loader tal-katalgu ħajjin, għalhekk bidla għal `FREE_MODEL_BUDGETS` jew għal isem tal-wiri tal-fornitur ħamra CI sakemm dak il-fajl jiġi riġenerat.

### Xogħol: `i18n-ui-coverage`

| Skritt                              | Jivvalida                                                                                                                                                                                                          | Imblukkar     |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `check-ui-keys-coverage` (integrat) | Il-kopertura taċ-ċwievet i18n tal-UI hija ≥ 65%                                                                                                                                                                    | Iva           |
| `check-ui-value-drift` (integrat)   | **Valur** bl-Ingliż miktub mill-ġdid ma jħalli warajh l-ebda traduzzjoni skaduta                                                                                                                                   | Iva           |
| `check-new-key-coverage` (integrat) | Ċavetta **ġdida** bl-Ingliż tkun tradotta f’kull lokalizzazzjoni — markatur `__MISSING__:` jiġi rrifjutat                                                                                                          | Iva           |
| `check-translation-ratio`           | Il-proporzjon ta’ traduzzjonijiet reali għal kull lokalizzazzjoni (identiċi għall-Ingliż / placeholder / nieqsa barra mil-lista permessa) ma jridx jaqbeż `config/quality/i18n-translation-baseline.json` + marġni | **Imblukkar** |

Jeħtieġ `fetch-depth: 0` — il-kontroll tad-differenza fil-valuri jqabbel `en.json` mal-bażi tal-merge.

#### `check-ui-value-drift` — gate tat-traduzzjonijiet skaduti

Jidentifika r-rigressjoni waħda tal-i18n li l-kontrolli l-oħra strutturalment ma jistgħux jaraw: valur bl-Ingliż
jinkiteb mill-ġdid u t-traduzzjonijiet derivati mill-Ingliż _preċedenti_ jibqgħu hemm, għalhekk
utenti li ma jużawx l-Ingliż jibqgħu jaqraw test miktub b’ċertezza iżda li issa huwa żbaljat.

Dan verament ġie rilaxxat. `oauthModal.googleOAuthWarning` inkiteb mill-ġdid meta żdied l-għajnun
għall-login ta’ Antigravity (#5203); **39 minn 43 lokalizzazzjoni** żammew test li kien jgħid lill-operaturi biex "jikkopjaw
il-URL sħiħ u jwaħħluh hawn taħt" — fluss li ma jistax jitlesta għal dak il-fornitur. Dan baqa’
ma ġiex innutat sa #8463 għaliex:

- `sync-ui-keys` jimla biss ċwievet li huma **neqsin**, u qatt dawk li huma **skaduti**;
- `check-ui-keys-coverage` jgħodd il-_preżenza_ taċ-ċavetta, għalhekk traduzzjoni skaduta titqies koperta;
- `check-translation-drift` isegwi l-mirja tad-dokumentazzjoni `docs/i18n/<locale>/**.md` —
  qatt ma jaqra `src/i18n/messages/*.json`. Jimblokka fil-job `docs-sync-strict` mir-ri-sinkronizzazzjoni
  ta’ 2026-09: editja dokument ewlieni → `npm run i18n:run -- --files=<doc>` (fil-livell tat-taqsima, irħis).

**Konxju mid-diff, mhux ibbażat fuq baseline.** Huwa jqabbel `en.json` fil-bażi tal-merge mas-siġra
tax-xogħol; għal kull ċavetta li l-valur tagħha bl-Ingliż inbidel, kull lokalizzazzjoni li għadha żżomm
traduzzjoni mhux mittiefsa hija skaduta. Dan intenzjonalment **jiffriża d-dejn eżistenti** — diff
ma jistax jiżvela minn liema Ingliż antik ġiet traduzzjoni li ilha teżisti, għalhekk il-kontroll jiġġudika
biss dak li tmiss il-bidla attwali. L-alternattiva (baseline ta’ hashes għal kull ċavetta) tkun teħtieġ
fajl iġġenerat ta’ madwar 600 KB, 3× akbar mill-akbar baseline eżistenti, li jinbidel ma’ kull PR tal-i18n.

Hemm żewġ modi biex tissodisfah:

1. aġġorna t-traduzzjonijiet affettwati, jew
2. issettjahom għal `__MISSING__:<new english>` — waqt l-eżekuzzjoni mbagħad jintwera l-Ingliż ikkoreġut
   (`src/i18n/request.ts::deepMergeFallback`, #7258) u ċ-ċavetta tidħol fil-kju għat-traduzzjoni.

Jekk inbidlet it-**tifsira** tas-sekwenza, ippreferi **tibdel isem iċ-ċavetta**: ċavetta ġdida ma tistax tiret
traduzzjoni skaduta. Dan huwa l-mudell li uża #8463.

```bash
npm run i18n:check-value-drift          # strett (dak li jħaddem is-CI)
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

Matriċi sħiħa ta’ validazzjoni tal-i18n (job wieħed għal kull lokalizzazzjoni). Il-job kollu huwa konsultattiv.

| Script                          | Jivvalida                                                | Jimblokka                                                     |
| ------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------- |
| `validate_translation.py quick` | Il-kompletezza tat-traduzzjoni għal kull lokalizzazzjoni | **Konsultattiv** (`continue-on-error: true` fuq il-job kollu) |

### Job: `pr-test-policy`

Jaħdem fuq pull requests biss.

| Script                 | Jivvalida                                                                                                                                         | Jimblokka |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PRs li jibdlu l-code tal-produzzjoni f’`src/`, `open-sse/`, `electron/`, jew `bin/` iridu jinkludu jew jaġġornaw tests (Regola Stretta #8)        | Iva       |
| `check:test-masking`   | Fajls tat-test mibdula ma jnaqqsux l-għadd nett ta’ asserts u ma jżidux tawtoloġiji `assert.ok(true)`                                             | Iva       |
| `check:pr-evidence`    | Il-body tal-PR isemmi evidenza tat-test/VPS għall-bidla (jawtomatizza r-Regola Stretta #18 billi jfittex fit-test tal-PR — fraġli, ara l-Backlog) | Iva       |

### Job: `test-vitest`

Jeħtieġ il-job ta’ klassifikazzjoni `changes`. Ix-shards applikabbli tal-matriċi jimblukkaw il-merge jekk ifallu.

| Sett             | Jivvalida                                                     | Jimblokka                                                                                                              |
| ---------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Server MCP (110 għodod), autoCombo, cache — runner ta' vitest | Iva                                                                                                                    |
| `test:vitest:ui` | Testijiet tal-komponenti tal-UI — runner ta' vitest           | **Jimblokka** — fallimenti preeżistenti huma esklużi espliċitament f'`vitest.config.ts`; fallimenti ġodda jfallu l-job |

### Workflows ta’ kull lejl (skedati, konsultattivi)

Dawn jaħdmu skont skeda cron (u `workflow_dispatch`), qatt fuq PRs. Kollha huma konsultattivi.

| Fluss tax-xogħol       | Jivvalida                                                                                                                                                                        | Imblukkar        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | testijiet tal-proprjetajiet ta’ fast-check b’seed każwali + għadd għoli ta’ eżekuzzjonijiet                                                                                      | **Konsultattiv** |
| `nightly-resilience`   | limitu tat-tkabbir tal-heap, injezzjoni kaotika ta’ ħsarat, tagħbija/soak b’k6                                                                                                   | **Konsultattiv** |
| `nightly-llm-security` | protezzjoni kontra l-injezzjoni ta’ promptfoo (modalità ta’ mblukkar) + sondi ta’ garak (jinqabżu mingħajr sigriet tal-fornitur)                                                 | **Konsultattiv** |
| `nightly-schemathesis` | fuzzing tal-kuntratt OpenAPI (schemathesis) kontra OmniRoute attiv bl-użu ta’ `docs/openapi.yaml` — jikxef ksur tal-ispeċifikazzjoni / żbalji 500 mhux immaniġġjati (Fażi 8 B.4) | **Konsultattiv** |
| `nightly-mutation`     | punteġġ tal-ittestjar tal-mutazzjonijiet ta’ Stryker fuq il-mogħdija rapida tat-testijiet tal-unità — mutanti li jibqgħu ħajjin jikxfu asserzjonijiet dgħajfa                    | **Konsultattiv** |
| `nightly-compat`       | matriċi tal-kompatibbiltà tal-engine ta’ Node fil-firxiet appoġġjati ta’ `engines.node`                                                                                          | **Konsultattiv** |

Il-linji bażi tal-prestazzjoni (heap, TTFB, ħin tal-build) jiġu rreġistrati, mhux soġġetti għal limitu: ara [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

### CodeQL ratchet: ammissjoni tal-kandidati u inventarju tar-repożitorju

CI tippossjedi ammissjoni tal-kandidati CodeQL permezz ta 'katina ta' dipendenza espliċita: `codeql-scan` isejjaħ il-matriċi ta 'erba' lingwi `codeql.yml`, imbagħad `codeql-admission` jmexxi `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` jeħtieġ iż-żewġ riżultati. Il-kwalità żżomm il-verifiki numeriċi tagħha stess iżda ma tinvestigax l-iskaner qabel ma jispiċċa l-produttur; `Gate / Quality` waħdu mhuwiex ammissjoni kompluta tal-kandidati. CodeQL jibqa' meħtieġ fuq kandidati docs-only.

Il-politika `config/quality/codeql-admission-policy.json` tagħżel Azzjonijiet, C/C++, JavaScript/TypeScript u Python, default suite ta' mistoqsijiet, mudell ta' theddid remot u mod ta' bini xejn. It-titjira minn qabel tal-produttur jirrifjuta rekord ta' attivazzjoni pendenti u jfergħat barra mil-lista ta' mira espliċita. Il-miri attwali huma testijiet prinċipali u release/v3.8.54. Kuntratt iqabblu din il-lista finita u l-ispinta tal-manutenzjoni mal-verżjoni tal-pakkett; ir-rilaxx li jmiss jeħtieġ li jiġi rivedut l-onboarding. Il-grillu PR eżistenti ta 'rilaxx usa' ta' CI jinżamm, iżda mira mhux abbord tirrapporta HOLD qabel l-estrazzjoni aktar milli tikseb PASS mhux imkejjel.

Kull xogħol matriċi jirreġistra SARIF upload ID attwali tiegħu, lingwa, kategorija, ġiri u attentat, identità tal-fluss tax-xogħol ta 'min iċempel, avveniment ref/head/base/merge SHA u hash tal-politika. Ix-xogħol dipendenti jniżżel biss l-irċevuti ta' din il-ġirja u jivvalida d-diġestjoni tal-artifact. Jeħtieġ l-erba 'kategoriji kollha, produttur ta' suċċess u proċessar komplut ta 'kull upload eżatt. Juża l-filtru sarif_id taż- API, mhux l-aħħar analiżi misjuba fuq fergħa. Reruns parzjali jistgħu jerġgħu jużaw kategoriji ta' suċċess minn tentattiv preċedenti tal-istess ġirja u kandidat, filwaqt li jippreservaw it-tentattiv ta' produzzjoni; produttur attwali fallut ma jistax jerġa' juża evidenza ħadra preċedenti.

L-azzjoni CodeQL tistenna għall-ipproċessar, iżda l-implimentazzjoni ippinjata tagħha tista 'twissi u tkompli wara falliment tal-qari tal-istatus jew stennija eżawrita. Id-dħul għalhekk jivverifika l-ipproċessar mill-ġdid. Kategoriji neqsin, ipproċessar pendenti, impjiegi falluti jew ikkanċellati, identità qadima, paġnar mhux komplut jew APIs mhux disponibbli jipproduċu HOLD u ħruġ 2. L-ebda stennija fissa għal fluss tax-xogħol tal-iskaner indipendenti tibqa '. PR mhux skannjat ma jistax jgħaddi minħabba li mistoqsija ta' twissija rritornat 0. Għadd imkejjel 'il fuq minn `metrics.codeqlAlerts.value` joħroġ minn 1; il-linja bażi ma tittella'x biex tassorbi twissijiet ta' fergħa oħra. [Tella l-istatus u l-analiżi tal-ħarsa](https://docs.github.com/en/rest/code-scanning/code-scanning).

L-irċevuta tirrekordja t-tlugħ u l-analiżi IDs, kategoriji, verżjonijiet tal-għodda, ref/SHA, numri ta’ linja bażi u ta’ twissija. L-għadd ta SARIF identity/result, l-għadd ta' regoli minimi u l-istanzi eżatti ta' twissija jibqgħu obbligatorji. L-identitajiet PR/analysis jiġu ċċekkjati mill-ġdid qabel ma jiġu aċċettati. Dawn il-kontrolli jistabbilixxu kopertura ta' kategorija konfigurata, mhux inventarju ta' kull fajl sors estratt. L-estrazzjoni mingħajr bini C/C++ ma tinkludix kodiċi ġġenerat waqt bini ta' proġett. L-esklużjonijiet tas-sors għadhom jeħtieġu reviżjoni, u l-attribuzzjoni tal-kontributur teħtieġ evidenza bażi eżatta komparabbli.

`codeql-maintenance.yml` jipprovdi skans push ta 'rilaxx attiv u l-iskeda ta' kull ġimgħa mingħajr ma tidduplika l-produtturi PR/main. `nightly-codeql-inventory.yml` iżomm il-linja bażi madwar ir-repożitorju separat, `--strict-measurement` u falliment meta l-kejl ma jkunx disponibbli. L-iskip grazzjuż tal-kollettur tal-legat lokali mhuwiex ammissjoni tal-kandidati. L-issikkar jibqa' `--update` espliċitu wara għadd globali aktar baxx ivverifikat.

Il-fluss tax-xogħol Avvanzat m'għandux jiġi ppubblikat waqt li l-Configurazzjoni Default hija kkonfigurata: GitHub tirrifjuta dik il-kombinazzjoni. Il-politika verżjoni tagħha tibqa' pendenti sakemm it-tranżizzjoni amministrattiva riveduta tinqara lura. Qabel il-pubblikazzjoni, repożitorju ta 'pinnijiet ta' operatur, head/base/tree, hashes policy/patch/rollback u stat ta 'setup osservat; `node scripts/quality/codeql-producer.mjs verify-admin-readback` jiċċekkja r-rekords JSON mistennija u attwali fornuti. Din hija gwardja teknika, mhux approvazzjoni tal-operatur jew sostitut biex iġibu readbacks ġodda. It-token PR qatt ma jitlob aċċess għall-Amministrazzjoni. It-tnedija u kwalunkwe bidla fl-iskaner jeħtieġu dik ir-reaback separata flimkien ma' evidenza reali ta' kompatibilità PR, furketta u grupp ta' amalgamazzjoni.

Frieket użu ospitat runners, checkout mingħajr kredenzjali persistenti, l-ebda proġett install/build fil-produttur, u l-ebda sigrieti repożitorju wiret. GitHub jappoġġja SARIF upload għall-avveniment pull_request bit-token tal-furketta mnaqqas tiegħu; l-approvazzjoni tal-eżekuzzjoni tal-kontribuzzjoni għall-ewwel darba tibqa' politika GitHub. Qatt tuża pull_request_target biex tesegwixxi kodiċi mhux affidabbli. Ikkonferma l-permessi tat-tokens attwali, analysis_key u l-ambjenti kollha tal-kategorija fil-kanarju kkontrollat qabel ma tikkunsidra l-migrazzjoni kompluta. [Regoli għall-upload tal-furketta](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [modi ta' setup konfliġġenti](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Is-sensji huma s-sejħa tal-operatur (Hard Rule #14)** — qatt ma tiċħad twissija CodeQL mingħajr ma tirreġistra l-ġustifikazzjoni teknika fil-kumment tat-tkeċċija: `won't fix` għal rekwiżit ta 'protokoll upstream, `used in tests` għal tagħmir tat-test, `false positive` għal sanitizer CodeQL ma jistax jara (preċedent: `docs/security/ERROR_SANITIZATION.md`).

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

**Ukoll mhux dokumentati hawn fuq** (konsultattivi, b'sinjal baxx): il-job `docs-lint` (markdownlint + Vale, il-job kollu b'`continue-on-error`) u l-flussi tax-xogħol indipendenti tal-iskaner `semgrep.yml` / `scorecard.yml`. CodeQL issa għandu jobs obbligatorji tal-produttur u tal-ammissjoni taħt `Gate / CI`, soġġetti għar-rekwiżiti tal-attivazzjoni deskritti hawn fuq. `semgrepFindings: 0` jinsab f'`quality-baseline.json` iżda mhuwiex marbut ma' ratchet li jimblokka f'`ci.yml` — il-metrika bħalissa hija orfni.

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
