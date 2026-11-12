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

## Inventário de gates e perfis de execução

### Admissão de candidato

Os fluxos de trabalho CI e Quality Gates emitem, cada um, um veredicto estável: `Gate / CI` e `Gate / Quality`. A sua política de admissão versionada enumera todos os trabalhos a montante, conforme necessário ou consultivo. Um trabalho obrigatório aplicável deve ser bem-sucedido: resultados em falta, cancelados, ignorados, pendentes e desconhecidos não podem estabelecer PASS. Uma classificação válida apenas para documentos ou apenas para catálogo pode tornar uma linha de código inaplicável; um projeto comum PR não é um candidato aceite. Um rótulo `hotfix` não dispensa provas.

Ambos os fluxos de trabalho abrangem PRs em ramificações main/release, envios para `main`, envio manual e eventos de grupo de fusão. Push, dispatch e merge-group executam a seleção completa. Um rascunho de fila fiável do Mergify também executa trabalhos `full-code`/`full-code-e2e` aplicáveis; PRs comum ignora-os. Antes de uma fusão manual, execute um despacho completo no candidato exato. Os pushes para `release/**` não iniciam estes fluxos de trabalho; Release-Green observa a base fundida separadamente (`docs/ops/RUNNER_BOX.md` → Hosted lane). As bifurcações e os grupos de fusão utilizam executores alojados para trabalhos que, de outra forma, selecionam executores auto-hospedados; capacidade alojada suficiente deve ser verificada antes da implementação.

Cada recibo JSON identifica o SHA verificado, a execução do workflow e a tentativa. O CLI rejeita uma incompatibilidade checkout/event SHA. Os testes de fluxo de trabalho ligam a associação à política à lista `needs` do trabalho de veredicto, para que uma faixa nova ou removida não possa desaparecer silenciosamente. Os recibos cobrem o seu próprio fluxo de trabalho, não publicação, implementação ou aspetos internos de um scanner de consultoria existente. Fazer as verificações aplicáveis exigidas nas regras da filial é uma alteração administrativa separada; definir os seus postos de trabalho não protege, por si só, uma filial.

`API Route Typecheck` é uma verificação de fluxo de trabalho independente, fora dos veredictos agregados e do perfil estático completo do observador local. Inspecione o seu resultado separadamente para o candidato exato. `.github/workflows/api-route-typecheck.yml` é executado em PRs em `main` ou `release/**`, envia para a família de ramos, despacho manual e eventos `merge_group` do tipo `checks_requested`. Não possui filtro de percurso. Mesclar grupos, consultar `merge_group.head_sha`; outros eventos consulte `github.sha`. Todos os eventos utilizam a mesma porta de diagnóstico API e testes de unidade de porta. Os redireccionamentos básicos PR solicitam uma nova verificação; As edições body/title utilizam o nome apenas de observação `Admission not requested / API Route Typecheck` e não podem substituir a verificação de admissão.

### Provas retidas no redutor de aceitação da release

`scripts/quality/validate-release-acceptance.mjs` reduz um plano fornecido e os respetivos
manifestos; não estabelece que o plano abrange todo o pipeline da release.
Os seus relatórios definem explicitamente `releaseAcceptance: false`, mesmo quando esse plano
está `VERIFIED`. O workflow `release-acceptance.yml` continua a utilizar fixtures simuladas,
e não recibos reais de compilação, empacotamento, arranque ou promoção.

A CLI exige `--evidence-root` para verificar as provas retidas. Os ficheiros são resolvidos
como `<evidence-root>/<artifact_id>/<member>` e é calculado o respetivo hash SHA-256. Um registo
PASS sem provas, um ficheiro em falta ou alterado, um caminho inseguro ou uma ligação simbólica
impede a verificação. Ficheiros em falta não são equivalentes a registos vazios de execuções
bem-sucedidas. As verificações existentes de SHA/execução/tentativa permanecem independentes:
bytes correspondentes não podem validar um recibo obsoleto. A integridade dos ficheiros não
é prova da autenticidade da execução nem da promoção do artefacto.

### DAST consome o build de CI verificado

O job obrigatório `dast-smoke` da CI chama `.github/workflows/dast-smoke.yml` após `build`. Ele segue a mesma seleção de código/rascunho do build, incluindo PRs de forks compatíveis, PRs destinados à release e grupos de merge. Um job DAST ausente, com falha, cancelado ou inesperadamente ignorado bloqueia `Gate / CI`. O workflow reutilizável não possui gatilho independente de PR/acionamento manual; a validação manual usa o acionamento da CI para manter o build e o consumidor na mesma execução.

`scripts/ci/next-build-provenance.mjs` sela o artefato Next completo com seu digest do tar, repositório/evento/execução, tentativa do produtor, head/base/checkout/tree, identidades de workflow, lockfile, versão exata/ABI do Node, plataforma e bundler. DAST seleciona o ID imutável do artefato em `needs.build.outputs`, exige a verificação do digest do download e calcula independentemente o hash do ZIP para compará-lo ao digest do produtor antes de extrair seus dois membros permitidos por meio de `scripts/ci/unpack-ci-build.py`. O manifesto e o ficheiro tar também precisam corresponder às saídas independentes do produtor antes da extração da árvore Next. Ele nunca procura o último build bem-sucedido da branch. Uma reexecução parcial pode reutilizar aquela mesma tentativa do produtor quando seu ID e todas as entradas ainda correspondem; o recibo regista ambas as tentativas.

