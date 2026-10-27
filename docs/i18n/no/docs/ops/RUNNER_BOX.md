# Self-Hosted Runner Box Operations (.113 pool) (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Den selvhostede poolen kjører på **.113**-boksen (`tomni-proxmox-113`). Siden 2026-10-18 har hver
OmniRoute-runner hatt **én rolle**, én etikett og et minne-/CPU-budsjett dimensjonert etter den målte
arbeidsbelastningen. Turbopack-plassen får det bygget trenger, mens de andre plassene er dimensjonert etter
de målte toppene. Boksen overallokerer bare når et Turbopack-bygg sammenfaller med et Release-Green-
webpack-bygg og en lint-jobb. Vertens swap (16 GB) absorberer dette, og fordi bygg for pull-forespørsler kjører
hostet, er Turbopack-plassen inaktiv mesteparten av tiden:

| runner               | etikett        | rolle                                                                                                                                               | `MemoryHigh` / `MemoryMax` | `CPUQuota` |
| -------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------- |
| `omniroute-113-5`    | `omni-build`   | Turbopack-bygg: `ci.yml` `Build` (kun push/dispatch), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, det nattlige a11y-bygget | 56 GB / 60 GB (swap 0)     | 1600 %     |
| `omniroute-113-6`    | `omni-release` | Release-Green (`release-green` + `main-green`), webpack-bygg                                                                                        | 20 GB / 24 GB (swap 4 GB)  | 800 %      |
| `omniroute-113-2`    | `omni-light`   | nattlige jobber (Schemathesis, promptfoo, garak, k6) og `quality.yml` `lint-guard`                                                                  | 12 GB / 16 GB (swap 4 GB)  | 600 %      |
| `omniroute-113`      | `omni-light`   | samme pool som ovenfor                                                                                                                              | 8 GB / 12 GB               | 400 %      |
| OmniHeuris, OmniMind | (deres repoer) | kun Dependabot (topp på 155 MB hver, 2026-10-18)                                                                                                    | 4 GB / 6 GB                | 200 % hver |

Målt 2026-10-18:

| ressurs   | verdi                                    | hva det betyr for planlegging                                                                                                                                                                                                                                                                                                                                                       |
| --------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **78 GB / 32 kjerner**                   | et Turbopack-produksjonsbygg nådde en topp på 49 GB uten begrensning (`tests/unit/ci-build-bundler-webpack.test.ts`); på Next 16.3.8 bruker kompileringsfasen alene ~40 GB (36 GB RSS i `next-build` pluss 17 loader-workers på 3 GB, målt 2026-10-18); et webpack-bygg bruker ~14–16 GB. Ett Turbopack-bygg + ett webpack-bygg får plass samtidig; to Turbopack-bygg gjør ikke det |
| swap      | 16 GB                                    | `omniroute-113-5` kjører med swap slått av (`MemorySwapMax=0`), slik at et løpsk bygg stoppes ved grensen i stedet for å få boksen til å bruke swap                                                                                                                                                                                                                                 |
| `/tmp`    | **12 GB tmpfs = RAM**                    | alt som plasseres der, bruker minne; gjenværende filer ryddes etter 3 t                                                                                                                                                                                                                                                                                                             |
| CPU       | belastning på 60 observert på 32 kjerner | før kvotene førte ett Turbopack-bygg (~1166 % CPU) pluss en dekningssuite på samme boks til at de andre lytternes livstegn ble sultet ut (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                                      |
| runnere   | **6 lyttere**                            | 4 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-3/-4/-7/-8` er deaktivert (`systemctl enable --now` aktiverer én igjen)                                                                                                                                                                                                                                                         |

Grensene ligger i hver enhets `/etc/systemd/system/actions.runner.<…>.service.d/override.conf`
(tidligere verdier er beholdt som `override.conf.bak-20261018`) og ble tatt i bruk direkte med
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — uten omstart, så ingen
kjørende jobb ble berørt. Etiketter endres gjennom runner-API-et
(`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), også direkte.

