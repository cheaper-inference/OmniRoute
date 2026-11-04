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

## Gate-oversikt og kjøringsprofiler

### Kandidatopptak

Arbeidsflytene CI og Quality Gates avgir hver sin stabile vurdering: `Gate / CI` og
`Gate / Quality`. Den versjonerte opptakspolicyen angir hver oppstrømsjobb som obligatorisk eller
rådgivende. En aktuell obligatorisk jobb må lykkes: manglende,
avbrutte, hoppede over, ventende og ukjente resultater kan ikke etablere PASS. En gyldig
klassifisering som kun gjelder dokumentasjon eller katalog, kan gjøre en kodelinje uaktuell;
en kladde-PR er ikke en godkjent kandidat. En `hotfix`-etikett fritar ikke fra dokumentasjon.

Begge arbeidsflytene dekker PR-er inn i main-/release-grener, push til `main`, manuell utsendelse
og merge-group-hendelser. Push, utsendelse og merge-group kjører hele utvalget. Push til
`release/**` starter dem ikke (2026-10-18): hver endring kjørte allerede matrisen på sin PR,
og den sammenslåtte kombinasjonen er Release-Greens oppgave (`docs/ops/RUNNER_BOX.md` → Hosted lane).
Forker og merge-grupper bruker hostede kjørere for jobber som ellers velger selvhostede
kjørere; tilstrekkelig kapasitet på hostede kjørere må verifiseres før utrulling.

Hver JSON-kvittering identifiserer SHA-en som ble sjekket ut, arbeidsflytkjøringen og forsøket.
CLI-et avviser et avvik mellom checkout-/hendelses-SHA. Tester av arbeidsflyter binder policymedlemskap
til `needs`-listen til vurderingsjobben, slik at en ny eller fjernet linje ikke kan forsvinne
ubemerket. Kvitteringene dekker sin egen arbeidsflyt, ikke publisering, utrulling eller
det interne i en eksisterende rådgivende skanner. Aktivering av begge kontrollnavnene i grenreglene
er en separat administrativ endring; å legge til disse jobbene beskytter ikke en gren i seg selv.

### Inventar for statisk skanning

Det versjonerte npm-aliasinventaret og medlemskapet i statisk skanning ligger i
`config/quality/gate-manifest.json`. Kjør `npm run check:gate-manifest` for å validere
skriptnavn og nøyaktige kommandoer mot `package.json`; tillegg, fjerninger og
kommandoendringer feiler både den lokale hooken og endringsklassifiseringsjobbene i CI.
Et alias er ikke en arbeidsflytjobb, en matriseinstans eller en testcase: disse antallene
må ikke presenteres som om de kan brukes om hverandre.

Bruk `npm run quality:scan -- --list` eller `npm run quality:scan:fast -- --list`
for å inspisere de valgte aliasene uten å kjøre dem. Kjøreren aktiverer npm-inngangspunktet,
slik at kjøremiljøet (inkludert Bun der det er konfigurert) bevares.
Manifestet registrerer aliaser utenfor disse profilene som separat aktiverte, og
vedlikeholdskommandoer er forbudt i skrivebeskyttede skanneprofiler.

Disse profilene dekker kun den statiske skanningen. De sertifiserer ikke produkttester,
dekning, pakking, eksterne kontroller eller en kandidats fullstendige godkjenning for utgivelse.
Opptak i arbeidsflyten bruker den tilknyttede `config/quality/admission-policy.json` og
`scripts/quality/admission-verdict.mjs`. Release-observatørprofiler forblir separate;
inspiser deres aktuelle kontroller og kvitteringer uavhengig. Inventaret i teksten
nedenfor er en referanse, ikke et bevis på at en gate faktisk ble kjørt.

Skript ligger under `scripts/check/` (policy-gates) og `scripts/quality/` (ratchet-motor).
CI-kildens fasit er `.github/workflows/ci.yml`.

