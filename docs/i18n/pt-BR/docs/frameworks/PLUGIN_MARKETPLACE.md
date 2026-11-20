# Plugin Marketplace (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Fonte da verdade:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` e
> `src/app/(dashboard)/dashboard/plugins/`
> **Última atualização:** 2026-06-28 — v3.8.40

O OmniRoute inclui um sistema de plugins no estilo do WordPress. Os plugins são
diretórios autocontidos — cada um com um manifesto `plugin.json` e um arquivo de
entrada — que se conectam ao pipeline de requisições (`onRequest` / `onResponse` /
`onError`) e aos eventos do ciclo de vida (`onInstall` / `onActivate` /
`onDeactivate` / `onUninstall`).

O **Marketplace de Plugins** é a camada de descoberta sobre esse sistema. Ele
disponibiliza um catálogo navegável de plugins instaláveis. Por padrão, o catálogo
é um pequeno registro inicial integrado; um operador pode configurá-lo para usar
uma URL de registro remoto personalizado e, nesse caso, a busca é protegida por
uma defesa contra SSRF com resolução de DNS (consulte
[Segurança](#security)).

Todas as rotas de plugins são **exclusivas de loopback** (Nível 1 — `LOCAL_ONLY`):
os plugins carregam e executam código em processos filhos, portanto as rotas ficam
inacessíveis a partir de uma origem que não seja loopback, independentemente da
autenticação. Consulte
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

- **Camada de registro** — `src/lib/plugins/marketplace.ts`: lista/pesquisa o catálogo, recorrendo ao registro de sementes em caso de falha.
- **Camada de ciclo de vida** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): instalar, atualizar, ativar, desativar, desinstalar, verificar, carregar inicialização.
- **Camada de manifesto** — `src/lib/plugins/manifest.ts`: esquema Zod padrões + para `plugin.json`.
- **Scanner** — `src/lib/plugins/scanner.ts`: descobre plug-ins no disco no diretório de plug-ins.
- **Carregador** — `src/lib/plugins/loader.ts`: gera cada plugin em um processo filho Node.js separado e os corretores conectam chamadas sobre IPC. O filho não é uma sandbox (consulte "Isolamento de execução do plug-in" abaixo).

## Catálogo do Marketplace

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) retorna uma lista
de objetos `MarketplaceEntry`:

| Campo         | Tipo     | Observações                                      |
| ------------- | -------- | ------------------------------------------------ |
| `name`        | string   | Nome do plugin em kebab-case                     |
| `version`     | string   | semver                                           |
| `description` | string   | Resumo breve                                     |
| `author`      | string   | Autor/organização                                |
| `license`     | string   | ID de licença no estilo SPDX                     |
| `downloadUrl` | string   | URL de download da fonte (pode estar vazia)      |
| `repository`  | string?  | URL opcional do repositório                      |
| `tags`        | string[] | Tags de pesquisa/filtragem                       |
| `downloads`   | number   | Número de downloads                              |
| `rating`      | number   | 0–5                                              |
| `verified`    | boolean  | Indica se a entrada está marcada como verificada |
| `lastUpdated` | string   | String de data em formato semelhante ao ISO      |

Quando nenhuma URL de registro personalizado está configurada, o catálogo usa o
`SEED_REGISTRY` integrado (atualmente `request-logger`, `rate-limiter`,
`cost-tracker` e `theme-manager`). O registro inicial está sempre disponível —
se um registro remoto configurado estiver inacessível, retornar um status
diferente de `200` ou retornar um corpo não reconhecido,
`listMarketplacePlugins()` registrará um aviso e usará a lista inicial como
alternativa.

> Observação: o **catálogo** do marketplace (navegação/pesquisa) está integrado
> de ponta a ponta, mas a **instalação** com um clique a partir do catálogo ainda
> não foi implementada — o botão "Instalar" do dashboard em uma entrada do
> marketplace atualmente exibe um aviso de "em breve". Atualmente, a instalação
> é realizada pelo fluxo de instalação via caminho local (`POST /api/plugins`) e
> pela descoberta no disco (`POST /api/plugins/scan`).

## REST API

