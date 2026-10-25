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

## Gate-inventar og kjøringsprofiler

### Kandidatopptak

CI- og Quality Gates-workflowene avgir hver sitt stabile verdikt: `Gate / CI` og
`Gate / Quality`. Deres versjonerte opptakspolicy lister opp hver oppstrømsjobb
som påkrevd eller rådgivende. En gjeldende påkrevd jobb må lykkes: manglende,
avbrutte, hoppede over, ventende og ukjente resultater kan ikke etablere PASS. En gyldig
kun-dokumenter- eller kun-katalog-klassifisering kan gjøre en kodeløype uanvendelig;
en utkast-PR er ikke en akseptert kandidat. En `hotfix`-etikett gir ikke fritak fra beviskrav.

Begge workflowene dekker PR-er inn i main/release-brancher, pushes til `main`, manuell dispatch
og merge-gruppe-hendelser. Push, dispatch og merge-gruppe kjører hele utvalget. Pushes til
`release/**` starter dem ikke (2026-10-18): hver endring har allerede kjørt matrisen på sin PR,
og den sammenslåtte kombinasjonen er Release-Greens jobb (`docs/ops/RUNNER_BOX.md` → Hosted-løype). Forks
og merge-grupper bruker hosted runners for jobber som ellers velger selvhostede
runners; tilstrekkelig hosted kapasitet må verifiseres før utrulling.

Hver JSON-kvittering identifiserer den utsjekkede SHA-en, workflow-kjøringen og forsøket.
CLI-et avviser en SHA-mismatch mellom checkout og hendelse. Workflow-tester binder
policy-medlemskap til verdiktjobbens `needs`-liste, slik at en ny eller fjernet løype ikke
kan forsvinne lydløst. Kvitteringene dekker sin egen workflow, ikke publisering, utrulling
eller det interne i en eksisterende rådgivende skanner. Å aktivere begge sjekknavnene i
branch-regler er en egen administrativ endring; å legge til disse jobbene beskytter ikke
i seg selv en branch.

### Inventar for statisk skanning

Det versjonerte npm-alias-inventaret og medlemskapet i statisk skanning ligger i
`config/quality/gate-manifest.json`. Kjør `npm run check:gate-manifest` for å validere
skriptnavn og eksakte kommandoer mot `package.json`; tillegg, fjerninger og
kommandoavvik feiler både den lokale hooken og endringsklassifiseringsjobbene i CI.
Et alias er ikke en workflow-jobb, matriseinstans eller testtilfelle: disse tallene må
ikke presenteres som utbyttbare.

Bruk `npm run quality:scan -- --list` eller `npm run quality:scan:fast -- --list`
for å inspisere de valgte aliasene uten å kjøre dem. Kjøreren kaller
npm-inngangspunktet, så dets kjøretid (inkludert Bun der det er konfigurert) bevares.
Manifestet registrerer aliaser utenfor disse profilene som separat påkalte, og
vedlikeholdskommandoer er forbudt i skrivebeskyttede skanneprofiler.

Disse profilene dekker kun den statiske skanningen. De sertifiserer ikke produkttester,
dekning, pakking, eksterne sjekker eller en kandidats fulle utgivelsesaksept.
Workflow-opptak bruker den lenkede `config/quality/admission-policy.json` og
`scripts/quality/admission-verdict.mjs`. Release-observer-profiler forblir separate;
inspiser deres gjeldende sjekker og kvitteringer uavhengig. Prosa-inventaret
nedenfor er en referanse, ikke et bevis på at en gate faktisk kjørte.

Skript ligger under `scripts/check/` (policy-gates) og `scripts/quality/` (ratchet-motor).
CIs sannhetskilde er `.github/workflows/ci.yml`.

### Hurtigløype for release-PR (`quality.yml`)

