# Progressive Web App (PWA) Guide (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

Instale o painel OmniRoute como um Progressive Web App para abri-lo na tela inicial ou na área de trabalho em uma janela independente. O aplicativo instalado ainda precisa de uma conexão com o servidor OmniRoute para navegação, dados do painel e solicitações API. Os ativos estáticos armazenados em cache não fornecem um gateway offline ou um painel offline.

## O que é um PWA?

Um Progressive Web App usa o painel da web com um ícone de aplicativo e uma janela separada. Depois de instalado, OmniRoute:

- Inicia na tela inicial ou na área de trabalho
- Abre no modo autônomo, sem a barra de endereços e guias habituais do navegador
- Armazena em cache ativos estáticos selecionados
- Suporta orientações retrato e paisagem

## Instalação

Use um endereço HTTPS para um servidor em outro dispositivo. Quando o servidor é executado no mesmo dispositivo, `http://localhost:20128` também atende aos requisitos de instalação do navegador. Um endereço `http://YOUR_IP:20128` simples não atende a esses requisitos. Os menus e prompts de instalação dependem do navegador e do sistema operacional. Veja [os requisitos de instalação do PWA do MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required).

### Android (cromo)

1. Abra seu endereço OmniRoute HTTPS ou `http://localhost:20128` para um servidor no mesmo telefone.
2. Abra o**⋮** menu e escolha** Instalar aplicativo** ou** Adicionar à tela inicial** , se oferecido.
3. Confirme a solicitação.
4. Abra OmniRoute na tela inicial.

### iOS (Safari)

1. Abra seu endereço OmniRoute HTTPS no Safari.
2. Tocar** Compartilhar** →** Adicionar à tela inicial** .
3. Confirme o nome e toque em** Adicionar** .
4. Abra OmniRoute na tela inicial.

### Área de trabalho (Chrome/Edge)

1. Abra seu painel OmniRoute.
2. Use o ícone de instalação do navegador ou o** Instalar aplicativo** entrada de menu, se oferecida.
3. Confirme o prompt para abrir OmniRoute em sua própria janela.

## Características

### Janela autônoma

O manifesto define `display: "standalone"` e `start_url: "/dashboard"`. O aplicativo instalado abre o painel em uma janela do aplicativo. Os controles do navegador e do sistema operacional ainda podem aparecer; o manifesto não solicita o modo de tela cheia.

### Ativos armazenados em cache e requisitos de rede

O [service worker](../../public/sw.js) armazena em cache recursos selecionados da mesma origem:

| Solicitação ou recurso                     | Estratégia             | Comportamento                                                                                                                        |
| ------------------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Recursos de tempo de instalação            | Pré-cache              | `/`, `/manifest.webmanifest`, `/icon-512.png` e `/apple-touch-icon.png` são armazenados em cache durante a instalação do trabalhador |
| ativos estáticos Next.js (`/_next/`)       | Rede em primeiro lugar | As respostas bem-sucedidas atualizam o cache; um erro de rede recorre a uma resposta existente em cache                              |
| Outros CSS, JS, imagens e fontes estáticas | Cache primeiro         | Uma resposta existente em cache é reutilizada; respostas de rede bem-sucedidas são armazenadas em cache em caso de falha             |
| Navegação na página                        | Ignorar                | O navegador busca a página diretamente; nenhum substituto off-line é veiculado                                                       |
| API, painel e rotas de autenticação        | Ignorar                | O trabalhador não intercepta ou armazena em cache essas solicitações                                                                 |
| Outras solicitações não estáticas          | Rede                   | Nenhuma pesquisa ou armazenamento de cache                                                                                           |

As rotas excluídas são `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`, `/chat`, `/responses`, `/codex`, `/callback` e `/login`, combinadas sem distinção entre maiúsculas e minúsculas nos limites do caminho. Solicitações de origem cruzada e não GET também ignoram o trabalhador.

### Página de conectividade

A página `/offline` fornece uma mensagem de conectividade, um indicador online/offline, um** Tentar novamente a conexão** botão e um link para a página de status. Isso é** não pré-armazenado em cache** e o trabalhador de serviço faz** não** redirecionar navegações com falha para ele. A sua existência não torna novas páginas acessíveis sem o servidor.

### Ícones de aplicativos

O manifesto anuncia estes ícones PNG :

| Arquivo                | Tamanho | Usar                                   |
| ---------------------- | ------- | -------------------------------------- |
| `icon-192.png`         | 192×192 | Ícone geral do aplicativo              |
| `icon-512.png`         | 512×512 | Ícone de aplicativo geral e mascarável |
| `apple-touch-icon.png` | 180×180 | Ícone da tela inicial da Apple         |

O navegador seleciona o ícone apropriado para o destino de instalação.

### Registro Automático

`PwaRegister` registra o trabalhador em produção quando o navegador oferece suporte a trabalhadores de serviço. O modo de desenvolvimento cancela o registro dos trabalhadores e limpa os caches para evitar que ativos obsoletos interfiram no recarregamento a quente. Os prompts de instalação continuam sendo uma decisão do navegador.

