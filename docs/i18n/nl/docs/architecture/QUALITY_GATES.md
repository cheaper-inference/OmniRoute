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

## Poortinventarisatie en uitvoeringsprofielen

### Toelating van kandidaten

De CI en Quality Gates-workflows geven elk een stabiel oordeel: `Gate / CI` en `Gate / Quality`. Hun geversieerde toelatingsbeleid somt elke upstream-baan op zoals vereist of adviserend. Een toepasselijke vereiste taak moet slagen: ontbrekende, geannuleerde, overgeslagen, lopende en onbekende resultaten kunnen PASS niet vaststellen. Een geldige classificatie voor alleen documenten of alleen voor catalogi kan ervoor zorgen dat een codestrook niet van toepassing is; een gewoon ontwerp- PR is geen geaccepteerde kandidaat. Een `hotfix` label doet geen afstand van bewijs.

Beide workflows omvatten PRs in main/release filialen, pushes naar `main`, handmatige verzending en samenvoegingsgroepsgebeurtenissen. Push, dispatch en merge-group voeren de volledige selectie uit. Een vertrouwd Mergify-wachtrijconcept voert ook toepasselijke `full-code`/`full-code-e2e` taken uit; gewone PRs sla ze over. Voer vóór een handmatige samenvoeging een volledige verzending uit voor de exacte kandidaat. Pushs naar `release/**` starten deze workflows niet; Release-Green observeert de samengevoegde basis afzonderlijk (`docs/ops/RUNNER_BOX.md` → Hosted Lane). Forks en merge-groepen gebruiken gehoste hardlopers voor taken die anders zelf-gehoste hardlopers selecteren; Er moet vóór de uitrol voldoende gehoste capaciteit worden geverifieerd.

Een gewone PR voert de snelle selectie uit. De `full-code` en `full-code-e2e` -rijen van het toelatingsbeleid (E2E, integratie, pakketartefact, Electron smoke, Bun SQLite, ecosysteem- en protocolclients) worden alleen uitgevoerd op een samenvoegwachtrijconcept of op een volledige run: `gh workflow run ci.yml --ref <branch>`.

Elke JSON -bon identificeert de uitgecheckte SHA, de workflowrun en de poging. De CLI wijst een checkout/event SHA mismatch af. Workflowtests binden het beleidslidmaatschap aan de `needs` lijst van de vonnistaak, zodat een nieuwe of verwijderde rij niet stilletjes kan verdwijnen. De bonnen hebben betrekking op hun eigen workflow, niet op de publicatie, implementatie of op de interne onderdelen van een bestaande adviesscanner. Het maken van de toepasselijke controles die vereist zijn in het filiaalreglement is een aparte administratieve wijziging; het definiëren van hun taken beschermt op zichzelf niet een branche.

`API Route Typecheck` is een onafhankelijke workflowcontrole, buiten zowel de verzamelde uitspraken als het statische profiel van de lokale volledige waarnemer. Bekijk het resultaat afzonderlijk voor de exacte kandidaat. `.github/workflows/api-route-typecheck.yml` draait op PRs in `main` of `release/**`, pusht naar een vertakkingsfamilie, handmatige verzending en `merge_group` gebeurtenissen van het type `checks_requested`. Er is geen padfilter. Groepen samenvoegen, bekijk `merge_group.head_sha`; andere evenementen bekijk `github.sha`. Alle gebeurtenissen gebruiken dezelfde API -diagnostische poort- en poorteenheidtests. PR basisretargets vragen om een nieuwe controle; body/title bewerkingen gebruiken de naam `Admission not requested / API Route Typecheck` voor alleen observatie en kunnen de toelatingscontrole niet vervangen.

### Behouden bewijsmateriaal in de acceptatieverminderaar

`scripts/quality/validate-release-acceptance.mjs` reduceert een aangeleverd plan en de bijbehorende manifesten; er wordt niet aangetoond dat het plan de volledige releasepijplijn bestrijkt. De rapporten stellen expliciet `releaseAcceptance: false` vast, zelfs als dat plan `VERIFIED` is. De `release-acceptance.yml` workflow maakt nog steeds gebruik van schaduwarmaturen, geen echte bouw-, pakket-, opstart- of promotiebonnen.

De CLI vereist dat `--evidence-root` het bewaarde bewijsmateriaal verifieert. Bestanden worden omgezet als `<evidence-root>/<artifact_id>/<member>` en gehasht als SHA-256. Een PASS record zonder bewijs, een ontbrekend of gewijzigd bestand, een onveilig pad of een symlink verhindert verificatie. Ontbrekende bestanden zijn niet hetzelfde als lege succesvolle logboeken. Bestaande SHA/run/attempt controles blijven onafhankelijk: overeenkomende bytes kunnen een verouderde bon niet redden. Bestandsintegriteit is geen bewijs van de authenticiteit van de uitvoering of van artefactpromotie.

### DAST gebruikt de geverifieerde CI -build

De vereiste `dast-smoke` CI -taak roept `.github/workflows/dast-smoke.yml` aan na `build`. Het volgt dezelfde code/draft selectie als de build, inclusief ondersteunde fork PRs, release-target PRs en samenvoeggroepen. Een ontbrekende, mislukte, geannuleerde of onverwacht overgeslagen DAST -taak blokkeert `Gate / CI`. De herbruikbare workflow heeft geen onafhankelijke PR/dispatch trigger; handmatige validatie maakt gebruik van de verzending van CI, zodat de build en de consument in één run blijven.

`scripts/ci/next-build-provenance.mjs` verzegelt het volledige Next-artefact met zijn tar-digest, repository/event/run, producer-poging, head/base/checkout/tree, workflow-identiteiten, lockfile, exacte Node version/ABI, platform en bundelaar. DAST selecteert het onveranderlijke artefact ID uit `needs.build.outputs`, vereist verificatie van de downloadsamenvatting en hasht onafhankelijk de ZIP met de producentensamenvatting voordat de twee leden op de toelatingslijst worden geëxtraheerd via `scripts/ci/unpack-ci-build.py`. Het manifest- en tar-archief moeten ook overeenkomen met de uitvoer van onafhankelijke producenten voordat de Next-boom wordt uitgepakt. Er wordt nooit gezocht naar de nieuwste succesvolle branch-build. Een gedeeltelijke herhaling kan dezelfde producerpoging opnieuw gebruiken als de ID en alle inputs nog steeds overeenkomen; de bon registreert beide pogingen.

