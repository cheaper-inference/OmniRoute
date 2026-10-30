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

### Admissão de candidatos

Os workflows de CI e Quality emitem, cada um, um veredicto estável: `Gate / CI` e
`Gate / Quality`. A respetiva política de admissão versionada enumera todos os jobs
a montante como obrigatórios ou consultivos. Um job obrigatório aplicável tem de ser
bem-sucedido: resultados em falta, cancelados, ignorados, pendentes e desconhecidos não
permitem estabelecer PASS. Uma classificação válida de apenas documentação ou apenas
catálogo pode tornar uma lane de código não aplicável; um PR em rascunho não é um
candidato aceite. Uma etiqueta `hotfix` não dispensa a apresentação de provas.

Ambos os workflows abrangem PRs para branches main/release, pushes para `main`, execução
manual e eventos de merge group. Push, execução manual e merge group executam a seleção
completa. Os pushes para `release/**` não os iniciam (2026-10-18): cada alteração já
executou a matriz no respetivo PR e a combinação após o merge é responsabilidade do
Release-Green (`docs/ops/RUNNER_BOX.md` → Lane alojada). Os forks e merge groups utilizam
runners alojados para jobs que, de outro modo, selecionariam runners autoalojados; antes
da implementação, é necessário confirmar que existe capacidade alojada suficiente.

Cada recibo JSON identifica o SHA do checkout, a execução do workflow e a tentativa.
A CLI rejeita uma divergência entre o SHA do checkout e o SHA do evento. Os testes do
workflow associam a pertença à política à lista `needs` do job de veredicto, para que uma
lane nova ou removida não possa desaparecer silenciosamente. Os recibos abrangem o seu próprio fluxo de trabalho, não a publicação, a implementação nem os componentes internos
de um analisador consultivo existente. Tornar obrigatórias, nas regras de ramificação, as verificações aplicáveis
é uma alteração administrativa separada; definir as respetivas tarefas não protege, por si só, uma ramificação.

`API Route Typecheck` é uma verificação independente do fluxo de trabalho, fora de ambos os veredictos agregados
e do perfil estático do observador local completo. Inspecione separadamente o respetivo resultado para o candidato exato.
`.github/workflows/api-route-typecheck.yml` é executado em PRs destinados a `main` ou
`release/**`, em pushes para qualquer uma dessas famílias de ramificações e por acionamento manual. Não tem nenhum filtro de caminhos.
As alterações à ramificação de destino do PR solicitam uma nova verificação; as edições do corpo/título utilizam o nome apenas de observação
`Admission not requested / API Route Typecheck` e não podem substituir a verificação de admissão.
O fluxo de trabalho não declara um acionador de grupo de integração. Qualquer implementação de uma fila de integração que exija
esta verificação tem primeiro de estabelecer a sua execução para esse evento.

### Capacidade de execução da UI

O CI executa o inventário completo da UI em quatro shards de matriz `test-vitest`, cada
um com, no máximo, dois workers e o prazo existente de 15 minutos por job. O primeiro
shard também executa a suite Vitest de MCP/autoCombo. O resultado do job obrigatório
abrange todos os elementos da matriz; a falha ou o cancelamento de um shard não permite
estabelecer a admissão do candidato.

O observador noturno mantém um recibo separado do candidato exato para cada shard da UI,
incluindo a execução de MCP no primeiro recibo. São obrigatórios os quatro recibos, os
logs e as identidades de execução correspondentes. O comando local
`npm run test:vitest:ui` continua a selecionar a suite completa; uma execução com
`--shard` constitui apenas prova parcial.

### Recolha de cobertura unitária

Os doze shards unitários recolhem cobertura V8 durante a execução dos testes existentes.
Um shard bem-sucedido executa `scripts/ci/compact-v8-coverage.mjs` para comprimir os
ficheiros originais sem gerar um relatório Istanbul intermédio. O job final Coverage
verifica os doze manifestos relativamente ao SHA do candidato, runtime, raiz do código-fonte
e hashes dos dados e, em seguida, executa os reporters do c8 e os limiares de cobertura
existentes. Os inputs preservam a ordem global dos nomes de ficheiro do c8; a pré-fusão
por shard não é segura para cobertura mista de funções/blocos. Shards em falta, malformados
ou incompatíveis fazem falhar a admissão. Os shards de teste que falharem preservam
separadamente a cobertura de diagnóstico em bruto; esta não pode entrar na fusão final.

### Comprovativos do progresso da execução de unidades

O comando partilhado `test:unit:ci:shard` regista as fases `primary`, `dashboard` e `serial`
através de `scripts/ci/unit-progress-reporter.mjs`. O relatório de testes normal continua
disponível. Um comprovativo separado, apenas com metadados, regista o início e a conclusão
de cada ficheiro, e um sinal de atividade a cada 30 segundos apresenta os ficheiros que ainda
estão ativos e o respetivo tempo decorrido. Regista apenas metadados de execução incluídos
na lista de permissões; as descrições, os resultados, os conteúdos dos erros e o ambiente
completo dos testes não são serializados.

