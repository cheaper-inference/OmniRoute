# OmniRoute A2A Server Documentation (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Protocole Agent-to-Agent v0.3 — OmniRoute comme agent de routage intelligent

L’interface A2A présente deux facettes :

- **JSON-RPC 2.0** sur `POST /a2a` (point d’entrée canonique, défini dans `src/app/a2a/route.ts`).
- **REST** sous `/api/a2a/*` pour les tableaux de bord et les outils (état, liste des tâches, annulation).

Les tâches sont suivies par `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, durée de vie par défaut de 5 minutes). Les compétences sont distribuées via `A2A_SKILL_HANDLERS` dans `src/lib/a2a/taskExecution.ts`.

## Découverte de l’agent

```bash
curl http://localhost:20128/.well-known/agent.json
```

Renvoie la carte de l’agent décrivant les capacités, les compétences et les exigences d’authentification d’OmniRoute.

Le champ `version` de la carte de l’agent provient de `process.env.npm_package_version` (voir `src/app/.well-known/agent.json/route.ts:13`), ce qui lui permet de rester automatiquement synchronisé avec `package.json` à chaque version publiée.

---

## Authentification

Toutes les requêtes vers `/a2a` nécessitent une clé API transmise via l’en-tête `Authorization` :

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Si aucune clé API n’est configurée sur le serveur, l’authentification est contournée.

## Activation

A2A est contrôlé par le commutateur **Endpoints → A2A** et est désactivé par défaut. Lorsqu’il est désactivé,
`GET /api/a2a/status` indique `status: "disabled"` et `online: false` ; les appels JSON-RPC vers
`POST /a2a` renvoient une réponse HTTP 503 avec le code d’erreur JSON-RPC `-32000`.

---

## Méthodes JSON-RPC 2.0

### `message/send` — Exécution synchrone

Envoie un message à une compétence et attend la réponse complète.

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/send",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Write a hello world in Python"}],
      "metadata": {"model": "auto", "combo": "fast-coding"}
    }
  }'
```

Pour `smart-routing`, `metadata.combo` remplace explicitement
`metadata.model` dans la requête adressée à la passerelle ; il est envoyé comme véritable `model`,
et non comme un champ JSON `x-combo` ignoré. Les règles habituelles d’autorisation par clé d’API et
par cible de la passerelle continuent de s’appliquer. Un combo non valide ou vide est rejeté.

Le résultat expose `requested_combo` (intention de l’appelant), `dispatched_model`
(la requête réellement adressée à la passerelle), `response_model` (réponse de la passerelle) et
`confirmed_combo`. Ce dernier champ vaut `null`, sauf si la passerelle
identifie explicitement un combo. Les journaux de décision A2A attribuent l’exécution uniquement à un
combo confirmé, tandis qu’une requête non confirmée est conservée sous `requestedCombo`.

**Réponse :**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "requested_combo": "fast-coding",
      "confirmed_combo": null,
      "dispatched_model": "fast-coding",
      "response_model": "claude-sonnet",
      "cost_envelope": { "estimated": 0.005, "actual": 0.003, "currency": "USD" },
      "resilience_trace": [
        { "event": "primary_selected", "provider": "anthropic", "timestamp": "..." }
      ],
      "policy_verdict": { "allowed": true, "reason": "within budget and quota limits" }
    }
  }
}
```

### `message/stream` — Diffusion SSE

Identique à `message/send`, mais renvoie des événements Server-Sent Events pour une diffusion en temps réel.

```bash
curl -N -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/stream",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Explain quantum computing"}]
    }
  }'
```

**Événements SSE :**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Interroger l’état d’une tâche

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Annuler une tâche

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Compétences disponibles

OmniRoute expose 6 compétences A2A câblées dans `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Chaque module de compétence réside dans `src/lib/a2a/skills/`.

