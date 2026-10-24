# Quality Gates Reference (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Este documento é a referência oficial para todas as verificações de qualidade de CI no OmniRoute.
Ele descreve cada verificação, o que ela valida, em qual job de CI é executada, se usa
uma linha de base incremental ou uma política de aprovação/reprovação e se bloqueia o build ou é apenas consultiva.

Para um breve resumo e a política de lista de permissões, consulte a seção "Verificações de qualidade e linhas de base incrementais"
em `AGENTS.md`. Para a avaliação crítica, a classificação de maturidade e o plano de
replicação independente de ferramentas do mesmo sistema, consulte o
[Manual de verificações de qualidade](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inventário de gates e perfis de execução

### Admissão de candidatos

Os workflows de CI e Quality Gates emitem cada um um veredito estável: `Gate / CI` e
`Gate / Quality`. Sua política de admissão versionada enumera cada job upstream como
obrigatório ou consultivo. Um job obrigatório aplicável deve ser bem-sucedido: resultados
ausentes, cancelados, ignorados, pendentes e desconhecidos não podem estabelecer PASS. Uma
classificação válida de docs-only ou catalog-only pode tornar uma lane de código
inaplicável; um PR em rascunho (draft) não é um candidato aceito. Uma label `hotfix` não
dispensa evidências.

Ambos os workflows cobrem PRs para branches main/release, pushes para `main`, dispatch
manual e eventos de merge-group. Push, dispatch e merge-group executam a seleção completa.
Pushes para `release/**` não os iniciam (2026-10-18): cada mudança já executou a matriz em
seu PR e a combinação mesclada é responsabilidade do Release-Green
(`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks e merge groups usam runners hospedados
para jobs que de outra forma selecionariam runners self-hosted; capacidade hospedada
suficiente deve ser verificada antes do rollout.

Cada recibo JSON identifica o SHA do checkout, a execução do workflow e a tentativa.
A CLI rejeita divergência de SHA entre checkout e evento. Os testes de workflow vinculam
a participação na política à lista `needs` do job de veredito, de modo que uma lane nova
ou removida não possa desaparecer silenciosamente. Os recibos cobrem seu próprio workflow,
não publicação, implantação ou os detalhes internos de um scanner consultivo existente.
Ativar ambos os nomes de check nas regras de branch é uma mudança administrativa separada;
adicionar esses jobs não protege, por si só, um branch.

### Inventário de varredura estática

O inventário versionado de aliases npm e a composição da varredura estática ficam em
`config/quality/gate-manifest.json`. Execute `npm run check:gate-manifest` para validar
nomes de scripts e comandos exatos em relação ao `package.json`; adições, remoções e
divergência de comandos fazem falhar tanto o hook local quanto os jobs de classificação
de mudanças no CI. Um alias não é um job de workflow, instância de matriz ou caso de
teste: essas contagens não devem ser apresentadas como intercambiáveis.

Use `npm run quality:scan -- --list` ou `npm run quality:scan:fast -- --list`
para inspecionar os aliases selecionados sem executá-los. O runner invoca o entrypoint
do npm, portanto seu runtime (incluindo Bun, onde configurado) é preservado. O manifesto
registra aliases fora desses perfis como invocados separadamente, e comandos de manutenção
são proibidos em perfis de varredura somente leitura.

Esses perfis cobrem apenas a varredura estática. Eles não certificam testes de produto,
cobertura, empacotamento, verificações externas ou a aceitação completa de release de um
candidato. A admissão do workflow usa o `config/quality/admission-policy.json` vinculado
e o `scripts/quality/admission-verdict.mjs`. Os perfis de release-observer permanecem
separados; inspecione seus checks aplicáveis e recibos de forma independente. O inventário
em texto abaixo é uma referência, não uma prova de que um gate realmente executou.

Os scripts ficam em `scripts/check/` (gates de política) e `scripts/quality/` (motor de ratchet).
A fonte de verdade do CI é `.github/workflows/ci.yml`.

### Fast-path de PR de release (`quality.yml`)

O `.github/workflows/quality.yml` complementa o CI em PRs para main/release, pushes para
`main`, dispatch e merge groups. PRs usam checks rápidos filtrados por caminho. O build
duplicado permanentemente desabilitado foi removido; as verificações reais de
build/package/boot permanecem no CI.

| Job                                              | Escopo                                                                                                                                                                                                                        | Bloqueio             |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | PRs de docs/código; refs de docs de API e docs-all                                                                                                                                                                            | Sim                  |
| `Fast Quality Gates`                             | PRs de código; verificações estáticas, typecheck, typecheck do dashboard, testes unitários impactados                                                                                                                         | Sim                  |
| `Forgotten sibling tests`                        | PRs de código; módulos alterados rastreados até consumidores estáticos e testes irmãos candidatos; caminhos de barrel e import dinâmico são reportados como diagnósticos consultivos, com exceções de allowlist referenciadas | **Consultivo**       |
| `Vitest (fast-path)`                             | PRs de código; suíte vitest rápida                                                                                                                                                                                            | Sim                  |
| `Unit Tests fast-path`                           | PRs de código; suíte unitária em 4 shards                                                                                                                                                                                     | Sim                  |
| `No new ESLint warnings`                         | PRs de código; guarda de lint sensível a supressões                                                                                                                                                                           | Sim, incluindo forks |
| `Merge integrity (changelog + generated skills)` | PRs que não são rascunho; sincronização de changelog e skills geradas                                                                                                                                                         | Sim, incluindo forks |

#### Relatório de testes irmãos esquecidos

`npm run check:forgotten-sibling-tests` reutiliza o resolvedor de imports por trás do mapa de impacto de testes.
Para cada módulo de produção alterado, ele reporta cadeias determinísticas
`changed module/symbol -> static consumer -> candidate sibling test` quando o teste candidato
está ausente no diff do pull request. O resumo em Markdown e o resultado em JSON são retidos como
o artefato de workflow `forgotten-sibling-tests` para calibração antes de qualquer rollout bloqueante.

Reexportações de barrel e imports dinâmicos são apenas diagnósticos de resolução; eles nunca criam um
achado bloqueante. As exceções revisadas ficam em
`config/quality/forgotten-sibling-allowlist.json`. Cada entrada deve nomear o consumidor e o teste
candidato, fornecer uma justificativa específica e vincular uma issue ou pull request do GitHub. Entradas malformadas falham
de forma bloqueante. Exceções não podem suprimir um teste candidato excluído nem um diff que adiciona `.skip`/`.todo`;
o enfraquecimento de asserções e outras formas de mascaramento permanecem sob responsabilidade do gate
`check:test-masking`, que bloqueia de forma independente.

### Job: `lint`

É executado em todo PR para `main`. Bloqueia o merge em caso de falha.

| Script (`npm run ...`)            | Valida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Bloqueante                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | A versão do Node.js está dentro do intervalo suportado                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sim                                        |
| `check:cycles`                    | Importações circulares em todo o `src/` + `open-sse/` (baseado em AST, com os `paths` do tsconfig resolvidos). O modo simples sai com código 1 sempre que existir qualquer ciclo (fail-closed desde #15281) e lista as SCCs. `check:cycles:ratchet` (o que o CI executa) bloqueia quando a contagem excede o teto de `metrics.cycles` em `quality-baseline.json` — atualmente 14, `direction: down`, portanto só pode diminuir (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sim (ratchet)                              |
| `check:boundary`                  | Acoplamento `open-sse → src`: importações únicas arquivo a arquivo do engine para o app (`scripts/quality/measure-boundary.mjs`; a lista de arestas é o backlog de remediação da divisão core/módulo da v4). Modo simples = relatório consultivo (igual a `quality:boundary`). `check:boundary:ratchet` (o que o CI executa, também no loop de ratchet dos fast-gates do `quality.yml`) bloqueia quando a contagem excede o teto de `metrics.boundaryOpenSseToSrc` em `quality-baseline.json` — inicializado no valor medido de 771, `direction: down`; `--update` apenas o reduz; relativo à base em PRs (`--base-ref`, veja abaixo)                                                                                                                                                                                                                                                                                                 | Sim (ratchet)                              |
| `check:route-validation:t06`      | Schemas Zod presentes em todas as rotas (política do Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sim                                        |
| `check:any-budget:t11`            | A contagem de `@ts-expect-error // any` não excede o orçamento (catraca do Tier 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sim                                        |
| `check:provider-consistency`      | Todo provider em `providers.ts` tem uma entrada correspondente em `providerRegistry.ts` (e vice-versa, dentro da allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Sim                                        |
| `check:model-lifecycle`           | As três tabelas de roteamento mantidas manualmente permanecem consistentes com o snapshot de ciclo de vida versionado (#11503): `FITNESS_TABLE` (`taskFitness.ts`) não pontua nenhum id descontinuado que o `REGISTRY` consiga rotear; todo destino de `BUILT_IN_ALIASES` está presente no `REGISTRY` e ausente do snapshot de ids descontinuados; todo id descontinuado ainda presente no `REGISTRY` é encaminhado ou listado em `allowedRetiredInCatalog`; e nenhuma origem ou destino de `DEFAULT_DEGRADATION_MAP` aparece como descontinuado nesse snapshot. Isso não prova que um modelo está sendo servido atualmente por um upstream ativo. Offline — compara com `config/quality/model-lifecycle.json`, atualizado manualmente com `npm run quality:refresh-model-lifecycle` (rede; não integrado ao CI). `allowedRetiredInCatalog` é uma catraca de burn-down: adicione uma entrada somente com uma issue de acompanhamento. | Sim                                        |
| `check:fetch-targets`             | Todo `fetch("/api/...")` no `src/` do lado cliente resolve para um `route.ts` real                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sim                                        |
| `check:deps`                      | Todas as dependências instaláveis via `npm install` em cada `package.json` do repositório estão em `dependency-allowlist.json`; pacotes novos sem pin ou slopsquatted são sinalizados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sim                                        |
| `audit:deps`                      | `npm audit` (raiz + electron) — nenhum advisory alto/crítico (sobrepõe-se ao `check:vuln-ratchet` do osv; consulte o Rationalization Backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Sim                                        |
| `check:lockfile`                  | Integridade do `package-lock.json` — registro https, hashes de integridade, sem overrides de host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sim                                        |
| `check:licenses`                  | Allowlist de licenças SPDX para dependências de produção                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Sim                                        |
| `check:tracked-artifacts`         | Sem artefatos de build / symlinks de `node_modules` commitados (também executa no pre-commit do husky; o pre-push é intencionalmente leve — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sim                                        |
| `check:ai-attribution`            | Sem trailer `Co-Authored-By` de IA/bot ou rodapé de geração por IA em commits, título ou corpo do PR — Regra Rígida #16 (no loop de fast-gates do `quality.yml` para PR→`release/**` — lê o payload do evento, no-op fora de PRs — e um step exclusivo de PR no lint do `ci.yml` para PR→`main`; também o hook `commit-msg` do husky; coautores humanos são permitidos; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:vitest-exclusions`         | Toda exclusão do Vitest referencia uma issue de rastreamento e consta em `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sim                                        |
| `check:file-size`                 | Arquivos-fonte (`.ts`/`.tsx` em `src/`, `open-sse/`, `electron/`, `bin/`) permanecem dentro de `cap` e arquivos de teste (`*.test.ts(x)`) dentro de `testCap`; arquivos congelados em `file-size-baseline.json` (`frozen` / `testFrozen`) não podem crescer além do tamanho registrado                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sim                                        |
| `check:error-helper`              | Respostas de erro em executores/handlers usam `buildErrorBody()` / `sanitizeErrorMessage()` (Regra Rígida #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sim                                        |
| `check:migration-numbering`       | Arquivos SQL de migração são numerados sequencialmente, sem lacunas ou duplicatas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sim                                        |
| `check:public-creds`              | Nenhum `client_id`/`client_secret` OAuth literal ou chaves Web do Firebase fora de `publicCreds.ts` (Regra Rígida #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sim                                        |
| `check:db-rules`                  | Nenhum SQL bruto fora dos módulos `src/lib/db/`; nenhuma importação barrel de `localDb.ts` (Regras Rígidas #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sim                                        |
| `check:known-symbols`             | Executores de provedor, estratégias de roteamento e tradutores registrados em suas tabelas de dispatch correspondem aos arquivos em disco — sem símbolos órfãos ou não declarados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sim                                        |
| `check:route-guard-membership`    | Toda rota que gera um processo filho é classificada por `isLocalOnlyPath()` (Regras Rígidas #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Sim                                        |
| `check:test-discovery`            | Cada arquivo `*.test.ts` / `*.spec.ts` do repositório é coletado por pelo menos um executor de testes (efeito catraca: a lista de órfãos em `test-discovery-baseline.json` só pode diminuir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sim                                        |
| `check:agent-skills-sync`         | Os artefatos gerados de agent-skills correspondem ao catálogo de origem (sem divergência)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:provider-asset-provenance` | Logos/ativos de provedores possuem um registro de procedência documentado                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | Arquivos de configuração JSON são analisados com sucesso e atendem às regras de lint do repositório                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `typecheck:core`                  | Compilação TypeScript sem erros (apenas avisos consultivos)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Sim                                        |
| `typecheck:noimplicit:core`       | `noImplicitAny` estrito — prospectivo; muitos pontos de chamada pré-existentes ainda precisam de anotações                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | **Consultivo** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` com escopo limitado a `src/app/(dashboard)/**` (#7033) — a lista de permissões curada de 27 arquivos do `typecheck:core` não inclui nenhum TSX do dashboard, e o `next build` também nunca verifica os tipos dele (`next.config.mjs` define `ignoreBuildErrors: true`), portanto as regressões de identificadores órfãos lá (#6625/#6909) eram invisíveis para o CI. Comparação com uma linha de base congelada de contagem por arquivo/por código TS (`config/quality/dashboard-typecheck-baseline.json`, o mesmo padrão de fiscalização de obsolescência do `check:known-symbols`) — apenas erros NOVOS além da contagem da linha de base fazem o gate falhar; reduza a catraca com `--update` quando um erro pré-existente for corrigido.                                                                                                                                                                                    | Sim                                        |

### Trabalho: `quality-gate`

Executa após `test-coverage`. Bloqueia o merge em caso de falha.

| Script                       | Valida                                                                                                                                                                                | Bloqueante                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | Emite `quality-metrics.json` (contagem de warnings do ESLint, cobertura do relatório mesclado de shards)                                                                              | Sim (upstream do ratchet) |
| `quality:ratchet`            | Cada métrica em `quality-baseline.json` não regrediu (warnings do ESLint ≤ baseline; cobertura ≥ baseline)                                                                            | Sim                       |
| `check:duplication`          | A duplicação de código (jscpd@4) não excede o baseline em `quality-baseline.json`                                                                                                     | Sim                       |
| `check:complexity`           | A complexidade ciclomática em nível de arquivo não excede o limite (`complexity` do núcleo do ESLint + `max-lines-per-function`)                                                      | Sim                       |
| `check:cognitive-complexity` | Ratchet de complexidade cognitiva (`eslint-plugin-sonarjs`) — passada separada do ESLint; o CI executa ambas mescladas como a única etapa `check:complexity-ratchets`                 | Sim                       |
| `check:dead-code`            | O ratchet de exports/arquivos não utilizados (knip) não regride em relação ao baseline                                                                                                | Sim                       |
| `check:compression-budget`   | Orçamento do benchmark de compressão — os pisos de economia de tokens por engine não devem regredir                                                                                   | Sim                       |
| `check:type-coverage`        | O ratchet de percentual tipado (`type-coverage`) não regride; em grande parte subsume `typecheck:noimplicit:core`                                                                     | Sim                       |
| `check:codeql-ratchet`       | A contagem de alertas abertos do CodeQL não regride (lê via `gh api`; ignora graciosamente sem token) — cadência de atualização e acionamento manual: veja "Ratchet do CodeQL" abaixo | Sim                       |

### Job: `quality-extended`

O job inteiro é apenas consultivo (`continue-on-error: true`). Os ratchets baseados em
npm executam de verdade; os scanners externos são instalados via `gh release download`
e se autoignoram (exit 0) quando um binário ainda está ausente.

| Script                   | Valida                                                                                                                                                                                                                      | Bloqueante                                               |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `check:circular-deps`    | Sem dependências circulares (dpdm)                                                                                                                                                                                          | **Consultivo**                                           |
| `check:bundle-size`      | O tamanho do bundle não excede o limite                                                                                                                                                                                     | **Consultivo**                                           |
| `check:secrets`          | Varredura de segredos (gitleaks) — ignora se o binário estiver ausente                                                                                                                                                      | **Consultivo**                                           |
| `check:vuln-ratchet`     | Vulnerabilidades de dependências (osv-scanner) não regridem — ignora se o binário estiver ausente                                                                                                                           | **Consultivo**                                           |
| `check:workflows`        | Lint de workflows (actionlint + zizmor); scanners ausentes/quebrados, relatórios inválidos ou baseline de ratchet ausente falham como INCOMPLETE. Descobertas válidas seguem a política strict/advisory/ratchet selecionada | Execução obrigatória; ratchet do zizmor bloqueante no CI |
| `check:openapi-breaking` | Mudanças breaking no contrato público da API (`openapi.yaml`) em relação ao branch base (oasdiff) — emite `openapiBreaking=N`; ignora se o oasdiff estiver ausente ou a spec base não puder ser resolvida                   | **Consultivo**                                           |

### Job: `docs-sync-strict`

Executa em todo PR para `main`. Bloqueia o merge em caso de falha.

| Script                         | Valida                                                                                                                                                                                   | Bloqueante                 |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | Meta-gate que executa os 6 sub-gates abaixo sequencialmente                                                                                                                              | Sim                        |
| ↳ `check:docs-sync`            | Consistência de versão entre CHANGELOG / OpenAPI / llm.txt                                                                                                                               | Sim                        |
| ↳ `check:docs-counts`          | Contagens em texto (contagem de provedores, contagem de migrações, etc.) estão dentro da janela de ratchet das contagens reais                                                           | Sim                        |
| ↳ `check:env-doc-sync`         | Toda variável de ambiente em `.env.example` está documentada em uma tabela da documentação, e vice-versa                                                                                 | Sim                        |
| ↳ `check:deprecated-versions`  | Nenhuma string de versão descontinuada na documentação                                                                                                                                   | Sim                        |
| ↳ `check:doc-links`            | Links markdown internos na documentação resolvem para arquivos reais (formato `[text]`/`(path)`)                                                                                         | Sim                        |
| ↳ `check:fabricated-docs`      | Rotas, variáveis de ambiente, comandos CLI, nomes de hooks e caminhos de arquivos citados na documentação existem na base de código. Gate rígido via `--strict`; falha suave sem a flag. | Sim (via `--strict` no CI) |
| `check:cli-i18n`               | Strings de comandos CLI estão presentes em todos os arquivos de localidade i18n                                                                                                          | Sim                        |
| `check:openapi-coverage`       | A especificação OpenAPI cobre pelo menos um piso com ratchet de rotas reais                                                                                                              | Sim                        |
| `check:openapi-security-tiers` | Anotações de nível de segurança em `openapi.yaml` são consistentes com as classificações de `routeGuard.ts`                                                                              | **Consultivo**             |
| `check:openapi-routes`         | Todo caminho em `openapi.yaml` resolve para um `route.ts` real (anti-alucinação)                                                                                                         | Sim                        |
| `check:docs-symbols`           | Toda referência `/api/...` em `docs/**/*.md` resolve para um `route.ts` real (anti-alucinação)                                                                                           | Sim                        |
| `i18n translation drift`       | Chaves não traduzidas nos arquivos de localidade i18n — apenas aviso                                                                                                                     | **Consultivo**             |

### Job: `i18n-ui-coverage`

| Script                            | Valida                                                                                                                                                                                                     | Bloqueante     |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | A cobertura de chaves i18n da UI é ≥ 65%                                                                                                                                                                   | Sim            |
| `check-ui-value-drift` (inline)   | Um **valor** em inglês reescrito não deixa tradução desatualizada para trás                                                                                                                                | Sim            |
| `check-new-key-coverage` (inline) | Uma **nova** chave em inglês é traduzida em todas as localidades — um marcador `__MISSING__:` é rejeitado                                                                                                  | Sim            |
| `check-translation-ratio`         | A proporção de traduções reais por localidade (folhas idênticas ao inglês / placeholders / ausentes fora da lista de permissões) não deve exceder `config/quality/i18n-translation-baseline.json` + margem | **Consultivo** |

Requer `fetch-depth: 0` — o gate de descompasso de valor compara `en.json` com a base de merge.

#### `check-ui-value-drift` — gate de tradução desatualizada

Captura a única regressão de i18n que os outros gates estruturalmente não conseguem ver: um
valor em inglês é reescrito e as traduções derivadas do inglês _anterior_ ficam para trás, de
modo que usuários não anglófonos continuam lendo um texto redigido com confiança, mas agora incorreto.

Isso foi para produção de verdade. `oauthModal.googleOAuthWarning` foi reescrito quando o auxiliar
de login do Antigravity foi lançado (#5203); **39 das 43 localidades** mantiveram o texto
instruindo os operadores a "copiar a URL completa e colá-la abaixo" — um fluxo que não pode ser
concluído para esse provedor. Passou despercebido até #8463 porque:

- `sync-ui-keys` só preenche retroativamente chaves **ausentes**, nunca as **desatualizadas**;
- `check-ui-keys-coverage` conta a _presença_ da chave, então uma tradução desatualizada pontua como coberta;
- `check-translation-drift` acompanha os espelhos de documentação `docs/i18n/<locale>/**.md` —
  ele nunca lê `src/i18n/messages/*.json`. Bloqueante no job `docs-sync-strict` desde a
  ressincronização de 2026-09: edite um documento central → `npm run i18n:run -- --files=<doc>`
  (nível de seção, barato).

**Sensível a diff, não apoiada em baseline.** Ela compara o `en.json` no merge base com a
working tree; para cada chave cujo valor em inglês mudou, qualquer locale que ainda mantenha
uma tradução intacta está desatualizada. Isso deliberadamente **congela a dívida pré-existente** — um diff
não pode revelar de qual inglês antigo uma tradução de longa data veio, então o gate julga
apenas o que a mudança atual toca. A alternativa (um baseline de hash por chave) custaria
um arquivo gerado de ~600 KB, 3× o maior baseline existente, com churn em cada PR de i18n.

Duas maneiras de satisfazê-lo:

1. atualizar as traduções afetadas, ou
2. defini-las como `__MISSING__:<new english>` — o runtime então serve o inglês corrigido
   (`src/i18n/request.ts::deepMergeFallback`, #7258) e a chave entra na fila para tradução.

Se o **significado** da string mudou, prefira **renomear a chave**: uma nova chave não pode herdar
uma tradução desatualizada. Esse é o padrão que #8463 usou.

```bash
npm run i18n:check-value-drift          # estrito (o que o CI executa)
npm run i18n:check-value-drift:warn     # apenas relata
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Sai com 0 e `SKIP reason=base-unresolved` quando o catálogo base não pode ser lido (clone
shallow sem o ref base), espelhando o `check-openapi-breaking`.

### Job: `i18n`

Matriz completa de validação de i18n (um job por locale). Todo o job é consultivo.

| Script                          | Valida                            | Bloqueante                                                |
| ------------------------------- | --------------------------------- | --------------------------------------------------------- |
| `validate_translation.py quick` | Completude da tradução por locale | **Consultivo** (`continue-on-error: true` no job inteiro) |

### Job: `pr-test-policy`

Executa apenas em pull requests.

| Script                 | Valida                                                                                                                                   | Bloqueante |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PRs que alteram código de produção em `src/`, `open-sse/`, `electron/` ou `bin/` devem incluir ou atualizar testes (Regra Rígida #8)     | Sim        |
| `check:test-masking`   | Arquivos de teste alterados não reduzem a contagem líquida de asserts nem adicionam tautologias `assert.ok(true)`                        | Sim        |
| `check:pr-evidence`    | O corpo do PR cita evidência de teste/VPS para a mudança (mecaniza a Regra Rígida #18 fazendo grep na prosa do PR — frágil, ver Backlog) | Sim        |

### Job: `test-vitest`

Executa após o `build`. Bloqueia o merge em caso de falha.

| Suíte            | Valida                                                           | Bloqueante                                                                                                                 |
| ---------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Servidor MCP (110 ferramentas), autoCombo, cache — runner vitest | Sim                                                                                                                        |
| `test:vitest:ui` | Testes de componentes de UI — runner vitest                      | **Bloqueante** — falhas pré-existentes são explicitamente excluídas no `vitest.config.ts`; novas falhas fazem o job falhar |

### Workflows noturnos (agendados, consultivos)

Estes executam em agendamento cron (e `workflow_dispatch`), nunca em PRs. Todos são consultivos.

| Workflow               | Valida                                                                                                                                                      | Bloqueante     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | Testes de propriedade fast-check com seed aleatória + alta contagem de execuções                                                                            | **Consultivo** |
| `nightly-resilience`   | Gate de crescimento de heap, injeção de falhas de caos, carga/soak com k6                                                                                   | **Consultivo** |
| `nightly-llm-security` | Guarda de injeção do promptfoo (modo block) + probes do garak (pulados sem um secret de provedor)                                                           | **Consultivo** |
| `nightly-schemathesis` | Fuzzing de contrato OpenAPI (schemathesis) contra um OmniRoute ativo usando `docs/openapi.yaml` — revela violações de spec / 500s não tratados (Fase 8 B.4) | **Consultivo** |
| `nightly-mutation`     | Pontuação de testes de mutação do Stryker sobre a lane rápida de unidade — mutantes sobreviventes revelam asserts fracos                                    | **Consultivo** |
| `nightly-compat`       | Matriz de compatibilidade do engine Node ao longo das faixas `engines.node` suportadas                                                                      | **Consultivo** |

Baselines de desempenho (heap, TTFB, tempo de build) são registrados, não gateados: veja [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Fase de velocidade (2026-08-30 → v4.0 LTS): todas as linhas de base flexibilizadas em 20%

Decisão do responsável (2026-08-30): até a modularização da v4.0, a velocidade de entrega é mais importante
do que conter a dívida. Todas as linhas de base **numéricas** de ratchet foram flexibilizadas em 20% em uma
única operação auditável, e a fase está declarada em `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| O que mudou                                                                                                                                                                                                                 | Onde                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — contagens em que menos é melhor ×1.2, percentuais em que mais é melhor ÷1.2 (piso de cobertura mantido em 60, `eslintErrors` permanece 0, `eslintWarnings` 0 → 20% da contagem congelada de supressões) | `quality-baseline.json` (a nota `_relax_velocity_2026_08_30` lista todos os valores anteriores → posteriores) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                            | `complexity-baseline.json`, `duplication-baseline.json`                                                       |
| `cap`, `testCap`, todos os limites de linhas de `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                          | `file-size-baseline.json`                                                                                     |
| contagens por arquivo / por código TS ×1.2                                                                                                                                                                                  | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`        |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                         | `scripts/check/check-openapi-coverage.mjs`                                                                    |
| `--require-tighten` passa a ser consultivo enquanto `_policy.requireTighten === false`                                                                                                                                      | `scripts/quality/check-quality-ratchet.mjs`                                                                   |
| o `bank-ratchet-shrinks` noturno fica pausado (ele consolidaria a redução medida e desfaria a margem)                                                                                                                       | `.github/workflows/nightly-release-green.yml`                                                                 |

As listas de permissões (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **não** são orçamentos e não foram alteradas. Os gates de política de aprovação/reprovação (segredos, regras SQL,
contrato de documentação/ambiente, paridade de i18n, testes unitários) permanecem inalterados — um teste vermelho continua sendo um teste vermelho.

**Ferramentas**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — a
  flexibilização executada uma única vez (`scripts/quality/relax-baselines.mjs`); recusa-se a executar duas vezes com a
  mesma nota.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mede todos os gates numéricos da mesma forma que a CI e exibe a margem restante por gate
  (`scripts/quality/baseline-headroom.mjs`). O job noturno `baseline-headroom` publica
  a tabela no resumo da execução do workflow e envia seu relatório JSON/Markdown como
  `baseline-headroom-<run_id>`, retido por 90 dias. As linhas de alerta e críticas identificam gates
  que estão a até 10% de seu limite ou que já o ultrapassaram. Analise esses relatórios como um alerta antecipado de
  consumo dos orçamentos; inspecione as notas `_rebaseline_*` do gate responsável. O job não
  cria nem atualiza mais uma issue permanente; a #12149 preserva o histórico de relatórios anterior.

**Modo de código novo (Clean-as-You-Code) — desde 2026-08-30, somente no caminho rápido de PRs**

Nos eventos `pull_request`, `quality.yml` passa `--base-ref <PR base SHA>` para `check:file-size`,
`check:complexity-ratchets` e `check:dead-code`. Para `check:complexity-ratchets` e
`check:dead-code`, o gate compara a HEAD com a base de merge **restrita aos arquivos alterados pelo PR**
(`scripts/check/newCodeMode.mjs`: a base de merge é materializada em um
`git worktree` descartável, ESLint/knip são executados ali e na HEAD, e as contagens por arquivo são comparadas):

- **bloqueante** — o PR adicionou violações de complexidade ciclomática/cognitiva ou exports mortos nos arquivos que alterou
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` no log);
- **consultivo** — o total global em comparação com a linha de base congelada. Um desvio herdado nunca reprova um
  PR que não o causou; o desvio é congelado novamente na reconciliação da release e monitorado pelo job de margem.

`check:file-size` usa a referência base conforme suas próprias regras (`scripts/check/check-file-size.mjs`, #8522):
ele verifica todos os arquivos-fonte e de teste na árvore, lê a contagem de linhas de cada um na base do PR
com `git show` e reprova um arquivo somente quando ele cresce além do maior valor entre seu teto na linha de base
(`frozen` / `testFrozen`, ou `cap` / `testCap` para um arquivo fora da linha de base) e seu tamanho
na base. Portanto, um arquivo que já apresentava desvio na base nunca reprova um PR que não o causou.

`check:boundary:ratchet` aplica a mesma regra ao seu único número
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): em eventos de PR, tanto os
fast-gates de `quality.yml` quanto o job de lint de `ci.yml` passam o SHA base do PR, o commit base é
medido a partir de uma exportação via `git archive`, e o PR falha somente quando sua contagem de arestas
`open-sse → src` excede o maior valor entre `metrics.boundaryOpenSseToSrc` e a contagem na base. Um desvio
da base acima do teto é relatado (`base drift herdado`), mas nunca faz um PR inocente ficar vermelho; push → main
mantém o teto absoluto, e um SHA base que não possa ser resolvido recorre a ele com um aviso.

Execuções de `workflow_dispatch`, a varredura release-green e o job noturno de headroom não têm uma base de PR
e mantêm a comparação absoluta (global). Cobertura, duplicação e cobertura de tipos permanecem globais
por enquanto (suas ferramentas não produzem um diff por arquivo de forma econômica) — são candidatas ao mesmo tratamento.

**Encerrando a fase na v4.0 (LTS = mais rigorosa do que antes, não "de volta ao normal")**

1. Na ponta pura de `release/v4.0.0`: `npm run quality:headroom --json` para registro e, em seguida,
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, o
   `--update` de cada gate de typecheck — cada baseline cai para o valor medido.
2. Exclua `_policy` de `quality-baseline.json` (reativa `--require-tighten` e a acumulação
   noturna), restaure `THRESHOLD = 36` (ou maior) em `check-openapi-coverage.mjs`.
3. Aperte além do valor medido nos pontos em que a modularização trouxe ganhos: `cap` de tamanho de arquivo de volta para 1000
   (ou 800), pisos de cobertura +5, 0 exportações mortas para os pacotes modularizados.

## Linha de base do ratchet (`quality-baseline.json`)

O mecanismo de ratchet (`scripts/quality/check-quality-ratchet.mjs`) lê `quality-baseline.json`
e o compara com o `quality-metrics.json` recém-coletado. Qualquer métrica que regrida
além de seu épsilon faz a compilação falhar.

Métricas monitoradas atualmente:

| Métrica               | Direção | Significado                                   |
| --------------------- | ------- | --------------------------------------------- |
| `eslintWarnings`      | `down`  | A contagem de avisos do ESLint não pode subir |
| `coverage.statements` | `up`    | A cobertura de instruções não pode cair       |
| `coverage.lines`      | `up`    | A cobertura de linhas não pode cair           |
| `coverage.functions`  | `up`    | A cobertura de funções não pode cair          |
| `coverage.branches`   | `up`    | A cobertura de ramificações não pode cair     |

Para atualizar a linha de base após uma melhoria genuína:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

A flag `--update` grava os valores medidos atuais em `quality-baseline.json`.
Inclua esse arquivo no commit junto com a alteração que melhorou a métrica. Um PR que melhore uma
métrica sem atualizar a linha de base será detectado por `--require-tighten` (Fase 6A.5,
implementação pendente).

### Ratchet do CodeQL: frequência de atualização e acionamento manual

`check:codeql-ratchet` lê o **estado do repositório, atualizado de acordo com uma programação — não por PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` informa
`state: configured`, `schedule: weekly`: a análise da configuração padrão do GitHub, não uma análise
a cada push. Consequência: depois que um PR que CORRIGE alertas é mesclado, o ratchet continua lendo
a contagem antiga e mais alta até que a próxima análise programada seja executada — portanto, ele relata uma regressão
em todos os PRs abertos, incluindo os PRs de acompanhamento do próprio PR de correção, até que a análise seja atualizada.

**Atualização manual**: `gh workflow run codeql.yml --ref release/vX.Y.Z` executa novamente a
análise e republica os alertas em poucos minutos. Leia `.github/workflows/codeql.yml`
primeiro — seu cabeçalho explica que ele é exclusivo para `workflow_dispatch` **porque entra em conflito com
a "configuração padrão" do GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Restaurar os acionadores `push`/`pull_request`/
`schedule` exige primeiro uma **ação do proprietário**: Settings → Code security →
CodeQL: Default → Advanced. Não adicione um acionador `schedule:` sem fazer essa mudança — ele
apenas produzirá execuções com falha.

**Restrinja a linha de base após a queda da contagem** — `node scripts/check/check-codeql-ratchet.mjs
--update` grava a nova contagem medida em `quality-baseline.json` →
`metrics.codeqlAlerts.value`, para que o ratchet não permita silenciosamente uma regressão de volta
ao limite antigo. Exemplo prático (2026-09-02/03): o PR #12502 corrigiu 7 alertas reais
(13 → 6 abertos medidos); o PR #12530 restringiu a linha de base congelada de 11 → 6 para corresponder; os
6 restantes foram então descartados, cada um com sua justificativa, reduzindo o total para 0 aberto.

**Os descartes ficam a critério do operador (Regra Rígida #14)** — nunca descarte um alerta do CodeQL
sem registrar a justificativa técnica no comentário do descarte: `won't fix` para
um requisito de protocolo upstream, `used in tests` para um fixture de teste, `false positive`
para um sanitizador que o CodeQL não consegue detectar (precedente: `docs/security/ERROR_SANITIZATION.md`).

---

## Política de repetição de testes (WS5.4, v3.8.49)

A repetição é por runner, nunca uma regra global indiscriminada — uma repetição indiscriminada transforma regressões reais
em flakes invisíveis:

| Runner           | Política                                                                                                                           | Motivo                                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` somente na CI, com `trace: on-first-retry`                                                                            | O timing do navegador/rede é genuinamente não determinístico; uma repetição com trace transforma um flake em um artefato diagnosticável |
| Vitest           | SEM repetição global. Um teste comprovadamente instável recebe uma repetição explícita por teste (visível no diff, revisada no PR) | Mantém a lista de quarentena no repositório, nunca opaca                                                                                |
| node:test (unit) | SEM repetição, jamais                                                                                                              | Um teste unitário instável é um bug no teste — corrija-o, não tente a sorte novamente                                                   |

SLOs-alvo quando a telemetria de flakes estiver disponível (WS5.2/5.3): taxa de flakes <1% por teste
(limiar de "corrigir agora"), taxa de aprovação ≥95% por pipeline. Valores de referência do setor —
recalibrar com base em nossas próprias medições.

## Desvio de ratchet no nível da release (WS5.5, v3.8.49)

Quando um ratchet (tamanho de arquivo, complexidade, avisos do eslint) regride na ponta PURA da release
— ou seja, a COMBINAÇÃO dos merges causou a regressão, e nenhum PR individual reproduz a
regressão em seu próprio branch — a correção é responsabilidade do **capitão da release, uma única vez, no
branch da release**: prefira extração/refatoração; redefina o baseline somente com a entrada de
justificativa documentada. Nunca atribua o desvio da combinação a um PR de colaborador e nunca
redefina o baseline por PR (isso oculta regressões reais). Primeiro, faça a distinção: reproduza o
erro na ponta pura em uma worktree de investigação antes de presumir que seu PR o causou.

## Consolidando as reduções dos ratchets — a direção descendente (#8584)

O ratchet é apenas parcialmente automático, e justamente na metade errada. **Aumentar** um limite é uma
edição manual de JSON que leva dez segundos e é a maneira mais rápida de desbloquear um PR com falha.
**Reduzir** um limite exige que alguém execute `--update` e faça commit do resultado — e, até
o job `bank-ratchet-shrinks` ser implementado, nenhum workflow fazia isso. A consequência medida
(2026-07-25): 18 arquivos congelados já estavam no limite de 800 linhas para novos arquivos ou abaixo dele, sendo o pior
132× maior (`src/shared/validation/schemas.ts`, 19 linhas carregando um limite de 2,523); o
teto de complexidade passou de `1794 → 2169` ao longo de ~37 notas de redefinição de baseline, com exatamente uma
redução (−1); e "restringir via `--update` no próximo ciclo" foi escrito 31 vezes e cumprido
uma vez. Um limite que sobrevive ao código que o justificou converte silenciosamente cada
decomposição concluída em uma margem de crescimento para quem editar o arquivo em seguida.

`nightly-release-green.yml` → o job **`bank-ratchet-shrinks`** fecha esse ciclo:

|            |                                                                                                            |
| ---------- | ---------------------------------------------------------------------------------------------------------- |
| Executa em | `schedule` (3×/dia) + `workflow_dispatch` — deliberadamente **não** em `push`                              |
| Mede       | o maior `release/vX.Y.Z`, com a mesma resolução + proteção contra injeção de `release-green`               |
| Grava      | `check:file-size --update` e `check:complexity-ratchets --update` (ambos, por construção, somente reduzem) |
| Verifica   | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                   |
| Entrega    | um único PR sempre atualizado contra o branch da release — atualizado à força, sem nunca gerar spam        |

A consolidação é feita em lotes, em vez de a cada push, porque não há requisito de latência (uma redução
consolidada em até 8h é suficiente), enquanto uma execução por merge reconstruiria repetidamente o branch do PR
durante campanhas de merge e arcaria com uma varredura completa do ESLint a cada vez. A detecção permanece no
push (`release-green`); somente a consolidação é feita em lotes.

### O verificador de segurança

O job grava nos baselines sem supervisão, portanto `verify-ratchet-bank.mjs` é o que torna
isso aceitável. Ele compara por diff a árvore posterior ao `--update` com `HEAD` e **interrompe o job
antes que qualquer commit exista** — sem abrir nenhum PR — a menos que cada alteração seja uma das seguintes:

- uma entrada numérica `frozen` / `testFrozen` **reduzida** ou **removida**
- `complexity-baseline.json` → `count` **reduzido**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **reduzido**

Qualquer outra coisa causa falha: aumentar um número, adicionar uma entrada, alterar `cap`/`testCap` ou
excluir/reescrever uma nota `_rebaseline_*` (essas notas são a trilha de auditoria que explica por que cada
teto existe e ficam armazenadas dentro do mesmo objeto `frozen` que contém as entradas dos arquivos).
Um bot capaz de aumentar um limite seria estritamente pior que o estado atual. Proteção contra
regressões: `tests/unit/verify-ratchet-bank.test.ts`.

O job nunca faz push para `release/*` — uma pessoa faz o merge do PR, portanto uma medição incorreta
não pode ser incorporada sem revisão.

## Política de lista de permissões

Todo gate que não pode falhar devido a violações preexistentes usa uma lista de permissões congelada
(por exemplo, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). A política é:

**Corrija a causa raiz; use a lista de permissões somente quando a violação for preexistente e
não puder ser corrigida no mesmo PR.**

Ao adicionar uma entrada a uma lista de permissões:

1. Inclua um comentário com a justificativa.
2. Faça referência à issue de acompanhamento (por exemplo, `// #3498 — Recurso da Fase 2, ainda não implementado`).
3. Remova a entrada no mesmo PR que corrige a violação — uma entrada obsoleta que não
   suprime mais uma violação ativa é, por si só, um defeito (a verificação de entradas obsoletas da 6A.3
   fará o gate falhar em uma entrada órfã da lista de permissões assim que for implementada).

**Não** adicione entradas à lista de permissões para fazer os testes passarem mais rápido. Um gate verde com uma
lista de permissões crescente cria uma falsa sensação de qualidade.

### Quando um gate falhar no seu PR

1. **Leia atentamente a saída do gate** — ela informa exatamente qual arquivo ou símbolo violou
   a regra.
2. **Corrija a violação** — a maioria dos gates consiste em verificações determinísticas do sistema de arquivos que passam assim
   que o código está correto.
3. **Se a violação for preexistente** (ou seja, você não a introduziu, mas agora o gate
   passou a abrangê-la): adicione uma entrada à lista de permissões com um comentário de justificativa e uma issue de acompanhamento.
4. **Se o gate for um mecanismo de catraca** (cobertura, avisos do ESLint, duplicação, complexidade):
   sua alteração piorou a métrica. Corrija o problema subjacente ou, raramente, execute
   `npm run quality:ratchet -- --update` se a alteração for intencional e a degradação
   da métrica for aceitável — mas documente o motivo na descrição do PR.
5. **Gates consultivos** (`continue-on-error: true`) são informativos — eles não bloqueiam
   o merge, mas aparecem no resumo da CI. Corrija-os mesmo assim.

---

## Adicionando um novo gate

1. Crie `scripts/check/check-<name>.mjs` (ou `.ts`). Gates de política encerram com 0/1.
   Gates do tipo catraca emitem uma métrica para `quality-metrics.json` por meio de `collect-metrics.mjs`.
2. Adicione `"check:<name>": "node scripts/check/check-<name>.mjs"` ao `package.json`.
3. Integre-o em `.github/workflows/ci.yml` no job apropriado
   (política → `lint` ou `docs-sync-strict`; catraca → `quality-gate`).
4. Se ele tiver uma lista de permissões, aplique `reportStaleEntries()` de
   `scripts/check/lib/allowlist.mjs` para que entradas obsoletas sejam detectadas automaticamente.
5. Escreva um teste em `tests/unit/build/` que cubra a lógica de detecção do gate.
6. Atualize este documento (adicione uma linha à tabela do job correspondente).

---

## Ferramentas para agentes: LSP-in-the-loop (opcional)

Além dos gates da CI, o OmniRoute inclui um scaffold **opcional** `agent-lsp`
(um `.mcp.json` no nível do projeto, Fase 7, Tarefa 15). Crie `.mcp.json`
para expor um servidor de linguagem TypeScript aos agentes de programação, permitindo que eles resolvam símbolos /
diagnósticos **antes** de escrever código — um complemento de compilação antes da alegação para
`typecheck:core`, que elimina na origem erros de "símbolo inventado". Intencionalmente,
ele não é carregado de forma automática (você escolhe e verifica a ponte MCP↔LSP); uma entrada inválida apenas registra um
erro de conexão e nunca interrompe as sessões.

---

## Backlog de racionalização (revisão de ROI — Fase 9 Onda 3)

Este inventário foi reconciliado com `ci.yml` em 2026-06-17 (a versão anterior omitia
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Uma revisão de ROI do conjunto reconciliado
identificou os seguintes candidatos à racionalização. **As consolidações são alterações
mecânicas de CI; as mudanças de status/remoções são decisões de política reservadas ao
operador.** Nada abaixo foi aplicado ainda.

**Também não documentados acima** (consultivos, baixo sinal): o job `docs-lint`
(markdownlint + Vale, com `continue-on-error` no job inteiro) e os workflows independentes
de análise `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` está em
`quality-baseline.json`, mas não está conectado a um ratchet bloqueante em `ci.yml` — a
métrica está atualmente órfã.

### Consolidação / deduplicação (mecânica, menor risco)

Cada candidato foi validado em relação ao estado real dos gates em 2026-06-17
(confiar, mas verificar); várias consolidações "óbvias" acabaram ocultando dívida e
**não** são substituições diretas e seguras.

- **`check:docs-sync` é executado duas vezes** — de forma independente no job `lint` e novamente dentro de `check:docs-all` (`docs-sync-strict`) e do hook de pre-commit do husky. ✅ **CONCLUÍDO** — a execução independente em `lint` foi removida.
- **Varredura de CVEs** — ❌ **NÃO é uma consolidação segura.** `audit:deps` falha obrigatoriamente diante de qualquer CVE de severidade alta/crítica; `check:vuln-ratchet` (osv) só falha em uma _regressão_ em relação à baseline (atualmente 1 MODERATE). Semânticas diferentes — remover `audit:deps` eliminaria o gate absoluto para severidades alta/crítica. Manter ambos.
- **Detecção de ciclos** — ✅ **CONCLUÍDO** (#15159 G-01/G-02). O texto anterior chamava `check:cycles` de gate "verde e curado" e justificava mantê-lo bloqueante porque `check:circular-deps` (dpdm) relatava 91 ciclos. Esse resultado verde era um **falso positivo de sucesso**: `check:cycles` analisava 5 subdiretórios (450 arquivos), identificava somente `import|export … from` estáticos e descartava todos os especificadores `@/` e `@omniroute/open-sse/`, portanto não conseguia enxergar os ciclos de importação dinâmica + alias que predominavam no repositório. Corrigido: agora o gate percorre `src` + `open-sse` (5023 arquivos), coleta especificadores da AST do TypeScript (assim, `import("…")` conta e `typeof import("…")` em posição de tipo não conta) e resolve `paths` do tsconfig. Ele encontra **14** ciclos, não 0. Como 14 ciclos preexistentes não podem ser corrigidos em um PR de gate, `check:cycles` agora é um **ratchet** (`--ratchet`, teto `metrics.cycles.value = 14` em `quality-baseline.json`, `direction: down`) — ele bloqueia qualquer _regressão_ e a contagem só pode diminuir. A CI executa `npm run check:cycles:ratchet`. A redução gradual acompanha a **A-01**. `check:circular-deps` (dpdm) permanece consultivo como uma segunda opinião mais abrangente.
- **Complexidade** — ✅ **CONCLUÍDO** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): uma única varredura do ESLint, com contagens por ruleId para que as baselines ciclomática+max-lines e cognitiva permaneçam independentes; `check:complexity` / `check:cognitive-complexity` individuais permanecem para uso local com `--update`.
- **Antialucinação de `/api`** — ✅ **CONCLUÍDO** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): um único inventário do sistema de arquivos de `src/app/api`; openapi-routes + docs-symbols ainda geram relatórios independentes; os comandos individuais permanecem para execuções locais.
- **`check:node-runtime` é executado em 11 jobs** — ⚠️ **baixo ROI.** Cada um usa um runner separado e a verificação leva <1s; economia total de ~10s, em troca da perda de uma proteção barata por job. Não vale o retrabalho.
- **`typecheck:noimplicit:core` no lint da CI** — ✅ **removido do job lint** (era consultivo com `continue-on-error`); a superfície de tipos bloqueante é `typecheck:core` + `check:type-coverage`. O script local foi mantido.

### Alterar status / decidir (política do operador)

- `check:openapi-security-tiers` (consultivo) — ❌ **NÃO pode ser tornado bloqueante de forma segura.** Ele encerra com código 0, mas alerta que várias rotas de `traffic-inspector` sob `LOCAL_ONLY_API_PREFIXES` não possuem a anotação `x-loopback-only: true`. Torná-lo obrigatório exige primeiro adicionar essas anotações a `openapi.yaml`.
- `typecheck:noimplicit:core` (consultivo) — amplamente substituído pelo ratchet bloqueante `check:type-coverage`. Transformar em ratchet ou remover a segunda execução redundante de `tsc`.
- `test:vitest:ui` (agora **bloqueante**) — falhas preexistentes são explicitamente excluídas em `vitest.config.ts` com comentários de rastreamento `// #8618`; novas falhas fazem o job falhar.
- `check:secrets` (gitleaks, ratchet bloqueante congelado em 3 falsos positivos documentados) — adicionar os 3 à lista de permissões para chegar a 0 ou rebaixar para consultivo. Sobrepõe-se à verificação nativa de segredos do GitHub + `check:public-creds`.
- `check:pr-evidence` (bloqueante, usa grep no texto do corpo do PR) — alto risco de falsos positivos; removê-lo enfraquece a aplicação da Hard Rule #18, portanto esta é uma decisão de política legítima.
- `semgrep` (workflow independente consultivo) — sobrepõe-se ao CodeQL para as famílias OWASP; conectar sua baseline a um ratchet ou remover.

---

## Documentação relacionada

- Cadeia de suprimentos (proveniência, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — controle de paridade do conjunto de chaves

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, job `i18n-ui-coverage`).
Compara o conjunto de chaves folha de cada `src/i18n/messages/<locale>.json` com `en.json` e falha
diante de qualquer chave folha ausente ou adicional, independentemente de quando a chave foi adicionada. Os placeholders
`__MISSING__:` contam como presentes (o conteúdo deles é responsabilidade do controle de proporção). Ele é o complemento
absoluto dos dois controles baseados em diff/percentual: `check-ui-keys-coverage` exige um piso de 80 % por
localidade (43 chaves ausentes entre aproximadamente 13.000 ainda resultam em 99,7 %) e `check-new-key-coverage` avalia
somente as chaves que um PR adiciona a `en.json`. Um lote de localidades é gerado a partir do `en.json` do dia
em que seu branch é criado e passa dias sendo traduzido enquanto a base continua adicionando chaves; o PR do lote não adiciona
nenhuma chave por conta própria, portanto ambos os controles relacionados permaneceram silenciosos quando o lote 1 (#13044) entrou com 43 chaves
ausentes em nove localidades e o lote 2 (#13660), com 10 chaves ausentes em oito (2026-09-15). Corrija uma falha com
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; uma chave folha `extra`
significa que a origem a removeu — exclua-a da localidade. `--warn` relata sem causar falha.
`--catalog=cli` executa a mesma comparação em `bin/cli/locales` (`npm run i18n:check-keys:cli`);
ambas as etapas ficam no job `i18n-ui-coverage`.

#### `check-new-key-coverage` — controle de i18n para novas chaves

Controle relacionado a `check-ui-value-drift`. Este último detecta um valor em inglês que foi **reescrito**
enquanto suas traduções ficaram desatualizadas; este detecta uma chave em inglês que foi **adicionada**
sem que algumas localidades a tenham recebido.

`check-ui-keys-coverage` não consegue detectar essa classe: ele exige um piso percentual por localidade, e
onze chaves ausentes entre aproximadamente 13.000 mantêm a cobertura em 99,9%. Um percentual por idioma não consegue
expressar "este recurso foi lançado sem tradução" — um recurso inteiro pode entrar em uma nova localidade sem
texto algum e nunca alterar o número.

O incidente que ele codifica: a Fase 3 do Canvas de Orquestração traduziu suas onze chaves para
as 42 localidades que existiam na época. Horas depois, o lote de idiomas da UE (#13044) elevou o repositório
a 51 localidades, e as nove recém-chegadas (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) nunca
as receberam. `deepMergeFallback` substitui uma chave ausente pelo inglês, portanto o modo de falha foi
uma interface sem tradução, e não uma interface em branco — real e, por construção, silencioso.

Assim como o controle relacionado, ele é **ciente de diff**, comparando o inglês na base de merge com a árvore
de trabalho, de modo que lacunas preexistentes permanecem congeladas e o controle não precisou de migração para ser ativado.

**Um marcador `__MISSING__:<english>` não o satisfaz (desde 2026-09-17).** Ele costumava ser o
adiamento documentado — o runtime recorre ao inglês correto — até que oito PRs de recursos em
2026-09-16 adicionaram 61 chaves e inseriram o marcador em todas as 65 localidades em vez de traduzi-las: este
controle aceitou todas elas, nada bloqueou os PRs, e o controle bloqueante de proporção de traduções reais
então falhou na ponta da release para todos (pt-BR 3,2 % > 2,5 % + 0,5). Agora, um marcador é considerado
uma tradução ausente. Corrija uma falha com
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, ou
todas as localidades em paralelo com `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
seguro para execução desacoplada, recusa-se a iniciar sem as variáveis de ambiente `OMNIROUTE_TRANSLATION_*`). Uma chave que deve permanecer
em inglês (nome fixo de produto/mecanismo/flag) deve ficar em `scripts/i18n/untranslatable-keys.json`,
nunca atrás de um marcador. `vi` proíbe completamente os marcadores (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — controle de testes estacionados

Um arquivo na lista `exclude` de `vitest.config.ts` é um teste que não é executado e parece
cobertura para quem lê a árvore. Sessenta e dois arquivos se acumularam atrás do comentário
`// #8618 — pre-existing failure; remove this exclusion when fixed`. A issue #8618 foi encerrada em
2026-08-11 enquanto a lista que ela acompanhava cresceu de 45 para 62 entradas, cada nova entrada herdando um comentário
que apontava para uma issue encerrada. Quando a lista finalmente foi medida arquivo por arquivo (#13204), **51 dos 62
passaram na árvore atual sem nenhuma alteração no código-fonte**.

O controle exige que toda exclusão que corresponda a um arquivo real (a) indique uma issue de acompanhamento e
(b) apareça em `config/quality/vitest-exclusions.json` com seu status medido, para que a adição de uma exclusão seja um
diff revisável em um arquivo dedicado, em vez de apenas mais uma linha em um array de 60 entradas. Deliberadamente,
ele não executa novamente os testes excluídos — isso leva aproximadamente 10 minutos e cabe a um job periódico; o
inventário registra quando cada um foi medido pela última vez.
