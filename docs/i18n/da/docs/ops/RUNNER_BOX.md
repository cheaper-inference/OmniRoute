# Self-Hosted Runner Box Operations (.113 pool) (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Den selvhostede pulje kører på **.113**-maskinen (`tomni-proxmox-113`). Siden 2026-10-18 har hver
OmniRoute-runner haft **én rolle**, én label og et hukommelses-/CPU-budget dimensioneret efter den målte
arbejdsbelastning. Turbopack-pladsen får de ressourcer, buildet kræver; de øvrige pladser er dimensioneret efter deres
målte spidsbelastninger. Maskinen overbooker kun, når et Turbopack-build falder sammen med et Release-Green-
webpack-build og et lint-job; værtens swap (16 GB) absorberer dette, og fordi pull request-Builds kører
hostet, er Turbopack-pladsen inaktiv det meste af tiden:

| runner               | label                | rolle                                                                                                                                               | `MemoryHigh` / `MemoryMax` | `CPUQuota` |
| -------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------- |
| `omniroute-113-5`    | `omni-build`         | Turbopack-builds: `ci.yml` `Build` (kun push/dispatch), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, det natlige a11y-build | 56 GB / 60 GB (swap 0)     | 1600 %     |
| `omniroute-113-6`    | `omni-release`       | Release-Green (`release-green` + `main-green`), webpack-build                                                                                       | 20 GB / 24 GB (swap 4 GB)  | 800 %      |
| `omniroute-113-2`    | `omni-light`         | natlige kørsler (Schemathesis, promptfoo, garak, k6) og `quality.yml` `lint-guard`                                                                  | 12 GB / 16 GB (swap 4 GB)  | 600 %      |
| `omniroute-113`      | `omni-light`         | samme pulje som ovenfor                                                                                                                             | 8 GB / 12 GB               | 400 %      |
| OmniHeuris, OmniMind | (deres repositories) | kun Dependabot (spidsbelastning på 155 MB hver, 2026-10-18)                                                                                         | 4 GB / 6 GB                | 200 % hver |

Målt 2026-10-18:

| ressource | værdi                           | hvad det betyder for planlægning                                                                                                                                                                                                                                                                                                                                         |
| --------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| RAM / CPU | **78 GB / 32 kerner**           | et Turbopack-produktionsbuild toppede på 49 GB uden begrænsning (`tests/unit/ci-build-bundler-webpack.test.ts`); på Next 16.3.8 bruger kompileringsfasen alene ~40 GB (36 GB RSS i `next-build` plus 17 loader-workers på 3 GB, målt 2026-10-18); et webpack-build bruger ~14–16 GB. Ét Turbopack-build + ét webpack-build kan køre sammen; to Turbopack-builds kan ikke |
| swap      | 16 GB                           | `omniroute-113-5` kører med swap slået fra (`MemorySwapMax=0`), så et løbsk build stoppes ved sin grænse i stedet for at få maskinen til at swappe                                                                                                                                                                                                                       |
| `/tmp`    | **12 GB tmpfs = RAM**           | alt, der placeres der, bruger hukommelse; rester ryddes efter 3 timer                                                                                                                                                                                                                                                                                                    |
| CPU       | load 60 på 32 kerner observeret | før kvoterne fratog ét Turbopack-build (~1166 % CPU) plus en coverage-suite på samme maskine de øvrige lytteres heartbeats de nødvendige ressourcer (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                |
| runners   | **6 lyttere**                   | 4 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-3/-4/-7/-8` er deaktiveret (`systemctl enable --now` aktiverer én igen)                                                                                                                                                                                                                                              |

Grænserne findes i hver units `/etc/systemd/system/actions.runner.<…>.service.d/override.conf`
(tidligere værdier er bevaret som `override.conf.bak-20261018`) og blev anvendt live med
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — uden genstart, så ingen
kørende jobs blev berørt. Labels ændres via runners-API'et
(`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), også live.

