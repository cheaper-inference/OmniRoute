# Self-Hosted Runner Box Operations (.113 pool) (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

O pool auto-hospedado é executado no **.113** caixa (`tomni-proxmox-113`). Desde 18/10/2026, cada corredor OmniRoute tem **um papel** , um rótulo e um orçamento memory/CPU dimensionado de acordo com a medição de sua carga de trabalho. O slot Turbopack obtém o que a construção precisa; os outros slots são dimensionados de acordo com seus picos medidos. A caixa só se compromete demais quando uma compilação Turbopack coincide com uma compilação do webpack Release-Green e um trabalho lint; host swap (16 GB) absorve isso e, como as compilações de solicitação pull são executadas hospedadas, o slot Turbopack fica ocioso na maior parte do tempo:

| corredor             | rótulo                          | papel                                                                                                                                                             | `MemoryHigh` / `MemoryMax`  | `CPUQuota` |
| -------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ---------- |
| `omniroute-113-5`    | `omni-build`, `omni-build-60gb` | Compilações Turbopack : `ci.yml` `Build` (somente push/dispatch ), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, a compilação noturna a11y | 56 GB / 60 GB (troca 0)     | 1600 %     |
| `omniroute-113-6`    | `omni-release`                  | Release-Green (`release-green` + `main-green`), construção de webpack                                                                                             | 20 GB / 24 GB (trocar 4 GB) | 800 %      |
| `omniroute-113-2`    | `omni-light`                    | nightlies (Schemathesis, promptfoo, garak, k6) e `quality.yml` `lint-guard`                                                                                       | 12 GB / 16 GB (trocar 4 GB) | 600 %      |
| `omniroute-113`      | `omni-light`                    | mesma piscina acima                                                                                                                                               | 8 GB / 12 GB                | 400 %      |
| OmniHeuris, OmniMind | (seus repositórios)             | Somente Dependabot (pico 155 MB cada, 18/10/2026)                                                                                                                 | 4 GB / 6 GB                 | 200% cada  |

Medido em 18/10/2026:

| recurso    | valor                             | o que isso significa para agendamento                                                                                                                                                                                                                                                                                                                                                                      |
| ---------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU  | **78 GB /32 núcleos**             | uma construção de produção Turbopack atingiu o pico de 49 GB ilimitados (`tests/unit/ci-build-bundler-webpack.test.ts`); no próximo 16.3.8, apenas a fase de compilação contém ~ 40 GB (36 GB RSS em `next-build` mais 17 trabalhadores carregadores em 3 GB, medido em 18/10/2026); um webpack construído em ~ 14–16 GB. Um Turbopack + um webpack construído se encaixam; duas compilações Turbopack não |
| trocar     | 16 GB                             | `omniroute-113-5` é executado com troca desativada (`MemorySwapMax=0`), portanto, uma compilação descontrolada é cortada em seu limite, em vez de trocar a caixa                                                                                                                                                                                                                                           |
| `/tmp`     | **12 GB tmpfs = RAM**             | qualquer coisa estacionada ali é memória; as sobras são varridas após 3 h                                                                                                                                                                                                                                                                                                                                  |
| CPU        | carga 60 em 32 núcleos observados | antes das cotas, uma construção Turbopack (~ 1166% CPU) mais um conjunto de cobertura na mesma caixa matava os batimentos cardíacos dos outros ouvintes (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                                              |
| corredores | **7 ouvintes** (28/10/2026)       | 5 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-5` também carrega `omni-build-60gb`; `omniroute-113-3/-4/-8` foram excluídos do repositório (28/10/2026)                                                                                                                                                                                                                                               |

Os limites residem no `/etc/systemd/system/actions.runner.<…>.service.d/override.conf` de cada unidade (valores anteriores mantidos como `override.conf.bak-20261018`) e foram aplicados ao vivo com `systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — sem reinicialização, portanto, nenhum trabalho em execução foi tocado. Os rótulos são alterados através dos corredores API (`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` / `gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), também ao vivo.

## Instale o limpador (único, na caixa)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): every 30 min, log to /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` é necessário: o zelador prova que um caminho está ocioso com um instantâneo dos arquivos abertos antes de removê-lo e, sem a ferramenta, ele não remove nada e diz isso (saída 1). Tente qualquer alteração com `--dry-run` primeiro — imprime exatamente o que faria e não toca em nada.

O que ele faz a cada corrida: varre nossas próprias sobras (`runner-*`, `omniroute-*`, `next-build*`, `e2e-build.tar.gz`) depois **3h no tmpfs** e 24 horas no disco `_work/_temp`; alerta em um `next-build` com mais de 75 minutos e o mantém funcionando; elimina verificações de 48 horas de corredores cuja unidade é **parou** ; alertas no disco ≥ 85%, memória PSI `full/avg60` ≥ 10% e mais ouvintes que `MAX_ACTIVE_RUNNERS` (com quebra omniroute/other ). Saída 1 = requer atenção; leia o registro.

O tempo decorrido por si só não prova que um processo é órfão. O zelador nunca envia sinais com base na idade. Os nomes de ambiente `ZOMBIE_BUILD_MAX_MIN` e `ZOMBIE_BUILD_COMM` existentes permanecem suportados para configurações cron. Antes de limpar um suspeito órfão, confirme se seu trabalho GitHub exato é terminal e identifique os processos pertencentes a esse trabalho. Quando o `Runner.Listener` não consegue renovar seu trabalho, `_diag/Runner_*.log` mostra `POST request to …/renewjob timed out after 100 seconds`, o API relata o trabalho `completed` (falha) cerca de dez minutos após a última renovação bem-sucedida e `next-build` continua funcionando sem nenhum trabalho anexado (2026-10-18: a compilação do #17066 falhou às 19:43 e sua compilação ainda mantinha 40 GB cinco minutos depois). Confirme a referência no `_diag/Worker_*.log` mais recente e, em seguida, SIGTERM apenas a árvore de construção por PID — `next-build`, `npm run build`, `build-next-isolated.mjs` e os trabalhadores `_work`. Nunca toque em `Runner.Listener`, `RunnerService.js` ou `Runner.Worker`: o trabalhador relata o trabalho como cancelado e o ouvinte volta a ficar online sozinho.

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
  `next build` completo com Turbopack usa `[self-hosted, omni-build, omni-build-60gb]`, e somente o
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
  janitor é 8 (`MAX_ACTIVE_RUNNERS=8` no cron): ele conta cada `Runner.Listener` na máquina, e
  OmniHeuris + OmniMind acrescentam dois aos nossos cinco.
- **Os jobs de unit e Vitest continuam hospedados.** O `ci.yml` envia seus shards de unit e o job do Vitest para `[self-hosted, omni-ci]` somente quando a variável de repositório `vars.USE_VPS_TEST_RUNNER` é `true`, e mesmo assim apenas para execuções de `pull_request` do mesmo repositório; forks, `merge_group` e pushes ficam em `ubuntu-latest` (`tests/unit/vps-runner-variable-scope.test.ts`). A variável é `false`. Em 2026-10-28, três listeners `omni-ci` de 4 núcleos levaram 250–270 s para o `npm ci` e todos os shards de unit atingiram o limite de 30 minutos por job, contra ~634 s de um shard hospedado, com a máquina em carga 17–24. Os listeners foram removidos. Não reative a variável sem listeners dimensionados para um shard de unit.
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

O repositório pertence à organização `cheaper-inference`, no plano **Team**: **60 trabalhos hospedados simultâneos**, compartilhados por todos os repositórios da organização, todas as verificações de PR, todos os workflows acionados por push e a configuração padrão do CodeQL. Os números abaixo foram medidos no plano **Pro** (40 trabalhos hospedados simultâneos). Medido em 2026-10-18 durante uma
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