### Hurtigspor for release-PR-er (`quality.yml`)

`.github/workflows/quality.yml` utfyller CI på main-/release-PR-er, push til `main`,
utsendelse og merge-grupper. PR-er bruker hurtigkontroller filtrert etter sti. Den permanent
deaktiverte dupliserte byggingen ble fjernet; de faktiske kontrollene for bygging, pakking og
oppstart forblir i CI.

| Jobb                                             | Omfang                                                                                                                                                                                                         | Blokkerende          |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | Dokumentasjons-/kode-PR-er; API-dokumentasjonsreferanser og all dokumentasjon                                                                                                                                  | Ja                   |
| `Fast Quality Gates`                             | Kode-PR-er; statiske kontroller, typesjekk, typesjekk av dashboard, berørte enhetstester                                                                                                                       | Ja                   |
| `Forgotten sibling tests`                        | Kode-PR-er; endrede moduler sporet til statiske forbrukere og kandidatens sidestilte tester; barrel- og dynamisk import-stier rapporteres som rådgivende diagnostikk, med refererte unntak i tillatelseslisten | **Rådgivende**       |
| `Vitest (fast-path)`                             | Kode-PR-er; hurtigpakke for vitest                                                                                                                                                                             | Ja                   |
| `Unit Tests fast-path`                           | Kode-PR-er; enhetstestpakke med 4 shards                                                                                                                                                                       | Ja                   |
| `No new ESLint warnings`                         | Kode-PR-er; lint-vakt som tar hensyn til undertrykkinger                                                                                                                                                       | Ja, inkludert forker |
| `Merge integrity (changelog + generated skills)` | PR-er som ikke er kladder; synkronisering av endringslogg og genererte ferdigheter                                                                                                                             | Ja, inkludert forker |

#### Rapport for glemte sidestilte tester

`npm run check:forgotten-sibling-tests` bruker import-resolveren bak testpåvirkningskartet på nytt.
For hver endrede produksjonsmodul rapporterer den deterministiske
`changed module/symbol -> static consumer -> candidate sibling test`-kjeder når kandidat-
testen ikke finnes i pull request-diffen. Markdown-sammendraget og JSON-resultatet beholdes som
`forgotten-sibling-tests`-artefaktet fra arbeidsflyten for kalibrering før en blokkerende utrulling.

Barrel-eksporter og dynamiske importer er kun oppløsningsdiagnostikk; de oppretter aldri et
blokkerende funn. Gjennomgåtte unntak ligger i
`config/quality/forgotten-sibling-allowlist.json`. Hver oppføring må angi forbrukeren og kandidat-
testen, gi en spesifikk begrunnelse og lenke til en GitHub-sak eller pull request. Feilformaterte oppføringer
fører til sikker avvisning. Unntak kan ikke undertrykke en slettet kandidat-test eller en diff som legger til `.skip`/`.todo`;
svekkelse av påstander og annen maskering håndteres fortsatt av den separat blokkerende
`check:test-masking`-porten.

### Jobb: `lint`

Kjøres på alle PR-er til `main`. Blokkerer sammenslåing ved feil.

