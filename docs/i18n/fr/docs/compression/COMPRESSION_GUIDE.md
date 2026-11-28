# 🗜️ Prompt Compression Guide — OmniRoute (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Économisez automatiquement 15 à 95 % sur le contexte éligible. Pour un aperçu rapide, consultez la [section Compression du README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Présentation

OmniRoute implémente un pipeline modulaire de compression des prompts qui s’exécute **de manière proactive** avant que les requêtes n’atteignent les fournisseurs en amont. Vos économies de tokens sont donc réalisées de manière transparente, sans qu’aucune modification de votre flux de travail ne soit nécessaire.

```
Requête du client
  → Sélecteur de stratégie de compression
    → Remplacement défini par un combo ? → Utiliser le paramètre du combo
    → Seuil de déclenchement automatique atteint ? → Utiliser le mode automatique
    → Mode par défaut ? → Utiliser le paramètre global
    → Désactivé ? → Ignorer la compression
  → Mode de compression sélectionné
    → Désactivé : aucune compression
    → Léger : nettoyage sûr des espaces et de la mise en forme (~15 %)
    → Standard : suppression des éléments superflus dans un style télégraphique (~30 %)
    → Agressif : vieillissement de l’historique + résumé (~50 %)
    → Ultra : élagage heuristique + allègement des blocs de code (~75 %)
    → RTK : filtrage des sorties de terminal et d’outils tenant compte des commandes (plage en amont de 60 à 90 %)
    → Empilé : pipeline multi-moteur ordonné, généralement RTK puis Caveman (plage éligible de 78 à 95 %)
  → Requête compressée → Fournisseur
```

---

## Modes de compression

### Désactivé

Aucune compression appliquée. Tous les messages sont transmis sans modification.

### Mode Lite (~15 % d'économies, <1 ms de latence)

