# Quota Sharing Engine (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Référence du document** : `docs/routing/QUOTA_SHARE.md`
> Fait partie du groupe B (plans 16 + 22).

---

## Vue d’ensemble

Le moteur de partage des quotas répartit équitablement le quota temporel d’un fournisseur (par exemple, une fenêtre Codex de 5 heures ou 1 500 requêtes/h pour Kimi) entre plusieurs clés API partageant la même connexion.

**Problème résolu :** OmniRoute utilise de nombreuses clés API avec un même compte fournisseur en amont. Sans logique de partage, un pic de requêtes provenant de la clé A peut épuiser le quota du fournisseur pour l’heure, laissant les clés B et C bloquées jusqu’à la réinitialisation de la fenêtre. Le moteur empêche cela en :

1. Suivant la consommation glissante de chaque clé pour chaque dimension (%, requêtes, jetons, $).
2. Appliquant un algorithme de partage équitable conservant la capacité : une clé peut emprunter sur les parts inutilisées tant que le pool global n’est pas saturé.
3. Appliquant le résultat dans le chemin critique (`chatCore.ts`) avant que la requête n’atteigne l’exécuteur en amont.

---

## Algorithme : partage équitable du travail et conservation

Implémenté dans `src/lib/quota/fairShare.ts`.

### Modes

| Condition                                  | Mode         | Comportement                                                            |
| ------------------------------------------ | ------------ | ----------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Généreux** | La clé peut emprunter jusqu'à la limite globale moins le total consommé |
| `globalUsedPercent >= saturationThreshold` | **Strict**   | Appliquer strictement la juste part individuelle                        |

`saturationThreshold = 0.5` par défaut (env `QUOTA_SATURATION_THRESHOLD`).

Ces deux modes décrivent un pool dans le mode d'emprunt par défaut, `saturation`. Une piscine en mode `consent` applique toujours des règles strictes, quelle que soit la saturation. Voir [Prêt consenti (opt-in par pool)](#consented-lending-per-pool-opt-in).

### Décision par dimension

Pour chaque dimension active du pool, le moteur calcule :

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Pour les dimensions `percent`, `consumed` provient plutôt du livre d'attribution (voir [Dimensions en pourcentage : attribution par clé](#percent-dimensions-per-key-attribution) ).

Alors:

- **`policy = hard`** : si `consumed > fairShareAllowed` et mode sont stricts →** bloc** .
- **`policy = soft`** : si `consumed > fairShareAllowed` et mode sont stricts →** pénaliser** (déprioriser dans le combo ; ne jamais bloquer durement).
- **`policy = burst`** : autoriser tant qu'une marge globale existe, quelle que soit la part équitable.

### Casquette absolue

`capValue` + `capUnit` sur une allocation est un plafond strict indépendant du mode ou de la politique. N'importe quelle dimension où `consumed >= capValue` toujours** blocs** la demande. Pour un cap `percent`, `consumed` est uniquement la partie attribuée à la clé.

### Contrôle multidimensionnel

Une demande est bloquée si** n'importe lequel** la dimension dans la piscine la bloquerait. Les dimensions sont indépendantes — un épuisement de 5h% n'affecte pas la dimension% hebdomadaire.

### Emprunt

En mode généreux, une clé dont l'allocation est sous-consommée peut utiliser le surplus des parts non allouées des autres clés. La formule est :

```
maxAllowed = globalLimit - consumedByOtherKeys
```

où `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Le teto global (pool `limit` pour cette dimension) est toujours le plafond dur.

### Prêt consenti (opt-in par pool)

Chaque pool dispose d'un mode d'emprunt. `saturation` est la valeur par défaut et conserve les règles ci-dessus. En mode `consent` une clé `hard` transmet sa part uniquement dans la limite de la capacité que d'autres clés ont accepté de prêter. L'administrateur définit le mode de chaque pool. Chaque détenteur de clé définit son propre consentement via [le consentement de prêt](#lending-consent).

Un consentement est un pourcentage de 0 à 100 et un délai facultatif en millisecondes. La clé prête ce pourcentage de sa part inutilisée alors que la date limite est dans le futur.

Pour une dimension, `L` est la limite effective : la limite du plan multipliée par le nombre de comptes dans le pool. La porte calcule, pour la clé requérante :

```
share_k         = w_k / 100 × L
idle_k          = max(0, share_k − consumed_k)
lent            = Σ over the other keys of lend_k / 100 × idle_k
taken           = Σ over the other keys of max(0, consumed_k − share_k)
borrowAvailable = max(0, lent − taken)
```

`w_k` est le poids de la clé, ou `100 / n` pour chaque clé lorsqu'aucun poids n'est supérieur à 0. `lend_k` est le pourcentage actif de la clé, et 0 une fois sa date limite dépassée. Le consentement de la clé qui demande la clé ne compte jamais. Une clé `hard` est refusée une fois que sa consommation atteint sa part plus `borrowAvailable`.

La capacité qu'aucune allocation ne revendique (100 moins la somme des poids) n'est pas prêtable. Aucune clé n'a accepté de la prêter.

**Exemple.** `L` vaut 1000.

| Clé | Poids | Partager | Consommé | Prête |
| --- | ----- | -------- | -------- | ----- |
| UN  | 50    | 500      | 530      | 0%    |
| B   | 30    | 300      | 100      | 50%   |
| C   | 0     | 0        | 60       | 0%    |

- B prête 50 % de ses 200 inutilisés, soit 100. C a déjà pris 60 au-dessus de sa part. A peut en emprunter 40.
- A est servi à 530 et refusé une fois que sa consommation atteint 540.
- Avant que C n'utilise quoi que ce soit, avec A à hauteur ou en dessous de sa part, C pouvait en emprunter 100.
- Avant que C n’utilise quoi que ce soit, avec A à 530, C pouvait en emprunter 70.

**Zéro poids.** Une clé de poids 0 a une part de 0. Elle n'est servie que tant que sa consommation est inférieure à ce que d'autres prêtent. Lorsque personne ne prête, il est refusé dès sa première demande.

**Délais.** Aucune tâche en arrière-plan ne fait expirer un consentement. Chaque demande compare le délai avec son propre temps, et un délai égal à ce temps est écoulé. Une date limite stockée qui n'est pas un nombre fini ou qui dépasse la date la plus élevée qu'un `Date` peut contenir, est considérée comme dépassée.

**`soft` et `burst`.** Le prêt ne les limite pas. Une clé `soft` est dépriorisée une fois dépassée sa part. Une clé `burst` passe alors que la piscine a de la place. Le plafond de la piscine refuse toujours chaque clé une fois que le total de la piscine atteint sa limite.

**Coût sur le chemin de la demande.** Un pool `saturation` ne lit rien de plus qu'avant. Dans un pool `consent`, une dimension dénombrable lit les autres clés uniquement pour une clé `hard` égale ou supérieure à sa part tandis qu'une autre clé prête. Il effectue ensuite une lecture par autre clé, en parallèle. Un échec de lecture compte comme une consommation de 0 pour cette clé. Une dimension `percent` n'ajoute aucune lecture, car le livre d'attribution contient toutes les clés.

**Modification d'un pool.** Une modification conserve le consentement des clés qui restent. Cela vaut pour les modifications d'allocation, les remplacements à l'échelle du groupe et les appels `ensure`. Une clé supprimée perd son consentement et une clé rajoutée commence à 0. Les routes d'administration renvoient le consentement de chaque clé et ne l'écrivent jamais. Le retour d'un pool vers `saturation` conserve tous les consentements stockés, ce qui n'a aucun effet dans ce mode. Basculer à nouveau le pool vers `consent` réactive les consentements stockés dont la date limite n'est pas dépassée. Un détenteur de clé peut effacer un consentement stocké dans l'un ou l'autre mode.

**Mise à niveau.** Si les colonnes `lending_percent` et `lending_until` existent déjà, la migration ajoute uniquement `borrow_mode` et les pourcentages stockés restent tels quels. Chaque pool démarre en mode `saturation`. Activez `consent` par pool dans l'assistant de pool. Rien n'est déduit des valeurs stockées.

**Limites.**

- Un prêteur peut trouver le pool à son plafond avant d’utiliser sa propre part. La capacité empruntée par d’autres compte dans le total du pool.
- Le contrôle court avant la demande et ne réserve rien. Les requêtes simultanées lisent la consommation avant qu'elle ne soit enregistrée, de sorte que la capacité prêtée peut être dépensée plus d'une fois, limitée par les requêtes en cours. La vérification de partage du mode `saturation` a la même propriété.

---

## Compteur à fenêtre glissante

Implémenté dans `src/lib/quota/sqliteQuotaStore.ts` et `redisQuotaStore.ts`.

Deux compartiments par `(apiKeyId, dimensionKey)` :

- `curr` : compartiment actuel (`floor(nowMs / windowMs)`)
- `prev` : compartiment précédent (`curr - 1`)

Valeur glissante effective :

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Précision** : environ 99 %. L’erreur représente au maximum 1 % de la taille de la fenêtre à la limite entre les compartiments (inhérente à l’approximation utilisant 2 compartiments).

### Accès concurrents

Pilote SQLite : un mutex en mémoire par clé `(apiKeyId | dimensionKey)` empêche les accès concurrents en lecture-modification-écriture. Ce modèle reprend la protection anti-effet de ruée de `src/sse/services/auth.ts`.

Pilote Redis : un script Lua EVAL assure l’incrémentation atomique — il s’exécute sous la forme d’une seule commande Redis.

---

## Pilotes

### SQLite (par défaut, aucune installation)

- Table : `quota_consumption` (voir les migrations `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Idéal pour les déploiements à instance unique.
- Toutes les données persistantes se trouvent dans la base SQLite existante d’OmniRoute (`DATA_DIR/storage.sqlite`).

