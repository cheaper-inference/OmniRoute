# Resilience Guide (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute a trois mécanismes de résilience distincts mais liés. Chacun a une portée et un objectif différents. Gardez-les séparés lors du débogage du comportement de routage.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Source : [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Priorité Env-vs-dashboard pour les bascules de résilience.** Les bascules de résilience opt-in issues de l'environnement — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — ne fournissent que le _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). Un booléen persistait dans `resilienceSettings` (Dashboard →** Paramètres de résilience →** / `PATCH /api/resilience`, stocké dans `key_value`) l'emporte sur la valeur env : la normalisation (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) conserve le booléen stocké chaque fois qu'il en existe un. Définir une telle variable d'environnement sur `true` sur un déploiement où le tableau de bord a déjà enregistré `false` ne change donc rien — activez la bascule** Paramètres de résilience →** (ou effacez le champ stocké) à la place.

## 1. Disjoncteur fournisseur

**Portée :** l'ensemble du fournisseur (par ex. `glm`, `openai`, `anthropic`).

**Objectif :** arrêter d'envoyer du trafic vers un fournisseur qui échoue de manière répétée au niveau du service en amont.

**Implémentation :**

- Classe principale : `src/shared/utils/circuitBreaker.ts`
- Câblage : `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API d'état : `GET /api/monitoring/health`
- API de réinitialisation : `POST /api/resilience/reset`
- Wrappers : `open-sse/services/accountFallback.ts`
- Table de base de données : `domain_circuit_breakers`

**États :**

- `CLOSED` — trafic normal autorisé
- `DEGRADED` — trafic toujours autorisé, mais des échecs fournisseur accrus sont suivis ; revient à `CLOSED` après suffisamment de succès, après un test de connexion valide, ou après la plus longue durée de maintien `OPEN` pour le dernier type d'échec (sa valeur `cooldownByKind`, sinon `resetTimeout`, × `maxBackoffMultiplier`, au moins un délai de refroidissement) sans nouvel échec
- `OPEN` — fournisseur temporairement bloqué ; le routage combo l'ignore
- `HALF_OPEN` — délai de réinitialisation écoulé ; requête de sonde autorisée

**Valeurs par défaut configurables (`open-sse/config/constants.ts`, exposées dans Tableau de bord → Paramètres → Résilience) :**

| Classe  | Dégradé à | S'ouvre à | Délai de réinitialisation |
| ------- | --------- | --------- | ------------------------- |
| OAuth   | 5 échecs  | 8 échecs  | 60s                       |
| Clé API | 7 échecs  | 12 échecs | 30s                       |
| Local   | dérivé    | 2 échecs  | 15s                       |

`degradationThreshold` contrôle le moment où un fournisseur entre dans `DEGRADED` ; `failureThreshold` contrôle le moment où il s'ouvre et est ignoré. Les profils de fournisseur Local ne sont pas encore exposés sur la page des paramètres de résilience.

**Codes de déclenchement :** uniquement les statuts au niveau fournisseur `[408, 500, 502, 503, 504]`. Ne PAS déclencher pour les erreurs au niveau compte (la plupart des 401/403/429 — celles-ci relèvent du cooldown ou du verrouillage).

**Récupération paresseuse :** lorsque `OPEN` expire, `getStatus()`, `canExecute()`, `getRetryAfterMs()` rafraîchissent l'état vers `HALF_OPEN`. Les mêmes lectures (et l'échec suivant) font retomber un `DEGRADED` obsolète vers `CLOSED`. Aucun minuteur en arrière-plan n'est nécessaire.

---

### Cooldown global fournisseur sur opt-in (fenêtre de garde)

Une quatrième couche, **sur opt-in** (`PROVIDER_COOLDOWN_ENABLED`, par défaut **désactivée**), conserve une mémoire inter-requêtes des fournisseurs en échec dans `open-sse/services/providerCooldownTracker.ts`, consultée par la résolution des cibles de combo afin que des requêtes combo consécutives cessent de reparcourir un fournisseur qui vient d'échouer. Les entrées au niveau fournisseur respectent la fenêtre de garde de `PROVIDER_PROFILES` :

| Profil  | se déclenche après (`providerFailureThreshold`) | à l'intérieur de (`providerFailureWindowMs`) | refroidit pendant (`providerCooldownMs`) |
| ------- | ----------------------------------------------: | -------------------------------------------: | ---------------------------------------: |
| OAuth   |                                            `10` |                                      `15min` |                                   `5min` |
| Clé API |                                            `15` |                                      `30min` |                                  `10min` |

En dessous du seuil, le fournisseur n'est **pas** considéré comme en refroidissement ; un succès efface la fenêtre. Les entrées au niveau connexion (`provider:connectionId`) conservent à la place le backoff exponentiel `minRetryCooldownMs → maxRetryCooldownMs`. Surcharges : `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. Garde-fou de régression : `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Délai de refroidissement de la connexion

**Portée :** connexion/compte/clé d’un seul fournisseur.

**Objectif :** ignorer une clé défaillante tout en permettant aux autres connexions du même fournisseur de continuer à répondre.

**Implémentation :**

- Marquage comme indisponible : `src/sse/services/auth.ts::markAccountUnavailable()`
- Sélection : `getProviderCredentials*` dans le même fichier
- Calcul du délai de refroidissement : `open-sse/services/accountFallback.ts::checkFallbackError()`
- Paramètres : `src/lib/resilience/settings.ts`

**Champs par connexion :**

- `rateLimitedUntil` — horodatage jusqu’à l’expiration du délai de refroidissement
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — compteur de temporisation exponentielle

**Délais de refroidissement par défaut :**

- Base OAuth : 5 s
- Base pour les clés d’API : 3 s
- HTTP 429 pour les clés d’API : privilégie les en-têtes `Retry-After`/de réinitialisation fournis par le serveur amont ou un texte de réinitialisation analysable
- Temporisation : `baseCooldownMs * 2 ** failureIndex`

**Délai de nouvelle tentative par fournisseur.** La page de détails du fournisseur comporte une liste **Délai de nouvelle tentative** (Automatique, de
15 s à 1 h). Elle enregistre `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600, via `PATCH /api/resilience`). Lorsqu’une erreur de limitation de débit ne contient aucun indice de nouvelle tentative fourni par le serveur amont,
cette valeur remplace la temporisation mise à l’échelle pour le fournisseur et réinitialise `backoffLevel` à 0
(`open-sse/services/rotationConfig.ts::overrideFor`). Ordre de priorité pour une erreur de limitation de débit, du plus élevé au plus faible : indice de nouvelle tentative fourni par le serveur amont, puis
`providerSpecificData.rotationOverrides.rateLimitResetSeconds` par connexion, puis le délai de nouvelle tentative par fournisseur, puis
`OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` défini dans l’environnement, puis la temporisation mise à l’échelle. Le mode Automatique supprime le champ. Cela affecte uniquement le motif de limitation de débit, jamais les états terminaux.

**Protection contre l’effet de troupeau :** empêche les échecs simultanés de prolonger excessivement le délai de refroidissement ou d’incrémenter deux fois `backoffLevel`.

**Les HTTP 429 dus à la limite de concurrence ne font pas progresser l’échelle de temporisation.** Un
`429` dont le corps indique une limite de concurrence (« trop de requêtes simultanées », « limite de concurrence », « limite de requêtes
parallèles », `并发数过高` pour GLM) signifie que le compte est sain mais occupé.
`checkFallbackError()` renvoie le motif `concurrency_limited` : basculer immédiatement vers la connexion suivante, refroidir celle-ci pendant une durée fixe de
`CONCURRENCY_LIMIT_COOLDOWN_MS` (1 s) ou jusqu’à l’indication de nouvelle tentative fournie par le serveur amont, conserver `backoffLevel`
inchangé et définir `skipProviderBreaker`.
Un corps indiquant explicitement un quota reste prioritaire : un corps correspondant également à un motif de quota conserve un verdict de quota.
Détection : `looksLikeConcurrencyLimit()` dans `src/shared/utils/classify429.ts` ;
verdict : `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (le `FailureKind` du disjoncteur) reste inchangé et lit toujours
`rate_limit` pour ces corps.

**Les blocages du contenu du flux ne refroidissent pas le compte.** Lorsque le contrôleur de blocage du contenu
(`open-sse/utils/streamHandler.ts`) abandonne un flux qui n’a envoyé aucune sortie du modèle dans le délai imparti,
`markAccountUnavailable()` enregistre l’erreur sur la connexion, mais ne définit aucun délai de refroidissement : le blocage appartient à cette requête, le plus souvent lors d’une longue phase de raisonnement sans sortie pour le moment. Les opérateurs peuvent réactiver ce comportement avec
`resilienceSettings.streamStallCooldown.enabled` (valeur par défaut `false`).

**Signal de latence facultatif pour la sélection de comptes `p2c`.** Chaque tentative distribuée enregistre son temps jusqu’au premier octet et son résultat par connexion (et par connexion + modèle) dans une fenêtre glissante en mémoire : les 20 derniers échantillons sur 15 minutes
(`open-sse/services/connectionLatencyTracker.ts`, enregistrés depuis
`safeLogEvents()` dans `src/sse/handlers/chatHelpers.ts`). Lorsque `resilienceSettings.p2cLatency.weight` est supérieur à
`0` (plage de 0 à 20, valeur par défaut `0` = désactivé), `compareP2CConnections()` dans `src/sse/services/auth.ts` ajoute jusqu’à `weight` points à chaque candidat de la paire. La moitié de ces points provient de la latence, sous forme de ratio par rapport au candidat le plus rapide (une vitesse deux fois moindre représente la totalité de cette moitié), et l’autre moitié du taux d’erreur glissant.
Le terme ne s’applique que lorsque les deux candidats disposent d’au moins 3 échantillons, afin de ne pas pénaliser les nouveaux comptes, et son plafond reste inférieur aux pénalités de blocage et d’épuisement du quota.
Il n’ajoute aucun circuit qui lui soit propre : les comptes défaillants continuent d’être gérés par les couches de délai de refroidissement, de verrouillage et de disjoncteur. Définissez-le avec `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Les trames de raisonnement redémarrent le budget de blocage du contenu.** Un modèle de raisonnement peut réfléchir pendant
plusieurs minutes avant son premier jeton visible : Claude diffuse des trames `thinking_delta` dont le texte de réflexion peut être vide, et l’API Responses diffuse un élément de raisonnement après l’autre.
`isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) reconnaît ces trames, et le contrôleur redémarre son budget à chacune d’elles au lieu d’annuler le tour. Elles ne constituent toujours pas une sortie du modèle : un tour qui se termine uniquement par du raisonnement est donc toujours signalé comme vide, et un tour qui cesse de raisonner et n’envoie plus que des signaux de présence déclenche toujours le contrôleur.

Les trames binaires `reasoningContentEvent` de Kiro avec une signature non vide préservent cette activité de raisonnement dans l’exécuteur sous la forme d’un delta `reasoning_content` vide. La signature n’est pas transmise. Les métadonnées, les trames incomplètes et les signatures vides ne redémarrent pas le budget de contenu ; le délai d’expiration indépendant du flux actif et l’annulation par le client continuent de s’appliquer (`open-sse/executors/kiro/reasoning.ts`).

**États terminaux (PAS des délais de refroidissement) :**

- `banned` — défini par la détection de mots-clés interdits / de bannissement de compte (voir [BAN_DETECTION](../security/BAN_DETECTION.md)). Les refus par requête provenant du serveur amont (`request_rejected`, par exemple HTTP 403 OAuth Anthropic « Request not allowed ») ne le définissent jamais : ils sont comptabilisés par connexion et par modèle et retirent ce modèle de la rotation avec un délai de refroidissement croissant plafonné à `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), ou refroidissent la connexion lorsqu’aucun modèle n’est connu — `open-sse/services/requestRejectedStreak.ts`
- `expired` (passe à l’état terminal après un nombre limité de tentatives — `EXPIRED_RETRY_MAX = 3` avec une temporisation exponentielle — afin que les erreurs OAuth transitoires puissent se corriger d’elles-mêmes avant la désactivation définitive du compte)
- `credits_exhausted`

