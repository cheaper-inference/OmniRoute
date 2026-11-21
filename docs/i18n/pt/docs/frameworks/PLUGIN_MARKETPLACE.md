# Plugin Marketplace (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Fonte fidedigna:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` e
> `src/app/(dashboard)/dashboard/plugins/`
> **Última atualização:** 2026-06-28 — v3.8.40

O OmniRoute inclui um sistema de plugins semelhante ao do WordPress. Os plugins são
diretórios autónomos — cada um com um manifesto `plugin.json` e um ficheiro de entrada — que se
ligam ao pipeline de pedidos (`onRequest` / `onResponse` / `onError`) e a
eventos do ciclo de vida (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

O **Marketplace de Plugins** é a camada de descoberta sobre esse sistema.
Disponibiliza um catálogo navegável de plugins instaláveis. Por predefinição, o catálogo é um
pequeno registo inicial incorporado; um operador pode configurá-lo para usar um URL de registo
remoto personalizado, caso em que a obtenção é protegida por uma salvaguarda contra SSRF
com resolução de DNS (consulte [Segurança](#security)).

Todas as rotas de plugins são **exclusivas de loopback** (Nível 1 — `LOCAL_ONLY`): os plugins carregam
e executam código em processos-filho, pelo que as rotas estão inacessíveis a partir de uma
origem que não seja loopback, independentemente da autenticação. Consulte
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Como se encaixa Together

```
Dashboard (/dashboard/plugins)
  ├─ "Installed" tab  → GET /api/plugins            (listPlugins)
  │                     POST /api/plugins/scan      (pluginManager.scan)
  │                     POST /api/plugins/{name}/activate|deactivate
  │                     DELETE /api/plugins/{name}   (uninstall)
  └─ "Marketplace" tab → GET /api/plugins/marketplace
                          → listMarketplacePlugins()
                            ├─ no custom URL → built-in SEED_REGISTRY
                            └─ custom URL → isSafeMarketplaceUrl() SSRF guard
                                          → safeOutboundFetch(guard:"public-only")
```

- **Camada de registo** — `src/lib/plugins/marketplace.ts`: lista/pesquisa o catálogo, recorrendo ao registo de sementes em caso de falha.
- **Camada de ciclo de vida** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): instalar, atualizar, ativar, desativar, desinstalar, verificar, carregar arranque.
- **Camada de manifesto** — `src/lib/plugins/manifest.ts`: esquema Zod padrões + para `plugin.json`.
- **Scanner** — `src/lib/plugins/scanner.ts`: descobre os plug-ins no disco no diretório dos plug-ins.
- **Carregador** — `src/lib/plugins/loader.ts`: gera cada plugin num processo filho Node.js separado e os brokers ligam as chamadas sobre IPC. O filho não é uma sandbox (consulte "Isolamento de execução do plug-in" abaixo).

## Catálogo do Marketplace

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) devolve uma lista de
objetos `MarketplaceEntry`:

| Campo         | Tipo     | Notas                                             |
| ------------- | -------- | ------------------------------------------------- |
| `name`        | string   | Nome do plugin em kebab-case                      |
| `version`     | string   | semver                                            |
| `description` | string   | Resumo breve                                      |
| `author`      | string   | Autor/organização                                 |
| `license`     | string   | Identificador de licença ao estilo SPDX           |
| `downloadUrl` | string   | URL de transferência da origem (pode estar vazio) |
| `repository`  | string?  | URL opcional do repositório                       |
| `tags`        | string[] | Etiquetas de pesquisa/filtragem                   |
| `downloads`   | number   | Número de transferências                          |
| `rating`      | number   | 0–5                                               |
| `verified`    | boolean  | Indica se a entrada está marcada como verificada  |
| `lastUpdated` | string   | String de data semelhante ao formato ISO          |

Quando não está configurado nenhum URL de registo personalizado, o catálogo é o
`SEED_REGISTRY` incorporado (atualmente `request-logger`, `rate-limiter`, `cost-tracker` e
`theme-manager`). O registo inicial está sempre disponível — se um registo remoto
configurado estiver inacessível, devolver um estado diferente de `200` ou devolver um corpo
não reconhecido, `listMarketplacePlugins()` regista um aviso e recorre à lista inicial.

> Nota: o **catálogo** do marketplace (navegação/pesquisa) está totalmente integrado, mas
> a **instalação** com um clique a partir do catálogo ainda não está implementada — atualmente,
> o botão "Instalar" do painel numa entrada do marketplace apresenta um aviso de
> "disponível em breve". Atualmente, a instalação é efetuada através do fluxo de instalação
> por caminho local (`POST /api/plugins`) e da deteção no disco (`POST /api/plugins/scan`).

## REST API

Todos os endpoints requerem autenticação de gestão (`requireManagementAuth`)** e** são apenas loopback — `/api/plugins` e `/api/plugins/` estão listados em `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Ponto final                        | Método | Descrição                                                         |
| ---------------------------------- | ------ | ----------------------------------------------------------------- |
| `/api/plugins`                     | GET    | Listar plugins instalados (filtro `?status=` opcional)            |
| `/api/plugins`                     | POST   | Instale um plugin a partir do diretório de fontes do plugin       |
| `/api/plugins/scan`                | POST   | Digitalize o diretório de plugins e registe novos plugins         |
| `/api/plugins/marketplace`         | GET    | Listar entradas do catálogo do marketplace                        |
| `/api/plugins/marketplace/install` | POST   | Instale um plugin de mercado por nome                             |
| `/api/plugins/[name]`              | GET    | Obter detalhes do plugin instalado                                |
| `/api/plugins/[name]`              | DELETE | Desinstalar um plugin                                             |
| `/api/plugins/[name]/activate`     | POST   | Activar (carregar ganchos de registo + )                          |
| `/api/plugins/[name]/deactivate`   | POST   | Desativar (disparar `onDeactivate`, cancelar registo de ganchos)  |
| `/api/plugins/[name]/config`       | GET    | Obtenha o esquema de configuração + da configuração do plugin     |
| `/api/plugins/[name]/config`       | PUT    | Atualizar configuração do plugin (validado em relação ao esquema) |

O filtro `GET /api/plugins` `status` aceita um dos `installed` / `active` / `inactive` / `error`. Um valor inválido retorna `400`.

### Listar os plug-ins instalados

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Instalar a partir de um caminho local

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

O `path` deve ser um** absoluto** caminho para um diretório** dentro do diretório de fontes do plugin** : `plugin-sources` junto à raiz do plugin, depois `~/.omniroute/plugin-sources/` por defeito, ou `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` quando esta variável estiver definida (`getPluginSourcesDir()` em `src/lib/plugins/installSource.ts`). Copie ou clone o plugin primeiro. A instalação é recusada com `400` quando o caminho contém `..` ou um byte nulo, está fora desse directório, é resolvido fora dele através de um link simbólico, contém um link simbólico cujo destino está fora dele ou quando o directório não existe. O diretório de origem deve conter um `plugin.json` válido (ou ser pai de um). Em caso de sucesso, a resposta é `201` com a linha do plugin instalada.

Ao contrário de outras rotas de plug-in, esta requer a credencial de gestão (uma sessão de painel ou uma chave API com âmbito de gestão) mesmo quando o login está desativado (`requireLogin=false`): a instalação do código nunca é uma ação anónima. O mesmo se aplica ao `POST /api/plugins/marketplace/install` (corpo `{ "name": "<plugin>" }`).

### Navegue pelo mercado

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Atualizar configuração do plugin

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` valida o corpo em relação ao `configSchema` do plugin (declarado no manifesto) com `validatePluginConfig()` de `src/lib/plugins/manifest.ts`: cada chave deve ser declarada no esquema, os valores devem corresponder ao tipo declarado, os campos `number` honram `min`/`max` e os campos `select` devem corresponder ao declarado `enum`. Qualquer violação retorna `400` e nada é armazenado. Um plugin que não declara nenhum `configSchema` não tem chaves configuráveis, pelo que o pedido é recusado com `400` ("O plugin não declara nenhuma chave configurável").

## Configuração

### Diretório de plugins

Os plugins encontram-se no diretório de dados do OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (ou aquilo para que manifest.main aponta)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) determina esse diretório
em três passos:

