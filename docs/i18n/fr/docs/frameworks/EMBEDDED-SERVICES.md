# Embedded Services (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EMBEDDED-SERVICES.md) · 🇪🇹 [am](../../../am/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇿 [az](../../../az/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇰 [da](../../../da/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇪 [de](../../../de/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇷 [el](../../../el/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇸 [es](../../../es/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇪 [et](../../../et/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇱 [he](../../../he/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇩 [id](../../../id/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇹 [it](../../../it/docs/frameworks/EMBEDDED-SERVICES.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇭 [km](../../../km/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇲 [my](../../../my/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇴 [no](../../../no/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [or](../../../or/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇰 [si](../../../si/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [te](../../../te/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇭 [th](../../../th/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EMBEDDED-SERVICES.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EMBEDDED-SERVICES.md)

---

> **Version:** v3.8.44** Dernière mise à jour :** 2026-10-28** Public:** Ingénieurs ajoutant, maintenant ou déboguant des services embarqués (9Router, CLIProxyAPI, Mux, Bifrost, open-wa, LLMLingua, sing-box).

Les services intégrés sont des outils side-car de processus installés localement que OmniRoute installe, supervise et expose en tant que cibles de routage de première classe. Contrairement aux fournisseurs externes (qui sont accessibles sur Internet via les clés API ), les services intégrés s'exécutent sur la même machine que OmniRoute et communiquent via un bouclage.

---

## Table des matières

