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

## Inventário de portas e perfis de execução

### Admissão de candidato

Os fluxos de trabalho CI e Quality Gates emitem, cada um, um veredicto estável: `Gate / CI` e `Gate / Quality`. A sua política de admissão versionada enumera todos os trabalhos a montante, conforme necessário ou consultivo. Um trabalho obrigatório aplicável deve ser bem-sucedido: resultados em falta, cancelados, ignorados, pendentes e desconhecidos não podem estabelecer PASS. Uma classificação válida apenas para documentos ou apenas para catálogo pode tornar uma linha de código inaplicável; um projeto comum PR não é um candidato aceite. Um rótulo `hotfix` não dispensa provas.

Ambos os fluxos de trabalho abrangem PRs em ramificações main/release, envios para `main`, envio manual e eventos de grupo de fusão. Push, dispatch e merge-group executam a seleção completa. Um rascunho de fila fiável do Mergify também executa trabalhos `full-code`/`full-code-e2e` aplicáveis; PRs comum ignora-os. Antes de uma fusão manual, execute um despacho completo no candidato exato. Os pushes para `release/**` não iniciam estes fluxos de trabalho; Release-Green observa a base fundida separadamente (`docs/ops/RUNNER_BOX.md` → Hosted lane). As bifurcações e os grupos de fusão utilizam executores alojados para trabalhos que, de outra forma, selecionam executores auto-hospedados; capacidade alojada suficiente deve ser verificada antes da implementação.

Um PR comum executa a seleção rápida. As pistas `full-code` e `full-code-e2e` da política de admissão (E2E, integração, artefacto de pacote, Electron smoke, Bun SQLite, ecossistema e clientes de protocolo) são executadas apenas num rascunho de fila Mergify ou numa execução completa: `gh workflow run ci.yml --ref <branch>`.

Cada recibo JSON identifica o SHA verificado, a execução do workflow e a tentativa. O CLI rejeita uma incompatibilidade checkout/event SHA. Os testes de fluxo de trabalho ligam a associação à política à lista `needs` do trabalho de veredicto, para que uma faixa nova ou removida não possa desaparecer silenciosamente. Os recibos cobrem o seu próprio fluxo de trabalho, não publicação, implementação ou aspetos internos de um scanner de consultoria existente. Fazer as verificações aplicáveis exigidas nas regras da filial é uma alteração administrativa separada; definir os seus postos de trabalho não protege, por si só, uma filial.

`API Route Typecheck` é uma verificação de fluxo de trabalho independente, fora dos veredictos agregados e do perfil estático completo do observador local. Inspecione o seu resultado separadamente para o candidato exato. `.github/workflows/api-route-typecheck.yml` é executado em PRs em `main` ou `release/**`, envia para a família de ramos, despacho manual e eventos `merge_group` do tipo `checks_requested`. Não possui filtro de percurso. Mesclar grupos, consultar `merge_group.head_sha`; outros eventos consulte `github.sha`. Todos os eventos utilizam a mesma porta de diagnóstico API e testes de unidade de porta. Os redireccionamentos básicos PR solicitam uma nova verificação; As edições body/title utilizam o nome apenas de observação `Admission not requested / API Route Typecheck` e não podem substituir a verificação de admissão.

### Evidências retidas no redutor de aceitação

`scripts/quality/validate-release-acceptance.mjs` reduz um plano fornecido e os seus manifestos; não estabelece que o plano cubra todo o pipeline de lançamento. Os seus relatórios definem explicitamente `releaseAcceptance: false`, mesmo quando esse plano é `VERIFIED`. O fluxo de trabalho `release-acceptance.yml` ainda utiliza acessórios de sombra, e não recibos reais de construção, pacote, arranque ou promoção.

O CLI exige que `--evidence-root` verifique as provas retidas. Os ficheiros são resolvidos como `<evidence-root>/<artifact_id>/<member>` e com hash como SHA-256. Um registo PASS sem evidência, um ficheiro em falta ou alterado, um caminho inseguro ou um link simbólico impedem a verificação. Os ficheiros em falta não são equivalentes a registos vazios bem-sucedidos. As verificações SHA/run/attempt existentes permanecem independentes: os bytes correspondentes não podem resgatar um recibo obsoleto. A integridade do arquivo não é prova de autenticidade de execução ou promoção de artefacto.

### DAST consome a versão verificada CI

O trabalho `dast-smoke` CI necessário chama `.github/workflows/dast-smoke.yml` após `build`. Segue a mesma seleção code/draft da compilação, incluindo fork PRs compatível, PRs de destino de lançamento e grupos de fusão. Uma tarefa DAST em falta, com falha, cancelada ou ignorada inesperadamente bloqueia `Gate / CI`. O fluxo de trabalho reutilizável não possui um gatilho PR/dispatch independente; a validação manual utiliza o despacho do CI para que a construção e o consumidor permaneçam numa única execução.

`scripts/ci/next-build-provenance.mjs` sela o artefacto Next completo com o seu resumo tar, repository/event/run, tentativa de produtor, head/base/checkout/tree, identidades de fluxo de trabalho, ficheiro de bloqueio, Nó exato version/ABI, plataforma e empacotador. DAST seleciona o artefacto imutável ID do `needs.build.outputs`, exige a verificação do resumo de download e faz o hash independente do ZIP em relação ao resumo do produtor antes de extrair os seus dois membros da lista de permissões através `scripts/ci/unpack-ci-build.py`. O manifesto e o ficheiro tar também devem corresponder às saídas do produtor independente antes de a próxima árvore ser extraída. Nunca procura a última versão de branch bem-sucedida. Uma reexecução parcial pode reutilizar a mesma tentativa do produtor quando o seu ID e todas as entradas ainda correspondem; o recibo regista ambas as tentativas.

O consumidor permanece num executor Linux alojado com permissão de repositório de leitura apenas e sem segredos de repositório. Instala a versão exacta do Node do produtor e depois monta o CLI com `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` rejeita um servidor independente em falta antes de qualquer compilação substituta; compilações CLI locais normais mantêm o seu substituto existente. A prontidão do servidor, o Schemathesis e o promptfoo devem ser bem-sucedidos dentro do limite de trabalho inalterado de 25 minutos. Um recibo de proveniência comprova a identidade e os bytes de entrada, e não uma verificação DAST bem-sucedida. A expiração do artefacto, a interrupção do executor ou um scanner com falha permanecem provas incompletas ou com falha; não pode tornar-se PASS através de um wrapper consultivo.

### Capacidade de execução UI

CI executa o inventário completo UI como quatro fragmentos de matriz `test-vitest`, cada um com um máximo de dois trabalhadores por fragmento e o período de trabalho existente de 15 minutos. O primeiro fragmento também executa o conjunto MCP/autoCombo Vitest. O resultado do trabalho necessário abrange todas as etapas da matriz; a falha ou cancelamento de um fragmento não pode estabelecer a admissão do candidato.

O observador noturno retém um recibo de candidato exato separado para cada fragmento UI, incluindo a execução MCP no primeiro recibo. Todos os quatro recibos, registos e identidades de execução correspondentes são obrigatórios. `npm run test:vitest:ui` local ainda seleciona o conjunto completo; uma execução `--shard` é apenas uma evidência parcial.

### Cobrança de cobertura unitária

