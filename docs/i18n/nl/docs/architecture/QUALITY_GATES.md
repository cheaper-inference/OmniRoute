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

De CI en Quality Gates-workflows geven elk een stabiel oordeel: `Gate / CI` en `Gate / Quality`. Hun geversieerde toelatingsbeleid somt elke upstream-baan op zoals vereist of adviserend. Een toepasselijke vereiste taak moet slagen: ontbrekende, geannuleerde, overgeslagen, lopende en onbekende resultaten kunnen PASS niet vaststellen. Een geldige classificatie voor alleen documenten of alleen voor catalogi kan ervoor zorgen dat een codestrook niet van toepassing is; een concept- PR is geen geaccepteerde kandidaat. Een `hotfix` label doet geen afstand van bewijs.

Beide workflows omvatten PRs in main/release takken, pushes naar `main`, handmatige verzending en samenvoegingsgroepgebeurtenissen. Push, dispatch en merge-group voeren de volledige selectie uit. Pushs naar `release/**` starten ze niet (18-10-2026): elke verandering voerde de matrix al uit op zijn PR en de samengevoegde combinatie is de taak van Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks en merge-groepen gebruiken gehoste hardlopers voor taken die anders zelf-gehoste hardlopers selecteren; Er moet vóór de uitrol voldoende gehoste capaciteit worden geverifieerd.

Een gewone PR voert de snelle selectie uit. De `full-code` en `full-code-e2e` lanen van het toelatingsbeleid (E2E, integratie, pakketartefact, Electron smoke, Bun SQLite, ecosysteem- en protocolclients) worden alleen uitgevoerd op een samenvoegwachtrijconcept of op een volledige run: `gh workflow run ci.yml --ref <branch>`.

Elke JSON bon identificeert de uitgecheckte SHA, de workflowrun en de poging. De CLI wijst een checkout/event SHA mismatch af. Workflowtests binden het beleidslidmaatschap aan de `needs` lijst van de vonnistaak, zodat een nieuwe of verwijderde rij niet stilletjes kan verdwijnen. De bonnen hebben betrekking op hun eigen workflow, niet op de publicatie, implementatie of op de interne onderdelen van een bestaande adviesscanner. Het activeren van beide chequenamen in filiaalregels is een afzonderlijke administratieve wijziging; het toevoegen van deze banen beschermt op zichzelf niet een vestiging.

### Wachtrij samenvoegen

Het `queue` label stuurt een PR naar de Mergify-wachtrij (`.mergify.yml`). Mergify opent een concept PR op een `mergify/merge-queue/` vertakking, CI voert daar de volledige selectie uit, en de originele PR wordt samengevoegd wanneer `Gate / CI`, `Gate / Quality` en `Merge integrity (changelog + generated skills)` passeren.

Mergify schrijft het wachtrijoverzicht in de conceptbeschrijving, en andere apps kunnen dit ook bewerken. Een `pull_request` `edited` -gebeurtenis op zo'n concept heeft zijn eigen concurrency-groep (`-queue-edit-<run_id>`), zodat het de echte run van het concept niet kan annuleren, en het slaat de poort en de matrix over. Alleen `Merge integrity` draait nog. De overgeslagen poorttaak heeft een andere controlenaam, omdat Mergify een overgeslagen `Gate / CI` als een mislukte controle leest en de PR uit de wachtrij haalt.

Na een dequeue wordt de PR bij een push niet altijd opnieuw in de wachtrij geplaatst. Reageer `@mergifyio queue` erop.

### Behouden bewijsmateriaal in de acceptatieverminderaar

`scripts/quality/validate-release-acceptance.mjs` reduceert een aangeleverd plan en zijn manifesten; er wordt niet aangetoond dat het plan de volledige releasepijplijn bestrijkt. De rapporten stellen expliciet `releaseAcceptance: false` vast, zelfs als dat plan `VERIFIED` is. De `release-acceptance.yml` workflow maakt nog steeds gebruik van schaduwarmaturen, geen echte bouw-, pakket-, opstart- of promotiebonnen.

De CLI vereist dat de `--evidence-root` het bewaarde bewijsmateriaal verifieert. Bestanden worden omgezet als `<evidence-root>/<artifact_id>/<member>` en gehasht als SHA-256. Een PASS -record zonder bewijs, een ontbrekend of gewijzigd bestand, een onveilig pad of een symlink verhindert verificatie. Ontbrekende bestanden zijn niet hetzelfde als lege succesvolle logboeken. Bestaande SHA/run/attempt -controles blijven onafhankelijk: overeenkomende bytes kunnen een verouderd ontvangstbewijs niet redden. Bestandsintegriteit is geen bewijs van de authenticiteit van de uitvoering of van artefactpromotie.

### Statische scaninventaris

De npm-alias-inventaris met versiebeheer en het lidmaatschap van de statische scan zijn live in `config/quality/gate-manifest.json`. Voer `npm run check:gate-manifest` uit om scriptnamen en exacte opdrachten tegen `package.json` te valideren; toevoegingen, verwijderingen en opdrachtdrift mislukken zowel de lokale hook als de veranderingsclassificatietaken in CI. Een alias is geen workflowtaak, matrixinstantie of testcase: deze tellingen mogen niet als uitwisselbaar worden gepresenteerd.

Gebruik `npm run quality:scan -- --list` of `npm run quality:scan:fast -- --list` om de geselecteerde aliassen te inspecteren zonder ze uit te voeren. De runner roept het npm-ingangspunt aan, zodat de runtime ervan (inclusief Bun indien geconfigureerd) behouden blijft. Het manifest registreert aliassen buiten deze profielen, zoals afzonderlijk aangeroepen, en onderhoudsopdrachten zijn verboden in alleen-lezen scanprofielen.

