# Devin Claude Bridge (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../DEVIN_CLAUDE_BRIDGE.md) · 🇪🇹 [am](../../am/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇦 [ar](../../ar/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇿 [az](../../az/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇬 [bg](../../bg/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇩 [bn](../../bn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇦 [bs](../../bs/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇿 [cs](../../cs/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇰 [da](../../da/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇪 [de](../../de/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇷 [el](../../el/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇸 [es](../../es/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇪 [et](../../et/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇷 [fa](../../fa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇮 [fi](../../fi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇷 [fr](../../fr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇪 [ga](../../ga/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [gu](../../gu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ha](../../ha/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇱 [he](../../he/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [hi](../../hi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇷 [hr](../../hr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇺 [hu](../../hu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇲 [hy](../../hy/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇩 [id](../../id/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ig](../../ig/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇹 [it](../../it/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇯🇵 [ja](../../ja/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇪 [ka](../../ka/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇭 [km](../../km/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [kn](../../kn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇷 [ko](../../ko/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇹 [lt](../../lt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇻 [lv](../../lv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ml](../../ml/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [mr](../../mr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇾 [ms](../../ms/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇹 [mt](../../mt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇲 [my](../../my/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇵 [ne](../../ne/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇱 [nl](../../nl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇴 [no](../../no/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [or](../../or/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [pa](../../pa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇭 [phi](../../phi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇱 [pl](../../pl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇹 [pt](../../pt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇴 [ro](../../ro/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇺 [ru](../../ru/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇰 [si](../../si/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇰 [sk](../../sk/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇮 [sl](../../sl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇸 [sr](../../sr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇪 [sv](../../sv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇪 [sw](../../sw/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ta](../../ta/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [te](../../te/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇭 [th](../../th/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇷 [tr](../../tr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇰 [ur](../../ur/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇿 [uz](../../uz/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇻🇳 [vi](../../vi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [yo](../../yo/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVIN_CLAUDE_BRIDGE.md)

---

`devin-cli-agentic` permite que o runtime real do Claude Code use o endpoint local de
Messages da Anthropic do OmniRoute, enquanto a CLI oficial do Devin fornece respostas do
modelo por ACP stdio. Ele não modifica os provedores existentes Anthropic, Claude OAuth,
Claude Web ou `devin-cli`.

Para chamadas de ferramentas controladas pelo cliente, encaminhe por `devin-cli-agentic`
(alias `dva`), o provedor compatível com ferramentas no formato Claude. O executor ACP
legado `devin-cli` (`dv`) é somente texto: ele executa o summarizer sem ferramentas do Devin
e não pode retornar chamadas de ferramentas. Seus metadados de modelo são marcados de forma
correspondente, para que o roteamento combinado que exige ferramentas o evite.

> **Status atual: Claude Code fixado em `2.1.258`; as últimas validações offline e em ambiente
> real foram registradas na versão `2.1.220`.** A versão fixada `2.1.220` concluiu três
> cenários isolados por meio da Devin CLI `3000.2.17` e do modelo `swe-1-7-lightning`; essa
> execução final em ambiente real comprovou turnos de `Read`, `Edit` e `Bash` controlados pelo
> cliente, resultados bem-sucedidos de `npm test`, descoberta de comandos e skills do projeto,
> roteamento exclusivo pelo Devin e nenhuma saída para o Claude. A versão fixada foi então
> elevada para `2.1.258` (a geração da CLI que a identidade Claude do OmniRoute personifica e
> a primeira versão que inclui nativamente o nível Fable 5.1). Na nova versão fixada, a camada
> de instalação e `claude --version` foram verificadas na imagem base fixada, e a suíte
> unitária da bridge, `compose config` e a prova estática de isolamento são aprovadas — mas o
> cenário simulado offline e a suíte de três cenários em ambiente real ainda não foram
> executados novamente. Execute-os novamente (consulte "Atualizando ferramentas fixadas")
> antes de depender da bridge com esta versão fixada.

## Arquitetura

```text
Claude Code 2.1.258 (contêiner Linux isolado não root)
  -> http://omniroute:20128/v1/messages
  -> devin-cli-agentic (formato Claude, provedor sem autenticação)
  -> devin acp --agent-type summarizer (ACP stdio oficial, sem ferramentas do Devin)
  -> conta do Devin no volume dedicado devin-auth
```