De consument blijft op een gehoste Linux runner met alleen-lezen repositorytoestemming en zonder repositorygeheimen. Het installeert de exacte Node-versie van de producent en assembleert vervolgens de CLI met `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` wijst een ontbrekende standalone server af voordat er een fallback-build wordt uitgevoerd; normale lokale CLI -builds behouden hun bestaande terugval. Servergereedheid, Schemathesis en promptfoo moeten allemaal slagen binnen de ongewijzigde taaklimiet van 25 minuten. Een herkomstbewijs bewijst de ingevoerde identiteit en bytes, geen succesvolle DAST scan. Het verlopen van artefacten, onderbreking van de runner of een defecte scanner blijft onvolledig of mislukt bewijsmateriaal; het kan geen PASS worden via een adviesverpakking.

### UI uitvoeringscapaciteit

CI voert de volledige UI inventaris uit als vier `test-vitest` matrixscherven, elk met maximaal twee werknemers per scherf en de bestaande taakdeadline van 15 minuten. Op de eerste scherf wordt ook de MCP/autoCombo Vitest suite uitgevoerd. Het vereiste functieresultaat omvat elk matrixbeen; het falen of annuleren van één scherf kan geen toelating van kandidaten tot gevolg hebben.

De nachtelijke waarnemer bewaart voor elke UI shard een afzonderlijk ontvangstbewijs met de exacte kandidaat, inclusief de MCP uitvoering in het eerste ontvangstbewijs. Alle vier de ontvangstbewijzen, logboeken en overeenkomende uitvoeringsidentiteiten zijn vereist. Lokale `npm run test:vitest:ui` selecteert nog steeds de volledige suite; één `--shard` run is slechts gedeeltelijk bewijs.

### Collectie van eenheidsdekking

De twaalf eenheidsscherven verzamelen V8-dekking tijdens hun bestaande testuitvoering. Een succesvolle shard voert `scripts/ci/compact-v8-coverage.mjs` uit om de originele bestanden te comprimeren zonder een tussentijds Istanbul-rapport te genereren. De laatste Coverage-taak verifieert alle twaalf manifesten aan de hand van de kandidaat SHA, runtime, source root en data-hashes, en voert vervolgens de reporters van c8 en bestaande dekkingsdrempels uit. Invoer behoudt de globale bestandsnaamvolgorde van c8; pre-sharding per scherf is onveilig voor gemengde function/block dekking. Ontbrekende, misvormde of incompatibele scherven worden niet toegelaten. Mislukte testscherven behouden de onbewerkte diagnostische dekking afzonderlijk; het kan niet deelnemen aan de definitieve samenvoeging.

### Voortgangsbewijzen voor uitvoering van eenheden

Het gedeelde `test:unit:ci:shard` commando registreert de fasen `primary`, `dashboard` en `serial` via `scripts/ci/unit-progress-reporter.mjs`. Het normale testrapport blijft beschikbaar. Een afzonderlijk ontvangstbewijs met uitsluitend metadata registreert de start en voltooiing van elk bestand, en een hartslag van 30 seconden vermeldt de bestanden die nog actief zijn en hun verstreken tijd. Het registreert alleen metagegevens over uitvoering op de toelatingslijst; testbeschrijvingen, uitvoer, foutteksten en de volledige omgeving zijn niet geserialiseerd.

CI bewaart de JSONL bestanden als `unit-progress-ci-<run>-<attempt>-<shard>`. Een time-out van een taak kan het later uploaden verhinderen; reeds uitgezonden hartslagen blijven diagnostisch bewijs. Ontbrekende hartslagen kunnen ook een gevolg zijn van een geblokkeerd of beëindigd runnerproces. Deze ontvangstbewijzen behouden de bestaande testselectie, gelijktijdigheid, deadlines en exitstatus; het zijn geen uitspraken over toelating van kandidaten.

### Wachtrij samenvoegen

Het `queue` label stuurt een PR naar de Mergify-wachtrij (`.mergify.yml`). Mergify opent een concept- PR op een `mergify/merge-queue/` vertakking, CI voert daar de volledige selectie uit en de originele PR wordt samengevoegd wanneer `Gate / CI`, `Gate / Quality` en `Merge integrity (changelog + generated skills)` passeren.

Mergify schrijft het wachtrijoverzicht in de conceptbeschrijving. Body/title-only `pull_request` `edited` gebeurtenissen gebruiken een runspecifieke gelijktijdigheidsgroep en voeren de classificatie, testmatrices, samenvoegintegriteit of het toelatingsoordeel niet opnieuw uit. Controlenamen voor alleen observatie kunnen `Gate / CI` of `Gate / Quality` niet vervangen. Een bewerking die de doelgroep wijzigt, vraagt om nieuwe kandidaatvalidatie.

Na een dequeue wordt de PR met een push niet altijd opnieuw in de wachtrij geplaatst. Reageer `@mergifyio queue` erop.

### Statische scaninventaris

De versiebeheerde npm-aliasinventaris en het statische scanlidmaatschap zijn live in `config/quality/gate-manifest.json`. Voer `npm run check:gate-manifest` uit om scriptnamen en exacte opdrachten tegen `package.json` te valideren; toevoegingen, verwijderingen en opdrachtdrift mislukken zowel de lokale hook als de veranderingsclassificatietaken in CI. Een alias is geen workflowtaak, matrixinstantie of testcase: deze tellingen mogen niet als uitwisselbaar worden gepresenteerd.

Gebruik `npm run quality:scan -- --list` of `npm run quality:scan:fast -- --list` om de geselecteerde aliassen te inspecteren zonder ze uit te voeren. De runner roept het npm-ingangspunt aan, zodat de runtime ervan (inclusief Bun indien geconfigureerd) behouden blijft. Het manifest registreert aliassen buiten deze profielen, zoals afzonderlijk aangeroepen, en onderhoudsopdrachten zijn verboden in alleen-lezen scanprofielen.