Deze profielen hebben alleen betrekking op de statische scan. Ze certificeren geen producttests, dekking, verpakking, externe controles of de volledige aanvaarding van de vrijgave door een kandidaat. Workflow-toegang maakt gebruik van de gekoppelde `config/quality/admission-policy.json` en `scripts/quality/admission-verdict.mjs`. Release-waarnemersprofielen blijven gescheiden; hun toepasselijke cheques en ontvangstbewijzen onafhankelijk inspecteren. De statische opdrachten van de volledige waarnemer worden gedeclareerd in `config/quality/release-green-static-profile.json`, inclusief `audit:deps`, mutatietestselectie en vertalingscontroles. De lader valideert npm-opdrachten tegen package.json en gemodelleerde CI/Quality declaraties; het verwerpt drift in plaats van shell-tokens als argumenten uit te voeren. Vereiste scanner SKIP/INCOMPLETE uitvoer kan PASS niet tot stand brengen. Het profiel registreert de externe uitsluitingen en vervangt geen gehoste dekking, testmatrices, pakket- of implementatiebewijs. De onderstaande proza-inventaris is een referentie, geen bewijs dat er daadwerkelijk een poort liep.

Scripts leven onder `scripts/check/` (beleidspoorten) en `scripts/quality/` (ratelengine). De CI bron van waarheid is `.github/workflows/ci.yml`.

### Laat PR fast-path vrij (`quality.yml`)

`.github/workflows/quality.yml` is een aanvulling op CI op main/release PRs, pusht naar `main`, verzendt en voegt groepen samen. PRs gebruikt padgefilterde snelle controles. De permanent uitgeschakelde dubbele build is verwijderd; de echte build/package/boot -cheques blijven in CI. De unit suite en vitest draaien alleen in CI (`Unit Tests (N/8)` en `Vitest`).

| Functie                                          | Domein                                                                                                                              | Blokkeren            |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs en docs-all                                                                                            | Ja                   |
| `Fast Quality Gates`                             | Code PRs; statische controles, typecontrole, dashboardtypecontrole, beïnvloede unit-tests, vergeten broers en zussen-tests (advies) |
| `No new ESLint warnings`                         | Code PRs; onderdrukkingsbewuste pluisjesbeschermer                                                                                  | Ja, inclusief vorken |
| `Merge integrity (changelog + generated skills)` | Niet-concept PRs; changelog en gegenereerde vaardigheidssynchronisatie                                                              | Ja, inclusief vorken |

#### Vergeten broer-zustestrapport

`npm run check:forgotten-sibling-tests` draait als een adviesstap van `Fast Quality Gates` en gebruikt de importresolver achter de test-impactkaart. Voor elke gewijzigde productiemodule rapporteert het deterministische `changed module/symbol -> static consumer -> candidate sibling test` ketens wanneer de kandidaattest afwezig is in de pull-request diff. De Markdown-samenvatting en JSON resultaat worden behouden als het `forgotten-sibling-tests` workflowartefact voor kalibratie voordat er een blokkering wordt uitgerold.

De wederuitvoer van vaten en de dynamische import zijn slechts oplossingsdiagnostiek; ze creëren nooit een blokkerende bevinding. Beoordeelde uitzonderingen live in `config/quality/forgotten-sibling-allowlist.json`. Elke inzending moet de consumenten- en kandidaattest een naam geven, een specifieke reden geven en een GitHub probleem of pull-verzoek koppelen. Verkeerd opgemaakte vermeldingen kunnen niet worden gesloten. Uitzonderingen kunnen een verwijderde kandidaattest of een diff die `.skip`/`.todo` toevoegt niet onderdrukken; beweringverzwakking en andere maskering blijven eigendom van de onafhankelijk blokkerende `check:test-masking` poort.

### Functie: `lint`

Draait op elke PR tot `main`. Blokken worden samengevoegd bij falen.

