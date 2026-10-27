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

## Grindinventering och körningsprofiler

### Godkännande av kandidater

Arbetsflödena CI och Quality Gates genererar var sin stabil bedömning: `Gate / CI` och
`Gate / Quality`. Deras versionshanterade godkännandepolicy anger varje uppströmsjobb
som obligatoriskt eller rådgivande. Ett tillämpligt obligatoriskt jobb måste lyckas:
saknade, avbrutna, överhoppade, väntande och okända resultat kan inte fastställa PASS. En
giltig klassificering som endast dokumentation eller endast katalog kan göra en kodfil
icke tillämplig; ett PR-utkast är inte en godkänd kandidat. En `hotfix`-etikett medför
inte undantag från evidenskraven.

Båda arbetsflödena omfattar PR:er till huvud-/releasegrenar, pushar till `main`, manuell
start och merge-group-händelser. Push, manuell start och merge-group kör hela urvalet.
Pushar till `release/**` startar dem inte (2026-10-18): varje ändring har redan kört
matrisen i sin PR och den sammanslagna kombinationen är Release-Greens uppgift
(`docs/ops/RUNNER_BOX.md` → Hosted lane). Förgreningar och merge groups använder hostade
körare för jobb som annars väljer självhostade körare; tillräcklig hostad kapacitet måste
verifieras före utrullning.

Varje JSON-kvitto identifierar utcheckad SHA, arbetsflödeskörning och försök.
CLI:n avvisar om SHA för utcheckning och händelse inte matchar. Arbetsflödestester
binder policymedlemskap till bedömningsjobbets `needs`-lista så att en ny eller borttagen
fil inte obemärkt kan försvinna. Kvittona omfattar det egna arbetsflödet, inte
publicering, driftsättning eller det interna i en befintlig rådgivande skanner. Att
aktivera båda kontrollnamnen i grenreglerna är en separat administrativ ändring; att
lägga till dessa jobb skyddar inte i sig en gren.

### Bevarad evidens i acceptansreduceraren

`scripts/quality/validate-release-acceptance.mjs` reducerar en angiven plan och dess
manifest; den fastställer inte att planen omfattar hela releasepipelinen.
Dess rapporter anger uttryckligen `releaseAcceptance: false`, även när planen är
`VERIFIED`. Arbetsflödet `release-acceptance.yml` använder fortfarande
skuggfixturer, inte verkliga kvitton från bygge, paketering, start eller befordran.

CLI:n kräver `--evidence-root` för att verifiera bevarad evidens. Filer löses upp
som `<evidence-root>/<artifact_id>/<member>` och hashberäknas med SHA-256. En PASS-post
utan evidens, en saknad eller ändrad fil, en osäker sökväg eller en symbolisk länk
förhindrar verifiering. Saknade filer är inte likvärdiga med tomma lyckade loggar.
Befintliga kontroller av SHA/körning/försök förblir oberoende: matchande byte kan inte
rädda ett inaktuellt kvitto. Filintegritet är inte bevis på körningens autenticitet
eller artefaktens befordran.

### Körningskapacitet för gränssnittet

CI kör hela gränssnittsinventeringen som fyra `test-vitest`-matrisskärvor, var och en
med högst två arbetare per skärva och den befintliga jobbtidsgränsen på 15 minuter.
Den första skärvan kör även Vitest-sviten för MCP/autoCombo. Det obligatoriska
jobbresultatet omfattar varje del av matrisen; fel eller avbrott i en skärva kan inte
fastställa att kandidaten godkänns.

Den nattliga observatören bevarar ett separat kvitto för exakt kandidat för varje
gränssnittsskärva, inklusive MCP-körningen i det första kvittot. Alla fyra kvitton,
loggar och matchande körningsidentiteter krävs. Lokalt väljer
`npm run test:vitest:ui` fortfarande hela sviten; en körning med `--shard` utgör endast
partiell evidens.

### Insamling av enhetstesttäckning

De tolv enhetstestskärvorna samlar in V8-täckning under sina befintliga testkörningar.
En skärva som lyckas kör `scripts/ci/compact-v8-coverage.mjs` för att komprimera
originalfilerna utan att generera en mellanliggande Istanbul-rapport. Det avslutande
Coverage-jobbet verifierar alla tolv manifest mot kandidatens SHA, körmiljö, källrot
och datahashar och kör därefter c8:s rapportgeneratorer samt befintliga
täckningströsklar. Indata behåller c8:s globala filnamnsordning; förhandssammanslagning
per skärva är osäker för blandad funktions-/blocktäckning. Saknade, felaktigt utformade
eller inkompatibla skärvor gör att godkännandet misslyckas. Misslyckade testskärvor
bevarar rå diagnostisk täckning separat; den får inte ingå i den slutliga
sammanslagningen.

### Inventering av statisk skanning

Den versionshanterade inventeringen av npm-alias och medlemskapet för statisk skanning
finns i `config/quality/gate-manifest.json`. Kör `npm run check:gate-manifest` för att
validera skriptnamn och exakta kommandon mot `package.json`; tillägg, borttagningar och
kommandodrift gör att både den lokala hooken och ändringsklassificeringsjobben i CI
misslyckas. Ett alias är inte ett arbetsflödesjobb, en matrisinstans eller ett testfall:
dessa antal får inte framställas som utbytbara.

Använd `npm run quality:scan -- --list` eller `npm run quality:scan:fast -- --list`
för att granska de valda aliasen utan att köra dem. Köraren anropar npm-startpunkten,
så dess körmiljö (inklusive Bun där detta är konfigurerat) bevaras.
Manifestet registrerar alias utanför dessa profiler som separat anropade, och
underhållskommandon är förbjudna i skrivskyddade skanningsprofiler.