Ces états persistent jusqu’à la modification des identifiants ou leur réinitialisation par un opérateur. Ne remplacez pas les états terminaux par un état de refroidissement transitoire.

**Récupération différée :** lorsque `rateLimitedUntil` est dépassé, la connexion redevient éligible. Après une utilisation réussie, `clearAccountError()` efface tous les champs d’erreur.

### Plafond d’utilisation OAuth Claude : voie à priorité réduite + réinitialisation de la limite de session

**Portée :** une connexion d’abonnement Claude (OAuth). Les deux fonctionnalités sont **facultatives par
connexion** (Modifier la connexion → section Claude → `lowPriorityMode` / `autoLimitReset` dans
`providerSpecificData`, toutes deux désactivées par défaut) et reproduisent les commandes `/low-priority` et
`/limit-reset` de Claude Code (contrat filaire capturé depuis Claude Code 2.1.263).

**Implémentation :**

- Machine à états + classification des réponses : `open-sse/services/claudeLowPriority.ts`
- Client de statut/réclamation de réinitialisation : `open-sse/services/claudeLimitReset.ts`
- Hook de l’exécuteur (injection d’en-tête + nouvelle tentative avec le même compte) : `open-sse/executors/base.ts::execute()`
- Persistance de l’activation : `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Déclencheur :** le plafond d’utilisation de 5 heures — un `429` dont les en-têtes contiennent
`anthropic-ratelimit-unified-status: rejected` et, lorsque le compte est éligible,
`anthropic-ratelimit-unified-slow-offer: treatment`. Rien n’est envoyé avant ce premier `429` du plafond ;
un `429` en rafale sans en-têtes unifiés suit le chemin normal de refroidissement.

**Voie à priorité réduite** (`lowPriorityMode`) :

- Lors du `429` du plafond, l’exécuteur accepte l’offre et réessaie immédiatement avec le **même**
  compte en utilisant `anthropic-usage-limit: slow` ; la voie reste active jusqu’à la date annoncée
  `anthropic-ratelimit-unified-reset` (+ une grâce de 60 s), et chaque requête de cette fenêtre porte
  l’en-tête. Le `429` intercepté n’atteint jamais `handleChatCore`, de sorte que la connexion n’est
  **pas** placée en refroidissement et n’est pas remplacée par une autre.
- `anthropic-ratelimit-unified-slow-status` dans les réponses ultérieures : `active` / `not_needed`
  maintiennent la voie ; `slot_busy` (`429`) ou un `529` attendent la valeur fournie par le serveur
  `anthropic-ratelimit-unified-slow-retry-after` (20 s par défaut, limitée à 5–600 s, avec une
  variation aléatoire de ±30 %) puis réessaient, dans la limite de
  `anthropic-ratelimit-unified-slow-max-wait` (20 min par défaut, limitée à 1 min–6 h) — au-delà,
  la voie prend fin et une période de refroidissement de 10 minutes bloque une nouvelle acceptation.
  L’attente est en outre plafonnée par le temps restant du délai d’expiration propre au démarrage
  upstream de la requête (`resolveFetchStartTimeout`, 10 min par défaut), moins une marge de 5 s :
  sans ce plafond, la durée maximale d’attente par défaut de 20 minutes dépasserait la durée de la
  requête et la veille serait interrompue en plein milieu, faisant apparaître un `TimeoutError` au
  lieu d’une fin `max_wait` progressive suivie d’un refroidissement.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, le renouvellement de la fenêtre de 5 h,
  ou `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (ce qui y met fin avec
  `extra_usage` quel que soit le statut, puisque le dépassement payant couvre désormais le plafond)
  mettent fin à la voie ; la réponse suit alors le chemin normal de refroidissement.
  `budget_exhausted` est mémorisé jusqu’à la réinitialisation budgétaire annoncée (≤ 8 jours).
- La vérification du plafond s’exécute après les nouvelles tentatives intra-tentative déclenchées
  par les `400` de l’exécuteur lui-même (modification du contexte, limitations de la réflexion/de
  l’effort, apprentissage automatique des paramètres), de sorte qu’un `429` du plafond qui n’apparaît
  que lors de l’une de ces nouvelles tentatives est tout de même intercepté au lieu d’atteindre le
  chemin de refroidissement.
- L’état est conservé en mémoire par connexion (un redémarrage nécessite un `429` supplémentaire du
  plafond pour une nouvelle acceptation).

**Réinitialisation de la limite de session** (`autoLimitReset`, tentée avant la voie lorsque les deux sont activées) :

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → bloc `juniper_tide` ;
  lorsque `arm: "reset"` et `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` avec
  `{ "program": "juniper_tide" }` (UUID de l’organisation provenant de
  `providerSpecificData.organizationUUID`, avec solution de repli au démarrage).
- `result: reset|not_limited` → la requête est réessayée à pleine vitesse (sans en-tête slow).
  `already_used` / `not_offered` mémorisent `next_available_at` (une semaine par défaut) ; tout
  échec déclenche un délai de reprise de 15 minutes. La réinitialisation est hebdomadaire et compte
  toujours dans la limite hebdomadaire.

