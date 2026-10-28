# AgentBridge (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENTBRIDGE.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENTBRIDGE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENTBRIDGE.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENTBRIDGE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/AGENTBRIDGE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENTBRIDGE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/AGENTBRIDGE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/AGENTBRIDGE.md) · 🇩🇰 [da](../../../da/docs/frameworks/AGENTBRIDGE.md) · 🇩🇪 [de](../../../de/docs/frameworks/AGENTBRIDGE.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENTBRIDGE.md) · 🇪🇸 [es](../../../es/docs/frameworks/AGENTBRIDGE.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENTBRIDGE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENTBRIDGE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/AGENTBRIDGE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/AGENTBRIDGE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENTBRIDGE.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENTBRIDGE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/AGENTBRIDGE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/AGENTBRIDGE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENTBRIDGE.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENTBRIDGE.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENTBRIDGE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENTBRIDGE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENTBRIDGE.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENTBRIDGE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENTBRIDGE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/AGENTBRIDGE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENTBRIDGE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENTBRIDGE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENTBRIDGE.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENTBRIDGE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENTBRIDGE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/AGENTBRIDGE.md) · 🇳🇴 [no](../../../no/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENTBRIDGE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/AGENTBRIDGE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/AGENTBRIDGE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/AGENTBRIDGE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/AGENTBRIDGE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENTBRIDGE.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENTBRIDGE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/AGENTBRIDGE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENTBRIDGE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENTBRIDGE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/AGENTBRIDGE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENTBRIDGE.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENTBRIDGE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENTBRIDGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENTBRIDGE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENTBRIDGE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENTBRIDGE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENTBRIDGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/AGENTBRIDGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/AGENTBRIDGE.md)

---

AgentBridge é o proxy MITM (Man-in-the-Middle) do OmniRoute que intercepta o tráfego HTTPS de agentes de IA de IDEs e o redireciona pelo mecanismo de roteamento unificado do OmniRoute. Ele oferece suporte a **10 agentes de IDE** — Antigravity, Kiro, GitHub Copilot, GHE Copilot, OpenAI Codex, Cursor, Zed, Claude Code, Open Code e Trae (em investigação) — tornando o OmniRoute o proxy MITM com a mais ampla cobertura para assistentes de programação com IA do mercado.

**Localização no painel:** `/dashboard/tools/agent-bridge`
**Grupo na barra lateral:** Ferramentas (após Agentes na Nuvem)
**Veja também:** [`TRAFFIC_INSPECTOR.md`](./TRAFFIC_INSPECTOR.md) — monitore todo o tráfego interceptado em tempo real; `docs/security/MITM-TPROXY-DECRYPT.md` (git; não compilado em `/docs`) — o modo de captura de descriptografia transparente TPROXY do Linux, controlado pela rota `/api/tools/agent-bridge/tproxy`.

---

## §1 Visão geral

### O que é AgentBridge?

Quando um agente IDE (por exemplo, GitHub Copilot, Cursor, Claude Code) faz uma chamada API, ele se conecta diretamente ao provedor AI upstream (OpenAI, Anthropic, etc.). AgentBridge intercepta essa conexão de forma transparente no nível TLS — sem exigir nenhuma alteração na configuração do agente — e reescreve a solicitação por meio OmniRoute.

Isso significa que você pode:

- **Redirecione qualquer agente para qualquer provedor** : Copilot conversando com OpenAI? Redirecione-o para Anthropic Claude, Gemini ou qualquer um dos 377 provedores do OmniRoute.
- **Aplicar mapeamentos de modelo** : `gemini-3-flash` → `claude-sonnet-4.7` transparentemente no nível do manipulador.
- **Observe todo o tráfego do agente** : toda solicitação interceptada é publicada no [Traffic Inspector](./TRAFFIC_INSPECTOR.md).
- **Aplicar resiliência OmniRoute** : roteamento combinado, disjuntores, substitutos e rastreamento de custos também funcionam para o tráfego do agente IDE.

### Posicionamento versus mercado

| Recurso                 | 9 roteador | anti-API | interceptador lm | **OmniRoute AgentBridge** |
| ----------------------- | :--------: | :------: | :--------------: | :-----------------------: |
| Antigravity             |     ✓      |    ✓     |        —         |             ✓             |
| GitHub Copilot          |     ✓      |    ✓     |        —         |             ✓             |
| Kiro (AWS)              |     ✓      |    ✓     |        —         |             ✓             |
| OpenAI Codex            |     —      |    ✓     |        —         |             ✓             |
| Cursor IDE              |     ✓      |    ✓     |        —         |             ✓             |
| Indústrias Zed          |     —      |    ✓     |        —         |             ✓             |
| Código Claude           |     —      |    —     |        ✓         |             ✓             |
| Código aberto           |     —      |    —     |        ✓         |             ✓             |
| Trae                    |     —      |    —     |        —         |      🔍 Investigando      |
| Painel UI               |     ✓      |    ✗     |        ✗         |             ✓             |
| Inspetor de Trânsito    |     ✗      |    ✗     |        ✓         |             ✓             |
| roteamento OmniRoute    |     ✗      |    ✗     |        ✗         |             ✓             |
| Mapeamento de modelo UI |     ✗      |    ✗     |        ✗         |             ✓             |
| Lista de ignorados      |     ✗      |    ✗     |        ✓         |             ✓             |
| Certificado CA upstream |     ✗      |    ✗     |        ✓         |             ✓             |