A CI e o Quality conservam os ficheiros JSONL como `unit-progress-ci-<run>-<attempt>-<shard>` e
`unit-progress-quality-<run>-<attempt>-<shard>`. O tempo limite de uma tarefa pode impedir o
carregamento posterior; os sinais de atividade já emitidos continuam a constituir evidências
de diagnóstico. A ausência de sinais de atividade também pode indicar um processo do executor
bloqueado ou terminado. Estes comprovativos preservam a seleção de testes, a simultaneidade,
os prazos e o estado de saída existentes; não constituem veredictos de admissão de candidatos.

### Evidências conservadas no redutor de aceitação

`scripts/quality/validate-release-acceptance.mjs` agrega um plano fornecido e os seus manifestos; não comprova que o plano abrange todo o processo de release. Os seus relatórios definem explicitamente `releaseAcceptance: false`, mesmo quando o plano está `VERIFIED`. O workflow `release-acceptance.yml` continua a usar dados de teste em modo shadow, não recibos reais de build, empacotamento, arranque ou promoção.

A CLI exige `--evidence-root` para verificar as evidências conservadas. Os ficheiros são localizados em `<evidence-root>/<artifact_id>/<member>` e é calculado o respetivo hash SHA-256. Um registo PASS sem evidências, um ficheiro em falta ou alterado, um caminho inseguro ou uma ligação simbólica impede a verificação. Ficheiros em falta não equivalem a logs vazios de execuções bem-sucedidas. As verificações existentes de SHA/run/attempt continuam independentes: bytes coincidentes não tornam válido um recibo desatualizado. A integridade do ficheiro não prova a autenticidade da execução nem a promoção do artefacto.

### Inventário de análise estática

O inventário versionado de aliases npm e a pertença à análise estática encontram-se em
`config/quality/gate-manifest.json`. Execute `npm run check:gate-manifest` para validar
os nomes dos scripts e os comandos exatos relativamente a `package.json`; adições,
remoções e desvios de comandos fazem falhar tanto o hook local como os jobs de
classificação de alterações no CI. Um alias não é um job de workflow, uma instância
da matriz nem um caso de teste: estas contagens não devem ser apresentadas como
intermutáveis.

Utilize `npm run quality:scan -- --list` ou `npm run quality:scan:fast -- --list`
para inspecionar os aliases selecionados sem os executar. O runner invoca o entrypoint
npm, pelo que o respetivo runtime (incluindo Bun, quando configurado) é preservado.
O manifesto regista como invocados separadamente os aliases fora desses perfis, e os
comandos de manutenção são proibidos em perfis de análise só de leitura.

Estes perfis abrangem apenas a análise estática. Não certificam testes do produto,
cobertura, empacotamento, verificações externas nem a aceitação completa de lançamento
de um candidato. A admissão do workflow utiliza o ficheiro associado
`config/quality/admission-policy.json` e `scripts/quality/admission-verdict.mjs`. Os
perfis do observador de lançamentos permanecem separados; inspecione de forma
independente as respetivas verificações e recibos aplicáveis. Os comandos estáticos do
observador completo são declarados em `config/quality/release-green-static-profile.json`,
incluindo `audit:deps`, a seleção de testes de mutação e as verificações de tradução.
O loader valida os comandos npm relativamente a package.json e às declarações modeladas
de CI/Quality; rejeita desvios em vez de executar tokens da shell como argumentos. Um
output SKIP/INCOMPLETE de um scanner obrigatório não permite estabelecer PASS. O perfil
regista as respetivas exclusões externas e não substitui provas de cobertura alojada,
matrizes de testes, pacotes ou implementação. O inventário em prosa abaixo é uma
referência, não uma prova de que um gate foi efetivamente executado.

Os scripts encontram-se em `scripts/check/` (gates de políticas) e
`scripts/quality/` (motor de ratchet). A fonte de verdade do CI é
`.github/workflows/ci.yml`.

### Estado da documentação base publicada

`.github/workflows/i18n-base-health.yml` monitoriza o estado da documentação após determinados
pushes para `main` e `release/v*`, bem como em execuções manuais. Os respetivos filtros abrangem a documentação,
os ficheiros Markdown na raiz, `llm.txt`, o estado/configuração das traduções e as ferramentas de i18n relevantes.
A única tarefa `Published base documentation health` utiliza Ubuntu alojado e um limite de
cinco minutos. Efetua uma validação só de leitura e gera um comprovativo de diagnóstico sem
instalar dependências, traduzir ou adotar o estado.

