# Self-Hosted Runner Box Operations (.113 pool) (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Der selbstgehostete Pool läuft auf dem **.113** Box (`tomni-proxmox-113`). Seit dem 18.10.2026 hat jeder OmniRoute Läufer **eine Rolle** , ein Label und ein memory/CPU Budget, das auf die gemessene Arbeitsbelastung abgestimmt ist. Der Turbopack Slot bekommt, was der Build braucht; Die Größe der anderen Schlitze entspricht ihren gemessenen Spitzenwerten. Die Box wird nur dann überlastet, wenn ein Turbopack -Build mit einem Release-Green-Webpack-Build und einem Lint-Job zusammenfällt; Der Host-Swap (16 GB) absorbiert dies, und da Pull-Request-Builds gehostet ausgeführt werden, ist der Turbopack Slot die meiste Zeit inaktiv:

| Läufer               | Etikett                         | Rolle                                                                                                                                                    | `MemoryHigh` / `MemoryMax`    | `CPUQuota`    |
| -------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------------- |
| `omniroute-113-5`    | `omni-build`, `omni-build-60gb` | Turbopack -Builds: `ci.yml` `Build` (nur push/dispatch ), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, der nächtliche A11y-Build | 56 GB / 60 GB (Swap 0)        | 1600 %        |
| `omniroute-113-6`    | `omni-release`                  | Release-Green (`release-green` + `main-green`), Webpack-Build                                                                                            | 20 GB / 24 GB (4 GB tauschen) | 800 %         |
| `omniroute-113-2`    | `omni-light`                    | nightlies (Schemathesis, promptfoo, garak, k6) und `quality.yml` `lint-guard`                                                                            | 12 GB / 16 GB (4 GB tauschen) | 600 %         |
| `omniroute-113`      | `omni-light`                    | Gleicher Pool wie oben                                                                                                                                   | 8 GB / 12 GB                  | 400 %         |
| OmniHeuris, OmniMind | (ihre Repos)                    | Nur Dependabot (Höchstwert jeweils 155 MB, 18.10.2026)                                                                                                   | 4 GB / 6 GB                   | Jeweils 200 % |

Gemessen am 18.10.2026:

| Ressource | Wert                                  | was es für die Terminplanung bedeutet                                                                                                                                                                                                                                                                                                                                                                                          |
| --------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| RAM / CPU | **78 GB / 32 Kerne**                  | ein Turbopack -Produktionsaufbau erreichte seinen Höhepunkt bei 49 GB ohne Obergrenze (`tests/unit/ci-build-bundler-webpack.test.ts`); in Next 16.3.8 umfasst allein die Kompilierungsphase ~ 40 GB (36 GB RSS in `next-build` plus 17 Loader-Worker bei 3 GB, gemessen am 18.10.2026); ein Webpack-Build am ~ 14–16 GB. Ein Turbopack + ein Webpack-Build passen zusammen; Bei zwei Turbopack -Builds ist dies nicht der Fall |
| tauschen  | 16 GB                                 | `omniroute-113-5` läuft mit ausgeschaltetem Swap (`MemorySwapMax=0`), sodass ein außer Kontrolle geratener Build an seiner Obergrenze abgeschnitten wird, anstatt die Box auszutauschen                                                                                                                                                                                                                                        |
| `/tmp`    | **12 GB tmpfs = RAM**                 | alles, was dort geparkt ist, ist Erinnerung; Reste werden nach 3 Stunden gefegt                                                                                                                                                                                                                                                                                                                                                |
| CPU       | Belastung 60 auf 32 Kernen beobachtet | Vor den Quoten ließ ein Turbopack Build (~ 1166 % CPU) plus eine Coverage-Suite auf derselben Box den Herzschlag der anderen Hörer verhungern (`The self-hosted runner lost communication`, #16853).                                                                                                                                                                                                                           |
| Läufer    | **7 Zuhörer** (28.10.2026)            | 5 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-5` trägt auch `omni-build-60gb`; `omniroute-113-3/-4/-8` wurden aus dem Repo gelöscht (28.10.2026)                                                                                                                                                                                                                                                                         |

Die Grenzwerte sind im `/etc/systemd/system/actions.runner.<…>.service.d/override.conf` jeder Einheit gespeichert (vorherige Werte bleiben als `override.conf.bak-20261018` erhalten) und wurden live mit `systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — ohne Neustart angewendet, sodass kein laufender Job berührt wurde. Beschriftungswechsel erfolgen durch die Läufer API (`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` / `gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), auch live.

## Installieren Sie den Hausmeister (einmalig, auf der Box)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): every 30 min, log to /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` ist erforderlich: Der Hausmeister beweist mit einem Snapshot der geöffneten Dateien, dass ein Pfad inaktiv ist, bevor er ihn entfernt, und ohne das Tool entfernt er nichts und sagt dies (Ausgang 1). Probieren Sie zuerst eine Änderung mit `--dry-run` aus. — druckt genau das, was es tun würde, und berührt nichts.

Was es bei jedem Lauf macht: fegt unsere eigenen Reste (`runner-*`, `omniroute-*`, `next-build*`, `e2e-build.tar.gz`) nach **3 Stunden auf tmpfs** und 24 h auf Platte `_work/_temp`; warnt bei einem `next-build` der älter als 75 Minuten ist, und hält ihn am Laufen; Beschneidet 48 Stunden alte Kassen von Läufern, deren Einheit ist **gestoppt** ; Warnungen auf der Festplatte ≥ 85 %, Speicher PSI `full/avg60` ≥ 10 % und mehr Listener als `MAX_ACTIVE_RUNNERS` (mit einer omniroute/other Aufschlüsselung). Ausgang 1 = Aufmerksamkeit erforderlich; lies das Protokoll.

Die verstrichene Zeit allein beweist nicht, dass ein Prozess verwaist ist. Der Hausmeister sendet niemals Signale basierend auf dem Alter. Die bestehenden `ZOMBIE_BUILD_MAX_MIN` und `ZOMBIE_BUILD_COMM` Umgebungsnamen werden weiterhin für Cron-Konfigurationen unterstützt. Bevor Sie einen verdächtigen Waisen bereinigen, vergewissern Sie sich, dass es sich bei dem genauen GitHub Job um einen Terminaljob handelt, und identifizieren Sie die Prozesse, die zu diesem Job gehören. Wenn der `Runner.Listener` seinen Job nicht erneuern kann, zeigt `_diag/Runner_*.log` `POST request to …/renewjob timed out after 100 seconds` an, der API meldet den Job `completed` (Fehler) etwa zehn Minuten nach der letzten erfolgreichen Erneuerung und `next-build` läuft weiter, ohne dass ein Job angehängt ist (18.10.2026: Der Build von #17066 schlug um 19:43 Uhr fehl und sein Build hielt fünf Minuten später immer noch 40 GB ). Bestätigen Sie die Referenz im neuesten `_diag/Worker_*.log`, dann SIGTERM nur den Build-Baum durch PID —, `next-build`, `npm run build`, `build-next-isolated.mjs` und die `_work` Worker. Berühren Sie niemals `Runner.Listener`, `RunnerService.js` oder `Runner.Worker`: Der Worker meldet den Job als abgebrochen und der Listener geht von selbst wieder online.

## Runner-Units: KillMode

Das standardmäßige `KillMode=process` des Runners lässt
`Runner.Worker → npm → next-build` weiterlaufen, wenn eine Unit gestoppt oder neu
gestartet wird — ein verwaister Build verbraucht weiterhin RAM und CPU, obwohl ihm
kein Job zugeordnet ist. Jede OmniRoute-Unit besitzt eine Drop-in-Datei
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
mit `KillMode=mixed`: zuerst SIGTERM an den Listener, bei `TimeoutStop` dann SIGKILL
an die gesamte cgroup. Die Einstellung wird beim nächsten Neustart der Unit wirksam
— starten Sie **jeweils nur einen Runner und nur im inaktiven Zustand** neu, wobei
die Prüfung auf Inaktivität und der Neustart im selben Befehl erfolgen müssen.

## Betriebsregeln

- **Jeweils nur ein Turbopack-Build — durch ein Label erzwungen.** Jeder Job, der einen vollständigen Turbopack-
  `next build` ausführt, zielt auf `[self-hosted, omni-build, omni-build-60gb]`, und nur **`omniroute-113-5`** trägt dieses
  Label: `ci.yml` `Build`, `npm-publish.yml` `publish`, `nightly-v4-build`, `preview-artifact`,
  der nächtliche a11y-Build (#16853) und **amd64** aus `docker-publish.yml` (webpack innerhalb von BuildKit —
  Turbopack geriet dort in Panik, Lauf 33253576569). Der arm64-Docker-Zweig verbleibt auf `ubuntu-24.04-arm`.
  `docker-publish` amd64 teilt sich die Concurrency-Gruppe `heavy-build-main` mit `ci.yml` `Build`
  (`cancel-in-progress: false`). Docker Engine muss auf `omniroute-113-5` laufen. Ein zweiter Turbopack-
  Slot passt nicht in 78 GB (2 × 33–37 GB plus der Rest des Systems); ein zweiter Slot ist nur für
  webpack-Builds sicher.
- **Pull-Request-Builds laufen gehostet (2026-10-18).** `ci.yml` `Build` erreicht `omni-build` nur bei
  `push` und `workflow_dispatch`; jeder `pull_request`-Build (aus dem eigenen Repository oder einem Fork)
  sowie jeder `merge_group`-Build läuft auf `ubuntu-latest` mit webpack. Als jeder PR aus dem eigenen
  Repository an den Slot geleitet wurde, belegte ein Turbopack-Build diesen 29–58 Min., 18 Builds warteten
  bis zu 18 Std. in der Warteschlange, und der eigene Push-Build des Release-Zweigs erhielt den Slot bei
  40 Jobs genau einmal. Gehostet dauert derselbe PR-Build 8–12 Min. und läuft neben den anderen Jobs des
  PRs. Turbopack, der von `npm-publish` ausgelieferte Bundler, wird auf dem Release-Zweig weiterhin durch
  den nächtlichen a11y-Build des Standard-Branches (04:41 UTC), durch jeden Push- oder Dispatch-Build,
  der den Slot erreicht, und durch `npm-publish` selbst ausgeführt. `tests/unit/build/heavy-build-queue.test.ts`
  schreibt die aus vier Klauseln bestehende Zugangsbedingung fest.
- **Den Turbopack-Slot niemals kleiner als den gemessenen Bedarf dimensionieren.** Am 2026-10-18 um 18:06
  wurde der Slot von 56G/60G auf 40G/44G verkleinert, um Platz für `omni-release` zu schaffen. Die
  Kompilierungsphase lag während des gesamten Laufs am `MemoryHigh` (Speicher-PSI `full` 30–43 %), und
  der `Runner.Listener`, der dieselbe cgroup nutzt, konnte seinen Job nicht verlängern. Die 56G/60G-
  Einstellung des Besitzers vom 2026-10-17 wurde noch am selben Tag wiederhergestellt. Unterhalb dieses
  Werts schlägt der Build nicht fehl; er gerät in Thrashing, und der Job geht verloren.
- **Release-Green verfügt über einen eigenen Slot (2026-10-18).** Bis dahin liefen beide Release-Green-
  Validierungen auf `omni-build`: bei jedem Push (~10/Stunde, 97 von 100 Push-Läufen wurden an einem Tag
  während der Ausführung abgebrochen) sowie drei vollständige Durchläufe von jeweils ~2 Std. pro Tag
  (der Durchlauf um 05:29 wartete 6 Std. auf den Slot) — der einzelne Build-Slot war um ein Mehrfaches
  überbelegt, und PR-Builds aus dem eigenen Repository warteten stundenlang. `release-green` und
  `main-green` zielen nun auf `omni-release` (ausschließlich `omniroute-113-6`) mit
  `OMNIROUTE_USE_TURBOPACK=0`, und ein gestarteter Lauf wird nicht mehr durch einen neueren Push
  abgebrochen (der wartende Slot fasst den Ansturm weiterhin zusammen).
  `tests/unit/build/runner-capacity-routing.test.ts` schreibt das Routing, die Umschaltung auf webpack
  und die Vorgabe fest, dass auf `omni-release` nichts mit Turbopack gebaut wird.
- **Leichtgewichtiger Pool: `omni-light`.** `omniroute-113` und `omniroute-113-2` führen die nächtlichen
  Läufe aus, die einen reinen Backend-`next build` benötigen (~5–6 GB; webpack), sowie `quality.yml`
  `lint-guard`. `omniroute-113` hatte bis zum 2026-10-18 `MemoryHigh=4G` — der promptfoo-Build kämpfte
  sich dort 54 Minuten lang durch Speicher-Rückgewinnung; 8 GB beseitigen die Drosselung.
- **Bewusst weniger Listener.** Vier OmniRoute-Units wurden am 2026-08-29 deaktiviert — jeder zusätzliche
  Listener ist ein weiterer Nutzer des oben genannten Speicherbudgets. Die Obergrenze des Janitors
  beträgt 8 (`MAX_ACTIVE_RUNNERS=8` in cron): Er zählt jeden `Runner.Listener` auf dem System, und
  OmniHeuris + OmniMind kommen als zwei weitere zu unseren fünf hinzu.
- **Unit- und Vitest-Jobs bleiben gehostet.** `ci.yml` schickt seine Unit-Shards und den Vitest-Job nur dann an `[self-hosted, omni-ci]`, wenn die Repository-Variable `vars.USE_VPS_TEST_RUNNER` auf `true` steht, und auch dann nur für `pull_request`-Läufe aus demselben Repository; Forks, `merge_group` und Pushes bleiben auf `ubuntu-latest` (`tests/unit/vps-runner-variable-scope.test.ts`). Die Variable steht auf `false`. Am 2026-10-28 brauchten drei `omni-ci`-Listener mit je 4 Kernen 250–270 s für `npm ci`, und jeder Unit-Shard lief in das 30-Minuten-Job-Limit, gegenüber ~634 s für einen gehosteten Shard, bei einer Last von 17–24 auf dem System. Die Listener wurden gelöscht. Die Variable nicht wieder einschalten, solange es keine Listener gibt, die für einen Unit-Shard dimensioniert sind.
- **Niemals `/tmp` oder `_work` manuell bereinigen, während ein Runner beschäftigt ist.** Eine
  Prüfung mit anschließender, zeitlich verzögerter Löschung führte dazu, dass einem laufenden Build-Job
  am 2026-08-27 sein `_work` entzogen wurde. Der Janitor führt die Prüfung und die Entfernung in einem
  einzigen Schritt aus; überlasse es ihm.
- Das Anhalten eines Runners während eines Jobs bricht den Job ab (im Live-Betrieb beobachtet):
  `systemctl stop` nur dann, wenn sein Listener keinen untergeordneten `Runner.Worker`-Prozess hat —
  und dies in einem einzigen Befehl ausführen.
- Workflows dürfen keine Artefakte in `/tmp` ablegen (es liegt im RAM). Downloads gehören nach
  `$RUNNER_TEMP` (pro Runner auf der Festplatte) — das 1,3 GB große `next-build`-Artefakt benötigte
  27–32 Minuten, um auf dem tmpfs abgelegt zu werden, und 2 Minuten für den Upload von der Festplatte.
- Der `.15`-VPS dient ausschließlich der Homologation — darauf laufen niemals CI-Runner.

## Gehostete Lane (GitHub-gehostete Runner)

Das Repository gehört zur Organisation `cheaper-inference` mit dem **Team**-Tarif: **60 gleichzeitig ausgeführte gehostete Jobs**, die von sämtlichen Repositories der Organisation, allen PR-Prüfungen, allen durch Pushes ausgelösten Workflows und dem Standard-Setup von CodeQL gemeinsam genutzt werden. Die folgenden Zahlen wurden noch mit dem **Pro**-Tarif (40 gleichzeitig ausgeführte gehostete Jobs) gemessen. Gemessen am 2026-10-18 während einer
Merge-Kampagne (~10 Merges/Stunde auf `release/v3.8.52`): **2.500 Workflow-Ausführungen wurden innerhalb von
24 Stunden erstellt**, 44 Pushes auf den Branch innerhalb von 6 Stunden, **106 gehostete Jobs in der Warteschlange**, während PR-Prüfungen
stundenlang warteten und PRs ohne sie gemergt wurden. Bei jedem Push auf den Branch wurden neun Workflows ausgelöst:

| pro Push auf `release/v*`                   | gehostete Jobs | Ergebnis während des Ansturms                                  | seit 2026-10-18                                                                    |
| ------------------------------------------- | -------------: | -------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `ci.yml` (vollständige Matrix)              |         bis 30 | durch den nächsten Push abgebrochen, 24 von 24 an einem Tag    | wird bei Pushes auf `release/**` nicht gestartet (PR-Lauf + Release-Green)         |
| `quality.yml`                               |             ~6 | abgebrochen, 23 von 23                                         | wird bei Pushes auf `release/**` nicht gestartet                                   |
| `Release-Green` `--quick`                   |              0 | lief auf `omni-build`, 97 von 100 abgebrochen                  | `omni-release`-Slot, niemals abgebrochen, ausstehende Läufe werden zusammengeführt |
| `Lock released branch`, `OpenSSF Scorecard` |              2 | ein Lauf pro Push in der Warteschlange                         | ein Lauf pro Ref (`tests/unit/build/hosted-lane-concurrency.test.ts`)              |
| `Release acceptance` (Schattenbericht)      |              1 | ein gehostetes `npm ci` pro Push, niemals abgebrochen          | unverändert — Kandidat für einen `paths:`-Filter                                   |
| `Publish to Docker Hub` → `Deploy to VPS`   |              2 | pro Push abgebrochen; amd64-Teil konkurriert auf `omni-build`  | unverändert — Deployment-Kanal des Eigentümers                                     |
| CodeQL-Standard-Setup (`dynamic`)           |              4 | `javascript-typescript`, `actions`, `c-cpp`, `python` pro Push | unverändert — Einstellungen → Codesicherheit; `c-cpp`/`python` scannen hier nichts |

`tests/unit/build/push-storm-diet.test.ts` schreibt den reinen `main`-Push-Trigger von `ci.yml` und
`quality.yml` fest. Nebeneffekt: Codecov erhält nicht mehr bei jedem Release-Push einen Basis-Upload (der
Schritt dient nur zur Information und verwendet `continue-on-error`); das repository-interne Coverage-Gate und der PR-Kommentar
bleiben davon unberührt.

**Mehr selbst gehostete Kapazität behebt die Warteschlange der gehosteten Lane nicht.** Die Devbox
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) könnte einen Runner hosten, aber die Agentensitzungen
halten ihre Last bereits bei 20–26, der Agentencontainer verfügt über keinen Docker-Daemon, und ausgelastet ist
die gehostete Lane. Die `.113`-Box hatte zum selben Zeitpunkt 71 GB freien Speicher und eine Last von 5–8; ihre Einschränkung
ist das oben beschriebene Speicherbudget pro Listener (Obergrenze von 6 Listenern), nicht die CPU. Die verbleibenden Stellschrauben
betreffen die Prozesse: Kampagnen-PRs über die Mergify-Warteschlange einbringen (`label=queue`; Batches nutzen
gemeinsam einen `merge_group`-CI-Lauf anstelle eines Laufs pro PR plus eines Laufs pro Push), die Sprachen
des CodeQL-Standard-Setups reduzieren und `release-acceptance.yml` anhand der gelesenen Dateien filtern.
