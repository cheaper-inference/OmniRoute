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

## 2. Temps de recharge de connexion

**Portée:** fournisseur unique connection/account/key.

**But:** ignorez une mauvaise clé pendant que d'autres connexions pour le même fournisseur continuent de fonctionner.

**Mise en œuvre:**

- Marquer indisponible : `src/sse/services/auth.ts::markAccountUnavailable()`
- Sélection : `getProviderCredentials*` dans le même fichier
- Calcul du temps de recharge : `open-sse/services/accountFallback.ts::checkFallbackError()`
- Paramètres : `src/lib/resilience/settings.ts`

**Champs par connexion :**

- horodatage `rateLimitedUntil` — jusqu'à l'expiration du temps de recharge
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — compteur de recul exponentiel

**Temps de recharge par défaut :**

- base OAuth : 5s
- Base de clé API : 3 s
- Clé API 429 : préfère le texte de réinitialisation `Retry-After`/reset headers/parseable en amont
- Retrait : `baseCooldownMs * 2 ** failureIndex`

**Délai de nouvelle tentative par fournisseur.** La page de détails du fournisseur comporte un** Délai de nouvelle tentative** sélectionner (Auto, 15s jusqu'à 1h). Il enregistre `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600, via `PATCH /api/resilience`). Lorsqu'une erreur de limite de débit ne comporte aucun indice de nouvelle tentative en amont, cette valeur remplace l'intervalle d'attente mis à l'échelle pour le fournisseur et réinitialise `backoffLevel` à 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Priorité pour une erreur à débit limité, la plus élevée en premier : indice de nouvelle tentative en amont, puis par connexion `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, puis le délai de nouvelle tentative par fournisseur, puis env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, puis l'intervalle d'attente mis à l'échelle. Auto supprime le champ. Cela n'affecte que la raison de la limite de débit, jamais les états terminaux.

**Garde-troupeau anti-tonnerre :** empêche les échecs simultanés de prolonger excessivement le temps de recharge ou de double incrémenter `backoffLevel`.

**Les 429 à limite de concurrence ne gravissent pas l’échelle de recul.** Un `429` dont le corps signale une limite de concurrence ("trop de requêtes simultanées", "limite de concurrence", "limite de requêtes parallèles", GLM `并发数过高`) signifie que le compte est sain mais occupé. `checkFallbackError()` renvoie la raison `concurrency_limited`: basculez vers la connexion suivante maintenant, refroidissez celle-ci pour un `CONCURRENCY_LIMIT_COOLDOWN_MS` fixe (1s) ou l'indice de nouvelle tentative en amont, gardez `backoffLevel` inchangé et définissez `skipProviderBreaker`. Un organisme de quotas explicites gagne toujours, donc un organisme qui correspond également à un modèle de quota reste un verdict de quota. Détection : `looksLikeConcurrencyLimit()` dans `src/shared/utils/classify429.ts`; Verdict : `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (le `FailureKind` du disjoncteur) est inchangé et lit toujours `rate_limit` pour ces corps.

**Les blocages de contenu en streaming ne refroidissent pas le compte.** Lorsque le chien de garde du décrochage du contenu (`open-sse/utils/streamHandler.ts`) abandonne un flux qui n'a envoyé aucune sortie de modèle à temps, `markAccountUnavailable()` enregistre l'erreur sur la connexion mais ne définit aucun temps de recharge : le décrochage appartient à cette requête, le plus souvent un long tour de raisonnement sans encore de sortie. Les opérateurs peuvent se réinscrire avec `resilienceSettings.streamStallCooldown.enabled` (par défaut `false`).

**Signal de latence opt-in pour la sélection du compte `p2c`.** Chaque tentative envoyée enregistre son temps d'accès au premier octet et son résultat par connexion (et par modèle de connexion + ) dans une fenêtre continue en mémoire : les 20 derniers échantillons dans les 15 minutes (`open-sse/services/connectionLatencyTracker.ts`, enregistrés à partir de `safeLogEvents()` dans `src/sse/handlers/chatHelpers.ts`). Lorsque `resilienceSettings.p2cLatency.weight` est supérieur à `0` (plage 0-20, `0` = désactivé par défaut), `compareP2CConnections()` dans `src/sse/services/auth.ts` totalise des points `weight` pour chaque candidat de la paire. La moitié de cela vient de la latence en tant que rapport au candidat le plus rapide (deux fois plus lent prend la moitié entière) et l'autre moitié du taux d'erreur de roulement. Le terme s'applique uniquement lorsque les deux candidats disposent d'au moins 3 échantillons, les nouveaux comptes ne sont donc pas pénalisés et son plafond reste inférieur aux pénalités de quota bloqué et d'épuisement de quota. Il n'ajoute aucun circuit propre : les comptes défaillants sont toujours gérés par les couches de temps de recharge, de verrouillage et de disjoncteur. Réglez-le avec `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Les cadres de raisonnement relancent le budget de blocage du contenu.** Un modèle de raisonnement peut réfléchir quelques minutes avant son premier jeton visible : Claude diffuse des images `thinking_delta` dont le texte de réflexion peut être vide, et les réponses API diffusent un élément de raisonnement après l'autre. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) reconnaît ces frames, et le chien de garde relance son budget sur chacune d'entre elles au lieu d'annuler le tour. Ils ne constituent toujours pas une sortie du modèle, donc un tour qui se termine uniquement par un raisonnement est toujours signalé comme vide, et un tour qui arrête le raisonnement et n'envoie que des battements de cœur déclenche toujours le chien de garde.