## Arquitetura Técnica

### Manifesto de aplicativo da web

Next.js gera `/manifest.webmanifest` a partir de [`src/app/manifest.ts`](../../src/app/manifest.ts). Suas principais configurações são:

| Contexto              | Valor                                        |
| --------------------- | -------------------------------------------- |
| `short_name`          | `OmniRoute`                                  |
| `start_url`           | `/dashboard`                                 |
| `scope`               | `/`                                          |
| `display`             | `standalone`                                 |
| `orientation`         | `any`                                        |
| Cores de fundo e tema | A paleta de luz padrão do `PWA_THEME_COLORS` |

O nome e a descrição do manifesto são valores estáticos nesse arquivo de origem. O manifesto instalado não segue a configuração do nome da instância ou a paleta ativa em todas as visitas.

### Trabalhador de serviço

[`public/sw.js`](../../public/sw.js) não tem dependência de estrutura de service-worker:

- **Instalar:** pré-armazena em cache os quatro recursos listados acima e ativa o novo trabalhador.
- **Ativar:** remove gerações de cache mais antigas e reivindica clientes.
- **Buscar:** aplica as estratégias de ativos estáticos e exclusões de rota acima.
- **Versionamento:** o nome do cache de origem é `omniroute-pwa-v3`; a construção de produção carimba a identidade do cache.
- **Notificações:** lida com eventos `push` recebidos e foca ou abre uma janela quando uma notificação é clicada.

Os manipuladores de eventos push por si só não estabelecem uma assinatura push ativa ou uma entrega de servidor configurada. Não presuma que as notificações estão habilitadas apenas porque o PWA está instalado.

### Metadados e registro de layout

[`src/app/layout.tsx`](../../src/app/layout.tsx) fornece o link do manifesto, metadados independentes da Apple, cores do tema e `viewport-fit: cover`. O título da página e o título do aplicativo web da Apple usam o nome da instância. A cor do tema ativo do navegador segue a paleta; o manifesto de instalação usa a cor clara padrão.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) é executado no cliente e registra `/sw.js` com a compilação ID em seu URL. Ele detecta gerações de cache incompatíveis e pode redefinir o trabalhador e recarregar uma vez para se recuperar de uma instalação mais antiga. A falha no registro não bloqueia o painel.

## Use com Termux (Android)

1. Inicie OmniRoute no Termux: `npx -y omniroute@latest`.
2. Abra o Chrome no mesmo telefone: `http://localhost:20128`.
3. Instale o PWA através do menu de instalação do navegador.
4. Mantenha o servidor Termux em execução enquanto usa o painel.

O telefone hospeda o gateway e seu painel. As solicitações para provedores AI remotos ainda precisam de acesso à rede. Consulte o [guia Termux](TERMUX_GUIDE.md) para configurações e considerações sobre a vida útil do processo do Android.

## Use de outros dispositivos

Abra o endereço HTTPS do servidor em um telefone, tablet ou desktop e siga o fluxo de instalação do navegador. O servidor deve permanecer acessível a partir de cada dispositivo. Consulte o [guia do túnel](../ops/TUNNELS_GUIDE.md) para opções de acesso remoto.

## Personalização

### Nome da instância

O** Nome da instância** a configuração altera os metadados do painel, incluindo o título da página e o título do aplicativo da web da Apple. O manifesto gerado usa um nome estático, portanto, essa configuração não garante que um aplicativo já instalado seja renomeado.

### Favicon personalizado

Um favicon personalizado altera o favicon do navegador. O manifesto de instalação ainda anuncia os arquivos PNG acima; alterar o favicon não substitui os ícones da tela inicial.

## Limitações

- **Conexão de servidor necessária:** a navegação da página, o estado do painel e as solicitações API não têm um substituto offline.
- **Sem sincronização em segundo plano:** ações off-line não são enfileiradas para reprodução.
- **Diferenças do navegador:** menus de instalação, apresentação de janelas e suporte a notificações variam de acordo com a plataforma.
- **Nenhum cache de resposta API :** o trabalhador exclui API, painel e rotas de autenticação.
- **Ícones de instalação estática:** a atualização desses ícones requer a alteração dos ativos anunciados; os navegadores podem reter metadados instalados.

## Referência de arquivos

| Arquivo                                                                                | Propósito                                                      |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | Manifesto de aplicativo web gerado                             |
| [public/sw.js](../../public/sw.js)                                                     | Cache, exclusões e manipuladores de eventos de notificação     |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | Registro de produção e recuperação de cache obsoleto           |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | Página de conectividade, não um substituto off-line automático |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | Metadados da página e configurações da janela de visualização  |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | Valores de cores de tema compartilhados                        |
| [public/icon-512.png](../../public/icon-512.png)                                       | 512 × 512 ícone do aplicativo                                  |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 ícone da Apple                                       |
