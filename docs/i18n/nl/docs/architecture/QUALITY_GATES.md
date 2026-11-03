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

De CI- en Quality Gates-workflows geven elk een stabiel oordeel af: `Gate / CI` en
`Gate / Quality`. Hun versiebeheerbeleid voor toelating somt elke upstream-taak op als
verplicht of adviserend. Een toepasselijke verplichte taak moet slagen: ontbrekende,
geannuleerde, overgeslagen, nog niet voltooide en onbekende resultaten kunnen geen PASS
vaststellen. Een geldige classificatie als alleen documentatie of alleen catalogus kan
een codelane niet van toepassing maken; een concept-PR is geen geaccepteerde kandidaat.
Een label `hotfix` doet niet af aan de vereiste bewijslast.

Beide workflows behandelen PR's naar main/release-branches, pushes naar `main`, handmatige dispatches
en merge-group-gebeurtenissen. Pushes, dispatches en merge-groups voeren de volledige selectie uit. Pushes naar
`release/**` starten ze niet (2026-10-18): elke wijziging heeft de matrix al op de PR doorlopen
en de samengevoegde combinatie valt onder Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane).
Forks en merge-groups gebruiken gehoste runners voor taken die anders self-hosted
runners selecteren; vóór de uitrol moet worden gecontroleerd of er voldoende gehoste capaciteit is.

Elk JSON-ontvangstbewijs identificeert de uitgecheckte SHA, de workflow-run en de poging.
De CLI wijst een mismatch tussen checkout/event-SHA's af. Workflowtests koppelen het lidmaatschap van beleid
aan de `needs`-lijst van de verdict-taak, zodat een nieuwe of verwijderde lane niet stilletjes kan verdwijnen.
De ontvangstbewijzen dekken hun eigen workflow, niet publicatie, implementatie of de interne werking
van een bestaande adviserende scanner. Het activeren van beide controlenamen in branchregels is een
afzonderlijke administratieve wijziging; het toevoegen van deze taken beschermt een branch niet vanzelf.

### Inventaris van statische scans

De versiebeheerste npm-aliasinventaris en het lidmaatschap van statische scans staan in
`config/quality/gate-manifest.json`. Voer `npm run check:gate-manifest` uit om scriptnamen en exacte
opdrachten te valideren tegen `package.json`; toevoegingen, verwijderingen en afwijkingen in opdrachten
laten zowel de lokale hook als de wijzigingsclassificatietaken in CI mislukken.
Een alias is geen workflowtaak, matrixinstantie of testgeval: deze aantallen
mogen niet als onderling uitwisselbaar worden gepresenteerd.

Gebruik `npm run quality:scan -- --list` of `npm run quality:scan:fast -- --list`
om de geselecteerde aliassen te bekijken zonder ze uit te voeren. De runner roept het npm-entrypoint aan,
zodat de runtime ervan (inclusief Bun waar geconfigureerd) behouden blijft.
Het manifest registreert aliassen buiten die profielen als afzonderlijk aangeroepen, en
onderhoudsopdrachten zijn verboden in alleen-lezen scanprofielen.

Deze profielen dekken alleen de statische scan. Ze certificeren geen producttests,
code coverage, packaging, externe controles of de volledige releaseacceptatie van een kandidaat.
Workflowtoelating gebruikt het gekoppelde `config/quality/admission-policy.json` en
`scripts/quality/admission-verdict.mjs`. Release-observerprofielen blijven afzonderlijk;
controleer hun toepasselijke controles en ontvangstbewijzen onafhankelijk. De onderstaande
proza-inventaris is een referentie, geen bewijs dat een gate daadwerkelijk is uitgevoerd.

Scripts staan onder `scripts/check/` (beleids-gates) en `scripts/quality/` (ratchet-engine).
De bron van waarheid voor CI is `.github/workflows/ci.yml`.

### Versnelde route voor release-PR's (`quality.yml`)

`.github/workflows/quality.yml` vormt een aanvulling op CI voor main/release-PR's, pushes naar `main`,
dispatches en merge-groups. PR's gebruiken snelle, op paden gefilterde controles. De permanent
uitgeschakelde dubbele build is verwijderd; de echte build-, package- en bootcontroles blijven in CI.

