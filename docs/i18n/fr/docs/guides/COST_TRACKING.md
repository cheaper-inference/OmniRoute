# Cost & Spend Tracking (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/COST_TRACKING.md) · 🇪🇹 [am](../../../am/docs/guides/COST_TRACKING.md) · 🇸🇦 [ar](../../../ar/docs/guides/COST_TRACKING.md) · 🇦🇿 [az](../../../az/docs/guides/COST_TRACKING.md) · 🇧🇬 [bg](../../../bg/docs/guides/COST_TRACKING.md) · 🇧🇩 [bn](../../../bn/docs/guides/COST_TRACKING.md) · 🇧🇦 [bs](../../../bs/docs/guides/COST_TRACKING.md) · 🇨🇿 [cs](../../../cs/docs/guides/COST_TRACKING.md) · 🇩🇰 [da](../../../da/docs/guides/COST_TRACKING.md) · 🇩🇪 [de](../../../de/docs/guides/COST_TRACKING.md) · 🇬🇷 [el](../../../el/docs/guides/COST_TRACKING.md) · 🇪🇸 [es](../../../es/docs/guides/COST_TRACKING.md) · 🇪🇪 [et](../../../et/docs/guides/COST_TRACKING.md) · 🇮🇷 [fa](../../../fa/docs/guides/COST_TRACKING.md) · 🇫🇮 [fi](../../../fi/docs/guides/COST_TRACKING.md) · 🇮🇪 [ga](../../../ga/docs/guides/COST_TRACKING.md) · 🇮🇳 [gu](../../../gu/docs/guides/COST_TRACKING.md) · 🇳🇬 [ha](../../../ha/docs/guides/COST_TRACKING.md) · 🇮🇱 [he](../../../he/docs/guides/COST_TRACKING.md) · 🇮🇳 [hi](../../../hi/docs/guides/COST_TRACKING.md) · 🇭🇷 [hr](../../../hr/docs/guides/COST_TRACKING.md) · 🇭🇺 [hu](../../../hu/docs/guides/COST_TRACKING.md) · 🇦🇲 [hy](../../../hy/docs/guides/COST_TRACKING.md) · 🇮🇩 [id](../../../id/docs/guides/COST_TRACKING.md) · 🇳🇬 [ig](../../../ig/docs/guides/COST_TRACKING.md) · 🇮🇹 [it](../../../it/docs/guides/COST_TRACKING.md) · 🇯🇵 [ja](../../../ja/docs/guides/COST_TRACKING.md) · 🇬🇪 [ka](../../../ka/docs/guides/COST_TRACKING.md) · 🇰🇭 [km](../../../km/docs/guides/COST_TRACKING.md) · 🇮🇳 [kn](../../../kn/docs/guides/COST_TRACKING.md) · 🇰🇷 [ko](../../../ko/docs/guides/COST_TRACKING.md) · 🇱🇹 [lt](../../../lt/docs/guides/COST_TRACKING.md) · 🇱🇻 [lv](../../../lv/docs/guides/COST_TRACKING.md) · 🇮🇳 [ml](../../../ml/docs/guides/COST_TRACKING.md) · 🇮🇳 [mr](../../../mr/docs/guides/COST_TRACKING.md) · 🇲🇾 [ms](../../../ms/docs/guides/COST_TRACKING.md) · 🇲🇹 [mt](../../../mt/docs/guides/COST_TRACKING.md) · 🇲🇲 [my](../../../my/docs/guides/COST_TRACKING.md) · 🇳🇵 [ne](../../../ne/docs/guides/COST_TRACKING.md) · 🇳🇱 [nl](../../../nl/docs/guides/COST_TRACKING.md) · 🇳🇴 [no](../../../no/docs/guides/COST_TRACKING.md) · 🇮🇳 [or](../../../or/docs/guides/COST_TRACKING.md) · 🇮🇳 [pa](../../../pa/docs/guides/COST_TRACKING.md) · 🇵🇭 [phi](../../../phi/docs/guides/COST_TRACKING.md) · 🇵🇱 [pl](../../../pl/docs/guides/COST_TRACKING.md) · 🇵🇹 [pt](../../../pt/docs/guides/COST_TRACKING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/COST_TRACKING.md) · 🇷🇴 [ro](../../../ro/docs/guides/COST_TRACKING.md) · 🇷🇺 [ru](../../../ru/docs/guides/COST_TRACKING.md) · 🇱🇰 [si](../../../si/docs/guides/COST_TRACKING.md) · 🇸🇰 [sk](../../../sk/docs/guides/COST_TRACKING.md) · 🇸🇮 [sl](../../../sl/docs/guides/COST_TRACKING.md) · 🇷🇸 [sr](../../../sr/docs/guides/COST_TRACKING.md) · 🇸🇪 [sv](../../../sv/docs/guides/COST_TRACKING.md) · 🇰🇪 [sw](../../../sw/docs/guides/COST_TRACKING.md) · 🇮🇳 [ta](../../../ta/docs/guides/COST_TRACKING.md) · 🇮🇳 [te](../../../te/docs/guides/COST_TRACKING.md) · 🇹🇭 [th](../../../th/docs/guides/COST_TRACKING.md) · 🇹🇷 [tr](../../../tr/docs/guides/COST_TRACKING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/COST_TRACKING.md) · 🇵🇰 [ur](../../../ur/docs/guides/COST_TRACKING.md) · 🇺🇿 [uz](../../../uz/docs/guides/COST_TRACKING.md) · 🇻🇳 [vi](../../../vi/docs/guides/COST_TRACKING.md) · 🇳🇬 [yo](../../../yo/docs/guides/COST_TRACKING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/COST_TRACKING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/COST_TRACKING.md)

