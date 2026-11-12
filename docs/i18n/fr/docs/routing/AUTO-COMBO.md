# OmniRoute Auto-Combo Engine (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Pour les utilisateurs** : Vous cherchez un démarrage rapide ? Consultez le [Guide utilisateur d’Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md) pour obtenir des explications simples et des exemples.

> Chaînes de modèles autogérées avec notation adaptative + routage automatique sans configuration

## Routage automatique sans configuration (préfixe `auto/`)

> **NOUVEAU :** Aucune création de combo requise. Utilisez directement le préfixe `auto/` dans n’importe quel client.

### Exemples rapides

| ID du modèle   | Variante | Comportement                                                                                  |
| -------------- | -------- | --------------------------------------------------------------------------------------------- |
| `auto`         | default  | Tous les fournisseurs connectés, stratégie LKGP, pondérations équilibrées                     |
| `auto/coding`  | coding   | Pondérations privilégiant la qualité, adaptées à la génération de code                        |
| `auto/fast`    | fast     | Sélection pondérée à faible latence                                                           |
| `auto/cheap`   | cheap    | Routage optimisé pour les coûts (coût le plus bas en premier)                                 |
| `auto/offline` | offline  | Privilégie les fournisseurs disposant du quota disponible le plus élevé                       |
| `auto/smart`   | smart    | Priorité à la qualité + taux d’exploration plus élevé (10 %) pour mieux découvrir les modèles |
| `auto/lkgp`    | lkgp     | LKGP explicite (identique à `auto` par défaut)                                                |
| `auto/chaos`   | chaos    | Diffusion parallèle, un modèle par fournisseur (pas d’injection de pannes)                    |

### Composition catégorie × niveau (`auto/<category>:<tier>`)

Les suffixes de style OpenRouter séparent **le type de route** (catégorie) de **la manière de l’optimiser** (niveau), afin que vous puissiez les combiner librement (#4235 Phase B, `open-sse/services/autoCombo/suffixComposition.ts`) :

- **Catégories** (filtrent l’ensemble de candidats par capacité) : `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` conservent les modèles prenant en charge la vision ; `reasoning` conserve les modèles de raisonnement/réflexion.
- **Niveaux** (sélectionnent les pondérations de score / le filtre de l’ensemble) : `fast` (livraison rapide) · `cheap` (alias `floor`, réduction des coûts) · `reliable` (santé du disjoncteur + stabilité de la latence) · `free` / `pro` (filtrent l’ensemble par niveau de modèle via `classifyTier` — niveau gratuit ou premium).

| Exemple                | Résultat                                                                      |
| ---------------------- | ----------------------------------------------------------------------------- |
| `auto/coding:fast`     | ensemble de codage, pondérations à faible latence                             |
| `auto/coding:cheap`    | ensemble de codage, optimisé pour les coûts (alias `auto/coding:floor`)       |
| `auto/reasoning:pro`   | modèles de raisonnement/réflexion uniquement, niveau premium                  |
| `auto/vision`          | modèles prenant en charge la vision (aucun niveau → pondérations équilibrées) |
| `auto/multimodal:free` | modèles prenant en charge le multimodal, niveau gratuit uniquement            |

Toute valeur valide `auto/<category>[:<tier>]` est résolue à la demande ; un sous-ensemble sélectionné est présenté dans `/v1/models` et le tableau de bord (`AUTO_SUFFIX_VARIANTS` dans `open-sse/services/autoCombo/builtinCatalog.ts`). Le filtrage est **à tolérance ouverte** — si aucune contrainte ne correspond aux modèles connectés, l’ensemble complet est utilisé afin que le routage ne soit jamais interrompu. Le système central de calcul des scores (`combo.ts`) reste inchangé ; le filtre de catégorie/niveau est appliqué dans `buildAutoCandidates`.

> **Intelligence des modèles en temps réel :** la pertinence du routage automatique s’appuie sur les classements **Arena ELO** en temps réel et les données de niveau de **models.dev** lorsque l’indicateur `ARENA_ELO_SYNC_ENABLED` est activé (sinon, le système revient à la carte de pertinence statique).

**Utilisation :**

```bash
# Tout IDE ou outil CLI prenant en charge le format OpenAI
URL de base : http://localhost:20128/v1
Clé API :     <votre-clé-de-point-de-terminaison>

# Dans votre code/configuration, définissez le modèle sur :
model: "auto"                 # valeur par défaut équilibrée
model: "auto/coding"          # idéal pour les tâches de codage
model: "auto/fast"            # le plus rapide disponible
model: "auto/cheap"           # le moins cher par jeton
```

**Ce qui se passe :**

1. OmniRoute détecte le préfixe `auto/` dans `src/sse/handlers/chat.ts`
2. Interroge toutes les **connexions actives aux fournisseurs** dans la base de données
3. Filtre celles disposant d’identifiants valides (clé API ou jeton OAuth)
4. Détermine le modèle pour chaque connexion (`connection.defaultModel` ou le premier modèle du fournisseur)
5. Crée un **combo virtuel** en mémoire (non stocké dans la base de données)
6. Effectue le routage à l’aide du profil de pondération de la variante sélectionnée et de la stratégie LKGP

**Propriétés principales :**

- ✅ **Toujours actif :** Aucun interrupteur, aucune création de combo, aucune configuration nécessaire
- ✅ **Dynamique :** Reflète automatiquement les fournisseurs actuellement connectés
- ✅ **Affinité de session :** LKGP garantit que le dernier fournisseur ayant réussi est prioritaire
- ✅ **Prise en charge de plusieurs comptes :** Chaque connexion à un fournisseur devient un candidat distinct
- ✅ **Aucune écriture en base de données :** Le combo virtuel n’existe que pour la requête, sans aucune surcharge de persistance

### Contrôle des candidats par clé (#7819, niveaux 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = le suffixe après `auto/`, ou
la valeur littérale `auto` pour le canal de base) est un point de terminaison **en lecture seule** qui répertorie
l’ensemble actuel de candidats d’un canal `auto/*`, enrichi de leur accessibilité en temps réel, en réutilisant
les lectures de résilience existantes (jamais la valeur brute `state` du disjoncteur) :

- disjoncteur du fournisseur — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- délai de récupération de la connexion — `rateLimitedUntil` / `testStatus` sur la ligne
  `provider_connections` résolue
- verrouillage du modèle — `isModelLocked(provider, connectionId, model)`

Chaque candidat comporte également l’indicateur `excluded` de cette clé API. Les exclusions sont stockées
par clé API (table `auto_candidate_overrides`, migration `128`) — OmniRoute est
monolocataire et ne possède pas de table `users` ; `apiKeyId` constitue donc l’identité réelle par appelant
la plus proche — et sont appliquées au point de contrôle de l’ensemble de candidats dans
`open-sse/services/autoCombo/virtualFactory.ts` au moyen de la fonction pure et couverte par des tests unitaires
`filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`).
Le filtre est **à tolérance ouverte** : une valeur apiKeyId/channel non définie ou l’échec d’une consultation de la base de données
laissent tous deux l’ensemble non filtré, de sorte qu’un opérateur n’ayant configuré aucun remplacement bénéficie d’un routage
strictement identique, octet pour octet, à celui précédant cette fonctionnalité.