Protections contre les régressions : `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Affinité de session (#7274)

**Portée :** une session client (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header)
épinglée à une seule connexion, pour **n’importe quel** fournisseur.

**Objectif :** maintenir un agent multi-tour (Claude Code, aider, agents personnalisés) sur le même compte
d’une requête à l’autre, afin de réduire la perte de contexte entre comptes et les `429` répétés lors
du démarrage à froid chez les fournisseurs disposant d’un état de session par compte.

**Implémentation :**

- Résolution du TTL : `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Sélection/création de l’épingle : `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Extraction de l’en-tête (générique, tout fournisseur) : `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Table des épingles persistantes : `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Paramètre : `sessionAffinityTtlMs` (TTL global en ms, `0` désactive) — `src/lib/db/settings.ts`. Renommé
  depuis `codexSessionAffinityTtlMs`, spécifique à Codex, par la migration
  `124_generic_session_affinity_ttl.sql`, qui reporte toute valeur TTL Codex précédemment configurée
  comme nouvelle valeur par défaut.

Avant le #7274, `resolveSessionAffinityTtlMs()` s’arrêtait immédiatement avec `0` pour tous les
fournisseurs autres que `codex`. Le paramètre TTL (ainsi que les en-têtes de session) n’avait donc aucun
effet ailleurs, même si le mécanisme d’épinglage et l’extraction des en-têtes étaient déjà indépendants
du fournisseur. Le correctif a supprimé ce retour anticipé ; le TTL s’applique désormais uniformément
à tous les fournisseurs dès qu’il est défini globalement à une valeur supérieure à `0`.

Les trois en-têtes d’affinité de session ne sont jamais transmis en amont — les exécuteurs construisent
leurs propres en-têtes upstream à partir de zéro au lieu de transmettre les en-têtes client ; ils restent
donc uniquement un identifiant de corrélation interne.

### Baux exclusifs de connexion pour les sessions gérées

**Portée :** un seul client/une seule session HTTP géré(e) possède une connexion OmniRoute éligible.

**Objectif :** fournir une propriété exclusive et durable d’une connexion pour les clients qui
nécessitent une barrière de routage stricte entre les requêtes. Cela diffère de l’affinité de
session, qui est une préférence souple de continuité :
un bail exclusif conserve l’état du cycle de vie dans SQLite, impose l’unicité globale du
propriétaire actif et de la connexion active, et rejette une génération obsolète avant le
dispatch vers le fournisseur.

La fonctionnalité est activée au niveau de chaque clé API. Une clé gérée doit disposer de la
portée `lease:exclusive` et d’une liste `allowedConnections` explicitement définie et non vide. Tout
client HTTP peut utiliser le point de terminaison du cycle de vie ; aucun nom de client,
agent utilisateur, fournisseur, méthode OAuth ou modèle n’est requis. Le bail possède une connexion,
et non un modèle ; un changement de modèle conserve donc l’association tant que la connexion reste
normalement éligible. Les règles normales de modèle, de quota, d’état de santé, de mise en
quarantaine et de liste d’autorisation restent prioritaires et peuvent faire passer la même
génération à une autre connexion libre éligible.

Le cycle de vie est `POST /api/v1/session-leases` avec les actions JSON `acquire`, `renew` et `release`.
Les requêtes d’inférence gérées présentent la valeur opaque `X-OmniRoute-Lease-Owner` et la valeur
exacte `X-OmniRoute-Lease-Generation`. Le propriétaire utilise `vlo_` suivi de 43 caractères
base64url ; seul son hachage SHA-256 est conservé. Chaque barrière de dispatch final lie également
l’identifiant de clé API authentifié et l’identifiant de connexion active. Les en-têtes de contrôle
du bail sont supprimés des journaux, des instantanés de requêtes conservés et des en-têtes de
l’exécuteur en amont.

Si le routage ordinaire dispose de candidats gérés éligibles, mais que chaque candidat libre est
occupé par un bail actif appartenant à un tiers, OmniRoute renvoie HTTP `429`, le code
lease-capacity-unavailable, un état d’attente de capacité et un en-tête `Retry-After` borné, calculé
à partir de l’expiration pertinente la plus proche.
Une absence ordinaire d’éligibilité n’est pas une contention de baux et conserve la sémantique
existante des erreurs de routage.

Les mécanismes associés restent distincts :

- L’occupation des sessions OAuth assure une distribution souple, locale au processus, pour les comptes OAuth.
- Les sémaphores de compte accordent des permis de concurrence des requêtes et prennent fin lorsqu’une requête est terminée.
- Les baux de session gérés exclusifs assurent une propriété durable du cycle de vie avec une barrière de génération.

## 3. Verrouillage des modèles

**Portée :** triplet fournisseur + connexion + modèle.

**Portée selon le statut :** le statut en échec détermine la clé dans laquelle un verrouillage est écrit
(`resolveLockoutScope()` dans `open-sse/services/accountFallback/exactModelLock.ts`) :

- `429` / `403` / `402` — un signal de quota ou de droit d’accès — verrouille la **famille de quotas** :
  pour codex, toute la portée `codex` / `spark` (chaque modèle `gpt-5*` de la
  connexion), et pour les autres fournisseurs, `getQuotaScopedModelForProvider()`.
- `404` verrouille le modèle sans modification (`getModelLockKey()` réduit la portée pour
  `not_found`).
- Tout autre statut — les échecs de transport/serveur `5xx` et le `502` synthétisé par
  OmniRoute lors de la validation de la qualité — verrouille uniquement le tuple **exact**
  fournisseur/connexion/modèle. Un flux défectueux sur un modèle ne fournit aucune indication
  sur le quota du compte ; avant cette règle, une réponse vide sur
  `codex/gpt-5.6-luna` retirait du routage tous les modèles `gpt-5*` de cette connexion pendant
  2 à 30 min (avec escalade), alors que son quota restait intact.
- L’option `scope` explicite d’un appelant est toujours prioritaire (Antigravity transmet `"exact"`).

**Objectif :** éviter de désactiver toute une connexion lorsqu’un seul modèle est indisponible ou limité par un quota.

**Exemples :**

- Fournisseurs avec quotas par modèle renvoyant `429`
- Fournisseurs locaux renvoyant `404` pour un modèle manquant
- Échecs d’autorisation spécifiques au fournisseur pour un mode/modèle (par ex. modes Grok)

**Implémentation :** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Tableau de bord des délais de récupération des modèles (v3.8.0)

UI : Paramètres → Délais de récupération des modèles (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Répertorie les verrouillages actifs avec : fournisseur, connexion, modèle, raison, expiresAt. Les opérateurs peuvent réactiver manuellement un modèle depuis la carte.

**API REST :**

- `GET /api/resilience/model-cooldowns` — répertorier les verrouillages actifs
- `DELETE /api/resilience/model-cooldowns` — réactivation manuelle. Corps : `{provider, connection, model}`. Authentification : gestion.

### Gestionnaire des délais de récupération

UI : Supervision → Gestionnaire des délais de récupération (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Une seule page pour chaque connexion exclue du routage pour une raison temporaire, au lieu
d’ouvrir la page de chaque fournisseur. Elle répertorie les délais de récupération des connexions,
les verrouillages de modèles et les états terminaux, les efface par connexion, pour une
sélection ou pour toutes les connexions d’un fournisseur, et permet de modifier les règles de
délai les plus couramment ajustées : `streamStallCooldown.enabled` et le délai de récupération
de base `connectionCooldown` ainsi que le nombre maximal d’étapes de backoff pour OAuth / les
clés API (enregistrés via `PATCH /api/resilience`). Les états terminaux (`banned`, `expired`, `credits_exhausted`) sont
répertoriés, mais ne sont jamais effacés ici.

La carte **Règles de délai de récupération des erreurs** sur la même page modifie les règles
d’erreur de l’opérateur (`settings.providerErrorRules`) et les valeurs par défaut générales
par fournisseur (`settings.providerErrorDefaults`) via `PATCH /api/settings` — voir « Règles
déclarées par l’opérateur » sous §7 pour savoir comment elles sont mises en correspondance.
Les durées sont Par défaut (aucun délai explicite), 30 min, 1 h, 5 h, 24 h ou une valeur
personnalisée de 1 à 43 200 minutes (30 jours).

**API REST** (`src/lib/resilience/cooldownManager.ts`, authentification : gestion) :

- `GET /api/resilience/cooldowns[?provider=]` — connexions avec leur statut, le délai de récupération restant,
  le niveau de backoff, le dernier type d’erreur et les verrouillages de modèles (sans identifiants)
- `POST /api/resilience/cooldowns` — corps `{connectionIds: string[]}` ou
  `{all: true, provider?}` ; renvoie `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Interface des paramètres de verrouillage + récupération par décroissance après succès (v3.8.23)

Le verrouillage des modèles est passé d’un comportement codé en dur et toujours actif à une
fonction entièrement configurable et désactivée par défaut, avec sa propre carte de paramètres
et un mécanisme de récupération autoréparateur.

**Carte de paramètres :** Paramètres → Verrouillage des modèles
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Elle est **distincte** de `ModelCooldownsCard`, en lecture seule, présentée plus haut (qui se
contente de _répertorier_ les verrouillages actifs) — la nouvelle carte _configure les paramètres_.
Les valeurs par défaut résident dans `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) :

| Paramètre               | Valeur par défaut                | Signification                                                                        |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------------------ |
| `enabled`               | `false`                          | Interrupteur principal — le verrouillage des modèles est **désactivé par défaut**.   |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Statuts en amont comptabilisés comme un échec ciblé sur le modèle.                   |
| `baseCooldownMs`        | `120_000` (120 s)                | Durée initiale du verrouillage lors du premier échec.                                |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Plafond du délai de récupération avec escalade.                                      |
| `maxBackoffSteps`       | `10`                             | Nombre maximal d’étapes d’escalade du backoff exponentiel.                           |
| `useExponentialBackoff` | `true`                           | Indique si les échecs répétés augmentent exponentiellement le délai de récupération. |

Les paramètres sont conservés dans le magasin de paramètres normal et validés via le schéma
des paramètres de résilience ; la carte limite `baseCooldownMs`/`maxCooldownMs`
(avec `maxCooldownMs ≥ baseCooldownMs`) ainsi que `maxBackoffSteps`.

**Récupération par décroissance après succès :** la récupération ne dépend **pas** uniquement de
l’expiration du délai. Une réponse saine réduit progressivement le nombre d’échecs du modèle,
afin qu’un modèle rétabli au milieu de la fenêtre cesse d’augmenter son escalade (et soit
déverrouillé) avant l’expiration de son délai. Lorsqu’une cible de combinaison réussit,
`open-sse/services/combo.ts` appelle `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), qui **divise par deux** le
`failureCount` enregistré (`Math.floor(failureCount / 2)`) ; lorsqu’il atteint `0`, l’entrée
de verrouillage est entièrement supprimée. La fonction correspondante
`recordModelLockoutFailure()` incrémente le compteur (et augmente le délai de récupération)
lors des échecs survenant dans la fenêtre d’escalade. Cette décroissance après succès s’ajoute
à la simple expiration du délai — l’un ou l’autre mécanisme peut réactiver un modèle.

**État :** les blocages sont conservés **en mémoire** (des `Map`s par processus de
`ModelLockoutEntry`, indexées par `provider:connectionId:model`, les blocages de portée exacte étant indexés par
`provider:connectionId:exact:model`), et ne sont pas persistés dans
la base de données — ils sont perdus au redémarrage. Les _paramètres_ sont persistés ; l’_état_ actif du blocage est éphémère.

---

## 4. Contrôle de la concurrence par partage de quota (v3.8.36)

Les comptes d’abonnement (GLM, MiniMax, etc.) n’acceptent souvent que ~1–3
requêtes simultanées ; dépasser cette limite déclenche des 429 et des périodes de
refroidissement. Le problème est particulièrement aigu avec les combinaisons de
**partage de quota** (`qtSd/…`), où plusieurs clés API partagent un même compte
en amont. Trois couches empêchent qu’un compte partagé soit submergé.

### Plafond de concurrence par connexion (`max_concurrent`)

Chaque connexion de fournisseur peut déclarer un plafond `max_concurrent`
(`provider_connections.max_concurrent`, défini dans la fenêtre de connexion / l’API / la base de données).
Laissez ce champ vide pour n’appliquer aucune limite. Il s’agit du paramètre
unique qui pilote la couche de sérialisation ci-dessous — définissez-le sur la
concurrence réelle du compte (par exemple, GLM ~1, MiniMax ~2).

### Plafonds de concurrence par modèle (`modelConcurrency`)

Une connexion peut également déclarer des plafonds exacts de concurrence par
modèle dans sa map `rateLimitOverrides` :

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Définissez cette valeur dans la fenêtre de connexion (**Remplacements de limite
de débit → Plafonds de concurrence par modèle**, un `model=cap` par ligne) ou via
`PATCH /api/providers/[id]` avec la même structure JSON. Sémantique des clés :

- **À l’échelle de la connexion ou spécifique au modèle :** `maxConcurrent` reste
  le plafond partagé à l’échelle de la connexion. Lorsque les deux s’appliquent,
  les deux verrous sont acquis atomiquement dans le même verrou composite
  (`global → provider → account → model`) ; le comportement effectif est celui
  de la limite applicable la plus stricte.
- **Correspondance exacte de la clé de modèle :** la clé est la chaîne du modèle
  transmise à l’exécuteur après la résolution du routage — normalement l’identifiant
  de modèle brut du fournisseur en amont (`glm-5`), et non un alias
  `provider/model` côté client (`zai/glm-5` ne correspond pas à `glm-5`). Les
  valeurs sont des plafonds positifs de requêtes simultanées exprimés en entiers.
