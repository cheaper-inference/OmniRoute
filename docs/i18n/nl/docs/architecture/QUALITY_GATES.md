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

## Gate-inventaris en uitvoeringsprofielen

### Toelating van kandidaten

De CI- en Quality Gates-workflows produceren elk een stabiel oordeel: `Gate / CI` en
`Gate / Quality`. Hun versiegebonden toelatingsbeleid vermeldt elke upstreamtaak
als vereist of adviserend. Een toepasselijke vereiste taak moet slagen: ontbrekende,
geannuleerde, overgeslagen, lopende en onbekende resultaten kunnen geen PASS aantonen. Een geldige
classificatie als alleen-documentatie of alleen-catalogus kan een code-lane niet-toepasselijk maken;
een concept-PR is geen geaccepteerde kandidaat. Een `hotfix`-label stelt bewijs niet buiten werking.

Beide workflows omvatten PR's naar main/release-branches, pushes naar `main`, handmatige activering
en merge-group-events. Push, dispatch en merge-group voeren de volledige selectie uit. Pushes naar
`release/**` starten deze niet (2026-10-18): elke wijziging heeft de matrix al uitgevoerd voor de bijbehorende PR
en de samengevoegde combinatie valt onder Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks
en merge-groepen gebruiken gehoste runners voor taken die anders self-hosted
runners selecteren; vóór de uitrol moet voldoende gehoste capaciteit worden geverifieerd.

Elk JSON-ontvangstbewijs identificeert de uitgecheckte SHA, workflowuitvoering en poging.
De CLI weigert een verschil tussen de SHA van de checkout en die van het event. Workflowtests koppelen beleidslidmaatschap
aan de `needs`-lijst van de beoordelingstaak, zodat een nieuwe of verwijderde lane niet ongemerkt kan verdwijnen.
De ontvangstbewijzen bestrijken hun eigen workflow, niet publicatie, implementatie of de interne werking
van een bestaande adviserende scanner. Het verplicht stellen van de toepasselijke controles in branchregels
is een afzonderlijke administratieve wijziging; het definiëren van hun jobs beschermt een branch niet op zichzelf.

`API Route Typecheck` is een onafhankelijke workflowcontrole, buiten beide geaggregeerde eindoordelen
en het statische profiel van de lokale volledige observer. Controleer het resultaat afzonderlijk voor de exacte
kandidaat. `.github/workflows/api-route-typecheck.yml` wordt uitgevoerd voor PR's naar `main` of
`release/**`, pushes naar een van beide branchfamilies en handmatige activering. Het bevat geen padfilter.
Het opnieuw instellen van het PR-basisdoel vraagt om een nieuwe controle; wijzigingen aan de body/titel gebruiken de alleen voor observatie bestemde naam
`Admission not requested / API Route Typecheck` en kunnen de toelatingscontrole niet vervangen.
De workflow declareert geen trigger voor een mergegroep. Elke uitrol van een mergewachtrij waarvoor
deze controle verplicht is, moet eerst de uitvoering ervan voor die gebeurtenis instellen.

### UI-uitvoeringscapaciteit

CI voert de volledige UI-inventaris uit als vier `test-vitest`-matrixshards, elk met maximaal
twee workers en de bestaande taakdeadline van 15 minuten. De eerste shard voert ook de
MCP/autoCombo-Vitest-suite uit. Het resultaat van de vereiste taak omvat elke matrixvariant; een fout
of annulering van één shard kan de toelating van een kandidaat niet aantonen.

De nachtelijke observer bewaart een afzonderlijk ontvangstbewijs voor de exacte kandidaat voor elke UI-shard,
inclusief de MCP-uitvoering in het eerste ontvangstbewijs. Alle vier ontvangstbewijzen, logs en overeenkomende
uitvoeringsidentiteiten zijn vereist. Lokaal selecteert `npm run test:vitest:ui` nog steeds de
volledige suite; één uitvoering met `--shard` is slechts gedeeltelijk bewijs.

### Verzameling van unitdekking

De twaalf unitshards verzamelen V8-dekking tijdens hun bestaande testuitvoering. Een geslaagde
shard voert `scripts/ci/compact-v8-coverage.mjs` uit om de oorspronkelijke bestanden te comprimeren zonder
een tussentijds Istanbul-rapport te genereren. De uiteindelijke Coverage-taak verifieert alle twaalf manifesten aan de hand
van de SHA van de kandidaat, runtime, bronroot en datahashes, en voert vervolgens de reporters van c8 en de bestaande
dekkingsdrempels uit. Invoer behoudt de globale bestandsnaamvolgorde van c8; vooraf samenvoegen per shard is onveilig
voor gemengde functie-/blokdekking. Ontbrekende, onjuist gevormde of incompatibele shards doen de toelating mislukken.
Mislukte testshards bewaren ruwe diagnostische dekking afzonderlijk; deze kan niet in de uiteindelijke samenvoeging worden opgenomen.

### Voortgangsregistraties voor de uitvoering van unittests

