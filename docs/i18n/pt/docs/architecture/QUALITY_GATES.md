# Quality Gates Reference (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Este documento é a referência oficial para todos os controlos de qualidade de CI no OmniRoute.
Descreve cada controlo, o que valida, a tarefa de CI em que é executado, se utiliza
uma linha de base ratchet ou uma política de aprovação/reprovação e se bloqueia a compilação ou é meramente consultivo.

Para um resumo breve e para a política da lista de permissões, consulte a secção "Controlos de qualidade e ratchets"
em `AGENTS.md`. Para a avaliação crítica, a classificação de maturidade e o plano de
replicação independente de ferramentas do mesmo sistema, consulte o
[Manual de controlos de qualidade](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inventário de gate e perfis de execução

### Admissão de candidato

Os fluxos de trabalho CI e Quality Gates emitem, cada um, um veredicto estável: `Gate / CI` e `Gate / Quality`. A sua política de admissão versionada enumera todos os trabalhos a montante, conforme necessário ou consultivo. Um trabalho obrigatório aplicável deve ser bem-sucedido: resultados em falta, cancelados, ignorados, pendentes e desconhecidos não podem ser estabelecidos PASS. Uma classificação válida apenas para documentos ou apenas para catálogo pode tornar uma linha de código inaplicável; um rascunho PR não é um candidato aceite. Um rótulo `hotfix` não dispensa provas.

Ambos os fluxos de trabalho abrangem PRs em ramificações main/release, envios para `main`, envio manual e eventos de grupo de fusão. Push, dispatch e merge-group executam a seleção completa. Pushes para `release/**` não os iniciam (2026-10-18): cada alteração já executou a matriz no seu PR e a combinação mesclada é o trabalho de Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane). As bifurcações e os grupos de fusão utilizam executores alojados para trabalhos que, de outra forma, selecionam executores auto-hospedados; capacidade alojada suficiente deve ser verificada antes da implementação.

Um PR comum executa a seleção rápida. As pistas `full-code` e `full-code-e2e` da política de admissão (E2E, integração, artefacto de pacote, Electron smoke, Bun SQLite, ecossistema e clientes de protocolo) são executadas apenas num rascunho de fila Mergify ou numa execução completa: `gh workflow run ci.yml --ref <branch>`.

Cada recibo JSON identifica o SHA verificado, a execução do fluxo de trabalho e a tentativa. O CLI rejeita uma incompatibilidade checkout/event SHA. Os testes de fluxo de trabalho ligam a associação à política à lista `needs` do trabalho de veredicto, para que uma pista nova ou removida não possa desaparecer silenciosamente. Os recibos cobrem o seu próprio fluxo de trabalho, não publicação, implementação ou aspetos internos de um scanner de consultoria existente. A ativação de ambos os nomes de cheques nas regras da filial é uma alteração administrativa separada; adicionar estes empregos não protege uma filial.

### Mesclar fila

O rótulo `queue` envia um PR para a fila Mergify (`.mergify.yml`). Mergify abre um rascunho PR numa ramificação `mergify/merge-queue/`, CI executa a seleção completa aí e o PR original funde-se quando `Gate / CI`, `Gate / Quality` e `Merge integrity (changelog + generated skills)` passam.

O Mergify escreve o resumo da fila na descrição do rascunho e outras aplicações também podem editá-lo. Um evento `pull_request` `edited` num tal rascunho leva o seu próprio grupo de simultaneidade (`-queue-edit-<run_id>`), pelo que não pode cancelar a execução real do rascunho e salta o portão e a matriz. Apenas `Merge integrity` ainda funciona. O trabalho de portão ignorado transporta um nome de verificação diferente, porque o Mergify lê um `Gate / CI` ignorado como uma verificação com falha e retira o PR.

Após um desenfileiramento, um push nem sempre recoloca o PR. Comente `@mergifyio queue` sobre isso.

### Evidências retidas no redutor de aceitação

`scripts/quality/validate-release-acceptance.mjs` reduz um plano fornecido e os seus manifestos; não estabelece que o plano cubra todo o pipeline de lançamento. Os seus relatórios definem explicitamente `releaseAcceptance: false`, mesmo quando esse plano é `VERIFIED`. O fluxo de trabalho `release-acceptance.yml` ainda utiliza acessórios de sombra, e não recibos reais de construção, pacote, arranque ou promoção.

O CLI exige que `--evidence-root` verifique as provas retidas. Os ficheiros são resolvidos como `<evidence-root>/<artifact_id>/<member>` e com hash como SHA-256. Um registo PASS sem evidência, um ficheiro em falta ou alterado, um caminho inseguro ou um link simbólico impedem a verificação. Os ficheiros em falta não são equivalentes a registos vazios bem-sucedidos. As verificações SHA/run/attempt existentes permanecem independentes: os bytes correspondentes não podem resgatar um recibo obsoleto. A integridade do arquivo não é prova de autenticidade de execução ou promoção de artefacto.

### Inventário de verificação estática

O inventário npm-alias versionado e a associação de varrimento estático residem em `config/quality/gate-manifest.json`. Execute `npm run check:gate-manifest` para validar os nomes dos scripts e os comandos exatos em `package.json`; adições, remoções e desvios de comando falham tanto no gancho local como nos trabalhos de classificação de mudança em CI. Um alias não é um trabalho de fluxo de trabalho, uma instância de matriz ou um caso de teste: estas contagens não devem ser apresentadas como intercambiáveis.

Utilize `npm run quality:scan -- --list` ou `npm run quality:scan:fast -- --list` para inspecionar os alias selecionados sem os executar. O executor invoca o ponto de entrada npm, pelo que o seu tempo de execução (incluindo Bun onde configurado) é preservado. O manifesto regista os alias fora destes perfis, conforme invocados separadamente, e os comandos de manutenção são proibidos nos perfis de varrimento de leitura apenas.

Estes perfis abrangem apenas a verificação estática. Não certificam testes de produtos, cobertura, embalagem, verificações externas ou aceitação total da libertação de um candidato. A admissão do fluxo de trabalho utiliza `config/quality/admission-policy.json` e `scripts/quality/admission-verdict.mjs` ligados. Os perfis dos observadores de lançamento permanecem separados; inspecionar os seus cheques e recibos aplicáveis de forma independente. Os comandos estáticos completos do observador são declarados em `config/quality/release-green-static-profile.json`, incluindo `audit:deps`, seleção de teste de mutação e verificações de tradução. O carregador valida os comandos npm em relação às declarações package.json e CI/Quality modeladas; rejeita o desvio em vez de executar tokens de shell como argumentos. A saída SKIP/INCOMPLETE do scanner necessária não consegue estabelecer PASS. O perfil regista as suas exclusões externas e não substitui a cobertura alojada, matrizes de teste, pacote ou evidência de implementação. O inventário em prosa abaixo é uma referência, não uma prova de que um portão realmente funcionou.

Os scripts residem em `scripts/check/` (portões de política) e `scripts/quality/` (mecanismo de roquete). A fonte da verdade CI é `.github/workflows/ci.yml`.

### Libertar caminho rápido PR (`quality.yml`)

`.github/workflows/quality.yml` complementa CI em main/release PRs, envia para `main`, despacha e junta grupos. PRs utiliza verificações rápidas filtradas por caminho. A compilação duplicada permanentemente desativada foi removida; as verificações reais build/package/boot permanecem em CI. O conjunto de unidades e o vitest são executados apenas em CI (`Unit Tests (N/8)` e `Vitest`).