### Redis (facultatif, multi-instance)

- Nécessite le package npm `ioredis`.
- Les compteurs sont stockés dans Redis ; les métadonnées (pools/allocations) restent dans SQLite.
- Idéal pour les déploiements à plusieurs réplicas dans lesquels les compteurs doivent être partagés.

### Changement de pilote

Via l’interface des paramètres (`/dashboard/settings` → Stockage des quotas), ou via les variables d’environnement :

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Le paramètre de la base de données est prioritaire sur les variables d’environnement. Si `driver=redis`, mais que l’URL est absente ou que
`ioredis` n’est pas installé, la fabrique revient à SQLite et consigne un avertissement.

Ordre de sélection du pilote :

1. Paramètre de base de données `quotaStore.driver`
2. Variable d’environnement `QUOTA_STORE_DRIVER`
3. Valeur par défaut : `sqlite`

---

## Multidimensionnel

Une piscine peut avoir plusieurs dimensions. Chaque dimension est indépendante :

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**Exemple : plan Codex** (5h% + hebdomadaire%) :

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Une demande doit satisfaire à toutes les dimensions pour être autorisée.

### Dimensions en pourcentage : attribution par clé

Un plan en pourcentage indique un chiffre d'utilisation par compte et par fenêtre de plan. Le fournisseur ne donne aucun compteur par clé API.

Pour répartir ce chiffre entre les clés, chaque pool tient un livre d'attribution par compte et par fenêtre de plan. `src/lib/quota/percentLedger.ts` détient les règles du livre. `src/lib/quota/percentAttribution.ts` transforme le livre en chiffres utilisés par les forces de l'ordre. Le résultat est une estimation construite à partir des jetons de chaque itinéraire clé.

#### Des lectures qui font bouger le livre

Le livre se déplace uniquement selon le chiffre du fournisseur pour la fenêtre du plan demandé. Ces connexions en signalent une :

| Fournisseur                     | Planifier les fenêtres |
| ------------------------------- | ---------------------- |
| Claude, via une connexion OAuth | `5h`, `weekly`         |
| Codex                           | `5h`, `weekly`         |

Ceux-ci ne comptent pas comme une lecture :

- une réponse que le client fournisseur marque comme obsolète
- une fenêtre Claude dont le pourcentage n'a pas été signalé par le fournisseur
- le chiffre d'une autre fenêtre, ou le pire des cas sur toutes les fenêtres
- la solution de repli de l'en-tête de limite de débit
- une lecture ratée

D'autres fournisseurs, notamment Claude avec une clé API, n'ont pas de livre. Chaque clé est facturée 0 sur ses dimensions en pourcentage, comme avant ce changement.

Une lecture partage le cache de 30 secondes du signal de saturation. Une lecture Claude est datée du moment où le chiffre a été observé dans les en-têtes de réponse ou lu à partir du point final d'utilisation, lorsque cette heure est connue. D'autres lectures sont datées du moment où cette entrée de cache a été créée.

#### Ce que garde le livre

Chaque requête enregistrée ajoute ses jetons, une fois, à un compteur par pool, compte et clé. Un compteur ne fait que croître. Le livre retient trois choses :

- la ligne de base : le chiffre auquel le livre s'est ouvert ou la fenêtre s'est tournée pour la dernière fois
- le dernier chiffre appliqué
- par clé, son compteur de jetons au même instant, appelé sa marque

Le livre est mis à jour lorsque l'application ou l'itinéraire d'utilisation calcule l'attribution. Les écritures sont comparées et définies sur un numéro de révision. Un écrivain qui perd réessaye une fois sur une nouvelle lecture.

#### Comment la partie d'une clé est calculée

La partie de chaque clé est calculée lors de la lecture du livre. La croissance du chiffre depuis la ligne de base est répartie entre les clés proportionnellement aux jetons que chacune acheminés depuis sa marque.

Together, ces jetons expliquent au plus un point du chiffre par jeton `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` (1 000 par défaut). La croissance qu’ils n’expliquent pas est externe. La ligne de base est également externe.

Par exemple, un livre s'ouvre à 0. La clé A achemine ensuite 900 000 jetons et la clé B en achemine 100 000. Au chiffre 60, la part de A est de 54 points et celle de B est de 6.

Un compteur en dessous de la marque de sa clé a redémarré et compte entièrement. Une clé sans marque, comme une clé qui rejoint le pool au milieu d'une fenêtre, compte tous ses jetons. Un chiffre en retard par rapport aux jetons provoque une erreur qui disparaît à la lecture suivante. Cela ne s’accumule pas.

`QUOTA_PERCENT_MIN_TOKENS_PER_POINT` est lu sur chaque attribution. Une valeur qui n’est pas un nombre fini d’au moins 1 retombe à 1 000.

#### Comment une lecture change le livre

La première règle de correspondance s'applique :

1. **Pas encore de livre :** la lecture ouvre le livre. Son chiffre est la ligne de base et chaque compteur est marqué.
2. **Lecture plus ancienne :** une lecture datée avant la dernière appliquée est ignorée. Il en va de même pour une lecture dont l’heure de réinitialisation est plus de 30 minutes plus tôt que celle enregistrée.
3. **Fenêtre du nouveau fournisseur :** un temps de réinitialisation plus de 30 minutes plus tard que celui mémorisé fait tourner le livre. Le chiffre devient la ligne de base et chaque compteur est à nouveau marqué. Les clés sans compteur sortent du livre.
4. **Fenêtre terminée :** une heure de réinitialisation stockée qui n'est pas postérieure à l'heure des données de lecture signifie que la fenêtre est terminée. La lecture fait tourner le livre, quelle que soit sa figure.
5. **Chiffre supérieur :** seul le dernier chiffre bouge. La ligne de base et les marques restent.
6. **Même chiffre :** la figure, la ligne de base et les marques restent. Seul un temps de réinitialisation qui manque au livre est écrit.
7. **Chiffre inférieur :** un chiffre inférieur n’est jamais appliqué tel quel. Cela ne fait tourner le livre que lorsque trois choses sont vraies. Il est au moins deux minutes plus récent que la dernière lecture appliquée. Rien ne dit que la fenêtre est la même que celle ouverte. C'est plus d'un point de moins.

La fenêtre compte comme la même fenêtre ouverte lorsque trois éléments sont valables. Les deux temps de réinitialisation sont connus. Ils sont à 30 minutes l’un de l’autre. Celui stocké est toujours en avance sur la lecture. Un chiffre inférieur à l’intérieur de cette fenêtre ne change rien.

Une heure de réinitialisation est stockée uniquement lorsqu'elle est en avance sur l'heure des données de la lecture qui la porte. Un chiffre plus élevé stocke le temps de réinitialisation de sa lecture lorsque celle-ci est utilisable, et conserve celui stocké dans le cas contraire. Un chiffre égal enregistre l'heure de réinitialisation de sa lecture uniquement lorsque le livre n'en a pas. Cela ne change rien d'autre. Un chiffre inférieur qui ne fait pas tourner le livre n'enregistre aucun temps de réinitialisation.

#### Quand le livre est utilisé

Après une lecture, le livre est utilisé sauf si son heure de réinitialisation stockée n'est pas postérieure à l'heure actuelle. Ce cas se produit lorsqu'une lecture effectuée juste avant la réinitialisation, telle qu'une lecture provenant du cache, est observée juste après celle-ci.

Sans lecture utilisable, le livre stocké n'est utilisé que tant qu'il peut encore être le livre de la fenêtre en cours. Cela est valable dans deux cas :

- son heure de réinitialisation est connue et toujours en avance
- il n'a pas d'heure de réinitialisation et la dernière lecture qui l'a modifié date d'au plus 15 minutes

Autrement, rien n’est attribué, comme lorsqu’il n’y a pas de livre. Un livre dont le temps de réinitialisation stocké est dépassé n'est jamais facturé.

#### Application

La consommation d'une clé sur une dimension en pourcentage est sa part attribuée plus une part de la partie externe. La partie externe utilise d'abord la capacité sans allocation (100 moins la somme des poids). Seul l'excédent est partagé entre les clés en fonction du poids.

Cette consommation est comparée à la juste part de la clé comme pour toute autre dimension. Le mode strict démarre toujours lorsque le signal de saturation atteint `QUOTA_SATURATION_THRESHOLD` (par défaut 0,5). Chaque nombre est adapté à la limite effective : la limite par compte multipliée par le nombre de comptes dans le pool.

Un plafond absolu avec `capUnit: "percent"` ne compte que la partie attribuée à la clé, mise à l'échelle de la même manière. Prenez une limite par compte de 100 et k comptes. Un plafond de N est alors atteint lorsque la partie clé du chiffre du compte serveur atteint des points N/k. Chaque compte est vérifié par rapport à son propre livre. Par exemple, avec deux comptes, un plafond de 10 est atteint à 5 points du chiffre d'un compte.

Lorsque le magasin n'est pas lisible, rien n'est attribué et chaque clé est facturée 0 sur cette dimension. Lorsqu'une écriture de livre échoue, cette attribution utilise le livre tel qu'il a été lu. Un échec d'écriture de jeton laisse les jetons de cette requête hors du livre. Aucun de ces échecs ne bloque une requête.

Dans un pool `consent`, la formule de prêt utilise la consommation de chaque clé sur la dimension de pourcentage comme décrit ci-dessus. Lorsqu'une autre clé est prêtée, le livre est lu une fois et attribué à chaque clé. Sans livre utilisable, chaque clé est facturée 0. Une clé avec un poids passe alors, et une clé avec un poids 0 ne passe que lorsqu'une autre clé prête.

#### Itinéraire d'utilisation