Todos os endpoints requerem autenticação de gerenciamento (`requireManagementAuth`)** e** são somente loopback — `/api/plugins` e `/api/plugins/` estão listados em `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Ponto final                      | Método | Descrição                                                         |
| -------------------------------- | ------ | ----------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Listar plugins instalados (filtro `?status=` opcional)            |
| `/api/plugins`                   | POST   | Instale um plugin do diretório de fontes do plugin                |
| `/api/plugins/scan`              | POST   | Digitalize o diretório de plugins e registre novos plugins        |
| `/api/plugins/marketplace`       | GET    | Listar entradas do catálogo do marketplace                        |
| `/api/plugins/[name]`            | GET    | Obtenha detalhes do plugin instalado                              |
| `/api/plugins/[name]`            | DELETE | Desinstalar um plugin                                             |
| `/api/plugins/[name]/activate`   | POST   | Ativar (carregar ganchos de registro + )                          |
| `/api/plugins/[name]/deactivate` | POST   | Desativar (disparar `onDeactivate`, cancelar registro de ganchos) |
| `/api/plugins/[name]/config`     | GET    | Obtenha o esquema de configuração + da configuração do plugin     |
| `/api/plugins/[name]/config`     | PUT    | Atualizar configuração do plugin (validado em relação ao esquema) |

O filtro `GET /api/plugins` `status` aceita um dos `installed` / `active` / `inactive` / `error`. Um valor inválido retorna `400`.

### Listar plug-ins instalados

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

O `path` deve ser um** absoluto** caminho para um diretório** dentro do diretório de fontes do plugin** : `plugin-sources` próximo à raiz do plugin, então `~/.omniroute/plugin-sources/` por padrão, ou `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` quando essa variável estiver definida (`getPluginSourcesDir()` em `src/lib/plugins/installSource.ts`). Copie ou clone o plugin primeiro. A instalação é recusada com `400` quando o caminho contém `..` ou um byte nulo, está fora desse diretório, é resolvido fora dele por meio de um link simbólico, contém um link simbólico cujo destino está fora dele ou quando o diretório não existe. O diretório de origem deve conter um `plugin.json` válido (ou ser pai de um). Em caso de sucesso, a resposta é `201` com a linha do plugin instalado.

Ao contrário de outras rotas de plug-in, esta requer a credencial de gerenciamento (uma sessão de painel ou uma chave API com escopo de gerenciamento) mesmo quando o login está desabilitado (`requireLogin=false`): a instalação do código nunca é uma ação anônima.

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

`PUT .../config` valida cada valor fornecido em relação ao `configSchema` do plugin (declarado no manifesto): os campos `number` honram `min`/`max`, os campos `select` devem corresponder ao `enum` declarado. Chaves não presentes no esquema são permitidas.

## Configuração

### Diretório de plugins

Os plugins ficam no diretório de dados do OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (ou o arquivo apontado por manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) resolve esse diretório em
três etapas:

1. **`OMNIROUTE_PLUGINS_DIR`**, quando definida — usada literalmente,
   independentemente do valor de `HOME`. Esse é o controle explícito para
   Docker/K8s, onde a árvore de plugins é montada por bind em um caminho que
   geralmente não tem relação com o diretório inicial do contêiner (#11827).
2. `<home>/.omniroute/plugins`, em que `<home>` vem das variáveis de ambiente
   `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, quando o processo não exporta nenhum diretório
   inicial.

O diretório resolvido é registrado uma vez na inicialização como
`scanner.dir_resolved`, indicando a entrada escolhida (`OMNIROUTE_PLUGINS_DIR`,
`home` ou `no-home-fallback`) — assim, uma imagem que silenciosamente recorra à
etapa 3 informa isso, em vez de apenas relatar uma lista de plugins vazia.
`POST /api/plugins/scan` encontra qualquer subdiretório nesse local que contenha
um `plugin.json` válido e o registra; o mesmo diretório é a raiz para a qual
`pluginManager.install()` copia os plugins, de modo que uma substituição move
juntas a descoberta e a instalação.

> **`OMNIROUTE_PLUGINS_DIR` não é `OMNIROUTE_PLUGIN_PATH`.** Esta última é lida apenas
> pelo carregador de plugins de comandos da CLI (`bin/cli/plugins.mjs`) para localizar
> pacotes npm `omniroute-cmd-*` que adicionam subcomandos ao `omniroute` — ela não
> afeta o scanner em tempo de execução descrito aqui. Consulte
> [PLUGINS.md](./PLUGINS.md) para obter informações sobre esse mecanismo.

### URL personalizada do registro do marketplace

A origem do catálogo do marketplace é lida da configuração
`pluginMarketplaceUrl` (`src/lib/plugins/marketplace.ts` lê
`settings.pluginMarketplaceUrl`). Quando definida como uma URL `http(s)`,
`listMarketplacePlugins()` busca essa URL e aceita tanto um array JSON de nível
superior contendo entradas quanto um objeto com um array `plugins`; entradas sem
um `name` do tipo string são filtradas. Quando não está definida (ou quando a
busca é bloqueada pela proteção contra SSRF / retorna uma resposta inválida), o
registro inicial integrado é usado.

A aba "Marketplace" do painel disponibiliza um campo para essa URL (lida
novamente por meio de `GET /api/settings`).

