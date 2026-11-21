# Merge Queue & Manual Merge-Train Runbook (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

> **19/11/2026: a fila de mesclagem do Mergify foi desativada** (decisão do proprietário). `.mergify.yml` não define mais uma fila e recusa os comandos Mergify que mesclam ou reescrevem uma solicitação pull. A versão PRs é mesclada manualmente sob o conjunto de regras do repositório "Exigir portões verdes na versão ativa" (`Gate / CI` + `Gate / Quality`) até que a omni-queue seja executada no modo ao vivo, e através da omni-queue depois disso ( [OMNI_QUEUE.md](./OMNI_QUEUE.md) ). As seções do Mergify abaixo descrevem a fila como ela era.

Desde a v3.8.49 (WS3.2/WS3.4 do plano quality/velocity ), o caminho de mesclagem padrão para PRs revisado no `release/vX.Y.Z` é o** Mergify fila de mesclagem** (`.mergify.yml`); o** trem de mesclagem manual** documentado abaixo está o FALLBACK — usado durante incidentes, congelamentos de lançamento ou se o plano Mergify Open Source for alterado.

## Caminho padrão: a fila Mergify

1. PR é reviewed/greened pelas campanhas e aprovado pelo portão ⭐ de pré-mesclagem do proprietário (o relatório + por decisão de item — consulte `/merge-prs` Etapa 0.75).
2. O proprietário (ou a sessão agindo de acordo com a decisão do proprietário) aplica o**`queue`** rótulo. O rótulo IS a aprovação da mesclagem; Mergify apenas o executa.
3. Mergify valida PRs na fila** em série** (um de cada vez) contra os fast-gates e merges (squash). O lote + bissecção automática é um nível Mergify pago ("Não é possível usar o lote Merge Queue" no plano gratuito, #7220), portanto `.mergify.yml` não define `batch_size`; o lote continua sendo o trabalho do treinamento de mesclagem manual abaixo. Um PR cujas verificações ainda estão pendentes após `checks_timeout` (240 min = 2 × o p95 medido de `quality.yml`) é retirado da fila em vez de paralisar a fila.
4. Após a mesclagem, o fluxo de trabalho contínuo de liberação verde valida a nova dica no push e abre um problema de atribuição se a combinação regredir (nunca reverter automaticamente).

Guarda-corpos (espelho `CLAUDE.md` Hard Rules #21/#22):

- **Liberar congelamento aberto** → do NOT label PRs visando o branch congelado; redirecione primeiro para o `release/vX+1` ativo.
- **PR em voo de outra sessão** → nunca o rotule; apenas a sessão proprietária enfileira seu próprio trabalho.
- Diffs somente para testes e `hotfix` -labeled PRs já executam CI reduzido (veja `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); as condições da fila aceitam qualquer conjunto de verificação realmente executado (`#check-failure=0` + `#check-pending=0`).

## Fallback: o merge-train manual

Usado quando a fila está indisponível. Isso codifica a prática que processou 33 PRs em
um único dia durante o ciclo da v3.8.47:

1. **Monte o lote** (~10–30 PRs revisados+aprovados). Verifique colisões `linked:`
   (mesmos `tap.testFiles`, mesmos trechos do CHANGELOG) e serialize esses casos.
2. **Valide UMA VEZ**: em uma worktree isolada a partir da ponta da release, faça o merge local de todos os
   heads do lote e, então, execute a suíte equivalente à da release
   (`npm run check:release-green`; adicione `--with-build` antes de uma release).
   `scripts/release/merge-train.sh <base> <PR#>…` automatiza as etapas 1–2 (PRs com
   conflitos são ejetados e o train continua). O modo completo executa `npm run test:unit` — o
   runner ajustado para a máquina (`--test-concurrency=20`), **não** os dois shards sequenciais de CI
   com 4 núcleos, que faziam a fase dominante utilizar ~25% de uma máquina de 16 núcleos (corrigido em
   2026-07-18). `--fast` (processamento de mega-trains intradiários, aprovado pelo proprietário em 2026-07-18)
   mantém todos os gates estáticos + vitest, mas executa somente os arquivos node:test alterados pelos
   PRs embarcados; a suíte COMPLETA ainda deve ser executada pelo menos uma vez por dia sobre a
   ponta acumulada (um train sem `--fast`).
3. **Verde** → faça o merge dos PRs em sequência (verificando novamente `state,headRefOid` antes de cada um —
   um PR cujo head mudou volta para revisão). Comprove que o diff líquido de cada merge corresponde à
   própria alteração do PR (sem reverts por resolução automática: audite `git diff --stat` em busca de
   exclusões fora do escopo).
4. **Vermelho** → divida o lote em metades (valide cada metade), em vez de revalidar
   um por um; devolva o PR problemático à fila de revisão com as evidências.
5. **Nunca**: faça merge durante um congelamento na branch congelada; use `git stash` em qualquer lugar;
   reexecute indiscriminadamente a CI na esperança de que um vermelho desapareça (regra: um vermelho é informação).

## Níveis (por que a fila é segura apenas com fast-gates)

- **Por PR** (fast-gates de quality.yml): testes afetados pela TIA + unitários completos em 4 shards +
  vitest + conjunto de lint + typecheck + integridade da documentação/CHANGELOG.
- **Por lote/ponta** (release-green contínuo): gates RÍGIDOS `--quick` em cada push para
  a branch de release; varreduras completas com `--with-build --full-ci` 3×/dia.
- **Por release** (ci.yml no PR da release): a matriz completa, incluindo E2E ×9,
  artefato de pacote + boot-smoke do tarball, cobertura/ratchets.

Nada é validado menos do que antes — a superfície pesada apenas é executada por lote/ponta,
em vez de por PR, que é o que elimina as idas e vindas O(N).

## Pré-requisitos de checkout novo para `merge-train.sh`

O script executa um **preflight** fail-fast no checkout raiz (antes de qualquer trabalho
com worktree), para que uma instalação quebrada nunca possa se passar por um train vermelho:

1. Execute `npm ci` e, depois, o postinstall do `bun` que o npm bloqueia:
   `(cd node_modules/bun && node install.js)` — caso contrário, `check:provider-consistency`
   e `check:known-symbols` (ambos `bun scripts/…`) falham no train E na base sem
   nenhuma linha de violação.
2. Nenhum `node_modules/node_modules` residual (uma árvore de dependências duplicada; o React é carregado duas vezes
   e as suítes de UI do vitest falham imediatamente).
3. `node_modules/.bin/tsc` presente e executável (uma instalação parcial não o contém).

O train executa o `npm run check:cycles:ratchet` bloqueante; `npm run check:cycles`
sozinho é apenas informativo (lista os SCCs e encerra com código diferente de zero mesmo em uma base saudável).