## Installer oprydderen (én gang på maskinen)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): hvert 30. minut, log til /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` er påkrævet: Oprydderen bekræfter, at en sti er inaktiv, med ét øjebliksbillede af åbne
filer, før den fjerner stien, og uden værktøjet fjerner den intet og oplyser dette
(exit 1). Afprøv først enhver ændring med `--dry-run` — den udskriver præcis, hvad den ville
gøre, og ændrer intet.

Dette gør den ved hver kørsel: rydder op i vores egne efterladenskaber (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) efter **3 t. på tmpfs** og 24 t. på diskens
`_work/_temp`; afslutter en `next-build`, der er ældre end 75 min. (intet job kører så længe — den
2026-08-27 kørte ét i 70 min., efter at GitHub havde erklæret jobbet tabt); fjerner 48 t. gamle
arbejdskopier for runners, hvis enhed er **stoppet**; advarer ved disk ≥ 85 %, hukommelses-PSI
`full/avg60` ≥ 10 % og flere listeners end `MAX_ACTIVE_RUNNERS` (med en
opdeling i omniroute/andre). Exit 1 = kræver opmærksomhed; læs loggen.

75-minuttersreglen fanger ikke et build, hvis job GitHub allerede har opgivet. Når
`Runner.Listener` ikke kan forny sit job, viser `_diag/Runner_*.log`
`POST request to …/renewjob timed out after 100 seconds`, API'et rapporterer jobbet som `completed`
(fejlet) cirka ti minutter efter den seneste vellykkede fornyelse, og `next-build` fortsætter med at køre
uden et tilknyttet job (2026-10-18: Build for #17066 fejlede kl. 19:43, og dets build
optog stadig 40 GB fem minutter senere). Bekræft ref'en i den nyeste `_diag/Worker_*.log`, og
send derefter kun SIGTERM til buildtræet efter PID — `next-build`, `npm run build`, `build-next-isolated.mjs` og
`_work`-workerne. Rør aldrig `Runner.Listener`, `RunnerService.js` eller `Runner.Worker`: Workeren
rapporterer jobbet som annulleret, og listeneren går selv online igen.

## Runner-enheder: KillMode

Runnerens standardindstilling `KillMode=process` lader `Runner.Worker → npm → next-build`
fortsætte med at køre, når en enhed stoppes eller genstartes — et forældreløst build fortsætter med at bruge RAM og
CPU uden et tilknyttet job. Hver OmniRoute-enhed har en drop-in-fil
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
med `KillMode=mixed`: SIGTERM sendes først til listeneren og derefter SIGKILL til hele cgroup'en ved
`TimeoutStop`. Den træder i kraft ved enhedens næste genstart — genstart **én runner ad
gangen, og kun når den er inaktiv**, med inaktivitetskontrollen og genstarten i samme kommando.

## Driftsregler

- **Ét Turbopack-build ad gangen — håndhævet via label.** Alle jobs, der kører et komplet Turbopack-
  `next build`, er målrettet `[self-hosted, omni-build]`, og kun **`omniroute-113-5`** har dette
  label: `ci.yml` `Build`, `npm-publish.yml` `publish`, `nightly-v4-build`, `preview-artifact`,
  det natlige a11y-build (#16853) og `docker-publish.yml` **amd64** (webpack i BuildKit —
  Turbopack gik i panik dér, kørsel 33253576569). Docker-delen for arm64 forbliver på `ubuntu-24.04-arm`.
  `docker-publish` amd64 deler concurrency-gruppen `heavy-build-main` med `ci.yml` `Build`
  (`cancel-in-progress: false`). Docker Engine skal være på `omniroute-113-5`. Der er ikke plads
  til endnu en Turbopack-plads inden for 78 GB (2 × 33–37 GB plus resten af maskinen); endnu en
  plads er kun sikker til webpack-builds.
