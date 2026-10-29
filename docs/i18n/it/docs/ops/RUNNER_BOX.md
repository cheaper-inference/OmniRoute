# Self-Hosted Runner Box Operations (.113 pool) (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Il pool self-hosted viene eseguito sulla macchina **.113** (`tomni-proxmox-113`). Dal 2026-10-18 ogni
runner OmniRoute ha **un solo ruolo**, un'unica etichetta e un budget di memoria/CPU dimensionato in base
ai valori misurati per il relativo carico di lavoro. Lo slot Turbopack riceve le risorse necessarie alla build;
gli altri slot sono dimensionati in base ai picchi misurati. La macchina effettua overcommit solo quando
una build Turbopack coincide con una build webpack Release-Green e un job di lint; lo swap dell'host
(16 GB) assorbe tale carico e, poiché le build delle pull request vengono eseguite su runner hosted, lo
slot Turbopack rimane inattivo per la maggior parte del tempo:

| runner               | etichetta      | ruolo                                                                                                                                               | `MemoryHigh` / `MemoryMax` | `CPUQuota`     |
| -------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------- |
| `omniroute-113-5`    | `omni-build`   | build Turbopack: `ci.yml` `Build` (solo push/dispatch), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, la build a11y notturna | 56 GB / 60 GB (swap 0)     | 1600 %         |
| `omniroute-113-6`    | `omni-release` | Release-Green (`release-green` + `main-green`), build webpack                                                                                       | 20 GB / 24 GB (swap 4 GB)  | 800 %          |
| `omniroute-113-2`    | `omni-light`   | job notturni (Schemathesis, promptfoo, garak, k6) e `quality.yml` `lint-guard`                                                                      | 12 GB / 16 GB (swap 4 GB)  | 600 %          |
| `omniroute-113`      | `omni-light`   | stesso pool indicato sopra                                                                                                                          | 8 GB / 12 GB               | 400 %          |
| OmniHeuris, OmniMind | (i loro repo)  | solo Dependabot (picco di 155 MB ciascuno, 2026-10-18)                                                                                              | 4 GB / 6 GB                | 200 % ciascuno |

Misurazioni del 2026-10-18:

| risorsa   | valore                               | implicazioni per la pianificazione                                                                                                                                                                                                                                                                                                                                                                                       |
| --------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| RAM / CPU | **78 GB / 32 core**                  | una build di produzione Turbopack senza limiti ha raggiunto un picco di 49 GB (`tests/unit/ci-build-bundler-webpack.test.ts`); con Next 16.3.8, la sola fase di compilazione mantiene occupati ~40 GB (36 GB di RSS in `next-build` più 17 worker loader da 3 GB, misurati il 2026-10-18); una build webpack occupa ~14–16 GB. Una build Turbopack e una webpack possono essere eseguite insieme; due build Turbopack no |
| swap      | 16 GB                                | `omniroute-113-5` viene eseguito con lo swap disattivato (`MemorySwapMax=0`), così una build fuori controllo viene terminata al raggiungimento del limite anziché costringere la macchina a usare lo swap                                                                                                                                                                                                                |
| `/tmp`    | **tmpfs da 12 GB = RAM**             | tutto ciò che viene depositato lì occupa memoria; i residui vengono eliminati dopo 3 h                                                                                                                                                                                                                                                                                                                                   |
| CPU       | osservato un carico di 60 su 32 core | prima dell'introduzione delle quote, una build Turbopack (~1166 % di CPU) insieme a una suite di coverage sulla stessa macchina privava gli altri listener delle risorse necessarie per gli heartbeat (`The self-hosted runner lost communication`, #16853)                                                                                                                                                              |
| runner    | **7 listener** (2026-10-28)          | 5 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-7` porta anche `omni-build`; `omniroute-113-3/-4/-8` sono stati eliminati dal repository (2026-10-28)                                                                                                                                                                                                                                                                |

I limiti si trovano nel file `/etc/systemd/system/actions.runner.<…>.service.d/override.conf` di ogni unità
(i valori precedenti sono conservati come `override.conf.bak-20261018`) e sono stati applicati in tempo reale con
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…`, senza riavvio, quindi nessun
job in esecuzione è stato interessato. Le etichette vengono modificate tramite l'API dei runner (`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), anch'esse in tempo reale.