| Compétence                | ID                   | Description                                                                                                                                                                                   | Balises                            | Exemples                                            |
| :------------------------ | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------- | :-------------------------------------------------- |
| Routage intelligent       | `smart-routing`      | Achemine une invite via le provider/combo optimal à l'aide du moteur combiné de notation + de OmniRoute                                                                                       | routage, fournisseurs              | "Acheminer cette invite via le meilleur modèle"     |
| Gestion des quotas        | `quota-management`   | Rapporte l'état du quota par fournisseur, aide les appelants à décider quand throttle/switch                                                                                                  | quotas, fournisseurs               | "Vérifier le quota pour les anthropiques"           |
| Découverte du fournisseur | `provider-discovery` | Répertorie les fournisseurs installés avec des capacités, des indicateurs de niveau gratuit et le statut OAuth                                                                                | prestataires, découverte           | « Quels sont les fournisseurs disponibles ? »       |
| Analyse des coûts         | `cost-analysis`      | Estimation du coût d'un request/conversation compte tenu de l'utilisation récente du catalogue +                                                                                              | coût, utilisation                  | "Estimer le coût de cette conversation"             |
| Rapport de santé          | `health-report`      | Disjoncteur d'agrégats, temps de recharge, état de verrouillage par fournisseur                                                                                                               | santé, résilience                  | "Afficher l'état de santé de tous les prestataires" |
| Capacités de liste        | `list-capabilities`  | Renvoie le catalogue complet de compétences d'agent de 45 entrées (configuration 23 API + 21 CLI + 1) sous forme de tableau de démarques avec SKILL.md URLs brut pour l'injection de contexte | catalogue, découverte, compétences | "Répertorier toutes les fonctionnalités OmniRoute " |

> La carte d'agent doit rester alignée sur le catalogue en direct du fournisseur 385 ; le nombre de fournisseurs et les métadonnées free/no-auth proviennent du registre d’exécution.

### Détail de la compétence `list-capabilities`

