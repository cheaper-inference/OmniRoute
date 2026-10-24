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

## Skills disponibles

OmniRoute expose 6 skills A2A câblées dans `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Chaque module de skill réside dans `src/lib/a2a/skills/`.

| Skill              | ID                   | Description                                                                                                                                                                         | Tags                       | Exemples                                            |
| :----------------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :-------------------------------------------------- |
| Smart Routing      | `smart-routing`      | Achemine un prompt via le fournisseur/combo optimal en s'appuyant sur le moteur de combos d'OmniRoute + le scoring                                                                  | routing, providers         | "Acheminer ce prompt via le meilleur modèle"        |
| Quota Management   | `quota-management`   | Rend compte de l'état des quotas par fournisseur, aide les appelants à décider quand limiter le débit ou changer de fournisseur                                                     | quota, providers           | "Vérifier le quota pour anthropic"                  |
| Provider Discovery | `provider-discovery` | Liste les fournisseurs installés avec leurs capacités, les indicateurs de niveau gratuit et le statut OAuth                                                                         | providers, discovery       | "Quels fournisseurs sont disponibles ?"             |
| Cost Analysis      | `cost-analysis`      | Estime le coût d'une requête/conversation à partir du catalogue + de l'usage récent                                                                                                 | cost, usage                | "Estimer le coût de cette conversation"             |
| Health Report      | `health-report`      | Agrège l'état des circuit breakers, des cooldowns et des verrouillages par fournisseur                                                                                              | health, resilience         | "Afficher l'état de santé de tous les fournisseurs" |
| List Capabilities  | `list-capabilities`  | Retourne le catalogue complet des 45 entrées Agent Skills (23 API + 21 CLI + 1 config) sous forme de tableau markdown avec les URL brutes des SKILL.md pour l'injection de contexte | catalog, discovery, skills | "Lister toutes les capacités d'OmniRoute"           |

> L'Agent Card doit rester alignée sur le catalogue actif des 375 fournisseurs ; le nombre de fournisseurs ainsi que les métadonnées gratuit/sans-authentification proviennent du registre runtime.

### Détail de la skill `list-capabilities`

La skill `list-capabilities` est particulièrement utile pour les agents externes qui doivent découvrir ce qu'OmniRoute expose avant d'envoyer des appels API. Elle retourne un artefact sous forme de tableau markdown structuré :

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Chaque ligne inclut la colonne `rawUrl` afin que les agents puissent récupérer immédiatement le SKILL.md complet. Le champ `metadata.totalSkills` reflète la taille du catalogue (45 aujourd'hui). Implémentation : `src/lib/a2a/skills/listCapabilities.ts`. Voir aussi [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## API REST (auxiliaire)

Le point de terminaison JSON-RPC `/a2a` est le point d’entrée A2A canonique. Les points de terminaison REST ci-dessous fournissent un accès auxiliaire pour les tableaux de bord et les outils externes :

| Point de terminaison         | Méthode | Description                                                       | Authentification                               |
| :--------------------------- | :------ | :---------------------------------------------------------------- | :--------------------------------------------- |
| `/api/a2a/status`            | GET     | État du serveur, compétences enregistrées                         | (public)                                       |
| `/api/a2a/tasks`             | GET     | Répertorier les tâches avec des filtres                           | gestion                                        |
| `/api/a2a/tasks/[id]`        | GET     | Obtenir une tâche par ID                                          | gestion                                        |
| `/api/a2a/tasks/[id]/cancel` | POST    | Annuler une tâche en cours d’exécution                            | gestion                                        |
| `/.well-known/agent.json`    | GET     | Carte d’agent (découverte A2A)                                    | (public, mise en cache pendant 3600 s)         |
| `/api/a2a/tasks`             | POST    | Délégation entrante à la flotte OmniConductor (PRD Conductor RF5) | Bearer avec `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Délégation Conductor entrante (`POST /api/a2a/tasks`) :** les agents A2A externes délèguent des tâches de développement à la flotte OmniConductor par l’intermédiaire d’OmniRoute. Corps : `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — seules les compétences de la flotte Conductor (celles annoncées dans la carte d’agent) peuvent faire l’objet d’une délégation ; `metadata.conductor.repo.url` est requis (la flotte travaille sur des dépôts git). La route traduit la requête en `POST /v1/tasks` du hub en utilisant le `CONDUCTOR_ORCHESTRATOR_TOKEN` côté serveur (avec `CONDUCTOR_HUB_TOKEN` comme solution de repli) et renvoie `201 { conductor_task_id, state: "submitted" }` ; les états des tâches sont retransmis par le miroir SSE→A2A (RF1) et sont visibles via `GET /api/a2a/tasks?skill=conductor`.

---

## Ajout d’une nouvelle compétence

1. **Créez le fichier de la compétence :** `src/lib/a2a/skills/<your-skill>.ts`

   Exportez une fonction asynchrone `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Respectez la structure des compétences existantes telles que `smartRouting.ts`.

2. **Enregistrez le gestionnaire :** dans `src/lib/a2a/taskExecution.ts`, ajoutez une entrée à `A2A_SKILL_HANDLERS` :

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...compétences existantes
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Exposez-la dans la carte d’agent :** dans `src/app/.well-known/agent.json/route.ts`, ajoutez-la au tableau `skills` :

   ```json
   {
     "id": "your-skill",
     "name": "Votre compétence",
     "description": "Description brève et axée sur l’intention",
     "tags": ["routing", "quota"],
     "examples": ["Exemple d’invocation en langage naturel"]
   }
   ```

4. **Écrivez des tests :** `tests/unit/a2a-<your-skill>.test.ts`. Couvrez le scénario nominal et le scénario d’erreur.

5. **Documentez** la nouvelle compétence dans le tableau `Available Skills` de ce fichier.

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

## Exemples d’intégration

### Python (requests)

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

### TypeScript (fetch)

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