`GET /api/quota/pools/{id}/usage` rapporte les mêmes chiffres via la même fonction. Une dimension de pourcentage a une entrée par connexion de pool dans `accounts`. Ses `consumedTotal` et `perKey` de niveau supérieur reflètent la première entrée.

L'itinéraire applique également la lecture actuelle, de sorte qu'il peut faire avancer le livre comme le fait une demande. `internal + external` peut différer de `consumedTotal` lorsqu'il n'y a pas de lecture utilisable ou lorsqu'un chiffre inférieur n'est pas appliqué.

#### Stockage et conservation

Les deux magasins de quotas tiennent le livre. Sur SQLite, le nettoyage automatique de la base de données, lorsqu'il est activé, supprime les lignes non mises à jour depuis 60 jours. Sur Redis, les livres et compteurs d'une connexion pool partagent une clé. Il expire 60 jours après sa dernière écriture de jeton ou changement de livre. Un livre qui ne change pas n'est pas réécrit, la coupure est donc fixée au-dessus de la fenêtre de plan la plus longue. La réinitialisation manuelle de l'historique d'utilisation efface également les livres sur SQLite (voir Limitations).

#### Limites

- Toute croissance du chiffre du compte depuis la ligne de base est divisée par les jetons que chaque clé acheminés depuis lors. Le moment où cette croissance s’est produite n’a pas d’importance.
- Ainsi, l'utilisation effectuée en dehors OmniRoute est facturée aux clés à hauteur de ce que leurs jetons permettent. Cela inclut l'utilisation faite avant la première requête d'une clé sur la fenêtre, lorsque le livre était déjà ouvert.
- Par exemple, une utilisation extérieure fait monter le compte de 60 points alors qu'aucune route clé. Une clé achemine alors 30 000 tokens et le chiffre atteint 60,6.
- Si le livre était ouvert avant cette utilisation, la part de la clé est de 30 points. Il embarque également 7,65 d'usage externe, avec quatre clés de poids 25.
- Si le livre est ouvert après cette utilisation, les 60 points constituent la référence. La part de la clé est de 0,6 point et elle en porte 15 d'usage externe.
- Une demande ou une visite du parcours d'utilisation ouvre le livre. Ainsi, le fait qu’une telle utilisation compte comme référence dépend du moment où le livre a été ouvert.
- Avec le plancher par défaut, une clé qui achemine 60 000 jetons alors qu'une utilisation extérieure augmente le compte de 60 points obtient les 60 comme sa propre partie.
- Avec un plancher à 50 000, sa propre part est de 1,2 points. Les 58,8 autres sont externes et facturés au poids, comme toute utilisation externe.
- Réglez `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` à un niveau proche du coût d'un point sur votre plan. L'utilisation extérieure inclut le trafic sur le même compte à partir de clés extérieures au pool.
- Un plafond en pourcentage s’applique dans chaque mode. Une clé plafonnée peut être refusée alors que le compte est très en dessous du seuil de saturation.
- Prendre un bouchon de 10 et 12 points d'usage extérieur plus tôt dans la vitrine. Une clé qui achemine 20 000 tokens est alors refusée pour un montant de compte de 12,4 %.
- La répartition est une estimation par volume de jetons. Une requête compte comme ses jetons d'invite plus ses jetons d'achèvement. Les remises sur le cache et les prix des modèles ne changent pas ce chiffre.
- Une requête qui ne se termine pas par le statut 200 n’enregistre aucun jeton. Les exemples sont un flux que le client déconnecte et une erreur en amont après la consommation de l'utilisation.
- L'utilisation provoquée par une telle demande est facturée aux clés qui ont enregistré des jetons, dans la limite de ce que leurs jetons permettent. Le reste est externe. Cela ne recule pas. Une réponse qui ne signale aucune utilisation de jeton n’enregistre aucun jeton non plus.
- L'utilisation d'une requête en cours peut apparaître dans la partie d'une autre clé active pour l'ensemble de la requête. Il ne recule que lorsque la requête se termine avec le statut 200.
- L'utilisation déjà présente sur le compte à l'ouverture d'un livre est considérée comme externe. Cela couvre une mise à niveau, un nouveau pool et un nouveau compte. L'utilisation dans une nouvelle fenêtre avant sa première lecture est également considérée comme externe.
- Chaque clé commence par sa part de poids de cette utilisation, après la capacité, aucune allocation n'est revendiquée. Avec un compte à 85% et cinq clés de poids 20, chacun démarre avec 17 de ses 20 utilisées.
- Dans un pool comprenant plusieurs comptes, le chiffre du compte serveur est appliqué au budget totalisé. Ceci est inchangé par le livre.
- Un chiffre inférieur à l’intérieur d’une fenêtre que le fournisseur signale comme ouverte n’est pas appliqué. Un temps de réinitialisation reculant de plus de 30 minutes est traité comme un ancien relevé.
- Dans les deux cas, le livre conserve son état jusqu'à ce que le temps de réinitialisation stocké soit écoulé. Après cela, le livre n'est plus chargé jusqu'à ce qu'une lecture le fasse tourner.
- Le remède est la réinitialisation manuelle de l'historique d'utilisation (`POST /api/settings/purge-usage-history`). Il efface les livres d'attribution et leurs compteurs de jetons dans la base de données SQLite.
- La période `all` efface tous les livres et compteurs. Une période plus courte efface d'abord les livres qui n'y sont pas écrits. Il efface ensuite les compteurs qui n'y sont pas inscrits, mais uniquement pour une connexion au pool qui n'a plus de livre. Un livre tenu marque toujours chaque clé contre son compteur.
- Un livre dont la figure n'a pas bougé n'est pas réécrit, donc une période plus courte peut également effacer le livre de la fenêtre en cours. La lecture suivante ouvre alors un nouveau livre au chiffre actuel.
- La réinitialisation ne touche pas un magasin de quotas Redis. Là, un livre se termine avec sa fenêtre, ou expire 60 jours après sa dernière écriture.
- Lorsque le fournisseur n'envoie aucun délai de réinitialisation, une fenêtre qui se réinitialise et se remplit au-dessus de l'ancien chiffre entre deux lectures ressemble à un chiffre plus élevé. Le livre conserve l'ancienne ligne de base et les marques.
- Les lectures sont datées par l'horloge locale. Lorsqu'il est en avance sur celui du fournisseur, ou qu'une source signale une heure de réinitialisation un peu plus tôt, le livre peut se rendre compte de cette différence plus tôt.
- La croissance sur cette courte période est divisée par les jetons qui y sont acheminés. La première lecture de la fenêtre suivante le corrige. Lorsque le livre retourné ne contient pas de temps de réinitialisation, cette correction nécessite un chiffre inférieur d'au moins deux minutes plus récent que la dernière lecture appliquée.
- Les instances qui partagent un Redis stockent les lectures de date avec leurs propres horloges, alors gardez ces horloges synchronisées. Les lectures d'une instance dont l'horloge est en retard semblent plus anciennes et sont ignorées.
- Lorsqu'aucune lecture utilisable n'arrive après le temps de réinitialisation stocké, les parts de pourcentage par clé et les plafonds de pourcentage ne sont pas appliqués jusqu'au retour d'une lecture. Sans temps de réinitialisation, celui-ci démarre 15 minutes après la dernière lecture ayant modifié le livre.
- Sur la boutique Redis, un livre inactif pendant 60 jours peut expirer entre le chèque d'un écrivain et son écriture. Il est ensuite recréé avec une révision supérieure à 1, ce qui est un état valide.

---

## Résolveur de forfait

Implémenté dans `src/lib/quota/planResolver.ts`.

Ordre de priorité (du plus élevé au plus faible) :

1. **Remplacement manuel en base de données** — table `provider_plans`, par `connectionId`.
2. **Catalogue connu** — `src/lib/quota/planRegistry.ts` (données uniquement).
3. **Forfait vide** — aucune dimension, configuration manuelle requise.

### Catalogue connu

| Fournisseur           | Dimensions                                                    |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, inconnu), `tokens/weekly`               |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Aucune valeur par défaut — configuration manuelle requise     |

---

## Intégration des pipelines

### crochet PRE (`open-sse/handlers/chatCore.ts`)

S'exécute avant l'exécuteur en amont, après les vérifications d'authentification et de stratégie :

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Échec d'ouverture** : si `enforceQuotaShare` est lancé, la requête est autorisée avec un journal `pino.warn`. Cela empêche un bug du moteur de quota de bloquer tout le trafic.

**Quand la capacité reviendra.** Un refus à la part de la clé ou au plafond de la piscine se termine par l'une des deux phrases, dans les deux modes d'emprunt :

- Fenêtre `percent` : `. The <window> window resets at <time>.` L'heure correspond à la réinitialisation signalée par le fournisseur.
- Unité dénombrable : `. Enough <window> usage is expected to clear by <time>.` Le temps est une limite supérieure de la fenêtre glissante, si la clé n'envoie rien d'autre.

`<time>` est un instant ISO 8601 dans UTC. Le refus porte alors `Retry-After`: les secondes entières jusqu'à cet instant, plus une. Un client qui attend aussi longtemps réessaye au maximum une seconde après l'instant. Lorsque l'instant n'est pas connu, le refus ne porte ni la phrase ni l'en-tête. Un refus absolu de plafond n’entraîne ni l’un ni l’autre. Le code public reste `quota_share_blocked`.

Un refus de partage ne touche pas la connexion partagée. Il ne définit aucun temps de recharge, aucun verrouillage de modèle et aucune défaillance du disjoncteur du fournisseur, et les autres clés du pool continuent d'être servies. Lorsque chaque cible d'un combo refuse la clé pour son partage, le combo répond 429 sans attendre. Sa réponse porte l'allusion `Retry-After`. Le chemin des intégrations termine son refus par la même phrase et n'envoie aucun `Retry-After`.

### crochet POST (consommation record)