De gedeelde opdracht `test:unit:ci:shard` registreert de fasen `primary`, `dashboard` en `serial`
via `scripts/ci/unit-progress-reporter.mjs`. Het normale testrapport blijft
beschikbaar. Een afzonderlijke registratie met alleen metadata legt de start en voltooiing
van elk bestand vast, en een heartbeat van 30 seconden vermeldt de bestanden die nog actief
zijn en hun verstreken tijd. Alleen uitvoeringsmetadata op de allowlist wordt geregistreerd;
testbeschrijvingen, uitvoer, foutdetails en de volledige omgeving worden niet geserialiseerd.

CI en Quality bewaren de JSONL-bestanden als `unit-progress-ci-<run>-<attempt>-<shard>` en
`unit-progress-quality-<run>-<attempt>-<shard>`. Een time-out van een job kan de latere upload
verhinderen; reeds verzonden heartbeats blijven bruikbaar als diagnostisch bewijs. Ontbrekende
heartbeats kunnen ook wijzen op een geblokkeerd of beëindigd runnerproces. Deze registraties
behouden de bestaande testselectie, gelijktijdigheid, deadlines en afsluitstatus; het zijn
geen beslissingen over de toelating van kandidaten.

### Bewaard bewijsmateriaal in de acceptatiereducer

`scripts/quality/validate-release-acceptance.mjs` combineert een aangeleverd plan en de bijbehorende manifesten; het toont niet aan dat het plan de volledige releasepijplijn dekt. De rapporten stellen expliciet `releaseAcceptance: false` in, ook wanneer het plan `VERIFIED` is. De workflow `release-acceptance.yml` gebruikt nog steeds shadow-testfixtures, geen werkelijke ontvangstbewijzen voor build, verpakking, opstart of promotie.

De CLI vereist `--evidence-root` om bewaard bewijsmateriaal te verifiëren. Bestanden worden gevonden via `<evidence-root>/<artifact_id>/<member>` en gehasht met SHA-256. Een PASS-record zonder bewijs, een ontbrekend of gewijzigd bestand, een onveilig pad of een symbolische link verhindert verificatie. Ontbrekende bestanden staan niet gelijk aan lege logs van geslaagde uitvoeringen. De bestaande SHA/run/attempt-controles blijven onafhankelijk: overeenkomende bytes maken een verouderd ontvangstbewijs niet geldig. Bestandsintegriteit bewijst niet de authenticiteit van een uitvoering of de promotie van een artefact.

### Inventaris van statische scans

De versiegebonden npm-aliasinventaris en het lidmaatschap van statische scans bevinden zich in
`config/quality/gate-manifest.json`. Voer `npm run check:gate-manifest` uit om
scriptnamen en exacte opdrachten te valideren aan de hand van `package.json`; toevoegingen, verwijderingen en
opdrachtafwijkingen doen zowel de lokale hook als de wijzigingsclassificatietaken in CI mislukken.
Een alias is geen workflowtaak, matrixinstantie of testcase: deze aantallen mogen
niet als onderling uitwisselbaar worden gepresenteerd.

Gebruik `npm run quality:scan -- --list` of `npm run quality:scan:fast -- --list`
om de geselecteerde aliassen te inspecteren zonder ze uit te voeren. De runner roept het
npm-entrypoint aan, zodat de runtime ervan (inclusief Bun waar geconfigureerd) behouden blijft.
Het manifest registreert aliassen buiten die profielen als afzonderlijk aangeroepen, en
onderhoudsopdrachten zijn verboden in alleen-lezen-scanprofielen.

Deze profielen dekken alleen de statische scan. Ze certificeren geen producttests,
dekking, verpakking, externe controles of de volledige releaseacceptatie van een kandidaat.
Workflowtoelating gebruikt het gekoppelde `config/quality/admission-policy.json` en
`scripts/quality/admission-verdict.mjs`. Release-observer-profielen blijven afzonderlijk;
inspecteer hun toepasselijke controles en ontvangstbewijzen onafhankelijk. De statische opdrachten van de volledige observer
zijn gedeclareerd in `config/quality/release-green-static-profile.json`, waaronder
`audit:deps`, de selectie van mutatietests en vertaalcontroles. De loader valideert npm-
opdrachten aan de hand van package.json en gemodelleerde CI/Quality-declaraties; deze weigert afwijkingen
in plaats van shelltokens als argumenten uit te voeren. Vereiste scanneruitvoer SKIP/INCOMPLETE
kan geen PASS aantonen. Het profiel registreert zijn externe uitsluitingen en vervangt geen
gehoste dekking, testmatrices, pakket- of implementatiebewijs. De proza-inventaris hieronder
dient ter referentie en is geen bewijs dat een gate daadwerkelijk is uitgevoerd.

Scripts bevinden zich onder `scripts/check/` (beleidsgates) en `scripts/quality/` (ratchet-engine).
De bron van waarheid voor CI is `.github/workflows/ci.yml`.

### Status van de gepubliceerde basisdocumentatie

`.github/workflows/i18n-base-health.yml` bewaakt de status van de documentatie na geselecteerde
pushes naar `main` en `release/v*`, en bij handmatige uitvoering. De filters omvatten documentatie,
Markdown-bestanden in de hoofdmap, `llm.txt`, de vertaalstatus en -configuratie en de relevante i18n-tools.
De enige taak, `Published base documentation health`, gebruikt gehoste Ubuntu en heeft een
tijdslimiet van vijf minuten. Deze voert alleen-lezenvalidatie uit en schrijft een diagnostisch ontvangstbewijs zonder
afhankelijkheden te installeren, vertalingen uit te voeren of een status over te nemen.