Le mode le plus sûr — nettoyage du formatage. La troncature des résultats d'outils est destructive. Par conséquent, le chemin par défaut
(sans `allow-lossy`, `engine:lite` ni activation explicite d'une combinaison nommée) exécute le mode Lite avec
`compressToolResults: false` : les résultats d'outils précédents sont transmis au fournisseur sans modification.

| Technique                | Description                                                                                                                       |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Fusionner les lignes vierges consécutives et les espaces de fin                                                                   |
| `dedupSystemPrompt`      | Supprimer les messages système en double                                                                                          |
| `compressToolResults`    | Tronquer les résultats d'outils précédents à la limite Lite (destructif : uniquement avec une activation explicite de la requête) |
| `removeRedundantContent` | Supprimer les instructions répétées                                                                                               |
| `replaceImageUrls`       | Raccourcir les URI de données d'image en base64                                                                                   |

**Idéal pour :** une utilisation permanente et les flux de travail critiques pour la sécurité.

### Mode Standard (~30 % d'économies)

Inspiré de [Caveman](https://github.com/JuliusBrussee/caveman) — supprime les mots de remplissage et les formulations verbeuses tout en préservant le sens :

- Supprime les mots de remplissage (« please », « I think », « basically », « actually »)
- Condense les formulations verbeuses (« in order to » → « to », « as a result of » → « because »)
- Supprime les précautions polies (« Would you mind... », « If you could possibly... »)
- Plus de 30 règles d'expressions régulières optimisées pour les requêtes de programmation

**Idéal pour :** les flux de travail de programmation quotidiens et les équipes soucieuses des coûts.

### Mode Aggressive (~50 % d'économies)

Gestion intelligente de l'historique pour les sessions longues :

- **Vieillissement des messages** — les messages plus anciens sont progressivement compressés
- **Compression des résultats d'outils** — les sorties d'outils longues sont tronquées ou élidées (premières/dernières lignes,
  filtrage par lignes correspondantes, compactage des clés JSON)
- **Garde-fous d'intégrité structurelle** — garantit la cohérence des paires `tool_use` + `tool_result`
- **Prise en compte de la fenêtre de contexte** — respecte les limites de jetons propres à chaque modèle

**Idéal pour :** les sessions de débogage prolongées et les bases de code volumineuses.

### Mode Ultra (~75 % d'économies)

Compression maximale pour les scénarios où chaque jeton compte :

- **Élagage heuristique** — élagage des jetons de prose basé sur un score
- **Préservation de la structure** — les blocs de code délimités, le code inline, les URL et les identifiants sont
  marqués comme réservés puis réinsérés textuellement, sans jamais être élagués
- **Niveau SLM facultatif** — un petit modèle local peut affiner l'élagage lorsqu'il est configuré
- Indépendant du mode Aggressive : il n'exécute ni le vieillissement des messages, ni la compression des résultats d'outils,
  ni le résumeur de secours (seul un échec du niveau SLM peut rediriger un passage de secours vers le mode Aggressive)

**Idéal pour :** les situations où vous atteignez régulièrement les limites de contexte.

### Mode RTK (plage amont de 60 à 90 %)

Le mode RTK est optimisé pour les sorties d'outils verbeuses qui apparaissent dans les sessions d'agents de programmation :

- Détecte les classes de commandes et de sorties telles que `git status`, `git diff`, `git log`, les lanceurs de tests,
  les compilations TypeScript/Vite/Webpack, ESLint/Biome/Prettier, les audits/installations npm, les journaux Docker, les sorties d'infrastructure
  et les sorties shell génériques
- Applique les packs de filtres JSON de `open-sse/services/compression/engines/rtk/filters/`
- Importe les filtres du schéma TOML RTK v1 depuis les fichiers `filters.toml` du projet ou globaux, avec une validation
  par tests intégrés et un contrôle de confiance pour les fichiers du projet
- Fournit 56 filtres intégrés avec des exemples de vérification intégrés
- Supprime les séquences de contrôle ANSI, les barres de progression, les lignes répétées et le bruit sans intérêt opérationnel
- Préserve les échecs, erreurs, avertissements, fichiers modifiés, récapitulatifs et la fin des sorties longues
- Prend en charge les filtres du projet contrôlés par confiance, les filtres globaux et la récupération facultative des sorties brutes expurgées

**Idéal pour :** les sessions d'agents utilisant des transcriptions de shell, de compilation, de tests, de git, de grep et de sorties de fichiers.

### Mode Stacked (plage éligible de 78 à 95 %)

Le mode Stacked exécute plusieurs moteurs de compression dans un ordre déterministe. Le pipeline par défaut est :

```txt
RTK -> Caveman
```

Cet ordre réduit d'abord les sorties de terminal et d'outils, puis applique la condensation sémantique de Caveman
au reste de la requête en langage naturel. Les pipelines Stacked peuvent être configurés globalement ou via des combinaisons
de compression affectées à des combinaisons de routage.

**Idéal pour :** les contextes mixtes comprenant de volumineux journaux d'outils ainsi que des instructions humaines ou des résumés d'assistant.

## Calcul des économies en amont

OmniRoute documente les économies liées à la compression à partir de deux sources : les benchmarks des projets en amont et
la propre composition de moteurs d’OmniRoute.

| Source  | Valeur du README en amont utilisée ici                                                                                                                       |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Caveman | `~75%` de tokens de sortie en moins, `65%` d’économies moyennes sur les sorties du benchmark, plage de `22-87%` et outil de compression des entrées à `~46%` |
| RTK     | `60-90%` d’économies sur les sorties de commandes ; session d’exemple de `~118,000 -> ~23,900` tokens, soit `79.7%` économisés (`~80%`)                      |

Pour les charges utiles d’outils/de contexte qui se chevauchent, la combinaison OmniRoute par défaut empile les moteurs :

```txt
RTK -> Caveman
```

Les économies combinées sont multiplicatives et non additives :

```txt
combinées = 1 - (1 - économies RTK) * (1 - économies Caveman sur les entrées)
moyenne   = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
plage     = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Cette valeur de `78-95%` s’applique lorsque RTK et Caveman peuvent tous deux réduire la même charge utile d’entrée/de contexte.
Le mode de sortie des réponses Caveman est distinct : lorsqu’il est activé, utilisez les économies propres à Caveman sur les sorties (`65%`
en moyenne, chiffre mis en avant de `~75%`, plage de `22-87%`). Les économies totales sur la facturation dépendent de votre répartition entre prompts et sorties.

### Ce que signifie réellement « éligible »

La plage mise en avant de 15-95% est réelle, mais elle ne s’applique qu’au contenu **redondant ou verbeux** — lignes
d’erreur répétées, journal de build qui répète sans cesse le même avertissement, sortie `grep`/de lecture de fichier surdimensionnée. Cela ne
signifie **pas** que chaque requête permet d’économiser autant.

Vérifié empiriquement (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`) : une
exécution `stacked` (RTK + Caveman) sur un bloc `tool_result` au format Anthropic contenant 300 lignes
d’erreur identiques a produit **95.93% d’économies de tokens / 96.26% d’économies de caractères** — exactement dans la plage annoncée.
Mais le même pipeline exécuté sur une sortie d’outil normale et non redondante (une liste propre de correspondances `grep`,
une courte lecture de fichier, du texte conversationnel ordinaire) produit à juste titre des **économies proches de zéro**, car
il n’y a rien de répétitif à supprimer et `validateCompression()` (`validation.ts`) refuse de transmettre une
réécriture qui supprimerait ou modifierait des blocs de code, des URL, des titres, des versions ou des identifiants de constantes EN MAJUSCULES.

Il s’agit d’un comportement attendu et sûr, pas d’un bug : une session de codage qui consiste principalement à lire/parcourir avec grep des fichiers propres
constatera des économies totales modestes, même lorsque la compression est entièrement activée, tandis qu’une session confrontée à une boucle en échec
ou à un linter très bavard bénéficiera de la plage complète de 78-95% sur ce trafic. N’utilisez pas le faible
pourcentage d’économies agrégées d’une seule session comme preuve que la compression est mal configurée — vérifiez d’abord si la
sortie d’outil sous-jacente était réellement redondante.

---

## Visualisation des économies de tokens

```
Sans compression : 47K tokens envoyés au LLM
Avec Lite :         40K tokens envoyés          (15% économisés — sûr, toujours actif)
Avec Standard :     33K tokens envoyés          (30% économisés — règles caveman-speak)
Avec Aggressive :   24K tokens envoyés          (50% économisés — vieillissement + résumé)
Avec Ultra :        12K tokens envoyés          (75% économisés — élagage heuristique)
Avec RTK :          19K-5K tokens envoyés       (60-90% économisés sur les sorties de commandes/d’outils)
Avec Stacked :      10K-2.5K tokens envoyés     (plage éligible RTK+Caveman de 78-95%)
```

---

## Configuration

### Tableau de bord

Accédez à `Dashboard → Context & Cache` :

- **Caveman** — sélection du mode, packs linguistiques, aperçu et valeurs par défaut globales
- **RTK** — aperçu des filtres de commandes, paramètres de sécurité RTK et catalogue de filtres
- **Compression Combos** — pipelines de moteurs nommés attribués aux combos de routage
- **Auto-Trigger Threshold** — active automatiquement la compression lorsque le nombre de tokens dépasse le seuil

### Remplacement par combo

Dans `Dashboard → Context & Cache → Compression Combos`, attribuez un combo de compression à un
combo de routage :

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Cela vous permet d'utiliser une compression empilée avec les fournisseurs gratuits/de codage tout en
conservant le mode lite pour les abonnements payants.

Cette attribution de **remplacement par combo** est un contrôle différent du remplacement du
**mode de compression du combo de routage** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — le schéma du champ accepte également
`rtk`, `stacked` et `omniglyph`) — ce remplacement ne sélectionne pas de pipeline de
compression nommé ; il définit simplement le champ `compressionMode` consulté par
`resolveCompressionPlan`. Il peut être défini soit sur la carte du combo (`Dashboard → Combos`), soit, depuis
#6760, par combo de routage dans la liste « Assign to routing » de
`Dashboard → Context & Cache → Compression Combos`, juste à côté de la case d'attribution du pipeline
documentée ci-dessus. Les deux interfaces enregistrent les données via le même endpoint
`PUT /api/combos/{id}`.