- **Mise en file locale, sans découverte :** les requêtes excédentaires sont mises
  en file localement selon les sémantiques existantes de file d’attente et de délai
  d’expiration (erreurs d’admission typées `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL`). OmniRoute ne découvre ni n’infère la politique du
  fournisseur en amont — il applique les plafonds exacts configurés par
  l’opérateur. Un verrou de modèle saturé ne désactive jamais le fournisseur et
  ne crée jamais de blocage permanent du modèle ; le comportement de secours face
  aux 429, aux périodes de refroidissement et aux basculements en amont reste le
  mécanisme de repli en cas d’erreur.
- **Portée par connexion et par processus :** les plafonds s’appliquent à chaque
  connexion de base de données et sont conservés en mémoire ; deux connexions
  réutilisant la même clé API en amont ne se coordonnent donc pas entre elles.
- **Non configuré signifie inchangé :** omettre la map (ou laisser le champ du
  tableau de bord vide) n’ajoute aucun verrou de modèle. Exemple de configuration
  sans imposer de limite universelle au fournisseur :

```text
glm-5=1
glm-4.7=3
```

### Sérialisation des requêtes avec partage de quota

Lorsqu’une répartition avec partage de quota cible une connexion qui déclare un
`max_concurrent` positif, les requêtes simultanées vers ce **compte** sont
sérialisées via un sémaphore par connexion (clé `qsconn:<connectionId>`) : les
requêtes excédentaires **attendent dans la file** au lieu de submerger le compte.
Ce mécanisme est **non bloquant en cas d’échec** — une file saturée ou un délai
d’expiration s’écoule sans emplacement disponible, mais une requête pouvant être
répartie n’est jamais rejetée. Activez ou désactivez cette fonction dans
**Paramètres → Résilience → Concurrence par connexion pour le partage de quota**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, activé par défaut).
Sans plafond `max_concurrent`, le comportement reste inchangé.

> Le verrou de routage du partage de quota (`selectQuotaShareTarget`, DRR + P2C)
> est lui-même non bloquant en cas d’échec et se contente de _déprioriser_ une
> connexion ayant atteint son plafond — avec un pool à connexion unique, il ne
> peut pas imposer de limite stricte ; ce sémaphore est donc ce qui contient
> réellement l’afflux.

### Nouvelle tentative tenant compte du refroidissement des combinaisons

Pour chaque stratégie de combinaison (lorsqu’elle est activée), une requête qui
provoquerait un 429 pour un bref refroidissement transitoire attend la fin de
celui-ci et est redistribuée au lieu de renvoyer le 429 — cela couvre les fenêtres
TPM/RPM de type Gemini (~60 s de `retry-after`) sur les combinaisons multimodèles,
par exemple lorsque les deux cibles d’une combinaison à 2 modèles atteignent une
limite de débit par modèle. Le comportement est limité par `comboCooldownWait`
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) dans **Paramètres →
Résilience**. Il n’attend jamais en cas de `quota_exhausted` (verrouillé jusqu’à
minuit), ni pour des raisons d’authentification ou de ressource introuvable.

Une combinaison peut désactiver ce comportement avec
`config.comboCooldownWaitEnabled: false`. Seule la valeur littérale `false`
désactive ces attentes partagées des combinaisons (attente de refroidissement
après répartition et attentes préalables à la répartition liées à l’ouverture du
circuit ou au verrouillage du modèle), ainsi que l’extension de la limite
inférieure du délai d’expiration par le budget d’attente. Une valeur absente ou
`true` conserve la politique globale ; `true` ne peut pas activer une attente
désactivée globalement. Un `targetTimeoutMs` explicite reste prioritaire. Cette
désactivation ne modifie pas l’attente préalable à la répartition, distincte, du
verrouillage de tour natif de Codex.