Deze profielen hebben alleen betrekking op de statische scan. Ze certificeren geen producttests, dekking, verpakking, externe controles of de volledige aanvaarding van de vrijgave door een kandidaat. Workflow-toegang maakt gebruik van de gekoppelde `config/quality/admission-policy.json` en `scripts/quality/admission-verdict.mjs`. Release-waarnemersprofielen blijven gescheiden; hun toepasselijke cheques en ontvangstbewijzen onafhankelijk inspecteren. De statische commando's van de volledige waarnemer worden gedeclareerd in `config/quality/release-green-static-profile.json`, inclusief `audit:deps`, mutatietestselectie en vertalingscontroles. De lader valideert npm-opdrachten tegen package.json en gemodelleerde CI/Quality -declaraties; het verwerpt drift in plaats van shell-tokens als argumenten uit te voeren. Vereiste SKIP/INCOMPLETE uitvoer van scanner kan PASS niet tot stand brengen. Het profiel registreert de externe uitsluitingen en vervangt geen gehoste dekking, testmatrices, pakket- of implementatiebewijs. De onderstaande proza-inventaris is een referentie, geen bewijs dat er daadwerkelijk een poort liep.

Scripts leven onder `scripts/check/` (beleidspoorten) en `scripts/quality/` (ratelengine). De CI bron van waarheid is `.github/workflows/ci.yml`.

### Gezondheid van de gepubliceerde documentatie

`.github/workflows/i18n-base-health.yml` observeert de status van de documentatie na geselecteerde push-ups naar `main` en `release/v*` en bij handmatige verzending. De filters omvatten documentatie, root Markdown, `llm.txt`, vertaling state/configuration en de relevante i18n-tooling. De enkele `Published base documentation health` taak maakt gebruik van gehoste Ubuntu en een deadline van vijf minuten. Het voert alleen-lezen-validatie uit en schrijft een diagnostisch ontvangstbewijs zonder een afhankelijkheidsinstallatie, vertaling of statusacceptatie.

`scripts/i18n/check-base-health.mjs` vereist geen inconsistenties in de bron-hash, ontbrekend doel, doel-hash, verouderde vertaling en sectie-cache. Het valideert ook de huidige kern document/locale scope en de geregistreerde herkomst ervan. Ongeldige context, onvolledige dekking of een onderbroken checker levert `INCOMPLETE` op; bevestigde drift produceert `FAIL`. Beide retourneren een mislukte afsluitstatus. De kassabon is gebonden aan de kassa SHA, workflow, uitvoering en poging, en wordt bewaard als `i18n-base-health-<sha>-<run>-<attempt>`.

Dit is een onafhankelijke observatie van de gepubliceerde basis. Er wordt geen PR of samenvoeggroepgebeurtenis, een vereiste PR controle, een NPM-alias of een profiellid met een statische scan toegevoegd. De onderliggende checker blokkeert ook alle vijf klassen in de absolute modus. De gewone PR voorbereiding staat los van de opname. Een succesvolle upload kan een mislukt gezondheidsresultaat niet omzetten in PASS.

Een gewone PR gebruikt `--preflight` met een basisrapport gegenereerd door `--baseline-evidence`. Het kan zijn dat een Engelse bron alleen in behandeling blijft als het volledige vertaalrecord en de daadwerkelijke doelbytes onveranderd zijn ten opzichte van die exacte basis. Nieuwe inconsistenties in doel- of sectie-cache blokkeren nog steeds, en onvolledig bewijs kan voorbereiding niet toestaan. Het rapport legt `preparationPending` en `mergeReady` afzonderlijk bloot: een succesvolle voorbereiding zorgt er niet voor dat vertalingen die in behandeling zijn, gereed zijn om samen te voegen. Vernieuw de betreffende spiegels in de samengestelde kandidaat vóór toelating. De vertrouwde Mergify-wachtrijkandidaat, `merge_group`, branch pushes en handmatige CI -runs gebruiken de absolute checker, zonder `--warn` of vergeving van erfelijke fouten. Ontbrekende doel-hashes en een omvang die wordt verkleind door verwijderde opgenomen kernbestanden kunnen geen succesvol absoluut oordeel opleveren.

### Vrijgave PR fast-path (`quality.yml`)

`.github/workflows/quality.yml` is een aanvulling op CI op main/release PRs, pusht naar `main`, verzendt en voegt groepen samen. PRs gebruikt padgefilterde snelle controles. De permanent uitgeschakelde dubbele build is verwijderd; de echte build/package/boot -cheques blijven in CI. De unitsuite en vitest draaien alleen in CI (`Unit Tests (N/12)` en `Vitest`).

| Functie                                          | Domein                                                                                                                                                                                                                                                  | Blokkeren            |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API documenten refs en docs-all                                                                                                                                                                                                          | Ja                   |
| `Fast Quality Gates`                             | Code PRs; statische controles, typecontrole, dashboardtypecontrole, beïnvloede unit-tests                                                                                                                                                               | Ja                   |
| `Forgotten sibling tests`                        | Code PRs; gewijzigde modules die zijn herleid tot statische consumenten en kandidaat-broer-/zustests; vat- en dynamische importpaden worden gerapporteerd als adviserende diagnostiek, met uitzonderingen waarnaar wordt verwezen op de toelatingslijst | **Adviserend**       |
| `No new ESLint warnings`                         | Code PRs; onderdrukkingsbewuste pluisjesbeschermer                                                                                                                                                                                                      | Ja, inclusief vorken |
| `Merge integrity (changelog + generated skills)` | Niet-concept PRs; changelog en gegenereerde vaardigheidssynchronisatie                                                                                                                                                                                  | Ja, inclusief vorken |

#### Vergeten broer-zustestrapport