---

## §2 Arquitetura

### 2.1 Visão geral dos componentes

```
Agente da IDE (VS Code / Cursor / etc.)
    │  HTTPS (porta 443)
    ▼
/etc/hosts — 127.0.0.1 api.githubcopilot.com   ← redirecionamento de DNS
    │
    ▼
src/mitm/server.cjs  (porta 443, processo filho CJS)
    │  resolve o destino pelo SNI do cabeçalho Host
    │  gera um certificado TLS por SNI assinado pela CA do AgentBridge
    ├── Corresponde à lista de bypass? → passagem direta TCP (sem descriptografia)
    ├── Corresponde a um destino? → fetch → roteador OmniRoute (porta 20128)
    │       └── handler.intercept() — TypeScript
    │               ├── maskSecrets() no corpo/cabeçalhos da requisição
    │               ├── TrafficBuffer.push() — publica no Traffic Inspector
    │               └── fetchRouter() → /v1/chat/completions
    └── Sem correspondência? → passagem direta TCP (sem descriptografia)
```

### 2.2 Servidor MITM (`src/mitm/server.cjs`)

O servidor MITM principal é executado como um processo filho CJS do Node.js (para evitar reescrever a base de código CJS existente). Ele:

- Escuta na porta 443 (requer privilégio ou `authbind`/`setcap`)
- Recebe túneis CONNECT do sistema operacional (por meio do redirecionamento de DNS em `/etc/hosts`)
- Gera certificados TLS por SNI assinados pela CA do AgentBridge (`DATA_DIR/mitm/ca.crt`)
- Resolve o agente de destino pelo cabeçalho Host por meio do registro `targets/index.ts`
- Encaminha para a camada de handlers TypeScript via HTTP em `http://127.0.0.1:20128`

`TARGET_HOSTS` é carregado de `DATA_DIR/mitm/targets.json` (gravado por `targets/index.ts` durante a inicialização), permitindo atualizações dinâmicas sem reiniciar o servidor CJS.

> **Modelo de CA raiz (#6684).** A descrição acima, de certificados por SNI assinados por uma CA,
> corresponde ao modelo persistente de CA raiz adicionado em #6684 (`src/mitm/cert/rootCa.ts` +
> `src/mitm/_internal/rootCaShim.cjs`, reutilizando a criptografia de CA/certificado subordinado já
> comprovada para TPROXY em `src/mitm/tproxy/dynamicCert.ts`) — ele substitui o
> certificado subordinado autoassinado estático anterior (`src/mitm/cert/generate.ts`, ainda
> limitado apenas aos hosts do antigravity) indicado pela presença de um par simples
> `server.crt`/`server.key` no disco. **Comportamento da migração**: uma instalação nova (sem
> `server.crt` anterior) recebe automaticamente o modelo de CA raiz; uma instalação que já
> confiava no certificado subordinado estático antigo continua usando-o até que o operador defina
> `MITM_ROOT_CA_ENABLED=true` e reinicie a ponte (`src/mitm/cert/migration.ts`
> é a função de decisão pura — uma CA MITM confiável capaz de assinar um certificado subordinado para
> **qualquer** host é substancialmente mais poderosa do que o certificado subordinado antigo com SANs fixos, portanto a
> mudança nunca ocorre silenciosamente em uma instalação que já confia nele). O certificado da CA é instalado
> no mesmo local `omniroute-mitm.crt` do repositório de confiança usado pelo certificado subordinado antigo
> (`cert/install.ts::installCaCert`) — não é necessária nenhuma limpeza de confiança dupla.

### 2.3 Base dos handlers (`src/mitm/handlers/base.ts`)

Todos os handlers de agentes estendem `MitmHandlerBase`:

```ts
export abstract class MitmHandlerBase {
  abstract readonly agentId: AgentId;

  abstract intercept(
    req: IncomingMessage,
    res: ServerResponse,
    body: Buffer,
    mappedModel: string
  ): Promise<void>;

  // Auxiliares protegidos: fetchRouter, pipeSSE, hookBufferStart, hookBufferUpdate
}
```

Cada handler chama `hookBufferStart()` antes de fazer o proxy e `hookBufferUpdate()` após a conclusão. Essas chamadas inserem entradas `InterceptedRequest` em `globalTrafficBuffer` (consulte [Traffic Inspector](./TRAFFIC_INSPECTOR.md) §4).

### 2.4 Registro de destinos (`src/mitm/targets/`)

Cada agente possui um arquivo de destino declarativo:

```ts
// src/mitm/targets/copilot.ts
export const COPILOT_TARGET: MitmTarget = {
  id: "copilot",
  name: "GitHub Copilot",
  hosts: ["api.githubcopilot.com", "copilot-proxy.githubusercontent.com"],
  port: 443,
  endpointPatterns: ["/chat/completions", "/v1/chat/completions"],
  defaultModels: [{ id: "gpt-4o", name: "GPT-4o", alias: "gpt-4o" }],
  handler: () => import("../handlers/copilot"),
  riskNoticeKey: "providers.riskNotice.oauth",
};
```

O registro (`targets/index.ts`) exporta `ALL_TARGETS` e gera `DATA_DIR/mitm/targets.json` durante a inicialização.

### 2.5 Passagem direta e lista de bypass (`src/mitm/passthrough.ts`)

