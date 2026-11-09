# Self-Hosted Runner Box Operations (.113 pool) (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Le pool auto-hébergé s’exécute sur la machine **.113** (`tomni-proxmox-113`). Depuis le 2026-10-18, chaque
runner OmniRoute possède **un seul rôle**, un seul label et un budget mémoire/CPU dimensionné selon
les mesures de sa charge de travail. Le slot Turbopack reçoit les ressources nécessaires au build ;
les autres slots sont dimensionnés selon leurs pics mesurés. La machine n’est en surallocation que
lorsqu’un build Turbopack coïncide avec un build webpack Release-Green et une tâche de lint ; le swap
de l’hôte (16 GB) absorbe cette charge et, comme les builds des pull requests s’exécutent sur des
runners hébergés, le slot Turbopack reste inactif la plupart du temps :

| runner               | label          | rôle                                                                                                                                                        | `MemoryHigh` / `MemoryMax` | `CPUQuota`   |
| -------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------ |
| `omniroute-113-5`    | `omni-build`   | Builds Turbopack : `ci.yml` `Build` (push/dispatch uniquement), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, le build a11y nocturne | 56 GB / 60 GB (swap 0)     | 1600 %       |
| `omniroute-113-6`    | `omni-release` | Release-Green (`release-green` + `main-green`), build webpack                                                                                               | 20 GB / 24 GB (swap 4 GB)  | 800 %        |
| `omniroute-113-2`    | `omni-light`   | exécutions nocturnes (Schemathesis, promptfoo, garak, k6) et `quality.yml` `lint-guard`                                                                     | 12 GB / 16 GB (swap 4 GB)  | 600 %        |
| `omniroute-113`      | `omni-light`   | même pool que ci-dessus                                                                                                                                     | 8 GB / 12 GB               | 400 %        |
| OmniHeuris, OmniMind | (leurs dépôts) | Dependabot uniquement (pic de 155 MB chacun, 2026-10-18)                                                                                                    | 4 GB / 6 GB                | 200 % chacun |

Mesures du 2026-10-18 :

| ressource | valeur                             | conséquences pour la planification                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| RAM / CPU | **78 GB / 32 cœurs**               | un build de production Turbopack sans limite a atteint un pic de 49 GB (`tests/unit/ci-build-bundler-webpack.test.ts`) ; avec Next 16.3.8, la phase de compilation à elle seule occupe environ 40 GB (36 GB de RSS dans `next-build`, plus 17 workers de chargement à 3 GB, mesures du 2026-10-18) ; un build webpack utilise environ 14–16 GB. Un build Turbopack et un build webpack peuvent s’exécuter ensemble ; deux builds Turbopack ne le peuvent pas |
| swap      | 16 GB                              | `omniroute-113-5` s’exécute avec le swap désactivé (`MemorySwapMax=0`), afin qu’un build qui s’emballe soit interrompu lorsqu’il atteint sa limite plutôt que de faire swapper la machine                                                                                                                                                                                                                                                                    |
| `/tmp`    | **tmpfs de 12 GB = RAM**           | tout ce qui y est stocké occupe de la mémoire ; les résidus sont supprimés après 3 h                                                                                                                                                                                                                                                                                                                                                                         |
| CPU       | charge de 60 observée sur 32 cœurs | avant l’application des quotas, un build Turbopack (~1166 % de CPU) combiné à une suite de couverture sur la même machine empêchait les autres listeners d’envoyer leurs signaux de vie (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                                                                |
| runners   | **7 listeners** (2026-10-28)       | 5 OmniRoute + OmniHeuris + OmniMind ; `omniroute-113-7` porte aussi `omni-build` ; `omniroute-113-3/-4/-8` ont été supprimés du dépôt (2026-10-28)                                                                                                                                                                                                                                                                                                           |

Les limites se trouvent dans le fichier
`/etc/systemd/system/actions.runner.<…>.service.d/override.conf` de chaque unité
(les valeurs précédentes sont conservées dans `override.conf.bak-20261018`) et ont été appliquées
à chaud avec `systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — sans
redémarrage, de sorte qu’aucune tâche en cours d’exécution n’a été affectée. Les labels sont modifiés
à l’aide de l’API des runners (`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), également à chaud.

## Installer le nettoyeur (une seule fois, sur la machine)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root) : toutes les 30 min, journalisation dans /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` est requis : le nettoyeur vérifie qu'un chemin est inactif à l'aide d'un instantané unique des fichiers ouverts avant de le supprimer ; sans cet outil, il ne supprime rien et l'indique explicitement (code de sortie 1). Testez d'abord toute modification avec `--dry-run` : cette option affiche exactement ce qui serait fait sans rien modifier.