`npm run check:forgotten-sibling-tests` draait als adviesstap van `Fast Quality Gates` en gebruikt de importresolver achter de test-impactkaart. Voor elke gewijzigde productiemodule rapporteert het deterministische `changed module/symbol -> static consumer -> candidate sibling test` ketens wanneer de kandidaattest afwezig is in het pull-request diff. Het Markdown-samenvatting en JSON resultaat worden behouden als het `forgotten-sibling-tests` -workflowartefact voor kalibratie voordat er een blokkering wordt uitgerold.

De wederuitvoer van vaten en de dynamische import zijn slechts oplossingsdiagnostiek; ze creëren nooit een blokkerende bevinding. Beoordeelde uitzonderingen live in `config/quality/forgotten-sibling-allowlist.json`. Elke inzending moet de consumenten- en kandidaattest een naam geven, een specifieke reden geven en een GitHub probleem of pull-verzoek koppelen. Verkeerd opgemaakte vermeldingen kunnen niet worden gesloten. Uitzonderingen kunnen een verwijderde kandidaattest of een diff die `.skip`/`.todo` toevoegt niet onderdrukken; beweringverzwakking en andere maskering blijven eigendom van de onafhankelijk blokkerende `check:test-masking` poort.

### Functie: `lint`

Draait op elke PR tot `main`. Blokken worden samengevoegd bij falen.

