# Quality Gates Reference (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Dette dokument er den autoritative reference for alle CI-kvalitetskontroller i OmniRoute.
Det beskriver hver kontrol, hvad den validerer, hvilket CI-job den kører i, om den bruger
en ratchet-baseline eller en bestået/ikke bestået-politik, og om den blokerer buildet eller kun er vejledende.

Se afsnittet "Kvalitetskontroller og ratchets"
i `AGENTS.md` for at få en kort oversigt og politikken for tilladelseslisten. Se
[Playbook for kvalitetskontroller](../ops/QUALITY_GATE_PLAYBOOK.md) for den kritiske vurdering, modenhedsklassificering og værktøjsuafhængige
plan til replikering af det samme system.

---

## Gate-inventar og eksekveringsprofiler

### Kandidatoptagelse

CI- og Quality Gates-workflowsene afgiver hver en stabil afgørelse: `Gate / CI` og
`Gate / Quality`. Deres versionsstyrede optagelsespolitik opregner hvert upstream-job
som påkrævet eller rådgivende. Et relevant påkrævet job skal lykkes: manglende,
annullerede, sprunget over, afventende og ukendte resultater kan ikke etablere PASS. En gyldig
klassifikation som kun dokumentation eller kun katalog kan gøre en kodelane ikke-relevant;
en kladde-PR er ikke en accepteret kandidat. En `hotfix`-etiket fritager ikke for evidens.

Begge workflows dækker PR'er ind i main/release-brancher, pushes til
`main`, manuel dispatch og merge-group-hændelser. Push, dispatch og merge-group kører det fulde udvalg. Pushes til
`release/**` starter dem ikke (2026-10-18): hver ændring har allerede kørt matrixen på sin PR,
og den flettede kombination er Release-Greens opgave (`docs/ops/RUNNER_BOX.md` → Hostet lane). Forks
og merge groups bruger hostede runners til jobs, der ellers vælger selvhostede
runners; tilstrækkelig hostet kapacitet skal verificeres før udrulning.

Hver JSON-kvittering identificerer den udtjekkede SHA, workflow-kørslen og forsøget.
CLI'en afviser et mismatch mellem checkout-/hændelses-SHA'er. Workflow-tests binder politikmedlemskab
til verdict-jobbets `needs`-liste, så en ny eller fjernet lane ikke lydløst kan forsvinde.
Kvitteringerne dækker deres eget workflow, ikke publicering, deployment eller internerne i en
eksisterende rådgivende scanner. Aktivering af begge checknavne i brancheregler er en separat
administrativ ændring; tilføjelse af disse jobs beskytter ikke i sig selv en branch.

### Inventar over statiske scanninger

Det versionsstyrede npm-alias-inventar og medlemskabet af statiske scanninger findes i
`config/quality/gate-manifest.json`. Kør `npm run check:gate-manifest` for at validere
scriptnavne og nøjagtige kommandoer mod `package.json`; tilføjelser, fjernelser og
kommandoafvigelser får både den lokale hook og ændringsklassifikationsjobbene i CI til at fejle.
Et alias er ikke et workflow-job, en matrixinstans eller et testtilfælde: disse optællinger må
ikke præsenteres som indbyrdes udskiftelige.

Brug `npm run quality:scan -- --list` eller `npm run quality:scan:fast -- --list`
for at inspicere de valgte aliaser uden at køre dem. Runneren kalder npm-entrypointet, så dets runtime
(inklusive Bun, hvor det er konfigureret) bevares.
Manifestet registrerer aliaser uden for disse profiler som separat påkaldte, og
vedligeholdelseskommandoer er forbudt i skrivebeskyttede scanningsprofiler.

Disse profiler dækker kun den statiske scanning. De certificerer ikke produkttests,
dækning, pakning, eksterne checks eller en kandidats fulde releasegodkendelse.
Workflow-optagelse bruger den tilknyttede `config/quality/admission-policy.json` og
`scripts/quality/admission-verdict.mjs`. Release-observatørprofiler forbliver separate;
inspicér deres relevante checks og kvitteringer uafhængigt. Inventaret nedenfor
er en reference, ikke et bevis på, at en gate faktisk blev kørt.

Scripts ligger under `scripts/check/` (politikgates) og `scripts/quality/` (ratchet-motor).
CI's kilde til sandheden er `.github/workflows/ci.yml`.

### Hurtig sti for release-PR'er (`quality.yml`)

`.github/workflows/quality.yml` supplerer CI på main/release-PR'er, pushes til `main`,
dispatch og merge groups. PR'er bruger hurtige checks filtreret efter sti. Den permanent
deaktiverede duplikerede build blev fjernet; de faktiske build-, pakke- og boot-checks forbliver i CI.

| Job                                              | Omfang                                                                                                                                                                                            | Blokerende          |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `Docs Gates (fast-path)`                         | Dokumentations-/kode-PR'er; API-dokumentationsreferencer og alle dokumentationstjek                                                                                                               | Ja                  |
| `Fast Quality Gates`                             | Kode-PR'er; statiske checks, typecheck, dashboard-typecheck, påvirkede enhedstests                                                                                                                | Ja                  |
| `Forgotten sibling tests`                        | Kode-PR'er; ændrede moduler sporet til statiske forbrugere og kandidat-søskendetests; barrel- og dynamiske importstier rapporteres som rådgivende diagnostik med refererede allowlisteundtagelser | **Rådgivende**      |
| `Vitest (fast-path)`                             | Kode-PR'er; hurtig vitest-suite                                                                                                                                                                   | Ja                  |
| `Unit Tests fast-path`                           | Kode-PR'er; enhedstest-suite med 4 shards                                                                                                                                                         | Ja                  |
| `No new ESLint warnings`                         | Kode-PR'er; lint-vagt, der tager højde for undertrykkelser                                                                                                                                        | Ja, inklusive forks |
| `Merge integrity (changelog + generated skills)` | Ikke-kladde-PR'er; synkronisering af changelog og genererede skills                                                                                                                               | Ja, inklusive forks |

#### Rapport over glemte søskendetests

`npm run check:forgotten-sibling-tests` genbruger import-resolveren bag test-impact-kortet.
For hvert ændret produktionsmodul rapporterer den deterministiske
kæder af typen `changed module/symbol -> static consumer -> candidate sibling test`, når kandidat-
testen mangler i pull request-diffet. Markdown-opsummeringen og JSON-resultatet gemmes som
workflow-artefaktet `forgotten-sibling-tests` til kalibrering, før en blokerende udrulning.

Barrel-eksporteringer og dynamiske importer er kun opløsningsdiagnostik; de opretter aldrig en
blokerende fund. Gennemgåede undtagelser findes i
`config/quality/forgotten-sibling-allowlist.json`. Hver post skal angive forbrugeren og kandidat-
testen, give en specifik begrundelse og linke til en GitHub-issue eller pull request. Fejlformaterede poster
medfører en lukket fejltilstand. Undtagelser kan ikke undertrykke en slettet kandidat-test eller en diff,
der tilføjer `.skip`/`.todo`; svækkelse af assertions og anden maskering håndteres fortsat af den
uafhængigt blokerende gate `check:test-masking`.

### Job: `lint`

Kører på alle PR'er til `main`. Blokerer merge ved fejl.