---

Comment OmniRoute estime, enregistre et présente le coût de chaque requête — et pourquoi le
chiffre du tableau de bord est un **indicateur d’économies**, et non une facture.

Voir aussi : [Guide de l’utilisateur](./USER_GUIDE.md) · [Galerie des fonctionnalités](./FEATURES.md)

---

## Ce que c’est (et ce que ce n’est pas)

OmniRoute attribue un coût en USD à chaque requête de complétion en multipliant le nombre
de jetons par les tarifs du modèle. Ces chiffres alimentent le tableau de bord **Coûts**,
les commandes CLI `omniroute cost` / `omniroute usage`, les exportations CSV/JSON et les
budgets par clé API.

> **Le « coût » du tableau de bord est un indicateur d’économies, pas une facture.** OmniRoute
> ne vous facture jamais — il achemine vos requêtes vers des fournisseurs que vous avez
> déjà connectés (vos propres abonnements, offres gratuites et clés API). Un « coût total
> de 290 $ » entièrement cumulé sur des modèles gratuits signifie qu’environ **290 $ n’ont
> _pas_ été payés** à une API payante. Ce chiffre est une _estimation_ de ce que le même
> trafic aurait coûté aux tarifs catalogue standard, afin que vous puissiez voir où se
> concentre votre utilisation et combien l’acheminement vers des fournisseurs moins chers
> ou gratuits vous fait économiser.

Cette présentation est indiquée directement dans le fichier [README](../../README.md) du
projet (« le “coût” du tableau de bord est un indicateur d’économies, pas une facture »).

Comme ce chiffre est une estimation :

- Il dépend de la grille tarifaire dont OmniRoute dispose pour chaque modèle. Un modèle
  sans entrée tarifaire contribue un coût de `0` (il apparaît comme une ligne
  « Ancien / Gratuit » dans l’explorateur).
- Le trafic relevant d’une offre gratuite ou d’un abonnement cumule tout de même un coût
  _estimé_ — il s’agit du montant que vous économisez, et non d’un montant dû.

---

## Comment les coûts sont estimés

### La source des prix

Les coûts proviennent du tableau de tarification fusionné dans [`src/lib/db/settings/pricing.ts`](../../src/lib/db/settings/pricing.ts), dans cet ordre de priorité (**le plus élevé en premier** ) :

