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

## Gateoversigt og eksekveringsprofiler

### Kandidatoptagelse

CI og Quality Gates-arbejdsgangene udsender hver især en stabil dom: `Gate / CI` og `Gate / Quality`. Deres versionerede optagelsespolitik opregner hvert opstrømsjob efter behov eller rådgivende. Et relevant påkrævet job skal lykkes: manglende, annulleret, sprunget over, afventende og ukendte resultater kan ikke etablere PASS. En gyldig docs-only eller catalog-only klassifikation kan gøre en kodebane uanvendelig; et almindeligt udkast til PR er ikke en optaget kandidat. Et `hotfix` mærke giver ikke afkald på beviser.

Begge arbejdsgange dækker PRs til main/release grene, push til `main`, manuel afsendelse og merge-group begivenheder. Push, afsend og flet-gruppe køre hele udvalget. Et betroet Mergify-køudkast kører også relevante `full-code`/`full-code-e2e` -job; almindelige PRs springe dem over. Før en manuel sammenfletning skal du køre en fuld forsendelse på den nøjagtige kandidat. Skub til `release/**` starter ikke disse arbejdsgange; Release-Green observerer den fusionerede base separat (`docs/ops/RUNNER_BOX.md` → Hosted bane). Forks og fusionsgrupper bruger hostede løbere til job, der ellers vælger selvhostede løbere; tilstrækkelig hostet kapacitet skal verificeres før udrulning.

En almindelig PR kører det hurtige udvalg. `full-code` og `full-code-e2e` -banerne i adgangspolitikken (E2E, integration, pakkeartefakt, Electron smoke, Bun SQLite, økosystem- og protokolklienter) kører kun på et Mergify-køudkast eller på en fuld kørsel: `gh workflow run ci.yml --ref <branch>`.

Hver JSON -kvittering identificerer den udtjekkede SHA, arbejdsgang og forsøg. CLI afviser en checkout/event SHA -uoverensstemmelse. Workflow-tests binder politikmedlemskab til domsjobbets `needs` liste, så en ny eller fjernet bane ikke stille kan forsvinde. Kvitteringerne dækker deres egen arbejdsgang, ikke udgivelse, implementering eller det interne i en eksisterende rådgivende scanner. At foretage de relevante kontroller, der kræves i filialregler, er en separat administrativ ændring; at definere deres job beskytter ikke i sig selv en filial.

`API Route Typecheck` er et uafhængigt workflow-tjek uden for både samlede domme og den lokale fulde observatørs statiske profil. Undersøg resultatet separat for den nøjagtige kandidat. `.github/workflows/api-route-typecheck.yml` kører på PRs til `main` eller `release/**`, skubber til enten filialfamilie, manuel afsendelse og `merge_group` hændelser af typen `checks_requested`. Den har ikke noget stifilter. Flet grupper tjek `merge_group.head_sha`; andre begivenheder tjek `github.sha`. Alle hændelser bruger de samme API diagnostiske gate- og gateenhedstests. PR base retargets anmoder om en ny check; body/title redigeringer bruger kun observationsnavnet `Admission not requested / API Route Typecheck` og kan ikke erstatte adgangskontrollen.

### Bevaret dokumentation i acceptreduktionsfunktionen

`scripts/quality/validate-release-acceptance.mjs` reducerer en angivet plan og dens
manifester; den fastslår ikke, at planen dækker hele release-pipelinen.
Dens rapporter angiver eksplicit `releaseAcceptance: false`, selv når planen er
`VERIFIED`. Workflowet `release-acceptance.yml` bruger fortsat shadow-fixtures, ikke
reelle kvitteringer for build, pakning, opstart eller promovering.

CLI'en kræver `--evidence-root` for at verificere bevaret dokumentation. Filer slås op
som `<evidence-root>/<artifact_id>/<member>` og hashes med SHA-256. En PASS-post
uden dokumentation, en manglende eller ændret fil, en usikker sti eller et symbolsk link forhindrer
verificering. Manglende filer svarer ikke til tomme, vellykkede logfiler. Eksisterende
kontroller af SHA/kørsel/forsøg forbliver uafhængige: matchende bytes kan ikke redde en forældet
kvittering. Filintegritet er ikke bevis på autentisk eksekvering eller promovering af artefakter.

### DAST bruger det verificerede CI-build

Det obligatoriske CI-job `dast-smoke` kalder `.github/workflows/dast-smoke.yml` efter `build`. Det følger samme kode-/kladdeudvælgelse som buildet, herunder understøttede fork-PR'er, PR'er til releasegrene og mergegrupper. Et manglende, mislykket, annulleret eller uventet oversprunget DAST-job blokerer `Gate / CI`. Det genanvendelige workflow har ingen selvstændig PR-/dispatchudløser; manuel validering bruger CI's dispatch, så build og forbruger forbliver i samme kørsel.

`scripts/ci/next-build-provenance.mjs` forsegler hele Next-artefakten med tar-digest, repository/hændelse/kørsel, producentforsøg, head/base/checkout/tree, workflowidentiteter, låsefil, præcis Node-version/ABI, platform og bundler. DAST vælger det uforanderlige artefakt-ID fra `needs.build.outputs`, kræver verificering af download-digest og hasher selvstændigt ZIP mod producentens digest, før de to tilladte medlemmer udpakkes via `scripts/ci/unpack-ci-build.py`. Manifestet og tar-arkivet skal også matche uafhængige producentoutput, før Next-træet udpakkes. Der søges aldrig efter det seneste vellykkede grenbuild. En delvis genkørsel kan genbruge samme producentforsøg, når dets ID og alle input stadig matcher; kvitteringen registrerer begge forsøg.

Forbrugeren forbliver på en hostet Linux-runner med læseadgang til repositoryet og uden repositoryhemmeligheder. Den installerer producentens præcise Node-version og samler derefter CLI'en med `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` afviser en manglende standalone-server før ethvert fallback-build; normale lokale CLI-builds beholder deres eksisterende fallback. Serverparathed, Schemathesis og promptfoo skal alle lykkes inden for jobbets uændrede grænse på 25 minutter. En provenienskvittering beviser inputidentitet og bytes, ikke en vellykket DAST-scanning. En udløbet artefakt, afbrudt runner eller fejlet scanner er fortsat ufuldstændig eller fejlet evidens; den kan ikke blive PASS via en rådgivende wrapper.

### UI-eksekveringskapacitet

CI kører hele UI-oversigten som fire `test-vitest`-matrixshards, hver med højst
to workers pr. shard og den eksisterende jobfrist på 15 minutter. Den første shard kører også
MCP/autoCombo-Vitest-suiten. Det påkrævede jobresultat dækker hvert matrixben; fejl
eller annullering af én shard kan ikke fastslå godkendelse af kandidaten.

Den natlige observer bevarer en separat kvittering for den nøjagtige kandidat for hver UI-shard,
inklusive MCP-eksekveringen i den første kvittering. Alle fire kvitteringer, logfiler og matchende
eksekveringsidentiteter er påkrævede. Lokal kørsel af `npm run test:vitest:ui` vælger fortsat
hele suiten; én `--shard`-kørsel er kun delvis dokumentation.

### Indsamling af unit-testdækning

De tolv unit-shards indsamler V8-dækning under deres eksisterende testeksekvering. En vellykket
shard kører `scripts/ci/compact-v8-coverage.mjs` for at komprimere de oprindelige filer uden at generere
en mellemliggende Istanbul-rapport. Det afsluttende Coverage-job verificerer alle tolv manifester mod
kandidatens SHA, runtime, kildekoderod og datahashes og kører derefter c8's rapportgeneratorer og eksisterende
dækningstærskler. Input bevarer c8's globale filnavnerækkefølge; forudgående sammenfletning pr. shard er usikker
ved blandet funktions-/blokdækning. Manglende, fejlformaterede eller inkompatible shards medfører afvist godkendelse.
Fejlede testshards bevarer separat rå diagnostisk dækning; den kan ikke indgå i den endelige sammenfletning.