## Installare il janitor (una sola volta, sulla macchina)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): ogni 30 min, registra il log in /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` è obbligatorio: il janitor verifica che un percorso sia inattivo tramite una singola istantanea dei file
aperti prima di rimuoverlo; senza questo strumento non rimuove nulla e lo segnala
(exit 1). Provare prima qualsiasi modifica con `--dry-run`: mostra esattamente cosa farebbe
senza modificare nulla.

Cosa fa a ogni esecuzione: elimina i residui generati dai nostri processi (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) dopo **3 h su tmpfs** e 24 h su disco in
`_work/_temp`; termina un `next-build` più vecchio di 75 min (nessun job dura così a lungo — il
2026-08-27 uno è rimasto in esecuzione per 70 min dopo che GitHub aveva dichiarato perso il relativo job);
elimina i checkout più vecchi di 48 h dei runner la cui unità è **arrestata**; genera avvisi in caso di utilizzo
del disco ≥ 85%, PSI della memoria `full/avg60` ≥ 10% e numero di listener superiore a
`MAX_ACTIVE_RUNNERS` (con distinzione tra omniroute e altri). Exit 1 = è necessario intervenire;
leggere il log.

La regola dei 75 minuti non rileva una build il cui job sia già stato abbandonato da GitHub. Quando
`Runner.Listener` non riesce a rinnovare il proprio job, `_diag/Runner_*.log` mostra
`POST request to …/renewjob timed out after 100 seconds`, l'API segnala il job come `completed`
(fallito) circa dieci minuti dopo l'ultimo rinnovo riuscito e `next-build` continua a essere eseguito
senza alcun job associato (2026-10-18: la build di #17066 è stata contrassegnata come fallita alle 19:43
e cinque minuti dopo il relativo processo di build occupava ancora 40 GB). Verificare il ref nel file
`_diag/Worker_*.log` più recente, quindi inviare SIGTERM solo all'albero dei processi di build in base al
PID: `next-build`, `npm run build`, `build-next-isolated.mjs` e i processi worker di `_work`. Non intervenire
mai su `Runner.Listener`, `RunnerService.js` o `Runner.Worker`: il worker segnala il job come annullato
e il listener torna online autonomamente.

## Unità dei runner: KillMode

Il valore predefinito `KillMode=process` del runner lascia attivi
`Runner.Worker → npm → next-build` quando un'unità viene arrestata o riavviata: una build orfana
continua a consumare RAM e CPU senza alcun job associato. Ogni unità OmniRoute include un drop-in
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
con `KillMode=mixed`: prima invia SIGTERM al listener, quindi SIGKILL all'intero cgroup al raggiungimento
di `TimeoutStop`. Diventa effettivo al successivo riavvio dell'unità: riavviare **un solo runner alla
volta, esclusivamente quando è inattivo**, eseguendo il controllo di inattività e il riavvio nello stesso comando.

## Regole operative