> Nota de implementação: a ação "Salvar" do painel envia
> `pluginMarketplaceUrl` para `PATCH /api/settings`. No momento da redação deste
> documento, essa chave não está declarada em `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), portanto, verifique a persistência
> na sua versão antes de depender dela — o caminho de **leitura**
> (`getSettings()` → `listMarketplacePlugins()`) respeita a chave assim que ela
> estiver presente no armazenamento de configurações.

## Segurança

### Somente loopback do nível de rota —

Os plug-ins executam código em processos filhos gerados, portanto, toda a superfície `/api/plugins` é classificada como `LOCAL_ONLY` (Nível 1). A aplicação de loopback é executada incondicionalmente** antes** qualquer verificação de autenticação, portanto, um token de gerenciamento vazado que chega à caixa através de um túnel ainda não pode instalar, ativar ou desinstalar um plug-in. Veja [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) e regras rígidas #15 / #17.

### Guarda SSRF do registro do mercado

Um registro personalizado URL é uma configuração influenciável pelo invasor, portanto, antes de buscá-lo, `listMarketplacePlugins()` o executa em duas camadas:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Rejeita qualquer coisa que não seja `http:` / `https:`.
   - Rejeita hosts private/loopback/link-local/ULA literais (IPv4** e** IPv6, incluindo IPv4-mapped) através do `isPrivateHost` canônico (`src/shared/network/outboundUrlGuard.ts`).
   - Resolve** ambos** registros `A` e `AAAA` e rejeita se** qualquer** o endereço resolvido é privado — fechando o bypass de IP privado → nome de host público.
   - **Falha fechada** : uma falha na resolução DNS rejeita o URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): reaplica o guarda URL somente público no momento da busca e** bloqueia redirecionamentos** (sem pivô → privado `30x` público).

Um URL que falha em qualquer uma das camadas não anula a solicitação. — o mercado volta silenciosamente para o registro de sementes integrado e registra um aviso.

> Essa proteção foi reforçada em PR #3774 especificamente para resolver A + AAAA e usar o `isPrivateHost` canônico em vez de uma verificação IPv4-only.

### Isolamento de execução de plugin

> **Os plug-ins não estão em sandbox.** O filho é um processo Node.js comum executado como usuário OmniRoute, sem contexto VM e sem sinalizadores de permissão Node.js, portanto, o código do plug-in pode ler e gravar qualquer arquivo que o usuário possa, executar programas e acessar a rede. `requires.permissions` apenas decide quais variáveis de ambiente o filho recebe; as outras permissões não são aplicadas. Instale apenas plug-ins em que você confia. O limite do processo abaixo contém travamentos e travamentos; não é um limite de segurança.

- **Isolamento de processo** — `loadPlugin()` (`src/lib/plugins/loader.ts`) gera cada plugin em um processo filho Node.js separado e se comunica por meio de IPC. As chamadas de gancho têm um tempo limite com escalação `SIGTERM` → `SIGKILL`.
- **Lista de permissões de ambiente** — o filho recebe apenas um conjunto de variáveis de ambiente permitidas; o conjunto mais amplo só é concedido quando o manifesto solicita a permissão `env`.
- **Instalar contenção de origem** — `POST /api/plugins` lê apenas o diretório de fontes do plugin (veja "Instalar a partir de um caminho local"): o caminho é canônico com `realpath`, deve permanecer estritamente dentro desse diretório, e uma árvore de origem carregando um link simbólico que escapa dele é recusada antes que qualquer coisa seja copiada.
- **Contenção de caminho** — install/upgrade/uninstall afirma que o diretório do plugin e `manifest.main` resolvem** dentro de** a raiz do plugin gerenciado antes de qualquer cópia ou exclusão recursiva (protege contra caminhos DB adulterados e travessia `../` em `manifest.main`). A ativação resolve links simbólicos via `realpath` e se recusa a carregar um ponto de entrada que escape do diretório do plugin.
- **Pino de integridade opcional** — um manifesto pode declarar um campo `integrity` (`sha256-<base64>`, SRI format). Quando presente, o carregador verifica o hash do arquivo de entrada no momento do carregamento e se recusa a ativar em caso de incompatibilidade. É uma detecção de violação opcional,** não** um limite de segurança: não limita o que um plugin carregado pode fazer.
- **Nenhuma credencial de cliente nos ganchos** — o contexto passado para `onRequest`, `onResponse` e `onError` tem os cabeçalhos `authorization`, `x-api-key`, `proxy-authorization` e `cookie` removidos e o registro de chave API não carrega nenhum valor de chave (`redactPluginContext()` em `src/lib/plugins/hooks.ts`).

## Manifesto (`plugin.json`)

Validado por `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Campo              | Tipo      | Notas                                                                 |
| ------------------ | --------- | --------------------------------------------------------------------- |
| `name`             | corda     | Obrigatório; kebab-case (`^[a-z0-9-]+$`), 1–100 caracteres            |
| `version`          | corda     | Obrigatório; semver (`MAJOR.MINOR.PATCH`)                             |
| `description`      | corda?    | ≤ 500 caracteres                                                      |
| `author`           | corda?    | ≤ 200 caracteres                                                      |
| `license`          | corda?    | O padrão é `MIT`                                                      |
| `main`             | corda?    | Arquivo de entrada; o padrão é `index.js`                             |
| `source`           | enum?     | `local` \| `marketplace` (o padrão é `local`)                         |
| `tags`             | corda[]?  | Tags de pesquisa                                                      |
| `requires`         | objeto?   | `{ omniroute?, permissions[] }`                                       |
| `hooks`            | objeto?   | Booleanos declarando quais ganchos os implementos do plugin           |
| `skills`           | objeto[]? | Definições de habilidades opcionais                                   |
| `enabledByDefault` | booleano? | Ativar automaticamente na instalação                                  |
| `configSchema`     | objeto?   | Mapa de campos de configuração (`string`/`number`/`boolean`/`select`) |
| `integrity`        | corda?    | Pin opcional do arquivo de entrada `sha256-<base64>`                  |

