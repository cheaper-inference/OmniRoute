# Chaos Mode (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Tableau de bord :** **Mode Chaos** (barre latérale) → `/dashboard/chaos`  
> **API :** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (session du tableau de bord) · `POST /api/skills/collect/chaos` (clé API)  
> **Source :** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Le Mode Chaos envoie **une tâche à plusieurs fournisseurs simultanément** — chaque fournisseur participant
contribue avec une instance de modèle, et vous obtenez toutes les réponses côte à côte (ou enchaînées). Il s'agit
d'une surface d'exécution multimodèle, et non d'une stratégie de routage : votre trafic habituel
`/v1/chat/completions` n'est jamais affecté.

**Clarification — trois éléments différents comportent « chaos » dans leur nom :**

| Élément                      | Description                                                                                                                                                                                          | Documentation                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Mode Chaos**               | La page du tableau de bord et l'API décrites ici : distribue une tâche à de nombreux fournisseurs (en parallèle ou de manière collaborative).                                                        | Ce guide                                     |
| `auto/chaos`                 | Identifiant de modèle Auto-Combo : distribution parallèle, un modèle par fournisseur, avec un appel en amont chacun. Ce n'est pas de l'injection de pannes ([détails](#autochaos-parallel-fan-out)). | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Configuration de combo Chaos | Un combo persistant avec `config.chaos.enabled` effectue la même distribution (API uniquement) ; `judgeModel` sélectionne seulement la réponse finale, sans appel de synthèse.                       | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos` : distribution parallèle

`auto/chaos` n'est **pas** un mécanisme d'injection de pannes ni de test de résilience. Une requête avec
`model: "auto/chaos"` sur `/v1/chat/completions` :

1. Constitue un panel d'**un modèle par fournisseur** : le premier candidat de chaque
   fournisseur connecté, dans l'ordre du groupe de candidats, jusqu'à 5 membres
   (`OMNIROUTE_CHAOS_MAX_PANEL`, plafonné à 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). Le jeu de pondérations `chaos-mode`
   définit uniquement le `weight` de chaque membre ; la distribution ne le consulte pas.
2. Envoie la même requête à chaque membre du panel **en parallèle** ; une requête
   coûte donc un appel en amont par membre du panel
   (`open-sse/services/autoCombo/chaosEngine.ts`, déclenché depuis
   `open-sse/services/combo.ts`).
3. Diffuse une ligne d'état par membre du panel au fur et à mesure de son arrivée : un commentaire SSE
   (`: chaos <index> ok|fail <model>`) par défaut, ainsi qu'un événement `omni-chaos-part`
   (`model`, `index`, `ok`, `error`) lorsque la requête définit
   `stream_options.include_chaos_parts: true`. Ceux-ci ne contiennent aucun texte de réponse.
4. Envoie **une seule** réponse du panel comme bloc final au format OpenAI : celle du premier membre
   du panel (`auto/chaos` le définit comme `judgeModel`) en cas de réussite, sinon
   celle du dernier membre ayant réussi. Les autres réponses du panel ne sont pas renvoyées :
   vous payez donc pour N appels et ne recevez qu'une seule complétion.

## Installation

1. Ouvrir** Tableau de bord → Chaos Mode** (`/dashboard/chaos`).
2. Tournez-le** sur** Navires — mode Chaos** désactivé par défaut** (`enabled: false` dans `src/lib/chaos/chaosConfig.ts`). Lorsqu'il est désactivé, `POST /api/chaos/run` répond `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Choisissez les participants et les valeurs par défaut (conservées par instance via le magasin de paramètres) :

   | Champ               | Signification                                                                  | Valeur par défaut/limites                     |
   | ------------------- | ------------------------------------------------------------------------------ | --------------------------------------------- |
   | `enabled`           | Interrupteur principal                                                         | `false`                                       |
   | `defaultMode`       | `parallel` ou `collaborative` (voir ci-dessous)                                | `parallel`                                    |
   | `providerOverrides` | Participation par fournisseur (`providerId`, `modelId` facultatif , `enabled`) | = vide pour chaque fournisseur actif, max 200 |
   | `systemPrompt`      | Remplacer l'invite système Chaos intégrée                                      | facultatif, max 10 000 caractères             |
   | `timeoutMs`         | Durée maximale par appel de modèle                                             | `120000` (5 000–600 000)                      |
   | `maxTokens`         | `max_tokens` par appel de modèle                                               | `4096` (256–128 000)                          |

4. Donnez à chaque fournisseur participant un** modèle** . Le modèle d'un fournisseur est le `modelId` de son remplacement activé sur la page Chaos Mode (il gagne), sinon le** modèle par défaut** de sa connexion. Un identifiant de fournisseur n’est jamais utilisé comme nom de modèle. Un fournisseur sans aucun des deux n'est** pas appelé** : il apparaît dans les résultats sous la forme `status: "error"` avec le message _"Aucun modèle défini pour ce fournisseur. Définissez un modèle pour celui-ci sur la page Chaos Mode ou un modèle par défaut sur la connexion."_ et un `modelId` vide, tandis que les autres fournisseurs fonctionnent normalement. Si aucun fournisseur sélectionné n'a de modèle, l'exécution échoue avant toute requête en amont avec _"Aucun fournisseur n'a de modèle défini. …"_ (HTTP 500 sur les deux points de terminaison).
5. Exécutez un** tester depuis la page elle-même** — le panneau de résultats affiche la réponse, le statut et la durée de chaque fournisseur.

## Modes d'exécution

- **`parallel`** — chaque modèle reçoit simultanément la même tâche ; vous recevez toutes les réponses
  indépendamment.
- **`collaborative`** — les modèles s'exécutent **en chaîne** : chacun voit la sortie du modèle précédent et
  doit l'affiner, l'enrichir, la critiquer ou proposer une autre approche. Le champ `summary` de la réponse
  concatène les sorties réussies dans l'ordre de la chaîne (les exécutions parallèles ne comportent pas de `summary`).

## API

### session de tableau de bord `POST /api/chaos/run` —

Authentifié par cookie (la session de gestion — voir [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ); utilisé par la page du tableau de bord.

```jsonc
// body
{
  "task": "Compare approaches to X", // required
  "providers": ["glm", "kimi"], // optional filter
  "mode": "parallel", // optional — overrides defaultMode
  "systemPrompt": "…", // optional override
  "maxTokens": 4096, // optional override
}
```

### clé `POST /api/skills/collect/chaos` — API

Variante de jeton au porteur pour les appelants externes. La clé doit porter le** Autorisation du mode Chaos** (`chaosModeEnabled`), qui est** désactivé par défaut** — l'active par clé** Tableau de bord → API Manager → modifier la clé autorisations → → Chaos Mode** . Même corps que ci-dessus.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Les deux points de terminaison renvoient la même forme :

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // collaborative mode only
}
```

## Dépannage

- **`400 Chaos Mode is not enabled`** — étape 2 ci-dessus : le commutateur global est désactivé.
- **La clé API est rejetée sur `/api/skills/collect/chaos`** — la clé ne dispose pas de l'autorisation `chaosModeEnabled` par clé (désactivée par défaut ; il s'agit d'un paramètre, pas d'une erreur).
- **Un fournisseur montre `No model set for this provider`** — définit son modèle sur la page Chaos Mode ou un modèle par défaut sur sa connexion (voir Configuration, étape 4).
- **Un prestataire que vous attendiez est absent des résultats** — vérifie `providerOverrides` sur la page Chaos Mode (un remplacement désactivé l'exclut) et si la connexion du fournisseur est active.