1. **Remplacements par l'utilisateur** Prix — définis dans le tableau de bord ou via `PATCH /api/pricing` (l'espace de noms `pricing` ).
2. **synchronisation models.dev** Tarifs — extraits de `https://models.dev/api.json` (l'espace de noms `models_dev_pricing` ).
3. **Synchronisation LiteLLM** Prix — extraits du `model_prices_and_context_window.json` public de LiteLLM(l'espace de noms `pricing_synced` ).
4. **Valeurs par défaut codées en dur** Tarifs — expédiés en [`src/shared/constants/pricing/`](../../src/shared/constants/pricing/).

Pour le même provider/model, les valeurs des couches de priorité supérieure écrasent les champs correspondants des couches inférieures ; des champs absents d'une couche supérieure peuvent néanmoins provenir d'une couche inférieure. L'ordre est fixe même lorsque les deux tâches de synchronisation indépendantes s'exécutent en même temps. `GET /api/pricing?includeSources=1` renvoie `pricing` et `sourceMap`, dont les étiquettes par modèle (`user`, `modelsDev`, `litellm`, `default`) identifient la couche la plus prioritaire contenant ce modèle.

**Synchronisation LiteLLM** est opt-in, désactivé par défaut. Ses variables d'environnement (voir [`.env.example`](../../.env.example) ) sont :

| Variable d'environnement | Défaut    | But                                                                                                          |
| ------------------------ | --------- | ------------------------------------------------------------------------------------------------------------ |
| `PRICING_SYNC_ENABLED`   | `false`   | Activez la synchronisation des prix LiteLLM en arrière-plan.                                                 |
| `PRICING_SYNC_INTERVAL`  | `86400`   | Intervalle de synchronisation en secondes (quotidiennement).                                                 |
| `PRICING_SYNC_SOURCES`   | `litellm` | Sélection de source pour cette synchronisation uniquement ; actuellement, seul `litellm` est pris en charge. |

**synchronisation models.dev** est distinct de la synchronisation LiteLLM et est également désactivé par défaut. Activez-le dans Paramètres (synchronisation models.dev) ou utilisez ces variables :

| Variable d'environnement   | Défaut         | But                                                                                                                                                              |
| -------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MODELS_DEV_SYNC_ENABLED`  | _(non défini)_ | La désactivation suit la bascule Paramètres ; `1/true/on/yes` force l'activation et `0/false/off/no` force la désactivation (même si les paramètres l'activent). |
| `MODELS_DEV_SYNC_INTERVAL` | `86400`        | Intervalle de synchronisation models.dev par défaut en secondes (quotidiennement).                                                                               |

`PRICING_SYNC_SOURCES` fait **pas** activer models.dev ; il contrôle uniquement la synchronisation LiteLLM. La suppression d'un remplacement d'utilisateur n'efface aucun des espaces de noms synchronisés ; la prochaine couche de tarification disponible entre en vigueur. Pour un modèle sans prix, vérifiez les paramètres de synchronisation et le `sourceMap` avant d'ajouter une commande manuelle.

### La formule du coût

Le coût est calculé par requête à partir du nombre de jetons et des taux par million de jetons dans [`src/lib/usage/costCalculator.ts`](../../src/lib/usage/costCalculator.ts) (`computeCostFromPricing` / `calculateCost`) :

- **Jetons d'entrée** (moins les lectures de cache et les jetons de création de cache) Taux × `input`.
- **Jetons de lecture du cache** Taux × `cached` (retombe au taux d'entrée).
- **Jetons de création de cache** Taux × `cache_creation` (retombe au taux d'entrée).
- **Jetons de sortie** Taux × `output`.
- **Jetons de raisonnement** Taux × `reasoning` (retombe au taux de sortie).

Tous les taux sont interprétés en USD pour 1 000 000 de jetons. Un niveau de service Codex « rapide »/« prioritaire » ou « flex » applique un multiplicateur de coût (`getCodexFastCostMultiplier`). — par exemple, flex est facturé avec une remise symbolique de 50 %, présenté comme **économies flexibles** dans le tableau de bord.

Les noms de modèles sont d'abord normalisés (les préfixes de chemin du fournisseur tels que `openai/` ou `accounts/fireworks/models/` sont supprimés), afin que les lignes historiques correspondent toujours à un prix.

### Comment les dépenses sont enregistrées

- Le coût par demande est calculé à la fin de la demande. La consommation de quota partagé est planifiée lors du prochain tick de boucle d'événement via [`src/lib/quota/spendRecorder.ts`](../../src/lib/quota/spendRecorder.ts).
- Les dépenses en clé API sont mises en mémoire tampon et vidées par lots par le [`SpendBatchWriter`](../../src/lib/spend/batchWriter.ts) (intervalle de vidage par défaut de 60 s, tampon de 1 000 entrées). Réglable via :

  | Variable d'environnement            | Défaut  | But                                                               |
  | ----------------------------------- | ------- | ----------------------------------------------------------------- |
  | `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | `60000` | Intervalle de rinçage en millisecondes.                           |
  | `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`   | `1000`  | Nombre maximum d'entrées mises en mémoire tampon avant le vidage. |

Les coûts préfèrent les frais exacts déclarés par le fournisseur (`provider_cost_usd`), puis un instantané de la demande au prix du catalogue (`calculated_cost_usd`), puis une retarification symbolique à partir du catalogue actuel. Les coûts stockés ne sont pas facturés à nouveau via leur nombre de jetons. Les anciennes lignes réservées aux jetons changent toujours lorsque leur prix catalogue change.

### OCR et intégrations

- Les requêtes `/v1/ocr` réussies utilisent `usage_info.pages_processed` en amont, et non la plage de pages demandée ou le nombre d'objets de page renvoyés. L'estimation est en pages × `ocr_cost_per_page` ( USD/page absolu,**pas** USD/million).
- Les demandes avec des annotations de document ou de cadre de délimitation nécessitent un tarif `ocr_cost_per_annotated_page` distinct. Sans cela, le coût reste inconnu ; le tarif OCR ordinaire n’est pas remplacé silencieusement.
- La synchronisation LiteLLM mappe son champ `annotation_cost_per_page` en amont dans `ocr_cost_per_annotated_page`, en conservant la valeur absolue USD/page et les entrées d'annotation uniquement, y compris le zéro explicite. Un champ canonique fourni est prioritaire ; les valeurs d'alias non valides sont ignorées. Les remplacements de prix utilisateur conservent leur priorité normale. Voir [les clés de tarification OCR de LiteLLM](https://docs.litellm.ai/docs/providers/mistral_batches#batch-ocr-cost-tracking).
- L'utilisation OCR stocke le nombre de pages, le prix unitaire, le coût USD calculé, la clé API et la connexion sélectionnée. Les pages ne sont jamais représentées comme des jetons. Les journaux d'appels contiennent des métadonnées de facturation, et non des documents URLs, des octets PDF ou du texte extrait.
- Les requêtes `/v1/embeddings` réussies enregistrent une ligne d'utilisation par lot physique, y compris des lots distincts terminés dans la même milliseconde. Les frais signalés par le fournisseur ont priorité sur les estimations de jetons ; Les emballages combo n’ajoutent pas de frais.
- L'historique d'utilisation, l'analyse des coûts, les fenêtres provider/account, les limites de dépenses des clés API, le grand livre des coûts des demandes et les cumuls d'utilisation quotidienne incluent ces frais. Les clés sans journal conservent la comptabilité numérique sans conserver le texte source.
- Les utilisations ou tarifs manquants sont **inconnu** , pas gratuit : l'en-tête de coût de réponse est omis et la politique d'utilisation non tarifée existante s'applique aux clés API limitées. Les taux zéro explicitement configurés restent une utilisation valable sans coût.

Il s’agit d’une comptabilité prospective uniquement. Les anciens appels OCR/embedding qui n’ont jamais écrit d’historique d’utilisation ne peuvent pas être reconstruits à partir de cette migration. Les estimations du catalogue sont des estimations USD, et non une facture, et n'incluent pas la conversion de devises, les taxes ou les remises.

---

## Tableau de bord : la page Coûts

La page **Coûts** se trouve à l’adresse `/dashboard/costs`
(`src/app/(dashboard)/dashboard/costs/`).
Sa vue principale est l’onglet **Vue d’ensemble des coûts**
(`src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx`),
qui charge toutes les données depuis `GET /api/usage/analytics`.

Ce qu’elle affiche :

- **Tuiles de dépenses** — dépenses estimées pour _Aujourd’hui (1d)_, _7d_, _30d_ et la
  période sélectionnée. Sélecteur de période : `7d`, `30d`, `90d`, `all`.
- **Indicateurs principaux** — requêtes sur la période, fournisseurs actifs, modèles actifs,
  coût moyen par requête.
- **Explorateur de coûts** — un tableau triable/filtrable regroupé par **fournisseur**,
  **modèle**, **clé API**, **compte** ou **niveau de service**, avec le coût, les requêtes,
  les jetons, le coût moyen par requête et la part en % du total.
- **Utilisation des jetons** — jetons totaux / d’entrée / de sortie et ratio entrée:sortie.
- **Efficacité du routage** — nombre de replis, taux de repli et couverture du modèle demandé.
- **Prévision mensuelle** — projette les dépenses de fin de mois à partir de la moyenne
  quotidienne récente.
- **Comparaison des périodes** — variation en % entre la première et la seconde moitié de la
  période.
- **Graphiques** — tendance quotidienne des coûts, part des fournisseurs (camembert),
  principaux fournisseurs, principaux modèles, coût par clé API, coût par compte, profil
  d’utilisation hebdomadaire et carte thermique de l’activité.
- **Exportation** — téléchargement de la période actuelle au format **CSV** ou **JSON** (les
  boutons apparaissent dès que les données de coût sont non nulles).

Lorsqu’il n’y a aucun trafic tarifé, les lignes affichent une étiquette « Hérité / Gratuit »
au lieu de `$0`, conformément au modèle de suivi des économies.

### Sous-pages associées aux coûts

La section Coûts comprend également les pages suivantes (toutes sous
`/dashboard/costs/`) :

- **Tarification** (`/dashboard/costs/pricing`) — consulter et remplacer les tarifs par
  modèle (affiche l’onglet Tarification partagé).
- **Budget** (`/dashboard/costs/budget`) — définir des limites de dépenses par périmètre
  (affiche l’onglet Budget partagé).
- **Partage de quota** (`/dashboard/costs/quota-share`) — pools de quotas partagés et vues
  du taux de consommation.

---

## Points de terminaison de l’API

Tous nécessitent une authentification de gestion (boucle locale/JWT, via
`requireManagementAuth`), sauf indication contraire.

### Analyses de l’utilisation et des coûts

| Méthode | Point de terminaison     | Objectif                                                                                                                                                                                       |
| ------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`   | `/api/usage/analytics`   | Analyses complètes des coûts/de l’utilisation : résumé, tendance quotidienne, par fournisseur/modèle/clé API/compte/niveau. Requête : `range`, `startDate`, `endDate`, `apiKeyIds`, `presets`. |
| `GET`   | `/api/usage/utilization` | Utilisation des quotas par fournisseur au fil du temps. Requête : `range` (`1h`/`24h`/`7d`/`30d`), `provider`.                                                                                 |
| `GET`   | `/api/usage/history`     | Lignes brutes de l’historique d’utilisation.                                                                                                                                                   |
| `GET`   | `/api/usage/call-logs`   | Journaux d’appels par requête (modèle, jetons, coût, latence, statut).                                                                                                                         |
| `GET`   | `/api/usage/quota`       | État des quotas des fournisseurs.                                                                                                                                                              |
| `GET`   | `/api/usage/proxy-logs`  | Journaux des requêtes du proxy.                                                                                                                                                                |

### Budgets

| Méthode | Point de terminaison     | Objectif                                                                                                   |
| ------- | ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `GET`   | `/api/usage/budget`      | Résumé des coûts + contrôle du budget pour une clé API (`apiKeyId` requis comme paramètre de requête).     |
| `POST`  | `/api/usage/budget`      | Définir les limites quotidiennes/hebdomadaires/mensuelles en USD + le seuil d’avertissement d’une clé API. |
| `GET`   | `/api/usage/budget/bulk` | Résumés groupés des budgets pour plusieurs clés API.                                                       |

> L’API de budget est limitée à chaque **clé API** (`apiKeyId`). Les limites renvoyées par
> `GET /api/usage/budget` comprennent `dailyLimitUsd`, `weeklyLimitUsd`, `monthlyLimitUsd`,
> un `warningThreshold` et les totaux cumulés (`totalCostToday`, `totalCostMonth`, …).

### Tarification

| Méthode  | Point de terminaison    | Objectif                                                                                                                                                                          |
| -------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/pricing`          | Tarification fusionnée de quatre couches (utilisateur, models.dev, LiteLLM, valeurs par défaut). `?includeSources=1` renvoie `pricing` + `sourceMap`.                             |
| `PATCH`  | `/api/pricing`          | Remplacer la tarification pour `{ provider: { model: { input, output, cached, … } } }`.                                                                                           |
| `DELETE` | `/api/pricing`          | Supprime les redéfinitions de prix utilisateur (éventuellement limitées par `?provider=&model=`) ; les tarifs synchronisés ou les valeurs intégrées restent disponibles en repli. |
| `GET`    | `/api/pricing/defaults` | Afficher les tarifs de repli par défaut par million.                                                                                                                              |
| `GET`    | `/api/pricing/models`   | Tarification indexée par modèle.                                                                                                                                                  |
| `POST`   | `/api/pricing/sync`     | Déclencher une synchronisation manuelle depuis des sources externes (LiteLLM).                                                                                                    |
| `GET`    | `/api/pricing/sync`     | État actuel de la synchronisation.                                                                                                                                                |
| `DELETE` | `/api/pricing/sync`     | Efface uniquement les tarifs synchronisés par LiteLLM (`pricing_synced`) ; les données models.dev sont distinctes.                                                                |

### Autres points de terminaison liés aux coûts

| Méthode | Point de terminaison          | Objectif                                                                             |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------ |
| `GET`   | `/api/free-tier/summary`      | Total des jetons des modèles gratuits, utilisation du mois et quota gratuit restant. |
| `GET`   | `/api/quota/pools/[id]/usage` | Utilisation d’un pool de quotas partagés.                                            |

---

## CLI

La CLI d’OmniRoute fournit des commandes relatives aux coûts, à l’utilisation et à la tarification (enregistrées dans
[`bin/cli/commands/registry.mjs`](../../bin/cli/commands/registry.mjs)).

### `omniroute cost`

Un rapport de coûts agrégé à partir de `/api/usage/analytics`.

```bash
omniroute cost                          # 30 derniers jours, regroupés par fournisseur
omniroute cost --period 7d              # 7 derniers jours
omniroute cost --group-by model         # regrouper par provider | model | combo | api-key | day
omniroute cost --since 2026-06-01 --until 2026-06-13
omniroute cost --api-key <key> --limit 50
```

Colonnes : groupe, requêtes, jetons en entrée/sortie, coût (USD) et % du total. Une ligne de total général
est affichée à la fin (masquée avec `--quiet` ou `--output json`).

### `omniroute usage`

```bash
omniroute usage analytics --period 30d [--provider <id>]   # récapitulatif des coûts par fournisseur
omniroute usage logs [--limit 100] [--follow] [--api-key <k>] [--search <q>]
omniroute usage quota [--provider <id>] [--check]
omniroute usage utilization [--api-key <k>]
omniroute usage history [--limit 100]
omniroute usage proxy-logs [--limit 100]

# Budgets
omniroute usage budget list
omniroute usage budget get [scope]
omniroute usage budget set <amount> [--scope global] [--period monthly]
omniroute usage budget reset [scope]
```

### `omniroute pricing`

```bash
omniroute pricing list [--provider <p>] [--model <m>] [--limit 200]
omniroute pricing get <model>
omniroute pricing sync [--provider <p>] [--force]   # POST /api/pricing/sync
omniroute pricing diff [--model <m>]
omniroute pricing defaults show
omniroute pricing defaults set [--input <p>] [--output <p>] [--cache-read <p>] [--cache-write <p>]
```

> `pricing defaults show` lit `GET /api/pricing/defaults`. Pour modifier plutôt les prix de modèles individuels,
> utilisez la page **Tarification** du tableau de bord ou `PATCH /api/pricing`.

---

## Dépannage

- **Tous les coûts affichent 0 $ / « Legacy / Free ».** Les modèles utilisés ne disposent d’aucune entrée tarifaire.
  Activez la synchronisation externe (`PRICING_SYNC_ENABLED=true`) et exécutez `omniroute pricing sync`, ou
  définissez les prix manuellement via la page Tarification / `PATCH /api/pricing`.
- **Le prix d’un modèle historique est incorrect.** Corrigez le prix (par remplacement ou resynchronisation) — le coût est
  recalculé à partir du nombre de jetons à chaque lecture des données analytiques, les estimations sont donc mises à jour rétroactivement.
- **Les dépenses sont actualisées avec un décalage par rapport au temps réel.** Les dépenses par clé sont traitées par lots ; réduisez
  `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` si vous avez besoin de données plus récentes.

---

Pour savoir comment ces fonctionnalités s’intègrent au tableau de bord dans son ensemble, consultez le [Guide de l’utilisateur](./USER_GUIDE.md) et
la [Galerie des fonctionnalités](./FEATURES.md).
