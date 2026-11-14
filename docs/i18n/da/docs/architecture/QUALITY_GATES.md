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

## Portbeholdning og udførelsesprofiler

### Kandidatoptagelse

CI og Quality Gates-arbejdsgangene udsender hver især en stabil dom: `Gate / CI` og `Gate / Quality`. Deres versionerede optagelsespolitik opregner hvert opstrømsjob efter behov eller rådgivende. Et relevant påkrævet job skal lykkes: manglende, annulleret, sprunget over, afventende og ukendte resultater kan ikke etablere PASS. En gyldig docs-only eller catalog-only klassifikation kan gøre en kodebane uanvendelig; et udkast til PR er ikke en accepteret kandidat. Et `hotfix` mærke giver ikke afkald på beviser.

Begge arbejdsgange dækker PRs til main/release grene, push til `main`, manuel afsendelse og merge-group begivenheder. Push, afsend og flet-gruppe køre hele udvalget. Skub til `release/**` starter dem ikke (2026-10-18): hver ændring kørte allerede matrixen på sin PR, og den fusionerede kombination er Release-Greens job (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks og merge-grupper bruger hostede løbere til job, der ellers vælger selvhostede løbere; tilstrækkelig hostet kapacitet skal verificeres før udrulning.

En almindelig PR kører det hurtige udvalg. `full-code` og `full-code-e2e` -banerne i adgangspolitikken (E2E, integration, pakkeartefakt, Electron smoke, Bun SQLite, økosystem- og protokolklienter) kører kun på et Mergify-køudkast eller på en fuld kørsel: `gh workflow run ci.yml --ref <branch>`.

Hver JSON -kvittering identificerer den udtjekkede SHA, arbejdsgang og forsøg. CLI afviser en checkout/event SHA -uoverensstemmelse. Workflow-tests binder politikmedlemskab til domsjobbets `needs` liste, så en ny eller fjernet bane ikke stille kan forsvinde. Kvitteringerne dækker deres egen arbejdsgang, ikke udgivelse, implementering eller det interne i en eksisterende rådgivende scanner. Aktivering af begge kontrolnavne i grenregler er en separat administrativ ændring; tilføjelse af disse job beskytter ikke i sig selv en filial.

### Flet kø

`queue` etiketten sender en PR til Mergify-køen (`.mergify.yml`). Mergify åbner et udkast til PR på en `mergify/merge-queue/` -gren, CI kører hele markeringen der, og den originale PR smelter sammen, når `Gate / CI`, `Gate / Quality` og `Merge integrity (changelog + generated skills)` passerer.

Mergify skriver sin køoversigt i udkastets beskrivelse, og andre apps kan også redigere den. En `pull_request` `edited` -begivenhed på sådan et udkast tager sin egen samtidighedsgruppe (`-queue-edit-<run_id>`), så den kan ikke annullere udkastets rigtige løb, og den springer porten og matrixen over. Kun `Merge integrity` kører stadig. Det oversprungne gate-job har et andet kontrolnavn, fordi Mergify læser en oversprunget `Gate / CI` som en mislykket kontrol og sætter PR i kø.

Efter en dekø stiller et push ikke altid PR i kø. Kommenter `@mergifyio queue` på det.

### Beholdt bevis i acceptreduceren

`scripts/quality/validate-release-acceptance.mjs` reducerer en leveret plan og dens manifester; det fastslår ikke, at planen dækker hele frigivelsesrørledningen. Dens rapporter angiver eksplicit `releaseAcceptance: false`, selv når planen er `VERIFIED`. `release-acceptance.yml` arbejdsgangen bruger stadig skyggearmaturer, ikke rigtige build-, pakke-, boot- eller kampagnekvitteringer.

CLI kræver `--evidence-root` for at verificere bevarede beviser. Filer løses som `<evidence-root>/<artifact_id>/<member>` og hash som SHA-256. En PASS -post uden beviser, en manglende eller ændret fil, en usikker sti eller et symlink forhindrer verifikation. Manglende filer svarer ikke til tomme vellykkede logfiler. Eksisterende SHA/run/attempt -checks forbliver uafhængige: matchende bytes kan ikke redde en forældet kvittering. Filintegritet er ikke bevis for eksekveringsægthed eller artefaktpromovering.

### Statisk scanningsbeholdning

Den versionerede npm-alias opgørelse og statisk scanning medlemskab live i `config/quality/gate-manifest.json`. Kør `npm run check:gate-manifest` for at validere scriptnavne og nøjagtige kommandoer mod `package.json`; tilføjelser, fjernelser og kommandodrift fejler både den lokale hook og ændringsklassifikationsjob i CI. Et alias er ikke et workflowjob, matrixforekomst eller testcase: Disse tællinger må ikke præsenteres som udskiftelige.

Brug `npm run quality:scan -- --list` eller `npm run quality:scan:fast -- --list` til at inspicere de valgte aliaser uden at udføre dem. Løberen kalder npm-indgangspunktet, så dets kørselstid (inklusive Bun hvor konfigureret) bevares. Manifestet registrerer aliaser uden for disse profiler som separat påkaldt, og vedligeholdelseskommandoer er forbudt i skrivebeskyttede scanningsprofiler.

Disse profiler dækker kun den statiske scanning. De attesterer ikke produkttest, dækning, emballage, eksterne kontroller eller en kandidats fulde accept af frigivelsen. Workflowadgang bruger de sammenkædede `config/quality/admission-policy.json` og `scripts/quality/admission-verdict.mjs`. Frigivelsesobservatørprofiler forbliver adskilte; inspicere deres gældende checks og kvitteringer uafhængigt. Den fulde observatørs statiske kommandoer er deklareret i `config/quality/release-green-static-profile.json`, inklusive `audit:deps`, mutationstestvalg og translationstjek. Indlæseren validerer npm-kommandoer mod package.json og modellerede CI/Quality -erklæringer; den afviser drift i stedet for at udføre shell-tokens som argumenter. Påkrævet scanner SKIP/INCOMPLETE output kan ikke etablere PASS. Profilen registrerer sine eksterne ekskluderinger og erstatter ikke hostet dækning, testmatricer, pakke- eller implementeringsbeviser. Prosaopgørelsen nedenfor er en reference, ikke et bevis på, at en port rent faktisk kørte.

Scripts lever under `scripts/check/` (policy gates) og `scripts/quality/` (ratchet engine). CI kilden til sandhed er `.github/workflows/ci.yml`.

### Slip PR fast-path (`quality.yml`)

`.github/workflows/quality.yml` supplerer CI på main/release PRs, skubber til `main`, sender og fusionerer grupper. PRs bruger stifiltrerede hurtige kontroller. Den permanent deaktiverede dubletversion blev fjernet; de rigtige build/package/boot -checks forbliver i CI. Enhedspakken og vitesten kører kun i CI (`Unit Tests (N/8)` og `Vitest`).

| Job                                              | Omfang                                                                                                            | Blokering            |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs og docs-all                                                                          | Ja                   |
| `Fast Quality Gates`                             | Kode PRs; statiske tjek, typecheck, dashboard typecheck, påvirkede enhedstests, glemte søskendetests (rådgivende) |
| `No new ESLint warnings`                         | Kode PRs; dæmpningsbevidst fnugbeskytter                                                                          | Ja, inklusive gafler |
| `Merge integrity (changelog + generated skills)` | Ikke-udkast PRs; changelog og genereret færdighedssynkronisering                                                  | Ja, inklusive gafler |

#### Glemt søskendetests rapport

`npm run check:forgotten-sibling-tests` kører som et rådgivende trin for `Fast Quality Gates` og genbruger importresolveren bag test-impact map. For hvert ændret produktionsmodul rapporterer det deterministiske `changed module/symbol -> static consumer -> candidate sibling test` kæder, når kandidattesten er fraværende i pull-request diff. Markdown-resuméet og JSON resultatet bevares som `forgotten-sibling-tests` -workflow-artefakten til kalibrering før enhver blokerende udrulning.

Tønde-reeksport og dynamisk import er kun opløsningsdiagnostik; de skaber aldrig et blokerende fund. Anmeldte undtagelser lever i `config/quality/forgotten-sibling-allowlist.json`. Hver post skal navngive forbruger- og kandidattesten, give en specifik begrundelse og linke et GitHub problem eller pull-anmodning. Forkert indgange mislykkedes lukket. Undtagelser kan ikke undertrykke en slettet kandidattest eller en diff, der tilføjer `.skip`/`.todo`; påstandssvækkelse og anden maskering forbliver ejet af den uafhængigt blokerende `check:test-masking` port.

### Job: `lint`

Kører på hver PR til `main`. Blokke smelter sammen ved fejl.

| Script (`npm run ...`)            | Validerer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Blokering                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Node.js versionen er inden for det understøttede område                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                         |
| `check:cycles`                    | Cirkulær import på tværs af hele `src/` + `open-sse/` (AST-baseret, tsconfig `paths` løst). Bare udgange 1, når der eksisterer en cyklus (fail-closed siden #15281) og viser SCCs. `check:cycles:ratchet` (hvad CI kører) blokerer, når antallet overstiger `metrics.cycles` -loftet i `quality-baseline.json` — i øjeblikket 14, `direction: down`, så det kan kun falde (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ja (skralde)                               |
| `check:boundary`                  | `open-sse → src` -kobling: unik fil-til-fil-import fra motoren til appen (`scripts/quality/measure-boundary.mjs`; kantlisten er v4 core/module-split afhjælpningsefterslæbet). Bare = -rådgivningsrapport (samme som `quality:boundary`). `check:boundary:ratchet` (hvad CI kører, også i `quality.yml` fast-gates skraldeløkken) blokerer, når antallet overstiger `metrics.boundaryOpenSseToSrc` loftet i `quality-baseline.json` — seeded ved de målte 771, `direction: down`; `--update` sænker det kun; base-relativ på PRs (`--base-ref`, se nedenfor)                                                                                                                                                                                                                                                                                                                                                                                | Ja (skralde)                               |
| `check:route-validation:t06`      | Zod skemaer til stede på alle ruter (Tier 6-politik)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                         |
| `check:any-budget:t11`            | `@ts-expect-error // any` antallet overstiger ikke budgettet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ja                                         |
| `check:provider-consistency`      | Hver udbyder i `providers.ts` har en matchende post i `providerRegistry.ts` (og omvendt inden for tilladelseslisten)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                         |
| `check:model-lifecycle`           | De tre håndvedligeholdte routingtabeller forbliver i overensstemmelse med det indtjekkede livscyklus-øjebliksbillede (#11503): `FITNESS_TABLE` (`taskFitness.ts`) scorer ikke noget pensioneret id, som `REGISTRY` kan dirigere; hvert `BUILT_IN_ALIASES` mål er til stede i `REGISTRY` og fraværende fra det pensionerede-id-øjebliksbillede; alle tilbagetrukne id'er, der stadig er i `REGISTRY` videresendes eller vises i `allowedRetiredInCatalog`; og ingen `DEFAULT_DEGRADATION_MAP` kilde eller -mål vises tilbagetrukket i det øjebliksbillede. Dette beviser ikke, at en model i øjeblikket betjenes af en live upstream. Offline — sammenlignes med `config/quality/model-lifecycle.json`, opdateret manuelt med `npm run quality:refresh-model-lifecycle` (netværk; ikke tilsluttet CI). `allowedRetiredInCatalog` er en nedbrændt skralde: Tilføj kun en post med et sporingsproblem.                                         | Ja                                         |
| `check:fetch-targets`             | Hver `fetch("/api/...")` i `src/` på klientsiden løses til en rigtig `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:deps`                      | Alle `npm install` -able deps på tværs af hver `package.json` i repoen er i `dependency-allowlist.json`; nye unpinned eller slopsquatted pakker markeret                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                         |
| `audit:deps`                      | npm revision af alle fem uafhængige låsefiler (root, Electron, OpenCode plugins v1/v2 og provider). Kritisk rådgivning blok; høje advarsler forbliver synlige advarsler. Missing/failed revisioner er INCOMPLETE og blok; per-scope låsehash og rapporter bevares.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:lockfile`                  | `package-lock.json` integritet — https-registrering, integritets-hash, ingen host-tilsidesættelser                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:licenses`                  | SPDX -licenstilladelsesliste for produktionsafhængigheder                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:tracked-artifacts`         | Ingen byggeartefakter/committerede `node_modules` symlinks (kører også i husky pre-commit; pre-push er bevidst let — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                         |
| `check:ai-attribution`            | Ingen AI/bot `Co-Authored-By` trailer eller AI-generations footer i PR commits, titel eller body — Hard Rule #16 `commit-msg` i `quality.yml` fast `main` gates loop for PR→ `release/**` — læser begivenhedens nyttelast, no-op off PRs — og et PR-kun trin i `ci.yml` PR den menneskelige →; medforfattere tilladt #14436                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:vitest-exclusions`         | Hver Vitest -ekskludering navngiver et sporingsproblem og vises i `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:file-size`                 | Kildefiler (`.ts`/`.tsx` i `src/`, `open-sse/`, `electron/`, `bin/`) forbliver inden for `cap` og testfiler (`*.test.ts(x)`) inden for `testCap`; filer frosset i `file-size-baseline.json` (`frozen` / `testFrozen`) må ikke vokse forbi deres registrerede størrelse                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja                                         |
| `check:error-helper`              | Fejlsvar i executors/handlers bruger `buildErrorBody()` / `sanitizeErrorMessage()` (hård regel #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                         |
| `check:migration-numbering`       | Migration SQL -filer er sekventielt nummererede, ingen huller eller dubletter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                         |
| `check:public-creds`              | Ingen bogstavelige OAuth `client_id`/`client_secret` eller Firebase-webnøgler uden for `publicCreds.ts` (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                         |
| `check:db-rules`                  | Ingen rå SQL uden for `src/lib/db/` moduler; ingen tønde-import fra `localDb.ts` (Hårde regler #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ja                                         |
| `check:known-symbols`             | Udbydere, routingstrategier og oversættere, der er registreret i deres afsendelsestabeller, matcher filerne på disken — ingen forældreløse eller ikke-erklærede symboler                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                         |
| `check:route-guard-membership`    | Hver rute, der afføder en underordnet proces, er klassificeret efter `isLocalOnlyPath()` (Hårde regler #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:test-discovery`            | Hver `*.test.ts` / `*.spec.ts` -fil i repoen indsamles af mindst én testløber (ratchet: forældreløse liste i `test-discovery-baseline.json` kan kun krympe)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                         |
| `check:test-tla-order`            | Ingen `node:test` fil under `tests/unit` registrerer en test, rammer en `await` på øverste niveau og registrerer derefter mere (#18045; skralde: `test-tla-order-allowlist.json` kan kun krympe)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                         |
| `check:agent-skills-sync`         | Genererede agentfærdighedsartefakter matcher deres kildekatalog (ingen drift)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:provider-asset-provenance` | Udbyder logos/assets har en registreret herkomstpost                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `lint:json`                       | JSON config-filer parser og opfylder repo lint-reglerne                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `typecheck:core`                  | TypeScript -kompilering uden fejl (kun rådgivende advarsler)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ja                                         |
| `typecheck:noimplicit:core`       | Strenge `noImplicitAny` — fremadskuende; mange allerede eksisterende opkaldswebsteder har stadig brug for annoteringer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | **Rådgivende** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` scoped til `src/app/(dashboard)/**` (#7033) — `typecheck:core` kurerede tilladelsesliste med 27 filer inkluderer ikke noget dashboard TSX, og `next build` typechecker det heller aldrig (`next.config.mjs` sætter `ignoreBuildErrors: true`), så forældreløse identifikator-regressioner der (#6625/#6909) var usynlige for CI. Forskelle i forhold til en fastfrosset per-file/per-TS-code count baseline (`config/quality/dashboard-typecheck-baseline.json`, samme forældede håndhævelsesmønster som `check:known-symbols`) — kun NEW fejl ud over den baselined count fejler porten; skralde ned med `--update` når en allerede eksisterende fejl er rettet.                                                                                                                                                                                                                                                                     | Ja                                         |
| `check:build-typecheck`           | Hele-app produktionstype check over `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), overfladen `typecheck:core`'s tilladelsesliste med 27 filer og dashboard-porten dækker ikke. Forskelle mod `config/quality/build-typecheck-baseline.json`; et nyt eller hævet per-(fil, kode) tæller mislykkes, et lavere tæller beder dig om at ratchet. `--update` nægter, mens kørslen indeholder et nyt eller hævet par, medmindre `--force-regressions` er bestået, og nægter en nyligt dæmpet fil, medmindre `--force-nocheck` er bestået, så at udvide basislinjen for at blive grøn og give en permanent stilhed er to separate bevidste handlinger. En bar `--force` afvises. Scanner også build-omfanget for `@ts-nocheck` mod `config/quality/ts-nocheck-baseline.json`, fordi en fil, der bruger det, rapporterer ingen diagnostik overhovedet og ellers ville være usynlig for enhver gate. | Ja                                         |

#### To typecheck-programmer svarer forskelligt

`typecheck:core` og `check:build-typecheck` kompilerer forskellige programmer under forskellige muligheder, og den samme fil kan være ren i den ene og fuld af fejl i den anden.

`tsconfig.build.json` sætter `"strict": false`, så `noImplicitAny` er slået fra. Kernekonfigurationen kompilerer en kureret tilladelsesliste på 27 filer med strengere muligheder og følger hver posts importgraf, så filer, der aldrig vises i byggeprogrammet, bliver stadig tjekket der.

Konsekvensen har betydning, når man skal vurdere, om en fil er skrevet:** nul diagnostik under `check:build-typecheck` betyder ikke nul** . Fjernelse af `@ts-nocheck` fra 26 filer viste 23 af dem rene i byggeprogrammet; 16 af dem dukkede op omkring 120 implicitte fejl i den strenge. Kontroller begge, før du kalder en fil ren.

### Job: `quality-gate`

Løber efter `test-coverage`. Blokke smelter sammen ved fejl.

| Manuskript                   | Validerer                                                                                                                                                                     | Blokering                 |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | Udsender `quality-metrics.json` (antal ESLint -advarsler, dækning fra fusioneret shard-rapport)                                                                               | Ja (opstrøms for skralde) |
| `quality:ratchet`            | Hver metrik i `quality-baseline.json` er ikke gået tilbage (ESLint advarsler ≤ baseline; dækning ≥ baseline)                                                                  | Ja                        |
| `check:duplication`          | Kodeduplikering (jscpd@4) overstiger ikke baseline i `quality-baseline.json`                                                                                                  | Ja                        |
| `check:complexity`           | Cyklomatisk kompleksitet på filniveau overstiger ikke grænsen (kerne ESLint `complexity` + `max-lines-per-function`)                                                          | Ja                        |
| `check:cognitive-complexity` | Kognitiv kompleksitet ratchet (`eslint-plugin-sonarjs`) — separat ESLint pass; CI kører begge flettet som det enkelte `check:complexity-ratchets` trin                        | Ja                        |
| `check:dead-code`            | Ubrugte eksporter / filer ratchet (knip) går ikke tilbage i forhold til baseline                                                                                              | Ja                        |
| `check:compression-budget`   | Kompression benchmark budget — per-motor token-besparelsesgulve må ikke falde tilbage                                                                                         | Ja                        |
| `check:type-coverage`        | Procent-type skralde (`type-coverage`) går ikke tilbage; undertager stort set `typecheck:noimplicit:core`                                                                     | Ja                        |
| `check:codeql-ratchet`       | Antallet af åbne CodeQL -alarmer går ikke tilbage (læser via `gh api`; yndefuldt-spring over uden token) — opdateringskadence og manuel trigger: se "CodeQL ratchet" nedenfor | Ja                        |

### Job: `quality-extended`

Hele jobbet er rådgivende (`continue-on-error: true`). De npm-baserede skralder kører for alvor; de eksterne scannere installeres via `gh release download` og selv-spring (afslut 0), når en binær stadig er fraværende.

| Manuskript               | Validerer                                                                                                                                                                                                         | Blokering                                        |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `check:circular-deps`    | Ingen cirkulære afhængigheder (dpdm)                                                                                                                                                                              | **Rådgivende**                                   |
| `check:bundle-size`      | Bundens størrelse overstiger ikke hætten                                                                                                                                                                          | **Rådgivende**                                   |
| `check:secrets`          | Hemmelig scanning (gitleaks) — springer over, hvis binær fraværende                                                                                                                                               | **Rådgivende**                                   |
| `check:vuln-ratchet`     | Afhængighedssårbarheder (osv-scanner) regresserer ikke — `--ratchet` fejler som INCOMPLETE (afslut 2), hvis den ikke måles                                                                                        | **Rådgivende**                                   |
| `check:workflows`        | Workflow lint (actionlint + zizmor); missing/broken -scannere, ugyldige rapporter eller manglende ratchet-baseline mislykkes som INCOMPLETE. Gyldige resultater følger den valgte strict/advisory/ratchet politik | Udførelse påkrævet; zizmor skraldeblokering i CI |
| `check:openapi-breaking` | Offentlig API kontrakt mod fastgjorte hændelsesforpligtelser (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); påkrævet måling mislykkes lukket                             | **Blokering med --ratchet**                      |

### Job: `docs-sync-strict`

Kører på hver PR til `main`. Blokke smelter sammen ved fejl.

| Manuskript                     | Validerer                                                                                                                                       | Blokering                |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `check:docs-all`               | Meta-gate, der kører de 6 under-gates nedenfor sekventielt                                                                                      | Ja                       |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt version konsistens                                                                                                | Ja                       |
| ↳ `check:docs-counts`          | Optællinger i prosa (leverandørantal, migrationstal osv.) er inden for skraldevinduet for de rigtige optællinger                                | Ja                       |
| ↳ `check:env-doc-sync`         | Hver env var i `.env.example` er dokumenteret i en docs-tabel og omvendt                                                                        | Ja                       |
| ↳ `check:deprecated-versions`  | Ingen forældede versionsstrenge i dokumenter                                                                                                    | Ja                       |
| ↳ `check:doc-links`            | Interne markdown-links i dokumenter løses til rigtige filer (`[text]`/`(path)` -form)                                                           | Ja                       |
| ↳ `check:fabricated-docs`      | Ruter, env vars, CLI kommandoer, hook-navne og filstier citeret i dokumenter findes i kodebasen. Hård port via `--strict`; soft-fail uden flag. | Ja (via `--strict` i CI) |
| `check:cli-i18n`               | CLI kommandostrenge er til stede i alle i18n-lokalitetsfiler                                                                                    | Ja                       |
| `check:openapi-coverage`       | OpenAPI spec dækker mindst et skraldet gulv af rigtige ruter                                                                                    | Ja                       |
| `check:openapi-security-tiers` | Sikkerhedsniveauannoteringer i `openapi.yaml` er i overensstemmelse med `routeGuard.ts` klassifikationer                                        | **Rådgivende**           |
| `check:openapi-routes`         | Hver sti i `openapi.yaml` forvandles til en rigtig `route.ts` (anti-hallucination)                                                              | Ja                       |
| `check:docs-symbols`           | Hver `/api/...` reference i `docs/**/*.md` løses til en rigtig `route.ts` (anti-hallucination)                                                  | Ja                       |
| `i18n translation drift`       | Uoversatte nøgler i i18n-lokalitetsfiler — warn only                                                                                            | **Rådgivende**           |

De tolv README SVGs under `docs/diagrams/` genereres (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` regenererer dem alle). Hver har en byte-sammenligningsenhedstest (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`), der mislykkes, når den overførte fil er forældet, og `check:docs-counts` læser kanoniske tal fra deres `<text>` noder — hvilket er grunden til, at skitseringstrinnet holder hver skitseret streng i filen som usynlig `<text>`. SVG -kontrol med kanoniske tal læser filerne angivet i `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` og `tier-flow-light.svg`; påstandene om gratis for evigt, katalogindgang, tilbagevendende pulje og scoringsfaktorer læser også `promise-pillars.svg`, `free-tier-budget.svg` og `strategies-grid.svg`. `free-tier-budget.svg` trækker sine figurer fra live katalogindlæseren, så en ændring til `FREE_MODEL_BUDGETS` eller til en udbyders visningsnavn reds CI indtil filen er gendannet.

### Job: `i18n-ui-coverage`

| Manuskript                        | Validerer                                                                                                                                                                                           | Blokering      |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | UI i18n nøgledækning er ≥ 65 %                                                                                                                                                                      | Ja             |
| `check-ui-value-drift` (inline)   | Et omskrevet engelsk** værdi** efterlader ingen gammel oversættelse                                                                                                                                 | Ja             |
| `check-new-key-coverage` (inline) | EN** ny** Engelsk nøgle oversættes i hver lokalitet — en `__MISSING__:` -markør afvises                                                                                                             | Ja             |
| `check-translation-ratio`         | Real-oversættelsesforhold pr. lokalitet (identisk-til-engelsk / pladsholder / manglende blade uden for tilladelseslisten) må ikke overstige `config/quality/i18n-translation-baseline.json` + slack | **Rådgivende** |

Behøver `fetch-depth: 0` — værdi-drift gate diffs `en.json` mod merge base.

#### `check-ui-value-drift` — forældet-oversættelsesport

Fanger den ene i18n regression, som de andre porte strukturelt ikke kan se: en engelsk værdi omskrives, og oversættelserne afledt af det _forrige_ engelske bliver tilbage, så ikke-engelske brugere bliver ved med at læse selvsikkert formuleret, nu forkert kopi.

Dette blev sendt for alvor. `oauthModal.googleOAuthWarning` blev omskrevet, da Antigravity login-hjælperen landede (#5203);** 39 af 43 lokaliteter** beholdt tekst, der fortæller operatørerne at "kopiere den fulde URL og indsætte den nedenfor" — et flow, der ikke kan fuldføre for den pågældende udbyder. Det gik ubemærket indtil #8463 fordi:

- `sync-ui-keys` udfylder kun nøgler, der er** fraværende** , aldrig dem der er** forældet** ;
- `check-ui-keys-coverage` tæller nøglen _tilstedeværelse_, så en forældet oversættelse scorer som dækket;
- `check-translation-drift` sporer `docs/i18n/<locale>/**.md` -dokumentationen spejler — den læser aldrig `src/i18n/messages/*.json`. Blokering i job `docs-sync-strict` siden 2026-09 gensynkronisering: rediger et kernedokument → `npm run i18n:run -- --files=<doc>` (sektionsniveau, billigt).

**Diff-bevidst, ikke baseline-understøttet.** Den sammenligner `en.json` ved flettebasen med arbejdstræet; for hver nøgle, hvis engelske værdi er ændret, er enhver lokalitet, der stadig har en uberørt oversættelse, forældet. Dette bevidst** indefryser allerede eksisterende gæld** — a diff kan ikke afsløre, hvilket gammelt engelsk en mangeårig oversættelse kom fra, så porten bedømmer kun, hvad den aktuelle ændring berører. Alternativet (en per-nøgle hash-baseline) ville koste en ~ 600 KB -genereret fil, 3 × den største eksisterende baseline, der churning på hver i18n PR.

To måder at tilfredsstille det på:

1. opdatere de berørte oversættelser, eller
2. sæt dem til `__MISSING__:<new english>` — Runtime serverer derefter det korrigerede engelske (`src/i18n/request.ts::deepMergeFallback`, #7258) og nøglekøerne til oversættelse.

Hvis strengen er** mening** ændret, foretrækker** omdøbning af nøglen** : en ny nøgle kan ikke arve en gammel oversættelse. Det er det mønster, #8463 brugte.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Afslutter 0 med `SKIP reason=base-unresolved`, når basiskataloget ikke kan læses (overfladisk klon uden basisreferens), spejler `check-openapi-breaking`.

### Job: `i18n`

Fuld i18n-valideringsmatrix (et job pr. lokalitet). Hele jobbet er rådgivende.

| Manuskript                      | Validerer                              | Blokering                                                 |
| ------------------------------- | -------------------------------------- | --------------------------------------------------------- |
| `validate_translation.py quick` | Fuldstændig oversættelse pr. lokalitet | **Rådgivende** (`continue-on-error: true` på hele jobbet) |

### Job: `pr-test-policy`

Kører kun på pull-anmodninger.

| Manuskript             | Validerer                                                                                                                          | Blokering |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PRs, der ændrer produktionskode i `src/`, `open-sse/`, `electron/` eller `bin/` skal inkludere eller opdatere test (Hård regel #8) | Ja        |
| `check:test-masking`   | Ændrede testfiler reducerer ikke nettoansøgningen eller tilføjer `assert.ok(true)` tautologier                                     | Ja        |
| `check:pr-evidence`    | PR body citerer test/VPS beviser for ændringen (mekaniserer Hard Rule #18 ved at grepping PR prose — fragile, se Backlog)          | Ja        |

### Job: `test-vitest`

Løber efter `build`. Blokke smelter sammen ved fejl.

| Suite            | Validerer                                                    | Blokering                                                                                                       |
| ---------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 værktøjer), autoCombo, cache — vitest runner | Ja                                                                                                              |
| `test:vitest:ui` | UI komponent tester — vitest runner                          | **Blokering** — allerede eksisterende fejl er eksplicit udelukket i `vitest.config.ts`; nye fejl svigter jobbet |

### Natlige arbejdsgange (planlagt, rådgivende)

Disse kører på et cron-skema (og `workflow_dispatch`), aldrig på PRs. Alle er rådgivende.

| Arbejdsgang            | Validerer                                                                                                                                                  | Blokering      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | hurtig-tjek egenskabstest med et tilfældigt seed + højt antal                                                                                              | **Rådgivende** |
| `nightly-resilience`   | heap-growth gate, kaos fejl-injection, k6 load/soak                                                                                                        | **Rådgivende** |
| `nightly-llm-security` | promptfoo injektionsbeskyttelse (bloktilstand) + garak-sonder (sprunget over uden en udbyderhemmelighed)                                                   | **Rådgivende** |
| `nightly-schemathesis` | OpenAPI kontrakt fuzzing (skematese) mod en live OmniRoute ved hjælp af `docs/openapi.yaml` — overflader spec overtrædelser / uhåndteret 500s (Fase 8 B.4) | **Rådgivende** |
| `nightly-mutation`     | Stryker-mutationstestscore over den hurtige enhedsbane — overlevende mutanter overflade svage hævder                                                       | **Rådgivende** |
| `nightly-compat`       | Nodemotorkompatibilitetsmatrix på tværs af de understøttede `engines.node` -områder                                                                        | **Rådgivende** |

Præstationsbasislinjer (heap, TTFB, build-tid) registreres, ikke gated: se [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

## Tilladelseslistepolitik

Hver gate, der ikke kan fejle ved allerede eksisterende overtrædelser, bruger en fastfrosset tilladelsesliste (f.eks. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Politikken er:

**Løs årsagen; brug kun tilladelseslisten, når overtrædelsen allerede eksisterer og ikke kan rettes i samme PR.**

Når du tilføjer en post til en tilladelsesliste:

1. Inkluder en kommentar med begrundelsen.
2. Henvis til sporingsproblemet (f.eks. `// #3498 — Phase 2 feature, not yet implemented`).
3. Fjern posten i den samme PR, der retter overtrædelsen. — en forældet post, der ikke længere undertrykker en aktiv overtrædelse, er i sig selv en defekt (6A.3 forældet håndhævelse vil svigte porten på en forældreløs tilladelsesliste, når den er implementeret).

Gør** ikke** tilføje tilladelseslisteposter for at få testene til at bestå hurtigere. En grøn port med en voksende tilladelsesliste er en falsk følelse af kvalitet.

### Når en gate fejler på din PR

1. **Læs portens udgang omhyggeligt** — det fortæller dig præcis, hvilken fil eller symbol der overtrådte reglen.
2. **Ret overtrædelsen** — de fleste porte er deterministiske filsystemtjek, der passerer, så snart koden er korrekt.
3. **Hvis overtrædelsen er eksisterende** (dvs. du introducerede det ikke, men porten dækker det nu): Tilføj en tilladelsesliste med en begrundelseskommentar og et sporingsproblem.
4. **Hvis lågen er en skralde** (dækning, ESLint -advarsler, duplikering, kompleksitet): din ændring gjorde metrikken værre. Løs det underliggende problem, eller kør (sjældent) `npm run quality:ratchet -- --update` hvis ændringen er bevidst, og den metriske forringelse er acceptabel — men dokumentér hvorfor i PR beskrivelsen.
5. **Rådgivende porte** (`continue-on-error: true`) er informative —, de blokerer ikke fletning, men vises i CI oversigten. Reparer dem alligevel.

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

## Rationaliseringsefterslæb (ROI anmeldelse — Fase 9 Onda 3)

Denne opgørelse blev afstemt med `ci.yml` den 2026-06-17 (den tidligere version udelod `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence`). En ROI gennemgang af det afstemte sæt identificerede følgende rationaliseringskandidater.** Sammenlægningerne er mekaniske CI ændringer; flips/drops er politiske beslutninger forbeholdt operatøren.** Intet nedenfor er anvendt endnu.

**Også udokumenteret ovenfor** (rådgivende, lavt signal): `docs-lint` jobbet (markdownlint + Vale, hele jobbet `continue-on-error`) og de selvstændige scannerarbejdsgange `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` er i `quality-baseline.json`, men er ikke forbundet til en blokerende skralde i `ci.yml` — metrikken er i øjeblikket forældreløs.

### Merge / dedup (mekanisk, lavere risiko)

Hver kandidat blev valideret mod live gate-tilstanden 2026-06-17 (trust-but-verify); flere "åbenlyse" fusioner viste sig at skjule gæld og er** ikke** rene drop-ins.

- **`check:docs-sync` løber to gange** — standalone i `lint` jobbet og igen inde i `check:docs-all` (`docs-sync-strict`) og husky pre-commit hook. ✅**DONE** — selvstændig `lint` -invokation fjernet.
- **CVE scanning** — ❌**NOT en ren fusion.** `audit:deps` blokerer kritiske meddelelser og ufuldstændige revisioner på tværs af alle fem låsefiler, mens den rapporterer høje meddelelser som advarsler under den nuværende politik; `check:vuln-ratchet` (osv) fejler kun på en _regression_ i forhold til den indtjekkede baseline og afviser manglende målinger, når det kræves. Forskellige semantikker — at droppe `audit:deps` ville miste den absolut kritiske gate og de uafhængige pakke revisionskvitteringer. Behold begge dele.
- **Cyklus detektion** — ✅**DONE** (#15159 G-01/G-02). Den gamle tekst her kaldte `check:cycles` "den grønne, kurerede" gate og berettigede at holde den blokerende, fordi `check:circular-deps` (dpdm) rapporterede 91 cyklusser. Den grønne var en** falsk grøn** : `check:cycles` scannede 5 undermapper (450 filer), matchede kun statisk `import|export … from` og droppede hver `@/` og `@omniroute/open-sse/` specifikator, så den kunne ikke se de dynamiske importerede + -aliascyklusser, der dominerede repoen. Rettet: porten går nu `src` + `open-sse` (5023 filer), indsamler specifikationer fra TypeScript AST (så `import("…")` tæller og typeposition `typeof import("…")` gør det ikke), og løser tsconfig `paths`. Det finder** 14** cyklusser, ikke 0. Fordi 14 allerede eksisterende cyklusser ikke kan fikseres i en gate PR, er `check:cycles` nu en** skralde** (`--ratchet`, loft `metrics.cycles.value = 14` i `quality-baseline.json`, `direction: down`) — det blokerer enhver _regression_ og antallet kan kun falde. CI kører `npm run check:cycles:ratchet`. Nedbrændte ture med**A-01** . `check:circular-deps` (dpdm) forbliver rådgivende som den bredere second opinion.
- **Kompleksitet** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): en ESLint gang, tæller med ruleId, så cyklomatiske + max-linjer og kognitive basislinjer forbliver uafhængige; individuelle `check:complexity` / `check:cognitive-complexity` forbliver for lokale `--update`.
- **`/api` anti-hallucination** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): en FS opgørelse over `src/app/api`, openapi-ruter + docs-symboler rapporterer stadig uafhængigt; enkeltpersoner forbliver til lokale løb.
- **`check:node-runtime` kører i 11 jobs** — ⚠️** lav ROI.** Hver er en separat løber, og checken er < 1s; samlet besparelse ~ 10s, mod at miste en billig per-job vagt. Ikke det værd.
- **`typecheck:noimplicit:core` på CI lint** — ✅** fjernet fra fnugjobbet** (var rådgivende `continue-on-error`); blokerende overflade er `typecheck:core` + `check:type-coverage`. Lokalt script bibeholdt.

### Vend/beslut (operatørpolitik)

- `check:openapi-security-tiers` (rådgivende) — ❌**NOT kan vendes rent.** Den afslutter 0, men advarer om, at flere `traffic-inspector` ruter under `LOCAL_ONLY_API_PREFIXES` mangler `x-loopback-only: true` annotationen. Håndhævelse af det kræver først at tilføje disse annoteringer til `openapi.yaml`.
- `typecheck:noimplicit:core` (rådgivende) — stort set undergivet den blokerende `check:type-coverage` skralde. Vend til en skralde eller slip den overflødige anden `tsc` pas.
- `test:vitest:ui` (nu** blokering** ) — -eksisterende fejl er eksplicit udelukket i `vitest.config.ts` med `// #8618` sporingskommentarer; nye fejl svigter jobbet.
- `check:secrets` (gitleaks, blokering af skralde frosset ved 3 dokumenterede falske positive) — tilladelsesliste de 3 for at nå 0, eller degradere til rådgivende. Overlapper GitHub native secret-scanning + `check:public-creds`.
- `check:pr-evidence` (blokering, greps PR-body prosa) — høj falsk-positiv risiko; svækker håndhævelsen af Hard Rule #18, hvis den droppes, så dette er et ægte policy-opkald.
- `semgrep` (rådgivende selvstændig) — overlapper CodeQL for OWASP familierne; ledning sin basislinje til en skralde eller dråbe.

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