Les trames binaires `reasoningContentEvent` de Kiro avec une signature non vide préservent cette activité de raisonnement via l'exécuteur sous la forme d'un delta `reasoning_content` vide. La signature n'est pas transmise. Les métadonnées, les frames incomplètes et les signatures vides ne relancent pas le budget de contenu ; le délai d'expiration indépendant du flux actif et l'annulation du client s'appliquent toujours (`open-sse/executors/kiro/reasoning.ts`).

**États terminaux (temps de recharge NOT ) :**

- `banned` — défini par détection de mot-clé banni / bannissement de compte (voir [BAN_DETECTION](../security/BAN_DETECTION.md) ). Les refus par requête en amont (`request_rejected`, par exemple Anthropic OAuth 403 "Demande non autorisée") ne le règlent jamais : ils sont comptés par connexion et par modèle et sortent ce modèle de la rotation avec un temps de recharge croissant plafonné à `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), ou refroidissent la connexion lorsqu'aucun modèle n'est connu — `open-sse/services/requestRejectedStreak.ts`
- `expired` (transitions vers le terminal après des tentatives limitées — `EXPIRED_RETRY_MAX = 3` avec interruption exponentielle — afin que les erreurs OAuth transitoires puissent s'auto-réparer avant que le compte ne soit définitivement désactivé)
- `credits_exhausted`

Ceux-ci persistent jusqu'à ce que les informations d'identification changent ou qu'un opérateur les réinitialise. N'écrasez pas les états des terminaux par un état de refroidissement transitoire.

**Récupération paresseuse :** lorsque `rateLimitedUntil` est passé, la connexion redevient éligible. En cas d'utilisation réussie, `clearAccountError()` efface tous les champs d'erreur.

### Mur d'utilisation Claude OAuth : réinitialisation de la limite de session + de la voie de priorité inférieure

**Portée:** une connexion d'abonnement Claude (OAuth). Les deux fonctionnalités sont** opt-in par connexion** (Modifiez la section de connexion → Claude → `lowPriorityMode` / `autoLimitReset` dans `providerSpecificData`, tous deux désactivés par défaut) et mettez en miroir les commandes `/low-priority` et `/limit-reset` de Claude Code (contrat de fil capturé à partir de Claude Code 2.1.263).

**Mise en œuvre:**

- Classification de réponse + de la machine à états : `open-sse/services/claudeLowPriority.ts`
- Réinitialiser le client status/claim : `open-sse/services/claudeLimitReset.ts`
- Hook de l'exécuteur (injection d'en-tête + nouvelle tentative avec le même compte) : `open-sse/executors/base.ts::execute()`
- Persistance de l'inscription : `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Déclenchement:** le mur d'utilisation de 5 heures — a `429` dont les en-têtes portent `anthropic-ratelimit-unified-status: rejected` et, lorsque le compte est éligible, `anthropic-ratelimit-unified-slow-offer: treatment`. Rien n'est envoyé devant ce premier mur 429 ; une rafale 429 sans en-têtes unifiés suit le chemin de recharge normal.