Après une réponse réussie :

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Note de dérive** : si `consume` échoue après la réponse, le compteur roulant sous-compte. Le signal de saturation du fournisseur (par exemple `anthropic-ratelimit-unified-5h-utilization`) corrige l'estimation globale à la requête suivante.

### Pénalité légère combinée (`open-sse/services/combo.ts`)

Quand `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

La pénalité est appliquée après tous les autres facteurs de notation. Cela réduit la probabilité de combinaison automatique de sélectionner une touche saturée sans la bloquer durement.

---

## Procédure pas à pas UI

### `/dashboard/costs/quota-share` — Page principale des piscines

Composants (tous en `src/app/(dashboard)/dashboard/costs/quota-share/`) :

| Composant              | But                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------ |
| `QuotaConceptCard`     | Carte d'introduction expliquant le partage des quotas aux nouveaux utilisateurs      |
| `CreatePoolModal`      | Créer un nouveau pool de quotas (connexion + nom + allocations initiales)            |
| `PoolCard`             | Résumé par pool : nom, connexion, nombre d'allocations                               |
| `DimensionBar`         | Barre empilée par dimension : la part de chaque clé dans l'utilisation globale +     |
| `AllocationTable`      | Table avec consommation, part équitable, deficit/surplus, drapeau d'emprunt          |
| `BurnRateChart`        | Graphique linéaire du taux de combustion EMA (Recharts paresseux via `dynamic()`)    |
| `EditAllocationsModal` | Modifier les pondérations d'allocation, les plafonds et les politiques d'un pool     |
| `BorrowModeField`      | Sélecteur de mode d'emprunt (`saturation` ou `consent`) dans l'assistant             |
| `LendingBadge`         | Badge en lecture seule sur une clé qui se prête, dans les pools `consent` uniquement |

Le badge de prêt indique le pourcentage et, une fois défini, le délai en UTC avec la zone nommée. Il juge le délai au moment de l'instantané d'utilisation. Un délai expiré ou illisible s'affiche sous la forme `lending expired`.

La page accroche :

- `usePools` — récupère `GET /api/quota/pools` toutes les 30 secondes.
- `usePoolUsage` — récupère `GET /api/quota/pools/[id]/usage` à la demande.
- `useLocalStoragePoolMigration` — s'exécute une fois lors du montage pour migrer les anciennes données LS.

L'étape clés de l'assistant de piscine comporte une boîte `Show usage by member to key holders`. Il définit l'option `memberBreakdown` du pool (voir [Utilisation des membres](#member-usage) ). En dessous, l'assistant avertit que quelqu'un qui sait quelle clé utilisée peut faire correspondre une barre à cette clé. Lorsque la case est cochée, cela est indiqué lorsque l'étape répertorie moins de trois ou plus de 20 clés, car les barres restent alors masquées. Il compte les clés dans l'étape et ne peut pas dire laquelle d'entre elles peut faire des requêtes.

### Configuration du plan du fournisseur `/dashboard/costs/quota-share/plans` —

- `ProviderPlanConfigClient.tsx`: liste déroulante pour sélectionner un fournisseur, afficher le plan résolu (automatique à partir du catalogue ou remplacement manuel) et modifier les dimensions.
- Les modifications sont écrites dans `PUT /api/quota/plans/[connectionId]`.
- La suppression revient au catalogue ou au plan vide.

---

## Quota libre-service API (opt-in)

`GET /api/v1/me/quota/{provider}` (également servi sur `/v1/me/quota/{provider}`) permet à un détenteur de clé API de lire, avec sa propre clé, quelle part d'un abonnement partagé lui appartient et ce qui le bloque. La route est une fine coquille sur `src/server/selfService/quotaHandler.ts`; la vue est construite par `src/lib/quota/selfView.ts` et son contrat de réponse est `src/shared/schemas/selfQuota.ts` (`SelfQuotaView` in `docs/openapi.yaml`).

### Activation et authentification

- Indicateur de fonctionnalité `QUOTA_SELF_PANEL`, `false` par défaut. Lorsqu'elle est désactivée, une requête qui atteint la route obtient 404. Avec `REQUIRE_API_KEY=true`, la politique API du client refuse une clé manquante ou invalide avec 401 avant l'exécution de la route, quel que soit le flag. Une demande sans clé mais avec une session de tableau de bord connectée transmet cette stratégie et obtient la propre réponse de l'itinéraire. L'indicateur est résolu comme tous les autres indicateurs (remplacement du tableau de bord ou REST, puis variable d'environnement du même nom) ; voir [`FEATURE_FLAGS.md`](../reference/FEATURE_FLAGS.md).
- Le nom d'affichage de chaque pool et l'étiquette de chaque horaire sont renvoyés aux détenteurs de clés du pool exactement tels que l'administrateur les a écrits. Avant d'allumer le drapeau, vérifiez qu'il est apte à être lu par les détenteurs de clés.
- La clé est lue uniquement à partir des en-têtes : `Authorization: Bearer <key>` ou `x-api-key: <key>`. Lorsque les deux sont envoyés, le premier qui valide est utilisé. Une clé dans la chaîne de requête ou un cookie est ignoré. La clé d'environnement du serveur est refusée (401).
- La clé a besoin de la portée `self:usage` (403 sans elle).
- Le segment du fournisseur est découpé, mis en minuscules et vérifié par rapport à `^[a-z0-9][a-z0-9._-]{0,63}$` (400 sinon), puis résolu via le registre du fournisseur, de sorte qu'un alias tel que `cc` lit les pools `claude`. `claude` et `anthropic` lisent les mêmes pools.

### Ce que montre chaque visibilité

| Visibilité       | Nécessite                                                                                      | Champs                                                                                                                                                                                                                                                                               |
| ---------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Part propre      | `self:usage`                                                                                   | `pools[]` (réf, nom, fournisseur, politique, poids, plafond), `dimensions[].yourShare`, `accounts[]` avec `yourShare` (sur une fenêtre `percent` sans `attributed` et `external`), `blocks`, `availableModels`, `expiresAt`, `apiBaseUrl`                                            |
| Niveau du compte | `self:usage` + `self:account-quota` et le fournisseur dans le `sharedQuotaProviders` de la clé | ajoute `dimensions[].total`, `accounts[].dimensions[].account` et `accounts[].modelWindows`, `attributed` et `external` sur le `yourShare` d'une fenêtre `percent`, et `members` sur un pool avec l'utilisation des membres activée (voir [Utilisation des membres](#member-usage) ) |

- `sharedQuotaProviders` est un paramètre par clé (`PUT /api/keys/[id]/self-service`) : `null`, la valeur par défaut, signifie chaque fournisseur auquel la clé atteint ; `[]` signifie aucun. `accountVisible` de chaque pool indique la visibilité qui lui est appliquée.
- Les barres de compte et les fenêtres de modèle sont affichées uniquement pour les comptes dont la connexion peut être utilisée par la clé. Lorsque la clé a une liste de connexions autorisées, un compte extérieur conserve son entrée `Account N` sans `account` ou `modelWindows`. Une liste vide ne signifie aucune restriction, comme pour `/v1/me/status`. Le total du pool (`dimensions[].total`) ne dépend pas de cette liste.
- Deux chiffres affichés avec `self:usage` seul proviennent de l'utilisation d'autres clés. Le `exhausted` d'un budget de planification reflète la consommation de chaque clé dans le cadre de cette planification. Dans un pool dont les poids sont tous nuls, le `weight` de la clé est `100 / number of members`. Les deux sont ce que l'application s'applique à la clé.
- Un pool est identifié uniquement par `ref`, une valeur opaque liée à la clé appelante. Son nom d'affichage (`name`) est inclus tel que l'administrateur l'a écrit. Un `ref` est dérivé de la clé et du pool avec la clé secrète API du serveur (`API_KEY_SECRET`). Les clients ne doivent pas le conserver : il change si ce secret est modifié.
- Les comptes sont répertoriés comme `Account 1`, `Account 2`,… dans l'ordre du pool. Aucun identifiant de pool, identifiant de connexion, e-mail de compte ou nom de compte n'est renvoyé, et la réponse passe par le schéma de contrat, qui supprime tout champ en dehors de celui-ci.
- Les unités dénombrables (`requests`, `tokens`, `usd`) sont signalées comme compartiment de pool appliqué par la porte de quota : `limit` = limite du plan × comptes dans le pool, `fairShare` = poids / 100 × `limit` (répartition égale lorsque chaque poids est 0), `consumed` = le propre compteur de la clé dans le magasin de quotas, `remaining` = `fairShare` − `consumed`, terrassé à 0.
- `blocks.schedules` répertorie les fenêtres de planification de la clé (`open`/`closed`, `blackout` ou `outside-window`, `retryAfterSeconds`, les étages de réserve et si le budget de la fenêtre est dépensé) ; `blocks.modelCaps` répertorie ses plafonds horaires par modèle avec la consommation.
- Une clé en dehors de chaque pool du fournisseur obtient 200 avec `pools: []`; `availableModels` (les identifiants `qtSd/` que la clé voit dans `/v1/models`), `expiresAt` et `apiBaseUrl` sont toujours remplis.
- `apiBaseUrl` est `OMNIROUTE_PUBLIC_API_BASE_URL`, puis `OMNIROUTE_PUBLIC_BASE_URL`, sinon `null`. Il ne s'agit jamais de l'origine même de la demande.

### `status` et `reason`

| `status`      | Signification                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ok`          | Une lecture actuelle.                                                                                                                                                                                                                                                                                                                                                                                           |
| `stale`       | Une lecture de compte en cache marquée comme obsolète ou dont le temps de réinitialisation est écoulé depuis sa lecture. Les numéros sont conservés. Une fenêtre modèle dont le temps de réinitialisation est écoulé marque l'ensemble du groupe `modelWindows` `stale`. Pour le partage de clé d'une fenêtre `percent` : le livre a été lu sans lecture de compte dans le cache de la porte pour le confirmer. |
| `unavailable` | Pas de lecture ; les nombres sont `null`, jamais `0`. `reason` dit pourquoi.                                                                                                                                                                                                                                                                                                                                    |