Os doze fragmentos de unidade recolhem a cobertura V8 durante a execução de teste existente. Um fragmento bem-sucedido executa `scripts/ci/compact-v8-coverage.mjs` para comprimir os ficheiros originais sem gerar um relatório intermédio de Istambul. O trabalho de cobertura final verifica todos os doze manifestos em relação ao SHA candidato, tempo de execução, raiz de origem e hashes de dados e, em seguida, executa os repórteres do c8 e os limites de cobertura existentes. As entradas mantêm a ordem global dos nomes dos ficheiros do c8; A pré-fusão por fragmentos não é segura para a cobertura mista function/block. Fragmentos ausentes, malformados ou incompatíveis falham a admissão. Os fragmentos de teste com falha retêm a cobertura de diagnóstico em bruto separadamente; não pode entrar na fusão final.

### Recibos de progresso de execução da unidade

O comando `test:unit:ci:shard` partilhado regista as fases `primary`, `dashboard` e `serial` através `scripts/ci/unit-progress-reporter.mjs`. O relatório de teste normal continua disponível. Um recibo separado apenas de metadados regista o início e a conclusão de cada ficheiro, e uma pulsação de 30 segundos lista os ficheiros ainda ativos e o seu tempo decorrido. Apenas regista metadados de execução permitidos; descrições de teste, saída, corpos de erro e o ambiente completo não são serializados.

CI retém os ficheiros JSONL como `unit-progress-ci-<run>-<attempt>-<shard>`. Um tempo limite de trabalho pode impedir o upload posterior; os batimentos cardíacos já emitidos permanecem como evidência diagnóstica. Pulsações em falta também podem refletir um processo de execução bloqueado ou terminado. Estes recibos preservam a seleção de testes, a simultaneidade, os prazos e o estado de saída existentes; não são veredictos de admissão de candidatos.

### Mesclar fila

O rótulo `queue` envia um PR para a fila Mergify (`.mergify.yml`). Mergify abre um rascunho PR numa ramificação `mergify/merge-queue/`, CI executa a seleção completa aí e o PR original funde-se quando `Gate / CI`, `Gate / Quality` e `Merge integrity (changelog + generated skills)` são aprovados.

O Mergify escreve o resumo da fila na descrição do rascunho. Os eventos Body/title-only `pull_request` `edited` utilizam um grupo de simultaneidade específico de execução e não executam novamente a classificação, as matrizes de teste, a integridade de fusão ou o veredicto de admissão. Os nomes de verificação apenas de observação não podem substituir `Gate / CI` ou `Gate / Quality`. Uma edição que altere a base de destino solicita uma nova validação de candidato.

Após um desenfileiramento, um push nem sempre recoloca o PR na fila. Comente `@mergifyio queue` sobre isso.

### Inventário de verificação estática

O inventário npm-alias versionado e a associação de varrimento estático residem no `config/quality/gate-manifest.json`. Execute `npm run check:gate-manifest` para validar nomes de scripts e comandos exatos em relação `package.json`; adições, remoções e desvios de comando falham tanto no gancho local como nos trabalhos de classificação de mudança no CI. Um alias não é um trabalho de fluxo de trabalho, uma instância de matriz ou um caso de teste: estas contagens não devem ser apresentadas como intercambiáveis.

Utilize `npm run quality:scan -- --list` ou `npm run quality:scan:fast -- --list` para inspecionar os alias selecionados sem os executar. O executor invoca o ponto de entrada npm, pelo que o seu tempo de execução (incluindo Bun quando configurado) é preservado. O manifesto regista os alias fora destes perfis, conforme invocados separadamente, e os comandos de manutenção são proibidos nos perfis de varrimento de leitura apenas.

Estes perfis abrangem apenas a verificação estática. Não certificam testes de produtos, cobertura, embalagem, verificações externas ou aceitação total da libertação de um candidato. A admissão do fluxo de trabalho utiliza o `config/quality/admission-policy.json` e `scripts/quality/admission-verdict.mjs` ligados. Os perfis dos observadores de lançamento permanecem separados; inspecionar os seus cheques e recibos aplicáveis de forma independente. Os comandos estáticos completos do observador são declarados em `config/quality/release-green-static-profile.json`, incluindo `audit:deps`, seleção de teste de mutação e verificações de tradução. O carregador valida os comandos npm em relação package.json e às declarações modeladas CI/Quality ; rejeita o desvio em vez de executar tokens de shell como argumentos. A saída SKIP/INCOMPLETE do scanner necessária não consegue estabelecer PASS. O perfil regista as suas exclusões externas e não substitui a cobertura alojada, matrizes de teste, pacote ou evidência de implementação. O inventário em prosa abaixo é uma referência, não uma prova de que um portão realmente funcionou.

Os guiões vivem sob `scripts/check/` (portões de política) e `scripts/quality/` (mecanismo de roquete). A fonte da verdade CI é `.github/workflows/ci.yml`.

### Integridade da documentação de base publicada

`.github/workflows/i18n-base-health.yml` observa a integridade da documentação após os envios selecionados para `main` e `release/v*` e no envio manual. Os seus filtros cobrem a documentação, o Markdown root, `llm.txt`, a tradução state/configuration e as ferramentas i18n relevantes. O trabalho único `Published base documentation health` utiliza o Ubuntu alojado e um prazo de cinco minutos. Executa a validação de leitura apenas e grava um recibo de diagnóstico sem instalação de dependência, tradução ou adoção de estado.

`scripts/i18n/check-base-health.mjs` requer zero inconsistências de hash de origem, alvo em falta, hash de destino, tradução obsoleta e cache de secção. Valida também o âmbito central atual document/locale e a sua procedência registada. Contexto inválido, cobertura incompleta ou verificador interrompido produz `INCOMPLETE`; a deriva confirmada produz `FAIL`. Ambos devolvem um estado de saída com falha. O recibo está ligado ao SHA checkout , workflow, execução e tentativa, e é retido como `i18n-base-health-<sha>-<run>-<attempt>`.

Esta é uma observação independente da base publicada. Não adiciona um evento PR ou de grupo de fusão, uma verificação PR necessária, um alias npm ou um membro do perfil de varrimento estático. O verificador subjacente também bloqueia todas as cinco classes em modo absoluto. A preparação normal PR permanece separada da admissão. Um carregamento bem-sucedido não pode transformar um resultado de integridade com falha em PASS.

Um PR comum utiliza `--preflight` com um relatório base gerado pelo `--baseline-evidence`. Pode deixar uma fonte em inglês pendente apenas quando o registo completo da tradução e os bytes de destino reais permanecem inalterados em relação a essa base exata. Novas inconsistências de alvo ou cache de secção ainda bloqueiam e as provas incompletas não podem autorizar a preparação. O relatório expõe `preparationPending` e `mergeReady` separadamente: a preparação bem-sucedida não torna as traduções pendentes prontas a serem fundidas. Atualize os espelhos afetados no candidato composto antes da admissão. O candidato fiável à fila Mergify, `merge_group`, push de ramificação e execuções manuais CI utilizam o verificador absoluto, sem `--warn` ou perdão de falha herdada. Os hashes de destino em falta e um âmbito reduzido por ficheiros principais gravados eliminados não podem produzir um veredicto absoluto bem-sucedido.

### Libertar atalho PR (`quality.yml`)

`.github/workflows/quality.yml` complementa CI em main/release PRs, envia para `main`, despacha e junta grupos. PRs utiliza verificações rápidas filtradas por caminho. A compilação duplicada permanentemente desativada foi removida; as verificações reais build/package/boot permanecem no CI. O conjunto de unidades e o vitest apenas são executados em CI (`Unit Tests (N/12)` e `Vitest`).