`scripts/i18n/check-base-health.mjs` exige a inexistência de inconsistências de hash da origem, alvos em falta, hash
do alvo, traduções desatualizadas e cache de secções. Também valida o âmbito atual dos documentos
principais/regiões e a respetiva proveniência registada. Um contexto inválido, uma cobertura incompleta
ou uma verificação interrompida produz `INCOMPLETE`; um desvio confirmado produz `FAIL`. Ambos
devolvem um estado de saída de falha. O comprovativo fica associado ao SHA do checkout, ao fluxo de trabalho, à execução e
à tentativa, sendo conservado como `i18n-base-health-<sha>-<run>-<attempt>`.

Esta é uma observação independente da base publicada. Não adiciona um evento de PR ou
grupo de integração, uma verificação de PR obrigatória, um alias npm nem um membro do perfil de análise estática.
A política diferencial de PR existente e as classificações de aviso do verificador subjacente
permanecem separadas. Um carregamento bem-sucedido não pode transformar um resultado de estado com falha em PASS.

### Via rápida para PRs de release (`quality.yml`)

`.github/workflows/quality.yml` complementa o CI em PRs para main/release, pushes para
`main`, execução manual e merge groups. Os PRs utilizam verificações rápidas filtradas
por caminhos. O build duplicado permanentemente desativado foi removido; as verificações
reais de build/pacote/arranque permanecem no CI.

| Tarefa                                           | Âmbito                                                                                                                                                                                                                                                | Bloqueante           |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | PRs de documentação/código; referências da documentação da API e toda a documentação                                                                                                                                                                  | Sim                  |
| `Fast Quality Gates`                             | PRs de código; verificações estáticas, verificação de tipos, verificação de tipos do dashboard, testes unitários afetados                                                                                                                             | Sim                  |
| `Forgotten sibling tests`                        | PRs de código; módulos alterados rastreados até consumidores estáticos e potenciais testes relacionados; caminhos de barrel e de importação dinâmica são comunicados como diagnósticos de aviso, com as exceções referenciadas da lista de permissões | **Aviso**            |
| `Vitest (fast-path)`                             | PRs de código; conjunto rápido de testes vitest                                                                                                                                                                                                       | Sim                  |
| `Unit Tests fast-path`                           | PRs de código; conjunto de testes unitários dividido em 4 shards                                                                                                                                                                                      | Sim                  |
| `No new ESLint warnings`                         | PRs de código; proteção de lint com reconhecimento de supressões                                                                                                                                                                                      | Sim, incluindo forks |
| `Merge integrity (changelog + generated skills)` | PRs que não estejam em rascunho; sincronização do registo de alterações e das competências geradas                                                                                                                                                    | Sim, incluindo forks |

#### Relatório de testes relacionados esquecidos

`npm run check:forgotten-sibling-tests` reutiliza o resolvedor de importações subjacente ao mapa de impacto dos testes.
Para cada módulo de produção alterado, comunica cadeias determinísticas
`changed module/symbol -> static consumer -> candidate sibling test` quando o teste
potencial não está presente no diff do pull request. O resumo em Markdown e o resultado JSON são mantidos como
o artefacto de workflow `forgotten-sibling-tests` para calibração antes de qualquer adoção como verificação bloqueante.

As reexportações de barrel e as importações dinâmicas são apenas diagnósticos de resolução; nunca criam uma
ocorrência bloqueante. As exceções revistas encontram-se em
`config/quality/forgotten-sibling-allowlist.json`. Cada entrada tem de indicar o consumidor e o teste
potencial, fornecer uma justificação específica e incluir uma ligação para um issue ou pull request do GitHub. As entradas malformadas
provocam uma falha por predefinição. As exceções não podem suprimir um teste potencial eliminado nem um diff que adicione `.skip`/`.todo`;
o enfraquecimento de asserções e outras formas de ocultação continuam a ser da responsabilidade da verificação bloqueante independente
`check:test-masking`.

### Tarefa: `lint`

É executada em todos os PRs para `main`. Bloqueia a integração em caso de falha.

