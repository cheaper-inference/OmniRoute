# OpenCode Integration (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Statut:** Généralement disponible.** Public:** Opérateurs câblant OpenCode à un déploiement OmniRoute.** Source de vérité (schéma de configuration) :** `src/shared/services/opencodeConfig.ts`** Forfaits npm recommandés :** `@omniroute/opencode-plugin/` (OpenCode v1, installé par `omniroute setup opencode`) et `@omniroute/opencode-plugin-v2/` (OpenCode v2). L'ancien package `@omniroute/opencode-provider/` est** obsolète** (voir Chemin 2).

[OpenCode](https://opencode.ai) est un client agent CLI/desktop AI. Il lit son catalogue de fournisseurs à partir de `~/.config/opencode/opencode.json` (ou `opencode.jsonc`) et suit le schéma de `https://opencode.ai/config.json`. OmniRoute s'expose à OpenCode en tant que l'un de ces fournisseurs — chaque requête transite par la surface `/v1` standard compatible OpenAI de OmniRoute, de sorte que OpenCode bénéficie automatiquement du routage Auto-Combo, des disjoncteurs, des politiques clés, de l'observabilité, etc.

Cette page documente les deux chemins de configuration statique ci-dessous ; les deux génèrent la même configuration. Pour une liste de modèles qui suit votre catalogue en direct, utilisez plutôt le plugin : `omniroute setup opencode` installe `@omniroute/opencode-plugin` (OpenCode v1) et `@omniroute/opencode-plugin-v2` cible OpenCode v2 (voir [les intégrations CLI](../guides/CLI-INTEGRATIONS.md) et le [guide du plugin OpenCode v2](../guides/OPENCODE-V2-PLUGIN.md) ).

---

## Méthode 1 — Générateur CLI (sans installation npm)

Recommandée pour les utilisateurs finaux. Fournie avec OmniRoute. Écrit directement dans `opencode.json`.

```bash
# Après avoir installé OmniRoute (npm i -g @omniroute/cli ou clone local)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

En arrière-plan, la CLI appelle `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), de sorte qu'un fichier `opencode.json` existant conserve ses autres fournisseurs et commentaires. L'entrée OmniRoute est ajoutée ou remplacée de manière atomique.

Fichier obtenu (catalogue de modèles par défaut) :

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<votre-clé>",
      },
      "models": {
        "claude-opus-4-5-thinking": { "name": "claude-opus-4-5-thinking" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3.1-pro-high": { "name": "gemini-3.1-pro-high" },
        "gemini-3-flash": { "name": "gemini-3-flash" },
      },
    },
  },
}
```

---

## Chemin 2 — npm package `@omniroute/opencode-provider` (obsolète)

> **Obsolète.** Le package écrit une liste de modèles statiques qui dérive derrière votre catalogue OmniRoute en direct. Son README recommande de migrer vers `@omniroute/opencode-plugin` (ou `@omniroute/opencode-plugin-v2` sur OpenCode v2). Le API ci-dessous est conservé pour les scripts existants uniquement.

Utilisé lors de la création de scripts pour la configuration à partir de Node/TS (pipelines CI, monorepos, flux d'installation personnalisés).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Optional: override the model catalog exposed to OpenCode
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Pour une fusion non destructive avec un fichier existant, répliquez `mergeOpenCodeConfigText()` à partir de `opencodeConfig.ts` ou appelez le générateur CLI.

Voir le [package README](../../@omniroute/opencode-provider/README.md) pour le API complet.

---

## Fonctionnement réel à l'exécution

Les deux méthodes produisent la même valeur `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. À l'exécution, OpenCode charge `@ai-sdk/openai-compatible` (déjà une dépendance transitive d'OpenCode) et le configure avec `baseURL` + `apiKey`. Le flux est ensuite le suivant :

```
Interface utilisateur/agent OpenCode
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (interface OpenAI d'OmniRoute)
         → Gestionnaire OmniRoute /v1/chat/completions     (open-sse/handlers/chatCore.ts)
            → routage combiné / Auto-Combo / exécuteur
               → fournisseur en amont
```

Le plugin n'interagit jamais avec HTTP. Il génère uniquement la configuration.

---

## Valeurs par défaut du catalogue de modèles

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Vous pouvez remplacer ces valeurs via `models: [...]`. Ajouts recommandés :

- `"auto"` — expose le routeur sans configuration [Auto-Combo](../routing/AUTO-COMBO.md) d'OmniRoute. Permet à OpenCode de sélectionner « le meilleur modèle disponible » sans que vous ayez à coder le catalogue en dur.
- `"<combo-name>"` — n'importe quelle combinaison que vous avez définie dans le tableau de bord ; OmniRoute la résout de manière transparente.

---

## Normalisation des URL

La fonction utilitaire accepte les deux formes et génère exactement un seul `/v1` :

| Entrée                         | Sortie (`options.baseURL`)  |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Cette déduplication résout **le problème le plus courant** observé dans les anciennes configurations. Si vous disposez d'un fichier `opencode.json` antérieur à la version v3.8.0 qui pointe vers `/v1/v1/...`, relancez le générateur ou appelez à nouveau `createOmniRouteProvider`.

---

## Modes d'authentification

| Paramètre OmniRoute                                | Valeur `apiKey` recommandée                                                               |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (valeur locale par défaut) | `sk_omniroute` (valeur littérale de substitution)                                         |
| `REQUIRE_API_KEY=true`                             | Une véritable clé API propre à l'utilisateur, disponible sous Tableau de bord → Clés API. |

Pour les clients de type Anthropic qui envoient `x-api-key` + `anthropic-version`, la fonction `extractApiKey` d'OmniRoute accepte également la clé provenant de `x-api-key`. OpenCode utilise l'interface OpenAI et enverra donc toujours `Authorization: Bearer ${apiKey}` — aucun cas particulier propre à Anthropic ne s'applique ici.

---

## Dépannage

| Symptôme                                                   | Cause                                                                                                     | Solution                                                                                                                      |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `404` à chaque requête dont l'URL contient `/v1/v1/`       | Configuration obsolète d'un plug-in antérieur à la version v3.8 qui ajoutait deux fois le suffixe `/v1`.  | Régénérez-la à l'aide de la méthode 1 ou 2.                                                                                   |
| `401 Invalid API key`                                      | OmniRoute a `REQUIRE_API_KEY=true` et la clé est inconnue.                                                | Créez la clé dans le tableau de bord, ou définissez `REQUIRE_API_KEY=false` (en local uniquement) et utilisez `sk_omniroute`. |
| Liste de modèles vide dans l'interface d'OpenCode          | Les 4 modèles par défaut sont tous masqués par les paramètres de visibilité des fournisseurs d'OmniRoute. | Transmettez `models: ["auto", ...]` pour afficher ceux que vous avez activés.                                                 |
| Erreur 500 d'OpenCode avec `cannot read property 'models'` | Les anciennes versions d'OpenCode (< 0.1.x) n'acceptaient pas `models` en ligne.                          | Mettez OpenCode à niveau vers une version conforme au schéma v1 (`opencode.ai/config.json`).                                  |

---

## Voir aussi

- [API référence](../reference/API_REFERENCE.md) — complet OmniRoute REST surface
- [Auto-Combo](../routing/AUTO-COMBO.md) — ce que `model: "auto"` signifie
- [`@omniroute/opencode-plugin` README](../../@omniroute/opencode-plugin/README.md) (recommandé)
- [`@omniroute/opencode-plugin-v2` README](../../@omniroute/opencode-plugin-v2/README.md)
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md) (obsolète)
- Source : `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
