# Quality Gates Reference (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Dette dokumentet er den autoritative referansen for alle CI-kvalitetsporter i OmniRoute.
Det beskriver hver port, hva den validerer, hvilken CI-jobb den kjører i, om den bruker
en ratchet-baseline eller en bestått/ikke bestått-policy, og om den blokkerer bygget eller kun er rådgivende.

For et kort sammendrag og policyen for tillatelseslisten, se delen "Quality Gates & Ratchets"
i `AGENTS.md`. For den kritiske vurderingen, modenhetsklassifiseringen og den verktøyagnostiske
replikeringsplanen for det samme systemet, se
[Håndbok for kvalitetsporter](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Portbeholdning og utførelsesprofiler

### Kandidatopptak

Arbeidsflytene CI og Quality Gates avgir hver sin stabile dom: `Gate / CI` og `Gate / Quality`. Deres versjonerte opptakspolicy oppregner hver oppstrømsjobb etter behov eller rådgivende. En aktuell påkrevd jobb må lykkes: manglende, kansellert, hoppet over, ventende og ukjente resultater kan ikke etablere PASS. En gyldig klassifisering kun for dokumenter eller kun katalog kan gjøre en kodefelt ubrukelig; et utkast til PR er ikke en akseptert kandidat. En `hotfix` etikett gir ikke avkall på bevis.

Begge arbeidsflytene dekker PRs til main/release grener, push til `main`, manuell sending og sammenslåingsgruppehendelser. Push, send og merge-group kjører hele utvalget. Pusher til `release/**` starter dem ikke (2026-10-18): hver endring har allerede kjørt matrisen på PR, og den sammenslåtte kombinasjonen er Release-Greens jobb (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks og sammenslåingsgrupper bruker vertsbaserte løpere for jobber som ellers velger selvvertsbaserte løpere; tilstrekkelig vertskapasitet må verifiseres før utrulling.

En vanlig PR kjører det raske utvalget. `full-code` og `full-code-e2e` banene til opptakspolicyen (E2E, integrering, pakkeartefakt, Electron smoke, Bun SQLite, økosystem- og protokollklienter) kjører bare på et Mergify-køutkast eller på en full kjøring: `gh workflow run ci.yml --ref <branch>`.

Hver JSON -kvittering identifiserer utsjekket SHA, arbeidsflytkjøring og forsøk. CLI avviser en checkout/event SHA mismatch. Arbeidsflyttester binder policymedlemskap til domsjobbens `needs` liste, slik at en ny eller fjernet bane ikke kan forsvinne stille. Kvitteringene dekker deres egen arbeidsflyt, ikke publisering, distribusjon eller interndelen av en eksisterende rådgivende skanner. Aktivering av begge sjekknavnene i grenreglene er en separat administrativ endring; å legge til disse jobbene beskytter ikke i seg selv en gren.

### Slå sammen kø

`queue` etiketten sender en PR til Mergify-køen (`.mergify.yml`). Mergify åpner et utkast til PR på en `mergify/merge-queue/` -gren, CI kjører hele utvalget der, og den originale PR smelter sammen når `Gate / CI`, `Gate / Quality` og `Merge integrity (changelog + generated skills)` passerer.

Mergify skriver køsammendraget i utkastets beskrivelse, og andre apper kan også redigere det. En `pull_request` `edited` -hendelse på et slikt utkast tar sin egen samtidighetsgruppe (`-queue-edit-<run_id>`) slik at det ikke kan avbryte utkastets virkelige løp, og det hopper over porten og matrisen. Bare `Merge integrity` kjører fortsatt. Den hoppede gate-jobben har et annet sjekknavn, fordi Mergify leser en hoppet over `Gate / CI` som en mislykket sjekk og setter PR.

Etter en dekø vil ikke et push alltid sette PR i kø. Kommenter `@mergifyio queue` på det.

### Beholdt bevis i akseptreduseringen

`scripts/quality/validate-release-acceptance.mjs` reduserer en levert plan og dens manifester; det fastslås ikke at planen dekker hele utslippsrørledningen. Rapportene angir eksplisitt `releaseAcceptance: false`, selv når planen er `VERIFIED`. `release-acceptance.yml` arbeidsflyten bruker fortsatt skyggearmaturer, ikke ekte bygge-, pakke-, oppstarts- eller kampanjekvitteringer.

CLI krever `--evidence-root` for å bekrefte beholdt bevis. Filer løses som `<evidence-root>/<artifact_id>/<member>` og hashes som SHA-256. En PASS -post uten bevis, en manglende eller endret fil, en usikker sti eller en symbolkobling forhindrer verifisering. Manglende filer tilsvarer ikke tomme vellykkede logger. Eksisterende SHA/run/attempt sjekker forblir uavhengige: samsvarende byte kan ikke redde en gammel kvittering. Filintegritet er ikke bevis på eksekveringsautentisitet eller artefaktpromotering.

### Inventar for statisk skanning

Den versjonerte npm-alias-beholdningen og medlemskapet for statisk skanning lever i `config/quality/gate-manifest.json`. Kjør `npm run check:gate-manifest` for å validere skriptnavn og eksakte kommandoer mot `package.json`; tillegg, fjerninger og kommandodrift feiler både den lokale kroken og endringsklassifiseringsjobbene i CI. Et alias er ikke en arbeidsflytjobb, matriseforekomst eller testtilfelle: disse tellingene må ikke presenteres som utskiftbare.

Bruk `npm run quality:scan -- --list` eller `npm run quality:scan:fast -- --list` for å inspisere de valgte aliasene uten å kjøre dem. Løperen påkaller npm-inngangspunktet, slik at kjøretiden (inkludert Bun der den er konfigurert) bevares. Manifestet registrerer aliaser utenfor disse profilene som separat påkalt, og vedlikeholdskommandoer er forbudt i skrivebeskyttede skanneprofiler.

Disse profilene dekker kun den statiske skanningen. De sertifiserer ikke produkttester, dekning, emballasje, eksterne kontroller eller en kandidats fulle utgivelsesgodkjennelse. Arbeidsflytopptak bruker de koblede `config/quality/admission-policy.json` og `scripts/quality/admission-verdict.mjs`. Utgivelsesobservatørprofiler forblir separate; inspisere gjeldende sjekker og kvitteringer uavhengig. Den fullstendige observatørens statiske kommandoer er deklarert i `config/quality/release-green-static-profile.json`, inkludert `audit:deps`, mutasjonstestvalg og translasjonssjekker. Lasteren validerer npm-kommandoer mot package.json og modellerte CI/Quality -deklarasjoner; den avviser drift i stedet for å utføre shell-tokens som argumenter. Nødvendig skanner SKIP/INCOMPLETE utgang kan ikke etablere PASS. Profilen registrerer eksterne ekskluderinger og erstatter ikke vertsbasert dekning, testmatriser, pakke- eller distribusjonsbevis. Prosainventaret nedenfor er en referanse, ikke et bevis på at en port faktisk gikk.

Skript lever under `scripts/check/` (policy porter) og `scripts/quality/` (ratchet engine). CI kilden til sannhet er `.github/workflows/ci.yml`.

### Slipp PR fast-path (`quality.yml`)

`.github/workflows/quality.yml` utfyller CI på main/release PRs, skyver til `main`, sender ut og slår sammen grupper. PRs bruker banefiltrerte hurtigsjekker. Det permanent deaktiverte duplikatbygget ble fjernet. de ekte build/package/boot -sjekkene forblir i CI. Enhetspakken og vitest kjører bare i CI (`Unit Tests (N/8)` og `Vitest`).

| Jobb                                             | Omfang                                                                                                           | Blokkering           |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs og docs-all                                                                         | Ja                   |
| `Fast Quality Gates`                             | Kode PRs; statiske sjekker, typesjekk, dashbordtypesjekk, berørte enhetstester, glemte søskentester (rådgivende) |
| `No new ESLint warnings`                         | Kode PRs; lobeskyttelse som er bevisst på undertrykkelse                                                         | Ja, inkludert gafler |
| `Merge integrity (changelog + generated skills)` | Ikke-utkast PRs; endringslogg og generert ferdighetssynkronisering                                               | Ja, inkludert gafler |

#### Glemt søskenprøverapport

`npm run check:forgotten-sibling-tests` kjører som et rådgivende trinn for `Fast Quality Gates` og gjenbruker importresolveren bak test-effektkartet. For hver endret produksjonsmodul rapporterer den deterministiske `changed module/symbol -> static consumer -> candidate sibling test` kjeder når kandidattesten er fraværende fra pull-request diff. Markdown-sammendraget og JSON resultatet beholdes som `forgotten-sibling-tests` arbeidsflytartefakten for kalibrering før blokkerende utrulling.

Reeksport av fat og dynamisk import er kun oppløsningsdiagnostikk; de skaper aldri et blokkerende funn. Anmeldte unntak lever i `config/quality/forgotten-sibling-allowlist.json`. Hver oppføring må navngi forbruker- og kandidattesten, gi en spesifikk begrunnelse og koble en GitHub problemstilling eller pull-forespørsel. Feilaktige oppføringer er ikke lukket. Unntak kan ikke undertrykke en slettet kandidattest eller en diff som legger til `.skip`/`.todo`; påstandssvekkelse og annen maskering forblir eid av den uavhengig blokkerende `check:test-masking` porten.

### Jobb: `lint`

Kjører på hver PR til `main`. Blokker smelter sammen ved feil.

| Skript (`npm run ...`)            | Validerer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Blokkering                                 |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Node.js -versjonen er innenfor det støttede området                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ja                                         |
| `check:cycles`                    | Sirkulær import over hele `src/` + `open-sse/` (AST-basert, tsconfig `paths` løst). Bare utganger 1 når en syklus eksisterer (fail-closed siden #15281) og viser SCCs. `check:cycles:ratchet` (hva CI kjører) blokkerer når antallet overstiger `metrics.cycles` -taket i `quality-baseline.json` — for øyeblikket 14, `direction: down`, så det kan bare falle (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja (skralle)                               |
| `check:boundary`                  | `open-sse → src` -kobling: unik fil-til-fil-import fra motoren til appen (`scripts/quality/measure-boundary.mjs`; kantlisten er v4 core/module-split utbedringsetterslepet). Bare = rådgivende rapport (samme som `quality:boundary`). `check:boundary:ratchet` (hva CI kjører, også i `quality.yml` fast-gates ratchet loop) blokkerer når tellingen overstiger `metrics.boundaryOpenSseToSrc` taket i `quality-baseline.json` — seedet ved målte 771, `direction: down`; `--update` bare senker den; base-relativ på PRs (`--base-ref`, se nedenfor)                                                                                                                                                                                                                                                                                                                                                                             | Ja (skralle)                               |
| `check:route-validation:t06`      | Zod skjemaer til stede på alle ruter (Tier 6-policy)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                         |
| `check:any-budget:t11`            | `@ts-expect-error // any` antallet overskrider ikke budsjettet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:provider-consistency`      | Hver leverandør i `providers.ts` har en matchende oppføring i `providerRegistry.ts` (og omvendt, innenfor tillatelseslisten)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ja                                         |
| `check:model-lifecycle`           | De tre håndholdte rutetabellene forblir konsistente med det innsjekkede livssyklus-øyeblikksbildet (#11503): `FITNESS_TABLE` (`taskFitness.ts`) scorer ingen pensjonert id som `REGISTRY` kan rute; hvert `BUILT_IN_ALIASES` mål er tilstede i `REGISTRY` og fraværende fra øyeblikksbildet med pensjonert ID; hver pensjonert id fortsatt i `REGISTRY` videresendes eller oppført i `allowedRetiredInCatalog`; og ingen `DEFAULT_DEGRADATION_MAP` kilde eller -mål ser ut til å være trukket tilbake i det øyeblikksbildet. Dette beviser ikke at en modell for øyeblikket betjenes av en direkte oppstrøms. Frakoblet — sammenlignes med `config/quality/model-lifecycle.json`, oppdatert for hånd med `npm run quality:refresh-model-lifecycle` (nettverk; ikke koblet til CI). `allowedRetiredInCatalog` er en nedbrent skralle: legg til en oppføring kun med et sporingsproblem.                                             | Ja                                         |
| `check:fetch-targets`             | Hver `fetch("/api/...")` i `src/` på klientsiden løses til en ekte `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja                                         |
| `check:deps`                      | Alle `npm install` -able deps over hver `package.json` i repoen er i `dependency-allowlist.json`; nye unpinned eller slopsquatted pakker flagget                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `audit:deps`                      | npm revisjon av alle fem uavhengige låsefiler (root, Electron, OpenCode plugins v1/v2 og leverandør). Kritisk rådgivende blokk; høye advarsler forblir synlige advarsler. Missing/failed revisjoner er INCOMPLETE og block; per-scope låsehasher og rapporter beholdes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                         |
| `check:lockfile`                  | `package-lock.json` integritet — https-register, integritets-hasher, ingen vertsoverstyringer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja                                         |
| `check:licenses`                  | SPDX -lisensgodkjenningsliste for produksjonsavhengigheter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                         |
| `check:tracked-artifacts`         | Ingen byggeartefakter / committerte `node_modules` symlinks (kjører også i husky pre-commit; pre-push er med vilje lett — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:ai-attribution`            | Ingen AI/bot `Co-Authored-By` trailer eller AI-generasjons bunntekst i PR commits, tittel eller body — Hard Rule #16 `commit-msg` i `quality.yml` fast-gates `main` løkken for PR→ `release/**` — leser hendelsesnyttelasten, no-op off PRs — og et PR-bare trinn i `ci.yml` PR den menneskelige →; medforfattere #14436;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:vitest-exclusions`         | Hver Vitest -ekskludering navngir et sporingsproblem og vises i `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:file-size`                 | Kildefiler (`.ts`/`.tsx` i `src/`, `open-sse/`, `electron/`, `bin/`) holder seg innenfor `cap` og testfiler (`*.test.ts(x)`) innenfor `testCap`; filer frosset i `file-size-baseline.json` (`frozen` / `testFrozen`) må ikke vokse forbi den registrerte størrelsen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ja                                         |
| `check:error-helper`              | Feilsvar i executors/handlers bruker `buildErrorBody()` / `sanitizeErrorMessage()` (hard regel #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ja                                         |
| `check:migration-numbering`       | Migrering SQL -filer er sekvensielt nummererte, ingen hull eller duplikater                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                         |
| `check:public-creds`              | Ingen bokstavelige OAuth `client_id`/`client_secret` eller Firebase Web-nøkler utenfor `publicCreds.ts` (hard regel #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                         |
| `check:db-rules`                  | Ingen rå SQL utenfor `src/lib/db/` moduler; ingen fat-import fra `localDb.ts` (harde regler #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                         |
| `check:known-symbols`             | Leverandørutøvere, rutingstrategier og oversettere registrert i ekspedisjonstabellene deres samsvarer med filene på disken — ingen foreldreløse eller uerklærte symboler                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                         |
| `check:route-guard-membership`    | Hver rute som skaper en barneprosess er klassifisert etter `isLocalOnlyPath()` (harde regler #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ja                                         |
| `check:test-discovery`            | Hver `*.test.ts` / `*.spec.ts` -fil i repoen samles inn av minst én testløper (ratchet: foreldreløse liste i `test-discovery-baseline.json` kan bare krympe)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ja                                         |
| `check:test-tla-order`            | Ingen `node:test` fil under `tests/unit` registrerer en test, treffer en `await` på toppnivå, og registrerer deretter mer (#18045; ratchet: `test-tla-order-allowlist.json` kan bare krympe)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ja                                         |
| `check:agent-skills-sync`         | Genererte artefakter med agentferdigheter samsvarer med kildekatalogen deres (ingen drift)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:provider-asset-provenance` | Leverandøren logos/assets har en registrert herkomstoppføring                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `lint:json`                       | JSON config-filer analyserer og tilfredsstiller repo lint-reglene                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `typecheck:core`                  | TypeScript -kompilering uten feil (kun rådgivende advarsler)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ja                                         |
| `typecheck:noimplicit:core`       | Strenge `noImplicitAny` — fremtidsrettet; mange eksisterende samtalesider trenger fortsatt merknader                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | **Rådgivende** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` scoped to `src/app/(dashboard)/**` (#7033) — `typecheck:core` kuraterte 27-filer tillatelsesliste inkluderer ikke noen dashboard TSX, og `next build` typesjekker den heller aldri (`next.config.mjs` setter `ignoreBuildErrors: true`), så foreldreløse identifikatorregresjoner der (#6625/#6909) var usynlige for CI. Forskjeller mot en frossen per-file/per-TS-code telling baseline (`config/quality/dashboard-typecheck-baseline.json`, samme foreldede håndhevingsmønster som `check:known-symbols`) — bare NEW feil utover den baselinede tellingen mislykkes i porten; ratched ned med `--update` når en allerede eksisterende feil er rettet.                                                                                                                                                                                                                                                                     | Ja                                         |
| `check:build-typecheck`           | Produksjonstype for hele apper over `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), overflaten `typecheck:core` 27-filer godkjenningsliste og dashbordporten dekker ikke. Forskjeller mot `config/quality/build-typecheck-baseline.json`; en ny eller hevet per-(fil, kode) telling mislykkes, en lavere telling ber deg om å ratchet. `--update` nekter mens kjøringen inneholder et nytt eller hevet par med mindre `--force-regressions` er bestått, og nekter en nylig stanset fil med mindre `--force-nocheck` er bestått, så å utvide grunnlinjen for å bli grønn og gi en permanent stillhet er to separate bevisste handlinger. En bar `--force` avvises. Skanner også byggeomfanget for `@ts-nocheck` mot `config/quality/ts-nocheck-baseline.json`, fordi en fil som bruker det rapporterer ingen diagnostikk i det hele tatt og ellers ville være usynlig for hver gate. | Ja                                         |

#### To typesjekk-programmer svarer forskjellig

`typecheck:core` og `check:build-typecheck` kompilerer forskjellige programmer under forskjellige alternativer, og den samme filen kan være ren i den ene og full av feil i den andre.

`tsconfig.build.json` setter `"strict": false`, så `noImplicitAny` er av. Kjernekonfigurasjonen kompilerer en kurert 27-filers godkjenningsliste med strengere alternativer og følger hver oppførings importgraf, så filer som aldri vises i byggeprogrammet blir fortsatt sjekket der.

Konsekvensen er viktig når man skal vurdere om en fil er skrevet:** null diagnostikk under `check:build-typecheck` betyr ikke null** . Fjerning av `@ts-nocheck` fra 26 filer viste at 23 av dem var rene i byggeprogrammet; seksten av dem dukket opp rundt 120 implisitte feil i den strenge. Sjekk begge før du kaller en fil ren.

### Jobb: `quality-gate`

Løper etter `test-coverage`. Blokker smelter sammen ved feil.

| Manus                        | Validerer                                                                                                                                                          | Blokkering                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `quality:collect`            | Sender ut `quality-metrics.json` (antall ESLint -varsler, dekning fra sammenslått shard-rapport)                                                                   | Ja (oppstrøms for skralle) |
| `quality:ratchet`            | Hver beregning i `quality-baseline.json` har ikke gått tilbake (ESLint advarsler ≤ baseline; dekning ≥ baseline)                                                   | Ja                         |
| `check:duplication`          | Kodeduplisering (jscpd@4) overskrider ikke baseline i `quality-baseline.json`                                                                                      | Ja                         |
| `check:complexity`           | Syklomatisk kompleksitet på filnivå overskrider ikke grensen (kjerne ESLint `complexity` + `max-lines-per-function`)                                               | Ja                         |
| `check:cognitive-complexity` | Kognitiv kompleksitet skralle (`eslint-plugin-sonarjs`) — separat ESLint pass; CI kjører begge sammenslått som enkelt `check:complexity-ratchets` trinn            | Ja                         |
| `check:dead-code`            | Ubrukte eksporter / filer ratchet (knip) regresserer ikke vs grunnlinje                                                                                            | Ja                         |
| `check:compression-budget`   | Komprimeringsreferansebudsjett — per-motor token-sparegulv må ikke gå tilbake                                                                                      | Ja                         |
| `check:type-coverage`        | Prosentskreven skralle (`type-coverage`) går ikke tilbake; subsumerer i stor grad `typecheck:noimplicit:core`                                                      | Ja                         |
| `check:codeql-ratchet`       | Antall åpne CodeQL -varsler regresserer ikke (leser via `gh api`; grasiøst-hopp uten token) — -oppdateringskadens og manuell utløser: se "CodeQL ratchet" nedenfor | Ja                         |

### Jobb: `quality-extended`

Hele jobben er rådgivende (`continue-on-error: true`). De npm-baserte skrallene kjører på ekte; de eksterne skannerne installeres via `gh release download` og selvhopp (avslutt 0) når en binær er fortsatt fraværende.

| Manus                    | Validerer                                                                                                                                                                                                       | Blokkering                                      |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `check:circular-deps`    | Ingen sirkulære avhengigheter (dpdm)                                                                                                                                                                            | **Rådgivende**                                  |
| `check:bundle-size`      | Buntens størrelse overskrider ikke hetten                                                                                                                                                                       | **Rådgivende**                                  |
| `check:secrets`          | Hemmelig skanning (gitleaks) — hopper over hvis binær fraværende                                                                                                                                                | **Rådgivende**                                  |
| `check:vuln-ratchet`     | Avhengighetssårbarheter (osv-skanner) regresserer ikke — `--ratchet` mislykkes som INCOMPLETE (avslutt 2) hvis den ikke måles                                                                                   | **Rådgivende**                                  |
| `check:workflows`        | Arbeidsflyt-lo (actionlint + zizmor); missing/broken -skannere, ugyldige rapporter eller manglende ratchet-grunnlinje mislykkes som INCOMPLETE. Gyldige funn følger den valgte strict/advisory/ratchet policyen | Utførelse kreves; zizmor skralleblokkering i CI |
| `check:openapi-breaking` | Offentlig API kontrakt mot festede hendelsesforpliktelser (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); nødvendig måling mislykkes lukket                             | **Blokkering med --ratchet**                    |

### Jobb: `docs-sync-strict`

Kjører på hver PR til `main`. Blokker smelter sammen ved feil.

| Manus                          | Validerer                                                                                                                                     | Blokkering               |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `check:docs-all`               | Meta-gate som kjører de 6 underportene under sekvensielt                                                                                      | Ja                       |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt versjonskonsistens                                                                                              | Ja                       |
| ↳ `check:docs-counts`          | Tellinger i prosa (tilbyderantall, migrasjonstelling osv.) er innenfor skrallvinduet til de virkelige tellingene                              | Ja                       |
| ↳ `check:env-doc-sync`         | Hver env var i `.env.example` er dokumentert i en dokumenttabell, og omvendt                                                                  | Ja                       |
| ↳ `check:deprecated-versions`  | Ingen utdaterte versjonsstrenger i dokumenter                                                                                                 | Ja                       |
| ↳ `check:doc-links`            | Interne markdown-lenker i dokumenter løses til ekte filer (`[text]`/`(path)` -skjema)                                                         | Ja                       |
| ↳ `check:fabricated-docs`      | Ruter, env vars, CLI kommandoer, kroknavn og filstier sitert i dokumenter finnes i kodebasen. Hard gate via `--strict`; soft-fail uten flagg. | Ja (via `--strict` i CI) |
| `check:cli-i18n`               | CLI kommandostrenger er til stede i alle i18n-lokalefiler                                                                                     | Ja                       |
| `check:openapi-coverage`       | OpenAPI -spesifikasjonen dekker minst et skraltegulv av ekte ruter                                                                            | Ja                       |
| `check:openapi-security-tiers` | Sikkerhetsnivåkommentarer i `openapi.yaml` er i samsvar med `routeGuard.ts` -klassifiseringer                                                 | **Rådgivende**           |
| `check:openapi-routes`         | Hver sti i `openapi.yaml` løses til en ekte `route.ts` (anti-hallusinasjon)                                                                   | Ja                       |
| `check:docs-symbols`           | Hver `/api/...` -referanse i `docs/**/*.md` løses til en ekte `route.ts` (anti-hallusinasjon)                                                 | Ja                       |
| `i18n translation drift`       | Uoversatte nøkler i i18n-lokalitetsfiler — warn only                                                                                          | **Rådgivende**           |

De tolv README SVGs under `docs/diagrams/` genereres (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` regenererer dem alle). Hver har en byte-sammenligningsenhetstest (`tests/unit/docs/readme-*-svg.test.ts`, jobb `test-unit`) som mislykkes når den forpliktede filen er foreldet, og `check:docs-counts` leser kanoniske tall fra deres `<text>` noder — som er grunnen til at skisseringstrinnet holder hver skisserte streng i filen som usynlig `<text>`. SVG kanoniske tall-sjekken leser filene oppført i `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, pluss `public/images/tier-flow-dark.svg` og `tier-flow-light.svg`; påstandene om gratis-for alltid, katalogoppføring, gjentakende pulje og scoringsfaktorer er også `promise-pillars.svg`, `free-tier-budget.svg` og `strategies-grid.svg`. `free-tier-budget.svg` henter tallene sine fra den levende kataloglasteren, så en endring til `FREE_MODEL_BUDGETS` eller til en leverandørs visningsnavn røde CI til den filen er regenerert.

### Jobb: `i18n-ui-coverage`

| Manus                             | Validerer                                                                                                                                                                                            | Blokkering     |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | UI i18n nøkkeldekning er ≥ 65 %                                                                                                                                                                      | Ja             |
| `check-ui-value-drift` (inline)   | En omskrevet engelsk** verdi** etterlater ingen gammel oversettelse                                                                                                                                  | Ja             |
| `check-new-key-coverage` (inline) | EN** ny** Engelsk nøkkel oversettes i hver lokalitet — en `__MISSING__:` -markør blir avvist                                                                                                         | Ja             |
| `check-translation-ratio`         | Real-oversettelsesforhold per lokalitet (identisk-til-engelsk / plassholder / manglende blader utenfor godkjenningslisten) må ikke overstige `config/quality/i18n-translation-baseline.json` + slakk | **Rådgivende** |

Trenger `fetch-depth: 0` — verdidriftporten differer `en.json` mot flettebasen.

#### `check-ui-value-drift` — foreldet-oversettelsesport

Fanger den ene i18n-regresjonen som de andre portene strukturelt ikke kan se: en engelsk verdi skrives om og oversettelsene avledet fra den _forrige_ engelsken blir igjen, så ikke-engelske brukere fortsetter å lese selvsikkert formulert, nå feil kopi.

Dette ble sendt på ekte. `oauthModal.googleOAuthWarning` ble skrevet om da Antigravity -påloggingshjelperen landet (#5203);** 39 av 43 lokaliteter** holdt tekst som forteller operatørene om å "kopiere hele URL og lime den inn under" — en flyt som ikke kan fullføres for den leverandøren. Det gikk ubemerket frem til #8463 fordi:

- `sync-ui-keys` fyller bare nøkler som er** fraværende** , aldri de som er det** foreldet** ;
- `check-ui-keys-coverage` teller nøkkelen _tilstedeværelse_, så en foreldet oversettelse scorer som dekket;
- `check-translation-drift` sporer `docs/i18n/<locale>/**.md` -dokumentasjonen speiler — den leser aldri `src/i18n/messages/*.json`. Blokkering i jobb `docs-sync-strict` siden 2026-09 re-synkronisering: rediger et kjernedokument → `npm run i18n:run -- --files=<doc>` (seksjonsnivå, billig).

**Diff-bevisst, ikke baseline-støttet.** Den sammenligner `en.json` ved flettebasen med arbeidstreet; for hver nøkkel hvis engelske verdi er endret, er enhver lokalitet som fortsatt har en uberørt oversettelse foreldet. Dette med vilje** fryser eksisterende gjeld** — a diff kan ikke avsløre hvilken gammel engelsk en langvarig oversettelse kom fra, så porten bedømmer bare hva den nåværende endringen berører. Alternativet (en per-nøkkel-hash-grunnlinje) vil koste en ~ 600 KB -generert fil, 3 × den største eksisterende grunnlinjen, som churning på hver i18n PR.

To måter å tilfredsstille det på:

1. oppdatere de berørte oversettelsene, eller
2. sett dem til `__MISSING__:<new english>` — kjøretiden serverer deretter den korrigerte engelsken (`src/i18n/request.ts::deepMergeFallback`, #7258) og nøkkelkøene for oversettelse.

Hvis strengen er** betydning** endret, foretrekker** gi nytt navn til nøkkelen** : en ny nøkkel kan ikke arve en gammel oversettelse. Det er mønsteret #8463 brukte.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Avslutter 0 med `SKIP reason=base-unresolved` når basiskatalogen ikke kan leses (grunn klone uten baseref), speiler `check-openapi-breaking`.

### Jobb: `i18n`

Full i18n-valideringsmatrise (én jobb per lokalitet). Hele jobben er rådgivende.

| Manus                           | Validerer                              | Blokkering                                                |
| ------------------------------- | -------------------------------------- | --------------------------------------------------------- |
| `validate_translation.py quick` | Fullstendig oversettelse per lokalitet | **Rådgivende** (`continue-on-error: true` på hele jobben) |

### Jobb: `pr-test-policy`

Kjører kun på pull-forespørsler.

| Manus                  | Validerer                                                                                                                          | Blokkering |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PRs som endrer produksjonskode i `src/`, `open-sse/`, `electron/` eller `bin/` må inkludere eller oppdatere tester (hard regel #8) | Ja         |
| `check:test-masking`   | Endrede testfiler reduserer ikke netto påstandsantallet eller legger til `assert.ok(true)` tautologier                             | Ja         |
| `check:pr-evidence`    | PR body siterer test/VPS bevis for endringen (mekaniserer Hard Rule #18 ved å grepping PR prose — fragile, se Backlog)             | Ja         |

### Jobb: `test-vitest`

Løper etter `build`. Blokker smelter sammen ved feil.

| Suite            | Validerer                                                  | Blokkering                                                                                                |
| ---------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 verktøy), autoCombo, cache — vitest runner | Ja                                                                                                        |
| `test:vitest:ui` | UI komponent tester — vitest runner                        | **Blokkering** — eksisterende feil er eksplisitt ekskludert i `vitest.config.ts`; nye feil svikter jobben |

### Nattlige arbeidsflyter (planlagt, rådgivende)

Disse kjører på en cron-plan (og `workflow_dispatch`), aldri på PRs. Alle er rådgivende.

| Arbeidsflyt            | Validerer                                                                                                                                                  | Blokkering     |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | rask sjekk egenskapstester med et tilfeldig frø + høyt antall                                                                                              | **Rådgivende** |
| `nightly-resilience`   | haugvekstport, kaosfeilinjeksjon, k6 load/soak                                                                                                             | **Rådgivende** |
| `nightly-llm-security` | promptfoo injeksjonsvakt (blokkeringsmodus) + garak-sonder (hoppet over uten en leverandørhemmelighet)                                                     | **Rådgivende** |
| `nightly-schemathesis` | OpenAPI kontrakt fuzzing (skjematese) mot en live OmniRoute ved bruk av `docs/openapi.yaml` — overflater spesifikasjonsbrudd / uhåndtert 500s (Fase 8 B.4) | **Rådgivende** |
| `nightly-mutation`     | Stryker mutasjonstesting score over den raske enhetsbanen — overlevende mutanter overflate svake påstander                                                 | **Rådgivende** |
| `nightly-compat`       | Nodemotorkompatibilitetsmatrise på tvers av de støttede `engines.node` områdene                                                                            | **Rådgivende** |

Ytelsesgrunnlinjer (heap, TTFB, byggetid) registreres, ikke gated: se [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Hastighetsfase (2026-08-30 → v4.0 LTS): alle referansegrenser lempet med 20 %

Beslutning fra eier (2026-08-30): Frem til modulariseringen i v4.0 er leveringshastighet viktigere
enn å holde teknisk gjeld i sjakk. Alle **numeriske** referansegrenser for skrallemekanismen ble lempet med 20 % i én
reviderbar operasjon, og fasen er angitt i `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Hva ble endret                                                                                                                                                                                                          | Hvor                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — antall der lavere er bedre ×1,2, prosentandeler der høyere er bedre ÷1,2 (dekningsgulvet på 60 beholdt, `eslintErrors` forblir 0, `eslintWarnings` 0 → 20 % av det fryste antallet undertrykkelser) | `quality-baseline.json` (`_relax_velocity_2026_08_30`-merknaden viser alle før → etter)                |
| `count` ×1,2 / `percentage` ×1,2                                                                                                                                                                                        | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, alle linjegrenser i `frozen[*]` / `testFrozen[*]` ×1,2                                                                                                                                                | `file-size-baseline.json`                                                                              |
| antall per fil / per TS-kode ×1,2                                                                                                                                                                                       | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                     | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` blir veiledende mens `_policy.requireTighten === false`                                                                                                                                             | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| nattlig `bank-ratchet-shrinks` settes på pause (den ville ha registrert den målte reduksjonen og fjernet slingringsmonnet)                                                                                              | `.github/workflows/nightly-release-green.yml`                                                          |

Tillatelseslister (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) er **ikke** budsjetter og ble ikke endret. Bestått/ikke bestått-policykontroller (hemmeligheter, SQL-regler,
dokumentasjons-/miljøkontrakt, i18n-samsvar, enhetstester) er uendret — en rød test er fortsatt en rød test.

**Verktøy**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` —
  engangslempingen (`scripts/quality/relax-baselines.mjs`); nekter å kjøre to ganger med samme
  merknad.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  måler alle numeriske kontrollpunkter på samme måte som CI gjør, og skriver ut gjenværende slingringsmonn per kontrollpunkt
  (`scripts/quality/baseline-headroom.mjs`). Den nattlige `baseline-headroom`-jobben publiserer
  tabellen i sammendraget for arbeidsflytkjøringen og laster opp JSON-/Markdown-rapporten som
  `baseline-headroom-<run_id>`, med 90 dagers oppbevaring. Rader med advarsler og kritisk status identifiserer kontrollpunkter
  som er innenfor 10 % av grensen sin eller allerede har overskredet den. Bruk disse rapportene som tidlig varsling om
  budsjetter som blir brukt opp; undersøk `_rebaseline_*`-merknadene for det aktuelle kontrollpunktet. Jobben
  oppretter eller oppdaterer ikke lenger en permanent sak; #12149 bevarer den tidligere rapporthistorikken.

**Modus for ny kode (Clean-as-You-Code) — siden 2026-08-30, bare hurtigløp for PR-er**

Ved `pull_request`-hendelser sender `quality.yml` `--base-ref <PR base SHA>` til `check:file-size`,
`check:complexity-ratchets` og `check:dead-code`. For `check:complexity-ratchets` og
`check:dead-code` sammenligner kontrollpunktet HEAD med flettebasen, **begrenset til filene PR-en
endret** (`scripts/check/newCodeMode.mjs`: flettebasen materialiseres i et midlertidig
`git worktree`, ESLint/knip kjøres der og på HEAD, og antall per fil differanseberegnes):

- **blokkerende** — PR-en la til syklomatiske/kognitive brudd eller døde eksporter i filer den endret
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` i loggen);
- **veiledende** — global totalverdi sammenlignet med den fryste referanseverdien. Arvet avvik gjør aldri en
  uskyldig PR rød; avviket fryses på nytt ved avstemmingen for utgivelsen og overvåkes av slingringsmonnjobben.

`check:file-size` bruker basereferansen på sine egne vilkår (`scripts/check/check-file-size.mjs`, #8522):
Den kontrollerer alle kilde- og testfiler i treet, leser linjeantallet for hver fil ved PR-basen
med `git show`, og lar en fil feile bare når den vokser forbi den største av referansegrensen
(`frozen` / `testFrozen`, eller `cap` / `testCap` for en fil utenfor referansegrunnlaget) og filens
størrelse i basen. En fil som allerede hadde avvik i basen, gjør derfor aldri en uskyldig PR rød.

`check:boundary:ratchet` bruker samme regel på sitt ene tall
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): Ved PR-hendelser sender både
hurtigportene i `quality.yml` og lint-jobben i `ci.yml` inn SHA-en til PR-ens base. Base-commiten
måles fra en `git archive`-eksport, og PR-en feiler bare når antallet `open-sse → src`-kanter
overstiger den høyeste verdien av `metrics.boundaryOpenSseToSrc` og antallet i basen. Avvik i
basen over taket rapporteres (`base drift herdado`), men gjør aldri en uskyldig PR rød; push → main
beholder det absolutte taket, og en base-SHA som ikke kan løses, faller tilbake til dette med en advarsel.

`workflow_dispatch`-kjøringer, den grønne utgivelseskontrollen og den nattlige marginjobben har ingen PR-base
og beholder den absolutte (globale) sammenligningen. Dekning, duplisering og typedekning forblir globale
foreløpig (verktøyene deres produserer ikke en diff per fil på en rimelig måte) — kandidater for samme behandling.

**Avslutte fasen ved v4.0 (LTS = strammere enn før, ikke «tilbake til normalen»)**

1. På det rene `release/v4.0.0`-toppunktet: `npm run quality:headroom --json` for protokollen, deretter
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, samt `--update` for hver typecheck-port
   — alle referanseverdier senkes til den målte verdien.
2. Slett `_policy` fra `quality-baseline.json` (aktiverer `--require-tighten` og den nattlige
   oppsamlingen på nytt), og gjenopprett `THRESHOLD = 36` (eller høyere) i `check-openapi-coverage.mjs`.
3. Stram inn utover de målte verdiene der modulariseringen ga gevinst: sett filstørrelsens `cap` tilbake til 1000
   (eller 800), øk minimumskravene til dekning med 5, og sett døde eksporter til 0 for de modulariserte pakkene.

## Ratchet Baseline (`quality-baseline.json`)

Skrallemotoren (`scripts/quality/check-quality-ratchet.mjs`) leser `quality-baseline.json` og sammenligner den med den nylig innsamlede `quality-metrics.json`. Enhver beregning som går tilbake utover epsilonen mislykkes i byggingen.

Gjeldende sporede beregninger:

| Metrisk               | Retning | Betydning                               |
| --------------------- | ------- | --------------------------------------- |
| `eslintWarnings`      | `down`  | Antallet ESLint advarsler må ikke vokse |
| `coverage.statements` | `up`    | Uttalelsesdekningen må ikke falle       |
| `coverage.lines`      | `up`    | Linjedekning må ikke falle              |
| `coverage.functions`  | `up`    | Funksjonsdekningen må ikke falle        |
| `coverage.branches`   | `up`    | Filialdekning må ikke falle             |

Slik oppdaterer du grunnlinjen etter en reell forbedring:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` flagget skriver gjeldende målte verdier inn i `quality-baseline.json`. Overfør denne filen sammen med endringen som forbedret beregningen. En PR som forbedrer en beregning uten å oppdatere grunnlinjen vil bli fanget opp av `--require-tighten` (Fase 6A.5, venter på implementering).

### CodeQL ratchet: oppdater tråkkfrekvens og manuell trigger

`check:codeql-ratchet` leser** repo-tilstand, oppdatert på en tidsplan — ikke per PR.** `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` rapporterer `state: configured`, `schedule: weekly`: GitHub standardoppsettskanning, ikke en per-push-analyse. Konsekvens: etter at en PR som FIXES -varsler smelter sammen, fortsetter ratchet å lese det gamle, høyere antallet til neste planlagte skanning kjører — slik at det rapporterer en regresjon på hver åpne PR, inkludert fiksingen av PR sine egne oppfølginger, til skanningen fanger opp.

**Manuell oppdatering** : `gh workflow run codeql.yml --ref release/vX.Y.Z` kjører analysen på nytt og publiserer varsler på nytt i løpet av minutter. Les `.github/workflows/codeql.yml` først — dens overskrift forklarer at det er `workflow_dispatch` -only** fordi det er i konflikt med GitHub"standardoppsett"** (`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`). Gjenoppretting av `push`/`pull_request`/ `schedule` -utløsere krever en** eier handling først** : Innstillinger → Kodesikkerhet → CodeQL: Standard → Advanced. Ikke legg til en `schedule:` -utløser uten den bryteren — den vil bare produsere mislykkede kjøringer.

**Stram grunnlinjen etter at tellingen synker** — `node scripts/check/check-codeql-ratchet.mjs --update` skriver det nye målte antallet inn i `quality-baseline.json` → `metrics.codeqlAlerts.value`, så skralleen tillater ikke stille en regresjon tilbake til det gamle taket. Arbeidseksempel (2026-09-02/03): PR #12502 fikset 7 reelle varsler (13 → 6 målt åpne); PR #12530 strammet den frosne grunnlinjen 11 → 6 for å matche; de resterende 6 ble deretter avvist med begrunnelse per varsling ned til 0 åpen.

**Oppsigelser er operatørens oppfordring (Hard Rule #14)** — avviser aldri et CodeQL varsel uten å registrere den tekniske begrunnelsen i avvisningskommentaren: `won't fix` for et oppstrømsprotokollkrav, `used in tests` for en testarmatur, `false positive` for en desinficeringsmiddel CodeQL ikke kan se (presedens: `docs/security/ERROR_SANITIZATION.md`).

---

## Retningslinjer for nye testforsøk (WS5.4, v3.8.49)

Nye forsøk konfigureres per testkjører, aldri som en global standard — et generelt nytt forsøk gjør reelle regresjoner
til usynlige sporadiske feil:

| Testkjører        | Retningslinje                                                                                                                     | Hvorfor                                                                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e)  | `retries: 1` kun i CI, med `trace: on-first-retry`                                                                                | Nettleser-/nettverkstiming er genuint ikke-deterministisk; ett nytt forsøk med sporing gjør en sporadisk feil til en diagnostiserbar artefakt |
| Vitest            | INGEN globale nye forsøk. En bekreftet ustabil test får et eksplisitt nytt forsøk per test (synlig i diffen, gjennomgått i PR-en) | Holder karantenelisten i repoet, aldri ugjennomsiktig                                                                                         |
| node:test (enhet) | INGEN nye forsøk, noensinne                                                                                                       | En ustabil enhetstest er en feil i testen — rett den, ikke kjør den på nytt                                                                   |

Mål-SLO-er når telemetri for sporadiske feil er på plass (WS5.2/5.3): <1 % forekomst av sporadiske feil per test
(terskel for «rett nå»), ≥95 % beståttandel per pipeline. Referanseverdier fra bransjen —
kalibrer på nytt mot våre egne målinger.

## Ratchet-avvik på utgivelsesnivå (WS5.5, v3.8.49)

Når en ratchet (filstørrelse, kompleksitet, eslint-advarsler) regresserer på den RENE utgivelsestuppen
— det vil si at KOMBINASJONEN av sammenslåinger førte til regresjonen, og ingen enkelt PR gjenskaper
regresjonen på sin egen gren — tilhører rettingen **utgivelsesansvarlig, én gang, på
utgivelsesgrenen**: foretrekk utskilling/refaktorering; oppdater bare referansenivået med den dokumenterte
begrunnelsesoppføringen. Skyv aldri kombinasjonsavvik over på en bidragsyters PR, og oppdater aldri
referansenivået per PR (det skjuler reelle regresjoner). Skill først mellom årsakene: gjenskap
feilen mot den rene tuppen i et test-worktree før du antar at PR-en din forårsaket den.

## Lagring av ratchet-reduksjoner — den nedadgående retningen (#8584)

Ratchet-mekanismen er bare halvautomatisk, og det er feil halvdel. Å **heve** en grense er en
manuell JSON-redigering som tar ti sekunder, og er den raskeste måten å oppheve blokkeringen av en PR med feil.
Å **senke** en grense krever at noen kjører `--update` og committer resultatet — og før
jobben `bank-ratchet-shrinks` kom på plass, var det ingen arbeidsflyt som gjorde dette. Den målte konsekvensen
(2026-07-25): 18 fryste filer lå allerede på eller under grensen på 800 linjer for nye filer, den verste
på 132× (`src/shared/validation/schemas.ts`, 19 linjer med en grense på 2 523); det
øvre kompleksitetstaket steg `1794 → 2169` gjennom ~37 merknader om oppdatering av referansenivået, med nøyaktig én
reduksjon (−1); og «stram inn via `--update` i neste syklus» ble skrevet 31 ganger og fulgt opp
én gang. En grense som overlever koden som ga grunnlag for den, gjør i stillhet hver fullførte
oppdeling om til vekstrom for den neste som redigerer filen.

`nightly-release-green.yml` → jobben **`bank-ratchet-shrinks`** lukker denne sløyfen:

|             |                                                                                                                  |
| ----------- | ---------------------------------------------------------------------------------------------------------------- |
| Kjører ved  | `schedule` (3×/dag) + `workflow_dispatch` — bevisst **ikke** `push`                                              |
| Måler       | den høyeste `release/vX.Y.Z`, med samme oppløsning og injeksjonsvern som `release-green`                         |
| Skriver     | `check:file-size --update` og `check:complexity-ratchets --update` (begge kan konstruksjonsmessig bare redusere) |
| Verifiserer | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                         |
| Leverer     | én alltid oppdatert PR mot utgivelsesgrenen — tvangsoppdatert, aldri spammet                                     |

Lagring gjøres satsvis i stedet for ved hver push fordi den ikke har noe latenskrav (en reduksjon
lagret innen 8 timer er godt nok), mens en kjøring per sammenslåing ville bygget PR-grenen på nytt gjentatte ganger
under sammenslåingskampanjer og betalt kostnaden for en full ESLint-gjennomgang hver gang. Deteksjon skjer fortsatt ved
push (`release-green`); bare lagringen gjøres satsvis.

### Sikkerhetsverifikatoren

Jobben skriver til referansenivåene uten tilsyn, så `verify-ratchet-bank.mjs` er det som gjør
dette akseptabelt. Den sammenligner treet etter `--update` med `HEAD` og **avbryter jobben
før noen commit finnes** — uten å åpne noen PR — med mindre hver endring er én av følgende:

- en numerisk `frozen`- / `testFrozen`-oppføring som er **senket** eller **fjernet**
- `complexity-baseline.json` → `count` er **senket**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` er **senket**

Alt annet feiler: å heve et tall, legge til en oppføring, endre `cap`/`testCap` eller
slette/omskrive en `_rebaseline_*`-merknad (disse merknadene er revisjonssporet som forklarer hvorfor hvert
tak finnes, og lagres i det samme `frozen`-objektet som filoppføringene).
En bot som kunne heve en grense, ville vært klart verre enn status quo. Regresjonsvern:
`tests/unit/verify-ratchet-bank.test.ts`.

Jobben pusher aldri til `release/*` — et menneske slår sammen PR-en, slik at en feilaktig måling
ikke kan bli lagt inn uten gjennomgang.

## Tillatelseslistepolicy

Hver gate som ikke kan svikte på forhåndseksisterende brudd, bruker en fryst godkjenningsliste (f.eks. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Politikken er:

**Rett opp grunnårsaken; bruk tillatelseslisten bare når bruddet allerede eksisterer og ikke kan fikses i samme PR.**

Når du legger til en oppføring på en godkjenningsliste:

1. Legg ved en kommentar med begrunnelsen.
2. Referer til sporingsproblemet (f.eks. `// #3498 — Phase 2 feature, not yet implemented`).
3. Fjern oppføringen i samme PR som fikser bruddet — en foreldet oppføring som ikke lenger undertrykker et aktivt brudd er i seg selv en defekt (6A.3 stale-enforcement vil svikte porten på en foreldreløs tillatelsesliste-post når den er implementert).

Gjøre** ikke** legg til godkjenningslisteoppføringer for å få tester til å bestå raskere. En grønn port med en voksende tillatelsesliste er en falsk følelse av kvalitet.

### Når en port svikter på din PR

1. **Les portutgangen nøye** — det forteller deg nøyaktig hvilken fil eller symbol som brøt regelen.
2. **Rett opp bruddet** — de fleste porter er deterministiske filsystemsjekker som passerer så snart koden er riktig.
3. **Hvis bruddet er eksisterende** (dvs. du introduserte det ikke, men porten dekker det nå): legg til en godkjenningsliste med en begrunnelseskommentar og et sporingsproblem.
4. **Hvis porten er en skralle** (dekning, ESLint -advarsler, duplisering, kompleksitet): endringen din gjorde metrikken verre. Løs det underliggende problemet, eller kjør (sjelden) `npm run quality:ratchet -- --update` hvis endringen er tilsiktet og den metriske degraderingen er akseptabel — men dokumenter hvorfor i PR -beskrivelsen.
5. **Rådgivende porter** (`continue-on-error: true`) er informative — de blokkerer ikke sammenslåing, men vises i CI sammendraget. Fiks dem uansett.

---

## Legge til en ny port

1. Opprett `scripts/check/check-<name>.mjs` (eller `.ts`). Policyporter avsluttes med 0/1.
   Porter av skralletypen sender en måleverdi til `quality-metrics.json` via `collect-metrics.mjs`.
2. Legg til `"check:<name>": "node scripts/check/check-<name>.mjs"` i `package.json`.
3. Koble den til i `.github/workflows/ci.yml` under riktig jobb
   (policy → `lint` eller `docs-sync-strict`; skralle → `quality-gate`).
4. Hvis den har en tillatelsesliste, bruk `reportStaleEntries()` fra
   `scripts/check/lib/allowlist.mjs` slik at foreldede oppføringer oppdages automatisk.
5. Skriv en test i `tests/unit/build/` som dekker portens deteksjonslogikk.
6. Oppdater dette dokumentet (legg til en rad i den relevante jobbtabellen).

---

## Agentverktøy: LSP-in-the-loop (valgfritt)

I tillegg til CI-portene leveres OmniRoute med et **valgfritt** `agent-lsp`-rammeverk
(en `.mcp.json` på prosjektnivå, fase 7, oppgave 15). Opprett `.mcp.json`
for å eksponere en TypeScript-språkserver for kodeagenter, slik at de løser symboler /
diagnostikk **før** de skriver kode — et «kompiler før du hevder»-supplement til
`typecheck:core` som stopper feil med «oppdiktede symboler» ved kilden. Det lastes med vilje
ikke inn automatisk (du velger og verifiserer MCP↔LSP-broen); en ødelagt oppføring logger bare en
tilkoblingsfeil og avbryter aldri økter.

---

## Rationalization Backlog (ROI review — Fase 9 Onda 3)

Denne beholdningen ble avstemt mot `ci.yml` 2026-06-17 (den tidligere versjonen utelot `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence`). En ROI gjennomgang av det avstemte settet identifiserte følgende rasjonaliseringskandidater.** Sammenslåingene er mekaniske CI endringer; flips/drops er politiske beslutninger forbeholdt operatøren.** Ingenting nedenfor er brukt ennå.

**Også udokumentert ovenfor** (rådgivende, lavt signal): `docs-lint` jobben (markdownlint + Vale, hele jobben `continue-on-error`) og de frittstående skannerarbeidsflytene `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` er i `quality-baseline.json`, men er ikke koblet til en blokkerende skralle i `ci.yml` — metrikken er for øyeblikket foreldreløs.

### Slå sammen / dedup (mekanisk, lavere risiko)

Hver kandidat ble validert mot live-gate-tilstanden 2026-06-17 (trust-but-verify); flere «åpenbare» sammenslåinger viste seg å skjule gjeld og er** ikke** rene drop-ins.

- **`check:docs-sync` løper to ganger** — frittstående i `lint` jobben og igjen inne i `check:docs-all` (`docs-sync-strict`) og husky pre-commit-kroken. ✅**DONE** — frittstående `lint` -anrop fjernet.
- **CVE skanning** — ❌**NOT en ren fusjon.** `audit:deps` blokkerer kritiske råd og ufullstendige revisjoner på tvers av alle fem låsefilene, mens den rapporterer høye råd som advarsler under gjeldende policy; `check:vuln-ratchet` (osv) feiler bare på en _regresjon_ vs. den innsjekkede grunnlinjen og avviser manglende målinger når det er nødvendig. Ulike semantikk — å slippe `audit:deps` ville miste den absolutt kritiske porten og de uavhengige pakkerevisjonene. Behold begge deler.
- **Syklusdeteksjon** — ✅**DONE** (#15159 G-01/G-02). Den gamle teksten her kalte `check:cycles` "den grønne, kurerte" porten og rettferdiggjorde å holde den blokkert fordi `check:circular-deps` (dpdm) rapporterte 91 sykluser. Den grønne var en** falsk grønn** : `check:cycles` skannet 5 underkataloger (450 filer), matchet bare statisk `import|export … from`, og droppet hver `@/` og `@omniroute/open-sse/` spesifisator, så den kunne ikke se de dynamiske importerte + -aliassyklusene som dominerte repoen. Rettet: porten går nå `src` + `open-sse` (5023 filer), samler spesifikasjoner fra TypeScript AST (så `import("…")` teller og type-posisjon `typeof import("…")` ikke), og løser tsconfig `paths`. Den finner** 14** sykluser, ikke 0. Fordi 14 eksisterende sykluser ikke kan fikses i en port PR, er `check:cycles` nå en** skralle** (`--ratchet`, tak `metrics.cycles.value = 14` i `quality-baseline.json`, `direction: down`) — det blokkerer enhver _regresjon_ og tellingen kan bare falle. CI kjører `npm run check:cycles:ratchet`. Nedbrente turer med**A-01** . `check:circular-deps` (dpdm) forblir rådgivende som den bredere andre oppfatningen.
- **Kompleksitet** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): én ESLint gange, telles med ruleId slik at syklomatiske + max-linjer og kognitive grunnlinjer forblir uavhengige; individuelle `check:complexity` / `check:cognitive-complexity` forblir for lokale `--update`.
- **`/api` anti-hallusinasjon** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): en FS beholdning av `src/app/api`, openapi-ruter + docs-symboler rapporterer fortsatt uavhengig; enkeltpersoner forblir for lokale løp.
- **`check:node-runtime` har 11 jobber** — ⚠️** lav ROI.** Hver er en egen løper og sjekken er < 1s; total besparelse ~ 10s, mot å miste en billig per-jobb vakt. Ikke verdt churn.
- **`typecheck:noimplicit:core` på CI lo** — ✅** fjernet fra lojobben** (var rådgivende `continue-on-error`); overflaten av blokkeringstypen er `typecheck:core` + `check:type-coverage`. Lokalt manus beholdt.

### Vend/bestem (operatørpolicy)

- `check:openapi-security-tiers` (rådgivende) — ❌**NOT rent vendbar.** Den går ut av 0, men advarer om at flere `traffic-inspector` ruter under `LOCAL_ONLY_API_PREFIXES` mangler `x-loopback-only: true` kommentaren. Å håndheve det krever at du legger disse merknadene til `openapi.yaml` først.
- `typecheck:noimplicit:core` (rådgivende) — i stor grad subsumert av den blokkerende `check:type-coverage` skrallen. Vend til en skralle eller slipp det overflødige andre `tsc` passet.
- `test:vitest:ui` (nå** blokkering** ) — -eksisterende feil er eksplisitt ekskludert i `vitest.config.ts` med `// #8618` sporingskommentarer; nye feil svikter jobben.
- `check:secrets` (gitleaks, blokkering av skralle frosset ved 3 dokumenterte falske positive) — tillatelsesliste de 3 for å nå 0, eller degradere til rådgivende. Overlapper GitHub opprinnelig hemmelig skanning + `check:public-creds`.
- `check:pr-evidence` (blokkering, greps PR-kroppsprosa) — høy falsk-positiv risiko; svekker håndhevelsen av Hard Rule #18 hvis den droppes, så dette er et ekte policyoppkall.
- `semgrep` (rådgivende frittstående) — overlapper CodeQL for OWASP familiene; koble grunnlinjen til en skralle eller dråpe.

---

## Relatert dokumentasjon

- Leverandørkjede (proveniens, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — kontrollport for samsvar mellom nøkkelsett

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, jobb `i18n-ui-coverage`).
Sammenligner settet av bladnøkler i hver `src/i18n/messages/<locale>.json` med `en.json` og feiler
ved enhver manglende eller ekstra bladnøkkel, uavhengig av når nøkkelen ble lagt til. Plassholdere
med `__MISSING__:` regnes som til stede (innholdet deres er forholdskontrollens ansvar). Den er det
absolutte motstykket til de to diffbaserte/prosentbaserte kontrollportene: `check-ui-keys-coverage`
håndhever en nedre grense på 80 % per språkvariant (43 manglende nøkler av ~13,000 gir fortsatt
99,7 %), og `check-new-key-coverage` vurderer bare nøklene en PR legger til i `en.json`. En gruppe
med språkvarianter genereres fra dagens `en.json` når grenen opprettes, og oversettes i flere dager
mens basisgrenen fortsetter å få nye nøkler. Gruppe-PR-en legger ikke selv til noen nøkkel, så begge
søskenkontrollene forble tause da gruppe 1 (#13044) ble slått sammen med 43 manglende nøkler i ni
språkvarianter og gruppe 2 (#13660) med 10 manglende nøkler i åtte (2026-09-15). Rett en rød feil med
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; en `extra`-bladnøkkel
betyr at kilden har fjernet den — slett den fra språkvarianten. `--warn` rapporterer uten å feile.
`--catalog=cli` kjører den samme sammenligningen på `bin/cli/locales` (`npm run i18n:check-keys:cli`);
begge trinnene ligger i jobben `i18n-ui-coverage`.

#### `check-new-key-coverage` — i18n-kontrollport for nye nøkler

Søskenkontroll til `check-ui-value-drift`. Sistnevnte oppdager en engelsk verdi som ble **skrevet om**
mens oversettelsene ikke ble oppdatert; denne oppdager en engelsk nøkkel som ble **lagt til**
uten at enkelte språkvarianter mottok den.

`check-ui-keys-coverage` kan ikke oppdage denne kategorien: den håndhever en prosentbasert nedre grense
per språkvariant, og elleve manglende nøkler av ~13,000 gir fortsatt en dekning på 99,9 %. En prosentandel
per språk kan ikke uttrykke «denne funksjonen ble lansert uoversatt» — en hel funksjon kan legges inn
i en ny språkvariant uten tekst uten at tallet endres.

Hendelsen den representerer: Fase 3 av Orchestration Canvas fikk sine elleve nøkler oversatt på tvers
av de 42 språkvariantene som fantes på det tidspunktet. Noen timer senere økte gruppen med EU-språk
(#13044) repositoriet til 51 språkvarianter, og de ni nykommerne (`el`, `et`, `ga`, `hr`, `lt`, `lv`,
`mt`, `sl`, `sr`) mottok dem aldri. `deepMergeFallback` erstatter en manglende nøkkel med engelsk, så
feilmodusen var et uoversatt brukergrensesnitt snarere enn et tomt brukergrensesnitt — reell og taus
per konstruksjon.

I likhet med søskenkontrollen er den **diffbevisst** og sammenligner engelsk ved flettebasen med
arbeidstreet, slik at eksisterende mangler forblir fryst og kontrollporten kunne aktiveres uten
migrering.

**En `__MISSING__:<english>`-markør oppfyller ikke kravet (siden 2026-09-17).** Den pleide å være den
dokumenterte utsettelsen — kjøretidsmiljøet faller tilbake til korrekt engelsk — helt til åtte
funksjons-PR-er 2026-09-16 la til 61 nøkler og satte markøren inn i alle de 65 språkvariantene i stedet
for å oversette. Denne kontrollporten godtok dem alle, ingenting blokkerte PR-ene, og den blokkerende
forholdskontrollen for reelle oversettelser feilet deretter på utgivelsestuppen for alle
(pt-BR 3,2 % > 2,5 % + 0,5). En markør vurderes nå som en manglende oversettelse. Rett en rød feil med
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, eller alle
språkvarianter parallelt med `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
trygg ved frakobling, nekter å starte uten miljøvariablene `OMNIROUTE_TRANSLATION_*`). En nøkkel som
må forbli engelsk (et fastlåst produkt-, motor- eller flaggnavn), hører hjemme i
`scripts/i18n/untranslatable-keys.json`, aldri bak en markør. `vi` forbyr markører fullstendig
(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — kontrollport for parkerte tester

En fil i `exclude`-listen i `vitest.config.ts` er en test som ikke kjøres, og den ser ut som dekning
for den som leser treet. Sekstito filer samlet seg opp bak kommentaren
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Sak #8618 ble lukket
2026-08-11, mens listen den fulgte, vokste fra 45 til 62 oppføringer, der hver nye oppføring arvet
en kommentar som pekte til en avsluttet sak. Da listen til slutt ble målt fil for fil (#13204),
**bestod 51 av de 62 mot det gjeldende treet uten noen kildekodeendring**.

Kontrollporten krever at hvert unntak som peker til en faktisk fil, (a) navngir en sporingssak og
(b) finnes i `config/quality/vitest-exclusions.json` med sin målte status, slik at det å legge til
et unntak blir en diff som kan gjennomgås i en egen fil, i stedet for enda en linje i en matrise med
60 oppføringer. Den kjører bevisst ikke de utelatte testene på nytt — det tar ~10 minutter og hører
hjemme i en periodisk jobb. Oversikten registrerer når hver test sist ble målt.