- **Builds for pull requests kører hostet (2026-10-18).** `ci.yml` `Build` når kun `omni-build` ved
  `push` og `workflow_dispatch`; alle `pull_request`-builds (fra eget repository eller forks) og
  `merge_group`-builds kører på `ubuntu-latest` med webpack. Da alle PR'er fra eget repository
  blev sendt til pladsen, optog et Turbopack-build den i 29–58 min., 18 builds stod i kø i op til
  18 timer, og releasegrenens eget push-build fik pladsen én gang ud af 40 jobs. Hostet tager det
  samme PR-build 8–12 min. ved siden af PR'ens øvrige jobs. Turbopack, den bundler, som
  `npm-publish` udgiver, bliver fortsat afprøvet på releasegrenen via standardgrenens natlige
  a11y-build (04:41 UTC), via alle push- eller dispatch-builds, der når pladsen, og via
  `npm-publish` selv. `tests/unit/build/heavy-build-queue.test.ts` fastholder betingelsen med fire
  klausuler.
- **Dimensionér aldrig Turbopack-pladsen lavere end det målte behov.** Den 2026-10-18 kl. 18:06 blev
  pladsen reduceret fra 56G/60G til 40G/44G for at gøre plads til `omni-release`. Kompileringsfasen
  lå ved `MemoryHigh` under hele kørslen (memory PSI `full` 30–43 %), og `Runner.Listener`, som
  deler cgroup'en, kunne ikke forny sit job. Ejerens 56G/60G fra 2026-10-17 blev gendannet samme
  dag. Under denne værdi fejler buildet ikke; det går i thrashing, og jobbet går tabt.
- **Release-Green har sin egen plads (2026-10-18).** Indtil da kørte begge Release-Green-valideringer
  på `omni-build`: ved hvert push (~10/time, 97 ud af 100 push-kørsler annulleret midt i arbejdet
  på én dag) og tre komplette gennemløb på ~2 timer om dagen (gennemløbet kl. 05:29 ventede 6 timer
  på pladsen) — den enkelte build-plads var overbooket flere gange, og PR-builds fra eget
  repository ventede i timevis. `release-green` og `main-green` er nu målrettet `omni-release`
  (kun `omniroute-113-6`) med `OMNIROUTE_USE_TURBOPACK=0`, og en påbegyndt kørsel annulleres ikke
  længere af et nyere push (den ventende plads slår stadig stormen sammen).
  `tests/unit/build/runner-capacity-routing.test.ts` fastholder routingen, webpack-skiftet og, at
  intet på `omni-release` bygger med Turbopack.
- **Let pulje: `omni-light`.** `omniroute-113` og `omniroute-113-2` kører de natlige jobs, der kræver
  et backend-only `next build` (~5–6 GB; webpack), samt `quality.yml` `lint-guard`.
  `omniroute-113` havde `MemoryHigh=4G` indtil 2026-10-18 — promptfoo-buildet måtte genvinde
  hukommelse under hele den 54 minutter lange kørsel dér; 8 GB fjerner begrænsningen.
- **Færre listeners med vilje.** Fire OmniRoute-enheder blev deaktiveret den 2026-08-29 — hver ekstra
  listener er endnu en tenant i ovenstående hukommelsesbudget. Janitorens loft er 6
  (`MAX_ACTIVE_RUNNERS=6` i cron): den tæller alle `Runner.Listener` på maskinen, og OmniHeuris +
  OmniMind føjer to til vores fire.
- **Ryd aldrig `/tmp` eller `_work` manuelt, mens en runner er optaget.** En
  kontrollér-og-slet-procedure med en pause mellem de to trin var årsagen til, at et aktivt
  Build-job mistede sit `_work` den 2026-08-27. Janitoren udfører kontrollen og fjernelsen i ét
  trin; lad den gøre det.