| Trabalho                                         | Âmbito                                                                                                                                                             | Bloqueio              |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs e docs-all                                                                                                                            | Sim                   |
| `Fast Quality Gates`                             | Código PRs; verificações estáticas, verificação de tipo, verificação de tipo de painel, testes de unidade impactados, testes de irmãos esquecidos (aconselhamento) |
| `No new ESLint warnings`                         | Código PRs; protetor de cotão com reconhecimento de supressão                                                                                                      | Sim, incluindo garfos |
| `Merge integrity (changelog + generated skills)` | PRs sem rascunho; changelog e sincronização de competências geradas                                                                                                | Sim, incluindo garfos |

#### Relatório de testes de irmãos esquecidos

`npm run check:forgotten-sibling-tests` é executado como um passo consultivo do `Fast Quality Gates` e reutiliza o resolvedor de importação por trás do mapa de impacto de teste. Para cada módulo de produção alterado, reporta cadeias `changed module/symbol -> static consumer -> candidate sibling test` determinísticas quando o teste candidato está ausente da comparação de pull request. O resumo do Markdown e o resultado JSON são mantidos como o artefacto do fluxo de trabalho `forgotten-sibling-tests` para calibração antes de qualquer implementação de bloqueio.

As reexportações em barril e as importações dinâmicas são apenas diagnósticos de resolução; nunca criam uma descoberta bloqueadora. As exceções revistas residem em `config/quality/forgotten-sibling-allowlist.json`. Cada entrada deve nomear o teste do consumidor e do candidato, fornecer uma justificação específica e ligar um problema GitHub ou pull request. As entradas malformadas falham no fecho. As exceções não podem suprimir um teste candidato excluído ou uma comparação que adicione `.skip`/`.todo`; o enfraquecimento das asserções e outros mascaramentos permanecem pertencentes ao portão `check:test-masking` de bloqueio independente.

### Trabalho: `lint`

É executado em todos PR até `main`. Os blocos fundem-se em caso de falha.

