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

## Inventário de portão e perfis de execução

### Admissão de candidato

Os fluxos de trabalho CI e Quality Gates emitem, cada um, um veredicto estável: `Gate / CI` e `Gate / Quality`. Sua política de admissão versionada enumera todos os trabalhos upstream conforme necessário ou consultivo. Um trabalho obrigatório aplicável deve ser bem-sucedido: resultados ausentes, cancelados, ignorados, pendentes e desconhecidos não podem ser estabelecidos PASS. Uma classificação válida somente para documentos ou somente para catálogo pode tornar uma linha de código inaplicável; um rascunho PR não é um candidato aceito. Um rótulo `hotfix` não dispensa evidências.

Ambos os fluxos de trabalho abrangem PRs em ramificações main/release, envios para `main`, envio manual e eventos de grupo de mesclagem. Push, dispatch e merge-group executam a seleção completa. Pushes para `release/**` não os iniciam (2026-10-18): cada alteração já executou a matriz em seu PR e a combinação mesclada é o trabalho de Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane). Bifurcações e grupos de mesclagem usam executores hospedados para trabalhos que, de outra forma, selecionam executores auto-hospedados; capacidade hospedada suficiente deve ser verificada antes da implementação.

Um PR comum executa a seleção rápida. As pistas `full-code` e `full-code-e2e` da política de admissão (E2E, integração, artefato de pacote, Electron smoke, Bun SQLite, ecossistema e clientes de protocolo) são executadas apenas em um rascunho de fila Mergify ou em uma execução completa: `gh workflow run ci.yml --ref <branch>`.

Cada recibo JSON identifica o SHA verificado, a execução do fluxo de trabalho e a tentativa. O CLI rejeita uma incompatibilidade checkout/event SHA. Os testes de fluxo de trabalho vinculam a associação à política à lista `needs` do trabalho de veredicto para que uma pista nova ou removida não possa desaparecer silenciosamente. Os recibos cobrem seu próprio fluxo de trabalho, não publicação, implantação ou aspectos internos de um scanner de consultoria existente. A ativação de ambos os nomes de cheques nas regras da filial é uma alteração administrativa separada; adicionar esses empregos não protege uma filial.

### Mesclar fila

O rótulo `queue` envia um PR para a fila Mergify (`.mergify.yml`). Mergify abre um rascunho PR em uma ramificação `mergify/merge-queue/`, CI executa a seleção completa lá e o PR original se funde quando `Gate / CI`, `Gate / Quality` e `Merge integrity (changelog + generated skills)` passam.

O Mergify escreve o resumo da fila na descrição do rascunho e outros aplicativos também podem editá-lo. Um evento `pull_request` `edited` em tal rascunho leva seu próprio grupo de simultaneidade (`-queue-edit-<run_id>`), portanto, não pode cancelar a execução real do rascunho e pula o portão e a matriz. Apenas `Merge integrity` ainda funciona. O trabalho de portão ignorado carrega um nome de verificação diferente, porque o Mergify lê um `Gate / CI` ignorado como uma verificação com falha e retira o PR.

Após um desenfileiramento, um push nem sempre recoloca o PR. Comente `@mergifyio queue` sobre isso.

### Evidências retidas no redutor de aceitação

`scripts/quality/validate-release-acceptance.mjs` reduz um plano fornecido e seus manifestos; não estabelece que o plano cubra todo o pipeline de lançamento. Seus relatórios definem explicitamente `releaseAcceptance: false`, mesmo quando esse plano é `VERIFIED`. O fluxo de trabalho `release-acceptance.yml` ainda usa acessórios de sombra, e não recibos reais de construção, pacote, inicialização ou promoção.

O CLI exige que `--evidence-root` verifique as evidências retidas. Os arquivos são resolvidos como `<evidence-root>/<artifact_id>/<member>` e com hash como SHA-256. Um registro PASS sem evidência, um arquivo ausente ou alterado, um caminho inseguro ou um link simbólico impedem a verificação. Arquivos ausentes não são equivalentes a logs vazios bem-sucedidos. As verificações SHA/run/attempt existentes permanecem independentes: os bytes correspondentes não podem resgatar um recibo obsoleto. A integridade do arquivo não é prova de autenticidade de execução ou promoção de artefato.

### Inventário de verificação estática

O inventário npm-alias versionado e a associação de varredura estática residem em `config/quality/gate-manifest.json`. Execute `npm run check:gate-manifest` para validar nomes de scripts e comandos exatos em `package.json`; adições, remoções e desvios de comando falham tanto no gancho local quanto nos trabalhos de classificação de mudança em CI. Um alias não é um trabalho de fluxo de trabalho, uma instância de matriz ou um caso de teste: essas contagens não devem ser apresentadas como intercambiáveis.