| Skript (`npm run ...`)            | Validerer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Blokkerende                                |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Node.js-versjonen er innenfor det støttede området                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                         |
| `check:cycles`                    | Sirkulære importer på tvers av all `src/` + `open-sse/` (AST-basert, tsconfig-`paths` er løst). Bare avsluttes med kode 1 når det finnes en syklus (fail-closed siden #15281) og viser SCC-ene. `check:cycles:ratchet` (det CI kjører) blokkerer når antallet overskrider `metrics.cycles`-grensen i `quality-baseline.json` — for øyeblikket 14, `direction: down`, så den kan bare reduseres (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja (ratchet)                               |
| `check:boundary`                  | Kobling fra `open-sse → src`: unike fil-til-fil-importer fra motoren til appen (`scripts/quality/measure-boundary.mjs`; kantlisten er restanselisten for utbedring av v4-kjerne/moduloppdeling). Bare = rådgivende rapport (samme som `quality:boundary`). `check:boundary:ratchet` (det CI kjører, også i ratchet-sløyfen for hurtigporter i `quality.yml`) blokkerer når antallet overskrider `metrics.boundaryOpenSseToSrc`-grensen i `quality-baseline.json` — satt til den målte verdien 771, `direction: down`; `--update` kan bare redusere den; basisrelativ på pull requests (`--base-ref`, se nedenfor)                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja (ratchet)                               |
| `check:route-validation:t06`      | Zod-skjemaer finnes på alle ruter (nivå 6-policy)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                         |
| `check:any-budget:t11`            | Antallet av `@ts-expect-error // any` overskrider ikke budsjettet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:provider-consistency`      | Hver provider i `providers.ts` har en samsvarende oppføring i `providerRegistry.ts` (og omvendt, innenfor allowlisten)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ja                                         |
| `check:model-lifecycle`           | De tre manuelt vedlikeholdte rutingtabellene er konsistente med det innsjekkede livssyklussnapshotet (#11503): `FITNESS_TABLE` (`taskFitness.ts`) gir ingen poeng til en utfaset id som `REGISTRY` kan rute; hvert mål i `BUILT_IN_ALIASES` finnes i `REGISTRY` og mangler i snapshotet over utfasede id-er; hver utfaset id som fortsatt finnes i `REGISTRY`, videresendes eller er oppført i `allowedRetiredInCatalog`; og ingen kilde eller mål i `DEFAULT_DEGRADATION_MAP` er oppført som utfaset i snapshotet. Dette beviser ikke at en modell for øyeblikket leveres av en aktiv upstream. Frakoblet — sammenligner med `config/quality/model-lifecycle.json`, som oppdateres manuelt med `npm run quality:refresh-model-lifecycle` (nettverk; ikke koblet til CI). `allowedRetiredInCatalog` er en nedbyggingsmekanisme: legg bare til en oppføring sammen med en oppfølgingssak.                                                                                                                                                     | Ja                                         |
| `check:fetch-targets`             | Hver `fetch("/api/...")` i klientsiden av `src/` løses til en faktisk `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:deps`                      | Alle avhengigheter som kan installeres med `npm install` på tvers av alle `package.json`-filer i repoet finnes i `dependency-allowlist.json`; nye upinnede eller slopsquattede pakker flagges                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ja                                         |
| `audit:deps`                      | `npm audit` (root + electron) — ingen advarsler med høy eller kritisk alvorlighetsgrad (overlapper med osv `check:vuln-ratchet`; se Rationalization Backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                         |
| `check:lockfile`                  | Integriteten til `package-lock.json` — https-register, integritetshasher, ingen verts-overstyringer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:licenses`                  | SPDX-lisensliste over tillatte lisenser for produksjonsavhengigheter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                         |
| `check:tracked-artifacts`         | Ingen byggartefakter / innsendte `node_modules`-symlenker (kjøres også i husky pre-commit; pre-push er med hensikt begrenset — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                         |
| `check:ai-attribution`            | Ingen AI-/bot-`Co-Authored-By`-tillegg eller AI-genereringsbunntekst i PR-commits, tittel eller brødtekst — hard regel #16 (i `quality.yml`-sløyfen for fast-gates for PR→`release/**` — leser hendelsesnyttelasten, gjør ingenting utenfor PR-er — og et PR-eksklusivt trinn i `ci.yml`-lint for PR→`main`; også husky-`commit-msg`-hooken; menneskelige medforfattere er tillatt; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:vitest-exclusions`         | Alle Vitest-unntak angir en oppfølgingssak og finnes i `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja                                         |
| `check:file-size`                 | Kilde-filer (`.ts`/`.tsx` i `src/`, `open-sse/`, `electron/`, `bin/`) må holde seg innenfor `cap`, og testfiler (`*.test.ts(x)`) innenfor `testCap`; filer som er fryst i `file-size-baseline.json` (`frozen` / `testFrozen`) må ikke vokse forbi den registrerte størrelsen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                         |
| `check:error-helper`              | Feilsvar i executors/handlers bruker `buildErrorBody()` / `sanitizeErrorMessage()` (streng regel #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                         |
| `check:migration-numbering`       | Migrerings-SQL-filer er nummerert sekvensielt, uten manglende eller dupliserte numre                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                         |
| `check:public-creds`              | Ingen bokstavelige OAuth-`client_id`/`client_secret` eller Firebase Web-nøkler utenfor `publicCreds.ts` (streng regel #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:db-rules`                  | Ingen rå SQL utenfor `src/lib/db/`-moduler; ingen barrel-importer fra `localDb.ts` (strenge regler #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                         |
| `check:known-symbols`             | Provider-executors, rutingstrategier og oversettere som er registrert i dispatch-tabellene, samsvarer med filene på disk — ingen foreldede eller udeklarerte symboler                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                         |
| `check:route-guard-membership`    | Hver rute som starter en underordnet prosess, klassifiseres av `isLocalOnlyPath()` (strenge regler #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ja                                         |
| `check:test-discovery`            | Hver `*.test.ts`- / `*.spec.ts`-fil i repoet samles inn av minst én testrunner (ratchet: foreldreløslisten i `test-discovery-baseline.json` kan bare bli kortere)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                         |
| `check:test-tla-order`            | Ingen `node:test`-fil under `tests/unit` registrerer en test, treffer en top-level `await` og registrerer deretter flere (#18045; ratchet: `test-tla-order-allowlist.json` kan bare bli kortere)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:agent-skills-sync`         | Genererte agent-skills-artefakter samsvarer med kildekatalogen (ingen avvik)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:provider-asset-provenance` | Leverandørlogoer/-ressurser har en registrert opprinnelsesoppføring                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `lint:json`                       | JSON-konfigurasjonsfiler kan tolkes og oppfyller repoets lint-regler                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `typecheck:core`                  | TypeScript-kompilering uten feil (kun veiledende advarsler)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ja                                         |
| `typecheck:noimplicit:core`       | Streng `noImplicitAny` — fremtidsrettet; mange eksisterende kallesteder trenger fortsatt annotasjoner                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **Veiledende** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` avgrenset til `src/app/(dashboard)/**` (#7033) — `typecheck:core` sitt kuraterte tillatte utvalg på 27 filer inkluderer ingen dashboard-TSX-filer, og `next build` typesjekker dem heller aldri (`next.config.mjs` setter `ignoreBuildErrors: true`), så regresjoner med foreldreløse identifikatorer der (#6625/#6909) var usynlige for CI. Differanser mot en fryst baseline for hvert enkelt fil-/TS-kodeantall (`config/quality/dashboard-typecheck-baseline.json`, samme mønster med foreldet håndheving som `check:known-symbols`) — bare NYE feil utover antallet i baselinen får kontrollen til å feile; ratchet ned med `--update` når en eksisterende feil er rettet.                                                                                                                                                                                                                                                                                                                                                        | Ja                                         |
| `check:build-typecheck`           | Typesjekk av hele produksjonsappen over `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), som overflaten som dekkes av `typecheck:core` sitt tillatte utvalg på 27 filer og dashboard-kontrollen ikke dekker. Differanser mot `config/quality/build-typecheck-baseline.json`; et nytt eller økt antall per (fil, kode) får kontrollen til å feile, mens et lavere antall ber deg ratchet ned. `--update` nekter å kjøre så lenge kjøringen inneholder et nytt eller økt par, med mindre `--force-regressions` sendes inn, og nekter en ny fil uten diagnostikk med mindre `--force-nocheck` sendes inn, slik at det å utvide baselinen for å få grønt og å gi permanent tillatelse til stillhet er to separate, bevisste handlinger. En naken `--force` avvises. Skanner også byggomfanget etter `@ts-nocheck` mot `config/quality/ts-nocheck-baseline.json`, fordi en fil som bruker dette ikke rapporterer noen diagnostikk i det hele tatt og ellers ville vært usynlig for alle kontroller. | Ja                                         |

#### To typesjekkprogrammer gir ulike svar

`typecheck:core` og `check:build-typecheck` kompilerer forskjellige programmer med ulike
alternativer, og den samme filen kan være feilfri i det ene og full av feil i det andre.

`tsconfig.build.json` setter `"strict": false`, så `noImplicitAny` er deaktivert. Core-konfigurasjonen
kompilerer et kuratert tillatt utvalg på 27 filer med strengere alternativer og følger importgrafen
til hver oppføring, slik at filer som aldri forekommer i byggeprogrammet, fortsatt blir kontrollert der.

Konsekvensen er viktig når du vurderer om en fil er typet: **null diagnostikk
under `check:build-typecheck` betyr ikke null feil**. Fjerning av `@ts-nocheck` fra 26
filer viste at 23 av dem var feilfrie i byggeprogrammet; seksten av disse avdekket rundt
120 feil med implisitt any i det strenge programmet. Kontroller begge før du kaller en fil feilfri.

### Jobb: `quality-gate`

Kjører etter `test-coverage`. Blokkerer sammenslåing ved feil.

| Skript                       | Validerer                                                                                                                                                                       | Blokkerende                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `quality:collect`            | Genererer `quality-metrics.json` (antall ESLint-advarsler, dekning fra sammenslått shard-rapport)                                                                               | Ja (oppstrøms for ratchet) |
| `quality:ratchet`            | Hver metrikk i `quality-baseline.json` har ikke blitt dårligere (ESLint-advarsler ≤ baseline; dekning ≥ baseline)                                                               | Ja                         |
| `check:duplication`          | Kodeduplisering (jscpd@4) overskrider ikke baseline i `quality-baseline.json`                                                                                                   | Ja                         |
| `check:complexity`           | Syklomatisk kompleksitet på filnivå overskrider ikke grensen (kjerne-ESLint `complexity` + `max-lines-per-function`)                                                            | Ja                         |
| `check:cognitive-complexity` | Ratchet for kognitiv kompleksitet (`eslint-plugin-sonarjs`) — separat ESLint-kjøring; CI kjører begge sammenslått som ett enkelt trinn, `check:complexity-ratchets`             | Ja                         |
| `check:dead-code`            | Ratchet for ubrukte eksporter/filer (knip) blir ikke dårligere sammenlignet med baseline                                                                                        | Ja                         |
| `check:compression-budget`   | Budsjett for komprimeringsreferanse — gulv for tokenbesparelser per motor må ikke bli dårligere                                                                                 | Ja                         |
| `check:type-coverage`        | Ratchet for typede prosentandeler (`type-coverage`) blir ikke dårligere; overflødiggjør i stor grad `typecheck:noimplicit:core`                                                 | Ja                         |
| `check:codeql-ratchet`       | Antallet åpne CodeQL-varsler blir ikke dårligere (leses via `gh api`; hopper elegant over uten token) — oppdateringsfrekvens og manuell utløsning: se «CodeQL-ratchet» nedenfor | Ja                         |

### Jobb: `quality-extended`

Hele jobben er veiledende (`continue-on-error: true`). npm-baserte ratchets kjøres
i praksis; de eksterne skannerne installeres via `gh release download` og hopper selv over kjøringen (avslutter med 0)
når en binærfil fortsatt mangler.

| Skript                   | Validerer                                                                                                                                                                                                               | Blokkerende                                      |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `check:circular-deps`    | Ingen sirkulære avhengigheter (dpdm)                                                                                                                                                                                    | **Veiledende**                                   |
| `check:bundle-size`      | Bundlestørrelsen overskrider ikke grensen                                                                                                                                                                               | **Veiledende**                                   |
| `check:secrets`          | Skanning etter hemmeligheter (gitleaks) — hopper over hvis binærfilen mangler                                                                                                                                           | **Veiledende**                                   |
| `check:vuln-ratchet`     | Sårbarheter i avhengigheter (osv-scanner) blir ikke dårligere — hopper over hvis binærfilen mangler                                                                                                                     | **Veiledende**                                   |
| `check:workflows`        | Workflow-linting (actionlint + zizmor); manglende/ødelagte skannere, ugyldige rapporter eller manglende ratchet-baseline feiler som INCOMPLETE. Gyldige funn følger den valgte strenge/veiledende/ratchet-policyen      | Kjøring påkrevd; zizmor-ratchet blokkerende i CI |
| `check:openapi-breaking` | Brudd på endringer i den offentlige API-kontrakten (`openapi.yaml`) sammenlignet med base-branchen (oasdiff) — genererer `openapiBreaking=N`; hopper over hvis oasdiff mangler eller basespecifikasjonen ikke kan løses | **Veiledende**                                   |

### Jobb: `docs-sync-strict`

Kjøres på hver PR til `main`. Blokkerer sammenslåing ved feil.

| Skript                         | Validerer                                                                                                                                                                    | Blokkerende              |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `check:docs-all`               | Metaport som kjører de 6 underportene nedenfor sekvensielt                                                                                                                   | Ja                       |
| ↳ `check:docs-sync`            | Konsistens for versjoner i CHANGELOG / OpenAPI / llm.txt                                                                                                                     | Ja                       |
| ↳ `check:docs-counts`          | Antall i prosa (antall leverandører, antall migreringer osv.) ligger innenfor ratchet-vinduet for de faktiske antallene                                                      | Ja                       |
| ↳ `check:env-doc-sync`         | Alle miljøvariabler i `.env.example` er dokumentert i en dokumentasjonstabell, og omvendt                                                                                    | Ja                       |
| ↳ `check:deprecated-versions`  | Ingen utdaterte versjonsstrenger i dokumentasjonen                                                                                                                           | Ja                       |
| ↳ `check:doc-links`            | Interne Markdown-lenker i dokumentasjonen peker til faktiske filer (`[text]`/`(path)`-form)                                                                                  | Ja                       |
| ↳ `check:fabricated-docs`      | Ruter, miljøvariabler, CLI-kommandoer, hook-navn og filbaner som refereres til i dokumentasjonen, finnes i kodebasen. Hard blokkering med `--strict`; myk feil uten flagget. | Ja (via `--strict` i CI) |
| `check:cli-i18n`               | CLI-kommandostrenger finnes i alle i18n-lokalitetsfiler                                                                                                                      | Ja                       |
| `check:openapi-coverage`       | OpenAPI-spesifikasjonen dekker minst et ratchet-gulv av faktiske ruter                                                                                                       | Ja                       |
| `check:openapi-security-tiers` | Annotasjoner for sikkerhetsnivåer i `openapi.yaml` samsvarer med klassifiseringene i `routeGuard.ts`                                                                         | **Rådgivende**           |
| `check:openapi-routes`         | Hver sti i `openapi.yaml` peker til en faktisk `route.ts` (mot hallusinasjoner)                                                                                              | Ja                       |
| `check:docs-symbols`           | Hver `/api/...`-referanse i `docs/**/*.md` peker til en faktisk `route.ts` (mot hallusinasjoner)                                                                             | Ja                       |
| `i18n translation drift`       | Uoversatte nøkler i i18n-lokalitetsfiler — bare advarsel                                                                                                                     | **Rådgivende**           |

De tolv README-SVG-ene under `docs/diagrams/` genereres (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` genererer alle på nytt). Hver av dem har en enhetstest som sammenligner byte
(`tests/unit/docs/readme-*-svg.test.ts`, jobben `test-unit`) som feiler når den innsendte filen er utdatert, og `check:docs-counts` leser kanoniske tall fra `<text>`-nodene — derfor sørger omriss-steget for at hver omrisset streng i filen beholdes som usynlig `<text>`. SVG-kontrollen av kanoniske tall leser filene som er oppført i
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, samt `public/images/tier-flow-dark.svg` og `tier-flow-light.svg`; påstandene om
free-forever, catalog-entry, recurring-pool og scoring-factors leser også
`promise-pillars.svg`, `free-tier-budget.svg` og `strategies-grid.svg`. `free-tier-budget.svg`
henter tallene sine fra den aktive kataloginnlasteren, så en endring i `FREE_MODEL_BUDGETS` eller i visningsnavnet til en leverandør gjør CI rød inntil filen er generert på nytt.

### Jobb: `i18n-ui-coverage`

| Skript                            | Validerer                                                                                                                                                                                                        | Blokkerende    |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | Dekningen av UI-i18n-nøkler er ≥ 65 %                                                                                                                                                                            | Ja             |
| `check-ui-value-drift` (inline)   | En omskrevet engelsk **verdi** etterlater ingen foreldet oversettelse                                                                                                                                            | Ja             |
| `check-new-key-coverage` (inline) | En **ny** engelsk nøkkel er oversatt i alle lokaliteter — en `__MISSING__:`-markør avvises                                                                                                                       | Ja             |
| `check-translation-ratio`         | Forholdet mellom ekte oversettelser per lokalitet (identisk med engelsk / plassholder / manglende, utenfor tillatelseslisten) må ikke overstige `config/quality/i18n-translation-baseline.json` + slingringsmonn | **Rådgivende** |

Krever `fetch-depth: 0` — kontrollen av verdiavvik sammenligner `en.json` med merge-basen.

#### `check-ui-value-drift` — kontroll av foreldede oversettelser

Fanger opp den ene i18n-regresjonen som de andre kontrollene strukturelt ikke kan oppdage: En engelsk verdi
skrives om, og oversettelsene som ble utledet fra den _forrige_ engelske teksten blir hengende igjen, slik at
ikke-engelskspråklige brukere fortsetter å lese selvsikkert formulert, men nå feilaktig tekst.

Dette ble faktisk sendt ut. `oauthModal.googleOAuthWarning` ble skrevet om da Antigravity-
påloggingshjelperen ble lansert (#5203); **39 av 43 lokaler** beholdt tekst som ba operatører om å «kopiere
hele URL-en og lime den inn nedenfor» — en flyt som ikke kan fullføres for denne leverandøren. Det ble ikke
oppdaget før #8463 fordi:

- `sync-ui-keys` fyller bare på nøkler som **mangler**, aldri nøkler som er **utdaterte**;
- `check-ui-keys-coverage` teller om nøkler _finnes_, så en utdatert oversettelse regnes som dekket;
- `check-translation-drift` sporer dokumentasjonsspeilene `docs/i18n/<locale>/**.md` —
  den leser aldri `src/i18n/messages/*.json`. Blokkerer i jobben `docs-sync-strict` siden
  omsynkroniseringen i 2026-09: rediger et kjernedokument → `npm run i18n:run -- --files=<doc>` (på seksjonsnivå, rimelig).

**Diff-bevisst, ikke baselinestøttet.** Den sammenligner `en.json` ved merge-basen med
arbeidstreet; for hver nøkkel der den engelske verdien er endret, er enhver lokalisering som fortsatt har en
uberørt oversettelse utdatert. Dette **fryser eksisterende gjeld** med hensikt — en diff kan ikke avsløre
hvilken gammel engelsk tekst en langvarig oversettelse stammer fra, så kontrollen vurderer bare det den
gjeldende endringen berører. Alternativet (en hash-baseline per nøkkel) ville kostet en generert fil på rundt
600 KB, tre ganger større enn den største eksisterende baselinen, og ført til endringer i hver i18n-PR.

To måter å tilfredsstille den på:

1. oppdater de berørte oversettelsene, eller
2. sett dem til `__MISSING__:<new english>` — runtime-miljøet serverer da den korrigerte engelske teksten
   (`src/i18n/request.ts::deepMergeFallback`, #7258), og nøkkelen legges i kø for oversettelse.

Hvis tekststrengens **betydning** er endret, bør du heller **gi nøkkelen nytt navn**: En ny nøkkel kan ikke arve
en utdatert oversettelse. Det var mønsteret #8463 brukte.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Avslutter med 0 og `SKIP reason=base-unresolved` når baselinekatalogen ikke kan leses (en grunn
klone uten basereferansen), i samsvar med `check-openapi-breaking`.

### Jobb: `i18n`

Fullstendig i18n-valideringsmatrise (én jobb per lokalisering). Hele jobben er veiledende.

| Skript                          | Validerer                                    | Blokkerende                                                |
| ------------------------------- | -------------------------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | Oversettelsesfullstendighet per lokalisering | **Veiledende** (`continue-on-error: true` for hele jobben) |

### Jobb: `pr-test-policy`

Kjøres bare på pull requests.

| Skript                 | Validerer                                                                                                                              | Blokkerende |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check:pr-test-policy` | PR-er som endrer produksjonskode i `src/`, `open-sse/`, `electron/` eller `bin/` må inkludere eller oppdatere tester (Hard regel #8)   | Ja          |
| `check:test-masking`   | Endrede testfiler reduserer ikke det totale antallet påstander eller legger til tautologier som `assert.ok(true)`                      | Ja          |
| `check:pr-evidence`    | PR-teksten viser til test-/VPS-dokumentasjon for endringen (mekaniserer Hard regel #18 ved å søke i PR-teksten — skjørt, se Etterslep) | Ja          |

### Jobb: `test-vitest`

Kjøres etter `build`. Blokkerer fletting ved feil.

| Testpakke        | Validerer                                                         | Blokkerende                                                                                                           |
| ---------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-server (110 verktøy), autoCombo, hurtigbuffer — vitest-kjører | Ja                                                                                                                    |
| `test:vitest:ui` | UI-komponenttester — vitest-kjører                                | **Blokkerende** — eksisterende feil er uttrykkelig utelukket i `vitest.config.ts`; nye feil medfører at jobben feiler |

### Nattlige arbeidsflyter (planlagte, veiledende)

Disse kjøres etter en cron-plan (og `workflow_dispatch`), aldri på PR-er. Alle er veiledende.

| Workflow               | Validerer                                                                                                                                                                 | Blokkerende    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | egenskapstester med fast-check med tilfeldig seed + høyt antall kjøringer                                                                                                 | **Veiledende** |
| `nightly-resilience`   | port for heap-vekst, kaosbasert feilinjektering, k6-last-/utholdenhetstest                                                                                                | **Veiledende** |
| `nightly-llm-security` | promptfoo-injeksjonsvakt (blokkeringsmodus) + garak-prober (hoppes over uten en leverandørhemmelighet)                                                                    | **Veiledende** |
| `nightly-schemathesis` | OpenAPI-kontraktfuzzing (schemathesis) mot en kjørende OmniRoute ved hjelp av `docs/openapi.yaml` — avdekker brudd på spesifikasjonen / ubehandlede 500-feil (Fase 8 B.4) | **Veiledende** |
| `nightly-mutation`     | Stryker-mutasjonstestingsscore for den raske enhetstestbanen — overlevende mutanter avdekker svake påstander                                                              | **Veiledende** |
| `nightly-compat`       | Node-motorens kompatibilitetsmatrise på tvers av de støttede `engines.node`-områdene                                                                                      | **Veiledende** |

Ytelsesbaseliner (heap, TTFB, byggetid) registreres, men brukes ikke som porter: se [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
