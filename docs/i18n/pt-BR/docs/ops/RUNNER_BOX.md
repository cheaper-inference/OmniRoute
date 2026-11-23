# Self-Hosted Runner Box Operations (.113 pool) (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

O pool auto-hospedado é executado na máquina **.113** (`tomni-proxmox-113`). Desde 2026-10-18, cada
runner do OmniRoute tem **uma função**, um rótulo e um orçamento de memória/CPU dimensionado de acordo com o que foi medido para sua carga de trabalho.
O slot do Turbopack recebe os recursos necessários para a compilação; os outros slots são dimensionados de acordo com
seus picos medidos. A máquina só fica com recursos sobrealocados quando uma compilação do Turbopack coincide com uma compilação
webpack do Release-Green e uma tarefa de lint; a swap do host (16 GB) absorve isso e, como as compilações de pull requests são executadas
em runners hospedados, o slot do Turbopack fica ocioso na maior parte do tempo:

| runner               | rótulo               | função                                                                                                                                                                | `MemoryHigh` / `MemoryMax` | `CPUQuota` |
| -------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------- |
| `omniroute-113-5`    | `omni-build`         | Compilações do Turbopack: `ci.yml` `Build` (somente push/dispatch), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, a compilação noturna de a11y | 56 GB / 60 GB (swap 0)     | 1600 %     |
| `omniroute-113-6`    | `omni-release`       | Release-Green (`release-green` + `main-green`), compilação webpack                                                                                                    | 20 GB / 24 GB (swap 4 GB)  | 800 %      |
| `omniroute-113-2`    | `omni-light`         | execuções noturnas (Schemathesis, promptfoo, garak, k6) e `quality.yml` `lint-guard`                                                                                  | 12 GB / 16 GB (swap 4 GB)  | 600 %      |
| `omniroute-113`      | `omni-light`         | mesmo pool acima                                                                                                                                                      | 8 GB / 12 GB               | 400 %      |
| OmniHeuris, OmniMind | (repositórios deles) | somente Dependabot (pico de 155 MB cada, 2026-10-18)                                                                                                                  | 4 GB / 6 GB                | 200 % cada |

Medições de 2026-10-18:

| recurso   | valor                            | o que isso significa para o agendamento                                                                                                                                                                                                                                                                                                                                                                                     |
| --------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **78 GB / 32 núcleos**           | uma compilação de produção do Turbopack atingiu um pico de 49 GB sem limite (`tests/unit/ci-build-bundler-webpack.test.ts`); no Next 16.3.8, somente a fase de compilação mantém ~40 GB (36 GB de RSS em `next-build` mais 17 workers de loader com 3 GB, medido em 2026-10-18); uma compilação webpack usa ~14–16 GB. Uma compilação do Turbopack + uma compilação webpack cabem juntas; duas compilações do Turbopack não |
| swap      | 16 GB                            | `omniroute-113-5` é executado com a swap desativada (`MemorySwapMax=0`), portanto uma compilação fora de controle é encerrada ao atingir seu limite, em vez de levar a máquina a usar swap                                                                                                                                                                                                                                  |
| `/tmp`    | **tmpfs de 12 GB = RAM**         | tudo o que for armazenado ali ocupa memória; resíduos são removidos após 3 h                                                                                                                                                                                                                                                                                                                                                |
| CPU       | carga 60 observada em 32 núcleos | antes das cotas, uma compilação do Turbopack (~1166 % de CPU) mais uma suíte de cobertura na mesma máquina privavam os heartbeats dos outros listeners de recursos (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                                                    |
| runners   | **6 listeners**                  | 4 do OmniRoute + OmniHeuris + OmniMind; `omniroute-113-3/-4/-7/-8` estão desativados (`systemctl enable --now` reativa um deles)                                                                                                                                                                                                                                                                                            |

Os limites ficam no arquivo `/etc/systemd/system/actions.runner.<…>.service.d/override.conf` de cada unidade
(os valores anteriores foram mantidos como `override.conf.bak-20261018`) e foram aplicados em tempo real com
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — sem reinicialização, portanto nenhuma
tarefa em execução foi afetada. Os rótulos são alterados por meio da API de runners
(`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), também em tempo real.

## Instale o processo de limpeza (uma única vez, no servidor)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): a cada 30 min, registrar em /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

O `lsof` é obrigatório: o processo de limpeza comprova que um caminho está ocioso com um snapshot dos arquivos abertos antes de removê-lo e, sem a ferramenta, não remove nada e informa o motivo (saída 1). Primeiro, teste qualquer alteração com `--dry-run` — ele mostra exatamente o que faria sem alterar nada.

O que ele faz em cada execução: limpa nossos próprios resíduos (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) após **3 h no tmpfs** e 24 h no
`_work/_temp` em disco; encerra um `next-build` com mais de 75 min (nenhum job leva
tanto tempo — em 2026-08-27, um deles foi executado por 70 min depois que o GitHub
declarou o job como perdido); remove checkouts com 48 h de runners cuja unidade está
**parada**; alerta quando o disco está ≥ 85 %, o PSI de memória `full/avg60` está
≥ 10 % e há mais listeners que `MAX_ACTIVE_RUNNERS` (com uma divisão entre
omniroute/outros). Saída 1 = atenção necessária; leia o log.

A regra dos 75 minutos não detecta uma compilação cujo job já tenha sido abandonado pelo GitHub. Quando o
`Runner.Listener` não consegue renovar seu job, `_diag/Runner_*.log` mostra
`POST request to …/renewjob timed out after 100 seconds`, a API informa o job como `completed`
(falha) cerca de dez minutos após a última renovação bem-sucedida, e o `next-build` continua em execução
sem nenhum job vinculado (2026-10-18: a compilação de #17066 foi marcada como falha às 19:43 e ainda
retinha 40 GB cinco minutos depois). Confirme a ref no `_diag/Worker_*.log` mais recente e, então,
envie SIGTERM somente para a árvore de compilação por PID — `next-build`, `npm run build`, `build-next-isolated.mjs` e
os workers de `_work`. Nunca interfira em `Runner.Listener`, `RunnerService.js` ou `Runner.Worker`: o
worker informa o job como cancelado, e o listener volta a ficar online por conta própria.

## Unidades dos runners: KillMode

O `KillMode=process` padrão do runner mantém `Runner.Worker → npm → next-build`
em execução quando uma unidade é parada ou reiniciada — uma compilação órfã continua consumindo RAM e
CPU sem nenhum job vinculado. Todas as unidades do OmniRoute têm um drop-in
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
com `KillMode=mixed`: primeiro, envia SIGTERM ao listener; depois, envia SIGKILL a todo o cgroup ao atingir
`TimeoutStop`. Isso entra em vigor na próxima reinicialização da unidade — reinicie **um runner por
vez, somente quando estiver ocioso**, executando a verificação de ociosidade e a reinicialização no mesmo comando.

## Regras operacionais

- **Uma compilação do Turbopack por vez — imposta por rótulo.** Todo job que executa um
  `next build` completo com Turbopack usa `[self-hosted, omni-build]`, e somente o
  **`omniroute-113-5`** possui esse rótulo: `ci.yml` `Build`, `npm-publish.yml` `publish`,
  `nightly-v4-build`, `preview-artifact`, a compilação noturna de a11y (#16853) e
  `docker-publish.yml` **amd64** (webpack dentro do BuildKit — o Turbopack entrou em pânico ali,
  execução 33253576569). A etapa arm64 do Docker permanece em `ubuntu-24.04-arm`.
  O amd64 de `docker-publish` compartilha o grupo de concorrência `heavy-build-main` com o
  `Build` de `ci.yml` (`cancel-in-progress: false`). O Docker Engine deve estar no
  `omniroute-113-5`. Um segundo slot do Turbopack não cabe em 78 GB (2 × 33–37 GB mais o restante
  da máquina); um segundo slot só é seguro para compilações com webpack.
- **Compilações de pull requests são executadas em infraestrutura hospedada (2026-10-18).** O
  `Build` de `ci.yml` chega ao `omni-build` somente para `push` e `workflow_dispatch`; todo
  `Build` de `pull_request` (da própria origem ou de um fork) e `merge_group` é executado em
  `ubuntu-latest` com webpack. Com cada PR da própria origem encaminhado ao slot, uma compilação
  com Turbopack o ocupava por 29–58 min, 18 compilações ficaram na fila por até 18 h, e a própria
  compilação por push da linha de release conseguiu o slot uma vez em 40 jobs. Em infraestrutura
  hospedada, a mesma compilação do PR leva 8–12 min junto aos outros jobs do PR. O Turbopack, o
  empacotador distribuído pelo `npm-publish`, continua sendo testado na linha de release pela
  compilação noturna de a11y da branch padrão (04:41 UTC), por toda compilação por push ou
  dispatch que chega ao slot e pelo próprio `npm-publish`. O
  `tests/unit/build/heavy-build-queue.test.ts` fixa a condição de quatro cláusulas.
- **Nunca dimensione o slot do Turbopack abaixo da necessidade medida.** Em 2026-10-18 às 18:06,
  o slot foi reduzido de 56G/60G para 40G/44G a fim de abrir espaço para o `omni-release`. A fase
  de compilação permaneceu no `MemoryHigh` durante toda a execução (PSI de memória `full` de
  30–43 %), e o `Runner.Listener`, que compartilha o cgroup, não conseguiu renovar seu job. Os
  56G/60G definidos pelo proprietário em 2026-10-17 foram restaurados no mesmo dia. Abaixo desse
  valor, a compilação não falha; ela sofre thrashing, e o job é perdido.
- **O Release-Green tem seu próprio slot (2026-10-18).** Até então, ambas as validações do
  Release-Green eram executadas no `omni-build`: em cada push (~10/hora, 97 de 100 execuções de
  push canceladas durante o trabalho em um dia) e em três varreduras completas de ~2 h por dia
  (a varredura das 05:29 aguardou 6 h pelo slot) — o único slot de compilação estava com excesso
  de demanda várias vezes acima de sua capacidade, e as compilações de PRs da própria origem
  aguardavam por horas. `release-green` e `main-green` agora usam `omni-release`
  (somente `omniroute-113-6`) com `OMNIROUTE_USE_TURBOPACK=0`, e uma execução iniciada não é mais
  cancelada por um push mais recente (o slot pendente ainda consolida a enxurrada).
  `tests/unit/build/runner-capacity-routing.test.ts` fixa o roteamento, a mudança para webpack e
  garante que nada no `omni-release` seja compilado com Turbopack.
- **Pool leve: `omni-light`.** `omniroute-113` e `omniroute-113-2` executam as rotinas noturnas
  que precisam de um `next build` somente do backend (~5–6 GB; webpack) e o `lint-guard` de
  `quality.yml`. O `omniroute-113` tinha `MemoryHigh=4G` até 2026-10-18 — a compilação do
  promptfoo passou 54 minutos recuperando memória ali; 8 GB elimina a limitação.
- **Menos listeners de propósito.** Quatro unidades do OmniRoute foram desativadas em 2026-08-29
  — cada listener adicional é mais um ocupante do orçamento de memória acima. O limite do
  janitor é 6 (`MAX_ACTIVE_RUNNERS=6` no cron): ele conta cada `Runner.Listener` na máquina, e
  OmniHeuris + OmniMind acrescentam dois aos nossos quatro.
- **Nunca limpe `/tmp` nem `_work` manualmente enquanto algum runner estiver ocupado.** Uma
  verificação seguida de exclusão, com um intervalo entre as duas, foi como um job de `Build`
  ativo perdeu seu `_work` em 2026-08-27. O janitor realiza a verificação e a remoção em uma
  única etapa; deixe que ele cuide disso.
- Interromper um runner no meio de um job cancela o job (observado ao vivo): use
  `systemctl stop` somente quando seu listener não tiver nenhum processo filho
  `Runner.Worker` — e faça isso em um único comando.
- Os workflows não devem armazenar artefatos em `/tmp` (ele fica na RAM). Baixe-os para
  `$RUNNER_TEMP` (em disco, por runner) — o artefato `next-build` de 1,3 GB levou 27–32
  minutos para ser gravado no tmpfs e 2 minutos para ser enviado a partir do disco.
- O VPS `.15` é exclusivo para homologação — nunca executa runners de CI.

## Faixa hospedada (executores hospedados pelo GitHub)

A conta está no plano **Pro**: **40 trabalhos hospedados simultâneos**, compartilhados por todas as verificações de PR,
todos os workflows acionados por push e a configuração padrão do CodeQL. Medido em 2026-10-18 durante uma
campanha de merges (~10 merges/hora em `release/v3.8.52`): **2.500 execuções de workflow criadas em
24 h**, 44 pushes para a branch em 6 h, **106 trabalhos hospedados na fila** enquanto as verificações de PR aguardavam por
horas e os PRs eram integrados sem elas. Nove workflows eram acionados a cada push para a branch:

| por push para `release/v*`                  | trabalhos hospedados | resultado durante a sobrecarga                                 | desde 2026-10-18                                                               |
| ------------------------------------------- | -------------------: | -------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `ci.yml` (matriz completa)                  |               até 30 | cancelado pelo push seguinte, 24 de 24 em um dia               | não iniciado em pushes para `release/**` (execução de PR + Release-Green)      |
| `quality.yml`                               |                   ~6 | cancelado, 23 de 23                                            | não iniciado em pushes para `release/**`                                       |
| `Release-Green` `--quick`                   |                    0 | executado em `omni-build`, 97 de 100 cancelados                | slot `omni-release`, nunca cancelado, execuções pendentes são consolidadas     |
| `Lock released branch`, `OpenSSF Scorecard` |                    2 | uma execução na fila por push                                  | uma execução por ref (`tests/unit/build/hosted-lane-concurrency.test.ts`)      |
| `Release acceptance` (relatório paralelo)   |                    1 | um `npm ci` hospedado por push, nunca cancelado                | inalterado — candidato a um filtro `paths:`                                    |
| `Publish to Docker Hub` → `Deploy to VPS`   |                    2 | cancelado por push; a etapa amd64 compete em `omni-build`      | inalterado — canal de implantação do proprietário                              |
| Configuração padrão do CodeQL (`dynamic`)   |                    4 | `javascript-typescript`, `actions`, `c-cpp`, `python` por push | inalterado — Settings → Code security; `c-cpp`/`python` não analisam nada aqui |

`tests/unit/build/push-storm-diet.test.ts` fixa o acionamento por push somente para `main` de `ci.yml` e
`quality.yml`. Efeito colateral: o Codecov não recebe mais um upload de base por push de release (a
etapa é informativa e usa `continue-on-error`); a verificação de cobertura no repositório e o comentário no PR
não são afetados.

**Mais capacidade auto-hospedada não resolve a fila hospedada.** A máquina de desenvolvimento
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) poderia hospedar um executor, mas as sessões dos agentes já
mantêm sua carga entre 20 e 26, o contêiner do agente não tem um daemon do Docker e a faixa saturada é
a hospedada. A máquina `.113` tinha 71 GB livres e carga entre 5 e 8 no mesmo momento; sua restrição
é o orçamento de memória por listener mencionado acima (limite de 6 listeners), não a CPU. As alavancas restantes
são relacionadas ao processo: integrar os PRs da campanha pela fila do Mergify (`label=queue`, os lotes compartilham
uma execução de CI de `merge_group` em vez de uma execução por PR mais uma por push), reduzir as linguagens da
configuração padrão do CodeQL e filtrar `release-acceptance.yml` pelos arquivos que ele lê.