| `reason`                          | Quand                                                                                                                                                                  |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `store_unavailable`               | Le magasin de quotas n'a pas pu être lu ou il ne peut pas lire les livres d'attribution.                                                                               |
| `percent_attribution_unavailable` | La part propre de la clé dans une fenêtre `percent` : aucun livre d'attribution n'existe encore pour ce compte et cette fenêtre, ou le livre ne répertorie pas la clé. |
| `percent_window_ended`            | La part propre de la clé d'une fenêtre `percent` : le livre appartient à une fenêtre de plan terminée.                                                                 |
| `account_not_used_by_key`         | Le partage propre de la clé dans une fenêtre `percent` : la connexion du compte est en dehors des connexions autorisées de la clé. Son livre n'est pas lu.             |
| `window_not_reported`             | Le cache des limites du fournisseur n'a aucune lecture pour cette fenêtre de plan.                                                                                     |
| `connection_lookup_failed`        | La connexion du compte n'a pas pu être lue.                                                                                                                            |
| `not_supported`                   | OmniRoute ne peut pas lire les limites d'utilisation du fournisseur du compte.                                                                                         |
| `fetch_failed`                    | Aucune lecture mise en cache n'était utilisable et l'actualisation des limites du fournisseur a échoué.                                                                |
| `not_available`                   | La lecture ne comporte aucune fenêtre d'utilisation, ou le compte n'a aucune lecture du tout.                                                                          |

Lorsque le magasin de quotas ne peut pas être lu, les champs sauvegardés en magasin de `blocks` ( `exhausted` d'un budget planifié, `consumed` et `reached` d'un plafond de modèle) sont également `null`.

### Consentement au prêt

`PATCH /api/v1/me/quota/{provider}` enregistre le propre consentement de la clé appelante pour un pool. Il utilise le drapeau, les en-têtes et les règles du fournisseur du `GET`. La portée `self:usage` autorise cette seule écriture, bien que son nom soit en lecture seule.

```json
{
  "pool": "qpr_0123456789abcdef0123456789abcdef",
  "lendingPercent": 30,
  "lendingUntil": 1893456000000
}
```

- `pool` est le `ref` renvoyé par `GET` pour ce pool.
- `lendingPercent` est un entier compris entre 0 et 100. Une valeur de 0 efface le consentement et sa date limite. Un corps avec `lendingPercent` 0 est accepté dans les deux modes.
- `lendingUntil` est facultatif : époque millisecondes, ou `null` sans délai. Elle doit être dans le futur et au maximum 8640000000000000. Une valeur inférieure à 100000000000 se lit en secondes et est refusée.
- Tout autre champ est refusé. Un corps de plus de 4096 octets est refusé. La lecture s'arrête à cette taille, donc un corps plus long n'est jamais conservé dans son intégralité.

Les contrôles s'exécutent dans l'ordre de ce tableau. Chaque refus utilise le corps d'erreur standard avec un message fixe. Un refus par l'un de ces chèques n'écrit rien.

| Statut | Message                                                                                            | Quand                                                                                |
| ------ | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 404    | `Not found`                                                                                        | Le drapeau `QUOTA_SELF_PANEL` est éteint.                                            |
| 401    | `Valid API key required`                                                                           | La clé est manquante ou invalide, ou il s'agit de la clé d'environnement du serveur. |
| 403    | `API key lacks the self:usage scope`                                                               | La clé manque `self:usage`.                                                          |
| 400    | `Invalid provider`                                                                                 | Le segment du fournisseur n'est pas valide.                                          |
| 429    | `Too many lending changes. Retry later.`                                                           | La clé a dépassé sa limite. La réponse porte `Retry-After`.                          |
| 400    | `Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.` | Le corps n'est pas JSON, est trop long ou ne correspond pas au schéma.               |
| 400    | `lendingUntil must be a Unix time in milliseconds`                                                 | Le délai se lit en secondes.                                                         |
| 400    | `lendingUntil must be in the future`                                                               | La date limite est au plus tard au moment de la demande.                             |
| 404    | `Pool not found`                                                                                   | Le `ref` ne nomme aucun pool de cette clé pour ce fournisseur.                       |
| 403    | `Lending is not enabled for this pool`                                                             | Le pool est en mode `saturation` et `lendingPercent` est supérieur à 0.              |
| 500    | `Failed to build quota view`                                                                       | Tout autre échec. Sa cause est enregistrée sur le serveur.                           |

La limite est de 20 requêtes toutes les 60 secondes pour chaque clé. Chaque demande qui passe avec succès le contrôle du fournisseur compte, même celle qui est refusée ultérieurement ou qui ne change rien. Il possède son propre compteur, outre la limite de taux de requête de la clé.

Une demande qui modifie le consentement stocké écrit un enregistrement d'audit `quota.pool.lending.updated`. Il nomme la clé avec les anciennes et les nouvelles valeurs. Le même organisme envoyé deux fois écrit une fois et audite une fois. La réponse est 200 avec la vue `GET` complète, construite après l'écriture.

La vue `GET` rapporte les prêts comme suit :

- Chaque pool contient `borrowMode` (`saturation` ou `consent`) ainsi que les propres `lendingPercent` et `lendingUntil` de la clé.
- `lendingActive` est `true` uniquement dans un pool `consent`, avec un pourcentage supérieur à 0 et une date limite non atteinte.
- Dans un pool `consent`, chaque `dimensions[].yourShare` dénombrable porte `borrowAvailable`. C'est ce que la clé peut désormais utiliser au-delà de sa part, prêtée par les autres clés.
- `borrowAvailable` utilise la formule de la porte. Il lit toutes les autres clés, même lorsque la clé se trouve sous son partage. Pour une clé `hard`, c'est une lecture supplémentaire par autre clé et dimension dénombrable, en parallèle.
- `borrowAvailable` est `null` pour une clé `soft` ou `burst`, et `null` lorsqu'une lecture échoue.
- `borrowAvailable` est un chiffre pour toutes les autres clés ensemble. Dans un pool de deux clés, c'est la figure de l'autre clé.
- `borrowAvailable` n'est pas encore signalé pour les fenêtres `percent` ou dans `accounts[]`.
- Dans un pool `saturation` la vue rapporte le consentement stocké avec `lendingActive: false` et non `borrowAvailable`.

### Erreurs

Chaque réponse de cette route, succès ou erreur, porte `Cache-Control: no-store`. Un refus qui se produit avant l'exécution de la route ne le porte pas, par exemple le 401 de la politique API du client ou le 403 du filtre IP. Les erreurs de la route utilisent le corps d'erreur standard avec un message fixe : 400 (fournisseur invalide), 401 (clé manquante ou invalide), 403 ( `self:usage` manquant), 404 (drapeau désactivé) et 500 (`Failed to build quota view`). Le 500 couvre tout échec une fois que la requête atteint la route, y compris la recherche de clé elle-même ; sa cause est enregistrée sur le serveur et n'est jamais renvoyée. Les erreurs du `PATCH` sont répertoriées dans [Consentement au prêt](#lending-consent).

### Limites

- `remaining` est la partie de la juste part de la clé qu'il n'a pas utilisée. Ce n'est pas une garantie. Une clé pourra encore être servie au-delà tant que la piscine aura de la place. Une fois que le total du pool atteint `limit`, chaque clé du pool est refusée, quel que soit son propre `remaining`, et une clé sans `self:account-quota` ne peut pas voir ce total.
- `remaining` ne prend pas en compte le `cap` absolu de l'allocation. L'application refuse la clé une fois que sa propre consommation dans une fenêtre de l'unité du plafond atteint la valeur du plafond.
- La barre au niveau du compte provient du cache des limites du fournisseur et peut être décalée de quelques minutes par rapport à la décision d'application. Une lecture dont le temps de réinitialisation est écoulé est signalée par `stale`.
- Les fenêtres par modèle (`modelWindows`) sont signalées uniquement pour les fournisseurs qui disposent d'un mappage plan-fenêtre : Claude et Codex aujourd'hui. Pour les autres fournisseurs, `modelWindows` est toujours présent lorsque les données du compte sont affichées, avec une liste `windows` vide.
- La part de la clé dans une fenêtre `percent` est une estimation. Il provient du livre d'attribution et comporte toutes les limitations répertoriées sous « Dimensions en pourcentage : attribution par clé » ci-dessus.
- `consumed` est le nombre d'applications comparé à la part équitable. C'est exactement `attributed` plus `external`. `attributed` est la partie que le livre donne la clé des jetons qu'il a acheminés. `external` est la partie de l'utilisation du compte que les clés du pool ne prennent pas en compte.
- Les deux parties ne sont envoyées que lorsque le `accountVisible` du pool est vrai : la clé a `self:account-quota` et le fournisseur est dans son `sharedQuotaProviders`. Une clé sans elle obtient `consumed` seul, avec les mêmes `status` et `reason`.
- Avec les deux pièces et son propre poids, un détenteur peut calculer l'utilisation faite à l'extérieur de la piscine qui est imputée aux clés de la piscine. Un titulaire disposant du périmètre du compte voit déjà le total du compte.
- Une clé qui n'a rien acheminé dans la fenêtre peut toujours lire sa charge externe depuis `consumed`, car sa partie attribuée est alors 0.
- Par exemple, un livre s'ouvre à 0, avec les clés A et B ayant chacune un poids de 50. La clé A achemine 900 000 jetons et la clé B 100 000. Le compte atteint alors 60 % d’une limite de 100. Alors `attributed` vaut 54 pour la clé A et 6 pour la clé B, et `external` vaut 0 pour les deux.
- La vue lit le livre et n'écrit jamais son état. Il n’ouvre pas de livre et ne demande jamais de lecture au prestataire. Avec le magasin Redis, une lecture supprime les champs de révision remplacés en arrière-plan, comme le font les lectures de la porte.
- Le partage est `ok` uniquement tandis que le cache du portail contient une lecture du compte. Sans cela, c'est `stale`, donc dans un pool sans demande récente, il apparaît comme étant peut-être obsolète.
- Jusqu'à ce qu'une demande transite par le pool, le partage est indisponible. Cette demande ouvre le livre et le montant du compte à ce moment-là compte comme une utilisation effectuée en dehors du pool.
- Dans un pool comportant plusieurs comptes, chaque entrée de compte utilise le propre livret de ce compte et la limite d'un compte. L’application des règles varie des deux côtés en fonction du nombre de comptes, la proportion est donc la même.
- Les fenêtres par modèle ne comportent aucun partage pour la clé. Le livre ne conserve aucune donnée par modèle.
- Les étages de réserve d'un planning ne sont pas évalués par la vue : un planning peut s'afficher comme `open` alors qu'une demande est refusée avec le motif `schedule-reserve`.
- Lorsque deux pools de la même clé partagent une connexion, l’application applique l’un d’eux et la vue répertorie les deux.
- Il n'y a pas de limite par adresse pour les tentatives de clé infructueuses : derrière un proxy inverse, les appelants peuvent partager une adresse (cela dépend de la confiance ou non des adresses client transférées), de sorte qu'un verrouillage pourrait refuser l'itinéraire à chaque détenteur de clé. Avec `REQUIRE_API_KEY=true`, une clé invalide est refusée par la politique API du client avant l'exécution de la route, avec le corps 401 de cette politique au lieu de celui de cette route.