| Taak                                             | Bereik                                                                                                                                                                                                                                 | Blokkerend          |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `Docs Gates (fast-path)`                         | Documentatie-/code-PR's; API-documentatiereferenties en alle documentatie                                                                                                                                                              | Ja                  |
| `Fast Quality Gates`                             | Code-PR's; statische controles, typecheck, dashboardtypecheck, beïnvloede unittests                                                                                                                                                    | Ja                  |
| `Forgotten sibling tests`                        | Code-PR's; gewijzigde modules getraceerd naar statische consumers en kandidaat-tests van siblingmodules; barrel- en dynamic-import-paden worden gerapporteerd als adviserende diagnostiek, met verwezen uitzonderingen op de allowlist | **Adviserend**      |
| `Vitest (fast-path)`                             | Code-PR's; snelle vitest-suite                                                                                                                                                                                                         | Ja                  |
| `Unit Tests fast-path`                           | Code-PR's; unitsuite met 4 shards                                                                                                                                                                                                      | Ja                  |
| `No new ESLint warnings`                         | Code-PR's; lint-beveiliging waarbij rekening wordt gehouden met suppressions                                                                                                                                                           | Ja, inclusief forks |
| `Merge integrity (changelog + generated skills)` | Niet-concept-PR's; synchronisatie van changelog en gegenereerde skills                                                                                                                                                                 | Ja, inclusief forks |

#### Rapport over vergeten siblingtests

`npm run check:forgotten-sibling-tests` hergebruikt de importresolver achter de test-impactkaart.
Voor elke gewijzigde productiemodule rapporteert deze deterministische ketens van
`changed module/symbol -> static consumer -> candidate sibling test` wanneer de kandidaat-
test ontbreekt in de diff van de pull request. De Markdown-samenvatting en het JSON-resultaat worden
bewaard als workflowartefact van `forgotten-sibling-tests` voor kalibratie vóór een blokkerende uitrol.

Herexports uit barrels en dynamische imports zijn alleen resolverdiagnostiek; ze leiden nooit tot een
blokkerende bevinding. Beoordeelde uitzonderingen staan in
`config/quality/forgotten-sibling-allowlist.json`. Elke vermelding moet de consumer en kandidaat-
test benoemen, een specifieke reden geven en naar een GitHub-issue of pull request verwijzen. Onjuist
opgemaakte vermeldingen laten de controle mislukken. Uitzonderingen kunnen een verwijderde kandidaat-
test of een diff die `.skip`/`.todo` toevoegt niet onderdrukken; het verzwakken van assertions en andere
manieren om controles te omzeilen vallen onder de verantwoordelijkheid van de onafhankelijk blokkerende
`check:test-masking`-gate.

### Taak: `lint`

Wordt uitgevoerd bij elke PR naar `main`. Blokkeert het mergen bij een fout.