**Lista de bypass** (verificada primeiro, com precedência sobre a correspondência de destino):

- Padrões padrão: hosts bancários, `.gov.`, provedores OAuth/SSO (Okta, Auth0) etc.
- Padrões do usuário: armazenados na tabela `agent_bridge_bypass` do banco de dados
- Hosts ignorados recebem um túnel TCP transparente — o TLS **nunca é descriptografado**

**Passagem direta padrão** (sem correspondência de destino e fora da lista de bypass):

- Também recebe um túnel TCP — as conexões nunca são interrompidas
- Evita que o AgentBridge prejudique o tráfego HTTPS geral do sistema

Precedência de roteamento:

```
lista de bypass → correspondência de destino → passagem direta
```

### 2.6 Certificado de CA upstream (`src/mitm/upstreamTrust.ts`)

Para ambientes de rede corporativa com uma CA personalizada:

```bash
AGENTBRIDGE_UPSTREAM_CA_CERT=/path/to/corporate-ca.pem
```

Quando definido, configura o dispatcher global do `undici` com o certificado de CA adicional, permitindo que o AgentBridge alcance provedores upstream por meio de proxies corporativos de terminação TLS.

### 2.7 Mascaramento de segredos (`src/mitm/maskSecrets.ts`)

O scanner independente, desenvolvido em ambiente isolado, é aplicado aos corpos das requisições e aos cabeçalhos de credenciais
**antes** que eles entrem no buffer do Traffic Inspector ou em qualquer log. Ele realiza uma única passagem linear:

- Tokens prefixados com `sk-` / `ak-` / `pk-` (no estilo OpenAI/Anthropic)
- Credenciais RFC 6750 `Authorization: Bearer <token>`, com precedência para o token completo
- Tokens opacos longos genéricos (≥40 caracteres), incluindo formatos com pontos e preenchimento

`sanitizeHeaders()` converte os nomes retidos para letras minúsculas, une valores de arrays de forma determinística, remove a
lista de bloqueio compartilhada de cabeçalhos hop-by-hop/enquadramento (incluindo autenticação de proxy), oculta completamente `cookie` e
`set-cookie` e delega os valores das credenciais ao scanner.

---

## §3 Configuração

### 3.1 Iniciar/parar o servidor MITM

Use o cartão do Servidor AgentBridge em `/dashboard/tools/agent-bridge`:

| Ação                   | Descrição                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Iniciar servidor       | Inicia `src/mitm/server.cjs` na porta 443. No modelo de CA raiz, cria `ca.crt` na primeira inicialização e adiciona o certificado ativo como confiável quando uma senha sudo está disponível                                                                                                                                                                                                                                                                           |
| Parar servidor         | Encerra normalmente o processo filho                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Reiniciar servidor     | Para + inicia (aplica alterações de destino e um certificado regenerado)                                                                                                                                                                                                                                                                                                                                                                                               |
| Confiar no certificado | Instala o certificado ativo no repositório de confiança do SO: `DATA_DIR/mitm/ca.crt` no modelo de CA raiz, `DATA_DIR/mitm/server.crt` em uma instalação legada com certificado de entidade final                                                                                                                                                                                                                                                                      |
| Baixar certificado     | Baixa o certificado ativo para instalação manual (`omniroute-mitm-ca.crt` = `ca.crt`, ou `omniroute-mitm.crt` = `server.crt` em uma instalação legada com certificado de entidade final)                                                                                                                                                                                                                                                                               |
| Regenerar certificado  | Nunca altera o modelo de certificado. Instalação legada com certificado de entidade final: gera novos `server.crt`/`server.key` (reinicie o servidor para disponibilizá-los). Modelo de CA raiz: rotaciona `ca.crt`/`ca.key`; a operação é recusada enquanto o servidor está em execução. Uma CA antiga confiável primeiro tem sua confiança removida (requer a senha sudo), ou a rotação é cancelada. Depois disso, os clientes precisam confiar novamente na nova CA |

### 3.2 Confiar no certificado

O certificado da CA do AgentBridge deve ser considerado confiável pelo SO antes que os IDEs aceitem a conexão MITM.

**Linux (NSS — Chrome/Firefox):**

```bash
certutil -A -d sql:$HOME/.pki/nssdb -n "OmniRoute AgentBridge" -t CT,, -i ~/.omniroute/mitm/ca.crt
```

**macOS (Chaves):**

```bash
sudo security add-trusted-cert -d -r trustRoot \
  -k /Library/Keychains/System.keychain ~/.omniroute/mitm/ca.crt
```

**Windows (certmgr):**

```powershell
certutil -addstore -f Root $env:USERPROFILE\.omniroute\mitm\ca.crt
```

Como alternativa, use o botão "Confiar no certificado" no painel (executa o comando apropriado para o seu SO, solicitando a senha sudo, se necessário).

#### IDEs baseados em Electron ignoram o repositório de confiança do SO (`NODE_EXTRA_CA_CERTS`)

Alguns IDEs — principalmente o **Antigravity IDE** e outros aplicativos derivados do Electron / VS Code — incluem
seu próprio runtime do Node.js, que **não consulta o repositório de confiança do SO** para conexões
`fetch`/HTTPS de saída. Confiar na CA no nível do SO/NSS é suficiente para o **backend** nativo
do IDE (por exemplo, um servidor de linguagem Go, que usa o conjunto de CAs do SO), mas o **frontend do Electron**
ainda apresentará falha de TLS — isso faz com que o aplicativo pareça estar _desconectado_ ou exiba um _"erro de conexão"_,
mesmo que o log do MITM mostre as chamadas de inicialização do backend retornando `200`. Duas etapas são
necessárias, e ambas são importantes:

1. Aponte explicitamente o runtime para a CA:
   ```bash
   export NODE_EXTRA_CA_CERTS=/path/to/omniroute-agentbridge-ca.crt
   ```
2. **Inicie o IDE a partir desse shell.** Iniciá-lo pelo ícone da área de trabalho / Dock / menu Iniciar
   **não** herda as exportações do shell, e `~/.config/environment.d/*.conf` só é aplicado após
   um novo login gráfico. Primeiro, encerre completamente o IDE — o bloqueio de instância única do Electron faz com que uma segunda
   inicialização apenas coloque o processo existente em foco, ignorando o novo ambiente.

A etapa acima de confiança no SO + NSS continua sendo necessária (a pilha de rede do Chromium usada por alguns fluxos
de autenticação lê o repositório NSS por usuário e possui seus próprios pins estáticos para `*.googleapis.com`, que são
substituídos por uma CA confiável localmente). `NODE_EXTRA_CA_CERTS` também abrange o caminho de `fetch` do Node.

### 3.3 Roteamento de DNS

Para cada agente que você deseja interceptar, os hosts da API dele devem ser resolvidos como `127.0.0.1`. O AgentBridge gerencia automaticamente as entradas de `/etc/hosts` quando você ativa ou desativa o DNS de um agente no Assistente de Configuração.

Exemplo de entradas em `/etc/hosts` para o GitHub Copilot:

```
127.0.0.1 api.githubcopilot.com
127.0.0.1 copilot-proxy.githubusercontent.com
```

### 3.4 Mapeamento de modelos

Use a Tabela de Mapeamento de Modelos em cada cartão de agente para definir os mapeamentos de origem → destino:

| Modelo de origem (nativo do agente) | Modelo de destino (OmniRoute) |
| ----------------------------------- | ----------------------------- |
| `gpt-4o`                            | `claude-sonnet-4.7`           |
| `*` (curinga)                       | `claude-haiku-4.7`            |

O curinga `*` mapeia qualquer modelo não reconhecido para o destino especificado. O mapeamento é persistido na tabela `agent_bridge_mappings`.

> **Dica — descubra os IDs reais dos modelos do agente.** Uma IDE pode enviar nomes de modelos diferentes
> dos rótulos exibidos na interface e que mudam entre versões principais. Por exemplo, o **Antigravity 2** envia
> `gemini-3.1-pro-low`, `gemini-pro-agent` e `gemini-3.1-flash-lite` pela rede — e não o
> `gemini-2.5-pro` mostrado na documentação mais antiga. Envie uma mensagem de chat sem nenhum mapeamento correspondente configurado: o MITM
> registra o `model:` exato recebido e encaminha a solicitação. Mapeie esse valor literal e, então,
> a próxima solicitação será interceptada e roteada para o destino escolhido.

### 3.5 Aviso de risco

O AgentBridge intercepta credenciais (tokens OAuth, chaves de API) usadas pela IDE para autenticação com provedores upstream. Elas são **mascaradas antes do registro em log** (consulte a seção 2.7), mas ficam visíveis para a camada MITM do OmniRoute. A primeira ativação de cada agente exibe um modal de aviso de risco que pode ser dispensado.

### 3.6 Manutenção e diagnóstico

O painel disponibiliza um cartão de **Manutenção e diagnóstico** (`AgentBridgeMaintenanceCard`, em `src/app/(dashboard)/dashboard/tools/agent-bridge/components/`) que apresenta rotas operacionais do MITM que antes não tinham interface. Seu subtítulo: _"Execute o autoteste do pipeline de captura, desfaça estados residuais do sistema e transfira sua configuração entre máquinas."_ Os helpers de cliente do cartão ficam em `src/lib/inspector/agentBridgeMaintenanceApi.ts`.

| Botão                | Rota                                   | O que faz                                                                                                                                                                                                       |
| -------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Diagnosticar**     | `GET /api/tools/agent-bridge/diagnose` | Executa o autoteste do pipeline de captura e exibe um relatório por verificação (✓/✗ + sugestão de correção).                                                                                                   |
| **Reparar**          | `POST /api/tools/agent-bridge/repair`  | Desfaz estados órfãos do sistema deixados pelo MITM (entradas de spoofing de DNS, CA raiz, proxy do sistema) após uma falha ou SIGKILL. É idempotente — informa "Nada para reparar" quando o estado está limpo. |
| **Remover CA**       | `DELETE /api/tools/agent-bridge/cert`  | Remove a confiança e exclui a CA raiz do MITM do repositório de confiança do SO (explícito e idempotente). Exibido somente quando a CA está confiável; exige uma confirmação em linha "Remover CA?".            |
| **Exportar config.** | `GET /api/tools/agent-bridge/config`   | Baixa o JSON de configuração portátil (consulte a seção 3.7).                                                                                                                                                   |
| **Importar config.** | `POST /api/tools/agent-bridge/config`  | Envia um JSON de configuração exportado anteriormente (consulte a seção 3.7).                                                                                                                                   |