## Installer oppryddingsskriptet (én gang, på maskinen)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): hvert 30. minutt, logg til /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` er påkrevd: Oppryddingsskriptet bekrefter at en bane er inaktiv med ett øyeblikksbilde av åpne
filer før den fjernes. Uten verktøyet fjerner skriptet ingenting og varsler om dette
(exit 1). Prøv alltid endringer med `--dry-run` først — det skriver ut nøyaktig hva det ville
gjort, uten å endre noe.

Dette gjør skriptet ved hver kjøring: rydder opp i våre egne etterlatenskaper (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) etter **3 t på tmpfs** og 24 t på disken
`_work/_temp`; avslutter en `next-build` som er eldre enn 75 min (ingen jobber kjører så lenge — den
2026-08-27 kjørte én i 70 min etter at GitHub hadde erklært jobben som tapt); fjerner 48 timer gamle
utsjekkinger for runners med enheter som er **stoppet**; varsler ved diskbruk ≥ 85 %, minne-PSI
`full/avg60` ≥ 10 % og flere lytterprosesser enn `MAX_ACTIVE_RUNNERS` (med en
fordeling mellom omniroute/andre). Exit 1 = krever oppmerksomhet; les loggen.

75-minuttersregelen fanger ikke opp en build der GitHub allerede har gitt opp jobben. Når
`Runner.Listener` ikke kan fornye jobben, viser `_diag/Runner_*.log`
`POST request to …/renewjob timed out after 100 seconds`, API-et rapporterer jobben som `completed`
(feil) omtrent ti minutter etter siste vellykkede fornyelse, og `next-build` fortsetter å kjøre uten
noen tilknyttet jobb (2026-10-18: Build for #17066 feilet kl. 19:43, og builden holdt fortsatt av
40 GB fem minutter senere). Bekreft referansen i den nyeste `_diag/Worker_*.log`, og send deretter
SIGTERM kun til build-treet etter PID — `next-build`, `npm run build`, `build-next-isolated.mjs` og
arbeidsprosessene i `_work`. Berør aldri `Runner.Listener`, `RunnerService.js` eller `Runner.Worker`:
Arbeidsprosessen rapporterer jobben som avbrutt, og lytterprosessen kobler seg til igjen av seg selv.

## Runner-enheter: KillMode

Runnerens standardinnstilling `KillMode=process` lar `Runner.Worker → npm → next-build`
fortsette å kjøre når en enhet stoppes eller startes på nytt — en foreldreløs build fortsetter å bruke RAM og
CPU uten noen tilknyttet jobb. Hver OmniRoute-enhet har en overstyringsfil
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
med `KillMode=mixed`: SIGTERM sendes først til lytterprosessen, deretter SIGKILL til hele cgroup-en ved
`TimeoutStop`. Dette trer i kraft neste gang enheten startes på nytt — start **én runner om
gangen, kun når den er inaktiv**, med inaktivitetskontrollen og omstarten i samme kommando.

## Driftsregler

- **Én Turbopack-bygging om gangen — håndhevet med etikett.** Hver jobb som kjører en fullstendig Turbopack-
  `next build`, bruker `[self-hosted, omni-build]`, og bare **`omniroute-113-5`** har denne
  etiketten: `ci.yml` `Build`, `npm-publish.yml` `publish`, `nightly-v4-build`, `preview-artifact`,
  den nattlige a11y-byggingen (#16853) og **amd64** i `docker-publish.yml` (webpack i BuildKit —
  Turbopack fikk panikk der, kjøring 33253576569). Docker-etappen for arm64 forblir på `ubuntu-24.04-arm`.
  amd64 i `docker-publish` deler samtidighetsgruppen `heavy-build-main` med `Build` i `ci.yml`
  (`cancel-in-progress: false`). Docker Engine må være på `omniroute-113-5`. Det er ikke plass til
  en ekstra Turbopack-plass innenfor 78 GB (2 × 33–37 GB pluss resten av maskinen); en ekstra plass
  er bare trygg for webpack-bygginger.