| Script (`npm run ...`)            | Valideert                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Blokkerend                                 |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | De Node.js-versie valt binnen het ondersteunde bereik                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                         |
| `check:cycles`                    | Circulaire imports in heel `src/` + `open-sse/` (op AST gebaseerd, met `tsconfig` `paths` opgelost). De basiscontrole eindigt met status 1 zodra er een cyclus bestaat (fail-closed sinds #15281) en vermeldt de SCC's. `check:cycles:ratchet` (wat CI uitvoert) blokkeert wanneer het aantal de limiet van `metrics.cycles` in `quality-baseline.json` overschrijdt — momenteel 14, `direction: down`, dus het kan alleen dalen (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja (ratchet)                               |
| `check:boundary`                  | Koppeling van `open-sse → src`: unieke imports van bestand naar bestand vanuit de engine naar de app (`scripts/quality/measure-boundary.mjs`; de lijst met verbindingen is de achterstand voor herstelwerkzaamheden van de v4 core/module-split). De basiscontrole is een adviserend rapport (hetzelfde als `quality:boundary`). `check:boundary:ratchet` (wat CI uitvoert, ook in de ratchet-lus voor snelle poorten van `quality.yml`) blokkeert wanneer het aantal de limiet van `metrics.boundaryOpenSseToSrc` in `quality-baseline.json` overschrijdt — ingesteld op de gemeten waarde 771, `direction: down`; `--update` kan de waarde alleen verlagen; relatief ten opzichte van de basis op PR's (`--base-ref`, zie hieronder)                                                                                                                                                                                                   | Ja (ratchet)                               |
| `check:route-validation:t06`      | Zod-schema's zijn aanwezig op alle routes (Tier 6-beleid)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ja                                         |
| `check:any-budget:t11`            | Het aantal `@ts-expect-error // any`-vermeldingen overschrijdt het budget niet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                         |
| `check:provider-consistency`      | Elke provider in `providers.ts` heeft een overeenkomstige vermelding in `providerRegistry.ts` (en omgekeerd, binnen de allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                         |
| `check:model-lifecycle`           | De drie handmatig onderhouden routeringstabellen blijven consistent met de ingecheckte levenscyclussnapshot (#11503): `FITNESS_TABLE` (`taskFitness.ts`) kent geen score toe aan een ingetrokken id waarnaar `REGISTRY` kan routeren; elk doel van `BUILT_IN_ALIASES` staat in `REGISTRY` en ontbreekt in de snapshot met ingetrokken id's; elk ingetrokken id dat nog in `REGISTRY` staat, wordt doorgestuurd of vermeld in `allowedRetiredInCatalog`; en geen enkele bron of doel van `DEFAULT_DEGRADATION_MAP` komt in die snapshot als ingetrokken voor. Dit bewijst niet dat een model momenteel door een actieve upstream wordt aangeboden. Offline — vergelijkt met `config/quality/model-lifecycle.json`, handmatig vernieuwd met `npm run quality:refresh-model-lifecycle` (netwerk; niet gekoppeld aan CI). `allowedRetiredInCatalog` is een ratchet voor het afbouwen: voeg alleen een vermelding toe met een tracking issue. | Ja                                         |
| `check:fetch-targets`             | Elke `fetch("/api/...")` in client-side `src/` verwijst naar een echte `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                         |
| `check:deps`                      | Alle met `npm install` installeerbare afhankelijkheden in elk `package.json` in de repository staan in `dependency-allowlist.json`; nieuwe niet-vastgepinde of via typosquatting toegevoegde pakketten worden gemarkeerd                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                         |
| `audit:deps`                      | `npm audit` (root + electron) — geen adviezen met hoge of kritieke ernst (overlap met osv `check:vuln-ratchet`; zie de rationalisatie-backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                         |
| `check:lockfile`                  | Integriteit van `package-lock.json` — https-register, integriteitshashes, geen host-overschrijvingen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                         |
| `check:licenses`                  | SPDX-licentie-allowlist voor productieafhankelijkheden                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:tracked-artifacts`         | Geen buildartefacten / vastgelegde `node_modules`-symlinks (wordt ook uitgevoerd in husky pre-commit; pre-push is bewust beperkt — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ja                                         |
| `check:ai-attribution`            | Geen AI-/bot-trailer `Co-Authored-By` of AI-generatie-footer in PR-commits, titel of hoofdtekst — Harde regel #16 (in de `quality.yml`-lus voor snelle gates voor PR→`release/**` — leest de event-payload, doet niets buiten PR's — en een stap die alleen voor PR's geldt in de `ci.yml`-lint voor PR→`main`; ook de husky-hook `commit-msg`; menselijke co-auteurs zijn toegestaan; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:vitest-exclusions`         | Elke Vitest-uitsluiting vermeldt een trackingissue en staat in `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:file-size`                 | Bronbestanden (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) blijven binnen `cap` en testbestanden (`*.test.ts(x)`) binnen `testCap`; bestanden die zijn vastgezet in `file-size-baseline.json` (`frozen` / `testFrozen`) mogen niet groter worden dan hun vastgelegde grootte                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                         |
| `check:error-helper`              | Foutreacties in uitvoerders/handlers gebruiken `buildErrorBody()` / `sanitizeErrorMessage()` (Strikte regel #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                         |
| `check:migration-numbering`       | Migratie-SQL-bestanden zijn opeenvolgend genummerd, zonder hiaten of duplicaten                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:public-creds`              | Geen letterlijke OAuth `client_id`/`client_secret` of Firebase-websleutels buiten `publicCreds.ts` (Strikte regel #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:db-rules`                  | Geen onbewerkte SQL buiten modules in `src/lib/db/`; geen barrel-imports uit `localDb.ts` (Strikte regels #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                         |
| `check:known-symbols`             | Provideruitvoerders, routeringsstrategieën en vertalers die in hun dispatch-tabellen zijn geregistreerd, komen overeen met de bestanden op schijf — geen verweesde of niet-gedeclareerde symbolen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                         |
| `check:route-guard-membership`    | Elke route die een childproces start, wordt geclassificeerd door `isLocalOnlyPath()` (Strikte regels #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                         |
| `check:test-discovery`            | Elk `*.test.ts`- / `*.spec.ts`-bestand in de repository wordt door ten minste één testrunner verzameld (ratchet: de verweesde lijst in `test-discovery-baseline.json` kan alleen korter worden)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:test-tla-order`            | Geen `node:test`-bestand onder `tests/unit` registreert een test, bereikt vervolgens een top-level `await` en registreert daarna meer tests (#18045; ratchet: `test-tla-order-allowlist.json` kan alleen korter worden)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ja                                         |
| `check:agent-skills-sync`         | Gegenereerde agent-skills-artefacten komen overeen met hun broncatalogus (geen afwijkingen)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:provider-asset-provenance` | Providerlogo's/-assets bevatten een geregistreerde herkomstvermelding                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `lint:json`                       | JSON-configuratiebestanden kunnen worden geparseerd en voldoen aan de lintregels van de repository                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `typecheck:core`                  | TypeScript-compilatie zonder fouten (alleen adviserende waarschuwingen)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ja                                         |
| `typecheck:noimplicit:core`       | Strikte `noImplicitAny` — toekomstgericht; veel bestaande aanroeppunten hebben nog annotaties nodig                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | **Adviserend** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` beperkt tot `src/app/(dashboard)/**` (#7033) — de samengestelde allowlist van 27 bestanden van `typecheck:core` bevat geen enkele dashboard-TSX, en `next build` voert ook daar geen typecontrole uit (`next.config.mjs` stelt `ignoreBuildErrors: true` in), waardoor regressies met verweesde identifiers daar (#6625/#6909) onzichtbaar waren voor CI. Verschillen worden vergeleken met een bevroren baseline voor elk bestand/elke TS-code (`config/quality/dashboard-typecheck-baseline.json`, hetzelfde patroon voor verouderde handhaving als `check:known-symbols`) — alleen NIEUWE fouten boven het aantal in de baseline laten de controle mislukken; verlaag de teller met `--update` wanneer een bestaande fout is opgelost.                                                                                                                                                                                          | Ja                                         |

### Taak: `quality-gate`

Wordt uitgevoerd na `test-coverage`. Blokkeert het mergen bij een fout.

| Script                       | Controleert                                                                                                                                                                                                       | Blokkerend                   |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `quality:collect`            | Genereert `quality-metrics.json` (aantal ESLint-waarschuwingen, dekking uit het samengevoegde shard-rapport)                                                                                                      | Ja (voorafgaand aan ratchet) |
| `quality:ratchet`            | Elke metriek in `quality-baseline.json` is niet verslechterd (ESLint-waarschuwingen ≤ baseline; dekking ≥ baseline)                                                                                               | Ja                           |
| `check:duplication`          | Codeduplicatie (jscpd@4) overschrijdt de baseline in `quality-baseline.json` niet                                                                                                                                 | Ja                           |
| `check:complexity`           | Cyclomatische complexiteit op bestandsniveau overschrijdt de limiet niet (core ESLint `complexity` + `max-lines-per-function`)                                                                                    | Ja                           |
| `check:cognitive-complexity` | Ratchet voor cognitieve complexiteit (`eslint-plugin-sonarjs`) — afzonderlijke ESLint-pass; CI voert beide samengevoegd uit als één stap `check:complexity-ratchets`                                              | Ja                           |
| `check:dead-code`            | Ratchet voor ongebruikte exports/bestanden (knip) verslechtert niet ten opzichte van de baseline                                                                                                                  | Ja                           |
| `check:compression-budget`   | Budget voor compressiebenchmark — de minimale tokenbesparing per engine mag niet verslechteren                                                                                                                    | Ja                           |
| `check:type-coverage`        | Ratchet voor het percentage getypeerde code (`type-coverage`) verslechtert niet; neemt `typecheck:noimplicit:core` grotendeels over                                                                               | Ja                           |
| `check:codeql-ratchet`       | Het aantal open CodeQL-meldingen verslechtert niet (wordt gelezen via `gh api`; zonder token wordt dit netjes overgeslagen) — zie "CodeQL-ratchet" hieronder voor de vernieuwingsfrequentie en handmatige trigger | Ja                           |

### Taak: `quality-extended`

De volledige taak is adviserend (`continue-on-error: true`). De op npm gebaseerde ratchets worden daadwerkelijk uitgevoerd; de externe scanners worden geïnstalleerd via `gh release download` en slaan zichzelf over (exit 0) wanneer een binary nog ontbreekt.

| Script                   | Controleert                                                                                                                                                                                                                                          | Blokkerend                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `check:circular-deps`    | Er zijn geen circulaire afhankelijkheden (dpdm)                                                                                                                                                                                                      | **Adviserend**                                      |
| `check:bundle-size`      | De bundelgrootte overschrijdt de limiet niet                                                                                                                                                                                                         | **Adviserend**                                      |
| `check:secrets`          | Scannen op geheimen (gitleaks) — wordt overgeslagen als de binary ontbreekt                                                                                                                                                                          | **Adviserend**                                      |
| `check:vuln-ratchet`     | Kwetsbaarheden in afhankelijkheden (osv-scanner) verslechteren niet — wordt overgeslagen als de binary ontbreekt                                                                                                                                     | **Adviserend**                                      |
| `check:workflows`        | Workflow-linting (actionlint + zizmor); ontbrekende/defecte scanners, ongeldige rapporten of een ontbrekende ratchet-baseline leiden tot INCOMPLETE. Geldige bevindingen volgen het geselecteerde beleid voor strikt/adviserend/ratchet              | Uitvoering vereist; zizmor-ratchet blokkerend in CI |
| `check:openapi-breaking` | Compatibiliteitsbrekende wijzigingen in het openbare API-contract (`openapi.yaml`) ten opzichte van de basistak (oasdiff) — genereert `openapiBreaking=N`; wordt overgeslagen als oasdiff ontbreekt of de basisspecificatie niet kan worden opgelost | **Adviserend**                                      |

### Taak: `docs-sync-strict`

Wordt bij elke PR naar `main` uitgevoerd. Blokkeert het mergen bij een fout.

| Script                         | Valideert                                                                                                                                                                                            | Blokkerend                |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `check:docs-all`               | Meta-poort die de 6 onderstaande subpoorten achter elkaar uitvoert                                                                                                                                   | Ja                        |
| ↳ `check:docs-sync`            | Versieconsistentie van CHANGELOG / OpenAPI / llm.txt                                                                                                                                                 | Ja                        |
| ↳ `check:docs-counts`          | Aantallen in proza (aantal providers, aantal migraties, enz.) vallen binnen het ratchet-venster van de werkelijke aantallen                                                                          | Ja                        |
| ↳ `check:env-doc-sync`         | Elke env-var in `.env.example` is gedocumenteerd in een documentatietabel, en omgekeerd                                                                                                              | Ja                        |
| ↳ `check:deprecated-versions`  | Geen verouderde versietekenreeksen in de documentatie                                                                                                                                                | Ja                        |
| ↳ `check:doc-links`            | Interne markdown-links in de documentatie verwijzen naar bestaande bestanden (`[text]`/`(path)`-vorm)                                                                                                | Ja                        |
| ↳ `check:fabricated-docs`      | Routes, env-vars, CLI-opdrachten, hooknamen en bestandspaden die in de documentatie worden genoemd, bestaan in de codebase. Harde poort via `--strict`; zonder vlag wordt de controle zacht gefaald. | Ja (via `--strict` in CI) |
| `check:cli-i18n`               | CLI-opdrachttekenreeksen zijn aanwezig in alle i18n-lokalebestanden                                                                                                                                  | Ja                        |
| `check:openapi-coverage`       | De OpenAPI-specificatie dekt ten minste een geratchete ondergrens van de werkelijke routes                                                                                                           | Ja                        |
| `check:openapi-security-tiers` | Beveiligingsniveau-annotaties in `openapi.yaml` zijn consistent met de classificaties van `routeGuard.ts`                                                                                            | **Adviserend**            |
| `check:openapi-routes`         | Elk pad in `openapi.yaml` verwijst naar een bestaande `route.ts` (anti-hallucinatie)                                                                                                                 | Ja                        |
| `check:docs-symbols`           | Elke `/api/...`-verwijzing in `docs/**/*.md` verwijst naar een bestaande `route.ts` (anti-hallucinatie)                                                                                              | Ja                        |
| `i18n translation drift`       | Niet-vertaalde sleutels in i18n-lokalebestanden — alleen waarschuwing                                                                                                                                | **Adviserend**            |

De twaalf README-SVG's onder `docs/diagrams/` worden gegenereerd (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` genereert ze allemaal opnieuw). Elk bestand heeft een unittests voor bytevergelijking
(`tests/unit/docs/readme-*-svg.test.ts`, taak `test-unit`) die faalt wanneer het gecommitte bestand verouderd is, en `check:docs-counts` leest canonieke getallen uit hun `<text>`-nodes — daarom zorgt de omtrekstap ervoor dat elke omtrekte tekenreeks in het bestand blijft staan als onzichtbare `<text>`. De controle op canonieke SVG-getallen leest de bestanden die zijn opgenomen in
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` en
`tier-flow-light.svg`; de claims over `free-forever`, `catalog-entry`, `recurring-pool` en `scoring-factors` lezen ook
`promise-pillars.svg`, `free-tier-budget.svg` en `strategies-grid.svg`. `free-tier-budget.svg`
haalt zijn cijfers uit de live cataloguslader, dus een wijziging in `FREE_MODEL_BUDGETS` of in een
weergavenaam van een provider laat CI rood worden totdat dat bestand opnieuw is gegenereerd.

### Taak: `i18n-ui-coverage`

| Script                            | Valideert                                                                                                                                                                                                              | Blokkerend     |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | Dekking van UI-i18n-sleutels is ≥ 65%                                                                                                                                                                                  | Ja             |
| `check-ui-value-drift` (inline)   | Een herschreven Engelse **waarde** laat geen verouderde vertaling achter                                                                                                                                               | Ja             |
| `check-new-key-coverage` (inline) | Een **nieuwe** Engelse sleutel is in elke landinstelling vertaald — een `__MISSING__:`-markering wordt afgewezen                                                                                                       | Ja             |
| `check-translation-ratio`         | De verhouding echte vertalingen per landinstelling (identiek aan Engels / placeholder / ontbrekende vertalingen buiten de allowlist) mag niet hoger zijn dan `config/quality/i18n-translation-baseline.json` + speling | **Adviserend** |

Heeft `fetch-depth: 0` nodig — de waardeverandering-poort vergelijkt `en.json` met de mergebasis.

#### `check-ui-value-drift` — poort voor verouderde vertalingen

Vangt de ene i18n-regressie op die de andere gates structureel niet kunnen zien: een Engelse waarde
wordt herschreven en de vertalingen die van het _vorige_ Engels zijn afgeleid, blijven achter, waardoor
niet-Engelstalige gebruikers zelfverzekerd klinkende, maar inmiddels onjuiste tekst blijven lezen.

Dit is daadwerkelijk uitgebracht. `oauthModal.googleOAuthWarning` werd herschreven toen de Antigravity
inloghelper werd toegevoegd (#5203); **39 van de 43 locales** behielden tekst die operators vertelde de
"volledige URL te kopiëren en hieronder te plakken" — een flow die voor die provider niet kan worden voltooid. Het bleef onopgemerkt tot #8463, omdat:

- `sync-ui-keys` alleen sleutels aanvult die **ontbreken**, nooit sleutels die **verouderd** zijn;
- `check-ui-keys-coverage` de _aanwezigheid_ van sleutels telt, waardoor een verouderde vertaling als gedekt wordt beschouwd;
- `check-translation-drift` de documentatiespiegelbestanden `docs/i18n/<locale>/**.md` bijhoudt —
  het leest nooit `src/i18n/messages/*.json`. Blokkerend in job `docs-sync-strict` sinds de
  2026-09-hersynchronisatie: bewerk een kerndocument → `npm run i18n:run -- --files=<doc>` (op sectieniveau, goedkoop).

**Diff-bewust, niet op een baseline gebaseerd.** Het vergelijkt `en.json` op de mergebasis met de
working tree; voor elke sleutel waarvan de Engelse waarde is gewijzigd, is elke locale die nog een
ongewijzigde vertaling bevat verouderd. Dit **bevriest bestaande schuld** bewust — een diff kan niet
onthullen van welk oud Engels een langdurig bestaande vertaling afkomstig is, dus de gate beoordeelt
alleen wat door de huidige wijziging wordt geraakt. Het alternatief (een baseline met een hash per
sleutel) zou een gegenereerd bestand van ongeveer 600 KB kosten, 3× zo groot als de grootste
bestaande baseline, en bij elke i18n-PR wijzigingen veroorzaken.

Twee manieren om hieraan te voldoen:

1. werk de betreffende vertalingen bij, of
2. stel ze in op `__MISSING__:<new english>` — de runtime levert dan het gecorrigeerde Engels
   (`src/i18n/request.ts::deepMergeFallback`, #7258) en de sleutel wordt in de wachtrij voor vertaling geplaatst.

Als de **betekenis** van de tekenreeks is gewijzigd, geef dan de voorkeur aan **het hernoemen van de sleutel**:
een nieuwe sleutel kan geen verouderde vertaling erven. Dat is het patroon dat #8463 gebruikte.

```bash
npm run i18n:check-value-drift          # strikt (wat CI uitvoert)
npm run i18n:check-value-drift:warn     # alleen rapporteren
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Wordt afgesloten met 0 en `SKIP reason=base-unresolved` wanneer de basiscatalogus niet kan worden gelezen
(shallow clone zonder de basisreferentie), naar het voorbeeld van `check-openapi-breaking`.

### Job: `i18n`

Volledige i18n-validatiematrix (één job per locale). De volledige job is adviserend.

| Script                          | Valideert                               | Blokkerend                                                       |
| ------------------------------- | --------------------------------------- | ---------------------------------------------------------------- |
| `validate_translation.py quick` | Volledigheid van vertalingen per locale | **Adviserend** (`continue-on-error: true` voor de volledige job) |

### Job: `pr-test-policy`

Wordt alleen uitgevoerd voor pull requests.

| Script                 | Valideert                                                                                                                                                | Blokkerend |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PR's die productiecode wijzigen in `src/`, `open-sse/`, `electron/` of `bin/` moeten tests bevatten of bijwerken (Harde regel #8)                        | Ja         |
| `check:test-masking`   | Gewijzigde testbestanden verminderen het totale aantal asserts niet en voegen geen tautologieën zoals `assert.ok(true)` toe                              | Ja         |
| `check:pr-evidence`    | De PR-beschrijving verwijst naar test-/VPS-bewijs voor de wijziging (automatiseert Harde regel #18 door PR-proza te doorzoeken — kwetsbaar, zie Backlog) | Ja         |

### Job: `test-vitest`

Wordt uitgevoerd na `build`. Blokkeert de merge bij een fout.

| Suite            | Valideert                                                | Blokkerend                                                                                                               |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP-server (110 tools), autoCombo, cache — vitest-runner | Ja                                                                                                                       |
| `test:vitest:ui` | UI-componenttests — vitest-runner                        | **Blokkerend** — bestaande fouten zijn expliciet uitgesloten in `vitest.config.ts`; nieuwe fouten laten de job mislukken |

### Nachtelijke workflows (gepland, adviserend)

Deze worden volgens een cron-schema uitgevoerd (en via `workflow_dispatch`), nooit voor PR's. Alle zijn adviserend.

| Workflow               | Valideert                                                                                                                                                                     | Blokkerend     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | fast-check-propertytests met een willekeurige seed + hoog aantal uitvoeringen                                                                                                 | **Adviserend** |
| `nightly-resilience`   | heap-groeidrempel, chaos-foutinjectie, k6-belasting/soak                                                                                                                      | **Adviserend** |
| `nightly-llm-security` | promptfoo-injectiebewaking (blokkeermodus) + garak-probes (overgeslagen zonder een providergeheim)                                                                            | **Adviserend** |
| `nightly-schemathesis` | OpenAPI-contractfuzzing (schemathesis) tegen een live OmniRoute met `docs/openapi.yaml` — brengt specificatieschendingen / niet-afgehandelde 500's aan het licht (Fase 8 B.4) | **Adviserend** |
| `nightly-mutation`     | Stryker-mutatie-testscore over de snelle unit-lane — overlevende mutanten brengen zwakke asserts aan het licht                                                                | **Adviserend** |
| `nightly-compat`       | Node-engine-compatibiliteitsmatrix over de ondersteunde bereiken van `engines.node`                                                                                           | **Adviserend** |

Prestatiebaselines (heap, TTFB, buildtijd) worden vastgelegd, maar niet als poort gebruikt: zie [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

## Allowlistbeleid

Elke gate die niet mag falen op reeds bestaande overtredingen, gebruikt een bevroren allowlist
(bijv. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Het beleid is:

**Los de hoofdoorzaak op; gebruik de allowlist alleen wanneer de overtreding reeds bestond en
niet in dezelfde PR kan worden opgelost.**

Bij het toevoegen van een item aan een allowlist:

1. Voeg een commentaarregel toe met de rechtvaardiging.
2. Verwijs naar het tracking-issue (bijv. `// #3498 — Fase 2-functionaliteit, nog niet geïmplementeerd`).
3. Verwijder het item in dezelfde PR die de overtreding oplost — een verouderd item dat niet langer
   een actieve overtreding onderdrukt, is zelf een defect (6A.3-controle op verouderde handhaving zal,
   zodra deze is geïmplementeerd, de gate laten falen bij een verweesd allowlist-item).

Voeg **geen** allowlist-items toe om tests sneller te laten slagen. Een groene gate met een groeiende
allowlist geeft een vals gevoel van kwaliteit.

### Wanneer een gate faalt voor je PR

1. **Lees de uitvoer van de gate zorgvuldig** — daarin staat precies welk bestand of symbool
   de regel heeft overtreden.
2. **Los de overtreding op** — de meeste gates zijn deterministische bestandssysteemcontroles die slagen zodra
   de code correct is.
3. **Als de overtreding reeds bestond** (d.w.z. jij hebt deze niet geïntroduceerd, maar de gate
   dekt deze nu wel): voeg een allowlist-item toe met een rechtvaardigingscommentaar en een tracking-issue.
4. **Als de gate een ratchet is** (dekking, ESLint-waarschuwingen, duplicatie, complexiteit):
   je wijziging heeft de metriek verslechterd. Los het onderliggende probleem op of voer (zelden)
   `npm run quality:ratchet -- --update` uit als de wijziging opzettelijk is en de
   verslechtering van de metriek aanvaardbaar is — maar leg in de PR-beschrijving uit waarom.
5. **Adviserende gates** (`continue-on-error: true`) zijn informatief — ze blokkeren
   het samenvoegen niet, maar verschijnen wel in het CI-overzicht. Los ze desondanks op.

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

## Rationalisatiebacklog (ROI-beoordeling — Fase 9 Golf 3)

Deze inventaris is op 2026-06-17 afgestemd op `ci.yml` (in de vorige versie ontbraken
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Een ROI-beoordeling van de afgestemde set
heeft de volgende kandidaten voor rationalisatie opgeleverd. **De samenvoegingen zijn mechanische CI-
wijzigingen; de omschakelingen/verwijderingen zijn beleidsbeslissingen die aan de operator zijn voorbehouden.** Niets hieronder
is al toegepast.

**Hierboven eveneens niet gedocumenteerd** (adviserend, weinig signaal): de `docs-lint`-job
(markdownlint + Vale, volledige job met `continue-on-error`) en de zelfstandige scannerworkflows
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` staat in
`quality-baseline.json`, maar is niet gekoppeld aan een blokkerende ratchet in `ci.yml` — de metriek is
momenteel verweesd.

### Samenvoegen / dedupliceren (mechanisch, lager risico)

Elke kandidaat is op 2026-06-17 gevalideerd aan de hand van de actuele gatestatus (vertrouwen-maar-verifiëren);
verscheidene „voor de hand liggende” samenvoegingen bleken verborgen achterstand te bevatten en zijn **geen** probleemloze vervangingen.

- **`check:docs-sync` wordt tweemaal uitgevoerd** — zelfstandig in de `lint`-job en opnieuw binnen `check:docs-all` (`docs-sync-strict`) en de husky-pre-commithook. ✅ **VOLTOOID** — zelfstandige aanroep in `lint` verwijderd.
- **CVE-scanning** — ❌ **GEEN probleemloze samenvoeging.** `audit:deps` faalt hard bij elke hoge/kritieke CVE; `check:vuln-ratchet` (osv) faalt alleen bij een _regressie_ ten opzichte van de baseline (momenteel 1 MODERATE). Verschillende semantieken — door `audit:deps` te verwijderen zou de absolute gate voor hoge/kritieke kwetsbaarheden verloren gaan. Beide behouden.
- **Cyclusdetectie** — ✅ **VOLTOOID** (#15159 G-01/G-02). De oude tekst noemde `check:cycles` de „groene, gecureerde” gate en rechtvaardigde het blokkerend houden ervan omdat `check:circular-deps` (dpdm) 91 cycli rapporteerde. Dat groen was **vals groen**: `check:cycles` scande 5 submappen (450 bestanden), herkende alleen statische `import|export … from` en negeerde elke `@/`- en `@omniroute/open-sse/`-specifier, waardoor de door dynamische imports en aliassen gedomineerde cycli in de repo niet zichtbaar waren. Opgelost: de gate doorloopt nu `src` + `open-sse` (5023 bestanden), verzamelt specifiers uit de TypeScript-AST (waardoor `import("…")` meetelt en `typeof import("…")` in een typepositie niet) en verwerkt de `paths` uit tsconfig. De gate vindt **14** cycli, niet 0. Omdat 14 bestaande cycli niet in een gate-PR kunnen worden opgelost, is `check:cycles` nu een **ratchet** (`--ratchet`, plafond `metrics.cycles.value = 14` in `quality-baseline.json`, `direction: down`) — deze blokkeert elke _regressie_ en het aantal kan alleen dalen. CI voert `npm run check:cycles:ratchet` uit. De afbouw loopt mee met **A-01**. `check:circular-deps` (dpdm) blijft adviserend als bredere second opinion.
- **Complexiteit** — ✅ **VOLTOOID** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): één ESLint-doorloop, tellingen per ruleId zodat de cyclomatische+max-lines- en cognitieve baselines onafhankelijk blijven; de afzonderlijke `check:complexity` / `check:cognitive-complexity` blijven beschikbaar voor lokaal gebruik met `--update`.
- **`/api`-anti-hallucinatie** — ✅ **VOLTOOID** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): één FS-inventarisatie van `src/app/api`; openapi-routes + docs-symbols blijven onafhankelijk rapporteren; de afzonderlijke controles blijven beschikbaar voor lokale uitvoeringen.
- **`check:node-runtime` wordt in 11 jobs uitgevoerd** — ⚠️ **lage ROI.** Elke job gebruikt een afzonderlijke runner en de controle duurt <1s; totale besparing ~10s, ten koste van een goedkope beveiliging per job. De verstoring niet waard.
- **`typecheck:noimplicit:core` in CI-lint** — ✅ **verwijderd uit de lint-job** (was adviserend met `continue-on-error`); het blokkerende typeoppervlak bestaat uit `typecheck:core` + `check:type-coverage`. Lokaal script behouden.

### Omschakelen / beslissen (operatorbeleid)

- `check:openapi-security-tiers` (adviserend) — ❌ **NIET probleemloos omschakelbaar.** Deze eindigt met 0, maar waarschuwt dat meerdere `traffic-inspector`-routes onder `LOCAL_ONLY_API_PREFIXES` de annotatie `x-loopback-only: true` missen. Afdwinging vereist dat die annotaties eerst aan `openapi.yaml` worden toegevoegd.
- `typecheck:noimplicit:core` (adviserend) — grotendeels afgedekt door de blokkerende `check:type-coverage`-ratchet. Schakel om naar een ratchet of verwijder de redundante tweede `tsc`-doorloop.
- `test:vitest:ui` (nu **blokkerend**) — bestaande fouten zijn expliciet uitgesloten in `vitest.config.ts` met `// #8618`-trackingopmerkingen; nieuwe fouten laten de job mislukken.
- `check:secrets` (gitleaks, blokkerende ratchet vastgezet op 3 gedocumenteerde foutpositieven) — zet de 3 op de allowlist om 0 te bereiken, of degradeer de controle tot adviserend. Overlapt met de ingebouwde secret-scanning van GitHub + `check:public-creds`.
- `check:pr-evidence` (blokkerend, doorzoekt de prozatekst van de PR-body met grep) — hoog risico op foutpositieven; verwijdering verzwakt de handhaving van Hard Rule #18, dus dit is een echte beleidsbeslissing.
- `semgrep` (zelfstandig adviserend) — overlapt met CodeQL voor de OWASP-categorieën; koppel de baseline aan een ratchet of verwijder de controle.

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