Cada cartão de agente também tem seu próprio botão **Restaurar padrão** (`POST
/api/tools/agent-bridge/agents/{id}/reset`) — uma ação de desfazer por agente e com um único clique, que remove o spoofing somente dos hosts
desse agente, limpa seus mapeamentos de modelo salvos e redefine seu estado de `dns_enabled`/`setup_completed`,
para que a IDE volte a se comunicar com o upstream real após ser totalmente reiniciada. Essa ação **não** afeta o
servidor MITM compartilhado nem a CA raiz (outros agentes ainda podem depender deles) — eles permanecem acessíveis
pelo Cartão do Servidor e pela ação **Remover CA** acima. No Windows, ela também executa
`ipconfig /flushdns` em modo de melhor esforço, pois o Cliente DNS do Windows armazena em cache entradas do arquivo hosts e, caso contrário, não descarta
uma entrada de spoofing recém-removida.

**Verificações de diagnóstico** (`summarizeDiagnostics()` em `src/mitm/inspector/diagnostics.ts`). A rota executa a sondagem com efeitos colaterais para cada verificação e fornece os valores booleanos ao sumarizador puro; um único veredito `healthy`, acompanhado de uma sugestão para cada falha, é retornado:

| Nome da verificação | O que verifica                                                | Sugestão em caso de falha                                                                                                                                       |
| ------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `server-running`    | O processo do servidor MITM está ativo                        | "O servidor MITM não está em execução. Inicie-o na guia AgentBridge."                                                                                           |
| `server-reachable`  | O servidor MITM aceita conexões em sua porta (sondagem TCP)   | "O servidor MITM não está aceitando conexões em sua porta. Verifique se a porta está livre e se você tem privilégios para vinculá-la."                          |
| `cert-exists`       | O certificado MITM foi gerado no disco                        | "Nenhum certificado MITM foi gerado ainda. Gere um na guia AgentBridge."                                                                                        |
| `cert-trusted`      | A CA raiz do MITM está no repositório de confiança do SO      | "A CA raiz do MITM não é confiável para o repositório do SO, portanto a interceptação TLS falhará. Confie no certificado por meio da guia AgentBridge."         |
| `dns-configured`    | Os nomes de host de destino estão adulterados em `/etc/hosts` | "Os nomes de host de destino não estão adulterados em /etc/hosts, portanto o tráfego nunca chega ao proxy. Habilite o DNS para os agentes que deseja capturar." |

**Banner de estado órfão:** quando a página detecta um estado deixado por uma falha (spoofing de DNS / CA / proxy do sistema), o cartão exibe um banner âmbar — _"Uma sessão anterior deixou um estado residual no sistema (spoofing de DNS, CA ou proxy do sistema). Execute Reparar para limpá-lo."_ — e destaca o botão **Reparar**. `Repair` é o equivalente, na camada da aplicação, à flag `--cleanup` do ProxyBridge (ela delega a `repairMitm()` em `src/mitm/manager.ts`).

> A CA raiz de MITM permanece instalada após ciclos de parada/inicialização para evitar solicitações repetidas de sudo
> (o mesmo comportamento do mitmproxy/Charles), portanto, removê-la é uma ação explícita
> de **Remover CA**, em vez de algo que acontece automaticamente ao parar.

### 3.7 Importação/exportação de configuração portátil

O AgentBridge pode serializar o estado **ajustável pelo operador** em um blob JSON versionado, permitindo que uma configuração seja replicada entre máquinas. O serializador é `src/lib/inspector/configPortability.ts` (`exportConfig()` / `importConfig()`), validado por `AgentBridgeConfigSchema`.

A exportação inclui exatamente três partes (os padrões integrados intencionalmente **NÃO** são exportados, para que a importação nunca os duplique nem entre em conflito com eles):

| Campo            | Origem                                                               | Observações                                                                   |
| ---------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `bypassPatterns` | padrões de bypass definidos pelo usuário (`agent_bridge_bypass`)     | os padrões predefinidos de bancos/governo/Okta são excluídos                  |
| `customHosts`    | hosts personalizados do Traffic Inspector (`inspector_custom_hosts`) | cada um: `{ host, kind: "llm"\|"app"\|"custom", label? }`                     |
| `agentMappings`  | mapeamentos de modelos por agente (`agent_bridge_mappings`)          | `{ [agentId]: [{ source, target }] }` para cada agente que possui mapeamentos |

```jsonc
// GET /api/tools/agent-bridge/config
{
  "version": 1,
  "bypassPatterns": ["*.internal.example.com"],
  "customHosts": [{ "host": "api.example.com", "kind": "llm", "label": null }],
  "agentMappings": {
    "copilot": [{ "source": "gpt-4o", "target": "claude-sonnet-4.7" }],
  },
}
```

**Comportamento da importação** (`POST /api/tools/agent-bridge/config`): os padrões de bypass e os mapeamentos por agente são **substituídos integralmente**; os hosts personalizados são adicionados de forma **idempotente** (`INSERT OR IGNORE`). A resposta informa quantos itens de cada tipo foram aplicados:

```jsonc
{ "ok": true, "bypassPatterns": 1, "customHosts": 1, "agents": 1 }
```

O que **NÃO** está incluído na configuração: estado de execução do servidor, caminhos de certificados, estado de DNS por agente, caminho da CA upstream e configurações de TPROXY — esses são estados do host/tempo de execução, não preferências portáteis.

---

## §4 Referência por agente