`.github/workflows/quality.yml` utfyller CI på main/release-PR-er, pushes til `main`,
dispatch og merge-grupper. PR-er bruker stifiltrerte hurtigsjekker. Det permanent
deaktiverte duplikatbygget ble fjernet; de reelle bygg/pakke/oppstart-sjekkene forblir i CI.

| Jobb                                             | Omfang                                                                                                                                                                                        | Blokkerende         |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `Docs Gates (fast-path)`                         | Dok/kode-PR-er; API-dok-referanser og docs-all                                                                                                                                                | Ja                  |
| `Fast Quality Gates`                             | Kode-PR-er; statiske sjekker, typesjekk, dashbord-typesjekk, berørte enhetstester                                                                                                             | Ja                  |
| `Forgotten sibling tests`                        | Kode-PR-er; endrede moduler spores til statiske konsumenter og kandidat-søskentester; barrel- og dynamiske importstier rapporteres som rådgivende diagnostikk, med refererte allowlist-unntak | **Rådgivende**      |
| `Vitest (fast-path)`                             | Kode-PR-er; rask vitest-suite                                                                                                                                                                 | Ja                  |
| `Unit Tests fast-path`                           | Kode-PR-er; enhetssuite med 4 shards                                                                                                                                                          | Ja                  |
| `No new ESLint warnings`                         | Kode-PR-er; lint-vakt med suppressions-håndtering                                                                                                                                             | Ja, inkludert forks |
| `Merge integrity (changelog + generated skills)` | Ikke-utkast-PR-er; changelog og synkronisering av genererte skills                                                                                                                            | Ja, inkludert forks |

#### Rapport om glemte søskentester

`npm run check:forgotten-sibling-tests` gjenbruker importoppløseren bak test-påvirkningskartet.
For hver endrede produksjonsmodul rapporterer den deterministiske
`changed module/symbol -> static consumer -> candidate sibling test`-kjeder når kandidat-søskentesten
mangler i pull request-diffen. Markdown-sammendraget og JSON-resultatet beholdes som
arbeidsflytartefakten `forgotten-sibling-tests` for kalibrering før en eventuell blokkerende utrulling.

Barrel-re-eksporter og dynamiske importer er bare oppløsningsdiagnostikk; de oppretter aldri et
blokkerende funn. Gjennomgåtte unntak ligger i
`config/quality/forgotten-sibling-allowlist.json`. Hver oppføring må navngi konsumenten og kandidat-søskentesten,
oppgi en spesifikk begrunnelse og lenke til en GitHub-sak eller pull request. Feilformede oppføringer feiler
lukket. Unntak kan ikke undertrykke en slettet kandidattest eller en diff som legger til `.skip`/`.todo`;
svekkelse av assertions og annen maskering tilhører fortsatt den uavhengig blokkerende
porten `check:test-masking`.

### Jobb: `lint`

Kjøres på hver PR mot `main`. Blokkerer sammenslåing ved feil.