Le même verrou couvre le cas préalable à la répartition (#16319) : lorsque toutes
les cibles d’une combinaison sont ignorées avant toute tentative parce que leur
modèle se trouve dans un bref verrouillage transitoire, le chemin sans tentative
attend la fin du verrouillage selon les mêmes plafonds, puis redistribue la
requête, au lieu de répondre par un `503 ALL_TARGETS_SKIPPED` sans indication.
Lorsqu’aucune attente n’est autorisée (plafond, nombre de tentatives ou budget
épuisé, ou fonctionnalité désactivée), la réponse finale devient
`429 rate_limit_error` et contient `retry_after` / `reset_at` issus de
l’expiration du verrou transitoire la plus proche ; les verrouillages liés au
quota, à l’authentification et aux ressources introuvables conservent le 503
sans indication.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. Contrôle d'admission de la file de requêtes (v3.8.49 · issue #6593)

**Portée** : la file locale de limitation de débit par fournisseur+connexion (`open-sse/services/rateLimitManager.ts`, adossée à Bottleneck), un niveau en dessous des trois mécanismes ci-dessus.

**`maxWaitMs` borne l'attente en file ; `executionMaxWaitMs` borne l'exécution.**
Les deux sont délibérément distincts, et aucun n'alimente l'autre.

`resilienceSettings.requestQueue.maxWaitMs` est le **budget d'attente en file** : il couvre l'attente d'un emplacement chez le fournisseur puis le séjour à l'état QUEUED, et son minuteur est annulé dès que la tâche quitte QUEUED et commence à s'exécuter (`rateLimitManager.ts`, `wrappedFn`). Une requête qui le dépasse n'atteint jamais l'amont. Valeur par défaut 30000 ms, fournie par `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` dans `src/lib/resilience/settings.ts` et figée par `tests/unit/ratelimit-admission-control-6593.test.ts`, de sorte qu'une modification de cette valeur fait échouer ce test au lieu de laisser ce paragraphe silencieusement obsolète.

`resilienceSettings.requestQueue.executionMaxWaitMs` est ce que Bottleneck reçoit comme `expiration` de la tâche, dont le minuteur ne démarre qu'après la distribution. C'est un garde-fou pour les exécuteurs dépourvus de leur propre délai d'attente amont, et il est porté au délai de démarrage du fetch propre à l'exécuteur lorsque celui-ci est plus long, de sorte qu'il ne peut pas couper une réponse saine en cours de transmission. Valeur par défaut 600000 ms (10 min).

Injecter le budget de file dans `expiration` est ce qui tuait autrefois les passerelles non incrémentales en plein vol — elles tournent légitimement pendant des minutes avant les premiers octets — et c'est pourquoi une expiration est exposée sous `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) tandis que le budget de file porte le code de dépassement de file. Remplacez l'un ou l'autre via `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) ou le tableau de bord (**Settings → Resilience**). Les deux sont bornés entre 1 ms et 24 h lors de la normalisation.

**Priorité, pour les deux :** la variable d'environnement ne fournit que la valeur _par défaut_. Une valeur persistée dans `resilienceSettings.requestQueue` (tableau de bord / patch API, stockée dans `key_value`) l'emporte sur elle, et un `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` par connexion l'emporte sur celle-là. Définir la variable d'environnement sur un déploiement qui possède déjà une valeur persistée ne change donc rien — effacez ou mettez à jour le paramètre persisté à la place.

Le séjour en file est borné par `maxWaitMs` ; `maxQueueDepth` ci-dessous borne combien d'appelants peuvent être en file simultanément.

**Réessais déclarés dans le corps : cadencement vs verrouillage.** Un corps 429 peut nommer sa propre attente (Gemini `RetryInfo.retryDelay`, texte "retry after Ns"), que `updateFromResponseBody` lit. Une attente qui tient dans le `maxWaitMs` de la connexion est du cadencement : le limiteur vide son réservoir pendant cette durée et les appels en file sont distribués quand il se remplit à nouveau. Une attente plus longue que `maxWaitMs` n'est pas quelque chose que la file peut patienter — Gemini répond à un quota quotidien épuisé avec `retryDelay: "86399s"`. Le `Retry-After` relayé sur le 429 reconstruit (#16528) fait déjà verrouiller le modèle par le moteur de repli pour cette fenêtre, mais suspendre le limiteur pour cela aussi bloquerait encore tout appel qui atteint la clé en avance (après une réinitialisation de résilience, par exemple) pendant tout le `maxWaitMs`. Lorsqu'une telle attente provient d'un détail Google typé `RetryInfo` (la provenance `google_rpc_retry_info`) et que le limiteur de la clé est déjà restreint au modèle (voir `getLimiterKey`), le 429 devient à la place un verrouillage de modèle sur cette connexion (`lockModelForLongBodyRetry` dans `open-sse/services/rateLimitManager/bodyRetryPause.ts`, plafonné à 24 h), et le limiteur n'est pas suspendu. La sélection de compte saute sur ce verrou via `isModelLocked()`, et la barrière de pré-distribution du combo fait de même pour les cibles épinglées à la connexion. Sur antigravity, dont le limiteur est par famille de quota, le verrou porte sur le modèle exact, comme ses autres verrous de quota. Le nom demandé par le client est verrouillé aussi lorsqu'un alias l'a résolu vers ce modèle, car ces vérifications utilisent le nom demandé ; il est verrouillé de façon exacte (`lockExactModel`), de sorte qu'un alias qui traverse une famille de quota antigravity ou une portée codex ne verrouille jamais le sien. Un indice en texte libre, un `retryDelay` non typé ou un limiteur partagé par toute la connexion conserve la pause. Lorsque le limiteur que le chemin 429 vient de reconstruire se met effectivement en pause, un appelant dont le temps de file restant s'achève avant la fin de la pause est rejeté immédiatement avec le code de dépassement de file (`checkLimiterPause`) plutôt que d'attendre l'écoulement de ce délai ; la fin enregistrée est ancrée avant la construction du limiteur, là où Bottleneck démarre son horloge de rafraîchissement, et toute modification ultérieure du réservoir l'oublie. Couvert par `tests/unit/rate-limit-long-body-retry-lockout.test.ts` et `tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — plafond d'admission optionnel (nouveau).** `resilienceSettings.requestQueue.maxQueueDepth` borne combien de requêtes peuvent rester en file (pas encore distribuées) pour un même fournisseur+connexion à la fois. Lorsque la file contient déjà `maxQueueDepth` requêtes, une nouvelle requête est rejetée rapidement avec une erreur typée `code: "RATE_LIMIT_QUEUE_FULL"` **avant** même d'atteindre `limiter.schedule()` — le rejet est donc peu coûteux et se produit en amont de tout travail de compression de prompt / traduction en aval pour cette requête. Valeur par défaut `0` = désactivé, ce qui préserve le comportement existant de file non bornée ; borné entre 0 et 100000. Remplacement via `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) ou `resilienceSettings.requestQueue.maxQueueDepth` (tableau de bord / patch API).

La vérification d'admission elle-même est une fonction pure (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) afin d'être testable unitairement sans véritable limiteur Bottleneck.

> La RFC qui a ouvert #6593 proposait également un flag
> `bypassCompressionOnRateLimit`. Le pipeline `open-sse/services/compression/`
> de ce dépôt concerne la compression du prompt/contexte sur la requête LLM
> sortante (`chatCore.ts`, autour du bloc
> `resolveCompressionSettings`/`selectCompressionStrategy`), et non la
> compression des réponses HTTP sur les corps 429 synthétisés — il n'existe
> aucun chemin de code correspondant pour un flag de contournement littéral.
> Cette étape de compression du prompt s'exécute en outre actuellement _avant_
> `withRateLimit()` dans le pipeline de requêtes, donc la réorganiser pour
> l'ignorer lors d'un rejet pour file d'attente pleine est un changement
> distinct et plus important que la portée de ce ticket ; il a été
> intentionnellement **non** implémenté ici et est laissé en travail de suivi
> si le gain d'économie de CPU vaut le risque de réorganisation.

### Filet de sécurité d'activation automatique de la limitation de débit et protection des connexions (`rateLimitProtection`)

**Filet de sécurité d'activation automatique** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, par défaut `true`) :
Par défaut, OmniRoute active automatiquement la protection par file d'attente de limitation de débit pour toutes les connexions actives de fournisseurs à clé API (`getProviderCategory(provider) === "apikey"`). Cela garantit que les requêtes entrantes vers des clés API amont sensibles au débit sont mises en file d'attente et limitées via Bottleneck, plutôt que de provoquer des rafales d'erreurs 429 amont. Le filet de sécurité peut être remplacé via la variable d'environnement `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` désactive, `true`/`1`/`on` force l'activation), qui prime sur le paramètre persistant du tableau de bord (**Paramètres → Résilience** / `PATCH /api/resilience`).

**Sémantique du champ `rateLimitProtection` par connexion :**
La protection contre la limitation de débit par connexion est suivie via le champ booléen `rateLimitProtection` des connexions de fournisseurs (persisté sous `rate_limit_protection` dans SQLite) :

- **Activé explicitement (`rateLimitProtection === true`)** : la protection contre la limitation de débit est explicitement activée pour cette connexion, quelle que soit la catégorie du fournisseur ou l'état du filet de sécurité d'activation automatique.
- **Désactivé explicitement (`rateLimitProtection === false`)** : désactive la protection explicite, mais **ne** soustrait **pas** une connexion active à clé API au filet de sécurité global d'activation automatique. Dans `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` et `undefined` sont équivalents : seul `rateLimitProtection === true` est traité comme un remplacement explicite. Si `rateLimitProtection` vaut `false` (ou n'est pas défini), une connexion active à clé API remplit toujours la condition d'activation automatique et reste protégée contre la limitation de débit.
- **Pas d'exclusion par connexion** : un opérateur ne peut actuellement pas exprimer « cette seule connexion active à clé API doit fonctionner sans protection par file d'attente de limitation de débit » tout en gardant l'activation automatique active pour les autres. Pour faire fonctionner les connexions à clé API sans files d'attente de limitation de débit, le filet de sécurité doit être désactivé globalement (`RATE_LIMIT_AUTO_ENABLE=false` ou `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Chemins d'écriture pris en charge :**

- **`POST /api/rate-limits`** : le chemin d'écriture de gestion pris en charge pour basculer `rateLimitProtection` d'une connexion (`{ connectionId: string, enabled: boolean }`). L'appeler avec `enabled: true` active la protection explicite ; l'appeler avec `enabled: false` supprime la protection explicite (les connexions actives à clé API restant toutefois couvertes par le filet de sécurité global si l'activation automatique est active).
- **`PUT /api/providers/[id]`** : n'accepte ni ne bascule délibérément **pas** `rateLimitProtection` (#11278). La mise à jour des métadonnées d'une connexion de fournisseur via `PUT /api/providers/[id]` ne modifiera jamais l'état persisté de la protection contre la limitation de débit.

---

## 6. Chien de garde à débit lent (#9709)

Le garde `resilienceSettings.streamRecovery.throughputWatchdog` en option détecte un amont qui envoie toujours des morceaux mais produit une sortie assistante inférieure au débit de sortie utile configuré. Il est délibérément distinct du délai d'inactivité : les battements de cœur et les métadonnées ne réinitialisent ni le minuteur et ne comptent pas comme une progression. Il se distingue également du délai de tentative difficile (#9153), qui reste un plafond de sécurité absolu quelle que soit la qualité du résultat.

Le chien de garde nécessite une période de préchauffage suivie d'une fenêtre continue complète avant de pouvoir abandonner. Il compte les deltas de texte des événements de sortie API de réussite et de réponse de chat (un proxy d'octet UTF-8 conservateur), ignore les événements d'utilisation uniquement et vides, et suspend le jugement pendant que les événements d'appel d'outil ou de raisonnement sont en cours. Il est désactivé par défaut et peut être activé avec `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (cette valeur d'environnement ne fait que générer le — par défaut, un booléen `resilienceSettings.streamRecovery.throughputWatchdog.enabled` enregistré gagne ; voir la note de priorité env-vs-dashboard en haut de ce guide) ; la fenêtre, l'échauffement, le taux minimum et la sortie minimale mesurable sont délimités par la couche de normalisation des paramètres de résilience normaux.

Lorsqu’elle est activée, un abandon du chien de garde est appliqué uniquement à la tentative active en amont. Avant tout octet visible par le client, le chemin de récupération anticipée existant du même compte peut rouvrir la tentative. Après la validation, le flux n'est jamais relu aveuglément ; seul le contrat de continuation sécurisé à mi-parcours existant peut ajouter un suffixe. La finalisation reste ponctuelle, donc la comptabilité d'utilisation et la libération du sémaphore ne sont pas dupliquées.

---

## 7. Reformulation du statut en amont (erreurs de quota mal signalées)

**Portée :** une passerelle en amont qui signale un épuisement temporaire du quota avec un statut HTTP incorrect.

**Objectif :** corriger un statut trompeur AVANT la classification, afin que les consommateurs en aval (moteur de basculement, agrégation des combinaisons, réponse destinée au client) voient la véritable nature réessayable de l’échec.

Certaines passerelles signalent un épuisement TEMPORAIRE du quota avec un statut HTTP non réessayable. `agentrouter.org` renvoie `403` (parfois `400`) avec un corps en chinois
(`用户额度不足` / `额度不足`) au lieu du standard `429`. Les clients tels que Claude
Code considèrent `403` comme permanent et interrompent la session ; sans correction,
le moteur de basculement le classerait comme `AUTH_ERROR` au lieu d’un événement de quota.

**Implémentation :**

- Registre + matcher : `open-sse/config/upstreamStatusRestatement.ts` — une
  liste de règles par fournisseur (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), mise en correspondance via `applyStatusRestatement()`.
- Point d’appel : le bloc `providerFailure:` dans `open-sse/handlers/chatCore.ts`
  (vers la ligne 3654), immédiatement après que `parseUpstreamError()` a analysé
  une réponse en amont avec un statut HTTP d’erreur (`!providerResponse.ok`), et avant toute classification, afin que chaque consommateur en aval voie le statut corrigé. Les erreurs intégrées dans un flux SSE `200` suivent un chemin distinct d’analyse du flux, ultérieur, et ne sont **pas** couvertes par ce hook actuellement — une limitation connue, qui n’est pas encore nécessaire pour le mauvais statut d’agentrouter (qui se manifeste sous la forme d’un statut HTTP d’erreur).
- Éligibilité à une nouvelle tentative : `429` figure dans
  `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`) ; une erreur reformulée
  comporte donc une véritable fenêtre de nouvelle tentative au lieu d’être
  exposée comme un `403` définitif.
- Le `defaultRetryAfterMs` synthétique de `60s` (`upstreamStatusRestatement.ts`)
  indique uniquement ce que la réponse reformulée communique au **client** ; il ne
  représente pas la durée interne de refroidissement/blocage de la connexion — celle-ci
  est régie séparément par le mécanisme qui traite effectivement l’erreur reformulée
  (le backoff progressif de Connection Cooldown, §2, avec une base de `3s` pour les
  fournisseurs utilisant des clés API ; ou Model Lockout, §3, pour les fournisseurs
  dont le quota est associé au modèle, comme agentrouter). Le routeur peut redevenir
  éligible à une nouvelle tentative en interne avant l’expiration de la fenêtre de 60s
  annoncée au client — c’est une marge intentionnelle, pas un bogue.

Les erreurs permanentes (`无权访问模型` chez agentrouter — aucun accès à ce modèle) ne sont
JAMAIS reformulées : `excludeMarkers` annule la règle même lorsque `textMarkers` correspondent,
de sorte que l’erreur conserve son statut d’origine et qu’aucune nouvelle tentative ne puisse
se poursuivre indéfiniment. La règle de classification correspondante du fournisseur
(`agentrouter-model-access-denied` dans `open-sse/config/providerErrorRules.ts` :
`reason: "auth_error"`, `scope: "model"`, un délai de refroidissement de base déclaré de
`6h`) est consultée par `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_avant_ le retour anticipé générique `FORBIDDEN` de la catégorie apikey, sous condition de
`honorsRuleLockScope(provider)` (#10334 — actuellement exclusif à agentrouter via la liste
d’autorisation `HONORS_RULE_LOCK_SCOPE_PROVIDERS` dans
`providerErrorRules.ts`). Le délai de refroidissement déclaré de 6h de la règle est transmis
via `fallbackResult.baseCooldownMs`, mais il alimente toujours le chemin de blocage
préexistant par modèle et quota (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, inchangé par #10334 à l’exception de la source du délai) :
il est plafonné à la valeur `mlSettings.maxCooldownMs` de l’opérateur
(par défaut `1_800_000ms` / 30min), comme tout autre blocage de modèle, et la
_raison du blocage persistée_ reste la valeur codée en dur préexistante `"forbidden"`,
et non le `"auth_error"` de la règle — seule la durée du délai de refroidissement est
respectée de bout en bout, pas la chaîne de raison. La connexion elle-même reste active ;
les modèles associés sur la même connexion ne sont pas affectés.

Les erreurs de quota reformulées (`额度不足`) atteignent une règle de fournisseur en production
(`agentrouter-user-quota-exhausted` : `reason: "quota_exhausted"`, `scope:
"connection"`, sans délai de refroidissement déclaré propre — le backoff par défaut
mis à l’échelle de la couche de persistance s’applique). Depuis #10334, `scope` dans
`ProviderErrorRuleMatch` EST consommé de bout en bout, mais **uniquement** pour les
fournisseurs figurant dans la liste d’autorisation `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — aujourd’hui, uniquement `"agentrouter"`, via
`honorsRuleLockScope()`). Pour tous les autres fournisseurs, `scope` reste purement
informatif, exactement comme avant #10334.
`checkFallbackError` expose la portée de la règle correspondante via
`fallbackResult.ruleScope` ; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) est le garde-fou partagé qui confirme qu’une
`ruleScope` peut réellement être considérée comme un signal s’appliquant à toute la
connexion et permettant une auto-récupération (portée `"connection"`, raison
`quota_exhausted`, jamais `permanent`, jamais `creditsExhausted` — une protection contre
une future association de la portée `"connection"` avec un état de compte permanent).
Deux consommateurs l’appellent :