| #   | Agente             | Status             | Hosts interceptados                                                | Tipo de autenticação |
| --- | ------------------ | ------------------ | ------------------------------------------------------------------ | -------------------- |
| 1   | **Antigravity**    | ✅ Compatível      | `daily-cloudcode-pa.googleapis.com`, `cloudcode-pa.googleapis.com` | Firebase OAuth       |
| 2   | **Kiro (AWS)**     | ✅ Compatível      | `prod.kiro.aws`, `dev.kiro.aws`                                    | AWS SigV4            |
| 3   | **GitHub Copilot** | ✅ Compatível      | `api.githubcopilot.com`, `copilot-proxy.githubusercontent.com`     | GitHub OAuth         |
| 4   | **OpenAI Codex**   | ✅ Compatível      | `api.openai.com` (caminhos do Codex), `chatgpt.com`                | Chave da OpenAI      |
| 5   | **Cursor IDE**     | ✅ Compatível      | `api2.cursor.sh`, `api.cursor.sh`                                  | Cursor OAuth         |
| 6   | **Zed Industries** | ✅ Compatível      | `api.zed.dev`, `llm.zed.dev`                                       | Zed OAuth            |
| 7   | **Claude Code**    | ✅ Compatível      | `api.anthropic.com` (adesão opcional)                              | Chave da Anthropic   |
| 8   | **Open Code**      | ✅ Compatível      | `openrouter.ai`, `api.openai.com` (caminhos zen)                   | Chave de API         |
| 9   | **Trae**           | 🔍 Em investigação | A definir — consulte §8                                            | A definir            |

### Etapas do assistente de configuração (por agente)

Cada cartão de agente tem um assistente de configuração de 3 etapas:

1. **Verificar pré-requisitos** — O servidor está em execução? O certificado é confiável? A IDE está instalada (detecção automática)?
2. **Habilitar DNS** — Adiciona entradas a `/etc/hosts` (requer sudo). Mostra exatamente quais linhas serão adicionadas.
3. **Mapear modelos** — Tabela opcional de mapeamento de modelos. Caracteres curinga são aceitos.

### Detecção de agentes

Para os agentes 1–8, o AgentBridge tenta detectar automaticamente a instalação da IDE:

```ts
export async function detectAgent(agentId: AgentId): Promise<DetectionResult>;
// Retorna: { installed: boolean, version?: string, path?: string }
```

A detecção usa caminhos específicos do sistema operacional e verificações de binários (por exemplo, `code --list-extensions | grep github.copilot` para o Copilot, `~/.config/antigravity/` para o Antigravity).

---

## §5 Segurança

### Regras rígidas aplicadas

| Regra                                 | Aplicação                                                                                        |
| ------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **#12** `sanitizeErrorMessage`        | Todos os erros dos manipuladores são sanitizados antes da resposta ou da entrada no buffer       |
| **#13** Passagem de ambiente do shell | As edições de `/etc/hosts` usam a opção `env` — sem interpolação de strings nos caminhos         |
| **#15 + #17** `isLocalOnlyPath()`     | `/api/tools/agent-bridge/` é LOCAL_ONLY + SPAWN_CAPABLE — loopback imposto antes da autenticação |

### Lista de bypass para hosts confidenciais

A lista de bypass garante que instituições financeiras, provedores de OAuth/SSO e outros hosts confidenciais **nunca sejam descriptografados**. O tráfego TLS deles passa como um túnel TCP transparente — o OmniRoute nunca vê o texto simples.

Os padrões de bypass padrão incluem:

- `*.bank.*`, `*.gov.*` (financeiro/governamental)
- `*.okta.com`, `*.auth0.com`, `*.microsoft.com` (SSO/identidade)
- `*.apple.com`, `*.icloud.com` (serviços de sistema da Apple)

Os padrões de bypass adicionados pelo usuário são armazenados na tabela `agent_bridge_bypass` e têm precedência sobre todo o restante.

### Mascaramento de segredos

`maskSecrets()` de `src/mitm/maskSecrets.ts` é aplicado:

- A cada corpo de solicitação antes de `TrafficBuffer.push()`
- A cada cabeçalho antes do registro ou da transmissão

Padrões: tokens com prefixo `sk-`/`ak-`/`pk-`, tokens `Bearer` e tokens genéricos com ≥40 caracteres.

### Certificado de CA upstream

Quando `AGENTBRIDGE_UPSTREAM_CA_CERT` está definido, o arquivo é lido na inicialização. Se o caminho existir, mas o arquivo não puder ser lido, o AgentBridge registrará um erro claro e se recusará a iniciar (evitando falhas silenciosas de TLS em ambientes corporativos).

### Limitações conhecidas

