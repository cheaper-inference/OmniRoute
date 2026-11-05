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

### Slå sammen kø

`queue` etiketten sender en PR til Mergify-køen (`.mergify.yml`). Mergify åpner et utkast til PR på en `mergify/merge-queue/` -gren, CI kjører hele utvalget der, og den originale PR smelter sammen når `Gate / CI`, `Gate / Quality` og `Merge integrity (changelog + generated skills)` passerer.

Mergify skriver køsammendraget i utkastets beskrivelse, og andre apper kan også redigere det. En `pull_request` `edited` -hendelse på et slikt utkast tar sin egen samtidighetsgruppe (`-queue-edit-<run_id>`) slik at det ikke kan avbryte utkastets virkelige løp, og det hopper over porten og matrisen. Bare `Merge integrity` kjører fortsatt. Den hoppede gate-jobben har et annet sjekknavn, fordi Mergify leser en hoppet over `Gate / CI` som en mislykket sjekk og setter PR.

Etter en dekø vil ikke et push alltid sette PR i kø. Kommenter `@mergifyio queue` på det.

Hver JSON -kvittering identifiserer utsjekket SHA, arbeidsflytkjøring og forsøk. CLI avviser en checkout/event SHA mismatch. Arbeidsflyttester binder policymedlemskap til domsjobbens `needs` liste, slik at en ny eller fjernet bane ikke kan forsvinne stille. Kvitteringene dekker deres egen arbeidsflyt, ikke publisering, distribusjon eller interndelen av en eksisterende rådgivende skanner. Aktivering av begge sjekknavnene i grenreglene er en separat administrativ endring; å legge til disse jobbene beskytter ikke i seg selv en gren.

### Inventar for statisk skanning

Den versjonerte npm-alias-beholdningen og statisk skanning-medlemskapet lever i `config/quality/gate-manifest.json`. Kjør `npm run check:gate-manifest` for å validere skriptnavn og eksakte kommandoer mot `package.json`; tillegg, fjerninger og kommandodrift feiler både den lokale kroken og endringsklassifiseringsjobbene i CI. Et alias er ikke en arbeidsflytjobb, matriseforekomst eller testtilfelle: disse tellingene må ikke presenteres som utskiftbare.

Bruk `npm run quality:scan -- --list` eller `npm run quality:scan:fast -- --list` for å inspisere de valgte aliasene uten å utføre dem. Løperen påkaller npm-inngangspunktet, slik at kjøretiden (inkludert Bun der den er konfigurert) bevares. Manifestet registrerer aliaser utenfor disse profilene som separat påkalt, og vedlikeholdskommandoer er forbudt i skrivebeskyttede skanneprofiler.

Disse profilene dekker kun den statiske skanningen. De sertifiserer ikke produkttester, dekning, emballasje, eksterne kontroller eller en kandidats fulle utgivelsesgodkjenning. Arbeidsflytopptak bruker de koblede `config/quality/admission-policy.json` og `scripts/quality/admission-verdict.mjs`. Utgivelsesobservatørprofiler forblir separate; inspisere gjeldende sjekker og kvitteringer uavhengig. Prosainventaret nedenfor er en referanse, ikke et bevis på at en port faktisk gikk.

Skript lever under `scripts/check/` (policy porter) og `scripts/quality/` (ratchet engine). CI kilden til sannhet er `.github/workflows/ci.yml`.

### Slipp PR fast-path (`quality.yml`)

`.github/workflows/quality.yml` utfyller CI på main/release PRs, skyver til `main`, sender og slår sammen grupper. PRs bruker banefiltrerte hurtigsjekker. Det permanent deaktiverte duplikatbygget ble fjernet. de ekte build/package/boot -sjekkene forblir i CI. Enhetspakken og vitest kjører bare i CI (`Unit Tests (N/8)` og `Vitest`).

| Jobb                                             | Omfang                                                                                                           | Blokkering           |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs og docs-all                                                                         | Ja                   |
| `Fast Quality Gates`                             | Kode PRs; statiske sjekker, typesjekk, dashbordtypesjekk, berørte enhetstester, glemte søskentester (rådgivende) |
| `No new ESLint warnings`                         | Kode PRs; lobeskyttelse som er bevisst på undertrykkelse                                                         | Ja, inkludert gafler |
| `Merge integrity (changelog + generated skills)` | Ikke-utkast PRs; endringslogg og generert ferdighetssynkronisering                                               | Ja, inkludert gafler |

#### Glemt søskenprøverapport

