---
name: i18n-waves
description: "Keep OmniRoute's 66 locales current in repeatable waves — docs mirrors under docs/i18n, UI/CLI keys, llm.txt mirrors. One wave = diagnose the release tip (visible drift AND hidden-stale mirrors the hash gate cannot see), re-translate only the delta section by section via the detached wave runner, audit structure and model-reasoning leaks, merge the base back, open the PR; merges only in the explicit `onda com merge` mode. Use when the owner says /i18n-waves, 'rode a onda de i18n', 'mais uma rodada de tradução', 'deixa o i18n verde', 'como está a tradução?'. NEVER prints the translation backend key, NEVER runs two translation writers on one worktree, NEVER uses the global adopt, NEVER merges agent-instruction mirrors (AGENTS/CLAUDE/GEMINI/llm.txt) without explicit owner approval."
allowed-tools: Bash, Read, Edit, Write, Grep, Glob, AskUserQuestion
---

# /i18n-waves — ondas de i18n (docs + chaves) nos 66 locales

Você executa **uma onda** e para. A onda relê o estado real do tip da release em curso, encontra o
que está defasado na tradução (visível ao gate ou escondido dele), retraduz só o delta, valida
estrutura e vazamento, traz a base de novo, abre a PR e — só no modo `onda com merge` — mergeia
quando todos os gates obrigatórios aplicáveis ao candidato exato passam. Registra no ledger e deixa o checkout como encontrou.
Responda ao dono em português do Brasil; PR e commits em inglês curto, sem rodapé de IA.

Leia antes de agir: `AGENTS.md` (Hard Rules 16, 19, 21, 22, 23), `_shared/protected-surfaces.md`,
`_shared/worktree-teardown.md`, `_shared/base-green.md`, `_shared/validation-gate.md` e,
para qualquer admissão, `_shared/merge-gates.md`. Esses contratos de evidência e autorização
prevalecem sobre exemplos históricos das referências. Para chaves de UI/CLI, o módulo é
`_shared/i18n-translate-new-keys.md`. Detalhes desta skill: `references/scope-map.md` (o que compõe
o i18n, glossário do drift, o `.i18n-state.json` e suas armadilhas), `references/templates.md`
(PR, ledger, memória), `references/lessons.md` (incidentes e a resposta certa). Kit executável:
`.agents/skills/i18n-waves/scripts/`.

## 0. Modos de invocação e matriz de autonomia

| O dono diz                                                                      | Modo               | O que muda                                                                                               |
| ------------------------------------------------------------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------- |
| «como está a tradução?», «diagnóstico», «tem drift?»                            | **diagnóstico**    | Inspeção e checkers sem tradução ou probe pago. Bootstrap só após confirmar seus efeitos, base e escopo. |
| «rode a onda», «mais uma rodada», «deixa o i18n verde»                          | **onda** (padrão)  | Tudo até a PR aberta e validada. **Não mergeia.**                                                        |
| «rode a onda e mergeie», «pode mergear no final», «autorizado» **nesta sessão** | **onda com merge** | Como a onda, mais a seção 9. Autorização de uma sessão não vale para a próxima.                          |

Se o dono nomear docs, locales ou PRs específicos, o escopo é só isso.