| Script (`npm run ...`)            | Valida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Bloqueante                                  |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | A versão do Node.js está dentro do intervalo suportado                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sim                                         |
| `check:test-tla-order`            | Nenhum ficheiro de `node:test` em `tests/unit` regista um teste, encontra um `await` de nível superior e, em seguida, regista mais testes (#18045; controlo progressivo: `test-tla-order-allowlist.json` só pode diminuir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Sim                                         |
| `check:cycles`                    | Importações circulares em todo o `src/` + `open-sse/` (com base na AST, com os `paths` do tsconfig resolvidos). A execução isolada termina com o código 1 sempre que existe algum ciclo (falha em modo fechado desde a #15281) e apresenta as SCCs. `check:cycles:ratchet` (o que é executado pela CI) bloqueia quando a contagem excede o limite máximo de `metrics.cycles` em `quality-baseline.json` — atualmente 14, `direction: down`, pelo que só pode diminuir (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sim (controlo progressivo)                  |
| `check:boundary`                  | Acoplamento `open-sse → src`: importações únicas entre ficheiros do motor para a aplicação (`scripts/quality/measure-boundary.mjs`; a lista de ligações é a lista de trabalho pendente da correção da separação entre o núcleo e os módulos da v4). Execução isolada = relatório informativo (igual a `quality:boundary`). `check:boundary:ratchet` (o que é executado pela CI, também no ciclo de controlo progressivo das verificações rápidas de `quality.yml`) bloqueia quando a contagem excede o limite máximo de `metrics.boundaryOpenSseToSrc` em `quality-baseline.json` — inicializado com o valor medido de 771, `direction: down`; `--update` apenas o reduz; relativo à base nos PRs (`--base-ref`, ver abaixo)                                                                                                                                                                                                                                                                             | Sim (controlo progressivo)                  |
| `check:route-validation:t06`      | Esquemas Zod presentes em todas as rotas (política de Nível 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Sim                                         |
| `check:any-budget:t11`            | A contagem de `@ts-expect-error // any` não excede o limite (catraca de Nível 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sim                                         |
| `check:provider-consistency`      | Cada fornecedor em `providers.ts` tem uma entrada correspondente em `providerRegistry.ts` (e vice-versa, dentro da lista de permissões)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Sim                                         |
| `check:model-lifecycle`           | As três tabelas de encaminhamento mantidas manualmente permanecem consistentes com o instantâneo do ciclo de vida incluído no repositório (#11503): `FITNESS_TABLE` (`taskFitness.ts`) não atribui pontuação a nenhum id descontinuado que `REGISTRY` consiga encaminhar; cada destino de `BUILT_IN_ALIASES` está presente em `REGISTRY` e ausente do instantâneo de ids descontinuados; cada id descontinuado ainda presente em `REGISTRY` é reencaminhado ou indicado em `allowedRetiredInCatalog`; e nenhuma origem ou destino de `DEFAULT_DEGRADATION_MAP` aparece como descontinuado nesse instantâneo. Isto não prova que um modelo seja atualmente disponibilizado por um serviço a montante ativo. Offline — compara com `config/quality/model-lifecycle.json`, atualizado manualmente com `npm run quality:refresh-model-lifecycle` (rede; não integrado no CI). `allowedRetiredInCatalog` é um mecanismo de redução progressiva: adicione uma entrada apenas com uma tarefa de acompanhamento. | Sim                                         |
| `check:fetch-targets`             | Cada `fetch("/api/...")` no `src/` do lado do cliente corresponde a um `route.ts` real                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sim                                         |
| `check:deps`                      | Todas as dependências instaláveis com `npm install`, em cada `package.json` do repositório, constam de `dependency-allowlist.json`; novos pacotes sem versão fixa ou que possam resultar de slopsquatting são assinalados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sim                                         |
| `audit:deps`                      | npm audit dos cinco lockfiles independentes (raiz, Electron, plugins OpenCode v1/v2 e fornecedor). Os avisos críticos bloqueiam; os avisos de nível elevado permanecem visíveis como advertências. Auditorias em falta/com falha são INCOMPLETAS e bloqueiam; os hashes dos locks e os relatórios por âmbito são mantidos.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Sim                                         |
| `check:lockfile`                  | Integridade de `package-lock.json` — registo https, hashes de integridade, sem substituições de anfitrião                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sim                                         |
| `check:licenses`                  | Lista de permissões de licenças SPDX para dependências de produção                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Sim                                         |
| `check:tracked-artifacts`         | Sem artefactos de compilação/links simbólicos de `node_modules` submetidos (também é executado no pre-commit do husky; o pre-push é intencionalmente ligeiro — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sim                                         |
| `check:ai-attribution`            | Sem rodapé `Co-Authored-By` de IA/bot ou de geração por IA nos commits, no título ou no corpo do PR — Regra Rígida #16 (no ciclo de verificações rápidas de `quality.yml` para PR→`release/**` — lê o payload do evento, não executa qualquer operação fora de PRs — e num passo exclusivo de PRs no lint de `ci.yml` para PR→`main`; também no hook `commit-msg` do husky; são permitidos coautores humanos; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:vitest-exclusions`         | Cada exclusão do Vitest indica um problema de acompanhamento e consta de `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sim                                         |
| `check:file-size`                 | Os ficheiros de origem (`.ts`/`.tsx` em `src/`, `open-sse/`, `electron/`, `bin/`) mantêm-se dentro de `cap` e os ficheiros de teste (`*.test.ts(x)`) dentro de `testCap`; os ficheiros fixados em `file-size-baseline.json` (`frozen` / `testFrozen`) não podem ultrapassar o tamanho registado                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sim                                         |
| `check:error-helper`              | As respostas de erro em executores/handlers utilizam `buildErrorBody()` / `sanitizeErrorMessage()` (Regra Rígida n.º 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sim                                         |
| `check:migration-numbering`       | Os ficheiros SQL de migração são numerados sequencialmente, sem lacunas nem duplicados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sim                                         |
| `check:public-creds`              | Não existem valores literais OAuth `client_id`/`client_secret` nem chaves Web do Firebase fora de `publicCreds.ts` (Regra Rígida n.º 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sim                                         |
| `check:db-rules`                  | Não existe SQL em bruto fora dos módulos de `src/lib/db/`; não existem importações «barrel» de `localDb.ts` (Regras Rígidas n.º 2/n.º 5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sim                                         |
| `check:known-symbols`             | Os executores de fornecedores, as estratégias de encaminhamento e os tradutores registados nas respetivas tabelas de expedição correspondem aos ficheiros no disco — sem símbolos órfãos ou não declarados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Sim                                         |
| `check:route-guard-membership`    | Todas as rotas que iniciam um processo filho são classificadas por `isLocalOnlyPath()` (Regras Rígidas n.º 15/n.º 17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sim                                         |
| `check:test-discovery`            | Todos os ficheiros `*.test.ts` / `*.spec.ts` no repositório são recolhidos por, pelo menos, um executor de testes (mecanismo de bloqueio progressivo: a lista de órfãos em `test-discovery-baseline.json` só pode diminuir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Sim                                         |
| `check:agent-skills-sync`         | Os artefactos de competências de agente gerados correspondem ao respetivo catálogo de origem (sem divergências)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:provider-asset-provenance` | Os logótipos/recursos dos fornecedores têm uma entrada de proveniência registada                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `lint:json`                       | Os ficheiros de configuração JSON são analisados e cumprem as regras de lint do repositório                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `typecheck:core`                  | Compilação de TypeScript sem erros (apenas avisos informativos)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sim                                         |
| `typecheck:noimplicit:core`       | `noImplicitAny` estrito — orientado para o futuro; muitos locais de chamada preexistentes ainda necessitam de anotações                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | **Informativo** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` limitado a `src/app/(dashboard)/**` (#7033) — a lista de permissões cuidadosamente selecionada de 27 ficheiros de `typecheck:core` não inclui qualquer TSX do dashboard, e `next build` também nunca efetua a verificação de tipos desse código (`next.config.mjs` define `ignoreBuildErrors: true`), pelo que as regressões de identificadores órfãos nessa área (#6625/#6909) eram invisíveis para a CI. Compara com uma linha de base congelada da contagem por ficheiro/por código TS (`config/quality/dashboard-typecheck-baseline.json`, seguindo o mesmo padrão de imposição de obsolescência de `check:known-symbols`) — apenas erros NOVOS que excedam a contagem da linha de base fazem falhar o controlo; reduza progressivamente a linha de base com `--update` quando um erro preexistente for corrigido.                                                                                                                                                                             | Sim                                         |

### Tarefa: `quality-gate`

É executada após `test-coverage`. Bloqueia a integração em caso de falha.

| Script                       | Valida                                                                                                                                                                                                                                      | Bloqueante                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `quality:collect`            | Emite `quality-metrics.json` (contagem de avisos do ESLint, cobertura proveniente do relatório consolidado dos shards)                                                                                                                      | Sim (a montante do mecanismo de melhoria progressiva) |
| `quality:ratchet`            | Cada métrica em `quality-baseline.json` não regrediu (avisos do ESLint ≤ linha de base; cobertura ≥ linha de base)                                                                                                                          | Sim                                                   |
| `check:duplication`          | A duplicação de código (jscpd@4) não excede a linha de base em `quality-baseline.json`                                                                                                                                                      | Sim                                                   |
| `check:complexity`           | A complexidade ciclomática ao nível do ficheiro não excede o limite (regras `complexity` + `max-lines-per-function` do ESLint base)                                                                                                         | Sim                                                   |
| `check:cognitive-complexity` | Mecanismo de melhoria progressiva da complexidade cognitiva (`eslint-plugin-sonarjs`) — execução separada do ESLint; a CI executa ambos, combinados no único passo `check:complexity-ratchets`                                              | Sim                                                   |
| `check:dead-code`            | O mecanismo de melhoria progressiva de exportações/ficheiros não utilizados (knip) não regride face à linha de base                                                                                                                         | Sim                                                   |
| `check:compression-budget`   | Orçamento do benchmark de compressão — os limites mínimos de poupança de tokens por motor não podem regredir                                                                                                                                | Sim                                                   |
| `check:type-coverage`        | O mecanismo de melhoria progressiva da percentagem de código tipado (`type-coverage`) não regride; substitui em grande medida `typecheck:noimplicit:core`                                                                                   | Sim                                                   |
| `check:codeql-ratchet`       | A contagem de alertas CodeQL abertos não regride (lida através de `gh api`; omissão controlada na ausência de token) — para a cadência de atualização e o acionamento manual, consulte "Mecanismo de melhoria progressiva do CodeQL" abaixo | Sim                                                   |

### Tarefa: `quality-extended`

A tarefa bloqueia os candidatos aplicáveis. O tamanho do bundle, as deteções de segredos, as deteções de vulnerabilidades, as deteções em workflows e as alterações à OpenAPI são verificados através dos mecanismos obrigatórios de melhoria progressiva. Os diagnósticos de dependências circulares permanecem consultivos. A instalação dos scanners é obrigatória: `scripts/ci/install-quality-scanners.sh` instala versões fixadas e propaga as falhas de instalação. A ausência de ferramentas, relatórios inválidos ou linhas de base em falta deixa o controlo obrigatório do scanner INCOMPLETO.

| Script                   | Valida                                                                                                                                                                                                                             | Bloqueio                                                 |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `check:circular-deps`    | Ausência de dependências circulares (dpdm)                                                                                                                                                                                         | **Consultivo**                                           |
| `check:bundle-size`      | O tamanho do bundle não excede o limite; uma medição indisponível resulta em falha                                                                                                                                                 | **Bloqueante com --ratchet**                             |
| `check:secrets`          | As deteções do Gitleaks não regridem; as análises obrigatórias rejeitam ferramentas/código-fonte/baseline em falta, análises falhadas e relatórios inválidos                                                                       | **Bloqueante com --ratchet**                             |
| `check:vuln-ratchet`     | As vulnerabilidades das dependências não regridem; as análises obrigatórias rejeitam ferramentas em falta, relatórios inválidos ou baselines em falta                                                                              | **Bloqueante com --ratchet**                             |
| `check:workflows`        | Lint dos workflows (actionlint + zizmor); scanners em falta/com falhas, relatórios inválidos ou uma baseline de ratchet em falta resultam em INCOMPLETE. As deteções válidas seguem a política strict/advisory/ratchet selecionada | Execução obrigatória; ratchet do zizmor bloqueante em CI |
| `check:openapi-breaking` | Contrato da API pública comparado com commits de eventos fixados (merge-base do PR, estado anterior ao push, base do merge-group; primeiro progenitor do checkout agendado/manual); uma medição obrigatória falha de forma segura  | **Bloqueante com --ratchet**                             |

### Tarefa: `docs-sync-strict`

Nos pull requests para `main` ou `release/**`, esta tarefa só é executada para candidatos que não estejam em rascunho (ou que estejam numa fila de confiança) e sejam classificados como alterações de documentação ou de código. Também é executada em eventos de CI que não são PR; o acionamento por push deste workflow abrange apenas `main`, não `release/**`. Um passo que termina com um código de saída diferente de zero bloqueia a tarefa; as ocorrências apenas reportadas e as isenções documentadas abaixo não a bloqueiam.

| Script                         | Valida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Bloqueio                                                                                                                                    |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-gate que executa sequencialmente os 7 sub-gates abaixo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sim                                                                                                                                         |
| ↳ `check:docs-sync`            | Consistência das versões do pacote/OpenAPI/CHANGELOG, espelhos exatos de `llm.txt`, invariantes das secções e do tamanho do CHANGELOG traduzido e ausência de documentos duplicados que já tenham sido substituídos                                                                                                                                                                                                                                                                                                                                                              | Sim                                                                                                                                         |
| ↳ `check:docs-frontmatter`     | As páginas de documentação compiladas contêm títulos de frontmatter válidos                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sim                                                                                                                                         |
| ↳ `check:docs-counts`          | Os invariantes de contagem com elevado grau de confiança são estritos; as verificações heurísticas da contagem de ficheiros apenas emitem avisos, salvo se o script receber `--strict` (o meta-gate de CI não o passa)                                                                                                                                                                                                                                                                                                                                                           | O nível estrito bloqueia; o nível flexível é consultivo                                                                                     |
| ↳ `check:env-doc-sync`         | As leituras de variáveis de ambiente no código-fonte, `.env.example` e `docs/reference/ENVIRONMENT.md` são coerentes após a aplicação das listas explícitas de exceções para elementos ignorados, presentes apenas na documentação e presentes apenas no ambiente                                                                                                                                                                                                                                                                                                                | Sim, fora das listas de exceções documentadas                                                                                               |
| ↳ `check:deprecated-versions`  | Reporta versões potencialmente desatualizadas fora de contextos históricos seguros e datas de atualização antigas, excluindo os documentos ignorados                                                                                                                                                                                                                                                                                                                                                                                                                             | Consultivo na configuração atual de CI (`--strict` não é passado)                                                                           |
| ↳ `check:doc-links`            | As ligações Markdown internas na documentação resolvem para ficheiros reais (formato `[text]`/`(path)`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sim                                                                                                                                         |
| ↳ `check:fabricated-docs`      | As rotas, variáveis de ambiente, comandos da CLI, nomes de hooks e caminhos de ficheiros mencionados na documentação existem na base de código. Gate rígido através de `--strict`; falha não bloqueante sem a flag.                                                                                                                                                                                                                                                                                                                                                              | Sim (através de `--strict` em CI)                                                                                                           |
| `check:cli-i18n`               | As chaves `t()` utilizadas pela CLI existem em `en`; `pt-BR` mantém todas as secções de nível superior; `zh-CN` e `zh-TW` contêm todas as chaves de `en`                                                                                                                                                                                                                                                                                                                                                                                                                         | Sim                                                                                                                                         |
| `check:openapi-coverage`       | A especificação OpenAPI abrange, no mínimo, um limite inferior sujeito a ratchet das rotas reais                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sim                                                                                                                                         |
| `check:openapi-security-tiers` | As anotações declaradas `x-loopback-only`/`x-always-protected` têm de ser sustentadas por `routeGuard.ts`; os erros do parser e as divergências na verificação direta bloqueiam. A verificação inversa de `x-loopback-only` em falta sob prefixos de acesso exclusivamente local emite avisos, e as rotas definidas apenas por padrões são excluídas dessa verificação inversa.                                                                                                                                                                                                  | As verificações do parser e diretas bloqueiam; a verificação inversa é consultiva                                                           |
| `check:openapi-routes`         | Cada caminho `/api...` em `openapi.yaml` corresponde a uma rota real independentemente dos parâmetros, após a aplicação da lista de exceções justificadas `KNOWN_STALE_SPEC`; as entradas obsoletas dessa lista também causam falha                                                                                                                                                                                                                                                                                                                                              | Sim                                                                                                                                         |
| `check:docs-symbols`           | As referências internas a URL `/api/...` nos documentos canónicos que não são espelhos correspondem a uma rota real ou família de rotas; as referências a proxy/upstream/marcadores de posição/ficheiros e as entradas justificadas de `KNOWN_STALE_DOC_REFS` são excluídas, e as entradas obsoletas da lista de exceções causam falha                                                                                                                                                                                                                                           | Sim                                                                                                                                         |
| `i18n translation drift`       | Verifica os hashes de origem/destino dos documentos principais e a proveniência da tradução. A comparação de PR permite apenas falhas herdadas idênticas; inconsistências novas ou não verificadas de origem, destino em falta, hash de destino, tradução desatualizada ou cache de secções bloqueiam. Fora da comparação de PR, as falhas de origem/destino em falta/hash de destino bloqueiam, enquanto as traduções desatualizadas e as caches de secções inconsistentes continuam a ser apenas avisos. A ausência de uma cache de secções no formato antigo não é uma falha. | Desvios novos/não verificados em PR bloqueiam; desvios herdados idênticos são apenas avisos; as regras fora de PR dependem do tipo de falha |

### Tarefa: `i18n-ui-coverage`

| Script                            | Valida                                                                                                                                                                                                                | Bloqueante     |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | A cobertura de chaves de i18n da IU é ≥ 65%                                                                                                                                                                           | Sim            |
| `check-ui-value-drift` (inline)   | Um **valor** em inglês reescrito não deixa para trás nenhuma tradução desatualizada                                                                                                                                   | Sim            |
| `check-new-key-coverage` (inline) | Uma chave **nova** em inglês está traduzida em todas as regiões — um marcador `__MISSING__:` é rejeitado                                                                                                              | Sim            |
| `check-translation-ratio`         | O rácio de traduções reais por região (valores idênticos ao inglês / marcadores de posição / entradas em falta fora da lista de permissões) não pode exceder `config/quality/i18n-translation-baseline.json` + margem | **Bloqueante** |

Requer `fetch-depth: 0` — a verificação de divergência de valores compara `en.json` com a base de integração.

#### `check-ui-value-drift` — verificação de traduções desatualizadas

Deteta a única regressão de i18n que as outras verificações não conseguem identificar estruturalmente: um valor em inglês
é reescrito e as traduções derivadas do inglês _anterior_ permanecem, pelo que
os utilizadores que não usam inglês continuam a ler um texto assertivo, mas agora incorreto.

Isto chegou efetivamente a produção. `oauthModal.googleOAuthWarning` foi reescrito quando o assistente
de início de sessão Antigravity foi introduzido (#5203); **39 de 43 regiões** mantiveram o texto que instruía os operadores a «copiar o
URL completo e colá-lo abaixo» — um fluxo que não pode ser concluído para esse fornecedor. Passou
despercebido até ao #8463 porque:

- `sync-ui-keys` apenas preenche chaves que estão **ausentes**, nunca as que estão **desatualizadas**;
- `check-ui-keys-coverage` contabiliza a _presença_ das chaves, pelo que uma tradução desatualizada conta como coberta;
- `check-translation-drift` acompanha os espelhos da documentação em `docs/i18n/<locale>/**.md` —
  nunca lê `src/i18n/messages/*.json`. Bloqueante no job `docs-sync-strict` desde a
  resincronização de 2026-09: editar um documento principal → `npm run i18n:run -- --files=<doc>` (ao nível da secção, rápido).

**Tem em conta o diff, não se baseia numa referência.** Compara o `en.json` na base de integração com a
árvore de trabalho; para cada chave cujo valor em inglês foi alterado, qualquer região que ainda contenha uma
tradução intacta está desatualizada. Isto **congela intencionalmente a dívida preexistente** — um diff
não consegue revelar de que versão antiga do inglês proveio uma tradução de longa data, pelo que a verificação avalia
apenas aquilo em que a alteração atual toca. A alternativa (uma referência de hashes por chave) exigiria
um ficheiro gerado de ~600 KB, 3× maior do que a maior referência existente, e alterado em cada PR de i18n.

Há duas formas de satisfazer esta verificação:

1. atualizar as traduções afetadas; ou
2. defini-las como `__MISSING__:<new english>` — em tempo de execução, é então apresentado o inglês corrigido
   (`src/i18n/request.ts::deepMergeFallback`, #7258) e a chave fica na fila para tradução.

Se o **significado** da cadeia tiver mudado, prefira **mudar o nome da chave**: uma chave nova não pode herdar
uma tradução desatualizada. Foi esse o padrão utilizado pelo #8463.

```bash
npm run i18n:check-value-drift          # modo estrito (o que a CI executa)
npm run i18n:check-value-drift:warn     # apenas gerar relatório
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

### Job: `i18n`

Matriz completa de validação de i18n (um job por região). Todo o job é consultivo.

| Script                          | Valida                            | Bloqueante                                               |
| ------------------------------- | --------------------------------- | -------------------------------------------------------- |
| `validate_translation.py quick` | Completude da tradução por região | **Consultivo** (`continue-on-error: true` em todo o job) |

### Job: `pr-test-policy`

É executado apenas em pull requests.

| Script                 | Valida                                                                                                                                                           | Bloqueante |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | Os PRs que alterem código de produção em `src/`, `open-sse/`, `electron/` ou `bin/` têm de incluir ou atualizar testes (Regra Rígida n.º 8)                      | Sim        |
| `check:test-masking`   | Os ficheiros de teste alterados não reduzem o número líquido de asserções nem adicionam tautologias `assert.ok(true)`                                            | Sim        |
| `check:pr-evidence`    | O corpo do PR cita provas de testes/VPS relativas à alteração (automatiza a Regra Rígida n.º 18 através de pesquisa no texto do PR — frágil, consulte o Backlog) | Sim        |

### Job: `test-vitest`

Requer a tarefa de classificação `changes`. As partições aplicáveis da matriz bloqueiam a integração em caso de falha.

| Conjunto         | Valida                                                             | Bloqueante                                                                                                                   |
| ---------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Servidor MCP (110 ferramentas), autoCombo, cache — executor vitest | Sim                                                                                                                          |
| `test:vitest:ui` | Testes de componentes da UI — executor vitest                      | **Bloqueante** — as falhas preexistentes são explicitamente excluídas em `vitest.config.ts`; novas falhas fazem o job falhar |

### Workflows noturnos (agendados, consultivos)

São executados segundo um agendamento cron (e através de `workflow_dispatch`), nunca em PRs. Todos são consultivos.

| Workflow               | Valida                                                                                                                                                                                     | Bloqueante     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `nightly-property`     | Testes baseados em propriedades com fast-check, uma seed aleatória e um elevado número de execuções                                                                                        | **Consultivo** |
| `nightly-resilience`   | Limite de crescimento do heap, injeção caótica de falhas, testes de carga/prolongados com k6                                                                                               | **Consultivo** |
| `nightly-llm-security` | Proteção contra injeção do promptfoo (modo de bloqueio) + sondas do garak (ignoradas sem um segredo de fornecedor)                                                                         | **Consultivo** |
| `nightly-schemathesis` | Fuzzing de contratos OpenAPI (schemathesis) contra uma instância ativa do OmniRoute utilizando `docs/openapi.yaml` — revela violações da especificação/erros 500 não tratados (Fase 8 B.4) | **Consultivo** |
| `nightly-mutation`     | Pontuação dos testes de mutação do Stryker na via rápida de testes unitários — os mutantes sobreviventes revelam asserções fracas                                                          | **Consultivo** |
| `nightly-compat`       | Matriz de compatibilidade do motor Node para os intervalos `engines.node` suportados                                                                                                       | **Consultivo** |

As linhas de base de desempenho (heap, TTFB, tempo de compilação) são registadas, mas não impostas como critérios de bloqueio: consulte [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

**Também não documentados acima** (consultivos, pouco sinal): a tarefa `docs-lint`
(markdownlint + Vale, com `continue-on-error` aplicado a toda a tarefa) e os workflows
autónomos de análise `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0`
está em `quality-baseline.json`, mas não está ligado a um mecanismo de bloqueio progressivo
em `ci.yml` — a métrica encontra-se atualmente órfã.

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
- `check:pr-evidence` (bloqueante, pesquisa texto livre no corpo do PR) — elevado risco de falsos positivos; a sua remoção enfraquece a aplicação da Regra Estrita n.º 18, pelo que esta é uma verdadeira decisão de política.
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