La compétence `list-capabilities` est particulièrement utile pour les agents externes qui doivent découvrir ce que OmniRoute expose avant d'envoyer des appels API. Il renvoie un artefact de table de démarques structuré :

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Chaque ligne comprend la colonne `rawUrl` afin que les agents puissent immédiatement récupérer l'intégralité SKILL.md. Le champ `metadata.totalSkills` reflète la taille du catalogue (45 aujourd'hui). Implémentation : `src/lib/a2a/skills/listCapabilities.ts`. Voir aussi [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (auxiliaire)

Le point de terminaison JSON-RPC `/a2a` est le point d'entrée canonique A2A. Les points de terminaison REST ci-dessous fournissent un accès auxiliaire aux tableaux de bord et aux outils externes :

| Point de terminaison         | Méthode | Description                                                              | Authentification                                                                                                     |
| :--------------------------- | :------ | :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET     | Statut du serveur, compétences enregistrées                              | (publique)                                                                                                           |
| `/api/a2a/tasks`             | GET     | Répertorier les tâches avec des filtres                                  | clé de gestion ou API (voir ci-dessous)                                                                              |
| `/api/a2a/tasks/[id]`        | GET     | Obtenir la tâche par ID                                                  | clé de gestion ou API (voir ci-dessous)                                                                              |
| `/api/a2a/tasks/[id]/cancel` | POST    | Annuler la tâche en cours                                                | clé de gestion ou API (voir ci-dessous)                                                                              |
| `/.well-known/agent.json`    | GET     | Carte d'agent (découverte A2A )                                          | (public, 3600 mis en cache)                                                                                          |
| `/api/a2a/tasks`             | POST    | Délégation entrante à la flotte OmniConductor (Chef d'orchestre PRD RF5) | identique à `GET`, plus `OMNIROUTE_API_KEY` s'il est défini alors que `REQUIRE_API_KEY` est désactivé ; `a2aEnabled` |

Qui accède aux routes `/api/a2a/tasks*` dépend des paramètres de connexion et de la clé API :

- `requireLogin=true` (par défaut) : le middleware n'admet que les informations d'identification de gestion (session de tableau de bord, clé `manage` -scope API, jeton d'accès `oma_` ) et `OMNIROUTE_API_KEY`. Une simple clé d'inférence obtient `403`. Dans l'en-tête `Authorization`, le middleware prend uniquement `OMNIROUTE_API_KEY` comme `Bearer <key>`; une clé nue ou un onglet après `Bearer` obtient `401`.
- `requireLogin=false`, ou la fenêtre de bouclage avant l'intégration : avec `REQUIRE_API_KEY=true` toute clé OmniRoute API valide ou identifiant de gestion est accepté et les appelants anonymes obtiennent `401`; avec `REQUIRE_API_KEY` off les itinéraires sont ouverts.
- `POST /api/a2a/tasks` nécessite en outre `OMNIROUTE_API_KEY` dans l'en-tête `Authorization` lorsque cette variable est définie et `REQUIRE_API_KEY` est désactivé. Les autres en-têtes, tels que `x-api-key`, n'y comptent pas. Avec la connexion désactivée ou avant l'intégration, la clé passe avec ou sans préfixe `Bearer` ; avec la connexion activée, seul `Bearer <key>` dépasse le middleware.

Lorsqu'un identifiant est requis, un jeton `read` -scope `oma_` ne fonctionne que pour `GET`.

**Délégation de conducteur entrant (`POST /api/a2a/tasks`) :** les agents A2A externes délèguent le travail de codage à la flotte OmniConductor via OmniRoute. Corps : `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — seules les compétences de la flotte de conducteur (celles annoncées sur la carte d'agent) sont délégables ; `metadata.conductor.repo.url` est requis (la flotte fonctionne sur les dépôts git). La route se traduit par le `POST /v1/tasks` du hub en utilisant le `CONDUCTOR_ORCHESTRATOR_TOKEN` côté serveur (repli `CONDUCTOR_HUB_TOKEN`) et renvoie `201 { conductor_task_id, state: "submitted" }`; les états de tâche reviennent à travers le miroir SSE→A2A (RF1) et sont visibles via `GET /api/a2a/tasks?skill=conductor`.

---

## Ajouter une nouvelle compétence

1. **Créer un fichier de compétences :** `src/lib/a2a/skills/<your-skill>.ts`

   Exportez une fonction asynchrone `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>`. Suivez la forme des compétences existantes telles que `smartRouting.ts`. Si la compétence rappelle OmniRoute via HTTP, créez les en-têtes avec `buildSelfLoopHeaders(caller)` à partir de `src/lib/a2a/selfLoopAuth.ts` afin que l'appel s'exécute avec la clé de l'appelant A2A, pas `OMNIROUTE_API_KEY`, et transmettez `redirect: "error"` à `fetch` afin qu'une redirection n'obtienne jamais la clé. L'assistant crée uniquement les en-têtes ; chaque compétence définit elle-même la politique de redirection. Il lance `UnsafeSelfLoopTargetError` plutôt que d'attacher une clé lorsque le URL de base résolu est un simple http en dehors du réseau privé (le bouclage, un nom de conteneur ou de service et des adresses privées conviennent) ou contient des informations d'identification, donc une compétence qui avale les appels rejetés doit renvoyer cette erreur.

2. **Gestionnaire de registre :** dans `src/lib/a2a/taskExecution.ts`, ajoutez une entrée à `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **Exposer dans la carte d'agent :** dans `src/lib/a2a/agentCardMetadata.ts` (partagé par `/.well-known/agent.json` et `/.well-known/agent-card.json`), ajoutez au tableau `skills` :

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Écrire des tests :** `tests/unit/a2a-<your-skill>.test.ts`. Couvrez le chemin d'erreur Happy Path +.

5. **Document** la nouvelle compétence dans la table `Available Skills` de ce fichier.

---

## Durée de vie des tâches

Les tâches expirent après `ttlMinutes` (5 min par défaut) — configuré dans le constructeur `A2ATaskManager` à l’emplacement `src/lib/a2a/taskManager.ts:82`. Pour personnaliser cette durée, créez votre propre instanciation de `A2ATaskManager` et transmettez une valeur différente (par exemple, `new A2ATaskManager(15)` pour une durée de vie de 15 minutes). Un processus en arrière-plan supprime les tâches expirées toutes les 60 secondes.

---

## Cycle de vie des tâches

```
submitted → working → completed
                    → failed
                    → cancelled
```

- Les tâches expirent après 5 minutes par défaut (voir [Durée de vie des tâches](#task-ttl))
- États terminaux : `completed`, `failed`, `cancelled`
- Le journal des événements enregistre chaque transition d’état

---

## Codes d’erreur

| Code   | Signification                             |
| :----- | :---------------------------------------- |
| -32700 | Erreur d’analyse (JSON non valide)        |
| -32600 | Requête non valide / Non autorisé         |
| -32601 | Méthode ou compétence introuvable         |
| -32602 | Paramètres non valides                    |
| -32603 | Erreur interne                            |
| -32000 | Le point de terminaison A2A est désactivé |

---

## Exemples d'intégration

### Python (requêtes)

```python
import requests

resp = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "Hello"}]
    }
}, headers={"Authorization": "Bearer YOUR_KEY"})

result = resp.json()["result"]
print(result["artifacts"][0]["content"])
print(result["metadata"]["routing_explanation"])
```

### TypeScript (récupérer)

```typescript
const resp = await fetch("http://localhost:20128/a2a", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_KEY",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "1",
    method: "message/send",
    params: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "Hello" }],
    },
  }),
});
const { result } = await resp.json();
console.log(result.metadata.routing_explanation);
```
