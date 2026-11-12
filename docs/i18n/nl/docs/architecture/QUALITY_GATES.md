# Quality Gates Reference (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Dit document is de gezaghebbende referentie voor alle CI-kwaliteitspoorten in OmniRoute.
Het beschrijft elke poort, wat deze valideert, in welke CI-job deze wordt uitgevoerd, of deze
een ratchet-basislijn of een slaag/zak-beleid gebruikt en of deze de build blokkeert of adviserend is.

Zie voor een korte samenvatting en het beleid voor de allowlist de sectie "Quality Gates & Ratchets"
in `AGENTS.md`. Zie voor de kritische beoordeling, volwassenheidsclassificatie en toolagnostische
replicatieplanning van hetzelfde systeem het
[Quality Gate Playbook](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inventaris van gates en uitvoeringsprofielen

### Toelating van kandidaten

De CI en Quality Gates-workflows geven elk een stabiel oordeel: `Gate / CI` en `Gate / Quality`. Hun geversieerde toelatingsbeleid somt elke upstream-baan op zoals vereist of adviserend. Een toepasselijke vereiste taak moet slagen: ontbrekende, geannuleerde, overgeslagen, lopende en onbekende resultaten kunnen PASS niet vaststellen. Een geldige classificatie voor alleen documenten of alleen voor catalogi kan ervoor zorgen dat een codestrook niet van toepassing is; een gewoon ontwerp- PR is geen geaccepteerde kandidaat. Een `hotfix` label doet geen afstand van bewijs.

Beide workflows omvatten PRs in main/release filialen, pushes naar `main`, handmatige verzending en samenvoegingsgroepsgebeurtenissen. Push, dispatch en merge-group voeren de volledige selectie uit. Een vertrouwd Mergify-wachtrijconcept voert ook toepasselijke `full-code`/`full-code-e2e` taken uit; gewone PRs sla ze over. Voer vóór een handmatige samenvoeging een volledige verzending uit voor de exacte kandidaat. Pushs naar `release/**` starten deze workflows niet; Release-Green observeert de samengevoegde basis afzonderlijk (`docs/ops/RUNNER_BOX.md` → Hosted Lane). Forks en merge-groepen gebruiken gehoste hardlopers voor taken die anders zelf-gehoste hardlopers selecteren; Er moet vóór de uitrol voldoende gehoste capaciteit worden geverifieerd.

Elke JSON -bon identificeert de uitgecheckte SHA, de workflowrun en de poging. De CLI wijst een checkout/event SHA mismatch af. Workflowtests binden het beleidslidmaatschap aan de `needs` lijst van de vonnistaak, zodat een nieuwe of verwijderde rij niet stilletjes kan verdwijnen. De bonnen hebben betrekking op hun eigen workflow, niet op de publicatie, implementatie of op de interne onderdelen van een bestaande adviesscanner. Het maken van de toepasselijke controles die vereist zijn in het filiaalreglement is een aparte administratieve wijziging; het definiëren van hun taken beschermt op zichzelf niet een branche.

`API Route Typecheck` is een onafhankelijke workflowcontrole, buiten zowel de verzamelde uitspraken als het statische profiel van de lokale volledige waarnemer. Bekijk het resultaat afzonderlijk voor de exacte kandidaat. `.github/workflows/api-route-typecheck.yml` draait op PRs in `main` of `release/**`, pusht naar een vertakkingsfamilie, handmatige verzending en `merge_group` gebeurtenissen van het type `checks_requested`. Er is geen padfilter. Groepen samenvoegen, bekijk `merge_group.head_sha`; andere evenementen bekijk `github.sha`. Alle gebeurtenissen gebruiken dezelfde API -diagnostische poort- en poorteenheidtests. PR basisretargets vragen om een nieuwe controle; body/title bewerkingen gebruiken de naam `Admission not requested / API Route Typecheck` voor alleen observatie en kunnen de toelatingscontrole niet vervangen.

### Bewaard bewijs in de acceptatiereducer

`scripts/quality/validate-release-acceptance.mjs` reduceert een aangeleverd plan en de bijbehorende
manifesten; het stelt niet vast dat het plan de volledige releasepipeline dekt.
De rapporten stellen `releaseAcceptance: false` expliciet in, zelfs wanneer dat plan
`VERIFIED` is. De workflow `release-acceptance.yml` gebruikt nog steeds schaduwfixtures, geen
echte ontvangstbewijzen voor build, packaging, opstarten of promotie.

De CLI vereist `--evidence-root` om bewaard bewijs te verifiëren. Bestanden worden herleid
als `<evidence-root>/<artifact_id>/<member>` en gehasht met SHA-256. Een PASS-record
zonder bewijs, een ontbrekend of gewijzigd bestand, een onveilig pad of een symbolische koppeling verhindert
verificatie. Ontbrekende bestanden zijn niet gelijkwaardig aan lege, geslaagde logs. Bestaande
controles van SHA/uitvoering/poging blijven onafhankelijk: overeenkomende bytes kunnen een verouderd
ontvangstbewijs niet redden. Bestandsintegriteit is geen bewijs voor de authenticiteit van de uitvoering of de promotie van artefacten.

### DAST gebruikt de geverifieerde CI-build

De verplichte CI-job `dast-smoke` roept `.github/workflows/dast-smoke.yml` aan na `build`. Hij volgt dezelfde code-/conceptselectie als de build, inclusief ondersteunde fork-PR's, PR's naar een releasebranch en mergegroepen. Een ontbrekende, mislukte, geannuleerde of onverwacht overgeslagen DAST-job blokkeert `Gate / CI`. De herbruikbare workflow heeft geen zelfstandige PR-/dispatchtrigger; handmatige validatie gebruikt de dispatch van CI zodat build en afnemer in één run blijven.

`scripts/ci/next-build-provenance.mjs` verzegelt het volledige Next-artifact met de tar-digest, repository/event/run, poging van de producer, head/base/checkout/tree, workflow-identiteiten, lockfile, exacte Node-versie/ABI, platform en bundler. DAST kiest de onveranderlijke artifact-ID uit `needs.build.outputs`, vereist verificatie van de download-digest en hasht de ZIP zelfstandig tegen de digest van de producer voordat de twee toegelaten onderdelen worden uitgepakt via `scripts/ci/unpack-ci-build.py`. Manifest en tar-archief moeten ook overeenkomen met onafhankelijke produceroutputs voordat de Next-tree wordt uitgepakt. Er wordt nooit naar de laatste geslaagde branchbuild gezocht. Een gedeeltelijke heruitvoering mag dezelfde producerpoging hergebruiken wanneer de ID en alle invoer nog overeenkomen; het bewijsrecord legt beide pogingen vast.

De afnemer blijft op een gehoste Linux-runner met alleen leestoegang tot de repository en zonder repositorygeheimen. Hij installeert de exacte Node-versie van de producer en stelt vervolgens de CLI samen met `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` weigert een ontbrekende standalone-server vóór een eventuele fallbackbuild; normale lokale CLI-builds behouden hun bestaande fallback. Servergereedheid, Schemathesis en promptfoo moeten allemaal slagen binnen de ongewijzigde joblimiet van 25 minuten. Een herkomstbewijs bewijst de identiteit en bytes van de invoer, geen geslaagde DAST-scan. Een verlopen artifact, onderbroken runner of mislukte scanner blijft onvolledig of mislukt bewijs; een advisory-wrapper kan er geen PASS van maken.

### UI-uitvoeringscapaciteit

CI voert de volledige UI-inventaris uit als vier `test-vitest`-matrixshards, elk met maximaal
twee workers per shard en de bestaande jobdeadline van 15 minuten. De eerste shard voert ook de
MCP/autoCombo Vitest-suite uit. Het vereiste jobresultaat omvat elke matrixvariant; het mislukken
of annuleren van één shard kan de toelating van een kandidaat niet aantonen.

De nachtelijke observer bewaart een afzonderlijk ontvangstbewijs voor de exacte kandidaat voor elke UI-shard,
inclusief de MCP-uitvoering in het eerste ontvangstbewijs. Alle vier de ontvangstbewijzen, logs en overeenkomende
uitvoeringsidentiteiten zijn vereist. Lokaal selecteert `npm run test:vitest:ui` nog steeds de
volledige suite; één uitvoering met `--shard` is slechts gedeeltelijk bewijs.

### Verzameling van unitdekking

De twaalf unit-shards verzamelen V8-dekking tijdens hun bestaande testuitvoering. Een geslaagde
shard voert `scripts/ci/compact-v8-coverage.mjs` uit om de oorspronkelijke bestanden te comprimeren zonder
een tussentijds Istanbul-rapport te genereren. De uiteindelijke Coverage-job verifieert alle twaalf manifesten aan de hand van
de kandidaat-SHA, runtime, bronroot en datahashes, en voert vervolgens de reporters van c8 en de bestaande
dekkingsdrempels uit. Invoer behoudt de globale bestandsnaamvolgorde van c8; vooraf samenvoegen per shard is onveilig
voor gemengde functie-/blokdekking. Ontbrekende, onjuist gevormde of incompatibele shards doen de toelating mislukken.
Mislukte testshards bewaren onbewerkte diagnostische dekking afzonderlijk; deze kan niet in de uiteindelijke samenvoeging worden opgenomen.

### Voortgangsregistraties voor de uitvoering van unittests

De gedeelde opdracht `test:unit:ci:shard` registreert de fasen `primary`, `dashboard` en `serial`
via `scripts/ci/unit-progress-reporter.mjs`. Het normale testrapport blijft
beschikbaar. Een afzonderlijke registratie met alleen metadata legt de start en voltooiing
van elk bestand vast, en een heartbeat van 30 seconden vermeldt de bestanden die nog actief
zijn en hun verstreken tijd. Alleen uitvoeringsmetadata op de allowlist wordt geregistreerd;
testbeschrijvingen, uitvoer, foutdetails en de volledige omgeving worden niet geserialiseerd.

CI bewaart de JSONL-bestanden als `unit-progress-ci-<run>-<attempt>-<shard>`. Een time-out van een job kan de latere upload
verhinderen; reeds verzonden heartbeats blijven bruikbaar als diagnostisch bewijs. Ontbrekende
heartbeats kunnen ook wijzen op een geblokkeerd of beëindigd runnerproces. Deze registraties
behouden de bestaande testselectie, gelijktijdigheid, deadlines en afsluitstatus; het zijn
geen beslissingen over de toelating van kandidaten.

### Inventaris van statische scans

De versiegebonden inventaris van npm-aliassen en het lidmaatschap van statische scans bevinden zich in
`config/quality/gate-manifest.json`. Voer `npm run check:gate-manifest` uit om
scriptnamen en exacte opdrachten te valideren aan de hand van `package.json`; toevoegingen, verwijderingen en
opdrachtafwijkingen doen zowel de lokale hook als de wijzigingsclassificatiejobs in CI mislukken.
Een alias is geen workflowjob, matrixinstantie of testcase: deze aantallen mogen
niet als onderling uitwisselbaar worden gepresenteerd.

Gebruik `npm run quality:scan -- --list` of `npm run quality:scan:fast -- --list`
om de geselecteerde aliassen te inspecteren zonder ze uit te voeren. De runner roept het
npm-entrypoint aan, zodat de runtime ervan (inclusief Bun waar geconfigureerd) behouden blijft.
Het manifest registreert aliassen buiten die profielen als afzonderlijk aangeroepen, en
onderhoudsopdrachten zijn verboden in alleen-lezen-scanprofielen.

Deze profielen dekken alleen de statische scan. Ze certificeren geen producttests,
dekking, packaging, externe controles of de volledige releaseacceptatie van een kandidaat.
Workflowtoelating gebruikt het gekoppelde `config/quality/admission-policy.json` en
`scripts/quality/admission-verdict.mjs`. Release-observer-profielen blijven afzonderlijk;
inspecteer hun toepasselijke controles en ontvangstbewijzen onafhankelijk. De statische
opdrachten van de volledige observer zijn gedeclareerd in `config/quality/release-green-static-profile.json`, waaronder
`audit:deps`, selectie van mutatietests en vertaalcontroles. De loader valideert npm-
opdrachten aan de hand van package.json en gemodelleerde CI-/Quality-declaraties; deze wijst afwijkingen af
in plaats van shelltokens als argumenten uit te voeren. Vereiste scanneruitvoer met SKIP/INCOMPLETE
kan geen PASS aantonen. Het profiel registreert zijn externe uitsluitingen en vervangt geen
gehoste dekking, testmatrices, package- of implementatiebewijs. De onderstaande tekstinventaris
is een referentie, geen bewijs dat een gate daadwerkelijk is uitgevoerd.

Scripts bevinden zich onder `scripts/check/` (beleidsgates) en `scripts/quality/` (ratchet-engine).
De gezaghebbende CI-bron is `.github/workflows/ci.yml`.

### Gezondheid van de gepubliceerde documentatie

`.github/workflows/i18n-base-health.yml` observeert de status van de documentatie na geselecteerde push-ups naar `main` en `release/v*` en bij handmatige verzending. De filters omvatten documentatie, root Markdown, `llm.txt`, vertaling state/configuration en de relevante i18n-tooling. De enkele `Published base documentation health` taak maakt gebruik van gehoste Ubuntu en een deadline van vijf minuten. Het voert alleen-lezen-validatie uit en schrijft een diagnostisch ontvangstbewijs zonder een afhankelijkheidsinstallatie, vertaling of statusacceptatie.

`scripts/i18n/check-base-health.mjs` vereist geen inconsistenties in de bron-hash, ontbrekend doel, doel-hash, verouderde vertaling en sectie-cache. Het valideert ook de huidige kern document/locale scope en de geregistreerde herkomst ervan. Ongeldige context, onvolledige dekking of een onderbroken checker levert `INCOMPLETE` op; bevestigde drift produceert `FAIL`. Beide retourneren een mislukte afsluitstatus. De kassabon is gebonden aan de kassa SHA, workflow, uitvoering en poging, en wordt bewaard als `i18n-base-health-<sha>-<run>-<attempt>`.

Dit is een onafhankelijke observatie van de gepubliceerde basis. Er wordt geen PR of samenvoeggroepgebeurtenis, een vereiste PR controle, een NPM-alias of een profiellid met een statische scan toegevoegd. De onderliggende checker blokkeert ook alle vijf klassen in de absolute modus. De gewone PR voorbereiding staat los van de opname. Een succesvolle upload kan een mislukt gezondheidsresultaat niet omzetten in PASS.

Een gewone PR gebruikt `--preflight` met een basisrapport gegenereerd door `--baseline-evidence`. Het kan zijn dat een Engelse bron alleen in behandeling blijft als het volledige vertaalrecord en de daadwerkelijke doelbytes onveranderd zijn ten opzichte van die exacte basis. Nieuwe inconsistenties in doel- of sectie-cache blokkeren nog steeds, en onvolledig bewijs kan voorbereiding niet toestaan. Het rapport legt `preparationPending` en `mergeReady` afzonderlijk bloot: een succesvolle voorbereiding zorgt er niet voor dat vertalingen die in behandeling zijn, gereed zijn om samen te voegen. Vernieuw de betreffende spiegels in de samengestelde kandidaat vóór toelating. De vertrouwde Mergify-wachtrijkandidaat, `merge_group`, branch pushes en handmatige CI -runs gebruiken de absolute checker, zonder `--warn` of vergeving van erfelijke fouten. Ontbrekende doel-hashes en een omvang die wordt verkleind door verwijderde opgenomen kernbestanden kunnen geen succesvol absoluut oordeel opleveren.

### Vrijgave PR fast-path (`quality.yml`)

`.github/workflows/quality.yml` is een aanvulling op CI op main/release PRs, pusht naar `main`, verzendt en voegt groepen samen. PRs gebruikt padgefilterde snelle controles. De permanent uitgeschakelde dubbele build is verwijderd; de echte build/package/boot -cheques blijven in CI.

| Functie                                          | Domein                                                                                                                                                                                                                                                  | Blokkeren            |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs en docs-all                                                                                                                                                                                                                | Ja                   |
| `Fast Quality Gates`                             | Code PRs; statische controles, typecontrole, dashboardtypecontrole, beïnvloede unit-tests                                                                                                                                                               | Ja                   |
| `Forgotten sibling tests`                        | Code PRs; gewijzigde modules die zijn herleid tot statische consumenten en kandidaat-broer-/zustests; vat- en dynamische importpaden worden gerapporteerd als adviserende diagnostiek, met uitzonderingen waarnaar wordt verwezen op de toelatingslijst | **Adviserend**       |
| `No new ESLint warnings`                         | Code PRs; onderdrukkingsbewuste pluisjesbeschermer                                                                                                                                                                                                      | Ja, inclusief vorken |
| `Merge integrity (changelog + generated skills)` | Niet-concept PRs; changelog en gegenereerde vaardigheidssynchronisatie                                                                                                                                                                                  | Ja, inclusief vorken |

#### Vergeten broer-zustestrapport

`npm run check:forgotten-sibling-tests` hergebruikt de importresolver achter de test-impactkaart. Voor elke gewijzigde productiemodule rapporteert het deterministische `changed module/symbol -> static consumer -> candidate sibling test` ketens wanneer de kandidaattest afwezig is in het pull-request diff. Het Markdown-samenvatting en JSON resultaat worden behouden als het `forgotten-sibling-tests` -workflowartefact voor kalibratie voordat er een blokkering wordt uitgerold.

De wederuitvoer van vaten en de dynamische import zijn slechts oplossingsdiagnostiek; ze creëren nooit een blokkerende bevinding. Reviewed exceptions live in `config/quality/forgotten-sibling-allowlist.json`. Elke inzending moet de consumenten- en kandidaattest een naam geven, een specifieke reden geven en een GitHub probleem of pull-verzoek koppelen. Verkeerd opgemaakte vermeldingen kunnen niet worden gesloten. Uitzonderingen kunnen een verwijderde kandidaattest of een diff die `.skip`/`.todo` toevoegt niet onderdrukken; beweringverzwakking en andere maskering blijven eigendom van de onafhankelijk blokkerende `check:test-masking` poort.

### Taak: `lint`

Wordt uitgevoerd bij elke PR naar `main`. Blokkeert samenvoegen bij een fout.

| Script (`npm run ...`)            | Valideert                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Blokkerend                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| `check:node-runtime`              | De Node.js-versie valt binnen het ondersteunde bereik                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                          |
| `check:cycles`                    | Circulaire imports in heel `src/` + `open-sse/` (op AST gebaseerd, `paths` uit tsconfig worden opgelost). De kale opdracht sluit af met code 1 wanneer er een cyclus bestaat (fail-closed sinds #15281) en vermeldt de SCC's. `check:cycles:ratchet` (wat CI uitvoert) blokkeert wanneer het aantal het plafond van `metrics.cycles` in `quality-baseline.json` overschrijdt — momenteel 14, `direction: down`, dus het kan alleen dalen (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ja (ratchet)                                |
| `check:boundary`                  | `open-sse → src`-koppeling: unieke imports van bestand naar bestand vanuit de engine naar de app (`scripts/quality/measure-boundary.mjs`; de lijst met verbindingen is de backlog voor de v4-herstelwerkzaamheden rond de opsplitsing van de kern en modules). Kale opdracht = adviserend rapport (hetzelfde als `quality:boundary`). `check:boundary:ratchet` (wat CI uitvoert, en dat ook deel uitmaakt van de ratchet-lus voor snelle controles in `quality.yml`) blokkeert wanneer het aantal het plafond van `metrics.boundaryOpenSseToSrc` in `quality-baseline.json` overschrijdt — ingesteld op de gemeten waarde 771, `direction: down`; `--update` verlaagt dit alleen; relatief ten opzichte van de basis bij PR's (`--base-ref`, zie hieronder)                                                                                                                                                                                                                                                                                                                                                                                                  | Ja (ratchet)                                |
| `check:route-validation:t06`      | Zod-schema's aanwezig op alle routes (Tier 6-beleid)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                          |
| `check:any-budget:t11`            | Aantal `@ts-expect-error // any` overschrijdt het budget niet (Tier 11-catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ja                                          |
| `check:provider-consistency`      | Elke provider in `providers.ts` heeft een overeenkomstige vermelding in `providerRegistry.ts` (en omgekeerd, binnen de allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                          |
| `check:model-lifecycle`           | De drie handmatig onderhouden routeringstabellen blijven consistent met de ingecheckte levenscyclussnapshot (#11503): `FITNESS_TABLE` (`taskFitness.ts`) geeft geen score aan een uitgefaseerde id die door `REGISTRY` kan worden gerouteerd; elk doel van `BUILT_IN_ALIASES` is aanwezig in `REGISTRY` en afwezig in de snapshot met uitgefaseerde id's; elke uitgefaseerde id die nog in `REGISTRY` staat, wordt doorgestuurd of vermeld in `allowedRetiredInCatalog`; en geen enkele bron of geen enkel doel van `DEFAULT_DEGRADATION_MAP` wordt in die snapshot als uitgefaseerd weergegeven. Dit bewijst niet dat een model momenteel door een live upstream wordt aangeboden. Offline — vergelijkt met `config/quality/model-lifecycle.json`, handmatig vernieuwd met `npm run quality:refresh-model-lifecycle` (netwerk; niet geïntegreerd in CI). `allowedRetiredInCatalog` is een geleidelijk afbouwende ratel: voeg alleen een vermelding toe met een trackingissue.                                                                                                                                                                               | Ja                                          |
| `check:fetch-targets`             | Elke `fetch("/api/...")` in de client-side `src/` verwijst naar een echte `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                          |
| `check:deps`                      | Alle via `npm install` installeerbare afhankelijkheden in elke `package.json` in de repository staan in `dependency-allowlist.json`; nieuwe niet-vastgezette pakketten of pakketten met slopsquatting worden gemarkeerd                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja                                          |
| `audit:deps`                      | npm-audit van alle vijf onafhankelijke lockfiles (root, Electron, OpenCode-plugins v1/v2 en provider). Kritieke adviezen blokkeren; adviezen met hoge ernst blijven zichtbare waarschuwingen. Ontbrekende/mislukte audits zijn INCOMPLETE en blokkeren; lock-hashes en rapporten per scope worden bewaard.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                          |
| `check:lockfile`                  | Integriteit van `package-lock.json` — https-register, integriteitshashes, geen hostoverschrijvingen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                          |
| `check:licenses`                  | SPDX-licentietoelatingslijst voor productieafhankelijkheden                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ja                                          |
| `check:tracked-artifacts`         | Geen buildartefacten / vastgelegde `node_modules`-symbolische koppelingen (wordt ook uitgevoerd in de husky-pre-commit-hook; pre-push is bewust licht — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                          |
| `check:ai-attribution`            | Geen AI-/bot-`Co-Authored-By`-trailer of door AI gegenereerde voettekst in PR-commits, titel of beschrijving — harde regel #16 (in de fast-gates-lus van `quality.yml` voor PR→`release/**` — leest de eventpayload, doet niets buiten PR's — en een stap die alleen voor PR's wordt uitgevoerd in de lint van `ci.yml` voor PR→`main`; ook de husky-`commit-msg`-hook; menselijke coauteurs toegestaan; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:vitest-exclusions`         | Elke Vitest-uitsluiting vermeldt een trackingissue en komt voor in `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                          |
| `check:file-size`                 | Bronbestanden (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) blijven binnen `cap` en testbestanden (`*.test.ts(x)`) binnen `testCap`; bestanden die zijn bevroren in `file-size-baseline.json` (`frozen` / `testFrozen`) mogen niet groter worden dan hun vastgelegde grootte                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                          |
| `check:error-helper`              | Foutresponses in executors/handlers gebruiken `buildErrorBody()` / `sanitizeErrorMessage()` (Harde regel #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ja                                          |
| `check:migration-numbering`       | SQL-migratiebestanden zijn opeenvolgend genummerd, zonder hiaten of duplicaten                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                          |
| `check:public-creds`              | Geen letterlijke OAuth-waarden voor `client_id`/`client_secret` of Firebase Web-sleutels buiten `publicCreds.ts` (Harde regel #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                          |
| `check:db-rules`                  | Geen onbewerkte SQL buiten modules in `src/lib/db/`; geen barrel-imports uit `localDb.ts` (Harde regels #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                          |
| `check:known-symbols`             | Provider-executors, routeringsstrategieën en translators die in hun dispatch-tabellen zijn geregistreerd, komen overeen met de bestanden op schijf — geen verweesde of niet-gedeclareerde symbolen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                          |
| `check:route-guard-membership`    | Elke route die een childproces start, is geclassificeerd door `isLocalOnlyPath()` (Harde regels #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                          |
| `check:test-discovery`            | Elk `*.test.ts`- / `*.spec.ts`-bestand in de repo wordt door ten minste één testrunner verzameld (ratelmechanisme: de lijst met verweesde bestanden in `test-discovery-baseline.json` kan alleen kleiner worden)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                          |
| `check:test-tla-order`            | Geen enkel `node:test`-bestand onder `tests/unit` registreert een test, bereikt vervolgens een `await` op het hoogste niveau en registreert daarna nog meer tests (#18045; ratelmechanisme: `test-tla-order-allowlist.json` kan alleen kleiner worden)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ja                                          |
| `check:agent-skills-sync`         | Gegenereerde agent-skills-artefacten komen overeen met hun broncatalogus (geen afwijkingen)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:provider-asset-provenance` | Logo's/assets van providers hebben een vastgelegde herkomstvermelding                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `lint:json`                       | JSON-configuratiebestanden kunnen worden geparseerd en voldoen aan de lintregels van de repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `typecheck:core`                  | TypeScript-compilatie zonder fouten (alleen informatieve waarschuwingen)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                          |
| `typecheck:noimplicit:core`       | Strikte `noImplicitAny` — toekomstgericht; veel reeds bestaande aanroeplocaties moeten nog van annotaties worden voorzien                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | **Informatief** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` beperkt tot `src/app/(dashboard)/**` (#7033) — de zorgvuldig samengestelde toelatingslijst van 27 bestanden van `typecheck:core` bevat geen enkele dashboard-TSX, en `next build` voert er evenmin typecontrole op uit (`next.config.mjs` stelt `ignoreBuildErrors: true` in), waardoor regressies met verweesde identifiers daar (#6625/#6909) onzichtbaar waren voor CI. Vergelijkt verschillen met een bevroren basislijn voor het aantal fouten per bestand en per TS-code (`config/quality/dashboard-typecheck-baseline.json`, hetzelfde patroon voor afdwinging van veroudering als bij `check:known-symbols`) — alleen NIEUWE fouten boven het aantal in de basislijn laten de controle mislukken; verlaag de drempel met `--update` wanneer een reeds bestaande fout is opgelost.                                                                                                                                                                                                                                                                                                                                                              | Ja                                          |
| `check:build-typecheck`           | Typecontrole van de volledige productie-app via `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`); de oppervlakte die door de allowlist van 27 bestanden van `typecheck:core` en de dashboard-gate wordt gedekt, valt hier niet onder. Verschillen ten opzichte van `config/quality/build-typecheck-baseline.json`; een nieuwe of verhoogde telling per (bestand, code) laat de controle mislukken, een lagere telling vraagt je om de baseline te verlagen. `--update` wordt geweigerd zolang de run een nieuw of verhoogd paar bevat, tenzij `--force-regressions` is opgegeven, en weigert een nieuw onderdrukt bestand tenzij `--force-nocheck` is opgegeven. Zo zijn het verruimen van de baseline om een groene status te krijgen en het toekennen van een permanente onderdrukking twee afzonderlijke, bewuste handelingen. Een losse `--force` wordt afgewezen. Scant het bouwbereik ook op `@ts-nocheck` aan de hand van `config/quality/ts-nocheck-baseline.json`, omdat een bestand dat dit gebruikt helemaal geen diagnostische meldingen rapporteert en anders onzichtbaar zou zijn voor elke gate. | Ja                                          |

#### Twee typecheck-programma's geven verschillende antwoorden

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) en `check:build-typecheck` compileren verschillende programma's
met verschillende opties, en hetzelfde bestand kan in het ene programma schoon zijn en
in het andere vol fouten staan.

`tsconfig.build.json` stelt `"strict": false` in, waardoor `noImplicitAny` is uitgeschakeld. De core-configuratie compileert een samengestelde allowlist van 27 bestanden met strengere opties en volgt de importgrafiek van elk item, zodat bestanden die nooit in het buildprogramma voorkomen daar toch worden gecontroleerd.

De consequentie is belangrijk bij het beoordelen of een bestand getypeerd is: **nul diagnostische meldingen
onder `check:build-typecheck` betekent niet nul**. Het verwijderen van `@ts-nocheck` uit 26
bestanden liet zien dat er 23 daarvan schoon waren in het buildprogramma; bij zestien
daarvan kwamen ongeveer 120 implicit-any-fouten naar voren in het strikte programma. Controleer beide voordat je een bestand schoon noemt.

### Taak: `quality-gate`

Wordt uitgevoerd na `test-coverage`. Blokkeert samenvoegen bij een fout.

| Script                       | Valideert                                                                                                                                                                             | Blokkerend                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `quality:collect`            | Genereert `quality-metrics.json` (aantal ESLint-waarschuwingen, dekking uit het samengevoegde shardrapport)                                                                           | Ja (voorafgaand aan het ratelmechanisme) |
| `quality:ratchet`            | Geen enkele metriek in `quality-baseline.json` is verslechterd (ESLint-waarschuwingen ≤ basislijn; dekking ≥ basislijn)                                                               | Ja                                       |
| `check:duplication`          | Codeduplicatie (jscpd@4) overschrijdt de basislijn in `quality-baseline.json` niet                                                                                                    | Ja                                       |
| `check:complexity`           | Cyclomatische complexiteit op bestandsniveau overschrijdt de limiet niet (ESLint-kernregels `complexity` + `max-lines-per-function`)                                                  | Ja                                       |
| `check:cognitive-complexity` | Ratelmechanisme voor cognitieve complexiteit (`eslint-plugin-sonarjs`) — afzonderlijke ESLint-uitvoering; CI voert beide samengevoegd uit als de ene stap `check:complexity-ratchets` | Ja                                       |
| `check:dead-code`            | Het ratelmechanisme voor ongebruikte exports/bestanden (knip) verslechtert niet ten opzichte van de basislijn                                                                         | Ja                                       |
| `check:compression-budget`   | Budget voor compressiebenchmarks — minimale tokenbesparingen per engine mogen niet verslechteren                                                                                      | Ja                                       |
| `check:type-coverage`        | Het ratelmechanisme voor het percentage getypeerde code (`type-coverage`) verslechtert niet; omvat `typecheck:noimplicit:core` grotendeels                                            | Ja                                       |

### Jobs: `codeql-scan` en `codeql-admission`

`codeql-scan` produceert alle geconfigureerde analysecategorieën. Nadat die job slaagt, valideert `codeql-admission` de exacte uploads en de waarschuwingsratchet van de kandidaat. Beide zijn verplichte afhankelijkheden van `Gate / CI`, ook voor kandidaten met uitsluitend documentatie. De eisen voor administratieve activering en canary staan hieronder bij "CodeQL-ratchet".

| Script                 | Valideert                                                                                                                                                                                                             | Blokkerend |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:codeql-ratchet` | Kandidaatref/SHA en alle geconfigureerde analysecategorieën moeten actueel zijn vóór de waarschuwingsratchet; ontbrekend bewijs blokkeert. De globale inventaris blijft afzonderlijk — zie "CodeQL-ratchet" hieronder | Ja         |

### Taak: `quality-extended`

De taak blokkeert kandidaten waarop deze van toepassing is. Bundelgrootte, gevonden geheimen, gevonden kwetsbaarheden,
workflowbevindingen en OpenAPI-wijzigingen worden gecontroleerd met verplichte ratelmechanismen.
Diagnostiek voor circulaire afhankelijkheden blijft adviserend. Installatie van scanners is verplicht:
`scripts/ci/install-quality-scanners.sh` installeert vastgezette versies en geeft
installatiefouten door. Ontbrekende hulpmiddelen, ongeldige rapporten of ontbrekende basislijnen laten
de verplichte scannercontrole ONVOLTOOID.

| Script                   | Valideert                                                                                                                                                                                                                              | Blokkerend                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `check:circular-deps`    | Geen circulaire afhankelijkheden (dpdm)                                                                                                                                                                                                | **Adviserend**                                     |
| `check:bundle-size`      | Bundelgrootte overschrijdt de limiet niet; een niet-beschikbare meting leidt tot een fout                                                                                                                                              | **Blokkerend met --ratchet**                       |
| `check:secrets`          | Gitleaks-bevindingen verslechteren niet; verplichte scans weigeren ontbrekende tools/bron/baseline, mislukte scans en ongeldige rapporten                                                                                              | **Blokkerend met --ratchet**                       |
| `check:vuln-ratchet`     | Kwetsbaarheden in afhankelijkheden verslechteren niet; verplichte scans weigeren ontbrekende tools, ongeldige rapporten of ontbrekende baselines                                                                                       | **Blokkerend met --ratchet**                       |
| `check:workflows`        | Workflow-linting (actionlint + zizmor); ontbrekende/defecte scanners, ongeldige rapporten of een ontbrekende ratchet-baseline leiden tot INCOMPLETE. Geldige bevindingen volgen het geselecteerde strikte/adviserende/ratchet-beleid   | Uitvoering vereist; zizmor-ratchet blokkeert in CI |
| `check:openapi-breaking` | Publiek API-contract ten opzichte van vastgezette event-commits (merge-base van PR, vorige commit bij push, basis van mergegroep; bij geplande/handmatige uitvoering eerste parent van checkout); een verplichte meting faalt gesloten | **Blokkerend met --ratchet**                       |

### Functie: `docs-sync-strict`

Voor pull-aanvragen naar `main` of `release/**` wordt deze taak alleen uitgevoerd voor niet-conceptkandidaten (of vertrouwde wachtrij) die zijn geclassificeerd als documentatie- of codewijzigingen. Het draait ook op niet-PR CI evenementen; De push-trigger van deze workflow heeft alleen betrekking op `main`, niet `release/**`. Een stap die niet nul is, blokkeert de taak; bevindingen die alleen gerapporteerd worden en de onderstaande gedocumenteerde uitzonderingen zijn dat niet.

| Script                         | Valideert                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Blokkerend                                                                                                                                 |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `check:docs-all`               | Metapoort die de 7 onderstaande subpoorten achtereenvolgens uitvoert                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                                                                                                                         |
| ↳ `check:docs-sync`            | Consistentie van Package/OpenAPI/CHANGELOG versie, exacte `llm.txt` spiegels, vertaalde CHANGELOG section/size invarianten en afwezigheid van verouderde dubbele documenten                                                                                                                                                                                                                                                                                                                                 | Ja                                                                                                                                         |
| ↳ `check:docs-frontmatter`     | Samengestelde documentatiepagina's bevatten geldige frontmatter-titels                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja                                                                                                                                         |
| ↳ `check:docs-counts`          | Telinvarianten met een hoog vertrouwen zijn strikt; heuristische controles op het aantal bestanden waarschuwen alleen tenzij het script `--strict` ontvangt (de CI -metapoort passeert dit niet)                                                                                                                                                                                                                                                                                                            | Strikte niveaublokkering; advies op zacht niveau                                                                                           |
| ↳ `check:env-doc-sync`         | Bron-env-lezingen, `.env.example` en `docs/reference/ENVIRONMENT.md` komen overeen na de expliciete acceptatielijsten voor negeren, alleen doc en alleen env                                                                                                                                                                                                                                                                                                                                                | Ja, buiten de gedocumenteerde toelatingslijsten                                                                                            |
| ↳ `check:deprecated-versions`  | Rapporteert mogelijk verouderde versies buiten veilige historische contexten en verouderde updatedatums, met uitzondering van genegeerde documenten                                                                                                                                                                                                                                                                                                                                                         | Advies bij huidige CI -bedrading (`--strict` is niet geslaagd)                                                                             |
| ↳ `check:doc-links`            | Interne prijsverlagingslinks in documenten worden omgezet in echte bestanden (`[text]`/`(path)` -formulier)                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                                                                                                                         |
| ↳ `check:fabricated-docs`      | Routes, env vars, CLI -opdrachten, hook-namen en bestandspaden die in documenten worden genoemd, bestaan in de codebase. Harde poort via `--strict`; soft-fail zonder vlag.                                                                                                                                                                                                                                                                                                                                 | Ja (via `--strict` in CI)                                                                                                                  |
| `check:cli-i18n`               | De in de CLI gebruikte `t()`-sleutels bestaan in `en`; `pt-BR` behoudt elke sectie op het hoogste niveau; `zh-CN` en `zh-TW` bevatten elke sleutel uit `en`                                                                                                                                                                                                                                                                                                                                                 | Ja                                                                                                                                         |
| `check:openapi-coverage`       | OpenAPI-specificatie dekt ten minste een via ratcheting vastgelegde ondergrens van werkelijke routes                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                                                                                                                         |
| `check:openapi-security-tiers` | Gedeclareerde annotaties `x-loopback-only`/`x-always-protected` moeten door `routeGuard.ts` worden ondersteund; parserfouten en afwijkingen bij de voorwaartse controle blokkeren. De omgekeerde controle op ontbrekende `x-loopback-only` onder prefixen voor uitsluitend lokale toegang geeft waarschuwingen, en routes die alleen door een patroon zijn gedefinieerd, worden van die omgekeerde controle uitgesloten.                                                                                    | Parsercontroles en voorwaartse controles blokkeren; de omgekeerde controle is adviserend                                                   |
| `check:openapi-routes`         | Elk `/api...`-pad in `openapi.yaml` komt ongeacht de parameters overeen met een bestaande route na toepassing van de gemotiveerde uitzonderingslijst `KNOWN_STALE_SPEC`; verouderde lijstitems veroorzaken ook een fout                                                                                                                                                                                                                                                                                     | Ja                                                                                                                                         |
| `check:docs-symbols`           | Interne `/api/...`-URL-verwijzingen in canonieke documenten die geen spiegelkopieën zijn, verwijzen naar een bestaande route of routefamilie; verwijzingen naar proxy/upstream/plaatsaanduidingen/bestanden en gemotiveerde items in `KNOWN_STALE_DOC_REFS` zijn uitgesloten, en verouderde items in de uitzonderingslijst veroorzaken een fout                                                                                                                                                             | Ja                                                                                                                                         |
| `i18n translation drift`       | Voor absolute toelating zijn geen inconsistenties in de bron, ontbrekend doel, doel-hash, verouderde vertaling en sectie-cache vereist. Bij de gewone PR voorbereiding kan exact erfelijk bewijsmateriaal of een in behandeling zijnde wijziging in het Engels behouden blijven met ongewijzigde volledige status- en doelbytes; het rapport verklaart afzonderlijk de bereidheid tot fusie. Ontbrekende doel-hashes en onvolledig basisbewijsblok. Een ontbrekende cache voor oudere secties is geen fout. | Alle vijf de klassen blokkeren de toegang tot queue/base ; gewone voorbereiding staat alleen bewezen geërfd of alleen Engelstalig werk toe |

De twaalf README SVGs onder `docs/diagrams/` worden gegenereerd (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` regenereert ze allemaal). Elk heeft een byte-compare unit-test (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) die mislukt wanneer het vastgelegde bestand verouderd is, en `check:docs-counts` leest canonieke getallen van hun `<text>` knooppunten — Daarom houdt de schetsstap elke omlijnde string in het bestand als onzichtbare `<text>`. De SVG -controle op canonieke nummers leest de bestanden die zijn vermeld in `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` en `tier-flow-light.svg`; de claims voor gratis eeuwigheid, catalogusinvoer, terugkerende pool en scorefactoren luiden ook `promise-pillars.svg`, `free-tier-budget.svg` en `strategies-grid.svg`. `free-tier-budget.svg` haalt zijn cijfers uit de live cataloguslader, dus een wijziging in `FREE_MODEL_BUDGETS` of in de weergavenaam van een provider geeft CI rood totdat dat bestand opnieuw is gegenereerd.

### Job: `i18n-ui-coverage`

| Script                            | Valideert                                                                                                                                                                                                                   | Blokkerend     |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | Dekking van UI-i18n-sleutels is ≥ 65%                                                                                                                                                                                       | Ja             |
| `check-ui-value-drift` (inline)   | Een herschreven Engelse **waarde** laat geen verouderde vertaling achter                                                                                                                                                    | Ja             |
| `check-new-key-coverage` (inline) | Een **nieuwe** Engelse sleutel is in elke locale vertaald — een `__MISSING__:`-markering wordt afgewezen                                                                                                                    | Ja             |
| `check-translation-ratio`         | Verhouding van echte vertalingen per locale (identiek aan Engels / tijdelijke aanduiding / ontbrekende bladeren buiten de toelatingslijst) mag `config/quality/i18n-translation-baseline.json` + speling niet overschrijden | **Blokkerend** |

Vereist `fetch-depth: 0` — de waardedriftcontrole vergelijkt `en.json` met de samenvoegbasis.

#### `check-ui-value-drift` — controle op verouderde vertalingen

Detecteert de ene i18n-regressie die de andere controles structureel niet kunnen zien: een Engelse waarde
wordt herschreven en de vertalingen die van het _vorige_ Engels zijn afgeleid blijven staan, waardoor
niet-Engelstalige gebruikers overtuigend geformuleerde, maar inmiddels onjuiste tekst blijven lezen.

Dit is daadwerkelijk in productie terechtgekomen. `oauthModal.googleOAuthWarning` werd herschreven toen de Antigravity-
loginhelper werd toegevoegd (#5203); **39 van de 43 locales** behielden tekst die operators opdroeg om „de
volledige URL te kopiëren en hieronder te plakken” — een proces dat voor die provider niet kan worden voltooid. Dit bleef
onopgemerkt tot #8463, omdat:

- `sync-ui-keys` alleen sleutels aanvult die **ontbreken**, nooit sleutels die **verouderd** zijn;
- `check-ui-keys-coverage` de _aanwezigheid_ van sleutels telt, waardoor een verouderde vertaling als gedekt wordt beschouwd;
- `check-translation-drift` de documentatiespiegels in `docs/i18n/<locale>/**.md` bijhoudt —
  het leest nooit `src/i18n/messages/*.json`. Blokkerend in job `docs-sync-strict` sinds de
  hersynchronisatie van 2026-09: bewerk een kerndocument → `npm run i18n:run -- --files=<doc>` (per sectie, goedkoop).

**Diffbewust, niet gebaseerd op een baseline.** De controle vergelijkt `en.json` op de samenvoegbasis met de
werkboom; voor elke sleutel waarvan de Engelse waarde is gewijzigd, is elke locale die nog een
ongewijzigde vertaling bevat verouderd. Hiermee wordt bestaande schuld bewust **bevroren** — een diff
kan niet onthullen van welke oude Engelse tekst een reeds lang bestaande vertaling afkomstig is, dus beoordeelt
de controle alleen wat door de huidige wijziging wordt geraakt. Het alternatief (een hashbaseline per sleutel) zou
een gegenereerd bestand van circa 600 KB vereisen, drie keer zo groot als de grootste bestaande baseline, dat bij elke i18n-PR wijzigt.

Er zijn twee manieren om aan de controle te voldoen:

1. werk de betreffende vertalingen bij, of
2. stel ze in op `__MISSING__:<new english>` — tijdens runtime wordt dan het gecorrigeerde Engels weergegeven
   (`src/i18n/request.ts::deepMergeFallback`, #7258) en wordt de sleutel in de wachtrij voor vertaling geplaatst.

Als de **betekenis** van de tekenreeks is gewijzigd, geef dan de voorkeur aan **het hernoemen van de sleutel**: een nieuwe sleutel kan geen
verouderde vertaling overnemen. Dat is het patroon dat in #8463 is gebruikt.

```bash
npm run i18n:check-value-drift          # strikt (wat CI uitvoert)
npm run i18n:check-value-drift:warn     # alleen rapporteren
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

De controles op waardeafwijkingen en nieuwe sleutels gebruiken één onveranderlijke vergelijking uit
`scripts/i18n/resolve-ui-diff-base.mjs`. De workflow geeft dezelfde basis-, basis-tip- en
kandidaat-SHA's door aan beide controles. Uitvoeringen voor PR's/basiswijzigingen, pushes en merge-groepen gebruiken hun
gebeurteniscontext. Voor het dispatchen van een kandidaatbranch is de exacte openstaande PR of de expliciete
invoer `i18n_base_sha` vereist. Bij dispatch of geplande observatie van `main` of `release/vX.Y.Z`
zonder die invoer wordt de laatste commit vergeleken met diens eerste parent; dit is geen audit van
alle overgenomen vertalingsachterstand. Lokale aanroep vereist een expliciete vergelijkingsbasis,
bijvoorbeeld de bovenstaande opdracht `BASE_REF`.

Ontbrekende of dubbelzinnige vergelijkingscontext, een onleesbare of ongeldige vereiste catalogus en
een gewijzigde kandidaat resulteren in `INCOMPLETE` met afsluitcode **2**, ook in waarschuwingsmodus.
Catalogi worden gelezen met `scripts/i18n/read-ui-catalog.mjs`; leesfouten worden niet vervangen
door lege objecten. Noch een niet-beschikbare basis, noch onvolledige invoer leidt tot PASS.

### Taak: `i18n`

Volledige i18n-validatiematrix (één taak per locale). De volledige taak is adviserend.

| Script                          | Valideert                               | Blokkerend                                                        |
| ------------------------------- | --------------------------------------- | ----------------------------------------------------------------- |
| `validate_translation.py quick` | Volledigheid van vertalingen per locale | **Adviserend** (`continue-on-error: true` voor de volledige taak) |

### Taak: `pr-test-policy`

Wordt alleen uitgevoerd voor pull requests.

| Script                 | Valideert                                                                                                                                           | Blokkerend |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PR's die productiecode wijzigen in `src/`, `open-sse/`, `electron/` of `bin/` moeten tests bevatten of bijwerken (Harde regel #8)                   | Ja         |
| `check:test-masking`   | Gewijzigde testbestanden verlagen het nettoaantal assertions niet en voegen geen `assert.ok(true)`-tautologieën toe                                 | Ja         |
| `check:pr-evidence`    | De PR-beschrijving vermeldt test-/VPS-bewijs voor de wijziging (automatiseert Harde regel #18 door PR-tekst te doorzoeken — kwetsbaar, zie Backlog) | Ja         |

### Job: `test-vitest`

Vereist de classificatietaak `changes`. Toepasselijke matrixshards blokkeren het samenvoegen bij een fout.

| Suite            | Valideert                                                | Blokkerend                                                                                                                       |
| ---------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-server (110 tools), autoCombo, cache — vitest-runner | Ja                                                                                                                               |
| `test:vitest:ui` | UI-componenttests — vitest-runner                        | **Blokkerend** — reeds bestaande fouten worden expliciet uitgesloten in `vitest.config.ts`; nieuwe fouten laten de job mislukken |

### Nachtelijke workflows (gepland, adviserend)

Deze worden volgens een cron-schema uitgevoerd (en via `workflow_dispatch`), nooit voor PR's. Ze zijn allemaal adviserend.

| Workflow               | Valideert                                                                                                                                                                             | Blokkerend     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | fast-check-propertytests met een willekeurige seed en een hoog aantal uitvoeringen                                                                                                    | **Adviserend** |
| `nightly-resilience`   | controle op heapgroei, chaos-foutinjectie, k6-belastings-/duurtest                                                                                                                    | **Adviserend** |
| `nightly-llm-security` | promptfoo-injectiebeveiliging (blokkeermodus) + garak-probes (overgeslagen zonder providergeheim)                                                                                     | **Adviserend** |
| `nightly-schemathesis` | OpenAPI-contractfuzzing (schemathesis) tegen een actieve OmniRoute met `docs/openapi.yaml` — brengt specificatieschendingen / niet-afgehandelde 500-fouten aan het licht (Fase 8 B.4) | **Adviserend** |
| `nightly-mutation`     | Stryker-mutantentestscore voor het snelle unittraject — overlevende mutanten brengen zwakke asserts aan het licht                                                                     | **Adviserend** |
| `nightly-compat`       | compatibiliteitsmatrix voor de Node-engine voor de ondersteunde `engines.node`-bereiken                                                                                               | **Adviserend** |

Prestatiebaselines (heap, TTFB, bouwtijd) worden vastgelegd, maar niet als blokkerende voorwaarde gebruikt: zie [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Snelheidsfase (2026-08-30 → v4.0 LTS): elke basiswaarde met 20% versoepeld

Besluit van de eigenaar (2026-08-30): tot aan de modularisering in v4.0 is de snelheid van
opleveren belangrijker dan het bewaken van de technische schuld. Elke **numerieke**
ratchet-basiswaarde is in één controleerbare stap met 20% versoepeld en de fase is vastgelegd
in `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Wat is gewijzigd                                                                                                                                                                                                            | Waar                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — aantallen waarbij lager beter is ×1,2, percentages waarbij hoger beter is ÷1,2 (dekkingsminimum 60 behouden, `eslintErrors` blijft 0, `eslintWarnings` 0 → 20% van het bevroren aantal onderdrukkingen) | `quality-baseline.json` (de notitie `_relax_velocity_2026_08_30` vermeldt elke waarde vóór → na)       |
| `count` ×1,2 / `percentage` ×1,2                                                                                                                                                                                            | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, elke regellimiet in `frozen[*]` / `testFrozen[*]` ×1,2                                                                                                                                                    | `file-size-baseline.json`                                                                              |
| aantallen per bestand / per TS-code ×1,2                                                                                                                                                                                    | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                         | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` wordt adviserend zolang `_policy.requireTighten === false`                                                                                                                                              | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| de nachtelijke `bank-ratchet-shrinks` wordt gepauzeerd (de gemeten afname zou anders worden vastgelegd en de speelruimte tenietdoen)                                                                                        | `.github/workflows/nightly-release-green.yml`                                                          |

Toegestane-lijsten (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) zijn **geen** budgetten en zijn niet gewijzigd. Beleidscontroles met een slaag-/faalresultaat
(geheimen, SQL-regels, docs-/omgevingscontract, i18n-pariteit, unit-tests) zijn ongewijzigd —
een falende test blijft een falende test.

**Tooling**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — de
  eenmalige versoepeling (`scripts/quality/relax-baselines.mjs`); weigert tweemaal met dezelfde
  notitie te worden uitgevoerd.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  meet elke numerieke controle zoals CI dat doet en toont de resterende speelruimte per controle
  (`scripts/quality/baseline-headroom.mjs`). De nachtelijke taak `baseline-headroom` publiceert
  de tabel in de samenvatting van de workflowuitvoering en uploadt het JSON-/Markdown-rapport als
  `baseline-headroom-<run_id>`, dat 90 dagen wordt bewaard. Waarschuwings- en kritieke rijen
  identificeren controles die zich binnen 10% van hun limiet bevinden of die al overschreden
  hebben. Gebruik deze rapporten als vroegtijdige waarschuwing dat budgetten worden verbruikt;
  controleer de `_rebaseline_*`-notities van de betreffende controle. De taak maakt of actualiseert
  niet langer een permanent issue; #12149 bewaart de eerdere rapportgeschiedenis.

**Modus voor nieuwe code (Clean-as-You-Code) — sinds 2026-08-30, alleen het snelle pad voor PR's**

Bij `pull_request`-events geeft `quality.yml` `--base-ref <PR base SHA>` door aan `check:file-size`,
`check:complexity-ratchets` en `check:dead-code`. Voor `check:complexity-ratchets` en
`check:dead-code` vergelijkt de controle HEAD met de merge-base, **beperkt tot de bestanden die
door de PR zijn gewijzigd** (`scripts/check/newCodeMode.mjs`: de merge-base wordt beschikbaar
gemaakt in een tijdelijke `git worktree`, ESLint/knip worden daar en op HEAD uitgevoerd en de
aantallen per bestand worden met elkaar vergeleken):

- **blokkerend** — de PR heeft schendingen van cyclomatische/cognitieve complexiteit of dode
  exports toegevoegd in bestanden die door de PR zijn gewijzigd (`complexityNewCode=`,
  `cognitiveComplexityNewCode=`, `deadExportsNewCode=` in het logboek);
- **adviserend** — het globale totaal ten opzichte van de bevroren basislijn. Overgenomen drift laat
  een onschuldige PR nooit rood kleuren; de drift wordt bijgehouden voor herstel tijdens de release-reconciliatie en bewaakt door de
  headroom-job.

`check:file-size` gebruikt de basisreferentie volgens zijn eigen regels
(`scripts/check/check-file-size.mjs`, #8522): de controle verifieert elk bron- en testbestand in
de boomstructuur, leest met `git show` het aantal regels van elk bestand op de PR-basis en laat een
bestand alleen falen wanneer het groter wordt dan de hoogste van de basislimiet (`frozen` /
`testFrozen`, of `cap` / `testCap` voor een bestand buiten de basiswaarde) en de grootte op de
basis. Een bestand dat op de basis al is afgeweken, laat een onschuldige PR daarom nooit falen.

`check:boundary:ratchet` past dezelfde regel toe op het enige getal
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): bij PR-events geven zowel
de snelle gates van `quality.yml` als de lint-job van `ci.yml` de basis-SHA van de PR door, wordt de
basiscommit gemeten vanuit een `git archive`-export en faalt de PR alleen wanneer het aantal
`open-sse → src`-randen groter is dan de hoogste waarde van `metrics.boundaryOpenSseToSrc` en het
aantal op de basis. Basisdrift boven het plafond wordt gemeld (`base drift herdado`), maar laat een
onschuldige PR nooit falen; push → main behoudt het absolute plafond en bij een niet-oplosbare
basis-SHA wordt met een waarschuwing daarop teruggevallen.

Uitvoeringen van `workflow_dispatch`, de release-green-sweep en de nachtelijke headroom-job hebben
geen PR-basis en behouden de absolute (globale) vergelijking. Coverage, duplicatie en type-coverage
blijven voorlopig globaal (hun tools produceren niet goedkoop een diff per bestand) — kandidaten
voor dezelfde aanpak.

**De fase afsluiten bij v4.0 (LTS = strenger dan voorheen, niet "terug naar normaal")**

1. Op de ongewijzigde tip van `release/v4.0.0`: `npm run quality:headroom --json` voor de
   vastlegging, vervolgens `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` en de `--update` van elke
   typecheck-gate — elke baseline daalt naar de gemeten waarde.
2. Verwijder `_policy` uit `quality-baseline.json` (activeert `--require-tighten` en het nachtelijke
   banken opnieuw), herstel `THRESHOLD = 36` (of hoger) in `check-openapi-coverage.mjs`.
3. Maak de limieten strenger dan de gemeten waarden waar de modularisering resultaat heeft
   opgeleverd: zet de `cap` voor bestandsgrootte terug op 1000 (of 800), verhoog de
   coverage-ondergrenzen met 5 en stel dode exports voor de gemodulariseerde packages in op 0.

## Ratchet-basislijn (`quality-baseline.json`)

De ratchet-engine (`scripts/quality/check-quality-ratchet.mjs`) leest `quality-baseline.json`
en vergelijkt dit bestand met de zojuist verzamelde `quality-metrics.json`. Elke metriek die
meer dan de toegestane epsilon achteruitgaat, laat de build mislukken.

Momenteel bijgehouden metrieken:

| Metriek               | Richting | Betekenis                                          |
| --------------------- | -------- | -------------------------------------------------- |
| `eslintWarnings`      | `down`   | Het aantal ESLint-waarschuwingen mag niet toenemen |
| `coverage.statements` | `up`     | De statementdekking mag niet afnemen               |
| `coverage.lines`      | `up`     | De regeldekking mag niet afnemen                   |
| `coverage.functions`  | `up`     | De functiedekking mag niet afnemen                 |
| `coverage.branches`   | `up`     | De vertakkingsdekking mag niet afnemen             |

Om de basislijn bij te werken na een daadwerkelijke verbetering:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

De vlag `--update` schrijft de huidige gemeten waarden naar `quality-baseline.json`.
Commit dit bestand samen met de wijziging die de metriek heeft verbeterd. Een PR die een
metriek verbetert zonder de basislijn bij te werken, wordt onderschept door `--require-tighten` (Fase 6A.5,
implementatie in behandeling).

### CodeQL ratel: toelating van kandidaten en repository-inventaris

CI is eigenaar van de kandidaat CodeQL toelating via een expliciete afhankelijkheidsketen: `codeql-scan` roept de viertalige matrix in `codeql.yml` aan, waarna `codeql-admission` `node scripts/check/check-codeql-ratchet.mjs --candidate` uitvoert. `Gate / CI` vereist beide resultaten. Kwaliteit behoudt zijn eigen numerieke controles, maar ondervraagt de scanner niet voordat de producent klaar is; `Gate / Quality` alleen is geen volledige toelating van kandidaten. CodeQL blijft vereist voor kandidaten die alleen documenten bevatten.

Het beleid in `config/quality/codeql-admission-policy.json` selecteert Acties, C/C++, JavaScript/TypeScript en Python, standaard querysuite, model voor externe bedreigingen en build-modus geen. Preflight van producent wijst een in behandeling zijnd activeringsrecord af en vertakt zich buiten de expliciete doellijst. De huidige doelstellingen zijn de hoofddoelen en release/v3.8.54. -contracttests vergelijken deze eindige lijst en de push-trigger voor onderhoud met de pakketversie; de volgende release moet worden beoordeeld tijdens de onboarding. De bestaande PR trigger met bredere release van CI blijft behouden, maar een niet-geïnstalleerd doel rapporteert HOLD vóór extractie in plaats van een niet-gemeten PASS te verkrijgen.

Elke matrixtaak registreert de daadwerkelijke SARIF upload ID, taal, categorie, uitvoering en poging, identiteit van de bellerworkflow, gebeurtenis ref/head/base/merge SHA en beleidshash. De afhankelijke taak downloadt alleen de bonnen van deze run en valideert artefactsamenvattingen. Het vereist alle vier de categorieën, een succesvolle producent en een voltooide verwerking van elke exacte upload. Het gebruikt het sarif_id-filter van API, niet de laatste analyse die op een vertakking is gevonden. Gedeeltelijke herhalingen mogen succesvolle categorieën van een eerdere poging van dezelfde run en kandidaat hergebruiken, waarbij de productiepoging behouden blijft; een mislukte huidige producent kan eerder groen bewijsmateriaal niet hergebruiken.

De CodeQL -actie wacht op verwerking, maar de vastgezette implementatie ervan kan waarschuwen en doorgaan na een fout bij het lezen van de status of een uitgeputte wachttijd. Toelating verifieert dus opnieuw de verwerking. Ontbrekende categorieën, lopende verwerking, mislukte of geannuleerde taken, verouderde identiteit, onvolledige paginering of niet-beschikbare APIs produceren HOLD en afsluiten 2. Er blijft geen vaste wachttijd bestaan voor een onafhankelijke scannerworkflow. Een niet-gescande PR kan niet slagen omdat een waarschuwingsquery 0 retourneert. Een gemeten telling boven `metrics.codeqlAlerts.value` eindigt op 1; de basislijn wordt niet verhoogd om de waarschuwingen van een ander filiaal op te vangen. [Uploadstatus en analyse opzoeken](https://docs.github.com/en/rest/code-scanning/code-scanning).

De ontvangstrecords worden geüpload en geanalyseerd IDs, categorieën, gereedschapsversies, ref/SHA, basislijn- en alarmnummers. SARIF identity/result -telling, minimale regeltellingen en exacte waarschuwingsinstanties blijven verplicht. PR/analysis identiteiten worden opnieuw gecontroleerd voordat ze worden geaccepteerd. Deze controles stellen de geconfigureerde categoriedekking vast, en niet een inventarisatie van elk geëxtraheerd bronbestand. C/C++ no-build-extractie omvat geen code die is gegenereerd tijdens een projectbuild. Bronuitsluitingen moeten nog steeds worden beoordeeld, en de toeschrijving van bijdragers heeft vergelijkbaar, exact gebaseerd bewijsmateriaal nodig.

`codeql-maintenance.yml` levert push-scans met actieve release en het weekschema zonder PR/main producenten te dupliceren. `nightly-codeql-inventory.yml` houdt de basislijn voor de hele opslagplaats gescheiden, met `--strict-measurement` en een fout wanneer meting niet beschikbaar is. De sierlijke skip van de lokale erfgoedverzamelaar is geen toelating tot kandidaten. Aanscherping blijft een expliciete `--update` na een geverifieerd lager mondiaal cijfer.

De geavanceerde workflow mag niet worden gepubliceerd terwijl de standaardinstellingen zijn geconfigureerd: GitHub wijst die combinatie af. Het versiebeleid blijft in behandeling totdat de herziene administratieve transitie is teruggelezen. Vóór publicatie pint een operator de repository, head/base/tree, policy/patch/rollback hashes en waargenomen installatiestatus; `node scripts/quality/codeql-producer.mjs verify-admin-readback` controleert de aangeleverde verwachte en daadwerkelijke JSON records. Dit is een technische beveiliging, geen goedkeuring door de operator of een vervanging voor het ophalen van nieuwe uitlezingen. Het PR token vraagt nooit om beheerderstoegang. Uitrol en elke scannerwijziging vereisen een afzonderlijke teruglezing plus echt bewijs van compatibiliteit PR, fork en merge-group.

Forks gebruiken gehoste runners, afrekenen zonder persistente inloggegevens, geen project- install/build in de producer en geen overgenomen repositorygeheimen. GitHub ondersteunt SARIF -upload voor de pull_request-gebeurtenis met zijn gereduceerde fork-token; Goedkeuring van de eerste bijdrage-uitvoering blijft GitHub beleid. Gebruik nooit pull_request_target om niet-vertrouwde code uit te voeren. Bevestig de feitelijke tokenmachtigingen, analysesleutel en alle categorieomgevingen in de gecontroleerde kanarie voordat u de migratie als voltooid beschouwt. [Fork-uploadregels](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [conflicterende installatiemodi](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Ontslag is een zaak van de telefoniste (Harde regel #14)** — wijst nooit een CodeQL waarschuwing af zonder de technische rechtvaardiging in de afwijzingsopmerking vast te leggen: `won't fix` voor een upstream-protocolvereiste, `used in tests` voor een testopstelling, `false positive` voor een ontsmettingsmiddel CodeQL niet kan zien (precedent: `docs/security/ERROR_SANITIZATION.md`).

---

## Beleid voor het opnieuw uitvoeren van tests (WS5.4, v3.8.49)

Opnieuw uitvoeren wordt per runner ingesteld, nooit als algemene regel — een algemene retry verandert echte regressies
in onzichtbare flakes:

| Runner           | Beleid                                                                                                                          | Waarom                                                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` alleen in CI, met `trace: on-first-retry`                                                                          | Browser-/netwerktiming is daadwerkelijk niet-deterministisch; één retry met een trace verandert een flake in een diagnosticeerbaar artefact |
| Vitest           | GEEN globale retry. Een aantoonbaar flaky test krijgt een expliciete retry per test (zichtbaar in de diff, beoordeeld in de PR) | Houdt de quarantainelijst in de repo, nooit ondoorzichtig                                                                                   |
| node:test (unit) | NOOIT een retry                                                                                                                 | Een flaky unittest is een bug in de test — los deze op, voer hem niet simpelweg opnieuw uit                                                 |

Beoogde SLO's zodra flaketelemetrie beschikbaar is (WS5.2/5.3): <1% flakepercentage per test
(drempel voor "nu oplossen"), ≥95% slagingspercentage per pipeline. Referentiewaarden uit de sector —
opnieuw kalibreren aan de hand van onze eigen metingen.

## Verloop van releasebrede ratchets (WS5.5, v3.8.49)

Wanneer een ratchet (bestandsgrootte, complexiteit, eslint-waarschuwingen) achteruitgaat op de ZUIVERE
release-tip — d.w.z. dat de COMBINATIE van merges de regressie heeft veroorzaakt en geen enkele PR de
regressie afzonderlijk op zijn eigen branch reproduceert — is de oplossing **eenmalig de verantwoordelijkheid van de release captain, op de
release-branch**: geef de voorkeur aan extractie/refactoring; stel de baseline alleen opnieuw vast met de gedocumenteerde
motivering. Schuif gecombineerd verloop nooit af op de PR van een bijdrager en stel de baseline nooit
per PR opnieuw vast (dat verbergt echte regressies). Maak eerst onderscheid: reproduceer de
rode status op de zuivere tip in een probe-worktree voordat je aanneemt dat jouw PR deze heeft veroorzaakt.

## Verkleiningen van ratchets vastleggen — de neerwaartse richting (#8584)

De ratchet is maar half geautomatiseerd, en dan nog de verkeerde helft. Een limiet **verhogen** is een
handmatige JSON-bewerking die tien seconden duurt en de snelste manier is om een rode PR te deblokkeren.
Een limiet **verlagen** vereist dat iemand `--update` uitvoert en het resultaat commit — en totdat
de job `bank-ratchet-shrinks` werd toegevoegd, voerde geen enkele workflow dit uit. Het gemeten gevolg
(2026-07-25): 18 bevroren bestanden zaten al op of onder de limiet van 800 regels voor nieuwe bestanden, met als ergste
132× (`src/shared/validation/schemas.ts`, 19 regels met een limiet van 2.523); het
complexiteitsplafond liep op van `1794 → 2169` verspreid over ~37 opmerkingen over het opnieuw vaststellen van de baseline, met precies één
daling (−1); en "volgende cyclus aanscherpen via `--update`" werd 31 keer geschreven en één keer
nageleefd. Een limiet die langer blijft bestaan dan de code waaraan die te danken is, verandert elke voltooide
opsplitsing stilzwijgend in extra groeiruimte voor degene die het bestand vervolgens bewerkt.

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** sluit die lus:

|                      |                                                                                                                      |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Wordt uitgevoerd bij | `schedule` (3×/dag) + `workflow_dispatch` — bewust **niet** bij `push`                                               |
| Meet                 | de hoogste `release/vX.Y.Z`, met dezelfde resolutie + injectiebeveiliging als `release-green`                        |
| Schrijft             | `check:file-size --update` en `check:complexity-ratchets --update` (beide zijn door hun opzet uitsluitend verlagend) |
| Verifieert           | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                             |
| Levert               | één altijd actuele PR voor de release-branch — geforceerd bijgewerkt, nooit gespamd                                  |

Vastlegging gebeurt gebundeld in plaats van per push, omdat er geen latentievereiste is (een verkleining die
binnen 8 uur wordt vastgelegd is prima), terwijl een uitvoering per merge tijdens mergecampagnes de PR-branch
herhaaldelijk opnieuw zou bouwen en telkens de kosten van een volledige ESLint-doorloop met zich mee zou brengen. Detectie blijft plaatsvinden bij
push (`release-green`); alleen het vastleggen gebeurt gebundeld.

### De veiligheidsverificatie

De job schrijft zonder toezicht naar de baselines, dus `verify-ratchet-bank.mjs` maakt
dat aanvaardbaar. Het vergelijkt de tree na `--update` met `HEAD` en **breekt de job af
voordat er een commit bestaat** — zonder een PR te openen — tenzij elke wijziging een van de volgende is:

- een numerieke `frozen`- of `testFrozen`-vermelding die is **verlaagd** of **verwijderd**
- `complexity-baseline.json` → `count` **verlaagd**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **verlaagd**

Al het andere mislukt: een getal verhogen, een vermelding toevoegen, `cap`/`testCap` wijzigen of
een `_rebaseline_*`-opmerking verwijderen/herschrijven (die opmerkingen vormen het auditspoor voor waarom elk
plafond bestaat en worden opgeslagen in hetzelfde `frozen`-object als de bestandsvermeldingen).
Een bot die een limiet zou kunnen verhogen, zou strikt slechter zijn dan de status quo. Regressiebeveiliging:
`tests/unit/verify-ratchet-bank.test.ts`.

De job pusht nooit naar `release/*` — een mens merget de PR, zodat een onjuiste meting
niet zonder beoordeling kan worden opgenomen.

## Allowlist-beleid

Elke gate die niet kan mislukken vanwege reeds bestaande overtredingen, gebruikt een bevroren allowlist
(bijv. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Het beleid is:

**Los de hoofdoorzaak op; gebruik de allowlist alleen wanneer de overtreding reeds bestond en
niet in dezelfde PR kan worden opgelost.**

Wanneer je een item aan een allowlist toevoegt:

1. Voeg een opmerking toe met de rechtvaardiging.
2. Verwijs naar het tracking-issue (bijv. `// #3498 — Phase 2 feature, not yet implemented`).
3. Verwijder het item in dezelfde PR die de overtreding oplost — een verouderd item dat niet langer
   een actieve overtreding onderdrukt, is zelf een defect (de controle op verouderde handhaving van 6A.3 zal,
   zodra deze is geïmplementeerd, de gate laten mislukken bij een verweesd allowlist-item).

Voeg **geen** allowlist-items toe om tests sneller te laten slagen. Een groene gate met een groeiende
allowlist geeft een vals gevoel van kwaliteit.

### Wanneer een gate mislukt voor je PR

1. **Lees de uitvoer van de gate zorgvuldig** — daarin staat precies welk bestand of symbool
   de regel heeft overtreden.
2. **Los de overtreding op** — de meeste gates zijn deterministische controles van het bestandssysteem die slagen zodra
   de code correct is.
3. **Als de overtreding reeds bestond** (d.w.z. je hebt deze niet geïntroduceerd, maar de gate deze nu
   omvat): voeg een allowlist-item toe met een rechtvaardigende opmerking en een tracking-issue.
4. **Als de gate een ratchet is** (dekking, ESLint-waarschuwingen, duplicatie, complexiteit):
   door je wijziging is de metriek verslechterd. Los het onderliggende probleem op of voer (in zeldzame gevallen)
   `npm run quality:ratchet -- --update` uit als de wijziging opzettelijk is en de verslechtering
   van de metriek acceptabel is — maar documenteer in de PR-beschrijving waarom.
5. **Adviserende gates** (`continue-on-error: true`) zijn informatief — ze blokkeren het
   samenvoegen niet, maar verschijnen wel in het CI-overzicht. Los ze desondanks op.

---

## Een nieuwe gate toevoegen

1. Maak `scripts/check/check-<name>.mjs` (of `.ts`) aan. Beleids-gates eindigen met exitcode 0/1.
   Gates in ratchet-stijl schrijven via `collect-metrics.mjs` een metriek naar `quality-metrics.json`.
2. Voeg `"check:<name>": "node scripts/check/check-<name>.mjs"` toe aan `package.json` en
   synchroniseer de alias en de exacte opdracht ervan in `config/quality/gate-manifest.json`.
   Pas dezelfde synchronisatie toe wanneer u een bestaande validatie-alias wijzigt of verwijdert.
   Voer `npm run check:gate-manifest` uit; de pre-commithaak en de wijzigingsclassificatie van CI
   dwingen dit contract af.
3. Neem deze op in `.github/workflows/ci.yml` onder de juiste job
   (beleid → `lint` of `docs-sync-strict`; ratchet → `quality-gate`).
4. Als de gate een allowlist heeft, pas dan `reportStaleEntries()` uit
   `scripts/check/lib/allowlist.mjs` toe, zodat verouderde items automatisch worden gedetecteerd.
5. Schrijf een test in `tests/unit/build/` die de detectielogica van de gate afdekt.
6. Werk dit document bij (voeg een rij toe aan de relevante jobtabel).

---

## Agenttooling: LSP-in-the-loop (opt-in)

Naast de CI-gates levert OmniRoute een **optioneel** `agent-lsp`-geraamte
(een `.mcp.json` op projectniveau, Fase 7 Taak 15). Maak `.mcp.json` aan
om een TypeScript-taalserver beschikbaar te stellen aan programmeeragents, zodat zij symbolen /
diagnostiek oplossen **voordat** ze code schrijven — een compile-before-claim-aanvulling op
`typecheck:core` die fouten door 'verzonnen symbolen' bij de bron vermindert. Deze wordt bewust
niet automatisch geladen (je kiest en verifieert zelf de MCP↔LSP-bridge); een defect item registreert alleen een
verbindingsfout en onderbreekt nooit sessies.

---

## Rationalisatieachterstand (ROI-beoordeling — Fase 9 Golf 3)

Deze inventaris is op 2026-06-17 afgestemd op `ci.yml` (in de vorige versie ontbraken
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Een ROI-beoordeling van de afgestemde set
heeft de volgende kandidaten voor rationalisatie opgeleverd. **De samenvoegingen zijn
mechanische CI-wijzigingen; de omzettingen/verwijderingen zijn beleidsbeslissingen die
aan de operator zijn voorbehouden.** Niets van het onderstaande is al toegepast.

**Hierboven eveneens niet gedocumenteerd** (advisory, beperkt signaal): de job `docs-lint` (markdownlint + Vale, de hele job `continue-on-error`) en de zelfstandige scannerworkflows `semgrep.yml` / `scorecard.yml`. CodeQL heeft nu verplichte producer- en toelatingsjobs onder `Gate / CI`, onder voorbehoud van de hierboven beschreven activeringseisen. `semgrepFindings: 0` staat in `quality-baseline.json`, maar is niet verbonden met een blokkerende ratchet in `ci.yml` — de metriek is momenteel verweesd.

### Samenvoegen / dedupliceren (mechanisch, lager risico)

Elke kandidaat is op 2026-06-17 gevalideerd aan de hand van de actuele status van de gates
(vertrouw, maar verifieer); diverse 'voor de hand liggende' samenvoegingen bleken verborgen
technische schuld te bevatten en zijn **geen** directe vervangingen.

- **`check:docs-sync` wordt tweemaal uitgevoerd** — zelfstandig in de `lint`-job en opnieuw binnen `check:docs-all` (`docs-sync-strict`) en de husky-pre-commithook. ✅ **VOLTOOID** — zelfstandige aanroep in `lint` verwijderd.
- **CVE-scans** — ❌ **GEEN probleemloze samenvoeging.** `audit:deps` blokkeert kritieke waarschuwingen en onvolledige audits voor alle vijf lockfiles, terwijl waarschuwingen met hoge ernst volgens het huidige beleid als waarschuwing worden gerapporteerd; `check:vuln-ratchet` (osv) faalt alleen bij een _regressie_ ten opzichte van de ingecheckte baseline en wijst ontbrekende metingen af wanneer die vereist zijn. Verschillende semantieken — het verwijderen van `audit:deps` zou de absolute kritieke gate en de onafhankelijke auditbewijzen voor pakketten verloren laten gaan. Behoud beide.
- **Cyclusdetectie** — ✅ **VOLTOOID** (#15159 G-01/G-02). De oude tekst noemde `check:cycles` de 'groene, gecureerde' gate en rechtvaardigde het behoud ervan als blokkerende gate omdat `check:circular-deps` (dpdm) 91 cycli rapporteerde. Dat groen was **vals groen**: `check:cycles` scande 5 submappen (450 bestanden), kwam alleen overeen met statische `import|export … from` en verwijderde elke specificatie met `@/` en `@omniroute/open-sse/`, waardoor de dynamische import- en aliascycli die de repository domineerden niet zichtbaar waren. Opgelost: de gate doorloopt nu `src` + `open-sse` (5023 bestanden), verzamelt specificaties uit de TypeScript-AST (waardoor `import("…")` meetelt en `typeof import("…")` op een typepositie niet) en resolveert tsconfig-`paths`. Er worden **14** cycli gevonden, niet 0. Omdat 14 reeds bestaande cycli niet in een gate-PR kunnen worden opgelost, is `check:cycles` nu een **ratchet** (`--ratchet`, plafond `metrics.cycles.value = 14` in `quality-baseline.json`, `direction: down`) — elke _regressie_ wordt geblokkeerd en het aantal kan alleen dalen. CI voert `npm run check:cycles:ratchet` uit. De geleidelijke afbouw loopt mee met **A-01**. `check:circular-deps` (dpdm) blijft adviserend als bredere second opinion.
- **Complexiteit** — ✅ **VOLTOOID** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): één ESLint-doorgang, tellingen per ruleId zodat de cyclomatische+max-lines- en cognitieve baselines onafhankelijk blijven; afzonderlijke `check:complexity` / `check:cognitive-complexity` blijven beschikbaar voor lokaal gebruik van `--update`.
- **Anti-hallucinatie voor `/api`** — ✅ **VOLTOOID** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): één FS-inventarisatie van `src/app/api`; openapi-routes + docs-symbols blijven onafhankelijk rapporteren; de afzonderlijke controles blijven beschikbaar voor lokale uitvoeringen.
- **`check:node-runtime` wordt in 11 jobs uitgevoerd** — ⚠️ **lage ROI.** Elke job gebruikt een afzonderlijke runner en de controle duurt <1s; totale besparing circa 10s, ten koste van een goedkope beveiliging per job. De benodigde wijzigingen niet waard.
- **`typecheck:noimplicit:core` in de CI-lint** — ✅ **verwijderd uit de lint-job** (was adviserend met `continue-on-error`); het blokkerende typeoppervlak bestaat uit `typecheck:core` + `check:type-coverage`. Lokaal script behouden.

### Omzetten / beslissen (operatorbeleid)

- `check:openapi-security-tiers` (adviserend) — ❌ **NIET zonder meer omzetbaar.** De controle sluit af met 0, maar waarschuwt dat verschillende `traffic-inspector`-routes onder `LOCAL_ONLY_API_PREFIXES` de annotatie `x-loopback-only: true` missen. Handhaving vereist dat deze annotaties eerst aan `openapi.yaml` worden toegevoegd.
- `typecheck:noimplicit:core` (adviserend) — grotendeels afgedekt door de blokkerende `check:type-coverage`-ratchet. Zet deze om naar een ratchet of verwijder de redundante tweede `tsc`-doorgang.
- `test:vitest:ui` (nu **blokkerend**) — reeds bestaande fouten zijn expliciet uitgesloten in `vitest.config.ts` met `// #8618`-trackingopmerkingen; nieuwe fouten laten de job falen.
- `check:secrets` (gitleaks, blokkerende ratchet) — het huidige plafond is `metrics.secretFindings` in `quality-baseline.json`. Elke uitzondering vereist een gerechtvaardigde vermelding in `.gitleaks.toml`; een niet-beschikbare meting is ONVOLLEDIG. De scan vormt een aanvulling op de ingebouwde secretscans van GitHub en `check:public-creds`.
- `check:pr-evidence` (blokkerend, doorzoekt de prozatekst van de PR-beschrijving met grep) — hoog risico op fout-positieven; verwijdering verzwakt de handhaving van Harde regel #18, dus dit is een echte beleidskeuze.
- `semgrep` (zelfstandig adviserend) — overlapt CodeQL voor de OWASP-categorieën; koppel de baseline aan een ratchet of verwijder de controle.

---

## Gerelateerde documentatie

- Softwaretoeleveringsketen (herkomst, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — poort voor pariteit van sleutelsets

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, job `i18n-ui-coverage`).
Vergelijkt de verzameling bladsleutels van elk `src/i18n/messages/<locale>.json` met `en.json` en faalt
bij elk ontbrekend of extra blad, ongeacht wanneer de sleutel is toegevoegd. Tijdelijke aanduidingen
met `__MISSING__:` tellen als aanwezig (hun inhoud valt onder de verhoudingspoort). Dit is de absolute
aanvulling op de twee op verschillen/percentages gebaseerde poorten: `check-ui-keys-coverage` handhaaft
een ondergrens van 80 % per locale (43 ontbrekende sleutels op ~13.000 wordt nog steeds als 99,7 % weergegeven)
en `check-new-key-coverage` beoordeelt alleen de sleutels die een PR aan `en.json` toevoegt. Een locale-batch
wordt gegenereerd op basis van de `en.json` van de dag waarop de branch wordt afgesplitst en wordt dagenlang
vertaald terwijl de basis nieuwe sleutels blijft toevoegen; de batch-PR voegt zelf geen sleutel toe, waardoor
beide verwante controles stil bleven toen batch 1 (#13044) werd samengevoegd met 43 ontbrekende sleutels in
negen locales en batch 2 (#13660) met 10 ontbrekende sleutels in acht locales (2026-09-15). Los een rode status
op met `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; een `extra` blad
betekent dat de bron het heeft verwijderd — verwijder het uit de locale. `--warn` rapporteert zonder te falen.
`--catalog=cli` voert dezelfde vergelijking uit voor `bin/cli/locales` (`npm run i18n:check-keys:cli`);
beide stappen bevinden zich in job `i18n-ui-coverage`.

#### `check-new-key-coverage` — i18n-poort voor nieuwe sleutels

Verwante controle van `check-ui-value-drift`. Die detecteert een Engelse waarde die is **herschreven**
terwijl de vertalingen niet zijn bijgewerkt; deze detecteert een Engelse sleutel die is **toegevoegd**
terwijl sommige locales deze nooit hebben ontvangen.

`check-ui-keys-coverage` kan deze categorie niet detecteren: deze controle handhaaft een procentuele
ondergrens per locale, en elf ontbrekende sleutels op ~13.000 laten de dekking op 99,9% staan. Een percentage
per taal kan niet uitdrukken: "deze functionaliteit is onvertaald uitgebracht" — volledige functionaliteit
kan zonder enige tekst in een nieuwe locale terechtkomen zonder dat het getal ooit verandert.

Het incident dat hierin is vastgelegd: fase 3 van het Orchestration Canvas vertaalde de elf bijbehorende
sleutels voor de 42 locales die destijds bestonden. Enkele uren later bracht de EU-talenbatch (#13044) de
repository op 51 locales, en de negen nieuwkomers (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`)
hebben ze nooit ontvangen. `deepMergeFallback` vervangt een ontbrekende sleutel door Engels, waardoor de
fout zich uitte als een onvertaalde gebruikersinterface in plaats van een lege gebruikersinterface — een
reëel probleem dat door de opzet onopgemerkt bleef.

Net als de verwante controle is deze **verschilbewust**: Engels op de merge-base wordt vergeleken met de
werkboom, zodat bestaande hiaten bevroren blijven en er geen migratie nodig was om de poort in te schakelen.

**Een aanduiding `__MISSING__:<english>` voldoet niet (sinds 2026-09-17).** Dit was voorheen het
gedocumenteerde uitstelmechanisme — tijdens runtime wordt teruggevallen op correct Engels — totdat acht
feature-PR's op 2026-09-16 61 sleutels toevoegden en de aanduiding in alle 65 locales plaatsten in plaats
van ze te vertalen: deze poort accepteerde ze allemaal, niets blokkeerde de PR's en de blokkerende
verhoudingspoort voor echte vertalingen faalde vervolgens voor iedereen op de releasetip (pt-BR 3,2 % >
2,5 % + 0,5). Een aanduiding wordt nu als ontbrekende vertaling beoordeeld. Los een rode status op met
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, of verwerk
alle locales parallel met `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
veilig bij loskoppeling, weigert te starten zonder de `OMNIROUTE_TRANSLATION_*`-omgevingsvariabelen). Een
sleutel die Engels moet blijven (een vastgelegde product-, engine- of vlagnaam) hoort thuis in
`scripts/i18n/untranslatable-keys.json`, nooit achter een aanduiding. `vi` verbiedt aanduidingen volledig
(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — poort voor geparkeerde tests

Een bestand in de `exclude`-lijst van `vitest.config.ts` is een test die niet wordt uitgevoerd, maar voor
iemand die de boom bekijkt lijkt het wel dekking te bieden. Tweeënzestig bestanden stapelden zich op achter
de opmerking `// #8618 — pre-existing failure; remove this exclusion when fixed`. Issue #8618 werd op
2026-08-11 gesloten, terwijl de bijbehorende lijst van 45 naar 62 vermeldingen groeide en elke nieuwe
vermelding een opmerking overnam die naar een afgehandeld issue verwees. Toen de lijst uiteindelijk bestand
voor bestand werd gemeten (#13204), **slaagden 51 van de 62 tegen de huidige boom zonder enige bronwijziging**.

De poort vereist dat elke uitsluiting die naar een echt bestand verwijst (a) een tracking-issue noemt en
(b) in `config/quality/vitest-exclusions.json` voorkomt met de gemeten status, zodat het toevoegen ervan een
beoordeelbaar verschil in een afzonderlijk bestand oplevert in plaats van nog een regel in een array met 60
vermeldingen. De uitgesloten tests worden bewust niet opnieuw uitgevoerd — dat kost ~10 minuten en hoort
thuis in een periodieke job; de inventaris legt vast wanneer elke test voor het laatst is gemeten.
