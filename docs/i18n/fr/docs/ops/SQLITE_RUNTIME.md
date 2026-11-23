# SQLite Runtime Resolution (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute résout son pilote SQLite au démarrage au moyen d’une chaîne de repli en 5 étapes :

1. **`better-sqlite3` fourni** (via `dependencies` dans `package.json`)
   — le plus rapide, binaire natif, installé par `npm install` lorsque les outils de compilation sont présents.

2. **`better-sqlite3` installé à l’exécution** (dans `~/.omniroute/runtime/`)
   — installé à la demande lors de la première exécution **OU** par `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Valide les octets magiques du fichier `.node` natif (ELF / Mach-O / PE) avant son chargement
   afin d’éviter les binaires corrompus ou destinés à une autre plateforme.

3. **`node:sqlite`** (bibliothèque standard de Node ≥22.5) — aucune compilation native nécessaire ; utilisé lorsque
   les deux chemins de better-sqlite3 échouent. Ensemble de fonctionnalités limité.

4. **`sql.js`** (WASM) — dernier recours. Fonctionne partout, mais est plus lent
   et écrit les données à intervalles réguliers plutôt que de manière synchrone.

## Pourquoi cette complexité ?

- **EBUSY sous Windows** : `npm install -g omniroute@latest` peut échouer si le fichier
  `better_sqlite3.node` de la version précédente est verrouillé par un processus en cours d’exécution. L’installation
  à l’exécution dans `~/.omniroute/runtime/` contourne le cache npm global.
- **Absence d’outils de compilation** : certains environnements (Windows d’entreprise sans VS Build
  Tools, images Docker minimales) ne peuvent pas compiler `better-sqlite3`. Le programme d’installation
  à l’exécution récupère un binaire précompilé depuis le registre npm ; les pilotes de repli
  garantissent qu’OmniRoute démarre quand même en cas d’échec.
- **Systèmes isolés du réseau** : si le registre npm est inaccessible, `node:sqlite`
  ou `sql.js` garantit un fonctionnement de base.

## Validation des octets magiques

Avant de charger un fichier `.node` installé à l’exécution, OmniRoute lit les 8 premiers
octets et les compare aux signatures connues des plateformes :

| Plateforme            | Octets (hex)  | Libellé     |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64 bits BE      | `FE ED FA CF` | `macho`     |
| macOS 64 bits LE      | `CF FA ED FE` | `macho-le`  |
| macOS fat (universel) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

Une signature non concordante → le fichier est ignoré et le repli passe à l’étape suivante.

## Vérification du pilote actif

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Contrôle manuel

```bash
# Ignorer le préchauffage après l’installation (pour des installations CI rapides)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Forcer la réinstallation de better-sqlite3 à l’exécution
rm -rf ~/.omniroute/runtime
omniroute  # sera réinstallé au prochain démarrage

# Vérifier quel pilote est actif
omniroute config db-info  # (si la commande CLI existe)
```

## Diagnostic des blocages synchrones

Avec `better-sqlite3`, définissez `OMNIROUTE_SQLITE_SLOW_MS=200` avant le démarrage pour activer
la mesure du temps de l’adaptateur synchrone. Elle est désactivée par défaut. Une opération terminée prenant
au moins ce nombre de millisecondes émet un avertissement `[SQLITE-SLOW]`, au maximum une fois toutes les
dix secondes par adaptateur. L’avertissement contient uniquement le pilote, la classe d’opération
(`prepare`, `get`, `all`, `run`, `exec`, `pragma`, transaction ou maintenance) et
le nombre de millisecondes écoulées : aucun SQL, paramètre, résultat, chemin ni texte d’exception.

Il s’agit d’une aide au diagnostic, et non d’un délai d’expiration ni d’une optimisation des requêtes. Elle ne peut pas signaler
une opération qui ne se termine jamais, distinguer le travail du processeur des attentes disque, identifier
le SQL exact ni observer les opérations effectuées directement au moyen du pilote brut.
La durée des sauvegardes asynchrones est délibérément exclue ; les autres pilotes SQLite ne sont pas
instrumentés par cette option. La désactivation de la variable restaure l’adaptateur d’origine
sans enveloppes de mesure du temps. Aucun schéma de base de données ni aucune configuration stockée ne sont modifiés.

L’avertissement de latence de `/healthz` indique le pic de la boucle d’événements depuis l’échantillon précédent,
et non la moyenne sur toute la durée de vie. Corrélez ses horodatages avec les avertissements d’opérations lentes
et les métriques de l’hôte et du stockage avant d’attribuer un blocage à SQLite ou à une défaillance du disque.

## Référence

Implémentation :

- `bin/cli/runtime/magicBytes.mjs` — fonctions auxiliaires de validation des octets magiques des binaires
- `bin/cli/runtime/sqliteRuntime.mjs` — résolveur d’exécution en 5 étapes + programme d’installation à la demande
- `bin/cli/runtime/index.mjs` — orchestrateur de démarrage (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — hook npm après installation (préchauffage non bloquant)
- `src/lib/db/core.ts` — exports `ensureDbInitialized()` / `getDriverInfo()`

## Topologie à processus d’écriture unique (HA non prise en charge)

La chaîne de repli des pilotes ci-dessus s’exécute toujours dans **un seul processus**. Par défaut, SQLite
dans OmniRoute n’autorise qu’**un seul processus d’écriture** :

- Ne connectez pas deux répliques OmniRoute au même fichier `storage.sqlite`.
- Un redémarrage de conteneur, un déploiement Recreate, un arrêt pour dépassement de mémoire ou un redémarrage HEALTHCHECK interrompt
  toutes les sessions SSE en cours. Aucun drainage des sessions n’est prévu dans le chemin standard.
- Un contrôle de vivacité de l’orchestrateur qui considère un `/healthz` lent comme indisponible arrêtera l’unique
  réplique. Préférez un contrôle de vivacité TCP et un contrôle de disponibilité HTTP sur `/healthz`. Consultez
  le [guide Docker — disponibilité](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  et les [recommandations relatives aux sondes Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