Dessa profiler omfattar endast den statiska skanningen. De certifierar inte
produkttester, täckning, paketering, externa kontroller eller en kandidats fullständiga
releaseacceptans. Godkännande i arbetsflödet använder den länkade
`config/quality/admission-policy.json` och
`scripts/quality/admission-verdict.mjs`. Release-observer-profilerna förblir separata;
granska deras tillämpliga kontroller och kvitton oberoende. Den fullständiga
observatörens statiska kommandon deklareras i
`config/quality/release-green-static-profile.json`, inklusive `audit:deps`,
urval av mutationstester och översättningskontroller. Laddaren validerar npm-kommandon
mot package.json och modellerade CI/Quality-deklarationer; den avvisar avvikelser i
stället för att köra skaltoken som argument. Obligatoriska skannerutdata med
SKIP/INCOMPLETE kan inte fastställa PASS. Profilen registrerar sina externa undantag
och ersätter inte hostad täckning, testmatriser, paket- eller driftsättningsevidens.
Prosaöversikten nedan är en referens, inte bevis på att en grind faktiskt kördes.

Skript finns under `scripts/check/` (policygrindar) och `scripts/quality/`
(spärrmotor). CI:s sanningskälla är `.github/workflows/ci.yml`.

### Snabbspår för release-PR (`quality.yml`)

`.github/workflows/quality.yml` kompletterar CI för PR:er mot main/release, pushar till `main`,
manuell körning och sammanslagningsgrupper. PR:er använder sökvägsfiltrerade snabbkontroller. Det permanent
inaktiverade duplicerade bygget har tagits bort; de faktiska kontrollerna för bygge/paketering/uppstart finns kvar i CI.

| Jobb                                             | Omfattning                                                                                                                                                                                                                 | Blockerande         |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `Docs Gates (fast-path)`                         | Dokumentations-/kod-PR:er; referenser för API-dokumentation och docs-all                                                                                                                                                   | Ja                  |
| `Fast Quality Gates`                             | Kod-PR:er; statiska kontroller, typkontroll, typkontroll av kontrollpanelen, berörda enhetstester                                                                                                                          | Ja                  |
| `Forgotten sibling tests`                        | Kod-PR:er; ändrade moduler spåras till statiska konsumenter och möjliga relaterade tester; sökvägar för barrel-filer och dynamisk import rapporteras som rådgivande diagnostik, med refererade undantag i tillåtelselistan | **Rådgivande**      |
| `Vitest (fast-path)`                             | Kod-PR:er; snabb Vitest-svit                                                                                                                                                                                               | Ja                  |
| `Unit Tests fast-path`                           | Kod-PR:er; enhetstestsvit med 4 shardar                                                                                                                                                                                    | Ja                  |
| `No new ESLint warnings`                         | Kod-PR:er; spärr för lintning som tar hänsyn till undertryckningar                                                                                                                                                         | Ja, inklusive forks |
| `Merge integrity (changelog + generated skills)` | Icke-utkast-PR:er; synkronisering av ändringslogg och genererade färdigheter                                                                                                                                               | Ja, inklusive forks |

#### Rapport om glömda relaterade tester

`npm run check:forgotten-sibling-tests` återanvänder importlösaren bakom kartan över testpåverkan.
För varje ändrad produktionsmodul rapporterar den deterministiska kedjor av typen
`changed module/symbol -> static consumer -> candidate sibling test` när det möjliga
testet saknas i pull requestens diff. Markdown-sammanfattningen och JSON-resultatet sparas som
workflow-artefakten `forgotten-sibling-tests` för kalibrering före en eventuell blockerande lansering.

Barrel-återexporter och dynamiska importer är endast lösningsdiagnostik; de skapar aldrig ett
blockerande fynd. Granskade undantag finns i
`config/quality/forgotten-sibling-allowlist.json`. Varje post måste ange konsumenten och det möjliga
testet, ge en specifik motivering och länka till ett GitHub-ärende eller en pull request. Felaktiga poster
leder till avslag. Undantag kan inte undertrycka ett borttaget möjligt test eller en diff som lägger till `.skip`/`.todo`;
försvagning av kontroller och annan maskering hanteras fortsatt av den oberoende blockerande
`check:test-masking`-spärren.

### Jobb: `lint`

Körs för varje PR mot `main`. Blockerar sammanslagning vid fel.