**Reporté à un ticket ultérieur :** pondération par candidat + ordre explicite (niveau 3
— alimente les chemins de stratégie pondérée/prioritaire existants) et épinglage d’une stratégie
`combo.ts` spécifique par canal `auto/*` (niveau 4). Consultez le plan du ticket #7819 pour la question
ouverte visant à déterminer si les remplacements doivent rester propres à chaque clé d’API ou devenir globaux compte tenu du
modèle à locataire unique.

**En coulisses :**

```txt
Requête : { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts détecte le préfixe
   ↓
createVirtualAutoCombo('coding') → candidatePool issu des connexions actives
   ↓
handleComboChat (même moteur que pour les combinaisons persistées)
   ↓
La notation automatique sélectionne le meilleur fournisseur/modèle pour chaque requête
```

**Fichiers d’implémentation :**

| Fichier                                                   | Objectif                                                            |
| --------------------------------------------------------- | ------------------------------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Analyseur de préfixe (`parseAutoPrefix`)                            |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Crée des objets `AutoComboConfig` virtuels                          |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Point d’injection de test pour simuler le registre des fournisseurs |
| `src/sse/handlers/chat.ts`                                | Intégration : court-circuit du préfixe automatique                  |
| `src/shared/constants/providers.ts`                       | Entrée système `SYSTEM_PROVIDERS.auto`                              |

## Préférences de compte pour les combos automatiques enregistrés

L'éditeur Intelligent Auto propose en option un** Préférences de compte** section. Chaque connexion peut être Préférée, Normale (par défaut), Réserve ou Exclue. Plusieurs connexions peuvent partager un niveau. Sélection automatique au sein du premier niveau éligible, en y conservant son comportement scoring/router ; les tentatives infructueuses se répercutent sur les comptes concrets restants, préférés avant la normale avant la réserve. Les connexions exclues ne sont jamais utilisées par ce combo.

Le paramètre est stocké sous `config.accountPreferences`, saisi par la connexion ID:

```json
{
  "accountPreferences": {
    "connection-a": "preferred",
    "connection-b": "preferred",
    "connection-c": "reserve",
    "connection-d": "excluded"
  }
}
```

Une carte omise ou vide conserve le routage existant. Les préférences n'activent pas les connexions désactivées, n'accordent pas l'accès aux clés API, ne restaurent pas les candidats bloqués par quota ou ne contournent pas les contrôles budgétaires. Chaque tentative est limitée à sa connexion concrète, de sorte que le compte de secours ne peut pas sauter de niveau derrière le routeur combiné. L'affinité de session existante peut conserver un compte éligible ; l'exclusion du compte lié à un tour natif arrête ce tour au lieu de changer de compte silencieusement.

Les préférences configurées utilisent le chemin automatique prenant en compte le compte : les raccourcis de cache contextuel non lié, de pipeline intelligent, de chaos et d'ombre ne sont pas distribués. La couverture spéculative est désactivée pour ces demandes, de sorte que les comptes de réserve ne peuvent pas rivaliser avec les comptes préférés. Les autres stratégies de combo n'interprètent pas ce paramètre. Changer un combo en dehors de Auto conserve les préférences enregistrées pour un retour ultérieur.

## Noms de combos correspondant à un identifiant de modèle réel

Un combo dont le `name` est identique à un identifiant de modèle sans préfixe (par exemple, un combo nommé
`gpt-5.5`) constitue un **comportement intentionnel et pris en charge**, et non un bug : il s’agit du
mécanisme de repli entre fournisseurs pour chaque identifiant de modèle, documenté dans
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Comme la résolution des combos
est vérifiée avant celle des identifiants de modèle sans préfixe
(`getComboForModel()` dans `src/sse/services/model.ts`), une requête portant sur l’identifiant
`gpt-5.5` est acheminée via les cibles du combo (par exemple,
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) plutôt que directement vers
un seul fournisseur — cela réutilise la priorité des combos sur la réécriture, conçue pour
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227), et fait l’objet de
tests de non-régression dans `tests/unit/responses-combo-resolution-3227.test.ts` et
`tests/unit/combo-name-codex-responses-rewrite.test.ts`.