**Voie de priorité inférieure** (`lowPriorityMode`):

- Sur le mur 429, l'exécuteur accepte l'offre et réessaye immédiatement** même** compte avec `anthropic-usage-limit: slow`; la voie reste active jusqu'au `anthropic-ratelimit-unified-reset` annoncé (grâce + 60s) et chaque requête dans cette fenêtre porte l'en-tête. Le 429 intercepté n'atteint jamais `handleChatCore`, la connexion est donc** pas** mis en temps de recharge et n'est pas déplacé.
- `anthropic-ratelimit-unified-slow-status` sur les réponses ultérieures : `active` / `not_needed` garde la voie ; `slot_busy` (429) ou un `529` attend le `anthropic-ratelimit-unified-slow-retry-after` du serveur (20 s par défaut, 5 à 600 s par défaut, ± 30 % de gigue) et réessayez, délimité par `anthropic-ratelimit-unified-slow-max-wait` (20 min par défaut, 1 min à 6 h) — après la fin de la voie et un refroidissement de 10 minutes bloque la réacceptation. L'attente est en outre plafonnée par ce qui reste du délai d'attente de démarrage en amont de la requête (`resolveFetchStartTimeout`, 10 min par défaut) moins une marge de 5 s : sans ce plafond, l'attente maximale par défaut de 20 minutes survivrait à la requête et la mise en veille serait interrompue à mi-attente, faisant apparaître un `TimeoutError` au lieu du refroidissement gracieux `max_wait` end +.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, un renversement de fenêtre de 5 heures, ou `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (qui se termine par `extra_usage` sur n'importe quel statut, puisque l'excédent payé couvre désormais le mur) termine la voie ; la réponse suit ensuite le chemin de recharge normal. `budget_exhausted` est mémorisé jusqu'à la réinitialisation du budget annoncée (≤ 8 jours).
- La vérification du mur s'exécute après les 400 tentatives intra-tentatives pilotées par l'exécuteur (édition de contexte, pinces thinking/effort, apprentissage automatique des paramètres), de sorte qu'un mur 429 qui ne fait surface que sur l'une de ces tentatives est toujours intercepté au lieu d'atteindre le chemin de recharge.
- L'état est en mémoire par connexion (un redémarrage coûte un mur supplémentaire 429 pour être ré-accepté).

**Réinitialisation de la limite de session** (`autoLimitReset`, essayé avant la voie quand les deux sont allumés) :