O consumidor permanece em um runner Linux hospedado, com permissão de repositório apenas de leitura e sem segredos do repositório. Ele instala a versão exata do Node do produtor e monta a CLI com `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` rejeita a ausência de um servidor standalone antes de qualquer build de fallback; builds locais normais da CLI mantêm o fallback existente. A prontidão do servidor, Schemathesis e promptfoo precisam todos ter sucesso dentro do limite inalterado de 25 minutos do job. Um recibo de proveniência comprova a identidade das entradas e os bytes, não uma varredura DAST bem-sucedida. Expiração do artefato, interrupção do runner ou falha do scanner continuam sendo evidências incompletas ou de falha; não podem tornar-se PASS por meio de um wrapper consultivo.

### Capacidade de execução da UI

A CI executa o inventário completo da UI como quatro shards da matriz `test-vitest`, cada um
com, no máximo, dois workers por shard e o prazo existente de 15 minutos por job. O primeiro
shard também executa a suite Vitest MCP/autoCombo. O resultado do job obrigatório abrange
todas as instâncias da matriz; a falha ou o cancelamento de um shard não pode estabelecer
a admissão do candidato.

O observador noturno conserva um recibo separado do candidato exato para cada shard da UI,
incluindo a execução MCP no primeiro recibo. São necessários os quatro recibos, os registos
e as identidades de execução correspondentes. Localmente, `npm run test:vitest:ui` continua
a selecionar a suite completa; uma execução com `--shard` constitui apenas prova parcial.

### Recolha de cobertura unitária

Os doze shards unitários recolhem cobertura V8 durante a execução existente dos respetivos
testes. Um shard bem-sucedido executa `scripts/ci/compact-v8-coverage.mjs` para comprimir os
ficheiros originais sem gerar um relatório Istanbul intermédio. O job final Coverage verifica
os doze manifestos relativamente ao SHA do candidato, runtime, raiz do código-fonte e hashes
dos dados e, em seguida, executa os reporters do c8 e os limiares de cobertura existentes.
Os inputs preservam a ordem global dos nomes de ficheiro do c8; uma pré-integração por shard
não é segura para cobertura mista de funções/blocos. Shards em falta, malformados ou
incompatíveis fazem falhar a admissão. Os shards de teste que falharem conservam
separadamente a cobertura de diagnóstico em bruto; esta não pode ser incluída na integração
final.

### Comprovativos do progresso da execução de unidades

O comando partilhado `test:unit:ci:shard` regista as fases `primary`, `dashboard` e `serial`
através de `scripts/ci/unit-progress-reporter.mjs`. O relatório de testes normal continua
disponível. Um comprovativo separado, apenas com metadados, regista o início e a conclusão
de cada ficheiro, e um sinal de atividade a cada 30 segundos apresenta os ficheiros que ainda
estão ativos e o respetivo tempo decorrido. Regista apenas metadados de execução incluídos
na lista de permissões; as descrições, os resultados, os conteúdos dos erros e o ambiente
completo dos testes não são serializados.

O CI conserva os ficheiros JSONL como `unit-progress-ci-<run>-<attempt>-<shard>`. O tempo limite de uma tarefa pode impedir o
carregamento posterior; os sinais de atividade já emitidos continuam a constituir evidências
de diagnóstico. A ausência de sinais de atividade também pode indicar um processo do executor
bloqueado ou terminado. Estes comprovativos preservam a seleção de testes, a simultaneidade,
os prazos e o estado de saída existentes; não constituem veredictos de admissão de candidatos.

### Inventário de análises estáticas

O inventário versionado de aliases npm e a pertença à análise estática encontram-se em
`config/quality/gate-manifest.json`. Execute `npm run check:gate-manifest` para validar os
nomes dos scripts e os comandos exatos em relação a `package.json`; adições, remoções e
alterações de comandos fazem falhar tanto o hook local como os jobs de classificação de
alterações na CI. Um alias não é um job de workflow, uma instância da matriz nem um caso de
teste: estas contagens não devem ser apresentadas como equivalentes.

Utilize `npm run quality:scan -- --list` ou `npm run quality:scan:fast -- --list`
para inspecionar os aliases selecionados sem os executar. O runner invoca o entrypoint npm,
pelo que o respetivo runtime (incluindo Bun, quando configurado) é preservado.
O manifesto regista os aliases fora desses perfis como invocados separadamente, e os
comandos de manutenção são proibidos em perfis de análise só de leitura.

Estes perfis abrangem apenas a análise estática. Não certificam testes do produto,
cobertura, empacotamento, verificações externas nem a aceitação integral da release de um
candidato. A admissão pelo workflow utiliza `config/quality/admission-policy.json` associado
e `scripts/quality/admission-verdict.mjs`. Os perfis do observador da release permanecem
separados; inspecione de forma independente as respetivas verificações aplicáveis e recibos.
Os comandos estáticos do observador completo são declarados em
`config/quality/release-green-static-profile.json`, incluindo `audit:deps`, a seleção de
testes de mutação e as verificações de tradução. O loader valida os comandos npm em relação
a package.json e às declarações modeladas de CI/Quality; rejeita divergências em vez de
executar tokens de shell como argumentos. Um output SKIP/INCOMPLETE de um scanner obrigatório
não pode estabelecer PASS. O perfil regista as respetivas exclusões externas e não substitui
as provas alojadas de cobertura, matrizes de testes, pacotes ou implementação. O inventário
textual abaixo é uma referência, não uma prova de que um gate foi efetivamente executado.

Os scripts encontram-se em `scripts/check/` (gates de políticas) e `scripts/quality/`
(motor de ratchet). A fonte de verdade da CI é `.github/workflows/ci.yml`.