| Ação                                                                                                           | Autônomo?                                                                                                          |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Retraduzir por seção todo doc com drift (fonte mudou, locale stale, espelho editado à mão, espelho faltando)   | Sim                                                                                                                |
| Expor stale escondido (`rebase_stale.py`) quando a auditoria estrutural ou de spans prova a defasagem          | Sim                                                                                                                |
| Retradução **inteira** (`--force`) de um espelho estruturalmente quebrado ou sem uma seção                     | Sim, só para o(s) locale(s) provados; relate                                                                       |
| Restaurar à mão um literal de código traduzido dentro de crases e readotar só aquele doc                       | Sim                                                                                                                |
| Traduzir chaves `__MISSING__` novas de UI/CLI (`_shared/i18n-translate-new-keys.md`)                           | Sim                                                                                                                |
| Resincronizar espelhos de `llm.txt` e barras de idioma                                                         | Sim (cópia estrita; a PR vira HOLD por ser superfície protegida)                                                   |
| Mergear a base na branch da onda e resolver conflitos com `resolve_state_merge.py`                             | Sim                                                                                                                |
| Abrir a PR da onda contra a release em curso                                                                   | Sim                                                                                                                |
| Mergear a PR da onda                                                                                           | **Só no modo `onda com merge`**, com todos os gates obrigatórios aplicáveis completos no candidato atual (seção 9) |
| Tocar espelho de superfície protegida (`docs/i18n/<loc>/{AGENTS,CLAUDE,GEMINI}.md`, `docs/i18n/<loc>/llm.txt`) | Retraduzir sim; **mergear só com aprovação explícita do dono para aquela PR**                                      |
| Usar modelo de fallback (`auto/gemini`, `cinf/gemini-*`, `auto/glm`) com o Codex sem cota                      | **Pergunte**; vazam `<think>` e perdem linhas                                                                      |
| Reiniciar o backend de tradução (`pm2 restart omniroute` na .17)                                               | **Pergunte** (outra sessão pode estar usando)                                                                      |
| Atualizar baseline do ratio (`npm run i18n:check-ratio:update`) ou allowlists de i18n                          | **Pergunte** (ratchet do dono)                                                                                     |
| Mexer em CHANGELOG espelhado (`npm run release:sync-changelog-i18n`)                                           | **Pergunte**; é do release captain                                                                                 |
| Corrigir base-red que não é i18n (testes, lint, typecheck, contagens da fonte, `skills/**`)                    | Fora da onda: relate; se o dono pedir, PR própria `fix/release-vX.Y.Z-basereds-*` com teste                        |
| Traduzir docs fora do _core set_ (só aparecem com `--all`)                                                     | **Pergunte**; não é gate de CI                                                                                     |
| Fechar PR alheia, `--admin`, editar workflow de CI, enfraquecer gate ou baseline                               | Nunca                                                                                                              |

**Pare e pergunte** também quando: um doc falha nos 66 locales após 3 tentativas reais; `BACKEND DOWN`
≥ 6 ou `QUOTA` ≥ 8 no log da onda; o merge da base traz conflito **fora** de `docs/i18n/` e
`.i18n-state.json`; a PR tem check de docs/i18n vermelho que não está vermelho no tip da base.

## 1. Regras absolutas desta skill (além das Hard Rules)

1. **Nunca imprima o conteúdo do env do backend** (`OMNIROUTE_TRANSLATION_API_URL`, `_MODEL`,
   `_API_KEY`, `_TIMEOUT_MS`, `_CONCURRENCY`). Carregue com `set -a; . <arquivo>; set +a`; nunca
   `cat`/`echo`/`grep` com valor. O kit resolve o arquivo por `I18N_ENV`, depois
   `_artifacts/i18n-completion/env.translation`, depois o `.env` da worktree.
2. **Um escritor por worktree.** Dois `scripts/i18n/run-translation.mjs` no mesmo diretório
   regravam o `.i18n-state.json` um por cima do outro (já apagou 162 mil linhas). O `wave.sh` tem
   lock e recusa se há outro `run-translation` na worktree. Não edite o state à mão com uma onda rodando.
3. **Nunca o adopt global** (`run-translation.mjs --adopt --targets-only`): o código avisa que ele
   cobre o estado inteiro e abençoa espelhos editados à mão por outras PRs. Readote só os docs que
   você tocou com `readopt_targets.py`.
4. **Commit + push por doc** (o `wave.sh` faz). Worktrees em `.claude/worktrees/` já foram varridas
   por outra sessão com 124 pares traduzidos sem commit; trabalho sem commit não tem recuperação.
5. **Onda sempre desacoplada** (`setsid nohup … & disown`). A sessão pode cair; a onda não.
6. **Classifique por prova comparável.** Drift, keys e ratio pertencem ao escopo da onda, mas
   a causa exige comparação entre base e candidato exatos. Falha fora de i18n vai para reparo
   separado. Use `⚠️ base-red inherited: #<issue>` somente para herança comprovada;
   a classificação explica a falha, não autoriza admissão com um gate obrigatório vermelho.
7. A listagem local de arquivos protegidos deve terminar com sucesso antes da inspeção.
   Erro de fetch/diff/listagem é HOLD. Use passos separados com saídas verificadas, nunca
   um merge no ramo de fallback de `&&`/`||`; uma falha não equivale a lista vazia.
8. Teardown só da sua worktree, pelo nome, e só depois de `MERGED` ou com a PR aberta e pushada
   (`_shared/worktree-teardown.md`). Termine com o checkout principal na branch em que começou.

## 2. Reconhecimento