### Utilisation des membres

Un administrateur peut permettre aux détenteurs de clés de voir comment l'utilisation d'une fenêtre est répartie entre les membres du pool. L'option est le `memberBreakdown` du pool, désactivé par défaut. Il est défini dans l'assistant de pool ou avec `PATCH /api/quota/pools/{id}`. `GET /api/quota/pools` et `GET /api/quota/pools/{id}` le signalent.

Une dimension de la vue porte `members` uniquement lorsque tous ces éléments sont valables :

- l'option de la piscine est activée
- le pool dispose d'au plus 20 clés allouées, et au moins trois d'entre elles peuvent faire des requêtes : actives, non révoquées, non bannies et non expirées
- le `accountVisible` du pool est vrai : la clé a `self:account-quota` et le fournisseur est dans son `sharedQuotaProviders`
- sur une fenêtre `percent`, la connexion du compte est celle que la clé peut utiliser
- la part de la clé dans cette fenêtre a été lue : son `status` n'est pas `unavailable`

Sinon `members` est absent. Ce n'est jamais une liste vide.

- Chaque tranche est `{ slot, consumed, isYou }`. Le schéma de réponse rejette toute autre propriété sur une tranche et une liste de plus de 20 tranches. Les tranches sont répertoriées par ordre d'emplacement.
- Il y a une tranche par clé allouée, dont une clé qui ne peut plus faire de requêtes. Un membre inutile affiche un vrai zéro.
- L'emplacement 1 est toujours la clé demandée, avec `isYou` vrai. Les autres numéros d'emplacement sont des rangs d'un hachage à clé. Il est codé avec `API_KEY_SECRET` et couvre le pool, la clé demandeuse et le membre.
- Les chiffres ne correspondent donc pas entre les détenteurs. Pour un titulaire, ils restent les mêmes entre les visites. Ils peuvent changer lorsqu’une clé rejoint ou quitte le pool, ou lorsque ce secret subit une rotation.
- Sur une fenêtre dénombrable, une tranche est le compteur du membre dans le magasin de quotas, le même compteur que son propre `consumed`.
- Sur une fenêtre `percent` une tranche est la partie `attributed` du membre, issue du même livre lu que le partage de la clé. Les consommations réalisées en dehors du bassin ne sont jamais découpées en tranches. Cette charge est divisée en poids, de sorte que les tranches qui la portaient afficheraient les poids.
- Chaque vue lit une valeur par autre membre et fenêtre dénombrable, en parallèle. Sur une fenêtre `percent`, les tranches ne coûtent aucune lecture au-delà de la lecture du livre du partage. Lorsqu'une valeur ne peut pas être lue, cette fenêtre n'a pas `members` et le partage de la clé reste.
- L'option et le nombre de clés utilisables sont lus une fois par pool, et uniquement pour une clé pouvant voir les données du compte. Un échec de lecture de l'option ou du nombre de clés utilisables désactive les barres pour ce pool. Le serveur enregistre un avertissement et le reste de la vue est construit.

Les barres ne portent ni nom ni identifiant. Ils disent toujours à un détenteur de clé des choses sur les autres membres :

- Les détenteurs peuvent toujours faire correspondre les tranches en fonction de leurs valeurs.
- Une numérotation stable permet à un titulaire de suivre un membre au fil du temps.
- Le nombre de tranches indique le nombre de clés allouées dans le pool.
- Dans un pool de trois clés, quelqu'un qui sait quelle clé a été utilisée peut savoir quelle est la dernière clé utilisée.
- Lorsqu'un pool descend en dessous de trois clés utilisables, les barres disparaissent. Les vues prises plus tôt montrent toujours ce que chaque membre a utilisé.
- Sur une fenêtre dénombrable, le total du pool moins les tranches peut montrer l'utilisation de clés qui ne sont plus allouées.
- Un membre qui affiche zéro sur un compte et utilise sur un autre peut montrer quel membre utilise quel compte.
- Dans un pool dénombrable avec la politique `hard`, une part qui cesse de croître à la juste part d'un membre fait allusion au poids de ce membre.

### Série d'utilisation (`GET /api/v1/me/usage`)

`GET /api/v1/me/usage?range=<range>` (également servi sur `/v1/me/usage`) renvoie l'utilisation et le coût des propres requêtes de la clé appelante : totaux, une entrée par jour UTC, par jour et modèle, par modèle et par fournisseur. Il partage le drapeau, les règles d'authentification, la portée `self:usage`, `Cache-Control: no-store` et le comportement d'erreur de la route de quota ci-dessus. La clé est vérifiée avant `range`. Les erreurs sont 400 (`Invalid range`), 401, 403, 404 et 500 (`Failed to build usage`).

- `range` est l'un des `1d`, `7d`, `30d` (la valeur par défaut) ou `90d`. Toute autre valeur, une valeur vide ou un paramètre répété est un 400. L'ensemble s'arrête à `90d` pour borner le coût d'un appel. La vue lit uniquement l'historique d'utilisation brut, jamais les résumés quotidiens, qui ne contiennent aucune clé.
- Les lignes sont sélectionnées par l'identifiant de la clé appelante. La colonne du nom de clé ne correspond jamais et les lignes enregistrées sans identifiant de clé ne sont jamais comptées.
- La création d'une série exécute cinq requêtes groupées sur les lignes de la clé dans la fenêtre. La série construite est réutilisée pendant 60 secondes par clé et par plage, et un appel réutilisé n'en exécute aucun. Son `generatedAt` donne son âge.
- La fenêtre se termine lorsque la série est construite. Une ligne marquée plus tard, par exemple par décalage d'horloge, n'est pas comptée.
- `coverage.retentionDays` est le paramètre de conservation brut de l'historique d'utilisation de l'opérateur (`retention.usageHistory` dans les paramètres de la base de données). `coverage.truncatedByRetention` est vrai lorsque la plage demandée est plus longue que ce paramètre. Il compare les deux nombres et ne vérifie pas si des lignes manquent réellement.
- Le fournisseur est renvoyé tel qu'enregistré pour les propres demandes de la clé. Model est le nom enregistré après son dernier `/` et les lignes sont regroupées par celui-ci. Une requête combo dont chaque cible a été refusée est enregistrée avec l'étiquette de routage en tant que fournisseur (le nom du combo, `auto` ou `combo`) et la chaîne de modèle envoyée par le client. Les autres demandes refusées, par exemple par un disjoncteur ouvert, un temps de recharge de modèle ou un saut de quota stationné, conservent le fournisseur et le modèle cibles.
- Outre le nombre et les coûts, la réponse comporte une latence moyenne, des taux de réussite ainsi que les heures de la première et de la dernière requête.
- `byModel` répertorie les 50 paires fournisseur-modèle avec le plus de demandes. Avec plus de paires, ses entrées ne totalisent pas `summary`, et `summary.uniqueModels` compte chaque orthographe de modèle enregistrée. `byModelTruncated` est alors vrai, et un modèle dont les paires se situent des deux côtés de la coupe montre des totaux partiels.
- Deux coûts sont signalés. `costUsd` est le coût facturé, comme le montrent les analyses d'utilisation. Les fournisseurs d'abonnements forfaitaires, tels que le forfait Claude Code, y comptent 0 $. `listPriceUsd` est le même usage au prix catalogue, abonnements inclus. Une requête dont le modèle n'a pas de ligne de prix compte son coût stocké : un coût signalé par le fournisseur ou calculé lors de l'enregistrement de la requête. Seule une requête sans aucun compte 0, sans marqueur, donc un total peut être partiel.
- Le contrat de réponse est `src/shared/schemas/selfUsage.ts` (`SelfUsageSeries` dans `docs/openapi.yaml`).

### Page libre-service