`npm run check:forgotten-sibling-tests` kjører som et rådgivende trinn for `Fast Quality Gates` og gjenbruker importløseren bak test-effektkartet. For hver endret produksjonsmodul rapporterer den deterministiske `changed module/symbol -> static consumer -> candidate sibling test` kjeder når kandidattesten er fraværende fra pull-request diff. Markdown-sammendraget og JSON resultatet beholdes som `forgotten-sibling-tests` arbeidsflytartefakten for kalibrering før blokkerende utrulling.

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
| `check:model-lifecycle`           | De tre håndholdte rutetabellene forblir konsistente med det innsjekkede livssyklus-øyeblikksbildet (#11503): `FITNESS_TABLE` (`taskFitness.ts`) scorer ingen pensjonert id som `REGISTRY` kan rute; hvert `BUILT_IN_ALIASES` mål er tilstede i `REGISTRY` og fraværende fra øyeblikksbildet med pensjonert ID; hver pensjonert id fortsatt i `REGISTRY` videresendes eller oppført i `allowedRetiredInCatalog`; og ingen `DEFAULT_DEGRADATION_MAP` kilde eller -mål ser ut til å være trukket tilbake i det øyeblikksbildet. Dette beviser ikke at en modell for øyeblikket betjenes av en direkte oppstrøms. Frakoblet — sammenlignes med `config/quality/model-lifecycle.json`, oppdatert for hånd med `npm run quality:refresh-model-lifecycle` (nettverk; ikke koblet til CI). `allowedRetiredInCatalog` er en nedbrent skralle: legg til en oppføring bare med et sporingsproblem.                                            | Ja                                         |
| `check:fetch-targets`             | Hver `fetch("/api/...")` i klientsiden `src/` løses til en ekte `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                         |
| `check:deps`                      | Alle `npm install` -able deps over hver `package.json` i repoen er i `dependency-allowlist.json`; nye unpinned eller slopsquatted pakker flagget                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `audit:deps`                      | `npm audit` (rot- + elektron) — ingen high/critical -rådgivning (overlapper osv. `check:vuln-ratchet`; se Rasjonaliseringsetterslep)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                         |
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
| `check:vuln-ratchet`     | Avhengighetssårbarheter (osv-skanner) regresserer ikke — hopp hvis binær fraværende                                                                                                                             | **Rådgivende**                                  |
| `check:workflows`        | Arbeidsflyt-lo (actionlint + zizmor); missing/broken -skannere, ugyldige rapporter eller manglende ratchet-grunnlinje mislykkes som INCOMPLETE. Gyldige funn følger den valgte strict/advisory/ratchet policyen | Utførelse kreves; zizmor skralleblokkering i CI |
| `check:openapi-breaking` | Bryte endringer i den offentlige API kontrakten (`openapi.yaml`) vs basisgrenen (oasdiff) — sender ut `openapiBreaking=N`; hopper over hvis Oasdiff mangler eller basespesifikasjonen er uløselig               | **Rådgivende**                                  |

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
| `check:cli-i18n`               | CLI kommandostrenger finnes i alle i18n-lokalefiler                                                                                           | Ja                       |
| `check:openapi-coverage`       | OpenAPI -spesifikasjonen dekker minst et skraldegulv av ekte ruter                                                                            | Ja                       |
| `check:openapi-security-tiers` | Sikkerhetsnivåkommentarer i `openapi.yaml` er i samsvar med `routeGuard.ts` -klassifiseringer                                                 | **Rådgivende**           |
| `check:openapi-routes`         | Hver sti i `openapi.yaml` løses til en ekte `route.ts` (anti-hallusinasjon)                                                                   | Ja                       |
| `check:docs-symbols`           | Hver `/api/...` -referanse i `docs/**/*.md` løses til en ekte `route.ts` (anti-hallusinasjon)                                                 | Ja                       |
| `i18n translation drift`       | Uoversatte nøkler i i18n-lokalitetsfiler — warn only                                                                                          | **Rådgivende**           |

De tolv README SVGs under `docs/diagrams/` genereres (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` regenererer dem alle). Hver har en byte-sammenligningsenhetstest (`tests/unit/docs/readme-*-svg.test.ts`, jobb `test-unit`) som mislykkes når den forpliktede filen er foreldet, og `check:docs-counts` leser kanoniske tall fra deres `<text>` noder — som er grunnen til at skisseringstrinnet holder hver skisserte streng i filen som usynlig `<text>`. SVG kanoniske tall-sjekken leser filene oppført i `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, pluss `public/images/tier-flow-dark.svg` og `tier-flow-light.svg`; påstandene om gratis-for alltid, katalogoppføring, gjentakende pulje og scoringsfaktorer er også `promise-pillars.svg`, `free-tier-budget.svg` og `strategies-grid.svg`. `free-tier-budget.svg` henter tallene sine fra den levende kataloglasteren, så en endring til `FREE_MODEL_BUDGETS` eller til en leverandørs visningsnavn røde CI til den filen er regenerert.

### Jobb: `i18n-ui-coverage`

| Manus                             | Validerer                                                                                                                                                                                           | Blokkering     |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | UI i18n nøkkeldekning er ≥ 65 %                                                                                                                                                                     | Ja             |
| `check-ui-value-drift` (inline)   | En omskrevet engelsk** verdi** etterlater ingen gammel oversettelse                                                                                                                                 | Ja             |
| `check-new-key-coverage` (inline) | EN** ny** Engelsk nøkkel oversettes i hver lokalitet — en `__MISSING__:` -markør blir avvist                                                                                                        | Ja             |
| `check-translation-ratio`         | Real-oversettelsesforhold per lokalitet (identisk-til-engelsk / plassholder / manglende blader utenfor tillatelseslisten) må ikke overstige `config/quality/i18n-translation-baseline.json` + slakk | **Rådgivende** |

Trenger `fetch-depth: 0` — verdi-drift-porten diff `en.json` mot flettebasen.

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

## Ratchet-grunnlinje (`quality-baseline.json`)

Ratchet-motoren (`scripts/quality/check-quality-ratchet.mjs`) leser `quality-baseline.json`
og sammenligner den med den nylig innsamlede `quality-metrics.json`. Alle måleverdier som forverres
utover sin epsilon, fører til at bygget mislykkes.

Måleverdier som spores for øyeblikket:

| Måleverdi             | Retning | Betydning                             |
| --------------------- | ------- | ------------------------------------- |
| `eslintWarnings`      | `down`  | Antallet ESLint-advarsler må ikke øke |
| `coverage.statements` | `up`    | Dekningen av utsagn må ikke synke     |
| `coverage.lines`      | `up`    | Linjedekningen må ikke synke          |
| `coverage.functions`  | `up`    | Funksjonsdekningen må ikke synke      |
| `coverage.branches`   | `up`    | Forgreningsdekningen må ikke synke    |

Slik oppdaterer du grunnlinjen etter en reell forbedring:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Flagget `--update` skriver de gjeldende målte verdiene til `quality-baseline.json`.
Commit denne filen sammen med endringen som forbedret måleverdien. En PR som forbedrer en
måleverdi uten å oppdatere grunnlinjen, vil bli fanget opp av `--require-tighten` (fase 6A.5,
venter på implementering).

### CodeQL-ratchet: oppdateringsfrekvens og manuell utløsning

`check:codeql-ratchet` leser **tilstanden til repositoriet, som oppdateres etter en tidsplan — ikke per PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` rapporterer
`state: configured`, `schedule: weekly`: GitHubs skanning med standardoppsett, ikke en analyse
for hver push. Konsekvens: Etter at en PR som RETTER varsler, er slått sammen, fortsetter ratchet-motoren
å lese det gamle, høyere antallet frem til neste planlagte skanning kjøres — dermed rapporterer den en regresjon
for hver åpne PR, inkludert oppfølgingsendringer til den rettende PR-en, frem til skanningen er ajour.