- bloc `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` ; quand `arm: "reset"` et `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` avec `{ "program": "juniper_tide" }` (organisation UUID de `providerSpecificData.organizationUUID`, bootstrap fallback).
- `result: reset|not_limited` → la requête est réessayée à pleine vitesse (pas d'en-tête lent). `already_used` / `not_offered` memoise `next_available_at` (par défaut une semaine) ; tout échec recule de 15 minutes. La réinitialisation a lieu une fois par semaine et compte toujours dans la limite hebdomadaire.

Gardes de régression : `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Appliquer automatiquement les réinitialisations bancaires

**Portée:** Connexions d'abonnement Codex et Claude (OAuth).** S'inscrire** : le paramètre `bankedResetAutoApply` est désactivé et en mode `dry-run` par défaut (Paramètres → AI → Appliquer automatiquement les réinitialisations bancaires).

**But:** dépenser eux-mêmes les réinitialisations en banque lorsqu'un compte atteint un mur d'utilisation, au lieu d'attendre qu'un opérateur appuie sur « Échanger » sur la page Limites du fournisseur.

| Type de crédit (`creditTypes`) | Ce qui est racheté                                                       | Où ça court                                                        |
| ------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `codexCredits`                 | Codex réinitialiser les crédits                                          | travail en arrière-plan, toutes les 60 s                           |
| `claudeCredits`                | subventions en banque Claude (crédits `GRANT` )                          | travail en arrière-plan, toutes les 60 s                           |
| `claudeSessionReset`           | Réinitialisation hebdomadaire de la limite de session Claude (ci-dessus) | chemin de demande, via la même politique que la bascule par compte |

**Mise en œuvre:**

- Décision pure (une règle définie pour les deux chemins) : `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- Travail en arrière-plan : `src/lib/services/bankedResetAutoApply.ts` (démarré dans `src/instrumentation-node.ts`)
- Porte de chemin de requête Claude : `src/lib/usage/claudeSessionResetPolicy.ts`, enregistrée via `setClaudeLimitResetPolicy()` dans `open-sse/services/claudeLimitReset.ts`
- Historique, majuscules et webhook : `src/lib/usage/bankedResetAudit.ts`
- Historique API: `GET /api/settings/banked-reset-auto/history?limit=50` (gestion auth)

**Ordonnance de décision** (la première règle défaillante est la raison enregistrée) :

1. Fonctionnalité désactivée, type de crédit désactivé ou compte hors de portée (`accountScope` `all` / `selected` plus la carte `connections` par compte).
2. En dehors de l'horaire facultatif UTC (`startHourUtc` > `endHourUtc` passe minuit).
3. Caps sur les dernières 24 h : `maxPerAccountPerDay` (1), `maxPerDay` (3) et `minSpacingMinutes` (30) entre deux rachats quelconques.
4. Déclencheur : une fenêtre `session` ou `weekly` murée (lue depuis `getQuotaWindowStatus().reachedThreshold`, pas `isAccountQuotaExhausted()`, qui ne signale qu'un compte avec chaque fenêtre dépensée), ou un crédit expirant dans `expiringCreditHours` (24) sur un compte qui a utilisé au moins `expiringCreditMinUsedPercent` (50).
5. Garde à réinitialisation naturelle : ignorez lorsque la fenêtre murée de 5 heures se réinitialise dans `sessionResetGuardMinutes` (90) ou la fenêtre hebdomadaire murée dans `weeklyResetGuardHours` (12).
6. Plancher hebdomadaire : ignorez une réinitialisation de 5 heures lorsque le temps restant hebdomadaire est inférieur à `weeklyFloorPercent` (10).
7. Mode `last-resort` : ignorer pendant qu'un autre compte concerné du même fournisseur a au moins `poolHeadroomPercent` (10) dans les deux fenêtres. Les déclencheurs de crédit expirant contournent cela.
8. `dry-run` enregistre une ligne et ne rachète rien ; `last-resort` et `eager` rachètent.

Les données de quota manquantes ne débloquent jamais un échange : une heure de réinitialisation inconnue ou des sauts d'utilisation hebdomadaire.

**Réinitialisation de la session Claude :** avec la fonctionnalité désactivée ou `claudeSessionReset` désactivé, la bascule `autoLimitReset` par compte décide exactement comme avant. Lorsque les deux sont activés, la fonctionnalité remplace les bascules par compte : un compte concerné ne peut réclamer que lorsque la politique le permet, et en mode `dry-run`, aucune réclamation n'est effectuée.

**Sécurité:** le travail rachète au plus un crédit par tick, décide avant de lister les crédits (un compte ignoré n'est jamais répertorié), utilise les clés d'idempotence `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` et sauvegarde un compte pendant 1 h après un échec de listage ou de rachat. Chaque décision de rachat, d'échec et d'exécution à sec est écrite dans `audit_log` (`action: "bankedReset.redeem"`, pas de jetons ni d'identifiants de crédit) ; les majuscules sont comptées à partir de ces lignes, elles survivent donc aux redémarrages. Les rachats réussis déclenchent également le webhook `provider.reset_redeemed`.

Gardes de régression : `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### Affinité de session (#7274)

**Portée:** une session client (en-tête `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` ) épinglée sur une connexion, par exemple** n'importe lequel** fournisseur.

**But:** conservez un agent multi-tours (code Claude, aide, agents personnalisés) sur le même compte pour toutes les demandes, réduisant ainsi la perte de contexte entre comptes et les 429 de démarrage à froid répétés sur les fournisseurs avec un état de session par compte.

**Mise en œuvre:**

- résolution TTL : `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Épingle selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Extraction d'en-tête (générique, n'importe quel fournisseur) : `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Table de broches persistantes : `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Paramètre : `sessionAffinityTtlMs` ( TTL global en ms, `0` désactivé) — `src/lib/db/settings.ts`. Renommé à partir du `codexSessionAffinityTtlMs` réservé au Codex uniquement par migration `124_generic_session_affinity_ttl.sql`, qui reprend tout Codex TTL précédemment configuré comme nouvelle valeur par défaut.

Avant #7274, `resolveSessionAffinityTtlMs()` était basé sur `0` pour chaque fournisseur à l'exception `codex`, de sorte que le paramètre TTL (et les en-têtes de session) n'avaient aucun effet ailleurs, même si le mécanisme d'épinglage et l'extraction d'en-tête étaient déjà indépendants du fournisseur. Le correctif a supprimé ce retour anticipé ; le TTL s'applique désormais uniformément à chaque fournisseur une fois défini globalement au-dessus de `0`.

Les trois en-têtes d'affinité de session ne sont jamais transmis aux exécuteurs — en amont qui créent leurs propres en-têtes en amont à partir de zéro plutôt que de transmettre les en-têtes client, cela reste donc uniquement un identifiant de corrélation interne.

### Baux de connexion de session gérés exclusifs

**Portée:** un HTTP client/session géré actif possède une connexion OmniRoute éligible.

**But:** fournir une propriété de connexion exclusive et durable aux clients qui ont besoin d’une barrière de routage stricte entre les demandes. Cela diffère de l'affinité de session, qui est une préférence de continuité douce : un bail exclusif conserve l'état du cycle de vie dans SQLite, applique l'unicité globale du propriétaire actif et de la connexion active et rejette une génération obsolète avant l'envoi du fournisseur.

La fonctionnalité est opt-in par clé API. Une clé gérée doit avoir la portée `lease:exclusive` et une liste `allowedConnections` explicite non vide. N'importe quel client HTTP peut utiliser le point de terminaison du cycle de vie ; aucun nom de client, agent utilisateur, fournisseur, méthode OAuth ou modèle n'est requis. Le bail possède une connexion, pas un modèle, donc un changement de modèle conserve la liaison tandis que la connexion reste normalement éligible. Les règles normales de modèle, de quota, de santé, de temps de recharge et de liste d'autorisation restent faisant autorité et peuvent faire passer la même génération vers une autre connexion éligible gratuite.

Le cycle de vie est `POST /api/v1/session-leases` avec les actions JSON `acquire`, `renew` et `release`. Les requêtes d'inférence gérées présentent la valeur opaque `X-OmniRoute-Lease-Owner` et la valeur exacte `X-OmniRoute-Lease-Generation`. Le propriétaire utilise `vlo_` suivi de 43 caractères base64url ; seul son hachage SHA-256 est stocké. Chaque barrière de répartition finale lie également la clé API authentifiée ID et la connexion active ID. Les en-têtes de contrôle de bail sont supprimés des journaux, des instantanés de requêtes conservés et des en-têtes de l'exécuteur en amont.

Si le routage ordinaire a des candidats gérés éligibles mais que chaque candidat libre est occupé par un bail actif étranger, OmniRoute renvoie HTTP `429`, le code de capacité de location indisponible, un état d'attente de capacité et un `Retry-After` limité dérivé de la première expiration pertinente. L'éligibilité vide ordinaire n'est pas un conflit de bail et conserve sa sémantique d'erreur de routage existante.

Les mécanismes associés restent distincts :

- L'occupation de session OAuth est une distribution logicielle locale de processus pour les comptes OAuth.
- Les sémaphores de compte accordent des autorisations de simultanéité de demande et se terminent lorsqu'une demande est terminée.
- Les baux de session gérés exclusifs constituent une propriété durable sur le cycle de vie avec une clôture de génération.

---

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

## 4. Contrôle de la concurrence par partage de quotas (v3.8.36)

Les comptes d'abonnement (GLM, MiniMax, etc.) n'acceptent souvent que ~ 1 à 3 requêtes simultanées ; le dépassement déclenche des 429 et des temps de recharge. Ceci est aigu sous** quote-part** (`qtSd/…`) combos, où plusieurs clés API partagent un compte en amont. Trois couches empêchent un compte partagé d'être inondé.

### Plafond de concurrence par connexion (`max_concurrent`)

Chaque connexion du fournisseur peut déclarer un plafond `max_concurrent` (`provider_connections.max_concurrent`, défini dans la connexion modal / API / DB). Laissez-le vide sans limite. Il s'agit du seul bouton qui pilote la couche de sérialisation sous — et la définit sur la concurrence réelle du compte (par exemple, GLM ~ 1, MiniMax ~ 2).

### Plafonds de concurrence par modèle (`modelConcurrency`)

Une connexion peut en outre déclarer des plafonds de concurrence exacts par modèle dans sa carte `rateLimitOverrides` :

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Définissez-le dans le modal de connexion (** La limite de débit remplace → les plafonds de concurrence par modèle** , un `model=cap` par ligne) ou via `PATCH /api/providers/[id]` avec la même forme JSON. Sémantique clé :

- **À l’échelle de la connexion ou spécifique au modèle :** `maxConcurrent` reste le plafond partagé à l’échelle de la connexion. Lorsque les deux s'appliquent, les deux portes sont acquises atomiquement dans la même porte composite (`global → provider → account → model`) ; le comportement effectif est la limite applicable la plus stricte.
- **Correspondance exacte modèle-clé :** la clé est la chaîne de modèle transmise à l'exécuteur après la résolution du routage — normalement l'identifiant de modèle en amont (`glm-5`), pas un alias `provider/model` côté client (`zai/glm-5` ne correspond pas `glm-5`). Les valeurs sont des plafonds de demandes simultanées positives.
- **File d'attente locale, pas de découverte :** les requêtes excédentaires sont mises en file d'attente localement avec la sémantique queue/timeout existante (erreurs d'admission tapées `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` ). OmniRoute ne découvre ni ne déduit la politique en amont — il applique les plafonds exacts configurés par l'opérateur. Une porte de modèle saturée ne désactive jamais le fournisseur et ne crée jamais de verrouillage permanent du modèle ; le comportement 429/cooldown/fallback en amont reste le filet de sécurité contre les erreurs.
- **Portée par connexion et par processus :** les majuscules sont par connexion à la base de données et conservées en mémoire, de sorte que deux connexions réutilisant la même clé API en amont ne se coordonnent pas.
- **Non configuré signifie inchangé :** omettre la carte (ou laisser le champ du tableau de bord vide) n'ajoute aucune porte de modèle. Exemple de configuration sans affirmer de limite de fournisseur universel :

```text
glm-5=1
glm-4.7=3
```

### Sérialisation des demandes de partage de quota

Lorsqu'une répartition en partage de quota cible une connexion qui déclare un `max_concurrent` positif, les requêtes simultanées adressées à ce dernier** compte** sont sérialisés via un sémaphore par connexion (clé `qsconn:<connectionId>`) : requêtes excédentaires** attendre dans la file d'attente** au lieu d'inonder le compte. C'est** échec d'ouverture** — une file d'attente saturée ou un délai d'attente se déroule sans créneau plutôt que de jamais rejeter une demande distribuable. Activer** Paramètres → Résilience → Concurrence de partage de quota par connexion** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, activé par défaut). Sans plafond `max_concurrent` le comportement est inchangé.

> La porte de routage de partage de quota (`selectQuotaShareTarget`, DRR + P2C) est elle-même ouverte en cas d'échec et ne _dépriorise_ qu'une connexion au plafond — avec un pool de connexion unique qu'elle ne peut pas limiter de manière stricte, donc ce sémaphore est ce qui contient réellement l'inondation.

### Nouvelle tentative prenant en compte le temps de recharge du combo

Pour chaque stratégie de combo (lorsqu'elle est activée), une demande qui cristalliserait un 429 pour un temps de recharge transitoire SHORT l'attend et le réexpédie au lieu de renvoyer le 429 — Cela couvre les fenêtres TPM/RPM de classe Gemini (~ 60s réessayer après) sur les combos multi-modèles, par exemple les deux cibles d'un combo à 2 modèles atteignant une limite de débit par modèle. Délimité par `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) dans** Paramètres → Résilience** . Il n'attend jamais pour des raisons `quota_exhausted` (verrouillé jusqu'à minuit) ou auth/not-found. Avec `comboTimeoutMs` défini, une attente qui ne peut pas se terminer avant cette date limite ne commence pas (#18998) : le combo répond immédiatement avec sa réponse de terminal au lieu d'un `COMBO_TIMEOUT` 504.

Un combo peut se désinscrire avec `config.comboCooldownWaitEnabled: false`. Seul `false` littéral désactive ces attentes combinées partagées (temps de recharge après expédition et attentes circuit-open/model-lock avant expédition) et leur extension de délai d'expiration du budget d'attente. Missing ou `true` préserve la politique globale ; `true` ne peut pas activer l'attente globalement désactivée. Un `targetTimeoutMs` explicite gagne toujours. Cette désinscription ne modifie pas l’attente préalable à l’expédition des broches Codex natives.

La même porte couvre le cas de pré-envoi (#16319) : lorsque chaque cible d'un combo est ignorée avant qu'une tentative ne soit effectuée parce que son modèle se trouve dans un court verrouillage transitoire, le chemin de tentative zéro attend le verrouillage sous les mêmes plafonds et ré-envoie, au lieu de répondre à un `503 ALL_TARGETS_SKIPPED` sans indice. Lorsqu'aucune attente n'est autorisée (plafond, tentative ou budget épuisé, ou fonctionnalité désactivée), la réponse du terminal passe à `429 rate_limit_error` transportant `retry_after` / `reset_at` à partir de la première expiration du verrouillage transitoire ; les verrous de quota, d'authentification et non trouvés conservent le 503 sans indice.

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

- **22 stratégies de routage** (priorité, pondéré, round-robin, relais de contexte, remplissage en premier, p2c, aléatoire, le moins utilisé, optimisé en termes de coût, tenant compte de la réinitialisation, fenêtre de réinitialisation, expiration en premier, marge, pondéré par quota, aléatoire strict, auto, lkgp, optimisé pour le contexte, optimisé pour le cache, fusion, pipeline, jev) — voir [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Routage compatible avec la réinitialisation** (v3.8.0) — donne la priorité aux connexions en fonction du temps de réinitialisation du quota.
- **Dégradation du mode arrière-plan** Réponses — API `background: true` dégradées pour être synchronisées avec l'avertissement.
- **Détection dynamique des limites d'outils** — recule devant les fournisseurs lorsque les limites du nombre d'outils sont atteintes.
- **Repli d'urgence** — contrôlé par `OMNIROUTE_EMERGENCY_FALLBACK`; les opérateurs peuvent le remplacer à partir de la page Indicateurs de fonctionnalités sans redémarrage.

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
