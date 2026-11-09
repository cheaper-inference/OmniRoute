# Self-Hosted Runner Box Operations (.113 pool) (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Den självhostade poolen körs på **.113**-maskinen (`tomni-proxmox-113`). Sedan 2026-10-18 har varje
OmniRoute-runner **en roll**, en etikett och en minnes-/CPU-budget dimensionerad efter den uppmätta
arbetsbelastningen. Turbopack-platsen får de resurser som bygget behöver; de andra platserna är dimensionerade
efter sina uppmätta toppar. Maskinen överallokerar endast när ett Turbopack-bygge sammanfaller med ett
Release-Green-webpack-bygge och ett lint-jobb; värdens swap (16 GB) absorberar detta, och eftersom byggen för
pull requests körs hostat är Turbopack-platsen inaktiv för det mesta:

| runner               | etikett        | roll                                                                                                                                                     | `MemoryHigh` / `MemoryMax` | `CPUQuota`    |
| -------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------- |
| `omniroute-113-5`    | `omni-build`   | Turbopack-byggen: `ci.yml` `Build` (endast push/dispatch), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, det nattliga a11y-bygget | 56 GB / 60 GB (swap 0)     | 1600 %        |
| `omniroute-113-6`    | `omni-release` | Release-Green (`release-green` + `main-green`), webpack-bygge                                                                                            | 20 GB / 24 GB (swap 4 GB)  | 800 %         |
| `omniroute-113-2`    | `omni-light`   | nattliga jobb (Schemathesis, promptfoo, garak, k6) och `quality.yml` `lint-guard`                                                                        | 12 GB / 16 GB (swap 4 GB)  | 600 %         |
| `omniroute-113`      | `omni-light`   | samma pool som ovan                                                                                                                                      | 8 GB / 12 GB               | 400 %         |
| OmniHeuris, OmniMind | (deras repos)  | endast Dependabot (topp på 155 MB vardera, 2026-10-18)                                                                                                   | 4 GB / 6 GB                | 200 % vardera |

Uppmätt 2026-10-18:

| resurs    | värde                        | vad det innebär för schemaläggningen                                                                                                                                                                                                                                                                                                                                                            |
| --------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **78 GB / 32 kärnor**        | ett Turbopack-produktionsbygge nådde en topp på 49 GB utan begränsning (`tests/unit/ci-build-bundler-webpack.test.ts`); i Next 16.3.8 håller enbart kompileringsfasen kvar ~40 GB (36 GB RSS i `next-build` plus 17 loader-workers på 3 GB, uppmätt 2026-10-18); ett webpack-bygge använder ~14–16 GB. Ett Turbopack- och ett webpack-bygge ryms tillsammans; två Turbopack-byggen gör det inte |
| swap      | 16 GB                        | `omniroute-113-5` körs med swap avstängt (`MemorySwapMax=0`), så ett skenande bygge stoppas vid sin gräns i stället för att få maskinen att använda swap                                                                                                                                                                                                                                        |
| `/tmp`    | **12 GB tmpfs = RAM**        | allt som placeras där använder minne; kvarlämnade filer rensas efter 3 h                                                                                                                                                                                                                                                                                                                        |
| CPU       | load 60 på 32 kärnor uppmätt | före kvoterna gjorde ett Turbopack-bygge (~1166 % CPU) tillsammans med en coverage-svit på samma maskin att de andra lyssnarnas hjärtslag inte fick resurser (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                              |
| runners   | **7 lyssnare** (2026-10-28)  | 5 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-7` bär även `omni-build`; `omniroute-113-3/-4/-8` togs bort från repot (2026-10-28)                                                                                                                                                                                                                                                         |

Gränserna finns i varje enhets `/etc/systemd/system/actions.runner.<…>.service.d/override.conf`
(tidigare värden sparades som `override.conf.bak-20261018`) och tillämpades live med
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — ingen omstart, så inget
pågående jobb påverkades. Etiketterna ändras också live via runners-API:t (`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`).

## Installera rensningsskriptet (en gång, på maskinen)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): var 30:e minut, logga till /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` krävs: rensningsskriptet verifierar att en sökväg är inaktiv med en ögonblicksbild av öppna
filer innan den tas bort, och utan verktyget tar det inte bort någonting och meddelar detta
(exit 1). Prova först alla ändringar med `--dry-run` — det skriver ut exakt vad det skulle
göra utan att ändra någonting.

Vad det gör vid varje körning: rensar våra egna kvarlämnade filer (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) efter **3 timmar på tmpfs** och 24 timmar på diskens
`_work/_temp`; avslutar en `next-build` som är äldre än 75 minuter (inget jobb körs så länge — den
2026-08-27 kördes ett jobb i 70 minuter efter att GitHub hade förklarat jobbet förlorat); rensar
48 timmar gamla utcheckningar för runners vars enhet är **stoppad**; varnar vid diskanvändning
≥ 85 %, minnes-PSI `full/avg60` ≥ 10 % och fler lyssnare än `MAX_ACTIVE_RUNNERS` (med en
uppdelning mellan omniroute/övriga). Exit 1 = åtgärd krävs; läs loggen.

75-minutersregeln fångar inte ett bygge vars jobb GitHub redan har gett upp. När
`Runner.Listener` inte kan förnya sitt jobb visar `_diag/Runner_*.log`
`POST request to …/renewjob timed out after 100 seconds`, API:et rapporterar jobbet som `completed`
(misslyckat) ungefär tio minuter efter den senaste lyckade förnyelsen, och `next-build` fortsätter köras
utan något anslutet jobb (2026-10-18: bygget för #17066 markerades som misslyckat 19:43 och höll
fortfarande 40 GB fem minuter senare). Bekräfta referensen i den senaste `_diag/Worker_*.log` och
skicka sedan SIGTERM endast till byggets processträd via PID — `next-build`, `npm run build`, `build-next-isolated.mjs` och
`_work`-processerna. Rör aldrig `Runner.Listener`, `RunnerService.js` eller `Runner.Worker`: worker-processen
rapporterar jobbet som avbrutet och lyssnaren går tillbaka online av sig själv.

## Runner-enheter: KillMode

Runner-processens standardinställning `KillMode=process` lämnar `Runner.Worker → npm → next-build`
vid liv när en enhet stoppas eller startas om — ett föräldralöst bygge fortsätter förbruka RAM och
CPU utan något anslutet jobb. Varje OmniRoute-enhet har en drop-in-konfiguration
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
med `KillMode=mixed`: SIGTERM skickas först till lyssnaren och därefter SIGKILL till hela cgroup vid
`TimeoutStop`. Den börjar gälla nästa gång enheten startas om — starta om **en runner i
taget, endast när den är inaktiv**, med inaktivitetskontrollen och omstarten i samma kommando.

## Driftregler

- **Ett Turbopack-bygge åt gången — framtvingat med etikett.** Varje jobb som kör ett fullständigt Turbopack-
  `next build` riktas mot `[self-hosted, omni-build]`, och endast **`omniroute-113-5`** har den
  etiketten: `ci.yml` `Build`, `npm-publish.yml` `publish`, `nightly-v4-build`, `preview-artifact`,
  det nattliga a11y-bygget (#16853) och `docker-publish.yml` **amd64** (webpack inuti BuildKit —
  Turbopack fick panik där, körning 33253576569). Docker-steget för arm64 ligger kvar på `ubuntu-24.04-arm`.
  `docker-publish` amd64 delar samtidighetsgruppen `heavy-build-main` med `ci.yml` `Build`
  (`cancel-in-progress: false`). Docker Engine måste finnas på `omniroute-113-5`. En andra Turbopack-
  plats ryms inte inom 78 GB (2 × 33–37 GB plus resten av servern); en andra plats är endast säker för
  webpack-byggen.
- **Byggen för pull requests körs på värdbaserade körmiljöer (2026-10-18).** `ci.yml` `Build` når `omni-build` endast vid
  `push` och `workflow_dispatch`; varje `pull_request` (från det egna ursprunget eller en fork) och `merge_group`-bygge
  körs på `ubuntu-latest` med webpack. När varje PR från det egna ursprunget dirigerades till platsen höll ett Turbopack-
  bygge den upptagen i 29–58 min, 18 byggen köade i upp till 18 h och releasegrenens eget push-bygge
  fick platsen en gång på 40 jobb. På en värdbaserad körmiljö tar samma PR-bygge 8–12 min tillsammans med PR:ens övriga
  jobb. Turbopack, paketeraren som `npm-publish` levererar, testas fortfarande på releasegrenen genom
  det nattliga a11y-bygget av standardgrenen (04:41 UTC), genom varje push- eller dispatch-bygge som
  når platsen samt genom `npm-publish` självt. `tests/unit/build/heavy-build-queue.test.ts`
  låser villkoret med fyra klausuler.
- **Dimensionera aldrig Turbopack-platsen under dess uppmätta behov.** Den 2026-10-18 kl. 18:06
  sänktes platsen från 56G/60G till 40G/44G för att ge utrymme åt `omni-release`. Kompileringsfasen låg vid
  `MemoryHigh` under hela körningen (minnes-PSI `full` 30–43 %), och `Runner.Listener`, som
  delar cgroup, kunde inte förnya sitt jobb. Ägarens 56G/60G från 2026-10-17 återställdes
  samma dag. Under det värdet misslyckas inte bygget; det överbelastar minnesväxlingen och jobbet går förlorat.
- **Release-Green har en egen plats (2026-10-18).** Fram till dess kördes båda Release-Green-valideringarna
  på `omni-build`: vid varje push (~10/timme, 97 av 100 push-körningar avbröts mitt under arbetet på en dag)
  och tre fullständiga svep på ~2 h per dag (svepet kl. 05:29 väntade 6 h på platsen) — den enda byggplatsen
  var överbelagd flera gånger om och PR-byggen från det egna ursprunget väntade i timmar.
  `release-green` och `main-green` riktas nu mot `omni-release` (endast `omniroute-113-6`) med
  `OMNIROUTE_USE_TURBOPACK=0`, och en startad körning avbryts inte längre av en nyare push (den
  väntande platsen slår fortfarande ihop anstormningen). `tests/unit/build/runner-capacity-routing.test.ts`
  låser routningen, webpack-växlingen och att ingenting på `omni-release` byggs med Turbopack.
- **Lättviktspool: `omni-light`.** `omniroute-113` och `omniroute-113-2` kör de nattliga jobben som behöver
  ett `next build` endast för backend (~5–6 GB; webpack) samt `quality.yml` `lint-guard`. `omniroute-113`
  hade `MemoryHigh=4G` fram till 2026-10-18 — promptfoo-bygget återtog minne under hela sin 54 minuter långa
  körning där; 8 GB eliminerar strypningen.
- **Färre lyssnare avsiktligt.** Fyra OmniRoute-enheter inaktiverades 2026-08-29 — varje extra
  lyssnare är ytterligare en konsument av minnesbudgeten ovan. Vaktmästarens tak är 8 (`MAX_ACTIVE_RUNNERS=8` i cron): den räknar
  varje `Runner.Listener` på servern, och OmniHeuris + OmniMind lägger till två utöver våra fem.
- **Unit- och Vitest-jobb stannar värdbaserade.** `ci.yml` skickar sina unit-shards och Vitest-jobbet till
  `[self-hosted, omni-ci]` endast när repovariabeln `vars.USE_VPS_TEST_RUNNER` är
  `true`, och då bara för `pull_request`-körningar från samma repo; forkar, `merge_group` och pushar
  stannar på `ubuntu-latest` (`tests/unit/vps-runner-variable-scope.test.ts`). Variabeln är
  `false`. Den 2026-10-28 tog tre `omni-ci`-lyssnare med 4 kärnor 250–270 s för `npm ci`, och varje
  unit-shard nådde jobbgränsen på 30 minuter, mot ~634 s för en värdbaserad shard, med serverns last på
  17–24. Lyssnarna togs bort. Slå inte på variabeln igen utan lyssnare dimensionerade för
  en unit-shard.
- **Rensa aldrig `/tmp` eller `_work` manuellt medan någon runner är upptagen.** En
  kontroll följd av borttagning med ett mellanrum mellan de två gjorde att ett aktivt byggjobb förlorade sin
  `_work` 2026-08-27. Vaktmästaren utför kontrollen och borttagningen i ett enda steg;
  låt den göra det.
- Att stoppa en runner mitt under ett jobb avbryter jobbet (observerat i drift): använd `systemctl stop` endast
  när dess lyssnare inte har någon underordnad `Runner.Worker`-process — och gör det i ett enda kommando.
- Arbetsflöden får inte placera artefakter i `/tmp` (det ligger i RAM). Ladda ned till
  `$RUNNER_TEMP` (på disk, per runner) — artefakten `next-build` på 1.3 GB tog 27–32
  minuter att landa på tmpfs och 2 minuter att ladda upp från disk.
- VPS:en `.15` är endast för homologering — den kör aldrig CI-runners.

## Värdbaserad kö (GitHub-värdbaserade körmiljöer)

Repot tillhör organisationen `cheaper-inference`, på **Team**-planen: **60
samtidiga värdbaserade jobb**, som delas av varje repo i organisationen, varje PR-kontroll,
varje arbetsflöde som utlöses av en push och CodeQL:s standardkonfiguration. Siffrorna nedan uppmättes på
**Pro**-planen (40 samtidiga värdbaserade jobb). Uppmätt 2026-10-18 under en
sammanslagningskampanj (~10 sammanslagningar/timme på `release/v3.8.52`): **2 500 arbetsflödeskörningar skapades under
24 timmar**, 44 pushar till grenen under 6 timmar, **106 värdbaserade jobb köades** medan PR-kontroller väntade i
timmar och PR:er slogs samman utan dem. Nio arbetsflöden utlöstes vid varje push till grenen:

| per push till `release/v*`                  | värdbaserade jobb | resultat under belastningstoppen                               | sedan 2026-10-18                                                          |
| ------------------------------------------- | ----------------: | -------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `ci.yml` (fullständig matris)               |       upp till 30 | avbröts av nästa push, 24 av 24 på en dag                      | startas inte vid pushar till `release/**` (PR-körning + Release-Green)    |
| `quality.yml`                               |                ~6 | avbröts, 23 av 23                                              | startas inte vid pushar till `release/**`                                 |
| `Release-Green` `--quick`                   |                 0 | kördes på `omni-build`, 97 av 100 avbröts                      | `omni-release`-plats, avbryts aldrig, väntande körningar slås ihop        |
| `Lock released branch`, `OpenSSF Scorecard` |                 2 | en köad körning per push                                       | en körning per ref (`tests/unit/build/hosted-lane-concurrency.test.ts`)   |
| `Release acceptance` (skuggrapport)         |                 1 | ett värdbaserat `npm ci` per push, avbröts aldrig              | oförändrat — kandidat för ett `paths:`-filter                             |
| `Publish to Docker Hub` → `Deploy to VPS`   |                 2 | avbröts per push; amd64-delen konkurrerar på `omni-build`      | oförändrat — ägarens distributionskanal                                   |
| CodeQL:s standardkonfiguration (`dynamic`)  |                 4 | `javascript-typescript`, `actions`, `c-cpp`, `python` per push | oförändrat — Settings → Code security; `c-cpp`/`python` skannar inget här |

`tests/unit/build/push-storm-diet.test.ts` låser push-utlösaren för enbart `main` i `ci.yml` och
`quality.yml`. Bieffekt: Codecov tar inte längre emot en basuppladdning per release-push (steget
är informativt och använder `continue-on-error`); täckningsgrinden i repot och PR-kommentaren
påverkas inte.

**Mer egenvärdbaserad kapacitet löser inte den värdbaserade kön.** Utvecklingsservern
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) skulle kunna vara värd för en körmiljö, men agentsessionerna
håller redan belastningen på 20–26, agentcontainern saknar en Docker-daemon och det är den
värdbaserade kön som är mättad. `.113`-servern hade 71 GB ledigt och en belastning på 5–8 vid samma
tidpunkt; dess begränsning är minnesbudgeten per lyssnare ovan (högst 6 lyssnare), inte processorn.
De återstående möjligheterna är processrelaterade: låt kampanjens PR:er gå genom Mergify-kön
(`label=queue`, batcher delar en enda `merge_group`-CI-körning i stället för en körning per PR plus
en per push), minska antalet språk i CodeQL:s standardkonfiguration och filtrera
`release-acceptance.yml` efter filerna som den läser.