**Manuell oppdatering**: `gh workflow run codeql.yml --ref release/vX.Y.Z` kjører
analysen på nytt og publiserer varslene igjen i løpet av få minutter. Les `.github/workflows/codeql.yml`
først — overskriften forklarer at den bare bruker `workflow_dispatch`, **fordi den er i konflikt med
GitHubs «default setup»** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Gjenoppretting av utløsere for `push`/`pull_request`/
`schedule` krever først en **handling fra eieren**: Settings → Code security →
CodeQL: Default → Advanced. Ikke legg til en `schedule:`-utløser uten denne endringen — det
vil bare føre til mislykkede kjøringer.

**Stram inn grunnlinjen etter at antallet synker** — `node scripts/check/check-codeql-ratchet.mjs
--update` skriver det nye målte antallet til `quality-baseline.json` →
`metrics.codeqlAlerts.value`, slik at ratchet-motoren ikke stilltiende tillater en regresjon tilbake
til den gamle grensen. Praktisk eksempel (2026-09-02/03): PR #12502 rettet 7 reelle varsler
(13 → 6 målte åpne); PR #12530 strammet inn den låste grunnlinjen fra 11 → 6 for å samsvare; de
gjenværende 6 ble deretter avvist med en begrunnelse for hvert varsel, ned til 0 åpne.