### Integridade da documentação de base publicada

`.github/workflows/i18n-base-health.yml` observa a integridade da documentação após os envios selecionados para `main` e `release/v*` e no envio manual. Os seus filtros cobrem a documentação, o Markdown root, `llm.txt`, a tradução state/configuration e as ferramentas i18n relevantes. O trabalho único `Published base documentation health` utiliza o Ubuntu alojado e um prazo de cinco minutos. Executa a validação de leitura apenas e grava um recibo de diagnóstico sem instalação de dependência, tradução ou adoção de estado.

`scripts/i18n/check-base-health.mjs` requer zero inconsistências de hash de origem, alvo em falta, hash de destino, tradução obsoleta e cache de secção. Valida também o âmbito central atual document/locale e a sua procedência registada. Contexto inválido, cobertura incompleta ou verificador interrompido produz `INCOMPLETE`; a deriva confirmada produz `FAIL`. Ambos devolvem um estado de saída com falha. O recibo está ligado ao SHA checkout , workflow, execução e tentativa, e é retido como `i18n-base-health-<sha>-<run>-<attempt>`.

Esta é uma observação independente da base publicada. Não adiciona um evento PR ou de grupo de fusão, uma verificação PR necessária, um alias npm ou um membro do perfil de varrimento estático. O verificador subjacente também bloqueia todas as cinco classes em modo absoluto. A preparação normal PR permanece separada da admissão. Um carregamento bem-sucedido não pode transformar um resultado de integridade com falha em PASS.

Um PR comum utiliza `--preflight` com um relatório base gerado pelo `--baseline-evidence`. Pode deixar uma fonte em inglês pendente apenas quando o registo completo da tradução e os bytes de destino reais permanecem inalterados em relação a essa base exata. Novas inconsistências de alvo ou cache de secção ainda bloqueiam e as provas incompletas não podem autorizar a preparação. O relatório expõe `preparationPending` e `mergeReady` separadamente: a preparação bem-sucedida não torna as traduções pendentes prontas a serem fundidas. Atualize os espelhos afetados no candidato composto antes da admissão. O candidato fiável à fila Mergify, `merge_group`, push de ramificação e execuções manuais CI utilizam o verificador absoluto, sem `--warn` ou perdão de falha herdada. Os hashes de destino em falta e um âmbito reduzido por ficheiros principais gravados eliminados não podem produzir um veredicto absoluto bem-sucedido.

### Libertar atalho PR (`quality.yml`)

`.github/workflows/quality.yml` complementa CI em main/release PRs, envia para `main`, despacha e junta grupos. PRs utiliza verificações rápidas filtradas por caminho. A compilação duplicada permanentemente desativada foi removida; as verificações reais build/package/boot permanecem no CI.

| Trabalho                                         | Âmbito                                                                                                                                                                                                                                          | Bloqueio              |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs e docs-all                                                                                                                                                                                                         | Sim                   |
| `Fast Quality Gates`                             | Código PRs; verificações estáticas, verificação de tipo, verificação de tipo de painel, testes de unidade impactados                                                                                                                            | Sim                   |
| `Forgotten sibling tests`                        | Código PRs; módulos alterados rastreados para consumidores estáticos e testes de irmãos candidatos; os caminhos barril e de importação dinâmica são reportados como diagnósticos consultivos, com exceções de lista de permissões referenciadas | **Consultivo**        |
| `No new ESLint warnings`                         | Código PRs; protetor de cotão com reconhecimento de supressão                                                                                                                                                                                   | Sim, incluindo garfos |
| `Merge integrity (changelog + generated skills)` | PRs sem rascunho; changelog e sincronização de competências geradas                                                                                                                                                                             | Sim, incluindo garfos |

#### Relatório de testes de irmãos esquecidos

`npm run check:forgotten-sibling-tests` reutiliza o resolvedor de importação por trás do mapa de impacto de teste. Para cada módulo de produção alterado, reporta cadeias `changed module/symbol -> static consumer -> candidate sibling test` determinísticas quando o teste candidato está ausente da comparação de pull request. O resumo do Markdown e o resultado JSON são mantidos como o artefacto do fluxo de trabalho `forgotten-sibling-tests` para calibração antes de qualquer implementação de bloqueio.

As reexportações em barril e as importações dinâmicas são apenas diagnósticos de resolução; nunca criam uma descoberta bloqueadora. As exceções revistas residem no `config/quality/forgotten-sibling-allowlist.json`. Cada entrada deve nomear o teste do consumidor e do candidato, fornecer uma justificação específica e ligar um problema GitHub ou pull request. As entradas malformadas falham no fecho. As exceções não podem suprimir um teste candidato excluído ou uma comparação que adicione `.skip`/`.todo`; o enfraquecimento das asserções e outros mascaramentos continuam a pertencer ao portão `check:test-masking` de bloqueio independente.

### Tarefa: `lint`

É executada em todos os PRs para `main`. Bloqueia a integração em caso de falha.