1. **`OMNIROUTE_PLUGINS_DIR`**, quando definida — utilizada literalmente,
   independentemente do valor de `HOME`. Esta é a opção explícita para Docker/K8s,
   onde a árvore de plugins é montada por bind num caminho que, normalmente, nada
   tem que ver com o diretório pessoal do contentor (#11827).
2. `<home>/.omniroute/plugins`, em que `<home>` provém das variáveis de ambiente
   `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, quando o processo não exporta qualquer diretório
   pessoal.

O diretório determinado é registado uma vez no arranque como
`scanner.dir_resolved`, indicando a entrada que prevaleceu
(`OMNIROUTE_PLUGINS_DIR`, `home` ou `no-home-fallback`) — assim, uma imagem que
acabe silenciosamente no passo 3 indica-o, em vez de apenas comunicar uma lista
de plugins vazia. `POST /api/plugins/scan` deteta qualquer subdiretório nesse
local que contenha um `plugin.json` válido e regista-o; o mesmo diretório é a
raiz para a qual `pluginManager.install()` copia os plugins, pelo que uma
substituição move em conjunto a deteção e a instalação.

> **`OMNIROUTE_PLUGINS_DIR` não é `OMNIROUTE_PLUGIN_PATH`.** Esta última é lida apenas
> pelo carregador de plugins de comandos da CLI (`bin/cli/plugins.mjs`) para localizar
> pacotes npm `omniroute-cmd-*` que adicionam subcomandos a `omniroute` — não tem
> qualquer efeito no analisador em tempo de execução aqui descrito. Consulte
> [PLUGINS.md](./PLUGINS.md) para obter informações sobre esse componente.

### URL personalizada do registo do marketplace

A origem do catálogo do marketplace é lida a partir da definição
`pluginMarketplaceUrl` (`src/lib/plugins/marketplace.ts` lê
`settings.pluginMarketplaceUrl`). Quando definida como um URL `http(s)`,
`listMarketplacePlugins()` obtém esse URL e aceita um array JSON de entradas ao
nível superior ou um objeto com um array `plugins`; as entradas sem um `name`
do tipo string são filtradas. Quando não está definida (ou quando o pedido
falha na proteção SSRF/devolve uma resposta inválida), é utilizado o registo
inicial incorporado.

O separador "Marketplace" do dashboard disponibiliza um campo para este URL
(lido novamente a partir de `GET /api/settings`).

> Nota de implementação: a ação "Save" do dashboard envia
> `pluginMarketplaceUrl` para `PATCH /api/settings`. À data da redação, esta
> chave não está declarada em `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), pelo que deve verificar a
> persistência na sua versão antes de depender desta funcionalidade — o caminho
> de **leitura** (`getSettings()` → `listMarketplacePlugins()`) respeita a chave
> assim que esta esteja presente no armazenamento de definições.