O agente ACP padrão da CLI oficial pode executar suas próprias ferramentas, portanto esta
bridge não o utiliza. Ela inicia o agente ACP `summarizer` fixo, cujo modo oficial da CLI não
possui ferramentas, e estrutura a solicitação serializada da Anthropic como um rastreamento
de execução. Quando outra ação controlada pelo Claude é necessária, a resposta deve conter
exatamente um envelope de ferramenta do cliente. Qualquer `tool_call` ou `tool_call_update`
do ACP é rejeitada antes que uma resposta possa ser informada como bem-sucedida.

O serializador em `open-sse/executors/devin-agentic/serializer.ts` preserva `system`,
`text`, `tool_use`, `tool_result`, `thinking`, `redacted_thinking`, `tool_choice` e as
ferramentas fornecidas pelo Claude Code. Imagens e blocos desconhecidos falham
explicitamente. Resultados grandes de ferramentas usam um marcador de truncamento visível.

O parser aceita um envelope independente `<tool>{...}</tool>` por turno do modelo. Ele
verifica o nome em relação à lista de ferramentas da solicitação, valida os argumentos de
acordo com o JSON Schema dessa ferramenta, rejeita narrativas misturadas com ações e permite
uma tentativa limitada de correção. O Claude Code então executa localmente o `tool_use`
resultante da Anthropic e envia o `tool_result` de volta pelo OmniRoute.

## Roteamento automático

O provedor é elegível nos pools de candidatos `auto/*` do OmniRoute quando não está
bloqueado. A elegibilidade do candidato não garante sua seleção: a estratégia de roteamento
da combinação (por exemplo, o último provedor reconhecidamente funcional) pode preferir
outro provedor. Use `dva/<model>` ou uma combinação que priorize o Devin quando precisar que
todas as solicitações passem pelo Devin.

## Isolamento e modelo de ameaças

A instalação, a conta e a configuração do Claude no host estão fora do escopo e são tratadas como
proibidas. Os serviços do Compose:

- são executados como UID/GID `10001:10001`, com um sistema de arquivos raiz somente leitura, capacidades removidas e
  `no-new-privileges`;
- usam um `/home/bridge` privado, um volume dedicado de configuração do Claude, dados isolados do OmniRoute
  e um volume `devin-auth` separado;
- montam apenas espaços de trabalho/evidências descartáveis em `.sandbox`;
- não montam o diretório pessoal do host, o Keychain, credenciais SSH, credenciais de nuvem nem o socket do Docker;
- constroem ambientes explícitos e removem variáveis de API/OAuth/roteamento da Anthropic;
- direcionam a inferência do Claude Code apenas para `http://omniroute:20128` com uma chave exclusivamente local.

O perfil offline usa uma rede interna. No perfil live, o OmniRoute acessa os
endpoints oficiais do Devin apenas por meio do `network-guard`; destinos não relacionados são bloqueados.
O Claude Code possui uma proteção de saída separada que bloqueia tudo e pode acessar apenas o serviço
OmniRoute local por meio de `NO_PROXY`. Os arquivos de auditoria das proteções são montados apenas pelo respectivo
processo de proteção. Os scripts verificam a propriedade, o modo e a contagem de links dos arquivos, além de cada decisão, antes de exportar
evidências sem tokens.

Execute a prova de isolamento de forma independente:

```bash
./scripts/devin-bridge/verify-anthropic-isolation
```

Ela valida a topologia, as montagens nomeadas, as configurações de usuário não root/somente leitura, o roteamento local explícito,
a ausência de variáveis de ambiente sensíveis, a ausência do socket do Docker, o acesso bloqueado a
`api.anthropic.com` e `claude.ai`, a seleção de provedor exclusiva do Devin e a falha explícita quando
o backend ACP não está disponível.

## Configuração inicial e uso normal

Compile a imagem fixada:

```bash
./scripts/devin-bridge/build
```