| Trabalho                                         | Âmbito                                                                                                                                                                                                                                          | Bloqueio              |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; Documentos API referências e documentos-tudo                                                                                                                                                                                     | Sim                   |
| `Fast Quality Gates`                             | Código PRs; verificações estáticas, verificação de tipo, verificação de tipo de painel, testes de unidade impactados                                                                                                                            | Sim                   |
| `Forgotten sibling tests`                        | Código PRs; módulos alterados rastreados para consumidores estáticos e testes de irmãos candidatos; os caminhos barril e de importação dinâmica são reportados como diagnósticos consultivos, com exceções de lista de permissões referenciadas | **Consultivo**        |
| `No new ESLint warnings`                         | Código PRs; protetor de cotão com reconhecimento de supressão                                                                                                                                                                                   | Sim, incluindo garfos |
| `Merge integrity (changelog + generated skills)` | PRs sem rascunho; changelog e sincronização de competências geradas                                                                                                                                                                             | Sim, incluindo garfos |

#### Relatório de testes de irmãos esquecidos

`npm run check:forgotten-sibling-tests` é executado como uma etapa consultiva do `Fast Quality Gates` e reutiliza o resolvedor de importação por trás do mapa de impacto de teste. Para cada módulo de produção alterado, reporta cadeias `changed module/symbol -> static consumer -> candidate sibling test` determinísticas quando o teste candidato está ausente da comparação de pull request. O resumo do Markdown e o resultado JSON são retidos como artefacto de fluxo de trabalho `forgotten-sibling-tests` para calibração antes de qualquer implementação de bloqueio.

As reexportações em barril e as importações dinâmicas são apenas diagnósticos de resolução; nunca criam uma descoberta bloqueadora. As exceções revistas residem no `config/quality/forgotten-sibling-allowlist.json`. Cada entrada deve nomear o teste do consumidor e do candidato, fornecer uma justificação específica e ligar um problema GitHub ou pull request. As entradas malformadas falham no fecho. As exceções não podem suprimir um teste candidato excluído ou uma comparação que adicione `.skip`/`.todo`; o enfraquecimento das asserções e outros mascaramentos continuam a pertencer ao portão `check:test-masking` de bloqueio independente.

### Cargo: `lint`

Funciona em todos PR até `main`. Os blocos fundem-se em caso de falha.