**Avvisninger avgjøres av operatøren (ufravikelig regel nr. 14)** — avvis aldri et CodeQL-varsel
uten å registrere den tekniske begrunnelsen i avvisningskommentaren: `won't fix` for
et krav i en oppstrømsprotokoll, `used in tests` for en testfikstur, `false positive`
for en sanitering CodeQL ikke kan se (presedens: `docs/security/ERROR_SANITIZATION.md`).

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

Hver port som ikke kan feile på eksisterende brudd, bruker en fryst tillatelsesliste
(f.eks. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Policyen er:

**Rett opp den underliggende årsaken; bruk tillatelseslisten bare når bruddet allerede eksisterer og
ikke kan rettes i samme PR.**

Når du legger til en oppføring i en tillatelsesliste:

1. Inkluder en kommentar med begrunnelsen.
2. Referer til sporingsoppgaven (f.eks. `// #3498 — Fase 2-funksjonalitet, ennå ikke implementert`).
3. Fjern oppføringen i samme PR som retter bruddet — en foreldet oppføring som ikke lenger
   undertrykker et aktivt brudd, er i seg selv en feil (6A.3-kontrollen for foreldet håndheving vil
   gjøre at porten feiler på en foreldreløs oppføring i tillatelseslisten når den er implementert).

Legg **ikke** til oppføringer i tillatelseslisten for å få testene til å bestå raskere. En grønn port med en voksende
tillatelsesliste gir en falsk trygghet om kvaliteten.

### Når en port feiler på PR-en din

1. **Les resultatet fra porten nøye** — det forteller deg nøyaktig hvilken fil eller hvilket symbol som brøt
   regelen.
2. **Rett bruddet** — de fleste porter er deterministiske filsystemkontroller som består så snart
   koden er korrekt.
3. **Hvis bruddet allerede eksisterer** (dvs. du introduserte det ikke, men porten
   dekker det nå): Legg til en oppføring i tillatelseslisten med en begrunnende kommentar og en sporingsoppgave.
4. **Hvis porten er en skrallemekanisme** (dekning, ESLint-advarsler, duplisering, kompleksitet):
   Endringen din gjorde måleverdien dårligere. Rett det underliggende problemet, eller kjør (unntaksvis)
   `npm run quality:ratchet -- --update` hvis endringen er tilsiktet og forverringen av måleverdien
   er akseptabel — men dokumenter hvorfor i PR-beskrivelsen.
5. **Rådgivende porter** (`continue-on-error: true`) er kun informative — de blokkerer ikke
   sammenslåing, men vises i CI-sammendraget. Rett dem likevel.

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

## Rasjonaliseringsrestanse (ROI-gjennomgang — Fase 9 Onda 3)

Denne oversikten ble avstemt mot `ci.yml` 2026-06-17 (den forrige versjonen utelot
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). En ROI-gjennomgang av det avstemte settet
identifiserte følgende kandidater for rasjonalisering. **Sammenslåingene er mekaniske
CI-endringer; endringene/fjerningene er policybeslutninger som er forbeholdt operatøren.**
Ingenting nedenfor er tatt i bruk ennå.

**Også udokumentert ovenfor** (rådgivende, lav signalverdi): `docs-lint`-jobben
(markdownlint + Vale, hele jobben har `continue-on-error`) og de frittstående
skannerarbeidsflytene `semgrep.yml` / `codeql.yml` / `scorecard.yml`.
`semgrepFindings: 0` finnes i `quality-baseline.json`, men er ikke koblet til en
blokkerende skrallemekanisme i `ci.yml` — måleverdien er for øyeblikket foreldreløs.

### Slå sammen / dedupliser (mekanisk, lavere risiko)

Hver kandidat ble validert mot den aktive porttilstanden 2026-06-17
(stol på, men verifiser); flere «åpenbare» sammenslåinger viste seg å skjule gjeld og er
**ikke** rene direkteerstatninger.

- **`check:docs-sync` kjøres to ganger** — frittstående i `lint`-jobben og på nytt i `check:docs-all` (`docs-sync-strict`) samt i husky sin pre-commit-hook. ✅ **FERDIG** — den frittstående `lint`-kjøringen er fjernet.
- **CVE-skanning** — ❌ **IKKE en ren sammenslåing.** `audit:deps` feiler ubetinget ved enhver CVE med høy/kritisk alvorlighetsgrad; `check:vuln-ratchet` (osv) feiler bare ved en _regresjon_ sammenlignet med grunnlinjen (for øyeblikket 1 MODERATE). Ulik semantikk — fjerning av `audit:deps` ville medføre tap av den absolutte porten for høy/kritisk alvorlighetsgrad. Behold begge.
- **Syklusdeteksjon** — ✅ **FERDIG** (#15159 G-01/G-02). Den gamle teksten her omtalte `check:cycles` som «den grønne, kuraterte» porten og begrunnet at den skulle forbli blokkerende fordi `check:circular-deps` (dpdm) rapporterte 91 sykluser. Det grønne resultatet var en **falsk grønnstatus**: `check:cycles` skannet 5 underkataloger (450 filer), samsvarte bare med statisk `import|export … from` og forkastet hver `@/`- og `@omniroute/open-sse/`-spesifikator, slik at den ikke kunne se syklusene med dynamisk import og aliaser som dominerte repoet. Rettet: Porten går nå gjennom `src` + `open-sse` (5023 filer), samler spesifikatorer fra TypeScript-AST-en (slik at `import("…")` telles, mens `typeof import("…")` i typeposisjon ikke gjør det) og løser opp tsconfig-`paths`. Den finner **14** sykluser, ikke 0. Fordi 14 eksisterende sykluser ikke kan rettes i en port-PR, er `check:cycles` nå en **skrallemekanisme** (`--ratchet`, tak `metrics.cycles.value = 14` i `quality-baseline.json`, `direction: down`) — den blokkerer enhver _regresjon_, og antallet kan bare synke. CI kjører `npm run check:cycles:ratchet`. Nedbyggingen følger **A-01**. `check:circular-deps` (dpdm) forblir rådgivende som en bredere tilleggsvurdering.
- **Kompleksitet** — ✅ **FERDIG** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): én ESLint-gjennomgang, telling etter ruleId slik at grunnlinjene for syklomatisk kompleksitet + maks antall linjer og kognitiv kompleksitet forblir uavhengige; de individuelle `check:complexity` / `check:cognitive-complexity` beholdes for lokal `--update`.
- **Antihallusinasjon for `/api`** — ✅ **FERDIG** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): én FS-oversikt over `src/app/api`; openapi-routes + docs-symbols rapporterer fortsatt uavhengig; de individuelle kontrollene beholdes for lokale kjøringer.
- **`check:node-runtime` kjøres i 11 jobber** — ⚠️ **lav ROI.** Hver kjører på en separat runner, og kontrollen tar <1s; total besparelse er ~10s, mot tapet av en rimelig kontroll per jobb. Ikke verdt endringsstøyen.
- **`typecheck:noimplicit:core` i CI-lint** — ✅ **fjernet fra lint-jobben** (var rådgivende med `continue-on-error`); den blokkerende typeoverflaten er `typecheck:core` + `check:type-coverage`. Det lokale skriptet er beholdt.

