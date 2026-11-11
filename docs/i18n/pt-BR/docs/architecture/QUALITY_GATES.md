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

## Inventário de portas e perfis de execução

### Admissão de candidato

Os fluxos de trabalho CI e Quality Gates emitem, cada um, um veredicto estável: `Gate / CI` e `Gate / Quality`. Sua política de admissão versionada enumera todos os trabalhos upstream conforme necessário ou consultivo. Um trabalho obrigatório aplicável deve ser bem-sucedido: resultados ausentes, cancelados, ignorados, pendentes e desconhecidos não podem estabelecer PASS. Uma classificação válida somente para documentos ou somente para catálogo pode tornar uma linha de código inaplicável; um projeto comum PR não é um candidato aceito. Um rótulo `hotfix` não dispensa evidências.

Ambos os fluxos de trabalho abrangem PRs em ramificações main/release, envios para `main`, envio manual e eventos de grupo de mesclagem. Push, dispatch e merge-group executam a seleção completa. Um rascunho de fila confiável do Mergify também executa trabalhos `full-code`/`full-code-e2e` aplicáveis; PRs comum os ignora. Antes de uma mesclagem manual, execute um despacho completo no candidato exato. Pushes para `release/**` não iniciam esses fluxos de trabalho; Release-Green observa a base mesclada separadamente (`docs/ops/RUNNER_BOX.md` → Hosted lane). Bifurcações e grupos de mesclagem usam executores hospedados para trabalhos que, de outra forma, selecionam executores auto-hospedados; capacidade hospedada suficiente deve ser verificada antes da implementação.

Um PR comum executa a seleção rápida. As pistas `full-code` e `full-code-e2e` da política de admissão (E2E, integração, artefato de pacote, Electron smoke, Bun SQLite, ecossistema e clientes de protocolo) são executadas apenas em um rascunho de fila Mergify ou em uma execução completa: `gh workflow run ci.yml --ref <branch>`.

Cada recibo JSON identifica o SHA verificado, a execução do fluxo de trabalho e a tentativa. O CLI rejeita uma incompatibilidade checkout/event SHA. Os testes de fluxo de trabalho vinculam a associação à política à lista `needs` do trabalho de veredicto para que uma faixa nova ou removida não possa desaparecer silenciosamente. Os recibos cobrem seu próprio fluxo de trabalho, não publicação, implantação ou aspectos internos de um scanner de consultoria existente. Fazer as verificações aplicáveis exigidas nas regras da filial é uma alteração administrativa separada; definir seus empregos não protege, por si só, uma filial.

`API Route Typecheck` é uma verificação de fluxo de trabalho independente, fora dos veredictos agregados e do perfil estático completo do observador local. Inspecione seu resultado separadamente para o candidato exato. `.github/workflows/api-route-typecheck.yml` é executado em PRs em `main` ou `release/**`, envia para família de ramificação, despacho manual e eventos `merge_group` do tipo `checks_requested`. Não possui filtro de caminho. Mesclar grupos, confira `merge_group.head_sha`; outros eventos confira `github.sha`. Todos os eventos usam a mesma porta de diagnóstico API e testes de unidade de porta. Os redirecionamentos básicos PR solicitam uma nova verificação; As edições body/title usam o nome apenas de observação `Admission not requested / API Route Typecheck` e não podem substituir a verificação de admissão.

### Evidências retidas no redutor de aceitação

`scripts/quality/validate-release-acceptance.mjs` reduz um plano fornecido e seus manifestos; não estabelece que o plano cubra todo o pipeline de lançamento. Seus relatórios definem explicitamente `releaseAcceptance: false`, mesmo quando esse plano é `VERIFIED`. O fluxo de trabalho `release-acceptance.yml` ainda usa acessórios de sombra, e não recibos reais de construção, pacote, inicialização ou promoção.

O CLI exige que `--evidence-root` verifique as evidências retidas. Os arquivos são resolvidos como `<evidence-root>/<artifact_id>/<member>` e com hash como SHA-256. Um registro PASS sem evidência, um arquivo ausente ou alterado, um caminho inseguro ou um link simbólico impedem a verificação. Arquivos ausentes não são equivalentes a logs vazios bem-sucedidos. As verificações SHA/run/attempt existentes permanecem independentes: os bytes correspondentes não podem resgatar um recibo obsoleto. A integridade do arquivo não é prova de autenticidade de execução ou promoção de artefato.

### DAST consome a versão verificada CI

O trabalho `dast-smoke` CI necessário chama `.github/workflows/dast-smoke.yml` após `build`. Ele segue a mesma seleção code/draft da compilação, incluindo fork PRs compatível, PRs de destino de lançamento e grupos de mesclagem. Uma tarefa DAST ausente, com falha, cancelada ou ignorada inesperadamente bloqueia `Gate / CI`. O fluxo de trabalho reutilizável não possui gatilho PR/dispatch independente; a validação manual usa o despacho do CI para que a construção e o consumidor permaneçam em uma única execução.

`scripts/ci/next-build-provenance.mjs` sela o artefato Next completo com seu resumo tar, repository/event/run, tentativa de produtor, head/base/checkout/tree, identidades de fluxo de trabalho, arquivo de bloqueio, Nó exato version/ABI, plataforma e empacotador. DAST seleciona o artefato imutável ID do `needs.build.outputs`, exige a verificação do resumo de download e faz o hash independente do ZIP em relação ao resumo do produtor antes de extrair seus dois membros da lista de permissões por meio `scripts/ci/unpack-ci-build.py`. O manifesto e o arquivo tar também devem corresponder às saídas do produtor independente antes que a próxima árvore seja extraída. Ele nunca procura a última versão de branch bem-sucedida. Uma reexecução parcial pode reutilizar a mesma tentativa do produtor quando seu ID e todas as entradas ainda corresponderem; o recibo registra ambas as tentativas.