- **Persistance** (`markAccountUnavailable()`, `src/sse/services/auth.ts`) :
  au lieu de tomber dans la branche de verrouillage **par modèle** du fournisseur passthrough (agentrouter est `passthroughModels: true` → `hasPerModelQuota()`
  renvoie `true`), elle applique un **délai de refroidissement temporaire de la connexion** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, jamais un statut terminal
  (`credits_exhausted`/`banned`/`expired`) — afin que la connexion se rétablisse
  automatiquement une fois le délai écoulé, sans nécessiter de réinitialisation manuelle
  des identifiants.
  Ignoré pour les connexions avec `disableCooling: true` (#2997) : cette désactivation
  explicite laisse au contraire passer vers le verrouillage par modèle (un compromis
  documenté — voir le commentaire du code au-dessus de la branche).
- **Routage combiné dans la même requête** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`) : la même protection inscrit
  la connexion dans l'ensemble en mémoire `exhaustedConnections`, indexé par
  `${provider}:${connectionId}`. Cela ignore uniquement une cible restante de la MÊME REQUÊTE qui _porte elle-même déjà ce `connectionId` exact_ dans son propre objet cible (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` avant la recherche dans `exhaustedConnections`) — un combo basé sur une simple liste de modèles, dont les cibles sœurs ne portent aucun `connectionId` épinglé qui leur soit propre et dont une seule est résolue par dispatch à partir de l'en-tête `X-OmniRoute-Selected-Connection-Id` de la réponse, n'atteint jamais cette correspondance de clé. Dans ce cas courant, la véritable protection empêchant une étape restante de réutiliser le compte tout juste épuisé n'est PAS cet ensemble — c'est la couche de persistance ci-dessus (le `rateLimitedUntil` de la connexion est désormais dans le futur), combinée au fait que cette même protection supprime `transientRateLimitedProviders` pour l'échec (voir « Conception en deux étapes » et le commentaire du code sur la branche `isAgentrouterConnectionQuotaScope` dans `targetExhaustion.ts`) : l'ensemble restant non marqué, le forçage `allowRateLimitedConnection` de `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) ne s'active PAS pour les étapes restantes du fournisseur. Le filtre `rateLimitedUntil` de la sélection des identifiants (`src/sse/services/auth.ts:1238`) est donc respecté normalement et une étape restante sélectionne soit une autre connexion agentrouter toujours éligible, soit échoue faute d'identifiants disponibles — elle ne force pas son retour sur la connexion que cette branche vient de mettre en délai de refroidissement.

### Conception en deux étapes : reformulation du statut, puis classification

La reformulation du statut (`upstreamStatusRestatement.ts`) et les règles de
classification des fournisseurs (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) sont deux registres distincts qui utilisent tous deux l'identifiant du fournisseur et des marqueurs textuels comme clés, mais qui s'exécutent à des endroits différents et servent des objectifs différents : la reformulation réécrit tôt le statut HTTP dans `chatCore.ts` ;
les règles de classification sélectionnent la `reason` de repli et verrouillent la
`scope` (`model` / `provider` / `connection`) dans `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Les règles de classification ne voient que le **texte** complet de l'erreur (nécessaire pour faire correspondre des marqueurs du corps comme `额度不足`) pour les fournisseurs listés dans la liste blanche `FULL_TEXT_RULE_PROVIDERS` de `providerErrorRules.ts` — actuellement, seul `"agentrouter"`. Pour tout autre fournisseur du **catalogue intégré**, `checkFallbackError` ne transmet à `getProviderErrorRuleMatch` que l'erreur structurée (`{code, type}`), ce qui suffit pour les règles fondées sur les en-têtes, le statut ou le code, mais ne permet pas de voir les marqueurs textuels du corps. L'assistant `resolveRuleMatchBody()` effectue cette sélection : le texte complet de l'erreur pour les fournisseurs autorisés, et l'erreur structurée dans les autres cas. Ajouter un fournisseur **intégré** à `FULL_TEXT_RULE_PROVIDERS` constitue une activation explicite, fournisseur par fournisseur — elle existe afin que le chemin par défaut de chaque fournisseur qui ne figure pas dans la liste reste strictement inchangé, octet par octet.

La `scope` d'une règle (`model` / `provider` / `connection`) est une activation distincte de `FULL_TEXT_RULE_PROVIDERS` : `checkFallbackError` ne l'expose que sous la forme de `fallbackResult.ruleScope`, et les consommateurs en aval ne la respectent autrement que comme une étiquette informative que pour les fournisseurs figurant dans la liste blanche `HONORS_RULE_LOCK_SCOPE_PROVIDERS` du même fichier (via `honorsRuleLockScope()` — aujourd'hui, seul `"agentrouter"`). Voir « Erreurs de quota reformulées » ci-dessus pour comprendre ce que fait réellement une correspondance `scope: "connection"` une fois qu'un fournisseur figure dans cette liste blanche.

**#11104 — les règles déclarées par l'opérateur contournent les deux listes blanches.** Un opérateur peut déclarer une règle par fournisseur à l'exécution via `settings.providerErrorRules` (`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) sans modifier ce fichier. Soumettre une règle d'opérateur à `FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — des listes blanches destinées à protéger le comportement **par défaut** des règles du catalogue intégré — rendrait le mécanisme de configuration inopérant pour tous les fournisseurs sauf ceux qui y figurent déjà, puisque la déclaration de la règle constitue déjà l'activation explicite de l'opérateur. `resolveRuleMatchBody()` et `honorsRuleLockScope()` vérifient tous deux `hasOperatorRuleForProvider()` en premier : un fournisseur ayant une règle d'opérateur reçoit le texte brut de l'erreur et voit sa `scope` déclarée respectée, qu'il figure ou non dans l'une ou l'autre liste blanche.

**Règles déclarées par l'opérateur** (`OperatorProviderErrorRule`) : chaque règle possède un `status` facultatif et un `match` facultatif (une simple sous-chaîne insensible à la casse du texte de l'erreur, jamais une RegExp, afin d'éviter tout risque de ReDoS), et doit définir au moins l'un des deux. Lorsque les deux sont définis, ils sont combinés par un opérateur AND ; un champ omis correspond à n'importe quelle valeur, de sorte que `{match: "insufficient_quota"}` correspond à tout statut contenant ce code. La première règle correspondante est retenue. `cooldownMs` accepte une durée maximale de 30 jours ; 50 règles au maximum au total.

**Valeurs par défaut générales** (`settings.providerErrorDefaults`, opt-in, définies via
`setOperatorProviderErrorDefaults`) : `{[provider]: {cooldownMs, scope?, reason?}}`
avec `cooldownMs` compris entre 1 minute et 30 jours. Une valeur par défaut
s'applique uniquement lorsqu'aucune règle opérateur ni aucune règle du catalogue
intégré ne correspond, et uniquement aux erreurs 402, 403, 408, 429 et 5xx. Les
erreurs de forme de requête (400, 404, 409, 413, 422) et les erreurs 401 seules
conservent leur propre traitement. En l'absence de `reason` explicite, la raison
est déduite du statut, de la même manière que le fait `classifyError`. Déclarer
une valeur par défaut compte comme une règle opérateur pour
`hasOperatorRuleForProvider()`, de sorte que son `scope` (par défaut
`"connection"`) est respecté. Le délai de récupération effectif d'une valeur par
défaut est le plus long entre son `cooldownMs` et l'indication de nouvelle
tentative fournie par le fournisseur (`Retry-After`, `x-ratelimit-reset` ou une
indication de réinitialisation dans le corps, c'est-à-dire la même indication
que le moteur respecte lorsque le paramètre de délai de récupération de
connexion « use upstream retry hints » est activé) ; une valeur par défaut peut
donc prolonger une indication amont courte, mais ne raccourcit jamais une
réinitialisation réelle. Une règle opérateur explicite conserve exactement son
`cooldownMs`. Ni une règle ni une valeur par défaut ne contournent les
protections contre le délai de récupération dans `markAccountUnavailable` : un
délai actif plus long n'est jamais raccourci et un statut terminal n'est jamais
remplacé. Les détecteurs de texte intégrés exécutés plus tôt dans
`checkFallbackError` (crédits épuisés, quota quotidien, compte désactivé)
restent prioritaires pour leurs propres formulations.

**Lacune connue — `providerRuleRegistry` n'est jamais consulté pour HTTP 400.**
La branche `BAD_REQUEST` de `checkFallbackError` classe entièrement le statut 400
à l'aide de ses propres tableaux de motifs
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS`, etc. dans
`accountFallback.ts`) et retourne avant que la branche
`configuredRule`/`getProviderErrorRuleMatch` située plus haut ne soit atteinte.
Une règle du catalogue intégré (ou une règle opérateur) avec `status: 400` est
syntaxiquement valide, mais ne sera jamais appliquée. Aucune règle existante ne
cible 400 actuellement ; rien n'est donc affecté en production — mais une future
règle 400 nécessitera d'abord la modification de cette branche, ce qui constitue
un changement plus important que l'ajout d'une règle (il reclasserait les erreurs
400 de chaque fournisseur s'appuyant déjà sur le comportement des tableaux de
motifs) et sort du périmètre d'un ajout de règle pour un seul fournisseur.

### Ajouter une nouvelle passerelle indiquant incorrectement un quota

1. Enregistrer un tableau de règles dans `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Garder
   `textMarkers` spécifiques au fournisseur ; ne jamais réutiliser de formulations
   anglaises génériques qui entrent en conflit avec
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Enregistrer éventuellement des règles de classification dans
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) afin de
   sélectionner la portée de verrouillage appropriée (`connection` pour un quota
   s'appliquant à l'ensemble du compte, `model` pour les erreurs propres à un
   modèle). Cette étape ne prend effet en production, pour les fournisseurs dont
   les règles nécessitent le texte complet de l'erreur (marqueurs dans le corps),
   qu'après l'ajout de l'identifiant du fournisseur à
   `FULL_TEXT_RULE_PROVIDERS` dans le même fichier — sinon
   `checkFallbackError` ne transmet jamais à la règle que l'erreur structurée
   `{code, type}`, et une règle basée sur le texte du corps ne correspondra
   jamais au trafic réel. Les règles qui correspondent uniquement à
   `status`/`headers` (comme celles d'Opencode ou de Minimax) ne nécessitent pas
   cette activation. Par ailleurs, si la règle déclare `scope: "connection"` et
   que l'objectif est un délai de récupération réel à l'échelle de la connexion
   ainsi qu'un saut de combinaison pour la même requête (et pas seulement un
   libellé informatif), ajouter l'identifiant du fournisseur à
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` dans le même fichier — c'est ce qui contrôle
   la consommation de type `isAgentrouterConnectionQuotaScope()` dans
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) et
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) ; sans cela, `scope`
   continue de circuler via `fallbackResult.ruleScope`, mais rien n'en tient
   compte.
3. Ajouter des tests unitaires reprenant le modèle de
   `tests/unit/upstream-status-restatement.test.ts`
   et de `tests/unit/agentrouter-error-rules.test.ts` (y compris les protections
   not-permanent / not-creditsExhausted et — si le fournisseur a besoin de la
   liste d'autorisation — un test vérifiant que `resolveRuleMatchBody()` ne
   renvoie le texte complet que pour ce fournisseur).

Aucune modification de `chatCore.ts`, `classifyError` ou de combo n'est nécessaire.

#### Verrouillage par compartiment d'egress (#10880)

Les fournisseurs de `EGRESS_BUCKETED_LOCK_PROVIDERS` (famille opencode) sont
traités comme des fournisseurs amont compartimentés par adresse IP (le niveau
gratuit d'opencode est compartimenté par IP, et non par compte — voir #9611) :
un statut 429 classé `quota_exhausted` **ou** `rate_limit_exceeded` déclenche le
délai de récupération de chaque connexion de la famille autorisée dont la
dernière adresse IP d'egress connue correspond à celle de la connexion en échec,
avant que la rotation puisse les essayer
— ce qui évite N-1 appels amont voués à l'échec (même principe que
#10460/#10525). `rate_limit_exceeded` est inclus délibérément : sur le chemin
`markAccountUnavailable`, les règles spécifiques à opencode ne correspondent
jamais (aucun en-tête ni corps n'est transmis à `checkFallbackError`, opencode ne
figure pas dans `FULL_TEXT_RULE_PROVIDERS`) ; ainsi, un 429 dont le corps contient
le texte de quota d'abonnement (« monthly usage limit reached ») est classé
`quota_exhausted` par le fallback de texte de quota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts` ; délai de récupération
d'une heure) avant que la règle `status_429` ne soit atteinte — tandis qu'un 429
sans texte de quota (simple limitation de débit) est classé via la règle
`status_429` comme `rate_limit_exceeded` et déclenche malgré tout le délai de
récupération de la famille IP. Pour un fournisseur autorisé, une limitation de
débit compartimentée par IP constitue le même signal qu'un quota épuisé. Limites
à respecter :