- **A porta 443 requer privilégio**: No Linux, o AgentBridge precisa de `setcap 'cap_net_bind_service=+ep'` no binário do Node ou deve ser executado por meio de `authbind`. O Assistente de Configuração exibe instruções específicas do sistema operacional.
- **É necessário reiniciar a IDE**: Após o redirecionamento de DNS, a IDE deve ser reiniciada para que a nova resolução de host entre em vigor.
- **Tokens OAuth codificados diretamente**: Alguns agentes (Kiro, Antigravity) armazenam tokens de atualização OAuth localmente. Eles são transparentes para o AgentBridge — ele vê o token Bearer em cada solicitação, que é mascarado antes do registro.
- **Frontends Electron precisam de `NODE_EXTRA_CA_CERTS`**: IDEs cujo frontend é executado em um runtime Node/Electron integrado ignoram o armazenamento de confiança do sistema operacional/NSS e devem ser iniciadas a partir de um shell com `NODE_EXTRA_CA_CERTS` definido (consulte §3.2). Sintoma quando ausente: o backend da IDE é autenticado (o MITM mostra respostas `200`), mas a interface permanece desconectada.
- **Várias instalações da mesma IDE são independentes**: uma instalação do sistema (por exemplo, `/usr/share/antigravity/antigravity`) e uma instalação "Full" local do usuário (por exemplo, `~/AntigravityIDE_Full/antigravity-ide`) são processos separados com seus próprios runtimes — cada um deve ser reiniciado com a CA injetada. Identifique qual deles está em execução pelo caminho do binário antes de reiniciá-lo.
- **A identidade é definida pelo prompt de sistema do agente, não pelo modelo roteado**: quando você remapeia o modelo de um agente para outro provedor, a resposta ainda afirma a identidade nativa do agente (por exemplo, o Antigravity responde "Eu sou alimentado pelo Gemini") porque a IDE injeta isso no prompt de sistema. Confirme o backend real em `call_logs` / `proxy_logs` (`provider`, `model`, `target_format`), não perguntando ao modelo quem ele é.

---

## §6 Solução de problemas

### Conflito na porta 443

Se outro processo já estiver escutando na porta 443 (servidor web, VPN etc.):

```bash
lsof -i :443          # localizar o processo
sudo fuser -k 443/tcp  # encerrar à força (use com cuidado)
```

Como alternativa, configure uma porta não privilegiada nas configurações do AgentBridge e defina regras de redirecionamento com `iptables` / `pf`.

### Certificado não confiável

Se a IDE exibir erros de TLS após iniciar o AgentBridge:

1. Verifique se o certificado foi instalado: `security find-certificate -c "OmniRoute AgentBridge"` (macOS) ou `certutil -L -d sql:$HOME/.pki/nssdb` (Linux/NSS)
2. Alguns aplicativos mantêm seu próprio repositório de confiança (Firefox, Chrome no Linux). Execute "Confiar no certificado" novamente e verifique o repositório de certificados específico do NSS/Firefox.
3. Reinicie a IDE após confiar no certificado — sessões TLS em andamento usam o estado de confiança anterior.

### IDE desconectada / "erro de conexão" apesar de uma CA confiável

Sintoma: após redirecionar o DNS e confiar na CA, uma IDE baseada em Electron (por exemplo, Antigravity)
é aberta **com a sessão desconectada** ou exibe um erro de autenticação/conexão, embora o log do MITM mostre que as
chamadas de inicialização (`loadCodeAssist`, `fetchAvailableModels`, …) estão retornando `200`.

Causa: o **runtime Node/Electron incluído na IDE ignora o repositório de confiança do sistema operacional**. O backend
nativo (um servidor de linguagem em Go) confia na CA do sistema operacional e se autentica, mas o frontend Electron
não — portanto, a interface acredita que está offline.

Correção (ambas as etapas): exporte `NODE_EXTRA_CA_CERTS=<ca.crt>` **e reinicie a IDE a partir desse
shell**, não pelo ícone da área de trabalho. Primeiro, encerre completamente a IDE — o bloqueio de instância única do Electron faz com que
uma segunda inicialização apenas coloque o processo existente em foco, e o novo ambiente seja ignorado. Consulte a §3.2.
Isso reproduz um relatório aberto no projeto upstream em que um agente independente funciona por meio de um MITM, mas a variante para IDE
falha com a mesma configuração.

### DNS não propagado

Verifique se `/etc/hosts` foi atualizado:

```bash
grep "omniroute\|127.0.0.1.*github\|127.0.0.1.*cursor" /etc/hosts
```

Limpe o cache de DNS:

```bash
# macOS
sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder
# Linux (systemd-resolved)
sudo systemctl restart systemd-resolved
# Windows
ipconfig /flushdns
```

### IDE não detectada

A detecção automática usa caminhos de instalação comuns. Se a detecção falhar, mas a IDE estiver instalada:

- Verifique se o binário da IDE está em um local não padrão
- O Assistente de Configuração ainda funciona — a falha na detecção significa apenas que o selo não mostrará o caminho de instalação

### Erros do manipulador (falha na busca upstream)

Se o AgentBridge interceptar as solicitações, mas todas elas falharem:

1. Verifique se pelo menos um provedor está conectado em `/dashboard/providers`
2. Verifique os logs do servidor OmniRoute: `APP_LOG_LEVEL=debug` em `.env`
3. Verifique se `OMNIROUTE_BASE_URL` aponta para o endpoint correto do roteador (padrão: `http://127.0.0.1:20128`)

---

## §7 Referência da API

Todas as rotas são `LOCAL_ONLY` (somente loopback, aplicado antes da autenticação) e `SPAWN_CAPABLE`. Consulte `src/server/authz/routeGuard.ts`.

Caminho base: `/api/tools/agent-bridge/`