Use `npm run quality:scan -- --list` ou `npm run quality:scan:fast -- --list` para inspecionar os aliases selecionados sem executá-los. O executor invoca o ponto de entrada npm, portanto seu tempo de execução (incluindo Bun onde configurado) é preservado. O manifesto registra aliases fora desses perfis, conforme invocados separadamente, e os comandos de manutenção são proibidos em perfis de varredura somente leitura.

Esses perfis abrangem apenas a verificação estática. Eles não certificam testes de produtos, cobertura, embalagem, verificações externas ou aceitação total da liberação de um candidato. A admissão do fluxo de trabalho usa `config/quality/admission-policy.json` e `scripts/quality/admission-verdict.mjs` vinculados. Os perfis dos observadores de lançamento permanecem separados; inspecionar seus cheques e recibos aplicáveis de forma independente. Os comandos estáticos completos do observador são declarados em `config/quality/release-green-static-profile.json`, incluindo `audit:deps`, seleção de teste de mutação e verificações de tradução. O carregador valida comandos npm em relação às declarações package.json e CI/Quality modeladas; ele rejeita o desvio em vez de executar tokens de shell como argumentos. A saída SKIP/INCOMPLETE do scanner necessária não pode estabelecer PASS. O perfil registra suas exclusões externas e não substitui cobertura hospedada, matrizes de teste, pacote ou evidência de implantação. O inventário em prosa abaixo é uma referência, não uma prova de que um portão realmente funcionou.

Os scripts residem em `scripts/check/` (portões de política) e `scripts/quality/` (mecanismo de catraca). A fonte da verdade CI é `.github/workflows/ci.yml`.

### Liberar caminho rápido PR (`quality.yml`)

`.github/workflows/quality.yml` complementa CI em main/release PRs, envia para `main`, despacha e mescla grupos. PRs usa verificações rápidas filtradas por caminho. A compilação duplicada permanentemente desativada foi removida; as verificações reais build/package/boot permanecem em CI. O conjunto de unidades e o vitest são executados apenas em CI (`Unit Tests (N/8)` e `Vitest`).

| Trabalho                                         | Escopo                                                                                                                                                             | Bloqueio              |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs e docs-all                                                                                                                            | Sim                   |
| `Fast Quality Gates`                             | Código PRs; verificações estáticas, verificação de tipo, verificação de tipo de painel, testes de unidade impactados, testes de irmãos esquecidos (aconselhamento) |
| `No new ESLint warnings`                         | Código PRs; protetor de fiapos com reconhecimento de supressão                                                                                                     | Sim, incluindo garfos |
| `Merge integrity (changelog + generated skills)` | PRs sem rascunho; changelog e sincronização de habilidades geradas                                                                                                 | Sim, incluindo garfos |

#### Relatório de testes de irmãos esquecidos

`npm run check:forgotten-sibling-tests` é executado como uma etapa consultiva do `Fast Quality Gates` e reutiliza o resolvedor de importação por trás do mapa de impacto de teste. Para cada módulo de produção alterado, ele relata cadeias `changed module/symbol -> static consumer -> candidate sibling test` determinísticas quando o teste candidato está ausente da comparação de solicitação pull. O resumo do Markdown e o resultado JSON são mantidos como o artefato do fluxo de trabalho `forgotten-sibling-tests` para calibração antes de qualquer implementação de bloqueio.

As reexportações de barril e as importações dinâmicas são apenas diagnósticos de resolução; eles nunca criam uma descoberta bloqueadora. As exceções revisadas residem em `config/quality/forgotten-sibling-allowlist.json`. Cada entrada deve nomear o teste do consumidor e do candidato, fornecer uma justificativa específica e vincular um problema GitHub ou solicitação pull. Entradas malformadas falham no fechamento. As exceções não podem suprimir um teste candidato excluído ou uma comparação que adiciona `.skip`/`.todo`; o enfraquecimento de asserções e outros mascaramentos permanecem pertencentes ao portão `check:test-masking` de bloqueio independente.

### Trabalho: `lint`

É executado em todos PR até `main`. Os blocos se fundem em caso de falha.

