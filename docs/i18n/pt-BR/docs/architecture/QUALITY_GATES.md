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

### Admissão da candidata

Os workflows CI e Quality Gates emitem, cada um, um veredito estável: `Gate / CI` e
`Gate / Quality`. A política versionada de admissão classifica cada job anterior como
obrigatório ou consultivo. Um job obrigatório aplicável precisa terminar com sucesso:
resultados ausentes, cancelados, ignorados, pendentes ou desconhecidos não estabelecem
PASS. Uma classificação válida como alteração somente de documentação ou somente de
catálogo pode tornar uma etapa de código inaplicável; uma PR comum em rascunho não é
uma candidata admitida. O rótulo `hotfix` não dispensa evidências.

Ambos os workflows cobrem PRs destinadas à main ou às branches de release, pushes para
`main`, disparos manuais e eventos de grupo de merge. Push, disparo manual e grupo de
merge executam a seleção completa. Uma PR em rascunho da fila Mergify confiável também
executa os jobs aplicáveis `full-code` e `full-code-e2e`; PRs comuns não os executam.
Antes de um merge manual, dispare a seleção completa para a candidata exata. Pushes para
`release/**` não iniciam esses workflows; Release-Green observa a base integrada
separadamente (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks e grupos de merge usam
runners hospedados nos jobs que, em outros casos, selecionam runners próprios; é preciso
verificar a capacidade disponível nos runners hospedados antes da ativação.

Uma PR comum executa a seleção rápida. As etapas `full-code` e `full-code-e2e` da política
de admissão (E2E, integração, artefato do pacote, smoke do Electron, Bun SQLite,
ecossistema e clientes de protocolo) executam somente em um rascunho da fila Mergify ou
em uma execução completa: `gh workflow run ci.yml --ref <branch>`.

Cada recibo JSON identifica o SHA obtido pelo checkout, a execução do workflow e a
tentativa. A CLI rejeita divergência entre o SHA do checkout e o SHA do evento. Os testes
dos workflows vinculam os jobs da política à lista `needs` do job de veredito, para que
a adição ou remoção de uma etapa não passe despercebida. Os recibos cobrem o próprio
workflow, não a publicação, a implantação ou a implementação interna de um scanner
consultivo existente. Tornar os checks aplicáveis obrigatórios nas regras de proteção
da branch exige uma alteração administrativa separada; definir os jobs não protege a
branch por si só.

`API Route Typecheck` é um check de workflow independente, fora dos dois vereditos
agregados e do perfil estático completo do observador local. Confira seu resultado
separadamente para a candidata exata. `.github/workflows/api-route-typecheck.yml`
executa em PRs destinadas a `main` ou `release/**`, pushes para essas branches, disparos
manuais e eventos `merge_group` do tipo `checks_requested`. Não há filtro de caminhos.
Grupos de merge fazem checkout de `merge_group.head_sha`; os demais eventos usam
`github.sha`. Todos os eventos executam o mesmo gate de diagnósticos de API e seus testes
unitários. Alterar a branch de destino de uma PR solicita um novo check; editar o corpo
ou título usa o nome `Admission not requested / API Route Typecheck`, somente para
observação, e não substitui o check de admissão.

### Evidências retidas no redutor de aceitação

`scripts/quality/validate-release-acceptance.mjs` reduz um plano fornecido e seus
manifestos; ele não estabelece que o plano abrange todo o pipeline de release.
Seus relatórios definem explicitamente `releaseAcceptance: false`, mesmo quando esse plano está
`VERIFIED`. O workflow `release-acceptance.yml` ainda usa fixtures simuladas, e não
recibos reais de build, pacote, inicialização ou promoção.

A CLI exige `--evidence-root` para verificar as evidências retidas. Os arquivos são resolvidos
como `<evidence-root>/<artifact_id>/<member>` e têm o hash calculado como SHA-256. Um registro PASS
sem evidências, um arquivo ausente ou alterado, um caminho inseguro ou um link simbólico impede
a verificação. Arquivos ausentes não equivalem a logs vazios e bem-sucedidos. As verificações
existentes de SHA/execução/tentativa permanecem independentes: bytes correspondentes não podem validar um
recibo obsoleto. A integridade do arquivo não comprova a autenticidade da execução nem a promoção do artefato.

### DAST consome o build de CI verificado

O job obrigatório `dast-smoke` da CI chama `.github/workflows/dast-smoke.yml` após `build`. Ele segue a mesma seleção de código/rascunho do build, incluindo PRs de forks compatíveis, PRs destinados à release e grupos de merge. Um job DAST ausente, com falha, cancelado ou inesperadamente ignorado bloqueia `Gate / CI`. O workflow reutilizável não possui gatilho independente de PR/disparo manual; a validação manual usa o disparo da CI para manter o build e o consumidor na mesma execução.

`scripts/ci/next-build-provenance.mjs` sela o artefato Next completo com seu digest do tar, repositório/evento/execução, tentativa do produtor, head/base/checkout/tree, identidades de workflow, lockfile, versão exata/ABI do Node, plataforma e bundler. DAST seleciona o ID imutável do artefato em `needs.build.outputs`, exige a verificação do digest do download e calcula independentemente o hash do ZIP para compará-lo ao digest do produtor antes de extrair seus dois membros permitidos por meio de `scripts/ci/unpack-ci-build.py`. O manifesto e o arquivo tar também precisam corresponder às saídas independentes do produtor antes da extração da árvore Next. Ele nunca procura o último build bem-sucedido da branch. Uma reexecução parcial pode reutilizar aquela mesma tentativa do produtor quando seu ID e todas as entradas ainda correspondem; o recibo registra ambas as tentativas.

O consumidor permanece em um runner Linux hospedado, com permissão de repositório somente de leitura e sem segredos do repositório. Ele instala a versão exata do Node do produtor e monta a CLI com `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` rejeita a ausência de um servidor standalone antes de qualquer build de fallback; builds locais normais da CLI mantêm o fallback existente. A prontidão do servidor, Schemathesis e promptfoo precisam todos ter sucesso dentro do limite inalterado de 25 minutos do job. Um recibo de proveniência comprova a identidade das entradas e os bytes, não uma varredura DAST bem-sucedida. Expiração do artefato, interrupção do runner ou falha do scanner continuam sendo evidências incompletas ou de falha; não podem virar PASS por meio de um wrapper consultivo.

### Capacidade de execução da UI

A CI executa todo o inventário de UI em quatro shards da matriz `test-vitest`, cada um com no máximo
dois workers por shard e o prazo existente de 15 minutos por job. O primeiro shard também executa a
suíte Vitest de MCP/autoCombo. O resultado do job obrigatório abrange todas as instâncias da matriz; a falha
ou o cancelamento de um shard impede o estabelecimento da admissão do candidato.

O observador noturno mantém um recibo separado do candidato exato para cada shard de UI,
incluindo a execução do MCP no primeiro recibo. Todos os quatro recibos, logs e identidades
de execução correspondentes são obrigatórios. O comando local `npm run test:vitest:ui` ainda seleciona a
suíte completa; uma execução com `--shard` constitui apenas evidência parcial.

### Coleta de cobertura de testes unitários

Os doze shards de testes unitários coletam cobertura V8 durante a execução existente dos testes. Um shard
bem-sucedido executa `scripts/ci/compact-v8-coverage.mjs` para compactar os arquivos originais sem gerar
um relatório Istanbul intermediário. O job final Coverage verifica todos os doze manifestos em relação
ao SHA do candidato, ao runtime, à raiz do código-fonte e aos hashes dos dados; em seguida, executa os reporters do c8 e os
limites existentes de cobertura. As entradas preservam a ordem global de nomes de arquivos do c8; a pré-mesclagem por shard não é segura
para cobertura mista de funções/blocos. Shards ausentes, malformados ou incompatíveis fazem a admissão
falhar. Shards de testes que falharam retêm separadamente a cobertura bruta de diagnóstico; ela não pode entrar na mesclagem final.

### Recibos de progresso da execução de testes unitários

O comando compartilhado `test:unit:ci:shard` registra as fases `primary`, `dashboard` e `serial`
por meio de `scripts/ci/unit-progress-reporter.mjs`. O relatório normal de testes continua
disponível. Um recibo separado, contendo apenas metadados, registra o início e a conclusão
de cada arquivo, e um sinal de atividade a cada 30 segundos lista os arquivos que ainda estão
ativos e o tempo decorrido. Ele registra apenas metadados de execução incluídos na lista de
permissões; descrições de testes, saída, conteúdo de erros e o ambiente completo não são serializados.

O CI mantém os arquivos JSONL como `unit-progress-ci-<run>-<attempt>-<shard>`. Um tempo limite do job pode impedir o upload
posterior; os sinais de atividade já emitidos permanecem como evidência para diagnóstico.
A ausência de sinais de atividade também pode indicar um processo do runner bloqueado ou
encerrado. Esses recibos preservam a seleção de testes, a simultaneidade, os prazos e o status
de saída existentes; eles não são veredictos de admissão de candidatos.

### Fila de merge

O label `queue` envia um PR para a fila do Mergify (`.mergify.yml`). O Mergify abre um PR em
rascunho em uma branch `mergify/merge-queue/`, a CI executa a seleção completa nela e o PR
original recebe merge quando `Gate / CI`, `Gate / Quality` e
`Merge integrity (changelog + generated skills)` passam.

O Mergify grava o resumo da fila na descrição do rascunho, e outros aplicativos também podem
editá-la. Um evento `pull_request` `edited` em um rascunho desse tipo recebe seu próprio grupo
de concorrência (`-queue-edit-<run_id>`), para que não possa cancelar a execução real do
rascunho, e ignora o gate e a matriz. Apenas `Merge integrity` continua sendo executado. O job
de gate ignorado tem um nome de check diferente, porque o Mergify interpreta um
`Gate / CI` ignorado como um check com falha e remove o PR da fila.

Após a remoção da fila, um push nem sempre recoloca o PR na fila. Comente
`@mergifyio queue` nele.

### Inventário de análise estática

O inventário versionado de aliases npm e a participação na análise estática ficam em
`config/quality/gate-manifest.json`. Execute `npm run check:gate-manifest` para validar
os nomes dos scripts e os comandos exatos em relação ao `package.json`; adições, remoções e
alterações de comandos fazem falhar tanto o hook local quanto os jobs de classificação de alterações na CI.
Um alias não é um job de workflow, uma instância de matriz ou um caso de teste: essas contagens não devem
ser apresentadas como intercambiáveis.

Use `npm run quality:scan -- --list` ou `npm run quality:scan:fast -- --list`
para inspecionar os aliases selecionados sem executá-los. O runner invoca o
entrypoint npm, de modo que seu runtime (incluindo Bun quando configurado) seja preservado.
O manifesto registra os aliases fora desses perfis como invocados separadamente, e
comandos de manutenção são proibidos em perfis de análise somente leitura.

Esses perfis abrangem apenas a análise estática. Eles não certificam testes do produto,
cobertura, empacotamento, verificações externas ou a aceitação completa de release de um candidato.
A admissão pelo workflow usa o `config/quality/admission-policy.json` vinculado e
`scripts/quality/admission-verdict.mjs`. Os perfis do observador de release permanecem separados;
inspecione de forma independente as verificações e os recibos aplicáveis. Os comandos estáticos do observador
completo são declarados em `config/quality/release-green-static-profile.json`, incluindo
`audit:deps`, a seleção de testes de mutação e as verificações de tradução. O loader valida os comandos npm
em relação ao package.json e às declarações modeladas de CI/Quality; ele rejeita divergências
em vez de executar tokens de shell como argumentos. A saída SKIP/INCOMPLETE de scanners obrigatórios
não pode estabelecer PASS. O perfil registra suas exclusões externas e não substitui
evidências hospedadas de cobertura, matrizes de testes, pacotes ou implantação. O inventário textual abaixo
é uma referência, não uma prova de que um gate foi realmente executado.

Os scripts ficam em `scripts/check/` (gates de política) e `scripts/quality/` (mecanismo de ratchet).
A fonte da verdade da CI é `.github/workflows/ci.yml`.

### Integridade da documentação base publicada

O `.github/workflows/i18n-base-health.yml` monitora a integridade da documentação após pushes selecionados para `main` e `release/v*` e em acionamentos manuais. Seus filtros abrangem a documentação, arquivos Markdown na raiz, `llm.txt`, o estado e a configuração das traduções e as ferramentas de i18n relevantes. O único job `Published base documentation health` usa o Ubuntu hospedado e tem um prazo limite de cinco minutos. Ele executa uma validação somente leitura e grava um recibo de diagnóstico sem instalar dependências, traduzir ou adotar estados.

O `scripts/i18n/check-base-health.mjs` exige que não haja inconsistências de hash de origem, destino ausente, hash de destino, tradução desatualizada nem cache de seção. Ele também valida o escopo atual de documentos/idiomas principais e sua proveniência registrada. Um contexto inválido, uma cobertura incompleta ou uma interrupção do verificador produz `INCOMPLETE`; um desvio confirmado produz `FAIL`. Ambos retornam um status de saída com falha. O recibo é vinculado ao SHA do checkout, ao workflow, à execução e à tentativa, e é retido como `i18n-base-health-<sha>-<run>-<attempt>`.

Esta é uma observação independente da base publicada. Ela não adiciona um evento de PR ou grupo de merge, uma verificação obrigatória de PR, um alias npm nem um membro de perfil de varredura estática. A política diferencial existente para PRs e as classificações consultivas do verificador subjacente permanecem separadas. Um upload bem-sucedido não pode transformar um resultado de integridade com falha em PASS.

### Liberar caminho rápido PR (`quality.yml`)

`.github/workflows/quality.yml` complementa CI em main/release PRs, envia para `main`, despacha e mescla grupos. PRs usa verificações rápidas filtradas por caminho. A compilação duplicada permanentemente desativada foi removida; as verificações reais build/package/boot permanecem em CI. O conjunto de unidades e o vitest são executados apenas em CI (`Unit Tests (N/8)` e `Vitest`).

| Trabalho                                         | Escopo                                                                                                                                                                                                                                         | Bloqueio              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs e docs-all                                                                                                                                                                                                        | Sim                   |
| `Fast Quality Gates`                             | Código PRs; verificações estáticas, verificação de tipo, verificação de tipo de painel, testes de unidade impactados                                                                                                                           | Sim                   |
| `Forgotten sibling tests`                        | Código PRs; módulos alterados rastreados para consumidores estáticos e testes de irmãos candidatos; os caminhos barril e de importação dinâmica são relatados como diagnósticos consultivos, com exceções de lista de permissões referenciadas | **Consultivo**        |
| `No new ESLint warnings`                         | Código PRs; protetor de fiapos com reconhecimento de supressão                                                                                                                                                                                 | Sim, incluindo garfos |
| `Merge integrity (changelog + generated skills)` | PRs sem rascunho; changelog e sincronização de habilidades geradas                                                                                                                                                                             | Sim, incluindo garfos |

#### Relatório de testes de irmãos esquecidos

`npm run check:forgotten-sibling-tests` é executado como uma etapa consultiva do `Fast Quality Gates` e reutiliza o resolvedor de importação por trás do mapa de impacto de teste. Para cada módulo de produção alterado, ele relata cadeias `changed module/symbol -> static consumer -> candidate sibling test` determinísticas quando o teste candidato está ausente da comparação de solicitação pull. O resumo do Markdown e o resultado JSON são mantidos como o artefato do fluxo de trabalho `forgotten-sibling-tests` para calibração antes de qualquer implementação de bloqueio.

As reexportações de barril e as importações dinâmicas são apenas diagnósticos de resolução; eles nunca criam uma descoberta bloqueadora. As exceções revisadas residem em `config/quality/forgotten-sibling-allowlist.json`. Cada entrada deve nomear o teste do consumidor e do candidato, fornecer uma justificativa específica e vincular um problema GitHub ou solicitação pull. Entradas malformadas falham no fechamento. As exceções não podem suprimir um teste candidato excluído ou uma comparação que adiciona `.skip`/`.todo`; o enfraquecimento de asserções e outros mascaramentos permanecem pertencentes ao portão `check:test-masking` de bloqueio independente.

### Tarefa: `lint`

É executado em cada PR para `main`. Bloqueia o merge em caso de falha.

| Script (`npm run ...`)            | Valida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Bloqueante                                  |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | A versão do Node.js está dentro do intervalo compatível                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sim                                         |
| `check:cycles`                    | Importações circulares em todo o `src/` + `open-sse/` (baseado em AST, com `paths` do tsconfig resolvidos). A execução direta retorna o código 1 sempre que existe algum ciclo (falha por padrão desde a #15281) e lista os SCCs. `check:cycles:ratchet` (o que a CI executa) bloqueia quando a contagem excede o limite de `metrics.cycles` em `quality-baseline.json` — atualmente 14, `direction: down`, portanto, ele só pode diminuir (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Sim (ratchet)                               |
| `check:boundary`                  | Acoplamento de `open-sse → src`: importações exclusivas de arquivo para arquivo do mecanismo para o aplicativo (`scripts/quality/measure-boundary.mjs`; a lista de arestas é o backlog de correção da divisão entre núcleo e módulos da v4). Execução direta = relatório consultivo (igual a `quality:boundary`). `check:boundary:ratchet` (o que a CI executa, também no loop ratchet de verificações rápidas do `quality.yml`) bloqueia quando a contagem excede o limite de `metrics.boundaryOpenSseToSrc` em `quality-baseline.json` — inicializado com o valor medido de 771, `direction: down`; `--update` apenas o reduz; relativo à base em PRs (`--base-ref`, veja abaixo)                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Sim (ratchet)                               |
| `check:route-validation:t06`      | Esquemas Zod presentes em todas as rotas (política do Nível 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sim                                         |
| `check:any-budget:t11`            | A contagem de `@ts-expect-error // any` não excede o orçamento (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Sim                                         |
| `check:provider-consistency`      | Cada provedor em `providers.ts` tem uma entrada correspondente em `providerRegistry.ts` (e vice-versa, dentro da lista de permissões)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sim                                         |
| `check:model-lifecycle`           | As três tabelas de roteamento mantidas manualmente permanecem consistentes com o snapshot de ciclo de vida versionado (#11503): `FITNESS_TABLE` (`taskFitness.ts`) não pontua nenhum id descontinuado que `REGISTRY` possa rotear; cada destino de `BUILT_IN_ALIASES` está presente em `REGISTRY` e ausente do snapshot de ids descontinuados; cada id descontinuado ainda presente em `REGISTRY` é encaminhado ou listado em `allowedRetiredInCatalog`; e nenhuma origem ou destino de `DEFAULT_DEGRADATION_MAP` aparece como descontinuado nesse snapshot. Isso não comprova que um modelo esteja sendo disponibilizado atualmente por um upstream ativo. Offline — compara com `config/quality/model-lifecycle.json`, atualizado manualmente com `npm run quality:refresh-model-lifecycle` (rede; não integrado à CI). `allowedRetiredInCatalog` é uma catraca de redução progressiva: adicione uma entrada somente com uma issue de acompanhamento.                                                                                                                                                                                                        | Sim                                         |
| `check:fetch-targets`             | Cada `fetch("/api/...")` no `src/` do lado do cliente resolve para um `route.ts` real                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sim                                         |
| `check:deps`                      | Todas as dependências instaláveis via `npm install` em cada `package.json` do repositório estão em `dependency-allowlist.json`; pacotes novos sem versão fixada ou com nomes que podem resultar de slopsquatting são sinalizados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Sim                                         |
| `audit:deps`                      | Auditoria npm de todos os cinco lockfiles independentes (raiz, Electron, plugins OpenCode v1/v2 e provedor). Avisos críticos bloqueiam; avisos de alta gravidade permanecem visíveis como advertências. Auditorias ausentes/com falha são marcadas como INCOMPLETAS e bloqueiam; hashes de lock e relatórios por escopo são mantidos.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sim                                         |
| `check:lockfile`                  | Integridade do `package-lock.json` — registro https, hashes de integridade, sem substituições de host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sim                                         |
| `check:licenses`                  | Lista de permissões de licenças SPDX para dependências de produção                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sim                                         |
| `check:tracked-artifacts`         | Sem artefatos de build / links simbólicos de `node_modules` versionados (também executado no pre-commit do husky; o pre-push é intencionalmente leve — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Sim                                         |
| `check:ai-attribution`            | Sem trailer `Co-Authored-By` de IA/bot nem rodapé de geração por IA nos commits, no título ou no corpo do PR — Regra Rígida nº #16 (no loop de verificações rápidas de `quality.yml` para PR→`release/**` — lê o payload do evento e não executa nenhuma operação fora de PRs — e em uma etapa exclusiva para PRs no lint de `ci.yml` para PR→`main`; também no hook `commit-msg` do husky; coautores humanos são permitidos; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:vitest-exclusions`         | Cada exclusão do Vitest menciona uma issue de acompanhamento e aparece em `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sim                                         |
| `check:file-size`                 | Arquivos-fonte (`.ts`/`.tsx` em `src/`, `open-sse/`, `electron/`, `bin/`) permanecem dentro de `cap`, e arquivos de teste (`*.test.ts(x)`), dentro de `testCap`; arquivos congelados em `file-size-baseline.json` (`frozen` / `testFrozen`) não devem ultrapassar o tamanho registrado                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Sim                                         |
| `check:error-helper`              | As respostas de erro em executores/handlers usam `buildErrorBody()` / `sanitizeErrorMessage()` (Regra Rígida nº #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Sim                                         |
| `check:migration-numbering`       | Os arquivos SQL de migração são numerados sequencialmente, sem lacunas ou duplicatas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Sim                                         |
| `check:public-creds`              | Nenhum `client_id`/`client_secret` literal do OAuth ou chaves Web do Firebase fora de `publicCreds.ts` (Regra Rígida nº #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sim                                         |
| `check:db-rules`                  | Nenhum SQL bruto fora dos módulos de `src/lib/db/`; nenhuma importação agregadora de `localDb.ts` (Regras Rígidas nº #2/nº #5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sim                                         |
| `check:known-symbols`             | Os executores de provedores, as estratégias de roteamento e os tradutores registrados em suas tabelas de despacho correspondem aos arquivos no disco — sem símbolos órfãos ou não declarados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sim                                         |
| `check:route-guard-membership`    | Toda rota que inicia um processo filho é classificada por `isLocalOnlyPath()` (Regras Rígidas nº #15/nº #17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sim                                         |
| `check:test-discovery`            | Cada arquivo `*.test.ts` / `*.spec.ts` no repositório é coletado por pelo menos um executor de testes (ratchet: a lista de órfãos em `test-discovery-baseline.json` só pode diminuir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sim                                         |
| `check:test-tla-order`            | Nenhum arquivo `node:test` em `tests/unit` registra um teste, encontra um `await` no nível superior e depois registra mais testes (#18045; ratchet: `test-tla-order-allowlist.json` só pode diminuir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sim                                         |
| `check:agent-skills-sync`         | Os artefatos gerados de habilidades de agente correspondem ao catálogo de origem (sem divergências)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:provider-asset-provenance` | Os logotipos/recursos dos provedores têm uma entrada de proveniência registrada                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `lint:json`                       | Os arquivos de configuração JSON são analisados e atendem às regras de lint do repositório                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `typecheck:core`                  | Compilação do TypeScript sem erros (apenas avisos informativos)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sim                                         |
| `typecheck:noimplicit:core`       | `noImplicitAny` estrito — voltado para o futuro; muitos pontos de chamada preexistentes ainda precisam de anotações                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | **Informativo** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` com escopo limitado a `src/app/(dashboard)/**` (#7033) — a lista de permissões selecionada de 27 arquivos de `typecheck:core` não inclui nenhum TSX do dashboard, e `next build` também nunca realiza a verificação de tipos nele (`next.config.mjs` define `ignoreBuildErrors: true`), portanto, regressões de identificadores órfãos nessa área (#6625/#6909) não eram detectadas pela CI. Compara as diferenças com uma linha de base congelada de contagem por arquivo/por código TS (`config/quality/dashboard-typecheck-baseline.json`, seguindo o mesmo padrão de imposição contra obsolescência de `check:known-symbols`) — somente NOVOS erros além da contagem registrada na linha de base fazem o gate falhar; reduza gradualmente a linha de base com `--update` quando um erro preexistente for corrigido.                                                                                                                                                                                                                                                                                                                                  | Sim                                         |
| `check:build-typecheck`           | Verificação de tipos de produção do aplicativo inteiro sobre `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), que não são abrangidos pela lista de permissões de 27 arquivos de `typecheck:core` nem pelo gate do dashboard. Compara as diferenças com `config/quality/build-typecheck-baseline.json`; uma contagem nova ou maior por (arquivo, código) faz a verificação falhar, enquanto uma contagem menor solicita que você reduza a linha de base. `--update` recusa-se a prosseguir enquanto a execução contiver um par novo ou aumentado, a menos que `--force-regressions` seja passado, e recusa um arquivo recém-silenciado, a menos que `--force-nocheck` seja passado; assim, ampliar a linha de base para obter uma execução verde e conceder um silenciamento permanente são dois atos deliberados separados. Um `--force` isolado é rejeitado. Também verifica o escopo da compilação em busca de `@ts-nocheck` comparando com `config/quality/ts-nocheck-baseline.json`, porque um arquivo que o utiliza não reporta nenhum diagnóstico e, de outro modo, ficaria invisível para todos os gates. | Sim                                         |

#### Dois programas de verificação de tipos respondem de forma diferente

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) e `check:build-typecheck` compilam programas diferentes sob opções
diferentes, e o mesmo arquivo pode estar limpo em um e cheio de erros no outro.

`tsconfig.build.json` define `"strict": false`, portanto `noImplicitAny` está desativado. A configuração principal compila uma lista de permissões selecionada de 27 arquivos com opções mais rigorosas e segue o grafo de importações de cada entrada, portanto arquivos que nunca aparecem no programa de compilação ainda são verificados ali.

A consequência é importante ao avaliar se um arquivo está tipado: **zero diagnósticos
em `check:build-typecheck` não significa zero**. Remover `@ts-nocheck` de 26
arquivos mostrou que 23 deles estavam limpos no programa de compilação; dezesseis
desses apresentaram cerca de 120 erros de any implícito no programa rigoroso. Verifique ambos antes de considerar um arquivo limpo.

### Tarefa: `quality-gate`

É executado após `test-coverage`. Bloqueia o merge em caso de falha.

| Script                       | Valida                                                                                                                                                                | Bloqueante             |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `quality:collect`            | Gera `quality-metrics.json` (contagem de avisos do ESLint, cobertura obtida do relatório consolidado dos shards)                                                      | Sim (antes do ratchet) |
| `quality:ratchet`            | Cada métrica em `quality-baseline.json` não regrediu (avisos do ESLint ≤ linha de base; cobertura ≥ linha de base)                                                    | Sim                    |
| `check:duplication`          | A duplicação de código (jscpd@4) não excede a linha de base em `quality-baseline.json`                                                                                | Sim                    |
| `check:complexity`           | A complexidade ciclomática no nível de arquivo não excede o limite (`complexity` + `max-lines-per-function` do ESLint principal)                                      | Sim                    |
| `check:cognitive-complexity` | Ratchet de complexidade cognitiva (`eslint-plugin-sonarjs`) — execução separada do ESLint; a CI executa ambos consolidados na única etapa `check:complexity-ratchets` | Sim                    |
| `check:dead-code`            | O ratchet de exports/arquivos não utilizados (knip) não regride em relação à linha de base                                                                            | Sim                    |
| `check:compression-budget`   | Orçamento do benchmark de compactação — os limites mínimos de economia de tokens por mecanismo não podem regredir                                                     | Sim                    |
| `check:type-coverage`        | O ratchet de percentual tipado (`type-coverage`) não regride; em grande parte, substitui `typecheck:noimplicit:core`                                                  | Sim                    |

### Jobs: `codeql-scan` e `codeql-admission`

`codeql-scan` produz todas as categorias de análise configuradas. Depois que esse job tem sucesso, `codeql-admission` valida seus uploads exatos e a ratchet de alertas da candidata. Ambos são dependências obrigatórias de `Gate / CI`, inclusive para candidatas que alteram somente documentação. Os requisitos de ativação administrativa e canary estão descritos em "Ratchet do CodeQL" abaixo.

| Script                 | Valida                                                                                                                                                                                                                               | Bloqueante |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `check:codeql-ratchet` | A ref/SHA da candidata e todas as categorias de análise configuradas precisam estar atualizadas antes da ratchet de alertas; evidências ausentes bloqueiam. O inventário global permanece separado — veja "Ratchet do CodeQL" abaixo | Sim        |

### Job: `quality-extended`

O job bloqueia os candidatos aplicáveis. O tamanho do bundle, as detecções de segredos, as
detecções de vulnerabilidades, as detecções de workflow e as alterações de OpenAPI são
verificados com ratchets obrigatórios. Os diagnósticos de dependências circulares permanecem
apenas informativos. A instalação dos scanners é obrigatória:
`scripts/ci/install-quality-scanners.sh` provisiona versões fixadas e propaga
falhas de instalação. Ferramentas ausentes, relatórios inválidos ou linhas de base ausentes
deixam o gate obrigatório do scanner INCOMPLETO.

| Script                   | Valida                                                                                                                                                                                                                                   | Bloqueio                                                 |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `check:circular-deps`    | Ausência de dependências circulares (dpdm)                                                                                                                                                                                               | **Consultivo**                                           |
| `check:bundle-size`      | O tamanho do bundle não excede o limite; uma medição indisponível causa falha                                                                                                                                                            | **Bloqueante com --ratchet**                             |
| `check:secrets`          | As detecções do Gitleaks não apresentam regressão; verificações obrigatórias rejeitam ferramentas/fontes/baselines ausentes, verificações com falha e relatórios inválidos                                                               | **Bloqueante com --ratchet**                             |
| `check:vuln-ratchet`     | As vulnerabilidades das dependências não apresentam regressão; verificações obrigatórias rejeitam ferramentas ausentes, relatórios inválidos ou baselines ausentes                                                                       | **Bloqueante com --ratchet**                             |
| `check:workflows`        | Lint de workflows (actionlint + zizmor); scanners ausentes/com falha, relatórios inválidos ou baseline de ratchet ausente resultam em INCOMPLETE. Detecções válidas seguem a política estrita/consultiva/ratchet selecionada             | Execução obrigatória; ratchet do zizmor bloqueante na CI |
| `check:openapi-breaking` | Contrato da API pública comparado aos commits de evento fixados (merge-base do PR, estado anterior ao push, base do grupo de merge; em execução agendada/manual, primeiro pai do checkout); a medição obrigatória falha de forma fechada | **Bloqueante com --ratchet**                             |

### Job: `docs-sync-strict`

Para pull requests destinados a `main` ou `release/**`, este job só é executado para candidatos que não sejam rascunhos (ou que venham de uma fila confiável) e estejam classificados como alterações de documentação ou código. Ele também é executado em eventos de CI que não sejam de PR; o gatilho de push deste workflow abrange apenas `main`, não `release/**`. Uma etapa que termina com código de saída diferente de zero bloqueia o job; resultados apenas informativos e as exceções documentadas abaixo não o bloqueiam.

| Script                         | Valida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Bloqueio                                                                                                                                    |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-gate que executa sequencialmente os 7 subgates abaixo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sim                                                                                                                                         |
| ↳ `check:docs-sync`            | Consistência de versões entre o pacote, OpenAPI e CHANGELOG, espelhos exatos de `llm.txt`, invariantes de seções e tamanho do CHANGELOG traduzido e ausência de documentos duplicados que já foram substituídos                                                                                                                                                                                                                                                                                                                                                 | Sim                                                                                                                                         |
| ↳ `check:docs-frontmatter`     | As páginas de documentação compiladas contêm títulos de frontmatter válidos                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sim                                                                                                                                         |
| ↳ `check:docs-counts`          | Os invariantes de contagem de alta confiança são estritos; as verificações heurísticas de quantidade de arquivos apenas emitem avisos, a menos que o script receba `--strict` (o meta-gate do CI não passa essa flag)                                                                                                                                                                                                                                                                                                                                           | O nível estrito bloqueia; o nível flexível é consultivo                                                                                     |
| ↳ `check:env-doc-sync`         | As leituras de variáveis de ambiente no código-fonte, `.env.example` e `docs/reference/ENVIRONMENT.md` coincidem após a aplicação das listas explícitas de exceções para itens ignorados, exclusivos da documentação e exclusivos do ambiente                                                                                                                                                                                                                                                                                                                   | Sim, fora das listas de exceções documentadas                                                                                               |
| ↳ `check:deprecated-versions`  | Relata versões potencialmente desatualizadas fora de contextos históricos seguros e datas de atualização antigas, excluindo os documentos ignorados                                                                                                                                                                                                                                                                                                                                                                                                             | Consultivo na configuração atual do CI (`--strict` não é passado)                                                                           |
| ↳ `check:doc-links`            | Links markdown internos na documentação apontam para arquivos reais (formato `[text]`/`(path)`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sim                                                                                                                                         |
| ↳ `check:fabricated-docs`      | Rotas, variáveis de ambiente, comandos da CLI, nomes de hooks e caminhos de arquivos citados na documentação existem na base de código. Gate rígido via `--strict`; falha não bloqueante sem a flag.                                                                                                                                                                                                                                                                                                                                                            | Sim (via `--strict` na CI)                                                                                                                  |
| `check:cli-i18n`               | As chaves de `t()` usadas pela CLI existem em `en`; `pt-BR` mantém todas as seções de primeiro nível; `zh-CN` e `zh-TW` contêm todas as chaves de `en`                                                                                                                                                                                                                                                                                                                                                                                                          | Sim                                                                                                                                         |
| `check:openapi-coverage`       | A especificação OpenAPI cobre pelo menos um limite mínimo, controlado por ratchet, das rotas reais                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Sim                                                                                                                                         |
| `check:openapi-security-tiers` | As anotações declaradas `x-loopback-only`/`x-always-protected` devem ter respaldo em `routeGuard.ts`; erros do parser e divergências na verificação direta bloqueiam. A verificação inversa da ausência de `x-loopback-only` sob prefixos de acesso exclusivamente local emite avisos, e as rotas definidas apenas por padrões são excluídas dessa passagem inversa.                                                                                                                                                                                            | As verificações do parser e diretas bloqueiam; a verificação inversa é consultiva                                                           |
| `check:openapi-routes`         | Cada caminho `/api...` em `openapi.yaml` corresponde a uma rota real sem distinguir diferenças nos parâmetros, após a aplicação da lista de exceções justificadas `KNOWN_STALE_SPEC`; entradas obsoletas nessa lista também causam falha                                                                                                                                                                                                                                                                                                                        | Sim                                                                                                                                         |
| `check:docs-symbols`           | Referências internas a URLs `/api/...` nos documentos canônicos que não são espelhos correspondem a uma rota real ou família de rotas; referências a proxy, upstream, marcadores de posição e arquivos, além das entradas justificadas de `KNOWN_STALE_DOC_REFS`, são excluídas, e entradas obsoletas na lista de exceções causam falha                                                                                                                                                                                                                         | Sim                                                                                                                                         |
| `i18n translation drift`       | Verifica os hashes de fonte/destino dos documentos principais e a procedência da tradução. A comparação de PR permite apenas falhas herdadas idênticas; inconsistências novas ou não verificadas de fonte, destino ausente, hash de destino, tradução desatualizada ou cache de seções bloqueiam. Fora da comparação de PR, as falhas de fonte/destino ausente/hash de destino bloqueiam, enquanto traduções desatualizadas e caches de seções inconsistentes continuam apenas como avisos. A ausência de um cache de seções no formato legado não é uma falha. | Desvios novos/não verificados em PR bloqueiam; desvios herdados idênticos são apenas avisos; as regras fora de PR dependem do tipo de falha |

Os doze SVGs do README em `docs/diagrams/` são gerados (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` regenera todos). Cada um tem um teste unitário de comparação de bytes
(`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) que falha quando o arquivo versionado
está desatualizado, e `check:docs-counts` lê os números canônicos de seus nós `<text>` — por isso a
etapa de conversão em contornos mantém cada string convertida no arquivo como `<text>` invisível. A verificação de números canônicos dos SVGs lê os arquivos listados em
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, além de `public/images/tier-flow-dark.svg` e `tier-flow-light.svg`;
as afirmações sobre free-forever, catalog-entry, recurring-pool e scoring-factors também leem
`promise-pillars.svg`, `free-tier-budget.svg` e `strategies-grid.svg`. `free-tier-budget.svg`
obtém seus números do carregador de catálogo ativo, portanto uma alteração em
`FREE_MODEL_BUDGETS` ou no nome de exibição de um provedor faz o CI falhar até que esse arquivo seja regenerado.

### Job: `i18n-ui-coverage`

| Script                            | Valida                                                                                                                                                                                                  | Bloqueante     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | A cobertura de chaves de i18n da UI é ≥ 65%                                                                                                                                                             | Sim            |
| `check-ui-value-drift` (inline)   | Um **valor** em inglês reescrito não deixa nenhuma tradução desatualizada para trás                                                                                                                     | Sim            |
| `check-new-key-coverage` (inline) | Uma chave **nova** em inglês está traduzida em todas as localidades — um marcador `__MISSING__:` é rejeitado                                                                                            | Sim            |
| `check-translation-ratio`         | A proporção de traduções reais por localidade (idênticas ao inglês / espaço reservado / ausentes fora da lista de permissões) não deve exceder `config/quality/i18n-translation-baseline.json` + margem | **Bloqueante** |

Requer `fetch-depth: 0` — o gate de divergência de valores compara as diferenças de `en.json` em relação à base de mesclagem.

#### `check-ui-value-drift` — gate de traduções desatualizadas

Detecta a regressão de i18n que os outros gates estruturalmente não conseguem identificar: um valor em inglês
é reescrito e as traduções derivadas do inglês _anterior_ permanecem, fazendo com que
usuários que não usam inglês continuem lendo um texto assertivo, mas agora incorreto.

Isso realmente chegou à produção. `oauthModal.googleOAuthWarning` foi reescrito quando o auxiliar de login
do Antigravity foi implementado (#5203); **39 de 43 localidades** mantiveram o texto orientando os operadores a "copiar a
URL completa e colá-la abaixo" — um fluxo que não pode ser concluído para esse provedor. Isso passou
despercebido até a #8463 porque:

- `sync-ui-keys` apenas preenche chaves que estão **ausentes**, nunca aquelas que estão **desatualizadas**;
- `check-ui-keys-coverage` contabiliza a _presença_ da chave, portanto uma tradução desatualizada conta como coberta;
- `check-translation-drift` monitora os espelhos da documentação em `docs/i18n/<locale>/**.md` —
  ele nunca lê `src/i18n/messages/*.json`. Bloqueante no job `docs-sync-strict` desde a
  ressincronização de 2026-09: edite um documento principal → `npm run i18n:run -- --files=<doc>` (por seção, baixo custo).

**Sensível ao diff, sem baseline.** Ele compara o `en.json` da base de mesclagem com a
árvore de trabalho; para cada chave cujo valor em inglês foi alterado, qualquer localidade que ainda contenha uma
tradução intacta está desatualizada. Isso deliberadamente **congela o débito preexistente** — um diff
não consegue revelar de qual inglês antigo uma tradução de longa data se originou, portanto o gate avalia
somente o que a alteração atual afeta. A alternativa (um baseline de hash por chave) exigiria
um arquivo gerado de aproximadamente 600 KB, 3× maior que o maior baseline existente, com alterações em cada PR de i18n.

Há duas maneiras de atendê-lo:

1. atualizar as traduções afetadas; ou
2. defini-las como `__MISSING__:<new english>` — o runtime então fornece o inglês corrigido
   (`src/i18n/request.ts::deepMergeFallback`, #7258), e a chave entra na fila para tradução.

Se o **significado** da string mudou, prefira **renomear a chave**: uma chave nova não pode herdar
uma tradução desatualizada. Esse foi o padrão usado pela #8463.

```bash
npm run i18n:check-value-drift          # estrito (o que a CI executa)
npm run i18n:check-value-drift:warn     # somente relatório
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

As verificações de desvio de valores e de novas chaves compartilham uma única comparação imutável de
`scripts/i18n/resolve-ui-diff-base.mjs`. O fluxo de trabalho fornece os mesmos SHAs da base, da ponta da base e
do candidato para ambas as verificações. As execuções de PR/alteração da base de destino, push e grupo de mesclagem usam o contexto
de seus eventos. O disparo de uma ramificação candidata exige seu PR aberto exato ou a entrada explícita
`i18n_base_sha`. O disparo ou a observação agendada de `main` ou `release/vX.Y.Z`
sem essa entrada compara o último commit com seu primeiro pai; isso não é uma auditoria de
toda a dívida de tradução herdada. A invocação local exige uma base de comparação explícita,
por exemplo, o comando `BASE_REF` acima.

Um contexto de comparação ausente ou ambíguo, um catálogo obrigatório ilegível ou inválido e
um candidato alterado produzem `INCOMPLETE` com o código de saída **2**, inclusive no modo de aviso.
As leituras de catálogo usam `scripts/i18n/read-ui-catalog.mjs`; falhas de leitura não são substituídas
por objetos vazios. Nem uma base indisponível nem uma entrada incompleta estabelecem PASS.

### Trabalho: `i18n`

Matriz de validação i18n completa (um trabalho por localidade). Todo o trabalho é consultivo.

| Roteiro                         | Valida                                | Bloqueio                                                      |
| ------------------------------- | ------------------------------------- | ------------------------------------------------------------- |
| `validate_translation.py quick` | Completude da tradução por localidade | **Consultivo** (`continue-on-error: true` em todo o trabalho) |

### Trabalho: `pr-test-policy`

É executado apenas em solicitações pull.

| Roteiro                | Valida                                                                                                                                 | Bloqueio |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | PRs que alteram o código de produção em `src/`, `open-sse/`, `electron/` ou `bin/` devem incluir ou atualizar testes (regra rígida #8) | Sim      |
| `check:test-masking`   | Os arquivos de teste alterados não reduzem a contagem de declarações líquidas nem adicionam tautologias `assert.ok(true)`              | Sim      |
| `check:pr-evidence`    | PR body cita evidências test/VPS para a mudança (mecaniza Hard Rule #18 grep PR prose — frágil, veja Backlog)                          | Sim      |

### Job: `test-vitest`

Requer o job de classificação `changes`. Os shards aplicáveis da matriz bloqueiam o merge em caso de falha.

| Suíte            | Valida                                                             | Bloqueante                                                                                                                |
| ---------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Servidor MCP (110 ferramentas), autoCombo, cache — executor vitest | Sim                                                                                                                       |
| `test:vitest:ui` | Testes de componentes da UI — executor vitest                      | **Bloqueante** — falhas preexistentes são explicitamente excluídas em `vitest.config.ts`; novas falhas fazem o job falhar |

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
- **consultivo** — o total global em comparação com a linha de base congelada. O desvio herdado nunca faz
  um PR inocente falhar; o desvio é rastreado para correção durante a reconciliação da versão e monitorado pelo
  job de margem disponível.

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

### Catraca CodeQL : admissão de candidatos e inventário de repositórios

CI possui a admissão do candidato CodeQL por meio de uma cadeia de dependência explícita: `codeql-scan` chama a matriz de quatro idiomas no `codeql.yml` e `codeql-admission` executa `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` requer ambos os resultados. A qualidade mantém suas próprias verificações numéricas, mas não consulta o scanner antes que o produtor termine; `Gate / Quality` por si só não é a admissão completa do candidato. CodeQL permanece obrigatório para candidatos apenas com documentos.

A política no `config/quality/codeql-admission-policy.json` seleciona Actions, C/C++, JavaScript/TypeScript e Python, conjunto de consultas padrão, modelo de ameaça remota e modo de construção nenhum. A simulação do produtor rejeita um registro de ativação pendente e ramifica fora da lista de destinos explícita. Os objetivos atuais são principais e os testes do Contrato release/v3.8.54. comparam esta lista finita e o gatilho de manutenção com a versão do pacote; a próxima versão precisa de uma integração revisada. O gatilho PR de liberação mais ampla existente do CI é mantido, mas um alvo não embarcado relata HOLD antes da extração, em vez de obter um PASS não medido.

Cada trabalho de matriz registra seu SARIF de upload ID real, idioma, categoria, execução e tentativa, identidade do fluxo de trabalho do chamador, evento ref/head/base/merge SHA e hash de política. O trabalho dependente baixa apenas os recibos desta execução e valida resumos de artefatos. Requer todas as quatro categorias, um produtor bem-sucedido e o processamento completo de cada upload exato. Ele usa o filtro sarif_id do API, não a análise mais recente encontrada em uma ramificação. As reprises parciais podem reutilizar categorias bem-sucedidas de uma tentativa anterior da mesma corrida e candidato, preservando a tentativa produtora; um produtor actual falido não pode reutilizar provas verdes anteriores.

A ação CodeQL aguarda o processamento, mas sua implementação fixada pode avisar e continuar após uma falha na leitura do status ou uma espera esgotada. A admissão, portanto, verifica novamente o processamento. Categorias ausentes, processamento pendente, trabalhos com falha ou cancelados, identidade obsoleta, paginação incompleta ou APIs indisponível produzem HOLD e saída 2. Nenhuma espera fixa por um fluxo de trabalho de scanner independente permanece. Um PR não verificado não pode passar porque uma consulta de alerta retornou 0. Uma contagem medida acima `metrics.codeqlAlerts.value` sai de 1; a linha de base não é elevada para absorver os alertas de outra filial. [Status de upload e pesquisa de análise](https://docs.github.com/en/rest/code-scanning/code-scanning).

Os registros de recebimento carregam e analisam IDs, categorias, versões de ferramentas, ref/SHA, linha de base e números de alerta. A contagem SARIF identity/result, as contagens mínimas de regras e as instâncias exatas de alerta permanecem obrigatórias. As identidades PR/analysis são verificadas novamente antes de serem aceitas. Essas verificações estabelecem a cobertura de categorias configuradas, não um inventário de cada arquivo de origem extraído. A extração sem compilação C/C++ não inclui código gerado durante a compilação de um projeto. As exclusões de fontes ainda precisam de revisão e a atribuição do contribuidor precisa de evidências comparáveis de base exata.

`codeql-maintenance.yml` fornece varreduras push de liberação ativa e programação semanal sem duplicar os produtores PR/main. `nightly-codeql-inventory.yml` mantém a linha de base de todo o repositório separada, com `--strict-measurement` e uma falha quando a medição não está disponível. O salto elegante do colecionador de legado local não é admissão de candidato. O aperto permanece um `--update` explícito após uma contagem global inferior verificada.

O fluxo de trabalho avançado não deve ser publicado enquanto a configuração padrão estiver configurada: GitHub rejeita essa combinação. Sua política versionada permanece pendente até que a transição administrativa revisada seja lida novamente. Antes da publicação, um repositório de pinos do operador, hashes head/base/tree, policy/patch/rollback e estado de configuração observado; `node scripts/quality/codeql-producer.mjs verify-admin-readback` verifica os registros JSON esperados e reais fornecidos. Esta é uma proteção técnica, não uma aprovação do operador ou um substituto para a busca de novas leituras. O token PR nunca solicita acesso de administração. A implementação e qualquer alteração do scanner exigem uma leitura separada, além de evidências reais de compatibilidade PR, fork e grupo de mesclagem.

Os forks usam executores hospedados, checkout sem credenciais persistentes, nenhum projeto install/build no produtor e nenhum segredo de repositório herdado. GitHub suporta upload SARIF para o evento pull_request com seu token de fork reduzido; a aprovação da execução da contribuição pela primeira vez continua sendo a política GitHub. Nunca use pull_request_target para executar código não confiável. Confirme as permissões reais do token, analyze_key e todos os ambientes de categoria no canário controlado antes de considerar a migração concluída. [Regras de upload bifurcado](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [modos de configuração conflitantes](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**As demissões são por decisão da operadora (Hard Rule #14)** — nunca descarta um alerta CodeQL sem registrar a justificativa técnica no comentário de dispensa: `won't fix` para um requisito de protocolo upstream, `used in tests` para um dispositivo de teste, `false positive` para um desinfetante CodeQL não pode ver (precedente: `docs/security/ERROR_SANITIZATION.md`).

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

## Política de Allowlist

Todo gate que não pode falhar devido a violações preexistentes usa uma allowlist congelada
(por exemplo, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). A política é:

**Corrija a causa raiz; use a allowlist somente quando a violação for preexistente e
não puder ser corrigida no mesmo PR.**

Ao adicionar uma entrada a uma allowlist:

1. Inclua um comentário com a justificativa.
2. Faça referência à issue de acompanhamento (por exemplo, `// #3498 — Phase 2 feature, not yet implemented`).
3. Remova a entrada no mesmo PR que corrige a violação — uma entrada obsoleta que não
   suprime mais uma violação ativa é, por si só, um defeito (a verificação de entradas
   obsoletas da 6A.3 fará o gate falhar devido a uma entrada órfã na allowlist assim que
   for implementada).

**Não** adicione entradas à allowlist para fazer os testes passarem mais rápido. Um gate
verde com uma allowlist crescente transmite uma falsa sensação de qualidade.

### Quando um gate falhar no seu PR

1. **Leia atentamente a saída do gate** — ela informa exatamente qual arquivo ou símbolo violou
   a regra.
2. **Corrija a violação** — a maioria dos gates consiste em verificações determinísticas do sistema
   de arquivos que passam assim que o código está correto.
3. **Se a violação for preexistente** (ou seja, você não a introduziu, mas o gate agora
   passou a detectá-la): adicione uma entrada à allowlist com um comentário de justificativa
   e uma issue de acompanhamento.
4. **Se o gate for um ratchet** (cobertura, avisos do ESLint, duplicação, complexidade):
   sua alteração piorou a métrica. Corrija o problema subjacente ou, em casos raros, execute
   `npm run quality:ratchet -- --update` se a alteração for intencional e a degradação da métrica
   for aceitável — mas documente o motivo na descrição do PR.
5. **Gates consultivos** (`continue-on-error: true`) são informativos — eles não bloqueiam
   o merge, mas aparecem no resumo da CI. Corrija-os mesmo assim.

---

## Adicionando um novo gate

1. Crie `scripts/check/check-<name>.mjs` (ou `.ts`). Gates de política encerram com 0/1.
   Gates do tipo catraca emitem uma métrica para `quality-metrics.json` por meio de `collect-metrics.mjs`.
2. Adicione `"check:<name>": "node scripts/check/check-<name>.mjs"` ao `package.json` e
   sincronize o alias e seu comando exato em `config/quality/gate-manifest.json`.
   Aplique a mesma sincronização ao alterar ou remover um alias de validação existente.
   Execute `npm run check:gate-manifest`; o hook de pre-commit e a classificação de alterações da CI
   impõem esse contrato.
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
mecânicas de CI; as ativações/remoções são decisões de política reservadas ao operador.**
Nada abaixo foi aplicado ainda.

**Também não documentados acima** (consultivos, baixo sinal): o job `docs-lint` (markdownlint + Vale, job inteiro com `continue-on-error`) e os workflows independentes de scanner `semgrep.yml` / `scorecard.yml`. CodeQL agora tem jobs obrigatórios de produção e admissão sob `Gate / CI`, sujeitos aos requisitos de ativação descritos acima. `semgrepFindings: 0` está em `quality-baseline.json`, mas não está ligado a uma ratchet bloqueante em `ci.yml` — a métrica está atualmente órfã.

### Consolidação / desduplicação (mecânica, menor risco)

Cada candidato foi validado em relação ao estado real dos gates em 2026-06-17
(confie, mas verifique); várias consolidações "óbvias" acabaram ocultando débito e **não**
são substituições diretas e seguras.

- **`check:docs-sync` é executado duas vezes** — de forma independente no job `lint` e novamente dentro de `check:docs-all` (`docs-sync-strict`) e do hook de pre-commit do husky. ✅ **CONCLUÍDO** — a invocação independente em `lint` foi removida.
- **Verificação de CVEs** — ❌ **NÃO é uma consolidação segura.** `audit:deps` bloqueia alertas críticos e auditorias incompletas nos cinco lockfiles, enquanto relata alertas de severidade alta como avisos conforme a política atual; `check:vuln-ratchet` (osv) só falha em uma _regressão_ em relação à baseline versionada e rejeita medições ausentes quando exigidas. Semânticas diferentes — remover `audit:deps` eliminaria o gate absoluto para vulnerabilidades críticas e os comprovantes independentes da auditoria de pacotes. Mantenha ambos.
- **Detecção de ciclos** — ✅ **CONCLUÍDO** (#15159 G-01/G-02). O texto antigo aqui chamava `check:cycles` de gate "verde e selecionado" e justificava mantê-lo bloqueante porque `check:circular-deps` (dpdm) relatava 91 ciclos. Esse resultado verde era um **falso positivo de sucesso**: `check:cycles` examinava 5 subdiretórios (450 arquivos), correspondia apenas a `import|export … from` estáticos e descartava todos os especificadores `@/` e `@omniroute/open-sse/`, portanto não conseguia detectar os ciclos de importação dinâmica + aliases que predominavam no repositório. Corrigido: agora o gate percorre `src` + `open-sse` (5023 arquivos), coleta especificadores da AST do TypeScript (portanto, `import("…")` conta, enquanto `typeof import("…")` em posição de tipo não conta) e resolve `paths` do tsconfig. Ele encontra **14** ciclos, não 0. Como 14 ciclos preexistentes não podem ser corrigidos em um PR de gate, `check:cycles` agora é um **ratchet** (`--ratchet`, teto `metrics.cycles.value = 14` em `quality-baseline.json`, `direction: down`) — ele bloqueia qualquer _regressão_ e a contagem só pode diminuir. A CI executa `npm run check:cycles:ratchet`. A redução gradual segue com **A-01**. `check:circular-deps` (dpdm) permanece consultivo como uma segunda opinião mais abrangente.
- **Complexidade** — ✅ **CONCLUÍDO** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): uma única passagem do ESLint, com contagens por ruleId para que as baselines de complexidade ciclomática+máximo de linhas e complexidade cognitiva permaneçam independentes; `check:complexity` / `check:cognitive-complexity` individuais permanecem para uso local com `--update`.
- **Anti-alucinação de `/api`** — ✅ **CONCLUÍDO** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): um único inventário do sistema de arquivos de `src/app/api`; openapi-routes + docs-symbols continuam gerando relatórios de forma independente; os comandos individuais permanecem para execuções locais.
- **`check:node-runtime` é executado em 11 jobs** — ⚠️ **baixo ROI.** Cada um usa um runner separado e a verificação leva menos de 1s; economia total de ~10s, ao custo de perder uma proteção simples por job. Não vale a rotatividade.
- **`typecheck:noimplicit:core` no lint da CI** — ✅ **removido do job lint** (era consultivo com `continue-on-error`); a superfície de tipos bloqueante é `typecheck:core` + `check:type-coverage`. O script local foi mantido.

### Ativar / decidir (política do operador)

- `check:openapi-security-tiers` (consultivo) — ❌ **NÃO pode ser ativado diretamente com segurança.** Ele encerra com 0, mas avisa que várias rotas de `traffic-inspector` em `LOCAL_ONLY_API_PREFIXES` não possuem a anotação `x-loopback-only: true`. Aplicá-lo exige primeiro adicionar essas anotações a `openapi.yaml`.
- `typecheck:noimplicit:core` (consultivo) — amplamente substituído pelo ratchet bloqueante `check:type-coverage`. Transforme-o em ratchet ou remova a segunda passagem redundante do `tsc`.
- `test:vitest:ui` (agora **bloqueante**) — falhas preexistentes são explicitamente excluídas em `vitest.config.ts` com comentários de acompanhamento `// #8618`; novas falhas fazem o job falhar.
- `check:secrets` (gitleaks, ratchet bloqueante) — o teto atual é `metrics.secretFindings` em `quality-baseline.json`. Qualquer exceção exige uma entrada justificada em `.gitleaks.toml`; medição indisponível é INCOMPLETA. A verificação complementa a detecção nativa de segredos do GitHub e `check:public-creds`.
- `check:pr-evidence` (bloqueante, busca padrões no texto do corpo do PR) — alto risco de falsos positivos; removê-lo enfraquece a aplicação da Regra Rígida nº #18, portanto esta é uma decisão genuína de política.
- `semgrep` (workflow independente consultivo) — sobrepõe-se ao CodeQL nas famílias do OWASP; conecte sua baseline a um ratchet ou remova-o.

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
