# Progressive Web App (PWA) Guide (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

Instale o painel OmniRoute como uma Progressive Web App para o abrir no ecrã inicial ou na área de trabalho numa janela independente. A aplicação instalada ainda precisa de uma ligação ao servidor OmniRoute para navegação, dados do painel e pedidos API. Os ativos estáticos armazenados em cache não fornecem um gateway offline ou um painel offline.

## O que é um PWA?

Um Progressive Web App utiliza o painel Web com um ícone de aplicação e uma janela separada. Depois de instalado, OmniRoute:

- Inicia no ecrã inicial ou na área de trabalho
- Abre em modo autónomo, sem a barra de endereços e separadores habituais do browser
- Armazena em cache os ativos estáticos selecionados
- Suporta orientações retrato e paisagem

## Instalação

Utilize um endereço HTTPS para um servidor noutro dispositivo. Quando o servidor é executado no mesmo dispositivo, `http://localhost:20128` também cumpre os requisitos de instalação do browser. Um endereço `http://YOUR_IP:20128` simples não cumpre estes requisitos. Os menus e os avisos de instalação dependem do browser e do sistema operativo. Consulte [os requisitos de instalação do PWA do MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required).

### Android (cromo)

1. Abra o seu endereço OmniRoute HTTPS ou `http://localhost:20128` para um servidor no mesmo telefone.
2. Abra o**⋮** menu e escolha** Instalar aplicação** ou** Adicionar à tela inicial** , se oferecido.
3. Confirme o pedido.
4. Abra OmniRoute no ecrã inicial.

### iOS (Safari)

1. Abra o seu endereço OmniRoute HTTPS no Safari.
2. Torneira** Partilhar** →** Adicionar à tela inicial** .
3. Confirme o nome e toque em** Adicionar** .
4. Abra OmniRoute no ecrã inicial.

### Área de trabalho (Chrome/Edge)

1. Abra o seu painel OmniRoute.
2. Utilize o ícone de instalação do browser ou o** Instalar aplicação** entrada no menu, se oferecida.
3. Confirme o aviso para abrir OmniRoute na sua própria janela.

## Funcionalidades

### Janela autónoma

O manifesto define `display: "standalone"` e `start_url: "/dashboard"`. A aplicação instalada abre o painel numa janela do aplicativo. Os controlos do browser e do sistema operativo ainda podem aparecer; o manifesto não solicita o modo de ecrã completo.

### Ativos armazenados em cache e requisitos de rede

O [service worker](../../public/sw.js) armazena em cache recursos selecionados da mesma origem:

| Pedido ou recurso                          | Estratégia             | Comportamento                                                                                                                        |
| ------------------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Recursos de tempo de instalação            | Pré-cache              | `/`, `/manifest.webmanifest`, `/icon-512.png` e `/apple-touch-icon.png` são armazenados em cache durante a instalação do trabalhador |
| ativos estáticos Next.js (`/_next/`)       | Rede em primeiro lugar | As respostas bem-sucedidas atualizam a cache; um erro de rede recorre a uma resposta existente em cache                              |
| Outros CSS, JS, imagens e fontes estáticas | Cache primeiro         | Uma resposta existente em cache é reutilizada; as respostas de rede bem-sucedidas são armazenadas em cache em caso de falha          |
| Navegação na página                        | Ignorar                | O browser procura a página diretamente; nenhum substituto offline é veiculado                                                        |
| API, painel e rotas de autenticação        | Ignorar                | O trabalhador não interceta nem armazena em cache essas solicitações                                                                 |
| Outras solicitações não estáticas          | Rede                   | Sem pesquisa ou armazenamento de cache                                                                                               |

As rotas excluídas são `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`, `/chat`, `/responses`, `/codex`, `/callback` e `/login`, combinadas sem distinção entre maiúsculas e minúsculas nos limites do caminho. Os pedidos de origem cruzada e não GET também ignoram o trabalhador.

### Página de conectividade

A página `/offline` disponibiliza uma mensagem de conectividade, um indicador online/offline, um** Tentar novamente a ligação** botão e uma ligação para a página de estado. Isso é** não pré-armazenado em cache** e o prestador de serviços faz** não** redirecionar as navegações com falha para o mesmo. A sua existência não torna as novas páginas acessíveis sem o servidor.

### Ícones de aplicações

O manifesto anuncia estes ícones PNG :

| Ficheiro               | Tamanho | Uso                                   |
| ---------------------- | ------- | ------------------------------------- |
| `icon-192.png`         | 192×192 | Ícone geral da aplicação              |
| `icon-512.png`         | 512×512 | Ícone de aplicação geral e mascarável |
| `apple-touch-icon.png` | 180×180 | Ícone do ecrã inicial da Apple        |

O browser seleciona o ícone apropriado para o destino de instalação.

### Registo Automático

`PwaRegister` regista o trabalhador em produção quando o browser suporta trabalhadores de serviço. O modo de desenvolvimento cancela o registo dos trabalhadores e limpa as caches para evitar que os ativos obsoletos interfiram com o recarregamento a quente. Os avisos de instalação continuam a ser uma decisão do browser.