Base = a branch confirmada pelo dono para esta tarefa. Resolva o tip vivo e o freeze;
se não houver base confirmada, pergunte antes de criar worktree. Não infira aprovação da
maior release nem da branch compartilhada. Um comando faz fetch, release em curso, freeze, base-red, PRs de i18n abertas, worktrees
alheias, cria ou reutiliza a worktree (`scripts/dev/new-worktree.sh`), mede o atraso da branch,
roda o drift (resumido por doc), os gates `i18n:check-keys`, `i18n:check-keys:cli`,
`i18n:check-ratio`, `check:docs-sync`, conta `__MISSING__`, roda `audit_all.py` e
`audit_spans.py`, testa o backend e imprime o comando da onda:

```bash
K=/home/diegosouzapw/dev/proxys/OmniRoute/.agents/skills/i18n-waves/scripts
bash $K/bootstrap.sh docs/i18n-wave-<MMDD>[-<hhmm>]      # 2º arg opcional: a base (ex.: release/v3.8.52)
export I18N_BASE=origin/<release> I18N_OUT=/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/i18n-waves
```

O painel fica em `_artifacts/i18n-waves/bootstrap-<branch>.txt`. O bootstrap cria ou reutiliza a worktree e testa o backend; portanto não é uma operação
puramente de leitura. Use-o somente depois de confirmar base, escopo e autorização do probe.
Ele **não traduz, não commita, não mergeia**. Backend: LAN `192.168.0.17:20128`, modelo `codex/gpt-5.6-sol-low`;
`/v1/models` em 200 até ~20 s é normal sob carga; o processo vaza memória e trava sem cair
(`ssh root@192.168.0.17 'pm2 jlist'` mostra; reiniciar é decisão do dono).

## 3. Procure trabalho existente antes de escrever qualquer coisa

- PR de i18n **sua** aberta de uma onda anterior (o bootstrap lista): continue nela (`cd` na
  worktree dela, seção 7 e depois seção 5) em vez de abrir outra.
- PR de i18n **alheia** aberta nos mesmos docs: HOLD nesses docs; registre no relatório.
- PRs recentes da base que editaram espelhos à mão são a origem dos `[loc]` no drift
  (`git log --since=7.days --format='%h %s' -- docs/i18n/pt-BR/README.md`). Não desfaça o
  conteúdo delas; a retradução por seção incorpora.

## 4. Classifique cada sinal do painel