- **Bygginger for pull requests kjører på driftede kjørere (2026-10-18).** `Build` i `ci.yml` når
  bare `omni-build` for `push` og `workflow_dispatch`; hver `pull_request` (fra eget opphav eller en fork)
  og `merge_group`-bygging kjører på `ubuntu-latest` med webpack. Da alle PR-er fra eget opphav ble
  rutet til plassen, holdt en Turbopack-bygging den opptatt i 29–58 min, 18 bygginger sto i kø i opptil
  18 t, og utgivelseslinjens egen push-bygging fikk plassen én gang på 40 jobber. På en driftet kjører
  tar den samme PR-byggingen 8–12 min sammen med PR-ens andre jobber. Turbopack, pakkeren som
  `npm-publish` leverer, blir fortsatt testet på utgivelseslinjen av den nattlige a11y-byggingen av
  standardgrenen (04:41 UTC), av hver push- eller dispatch-bygging som når plassen, og av
  `npm-publish` selv. `tests/unit/build/heavy-build-queue.test.ts`
  låser porten med fire vilkår.
- **Dimensjoner aldri Turbopack-plassen lavere enn det målte behovet.** Den 2026-10-18 kl. 18:06 ble
  plassen redusert fra 56G/60G til 40G/44G for å gi plass til `omni-release`. Kompileringsfasen lå på
  `MemoryHigh` under hele kjøringen (minne-PSI `full` 30–43 %), og `Runner.Listener`, som
  deler cgroup-en, klarte ikke å fornye jobben sin. Eierens 56G/60G fra 2026-10-17 ble gjenopprettet
  samme dag. Under denne verdien feiler ikke byggingen; den havner i ressurskø, og jobben går tapt.
- **Release-Green har sin egen plass (2026-10-18).** Frem til da kjørte begge Release-Green-valideringene
  på `omni-build`: ved hver push (~10/time, 97 av 100 push-kjøringer ble avbrutt midt i arbeidet på én dag)
  og tre fullstendige gjennomkjøringer på ~2 t per dag (gjennomkjøringen kl. 05:29 ventet 6 t på plassen) —
  den ene byggeplassen var overbelastet flere ganger, og PR-bygginger fra eget opphav ventet i timevis.
  `release-green` og `main-green` bruker nå `omni-release` (bare `omniroute-113-6`) med
  `OMNIROUTE_USE_TURBOPACK=0`, og en påbegynt kjøring blir ikke lenger avbrutt av en nyere push (den
  ventende plassen slår fortsatt sammen stormen). `tests/unit/build/runner-capacity-routing.test.ts`
  låser rutingen, webpack-bryteren og at ingenting på `omni-release` bygges med Turbopack.
- **Lettvektsgruppen: `omni-light`.** `omniroute-113` og `omniroute-113-2` kjører de nattlige jobbene som
  trenger en `next build` kun for backend (~5–6 GB; webpack), samt `lint-guard` i `quality.yml`.
  `omniroute-113` hadde `MemoryHigh=4G` frem til 2026-10-18 — promptfoo-byggingen brukte
  54 minutter på å kjempe seg gjennom minnegjenvinningen der; 8 GB fjerner strupingen.
- **Færre lyttere med hensikt.** Fire OmniRoute-enheter ble deaktivert 2026-08-29 — hver ekstra
  lytter er enda en leietaker i minnebudsjettet ovenfor. Vaktmesterens øvre grense er 6 (`MAX_ACTIVE_RUNNERS=6` i cron): den teller
  hver `Runner.Listener` på maskinen, og OmniHeuris + OmniMind legger til to utover våre fire.
- **Rydd aldri `/tmp` eller `_work` manuelt mens en kjører er opptatt.** En
  kontroller-og-slett-operasjon med et opphold mellom de to førte til at en aktiv Build-jobb mistet
  `_work` 2026-08-27. Vaktmesteren utfører kontrollen og slettingen i ett trinn;
  la den gjøre det.
- Hvis en kjører stoppes midt i en jobb, blir jobben avbrutt (observert i drift): bruk bare `systemctl stop`
  når lytteren ikke har noen underordnet `Runner.Worker`-prosess — og gjør det i én kommando.