| Script (`npm run ...`)            | Validerer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Blokkerende                                |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Node.js-versjonen er innenfor det støttede området                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:cycles`                    | Sirkulære importeringer på tvers av hele `src/` + `open-sse/` (AST-basert, tsconfig `paths` løst). Den rene varianten avslutter med kode 1 når det finnes en syklus (fail-closed siden #15281) og lister SCC-ene. `check:cycles:ratchet` (det CI kjører) blokkerer når antallet overstiger grensen `metrics.cycles` i `quality-baseline.json` — for øyeblikket 14, `direction: down`, så den kan bare synke (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ja (ratchet)                               |
| `check:boundary`                  | `open-sse → src`-kobling: unike fil-til-fil-importeringer fra motoren inn i appen (`scripts/quality/measure-boundary.mjs`; kantlisten er backloggen for utbedring av v4 core/module-split). Ren = veiledende rapport (samme som `quality:boundary`). `check:boundary:ratchet` (det CI kjører, også i ratchet-løkken for fast-gates i `quality.yml`) blokkerer når antallet overstiger grensen `metrics.boundaryOpenSseToSrc` i `quality-baseline.json` — satt til det målte 771, `direction: down`; `--update` senker den bare; base-relativ på PR-er (`--base-ref`, se nedenfor)                                                                                                                                                                                                                                                                                                                    | Ja (ratchet)                               |
| `check:route-validation:t06`      | Zod-skjemaer til stede på alle ruter (Tier 6-policy)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                         |
| `check:any-budget:t11`            | Antallet `@ts-expect-error // any` overstiger ikke budsjettet (Tier 11-skralle)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja                                         |
| `check:provider-consistency`      | Hver provider i `providers.ts` har en tilsvarende oppføring i `providerRegistry.ts` (og omvendt, innenfor tillatelseslisten)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                         |
| `check:model-lifecycle`           | De tre manuelt vedlikeholdte rutingstabellene holdes konsistente med det innsjekkede livssyklus-øyeblikksbildet (#11503): `FITNESS_TABLE` (`taskFitness.ts`) gir ikke poeng til noen utfaset id som `REGISTRY` kan rute; hvert `BUILT_IN_ALIASES`-mål finnes i `REGISTRY` og mangler i øyeblikksbildet over utfasede id-er; hver utfasede id som fortsatt finnes i `REGISTRY` videresendes eller er oppført i `allowedRetiredInCatalog`; og ingen `DEFAULT_DEGRADATION_MAP`-kilde eller -mål fremstår som utfaset i det øyeblikksbildet. Dette beviser ikke at en modell for øyeblikket betjenes av en levende oppstrøms. Frakoblet — sammenlignes mot `config/quality/model-lifecycle.json`, oppdatert for hånd med `npm run quality:refresh-model-lifecycle` (nettverk; ikke koblet inn i CI). `allowedRetiredInCatalog` er en nedbrenningsskralle: legg bare til en oppføring med en sporingssak. | Ja                                         |
| `check:fetch-targets`             | Hvert `fetch("/api/...")` på klientsiden i `src/` peker til en faktisk `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                         |
| `check:deps`                      | Alle `npm install`-erbare avhengigheter på tvers av hver `package.json` i repoet finnes i `dependency-allowlist.json`; nye pakker som ikke er versjonsfestet eller er slopsquattet, flagges                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `audit:deps`                      | `npm audit` (rot + electron) — ingen høy-/kritiske sikkerhetsmeldinger (overlapper osv `check:vuln-ratchet`; se Rationalization Backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:lockfile`                  | `package-lock.json`-integritet — https-register, integritetshasher, ingen vertsoverstyringer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                         |
| `check:licenses`                  | Tillatelsesliste over SPDX-lisenser for produksjonsavhengigheter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                         |
| `check:tracked-artifacts`         | Ingen byggartefakter / committede `node_modules`-symlenker (kjører også i husky pre-commit; pre-push er bevisst lett — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                         |
| `check:ai-attribution`            | Ingen AI/bot `Co-Authored-By`-trailer eller AI-generert bunntekst i PR-commits, tittel eller brødtekst — Hard regel #16 (i `quality.yml` fast-gates-løkken for PR→`release/**` — leser hendelsespayloaden, no-op utenfor PR-er — og et PR-bare-steg i `ci.yml` lint for PR→`main`; også husky `commit-msg`-hooken; menneskelige medforfattere er tillatt; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:vitest-exclusions`         | Hver Vitest-ekskludering nevner en sporingssak og finnes i `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:file-size`                 | Kildefiler (`.ts`/`.tsx` i `src/`, `open-sse/`, `electron/`, `bin/`) holder seg innenfor `cap`, og testfiler (`*.test.ts(x)`) innenfor `testCap`; filer som er fryst i `file-size-baseline.json` (`frozen` / `testFrozen`) må ikke vokse forbi sin registrerte størrelse                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:error-helper`              | Feilresponser i executors/handlers bruker `buildErrorBody()` / `sanitizeErrorMessage()` (hard regel #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:migration-numbering`       | SQL-migreringsfiler er sekvensielt nummerert, uten hull eller duplikater                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:public-creds`              | Ingen bokstavelige OAuth `client_id`/`client_secret` eller Firebase Web-nøkler utenfor `publicCreds.ts` (hard regel #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:db-rules`                  | Ingen rå SQL utenfor `src/lib/db/`-moduler; ingen barrel-importeringer fra `localDb.ts` (harde regler #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                         |
| `check:known-symbols`             | Provider-executors, rutingstrategier og translatorer registrert i dispatch-tabellene sine samsvarer med filene på disk — ingen foreldreløse eller udeklarerte symboler                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                         |
| `check:route-guard-membership`    | Hver rute som starter en underprosess er klassifisert av `isLocalOnlyPath()` (harde regler #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ja                                         |
| `check:test-discovery`            | Hver `*.test.ts` / `*.spec.ts`-fil i repoet samles inn av minst én testkjører (ratchet: listen over foreldreløse filer i `test-discovery-baseline.json` kan bare krympe)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:agent-skills-sync`         | Genererte agent-skills-artefakter samsvarer med kildekatalogen sin (ingen avvik)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:provider-asset-provenance` | Leverandørlogoer/-ressurser har en registrert opphavsoppføring                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `lint:json`                       | JSON-konfigurasjonsfiler kan parses og tilfredsstiller repoets lint-regler                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `typecheck:core`                  | TypeScript-kompilering uten feil (bare veiledende advarsler)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                         |
| `typecheck:noimplicit:core`       | Streng `noImplicitAny` — fremtidsrettet; mange eksisterende kallsteder trenger fortsatt annoteringer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | **Veiledende** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` avgrenset til `src/app/(dashboard)/**` (#7033) — `typecheck:core`s kuraterte tillatelsesliste på 27 filer inkluderer ingen dashboard-TSX, og `next build` typesjekker den heller aldri (`next.config.mjs` setter `ignoreBuildErrors: true`), så regresjoner med foreldreløse identifikatorer der (#6625/#6909) var usynlige for CI. Differ mot en frosset baseline med antall per fil/per TS-kode (`config/quality/dashboard-typecheck-baseline.json`, samme mønster for håndheving av utdaterte verdier som `check:known-symbols`) — bare NYE feil utover baseline-antallet får gaten til å feile; ratchet ned med `--update` når en eksisterende feil er rettet.                                                                                                                                                                                                                             | Ja                                         |

### Jobb: `quality-gate`

Kjører etter `test-coverage`. Blokkerer sammenslåing ved feil.

| Skript                       | Validerer                                                                                                                                                              | Blokkerende                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `quality:collect`            | Genererer `quality-metrics.json` (antall ESLint-advarsler, dekning fra samlet shard-rapport)                                                                           | Ja (oppstrøms for ratchet) |
| `quality:ratchet`            | Ingen metrikk i `quality-baseline.json` har forverret seg (ESLint-advarsler ≤ baseline; dekning ≥ baseline)                                                            | Ja                         |
| `check:duplication`          | Kodeduplisering (jscpd@4) overstiger ikke baseline i `quality-baseline.json`                                                                                           | Ja                         |
| `check:complexity`           | Syklomatisk kompleksitet på filnivå overstiger ikke taket (kjerne-ESLint `complexity` + `max-lines-per-function`)                                                      | Ja                         |
| `check:cognitive-complexity` | Ratchet for kognitiv kompleksitet (`eslint-plugin-sonarjs`) — separat ESLint-kjøring; CI kjører begge samlet som det ene `check:complexity-ratchets`-steget            | Ja                         |
| `check:dead-code`            | Ratchet for ubrukte eksporter / filer (knip) forverres ikke vs. baseline                                                                                               | Ja                         |
| `check:compression-budget`   | Budsjett for komprimerings-benchmark — minstegrensene for token-besparelser per motor må ikke forverres                                                                | Ja                         |
| `check:type-coverage`        | Ratchet for prosentandel typet kode (`type-coverage`) forverres ikke; dekker i stor grad `typecheck:noimplicit:core`                                                   | Ja                         |
| `check:codeql-ratchet`       | Antall åpne CodeQL-varsler forverres ikke (leses via `gh api`; grasiøs overhopping uten token) — oppdateringsfrekvens og manuell utløser: se «CodeQL-ratchet» nedenfor | Ja                         |

### Jobb: `quality-extended`

Hele jobben er rådgivende (`continue-on-error: true`). De npm-baserte ratchet-ene kjører på
ekte; de eksterne skannerne installeres via `gh release download` og hopper selv over (exit 0)
når en binær fortsatt mangler.

| Skript                   | Validerer                                                                                                                                                                                                          | Blokkerende                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| `check:circular-deps`    | Ingen sirkulære avhengigheter (dpdm)                                                                                                                                                                               | **Rådgivende**                                  |
| `check:bundle-size`      | Bundle-størrelsen overstiger ikke taket                                                                                                                                                                            | **Rådgivende**                                  |
| `check:secrets`          | Skanning etter hemmeligheter (gitleaks) — hopper over hvis binær mangler                                                                                                                                           | **Rådgivende**                                  |
| `check:vuln-ratchet`     | Sårbarheter i avhengigheter (osv-scanner) forverres ikke — hopper over hvis binær mangler                                                                                                                          | **Rådgivende**                                  |
| `check:workflows`        | Lint av workflows (actionlint + zizmor); manglende/ødelagte skannere, ugyldige rapporter eller manglende ratchet-baseline feiler som INCOMPLETE. Gyldige funn følger den valgte strict-/advisory-/ratchet-policyen | Kjøring kreves; zizmor-ratchet blokkerende i CI |
| `check:openapi-breaking` | Brytende endringer i den offentlige API-kontrakten (`openapi.yaml`) vs. base-branchen (oasdiff) — genererer `openapiBreaking=N`; hopper over hvis oasdiff mangler eller base-spesifikasjonen ikke kan løses        | **Rådgivende**                                  |

### Jobb: `docs-sync-strict`

Kjører på hver PR til `main`. Blokkerer sammenslåing ved feil.

| Skript                         | Validerer                                                                                                                                             | Blokkerende              |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `check:docs-all`               | Meta-port som kjører de 6 under-portene nedenfor sekvensielt                                                                                          | Ja                       |
| ↳ `check:docs-sync`            | Versjonskonsistens mellom CHANGELOG / OpenAPI / llm.txt                                                                                               | Ja                       |
| ↳ `check:docs-counts`          | Tall i prosa (antall tilbydere, antall migreringer, osv.) er innenfor skrallevinduet til de faktiske tallene                                          | Ja                       |
| ↳ `check:env-doc-sync`         | Hver miljøvariabel i `.env.example` er dokumentert i en docstabell, og omvendt                                                                        | Ja                       |
| ↳ `check:deprecated-versions`  | Ingen utdaterte versjonsstrenger i docs                                                                                                               | Ja                       |
| ↳ `check:doc-links`            | Interne markdown-lenker i docs peker til faktiske filer (`[text]`/`(path)`-form)                                                                      | Ja                       |
| ↳ `check:fabricated-docs`      | Ruter, miljøvariabler, CLI-kommandoer, hook-navn og filstier som er sitert i docs, finnes i kodebasen. Hard port via `--strict`; myk feil uten flagg. | Ja (via `--strict` i CI) |
| `check:cli-i18n`               | CLI-kommandostrenger finnes i alle i18n-lokalitetsfiler                                                                                               | Ja                       |
| `check:openapi-coverage`       | OpenAPI-spesifikasjonen dekker minst et skrallet gulv av faktiske ruter                                                                               | Ja                       |
| `check:openapi-security-tiers` | Sikkerhetsnivå-annotasjonene i `openapi.yaml` er konsistente med `routeGuard.ts`-klassifiseringene                                                    | **Rådgivende**           |
| `check:openapi-routes`         | Hver sti i `openapi.yaml` peker til en faktisk `route.ts` (anti-hallusinering)                                                                        | Ja                       |
| `check:docs-symbols`           | Hver `/api/...`-referanse i `docs/**/*.md` peker til en faktisk `route.ts` (anti-hallusinering)                                                       | Ja                       |
| `i18n translation drift`       | Uoversatte nøkler i i18n-lokalitetsfiler — kun advarsel                                                                                               | **Rådgivende**           |

### Jobb: `i18n-ui-coverage`

| Skript                            | Validerer                                                                                                                                                                                                              | Blokkerende    |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | UI i18n-nøkkeldekning er ≥ 65 %                                                                                                                                                                                        | Ja             |
| `check-ui-value-drift` (inline)   | En omskrevet engelsk **verdi** etterlater ingen foreldet oversettelse                                                                                                                                                  | Ja             |
| `check-new-key-coverage` (inline) | En **ny** engelsk nøkkel er oversatt i hver lokalitet — en `__MISSING__:`-markør avvises                                                                                                                               | Ja             |
| `check-translation-ratio`         | Andelen faktiske oversettelser per lokalitet (identisk med engelsk / plassholder / manglende oppføringer utenfor tillatelseslisten) må ikke overstige `config/quality/i18n-translation-baseline.json` + slingringsmonn | **Rådgivende** |

Krever `fetch-depth: 0` — verdi-drift-porten kjører diff av `en.json` mot merge-basen.

#### `check-ui-value-drift` — port mot foreldede oversettelser

Fanger den ene i18n-regresjonen de andre portene strukturelt ikke kan se: en engelsk verdi
blir omskrevet, og oversettelsene som er avledet fra den _forrige_ engelske teksten blir
værende igjen, slik at ikke-engelskspråklige brukere fortsetter å lese selvsikkert
formulert, men nå feilaktig tekst.

Dette skjedde faktisk. `oauthModal.googleOAuthWarning` ble omskrevet da
Antigravity-innloggingshjelperen landet (#5203); **39 av 43 lokaliteter** beholdt tekst som
ba operatørene om å «kopiere hele URL-en og lime den inn nedenfor» — en flyt som ikke kan
fullføres for den tilbyderen. Det forble uoppdaget frem til #8463 fordi:

- `sync-ui-keys` fyller bare ut nøkler som **mangler**, aldri nøkler som er **foreldede**;
- `check-ui-keys-coverage` teller nøkkel-_tilstedeværelse_, så en foreldet oversettelse regnes som dekket;
- `check-translation-drift` sporer dokumentasjonsspeilingene `docs/i18n/<locale>/**.md` —
  den leser aldri `src/i18n/messages/*.json`. Blokkerende i jobben `docs-sync-strict` siden
  gjen-synkroniseringen i 2026-09: rediger et kjernedokument → `npm run i18n:run -- --files=<doc>` (seksjonsnivå, billig).

**Diff-bevisst, ikke baseline-basert.** Den sammenligner `en.json` ved merge-base mot
arbeidstreet; for hver nøkkel der den engelske verdien er endret, er ethvert språk som
fortsatt har en urørt oversettelse foreldet. Dette **fryser bevisst eksisterende gjeld** —
en diff kan ikke avsløre hvilken gammel engelsk tekst en gammel oversettelse stammer fra,
så porten vurderer bare det den gjeldende endringen berører. Alternativet (en hash-baseline
per nøkkel) ville kostet en generert fil på ~600 KB, 3× den største eksisterende baselinen,
og ville blitt omskrevet på hver i18n-PR.

To måter å oppfylle den på:

1. oppdater de berørte oversettelsene, eller
2. sett dem til `__MISSING__:<new english>` — kjøretiden serverer da den korrigerte
   engelske teksten (`src/i18n/request.ts::deepMergeFallback`, #7258) og nøkkelen legges
   i kø for oversettelse.

Hvis strengens **betydning** er endret, foretrekk å **gi nøkkelen et nytt navn**: en ny
nøkkel kan ikke arve en foreldet oversettelse. Det er mønsteret #8463 brukte.

```bash
npm run i18n:check-value-drift          # streng (det CI kjører)
npm run i18n:check-value-drift:warn     # kun rapport
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Avslutter med 0 og `SKIP reason=base-unresolved` når basekatalogen ikke kan leses (grunn
klone uten base-ref-en), på samme måte som `check-openapi-breaking`.

### Jobb: `i18n`

Full i18n-valideringsmatrise (én jobb per språk). Hele jobben er rådgivende.

| Skript                          | Validerer                             | Blokkerende                                               |
| ------------------------------- | ------------------------------------- | --------------------------------------------------------- |
| `validate_translation.py quick` | Oversettelsesfullstendighet per språk | **Rådgivende** (`continue-on-error: true` på hele jobben) |

### Jobb: `pr-test-policy`

Kjører kun på pull requests.

| Skript                 | Validerer                                                                                                                           | Blokkerende |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check:pr-test-policy` | PR-er som endrer produksjonskode i `src/`, `open-sse/`, `electron/` eller `bin/` må inkludere eller oppdatere tester (Hard Rule #8) | Ja          |
| `check:test-masking`   | Endrede testfiler reduserer ikke netto antall asserts og legger ikke til `assert.ok(true)`-tautologier                              | Ja          |
| `check:pr-evidence`    | PR-teksten henviser til test-/VPS-bevis for endringen (mekaniserer Hard Rule #18 ved å grepe i PR-prosaen — skjørt, se Backlog)     | Ja          |

### Jobb: `test-vitest`

Kjører etter `build`. Blokkerer merge ved feil.

| Testsuite        | Validerer                                                  | Blokkerende                                                                                                       |
| ---------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-server (110 verktøy), autoCombo, cache — vitest-runner | Ja                                                                                                                |
| `test:vitest:ui` | UI-komponenttester — vitest-runner                         | **Blokkerende** — eksisterende feil er eksplisitt ekskludert i `vitest.config.ts`; nye feil gjør at jobben feiler |

### Nattlige arbeidsflyter (planlagte, rådgivende)

Disse kjører etter en cron-plan (og `workflow_dispatch`), aldri på PR-er. Alle er rådgivende.

| Arbeidsflyt            | Validerer                                                                                                                                                        | Blokkerende    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | fast-check-egenskapstester med tilfeldig seed + høyt antall kjøringer                                                                                            | **Rådgivende** |
| `nightly-resilience`   | heap-vekst-port, kaosbasert feilinjeksjon, k6-belastning/soak                                                                                                    | **Rådgivende** |
| `nightly-llm-security` | promptfoo-injeksjonsbeskyttelse (blokkeringsmodus) + garak-sonder (hoppes over uten en leverandørhemmelighet)                                                    | **Rådgivende** |
| `nightly-schemathesis` | OpenAPI-kontraktfuzzing (schemathesis) mot en kjørende OmniRoute med `docs/openapi.yaml` — avdekker brudd på spesifikasjonen / ubehandlede 500-feil (Fase 8 B.4) | **Rådgivende** |
| `nightly-mutation`     | Stryker-mutasjonstestscore over det raske enhetstestsporet — overlevende mutanter avdekker svake asserts                                                         | **Rådgivende** |
| `nightly-compat`       | Node-motorkompatibilitetsmatrise over de støttede `engines.node`-områdene                                                                                        | **Rådgivende** |

Ytelsesbaseliner (heap, TTFB, byggetid) registreres og brukes ikke som sperre: se [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