| Sinal                                                                  | Causa provável                                                                                                                     | O que fazer                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `source-changed` / `stale` / `[loc]` / missing target no drift         | base avançou; PR editou espelho; adoção parcial                                                                                    | nada a classificar: o `wave.sh` lê o `--json` e processa. Fonte mudada/stale → retradução por seção; **só alvo editado** (fonte igual) → o `run-translation` pula (`translated=0, skipped=66`) e a readoção dirigida no fim da onda aceita a edição                                                                                                                                                                                                           |
| `audit_all` acusa headings/fences/rows num doc **sem** drift           | stale escondido (adopt depois da mudança da fonte)                                                                                 | `git log -3 --format='%h %ad %s' --date=short -- <fonte>` vs `git log -1 … -- docs/i18n/<loc>/<fonte>`. Fonte mais nova que o espelho → `python3 -I $K/rebase_stale.py <doc>`; uma PR traduziu só parte dos locales → `rebase_stale.py --at=<sha-da-PR>^ --locales=<os velhos> <doc>`. Depois `npx prettier --write .i18n-state.json`, `git diff --numstat .i18n-state.json` (nenhum bloco de outro doc pode sumir), commit, push; a onda retraduz só o delta |
| `audit_all` acusa headings faltando num único locale                   | espelho sem uma seção inteira                                                                                                      | `node scripts/i18n/run-translation.mjs --force --locale=<loc> --files=<doc>` (uma vez, um processo), commit, push                                                                                                                                                                                                                                                                                                                                             |
| `audit_spans` acusa um doc em muitos locales com `miss`≈`extra`        | literal de código traduzido dentro de crases (`Total: 0` virou `总计：0`) ou crases acrescentadas onde a fonte tem aspas           | **não é falso-positivo**: restaure o literal da fonte à mão (script python de `str.replace` por locale), `npx prettier --write` nos espelhos, `python3 -I $K/readopt_targets.py <doc>`, commit                                                                                                                                                                                                                                                                |
| `audit_spans` acusa 1–4 locales com `extra` de `null`/palavra curta    | código para desambiguar («zero/null» em de/cs/lt/uk) ou frase reescrita com identificadores intactos (fi: «`tos`-arvo on `avoid`») | falso-positivo: registre no ledger como decisão; não toque                                                                                                                                                                                                                                                                                                                                                                                                    |
| `i18n:check-keys` FAIL ou `__MISSING__` > 0                            | PR da base acrescentou chave em `en.json` sem traduzir                                                                             | siga `_shared/i18n-translate-new-keys.md` (guarda de nomes fixados em testes **antes**, depois `sync-ui-keys.mjs --translate-markers` ou `translate-new-keys.sh`); confira `npm run i18n:check-ratio` depois                                                                                                                                                                                                                                                  |
| `check:docs-sync` FAIL em `llm.txt i18n mirrors`                       | `llm.txt` raiz mudou                                                                                                               | `node scripts/i18n/sync-llm-mirrors.mjs`; superfície protegida: PR só mergeia com aprovação                                                                                                                                                                                                                                                                                                                                                                   |
| `check:docs-sync` FAIL em CHANGELOG                                    | release em curso                                                                                                                   | **pergunte**; normalmente é do release captain                                                                                                                                                                                                                                                                                                                                                                                                                |
| Drift em espelho de `AGENTS.md`/`CLAUDE.md`/`GEMINI.md`                | fonte mudou                                                                                                                        | retraduza normalmente; a PR vira HOLD para merge até aprovação explícita (mostre o diff do espelho ao dono)                                                                                                                                                                                                                                                                                                                                                   |
| Docs só visíveis com `check-translation-drift.mjs --all`               | «extras» antigos fora do core set                                                                                                  | não é gate; **pergunte** antes de gastar horas de backend                                                                                                                                                                                                                                                                                                                                                                                                     |
| `Docs Gates` vermelho por contagem (`193 migrations`, `358 providers`) | **fonte inglesa** defasada (`npm run check:docs-counts`)                                                                           | fora da onda; relate como base-red                                                                                                                                                                                                                                                                                                                                                                                                                            |

## 5. Rodar a onda (desacoplada)

```bash
cd /home/diegosouzapw/dev/proxys/OmniRoute/.claude/worktrees/<dir>
setsid nohup bash $K/wave.sh "$PWD" wave-<MMDD>[-<letra>] > "$I18N_OUT/wave-<MMDD>.nohup" 2>&1 < /dev/null & disown
```

O `wave.sh`, nesta ordem: lock por worktree (`flock`) e recusa se há outro `run-translation.mjs`
nela; carrega o env; probe real do backend (`chat/completions`, 5 tokens) com espera — `quota`
15 min × até 8 (`QUOTA_WAIT`/`QUOTA_MAX`), `down` 5 min × até 6 (`DOWN_WAIT`/`DOWN_MAX`); lista
os docs pelo drift `--json` gravado em **arquivo** (em pipe o Node trunca em 64 KiB) com fallback
para a listagem humana (`FILES="a.md b.md"` restringe; `FORCE=1` força a 1ª tentativa); para cada
doc, `run-translation.mjs --files=<doc>` nos 66 locales com até 3 tentativas reais (cota e backend
fora não consomem tentativa), **commit + push por doc**; no fim `readopt_targets.py` só nos docs
processados, commit e `WAVE END processed=N failed=M`.

**Como esperar.** `Bash` em background:

```bash
until grep -q "WAVE END" "$I18N_OUT/<nome>.log" || ! pgrep -f "wave.sh .*<nome>" >/dev/null; do sleep 60; done
grep -E "docs to process|drift verdict|summary|FAILED|QUOTA|DOWN|ABORT|WARN|WAVE END" "$I18N_OUT/<nome>.log" | sed -E 's/elapsed=.*//'
```

e trabalhe em outra coisa. Nunca `sleep` encadeado na thread. **Check-in** (30 min, 1 h…): três
fatos ao dono — última linha útil do log (`==`/`summary`/`committed`), o processo vivo e há quanto
tempo (`ps -eo pid,etime,cmd | grep run-translation | grep -v grep`), quantos espelhos estão
traduzidos sem commit (`git status --short docs/i18n | wc -l`). `git commit` parado 5–10 min dentro
do `lint-staged`/`prettier` com load alto é normal: não mate. Se a sessão cair, a onda continua; ao
retomar, releia o log e **não** relance enquanto `pgrep -f "wave.sh"` mostrar a anterior.