O consumidor permanece em um executor Linux hospedado com permissão de repositório somente leitura e sem segredos de repositório. Ele instala a versão exata do Node do produtor e depois monta o CLI com `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` rejeita um servidor autônomo ausente antes de qualquer compilação substituta; compilações CLI locais normais mantêm seu substituto existente. A prontidão do servidor, o Schemathesis e o promptfoo devem ser bem-sucedidos dentro do limite de trabalho inalterado de 25 minutos. Um recibo de proveniência comprova a identidade e os bytes de entrada, e não uma verificação DAST bem-sucedida. A expiração do artefato, a interrupção do executor ou um scanner com falha permanecem evidências incompletas ou com falha; ele não pode se tornar PASS por meio de um wrapper consultivo.

### Capacidade de execução UI

CI executa o inventário completo UI como quatro fragmentos de matriz `test-vitest`, cada um com no máximo dois trabalhadores por fragmento e o prazo de trabalho existente de 15 minutos. O primeiro fragmento também executa o conjunto MCP/autoCombo Vitest. O resultado do trabalho necessário abrange todas as etapas da matriz; a falha ou cancelamento de um fragmento não pode estabelecer a admissão do candidato.

O observador noturno retém um recibo de candidato exato separado para cada fragmento UI, incluindo a execução MCP no primeiro recibo. Todos os quatro recibos, logs e identidades de execução correspondentes são obrigatórios. `npm run test:vitest:ui` local ainda seleciona o conjunto completo; uma execução `--shard` é apenas uma evidência parcial.

### Cobrança de cobertura unitária

Os doze fragmentos de unidade coletam cobertura V8 durante a execução de teste existente. Um fragmento bem-sucedido executa `scripts/ci/compact-v8-coverage.mjs` para compactar os arquivos originais sem gerar um relatório intermediário de Istambul. O trabalho de cobertura final verifica todos os doze manifestos em relação ao SHA candidato, tempo de execução, raiz de origem e hashes de dados e, em seguida, executa os repórteres do c8 e os limites de cobertura existentes. As entradas mantêm a ordem global dos nomes de arquivos do c8; A pré-mesclagem por fragmento não é segura para cobertura function/block mista. Fragmentos ausentes, malformados ou incompatíveis falham na admissão. Os fragmentos de teste com falha retêm a cobertura de diagnóstico bruta separadamente; ele não pode entrar na mesclagem final.

### Recibos de progresso de execução da unidade

O comando `test:unit:ci:shard` compartilhado registra as fases `primary`, `dashboard` e `serial` por meio `scripts/ci/unit-progress-reporter.mjs`. O relatório de teste normal permanece disponível. Um recibo separado apenas de metadados registra o início e a conclusão de cada arquivo, e uma pulsação de 30 segundos lista os arquivos ainda ativos e seu tempo decorrido. Ele registra apenas metadados de execução permitidos; descrições de teste, saída, corpos de erro e o ambiente completo não são serializados.

CI retém os arquivos JSONL como `unit-progress-ci-<run>-<attempt>-<shard>`. Um tempo limite de trabalho pode impedir o upload posterior; os batimentos cardíacos já emitidos permanecem como evidência diagnóstica. Pulsações ausentes também podem refletir um processo de execução bloqueado ou encerrado. Esses recibos preservam a seleção de testes, simultaneidade, prazos e status de saída existentes; eles não são veredictos de admissão de candidatos.

### Mesclar fila

O rótulo `queue` envia um PR para a fila Mergify (`.mergify.yml`). Mergify abre um rascunho PR em uma ramificação `mergify/merge-queue/`, CI executa a seleção completa lá e o PR original se funde quando `Gate / CI`, `Gate / Quality` e `Merge integrity (changelog + generated skills)` são aprovados.

Mergify escreve o resumo da fila na descrição do rascunho. Os eventos Body/title-only `pull_request` `edited` usam um grupo de simultaneidade específico de execução e não executam novamente classificação, matrizes de teste, integridade de mesclagem ou veredicto de admissão. Os nomes de verificação somente de observação não podem substituir `Gate / CI` ou `Gate / Quality`. Uma edição que altera a base de destino solicita uma nova validação de candidato.

Após um desenfileiramento, um push nem sempre recoloca o PR na fila. Comente `@mergifyio queue` sobre isso.

### Inventário de verificação estática

O inventário npm-alias versionado e a associação de varredura estática residem no `config/quality/gate-manifest.json`. Execute `npm run check:gate-manifest` para validar nomes de scripts e comandos exatos em relação `package.json`; adições, remoções e desvios de comando falham tanto no gancho local quanto nos trabalhos de classificação de mudança no CI. Um alias não é um trabalho de fluxo de trabalho, uma instância de matriz ou um caso de teste: essas contagens não devem ser apresentadas como intercambiáveis.

Use `npm run quality:scan -- --list` ou `npm run quality:scan:fast -- --list` para inspecionar os aliases selecionados sem executá-los. O executor invoca o ponto de entrada npm, portanto seu tempo de execução (incluindo Bun quando configurado) é preservado. O manifesto registra aliases fora desses perfis, conforme invocados separadamente, e os comandos de manutenção são proibidos em perfis de varredura somente leitura.