Ce qu'il fait à chaque exécution : supprime nos propres résidus (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) après **3 h sur tmpfs** et 24 h sur le disque
dans `_work/_temp` ; tue un processus `next-build` vieux de plus de 75 min (aucun job ne dure aussi longtemps — le
2026-08-27, l'un d'eux a tourné pendant 70 min après que GitHub avait déclaré son job perdu) ; élague les
checkouts vieux de 48 h des runners dont l'unité est **arrêtée** ; émet une alerte si l'utilisation du disque est ≥ 85 %, si la PSI mémoire
`full/avg60` est ≥ 10 %, et si le nombre de listeners dépasse `MAX_ACTIVE_RUNNERS` (avec une
répartition omniroute/autres). Code de sortie 1 = intervention requise ; consultez le journal.

La règle des 75 minutes ne détecte pas un build dont GitHub a déjà abandonné le job. Lorsque
`Runner.Listener` ne peut pas renouveler son job, `_diag/Runner_*.log` affiche
`POST request to …/renewjob timed out after 100 seconds`, l'API indique que le job est `completed`
(échec) environ dix minutes après le dernier renouvellement réussi, et `next-build` continue de s'exécuter
sans job associé (2026-10-18 : le build de #17066 a été déclaré en échec à 19:43 et son processus de build
occupait toujours 40 Go cinq minutes plus tard). Confirmez la référence dans le fichier `_diag/Worker_*.log` le plus récent, puis
envoyez SIGTERM uniquement à l'arborescence de processus du build, en ciblant son PID — `next-build`, `npm run build`, `build-next-isolated.mjs` et
les workers de `_work`. Ne touchez jamais à `Runner.Listener`, `RunnerService.js` ou `Runner.Worker` :
le worker signale le job comme annulé et le listener se remet en ligne de lui-même.

## Unités des runners : KillMode

Le paramètre `KillMode=process` par défaut du runner laisse `Runner.Worker → npm → next-build`
actif lorsqu'une unité est arrêtée ou redémarrée — un build orphelin continue de consommer de la RAM et
du CPU sans qu'aucun job ne lui soit associé. Chaque unité OmniRoute comporte un drop-in
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
avec `KillMode=mixed` : SIGTERM est d'abord envoyé au listener, puis SIGKILL à l'ensemble du cgroup à
`TimeoutStop`. Ce paramètre prend effet au prochain redémarrage de l'unité — redémarrez **un seul runner à
la fois, uniquement lorsqu'il est inactif**, en effectuant la vérification d'inactivité et le redémarrage dans la même commande.

## Règles d'exploitation