Durações com o Codex (66 locales): doc pequeno 5–15 min; médio 20–40 min; ENVIRONMENT,
PROVIDER_REFERENCE, API_REFERENCE 1–3 h. 18 docs ≈ 11 h; 3 docs ≈ 1 h. Falhas que a onda absorve:
`429 … quota`, `502 upstream_empty_response`, `fetch failed`, chunk rejeitado pela guarda de saída
(`<think>`, meta-prosa, tabela/fence divergente → o locale fica `failed` e a tentativa seguinte
refaz só ele). `FAILED: <doc>` após as tentativas = pare e pergunte.

## 6. Validar a onda

Execute cada checker separadamente, grave stdout/stderr e o exit real antes de resumir
com head/tail. Um pipeline sem pipefail não prova o exit do checker; JSON deve ir a arquivo.
Registre base/head/candidato, runtime e lockfile, segundo `_shared/validation-gate.md`.

- Drift estrito: `node scripts/i18n/check-translation-drift.mjs --json`; sem `--warn`.
- Auditorias: `python3 -I "$K/audit_all.py"`, `audit_spans.py` e `validate_vs_base.py`.
  Leia os resultados completos; zero regressões estruturais novas e zero vazamentos.
- Gates: `i18n:check-keys`, `i18n:check-keys:cli`, `i18n:check-ratio`,
  `check:docs-sync` e `check:docs-all`; inclua value-drift/new-key quando houver UI.
- Conte `__MISSING__` e examine o diff inteiro. Marcador não é tradução aprovada.
- Compare a lista de arquivos com o escopo autorizado e com as superfícies protegidas.

Conteúdo (não pule): o trecho novo deve aparecer em cada espelho aplicável. Meça os
locales atuais. Numerais nativos são corretos; leia um espelho de alfabeto diferente
(ar, ja, hi) e um latino. Nomes de produto, caminhos, flags e URLs ficam intactos.
Hash coincidente não prova conteúdo correto; readoção dirigida exige revisão do texto.

## 7. Trazer a base de novo (sempre antes da PR e antes do merge)

Faça fetch da base confirmada, confira o exit e registre seu SHA. Na worktree própria,
faça o merge da base. Só invoque `resolve_state_merge.py` se houver conflito exclusivamente
nos espelhos/state autorizados; confira `unresolved: 0` e o diff antes de commitar/pushar.
Depois repita a seção 6 com os exits preservados. Qualquer falha de preparação interrompe
a sequência; saída resumida de grep/tail não substitui o checker estrito.

Regra do resolvedor: para cada doc que a onda tocou, se a entrada da base já está fresca contra a
fonte da base (outra sessão traduziu a versão mais nova) ficam os espelhos e a entrada da base;
senão ficam os nossos e a nossa entrada, e o doc reaparece como `source-changed` para a volta
seguinte retraduzir só o delta. Depois ele recalcula o `target_hash` dos espelhos envolvidos a
partir do working tree, para correções manuais não virarem `[loc]`. Conflito **fora** de
`docs/i18n/` e `.i18n-state.json` → pare e pergunte.

Drift voltou a listar docs → nova volta (5 → 6 → 7). **Critério de parada:** quando uma volta
trouxer ≤ 3 docs, ou a base não tiver andado, feche a onda; não persiga o tip indefinidamente.
Diga ao dono quantos docs ficaram para a próxima.

## 8. PR

```bash
gh pr create --base "${I18N_BASE#origin/}" --head <branch> --title "docs(i18n): <resumo curto>" --body-file "$I18N_OUT/pr-<branch>.md"
```

Corpo em inglês, humano, sem rodapé de IA, pelo template de `references/templates.md`:
`⚠️ base-red inherited: #<issue>` no topo; _Summary_ doc a doc com causa e PR de origem;
_Validation_ com os números da seção 6; nota de superfície protegida quando houver. Só
`docs/i18n/**`, `.i18n-state.json` e, se a onda traduziu chaves, `src/i18n/messages/*.json`.

## 9. Admissão (somente no modo onda com merge)

Siga `_shared/merge-gates.md` e `_shared/protected-surfaces.md`; esta seção não cria
exceção de i18n aos gates da release.

