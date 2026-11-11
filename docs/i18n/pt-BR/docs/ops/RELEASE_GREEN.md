# Release-Green: candidate validation and evidence (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green observa um commit específico e relata seus resultados de validação. A [referência Quality Gates](../architecture/QUALITY_GATES.md) define os perfis CI atuais, verificações necessárias e política de aceitação. A política de admissão versionada no `config/quality/admission-policy.json` é o contrato executável para `Gate / CI` e `Gate / Quality`.

## CI e escopo do observador

`ci.yml` e `quality.yml` cobrem solicitações pull nas ramificações principal e de lançamento. O perfil selecionado determina quais vagas serão aplicadas. CI completo também inclui pistas que uma solicitação pull comum não executa. Um resultado rápido do observador não pode substituir esses trabalhos, e um wrapper de fluxo de trabalho concluído não pode substituir seus recebimentos.

A construção de produção pertence à CI. Não há compilação de aconselhamento duplicada no `quality.yml`. Artefatos ausentes, trabalho cancelado e medições incompletas não estabelecem uma verificação obrigatória bem-sucedida. Confirme a base atual, o candidato principal e o combinado antes de aceitar os resultados.

## Validação local

Execute o observador em uma árvore de trabalho própria depois de preparar suas dependências. Siga a árvore de trabalho e o protocolo de recursos no `docs/ops/WORKTREE_ISOLATION.md` antes da validação pesada.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

O perfil rápido é parcial. O perfil completo verifica seus requisitos modelados e preserva os recebimentos de comando; ele não certifica a implantação nem substitui verificações hospedadas aplicáveis. O relatório distingue falha de execução de desvio de métrica. As catracas necessárias permanecem bloqueando de acordo com a política selecionada. Não aumente uma linha de base apenas para obter um resultado aprovado.

## Varreduras noturnas e manuais

Os resolvedores de lançamento noturno e compatibilidade selecionam um branch de lançamento canônico. Essa seleção deve corresponder à ramificação que acionou o fluxo de trabalho e as suítes usam o SHA imutável do evento. Para execução manual, selecione o release pretendido no `release_branch` e despache nessa mesma referência:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

O despacho entre filiais é rejeitado antes da execução do código selecionado. As suítes principais hospedadas verificam `main` e verificam se seu SHA ainda corresponde ao destino resolvido antes da instalação. Se main se mover durante a resolução, execute novamente a varredura incompleta no novo commit. Não combine recibos de suítes de candidatos diferentes.

## Triagem e recuperação de falhas

Use o incidente como um índice de diagnóstico e, em seguida, inspecione a execução exata, a tentativa, a etapa com falha e o artefato. Compare as evidências de base e de candidato equivalentes antes de atribuir uma falha a um contribuidor. Erros de infraestrutura, defeitos herdados, regressões de candidatos e aprovações pendentes exigem soluções diferentes.

As habilidades `/green-prs`, `/sweep-reds`, `/validate-release-green` e `/babysit` coletam evidências e preparam correções sob seu escopo documentado. Mantenha o crédito do contribuidor, use filiais de reparo isoladas e verifique todas as verificações necessárias antes de uma fusão autorizada. Nenhuma linha de base automática ou fechamento de incidente substitui um candidato atual aprovado.