- **Une seule compilation Turbopack à la fois — imposée par un label.** Chaque job qui exécute un
  `next build` Turbopack complet cible `[self-hosted, omni-build]`, et seul **`omniroute-113-5`**
  porte ce label : `ci.yml` `Build`, `npm-publish.yml` `publish`, `nightly-v4-build`,
  `preview-artifact`, la compilation a11y nocturne (#16853) et **amd64** dans
  `docker-publish.yml` (webpack dans BuildKit — Turbopack y a paniqué, exécution 33253576569).
  La branche Docker arm64 reste sur `ubuntu-24.04-arm`. La branche amd64 de `docker-publish`
  partage le groupe de concurrence `heavy-build-main` avec `Build` dans `ci.yml`
  (`cancel-in-progress: false`). Docker Engine doit être installé sur `omniroute-113-5`. Un
  deuxième créneau Turbopack ne tient pas dans 78 Go (2 × 33–37 Go, plus le reste de la machine) ;
  un deuxième créneau n'est sûr que pour les compilations webpack.
- **Les compilations des pull requests s'exécutent sur l'infrastructure hébergée (2026-10-18).**
  `Build` dans `ci.yml` n'atteint `omni-build` que pour `push` et `workflow_dispatch` ; chaque
  compilation de `pull_request` (de même origine ou issue d'un fork) et de `merge_group`
  s'exécute sur `ubuntu-latest` avec webpack. Lorsque chaque PR de même origine était dirigée
  vers ce créneau, une compilation Turbopack l'occupait pendant 29 à 58 min, 18 compilations
  sont restées en file d'attente jusqu'à 18 h, et la compilation push de la branche de release
  elle-même n'a obtenu le créneau qu'une fois sur 40 jobs. Sur l'infrastructure hébergée, la
  même compilation de PR prend 8 à 12 min en parallèle des autres jobs de la PR. Turbopack,
  le bundler livré par `npm-publish`, continue d'être exercé sur la branche de release par la
  compilation a11y nocturne de la branche par défaut (04:41 UTC), par chaque compilation push
  ou dispatch qui atteint le créneau, ainsi que par `npm-publish` lui-même.
  `tests/unit/build/heavy-build-queue.test.ts` verrouille la condition à quatre clauses.
- **Ne jamais dimensionner le créneau Turbopack en dessous de son besoin mesuré.** Le 2026-10-18
  à 18:06, le créneau a été abaissé de 56G/60G à 40G/44G pour faire de la place à
  `omni-release`. La phase de compilation est restée au niveau de `MemoryHigh` pendant toute
  son exécution (PSI mémoire `full` de 30 à 43 %), et le `Runner.Listener`, qui partage le
  cgroup, n'a pas pu renouveler son job. Les valeurs 56G/60G du propriétaire, datant du
  2026-10-17, ont été rétablies le même jour. En dessous de ces valeurs, la compilation
  n'échoue pas ; elle s'enlise dans la pagination, et le job est perdu.
- **Release-Green dispose de son propre créneau (2026-10-18).** Jusqu'alors, les deux validations
  Release-Green s'exécutaient sur `omni-build` : à chaque push (~10/heure, 97 exécutions push
  sur 100 annulées en cours de travail en une journée) et lors de trois balayages complets
  d'environ 2 h par jour (celui de 05:29 a attendu le créneau pendant 6 h) — l'unique créneau
  de compilation était plusieurs fois sursouscrit et les compilations de PR de même origine
  attendaient pendant des heures. `release-green` et `main-green` ciblent désormais
  `omni-release` (`omniroute-113-6` uniquement) avec `OMNIROUTE_USE_TURBOPACK=0`, et une
  exécution démarrée n'est plus annulée par un push plus récent (le créneau en attente
  continue d'absorber la rafale). `tests/unit/build/runner-capacity-routing.test.ts`
  verrouille le routage, le basculement vers webpack et garantit que rien sur `omni-release`
  n'est compilé avec Turbopack.
- **Pool léger : `omni-light`.** `omniroute-113` et `omniroute-113-2` exécutent les tâches
  nocturnes nécessitant un `next build` limité au backend (~5–6 Go ; webpack), ainsi que
  `lint-guard` dans `quality.yml`. `omniroute-113` avait `MemoryHigh=4G` jusqu'au 2026-10-18 —
  la compilation promptfoo y a passé 54 minutes à récupérer de la mémoire ; 8 Go suppriment
  cette limitation.
- **Moins de listeners, volontairement.** Quatre unités OmniRoute ont été désactivées le
  2026-08-29 — chaque listener supplémentaire est un locataire de plus pour le budget mémoire
  ci-dessus. Le plafond du janitor est fixé à 8 (`MAX_ACTIVE_RUNNERS=8` dans cron) : il compte
  chaque `Runner.Listener` sur la machine, et OmniHeuris + OmniMind en ajoutent deux à nos cinq.
- **Les jobs unit et Vitest restent hébergés.** `ci.yml` envoie ses shards unit et le job Vitest vers `[self-hosted, omni-ci]` uniquement lorsque la variable de dépôt `vars.USE_VPS_TEST_RUNNER` vaut `true`, et seulement pour les exécutions `pull_request` du même dépôt ; les forks, `merge_group` et les push restent sur `ubuntu-latest` (`tests/unit/vps-runner-variable-scope.test.ts`). La variable vaut `false`. Le 2026-10-28, trois listeners `omni-ci` à 4 cœurs ont mis 250–270 s pour `npm ci` et chaque shard unit a atteint la limite de 30 minutes par job, contre ~634 s pour un shard hébergé, avec une charge de 17–24 sur la machine. Les listeners ont été supprimés. Ne réactivez pas la variable sans listeners dimensionnés pour un shard unit.
- **Ne jamais nettoyer `/tmp` ou `_work` manuellement lorsqu'un runner est occupé.** Une
  vérification suivie d'une suppression avec un intervalle entre les deux est la raison pour
  laquelle un job Build actif a perdu son `_work` le 2026-08-27. Le janitor effectue la
  vérification et la suppression en une seule étape ; laissez-le faire.
- Arrêter un runner en plein job annule le job (observé en direct) : n'exécuter
  `systemctl stop` que lorsque son listener n'a aucun enfant `Runner.Worker` — et le faire en
  une seule commande.
- Les workflows ne doivent pas stocker d'artefacts dans `/tmp` (c'est de la RAM).
  Téléchargez-les dans `$RUNNER_TEMP` (sur disque, pour chaque runner) — l'artefact
  `next-build` de 1,3 Go a mis 27 à 32 minutes à arriver sur le tmpfs, contre 2 minutes pour
  être téléversé depuis le disque.