- **Una sola build Turbopack alla volta — vincolo imposto tramite etichetta.** Ogni job che esegue una
  `next build` completa con Turbopack usa come destinazione `[self-hosted, omni-build]`, e solo
  **`omniroute-113-5`** possiede tale etichetta: `ci.yml` `Build`, `npm-publish.yml` `publish`,
  `nightly-v4-build`, `preview-artifact`, la build a11y notturna (#16853) e
  `docker-publish.yml` **amd64** (webpack all'interno di BuildKit — Turbopack è andato in panic
  lì, esecuzione 33253576569). La parte Docker arm64 resta su `ubuntu-24.04-arm`.
  `docker-publish` amd64 condivide il gruppo di concorrenza `heavy-build-main` con `Build` di
  `ci.yml` (`cancel-in-progress: false`). Docker Engine deve trovarsi su `omniroute-113-5`. Un
  secondo slot Turbopack non rientra nei 78 GB (2 × 33–37 GB più il resto della macchina); un
  secondo slot è sicuro solo per le build webpack.
- **Le build delle pull request vengono eseguite sull'infrastruttura hosted (2026-10-18).**
  `Build` di `ci.yml` raggiunge `omni-build` solo per `push` e `workflow_dispatch`; ogni build
  `pull_request` (dall'origine o da un fork) e `merge_group` viene eseguita su `ubuntu-latest`
  con webpack. Quando ogni PR dall'origine veniva instradata verso lo slot, una build Turbopack
  lo occupava per 29–58 min, 18 build sono rimaste in coda fino a 18 h e la build di push della
  stessa linea di release ha ottenuto lo slot una volta su 40 job. Sull'infrastruttura hosted, la
  stessa build della PR richiede 8–12 min insieme agli altri job della PR. Turbopack, il bundler
  distribuito da `npm-publish`, continua a essere esercitato sulla linea di release dalla build
  a11y notturna del branch predefinito (04:41 UTC), da ogni build push o dispatch che raggiunge
  lo slot e da `npm-publish` stesso. `tests/unit/build/heavy-build-queue.test.ts` fissa il gate
  composto da quattro clausole.
- **Non dimensionare mai lo slot Turbopack al di sotto del fabbisogno misurato.** Il 2026-10-18
  alle 18:06 lo slot è stato ridotto da 56G/60G a 40G/44G per fare spazio a `omni-release`. La
  fase di compilazione è rimasta al `MemoryHigh` per tutta l'esecuzione (memory PSI `full`
  30–43 %) e `Runner.Listener`, che condivide il cgroup, non è riuscito a rinnovare il proprio
  job. I valori 56G/60G del proprietario, risalenti al 2026-10-17, sono stati ripristinati lo
  stesso giorno. Al di sotto di tali valori la build non fallisce: entra in thrashing e il job
  viene perso.
- **Release-Green dispone di uno slot dedicato (2026-10-18).** Fino ad allora entrambe le
  convalide Release-Green venivano eseguite su `omni-build`: a ogni push (~10/ora, 97 esecuzioni
  push su 100 annullate a metà lavorazione in un giorno) e con tre scansioni complete da ~2 h al
  giorno (quella delle 05:29 ha atteso 6 h per lo slot) — il singolo slot di build era impegnato
  ben oltre la propria capacità e le build delle PR dall'origine attendevano per ore.
  `release-green` e `main-green` ora usano come destinazione `omni-release` (solo
  `omniroute-113-6`) con `OMNIROUTE_USE_TURBOPACK=0`, e un'esecuzione avviata non viene più
  annullata da un push più recente (lo slot in attesa continua a compattare la raffica).
  `tests/unit/build/runner-capacity-routing.test.ts` fissa l'instradamento, il passaggio a webpack
  e il fatto che nulla su `omni-release` venga compilato con Turbopack.
- **Pool leggero: `omni-light`.** `omniroute-113` e `omniroute-113-2` eseguono i job notturni che
  richiedono una `next build` solo backend (~5–6 GB; webpack) e `lint-guard` di `quality.yml`.
  `omniroute-113` aveva `MemoryHigh=4G` fino al 2026-10-18 — lì la build promptfoo ha proceduto
  recuperando memoria per 54 minuti; 8 GB eliminano il throttling.
- **Meno listener di proposito.** Quattro unità OmniRoute sono state disabilitate il 2026-08-29
  — ogni listener aggiuntivo è un altro tenant per il budget di memoria indicato sopra. Il limite
  del janitor è 8 (`MAX_ACTIVE_RUNNERS=8` in cron): conteggia ogni `Runner.Listener` presente
  sulla macchina, mentre OmniHeuris + OmniMind ne aggiungono due ai nostri cinque.
- **I job Unit e Vitest restano ospitati.** `ci.yml` invia i suoi shard unit e il job Vitest a
  `[self-hosted, omni-ci]` solo quando la variabile di repository `vars.USE_VPS_TEST_RUNNER` è
  `true`, e in tal caso solo per le esecuzioni `pull_request` dallo stesso repository; fork, `merge_group` e push
  restano su `ubuntu-latest` (`tests/unit/vps-runner-variable-scope.test.ts`). La variabile è
  `false`. Il 2026-10-28 tre listener `omni-ci` da 4 core hanno impiegato 250–270 s per `npm ci` e ogni
  shard unit ha raggiunto il limite di 30 minuti per job, contro ~634 s per uno shard ospitato, con la macchina a un carico
  di 17–24. I listener sono stati eliminati. Non riattivare la variabile senza listener dimensionati per
  uno shard unit.
- **Non pulire mai `/tmp` o `_work` manualmente mentre un runner è occupato.** Un controllo
  seguito da un'eliminazione, con un intervallo tra le due operazioni, è il motivo per cui un job
  Build attivo ha perso la propria directory `_work` il 2026-08-27. Il janitor esegue il controllo
  e la rimozione in un unico passaggio; lascia che se ne occupi.
- L'arresto di un runner durante un job annulla il job (osservato dal vivo): usare `systemctl stop`
  solo quando il relativo listener non ha alcun processo figlio `Runner.Worker` — ed eseguire
  l'operazione con un solo comando.
- I workflow non devono depositare artefatti in `/tmp` (è RAM). Scaricare in
  `$RUNNER_TEMP` (su disco, specifico per ogni runner) — l'artefatto `next-build` da 1,3 GB ha
  impiegato 27–32 minuti per arrivare sul tmpfs e 2 minuti per essere caricato dal disco.
- Il VPS `.15` è destinato esclusivamente all'omologazione — non esegue mai runner CI.

## Corsia ospitata (runner ospitati da GitHub)

Il repository appartiene all'organizzazione `cheaper-inference`, sul piano **Team**: **60
job ospitati simultanei**, condivisi da ogni repository dell'organizzazione, ogni controllo delle PR,
ogni workflow attivato da un push e la configurazione predefinita di CodeQL. I dati seguenti sono stati misurati
sul piano **Pro** (40 job ospitati simultanei). Misurazioni effettuate il 2026-10-18 durante una
campagna di merge (~10 merge/ora su `release/v3.8.52`): **2.500 esecuzioni di workflow create in
24 h**, 44 push al branch in 6 h, **106 job ospitati in coda** mentre i controlli delle PR attendevano per
ore e le PR venivano unite senza tali controlli. Nove workflow venivano attivati a ogni push sul branch:

| per push su `release/v*`                         | job ospitati | risultato durante la tempesta                                  | dal 2026-10-18                                                                  |
| ------------------------------------------------ | -----------: | -------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `ci.yml` (matrice completa)                      |    fino a 30 | annullato dal push successivo, 24 su 24 in un giorno           | non avviato per i push su `release/**` (esecuzione PR + Release-Green)          |
| `quality.yml`                                    |           ~6 | annullato, 23 su 23                                            | non avviato per i push su `release/**`                                          |
| `Release-Green` `--quick`                        |            0 | eseguito su `omni-build`, annullato 97 volte su 100            | slot `omni-release`, mai annullato, le esecuzioni in sospeso si accorpano       |
| `Lock released branch`, `OpenSSF Scorecard`      |            2 | un'esecuzione in coda per push                                 | un'esecuzione per ref (`tests/unit/build/hosted-lane-concurrency.test.ts`)      |
| `Release acceptance` (report shadow)             |            1 | un `npm ci` ospitato per push, mai annullato                   | invariato — candidato per un filtro `paths:`                                    |
| `Publish to Docker Hub` → `Deploy to VPS`        |            2 | annullato a ogni push; il ramo amd64 compete su `omni-build`   | invariato — canale di distribuzione del proprietario                            |
| Configurazione predefinita di CodeQL (`dynamic`) |            4 | `javascript-typescript`, `actions`, `c-cpp`, `python` per push | invariato — Settings → Code security; `c-cpp`/`python` non analizzano nulla qui |

`tests/unit/build/push-storm-diet.test.ts` vincola il trigger dei push di `ci.yml` e
`quality.yml` al solo `main`. Effetto collaterale: Codecov non riceve più un caricamento di base per ogni push
di release (il passaggio è informativo e usa `continue-on-error`); il controllo della copertura nel repository e il commento
sulla PR non subiscono modifiche.

**Una maggiore capacità self-hosted non risolve la coda ospitata.** La devbox
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) potrebbe ospitare un runner, ma le sessioni degli agenti mantengono già
il suo carico tra 20 e 26, il container dell'agente non dispone di un daemon Docker e la corsia satura è
quella ospitata. Nello stesso momento, il box `.113` disponeva di 71 GB liberi e aveva un carico tra 5 e 8; il suo vincolo
è il budget di memoria per listener indicato sopra (limite massimo di 6 listener), non la CPU. Le leve rimanenti
riguardano i processi: integrare le PR della campagna tramite la coda di Mergify (`label=queue`, i batch condividono
un'unica esecuzione CI `merge_group` anziché un'esecuzione per PR più una per push), ridurre i linguaggi della
configurazione predefinita di CodeQL e filtrare `release-acceptance.yml` in base ai file che legge.
