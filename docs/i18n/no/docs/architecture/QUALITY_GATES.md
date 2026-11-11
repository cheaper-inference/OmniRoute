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

Arbeidsflytene CI og Quality Gates avgir hver sin stabile dom: `Gate / CI` og `Gate / Quality`. Deres versjonerte opptakspolicy oppregner hver oppstrømsjobb etter behov eller rådgivende. En aktuell påkrevd jobb må lykkes: manglende, kansellert, hoppet over, ventende og ukjente resultater kan ikke etablere PASS. En gyldig klassifisering kun for dokumenter eller kun katalog kan gjøre en kodefelt ubrukelig; et ordinært utkast til PR er ikke en akseptert kandidat. Et `hotfix` merke gir ikke avkall på bevis.

Begge arbeidsflytene dekker PRs inn i main/release grener, push til `main`, manuell utsendelse og sammenslåingsgruppehendelser. Push, send og flette-gruppe kjører hele utvalget. Et klarert Mergify-køutkast kjører også aktuelle `full-code`/`full-code-e2e` -jobber; vanlige PRs hoppe over dem. Før en manuell sammenslåing, kjør en fullstendig utsendelse på den eksakte kandidaten. Pusher til `release/**` starter ikke disse arbeidsflytene; Release-Green observerer den sammenslåtte basen separat (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks og sammenslåingsgrupper bruker vertsbaserte løpere for jobber som ellers velger selvvertsbaserte løpere; tilstrekkelig vertskapasitet må verifiseres før utrulling.

En vanlig PR kjører det raske utvalget. `full-code` og `full-code-e2e` banene til opptakspolicyen (E2E, integrasjon, pakkeartefakt, Electron røyk, Bun SQLite, økosystem- og protokollklienter) kjører bare på et Mergify-køutkast eller på en full kjøring: `gh workflow run ci.yml --ref <branch>`.

Hver JSON -kvittering identifiserer utsjekket SHA, arbeidsflytkjøring og forsøk. CLI avviser en checkout/event SHA mismatch. Arbeidsflyttester binder policymedlemskap til domsjobbens `needs` liste, slik at en ny eller fjernet bane ikke kan forsvinne stille. Kvitteringene dekker deres egen arbeidsflyt, ikke publisering, distribusjon eller interndelen av en eksisterende rådgivende skanner. Å foreta de gjeldende kontrollene som kreves i grenreglene er en separat administrativ endring; å definere jobbene deres beskytter ikke i seg selv en gren.

`API Route Typecheck` er en uavhengig arbeidsflytsjekk, utenfor både aggregerte dommer og den lokale fulle observatørens statiske profil. Inspiser resultatet separat for den eksakte kandidaten. `.github/workflows/api-route-typecheck.yml` kjører på PRs til `main` eller `release/**`, pusher til enten grenfamilie, manuell utsendelse og `merge_group` hendelser av typen `checks_requested`. Den har ikke noe banefilter. Slå sammen grupper sjekk ut `merge_group.head_sha`; andre arrangementer sjekk ut `github.sha`. Alle hendelser bruker de samme API diagnostiske gate- og gateenhetstestene. PR -base-retargets ber om en ny sjekk; body/title redigeringer bruker kun observasjonsnavnet `Admission not requested / API Route Typecheck` og kan ikke erstatte opptakssjekken.

### Beholdt bevis i akseptreduseringen

`scripts/quality/validate-release-acceptance.mjs` reduserer en levert plan og dens manifester; det fastslås ikke at planen dekker hele utslippsrørledningen. Rapportene angir eksplisitt `releaseAcceptance: false`, selv når planen er `VERIFIED`. `release-acceptance.yml` arbeidsflyten bruker fortsatt skyggearmaturer, ikke ekte bygge-, pakke-, oppstarts- eller kampanjekvitteringer.

CLI krever at `--evidence-root` bekrefter beholdt bevis. Filer løses som `<evidence-root>/<artifact_id>/<member>` og hashes som SHA-256. En PASS -post uten bevis, en manglende eller endret fil, en usikker bane eller en symbolkobling forhindrer verifisering. Manglende filer tilsvarer ikke tomme vellykkede logger. Eksisterende SHA/run/attempt sjekker forblir uavhengige: matchende byte kan ikke redde en foreldet kvittering. Filintegritet er ikke bevis på eksekveringsautentisitet eller artefaktpromotering.

### DAST bruker det verifiserte CI -bygget

Den nødvendige `dast-smoke` CI jobben kaller `.github/workflows/dast-smoke.yml` etter `build`. Den følger det samme code/draft utvalget som bygget, inkludert støttet gaffel PRs, utgivelsesmål PRs og sammenslåingsgrupper. En manglende, mislykket, kansellert eller uventet hoppet over DAST -jobb blokkerer `Gate / CI`. Den gjenbrukbare arbeidsflyten har ingen uavhengig PR/dispatch utløser; manuell validering bruker CI utsendelse slik at bygget og forbrukeren forblir i en kjøring.

`scripts/ci/next-build-provenance.mjs` forsegler den fullstendige Next-artefakten med sin tjæresammenslutning, repository/event/run, produsentforsøk, head/base/checkout/tree, arbeidsflytidentiteter, låsefil, nøyaktig node version/ABI, plattform og bunter. DAST velger den uforanderlige artefakten ID fra `needs.build.outputs`, krever verifisering av nedlastingssammendrag, og hasheser uavhengig ZIP mot produsentsammendraget før de trekker ut de to godkjente medlemmene gjennom `scripts/ci/unpack-ci-build.py`. Manifestet og tjærearkivet må også samsvare med uavhengige produsentutdata før Next-treet trekkes ut. Den søker aldri etter den siste vellykkede filialbyggingen. En delvis rekjøring kan gjenbruke det samme produsentforsøket når ID og alle inngangene fortsatt samsvarer; kvitteringen registrerer begge forsøkene.

Forbrukeren forblir på en vertsbasert Linux løper med skrivebeskyttet depottillatelse og ingen depothemmeligheter. Den installerer produsentens eksakte Node-versjon, og setter deretter sammen CLI med `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` avviser en manglende frittstående server før eventuelle reservebygg; vanlige lokale CLI bygg beholder sin eksisterende reserve. Serverberedskap, Schemathesis og promptfoo må alle lykkes innenfor den uendrede 25-minutters jobbgrensen. En herkomstkvittering beviser inngangsidentitet og byte, ikke en vellykket DAST skanning. Artefaktutløp, løperavbrudd eller en mislykket skanner forblir ufullstendig eller mislykket bevis; det kan ikke bli PASS gjennom en rådgivende innpakning.

### UI utførelseskapasitet

CI kjører hele UI beholdningen som fire `test-vitest` matriseskår, hver med maksimalt to arbeidere per shard og den eksisterende 15-minutters jobbfristen. Den første shard kjører også MCP/autoCombo Vitest suiten. Det nødvendige jobbresultatet dekker hvert matriseben; svikt eller kansellering av ett shard kan ikke etablere kandidatopptak.

Den nattlige observatøren beholder en separat eksakt kandidatkvittering for hvert UI skår, inkludert MCP utførelsen i den første kvitteringen. Alle fire kvitteringer, logger og samsvarende utførelsesidentiteter kreves. Lokal `npm run test:vitest:ui` velger fortsatt hele suiten; en `--shard` kjøring er bare delvis bevis.

### Enhetsdekningssamling

De tolv enhetsskårene samler V8-dekning under deres eksisterende testutførelse. Et vellykket shard kjører `scripts/ci/compact-v8-coverage.mjs` for å komprimere de originale filene uten å generere en mellomliggende Istanbul-rapport. Den endelige dekningsjobben verifiserer alle tolv manifestene mot kandidaten SHA, kjøretid, kilderot og datahasher, og kjører deretter c8s reportere og eksisterende dekningsterskler. Inndata beholder c8s globale filnavnrekkefølge; forhåndssammenslåing per shard er usikker for blandet function/block dekning. Manglende, misdannede eller inkompatible shards mislykkes ved opptak. Mislykkede testskår beholder rå diagnostisk dekning separat; den kan ikke gå inn i den endelige sammenslåingen.

### Kvitteringer for fremdrift av enhetsutførelse

Den delte `test:unit:ci:shard` kommandoen registrerer `primary`, `dashboard` og `serial` fasene gjennom `scripts/ci/unit-progress-reporter.mjs`. Den vanlige testrapporten forblir tilgjengelig. En separat kvittering kun med metadata registrerer hver fils start og fullføring, og et 30-sekunders hjerteslag viser filene som fortsatt er aktive og deres forløpte tid. Den registrerer kun godkjenningslistede utførelsesmetadata; testbeskrivelser, utdata, feiltekster og hele miljøet er ikke serialisert.

CI beholder JSONL filene som `unit-progress-ci-<run>-<attempt>-<shard>`. En jobbtidsavbrudd kan forhindre senere opplasting; hjerteslag som allerede sendes ut, forblir diagnostiske bevis. Manglende hjerteslag kan også reflektere en blokkert eller avsluttet løperprosess. Disse kvitteringene beholder eksisterende testvalg, samtidighet, tidsfrister og utgangsstatus; de er ikke kandidat-opptaksdommer.

### Slå sammen kø

`queue` etiketten sender en PR til Mergify-køen (`.mergify.yml`). Mergify åpner et utkast til PR på en `mergify/merge-queue/` -gren, CI kjører hele utvalget der, og den originale PR smelter sammen når `Gate / CI`, `Gate / Quality` og `Merge integrity (changelog + generated skills)` passerer.

Mergify skriver sin køsammendrag inn i utkastets beskrivelse. Body/title-only `pull_request` `edited` -hendelser bruker en kjøringsspesifikk samtidighetsgruppe og kjører ikke klassifisering, testmatriser, sammenslåing av integritet eller opptaksdommen på nytt. Kontrollnavn kun for observasjon kan ikke erstatte `Gate / CI` eller `Gate / Quality`. En redigering som endrer målbasen ber om ny kandidatvalidering.

Etter en dekø vil ikke et push alltid sette PR i kø. Kommenter `@mergifyio queue` på det.

### Inventar for statisk skanning

Den versjonerte npm-alias-beholdningen og statisk skanning-medlemskapet lever i `config/quality/gate-manifest.json`. Kjør `npm run check:gate-manifest` for å validere skriptnavn og eksakte kommandoer mot `package.json`; tillegg, fjerninger og kommandodrift mislykkes både med den lokale kroken og endringsklassifiseringsjobbene i CI. Et alias er ikke en arbeidsflytjobb, matriseforekomst eller testtilfelle: disse tellingene må ikke presenteres som utskiftbare.

Bruk `npm run quality:scan -- --list` eller `npm run quality:scan:fast -- --list` for å inspisere de valgte aliasene uten å utføre dem. Løperen påkaller npm-inngangspunktet, slik at kjøretiden (inkludert Bun der den er konfigurert) bevares. Manifestet registrerer aliaser utenfor disse profilene som separat påkalt, og vedlikeholdskommandoer er forbudt i skrivebeskyttede skanneprofiler.

Disse profilene dekker kun den statiske skanningen. De sertifiserer ikke produkttester, dekning, emballasje, eksterne kontroller eller en kandidats fulle utgivelsesgodkjennelse. Arbeidsflytopptak bruker den tilknyttede `config/quality/admission-policy.json` og `scripts/quality/admission-verdict.mjs`. Utgivelsesobservatørprofiler forblir separate; inspisere gjeldende sjekker og kvitteringer uavhengig. Den fullstendige observatørens statiske kommandoer er deklarert i `config/quality/release-green-static-profile.json`, inkludert `audit:deps`, mutasjonstestvalg og translasjonssjekker. Lasteren validerer npm-kommandoer mot package.json og modellerte CI/Quality -deklarasjoner; den avviser drift i stedet for å utføre shell-tokens som argumenter. Nødvendig skanner SKIP/INCOMPLETE utgang kan ikke etablere PASS. Profilen registrerer eksterne ekskluderinger og erstatter ikke vertsbasert dekning, testmatriser, pakke- eller distribusjonsbevis. Prosainventaret nedenfor er en referanse, ikke et bevis på at en port faktisk gikk.

Skriptene lever under `scripts/check/` (policy porter) og `scripts/quality/` (ratchet engine). CI kilden til sannhet er `.github/workflows/ci.yml`.

### Publisert-base dokumentasjon helse

`.github/workflows/i18n-base-health.yml` observerer dokumentasjonshelsen etter utvalgte push til `main` og `release/v*`, og ved manuell utsendelse. Filtrene dekker dokumentasjon, root Markdown, `llm.txt`, oversettelse state/configuration og relevant i18n-verktøy. Den enkeltstående `Published base documentation health` jobben bruker vertsbasert Ubuntu og en frist på fem minutter. Den utfører skrivebeskyttet validering og skriver en diagnostisk kvittering uten en avhengighetsinstallasjon, oversettelse eller tilstandsadopsjon.

`scripts/i18n/check-base-health.mjs` krever null kilde-hash, missing-target, target-hash, foreldet-oversettelse og seksjonsbuffer-inkonsekvenser. Den validerer også gjeldende kjerne document/locale omfang og dets registrerte herkomst. Ugyldig kontekst, ufullstendig dekning eller en avbrutt kontrollør produserer `INCOMPLETE`; bekreftet drift produserer `FAIL`. Begge returnerer en sviktende utgangsstatus. Kvitteringen er bundet til utsjekking av SHA, arbeidsflyt, kjøring og forsøk, og beholdes som `i18n-base-health-<sha>-<run>-<attempt>`.

Dette er en uavhengig observasjon av den publiserte basen. Den legger ikke til en PR eller sammenslåingsgruppehendelse, en nødvendig PR sjekk, et npm-alias eller et statisk skanningsprofilmedlem. Den underliggende brikken blokkerer også alle fem klassene i absolutt modus. Vanlig PR forberedelse forblir atskilt fra innleggelse. En vellykket opplasting kan ikke gjøre et mislykket helseresultat til PASS.

En vanlig PR bruker `--preflight` med en basisrapport generert av `--baseline-evidence`. Det kan bare la en engelsk kilde vente når den fullstendige oversettelsesposten og de faktiske målbytene er uendret fra den eksakte basen. Nye mål- eller seksjonsbuffer-inkonsekvenser blokkerer fortsatt, og ufullstendig bevis kan ikke autorisere forberedelse. Rapporten avslører `preparationPending` og `mergeReady` hver for seg: vellykket forberedelse gjør ikke ventende oversettelser klare for sammenslåing. Oppdater de berørte speilene i den sammensatte kandidaten før opptak. Den pålitelige Mergify-køkandidaten, `merge_group`, gren-push og manuelle CI kjøringer bruker den absolutte kontrollen, uten `--warn` eller arvet feiltilgivelse. Manglende målhasher og et omfang redusert med slettede innspilte kjernefiler kan ikke gi en vellykket absolutt dom.

### Slipp PR fast-path (`quality.yml`)

`.github/workflows/quality.yml` utfyller CI på main/release PRs, pusher til `main`, sender ut og slår sammen grupper. PRs bruker banefiltrerte hurtigsjekker. Det permanent deaktiverte duplikatbygget ble fjernet. de ekte build/package/boot sjekkene forblir i CI. Enhetspakken og vitest kjører kun i CI (`Unit Tests (N/12)` og `Vitest`).

| Jobb                                             | Omfang                                                                                                                                                                                          | Blokkering           |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs og docs-all                                                                                                                                                        | Ja                   |
| `Fast Quality Gates`                             | Kode PRs; statiske kontroller, typesjekk, dashbordtypesjekk, påvirkede enhetstester                                                                                                             | Ja                   |
| `Forgotten sibling tests`                        | Kode PRs; endrede moduler sporet til statiske forbrukere og søskenkandidater; fat- og dynamisk-import-baner rapporteres som rådgivende diagnostikk, med refererte unntak fra godkjenningslisten | **Rådgivende**       |
| `No new ESLint warnings`                         | Kode PRs; lobeskyttelse som er bevisst på undertrykkelse                                                                                                                                        | Ja, inkludert gafler |
| `Merge integrity (changelog + generated skills)` | Ikke-utkast til PRs; endringslogg og generert ferdighetssynkronisering                                                                                                                          | Ja, inkludert gafler |

#### Glemt søskenprøverapport

`npm run check:forgotten-sibling-tests` kjører som et rådgivende trinn for `Fast Quality Gates` og gjenbruker importløseren bak test-effektkartet. For hver endret produksjonsmodul rapporterer den deterministiske `changed module/symbol -> static consumer -> candidate sibling test` kjeder når kandidattesten er fraværende fra pull-request diff. Markdown-sammendraget og JSON resultatet beholdes som `forgotten-sibling-tests` arbeidsflytartefakt for kalibrering før blokkeringsutrulling.

Reeksport av fat og dynamisk import er kun oppløsningsdiagnostikk; de skaper aldri et blokkerende funn. Anmeldte unntak live i `config/quality/forgotten-sibling-allowlist.json`. Hver oppføring må navngi forbruker- og kandidattesten, gi en spesifikk begrunnelse og koble til et GitHub problem eller pull-forespørsel. Feilaktige oppføringer er ikke lukket. Unntak kan ikke undertrykke en slettet kandidattest eller en diff som legger til `.skip`/`.todo`; påstandssvekkelse og annen maskering forblir eid av den uavhengig blokkerende `check:test-masking` porten.

### Jobb: `lint`

Kjører på hver PR til `main`. Blokker smelter sammen ved feil.

| Skript (`npm run ...`)            | Validerer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Blokkering                                 |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Node.js versjonen er innenfor det støttede området                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ja                                         |
| `check:cycles`                    | Sirkulær import over hele `src/` + `open-sse/` (AST-basert, tsconfig `paths` løst). Bare utganger 1 når en syklus eksisterer (fail-closed siden #15281) og viser SCCs. `check:cycles:ratchet` (hva CI kjører) blokkerer når antallet overstiger `metrics.cycles` taket i `quality-baseline.json` — for øyeblikket 14, `direction: down`, så det kan bare falle (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja (skralle)                               |
| `check:boundary`                  | `open-sse → src` kobling: unik fil-til-fil-import fra motoren til appen (`scripts/quality/measure-boundary.mjs`; kantlisten er v4 core/module-split utbedringsetterslepet). Bare = rådgivende rapport (samme som `quality:boundary`). `check:boundary:ratchet` (hva CI kjører, også i `quality.yml` fast-gates ratchet loop) blokkerer når tellingen overstiger `metrics.boundaryOpenSseToSrc` taket i `quality-baseline.json` — seedet ved målt 771, `direction: down`; `--update` senker den bare; base-relativ på PRs (`--base-ref`, se nedenfor)                                                                                                                                                                                                                                                                                                                                                                                     | Ja (skralle)                               |
| `check:route-validation:t06`      | Zod skjemaer til stede på alle ruter (Tier 6-policy)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                         |
| `check:any-budget:t11`            | Antall `@ts-expect-error // any` overskrider ikke budsjett (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:provider-consistency`      | Hver leverandør i `providers.ts` har en matchende oppføring i `providerRegistry.ts` (og omvendt, innenfor godkjenningslisten)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                         |
| `check:model-lifecycle`           | De tre håndholdte rutetabellene forblir konsistente med det innsjekkede livssyklus-øyeblikksbildet (#11503): `FITNESS_TABLE` (`taskFitness.ts`) scorer ingen pensjonert id som `REGISTRY` kan rute; hvert `BUILT_IN_ALIASES` mål er tilstede i `REGISTRY` og fraværende fra øyeblikksbildet med pensjonert ID; hver pensjonert id fortsatt i `REGISTRY` videresendes eller oppført i `allowedRetiredInCatalog`; og ingen `DEFAULT_DEGRADATION_MAP` kilde eller -mål ser ut til å være trukket tilbake i det øyeblikksbildet. Dette beviser ikke at en modell for øyeblikket betjenes av en direkte oppstrøms. Offline — sammenligner med `config/quality/model-lifecycle.json`, oppdateres for hånd med `npm run quality:refresh-model-lifecycle` (nettverk; ikke koblet til CI). `allowedRetiredInCatalog` er en nedbrent skralle: legg til en oppføring bare med et sporingsproblem.                                                   | Ja                                         |
| `check:fetch-targets`             | Hver `fetch("/api/...")` i klientsiden `src/` løses til en ekte `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                         |
| `check:deps`                      | Alle `npm install` -able deps på tvers av hver `package.json` i repoen er i `dependency-allowlist.json`; nye unpinned eller slopsquatted pakker flagget                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ja                                         |
| `audit:deps`                      | npm revisjon av alle fem uavhengige låsefiler (root, Electron, OpenCode plugins v1/v2 og leverandør). Kritisk rådgivende blokk; høye advarsler forblir synlige advarsler. Missing/failed -revisjoner er INCOMPLETE og blokker; per-scope låsehasher og rapporter beholdes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                         |
| `check:lockfile`                  | `package-lock.json` integritet — https-register, integritets-hasher, ingen vertsoverstyringer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                         |
| `check:licenses`                  | SPDX -lisensgodkjenningsliste for produksjonsavhengigheter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                         |
| `check:tracked-artifacts`         | Ingen byggeartefakter / committerte `node_modules` symlinker (kjører også i husky pre-commit; pre-push er med vilje lett — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                         |
| `check:ai-attribution`            | Ingen AI/bot `Co-Authored-By` trailer eller AI-generasjons bunntekst i PR forplikter seg, tittel eller organ — Hard regel #16 (i `quality.yml` fast-gates loop for PR→ `release/**` — leser begivenhetens nyttelast, no-op off PRs — og kun et PR-trinn `ci.yml` lo for PR→ `main`; også huskyen `commit-msg` krok; menneskelige medforfattere tillatt; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:vitest-exclusions`         | Hver Vitest ekskludering navngir et sporingsproblem og vises i `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:file-size`                 | Kildefiler (`.ts`/`.tsx` i `src/`, `open-sse/`, `electron/`, `bin/`) holder seg innenfor `cap` og testfiler (`*.test.ts(x)`) innenfor `testCap`; filer frosset i `file-size-baseline.json` (`frozen` / `testFrozen`) må ikke vokse forbi den registrerte størrelsen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja                                         |
| `check:error-helper`              | Feilsvar i executors/handlers bruker `buildErrorBody()` / `sanitizeErrorMessage()` (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ja                                         |
| `check:migration-numbering`       | Migrering SQL filer er sekvensielt nummererte, ingen hull eller duplikater                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                         |
| `check:public-creds`              | Ingen bokstavelige OAuth `client_id`/`client_secret` eller Firebase Web-nøkler utenfor `publicCreds.ts` (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ja                                         |
| `check:db-rules`                  | Ingen rå SQL utenfor `src/lib/db/` moduler; ingen fat-import fra `localDb.ts` (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                         |
| `check:known-symbols`             | Leverandørutøvere, rutingstrategier og oversettere registrert i ekspedisjonstabellene deres samsvarer med filene på disken — ingen foreldreløse eller uerklærte symboler                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                         |
| `check:route-guard-membership`    | Hver rute som skaper en barneprosess er klassifisert av `isLocalOnlyPath()` (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                         |
| `check:test-discovery`            | Hver `*.test.ts` / `*.spec.ts` -fil i repoen samles inn av minst én testløper (ratchet: foreldreløse liste i `test-discovery-baseline.json` kan bare krympe)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:test-tla-order`            | Ingen `node:test` -fil under `tests/unit` registrerer en test, treffer en `await` på toppnivå, og registrerer deretter mer (#18045; skrall: `test-tla-order-allowlist.json` kan bare krympe)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:agent-skills-sync`         | Genererte artefakter med agentferdigheter samsvarer med kildekatalogen deres (ingen drift)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:provider-asset-provenance` | Leverandøren logos/assets har en registrert herkomstoppføring                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `lint:json`                       | JSON -konfigurasjonsfiler analyserer og tilfredsstiller repo-lint-reglene                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `typecheck:core`                  | TypeScript -kompilering uten feil (kun rådgivende advarsler)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `typecheck:noimplicit:core`       | Strenge `noImplicitAny` — fremtidsrettet; mange eksisterende samtalesider trenger fortsatt merknader                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **Rådgivende** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` scoped to `src/app/(dashboard)/**` (#7033) — `typecheck:core` kuraterte 27-filer tillatelsesliste inkluderer ikke noen dashboard TSX, og `next build` typesjekker den heller aldri (`next.config.mjs` setter `ignoreBuildErrors: true`), så foreldreløse identifikatorregresjoner der (#6625/#6909) var usynlige for CI. Forskjeller mot en frossen per-file/per-TS-code telling baseline (`config/quality/dashboard-typecheck-baseline.json`, samme foreldede håndhevingsmønster som `check:known-symbols`) — bare NEW feil utover den baselinede tellingen mislykkes i porten; ratched ned med `--update` når en allerede eksisterende feil er fikset.                                                                                                                                                                                                                                                                           | Ja                                         |
| `check:build-typecheck`           | Produksjonstype for hele apper sjekker over `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), overflaten `typecheck:core` 27-filer godkjenningsliste og dashbordporten dekker ikke. Forskjeller mot `config/quality/build-typecheck-baseline.json`; en ny eller hevet per-(fil, kode) telling mislykkes, en lavere telling ber deg om å ratchet. `--update` nekter mens løpet inneholder et nytt eller hevet par med mindre `--force-regressions` er bestått, og nekter en nylig stanset fil med mindre `--force-nocheck` er bestått, så å utvide grunnlinjen for å bli grønn og gi en permanent stillhet er to separate bevisste handlinger. En bar `--force` avvises. Skanner også byggeomfanget for `@ts-nocheck` mot `config/quality/ts-nocheck-baseline.json`, fordi en fil som bruker den rapporterer ingen diagnostikk i det hele tatt og ellers ville være usynlig for alle porter. | Ja                                         |

#### To typesjekk-programmer svarer forskjellig

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) og `check:build-typecheck` kompilerer forskjellige programmer under forskjellige alternativer, og den samme filen kan være ren i den ene og full av feil i den andre.

`tsconfig.build.json` setter `"strict": false`, så `noImplicitAny` er av. Kjernekonfigurasjonen kompilerer en kurert 27-filers godkjenningsliste med strengere alternativer og følger hver oppførings importgraf, så filer som aldri vises i byggeprogrammet blir fortsatt sjekket der.

Konsekvensen er viktig når man skal vurdere om en fil er skrevet:**null diagnostikk under `check:build-typecheck` betyr ikke null** . Fjerning av `@ts-nocheck` fra 26 filer viste at 23 av dem var rene i byggeprogrammet; seksten av dem dukket opp rundt 120 implisitte feil i den strenge. Sjekk begge før du kaller en fil ren.

### Jobb: `quality-gate`

Kjører etter `test-coverage`. Blokker smelter sammen ved feil.

| Manus                        | Validerer                                                                                                                                                | Blokkering                 |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `quality:collect`            | Sender ut `quality-metrics.json` (ESLint advarsler, dekning fra sammenslått shard-rapport)                                                               | Ja (oppstrøms for skralle) |
| `quality:ratchet`            | Hver beregning i `quality-baseline.json` har ikke regressert (ESLint advarsler ≤ grunnlinje; dekning ≥ grunnlinje)                                       | Ja                         |
| `check:duplication`          | Kodeduplisering (jscpd@4) overskrider ikke baseline i `quality-baseline.json`                                                                            | Ja                         |
| `check:complexity`           | Syklomatisk kompleksitet på filnivå overskrider ikke grensen (kjerne ESLint `complexity` + `max-lines-per-function`)                                     | Ja                         |
| `check:cognitive-complexity` | Kognitiv kompleksitet ratchet (`eslint-plugin-sonarjs`) — separat ESLint pass; CI kjører begge slått sammen som enkelt `check:complexity-ratchets` trinn | Ja                         |
| `check:dead-code`            | Ubrukte eksporter / filer ratchet (knip) regresserer ikke vs grunnlinje                                                                                  | Ja                         |
| `check:compression-budget`   | Komprimeringsreferansebudsjett — per-motor token-sparegulv må ikke gå tilbake                                                                            | Ja                         |
| `check:type-coverage`        | Prosent-type skralle (`type-coverage`) går ikke tilbake; subsumerer i stor grad `typecheck:noimplicit:core`                                              | Ja                         |

### Jobber: `codeql-scan` og `codeql-admission`

`codeql-scan` produserer alle konfigurerte analysekategorier. Etter at jobben har lykkes, validerer `codeql-admission` sine eksakte opplastinger og kandidatvarslingsratchet. Begge er obligatoriske avhengigheter av `Gate / CI`, inkludert kandidater som kun er for dokumenter. Kravene til administrativ aktivering og kanarifugler er beskrevet under "CodeQL skralle" nedenfor.

| Manus                  | Validerer                                                                                                                                                                             | Blokkering |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:codeql-ratchet` | Kandidat ref/SHA og alle konfigurerte analysekategorier må være aktuelle før varslingsratchet; manglende bevisblokker. Global inventar forblir separat — se "CodeQL skralle" nedenfor | Ja         |

### Jobb: `quality-extended`

Jobben blokkerer aktuelle kandidater. Buntstørrelse, hemmelige funn, sårbarhetsfunn, arbeidsflytfunn og OpenAPI endringer kontrolleres med nødvendige skralle. Sirkulær avhengighetsdiagnostikk forblir rådgivende. Skannerinstallasjon er nødvendig: `scripts/ci/install-quality-scanners.sh` sørger for festede versjoner og sprer installasjonsfeil. Manglende verktøy, ugyldige rapporter eller manglende grunnlinjer forlater den nødvendige skannerporten INCOMPLETE.

| Manus                    | Validerer                                                                                                                                                                                                       | Blokkering                                      |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `check:circular-deps`    | Ingen sirkulære avhengigheter (dpdm)                                                                                                                                                                            | **Rådgivende**                                  |
| `check:bundle-size`      | Buntstørrelsen overstiger ikke hetten; en utilgjengelig måling mislykkes                                                                                                                                        | **Blokkering med --ratchet**                    |
| `check:secrets`          | Gitleaks-funn går ikke tilbake; nødvendige skanninger avviser manglende tools/source/baseline, mislykkede skanninger og ugyldige rapporter                                                                      | **Blokkering med --ratchet**                    |
| `check:vuln-ratchet`     | Avhengighetssårbarheter går ikke tilbake; nødvendige skanninger avviser manglende verktøy, ugyldige rapporter eller manglende grunnlinjer                                                                       | **Blokkering med --ratchet**                    |
| `check:workflows`        | Arbeidsflyt lo (actionlint + zizmor); missing/broken -skannere, ugyldige rapporter eller manglende ratchet-grunnlinje mislykkes som INCOMPLETE. Gyldige funn følger den valgte strict/advisory/ratchet policyen | Utførelse kreves; zizmor skralleblokkering i CI |
| `check:openapi-breaking` | Offentlig API kontrakt mot festede hendelsesforpliktelser (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); nødvendig måling mislykkes lukket                             | **Blokkering med --ratchet**                    |

### Jobb: `docs-sync-strict`

For pull-forespørsler til `main` eller `release/**`, kjører denne jobben kun for kandidater som ikke er utkast (eller klarerte kø) klassifisert som dokumentasjon eller kodeendringer. Den kjører også på ikke-PR CI arrangementer; denne arbeidsflytens push-trigger dekker kun `main`, ikke `release/**`. Et trinn som går ut av ikke-null blokkerer jobben; rapporter bare funn og dokumenterte unntak nedenfor gjør det ikke.

| Manus                          | Validerer                                                                                                                                                                                                                                                                                                                                                                                                               | Blokkering                                                                                                                                |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-gate som kjører de 7 underportene under sekvensielt                                                                                                                                                                                                                                                                                                                                                                | Ja                                                                                                                                        |
| ↳ `check:docs-sync`            | Package/OpenAPI/CHANGELOG versjonskonsistens, eksakte `llm.txt` speil, oversatte CHANGELOG section/size invarianter og fravær av erstattede dupliserte dokumenter                                                                                                                                                                                                                                                       | Ja                                                                                                                                        |
| ↳ `check:docs-frontmatter`     | Kompilerte dokumentasjonssider har gyldige frontmatter-titler                                                                                                                                                                                                                                                                                                                                                           | Ja                                                                                                                                        |
| ↳ `check:docs-counts`          | Invarianter med høy konfidenstelling er strenge; heuristiske filtellingskontroller advarer bare med mindre skriptet mottar `--strict` ( CI meta-porten passerer den ikke)                                                                                                                                                                                                                                               | streng blokkering; soft tier rådgivning                                                                                                   |
| ↳ `check:env-doc-sync`         | Source env reads, `.env.example` og `docs/reference/ENVIRONMENT.md` samtykker etter de eksplisitte ignorerings-, doc-only og env-only-godkjenningslistene                                                                                                                                                                                                                                                               | Ja, utenfor de dokumenterte godkjenningslistene                                                                                           |
| ↳ `check:deprecated-versions`  | Rapporterer potensielle foreldede versjoner utenfor sikre historiske kontekster og foreldede oppdateringsdatoer, unntatt ignorerte dokumenter                                                                                                                                                                                                                                                                           | Rådgivende i gjeldende CI kabling (`--strict` er ikke bestått)                                                                            |
| ↳ `check:doc-links`            | Interne markdown-lenker i dokumenter løses til ekte filer (`[text]`/`(path)` -skjema)                                                                                                                                                                                                                                                                                                                                   | Ja                                                                                                                                        |
| ↳ `check:fabricated-docs`      | Ruter, env vars, CLI kommandoer, kroknavn og filstier sitert i dokumenter finnes i kodebasen. Hard gate via `--strict`; soft-fail uten flagg.                                                                                                                                                                                                                                                                           | Ja (via `--strict` i CI)                                                                                                                  |
| `check:cli-i18n`               | Brukte CLI `t()` nøkler finnes i `en`; `pt-BR` beholder hver seksjon på toppnivå; `zh-CN` og `zh-TW` inneholder hver nøkkel fra `en`                                                                                                                                                                                                                                                                                    | Ja                                                                                                                                        |
| `check:openapi-coverage`       | OpenAPI -spesifikasjonen dekker minst et skraltegulv av ekte ruter                                                                                                                                                                                                                                                                                                                                                      | Ja                                                                                                                                        |
| `check:openapi-security-tiers` | Erklærte `x-loopback-only`/`x-always-protected` -merknader må støttes av `routeGuard.ts`; blokk med parser og videresende uoverensstemmelser. Omvendt sjekk for manglende `x-loopback-only` under prefikser kun lokalt advarer, og ruter med kun mønster er ekskludert fra den omvendte gjennomgangen.                                                                                                                  | Parser/forward sjekker blokkering; omvendt sjekk rådgivende                                                                               |
| `check:openapi-routes`         | Hver `/api...` bane i `openapi.yaml` løser parameterufølsomt til en reell rute etter den berettigede `KNOWN_STALE_SPEC` godkjenningslisten; foreldede godkjenningslister mislykkes også                                                                                                                                                                                                                                 | Ja                                                                                                                                        |
| `check:docs-symbols`           | Interne `/api/...` URL referanser i kanoniske ikke-speildokumenter løses til en ekte rute eller rutefamilie; proxy/upstream/placeholder/file referanser og berettigede `KNOWN_STALE_DOC_REFS` oppføringer er ekskludert, og foreldede tillatelseslisteoppføringer mislykkes                                                                                                                                             | Ja                                                                                                                                        |
| `i18n translation drift`       | Absolutt innrømmelse krever null kilde, manglende mål, målhash, foreldet oversettelse og seksjonsbufferinkonsekvens. Vanlige PR preparater kan beholde eksakte nedarvede bevis eller en ventende endring kun på engelsk med uendret fullstendig tilstand og målbyte; rapporten erklærer separat sammenslåing. Manglende mål-hasher og ufullstendig basisbevisblokk. En fraværende eldre seksjonsbuffer er ikke en feil. | Alle fem klassene blokkerer queue/base opptak; ordinære forberedelsestillatelser kun påvist nedarvet eller kun på engelsk ventende arbeid |

De tolv README SVGs under `docs/diagrams/` genereres (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` regenererer dem alle). Hver har en byte-sammenligningsenhetstest (`tests/unit/docs/readme-*-svg.test.ts`, jobb `test-unit`) som mislykkes når den forpliktede filen er foreldet, og `check:docs-counts` leser kanoniske tall fra deres `<text>` noder — og det er grunnen til at skisseringstrinnet holder hver skisserte streng i filen som usynlig `<text>`. SVG kanoniske tall-sjekken leser filene oppført i `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, pluss `public/images/tier-flow-dark.svg` og `tier-flow-light.svg`; påstandene om gratis-for alltid, katalogoppføring, gjentakende pool og poengfaktorer er også `promise-pillars.svg`, `free-tier-budget.svg` og `strategies-grid.svg`. `free-tier-budget.svg` henter tallene sine fra den levende kataloglasteren, så en endring til `FREE_MODEL_BUDGETS` eller til en leverandørs visningsnavn vil røde CI til den filen er regenerert.

### Jobb: `i18n-ui-coverage`

| Manus                             | Validerer                                                                                                                                                                                            | Blokkering     |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | UI i18n nøkkeldekning er ≥ 65 %                                                                                                                                                                      | Ja             |
| `check-ui-value-drift` (inline)   | En omskrevet engelsk **verdi** etterlater ingen gammel oversettelse                                                                                                                                  | Ja             |
| `check-new-key-coverage` (inline) | EN **ny** Engelsk nøkkel oversettes i hver lokalitet — en `__MISSING__:` -markør blir avvist                                                                                                         | Ja             |
| `check-translation-ratio`         | Real-oversettelsesforhold per lokalitet (identisk-til-engelsk / plassholder / manglende blader utenfor godkjenningslisten) må ikke overstige `config/quality/i18n-translation-baseline.json` + slakk | **Blokkering** |

Trenger `fetch-depth: 0` — skiller verdidriftporten `en.json` mot fusjonsbasen.

#### `check-ui-value-drift` — gammel oversettelsesport

Fanger den ene i18n-regresjonen som de andre portene strukturelt ikke kan se: en engelsk verdi skrives om og oversettelsene avledet fra den _forrige_ engelsken blir igjen, så ikke-engelske brukere fortsetter å lese selvsikkert formulert, nå feil kopi.

Dette ble sendt på ekte. `oauthModal.googleOAuthWarning` ble skrevet om da Antigravity -påloggingshjelperen landet (#5203);**39 av 43 lokaliteter** holdt tekst som forteller operatørene om å "kopiere hele URL og lime den inn under" — en flyt som ikke kan fullføres for den leverandøren. Det gikk ubemerket frem til #8463 fordi:

- `sync-ui-keys` fyller kun ut nøkler som er **fraværende** , aldri de som er det **foreldet** ;
- `check-ui-keys-coverage` teller nøkkelen _tilstedeværelse_, så en foreldet oversettelse scorer som dekket;
- `check-translation-drift` sporer `docs/i18n/<locale>/**.md` -dokumentasjonen speiler — den leser aldri `src/i18n/messages/*.json`. Blokkering i jobb `docs-sync-strict` siden re-synkroniseringen i 2026-09: rediger et kjernedokument → `npm run i18n:run -- --files=<doc>` (seksjonsnivå, billig).

**Diff-bevisst, ikke baseline-støttet.** Den sammenligner `en.json` ved flettebasen med arbeidstreet; for hver nøkkel hvis engelske verdi er endret, er enhver lokalitet som fortsatt har en uberørt oversettelse foreldet. Dette med vilje **fryser eksisterende gjeld** — a diff kan ikke avsløre hvilken gammel engelsk en langvarig oversettelse kom fra, så porten bedømmer kun hva den nåværende endringen berører. Alternativet (en per-nøkkel-hash-baselinje) vil koste en ~ 600 KB -generert fil, 3 × den største eksisterende grunnlinjen, og churning på hver i18n PR.

To måter å tilfredsstille det på:

1. oppdatere de berørte oversettelsene, eller
2. sett dem til `__MISSING__:<new english>` — kjøretiden serverer deretter den korrigerte engelsken (`src/i18n/request.ts::deepMergeFallback`, #7258) og nøkkelkøene for oversettelse.

Hvis strengen er **betydning** endret, foretrekker **gi nytt navn til nøkkelen** : en ny nøkkel kan ikke arve en gammel oversettelse. Det er mønsteret #8463 brukte.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Verdidrifts- og nynøkkelportene deler én uforanderlig sammenligning fra `scripts/i18n/resolve-ui-diff-base.mjs`. Arbeidsflyten sender samme base, base-tip og kandidat SHAs til begge sjekkene. PR/base-retarget, push og merge-group-kjøringer bruker deres hendelseskontekst. Sending av en kandidatgren krever dens eksakte åpne PR eller den eksplisitte `i18n_base_sha` inngangen. Utsendelse eller planlagt observasjon av `main` eller `release/vX.Y.Z` uten den inndata sammenligner den siste commit med dens første forelder; det er ikke en revisjon av all nedarvet oversettelsesgjeld. Lokal påkalling krever en eksplisitt sammenligningsbase, for eksempel `BASE_REF` kommandoen ovenfor.

Manglende eller tvetydig sammenligningskontekst, en uleselig eller ugyldig nødvendig katalog, og en endret kandidat produserer `INCOMPLETE` med utgangskode **2** , inkludert i advarselsmodus. Katalogleser bruker `scripts/i18n/read-ui-catalog.mjs`; lesefeil erstattes ikke med tomme objekter. Verken en utilgjengelig base eller ufullstendig inndata etablerer PASS.

### Jobb: `i18n`

Full i18n-valideringsmatrise (én jobb per lokalitet). Hele jobben er rådgivende.

| Manus                           | Validerer                              | Blokkering                                                |
| ------------------------------- | -------------------------------------- | --------------------------------------------------------- |
| `validate_translation.py quick` | Fullstendig oversettelse per lokalitet | **Rådgivende** (`continue-on-error: true` på hele jobben) |

### Jobb: `pr-test-policy`

Kjører kun på pull-forespørsler.

| Manus                  | Validerer                                                                                                                         | Blokkering |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PRs som endrer produksjonskode i `src/`, `open-sse/`, `electron/` eller `bin/` må inkludere eller oppdatere tester (Hard Rule #8) | Ja         |
| `check:test-masking`   | Endrede testfiler reduserer ikke netto påstandsantallet eller legger til `assert.ok(true)` tautologier                            | Ja         |
| `check:pr-evidence`    | PR organ siterer test/VPS bevis for endringen (mekaniserer Hard Rule #18 ved å gripe PR prosa — skjør, se Backlog)                | Ja         |

### Jobb: `test-vitest`

Trenger `changes` -klassifiseringsjobben. Gjeldende matriseskår blokkerer sammenslåing ved feil.

| Suite            | Validerer                                                  | Blokkering                                                                                                        |
| ---------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 verktøy), autoCombo, cache — vitest runner | Ja                                                                                                                |
| `test:vitest:ui` | UI komponent tester — vitest-løper                         | **Blokkering** — forhåndseksisterende feil er eksplisitt ekskludert i `vitest.config.ts`; nye feil svikter jobben |

### Nattlige arbeidsflyter (planlagt, rådgivende)

Disse kjører på en cron-plan (og `workflow_dispatch`), aldri på PRs. Alle er rådgivende.

| Arbeidsflyt            | Validerer                                                                                                                                                  | Blokkering     |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | rask-sjekk egenskapstester med en tilfeldig frø + høy run count                                                                                            | **Rådgivende** |
| `nightly-resilience`   | haugvekstport, kaosfeilinjeksjon, k6 load/soak                                                                                                             | **Rådgivende** |
| `nightly-llm-security` | promptfoo injection guard (blokkeringsmodus) + garak-prober (hoppet over uten en leverandørhemmelighet)                                                    | **Rådgivende** |
| `nightly-schemathesis` | OpenAPI kontrakt fuzzing (skjematese) mot en live OmniRoute ved bruk av `docs/openapi.yaml` — overflater spesifikasjonsbrudd / uhåndtert 500s (Fase 8 B.4) | **Rådgivende** |
| `nightly-mutation`     | Stryker-mutasjonstesting over den raske enhetsbanen — overlevende mutanter overflatesvake påstander                                                        | **Rådgivende** |
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
- **rådgivende** — den globale totalen sammenlignet med den fryste referanseverdien. Nedarvet avvik markerer aldri en
  uskyldig PR som rød; avviket spores for utbedring ved avstemming av utgivelsen og overvåkes av
  headroom-jobben.

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

### CodeQL ratchet: kandidatopptak og lagerbeholdning

CI eier kandidat CodeQL opptak gjennom en eksplisitt avhengighetskjede: `codeql-scan` kaller den firespråklige matrisen i `codeql.yml`, deretter kjører `codeql-admission` `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` krever begge resultatene. Kvalitet beholder sine egne numeriske kontroller, men spør ikke skanneren før produsenten er ferdig; `Gate / Quality` alene er ikke fullstendig kandidatopptak. CodeQL er fortsatt påkrevd på kandidater som kun er for dokumenter.

Policyen i `config/quality/codeql-admission-policy.json` velger Handlinger, C/C++, JavaScript/TypeScript og Python, standard for spørringssuite, ekstern trusselmodell og byggemodus ingen. Produsent forhåndskontroll avviser en ventende aktiveringspost og forgrener seg utenfor den eksplisitte mållisten. De nåværende målene er hoved- og release/v3.8.54. kontraktstester sammenligner denne begrensede listen og vedlikeholds-push-utløseren med pakkeversjonen; neste utgivelse må gjennomgås onboarding. CI eksisterende bredere utgivelse av PR utløseren beholdes, men et uom bord mål rapporterer HOLD før ekstraksjon i stedet for å oppnå en umålt PASS.

Hver matrisejobb registrerer den faktiske SARIF opplastingen ID, språk, kategori, kjøring og forsøk, arbeidsflytidentitet for innringer, hendelse ref/head/base/merge SHA og policy-hash. Den avhengige jobben laster kun ned denne kjøringens kvitteringer og validerer artefaktsammendrag. Det krever alle fire kategoriene, en vellykket produsent og fullført behandling av hver eksakte opplasting. Den bruker API sarif_id-filter, ikke den siste analysen funnet på en gren. Delvis omkjøring kan gjenbruke vellykkede kategorier fra et tidligere forsøk av samme kjøring og kandidat, og bevarer det produserende forsøket; en mislykket nåværende produsent kan ikke gjenbruke tidligere grønne bevis.

CodeQL handlingen venter på behandling, men den festede implementeringen kan advare og fortsette etter en statuslesefeil eller utslitt ventetid. Opptak bekrefter derfor behandlingen på nytt. Manglende kategorier, ventende behandling, mislykkede eller kansellerte jobber, foreldet identitet, ufullstendig paginering eller utilgjengelig APIs produserer HOLD og avslutter 2. Ingen fast ventetid på en uavhengig skannerarbeidsflyt gjenstår. En uskannet PR kan ikke passere fordi en varselspørring returnerte 0. Et målt antall over `metrics.codeqlAlerts.value` avslutter 1; grunnlinjen er ikke hevet for å absorbere en annen grens varsler. [Last opp status og analyseoppslag](https://docs.github.com/en/rest/code-scanning/code-scanning).

Kvitteringen registrerer opplasting og analyse av IDs, kategorier, verktøyversjoner, ref/SHA, grunnlinje og varslingsnumre. SARIF identity/result antall, minimumsregeltellinger og eksakte varslingsforekomster forblir obligatoriske. PR/analysis identiteter kontrolleres på nytt før de godtas. Disse kontrollene etablerer konfigurert kategoridekning, ikke en oversikt over hver utpakkede kildefil. C/C++ no-build-utvinning inkluderer ikke kode generert under en prosjektbygging. Kildeekskluderinger trenger fortsatt gjennomgang, og bidragsyterattribusjon trenger sammenlignbare eksakte bevis.

`codeql-maintenance.yml` leverer push-skanninger med aktiv utgivelse og ukeplanen uten å duplisere PR/main produsenter. `nightly-codeql-inventory.yml` holder basislinjen for depotet atskilt, med `--strict-measurement` og en feil når måling er utilgjengelig. Den lokale arvesamlerens grasiøse hoppe er ikke kandidatopptak. Innstramming forblir en eksplisitt `--update` etter en bekreftet lavere global telling.

Den avanserte arbeidsflyten må ikke publiseres mens standardoppsett er konfigurert: GitHub avviser denne kombinasjonen. Den versjonerte retningslinjen forblir avventende til den reviderte administrative overgangen leses tilbake. Før publisering pinner en operatør repository, head/base/tree, policy/patch/rollback hashes og observert oppsetttilstand; `node scripts/quality/codeql-producer.mjs verify-admin-readback` sjekker de leverte forventede og faktiske JSON postene. Dette er en teknisk vakt, ikke operatørgodkjenning eller en erstatning for å hente ferske tilbakemeldinger. PR tokenet ber aldri om administrasjonstilgang. Utrulling og enhver skannerendring krever separat tilbakelesing pluss ekte PR, gaffel og sammenslåingsgruppe-kompatibilitetsbevis.

Forks bruker vertsbaserte løpere, utsjekking uten vedvarende legitimasjon, ingen prosjekt install/build i produsenten, og ingen nedarvede depothemmeligheter. GitHub støtter SARIF -opplasting for pull_request-hendelsen med sin reduserte gaffeltoken; Godkjenning av utførelse av førstegangsbidrag forblir GitHub retningslinjer. Bruk aldri pull_request_target for å kjøre uklarert kode. Bekreft faktiske token-tillatelser, analyse_nøkkel og alle kategorimiljøer i den kontrollerte kanarifuglen før du vurderer at migreringen er fullført. [Gaffelopplastingsregler](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [motstridende oppsettmoduser](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Oppsigelser er operatørens oppfordring (Hard Rule #14)** — avviser aldri et CodeQL varsel uten å registrere den tekniske begrunnelsen i avvisningskommentaren: `won't fix` for et oppstrømsprotokollkrav, `used in tests` for en testarmatur, `false positive` for et desinficeringsmiddel CodeQL ikke kan se (presedens: `docs/security/ERROR_SANITIZATION.md`).

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

## Retningslinjer for tillatelseslister

Alle kontrollporter som ikke kan feile på grunn av eksisterende brudd, bruker en fastlåst tillatelsesliste
(f.eks. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Retningslinjene er:

**Rett opp den underliggende årsaken; bruk tillatelseslisten bare når bruddet allerede eksisterer og
ikke kan rettes i samme PR.**

Når du legger til en oppføring i en tillatelsesliste:

1. Inkluder en kommentar med begrunnelsen.
2. Referer til sporingsproblemet (f.eks. `// #3498 — Phase 2 feature, not yet implemented`).
3. Fjern oppføringen i samme PR som retter bruddet — en foreldet oppføring som ikke lenger
   undertrykker et aktivt brudd, er i seg selv en feil (6A.3-kontrollen for foreldede håndhevelser vil
   få kontrollporten til å feile på en foreldreløs oppføring i tillatelseslisten når den er implementert).

**Ikke** legg til oppføringer i tillatelseslisten for å få tester til å bestå raskere. En grønn kontrollport med en voksende
tillatelsesliste gir en falsk trygghet om kvaliteten.

### Når en kontrollport feiler på PR-en din

1. **Les utdataene fra kontrollporten nøye** — de forteller deg nøyaktig hvilken fil eller hvilket symbol som brøt
   regelen.
2. **Rett bruddet** — de fleste kontrollporter er deterministiske filsystemkontroller som består så snart
   koden er riktig.
3. **Hvis bruddet allerede eksisterer** (dvs. at du ikke introduserte det, men kontrollporten nå
   dekker det): legg til en oppføring i tillatelseslisten med en begrunnende kommentar og et sporingsproblem.
4. **Hvis kontrollporten er en skrallemekanisme** (dekning, ESLint-advarsler, duplisering, kompleksitet):
   Endringen din gjorde måleverdien dårligere. Rett det underliggende problemet, eller kjør (i sjeldne tilfeller)
   `npm run quality:ratchet -- --update` hvis endringen er tilsiktet og forverringen av måleverdien
   er akseptabel — men dokumenter hvorfor i PR-beskrivelsen.
5. **Rådgivende kontrollporter** (`continue-on-error: true`) er kun informative — de blokkerer ikke
   sammenslåing, men vises i CI-sammendraget. Rett dem likevel.

---

## Legge til en ny port

1. Opprett `scripts/check/check-<name>.mjs` (eller `.ts`). Policyporter avsluttes med 0/1.
   Porter av skralletypen sender en måleverdi til `quality-metrics.json` via `collect-metrics.mjs`.
2. Legg til `"check:<name>": "node scripts/check/check-<name>.mjs"` i `package.json`, og
   synkroniser aliaset og den nøyaktige kommandoen i `config/quality/gate-manifest.json`.
   Utfør den samme synkroniseringen når du endrer eller fjerner et eksisterende valideringsalias.
   Kjør `npm run check:gate-manifest`; pre-commit-hooken og endringsklassifiseringen i CI
   håndhever denne kontrakten.
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

## Rasjonaliseringsetterslep (ROI-gjennomgang — fase 9, bølge 3)

Denne oversikten ble avstemt mot `ci.yml` 2026-06-17 (den forrige versjonen utelot
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). En ROI-gjennomgang av det avstemte settet
identifiserte følgende kandidater for rasjonalisering. **Sammenslåingene er mekaniske CI-
endringer; aktiveringene/fjerningene er policybeslutninger som er forbeholdt operatøren.** Ingenting nedenfor
er tatt i bruk ennå.

**Heller ikke dokumentert ovenfor** (rådgivende, lav signalverdi): jobben `docs-lint` (markdownlint + Vale, hele jobben `continue-on-error`) og de frittstående skannerarbeidsflytene `semgrep.yml` / `scorecard.yml`. CodeQL har nå obligatoriske produsent- og opptaksjobber under `Gate / CI`, med forbehold om aktiveringskravene ovenfor. `semgrepFindings: 0` finnes i `quality-baseline.json`, men er ikke koblet til en blokkerende ratchet i `ci.yml` — metrikken er for tiden uten tilknytning.

### Slå sammen / fjern duplikater (mekanisk, lavere risiko)

Hver kandidat ble validert mot gjeldende status for kontrollmekanismene 2026-06-17 (stol på, men verifiser);
flere «åpenbare» sammenslåinger viste seg å skjule teknisk gjeld og er **ikke** direkte utskiftbare.

- **`check:docs-sync` kjøres to ganger** — frittstående i `lint`-jobben og på nytt i `check:docs-all` (`docs-sync-strict`) og husky sin pre-commit-hook. ✅ **FERDIG** — den frittstående kjøringen i `lint` er fjernet.
- **CVE-skanning** — ❌ **IKKE en ren sammenslåing.** `audit:deps` blokkerer kritiske varsler og ufullstendige revisjoner på tvers av alle fem låsefilene, mens varsler med høy alvorlighetsgrad rapporteres som advarsler under gjeldende policy; `check:vuln-ratchet` (osv) feiler bare ved en _regresjon_ sammenlignet med den innsjekkede grunnlinjen og avviser manglende målinger når de er påkrevd. Ulik semantikk — å fjerne `audit:deps` ville eliminere den absolutte kontrollen for kritiske funn og de uavhengige kvitteringene fra pakkerevisjonen. Behold begge.
- **Syklusdeteksjon** — ✅ **FERDIG** (#15159 G-01/G-02). Den gamle teksten her kalte `check:cycles` den «grønne, kuraterte» kontrollen og begrunnet å beholde den som blokkerende fordi `check:circular-deps` (dpdm) rapporterte 91 sykluser. Det grønne resultatet var et **falskt grønt resultat**: `check:cycles` skannet 5 underkataloger (450 filer), fant bare statiske `import|export … from` og forkastet hver `@/`- og `@omniroute/open-sse/`-spesifikator, så den kunne ikke oppdage syklusene med dynamisk import og aliaser som dominerte repositoriet. Rettet: kontrollen går nå gjennom `src` + `open-sse` (5023 filer), samler spesifikatorer fra TypeScript-AST-en (slik at `import("…")` telles, mens `typeof import("…")` i typeposisjon ikke gjør det) og løser tsconfig-`paths`. Den finner **14** sykluser, ikke 0. Fordi 14 eksisterende sykluser ikke kan rettes i en PR for kontrollmekanismen, er `check:cycles` nå en **terskelmekanisme** (`--ratchet`, øvre grense `metrics.cycles.value = 14` i `quality-baseline.json`, `direction: down`) — den blokkerer enhver _regresjon_, og antallet kan bare synke. CI kjører `npm run check:cycles:ratchet`. Nedbyggingen følger **A-01**. `check:circular-deps` (dpdm) forblir rådgivende som en bredere sekundær vurdering.
- **Kompleksitet** — ✅ **FERDIG** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): én ESLint-gjennomgang, med telling etter ruleId slik at grunnlinjene for syklomatisk kompleksitet + maksimalt antall linjer og kognitiv kompleksitet forblir uavhengige; individuelle `check:complexity` / `check:cognitive-complexity` beholdes for lokal `--update`.
- **`/api`-antihallusinasjon** — ✅ **FERDIG** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): én FS-oversikt over `src/app/api`; openapi-routes + docs-symbols rapporterer fortsatt uavhengig; de individuelle kontrollene beholdes for lokale kjøringer.
- **`check:node-runtime` kjøres i 11 jobber** — ⚠️ **lav ROI.** Hver har en separat kjører, og kontrollen tar <1s; samlet besparelse er ~10s, mot å miste en rimelig kontroll per jobb. Ikke verdt omarbeidingen.
- **`typecheck:noimplicit:core` i CI-lintingen** — ✅ **fjernet fra lint-jobben** (var rådgivende med `continue-on-error`); den blokkerende typeoverflaten er `typecheck:core` + `check:type-coverage`. Det lokale skriptet er beholdt.

### Aktiver / avgjør (operatørpolicy)

- `check:openapi-security-tiers` (rådgivende) — ❌ **KAN IKKE aktiveres uten videre.** Den avsluttes med 0, men advarer om at flere `traffic-inspector`-ruter under `LOCAL_ONLY_API_PREFIXES` mangler annotasjonen `x-loopback-only: true`. Håndheving krever at disse annotasjonene først legges til i `openapi.yaml`.
- `typecheck:noimplicit:core` (rådgivende) — i stor grad dekket av den blokkerende terskelmekanismen `check:type-coverage`. Gjør den om til en terskelmekanisme, eller fjern den redundante andre `tsc`-kjøringen.
- `test:vitest:ui` (nå **blokkerende**) — eksisterende feil er eksplisitt ekskludert i `vitest.config.ts` med sporingskommentarene `// #8618`; nye feil får jobben til å feile.
- `check:secrets` (gitleaks, blokkerende terskelmekanisme) — gjeldende øvre grense er `metrics.secretFindings` i `quality-baseline.json`. Ethvert unntak krever en begrunnet oppføring i `.gitleaks.toml`; en utilgjengelig måling er UFULLSTENDIG. Skanningen supplerer GitHubs innebygde hemmelighetsskanning og `check:public-creds`.
- `check:pr-evidence` (blokkerende, søker i prosateksten i PR-beskrivelsen) — høy risiko for falske positiver; fjerning svekker håndhevingen av ufravikelig regel nr. #18, så dette er en reell policybeslutning.
- `semgrep` (rådgivende og frittstående) — overlapper CodeQL for OWASP-familiene; koble grunnlinjen til en terskelmekanisme, eller fjern den.

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
