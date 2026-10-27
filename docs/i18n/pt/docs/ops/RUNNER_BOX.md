# Self-Hosted Runner Box Operations (.113 pool) (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

O pool autoalojado é executado na máquina **.113** (`tomni-proxmox-113`). Desde 2026-10-18, cada
runner do OmniRoute tem **uma função**, uma etiqueta e um orçamento de memória/CPU dimensionado de acordo com a carga de trabalho
medida. O slot do Turbopack recebe os recursos necessários à compilação; os restantes slots são dimensionados de acordo com os respetivos
picos medidos. A máquina só fica com recursos sobrealocados quando uma compilação Turbopack coincide com uma compilação
webpack do Release-Green e uma tarefa de lint; a swap do anfitrião (16 GB) absorve essa carga e, como as compilações de pull requests são executadas
em infraestrutura alojada, o slot do Turbopack está inativo na maior parte do tempo:

| runner               | etiqueta                     | função                                                                                                                                                            | `MemoryHigh` / `MemoryMax` | `CPUQuota` |
| -------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------- |
| `omniroute-113-5`    | `omni-build`                 | compilações Turbopack: `ci.yml` `Build` (apenas push/dispatch), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, a compilação noturna de a11y | 56 GB / 60 GB (swap 0)     | 1600 %     |
| `omniroute-113-6`    | `omni-release`               | Release-Green (`release-green` + `main-green`), compilação webpack                                                                                                | 20 GB / 24 GB (swap 4 GB)  | 800 %      |
| `omniroute-113-2`    | `omni-light`                 | execuções noturnas (Schemathesis, promptfoo, garak, k6) e `quality.yml` `lint-guard`                                                                              | 12 GB / 16 GB (swap 4 GB)  | 600 %      |
| `omniroute-113`      | `omni-light`                 | o mesmo pool acima                                                                                                                                                | 8 GB / 12 GB               | 400 %      |
| OmniHeuris, OmniMind | (os respetivos repositórios) | apenas Dependabot (pico de 155 MB cada, 2026-10-18)                                                                                                               | 4 GB / 6 GB                | 200 % cada |

Medições de 2026-10-18:

| recurso   | valor                               | implicações para o agendamento                                                                                                                                                                                                                                                                                                                                                                                            |
| --------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **78 GB / 32 núcleos**              | uma compilação de produção Turbopack atingiu um pico de 49 GB sem limites (`tests/unit/ci-build-bundler-webpack.test.ts`); no Next 16.3.8, só a fase de compilação mantém ~40 GB (36 GB de RSS em `next-build` mais 17 workers de loader com 3 GB, medido em 2026-10-18); uma compilação webpack utiliza ~14–16 GB. Uma compilação Turbopack e uma compilação webpack cabem em simultâneo; duas compilações Turbopack não |
| swap      | 16 GB                               | `omniroute-113-5` é executado com a swap desativada (`MemorySwapMax=0`), para que uma compilação descontrolada seja terminada ao atingir o respetivo limite, em vez de colocar a máquina em swap                                                                                                                                                                                                                          |
| `/tmp`    | **12 GB tmpfs = RAM**               | tudo o que aí permanecer ocupa memória; os resíduos são removidos após 3 h                                                                                                                                                                                                                                                                                                                                                |
| CPU       | carga de 60 observada em 32 núcleos | antes das quotas, uma compilação Turbopack (~1166 % de CPU), juntamente com um conjunto de testes de cobertura na mesma máquina, privou os sinais de atividade dos restantes listeners de recursos (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                  |
| runners   | **6 listeners**                     | 4 do OmniRoute + OmniHeuris + OmniMind; `omniroute-113-3/-4/-7/-8` estão desativados (`systemctl enable --now` reativa um deles)                                                                                                                                                                                                                                                                                          |

Os limites encontram-se no ficheiro `/etc/systemd/system/actions.runner.<…>.service.d/override.conf` de cada unidade
(os valores anteriores foram mantidos como `override.conf.bak-20261018`) e foram aplicados sem interrupção com
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — sem reinício, pelo que nenhuma
tarefa em execução foi afetada. As etiquetas são alteradas através da API dos runners
(`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), também sem interrupção.

## Instalar o processo de limpeza (uma única vez, na máquina)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): a cada 30 min, registar em /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

O `lsof` é obrigatório: o processo de limpeza confirma que um caminho está inativo através de um instantâneo dos ficheiros abertos antes de o remover e, sem a ferramenta, não remove nada e indica esse facto (exit 1). Teste primeiro qualquer alteração com `--dry-run` — mostra exatamente o que faria sem alterar nada.

O que faz em cada execução: limpa os nossos próprios resíduos (`runner-*`, `omniroute-*`, `next-build*`, `e2e-build.tar.gz`) após **3 h em tmpfs** e 24 h no `_work/_temp` em disco; termina um `next-build` com mais de 75 min (nenhum job demora tanto tempo — em 2026-08-27, um deles continuou durante 70 min depois de o GitHub ter declarado o respetivo job como perdido); elimina checkouts com mais de 48 h pertencentes a runners cuja unidade esteja **parada**; emite alertas quando a utilização do disco é ≥ 85 %, o PSI de memória `full/avg60` é ≥ 10 % e existem mais listeners do que `MAX_ACTIVE_RUNNERS` (com uma discriminação entre omniroute/outros). Exit 1 = é necessária atenção; consulte o registo.

A regra dos 75 minutos não deteta uma compilação cujo job já tenha sido abandonado pelo GitHub. Quando o `Runner.Listener` não consegue renovar o respetivo job, o `_diag/Runner_*.log` mostra `POST request to …/renewjob timed out after 100 seconds`, a API indica o job como `completed` (falha) cerca de dez minutos após a última renovação bem-sucedida, e o `next-build` continua em execução sem qualquer job associado (2026-10-18: a compilação do #17066 foi marcada como falhada às 19:43 e, cinco minutos depois, ainda ocupava 40 GB). Confirme a ref no `_diag/Worker_*.log` mais recente e, em seguida, envie SIGTERM apenas à árvore de compilação através do PID — `next-build`, `npm run build`, `build-next-isolated.mjs` e os workers de `_work`. Nunca interfira com `Runner.Listener`, `RunnerService.js` ou `Runner.Worker`: o worker comunica o job como cancelado e o listener volta a ficar online por si próprio.

## Unidades dos runners: KillMode

O `KillMode=process` predefinido do runner deixa `Runner.Worker → npm → next-build` em execução quando uma unidade é parada ou reiniciada — uma compilação órfã continua a consumir RAM e CPU sem qualquer job associado. Cada unidade do OmniRoute inclui um drop-in (`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`) com `KillMode=mixed`: primeiro envia SIGTERM ao listener e depois SIGKILL a todo o cgroup em `TimeoutStop`. A alteração entra em vigor no próximo reinício da unidade — reinicie **um runner de cada vez, apenas quando estiver inativo**, efetuando a verificação de inatividade e o reinício no mesmo comando.

## Regras de operação

- **Uma compilação Turbopack de cada vez — imposto por etiqueta.** Todos os jobs que executam um
  `next build` completo com Turbopack visam `[self-hosted, omni-build]`, e apenas **`omniroute-113-5`**
  tem essa etiqueta: `ci.yml` `Build`, `npm-publish.yml` `publish`, `nightly-v4-build`,
  `preview-artifact`, a compilação noturna de a11y (#16853) e **amd64** de `docker-publish.yml`
  (webpack dentro do BuildKit — o Turbopack entrou em pânico aí, execução 33253576569). A etapa
  Docker arm64 permanece em `ubuntu-24.04-arm`. A amd64 de `docker-publish` partilha o grupo de
  concorrência `heavy-build-main` com `Build` de `ci.yml` (`cancel-in-progress: false`). O Docker
  Engine tem de estar em `omniroute-113-5`. Uma segunda vaga de Turbopack não cabe em 78 GB
  (2 × 33–37 GB mais o resto da máquina); uma segunda vaga só é segura para compilações webpack.
- **As compilações de pull requests são executadas em infraestrutura alojada (2026-10-18).**
  `Build` de `ci.yml` só chega a `omni-build` para `push` e `workflow_dispatch`; todas as compilações
  de `pull_request` (da própria origem ou de um fork) e `merge_group` são executadas em
  `ubuntu-latest` com webpack. Quando todos os PR da própria origem eram encaminhados para a vaga,
  uma compilação Turbopack ocupava-a durante 29–58 min, 18 compilações ficaram em fila até 18 h e
  a compilação de push do próprio ramo de lançamento conseguiu a vaga uma vez em 40 jobs. Em
  infraestrutura alojada, a mesma compilação de PR demora 8–12 min juntamente com os outros jobs
  do PR. O Turbopack, o bundler distribuído por `npm-publish`, continua a ser exercitado no ramo de
  lançamento pela compilação noturna de a11y do ramo predefinido (04:41 UTC), por todas as
  compilações de push ou dispatch que chegam à vaga e pelo próprio `npm-publish`.
  `tests/unit/build/heavy-build-queue.test.ts` fixa a condição de quatro cláusulas.
- **Nunca dimensionar a vaga de Turbopack abaixo da necessidade medida.** Em 2026-10-18 às 18:06,
  a vaga foi reduzida de 56G/60G para 40G/44G para libertar espaço para `omni-release`. A fase de
  compilação permaneceu no `MemoryHigh` durante toda a execução (PSI de memória `full` de 30–43 %),
  e o `Runner.Listener`, que partilha o cgroup, não conseguiu renovar o respetivo job. Os 56G/60G
  definidos pelo proprietário em 2026-10-17 foram repostos no mesmo dia. Abaixo desse valor, a
  compilação não falha; fica em thrashing e o job perde-se.
- **O Release-Green tem a sua própria vaga (2026-10-18).** Até então, ambas as validações
  Release-Green eram executadas em `omni-build`: em cada push (~10/hora, 97 de 100 execuções de
  push canceladas a meio do trabalho num só dia) e em três varrimentos completos de ~2 h por dia
  (o varrimento das 05:29 esperou 6 h pela vaga) — a única vaga de compilação estava
  sobrecarregada várias vezes acima da sua capacidade e as compilações de PR da própria origem
  esperavam durante horas. `release-green` e `main-green` visam agora `omni-release`
  (apenas `omniroute-113-6`) com `OMNIROUTE_USE_TURBOPACK=0`, e uma execução iniciada já não é
  cancelada por um push mais recente (a vaga pendente continua a condensar a avalanche).
  `tests/unit/build/runner-capacity-routing.test.ts` fixa o encaminhamento, a mudança para webpack
  e que nada em `omni-release` é compilado com Turbopack.
- **Pool leve: `omni-light`.** `omniroute-113` e `omniroute-113-2` executam as tarefas noturnas que
  necessitam de um `next build` apenas para o backend (~5–6 GB; webpack) e `lint-guard` de
  `quality.yml`. `omniroute-113` tinha `MemoryHigh=4G` até 2026-10-18 — a compilação promptfoo
  avançou à custa de recuperação de memória durante 54 minutos; 8 GB eliminam a limitação.
- **Menos listeners de propósito.** Quatro unidades OmniRoute foram desativadas em 2026-08-29 —
  cada listener adicional é mais um inquilino para o orçamento de memória acima. O limite do
  janitor é 6 (`MAX_ACTIVE_RUNNERS=6` no cron): conta todos os `Runner.Listener` na máquina, e
  OmniHeuris + OmniMind acrescentam dois aos nossos quatro.
- **Nunca limpar `/tmp` ou `_work` manualmente enquanto algum runner estiver ocupado.** Uma
  verificação seguida de eliminação, com um intervalo entre ambas, foi a forma como um job
  `Build` em execução perdeu o respetivo `_work` em 2026-08-27. O janitor efetua a verificação e
  a remoção num único passo; deixe-o fazê-lo.
- Parar um runner a meio de um job cancela o job (observado em produção): usar `systemctl stop`
  apenas quando o respetivo listener não tiver nenhum processo filho `Runner.Worker` — e fazê-lo
  num único comando.
- Os workflows não devem armazenar artefactos em `/tmp` (está em RAM). Transferi-los para
  `$RUNNER_TEMP` (em disco, por runner) — o artefacto `next-build` de 1,3 GB demorou 27–32 minutos
  a chegar ao tmpfs e 2 minutos a ser carregado a partir do disco.
- O VPS `.15` destina-se apenas a homologação — nunca executa runners de CI.

## Faixa alojada (runners alojados pelo GitHub)

A conta está no plano **Pro**: **40 tarefas alojadas em simultâneo**, partilhadas por todas as verificações de PR,
todos os workflows acionados por `push` e a configuração predefinida do CodeQL. Medido em 2026-10-18 durante uma
campanha de merges (~10 merges/hora em `release/v3.8.52`): **2.500 execuções de workflows criadas em
24 h**, 44 pushes para o branch em 6 h, **106 tarefas alojadas em fila** enquanto as verificações de PR aguardavam
durante horas e os PRs eram integrados sem elas. Nove workflows eram acionados em cada push para o branch:

| por push para `release/v*`                     | tarefas alojadas | resultado durante a sobrecarga                                 | desde 2026-10-18                                                                           |
| ---------------------------------------------- | ---------------: | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `ci.yml` (matriz completa)                     |           até 30 | cancelado pelo push seguinte, 24 de 24 num dia                 | não é iniciado em pushes para `release/**` (execução de PR + Release-Green)                |
| `quality.yml`                                  |               ~6 | cancelado, 23 de 23                                            | não é iniciado em pushes para `release/**`                                                 |
| `Release-Green` `--quick`                      |                0 | executado em `omni-build`, 97 de 100 cancelados                | slot `omni-release`, nunca cancelado, a execução pendente é consolidada                    |
| `Lock released branch`, `OpenSSF Scorecard`    |                2 | uma execução em fila por push                                  | uma execução por ref (`tests/unit/build/hosted-lane-concurrency.test.ts`)                  |
| `Release acceptance` (relatório sombra)        |                1 | um `npm ci` alojado por push, nunca cancelado                  | sem alterações — candidato a um filtro `paths:`                                            |
| `Publish to Docker Hub` → `Deploy to VPS`      |                2 | cancelado por push; a etapa amd64 compete em `omni-build`      | sem alterações — canal de implementação do proprietário                                    |
| configuração predefinida do CodeQL (`dynamic`) |                4 | `javascript-typescript`, `actions`, `c-cpp`, `python` por push | sem alterações — Definições → Segurança do código; `c-cpp`/`python` não analisam nada aqui |

`tests/unit/build/push-storm-diet.test.ts` fixa o acionador por push apenas em `main` de `ci.yml` e
`quality.yml`. Efeito secundário: o Codecov deixa de receber um carregamento base por push para um release (o
passo é informativo e usa `continue-on-error`); o controlo de cobertura no repositório e o comentário no PR não são
afetados.

**Mais capacidade autoalojada não resolve a fila alojada.** A devbox
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) poderia alojar um runner, mas as sessões dos agentes já
mantêm a respetiva carga entre 20–26, o contentor do agente não tem um daemon do Docker e a faixa saturada é
a alojada. A máquina `.113` tinha 71 GB livres e uma carga entre 5–8 no mesmo momento; a respetiva limitação
é o orçamento de memória por listener indicado acima (limite máximo de 6 listeners), não a CPU. As restantes opções
são processuais: integrar os PRs da campanha através da fila do Mergify (`label=queue`; os lotes partilham
uma execução de CI `merge_group` em vez de uma execução por PR mais uma por push), reduzir as linguagens da
configuração predefinida do CodeQL e filtrar `release-acceptance.yml` pelos ficheiros que lê.