### Remplacement par requête

Envoyez l'en-tête de requête `x-omniroute-compression` pour remplacer le plan de compression d'une
seule requête. Il a la priorité la plus élevée — il prévaut sur le remplacement du combo de routage, le profil actif,
le déclenchement automatique et la valeur Default du panneau. Les valeurs inconnues sont ignorées (la requête n'est jamais rejetée) et
le commutateur maître global continue de tout contrôler : lorsque la compression est désactivée globalement, l'en-tête ne peut pas
l'activer. Valeurs :

| Value         | Effect                                                                                                                           |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Aucune compression pour cette requête.                                                                                           |
| `default`     | Le profil Default dérivé du panneau (ignore le profil actif). Les moteurs avec perte restent désactivés.                         |
| `safe`        | Identique à l'omission de l'en-tête.                                                                                             |
| `allow-lossy` | Conserve le plan opérateur de cette requête, y compris les résumés, les filtres de pertinence et les réécritures de style.       |
| `engine:<id>` | Un seul moteur lorsqu'il est activé, par exemple `engine:rtk`. Il s'agit de l'activation explicite de ce moteur pour la requête. |
| `<combo>`     | Un combo nommé, recherché d'abord par nom (sans distinction entre majuscules et minuscules), puis par identifiant.               |

Sans `allow-lossy`, `engine:<id>` ou un combo nommé, les moteurs avec perte ne sont pas appliqués. Lorsqu'une valeur
Default, un déclenchement automatique ou un remplacement de routage avec perte est rétrogradé, OmniRoute conserve les étapes
sans perte reconnues du pipeline empilé configuré, dans l'ordre configuré. Il revient à
`session-dedup → lite` uniquement lorsqu'aucune étape sans perte configurée ne subsiste.

L'aperçu **Effective pipeline** du panneau Settings affiche le plan ordinaire au repos. Lorsqu'un
déclenchement automatique peut s'exécuter, le même aperçu affiche également son pipeline effectif conditionnel afin que le panneau et la résolution
du runtime sans en-tête restent alignés.

Le plan appliqué est renvoyé dans l'en-tête de réponse
`X-OmniRoute-Compression: <mode>; source=<source>`, où `<source>` correspond à l'une des valeurs suivantes :
`request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` ou `off`.

### API

```bash
# Obtenir les paramètres de compression
curl http://localhost:20128/api/settings/compression

# Mettre à jour les paramètres de compression
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Prévisualiser une charge utile RTK/stacked spécifique
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Répertorier les packs de filtres RTK
curl http://localhost:20128/api/context/rtk/filters

# Tester RTK directement avec des métadonnées de commande facultatives
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Ce qui est protégé

Le moteur de compression **préserve toujours :**

- ✅ Les blocs de code (délimités et en ligne)
- ✅ Les URL et les chemins de fichiers
- ✅ Les structures JSON et les données structurées
- ✅ Les identifiants et les jetons techniques protégés
- ✅ Les expressions mathématiques
- ✅ Les définitions d'appels d'outils/de fonctions
- ✅ Les prompts système (en mode lite)

La récupération de la sortie brute RTK masque les clés d'API courantes, les jetons bearer, les jetons Slack, les clés d'accès AWS,
les mots de passe, les jetons et les secrets avant toute persistance.

---

## Statistiques de compression

Chaque requête compressée inclut des statistiques dans les journaux du serveur :

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Feuille de route des phases

| Phase    | Modes                                                                                                                                                                     | Statut   |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| Phase 1  | Désactivé, Lite                                                                                                                                                           | ✅ Livré |
| Phase 2  | Standard, Agressif, Ultra                                                                                                                                                 | ✅ Livré |
| Phase 3  | RTK, Empilé, Combinaisons de compression                                                                                                                                  | ✅ Livré |
| Phase 4  | Styles de sortie, Ultra de niveau SLM, infrastructure d'évaluation                                                                                                        | ✅ Livré |
| Phase 4C | Budget de contexte adaptatif (« cadran ») — moteur de calcul + API (`contextBudget` sur `PUT /api/settings/compression`) + contrôles de mode/politique du tableau de bord | ✅ Livré |

---

## Remerciements

Les règles de compression du mode Standard sont inspirées de **[Caveman](https://github.com/JuliusBrussee/caveman)** par **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — le projet viral « pourquoi utiliser beaucoup de jetons quand peu de jetons suffisent ». Caveman annonce `~75%` de jetons de sortie en moins, une économie moyenne de `65%` sur les sorties de référence, une plage d'économies en sortie de `22-87%` et un outil de compression des entrées à `~46%`.

Le mode RTK est inspiré de **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** par **[RTK AI](https://github.com/rtk-ai)** — le projet haute performance de compression des sorties de commandes pour le terminal, la compilation, les tests, git et le filtrage des sorties d'outils. RTK annonce des économies de `60-90%`, avec une session d'exemple dans son README affichant `~80%` d'économies.

---

## Systèmes de compression avancés

Au-delà des 7 modes décrits ci-dessus (la source accepte également les modes `codex-responses` et `omniglyph`, que ce guide ne couvre pas), les sections ci-dessous couvrent les fonctionnalités qui fonctionnent à l'intérieur ou à côté de ces modes : La compression des résultats de l'outil et le vieillissement progressif sont les étapes 1 et 2 du moteur agressif (mode agressif et une étape `aggressive` d'un pipeline empilé), le pipeline empilé est le fonctionnement du mode empilé, la compression basée sur le cache rétrograde `aggressive` et `ultra` en `standard` pour la mise en cache. fournisseurs lorsque la compression est activée, et le mode de sortie et les styles de sortie Caveman sont des instructions d'invite système opt-in, désactivées par défaut, qui façonnent la sortie du modèle au lieu de compresser la demande.

### Compression prenant en compte le cache

Certains fournisseurs (comme Anthropic avec mise en cache rapide) prennent en charge** mise en cache rapide** , ce qui leur permet de mettre en cache des parties de l'invite afin de réduire les coûts et la latence. Lorsque la mise en cache est activée, une compression agressive peut en fait** blesser** performances car il modifie les jetons mis en cache, invalidant le cache.

Le module `cachingAware.ts` résout ce problème en** détection du contexte de mise en cache** et** ajuster la stratégie de compression** par conséquent.

#### Comment ça marche

1. **Détecter le contexte de mise en cache** — analyse le corps de la requête à la recherche de marqueurs `cache_control`
2. **Identifier les fournisseurs de mise en cache** — Vérifie si le fournisseur cible prend en charge la mise en cache
3. **Ajuster la stratégie** — rétrograde `aggressive`/`ultra` en `standard` pour les fournisseurs de mise en cache
4. **Ignorer l'invite système** Les invites du système — sont généralement mises en cache, alors ne les compressez pas

L'assistant de stratégie renvoie également un indicateur `deterministicOnly`, mais le générateur de plan consomme uniquement la stratégie — rien en aval ne lit l'indicateur aujourd'hui.

#### Exemple de code

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Quand utiliser

La compression prenant en compte le cache est** toujours allumé** — aucune configuration nécessaire. Il démarre chaque fois que la compression est activée et que le fournisseur cible prend en charge la mise en cache rapide (Anthropic, OpenAI, etc.) ; les marqueurs `cache_control` explicites ne sont pas nécessaires — un fournisseur de mise en cache déclenche à lui seul la rétrogradation, et les marqueurs seuls ne le font jamais (la détection des marqueurs alimente la télémétrie du cache, pas la décision stratégique).

OpenRouter compte comme fournisseur de mise en cache uniquement pour les modèles `anthropic/*` : les requêtes de code Claude conservent leurs points d'arrêt `cache_control` (4 au maximum) et la garde protège le préfixe, tandis que toutes les autres familles OpenRouter (`openai/`, `google/`, `qwen/`, …) restent supprimées et non gardées.

### Vieillissement progressif

Les longues conversations accumulent de nombreuses tours de message, mais les tours plus anciens deviennent moins pertinents. Le module `progressiveAging.ts`** dégrade les messages en fonction de la distance parcourue** (distance mesurée à partir de la fin de la conversation). Avec les valeurs par défaut expédiées (`verbatim: 2, light: 2, moderate: 3`) :

- **2 derniers tours (distance ≤ 2)** : Conservé textuellement
- **Distance 3** : Compression Caveman (élimination du remplissage)
- **Distance 4 +** : Messages de l'assistant résumés ; messages utilisateur réduits à leur première ligne, limités à 120 caractères ; les autres rôles restent intacts. Les invites du système, les messages déjà anciens et le dernier message utilisateur sont toujours conservés textuellement, quelle que soit la distance. Rien n'est carrément supprimé et la bande `light` est inaccessible avec les valeurs par défaut fournies (`light` égal `verbatim`).

#### Exemple de code

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // last 3 turns: verbatim
  light: 8, // distance <= 8: lite compression
  moderate: 20, // distance <= 20: caveman compression
  fullSummary: 5, // required by the type, not read by the banding code
  // distance > 20: summarized (assistant) / first line kept (user)
});

// saved = number of tokens saved
```

#### Quand utiliser

Le vieillissement progressif est** toujours allumé** pour le mode `aggressive` — il s'agit de l'étape 2 de `compressAggressive()`. Le mode Ultra ne l'exécute pas. Il est particulièrement efficace pour :

- Sessions de codage de longue durée
- Conversations sur plusieurs jours
- Workflows agents avec de nombreux appels d'outils

### Mode de sortie de l'homme des cavernes

Le mode de sortie Caveman ajoute** instructions d'invite du système** qui demandent au modèle lui-même une sortie laconique — le niveau `lite` demande des réponses concises qui conservent des phrases complètes, `full` lui demande de "répondre de manière laconique comme un homme des cavernes intelligent", et `ultra` demande une sortie télégraphique ; les instructions ne font que demander, ils ne peuvent pas le garantir. Les requêtes les reçoivent via `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) : `open-sse/handlers/chatCore.ts` résout d'abord la sélection avec le shim de rétro-compatibilité (`resolveOutputStyleSelection()` dans `open-sse/services/compression/outputStyles/backCompat.ts`), qui, bien que `outputStyles` soit vide, mappe un `cavemanOutputMode` activé au style de sortie `terse-prose` sur `cavemanOutputMode.intensity` (voir Back-compat ci-dessous) ; une sélection `outputStyles` non vide est utilisée telle quelle, et `cavemanOutputMode.enabled` et `intensity` n'ont alors aucun effet, tandis que sa bascule `autoClarity` s'applique toujours. `outputMode.ts` contient les textes d'instructions (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), le contournement de contenu et l'aide au placement utilisé par l'injection ; son propre injecteur `applyCavemanOutputMode()` n'a pas d'appelant de production.

#### Comment ça marche

Ce mode ne compresse pas l'entrée. Il ajoute un bloc d'instructions à l'invite système (voir Comment fonctionne l'injection ci-dessous), et tout mode de compression d'entrée sélectionné pour la requête s'exécute toujours par la suite, sur le corps qui porte désormais le bloc. Avant la clause de limites partagées par laquelle se termine chaque niveau, le niveau anglais `full` se lit comme suit :

> "Répondez de manière laconique comme un homme des cavernes intelligent. Supprimez les articles (a/an/the), les remplissages (just/really/basically/actually/simply), les plaisanteries, la couverture. Fragments OK. Synonymes courts (gros, pas détaillés, correctifs non implémentés). Conservez toute la substance technique, le code, les erreurs, URLs, les identifiants exacts. "

Cela fonctionne particulièrement bien pour :

- Génération de code (sortie terser = moins de jetons)
- Questions et réponses rapides (pas besoin d'explications élaborées)
- Traitement par lots (maximiser le débit)

#### Quand utiliser

Le mode de sortie Caveman est** s'inscrire** . Avec la compression activée (`enabled: true`, la bascule principale sur la page Paramètres de compression), activez-la avec `cavemanOutputMode.enabled`; `intensity` choisit `lite`, `full` ou `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Un combo de compression** Mode de sortie** toggle (`outputMode`, level in `outputModeIntensity`) définit le même commutateur pour les requêtes auxquelles le combo s'applique, et l'outil `omniroute_set_compression_engine` MCP l'écrit via son argument booléen `outputMode`. Une sélection `outputStyles` non vide est prioritaire sur ce commutateur. Dans le tableau de bord, en activant le** Prose laconique** le style de sortie injecte le même bloc (voir Styles de sortie ci-dessous).

### Styles de sortie (catalogue)

Le mode de sortie Caveman ci-dessus est le** chemin à style unique hérité** . La phase 4 l'a généralisé dans un catalogue de styles de sortie composables : `OUTPUT_STYLE_CATALOG` dans `open-sse/services/compression/outputStyles/catalog.ts`. Chaque style est une instruction système qui demande au modèle lui-même une sortie moins chère ; les styles peuvent être activés ensemble et sont injectés dans l’ordre du catalogue.

| Style                                          | `id`            | Ce que ça fait                                                                                                                                                                                                                                                                        | Langues d'instruction                         |
| ---------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Prose laconique                                | `terse-prose`   | Lâchez filler/articles/hedging; garder la substance technique exacte. Même texte que le mode de sortie hérité de l'homme des cavernes (référencé, non retapé).                                                                                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Moins de code                                  | `less-code`     | échelle YAGNI : plus petit changement fonctionnel, pas d'abstractions non demandées.                                                                                                                                                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Queue de cheval (développeur senior paresseux) | `ponytail`      | "Le meilleur code est le code jamais écrit": réutilisation de la réécriture >, cause première du symptôme >, différence de travail la plus courte.                                                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| J'ai ADHD (l'action d'abord)                   | `i-have-adhd`   | Action d'abord (command/path/snippet avant la prose), étapes délimitées numérotées, ONE étape suivante concrète, pas preamble/recap/closers. Adapté de [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Filtre anti-chute UI                           | `antislop-ui`   | Chaque technique visuelle doit passer un test de finalité (hiérarchie, identité, lisibilité) ; pas gradients/glass/glow par défaut, palette plafonnée, pas de mise en page de modèle. Les deux styles antislop ajoutent une limite sans contrôle mort / sans revendication fabriquée. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Copie antislop et filtre humain                | `antislop-copy` | Copie spécifique (pas de tiret, CTAs générique, mots à la mode, fermetures de chatbot, faits inventés) plus règles de personnes : contraste WCAG AA, mise au point visible, portée du clavier, états empty/loading/error, redistribution mobile.                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| CJK laconique (文言)                           | `terse-cjk`     | Réponse `full`/`ultra` en chinois classique (文言) ; `lite` ne demande que de brèves réponses sans mots fonctionnels, plaisanteries ou embellissements.                                                                                                                               | zh (locale-gated, voir ci-dessous)            |

Chaque style comprend trois niveaux d'intensité — `lite`, `full`, `ultra` — et chaque niveau se termine par la clause de limites partagées (`SHARED_BOUNDARIES` dans `outputMode.ts`), qui conserve les blocs de code, les chemins de fichiers, les commandes, les erreurs et URLs exacts. Les textes de niveau `terse-prose` et `terse-cjk` ajoutent des identifiants à cette liste.

`terse-cjk` est lié aux paramètres régionaux de `zh` à deux endroits. La page Paramètres de compression répertorie sa ligne uniquement lorsque la langue UI du tableau de bord est le chinois (`zh-CN` ou `zh-TW`), et `applyOutputStyles()` l'injecte uniquement lorsque la langue résolue de la demande (voir Sélection de la langue ci-dessous) est `zh`. Masquer la ligne n'efface pas une sélection `terse-cjk` enregistrée : les paramètres API acceptent n'importe quel identifiant de style et l'enregistrement d'autres styles sur la page le conserve. Au moment de la demande, la vérification de la langue `applyOutputStyles()` est la seule porte d'accès aux paramètres régionaux.

#### Comment fonctionne l'injection

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) résout la sélection par rapport au catalogue (les identifiants inconnus et les styles incompatibles avec les paramètres régionaux sont supprimés, jamais d'erreur ; une sélection qui ne résout aucun style laisse le corps inchangé, ignoré comme `no_styles`), concatène les instructions sélectionnées dans l'ordre du catalogue, ajoute la clause de limites** une fois** (plus la clause de sécurité, `SAFETY_BOUNDARIES` ou sa traduction, lorsque `less-code` ou `ponytail` est sélectionné), et démarre le bloc avec un seul marqueur d'idempotence (`[OmniRoute Output Styles]`), donc réappliquer est une non-opération. Lorsque la langue résolue (voir Sélection de la langue ci-dessous) a une traduction, l'instruction localisée est injectée à la place de l'anglais.

Sur un corps avec un tableau `messages` non vide, la vérification d'idempotence s'exécute avant le contournement du contenu : lorsque le marqueur `[OmniRoute Output Styles]` est déjà dans le champ `system` de niveau supérieur (une chaîne ou un tableau de blocs de contenu) ou dans un message système avec un contenu de chaîne, le corps reste inchangé en tant que `already_applied` et aucune vérification de mot clé n'est exécutée. Sinon un contournement de contenu (`shouldBypassCavemanOutputMode()` dans `open-sse/services/compression/outputMode.ts`) vérifie le texte des trois derniers messages, quel que soit leur rôle, et saute les styles pour tout le tour lorsque ce texte correspond à ses mots-clés de sécurité, d'action irréversible ou de clarification, ou à une séquence sensible à l'ordre : `first`, `then`, `after that`, `before`, `rollback` ou `backup` suivi dans les 240 caractères de `delete`, `drop`, `migrate`, `deploy` ou `release`. Le bypass fonctionne tandis que le** Contournement de la clarté automatique** la bascule (`cavemanOutputMode.autoClarity`, activée par défaut) est activée ; la désactivation de la bascule ignore la vérification des mots clés.

Lorsque le bypass laisse passer le tour, `placeSystemInstruction()` (même fichier), qui ne crée jamais de nouveau `messages[0]`, place le bloc dans le premier de ceux-ci qu'il trouve :

1. Un message système de premier plan avec un contenu de chaîne : le bloc est ajouté après son texte.
2. Le champ `system` de niveau supérieur : le bloc est ajouté après le texte d'une chaîne, ou ajouté en tant que nouveau bloc de texte à un tableau de blocs de contenu.
3. Le premier message système ultérieur avec un contenu de chaîne : le bloc est ajouté après son texte.
4. Aucune de ces réponses : le bloc passe dans un nouveau message système à la fin de `messages`.

Sur un corps sans tableau `messages` (ou avec un tableau vide), aucun contournement de contenu ne s'exécute et un champ `system` de niveau supérieur n'est pas consulté. Le bloc est ajouté après le texte d'un champ de chaîne `instructions`, à moins que ce champ ne contienne déjà le marqueur `[OmniRoute Output Styles]`, auquel cas le corps reste inchangé sous la `already_applied`. Lorsque le corps n'a pas de champ de chaîne `instructions` mais porte `input` (une chaîne ou un tableau), le bloc devient `instructions`, remplaçant toute valeur non-chaîne contenue dans ce champ. Un corps sans champ de chaîne `instructions` ni chaîne ou tableau `input` est laissé inchangé et ignoré en tant que `no_messages`.

#### Comment activer

Dans le tableau de bord :** Contexte de compression Paramètres de compression →** (`/dashboard/context/settings`), section Styles de sortie : une ligne par style avec une bascule on/off et un sélecteur de niveau. Les styles sont injectés pendant que la compression elle-même est activée (la bascule principale de la page, `enabled`). Le** Contournement de la clarté automatique** la bascule est sur le** Homme des cavernes** page (`/dashboard/context/caveman`), dans son** Mode de sortie** carte. Par programme, la configuration de compression conserve la sélection comme :

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Rétro-compatibilité : alors que `outputStyles` est vide, le paramètre `cavemanOutputMode.enabled` hérité est mappé à `terse-prose` à `cavemanOutputMode.intensity`. Le bloc commence ensuite par le marqueur `[OmniRoute Output Styles]`, où l'ancien injecteur `applyCavemanOutputMode()` a écrit `[OmniRoute Caveman Output Mode]`. Sous le marqueur, le texte correspond à l'injection héritée en en, pt-BR, es, de, fr, it, ru, id et vi ; dans ja et zh, il comporte un espace supplémentaire avant la clause de limites. `terse-prose` se traduit par pt-BR, es, de, fr, it, ru, zh, ja, id et vi, donc une requête dont la langue résolue est `hu` obtient le texte anglais où l'ancien injecteur utilisait son texte hongrois.

Sélection de la langue de style de sortie (`resolveOutputStyleLanguage()` dans `outputStyles/apply.ts`) : avec `languageConfig.enabled` activé, `autoDetect` échantillonne le dernier message utilisateur dans le tableau `messages` de la requête qui contient du texte (contenu de la chaîne ou le `text` de ses parties de contenu) et exécute le détecteur du moteur Caveman (`detectCompressionLanguage()`). Le détecteur renvoie `zh` pour le texte contenant des caractères Han et aucun kana ; sinon, il renvoie celui de `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` et `id` qui a le plus de correspondances d'indices, et `en` quand aucun ne correspond au texte — qu'il ne peut pas classer obtient l'anglais, jamais `defaultLanguage` et `vi` n'est jamais détecté bien que les styles expédient le texte `vi`. Un corps Responses API conserve ses tours dans `input`, qui n'est pas échantillonné, il obtient donc `defaultLanguage`, puis en anglais. Lorsqu'aucun message utilisateur dans `messages` ne contient de texte, ou avec `autoDetect` désactivé, `defaultLanguage` s'applique, puis l'anglais. Avec `languageConfig.enabled` désactivé, la langue est l'anglais — sauf si une combinaison de compression s'applique à la requête (une combinaison assignée à la combinaison de routage de la requête, ou la combinaison de compression par défaut à laquelle chatCore revient pour le pipeline empilé intégré) : l'application d'une combinaison active `languageConfig.enabled` pour cette requête et définit `defaultLanguage` à partir des packs de langue du combo (la valeur enregistrée s'il s'agit de l'un des packs du combo, sinon le premier pack du combo, qui est par défaut `en`), tandis que le `autoDetect` enregistré (activé par défaut) s'applique toujours. Le moteur de saisie Caveman choisit son langage de pack de règles différemment — par partie de texte et, avec la détection automatique désactivée, est contrôlé par `enabledPacks`.

La matrice du langage de style × est épinglée par `tests/unit/compression/output-styles-i18n-matrix.test.ts`: chaque style de catalogue nécessite une entrée dans le `BASELINE_LANGUAGES` du test ; un style qui n'est pas contrôlé par les paramètres régionaux doit fournir une traduction pt-BR (le `terse-cjk` contrôlé par les paramètres régionaux est exempté de cette règle) à moins qu'il ne soit répertorié dans `KNOWN_ENGLISH_ONLY`, qui ne peut contenir que des styles sans aucune traduction — un style répertorié qui a une traduction échoue au test ; et un style échoue au test lorsqu'il perd une langue répertoriée dans son entrée `BASELINE_LANGUAGES`. Pour ajouter un style, voir [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Compression des résultats de l'outil

`compressToolResult()` dans `open-sse/services/compression/toolResultCompressor.ts` compresse le texte du résultat de l'outil avec** 5 stratégies** . Il les essaie dans cet ordre, et la première stratégie activée dont la vérification correspond au contenu décide du résultat :

1. **`fileContent`** : contenu de 3 lignes ou plus dans lesquelles au moins une ligne, en ignorant l'indentation de début, commence par `import `, `export `, `function `, `class `, `const `, `let `, `var ` ou `return ` (le mot-clé plus un espace), ou par `if`, `for` ou `while` suivi de `(` ou ` (`, conserve ses 20 premiers et ses 5 derniers lignes, avec le milieu élidé marqué.
2. **`grepSearch`** : le contenu avec au moins une ligne de la forme `<path>:<digits>:`, où le texte avant les premiers deux-points n'a pas d'espace, conserve uniquement ces lignes, au plus 30, suivies d'un décompte de toutes les autres correspondances et de la liste des fichiers correspondants ; une ligne sur deux est supprimée. Une seule de ces lignes suffit pour déclencher la stratégie, donc une ligne de journal commençant par un horodatage tel que `12:30:45` compte également.
3. **`shellOutput`** : la sortie qui contient une séquence ANSI CSI (`ESC[` puis des chiffres ou des points-virgules puis une lettre, comme dans les codes de couleur) ou un `$` suivi d'un espace n'importe où dans le texte perd ces séquences (les autres échappements, tels que `ESC[?25l` ou une séquence de titre de fenêtre OSC, sont conservés) et conserve ses 50 dernières lignes, avec les lignes répétées consécutives réduites. Étant donné que cette vérification s'exécute avant `json` et `errorMessage`, JSON ou une sortie d'erreur contenant un tel `$` ne les atteint jamais lorsque `shellOutput` est activé.
4. **`json`** : une charge utile JSON de plus de 2 000 caractères commençant par `{` ou `[` (après un espace facultatif) et analysée est résumée : un tableau de plus de 7 éléments conserve ses 5 premiers et 2 derniers éléments et son nombre total, et un objet conserve ses 20 premières clés, chaque objet imbriqué ou valeur de tableau étant remplacé par un espace réservé `{…N keys}` (pour un tableau, N est sa longueur) et un marqueur `_remaining_<N>_keys` comptant les clés déposées au-delà de la 20 premiers. Les valeurs scalaires sont copiées entières, donc un objet de 20 clés ou moins sans valeurs imbriquées n'est réindenté que — un objet minifié gagne des caractères et reste inchangé.
5. **`errorMessage`** : sortie qui contient, n'importe où et dans n'importe quelle casse, `error:`, `error ` (le mot suivi d'un espace, comme dans `no error found`), `[error]`, `exception:`, `exception `, `[exception]` ou `traceback` conserve sa première ligne, les 10 lignes suivantes et les 3 dernières, avec un marqueur `… [N frames elided] …` à la place des lignes entre elles. Le marqueur apparaît uniquement lorsque plus de 13 lignes suivent la première ligne, donc la sortie d'erreur de 14 lignes ou moins n'est pas raccourcie (à 12 ou 13 lignes, les 3 dernières lignes répétées sont déjà conservées).

Après qu'une stratégie corresponde, même si elle ne sauve rien, les stratégies ultérieures ne sont pas essayées. Lorsque la stratégie de correspondance n'enregistre aucun jeton estimé (longueur ÷ 4, arrondie), — par exemple un fichier de type code de 25 lignes ou moins, ou un tableau JSON de plus de 2 000 caractères avec 7 éléments ou moins — le moteur agressif conserve le résultat original de l'outil : les deux appelants (`compressAggressive()` et `compressAnthropicToolResultBlock()`) conservent l'original lorsque `saved` est égal à 0 ou inférieur, tandis que `compressToolResult()` lui-même renvoie toujours le résultat de cette stratégie. sortie. L'étape de résultat de l'outil n'est pas le dernier mot : le résumé de secours du moteur peut toujours raccourcir un message `tool` ou `function` de plus de 8 192 caractères (`maxTokensPerMessage`, 2 048, fois 4).

#### Quand utiliser

La compression des résultats de l'outil est l'étape 1 du moteur agressif (`compressAggressive()` dans `open-sse/services/compression/aggressive.ts`), il s'exécute donc en mode agressif et dans une étape `aggressive` d'un pipeline empilé. Il compresse les messages `tool` et `function` de forme OpenAI et le texte à l'intérieur des blocs Anthropic `tool_result`. Chaque stratégie a son propre commutateur sous `aggressive.toolStrategies`, le tout activé par défaut. Dans le tableau de bord, les commutateurs se trouvent dans la page Caveman** Avancé** lorsque la compression est activée et que le mode par défaut est Agressif.

### Pipeline empilé

Le mode empilé s'exécute** plusieurs moteurs en séquence** — généralement RTK d'abord (60 à 90 % d'économies sur la sortie de l'outil), puis Caveman sur le texte restant (~ 46 % d'économies d'entrée). Composé, c'est le** Plage d'éligibilité de 78 à 95 %** (voir Mathématiques de l'épargne en amont ci-dessus) : `1 - (1 - 0.60..0.90) × (1 - 0.46)` a une moyenne de ≈ de 89 %.

#### Comment ça marche

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### Quand utiliser

Utilisez le mode empilé pour :

- Flux de travail gourmands en outils (codage agent, recherche)
- Traitement par lots sensible aux coûts
- Lorsque vous avez besoin d’économiser un maximum de jetons

Les pipelines empilés sont configurés via le paramètre de compression global `stackedPipeline`, ou via une combinaison de compression nommée attribuée à une combinaison de routage (voir Remplacement par combo ci-dessus) — et non via un `modePack` de combo automatique (ce champ repondère uniquement la sélection de modèle de combo automatique, et `stacked` n'est pas un nom de pack valide).

---

## Remplacements de compression par combo

Vous pouvez remplacer le mode de compression global **pour chaque combo** afin d’affiner le comportement
selon les différents cas d’utilisation :

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Cela est utile pour :

- **Combos de codage** : utilisez le mode `aggressive` pour les longues sessions
- **Combos de questions-réponses rapides** : utilisez le mode `lite` pour des réponses rapides
- **Combos utilisant beaucoup d’outils** : utilisez le mode `stacked` pour maximiser les économies
- **Combos de production** : désactivez le remplacement pour les fournisseurs avec mise en cache — l’ajustement
  tenant compte du cache et toujours actif rétrograde automatiquement `aggressive`/`ultra` vers `standard`
  (il n’existe aucun mode `cache-aware` sélectionnable)

---

## Voir aussi

- [Configuration de l’environnement](../reference/ENVIRONMENT.md) — Variables d’environnement de compression
- [Guide d’architecture](../architecture/ARCHITECTURE.md) — Fonctionnement interne du pipeline de compression
- [Guide de l’utilisateur](../guides/USER_GUIDE.md) — Premiers pas avec la compression
- [Compression RTK](./RTK_COMPRESSION.md) — Filtres RTK, modèle de confiance, étape de vérification et récupération de la sortie brute
- [Moteurs de compression](./COMPRESSION_ENGINES.md) — Caveman, RTK, mode empilé, API, MCP et tableau de bord
- [Format des règles de compression](./COMPRESSION_RULES_FORMAT.md) — Format JSON des packs de règles
- [Packs linguistiques de compression](./COMPRESSION_LANGUAGE_PACKS.md) — Règles Caveman propres à chaque langue