| Roteiro (`npm run ...`)           | Valida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Bloqueio                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| `check:node-runtime`              | A versão Node.js está dentro do intervalo suportado                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sim                                        |
| `check:cycles`                    | Importações circulares em todo o `src/` + `open-sse/` (baseado em AST, tsconfig `paths` resolvido). Bare sai 1 sempre que existe algum ciclo (fechado com falha desde #15281) e lista o SCCs. `check:cycles:ratchet` (o que CI executa) bloqueia quando a contagem excede o `metrics.cycles` tecto em `quality-baseline.json` — actualmente 14, `direction: down`, pelo que só pode cair (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Sim (roquete)                              |
| `check:boundary`                  | Acoplamento `open-sse → src` : importações únicas de ficheiro para ficheiro do motor para a aplicação (`scripts/quality/measure-boundary.mjs`; a lista de arestas é o backlog de remediação core/module-split v4). Relatório consultivo = simples (igual ao `quality:boundary`). `check:boundary:ratchet` (o que CI executa, também no loop de roquete de portas rápidas `quality.yml` ) bloqueia quando a contagem excede o `metrics.boundaryOpenSseToSrc` tecto em `quality-baseline.json` — semeado no 771 medido, `direction: down`; `--update` apenas diminui; relativo à base em PRs (`--base-ref`, ver abaixo)                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sim (roquete)                              |
| `check:route-validation:t06`      | Esquemas Zod presentes em todas as rotas (política de nível 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Sim                                        |
| `check:any-budget:t11`            | A contagem `@ts-expect-error // any` não excede o orçamento (Catraca Nível 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Sim                                        |
| `check:provider-consistency`      | Cada fornecedor no `providers.ts` tem uma entrada correspondente no `providerRegistry.ts` (e vice-versa, dentro da lista de permissões)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Sim                                        |
| `check:model-lifecycle`           | As três tabelas de encaminhamento mantidas manualmente permanecem consistentes com o instantâneo do ciclo de vida verificado (#11503): `FITNESS_TABLE` (`taskFitness.ts`) não pontua nenhum ID retirado que `REGISTRY` possa encaminhar; cada destino `BUILT_IN_ALIASES` está presente no `REGISTRY` e ausente do instantâneo de id retirado; todo o id levantado ainda no `REGISTRY` é encaminhado ou listado no `allowedRetiredInCatalog`; e nenhuma origem ou destino `DEFAULT_DEGRADATION_MAP` aparece desativado nesse instantâneo. Isto não prova que um modelo seja atualmente servido por um upstream ativo. — offline é comparado ao `config/quality/model-lifecycle.json`, atualizado manualmente com `npm run quality:refresh-model-lifecycle` (rede; não ligado ao CI). `allowedRetiredInCatalog` é uma roquete de queima: adicione uma entrada apenas com o problema de seguimento.                                                                                                                                                                         | Sim                                        |
| `check:fetch-targets`             | Cada `fetch("/api/...")` no `src/` do lado do cliente é resolvido para um `route.ts` real                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sim                                        |
| `check:deps`                      | Todas as dependências `npm install` -able em cada `package.json` do repositório estão em `dependency-allowlist.json`; novos pacotes não fixados ou desocupados sinalizados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Sim                                        |
| `audit:deps`                      | auditoria npm de todos os cinco ficheiros de bloqueio independentes (root, Electron, plug-ins OpenCode, v1/v2 e provider). Bloco de avisos críticos; avisos elevados permanecem avisos visíveis. As auditorias Missing/failed são INCOMPLETE e bloco; hashes e os relatórios de bloqueio por âmbito são retidos.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Sim                                        |
| `check:lockfile`                  | Integridade `package-lock.json` Registo https —, hashes de integridade, sem substituições de host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sim                                        |
| `check:licenses`                  | Lista de permissões de licença SPDX para dependências de produção                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sim                                        |
| `check:tracked-artifacts`         | Sem artefactos de construção/ligações simbólicas `node_modules` confirmadas (também é executado em pré-confirmação husky; pré-push é intencionalmente leve — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sim                                        |
| `check:ai-attribution`            | Nenhum trailer AI/bot `Co-Authored-By` ou rodapé de geração de IA em commits PR, título ou corpo — Hard Rule #16 (no loop de fast-gates `quality.yml` para PR→ `release/**` — lê a carga útil do evento, no-op off PRs — e uma etapa somente PR em `ci.yml` lint para PR→ `main`; também o gancho husky `commit-msg` ; coautores humanos permitidos; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:vitest-exclusions`         | Cada eliminação Vitest nomeia um problema de rastreio e aparece no `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sim                                        |
| `check:file-size`                 | Os ficheiros de origem (`.ts`/`.tsx` em `src/`, `open-sse/`, `electron/`, `bin/`) estão no `cap` e os ficheiros de teste (`*.test.ts(x)`) no `testCap`; os ficheiros congelados em `file-size-baseline.json` (`frozen` / `testFrozen`) não devem ultrapassar o tamanho registado                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Sim                                        |
| `check:error-helper`              | As respostas de erro no executors/handlers usam `buildErrorBody()` / `sanitizeErrorMessage()` (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Sim                                        |
| `check:migration-numbering`       | Os ficheiros SQL de migração são numerados sequencialmente, sem lacunas ou duplicados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sim                                        |
| `check:public-creds`              | Sem chave OAuth `client_id`/`client_secret` ou Firebase Web literal fora do `publicCreds.ts` (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sim                                        |
| `check:db-rules`                  | Nenhum SQL em bruto fora dos módulos `src/lib/db/` ; sem importações de barris do `localDb.ts` (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sim                                        |
| `check:known-symbols`             | Os executores fornecedores, as estratégias de encaminhamento e os tradutores registados nas suas tabelas de despacho correspondem aos ficheiros no disco — sem símbolos órfãos ou não declarados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Sim                                        |
| `check:route-guard-membership`    | Toda a rota que gera um processo filho é classificada por `isLocalOnlyPath()` (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Sim                                        |
| `check:test-discovery`            | Cada ficheiro `*.test.ts` / `*.spec.ts` no repositório é recolhido por pelo menos um executor de testes (catraca: a lista órfã no `test-discovery-baseline.json` só pode diminuir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Sim                                        |
| `check:test-tla-order`            | Nenhum ficheiro `node:test` no `tests/unit` regista um teste, atinge um `await` de nível superior e regista mais (#18045; roquete: `test-tla-order-allowlist.json` só pode encolher)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sim                                        |
| `check:agent-skills-sync`         | Os artefactos de habilidades do agente gerados correspondem ao seu catálogo de origem (sem desvios)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:provider-asset-provenance` | O fornecedor logos/assets carrega uma entrada de origem registada                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `lint:json`                       | Os ficheiros de configuração JSON analisam e satisfazem as regras do repositório lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `typecheck:core`                  | Compilação TypeScript sem erros (apenas avisos de aconselhamento)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sim                                        |
| `typecheck:noimplicit:core`       | Estrito `noImplicitAny` — virado para o futuro; muitos call sites pré-existentes ainda precisam de anotações                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | **Consultivo** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` com âmbito definido para `src/app/(dashboard)/**` (#7033) — A lista de permissões de 27 ficheiros com curadoria do `typecheck:core` não inclui nenhum painel TSX, e `next build` também nunca verifica o tipo (`next.config.mjs` define `ignoreBuildErrors: true`), pelo que as regressões de identificadores órfãos (#6625/#6909) eram invisíveis para CI. Diferenças em relação a uma linha de base de contagem per-file/per-TS-code congelada (`config/quality/dashboard-typecheck-baseline.json`, mesmo padrão de aplicação obsoleta de `check:known-symbols`) — apenas Os erros NEW para além da contagem de linha de base falham no portão; reduza o `--update` quando um erro pré-existente for corrigido.                                                                                                                                                                                                                                                                                                                                                  | Sim                                        |
| `check:build-typecheck`           | A verificação do tipo de produção de aplicações inteiras no `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), a lista de permissões de 27 ficheiros do `typecheck:core` de superfície e a porta do painel não cobrem. Diferenças contra `config/quality/build-typecheck-baseline.json`; uma contagem nova ou aumentada por (ficheiro, código) falha, uma contagem mais baixa solicita que aumente. `--update` recusa enquanto a execução contém um par novo ou elevado, a menos que `--force-regressions` seja aprovado, e recusa um ficheiro recentemente silenciado, a menos que `--force-nocheck` seja aprovado, pelo que alargar a linha de base para ficar verde e conceder um silêncio permanente são dois atos deliberados separados. Um `--force` simples é rejeitado. Verifica também o âmbito de construção do `@ts-nocheck` em relação ao `config/quality/ts-nocheck-baseline.json`, porque um ficheiro que o utiliza não reporta qualquer diagnóstico e, de outra forma, seria invisível para todos os portões. | Sim                                        |

#### Dois programas de verificação de tipo respondem de forma diferente

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) e `check:build-typecheck` compilam programas diferentes sob diferentes opções, e o mesmo ficheiro pode estar limpo num e cheio de erros no outro.

`tsconfig.build.json` define `"strict": false`, então `noImplicitAny` está desativado. A configuração principal compila uma lista de permissões de 27 ficheiros com opções mais restritas e segue o gráfico de importação de cada entrada, para que os ficheiros que nunca aparecem no programa de compilação ainda sejam verificados aí.

A consequência é importante ao julgar se um ficheiro é digitado:**zero diagnóstico sob `check:build-typecheck` não significa zero** . A remoção `@ts-nocheck` de 26 ficheiros mostrou 23 deles limpos no programa de construção; dezasseis deles revelaram cerca de 120 erros implícitos no estrito. Verifique ambos antes de chamar um ficheiro limpo.

### Cargo: `quality-gate`

Corre após `test-coverage`. Os blocos fundem-se em caso de falha.

| Argumento                    | Valida                                                                                                                                                                | Bloqueio                       |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `quality:collect`            | Emite `quality-metrics.json` (contagem de avisos ESLint, cobertura do relatório de fragmentos fundidos)                                                               | Sim (a montante do torniquete) |
| `quality:ratchet`            | Cada métrica no `quality-baseline.json` não regrediu (linha de base ESLint para os avisos ≤ ; linha de base ≥ para a cobertura)                                       | Sim                            |
| `check:duplication`          | A duplicação de código (jscpd@4) não excede a linha de base no `quality-baseline.json`                                                                                | Sim                            |
| `check:complexity`           | A complexidade ciclomática ao nível do ficheiro não excede o limite (núcleo ESLint `complexity` + `max-lines-per-function`)                                           | Sim                            |
| `check:cognitive-complexity` | Torniquete de complexidade cognitiva (`eslint-plugin-sonarjs`) — passagem ESLint separada; CI executa ambos fundidos como uma única etapa `check:complexity-ratchets` | Sim                            |
| `check:dead-code`            | Torniquete de exportações/ficheiros não utilizados (knip) não regride em relação à linha de base                                                                      | Sim                            |
| `check:compression-budget`   | O orçamento de referência de compressão — por mecanismo de poupança de tokens não deve regredir                                                                       | Sim                            |
| `check:type-coverage`        | A roquete digitada por percentagem (`type-coverage`) não regride; inclui em grande parte `typecheck:noimplicit:core`                                                  | Sim                            |

### Empregos: `codeql-scan` e `codeql-admission`

`codeql-scan` produz todas as categorias de análise configuradas. Após o sucesso do trabalho, `codeql-admission` valida os seus uploads exatos e o torniquete de alerta do candidato. Ambas são dependências obrigatórias do `Gate / CI`, incluindo os candidatos apenas para documentos. A ativação administrativa e os requisitos canário estão descritos em "CodeQL torniquete " abaixo.

| Argumento              | Valida                                                                                                                                                                                                                      | Bloqueio |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:codeql-ratchet` | ref/SHA candidato e todas as categorias de análise configuradas devem estar atualizadas antes do torniquete do alerta; blocos de evidência em falta. O inventário global permanece separado —, ver "catraca CodeQL " abaixo | Sim      |

### Cargo: `quality-extended`

O trabalho bloqueia os candidatos aplicáveis. O tamanho do pacote, as descobertas secretas, as descobertas de vulnerabilidade, as descobertas de fluxo de trabalho e as alterações OpenAPI são verificadas com os torniquetes necessários. Os diagnósticos de dependência circular permanecem consultivos. A instalação do scanner é necessária: `scripts/ci/install-quality-scanners.sh` aprovisiona as versões fixadas e propaga as falhas de instalação. Ferramentas em falta, relatórios inválidos ou linhas de base em falta deixam o portão do scanner necessário INCOMPLETE.

| Argumento                | Valida                                                                                                                                                                                                                                  | Bloqueio                                              |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `check:circular-deps`    | Sem dependências circulares (dpdm)                                                                                                                                                                                                      | **Consultivo**                                        |
| `check:bundle-size`      | O tamanho do pacote não excede o limite; uma medição indisponível falha                                                                                                                                                                 | **Bloqueio com --ratchet**                            |
| `check:secrets`          | As descobertas do Gileaks não regridem; verificações necessárias rejeitam tools/source/baseline em falta, verificações com falhas e relatórios inválidos                                                                                | **Bloqueio com --ratchet**                            |
| `check:vuln-ratchet`     | As vulnerabilidades de dependência não regridem; as verificações necessárias rejeitam ferramentas em falta, relatórios inválidos ou linhas de base em falta                                                                             | **Bloqueio com --ratchet**                            |
| `check:workflows`        | Lint de workflow (actionlint + zizmor); Os scanners missing/broken, os relatórios inválidos ou a linha de base da catraca em falta falham como INCOMPLETE. As descobertas válidas seguem a política strict/advisory/ratchet selecionada | Execução necessária; bloqueio de roquete zizmor em CI |
| `check:openapi-breaking` | Contrato público API contra commits de eventos fixados (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); medição necessária falha fechada                                                         | **Bloqueio com --ratchet**                            |

### Cargo: `docs-sync-strict`

Para pedidos pull para `main` ou `release/**`, este trabalho é executado apenas para candidatos não rascunhos (ou fila fidedigna) classificados como documentação ou alterações de código. Também funciona em eventos CI não PR; o disparo push deste fluxo de trabalho cobre apenas `main`, não `release/**`. Uma etapa que sai diferente de zero bloqueia o trabalho; as constatações apenas de relatório e as isenções documentadas abaixo não o fazem.

| Argumento                      | Valida                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Bloqueio                                                                                                                                                 |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-gate que executa os 7 sub-gates abaixo sequencialmente                                                                                                                                                                                                                                                                                                                                                                                                                         | Sim                                                                                                                                                      |
| ↳ `check:docs-sync`            | Consistência da versão Package/OpenAPI/CHANGELOG, espelhos `llm.txt` exactos, invariantes CHANGELOG section/size traduzidos e ausência de documentos duplicados substituídos                                                                                                                                                                                                                                                                                                        | Sim                                                                                                                                                      |
| ↳ `check:docs-frontmatter`     | As páginas de documentação compiladas possuem títulos de frontmatter válidos                                                                                                                                                                                                                                                                                                                                                                                                        | Sim                                                                                                                                                      |
| ↳ `check:docs-counts`          | Os invariantes de contagem de alta confiança são estritos; as verificações heurísticas de contagem de ficheiros apenas avisam, a menos que o script receba `--strict` (o meta-gate CI não passa)                                                                                                                                                                                                                                                                                    | Bloqueio estrito de níveis; consultoria de nível flexível                                                                                                |
| ↳ `check:env-doc-sync`         | Leituras do ambiente de origem, `.env.example` e `docs/reference/ENVIRONMENT.md` concordam após as listas de permissões explícitas ignorar, apenas documento e apenas ambiente                                                                                                                                                                                                                                                                                                      | Sim, fora das listas de permissões documentadas                                                                                                          |
| ↳ `check:deprecated-versions`  | Reporta possíveis versões desatualizadas fora de contextos históricos seguros e datas de atualização desatualizadas, excluindo documentos ignorados                                                                                                                                                                                                                                                                                                                                 | Consultoria na cablagem CI atual (`--strict` não está aprovado)                                                                                          |
| ↳ `check:doc-links`            | As ligações de remarcação interna em documentos são resolvidas para ficheiros reais (formulário `[text]`/`(path)` )                                                                                                                                                                                                                                                                                                                                                                 | Sim                                                                                                                                                      |
| ↳ `check:fabricated-docs`      | Rotas, env vars, comandos CLI, nomes de ganchos e caminhos de ficheiros citados nos documentos existem na base de código. Portão rígido via `--strict`; falha suave sem sinalizador.                                                                                                                                                                                                                                                                                                | Sim (via `--strict` em CI)                                                                                                                               |
| `check:cli-i18n`               | As chaves CLI `t()` utilizadas existem no `en`; `pt-BR` mantém todas as secções de nível superior; `zh-CN` e `zh-TW` contêm todas as chaves do `en`                                                                                                                                                                                                                                                                                                                                 | Sim                                                                                                                                                      |
| `check:openapi-coverage`       | A especificação OpenAPI cobre pelo menos um piso reduzido de percursos reais                                                                                                                                                                                                                                                                                                                                                                                                        | Sim                                                                                                                                                      |
| `check:openapi-security-tiers` | As anotações `x-loopback-only`/`x-always-protected` declaradas devem ser apoiadas por `routeGuard.ts`; bloco de incompatibilidades de analisador e encaminhamento. A verificação inversa de `x-loopback-only` em falta nos prefixos apenas locais avisa e as rotas apenas padrão são excluídas desta passagem inversa.                                                                                                                                                              | Parser/forward verifica o bloqueio; aviso de verificação inversa                                                                                         |
| `check:openapi-routes`         | Cada caminho `/api...` no `openapi.yaml` resolve insensivelmente aos parâmetros para uma rota real após a lista de permissões `KNOWN_STALE_SPEC` justificada; as entradas obsoletas da lista de permissões também falham                                                                                                                                                                                                                                                            | Sim                                                                                                                                                      |
| `check:docs-symbols`           | As referências internas `/api/...` URL em documentos canónicos não espelhados são resolvidas para uma rota real ou família de rotas; As referências proxy/upstream/placeholder/file e as entradas `KNOWN_STALE_DOC_REFS` justificadas são eliminadas, e as entradas obsoletas da lista de permissões falham                                                                                                                                                                         | Sim                                                                                                                                                      |
| `i18n translation drift`       | A admissão absoluta requer zero inconsistências de origem, alvo em falta, hash de destino, tradução obsoleta e cache de secção. A preparação PR comum pode reter provas herdadas exatas ou uma alteração pendente apenas em inglês com o estado completo inalterado e os bytes de destino; o seu relatório declara separadamente a prontidão para a fusão. Hashes de destino em falta e bloco de evidência de base incompleto. Um cache de secção herdado em falta não é uma falha. | Todas as cinco classes bloqueiam a admissão queue/base ; a preparação normal permite apenas trabalhos pendentes herdados comprovados ou apenas em inglês |

Os doze README SVGs sob `docs/diagrams/` são gerados (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` regenera todos eles). Cada um tem um teste de unidade de comparação de bytes (`tests/unit/docs/readme-*-svg.test.ts`, trabalho `test-unit`) que falha quando o ficheiro confirmado está obsoleto e `check:docs-counts` lê números canónicos dos seus nós `<text>` —, e é por isso que a etapa de estrutura de tópicos mantém cada string delineada no ficheiro como invisível `<text>`. A verificação de números canónicos SVG lê os ficheiros listados em `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, mais `public/images/tier-flow-dark.svg` e `tier-flow-light.svg`; as reivindicações de graça para sempre, entrada de catálogo, pool recorrente e fatores de pontuação são também `promise-pillars.svg`, `free-tier-budget.svg` e `strategies-grid.svg`. `free-tier-budget.svg` extrai os seus números do carregador de catálogo ativo, pelo que uma alteração no `FREE_MODEL_BUDGETS` ou no nome de visualização de um fornecedor torna CI vermelho até que esse ficheiro seja regenerado.

### Cargo: `i18n-ui-coverage`

| Argumento                           | Valida                                                                                                                                                                                                   | Bloqueio     |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check-ui-keys-coverage` (em linha) | A cobertura da chave UI i18n é ≥ 65%                                                                                                                                                                     | Sim          |
| `check-ui-value-drift` (em linha)   | Um inglês reescrito **valor** não deixa nenhuma tradução obsoleta para trás                                                                                                                              | Sim          |
| `check-new-key-coverage` (em linha) | UM **novo** A chave inglesa é traduzida em cada localidade — um marcador `__MISSING__:` é rejeitado                                                                                                      | Sim          |
| `check-translation-ratio`           | A proporção de tradução real por localidade (idêntica ao inglês/espaço reservado/folhas em falta fora da lista de permissões) não deve exceder a folga `config/quality/i18n-translation-baseline.json` + | **Bloqueio** |

Necessita de `fetch-depth: 0` — a porta de desvio de valor compara `en.json` com a base de fusão.

#### Porta de tradução obsoleta `check-ui-value-drift` —

Capta aquela regressão que as outras portas estruturalmente não conseguem ver: um valor em inglês é reescrito e as traduções derivadas do inglês _anterior_ ficam para trás, para que os utilizadores que não falam inglês continuem a ler cópias com palavras fidedignas, agora erradas.

Isto foi enviado de verdade. `oauthModal.googleOAuthWarning` foi reescrito quando chegou o auxiliar de início de sessão Antigravity (#5203);**39 de 43 localidades** manteve o texto informando os operadores para "copiar o URL completo e colá-lo abaixo" — um fluxo que não pode ser concluído para esse fornecedor. Passou despercebido até #8463 porque:

- `sync-ui-keys` apenas preenche chaves que são **ausente** , nunca aqueles que são **obsoleto** ;
- `check-ui-keys-coverage` conta a _presença_ chave, pelo que uma tradução obsoleta é considerada abrangida;
- `check-translation-drift` rastreia a documentação `docs/i18n/<locale>/**.md`, espelha — mas nunca lê `src/i18n/messages/*.json`. Bloqueio no trabalho `docs-sync-strict` desde a ressincronização de 2026-09: editar um documento principal → `npm run i18n:run -- --files=<doc>` (nível de secção, barato).

**Com reconhecimento de diferença, não com base na linha de base.** Compara `en.json` na base de fusão com a árvore de trabalho; para cada chave cujo valor em inglês tenha sido alterado, qualquer localidade que ainda contenha uma tradução intacta será obsoleta. Isto deliberadamente **congela dívidas pré-existentes** — a diff não pode revelar de que inglês antigo veio uma tradução de longa data, pelo que o portão julga apenas o que a mudança atual toca. A alternativa (uma linha de base de hash por chave) custaria um ficheiro gerado ~ 600 KB, 3 × a maior linha de base existente, produzindo cada i18n PR.

Duas formas de o satisfazer:

1. atualizar as traduções afetadas ou
2. configure-os para `__MISSING__:<new english>` — o tempo de execução apresenta o inglês corrigido (`src/i18n/request.ts::deepMergeFallback`, #7258) e as filas de chaves para tradução.

Se a string for **significado** mudou, prefiro **renomeando a chave** : uma nova chave não pode herdar uma tradução obsoleta. Este é o padrão utilizado #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

O desvio de valor e as portas da nova chave partilham uma comparação imutável do `scripts/i18n/resolve-ui-diff-base.mjs`. O workflow passa o mesmo SHAs base, base-tip e candidato para ambas as verificações. As execuções PR/base-retarget, push e merge-group utilizam o seu contexto de evento. O despacho de uma ramificação candidata requer o seu PR aberto exato ou a entrada `i18n_base_sha` explícita. Despacho ou observação agendada de `main` ou `release/vX.Y.Z` sem esta entrada compara o último commit com o seu primeiro pai; não se trata de uma auditoria a todas as dívidas de tradução herdadas. A invocação local requer uma base de comparação explícita, por exemplo, o comando `BASE_REF` acima.

Contexto de comparação em falta ou ambíguo, um catálogo obrigatório ilegível ou inválido e um candidato alterado produzem `INCOMPLETE` com código de saída **2** , incluindo no modo de aviso. As leituras de catálogo utilizam `scripts/i18n/read-ui-catalog.mjs`; as falhas de leitura não são substituídas por objetos vazios. Nem uma base indisponível nem uma entrada incompleta estabelecem PASS.

### Cargo: `i18n`

Matriz de validação i18n completa (um trabalho por localidade). Todo o trabalho é consultivo.

| Argumento                       | Valida                                | Bloqueio                                                      |
| ------------------------------- | ------------------------------------- | ------------------------------------------------------------- |
| `validate_translation.py quick` | Completude da tradução por localidade | **Consultivo** (`continue-on-error: true` em todo o trabalho) |

### Cargo: `pr-test-policy`

É executado apenas em pull requests.

| Argumento              | Valida                                                                                                                              | Bloqueio |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | PRs que alterem o código de produção em `src/`, `open-sse/`, `electron/` ou `bin/` devem incluir ou atualizar testes (Hard Rule #8) | Sim      |
| `check:test-masking`   | Os ficheiros de teste alterados não reduzem a contagem de declarações líquidas nem acrescentam tautologias `assert.ok(true)`        | Sim      |
| `check:pr-evidence`    | O órgão PR cita evidências test/VPS para a mudança (mecaniza o Hard Rule #18 ao usar prosa PR — frágil, ver Backlog)                | Sim      |

### Cargo: `test-vitest`

Necessita do trabalho de classificação `changes`. Os fragmentos de matriz aplicáveis bloqueiam a fusão em caso de falha.

| Suíte            | Valida                                                           | Bloqueio                                                                                                                    |
| ---------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Servidor MCP (110 ferramentas), autoCombo, cache — vitest runner | Sim                                                                                                                         |
| `test:vitest:ui` | Componente UI testa corredor — vitest                            | **Bloqueio** As falhas pré-existentes — são explicitamente excluídas no `vitest.config.ts`; novas falhas falham no trabalho |

### Fluxos de trabalho noturnos (agendados, consultivos)

São executados numa programação cron (e `workflow_dispatch`), nunca em PRs. Todos são consultivos.

| Fluxo de trabalho      | Valida                                                                                                                                                                          | Bloqueio       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | testes de propriedade de verificação rápida com uma contagem de alta execução + de semente aleatória                                                                            | **Consultivo** |
| `nightly-resilience`   | porta de crescimento de heap, injeção de falha de caos, k6 load/soak                                                                                                            | **Consultivo** |
| `nightly-llm-security` | proteção de injeção promptfoo (modo de bloqueio) sondas garak + (ignoradas sem segredo do fornecedor)                                                                           | **Consultivo** |
| `nightly-schemathesis` | Fuzzing de contrato OpenAPI (esquematese) contra um OmniRoute ativo utilizando `docs/openapi.yaml` Violações de especificações de superfícies — /500s não tratados (Fase 8 B.4) | **Consultivo** |
| `nightly-mutation`     | A pontuação do teste de mutação Stryker sobre a via rápida da unidade — mutantes sobreviventes superam afirmações fracas                                                        | **Consultivo** |
| `nightly-compat`       | Matriz de compatibilidade do mecanismo de nós nas gamas `engines.node` suportadas                                                                                               | **Consultivo** |

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
- **informativo** — o total global face à linha de base congelada. O desvio herdado nunca assinala a
  vermelho um PR inocente; o desvio é registado para correção durante a reconciliação da versão e monitorizado pela
  tarefa de margem disponível.

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

### Torniquete CodeQL : admissão de candidatos e inventário de repositórios

CI possui a admissão do candidato CodeQL através de uma cadeia de dependência explícita: `codeql-scan` chama a matriz de quatro línguas no `codeql.yml` e `codeql-admission` executa `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` requer ambos os resultados. A qualidade mantém as suas próprias verificações numéricas, mas não consulta o scanner antes de o produtor terminar; `Gate / Quality` por si só não é a admissão completa do candidato. CodeQL continua a ser obrigatório para os candidatos apenas com documentos.

A política no `config/quality/codeql-admission-policy.json` seleciona Actions, C/C++, JavaScript/TypeScript e Python, conjunto de consultas padrão, modelo de ameaça remota e modo de construção nenhum. A simulação do produtor rejeita um registo de ativação pendente e ramifica fora da lista de destinos explícita. Os objetivos atuais são principais e os testes do Contrato release/v3.8.54. comparam esta lista finita e o gatilho de manutenção com a versão do pacote; a próxima versão necessita de uma integração revista. O disparo PR de libertação mais ampla existente do CI é mantido, mas um alvo não embarcado reporta HOLD antes da extração, em vez de obter um PASS não medido.

Cada trabalho de matriz regista o seu SARIF de upload ID real, idioma, categoria, execução e tentativa, identidade do fluxo de trabalho do chamador, evento ref/head/base/merge SHA e hash de política. O trabalho dependente descarrega apenas os recibos desta execução e valida os resumos dos artefactos. Requer todas as quatro categorias, um produtor bem-sucedido e o processamento completo de cada carregamento exato. Utiliza o filtro sarif_id do API, e não a análise mais recente encontrada numa ramificação. As repetições parciais podem reutilizar categorias bem-sucedidas de uma tentativa anterior da mesma corrida e candidato, preservando a tentativa produtora; um produtor actual falido não pode reutilizar provas verdes anteriores.

A ação CodeQL aguarda o processamento, mas a sua implementação fixada pode avisar e continuar após uma falha na leitura do estado ou uma espera esgotada. A admissão verifica, portanto, novamente o processamento. Categorias em falta, processamento pendente, trabalhos com falha ou cancelados, identidade obsoleta, paginação incompleta ou APIs indisponível produzem HOLD e saída 2. Não permanece nenhuma espera fixa por um fluxo de trabalho de scanner independente. Um PR não verificado não pode passar porque uma consulta de alerta retornou 0. Uma contagem medida acima `metrics.codeqlAlerts.value` sai de 1; a linha de base não é elevada para absorver os alertas de outra filial. [Estado de upload e pesquisa de análise](https://docs.github.com/en/rest/code-scanning/code-scanning).

Os registos de receção carregam e analisam IDs, categorias, versões de ferramentas, ref/SHA, linha de base e números de alerta. A contagem SARIF identity/result, as contagens mínimas de regras e as instâncias exatas de alerta permanecem obrigatórias. As identidades PR/analysis são novamente verificadas antes de serem aceites. Estas verificações estabelecem a cobertura de categorias configuradas, e não um inventário de cada ficheiro de origem extraído. A extração sem compilação C/C++ não inclui código gerado durante a compilação de um projeto. As exclusões de fontes ainda precisam de revisão e a atribuição do contribuidor precisa de provas comparáveis de base exata.

`codeql-maintenance.yml` fornece varrimentos push de libertação ativa e programação semanal sem duplicar os produtores PR/main. `nightly-codeql-inventory.yml` mantém a linha de base de todo o repositório separada, com `--strict-measurement` e uma falha quando a medição não está disponível. O salto elegante do colecionador de legado local não é admissão de candidato. O aperto permanece um `--update` explícito após uma contagem global inferior verificada.

O fluxo de trabalho avançado não deve ser publicado enquanto a configuração predefinida estiver configurada: GitHub rejeita esta combinação. A sua política versionada permanece pendente até que a transição administrativa revista seja lida novamente. Antes da publicação, um repositório de pins do operador, hashes head/base/tree, policy/patch/rollback e estado de configuração observado; `node scripts/quality/codeql-producer.mjs verify-admin-readback` verifica os registos JSON esperados e reais fornecidos. Trata-se de uma proteção técnica, não de uma aprovação do operador ou de um substituto para a procura de novas leituras. O token PR nunca solicita acesso de administração. A implementação e qualquer alteração do scanner requerem uma leitura separada, além de provas reais de compatibilidade PR, fork e grupo de fusão.

Os forks utilizam executores alojados, checkout sem credenciais persistentes, nenhum projeto install/build no produtor e nenhum segredo de repositório herdado. GitHub suporta o upload SARIF para o evento pull_request com o seu token fork reduzido; a aprovação da execução da contribuição pela primeira vez continua a ser a política GitHub. Nunca utilize pull_request_target para executar código não fidedigno. Confirme as permissões reais do token, analyze_key e todos os ambientes de categoria no canário controlado antes de considerar a migração concluída. [Regras de carregamento bifurcado](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [modos de configuração conflituantes](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Os despedimentos são por decisão da operadora (Hard Rule #14)** — nunca descarta um alerta CodeQL sem registar a justificação técnica no comentário de dispensa: `won't fix` para um requisito de protocolo upstream, `used in tests` para um dispositivo de teste, `false positive` para um desinfetante CodeQL não consegue ver (precedente: `docs/security/ERROR_SANITIZATION.md`).

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

## Política da lista de permissões

Todos os controlos que não podem falhar devido a violações preexistentes utilizam uma lista de permissões fixa
(por exemplo, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). A política é:

**Corrija a causa raiz; utilize a lista de permissões apenas quando a violação for preexistente e
não puder ser corrigida no mesmo PR.**

Ao adicionar uma entrada a uma lista de permissões:

1. Inclua um comentário com a justificação.
2. Indique o problema de acompanhamento (por exemplo, `// #3498 — Phase 2 feature, not yet implemented`).
3. Remova a entrada no mesmo PR que corrige a violação — uma entrada obsoleta que já não
   suprima uma violação ativa constitui, por si só, um defeito (a verificação de imposição obsoleta 6A.3
   fará o controlo falhar devido a uma entrada órfã na lista de permissões, assim que for implementada).

**Não** adicione entradas à lista de permissões para fazer com que os testes passem mais depressa. Um controlo bem-sucedido com uma
lista de permissões em crescimento transmite uma falsa sensação de qualidade.

### Quando um controlo falha no seu PR

1. **Leia atentamente o resultado do controlo** — este indica exatamente qual o ficheiro ou símbolo que violou
   a regra.
2. **Corrija a violação** — a maioria dos controlos consiste em verificações determinísticas do sistema de ficheiros que passam assim que
   o código estiver correto.
3. **Se a violação for preexistente** (ou seja, não foi introduzida por si, mas o controlo passou agora
   a abrangê-la): adicione uma entrada à lista de permissões com um comentário de justificação e um problema de acompanhamento.
4. **Se o controlo for incremental** (cobertura, avisos do ESLint, duplicação, complexidade):
   a sua alteração piorou a métrica. Corrija o problema subjacente ou, excecionalmente, execute
   `npm run quality:ratchet -- --update` se a alteração for intencional e a degradação da métrica
   for aceitável — mas documente a razão na descrição do PR.
5. **Controlos consultivos** (`continue-on-error: true`) são informativos — não bloqueiam a
   integração, mas aparecem no resumo da CI. Corrija-os mesmo assim.

---

## Adicionar uma Nova Verificação

1. Crie `scripts/check/check-<name>.mjs` (ou `.ts`). As verificações de políticas terminam com o código 0/1.
   As verificações de estilo incremental emitem uma métrica para `quality-metrics.json` através de `collect-metrics.mjs`.
2. Adicione `"check:<name>": "node scripts/check/check-<name>.mjs"` ao `package.json` e
   sincronize o alias e o respetivo comando exato em `config/quality/gate-manifest.json`.
   Aplique a mesma sincronização ao alterar ou remover um alias de validação existente.
   Execute `npm run check:gate-manifest`; o hook de pre-commit e a classificação de alterações
   da CI garantem o cumprimento deste contrato.
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

## Backlog de racionalização (revisão de ROI — Fase 9 Onda 3)

Este inventário foi reconciliado com `ci.yml` em 2026-06-17 (a versão anterior omitia
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Uma revisão de ROI do conjunto reconciliado
identificou os seguintes candidatos a racionalização. **As consolidações são alterações
mecânicas de CI; as ativações/remoções são decisões de política reservadas ao operador.**
Nada do que se segue foi ainda aplicado.

**Também não documentados acima** (consultivos, baixo sinal): o job `docs-lint` (markdownlint + Vale, job completo com `continue-on-error`) e os workflows independentes de scanner `semgrep.yml` / `scorecard.yml`. CodeQL agora tem jobs obrigatórios de produção e admissão sob `Gate / CI`, sujeitos aos requisitos de ativação descritos acima. `semgrepFindings: 0` está em `quality-baseline.json`, mas não está ligado a uma ratchet bloqueante em `ci.yml` — a métrica está atualmente órfã.

### Consolidação / desduplicação (mecânica, menor risco)

Cada candidato foi validado face ao estado efetivo das barreiras em 2026-06-17
(confiar, mas verificar); várias consolidações "óbvias" acabaram por ocultar dívida e
**não** são substituições diretas seguras.

- **`check:docs-sync` é executado duas vezes** — de forma autónoma na tarefa `lint` e novamente dentro de `check:docs-all` (`docs-sync-strict`) e do hook de pre-commit do husky. ✅ **CONCLUÍDO** — removida a invocação autónoma em `lint`.
- **Análise de CVE** — ❌ **NÃO é uma consolidação direta segura.** `audit:deps` bloqueia alertas críticos e auditorias incompletas nos cinco lockfiles, enquanto comunica alertas de severidade alta como avisos ao abrigo da política atual; `check:vuln-ratchet` (osv) só falha perante uma _regressão_ relativamente à baseline registada no repositório e rejeita medições em falta quando estas são obrigatórias. Semânticas diferentes — remover `audit:deps` eliminaria a barreira crítica absoluta e os comprovativos independentes de auditoria dos pacotes. Manter ambos.
- **Deteção de ciclos** — ✅ **CONCLUÍDO** (#15159 G-01/G-02). O texto anterior designava `check:cycles` como a barreira "verde e criteriosamente selecionada" e justificava mantê-la como bloqueante porque `check:circular-deps` (dpdm) comunicava 91 ciclos. Esse resultado verde era um **falso positivo verde**: `check:cycles` analisava 5 subdiretórios (450 ficheiros), correspondia apenas a `import|export … from` estáticos e descartava todos os especificadores `@/` e `@omniroute/open-sse/`, pelo que não conseguia detetar os ciclos de importação dinâmica + aliases que predominavam no repositório. Corrigido: a barreira percorre agora `src` + `open-sse` (5023 ficheiros), recolhe especificadores a partir da AST de TypeScript (pelo que `import("…")` conta e `typeof import("…")` em posição de tipo não conta) e resolve `paths` do tsconfig. Encontra **14** ciclos, não 0. Uma vez que 14 ciclos preexistentes não podem ser corrigidos num PR de barreira, `check:cycles` é agora um **mecanismo de bloqueio progressivo** (`--ratchet`, limite máximo `metrics.cycles.value = 14` em `quality-baseline.json`, `direction: down`) — bloqueia qualquer _regressão_ e a contagem só pode diminuir. O CI executa `npm run check:cycles:ratchet`. A redução progressiva acompanha a **A-01**. `check:circular-deps` (dpdm) mantém-se consultivo como segunda opinião mais abrangente.
- **Complexidade** — ✅ **CONCLUÍDO** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): uma passagem do ESLint, com contagens por ruleId para que as baselines ciclomática+máximo de linhas e cognitiva permaneçam independentes; os comandos individuais `check:complexity` / `check:cognitive-complexity` mantêm-se para a execução local de `--update`.
- **Anti-alucinação de `/api`** — ✅ **CONCLUÍDO** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): um único inventário do sistema de ficheiros de `src/app/api`; openapi-routes + docs-symbols continuam a comunicar resultados de forma independente; os comandos individuais mantêm-se para execuções locais.
- **`check:node-runtime` é executado em 11 tarefas** — ⚠️ **ROI baixo.** Cada uma utiliza um runner separado e a verificação demora <1 s; poupança total de ~10 s, em contrapartida da perda de uma proteção económica por tarefa. Não compensa a perturbação.
- **`typecheck:noimplicit:core` no lint de CI** — ✅ **removido da tarefa lint** (era consultivo com `continue-on-error`); a superfície de tipos bloqueante é `typecheck:core` + `check:type-coverage`. Script local mantido.

### Ativar / decidir (política do operador)

- `check:openapi-security-tiers` (consultivo) — ❌ **NÃO pode ser diretamente convertido em bloqueante.** Termina com 0, mas avisa que várias rotas `traffic-inspector` em `LOCAL_ONLY_API_PREFIXES` não têm a anotação `x-loopback-only: true`. A sua aplicação obrigatória exige primeiro a adição dessas anotações a `openapi.yaml`.
- `typecheck:noimplicit:core` (consultivo) — amplamente abrangido pelo mecanismo de bloqueio progressivo `check:type-coverage`. Converter num mecanismo de bloqueio progressivo ou remover a segunda passagem redundante de `tsc`.
- `test:vitest:ui` (agora **bloqueante**) — as falhas preexistentes estão explicitamente excluídas em `vitest.config.ts` com comentários de acompanhamento `// #8618`; novas falhas fazem a tarefa falhar.
- `check:secrets` (gitleaks, mecanismo de bloqueio progressivo bloqueante) — o limite máximo atual é `metrics.secretFindings` em `quality-baseline.json`. Qualquer exceção requer uma entrada justificada em `.gitleaks.toml`; uma medição indisponível é INCOMPLETA. A análise complementa a análise nativa de segredos do GitHub e `check:public-creds`.
- `check:pr-evidence` (bloqueante, pesquisa texto livre no corpo do PR) — elevado risco de falsos positivos; a sua remoção enfraquece a aplicação da Regra Estrita n.º #18, pelo que esta é uma verdadeira decisão de política.
- `semgrep` (autónomo consultivo) — sobrepõe-se ao CodeQL nas famílias OWASP; ligar a respetiva baseline a um mecanismo de bloqueio progressivo ou remover.

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