Autentique apenas o volume isolado do Devin:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/login-devin
```

O comando de login usa o fluxo oficial de token manual destinado a ambientes remotos/em contêineres.
O valor é inserido diretamente no prompt da CLI; ele não é passado como argumento de
processo, gravado no Git nem copiado do host.

Inicie o runtime isolado do Claude Code:

```bash
./scripts/devin-bridge/launch
```

`launch` verifica novamente o isolamento, a autenticação do Devin e a descoberta de modelos antes de iniciar o
Claude Code em contêiner. Ele nunca executa o executável do Claude do host. Os aliases de modelos podem ser
definidos em `.env.devin-bridge`; cada valor configurado deve manter o
prefixo `devin-cli-agentic/`.

## Comandos de validação

O caminho offline reproduzível não exige uma conta do Devin e não possui acesso à Internet durante a execução:

```bash
./scripts/devin-bridge/test-unit
./scripts/devin-bridge/test-contract
./scripts/devin-bridge/test-e2e-mock
./scripts/devin-bridge/verify-anthropic-isolation
```

O caminho live autenticado e habilitado explicitamente é:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/test-live-devin
```

O executor live aguarda entre os cenários para evitar a abertura de sessões ACP em sequência rápida e
valida eventos estruturados do fluxo do Claude em vez de confiar em alegações textuais. Seus três
cenários comprovam:

1. leituras diretas do projeto e análise de defeitos;
2. uma operação `Edit` real, um `Bash` `npm test` controlado pelo cliente e um resultado terminal;
3. descoberta de `/bridge-check` e `bridge-proof`, leituras do projeto, outro
   `npm test` bem-sucedido controlado pelo cliente e conclusão sem trabalho pendente.

A verificação final também examina a auditoria de rede do Devin e exige que a auditoria de saída do Claude
permaneça vazia.

## Atualização de ferramentas fixadas

A imagem fixa as versões do Node, Claude Code e Devin CLI em
`docker/devin-bridge/Dockerfile`. Para atualizar:

1. altere as versões explícitas;
2. substitua ambos os checksums do arquivo do Devin específicos de arquitetura pelos valores do artefato
   oficial;
3. reconstrua e execute todos os comandos de validação offline;
4. confirme as versões dentro da imagem;
5. execute novamente a suíte autenticada em tempo real com três cenários.

Não instale nenhuma das CLIs globalmente no host nem substitua a verificação de checksum por um
download não verificado.

## Diagnóstico e limpeza

- `docker compose -f docker/devin-bridge/compose.yml --profile offline logs omniroute`
  mostra o roteamento local e erros sanitizados do executor.
- `.sandbox/evidence/mock-acp.jsonl` registra ações determinísticas do ACP simulado.
- `.sandbox/evidence/claude-stream.jsonl` registra a execução offline real do Claude Code.
- `.sandbox/evidence/live-*.jsonl` registra os três fluxos em tempo real validados.
- `.sandbox/evidence/egress.jsonl` e `.sandbox/evidence/claude-egress.jsonl` são cópias validadas
  e sem tokens das auditorias de saída.

Interrompa os contêineres e as redes pertencentes ao ambiente, preservando os volumes de login/configuração:

```bash
./scripts/devin-bridge/clean
```

Remova todo o ambiente pertencente à ponte, incluindo os volumes nomeados:

```bash
./scripts/devin-bridge/clean --all
```

## Limitações

- A ponte depende da função fixa `summarizer`, sem ferramentas, porque o Devin CLI `3000.2.17`
  não disponibiliza um agente ACP neutro sem ferramentas. O adaptador compensa respostas intermediárias
  em formato de resumo, mas uma única tentativa limitada de correção ainda pode falhar explicitamente.
- Chamadas ACP em tempo real podem retornar respostas transitórias `502`/`504`. O harness espaça os cenários;
  falhas persistentes permanecem em modo fechado e nunca selecionam outro provedor.
- O contexto ACP é reconstruído a partir de cada solicitação Anthropic; não há afinidade de
  processo/sessão.
- Há suporte para uma chamada de ferramenta por resposta do modelo; chamadas paralelas são rejeitadas.
- Imagens não são explicitamente compatíveis. Visão, saída de raciocínio, controles de esforço e uma janela
  de contexto de 1M não são anunciados.
- O SSE usa eventos válidos do ciclo de vida Anthropic, mas é emitido após a coleta do turno ACP
  limitado; os fragmentos ACP não são encaminhados incrementalmente.