| Script (`npm run ...`)            | Valida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Bloqueante                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | A versão do Node.js encontra-se dentro do intervalo suportado                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sim                                         |
| `check:cycles`                    | Importações circulares em todo o `src/` + `open-sse/` (com base na AST e com os `paths` do tsconfig resolvidos). A execução simples termina com o código 1 sempre que exista algum ciclo (bloqueio por predefinição desde #15281) e apresenta as SCCs. `check:cycles:ratchet` (o que é executado pelo CI) bloqueia quando a contagem excede o limite máximo de `metrics.cycles` em `quality-baseline.json` — atualmente 14, `direction: down`, pelo que só pode diminuir (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Sim (ratchet)                               |
| `check:boundary`                  | Acoplamento `open-sse → src`: importações únicas entre ficheiros do motor para a aplicação (`scripts/quality/measure-boundary.mjs`; a lista de dependências é o backlog de correções da separação entre o núcleo e os módulos da v4). Execução simples = relatório informativo (igual a `quality:boundary`). `check:boundary:ratchet` (o que é executado pelo CI e também no ciclo de ratchet das verificações rápidas de `quality.yml`) bloqueia quando a contagem excede o limite máximo de `metrics.boundaryOpenSseToSrc` em `quality-baseline.json` — inicializado com o valor medido de 771, `direction: down`; `--update` apenas o reduz; relativo à base nos PRs (`--base-ref`, ver abaixo)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sim (ratchet)                               |
| `check:route-validation:t06`      | Esquemas Zod presentes em todas as rotas (política do Nível 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Sim                                         |
| `check:any-budget:t11`            | A contagem de `@ts-expect-error // any` não excede o limite (catraca de Nível 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Sim                                         |
| `check:provider-consistency`      | Cada fornecedor em `providers.ts` tem uma entrada correspondente em `providerRegistry.ts` (e vice-versa, dentro da lista de permissões)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sim                                         |
| `check:model-lifecycle`           | As três tabelas de encaminhamento mantidas manualmente permanecem consistentes com o instantâneo do ciclo de vida incluído no repositório (#11503): `FITNESS_TABLE` (`taskFitness.ts`) não atribui uma pontuação a qualquer id descontinuado que `REGISTRY` consiga encaminhar; cada destino de `BUILT_IN_ALIASES` está presente em `REGISTRY` e ausente do instantâneo de ids descontinuados; cada id descontinuado ainda presente em `REGISTRY` é reencaminhado ou listado em `allowedRetiredInCatalog`; e nenhuma origem ou destino de `DEFAULT_DEGRADATION_MAP` aparece como descontinuado nesse instantâneo. Isto não prova que um modelo seja atualmente disponibilizado por um serviço a montante ativo. Offline — compara com `config/quality/model-lifecycle.json`, atualizado manualmente com `npm run quality:refresh-model-lifecycle` (rede; não integrado no CI). `allowedRetiredInCatalog` é um mecanismo de redução progressiva: adicione uma entrada apenas com uma issue de acompanhamento.                                                                                                                                                                                                              | Sim                                         |
| `check:fetch-targets`             | Cada `fetch("/api/...")` no `src/` do lado do cliente resolve para um `route.ts` real                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sim                                         |
| `check:deps`                      | Todas as dependências instaláveis com `npm install` em cada `package.json` do repositório constam de `dependency-allowlist.json`; pacotes novos sem versão fixa ou que possam resultar de slopsquatting são assinalados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sim                                         |
| `audit:deps`                      | Auditoria npm dos cinco lockfiles independentes (raiz, Electron, plugins OpenCode v1/v2 e fornecedor). Os avisos críticos bloqueiam; os avisos de gravidade elevada permanecem visíveis como advertências. Auditorias em falta/com falhas são INCOMPLETAS e bloqueiam; os hashes dos locks e os relatórios por âmbito são conservados.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sim                                         |
| `check:lockfile`                  | Integridade de `package-lock.json` — registo https, hashes de integridade, sem substituições de anfitrião                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sim                                         |
| `check:licenses`                  | Lista de permissões de licenças SPDX para dependências de produção                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sim                                         |
| `check:tracked-artifacts`         | Sem artefactos de compilação / ligações simbólicas de `node_modules` submetidas (também é executado no pre-commit do husky; o pre-push é intencionalmente leve — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sim                                         |
| `check:ai-attribution`            | Sem rodapé `Co-Authored-By` de IA/bot nem rodapé de geração por IA nos commits, título ou corpo do PR — Regra Rígida #16 (no ciclo de verificações rápidas de `quality.yml` para PR→`release/**` — lê o payload do evento, não efetua qualquer operação fora de PRs — e num passo exclusivo de PRs no lint de `ci.yml` para PR→`main`; também no hook `commit-msg` do husky; coautores humanos permitidos; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:vitest-exclusions`         | Cada exclusão do Vitest indica um problema de acompanhamento e consta de `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sim                                         |
| `check:file-size`                 | Os ficheiros de código-fonte (`.ts`/`.tsx` em `src/`, `open-sse/`, `electron/`, `bin/`) mantêm-se dentro de `cap` e os ficheiros de teste (`*.test.ts(x)`) dentro de `testCap`; os ficheiros fixados em `file-size-baseline.json` (`frozen` / `testFrozen`) não podem ultrapassar o tamanho registado                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sim                                         |
| `check:error-helper`              | As respostas de erro nos executores/handlers utilizam `buildErrorBody()` / `sanitizeErrorMessage()` (Regra Rígida n.º #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sim                                         |
| `check:migration-numbering`       | Os ficheiros SQL de migração são numerados sequencialmente, sem lacunas nem duplicados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sim                                         |
| `check:public-creds`              | Não existem valores literais OAuth `client_id`/`client_secret` nem chaves Web do Firebase fora de `publicCreds.ts` (Regra Rígida n.º #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sim                                         |
| `check:db-rules`                  | Não existe SQL em bruto fora dos módulos `src/lib/db/`; não existem importações agregadas de `localDb.ts` (Regras Rígidas n.º #2/n.º #5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Sim                                         |
| `check:known-symbols`             | Os executores de fornecedores, as estratégias de encaminhamento e os tradutores registados nas respetivas tabelas de despacho correspondem aos ficheiros no disco — sem símbolos órfãos ou não declarados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sim                                         |
| `check:route-guard-membership`    | Todas as rotas que iniciam um processo subordinado são classificadas por `isLocalOnlyPath()` (Regras Rígidas n.º #15/n.º #17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sim                                         |
| `check:test-discovery`            | Todos os ficheiros `*.test.ts` / `*.spec.ts` no repositório são recolhidos por, pelo menos, um executor de testes (ratchet: a lista de órfãos em `test-discovery-baseline.json` só pode diminuir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Sim                                         |
| `check:test-tla-order`            | Nenhum ficheiro `node:test` em `tests/unit` regista um teste, encontra um `await` de nível superior e, em seguida, regista mais testes (#18045; ratchet: `test-tla-order-allowlist.json` só pode diminuir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sim                                         |
| `check:agent-skills-sync`         | Os artefactos de competências de agente gerados correspondem ao respetivo catálogo de origem (sem divergências)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:provider-asset-provenance` | Os logótipos/recursos dos fornecedores têm uma entrada de proveniência registada                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `lint:json`                       | Os ficheiros de configuração JSON são analisados corretamente e cumprem as regras de lint do repositório                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `typecheck:core`                  | Compilação de TypeScript sem erros (apenas avisos informativos)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Sim                                         |
| `typecheck:noimplicit:core`       | `noImplicitAny` estrito — orientado para o futuro; muitos locais de chamada preexistentes ainda necessitam de anotações                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **Informativo** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` limitado a `src/app/(dashboard)/**` (#7033) — a lista de permissões selecionada de 27 ficheiros de `typecheck:core` não inclui qualquer TSX do dashboard, e `next build` também nunca efetua a verificação de tipos deste código (`next.config.mjs` define `ignoreBuildErrors: true`), pelo que as regressões de identificadores órfãos nessa área (#6625/#6909) eram invisíveis para o CI. Compara as diferenças com uma linha de base fixa da contagem por ficheiro/por código TS (`config/quality/dashboard-typecheck-baseline.json`, o mesmo padrão de imposição de obsolescência que `check:known-symbols`) — apenas NOVOS erros além da contagem da linha de base fazem a verificação falhar; reduza progressivamente com `--update` quando um erro preexistente for corrigido.                                                                                                                                                                                                                                                                                                                                                                                                                               | Sim                                         |
| `check:build-typecheck`           | Verificação de tipos de produção de toda a aplicação através de `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), que não são abrangidos pela superfície da lista de permissões de 27 ficheiros de `typecheck:core` nem pela verificação do dashboard. Compara as diferenças com `config/quality/build-typecheck-baseline.json`; uma contagem nova ou aumentada por (ficheiro, código) faz falhar a verificação, enquanto uma contagem inferior pede-lhe que reduza gradualmente a baseline. `--update` recusa-se a executar enquanto a execução contiver um par novo ou aumentado, salvo se for passado `--force-regressions`, e recusa um ficheiro que tenha sido silenciado recentemente, salvo se for passado `--force-nocheck`, pelo que alargar a baseline para obter um resultado verde e conceder um silenciamento permanente são dois atos deliberados separados. Um `--force` isolado é rejeitado. Também analisa o âmbito da compilação em busca de `@ts-nocheck`, comparando com `config/quality/ts-nocheck-baseline.json`, porque um ficheiro que o utilize não comunica quaisquer diagnósticos e, de outro modo, ficaria invisível para todas as verificações. | Sim                                         |

#### Dois programas de verificação de tipos dão respostas diferentes

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) e `check:build-typecheck` compilam programas diferentes com opções
diferentes, e o mesmo ficheiro pode estar limpo num e cheio de erros no outro.

`tsconfig.build.json` define `"strict": false`, pelo que `noImplicitAny` está
desativado. A configuração principal compila uma lista de permissões selecionada de
27 ficheiros com opções mais rigorosas e segue o grafo de importações de cada
entrada, pelo que os ficheiros que nunca aparecem no programa de compilação continuam
a ser verificados nesse contexto.

A consequência é importante ao avaliar se um ficheiro está tipado: **zero diagnósticos
em `check:build-typecheck` não significa zero**. Remover `@ts-nocheck` de 26
ficheiros mostrou que 23 deles estavam limpos no programa de compilação; dezasseis
desses revelaram cerca de 120 erros de `implicit-any` no programa estrito. Verifique
ambos antes de considerar um ficheiro limpo.

### Tarefa: `quality-gate`

É executada após `test-coverage`. Bloqueia a integração em caso de falha.

| Script                       | Valida                                                                                                                                                                                                | Bloqueante                                          |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `quality:collect`            | Emite `quality-metrics.json` (contagem de avisos do ESLint, cobertura proveniente do relatório combinado dos fragmentos)                                                                              | Sim (a montante do mecanismo de ajuste progressivo) |
| `quality:ratchet`            | Cada métrica em `quality-baseline.json` não sofreu regressões (avisos do ESLint ≤ linha de base; cobertura ≥ linha de base)                                                                           | Sim                                                 |
| `check:duplication`          | A duplicação de código (jscpd@4) não excede a linha de base em `quality-baseline.json`                                                                                                                | Sim                                                 |
| `check:complexity`           | A complexidade ciclomática ao nível do ficheiro não excede o limite (regras `complexity` + `max-lines-per-function` do ESLint principal)                                                              | Sim                                                 |
| `check:cognitive-complexity` | Mecanismo de ajuste progressivo da complexidade cognitiva (`eslint-plugin-sonarjs`) — execução separada do ESLint; o CI executa ambos de forma combinada numa única etapa `check:complexity-ratchets` | Sim                                                 |
| `check:dead-code`            | O mecanismo de ajuste progressivo de exportações/ficheiros não utilizados (knip) não sofre regressões em relação à linha de base                                                                      | Sim                                                 |
| `check:compression-budget`   | Orçamento do teste de desempenho de compressão — os limites mínimos de poupança de tokens por motor não podem sofrer regressões                                                                       | Sim                                                 |
| `check:type-coverage`        | O mecanismo de ajuste progressivo da percentagem de código tipado (`type-coverage`) não sofre regressões; substitui em grande medida `typecheck:noimplicit:core`                                      | Sim                                                 |

### Jobs: `codeql-scan` e `codeql-admission`

`codeql-scan` produz todas as categorias de análise configuradas. Depois que esse job tem sucesso, `codeql-admission` valida seus uploads exatos e a ratchet de alertas da candidata. Ambos são dependências obrigatórias de `Gate / CI`, inclusive para candidatas que alteram apenas documentação. Os requisitos de ativação administrativa e canary estão descritos em "Ratchet do CodeQL" abaixo.

| Script                 | Valida                                                                                                                                                                                                                               | Bloqueante |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `check:codeql-ratchet` | A ref/SHA da candidata e todas as categorias de análise configuradas precisam estar atualizadas antes da ratchet de alertas; evidências ausentes bloqueiam. O inventário global permanece separado — veja "Ratchet do CodeQL" abaixo | Sim        |

### Tarefa: `quality-extended`

A tarefa bloqueia os candidatos aplicáveis. O tamanho do pacote, as deteções de segredos, as deteções de vulnerabilidades, as deteções no fluxo de trabalho e as alterações à OpenAPI são verificados com mecanismos obrigatórios de ajuste progressivo. Os diagnósticos de dependências circulares continuam a ser meramente informativos. A instalação dos analisadores é obrigatória: `scripts/ci/install-quality-scanners.sh` disponibiliza versões fixas e propaga as falhas de instalação. A ausência de ferramentas, relatórios inválidos ou linhas de base em falta deixa a verificação obrigatória do analisador INCOMPLETA.

| Script                   | Valida                                                                                                                                                                                                                               | Bloqueio                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| `check:circular-deps`    | Ausência de dependências circulares (dpdm)                                                                                                                                                                                           | **Consultivo**                                           |
| `check:bundle-size`      | O tamanho do pacote não excede o limite; uma medição indisponível provoca uma falha                                                                                                                                                  | **Bloqueante com --ratchet**                             |
| `check:secrets`          | As deteções do Gitleaks não regridem; as análises obrigatórias rejeitam ferramentas/código-fonte/referências em falta, análises falhadas e relatórios inválidos                                                                      | **Bloqueante com --ratchet**                             |
| `check:vuln-ratchet`     | As vulnerabilidades das dependências não regridem; as análises obrigatórias rejeitam ferramentas em falta, relatórios inválidos ou referências em falta                                                                              | **Bloqueante com --ratchet**                             |
| `check:workflows`        | Lint dos workflows (actionlint + zizmor); scanners em falta/com falhas, relatórios inválidos ou uma referência de ratchet em falta resultam em INCOMPLETE. As deteções válidas seguem a política strict/advisory/ratchet selecionada | Execução obrigatória; ratchet do zizmor bloqueante em CI |
| `check:openapi-breaking` | Contrato da API pública comparado com commits de eventos fixados (merge-base do PR, estado anterior ao push, base do merge-group; primeiro ascendente do checkout agendado/manual); uma medição obrigatória falha de forma segura    | **Bloqueante com --ratchet**                             |

### Cargo: `docs-sync-strict`

Para pedidos pull para `main` ou `release/**`, este trabalho é executado apenas para candidatos não rascunhos (ou fila fidedigna) classificados como documentação ou alterações de código. Também funciona em eventos CI não PR; o disparo push deste fluxo de trabalho cobre apenas `main`, não `release/**`. Uma etapa que sai diferente de zero bloqueia o trabalho; as constatações apenas de relatório e as isenções documentadas abaixo não o fazem.

| Script                         | Valida                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Bloqueio                                                                                                                                                 |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-gate que executa sequencialmente os 7 sub-gates abaixo                                                                                                                                                                                                                                                                                                                                                                                                                         | Sim                                                                                                                                                      |
| ↳ `check:docs-sync`            | Consistência da versão Package/OpenAPI/CHANGELOG, espelhos `llm.txt` exactos, invariantes CHANGELOG section/size traduzidos e ausência de documentos duplicados substituídos                                                                                                                                                                                                                                                                                                        | Sim                                                                                                                                                      |
| ↳ `check:docs-frontmatter`     | As páginas de documentação compiladas possuem títulos de frontmatter válidos                                                                                                                                                                                                                                                                                                                                                                                                        | Sim                                                                                                                                                      |
| ↳ `check:docs-counts`          | Os invariantes de contagem de alta confiança são estritos; as verificações heurísticas de contagem de ficheiros apenas avisam, a menos que o script receba `--strict` (o meta-gate CI não passa)                                                                                                                                                                                                                                                                                    | Bloqueio estrito de níveis; consultoria de nível flexível                                                                                                |
| ↳ `check:env-doc-sync`         | Leituras do ambiente de origem, `.env.example` e `docs/reference/ENVIRONMENT.md` concordam após as listas de permissões explícitas ignorar, apenas documento e apenas ambiente                                                                                                                                                                                                                                                                                                      | Sim, fora das listas de permissões documentadas                                                                                                          |
| ↳ `check:deprecated-versions`  | Reporta possíveis versões desatualizadas fora de contextos históricos seguros e datas de atualização desatualizadas, excluindo documentos ignorados                                                                                                                                                                                                                                                                                                                                 | Consultoria na cablagem CI atual (`--strict` não está aprovado)                                                                                          |
| ↳ `check:doc-links`            | As ligações de remarcação interna em documentos são resolvidas para ficheiros reais (formulário `[text]`/`(path)` )                                                                                                                                                                                                                                                                                                                                                                 | Sim                                                                                                                                                      |
| ↳ `check:fabricated-docs`      | Rotas, env vars, comandos CLI, nomes de ganchos e caminhos de ficheiros citados nos documentos existem na base de código. Portão rígido via `--strict`; falha suave sem sinalizador.                                                                                                                                                                                                                                                                                                | Sim (via `--strict` em CI)                                                                                                                               |
| `check:cli-i18n`               | As chaves `t()` utilizadas pela CLI existem em `en`; `pt-BR` mantém todas as secções de nível superior; `zh-CN` e `zh-TW` contêm todas as chaves de `en`                                                                                                                                                                                                                                                                                                                            | Sim                                                                                                                                                      |
| `check:openapi-coverage`       | A especificação OpenAPI cobre, no mínimo, um limite inferior sujeito a ratchet das rotas reais                                                                                                                                                                                                                                                                                                                                                                                      | Sim                                                                                                                                                      |
| `check:openapi-security-tiers` | As anotações declaradas `x-loopback-only`/`x-always-protected` têm de ser sustentadas por `routeGuard.ts`; os erros do parser e as divergências na verificação direta bloqueiam. A verificação inversa de `x-loopback-only` em falta sob prefixos de acesso exclusivamente local emite avisos, e as rotas definidas apenas por padrões são excluídas dessa verificação inversa.                                                                                                     | As verificações do parser e diretas bloqueiam; a verificação inversa é consultiva                                                                        |
| `check:openapi-routes`         | Cada caminho `/api...` em `openapi.yaml` corresponde a uma rota real independentemente dos parâmetros, após a aplicação da lista de exceções justificadas `KNOWN_STALE_SPEC`; as entradas obsoletas dessa lista também causam falha                                                                                                                                                                                                                                                 | Sim                                                                                                                                                      |
| `check:docs-symbols`           | As referências internas a URL `/api/...` nos documentos canónicos que não são espelhos correspondem a uma rota real ou família de rotas; as referências a proxy/upstream/marcadores de posição/ficheiros e as entradas justificadas de `KNOWN_STALE_DOC_REFS` são excluídas, e as entradas obsoletas da lista de exceções causam falha                                                                                                                                              | Sim                                                                                                                                                      |
| `i18n translation drift`       | A admissão absoluta requer zero inconsistências de origem, alvo em falta, hash de destino, tradução obsoleta e cache de secção. A preparação PR comum pode reter provas herdadas exatas ou uma alteração pendente apenas em inglês com o estado completo inalterado e os bytes de destino; o seu relatório declara separadamente a prontidão para a fusão. Hashes de destino em falta e bloco de evidência de base incompleto. Um cache de secção herdado em falta não é uma falha. | Todas as cinco classes bloqueiam a admissão queue/base ; a preparação normal permite apenas trabalhos pendentes herdados comprovados ou apenas em inglês |

Os doze README SVGs sob `docs/diagrams/` são gerados (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` regenera todos eles). Cada um tem um teste de unidade de comparação de bytes (`tests/unit/docs/readme-*-svg.test.ts`, trabalho `test-unit`) que falha quando o ficheiro confirmado está obsoleto e `check:docs-counts` lê números canónicos dos seus nós `<text>` —, e é por isso que a etapa de estrutura de tópicos mantém cada string delineada no ficheiro como invisível `<text>`. A verificação de números canônicos SVG lê os arquivos listados em `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, mais `public/images/tier-flow-dark.svg` e `tier-flow-light.svg`; as reivindicações de graça para sempre, entrada de catálogo, pool recorrente e fatores de pontuação também são `promise-pillars.svg`, `free-tier-budget.svg` e `strategies-grid.svg`. `free-tier-budget.svg` extrai os seus números do carregador de catálogo ativo, pelo que uma alteração no `FREE_MODEL_BUDGETS` ou no nome de visualização de um fornecedor torna CI vermelho até que esse ficheiro seja regenerado.

### Job: `i18n-ui-coverage`

| Script                            | Valida                                                                                                                                                                                                          | Bloqueante     |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | A cobertura de chaves de i18n da IU é ≥ 65%                                                                                                                                                                     | Sim            |
| `check-ui-value-drift` (inline)   | Um **valor** em inglês reescrito não deixa para trás nenhuma tradução obsoleta                                                                                                                                  | Sim            |
| `check-new-key-coverage` (inline) | Uma chave inglesa **nova** está traduzida em todas as localidades — um marcador `__MISSING__:` é rejeitado                                                                                                      | Sim            |
| `check-translation-ratio`         | O rácio de traduções reais por localidade (folhas idênticas ao inglês/com marcadores de posição/em falta fora da lista de permissões) não pode exceder `config/quality/i18n-translation-baseline.json` + margem | **Bloqueante** |

Requer `fetch-depth: 0` — a verificação de divergência de valores compara `en.json` com a base de integração.

#### `check-ui-value-drift` — gate de traduções obsoletas

Deteta a única regressão de i18n que as outras verificações não conseguem detetar estruturalmente: um valor em inglês
é reescrito e as traduções derivadas do inglês _anterior_ permanecem, pelo que
os utilizadores que não falam inglês continuam a ler um texto assertivo que agora está errado.

Isto aconteceu realmente em produção. `oauthModal.googleOAuthWarning` foi reescrito quando o auxiliar de
início de sessão Antigravity foi introduzido (#5203); **39 de 43 localidades** mantiveram texto que indicava aos operadores para "copiarem o
URL completo e o colarem abaixo" — um fluxo que não pode ser concluído para esse fornecedor. O problema
passou despercebido até ao #8463 porque:

- `sync-ui-keys` apenas preenche chaves que estão **ausentes**, nunca as que estão **obsoletas**;
- `check-ui-keys-coverage` contabiliza a _presença_ das chaves, pelo que uma tradução obsoleta conta como coberta;
- `check-translation-drift` monitoriza as réplicas da documentação em `docs/i18n/<locale>/**.md` —
  nunca lê `src/i18n/messages/*.json`. Bloqueante no job `docs-sync-strict` desde a
  resincronização de 2026-09: edite um documento principal → `npm run i18n:run -- --files=<doc>` (ao nível da secção, pouco dispendioso).

**Sensível às diferenças, sem suporte de uma linha de base.** Compara o `en.json` na base de integração com a
árvore de trabalho; para cada chave cujo valor em inglês foi alterado, qualquer localidade que ainda contenha uma
tradução não modificada está obsoleta. Isto **congela deliberadamente a dívida preexistente** — uma diferença
não consegue revelar de que versão antiga do inglês surgiu uma tradução de longa data, pelo que a verificação avalia
apenas aquilo em que a alteração atual toca. A alternativa (uma linha de base de hashes por chave) exigiria
um ficheiro gerado de ~600 KB, 3× maior do que a maior linha de base existente, e seria alterado em cada PR de i18n.

Há duas formas de satisfazer esta verificação:

1. atualizar as traduções afetadas; ou
2. defini-las como `__MISSING__:<new english>` — o runtime fornece então o inglês corrigido
   (`src/i18n/request.ts::deepMergeFallback`, #7258) e a chave entra na fila para tradução.

Se o **significado** da cadeia tiver mudado, prefira **mudar o nome da chave**: uma chave nova não pode herdar
uma tradução obsoleta. Foi este o padrão utilizado pelo #8463.

```bash
npm run i18n:check-value-drift          # estrito (o que a CI executa)
npm run i18n:check-value-drift:warn     # apenas comunicar
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Os mecanismos de controlo de divergência de valores e de novas chaves partilham uma comparação imutável de
`scripts/i18n/resolve-ui-diff-base.mjs`. O workflow passa a mesma base, ponta da base e
SHAs candidatos a ambas as verificações. As execuções de PR/redirecionamento da base, push e grupo de merge utilizam o respetivo contexto
de evento. A execução manual para um branch candidato requer o respetivo PR aberto exato ou o input explícito
`i18n_base_sha`. A execução manual ou a observação agendada de `main` ou `release/vX.Y.Z`
sem esse input compara o último commit com o respetivo primeiro elemento pai; não constitui uma auditoria de
toda a dívida de tradução herdada. A invocação local requer uma base de comparação explícita,
por exemplo, o comando `BASE_REF` acima.

Um contexto de comparação em falta ou ambíguo, um catálogo obrigatório ilegível ou inválido e
um candidato alterado produzem `INCOMPLETE` com o código de saída **2**, incluindo no modo de aviso.
As leituras de catálogos utilizam `scripts/i18n/read-ui-catalog.mjs`; as falhas de leitura não são substituídas
por objetos vazios. Nem uma base indisponível nem um input incompleto estabelecem PASS.

### Trabalho: `i18n`

Matriz de validação i18n completa (um trabalho por localidade). Todo o trabalho é consultivo.

| Argumento                       | Valida                                | Bloqueio                                                      |
| ------------------------------- | ------------------------------------- | ------------------------------------------------------------- |
| `validate_translation.py quick` | Completude da tradução por localidade | **Consultivo** (`continue-on-error: true` em todo o trabalho) |

### Trabalho: `pr-test-policy`

É executado apenas em pull requests.

| Argumento              | Valida                                                                                                                                 | Bloqueio |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | PRs que alterem o código de produção em `src/`, `open-sse/`, `electron/` ou `bin/` devem incluir ou atualizar testes (regra rígida #8) | Sim      |
| `check:test-masking`   | Os ficheiros de teste alterados não reduzem a contagem de declarações líquidas nem adicionam tautologias `assert.ok(true)`             | Sim      |
| `check:pr-evidence`    | PR body cita test/VPS evidências para a mudança (mecaniza Hard Rule #18 grep PR prose — frágil, ver Backlog)                           | Sim      |

### Tarefa: `test-vitest`

Requer a tarefa de classificação `changes`. As partições aplicáveis da matriz bloqueiam a integração em caso de falha.

| Suite            | Valida                                                             | Bloqueante                                                                                                                   |
| ---------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Servidor MCP (110 ferramentas), autoCombo, cache — executor vitest | Sim                                                                                                                          |
| `test:vitest:ui` | Testes de componentes da IU — executor vitest                      | **Bloqueante** — as falhas preexistentes são explicitamente excluídas em `vitest.config.ts`; novas falhas fazem o job falhar |

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