Avec `QUOTA_SELF_PANEL` activé, `/quota/{provider}` est une page publique. Un détenteur de clé y saisit une clé API et voit les pools de cette clé pour le fournisseur. Chaque pool affiche une carte par fenêtre de pool, avec l'utilisation du pool pour tout le monde et la propre part de la clé. Chaque compte du pool possède ses propres cartes, avec l'utilisation du compte et le partage de la clé. L'utilisation du compte apparaît uniquement lorsque la clé peut voir les données du compte. La page répertorie également les limites par modèle de chaque compte et la propre utilisation de la clé. Un avis apparaît lorsqu'un planning bloque la clé en ce moment. Une carte répertorie chaque capuchon par modèle de clé avec son utilisation et marque ceux atteints. `{provider}` est un identifiant de fournisseur ou son alias (`/quota/claude`, `/quota/cc`). Un fournisseur inconnu et chaque chemin `/quota/*` lorsque l'indicateur est désactivé, répondez 404. Les pools sur un nœud personnalisé compatible OpenAI ou Anthropic n'ont pas de page. Le API répond toujours à leur place.

La page n'a pas de session. La clé est envoyée uniquement dans l'en-tête `Authorization` de `GET /api/v1/me/quota/{provider}`, `PATCH /api/v1/me/quota/{provider}` et `GET /api/v1/me/usage`, jamais dans un URL. Une clé acceptée par le serveur est conservée dans le `sessionStorage` de l'onglet. Avec "Mémoriser sur cet appareil", il est conservé dans `localStorage` et "Oublier la clé" le supprime des deux. Une clé rejetée par le serveur est supprimée du stockage.

Un pool en mode `consent` affiche une carte de prêt. Là, le détenteur de la clé définit un pourcentage entier de 0 à 100 de la part inutilisée de la clé à prêter. Le titulaire choisit également la durée du consentement : jusqu'à la désactivation, 1 heure, 8 heures, 24 heures, 7 jours ou 30 jours. Une durée compte à partir du moment de la sauvegarde. Tant qu'un délai est en vigueur, le titulaire peut le conserver. Si ce délai passe avant la sauvegarde, la carte n'envoie rien et demande un autre choix. Avec 0%, aucune date limite n'est envoyée. La carte affiche la date limite enregistrée avec son fuseau horaire nommé. Un consentement dont le délai est dépassé est affiché comme terminé.

Pour une clé `hard` la carte répertorie également, par fenêtre de pool, quelles autres clés prêtent actuellement à la clé. Chaque ligne correspond à un chiffre pour toutes les autres clés ensemble. Dans un pool de deux clés, c'est la figure de l'autre clé. Un chiffre que la vue ne signale pas est considéré comme non disponible et non comme nul. Pour une clé `soft` ou `burst` la carte indique qu'aucun chiffre ne s'applique.

Un pool en mode `saturation` dont la clé stocke un pourcentage supérieur à 0 affiche uniquement un retrait. Il indique que le pourcentage stocké n’a aucun effet. Son bouton Retirer envoie 0 sans date limite. Un pool en mode `saturation` avec un 0 stocké n'affiche aucune carte de prêt. Après une sauvegarde, une carte dont la vue renvoyée n'a plus besoin reste avec son message jusqu'à ce que la vue de la page change à nouveau.

Rien n'est enregistré jusqu'à ce que le titulaire appuie sur Enregistrer ou Retrait. Chaque pression envoie une requête `PATCH /api/v1/me/quota/{provider}`, et une deuxième pression n'envoie rien pendant que la première est en attente. Le corps porte le `ref` opaque de la piscine de la vue, du pourcentage et du délai. La réponse est la vue des quotas reconstruite, et la page l'affiche sans seconde lecture. Lorsque deux sauvegardes se chevauchent, la page lit le quota une fois après la dernière réponse. La page ne conserve pas le consentement dans le stockage du navigateur.

Un changement refusé est expliqué sur la carte par un texte choisi dans le statut HTTP. Le corps de l'erreur n'est pas lu. Un 401 indique que la clé n'a pas été acceptée et recharge le quota. Un 403 indique que le pool n'accepte pas les modifications de prêt, et un 404 indique que le pool a disparu. Les deux proposent un bouton qui recharge le quota. Une réponse 400 ou autre 4xx demande au titulaire de vérifier le pourcentage et le délai. Un 429 demande au titulaire d'attendre, aux secondes de `Retry-After` lorsque la réponse lui donne. Une réponse 5xx, un 408 ou une panne de réseau indique que la modification n'a peut-être pas été enregistrée et conserve les valeurs saisies. Une réponse hors contrat recharge le quota. Un échec de sauvegarde ne supprime pas la clé d’elle-même. Lorsque le rechargement après celui-ci est refusé, la page supprime la clé comme pour toute lecture refusée.

Une fois qu'une clé est acceptée, la page affiche également une carte « Configurer vos outils » avec trois onglets. "Claude Code" donne le bloc `env` pour `~/.claude/settings.json`. "Shell" donne les mêmes variables que les lignes `export`. "Claude Desktop " donne les valeurs de sa fenêtre d'inférence tierce. Les modèles sont les modèles de partage de quotas que la clé peut appeler pour ce fournisseur. Lorsqu'aucune liste de ce type n'est fournie avec la clé, le bloc active à la place la découverte du modèle de passerelle. L'adresse de la passerelle est l'origine API publique signalée par le serveur (`OMNIROUTE_PUBLIC_API_BASE_URL`, puis `OMNIROUTE_PUBLIC_BASE_URL`). Lorsque ni l'un ni l'autre n'est défini, la carte affiche un espace réservé et demande au titulaire de demander à l'administrateur. La clé est affichée comme espace réservé. "Inclure ma clé" place la clé entière dans le texte à l'écran et dans ce qu'un bouton de copie copie. Cela dure jusqu'à ce que la case soit effacée, que la clé soit oubliée ou remplacée, ou que la page soit quittée. La carte n'envoie aucune requête et ne propose aucun téléchargement de fichier.

Une lecture des marques API `stale` est indiquée comme étant peut-être obsolète. Une lecture marquée `unavailable` est affichée avec sa raison, jamais comme zéro.

Sur les plans à pourcentage, la page dessine la propre part de la clé lorsque le API le signale. Il indique que le nombre est une estimation et nomme ses deux parties. Les limites par modèle affichent uniquement le compte.

Lorsqu'une fenêtre porte `members`, sa carte affiche également une barre avec un segment par membre, dans l'ordre des emplacements. Le segment de la clé demandée utilise la couleur d'accentuation. Les autres segments parcourent les couleurs du graphique du thème. Une légende textuelle répertorie chaque segment avec sa valeur, donc rien ne dépend de la couleur. Les segments sont étiquetés `You` ou `Member N`, où N est l'emplacement.

### Port dédié à la page

`QUOTA_PANEL_PORT` ouvre un deuxième écouteur qui dessert uniquement la page libre-service. Il est désactivé sauf si la variable est définie. `QUOTA_PANEL_HOST` est l'adresse de liaison et la valeur par défaut est `127.0.0.1`.

L'auditeur relaie ces chemins vers le port principal et répond 404 pour chaque autre chemin :

| Chemin                                                                   | Sert                                       |
| ------------------------------------------------------------------------ | ------------------------------------------ |
| `/quota/{provider}`                                                      | La page                                    |
| `/api/v1/me/quota/{provider}`, `/v1/me/quota/{provider}`                 | La vue de quota que lit la page            |
| `/api/v1/me/usage`, `/v1/me/usage`                                       | La série d'utilisation que lit la page     |
| `/_next/static/`                                                         | Scripts, styles et polices de construction |
| `/favicon.ico`, `/favicon.svg`, `/icon-512.png`, `/apple-touch-icon.png` | Icônes                                     |

`GET` et `HEAD` sont relayés sans corps. Une requête avec un corps est également relayée : un `PATCH` du chemin de vue des quotas, que la page envoie pour enregistrer un choix de prêt. Toute autre méthode répond à 404, sauf une requête CONNECT, dont la connexion est fermée sans réponse. Toute autre requête qui déclare un corps répond 404 et sa connexion est fermée. Les demandes de surclassement sont refusées et leur connexion est fermée. Un chemin avec un segment de point ou un marqueur de fragment est refusé, comme sur le port API. Il en va de même pour une cible de requête avec un caractère en dehors ASCII imprimable. L'analyseur HTTP répond 400 à un caractère de contrôle brut dans la cible, avant la propre vérification de ce port. Les en-têtes de requêtes que le framework réserve pour son propre usage ne sont pas relayés : les noms qui commencent par `x-middleware-`, `x-invoke-`, `x-nextjs-`, `x-now-` ou `x-next-`, et les noms `x-matched-path` et `next-resume`. La demande est relayée sans eux. Le tableau de bord, la page de connexion, la gestion API et les routes d'inférence ne sont pas accessibles via ce port.

Le `PATCH` doit porter `Content-Type: application/json`, sans paramètre ou avec `charset=utf-8` uniquement. Il doit contenir un `Content-Length` de 1 à 4096, écrit sous forme de chiffres simples, et aucun `Transfer-Encoding`. Un `PATCH` qui enfreint l'une de ces règles répond 404. Certaines longueurs mal formées, comme une longueur signée ou répétée, reçoivent une réponse 400 par l'analyseur HTTP avant la propre vérification de ce port. Le port lit les octets déclarés avant de contacter le port principal et les attend au maximum 5 secondes. Un corps qui n'est pas complet à ce moment-là répond 404 et sa connexion est fermée. Dans ce cas, rien n'atteint le port principal ou lorsque le client part en premier. Le port relaie exactement les octets déclarés, avec le même `Content-Length`. Les octets qui les suivent sont lus comme prochaine requête sur la connexion. Un proxy inverse TLS devant doit transmettre `Content-Length` et ne doit pas re-découper le corps de la requête. Le port principal vérifie la clé API dans l'en-tête `Authorization`, comme pour le `GET`.