### Statuskvitteringer for kørsel af enhedstest

Den fælles kommando `test:unit:ci:shard` registrerer faserne `primary`, `dashboard` og `serial`
via `scripts/ci/unit-progress-reporter.mjs`. Den normale testrapport er fortsat
tilgængelig. En separat kvittering, der kun indeholder metadata, registrerer starten og afslutningen
for hver fil, og et heartbeat hvert 30. sekund viser de filer, der stadig er aktive, samt deres forløbne tid. Den registrerer
kun godkendte eksekveringsmetadata; testbeskrivelser, output, fejlindhold og det komplette
miljø serialiseres ikke.

CI gemmer JSONL-filerne som `unit-progress-ci-<run>-<attempt>-<shard>`. En timeout for et job kan forhindre den efterfølgende upload;
allerede udsendte heartbeats forbliver diagnostisk dokumentation. Manglende heartbeats kan også skyldes
en blokeret eller afsluttet runner-proces. Disse kvitteringer bevarer den eksisterende testudvælgelse,
samtidighed, tidsfrister og afslutningsstatus; de er ikke afgørelser om godkendelse af kandidater.

### Flettekø

Etiketten `queue` sender en PR til Mergify-køen (`.mergify.yml`). Mergify åbner en PR-kladde på
en `mergify/merge-queue/`-gren, CI kører den fulde udvælgelse dér, og den oprindelige PR flettes,
når `Gate / CI`, `Gate / Quality` og `Merge integrity (changelog + generated skills)` er bestået.

Mergify skriver sin køoversigt i kladdens beskrivelse, og andre apps kan også redigere den.
En `pull_request`-hændelse af typen `edited` på en sådan kladde får sin egen samtidighedsgruppe
(`-queue-edit-<run_id>`), så den ikke kan annullere kladdens egentlige kørsel, og den springer gaten og
matricen over. Kun `Merge integrity` kører stadig. Det oversprungne gatejob har et andet kontrolnavn,
fordi Mergify fortolker et oversprunget `Gate / CI` som en mislykket kontrol og fjerner PR'en fra køen.

Efter fjernelse fra køen sætter et push ikke altid PR'en i kø igen. Skriv kommentaren `@mergifyio queue` på den.

### Oversigt over statiske scanninger

Den versionerede oversigt over npm-aliaser og medlemskab af statiske scanninger findes i
`config/quality/gate-manifest.json`. Kør `npm run check:gate-manifest` for at validere
scriptnavne og nøjagtige kommandoer mod `package.json`; tilføjelser, fjernelser og
kommandoafvigelser får både den lokale hook og ændringsklassifikationsjobbene i CI til at fejle.
Et alias er ikke et workflowjob, en matrixinstans eller en testcase: disse antal må
ikke fremstilles som indbyrdes udskiftelige.

Brug `npm run quality:scan -- --list` eller `npm run quality:scan:fast -- --list`
til at inspicere de valgte aliaser uden at eksekvere dem. Runneren kalder
npm-entrypointet, så dets runtime (inklusive Bun, hvor det er konfigureret) bevares.
Manifestet registrerer aliaser uden for disse profiler som kaldt separat, og
vedligeholdelseskommandoer er forbudt i skrivebeskyttede scanningsprofiler.

Disse profiler dækker kun den statiske scanning. De certificerer ikke produkttests,
dækning, pakning, eksterne kontroller eller en kandidats fulde releasegodkendelse.
Workflowgodkendelse bruger den tilknyttede `config/quality/admission-policy.json` og
`scripts/quality/admission-verdict.mjs`. Release-observer-profiler forbliver separate;
inspicér deres relevante kontroller og kvitteringer uafhængigt. Den fulde observers statiske
kommandoer er deklareret i `config/quality/release-green-static-profile.json`, inklusive
`audit:deps`, valg af mutationstests og oversættelseskontroller. Loaderen validerer npm-
kommandoer mod package.json og modellerede CI-/Quality-deklarationer; den afviser afvigelser
i stedet for at eksekvere shell-tokens som argumenter. Påkrævet SKIP/INCOMPLETE-output fra scanneren
kan ikke fastslå PASS. Profilen registrerer sine eksterne undtagelser og erstatter ikke
hostet dækning, testmatricer, pakke- eller udrulningsdokumentation. Prosaoversigten nedenfor
er en reference, ikke bevis på, at en gate faktisk blev kørt.

Scripts findes under `scripts/check/` (politik-gates) og `scripts/quality/` (ratchet-motor).
CI-kilden til sandhed er `.github/workflows/ci.yml`.

### Sundhed for publiceret basisdokumentation

`.github/workflows/i18n-base-health.yml` overvåger dokumentationens sundhed efter udvalgte
pushes til `main` og `release/v*` samt ved manuel start. Dens filtre omfatter dokumentation,
Markdown-filer i roden, `llm.txt`, oversættelsestilstand/-konfiguration og de relevante i18n-værktøjer.
Det enkelte job `Published base documentation health` bruger en hostet Ubuntu-runner og en
tidsgrænse på fem minutter. Det udfører skrivebeskyttet validering og opretter en diagnostisk
kvittering uden installation af afhængigheder, oversættelse eller overtagelse af tilstand.

`scripts/i18n/check-base-health.mjs` kræver nul uoverensstemmelser vedrørende kildehash,
manglende mål, målhash, forældede oversættelser og sektionscache. Det validerer også det
aktuelle omfang af kernedokumenter og landestandarder samt den registrerede proveniens.
Ugyldig kontekst, ufuldstændig dækning eller en afbrudt kontrol resulterer i `INCOMPLETE`;
bekræftet afvigelse resulterer i `FAIL`. Begge returnerer en fejlkode. Kvitteringen er bundet
til checkout-SHA, workflow, kørsel og forsøg og gemmes som
`i18n-base-health-<sha>-<run>-<attempt>`.

Dette er en uafhængig observation af den publicerede basis. Den tilføjer ikke en PR- eller
merge-group-hændelse, et obligatorisk PR-tjek, et npm-alias eller et medlem af en profil
til statisk scanning. Den eksisterende differentielle PR-politik og den underliggende
kontrols vejledende klassifikationer forbliver separate. En vellykket upload kan ikke ændre
et mislykket sundhedsresultat til PASS.

### Slip PR fast-path (`quality.yml`)

`.github/workflows/quality.yml` supplerer CI på main/release PRs, skubber til `main`, sender og fusionerer grupper. PRs bruger stifiltrerede hurtige kontroller. Den permanent deaktiverede dubletversion blev fjernet; de rigtige build/package/boot -checks forbliver i CI. Enhedspakken og vitesten kører kun i CI (`Unit Tests (N/8)` og `Vitest`).

| Job                                              | Omfang                                                                                                                                                                                                     | Blokering            |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs og docs-all                                                                                                                                                                   | Ja                   |
| `Fast Quality Gates`                             | Kode PRs; statiske tjek, typecheck, dashboard typecheck, påvirkede enhedstests                                                                                                                             | Ja                   |
| `Forgotten sibling tests`                        | Kode PRs; ændrede moduler sporet til statiske forbrugere og kandidatsøskendetests; tønde- og dynamisk-import-stier rapporteres som rådgivende diagnostik med henvisninger til tilladelsesliste-undtagelser | **Rådgivende**       |
| `No new ESLint warnings`                         | Kode PRs; dæmpningsbevidst fnugbeskytter                                                                                                                                                                   | Ja, inklusive gafler |
| `Merge integrity (changelog + generated skills)` | Ikke-udkast PRs; changelog og genereret færdighedssynkronisering                                                                                                                                           | Ja, inklusive gafler |