- Arbeidsflyter må ikke parkere artefakter i `/tmp` (det er RAM). Last ned til
  `$RUNNER_TEMP` (på disk, per kjører) — det 1,3 GB store `next-build`-artefaktet brukte 27–32
  minutter på å lande på tmpfs og 2 minutter på å bli lastet opp fra disk.
- VPS-en `.15` er kun for homologering — den kjører aldri CI-kjørere.

## Vertsbane (GitHub-driftede kjørere)

Kontoen er på **Pro**-abonnementet: **40 samtidige vertsbaserte jobber**, delt av hver PR-kontroll,
hver push-utløste arbeidsflyt og CodeQLs standardoppsett. Målt 2026-10-18 under en
sammenslåingskampanje (~10 sammenslåinger/time på `release/v3.8.52`): **2 500 arbeidsflytkjøringer opprettet i
løpet av 24 t**, 44 push-operasjoner til grenen i løpet av 6 t, **106 vertsbaserte jobber i kø** mens PR-kontroller ventet i
timevis og PR-er ble slått sammen uten dem. Ni arbeidsflyter ble utløst ved hver push til grenen:

| per push til `release/v*`                   | vertsbaserte jobber | resultat under stormen                                         | siden 2026-10-18                                                                |
| ------------------------------------------- | ------------------: | -------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `ci.yml` (full matrise)                     |           opptil 30 | avbrutt av neste push, 24 av 24 på én dag                      | startes ikke ved push til `release/**` (PR-kjøring + Release-Green)             |
| `quality.yml`                               |                  ~6 | avbrutt, 23 av 23                                              | startes ikke ved push til `release/**`                                          |
| `Release-Green` `--quick`                   |                   0 | kjørte på `omni-build`, 97 av 100 avbrutt                      | `omni-release`-plass, avbrytes aldri, ventende kjøring slås sammen              |
| `Lock released branch`, `OpenSSF Scorecard` |                   2 | én kjøring i kø per push                                       | én kjøring per ref (`tests/unit/build/hosted-lane-concurrency.test.ts`)         |
| `Release acceptance` (skyggerapport)        |                   1 | én vertsbasert `npm ci` per push, aldri avbrutt                | uendret — kandidat for et `paths:`-filter                                       |
| `Publish to Docker Hub` → `Deploy to VPS`   |                   2 | avbrutt per push; amd64-delen konkurrerer på `omni-build`      | uendret — eierens distribusjonskanal                                            |
| CodeQL-standardoppsett (`dynamic`)          |                   4 | `javascript-typescript`, `actions`, `c-cpp`, `python` per push | uendret — Innstillinger → Kodesikkerhet; `c-cpp`/`python` skanner ingenting her |

`tests/unit/build/push-storm-diet.test.ts` låser push-utløseren for bare `main` i `ci.yml` og
`quality.yml`. Bivirkning: Codecov mottar ikke lenger en basisopplasting per push til en utgivelsesgren (dette
trinnet er kun informativt og har `continue-on-error`); dekningsporten i repositoriet og PR-kommentaren er
upåvirket.

**Mer egenvertet kapasitet løser ikke vertskøen.** Utviklingsboksen
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) kunne vært vert for en kjører, men agentøktene holder allerede
belastningen på 20–26, agentcontaineren har ingen Docker-daemon, og den mettede banen er
den vertsbaserte. `.113`-boksen hadde 71 GB ledig og en belastning på 5–8 på samme tidspunkt; begrensningen
der er minnebudsjettet per lytter ovenfor (maksimalt 6 lyttere), ikke CPU. De gjenværende virkemidlene
er prosessrelaterte: slå sammen kampanje-PR-er via Mergify-køen (`label=queue`, puljer deler
én `merge_group`-CI-kjøring i stedet for én kjøring per PR pluss én per push), reduser språkene i
CodeQL-standardoppsettet, og filtrer `release-acceptance.yml` etter filene den leser.