Le corps 404 est `{"error":"not_found","message":"Not found."}`. Un relais défaillant répond 502 (`api_bridge_unavailable`) ou 504 (`api_bridge_timeout`) sans champ `detail`.

L'auditeur ne lit pas `QUOTA_SELF_PANEL` et n'allume pas la page. Pendant que le drapeau est éteint, la page et son API répondent 404 sur le port principal, et l'auditeur relaie cette réponse.

Sous le serveur de développement (`next dev`), la page ne devient pas interactive via ce port. Le socket de rechargement à chaud de développement est une demande de mise à niveau et le port la refuse. Utilisez le port principal pendant le développement.

Le port sert HTTP simple et la page envoie des clés API. Conservez l'adresse de liaison par défaut et placez un proxy inverse avec TLS devant. Une adresse de liaison autre que le bouclage enregistre cet avis :

```text
[Quota Panel] Bound to <host>. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.
```

Un homologue de bouclage qui n’envoie aucun en-tête de transfert est considéré comme local sur le port principal. Un proxy sur le même hôte doit donc envoyer `X-Forwarded-For`. Un proxy sur une adresse privée est approuvé pour cet en-tête uniquement avec `OMNIROUTE_TRUST_PROXY=private` (ou `lan`). Tout autre homologue est signalé par l'adresse de sa connexion et les en-têtes de transfert qu'il a envoyés sont supprimés.

L'auditeur détient au maximum 256 connexions à la fois. Un client dispose de 10 secondes pour envoyer les en-têtes de requête et de 30 secondes pour envoyer l'intégralité de la requête. Une connexion inactive maintenue en activité se ferme après environ 5 secondes. Une connexion sans activité pendant 60 secondes est fermée. Ces valeurs sont fixes. Définissez également les limites de connexion et de débit sur le proxy inverse en face. Un proxy inverse en face doit conserver ses connexions montantes inactives pendant moins de 5 secondes, ou ne pas les réutiliser. Le relais vers le port principal utilise les délais d'attente en amont du port API (`API_BRIDGE_*`).

L'écouteur démarre également lorsque `API_PORT` n'est pas défini. `QUOTA_PANEL_PORT` doit être un port compris entre 1 et 65535, écrit uniquement en chiffres. Il doit différer du port du tableau de bord et du port API. Pendant que le serveur WebSocket en direct est activé, il doit également différer de `LIVE_WS_PORT` (20132 par défaut). Toute autre valeur n'ouvre rien et enregistre un avertissement. Un avertissement concernant une valeur refusée nomme la variable et ne répète pas la valeur. Un port déjà utilisé n'ouvre rien et enregistre cet avertissement :

```text
[Quota Panel] Port <port> is already in use. The quota panel port stays off.
```

Avec `OMNIROUTE_BASE_PATH` défini, l'auditeur attend chaque chemin ci-dessus sous ce préfixe. Utilisez le même `OMNIROUTE_BASE_PATH` au moment de la construction et au moment de l'exécution. Écrivez-le avec une barre oblique de début et aucune barre oblique de fin, par exemple `/omniroute`. Une autre forme, notamment `/` et `/omniroute/`, laisse le port désactivé avec un avertissement, bien que la version accepte ces formes. Il en va de même pour un chemin de base dont le premier segment nomme une route d'application : `api`, `v1`, `v1beta`, `_next`, `quota`, `dashboard`, `docs`, `login`, `codex`, `responses`, `anthropic`, `openai`, `v0` ou `connect`, dans tous les cas.

Limites:

- `/quota/{provider}/` avec une barre oblique finale répond 404 sur ce port.
- Le service worker et le manifeste de l'application Web ne sont pas servis sur ce port.
- Une favicon personnalisée définie dans le tableau de bord n'est pas affichée sur ce port.
- Les icônes ne s'affichent pas lorsque l'application s'exécute sous un chemin de base.
- Le port parle clairement HTTP/1.1.
- Une liaison qui échoue n'est pas réessayée jusqu'au redémarrage du processus.
- L'auditeur n'a pas de limite de connexion ni de débit par adresse client.
- Les configurations de conteneurs ne sont pas couvertes par cette section.

---

## Variables d'environnement

| Variable                             | Défaut         | Description                                                                           |
| ------------------------------------ | -------------- | ------------------------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`                 | `sqlite`       | Pilote à utiliser : `sqlite` ou `redis`                                               |
| `QUOTA_STORE_REDIS_URL`              | _(vide)_       | Redis URL, par exemple `redis://localhost:6379`                                       |
| `QUOTA_SATURATION_THRESHOLD`         | `0.5`          | 0..1 ; `>= threshold` active le mode strict                                           |
| `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` | `1000`         | Jetons qui expliquent au plus un point de pourcentage de la fenêtre du plan           |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`     | `0.7`          | 0..1 ; multiplicateur pour le score combiné de politique souple                       |
| `QUOTA_CONSUMPTION_RETENTION_DAYS`   | `14`           | Quelques jours avant que GC ne supprime les anciens compartiments `quota_consumption` |
| `QUOTA_PANEL_PORT`                   | _(non défini)_ | Port dédié à la page libre-service. Désactivé signifie pas d'écouteur.                |
| `QUOTA_PANEL_HOST`                   | `127.0.0.1`    | Lier l'adresse pour ce port                                                           |

Les paramètres DB (`quotaStore.*`) remplacent les variables d'environnement.

---

## Dépannage

### Redis est configuré, mais ne se connecte pas

Vérifiez que `ioredis` est installé (`npm ls ioredis`) et que `QUOTA_STORE_REDIS_URL`
est accessible. En cas d’échec de connexion, la fabrique se rabat sur SQLite (consigné au
niveau `warn`).

### `peek` renvoie des données obsolètes / autorise en cas d’échec

Si `peek` lève une exception, `enforceQuotaShare` traite le résultat comme une « autorisation » (autorisation en cas d’échec).
Consultez les journaux `pino` pour rechercher les entrées `quota:enforce` et `quota:factory` afin d’identifier
la cause racine.

### Dérive du compteur de consommation

Si l’utilisation réelle du fournisseur diffère des compteurs, cela est normal : la
fenêtre glissante à 2 compartiments présente une erreur d’environ 1 % aux limites de la fenêtre, et `consume` est
exécuté sans attendre de résultat après la réponse. Le signal de saturation (`saturationSignals.ts`)
lit l’utilisation réelle du fournisseur avec une durée de vie de cache de 30 s et ajuste `globalUsedPercent`
en conséquence.

### Le pool affiche « aucune donnée » pour le taux de consommation

`computeBurnRate` nécessite au moins 2 échantillons historiques. Les nouveaux pools sans appels
préalables à `consume` afficheront `tokensPerSecond: 0` et `timeToExhaustionMs: null`.

---

## Migration depuis localStorage

Lors du premier chargement de `/dashboard/costs/quota-share`, le hook `useLocalStoragePoolMigration`
vérifie que :

1. `localStorage.getItem("omniroute:quota-share:pools")` n'est pas vide.
2. `GET /api/quota/pools` renvoie `[]` (la BDD est vide).

Si ces deux conditions sont remplies, il envoie chaque pool hérité à `POST /api/quota/pools` par lots,
puis supprime la clé localStorage. La migration est idempotente : la condition 2 empêche
toute nouvelle migration.

---

## Classification interne de la stratégie

`quota-share` est une stratégie de routage **réservée à un usage interne** (`INTERNAL_ROUTING_STRATEGY_VALUES` dans
`src/shared/constants/routingStrategies.ts`). Elle est utilisée exclusivement par les combinaisons de pools `qtSd/`
générées par le système et est délibérément exclue de `ROUTING_STRATEGY_VALUES` afin qu'elle
n'apparaisse jamais comme une option sélectionnable par l'utilisateur dans l'interface ou l'API.

---

## Couverture des tests

Deux couches de couverture automatisée sont livrées avec le moteur de partage de quotas :

| Suite                 | Commande                                                               | Ce qu'il couvre                                                                                                                                                                                                               |
| :-------------------- | :--------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unité (29 épreuves)   | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | planificateur DRR, contrôle de saturation, plafonds de concurrence, mathématiques fairShare, mise en file d'attente des arriérés                                                                                              |
| Matrice d'intégration | `npm run test:combo:matrix`                                            | Décision de routage de bout en bout via le véritable pipeline combo ; DRR fairness dépriorisation de la saturation + via des coutures en direct (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

La matrice d'intégration s'exécute dans CI aux côtés des 22 stratégies publiques. La suite d'unités peut être exécutée de manière autonome.

---

## Résumé du schéma DB

Trois tables ajoutées par les migrations `078`, `079` et `085`:

- Définitions de pool `quota_pools` + `quota_allocations` — et allocations par clé.
- `quota_consumption` — compteurs roulants à 2 seaux par `(apiKeyId, dimensionKey)`.
- Remplacements manuels du plan du fournisseur `provider_plans` — (dimensions JSON par connectionId).

Toutes les tables ajoutées via des migrations idempotentes `CREATE TABLE IF NOT EXISTS`.

Le prêt consenti ajoute trois colonnes : `quota_allocations.lending_percent` (entier, 0 par défaut), `quota_allocations.lending_until` (époque en millisecondes ou `NULL` sans délai) et `quota_pools.borrow_mode` ( `saturation` par défaut). Sa migration ajoute uniquement ces colonnes et n'écrit aucune ligne existante.

Le livre d'attribution en pourcentage ajoute `quota_percent_ledger` (une ligne par pool, compte et fenêtre de plan) et `quota_percent_ledger_tokens` (un compteur de jetons par pool, compte et clé API ). `src/lib/db/quotaPercentLedger.ts` les lit et les écrit.
