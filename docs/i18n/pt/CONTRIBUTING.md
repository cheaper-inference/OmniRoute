# Contributing to OmniRoute (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Configuração do Desenvolvimento

### Pré-requisitos

- **Node.js** `>=22.22.2 <23`, ou `>=24.0.0 <27` (recomendado: 24 LTS)
- **npm** 10+

> **Windows com Node 24:** utilize a versão de patch atual do 24 LTS (pelo menos 24.20.0).
> As versões anteriores podem terminar abruptamente após testes bem-sucedidos quando `--test-force-exit` fecha o
> processo. A [correção do libuv para Windows](https://github.com/nodejs/node/pull/61999) do Node resolve
> este erro de execução; mantenha as asserções dos testes e as verificações de saída do executor ativadas.

> **Utilizadores do npm v11+ (Node 24+):** após `npm install`, verifique se os módulos nativos foram instalados:
> `node -e "require('better-sqlite3')"`. Se falhar com `MODULE_NOT_FOUND`,
> execute `npm approve-scripts better-sqlite3 && npm install`. Consulte
> [Resolução de problemas](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Clonar e instalar

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Variáveis de ambiente

```bash
# Crie o seu .env a partir do modelo
cp .env.example .env

# Gere os segredos necessários
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Variáveis principais para o desenvolvimento:

| Variável               | Predefinição de desenvolvimento | Descrição                                  |
| ---------------------- | ------------------------------- | ------------------------------------------ |
| `PORT`                 | `20128`                         | Porta do servidor                          |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`        | URL base do frontend                       |
| `JWT_SECRET`           | (gerar acima)                   | Segredo de assinatura JWT                  |
| `INITIAL_PASSWORD`     | `CHANGEME`                      | Palavra-passe do primeiro início de sessão |
| `APP_LOG_LEVEL`        | `info`                          | Nível de verbosidade dos registos          |

### Definições do dashboard

O dashboard disponibiliza opções na interface para funcionalidades que também podem ser configuradas através de variáveis de ambiente:

| Localização da definição | Opção                         | Descrição                                    |
| ------------------------ | ----------------------------- | -------------------------------------------- |
| Definições → Avançadas   | Modo de depuração             | Ativar registos de pedidos de depuração (IU) |
| Definições → Geral       | Visibilidade da barra lateral | Mostrar/ocultar secções da barra lateral     |

Estas definições são armazenadas na base de dados e persistem após reinícios, substituindo as predefinições das variáveis de ambiente quando definidas.

### Executar localmente

```bash
# Modo de desenvolvimento (atualização automática)
npm run dev

# Compilação de produção
npm run build    # next build → .build/next/ e depois assembleStandalone → dist/
npm run start

# Compilação rápida apenas do backend/API para alterações de contribuidores
npm run build:contributor

# Compilação de lançamento (compilação limpa + sentinela HEAD — necessária para a implementação)
npm run build:release   # rm -rf .build dist e depois build + escreve dist/BUILD_SHA

# Configuração comum da porta
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

A compilação de contribuidores executa uma validação apenas de compilação: não monta a
distribuição autónoma nem compila recursos opcionais de empacotamento nativo. Utilize a compilação
de produção normal quando precisar de validar o pacote pronto para distribuição.

### Estrutura do resultado da compilação

| Diretório | Conteúdo                                                                               | Rastreado |
| --------- | -------------------------------------------------------------------------------------- | --------- |
| `src/`    | Código-fonte da aplicação (TypeScript / TSX)                                           | Sim       |
| `.build/` | Intermédios — resultado de `next build` (ignorado pelo git, `distDir = .build/next`)   | Não       |
| `dist/`   | Pacote pronto para distribuição — montado por `assembleStandalone` (ignorado pelo git) | Não       |

O pipeline de compilação é executado numa única passagem:

```
npm run build
  └─ next build → .build/next/standalone  (resultado do Next.js)
  └─ assembleStandalone()                 (copia standalone + static + public + recursos nativos)
       └─ resultado: dist/                (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` limpa adicionalmente ambos os diretórios primeiro e escreve
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) como sentinela de integridade da implementação.

`npm run build:contributor` utiliza o perfil de compilação apenas do backend. Cria temporariamente stubs
para os ficheiros da IU do dashboard durante a compilação, mantém os processadores de rotas da API
e repõe os ficheiros originais após a compilação. Utilize `npm run build` para alterações que afetem a IU
do dashboard ou para a validação completa de uma versão; o perfil de contribuidores não substitui a compilação de lançamento.

> **Nota sobre a implementação no VPS:** o diretório de imagens remoto `/usr/lib/node_modules/omniroute/app/`
> não é alterado. As ferramentas de implementação sincronizam através de rsync o conteúdo de `dist/` para esse diretório.
> Apenas o caminho do resultado da compilação no repositório foi alterado (`app/` → `dist/`).

URLs predefinidos:

- **Dashboard**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Fluxo de Trabalho do Git

> ⚠️ **NUNCA faça commits diretamente em `main`.** Utilize sempre branches de funcionalidade.
>
> **Base do PR:** selecione como destino a branch `release/vX.Y.Z` ativa (não `main`). Consulte
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) para obter informações sobre o
> modelo de uma release por branch + etiqueta aquando da publicação.

```bash
# Crie uma branch a partir da versão mais recente da release ativa (exemplo: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... efetue as alterações ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Abra um Pull Request com base = release/v3.8.49
```

### Nomenclatura das Branches

| Prefixo     | Finalidade                    |
| ----------- | ----------------------------- |
| `feat/`     | Novas funcionalidades         |
| `fix/`      | Correções de erros            |
| `refactor/` | Reestruturação do código      |
| `docs/`     | Alterações à documentação     |
| `test/`     | Adições/correções de testes   |
| `chore/`    | Ferramentas, CI, dependências |

### Mensagens de Commit

Siga a especificação [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adicionar circuit breaker às chamadas de fornecedores
fix: resolver caso extremo na validação do segredo JWT
docs: atualizar SECURITY.md com proteção de PII
test: adicionar testes unitários de observabilidade
refactor(db): consolidar tabelas de limites de taxa
```

Âmbitos (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Executar testes

```bash
# Todos os testes (unitários + vitest + ecossistema + e2e)
npm run test:all

# Ficheiro de teste individual (executor de testes nativo do Node.js — a maioria dos testes utiliza este)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Apenas os testes unitários afetados pela sua alteração (o mesmo seletor TIA que a validação da CI, #8084)
npm run test:scoped            # alterações no último commit (ou na árvore de trabalho)
npm run test:scoped:staged     # apenas alterações preparadas — funciona bem com uma execução antes do commit
npm run test:scoped:full       # primeiro, reconstrói o mapa do grafo de importações (após adicionar/mover ficheiros)
# O código de saída 1 + "execute o conjunto completo" significa que um ficheiro central (tsconfig, package.json, …) ou
# código-fonte não mapeado foi alterado — o seletor falha de forma segura e nunca ignora testes silenciosamente.

# Vitest (servidor MCP, autoCombo, cache)
npm run test:vitest

# Testes E2E (requer Playwright)
npm run test:e2e

# Testes E2E dos clientes de protocolo (transportes MCP, A2A)
npm run test:protocols:e2e

# Testes de compatibilidade do ecossistema
npm run test:ecosystem

# Validação de cobertura: 60% de instruções/linhas/funções/ramos
npm run test:coverage
npm run coverage:report

# Verificação de lint + formatação
npm run lint
npm run check

# Teste rápido combinado e condicionado com serviços reais a montante (requer acesso ao VPS + créditos reais do fornecedor)
# Contacta fornecedores REAIS — tem um pequeno custo. NUNCA é executado na CI. É ignorado sem erros sem a condição de ativação.
# Requer: acesso ssh root@192.168.0.15 (carrega um instantâneo da BD só de leitura a partir do VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Teste rápido em ambiente real no VPS da fase 3 — scripts Node ESM simples, que contactam diretamente o servidor .15 em funcionamento.
# Requer: acesso ssh root@192.168.0.15 (combinações criadas/eliminadas através de SQLite por SSH).
# Contacta fornecedores REAIS (custo reduzido). Cria/elimina apenas combinações __live_test__*. NUNCA é executado na CI.
# REQUIRE_API_KEY=false em .15, pelo que não é necessária uma chave de API, mas respeita COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY, caso estejam definidas.
npm run test:combo:live:vps              # 7 cenários HTTP (priority/round-robin/weighted/cost/fusion/auto + estado)
npm run test:combo:live:vps:failover     # adiciona um cenário real de comutação por falha entre fornecedores (8 no total)
```

Notas sobre a cobertura:

- `npm run test:coverage` mede a cobertura do código-fonte para o conjunto principal de testes unitários, exclui `tests/**` e inclui `open-sse/**`
- Os pedidos de integração têm de manter a validação de cobertura em **60%+** de instruções/linhas/funções/ramos
- Se um PR alterar código de produção em `src/`, `open-sse/`, `electron/` ou `bin/`, terá de adicionar ou atualizar testes automatizados no mesmo PR
- `npm run coverage:report` apresenta o relatório detalhado, ficheiro a ficheiro, da execução de cobertura mais recente
- `npm run test:coverage:legacy` preserva a métrica anterior para comparação histórica
- Consulte `docs/ops/COVERAGE_PLAN.md` para ver o plano faseado de melhoria da cobertura

### Requisitos dos pedidos de integração

Antes de abrir um PR, utilize o
[Percurso Ideal de Contribuição](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) para executar o ciclo direcionado para
as suas alterações. O conjunto completo de testes unitários (4 partições da CI), o Vitest, a validação de cobertura de **60%+** e
a compilação de produção são responsabilidade da CI — executá-los localmente não fornece informação adicional que as
verificações do PR ainda não disponibilizem e, em máquinas mais modestas, pode saturar o anfitrião (#8084):

- Execute os ficheiros de teste que abrangem a sua alteração: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Execute `npm run lint`
- Inclua ou atualize testes automatizados no mesmo PR sempre que o código de produção for alterado
- Em ficheiros `node:test`, coloque todos os `await` de nível superior (como `await import(...)`) antes do primeiro `test()` / `describe()`: com `--test-force-exit`, os testes registados depois podem, silenciosamente, nunca ser executados (#18045; imposto por `npm run check:test-tla-order`)
- Inclua na descrição do PR os ficheiros de teste alterados ou adicionados quando o código de produção for alterado
- Verifique o resultado do SonarQube no PR quando os segredos do projeto estiverem configurados na CI

Estado atual dos testes: **122 ficheiros de testes unitários** que abrangem:

- Tradutores de fornecedores e conversão de formatos
- Limitação da taxa, disjuntor e resiliência
- Cache semântica, idempotência e acompanhamento do progresso
- Operações e esquema da base de dados (21 módulos de BD)
- Fluxos OAuth e autenticação
- Validação de endpoints da API (Zod v4)
- Ferramentas do servidor MCP e imposição de âmbitos
- Sistemas de memória e competências

---

## Estilo de código

- **ESLint** — Execute `npm run lint` antes de fazer commit
- **Prettier** — Formatação automática através de `lint-staged` ao fazer commit (2 espaços, pontos e vírgulas, aspas duplas, largura de 100 caracteres, vírgulas finais es5)
- **TypeScript** — Todo o código em `src/` utiliza `.ts`/`.tsx`; `open-sse/` utiliza `.ts`/`.js`; documente com TSDoc (`@param`, `@returns`, `@throws`)
- **Sem `eval()`** — O ESLint aplica `no-eval`, `no-implied-eval`, `no-new-func`
- **Validação com Zod** — Utilize esquemas Zod v4 para validar todos os dados de entrada da API
- **Nomenclatura**: ficheiros = camelCase/kebab-case, componentes = PascalCase, constantes = UPPER_SNAKE

### Tratamento de erros / blocos catch vazios

Nunca deixe um `catch` sem explicação. Classifique-o numa de duas categorias (operacionaliza
a regra estrita «nunca ignorar silenciosamente erros em streams SSE»):

- **Intencional (a nossa própria limpeza/telemetria de melhor esforço)** — uma falha neste ponto é esperada e
  inofensiva; adicione um comentário de uma linha com a justificação, sem registo (o registo em cada pedido é o
  ruído que esta convenção evita).

  ```ts
  } catch {} // é esperado fechar um controlador já fechado após o cliente se desligar
  ```

- **Deve ser registado (código externo/fornecido pelo autor da chamada, ou quando ignorar o erro altera o fluxo de controlo)** — mantenha
  o catch (nunca permita que interrompa o stream), mas emita um `console.debug`/`warn` contextual para que a
  falha possa ser detetada.

  ```ts
  } catch (e) {
    console.debug("[STREAM] erro na callback onFailure:", e);
  }
  ```

Consulte `open-sse/utils/stream.ts` e `open-sse/utils/streamHandler.ts` para ver exemplos aplicados.

---

## Estrutura do Projeto

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite domain modules + 130 migrations
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (329), MCP scopes, 22 routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 150 executor modules (executor classes + per-provider helpers)
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (110 unique tools, 3 transports, 33 scopes)
├── services/               # 178 top-level services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (1,574 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/
├── adr/                     # Architecture Decision Records
├── architecture/            # System architecture & resilience
├── comparison/              # OmniRoute vs alternatives
├── compression/             # Compression guides & rules
├── dev/                     # Development guides
├── diagrams/                # Architecture diagrams
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # User guide, Docker, setup, troubleshooting
├── i18n/                    # Internationalized README translations
├── marketing/               # Marketing materials
├── ops/                     # Deployment, proxy, coverage, releases
├── providers/               # Provider-specific docs
├── reference/               # API reference, env vars, CLI tools, free tiers
├── releases/                # Release notes
├── routing/                 # Auto-combo engine, reasoning replay
├── screenshots/             # Dashboard screenshots
├── security/                # Guardrails, compliance, stealth, tokens
└── specs/                   # Design specs
```

---

## Adicionar um Novo Fornecedor

### Passo 1: Registar Constantes do Fornecedor

Adicione a `src/shared/constants/providers.ts` — validado pelo Zod aquando do carregamento do módulo.

### Passo 2: Adicionar um Executor (se for necessária lógica personalizada)

Crie um executor em `open-sse/executors/your-provider.ts`, estendendo o executor base.

### Passo 3: Adicionar um Tradutor (se o formato não for OpenAI)

Crie tradutores de pedidos/respostas em `open-sse/translator/`.

### Passo 4: Adicionar a Configuração OAuth (se for baseada em OAuth)

Adicione as credenciais OAuth em `src/lib/oauth/constants/oauth.ts` e o serviço em `src/lib/oauth/services/`.

Se o fornecedor a montante distribuir um `client_id`/segredo OAuth público ou uma chave da API Web do Firebase no respetivo CLI público / pacote para navegador, **não** o incorpore como um literal de cadeia de caracteres. Utilize `resolvePublicCred()` de `open-sse/utils/publicCreds.ts` e adicione uma entrada de bytes mascarada a `EMBEDDED_DEFAULTS`. O fluxo de trabalho completo obrigatório está documentado em [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

No interior de processadores/executores, as mensagens de erro que chegam ao cliente têm de passar por `buildErrorBody()` / `sanitizeErrorMessage()` de `open-sse/utils/error.ts` — nunca coloque `err.stack` ou `err.message` em bruto no corpo de uma resposta. Consulte [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Passo 5: Registar Modelos

Adicione as definições dos modelos em `open-sse/config/providerRegistry.ts`.

### Passo 6: Adicionar Testes

Escreva testes unitários em `tests/unit/` que abranjam, no mínimo:

- Registo do fornecedor
- Tradução de pedidos/respostas
- Tratamento de erros

---

## Lista de verificação de pull request

- [ ] Aprovação nos testes (`npm test`)
- [ ] Passes de linting (`npm run lint`)
- [ ] A compilação foi bem-sucedida (`npm run build`)
- [ ] tipos TypeScript adicionados para novas funções e interfaces públicas
- [ ] Sem segredos codificados ou valores alternativos
- [ ] Credenciais upstream públicas incorporadas através de `resolvePublicCred()` (ver [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) ), nunca como literais
- [ ] As respostas de erro são encaminhadas através de `buildErrorBody()` / `sanitizeErrorMessage()` — sem rastreios de pilha brutos nos corpos de resposta (consulte [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) )
- [ ] Os comandos shell (`exec` / `spawn`) passam valores de tempo de execução através de `env`, e não através de interpolação de strings
- [ ] Todas as entradas validadas com esquemas Zod
- [ ] Registo de alterações** fragmento** adicionado em `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` para alterações orientadas para o utilizador (consulte [`changelog.d/README.md`](./changelog.d/README.md) ) — do** não** edite `CHANGELOG.md` diretamente; fragmentos são agregados no momento do lançamento e nunca entram em conflito entre PRs
- [ ] Documentação atualizada (se aplicável)
- [ ] Nenhum novo alerta CodeQL /verificação secreta foi aberto ou cada um deles foi descartado com justificação técnica referenciando o documento `docs/security/` relevante
- [ ] Rotas que geram processos filhos (`/api/mcp/`, `/api/cli-tools/runtime/`) classificados como `isLocalOnlyPath()` em `src/server/authz/routeGuard.ts` — ver [Hard Rule #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Não há trailers AI/bot `Co-authored-by` em mensagens de commit (regra rígida #16) Os colaboradores humanos — cujo trabalho é reutilizado são creditados com trailers `Co-authored-by: Name <email>` padrão

---

## Lançamentos

Os lançamentos são geridos através do fluxo de trabalho `/generate-release`. Quando é criado um novo GitHub Release, o pacote é **publicado automaticamente no npm** através do GitHub Actions.

Para implementações em VPS, utilize `npm run build:release` (e não `npm run build`) — este comando efetua uma
recompilação limpa, reúne o bundle em `dist/` e escreve o ficheiro sentinela `dist/BUILD_SHA`.
Em seguida, utilize as skills `/deploy-vps-*-cc`, que sincronizam `dist/` através de rsync com o diretório remoto `app/`.

---

## Obter Ajuda

- **Arquitetura**: Consulte [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Referência da API**: Consulte [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Documentação de segurança**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Documentação de operações**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Problemas**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