## Arquitetura Técnica

### Manifesto de aplicação web

Next.js gera `/manifest.webmanifest` a partir de [`src/app/manifest.ts`](../../src/app/manifest.ts). As suas principais configurações são:

| Definição             | Valor                                        |
| --------------------- | -------------------------------------------- |
| `short_name`          | `OmniRoute`                                  |
| `start_url`           | `/dashboard`                                 |
| `scope`               | `/`                                          |
| `display`             | `standalone`                                 |
| `orientation`         | `any`                                        |
| Cores de fundo e tema | A paleta de luz padrão do `PWA_THEME_COLORS` |

O nome e a descrição do manifesto são valores estáticos nesse ficheiro de origem. O manifesto instalado não segue a configuração do nome da instância nem a paleta ativa em todas as visitas.

### Trabalhador de serviço

[`public/sw.js`](../../public/sw.js) não tem dependência de estrutura de service-worker:

- **Instalar:** pré-armazena em cache os quatro recursos listados acima e ativa o novo trabalhador.
- **Ativar:** remove gerações de cache mais antigas e reivindica clientes.
- **Obter:** aplica as estratégias de ativos estáticos e exclusões de rotas acima referidas.
- **Versionamento:** o nome da cache de origem é `omniroute-pwa-v3`; a construção de produção carimba a identidade da cache.
- **Notificações:** lida com eventos `push` recebidos e foca ou abre uma janela quando uma notificação é clicada.

Os manipuladores de eventos push por si só não estabelecem uma assinatura push ativa ou uma entrega de servidor configurada. Não presuma que as notificações estão ativadas apenas porque o PWA está instalado.

### Metadados e registo de layout

[`src/app/layout.tsx`](../../src/app/layout.tsx) fornece o link do manifesto, os metadados independentes da Apple, as cores do tema e `viewport-fit: cover`. O título da página e o título da aplicação web da Apple utilizam o nome da instância. A cor do tema ativo do browser segue a paleta; o manifesto de instalação utiliza a cor clara padrão.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) é executado no cliente e regista `/sw.js` com a compilação ID no seu URL. Deteta gerações de cache incompatíveis e pode repor o trabalhador e recarregar uma vez para recuperar de uma instalação mais antiga. A falha no registo não bloqueia o painel.

## Utilizar com Termux (Android)

1. Inicie OmniRoute no Termux: `npx -y omniroute@latest`.
2. Abra o Chrome no mesmo telefone: `http://localhost:20128`.
3. Instale o PWA através do menu de instalação do browser.
4. Mantenha o servidor Termux em execução enquanto utiliza o painel.

O telefone aloja o gateway e o seu painel. Os pedidos para fornecedores AI remotos ainda precisam de acesso à rede. Consulte o [guia Termux](TERMUX_GUIDE.md) para obter definições e considerações sobre a vida útil do processo Android.

## Utilização de outros dispositivos

Abra o endereço HTTPS do servidor num telefone, tablet ou desktop e siga o fluxo de instalação do browser. O servidor deve permanecer acessível a partir de cada dispositivo. Consulte o [guia do túnel](../ops/TUNNELS_GUIDE.md) para obter as opções de acesso remoto.

## Personalização

### Nome da instância

O** Nome da instância** a configuração altera os metadados do painel, incluindo o título da página e o título da aplicação web da Apple. O manifesto gerado utiliza um nome estático, pelo que esta configuração não garante que uma aplicação já instalada seja renomeada.

### Favicon personalizado

Um favicon personalizado altera o favicon do browser. O manifesto de instalação ainda anuncia os ficheiros PNG acima; alterar o favicon não substitui os ícones do ecrã inicial.

## Limitações

- **Ligação de servidor necessária:** a navegação da página, o estado do painel e os pedidos API não têm um substituto offline.
- **Sem sincronização em segundo plano:** as ações offline não são enfileiradas para reprodução.
- **Diferenças do navegador:** menus de instalação, apresentação de janelas e suporte de notificações variam de acordo com a plataforma.
- **Sem cache de resposta API :** o trabalhador exclui API, painel e rotas de autenticação.
- **Ícones de instalação estática:** a atualização destes ícones requer a alteração dos ativos anunciados; os browsers podem reter metadados instalados.

## Referência de ficheiros

| Ficheiro                                                                               | Finalidade                                                    |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | Manifesto de aplicação web gerado                             |
| [public/sw.js](../../public/sw.js)                                                     | Cache, eliminações e manipuladores de eventos de notificação  |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | Registo de produção e recuperação de cache obsoleto           |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | Página de conectividade, não um substituto offline automático |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | Metadados da página e definições da janela de visualização    |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | Valores de cores de tema partilhados                          |
| [public/icon-512.png](../../public/icon-512.png)                                       | 512 ícone da aplicação × 512                                  |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 ícone da Apple                                      |
