# 🐳 Docker Guide — OmniRoute (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Référence complète du déploiement avec Docker. Pour démarrer rapidement, consultez la [section Docker du README](../README.md#-docker).

## Table des matières

- [Exécution rapide](#quick-run)
- [Avec un fichier d’environnement](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Profils disponibles](#available-profiles)
- [Configuration des outils CLI de l’hôte lorsqu’OmniRoute s’exécute dans Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Conteneur compagnon Redis](#redis-sidecar)
- [Configuration Compose pour la production](#production-compose)
- [Étapes du Dockerfile](#dockerfile-stages)
- [Variables d’environnement critiques](#critical-environment-variables)
- [Docker Compose avec Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Tunnel rapide Cloudflare](#cloudflare-quick-tunnel)
- [Étiquettes d’image](#image-tags)
- [Mises à jour du tableau de bord dans Docker](#dashboard-updates-in-docker)
- [Disponibilité : SQLite par défaut ne prend en charge qu’un seul réplica](#availability-default-sqlite-is-single-replica)
- [Erreurs régionales de Gemini dans Docker](#gemini-regional-errors-inside-docker)
- [Remarques importantes](#important-notes)

---

## Exécution rapide

> **Auto-hébergement en une seule commande ?** Consultez le [guide d'auto-hébergement](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (image publiée + Redis, bouclage uniquement, aucun choix de profil). L'exécution rapide ci-dessous est le chemin d'accès à un seul conteneur pour les utilisateurs qui exécutent déjà Redis ailleurs.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Avec fichier d'environnement

```bash
# Copy and edit .env first
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Docker Compose

```bash
# Profil de base (sans outils CLI)
docker compose --profile base up -d

# Profil CLI (Claude Code, Codex et OpenClaw intégrés)
docker compose --profile cli up -d

# Profil hôte (principalement pour Linux ; monte les exécutables CLI de l’hôte en lecture seule)
docker compose --profile host up -d

# Profil web (Chromium/Playwright pour les fournisseurs utilisant des sessions web)
docker compose --profile web up -d

# Combiner CLI avec le conteneur compagnon CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Profils disponibles

OmniRoute fournit des profils Compose adaptés aux principales configurations de déploiement. Choisissez celui qui correspond à votre environnement.

| Profil          | Service          | Cas d’utilisation                                                                                                                                               | Commande                                     |
| --------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (défaut) | `omniroute-base` | Serveur sans interface graphique / environnement d’exécution minimal, sans CLI de fournisseurs incluses                                                         | `docker compose --profile base up -d`        |
| `cli`           | `omniroute-cli`  | Flux de travail agentiques appelant `omniroute providers/setup/doctor` et les CLI incluses (Codex, Claude Code, Droid, OpenClaw)                                | `docker compose --profile cli up -d`         |
| `host`          | `omniroute-host` | Hôtes Linux souhaitant un accès de type `network_mode` aux CLI de l’hôte en montant `~/.local/bin`, `~/.codex`, `~/.claude`, etc. en lecture seule              | `docker compose --profile host up -d`        |
| `cliproxyapi`   | `cliproxyapi`    | Exécuter le conteneur compagnon [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sur le port `8317` afin de relayer les CLI en amont                 | `docker compose --profile cliproxyapi up -d` |
| `web`           | `omniroute-web`  | Fournisseurs utilisant des sessions web et nécessitant un navigateur : `gemini-web`, `claude-web`, `claude-turnstile` (construit `runner-web`, Chromium inclus) | `docker compose --profile web up -d`         |

> Plusieurs profils peuvent être combinés : `docker compose --profile cli --profile cliproxyapi up -d`.

## Configuration des outils CLI de l’hôte lorsque OmniRoute s’exécute dans Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` et le bouton
**Enregistrer la configuration** du tableau de bord écrivent tous des fichiers tels que `~/.codex/*.config.toml`. Ces chemins
n’ont de sens que sur la machine où la CLI s’exécute réellement. Si vous les exécutez dans
le conteneur, l’écriture s’effectue dans le répertoire personnel du conteneur (`/home/node` —
l’image s’exécute avec `USER node`), qu’aucune CLI de l’hôte ne consultera jamais et dont le contenu est
supprimé dès que le conteneur est recréé.

OmniRoute détecte cette situation et refuse l’écriture en fournissant des instructions au lieu de
signaler une réussite dont vous ne pourriez pas profiter : la CLI se termine avec le code `2`, et l’API répond `422`
avec `containerEphemeralTarget: true`.

### Recommandation : exécuter la CLI sur l’hôte et OmniRoute dans Docker

Le conteneur fournit l’API ; la CLI configure les outils de votre hôte.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # dirige la CLI vers le conteneur
omniroute setup-codex                      # écrit dans le véritable ~/.codex sur votre hôte
```

C’est le bon choix lorsque Codex, Claude Code, Cursor ou des outils similaires s’exécutent sur votre
ordinateur portable — ce qui constitue la configuration habituelle.

### Alternative : monter les répertoires de configuration de l’hôte avec bind mount (profil `host`)

Si vous souhaitez que le conteneur lui-même écrive dans la configuration de votre hôte, montez les
répertoires et faites pointer `CLI_CONFIG_HOME` vers la racine du montage. Le profil `host`
le fait déjà :

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Un bind mount est ce qui rend le chemin fiable : OmniRoute lit
`/proc/self/mountinfo` et autorise les écritures dans les chemins montés (ainsi que dans les répertoires
dont les enfants sont des montages, ce qui correspond exactement à la structure `/host-home` ci-dessus), tout en
continuant à refuser les chemins non montés.

### Échappatoire : configurer les propres CLI du conteneur (à utiliser avec parcimonie)

Lorsque les CLI se trouvent réellement dans le conteneur (profil `cli`), l’écriture
est intentionnelle. Transmettez `--allow-container-write` à toute commande `setup-*`, ou définissez
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` pour le serveur. L’écriture s’effectue
avec un avertissement indiquant qu’elle ne survivra pas au conteneur.

> **Avertissement de sécurité — profil `cli` + montage de `docker.sock`.**
> Le profil `cli` monte `/var/run/docker.sock` avec bind mount afin que le programme de mise à jour automatique
> exécuté dans le conteneur puisse recréer la pile depuis le démon de l’hôte
> (`src/lib/system/autoUpdate.ts` recherche ce socket et ignore le
> chemin Docker lorsqu’il est absent). Ce socket constitue **une frontière de confiance donnant un accès root à l’hôte** :
> tout ce qui peut y accéder contrôle le démon Docker de l’hôte en tant que
> root — et peut créer, inspecter, arrêter et supprimer n’importe quel conteneur sur l’hôte.
> Conséquences :
>
> 1. **N’exposez jamais le port du profil `cli` au réseau.** Publiez-le
>    sur `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — un profil `cli` accessible depuis le réseau local transforme toute RCE au niveau du tableau de bord en
>    compromission complète de l’hôte.
> 2. **Ne montez aucun répertoire supplémentaire de l’hôte dans le profil `cli`.**
>    Le socket Docker associé à tout montage supplémentaire donne au conteneur un accès complet en
>    lecture/écriture à votre système de fichiers et à la configuration de l’hôte. Si un outil doit
>    accéder à un projet, exécutez-le localement avec le binaire CLI — ne le montez pas
>    dans le conteneur `cli`.
>
> Si vous n’avez pas besoin de la mise à jour automatique depuis le conteneur, laissez le profil `cli` désactivé
> (`COMPOSE_PROFILES=core,redis` ou une valeur plus courte). Les autres profils ne
> montent pas le socket Docker.
>
> Consultez `docs/security/MITM-TPROXY-DECRYPT.md` (git ; non compilé dans `/docs`) pour le modèle de menace associé
> concernant les attaques MITM, ainsi que `docs/security/SUPPLY_CHAIN.md` pour la
> chaîne de provenance des binaires `codex`/`claude-code`/`droid`/`openclaw`.

## Sidecar Redis

OmniRoute s’appuie sur Redis pour prendre en charge le limiteur de débit distribué et le cache partagé. Le service `redis` est **toujours défini** dans `docker-compose.yml` (il n’est conditionné par aucun profil) et démarre avec n’importe quel autre profil.

| Détail                        | Valeur                                              |
| ----------------------------- | --------------------------------------------------- |
| Image                         | `redis:7-alpine`                                    |
| Nom du conteneur              | `omniroute-redis`                                   |
| Port interne                  | `6379`                                              |
| Port de l’hôte (modifiable)   | `REDIS_PORT` (valeur par défaut : `6379`)           |
| Liaison à l’hôte (modifiable) | `REDIS_BIND_HOST` (valeur par défaut : `127.0.0.1`) |
| Volume                        | `omniroute-redis-data` → `/data`                    |
| Vérification d’état           | `redis-cli ping` (intervalle de 10 s)               |

Variables d’environnement associées :

- `REDIS_URL` — chaîne de connexion injectée dans l’application (`redis://redis:6379` par défaut).
- `REDIS_PORT` — mappage du port côté hôte pour le conteneur Redis.
- `REDIS_BIND_HOST` — interface de l’hôte sur laquelle le port est publié. La valeur par défaut est `127.0.0.1`.

> **Pourquoi l’interface de bouclage par défaut :** le sidecar s’exécute sans `requirepass`, et les conteneurs
> de l’application y accèdent via le réseau Compose (`redis:6379`) — le port publié sert
> uniquement aux outils exécutés côté hôte (`redis-cli`, un `npm run dev` local). Une publication sur
> `0.0.0.0` exposerait une instance Redis non authentifiée à tous les hôtes de votre réseau local. Si vous définissez
> `REDIS_BIND_HOST=0.0.0.0`, ajoutez également `--requirepass` au champ `command:` du service.

Il n’est pas recommandé de **désactiver Redis** (le limiteur de débit basculera vers une solution de secours en mémoire). Si nécessaire, supprimez/commentez le bloc du service `redis:` dans `docker-compose.yml` ou réduisez son nombre d’instances à zéro :

```bash
docker compose up -d --scale redis=0
```

## Compose de production

Pour exécuter un instantané de production isolé parallèlement à l’environnement de développement, utilisez `docker-compose.prod.yml`.

| Détail                             | Valeur                                                                                                |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Fichier                            | `docker-compose.prod.yml`                                                                             |
| Port du tableau de bord par défaut | `PROD_DASHBOARD_PORT=20130` (mappé vers le port interne `${DASHBOARD_PORT:-20128}`)                   |
| Port de l’API par défaut           | `PROD_API_PORT=20131`                                                                                 |
| Image                              | `omniroute:prod` (construite à partir de la cible `runner-cli`)                                       |
| Conteneur Redis                    | `omniroute-redis-prod` (`redis:8.6.2`, volume dédié `redis-prod-data`)                                |
| Volume de données                  | `omniroute-prod-data` (nommé, conservé entre les reconstructions)                                     |
| Vérifications d’état               | `node healthcheck.mjs` + `redis-cli ping`, avec `depends_on` conditionné par l’état de santé de Redis |

Utilisation :

```bash
# Construire et démarrer la pile de production
docker compose -f docker-compose.prod.yml up -d --build

# Afficher les journaux en continu
docker compose -f docker-compose.prod.yml logs -f

# Arrêter et supprimer la pile (conserver les volumes)
docker compose -f docker-compose.prod.yml down
```

La pile de production s’exécute en parallèle de la configuration Compose de développement (avec des noms de conteneurs, des ports et des volumes différents). Vous pouvez donc poursuivre vos itérations locales pendant que la production reste active.

## Étapes du fichier Docker

Le référentiel fournit un Dockerfile en plusieurs étapes (`Dockerfile`). Quatre étapes sont exposées ; choisissez le bon `target` pour votre cas d'utilisation.

| Scène         | Image de base         | But                                                                                                                                                                                                                                                                                                                       |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Installe deps (`npm ci --legacy-peer-deps`) et exécute `npm run build` (Turbopack par défaut — voir les ressources de construction ci-dessous)                                                                                                                                                                            |
| `runner-base` | `node:26-trixie-slim` | Exécution de production avec la sortie autonome Next.js.** Aucun fournisseur CLIs n'est fourni.**                                                                                                                                                                                                                         |
| `runner-cli`  | `runner-base`         | Ajoute `git`, `docker.io`, `docker-compose` et global CLIs: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Choisissez ceci pour les flux de travail agents.**                                                                                                                                       |
| `runner-web`  | `runner-base`         | Ajoute Playwright + un navigateur Chromium (`--with-deps`) pour les fournisseurs de sessions Web : `gemini-web`, `claude-web`, `claude-turnstile`.** Choisissez ceci lorsque vous utilisez ces fournisseurs** — l'image simple échoue au moment de la demande sans elle (voir la note `-web` sous Canaux de publication). |

Créez manuellement une cible spécifique :

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Ressources de temps de construction

Trois arguments de construction contrôlent le coût de l'étape `builder`. Ils sont uniquement au moment de la construction. — `OMNIROUTE_MEMORY_MB` (ci-dessous) est un bouton d'exécution distinct.

| Construire un argument      | Défaut | Effet                                                                                              |
| --------------------------- | ------ | -------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | `0` est construit avec webpack : mémoire maximale inférieure, plus lente. `1` opte pour Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | Plafond de tas V8 (`--max-old-space-size`) pour le `next build` généré.                            |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | Nourrit `CIRCLE_NODE_TOTAL`; Next dérive `workers = N - 1` pour la collecte de données de page.    |

`OMNIROUTE_BUILD_WORKERS` est celui à élever sur un gros constructeur et celui à soupçonner lorsqu'une construction contrainte meurt** après** `✓ Compiled successfully`. Chaque travailleur de données de page est son propre processus, tout comme le `next build` parent lui-même ; une reproduction VPS en direct (problème #7518) a mesuré le pic RSS de chaque processus à ~ 4,5 GB indépendamment de l'indicateur de tas `NODE_OPTIONS` (Turbopack compile dans la mémoire native/Rust en dehors du tas V8). La valeur par défaut de `2` (→ 1 worker, 2 processus au total) est dimensionnée pour les 16 exécuteurs GB / 4 vCPU hébergés sur GitHub que le pipeline de publication utilise. Sur `8` (→ 7 Workers), ce coureur a manqué de mémoire et buildkit a échoué à l'étape avec `ResourceExhausted: ... cannot allocate memory`; `3` (→ 2 Workers) ne correspondait toujours pas une fois que le RSS par processus était mesuré directement au lieu d'être déduit. `tests/unit/docker-build-memory-budget.test.ts` fait l'arithmétique par rapport au chiffre mesuré et échoue si l'un des boutons devient trop grand pour le coureur.

Turbopack compile dans la mémoire native de Rust qui vit** dehors** le tas V8, donc `OMNIROUTE_BUILD_MEMORY_MB` ne le limite pas. Sur un hôte avec un plafond de mémoire, la construction est alors SIGKILLed par le tueur OOM sans aucun texte d'erreur — elle s'arrête simplement au milieu de `Creating an optimized production build`, ce qui se lit comme un blocage plutôt que comme un manque de mémoire. C'est pourquoi le `Dockerfile` est par défaut webpack (`OMNIROUTE_USE_TURBOPACK=0`), contrairement à `npm run dev` / `npm run build`, où Turbopack est le code par défaut : un `docker build .` nu sans arguments de construction (ce que Railway et d'autres hôtes en un clic exécutent) ne doit pas mourir silencieusement sur un constructeur à mémoire limitée. Les images publiées transmettent déjà explicitement `OMNIROUTE_USE_TURBOPACK=0` dans `docker-publish.yml`. Sur un constructeur avec beaucoup de RAM, optez pour Turbopack pour une construction plus rapide :

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` est activé, donc `next build` exécute un parent** et** un processus de travail et chacun honore `OMNIROUTE_BUILD_MEMORY_MB` séparément. Dimensionnez le plafond du conteneur au-dessus d'environ deux fois cette valeur, pas une seule fois.

Mesuré sur cet arbre (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`) :

| Regroupeur | Plafond de conteneur | Résultat                            |
| ---------- | -------------------- | ----------------------------------- |
| Turbopack  | 8 GiB / 16 GiB       | OOM-tué sur les deux, en silence    |
| pack Web   | 8 GiB                | construire un travailleur SIGKILLed |
| pack Web   | 12 GiB               | réussi, culminé à 11,1 GiB          |

### Paramètres d'exécution par défaut

Valeurs par défaut exportées par `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Comportement de la mémoire dans Docker:

- L'image définit `OMNIROUTE_MEMORY_MB=1024` et en dérive `NODE_OPTIONS=--max-old-space-size=1024`.
- Le processus serveur réel est démarré par le lanceur autonome, qui lit `OMNIROUTE_MEMORY_MB` et ajoute `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node utilise la dernière valeur `--max-old-space-size` répétée, donc la définition `OMNIROUTE_MEMORY_MB` contrôle la limite effective du tas Docker.
- Étant donné que l'image le définit toujours, le repli calibré par la RAM du lanceur ne s'applique jamais sous Docker. Augmentez-le explicitement pour la charge de travail (tableau ci-dessous). `2048` est encore trop petit pour l'agent de codage `/v1/responses`.

### Runtime RAM pour les agents de codage

La valeur par défaut de 1 GiB Docker est un plancher dashboard/light-chat, pas une taille de production. Les corps `POST /v1/responses` longs (des centaines de messages, des dizaines d'outils) conservent plusieurs graphiques en mémoire pendant la compression. Deux demandes de jetons ~ 3 MiB / ~ 750k qui se chevauchent ont interrompu le V8 à un moment donné.** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) et a également atteint un groupe de contrôle 16 GiB OOM. Voir [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Taille** cgroup `--memory` au-dessus du tas** Les tampons natifs —, SQLite et les intermédiaires de compression se trouvent en dehors de V8.

| Charge de travail                      | `OMNIROUTE_MEMORY_MB`          | Conteneur/groupe de contrôle | Remarques                                                                                            |
| -------------------------------------- | ------------------------------ | ---------------------------- | ---------------------------------------------------------------------------------------------------- |
| Tableau de bord, un chat léger         | `1024` (image par défaut)      | ≥2 GiB                       |                                                                                                      |
| Un agent de codage (Claude/Codex/Grok) | `8192`                         | ≥10 GiB                      | `/v1/responses` typique en une seule séance                                                          |
| Deux `/v1/responses` longs simultanés  | `10240`–`12288`                | ≥12–16 GiB                   | Abandon du V8 mesuré au ~ 12 GiB                                                                     |
| Trois contextes longs simultanés +     | ne pas faire un seul processus | sérialiser / plus RAM        | L'admission par défaut des poids lourds est de 1 en vol ; l'augmenter sans RAM réintroduit l'abandon |

`omniroute serve` sur métal nu calibre ~ à 35 % de RAM ( `[512, 4096]` serré) lorsque `OMNIROUTE_MEMORY_MB` est** désarmé** . Docker définit toujours `1024`, de sorte que l'étalonnage ne s'exécute jamais dans l'image officielle.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## Variables d’environnement critiques

Au-delà des valeurs par défaut documentées dans [ENVIRONMENT.md](../reference/ENVIRONMENT.md), les variables suivantes sont les plus importantes lors de l’exécution sous Docker :

| Variable                      | Rôle                                                                                                                                                                                                                                                                                                       | Valeur par défaut        |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Secret partagé pour le pont WebSocket. **Obligatoire en production** — définissez une chaîne aléatoire robuste.                                                                                                                                                                                            | non définie (à fournir)  |
| `REDIS_URL`                   | Chaîne de connexion pour le backend du limiteur de débit / cache                                                                                                                                                                                                                                           | `redis://redis:6379`     |
| `REDIS_PORT`                  | Port côté hôte pour le conteneur Redis inclus                                                                                                                                                                                                                                                              | `6379`                   |
| `REDIS_BIND_HOST`             | Interface hôte sur laquelle le port Redis inclus est publié (boucle locale, sauf si vous ajoutez AUTH)                                                                                                                                                                                                     | `127.0.0.1`              |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Chemin hôte monté dans le profil `cli` à l’emplacement `/workspace/omniroute` pour les processus de mise à jour automatique                                                                                                                                                                                | `.` (répertoire courant) |
| `OMNIROUTE_MEMORY_MB`         | Limite du tas Node à l’exécution pour le serveur Docker autonome ; remplace la valeur par défaut de l’image indiquée ci-dessus. Agents de codage : `8192`+ (voir [RAM d’exécution](#runtime-ram-for-coding-agents)).                                                                                       | `1024`                   |
| `DASHBOARD_PORT` / `API_PORT` | Remplace les ports exposés du tableau de bord (20128) et de l’API (20129)                                                                                                                                                                                                                                  | `20128` / `20129`        |
| `APP_BIND_HOST`               | Interface hôte sur laquelle docker-compose publie les ports du tableau de bord, de l’API et du WS en direct. Avec `REQUIRE_API_KEY=false` (valeur par défaut), `0.0.0.0` expose le proxy `/v1` anonyme au réseau local — n’élargissez l’accès qu’avec `REQUIRE_API_KEY=true` ou un proxy inverse en amont. | `127.0.0.1`              |
| `CLIPROXY_BIND_HOST`          | Interface hôte sur laquelle docker-compose publie le conteneur auxiliaire `cliproxyapi` — son volume de données contient les identifiants des fournisseurs.                                                                                                                                                | `127.0.0.1`              |
| `OMNIROUTE_PLUGINS_DIR`       | Répertoire lu par l’analyseur de plugins à l’exécution et dans lequel il effectue les installations. Définissez-le lorsque les plugins sont montés par liaison : la valeur par défaut dépend de `HOME`, qu’une image n’exporte pas nécessairement.                                                         | `~/.omniroute/plugins`   |
| `OMNIROUTE_BASE_PATH`         | Sous-chemin d’URL lorsque l’application est publiée derrière un proxy inverse (par ex. `/omniroute`)                                                                                                                                                                                                       | _(vide = racine)_        |
| `NEXT_PUBLIC_BASE_URL`        | Origine publique du navigateur incluant le sous-chemin (par ex. `https://host/omniroute`)                                                                                                                                                                                                                  | non définie              |
| `PROD_DASHBOARD_PORT`         | Port du tableau de bord côté hôte pour `docker-compose.prod.yml`                                                                                                                                                                                                                                           | `20130`                  |
| `CLIPROXYAPI_PORT`            | Port côté hôte pour le conteneur auxiliaire `cliproxyapi`                                                                                                                                                                                                                                                  | `8317`                   |

## Proxy inverse sur un sous-chemin (Traefik / nginx)

Next.js `basePath` est compilé dans le bundle autonome. OmniRoute enregistre la valeur cuite dans un fichier sentinelle à la racine de l'application (écrit pendant `npm run build`; lu par `scripts/docker/ensure-docker-base-path.mjs`) et la compare avec `OMNIROUTE_BASE_PATH` au démarrage du conteneur. Lorsqu'ils diffèrent et que l'image a été créée pour la racine du domaine, le point d'entrée réécrit les manifestes autonomes, les littéraux `basePath`/`assetPrefix` intégrés (Next 16 restitue l'actif SSR URLs à partir de `assetPrefix` seul —, le correcteur y reflète le sous-chemin), l'actif `/_next/static` cuit URLs (manifestes de référence client, importations de médias, pages d'erreur pré-rendues) et le client `process.env` shim avant que `node dev/run-standalone.mjs` ne s'exécute.

### Composer la version (recommandé)

Définissez les deux variables dans `.env`, puis reconstruisez pour que l'image et le runtime soient d'accord :

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` transmet `OMNIROUTE_BASE_PATH` en tant qu'argument de construction Docker et en tant que variable d'environnement d'exécution.

### Sous-chemin d'exécution + de l'image racine prédéfinie

Les images `cheaperinference/omniroute:*` publiées sont créées pour la racine du domaine. Vous pouvez toujours définir `OMNIROUTE_BASE_PATH` au moment de l'exécution ; le conteneur corrige le bundle une fois au démarrage. Associez-le à l'origine publique correspondante :

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Configurez le proxy inverse pour transférer le** complet** chemin externe (ne supprimez pas le préfixe). Traefik doit acheminer `PathPrefix(`/omniroute `)` vers le conteneur sans `StripPrefix`, afin que Next.js reçoive `/omniroute/...` et serve les actifs de `/omniroute/_next/...`.

Le contrôle de santé Docker sonde le point de terminaison léger du cycle de vie `/healthz` préfixé par l'actif `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` reste disponible pour les diagnostics human/dashboard ; pour pointer le conteneur HEALTHCHECK vers lui (par exemple pour une application approfondie de la santé), définissez `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Ce chemin est un** profond** vérifiez (DB + monitoring summary) — approprié pour `HEALTHCHECK` peu fréquent de Docker si vous vous réinscrivez, mais** pas** pour les intervalles Kubernetes `livenessProbe`.

Pour les orchestrateurs (Kubernetes, Nomad, etc.) :

| Sonde                 | Préférer                                                                      | Éviter                                                                          |
| --------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Vivacité              | HTTP `GET /livez`, ou TCP sur le port principal (`PORT`, `20128` par défaut ) | `/api/monitoring/health` comme vivacité                                         |
| Préparation           | HTTP `GET /healthz`                                                           | Délais d'attente serrés qui traitent la boucle d'événements occupée comme morte |
| Profond / boîte noire | `/api/monitoring/health`                                                      | —                                                                               |

`/healthz` rapporte le cycle de vie du processus (`ok` / `starting` / `stopping`). `/livez` est uniquement un processus actif (200 chaque fois que le gestionnaire peut s'exécuter ; il n'attend pas d'être prêt). Les deux s'exécutent toujours sur la même boucle d'événements Node que la gestion des requêtes, de sorte que le travail de catalogue ou de compression lié au processeur peut les retarder — occupé ≠ mort. Préférez la vivacité TCP si les sondes HTTP expirent. Conseils complets sur la sonde : [Guide de surveillance — Recommandations sur la sonde Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose avec Caddy (HTTPS Auto-TLS)

OmniRoute peut être exposé en toute sécurité grâce au provisionnement automatique SSL de Caddy. Assurez-vous que l'enregistrement DNS A de votre domaine pointe vers IP de votre serveur.

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Browser-facing origin for OAuth callbacks, dashboard links, and generated public URLs.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Internal server-to-server URL for scheduled jobs / self-fetches.
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

Caddy définit les en-têtes de transfert standard pour le conteneur en amont. OmniRoute utilise `NEXT_PUBLIC_BASE_URL` comme origine publique canonique pour les rappels OAuth et les liens publics générés ; Les écritures authentifiées du tableau de bord utilisent des requêtes de même origine ainsi qu'une protection CSRF liée à la session. Activez `OMNIROUTE_TRUST_PROXY` uniquement pour les déploiements avancés dans lesquels vous souhaitez intentionnellement que OmniRoute dérive l'origine publique à partir d'en-têtes transférés fiables au lieu d'une configuration explicite.

## Tunnel rapide Cloudflare

La prise en charge du tableau de bord pour les déploiements Docker comprend un **tunnel rapide Cloudflare** activable en un clic dans `Dashboard → Endpoints`. Lors de la première activation, `cloudflared` est téléchargé uniquement si nécessaire, un tunnel temporaire vers votre point de terminaison `/v1` actuel est démarré, et l’URL `https://*.trycloudflare.com/v1` générée s’affiche directement sous votre URL publique habituelle.

Les panneaux de tunnel des points de terminaison (Cloudflare, Tailscale, ngrok) peuvent être affichés ou masqués depuis `Settings → Appearance` sans modifier l’état des tunnels actifs.

### Remarques sur les tunnels

- Les URL des tunnels rapides sont temporaires et changent après chaque redémarrage.
- Les tunnels rapides ne sont pas restaurés automatiquement après le redémarrage d’OmniRoute ou du conteneur. Réactivez-les depuis le tableau de bord lorsque cela est nécessaire.
- L’installation gérée prend actuellement en charge Linux, macOS et Windows sur `x64` / `arm64`.
- Les tunnels rapides gérés utilisent par défaut le transport HTTP/2 afin d’éviter les avertissements bruyants concernant les tampons UDP de QUIC dans les environnements de conteneurs contraints. Définissez `CLOUDFLARED_PROTOCOL=quic` ou `auto` si vous souhaitez utiliser un autre transport.
- Les images Docker incluent les certificats racines des autorités de certification du système et les transmettent à l’instance gérée de `cloudflared`, ce qui évite les échecs d’approbation TLS lorsque le tunnel s’initialise dans le conteneur.
- Définissez `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` si vous souhaitez qu’OmniRoute utilise un binaire existant au lieu d’en télécharger un.

## Balises d’images

| Image                        | Étiqueter | Taille   | Description                                            |
| ---------------------------- | --------- | -------- | ------------------------------------------------------ |
| `cheaperinference/omniroute` | `latest`  | ~ 250 Mo | Le plus haut** publié** SemVer stable (pas git `main`) |
| `cheaperinference/omniroute` | `3.8.54`  | ~ 250 Mo | Épinglez cette classe de balise pour GitOps            |

Les mêmes images sont publiées dans trois référentiels, avec les mêmes résumés par architecture : `cheaperinference/omniroute` (Docker Hub, l'organisation Cheaper Inference, à partir de la version 3.8.53), `ghcr.io/cheaper-inference/omniroute` et l'ancien `diegosouzapw/omniroute`, qui conserve son historique d'extraction et reçoit toujours chaque version. Les déploiements `diegosouzapw/omniroute` existants continuent de se mettre à jour ; changer le nom de l’image est facultatif. La version préliminaire `:next` / `:next-web` ci-dessous est publiée uniquement sur `diegosouzapw/omniroute` et GHCR.

Manifeste multiplateforme : `linux/amd64` + `linux/arm64` natif (Apple Silicon, AWS Graviton, Raspberry Pi). Docker sélectionne automatiquement l'architecture correspondante ; transmettez `--platform linux/amd64` si vous devez forcer l'émulation AMD64 sur les hôtes ARM.

### Canaux de diffusion

OmniRoute publie des canaux Docker distincts pour les versions stables, les tests de branche de version active et les versions de développement.

| Canal                           | Source                                   | Mutabilité                        | Utilisation recommandée                                                                                                               |
| ------------------------------- | ---------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned                         | Immuable                          | Déploiements de production qui épinglent une version exacte                                                                           |
| `:latest` / `:latest-web`       | Le plus haut** publié** SemVer stable    | Pointeur stable mutable           | Suit les versions stables** après** un travail de publication SemVer — fait** pas** suivre les commits `main` ou `release/v*` inédits |
| `:next` / `:next-web`           | Branche `release/v*` par défaut actuelle | Pointeur de pré-version mutable   | Test des correctifs qui ont atterri sur la branche de version active mais ne sont pas encore dans une version stable                  |
| `:main` / `:main-web`           | branche `main`                           | Pointeur de développement mutable | Tests de développement et d’intégration uniquement                                                                                    |

#### Fournisseurs de sessions Web : les images `-web`

Chaque canal ci-dessus sert également de balise `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), construite à partir de l'étape `runner-web` — la même image plus Playwright et un navigateur Chromium. L'image simple est expédiée** sans** Chrome; `gemini-web`, `claude-web` et `claude-turnstile` en ont besoin.

L'échec est différé et non au démarrage : ces fournisseurs répertorient leurs modèles et s'affichent comme connectés dans le tableau de bord, et seule la première requête échoue avec

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Si vous utilisez ces fournisseurs, extrayez la balise `-web` de la chaîne sur laquelle vous êtes déjà — rien d'autre ne change. Sur une installation npm/CLI (pas d'image Docker ), la pièce manquante équivalente est le binaire du navigateur : exécutez `npx playwright install chromium` sur l'hôte.

#### Utiliser le canal des versions préliminaires

Le canal `next` est reconstruit à chaque poussée vers la branche `release/v*` par défaut actuelle et est publié pour AMD64 et ARM64. Les anciennes branches de maintenance ne peuvent pas l'écraser. Le canal fournit une image extractible pour les correctifs qui ont fusionné dans la branche de version active avant que la prochaine balise stable ne soit coupée.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Pour Docker Compose, remplacez la balise d'image utilisée par le profil sélectionné, puis extrayez et recréez le service :

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Sécurité et recul

`next` est une chaîne flottante en pré-version. Il peut changer à chaque poussée vers la branche de version active et est** non pris en charge pour une utilisation en production** . Épinglez le résumé de l'image lors de l'évaluation d'une version spécifique :

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Avant le test, sauvegardez le volume de données OmniRoute ou le répertoire de données monté en liaison. Pour revenir en arrière, restaurez la version stable précédemment utilisée ou digérez et recréez le conteneur :

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Une version de branche de version ne peut jamais déplacer `latest`; seule une version sémantique stable éligible peut promouvoir le pointeur stable. Les images `next` conservent l'inspection de l'image de publication et le blocage de la porte de vulnérabilité CRITIQUE.

**`latest` n'est pas une garantie de devise pour git.** Les correctifs fusionnés sur `main` ou sur la branche `release/v*` active sont** pas** dans `:latest` jusqu'à ce qu'une image SemVer stable soit publiée et que le travail de publication fasse la promotion `:latest` (même résumé que ce SemVer). Si `latest` semble figé alors que GitHub affiche déjà le correctif, tirez `:next` pour tester la branche release ou attendez la balise SemVer.

| Tu veux                                                                 | Utiliser                                    |
| ----------------------------------------------------------------------- | ------------------------------------------- |
| GitOps / production qui ne doit pas dériver                             | Épinglez `:X.Y.Z` (ou le résumé de l'image) |
| Suivez les écuries publiées et acceptez une recréation à chaque version | `:latest`                                   |
| Tester les commits `release/v*` inédits                                 | `:next` (pas de production)                 |
| Testez `main`                                                           | `:main` (pas de production)                 |

## Mises à jour du tableau de bord dans Docker

Un conteneur créé à partir d’une image publiée ne peut pas se remplacer lui-même. Lorsqu’OmniRoute détecte qu’il s’exécute dans un conteneur (sans copie de travail `.git` et sans installation npm), la bannière de mise à jour du tableau de bord d’accueil affiche la commande à exécuter sur l’hôte au lieu des instructions npm/git, avec un bouton de copie :

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Le nom du service provient de `AUTO_UPDATE_SERVICE` (par défaut `omniroute`, le service défini dans `docker-compose.selfhost.yml`). `pull` ne met à jour qu’un tag flottant (`latest`, `next`) ; avec un tag fixe `:X.Y.Z`, modifiez d’abord le tag.

### Mises à jour en un clic avec un fichier déclencheur sur l’hôte

Pour que **Mettre à jour maintenant** continue de fonctionner sans monter `/var/run/docker.sock` (ce qui accorde au conteneur un accès root à l’hôte — consultez l’avertissement relatif au profil `cli` ci-dessus), définissez `DOCKER_UPDATE_TRIGGER_FILE` sur le service OmniRoute et exécutez un observateur sur l’hôte :

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Le chemin doit se trouver dans `DATA_DIR` (les valeurs relatives sont résolues par rapport à celui-ci) ; tout autre chemin est rejeté. **Mettre à jour maintenant** écrit alors `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` dans ce fichier, répond avec le code `202`, puis le tableau de bord interroge `/api/system/version` jusqu’à ce que la nouvelle version soit active avant de se recharger. Dans ce mode, OmniRoute n’exécute jamais de commande shell ou Docker. Comme pour toute action de mise à jour, la requête n’est acceptée que depuis des clients de la boucle locale ou du réseau local.

Un répertoire de données monté par liaison fournit à l’hôte un chemin stable à surveiller. Exemples d’unités `systemd` (adaptez `/srv/omniroute` au répertoire contenant votre fichier Compose et `data/`) :

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Surveiller les demandes de mise à jour du tableau de bord OmniRoute

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Récupérer et recréer le conteneur OmniRoute

[Service]
Type=oneshot
WorkingDirectory=/srv/omniroute
ExecStartPre=/usr/bin/rm -f /srv/omniroute/data/update/docker-update.request
ExecStart=/bin/sh -c 'docker compose pull omniroute || (sleep 15 && docker compose pull omniroute)'
ExecStart=/usr/bin/docker compose up -d --force-recreate omniroute
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now omniroute-update.path
```

Le service supprime la demande avant de récupérer l’image afin qu’une exécution ayant échoué ne provoque pas de boucle. Sans `DOCKER_UPDATE_TRIGGER_FILE`, le tableau de bord conserve le processus de commande manuelle.

## Disponibilité : SQLite par défaut est une réplique unique

Le stock Docker / Kubernetes OmniRoute est** un processus de nœud + un écrivain SQLite** . La haute disponibilité est** non pris en charge** sur cette topologie.

| Contrainte                              | Conséquence                                                                                                                                                                                                                                                                                                                                                                 |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Écrivain unique                         | Faire** pas** exécutez plusieurs répliques sur le même fichier SQLite. Cela corrompt le DB.                                                                                                                                                                                                                                                                                 |
| Recréer/redémarrer/ HEALTHCHECK kill    | **Panne totale** des SSE en vol, des sessions de tableau de bord et de l'état en mémoire. Chaque client connecté tombe. Les nouvelles requêtes pendant la fenêtre de point de terminaison vide obtiennent un proxy inverse**`502 Bad Gateway: Unknown error`** , pas OmniRoute JSON Les clients — ne peuvent pas distinguer cela d'une défaillance du fournisseur (#11015). |
| Même boucle d'événements que `/healthz` | Un catalogue chargé ou un tick de compression peut retarder les sondes ; un court délai d'attente puis redémarre le** seulement** réplique.                                                                                                                                                                                                                                 |

**Matrice de sonde** (voir aussi [les recommandations de la sonde Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Sonde                | Cible                                                         | Ne pas utiliser                                                                 |
| -------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Vivacité             | TCP sur `PORT` ( `20128` par défaut), ou soft HTTP `/healthz` | `/api/monitoring/health`                                                        |
| Préparation          | HTTP `GET /healthz`                                           | Délais d'attente serrés qui traitent la boucle d'événements occupée comme morte |
| Profondeur / humains | `/api/monitoring/health`                                      | Vivacité automatisée du kubelet                                                 |

**Mises à niveau :** attendez-vous à ce que chaque session soit interrompue. Égouttez les clients si vous le pouvez ; il n'y a pas de mise à jour continue sur SQLite par défaut. Composer `restart: unless-stopped` plus Docker `HEALTHCHECK` remplacera également le seul processus lorsque le conteneur est malsain — même rayon d'explosion.

Des manifestes prêts à l'emploi et un graphique Helm en direct dans `deploy/kubernetes/` et `deploy/helm/omniroute/` — voir le [guide de déploiement de Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Extrait Kubernetes pour un** réplique unique** (La recréation est requise ; ne lancez pas `replicas` sur un seul fichier SQLite ) :

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

`preStop` sleep permet à kube de supprimer les points de terminaison du service avant SIGTERM donc** nouveau** le trafic cesse de heurter le processus de mort. `/v1/responses` SSE en vol est drainé jusqu'à `SHUTDOWN_TIMEOUT_MS` (30 s par défaut) via des baux d'admission lourds (#11015). Les nouvelles requêtes qui parviennent encore au processus obtiennent `503` + `Retry-After: 5`. L'intervalle de recréation du point de terminaison vide jusqu'à ce que le remplacement soit prêt reste une panne grave — qui correspond à la topologie SQLite, et non une mauvaise configuration de la sonde.

Postgres externe / HA multi-écrivain est** pas** un chemin de stock documenté. Si vous avez besoin de HA, conservez une seule réplique ou exécutez une topologie que le projet a testée et documentée séparément. L'œuvre Postgres/MySQL vit dans [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Jusqu'à ce que cela soit livré, le seul moyen pris en charge de multiplier** grand** La capacité `/v1/responses` est de N processus indépendants (section suivante), et non `replicas > 1` sur un volume.

## Scale-out : N processus indépendants

### propriété de la rotation des jetons Codex

Les copies d'un compte Codex ne doivent pas consommer indépendamment son jeton d'actualisation à usage unique. Sur les instances qui consomment uniquement des informations d'identification synchronisées, définissez `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (alias `cx`). Laissez-le désactivé sur le propriétaire de la rotation unique. Chaque processus a toujours besoin de son propre `DATA_DIR`; cette option ne partage pas SQLite et ne fournit pas de synchronisation de jetons ni de verrouillage distribué.

L'instance passive relit la connexion lorsqu'une actualisation est nécessaire et adopte uniquement un jeton d'accès différent et non expiré. Sinon, l'actualisation est désactivée sans expirer ni désactiver la connexion ni compter une défaillance du disjoncteur d'actualisation. Les véritables échecs d'authentification en amont utilisent toujours la comptabilité des échecs normale, le temps de recharge exponentiel et l'erreur client normale ; la désactivation du compte reste permanente. Synchronisez les jetons en rotation du propriétaire avant l'expiration des jetons d'accès (le délai d'actualisation proactive par défaut est de cinq minutes) ou réimportez le fichier d'authentification Codex. Les importations passives stockent les jetons fournis sans les valider au point de terminaison du jeton. L'actualisation manuelle dashboard/API renvoie `409 refresh_disabled`; les nouvelles connexions OAuth sont inchangées. Voir [la référence sur l'environnement](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

Un processus de nœud est** un tas V8** . Deux agents de codage de jetons ~ 3 MiB / ~ 750k qui se chevauchent `POST /v1/responses` (RTK + Caveman ) abandonnent ce tas à ~ 12 Gi (`FATAL ERROR: Reached heap limit`) et peuvent OOM un cgroup de 16 Gi. Voir [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Cette mesure est une** budget mémoire** avertissement, pas un produit hard-max de deux longs `/v1/responses` simultanés. L'admission au chat lourd est contrôlée par un budget d'octets d'ingestion dérivé automatiquement (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) dimensionné à partir de ce même plafond V8/cgroup — le remplaçant vers le haut (ou en définissant l'ancien plafond de nombre de requêtes `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` ) sur un processus déjà dimensionné réintroduit l'abandon. Les petits chats, `/healthz`, `/v1/models` et MCP sont** pas** dans cette casquette.

### Un seul processus : plus de deux `/v1/responses` longs

UN** en bonne santé** processus (tas sous `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, `0.75` par défaut)** peut** exécutez plus de deux `POST /v1/responses` longs simultanés lorsque le budget d'octets en vol à l'échelle du processus (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) a encore de la place. Les corps égaux ou supérieurs à `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (par défaut 256 KiB) prennent le même bail lourd que les requêtes lourdes en structure et utilisent le même échappement [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Des dizaines de clients SSE longs simultanés (les opérateurs ont souvent besoin de 40 à 50) représentent un** budget mémoire** question — taille du tas + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — pas une limite de produit stricte « max 2 ». Un tas sous pression perd toujours du `503` réessayable, donc #7849 ne revient pas.

À** multiplier les tas** (anciens espaces V8 indépendants)** aujourd'hui** :

| Faire                                                                                                                                                         | Ne pas                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Courir** N containers/pods** , chacun avec son** propre** `DATA_DIR` /volume                                                                                  | Définir `replicas > 1` sur un fichier SQLite                                     |
| Taille importante en vol + marge saine à partir du budget tas/octets en vol ; 1–2 est la valeur par défaut conservatrice #7849, pas un maximum de produit dur | Donnez à un processus 8 × RAM et un plafond de nombre illimité                   |
| Facultatif : `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` pour** compteurs de quotas partagés**                                                       | Traitez Redis comme SQLite — ce n'est pas le cas                                 |
| Dupliquer les secrets du fournisseur dans chaque instance (ou accepter les tableaux de bord partitionnés)                                                     | Attendez-vous à un tableau de bord/un journal d'appels pour toutes les instances |
| Front avec n’importe quel équilibreur de charge ; collant par clé API ou session suffit                                                                       | Exiger un middleware sensible à la taille spécifique au fournisseur              |

L'affinité session-compte peut également être partagée via Redis: définissez `OMNIROUTE_SESSION_AFFINITY_STORE=redis` et `REDIS_URL` sur chaque processus, avec le même `REDIS_KEY_PREFIX` et un paramètre `sessionAffinityTtlMs` positif. Les broches résolvent les identités de compte d'utilisation hachées avec la connexion locale éligible de chaque processus, de sorte que les comptes OAuth avec des métadonnées d'identité correspondantes n'ont pas besoin d'avoir une connexion correspondante IDs. Les identités de compte connues ont priorité sur IDs locaux contradictoires dans la résolution des broches et l'expulsion surveillée ; les enregistrements sans identité (ou les appelants d'expulsion sans identité) conservent l'héritage ID guard. Les comptes sans identité d'utilisation stable nécessitent toujours une correspondance IDs. Les erreurs Redis ou les appels dépassant 100 ms reviennent au SQLite local. Chaque magasin d'affinité Redis limite les opérations en cours à 8, contourne Redis immédiatement lorsqu'il est plein et libère des emplacements uniquement lorsque le travail sous-jacent est réglé, et non à la date limite de l'appelant. Lors d'une panne Redis il n'y a pas de vérité partagée : chaque instance revient à sa propre affinité locale, les sessions peuvent être réépinglées une fois par instance et les instances peuvent diverger. L'adhésivité converge à nouveau vers Redis lorsqu'elle récupère. Le délai d'attente limite l'attente, pas un EVAL envoyé, qui peut atterrir après le repli. Les écritures de routage comparent la valeur exacte observée par la décision de routage, et non une nouvelle lecture au moment de la mutation ; un échec observé ou une observation de repli SQLite se compare à une clé Redis absente. Les broches obsolètes sont remplacées en un seul CAS, donc une commande tardive ne peut pas remplacer ou supprimer une broche plus récente et différente. Redis lit renvoie atomiquement la valeur et le serveur restant TTL; PTTL positif (ou aucune expiration) détermine la vivacité, et non l'horodatage JSON de l'écrivain ou l'horloge du lecteur. Les instantanés locaux mappent ce TTL restant à une date limite locale ; les clés JSON existantes restent lisibles et leurs octets bruts sont conservés pour CAS. Redis est la seule source de vérité pendant qu'il répond. Les ajouts, touches et suppressions partagés confirmés suppriment l'entrée locale, ne l'installent ni ne l'actualisent jamais. SQLite sur le chemin Redis ne contient que les propres décisions de secours de cette instance en cas d'erreurs Redis, de délais d'attente ou de saturation d'admission, limitées par TTL comme auparavant. Une broche locale manquante lors d'une panne ultérieure coûte un nouveau choix (un échec de cache d'invite), pas un compte erroné ou expulsé. Les upserts rejetés renvoient le gagnant partagé et son TTL restant de manière atomique : la sélection ordinaire revérifie la date limite locale mappée et utilise un gagnant éligible encore actif, touchant l'utilisation et se connectant à ce compte sans autre écriture partagée. S'il n'est pas disponible, la sélection conserve le candidat local, laisse le code PIN partagé inchangé et émet un message de débogage. CAS rejeté n'écrit pas SQLite; Les erreurs Redis, les délais d'attente ou la saturation d'admission appliquent à la place l'opération locale existante. Si la réponse d'une mutation envoyée arrive après un délai d'attente (accepté, rejeté ou erreur), une comparaison et une suppression synchrone et exacte de la valeur sérialisée supprime uniquement la ligne de secours du délai d'expiration identique à l'octet. Il n'y a pas d'attente entre cette comparaison et la suppression ; une écriture de panne plus récente est conservée. L'expulsion surveillée supprime le code PIN local du compte défaillant, même avec Redis down, et le nettoie à nouveau après l'expulsion partagée confirmée. Les réponses partagées antérieures en attente ne peuvent pas restaurer une broche locale expulsée car les succès partagés n'écrivent jamais SQLite. Une panne ultérieure peut réépingler un compte ; une écriture partagée acceptée ultérieurement n'existe que dans Redis. Les échecs Redis ne consultent pas l'état de secours local. Lorsque le pilote est désactivé, les broches nouvellement sélectionnées conservent la forme SQLite JSON à quatre champs héritée ; seul le routage Redis ajoute l'identité du compte hachée. Les broches préextraites sont revérifiées à leur limite d'expiration. La sélection sans bail Redis relit le magasin, mais la planification de bail synchrone peut toujours utiliser une épingle expulsée entre la prélecture et la planification (une fenêtre de meilleur effort acceptée). Un engagement de location ne peut pas changer de compte après une revendication durable : en cas de rejet, il conserve le candidat revendiqué pour cette demande uniquement et laisse le gagnant partagé intact, de sorte que l'accord entre les instances est limité à ce chemin. Le reste du tableau s'applique toujours : cela ne partage pas la persistance des sessions combinées, les broches d'activation Codex natives, les sémaphores de compte, les verrouillages, les limites de dépenses, la configuration ou les journaux d'appels.

Matériel : `/v1/responses` long simultané par instance est un** budget mémoire** question (tas + inflight-byte / #10110). `DATA_DIR` indépendants `N` multiplient toujours les tas : l'hôte RAM doit couvrir `N × cgroup`, et non "un pod de 16 Gi avec N = 8". Ne `replicas > 1` jamais sur un seul fichier SQLite.

Composez un croquis (deux tas, deux volumes — pas `deploy.replicas: 2`) :

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

La densité en cours de processus (compression de l'isolat HTTP ) est [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Un cluster logique sur un état durable partagé est [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Erreurs régionales Gemini dans Docker

Google AI Studio / l’API Gemini peut renvoyer une erreur HTTP 400 avec FAILED_PRECONDITION et
`User location is not supported for the API use.` Une requête réussie sur l’hôte
ne prouve pas que le conteneur utilise la même route sortante. L’ordre DNS,
la connectivité IPv4/IPv6, le routage VPN et les proxys configurés peuvent différer. Consultez
[les régions prises en charge par Google](https://ai.google.dev/gemini-api/docs/available-regions)
ainsi que la route de connexion réelle ; cette erreur seule n’indique pas que la clé API est incorrecte.

### Privilégier un proxy propre à la connexion

Utilisez la [configuration de proxy par connexion](../ops/PROXY_GUIDE.md#4-level-proxy-system)
d’OmniRoute pour la connexion Gemini concernée, puis relancez **Tester la connexion** et une petite requête
avec le même modèle. Ainsi, le changement de routage reste limité à cette connexion. Vérifiez
que le proxy est accessible depuis le conteneur et que la connexion le sélectionne effectivement.
La modification de la route ne garantit pas l’éligibilité régionale auprès du fournisseur en amont.

### Comparer la mise en réseau de l’hôte et du conteneur

Conservez une clé, un modèle et une requête identiques lorsque vous comparez les résultats authentifiés ; ne
publiez jamais d’identifiants, de mots de passe de proxy ou d’en-têtes d’autorisation complets dans un ticket.
Commencez par vérifier quelles familles d’adresses sont proposées par le résolveur du système d’exploitation, en utilisant la même commande
sur l’hôte et dans le conteneur :

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Remplacez `omniroute` par le service que vous exécutez (par exemple, `omniroute-web`). Ces
commandes affichent les familles d’adresses sans identifiants ni adresses IP. Une valeur `6`
renvoyée indique uniquement un résultat DNS IPv6 : elle ne prouve **pas** qu’une route IPv6 utilisable ou qu’un accès à l’API existe.
Lorsque `curl` est installé, comparez `curl -4 -I https://generativelanguage.googleapis.com`
à `curl -6 -I https://generativelanguage.googleapis.com` dans les deux environnements.
Une réponse HTTP prouve la connectivité pour ce test, même s’il s’agit d’une erreur non authentifiée ;
seule la requête authentifiée au modèle permet de tester l’éligibilité à Gemini.

### Alternative au niveau de l’hôte : IPv6 fonctionnel et stratégie du résolveur

L’auteur du signalement [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) a rétabli
l’accès dans son environnement en activant IPv6 pour les conteneurs et en modifiant la sélection
des adresses de la glibc. Considérez cette solution comme une alternative propre à l’environnement. Vérifiez le bon fonctionnement
d’IPv6 sur l’hôte, la sortie et le routage des conteneurs ainsi que les règles du pare-feu avant d’ajuster les préférences du résolveur.
Une adresse ULA privée ne suffit pas à établir une connectivité IPv6 publique.

Pour les services déjà rattachés au réseau par défaut de Compose, ce fragment active
IPv6 sur ce réseau ; conservez le reste de la configuration de votre service, notamment les ports et les volumes :

```yaml
networks:
  default:
    enable_ipv6: true
```

Pour un réseau nommé, activez cette option sur le réseau auquel le service est effectivement rattaché. Docker peut
allouer un sous-réseau ULA ; choisissez un sous-réseau explicite sans chevauchement uniquement si votre réseau
l’exige. Consultez [la mise en réseau IPv6 de Docker](https://docs.docker.com/engine/daemon/ipv6/)
et [les options réseau de Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Sur une **image basée sur la glibc**, `/etc/gai.conf` peut modifier la sélection des adresses. Le Dockerfile
actuel du dépôt utilise Debian ; les images personnalisées basées sur musl ne partagent pas ce mécanisme.
L’ajustement signalé remplace l’étiquette ULA `label fc00::/7 6` par
`label fc00::/7 1`. Partez de la table de stratégie complète de l’image et conservez ses autres
entrées : l’ajout d’une entrée `label` ou `precedence` remplace cette table par défaut ; un fichier
contenant uniquement la ligne modifiée est donc insuffisant. La
[référence de configuration de la glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
documente cette sémantique. Montez le fichier vérifié en lecture seule sur `/etc/gai.conf`
et recréez le service pour appliquer la modification.

Cette modification affecte la sélection des adresses par le système d’exploitation pour **tout le trafic sortant de ce conteneur**.
Elle ne force pas toutes les applications à choisir IPv6 : l’ordre DNS et la sélection
des connexions de Node ont également leur importance. En particulier, `--dns-result-order=ipv4first` privilégie IPv4 et
ne résout pas une défaillance propre à IPv4. Consultez [l’ordre DNS de Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Testez de nouveau Gemini et vos autres fournisseurs après toute modification au niveau de l’hôte. Pour revenir en arrière,
supprimez le montage personnalisé de `gai.conf`, restaurez la configuration réseau précédente et
recréez le service ou le réseau concerné pendant une fenêtre de maintenance. La recréation d’un réseau
peut interrompre les autres conteneurs qui y sont rattachés ; ne supprimez pas le volume de données persistant.

## Remarques importantes

- **Mode WAL de SQLite :** il faut laisser `docker stop` se terminer afin qu’OmniRoute puisse enregistrer les dernières modifications dans `storage.sqlite` lors du point de contrôle. Les fichiers Compose fournis définissent déjà un délai d’arrêt gracieux de 40 s. Si vous exécutez directement l’image, conservez `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP` :** définissez cette variable sur `true` si les sauvegardes régulières/avant écriture sont gérées en externe. Les migrations de bases de données existantes nécessitent toujours leur propre instantané de sécurité durable ainsi qu’un mécanisme de protection contre les migrations en masse.
- **Persistance des données :** montez toujours un volume sur `/app/data` afin de conserver votre base de données, vos clés et vos configurations après le redémarrage des conteneurs.
- **Configuration du port :** remplacez la valeur de la variable d’environnement `PORT` pour modifier le port par défaut `20128`.

## Voir aussi

- [Guide de déploiement sur une VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Configuration d’une VM avec nginx et Cloudflare
- [Guide de déploiement sur Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Déployer sur Fly.io
- [Configuration de l’environnement](../reference/ENVIRONMENT.md) — Référence complète du fichier `.env`