| Script (`npm run ...`)            | Valideert                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Blokkeren                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Node.js versie valt binnen het ondersteunde bereik                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                         |
| `check:cycles`                    | Circulaire import in heel `src/` + `open-sse/` (AST-gebaseerd, tsconfig `paths` opgelost). Bare verlaat 1 wanneer er een cyclus bestaat (fail-closed sinds #15281) en geeft de SCCs weer. `check:cycles:ratchet` (wat CI uitvoert) blokkeert wanneer het aantal het `metrics.cycles` plafond overschrijdt in `quality-baseline.json` — momenteel 14, `direction: down`, dus het kan alleen vallen (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja (ratel)                                 |
| `check:boundary`                  | `open-sse → src` koppeling: unieke import van bestand naar bestand vanuit de engine in de app (`scripts/quality/measure-boundary.mjs`; de edge-lijst is de v4 core/module-split -herstelachterstand). Kaal = -adviesrapport (hetzelfde als `quality:boundary`). `check:boundary:ratchet` (wat CI uitvoert, ook in de `quality.yml` fast-gates ratellus) blokkeert wanneer de telling het `metrics.boundaryOpenSseToSrc` plafond overschrijdt in `quality-baseline.json` — gezaaid op de gemeten 771, `direction: down`; `--update` verlaagt het alleen; basis-relatief op PRs (`--base-ref`, zie hieronder)                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja (ratel)                                 |
| `check:route-validation:t06`      | Zod schema's aanwezig op alle routes (Tier 6-beleid)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja                                         |
| `check:any-budget:t11`            | `@ts-expect-error // any` telling overschrijdt het budget niet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:provider-consistency`      | Elke provider in `providers.ts` heeft een overeenkomende vermelding in `providerRegistry.ts` (en omgekeerd, op de toelatingslijst)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                         |
| `check:model-lifecycle`           | De drie met de hand onderhouden routeringstabellen blijven consistent met de ingecheckte momentopname van de levenscyclus (#11503): `FITNESS_TABLE` (`taskFitness.ts`) scoort geen gepensioneerde id die `REGISTRY` kan routeren; elk `BUILT_IN_ALIASES` doel is aanwezig in `REGISTRY` en afwezig in de gepensioneerde ID-momentopname; elke gepensioneerde ID die nog in `REGISTRY`, wordt doorgestuurd of vermeld in `allowedRetiredInCatalog`; en geen enkele `DEFAULT_DEGRADATION_MAP` bron of -doel lijkt in die momentopname buiten gebruik te zijn gesteld. Dit bewijst niet dat een model momenteel wordt bediend door een live upstream. Offline vergelijkt — met `config/quality/model-lifecycle.json`, handmatig vernieuwd met `npm run quality:refresh-model-lifecycle` (netwerk; niet aangesloten op CI). `allowedRetiredInCatalog` is een burn-down ratel: voeg alleen een item toe met een trackingprobleem.                                                                                                                                              | Ja                                         |
| `check:fetch-targets`             | Elke `fetch("/api/...")` in `src/` aan de clientzijde wordt omgezet in een echte `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                         |
| `check:deps`                      | Alle `npm install` -able deps voor elke `package.json` in de repository bevinden zich in `dependency-allowlist.json`; nieuwe, niet-vastgezette of slopsquatted-pakketten gemarkeerd                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ja                                         |
| `audit:deps`                      | npm-audit van alle vijf onafhankelijke lockfiles (root, Electron, OpenCode -plug-ins v1/v2 en provider). Kritieke adviezen blokkeren; Hoge adviezen blijven zichtbare waarschuwingen. Missing/failed audits zijn INCOMPLETE en blok; vergrendelingshashes en rapporten per bereik blijven behouden.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ja                                         |
| `check:lockfile`                  | `package-lock.json` integriteit — https-register, integriteitshashes, geen hostoverschrijvingen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                         |
| `check:licenses`                  | SPDX -licentielijst voor productieafhankelijkheden                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                         |
| `check:tracked-artifacts`         | Geen build-artefacten / toegewijde `node_modules` symlinks (draait ook in husky pre-commit; pre-push is opzettelijk licht — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                         |
| `check:ai-attribution`            | Geen AI/bot `Co-Authored-By` trailer of AI-generatie-voettekst in PR commits, titel of hoofdtekst — Hard Rule #16 (in de `quality.yml` fast-gates-lus voor PR→ `release/**` — leest de payload van het evenement, no-op uit PRs — en een PR-only stap in `ci.yml` lint voor PR→ `main`; ook de husky `commit-msg` haak; menselijke co-auteurs toegestaan; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:vitest-exclusions`         | Elke Vitest uitsluiting noemt een trackingprobleem en verschijnt in `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja                                         |
| `check:file-size`                 | Bronbestanden (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) blijven binnen `cap` en testbestanden (`*.test.ts(x)`) binnen `testCap`; bestanden die zijn bevroren in `file-size-baseline.json` (`frozen` / `testFrozen`) mogen niet groter worden dan hun opgenomen grootte                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:error-helper`              | Foutreacties in executors/handlers gebruiken `buildErrorBody()` / `sanitizeErrorMessage()` (harde regel #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ja                                         |
| `check:migration-numbering`       | Migratie SQL bestanden zijn opeenvolgend genummerd, geen gaten of duplicaten                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ja                                         |
| `check:public-creds`              | Geen letterlijke OAuth `client_id`/`client_secret` of Firebase-websleutels buiten `publicCreds.ts` (harde regel #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja                                         |
| `check:db-rules`                  | Geen onbewerkte SQL buiten `src/lib/db/` -modules; geen vatenimport uit `localDb.ts` (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:known-symbols`             | Provider-uitvoerders, routeringsstrategieën en vertalers geregistreerd in hun verzendtabellen komen overeen met de bestanden op schijf — geen verweesde of niet-gedeclareerde symbolen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                         |
| `check:route-guard-membership`    | Elke route die een onderliggend proces voortbrengt, wordt geclassificeerd door `isLocalOnlyPath()` (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:test-discovery`            | Elk `*.test.ts` / `*.spec.ts` bestand in de repository wordt verzameld door minimaal één testrunner (ratel: weeslijst in `test-discovery-baseline.json` kan alleen maar kleiner worden)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:test-tla-order`            | Geen enkel `node:test` bestand onder `tests/unit` registreert een test, bereikt een `await` op het hoogste niveau en registreert vervolgens meer (#18045; ratel: `test-tla-order-allowlist.json` kan alleen maar krimpen)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                         |
| `check:agent-skills-sync`         | Gegenereerde artefacten met agentvaardigheden komen overeen met hun broncatalogus (geen drift)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:provider-asset-provenance` | Aanbieder logos/assets beschikt over een geregistreerde herkomstvermelding                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `lint:json`                       | JSON -configuratiebestanden parseren en voldoen aan de repo-lintregels                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `typecheck:core`                  | TypeScript -compilatie zonder fouten (alleen adviserende waarschuwingen)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ja                                         |
| `typecheck:noimplicit:core`       | Strikte `noImplicitAny` — toekomstgericht; veel reeds bestaande oproepsites hebben nog steeds annotaties nodig                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | **Adviserend** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` gericht op `src/app/(dashboard)/**` (#7033) — De samengestelde toelatingslijst van 27 bestanden van `typecheck:core` bevat geen dashboard TSX, en `next build` controleert dit ook nooit (`next.config.mjs` stelt `ignoreBuildErrors: true` in ), dus regressies van verweesde identificaties daar (#6625/#6909) waren onzichtbaar voor CI. Verschilt met een bevroren per-file/per-TS-code -tellingsbasislijn (`config/quality/dashboard-typecheck-baseline.json`, hetzelfde verouderde handhavingspatroon als `check:known-symbols`) Alleen — NEW fouten voorbij de basislijntelling mislukken de poort; ga verder met `--update` wanneer een reeds bestaande fout is verholpen.                                                                                                                                                                                                                                                                                                                                                                                  | Ja                                         |
| `check:build-typecheck`           | Controle van het productietype van de hele app via `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), de toelatingslijst van 27 bestanden van de oppervlakte `typecheck:core` en de dashboardpoort dekken niet. Verschilt ten opzichte van `config/quality/build-typecheck-baseline.json`; een nieuwe of verhoogde telling per (bestand, code) mislukt, een lagere telling vraagt u om te ratelen. `--update` weigert terwijl de run een nieuw of verhoogd paar bevat, tenzij `--force-regressions` wordt gepasseerd, en weigert een nieuw tot zwijgen gebracht bestand tenzij `--force-nocheck` wordt gepasseerd, dus het verbreden van de basislijn om groen te worden en het toestaan van een permanente stilte zijn twee afzonderlijke opzettelijke handelingen. Een kale `--force` wordt afgewezen. Scant ook de buildscope voor `@ts-nocheck` tegen `config/quality/ts-nocheck-baseline.json`, omdat een bestand dat dit gebruikt helemaal geen diagnostiek rapporteert en anders onzichtbaar zou zijn voor elke poort. | Ja                                         |

#### Twee typecheck-programma's antwoorden verschillend

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) en `check:build-typecheck` compileren verschillende programma's onder verschillende opties, en hetzelfde bestand kan in de ene schoon zijn en in de andere vol fouten.

`tsconfig.build.json` stelt `"strict": false` in, dus `noImplicitAny` is uitgeschakeld. De kernconfiguratie stelt een samengestelde toelatingslijst van 27 bestanden samen met strengere opties en volgt de importgrafiek van elk item, zodat bestanden die nooit in het buildprogramma verschijnen daar nog steeds worden gecontroleerd.

De consequentie is van belang bij het beoordelen of een bestand is getypt:**nuldiagnostiek onder `check:build-typecheck` betekent niet nul** . Door `@ts-nocheck` uit 26 bestanden te verwijderen, bleken er 23 schoon te zijn in het buildprogramma; zestien daarvan brachten ongeveer 120 impliciete fouten aan het licht in de strikte fout. Controleer beide voordat u een bestand opschoont.

### Functie: `quality-gate`

Loopt na `test-coverage`. Blokken worden samengevoegd bij falen.

| Script                       | Valideert                                                                                                                                                            | Blokkeren                     |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `quality:collect`            | Zendt `quality-metrics.json` uit (aantal ESLint waarschuwingen, dekking van samengevoegd Shard-rapport)                                                              | Ja (stroomopwaarts van ratel) |
| `quality:ratchet`            | Elke statistiek in `quality-baseline.json` is niet achteruitgegaan (ESLint waarschuwingen ≤ basislijn; dekking ≥ -basislijn)                                         | Ja                            |
| `check:duplication`          | Codeduplicatie (jscpd@4) overschrijdt de basislijn in `quality-baseline.json` niet                                                                                   | Ja                            |
| `check:complexity`           | De cyclomatische complexiteit op bestandsniveau overschrijdt de limiet niet (kern ESLint `complexity` + `max-lines-per-function`)                                    | Ja                            |
| `check:cognitive-complexity` | Cognitieve complexiteit ratel (`eslint-plugin-sonarjs`) — aparte ESLint pass; CI wordt zowel samengevoegd als de enkele `check:complexity-ratchets` -stap uitgevoerd | Ja                            |
| `check:dead-code`            | Ongebruikte export-/bestandsratel (knip) gaat niet achteruit ten opzichte van de basislijn                                                                           | Ja                            |
| `check:compression-budget`   | Compressiebenchmarkbudget — tokenbesparingsvloeren per motor mogen niet achteruitgaan                                                                                | Ja                            |
| `check:type-coverage`        | Percentage getypte ratel (`type-coverage`) gaat niet achteruit; omvat grotendeels `typecheck:noimplicit:core`                                                        | Ja                            |

### Vacatures: `codeql-scan` en `codeql-admission`

`codeql-scan` produceert alle geconfigureerde analysecategorieën. Nadat die taak is geslaagd, valideert `codeql-admission` de exacte uploads en het ratelsignaal voor kandidaten. Beide zijn vereiste afhankelijkheden van `Gate / CI`, inclusief kandidaten die alleen documenten bevatten. De administratieve activerings- en canarische vereisten worden hieronder beschreven onder "CodeQL ratel".

| Script                 | Valideert                                                                                                                                                                                                           | Blokkeren |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:codeql-ratchet` | Kandidaat- ref/SHA en alle geconfigureerde analysecategorieën moeten actueel zijn vóór het waarschuwingssignaal; ontbrekende bewijsblokken. De globale inventaris blijft gescheiden —, zie "CodeQL ratel" hieronder | Ja        |

### Functie: `quality-extended`

De functie blokkeert geschikte kandidaten. Bundelgrootte, geheime bevindingen, kwetsbaarheidsbevindingen, workflowbevindingen en OpenAPI wijzigingen worden gecontroleerd met de vereiste ratels. Diagnostiek van circulaire afhankelijkheid blijft adviserend. Installatie van de scanner is vereist: `scripts/ci/install-quality-scanners.sh` levert vastgezette versies en verspreidt installatiefouten. Ontbrekende gereedschappen, ongeldige rapporten of ontbrekende basislijnen verlaten de vereiste scannerpoort INCOMPLETE.

| Script                   | Valideert                                                                                                                                                                                                              | Blokkeren                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `check:circular-deps`    | Geen circulaire afhankelijkheden (dpdm)                                                                                                                                                                                | **Adviserend**                                   |
| `check:bundle-size`      | De bundelgrootte overschrijdt de limiet niet; een niet-beschikbare meting mislukt                                                                                                                                      | **Blokkeren met --ratchet**                      |
| `check:secrets`          | De bevindingen van Gitleak gaan niet achteruit; vereiste scans weigeren ontbrekende tools/source/baseline, mislukte scans en ongeldige rapporten                                                                       | **Blokkeren met --ratchet**                      |
| `check:vuln-ratchet`     | Kwetsbaarheden in afhankelijkheid nemen niet af; vereiste scans wijzen ontbrekende tools, ongeldige rapporten of ontbrekende basislijnen af                                                                            | **Blokkeren met --ratchet**                      |
| `check:workflows`        | Workflow-lint (actionlint + zizmor); missing/broken -scanners, ongeldige rapporten of ontbrekende ratelbasislijn mislukken als INCOMPLETE. Geldige bevindingen volgen het geselecteerde strict/advisory/ratchet beleid | Uitvoering vereist; zizmor ratelblokkering in CI |
| `check:openapi-breaking` | Openbaar API contract tegen vastgelegde gebeurtenistoezeggingen (PR merge-base, push before, merge-group base; scheduled/manual checkout eerste ouder); vereiste meting mislukt gesloten                               | **Blokkeren met --ratchet**                      |

### Functie: `docs-sync-strict`

Voor pull-aanvragen naar `main` of `release/**` wordt deze taak alleen uitgevoerd voor niet-conceptkandidaten (of vertrouwde wachtrij) die zijn geclassificeerd als documentatie- of codewijzigingen. Het draait ook op niet-PR CI evenementen; De push-trigger van deze workflow heeft alleen betrekking op `main`, niet `release/**`. Een stap die niet nul is, blokkeert de taak; bevindingen die alleen gerapporteerd worden en de onderstaande gedocumenteerde uitzonderingen zijn dat niet.

| Script                         | Valideert                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Blokkeren                                                                                                                                  |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `check:docs-all`               | Metapoort die de zeven onderstaande subpoorten opeenvolgend bestuurt                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                                                                                                                         |
| ↳ `check:docs-sync`            | Consistentie van Package/OpenAPI/CHANGELOG versie, exacte `llm.txt` spiegels, vertaalde CHANGELOG section/size invarianten en afwezigheid van verouderde dubbele documenten                                                                                                                                                                                                                                                                                                                                 | Ja                                                                                                                                         |
| ↳ `check:docs-frontmatter`     | Samengestelde documentatiepagina's bevatten geldige frontmatter-titels                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja                                                                                                                                         |
| ↳ `check:docs-counts`          | Telinvarianten met een hoog vertrouwen zijn strikt; heuristische controles op het aantal bestanden waarschuwen alleen tenzij het script `--strict` ontvangt (de CI -metapoort passeert dit niet)                                                                                                                                                                                                                                                                                                            | Strikte niveaublokkering; advies op zacht niveau                                                                                           |
| ↳ `check:env-doc-sync`         | Bron-env-lezingen, `.env.example` en `docs/reference/ENVIRONMENT.md` komen overeen na de expliciete acceptatielijsten voor negeren, alleen doc en alleen env                                                                                                                                                                                                                                                                                                                                                | Ja, buiten de gedocumenteerde toelatingslijsten                                                                                            |
| ↳ `check:deprecated-versions`  | Rapporteert mogelijk verouderde versies buiten veilige historische contexten en verouderde updatedatums, met uitzondering van genegeerde documenten                                                                                                                                                                                                                                                                                                                                                         | Advies bij huidige CI -bedrading (`--strict` is niet geslaagd)                                                                             |
| ↳ `check:doc-links`            | Interne prijsverlagingslinks in documenten worden omgezet in echte bestanden (`[text]`/`(path)` -formulier)                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                                                                                                                         |
| ↳ `check:fabricated-docs`      | Routes, env vars, CLI -opdrachten, hook-namen en bestandspaden die in documenten worden genoemd, bestaan in de codebase. Harde poort via `--strict`; soft-fail zonder vlag.                                                                                                                                                                                                                                                                                                                                 | Ja (via `--strict` in CI)                                                                                                                  |
| `check:cli-i18n`               | Er zijn gebruikte CLI `t()` sleutels aanwezig in `en`; `pt-BR` behoudt elke sectie op het hoogste niveau; `zh-CN` en `zh-TW` bevatten elke sleutel van `en`                                                                                                                                                                                                                                                                                                                                                 | Ja                                                                                                                                         |
| `check:openapi-coverage`       | OpenAPI specificatie omvat op zijn minst een ratelvloer van echte routes                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                                                                                                                         |
| `check:openapi-security-tiers` | Aangegeven `x-loopback-only`/`x-always-protected` -annotaties moeten worden ondersteund door `routeGuard.ts`; parser en voorwaartse mismatches blokkeren. De omgekeerde controle op ontbrekende `x-loopback-only` onder voorvoegsels die alleen lokaal zijn, waarschuwt, en routes met alleen patronen worden uitgesloten van die omgekeerde pas.                                                                                                                                                           | Parser/forward controleert blokkering; advies inzake omgekeerde controle                                                                   |
| `check:openapi-routes`         | Elk `/api...` pad in `openapi.yaml` wordt parameterongevoelig omgezet in een echte route na de gerechtvaardigde `KNOWN_STALE_SPEC` toelatingslijst; verouderde vermeldingen op de toelatingslijst mislukken ook                                                                                                                                                                                                                                                                                             | Ja                                                                                                                                         |
| `check:docs-symbols`           | Interne `/api/...` URL verwijzingen in canonieke niet-spiegeldocumenten leiden tot een echte route of routefamilie; proxy/upstream/placeholder/file referenties en gerechtvaardigde `KNOWN_STALE_DOC_REFS` vermeldingen worden uitgesloten, en verouderde vermeldingen op de toelatingslijst mislukken                                                                                                                                                                                                      | Ja                                                                                                                                         |
| `i18n translation drift`       | Voor absolute toelating zijn geen inconsistenties in de bron, ontbrekend doel, doel-hash, verouderde vertaling en sectie-cache vereist. Bij de gewone PR voorbereiding kan exact erfelijk bewijsmateriaal of een in behandeling zijnde wijziging in het Engels behouden blijven met ongewijzigde volledige status- en doelbytes; het rapport verklaart afzonderlijk de bereidheid tot fusie. Ontbrekende doel-hashes en onvolledig basisbewijsblok. Een ontbrekende cache voor oudere secties is geen fout. | Alle vijf de klassen blokkeren de toegang tot queue/base ; gewone voorbereiding staat alleen bewezen geërfd of alleen Engelstalig werk toe |

De twaalf README SVGs onder `docs/diagrams/` worden gegenereerd (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` regenereert ze allemaal). Elk heeft een byte-compare unit-test (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) die mislukt wanneer het vastgelegde bestand verouderd is, en `check:docs-counts` leest canonieke getallen van hun `<text>` knooppunten — Daarom houdt de schetsstap elke omlijnde string in het bestand als onzichtbare `<text>`. De SVG -controle op canonieke nummers leest de bestanden die zijn vermeld in `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` en `tier-flow-light.svg`; de claims voor gratis eeuwigheid, catalogusinvoer, terugkerende pool en scorefactoren luiden ook `promise-pillars.svg`, `free-tier-budget.svg` en `strategies-grid.svg`. `free-tier-budget.svg` haalt zijn cijfers uit de live cataloguslader, dus een wijziging in `FREE_MODEL_BUDGETS` of in de weergavenaam van een provider geeft CI rood totdat dat bestand opnieuw is gegenereerd.

### Functie: `i18n-ui-coverage`

| Script                            | Valideert                                                                                                                                                                                                                         | Blokkeren     |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check-ui-keys-coverage` (inline) | UI i18n sleuteldekking is ≥ 65%                                                                                                                                                                                                   | Ja            |
| `check-ui-value-drift` (inline)   | Een herschreven Engels **waarde** laat geen verouderde vertaling achter                                                                                                                                                           | Ja            |
| `check-new-key-coverage` (inline) | A **nieuw** De Engelse sleutel wordt in elke landinstelling — vertaald en een `__MISSING__:` markering wordt afgewezen                                                                                                            | Ja            |
| `check-translation-ratio`         | De reële vertalingsratio per landinstelling (identiek aan het Engels / tijdelijke aanduiding / ontbrekende bladeren buiten de toelatingslijst) mag niet groter zijn dan `config/quality/i18n-translation-baseline.json` + speling | **Blokkeren** |

Heeft `fetch-depth: 0` — nodig, de waarde-drift-poort diffundeert `en.json` tegen de samenvoegbasis.

#### `check-ui-value-drift` — poort voor verouderde vertaling

Vangt de ene i18n-regressie op die de andere poorten structureel niet kunnen zien: een Engelse waarde wordt herschreven en de vertalingen afgeleid van het _vorige_ Engels blijven achter, zodat niet-Engelse gebruikers zelfverzekerd geformuleerde, nu verkeerde teksten blijven lezen.

Dit is echt verzonden. `oauthModal.googleOAuthWarning` werd herschreven toen de Antigravity inloghelper landde (#5203);**39 van 43 locaties** hield tekst bij waarin operators werden verteld "de volledige URL te kopiëren en hieronder te plakken" — een stroom die niet kan worden voltooid voor die provider. Het bleef tot #8463 onopgemerkt omdat:

- `sync-ui-keys` vult alleen sleutels aan die dat wel zijn **afwezig** , nooit degenen die dat wel zijn **muf** ;
- `check-ui-keys-coverage` telt sleutel _aanwezigheid_, dus een verouderde vertaling scoort als gedekt;
- `check-translation-drift` volgt de `docs/i18n/<locale>/**.md` documentatie, spiegelt — en leest nooit `src/i18n/messages/*.json`. Blokkeren van taak `docs-sync-strict` sinds de hersynchronisatie van 2026-09: bewerk een kerndocument → `npm run i18n:run -- --files=<doc>` (sectieniveau, goedkoop).

**Diff-bewust, niet gebaseerd op de basislijn.** Het vergelijkt `en.json` op de samenvoegbasis met de werkboom; voor elke sleutel waarvan de Engelse waarde is veranderd, is elke landinstelling die nog steeds een onaangeroerde vertaling bevat verouderd. Dit met opzet **bevriest reeds bestaande schulden** — a diff kan niet onthullen uit welk oud Engels een al lang bestaande vertaling afkomstig is, dus beoordeelt de poort alleen wat de huidige verandering raakt. Het alternatief (een hash-basislijn per sleutel) zou een ~ 600 KB gegenereerd bestand kosten, 3 × de grootste bestaande basislijn, die op elke i18n PR draait.

Twee manieren om hieraan te voldoen:

1. de betreffende vertalingen bijwerken, of
2. stel ze in op `__MISSING__:<new english>` — de runtime serveert vervolgens het gecorrigeerde Engels (`src/i18n/request.ts::deepMergeFallback`, #7258) en de sleutelwachtrijen voor vertaling.

Als de string **betekenis** veranderd, liever **de sleutel hernoemen** : een nieuwe sleutel kan geen verouderde vertaling overnemen. Dat is het patroon dat #8463 gebruikte.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

De waardendrift- en nieuwe-sleutelpoorten delen één onveranderlijke vergelijking van `scripts/i18n/resolve-ui-diff-base.mjs`. De workflow geeft dezelfde basis, basistip en kandidaat SHAs door aan beide controles. PR/base-retarget, push- en merge-group-runs gebruiken hun gebeurteniscontext. Voor het verzenden van een kandidaat-vertakking is de exacte open PR of de expliciete `i18n_base_sha` invoer vereist. Verzending of geplande observatie van `main` of `release/vX.Y.Z` zonder die invoer vergelijkt de laatste commit met zijn eerste ouder; het is geen controle van alle geërfde vertaalschulden. Lokale aanroep vereist een expliciete vergelijkingsbasis, bijvoorbeeld de bovenstaande `BASE_REF` -opdracht.

Ontbrekende of onduidelijke vergelijkingscontext, een onleesbare of ongeldige vereiste catalogus en een gewijzigde kandidaat produceren `INCOMPLETE` met exitcode **2** , ook in de waarschuwingsmodus. Catalogus leest gebruik `scripts/i18n/read-ui-catalog.mjs`; leesfouten worden niet vervangen door lege objecten. Noch een onbeschikbare basis, noch een onvolledige invoer brengt PASS tot stand.

### Functie: `i18n`

Volledige i18n-validatiematrix (één taak per landinstelling). De gehele functie is adviserend.

| Script                          | Valideert                              | Blokkeren                                                  |
| ------------------------------- | -------------------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | Volledigheid van de vertaling per land | **Adviserend** (`continue-on-error: true` op de hele klus) |

### Functie: `pr-test-policy`

Werkt alleen op pull-aanvragen.

| Script                 | Valideert                                                                                                                           | Blokkeren |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PRs die de productiecode in `src/`, `open-sse/`, `electron/` of `bin/` wijzigt, moet tests bevatten of bijwerken (Harde regel #8)   | Ja        |
| `check:test-masking`   | Gewijzigde testbestanden verminderen het netto aantal beweringen niet en voegen geen `assert.ok(true)` tautologieën toe             | Ja        |
| `check:pr-evidence`    | PR orgaan citeert test/VPS bewijs voor de verandering (mechaniseert Hard Rule #18 door PR -proza — kwetsbaar te maken, zie Backlog) | Ja        |

### Functie: `test-vitest`

Heeft de `changes` -classificatietaak nodig. Toepasselijke matrixscherven blokkeren samenvoeging bij falen.

| Suite            | Valideert                                                | Blokkeren                                                                                                                        |
| ---------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 tools), autoCombo, cache — vitest runner | Ja                                                                                                                               |
| `test:vitest:ui` | UI componenttests — vitest runner                        | **Blokkeren** Reeds bestaande fouten — worden expliciet uitgesloten in `vitest.config.ts`; nieuwe mislukkingen mislukken de klus |

### Nachtelijke workflows (gepland, adviserend)

Deze draaien op een cron-schema (en `workflow_dispatch`), nooit op PRs. Ze zijn allemaal adviserend.

| Werkstroom             | Valideert                                                                                                                                                             | Blokkeren      |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | snelle controle van eigenschappen met een willekeurig + hoog aantal runs                                                                                              | **Adviserend** |
| `nightly-resilience`   | heap-groeipoort, chaosfout-injectie, k6 load/soak                                                                                                                     | **Adviserend** |
| `nightly-llm-security` | promptfoo injectiebescherming (blokkeermodus) + garak-sondes (overgeslagen zonder leveranciersgeheim)                                                                 | **Adviserend** |
| `nightly-schemathesis` | OpenAPI -contractfuzzing (schemathese) tegen een live OmniRoute met behulp van `docs/openapi.yaml` — overtredingen van specificaties / onverwerkte 500's (Fase 8 B.4) | **Adviserend** |
| `nightly-mutation`     | Stryker-mutatietests scoren over de snelle unit-lane — overlevende mutanten aan het oppervlak zijn zwak beweert                                                       | **Adviserend** |
| `nightly-compat`       | Compatibiliteitsmatrix voor knooppuntmotoren binnen de ondersteunde `engines.node` bereiken                                                                           | **Adviserend** |

Prestatiebasislijnen (heap, TTFB, buildtijd) worden vastgelegd, niet gated: zie [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
