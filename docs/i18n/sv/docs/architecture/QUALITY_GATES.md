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

CI och Quality Gates-arbetsflödena avger vart och ett stabilt omdöme: `Gate / CI` och `Gate / Quality`. Deras versionerade antagningspolicy räknar upp varje uppströmsjobb efter behov eller rådgivande. Ett tillämpligt obligatoriskt jobb måste lyckas: saknade, avbrutna, överhoppade, väntande och okända resultat kan inte fastställa PASS. En giltig klassificering av endast dokument eller endast katalog kan göra en kodfil otillämplig; ett vanligt utkast till PR är inte en antagen kandidat. En `hotfix` etikett avsäger sig inte bevis.

Båda arbetsflödena täcker PRs in i main/release grenar, push till `main`, manuell sändning och merge-group-händelser. Push, dispatch och merge-group kör hela urvalet. Ett pålitligt Mergify-köutkast kör också tillämpliga `full-code`/`full-code-e2e` -jobb; vanliga PRs hoppa över dem. Innan en manuell sammanslagning kör du en fullständig utskick på den exakta kandidaten. Pushar till `release/**` startar inte dessa arbetsflöden; Release-Green observerar den sammanslagna basen separat (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks och merge-grupper använder värdar för löpare för jobb som annars väljer självvärdar löpare; tillräcklig värdkapacitet måste verifieras innan lansering.

En vanlig PR kör det snabba urvalet. `full-code` och `full-code-e2e` -banorna i tillträdespolicyn (E2E, integration, paketartefakt, Electron smoke, Bun SQLite, ekosystem- och protokollklienter) körs endast på ett Mergify-köutkast eller på en fullständig körning: `gh workflow run ci.yml --ref <branch>`.

Varje JSON kvitto identifierar utcheckad SHA, arbetsflödeskörning och försök. CLI avvisar en checkout/event SHA felmatchning. Arbetsflödestester binder policymedlemskap till domsjobbets `needs` lista så att en ny eller borttagen fil inte kan försvinna tyst. Kvittona täcker deras eget arbetsflöde, inte publicering, distribution eller interna delar av en befintlig rådgivande skanner. Att göra de tillämpliga kontroller som krävs i filialregler är en separat administrativ förändring; Att definiera sina jobb skyddar inte i sig en gren.

`API Route Typecheck` är en oberoende arbetsflödeskontroll, utanför både samlade bedömningar och den lokala fulla observatörens statiska profil. Inspektera resultatet separat för den exakta kandidaten. `.github/workflows/api-route-typecheck.yml` körs på PRs till `main` eller `release/**`, pushar till antingen grenfamilj, manuell avsändning och `merge_group` -händelser av typen `checks_requested`. Den har inget sökvägsfilter. Slå samman grupper kolla in `merge_group.head_sha`; andra evenemang kolla in `github.sha`. Alla händelser använder samma API diagnostiska grind- och grindenhetstester. PR basåtermål begär en ny kontroll; body/title redigeringar använder endast observationsnamnet `Admission not requested / API Route Typecheck` och kan inte ersätta antagningskontrollen.

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

### DAST använder det verifierade CI-bygget

Det obligatoriska CI-jobbet `dast-smoke` anropar `.github/workflows/dast-smoke.yml` efter `build`. Det följer samma urval av kod och utkast som bygget, inklusive stödda PR:er från fork, PR:er mot release och mergegrupper. Ett DAST-jobb som saknas, misslyckas, avbryts eller oväntat hoppas över blockerar `Gate / CI`. Det återanvändbara arbetsflödet har ingen egen PR-trigger eller manuell trigger; manuell validering använder CI:s start så att bygge och konsument stannar i samma körning.

`scripts/ci/next-build-provenance.mjs` förseglar hela Next-artefakten med tar-kontrollsumman, repository/händelse/körning, producentförsök, head/base/checkout/tree, workflowidentiteter, låsfil, exakt Node-version/ABI, plattform och bundler. DAST väljer det oföränderliga artefakt-ID:t från `needs.build.outputs`, kräver verifiering av nedladdningens kontrollsumma och beräknar oberoende ZIP-hashen mot producentens kontrollsumma innan de två tillåtna medlemmarna packas upp via `scripts/ci/unpack-ci-build.py`. Manifestet och tar-arkivet måste också matcha producentens oberoende utdata innan Next-trädet packas upp. Den söker aldrig efter grenens senaste lyckade bygge. En partiell omkörning kan återanvända samma producentförsök om dess ID och alla indata fortfarande stämmer; kvittot registrerar båda försöken.

Konsumenten stannar på en värdbaserad Linux-runner med skrivskyddad repositorybehörighet och utan repositoryhemligheter. Den installerar producentens exakta Node-version och sätter sedan ihop CLI med `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` avvisar en saknad fristående server före något reservbygge; vanliga lokala CLI-byggen behåller sin befintliga reservlösning. Serverberedskap, Schemathesis och promptfoo måste alla lyckas inom jobbets oförändrade gräns på 25 minuter. Ett provenienskvitto bevisar indatas identitet och byte, inte en lyckad DAST-skanning. Utgången artefakt, runneravbrott eller skannerfel förblir ofullständiga eller negativa bevis; de kan inte bli PASS via ett rådgivande omslag.

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

### Kvittenser för enhetskörningens förlopp

Det gemensamma kommandot `test:unit:ci:shard` registrerar faserna `primary`, `dashboard` och `serial`
via `scripts/ci/unit-progress-reporter.mjs`. Den vanliga testrapporten förblir
tillgänglig. En separat kvittens som endast innehåller metadata registrerar när varje fil startas och slutförs,
och ett 30-sekunders pulsslag listar de filer som fortfarande är aktiva samt deras förflutna körtid. Den registrerar
endast exekveringsmetadata som finns i tillåtelselistan; testbeskrivningar, utdata, felmeddelanden och den fullständiga
miljön serialiseras inte.

CI behåller JSONL-filerna som `unit-progress-ci-<run>-<attempt>-<shard>`. En tidsgräns för jobbet kan förhindra den senare uppladdningen;
redan utsända pulsslag finns kvar som diagnostiskt underlag. Saknade pulsslag kan även tyda på
en blockerad eller avslutad runner-process. Dessa kvittenser bevarar det befintliga testurvalet,
parallelliteten, tidsgränserna och slutstatusen; de utgör inte beslut om godkännande av kandidater.

### Slå samman kö

`queue` etiketten skickar en PR till Mergify-kön (`.mergify.yml`). Mergify öppnar ett utkast till PR på en `mergify/merge-queue/` -gren, CI kör hela markeringen där, och den ursprungliga PR smälter samman när `Gate / CI`, `Gate / Quality` och `Merge integrity (changelog + generated skills)` passerar.

Mergify skriver sin kösammanfattning i utkastets beskrivning, och andra appar kan också redigera den. En `pull_request` `edited` -händelse på ett sådant utkast tar sin egen samtidighetsgrupp (`-queue-edit-<run_id>`) så den kan inte avbryta utkastets riktiga körning, och den hoppar över grinden och matrisen. Endast `Merge integrity` körs fortfarande. Det överhoppade grindjobbet har ett annat kontrollnamn, eftersom Mergify läser en överhoppad `Gate / CI` som en misslyckad kontroll och ställer ut PR.

Efter en dequeue, en push inte alltid återköa PR. Kommentera `@mergifyio queue` på det.

### Inventering av statiska skanningar

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

### Hälsostatus för publicerad basdokumentation

`.github/workflows/i18n-base-health.yml` övervakar dokumentationens hälsostatus efter utvalda
pushar till `main` och `release/v*` samt vid manuell körning. Dess filter omfattar dokumentation,
Markdown-filer i roten, `llm.txt`, översättningstillstånd/-konfiguration och relevanta i18n-verktyg.
Det enda jobbet, `Published base documentation health`, använder en driftad Ubuntu-miljö och en
tidsgräns på fem minuter. Det utför skrivskyddad validering och skriver ett diagnostiskt kvitto
utan att installera beroenden, översätta eller överta tillstånd.

`scripts/i18n/check-base-health.mjs` kräver att det inte finns några inkonsekvenser avseende
källhashar, saknade mål, målhashar, inaktuella översättningar eller sektionscache. Det validerar
även det aktuella omfånget för kärndokument och språkversioner samt dess registrerade proveniens.
Ogiltig kontext, ofullständig täckning eller en avbruten kontroll ger `INCOMPLETE`; bekräftad
avvikelse ger `FAIL`. Båda returnerar en felstatus vid avslut. Kvittot är bundet till utcheckningens
SHA, arbetsflödet, körningen och försöket och sparas som `i18n-base-health-<sha>-<run>-<attempt>`.

Detta är en oberoende observation av den publicerade basen. Den lägger inte till någon PR- eller
merge-group-händelse, någon obligatorisk PR-kontroll, något npm-alias eller någon medlem i en
profil för statisk genomsökning. Den befintliga differentiella PR-policyn och den underliggande
kontrollens rådgivande klassificeringar förblir separata. En lyckad uppladdning kan inte omvandla
ett misslyckat hälsoresultat till PASS.

### Släpp PR fast-path (`quality.yml`)

`.github/workflows/quality.yml` kompletterar CI på main/release PRs, pushar till `main`, skickar och sammanfogar grupper. PRs använder sökvägsfiltrerade snabbkontroller. Den permanent inaktiverade dubblettversionen togs bort. de riktiga build/package/boot -checkarna förblir i CI. Enhetssviten och vitest körs endast i CI (`Unit Tests (N/8)` och `Vitest`).

| Jobb                                             | Omfattning                                                                                                                                                                                              | Blockering            |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs och docs-all                                                                                                                                                               | Ja                    |
| `Fast Quality Gates`                             | Kod PRs; statiska kontroller, typkontroll, instrumentpaneltypkontroll, påverkade enhetstester                                                                                                           | Ja                    |
| `Forgotten sibling tests`                        | Kod PRs; ändrade moduler spårade till statiska konsumenter och kandidatsyskontest; fat- och dynamiska importvägar rapporteras som rådgivande diagnostik, med refererade undantag från godkännandelistan | **Rådgivande**        |
| `No new ESLint warnings`                         | Kod PRs; dämpningsmedveten luddskydd                                                                                                                                                                    | Ja, inklusive gafflar |
| `Merge integrity (changelog + generated skills)` | Icke-utkast PRs; changelog och genererad färdighetssynkronisering                                                                                                                                       | Ja, inklusive gafflar |

#### Glömda syskonprovsrapport

`npm run check:forgotten-sibling-tests` körs som ett rådgivande steg för `Fast Quality Gates` och återanvänder importresolvern bakom testeffektkartan. För varje ändrad produktionsmodul rapporterar den deterministiska `changed module/symbol -> static consumer -> candidate sibling test` kedjor när kandidattestet saknas i pull-request diff. Markdown-sammanfattningen och JSON resultatet behålls som `forgotten-sibling-tests` arbetsflödesartefakten för kalibrering innan någon blockerande utrullning.

Återexport av fat och dynamisk import är endast upplösningsdiagnostik; de skapar aldrig ett blockerande fynd. Recenserade undantag live i `config/quality/forgotten-sibling-allowlist.json`. Varje post måste namnge konsument- och kandidattestet, ge en specifik motivering och länka en GitHub -fråga eller pull-begäran. Felaktiga poster stängs inte. Undantag kan inte undertrycka ett borttaget kandidattest eller en skillnad som lägger till `.skip`/`.todo`; påståendeförsvagning och annan maskering förblir ägd av den oberoende blockerande `check:test-masking` porten.

### Jobb: `lint`

Körs för varje PR mot `main`. Blockerar sammanslagning vid fel.

| Skript (`npm run ...`)            | Validerar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Blockerande                                |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Node.js-versionen ligger inom det intervall som stöds                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                         |
| `check:cycles`                    | Cykliska importer i hela `src/` + `open-sse/` (AST-baserat, `paths` i tsconfig matchas). Kommandot utan tillägg avslutas med kod 1 när en cykel finns (fail-closed sedan #15281) och listar SCC:erna. `check:cycles:ratchet` (som CI kör) blockerar när antalet överstiger taket `metrics.cycles` i `quality-baseline.json` — för närvarande 14, `direction: down`, så det kan endast minska (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ja (spärrmekanism)                         |
| `check:boundary`                  | Kopplingar från `open-sse → src`: unika importer från fil till fil från motorn till appen (`scripts/quality/measure-boundary.mjs`; kantlistan är åtgärdsbackloggen för uppdelningen av kärnan/modulerna i v4). Utan tillägg = rådgivande rapport (samma som `quality:boundary`). `check:boundary:ratchet` (som CI kör, även i spärrloopen för snabba kontroller i `quality.yml`) blockerar när antalet överstiger taket `metrics.boundaryOpenSseToSrc` i `quality-baseline.json` — initialiserat till det uppmätta värdet 771, `direction: down`; `--update` kan endast sänka det; basrelativt för PR:er (`--base-ref`, se nedan)                                                                                                                                                                                                                                                                                                                                                                                | Ja (spärrmekanism)                         |
| `check:route-validation:t06`      | Zod-scheman finns för alla routes (policy för nivå 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                         |
| `check:any-budget:t11`            | Antalet `@ts-expect-error // any` överskrider inte budgeten (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                         |
| `check:provider-consistency`      | Varje leverantör i `providers.ts` har en motsvarande post i `providerRegistry.ts` (och omvänt, inom tillåtelselistan)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                         |
| `check:model-lifecycle`           | De tre manuellt underhållna routningstabellerna förblir konsekventa med den incheckade livscykelögonblicksbilden (#11503): `FITNESS_TABLE` (`taskFitness.ts`) poängsätter inget utfasat id som `REGISTRY` kan dirigera; varje mål i `BUILT_IN_ALIASES` finns i `REGISTRY` och saknas i ögonblicksbilden över utfasade id:n; varje utfasat id som fortfarande finns i `REGISTRY` vidarebefordras eller listas i `allowedRetiredInCatalog`; och ingen källa eller inget mål i `DEFAULT_DEGRADATION_MAP` visas som utfasat i den ögonblicksbilden. Detta bevisar inte att en modell för närvarande tillhandahålls av en aktiv uppströmsleverantör. Offline – jämför med `config/quality/model-lifecycle.json`, som uppdateras manuellt med `npm run quality:refresh-model-lifecycle` (nätverk; inte integrerat i CI). `allowedRetiredInCatalog` är en gradvis minskande spärr: lägg endast till en post tillsammans med ett spårningsärende.                                                                        | Ja                                         |
| `check:fetch-targets`             | Varje `fetch("/api/...")` i klientsidans `src/` matchar en faktisk `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                         |
| `check:deps`                      | Alla beroenden som kan installeras med `npm install` i varje `package.json` i repo:t finns i `dependency-allowlist.json`; nya ofästa paket eller paket med namn som kan bero på felskrivningar flaggas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                         |
| `audit:deps`                      | npm-granskning av alla fem oberoende låsfiler (roten, Electron, OpenCode-insticksprogrammen v1/v2 och leverantören). Kritiska säkerhetsvarningar blockerar; säkerhetsvarningar med hög allvarlighetsgrad förblir synliga varningar. Saknade/misslyckade granskningar markeras som INCOMPLETE och blockerar; låshashar och rapporter per omfång sparas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ja                                         |
| `check:lockfile`                  | Integritet för `package-lock.json` — https-register, integritetshashar, inga värdåsidosättningar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ja                                         |
| `check:licenses`                  | Tillåtelselista för SPDX-licenser för produktionsberoenden                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ja                                         |
| `check:tracked-artifacts`         | Inga byggartefakter eller incheckade symboliska länkar till `node_modules` (körs även i husky pre-commit; pre-push är avsiktligt lättviktig — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:ai-attribution`            | Ingen AI-/bot-`Co-Authored-By`-trailer eller AI-genererad sidfot i PR-commits, titel eller brödtext — hård regel nr #16 (i snabbkontrollsloopen i `quality.yml` för PR→`release/**` — läser händelsens nyttolast, gör inget utanför PR:er — samt ett steg endast för PR:er i lint-jobbet i `ci.yml` för PR→`main`; även husky-hooken `commit-msg`; mänskliga medförfattare tillåts; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:vitest-exclusions`         | Varje Vitest-undantag anger ett spårningsärende och finns i `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                         |
| `check:file-size`                 | Källfiler (`.ts`/`.tsx` i `src/`, `open-sse/`, `electron/`, `bin/`) håller sig inom `cap` och testfiler (`*.test.ts(x)`) inom `testCap`; filer som är låsta i `file-size-baseline.json` (`frozen` / `testFrozen`) får inte växa utöver sin registrerade storlek                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ja                                         |
| `check:error-helper`              | Felsvar i exekverare/hanterare använder `buildErrorBody()` / `sanitizeErrorMessage()` (hård regel nr #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                         |
| `check:migration-numbering`       | SQL-migreringsfiler är numrerade i ordningsföljd, utan luckor eller dubbletter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:public-creds`              | Inga literala OAuth-`client_id`/`client_secret` eller Firebase-webbnycklar utanför `publicCreds.ts` (hård regel nr #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ja                                         |
| `check:db-rules`                  | Ingen rå SQL utanför modulerna i `src/lib/db/`; inga samlingsimporter från `localDb.ts` (hårda regler nr #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ja                                         |
| `check:known-symbols`             | Leverantörsexekverare, routningsstrategier och översättare som registrerats i sina dispatch-tabeller överensstämmer med filerna på disken – inga föräldralösa eller odeklarerade symboler                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ja                                         |
| `check:route-guard-membership`    | Varje rutt som startar en underordnad process klassificeras av `isLocalOnlyPath()` (hårda regler nr #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ja                                         |
| `check:test-discovery`            | Varje `*.test.ts`-/`*.spec.ts`-fil i repot samlas in av minst en testkörare (spärrmekanism: listan över föräldralösa filer i `test-discovery-baseline.json` kan endast krympa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ja                                         |
| `check:test-tla-order`            | Ingen `node:test`-fil under `tests/unit` registrerar ett test, når en `await` på toppnivå och registrerar sedan fler (#18045; spärrmekanism: `test-tla-order-allowlist.json` kan endast krympa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ja                                         |
| `check:agent-skills-sync`         | Genererade agentfärdighetsartefakter överensstämmer med sin källkatalog (ingen avvikelse)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:provider-asset-provenance` | Leverantörslogotyper/-resurser har en registrerad provenienspost                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `lint:json`                       | JSON-konfigurationsfiler kan tolkas och uppfyller repots lintregler                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `typecheck:core`                  | TypeScript-kompilering utan fel (endast rådgivande varningar)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                         |
| `typecheck:noimplicit:core`       | Strikt `noImplicitAny` — framåtblickande; många befintliga anropsplatser behöver fortfarande annoteringar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **Rådgivande** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` begränsad till `src/app/(dashboard)/**` (#7033) — den noggrant utvalda tillåtelselistan med 27 filer i `typecheck:core` innehåller inga TSX-filer för instrumentpanelen, och `next build` typkontrollerar dem inte heller (`next.config.mjs` anger `ignoreBuildErrors: true`), vilket gjorde att regressioner med fristående identifierare där (#6625/#6909) inte upptäcktes av CI. Jämför mot en fryst baslinje med antal per fil och TS-kod (`config/quality/dashboard-typecheck-baseline.json`, samma mönster för kontroll av inaktuella poster som i `check:known-symbols`) — endast NYA fel utöver antalet i baslinjen gör att kontrollen misslyckas; sänk baslinjen med `--update` när ett befintligt fel har åtgärdats.                                                                                                                                                                                                                                                                             | Ja                                         |
| `check:build-typecheck`           | Typkontroll av hela produktionsprogrammet över `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), som ytan som täcks av `typecheck:core`'s allowlist med 27 filer och dashboard-kontrollen inte omfattar. Jämför skillnader mot `config/quality/build-typecheck-baseline.json`; ett nytt eller ökat antal per (fil, kod) gör att kontrollen misslyckas, ett lägre antal ber dig minska baslinjen. `--update` vägrar köras när körningen innehåller ett nytt eller ökat par om inte `--force-regressions` skickas med, och vägrar en nyligen tystad fil om inte `--force-nocheck` skickas med, så att utöka baslinjen för att få grönt och att ge en permanent tystnad är två separata medvetna handlingar. Ett ensamt `--force` avvisas. Skannar även byggomfattningen efter `@ts-nocheck` mot `config/quality/ts-nocheck-baseline.json`, eftersom en fil som använder det inte rapporterar någon diagnostik alls och annars skulle vara osynlig för varje kontroll. | Ja                                         |

#### Två typkontrollprogram ger olika svar

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) och `check:build-typecheck` kompilerar olika program med olika
alternativ, och samma fil kan vara felfri i det ena och full av fel i det andra.

`tsconfig.build.json` anger `"strict": false`, så `noImplicitAny` är avstängt. Core-
konfigurationen kompilerar en utvald allowlist med 27 filer med striktare alternativ
och följer importgrafen för varje post, så filer som aldrig förekommer i
byggprogrammet ändå kontrolleras där.

Konsekvensen är viktig när man bedömer om en fil är typad: **noll diagnostik
under `check:build-typecheck` betyder inte noll**. När `@ts-nocheck` togs bort från 26
filer var 23 av dem felfria i byggprogrammet; sexton av dessa visade omkring 120
implicit-any-fel i det strikta programmet. Kontrollera båda innan du kallar en fil
felfri.

### Jobb: `quality-gate`

Körs efter `test-coverage`. Blockerar sammanslagning vid fel.

| Skript                       | Validerar                                                                                                                                                       | Blockerande             |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `quality:collect`            | Skapar `quality-metrics.json` (antal ESLint-varningar, täckning från den sammanslagna shardrapporten)                                                           | Ja (föregår spärrhaken) |
| `quality:ratchet`            | Inget mätvärde i `quality-baseline.json` har försämrats (ESLint-varningar ≤ baslinjen; täckning ≥ baslinjen)                                                    | Ja                      |
| `check:duplication`          | Koddupliceringen (jscpd@4) överskrider inte baslinjen i `quality-baseline.json`                                                                                 | Ja                      |
| `check:complexity`           | Cyklomatisk komplexitet på filnivå överskrider inte gränsen (ESLint-kärnans `complexity` + `max-lines-per-function`)                                            | Ja                      |
| `check:cognitive-complexity` | Spärrhake för kognitiv komplexitet (`eslint-plugin-sonarjs`) — separat ESLint-körning; CI kör båda sammanslagna som det enda steget `check:complexity-ratchets` | Ja                      |
| `check:dead-code`            | Spärrhaken för oanvända exporter/filer (knip) försämras inte jämfört med baslinjen                                                                              | Ja                      |
| `check:compression-budget`   | Budget för komprimeringsprestanda — minimikraven för tokenbesparingar per motor får inte försämras                                                              | Ja                      |
| `check:type-coverage`        | Spärrhaken för procentandel typad kod (`type-coverage`) försämras inte; ersätter till stor del `typecheck:noimplicit:core`                                      | Ja                      |

### Jobb: `codeql-scan` och `codeql-admission`

`codeql-scan` producerar alla konfigurerade analyskategorier. När jobbet har lyckats validerar `codeql-admission` dess exakta uppladdningar och kandidatens varningsspärr. Båda är obligatoriska beroenden till `Gate / CI`, även för kandidater som bara ändrar dokumentation. Kraven på administrativ aktivering och canary-test beskrivs under ”CodeQL-spärr” nedan.

| Skript                 | Validerar                                                                                                                                                                                        | Blockerande |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `check:codeql-ratchet` | Kandidatens ref/SHA och alla konfigurerade analyskategorier måste vara aktuella före varningsspärren; saknade bevis blockerar. Det globala inventariet förblir separat — se ”CodeQL-spärr” nedan | Ja          |

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

| Skript                         | Validerar                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Blockerande                                                                                                              |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `check:docs-all`               | Metagrind som kör de 7 delgrindarna nedan sekventiellt                                                                                                                                                                                                                                                                                                                                                                                                                            | Ja                                                                                                                       |
| ↳ `check:docs-sync`            | Versionsöverensstämmelse mellan paket/OpenAPI/CHANGELOG, exakta `llm.txt`-speglar, avsnitts-/storleksinvarianter för översatt CHANGELOG och frånvaro av ersatta dokumentdubletter                                                                                                                                                                                                                                                                                                 | Ja                                                                                                                       |
| ↳ `check:docs-frontmatter`     | Kompilerade dokumentationssidor har giltiga frontmatter-titlar                                                                                                                                                                                                                                                                                                                                                                                                                    | Ja                                                                                                                       |
| ↳ `check:docs-counts`          | Antalsinvarianter med hög tillförlitlighet är strikta; heuristiska kontroller av filantal varnar bara om skriptet inte får `--strict` (CI-metagrinden skickar inte med flaggan)                                                                                                                                                                                                                                                                                                   | Strikt nivå blockerar; mjuk nivå är rådgivande                                                                           |
| ↳ `check:env-doc-sync`         | Läsning av miljövariabler i källkoden, `.env.example` och `docs/reference/ENVIRONMENT.md` överensstämmer efter att de uttryckliga ignore-, doc-only- och env-only-undantagslistorna tillämpats                                                                                                                                                                                                                                                                                    | Ja, utanför de dokumenterade undantagslistorna                                                                           |
| ↳ `check:deprecated-versions`  | Rapporterar potentiellt inaktuella versioner utanför säkra historiska sammanhang och gamla uppdateringsdatum, med undantag för ignorerade dokument                                                                                                                                                                                                                                                                                                                                | Rådgivande i nuvarande CI-konfiguration (`--strict` skickas inte med)                                                    |
| ↳ `check:doc-links`            | Interna markdown-länkar i dokumentationen leder till verkliga filer (formatet `[text]`/`(path)`)                                                                                                                                                                                                                                                                                                                                                                                  | Ja                                                                                                                       |
| ↳ `check:fabricated-docs`      | Rutter, miljövariabler, CLI-kommandon, hook-namn och filsökvägar som anges i dokumentationen finns i kodbasen. Hård grind via `--strict`; mjukt fel utan flaggan.                                                                                                                                                                                                                                                                                                                 | Ja (via `--strict` i CI)                                                                                                 |
| `check:cli-i18n`               | Använda CLI-nycklar för `t()` finns i `en`; `pt-BR` behåller alla avsnitt på toppnivå; `zh-CN` och `zh-TW` innehåller varje nyckel från `en`                                                                                                                                                                                                                                                                                                                                      | Ja                                                                                                                       |
| `check:openapi-coverage`       | OpenAPI-specifikationen täcker minst en spärrjusterad lägstanivå av verkliga rutter                                                                                                                                                                                                                                                                                                                                                                                               | Ja                                                                                                                       |
| `check:openapi-security-tiers` | Deklarerade `x-loopback-only`-/`x-always-protected`-annoteringar måste ha stöd i `routeGuard.ts`; parserfel och avvikelser i framåtkontrollen blockerar. Bakåtkontrollen av saknade `x-loopback-only` under prefix som endast är lokala varnar, och rutter som enbart definieras av mönster undantas från den bakåtkontrollen.                                                                                                                                                    | Parser-/framåtkontroller blockerar; bakåtkontrollen är rådgivande                                                        |
| `check:openapi-routes`         | Varje `/api...`-sökväg i `openapi.yaml` motsvarar en verklig rutt oberoende av parameternamn efter tillämpning av den motiverade undantagslistan `KNOWN_STALE_SPEC`; inaktuella poster i listan orsakar också fel                                                                                                                                                                                                                                                                 | Ja                                                                                                                       |
| `check:docs-symbols`           | Interna `/api/...`-URL-referenser i kanoniska dokument som inte är speglar motsvarar en verklig rutt eller ruttfamilj; proxy-/upstream-/platshållar-/filreferenser och motiverade `KNOWN_STALE_DOC_REFS`-poster undantas, och inaktuella poster i undantagslistan orsakar fel                                                                                                                                                                                                     | Ja                                                                                                                       |
| `i18n translation drift`       | Kontrollerar käll-/målhashar för kärndokument och översättningens ursprung. PR-jämförelse tillåter endast identiska ärvda fel; nya eller overifierade inkonsekvenser i källa, saknat mål, målhash, inaktuell översättning eller avsnittscache blockerar. Utanför PR-jämförelse blockerar fel i källa/saknat mål/målhash, medan inaktuella översättningar och inkonsekventa avsnittscachar förblir enbart varningar. En saknad avsnittscache i det gamla formatet är inte ett fel. | Ny/overifierad PR-avvikelse blockerar; identisk ärvd avvikelse är enbart en varning; regler utanför PR beror på feltypen |

De tolv README-SVG:erna under `docs/diagrams/` genereras (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` regenererar alla). Var och en har ett enhetstest för bytejämförelse
(`tests/unit/docs/readme-*-svg.test.ts`, jobbet `test-unit`) som misslyckas när den committade filen är inaktuell, och `check:docs-counts` läser kanoniska tal från deras `<text>`-noder — därför ser outlining-steget till att varje outlinead sträng i filen finns kvar som osynlig `<text>`. Kontrollen av SVG-kanoniska tal läser filerna som anges i
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, samt `public/images/tier-flow-dark.svg` och `tier-flow-light.svg`;
påståendena om free-forever, catalog-entry, recurring-pool och scoring-factors läser också
`promise-pillars.svg`, `free-tier-budget.svg` och `strategies-grid.svg`. `free-tier-budget.svg`
hämtar sina siffror från den aktiva katalogladdaren, så en ändring av `FREE_MODEL_BUDGETS` eller av
ett leverantörsvisningsnamn gör CI rött tills filen har regenererats.

### Jobb: `i18n-ui-coverage`

| Skript                             | Validerar                                                                                                                                                                                                 | Blockerande     |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (infogat) | Täckningen för UI-i18n-nycklar är ≥ 65 %                                                                                                                                                                  | Ja              |
| `check-ui-value-drift` (infogat)   | Ett omskrivet engelskt **värde** lämnar inte kvar någon inaktuell översättning                                                                                                                            | Ja              |
| `check-new-key-coverage` (infogat) | En **ny** engelsk nyckel är översatt i varje språkversion — en `__MISSING__:`-markör avvisas                                                                                                              | Ja              |
| `check-translation-ratio`          | Andelen riktiga översättningar per språkversion (identiska med engelskan/platshållare/saknade löv utanför tillåtelselistan) får inte överstiga `config/quality/i18n-translation-baseline.json` + marginal | **Blockerande** |

Kräver `fetch-depth: 0` — kontrollen för värdeavvikelse jämför `en.json` med sammanslagningsbasen.

#### `check-ui-value-drift` — grind för inaktuella översättningar

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

Spärrarna för värdedrift och nya nycklar delar en oföränderlig jämförelse från
`scripts/i18n/resolve-ui-diff-base.mjs`. Arbetsflödet skickar samma bas-, bastopp- och
kandidat-SHA-värden till båda kontrollerna. Körningar för PR/byte av målgren, push och merge-grupp använder sin
händelsekontext. Vid manuell körning för en kandidatgren krävs dess exakta öppna PR eller den uttryckliga
indatan `i18n_base_sha`. Manuell eller schemalagd observation av `main` eller `release/vX.Y.Z`
utan denna indata jämför den senaste committen med dess första förälder; det är inte en granskning av
all nedärvd översättningsskuld. Lokal körning kräver en uttrycklig jämförelsebas,
exempelvis kommandot `BASE_REF` ovan.

Saknad eller tvetydig jämförelsekontext, en oläsbar eller ogiltig obligatorisk katalog och
en ändrad kandidat ger `INCOMPLETE` med slutkod **2**, även i varningsläge.
Kataloger läses med `scripts/i18n/read-ui-catalog.mjs`; läsfel ersätts inte
med tomma objekt. Varken en otillgänglig bas eller ofullständig indata resulterar i PASS.

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

Kräver klassificeringsjobbet `changes`. Tillämpliga matrisdelar blockerar sammanslagning vid fel.

| Svit             | Validerar                                                   | Blockerande                                                                                                      |
| ---------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-server (110 verktyg), autoCombo, cache — vitest-körning | Ja                                                                                                               |
| `test:vitest:ui` | UI-komponenttester — vitest-körning                         | **Blockerande** — befintliga fel exkluderas uttryckligen i `vitest.config.ts`; nya fel gör att jobbet misslyckas |

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
  oskyldig PR röd; avvikelsen spåras för korrigering vid versionsavstämningen och övervakas av
  marginaljobbet.

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

### CodeQL ratchet: kandidatinträde och inventering av förvar

CI äger kandidat CodeQL antagning genom en explicit beroendekedja: `codeql-scan` anropar den fyraspråkiga matrisen i `codeql.yml`, sedan kör `codeql-admission` `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` kräver båda resultaten. Kvalitet behåller sina egna numeriska kontroller men frågar inte efter skannern innan producenten är klar; Enbart `Gate / Quality` är inte komplett kandidatantagning. CodeQL förblir obligatoriskt på kandidater endast för dokument.

Policyn i `config/quality/codeql-admission-policy.json` väljer Actions, C/C++, JavaScript/TypeScript och Python, query suite default, remote hot model och build mode inga. Producer preflight avvisar en väntande aktiveringspost och förgrenar sig utanför den explicita mållistan. De aktuella målen är huvud- och release/v3.8.54. kontraktstester jämför denna ändliga lista och underhållstryckutlösaren med paketversionen; nästa version behöver ses över onboarding. CI:s befintliga PR utlösare med bredare utgåva bibehålls, men ett icke-ombordat mål rapporterar HOLD före extraktion snarare än att få en omättad PASS.

Varje matrisjobb registrerar dess faktiska SARIF uppladdning ID, språk, kategori, körning och försök, uppringarens arbetsflödesidentitet, händelse ref/head/base/merge SHA och policyhash. Det beroende jobbet laddar bara ned den här körningens kvitton och validerar artefaktsammandrag. Det kräver alla fyra kategorierna, en framgångsrik producent och genomförd bearbetning av varje exakt uppladdning. Den använder API:s sarif_id-filter, inte den senaste analysen som hittats på en gren. Partiella repriser kan återanvända framgångsrika kategorier från ett tidigare försök av samma körning och kandidat, vilket bevarar det producerande försöket; en misslyckad nuvarande producent kan inte återanvända tidigare gröna bevis.

CodeQL -åtgärden väntar på bearbetning, men dess fästa implementering kan varna och fortsätta efter ett statusavläsningsfel eller uttömd väntan. Antagning verifierar därför behandlingen igen. Saknade kategorier, väntande bearbetning, misslyckade eller avbrutna jobb, inaktuell identitet, ofullständig paginering eller otillgänglig APIs producerar HOLD och avslutar 2. Ingen fast väntan på ett oberoende skannerarbetsflöde kvarstår. En osannad PR kan inte passera eftersom en varningsfråga returnerade 0. Ett uppmätt antal över `metrics.codeqlAlerts.value` avslutar 1; baslinjen höjs inte för att absorbera en annan grens varningar. [Uppladdningsstatus och analysuppslag](https://docs.github.com/en/rest/code-scanning/code-scanning).

Kvittoposterna laddar upp och analyserar IDs, kategorier, verktygsversioner, ref/SHA, baslinje och varningsnummer. SARIF identity/result antal, minsta regelräkning och exakta varningsinstanser förblir obligatoriska. PR/analysis identiteter kontrolleras igen innan de accepteras. Dessa kontroller upprättar konfigurerad kategoritäckning, inte en inventering av varje extraherad källfil. C/C++ no-build-extraktion inkluderar inte kod som genereras under ett projektbygge. Källuteslutningar behöver fortfarande granskas, och bidragsgivares tillskrivning behöver jämförbara exakta bevis.

`codeql-maintenance.yml` tillhandahåller push-skanningar med aktiv frisättning och veckoschemat utan att duplicera PR/main -producenter. `nightly-codeql-inventory.yml` håller den förvarsomfattande baslinjen separat, med `--strict-measurement` och ett fel när mätning inte är tillgänglig. Den lokala arvsamlarens graciösa hoppa över är inte kandidatinträde. Åtstramning förblir en explicit `--update` efter en verifierad lägre global räkning.

Det avancerade arbetsflödet får inte publiceras medan standardinställningen är konfigurerad: GitHub avvisar den kombinationen. Dess versionspolicy förblir vilande tills den granskade administrativa övergången läses tillbaka. Före publicering stiftar en operatör förråd, head/base/tree, policy/patch/rollback hashar och observerat inställningstillstånd; `node scripts/quality/codeql-producer.mjs verify-admin-readback` kontrollerar de levererade förväntade och faktiska JSON posterna. Detta är ett tekniskt skydd, inte operatörsgodkännande eller en ersättning för att hämta färska återläsningar. PR tokenet begär aldrig administrationsåtkomst. Utrullning och eventuella skannerändringar kräver separat återläsning plus äkta PR, gaffel- och sammanslagningsgruppkompatibilitetsbevis.

Forks använder värddrivna löpare, utcheckning utan ihärdiga referenser, inget install/build projekt i producenten och inga ärvda förvarshemligheter. GitHub stöder SARIF uppladdning för pull_request-händelsen med dess reducerade gaffeltoken; godkännande av förstagångsbidrag förblir GitHub policy. Använd aldrig pull_request_target för att köra otillförlitlig kod. Bekräfta faktiska tokenbehörigheter, analys_nyckel och alla kategorimiljöer i den kontrollerade kanariefågeln innan du betraktar migreringen som slutförd. [Regler för gaffeluppladdning](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [motstridiga inställningslägen](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Uppsägningar är operatörens samtal (Hard Rule #14)** — avvisar aldrig en CodeQL varning utan att anteckna den tekniska motiveringen i avvisningskommentaren: `won't fix` för ett uppströmsprotokollkrav, `used in tests` för en testfixtur, `false positive` för en desinficering CodeQL inte kan se (prejudikat: `docs/security/ERROR_SANITIZATION.md`).

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
2. Lägg till `"check:<name>": "node scripts/check/check-<name>.mjs"` i `package.json` och
   synkronisera aliaset och dess exakta kommando i `config/quality/gate-manifest.json`.
   Tillämpa samma synkronisering när du ändrar eller tar bort ett befintligt valideringsalias.
   Kör `npm run check:gate-manifest`; pre-commit-hooken och CI:s ändringsklassificering
   upprätthåller detta kontrakt.
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

**Också odokumenterade ovan** (rådgivande, låg signal): jobbet `docs-lint` (markdownlint + Vale, hela jobbet med `continue-on-error`) och de fristående skannerarbetsflödena `semgrep.yml` / `scorecard.yml`. CodeQL har nu obligatoriska producent- och godkännandejobb under `Gate / CI`, med aktiveringskraven som beskrivs ovan. `semgrepFindings: 0` finns i `quality-baseline.json` men är inte kopplad till en blockerande spärr i `ci.yml` — mätvärdet är för närvarande föräldralöst.

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
- `check:pr-evidence` (blockerande, söker med grep i PR-brödtext) — hög risk för falska positiva resultat; om den tas bort försvagas genomdrivningen av den hårda regeln nr #18, så detta är ett genuint policybeslut.
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