Esses perfis abrangem apenas a verificação estática. Eles não certificam testes de produtos, cobertura, embalagem, verificações externas ou aceitação total da liberação de um candidato. A admissão do fluxo de trabalho usa o `config/quality/admission-policy.json` e `scripts/quality/admission-verdict.mjs` vinculados. Os perfis dos observadores de lançamento permanecem separados; inspecionar seus cheques e recibos aplicáveis de forma independente. Os comandos estáticos completos do observador são declarados em `config/quality/release-green-static-profile.json`, incluindo `audit:deps`, seleção de teste de mutação e verificações de tradução. O carregador valida comandos npm em relação package.json e às declarações modeladas CI/Quality ; ele rejeita o desvio em vez de executar tokens de shell como argumentos. A saída SKIP/INCOMPLETE do scanner necessária não pode estabelecer PASS. O perfil registra suas exclusões externas e não substitui cobertura hospedada, matrizes de teste, pacote ou evidência de implantação. O inventário em prosa abaixo é uma referência, não uma prova de que um portão realmente funcionou.

Os scripts vivem sob `scripts/check/` (portões de política) e `scripts/quality/` (mecanismo de catraca). A fonte da verdade CI é `.github/workflows/ci.yml`.

### Integridade da documentação de base publicada

`.github/workflows/i18n-base-health.yml` observa a integridade da documentação após envios selecionados para `main` e `release/v*` e no envio manual. Seus filtros cobrem documentação, Markdown raiz, `llm.txt`, tradução state/configuration e as ferramentas i18n relevantes. O trabalho único `Published base documentation health` usa Ubuntu hospedado e um prazo de cinco minutos. Ele executa validação somente leitura e grava um recibo de diagnóstico sem instalação de dependência, tradução ou adoção de estado.

`scripts/i18n/check-base-health.mjs` requer zero inconsistências de hash de origem, alvo ausente, hash de destino, tradução obsoleta e cache de seção. Ele também valida o escopo central atual document/locale e sua procedência registrada. Contexto inválido, cobertura incompleta ou verificador interrompido produz `INCOMPLETE`; a deriva confirmada produz `FAIL`. Ambos retornam um status de saída com falha. O recibo está vinculado ao checkout SHA, fluxo de trabalho, execução e tentativa, e é retido como `i18n-base-health-<sha>-<run>-<attempt>`.

Esta é uma observação independente da base publicada. Ele não adiciona um evento PR ou de grupo de mesclagem, uma verificação PR necessária, um alias npm ou um membro do perfil de varredura estática. O verificador subjacente também bloqueia todas as cinco classes em modo absoluto. A preparação normal PR permanece separada da admissão. Um upload bem-sucedido não pode transformar um resultado de integridade com falha em PASS.

Um PR comum usa `--preflight` com um relatório base gerado pelo `--baseline-evidence`. Pode deixar uma fonte em inglês pendente apenas quando o registro completo da tradução e os bytes de destino reais permanecem inalterados em relação a essa base exata. Novas inconsistências de alvo ou cache de seção ainda bloqueiam e evidências incompletas não podem autorizar a preparação. O relatório expõe `preparationPending` e `mergeReady` separadamente: a preparação bem-sucedida não torna as traduções pendentes prontas para serem mescladas. Atualize os espelhos afetados no candidato composto antes da admissão. O candidato confiável à fila Mergify, `merge_group`, push de ramificação e execuções manuais CI usam o verificador absoluto, sem `--warn` ou perdão de falha herdada. Hashes de destino ausentes e um escopo reduzido por arquivos principais gravados excluídos não podem produzir um veredicto absoluto bem-sucedido.

### Liberar atalho PR (`quality.yml`)

`.github/workflows/quality.yml` complementa CI em main/release PRs, envia para `main`, despacha e mescla grupos. PRs usa verificações rápidas filtradas por caminho. A compilação duplicada permanentemente desativada foi removida; as verificações reais build/package/boot permanecem no CI. O conjunto de unidades e o vitest são executados apenas em CI (`Unit Tests (N/12)` e `Vitest`).

| Trabalho                                         | Escopo                                                                                                                                                                                                                                         | Bloqueio              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; Documentos API referências e documentos-tudo                                                                                                                                                                                    | Sim                   |
| `Fast Quality Gates`                             | Código PRs; verificações estáticas, verificação de tipo, verificação de tipo de painel, testes de unidade impactados                                                                                                                           | Sim                   |
| `Forgotten sibling tests`                        | Código PRs; módulos alterados rastreados para consumidores estáticos e testes de irmãos candidatos; os caminhos barril e de importação dinâmica são relatados como diagnósticos consultivos, com exceções de lista de permissões referenciadas | **Consultivo**        |
| `No new ESLint warnings`                         | Código PRs; protetor de fiapos com reconhecimento de supressão                                                                                                                                                                                 | Sim, incluindo garfos |
| `Merge integrity (changelog + generated skills)` | PRs sem rascunho; changelog e sincronização de habilidades geradas                                                                                                                                                                             | Sim, incluindo garfos |

#### Relatório de testes de irmãos esquecidos

`npm run check:forgotten-sibling-tests` é executado como uma etapa consultiva do `Fast Quality Gates` e reutiliza o resolvedor de importação por trás do mapa de impacto de teste. Para cada módulo de produção alterado, ele relata cadeias `changed module/symbol -> static consumer -> candidate sibling test` determinísticas quando o teste candidato está ausente da comparação de solicitação pull. O resumo do Markdown e o resultado JSON são retidos como artefato de fluxo de trabalho `forgotten-sibling-tests` para calibração antes de qualquer implementação de bloqueio.