- **Au mieux** : le verrouillage détermine la dernière `egress_ip` connue de la
  connexion à partir de `proxy_logs` (fenêtre de 24 h, synchrone, sans cache).
  Cache froid (IP de sortie jamais sondée) ou aucune ligne → la connexion en
  échec est tout de même placée en période de refroidissement par la branche
  (enregistrée comme aujourd’hui), mais aucune connexion sœur n’est verrouillée.
- **Jamais terminal** : la période de refroidissement est une fenêtre de quota
  renouvelable (`testStatus: "unavailable"`) ; aucun état permanent n’est
  jamais déduit d’un signal au niveau de l’IP. Les connexions `disableCooling`
  ignorent entièrement la branche.
- **La granularité du verrouillage change pour la famille figurant dans la liste d’autorisation** :
  il s’agit d’un changement de portée, pas seulement d’une optimisation pour
  les connexions sœurs. opencode est un fournisseur `passthroughModels` ; avant
  cette branche, une erreur 429 entraînait donc un verrouillage par MODÈLE ;
  elle entraîne désormais une période de refroidissement de la connexion — y
  compris pour un opérateur exécutant une seule connexion sans aucune connexion
  sœur. Il s’agit de la granularité que la table de règles d’opencode déclare
  déjà correcte (`scope: "connection"`, `providerErrorRules.ts`), mais qui
  n’avait encore jamais été respectée, car opencode ne figure pas dans
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. La branche écrit elle-même la période de
  refroidissement et le `backoffLevel` de la connexion en échec, à l’image de
  la branche agentrouter à portée de connexion, puis retourne — le blocage par
  modèle et le chemin générique ci-dessous ne sont jamais atteints.
- **Combinaison incluse** : comme la branche agentrouter, la portée ignore
  délibérément la rétrogradation `persistUnavailableState`/`isCombo` qu’un
  appelant de type combinaison applique à une erreur 429. Un verrouillage par
  modèle n’est pas une forme plus faible de cette portée, c’est la mauvaise
  unité : il ne dit rien sur l’IP dont le quota est épuisé, si bien que la
  rotation de la combinaison continuerait à gaspiller un appel dont l’échec est
  garanti pour chaque connexion sœur.
- **Sécurité des connexions sœurs** : une connexion sœur déjà dans un état
  terminal (bannie/crédits épuisés) ou déjà soumise à une période de
  refroidissement plus longue n’est jamais écrasée.