| Método              | Caminho                                        | Descrição                                                                                                                                 |
| ------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| GET                 | `/api/tools/agent-bridge/state`                | Estado global do servidor + detecção/status por agente                                                                                    |
| GET                 | `/api/tools/agent-bridge/agents`               | Lista os agentes registrados (id, nome, hosts, viabilidade, estado)                                                                       |
| GET                 | `/api/tools/agent-bridge/agents/{id}`          | Estado de um agente (configuração de destino + detecção + estado armazenado)                                                              |
| PATCH               | `/api/tools/agent-bridge/agents/{id}`          | Atualiza `setup_completed` para o agente                                                                                                  |
| GET                 | `/api/tools/agent-bridge/agents/{id}/detect`   | Executa a sondagem de detecção para o agente (`installed`, `version?`, `path?`)                                                           |
| POST                | `/api/tools/agent-bridge/agents/{id}/dns`      | Ativa/desativa o DNS para o agente (`{enabled: boolean}`)                                                                                 |
| GET                 | `/api/tools/agent-bridge/agents/{id}/mappings` | Mapeamentos de modelos para o agente                                                                                                      |
| PUT                 | `/api/tools/agent-bridge/agents/{id}/mappings` | Substitui os mapeamentos de modelos                                                                                                       |
| POST                | `/api/tools/agent-bridge/agents/{id}/reset`    | Restaura o padrão: desfaz o spoofing de DNS deste agente, limpa seus mapeamentos e redefine seu estado (consulte §3.6)                    |
| POST                | `/api/tools/agent-bridge/server`               | Inicia/interrompe/reinicia o servidor (`action: "start"\|"stop"\|"restart"\|"trust-cert"\|"regenerate-cert"`)                             |
| GET                 | `/api/tools/agent-bridge/cert`                 | Status do certificado (`exists`, `trusted`, `path`)                                                                                       |
| POST                | `/api/tools/agent-bridge/cert`                 | Confia (instala) na CA raiz de MITM                                                                                                       |
| DELETE              | `/api/tools/agent-bridge/cert`                 | Remove a confiança (remove) da CA raiz de MITM — idempotente (consulte §3.6)                                                              |
| POST                | `/api/tools/agent-bridge/cert/regenerate`      | Gera novamente o certificado ativo sem alterar o modelo de certificado (folha legada ou rotação da CA raiz — consulte §3.1)               |
| GET                 | `/api/tools/agent-bridge/cert/download`        | Transmite o certificado PEM ativo para download (`ca.crt` no modelo de CA raiz, `server.crt` em uma instalação de folha legada)           |
| GET                 | `/api/tools/agent-bridge/bypass`               | Lista os padrões de bypass (`default` + `user`)                                                                                           |
| POST                | `/api/tools/agent-bridge/bypass`               | Substitui integralmente os padrões de bypass definidos pelo usuário                                                                       |
| DELETE              | `/api/tools/agent-bridge/bypass?pattern=...`   | Remove um único padrão de bypass definido pelo usuário                                                                                    |
| GET                 | `/api/tools/agent-bridge/diagnose`             | Autoteste do pipeline de captura (consulte §3.6)                                                                                          |
| POST                | `/api/tools/agent-bridge/repair`               | Desfaz o estado de sistema MITM órfão (consulte §3.6)                                                                                     |
| GET                 | `/api/tools/agent-bridge/config`               | Exporta a configuração JSON portátil (consulte §3.7)                                                                                      |
| POST                | `/api/tools/agent-bridge/config`               | Importa a configuração JSON portátil (consulte §3.7)                                                                                      |
| GET                 | `/api/tools/agent-bridge/upstream-ca`          | Obtém o caminho configurado da CA upstream                                                                                                |
| POST                | `/api/tools/agent-bridge/upstream-ca`          | Valida + persiste o caminho da CA upstream                                                                                                |
| POST                | `/api/tools/agent-bridge/upstream-ca/test`     | Apenas valida (simulação) um caminho de CA upstream — não persiste                                                                        |
| GET / POST / DELETE | `/api/tools/agent-bridge/tproxy`               | Modo de captura com descriptografia transparente TPROXY — consulte `docs/security/MITM-TPROXY-DECRYPT.md` (git; não compilado em `/docs`) |

Esquemas OpenAPI completos: `docs/openapi.yaml` → tag `AgentBridge`.

---

## §8 Roteiro

### Investigação do Trae

O Trae é um assistente de programação com IA relativamente novo. Antes de implementar um handler:

1. Identificar o binário/extensão nos marketplaces do VS Code / JetBrains ou como um aplicativo independente
2. Capturar o tráfego com mitmproxy para descobrir hosts de API e formatos de endpoints
3. Determinar o mecanismo de autenticação
4. Avaliar a viabilidade com base nos termos de serviço e na facilidade de descoberta da API

Até que a investigação seja concluída, o cartão do Trae no painel exibe um selo "Em investigação" com um link "Relatar viabilidade". O stub do handler em `src/mitm/handlers/trae.ts` lança um erro estruturado `Ainda não implementado`.

### Agentes no backlog (MITM obrigatório — sem suporte a URL base personalizada)

As ferramentas a seguir não oferecem suporte a URLs base personalizadas em suas versões atuais, tornando o MITM o único caminho de interceptação. A avaliação de viabilidade está pendente:

- **Windsurf** (Codeium/Cognition)
- **Amp** (Sourcegraph)
- **Amazon Q / Kiro CLI** (AWS Bedrock — separado do Kiro IDE)
- **Cowork** (aplicativo para desktop da Anthropic)

Observação: o GitHub Copilot CLI ≥v1.0.19 oferece suporte a `COPILOT_PROVIDER_BASE_URL` — use a configuração direta em vez de MITM para essa ferramenta.