As reexportações de barril e as importações dinâmicas são apenas diagnósticos de resolução; eles nunca criam uma descoberta bloqueadora. As exceções revisadas residem no `config/quality/forgotten-sibling-allowlist.json`. Cada entrada deve nomear o teste do consumidor e do candidato, fornecer uma justificativa específica e vincular um problema GitHub ou solicitação pull. Entradas malformadas falham no fechamento. As exceções não podem suprimir um teste candidato excluído ou uma comparação que adiciona `.skip`/`.todo`; o enfraquecimento de asserções e outros mascaramentos permanecem pertencentes ao portão `check:test-masking` de bloqueio independente.

### Cargo: `lint`

Funciona em todos PR até `main`. Os blocos se fundem em caso de falha.

| Roteiro (`npm run ...`)           | Valida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Bloqueio                                   |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | A versão Node.js está dentro da faixa suportada                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Sim                                        |
| `check:cycles`                    | Importações circulares em todo o `src/` + `open-sse/` (baseado em AST, tsconfig `paths` resolvido). Bare sai 1 sempre que existe algum ciclo (fechado com falha desde #15281) e lista o SCCs. `check:cycles:ratchet` (o que CI executa) bloqueia quando a contagem excede o teto `metrics.cycles` em `quality-baseline.json` — atualmente 14, `direction: down`, então só pode cair (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sim (catraca)                              |
| `check:boundary`                  | Acoplamento `open-sse → src` : importações exclusivas de arquivo para arquivo do mecanismo para o aplicativo (`scripts/quality/measure-boundary.mjs`; a lista de bordas é o backlog de remediação core/module-split v4). Relatório consultivo = simples (igual ao `quality:boundary`). `check:boundary:ratchet` (o que CI executa, também no loop de catraca de portas rápidas `quality.yml` ) bloqueia quando a contagem excede o teto `metrics.boundaryOpenSseToSrc` em `quality-baseline.json` — semeado no 771 medido, `direction: down`; `--update` apenas diminui; relativo à base em PRs (`--base-ref`, veja abaixo)                                                                                                                                                                                                                                                                                                                                                                                                                                           | Sim (catraca)                              |
| `check:route-validation:t06`      | Esquemas Zod presentes em todas as rotas (política de nível 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sim                                        |
| `check:any-budget:t11`            | A contagem `@ts-expect-error // any` não excede o orçamento (Catraca Nível 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sim                                        |
| `check:provider-consistency`      | Cada provedor no `providers.ts` tem uma entrada correspondente no `providerRegistry.ts` (e vice-versa, dentro da lista de permissões)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sim                                        |
| `check:model-lifecycle`           | As três tabelas de roteamento mantidas manualmente permanecem consistentes com o instantâneo do ciclo de vida verificado (#11503): `FITNESS_TABLE` (`taskFitness.ts`) não pontua nenhum ID retirado que `REGISTRY` possa rotear; cada destino `BUILT_IN_ALIASES` está presente no `REGISTRY` e ausente do instantâneo de id retirado; todo id retirado ainda no `REGISTRY` é encaminhado ou listado no `allowedRetiredInCatalog`; e nenhuma origem ou destino `DEFAULT_DEGRADATION_MAP` aparece desativado nesse instantâneo. Isso não prova que um modelo seja atualmente servido por um upstream ativo. — off-line é comparado ao `config/quality/model-lifecycle.json`, atualizado manualmente com `npm run quality:refresh-model-lifecycle` (rede; não conectado ao CI). `allowedRetiredInCatalog` é uma catraca de queima: adicione uma entrada apenas com problema de rastreamento.                                                                                                                                                                             | Sim                                        |
| `check:fetch-targets`             | Cada `fetch("/api/...")` no `src/` do lado do cliente é resolvido para um `route.ts` real                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sim                                        |
| `check:deps`                      | Todas as dependências `npm install` -able em cada `package.json` no repositório estão em `dependency-allowlist.json`; novos pacotes não fixados ou desocupados sinalizados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Sim                                        |
| `audit:deps`                      | auditoria npm de todos os cinco arquivos de bloqueio independentes (root, Electron, plug-ins OpenCode, v1/v2 e provedor). Bloco de avisos críticos; altos avisos permanecem avisos visíveis. As auditorias Missing/failed são INCOMPLETE e bloco; hashes e relatórios de bloqueio por escopo são retidos.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sim                                        |
| `check:lockfile`                  | Integridade `package-lock.json` Registro https —, hashes de integridade, sem substituições de host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sim                                        |
| `check:licenses`                  | Lista de permissões de licença SPDX para dependências de produção                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sim                                        |
| `check:tracked-artifacts`         | Sem artefatos de construção/links simbólicos `node_modules` confirmados (também é executado em pré-confirmação husky; pré-push é intencionalmente leve — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Sim                                        |
| `check:ai-attribution`            | Nenhum trailer AI/bot `Co-Authored-By` ou rodapé de geração de IA em commits PR, título ou corpo — Hard Rule #16 (no loop de fast-gates `quality.yml` para PR→ `release/**` — lê a carga útil do evento, no-op off PRs — e uma etapa somente PR em `ci.yml` lint para PR→ `main`; também o gancho husky `commit-msg` ; coautores humanos permitidos; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:vitest-exclusions`         | Cada exclusão Vitest nomeia um problema de rastreamento e aparece no `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sim                                        |
| `check:file-size`                 | Os arquivos de origem (`.ts`/`.tsx` em `src/`, `open-sse/`, `electron/`, `bin/`) ficam no `cap` e os arquivos de teste (`*.test.ts(x)`) no `testCap`; arquivos congelados em `file-size-baseline.json` (`frozen` / `testFrozen`) não devem ultrapassar o tamanho registrado                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Sim                                        |
| `check:error-helper`              | Respostas de erro no executors/handlers usam `buildErrorBody()` / `sanitizeErrorMessage()` (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Sim                                        |
| `check:migration-numbering`       | Os arquivos SQL de migração são numerados sequencialmente, sem lacunas ou duplicatas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Sim                                        |
| `check:public-creds`              | Nenhuma chave OAuth `client_id`/`client_secret` ou Firebase Web literal fora do `publicCreds.ts` (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sim                                        |
| `check:db-rules`                  | Nenhum SQL bruto fora dos módulos `src/lib/db/` ; sem importações de barris do `localDb.ts` (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sim                                        |
| `check:known-symbols`             | Executores de provedores, estratégias de roteamento e tradutores registrados em suas tabelas de despacho correspondem aos arquivos no disco — sem símbolos órfãos ou não declarados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sim                                        |
| `check:route-guard-membership`    | Toda rota que gera um processo filho é classificada por `isLocalOnlyPath()` (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sim                                        |
| `check:test-discovery`            | Cada arquivo `*.test.ts` / `*.spec.ts` no repositório é coletado por pelo menos um executor de teste (catraca: a lista órfã no `test-discovery-baseline.json` só pode diminuir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Sim                                        |
| `check:test-tla-order`            | Nenhum arquivo `node:test` no `tests/unit` registra um teste, atinge um `await` de nível superior e registra mais (#18045; catraca: `test-tla-order-allowlist.json` só pode encolher)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sim                                        |
| `check:agent-skills-sync`         | Os artefatos de habilidades do agente gerados correspondem ao seu catálogo de origem (sem desvios)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | O provedor logos/assets carrega uma entrada de procedência registrada                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `lint:json`                       | Os arquivos de configuração JSON analisam e satisfazem as regras do repositório lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `typecheck:core`                  | Compilação TypeScript sem erros (apenas avisos consultivos)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Sim                                        |
| `typecheck:noimplicit:core`       | Estrito `noImplicitAny` — voltado para o futuro; muitos call sites pré-existentes ainda precisam de anotações                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **Consultivo** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` com escopo definido para `src/app/(dashboard)/**` (#7033) — A lista de permissões de 27 arquivos com curadoria do `typecheck:core` não inclui nenhum painel TSX, e `next build` também nunca verifica o tipo (`next.config.mjs` define `ignoreBuildErrors: true`), portanto, as regressões de identificadores órfãos (#6625/#6909) eram invisíveis para CI. Diferenças em relação a uma linha de base de contagem per-file/per-TS-code congelada (`config/quality/dashboard-typecheck-baseline.json`, mesmo padrão de aplicação obsoleta de `check:known-symbols`) — apenas Erros NEW além da contagem de linha de base falham no portão; reduza o `--update` quando um erro pré-existente for corrigido.                                                                                                                                                                                                                                                                                                                                                       | Sim                                        |
| `check:build-typecheck`           | A verificação do tipo de produção de aplicativo inteiro no `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), a lista de permissões de 27 arquivos do `typecheck:core` de superfície e a porta do painel não cobrem. Diferenças contra `config/quality/build-typecheck-baseline.json`; uma contagem nova ou aumentada por (arquivo, código) falha, uma contagem mais baixa solicita que você aumente. `--update` recusa enquanto a execução contém um par novo ou elevado, a menos que `--force-regressions` seja aprovado, e recusa um arquivo recentemente silenciado, a menos que `--force-nocheck` seja aprovado, portanto, ampliar a linha de base para ficar verde e conceder um silêncio permanente são dois atos deliberados separados. Um `--force` simples é rejeitado. Também verifica o escopo de construção de `@ts-nocheck` em relação a `config/quality/ts-nocheck-baseline.json`, porque um arquivo que o utiliza não relata nenhum diagnóstico e, de outra forma, seria invisível para todos os portões. | Sim                                        |

#### Dois programas de verificação de tipo respondem de maneira diferente

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) e `check:build-typecheck` compilam programas diferentes sob diferentes opções, e o mesmo arquivo pode estar limpo em um e cheio de erros no outro.

`tsconfig.build.json` define `"strict": false`, então `noImplicitAny` está desativado. A configuração principal compila uma lista de permissões de 27 arquivos com opções mais restritas e segue o gráfico de importação de cada entrada, para que os arquivos que nunca aparecem no programa de compilação ainda sejam verificados lá.

A consequência é importante ao julgar se um arquivo é digitado:**zero diagnóstico sob `check:build-typecheck` não significa zero** . A remoção `@ts-nocheck` de 26 arquivos mostrou 23 deles limpos no programa de construção; dezesseis deles revelaram cerca de 120 erros implícitos no estrito. Verifique ambos antes de chamar um arquivo limpo.

### Cargo: `quality-gate`

Corre após `test-coverage`. Os blocos se fundem em caso de falha.

| Roteiro                      | Valida                                                                                                                                                              | Bloqueio                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `quality:collect`            | Emite `quality-metrics.json` (contagem de avisos ESLint, cobertura do relatório de fragmentos mesclados)                                                            | Sim (a montante da catraca) |
| `quality:ratchet`            | Cada métrica no `quality-baseline.json` não regrediu (linha de base ESLint para avisos ≤ ; linha de base ≥ para cobertura)                                          | Sim                         |
| `check:duplication`          | A duplicação de código (jscpd@4) não excede a linha de base no `quality-baseline.json`                                                                              | Sim                         |
| `check:complexity`           | A complexidade ciclomática em nível de arquivo não excede o limite (núcleo ESLint `complexity` + `max-lines-per-function`)                                          | Sim                         |
| `check:cognitive-complexity` | Catraca de complexidade cognitiva (`eslint-plugin-sonarjs`) — passagem ESLint separada; CI executa ambos mesclados como uma única etapa `check:complexity-ratchets` | Sim                         |
| `check:dead-code`            | Catraca de exportações/arquivos não utilizados (knip) não regride em relação à linha de base                                                                        | Sim                         |
| `check:compression-budget`   | O orçamento de referência de compactação — por mecanismo de economia de token não deve regredir                                                                     | Sim                         |
| `check:type-coverage`        | A catraca digitada por porcentagem (`type-coverage`) não regride; em grande parte inclui `typecheck:noimplicit:core`                                                | Sim                         |

### Empregos: `codeql-scan` e `codeql-admission`

`codeql-scan` produz todas as categorias de análise configuradas. Após o sucesso do trabalho, `codeql-admission` valida seus uploads exatos e a catraca de alerta do candidato. Ambas são dependências obrigatórias do `Gate / CI`, incluindo candidatos somente para documentos. A ativação administrativa e os requisitos canário são descritos em "catraca CodeQL " abaixo.

| Roteiro                | Valida                                                                                                                                                                                                                         | Bloqueio |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `check:codeql-ratchet` | ref/SHA candidato e todas as categorias de análise configuradas devem estar atualizadas antes da catraca do alerta; blocos de evidências ausentes. O inventário global permanece separado —, consulte "catraca CodeQL " abaixo | Sim      |

### Cargo: `quality-extended`

O trabalho bloqueia candidatos aplicáveis. Tamanho do pacote, descobertas secretas, descobertas de vulnerabilidade, descobertas de fluxo de trabalho e alterações OpenAPI são verificadas com as catracas necessárias. Os diagnósticos de dependência circular permanecem consultivos. A instalação do scanner é necessária: `scripts/ci/install-quality-scanners.sh` provisiona versões fixadas e propaga falhas de instalação. Ferramentas ausentes, relatórios inválidos ou linhas de base ausentes deixam o portão do scanner necessário INCOMPLETE.

| Roteiro                  | Valida                                                                                                                                                                                                                                  | Bloqueio                                              |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `check:circular-deps`    | Sem dependências circulares (dpdm)                                                                                                                                                                                                      | **Consultivo**                                        |
| `check:bundle-size`      | O tamanho do pacote não excede o limite; uma medição indisponível falha                                                                                                                                                                 | **Bloqueio com --ratchet**                            |
| `check:secrets`          | As descobertas do Gileaks não regridem; verificações necessárias rejeitam tools/source/baseline ausente, verificações com falha e relatórios inválidos                                                                                  | **Bloqueio com --ratchet**                            |
| `check:vuln-ratchet`     | As vulnerabilidades de dependência não regridem; as verificações necessárias rejeitam ferramentas ausentes, relatórios inválidos ou linhas de base ausentes                                                                             | **Bloqueio com --ratchet**                            |
| `check:workflows`        | Lint de fluxo de trabalho (actionlint + zizmor); Scanners missing/broken, relatórios inválidos ou linha de base da catraca ausente falham como INCOMPLETE. As descobertas válidas seguem a política strict/advisory/ratchet selecionada | Execução necessária; bloqueio de catraca zizmor em CI |
| `check:openapi-breaking` | Contrato API público contra commits de eventos fixados (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); medição necessária falha fechada                                                         | **Bloqueio com --ratchet**                            |

### Cargo: `docs-sync-strict`

Para solicitações pull para `main` ou `release/**`, esse trabalho é executado apenas para candidatos não rascunhos (ou fila confiável) classificados como documentação ou alterações de código. Ele também funciona em eventos CI não PR; o gatilho push deste fluxo de trabalho cobre apenas `main`, não `release/**`. Uma etapa que sai diferente de zero bloqueia o trabalho; as descobertas apenas de relatório e as isenções documentadas abaixo não o fazem.

| Roteiro                        | Valida                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Bloqueio                                                                                                                                                  |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-gate que executa os 7 sub-gates abaixo sequencialmente                                                                                                                                                                                                                                                                                                                                                                                                                      | Sim                                                                                                                                                       |
| ↳ `check:docs-sync`            | Consistência da versão Package/OpenAPI/CHANGELOG, espelhos `llm.txt` exatos, invariantes CHANGELOG section/size traduzidos e ausência de documentos duplicados substituídos                                                                                                                                                                                                                                                                                                      | Sim                                                                                                                                                       |
| ↳ `check:docs-frontmatter`     | As páginas de documentação compiladas possuem títulos de frontmatter válidos                                                                                                                                                                                                                                                                                                                                                                                                     | Sim                                                                                                                                                       |
| ↳ `check:docs-counts`          | Os invariantes de contagem de alta confiança são estritos; verificações heurísticas de contagem de arquivos apenas avisam, a menos que o script receba `--strict` (o meta-gate CI não passa)                                                                                                                                                                                                                                                                                     | Bloqueio estrito de níveis; consultoria de nível flexível                                                                                                 |
| ↳ `check:env-doc-sync`         | Leituras de ambiente de origem, `.env.example` e `docs/reference/ENVIRONMENT.md` concordam após as listas de permissões explícitas para ignorar, somente documento e somente ambiente                                                                                                                                                                                                                                                                                            | Sim, fora das listas de permissões documentadas                                                                                                           |
| ↳ `check:deprecated-versions`  | Relata possíveis versões desatualizadas fora de contextos históricos seguros e datas de atualização desatualizadas, excluindo documentos ignorados                                                                                                                                                                                                                                                                                                                               | Consultoria na fiação CI atual (`--strict` não é aprovado)                                                                                                |
| ↳ `check:doc-links`            | Links de remarcação interna em documentos são resolvidos para arquivos reais (formulário `[text]`/`(path)` )                                                                                                                                                                                                                                                                                                                                                                     | Sim                                                                                                                                                       |
| ↳ `check:fabricated-docs`      | Rotas, env vars, comandos CLI, nomes de ganchos e caminhos de arquivos citados nos documentos existem na base de código. Portão rígido via `--strict`; falha suave sem sinalizador.                                                                                                                                                                                                                                                                                              | Sim (via `--strict` em CI)                                                                                                                                |
| `check:cli-i18n`               | As chaves CLI `t()` usadas existem no `en`; `pt-BR` mantém todas as seções de nível superior; `zh-CN` e `zh-TW` contêm todas as chaves do `en`                                                                                                                                                                                                                                                                                                                                   | Sim                                                                                                                                                       |
| `check:openapi-coverage`       | A especificação OpenAPI cobre pelo menos um piso reduzido de rotas reais                                                                                                                                                                                                                                                                                                                                                                                                         | Sim                                                                                                                                                       |
| `check:openapi-security-tiers` | As anotações `x-loopback-only`/`x-always-protected` declaradas devem ser apoiadas por `routeGuard.ts`; bloco de incompatibilidades de analisador e encaminhamento. A verificação reversa de `x-loopback-only` ausente em prefixos somente locais avisa e as rotas somente padrão são excluídas dessa passagem reversa.                                                                                                                                                           | Parser/forward verifica o bloqueio; aviso de verificação reversa                                                                                          |
| `check:openapi-routes`         | Cada caminho `/api...` no `openapi.yaml` resolve insensivelmente aos parâmetros para uma rota real após a lista de permissões `KNOWN_STALE_SPEC` justificada; entradas obsoletas da lista de permissões também falham                                                                                                                                                                                                                                                            | Sim                                                                                                                                                       |
| `check:docs-symbols`           | As referências internas `/api/...` URL em documentos canônicos não espelhados são resolvidas para uma rota real ou família de rotas; As referências proxy/upstream/placeholder/file e as entradas `KNOWN_STALE_DOC_REFS` justificadas são excluídas, e as entradas obsoletas da lista de permissões falham                                                                                                                                                                       | Sim                                                                                                                                                       |
| `i18n translation drift`       | A admissão absoluta requer zero inconsistências de origem, alvo ausente, hash de destino, tradução obsoleta e cache de seção. A preparação PR comum pode reter evidências herdadas exatas ou uma alteração pendente somente em inglês com estado completo inalterado e bytes de destino; seu relatório declara separadamente a prontidão para mesclagem. Hashes de destino ausentes e bloco de evidências de base incompleto. Um cache de seção herdado ausente não é uma falha. | Todas as cinco classes bloqueiam a admissão queue/base ; a preparação normal permite apenas trabalhos pendentes herdados comprovados ou somente em inglês |

Os doze README SVGs sob `docs/diagrams/` são gerados (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` regenera todos eles). Cada um tem um teste de unidade de comparação de bytes (`tests/unit/docs/readme-*-svg.test.ts`, trabalho `test-unit`) que falha quando o arquivo confirmado está obsoleto e `check:docs-counts` lê números canônicos de seus nós `<text>` —, e é por isso que a etapa de estrutura de tópicos mantém cada string delineada no arquivo como invisível `<text>`. A verificação de números canônicos SVG lê os arquivos listados em `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, mais `public/images/tier-flow-dark.svg` e `tier-flow-light.svg`; as reivindicações de graça para sempre, entrada de catálogo, pool recorrente e fatores de pontuação também são `promise-pillars.svg`, `free-tier-budget.svg` e `strategies-grid.svg`. `free-tier-budget.svg` extrai seus números do carregador de catálogo ativo, portanto, uma alteração no `FREE_MODEL_BUDGETS` ou no nome de exibição de um provedor torna CI vermelho até que esse arquivo seja regenerado.

### Cargo: `i18n-ui-coverage`

| Roteiro                             | Valida                                                                                                                                                                                                   | Bloqueio     |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check-ui-keys-coverage` (em linha) | A cobertura da chave UI i18n é ≥ 65%                                                                                                                                                                     | Sim          |
| `check-ui-value-drift` (em linha)   | Um inglês reescrito **valor** não deixa nenhuma tradução obsoleta para trás                                                                                                                              | Sim          |
| `check-new-key-coverage` (em linha) | UM **novo** A chave em inglês é traduzida em cada localidade — um marcador `__MISSING__:` é rejeitado                                                                                                    | Sim          |
| `check-translation-ratio`           | A proporção de tradução real por localidade (idêntica ao inglês/espaço reservado/folhas ausentes fora da lista de permissões) não deve exceder a folga `config/quality/i18n-translation-baseline.json` + | **Bloqueio** |

Precisa de `fetch-depth: 0` — a porta de desvio de valor compara `en.json` com a base de mesclagem.

#### Porta de tradução obsoleta `check-ui-value-drift` —

Captura aquela regressão que as outras portas estruturalmente não podem ver: um valor em inglês é reescrito e as traduções derivadas do inglês _anterior_ ficam para trás, para que usuários que não falam inglês continuem lendo cópias com palavras confiáveis, agora erradas.

Isso foi enviado de verdade. `oauthModal.googleOAuthWarning` foi reescrito quando o auxiliar de login Antigravity chegou (#5203);**39 de 43 localidades** manteve o texto informando aos operadores para "copiar o URL completo e colá-lo abaixo" — um fluxo que não pode ser concluído para esse provedor. Passou despercebido até #8463 porque:

- `sync-ui-keys` preenche apenas chaves que são **ausente** , nunca aqueles que são **obsoleto** ;
- `check-ui-keys-coverage` conta a _presença_ chave, portanto, uma tradução obsoleta é considerada coberta;
- `check-translation-drift` rastreia a documentação `docs/i18n/<locale>/**.md`, espelha — mas nunca lê `src/i18n/messages/*.json`. Bloqueio no trabalho `docs-sync-strict` desde a ressincronização de 2026-09: edite um documento principal → `npm run i18n:run -- --files=<doc>` (nível de seção, barato).

**Com reconhecimento de diferença, não com base na linha de base.** Ele compara `en.json` na base de mesclagem com a árvore de trabalho; para cada chave cujo valor em inglês foi alterado, qualquer localidade que ainda contenha uma tradução intacta será obsoleta. Isto deliberadamente **congela dívidas pré-existentes** — a diff não pode revelar de qual inglês antigo veio uma tradução de longa data, então o portão julga apenas o que a mudança atual toca. A alternativa (uma linha de base de hash por chave) custaria um arquivo gerado ~ 600 KB, 3 × a maior linha de base existente, produzindo cada i18n PR.

Duas maneiras de satisfazê-lo:

1. atualizar as traduções afetadas ou
2. configure-os para `__MISSING__:<new english>` — o tempo de execução exibe o inglês corrigido (`src/i18n/request.ts::deepMergeFallback`, #7258) e as filas de chaves para tradução.

Se a string for **significado** mudou, prefiro **renomeando a chave** : uma nova chave não pode herdar uma tradução obsoleta. Esse é o padrão usado #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

O desvio de valor e as portas da nova chave compartilham uma comparação imutável do `scripts/i18n/resolve-ui-diff-base.mjs`. O fluxo de trabalho passa o mesmo SHAs base, base-tip e candidato para ambas as verificações. As execuções PR/base-retarget, push e merge-group usam seu contexto de evento. O despacho de uma ramificação candidata requer seu PR aberto exato ou a entrada `i18n_base_sha` explícita. Despacho ou observação agendada de `main` ou `release/vX.Y.Z` sem essa entrada compara o último commit com seu primeiro pai; não se trata de uma auditoria de todas as dívidas de tradução herdadas. A invocação local requer uma base de comparação explícita, por exemplo, o comando `BASE_REF` acima.

Contexto de comparação ausente ou ambíguo, um catálogo obrigatório ilegível ou inválido e um candidato alterado produzem `INCOMPLETE` com código de saída **2** , inclusive no modo de aviso. As leituras de catálogo usam `scripts/i18n/read-ui-catalog.mjs`; falhas de leitura não são substituídas por objetos vazios. Nem uma base indisponível nem uma entrada incompleta estabelecem PASS.

### Cargo: `i18n`

Matriz de validação i18n completa (um trabalho por localidade). Todo o trabalho é consultivo.

| Roteiro                         | Valida                                | Bloqueio                                                      |
| ------------------------------- | ------------------------------------- | ------------------------------------------------------------- |
| `validate_translation.py quick` | Completude da tradução por localidade | **Consultivo** (`continue-on-error: true` em todo o trabalho) |

### Cargo: `pr-test-policy`

É executado apenas em solicitações pull.

| Roteiro                | Valida                                                                                                                              | Bloqueio |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | PRs que alteram o código de produção em `src/`, `open-sse/`, `electron/` ou `bin/` devem incluir ou atualizar testes (Hard Rule #8) | Sim      |
| `check:test-masking`   | Os arquivos de teste alterados não reduzem a contagem de declarações líquidas nem adicionam tautologias `assert.ok(true)`           | Sim      |
| `check:pr-evidence`    | O órgão PR cita evidências test/VPS para a mudança (mecaniza o Hard Rule #18 ao usar prosa PR — frágil, consulte Backlog)           | Sim      |

### Cargo: `test-vitest`

Precisa do trabalho de classificação `changes`. Os fragmentos de matriz aplicáveis bloqueiam a mesclagem em caso de falha.

| Suíte            | Valida                                                           | Bloqueio                                                                                                                    |
| ---------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Servidor MCP (110 ferramentas), autoCombo, cache — vitest runner | Sim                                                                                                                         |
| `test:vitest:ui` | Componente UI testa corredor — vitest                            | **Bloqueio** As falhas pré-existentes — são explicitamente excluídas no `vitest.config.ts`; novas falhas falham no trabalho |

### Fluxos de trabalho noturnos (agendados, consultivos)

Eles são executados em uma programação cron (e `workflow_dispatch`), nunca em PRs. Todos são consultivos.

| Fluxo de trabalho      | Valida                                                                                                                                                                       | Bloqueio       |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | testes de propriedade de verificação rápida com uma contagem de alta execução + de semente aleatória                                                                         | **Consultivo** |
| `nightly-resilience`   | porta de crescimento de heap, injeção de falha de caos, k6 load/soak                                                                                                         | **Consultivo** |
| `nightly-llm-security` | proteção de injeção promptfoo (modo de bloqueio) sondas garak + (ignoradas sem segredo do provedor)                                                                          | **Consultivo** |
| `nightly-schemathesis` | Fuzzing de contrato OpenAPI (esquematese) contra um OmniRoute ativo usando `docs/openapi.yaml` Violações de especificações de superfícies — / 500s não tratados (Fase 8 B.4) | **Consultivo** |
| `nightly-mutation`     | A pontuação do teste de mutação Stryker sobre a via rápida da unidade — mutantes sobreviventes superam afirmações fracas                                                     | **Consultivo** |
| `nightly-compat`       | Matriz de compatibilidade do mecanismo de nó nas faixas `engines.node` suportadas                                                                                            | **Consultivo** |

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