| Script (`npm run ...`)            | Validerer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Blokerende                                 |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Node.js-versionen ligger inden for det understøttede interval                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                         |
| `check:cycles`                    | Cirkulære importer på tværs af hele `src/` + `open-sse/` (AST-baseret, tsconfig `paths` løst). Uden yderligere flag afsluttes med status 1, når der findes en cyklus (fail-closed siden #15281), og SCC'erne vises. `check:cycles:ratchet` (det, CI kører) blokerer, når antallet overstiger grænsen `metrics.cycles` i `quality-baseline.json` — aktuelt 14, `direction: down`, så det kan kun falde (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja (ratchet)                               |
| `check:boundary`                  | Koblingen `open-sse → src`: entydige fil-til-fil-importer fra motoren til appen (`scripts/quality/measure-boundary.mjs`; kantlisten er afhjælpningsbackloggen for v4 core/module-split). Uden yderligere flag genereres en rådgivende rapport (samme som `quality:boundary`). `check:boundary:ratchet` (det, CI kører, også i ratchet-loopet for fast-gates i `quality.yml`) blokerer, når antallet overstiger grænsen `metrics.boundaryOpenSseToSrc` i `quality-baseline.json` — initialiseret til den målte værdi 771, `direction: down`; `--update` kan kun sænke den; base-relativ på PR'er (`--base-ref`, se nedenfor)                                                                                                                                                                                                                                                                                                 | Ja (ratchet)                               |
| `check:route-validation:t06`      | Zod-skemaer findes på alle routes (Tier 6-politik)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:any-budget:t11`            | Antallet af `@ts-expect-error // any` overskrider ikke budgettet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:provider-consistency`      | Alle providers i `providers.ts` har en tilsvarende post i `providerRegistry.ts` (og omvendt, inden for allowlisten)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                         |
| `check:model-lifecycle`           | De tre manuelt vedligeholdte routingtabeller forbliver konsistente med det versionskontrollerede lifecycle-snapshot (#11503): `FITNESS_TABLE` (`taskFitness.ts`) tildeler ikke en score til et pensioneret id, som `REGISTRY` kan route; alle mål for `BUILT_IN_ALIASES` findes i `REGISTRY` og mangler i snapshot'et over pensionerede id'er; alle pensionerede id'er, der stadig findes i `REGISTRY`, videresendes eller er angivet i `allowedRetiredInCatalog`; og ingen kilde eller noget mål i `DEFAULT_DEGRADATION_MAP` er markeret som pensioneret i snapshot'et. Dette beviser ikke, at en model aktuelt leveres af en aktiv upstream. Offline — sammenligner med `config/quality/model-lifecycle.json`, som opdateres manuelt med `npm run quality:refresh-model-lifecycle` (netværk; ikke integreret i CI). `allowedRetiredInCatalog` er en nedtrapningsratchet: Tilføj kun en post sammen med en tracking-issue. | Ja                                         |
| `check:fetch-targets`             | Alle `fetch("/api/...")` i klientside-`src/` løses til en reel `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:deps`                      | Alle `npm install`-installerbare afhængigheder på tværs af alle `package.json` i repositoriet findes i `dependency-allowlist.json`; nye ikke-pinnede eller slopsquattede pakker markeres                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                         |
| `audit:deps`                      | `npm audit` (root + electron) — ingen advisories med høj eller kritisk alvorlighedsgrad (overlapper med osv `check:vuln-ratchet`; se Rationalization Backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                         |
| `check:lockfile`                  | `package-lock.json`-integritet — https-register, integritetshashes, ingen værtstilsidesættelser                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:licenses`                  | SPDX-licensliste over tilladte produktionsafhængigheder                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                         |
| `check:tracked-artifacts`         | Ingen buildartefakter eller committede `node_modules`-symlinks (køres også i husky pre-commit; pre-push er med vilje begrænset — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                         |
| `check:ai-attribution`            | Ingen AI-/bot-`Co-Authored-By`-footer eller AI-genereringsfooter i PR-commits, titel eller brødtekst — Hard Rule #16 (i `quality.yml`-loopet for fast-gates for PR→`release/**` — læser eventnyttelasten, er no-op uden for PR'er — og et trin kun for PR'er i `ci.yml`-lint for PR→`main`; også husky-`commit-msg`-hooket; menneskelige medforfattere er tilladt; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:vitest-exclusions`         | Enhver Vitest-ekskludering angiver en tracking-issue og findes i `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                         |
| `check:file-size`                 | Kildefiler (`.ts`/`.tsx` i `src/`, `open-sse/`, `electron/`, `bin/`) holder sig inden for `cap`, og testfiler (`*.test.ts(x)`) inden for `testCap`; filer, der er fastfrosset i `file-size-baseline.json` (`frozen` / `testFrozen`), må ikke vokse ud over deres registrerede størrelse                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                         |
| `check:error-helper`              | Fejlsvar i executorer/handlere bruger `buildErrorBody()` / `sanitizeErrorMessage()` (Hård regel nr. 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                         |
| `check:migration-numbering`       | SQL-migrationsfiler er nummereret sekventielt uden huller eller dubletter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:public-creds`              | Ingen bogstavelige OAuth `client_id`/`client_secret` eller Firebase Web-nøgler uden for `publicCreds.ts` (Hård regel nr. 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ja                                         |
| `check:db-rules`                  | Ingen rå SQL uden for modulerne i `src/lib/db/`; ingen barrel-imports fra `localDb.ts` (Hårde regler nr. 2 og 5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                         |
| `check:known-symbols`             | Provider-executorer, routingstrategier og oversættere, der er registreret i deres dispatch-tabeller, stemmer overens med filerne på disken — ingen forældreløse eller ikke-deklarerede symboler                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:route-guard-membership`    | Hver route, der starter en underordnet proces, klassificeres af `isLocalOnlyPath()` (Hårde regler nr. 15 og 17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:test-discovery`            | Alle `*.test.ts` / `*.spec.ts`-filer i lageret samles inn av minst én testrunner (ratchet: foreldreliste i `test-discovery-baseline.json` kan bare bli kortere)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:test-tla-order`            | Ingen `node:test`-fil under `tests/unit` registrerer en test, treffer en top-level `await` og registrerer deretter flere (#18045; ratchet: `test-tla-order-allowlist.json` kan bare bli kortere)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                         |
| `check:agent-skills-sync`         | Genererte agentferdighetsartefakter samsvarer med kildekatalogen (ingen avvik)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:provider-asset-provenance` | Leverandørlogoer/-ressurser har en registrert opprinnelsesoppføring                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `lint:json`                       | JSON-konfigurasjonsfiler kan tolkes og oppfyller reglene for linting i lageret                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `typecheck:core`                  | TypeScript-kompilering uten feil (kun veiledende advarsler)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                         |
| `typecheck:noimplicit:core`       | Streng `noImplicitAny` — fremtidsrettet; mange eksisterende kallesteder trenger fortsatt typeannotasjoner                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **Veiledende** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` afgrænset til `src/app/(dashboard)/**` (#7033) — `typecheck:core`'s kuraterede allowliste på 27 filer inkluderer ingen dashboard-TSX-filer, og `next build` typechecker dem heller aldrig (`next.config.mjs` angiver `ignoreBuildErrors: true`), så regressioner med forældreløse identifikatorer der (#6625/#6909) var usynlige for CI. Diffes mod en fastfrosset baseline med antal pr. fil/TS-kode (`config/quality/dashboard-typecheck-baseline.json`, samme mønster for håndhævelse af forældede fejl som `check:known-symbols`) — kun NYE fejl ud over det baseline-angivne antal får gate til at fejle; ratchet ned med `--update`, når en eksisterende fejl er rettet.                                                                                                                                                                                                                                        | Ja                                         |

### Job: `quality-gate`

Kører efter `test-coverage`. Blokerer merge ved fejl.

| Script                       | Validerer                                                                                                                                                                      | Blokerende                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `quality:collect`            | Udsender `quality-metrics.json` (antal ESLint-advarsler, dækning fra den sammenlagte shard-rapport)                                                                            | Ja (opstrøms for ratchet) |
| `quality:ratchet`            | Hvert mål i `quality-baseline.json` er ikke blevet forringet (ESLint-advarsler ≤ baseline; dækning ≥ baseline)                                                                 | Ja                        |
| `check:duplication`          | Kodeduplikering (jscpd@4) overstiger ikke baseline i `quality-baseline.json`                                                                                                   | Ja                        |
| `check:complexity`           | Filniveauets cyklomatiske kompleksitet overstiger ikke grænsen (core-ESLint `complexity` + `max-lines-per-function`)                                                           | Ja                        |
| `check:cognitive-complexity` | Ratchet for kognitiv kompleksitet (`eslint-plugin-sonarjs`) — separat ESLint-kørsel; CI kører begge samlet som ét `check:complexity-ratchets`-trin                             | Ja                        |
| `check:dead-code`            | Ratchet for ubrugte eksporter/filer (knip) forringes ikke i forhold til baseline                                                                                               | Ja                        |
| `check:compression-budget`   | Budget for komprimeringsbenchmark — minimumsgrænserne for tokenbesparelser pr. engine må ikke forringes                                                                        | Ja                        |
| `check:type-coverage`        | Ratchet for procentdel med typer (`type-coverage`) forringes ikke; dækker i vid udstrækning `typecheck:noimplicit:core`                                                        | Ja                        |
| `check:codeql-ratchet`       | Antallet af åbne CodeQL-advarsler forringes ikke (læses via `gh api`; springes elegant over uden token) — opdateringskadence og manuel udløsning: se "CodeQL-ratchet" nedenfor | Ja                        |

### Job: `quality-extended`

Hele jobbet er rådgivende (`continue-on-error: true`). De npm-baserede ratchets køres
reelt; de eksterne scannere installeres via `gh release download` og springer selv over (exit 0),
når en binærfil stadig mangler.

| Script                   | Validerer                                                                                                                                                                                                              | Blokerende                                    |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `check:circular-deps`    | Ingen cirkulære afhængigheder (dpdm)                                                                                                                                                                                   | **Rådgivende**                                |
| `check:bundle-size`      | Bundle-størrelsen overstiger ikke grænsen                                                                                                                                                                              | **Rådgivende**                                |
| `check:secrets`          | Hemmelighedsscanning (gitleaks) — springer over, hvis binærfilen mangler                                                                                                                                               | **Rådgivende**                                |
| `check:vuln-ratchet`     | Afhængighedssårbarheder (osv-scanner) forringes ikke — springer over, hvis binærfilen mangler                                                                                                                          | **Rådgivende**                                |
| `check:workflows`        | Workflow-lint (actionlint + zizmor); manglende eller defekte scannere, ugyldige rapporter eller manglende ratchet-baseline fejler som INCOMPLETE. Gyldige fund følger den valgte strenge/rådgivende/ratchet-politik    | Kørsel påkrævet; zizmor-ratchet blokerer i CI |
| `check:openapi-breaking` | Breaking changes i den offentlige API-kontrakt (`openapi.yaml`) sammenlignet med base-branchen (oasdiff) — udsender `openapiBreaking=N`; springer over, hvis oasdiff mangler, eller basespecifikationen ikke kan løses | **Rådgivende**                                |

### Job: `docs-sync-strict`

Kører på hver PR til `main`. Blokerer merge ved fejl.

| Script                         | Validerer                                                                                                                                                         | Blokerende               |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `check:docs-all`               | Meta-gate, der kører de 6 underliggende gates sekventielt                                                                                                         | Ja                       |
| ↳ `check:docs-sync`            | Versionskonsistens mellem CHANGELOG / OpenAPI / llm.txt                                                                                                           | Ja                       |
| ↳ `check:docs-counts`          | Antal i prosa (antal providere, antal migreringer osv.) ligger inden for ratchet-vinduet for de faktiske antal                                                    | Ja                       |
| ↳ `check:env-doc-sync`         | Hver env-variabel i `.env.example` er dokumenteret i en dokumentationstabel, og omvendt                                                                           | Ja                       |
| ↳ `check:deprecated-versions`  | Ingen forældede versionsstrenge i dokumentationen                                                                                                                 | Ja                       |
| ↳ `check:doc-links`            | Interne Markdown-links i dokumentationen peger på faktiske filer (`[text]`/`(path)`-format)                                                                       | Ja                       |
| ↳ `check:fabricated-docs`      | Ruter, env-variabler, CLI-kommandoer, hook-navne og filstier, der citeres i dokumentationen, findes i kodebasen. Hård gate via `--strict`; soft-fail uden flaget. | Ja (via `--strict` i CI) |
| `check:cli-i18n`               | CLI-kommandostreng findes i alle i18n-locale-filer                                                                                                                | Ja                       |
| `check:openapi-coverage`       | OpenAPI-specifikationen dækker mindst et ratchet-justeret minimum af faktiske ruter                                                                               | Ja                       |
| `check:openapi-security-tiers` | Sikkerhedsniveau-annoteringer i `openapi.yaml` stemmer overens med klassifikationerne i `routeGuard.ts`                                                           | **Vejledende**           |
| `check:openapi-routes`         | Hver sti i `openapi.yaml` peger på en faktisk `route.ts` (anti-hallucination)                                                                                     | Ja                       |
| `check:docs-symbols`           | Hver `/api/...`-reference i `docs/**/*.md` peger på en faktisk `route.ts` (anti-hallucination)                                                                    | Ja                       |
| `i18n translation drift`       | Uoversatte nøgler i i18n-locale-filer — kun advarsel                                                                                                              | **Vejledende**           |

De tolv README-SVG'er under `docs/diagrams/` genereres (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` regenererer dem alle). Hver har en unit-test, der sammenligner bytes
(`tests/unit/docs/readme-*-svg.test.ts`, jobbet `test-unit`), og som fejler, når den committede fil
er forældet, og `check:docs-counts` læser kanoniske tal fra deres `<text>`-noder — derfor sørger
omridsningstrinnet for, at alle omridsede strenge i filen bevares som usynlig `<text>`. SVG-tjekket
af kanoniske tal læser de filer, der er angivet i `SVG_DIAGRAM_FILES`
(`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg` samt `public/images/tier-flow-dark.svg` og `tier-flow-light.svg`;
påstandene om free-forever, katalogpost, tilbagevendende pulje og scoringsfaktorer læser også
`promise-pillars.svg`, `free-tier-budget.svg` og `strategies-grid.svg`. `free-tier-budget.svg`
henter sine tal fra den aktive katalogindlæser, så en ændring af `FREE_MODEL_BUDGETS` eller af
et provider-visningsnavn får CI til at fejle, indtil filen er blevet regenereret.

### Job: `i18n-ui-coverage`

| Script                            | Validerer                                                                                                                                                                                    | Blokerende     |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | Dækningen af UI-i18n-nøgler er ≥ 65 %                                                                                                                                                        | Ja             |
| `check-ui-value-drift` (inline)   | En omskrevet engelsk **værdi** efterlader ingen forældet oversættelse                                                                                                                        | Ja             |
| `check-new-key-coverage` (inline) | En **ny** engelsk nøgle er oversat i alle locales — en `__MISSING__:`-markør afvises                                                                                                         | Ja             |
| `check-translation-ratio`         | Forholdet af reelle oversættelser pr. locale (identisk med engelsk / placeholder / manglende uden for allowlisten) må ikke overstige `config/quality/i18n-translation-baseline.json` + slack | **Vejledende** |

Kræver `fetch-depth: 0` — værdiforskels-gaten sammenligner `en.json` med merge-basisen.

#### `check-ui-value-drift` — gate for forældede oversættelser

Fanger den ene i18n-regression, som de andre gates strukturelt ikke kan se: En engelsk værdi
skrives om, og oversættelserne, der blev afledt af den _tidligere_ engelske tekst, bliver stående, så
ikke-engelsksprogede brugere fortsat læser en selvsikkert formuleret, men nu forkert tekst.

Dette blev faktisk sendt ud. `oauthModal.googleOAuthWarning` blev skrevet om, da Antigravity-
loginhjælpen blev tilføjet (#5203); **39 af 43 locales** beholdt tekst, der fortalte operatører at "kopiere
hele URL'en og indsætte den nedenfor" — et flow, der ikke kan gennemføres for den udbyder. Det
blev ikke opdaget før #8463, fordi:

- `sync-ui-keys` udfylder kun nøgler, der **mangler**, aldrig nøgler, der er **forældede**;
- `check-ui-keys-coverage` tæller, om nøglen _findes_, så en forældet oversættelse tæller som dækket;
- `check-translation-drift` sporer dokumentationsspejlene `docs/i18n/<locale>/**.md` —
  den læser aldrig `src/i18n/messages/*.json`. Blokerer i jobbet `docs-sync-strict` siden
  2026-09-resynkroniseringen: redigér et kernedokument → `npm run i18n:run -- --files=<doc>` (på sektionsniveau, billigt).

**Diff-bevidst, ikke baseline-baseret.** Den sammenligner `en.json` ved merge-basispunktet med
arbejdstræet; for hver nøgle, hvis engelske værdi er ændret, er en locale, der stadig har en
uberørt oversættelse, forældet. Dette **fastfryser bevidst eksisterende gæld** — en diff kan ikke
afsløre, hvilken gammel engelsk tekst en langvarig oversættelse stammer fra, så gaten vurderer
kun det, som den aktuelle ændring berører. Alternativet (en hash-baseline pr. nøgle) ville koste
en genereret fil på ~600 KB, 3× den største eksisterende baseline, som ville blive ændret ved hver i18n-PR.

To måder at opfylde kravet på:

1. opdatér de berørte oversættelser, eller
2. sæt dem til `__MISSING__:<new english>` — runtime-miljøet leverer derefter den korrigerede engelske tekst
   (`src/i18n/request.ts::deepMergeFallback`, #7258), og nøglen sættes i kø til oversættelse.

Hvis tekstens **betydning** er ændret, foretrækkes det at **omdøbe nøglen**: En ny nøgle kan ikke arve
en forældet oversættelse. Det var mønsteret, som #8463 brugte.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Afsluttes med 0 og `SKIP reason=base-unresolved`, når baseline-kataloget ikke kan læses (shallow
clone uden baseline-referencen), i overensstemmelse med `check-openapi-breaking`.

### Job: `i18n`

Fuld i18n-valideringsmatrix (ét job pr. locale). Hele jobbet er vejledende.

| Script                          | Validerer                              | Blokerende                                                |
| ------------------------------- | -------------------------------------- | --------------------------------------------------------- |
| `validate_translation.py quick` | Oversættelsesfuldstændighed pr. locale | **Vejledende** (`continue-on-error: true` på hele jobbet) |

### Job: `pr-test-policy`

Kører kun på pull requests.

| Script                 | Validerer                                                                                                                              | Blokerende |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PR'er, der ændrer produktionskode i `src/`, `open-sse/`, `electron/` eller `bin/`, skal inkludere eller opdatere tests (Hård regel #8) | Ja         |
| `check:test-masking`   | Ændrede testfiler reducerer ikke det samlede antal assertions eller tilføjer `assert.ok(true)`-tautologier                             | Ja         |
| `check:pr-evidence`    | PR-teksten angiver test-/VPS-evidens for ændringen (mekaniserer Hård regel #18 ved at søge i PR-teksten — skrøbelig, se Backlog)       | Ja         |

### Job: `test-vitest`

Kører efter `build`. Blokerer merge ved fejl.

| Suite            | Validerer                                                    | Blokerende                                                                                                       |
| ---------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-server (110 værktøjer), autoCombo, cache — vitest-runner | Ja                                                                                                               |
| `test:vitest:ui` | UI-komponenttests — vitest-runner                            | **Blokerende** — eksisterende fejl er eksplicit udelukket i `vitest.config.ts`; nye fejl får jobbet til at fejle |

### Nightly-workflows (planlagte, vejledende)

Disse køres efter en cron-plan (og `workflow_dispatch`), aldrig på PR'er. Alle er vejledende.

| Workflow               | Validerer                                                                                                                                                                       | Blokerende     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | fast-check-egenskabstests med et tilfældigt seed + højt antal kørsler                                                                                                           | **Rådgivende** |
| `nightly-resilience`   | heap-vækst-gate, kaos-fejlinjektion, k6-belastningstest/-test under belastning                                                                                                  | **Rådgivende** |
| `nightly-llm-security` | promptfoo-injektionsbeskyttelse (blokeringstilstand) + garak-prober (udelades uden en provider-hemmelighed)                                                                     | **Rådgivende** |
| `nightly-schemathesis` | OpenAPI-kontrakt-fuzzing (schemathesis) mod en aktiv OmniRoute ved hjælp af `docs/openapi.yaml` — afdækker overtrædelser af specifikationen / ubehandlede 500-fejl (Fase 8 B.4) | **Rådgivende** |
| `nightly-mutation`     | Stryker-mutationstestscore for det hurtige enhedstestspor — overlevende mutanter afdækker svage assertions                                                                      | **Rådgivende** |
| `nightly-compat`       | Node-motorens kompatibilitetsmatrix på tværs af de understøttede `engines.node`-intervaller                                                                                     | **Rådgivende** |

Ydelsesbaselines (heap, TTFB, byggetid) registreres, men bruges ikke som gate: se [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Hastighedsfase (2026-08-30 → v4.0 LTS): alle basislinjer lempet med 20 %

Ejerbeslutning (2026-08-30): Indtil modulariseringen i v4.0 betyder leveringshastigheden mere
end at holde den tekniske gæld i skak. Hver **numerisk** skralde-basislinje blev lempet med 20 % i én
reviderbar arbejdsgang, og fasen er angivet i `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Hvad blev ændret                                                                                                                                                                                                              | Hvor                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — antal, hvor lavere er bedre, ×1,2; procentdele, hvor højere er bedre, ÷1,2 (dækningsminimum på 60 bevaret, `eslintErrors` forbliver 0, `eslintWarnings` 0 → 20 % af det fastfrosne antal undertrykkelser) | `quality-baseline.json` (noten `_relax_velocity_2026_08_30` viser alle før → efter)                    |
| `count` ×1,2 / `percentage` ×1,2                                                                                                                                                                                              | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, hvert linjeloft i `frozen[*]` / `testFrozen[*]` ×1,2                                                                                                                                                        | `file-size-baseline.json`                                                                              |
| antal pr. fil / pr. TS-kode ×1,2                                                                                                                                                                                              | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                           | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` bliver vejledende, mens `_policy.requireTighten === false`                                                                                                                                                | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| den natlige `bank-ratchet-shrinks` sættes på pause (den ville registrere den målte reduktion og fjerne råderummet)                                                                                                            | `.github/workflows/nightly-release-green.yml`                                                          |

Tilladelseslister (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) er **ikke** budgetter og blev ikke ændret. Bestået/ikke bestået-politikkontroller (hemmeligheder, SQL-regler,
docs/env-kontrakt, i18n-paritet, enhedstests) er uændrede — en rød test er stadig en rød test.

**Værktøjer**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — den
  engangsbaserede lempelse (`scripts/quality/relax-baselines.mjs`); nægter at køre to gange med den
  samme note.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  måler hver numerisk kontrol på samme måde som CI og viser det resterende råderum pr. kontrol
  (`scripts/quality/baseline-headroom.mjs`). Det natlige `baseline-headroom`-job offentliggør
  tabellen i arbejdsgangskørslens oversigt og uploader dens JSON-/Markdown-rapport som
  `baseline-headroom-<run_id>`, der opbevares i 90 dage. Advarsels- og kritiske rækker identificerer kontroller,
  der er inden for 10 % af deres loft eller allerede har overskredet det. Gennemgå disse rapporter som en tidlig advarsel om,
  at budgetterne bliver opbrugt; undersøg noterne `_rebaseline_*` for den berørte kontrol. Jobbet
  opretter eller opdaterer ikke længere et permanent issue; #12149 bevarer den tidligere rapporthistorik.

**Tilstand for ny kode (Clean-as-You-Code) — siden 2026-08-30, kun hurtig PR-sti**

Ved `pull_request`-hændelser videregiver `quality.yml` `--base-ref <PR base SHA>` til `check:file-size`,
`check:complexity-ratchets` og `check:dead-code`. For `check:complexity-ratchets` og
`check:dead-code` sammenligner kontrollen HEAD med merge-basen **begrænset til de filer, som PR'en
berørte** (`scripts/check/newCodeMode.mjs`: merge-basen materialiseres i et midlertidigt
`git worktree`, ESLint/knip køres dér og på HEAD, og antallene pr. fil sammenlignes):

- **blokerende** — PR'en tilføjede cyklomatiske/kognitive overtrædelser eller døde eksporter i filer, den ændrede
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` i loggen);
- **vejledende** — den globale total sammenlignet med den fastfrosne basislinje. Nedarvet afvigelse gør aldrig en
  uskyldig PR rød; afvigelsen fastfryses igen ved release-afstemning og overvåges af råderumsjobbet.

`check:file-size` bruger basisreferencen på sine egne vilkår (`scripts/check/check-file-size.mjs`, #8522):
Den kontrollerer hver kilde- og testfil i træet, læser hver fils linjeantal ved PR-basen
med `git show` og markerer kun en fil som ikke bestået, når den vokser ud over det største af dens basislinjeloft
(`frozen` / `testFrozen` eller `cap` / `testCap` for en fil uden for basislinjen) og dens basisstørrelse.
En fil, der allerede havde en afvigelse på basisreferencen, gør derfor aldrig en uskyldig PR rød.

`check:boundary:ratchet` anvender den samme regel på sit enkelte tal
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): Ved PR-hændelser sender både
`quality.yml`-hurtigkontrollerne og lint-jobbet i `ci.yml` PR'ens base-SHA med, base-committet
måles fra en `git archive`-eksport, og PR'en fejler kun, når dens antal `open-sse → src`-kanter
overstiger den største værdi af `metrics.boundaryOpenSseToSrc` og antallet i basen. Base-drift
over loftet rapporteres (`base drift herdado`), men får aldrig en uskyldig PR til at fejle; push → main
beholder det absolutte loft, og en base-SHA, der ikke kan slås op, falder tilbage til dette med en advarsel.

`workflow_dispatch`-kørsler, den release-grønne gennemgang og det natlige headroom-job har ingen PR-base
og beholder den absolutte (globale) sammenligning. Dækning, duplikering og typedækning forbliver globale
indtil videre (deres værktøjer kan ikke billigt generere en diff pr. fil) — kandidater til samme behandling.

**Afslutning af fasen ved v4.0 (LTS = strammere end før, ikke "tilbage til normalen")**

1. På det rene `release/v4.0.0`-tip: `npm run quality:headroom --json` til dokumentation, derefter
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, hver typecheck-gates
   `--update` — alle baselines sænkes til den målte værdi.
2. Slet `_policy` fra `quality-baseline.json` (genaktiverer `--require-tighten` og den natlige
   opsparing), gendan `THRESHOLD = 36` (eller højere) i `check-openapi-coverage.mjs`.
3. Stram mere end den målte værdi, hvor modulariseringen har båret frugt: file-size-`cap` tilbage til 1000
   (eller 800), dækningsgrænser +5, 0 døde eksporter for de modulariserede pakker.

## Ratchet-baseline (`quality-baseline.json`)

Ratchet-motoren (`scripts/quality/check-quality-ratchet.mjs`) læser `quality-baseline.json`
og sammenligner den med den nyligt indsamlede `quality-metrics.json`. Enhver metrik, der forværres
ud over dens epsilon, får buildet til at fejle.

Aktuelt sporede metrikker:

| Metrik                | Retning | Betydning                                  |
| --------------------- | ------- | ------------------------------------------ |
| `eslintWarnings`      | `down`  | Antallet af ESLint-advarsler må ikke stige |
| `coverage.statements` | `up`    | Statement-dækningen må ikke falde          |
| `coverage.lines`      | `up`    | Linjedækningen må ikke falde               |
| `coverage.functions`  | `up`    | Funktionsdækningen må ikke falde           |
| `coverage.branches`   | `up`    | Forgreningsdækningen må ikke falde         |

Sådan opdateres baselinen efter en reel forbedring:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Flaget `--update` skriver de aktuelt målte værdier til `quality-baseline.json`.
Commit denne fil sammen med den ændring, der forbedrede metrikken. En PR, der forbedrer en
metrik uden at opdatere baselinen, vil blive fanget af `--require-tighten` (fase 6A.5,
afventer implementering).

### CodeQL-ratchet: opdateringsfrekvens og manuel udløsning

`check:codeql-ratchet` læser **repositoryets tilstand, som opdateres efter en tidsplan — ikke for hver PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` rapporterer
`state: configured`, `schedule: weekly`: GitHubs scanning med standardopsætning, ikke en analyse
for hvert push. Konsekvens: Når en PR, der RETTER alarmer, er blevet merget, fortsætter ratcheten med at læse
det gamle, højere antal, indtil den næste planlagte scanning køres — derfor rapporterer den en regression
på hver åben PR, inklusive opfølgninger til den rettende PR, indtil scanningen er ajour.

**Manuel opdatering**: `gh workflow run codeql.yml --ref release/vX.Y.Z` kører
analysen igen og genudgiver alarmer inden for få minutter. Læs `.github/workflows/codeql.yml`
først — dens header forklarer, at den kun bruger `workflow_dispatch`, **fordi den er i konflikt med
GitHubs "default setup"** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Gendannelse af `push`/`pull_request`/
`schedule`-udløsere kræver først en **handling fra ejeren**: Settings → Code security →
CodeQL: Default → Advanced. Tilføj ikke en `schedule:`-udløser uden denne ændring — den
vil kun medføre fejlslagne kørsler.

**Stram baselinen, når antallet falder** — `node scripts/check/check-codeql-ratchet.mjs
--update` skriver det nye målte antal til `quality-baseline.json` →
`metrics.codeqlAlerts.value`, så ratcheten ikke stiltiende tillader en regression tilbage
til det gamle loft. Gennemarbejdet eksempel (2026-09-02/03): PR #12502 rettede 7 reelle alarmer
(13 → 6 målte åbne); PR #12530 strammede den fastlåste baseline fra 11 → 6, så den stemte overens; de
resterende 6 blev derefter afvist med en begrundelse for hver alarm, indtil der var 0 åbne.

**Afvisninger er operatørens beslutning (hård regel #14)** — afvis aldrig en CodeQL-alarm
uden at registrere den tekniske begrundelse i afvisningskommentaren: `won't fix` for
et krav fra en upstream-protokol, `used in tests` for en test-fixture, `false positive`
for en sanitizer, som CodeQL ikke kan se (præcedens: `docs/security/ERROR_SANITIZATION.md`).

---

## Politik for genkørsel af tests (WS5.4, v3.8.49)

Genkørsel konfigureres pr. runner, aldrig som en global standard — en generel genkørsel forvandler reelle regressioner
til usynlige sporadiske fejl:

| Runner           | Politik                                                                                                                          | Hvorfor                                                                                                                                      |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` kun i CI, med `trace: on-first-retry`                                                                               | Browser-/netværkstiming er reelt ikke-deterministisk; én genkørsel med en trace forvandler en sporadisk fejl til en diagnosticerbar artefakt |
| Vitest           | INGEN global genkørsel. En dokumenteret ustabil test får en eksplicit genkørsel pr. test (synlig i diffen og gennemgået i PR'en) | Holder karantænelisten i repoet, aldrig uigennemsigtig                                                                                       |
| node:test (unit) | INGEN genkørsel, nogensinde                                                                                                      | En ustabil enhedstest er en fejl i testen — ret den, kør den ikke bare igen                                                                  |

Målsatte SLO'er, når telemetri for sporadiske fejl er på plads (WS5.2/5.3): <1 % frekvens af sporadiske fejl pr. test
(tærskel for "ret nu"), ≥95 % beståelsesprocent pr. pipeline. Branchens referenceværdier —
genkalibrer ud fra vores egne målinger.

## Afvigelse i ratchet på release-niveau (WS5.5, v3.8.49)

Når en ratchet (filstørrelse, kompleksitet, eslint-advarsler) regresserer på det RENE release-
tip — dvs. at KOMBINATIONEN af merges forårsagede regressionen, og ingen enkelt PR kan reproducere
regressionen på sin egen branch — tilhører rettelsen **release-ansvarlige, én gang, på
release-branchen**: Foretræk udtrækning/refaktorering; nulstil kun baseline med den dokumenterede
begrundelse. Skub aldrig en kombinationsafvigelse over på en bidragyders PR, og nulstil aldrig
baseline pr. PR (det skjuler reelle regressioner). Skeln først: Reproducer den røde status
mod det rene tip i et probe-worktree, før du antager, at din PR forårsagede den.

## Lagring af ratchet-reduktioner — den nedadgående retning (#8584)

Ratchet-mekanismen er kun halvt automatisk, og det er den forkerte halvdel. At **hæve** en grænse er en
manuel JSON-redigering, der tager ti sekunder og er den hurtigste måde at frigøre en rød PR på.
At **sænke** en grænse kræver, at nogen kører `--update` og committer resultatet — og indtil
jobbet `bank-ratchet-shrinks` blev tilføjet, var der intet workflow, der gjorde det. Den målte konsekvens
(2026-07-25): 18 fastlåste filer var allerede på eller under grænsen på 800 linjer for nye filer, den værste
på 132× (`src/shared/validation/schemas.ts`, 19 linjer med en grænse på 2.523); kompleksitetsloftet steg
`1794 → 2169` på tværs af ~37 noter om nulstilling af baseline med præcis én
reduktion (−1); og "stram via `--update` i næste cyklus" blev skrevet 31 gange og efterlevet
én gang. En grænse, der overlever den kode, som gav anledning til den, forvandler lydløst enhver fuldført
opdeling til en vækstmargen for den næste, der redigerer filen.

`nightly-release-green.yml` → jobbet **`bank-ratchet-shrinks`** lukker den løkke:

|             |                                                                                                                  |
| ----------- | ---------------------------------------------------------------------------------------------------------------- |
| Kører ved   | `schedule` (3×/dag) + `workflow_dispatch` — bevidst **ikke** `push`                                              |
| Måler       | den højeste `release/vX.Y.Z`, samme opløsning + injektionsværn som `release-green`                               |
| Skriver     | `check:file-size --update` og `check:complexity-ratchets --update` (begge kan konstruktionsmæssigt kun reducere) |
| Verificerer | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                         |
| Leverer     | én altid opdateret PR mod release-branchen — tvangsopdateret, aldrig spammet                                     |

Lagringen foretages i batches frem for ved hvert push, fordi den ikke har noget krav til latenstid (en reduktion,
der lagres inden for 8 timer, er fint), mens en kørsel pr. merge gentagne gange ville genopbygge PR-branchen
under merge-kampagner og betale prisen for en fuld ESLint-gennemgang hver gang. Registrering sker fortsat ved
push (`release-green`); kun lagringen udføres i batches.

### Sikkerhedsverifikatoren

Jobbet skriver til baselines uden opsyn, så `verify-ratchet-bank.mjs` er det, der gør
det acceptabelt. Det sammenligner træet efter `--update` med `HEAD` og **afbryder jobbet,
før der findes et commit** — uden at åbne en PR — medmindre hver ændring er én af følgende:

- en numerisk `frozen`- / `testFrozen`-post, der er **sænket** eller **fjernet**
- `complexity-baseline.json` → `count` **sænket**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **sænket**

Alt andet fejler: at hæve et tal, tilføje en post, ændre `cap`/`testCap` eller
slette/omskrive en `_rebaseline_*`-note (disse noter udgør revisionssporet for, hvorfor hvert
loft findes, og gemmes i det samme `frozen`-objekt som filposterne).
En bot, der kunne hæve en grænse, ville være markant værre end status quo. Værn mod regression:
`tests/unit/verify-ratchet-bank.test.ts`.

Jobbet pusher aldrig til `release/*` — et menneske merger PR'en, så en forkert måling
ikke kan lande uden gennemgang.

## Politik for tilladelseslister

Hver gate, der ikke kan fejle på allerede eksisterende overtrædelser, bruger en fastfrosset tilladelsesliste
(f.eks. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Politikken er:

**Ret den grundlæggende årsag; brug kun tilladelseslisten, når overtrædelsen allerede eksisterer og
ikke kan rettes i samme PR.**

Når du føjer en post til en tilladelsesliste:

1. Medtag en kommentar med begrundelsen.
2. Henvis til den issue, der bruges til sporing (f.eks. `// #3498 — Fase 2-funktion, endnu ikke implementeret`).
3. Fjern posten i den samme PR, der retter overtrædelsen — en forældet post, som ikke længere
   undertrykker en aktiv overtrædelse, er i sig selv en fejl (6A.3-kontrollen for forældet håndhævelse vil,
   når den er implementeret, få gaten til at fejle på en forældreløs post i tilladelseslisten).

Tilføj **ikke** poster på tilladelseslisten for at få tests til at bestå hurtigere. En grøn gate med en voksende
tilladelsesliste giver en falsk følelse af kvalitet.

### Når en gate fejler på din PR

1. **Læs outputtet fra gaten omhyggeligt** — det fortæller dig præcis, hvilken fil eller hvilket symbol der overtrådte
   reglen.
2. **Ret overtrædelsen** — de fleste gates er deterministiske filsystemkontroller, der består, så snart
   koden er korrekt.
3. **Hvis overtrædelsen allerede eksisterer** (dvs. du introducerede den ikke, men gaten
   dækker den nu): Tilføj en post på tilladelseslisten med en begrundende kommentar og en issue til sporing.
4. **Hvis gaten er en skraldemekanisme** (dækning, ESLint-advarsler, duplikering, kompleksitet):
   Din ændring har forværret målingen. Ret det underliggende problem, eller kør (i sjældne tilfælde)
   `npm run quality:ratchet -- --update`, hvis ændringen er tilsigtet, og forringelsen af målingen
   er acceptabel — men dokumentér hvorfor i PR-beskrivelsen.
5. **Rådgivende gates** (`continue-on-error: true`) er informative — de blokerer ikke
   sammenfletning, men vises i CI-oversigten. Ret dem alligevel.

---

## Tilføjelse af en ny gate

1. Opret `scripts/check/check-<name>.mjs` (eller `.ts`). Politik-gates afsluttes med 0/1.
   Gates af skraldemekanismetypen skriver en måling til `quality-metrics.json` via `collect-metrics.mjs`.
2. Føj `"check:<name>": "node scripts/check/check-<name>.mjs"` til `package.json`.
3. Integrér den i `.github/workflows/ci.yml` under det relevante job
   (politik → `lint` eller `docs-sync-strict`; skraldemekanisme → `quality-gate`).
4. Hvis den har en tilladelsesliste, skal du anvende `reportStaleEntries()` fra
   `scripts/check/lib/allowlist.mjs`, så forældede poster registreres automatisk.
5. Skriv en test i `tests/unit/build/`, der dækker gatens detektionslogik.
6. Opdater dette dokument (tilføj en række i den relevante jobtabel).

---

## Agentværktøjer: LSP-in-the-loop (tilvalg)

Ud over CI-gatene leveres OmniRoute med et **valgfrit** `agent-lsp`-grundskelet
(en `.mcp.json` på projektniveau, Fase 7 Opgave 15). Opret `.mcp.json`
for at gøre en TypeScript-sprogserver tilgængelig for kodeagenter, så de kan finde symboler /
diagnostik **før** de skriver kode — et kompilér-før-påstand-supplement til
`typecheck:core`, der stopper fejl med "opfundne symboler" ved kilden. Det indlæses med vilje
ikke automatisk (du vælger og verificerer MCP↔LSP-broen); en defekt post logger kun en
forbindelsesfejl og afbryder aldrig sessioner.

---

## Rationaliserings-backlog (ROI-gennemgang — Fase 9 Onda 3)

Denne oversigt blev afstemt mod `ci.yml` den 2026-06-17 (den tidligere version udelod
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). En ROI-gennemgang af det afstemte sæt
identificerede følgende rationaliseringskandidater. **Sammenlægningerne er mekaniske
CI-ændringer; ændringerne/fjernelserne er politikbeslutninger, der er forbeholdt operatøren.** Intet nedenfor
er anvendt endnu.

**Også udokumenteret ovenfor** (vejledende, lavt signalniveau): jobbet `docs-lint`
(markdownlint + Vale, hele jobbet har `continue-on-error`) og de selvstændige scanner-workflows
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` findes i
`quality-baseline.json`, men er ikke koblet til en blokerende ratchet i `ci.yml` — metrikken er
i øjeblikket forældreløs.

### Sammenlægning / deduplikering (mekanisk, lavere risiko)

Hver kandidat blev valideret mod den aktive gate-tilstand den 2026-06-17 (hav tillid, men verificér);
flere "indlysende" sammenlægninger viste sig at skjule gæld og er **ikke** direkte anvendelige erstatninger.

- **`check:docs-sync` kører to gange** — selvstændigt i jobbet `lint` og igen inde i `check:docs-all` (`docs-sync-strict`) samt i husky pre-commit-hooket. ✅ **FÆRDIG** — den selvstændige `lint`-kørsel er fjernet.
- **CVE-scanning** — ❌ **IKKE en problemfri sammenlægning.** `audit:deps` fejler hårdt ved enhver CVE med høj/kritisk alvorlighed; `check:vuln-ratchet` (osv) fejler kun ved en _forværring_ i forhold til baseline (aktuelt 1 MODERATE). Forskellig semantik — fjernelse af `audit:deps` ville fjerne den absolutte gate for høj/kritisk alvorlighed. Behold begge.
- **Cyklusdetektering** — ✅ **FÆRDIG** (#15159 G-01/G-02). Den gamle tekst her kaldte `check:cycles` for "den grønne, kuraterede" gate og begrundede, at den fortsat skulle være blokerende, fordi `check:circular-deps` (dpdm) rapporterede 91 cyklusser. Det grønne resultat var **falsk grønt**: `check:cycles` scannede 5 undermapper (450 filer), matchede kun statiske `import|export … from` og ignorerede alle `@/`- og `@omniroute/open-sse/`-specifikatorer, så den kunne ikke se de cyklusser med dynamiske imports og aliaser, der dominerede repoet. Rettet: gaten gennemgår nu `src` + `open-sse` (5023 filer), indsamler specifikatorer fra TypeScript-AST'en (så `import("…")` tæller, mens `typeof import("…")` i typeposition ikke gør) og opløser tsconfig-`paths`. Den finder **14** cyklusser, ikke 0. Da 14 allerede eksisterende cyklusser ikke kan rettes i en gate-PR, er `check:cycles` nu en **ratchet** (`--ratchet`, loft `metrics.cycles.value = 14` i `quality-baseline.json`, `direction: down`) — den blokerer enhver _forværring_, og antallet kan kun falde. CI kører `npm run check:cycles:ratchet`. Nedbringelsen følger med **A-01**. `check:circular-deps` (dpdm) forbliver vejledende som den bredere sekundære vurdering.
- **Kompleksitet** — ✅ **FÆRDIG** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): én ESLint-gennemgang, optælling efter ruleId, så cyclomatic+max-lines- og cognitive-baselines forbliver uafhængige; de individuelle `check:complexity` / `check:cognitive-complexity` bibeholdes til lokal `--update`.
- **`/api`-antihallucination** — ✅ **FÆRDIG** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): én FS-oversigt over `src/app/api`; openapi-routes + docs-symbols rapporterer stadig uafhængigt; de individuelle kontroller bibeholdes til lokale kørsler.
- **`check:node-runtime` kører i 11 jobs** — ⚠️ **lav ROI.** Hvert job bruger en separat runner, og kontrollen tager <1s; samlet besparelse ~10s mod at miste en billig sikkerhedskontrol pr. job. Ikke besværet værd.
- **`typecheck:noimplicit:core` i CI-lint** — ✅ **fjernet fra lint-jobbet** (var vejledende med `continue-on-error`); den blokerende typeoverflade er `typecheck:core` + `check:type-coverage`. Det lokale script er bibeholdt.

### Ændr / beslut (operatørpolitik)

- `check:openapi-security-tiers` (vejledende) — ❌ **KAN IKKE problemfrit gøres blokerende.** Den afslutter med 0, men advarer om, at flere `traffic-inspector`-ruter under `LOCAL_ONLY_API_PREFIXES` mangler annoteringen `x-loopback-only: true`. Håndhævelse kræver, at disse annoteringer først føjes til `openapi.yaml`.
- `typecheck:noimplicit:core` (vejledende) — er i vid udstrækning dækket af den blokerende `check:type-coverage`-ratchet. Gør den til en ratchet, eller fjern den redundante anden `tsc`-kørsel.
- `test:vitest:ui` (nu **blokerende**) — allerede eksisterende fejl er eksplicit ekskluderet i `vitest.config.ts` med `// #8618`-sporingskommentarer; nye fejl får jobbet til at fejle.
- `check:secrets` (gitleaks, blokerende ratchet fastlåst ved 3 dokumenterede falske positiver) — tilføj de 3 til allowlisten for at nå 0, eller nedgradér til vejledende. Overlapper GitHubs indbyggede secret-scanning + `check:public-creds`.
- `check:pr-evidence` (blokerende, søger med grep i PR-brødteksten) — høj risiko for falske positiver; fjernelse svækker håndhævelsen af Hard Rule #18, så dette er en reel politikbeslutning.
- `semgrep` (selvstændig og vejledende) — overlapper CodeQL for OWASP-familierne; forbind dens baseline med en ratchet, eller fjern den.

---

## Relateret dokumentation

- Forsyningskæde (proveniens, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — kontrol af nøglesætparitet

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, job `i18n-ui-coverage`).
Sammenligner sættet af bladnøgler i hver `src/i18n/messages/<locale>.json` med `en.json` og fejler
ved enhver manglende eller ekstra bladnøgle, uanset hvornår nøglen blev tilføjet. `__MISSING__:`
-pladsholdere tæller som tilstedeværende (deres indhold håndteres af forholdstalskontrollen). Den er
det absolutte supplement til de to diff-baserede/procentbaserede kontroller: `check-ui-keys-coverage`
håndhæver en minimumsgrænse på 80 % pr. landestandard (43 manglende nøgler ud af ~13.000 vises stadig
som 99,7 %), og `check-new-key-coverage` vurderer kun de nøgler, som en PR føjer til `en.json`. Et
sprogparti genereres ud fra den `en.json`, der findes den dag, hvor dets gren oprettes, og oversættes
over flere dage, mens basisgrenen fortsat får tilføjet nøgler; parti-PR'en tilføjer ikke selv nogen
nøgler, så begge søsterkontroller forblev tavse, da parti 1 (#13044) blev flettet med 43 manglende
nøgler i ni landestandarder og parti 2 (#13660) med 10 manglende nøgler i otte (2026-09-15). Ret en
fejl med `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; en `extra`
-bladnøgle betyder, at kilden har fjernet den — slet den fra landestandarden. `--warn` rapporterer
uden at fejle. `--catalog=cli` kører den samme sammenligning over `bin/cli/locales`
(`npm run i18n:check-keys:cli`); begge trin findes i jobbet `i18n-ui-coverage`.

#### `check-new-key-coverage` — i18n-kontrol for nye nøgler

Søsterkontrol til `check-ui-value-drift`. Sidstnævnte opdager en engelsk værdi, der er blevet
**omskrevet**, mens dens oversættelser ikke er blevet opdateret; denne opdager en engelsk nøgle,
der er blevet **tilføjet**, uden at nogle landestandarder har modtaget den.

`check-ui-keys-coverage` kan ikke opdage denne klasse: den håndhæver en procentvis minimumsgrænse
pr. landestandard, og elleve manglende nøgler ud af ~13.000 giver stadig en dækning på 99,9 %. En
procentdel pr. sprog kan ikke udtrykke "denne funktion blev udgivet uoversat" — en hel funktion kan
blive tilføjet i en ny landestandard uden nogen tekst og uden nogensinde at ændre tallet.

Hændelsen, den repræsenterer: Fase 3 af Orchestration Canvas fik sine elleve nøgler oversat på tværs
af de 42 landestandarder, der fandtes på det tidspunkt. Få timer senere øgede EU-sprogpartiet
(#13044) antallet af landestandarder i repositoriet til 51, og de ni nytilkomne (`el`, `et`, `ga`,
`hr`, `lt`, `lv`, `mt`, `sl`, `sr`) modtog dem aldrig. `deepMergeFallback` erstatter en manglende
nøgle med engelsk, så fejltilstanden var en uoversat brugergrænseflade frem for en tom
brugergrænseflade — reel og pr. konstruktion tavs.

Ligesom sin søsterkontrol er den **diff-bevidst** og sammenligner engelsk ved flettebasen med
arbejdstræet, så allerede eksisterende mangler forbliver fastlåste, og kontrollen krævede ingen
migrering for at blive aktiveret.

**En `__MISSING__:<english>`-markør opfylder ikke kontrollen (siden 2026-09-17).** Den plejede at
være den dokumenterede udsættelse — ved kørsel faldes der tilbage til korrekt engelsk — indtil otte
funktions-PR'er den 2026-09-16 tilføjede 61 nøgler og indsatte markøren i alle 65 landestandarder i
stedet for at oversætte: Denne kontrol accepterede dem alle, intet blokerede PR'erne, og den
blokerende kontrol af forholdet mellem reelle oversættelser fejlede derefter på release-spidsen for
alle (pt-BR 3,2 % > 2,5 % + 0,5). En markør vurderes nu som en manglende oversættelse. Ret en fejl
med `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`,
eller alle landestandarder parallelt med `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, sikker ved frakobling, nægter at starte uden
`OMNIROUTE_TRANSLATION_*`-miljøvariablerne). En nøgle, der skal forblive på engelsk (et fastlåst
produkt-/motor-/flag-navn), hører hjemme i `scripts/i18n/untranslatable-keys.json`, aldrig bag en
markør. `vi` forbyder markører fuldstændigt (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — kontrol af parkerede tests

En fil på `exclude`-listen i `vitest.config.ts` er en test, der ikke køres, og den ligner dækning
for enhver, der læser træet. Toogtres filer hobede sig op bag kommentaren
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Sag #8618 blev lukket den
2026-08-11, mens listen, som den fulgte, voksede fra 45 poster til 62, og hver ny post arvede en
kommentar, der pegede på en lukket sag. Da listen endelig blev målt fil for fil (#13204),
**bestod 51 af de 62 mod det aktuelle træ uden nogen kildekodeændring**.

Kontrollen kræver, at hver ekskludering, der svarer til en virkelig fil, (a) angiver en
sporingssag og (b) findes i `config/quality/vitest-exclusions.json` med sin målte status, så
tilføjelsen af en ekskludering bliver en diff, der kan gennemgås i en dedikeret fil, frem for
endnu en linje i et array med 60 poster. Den genkører bevidst ikke de ekskluderede tests — det
tager ~10 minutter og hører hjemme i et periodisk job; fortegnelsen registrerer, hvornår hver
enkelt senest blev målt.