| Script (`npm run ...`)            | Valideert                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Blokkeren                                  |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Node.js versie ligt binnen het ondersteunde bereik                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:cycles`                    | Circulaire import in heel `src/` + `open-sse/` (AST-gebaseerd, tsconfig `paths` opgelost). Bare verlaat 1 wanneer er een cyclus bestaat (fail-closed sinds #15281) en geeft de SCCs weer. `check:cycles:ratchet` (wat CI uitvoert) blokkeert wanneer het aantal het `metrics.cycles` plafond overschrijdt in `quality-baseline.json` — momenteel 14, `direction: down`, dus het kan alleen vallen (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja (ratel)                                 |
| `check:boundary`                  | `open-sse → src` koppeling: unieke import van bestand naar bestand vanuit de engine in de app (`scripts/quality/measure-boundary.mjs`; de edge-lijst is de v4 core/module-split herstelachterstand). Kale = adviesrapport (hetzelfde als `quality:boundary`). `check:boundary:ratchet` (wat CI uitvoert, ook in de `quality.yml` fast-gates ratellus) blokkeert wanneer de telling het `metrics.boundaryOpenSseToSrc` plafond overschrijdt in `quality-baseline.json` — gezaaid op de gemeten 771, `direction: down`; `--update` verlaagt het alleen; basis-relatief op PRs (`--base-ref`, zie hieronder)                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja (ratel)                                 |
| `check:route-validation:t06`      | Zod schema's aanwezig op alle routes (Tier 6-beleid)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                         |
| `check:any-budget:t11`            | `@ts-expect-error // any` -telling overschrijdt het budget niet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ja                                         |
| `check:provider-consistency`      | Elke provider in `providers.ts` heeft een overeenkomende vermelding in `providerRegistry.ts` (en omgekeerd, op de toelatingslijst)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:model-lifecycle`           | De drie met de hand onderhouden routeringstabellen blijven consistent met de ingecheckte momentopname van de levenscyclus (#11503): `FITNESS_TABLE` (`taskFitness.ts`) scoort geen gepensioneerde id die `REGISTRY` kan routeren; elk `BUILT_IN_ALIASES` doel is aanwezig in `REGISTRY` en afwezig in de gepensioneerde-id-snapshot; elke gepensioneerde id die nog in `REGISTRY`, wordt doorgestuurd of vermeld in `allowedRetiredInCatalog`; en geen enkele `DEFAULT_DEGRADATION_MAP` bron of -doel lijkt in die momentopname met pensioen te zijn gegaan. Dit bewijst niet dat een model momenteel wordt bediend door een live upstream. Offline — vergelijkt met `config/quality/model-lifecycle.json`, handmatig vernieuwd met `npm run quality:refresh-model-lifecycle` (netwerk; niet aangesloten op CI). `allowedRetiredInCatalog` is een burn-down ratel: voeg alleen een item toe met een trackingprobleem.                                                                                                                                          | Ja                                         |
| `check:fetch-targets`             | Elke `fetch("/api/...")` in `src/` aan de clientzijde wordt omgezet in een echte `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                         |
| `check:deps`                      | Alle `npm install` -able deps voor elke `package.json` in de repository zijn in `dependency-allowlist.json`; nieuwe, niet-vastgezette of slopsquatted-pakketten gemarkeerd                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                         |
| `audit:deps`                      | npm-audit van alle vijf onafhankelijke lockfiles (root, Electron, OpenCode -plug-ins v1/v2 en provider). Kritieke adviezen blokkeren; Hoge adviezen blijven zichtbare waarschuwingen. Missing/failed audits zijn INCOMPLETE en block; vergrendelingshashes en rapporten per bereik blijven behouden.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                         |
| `check:lockfile`                  | `package-lock.json` integriteit — https-register, integriteitshashes, geen host-overschrijvingen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                         |
| `check:licenses`                  | SPDX -licentielijst voor productieafhankelijkheden                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:tracked-artifacts`         | Geen build-artefacten / toegewijde `node_modules` symlinks (draait ook in husky pre-commit; pre-push is opzettelijk licht — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:ai-attribution`            | Geen AI/bot `Co-Authored-By` trailer of AI-generatie voettekst in PR commits, titel of hoofdtekst — Hard Rule #16 (in de `quality.yml` fast-gates loop voor PR→ `release/**` — leest de payload van de gebeurtenis, no-op off PRs — en een PR-only stap in `ci.yml` lint voor PR→ `main`; ook de husky `commit-msg` hook; menselijke co-auteurs toegestaan; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:vitest-exclusions`         | Elke Vitest -uitsluiting noemt een trackingprobleem en verschijnt in `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:file-size`                 | Bronbestanden (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) blijven binnen `cap` en testbestanden (`*.test.ts(x)`) binnen `testCap`; bestanden die zijn bevroren in `file-size-baseline.json` (`frozen` / `testFrozen`) mogen niet groter worden dan hun geregistreerde grootte                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:error-helper`              | Foutreacties in executors/handlers gebruiken `buildErrorBody()` / `sanitizeErrorMessage()` (harde regel #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:migration-numbering`       | Migratie SQL bestanden zijn opeenvolgend genummerd, geen gaten of duplicaten                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:public-creds`              | Geen letterlijke OAuth `client_id`/`client_secret` of Firebase Web-sleutels buiten `publicCreds.ts` (harde regel #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:db-rules`                  | Geen onbewerkte SQL buiten `src/lib/db/` modules; geen vatenimport uit `localDb.ts` (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                         |
| `check:known-symbols`             | Uitvoerders van providers, routeringsstrategieën en vertalers die zijn geregistreerd in hun verzendtabellen komen overeen met de bestanden op schijf — geen verweesde of niet-gedeclareerde symbolen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                         |
| `check:route-guard-membership`    | Elke route die een onderliggend proces voortbrengt, wordt geclassificeerd door `isLocalOnlyPath()` (Harde regels #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja                                         |
| `check:test-discovery`            | Elk `*.test.ts` / `*.spec.ts` -bestand in de repository wordt verzameld door ten minste één testrunner (ratel: weeslijst in `test-discovery-baseline.json` kan alleen kleiner worden)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:test-tla-order`            | Geen enkel `node:test` -bestand onder `tests/unit` registreert een test, raakt een `await` op het hoogste niveau en registreert vervolgens meer (#18045; ratel: `test-tla-order-allowlist.json` kan alleen maar krimpen)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ja                                         |
| `check:agent-skills-sync`         | Gegenereerde artefacten met agentvaardigheden komen overeen met hun broncatalogus (geen drift)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:provider-asset-provenance` | Aanbieder logos/assets beschikt over een geregistreerde herkomstvermelding                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `lint:json`                       | JSON -configuratiebestanden parseren en voldoen aan de repo-lintregels                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `typecheck:core`                  | TypeScript -compilatie zonder fouten (alleen adviserende waarschuwingen)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ja                                         |
| `typecheck:noimplicit:core`       | Strikte `noImplicitAny` — toekomstgericht; veel reeds bestaande oproepsites hebben nog steeds annotaties nodig                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | **Adviserend** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` scoped naar `src/app/(dashboard)/**` (#7033) — `typecheck:core`'s samengestelde toelatingslijst van 27 bestanden bevat geen dashboard TSX, en `next build` controleert het ook nooit (`next.config.mjs` sets `ignoreBuildErrors: true`), dus regressies van verweesde identificaties daar (#6625/#6909) waren onzichtbaar voor CI. Verschilt met een bevroren per-file/per-TS-code -tellingsbasislijn (`config/quality/dashboard-typecheck-baseline.json`, hetzelfde verouderde handhavingspatroon als `check:known-symbols`) — alleen NEW fouten voorbij de basislijntelling mislukken de poort; ga verder met `--update` wanneer een reeds bestaande fout is verholpen.                                                                                                                                                                                                                                                                                                                                                                                | Ja                                         |
| `check:build-typecheck`           | Controle van het productietype van de hele app via `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), de toelatingslijst van 27 bestanden van de oppervlakte `typecheck:core` en de dashboardpoort dekken niet. Verschilt tegen `config/quality/build-typecheck-baseline.json`; een nieuwe of verhoogde telling per (bestand, code) mislukt, een lagere telling vraagt u om te ratelen. `--update` weigert terwijl de run een nieuw of verhoogd paar bevat, tenzij `--force-regressions` wordt gepasseerd, en weigert een nieuw tot zwijgen gebracht bestand tenzij `--force-nocheck` wordt gepasseerd, dus het verbreden van de basislijn om groen te worden en het toestaan van een permanente stilte zijn twee afzonderlijke opzettelijke handelingen. Een kale `--force` wordt afgewezen. Scant ook de buildscope voor `@ts-nocheck` tegen `config/quality/ts-nocheck-baseline.json`, omdat een bestand dat het gebruikt helemaal geen diagnostiek rapporteert en anders onzichtbaar zou zijn voor elke poort. | Ja                                         |

#### Twee typecheck-programma's antwoorden verschillend

`typecheck:core` en `check:build-typecheck` compileren verschillende programma's onder verschillende opties, en hetzelfde bestand kan in de ene schoon zijn en in de andere vol fouten.

`tsconfig.build.json` stelt `"strict": false`, dus `noImplicitAny` is uitgeschakeld. De kernconfiguratie stelt een samengestelde toelatingslijst van 27 bestanden samen met strengere opties en volgt de importgrafiek van elk item, zodat bestanden die nooit in het buildprogramma verschijnen daar nog steeds worden gecontroleerd.

De consequentie is van belang bij het beoordelen of een bestand is getypt:** nuldiagnostiek onder `check:build-typecheck` betekent niet nul** . Door `@ts-nocheck` uit 26 bestanden te verwijderen, bleken er 23 schoon te zijn in het buildprogramma; zestien daarvan brachten ongeveer 120 impliciete fouten aan het licht in de strikte fout. Controleer beide voordat u een bestand opschoont.

### Functie: `quality-gate`

Loopt na `test-coverage`. Blokken worden samengevoegd bij falen.

| Script                       | Valideert                                                                                                                                                                              | Blokkeren                     |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `quality:collect`            | Zendt `quality-metrics.json` uit (aantal ESLint waarschuwingen, dekking van samengevoegd Shard-rapport)                                                                                | Ja (stroomopwaarts van ratel) |
| `quality:ratchet`            | Elke maatstaf in `quality-baseline.json` is niet achteruitgegaan (ESLint waarschuwingen ≤ basislijn; dekking ≥ -basislijn)                                                             | Ja                            |
| `check:duplication`          | Codeduplicatie (jscpd@4) overschrijdt de basislijn in `quality-baseline.json` niet                                                                                                     | Ja                            |
| `check:complexity`           | De cyclomatische complexiteit op bestandsniveau overschrijdt de limiet niet (core ESLint `complexity` + `max-lines-per-function`)                                                      | Ja                            |
| `check:cognitive-complexity` | Cognitieve complexiteit ratel (`eslint-plugin-sonarjs`) — aparte ESLint pass; CI draait beide samengevoegd als de enkele `check:complexity-ratchets` stap                              | Ja                            |
| `check:dead-code`            | Ongebruikte export-/bestandsratel (knip) gaat niet achteruit ten opzichte van de basislijn                                                                                             | Ja                            |
| `check:compression-budget`   | Het compressiebenchmarkbudget — tokenbesparingsvloeren per motor mag niet achteruitgaan                                                                                                | Ja                            |
| `check:type-coverage`        | Percentage getypte ratel (`type-coverage`) gaat niet achteruit; omvat grotendeels `typecheck:noimplicit:core`                                                                          | Ja                            |
| `check:codeql-ratchet`       | Het aantal open CodeQL waarschuwingen neemt niet af (leest via `gh api`; sierlijk overslaan zonder token) — vernieuwingsfrequentie en handmatige trigger: zie "CodeQL ratel" hieronder | Ja                            |

### Functie: `quality-extended`

Gehele functie is adviserend (`continue-on-error: true`). De op NPM gebaseerde ratels werken echt; de externe scanners worden geïnstalleerd via `gh release download` en self-skip (exit 0) wanneer een binair bestand nog steeds afwezig is.

| Script                   | Valideert                                                                                                                                                                                                              | Blokkeren                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `check:circular-deps`    | Geen circulaire afhankelijkheden (dpdm)                                                                                                                                                                                | **Adviserend**                                   |
| `check:bundle-size`      | De bundelgrootte overschrijdt de limiet niet                                                                                                                                                                           | **Adviserend**                                   |
| `check:secrets`          | Geheim scannen (gitleaks) — slaat over als binair bestand afwezig is                                                                                                                                                   | **Adviserend**                                   |
| `check:vuln-ratchet`     | Afhankelijkheidskwetsbaarheden (osv-scanner) nemen niet af — `--ratchet` faalt als INCOMPLETE (afrit 2) indien niet gemeten                                                                                            | **Adviserend**                                   |
| `check:workflows`        | Workflow-lint (actionlint + zizmor); missing/broken -scanners, ongeldige rapporten of ontbrekende ratelbasislijn mislukken als INCOMPLETE. Geldige bevindingen volgen het geselecteerde strict/advisory/ratchet beleid | Uitvoering vereist; zizmor ratelblokkering in CI |
| `check:openapi-breaking` | Openbaar API contract tegen vastgelegde gebeurtenistoezeggingen (PR merge-base, push before, merge-group base; scheduled/manual checkout eerste ouder); vereiste meting mislukt gesloten                               | **Blokkeren met --ratchet**                      |

### Functie: `docs-sync-strict`

Draait op elke PR tot `main`. Blokken worden samengevoegd bij falen.

| Script                         | Valideert                                                                                                                                                                   | Blokkeren                 |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `check:docs-all`               | Metapoort die de zes onderstaande subpoorten opeenvolgend bestuurt                                                                                                          | Ja                        |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt -versieconsistentie                                                                                                                           | Ja                        |
| ↳ `check:docs-counts`          | Tellingen in proza (aantal providers, aantal migraties, enz.) vallen binnen het ratelvenster van de echte tellingen                                                         | Ja                        |
| ↳ `check:env-doc-sync`         | Elke env var in `.env.example` wordt gedocumenteerd in een docs-tabel, en omgekeerd                                                                                         | Ja                        |
| ↳ `check:deprecated-versions`  | Geen verouderde versietekenreeksen in documenten                                                                                                                            | Ja                        |
| ↳ `check:doc-links`            | Interne prijsverlagingslinks in documenten worden omgezet in echte bestanden (`[text]`/`(path)` -formulier)                                                                 | Ja                        |
| ↳ `check:fabricated-docs`      | Routes, env vars, CLI -opdrachten, hook-namen en bestandspaden die in documenten worden genoemd, bestaan in de codebase. Harde poort via `--strict`; soft-fail zonder vlag. | Ja (via `--strict` in CI) |
| `check:cli-i18n`               | CLI opdrachtreeksen zijn aanwezig in alle i18n-landinstellingen                                                                                                             | Ja                        |
| `check:openapi-coverage`       | OpenAPI spec bestrijkt op zijn minst een aantal echte routes                                                                                                                | Ja                        |
| `check:openapi-security-tiers` | Annotaties op beveiligingsniveau in `openapi.yaml` komen overeen met `routeGuard.ts` -classificaties                                                                        | **Adviserend**            |
| `check:openapi-routes`         | Elk pad in `openapi.yaml` leidt tot een echte `route.ts` (anti-hallucinatie)                                                                                                | Ja                        |
| `check:docs-symbols`           | Elke `/api/...` -referentie in `docs/**/*.md` leidt tot een echte `route.ts` (anti-hallucinatie)                                                                            | Ja                        |
| `i18n translation drift`       | Onvertaalde sleutels in i18n-locale bestanden — waarschuwen alleen                                                                                                          | **Adviserend**            |

De twaalf README SVGs onder `docs/diagrams/` worden gegenereerd (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` regenereert ze allemaal). Elk heeft een byte-compare unit test (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) die mislukt als het vastgelegde bestand oud is, en `check:docs-counts` leest canonieke getallen van hun `<text>` knooppunten — Daarom houdt de schetsstap elke omlijnde string in het bestand als onzichtbaar `<text>`. De controle van SVG canonieke getallen leest de bestanden vermeld in `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` en `tier-flow-light.svg`; de beweringen over free-forever, catalogusinvoer, terugkerende pool en scorefactoren luiden ook `promise-pillars.svg`, `free-tier-budget.svg` en `strategies-grid.svg`. `free-tier-budget.svg` haalt zijn cijfers uit de live cataloguslader, dus een wijziging in `FREE_MODEL_BUDGETS` of in de weergavenaam van een provider geeft CI rood totdat dat bestand opnieuw is gegenereerd.