### Endre / avgjør (operatørpolicy)

- `check:openapi-security-tiers` (rådgivende) — ❌ **KAN IKKE endres uten videre.** Den avsluttes med 0, men advarer om at flere `traffic-inspector`-ruter under `LOCAL_ONLY_API_PREFIXES` mangler annotasjonen `x-loopback-only: true`. Håndheving krever at disse annotasjonene først legges til i `openapi.yaml`.
- `typecheck:noimplicit:core` (rådgivende) — i stor grad erstattet av den blokkerende `check:type-coverage`-skrallemekanismen. Endre den til en skrallemekanisme, eller fjern den overflødige andre `tsc`-kjøringen.
- `test:vitest:ui` (nå **blokkerende**) — eksisterende feil er eksplisitt ekskludert i `vitest.config.ts` med `// #8618`-sporingskommentarer; nye feil får jobben til å feile.
- `check:secrets` (gitleaks, blokkerende skrallemekanisme fryst ved 3 dokumenterte falske positiver) — tillat de 3 gjennom en allowlist for å nå 0, eller nedgrader til rådgivende. Overlapper med GitHubs innebygde hemmelighetsskanning + `check:public-creds`.
- `check:pr-evidence` (blokkerende, søker med grep i PR-beskrivelsens prosa) — høy risiko for falske positiver; fjerning svekker håndhevingen av Hard Rule #18, så dette er en reell policyavgjørelse.
- `semgrep` (rådgivende, frittstående) — overlapper CodeQL for OWASP-familiene; koble grunnlinjen til en skrallemekanisme, eller fjern den.

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