1. [Vue d’ensemble](#1-overview)
2. [Architecture — 4 couches](#2-architecture--4-layers)
3. [Machine à états du cycle de vie](#3-lifecycle-state-machine)
4. [Référence de l’API](#4-api-reference)
5. [Sécurité](#5-security)
6. [Ajout d’un nouveau service intégré](#6-adding-a-new-embedded-service)
7. [Dépannage](#7-troubleshooting)
8. [FAQ](#8-faq)

---

## 1. Aperçu

### Pourquoi des services embarqués ?

Huit services sont embarqués :

| Service             | paquet npm                          | Port par défaut | But                                                                                                                                                                                                                                                                                                                                                          |
| ------------------- | ----------------------------------- | :-------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **9Routeur**        | `9router`                           |      20130      | Routeur AI que OmniRoute peut utiliser en tant que sous-fournisseur. Modèles exposés en tant que `9router/{sub}/{model}`                                                                                                                                                                                                                                     |
| **CLIProxyAPI**     | GitHub release binaire (`cliproxy`) |      8317       | Adaptateur proxy local pour les flux d'authentification Anthropic CLI. Fournit un routage de secours lorsque les jetons OAuth expirent                                                                                                                                                                                                                       |
| **Mux**             | `mux` ( `mux server` sans tête)     |      8322       | Démon d'orchestration d'agent local (coder/mux). Géré par cycle de vie uniquement, — n'est pas une cible de routage (pas de proxy LLM ).                                                                                                                                                                                                                     |
| **Bifrost**         | `@maximhq/bifrost`                  |      8080       | Accédez au backend de relais AI-gateway. Lors de l'exécution, sélection automatique par l'itinéraire de relais (`/v1/relay/`)                                                                                                                                                                                                                                |
| **Dario**           | `@askalf/dario`                     |      3456       | Proxy d'abonnement Claude — alternative/failover à CLIProxyAPI pour le trafic en forme de Claude-Code ; la clé injectée devient `DARIO_ADMIN_TOKEN` contrôlant son plan de contrôle `/admin/*` OAuth                                                                                                                                                         |
| **ouvert**          | `@open-wa/wa-automate`              |      8323       | Automatisation Web WhatsApp (Chromium sans tête via Puppeteer). Géré par cycle de vie uniquement, — n'est pas une cible de routage.                                                                                                                                                                                                                          |
| **LLMLingua**       | `@atjsh/llmlingua-2`                |      20135      | Sidecar de compression d'invite — modèle réel LLMLingua-2 ONNX (port JS/TS de l'algorithme de Microsoft). `open-sse/services/compression/engines/llmlingua/index.ts` lui envoie `/compress` via HTTP, en revenant au backend du thread de travail en cours lorsque le side-car est en panne. Géré par cycle de vie uniquement — et non une cible de routage. |
| **boîte à chanter** | GitHub release binaire (`singbox`)  |      20140      | Le side-car TPROXY soutient l'interception par proxy transparent de `applyTproxy()`(`src/mitm/tproxy/setup.ts`). Le programme d’installation télécharge la version épinglée et vérifiée par somme de contrôle. Géré par cycle de vie uniquement — n'est pas une cible de routage (pas de proxy LLM )                                                         |

Tous les huit suivent le même modèle de surveillance :

- OmniRoute les installe sous `DATA_DIR/services/{name}/` (isolés du propre `package.json` de OmniRoute)
- OmniRoute les génère et les surveille en tant que processus enfants
- OmniRoute injecte une clé API éphémère dans l'environnement de l'enfant et la fait tourner sans temps d'arrêt (le cas échéant)
- Toutes les voies de gestion (`/api/services/*`) sont**LOCAL_ONLY** — accessible uniquement depuis le bouclage (règle stricte #17)

### Cœurs proxy gérés

Le champ Hôte proxy personnalisé accepte également un lien source V2Ray. Sélectionner** boîte à chanter** ou** Radiographie** explicitement, puis cliquez sur Enregistrer. Taper ne télécharge ni ne démarre jamais un noyau. Save vérifie l'archive de la version officielle, valide la configuration native, démarre un écouteur SOCKS localhost distinct et écrit ensuite seulement l'affectation du registre proxy. L’échec de l’activation restaure la configuration et le processus gérés précédents. `STORAGE_ENCRYPTION_KEY` est requis ; les liens sources sont cryptés.

Les fichiers gérés vivent sous `DATA_DIR/services/managed-proxy/`, distinct de TPROXY. Il existe un processus détenu par noyau sélectionné, jusqu'à 100 auditeurs. Aucune valeur par défaut de démarrage automatique ou de routage global n’est modifiée. L'enregistrement réussi mémorise l'activation de ce noyau géré uniquement ; Le démarrage de l'application restaure les cœurs enregistrés activés à l'aide du binaire déjà vérifié, jamais de téléchargement au démarrage. L'arrêt explicite efface cet indicateur d'activation. Un binaire manquant ou endommagé nécessite de réenregistrer une source. La suppression du registre supprime la source et l'écouteur localement ; les modifications de point de terminaison ordinaires sont rejetées pour les lignes gérées afin que la source enregistrée ne puisse pas dériver silencieusement de son écouteur routé.

| Format source                                  | boîte à chanter                                                           | Radiographie                                                              |
| ---------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| VLESS, VMess, cheval de Troie, Shadowsocks URI | Conversion prise en charge                                                | Conversion prise en charge                                                |
| Hysteria2/hy2, TUIC, AnyTLS URI                | Conversion prise en charge                                                | Rejeté; utiliser un noyau compatible                                      |
| TCP/raw, WebSocket, gRPC, HTTPUpgrade          | Pris en charge pour VLESS/VMess/Trojan                                    | Pris en charge pour VLESS/VMess/Trojan                                    |
| XHTTP URI transport                            | Rejeté                                                                    | Conversion prise en charge                                                |
| JSON sortant natif                             | Proxy autorisé protocols/options du noyau sélectionné, vérifié nativement | Proxy autorisé protocols/options du noyau sélectionné, vérifié nativement |

Les options filaires inconnues, les indicateurs TLS non sécurisés, les plugins externes, les options de chemin de fichier local et les combinaisons non prises en charge sont rejetés plutôt que silencieusement. Les objets natifs sont des définitions sortantes, et non des configurations globales ; Les sorties control/direct/bypass ne sont pas acceptées. WireGuard sur sing-box 1.14 utilise des points de terminaison, il n'est donc pas accepté comme sortant natif. Ce n'est pas un convertisseur tous formats ; SSR, les anciens liens whole-base64 Shadowsocks, les objets Clash arbitraires et les variantes de transport absentes de la table nécessitent un format source pris en charge séparément.

`/api/services/managed-proxy` est authentifié et en boucle uniquement : GET répertorie les métadonnées expurgées, POST enregistre `{core,name,sourceLink,id?,assignment?}`, PATCH accepte `{core,action:"start"|"stop"}`. Le pipeline d’homologation de confiance de l’hôte doit être présent. Les diagnostics de base natifs sont supprimés car ils peuvent contenir des informations d'identification ; Les événements du cycle de vie utilisent l'enregistreur de fichiers d'application structuré existant sans liens sources ni charges utiles en amont. Joignez uniquement les journaux d’applications nettoyés pour obtenir de l’aide. Les versions officielles sont épinglées sur sing-box 1.14.3 et Xray 26.3.27 avec les manifestes SHA-256 des ressources de version ; les futures mises à jour nécessiteront de modifier la version et tous les résumés vérifiés ensemble.

### Décisions clés (du plan de conception)

| Décision                                    | Valeur                                                                         |
| ------------------------------------------- | ------------------------------------------------------------------------------ |
| Accès au tableau de bord à 9Router natif UI | Proxy inverse chez `/dashboard/providers/services/9router/embed/*`             |
| Mécanisme d'installation                    | `npm install {package}` via `execFile` (pas d'interpolation shell)             |
| Mode de consommation                        | Fournisseur enregistré comme `9router/{sub}/{model}` dans le moteur de routage |
| gestion des clés API                        | OmniRoute génère, chiffre au repos (AES-256-GCM) et injecte via env            |
| Emplacement du tableau de bord              | `/dashboard/providers/services` (trois onglets)                                |
| Démarrage automatique                       | Basculer par service, OFF par défaut                                           |

---

## 2. Architecture — 4 couches

```
┌────────────────────────────────────────────────────────────────────┐
│  Layer 1 — UI                                                      │
│  /dashboard/providers/services  (tabs: CLIProxyAPI | 9Router | Mux)│
│  Logs live (SSE), Start/Stop/Restart/Update, Settings, Install     │
│                                                                    │
│  src/app/(dashboard)/dashboard/providers/services/                 │
│    ├── page.tsx               Shell + tab routing by ?tab=         │
│    ├── tabs/                  CliproxyServiceTab, NinerouterServiceTab,│
│    │                          MuxServiceTab                        │
│    └── components/            ServiceStatusCard, ServiceLifecycleButtons,│
│                               ServiceLogsPanel, ApiKeyCard, ...    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP (Next.js fetch)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Layer 2 — API (LOCAL_ONLY — loopback only)                        │
│                                                                    │
│  /api/services/9router/{install|start|stop|restart|update|         │
│                          rotate-key|status|auto-start|logs}        │
│  /api/services/cliproxy/{install|start|stop|restart|update|        │
│                           status|auto-start|logs}                  │
│  /api/services/mux/{install|start|stop|restart|update|             │
│                      status|auto-start|logs}                       │
│  /dashboard/providers/services/9router/embed/[...path]             │
│    (reverse HTTP + WebSocket proxy → 9Router upstream)             │
│                                                                    │
│  Gate: LOCAL_ONLY_API_PREFIXES includes "/api/services/" and       │
│        "/dashboard/providers/services/*/embed/"                    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ in-process calls
┌──────────────────────▼─────────────────────────────────────────────┐
│  Layer 3 — ServiceSupervisor (src/lib/services/)                   │
│                                                                    │
│  ServiceSupervisor.ts   Generic supervisor (child_process.spawn)   │
│    ├── install:    execFile('npm', ['install', pkg, '--prefix'])    │
│    ├── start:      spawn(node, [entrypoint], {env, cwd})           │
│    ├── api_key:    crypto.randomBytes(32) → env NINEROUTER_API_KEY  │
│    ├── port:       20130 for 9Router (configurable)                │
│    ├── logs:       stdio ring buffer 5 MB → SSE events             │
│    ├── health:     HTTP GET /health every 2–5 s, lazy recovery     │
│    └── lifecycle:  SIGTERM 15 s → SIGKILL                          │
│                                                                    │
│  registry.ts        getSupervisor(name) / registerSupervisor()     │
│  bootstrap.ts       Bootstraps all SERVICES[] at process start     │
│  apiKey.ts          getOrCreateApiKey(), generateServiceApiKey()   │
│  modelSync.ts       Periodic GET /v1/models → service_models table │
│  ringBuffer.ts      Circular log buffer (5 MB per service)         │
│  healthCheck.ts     Polling HTTP health probe                      │
│  installers/        ninerouter.ts, cliproxy.ts, mux.ts, openwa.ts  │
│                      (installer adapters)                          │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ OpenAI-compatible HTTP (loopback)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Layer 4 — Provider / Routing                                      │
│                                                                    │
│  open-sse/executors/ninerouter.ts                                  │
│    Re-looks up port and API key per-request (no caching).          │
│    Strips "9router/" prefix from model id before proxying.         │
│    Returns 503 service_not_running if supervisor not in "running". │
│                                                                    │
│  src/shared/constants/providers.ts                                 │
│    Entry for "9router": isEmbeddedService: true                    │
│                                                                    │
│  open-sse/config/providerRegistry.ts                               │
│    Models stored as "9router/{sub}/{model}" (prefixed).            │
│    Synced every 5 min by modelSync.ts.                             │
│                                                                    │
│  Mux is lifecycle-managed ONLY (Layers 1-3) — it is an agent-       │
│  orchestration daemon, not an LLM proxy, so it has no Layer 4      │
│  executor/provider entry and is never a routing target.            │
└────────────────────────────────────────────────────────────────────┘
```

### Fichiers sources clés

| Déposer                                     | Rôle                                                                    |
| ------------------------------------------- | ----------------------------------------------------------------------- |
| `src/lib/services/ServiceSupervisor.ts`     | Classe principale : cycle de vie, verrouillage, santé, tampon en anneau |
| `src/lib/services/bootstrap.ts`             | Enregistrement au niveau du processus et démarrage automatique          |
| `src/lib/services/registry.ts`              | Carte de Singleton `tool → supervisor`                                  |
| `src/lib/services/apiKey.ts`                | Génération de clé, chiffrement AES-256-GCM au repos                     |
| `src/lib/services/modelSync.ts`             | Synchronisation périodique du modèle (5 min) + à la demande             |
| `src/lib/services/ringBuffer.ts`            | 5 tampons de journaux circulaires MB avec abonnement SSE                |
| `src/lib/services/healthCheck.ts`           | Sonde de santé HTTP (intervalle configurable)                           |
| `src/lib/services/installers/ninerouter.ts` | npm install/update/uninstall pour 9Router                               |
| `src/lib/services/installers/cliproxy.ts`   | npm install/update/uninstall pour CLIProxyAPI                           |
| `src/lib/services/installers/mux.ts`        | npm install/update/uninstall pour Mux                                   |
| `src/lib/services/installers/openwa.ts`     | npm install/update/uninstall pour open-wa                               |
| `src/lib/services/installers/llmlingua.ts`  | npm install/update/uninstall pour LLMLingua                             |
| `src/app/api/services/9router/_lib.ts`      | assistant `getOrInitSupervisor()`                                       |
| `src/app/api/services/[name]/logs/route.ts` | Point de terminaison des journaux SSE partagés                          |
| `open-sse/executors/ninerouter.ts`          | Exécuteur du fournisseur (couche 4)                                     |

---

## 3. Machine à états du cycle de vie

```
                    install()
  ┌─────────────┐ ──────────► ┌─────────────┐
  │ not_installed│             │   stopped   │◄──────────────────┐
  └─────────────┘             └──────┬──────┘                   │
                                     │ start()                   │
                                     ▼                           │ stop()
                               ┌──────────┐                      │
                               │ starting │                      │
                               └────┬─────┘                     │
              sonde de santé OK    │         crash / SIGTERM    │
                               ┌────▼─────┐  (arrêt sous 5 s)   │
                               │ running  │──── crash ──────────►┤
                               └────┬─────┘                   ┌─▼────┐
                             stop() │                          │error │
                                    ▼                          └──────┘
                               ┌──────────┐
                               │ stopping │
                               └──────────┘
```

Les états sont stockés dans la table `version_manager` de la base de données (colonne `status`) et répliqués
dans l'état en mémoire de `ServiceSupervisor`. L'état en mémoire fait autorité pour
un processus en cours d'exécution ; l'état de la base de données constitue la solution de repli persistante au démarrage.

### Transitions d'état

| Depuis          | Événement                                | Vers                   |
| --------------- | ---------------------------------------- | ---------------------- |
| `not_installed` | réussite de `install()`                  | `stopped`              |
| `stopped`       | appel de `start()`                       | `starting`             |
| `starting`      | la sonde de santé renvoie 200            | `running`              |
| `starting`      | arrêt du processus avant qu'il soit sain | `error`                |
| `running`       | appel de `stop()`                        | `stopping` → `stopped` |
| `running`       | arrêt inattendu du processus (< 5 s)     | `error` (crash rapide) |
| `running`       | arrêt inattendu du processus (> 5 s)     | `error`                |
| `error`         | appel de `start()`                       | `starting`             |
| tout état       | `stop()` pendant `stopping`              | aucune opération       |

### Verrou d'opération

`ServiceSupervisor` sérialise les opérations du cycle de vie au moyen d'un verrou d'opération asynchrone
(`withLock()`). Des appels concurrents à `start()` sur le même superviseur entraînent exactement
un lancement de processus ; le second appelant attend et renvoie l'état existant. Cela évite
les conditions de concurrence lorsque, par exemple, le démarrage automatique et un bouton de l'interface utilisateur sont déclenchés simultanément.

---

## 4. référence API

Tous les itinéraires sous `/api/services/` sont**LOCAL_ONLY** (bouclage uniquement, règle stricte n°17). Les requêtes sans bouclage reçoivent `403 LOCAL_ONLY` quel que soit le jeton d'authentification.

### 4.1 9Points de terminaison du routeur (11 routes)

#### `POST /api/services/9router/install`

Installez 9Router à partir de npm. Crée `DATA_DIR/services/9router/` avec ses propres `package.json` et `node_modules/`. N'entre pas en conflit avec les propres dépôts de OmniRoute.

**Corps de la demande** (tous facultatifs) :

```json
{ "version": "latest" }
```

| Champ     | Taper    | Défaut     | Description                                 |
| --------- | -------- | ---------- | ------------------------------------------- |
| `version` | `string` | `"latest"` | balise de version npm ou semver à installer |

**Réponses :**

| Statut | Description                                                                |
| ------ | -------------------------------------------------------------------------- |
| `200`  | `{ ok: true, installedVersion: "x.y.z", path: "..." }`                     |
| `400`  | Corps de la requête non valide (échec de la validation Zod )               |
| `409`  | Déjà installé (verrou maintenu)                                            |
| `500`  | l'installation de npm a échoué — voir `message` pour une erreur conviviale |

**Remarques :** Utilise `execFile('npm', [...])` — sans shell, sans interpolation (règle stricte n°13). Les erreurs EACCES apparaissent sous forme de messages conviviaux.

---

#### `POST /api/services/9router/start`

Démarrez 9Router. Enregistre un superviseur s'il n'est pas déjà enregistré, puis appelle `supervisor.start()`. Idempotent lorsqu'il est déjà en cours d'exécution.

**Corps de la requête :** aucun

**Réponses :**

| Statut | Description                                                 |
| ------ | ----------------------------------------------------------- |
| `200`  | objet `ServiceStatus` (voir schéma ci-dessous)              |
| `409`  | 9Le routeur n'est pas installé (`status: "not_installed"`)  |
| `503`  | Échec du démarrage (erreur de processus — voir `lastError`) |

**ServiceStatus :**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null
}
```

---

#### `POST /api/services/9router/stop`

Arrêtez gracieusement 9Router. Envoie SIGTERM, attend 15 s, puis SIGKILL s'il est toujours en vie. Idempotent lorsqu'il est déjà arrêté.

**Corps de la requête :** aucun

**Réponses :**

| Statut | Description                            |
| ------ | -------------------------------------- |
| `200`  | `ServiceStatus` (état : "arrêté")      |
| `503`  | L'arrêt a échoué de manière inattendue |

---

#### `POST /api/services/9router/restart`

Équivalent à `stop()` puis `start()` sous le verrou d'opération.

**Corps de la requête :** aucun

**Réponses :** identique à `start` (renvoie `ServiceStatus` final).

---

#### `POST /api/services/9router/update`

Met à jour 9Router vers une version plus récente de npm. Si le service est en cours d'exécution, il est d'abord arrêté, npm install est exécuté (installation de la version la plus récente sur place), puis le service est redémarré.

**Corps de la demande** (tous facultatifs) :

```json
{ "version": "latest" }
```

**Réponses :**

| Statut | Description                                                     |
| ------ | --------------------------------------------------------------- |
| `200`  | `{ ok: true, previousVersion: "...", installedVersion: "..." }` |
| `400`  | Corps invalide                                                  |
| `500`  | La mise à jour de NPM a échoué                                  |

---

#### `POST /api/services/9router/rotate-key`

Génère une nouvelle clé API pour 9Router, la chiffre au repos et redémarre le service (s'il est en cours d'exécution) afin qu'il récupère la nouvelle clé de son environnement. L'ancienne clé est immédiatement invalidée.

**Corps de la requête :** aucun

**Réponses :**

| Statut | Description                                |
| ------ | ------------------------------------------ |
| `200`  | `{ keyRotated: true, restarted: boolean }` |
| `500`  | Échec de la rotation                       |

**Sécurité:** La nouvelle clé n'est jamais renvoyée dans la réponse (pas de fuite d'informations d'identification). Il est stocké chiffré (AES-256-GCM) dans la table `version_manager`.

---

#### `GET /api/services/9router/status`

Renvoie le statut + DB en direct combiné, y compris les métadonnées de version et l'aperçu de la clé API.

**Réponses :**

| Statut | Description                   |
| ------ | ----------------------------- |
| `200`  | Voir schéma ci-dessous        |
| `500`  | Échec de la lecture de l'état |

**Schéma de réponse :**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null,
  "installedVersion": "1.2.3",
  "latestVersion": "1.2.4",
  "updateAvailable": true,
  "apiKeyMasked": "nr_****abcd",
  "autoStart": false,
  "providerExpose": false
}
```

---

#### `POST /api/services/9router/auto-start`

Basculez l'indicateur de démarrage automatique. Lorsque `enabled: true`, le service démarre automatiquement au prochain démarrage OmniRoute (si le service est installé).

**Corps de la requête :**

```json
{ "enabled": true }
```

**Réponses :**

| Statut | Description           |
| ------ | --------------------- |
| `200`  | `{ autoStart: true }` |
| `400`  | Corps invalide        |

---

#### `GET /api/services/9router/logs`

Flux SSE de journaux en direct à partir du tampon en anneau stdout/stderr de 9Router.

**Paramètres de requête :**

| Paramètre | Taper     | Défaut | Description                                                             |
| --------- | --------- | ------ | ----------------------------------------------------------------------- |
| `tail`    | `integer` | 200    | Combien de lignes historiques envoyer en premier (max 1000)             |
| `filter`  | `string`  | aucun  | Filtre de sous-chaîne insensible à la casse (pas de regex — ReDoS-safe) |

**événements SSE :**

| Événement   | Données     | Description                   |
| ----------- | ----------- | ----------------------------- |
| `snapshot`  | `LogLine[]` | Queue historique initiale     |
| `log`       | `LogLine`   | Ligne de journal en direct    |
| `heartbeat` | `{}`        | Rester en vie toutes les 15 s |

**LogLine :**

```json
{ "ts": 1716633600000, "stream": "stdout", "line": "[9router] Listening on :20130" }
```

**Réponses :**

| Statut | Description                                     |
| ------ | ----------------------------------------------- |
| `200`  | `text/event-stream`                             |
| `400`  | Paramètre `filter` trop long (> 200 caractères) |
| `404`  | Service introuvable (superviseur non inscrit)   |

---

### 4.2 points de terminaison CLIProxyAPI (10 routes)

CLIProxyAPI a la même forme de point final que 9Router moins `rotate-key`, plus `accounts`, `provider-expose` et `auto-restart-adopted`. Il reçoit désormais une clé API de plan de données dédiée injectée lors de l'apparition (`needsApiKey: true` dans `bootstrap.ts`, utilisée pour la synchronisation du modèle) ; `status` comprend moins de champs.

| Méthode | Chemin                              | Description                                 |
| ------- | ----------------------------------- | ------------------------------------------- |
| `POST`  | `/api/services/cliproxy/install`    | Installer CLIProxyAPI depuis npm            |
| `POST`  | `/api/services/cliproxy/start`      | Démarrer CLIProxyAPI                        |
| `POST`  | `/api/services/cliproxy/stop`       | Arrêtez CLIProxyAPI                         |
| `POST`  | `/api/services/cliproxy/restart`    | Redémarrer CLIProxyAPI                      |
| `POST`  | `/api/services/cliproxy/update`     | Mettre à jour vers une version plus récente |
| `GET`   | `/api/services/cliproxy/status`     | Statut + DB en direct (pas `apiKeyMasked`)  |
| `POST`  | `/api/services/cliproxy/auto-start` | Activer le démarrage automatique            |

Le point de terminaison `GET /api/services/{name}/logs` partagé (voir §4.1) fonctionne pour les quatre services utilisant le segment dynamique `[name]`.

---

### 4.3 Points de terminaison Mux (8 routes)

Mux a la même forme de point final que la route CLIProxyAPI — no `rotate-key` dans la surface API (le jeton du porteur est généré de la même manière que celui de 9Router via `getOrCreateApiKey("mux")` et injecté via la variable d'environnement `MUX_SERVER_AUTH_TOKEN`, mais il n'y a pas encore de point final de rotation dédié). Mux est géré uniquement en fonction du cycle de vie : contrairement à 9Router, il n'a pas d'exécuteur de couche 4 et n'est jamais enregistré en tant que fournisseur de routage.

| Méthode | Chemin                         | Description                                        |
| ------- | ------------------------------ | -------------------------------------------------- |
| `POST`  | `/api/services/mux/install`    | Installer Mux à partir de npm (`npm i mux`)        |
| `POST`  | `/api/services/mux/start`      | Démarrer Mux (`mux server`)                        |
| `POST`  | `/api/services/mux/stop`       | Arrêter le multiplexeur                            |
| `POST`  | `/api/services/mux/restart`    | Redémarrer le multiplexeur                         |
| `POST`  | `/api/services/mux/update`     | Mettre à jour vers une version plus récente de npm |
| `GET`   | `/api/services/mux/status`     | Statut + DB en direct                              |
| `POST`  | `/api/services/mux/auto-start` | Activer le démarrage automatique                   |

---

### 4.4 Points limites du Bifrost (8 itinéraires)

Bifrost est un backend de relais Go AI-gateway (`@maximhq/bifrost`). Il utilise la même forme de point de terminaison que CLIProxyAPI (aucun `rotate-key` — Bifrost ne gère ses propres clés de fournisseur dans `config.json` sous son `-app-dir`).

| Méthode | Chemin                             | Description                                                           |
| ------- | ---------------------------------- | --------------------------------------------------------------------- |
| `POST`  | `/api/services/bifrost/install`    | Installez Bifrost à partir de npm (`@maximhq/bifrost`)                |
| `POST`  | `/api/services/bifrost/start`      | Démarrez Bifrost sur le port 8080 (par défaut)                        |
| `POST`  | `/api/services/bifrost/stop`       | Arrêtez le bifrost                                                    |
| `POST`  | `/api/services/bifrost/restart`    | Redémarrer Bifrost                                                    |
| `POST`  | `/api/services/bifrost/update`     | Mettre à jour vers une version plus récente                           |
| `GET`   | `/api/services/bifrost/status`     | Statut + DB en direct                                                 |
| `POST`  | `/api/services/bifrost/auto-start` | Activer le démarrage automatique                                      |
| `GET`   | `/api/services/bifrost/logs`       | queue de journal SSE (via une route dynamique `[name]/logs` partagée) |

**Câblage de routage :** Lorsque `BIFROST_BASE_URL` n'est pas défini et que l'instance Bifrost supervisée est en cours d'exécution, `getBifrostRoutingConfig()` (dans `routingBackend.ts`) utilise automatiquement `http://127.0.0.1:{port}` comme base de relais URL. L'environnement `BIFROST_BASE_URL` explicite est toujours prioritaire.

---

### 4.5 Points de terminaison Dario (12 itinéraires)

Même forme de cycle de vie que les autres services (`install`, `start`, `stop`, `restart`, `update`, `status`, `auto-start`, `auto-restart-adopted`) plus un plan de contrôle OAuth à jeton sous `admin/`: `admin/accounts`, `admin/import-from-omniroute`, `admin/login-start`, `admin/login-complete` (tous derrière `DARIO_ADMIN_TOKEN`).

### 4.6 points de terminaison open-wa (7 routes)

open-wa (`@open-wa/wa-automate`) pilote une instance Chromium sans tête (via Puppeteer) pour automatiser WhatsApp Web. Il utilise la même forme de point final que Mux (pas encore de route `rotate-key` ). Il est géré uniquement par le cycle de vie — pas une cible de routage, pas d'entrée executor/provider de couche 4.

| Méthode | Chemin                            | Description                                                           |
| ------- | --------------------------------- | --------------------------------------------------------------------- |
| `POST`  | `/api/services/openwa/install`    | Installer open-wa à partir de npm (`@open-wa/wa-automate`)            |
| `POST`  | `/api/services/openwa/start`      | Démarrer open-wa sur le port 8323 (par défaut)                        |
| `POST`  | `/api/services/openwa/stop`       | Arrêtez d'ouvrir-wa                                                   |
| `POST`  | `/api/services/openwa/restart`    | Redémarrer open-wa                                                    |
| `POST`  | `/api/services/openwa/update`     | Mettre à jour vers une version plus récente                           |
| `GET`   | `/api/services/openwa/status`     | Statut + DB en direct                                                 |
| `POST`  | `/api/services/openwa/auto-start` | Activer le démarrage automatique                                      |
| `GET`   | `/api/services/openwa/logs`       | queue de journal SSE (via une route dynamique `[name]/logs` partagée) |

**clé API :** injecté en tant que remplacement générique `WA_*` -prefixed env de `WA_KEY` — open-wa le mappe sur l'option `--key`/`-k` CLI (`dist/cli/setup.js::envArgs()`, vérifié par rapport au package 4.76.0 installé). Préfixé `ow_` lorsqu'il est généré par `generateServiceApiKey()`. open-wa lit la clé à partir d'un en-tête `key`/`api_key` HTTP (pas `Authorization: Bearer`); `/api-docs*` est explicitement exempté de la vérification (`setupAuthenticationLayer` in `dist/cli/server.js`), donc la sonde d'intégrité n'a pas besoin d'en-tête d'authentification.

**Appariement :** open-wa n'est pas officiel et n'est pas affilié à WhatsApp — le numéro connecté comporte un risque d'interdiction dû à la propre détection automatisée de WhatsApp. Au premier démarrage, le code QR d'appariement est imprimé sur la sortie standard et apparaît via le flux panel/SSE des journaux existant — Il n'y a pas encore de point de terminaison d'image QR dédié dans cette intégration.

---

### 4,7 points de terminaison LLMLingua (8 routes)

LLMLingua est un side-car à compression rapide encapsulant `@atjsh/llmlingua-2` (véritable modèle de classification de jetons ONNX, téléchargé depuis Hugging Face lors du premier appel `/compress` ). Il utilise la même forme de point de terminaison que Bifrost (pas de clé API — `needsApiKey: false`, il ne gère jamais les informations d'identification).

| Méthode | Chemin                                         | Description                                                                     |
| ------- | ---------------------------------------------- | ------------------------------------------------------------------------------- |
| `POST`  | `/api/services/llmlingua/install`              | npm-install `@atjsh/llmlingua-2` + peers, écrivez le script du serveur side-car |
| `POST`  | `/api/services/llmlingua/start`                | Démarrez le side-car sur le port 20135 (par défaut)                             |
| `POST`  | `/api/services/llmlingua/stop`                 | Arrêtez le side-car                                                             |
| `POST`  | `/api/services/llmlingua/restart`              | Redémarrez le side-car                                                          |
| `POST`  | `/api/services/llmlingua/update`               | Mise à jour vers la version la plus récente du package                          |
| `GET`   | `/api/services/llmlingua/status`               | Statut + DB en direct                                                           |
| `POST`  | `/api/services/llmlingua/auto-start`           | Activer le démarrage automatique                                                |
| `POST`  | `/api/services/llmlingua/auto-restart-adopted` | Activer le redémarrage automatique d'une instance adoptée (préexistante)        |
| `GET`   | `/api/services/llmlingua/logs`                 | queue de journal SSE (via une route dynamique `[name]/logs` partagée)           |

**Contrat side-car :** le script du serveur expose `GET /health` (l'instantané — n'attend pas le modèle) et `POST /compress` (`{ text, rate }` → `{ text, compressed, ratio }`). Le modèle se charge paresseusement au premier appel `/compress`.

**Compression wiring:** `open-sse/services/compression/engines/llmlingua/index.ts`'s `httpSidecarBackend` calls `LLMLINGUA_BASE_URL` (default `http://127.0.0.1:20135`) and only accepts the sidecar's response when it is strictly shorter than the input; any failure (not running, timeout, no-op response) falls back to the in-process worker-thread backend (`./worker.ts`).

---

### 4.8 points de terminaison Sing-Box (8 routes)

sing-box a la même forme de point final que Mux — no `rotate-key` route, no API key injection (`needsApiKey: false` in `bootstrap.ts`). Il est géré uniquement en fonction du cycle de vie : jamais un fournisseur routing/LLM. `install()` télécharge le binaire officiel de la version GitHub (`SagerNet/sing-box`) pour la version épinglée (`SINGBOX_PINNED_VERSION` dans `src/lib/services/installers/singbox.ts`) et vérifie son SHA256 par rapport à une somme de contrôle intégrée dans le même fichier avant de l'écrire sur le disque — toute autre version demandée est rejetée.

| Méthode | Chemin                                       | Description                                                               |
| ------- | -------------------------------------------- | ------------------------------------------------------------------------- |
| `POST`  | `/api/services/singbox/install`              | Téléchargez + et vérifiez la version épinglée de la sing-box              |
| `POST`  | `/api/services/singbox/start`                | Démarrer la boîte à chanter (`sing-box run -c config.json`)               |
| `POST`  | `/api/services/singbox/stop`                 | Arrête de chanter                                                         |
| `POST`  | `/api/services/singbox/restart`              | Redémarrer la boîte à chant                                               |
| `POST`  | `/api/services/singbox/update`               | Re-verify/reinstall la version épinglée                                   |
| `GET`   | `/api/services/singbox/status`               | Statut + DB en direct                                                     |
| `POST`  | `/api/services/singbox/auto-start`           | Activer le démarrage automatique                                          |
| `POST`  | `/api/services/singbox/auto-restart-adopted` | Activer le redémarrage automatique pour un processus adopté (préexistant) |
| `GET`   | `/api/services/singbox/logs`                 | queue de journal SSE (via une route dynamique `[name]/logs` partagée)     |

**câblage TPROXY :** `ensureSingboxTproxy()` (`src/mitm/tproxy/setup.ts`) écrit `config.json` et démarre le superviseur avant que `applyTproxy()` n'installe les règles de pare-feu TPROXY. Si le superviseur est absent ou ne parvient pas à atteindre `running`, il enregistre désormais au niveau de l'erreur (plutôt que d'avaler silencieusement l'échec) afin qu'un opérateur puisse dire que les règles TPROXY ont été appliquées sans un auditeur derrière elles.

---

### 4.9 Proxy inverse (intégration du tableau de bord 9Router)

Le tableau de bord intègre le UI Web 9Router dans une iframe via un proxy inverse interne à l'adresse :

```
GET|POST|... /dashboard/providers/services/9router/embed/[...path]
```

Ce proxy :

- Transfère la demande à `http://127.0.0.1:{port}/{path}` (bouclage uniquement)
- Supprime les en-têtes `cookie` et `authorization` entrants (pas de fuite de session OmniRoute )
- Injecte `Authorization: Bearer {apiKey}` pour l'authentification 9Router
- Supprime `set-cookie`, `content-security-policy`, `x-frame-options`, `cross-origin-*` de la réponse
- Réécrit les réponses HTML pour injecter `<base href>` et normaliser les chemins absolus (`/foo` → `/dashboard/.../embed/foo`)

Les mises à niveau WebSocket pour le tableau de bord intégré sont gérées par un serveur compagnon sur un port dédié (voir `src/lib/services/embedWsProxy.ts`).

**Sécurité:** Les routes proxy intégrées sont classées sous `LOCAL_ONLY_API_PREFIXES` et ne peuvent être atteintes qu'à partir du bouclage. Un attaquant qui obtient un JWT via un tunnel Cloudflare/Ngrok ne peut pas accéder aux services embarqués par proxy.

---

## 5. Sécurité

### Application de LOCAL_ONLY (règle stricte nº 17)

Toutes les routes sous `/api/services/` et `/dashboard/providers/services/*/embed/` sont
classées LOCAL_ONLY dans `src/server/authz/routeGuard.ts`. La vérification de l’adresse
de bouclage s’exécute systématiquement avant toute branche d’authentification :

```
la requête arrive
  → isLocalOnlyPath(path)?
      → hors bouclage → 403 LOCAL_ONLY (toujours, avant la vérification d’authentification)
      → bouclage      → poursuit vers l’authentification normale
```

Cela empêche un JWT divulgué (par exemple, via un tunnel) de déclencher `npm install` ou
le lancement de processus. Consultez `docs/security/ROUTE_GUARD_TIERS.md` pour connaître
la matrice complète des niveaux.

### Injection de clé API

9Router et Mux nécessitent une clé API/un jeton bearer pour leurs propres points de terminaison HTTP.
OmniRoute :

1. Génère une clé via `crypto.randomBytes(32).toString("base64url")` avec un
   préfixe propre au service (`nr_` pour 9Router, `mx_` pour Mux).
2. La chiffre au repos à l’aide d’AES-256-GCM (le même algorithme de chiffrement que celui utilisé pour les identifiants des fournisseurs).
3. La déchiffre et l’injecte comme variable d’environnement au moment du lancement —
   `NINEROUTER_API_KEY` pour 9Router, `MUX_SERVER_AUTH_TOKEN` pour Mux (jamais comme option CLI,
   afin que le jeton n’apparaisse jamais dans `ps`/les listes de processus).
4. Ne renvoie jamais la clé en texte clair dans une réponse HTTP.

CLIProxyAPI reçoit une clé dédiée au plan de données, injectée au lancement
(`needsApiKey: true` — utilisée pour la synchronisation des modèles avec l’adaptateur).

### Protection contre les SSRF

Le proxy HTTP inverse (`/dashboard/.../embed/[...path]`) est codé en dur pour transmettre
les requêtes uniquement à `http://127.0.0.1:{port}`. Il ne suit jamais les redirections
vers des destinations hors bouclage. La bibliothèque `ssrf-req-filter` est utilisée pour
rejeter toute URL en amont qui se résout en dehors de la plage de bouclage.

### Sécurité du shell (règle stricte nº 13)

`npm install` est invoqué via `execFile('npm', ['install', pkg, '--prefix', dir])` —
sans littéraux de gabarit, sans shell et sans interpolation de chemins externes dans la chaîne
de commande. Les valeurs d’exécution (ports, clés API) sont transmises via l’objet `env`
du processus enfant.

### Assainissement des erreurs (règle stricte nº 12)

Toutes les réponses d’erreur provenant de `/api/services/*` passent par `buildErrorBody()` ou
`sanitizeErrorMessage()`. Les valeurs brutes de `err.stack` et `err.message` ne sont jamais
renvoyées telles quelles à l’appelant.

---

## 6. Ajout d’un nouveau service intégré

Suivez ces 8 étapes. Consultez les implémentations existantes dans `src/lib/services/installers/`
et `src/app/api/services/` comme références canoniques.

### Étape 1 — Créer le programme d’installation

Créez `src/lib/services/installers/{name}.ts` sur le modèle de `ninerouter.ts` :

```typescript
export const NAME_PACKAGE = "your-npm-package";
export const NAME_DEFAULT_PORT = 20132; // choisissez un port libre

export async function install(version = "latest"): Promise<InstallResult> { ... }
export async function update(version = "latest"): Promise<InstallResult> { ... }
export async function uninstall(): Promise<void> { ... }
export function resolveSpawnArgs(apiKey: string, port: number): SpawnArgs { ... }
export async function getInstalledVersion(): Promise<string | null> { ... }
export async function getLatestVersion(): Promise<string | null> { ... }
```

Utilisez `runNpm(['install', NAME_PACKAGE, '--prefix', dir])` depuis `installers/utils.ts`
— jamais `execSync` ni d’interpolation shell.

### Étape 2 — Enregistrer dans l’amorçage

Ajoutez une entrée `ServiceEntry` au tableau `SERVICES` dans `src/lib/services/bootstrap.ts` :

```typescript
{
  tool: "myservice",
  port: NAME_DEFAULT_PORT,
  healthPath: "/health",
  healthIntervalMs: 5_000,
  stopTimeoutMs: 15_000,
  logsBufferBytes: 5_242_880,
  needsApiKey: true, // false si aucune clé API n’est nécessaire
}
```

Étendez `buildSpawnArgsFactory()` pour prendre en charge `cfg.tool === "myservice"`.

#### Contrat extensible de plug-in de fournisseur (Phase 1, nº 7333)

`src/lib/services/providerPlugins/` introduit un contrat `ServiceProviderPlugin` qui
regroupe les champs `ServiceEntry` du fichier `bootstrap.ts` d’un backend et les champs
du modèle de manifeste de `serviceBackends.ts` dans un seul objet, au lieu d’exprimer
séparément la structure du même backend dans deux fichiers sans lien. À ce jour, **seul `9router` a
été migré** — `bootstrap.ts` dérive son entrée `SERVICES[]` de
`getServiceProviderPlugin("9router")` (`src/lib/services/providerPlugins/registry.ts`),
en levant une erreur au démarrage si le plug-in venait à manquer. `cliproxy`, `mux` et `bifrost`
conservent sans modification les littéraux `SERVICES[]` en ligne préexistants.

`open-sse/config/providerPluginManifest.ts` a également reçu une fonction auxiliaire additive
`createServiceBackendManifestEntry(pluginId, template)` qui construit une entrée
`ProviderPluginManifestEntry` correctement formée à partir d’une entrée `SERVICE_BACKEND_MANIFEST_TEMPLATE` — elle
n’est **pas** encore intégrée à un chemin de requête actif (ni `generateProviderPluginManifestFromRegistry()`
ni `/v1/providers/[provider]/models`) ; cela reste à faire ultérieurement, une fois le contrat
validé pour un deuxième backend.

Les éléments suivants sont reportés à des PR ultérieures et suivis dans l’issue nº 7333 : migrer `cliproxyapi` via le
même registre, généraliser `mux`/`bifrost` dans l’union `ServiceBackendPluginId`,
intégrer au contrat de plug-in les cas particuliers de routage des exécuteurs (`open-sse/executors/index.ts`,
`open-sse/handlers/chatCore/executorProxy.ts`) et connecter
`createServiceBackendManifestEntry()` à un chemin actif du code de manifeste/modèles.

### Étape 3 — Ajouter la migration et les données initiales de la base de données

Assurez-vous que le service dispose d’une ligne dans `version_manager` au moyen d’une migration dans
`src/lib/db/migrations/`. La ligne doit contenir :

```sql
INSERT OR IGNORE INTO version_manager (tool, status, auto_start, provider_expose)
VALUES ('myservice', 'not_installed', 0, 0);
```

### Étape 4 — Créer les 7 points de terminaison API

Sous `src/app/api/services/{name}/` :

```
_lib.ts            fonction auxiliaire getOrInitSupervisor()
install/route.ts   POST — appelle installer.install()
start/route.ts     POST — appelle supervisor.start()
stop/route.ts      POST — appelle supervisor.stop()
restart/route.ts   POST — appelle supervisor.restart()
update/route.ts    POST — appelle installer.update()
status/route.ts    GET  — fusionne l’état en direct et celui de la base de données
auto-start/route.ts POST — bascule l’indicateur auto_start
```

La route partagée `GET /api/services/[name]/logs` est déjà câblée — aucune modification
n’y est nécessaire.

Déléguez toutes les réponses d’erreur à `createErrorResponse()` / `buildErrorBody()`.

### Étape 5 — Ajouter à LOCAL_ONLY_API_PREFIXES

Dans `src/server/authz/routeGuard.ts`, vérifiez que `/api/services/` est déjà répertorié.
Si vous introduisez un nouveau préfixe (par exemple, `/api/tools/`), ajoutez-le à la fois à
`LOCAL_ONLY_API_PREFIXES` et, s’il lance des processus, à `SPAWN_CAPABLE_PREFIXES`.
Ajoutez un test dans `tests/unit/authz/routeGuard.test.ts`.

### Étape 6 — Ajouter l’onglet d’interface utilisateur

Créez `src/app/(dashboard)/dashboard/providers/services/tabs/{Name}ServiceTab.tsx`.
Réutilisez les composants partagés :

- `ServiceStatusCard` — état en temps réel + badge d’intégrité
- `ServiceLifecycleButtons` — Démarrer / Arrêter / Redémarrer / Mettre à jour
- `ServiceLogsPanel` — suivi des journaux via SSE (se connecte à `/api/services/{name}/logs`)
- `ApiKeyCard` — affichage + rotation de la clé (si `needsApiKey: true`)

Enregistrez l’onglet dans `ServicesPageShell.tsx`.

### Étape 7 — Ajouter l’entrée de fournisseur (si le service est une cible de routage)

Si le service intégré expose un endpoint `/v1/chat/completions` compatible avec OpenAI :

1. Ajoutez une entrée de fournisseur dans `src/shared/constants/providers.ts` avec `isEmbeddedService: true`.
2. Créez `open-sse/executors/{name}.ts` en étendant `BaseExecutor`. Recherchez à nouveau le port et
   la clé API pour chaque requête (ne les mettez jamais en cache dans le constructeur). Retournez une
   réponse `503 service_not_running` lorsque l’état du superviseur n’est pas `"running"`.
3. Enregistrez les modèles dans `open-sse/config/providerRegistry.ts` avec le préfixe du service
   (par exemple, `myservice/sub/model`). `modelSync.ts` les maintiendra à jour.

### Étape 8 — Documenter et tester

1. Mettez à jour `docs/frameworks/EMBEDDED-SERVICES.md` (ce fichier) — ajoutez le service au
   tableau de la §1 et tout nouvel endpoint à la §4.
2. Ajoutez des tests unitaires dans `tests/unit/services/` (cycle de vie, programme d’installation, forme de l’API).
3. Ajoutez un test d’intégration dans `tests/integration/services/` (conditionné par `RUN_SERVICES_INT=1`).
4. Mettez à jour `docs/openapi.yaml` avec les nouveaux endpoints.

---

## 7. Dépannage

### Le service ne démarre pas

**Symptômes :** Le bouton de démarrage renvoie 503, l’état reste à `"error"` ou `"starting"`.

**Liste de vérification :**

1. Consultez `GET /api/services/{name}/logs` (ou le panneau Logs dans le tableau de bord). Recherchez
   des lignes telles que `Error: ENOENT`, `address already in use` ou `Cannot find module`.
2. Vérifiez que `npm` se trouve dans le PATH : exécutez `which npm` depuis le même compte utilisateur que celui qui exécute OmniRoute.
3. Vérifiez que le service est installé : consultez `GET /api/services/{name}/status` pour
   connaître `installedVersion`. Si sa valeur est `null`, lancez d’abord l’installation.
4. Vérifiez que `DATA_DIR/services/{name}/node_modules/` existe et n’est pas vide.
5. Consultez le champ `lastError` dans la réponse d’état pour connaître la raison de l’arrêt expurgée.

---

### Le démarrage à froid est lent (> 10 s pour atteindre `running`)

**Symptômes :** L’état reste à `"starting"` pendant longtemps avant de passer à `"running"` ou `"error"`.

**Explication :** Le démarrage à froid de 9Router comprend l’importation de vastes arborescences de dépendances (modules DNS,
tunnel et MITM). L’intervalle de vérification de l’état par défaut est de 2 s, avec 3 tentatives avant que le
superviseur ne déclare un dépassement de délai (tout en poursuivant les vérifications).

**Solution :** Les délais `healthIntervalMs` et `waitForHealthy`
(`healthIntervalMs * 3`) sont configurables dans `bootstrap.ts`. Pour les services dont le
démarrage prend plus de temps, augmentez `healthIntervalMs` à 5000 et `stopTimeoutMs` à 30 000.

---

### Conflit de port (`EADDRINUSE`)

**Symptômes :** Les journaux affichent `address already in use :::20130`.

**Causes :**

- Un autre processus utilise déjà le port 20130.
- Un processus 9Router précédent n’a pas été complètement arrêté (PID zombie).

**Solution :**

1. Modifiez le port par défaut à l’aide de la variable d’environnement `NINEROUTER_PORT` dans `.env`.
2. Recherchez et arrêtez le processus en conflit : `lsof -ti :20130 | xargs kill -9`.
3. Le port est configurable pour chaque service dans `bootstrap.ts` via le champ `port`.

**Remarque :** 9Router utilise par défaut le port 20130 afin d’éviter spécifiquement tout conflit avec
le port par défaut 20128 d’OmniRoute.

---

### Permission refusée (EACCES) lors de l’installation

**Symptômes :** L’installation renvoie 500, les journaux affichent `EACCES` ou `permission denied`.

**Causes :**

- `DATA_DIR` ou son répertoire parent n’est pas accessible en écriture par le processus OmniRoute.
- L’exécution s’effectue dans Docker sans privilèges root et sans accès en écriture au volume monté.

**Solution :**

1. Vérifiez `DATA_DIR` (valeur par défaut : `~/.omniroute/`) : `ls -la ~/.omniroute/`
2. Assurez-vous que l’utilisateur du processus OmniRoute est propriétaire du répertoire : `chown -R $USER ~/.omniroute/`
3. Dans Docker, assurez-vous que le montage du volume dispose des autorisations appropriées pour l’utilisateur du conteneur.

---

### Échec de la mise à jour (dépassement de délai de `npm install` ou erreur réseau)

**Symptômes :** La mise à jour renvoie 500 avec `InstallError`, les journaux affichent un dépassement de délai réseau.

**Liste de vérification :**

1. Vérifiez que le registre npm est accessible : `npm ping`.
2. Vérifiez la présence d’un proxy d’entreprise : `npm config get proxy`, `npm config get https-proxy`.
3. Essayez l’installation manuellement : `npm install {package}@latest --prefix ~/.omniroute/services/{name}/`.
4. Dans un environnement isolé d’Internet, téléchargez l’archive tar au préalable et utilisez `npm install /path/to/tarball.tgz`.

---

### Le service affiche immédiatement l’état `"error"` après son démarrage (arrêt brutal rapide)

**Symptômes :** L’état passe de `"starting"` à `"error"` en moins de 5 secondes.
`lastError` affiche `"Fast crash (exited with code 1)"`.

**Liste de vérification :**

1. Lisez l’intégralité de la fin du journal : `GET /api/services/{name}/logs?tail=500`.
2. Cause fréquente : des variables d’environnement attendues par le service sont manquantes.
3. Pour 9Router : vérifiez que `NINEROUTER_DISABLE_MITM=true` et
   `NINEROUTER_DISABLE_TUNNEL=true` figurent dans l’environnement transmis lors de la création du processus (voir
   `resolveSpawnArgs` dans `installers/ninerouter.ts`).

---

## 8. FAQ

**Q : Puis-je exposer les endpoints des services intégrés à des clients hors loopback ?**

Non. Le niveau LOCAL_ONLY est intentionnel (règle stricte nº 17). Les routes pouvant invoquer
`npm install` ou générer des processus `node` ne doivent pas être accessibles depuis du trafic
hors loopback, car un JWT divulgué via un tunnel (Cloudflare, Ngrok, Tailscale)
permettrait autrement de générer arbitrairement des processus. Il n’existe aucune dérogation
pour `/api/services/` — contrairement à `/api/mcp/`, ce chemin est exclu de la liste
de contournement par la portée de gestion. Consultez `docs/security/ROUTE_GUARD_TIERS.md`.

---

**Q : 9Router et CLIProxyAPI seront-ils disponibles dans les déploiements en production/cloud ?**

Oui. Les deux services suivent le même modèle privilégiant l’exécution locale qu’OmniRoute. Ils s’exécutent
sur la même machine et communiquent via loopback. Ici, « production » désigne le VPS
ou le serveur local sur lequel OmniRoute est déployé, et non un fournisseur cloud distant.

---

**Q : Comment déboguer le superviseur ?**

1. Suivez le flux de journaux SSE : `curl -N http://localhost:20128/api/services/9router/logs`.
2. Consultez les journaux structurés dans la sortie pino d’OmniRoute, filtrés selon
   l’espace de noms `service:supervisor`.
3. Inspectez la ligne de la base de données : `sqlite3 ~/.omniroute/omniroute.db "SELECT * FROM version_manager WHERE tool='9router'"`.
4. Utilisez `GET /api/services/9router/status` pour voir en un seul appel l’état actuel en temps réel, le PID, l’état de santé
   et `lastError`.

---

**Q : Le superviseur affiche `health: "degraded"` ou `health: "unknown"`, mais l’état est `"running"`. Est-ce un problème ?**

`"degraded"` signifie que la sonde de santé a renvoyé une réponse autre que 200. `"unknown"` signifie qu’aucune
sonde ne s’est encore terminée (course avec la première interrogation). Ces deux états sont transitoires pendant le démarrage.
Si l’état de santé reste `"degraded"` pendant plus de `healthIntervalMs * 3` ms après
`"running"`, le service intégré est en cours d’exécution, mais son API HTTP ne répond pas. Vérifiez
si le port est correct dans la réponse d’état et si le service écoute effectivement
sur ce port.

---

**Q : Puis-je modifier la clé API de 9Router sans redémarrage complet ?**

Non. La clé API est transmise à 9Router via une variable d’environnement lors du lancement du processus.
Les variables d’environnement ne peuvent pas être modifiées dans un processus en cours d’exécution. `POST .../rotate-key`
arrête et redémarre automatiquement le service afin d’appliquer la nouvelle clé. La rotation de la clé
prend effet dans un délai correspondant au `stopTimeoutMs` du service (15 s par défaut), auquel s’ajoute son temps
de démarrage.

---

**Q : Quelle est la limite du tampon circulaire et que se passe-t-il lorsqu’il est plein ?**

Chaque service dispose d’un tampon circulaire dédié de 5 Mo. Lorsque le tampon est plein, les lignes
de journal les plus anciennes sont supprimées pour laisser de la place aux nouvelles. L’événement SSE `snapshot` renvoie
les lignes les plus récentes dans la limite définie par `tail`. Les journaux ne sont pas conservés sur disque, sauf si
`logsBufferPath` est défini dans la ligne de la base de données.

---

## Voir aussi

- `docs/security/ROUTE_GUARD_TIERS.md` — détails du niveau LOCAL_ONLY
- `docs/architecture/CODEBASE_DOCUMENTATION.md` — §3.2 correspondance du module Services intégrés
- `docs/architecture/ARCHITECTURE.md` — contexte au niveau du système
- `docs/openapi.yaml` — définitions des endpoints lisibles par machine
- `CLAUDE.md` §« Ajout d’un nouveau service intégré » — liste de contrôle de référence rapide