`scripts/i18n/check-base-health.mjs` vereist dat er geen inconsistenties zijn met bronhashes, ontbrekende doelen, doelhashes,
verouderde vertalingen en de sectiecache. Het valideert ook het huidige bereik van
kerndocumenten en landinstellingen, evenals de vastgelegde herkomst ervan. Een ongeldige context, onvolledige dekking
of een onderbroken controle resulteert in `INCOMPLETE`; bevestigde afwijkingen resulteren in `FAIL`. Beide
leveren een afsluitstatus voor mislukking op. Het ontvangstbewijs is gekoppeld aan de checkout-SHA, workflow, uitvoering en
poging, en wordt bewaard als `i18n-base-health-<sha>-<run>-<attempt>`.

Dit is een onafhankelijke waarneming van de gepubliceerde basis. Er wordt geen PR- of
merge-group-gebeurtenis, verplichte PR-controle, npm-alias of lid van een statisch scanprofiel toegevoegd.
Het bestaande differentiële PR-beleid en de adviserende classificaties van de onderliggende controle
blijven afzonderlijk. Een geslaagde upload kan een mislukt statusresultaat niet omzetten in PASS.

### Snel traject voor release-PR's (`quality.yml`)

`.github/workflows/quality.yml` vormt een aanvulling op CI voor main/release-PR's, pushes naar `main`,
dispatch en merge-groepen. PR's gebruiken snelle controles die op basis van paden worden gefilterd. De permanent
uitgeschakelde dubbele build is verwijderd; de echte build-/pakket-/opstartcontroles blijven in CI.

| Taak                                             | Bereik                                                                                                                                                                                                                                 | Blokkerend          |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `Docs Gates (fast-path)`                         | PR's voor documentatie/code; API-documentatiereferenties en docs-all                                                                                                                                                                   | Ja                  |
| `Fast Quality Gates`                             | Code-PR's; statische controles, typecontrole, typecontrole van dashboard, relevante unittests                                                                                                                                          | Ja                  |
| `Forgotten sibling tests`                        | Code-PR's; gewijzigde modules herleid tot statische consumers en kandidaat-siblingtests; barrel- en dynamic-import-paden worden gerapporteerd als adviserende diagnostiek, met uitzonderingen uit de allowlist waarnaar wordt verwezen | **Adviserend**      |
| `Vitest (fast-path)`                             | Code-PR's; snelle Vitest-suite                                                                                                                                                                                                         | Ja                  |
| `Unit Tests fast-path`                           | Code-PR's; unitsuite met 4 shards                                                                                                                                                                                                      | Ja                  |
| `No new ESLint warnings`                         | Code-PR's; suppressiebewuste lintbewaking                                                                                                                                                                                              | Ja, inclusief forks |
| `Merge integrity (changelog + generated skills)` | Niet-concept-PR's; synchronisatie van changelog en gegenereerde skills                                                                                                                                                                 | Ja, inclusief forks |

#### Rapport over vergeten siblingtests

`npm run check:forgotten-sibling-tests` hergebruikt de importresolver achter de test-impactkaart.
Voor elke gewijzigde productiemodule rapporteert deze deterministische
`changed module/symbol -> static consumer -> candidate sibling test`-ketens wanneer de kandidaat-
test ontbreekt in de diff van de pull request. De Markdown-samenvatting en het JSON-resultaat worden bewaard als
het workflowartefact `forgotten-sibling-tests` voor kalibratie vóór een eventuele blokkerende uitrol.

Barrel-re-exports en dynamische imports dienen uitsluitend als resolutiediagnostiek; ze leiden nooit tot een
blokkerende bevinding. Beoordeelde uitzonderingen staan in
`config/quality/forgotten-sibling-allowlist.json`. Elke vermelding moet de consumer en kandidaat-
test benoemen, een specifieke onderbouwing geven en naar een GitHub-issue of pull request verwijzen. Ongeldige vermeldingen
leiden standaard tot een fout. Uitzonderingen kunnen een verwijderde kandidaattest of een diff die `.skip`/`.todo` toevoegt niet onderdrukken;
het verzwakken van assertions en andere vormen van maskering blijven onder de verantwoordelijkheid van de onafhankelijk blokkerende
`check:test-masking`-gate.

### Taak: `lint`

Wordt uitgevoerd bij elke PR naar `main`. Blokkeert samenvoegen bij een fout.