### Functie: `i18n-ui-coverage`

| Script                            | Valideert                                                                                                                                                                                                                       | Blokkeren      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | UI i18n sleuteldekking is ≥ 65%                                                                                                                                                                                                 | Ja             |
| `check-ui-value-drift` (inline)   | Een herschreven Engels** waarde** laat geen verouderde vertaling achter                                                                                                                                                         | Ja             |
| `check-new-key-coverage` (inline) | A** nieuw** De Engelse sleutel wordt vertaald in elke landinstelling — en een `__MISSING__:` -markering wordt afgewezen                                                                                                         | Ja             |
| `check-translation-ratio`         | De reële vertalingsratio per landinstelling (identiek aan het Engels / tijdelijke aanduiding / ontbrekende bladeren buiten de toelatingslijst) mag niet groter zijn dan `config/quality/i18n-translation-baseline.json` + slack | **Adviserend** |

Heeft `fetch-depth: 0` — nodig, de waarde-drift-poort diffs `en.json` tegen de samenvoegbasis.

#### `check-ui-value-drift` — verouderde vertaling poort

Vangt de ene i18n-regressie op die de andere poorten structureel niet kunnen zien: een Engelse waarde wordt herschreven en de vertalingen afgeleid van het _vorige_ Engels blijven achter, zodat niet-Engelse gebruikers zelfverzekerd geformuleerde, nu verkeerde teksten blijven lezen.