As permissões são extraídas do enum `network` / `file-read` / `file-write` / `env` / `exec`. Apenas `env` tem um efeito de tempo de execução (uma lista de permissões de variáveis de ambiente um pouco maior para o filho); os outros são declarações e não são aplicados.

## Fluxo do ciclo de vida

```
install (POST /api/plugins, caminho)
  → verificar/validar manifesto → copiar para staging → confirmar que main está dentro do diretório
  → renomear atomicamente para ~/.omniroute/plugins/<name> → inserir linha no banco de dados
  → disparar onInstall → se enabledByDefault: activate

activate (POST /api/plugins/{name}/activate)
  → verificar contenção com realpath → loadPlugin() (iniciar processo filho)
  → registrar hooks declarados → status = "active" → disparar onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → disparar onDeactivate (ANTES de cancelar o registro) → cancelar o registro dos hooks
  → encerrar processo filho → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → deactivate se estiver ativo → disparar onUninstall
  → excluir recursivamente o diretório do plugin com verificação de contenção → excluir linha do banco de dados
```

Executar `install` novamente em um diretório cuja versão do manifesto seja **estritamente
mais recente** que a versão instalada realiza uma atualização automática (reinstalação limpa; a configuração é redefinida
para os valores padrão). Uma versão igual ou anterior é rejeitada.

## Banco de dados

Tabela `plugins` (migração `076_create_plugins.sql`):

| Coluna          | Tipo    | Observações                                               |
| --------------- | ------- | --------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                      |
| `name`          | TEXT    | Único                                                     |
| `version`       | TEXT    | semver; padrão `1.0.0`                                    |
| `description`   | TEXT    | Opcional                                                  |
| `author`        | TEXT    | Opcional                                                  |
| `license`       | TEXT    | Padrão `MIT`                                              |
| `main`          | TEXT    | Arquivo de entrada; padrão `index.js`                     |
| `source`        | TEXT    | Padrão `local`                                            |
| `tags`          | TEXT    | Array JSON; padrão `[]`                                   |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`          |
| `enabled`       | INT     | 0/1; padrão 0                                             |
| `manifest`      | TEXT    | JSON completo do manifesto                                |
| `config`        | TEXT    | JSON; padrão `{}`                                         |
| `config_schema` | TEXT    | JSON; padrão `{}`                                         |
| `hooks`         | TEXT    | Array JSON com os nomes dos hooks declarados; padrão `[]` |
| `permissions`   | TEXT    | Array JSON; padrão `[]`                                   |
| `plugin_dir`    | TEXT    | Diretório absoluto de instalação                          |
| `error_message` | TEXT    | Definido quando `status = "error"`                        |
| `installed_at`  | TEXT    | `datetime('now')`                                         |
| `updated_at`    | TEXT    | `datetime('now')`                                         |
| `activated_at`  | TEXT    | Definido na ativação                                      |

As métricas/análises dos plugins são registradas em tabelas adicionais
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Painel

A página do painel em `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) fornece duas guias:

- **Instalado** — lista os plug-ins instalados com seus ganchos declarados, uma alternância activate/deactivate, um botão de desinstalação e uma ação "Verificar plug-ins" (`POST /api/plugins/scan`).
- **Mercado** — mostra o catálogo do `GET /api/plugins/marketplace` com um campo para definir o registro personalizado URL.

A página sempre mostra um aviso de que os plugins são executados com todos os privilégios do processo OmniRoute.

Uma página de configuração por plugin fica em `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Veja também

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  por que `/api/plugins` é acessível apenas via loopback (Nível 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — o framework de habilidades relacionado
  (`src/lib/skills/`); os plugins podem declarar habilidades em seu manifesto
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — integrações de saída
  orientadas a eventos
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  o padrão `buildErrorBody()` que todas as rotas de plugins usam para respostas de erro