| Script (`npm run ...`)            | Valideert                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Blokkerend                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| `check:node-runtime`              | De Node.js-versie valt binnen het ondersteunde bereik                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                          |
| `check:test-tla-order`            | Geen enkel `node:test`-bestand onder `tests/unit` registreert een test, bereikt vervolgens een `await` op het hoogste niveau en registreert daarna meer tests (#18045; ratchet: `test-tla-order-allowlist.json` kan alleen kleiner worden)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ja                                          |
| `check:cycles`                    | Cyclische imports in heel `src/` + `open-sse/` (gebaseerd op AST, waarbij `paths` uit tsconfig worden opgelost). De kale variant sluit af met code 1 zodra er een cyclus bestaat (fail-closed sinds #15281) en vermeldt de SCC's. `check:cycles:ratchet` (wat CI uitvoert) blokkeert wanneer het aantal hoger is dan de bovengrens `metrics.cycles` in `quality-baseline.json` — momenteel 14, `direction: down`, dus dit kan alleen dalen (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja (ratchet)                                |
| `check:boundary`                  | `open-sse → src`-koppeling: unieke imports van bestand naar bestand vanuit de engine naar de app (`scripts/quality/measure-boundary.mjs`; de lijst met verbindingen is de herstelbacklog voor de opsplitsing van core/modules in v4). Kaal = adviserend rapport (hetzelfde als `quality:boundary`). `check:boundary:ratchet` (wat CI uitvoert, ook in de ratchet-lus voor snelle controles van `quality.yml`) blokkeert wanneer het aantal hoger is dan de bovengrens `metrics.boundaryOpenSseToSrc` in `quality-baseline.json` — ingesteld op de gemeten waarde 771, `direction: down`; `--update` verlaagt deze alleen; relatief ten opzichte van de basis op PR's (`--base-ref`, zie hieronder)                                                                                                                                                                                                                                               | Ja (ratchet)                                |
| `check:route-validation:t06`      | Zod-schema's aanwezig op alle routes (Tier 6-beleid)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                          |
| `check:any-budget:t11`            | Aantal `@ts-expect-error // any` overschrijdt het budget niet (Tier 11-toegangspoort)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                          |
| `check:provider-consistency`      | Elke provider in `providers.ts` heeft een overeenkomende vermelding in `providerRegistry.ts` (en omgekeerd, binnen de allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                          |
| `check:model-lifecycle`           | De drie handmatig onderhouden routeringstabellen blijven consistent met de ingecheckte levenscyclus-snapshot (#11503): `FITNESS_TABLE` (`taskFitness.ts`) kent geen score toe aan een uitgefaseerde id die `REGISTRY` kan routeren; elk doel van `BUILT_IN_ALIASES` is aanwezig in `REGISTRY` en afwezig in de snapshot met uitgefaseerde id's; elke uitgefaseerde id die nog in `REGISTRY` staat, wordt doorgestuurd of vermeld in `allowedRetiredInCatalog`; en geen enkele bron of bestemming in `DEFAULT_DEGRADATION_MAP` wordt in die snapshot als uitgefaseerd aangemerkt. Dit bewijst niet dat een model momenteel door een actieve upstream wordt aangeboden. Offline — vergelijkt met `config/quality/model-lifecycle.json`, handmatig vernieuwd met `npm run quality:refresh-model-lifecycle` (netwerk; niet geïntegreerd in CI). `allowedRetiredInCatalog` is een afbouwratel: voeg alleen een vermelding toe met een tracking-issue. | Ja                                          |
| `check:fetch-targets`             | Elke `fetch("/api/...")` in `src/` aan de clientzijde wordt herleid tot een echte `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                          |
| `check:deps`                      | Alle via `npm install` installeerbare afhankelijkheden in elke `package.json` in de repository staan in `dependency-allowlist.json`; nieuwe niet-vastgezette of door slopsquatting getroffen pakketten worden gemarkeerd                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                          |
| `audit:deps`                      | npm-audit van alle vijf onafhankelijke lockfiles (root, Electron, OpenCode-plugins v1/v2 en provider). Kritieke waarschuwingen blokkeren; waarschuwingen met hoge ernst blijven zichtbare waarschuwingen. Ontbrekende/mislukte audits zijn ONVOLLEDIG en blokkeren; lock-hashes en rapporten per scope worden bewaard.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                          |
| `check:lockfile`                  | Integriteit van `package-lock.json` — https-register, integriteitshashes, geen hostoverschrijvingen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ja                                          |
| `check:licenses`                  | SPDX-licentie-allowlist voor productieafhankelijkheden                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                          |
| `check:tracked-artifacts`         | Geen buildartefacten / vastgelegde `node_modules`-symlinks (wordt ook uitgevoerd in husky pre-commit; pre-push is bewust licht — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                          |
| `check:ai-attribution`            | Geen AI-/bot-`Co-Authored-By`-trailer of AI-generatievoettekst in PR-commits, titel of hoofdtekst — Harde regel #16 (in de `quality.yml`-lus met snelle controles voor PR→`release/**` — leest de eventpayload, doet niets buiten PR's — en een stap alleen voor PR's in de lint van `ci.yml` voor PR→`main`; ook de husky-`commit-msg`-hook; menselijke mede-auteurs toegestaan; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:vitest-exclusions`         | Elke Vitest-uitsluiting vermeldt een tracking-issue en komt voor in `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                          |
| `check:file-size`                 | Bronbestanden (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) blijven binnen `cap` en testbestanden (`*.test.ts(x)`) binnen `testCap`; bestanden die zijn bevroren in `file-size-baseline.json` (`frozen` / `testFrozen`) mogen niet groter worden dan hun vastgelegde grootte                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                          |
| `check:error-helper`              | Foutreacties in executors/handlers gebruiken `buildErrorBody()` / `sanitizeErrorMessage()` (harde regel #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                          |
| `check:migration-numbering`       | SQL-migratiebestanden zijn opeenvolgend genummerd, zonder hiaten of duplicaten                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                          |
| `check:public-creds`              | Geen letterlijke OAuth-waarden voor `client_id`/`client_secret` of Firebase Web-sleutels buiten `publicCreds.ts` (harde regel #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                          |
| `check:db-rules`                  | Geen onbewerkte SQL buiten modules in `src/lib/db/`; geen barrel-imports vanuit `localDb.ts` (harde regels #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ja                                          |
| `check:known-symbols`             | Provider-executors, routeringsstrategieën en translators die in hun dispatch-tabellen zijn geregistreerd, komen overeen met de bestanden op schijf — geen verweesde of niet-gedeclareerde symbolen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                          |
| `check:route-guard-membership`    | Elke route die een childproces start, wordt geclassificeerd door `isLocalOnlyPath()` (Harde regels #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja                                          |
| `check:test-discovery`            | Elk `*.test.ts`- / `*.spec.ts`-bestand in de repo wordt door ten minste één testrunner verzameld (ratchet: de lijst met verweesde bestanden in `test-discovery-baseline.json` kan alleen kleiner worden)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                          |
| `check:agent-skills-sync`         | Gegenereerde agent-skills-artefacten komen overeen met hun broncatalogus (geen afwijkingen)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:provider-asset-provenance` | Logo's/assets van providers hebben een vastgelegde herkomstvermelding                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `lint:json`                       | JSON-configuratiebestanden kunnen worden geparseerd en voldoen aan de lintregels van de repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `typecheck:core`                  | TypeScript-compilatie zonder fouten (alleen informatieve waarschuwingen)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                          |
| `typecheck:noimplicit:core`       | Strikte `noImplicitAny` — toekomstgericht; veel reeds bestaande aanroeplocaties moeten nog worden geannoteerd                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | **Informatief** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` beperkt tot `src/app/(dashboard)/**` (#7033) — de zorgvuldig samengestelde allowlist van 27 bestanden van `typecheck:core` bevat geen enkele dashboard-TSX en `next build` voert hierop evenmin typecontrole uit (`next.config.mjs` stelt `ignoreBuildErrors: true` in), waardoor regressies met verweesde identifiers daar (#6625/#6909) onzichtbaar waren voor CI. Vergelijkt met een bevroren baseline voor aantallen per bestand/per TS-code (`config/quality/dashboard-typecheck-baseline.json`, hetzelfde patroon voor handhaving van verouderde vermeldingen als `check:known-symbols`) — alleen NIEUWE fouten boven op het aantal in de baseline laten de controle mislukken; verlaag de baseline stapsgewijs met `--update` wanneer een reeds bestaande fout is opgelost.                                                                                                                                                         | Ja                                          |

### Taak: `quality-gate`

Wordt uitgevoerd na `test-coverage`. Blokkeert samenvoegen bij mislukking.

| Script                       | Valideert                                                                                                                                                                                                                | Blokkerend           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| `quality:collect`            | Genereert `quality-metrics.json` (aantal ESLint-waarschuwingen, dekking uit het samengevoegde shardrapport)                                                                                                              | Ja (vóór de ratchet) |
| `quality:ratchet`            | Geen enkele metriek in `quality-baseline.json` is verslechterd (ESLint-waarschuwingen ≤ baseline; dekking ≥ baseline)                                                                                                    | Ja                   |
| `check:duplication`          | Codeduplicatie (jscpd@4) overschrijdt de baseline in `quality-baseline.json` niet                                                                                                                                        | Ja                   |
| `check:complexity`           | Cyclomatische complexiteit op bestandsniveau overschrijdt de limiet niet (ESLint-kernregels `complexity` + `max-lines-per-function`)                                                                                     | Ja                   |
| `check:cognitive-complexity` | Ratchet voor cognitieve complexiteit (`eslint-plugin-sonarjs`) — afzonderlijke ESLint-run; CI voert beide samengevoegd uit als de enkele stap `check:complexity-ratchets`                                                | Ja                   |
| `check:dead-code`            | Ratchet voor ongebruikte exports/bestanden (knip) verslechtert niet ten opzichte van de baseline                                                                                                                         | Ja                   |
| `check:compression-budget`   | Budget voor compressiebenchmark — minimale tokenbesparingen per engine mogen niet verslechteren                                                                                                                          | Ja                   |
| `check:type-coverage`        | Ratchet voor het percentage getypeerde code (`type-coverage`) verslechtert niet; vervangt grotendeels `typecheck:noimplicit:core`                                                                                        | Ja                   |
| `check:codeql-ratchet`       | Het aantal openstaande CodeQL-waarschuwingen neemt niet toe (uitgelezen via `gh api`; wordt zonder token probleemloos overgeslagen) — zie "CodeQL-ratchet" hieronder voor het verversingsschema en handmatige activering | Ja                   |

### Taak: `quality-extended`

De taak blokkeert kandidaten waarop deze van toepassing is. Bundelgrootte, bevindingen over geheimen, kwetsbaarheden,
workflows en OpenAPI-wijzigingen worden gecontroleerd met verplichte ratchets.
Diagnostiek voor circulaire afhankelijkheden blijft adviserend. Installatie van scanners is verplicht:
`scripts/ci/install-quality-scanners.sh` levert vastgepinde versies en geeft
installatiefouten door. Ontbrekende hulpmiddelen, ongeldige rapporten of ontbrekende baselines laten
de verplichte scannercontrole ONVOLTOOID.

| Script                   | Valideert                                                                                                                                                                                                                          | Blokkerend                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `check:circular-deps`    | Geen circulaire afhankelijkheden (dpdm)                                                                                                                                                                                            | **Adviserend**                                     |
| `check:bundle-size`      | Bundelgrootte overschrijdt de limiet niet; een niet-beschikbare meting leidt tot een fout                                                                                                                                          | **Blokkerend met --ratchet**                       |
| `check:secrets`          | Gitleaks-bevindingen verslechteren niet; verplichte scans weigeren ontbrekende tools/bron/baseline, mislukte scans en ongeldige rapporten                                                                                          | **Blokkerend met --ratchet**                       |
| `check:vuln-ratchet`     | Kwetsbaarheden in afhankelijkheden verslechteren niet; verplichte scans weigeren ontbrekende tools, ongeldige rapporten of ontbrekende baselines                                                                                   | **Blokkerend met --ratchet**                       |
| `check:workflows`        | Workflow-linting (actionlint + zizmor); ontbrekende/defecte scanners, ongeldige rapporten of een ontbrekende ratchet-baseline leiden tot INCOMPLETE. Geldige bevindingen volgen het geselecteerde strict/advisory/ratchet-beleid   | Uitvoering vereist; zizmor-ratchet blokkeert in CI |
| `check:openapi-breaking` | Publiek API-contract ten opzichte van vastgezette event-commits (merge-base van PR, toestand vóór push, merge-group-basis; bij geplande/handmatige uitvoering eerst de eerste parent uitchecken); verplichte meting faalt gesloten | **Blokkerend met --ratchet**                       |

### Taak: `docs-sync-strict`

Voor pull requests naar `main` of `release/**` wordt deze taak alleen uitgevoerd voor kandidaten die geen concept zijn (of in een vertrouwde wachtrij staan) en als documentatie- of codewijzigingen zijn geclassificeerd. De taak wordt ook uitgevoerd bij CI-gebeurtenissen die geen PR zijn; de push-trigger van deze workflow omvat alleen `main`, niet `release/**`. Een stap die eindigt met een exitcode die niet nul is, blokkeert de taak; bevindingen die alleen worden gerapporteerd en de hieronder gedocumenteerde uitzonderingen doen dat niet.

| Script                         | Valideert                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Blokkerend                                                                                                                                                           |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Metapoort die de 7 onderstaande subpoorten achtereenvolgens uitvoert                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                                                                                                                                                   |
| ↳ `check:docs-sync`            | Versieconsistentie van het pakket/OpenAPI/CHANGELOG, exacte spiegelkopieën van `llm.txt`, invarianten voor secties en omvang van het vertaalde CHANGELOG en het ontbreken van dubbele documenten die inmiddels zijn vervangen                                                                                                                                                                                                                                                                                                  | Ja                                                                                                                                                                   |
| ↳ `check:docs-frontmatter`     | Gecompileerde documentatiepagina's bevatten geldige frontmatter-titels                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                                                                                                                                                   |
| ↳ `check:docs-counts`          | Telinvarianten met een hoge mate van zekerheid worden strikt afgedwongen; heuristische controles van bestandsaantallen geven alleen waarschuwingen, tenzij het script `--strict` ontvangt (de CI-metapoort geeft die vlag niet door)                                                                                                                                                                                                                                                                                           | De strikte laag blokkeert; de soepele laag is adviserend                                                                                                             |
| ↳ `check:env-doc-sync`         | Het uitlezen van omgevingsvariabelen in de broncode, `.env.example` en `docs/reference/ENVIRONMENT.md` komen overeen na toepassing van de expliciete uitzonderingslijsten voor genegeerde items, items die alleen in de documentatie staan en items die alleen in de omgeving staan                                                                                                                                                                                                                                            | Ja, buiten de gedocumenteerde uitzonderingslijsten                                                                                                                   |
| ↳ `check:deprecated-versions`  | Rapporteert mogelijk verouderde versies buiten veilige historische contexten en verouderde bijwerkdatums, met uitsluiting van genegeerde documenten                                                                                                                                                                                                                                                                                                                                                                            | Adviserend in de huidige CI-configuratie (`--strict` wordt niet doorgegeven)                                                                                         |
| ↳ `check:doc-links`            | Interne markdownlinks in de documentatie verwijzen naar bestaande bestanden (`[text]`/`(path)`-vorm)                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                                                                                                                                                   |
| ↳ `check:fabricated-docs`      | Routes, omgevingsvariabelen, CLI-opdrachten, hooknamen en bestandspaden die in de documentatie worden genoemd, bestaan in de codebase. Harde poort via `--strict`; zachte fout zonder vlag.                                                                                                                                                                                                                                                                                                                                    | Ja (via `--strict` in CI)                                                                                                                                            |
| `check:cli-i18n`               | De in de CLI gebruikte `t()`-sleutels bestaan in `en`; `pt-BR` behoudt elke sectie op het hoogste niveau; `zh-CN` en `zh-TW` bevatten elke sleutel uit `en`                                                                                                                                                                                                                                                                                                                                                                    | Ja                                                                                                                                                                   |
| `check:openapi-coverage`       | De OpenAPI-specificatie dekt ten minste een via ratcheting bepaalde ondergrens van bestaande routes                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                                                                                                                                                   |
| `check:openapi-security-tiers` | Gedeclareerde annotaties `x-loopback-only`/`x-always-protected` moeten door `routeGuard.ts` worden ondersteund; parserfouten en afwijkingen bij de voorwaartse controle blokkeren. De omgekeerde controle op ontbrekende `x-loopback-only` onder prefixen voor uitsluitend lokale toegang geeft waarschuwingen, en routes die alleen door een patroon zijn gedefinieerd, worden van die omgekeerde controle uitgesloten.                                                                                                       | Parsercontroles en voorwaartse controles blokkeren; de omgekeerde controle is adviserend                                                                             |
| `check:openapi-routes`         | Elk `/api...`-pad in `openapi.yaml` komt ongeacht de parameters overeen met een bestaande route na toepassing van de gemotiveerde uitzonderingslijst `KNOWN_STALE_SPEC`; verouderde lijstitems veroorzaken ook een fout                                                                                                                                                                                                                                                                                                        | Ja                                                                                                                                                                   |
| `check:docs-symbols`           | Interne `/api/...`-URL-verwijzingen in canonieke documenten die geen spiegelkopieën zijn, verwijzen naar een bestaande route of routefamilie; verwijzingen naar proxy/upstream/plaatsaanduidingen/bestanden en gemotiveerde items in `KNOWN_STALE_DOC_REFS` zijn uitgesloten, en verouderde items in de uitzonderingslijst veroorzaken een fout                                                                                                                                                                                | Ja                                                                                                                                                                   |
| `i18n translation drift`       | Controleert bron-/doelhashes van kerndocumenten en de herkomst van de vertaling. PR-vergelijking staat alleen identieke overgeërfde fouten toe; nieuwe of niet-geverifieerde inconsistenties in bron, ontbrekend doel, doelhash, verouderde vertaling of sectiecache blokkeren. Buiten PR-vergelijking blokkeren fouten in bron/ontbrekend doel/doelhash, terwijl verouderde vertalingen en inconsistente sectiecaches uitsluitend waarschuwingen blijven. Het ontbreken van een sectiecache in het oude formaat is geen fout. | Nieuwe/niet-geverifieerde PR-afwijkingen blokkeren; identieke overgeërfde afwijkingen zijn uitsluitend waarschuwingen; regels buiten PR's hangen af van het fouttype |

### Taak: `i18n-ui-coverage`

| Script                            | Valideert                                                                                                                                                                                                      | Blokkerend     |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | De dekking van UI-i18n-sleutels is ≥ 65%                                                                                                                                                                       | Ja             |
| `check-ui-value-drift` (inline)   | Een herschreven Engelse **waarde** laat geen verouderde vertaling achter                                                                                                                                       | Ja             |
| `check-new-key-coverage` (inline) | Een **nieuwe** Engelse sleutel is in elke locale vertaald — een `__MISSING__:`-markering wordt afgewezen                                                                                                       | Ja             |
| `check-translation-ratio`         | De verhouding echte vertalingen per locale (gelijk aan Engels / tijdelijke aanduiding / ontbrekende leaves buiten de allowlist) mag `config/quality/i18n-translation-baseline.json` + marge niet overschrijden | **Blokkerend** |

Vereist `fetch-depth: 0` — de value-drift-gate vergelijkt `en.json` met de merge base.

#### `check-ui-value-drift` — gate voor verouderde vertalingen

Detecteert de ene i18n-regressie die de andere gates structureel niet kunnen zien: een Engelse waarde
wordt herschreven en de vertalingen die van het _vorige_ Engels zijn afgeleid blijven staan, waardoor
niet-Engelstalige gebruikers stellig geformuleerde, maar inmiddels onjuiste tekst blijven lezen.

Dit is daadwerkelijk in productie terechtgekomen. `oauthModal.googleOAuthWarning` werd herschreven toen de Antigravity-
loginhelper werd toegevoegd (#5203); **39 van de 43 locales** behielden tekst die operators opdroeg om "de
volledige URL te kopiëren en hieronder te plakken" — een flow die voor die provider niet kan worden voltooid. Dit bleef
onopgemerkt tot #8463, omdat:

- `sync-ui-keys` alleen sleutels aanvult die **afwezig** zijn, nooit sleutels die **verouderd** zijn;
- `check-ui-keys-coverage` de _aanwezigheid_ van sleutels telt, waardoor een verouderde vertaling als gedekt wordt beschouwd;
- `check-translation-drift` de documentatiespiegels in `docs/i18n/<locale>/**.md` bijhoudt —
  deze leest nooit `src/i18n/messages/*.json`. Blokkerend in job `docs-sync-strict` sinds de
  hersynchronisatie van 2026-09: bewerk een kerndocument → `npm run i18n:run -- --files=<doc>` (op sectieniveau, goedkoop).

**Diff-bewust, niet gebaseerd op een baseline.** De gate vergelijkt `en.json` bij de merge base met de
working tree; voor elke sleutel waarvan de Engelse waarde is gewijzigd, geldt elke locale die nog een
onaangeroerde vertaling bevat als verouderd. Hiermee wordt **reeds bestaande achterstand bewust bevroren** — uit een diff
kan niet worden afgeleid van welke oude Engelse tekst een al langer bestaande vertaling afkomstig is, dus de gate beoordeelt
alleen wat door de huidige wijziging wordt geraakt. Het alternatief (een hash-baseline per sleutel) zou
een gegenereerd bestand van circa 600 KB vereisen, 3× zo groot als de grootste bestaande baseline, met wijzigingen bij elke i18n-PR.

Er zijn twee manieren om eraan te voldoen:

1. werk de betrokken vertalingen bij, of
2. stel ze in op `__MISSING__:<new english>` — de runtime levert dan het gecorrigeerde Engels
   (`src/i18n/request.ts::deepMergeFallback`, #7258) en de sleutel wordt in de wachtrij voor vertaling geplaatst.

Als de **betekenis** van de tekenreeks is gewijzigd, verdient het de voorkeur **de sleutel te hernoemen**: een nieuwe sleutel kan geen
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

### Job: `i18n`

Volledige i18n-validatiematrix (één job per locale). De hele job is adviserend.

| Script                          | Valideert                               | Blokkerend                                                  |
| ------------------------------- | --------------------------------------- | ----------------------------------------------------------- |
| `validate_translation.py quick` | Volledigheid van vertalingen per locale | **Adviserend** (`continue-on-error: true` voor de hele job) |

### Job: `pr-test-policy`

Wordt alleen uitgevoerd voor pull requests.

| Script                 | Valideert                                                                                                                                 | Blokkerend |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PR's die productiecode in `src/`, `open-sse/`, `electron/` of `bin/` wijzigen, moeten tests toevoegen of bijwerken (Harde regel #8)       | Ja         |
| `check:test-masking`   | Gewijzigde testbestanden verlagen het nettoaantal asserts niet en voegen geen `assert.ok(true)`-tautologieën toe                          | Ja         |
| `check:pr-evidence`    | De PR-body vermeldt test-/VPS-bewijs voor de wijziging (automatiseert Harde regel #18 door PR-tekst te doorzoeken — fragiel, zie Backlog) | Ja         |

### Job: `test-vitest`

Vereist de classificatietaak `changes`. Toepasselijke matrixshards blokkeren het samenvoegen bij een fout.

| Suite            | Valideert                                                | Blokkerend                                                                                                                    |
| ---------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-server (110 tools), autoCombo, cache — vitest-runner | Ja                                                                                                                            |
| `test:vitest:ui` | UI-componenttests — vitest-runner                        | **Blokkerend** — reeds bestaande fouten zijn expliciet uitgesloten in `vitest.config.ts`; nieuwe fouten doen de job mislukken |

### Nachtelijke workflows (gepland, adviserend)

Deze worden volgens een cron-schema uitgevoerd (en via `workflow_dispatch`), nooit bij PR's. Ze zijn allemaal adviserend.

| Workflow               | Valideert                                                                                                                                                                          | Blokkerend     |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | fast-check-propertytests met een willekeurige seed en een hoog aantal uitvoeringen                                                                                                 | **Adviserend** |
| `nightly-resilience`   | heapgroeidrempel, chaos-foutinjectie, k6-belasting-/duurtest                                                                                                                       | **Adviserend** |
| `nightly-llm-security` | promptfoo-injectiebeveiliging (blokkeermodus) + garak-probes (overgeslagen zonder providersecret)                                                                                  | **Adviserend** |
| `nightly-schemathesis` | OpenAPI-contractfuzzing (schemathesis) tegen een live OmniRoute met `docs/openapi.yaml` — brengt specificatieschendingen / niet-afgehandelde 500-fouten aan het licht (Fase 8 B.4) | **Adviserend** |
| `nightly-mutation`     | Stryker-mutatietestscore voor de snelle unit-lane — overlevende mutanten brengen zwakke assertions aan het licht                                                                   | **Adviserend** |
| `nightly-compat`       | compatibiliteitsmatrix voor de Node-engine voor alle ondersteunde `engines.node`-bereiken                                                                                          | **Adviserend** |

Prestatiebaselines (heap, TTFB, buildtijd) worden vastgelegd, maar vormen geen blokkade: zie [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

**Hierboven eveneens niet gedocumenteerd** (adviserend, weinig signaal): de `docs-lint`-job
(markdownlint + Vale, volledige job met `continue-on-error`) en de zelfstandige scannerworkflows
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` staat in
`quality-baseline.json`, maar is niet gekoppeld aan een blokkerende ratchet in `ci.yml` — de metriek
is momenteel verweesd.

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