Dit is echt verzonden. `oauthModal.googleOAuthWarning` werd herschreven toen de Antigravity login-helper landde (#5203);** 39 van 43 locaties** bewaarde tekst waarin operators werden verteld "de volledige URL te kopiëren en hieronder te plakken" — een stroom die niet kan worden voltooid voor die provider. Het bleef tot #8463 onopgemerkt omdat:

- `sync-ui-keys` vult alleen sleutels aan die dat wel zijn** afwezig** , nooit degenen die dat wel zijn** muf** ;
- `check-ui-keys-coverage` telt sleutel _aanwezigheid_, dus een verouderde vertaling scoort als gedekt;
- `check-translation-drift` volgt de `docs/i18n/<locale>/**.md` -documentatie weerspiegelt — leest nooit `src/i18n/messages/*.json`. Blokkeren van taak `docs-sync-strict` sinds de hersynchronisatie van 2026-09: bewerk een kerndocument → `npm run i18n:run -- --files=<doc>` (sectieniveau, goedkoop).

**Diff-bewust, niet gebaseerd op de basislijn.** Het vergelijkt `en.json` op de samenvoegbasis met de werkboom; voor elke sleutel waarvan de Engelse waarde is veranderd, is elke landinstelling die nog steeds een onaangeroerde vertaling bevat verouderd. Dit met opzet** bevriest reeds bestaande schulden** — a diff kan niet onthullen uit welk oud Engels een al lang bestaande vertaling afkomstig is, dus beoordeelt de poort alleen wat de huidige verandering raakt. Het alternatief (een hash-basislijn per sleutel) zou een ~ 600 KB gegenereerd bestand kosten, 3 × de grootste bestaande basislijn, die op elke i18n PR draait.

Twee manieren om hieraan te voldoen:

1. de betreffende vertalingen bijwerken, of
2. stel ze in op `__MISSING__:<new english>` — de runtime serveert vervolgens het gecorrigeerde Engels (`src/i18n/request.ts::deepMergeFallback`, #7258) en de belangrijkste wachtrijen voor vertaling.

Als de string** betekenis** veranderd, liever** de sleutel hernoemen** : een nieuwe sleutel kan geen verouderde vertaling overnemen. Dat is het patroon #8463 gebruikte.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Verlaat 0 met `SKIP reason=base-unresolved` wanneer de basiscatalogus niet kan worden gelezen (ondiepe kloon zonder de basisreferentie), wat `check-openapi-breaking` weerspiegelt.

### Functie: `i18n`

Volledige i18n-validatiematrix (één taak per landinstelling). De gehele functie is adviserend.

| Script                          | Valideert                              | Blokkeren                                               |
| ------------------------------- | -------------------------------------- | ------------------------------------------------------- |
| `validate_translation.py quick` | Volledigheid van de vertaling per land | **Adviserend** (`continue-on-error: true` op hele baan) |

### Functie: `pr-test-policy`

Werkt alleen op pull-aanvragen.

| Script                 | Valideert                                                                                                                            | Blokkeren |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `check:pr-test-policy` | PRs die de productiecode in `src/`, `open-sse/`, `electron/` of `bin/` wijzigen, moeten tests bevatten of bijwerken (harde regel #8) | Ja        |
| `check:test-masking`   | Gewijzigde testbestanden verminderen het netto aantal beweringen niet en voegen `assert.ok(true)` tautologieën toe                   | Ja        |
| `check:pr-evidence`    | PR body citeert test/VPS bewijs voor de verandering (mechaniseert Hard Rule #18 door PR proza — fragiel te grijpen, zie Backlog)     | Ja        |

### Functie: `test-vitest`

Loopt na `build`. Blokken worden samengevoegd bij falen.

| Suite            | Valideert                                                | Blokkeren                                                                                                                        |
| ---------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 tools), autoCombo, cache — vitest runner | Ja                                                                                                                               |
| `test:vitest:ui` | UI componenttests — vitest runner                        | **Blokkeren** — reeds bestaande fouten worden expliciet uitgesloten in `vitest.config.ts`; nieuwe mislukkingen mislukken de klus |

### Nachtelijke workflows (gepland, adviserend)

Deze draaien volgens een cron-schema (en `workflow_dispatch`), nooit op PRs. Ze zijn allemaal adviserend.

| Werkstroom             | Valideert                                                                                                                                                          | Blokkeren      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `nightly-property`     | snelle controle van eigendomstests met een willekeurig aantal + hoge runs                                                                                          | **Adviserend** |
| `nightly-resilience`   | heap-groeipoort, chaosfout-injectie, k6 load/soak                                                                                                                  | **Adviserend** |
| `nightly-llm-security` | promptfoo injection guard (blokmodus) + garak-sondes (overgeslagen zonder providergeheim)                                                                          | **Adviserend** |
| `nightly-schemathesis` | OpenAPI -contractfuzzing (schemathese) tegen een live OmniRoute met behulp van `docs/openapi.yaml` — oppervlakken spec-schendingen / onverwerkte 500s (Fase 8 B.4) | **Adviserend** |
| `nightly-mutation`     | Stryker-mutatietests scoren over de snelle unit-lane — overlevende mutanten aan het oppervlak zijn zwak beweert                                                    | **Adviserend** |
| `nightly-compat`       | Compatibiliteitsmatrix voor knooppuntmotoren over de ondersteunde `engines.node` bereiken                                                                          | **Adviserend** |

Prestatiebasislijnen (heap, TTFB, bouwtijd) worden vastgelegd, niet gated: zie [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
- **adviserend** — het globale totaal ten opzichte van de bevroren basiswaarde. Overgenomen
  afwijkingen laten een onschuldige PR nooit falen; de afwijking wordt bij de releaseafstemming
  opnieuw bevroren en door de speelruimtetaak bewaakt.

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

### CodeQL-ratchet: vernieuwingsfrequentie en handmatige trigger

`check:codeql-ratchet` leest **de status van de repository, die volgens een schema wordt vernieuwd — niet per PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` rapporteert
`state: configured`, `schedule: weekly`: de standaardconfiguratiescan van GitHub, niet een
analyse per push. Gevolg: nadat een PR die waarschuwingen OPLOST is gemerged, blijft de ratchet
het oude, hogere aantal lezen totdat de volgende geplande scan wordt uitgevoerd — waardoor deze
bij elke open PR een regressie rapporteert, inclusief bij vervolg-PR's van de reparerende PR zelf,
totdat de scan is bijgewerkt.

**Handmatig vernieuwen**: `gh workflow run codeql.yml --ref release/vX.Y.Z` voert de
analyse opnieuw uit en publiceert de waarschuwingen binnen enkele minuten opnieuw. Lees eerst
`.github/workflows/codeql.yml` — de header legt uit dat deze uitsluitend via `workflow_dispatch`
wordt uitgevoerd **omdat dit conflicteert met de "default setup" van GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Voor het herstellen van `push`/`pull_request`/
`schedule`-triggers is **eerst een actie van een eigenaar vereist**: Settings → Code security →
CodeQL: Default → Advanced. Voeg geen `schedule:`-trigger toe zonder die omschakeling — dit
levert alleen mislukte uitvoeringen op.

**Verscherp de basislijn nadat het aantal is afgenomen** — `node scripts/check/check-codeql-ratchet.mjs
--update` schrijft het nieuwe gemeten aantal naar `quality-baseline.json` →
`metrics.codeqlAlerts.value`, zodat de ratchet niet stilzwijgend een regressie tot aan
de oude bovengrens toestaat. Uitgewerkt voorbeeld (2026-09-02/03): PR #12502 verhielp 7 echte waarschuwingen
(13 → 6 gemeten openstaand); PR #12530 verscherpte de vastgelegde basislijn van 11 → 6 zodat deze overeenkwam;
de resterende 6 werden vervolgens, met een rechtvaardiging per waarschuwing, verworpen tot er 0 openstonden.

**Verwerpingen zijn de beslissing van de operator (Harde regel #14)** — verwerp nooit een CodeQL-waarschuwing
zonder de technische rechtvaardiging vast te leggen in de verwerpingsopmerking: `won't fix` voor
een vereiste van een upstream-protocol, `used in tests` voor een testfixture, `false positive`
voor een sanitizer die CodeQL niet kan waarnemen (precedent: `docs/security/ERROR_SANITIZATION.md`).

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

## Toelatingslijstbeleid

Elke poort die niet kan falen bij reeds bestaande overtredingen gebruikt een bevroren toelatingslijst (bijv. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Het beleid is:

**Los de oorzaak op; gebruik de toelatingslijst alleen als de overtreding al bestaat en niet in dezelfde PR kan worden opgelost.**

Wanneer u een vermelding aan een toelatingslijst toevoegt:

1. Voeg een opmerking toe met de motivering.
2. Verwijs naar het trackingprobleem (bijvoorbeeld `// #3498 — Phase 2 feature, not yet implemented`).
3. Verwijder de vermelding in dezelfde PR die de overtreding verhelpt — Een verouderde vermelding die niet langer een actieve overtreding onderdrukt, is op zichzelf een defect (6A.3 verouderde handhaving zal de poort op een verweesde vermelding op de toelatingslijst mislukken zodra deze is geïmplementeerd).

Doen** niet** voeg vermeldingen op de toelatingslijst toe om tests sneller te laten slagen. Een groene poort met een groeiende toelatingslijst is een vals gevoel van kwaliteit.

### Wanneer een poort het begeeft op uw PR

1. **Lees de poortuitgang zorgvuldig** — vertelt u precies welk bestand of symbool de regel heeft overtreden.
2. **Herstel de overtreding** — De meeste poorten zijn deterministische bestandssysteemcontroles die slagen zodra de code correct is.
3. **Als de overtreding al bestond** (dat wil zeggen, je hebt het niet geïntroduceerd, maar de poort bedekt het nu): voeg een vermelding op de toelatingslijst toe met een motiveringsopmerking en een trackingprobleem.
4. **Als de poort een ratel is** (dekking, ESLint -waarschuwingen, duplicatie, complexiteit): uw wijziging heeft de statistiek verslechterd. Los het onderliggende probleem op, of voer (zelden) `npm run quality:ratchet -- --update` uit als de wijziging opzettelijk is en de metrische verslechtering acceptabel is — maar documenteer waarom in de PR -beschrijving.
5. **Adviserende poorten** (`continue-on-error: true`) zijn informatieve — Ze blokkeren de samenvoeging niet, maar verschijnen in de CI samenvatting. Repareer ze toch.

---

## Een nieuwe gate toevoegen

1. Maak `scripts/check/check-<name>.mjs` (of `.ts`) aan. Beleids-gates eindigen met exitcode 0/1.
   Gates in ratchet-stijl schrijven via `collect-metrics.mjs` een metriek naar `quality-metrics.json`.
2. Voeg `"check:<name>": "node scripts/check/check-<name>.mjs"` toe aan `package.json`.
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

## Rationalisatieachterstand (ROI review — Fase 9 Onda 3)

Deze inventaris is op 17-06-2026 afgestemd op `ci.yml` (de vorige versie liet `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence` weg). Een ROI -beoordeling van de afgestemde set identificeerde de volgende rationalisatiekandidaten.** De samenvoegingen zijn mechanische CI wijzigingen; de flips/drops zijn beleidsbeslissingen voorbehouden aan de exploitant.** Hieronder is nog niets toegepast.

**Ook hierboven ongedocumenteerd** (advies, laag signaal): de `docs-lint` taak (markdownlint + Vale, hele taak `continue-on-error`) en de zelfstandige scannerworkflows `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` bevindt zich in `quality-baseline.json` maar is niet aangesloten op een blokkerende ratel in `ci.yml` — de metriek is momenteel wees.

### Samenvoegen / ontdubbelen (mechanisch, lager risico)

Elke kandidaat werd op 17-06-2026 gevalideerd tegen de live-poortstatus (vertrouwen-maar-verifiëren); Verschillende "voor de hand liggende" fusies bleken schulden te verbergen en dat is ook zo** niet** schone drop-ins.

- **`check:docs-sync` loopt twee keer** — standalone in de `lint` -taak en opnieuw binnen `check:docs-all` (`docs-sync-strict`) en de husky pre-commit hook. ✅**DONE** — zelfstandige `lint` -aanroep verwijderd.
- **CVE scannen** — ❌**NOT een schone samenvoeging.** `audit:deps` blokkeert kritische adviezen en onvolledige audits voor alle vijf lockfiles, terwijl hoge adviezen als waarschuwingen worden gerapporteerd onder het huidige beleid; `check:vuln-ratchet` (osv) faalt alleen op een _regressie_ versus de ingecheckte basislijn en verwerpt ontbrekende metingen wanneer dat nodig is. Verschillende semantieken waarbij — `audit:deps` weglaat, zouden de absoluut kritische poort en de onafhankelijke pakketauditbewijzen kwijtraken. Bewaar beide.
- **Cyclusdetectie** — ✅**DONE** (#15159 G-01/G-02). De oude tekst noemde `check:cycles` hier "de groene, samengestelde" poort en rechtvaardigde het blokkeren ervan omdat `check:circular-deps` (dpdm) 91 cycli rapporteerde. Dat groen was een** vals groen** : `check:cycles` scande 5 submappen (450 bestanden), kwam alleen overeen met statische `import|export … from` en liet elke `@/` en `@omniroute/open-sse/` specificatie vallen, zodat het de dynamisch geïmporteerde + aliascycli niet kon zien die de repository domineerden. Opgelost: de poort loopt nu door `src` + `open-sse` (5023 bestanden), verzamelt specificaties van de TypeScript AST (dus `import("…")` telt en typepositie `typeof import("…")` niet) en lost tsconfig `paths` op. Het vindt** 14** cycli, niet 0. Omdat 14 reeds bestaande cycli niet in een poort PR kunnen worden vastgelegd, is `check:cycles` nu een** ratel** (`--ratchet`, plafond `metrics.cycles.value = 14` in `quality-baseline.json`, `direction: down`) — het blokkeert elke _regressie_ en de telling kan alleen maar dalen. CI voert `npm run check:cycles:ratchet` uit. Burn-down ritten met**A-01** . `check:circular-deps` (dpdm) blijft adviserend als de bredere second opinion.
- **Complexiteit** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): één ESLint wandeling, telt per ruleId, zodat cyclomatische + max-lijnen en cognitieve basislijnen onafhankelijk blijven; individuele `check:complexity` / `check:cognitive-complexity` blijven voor lokale `--update`.
- **`/api` anti-hallucinatie** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): één FS inventaris van `src/app/api`, openapi-routes + docs-symbolen rapporteren nog steeds onafhankelijk; individuen blijven voor lokale runs.
- **`check:node-runtime` heeft 11 banen** — ⚠️** lage ROI.** Elk is een afzonderlijke loper en de controle is < 1s; totale besparing ~ 10s, tegen het verlies van een goedkope bewaker per baan. Niet de moeite waard.
- **`typecheck:noimplicit:core` op CI lint** — ✅** verwijderd uit pluisjeswerk** (was adviserend `continue-on-error`); het blokkerende type oppervlak is `typecheck:core` + `check:type-coverage`. Lokaal script behouden.

### Omdraaien / beslissen (operatorbeleid)

- `check:openapi-security-tiers` (advies) — ❌**NOT netjes omkeerbaar.** Het verlaat 0 maar waarschuwt dat verschillende `traffic-inspector` routes onder `LOCAL_ONLY_API_PREFIXES` de `x-loopback-only: true` -annotatie missen. Om dit af te dwingen, moeten deze annotaties eerst aan `openapi.yaml` worden toegevoegd.
- `typecheck:noimplicit:core` (advies) — grotendeels ondergebracht in de blokkerende `check:type-coverage` ratel. Schakel over naar een ratel of laat de overtollige tweede `tsc` pass vallen.
- `test:vitest:ui` (nu** blokkeren** ) Reeds bestaande — -fouten worden expliciet uitgesloten in `vitest.config.ts` met `// #8618` trackingcommentaar; nieuwe mislukkingen mislukken de klus.
- `check:secrets` (gitleaks, blokkerende ratel bevroren bij 3 gedocumenteerde valse positieven) — zet de 3 op de toelatingslijst om 0 te bereiken, of te degraderen naar adviserend. Overlapt GitHub native geheimscan + `check:public-creds`.
- `check:pr-evidence` (blokkeren, greps PR-body proza) — hoog vals-positief risico; verzwakt de handhaving van de harde regel #18 als deze wordt geschrapt, dus dit is een echte beleidsoproep.
- `semgrep` (adviserend standalone) — overlapt CodeQL voor de OWASP -families; sluit de basislijn aan op een ratel of druppel.

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
