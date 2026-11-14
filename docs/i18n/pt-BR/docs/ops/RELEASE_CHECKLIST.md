# Release Checklist (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Última atualização:** 2026-08-28 — v3.8.51
> Fluxo de release simplificado que utiliza skills do Claude Code para automação.
>
> **Mantenha a fila/branch verde entre releases:** consulte [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (família `/green-prs` + `npm run check:release-green` + `/babysit` + execução noturna). Executar
> isso periodicamente — e especialmente **antes** deste checklist — faz com que o PR de release comece verde.

## TL;DR

```bash
# 1. Incrementar a versão + gerar o CHANGELOG (skill)
/version-bump-cc patch    # ou minor/major

# 2. Executar o gate de qualidade localmente
npm run check              # lint + testes
npm run test:coverage      # gate de cobertura completa (60/60/60/60)

# 3. Fazer o build e o teste de fumaça
npm run build
npm run test:e2e           # opcional, mas recomendado

# 4. Gerar a release (skill)
/generate-release-cc

# 5. Fazer o deploy (skill)
/deploy-vps-both-cc        # ou akamai-cc / local-cc

# 6. Capturar evidências da release (skill)
/capture-release-evidences-cc
```

## Publicação Confiável do npm (padrão desde a v3.8.51) — preparada mediante solicitação, direta como fallback

`npm-publish.yml` publica por meio da **Publicação Confiável do npm (OIDC)** por padrão: o
job `stage-npm` (hospedado pelo GitHub) troca o id-token do GitHub por uma credencial
npm de curta duração para essa execução — sem token npm de longa duração nos secrets do repositório, sem solicitação de 2FA, com proveniência anexada.
Esse é o mecanismo de bypass que o npm agora permite, já que os tokens que ignoram o 2FA estão sendo descontinuados;
ele restaura o fluxo totalmente automático que o projeto tinha até a v3.8.48, mantendo a
garantia WS1.3 (um token vazado não pode publicar sozinho — não há token).

**Configuração única (proprietário):** npmjs.com → pacote `omniroute` → Settings → _Trusted
Publisher_ → GitHub: proprietário `diegosouzapw`, repositório `OmniRoute`, workflow `npm-publish.yml`
(ambiente: nenhum). Até que isso exista, a etapa automática falhará com `ENEEDAUTH`:
execute novamente com `publish_mode=staged` (abaixo) ou `direct`.

### Publicação preparada (mediante solicitação — `publish_mode=staged`)

O workflow npm-publish não publica mais diretamente: ele inicializa o tarball empacotado
(`check:pack-boot`) e depois executa `npm stage publish` — os bytes exatos ficam armazenados no
registro, **não instaláveis** até que o proprietário os aprove. O gate humano de 2FA foi movido
para DEPOIS da comprovação, não antes dela.

**Fluxo do proprietário depois que o workflow ficar verde:**

1. `npm stage list omniroute` — encontre o ID da preparação (também exibido no resumo do workflow).
2. Verifique os bytes preparados (recomendado): `npm stage download <id>` e, em seguida, instale o
   tarball baixado em um prefixo temporário e inicialize-o (`npm run check:pack-boot` automatiza
   o mesmo veredito de empacotar→instalar→inicializar na CI).
3. `npm stage approve <id>` — a solicitação de 2FA É a publicação. `npm stage reject <id>` descarta.
4. Rede de segurança pós-publicação: o verificador pós-publicação (WS1.4 do plano da v3.8.49) instala a
   versão publicada a partir do registro público em um contêiner limpo e a inicializa.

**Fallback de emergência:** `workflow_dispatch` com `publish_mode=direct` restaura o
`npm publish` imediato legado (use apenas se a própria preparação apresentar problemas; registre o motivo).

**Reforço único de segurança (proprietário, npmjs.com):** configure o Trusted Publisher para
`omniroute` no modo somente preparação, para que um token de longa duração vazado não possa executar `npm publish`
diretamente de nenhum lugar — a CI só pode preparar; apenas o 2FA do proprietário libera a publicação.

**Procedimento para artefato quebrado (inalterado):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
como reação padrão (leva minutos, é reversível); `npm unpublish` somente dentro da janela de 72 horas/sem dependentes
e nunca como primeira medida. Docker: nunca reescreva uma tag de versão — o rollback consiste em
redirecionar `latest` para o último digest válido.

**`latest` no Docker Hub (obrigatório em cada publicação SemVer estável):** o
workflow `docker-publish` deve marcar **tanto** `X.Y.Z` quanto, quando
`should-promote-latest.sh` confirmar que esta é a maior SemVer estável, `:latest`
com o **mesmo digest**. Após o job: o digest de `latest` no Hub deve ser igual ao novo
digest SemVer e `last_updated` deve ter sido atualizado. Não deixe `:latest` apontando para um
build mais antigo enquanto as notas da release mencionam correções que existem apenas no git. Os inícios rápidos
com Compose usam `:latest`; o GitOps deve continuar fixando `X.Y.Z`. Consulte
[Canais de release do Docker](../guides/DOCKER_GUIDE.md#release-channels) e #10317.

## Via Rápida de Hotfix (rótulo `hotfix`)

Um PR rotulado como `hotfix` ignora a matriz pesada de CI (E2E com 9 shards, controle progressivo de cobertura,
quality-gate, quality-extended) e mantém as verificações rápidas e de alto sinal: build,
shards de testes unitários, integração, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
e o teste rápido de inicialização do tarball (`check:pack-boot`). Meta: ficar verde em ≤15min, em vez de ~33min.

**Política de entrada — todos os quatro requisitos são obrigatórios (baseada nas vias de emergência do Chromium/VS Code/Node):**

1. **Gravidade**: a produção está quebrada — um artefato publicado falha na inicialização / uma
   correção de segurança / todos os usuários da versão são afetados. "Importante" não significa "quebrado".
2. **Autoridade**: somente o proprietário do repositório aplica o rótulo `hotfix`. O rótulo É
   a aprovação — nunca deve ser aplicado pelo próprio autor em um PR de campanha.
3. **Evidência**: o corpo do PR contém um link para a execução pesada anterior totalmente verde (a suíte que os
   jobs ignorados revalidariam), além do teste da própria correção, primeiro falhando e depois passando.
4. **Escopo**: somente cherry-pick — a correção mínima, sem refatorações nem alterações adicionais.

A superfície de cobertura/controle progressivo ignorada é revalidada pela próxima execução completa na
branch de release (release continuamente verde) — a via ignora a ESPERA, nunca a validação.
Diffs somente de testes (todos os arquivos em `tests/`, nenhum em `tests/e2e/`) ignoram a matriz
E2E automaticamente, sem qualquer rótulo.

## Lista de verificação detalhada

### Pré-lançamento

- [ ] Todos PRs direcionados a esta versão são mesclados com o `release/vX.Y.0`
- [ ] Todos os itens Linear/issue abertos para esta versão são fechados ou empurrados para o próximo marco
- [ ] CI verde no galho `release/vX.Y.0`
- [ ] Nenhum marcador `TODO(release)` no código: `grep -r "TODO(release)" src/ open-sse/`
- [ ] imagem base Docker atualizada (atualmente `node:24.15.0-trixie-slim`)

### Versão e registro de alterações

- [ ] Execute `/version-bump-cc <patch|minor|major>` (habilidade de código Claude )
  - Solavancos `package.json`, `electron/package.json`
  - Regenera `CHANGELOG.md` de commits do git desde a última tag
  - Atualiza emblemas README.md
- [ ] Revise manualmente CHANGELOG.md e limpe as mensagens de commit, se necessário
- [ ] Certifique-se de que a seção semver mais recente em `CHANGELOG.md` seja igual à versão `package.json`
- [ ] Mantenha `## [Unreleased]` como a primeira seção do changelog para trabalhos futuros
- [ ] Atualizar `docs/openapi.yaml` → `info.version` deve ser igual à versão `package.json`

### Qualidade do código

- [ ] Erros `npm run lint` — 0 (os avisos são pré-existentes)
- [ ] `npm run typecheck:core` — limpo
- [ ] `npm run typecheck:noimplicit:core` — limpo (estrito)
- [ ] `npm run check:cycles:ratchet` — dentro do teto `metrics.cycles` congelado (bare `check:cycles` sai de 1 em qualquer ciclo, #15281)
- [ ] `npm run check:any-budget:t11` — dentro do orçamento
- [ ] `npm run check:route-validation:t06` — limpo
- [ ] `npm run check:node-runtime` — piso de tempo de execução compatível com `>=22.22.2 <23`, `>=24.0.0 <27`, por `SUPPORTED_NODE_RANGE` em `src/shared/utils/nodeRuntimeSupport.ts`; alinhado com `package.json` `engines`)

### Teste

- [ ] passe `npm run test:unit` —
- [ ] `npm run test:vitest` — pass (servidor MCP, autoCombo, cache)
- [ ] `npm run test:coverage` — portão 60/60/60/60 satisfeito (statements/lines/functions/branches)
- [ ] `npm run test:integration` — pass (se houver alterações, toque em DB / manipuladores)
- [ ] `npm run test:combo:matrix` — pass (matriz de estratégia combinada: prova deterministicamente todas as decisões de seleção de todas as 22 estratégias de roteamento público; executado ao tocar em roteamento combinado, resolução de estratégia ou lógica de fallback)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` —**optional/manual** (fumaça real-upstream bloqueada; obtém um instantâneo DB somente leitura de VPS `root@192.168.0.15`; atinge provedores reais, custa créditos; nunca é executado em CI; pula de forma limpa sem o portão)
- [ ] `npm run test:combo:live:vps` —**optional/manual** (Phase-3 VPS live smoke: 7 cenários HTTP contra o servidor `.15` ao vivo via nó simples ESM; requer `ssh root@192.168.0.15`; creates/deletes apenas combos `__live_test__*` ; atinge provedores reais; nunca roda em CI)
- [ ] passagem `npm run test:e2e` — (mudanças UI )
- [ ] passagem `npm run test:protocols:e2e` — (mudanças MCP/A2A )
- [ ] passe `npm run test:ecosystem` —

### Ganchos (validados pela Husky)

Os ganchos Husky residem no `.husky/` e são executados automaticamente nas operações git.

- **pré-comprometer:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pré-empurrão:** portões determinísticos rápidos — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (ativados em 13/06/2026). Exclui intencionalmente `test:unit` (lento; coberto pelo trabalho CI `test-unit` ).
  - Execute `npm run test:unit` manualmente antes de enviar ramificações de lançamento.

Se um gancho falhar: corrija o problema subjacente, não ignore `--no-verify`.

### Confirmações Convencionais

Todos os commits vinculados ao lançamento devem seguir o formato `type(scope): subject`.

**Tipos válidos:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Escopos válidos:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Mudanças importantes: adicione `BREAKING CHANGE:` rodapé ou `!` após o escopo (por exemplo, `feat(api)!: drop /v0`).

### Documentação

- [ ] passes `npm run check:docs-sync` (execução automática por pré-confirmação)
- [ ] passes `npm run check:docs-all` (guarda-chuva: docs-sync + docs-counts + env-doc-sync + versões obsoletas + doc-links)
- [ ] `npm run check:env-doc-sync` sai 0 código — ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` env o contrato está intacto
- [ ] `npm run check:doc-links` sai de 0 — sem referências de remarcação interna quebradas após a reestruturação
- [ ] `docs/architecture/ARCHITECTURE.md` revisado para storage/runtime drift
- [ ] `docs/guides/TROUBLESHOOTING.md` revisado para env var e desvio operacional
- [ ] Se `.env.example` mudou: `docs/reference/ENVIRONMENT.md` atualizado
- [ ] Se o novo recurso tiver um UI: `docs/guides/USER_GUIDE.md` o menciona
- [ ] Se o novo recurso tiver API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` atualizado
- [ ] Se o novo recurso for um módulo: existe `docs/<MODULE>.md` dedicado
- [ ] Se houver alteração significativa: `docs/guides/TROUBLESHOOTING.md` tem nota de migração

### i18n

- [ ] `npm run i18n:check` sai do estado de tradução 0 — (`.i18n-state.json`) em sincronia com os documentos de origem (sem fontes desviadas no modo estrito; o aviso no modo de aviso é aceitável para retoques de documentos de última hora, mas deve ser 0 antes da marcação)
- [ ] `npm run i18n:check-ui-coverage` sai de 0 — a cada localidade UI igual ou superior ao piso de cobertura de 80%
- [ ] `npm run i18n:sync-ui:dry` relata 0 chaves ausentes em todas as 66 localidades de destino (cada localidade, exceto a origem `en` )
- [ ] Se os documentos de origem em inglês foram alterados, execute `npm run i18n:run` (requer `OMNIROUTE_TRANSLATION_API_KEY` em `.env`) antes de marcar
- [ ] Contribuições de tradução podem ser adiadas para o próximo lançamento se forem menores (faixa em CHANGELOG)

### Migrações de banco de dados

- [ ] Se `src/lib/db/migrations/` tiver novos arquivos:
  - [ ] Cada migração é idempotente (`CREATE TABLE IF NOT EXISTS`, etc.)
  - [ ] Migrações envolvidas em transações
  - [ ] Numerado corretamente (sem lacunas na sequência)
- [ ] Teste na nova instalação: exclua `~/.omniroute/omniroute.db` e execute `npm run dev`
- [ ] Teste na instalação existente: faça backup DB, execute a migração, verifique o esquema
- [ ] arquivos WAL (`-wal`, `-shm`) tratados corretamente se a migração reescrever tabelas

### Catálogo de Provedores (validado por Zod)

- [ ] Esquema `src/shared/constants/providers.ts` Zod válido no tempo de carregamento
  - [ ] Todos os provedores possuem campos obrigatórios (`id`, `label`, `kind`, etc.)
  - [ ] `freeNote` fornecido para novos provedores gratuitos
  - [ ] provedores OAuth têm `oauthConfig` registrado no `src/lib/oauth/constants/oauth.ts`
- [ ] Se novo provedor for adicionado: executor correspondente em `open-sse/executors/`
- [ ] Se não for formato OpenAI: tradutor em `open-sse/translator/`
- [ ] Modelos cadastrados no `open-sse/config/providerRegistry.ts`
- [ ] Testes unitários em `tests/unit/` cobrem classificação e roteamento de provedores

### Área de trabalho (Electron)

Se `electron/` mudou:

- [ ] `npm run electron:smoke:packaged` passa
- [ ] Compilações testadas para pelo menos um de `:win`, `:mac`, `:linux`
- [ ] Certificados de assinatura de código não expirados (se estiverem assinando)
- [ ] A versão `electron/package.json` corresponde ao root `package.json`
- [ ] Ponteiro de canal de atualização automática atualizado se for lançado para `stable`

### Layout de construção

O repositório usa três diretórios de saída distintos — nunca os misture:

| Diretório | Propósito                                                 | Rastreado?        |
| --------- | --------------------------------------------------------- | ----------------- |
| `src/`    | Fonte do aplicativo (TypeScript / TSX)                    | Sim               |
| `.build/` | Construir intermediários — `next build` saída (`distDir`) | Não (gitignorado) |
| `dist/`   | Pacote npm entregável — montado por `assembleStandalone`  | Não (gitignorado) |

> **Nota do operador:** o diretório de imagem VPS remoto permanece `/usr/lib/node_modules/omniroute/app/`. Apenas o** no repositório** saída de compilação movida (`app/` → `dist/`). As habilidades de implementação rsync `dist/` conteúdos no diretório `app/` remoto — não são necessárias alterações no caminho VPS.

**Fluxo de construção única:**

```
npm run build:release
  └─ rm -rf .build dist          (clean)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (copies standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

Faça NOT execute `npm run build` seguido por um `npm run build:cli` separado para implantar — use `npm run build:release` que faz uma reconstrução limpa + sentinel em um comando.

### Validação de artefato

- [ ] `npm run build:release` é bem-sucedido e `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` clean — no `app.__qa_backup`, `scripts/scratch`, `package-lock.json` ou outro resíduo local
- [ ] `dist/server.js` existe após a construção
- [ ] Smoke de tempo de execução empacotado local opcional: `npm run dev:candidate -- validate` após `npm run dev:candidate -- build` inicializar o tarball compactado em um `DATA_DIR` isolado e verificar `/api/health` + `/v1/models` (consulte [Contribution Golden Path](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop) )

### Marcação e liberação

- [ ] Execute `/generate-release-cc` (habilidade de código Claude ):
  - Cria a tag `vX.Y.Z`
  - Envia tag e branch
  - Abre GitHub Release com o corpo do changelog
  - Anexa instaladores Electron (se construídos)
- [ ] Ou manualmente:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Implantar

As habilidades de implantação usam o fluxo rsync leve — no `npm pack`, no `npm i -g`:

- [ ] Use a habilidade de implantação que corresponda ao alvo:
  - `/deploy-vps-local-cc` — local VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — ambos
- [ ] Antes de implantar, confirme `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] A compilação deve ser executada onde `node_modules` é real (checkout principal ou `npm ci`'d worktree — NOT uma árvore de trabalho com link simbólico)
- [ ] Instância implantada de teste de fumaça:
  - Abra `/dashboard/health` → verifique se a string da versão corresponde ao lançamento
  - Execute uma solicitação `/v1/chat/completions` em um provedor conhecido
  - Verifique `/api/monitoring/health` retorna os disjuntores `CLOSED`
  - Confirme a resposta dos transportes MCP (`/mcp` HTTP, `/mcp-sse` SSE)

### Pós-lançamento

- [ ] Execute `/capture-release-evidences-cc` (habilidade de código Claude )
  - Captura WebP screenshots/recordings de novos recursos
  - Anexa às notas de lançamento/postagem do blog
- [ ] Atualize GitHub Discussions / Discord com anúncio de lançamento
- [ ] Marco aberto para a próxima versão
- [ ] Se for crítico: fixe a discussão ou poste no `news.json` para obter o banner no aplicativo

### Portão de lançamento público do radar

O anúncio do Radar foi cometido intencionalmente com `active: false`. A ativação é uma alteração separada após cada item abaixo ser evidenciado:

- [ ] Todos os Radar PRs empilhados são mesclados e a dica de lançamento CI é verde
- [ ] Implante e fume as rotas OSS Radar com `RADAR_ENABLED` ainda desativado por padrão
- [ ] Fume `GET /planos`, `/termos`, `/privacidade` e `/reembolso` no host Radar nomeado
- [ ] Operadora de registro identity/contact/address e revisão legal aprovada pelo proprietário no serviço privado
- [ ] Exercite o Stripe Checkout e o webhook assinado apenas no modo de teste
- [ ] Exercite uma entrega de e-mail transacional criptografado com o sender/domain aprovado
- [ ] Comprove a restauração do backup e uma execução de pesquisa supervisionada e com orçamento limitado
- [ ] Aprovar a política de revisão BRL/PIX antes de aceitar provas de doação
- [ ] Habilite o Checkout público somente após os portões anteriores e ative o novo `news.json` ID
- [ ] Verifique se o banner inicial usa cópia localizada e se um novo ID reaparece após um ID mais antigo ser descartado

## Teste de fumaça dos serviços integrados (v3.8.4+)

Antes de publicar qualquer versão que inclua alterações nos serviços integrados, verifique:

### Inicialização com banco de dados novo (detecta colisões de migração — adicionado após o hotfix da v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — aguarde 10 s para a inicialização
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` retorna `"9router"` (NÃO 404, NÃO 500). Confirma que a migração `071_services.sql` foi aplicada e que a linha foi inserida.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` retorna 3 linhas.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` retorna 2 linhas (valida que `070_webhooks_kind_metadata.sql` foi aplicada).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` é executado com sucesso — protege contra colisões futuras.

### 9Router

- [ ] `POST /api/services/9router/install` retorna 200 com `installedVersion` em menos de 2 min
- [ ] `POST /api/services/9router/start` retorna 200 e `state: "running"` em menos de 30 s
- [ ] `GET /api/services/9router/status` informa `health: "healthy"`
- [ ] `POST /v1/chat/completions` com `"model": "9router/auto/..."` retorna 200 (roteamento de ponta a ponta pelo 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` renderiza a interface nativa do 9Router dentro do proxy (sem iframe apontando diretamente para `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` retorna `{ keyRotated: true }` e o serviço reinicia corretamente
- [ ] `POST /api/services/9router/stop` retorna 200 e `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` retorna um fluxo SSE com um evento `snapshot` contendo linhas recentes
- [ ] A instalação em um ambiente sem `npm` no PATH retorna 500 com uma mensagem de erro amigável (sem rastreamento de pilha)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` retorna 200 em menos de 2 min
- [ ] `POST /api/services/cliproxy/start` retorna 200 e `state: "running"` em menos de 30 s
- [ ] `GET /api/services/cliproxy/status` informa `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` retorna 200 e `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` retorna um fluxo SSE

### Regressão de segurança

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` retorna `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` retorna `403 LOCAL_ONLY`
- [ ] As respostas de erro de `/api/services/*` não contêm `err.stack` nem caminhos absolutos de arquivos

## Verificações da v3.8.0+

Antes de publicar qualquer versão v3.8.x, verifique também estes itens:

- [ ] `omniroute --tray` inicializa no macOS (systray2 instalado em `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` inicializa no Linux (requer DISPLAY; apresenta um erro adequado se não estiver definido)
- [ ] `omniroute --tray` inicializa no Windows (PowerShell NotifyIcon, sem binários adicionais)
- [ ] `omniroute config tray enable` cria uma entrada de inicialização automática; a desativação a remove
- [ ] `npm install -g omniroute@<this-version>` executa o postinstall sem encerramento fatal
- [ ] O processo de atualização mantém as dependências opcionais: `omniroute update --apply` e o atualizador automático
      executam `npm install -g … --include=optional` para que as `optionalDependencies` (better-sqlite3,
      keytar, tls-client e a pilha SLM do llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) sejam preservadas após uma atualização. O nível SLM ultra `modelPath` também precisa do
      modelo tinybert, baixado automaticamente para `${DATA_DIR}/models/llmlingua` no primeiro uso. Em seguida, o postinstall
      (`scripts/build/colocateOptionals.mjs`) coloca o conjunto de dependências opcionais do SLM em
      `dist/node_modules`, para que o worker resolva uma ÚNICA instância de `@huggingface/transformers` ^4.2.0
      — o rastreamento independente inclui apenas transformers, não as dependências opcionais importadas dinamicamente;
      portanto, sem isso, o worker carregaria llmlingua-2 usando transformers da raiz, e o nível SLM
      passaria silenciosamente para o modo de funcionamento aberto em caso de falha.
- [ ] `omniroute status` funciona sem `.env` (caminho de token da CLI, apenas loopback)
- [ ] `curl http://localhost:20128/api/shutdown` retorna 401 (rota sempre protegida)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` retorna 401 (proteção de loopback)
- [ ] O runtime do SQLite é resolvido como `bundled` na primeira execução (binário incluído válido para a plataforma)
- [ ] O runtime do SQLite usa `runtime` como alternativa quando `node_modules/better-sqlite3` é excluído
- [ ] O filtro MCP inteligente compacta a saída real de `playwright-mcp browser_snapshot` (redução ≥50%)
- [ ] Todos os 10 arquivos `skills/omniroute*/SKILL.md` podem ser acessados publicamente por meio da URL bruta do GitHub
- [ ] O assistente de integração exibe a etapa de apresentação dos níveis "Como funciona" em uma configuração nova
- [ ] O widget de cobertura de níveis do painel inicial exibe as contagens configuradas/ativas

---

## Corte da versão 3.9.0 LTS (ensaiado na 3.8.58)

Após a v3.8.59, a próxima versão é a 3.9.0, e sua ponta se torna duas branches de longa duração:
`stable/v3` (a linha LTS da v3, npm `latest`) e `develop` (v4, atualizada para 4.0.0, npm
`nightly`). O modelo de branches/canais, o forward-port e os labels estão em
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md); o plano está no [ROADMAP](../../ROADMAP.md) (Fase 3). O corte é executado uma única vez;
a 3.8.58 o ensaia de ponta a ponta em um fork, e a 3.8.59 é encerrada com a
[lista de verificação GO/NO-GO](./LTS_GO_NO_GO.md).

### Simulação (somente leitura, segura a qualquer momento)

```bash
npm run release:dry-run-lts-cut                       # o corte real: 3.9.0 a partir de HEAD, tag anterior v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # fixa o commit de origem
```

`scripts/release/dry-run-lts-cut.mjs` não executa nada: ele lê o git e o `gh` e imprime a
sequência completa — pré-condições (a origem pode ser resolvida, o repositório de origem tem o histórico completo —
um clone raso não consegue enviar `stable/v3`, o lado receptor rejeita o pacote no primeiro
pai enxertado, portanto faça o corte a partir de um clone completo ou execute `git fetch --unshallow origin` primeiro — a tag
anterior existe, o `package.json` contém a versão de destino, uma issue `release-freeze` está aberta, não há
nenhuma issue `Release branch not green` aberta
em uma branch de release existente — uma branch que não existe informa `?` desconhecido, nunca
verde — a fila `release` do Mergify está configurada (G11: `queue_rules`, `checks_timeout`,
label `queue`), o ruleset `release/*` ainda bloqueia exclusões e force-pushes, e
`stable/v3` e `develop` ainda não existem), as duas etapas de criação de branches, quais gatilhos de
workflows inativos e condições `if:` se tornam verdadeiros (e quais permanecem bloqueados por uma variável do repositório ou
fixados no repositório canônico), os dist-tags esperados (`latest` → 3.9.0, `next` e
`nightly` vazios) e o rollback. Código de saída `0` = `RESULT: READY`, `1` = falha em uma pré-condição
obrigatória (`✗`), `2` = erro de uso. `--advisory <id,...>` rebaixa uma verificação para aviso (`!`)
sem ocultá-la.

Execute a simulação do corte real enquanto o congelamento da release 3.9.0 ainda estiver ativo — as branches são
criadas após a tag e antes de a Fase 12c encerrar o congelamento.

### Ensaio da 3.8.58 (somente em fork)

```bash
# 1. Simulação na ponta atual com parâmetros de ensaio
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Execute em um remote de FORK (origin, ou qualquer remote cuja URL seja a do repositório
#    canônico, é recusado; cada etapa solicita confirmação no terminal)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Exercite os workflows inativos no fork (workflow_dispatch quando a simulação
#    informar uma fixação no repositório canônico) e, em seguida, faça o rollback
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

O commit de atualização de develop é criado com o plumbing do git (nenhuma árvore de trabalho é alterada) e atualiza
os mesmos cinco arquivos de um commit de abertura de ciclo: `package.json`, `open-sse/package.json`,
`electron/package.json`, `package-lock.json` e `docs/openapi.yaml`. A seção `[4.0.0]` do
CHANGELOG e seus espelhos de i18n são abertos posteriormente em `develop`, antes do primeiro
PR. O script nunca altera os dist-tags do npm — ensaie-os em um pacote temporário.

### Artefato de prévia do PR (compile uma vez, promova os mesmos bytes)

`.github/workflows/preview-artifact.yml` cria um único tarball de produção a partir do head de um PR e
valida exatamente essa build (parte (a) da #8084). Somente PRs do mesmo repositório; nada é publicado.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # ou adicione o label `preview-artifact`
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # instalação da prévia
```

A execução realiza `npm ci`, `npm run build:release`, `npm run check:pack-artifact`, empacota o
tarball, executa `npm run check:pack-boot` (segredos falsos, diretório de dados efêmero), reempacota e
falha, a menos que o digest seja idêntico; em seguida, registra `artifact-identity.json` (SHA do head, SHA da
base, hash do lockfile, plataforma, arquitetura, ABI do node, bundler, política de build —
`scripts/release/artifact-identity.mjs`) e atesta o tarball em um job separado. Promover
uma prévia significa instalar esse tarball: nunca faça uma nova build a partir do código-fonte.

### O corte (3.9.0, após o GO)

1. GO registrado em [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` imprime `RESULT: READY`.
3. Crie as branches em `origin` manualmente usando os comandos impressos pela simulação — o
   script se recusa a fazer push para `origin`. Para reutilizar um commit de develop revisado, execute o
   ensaio com `--execute` na ponta da 3.9.0 em seu fork primeiro; ele imprime ambos os SHAs, e
   os mesmos commits podem ser enviados:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. Proteja `stable/v3` e `develop` (conjuntos de regras + fila de merge) antes da entrada do primeiro PR.
5. Os workflows inativos são ativados pela existência das branches: `forward-port.yml` (push para
   `stable/v3`), `validate-stable-pr.yml` (PRs para `stable/v3`) e `nightly-v4-build.yml`
   (compila `develop`). Antes da entrada em produção, defina o segredo de repositório `secrets.FORWARD_PORT_TOKEN` (para que a CI seja executada em
   PRs de forward-port); a publicação nightly permanece desativada até que o proprietário defina a variável de repositório
   `vars.NIGHTLY_PUBLISH` como `true` e o npm Trusted Publishing aceite
   `nightly-v4-build.yml`. A resolução de canais é feita por `scripts/release/dist-tag.mjs`, o mesmo
   resolvedor usado por `npm-publish.yml`.
6. Verifique os canais: `npm view omniroute dist-tags --json` mostra `latest` = 3.9.0 e nenhum
   `next` / `nightly` até a publicação da v4.
7. Reversão, se necessário: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   e `npm dist-tag add omniroute@3.8.59 latest`.

---

## Reversão

Se a versão tiver um problema crítico:

1. `gh release edit vX.Y.Z --prerelease` (marca como não sendo a mais recente)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (somente se ainda não tiver sido adotada pelos usuários)
3. Ou: hotfix em `release/vX.Y.0` → versão de correção `vX.Y.(Z+1)`
4. Comunique imediatamente no GitHub Discussions e no Discord

## Regras Rígidas

- Nunca faça commits diretamente em `main`
- Nunca use `git push --force` nas branches `main` ou `release/*`
- Nunca ignore os hooks do Husky (`--no-verify`)
- Nunca faça commit de segredos, credenciais ou arquivos `.env`
- A cobertura deve permanecer ≥60/60/60/60 (instruções/linhas/funções/branches)
- Sempre inclua ou atualize testes ao alterar código de produção em `src/`, `open-sse/`, `electron/` ou `bin/`

## Verificação Automatizada de Sincronização

Execute localmente a proteção de sincronização da documentação antes de abrir um PR:

```bash
npm run check:docs-sync
```

A CI também executa essa verificação em `.github/workflows/ci.yml` (job de lint).