| Skript (`npm run ...`)            | Validerar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Blockerande                                |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Node.js-versionen ligger inom det intervall som stöds                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                         |
| `check:cycles`                    | Cykliska importer i hela `src/` + `open-sse/` (AST-baserat, `paths` i tsconfig matchas). Kommandot utan tillägg avslutas med kod 1 när en cykel finns (fail-closed sedan #15281) och listar SCC:erna. `check:cycles:ratchet` (som CI kör) blockerar när antalet överstiger taket `metrics.cycles` i `quality-baseline.json` — för närvarande 14, `direction: down`, så det kan endast minska (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja (spärrmekanism)                         |
| `check:boundary`                  | Kopplingar från `open-sse → src`: unika importer från fil till fil från motorn till appen (`scripts/quality/measure-boundary.mjs`; kantlistan är åtgärdsbackloggen för uppdelningen av kärnan/modulerna i v4). Utan tillägg = rådgivande rapport (samma som `quality:boundary`). `check:boundary:ratchet` (som CI kör, även i spärrloopen för snabba kontroller i `quality.yml`) blockerar när antalet överstiger taket `metrics.boundaryOpenSseToSrc` i `quality-baseline.json` — initialiserat till det uppmätta värdet 771, `direction: down`; `--update` kan endast sänka det; basrelativt för PR:er (`--base-ref`, se nedan)                                                                                                                                                                                                                                                                                                         | Ja (spärrmekanism)                         |
| `check:route-validation:t06`      | Zod-scheman finns för alla routes (policy för nivå 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                         |
| `check:any-budget:t11`            | Antalet `@ts-expect-error // any` överskrider inte budgeten (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:provider-consistency`      | Varje leverantör i `providers.ts` har en motsvarande post i `providerRegistry.ts` (och omvänt, inom tillåtelselistan)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                         |
| `check:model-lifecycle`           | De tre manuellt underhållna routningstabellerna förblir konsekventa med den incheckade livscykelögonblicksbilden (#11503): `FITNESS_TABLE` (`taskFitness.ts`) poängsätter inget utfasat id som `REGISTRY` kan dirigera; varje mål i `BUILT_IN_ALIASES` finns i `REGISTRY` och saknas i ögonblicksbilden över utfasade id:n; varje utfasat id som fortfarande finns i `REGISTRY` vidarebefordras eller listas i `allowedRetiredInCatalog`; och ingen källa eller inget mål i `DEFAULT_DEGRADATION_MAP` visas som utfasat i den ögonblicksbilden. Detta bevisar inte att en modell för närvarande tillhandahålls av en aktiv uppströmsleverantör. Offline – jämför med `config/quality/model-lifecycle.json`, som uppdateras manuellt med `npm run quality:refresh-model-lifecycle` (nätverk; inte integrerat i CI). `allowedRetiredInCatalog` är en gradvis minskande spärr: lägg endast till en post tillsammans med ett spårningsärende. | Ja                                         |
| `check:fetch-targets`             | Varje `fetch("/api/...")` i klientsidans `src/` matchar en faktisk `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:deps`                      | Alla beroenden som kan installeras med `npm install` i varje `package.json` i repo:t finns i `dependency-allowlist.json`; nya ofästa paket eller paket med namn som kan bero på felskrivningar flaggas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                         |
| `audit:deps`                      | npm-granskning av alla fem oberoende låsfiler (roten, Electron, OpenCode-insticksprogrammen v1/v2 och leverantören). Kritiska säkerhetsvarningar blockerar; säkerhetsvarningar med hög allvarlighetsgrad förblir synliga varningar. Saknade/misslyckade granskningar markeras som INCOMPLETE och blockerar; låshashar och rapporter per omfång sparas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                         |
| `check:lockfile`                  | Integritet för `package-lock.json` — https-register, integritetshashar, inga värdåsidosättningar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:licenses`                  | Tillåtelselista för SPDX-licenser för produktionsberoenden                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ja                                         |
| `check:tracked-artifacts`         | Inga byggartefakter eller incheckade symboliska länkar till `node_modules` (körs även i husky pre-commit; pre-push är avsiktligt lättviktig — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ja                                         |
| `check:ai-attribution`            | Ingen AI-/bot-`Co-Authored-By`-trailer eller AI-genererad sidfot i PR-commits, titel eller brödtext — hård regel nr 16 (i snabbkontrollsloopen i `quality.yml` för PR→`release/**` — läser händelsens nyttolast, gör inget utanför PR:er — samt ett steg endast för PR:er i lint-jobbet i `ci.yml` för PR→`main`; även husky-hooken `commit-msg`; mänskliga medförfattare tillåts; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:vitest-exclusions`         | Varje Vitest-undantag anger ett spårningsärende och finns i `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ja                                         |
| `check:file-size`                 | Källfiler (`.ts`/`.tsx` i `src/`, `open-sse/`, `electron/`, `bin/`) håller sig inom `cap` och testfiler (`*.test.ts(x)`) inom `testCap`; filer som är låsta i `file-size-baseline.json` (`frozen` / `testFrozen`) får inte växa utöver sin registrerade storlek                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                         |
| `check:error-helper`              | Felsvar i exekverare/hanterare använder `buildErrorBody()` / `sanitizeErrorMessage()` (hård regel nr 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ja                                         |
| `check:migration-numbering`       | SQL-migreringsfiler är numrerade i ordningsföljd, utan luckor eller dubbletter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                         |
| `check:public-creds`              | Inga literala OAuth-`client_id`/`client_secret` eller Firebase-webbnycklar utanför `publicCreds.ts` (hård regel nr 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                         |
| `check:db-rules`                  | Ingen rå SQL utanför modulerna i `src/lib/db/`; inga samlingsimporter från `localDb.ts` (hårda regler nr 2/5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:known-symbols`             | Leverantörsexekverare, routningsstrategier och översättare som registrerats i sina dispatch-tabeller överensstämmer med filerna på disken – inga föräldralösa eller odeklarerade symboler                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                         |
| `check:route-guard-membership`    | Varje rutt som startar en underordnad process klassificeras av `isLocalOnlyPath()` (hårda regler nr 15/17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ja                                         |
| `check:test-discovery`            | Varje `*.test.ts`-/`*.spec.ts`-fil i repot samlas in av minst en testkörare (spärrmekanism: listan över föräldralösa filer i `test-discovery-baseline.json` kan endast krympa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                         |
| `check:test-tla-order`            | Ingen `node:test`-fil under `tests/unit` registrerar ett test, når en `await` på toppnivå och registrerar sedan fler (#18045; spärrmekanism: `test-tla-order-allowlist.json` kan endast krympa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                         |
| `check:agent-skills-sync`         | Genererade agentfärdighetsartefakter överensstämmer med sin källkatalog (ingen avvikelse)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:provider-asset-provenance` | Leverantörslogotyper/-resurser har en registrerad provenienspost                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `lint:json`                       | JSON-konfigurationsfiler kan tolkas och uppfyller repots lintregler                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `typecheck:core`                  | TypeScript-kompilering utan fel (endast rådgivande varningar)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `typecheck:noimplicit:core`       | Strikt `noImplicitAny` — framåtblickande; många befintliga anropsplatser behöver fortfarande annoteringar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | **Rådgivande** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` begränsad till `src/app/(dashboard)/**` (#7033) — den noggrant utvalda tillåtelselistan med 27 filer i `typecheck:core` innehåller inga TSX-filer för instrumentpanelen, och `next build` typkontrollerar dem inte heller (`next.config.mjs` anger `ignoreBuildErrors: true`), vilket gjorde att regressioner med fristående identifierare där (#6625/#6909) inte upptäcktes av CI. Jämför mot en fryst baslinje med antal per fil och TS-kod (`config/quality/dashboard-typecheck-baseline.json`, samma mönster för kontroll av inaktuella poster som i `check:known-symbols`) — endast NYA fel utöver antalet i baslinjen gör att kontrollen misslyckas; sänk baslinjen med `--update` när ett befintligt fel har åtgärdats.                                                                                                                                                                                                      | Ja                                         |

### Jobb: `quality-gate`

Körs efter `test-coverage`. Blockerar sammanslagning vid fel.

| Skript                       | Validerar                                                                                                                                                                          | Blockerande             |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `quality:collect`            | Skapar `quality-metrics.json` (antal ESLint-varningar, täckning från den sammanslagna shardrapporten)                                                                              | Ja (föregår spärrhaken) |
| `quality:ratchet`            | Inget mätvärde i `quality-baseline.json` har försämrats (ESLint-varningar ≤ baslinjen; täckning ≥ baslinjen)                                                                       | Ja                      |
| `check:duplication`          | Koddupliceringen (jscpd@4) överskrider inte baslinjen i `quality-baseline.json`                                                                                                    | Ja                      |
| `check:complexity`           | Cyklomatisk komplexitet på filnivå överskrider inte gränsen (ESLint-kärnans `complexity` + `max-lines-per-function`)                                                               | Ja                      |
| `check:cognitive-complexity` | Spärrhake för kognitiv komplexitet (`eslint-plugin-sonarjs`) — separat ESLint-körning; CI kör båda sammanslagna som det enda steget `check:complexity-ratchets`                    | Ja                      |
| `check:dead-code`            | Spärrhaken för oanvända exporter/filer (knip) försämras inte jämfört med baslinjen                                                                                                 | Ja                      |
| `check:compression-budget`   | Budget för komprimeringsprestanda — minimikraven för tokenbesparingar per motor får inte försämras                                                                                 | Ja                      |
| `check:type-coverage`        | Spärrhaken för procentandel typad kod (`type-coverage`) försämras inte; ersätter till stor del `typecheck:noimplicit:core`                                                         | Ja                      |
| `check:codeql-ratchet`       | Antalet öppna CodeQL-varningar försämras inte (läses via `gh api`; hoppas över utan fel om token saknas) — uppdateringsintervall och manuell utlösare: se ”CodeQL-spärrhake” nedan | Ja                      |

### Jobb: `quality-extended`

Jobbet blockerar tillämpliga kandidater. Paketstorlek, upptäckta hemligheter, upptäckta
sårbarheter, upptäckta arbetsflödesproblem och OpenAPI-ändringar kontrolleras med obligatoriska spärrhakar.
Diagnostik av cirkulära beroenden är fortsatt rådgivande. Installation av skannrar krävs:
`scripts/ci/install-quality-scanners.sh` installerar låsta versioner och vidarebefordrar
installationsfel. Saknade verktyg, ogiltiga rapporter eller saknade baslinjer gör att
den obligatoriska skannerkontrollen förblir OFULLSTÄNDIG.

| Skript                   | Validerar                                                                                                                                                                                                                                   | Blockerande                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `check:circular-deps`    | Inga cirkulära beroenden (dpdm)                                                                                                                                                                                                             | **Rådgivande**                                    |
| `check:bundle-size`      | Paketstorleken överskrider inte gränsen; en otillgänglig mätning leder till fel                                                                                                                                                             | **Blockerande med --ratchet**                     |
| `check:secrets`          | Gitleaks-resultat försämras inte; obligatoriska skanningar avvisar saknade verktyg/källor/baslinjer, misslyckade skanningar och ogiltiga rapporter                                                                                          | **Blockerande med --ratchet**                     |
| `check:vuln-ratchet`     | Sårbarheter i beroenden försämras inte; obligatoriska skanningar avvisar saknade verktyg, ogiltiga rapporter eller saknade baslinjer                                                                                                        | **Blockerande med --ratchet**                     |
| `check:workflows`        | Lintning av arbetsflöden (actionlint + zizmor); saknade/trasiga skannrar, ogiltiga rapporter eller en saknad spärrbaslinje leder till fel som INCOMPLETE. Giltiga resultat följer den valda strikta, rådgivande eller spärrbaserade policyn | Körning krävs; zizmor-spärren är blockerande i CI |
| `check:openapi-breaking` | Det offentliga API-kontraktet jämförs med fästa händelse-commits (PR merge-base, push before, merge-group base; schemalagd/manuell utcheckning av första föräldern); obligatorisk mätning misslyckas på ett säkert sätt                     | **Blockerande med --ratchet**                     |

### Jobb: `docs-sync-strict`

För pull requests till `main` eller `release/**` körs jobbet endast för kandidater som inte är utkast (eller kommer från en betrodd kö) och som klassificerats som dokumentations- eller kodändringar. Det körs också vid CI-händelser som inte är PR-händelser; arbetsflödets push-trigger omfattar endast `main`, inte `release/**`. Ett steg som avslutas med en annan exitkod än noll blockerar jobbet; fynd som bara rapporteras och de dokumenterade undantagen nedan blockerar inte.

| Skript                         | Validerar                                                                                                                                                                                                                                                                                                                      | Blockerande                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| `check:docs-all`               | Metagrind som kör de 7 delgrindarna nedan sekventiellt                                                                                                                                                                                                                                                                         | Ja                                                                                |
| ↳ `check:docs-sync`            | Versionsöverensstämmelse mellan paket/OpenAPI/CHANGELOG, exakta `llm.txt`-speglar, avsnitts-/storleksinvarianter för översatt CHANGELOG och frånvaro av ersatta dokumentdubletter                                                                                                                                              | Ja                                                                                |
| ↳ `check:docs-frontmatter`     | Kompilerade dokumentationssidor har giltiga frontmatter-titlar                                                                                                                                                                                                                                                                 | Ja                                                                                |
| ↳ `check:docs-counts`          | Antalsinvarianter med hög tillförlitlighet är strikta; heuristiska kontroller av filantal varnar bara om skriptet inte får `--strict` (CI-metagrinden skickar inte med flaggan)                                                                                                                                                | Strikt nivå blockerar; mjuk nivå är rådgivande                                    |
| ↳ `check:env-doc-sync`         | Läsning av miljövariabler i källkoden, `.env.example` och `docs/reference/ENVIRONMENT.md` överensstämmer efter att de uttryckliga ignore-, doc-only- och env-only-undantagslistorna tillämpats                                                                                                                                 | Ja, utanför de dokumenterade undantagslistorna                                    |
| ↳ `check:deprecated-versions`  | Rapporterar potentiellt inaktuella versioner utanför säkra historiska sammanhang och gamla uppdateringsdatum, med undantag för ignorerade dokument                                                                                                                                                                             | Rådgivande i nuvarande CI-konfiguration (`--strict` skickas inte med)             |
| ↳ `check:doc-links`            | Interna markdown-länkar i dokumentationen leder till verkliga filer (formatet `[text]`/`(path)`)                                                                                                                                                                                                                               | Ja                                                                                |
| ↳ `check:fabricated-docs`      | Rutter, miljövariabler, CLI-kommandon, hook-namn och filsökvägar som anges i dokumentationen finns i kodbasen. Hård grind via `--strict`; mjukt fel utan flaggan.                                                                                                                                                              | Ja (via `--strict` i CI)                                                          |
| `check:cli-i18n`               | Använda CLI-nycklar för `t()` finns i `en`; `pt-BR` behåller alla avsnitt på toppnivå; `zh-CN` och `zh-TW` innehåller varje nyckel från `en`                                                                                                                                                                                   | Ja                                                                                |
| `check:openapi-coverage`       | OpenAPI-specifikationen täcker minst en spärrjusterad lägstanivå av verkliga rutter                                                                                                                                                                                                                                            | Ja                                                                                |
| `check:openapi-security-tiers` | Deklarerade `x-loopback-only`-/`x-always-protected`-annoteringar måste ha stöd i `routeGuard.ts`; parserfel och avvikelser i framåtkontrollen blockerar. Bakåtkontrollen av saknade `x-loopback-only` under prefix som endast är lokala varnar, och rutter som enbart definieras av mönster undantas från den bakåtkontrollen. | Parser-/framåtkontroller blockerar; bakåtkontrollen är rådgivande                 |
| `check:openapi-routes`         | Varje `/api...`-sökväg i `openapi.yaml` motsvarar en verklig rutt oberoende av parameternamn efter tillämpning av den motiverade undantagslistan `KNOWN_STALE_SPEC`; inaktuella poster i listan orsakar också fel                                                                                                              | Ja                                                                                |
| `check:docs-symbols`           | Interna `/api/...`-URL-referenser i kanoniska dokument som inte är speglar motsvarar en verklig rutt eller ruttfamilj; proxy-/upstream-/platshållar-/filreferenser och motiverade `KNOWN_STALE_DOC_REFS`-poster undantas, och inaktuella poster i undantagslistan orsakar fel                                                  | Ja                                                                                |
| `i18n translation drift`       | Käll-/målhashar för kärnuppsättningen översatta dokument stämmer med `.i18n-state.json`. PR:er misslyckas endast vid nytillkommen källdrift, saknat mål eller målhashdrift; kontroller utanför PR är strikta. Ärvd PR-drift och inaktuella källhashar för mål ger varningar.                                                   | Ny PR-drift/strikt drift utanför PR blockerar; ärvd/inaktuell drift är rådgivande |

De tolv README-SVG:erna under `docs/diagrams/` genereras med `scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` genererar om dem alla.
Var och en har ett enhetstest som jämför byte för byte (`tests/unit/docs/readme-*-svg.test.ts`, jobbet `test-unit`) och som misslyckas när den incheckade filen är inaktuell.
`check:docs-counts` läser de kanoniska talen från deras `<text>`-noder, och därför omvandlas siffrorna aldrig till konturbanor.
Kontrollen av kanoniska SVG-tal läser filerna som anges i `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, `public/images/tier-flow-dark.svg`, `tier-flow-light.svg`.
Kontrollerna av påståenden om permanent kostnadsfria leverantörer, katalogposter, återkommande pooler och poängfaktorer läser också `promise-pillars.svg`, `free-tier-budget.svg`, `strategies-grid.svg`.
`free-tier-budget.svg` hämtar sina siffror från den aktuella katalogens laddare, så en ändring i `FREE_MODEL_BUDGETS` eller en leverantörs visningsnamn får CI att misslyckas tills filen har genererats om.

### Jobb: `i18n-ui-coverage`

| Skript                             | Validerar                                                                                                                                                                                                 | Blockerande    |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (infogat) | Täckningen för UI-i18n-nycklar är ≥ 65 %                                                                                                                                                                  | Ja             |
| `check-ui-value-drift` (infogat)   | Ett omskrivet engelskt **värde** lämnar inte kvar någon inaktuell översättning                                                                                                                            | Ja             |
| `check-new-key-coverage` (infogat) | En **ny** engelsk nyckel är översatt i varje språkversion — en `__MISSING__:`-markör avvisas                                                                                                              | Ja             |
| `check-translation-ratio`          | Andelen riktiga översättningar per språkversion (identiska med engelskan/platshållare/saknade löv utanför tillåtelselistan) får inte överstiga `config/quality/i18n-translation-baseline.json` + marginal | **Rådgivande** |

Kräver `fetch-depth: 0` — kontrollen för värdeavvikelse jämför `en.json` med sammanslagningsbasen.

#### `check-ui-value-drift` — kontroll för inaktuella översättningar

Fångar den enda i18n-regression som de andra kontrollerna strukturellt inte kan upptäcka: ett engelskt värde
skrivs om och översättningarna som baserades på den _tidigare_ engelska texten blir kvar, vilket innebär att
icke-engelskspråkiga användare fortsätter att läsa självsäkert formulerad text som nu är felaktig.

Detta inträffade faktiskt i en utgåva. `oauthModal.googleOAuthWarning` skrevs om när inloggningshjälpen för Antigravity
lades till (#5203); **39 av 43 språkversioner** behöll text som instruerade operatörer att ”kopiera den
fullständiga URL:en och klistra in den nedan” — ett flöde som inte kan slutföras för den leverantören. Det
förblev oupptäckt fram till #8463 eftersom:

- `sync-ui-keys` endast fyller i nycklar som **saknas**, aldrig sådana som är **inaktuella**;
- `check-ui-keys-coverage` räknar nycklars _närvaro_, så en inaktuell översättning räknas som täckt;
- `check-translation-drift` spårar dokumentationsspeglingarna i `docs/i18n/<locale>/**.md` —
  den läser aldrig `src/i18n/messages/*.json`. Blockerande i jobbet `docs-sync-strict` sedan
  omsynkroniseringen 2026-09: redigera ett centralt dokument → `npm run i18n:run -- --files=<doc>` (på avsnittsnivå, resurssnålt).

**Diffmedveten, inte baslinjebaserad.** Den jämför `en.json` vid sammanslagningsbasen med
arbetsträdet. För varje nyckel vars engelska värde har ändrats betraktas en språkversion som fortfarande innehåller en
orörd översättning som inaktuell. Detta **fryser avsiktligt befintlig skuld** — en diff
kan inte visa vilken gammal engelsk text en sedan länge befintlig översättning härstammar från, så kontrollen bedömer
endast vad den aktuella ändringen berör. Alternativet (en hashbaslinje per nyckel) skulle kräva
en genererad fil på cirka 600 kB, tre gånger större än den största befintliga baslinjen, med ändringar vid varje i18n-PR.

Det finns två sätt att uppfylla kravet:

1. uppdatera de berörda översättningarna, eller
2. ange dem som `__MISSING__:<new english>` — vid körning används då den korrigerade engelska texten
   (`src/i18n/request.ts::deepMergeFallback`, #7258) och nyckeln placeras i kön för översättning.

Om strängens **innebörd** har ändrats bör du i stället **byta namn på nyckeln**: en ny nyckel kan inte ärva
en inaktuell översättning. Det är mönstret som användes i #8463.

```bash
npm run i18n:check-value-drift          # strikt (det som CI kör)
npm run i18n:check-value-drift:warn     # endast rapportering
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Avslutas med kod 0 och `SKIP reason=base-unresolved` när baskatalogen inte kan läsas (ytlig
klon utan basreferensen), i linje med `check-openapi-breaking`.

### Jobb: `i18n`

Fullständig valideringsmatris för i18n (ett jobb per språkversion). Hela jobbet är rådgivande.

| Skript                          | Validerar                                    | Blockerande                                                |
| ------------------------------- | -------------------------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | Översättningsfullständighet per språkversion | **Rådgivande** (`continue-on-error: true` för hela jobbet) |

### Jobb: `pr-test-policy`

Körs endast för pull requests.

| Skript                 | Validerar                                                                                                                                              | Blockerande |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `check:pr-test-policy` | PR:er som ändrar produktionskod i `src/`, `open-sse/`, `electron/` eller `bin/` måste inkludera eller uppdatera tester (strikt regel nr 8)             | Ja          |
| `check:test-masking`   | Ändrade testfiler minskar inte nettoantalet assertions och lägger inte till `assert.ok(true)`-tautologier                                              | Ja          |
| `check:pr-evidence`    | PR-beskrivningen hänvisar till test-/VPS-belägg för ändringen (automatiserar strikt regel nr 18 genom att genomsöka PR-texten — bräckligt, se Backlog) | Ja          |

### Jobb: `test-vitest`

Körs efter `build`. Blockerar sammanslagning vid fel.

| Svit             | Validerar                                                   | Blockerande                                                                                                      |
| ---------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-server (110 verktyg), autoCombo, cache — vitest-körning | Ja                                                                                                               |
| `test:vitest:ui` | UI-komponenttester — vitest-körning                         | **Blockerande** — befintliga fel exkluderas uttryckligen i `vitest.config.ts`; nya fel gör att jobbet misslyckas |

### Nattliga arbetsflöden (schemalagda, rådgivande)

Dessa körs enligt ett cron-schema (och `workflow_dispatch`), aldrig för PR:er. Samtliga är rådgivande.

| Arbetsflöde            | Validerar                                                                                                                                                             | Blockerande    |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | fast-check-egenskapstester med ett slumpmässigt startvärde och ett högt antal körningar                                                                               | **Rådgivande** |
| `nightly-resilience`   | gränskontroll för heap-tillväxt, kaosbaserad felinjektion, k6-belastnings-/uthållighetstestning                                                                       | **Rådgivande** |
| `nightly-llm-security` | promptfoo-injektionsskydd (blockeringsläge) + garak-prober (hoppas över utan en leverantörshemlighet)                                                                 | **Rådgivande** |
| `nightly-schemathesis` | fuzztestning av OpenAPI-kontrakt (schemathesis) mot en aktiv OmniRoute med `docs/openapi.yaml` — synliggör specifikationsöverträdelser/ohanterade 500-fel (Fas 8 B.4) | **Rådgivande** |
| `nightly-mutation`     | Stryker-poäng för mutationstestning över det snabba enhetstestspåret — överlevande mutanter synliggör svaga verifieringar                                             | **Rådgivande** |
| `nightly-compat`       | kompatibilitetsmatris för Node-motorn över de `engines.node`-intervall som stöds                                                                                      | **Rådgivande** |

Prestandabaslinjer (heap, TTFB, byggtid) registreras men används inte som blockerande kriterier: se [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Hastighetsfas (2026-08-30 → v4.0 LTS): varje baslinje lättades med 20 %

Ägarbeslut (2026-08-30): fram till modulariseringen i v4.0 är leveranshastigheten viktigare
än att hålla nere den tekniska skulden. Varje **numerisk** spärrbaslinje lättades med 20 % i en
granskningsbar omgång, och fasen deklareras i `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Vad som ändrades                                                                                                                                                                                                | Var                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — antal där lägre är bättre ×1,2, procenttal där högre är bättre ÷1,2 (täckningsgolvet 60 behölls, `eslintErrors` förblir 0, `eslintWarnings` 0 → 20 % av det frysta antalet undertryckanden) | `quality-baseline.json` (noten `_relax_velocity_2026_08_30` listar alla före → efter)                  |
| `count` ×1,2 / `percentage` ×1,2                                                                                                                                                                                | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, varje radgräns i `frozen[*]` / `testFrozen[*]` ×1,2                                                                                                                                           | `file-size-baseline.json`                                                                              |
| antal per fil/per TS-kod ×1,2                                                                                                                                                                                   | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                             | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` blir rådgivande medan `_policy.requireTighten === false`                                                                                                                                    | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| nattliga `bank-ratchet-shrinks` pausas (det skulle tillgodoräkna den uppmätta minskningen och upphäva marginalen)                                                                                               | `.github/workflows/nightly-release-green.yml`                                                          |

Tillåtelselistor (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) är **inte** budgetar och ändrades inte. Policyspärrar för godkänt/underkänt (hemligheter, SQL-regler,
dokumentations-/miljökontrakt, i18n-paritet, enhetstester) är oförändrade — ett rött test är fortfarande ett rött test.

**Verktyg**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — den
  engångsvisa lättnaden (`scripts/quality/relax-baselines.mjs`); vägrar att köras två gånger med
  samma not.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mäter varje numerisk spärr på samma sätt som CI och visar återstående marginal per spärr
  (`scripts/quality/baseline-headroom.mjs`). Det nattliga jobbet `baseline-headroom` publicerar
  tabellen i arbetsflödeskörningens sammanfattning och laddar upp sin JSON-/Markdown-rapport som
  `baseline-headroom-<run_id>`, med 90 dagars lagringstid. Varningsrader och kritiska rader identifierar spärrar
  som ligger inom 10 % av sitt tak eller redan har överskridit det. Granska dessa rapporter som en tidig varning om
  att budgetar förbrukas; inspektera noterna `_rebaseline_*` för spärren i fråga. Jobbet
  skapar eller uppdaterar inte längre ett permanent ärende; #12149 bevarar den tidigare rapporthistoriken.

**Läge för ny kod (Clean-as-You-Code) — sedan 2026-08-30, endast snabbspår för PR:er**

Vid `pull_request`-händelser skickar `quality.yml` `--base-ref <PR base SHA>` till `check:file-size`,
`check:complexity-ratchets` och `check:dead-code`. För `check:complexity-ratchets` och
`check:dead-code` jämför spärren HEAD med merge-basen, **begränsat till de filer som PR:en
ändrade** (`scripts/check/newCodeMode.mjs`: merge-basen materialiseras i en tillfällig
`git worktree`, ESLint/knip körs där och på HEAD, och antalen per fil jämförs):

- **blockerande** — PR:en lade till cyklomatiska/kognitiva överträdelser eller oanvända exporter i filer som den ändrade
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` i loggen);
- **rådgivande** — den globala totalsumman jämfört med den frysta baslinjen. Ärvd avvikelse gör aldrig en
  oskyldig PR röd; avvikelsen fryses om vid versionsavstämning och övervakas av marginaljobbet.

`check:file-size` använder basreferensen enligt sina egna villkor (`scripts/check/check-file-size.mjs`, #8522):
det kontrollerar varje käll- och testfil i trädet, läser varje fils radantal vid PR-basen
med `git show` och underkänner en fil endast när den växer förbi det större av dess baslinjetak
(`frozen` / `testFrozen`, eller `cap` / `testCap` för en fil utanför baslinjen) och dess basstorlek.
En fil som redan hade avvikit i basen gör därför aldrig en oskyldig PR röd.

`check:boundary:ratchet` tillämpar samma regel på sitt enda tal
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): vid PR-händelser skickar både
snabbgrindarna i `quality.yml` och lint-jobbet i `ci.yml` med PR:ens bas-SHA, baskommitten
mäts från en `git archive`-export och PR:en misslyckas endast när antalet kanter för `open-sse → src`
överstiger det största av `metrics.boundaryOpenSseToSrc` och antalet i basen. Basdrift
över taket rapporteras (`base drift herdado`) men gör aldrig en oskyldig PR röd; push → main
behåller det absoluta taket, och om basens SHA inte kan lösas används det som reserv med en varning.

Körningar via `workflow_dispatch`, releasekontrollen för grönt resultat och det nattliga jobbet för
marginal har ingen PR-bas och behåller den absoluta (globala) jämförelsen. Täckning, duplicering och
typtäckning förblir globala tills vidare (deras verktyg kan inte billigt producera en diff per fil) —
kandidater för samma behandling.

**Avsluta fasen vid v4.0 (LTS = striktare än tidigare, inte ”tillbaka till det normala”)**

1. På den rena spetsen av `release/v4.0.0`: `npm run quality:headroom --json` för dokumentation,
   sedan `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, samt varje typkontrollgrinds
   `--update` — varje baslinje sänks till det uppmätta värdet.
2. Ta bort `_policy` från `quality-baseline.json` (återaktiverar `--require-tighten` och den nattliga
   ackumuleringen), återställ `THRESHOLD = 36` (eller högre) i `check-openapi-coverage.mjs`.
3. Skärp utöver det uppmätta där modulariseringen gav resultat: återställ `cap` för filstorlek till
   1000 (eller 800), höj täckningsgolven med 5 och sätt döda exporter till 0 för de modulariserade paketen.

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

## Policy för tillåtelselistor

Varje kontroll som inte kan misslyckas på grund av befintliga överträdelser använder en fryst tillåtelselista
(t.ex. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Policyn är:

**Åtgärda grundorsaken; använd tillåtelselistan endast när överträdelsen är befintlig och
inte kan åtgärdas i samma PR.**

När du lägger till en post i en tillåtelselista:

1. Inkludera en kommentar med motiveringen.
2. Hänvisa till spårningsärendet (t.ex. `// #3498 — Phase 2 feature, not yet implemented`).
3. Ta bort posten i samma PR som åtgärdar överträdelsen – en inaktuell post som inte längre
   undertrycker en aktiv överträdelse är i sig ett fel (kontrollen för inaktuell tillämpning i 6A.3
   kommer att misslyckas på en föräldralös post i tillåtelselistan när den har implementerats).

Lägg **inte** till poster i tillåtelselistan för att få testerna att godkännas snabbare. En godkänd kontroll med en växande
tillåtelselista ger en falsk känsla av kvalitet.

### När en kontroll misslyckas för din PR

1. **Läs kontrollens utdata noggrant** – den talar om exakt vilken fil eller symbol som bröt mot
   regeln.
2. **Åtgärda överträdelsen** – de flesta kontroller är deterministiska filsystemskontroller som godkänns så snart
   koden är korrekt.
3. **Om överträdelsen är befintlig** (dvs. du introducerade den inte, men kontrollen
   omfattar den nu): lägg till en post i tillåtelselistan med en motiverande kommentar och ett spårningsärende.
4. **Om kontrollen är en spärrmekanism** (täckningsgrad, ESLint-varningar, duplicering, komplexitet):
   din ändring försämrade mätvärdet. Åtgärda det underliggande problemet eller kör (i sällsynta fall)
   `npm run quality:ratchet -- --update` om ändringen är avsiktlig och försämringen av mätvärdet
   är acceptabel – men dokumentera varför i PR-beskrivningen.
5. **Rådgivande kontroller** (`continue-on-error: true`) är informativa – de blockerar inte
   sammanslagningen men visas i CI-sammanfattningen. Åtgärda dem ändå.

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

Denna inventering stämdes av mot `ci.yml` den 2026-06-17 (den föregående versionen utelämnade
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). En ROI-granskning av den avstämda uppsättningen
identifierade följande rationaliseringskandidater. **Sammanslagningarna är mekaniska CI-
ändringar; växlingarna/borttagningarna är policybeslut som är förbehållna operatören.** Inget nedan
har tillämpats ännu.

**Inte heller dokumenterat ovan** (rådgivande, låg signal): jobbet `docs-lint`
(markdownlint + Vale, hela jobbet `continue-on-error`) och de fristående skanningsarbetsflödena
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` finns i
`quality-baseline.json` men är inte kopplat till en blockerande spärrmekanism i `ci.yml` — mätvärdet är
för närvarande frikopplat.

### Slå samman/deduplicera (mekaniskt, lägre risk)

Varje kandidat validerades mot det aktiva grindläget den 2026-06-17 (lita på, men verifiera);
flera ”uppenbara” sammanslagningar visade sig dölja teknisk skuld och är **inte** rena direktbyten.

- **`check:docs-sync` körs två gånger** — fristående i jobbet `lint` och återigen inuti `check:docs-all` (`docs-sync-strict`) samt i huskys pre-commit-hook. ✅ **KLART** — den fristående `lint`-körningen har tagits bort.
- **CVE-skanning** — ❌ **INTE en ren sammanslagning.** `audit:deps` blockerar kritiska rekommendationer och ofullständiga granskningar för samtliga fem lockfiler, samtidigt som rekommendationer med hög allvarlighetsgrad rapporteras som varningar enligt den nuvarande policyn; `check:vuln-ratchet` (osv) misslyckas endast vid en _försämring_ jämfört med den incheckade baslinjen och avvisar saknade mätningar när de krävs. Olika semantik — om `audit:deps` tas bort försvinner den absoluta kritiska grinden och de oberoende granskningskvittot för paketen. Behåll båda.
- **Cykeldetektering** — ✅ **KLART** (#15159 G-01/G-02). Den gamla texten här kallade `check:cycles` för den ”gröna, kuraterade” grinden och motiverade att den skulle förbli blockerande eftersom `check:circular-deps` (dpdm) rapporterade 91 cykler. Den gröna statusen var **falskt grön**: `check:cycles` skannade 5 underkataloger (450 filer), matchade endast statiska `import|export … from` och ignorerade varje `@/`- och `@omniroute/open-sse/`-specifierare, vilket innebar att den inte kunde se de cykler med dynamisk import och alias som dominerade i repot. Åtgärdat: grinden går nu igenom `src` + `open-sse` (5023 filer), samlar in specifierare från TypeScript-AST:n (så `import("…")` räknas medan `typeof import("…")` i typposition inte gör det) och löser upp `paths` från tsconfig. Den hittar **14** cykler, inte 0. Eftersom 14 befintliga cykler inte kan åtgärdas i en grind-PR är `check:cycles` nu en **spärrmekanism** (`--ratchet`, tak `metrics.cycles.value = 14` i `quality-baseline.json`, `direction: down`) — den blockerar varje _försämring_ och antalet kan endast sjunka. CI kör `npm run check:cycles:ratchet`. Nedtrappningen sker tillsammans med **A-01**. `check:circular-deps` (dpdm) förblir rådgivande som en bredare oberoende bedömning.
- **Komplexitet** — ✅ **KLART** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): en ESLint-genomgång, räknar per ruleId så att baslinjerna för cyklomatisk komplexitet + maximalt antal rader och kognitiv komplexitet förblir oberoende; de enskilda `check:complexity` / `check:cognitive-complexity` finns kvar för lokal `--update`.
- **Anti-hallucination för `/api`** — ✅ **KLART** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): en FS-inventering av `src/app/api`; openapi-routes + docs-symbols rapporterar fortfarande oberoende av varandra; de enskilda kontrollerna finns kvar för lokala körningar.
- **`check:node-runtime` körs i 11 jobb** — ⚠️ **låg ROI.** Varje körning sker på en separat runner och kontrollen tar <1 s; total besparing ~10 s, till priset av att en billig skyddskontroll per jobb går förlorad. Inte värt omarbetningen.
- **`typecheck:noimplicit:core` i CI-lintningen** — ✅ **borttagen från lint-jobbet** (var rådgivande med `continue-on-error`); den blockerande typytan är `typecheck:core` + `check:type-coverage`. Det lokala skriptet har behållits.

### Växla/besluta (operatörspolicy)

- `check:openapi-security-tiers` (rådgivande) — ❌ **KAN INTE växlas rent.** Den avslutas med 0 men varnar för att flera `traffic-inspector`-rutter under `LOCAL_ONLY_API_PREFIXES` saknar annoteringen `x-loopback-only: true`. För att genomdriva den måste dessa annoteringar först läggas till i `openapi.yaml`.
- `typecheck:noimplicit:core` (rådgivande) — ersätts till stor del av den blockerande spärrmekanismen `check:type-coverage`. Växla till en spärrmekanism eller ta bort den redundanta andra `tsc`-genomgången.
- `test:vitest:ui` (nu **blockerande**) — befintliga fel undantas uttryckligen i `vitest.config.ts` med spårningskommentarerna `// #8618`; nya fel gör att jobbet misslyckas.
- `check:secrets` (gitleaks, blockerande spärrmekanism) — det nuvarande taket är `metrics.secretFindings` i `quality-baseline.json`. Varje undantag kräver en motiverad post i `.gitleaks.toml`; en otillgänglig mätning är INCOMPLETE. Skanningen kompletterar GitHubs inbyggda hemlighetsskanning och `check:public-creds`.
- `check:pr-evidence` (blockerande, söker med grep i PR-brödtext) — hög risk för falska positiva resultat; om den tas bort försvagas genomdrivningen av den hårda regeln nr 18, så detta är ett genuint policybeslut.
- `semgrep` (rådgivande och fristående) — överlappar CodeQL för OWASP-familjerna; koppla dess baslinje till en spärrmekanism eller ta bort den.

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