| Guião (`npm run ...`)             | Valida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Bloqueio                                   |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | A versão Node.js está dentro do intervalo suportado                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sim                                        |
| `check:cycles`                    | Importações circulares em todos os `src/` + `open-sse/` (baseado em AST, tsconfig `paths` resolvido). Bare sai 1 sempre que existe qualquer ciclo (fechado com falha desde #15281) e lista o SCCs. `check:cycles:ratchet` (o que CI executa) bloqueia quando a contagem excede o `metrics.cycles` teto em `quality-baseline.json` — atualmente 14, `direction: down`, então só pode cair (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Sim (roquete)                              |
| `check:boundary`                  | Acoplamento `open-sse → src` : importações únicas de ficheiro para ficheiro do motor para a aplicação (`scripts/quality/measure-boundary.mjs`; a lista de bordas é o backlog de remediação v4 core/module-split ). Relatório consultivo = simples (igual a `quality:boundary`). `check:boundary:ratchet` (o que CI executa, também no loop de roquete `quality.yml` fast-gates) bloqueia quando a contagem excede o `metrics.boundaryOpenSseToSrc` teto em `quality-baseline.json` — semeado no 771 medido, `direction: down`; `--update` apenas diminui; relativo à base em PRs (`--base-ref`, ver abaixo)                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Sim (roquete)                              |
| `check:route-validation:t06`      | Esquemas Zod presentes em todas as rotas (política de nível 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Sim                                        |
| `check:any-budget:t11`            | a contagem `@ts-expect-error // any` não excede o orçamento (Catraca Nível 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Sim                                        |
| `check:provider-consistency`      | Cada fornecedor no `providers.ts` tem uma entrada correspondente no `providerRegistry.ts` (e vice-versa, dentro da lista de permissões)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sim                                        |
| `check:model-lifecycle`           | As três tabelas de encaminhamento mantidas manualmente permanecem consistentes com o instantâneo do ciclo de vida verificado (#11503): `FITNESS_TABLE` (`taskFitness.ts`) não pontua nenhum ID retirado que `REGISTRY` possa encaminhar; todo o alvo `BUILT_IN_ALIASES` está presente em `REGISTRY` e ausente do instantâneo de ID retirado; todo o id retirado ainda em `REGISTRY` é encaminhado ou listado em `allowedRetiredInCatalog`; e nenhuma origem ou destino `DEFAULT_DEGRADATION_MAP` aparece desativado nesse instantâneo. Isto não prova que um modelo seja atualmente servido por um upstream ativo. — offline é comparado com o `config/quality/model-lifecycle.json`, atualizado manualmente com `npm run quality:refresh-model-lifecycle` (rede; não ligado ao CI). `allowedRetiredInCatalog` é uma roquete de queima: adicione uma entrada apenas com um problema de seguimento.                                                                                                                                                                     | Sim                                        |
| `check:fetch-targets`             | Cada `fetch("/api/...")` no `src/` do lado do cliente é resolvido para um `route.ts` real                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Sim                                        |
| `check:deps`                      | Todas as dependências `npm install` -able em cada `package.json` do repositório estão em `dependency-allowlist.json`; novos pacotes não fixados ou desocupados sinalizados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sim                                        |
| `audit:deps`                      | auditoria npm de todos os cinco ficheiros de bloqueio independentes (plugins root, Electron, OpenCode v1/v2 e provider). Bloco de avisos críticos; avisos elevados permanecem avisos visíveis. auditorias Missing/failed são INCOMPLETE e block; hashes e os relatórios de bloqueio por âmbito são retidos.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Sim                                        |
| `check:lockfile`                  | `package-lock.json` integridade registo — https, hashes de integridade, sem substituições de host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sim                                        |
| `check:licenses`                  | Lista de permissões de licença SPDX para dependências de produção                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sim                                        |
| `check:tracked-artifacts`         | Nenhum artefacto de construção/links simbólicos `node_modules` confirmados (também é executado em pré-confirmação husky; pré-push é intencionalmente leve — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sim                                        |
| `check:ai-attribution`            | Nenhum trailer AI/bot `Co-Authored-By` ou rodapé de geração de IA em commits PR, título ou corpo — Hard Rule #16 (no loop `quality.yml` fast-gates para PR→ `release/**` — lê a carga útil do evento, no-op off PRs — e uma etapa somente PR em `ci.yml` lint para PR→ `main`; também o gancho husky `commit-msg` ; coautores humanos permitidos; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:vitest-exclusions`         | Cada eliminação Vitest nomeia um problema de rastreio e aparece em `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sim                                        |
| `check:file-size`                 | Os ficheiros de origem (`.ts`/`.tsx` em `src/`, `open-sse/`, `electron/`, `bin/`) estão dentro do `cap` e os ficheiros de teste (`*.test.ts(x)`) dentro do `testCap`; os ficheiros congelados em `file-size-baseline.json` (`frozen` / `testFrozen`) não devem ultrapassar o tamanho registado                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Sim                                        |
| `check:error-helper`              | Respostas de erro em executors/handlers usam `buildErrorBody()` / `sanitizeErrorMessage()` (regra rígida #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sim                                        |
| `check:migration-numbering`       | Os ficheiros SQL de migração são numerados sequencialmente, sem lacunas ou duplicados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Sim                                        |
| `check:public-creds`              | Sem chave literal OAuth `client_id`/`client_secret` ou Firebase Web fora `publicCreds.ts` (regra rígida #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Sim                                        |
| `check:db-rules`                  | Nenhum SQL bruto fora dos módulos `src/lib/db/` ; sem importações de barril do `localDb.ts` (regras rígidas #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sim                                        |
| `check:known-symbols`             | Os executores fornecedores, as estratégias de encaminhamento e os tradutores registados nas suas tabelas de despacho correspondem aos ficheiros no disco — sem símbolos órfãos ou não declarados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Sim                                        |
| `check:route-guard-membership`    | Cada rota que gera um processo filho é classificada por `isLocalOnlyPath()` (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Sim                                        |
| `check:test-discovery`            | Cada ficheiro `*.test.ts` / `*.spec.ts` no repositório é recolhido por pelo menos um executor de teste (roquete: a lista órfã no `test-discovery-baseline.json` só pode diminuir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sim                                        |
| `check:test-tla-order`            | Nenhum ficheiro `node:test` em `tests/unit` regista um teste, atinge um `await` de nível superior e regista mais (#18045; roquete: `test-tla-order-allowlist.json` só pode encolher)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sim                                        |
| `check:agent-skills-sync`         | Os artefactos de habilidades do agente gerados correspondem ao seu catálogo de origem (sem desvios)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | O fornecedor logos/assets carrega uma entrada de origem registada                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `lint:json`                       | Os ficheiros de configuração JSON analisam e satisfazem as regras do repo lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `typecheck:core`                  | compilação TypeScript sem erros (apenas avisos de aconselhamento)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sim                                        |
| `typecheck:noimplicit:core`       | Estrito `noImplicitAny` — virado para o futuro; muitos call sites pré-existentes ainda precisam de anotações                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | **Consultivo** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` com âmbito definido para `src/app/(dashboard)/**` (#7033) — `typecheck:core` a lista de permissões de 27 ficheiros com curadoria não inclui nenhum painel TSX, e `next build` também nunca verifica o tipo (`next.config.mjs` define `ignoreBuildErrors: true`), pelo que as regressões de identificadores órfãos (#6625/#6909) eram invisíveis para CI. Comparações com uma linha de base de contagem per-file/per-TS-code congelada (`config/quality/dashboard-typecheck-baseline.json`, mesmo padrão de aplicação obsoleta de `check:known-symbols`) — apenas NEW erros para além da contagem de linha de base falham no portão; reduza o `--update` quando um erro pré-existente for corrigido.                                                                                                                                                                                                                                                                                                                                                              | Sim                                        |
| `check:build-typecheck`           | A verificação do tipo de produção de toda a aplicação sobre `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), a lista de permissões de 27 ficheiros da superfície `typecheck:core` e o portão do painel não cobrem. Diferenças contra `config/quality/build-typecheck-baseline.json`; uma contagem nova ou aumentada por (ficheiro, código) falha, uma contagem mais baixa solicita que aumente. `--update` recusa enquanto a execução contém um par novo ou elevado, a menos que `--force-regressions` seja aprovado, e recusa um ficheiro recentemente silenciado, a menos que `--force-nocheck` seja aprovado, pelo que alargar a linha de base para ficar verde e conceder um silêncio permanente são dois atos deliberados separados. Um `--force` simples é rejeitado. Verifica também o âmbito de construção do `@ts-nocheck` em relação ao `config/quality/ts-nocheck-baseline.json`, porque um ficheiro que o utiliza não reporta qualquer diagnóstico e, de outra forma, seria invisível para todos os portões. | Sim                                        |

#### Dois programas de verificação de tipo respondem de forma diferente

`typecheck:core` e o `check:build-typecheck` compilam programas diferentes sob opções diferentes, e o mesmo ficheiro pode estar limpo num e cheio de erros no outro.

`tsconfig.build.json` define `"strict": false`, então `noImplicitAny` está desativado. A configuração principal compila uma lista de permissões de 27 ficheiros com opções mais restritas e segue o gráfico de importação de cada entrada, para que os ficheiros que nunca aparecem no programa de compilação ainda sejam verificados aí.

A consequência é importante ao julgar se um ficheiro é digitado:** zero diagnóstico sob `check:build-typecheck` não significa zero** . A remoção `@ts-nocheck` de 26 ficheiros mostrou 23 deles limpos no programa de compilação; dezasseis deles revelaram cerca de 120 erros implícitos no estrito. Verifique ambos antes de chamar um ficheiro limpo.

### Trabalho: `quality-gate`

Corre depois de `test-coverage`. Os blocos fundem-se em caso de falha.

| Argumento                    | Valida                                                                                                                                                                        | Bloqueio                       |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `quality:collect`            | Emite `quality-metrics.json` (contagem de avisos ESLint, cobertura do relatório de fragmentos fundidos)                                                                       | Sim (a montante do torniquete) |
| `quality:ratchet`            | Cada métrica em `quality-baseline.json` não regrediu ( avisos ESLint linha de base ≤ ; linha de base ≥ de cobertura)                                                          | Sim                            |
| `check:duplication`          | A duplicação de código (jscpd@4) não excede a linha de base no `quality-baseline.json`                                                                                        | Sim                            |
| `check:complexity`           | A complexidade ciclomática ao nível do ficheiro não excede o limiar (núcleo ESLint `complexity` + `max-lines-per-function`)                                                   | Sim                            |
| `check:cognitive-complexity` | Torniquete de complexidade cognitiva (`eslint-plugin-sonarjs`) — passagem ESLint separada; CI executa ambos fundidos como o único passo `check:complexity-ratchets`           | Sim                            |
| `check:dead-code`            | Torniquete de exportações/ficheiros não utilizados (knip) não regride em relação à linha de base                                                                              | Sim                            |
| `check:compression-budget`   | O orçamento de referência de compressão — por mecanismo de poupança de tokens não deve regredir                                                                               | Sim                            |
| `check:type-coverage`        | A roquete digitada por percentagem (`type-coverage`) não regride; inclui em grande parte `typecheck:noimplicit:core`                                                          | Sim                            |
| `check:codeql-ratchet`       | A contagem de alertas CodeQL abertos não regride (lê via `gh api`; salto gracioso sem token) cadência de atualização — e acionamento manual: consulte "CodeQL roquete" abaixo | Sim                            |

### Trabalho: `quality-extended`

Todo o trabalho é consultivo (`continue-on-error: true`). As torniquetes baseadas em npm funcionam de verdade; os scanners externos são instalados através do `gh release download` e ignoram automaticamente (saída 0) quando um binário ainda está em falta.

| Argumento                | Valida                                                                                                                                                                                                                          | Bloqueio                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `check:circular-deps`    | Sem dependências circulares (dpdm)                                                                                                                                                                                              | **Consultivo**                                        |
| `check:bundle-size`      | O tamanho do pacote não excede o limite                                                                                                                                                                                         | **Consultivo**                                        |
| `check:secrets`          | Secret scan (gitleaks) — ignora se o binário estiver ausente                                                                                                                                                                    | **Consultivo**                                        |
| `check:vuln-ratchet`     | Vulnerabilidades de dependência (osv-scanner) não regridem — `--ratchet` falha como INCOMPLETE (saída 2) se não for medida                                                                                                      | **Consultivo**                                        |
| `check:workflows`        | Lint de workflow (actionlint + zizmor); scanners missing/broken, relatórios inválidos ou linha de base da catraca em falta falham como INCOMPLETE. As descobertas válidas seguem a política strict/advisory/ratchet selecionada | Execução necessária; bloqueio de roquete zizmor em CI |
| `check:openapi-breaking` | Public API contract against pinned event commits (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); required measurement fails closed                                                      | **Bloqueio com --ratchet**                            |

### Trabalho: `docs-sync-strict`

É executado em todos PR até `main`. Os blocos fundem-se em caso de falha.

| Argumento                      | Valida                                                                                                                                                                               | Bloqueio                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `check:docs-all`               | Meta-gate que executa os 6 sub-gates abaixo sequencialmente                                                                                                                          | Sim                        |
| ↳ `check:docs-sync`            | Consistência da versão CHANGELOG / OpenAPI / llm.txt                                                                                                                                 | Sim                        |
| ↳ `check:docs-counts`          | As contagens em prosa (contagem de fornecedores, contagem de migrações, etc.) estão dentro da janela de roquete das contagens reais                                                  | Sim                        |
| ↳ `check:env-doc-sync`         | Cada env var em `.env.example` é documentado numa tabela de documentos e vice-versa                                                                                                  | Sim                        |
| ↳ `check:deprecated-versions`  | Sem string de versão obsoleta nos documentos                                                                                                                                         | Sim                        |
| ↳ `check:doc-links`            | As ligações de remarcação interna em documentos são resolvidas para ficheiros reais (formato `[text]`/`(path)` )                                                                     | Sim                        |
| ↳ `check:fabricated-docs`      | Rotas, env vars, comandos CLI, nomes de ganchos e caminhos de ficheiros citados nos documentos existem na base de código. Portão rígido via `--strict`; falha suave sem sinalizador. | Sim (via `--strict` em CI) |
| `check:cli-i18n`               | As strings de comando CLI estão presentes em todos os ficheiros de localização i18n                                                                                                  | Sim                        |
| `check:openapi-coverage`       | A especificação OpenAPI cobre pelo menos um piso reduzido de percursos reais                                                                                                         | Sim                        |
| `check:openapi-security-tiers` | As anotações da camada de segurança no `openapi.yaml` são consistentes com as classificações `routeGuard.ts`                                                                         | **Consultivo**             |
| `check:openapi-routes`         | Cada caminho em `openapi.yaml` resulta num `route.ts` real (anti-alucinação)                                                                                                         | Sim                        |
| `check:docs-symbols`           | Cada referência `/api/...` em `docs/**/*.md` resulta num `route.ts` (anti-alucinação) real                                                                                           | Sim                        |
| `i18n translation drift`       | As chaves não traduzidas em ficheiros de localidade i18n — apenas avisam                                                                                                             | **Consultivo**             |

Os doze README SVGs sob `docs/diagrams/` são gerados (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` regenera todos eles). Cada um tem um teste de unidade de comparação de bytes (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) que falha quando o ficheiro confirmado está obsoleto e `check:docs-counts` lê números canónicos dos seus nós `<text>` — e é por isso que a etapa de estrutura de tópicos mantém cada string delineada no ficheiro como invisível `<text>`. A verificação de números canónicos SVG lê os ficheiros listados em `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, mais `public/images/tier-flow-dark.svg` e `tier-flow-light.svg`; as reivindicações free-forever, entrada de catálogo, pool recorrente e fatores de pontuação são também `promise-pillars.svg`, `free-tier-budget.svg` e `strategies-grid.svg`. `free-tier-budget.svg` extrai os seus números do carregador de catálogo ativo, pelo que uma alteração no `FREE_MODEL_BUDGETS` ou no nome de visualização de um fornecedor é vermelha CI até que o ficheiro seja regenerado.

### Trabalho: `i18n-ui-coverage`

| Argumento                         | Valida                                                                                                                                                                                                 | Bloqueio       |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `check-ui-keys-coverage` (inline) | A cobertura da chave UI i18n é ≥ 65%                                                                                                                                                                   | Sim            |
| `check-ui-value-drift` (inline)   | Um inglês reescrito** valor** não deixa nenhuma tradução obsoleta para trás                                                                                                                            | Sim            |
| `check-new-key-coverage` (inline) | UM** novo** A chave inglesa é traduzida em cada localidade — um marcador `__MISSING__:` é rejeitado                                                                                                    | Sim            |
| `check-translation-ratio`         | A proporção de tradução real por localidade (idêntico ao inglês/espaço reservado/folhas em falta fora da lista de permissões) não deve exceder `config/quality/i18n-translation-baseline.json` + slack | **Consultivo** |

Necessita `fetch-depth: 0` — a porta de desvio de valor compara `en.json` com a base de fusão.

#### `check-ui-value-drift` — portão de tradução obsoleto

Capta aquela regressão que as outras portas estruturalmente não conseguem ver: um valor em inglês é reescrito e as traduções derivadas do inglês _anterior_ ficam para trás, para que os utilizadores que não falam inglês continuem a ler cópias com palavras fidedignas, agora erradas.

Isto foi enviado de verdade. `oauthModal.googleOAuthWarning` foi reescrito quando chegou o auxiliar de início de sessão Antigravity (#5203);** 39 de 43 localidades** manteve o texto informando os operadores para "copiar o URL completo e colá-lo abaixo" — um fluxo que não pode ser concluído para esse fornecedor. Passou despercebido até #8463 porque:

- `sync-ui-keys` apenas preenche chaves que são** ausente** , nunca aqueles que são** obsoleto** ;
- `check-ui-keys-coverage` conta a _presença_ da chave, pelo que uma tradução obsoleta é considerada coberta;
- `check-translation-drift` rastreia a documentação `docs/i18n/<locale>/**.md` espelha — nunca lê `src/i18n/messages/*.json`. Bloqueio no trabalho `docs-sync-strict` desde a ressincronização de 2026-09: editar um documento principal → `npm run i18n:run -- --files=<doc>` (nível de secção, barato).

**Com reconhecimento de diferença, não com base na linha de base.** Compara `en.json` na base de fusão com a árvore de trabalho; para cada chave cujo valor em inglês tenha sido alterado, qualquer localidade que ainda contenha uma tradução intacta será obsoleta. Isto deliberadamente** congela dívidas pré-existentes** — a diff não pode revelar de que inglês antigo veio uma tradução de longa data, pelo que o portão julga apenas o que a mudança actual toca. A alternativa (uma linha de base de hash por chave) custaria um ficheiro gerado ~ 600 KB, 3 × a maior linha de base existente, agitando a cada i18n PR.

Duas formas de o satisfazer:

1. atualizar as traduções afetadas ou
2. configure-os para `__MISSING__:<new english>` — o tempo de execução e depois exibe o inglês corrigido (`src/i18n/request.ts::deepMergeFallback`, #7258) e as filas de chaves para tradução.

Se a string for** significado** mudou, prefiro** renomeando a chave** : uma nova chave não pode herdar uma tradução obsoleta. Este é o padrão utilizado #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Sai de 0 com `SKIP reason=base-unresolved` quando o catálogo base não pode ser lido (clone superficial sem a referência base), espelhando `check-openapi-breaking`.

### Trabalho: `i18n`

Matriz de validação i18n completa (um trabalho por localidade). Todo o trabalho é consultivo.

| Argumento                       | Valida                                | Bloqueio                                                      |
| ------------------------------- | ------------------------------------- | ------------------------------------------------------------- |
| `validate_translation.py quick` | Completude da tradução por localidade | **Consultivo** (`continue-on-error: true` em todo o trabalho) |

### Trabalho: `pr-test-policy`

É executado apenas em pull requests.

| Argumento              | Valida                                                                                                                               | Bloqueio |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `check:pr-test-policy` | PRs que altera o código de produção em `src/`, `open-sse/`, `electron/` ou `bin/` deve incluir ou atualizar testes (regra rígida #8) | Sim      |
| `check:test-masking`   | Os ficheiros de teste alterados não reduzem a contagem de declarações líquidas nem adicionam tautologias `assert.ok(true)`           | Sim      |
| `check:pr-evidence`    | PR body cita test/VPS evidências para a mudança (mecaniza Hard Rule #18 grep PR prose — frágil, ver Backlog)                         | Sim      |

### Trabalho: `test-vitest`

Corre depois de `build`. Os blocos fundem-se em caso de falha.

| Suíte            | Valida                                                           | Bloqueio                                                                                                                 |
| ---------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | servidor MCP (110 ferramentas), autoCombo, cache — vitest runner | Sim                                                                                                                      |
| `test:vitest:ui` | Componente UI testa — vitest runner                              | **Bloqueio** falhas pré-existentes — são explicitamente excluídas em `vitest.config.ts`; novas falhas falham no trabalho |

### Fluxos de trabalho noturnos (agendados, consultivos)

São executados numa programação cron (e `workflow_dispatch`), nunca em PRs. Todos são consultivos.

| Fluxo de trabalho      | Valida                                                                                                                                                                          | Bloqueio       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | testes de propriedade de verificação rápida com uma contagem aleatória de sementes + elevada                                                                                    | **Consultivo** |
| `nightly-resilience`   | porta de crescimento de heap, injeção de falha de caos, k6 load/soak                                                                                                            | **Consultivo** |
| `nightly-llm-security` | proteção de injeção promptfoo (modo de bloqueio) + garak probes (ignorado sem segredo do fornecedor)                                                                            | **Consultivo** |
| `nightly-schemathesis` | Fuzzing de contrato OpenAPI (esquematese) contra um OmniRoute ativo utilizando violações de especificações de superfícies `docs/openapi.yaml` — /500s não tratadas (Fase 8 B.4) | **Consultivo** |
| `nightly-mutation`     | A pontuação do teste de mutação Stryker na via rápida da unidade — mutantes sobreviventes superam afirmações fracas                                                             | **Consultivo** |
| `nightly-compat`       | Matriz de compatibilidade do mecanismo de nós entre os intervalos `engines.node` suportados                                                                                     | **Consultivo** |

As linhas de base de desempenho (heap, TTFB, tempo de construção) são registadas, não bloqueadas: ver [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Fase de velocidade (2026-08-30 → v4.0 LTS): todos os valores de referência flexibilizados em 20%

Decisão do responsável (2026-08-30): até à modularização da v4.0, a velocidade de entrega é mais importante
do que conter a dívida. Todos os limites de referência **numéricos** foram flexibilizados em 20% numa única
operação auditável, e a fase está declarada em `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| O que mudou                                                                                                                                                                                                                       | Onde                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — contagens em que menos é melhor ×1,2, percentagens em que mais é melhor ÷1,2 (mínimo de cobertura mantido em 60, `eslintErrors` permanece em 0, `eslintWarnings` 0 → 20% da contagem de supressões congelada) | `quality-baseline.json` (a nota `_relax_velocity_2026_08_30` enumera cada valor anterior → posterior)  |
| `count` ×1,2 / `percentage` ×1,2                                                                                                                                                                                                  | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, todos os limites de linhas `frozen[*]` / `testFrozen[*]` ×1,2                                                                                                                                                   | `file-size-baseline.json`                                                                              |
| contagens por ficheiro / por código TS ×1,2                                                                                                                                                                                       | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                               | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` passa a ser informativo enquanto `_policy.requireTighten === false`                                                                                                                                           | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| o `bank-ratchet-shrinks` noturno fica suspenso (registaria a redução medida e anularia a margem)                                                                                                                                  | `.github/workflows/nightly-release-green.yml`                                                          |

As listas de permissões (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **não** são orçamentos e não foram alteradas. Os controlos de política com aprovação/reprovação (segredos, regras SQL,
contrato de documentação/ambiente, paridade de i18n, testes unitários) permanecem inalterados — um teste com erro continua a ser um teste com erro.

**Ferramentas**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — a
  flexibilização de execução única (`scripts/quality/relax-baselines.mjs`); recusa executar duas vezes com a
  mesma nota.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mede todos os controlos numéricos da mesma forma que a CI e apresenta a margem restante por controlo
  (`scripts/quality/baseline-headroom.mjs`). A tarefa noturna `baseline-headroom` publica
  a tabela no resumo da execução do fluxo de trabalho e carrega o respetivo relatório JSON/Markdown como
  `baseline-headroom-<run_id>`, conservado durante 90 dias. As linhas de aviso e críticas identificam controlos
  que estão a menos de 10% do respetivo limite ou que já o ultrapassaram. Analise estes relatórios como um alerta antecipado
  para o consumo dos orçamentos; examine as notas `_rebaseline_*` do controlo responsável. A tarefa já
  não cria nem atualiza um problema permanente; o #12149 preserva o histórico de relatórios anterior.

**Modo de código novo (Clean-as-You-Code) — desde 2026-08-30, apenas para o percurso rápido de PR**

Em eventos `pull_request`, `quality.yml` transmite `--base-ref <PR base SHA>` a `check:file-size`,
`check:complexity-ratchets` e `check:dead-code`. Para `check:complexity-ratchets` e
`check:dead-code`, o controlo compara HEAD com a base de integração **restringindo-se aos ficheiros alterados pelo PR**
(`scripts/check/newCodeMode.mjs`: a base de integração é materializada num
`git worktree` descartável, ESLint/knip são executados aí e em HEAD, e as contagens por ficheiro são comparadas):

- **bloqueante** — o PR adicionou violações de complexidade ciclomática/cognitiva ou exportações não utilizadas nos ficheiros que alterou
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` no registo);
- **informativo** — o total global comparado com o valor de referência congelado. Os desvios herdados nunca fazem
  falhar um PR que não lhes deu origem; o desvio volta a ser congelado durante a reconciliação da versão e é monitorizado pela tarefa de margem.

`check:file-size` utiliza a referência base segundo as suas próprias regras (`scripts/check/check-file-size.mjs`, #8522):
verifica todos os ficheiros de origem e de teste na árvore, lê a contagem de linhas de cada um na base do PR
com `git show` e só reprova um ficheiro quando este cresce para além do maior valor entre o respetivo limite de referência
(`frozen` / `testFrozen`, ou `cap` / `testCap` para um ficheiro fora do valor de referência) e o seu tamanho base.
Por conseguinte, um ficheiro que já se tenha desviado na base nunca faz falhar um PR que não lhe deu origem.

`check:boundary:ratchet` aplica a mesma regra ao seu único número
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): nos eventos de PR, tanto os
fast-gates de `quality.yml` como o job de lint de `ci.yml` recebem o SHA base do PR, o commit base é
medido a partir de uma exportação `git archive`, e o PR só falha quando a contagem de arestas
`open-sse → src` excede o maior valor entre `metrics.boundaryOpenSseToSrc` e a contagem na base. O
desvio da base acima do limite é comunicado (`base drift herdado`), mas nunca faz falhar um PR
inocente; push → main mantém o limite absoluto, e um SHA base que não possa ser resolvido recorre
ao mesmo com um aviso.

As execuções de `workflow_dispatch`, a verificação release-green e o job noturno de margem não têm
uma base de PR e mantêm a comparação absoluta (global). A cobertura, a duplicação e a cobertura de
tipos permanecem globais por enquanto (as respetivas ferramentas não produzem uma comparação por
ficheiro de forma eficiente) — são candidatas ao mesmo tratamento.

**Encerrar a fase na v4.0 (LTS = mais restrita do que antes, não "voltar ao normal")**

1. Na ponta pura de `release/v4.0.0`: `npm run quality:headroom --json` para registo e, em seguida,
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, o
   `--update` de cada gate de typecheck — cada baseline desce para o valor medido.
2. Eliminar `_policy` de `quality-baseline.json` (reativa `--require-tighten` e a acumulação
   noturna), restaurar `THRESHOLD = 36` (ou superior) em `check-openapi-coverage.mjs`.
3. Apertar para além do valor medido nos casos em que a modularização compensou: `cap` do tamanho
   dos ficheiros novamente para 1000 (ou 800), limites mínimos de cobertura +5, 0 exports não
   utilizados para os packages modularizados.

## Linha de base do ratchet (`quality-baseline.json`)

O motor de ratchet (`scripts/quality/check-quality-ratchet.mjs`) lê `quality-baseline.json`
e compara-o com o `quality-metrics.json` recém-recolhido. Qualquer métrica que regrida
para além do respetivo épsilon faz com que a compilação falhe.

Métricas atualmente monitorizadas:

| Métrica               | Direção | Significado                                    |
| --------------------- | ------- | ---------------------------------------------- |
| `eslintWarnings`      | `down`  | O número de avisos do ESLint não pode aumentar |
| `coverage.statements` | `up`    | A cobertura de instruções não pode diminuir    |
| `coverage.lines`      | `up`    | A cobertura de linhas não pode diminuir        |
| `coverage.functions`  | `up`    | A cobertura de funções não pode diminuir       |
| `coverage.branches`   | `up`    | A cobertura de ramos não pode diminuir         |

Para atualizar a linha de base após uma melhoria efetiva:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

A opção `--update` escreve os valores atualmente medidos em `quality-baseline.json`.
Confirme este ficheiro juntamente com a alteração que melhorou a métrica. Um PR que melhore uma
métrica sem atualizar a linha de base será detetado por `--require-tighten` (Fase 6A.5,
implementação pendente).

### Ratchet do CodeQL: frequência de atualização e acionamento manual

`check:codeql-ratchet` lê **o estado do repositório, atualizado de acordo com um agendamento — não por PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` comunica
`state: configured`, `schedule: weekly`: a análise da configuração predefinida do GitHub, e não uma
análise por push. Consequência: após a integração de um PR que CORRIJA alertas, o ratchet continua a ler
a contagem antiga e mais elevada até à execução da próxima análise agendada — pelo que comunica uma regressão
em todos os PR abertos, incluindo nos PR subsequentes ao próprio PR de correção, até que a análise seja atualizada.

**Atualização manual**: `gh workflow run codeql.yml --ref release/vX.Y.Z` volta a executar a
análise e publica novamente os alertas em poucos minutos. Leia primeiro `.github/workflows/codeql.yml`
— o respetivo cabeçalho explica que é apenas para `workflow_dispatch` **porque entra em conflito com
a "configuração predefinida" do GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). A reposição dos acionadores `push`/`pull_request`/
`schedule` requer primeiro uma **ação do proprietário**: Settings → Code security →
CodeQL: Default → Advanced. Não adicione um acionador `schedule:` sem efetuar essa alteração — este
apenas produzirá execuções com falhas.

**Aperte a linha de base após a diminuição da contagem** — `node scripts/check/check-codeql-ratchet.mjs
--update` escreve a nova contagem medida em `quality-baseline.json` →
`metrics.codeqlAlerts.value`, para que o ratchet não permita silenciosamente uma regressão até
ao limite máximo anterior. Exemplo prático (2026-09-02/03): o PR #12502 corrigiu 7 alertas reais
(13 → 6 alertas abertos medidos); o PR #12530 apertou a linha de base fixa de 11 → 6 para corresponder; os
6 restantes foram depois dispensados, com uma justificação por alerta, reduzindo o número de alertas abertos para 0.

**As dispensas são uma decisão do operador (Regra Rígida #14)** — nunca dispense um alerta do CodeQL
sem registar a justificação técnica no comentário da dispensa: `won't fix` para
um requisito de protocolo a montante, `used in tests` para um fixture de teste, `false positive`
para um sanitizador que o CodeQL não consegue detetar (precedente: `docs/security/ERROR_SANITIZATION.md`).

---

## Política de repetição de testes (WS5.4, v3.8.49)

A repetição é definida por runner, nunca de forma global e indiscriminada — uma repetição indiscriminada transforma regressões reais
em falhas intermitentes invisíveis:

| Runner           | Política                                                                                                                              | Porquê                                                                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` apenas em CI, com `trace: on-first-retry`                                                                                | A temporização do browser/da rede é genuinamente não determinística; uma repetição com um trace transforma uma falha intermitente num artefacto diagnosticável |
| Vitest           | SEM repetição global. Um teste comprovadamente intermitente recebe uma repetição explícita por teste (visível no diff, revista no PR) | Mantém a lista de quarentena no repositório, nunca opaca                                                                                                       |
| node:test (unit) | SEM repetição, em circunstância alguma                                                                                                | Um teste unitário intermitente é um erro no teste — corrija-o, não volte simplesmente a executá-lo                                                             |

SLOs pretendidos assim que a telemetria de falhas intermitentes estiver disponível (WS5.2/5.3): taxa de falhas intermitentes <1% por teste
(limiar de "corrigir agora"), taxa de sucesso ≥95% por pipeline. Valores de referência do setor —
recalibrar com base nas nossas próprias medições.

## Desvio dos limites progressivos ao nível da release (WS5.5, v3.8.49)

Quando um limite progressivo (tamanho de ficheiro, complexidade, avisos do eslint) regride na ponta PURA da release
— ou seja, a COMBINAÇÃO de merges causou a regressão e nenhum PR isolado a reproduz no
seu próprio branch — a correção cabe ao **responsável pela release, uma única vez, no
branch da release**: dar preferência à extração/refatorização; redefinir a baseline apenas com a entrada
de justificação documentada. Nunca transferir um desvio combinado para o PR de um colaborador e nunca
redefinir a baseline por PR (isso oculta regressões reais). Primeiro, fazer a distinção: reproduzir a
falha na ponta pura, numa worktree de teste, antes de assumir que foi causada pelo seu PR.

## Registar reduções dos limites progressivos — a direção descendente (#8584)

O mecanismo de limites progressivos é apenas parcialmente automático, e é a parte errada. **Aumentar** um limite é uma
edição manual de JSON que demora dez segundos e é a forma mais rápida de desbloquear um PR com falhas.
**Reduzir** um limite exige que alguém execute `--update` e faça commit do resultado — e, até
o job `bank-ratchet-shrinks` ser implementado, nenhum workflow o executava. A consequência medida
(2026-07-25): 18 ficheiros congelados já se encontravam no limite de 800 linhas para novos ficheiros ou abaixo dele, o pior
com 132× (`src/shared/validation/schemas.ts`, 19 linhas com um limite de 2,523); o
limite máximo de complexidade passou de `1794 → 2169` ao longo de ~37 notas de redefinição da baseline, com exatamente uma
redução (−1); e "apertar através de `--update` no próximo ciclo" foi escrito 31 vezes e cumprido
uma vez. Um limite que sobrevive ao código que o justificou transforma silenciosamente cada
decomposição concluída numa margem de crescimento para quem editar o ficheiro a seguir.

`nightly-release-green.yml` → o job **`bank-ratchet-shrinks`** fecha esse ciclo:

|            |                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------ |
| Executa em | `schedule` (3×/dia) + `workflow_dispatch` — deliberadamente **não** em `push`                                |
| Mede       | o `release/vX.Y.Z` mais elevado, com a mesma resolução + proteção contra injeção de `release-green`          |
| Escreve    | `check:file-size --update` e `check:complexity-ratchets --update` (ambos apenas reduzem por definição)       |
| Verifica   | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                     |
| Entrega    | um único PR sempre atualizado para o branch da release — atualizado à força, nunca repetido de forma abusiva |

O registo é feito em lote, em vez de a cada push, porque não tem requisitos de latência (uma redução
registada no prazo de 8h é aceitável), enquanto uma execução por merge reconstruiria repetidamente o branch do PR
durante campanhas de merge e incorreria sempre no custo de uma verificação completa do ESLint. A deteção continua a ocorrer no
push (`release-green`); apenas o registo é processado em lote.

### O verificador de segurança

O job escreve nas baselines sem supervisão, pelo que `verify-ratchet-bank.mjs` é o que torna
isso aceitável. Compara a árvore posterior a `--update` com `HEAD` e **aborta o job
antes de existir qualquer commit** — sem abrir qualquer PR — a menos que todas as alterações sejam uma das seguintes:

- uma entrada numérica `frozen` / `testFrozen` **reduzida** ou **removida**
- `complexity-baseline.json` → `count` **reduzido**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **reduzido**

Qualquer outra alteração falha: aumentar um número, adicionar uma entrada, alterar `cap`/`testCap` ou
eliminar/reescrever uma nota `_rebaseline_*` (essas notas constituem o registo de auditoria que explica por que motivo existe cada
limite máximo e são armazenadas no mesmo objeto `frozen` que as entradas dos ficheiros).
Um bot capaz de aumentar um limite seria claramente pior do que a situação atual. Proteção contra regressões:
`tests/unit/verify-ratchet-bank.test.ts`.

O job nunca faz push para `release/*` — uma pessoa faz o merge do PR, pelo que uma medição incorreta
não pode ser integrada sem revisão.

## Política de lista de permissões

Cada porta que não pode falhar violações pré-existentes utiliza uma lista de permissões congelada (por exemplo, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). A política é:

**Corrija a causa raiz; utilize a lista de permissões apenas quando a violação for pré-existente e não puder ser corrigida no mesmo PR.**

Ao adicionar uma entrada a uma lista de permissões:

1. Inclua um comentário com a justificação.
2. Faça referência ao problema de seguimento (por exemplo, `// #3498 — Phase 2 feature, not yet implemented`).
3. Remover a entrada no mesmo PR que corrige a violação — uma entrada obsoleta que já não suprime uma violação ativa é em si um defeito (6A.3 a aplicação obsoleta falhará no portão numa entrada órfã da lista de permissões, uma vez implementada).

Fazer** não** adicione entradas à lista de permissões para fazer com que os testes passem mais rapidamente. Um portão verde com uma lista de permissões crescente é uma falsa sensação de qualidade.

### Quando um portão falha no seu PR

1. **Leia a saída do portão com atenção** — informa exatamente qual o ficheiro ou símbolo que violou a regra.
2. **Corrigir a violação** — a maioria das portas são verificações determinísticas do sistema de ficheiros que passam assim que o código está correcto.
3. **Se a violação for pré-existente** (ou seja, não o introduziu, mas o portão agora cobre-o): adicione uma entrada na lista de permissões com um comentário de justificação e um problema de rastreio.
4. **Se o portão for um torniquete** (cobertura, avisos ESLint, duplicação, complexidade): a sua alteração piorou a métrica. Corrija o problema subjacente ou (raramente) execute `npm run quality:ratchet -- --update` se a alteração for intencional e a degradação da métrica for aceitável —, mas documente o motivo na descrição PR.
5. **Portões consultivos** (`continue-on-error: true`) são — informativos, não bloqueiam a fusão, mas aparecem no resumo CI. Corrija-os de qualquer forma.

---

## Adicionar uma Nova Verificação

1. Crie `scripts/check/check-<name>.mjs` (ou `.ts`). As verificações de políticas terminam com o código 0/1.
   As verificações de estilo incremental emitem uma métrica para `quality-metrics.json` através de `collect-metrics.mjs`.
2. Adicione `"check:<name>": "node scripts/check/check-<name>.mjs"` a `package.json`.
3. Integre-a em `.github/workflows/ci.yml` no job adequado
   (política → `lint` ou `docs-sync-strict`; incremental → `quality-gate`).
4. Se tiver uma lista de permissões, aplique `reportStaleEntries()` de
   `scripts/check/lib/allowlist.mjs` para que as entradas obsoletas sejam detetadas automaticamente.
5. Escreva um teste em `tests/unit/build/` que abranja a lógica de deteção da verificação.
6. Atualize este documento (adicione uma linha à tabela do job relevante).

---

## Ferramentas para agentes: LSP integrado no ciclo (opcional)

Para além das verificações de CI, o OmniRoute inclui uma estrutura `agent-lsp` **opcional**
(um `.mcp.json` ao nível do projeto, Fase 7 Tarefa 15). Crie `.mcp.json`
para disponibilizar um servidor de linguagem TypeScript aos agentes de programação, para que estes resolvam símbolos /
diagnósticos **antes** de escreverem código — um complemento de compilação antes da validação para
`typecheck:core`, que elimina na origem os erros de «símbolo inventado». Intencionalmente,
não é carregado de forma automática (cabe-lhe escolher e verificar a ponte MCP↔LSP); uma entrada inválida apenas regista um
erro de ligação e nunca interrompe as sessões.

---

## Backlog de racionalização (revisão ROI — Fase 9 Onda 3)

Este inventário foi reconciliado com o `ci.yml` no dia 17/06/2026 (a versão anterior omitiu `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence`). Uma revisão ROI do conjunto reconciliado identificou os seguintes candidatos à racionalização.** As fusões são alterações mecânicas CI ; os flips/drops são decisões políticas reservadas ao operador.** Nada abaixo foi ainda aplicado.

**Também não documentado acima** (aconselhamento, sinal baixo): o trabalho `docs-lint` (markdownlint + Vale, trabalho inteiro `continue-on-error`) e os fluxos de trabalho do scanner autónomo `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` está em `quality-baseline.json`, mas não está ligado a um roquete de bloqueio em `ci.yml` — a métrica está atualmente órfã.

### Mesclar/desduplicar (mecânico, menor risco)

Cada candidato foi validado em relação ao estado do portão ativo no dia 17/06/2026 (confiar, mas verificar); várias fusões "óbvias" acabaram por esconder dívidas e são** não** entradas limpas.

- **`check:docs-sync` é executado duas vezes** — autónomo no trabalho `lint` e novamente dentro de `check:docs-all` (`docs-sync-strict`) e no gancho de pré-confirmação husky. ✅**DONE** A invocação `lint` autónoma — foi removida.
- **digitalização CVE** — ❌**NOT uma fusão limpa.** `audit:deps` bloqueia avisos críticos e auditorias incompletas em todos os cinco ficheiros de bloqueio, ao mesmo tempo que reporta avisos altos como avisos ao abrigo da política atual; `check:vuln-ratchet` (osv) falha apenas numa _regressão_ versus a linha de base verificada e rejeita medições em falta quando necessário. Diferentes semânticas — descartando `audit:deps` perderiam a porta crítica absoluta e os recibos de auditoria de pacote independente. Mantenha ambos.
- **Detecção de ciclo** — ✅**DONE** (#15159 G-01/G-02). O texto antigo aqui chamava `check:cycles` “o portão verde e com curadoria” e justificava mantê-lo bloqueado porque `check:circular-deps` (dpdm) reportou 91 ciclos. Esse verde era um** verde falso** : `check:cycles` varreu 5 subdiretórios (450 ficheiros), correspondeu apenas `import|export … from` estático e eliminou todos os especificadores `@/` e `@omniroute/open-sse/`, pelo que não foi possível ver os ciclos de alias + de importação dinâmica que dominavam o repositório. Corrigido: o portão agora percorre `src` + `open-sse` (5023 ficheiros), recolhe especificadores do TypeScript AST (portanto, `import("…")` conta e posição de tipo `typeof import("…")` não) e resolve tsconfig `paths`. Ele encontra** 14** ciclos, e não 0. Como 14 ciclos pré-existentes não podem ser fixados numa porta PR, `check:cycles` é agora um** catraca** (`--ratchet`, `metrics.cycles.value = 14` tecto em `quality-baseline.json`, `direction: down`) — bloqueia qualquer _regressão_ e a contagem só pode cair. CI executa `npm run check:cycles:ratchet`. Passeios incendiados com**A-01** . `check:circular-deps` (dpdm) continua a ser consultivo como uma segunda opinião mais ampla.
- **Complexidade** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): uma caminhada ESLint, conta por ruleId para que as linhas máximas ciclomáticas + e as linhas de base cognitivas permaneçam independentes; `check:complexity` / `check:cognitive-complexity` individuais permanecem para `--update` local.
- **`/api` anti-alucinação** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): um inventário FS de `src/app/api`, as rotas openapi + docs-symbols ainda reportam de forma independente; os indivíduos permanecem para as corridas locais.
- **`check:node-runtime` é executado em 11 empregos** — ⚠️** ROI baixo.** Cada um é um corredor separado e a verificação é < 1s; poupança total ~ 10s, contra a perda de um guarda barato por trabalho. Não vale a pena a agitação.
- **`typecheck:noimplicit:core` em CI lint** — ✅** removido do trabalho lint** (foi consultivo `continue-on-error`); a superfície do tipo de bloqueio é `typecheck:core` + `check:type-coverage`. Script local mantido.

### Inverter/decidir (política da operadora)

- `check:openapi-security-tiers` (consultivo) — ❌**NOT perfeitamente inversível.** Sai de 0, mas avisa que várias rotas `traffic-inspector` sob `LOCAL_ONLY_API_PREFIXES` não têm a anotação `x-loopback-only: true`. Aplicá-lo requer primeiro adicionar estas anotações ao `openapi.yaml`.
- `typecheck:noimplicit:core` (consultivo) — amplamente incluído na roquete de bloqueio `check:type-coverage`. Vire para um roquete ou solte a segunda passagem `tsc` redundante.
- `test:vitest:ui` (agora** bloqueando** ) as falhas pré-existentes — são explicitamente excluídas no `vitest.config.ts` com comentários de rastreio `// #8618` ; novas falhas falham no trabalho.
- `check:secrets` (gitleaks, catraca de bloqueio congelada em 3 falsos positivos documentados) — lista de permissão os 3 para chegar a 0 ou rebaixar para consultivo. Sobrepõe-se à verificação de segredo nativa GitHub + `check:public-creds`.
- `check:pr-evidence` (bloqueio, greps PR-body prosa) — alto risco de falso-positivo; enfraquece a aplicação da Hard Rule #18 se for abandonada, pelo que esta é uma decisão política genuína.
- `semgrep` (consultivo independente) — sobrepõe-se CodeQL para as famílias OWASP ; ligue a sua linha de base a uma roquete ou queda.

---

## Documentação relacionada

- Cadeia de fornecimento (proveniência, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — controlo da paridade dos conjuntos de chaves

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, tarefa `i18n-ui-coverage`).
Compara o conjunto de chaves terminais de cada `src/i18n/messages/<locale>.json` com `en.json` e falha
perante qualquer chave terminal em falta ou adicional, independentemente de quando a chave foi adicionada. Os marcadores de posição `__MISSING__:`
contam como presentes (o respetivo conteúdo é da responsabilidade do controlo de proporção). É o complemento absoluto
dos dois controlos baseados em diferenças/percentagens: `check-ui-keys-coverage` impõe um mínimo de 80 % por
idioma (43 chaves em falta entre ~13 000 ainda resultam em 99,7 %) e `check-new-key-coverage` avalia
apenas as chaves que um PR adiciona a `en.json`. Um lote de idiomas é gerado a partir do `en.json` do dia
em que o respetivo ramo é criado e é traduzido durante vários dias, enquanto a base continua a receber chaves; o PR do lote não adiciona
qualquer chave por si só, pelo que ambos os controlos relacionados permaneceram silenciosos quando o lote 1 (#13044) foi integrado com menos 43 chaves em nove
idiomas e o lote 2 (#13660) com menos 10 chaves em oito (2026-09-15). Corrija uma falha com
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; uma chave terminal `extra`
significa que foi removida da origem — elimine-a do idioma. `--warn` comunica o problema sem provocar uma falha.
`--catalog=cli` executa a mesma comparação em `bin/cli/locales` (`npm run i18n:check-keys:cli`);
ambos os passos fazem parte da tarefa `i18n-ui-coverage`.

#### `check-new-key-coverage` — controlo de i18n para novas chaves

Controlo relacionado com `check-ui-value-drift`. Este último deteta um valor em inglês que foi **reescrito**
sem que as respetivas traduções fossem atualizadas; este deteta uma chave em inglês que foi **adicionada**
sem que alguns idiomas alguma vez a tenham recebido.

`check-ui-keys-coverage` não consegue detetar esta categoria: impõe um mínimo percentual por idioma, e
onze chaves em falta entre ~13 000 deixam a cobertura nos 99,9%. Uma percentagem por idioma não consegue
exprimir «esta funcionalidade foi disponibilizada sem tradução» — uma funcionalidade inteira pode ser integrada num novo idioma sem qualquer
texto e sem nunca alterar esse número.

O incidente que este controlo codifica: a Fase 3 do Orchestration Canvas traduziu as suas onze chaves para
os 42 idiomas existentes na altura. Horas mais tarde, o lote de idiomas da UE (#13044) aumentou o repositório
para 51 idiomas, e os nove recém-chegados (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) nunca
as receberam. `deepMergeFallback` substitui por inglês uma chave em falta, pelo que o modo de falha era
uma IU não traduzida, em vez de uma IU vazia — um problema real e silencioso por definição.

Tal como o controlo relacionado, este é **sensível às diferenças**, comparando o inglês no ponto de base da integração com a árvore
de trabalho, pelo que as lacunas preexistentes permanecem congeladas e não foi necessária qualquer migração para ativar o controlo.

**Um marcador `__MISSING__:<english>` não satisfaz este controlo (desde 2026-09-17).** Era anteriormente o
adiamento documentado — durante a execução é usado o inglês correto como alternativa — até oito PRs de funcionalidades, em
2026-09-16, terem adicionado 61 chaves e aplicado o marcador em todos os 65 idiomas em vez de as traduzirem: este
controlo aceitou todos os casos, nada bloqueou os PRs, e o controlo bloqueante da proporção de traduções reais
falhou depois na ponta da versão para todos (pt-BR 3,2 % > 2,5 % + 0,5). Um marcador é agora tratado
como uma tradução em falta. Corrija uma falha com
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, ou
todos os idiomas em paralelo com `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
seguro em modo desacoplado, recusa iniciar sem as variáveis de ambiente `OMNIROUTE_TRANSLATION_*`). Uma chave que tenha de permanecer
em inglês (o nome fixo de um produto/motor/sinalizador) deve constar de `scripts/i18n/untranslatable-keys.json`,
nunca ficar atrás de um marcador. `vi` proíbe totalmente os marcadores (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — controlo de testes suspensos

Um ficheiro na lista `exclude` de `vitest.config.ts` é um teste que não é executado e parece
cobertura para quem consulta a árvore. Acumularam-se sessenta e dois ficheiros atrás do comentário
`// #8618 — pre-existing failure; remove this exclusion when fixed`. O problema #8618 foi encerrado em
2026-08-11, enquanto a lista que acompanhava cresceu de 45 entradas para 62, tendo cada nova entrada herdado um comentário
que remetia para um problema encerrado. Quando a lista foi finalmente medida ficheiro a ficheiro (#13204), **51 dos 62
passaram na árvore atual sem qualquer alteração ao código-fonte**.

O controlo exige que cada exclusão que corresponda a um ficheiro real (a) indique um problema de acompanhamento e
(b) conste de `config/quality/vitest-exclusions.json` com o respetivo estado medido, para que adicionar uma seja
uma diferença passível de revisão num ficheiro dedicado, em vez de apenas mais uma linha numa matriz com 60 entradas. Deliberadamente,
não volta a executar os testes excluídos — isso demora ~10 minutos e deve ser feito numa tarefa periódica; o
inventário regista quando cada um foi medido pela última vez.
