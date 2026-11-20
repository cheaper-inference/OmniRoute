# OmniRoute Plugin SDK (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Démarrage rapide

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "my-plugin",
  priority: 50,
  onRequest: async (ctx) => {
    console.log(`Request ${ctx.requestId} for ${ctx.model}`);
  },
  onResponse: async (ctx, response) => {
    console.log(`Response for ${ctx.requestId}`);
    return response;
  },
  onError: async (ctx, error) => {
    console.error(`Error: ${error.message}`);
  },
});
```

## Référence API

### `definePlugin(def: PluginDefinition): Plugin`

Fonction d'usine qui crée un objet Plugin avec des valeurs par défaut.

**Paramètres :**

- `name` (chaîne, obligatoire) Nom du plugin — en cas kebab
- `priority` (nombre, facultatif, par défaut : 100) — Lower s'exécute en premier
- `enabled` (booléen, facultatif, par défaut : vrai) — Start activé ?
- `onRequest` (fonction, facultatif) — S'exécute avant le gestionnaire de chat
- `onResponse` (fonction, facultatif) — S'exécute après le gestionnaire de discussion
- `onError` (fonction, facultatif) — s'exécute en cas d'erreur du gestionnaire

### `blockRequest(response?): BlockingHookResult`

Bloquez la demande et renvoyez éventuellement une réponse personnalisée.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

Modifiez le corps de la demande avant qu'elle n'atteigne le fournisseur.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Attachez des métadonnées au contexte de la demande.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Contexte du plugin (`PluginContext`)

| Champ        | Taper                     | Description                        |
| ------------ | ------------------------- | ---------------------------------- |
| `requestId`  | `string`                  | Identifiant unique de la demande   |
| `model`      | `string`                  | Nom du modèle demandé              |
| `provider`   | `string`                  | Fournisseur cible ID               |
| `body`       | `Record<string, unknown>` | Corps de la demande                |
| `headers`    | `Record<string, string>`  | En-têtes de requête (voir note)    |
| `metadata`   | `Record<string, unknown>` | Métadonnées mutables               |
| `timestamp`  | `number`                  | Horodatage de la demande           |
| `apiKeyInfo` | `object` (facultatif)     | métadonnées de clé API (voir note) |

Le contexte ne contient jamais les informations d'identification du client : les en-têtes `authorization`, `x-api-key`, `proxy-authorization` et `cookie` sont supprimés (n'importe quelle casse) et `apiKeyInfo` conserve les métadonnées de la clé (telles que `id`, `name` et `scopes`) mais pas la valeur de la clé ou son empreinte digitale (`redactPluginContext()` dans `src/lib/plugins/hooks.ts`). Cela s'applique à `onRequest`, `onResponse` et `onError`.

## Manifeste (`plugin.json`)

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "A sample plugin",
  "author": "your-name",
  "main": "index.js",
  "hooks": {
    "onRequest": { "enabled": true, "priority": 50 },
    "onResponse": true,
    "onError": false
  },
  "requires": {
    "permissions": ["network", "file-read"]
  },
  "enabledByDefault": false,
  "configSchema": {
    "apiKey": {
      "type": "string",
      "description": "API key for external service"
    },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

### Priorité des hooks

Les hooks peuvent être configurés avec une priorité (plus la valeur est faible, plus le hook s’exécute tôt) :

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Ou sous forme de simples valeurs booléennes (priorité par défaut : 100) :

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Système d'autorisation

Les plugins sont** pas en bac à sable** . Chaque plugin actif s'exécute comme un processus enfant Node.js ordinaire distinct (`loadPlugin()` dans `src/lib/plugins/loader.ts`) sous le même utilisateur du système d'exploitation que OmniRoute, sans contexte VM et sans indicateurs d'autorisation Node.js. Le code du plugin peut utiliser `node:fs`, `node:child_process`, `fetch` et tous les autres Node.js API: il peut lire et écrire n'importe quel fichier que l'utilisateur OmniRoute peut (y compris le répertoire de données), exécuter des programmes et accéder au réseau.

Le `requires.permissions` du manifeste accepte `network`, `file-read`, `file-write`, `env` et `exec`, mais aujourd'hui, seul `env` a un effet au moment de l'exécution :

| Autorisation                                 | Effet aujourd'hui                                                                                                                                                                                                                            |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                                        | Le processus du plugin reçoit également `PORT`, `HOSTNAME`, `TZ` et `TMPDIR`. Sans cela, il ne reçoit que `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` et `PLUGIN_NAME` (plus `SystemRoot` et `windir` sur Windows). |
| `network`, `file-read`, `file-write`, `exec` | Aucun. Ce ne sont que des déclarations : rien n'est bloqué lorsqu'elles manquent.                                                                                                                                                            |

Installer un plugin revient à installer n’importe quel autre programme sur l’hôte. Installez uniquement les plugins dont vous faites confiance à la source.

## Schéma de configuration

Définissez les paramètres configurables dans `configSchema` :

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "External API key" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Types de champs : `string`, `number`, `boolean`, `select`

Options des champs : `default`, `min`, `max`, `enum`, `description`

Les valeurs de configuration sont conservées dans la base de données et accessibles depuis la page de configuration du tableau de bord.

## Événements intégrés

| Événement         | Déclenchement                                                      | Charge utile                  |
| ----------------- | ------------------------------------------------------------------ | ----------------------------- |
| `onRequest`       | Avant le gestionnaire de chat                                      | Contexte de la requête        |
| `onResponse`      | Après le gestionnaire de chat                                      | Données de la réponse         |
| `onError`         | En cas d’erreur du gestionnaire                                    | Objet d’erreur                |
| `onModelSelect`   | Lorsqu’un modèle est sélectionné pour le routage                   | Informations sur le modèle    |
| `onComboResolve`  | Lorsque le routage combiné est résolu                              | Cibles de la combinaison      |
| `onRateLimit`     | Lorsque la limite de débit est atteinte                            | Informations sur la limite    |
| `onQuotaExhaust`  | Lorsque le quota est épuisé                                        | Informations sur le quota     |
| `onProviderError` | Lorsque le fournisseur renvoie une erreur                          | Détails de l’erreur           |
| `onStreamStart`   | Lorsqu’un flux SSE démarre                                         | Informations sur le flux      |
| `onStreamEnd`     | Lorsqu’un flux SSE se termine                                      | Statistiques du flux          |
| `onInstall`       | Lorsque le plugin est installé                                     | `{ name, version, manifest }` |
| `onActivate`      | Lorsque le plugin est activé                                       | `{ name, version, manifest }` |
| `onDeactivate`    | Lorsque le plugin est désactivé                                    | `{ name, version, manifest }` |
| `onUninstall`     | Lorsque le plugin est désinstallé (avant suppression des fichiers) | `{ name, version, manifest }` |

## Exemples

### Enregistreur de demandes

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Limiteur de débit

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.apiKeyInfo?.id || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 minute
    const maxRequests = 100;

    const timestamps = (requests.get(key) || []).filter((t) => t > now - window);
    timestamps.push(now);
    requests.set(key, timestamps);

    if (timestamps.length > maxRequests) {
      return blockRequest({ error: "Rate limit exceeded", status: 429 });
    }
  },
});
```

### Transformateur de réponse

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "response-transformer",
  onResponse: async (ctx, response) => {
    if (response.choices) {
      response.choices = response.choices.map((c: any) => ({
        ...c,
        message: { ...c.message, content: c.message.content.trim() },
      }));
    }
    return response;
  },
});
```
