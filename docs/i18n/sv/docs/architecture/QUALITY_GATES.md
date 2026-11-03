# Quality Gates Reference (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Det här dokumentet är den auktoritativa referensen för alla CI-kvalitetsgrindar i OmniRoute.
Det beskriver varje grind, vad den validerar, vilket CI-jobb den körs i, huruvida den använder
en ratchet-baslinje eller en godkänd/underkänd-policy samt huruvida den blockerar bygget eller endast är rådgivande.

En kort sammanfattning och policyn för tillåtelselistan finns i avsnittet "Kvalitetsgrindar och ratchets"
i `AGENTS.md`. En kritisk bedömning, mognadsklassificering och verktygsoberoende
plan för att replikera samma system finns i
[Handbok för kvalitetsgrindar](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Gate-inventering och körningsprofiler

### Kandidatantagning

CI- och Quality Gates-arbetsflödena avger vardera ett stabilt resultat: `Gate / CI` och
`Gate / Quality`. Deras versionshanterade antagningspolicy listar varje uppströmsjobb
som obligatoriskt eller rådgivande. Ett tillämpligt obligatoriskt jobb måste lyckas:
saknade, avbrutna, överhoppade, väntande och okända resultat kan inte fastställa PASS.
En giltig klassificering som endast gäller dokumentation eller kataloger kan göra en
kodkörning ej tillämplig; en draft-PR är inte en godkänd kandidat. En `hotfix`-etikett
innebär inget undantag från kravet på underlag.

Båda arbetsflödena omfattar PR:er till main/release-grenar, pushar till `main`, manuell
utlösning och merge-group-händelser. Pushar, dispatch och merge-group kör hela urvalet.
Pushar till `release/**` startar dem inte (2026-10-18): varje ändring körde redan matrisen
på sin PR och den sammanslagna kombinationen är Release-Greens uppgift
(`docs/ops/RUNNER_BOX.md` → Hosted lane). Forkar och merge-grupper använder hostade
körningar för jobb som annars väljer självhostade körningar; tillräcklig hostad kapacitet
måste verifieras före utrullning.

Varje JSON-kvitto identifierar den utcheckade SHA:n, arbetsflödeskörningen och försöket.
CLI:t avvisar en avvikelse mellan utchecknings-/händelse-SHA. Arbetsflödestester binder
policymedlemskap till resultatjobbets `needs`-lista så att en ny eller borttagen körning
inte kan försvinna obemärkt. Kvittona täcker sitt eget arbetsflöde, inte publicering,
distribution eller det interna i en befintlig rådgivande skanner. Att aktivera båda
kontrollnamnen i grenreglerna är en separat administrativ ändring; att lägga till dessa
jobb skyddar inte i sig en gren.

### Inventering av statiska skanningar

Den versionshanterade npm-aliasinventeringen och medlemskapet i statiska skanningar finns i
`config/quality/gate-manifest.json`. Kör `npm run check:gate-manifest` för att validera
skriptnamn och exakta kommandon mot `package.json`; tillägg, borttagningar och
kommandoavvikelser misslyckas både i den lokala hooken och i jobb för ändringsklassificering
i CI. Ett alias är inte ett arbetsflödesjobb, en matrisinstans eller ett testfall: dessa
antal får inte presenteras som utbytbara.

Använd `npm run quality:scan -- --list` eller `npm run quality:scan:fast -- --list`
för att granska de valda aliasen utan att köra dem. Körningen anropar npm-ingångspunkten,
så dess runtime (inklusive Bun där det är konfigurerat) bevaras. Manifestet registrerar
alias utanför dessa profiler som separat anropade, och underhållskommandon är förbjudna i
skrivskyddade skanningsprofiler.

Dessa profiler omfattar endast den statiska skanningen. De certifierar inte produkttester,
täckning, paketering, externa kontroller eller en kandidats fullständiga
releasegodkännande. Arbetsflödesantagningen använder den länkade
`config/quality/admission-policy.json` och `scripts/quality/admission-verdict.mjs`.
Release-observerprofiler förblir separata; granska deras tillämpliga kontroller och kvitton
oberoende. Inventeringen nedan är en referens, inte ett bevis på att en gate faktiskt
kördes.

Skript finns under `scripts/check/` (policy-gates) och `scripts/quality/` (ratchet-motor).
CI:s källa är `.github/workflows/ci.yml`.

### Snabbspår för release-PR (`quality.yml`)

`.github/workflows/quality.yml` kompletterar CI för main/release-PR:er, pushar till `main`,
dispatch och merge-grupper. PR:er använder snabba, sökvägsfiltrerade kontroller. Det
permanent inaktiverade duplicerade bygget har tagits bort; de riktiga kontrollerna för
bygge/paketering/uppstart finns kvar i CI.

| Jobb                                             | Omfattning                                                                                                                                                                                                      | Blockerande          |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | Dokumentations-/kod-PR:er; API-dokumentationsreferenser och all dokumentation                                                                                                                                   | Ja                   |
| `Fast Quality Gates`                             | Kod-PR:er; statiska kontroller, typecheck, dashboard typecheck, påverkade enhetstester                                                                                                                          | Ja                   |
| `Forgotten sibling tests`                        | Kod-PR:er; ändrade moduler spårade till statiska konsumenter och kandidattester för syskon; barrel- och dynamiska importvägar rapporteras som rådgivande diagnostik, med refererade undantag i tillåtelselistan | **Rådgivande**       |
| `Vitest (fast-path)`                             | Kod-PR:er; snabbt vitest-testpaket                                                                                                                                                                              | Ja                   |
| `Unit Tests fast-path`                           | Kod-PR:er; enhetstestsvit med 4 shardar                                                                                                                                                                         | Ja                   |
| `No new ESLint warnings`                         | Kod-PR:er; lintskydd som tar hänsyn till undertryckanden                                                                                                                                                        | Ja, inklusive forkar |
| `Merge integrity (changelog + generated skills)` | PR:er som inte är draft; synkronisering av ändringslogg och genererade färdigheter                                                                                                                              | Ja, inklusive forkar |

#### Rapport om glömda syskontester

`npm run check:forgotten-sibling-tests` återanvänder importlösaren bakom kartan över testpåverkan.
För varje ändrad produktionsmodul rapporterar den deterministiska kedjor av typen
`changed module/symbol -> static consumer -> candidate sibling test` när kandidat-
testet saknas i pull request-diffen. Markdown-sammanfattningen och JSON-resultatet sparas som
arbetsflödesartefakten `forgotten-sibling-tests` för kalibrering innan någon blockerande utrullning.

Barrel-omexporter och dynamiska importer är endast upplösningsdiagnostik; de skapar aldrig ett
blockerande fynd. Granskade undantag finns i
`config/quality/forgotten-sibling-allowlist.json`. Varje post måste ange konsumenten och kandidat-
testet, ge en specifik motivering samt länka till ett GitHub-ärende eller en pull request. Felaktiga poster leder till ett säkert avslag. Undantag kan inte undertrycka ett borttaget kandidat-test eller en diff som lägger till `.skip`/`.todo`;
försvagade assertioner och annan maskering hanteras av den separat blockerande
`check:test-masking`-kontrollen.

### Jobb: `lint`

Körs vid varje PR till `main`. Förhindrar sammanfogning vid fel.

| Skript (`npm run ...`)            | Validerar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Blockerande                                |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Node.js-versionen ligger inom det intervall som stöds                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:cycles`                    | Cirkulära importer i hela `src/` + `open-sse/` (AST-baserade, tsconfig-`paths` har lösts). Ett fristående körningstillfälle avslutas med status 1 närhelst någon cykel finns (fail-closed sedan #15281) och listar SCC:erna. `check:cycles:ratchet` (det som CI kör) blockerar när antalet överskrider gränsen `metrics.cycles` i `quality-baseline.json` — för närvarande 14, `direction: down`, så den kan endast minska (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja (ratchet)                               |
| `check:boundary`                  | Kopplingen `open-sse → src`: unika importeringar fil-till-fil från motorn till appen (`scripts/quality/measure-boundary.mjs`; kantlistan är åtgärdsefterloggen för v4:s kärn-/moduluppdelning). Ett fristående körningstillfälle ger en rådgivande rapport (samma som `quality:boundary`). `check:boundary:ratchet` (det som CI kör, även i ratchet-loopen för snabba grindar i `quality.yml`) blockerar när antalet överskrider gränsen `metrics.boundaryOpenSseToSrc` i `quality-baseline.json` — initierad till det uppmätta värdet 771, `direction: down`; `--update` sänker den endast; basrelativ på pull requests (`--base-ref`, se nedan)                                                                                                                                                                                                                                                                                       | Ja (ratchet)                               |
| `check:route-validation:t06`      | Zod-scheman finns på alla routes (policy för nivå 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                         |
| `check:any-budget:t11`            | Antalet `@ts-expect-error // any` överskrider inte budgeten (Tier 11-spärr)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:provider-consistency`      | Varje provider i `providers.ts` har en motsvarande post i `providerRegistry.ts` (och vice versa, inom allowlistan)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja                                         |
| `check:model-lifecycle`           | De tre manuellt underhållna routingtabellerna förblir konsekventa med den incheckade livscykelögonblicksbilden (#11503): `FITNESS_TABLE` (`taskFitness.ts`) poängsätter inget pensionerat id som `REGISTRY` kan dirigera; varje `BUILT_IN_ALIASES`-mål finns i `REGISTRY` och saknas i ögonblicksbilden av pensionerade id:n; varje pensionerat id som fortfarande finns i `REGISTRY` vidarebefordras eller listas i `allowedRetiredInCatalog`; och ingen källa eller något mål i `DEFAULT_DEGRADATION_MAP` anges som pensionerat i den ögonblicksbilden. Detta bevisar inte att en modell för närvarande tillhandahålls av en aktiv upstream. Offline — jämför med `config/quality/model-lifecycle.json`, som uppdateras manuellt med `npm run quality:refresh-model-lifecycle` (nätverk; inte ansluten till CI). `allowedRetiredInCatalog` är en nedtrappningsspärr: lägg endast till en post tillsammans med ett uppföljningsärende. | Ja                                         |
| `check:fetch-targets`             | Varje `fetch("/api/...")` i klientens `src/` matchar en verklig `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ja                                         |
| `check:deps`                      | Alla beroenden som kan installeras med `npm install` i varje `package.json` i repot finns i `dependency-allowlist.json`; nya opinnade eller slopsquattade paket flaggas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                         |
| `audit:deps`                      | `npm audit` (root + electron) — inga aviseringar med hög eller kritisk allvarlighetsgrad (överlapp med osv `check:vuln-ratchet`; se Rationaliseringsbacklogg)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                         |
| `check:lockfile`                  | Integriteten för `package-lock.json` — HTTPS-register, integritetshashar, inga värdöverskrivningar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja                                         |
| `check:licenses`                  | SPDX-licenslista över tillåtna produktionsberoenden                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                         |
| `check:tracked-artifacts`         | Inga byggartefakter eller committade `node_modules`-symboliska länkar (körs även i husky pre-commit; pre-push är avsiktligt begränsad — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:ai-attribution`            | Ingen AI-/bot-`Co-Authored-By`-trailer eller AI-genereringssidfot i PR-commits, titel eller brödtext — hård regel #16 (i loopen för snabba grindar i `quality.yml` för PR→`release/**` — läser händelsenyttolasten, gör inget utanför PR:er — och ett PR-exklusivt steg i `ci.yml`-lint för PR→`main`; även husky-hooken `commit-msg`; mänskliga medförfattare tillåts; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:vitest-exclusions`         | Varje Vitest-undantag anger ett uppföljningsärende och finns i `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ja                                         |
| `check:file-size`                 | Källfiler (`.ts`/`.tsx` i `src/`, `open-sse/`, `electron/`, `bin/`) håller sig inom `cap` och testfiler (`*.test.ts(x)`) inom `testCap`; filer som är låsta i `file-size-baseline.json` (`frozen` / `testFrozen`) får inte växa förbi sin registrerade storlek                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:error-helper`              | Felsvar i exekverare/hanterare använder `buildErrorBody()` / `sanitizeErrorMessage()` (hård regel #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ja                                         |
| `check:migration-numbering`       | Migrerings-SQL-filer är numrerade sekventiellt, utan luckor eller dubbletter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                         |
| `check:public-creds`              | Inga bokstavliga OAuth-`client_id`/`client_secret` eller Firebase-webbnycklar utanför `publicCreds.ts` (hård regel #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                         |
| `check:db-rules`                  | Ingen rå SQL utanför modulerna i `src/lib/db/`; inga barrel-importer från `localDb.ts` (hårda regler #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:known-symbols`             | Provider-exekverare, routningsstrategier och översättare som registrerats i deras dispatch-tabeller överensstämmer med filerna på disk — inga övergivna eller odeklarerade symboler                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                         |
| `check:route-guard-membership`    | Varje rutt som startar en underordnad process klassificeras av `isLocalOnlyPath()` (hårda regler #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                         |
| `check:test-discovery`            | Varje `*.test.ts` / `*.spec.ts`-fil i repot samlas in av minst en testkörning (ratchet: listan över övergivna filer i `test-discovery-baseline.json` kan bara krympa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:test-tla-order`            | Ingen `node:test`-fil under `tests/unit` registrerar ett test, når en `await` på toppnivå och registrerar sedan fler (#18045; ratchet: `test-tla-order-allowlist.json` kan bara krympa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                         |
| `check:agent-skills-sync`         | Genererade agent-skills-artefakter överensstämmer med sin källkatalog (ingen avvikelse)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:provider-asset-provenance` | Leverantörslogotyper/-tillgångar har en registrerad provenienspost                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `lint:json`                       | JSON-konfigurationsfiler kan tolkas och uppfyller repots lintregler                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `typecheck:core`                  | TypeScript-kompilering utan fel (endast rådgivande varningar)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                         |
| `typecheck:noimplicit:core`       | Strikt `noImplicitAny` — framåtblickande; många befintliga anropsställen behöver fortfarande annoteringar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | **Rådgivande** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` begränsad till `src/app/(dashboard)/**` (#7033) — den kuraterade listan över 27 tillåtna filer för `typecheck:core` innehåller ingen dashboard-TSX, och `next build` typkontrollerar den inte heller (`next.config.mjs` anger `ignoreBuildErrors: true`), så regressioner med överblivna identifierare där (#6625/#6909) var osynliga för CI. Jämför skillnader mot en fryst baslinje med antal per fil/TS-kod (`config/quality/dashboard-typecheck-baseline.json`, samma inaktuella valideringsmönster som `check:known-symbols`) — endast NYA fel utöver det baslinjeangivna antalet stoppar kontrollen; minska antalet med `--update` när ett befintligt fel har åtgärdats.                                                                                                                                                                                                                                                    | Ja                                         |

### Jobb: `quality-gate`

Körs efter `test-coverage`. Blockerar sammanfogning vid fel.

| Skript                       | Validerar                                                                                                                                                                                    | Blockerande          |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `quality:collect`            | Skapar `quality-metrics.json` (antal ESLint-varningar, täckning från den sammanslagna shard-rapporten)                                                                                       | Ja (föregår ratchet) |
| `quality:ratchet`            | Varje mätvärde i `quality-baseline.json` har inte försämrats (ESLint-varningar ≤ baslinje; täckning ≥ baslinje)                                                                              | Ja                   |
| `check:duplication`          | Kodduplicering (jscpd@4) överskrider inte baslinjen i `quality-baseline.json`                                                                                                                | Ja                   |
| `check:complexity`           | Cyklomatisk komplexitet på filnivå överskrider inte gränsen (kärnans ESLint `complexity` + `max-lines-per-function`)                                                                         | Ja                   |
| `check:cognitive-complexity` | Ratchet för kognitiv komplexitet (`eslint-plugin-sonarjs`) — separat ESLint-körning; CI kör båda sammanslagna som det enda steget `check:complexity-ratchets`                                | Ja                   |
| `check:dead-code`            | Ratchet för oanvända exporter/filer (knip) försämras inte jämfört med baslinjen                                                                                                              | Ja                   |
| `check:compression-budget`   | Budget för komprimeringsbenchmark — golven för tokenbesparingar per motor får inte försämras                                                                                                 | Ja                   |
| `check:type-coverage`        | Ratchet för typad andel (`type-coverage`) försämras inte; ersätter till stor del `typecheck:noimplicit:core`                                                                                 | Ja                   |
| `check:codeql-ratchet`       | Antalet öppna CodeQL-aviseringar försämras inte (läser via `gh api`; hoppar över på ett kontrollerat sätt utan token) — uppdateringsfrekvens och manuell utlösare: se "CodeQL-ratchet" nedan | Ja                   |

### Jobb: `quality-extended`

Hela jobbet är rådgivande (`continue-on-error: true`). npm-baserade ratchets körs
på riktigt; de externa skannrarna installeras via `gh release download` och hoppar
själva över körningen (avslutskod 0) när en binärfil fortfarande saknas.

| Skript                   | Validerar                                                                                                                                                                                                                | Blockerande                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `check:circular-deps`    | Inga cirkulära beroenden (dpdm)                                                                                                                                                                                          | **Rådgivande**                               |
| `check:bundle-size`      | Paketstorleken överskrider inte gränsen                                                                                                                                                                                  | **Rådgivande**                               |
| `check:secrets`          | Hemlighetsgenomsökning (gitleaks) — hoppar över om binärfilen saknas                                                                                                                                                     | **Rådgivande**                               |
| `check:vuln-ratchet`     | Sårbarheter i beroenden (osv-scanner) försämras inte — hoppar över om binärfilen saknas                                                                                                                                  | **Rådgivande**                               |
| `check:workflows`        | Lintning av arbetsflöden (actionlint + zizmor); saknade/trasiga skannrar, ogiltiga rapporter eller saknad ratchet-baslinje misslyckas som INCOMPLETE. Giltiga fynd följer den valda strikta/rådgivande/ratchet-principen | Körning krävs; zizmor-ratchet blockerar i CI |
| `check:openapi-breaking` | Brytande ändringar i det offentliga API-kontraktet (`openapi.yaml`) jämfört med basgrenen (oasdiff) — genererar `openapiBreaking=N`; hoppar över om oasdiff saknas eller basspecifikationen inte kan lösas               | **Rådgivande**                               |

### Jobb: `docs-sync-strict`

Körs för varje PR till `main`. Blockerar sammanfogning vid fel.

| Skript                         | Validerar                                                                                                                                                         | Blockerande              |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `check:docs-all`               | Metagrind som kör de 6 undergrindarna nedan sekventiellt                                                                                                          | Ja                       |
| ↳ `check:docs-sync`            | Versionskonsistens mellan CHANGELOG / OpenAPI / llm.txt                                                                                                           | Ja                       |
| ↳ `check:docs-counts`          | Antal i löptext (antal providers, migreringar osv.) ligger inom ratchet-fönstret för de verkliga antalen                                                          | Ja                       |
| ↳ `check:env-doc-sync`         | Alla miljövariabler i `.env.example` är dokumenterade i en dokumentationstabell, och vice versa                                                                   | Ja                       |
| ↳ `check:deprecated-versions`  | Inga föråldrade versionssträngar i dokumentationen                                                                                                                | Ja                       |
| ↳ `check:doc-links`            | Interna Markdown-länkar i dokumentationen leder till befintliga filer (`[text]`/`(path)`-format)                                                                  | Ja                       |
| ↳ `check:fabricated-docs`      | Routes, miljövariabler, CLI-kommandon, hook-namn och filsökvägar som anges i dokumentationen finns i kodbasen. Hård grind med `--strict`; mjukt fel utan flaggan. | Ja (via `--strict` i CI) |
| `check:cli-i18n`               | CLI-kommandosträngar finns i alla i18n-lokaliseringsfiler                                                                                                         | Ja                       |
| `check:openapi-coverage`       | OpenAPI-specifikationen täcker minst ett ratchetat golv av verkliga routes                                                                                        | Ja                       |
| `check:openapi-security-tiers` | Säkerhetsnivåkommentarer i `openapi.yaml` överensstämmer med klassificeringarna i `routeGuard.ts`                                                                 | **Rådgivande**           |
| `check:openapi-routes`         | Varje sökväg i `openapi.yaml` leder till en verklig `route.ts` (skydd mot hallucinationer)                                                                        | Ja                       |
| `check:docs-symbols`           | Varje `/api/...`-referens i `docs/**/*.md` leder till en verklig `route.ts` (skydd mot hallucinationer)                                                           | Ja                       |
| `i18n translation drift`       | Oöversatta nycklar i i18n-lokaliseringsfiler — endast varning                                                                                                     | **Rådgivande**           |

De tolv README-SVG:erna under `docs/diagrams/` genereras (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` regenererar alla). Var och en har ett enhetstest som jämför byte för byte
(`tests/unit/docs/readme-*-svg.test.ts`, jobbet `test-unit`) som misslyckas när den incheckade filen är inaktuell, och `check:docs-counts` läser kanoniska tal från deras `<text>`-noder — vilket är anledningen till att konturstegen behåller varje kontursträng i filen som osynlig `<text>`. SVG-kontrollen av kanoniska tal läser filerna som listas i
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, samt `public/images/tier-flow-dark.svg` och `tier-flow-light.svg`;
påståendena om free-forever, catalog-entry, recurring-pool och scoring-factors läser också
`promise-pillars.svg`, `free-tier-budget.svg` och `strategies-grid.svg`. `free-tier-budget.svg`
hämtar sina siffror från den aktiva katalogladdaren, så en ändring av `FREE_MODEL_BUDGETS` eller av
ett visningsnamn för en provider gör CI röd tills filen har regenererats.

### Jobb: `i18n-ui-coverage`

| Skript                            | Validerar                                                                                                                                                                                                  | Blockerande    |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | Täckningen av UI-i18n-nycklar är ≥ 65 %                                                                                                                                                                    | Ja             |
| `check-ui-value-drift` (inline)   | Ett omskrivet engelskt **värde** lämnar ingen gammal översättning kvar                                                                                                                                     | Ja             |
| `check-new-key-coverage` (inline) | En **ny** engelsk nyckel är översatt i varje lokal — en `__MISSING__:`-markör avvisas                                                                                                                      | Ja             |
| `check-translation-ratio`         | Andelen verkliga översättningar per lokal (identiska med engelskan / platshållare / saknade värden utanför tillåtelselistan) får inte överstiga `config/quality/i18n-translation-baseline.json` + marginal | **Rådgivande** |

Kräver `fetch-depth: 0` — värdedriftgrinden jämför `en.json` med merge-basen.

#### `check-ui-value-drift` — grind för gamla översättningar

Fångar den enda i18n-regression som de andra grindarna strukturellt inte kan se: ett engelskt värde
skrivs om och översättningarna som härleddes från den _tidigare_ engelskan blir kvar, så
icke-engelskspråkiga användare fortsätter att läsa självsäkert formulerad men nu felaktig text.

Detta skickades faktiskt ut. `oauthModal.googleOAuthWarning` skrevs om när Antigravitys
inloggningshjälp landade (#5203); **39 av 43 språkversioner** behöll text som sa åt operatörer att "kopiera
hela URL:en och klistra in den nedan" — ett flöde som inte kan slutföras för den leverantören. Det
förblev oupptäckt fram till #8463 eftersom:

- `sync-ui-keys` fyller bara på nycklar som **saknas**, aldrig sådana som är **inaktuella**;
- `check-ui-keys-coverage` räknar förekomsten av nycklar, så en inaktuell översättning räknas som täckt;
- `check-translation-drift` spårar dokumentationsspeglingarna `docs/i18n/<locale>/**.md` —
  den läser aldrig `src/i18n/messages/*.json`. Blockerande i jobbet `docs-sync-strict` sedan
  omsynkningen i 2026-09: redigera ett centralt dokument → `npm run i18n:run -- --files=<doc>` (på
  sektionsnivå, billigt).

**Diffmedveten, inte baslinjebaserad.** Den jämför `en.json` vid merge-basen med
arbetskopian; för varje nyckel vars engelska värde ändrats är alla språkversioner som fortfarande
har en orörd översättning inaktuella. Detta **fryser medvetet befintlig skuld** — en diff kan inte
visa vilken gammal engelska en långvarig översättning härrörde från, så grinden bedömer endast det
som den aktuella ändringen påverkar. Alternativet (en hashbaslinje per nyckel) skulle kosta en
genererad fil på cirka 600 KB, tre gånger större än den största befintliga baslinjen, och ändras vid
varje i18n-PR.

Två sätt att uppfylla kravet:

1. uppdatera de berörda översättningarna, eller
2. ange dem som `__MISSING__:<new english>` — körningen visar då den korrigerade engelskan
   (`src/i18n/request.ts::deepMergeFallback`, #7258) och nyckeln köas för översättning.

Om strängens **betydelse** ändrades bör du föredra att **döpa om nyckeln**: en ny nyckel kan inte ärva
en inaktuell översättning. Det var mönstret som användes i #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Avslutas med 0 och `SKIP reason=base-unresolved` när baskatalogen inte kan läsas (en ytlig
klon utan basreferensen), i likhet med `check-openapi-breaking`.

### Jobb: `i18n`

Fullständig valideringsmatris för i18n (ett jobb per språkversion). Hela jobbet är rådgivande.

| Skript                          | Validerar                                         | Blockerande                                                |
| ------------------------------- | ------------------------------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | Översättningarnas fullständighet per språkversion | **Rådgivande** (`continue-on-error: true` för hela jobbet) |

### Jobb: `pr-test-policy`

Körs endast vid pull requests.

| Skript                 | Validerar                                                                                                                                         | Blockerande |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check:pr-test-policy` | PR:er som ändrar produktionskod i `src/`, `open-sse/`, `electron/` eller `bin/` måste inkludera eller uppdatera tester (hård regel nr 8)          | Ja          |
| `check:test-masking`   | Ändrade testfiler minskar inte det totala antalet assert-anrop eller lägger till tautologier av typen `assert.ok(true)`                           | Ja          |
| `check:pr-evidence`    | PR-beskrivningen hänvisar till test-/VPS-bevis för ändringen (mekaniserar hård regel nr 18 genom att söka i PR-texten — bräckligt, se backloggen) | Ja          |

### Jobb: `test-vitest`

Körs efter `build`. Blockerar merge vid fel.

| Testsvit         | Validerar                                                   | Blockerande                                                                                                          |
| ---------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-server (110 verktyg), autoCombo, cache — vitest-körning | Ja                                                                                                                   |
| `test:vitest:ui` | Tester av UI-komponenter — vitest-körning                   | **Blockerande** — befintliga fel är uttryckligen exkluderade i `vitest.config.ts`; nya fel gör att jobbet misslyckas |

### Nattliga arbetsflöden (schemalagda, rådgivande)

Dessa körs enligt ett cron-schema (samt via `workflow_dispatch`), aldrig vid PR:er. Alla är rådgivande.

| Arbetsflöde            | Validerar                                                                                                                                                           | Blockerande    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | fast-check-egenskapstester med ett slumpmässigt seed + högt antal körningar                                                                                         | **Rådgivande** |
| `nightly-resilience`   | grind för heap-tillväxt, kaosbaserad felinjektion, k6-belastning/uthållighetstest                                                                                   | **Rådgivande** |
| `nightly-llm-security` | promptfoo-injektionsskydd (blockeringsläge) + garak-sonder (skippas utan en leverantörshemlighet)                                                                   | **Rådgivande** |
| `nightly-schemathesis` | OpenAPI-kontraktsfuzzning (schemathesis) mot en aktiv OmniRoute med `docs/openapi.yaml` — identifierar specifikationsöverträdelser / ohanterade 500-fel (Fas 8 B.4) | **Rådgivande** |
| `nightly-mutation`     | Stryker-resultat för mutationstestning över den snabba enhetstestkörningen — överlevande mutanter identifierar svaga assert-satser                                  | **Rådgivande** |
| `nightly-compat`       | Kompatibilitetsmatris för Node-motorn över de `engines.node`-intervall som stöds                                                                                    | **Rådgivande** |

Prestandabaslinjer (heap, TTFB, byggtid) registreras men används inte som grind: se [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Hastighetsfas (2026-08-30 → v4.0 LTS): varje baslinje lättades med 20 %

Ägarbeslut (2026-08-30): fram till modulariseringen i v4.0 är leveranshastigheten viktigare
än att hålla nere den tekniska skulden. Varje **numerisk** ratchet-baslinje lättades med 20 % i en
reviderbar engångsåtgärd, och fasen deklareras i `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Vad som ändrades                                                                                                                                                                                         | Var                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — antal där lägre är bättre ×1,2, procenttal där högre är bättre ÷1,2 (täckningsgolvet 60 behölls, `eslintErrors` förblir 0, `eslintWarnings` 0 → 20 % av det frysta antalet undantag) | `quality-baseline.json` (`_relax_velocity_2026_08_30`-anteckningen listar varje före → efter)          |
| `count` ×1,2 / `percentage` ×1,2                                                                                                                                                                         | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, varje radgräns i `frozen[*]` / `testFrozen[*]` ×1,2                                                                                                                                    | `file-size-baseline.json`                                                                              |
| antal per fil/per TS-kod ×1,2                                                                                                                                                                            | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                      | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` blir rådgivande när `_policy.requireTighten === false`                                                                                                                               | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| nattliga `bank-ratchet-shrinks` pausas (det skulle registrera den uppmätta minskningen och upphäva marginalen)                                                                                           | `.github/workflows/nightly-release-green.yml`                                                          |

Tillåtelselistor (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) är **inte** budgetar och ändrades inte. Policygrindar för godkänt/underkänt (hemligheter, SQL-regler,
docs/env-kontrakt, i18n-paritet, enhetstester) är oförändrade — ett rött test är fortfarande ett rött test.

**Verktyg**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` —
  engångslättnaden (`scripts/quality/relax-baselines.mjs`); vägrar att köras två gånger med samma
  anteckning.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mäter varje numerisk grind på samma sätt som CI och skriver ut återstående marginal per grind
  (`scripts/quality/baseline-headroom.mjs`). Det nattliga jobbet `baseline-headroom` publicerar
  tabellen i arbetsflödeskörningens sammanfattning och laddar upp dess JSON-/Markdown-rapport som
  `baseline-headroom-<run_id>`, sparad i 90 dagar. Varningsrader och kritiska rader identifierar grindar
  som ligger inom 10 % från sitt tak eller redan över det. Granska dessa rapporter som tidig varning
  om att budgetarna förbrukas; inspektera `_rebaseline_*`-anteckningarna för den berörda grinden. Jobbet
  skapar eller uppdaterar inte längre ett permanent ärende; #12149 bevarar den tidigare rapporthistoriken.

**Läge för ny kod (Clean-as-You-Code) — sedan 2026-08-30, endast snabbspår för PR:er**

Vid `pull_request`-händelser skickar `quality.yml` `--base-ref <PR base SHA>` till `check:file-size`,
`check:complexity-ratchets` och `check:dead-code`. För `check:complexity-ratchets` och
`check:dead-code` jämför grinden HEAD med merge-basen, **begränsat till de filer som PR:en
ändrade** (`scripts/check/newCodeMode.mjs`: merge-basen materialiseras i en tillfällig
`git worktree`, ESLint/knip körs där och på HEAD, och antalen per fil jämförs):

- **blockerande** — PR:en lade till cyklomatiska/kognitiva överträdelser eller döda exporter i filer som den ändrade
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` i loggen);
- **rådgivande** — den globala totalsumman jämfört med den frysta baslinjen. Ärftlig avvikelse gör aldrig en
  oskyldig PR röd; avvikelsen fryses om vid versionsavstämningen och övervakas av marginaljobbet.

`check:file-size` använder basreferensen på sina egna villkor (`scripts/check/check-file-size.mjs`, #8522):
det kontrollerar varje källkods- och testfil i trädet, läser varje fils radantal vid PR-basreferensen
med `git show` och underkänner en fil endast när den växer förbi det större av dess baslinjetak
(`frozen` / `testFrozen`, eller `cap` / `testCap` för en fil utanför baslinjen) och dess basstorlek.
En fil som redan avvek i basen gör därför aldrig en oskyldig PR röd.

`check:boundary:ratchet` tillämpar samma regel på sitt enda tal
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): vid PR-händelser skickar både
snabbgrindarna i `quality.yml` och lint-jobbet i `ci.yml` PR-basens SHA, baskommitten
mäts från en `git archive`-export, och PR:en misslyckas endast när dess antal kanter för
`open-sse → src` överstiger det högre värdet av `metrics.boundaryOpenSseToSrc` och antalet i basen. Basdrift
över taket rapporteras (`ärvd basdrift`) men gör aldrig att en oskyldig PR blir röd; push → main
behåller det absoluta taket, och en bas-SHA som inte kan lösas faller tillbaka till det med en varning.

`workflow_dispatch`-körningar, den releasegröna genomgången och det nattliga headroom-jobbet har ingen PR-bas
och behåller den absoluta (globala) jämförelsen. Täckning, duplicering och typ­täckning förblir globala
tills vidare (deras verktyg producerar inte billigt en diff per fil) — kandidater för samma behandling.

**Avsluta fasen vid v4.0 (LTS = striktare än tidigare, inte ”tillbaka till det normala”)**

1. På den rena `release/v4.0.0`-toppen: `npm run quality:headroom --json` för dokumentation, därefter
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, varje typecheck-grinds
   `--update` — varje baslinje sänks till det uppmätta värdet.
2. Ta bort `_policy` från `quality-baseline.json` (återaktiverar `--require-tighten` och den nattliga
   buffertuppbyggnaden), återställ `THRESHOLD = 36` (eller högre) i `check-openapi-coverage.mjs`.
3. Skärp gränserna utöver de uppmätta värdena där modulariseringen gav resultat: återställ `cap` för filstorlek till 1000
   (eller 800), höj täckningsgolven med 5, sätt antalet döda exporter till 0 för de modulariserade paketen.

## Ratchet-baslinje (`quality-baseline.json`)

Ratchet-motorn (`scripts/quality/check-quality-ratchet.mjs`) läser `quality-baseline.json`
och jämför den med den nyligen insamlade `quality-metrics.json`. Alla mätvärden som försämras
mer än sitt epsilonvärde gör att bygget misslyckas.

Mätvärden som spåras för närvarande:

| Mätvärde              | Riktning | Betydelse                             |
| --------------------- | -------- | ------------------------------------- |
| `eslintWarnings`      | `down`   | Antalet ESLint-varningar får inte öka |
| `coverage.statements` | `up`     | Sats-täckningen får inte minska       |
| `coverage.lines`      | `up`     | Radtäckningen får inte minska         |
| `coverage.functions`  | `up`     | Funktionstäckningen får inte minska   |
| `coverage.branches`   | `up`     | Grentäckningen får inte minska        |

Så här uppdaterar du baslinjen efter en verklig förbättring:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Flaggan `--update` skriver de aktuella uppmätta värdena till `quality-baseline.json`.
Checka in den här filen tillsammans med ändringen som förbättrade mätvärdet. En PR som förbättrar ett
mätvärde utan att uppdatera baslinjen kommer att upptäckas av `--require-tighten` (fas 6A.5,
implementering återstår).

### CodeQL-ratchet: uppdateringsintervall och manuell utlösning

`check:codeql-ratchet` läser **lagringsplatsens tillstånd, som uppdateras enligt ett schema — inte för varje PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` rapporterar
`state: configured`, `schedule: weekly`: GitHubs standardskanning, inte en analys för
varje push. Konsekvens: efter att en PR som ÅTGÄRDAR aviseringar har slagits samman fortsätter ratchet-motorn att läsa
det gamla, högre antalet tills nästa schemalagda skanning körs — därför rapporteras en regression
för varje öppen PR, inklusive uppföljningar till den åtgärdande PR:en, tills skanningen har hunnit ikapp.

**Manuell uppdatering**: `gh workflow run codeql.yml --ref release/vX.Y.Z` kör om
analysen och publicerar aviseringarna på nytt inom några minuter. Läs `.github/workflows/codeql.yml`
först — dess sidhuvud förklarar att den endast använder `workflow_dispatch` **eftersom den står i konflikt med
GitHubs "default setup"** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Att återställa utlösare för `push`/`pull_request`/
`schedule` kräver **först en åtgärd av ägaren**: Settings → Code security →
CodeQL: Default → Advanced. Lägg inte till en `schedule:`-utlösare utan denna ändring — den
kommer endast att ge misslyckade körningar.

**Skärp baslinjen när antalet har minskat** — `node scripts/check/check-codeql-ratchet.mjs
--update` skriver det nya uppmätta antalet till `quality-baseline.json` →
`metrics.codeqlAlerts.value`, så att ratchet-motorn inte underförstått tillåter en regression tillbaka
upp till det gamla taket. Genomfört exempel (2026-09-02/03): PR #12502 åtgärdade 7 verkliga aviseringar
(13 → 6 uppmätta öppna); PR #12530 skärpte den frysta baslinjen från 11 → 6 för att matcha; de
återstående 6 avfärdades sedan med en motivering per avisering tills antalet öppna var 0.

**Avfärdanden är operatörens beslut (hård regel #14)** — avfärda aldrig en CodeQL-avisering
utan att dokumentera den tekniska motiveringen i avfärdandekommentaren: `won't fix` för
ett krav från ett uppströmsprotokoll, `used in tests` för en testfixtur, `false positive`
för en sanerare som CodeQL inte kan upptäcka (prejudikat: `docs/security/ERROR_SANITIZATION.md`).

---

## Policy för omkörning av tester (WS5.4, v3.8.49)

Omkörning konfigureras per testkörningsverktyg, aldrig som en global standardlösning — en generell omkörning förvandlar verkliga regressioner
till osynlig instabilitet:

| Testkörningsverktyg | Policy                                                                                                                 | Varför                                                                                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e)    | `retries: 1` endast i CI, med `trace: on-first-retry`                                                                  | Tidsvariationer i webbläsare/nätverk är genuint icke-deterministiska; en omkörning med spårning förvandlar ett instabilt fel till en diagnostiserbar artefakt |
| Vitest              | INGEN global omkörning. Ett bevisat instabilt test får en explicit omkörning per test (synlig i diffen, granskad i PR) | Håller karantänlistan synlig i repot, aldrig ogenomskinlig                                                                                                    |
| node:test (enhet)   | INGEN omkörning, någonsin                                                                                              | Ett instabilt enhetstest är en bugg i testet — åtgärda det, kör inte bara om det                                                                              |

Mål-SLO:er när telemetri för instabilitet finns på plats (WS5.2/5.3): <1 % instabilitetsfrekvens per test
(tröskel för ”åtgärda nu”), ≥95 % godkännandefrekvens per pipeline. Referensvärden från branschen —
kalibrera om dem utifrån våra egna mätningar.

## Förskjutning av ratchet-gränser på release-nivå (WS5.5, v3.8.49)

När en ratchet-gräns (filstorlek, komplexitet, eslint-varningar) försämras på den RENA release-spetsen
— det vill säga att KOMBINATIONEN av sammanslagningar försämrade den och att ingen enskild PR återskapar
regressionen på sin egen gren — ligger åtgärden hos **release-ansvarig, en gång, på
release-grenen**: föredra extrahering/refaktorering; ombasera gränsvärdet endast med den dokumenterade
motiveringsposten. Lägg aldrig över kombinationsförskjutning på en bidragsgivares PR och
ombasera aldrig gränsvärdet per PR (det döljer verkliga regressioner). Särskilj orsaken först: återskapa
det röda resultatet mot den rena spetsen i ett worktree för undersökning innan du antar att din PR orsakade det.

## Tillgodoräkning av sänkta ratchet-gränser — riktningen nedåt (#8584)

Ratchet-mekanismen är bara till hälften automatisk, och det är fel hälft. Att **höja** ett tak är en
manuell JSON-redigering som tar tio sekunder och är det snabbaste sättet att låsa upp en röd PR.
Att **sänka** ett tak kräver att någon kör `--update` och committar resultatet — och innan jobbet
`bank-ratchet-shrinks` infördes körde inget arbetsflöde det. Den uppmätta konsekvensen
(2026-07-25): 18 frysta filer låg redan på eller under taket på 800 rader för nya filer, där den värsta
låg på 132× (`src/shared/validation/schemas.ts`, 19 rader med ett tak på 2 523); komplexitetstaket
förflyttades `1794 → 2169` över cirka 37 ombaseringsanteckningar med exakt en
sänkning (−1); och ”skärp via `--update` i nästa cykel” skrevs 31 gånger men följdes
en gång. Ett tak som överlever koden som motiverade det omvandlar i tysthet varje slutförd
uppdelning till ett tillväxtutrymme för nästa person som redigerar filen.

`nightly-release-green.yml` → jobbet **`bank-ratchet-shrinks`** sluter den återkopplingsloopen:

|            |                                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------ |
| Körs vid   | `schedule` (3×/dag) + `workflow_dispatch` — avsiktligt **inte** `push`                                             |
| Mäter      | den högsta `release/vX.Y.Z`, med samma upplösning och injiceringsskydd som `release-green`                         |
| Skriver    | `check:file-size --update` och `check:complexity-ratchets --update` (båda kan genom sin konstruktion endast sänka) |
| Verifierar | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                           |
| Levererar  | en enda, alltid aktuell PR mot release-grenen — tvångsuppdaterad, aldrig spammad                                   |

Tillgodoräkningen sker satsvis i stället för vid varje push eftersom den inte har några latenskrav (en sänkning
som tillgodoräknas inom 8 timmar är tillräckligt), medan en körning per sammanslagning skulle bygga om PR-grenen upprepade gånger
under sammanslagningskampanjer och kräva en fullständig ESLint-genomgång varje gång. Detekteringen sker fortfarande vid
push (`release-green`); endast tillgodoräkningen sker satsvis.

### Säkerhetsverifieraren

Jobbet skriver obevakat till baslinjerna, så `verify-ratchet-bank.mjs` är det som gör
det acceptabelt. Det jämför trädet efter `--update` med `HEAD` och **avbryter jobbet
innan någon commit finns** — utan att öppna någon PR — om inte varje ändring är någon av följande:

- en numerisk post i `frozen` / `testFrozen` som har **sänkts** eller **tagits bort**
- `complexity-baseline.json` → `count` har **sänkts**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` har **sänkts**

Allt annat misslyckas: att höja ett tal, lägga till en post, ändra `cap`/`testCap` eller
ta bort/skriva om en `_rebaseline_*`-anteckning (dessa anteckningar är revisionsspåret för varför varje
tak finns och lagras i samma `frozen`-objekt som filposterna).
En bot som skulle kunna höja ett tak vore strikt sämre än status quo. Regressionsskydd:
`tests/unit/verify-ratchet-bank.test.ts`.

Jobbet pushar aldrig till `release/*` — en människa slår samman PR:en, så en felaktig mätning
kan inte införas utan granskning.

## Princip för tillåtelselistor

Varje grind som inte får fallera på redan befintliga överträdelser använder en fryst tillåtelselista
(t.ex. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Principen är:

**Åtgärda grundorsaken; använd endast tillåtelselistan när överträdelsen redan fanns och
inte kan åtgärdas i samma PR.**

När du lägger till en post i en tillåtelselista:

1. Inkludera en kommentar med motiveringen.
2. Hänvisa till spårningsärendet (t.ex. `// #3498 — Funktion i fas 2, ännu inte implementerad`).
3. Ta bort posten i samma PR som åtgärdar överträdelsen — en inaktuell post som inte längre
   undertrycker en aktiv överträdelse är i sig en defekt (kontrollen av inaktuell tillämpning i 6A.3
   kommer att fälla grinden för en föräldralös post i tillåtelselistan när den har implementerats).

Lägg **inte** till poster i tillåtelselistan för att få testerna att passera snabbare. En grön grind med en växande
tillåtelselista ger en falsk känsla av kvalitet.

### När en grind fallerar för din PR

1. **Läs utdata från grinden noggrant** — den anger exakt vilken fil eller symbol som bröt mot
   regeln.
2. **Åtgärda överträdelsen** — de flesta grindar är deterministiska filsystemskontroller som passerar så snart
   koden är korrekt.
3. **Om överträdelsen redan fanns** (dvs. du introducerade den inte, men grinden
   omfattar den nu): lägg till en post i tillåtelselistan med en motiverande kommentar och ett spårningsärende.
4. **Om grinden är en spärrhake** (täckning, ESLint-varningar, duplicering, komplexitet):
   din ändring försämrade mätvärdet. Åtgärda det underliggande problemet eller kör (i sällsynta fall)
   `npm run quality:ratchet -- --update` om ändringen är avsiktlig och försämringen av mätvärdet
   är acceptabel — men dokumentera varför i PR-beskrivningen.
5. **Rådgivande grindar** (`continue-on-error: true`) är informativa — de blockerar inte
   sammanslagning men visas i CI-sammanfattningen. Åtgärda dem ändå.

---

## Lägga till en ny grind

1. Skapa `scripts/check/check-<name>.mjs` (eller `.ts`). Policygrindar avslutas med 0/1.
   Grindar av spärrhaketyp skriver ett mätvärde till `quality-metrics.json` via `collect-metrics.mjs`.
2. Lägg till `"check:<name>": "node scripts/check/check-<name>.mjs"` i `package.json`.
3. Koppla in den i `.github/workflows/ci.yml` under lämpligt jobb
   (policy → `lint` eller `docs-sync-strict`; spärrhake → `quality-gate`).
4. Om den har en tillåtelselista ska du använda `reportStaleEntries()` från
   `scripts/check/lib/allowlist.mjs` så att inaktuella poster identifieras automatiskt.
5. Skriv ett test i `tests/unit/build/` som täcker grindens detekteringslogik.
6. Uppdatera det här dokumentet (lägg till en rad i tabellen för det relevanta jobbet).

---

## Agentverktyg: LSP-i-loopen (valfritt)

Utöver CI-grindarna levereras OmniRoute med en **valfri** `agent-lsp`-grundstruktur
(en `.mcp.json` på projektnivå, fas 7, uppgift 15). Skapa `.mcp.json`
för att exponera en TypeScript-språkserver för kodningsagenter, så att de slår upp symboler/
diagnostik **innan** de skriver kod — ett kompilera-före-påstående-komplement till
`typecheck:core` som eliminerar fel med ”påhittade symboler” vid källan. Den läses avsiktligt
inte in automatiskt (du väljer och verifierar MCP↔LSP-bryggan); en felaktig post loggar endast ett
anslutningsfel och avbryter aldrig sessioner.

---

## Rationaliseringsbacklogg (ROI-granskning — fas 9 våg 3)

Den här inventeringen stämdes av mot `ci.yml` den 2026-06-17 (den föregående versionen utelämnade
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). En ROI-granskning av den avstämda uppsättningen
identifierade följande kandidater för rationalisering. **Sammanslagningarna är mekaniska CI-
ändringar; växlingarna/borttagningarna är policybeslut som är förbehållna operatören.** Inget nedan
har tillämpats ännu.

**Inte heller dokumenterat ovan** (rådgivande, låg signal): jobbet `docs-lint`
(markdownlint + Vale, hela jobbet har `continue-on-error`) och de fristående skanningsarbetsflödena
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` finns i
`quality-baseline.json` men är inte kopplat till någon blockerande spärrmekanism i `ci.yml` — mätvärdet är
för närvarande frikopplat.

### Slå ihop / deduplicera (mekaniskt, lägre risk)

Varje kandidat validerades mot det aktuella grindläget den 2026-06-17 (lita men verifiera);
flera ”uppenbara” sammanslagningar visade sig dölja skuld och är **inte** problemfria direktlösningar.

- **`check:docs-sync` körs två gånger** — fristående i jobbet `lint` och återigen inuti `check:docs-all` (`docs-sync-strict`) samt i husky-pre-commit-kroken. ✅ **KLART** — den fristående anropningen i `lint` har tagits bort.
- **CVE-skanning** — ❌ **INTE en problemfri sammanslagning.** `audit:deps` stoppar ovillkorligen vid varje CVE med hög/kritisk allvarlighetsgrad; `check:vuln-ratchet` (osv) misslyckas endast vid en _regression_ jämfört med baslinjen (för närvarande 1 MODERATE). Olika semantik — att ta bort `audit:deps` skulle innebära att den absoluta grinden för hög/kritisk allvarlighetsgrad försvinner. Behåll båda.
- **Cykeldetektering** — ✅ **KLART** (#15159 G-01/G-02). Den gamla texten här kallade `check:cycles` för den ”gröna, handplockade” grinden och motiverade att den skulle förbli blockerande eftersom `check:circular-deps` (dpdm) rapporterade 91 cykler. Det gröna resultatet var **falskt grönt**: `check:cycles` skannade 5 underkataloger (450 filer), matchade endast statiska `import|export … from` och ignorerade varje `@/`- och `@omniroute/open-sse/`-specifierare, så den kunde inte se de cykler med dynamisk import + alias som dominerade kodbasen. Åtgärdat: grinden går nu igenom `src` + `open-sse` (5023 filer), samlar in specifierare från TypeScript-AST:n (så `import("…")` räknas medan `typeof import("…")` i typposition inte gör det) och löser tsconfig-`paths`. Den hittar **14** cykler, inte 0. Eftersom 14 befintliga cykler inte kan åtgärdas i en grind-PR är `check:cycles` nu en **spärrmekanism** (`--ratchet`, tak `metrics.cycles.value = 14` i `quality-baseline.json`, `direction: down`) — den blockerar varje _regression_ och antalet kan endast minska. CI kör `npm run check:cycles:ratchet`. Nedarbetningen följer med **A-01**. `check:circular-deps` (dpdm) förblir rådgivande som en bredare andrahandsbedömning.
- **Komplexitet** — ✅ **KLART** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): en ESLint-genomgång, räknar per ruleId så att baslinjerna för cyklomatisk komplexitet + maximalt antal rader och kognitiv komplexitet förblir oberoende; individuella `check:complexity` / `check:cognitive-complexity` finns kvar för lokal `--update`.
- **Antihallucination för `/api`** — ✅ **KLART** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): en FS-inventering av `src/app/api`, openapi-routes + docs-symbols rapporterar fortfarande oberoende; individuella kontroller finns kvar för lokala körningar.
- **`check:node-runtime` körs i 11 jobb** — ⚠️ **låg ROI.** Varje jobb har en separat körmiljö och kontrollen tar <1 s; total besparing ~10 s, på bekostnad av att förlora ett billigt skydd per jobb. Inte värt omarbetningen.
- **`typecheck:noimplicit:core` i CI-lint** — ✅ **borttaget från lint-jobbet** (var rådgivande med `continue-on-error`); den blockerande typytan är `typecheck:core` + `check:type-coverage`. Det lokala skriptet har behållits.

### Växla / besluta (operatörspolicy)

- `check:openapi-security-tiers` (rådgivande) — ❌ **KAN INTE växlas utan föregående åtgärder.** Den avslutas med 0 men varnar för att flera `traffic-inspector`-rutter under `LOCAL_ONLY_API_PREFIXES` saknar annoteringen `x-loopback-only: true`. För att verkställa den måste dessa annoteringar först läggas till i `openapi.yaml`.
- `typecheck:noimplicit:core` (rådgivande) — ersätts till stor del av den blockerande spärrmekanismen `check:type-coverage`. Växla till en spärrmekanism eller ta bort den redundanta andra `tsc`-körningen.
- `test:vitest:ui` (nu **blockerande**) — befintliga fel exkluderas uttryckligen i `vitest.config.ts` med spårningskommentarer av typen `// #8618`; nya fel gör att jobbet misslyckas.
- `check:secrets` (gitleaks, blockerande spärrmekanism fryst vid 3 dokumenterade falska positiva resultat) — tillåtelselista de 3 för att nå 0 eller nedgradera till rådgivande. Överlappar GitHubs inbyggda hemlighetsskanning + `check:public-creds`.
- `check:pr-evidence` (blockerande, söker med grep i PR-beskrivningens prosa) — hög risk för falska positiva resultat; att ta bort den försvagar upprätthållandet av hård regel nr 18, så detta är ett verkligt policybeslut.
- `semgrep` (fristående rådgivande) — överlappar CodeQL för OWASP-familjerna; koppla dess baslinje till en spärrmekanism eller ta bort den.

---

## Relaterad dokumentation

- Leveranskedja (ursprung, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — spärr för överensstämmelse mellan nyckeluppsättningar

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, jobbet `i18n-ui-coverage`).
Jämför uppsättningen lövnycklar i varje `src/i18n/messages/<locale>.json` med `en.json` och
misslyckas om någon lövnyckel saknas eller är överflödig, oavsett när nyckeln lades till.
Platshållare av typen `__MISSING__:` räknas som befintliga (deras innehåll hanteras av
förhållandespärren). Detta är det absoluta komplementet till de två diffbaserade/procentuella
spärrarna: `check-ui-keys-coverage` kräver en lägstanivå på 80 % per språkversion
(43 saknade nycklar av ~13 000 ger fortfarande 99,7 %) och `check-new-key-coverage` bedömer
endast de nycklar som en PR lägger till i `en.json`. En omgång språkversioner genereras från den
`en.json` som finns den dag dess gren skapas och översätts under flera dagar medan basen fortsätter
att få nya nycklar; omgångens PR lägger inte själv till någon nyckel, så båda syskonspärrarna förblev
tysta när omgång 1 (#13044) slogs samman med 43 saknade nycklar i nio språkversioner och omgång 2
(#13660) med 10 saknade nycklar i åtta (2026-09-15). Åtgärda ett rött resultat med
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; en `extra`-lövnyckel
innebär att källan har tagit bort den — ta bort den från språkversionen. `--warn` rapporterar utan
att misslyckas. `--catalog=cli` kör samma jämförelse för `bin/cli/locales`
(`npm run i18n:check-keys:cli`); båda stegen finns i jobbet `i18n-ui-coverage`.

#### `check-new-key-coverage` — i18n-spärr för nya nycklar

Syskon till `check-ui-value-drift`. Den spärren upptäcker ett engelskt värde som har
**skrivits om** medan dess översättningar lämnats oförändrade; den här upptäcker en engelsk
nyckel som har **lagts till** utan att vissa språkversioner har fått den.

`check-ui-keys-coverage` kan inte upptäcka den här typen: den kräver en procentuell lägstanivå
per språkversion, och elva saknade nycklar av ~13 000 lämnar täckningen på 99,9 %. En procentsats
per språk kan inte uttrycka ”den här funktionen levererades oöversatt” — en hel funktion kan
läggas till i en ny språkversion utan någon text alls utan att siffran förändras.

Incidenten som spärren kodifierar: Fas 3 av Orchestration Canvas översatte sina elva nycklar för
de 42 språkversioner som fanns vid den tidpunkten. Några timmar senare utökade omgången med
EU-språk (#13044) repot till 51 språkversioner, och de nio nytillkomna (`el`, `et`, `ga`, `hr`,
`lt`, `lv`, `mt`, `sl`, `sr`) fick dem aldrig. `deepMergeFallback` ersätter en saknad nyckel med
engelska, så felet gav ett oöversatt användargränssnitt i stället för ett tomt användargränssnitt
— ett verkligt fel som till sin natur förblev tyst.

Precis som sitt syskon är spärren **diffmedveten** och jämför engelskan vid sammanslagningsbasen
med arbetsträdet, så befintliga luckor förblir frysta och ingen migrering behövdes för att aktivera
spärren.

**En `__MISSING__:<english>`-markör uppfyller inte kravet (sedan 2026-09-17).** Tidigare var den
den dokumenterade uppskjutningsmekanismen — vid körning används korrekt engelska som reserv —
tills åtta funktions-PR:er den 2026-09-16 lade till 61 nycklar och satte markören i alla 65
språkversioner i stället för att översätta: den här spärren godkände varenda en, ingenting blockerade
PR:erna och den blockerande spärren för andelen verkliga översättningar misslyckades sedan på
releasegrenens topp för alla (pt-BR 3,2 % > 2,5 % + 0,5). En markör bedöms nu som en saknad
översättning. Åtgärda ett rött resultat med
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, eller
alla språkversioner parallellt med `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, säker vid frånkoppling, vägrar starta utan miljövariablerna
`OMNIROUTE_TRANSLATION_*`). En nyckel som måste förbli på engelska (ett fast produkt-, motor- eller
flaggnamn) hör hemma i `scripts/i18n/untranslatable-keys.json`, aldrig bakom en markör. `vi`
förbjuder markörer helt (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — spärr för parkerade tester

En fil i listan `exclude` i `vitest.config.ts` är ett test som inte körs, och den ser ut som
täckning för den som granskar trädet. Sextiotvå filer samlades bakom kommentaren
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Ärende #8618 stängdes
2026-08-11 medan listan som det följde växte från 45 till 62 poster, där varje ny post ärvde en
kommentar som pekade på ett avslutat ärende. När listan till slut mättes fil för fil (#13204)
**klarade 51 av de 62 testerna det aktuella trädet utan någon ändring i källkoden**.

Spärren kräver att varje undantag som motsvarar en verklig fil (a) anger ett spårningsärende och
(b) finns i `config/quality/vitest-exclusions.json` med sin uppmätta status, så att ett nytt
undantag blir en granskningsbar diff i en särskild fil i stället för ytterligare en rad i en array
med 60 poster. Den kör avsiktligt inte om de undantagna testerna — det tar ~10 minuter och hör
hemma i ett periodiskt jobb; inventeringen registrerar när vart och ett senast mättes.
