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

## Gateinventering och utförandeprofiler

### Kandidatantagning

Arbetsflödena CI och Quality Gates avger vart och ett stabilt omdöme: `Gate / CI` och `Gate / Quality`. Deras versionerade antagningspolicy räknar upp varje uppströmsjobb efter behov eller rådgivande. Ett tillämpligt obligatoriskt jobb måste lyckas: saknade, avbrutna, överhoppade, väntande och okända resultat kan inte fastställa PASS. En giltig klassificering av endast dokument eller endast katalog kan göra ett kodfält otillämpligt; ett utkast till PR är inte en godkänd kandidat. En `hotfix` etikett avsäger sig inte bevis.

Båda arbetsflödena täcker PRs in i main/release grenar, push till `main`, manuell sändning och merge-group-händelser. Push, dispatch och merge-group kör hela urvalet. Pushar till `release/**` startar inte dem (2026-10-18): varje ändring har redan kört matrisen på sin PR och den sammanslagna kombinationen är Release-Greens jobb (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks och merge-grupper använder värdar för löpare för jobb som annars väljer självvärdar löpare; tillräcklig värdkapacitet måste verifieras innan lansering.

En vanlig PR kör det snabba urvalet. `full-code` och `full-code-e2e` -banorna i tillträdespolicyn (E2E, integration, paketartefakt, Electron smoke, Bun SQLite, ekosystem- och protokollklienter) körs endast på ett Mergify-köutkast eller på en fullständig körning: `gh workflow run ci.yml --ref <branch>`.

Varje JSON kvitto identifierar utcheckad SHA, arbetsflödeskörning och försök. CLI avvisar en checkout/event SHA felmatchning. Arbetsflödestester binder policymedlemskap till domsjobbets `needs` lista så att en ny eller borttagen fil inte kan försvinna tyst. Kvittona täcker deras eget arbetsflöde, inte publicering, distribution eller interna delar av en befintlig rådgivande skanner. Att aktivera båda kontrollnamnen i grenregler är en separat administrativ ändring; Att lägga till dessa jobb skyddar inte i sig en gren.

### Slå samman kö

`queue` etiketten skickar en PR till Mergify-kön (`.mergify.yml`). Mergify öppnar ett utkast till PR på en `mergify/merge-queue/` -gren, CI kör hela markeringen där, och den ursprungliga PR smälter samman när `Gate / CI`, `Gate / Quality` och `Merge integrity (changelog + generated skills)` passerar.

Mergify skriver sin kösammanfattning i utkastets beskrivning, och andra appar kan också redigera den. En `pull_request` `edited` -händelse på ett sådant utkast tar sin egen samtidighetsgrupp (`-queue-edit-<run_id>`) så den kan inte avbryta utkastets riktiga körning, och den hoppar över grinden och matrisen. Endast `Merge integrity` körs fortfarande. Det överhoppade grindjobbet har ett annat kontrollnamn, eftersom Mergify läser en överhoppad `Gate / CI` som en misslyckad kontroll och ställer ut PR.

Efter en dequeue, en push inte alltid återköa PR. Kommentera `@mergifyio queue` på det.

### Bevarade bevis i acceptansreduceraren

`scripts/quality/validate-release-acceptance.mjs` reducerar en tillhandahållen plan och dess manifestationer; det fastställs inte att planen täcker hela utsläppsledningen. Dess rapporter anger uttryckligen `releaseAcceptance: false`, även när den planen är `VERIFIED`. `release-acceptance.yml` arbetsflödet använder fortfarande skuggfixturer, inte riktiga bygg-, paket-, start- eller kampanjkvitton.

CLI kräver `--evidence-root` för att verifiera bevarade bevis. Filer löses upp som `<evidence-root>/<artifact_id>/<member>` och hashas som SHA-256. En PASS -post utan bevis, en saknad eller ändrad fil, en osäker sökväg eller en symbolisk länk förhindrar verifiering. Saknade filer motsvarar inte tomma lyckade loggar. Befintliga SHA/run/attempt kontroller förblir oberoende: matchande byte kan inte rädda ett inaktuellt kvitto. Filintegritet är inte bevis på verkställighetsäkthet eller artefaktreklam.

### Inventering av statisk skanning

Den versionerade npm-alias-inventeringen och static-scan-medlemskapet finns i `config/quality/gate-manifest.json`. Kör `npm run check:gate-manifest` för att validera skriptnamn och exakta kommandon mot `package.json`; tillägg, borttagningar och kommandodrift misslyckas med både den lokala kroken och ändringsklassificeringsjobben i CI. Ett alias är inte ett arbetsflödesjobb, matrisinstans eller testfall: dessa räkningar får inte presenteras som utbytbara.

Använd `npm run quality:scan -- --list` eller `npm run quality:scan:fast -- --list` för att inspektera de valda aliasen utan att köra dem. Löparen anropar npm-ingångspunkten, så dess körtid (inklusive Bun där den är konfigurerad) bevaras. Manifestposternas alias utanför dessa profiler som anropas separat, och underhållskommandon är förbjudna i skrivskyddade skanningsprofiler.

Dessa profiler täcker endast den statiska skanningen. De certifierar inte produkttester, täckning, förpackning, externa kontroller eller en kandidats fullständiga releaseacceptans. Arbetsflödesantagning använder de länkade `config/quality/admission-policy.json` och `scripts/quality/admission-verdict.mjs`. Release-observatörsprofiler förblir separata; inspektera deras tillämpliga kontroller och kvitton oberoende. Den fullständiga observatörens statiska kommandon deklareras i `config/quality/release-green-static-profile.json`, inklusive `audit:deps`, val av mutationstest och translationskontroller. Laddaren validerar npm-kommandon mot package.json och modellerade CI/Quality -deklarationer; den avvisar drift istället för att exekvera skal-tokens som argument. Nödvändig skanner SKIP/INCOMPLETE -utgång kan inte upprätta PASS. Profilen registrerar sina externa uteslutningar och ersätter inte värddäckning, testmatriser, paket eller distributionsbevis. Prosainventeringen nedan är en referens, inte ett bevis på att en grind faktiskt gick.

Skript lever under `scripts/check/` (policy grindar) och `scripts/quality/` (spärrmotor). CI källan till sanning är `.github/workflows/ci.yml`.

### Släpp PR fast-path (`quality.yml`)

`.github/workflows/quality.yml` kompletterar CI på main/release PRs, pushar till `main`, skickar och sammanfogar grupper. PRs använder sökvägsfiltrerade snabbkontroller. Den permanent inaktiverade dubblettversionen togs bort. de riktiga build/package/boot -checkarna förblir i CI. Enhetssviten och vitest körs endast i CI (`Unit Tests (N/8)` och `Vitest`).

| Jobb                                             | Omfattning                                                                                                                      | Blockering            |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs och docs-all                                                                                       | Ja                    |
| `Fast Quality Gates`                             | Kod PRs; statiska kontroller, typkontroll, instrumentpaneltypkontroll, påverkade enhetstester, glömda syskontester (rådgivande) |
| `No new ESLint warnings`                         | Kod PRs; dämpningsmedveten luddskydd                                                                                            | Ja, inklusive gafflar |
| `Merge integrity (changelog + generated skills)` | Icke-utkast PRs; changelog och genererad färdighetssynkronisering                                                               | Ja, inklusive gafflar |

#### Glömda syskonprovsrapport

`npm run check:forgotten-sibling-tests` körs som ett rådgivande steg för `Fast Quality Gates` och återanvänder importresolvern bakom testeffektkartan. För varje ändrad produktionsmodul rapporterar den deterministiska `changed module/symbol -> static consumer -> candidate sibling test` kedjor när kandidattestet saknas i pull-request diff. Markdown-sammanfattningen och JSON resultatet behålls som `forgotten-sibling-tests` arbetsflödesartefakten för kalibrering innan någon blockerande utrullning.

Återexport av fat och dynamisk import är endast upplösningsdiagnostik; de skapar aldrig ett blockerande fynd. Recenserade undantag live i `config/quality/forgotten-sibling-allowlist.json`. Varje post måste namnge konsument- och kandidattestet, ge en specifik motivering och länka en GitHub -fråga eller pull-begäran. Felaktiga poster stängs inte. Undantag kan inte undertrycka ett borttaget kandidattest eller en skillnad som lägger till `.skip`/`.todo`; påståendeförsvagning och annan maskering förblir ägd av den oberoende blockerande `check:test-masking` porten.

### Jobb: `lint`

Körs på varje PR till `main`. Block slås samman vid misslyckande.

| Skript (`npm run ...`)            | Validerar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Blockering                                 |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Node.js versionen är inom det intervall som stöds                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                         |
| `check:cycles`                    | Cirkulär import över hela `src/` + `open-sse/` (AST-baserad, tsconfig `paths` löst). Bare exit 1 när någon cykel existerar (fail-closed sedan #15281) och listar SCCs. `check:cycles:ratchet` (vad CI körs) blockerar när antalet överskrider `metrics.cycles` taket i `quality-baseline.json` — för närvarande 14, `direction: down`, så det kan bara falla (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ja (spärr)                                 |
| `check:boundary`                  | `open-sse → src` -koppling: unik fil-till-fil-import från motorn till appen (`scripts/quality/measure-boundary.mjs`; kantlistan är v4 core/module-split saneringseftersläpningen). Bare = rådgivande rapport (samma som `quality:boundary`). `check:boundary:ratchet` (vad CI körs, även i `quality.yml` fast-gate-spärrslingan) blockerar när räkningen överstiger `metrics.boundaryOpenSseToSrc` taket i `quality-baseline.json` — seeded vid den uppmätta 771, `direction: down`; `--update` bara sänker den; basrelativ på PRs (`--base-ref`, se nedan)                                                                                                                                                                                                                                                                                                                                                                                           | Ja (spärr)                                 |
| `check:route-validation:t06`      | Zod scheman finns på alla rutter (nivå 6-policy)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja                                         |
| `check:any-budget:t11`            | Antalet `@ts-expect-error // any` överstiger inte budget (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                         |
| `check:provider-consistency`      | Varje leverantör i `providers.ts` har en matchande post i `providerRegistry.ts` (och vice versa, inom godkännandelistan)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ja                                         |
| `check:model-lifecycle`           | De tre handhållna routingtabellerna förblir överensstämmande med den incheckade livscykelöversikten (#11503): `FITNESS_TABLE` (`taskFitness.ts`) får inget pensionerat ID som `REGISTRY` kan dirigera; varje `BUILT_IN_ALIASES` mål finns i `REGISTRY` och frånvarande från ögonblicksbilden med pensionerat id; varje pensionerat ID som fortfarande finns i `REGISTRY` vidarebefordras eller listas i `allowedRetiredInCatalog`; och ingen `DEFAULT_DEGRADATION_MAP` källa eller -mål tycks vara tillbakadragen i den ögonblicksbilden. Detta bevisar inte att en modell för närvarande betjänas av en live upstream. Offline — jämförs med `config/quality/model-lifecycle.json`, uppdaterad för hand med `npm run quality:refresh-model-lifecycle` (nätverk; inte kopplat till CI). `allowedRetiredInCatalog` är en burn-down ratchet: lägg till en post endast med ett spårningsproblem.                                                         | Ja                                         |
| `check:fetch-targets`             | Varje `fetch("/api/...")` i `src/` på klientsidan löser sig till en riktig `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                         |
| `check:deps`                      | Alla `npm install` -able deps över varje `package.json` i repan är i `dependency-allowlist.json`; nya upplåsta eller slopsquattade paket flaggade                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                         |
| `audit:deps`                      | npm granskning av alla fem oberoende låsfiler (root, Electron, OpenCode plugins v1/v2 och provider). Kritiska råd block; höga varningar förblir synliga varningar. Missing/failed -revisioner är INCOMPLETE och block; per-scope låshaschar och rapporter behålls.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                         |
| `check:lockfile`                  | `package-lock.json` integritet — https-register, integritetshashar, inga värdöverstyrningar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                         |
| `check:licenses`                  | SPDX licenstillståndslista för produktionsberoende                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                         |
| `check:tracked-artifacts`         | Inga byggartefakter / committerade `node_modules` symlänkar (kör även i husky pre-commit; pre-push är avsiktligt lätt — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                         |
| `check:ai-attribution`            | Ingen AI/bot `Co-Authored-By` trailer eller AI-generation sidfot i PR commits, titel eller body — Hard Rule #16 `commit-msg` i `quality.yml` fast-gates `main` loopen för PR→ `release/**` — läser händelsens nyttolast, no-op off PRs — och ett PR-endast steg i `ci.yml` lint PR den mänskliga →; medförfattare tillåtna #14436                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:vitest-exclusions`         | Varje Vitest uteslutning namnger ett spårningsproblem och visas i `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                         |
| `check:file-size`                 | Källfiler (`.ts`/`.tsx` i `src/`, `open-sse/`, `electron/`, `bin/`) stannar inom `cap` och testfiler (`*.test.ts(x)`) inom `testCap`; filer frysta i `file-size-baseline.json` (`frozen` / `testFrozen`) får inte växa förbi sin registrerade storlek                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                         |
| `check:error-helper`              | Felsvar i executors/handlers använder `buildErrorBody()` / `sanitizeErrorMessage()` (hård regel #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ja                                         |
| `check:migration-numbering`       | Migration SQL -filer är sekventiellt numrerade, inga luckor eller dubbletter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:public-creds`              | Inga bokstavliga OAuth `client_id`/`client_secret` eller Firebase webbnycklar utanför `publicCreds.ts` (Hård regel #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                         |
| `check:db-rules`                  | Inga råa SQL utanför `src/lib/db/` moduler; ingen fat-import från `localDb.ts` (hårda regler #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:known-symbols`             | Leverantörs exekutorer, routingstrategier och översättare som är registrerade i deras leveranstabeller matchar filerna på disken — inga föräldralösa eller odeklarerade symboler                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja                                         |
| `check:route-guard-membership`    | Varje rutt som skapar en underordnad process klassificeras av `isLocalOnlyPath()` (hårda regler #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ja                                         |
| `check:test-discovery`            | Varje `*.test.ts` / `*.spec.ts` -fil i repet samlas in av minst en testlöpare (ratchet: föräldralös lista i `test-discovery-baseline.json` kan bara krympa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                         |
| `check:test-tla-order`            | Ingen `node:test` fil under `tests/unit` registrerar ett test, träffar en `await` på toppnivå och registrerar sedan mer (#18045; ratchet: `test-tla-order-allowlist.json` kan bara krympa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                         |
| `check:agent-skills-sync`         | Genererade artefakter för agentfärdigheter matchar deras källkatalog (ingen drift)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | Leverantör logos/assets har en registrerad härkomstpost                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `lint:json`                       | JSON config-filer tolkar och uppfyller repo lint-reglerna                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `typecheck:core`                  | TypeScript -kompilering utan fel (endast rådgivande varningar)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                         |
| `typecheck:noimplicit:core`       | Strikt `noImplicitAny` — framåtblickande; många redan existerande samtalsplatser behöver fortfarande anteckningar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **Rådgivande** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` scoped to `src/app/(dashboard)/**` (#7033) — `typecheck:core` kurerade 27-filers godkännandelista inkluderar inte någon instrumentpanel TSX, och `next build` typkontrollerar den aldrig heller (`next.config.mjs` anger `ignoreBuildErrors: true`), så föräldralösa identifieringsregressioner där (#6625/#6909) var osynliga för CI. Skillnader mot en frusen per-file/per-TS-code räknings baslinje (`config/quality/dashboard-typecheck-baseline.json`, samma inaktuella upprätthållande mönster som `check:known-symbols`) — endast NEW fel utöver det baslinjevärde misslyckas med grinden; spärra ner med `--update` när ett redan existerande fel är åtgärdat.                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:build-typecheck`           | Kontroll av helappsproduktionstyp över `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), ytan `typecheck:core` 27-filers godkännandelista och instrumentbrädans gate täcker inte. Diffs mot `config/quality/build-typecheck-baseline.json`; ett nytt eller höjt antal per (fil, kod) misslyckas, ett lägre antal ber dig att ratchet. `--update` vägrar medan körningen innehåller ett nytt eller höjt par såvida inte `--force-regressions` har passerats, och vägrar en nyligen tystad fil såvida inte `--force-nocheck` passeras, så att bredda baslinjen för att bli grön och att ge en permanent tystnad är två separata avsiktliga handlingar. En bar `--force` avvisas. Skannar också av byggomfattningen för `@ts-nocheck` mot `config/quality/ts-nocheck-baseline.json`, eftersom en fil som använder den inte rapporterar någon diagnostik alls och annars skulle vara osynlig för varje gate. | Ja                                         |

#### Två typkontrollprogram svarar olika

`typecheck:core` och `check:build-typecheck` kompilerar olika program under olika alternativ, och samma fil kan vara ren i den ena och full av fel i den andra.

`tsconfig.build.json` ställer in `"strict": false`, så `noImplicitAny` är avstängd. Kärnkonfigurationen kompilerar en kurerad 27-filers godkännandelista med strängare alternativ och följer varje posts importgraf, så filer som aldrig visas i byggprogrammet kontrolleras fortfarande där.

Konsekvensen har betydelse när man bedömer om en fil är maskinskriven:** noll diagnostik under `check:build-typecheck` betyder inte noll** . Att ta bort `@ts-nocheck` från 26 filer visade att 23 av dem var rena i byggprogrammet; 16 av dessa visade cirka 120 implicita fel i den strikta. Kontrollera båda innan du kallar en fil ren.

### Jobb: `quality-gate`

Springer efter `test-coverage`. Block slås samman vid misslyckande.

| Manus                        | Validerar                                                                                                                                                             | Blockering                |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | Avger `quality-metrics.json` (antal ESLint -varningar, täckning från sammanslagen skärvrapport)                                                                       | Ja (uppströms spärrhaken) |
| `quality:ratchet`            | Varje måttenhet i `quality-baseline.json` har inte gått tillbaka (ESLint varningar ≤ baslinje; täckning ≥ baslinje)                                                   | Ja                        |
| `check:duplication`          | Kodduplicering (jscpd@4) överskrider inte baslinjen i `quality-baseline.json`                                                                                         | Ja                        |
| `check:complexity`           | Cyklomatisk komplexitet på filnivå överstiger inte taket (kärna ESLint `complexity` + `max-lines-per-function`)                                                       | Ja                        |
| `check:cognitive-complexity` | Kognitiv komplexitet ratchet (`eslint-plugin-sonarjs`) — separat ESLint pass; CI körs båda sammanslagna som det enda `check:complexity-ratchets` steget               | Ja                        |
| `check:dead-code`            | Oanvända exporter / filer ratchet (knip) går inte tillbaka mot baslinjen                                                                                              | Ja                        |
| `check:compression-budget`   | Kompression benchmark budget — per-motor token-besparingsgolv får inte gå tillbaka                                                                                    | Ja                        |
| `check:type-coverage`        | Procenttypad spärr (`type-coverage`) går inte tillbaka; subsumerar till stor del `typecheck:noimplicit:core`                                                          | Ja                        |
| `check:codeql-ratchet`       | Antalet öppna CodeQL varningar går inte tillbaka (läser via `gh api`; graciöst hoppa över utan token) — refresh kadens och manuell trigger: se "CodeQL ratchet" nedan | Ja                        |

### Jobb: `quality-extended`

Hela jobbet är rådgivande (`continue-on-error: true`). De npm-baserade spärrarna går på riktigt; de externa skannrarna installeras via `gh release download` och självhopp (avsluta 0) när en binär fortfarande saknas.

| Manus                    | Validerar                                                                                                                                                                                                   | Blockering                                   |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:circular-deps`    | Inga cirkulära beroenden (dpdm)                                                                                                                                                                             | **Rådgivande**                               |
| `check:bundle-size`      | Buntstorleken överstiger inte locket                                                                                                                                                                        | **Rådgivande**                               |
| `check:secrets`          | Hemlig skanning (gitleaks) — hoppar över om binär saknas                                                                                                                                                    | **Rådgivande**                               |
| `check:vuln-ratchet`     | Beroendesårbarheter (osv-scanner) regresserar inte — `--ratchet` misslyckas som INCOMPLETE (utgång 2) om den inte mäts                                                                                      | **Rådgivande**                               |
| `check:workflows`        | Workflow lint (actionlint + zizmor); missing/broken skannrar, ogiltiga rapporter eller saknad ratchet-baslinje misslyckas som INCOMPLETE. Giltiga resultat följer den valda strict/advisory/ratchet policyn | Utförande krävs; zizmor spärrblockering i CI |
| `check:openapi-breaking` | Offentligt API kontrakt mot pinnade händelseförpliktelser (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); nödvändig mätning misslyckas stängd                       | **Blockering med --ratchet**                 |

### Jobb: `docs-sync-strict`

Körs på varje PR till `main`. Block slås samman vid misslyckande.

| Manus                          | Validerar                                                                                                                                              | Blockering               |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `check:docs-all`               | Meta-gate som kör de 6 undergrindarna nedan sekventiellt                                                                                               | Ja                       |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt version konsistens                                                                                                       | Ja                       |
| ↳ `check:docs-counts`          | Räknar i prosa (antal leverantörer, migrationsräkning, etc.) ligger inom spärrfönstret för de verkliga räkningarna                                     | Ja                       |
| ↳ `check:env-doc-sync`         | Varje env var i `.env.example` dokumenteras i en dokumenttabell och vice versa                                                                         | Ja                       |
| ↳ `check:deprecated-versions`  | Inga föråldrade versionssträngar i dokument                                                                                                            | Ja                       |
| ↳ `check:doc-links`            | Interna markdown-länkar i dokument löser sig till riktiga filer (`[text]`/`(path)` -form)                                                              | Ja                       |
| ↳ `check:fabricated-docs`      | Rutter, env vars, CLI -kommandon, hook-namn och filsökvägar som citeras i dokument finns i kodbasen. Hård grind via `--strict`; soft-fail utan flagga. | Ja (via `--strict` i CI) |
| `check:cli-i18n`               | CLI kommandosträngar finns i alla i18n-lokalfiler                                                                                                      | Ja                       |
| `check:openapi-coverage`       | OpenAPI spec täcker åtminstone ett spärrat golv av riktiga rutter                                                                                      | Ja                       |
| `check:openapi-security-tiers` | Säkerhetsnivåkommentarer i `openapi.yaml` överensstämmer med `routeGuard.ts` klassificeringar                                                          | **Rådgivande**           |
| `check:openapi-routes`         | Varje väg i `openapi.yaml` löser sig till en riktig `route.ts` (anti-hallucination)                                                                    | Ja                       |
| `check:docs-symbols`           | Varje `/api/...` -referens i `docs/**/*.md` löser sig till en riktig `route.ts` (anti-hallucination)                                                   | Ja                       |
| `i18n translation drift`       | Oöversatta nycklar i i18n locale filer — warn only                                                                                                     | **Rådgivande**           |

De tolv README SVGs under `docs/diagrams/` genereras (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` regenererar dem alla). Var och en har ett byte-jämföra enhetstest (`tests/unit/docs/readme-*-svg.test.ts`, jobb `test-unit`) som misslyckas när den committerade filen är inaktuell och `check:docs-counts` läser kanoniska tal från deras `<text>` noder — vilket är anledningen till att kontursteget håller varje konturerad sträng i filen som osynlig `<text>`. SVG kanoniska nummerkontroll läser filerna listade i `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` och `tier-flow-light.svg`; påståendena gratis-för evigt, kataloginträde, återkommande pool och poängfaktorer läser också `promise-pillars.svg`, `free-tier-budget.svg` och `strategies-grid.svg`. `free-tier-budget.svg` hämtar sina siffror från livekatalogladdaren, så en ändring till `FREE_MODEL_BUDGETS` eller till en leverantörs visningsnamn blir röda CI tills den filen är regenererad.

### Jobb: `i18n-ui-coverage`

| Manus                             | Validerar                                                                                                                                                                                               | Blockering     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | UI i18n-nyckeltäckningen är ≥ 65 %                                                                                                                                                                      | Ja             |
| `check-ui-value-drift` (inline)   | En omskriven engelska** värde** lämnar ingen inaktuell översättning efter sig                                                                                                                           | Ja             |
| `check-new-key-coverage` (inline) | A** ny** Engelsk nyckel översätts i varje språk — en `__MISSING__:` -markör avvisas                                                                                                                     | Ja             |
| `check-translation-ratio`         | Verkligt översättningsförhållande per språk (identiskt med engelska / platshållare / saknade blad utanför godkännandelistan) får inte överstiga `config/quality/i18n-translation-baseline.json` + slack | **Rådgivande** |

Behöver `fetch-depth: 0` — värdedriftsgrinden diffar `en.json` mot sammanslagningsbasen.

#### `check-ui-value-drift` — inaktuell översättningsport

Fångar den ena i18n-regression som de andra grindarna strukturellt inte kan se: ett engelskt värde skrivs om och översättningarna som härrör från den _föregående_ engelskan stannar kvar, så icke-engelska användare fortsätter att läsa säkert formulerad, nu fel kopia.

Detta skickades på riktigt. `oauthModal.googleOAuthWarning` skrevs om när Antigravity -inloggningshjälpen landade (#5203);** 39 av 43 platser** höll text som säger åt operatörerna att "kopiera hela URL och klistra in den nedan" — ett flöde som inte kan slutföras för den leverantören. Det gick obemärkt förrän #8463 eftersom:

- `sync-ui-keys` återfyller bara nycklar som är** frånvarande** , aldrig sådana som är det** unken** ;
- `check-ui-keys-coverage` räknar nyckeln _närvaro_, så en inaktuell översättning räknas som täckt;
- `check-translation-drift` spårar `docs/i18n/<locale>/**.md` -dokumentationen speglar — den läser aldrig `src/i18n/messages/*.json`. Blockering av jobb `docs-sync-strict` sedan omsynkroniseringen 2026-09: redigera ett kärndokument → `npm run i18n:run -- --files=<doc>` (sektionsnivå, billigt).

**Diff-medveten, inte baseline-backad.** Den jämför `en.json` vid sammanslagningsbasen med arbetsträdet; för varje nyckel vars engelska värde ändras, är alla språk som fortfarande har en orörd översättning inaktuella. Detta medvetet** fryser redan existerande skuld** — a diff kan inte avslöja vilken gammal engelska en mångårig översättning kom från, så porten bedömer bara vad den aktuella förändringen berör. Alternativet (en per nyckel-hash-baslinje) skulle kosta en ~ 600 KB -genererad fil, 3 × den största befintliga baslinjen, churning på varje i18n PR.

Två sätt att tillfredsställa det:

1. uppdatera de berörda översättningarna, eller
2. ställ in dem på `__MISSING__:<new english>` — körtiden serverar sedan den korrigerade engelskan (`src/i18n/request.ts::deepMergeFallback`, #7258) och nyckelköerna för översättning.

Om strängen är** menande** ändrat, föredrar** byter namn på nyckeln** : en ny nyckel kan inte ärva en inaktuell översättning. Det är mönstret #8463 använde.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Avslutar 0 med `SKIP reason=base-unresolved` när baskatalogen inte kan läsas (grund klon utan basreferens), speglar `check-openapi-breaking`.

### Jobb: `i18n`

Fullständig i18n-valideringsmatris (ett jobb per plats). Hela jobbet är rådgivande.

| Manus                           | Validerar                             | Blockering                                                |
| ------------------------------- | ------------------------------------- | --------------------------------------------------------- |
| `validate_translation.py quick` | Översättningsfullständighet per plats | **Rådgivande** (`continue-on-error: true` på hela jobbet) |

### Jobb: `pr-test-policy`

Körs endast på pull-förfrågningar.

| Manus                  | Validerar                                                                                                                            | Blockering |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `check:pr-test-policy` | PRs som ändrar produktionskod i `src/`, `open-sse/`, `electron/` eller `bin/` måste inkludera eller uppdatera tester (Hård regel #8) | Ja         |
| `check:test-masking`   | Ändrade testfiler minskar inte antalet nettoansökningar eller lägger till `assert.ok(true)` tautologier                              | Ja         |
| `check:pr-evidence`    | PR body citerar test/VPS bevis för förändringen (mekaniserar Hard Rule #18 genom att greppa PR prose — fragile, se Backlog)          | Ja         |

### Jobb: `test-vitest`

Springer efter `build`. Block slås samman vid misslyckande.

| Svit             | Validerar                                                  | Blockering                                                                                                                             |
| ---------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 verktyg), autoCombo, cache — vitest runner | Ja                                                                                                                                     |
| `test:vitest:ui` | UI komponent testar — vitest runner                        | **Blockering** — redan existerande misslyckanden exkluderas uttryckligen i `vitest.config.ts`; nya misslyckanden misslyckas med jobbet |

### Nattliga arbetsflöden (schemalagda, rådgivande)

Dessa körs på ett cron-schema (och `workflow_dispatch`), aldrig på PRs. Alla är rådgivande.

| Arbetsflöde            | Validerar                                                                                                                                     | Blockering     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | snabbkontroll av egenskapstester med ett slumpmässigt seed + högt antal körningar                                                             | **Rådgivande** |
| `nightly-resilience`   | heap-growth gate, kaos fel-injection, k6 load/soak                                                                                            | **Rådgivande** |
| `nightly-llm-security` | promptfoo injektionsskydd (blockläge) + garak-sonder (hoppade över utan en leverantörshemlighet)                                              | **Rådgivande** |
| `nightly-schemathesis` | OpenAPI contract fuzzing (schemathesis) mot en live OmniRoute med `docs/openapi.yaml` — ytor spec överträdelser / ohanterade 500s (Fas 8 B.4) | **Rådgivande** |
| `nightly-mutation`     | Stryker mutationstestresultat över den snabba enhetsfilen — överlevande mutanter ytsvaga hävdar                                               | **Rådgivande** |
| `nightly-compat`       | Nodmotorkompatibilitetsmatris över de stödda `engines.node` intervallen                                                                       | **Rådgivande** |

Prestandabaslinjer (hög, TTFB, byggtid) registreras, inte gated: se [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Hastighetsfas (2026-08-30 → v4.0 LTS): varje baslinje lossades med 20 %

Ägarbeslut (2026-08-30): fram till v4.0-modulariseringen är frakthastigheten viktigare än att hålla skuldgränsen. Varje** numerisk** ratchet-baslinjen lossades med 20 % i ett kontrollerbart pass, och fasen deklareras i `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Vad förändrades                                                                                                                                                                                           | Där                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — lägre-är-bättre räknas × 1,2, högre-är-bättre procentsatser ÷ 1,2 (täckningsgolv 60 behålls, `eslintErrors` förblir 0, `eslintWarnings` 0 → 20 % av det frusna undertryckningsvärdet) | `quality-baseline.json` (`_relax_velocity_2026_08_30` notlistor varje före → efter)                    |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                          | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, varje `frozen[*]` / `testFrozen[*]` line cap × 1.2                                                                                                                                      | `file-size-baseline.json`                                                                              |
| per fil / per TS-kod räknas × 1.2                                                                                                                                                                         | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                       | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` blir rådgivande medan `_policy.requireTighten === false`                                                                                                                              | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| nattliga `bank-ratchet-shrinks` pauser (det skulle sänka den uppmätta krympningen och ångra takhöjden)                                                                                                    | `.github/workflows/nightly-release-green.yml`                                                          |

Tillåtelselistor (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`, …) är** inte** budgetar och berördes inte. Pass/fail policy grindar (hemligheter, SQL regler, docs/env kontrakt, i18n paritet, enhetstester) är oförändrade — ett rött test är fortfarande ett rött test.

**Verktyg**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — engångsavslappningen (`scripts/quality/relax-baselines.mjs`); vägrar att springa två gånger med samma lapp.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` — mäter varje numerisk grind som CI gör och skriver ut det återstående utrymmet per grind (`scripts/quality/baseline-headroom.mjs`). Det nattliga `baseline-headroom` jobbet publicerar tabellen i sammanfattningen av arbetsflödet och laddar upp sin JSON/Markdown rapport som `baseline-headroom-<run_id>`, bevarad i 90 dagar. Varningsrader och kritiska rader identifierar grindar inom 10 % av sitt tak eller redan över det. Granska dessa rapporter som den tidiga varningen för budgetar som förbrukas; inspektera den felande portens `_rebaseline_*` anteckningar. Jobbet skapar eller uppdaterar inte längre ett permanent problem; #12149 bevarar den tidigare rapporthistoriken.

**Ny-kodläge (Clean-as-You-Code) — sedan 2026-08-30, endast PR snabbväg**

På `pull_request` händelser skickar `quality.yml` `--base-ref <PR base SHA>` till `check:file-size`, `check:complexity-ratchets` och `check:dead-code`. För `check:complexity-ratchets` och `check:dead-code` jämför grinden HEAD med merge-basen** begränsad till filerna som PR rörde vid** (`scripts/check/newCodeMode.mjs`: sammanslagningsbasen materialiseras i en engångs `git worktree`, ESLint/knip körs där och på HEAD, är antalet per fil olika):

- **blockering** — PR lade till cyclomatic/cognitive överträdelser eller döda exporter i filer som den ändrade (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` i loggen);
- **rådgivande** — den globala summan kontra den frusna baslinjen. Nedärvd drift gör aldrig en oskyldig PR röd; driften fryses på nytt vid frigivningsavstämning och övervakas av utrymmesjobbet.

`check:file-size` uses the base ref on its own terms (`scripts/check/check-file-size.mjs`, #8522): it checks every source and test file in the tree, reads each one's line count at the PR base with `git show`, and fails a file only when it grows past the larger of its baseline ceiling (`frozen` / `testFrozen`, or `cap` / `testCap` for a file outside the baseline) and its base size. A file that already drifted on the base therefore never reds an innocent PR.

`check:boundary:ratchet` tillämpar samma regel på sitt enda nummer (`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): på PR händelser passerar både `quality.yml` fast-gates och `ci.yml` lint-jobbet PR basen SHA, basbekräftelsen mäts från en `git archive` export, och PR misslyckas endast när dess `open-sse → src` kantantal överstiger den största av `metrics.boundaryOpenSseToSrc` och räkningen på basen. Basavvikelse ovanför taket rapporteras (`base drift herdado`) men rött aldrig en oskyldig PR; push → main håller det absoluta taket, och en olöslig bas SHA faller tillbaka till den med en varning.

`workflow_dispatch` körningar, det släppgröna svepet och det nattliga utrymmet har ingen PR bas och håller den absoluta (globala) jämförelsen. Täckning, dubblering och typtäckning förblir globala för tillfället (deras verktyg producerar inte en differens per fil billigt) — kandidater för samma behandling.

**Stänger fasen vid v4.0 (LTS = stramare än tidigare, inte "back to normal")**

1. På det rena `release/v4.0.0` tipset: `npm run quality:headroom --json` för posten, sedan `npm run quality:ratchet -- --update`, `check:file-size --update`, `check:complexity-ratchets --update`, `check:dead-code --update`, varje typkontrollgrinds `--update` — varje baslinje sjunker till det uppmätta värdet.
2. Ta bort `_policy` från `quality-baseline.json` (aktivera `--require-tighten` och nattliga banktjänster), återställ `THRESHOLD = 36` (eller högre) i `check-openapi-coverage.mjs`.
3. Dra åt mer än mätt där modulariseringen lönade sig: filstorleken `cap` tillbaka till 1000 (eller 800), täckningsgolv + 5, död export 0 för de modulariserade paketen.

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

## Policy för godkännandelista

Varje grind som inte kan misslyckas vid redan existerande överträdelser använder en fryst godkännandelista (t.ex. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Policyn är:

**Åtgärda grundorsaken; använd endast godkännandelistan när överträdelsen redan existerar och inte kan fixas i samma PR.**

När du lägger till en post till en godkännandelista:

1. Inkludera en kommentar med motiveringen.
2. Referera till spårningsproblemet (t.ex. `// #3498 — Phase 2 feature, not yet implemented`).
3. Ta bort posten i samma PR som fixar överträdelsen — ett inaktuellt inlägg som inte längre undertrycker en aktiv överträdelse är i sig en defekt (6A.3 föråldrad verkställighet kommer att misslyckas i porten på en föräldralös godkännandelista när den väl har implementerats).

Do** inte** lägg till godkännandelistor för att få testerna att passera snabbare. En grön grind med en växande godkännandelista är en falsk kvalitetskänsla.

### När en gate misslyckas på din PR

1. **Läs portens utgång noggrant** — det berättar exakt vilken fil eller symbol som bröt mot regeln.
2. **Åtgärda överträdelsen** — de flesta grindar är deterministiska filsystemkontroller som passerar så snart koden är korrekt.
3. **Om överträdelsen redan finns** (dvs du introducerade det inte men porten täcker det nu): lägg till en godkännandelista med en motiveringskommentar och ett spårningsproblem.
4. **Om grinden är en spärrhake** (täckning, ESLint -varningar, dubblering, komplexitet): din ändring gjorde måttet värre. Åtgärda det underliggande problemet, eller kör (sällan) `npm run quality:ratchet -- --update` om ändringen är avsiktlig och den metriska försämringen är acceptabel — men dokumentera varför i PR beskrivningen.
5. **Rådgivande grindar** (`continue-on-error: true`) är informativa — de blockerar inte sammanslagning utan visas i CI -sammanfattningen. Fixa dem ändå.

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

## Rationaliseringseftersläpning (ROI recension — Fase 9 Onda 3)

Denna inventering avstämdes mot `ci.yml` 2026-06-17 (den tidigare versionen utelämnade `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence`). En ROI granskning av den avstämda uppsättningen identifierade följande rationaliseringskandidater.** Sammanslagningarna är mekaniska CI ändringar; flips/drops är policybeslut som är reserverade för operatören.** Inget nedan har tillämpats ännu.

**Också odokumenterad ovan** (rådgivande, låg signal): `docs-lint` jobbet (markdownlint + Vale, hela jobbet `continue-on-error`) och de fristående skannerarbetsflödena `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` är i `quality-baseline.json` men är inte kopplad till en blockerande spärr i `ci.yml` — metriken är för närvarande övergiven.

### Sammanfoga / dedup (mekanisk, lägre risk)

Varje kandidat validerades mot live-gate-tillståndet 2026-06-17 (trust-but-verify); flera "uppenbara" sammanslagningar visade sig dölja skulder och är** inte** rena drop-ins.

- **`check:docs-sync` springer två gånger** — fristående i `lint` -jobbet och igen inuti `check:docs-all` (`docs-sync-strict`) och husky pre-commit-kroken. ✅**DONE** — fristående `lint` -anrop togs bort.
- **CVE skanning** — ❌**NOT en ren sammanslagning.** `audit:deps` blockerar kritiska råd och ofullständiga granskningar över alla fem låsfiler, samtidigt som höga råd rapporteras som varningar enligt den nuvarande policyn; `check:vuln-ratchet` (osv) misslyckas bara på en _regression_ jämfört med den incheckade baslinjen och avvisar saknade mätningar vid behov. Olika semantiker — att tappa `audit:deps` skulle förlora den absoluta kritiska grinden och de oberoende paketrevisionskvittona. Behåll båda.
- **Cykeldetektering** — ✅**DONE** (#15159 G-01/G-02). Den gamla texten här kallade `check:cycles` "den gröna, kurerade" grinden och motiverade att den blockerades eftersom `check:circular-deps` (dpdm) rapporterade 91 cykler. Den gröna var en** falskt grönt** : `check:cycles` skannade 5 underkataloger (450 filer), matchade endast statisk `import|export … from` och tog bort varje `@/` och `@omniroute/open-sse/` -specifikator, så den kunde inte se de dynamiska importerade + -aliascyklerna som dominerade repot. Fixat: grinden går nu `src` + `open-sse` (5023 filer), samlar in specifikationer från TypeScript AST (så `import("…")` räknas och typ-position `typeof import("…")` inte), och löser tsconfig `paths`. Den finner** 14** cykler, inte 0. Eftersom 14 redan existerande cykler inte kan fixeras i en grind PR, är `check:cycles` nu en** spärrhake** (`--ratchet`, tak `metrics.cycles.value = 14` i `quality-baseline.json`, `direction: down`) — det blockerar alla _regression_ och räkningen kan bara falla. CI kör `npm run check:cycles:ratchet`. Nedbrända turer med**A-01** . `check:circular-deps` (dpdm) förblir rådgivande som den bredare andra åsikten.
- **Komplexitet** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): en ESLint promenad, räknas med ruleId så cyklomatiska + max-linjer och kognitiva baslinjer förblir oberoende; individuella `check:complexity` / `check:cognitive-complexity` kvarstår för lokal `--update`.
- **`/api` anti-hallucination** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): en FS inventering av `src/app/api`, openapi-rutter + docs-symboler rapporterar fortfarande oberoende; individer kvar för lokala körningar.
- **`check:node-runtime` har 11 jobb** — ⚠️** låg ROI.** Var och en är en separat löpare och checken är < 1s; totala besparingar ~ 10s, mot att förlora en billig per-jobbvakt. Inte värt churn.
- **`typecheck:noimplicit:core` på CI lint** — ✅** borttagen från luddjobbet** (var rådgivande `continue-on-error`); blockeringsytan är `typecheck:core` + `check:type-coverage`. Lokalt manus bibehålls.

### Vänd/beslut (operatörspolicy)

- `check:openapi-security-tiers` (rådgivande) — ❌**NOT rent vändbar.** Den avslutar 0 men varnar för att flera `traffic-inspector` -rutter under `LOCAL_ONLY_API_PREFIXES` saknar `x-loopback-only: true` -anteckningen. För att upprätthålla det måste du lägga till dessa anteckningar i `openapi.yaml` först.
- `typecheck:noimplicit:core` (rådgivande) — till stor del underordnad den blockerande `check:type-coverage` spärren. Vänd till en spärrhake eller släpp det överflödiga andra `tsc` passet.
- `test:vitest:ui` (nu** blockering** ) — redan existerande fel exkluderas uttryckligen i `vitest.config.ts` med `// #8618` spårningskommentarer; nya misslyckanden misslyckas med jobbet.
- `check:secrets` (gitleaks, blockerande spärr fryst vid 3 dokumenterade falska positiva) — godkännandelista de 3 för att nå 0, eller degradera till rådgivande. Överlappar GitHub native secret-scanning + `check:public-creds`.
- `check:pr-evidence` (blockering, greps PR-kroppsprosa) — hög falsk-positiv risk; försvagar tillämpningen av Hard Rule #18 om den tas bort, så detta är ett genuint policyuppmaning.
- `semgrep` (rådgivande fristående) — överlappar CodeQL för OWASP familjerna; koppla sin baslinje till en spärrhake eller droppe.

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