- **Liste d’autorisation exclusive** : l’élargissement de
  `EGRESS_BUCKETED_LOCK_PROVIDERS` relève d’une décision explicite du
  propriétaire ; aucun câblage générique (modèle #10334/#10419). La requête des
  connexions sœurs utilise cette même liste d’autorisation au lieu de la
  répéter sous forme de littéral SQL, de sorte que son élargissement reste une
  modification d’une seule ligne.
- **Rotation de l’IP de sortie, dans les deux sens** : la fenêtre de recherche
  (24 h) est bien plus large que la durée de vie du cache des IP de sortie
  (5 min) ; la « dernière IP connue » relève donc de l’historique, et non de
  l’état actuel. Si le proxy d’une connexion a changé d’IP pendant cette
  fenêtre, le verrouillage peut **manquer** une IP réellement partagée (l’IP
  enregistrée est la nouvelle, dont le quota n’est pas épuisé) — et,
  réciproquement, il peut **placer en période de refroidissement une connexion
  sœur qui a depuis quitté** l’IP dont le quota est épuisé. Le second cas coûte
  à cette connexion sœur une fenêtre de refroidissement ; les deux sont des
  limites acceptées d’une recherche au mieux fondée sur l’historique.
- **Coût** : deux analyses bornées de `proxy_logs` (filtrées par fenêtre via
  `idx_pl_timestamp`), uniquement à la fréquence des erreurs 429. Aucun nouvel
  index (migration 134, YAGNI). Mesuré sur une copie de taille moyenne d’une
  base de données contenant du trafic réel ; une instance à haut débit
  conserve proportionnellement davantage de lignes dans la même fenêtre.

---

## Autres fonctionnalités de résilience

- **20 stratégies de routage** (priorité, pondérée, round-robin, relais de contexte, fill-first, p2c, aléatoire, moins utilisée, optimisée par coût, sensible à la réinitialisation, fenêtre de réinitialisation, marge disponible, pondérée par quota, strictement aléatoire, auto, lkgp, optimisée par contexte, optimisée par cache, fusion, pipeline) — voir [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Routage sensible à la réinitialisation** (v3.8.0) — hiérarchise les connexions selon l'heure de réinitialisation du quota.
- **Dégradation du mode arrière-plan** — `background: true` de l'API Responses est dégradé en mode synchrone avec un avertissement.
- **Détection dynamique de la limite d'outils** — met en retrait les fournisseurs lorsque les limites du nombre d'outils sont atteintes.
- **Repli d'urgence** — contrôlé par `OMNIROUTE_EMERGENCY_FALLBACK` ; les opérateurs peuvent le surcharger depuis la page Feature Flags sans redémarrage.

---

## Débogage

- Le combo pondéré répond `503 all_targets_cooling_down` (`Retry-After` défini, `diagnostics.excluded` liste chaque cible avec `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → le pool est configuré et connecté, chaque cible est simplement exclue par un minuteur de résilience ; l'avertissement `[COMBO] Weighted selection: every target excluded before dispatch — …` indique les raisons et les secondes restantes. Un `404 no_executable_targets` provenant du même combo signifie qu'aucun minuteur de résilience n'est en cause (rien à exécuter, ou chaque compte a échoué à la sonde de disponibilité). Implémenté dans `open-sse/services/combo/pinRecovery.ts` à partir des exclusions collectées dans `targetResolution.ts`.
- Toutes les clés d'un fournisseur ignorées → vérifiez à la fois l'état du disjoncteur ET le `rateLimitedUntil`/`testStatus` de chaque connexion.
- Fournisseur définitivement exclu après la fenêtre de réinitialisation → le code lit `state` brut au lieu de `getStatus()`/`canExecute()`.
- Une clé échoue, les autres devraient fonctionner → privilégiez le refroidissement de connexion au disjoncteur.
- Un seul modèle échoue → privilégiez le verrouillage du modèle au refroidissement de connexion.
- L'état devrait se rétablir de lui-même mais ne le fait pas → vérifiez la présence d'un horodatage futur + un chemin de lecture qui rafraîchit l'état expiré. Les statuts permanents nécessitent des modifications manuelles.

---

## État d'exécution — référence rapide pour l'agent

> Déplacé mot pour mot depuis `AGENTS.md` → « Resilience Runtime State » (PR #12743) afin que le
> guide de l'agent reste sous le budget de contexte de 40k. Il s'agit de la vue condensée,
> destinée à l'agent, des sections ci-dessus ; les sections numérotées restent la référence complète.

OmniRoute dispose de trois mécanismes de défaillance temporaire liés mais distincts. Gardez leur
portée séparée lors du débogage du comportement de routage. Voir le
[diagramme de résilience à 3 couches](../diagrams/exported/resilience-3layers.svg)
(source : [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
pour une vue d'ensemble.

### Disjoncteur de fournisseur

**Portée** : le fournisseur entier, par ex. `glm`, `openai`, `anthropic`.

**Objectif** : cesser d'envoyer du trafic vers un fournisseur qui échoue de manière répétée au
niveau amont/service, afin qu'un fournisseur défaillant ne ralentisse pas chaque requête.

**Implémentation** :

- Classe principale : `src/shared/utils/circuitBreaker.ts`
- Câblage du portail/exécution du chat : `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de statut d'exécution : `src/app/api/monitoring/health/route.ts`
- Wrappers partagés : `open-sse/services/accountFallback.ts`
- Table d'état persisté : `domain_circuit_breakers`

**États** (4 — `src/shared/utils/circuitBreaker.ts`) :

- `CLOSED` : le trafic normal est autorisé.
- `DEGRADED` : bande d'alerte précoce — les échecs ont franchi le seuil de dégradation mais pas
  encore le seuil du disjoncteur ; le trafic circule toujours, les tableaux de bord affichent
  l'avertissement. Un test de connexion valide ou une fenêtre calme sans nouvel échec le ramène à
  `CLOSED` (la fenêtre est documentée dans `docs/architecture/RESILIENCE_GUIDE.md`).
- `OPEN` : le fournisseur est temporairement bloqué ; les appelants reçoivent une réponse
  provider-circuit-open ou le routage du combo passe à une autre cible.
- `HALF_OPEN` : le délai de réinitialisation est écoulé ; autoriser une requête sonde. Le succès
  ferme le disjoncteur, l'échec le rouvre.

**Valeurs par défaut** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, consommées via
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` dans `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` dans `src/sse/handlers/chatHelpers.ts`). Le disjoncteur
à l'échelle du fournisseur s'appuie sur `circuitBreakerThreshold` / `circuitBreakerReset` :

| Profil  | se dégrade à | s'ouvre à (`circuitBreakerThreshold`) | réinitialisation (`circuitBreakerReset`) |
| ------- | -----------: | ------------------------------------: | ---------------------------------------: |
| OAuth   |          `5` |                                   `8` |                                    `60s` |
| API key |          `7` |                                  `12` |                                    `30s` |
| Local   |    (dérivée) |                                   `2` |                                    `15s` |

`PROVIDER_PROFILES` définit également `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) et `providerCooldownMs` (5/10/1 min) : ceux-ci alimentent
le **portail de fenêtre du Provider Cooldown global optionnel** (`PROVIDER_COOLDOWN_ENABLED`,
désactivé par défaut) — une entrée au niveau du fournisseur dans
`open-sse/services/providerCooldownTracker.ts` n'est considérée en refroidissement qu'après
`providerFailureThreshold` échecs dans `providerFailureWindowMs`, et refroidit ensuite pendant
`providerCooldownMs`. Ce ne sont PAS les seuils du disjoncteur actif — ne les ajustez pas en
espérant modifier le comportement du disjoncteur. Chaque valeur par défaut peut être surchargée via
les variables d'environnement `OMNIROUTE_PROVIDER_BREAKER_*` et `OMNIROUTE_CIRCUIT_BREAKER_*` ; le
tableau de référence exact pour l'exécution se trouve dans `docs/architecture/RESILIENCE_GUIDE.md`.

Seuls les statuts d'échec au niveau du fournisseur doivent déclencher le disjoncteur de fournisseur :

```ts
(408, 500, 502, 503, 504);
```

Ne déclenchez pas le disjoncteur à l'échelle du fournisseur pour les erreurs normales de
compte/clé/modèle comme la plupart des cas de `401`, `403`, ou `429`. Ceux-ci relèvent
généralement du refroidissement de connexion ou du verrouillage de modèle. Un `403` générique
d'un fournisseur de type clé API doit être récupérable sauf s'il est classé comme une erreur
terminale de fournisseur/compte.

Le disjoncteur utilise une récupération paresseuse (lazy), et non un minuteur en arrière-plan. Lorsque `OPEN` expire, les lectures telles que `getStatus()`, `canExecute()` et `getRetryAfterMs()` actualisent l'état vers `HALF_OPEN`, de sorte que les tableaux de bord et les constructeurs de candidats combo ne continuent pas d'exclure indéfiniment un fournisseur expiré.

### Refroidissement de connexion

**Portée** : une connexion/compte/clé de fournisseur.

**Objectif** : ignorer temporairement une clé/un compte défaillant tout en permettant aux autres connexions du même fournisseur de continuer à traiter les requêtes.

**Implémentation** :

- Chemin d'écriture/mise à jour : `src/sse/services/auth.ts::markAccountUnavailable()`
- Sélection/filtrage des comptes : `src/sse/services/auth.ts::getProviderCredentials...`
- Calcul du refroidissement : `open-sse/services/accountFallback.ts::checkFallbackError()`
- Paramètres : `src/lib/resilience/settings.ts`

Champs importants sur les connexions de fournisseur :

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Lors de la sélection des comptes, une connexion est ignorée tant que :

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Les refroidissements sont également paresseux : lorsque `rateLimitedUntil` est dans le passé, la connexion redevient éligible. En cas d'utilisation réussie, `clearAccountError()` efface `testStatus`, `rateLimitedUntil`, les champs d'erreur et `backoffLevel`.

Comportement de refroidissement de connexion par défaut :

- Refroidissement de base OAuth : `5s`.
- Refroidissement de base pour clé API : `3s`.
- Un `429` sur clé API doit privilégier les indications de nouvelle tentative de l'amont (`Retry-After`, en-têtes de réinitialisation ou texte de réinitialisation analysable) lorsqu'elles sont disponibles.
- Les échecs récupérables répétés utilisent un backoff exponentiel :

```ts
baseCooldownMs * 2 ** failureIndex;
```

La protection anti-thundering-herd empêche des échecs concurrents sur la même connexion de prolonger à plusieurs reprises le refroidissement ou d'incrémenter en double `backoffLevel`.

Les états terminaux ne sont pas des refroidissements. `banned`, `expired` (qui ne devient terminal qu'après N tentatives bornées via `EXPIRED_RETRY_MAX`) et `credits_exhausted` sont destinés à rester indisponibles jusqu'à ce que les identifiants/paramètres changent ou qu'un opérateur les réinitialise. N'écrasez pas les états terminaux avec un état de refroidissement transitoire.

### Verrouillage de modèle

**Portée** : fournisseur + connexion + modèle.

**Objectif** : éviter de désactiver une connexion entière lorsqu'un seul modèle est indisponible ou limité par quota pour cette connexion.

Exemples :

- Fournisseurs avec quota par modèle renvoyant `429`.
- Fournisseurs locaux renvoyant `404` pour un modèle manquant.
- Échecs d'autorisation de mode/modèle propres à un fournisseur, tels que certains modes Grok.

Le verrouillage de modèle réside dans `open-sse/services/accountFallback.ts` et permet à la même connexion de continuer à servir d'autres modèles.

### Conseils de débogage

- Si toutes les clés d'un fournisseur sont ignorées, inspectez à la fois l'état du disjoncteur du fournisseur et le `rateLimitedUntil`/`testStatus` de chaque connexion.
- Si un fournisseur semble exclu de façon permanente après la fenêtre de réinitialisation, vérifiez si le code lit le `state` brut au lieu d'utiliser `getStatus()`/`canExecute()`.
- Si une clé de fournisseur échoue mais que d'autres devraient fonctionner, préférez le refroidissement de connexion au disjoncteur de fournisseur.
- Si un seul modèle échoue, préférez le verrouillage de modèle au refroidissement de connexion.
- Si un état doit se rétablir de lui-même, il doit avoir un horodatage futur/délai de réinitialisation et un chemin de lecture qui actualise l'état expiré. Les statuts permanents nécessitent une modification manuelle des identifiants ou de la configuration.

---

## Empreinte TLS & Furtivité

La furtivité spécifique au fournisseur (JA3/JA4, CCH, obfuscation) est documentée séparément — voir `docs/security/STEALTH_GUIDE.md` (git ; non compilé dans `/docs`).

---

## Tests de résilience (Phase 8 · Bloc C)

Au-delà des tests unitaires de la logique de résilience, trois tests sollicitent le runtime
dans des conditions réelles de stress/défaillance (tous integration/nightly — aucun ne bloque les PR) :

| Test        | Description                                                                                                                                                                                  | Exécution                                |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Le nœud fake-upstream injecte de la latence/reset/timeout/503 réels ; valide que le disjoncteur s'ouvre/se rétablit et que `checkFallbackError` classifie le 503 comme fallback récupérable. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 flux par `createSSEStream` sous `--expose-gc` ; échoue si le tas dépasse le plafond (protection OOM #3069).                                                                             | `npm run test:heap`                      |
| k6 soak     | Charge soutenue contre `/api/monitoring/health` ; seuils p95/erreur.                                                                                                                         | `k6 run tests/load/k6-soak.js` (nightly) |

Orchestré par `.github/workflows/nightly-resilience.yml` (cron + dispatch). Dans le
`test:integration` par défaut, chaos et heap s'ignorent d'eux-mêmes (sans `RUN_CHAOS_INT`/`--expose-gc`).

---

## Voir aussi

- [Guide d'architecture](./ARCHITECTURE.md) — Architecture système et mécanismes internes
- [Guide utilisateur](../guides/USER_GUIDE.md) — Fournisseurs, combos, intégration CLI
- [Moteur Auto-Combo](../routing/AUTO-COMBO.md) — Scoring à 16 facteurs, packs de modes