- Hvis en runner stoppes midt i et job, annulleres jobbet (observeret direkte): Brug kun
  `systemctl stop`, når dens listener ikke har nogen underordnet `Runner.Worker`-proces — og gør
  det med én kommando.
- Workflows må ikke parkere artefakter i `/tmp` (det er RAM). Download til
  `$RUNNER_TEMP` (på disk, pr. runner) — det tog 27–32 minutter for `next-build`-artefaktet på
  1,3 GB at lande på tmpfs og 2 minutter at uploade det fra disk.
- `.15`-VPS'en er kun til homologering — den kører aldrig CI-runners.

## Hostet spor (GitHub-hostede runners)

Kontoen er på **Pro**-abonnementet: **40 samtidige hostede jobs**, som deles af alle PR-kontroller,
alle push-udløste workflows og CodeQL's standardopsætning. Målt 2026-10-18 under en
mergekampagne (~10 merges/time på `release/v3.8.52`): **2.500 workflowkørsler oprettet på
24 timer**, 44 pushes til grenen på 6 timer, **106 hostede jobs i kø**, mens PR-kontroller ventede i
timevis, og PR'er blev merget uden dem. Ni workflows blev udløst ved hvert push til grenen:

| pr. push til `release/v*`                   | hostede jobs | resultat under stormen                                         | siden 2026-10-18                                                            |
| ------------------------------------------- | -----------: | -------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `ci.yml` (fuld matrix)                      |    op til 30 | annulleret af næste push, 24 ud af 24 på én dag                | startes ikke ved pushes til `release/**` (PR-kørsel + Release-Green)        |
| `quality.yml`                               |           ~6 | annulleret, 23 ud af 23                                        | startes ikke ved pushes til `release/**`                                    |
| `Release-Green` `--quick`                   |            0 | kørte på `omni-build`, 97 ud af 100 annulleret                 | `omni-release`-plads, annulleres aldrig, afventende kørsel slås sammen      |
| `Lock released branch`, `OpenSSF Scorecard` |            2 | én kørsel i kø pr. push                                        | én kørsel pr. ref (`tests/unit/build/hosted-lane-concurrency.test.ts`)      |
| `Release acceptance` (skyggerapport)        |            1 | ét hostet `npm ci` pr. push, aldrig annulleret                 | uændret — kandidat til et `paths:`-filter                                   |
| `Publish to Docker Hub` → `Deploy to VPS`   |            2 | annulleret pr. push; amd64-delen konkurrerer på `omni-build`   | uændret — ejerens implementeringskanal                                      |
| CodeQL-standardopsætning (`dynamic`)        |            4 | `javascript-typescript`, `actions`, `c-cpp`, `python` pr. push | uændret — Indstillinger → Kodesikkerhed; `c-cpp`/`python` scanner intet her |

`tests/unit/build/push-storm-diet.test.ts` fastholder den push-trigger i `ci.yml` og
`quality.yml`, som kun gælder for `main`. Bivirkning: Codecov modtager ikke længere en basisupload
pr. release-push (trinnet er informativt og har `continue-on-error`); dækningskontrollen i
repositoryet og PR-kommentaren påvirkes ikke.

**Mere selvhostet kapacitet løser ikke køen for hostede jobs.** Devboxen
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) kunne hoste en runner, men agentsessionerne holder
allerede dens belastning på 20–26, agentcontaineren har ingen Docker-daemon, og det mættede spor
er det hostede. `.113`-maskinen havde 71 GB ledig plads og en belastning på 5–8 på samme
tidspunkt; dens begrænsning er hukommelsesbudgettet pr. listener ovenfor (maksimalt 6 listeners),
ikke CPU. De resterende muligheder er procesmæssige: før kampagnens PR'er igennem Mergify-køen
(`label=queue`, batches deler én `merge_group`-CI-kørsel i stedet for én kørsel pr. PR plus én
pr. push), reducer sprogene i CodeQL's standardopsætning, og filtrer `release-acceptance.yml`
efter de filer, den læser.
