# Merge Queue & Manual Merge-Train Runbook (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Aterragem em um branch de lançamento

A omni-queue rege os desembarques em `release/vX.Y.Z`. Leia o `mode` de nível superior em `config/merge-queue/config.json` na ramificação padrão antes de obter um PR. Consulte [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** executa a validação e deixa a aterragem para uma fusão manual. Aplique `omni-queue` ao PR aprovado na sua cabeça final. Verifique a elegibilidade com `npm run queue -- why <PR>`. Aguarde o veredicto dessa cabeça em `npm run queue -- history --base <branch>`. Prossiga em `would-land`. Em `culprit-found` ou `would-dequeue`, segure a fusão e corrija a causa.
- **Exceções de sombra.** Um comboio com CI completo verde em relação à ponta base atual pode prosseguir sem um veredicto de fila separado. A mesma exceção se aplica quando a cabeça PR já contém a ponta base atual.
- **`live`** utiliza o rótulo `omni-queue` para acionar a aterragem. Só a fila chega ao PR. Deixe os comandos de fusão e os envios diretos para a fila.

Cada desembarque requer a autorização do proprietário e as verificações exigidas aplicáveis. Aplicar `omni-queue` apenas após o proprietário ter autorizado a aterragem. PRs em fila que tocam em caminhos protegidos também requerem a decisão `protected-approved` do proprietário para esse PR.

O conjunto de regras "Exigir portões verdes na libertação ativa" exige `Gate / CI` e `Gate / Quality` verdes na cabeça. Nunca utilize `--admin` para contornar um portão vermelho. Um bloco de congelação de libertação funde-se na ramificação congelada. Ver [Regra Rígida 21](HARD_RULES_DETAIL.md). Nunca rotule, mescle ou envie para um pull request que outra sessão esteja a funcionar. Ver [Regra Rígida 22](HARD_RULES_DETAIL.md).

## A solicitação de recolha do comboio

1. Inicie um ramal de comboio na extremidade da base de lançamento atual. Integre os chefes de membros aprovados exatos utilizando commits de fusão. Preserve o seu histórico de commits evitando o squash e o rebase.
2. Abra um pull request para o ramal do comboio. Valide esse PR com o seu próprio CI completo na ponta base atual. Verifique novamente a ponta da base e as cabeças dos membros aprovadas antes de aterrar. Atualize o comboio e o seu CI quando o candidato validado mudar.
3. Ligue o comboio PR à terra com um commit de fusão no modo de fila aplicável. No modo ao vivo, o método de destino `merge-ff` da fila preserva os commits de fusão. Os bosses dos membros originais tornam-se acessíveis a partir do branch de lançamento. GitHub marca o membro PRs como fundido e os commits mantêm os seus autores.

Um exemplo público é [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Combinou 18 membros PRs e chegou com um commit de fusão a 24/11/2026.

Uma sincronização de `main` para o próximo branch de lançamento também chega através de um commit de fusão. Preservar a ancestralidade `main` é necessário para sincronizações posteriores. Consulte [Isolamento da árvore de trabalho](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## O validador de comboio de fusão local

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

O validador procura os cabeçotes base e PR e combina-os numa árvore de trabalho descartável. Executa o seu conjunto de paridades uma vez na árvore resultante. Uma falha na pesquisa de cabeçalho ou no conflito de fusão ejeta este PR e o script continua com o PRs restante.

- **`--plan`** imprime os passos do modo selecionado e sai sem criar uma árvore de trabalho ou contactar o telecomando. Combine-o com `--fast` para inspecionar o plano rápido.
- **`--fast`** executa as portas estáticas comuns, os ficheiros `node:test` alterados selecionados em `tests/unit/` e `npm run test:vitest`. Execute uma validação local completa pelo menos uma vez por dia na gorjeta acumulada ao utilizar o modo rápido.
- **Modo completo** adiciona as portas estáticas completas e executa `npm run test:unit` e `npm run test:vitest`.

Uma porta estática com falha será executada novamente na base intocada se a sonda de base estiver disponível. O script reporta falhas herdadas e continua quando cada linha de violação reconhecida também aparece na base e a contagem total não aumenta.

| Saída | Significado                                                                                                                                                |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0`   | Imprimiu o plano ou completou a suite. O resumo do pacote lista quaisquer falhas estáticas herdadas e PRs ejetadas.                                        |
| `1`   | Argumentos inválidos, nenhuma verificação do Git, falha na simulação ou nenhum PR embebido.                                                                |
| `2`   | Uma verificação de conjunto falhou e não foi qualificada como herdada. O operador pode dividir o lote ao meio, ejetar o PR incorreto e executar novamente. |

Um passe local fornece provas de diagnóstico apenas para o dossier do proprietário. Cada aterragem requer ainda a autorização do proprietário, as suas próprias verificações obrigatórias e o veredicto da fila sombra, quando aplicável.

## Camadas

- **Por PR.** CI e Quality selecionam as verificações com base nos caminhos alterados. O código PRs executa portas de qualidade rápida e testes impactados, com unidades separadas e tarefas Vitest em CI.
- **Por candidato de fila.** CI e Quality executam o perfil completo do candidato composto na sua fila ref.
- **Por dica de lançamento.** O Release-Green executa portões rápidos e rígidos em pushes que correspondem aos seus filtros de caminho. Três execuções agendadas por dia utilizam a varredura completa para o branch de lançamento.
- **Por lançamento.** A matriz CI completa inclui fragmentos E2E, validação de pacotes, tarball boot smoke e verificações de cobertura. Consulte a [lista de verificação de lançamento](RELEASE_CHECKLIST.md).

## Pré-requisitos de checkout recente para `merge-train.sh`

A simulação é executada antes de criar árvores de trabalho. Instale dependências com `npm ci`. Confirme se `node_modules/.bin/tsc` é executável e se `node_modules/node_modules` está em falta. Verifique se `node_modules/.bin/bun --version` foi bem-sucedido.

Se a pós-instalação Bun tiver sido ignorada, execute `(cd node_modules/bun && node install.js)`. As verificações de consistência do fornecedor e de símbolos conhecidos utilizam Bun. O validador executa `npm run check:cycles:ratchet` como porta de bloqueio. O comando `npm run check:cycles` independente é consultivo.

## História

A fila de fusão do Mergify foi descontinuada a 19/11/2026.