1. Confirme a autorização de merge desta sessão, ownership da PR e ausência de freeze.
2. Resolva base, head e candidato combinado atuais; leia runs/attempts e receipts
   vinculados a essas identidades. Reconsulte os SHAs imediatamente antes de admitir.
3. Todos os gates obrigatórios aplicáveis precisam de resultado terminal bem-sucedido,
   inclusive `Gate / CI` e `Gate / Quality`. Uma classificação docs-only validada
   pode excluir lanes de código; a skill não pode decidir isso por conta própria.
4. BASE-RED, falha obrigatória, pending, queued, cancelled, missing e skip inesperado
   permanecem HOLD. Verde de outra PR ou de outro SHA não é prova deste candidato.
   Advisory continua visível conforme a política versionada, sem virar PASS fictício.
5. Gere a lista local de arquivos em comando separado e verifique seu exit. Inspecione
   os hunks protegidos; aprovação específica para esta PR é necessária antes do merge.
   Falha na listagem interrompe a admissão, nunca aciona merge por fallback.
6. Só com as condições anteriores completas faça o merge pelo fluxo autorizado e leia
   de volta estado e SHA. Não use bypass administrativo para satisfazer a lista.

## 10. Validação final no tip e teardown

Valide novamente o tip integrado em worktree própria, mantendo instalação limpa,
checagens focadas, suites integrais e aceitação de release como afirmações distintas.
Se a base avançar, a evidência anterior não certifica o novo candidato.

Retenha logs e receipts antes da limpeza. Siga `_shared/worktree-teardown.md` somente
para a worktree/branch criada nesta onda, com trabalho commitado, pushado e PR confirmada.
Não apague branch remota nem use remoção forçada como etapa automática da onda.
Termine com o checkout compartilhado na mesma branch, sem alterar trabalho alheio.

## 11. Ledger e relatório

Memórias pessoais só são alteradas por solicitação explícita do dono; o template histórico
não autoriza escrita automática em memória. Ledger append-only em `_tasks/reports/i18n/ondas.md` (template em `references/templates.md`), uma
seção por onda no fim do arquivo; commit no `_tasks` com a lista exata de arquivos (Hard Rule 23;
nunca `git add -A` ali). Se o `_tasks` não existir nesta máquina, o relatório vai no corpo da PR.

Relatório ao dono (curto, pt-BR, só o verificado): placar antes → depois (docs com drift,
mismatches estruturais, spans sinalizados descontando falsos-positivos, arquivos com `__MISSING__`);
a PR (número, estado, checks de docs/i18n) e o que ficou vermelho por base-red; o que **não** entrou
e por quê (superfície protegida aguardando aprovação, docs fora do core set, falhas, CHANGELOG);
quantos commits a base andou durante a onda e quantos docs ficaram para a próxima; SHA do ledger.

## 12. Subagentes

A tradução é um escritor por worktree: não há paralelismo seguro dentro da onda além do que o
`run-translation.mjs` já faz por locale. Subagente só para tarefas laterais (ler logs de CI,
auditar PRs da base, redigir o corpo da PR), com modelo padrão da sessão e `effort: "high"`, e com
estas proibições **verbatim** no prompt: nunca `git stash`; nunca imprimir o env do backend; nunca
rodar `run-translation.mjs`, `sync-ui-keys.mjs` ou adopt (só a thread principal escreve em
`.i18n-state.json`); nunca `pkill node`; `_tasks/` só criar/editar arquivos. Audite o diff antes de aceitar.

## Início rápido (cole na sessão limpa)

> Leia `/home/diegosouzapw/dev/proxys/OmniRoute/AGENTS.md` e invoque `/i18n-waves` no modo
> `onda` sobre a release em curso. Responda em português do Brasil. Não mergeie nada. Registre a
> onda no ledger. Termine com o checkout principal na branch em que começou.

Com merge: «… no modo `onda com merge`: pode mergear a PR da onda quando todos os gates obrigatórios aplicáveis ao candidato atual
estiverem completos e ela tocar só `docs/i18n/**`, `.i18n-state.json` e `src/i18n/messages/`; espelhos
de `AGENTS.md`/`CLAUDE.md`/`GEMINI.md`/`llm.txt` ficam HOLD até eu aprovar.» Só diagnóstico: «… no
modo `diagnóstico`: inspecione e rode checkers, classifique o painel e diga o que faria;
confirme antes de criar worktree ou fazer probe pago; nenhuma tradução, PR ou merge.»