## Segurança

### Apenas loopback do nível de rota —

Os plug-ins executam código em processos filhos gerados, pelo que toda a superfície `/api/plugins` é classificada como `LOCAL_ONLY` (Nível 1). A aplicação de loopback é executada incondicionalmente** antes** qualquer verificação de autenticação, pelo que um token de gestão vazado que chega à caixa através de um túnel ainda não pode instalar, ativar ou desinstalar um plug-in. Ver [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) e regras rígidas #15 / #17.

### Guarda SSRF do registo do mercado

Um registo personalizado URL é uma configuração influenciável pelo atacante, pelo que, antes de o procurar, `listMarketplacePlugins()` executa-o em duas camadas:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Rejeita tudo o que não seja `http:` / `https:`.
   - Rejeita hosts private/loopback/link-local/ULA literais (IPv4** e** IPv6, incluindo IPv4-mapped) através do `isPrivateHost` canónico (`src/shared/network/outboundUrlGuard.ts`).
   - Resolve** ambos** registos `A` e `AAAA` e rejeita se** qualquer** o endereço resolvido é privado — fechando o bypass de IP privado → nome de host público.
   - **Falha fechada** : uma falha na resolução DNS rejeita o URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): reaplica o guarda URL apenas público no momento da busca e** bloqueia redireccionamentos** (sem pivot → privado `30x` público).

Um URL que falhe em qualquer uma das camadas não anula o pedido. — o mercado volta silenciosamente ao registo integrado de sementes e regista um aviso.