La création ou le renommage d’un combo avec un nom masquant un identifiant de modèle réel n’est
**jamais refusé** — un tel refus interromprait ce flux de travail documenté. À la place
(#8530), `POST /api/combos` et `PUT /api/combos/[id]` ajoutent à la réponse un champ
`warning` non bloquant lorsque le nouveau nom entre en collision avec un identifiant de
modèle réel :

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Au démarrage, `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) consigne également un avertissement `[STARTUP]` sur une seule ligne,
énumérant chaque combo existant qui masque un identifiant de modèle, afin que les opérateurs qui
rencontrent cette situation accidentellement (plutôt qu’intentionnellement, conformément à #6940) en soient avertis.
La fonction utilitaire de détection se trouve dans `src/lib/combos/modelNameCollision.ts`.

## Appeler un combo personnalisé depuis un client

Les combos persistants (Paramètres → Combos) ne sont utilisés que lorsque le client envoie le **nom exact** du combo dans le champ `model` — aucune correspondance approximative ou partielle du nom du combo n’est effectuée, et aucun préfixe `auto/` n’intervient. Ordre de résolution (`getComboForModel()` dans `src/sse/services/model.ts`) :

1. correspondance exacte avec le nom du combo (`model: "my-combo"`),
2. préfixe `combo/<name>` (`model: "combo/my-combo"`),
3. mappages modèle→combo par motifs glob (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Deux pièges courants :

- **`auto` n’utilise pas vos combos.** `auto`/`auto/*` construit son propre ensemble de candidats sans configuration et ne consulte les combos persistants que si un combo porte littéralement le nom `auto` (non recommandé). Pour acheminer une requête via un combo, envoyez son nom exact — pas `auto`.
- **`openrouter/auto` est un véritable produit OpenRouter payant** (« Auto Best Available »), et non un alias OmniRoute. Il s’agit de l’unique entrée de modèle statique du registre OpenRouter (`open-sse/config/providers/registry/openrouter/index.ts`) et sa facturation est distincte. Utilisez Paramètres → Routage → Masquer les modèles payants pour l’exclure des ensembles `auto`.

Consultez [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) et [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) pour connaître l’origine de la confusion clarifiée par cette documentation.

## Comment ça marche (Combos automatiques persistants)

Le moteur Auto-Combo sélectionne dynamiquement le meilleur provider/model pour chaque demande à l'aide d'un **Fonction de notation à 16 facteurs** (défini dans `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). La somme des poids par défaut est `1.0`; les poids personnalisés sont renormalisés par `normalizeScoringWeights()`. Deux des seize — `cacheAffinity` et `resetWindowAffinity` — portent un poids par défaut de `0`; `reliability` transporte `0` dans `DEFAULT_WEIGHTS` mais `0.03` dans les packs génériques et `0.04` dans `reliability-first`, et `quality` transporte `0.02` dans les packs (`0.03` dans `quality-first`) : ils sont toujours calculés pour chaque candidat, et `cacheAffinity` déclenche la déduplication du cache d'invite en dehors du score, de sorte que les facteurs zéro défaut ne votent tout simplement pas par défaut alors que les packs le font.

![Auto-Combo 16-factor scoring](../diagrams/exported/auto-combo-scoring.svg)

> Source : [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (régénération via `npm run docs:render-diagrams`). Le nom du fichier est historique ; la source et le diagramme rendu montrent les 16 facteurs déclarés dans `DEFAULT_WEIGHTS`.

| Facteur               | Pondération par défaut | Description                                                                                                                                                                                                                                                          |
| :-------------------- | :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429                 | Quota restant/marge de limite de débit [0..1]                                                                                                                                                                                                                        |
| `health`              | 0.1605                 | Score de santé du disjoncteur (CLOSED= 1.0, HALF_OPEN= 0.5, OPEN= 0.0)                                                                                                                                                                                               |
| `costInv`             | 0.1429                 | Inverse **mélangé** coût (60 % d'entrée + 40 % de sortie prix du jeton, normalisé) — moins cher = score plus élevé                                                                                                                                                   |
| `latencyInv`          | 0.1143                 | Latence inverse p95 normalisée pour regrouper — plus rapidement et score = plus élevé                                                                                                                                                                                |
| `taskFit`             | 0.0762                 | Aptitude au type de tâche (codage, révision, planification, analyse, débogage, documentation)                                                                                                                                                                        |
| `stability`           | 0.0476                 | Stabilité basée sur la variance par rapport à l'écart type de latence — un candidat dont le temps de réponse oscille obtient des scores inférieurs                                                                                                                   |
| `tierPriority`        | 0.0476                 | Priorité au niveau du compte — Ultra = 1.0, Pro = 0.67, Standard = 0.33,= 0.0 gratuit                                                                                                                                                                                |
| `tierAffinity`        | 0.0476                 | Affinité entre le niveau du candidat et le niveau recommandé par le manifeste                                                                                                                                                                                        |
| `specificityMatch`    | 0.0476                 | Correspondance entre la spécificité de la demande (indice du manifeste) et le niveau du modèle                                                                                                                                                                       |
| `contextAffinity`     | 0.0476                 | Affinité entre le besoin de fenêtre contextuelle de la requête et la fenêtre contextuelle du modèle                                                                                                                                                                  |
| `sessionAvailability` | 0.0476                 | Disponibilité de la session OAuth de la connexion candidate pour cette session (`getOAuthSessionAvailability()`; score des connexions non OAuth 1,0)                                                                                                                 |
| `connectionDensity`   | 0.0476                 | Répartit la charge sur les connexions du même fournisseur (anti-concentration)                                                                                                                                                                                       |
| `cacheAffinity`       | 0.00                   | Affinité par hachage rendez-vous vers la connexion la plus susceptible de déjà détenir le préfixe du cache de prompts de cette requête (`open-sse/services/combo/promptCacheAffinity.ts`) ; désactivée par défaut (#8008)                                            |
| `resetWindowAffinity` | 0.00                   | Biais en faveur des connexions dont la fenêtre de réinitialisation des quotas est favorable (désactivée par défaut)                                                                                                                                                  |
| `quality`             | 0.03                   | Signal de qualité de sortie piloté par rétroaction provenant du système de suivi de la qualité des événements de routage ; les candidats sans observations reçoivent une note neutre de 0,5                                                                          |
| `reliability`         | 0.00                   | Part de réussite observée, `1 - failureRate`, à partir de 24 heures d'historique d'utilisation derrière un plancher de dix échantillons (dans le cas contraire, métriques en temps réel) ; les candidats sans observations se lisent comme 1,0. Désactivé par défaut |

Le tracker `quality` en mémoire (`open-sse/services/routing/quality.ts`) est vide après un redémarrage à froid, donc chaque candidat obtient un `0.5` neutre jusqu'à ce que les premières observations atterrissent.

> **Quota illisible (#15347).** Lorsqu'un fournisseur dispose d'un outil de récupération de quota mais qu'il ne renvoie rien de lisible (échec de la récupération, informations d'identification manquantes, utilisation de messages uniquement ou instantané mal formé sans `windows` analysable et sans `percentUsed` fini, y compris `percentUsed: null`), le candidat obtient un score `0` sur l'axe `quota` et son score final est multiplié par `UNREADABLE_QUOTA_SOFT_DEPRIORITIZE_FACTOR` (0,5, `autoStrategy.ts`), le même modèle de pénalité légère que la pénalité de statut de connexion. Une lecture d'utilisation échouée est une preuve de la télémétrie, et non du fournisseur, elle se classe donc strictement en dessous de toute lecture réelle, y compris une lecture confirmée à 100 %-used, mais n'est jamais bloquée ou expulsée. Un fournisseur sans plafond déclare `unlimited: true` et obtient un quota complet ; un fournisseur sans outil de récupération de quota enregistré n'a aucune source de télémétrie et conserve la valeur par défaut de `100`.

**Somme:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0` tel que déclaré dans `DEFAULT_WEIGHTS`; les poids configurés par l'utilisateur sont renormalisés dans une distribution par `normalizeScoringWeights()` avant la notation.

## Packs de modes

6 profils de pondération prédéfinis dans `open-sse/services/autoCombo/modePacks.ts`. Chaque pack remplace entièrement les pondérations par défaut afin d’orienter la sélection vers un objectif précis. Chaque pack totalise déjà `1.0` (`0.9999` tel qu’affiché avec quatre décimales), donc `normalizeScoringWeights()` n’a rien de significatif à corriger lorsqu’un pack est actif — les valeurs ci-dessous sont, à l’arrondi près, celles que le moteur de notation applique.

| Facteur               | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

Remarques :

- **Les packs incluent `quality` et `reliability`** (`quality 0.02`, `quality-first 0.03` ; `reliability 0.03`, `reliability-first 0.04`) et remplacent intégralement la table des pondérations (`weights = pack`, il ne s’agit pas d’une fusion). `DEFAULT_WEIGHTS` contient `quality 0.03 / reliability 0` ; sélectionner `balanced`/`default` conserve ces valeurs par défaut, tandis que sélectionner un pack utilise les valeurs du pack indiquées ci-dessus. Dans un pool à froid (aucune observation pour le moment, donc `quality 0.5` et `reliability 1`), ces deux facteurs ajoutent `+0.04` avec un pack générique (`0.03 + 0.01`), `+0.045` avec `quality-first` et `+0.05` avec `reliability-first`.
- `tierAffinity`, `specificityMatch` et `resetWindowAffinity` valent explicitement `0` dans chaque pack.
- L’accent mis par chaque pack en un coup d’œil :
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (connexions saines à faible latence)
  - **cost-saver** → costInv 0.3324 (les jetons les moins chers l’emportent)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, la valeur la plus élevée de tous les packs (meilleur modèle pour la tâche, résultats cohérents)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (marge maximale, indépendamment de la vitesse ou du coût)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, la valeur la plus élevée de tous les packs (le moins de surprises possible)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (le pack de pondérations que `auto/chaos` attribue aux membres de son panel ; la distribution parallèle ne lit pas ces pondérations, et il ne s’agit pas d’un profil d’injection de pannes, voir [CHAOS-MODE.md](../guides/CHAOS-MODE.md#autochaos-parallel-fan-out))

### Contrôles par requête (en-têtes) — #6023 / #6024 / #6025 / #3470

Un combo `auto` peut être piloté **pour chaque requête** au moyen de trois en-têtes, sans modifier la
configuration stockée du combo. Ceux-ci s’appliquent uniquement à la stratégie `auto` et uniquement à la requête
qui les contient ; les valeurs `modePack`/`budgetCap`/`budgetFallback` enregistrées du combo sont utilisées
lorsque l’en-tête est absent.

| En-tête                       | Valeurs acceptées                                                                                                                                                                                   | Effet                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | un alias de préréglage (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) ou un nom de pack brut (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Remplace les pondérations de notation pour cette requête. `balanced`/`default` imposent les pondérations par défaut (aucun pack). Les valeurs inconnues sont ignorées (la configuration est conservée).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `X-OmniRoute-Budget`          | un nombre positif (montant maximal en USD par requête)                                                                                                                                              | Plafond de coût strict : les candidats dont le coût estimé le dépasse sont filtrés avant la sélection. Le comportement adopté lorsque **tous** les candidats le dépassent est contrôlé par `X-OmniRoute-Budget-Fallback` ci-dessous.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (valeur par défaut, alias : `cheapest-viable`, `soft`) ou `strict` (alias : `block`, `hard`)                                                                                             | `cheapest` : utilise en dernier recours le candidat globalement le moins cher, même s’il dépasse toujours le plafond (comportement historique). `strict` : refuse d’effectuer une sélection — la requête échoue immédiatement avec `HTTP 402` au lieu de dépasser silencieusement le budget. Les valeurs inconnues sont ignorées.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `X-OmniRoute-Effort`          | `auto` (autres valeurs réservées)                                                                                                                                                                   | Budget de réflexion adaptatif : lorsque la requête ne comporte **aucun** champ de raisonnement, quelle qu’en soit la forme (`reasoning_effort`, `reasoning`, `thinking`), la passerelle résout `auto` en `low`/`medium`/`high` à partir de signaux déterministes liés à la structure de la requête (longueur du dernier message utilisateur, taille du contexte jusqu’au dernier message utilisateur, résultats d’outils antérieurs, profondeur de la boucle d’outils). Les signaux sont limités au tour actuel — tout ce qui suit le dernier message utilisateur est ignoré — de sorte que chaque requête d’une boucle d’outils est résolue au même niveau (fixation sans état par tour, aucun état de session, aucune augmentation en cours de boucle susceptible de rompre les préfixes du cache de prompts en amont). Un champ de raisonnement explicite fourni par le client est toujours prioritaire. Limité aux requêtes dont le routage en amont est résolu vers le format OpenAI Chat Completions (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` est un champ au format OpenAI ; l’en-tête est donc sans effet sur une requête ciblant Claude ou Gemini (voir `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Forcer le profil le plus rapide, plafonner cette requête à 0,05 $, et la bloquer strictement plutôt que de dépasser le budget
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

La résolution est une fonction pure (`open-sse/services/autoCombo/requestControls.ts`) ; les
valeurs résolues alimentent les entrées existantes `config.modePack` / `config.budgetCap` /
`config.budgetFallback` du moteur. La valeur `config.budgetFallback` enregistrée d’une combinaison ("strict" |
"cheapest") définit la politique persistante ; l’en-tête la remplace pour une seule requête.

## Toutes les stratégies de routage

Le moteur combo de OmniRoute prend en charge **20 stratégies de routage** (déclaré dans `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Le moteur Auto Combo lui-même est exposé dans le cadre de la stratégie `auto` ; les autres sont disponibles pour des combos persistants.

| Stratégie           | Description                                                                                                                                                                                                                         |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Liste ordonnée de première cible avec priorité explicite                                                                                                                                                                            |
| `weighted`          | Pondération aléatoire selon le poids par cible                                                                                                                                                                                      |
| `round-robin`       | Parcourez les cibles dans l'ordre (par lots ; voir ci-dessous)                                                                                                                                                                      |
| `context-relay`     | Transférer le contexte entre les cibles (longues conversations)                                                                                                                                                                     |
| `fill-first`        | Remplissez le quota de chaque cible avant de passer à la suivante                                                                                                                                                                   |
| `p2c`               | Équilibrage de charge aléatoire Power-of-2-choices                                                                                                                                                                                  |
| `random`            | Sélection aléatoire uniforme                                                                                                                                                                                                        |
| `least-used`        | Choisissez la cible avec la charge de courant la plus faible                                                                                                                                                                        |
| `cost-optimized`    | Minimisez le $ par demande étant donné le prix du catalogue                                                                                                                                                                         |
| `reset-aware` ⭐    | Prioriser par temps de réinitialisation des quotas Les fenêtres de réinitialisation courtes — sont mieux classées                                                                                                                   |
| `reset-window`      | Préférer les cibles dont la fenêtre de quota se réinitialise le plus tôt                                                                                                                                                            |
| `headroom`          | Choisissez la cible avec la plus grande marge de quota restante                                                                                                                                                                     |
| `quota-weighted`    | Évitez les comptes épuisés, puis choisissez parmi les autres proportionnellement au quota restant divisé par la charge en vol ; les conversations existantes restent épinglées                                                      |
| `strict-random`     | Aléatoire sans déduplication des répétitions                                                                                                                                                                                        |
| `auto`              | Utiliser le score Auto Combo (16 facteurs) —**recommandé**                                                                                                                                                                          |
| `lkgp`              | Dernier bon chemin connu (épingle au dernier fournisseur réussi, puis revient aux règles)                                                                                                                                           |
| `context-optimized` | Choisissez la cible la mieux adaptée à la taille du contexte actuel                                                                                                                                                                 |
| `cache-optimized`   | Réorganiser les cibles par affinité de cache d'invite — la connexion la plus susceptible de contenir déjà le préfixe mis en cache de cette requête est essayée en premier (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Répartissez-vous sur un panel de modèles en parallèle, puis synthétisez une réponse via un juge (voir ci-dessous)                                                                                                                   |
| `pipeline`          | Exécutez les cibles de manière séquentielle, en intégrant le résultat de chaque étape dans l'entrée de l'étape suivante ; seule la réponse finale est renvoyée (#6396)                                                              |

⭐ = Nouveau dans la v3.8.0 · 🧬 = Nouveau dans la v3.8.36

### Sémantique `weighted`

`weighted` est un **tirage au sort proportionnel par demande** (`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), pas un égaliseur :

- Chaque demande attire **un** pas avec probabilité `weight / totalWeight`; les étapes restantes sont classées par poids décroissant comme chaîne de repli pour cette demande.
- Une étape dont le poids est `0` (ou manquant) est **jamais dessiné** alors que toute autre étape a un poids > 0 — elle ne peut servir de solution de repli qu'après l'échec de l'étape dessinée. Seulement quand **tous** les poids sont 0 et la sélection devient uniforme.
- Les étapes dont les cibles sont toutes indisponibles, le disjoncteur du fournisseur — `OPEN`, le temps de recharge de la connexion et le verrouillage du modèle — sont supprimés du tirage avant qu'ils ne se produisent (`open-sse/services/combo/targetResolution.ts`), de sorte qu'une seule étape saine peut temporairement remporter chaque demande.
- `stickyWeightedLimit` (configuration combinée, `1` = désactivé par défaut) épingle l'étape dessinée pour autant de succès consécutifs avant de redessiner.

Pour une rotation stricte, utilisez `round-robin`; des poids égaux sur `weighted` donnent un équilibre statistique — et non un équilibre — strict.

### Mode pipeline agent

Un combo `pipeline` avec au moins deux modèles peut opter pour le routage planner/executor avec `config.agenticOrchestration.enabled`. La première cible possède la planification et les réponses finales ; la deuxième cible émet des appels d’outils natifs du client. OmniRoute détecte les suites de résultats d'outils à partir du protocole de requête, demande au planificateur si un autre cycle d'outils est nécessaire et fait de l'exécuteur ou du planificateur l'étape finale orientée client de manière dynamique.

`config.agenticOrchestration.contextCompaction` en option applique un budget de charge utile distinct avant chaque expédition du planificateur ou de l'exécuteur. Activez-le explicitement :

```json
{
  "enabled": true,
  "defaultMaxChars": 400000,
  "targetRatio": 0.72,
  "toolResultMaxChars": 24000,
  "modelMaxChars": { "provider/planner": 175000, "provider/executor": 300000 }
}
```

Il s'agit de budgets de caractères JSON sérialisés sélectionnés par l'opérateur, et non de fenêtres de contexte de jeton ou de limites en amont garanties. Le modèle exact IDs remplace la valeur par défaut. Au-dessus du seuil, le compactage supprime les définitions d'outils identiques, réduit les preuves d'outils surdimensionnées avec un résumé et supprime les anciens groupes d'historique complet pour atteindre le ratio cible. Il conserve les instructions system/developer, la dernière demande de l'utilisateur, le dernier cycle d'outils incluant calls/results parallèle et l'instruction de routage principale de Gemini. Les instructions de niveau supérieur et les paramètres des outils sont conservés. Un marqueur d'omission enregistre l'historique des suppressions ; il s'agit d'un découpage déterministe, pas d'un résumé sémantique. Si le contexte épinglé dépasse toujours le budget, la requête renvoie 413 avant de contacter le modèle. Avec le compactage désactivé ou en dessous du seuil, la requête passe sans changement.

Lors des continuations de résultats d'outils, OmniRoute arrête également l'exécution lorsque deux tours consécutifs terminés répètent les mêmes appels d'outil avec des résultats inchangés, ou lorsque chaque résultat explicitement marqué dans deux tours consécutifs a échoué. Les résultats modifiés autorisent des appels répétés (par exemple, un sondage). La protection se réinitialise à la demande d'un nouvel utilisateur, regroupe les appels parallèles en un seul cycle et prend en charge les historiques Anthropic, Chat Completions, Réponses et Gemini. Le planificateur reçoit la raison et possède la réponse finale même s'il demande un autre tour d'outil.

Les modèles supplémentaires après la deuxième cible reçoivent des sauvegardes d'exécuteur ordonnées. Une réponse HTTP ou une exception de transport ayant échoué passe à l'exécuteur suivant, transportant la même décision de planificateur et les mêmes outils natifs, mais l'invite d'étape et la connexion résolue de cet exécuteur. La première réponse réussie est renvoyée inchangée, y compris le streaming SSE ; les échecs après le démarrage réussi d’un flux ne peuvent pas être réessayés ici. Si tous les exécuteurs échouent, le dernier échec est renvoyé. Le client abandonne l’envoi d’arrêt.

```json
{
  "strategy": "pipeline",
  "models": [{ "model": "provider/planner" }, { "model": "provider/executor" }],
  "config": {
    "agenticOrchestration": { "enabled": true, "maxToolRounds": 8 }
  }
}
```

L'exécuteur peut émettre plusieurs appels indépendants en une seule réponse. Les appels dépendants sont traités lors des tours ultérieurs de résultat de l'outil client, le planificateur examinant chaque résultat. `maxToolRounds` est par défaut `8` et accepte `1`–`32`; une fois atteint, le planificateur doit produire la meilleure réponse finale disponible. Les décisions du planificateur interne sont mises en mémoire tampon, tandis que la réponse sélectionnée destinée au client conserve la préférence de diffusion en continu d'origine.

### Lot persistant `round-robin` et extension de compte

Le round-robin est un processus groupé et non une requête par étape :

- `stickyRoundRobinLimit` (configuration combinée, puis `comboStickyRoundRobinLimit`, puis `settings.stickyRoundRobinLimit`, par défaut **3** ) conserve le même objectif pour autant de succès consécutifs avant la rotation. Définissez le remplacement du combo sur `1` pour une rotation à une demande. L'éditeur de combo affiche la valeur effective et de quelle couche elle provient.
- `connectionAwareExpansion` (config combo, puis paramètres, par défaut **FAUX** ) étend chaque étape au niveau du fournisseur en cibles par compte avant la rotation. Les stratégies du groupe B (prioritaire, pondérée, round-robin, aléatoire, p2c, la moins utilisée, optimisée en termes de coût, lkgp, fill-first, strictement aléatoire, optimisée pour le contexte, optimisée pour le cache, relais contextuel, fusion, pipeline) conservent une vue au niveau du fournisseur jusqu'à ce que cette option soit activée. L'éditeur combo expose hériter/on/off ; hériter utilise la valeur par défaut globale (off).
- Routage de localité d'invite-cache (`promptCacheAffinityEnabled`, par défaut **vrai** ) réorganise les connexions épinglées afin que les clés de cache correspondantes restent sur un seul compte. Il a la priorité sur la rotation circulaire et pondérée entre les étapes épinglées par compte. Désactivez-le sous Paramètres par défaut de → Combo si vous avez besoin d'une rotation stricte. Il n’y a pas de remplacement par combo.

Pour une rotation multi-comptes sur un seul modèle, préférez **une étape de compte dynamique** ( `connectionId` vide, pool entier) avec limite collante `1`, pas trois `connectionId` épinglés. Les étapes épinglées et l'affinité s'effondrent sur le même compte même pendant que le compteur RR avance.

## Stratégie de fusion

`fusion` est la seule stratégie qui ne sélectionne **pas** une cible unique. Elle distribue la requête
à **tous les modèles du panel en parallèle**, puis un **modèle juge** configurable synthétise
une réponse finale unique à partir de toutes les réponses du panel. Portée depuis le projet amont `decolua/9router`
(conception Fusion d’OpenRouter) ; implémentation dans `open-sse/services/fusion.ts`.

Fonctionnement :

0. **Contournement pour les requêtes avec outils** — une requête contenant un tableau `tools` non vide avec
   `tool_choice` qui n’est pas explicitement défini sur `"none"` ignore entièrement le panel : elle est acheminée directement vers
   un modèle unique (le juge configuré ou `panel[0]`), avec `tools`/`tool_choice`
   transmis sans modification. Les membres du panel n’ont pas accès aux outils, et la
   directive de synthèse du juge décourage l’émission d’appels d’outils ; les clients
   agentiques ou utilisant des appels d’outils obtiennent ainsi une véritable décision d’appel d’outil plutôt qu’un texte synthétisé (#6771).
1. **Distribution** (uniquement pour les requêtes sans outils) — la requête est envoyée simultanément à chaque
   modèle du panel, en imposant le mode non-streaming et en retirant les outils (le juge a besoin d’un
   texte complet pour effectuer la synthèse).
2. **Collecte avec délai de grâce après quorum** — dès que `minPanel` réponses sont reçues, un court
   délai de grâce démarre pour les retardataires, puis la fusion se poursuit avec les réponses collectées.
   Cela limite l’impact du modèle le plus lent sur le temps d’exécution total, dans la limite d’un délai d’expiration strict.
3. **Synthèse par le juge** — les réponses du panel sont anonymisées (`Source 1`, `Source 2`, … — afin que
   le juge évalue le fond plutôt que la marque du modèle) et transmises au juge, qui analyse
   le consensus, les contradictions, la couverture partielle, les perspectives uniques et les angles morts, puis
   rédige **une** réponse faisant autorité. L’appel au juge conserve le paramètre `stream` d’origine
   du client ainsi que les outils, afin que le streaming et l’utilisation ultérieure d’outils restent possibles.
4. **Dégradation contrôlée** — 0 réponse du panel → `503` ; exactement 1 réponse survivante → cette réponse
   est renvoyée directement (rien à fusionner) ; un panel constitué d’un seul modèle répond directement.

Un membre du panel peut également être une étape `combo-ref` (`{kind: "combo-ref", comboName: "..."}`) référençant
un autre combo — il est résolu comme **une seule voix opaque du panel** (une distribution récursive complète vers le
combo référencé, et non une distribution vers les propres cibles de ce combo), avec les mêmes protections contre
la profondeur excessive et les cycles que celles déjà utilisées par toutes les autres stratégies consommant des références `combo-ref` (#6764).

### Configuration

La configuration s’effectue dans le blob `config` du combo (aucune migration de schéma — elle réutilise la table
`combos` existante) :

| Champ                                    | Type     | Valeur par défaut       | Objectif                                                                                            |
| :--------------------------------------- | :------- | :---------------------- | :-------------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | premier modèle du panel | Modèle qui synthétise la réponse finale                                                             |
| `config.fusionTuning.minPanel`           | `number` | `2`                     | Nombre de réponses réussies requis avant le démarrage du délai de grâce (limité à `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`                  | Durée d’attente des retardataires une fois le quorum atteint                                        |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`                 | Limite absolue empêchant un modèle bloqué de retarder indéfiniment la requête                       |

Les valeurs par défaut sont définies dans `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Exemple

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Appelez-le ensuite comme n’importe quel autre combo : `{"model":"fusion-panel","messages":[...]}`.

## Fabrique virtuelle d’Auto-Combo

Le moteur Auto Combo ne nécessite pas de combos prédéfinis. À la place, `open-sse/services/autoCombo/virtualFactory.ts` construit les candidats à la volée :

1. Récupère `getProviderConnections({ isActive: true })` (toutes les connexions activées)
2. Filtre celles qui disposent d’identifiants valides (clé API ou jeton OAuth non expiré via `hasUsableOAuthToken()`)
3. Effectue un recoupement avec `getProviderRegistry()` pour connaître la disponibilité des modèles et leur tarification
4. Pour chaque tuple `(provider, model, connection)`, construit un `VirtualAutoComboCandidate`
5. Sélectionne `connection.defaultModel` (ou le premier modèle du registre) comme cible d’acheminement
6. Attribue un score à chaque candidat à l’aide de `scorePool()`, qui comporte 16 facteurs, et du jeu de pondérations de la variante
7. Renvoie l’`AutoComboConfig` en mémoire résultante à `handleComboChat()` — sans jamais la persister dans la base de données

Cela signifie que **l’ajout d’un nouveau fournisseur avec `auto/*` activé étend automatiquement le pool de candidats** — aucune modification manuelle des combos n’est nécessaire. Le combo virtuel est reconstruit à chaque requête, de sorte que les connexions nouvellement ajoutées ou redevenues opérationnelles sont immédiatement prises en compte.

## Autoréparation

- **Exclusion temporaire** : score < 0,2 → exclusion pendant 5 min (temporisation progressive, 30 min max.)
- **Prise en compte du disjoncteur** : OPEN → exclusion automatique ; HALF_OPEN → requêtes de test
- **Mode incident** : >50 % OPEN → désactivation de l’exploration, maximisation de la stabilité
- **Récupération après temporisation** : après une exclusion, la première requête est un « test » avec un délai d’expiration réduit

## Exploration par bandit

5 % des requêtes (valeur configurable) sont acheminées vers des fournisseurs aléatoires à des fins d’exploration. Cette fonctionnalité est désactivée en mode incident.

## API

Il n’existe **aucun endpoint dédié `POST /api/combos/auto`** — Auto-Combo s’utilise de deux façons :

1. **Sans configuration (recommandé) :** envoyez n’importe quelle requête de complétion de chat avec `model: "auto"` ou `model: "auto/<variant>"`. La fabrique virtuelle construit le combo pour chaque requête — aucune persistance ni aucun appel d’API supplémentaire ne sont nécessaires.

2. **Combo persistant avec `strategy: "auto"` :** créez un combo standard via `POST /api/combos` et définissez `strategy: "auto"` ainsi que `config.auto.weights` / `config.auto.candidatePool`. Le même moteur de notation est utilisé ; le combo est stocké dans `combos` et peut être réutilisé par son ID.

Pour la découverte, `GET /api/combos/auto` répertorie chaque variante avec son groupe de candidats résolu, ainsi que `context_length` / `max_output_tokens` — la valeur MAX parmi les fenêtres du groupe de candidats. Les clients (par exemple, le plugin opencode) doivent publier ces valeurs au lieu de `0` : un contexte nul désactive entièrement la compaction automatique d’opencode, ce qui laisse les sessions croître jusqu’à ce que la purge de l’historique par la passerelle détruise le contexte. Il est sûr de publier la valeur MAX, car le préfiltre de contexte d’Auto-Combo achemine les requêtes surdimensionnées vers les candidats disposant de grandes fenêtres.

```bash
# Utilisation sans configuration (aucune création de combo)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Combo automatique persistant via l’endpoint standard des combos
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Stratégies du routeur automatique

Les combos persistants avec `strategy: "auto"` peuvent définir `config.routerStrategy` (ou l’ancien
`config.auto.routerStrategy`) sur l’une des valeurs suivantes :

- `rules` — notation pondérée par défaut
- `score` — sélectionne le score pondéré configuré le plus élevé. En cas d’égalité parfaite, l’ordre
  configuré des candidats est conservé ; le paramètre `explorationRate` existant effectue un échantillonnage dans l’ensemble du groupe classé.
- `cost` / `eco` — fournisseur opérationnel le moins cher
- `latency` / `fast` — latence p95 la plus faible avec pénalité de fiabilité
- `sla-aware` / `sla` — privilégie les candidats qui respectent les SLO de latence p95, de taux d’erreur et, facultativement,
  de coût
- `lkgp` — donne la priorité au dernier fournisseur connu comme opérationnel
- `nadir` — demande à l’API de décision de [Nadir](https://getnadir.com) de déterminer le modèle du groupe dont
  l’invite a besoin ; optionnel, avec repli ouvert vers `rules`

### Stratégies du routeur en détail

Le moteur Auto-Combo expose 7 implémentations enfichables de **RouterStrategy** que
vous pouvez permuter via `config.routerStrategy` (ou l’ancien `config.auto.routerStrategy`).
Chaque stratégie sélectionne un fournisseur dans le groupe de candidats à partir d’un `RoutingContext`
(type de tâche, indications relatives aux outils/à la vision, estimation du nombre de jetons, politique de SLA facultative, fournisseur
facultatif connu comme ayant fonctionné en dernier).

#### 1. `rules` (par défaut) — notation pondérée selon 16 facteurs

Encapsule le moteur de notation existant. Élimine les candidats dont le disjoncteur est à l’état `OPEN`,
puis exécute `scorePool()` avec le type de tâche actuel et `getTaskFitness()`,
en sélectionnant le fournisseur ayant obtenu le meilleur score.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Quand l’utiliser** : par défaut. À utiliser lorsque vous recherchez un compromis équilibré entre tous les signaux.

**Alias** : `rules` (aucun autre alias)

---

#### 2. `cost` / `eco` — fournisseur opérationnel le moins cher

Trie le groupe de candidats par `costPer1MTokens` (ordre croissant) et sélectionne le moins cher.
Élimine d’abord les candidats à l’état `OPEN`.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Quand l’utiliser** : charges de travail sensibles aux coûts, traitement par lots ou tâches en arrière-plan.

**Alias** : `cost`, `eco`

---

#### 3. `latency` / `fast` — latence p95 la plus faible avec pénalité de fiabilité

Trie selon `p95LatencyMs + (errorRate * 1000)`. La pénalité liée au taux d’erreur garantit que
les fournisseurs peu fiables sont classés plus bas, même si leur latence nominale est faible.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Quand l’utiliser** : charges de travail sensibles à la latence, comme le chat en temps réel, la saisie semi-automatique ou
les assistants de programmation interactifs.

**Alias** : `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — respect des SLO de latence/d’erreur/de coût

Attribue un score à chaque candidat selon son degré de conformité avec la politique de SLO configurée :

| Facteur            | Poids | Formule                                           |
| ------------------ | ----- | ------------------------------------------------- |
| Score de latence   | 35%   | `threshold / max(value, ε)`                       |
| Score d'erreur     | 35%   | `threshold / max(value, ε)`                       |
| Score de santé     | 15%   | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN) |
| Score de coût      | 10%   | `threshold / max(value, ε)` ou inverse normalisé  |
| Score de stabilité | 5%    | écart-type de latence normalisé inversement       |

Lorsque `hardConstraints: true`, les candidats sont triés principalement selon leur **score de violation**
(l'ampleur du dépassement de chaque SLO), puis selon leur score composite. Sinon, seul
le score composite est utilisé.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... attribue un score à chaque candidat selon la politique : { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**Champs SLA** (définis dans la configuration combinée) :

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Quand l'utiliser** : charges de travail de production avec des budgets stricts de latence, de taux d'erreur ou de coût.

**Alias** : `sla-aware`, `sla`

---

#### 5. `lkgp` — dernier fournisseur connu comme opérationnel en premier

Essaie d'abord le **dernier fournisseur connu comme opérationnel** (s'il est défini), puis se rabat sur la
stratégie `rules`. Utile pour l'affinité de session : le même fournisseur traite
les requêtes de suivi d'une conversation.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Repli sur la stratégie rules
    return getStrategy("rules").select(pool, context);
  }
}
```

**Quand l'utiliser** : conversations à plusieurs tours pour lesquelles vous souhaitez que le même fournisseur traite
les requêtes de suivi (par exemple, pour la mise en cache, la continuité du contexte ou la cohérence tarifaire).

**Alias** : `lkgp` (aucun alias)

---

#### 6. `nadir` — choix du modèle adapté au prompt via Nadir

Chaque stratégie ci-dessus classe les candidats selon ses propres données de télémétrie ; aucune ne lit
la requête. `nadir` envoie le dernier tour de l'utilisateur ainsi que les identifiants de modèle du pool à
l'API de décision de [Nadir](https://getnadir.com) (`POST /v1/bucket`) et effectue le routage vers le modèle
sélectionné par Nadir dans ce menu (`simple` → le modèle adapté le moins cher, `complex` → le
modèle de pointe). La connexion servant ce modèle reste sélectionnée par `rules`, de sorte que le quota,
la santé et le coût continuent de déterminer quel compte utiliser.

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "nadir",
    "nadir": {
      "apiKey": "ndr_...",
      "baseUrl": "https://api.getnadir.com",
      "timeoutMs": 2000
    }
  }
}
```

`OMNIROUTE_NADIR_API_KEY` et `OMNIROUTE_NADIR_BASE_URL` servent de valeurs de repli d'environnement pour ces deux
chaînes. `baseUrl` n'est nécessaire que pour une instance Nadir auto-hébergée (un `/v1` final est accepté).
Les appels sans clé utilisent l'offre anonyme de Nadir, dont le débit est limité par adresse IP. Avec une clé
([créez-en une](https://app.getnadir.com/dashboard/api-keys)), chaque décision est
consignée dans votre tableau de bord Nadir. Configuration et vérification complètes :
[getnadir.com/docs/gateway-omniroute](https://getnadir.com/docs/gateway-omniroute/).

Données envoyées à l'extérieur : le texte du dernier message de l'utilisateur (les 16 000 premiers caractères), les
identifiants des modèles candidats et une étiquette de canal `source: "omniroute"`. Aucun prompt système, historique, outil ou
en-tête.

Le comportement en cas d'échec est ouvert par défaut : un dépassement de délai (2000 ms par défaut), une réponse non-2xx, un hôte
injoignable, une réponse mal formée ou une sélection ne figurant pas dans le pool entraîne l'utilisation de la décision de `rules`,
et la raison est préfixée par `NadirStrategy: fallback (…)`. Après un appel ayant échoué, la
stratégie n'effectue aucune requête réseau pendant 30 s ; ainsi, une panne n'entraîne qu'un dépassement de délai toutes les 30 s plutôt qu'un
par requête. Les événements de routage indiquent `strategy: "nadir"` uniquement lorsque Nadir a réellement effectué
le choix.

**Quand l'utiliser** : trafic de difficulté variable sur un pool couvrant plusieurs niveaux de modèles (un petit, un intermédiaire
et un modèle de pointe), lorsque vous souhaitez réduire le coût lié à l'utilisation systématique du modèle de pointe.

**Alias** : `nadir` (aucun alias)

---

### Stratégies de routage personnalisées

Vous pouvez enregistrer votre propre implémentation de `RouterStrategy` via l'API publique :

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Votre logique de routage ici
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Utilisez-la ensuite :

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Guide de sélection de la stratégie de routage

| Cas d’utilisation            | Stratégie   | Raison                                          |
| ---------------------------- | ----------- | ----------------------------------------------- |
| Charge de travail équilibrée | `rules`     | Par défaut — prend en compte tous les facteurs  |
| Réduire les coûts            | `cost`      | Choisit toujours l’option la moins chère        |
| Réduire la latence           | `latency`   | Choisit le fournisseur fiable le plus rapide    |
| SLO stricts                  | `sla-aware` | Filtre selon les seuils de p95/d’erreur/de coût |
| Chat multitour               | `lkgp`      | Affinité de session                             |
| Difficulté variable          | `nadir`     | Choisit le niveau de modèle pour chaque prompt  |

Champs tenant compte des SLA :

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Adéquation aux tâches

Plus de 30 modèles évalués sur 6 types de tâches (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Prend en charge les motifs génériques (par ex., `*-coder` → score élevé en programmation).

## Récapitulatif des variantes Auto

En incluant `auto` seul (valeur par défaut) ainsi que les 6 valeurs `AutoVariant` déclarées dans `autoPrefix.ts`, il existe **7 ID de modèle invocables** :

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` lui-même énumère 6 valeurs ; la 7e option correspond à « aucune variante » — `auto` seul — gérée par `parseAutoPrefix()` sous la forme `variant: undefined`.)

## Comment les niveaux s’intègrent à Auto-Combo

La fonction de notation à 16 facteurs (`open-sse/services/autoCombo/scoring.ts`) traite l’appartenance à un niveau comme deux signaux : `tierPriority` (0.0476) et `tierAffinity` (0.0476). Consultez le [tableau canonique des facteurs de notation](#how-it-works-persisted-auto-combos) ci-dessus pour voir l’ensemble complet de `DEFAULT_WEIGHTS` — les substitutions propres à chaque pack (ship-fast/cost-saver/quality-first/
offline-friendly) sont répertoriées dans le tableau « Profils de pondération par pack ».

Le niveau seul ne force **pas** la priorité du niveau 1 : si la latence du niveau 1 est mauvaise ou si le rapport coût-qualité n’est pas optimal, le niveau 2 l’emporte. Pour imposer l’ordre des niveaux, utilisez la stratégie de combinaison `priority` et classez les fournisseurs par niveau.

Pour favoriser fortement le niveau 1 (abonnement), augmentez le poids de `tierPriority` :

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Consultez [`docs/guides/TIERS.md`](../guides/TIERS.md) pour connaître les définitions des niveaux et la classification des fournisseurs.

## Tests et couverture

### Matrice déterministe des décisions de routage (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` vérifie de bout en bout la **décision** de routage des 19 stratégies publiques à travers le véritable pipeline de combinaison, avec un service en amont simulé. La couverture comprend :

- Les 19 stratégies `ROUTING_STRATEGY_VALUES` (ordered, weighted, cost, context, fusion, …).
- `quota-share` (interne) de bout en bout : équité DRR + dépriorisation en cas de saturation via le véritable point d’intégration `selectQuotaShareTarget` (`registerQuotaFetcher` / `setLKGP` /
  `__setHeadroomSaturationFetcherForTests`).
- La couverture du transfert universel de `context-relay` pour chaque nombre de cibles.

Cette suite s’exécute dans la CI (tâche `test:integration`) avec `--test-concurrency=1` et `--test-force-exit` afin d’être déterministe et de ne nécessiter aucun identifiant réel.

### Tests rapides réels soumis à condition (PAS dans la CI — fournisseurs réels)

| Commande                               | Fonctionnement                                                                                                        |
| :------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Routage réel dans le processus avec `RUN_COMBO_LIVE=1` ; capture un instantané d’une base de données OmniRoute active |
| `npm run test:combo:live:vps`          | Appels HTTP vers un serveur OmniRoute actif (définissez `COMBO_LIVE_BASE_URL`)                                        |
| `npm run test:combo:live:vps:failover` | Même chose, avec des scénarios de basculement délibérés                                                               |

Ces tests rapides utilisent le véritable chemin de communication (combinaison → fournisseur → complétion). Ils sont intentionnellement exclus de la CI, car ils nécessitent des identifiants réels et un accès VPS.

---

## Fichiers

| Fichier                                                   | Rôle                                                                                                             |
| :-------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | Fonction de notation à 16 facteurs, `DEFAULT_WEIGHTS`, normalisation du pool                                     |
| `open-sse/services/autoCombo/taskFitness.ts`              | Table de correspondance de l’adéquation modèle × tâche                                                           |
| `open-sse/services/autoCombo/engine.ts`                   | Logique de sélection, bandit, plafond budgétaire                                                                 |
| `open-sse/services/autoCombo/selfHealing.ts`              | Exclusion, sondes, mode incident                                                                                 |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 profils de pondération (ship-fast, cost-saver, quality-first, offline-friendly, reliability-first, chaos-mode) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Analyseur du préfixe `auto/` + 6 variantes                                                                       |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Construit une `AutoComboConfig` en mémoire à partir des connexions actives                                       |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Point d’entrée de test pour simuler le registre des fournisseurs                                                 |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (20 stratégies)                                                                        |
| `src/sse/handlers/chat.ts`                                | Intégration : court-circuit du préfixe auto                                                                      |