| Roteiro (`npm run ...`)           | Valida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Bloqueio                                   |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | A versão Node.js está dentro do intervalo suportado                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sim                                        |
| `check:cycles`                    | Importações circulares em todos os `src/` + `open-sse/` (baseado em AST, tsconfig `paths` resolvido). Bare sai 1 sempre que existe qualquer ciclo (fechado com falha desde #15281) e lista o SCCs. `check:cycles:ratchet` (o que CI executa) bloqueia quando a contagem excede o teto `metrics.cycles` em `quality-baseline.json` — atualmente 14, `direction: down`, então só pode cair (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Sim (catraca)                              |
| `check:boundary`                  | Acoplamento `open-sse → src` : importações exclusivas de arquivo para arquivo do mecanismo para o aplicativo (`scripts/quality/measure-boundary.mjs`; a lista de bordas é o backlog de remediação v4 core/module-split ). Relatório consultivo = simples (igual a `quality:boundary`). `check:boundary:ratchet` (o que CI executa, também no loop de catraca `quality.yml` fast-gates) bloqueia quando a contagem excede o teto `metrics.boundaryOpenSseToSrc` em `quality-baseline.json` — semeado no 771 medido, `direction: down`; `--update` apenas diminui; relativo à base em PRs (`--base-ref`, veja abaixo)                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sim (catraca)                              |
| `check:route-validation:t06`      | Esquemas Zod presentes em todas as rotas (política de nível 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sim                                        |
| `check:any-budget:t11`            | a contagem `@ts-expect-error // any` não excede o orçamento (Catraca Nível 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sim                                        |
| `check:provider-consistency`      | Cada provedor no `providers.ts` tem uma entrada correspondente no `providerRegistry.ts` (e vice-versa, dentro da lista de permissões)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sim                                        |
| `check:model-lifecycle`           | As três tabelas de roteamento mantidas manualmente permanecem consistentes com o instantâneo do ciclo de vida verificado (#11503): `FITNESS_TABLE` (`taskFitness.ts`) não pontua nenhum ID retirado que `REGISTRY` possa rotear; todo alvo `BUILT_IN_ALIASES` está presente em `REGISTRY` e ausente do instantâneo de ID retirado; todo id retirado ainda em `REGISTRY` é encaminhado ou listado em `allowedRetiredInCatalog`; e nenhuma origem ou destino `DEFAULT_DEGRADATION_MAP` aparece desativado nesse instantâneo. Isso não prova que um modelo seja atualmente servido por um upstream ativo. — off-line é comparado com `config/quality/model-lifecycle.json`, atualizado manualmente com `npm run quality:refresh-model-lifecycle` (rede; não conectado a CI). `allowedRetiredInCatalog` é uma catraca de queima: adicione uma entrada apenas com um problema de rastreamento.                                                                                                                                                                             | Sim                                        |
| `check:fetch-targets`             | Cada `fetch("/api/...")` no `src/` do lado do cliente é resolvido para um `route.ts` real                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sim                                        |
| `check:deps`                      | Todas as dependências `npm install` -able em cada `package.json` no repositório estão em `dependency-allowlist.json`; novos pacotes não fixados ou desocupados sinalizados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Sim                                        |
| `audit:deps`                      | auditoria npm de todos os cinco arquivos de bloqueio independentes (plugins root, Electron, OpenCode v1/v2 e provedor). Bloco de avisos críticos; altos avisos permanecem avisos visíveis. auditorias Missing/failed são INCOMPLETE e block; hashes e relatórios de bloqueio por escopo são retidos.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Sim                                        |
| `check:lockfile`                  | `package-lock.json` integridade registro — https, hashes de integridade, sem substituições de host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sim                                        |
| `check:licenses`                  | Lista de permissões de licença SPDX para dependências de produção                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sim                                        |
| `check:tracked-artifacts`         | Nenhum artefato de construção/links simbólicos `node_modules` confirmados (também é executado em pré-confirmação husky; pré-push é intencionalmente leve — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sim                                        |
| `check:ai-attribution`            | Nenhum trailer AI/bot `Co-Authored-By` ou rodapé de geração de IA em commits PR, título ou corpo — Hard Rule #16 (no loop `quality.yml` fast-gates para PR→ `release/**` — lê a carga útil do evento, no-op off PRs — e uma etapa somente PR em `ci.yml` lint para PR→ `main`; também o gancho husky `commit-msg` ; coautores humanos permitidos; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:vitest-exclusions`         | Cada exclusão Vitest nomeia um problema de rastreamento e aparece em `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sim                                        |
| `check:file-size`                 | Os arquivos de origem (`.ts`/`.tsx` em `src/`, `open-sse/`, `electron/`, `bin/`) ficam dentro do `cap` e os arquivos de teste (`*.test.ts(x)`) dentro do `testCap`; arquivos congelados em `file-size-baseline.json` (`frozen` / `testFrozen`) não devem ultrapassar o tamanho registrado                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sim                                        |
| `check:error-helper`              | Respostas de erro em executors/handlers usam `buildErrorBody()` / `sanitizeErrorMessage()` (regra rígida #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Sim                                        |
| `check:migration-numbering`       | Os arquivos SQL de migração são numerados sequencialmente, sem lacunas ou duplicatas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Sim                                        |
| `check:public-creds`              | Nenhuma chave literal OAuth `client_id`/`client_secret` ou Firebase Web fora `publicCreds.ts` (regra rígida #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sim                                        |
| `check:db-rules`                  | Nenhum SQL bruto fora dos módulos `src/lib/db/` ; sem importações de barril do `localDb.ts` (regras rígidas #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sim                                        |
| `check:known-symbols`             | Executores de provedores, estratégias de roteamento e tradutores registrados em suas tabelas de despacho correspondem aos arquivos no disco — sem símbolos órfãos ou não declarados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sim                                        |
| `check:route-guard-membership`    | Cada rota que gera um processo filho é classificada por `isLocalOnlyPath()` (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sim                                        |
| `check:test-discovery`            | Cada arquivo `*.test.ts` / `*.spec.ts` no repositório é coletado por pelo menos um executor de teste (catraca: a lista órfã no `test-discovery-baseline.json` só pode diminuir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Sim                                        |
| `check:test-tla-order`            | Nenhum arquivo `node:test` em `tests/unit` registra um teste, atinge um `await` de nível superior e registra mais (#18045; catraca: `test-tla-order-allowlist.json` só pode encolher)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sim                                        |
| `check:agent-skills-sync`         | Os artefatos de habilidades do agente gerados correspondem ao seu catálogo de origem (sem desvios)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | O provedor logos/assets carrega uma entrada de procedência registrada                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `lint:json`                       | Os arquivos de configuração JSON analisam e satisfazem as regras do repo lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `typecheck:core`                  | compilação TypeScript sem erros (apenas avisos consultivos)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Sim                                        |
| `typecheck:noimplicit:core`       | Estrito `noImplicitAny` — voltado para o futuro; muitos call sites pré-existentes ainda precisam de anotações                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **Consultivo** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` com escopo definido para `src/app/(dashboard)/**` (#7033) — `typecheck:core` a lista de permissões de 27 arquivos com curadoria não inclui nenhum painel TSX, e `next build` também nunca verifica o tipo (`next.config.mjs` define `ignoreBuildErrors: true`), portanto, as regressões de identificadores órfãos (#6625/#6909) eram invisíveis para CI. Comparações com uma linha de base de contagem per-file/per-TS-code congelada (`config/quality/dashboard-typecheck-baseline.json`, mesmo padrão de aplicação obsoleta de `check:known-symbols`) — apenas NEW erros além da contagem de linha de base falham no portão; reduza o `--update` quando um erro pré-existente for corrigido.                                                                                                                                                                                                                                                                                                                                                                  | Sim                                        |
| `check:build-typecheck`           | A verificação do tipo de produção de todo o aplicativo sobre `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), a lista de permissões de 27 arquivos da superfície `typecheck:core` e o portão do painel não cobrem. Diferenças contra `config/quality/build-typecheck-baseline.json`; uma contagem nova ou aumentada por (arquivo, código) falha, uma contagem mais baixa solicita que você aumente. `--update` recusa enquanto a execução contém um par novo ou elevado, a menos que `--force-regressions` seja aprovado, e recusa um arquivo recentemente silenciado, a menos que `--force-nocheck` seja aprovado, portanto, ampliar a linha de base para ficar verde e conceder um silêncio permanente são dois atos deliberados separados. Um `--force` simples é rejeitado. Também verifica o escopo de construção de `@ts-nocheck` em relação a `config/quality/ts-nocheck-baseline.json`, porque um arquivo que o utiliza não relata nenhum diagnóstico e, de outra forma, seria invisível para todos os portões. | Sim                                        |

#### Dois programas de verificação de tipo respondem de maneira diferente

`typecheck:core` e `check:build-typecheck` compilam programas diferentes sob opções diferentes, e o mesmo arquivo pode estar limpo em um e cheio de erros no outro.

`tsconfig.build.json` define `"strict": false`, então `noImplicitAny` está desativado. A configuração principal compila uma lista de permissões de 27 arquivos com opções mais restritas e segue o gráfico de importação de cada entrada, para que os arquivos que nunca aparecem no programa de compilação ainda sejam verificados lá.

A consequência é importante ao julgar se um arquivo é digitado:** zero diagnóstico sob `check:build-typecheck` não significa zero** . A remoção `@ts-nocheck` de 26 arquivos mostrou 23 deles limpos no programa de compilação; dezesseis deles revelaram cerca de 120 erros implícitos no estrito. Verifique ambos antes de chamar um arquivo limpo.

### Trabalho: `quality-gate`

Corre depois de `test-coverage`. Os blocos se fundem em caso de falha.

| Roteiro                      | Valida                                                                                                                                                                        | Bloqueio                    |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `quality:collect`            | Emite `quality-metrics.json` (contagem de avisos ESLint, cobertura do relatório de fragmentos mesclados)                                                                      | Sim (a montante da catraca) |
| `quality:ratchet`            | Cada métrica em `quality-baseline.json` não regrediu ( avisos ESLint linha de base ≤ ; linha de base ≥ de cobertura)                                                          | Sim                         |
| `check:duplication`          | A duplicação de código (jscpd@4) não excede a linha de base no `quality-baseline.json`                                                                                        | Sim                         |
| `check:complexity`           | A complexidade ciclomática em nível de arquivo não excede o limite (núcleo ESLint `complexity` + `max-lines-per-function`)                                                    | Sim                         |
| `check:cognitive-complexity` | Catraca de complexidade cognitiva (`eslint-plugin-sonarjs`) — passagem ESLint separada; CI executa ambos mesclados como a única etapa `check:complexity-ratchets`             | Sim                         |
| `check:dead-code`            | Catraca de exportações/arquivos não utilizados (knip) não regride em relação à linha de base                                                                                  | Sim                         |
| `check:compression-budget`   | O orçamento de referência de compactação — por mecanismo de economia de token não deve regredir                                                                               | Sim                         |
| `check:type-coverage`        | A catraca digitada por porcentagem (`type-coverage`) não regride; em grande parte inclui `typecheck:noimplicit:core`                                                          | Sim                         |
| `check:codeql-ratchet`       | A contagem de alertas CodeQL abertos não regride (lê via `gh api`; salto gracioso sem token) cadência de atualização — e acionamento manual: consulte "CodeQL catraca" abaixo | Sim                         |

### Trabalho: `quality-extended`

Todo o trabalho é consultivo (`continue-on-error: true`). As catracas baseadas em npm funcionam de verdade; os scanners externos são instalados via `gh release download` e ignoram automaticamente (saída 0) quando um binário ainda está ausente.

| Roteiro                  | Valida                                                                                                                                                                                                                                  | Bloqueio                                              |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `check:circular-deps`    | Sem dependências circulares (dpdm)                                                                                                                                                                                                      | **Consultivo**                                        |
| `check:bundle-size`      | O tamanho do pacote não excede o limite                                                                                                                                                                                                 | **Consultivo**                                        |
| `check:secrets`          | Varredura secreta (gitleaks) — ignora se o binário estiver ausente                                                                                                                                                                      | **Consultivo**                                        |
| `check:vuln-ratchet`     | Vulnerabilidades de dependência (osv-scanner) não regridem — `--ratchet` falha como INCOMPLETE (saída 2) se não for medida                                                                                                              | **Consultivo**                                        |
| `check:workflows`        | Lint de fluxo de trabalho (actionlint + zizmor); scanners missing/broken, relatórios inválidos ou linha de base da catraca ausente falham como INCOMPLETE. As descobertas válidas seguem a política strict/advisory/ratchet selecionada | Execução necessária; bloqueio de catraca zizmor em CI |
| `check:openapi-breaking` | Contrato API público contra commits de eventos fixados (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); medição necessária falha fechada                                                         | **Bloqueando com --ratchet**                          |

### Trabalho: `docs-sync-strict`

É executado em todos PR até `main`. Os blocos se fundem em caso de falha.

| Roteiro                        | Valida                                                                                                                                                                              | Bloqueio                   |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | Meta-gate que executa os 6 sub-gates abaixo sequencialmente                                                                                                                         | Sim                        |
| ↳ `check:docs-sync`            | Consistência da versão CHANGELOG / OpenAPI / llm.txt                                                                                                                                | Sim                        |
| ↳ `check:docs-counts`          | As contagens em prosa (contagem de provedores, contagem de migrações, etc.) estão dentro da janela de catraca das contagens reais                                                   | Sim                        |
| ↳ `check:env-doc-sync`         | Cada env var em `.env.example` é documentado em uma tabela de documentos e vice-versa                                                                                               | Sim                        |
| ↳ `check:deprecated-versions`  | Nenhuma string de versão obsoleta nos documentos                                                                                                                                    | Sim                        |
| ↳ `check:doc-links`            | Links de remarcação interna em documentos são resolvidos para arquivos reais (formato `[text]`/`(path)` )                                                                           | Sim                        |
| ↳ `check:fabricated-docs`      | Rotas, env vars, comandos CLI, nomes de ganchos e caminhos de arquivos citados nos documentos existem na base de código. Portão rígido via `--strict`; falha suave sem sinalizador. | Sim (via `--strict` em CI) |
| `check:cli-i18n`               | As strings de comando CLI estão presentes em todos os arquivos de localidade i18n                                                                                                   | Sim                        |
| `check:openapi-coverage`       | A especificação OpenAPI cobre pelo menos um piso reduzido de rotas reais                                                                                                            | Sim                        |
| `check:openapi-security-tiers` | As anotações da camada de segurança no `openapi.yaml` são consistentes com as classificações `routeGuard.ts`                                                                        | **Consultivo**             |
| `check:openapi-routes`         | Cada caminho em `openapi.yaml` resulta em um `route.ts` real (anti-alucinação)                                                                                                      | Sim                        |
| `check:docs-symbols`           | Cada referência `/api/...` em `docs/**/*.md` resulta em um `route.ts` (anti-alucinação) real                                                                                        | Sim                        |
| `i18n translation drift`       | Chaves não traduzidas em arquivos de localidade i18n — apenas avisam                                                                                                                | **Consultivo**             |

Os doze README SVGs sob `docs/diagrams/` são gerados (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` regenera todos eles). Cada um tem um teste de unidade de comparação de bytes (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) que falha quando o arquivo confirmado está obsoleto e `check:docs-counts` lê números canônicos de seus nós `<text>` — e é por isso que a etapa de estrutura de tópicos mantém cada string delineada no arquivo como invisível `<text>`. A verificação de números canônicos SVG lê os arquivos listados em `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, mais `public/images/tier-flow-dark.svg` e `tier-flow-light.svg`; as reivindicações free-forever, entrada de catálogo, pool recorrente e fatores de pontuação também são `promise-pillars.svg`, `free-tier-budget.svg` e `strategies-grid.svg`. `free-tier-budget.svg` extrai seus números do carregador de catálogo ativo, portanto, uma alteração no `FREE_MODEL_BUDGETS` ou no nome de exibição de um provedor é vermelha CI até que o arquivo seja regenerado.

### Trabalho: `i18n-ui-coverage`

| Roteiro                           | Valida                                                                                                                                                                                                 | Bloqueio       |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `check-ui-keys-coverage` (inline) | A cobertura da chave UI i18n é ≥ 65%                                                                                                                                                                   | Sim            |
| `check-ui-value-drift` (inline)   | Um inglês reescrito** valor** não deixa nenhuma tradução obsoleta para trás                                                                                                                            | Sim            |
| `check-new-key-coverage` (inline) | UM** novo** A chave inglesa é traduzida em cada localidade — um marcador `__MISSING__:` é rejeitado                                                                                                    | Sim            |
| `check-translation-ratio`         | A proporção de tradução real por localidade (idêntico ao inglês/espaço reservado/folhas ausentes fora da lista de permissões) não deve exceder `config/quality/i18n-translation-baseline.json` + slack | **Consultivo** |

Precisa `fetch-depth: 0` — a porta de desvio de valor compara `en.json` com a base de mesclagem.

#### `check-ui-value-drift` — portão de tradução obsoleto

Captura aquela regressão que as outras portas estruturalmente não podem ver: um valor em inglês é reescrito e as traduções derivadas do inglês _anterior_ ficam para trás, para que usuários que não falam inglês continuem lendo cópias com palavras confiáveis, agora erradas.

Isso foi enviado de verdade. `oauthModal.googleOAuthWarning` foi reescrito quando o auxiliar de login Antigravity chegou (#5203);** 39 de 43 localidades** manteve o texto informando aos operadores para "copiar o URL completo e colá-lo abaixo" — um fluxo que não pode ser concluído para esse provedor. Passou despercebido até #8463 porque:

- `sync-ui-keys` preenche apenas chaves que são** ausente** , nunca aqueles que são** obsoleto** ;
- `check-ui-keys-coverage` conta a _presença_ da chave, portanto, uma tradução obsoleta é considerada coberta;
- `check-translation-drift` rastreia a documentação `docs/i18n/<locale>/**.md` espelha — nunca lê `src/i18n/messages/*.json`. Bloqueio no trabalho `docs-sync-strict` desde a ressincronização de 2026-09: edite um documento principal → `npm run i18n:run -- --files=<doc>` (nível de seção, barato).

**Com reconhecimento de diferença, não com base na linha de base.** Ele compara `en.json` na base de mesclagem com a árvore de trabalho; para cada chave cujo valor em inglês foi alterado, qualquer localidade que ainda contenha uma tradução intacta será obsoleta. Isto deliberadamente** congela dívidas pré-existentes** — a diff não pode revelar de qual inglês antigo veio uma tradução de longa data, então o portão julga apenas o que a mudança atual toca. A alternativa (uma linha de base de hash por chave) custaria um arquivo gerado ~ 600 KB, 3 × a maior linha de base existente, agitando a cada i18n PR.

Duas maneiras de satisfazê-lo:

1. atualizar as traduções afetadas ou
2. configure-os para `__MISSING__:<new english>` — o tempo de execução e então exibe o inglês corrigido (`src/i18n/request.ts::deepMergeFallback`, #7258) e as filas de chaves para tradução.

Se a string for** significado** mudou, prefiro** renomeando a chave** : uma nova chave não pode herdar uma tradução obsoleta. Esse é o padrão usado #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Sai de 0 com `SKIP reason=base-unresolved` quando o catálogo base não pode ser lido (clone superficial sem a referência base), espelhando `check-openapi-breaking`.

### Trabalho: `i18n`

Matriz de validação i18n completa (um trabalho por localidade). Todo o trabalho é consultivo.

| Roteiro                         | Valida                                | Bloqueio                                                      |
| ------------------------------- | ------------------------------------- | ------------------------------------------------------------- |
| `validate_translation.py quick` | Completude da tradução por localidade | **Consultivo** (`continue-on-error: true` em todo o trabalho) |

### Trabalho: `pr-test-policy`

É executado apenas em solicitações pull.

| Roteiro                | Valida                                                                                                                               | Bloqueio |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `check:pr-test-policy` | PRs que altera o código de produção em `src/`, `open-sse/`, `electron/` ou `bin/` deve incluir ou atualizar testes (regra rígida #8) | Sim      |
| `check:test-masking`   | Os arquivos de teste alterados não reduzem a contagem de declarações líquidas nem adicionam tautologias `assert.ok(true)`            | Sim      |
| `check:pr-evidence`    | PR body cita evidências test/VPS para a mudança (mecaniza Hard Rule #18 grep PR prose — frágil, veja Backlog)                        | Sim      |

### Trabalho: `test-vitest`

Corre depois de `build`. Os blocos se fundem em caso de falha.

| Suíte            | Valida                                                           | Bloqueio                                                                                                                 |
| ---------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | servidor MCP (110 ferramentas), autoCombo, cache — vitest runner | Sim                                                                                                                      |
| `test:vitest:ui` | Componente UI testa — vitest runner                              | **Bloqueio** falhas pré-existentes — são explicitamente excluídas em `vitest.config.ts`; novas falhas falham no trabalho |

### Fluxos de trabalho noturnos (agendados, consultivos)

Eles são executados em uma programação cron (e `workflow_dispatch`), nunca em PRs. Todos são consultivos.

| Fluxo de trabalho      | Valida                                                                                                                                                                       | Bloqueio       |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | testes de propriedade de verificação rápida com uma contagem aleatória de sementes + alta                                                                                    | **Consultivo** |
| `nightly-resilience`   | porta de crescimento de heap, injeção de falha de caos, k6 load/soak                                                                                                         | **Consultivo** |
| `nightly-llm-security` | proteção de injeção promptfoo (modo de bloqueio) + garak probes (ignorado sem segredo do provedor)                                                                           | **Consultivo** |
| `nightly-schemathesis` | Fuzzing de contrato OpenAPI (esquematese) contra um OmniRoute ativo usando violações de especificações de superfícies `docs/openapi.yaml` — / 500s não tratados (Fase 8 B.4) | **Consultivo** |
| `nightly-mutation`     | A pontuação do teste de mutação Stryker na via rápida da unidade — mutantes sobreviventes superam afirmações fracas                                                          | **Consultivo** |
| `nightly-compat`       | Matriz de compatibilidade do mecanismo de nó entre os intervalos `engines.node` suportados                                                                                   | **Consultivo** |

As linhas de base de desempenho (heap, TTFB, tempo de construção) são registradas, não bloqueadas: consulte [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

Cada porta que não pode falhar em violações pré-existentes usa uma lista de permissões congelada (por exemplo, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). A política é:

**Corrija a causa raiz; use a lista de permissões somente quando a violação for pré-existente e não puder ser corrigida no mesmo PR.**

Ao adicionar uma entrada a uma lista de permissões:

1. Inclua um comentário com a justificativa.
2. Faça referência ao problema de rastreamento (por exemplo, `// #3498 — Phase 2 feature, not yet implemented`).
3. Remover a entrada no mesmo PR que corrige a violação — uma entrada obsoleta que não suprime mais uma violação ativa é em si um defeito (6A.3 a aplicação obsoleta falhará no portão em uma entrada órfã da lista de permissões, uma vez implementada).

Fazer** não** adicione entradas à lista de permissões para fazer os testes passarem mais rápido. Um portão verde com uma lista de permissões crescente é uma falsa sensação de qualidade.

### Quando um portão falha no seu PR

1. **Leia a saída do portão com atenção** — informa exatamente qual arquivo ou símbolo violou a regra.
2. **Corrigir a violação** — a maioria das portas são verificações determinísticas do sistema de arquivos que passam assim que o código está correto.
3. **Se a violação for pré-existente** (ou seja, você não o introduziu, mas o portão agora o cobre): adicione uma entrada na lista de permissões com um comentário de justificativa e um problema de rastreamento.
4. **Se o portão for uma catraca** (cobertura, avisos ESLint, duplicação, complexidade): sua alteração piorou a métrica. Corrija o problema subjacente ou (raramente) execute `npm run quality:ratchet -- --update` se a alteração for intencional e a degradação da métrica for aceitável —, mas documente o motivo na descrição PR.
5. **Portões consultivos** (`continue-on-error: true`) são — informativos, eles não bloqueiam a mesclagem, mas aparecem no resumo CI. Corrija-os de qualquer maneira.

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

## Backlog de racionalização (revisão ROI — Fase 9 Onda 3)

Este inventário foi reconciliado com `ci.yml` em 17/06/2026 (a versão anterior omitiu `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence`). Uma revisão ROI do conjunto reconciliado identificou os seguintes candidatos à racionalização.** As mesclagens são alterações mecânicas CI ; os flips/drops são decisões políticas reservadas ao operador.** Nada abaixo foi aplicado ainda.

**Também não documentado acima** (aconselhamento, sinal baixo): o trabalho `docs-lint` (markdownlint + Vale, trabalho inteiro `continue-on-error`) e os fluxos de trabalho de scanner autônomo `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` está em `quality-baseline.json`, mas não está conectado a uma catraca de bloqueio em `ci.yml` — a métrica está atualmente órfã.

### Mesclar/desduplicar (mecânico, menor risco)

Cada candidato foi validado em relação ao estado do portão ativo em 17/06/2026 (confiar, mas verificar); várias fusões "óbvias" acabaram por esconder dívidas e são** não** entradas limpas.

- **`check:docs-sync` é executado duas vezes** — autônomo no trabalho `lint` e novamente dentro de `check:docs-all` (`docs-sync-strict`) e no gancho de pré-confirmação husky. ✅**DONE** A invocação `lint` autônoma — foi removida.
- **digitalização CVE** — ❌**NOT uma mesclagem limpa.** `audit:deps` bloqueia avisos críticos e auditorias incompletas em todos os cinco arquivos de bloqueio, ao mesmo tempo que relata avisos altos como avisos sob a política atual; `check:vuln-ratchet` (osv) falha apenas em uma _regressão_ versus a linha de base verificada e rejeita medições ausentes quando necessário. Diferentes semânticas — descartando `audit:deps` perderiam a porta crítica absoluta e os recibos de auditoria de pacote independente. Mantenha ambos.
- **Detecção de ciclo** — ✅**DONE** (#15159 G-01/G-02). O texto antigo aqui chamava `check:cycles` de “o portão verde e com curadoria” e justificava mantê-lo bloqueado porque `check:circular-deps` (dpdm) relatou 91 ciclos. Esse verde era um** verde falso** : `check:cycles` varreu 5 subdiretórios (450 arquivos), correspondeu apenas `import|export … from` estático e eliminou todos os especificadores `@/` e `@omniroute/open-sse/`, portanto, não foi possível ver os ciclos de alias + de importação dinâmica que dominavam o repositório. Corrigido: o portão agora percorre `src` + `open-sse` (5023 arquivos), coleta especificadores do TypeScript AST (portanto, `import("…")` conta e posição de tipo `typeof import("…")` não) e resolve tsconfig `paths`. Ele encontra** 14** ciclos, não 0. Como 14 ciclos pré-existentes não podem ser fixados em uma porta PR, `check:cycles` agora é um** catraca** (`--ratchet`, teto `metrics.cycles.value = 14` em `quality-baseline.json`, `direction: down`) — bloqueia qualquer _regressão_ e a contagem só pode cair. CI executa `npm run check:cycles:ratchet`. Passeios incendiados com**A-01** . `check:circular-deps` (dpdm) permanece consultivo como uma segunda opinião mais ampla.
- **Complexidade** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): uma caminhada ESLint, conta por ruleId para que as linhas máximas + ciclomáticas e as linhas de base cognitivas permaneçam independentes; `check:complexity` / `check:cognitive-complexity` individuais permanecem para `--update` local.
- **`/api` anti-alucinação** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): um inventário FS de `src/app/api`, rotas openapi + docs-symbols ainda reportam de forma independente; os indivíduos permanecem para corridas locais.
- **`check:node-runtime` é executado em 11 empregos** — ⚠️** ROI baixo.** Cada um é um corredor separado e a verificação é < 1s; economia total ~ 10s, contra a perda de um guarda barato por trabalho. Não vale a pena a agitação.
- **`typecheck:noimplicit:core` em CI lint** — ✅** removido do trabalho lint** (foi consultivo `continue-on-error`); a superfície do tipo de bloqueio é `typecheck:core` + `check:type-coverage`. Script local mantido.

### Inverter/decidir (política da operadora)

- `check:openapi-security-tiers` (consultivo) — ❌**NOT perfeitamente inversível.** Ele sai de 0, mas avisa que várias rotas `traffic-inspector` sob `LOCAL_ONLY_API_PREFIXES` não possuem a anotação `x-loopback-only: true`. Aplicá-lo requer primeiro adicionar essas anotações ao `openapi.yaml`.
- `typecheck:noimplicit:core` (consultivo) — amplamente incluído na catraca de bloqueio `check:type-coverage`. Vire para uma catraca ou solte a segunda passagem `tsc` redundante.
- `test:vitest:ui` (agora** bloqueando** ) falhas pré-existentes — são explicitamente excluídas no `vitest.config.ts` com comentários de rastreamento `// #8618` ; novas falhas falham no trabalho.
- `check:secrets` (gitleaks, catraca de bloqueio congelada em 3 falsos positivos documentados) — lista de permissão os 3 para chegar a 0 ou rebaixar para consultivo. Sobrepõe-se à verificação de segredo nativa GitHub + `check:public-creds`.
- `check:pr-evidence` (bloqueio, greps PR-body prosa) — alto risco de falso-positivo; enfraquece a aplicação da Hard Rule #18 se for abandonada, portanto, esta é uma decisão política genuína.
- `semgrep` (consultivo autônomo) — se sobrepõe CodeQL para as famílias OWASP ; conecte sua linha de base a uma catraca ou queda.

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