> Esta proteção foi reforçada no PR #3774 especificamente para resolver A + AAAA e utilizar o `isPrivateHost` canónico em vez de uma verificação IPv4-only.

### Isolamento de execução de plugins

> **Os plug-ins não são colocados em sandbox por defeito.** O filho é um processo Node.js comum executado como utilizador OmniRoute, sem contexto VM e sem sinalizadores de permissão Node.js, pelo que o código do plugin pode ler e escrever qualquer ficheiro que o utilizador possa, executar programas e aceder à rede. `requires.permissions` apenas decide quais as variáveis de ambiente que o filho recebe; as outras permissões não são aplicadas. O sinalizador de recurso `PLUGIN_PERMISSION_MODEL_ENABLED` opt-in (desativado por predefinição) executa cada plug-in sob o modelo de permissões Node.js criado a partir destas permissões, exceto `network`, que Node.js não pode restringir (consulte [`PLUGIN_SDK.md`](./PLUGIN_SDK.md#sistema-de-permiss%C3%A3o) ). Instale apenas plug-ins em que confie. O limite do processo abaixo contém falhas e bloqueios; não é um limite de segurança.

- **Isolamento de processo** — `loadPlugin()` (`src/lib/plugins/loader.ts`) gera cada plugin num processo filho Node.js separado e comunica através de IPC. As chamadas de gancho têm um tempo limite com a escalação `SIGTERM` → `SIGKILL`.
- **Lista de permissões de ambiente** — o filho apenas recebe um conjunto de variáveis de ambiente permitidas; o conjunto mais alargado só é concedido quando o manifesto solicita a permissão `env`.
- **Instalar contenção de origem** — `POST /api/plugins` lê apenas o diretório de fontes do plugin (ver "Instalar a partir de um caminho local"): o caminho é canónico com `realpath`, deve permanecer estritamente dentro desse diretório, e uma árvore de origem que transporta um link simbólico que lhe escapa é recusada antes de qualquer coisa ser copiada.
- **Contenção de caminho** — install/upgrade/uninstall afirma que o diretório do plugin e `manifest.main` resolvem** dentro de** a raiz do plugin gerido antes de qualquer cópia ou eliminação recursiva (protege contra caminhos DB adulterados e travessia `../` em `manifest.main`). A ativação resolve os links simbólicos via `realpath` e recusa-se a carregar um ponto de entrada que escape do diretório do plugin.
- **Pino de integridade opcional** — um manifesto pode declarar um campo `integrity` (`sha256-<base64>`, SRI format). Quando presente, o carregador verifica o hash do ficheiro de entrada no momento do carregamento e recusa-se a ativar em caso de incompatibilidade. É uma deteção de violação opcional,** não** um limite de segurança: não limita o que um plugin carregado pode fazer.
- **Sem credencial de cliente nos ganchos** — o contexto passado para `onRequest`, `onResponse` e `onError` tem os cabeçalhos `authorization`, `x-api-key`, `proxy-authorization` e `cookie` removidos e o registo de chave API não transporta qualquer valor de chave (`redactPluginContext()` em `src/lib/plugins/hooks.ts`).

## Manifesto (`plugin.json`)

Validado por `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Campo              | Tipo      | Notas                                                       |
| ------------------ | --------- | ----------------------------------------------------------- |
| `name`             | fio       | Obrigatório; kebab-case (`^[a-z0-9-]+$`), 1–100 caracteres  |
| `version`          | fio       | Obrigatório; semver (`MAJOR.MINOR.PATCH`)                   |
| `description`      | fio?      | ≤ 500 caracteres                                            |
| `author`           | fio?      | ≤ 200 caracteres                                            |
| `license`          | fio?      | O padrão é `MIT`                                            |
| `main`             | fio?      | Ficheiro de entrada; o padrão é `index.js`                  |
| `source`           | enum?     | `local` \| `marketplace` (o predefinido é `local`)          |
| `tags`             | fio[]?    | Tags de pesquisa                                            |
| `requires`         | objeto?   | `{ omniroute?, permissions[] }`                             |
| `hooks`            | objeto?   | Booleans declaring which hooks the plugin implements        |
| `skills`           | objeto[]? | Definições de competências opcionais                        |
| `enabledByDefault` | booleano? | Ativar automaticamente na instalação                        |
| `configSchema`     | objeto?   | Map of config fields (`string`/`number`/`boolean`/`select`) |
| `integrity`        | fio?      | Pin opcional do ficheiro de entrada `sha256-<base64>`       |

Permissions are drawn from the enum `network` / `file-read` / `file-write` / `env` / `exec`. Only `env` has a runtime effect (a slightly larger environment-variable allowlist for the child); the others are declarations and are not enforced.

## Fluxo do Ciclo de Vida

```
instalar (POST /api/plugins, caminho)
  → analisar/validar manifesto → copiar para staging → confirmar que main está dentro do diretório
  → renomear atomicamente para ~/.omniroute/plugins/<name> → inserir linha na BD
  → acionar onInstall → se enabledByDefault: ativar

ativar (POST /api/plugins/{name}/activate)
  → verificar contenção com realpath → loadPlugin() (iniciar processo filho)
  → registar hooks declarados → status = "active" → acionar onActivate

desativar (POST /api/plugins/{name}/deactivate)
  → acionar onDeactivate (ANTES de anular o registo) → anular o registo dos hooks
  → terminar processo filho → status = "inactive"

desinstalar (DELETE /api/plugins/{name})
  → desativar se estiver ativo → acionar onUninstall
  → eliminar recursivamente o diretório do plugin, após verificar a contenção → eliminar linha da BD
```

Executar novamente `install` num diretório cuja versão no manifesto seja
**estritamente mais recente** do que a versão instalada efetua uma atualização
automática (reinstalação limpa; a configuração é reposta para os valores
predefinidos). Uma versão igual ou anterior é rejeitada.

## Base de Dados

Tabela `plugins` (migração `076_create_plugins.sql`):

| Coluna          | Tipo    | Notas                                                        |
| --------------- | ------- | ------------------------------------------------------------ |
| `id`            | TEXT PK | UUID                                                         |
| `name`          | TEXT    | Único                                                        |
| `version`       | TEXT    | semver; predefinição `1.0.0`                                 |
| `description`   | TEXT    | Opcional                                                     |
| `author`        | TEXT    | Opcional                                                     |
| `license`       | TEXT    | Predefinição `MIT`                                           |
| `main`          | TEXT    | Ficheiro de entrada; predefinição `index.js`                 |
| `source`        | TEXT    | Predefinição `local`                                         |
| `tags`          | TEXT    | Matriz JSON; predefinição `[]`                               |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`             |
| `enabled`       | INT     | 0/1; predefinição 0                                          |
| `manifest`      | TEXT    | JSON completo do manifesto                                   |
| `config`        | TEXT    | JSON; predefinição `{}`                                      |
| `config_schema` | TEXT    | JSON; predefinição `{}`                                      |
| `hooks`         | TEXT    | Matriz JSON com nomes de hooks declarados; predefinição `[]` |
| `permissions`   | TEXT    | Matriz JSON; predefinição `[]`                               |
| `plugin_dir`    | TEXT    | Diretório absoluto de instalação                             |
| `error_message` | TEXT    | Definido quando `status = "error"`                           |
| `installed_at`  | TEXT    | `datetime('now')`                                            |
| `updated_at`    | TEXT    | `datetime('now')`                                            |
| `activated_at`  | TEXT    | Definido aquando da ativação                                 |

As métricas/análises dos plugins são monitorizadas em tabelas adicionais
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Painel

A página do painel em `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) disponibiliza dois separadores:

- **Instalado** — lista os plug-ins instalados com os seus ganchos declarados, uma alternância activate/deactivate, um botão de desinstalação e uma ação "Verificar plug-ins" (`POST /api/plugins/scan`).
- **Mercado** — mostra o catálogo do `GET /api/plugins/marketplace` com um campo para definir o registo personalizado URL.

A página mostra sempre um aviso de que os plugins são executados com todos os privilégios do processo OmniRoute.

Uma página de configuração por plugin está em `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Ver também

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  porque `/api/plugins` está limitado à interface de loopback (Nível 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — a framework de competências relacionada
  (`src/lib/skills/`); os plugins podem declarar competências no respetivo manifesto
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — integrações de saída
  orientadas por eventos
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  o padrão `buildErrorBody()` utilizado por todas as rotas de plugins nas respostas de erro