#### Glemt søskendetests rapport

`npm run check:forgotten-sibling-tests` kører som et rådgivende trin for `Fast Quality Gates` og genbruger importresolveren bag test-impact map. For hvert ændret produktionsmodul rapporterer det deterministiske `changed module/symbol -> static consumer -> candidate sibling test` kæder, når kandidattesten er fraværende i pull-request diff. Markdown-resuméet og JSON resultatet bevares som `forgotten-sibling-tests` -workflow-artefakten til kalibrering før enhver blokerende udrulning.

Tønde-reeksport og dynamisk import er kun opløsningsdiagnostik; de skaber aldrig et blokerende fund. Anmeldte undtagelser lever i `config/quality/forgotten-sibling-allowlist.json`. Hver post skal navngive forbruger- og kandidattesten, give en specifik begrundelse og linke et GitHub problem eller pull-anmodning. Forkert indgange mislykkedes lukket. Undtagelser kan ikke undertrykke en slettet kandidattest eller en diff, der tilføjer `.skip`/`.todo`; påstandssvækkelse og anden maskering forbliver ejet af den uafhængigt blokerende `check:test-masking` port.

### Job: `lint`

Kører ved hver PR til `main`. Blokerer sammenfletning ved fejl.

| Script (`npm run ...`)            | Validerer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Blokerende                                 |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Node.js-versionen ligger inden for det understøttede interval                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                         |
| `check:cycles`                    | Cirkulære importer på tværs af hele `src/` + `open-sse/` (AST-baseret, tsconfig-`paths` opløst). Den rene kommando afslutter med kode 1, når der findes en cyklus (fail-closed siden #15281), og viser SCC'erne. `check:cycles:ratchet` (som CI kører) blokerer, når antallet overstiger loftet `metrics.cycles` i `quality-baseline.json` — i øjeblikket 14, `direction: down`, så det kan kun falde (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja (skraldemekanisme)                      |
| `check:boundary`                  | `open-sse → src`-kobling: unikke fil-til-fil-importer fra motoren til appen (`scripts/quality/measure-boundary.mjs`; kantlisten er efterslæbet for afhjælpning af v4-kerne-/modulopdelingen). Den rene kommando = vejledende rapport (samme som `quality:boundary`). `check:boundary:ratchet` (som CI kører, også i skraldemekanismeløkken for hurtige kontrolpunkter i `quality.yml`) blokerer, når antallet overstiger loftet `metrics.boundaryOpenSseToSrc` i `quality-baseline.json` — initialiseret til de målte 771, `direction: down`; `--update` kan kun sænke det; baserelativ på PR'er (`--base-ref`, se nedenfor)                                                                                                                                                                                                                                                                                                                                                                                                | Ja (skraldemekanisme)                      |
| `check:route-validation:t06`      | Zod-skemaer findes på alle ruter (Tier 6-politik)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                         |
| `check:any-budget:t11`            | Antallet af `@ts-expect-error // any` overskrider ikke budgettet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:provider-consistency`      | Hver udbyder i `providers.ts` har en tilsvarende post i `providerRegistry.ts` (og omvendt, inden for tilladelseslisten)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                         |
| `check:model-lifecycle`           | De tre manuelt vedligeholdte routingtabeller forbliver konsistente med det versionsstyrede livscyklus-snapshot (#11503): `FITNESS_TABLE` (`taskFitness.ts`) tildeler ikke en score til noget udfaset id, som `REGISTRY` kan route; hvert mål for `BUILT_IN_ALIASES` findes i `REGISTRY` og er fraværende i snapshottet over udfasede id'er; hvert udfaset id, der stadig findes i `REGISTRY`, videresendes eller er angivet i `allowedRetiredInCatalog`; og ingen kilde eller intet mål i `DEFAULT_DEGRADATION_MAP` er markeret som udfaset i dette snapshot. Dette beviser ikke, at en model aktuelt leveres af en aktiv upstream-tjeneste. Offline — sammenligner med `config/quality/model-lifecycle.json`, som opdateres manuelt med `npm run quality:refresh-model-lifecycle` (netværk; ikke integreret i CI). `allowedRetiredInCatalog` er en skraldemekanisme til gradvis afvikling: Tilføj kun en post sammen med en sporingsopgave.                                                                                | Ja                                         |
| `check:fetch-targets`             | Hvert `fetch("/api/...")` i `src/` på klientsiden peger på en faktisk `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                         |
| `check:deps`                      | Alle afhængigheder, der kan installeres med `npm install`, på tværs af alle `package.json` i repoet findes i `dependency-allowlist.json`; nye ikke-fastlåste eller slopsquattede pakker markeres                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                         |
| `audit:deps`                      | npm audit af alle fem uafhængige lockfiler (roden, Electron, OpenCode-plugins v1/v2 og udbyderen). Kritiske sikkerhedsmeddelelser blokerer; sikkerhedsmeddelelser med høj alvorlighedsgrad forbliver synlige advarsler. Manglende/mislykkede audits er UFULDSTÆNDIGE og blokerer; lock-hashes og rapporter for hvert omfang bevares.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                         |
| `check:lockfile`                  | Integritet af `package-lock.json` — https-register, integritetshashes, ingen værtstilsidesættelser                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:licenses`                  | SPDX-licenstilladelsesliste for produktionsafhængigheder                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                         |
| `check:tracked-artifacts`         | Ingen buildartefakter / committede `node_modules`-symbolske links (kører også i husky pre-commit; pre-push er bevidst let — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:ai-attribution`            | Ingen AI-/bot-`Co-Authored-By`-trailer eller AI-genereringsfooter i PR-commits, titel eller brødtekst — ufravigelig regel nr. #16 (i fast-gates-loopet i `quality.yml` for PR→`release/**` — læser event-payloaden, gør intet uden for PR'er — og et trin kun for PR'er i `ci.yml`-lint for PR→`main`; også husky-`commit-msg`-hooket; menneskelige medforfattere er tilladt; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:vitest-exclusions`         | Hver Vitest-ekskludering angiver et sporingsissue og findes i `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ja                                         |
| `check:file-size`                 | Kildefiler (`.ts`/`.tsx` i `src/`, `open-sse/`, `electron/`, `bin/`) holder sig inden for `cap`, og testfiler (`*.test.ts(x)`) inden for `testCap`; filer, der er fastlåst i `file-size-baseline.json` (`frozen` / `testFrozen`), må ikke vokse ud over deres registrerede størrelse                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                         |
| `check:error-helper`              | Fejlsvar i eksekveringskomponenter/handlere bruger `buildErrorBody()` / `sanitizeErrorMessage()` (ufravigelig regel #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                         |
| `check:migration-numbering`       | SQL-migreringsfiler er nummereret fortløbende uden huller eller dubletter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:public-creds`              | Ingen bogstavelige OAuth-`client_id`/`client_secret` eller Firebase-webnøgler uden for `publicCreds.ts` (ufravigelig regel #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:db-rules`                  | Ingen rå SQL uden for modulerne i `src/lib/db/`; ingen samleimporter fra `localDb.ts` (ufravigelige regler #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                         |
| `check:known-symbols`             | Udbydereksekveringskomponenter, routingstrategier og oversættere, der er registreret i deres dispatch-tabeller, matcher filerne på disken — ingen forældreløse eller ikke-deklarerede symboler                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ja                                         |
| `check:route-guard-membership`    | Hver route, der starter en underproces, er klassificeret af `isLocalOnlyPath()` (ufravigelige regler #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                         |
| `check:test-discovery`            | Hver `*.test.ts`- / `*.spec.ts`-fil i repoet registreres af mindst én testkører (ratchet: listen over forældreløse filer i `test-discovery-baseline.json` kan kun blive kortere)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                         |
| `check:test-tla-order`            | Ingen `node:test`-fil under `tests/unit` registrerer en test, rammer en `await` på topniveau og registrerer derefter flere (#18045; ratchet: `test-tla-order-allowlist.json` kan kun blive kortere)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                         |
| `check:agent-skills-sync`         | Genererede agent-skills-artefakter matcher deres kildekatalog (ingen afvigelser)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:provider-asset-provenance` | Udbyderlogoer/-aktiver har en registreret herkomstpost                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `lint:json`                       | JSON-konfigurationsfiler kan parses og overholder repoets lint-regler                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `typecheck:core`                  | TypeScript-kompilering uden fejl (kun vejledende advarsler)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                         |
| `typecheck:noimplicit:core`       | Streng `noImplicitAny` — fremadrettet; mange eksisterende kaldesteder kræver stadig annoteringer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | **Vejledende** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` afgrænset til `src/app/(dashboard)/**` (#7033) — `typecheck:core`'s kuraterede tilladelsesliste med 27 filer inkluderer ingen dashboard-TSX-filer, og `next build` typekontrollerer dem heller aldrig (`next.config.mjs` angiver `ignoreBuildErrors: true`), så regressioner med ikke-refererede identifikatorer dér (#6625/#6909) var usynlige for CI. Sammenligner med en fastlåst baseline for antal pr. fil/pr. TS-kode (`config/quality/dashboard-typecheck-baseline.json`, samme håndhævelsesmønster for forældede data som `check:known-symbols`) — kun NYE fejl ud over antallet i baselinen får kontrollen til at fejle; sænk gradvist med `--update`, når en eksisterende fejl rettes.                                                                                                                                                                                                                                                                                                                      | Ja                                         |
| `check:build-typecheck`           | Typecheck af hele appens produktion over `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), som overfladen dækket af `typecheck:core`'s allowliste med 27 filer og dashboard-gaten ikke omfatter. Sammenligner med `config/quality/build-typecheck-baseline.json`; et nyt eller forhøjet antal pr. (fil, kode) får kontrollen til at fejle, mens et lavere antal beder dig reducere trinvist. `--update` afvises, mens kørslen indeholder et nyt eller forhøjet par, medmindre `--force-regressions` er angivet, og afvises ved en nyligt undertrykt fil, medmindre `--force-nocheck` er angivet, så det at udvide baselinen for at få en grøn kørsel og at give en permanent undertrykkelse er to separate bevidste handlinger. En bar `--force` afvises. Scanner også build-omfanget efter `@ts-nocheck` i forhold til `config/quality/ts-nocheck-baseline.json`, fordi en fil, der bruger det, slet ikke rapporterer diagnostik og ellers ville være usynlig for alle gates. | Ja                                         |

#### To typecheck-programmer giver forskellige svar

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) og `check:build-typecheck` kompilerer forskellige programmer med forskellige
indstillinger, og den samme fil kan være fejlfri i det ene og fuld af fejl i det andet.

`tsconfig.build.json` angiver `"strict": false`, så `noImplicitAny` er slået fra. Core-
konfigurationen kompilerer en kurateret allowliste med 27 filer med strengere indstillinger
og følger hver posts importgraf, så filer, der aldrig optræder i build-programmet, stadig
bliver kontrolleret dér.

Konsekvensen er vigtig, når det skal vurderes, om en fil er typet: **nul diagnostik
under `check:build-typecheck` betyder ikke nul**. Fjernelse af `@ts-nocheck` fra 26
filer viste, at 23 af dem var fejlfri i build-programmet; seksten af dem viste omkring
120 implicit-any-fejl i det strenge program. Kontrollér begge, før en fil kaldes fejlfri.

### Job: `quality-gate`

Kører efter `test-coverage`. Blokerer fletning ved fejl.

| Script                       | Validerer                                                                                                                                                          | Blokerende                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| `quality:collect`            | Genererer `quality-metrics.json` (antal ESLint-advarsler, dækning fra den flettede shard-rapport)                                                                  | Ja (før ratchet-kontrollen) |
| `quality:ratchet`            | Hver metrik i `quality-baseline.json` er ikke blevet forringet (ESLint-advarsler ≤ baseline; dækning ≥ baseline)                                                   | Ja                          |
| `check:duplication`          | Kodeduplikering (jscpd@4) overstiger ikke baselinen i `quality-baseline.json`                                                                                      | Ja                          |
| `check:complexity`           | Cyklomatisk kompleksitet på filniveau overstiger ikke grænsen (ESLint-kernereglerne `complexity` + `max-lines-per-function`)                                       | Ja                          |
| `check:cognitive-complexity` | Ratchet-kontrol af kognitiv kompleksitet (`eslint-plugin-sonarjs`) — separat ESLint-kørsel; CI kører begge samlet som det enkelte `check:complexity-ratchets`-trin | Ja                          |
| `check:dead-code`            | Ratchet-kontrol af ubrugte eksporter/filer (knip) viser ingen forringelse i forhold til baselinen                                                                  | Ja                          |
| `check:compression-budget`   | Budget for komprimeringsbenchmark — minimumskravene til tokenbesparelser pr. motor må ikke forringes                                                               | Ja                          |
| `check:type-coverage`        | Ratchet-kontrol af procentdelen med typer (`type-coverage`) viser ingen forringelse; erstatter i vid udstrækning `typecheck:noimplicit:core`                       | Ja                          |

### Jobs: `codeql-scan` og `codeql-admission`

`codeql-scan` producerer alle konfigurerede analysekategorier. Når jobbet er lykkedes, validerer `codeql-admission` dets præcise uploads og kandidatens advarselsratchet. Begge er obligatoriske afhængigheder for `Gate / CI`, også for kandidater med kun dokumentation. Kravene til administrativ aktivering og canary beskrives under "CodeQL-ratchet" nedenfor.

| Script                 | Validerer                                                                                                                                                                                                | Blokerende |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:codeql-ratchet` | Kandidatens ref/SHA og alle konfigurerede analysekategorier skal være aktuelle før advarselsratchet; manglende evidens blokerer. Den globale opgørelse forbliver særskilt — se "CodeQL-ratchet" nedenfor | Ja         |

### Job: `quality-extended`

Jobbet blokerer relevante kandidater. Bundtstørrelse, fund af hemmeligheder, fund af sårbarheder,
workflowfund og OpenAPI-ændringer kontrolleres med obligatoriske ratchet-kontroller.
Diagnostik af cirkulære afhængigheder er fortsat vejledende. Installation af scannere er påkrævet:
`scripts/ci/install-quality-scanners.sh` klargør fastlåste versioner og viderefører
installationsfejl. Manglende værktøjer, ugyldige rapporter eller manglende baselines efterlader
den obligatoriske scannerkontrol UFULDSTÆNDIG.

| Script                   | Validerer                                                                                                                                                                                                     | Blokerende                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `check:circular-deps`    | Ingen cirkulære afhængigheder (dpdm)                                                                                                                                                                          | **Vejledende**                                |
| `check:bundle-size`      | Bundlestørrelsen overstiger ikke grænsen; en utilgængelig måling medfører fejl                                                                                                                                | **Blokerende med --ratchet**                  |
| `check:secrets`          | Gitleaks-resultater må ikke forværres; påkrævede scanninger afviser manglende værktøjer/kilde/baseline, mislykkede scanninger og ugyldige rapporter                                                           | **Blokerende med --ratchet**                  |
| `check:vuln-ratchet`     | Sårbarheder i afhængigheder må ikke forværres; påkrævede scanninger afviser manglende værktøjer, ugyldige rapporter eller manglende baselines                                                                 | **Blokerende med --ratchet**                  |
| `check:workflows`        | Workflow-linting (actionlint + zizmor); manglende/defekte scannere, ugyldige rapporter eller manglende ratchet-baseline fejler som INCOMPLETE. Gyldige fund følger den valgte strict/advisory/ratchet-politik | Kørsel påkrævet; zizmor-ratchet blokerer i CI |
| `check:openapi-breaking` | Offentlig API-kontrakt sammenlignes med fastlåste event-commits (PR merge-base, push before, merge-group base; planlagt/manuel checkout bruger først første parent); påkrævet måling fejler lukket            | **Blokerende med --ratchet**                  |

### Job: `docs-sync-strict`

For pull requests til `main` eller `release/**` kører dette job kun for kandidater, der ikke er kladder (eller kommer fra en betroet kø), og som er klassificeret som dokumentations- eller kodeændringer. Det kører også ved CI-hændelser uden en PR; denne workflows push-udløser omfatter kun `main`, ikke `release/**`. Et trin, der afsluttes med en exitkode forskellig fra nul, blokerer jobbet; fund, der kun rapporteres, og de dokumenterede undtagelser nedenfor gør ikke.

| Script                         | Validerer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Blokerende                                                                                                                     |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `check:docs-all`               | Meta-gate, der kører de 7 underordnede gates sekventielt                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ja                                                                                                                             |
| ↳ `check:docs-sync`            | Versionskonsistens mellem pakken, OpenAPI og CHANGELOG, nøjagtige spejlinger af `llm.txt`, invarianter for sektioner og størrelse i oversatte CHANGELOG-filer samt fravær af erstattede, dublerede dokumenter                                                                                                                                                                                                                                                                                             | Ja                                                                                                                             |
| ↳ `check:docs-frontmatter`     | Kompilerede dokumentationssider har gyldige frontmatter-titler                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                                                                                                             |
| ↳ `check:docs-counts`          | Tælleinvarianter med høj sikkerhed håndhæves strengt; heuristiske kontroller af filantal giver kun advarsler, medmindre scriptet modtager `--strict` (CI's meta-gate sender ikke dette flag)                                                                                                                                                                                                                                                                                                              | Strengt niveau blokerer; blødt niveau er vejledende                                                                            |
| ↳ `check:env-doc-sync`         | Aflæsninger af miljøvariabler i kildekoden, `.env.example` og `docs/reference/ENVIRONMENT.md` stemmer overens efter anvendelse af de udtrykkelige undtagelseslister for ignorerede variabler, variabler kun i dokumentationen og variabler kun i miljøet                                                                                                                                                                                                                                                  | Ja, uden for de dokumenterede undtagelseslister                                                                                |
| ↳ `check:deprecated-versions`  | Rapporterer potentielt forældede versioner uden for sikre historiske sammenhænge og forældede opdateringsdatoer; ignorerede dokumenter er undtaget                                                                                                                                                                                                                                                                                                                                                        | Vejledende i den nuværende CI-opsætning (`--strict` sendes ikke)                                                               |
| ↳ `check:doc-links`            | Interne markdown-links i dokumentationen peger på faktiske filer (`[text]`/`(path)`-format)                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                                                                                                             |
| ↳ `check:fabricated-docs`      | Routes, miljøvariabler, CLI-kommandoer, hook-navne og filstier, der er nævnt i dokumentationen, findes i kodebasen. Hård gate via `--strict`; blød fejl uden flag.                                                                                                                                                                                                                                                                                                                                        | Ja (via `--strict` i CI)                                                                                                       |
| `check:cli-i18n`               | De anvendte CLI-nøgler til `t()` findes i `en`; `pt-BR` bevarer alle sektioner på øverste niveau; `zh-CN` og `zh-TW` indeholder alle nøgler fra `en`                                                                                                                                                                                                                                                                                                                                                      | Ja                                                                                                                             |
| `check:openapi-coverage`       | OpenAPI-specifikationen dækker mindst en ratchet-baseret minimumsgrænse for faktiske routes                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                                                                                                             |
| `check:openapi-security-tiers` | Deklarerede `x-loopback-only`/`x-always-protected`-annotationer skal understøttes af `routeGuard.ts`; parserfejl og uoverensstemmelser i den fremadrettede kontrol blokerer. Den omvendte kontrol for manglende `x-loopback-only` under præfikser, der kun tillader lokal adgang, giver advarsler, og ruter, der kun er defineret via mønstre, er undtaget fra denne omvendte gennemgang.                                                                                                                 | Parserkontroller og fremadrettede kontroller blokerer; den omvendte kontrol er vejledende                                      |
| `check:openapi-routes`         | Hver `/api...`-sti i `openapi.yaml` matches med en eksisterende rute uden hensyn til parameterforskelle efter anvendelse af den begrundede undtagelsesliste `KNOWN_STALE_SPEC`; forældede listeposter får også kontrollen til at fejle                                                                                                                                                                                                                                                                    | Ja                                                                                                                             |
| `check:docs-symbols`           | Interne `/api/...`-URL-referencer i kanoniske dokumenter, der ikke er spejlinger, matches med en eksisterende rute eller rutefamilie; proxy-, upstream-, pladsholder- og filreferencer samt begrundede `KNOWN_STALE_DOC_REFS`-poster er undtaget, og forældede listeposter får kontrollen til at fejle                                                                                                                                                                                                    | Ja                                                                                                                             |
| `i18n translation drift`       | Kontrollerer kilde-/målhashes for kernedokumenter og oversættelsens proveniens. PR-sammenligning tillader kun identiske nedarvede fejl; nye eller ikke-verificerede uoverensstemmelser i kilde, manglende mål, målhash, forældet oversættelse eller sektionscache blokerer. Uden for PR-sammenligning blokerer fejl i kilde/manglende mål/målhash, mens forældede oversættelser og inkonsistente sektionscacher fortsat kun er vejledende. En manglende sektionscache i det gamle format er ikke en fejl. | Ny/ikke-verificeret PR-afvigelse blokerer; identisk nedarvet afvigelse er vejledende; regler uden for PR afhænger af fejltypen |

De tolv README-SVG'er under `docs/diagrams/` genereres (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` regenererer dem alle). Hver har en unit-test, der sammenligner bytes
(`tests/unit/docs/readme-*-svg.test.ts`, jobbet `test-unit`), og som fejler, når den committede fil
er forældet, og `check:docs-counts` læser kanoniske tal fra deres `<text>`-noder — hvilket er
årsagen til, at outlining-trinnet bevarer alle outline-de strenge i filen som usynlig `<text>`. SVG-kontrollen af kanoniske tal læser de filer, der er angivet i
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg` samt `public/images/tier-flow-dark.svg` og `tier-flow-light.svg`;
påstandene om free-forever, catalog-entry, recurring-pool og scoring-factors læser også
`promise-pillars.svg`, `free-tier-budget.svg` og `strategies-grid.svg`. `free-tier-budget.svg`
henter sine tal fra den aktive katalogindlæser, så en ændring af `FREE_MODEL_BUDGETS` eller et
visningsnavn for en udbyder gør CI rød, indtil filen er blevet genereret igen.

### Job: `i18n-ui-coverage`

| Script                            | Validerer                                                                                                                                                                                          | Blokerende     |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | Dækningen af UI-i18n-nøgler er ≥ 65 %                                                                                                                                                              | Ja             |
| `check-ui-value-drift` (inline)   | En omskrevet engelsk **værdi** efterlader ingen forældede oversættelser                                                                                                                            | Ja             |
| `check-new-key-coverage` (inline) | En **ny** engelsk nøgle er oversat i alle sprog — en `__MISSING__:`-markør afvises                                                                                                                 | Ja             |
| `check-translation-ratio`         | Andelen af reelle oversættelser pr. sprog (identisk med engelsk/pladsholder/manglende blade uden for tilladelseslisten) må ikke overstige `config/quality/i18n-translation-baseline.json` + margen | **Blokerende** |

Kræver `fetch-depth: 0` — værdiændringskontrollen sammenligner ændringer i `en.json` med fletningsbasen.

#### `check-ui-value-drift` — gate for forældede oversættelser

Opfanger den ene i18n-regression, som de andre kontroller strukturelt ikke kan registrere: En engelsk værdi
omskrives, mens oversættelserne, der er afledt af den _tidligere_ engelske tekst, bliver stående, så
ikke-engelske brugere fortsat læser selvsikkert formuleret, men nu forkert tekst.

Dette blev faktisk udgivet. `oauthModal.googleOAuthWarning` blev omskrevet, da Antigravity-
loginhjælperen blev tilføjet (#5203); **39 af 43 sprog** beholdt tekst, der bad operatører om at "kopiere den
fulde URL og indsætte den nedenfor" — et flow, der ikke kan gennemføres for den pågældende udbyder. Det gik
ubemærket hen indtil #8463, fordi:

- `sync-ui-keys` kun udfylder nøgler, der **mangler**, aldrig nøgler, der er **forældede**;
- `check-ui-keys-coverage` tæller nøglers _tilstedeværelse_, så en forældet oversættelse regnes som dækket;
- `check-translation-drift` sporer dokumentationsspejlingerne i `docs/i18n/<locale>/**.md` —
  den læser aldrig `src/i18n/messages/*.json`. Blokerende i jobbet `docs-sync-strict` siden
  gensynkroniseringen i 2026-09: rediger et centralt dokument → `npm run i18n:run -- --files=<doc>` (på sektionsniveau, billigt).

**Ændringsbevidst, ikke understøttet af en baseline.** Den sammenligner `en.json` ved fletningsbasen med
arbejdstræet; for hver nøgle, hvis engelske værdi er ændret, er ethvert sprog, der stadig indeholder en
uberørt oversættelse, forældet. Dette **fastfryser bevidst eksisterende gæld** — en ændring kan
ikke afsløre, hvilken gammel engelsk tekst en langvarig oversættelse stammer fra, så kontrollen vurderer
kun det, som den aktuelle ændring berører. Alternativet (en hash-baseline pr. nøgle) ville kræve
en genereret fil på ~600 KB, tre gange større end den største eksisterende baseline, som ville ændre sig ved hver i18n-PR.

Der er to måder at opfylde kravet på:

1. opdater de berørte oversættelser, eller
2. indstil dem til `__MISSING__:<new english>` — kørselssystemet leverer derefter den rettede engelske tekst
   (`src/i18n/request.ts::deepMergeFallback`, #7258), og nøglen sættes i kø til oversættelse.

Hvis strengens **betydning** er ændret, bør du foretrække at **omdøbe nøglen**: En ny nøgle kan ikke arve
en forældet oversættelse. Det var det mønster, #8463 anvendte.

```bash
npm run i18n:check-value-drift          # streng (det, CI kører)
npm run i18n:check-value-drift:warn     # kun rapportering
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Værdidrift- og ny nøgle-kontrollerne deler én uforanderlig sammenligning fra
`scripts/i18n/resolve-ui-diff-base.mjs`. Workflowet videregiver de samme base-, base-tip- og
kandidat-SHA'er til begge kontroller. Kørsel ved PR-/base-retargeting, push og merge-group bruger deres
hændelseskontekst. Dispatch af en kandidatbranch kræver dens præcise åbne PR eller det eksplicitte
`i18n_base_sha`-input. Dispatch eller planlagt observation af `main` eller `release/vX.Y.Z`
uden dette input sammenligner den seneste commit med dens første parent; det er ikke en revision af
al nedarvet oversættelsesgæld. Lokal kørsel kræver en eksplicit sammenligningsbase,
f.eks. `BASE_REF`-kommandoen ovenfor.

Manglende eller tvetydig sammenligningskontekst, et ulæseligt eller ugyldigt påkrævet katalog og
en ændret kandidat resulterer i `INCOMPLETE` med afslutningskode **2**, også i advarselstilstand.
Kataloger læses med `scripts/i18n/read-ui-catalog.mjs`; læsefejl erstattes ikke
med tomme objekter. Hverken en utilgængelig base eller ufuldstændigt input medfører PASS.

### Job: `i18n`

Komplet i18n-valideringsmatrix (ét job pr. locale). Hele jobbet er vejledende.

| Script                          | Validerer                              | Blokerende                                                 |
| ------------------------------- | -------------------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | Oversættelsesfuldstændighed pr. locale | **Vejledende** (`continue-on-error: true` for hele jobbet) |

### Job: `pr-test-policy`

Kører kun på pull requests.

| Script                 | Validerer                                                                                                                                      | Blokerende |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PR'er, der ændrer produktionskode i `src/`, `open-sse/`, `electron/` eller `bin/`, skal inkludere eller opdatere tests (hård regel #8)         | Ja         |
| `check:test-masking`   | Ændrede testfiler reducerer ikke nettoantallet af assertions og tilføjer ikke `assert.ok(true)`-tautologier                                    | Ja         |
| `check:pr-evidence`    | PR-teksten henviser til test-/VPS-dokumentation for ændringen (automatiserer hård regel #18 ved at søge i PR-teksten — skrøbeligt, se Backlog) | Ja         |

### Job: `test-vitest`

Kræver klassificeringsjobbet `changes`. Relevante matrix-shards blokerer fletning ved fejl.

| Pakke            | Validerer                                                    | Blokerende                                                                                                     |
| ---------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-server (110 værktøjer), autoCombo, cache — vitest-kørsel | Ja                                                                                                             |
| `test:vitest:ui` | UI-komponenttests — vitest-kørsel                            | **Blokerende** — eksisterende fejl er eksplicit udeladt i `vitest.config.ts`; nye fejl får jobbet til at fejle |

### Natlige workflows (planlagte, vejledende)

Disse kører efter en cron-plan (og `workflow_dispatch`), aldrig på PR'er. De er alle vejledende.

| Workflow               | Validerer                                                                                                                                                              | Blokerende     |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | fast-check-egenskabstests med et tilfældigt seed + et højt antal kørsler                                                                                               | **Vejledende** |
| `nightly-resilience`   | kontrol af heap-vækst, chaos-fejlinjektion, k6-belastnings-/udholdenhedstest                                                                                           | **Vejledende** |
| `nightly-llm-security` | promptfoo-injektionsbeskyttelse (blokeringstilstand) + garak-prober (springes over uden en provider-hemmelighed)                                                       | **Vejledende** |
| `nightly-schemathesis` | fuzzing af OpenAPI-kontrakten (schemathesis) mod en aktiv OmniRoute ved hjælp af `docs/openapi.yaml` — afdækker specifikationsbrud / uhåndterede 500-fejl (Fase 8 B.4) | **Vejledende** |
| `nightly-mutation`     | Stryker-mutationstestscore for det hurtige enhedstestspor — overlevende mutanter afdækker svage assertions                                                             | **Vejledende** |
| `nightly-compat`       | kompatibilitetsmatrix for Node-motoren på tværs af de understøttede `engines.node`-intervaller                                                                         | **Vejledende** |

Ydeevnebaselines (heap, TTFB, byggetid) registreres, men håndhæves ikke: se [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
- **vejledende** — den globale total sammenlignet med den fastfrosne baseline. Nedarvet afvigelse markerer aldrig en
  uskyldig PR som rød; afvigelsen spores med henblik på udbedring ved release-afstemning og overvåges af
  headroom-jobbet.

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

### CodeQL-ratchet: kandidatoptagelse og repositoryopgørelse

CI ejer kandidaters CodeQL-optagelse gennem en eksplicit afhængighedskæde: `codeql-scan` kalder matricen med fire sprog i `codeql.yml`, hvorefter `codeql-admission` kører `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` kræver begge resultater. Quality beholder sine numeriske kontroller, men forespørger ikke scanneren, før producenten er færdig; `Gate / Quality` alene er ikke fuldstændig kandidatoptagelse. CodeQL er fortsat påkrævet for kandidater med kun dokumentation.

Politikken i `config/quality/codeql-admission-policy.json` vælger Actions, C/C++, JavaScript/TypeScript og Python, forespørgselssæt default, trusselsmodel remote og buildtilstand none. Producentens forhåndskontrol afviser en afventende aktiveringspost og grene uden for den eksplicitte målliste. De første mål er main og release/v3.8.53; næste release kræver gennemgået tilføjelse. CI's eksisterende bredere udløser for release-PR'er bevares, men et mål, der endnu ikke er tilføjet, rapporterer HOLD før ekstraktion i stedet for at få et umålt PASS.

Hvert matrixjob registrerer sit faktiske SARIF-upload-ID, sprog, kategori, kørsel og forsøg, identiteten af det kaldende workflow, hændelsens ref/head/base/merge-SHA og politikhash. Det afhængige job henter kun denne kørsels kvitteringer og validerer artefaktdigests. Det kræver alle fire kategorier, en vellykket producent og afsluttet behandling af hvert præcist upload. Det bruger API'ets sarif_id-filter, ikke den seneste analyse fundet på en gren. Delvise genkørsler kan genbruge vellykkede kategorier fra et tidligere forsøg i samme kørsel og kandidat, med bevarelse af producentforsøget; en mislykket nuværende producent kan ikke genbruge tidligere grøn evidens.

CodeQL-actionen venter på behandling, men den fastlåste implementering kan advare og fortsætte efter fejl i statuslæsning eller opbrugt ventetid. Optagelsen verificerer derfor behandlingen igen. Manglende kategorier, afventende behandling, mislykkede eller annullerede jobs, forældet identitet, ufuldstændig paginering eller utilgængelige API'er giver HOLD og afslutningskode 2. Der er ingen fast ventetid tilbage på et uafhængigt scannerworkflow. En uscannet PR kan ikke bestå, fordi en advarselsforespørgsel returnerede 0. Et målt antal over `metrics.codeqlAlerts.value` afsluttes med 1; baselinen hæves ikke for at opsluge advarsler fra en anden gren. [Uploadstatus og analyseopslag](https://docs.github.com/en/rest/code-scanning/code-scanning).

Kvitteringen registrerer upload- og analyse-ID'er, kategorier, værktøjsversioner, ref/SHA, baseline og advarselsantal. SARIF-identitet/resultatantal, minimumsantal regler og præcise advarselsforekomster forbliver obligatoriske. PR-/analyseidentiteter kontrolleres igen før accept. Disse kontroller fastslår dækning af konfigurerede kategorier, ikke en opgørelse over hver ekstraheret kildefil. C/C++-ekstraktion uden build omfatter ikke kode genereret under et projektbuild. Kildeudeladelser kræver stadig gennemgang, og tilskrivning til bidragydere kræver sammenlignelig evidens for den præcise base.

`codeql-maintenance.yml` leverer pushscanninger for den aktive release og den ugentlige tidsplan uden at duplikere PR/main-producenter. `nightly-codeql-inventory.yml` holder den repositorydækkende baseline særskilt med `--strict-measurement` og fejl, når måling ikke er tilgængelig. Den lokale ældre indsamlers kontrollerede overspring er ikke kandidatoptagelse. Stramning forbliver en eksplicit `--update` efter et verificeret lavere globalt antal.

Advanced-workflowet må ikke offentliggøres, mens Default Setup er konfigureret: GitHub afviser den kombination. Dets versionerede politik forbliver afventende, indtil den gennemgåede administrative overgang er læst tilbage. Før offentliggørelse fastlåser en operatør repository, head/base/tree, politik-/patch-/rollback-hashes og den observerede opsætningstilstand; `node scripts/quality/codeql-producer.mjs verify-admin-readback` kontrollerer de indsendte forventede og faktiske JSON-poster. Dette er et teknisk værn, ikke operatørgodkendelse eller en erstatning for at hente friske tilbagelæsninger. PR-tokenet anmoder aldrig om Administration-adgang. Udrulning og enhver scannerændring kræver denne særskilte tilbagelæsning samt reel kompatibilitetsevidens for PR, fork og mergegruppe.

Forks bruger hostede runnere, checkout uden gemte legitimationsoplysninger, ingen projektinstallation/build i producenten og ingen arvede repositoryhemmeligheder. GitHub understøtter SARIF-upload for pull_request-hændelsen med dens reducerede forktoken; godkendelse af kørsel ved førstegangsbidrag forbliver GitHub-politik. Brug aldrig pull_request_target til at udføre kode, der ikke er betroet. Bekræft faktiske tokentilladelser, analysis_key og alle kategorimiljøer i den kontrollerede canary, før migreringen anses for afsluttet. [Regler for fork-upload](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [modstridende opsætningstilstande](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

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

Enhver kontrol, der ikke må fejle på allerede eksisterende overtrædelser, bruger en fastfrosset tilladelsesliste
(f.eks. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Politikken er:

**Løs den grundlæggende årsag; brug kun tilladelseslisten, når overtrædelsen allerede eksisterer og
ikke kan løses i samme PR.**

Når du føjer en post til en tilladelsesliste:

1. Medtag en kommentar med begrundelsen.
2. Henvis til det relevante tracking-issue (f.eks. `// #3498 — Phase 2 feature, not yet implemented`).
3. Fjern posten i den samme PR, som løser overtrædelsen — en forældet post, der ikke længere
   undertrykker en aktiv overtrædelse, er i sig selv en fejl (6A.3-kontrollen for forældet håndhævelse vil
   få kontrollen til at fejle på en isoleret post i tilladelseslisten, når den er implementeret).

Tilføj **ikke** poster på tilladelseslisten for at få test til at bestå hurtigere. En bestået kontrol med en voksende
tilladelsesliste giver en falsk følelse af kvalitet.

### Når en kontrol fejler på din PR

1. **Læs kontrollens output omhyggeligt** — det fortæller dig præcis, hvilken fil eller hvilket symbol der overtrådte
   reglen.
2. **Ret overtrædelsen** — de fleste kontroller er deterministiske filsystemkontroller, der består, så snart
   koden er korrekt.
3. **Hvis overtrædelsen allerede eksisterer** (dvs. du introducerede den ikke, men kontrollen
   omfatter den nu): Tilføj en post på tilladelseslisten med en begrundende kommentar og et tracking-issue.
4. **Hvis kontrollen er en skraldemekanisme** (dækning, ESLint-advarsler, duplikering, kompleksitet):
   Din ændring har forværret metrikken. Løs det underliggende problem, eller kør (i sjældne tilfælde)
   `npm run quality:ratchet -- --update`, hvis ændringen er tilsigtet, og forringelsen af metrikken
   er acceptabel — men dokumentér hvorfor i PR-beskrivelsen.
5. **Rådgivende kontroller** (`continue-on-error: true`) er kun til orientering — de blokerer ikke
   fletning, men vises i CI-oversigten. Ret dem alligevel.

---

## Tilføjelse af en ny gate

1. Opret `scripts/check/check-<name>.mjs` (eller `.ts`). Politik-gates afsluttes med 0/1.
   Gates af skraldemekanismetypen skriver en måling til `quality-metrics.json` via `collect-metrics.mjs`.
2. Tilføj `"check:<name>": "node scripts/check/check-<name>.mjs"` til `package.json`, og
   synkroniser aliasset og dets nøjagtige kommando i `config/quality/gate-manifest.json`.
   Udfør den samme synkronisering, når du ændrer eller fjerner et eksisterende valideringsalias.
   Kør `npm run check:gate-manifest`; pre-commit-hooket og CI-ændringsklassificeringen
   håndhæver denne kontrakt.
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

## Rationaliserings-backlog (ROI-gennemgang — fase 9, bølge 3)

Denne oversigt blev afstemt mod `ci.yml` den 2026-06-17 (den tidligere version udelod
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). En ROI-gennemgang af det afstemte sæt
identificerede følgende kandidater til rationalisering. **Sammenlægningerne er mekaniske
CI-ændringer; ændringerne af håndhævelsesstatus/fjernelserne er politikbeslutninger, som er forbeholdt operatøren.** Intet nedenfor
er anvendt endnu.

**Heller ikke dokumenteret ovenfor** (rådgivende, lav signalværdi): jobbet `docs-lint` (markdownlint + Vale, hele jobbet `continue-on-error`) og de selvstændige scannerworkflows `semgrep.yml` / `scorecard.yml`. CodeQL har nu obligatoriske producent- og optagelsesjobs under `Gate / CI`, underlagt aktiveringskravene ovenfor. `semgrepFindings: 0` findes i `quality-baseline.json`, men er ikke koblet til en blokerende ratchet i `ci.yml` — metrikken er i øjeblikket uden tilknytning.

### Sammenlægning / deduplikering (mekanisk, lavere risiko)

Hver kandidat blev valideret mod den aktuelle gate-status den 2026-06-17 (tillid, men kontrollér);
flere "indlysende" sammenlægninger viste sig at skjule gæld og er **ikke** problemfri erstatninger.

- **`check:docs-sync` kører to gange** — selvstændigt i jobbet `lint` og igen inde i `check:docs-all` (`docs-sync-strict`) samt i husky pre-commit-hooket. ✅ **UDFØRT** — den selvstændige `lint`-kørsel er fjernet.
- **CVE-scanning** — ❌ **IKKE en problemfri sammenlægning.** `audit:deps` blokerer kritiske sikkerhedsadvarsler og ufuldstændige audits på tværs af alle fem lockfiles, mens advarsler med høj alvorlighed rapporteres som advarsler under den nuværende politik; `check:vuln-ratchet` (osv) fejler kun ved en _regression_ i forhold til den indcheckede baseline og afviser manglende målinger, når de er påkrævet. Forskellig semantik — fjernelse af `audit:deps` ville fjerne den absolutte gate for kritiske problemer og de uafhængige kvitteringer for pakkeaudits. Behold begge.
- **Cyklusregistrering** — ✅ **UDFØRT** (#15159 G-01/G-02). Den gamle tekst her kaldte `check:cycles` for "den grønne, kuraterede" gate og begrundede, at den skulle forblive blokerende, fordi `check:circular-deps` (dpdm) rapporterede 91 cyklusser. Det grønne resultat var et **falsk grønt resultat**: `check:cycles` scannede 5 undermapper (450 filer), matchede kun statiske `import|export … from` og frasorterede alle `@/`- og `@omniroute/open-sse/`-specifikatorer, så den kunne ikke se de cyklusser med dynamisk import + aliaser, der dominerede repoet. Rettet: gaten gennemgår nu `src` + `open-sse` (5023 filer), indsamler specifikatorer fra TypeScript-AST'en (så `import("…")` tæller, mens `typeof import("…")` i typeposition ikke gør) og opløser tsconfig-`paths`. Den finder **14** cyklusser, ikke 0. Da 14 eksisterende cyklusser ikke kan rettes i en gate-PR, er `check:cycles` nu en **skraldemekanisme** (`--ratchet`, loft `metrics.cycles.value = 14` i `quality-baseline.json`, `direction: down`) — den blokerer enhver _regression_, og antallet kan kun falde. CI kører `npm run check:cycles:ratchet`. Nedbringelsen følger **A-01**. `check:circular-deps` (dpdm) forbliver vejledende som den bredere sekundære vurdering.
- **Kompleksitet** — ✅ **UDFØRT** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): én ESLint-gennemgang, optælling efter ruleId, så baselines for cyklomatisk kompleksitet + maksimalt antal linjer og kognitiv kompleksitet forbliver uafhængige; de individuelle `check:complexity` / `check:cognitive-complexity` bevares til lokal `--update`.
- **`/api`-antihallucination** — ✅ **UDFØRT** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): én FS-oversigt over `src/app/api`; openapi-routes + docs-symbols rapporterer fortsat uafhængigt; de individuelle kontroller bevares til lokale kørsler.
- **`check:node-runtime` kører i 11 jobs** — ⚠️ **lav ROI.** Hvert job bruger en separat runner, og kontrollen tager <1 sek.; samlet besparelse ~10 sek., men på bekostning af at miste en billig beskyttelse pr. job. Ikke besværet værd.
- **`typecheck:noimplicit:core` i CI-lint** — ✅ **fjernet fra lint-jobbet** (var vejledende med `continue-on-error`); den blokerende typeoverflade er `typecheck:core` + `check:type-coverage`. Det lokale script er bevaret.

### Ændr håndhævelsesstatus / beslut (operatørpolitik)

- `check:openapi-security-tiers` (vejledende) — ❌ **KAN IKKE uden videre gøres blokerende.** Den afslutter med 0, men advarer om, at flere `traffic-inspector`-ruter under `LOCAL_ONLY_API_PREFIXES` mangler annoteringen `x-loopback-only: true`. Håndhævelse kræver, at disse annoteringer først føjes til `openapi.yaml`.
- `typecheck:noimplicit:core` (vejledende) — er i vid udstrækning dækket af den blokerende `check:type-coverage`-skraldemekanisme. Gør den til en skraldemekanisme, eller fjern den redundante anden `tsc`-kørsel.
- `test:vitest:ui` (nu **blokerende**) — eksisterende fejl er eksplicit ekskluderet i `vitest.config.ts` med sporingskommentarer af typen `// #8618`; nye fejl får jobbet til at fejle.
- `check:secrets` (gitleaks, blokerende skraldemekanisme) — det nuværende loft er `metrics.secretFindings` i `quality-baseline.json`. Enhver undtagelse kræver en begrundet post i `.gitleaks.toml`; en utilgængelig måling er UFULDSTÆNDIG. Scanningen supplerer GitHubs indbyggede scanning efter hemmeligheder og `check:public-creds`.
- `check:pr-evidence` (blokerende, søger med grep i PR-brødteksten) — høj risiko for falske positiver; fjernelse svækker håndhævelsen af Hard Rule #18, så dette er en reel politikbeslutning.
- `semgrep` (selvstændig, vejledende) — overlapper CodeQL for OWASP-familierne; forbind dens baseline med en skraldemekanisme, eller fjern den.

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