- Le VPS `.15` est réservé à l'homologation — il n'exécute jamais de runners CI.

## Voie hébergée (exécuteurs hébergés par GitHub)

Le dépôt appartient à l’organisation `cheaper-inference`, sur l’offre **Team** : **60 tâches hébergées simultanées**, partagées entre tous les dépôts de l’organisation, tous les contrôles de PR, tous les workflows déclenchés par un push et la configuration par défaut de CodeQL. Les chiffres ci-dessous ont été mesurés avec l’offre **Pro** (40 tâches hébergées simultanées). Mesures effectuées le 2026-10-18 pendant une
campagne de fusion (~10 fusions/heure sur `release/v3.8.52`) : **2 500 exécutions de workflows créées en
24 h**, 44 push vers la branche en 6 h, **106 tâches hébergées en attente** tandis que les contrôles de PR attendaient
pendant des heures et que les PR étaient fusionnées sans eux. Neuf workflows se déclenchaient à chaque push vers la branche :

| par push vers `release/v*`                     | tâches hébergées | résultat pendant la tempête                                      | depuis le 2026-10-18                                                             |
| ---------------------------------------------- | ---------------: | ---------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `ci.yml` (matrice complète)                    |       jusqu’à 30 | annulées par le push suivant, 24 sur 24 en une journée           | non lancé pour les push sur `release/**` (exécution de PR + Release-Green)       |
| `quality.yml`                                  |               ~6 | annulées, 23 sur 23                                              | non lancé pour les push sur `release/**`                                         |
| `Release-Green` `--quick`                      |                0 | exécuté sur `omni-build`, 97 sur 100 annulées                    | créneau `omni-release`, jamais annulé, les exécutions en attente sont regroupées |
| `Lock released branch`, `OpenSSF Scorecard`    |                2 | une exécution mise en file d’attente par push                    | une exécution par référence (`tests/unit/build/hosted-lane-concurrency.test.ts`) |
| `Release acceptance` (rapport fantôme)         |                1 | un `npm ci` hébergé par push, jamais annulé                      | inchangé — candidat à un filtre `paths:`                                         |
| `Publish to Docker Hub` → `Deploy to VPS`      |                2 | annulées à chaque push ; l’étape amd64 rivalise sur `omni-build` | inchangé — canal de déploiement du propriétaire                                  |
| Configuration par défaut de CodeQL (`dynamic`) |                4 | `javascript-typescript`, `actions`, `c-cpp`, `python` par push   | inchangé — Paramètres → Sécurité du code ; `c-cpp`/`python` n’analysent rien ici |

`tests/unit/build/push-storm-diet.test.ts` verrouille le déclencheur de push limité à `main` de `ci.yml` et
`quality.yml`. Effet secondaire : Codecov ne reçoit plus de téléversement de base à chaque push de release (cette
étape est informative et utilise `continue-on-error`) ; le contrôle de couverture intégré au dépôt et le commentaire de PR ne sont
pas affectés.

**Davantage de capacité auto-hébergée ne résout pas la file d’attente hébergée.** La machine de développement
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) pourrait héberger un exécuteur, mais les sessions d’agents maintiennent déjà
sa charge entre 20 et 26, le conteneur de l’agent ne dispose d’aucun démon Docker, et la voie saturée est
celle des exécuteurs hébergés. La machine `.113` disposait de 71 GB libres et affichait une charge de 5 à 8 au même moment ; sa contrainte
est le budget mémoire par écouteur indiqué ci-dessus (plafond de 6 écouteurs), et non le CPU. Les leviers restants
relèvent des processus : fusionner les PR de la campagne via la file d’attente Mergify (`label=queue` ; les lots partagent
une seule exécution de CI `merge_group` au lieu d’une exécution par PR plus une par push), réduire les langages de la
configuration par défaut de CodeQL et filtrer `release-acceptance.yml` selon les fichiers qu’il lit.
