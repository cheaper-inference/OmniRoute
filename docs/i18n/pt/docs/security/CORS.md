# CORS Configuration & Security (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute controla quais **origens do navegador** pode ler respostas de origem cruzada a partir de uma lista de permissões única e centralizada. O modelo é **fechado com falha por defeito** : nenhuma origem é permitida até que opte por uma. Esta página documenta como a lista de permissões é resolvida, o que `CORS_ALLOW_ALL=true` realmente expõe (e, mais importante, o que faz **não** ), como configurar o desenvolvimento versus produção em segurança e o aviso de tempo de execução que o painel mostra quando um caractere curinga está ativo.

**Fonte da verdade:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). A lista de permissões é aplicada uma vez, no middleware (`src/server/authz/pipeline.ts`) os manipuladores por rota — não definem `Access-Control-Allow-Origin` por si próprios.

## Como uma origem é resolvida

Para cada pedido, o middleware calcula o valor `Access-Control-Allow-Origin` por esta ordem:

1. **`CORS_ALLOW_ALL=true`** (ou o `CORS_ORIGIN=*` herdado) → ecoa o `Origin` do chamador (ou `*` quando não existe cabeçalho `Origin` ), com `Vary: Origin` para que as caches permaneçam correctas. O mesmo chokepoint `applyCorsHeaders()` também anexa `Vary: Accept-Encoding` a cada resposta 2xx-with-body na superfície `/v1*`/`/v1beta*` autenticada por token (`relaxForTokenAuth`, RFC 9110 §12.5.5, #6737 edition ), para que as caches downstream/shared possam distinguir corretamente as variantes comprimidas versus não comprimidas.
2. Caso contrário, o pedido `Origin` será normalizado (minúsculas, barra final removida) e comparado com o **lista de permissões mesclada** :
   - ambiente **`CORS_ALLOWED_ORIGINS`** Lista separada por vírgulas — e
   - O tempo de execução **`corsOrigins`** configuração (Dashboard → Security → _CORS Allowed Origins_), injetada via `setRuntimeAllowedOrigins()` de `src/lib/config/runtimeSettings.ts`.
3. Sem correspondência →**nenhum cabeçalho `Access-Control-Allow-Origin` é emitido** . O browser bloqueia a leitura de origem cruzada. Este é o padrão de falha fechada pretendido.

| Variável ambiente      | Significado                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV de origens exatas para permitir (recomendado).                                                |
| `CORS_ALLOW_ALL`       | `true`/`1` → ecoa qualquer origem (joker). Somente desenvolvedor.                                 |
| `CORS_ORIGIN`          | Legado. `*` comporta-se como `CORS_ALLOW_ALL`; é adicionado um único valor à lista de permissões. |

## Modelo de ameaça — o que `CORS_ALLOW_ALL=true` realmente expõe

Vale a pena levar a sério o aviso genérico OWASP (" CORS = qualquer site pode chamar o seu API"), mas a exposição do OmniRoute é **mais restrito que o caso genérico** , devido a um facto concreto de implementação:

> **O `applyCorsHeaders()` central nunca emite `Access-Control-Allow-Credentials`.** Um navegador não exporá uma resposta de origem cruzada _credenciada_ (contendo cookies), a menos que o servidor envie `Access-Control-Allow-Credentials: true`. O caminho CORS partilhado do OmniRoute nunca funciona.

O que significa isto por superfície, mesmo com `CORS_ALLOW_ALL=true`:

| Superfície                               | Mecanismo de autenticação          | Efeito do curinga CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Painel / MANAGEMENT `/api/*`             | Sessão de cookies                  | A origem é ecoada, mas **sem `Allow-Credentials`** o navegador **blocos** a leitura credenciada. Um site malicioso de origem cruzada **não consigo ler** as suas respostas autenticadas do painel e o cookie da sessão não será exposto.                                                                                                                                                                                                                                                                                                           |
| Cliente API `/v1/*`, `/v1beta/*`         | Cabeçalho do portador/ `x-api-key` | Já permissivo **por design** (`relaxForTokenAuth`): os navegadores nunca anexam automaticamente `Authorization`/`x-api-key`, pelo que a página de um atacante não pode fornecer a sua chave. O eco relaxado requer um assunto autenticado (uma chave API validada ou sessão de painel), e não apenas um cabeçalho de credencial, e nunca inclui `Access-Control-Allow-Credentials`. As respostas anónimas (`REQUIRE_API_KEY=false`) utilizam a lista de permissões de origem configurada, incluindo uma aceitação explícita `CORS_ALLOW_ALL=true`. |
| Apenas leitura pública (`/api/health`,…) | Nenhum                             | Não sensível; joker é inofensivo.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

Então o **residual** a exposição do `CORS_ALLOW_ALL=true` está limitada a: (a) origem cruzada não acreditada **lê** de dados já não autenticados e (b) deixar CORS**passe de comprovativo** em rotas de gestão — que ainda exigem autenticação que uma página de origem cruzada não pode fornecer. Isso é **não** um vetor de sequestro de sessão ou roubo de credencial no caminho CORS partilhado.

### Uma exceção genuína — `/api/v1/agents/`

As rotas Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) definem os seus **próprio** Cabeçalhos CORS (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) e **fazer** emitir `Access-Control-Allow-Origin: <origin>|*` juntamente com `Access-Control-Allow-Credentials: true`. Esta é a única superfície onde o eco de origem e as credenciais coexistem, e é **independente de `CORS_ALLOW_ALL`** . Estas rotas são autenticadas pela gestão (`requireManagementAuth`); os operadores que expõem o painel fora do host devem estar cientes de que este é o único local onde uma leitura credenciada de origem cruzada é permitida pelos cabeçalhos de resposta. Apertá-lo a uma lista de permissões explícita é rastreado separadamente desta orientação CORS.

## Lista de verificação de produção

- **Nunca coloque `CORS_ALLOW_ALL=true` em produção.** Deixe-o sem definição.
- Defina um **explícito** lista de origem — no campo env var ou no separador Segurança:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Se OmniRoute for executado atrás de um proxy/túnel reverso (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS será **não** o seu único controlo — o protetor de rotas de loopback ainda protege as rotas com capacidade de spawn (consulte [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Não forje `X-Forwarded-For: 127.0.0.1` para "arranjar" um 403; que reabre a classe RCE, o guarda de rotas fecha.
- Confirme o estado do tempo de execução: o painel mostra um **banner âmbar persistente** no painel → Security → Authorization Inventory sempre que `CORS_ALLOW_ALL=true` estiver ativo e `/api/settings/authz-inventory` devolver um envelope `cors: { allowAll, allowedOrigins }` as ferramentas de monitorização podem pesquisar.

## A conveniência de desenvolvimento — permite origens locais específicas

Raramente precisa do joker, mesmo no desenvolvimento. Permita apenas os servidores de desenvolvimento que utiliza:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

As origens são correspondidas sem distinção entre maiúsculas e minúsculas e a barra final é ignorada, pelo que `http://localhost:3000` e `http://localhost:3000/` são equivalentes. O mesmo CSV pode ser definido em tempo de execução em **Dashboard → Security → CORS Origens permitidas** sem reiniciar.

## Chaves API versus sessões de cookies

- **Bearer / `x-api-key` (a superfície de inferência `/v1/*` ):** os navegadores nunca os anexam automaticamente. CORS não é uma barreira significativa aqui — a chave API é a barreira — e é por isso que esta superfície é intencionalmente permissiva para que o navegador e os clientes Electron possam ler as respostas a que já têm direito. O eco relaxado requer um assunto autenticado (uma chave API validada ou sessão de painel), e não apenas um cabeçalho de credencial, e nunca inclui `Access-Control-Allow-Credentials`. As respostas anónimas (`REQUIRE_API_KEY=false`) utilizam a lista de permissões de origem configurada, incluindo uma aceitação explícita `CORS_ALLOW_ALL=true`. As rejeições de autenticação (401) permanecem legíveis para que os clientes possam exibir uma chave revogada ou mal digitada (#5242): o próprio 401 do pipeline mantém o eco e uma rota que recusa a própria chave depois de o pipeline a ter servido como anónima (`/v1/models` e `/v1beta/models` com autenticação de gestão configurada, o `/v1/files` com âmbito do proprietário, `/v1/batches`, `/v1/media`, `/v1/session-leases` e rotas candidatas de combinação automática) adiciona o eco a esse 401 através `credentialRejectionHeaders()`. O echo é introduzido no pedido que carrega um cabeçalho de credencial (`Authorization`, `x-api-key`, `x-goog-api-key` ou o cookie `auth_token` ), e não em qual deles a rota foi verificada e nunca é emparelhado com `Access-Control-Allow-Credentials`; o corpo é um envelope de erro fixo. As rotas de gestão sob `/api/v1/` protegidas por `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) não utilizam esta exceção de rejeição de credenciais: com `REQUIRE_API_KEY=false`, as suas respostas 401/403 seguem a política de origem CORS configurada.
- **Sessão de cookies (o painel):** protegido pelo padrão de falha fechada **e** pela ausência de `Access-Control-Allow-Credentials` no caminho partilhado. Mantenha as origens management/dashboard fora de qualquer configuração permissiva; devem permanecer exatamente fechados contra falhas.

## Apertos de mão WebSocket (`/v1/responses`, `/v1/ws`)

Os navegadores não aplicam CORS a WebSocket, pelo que os transportes WebSocket que devolvem a saída de inferência verificam o handshake `Origin` (`src/server/origin/wsOrigin.ts`): as respostas WebSocket (`/v1/responses`) e, quando OmniRoute é executado através de `npm start` / `npm run dev`, a ponte `/v1/ws` e `/api/v1/ws`, que transmite `/v1/chat/completions`, `/v1/messages` e `/v1/responses` como tramas. A ponte pede o veredicto ao `/api/v1/ws?handshake=1` e recusa-se a atualizar, a menos que essa rota execute a verificação. Os requisitos de autenticação ainda se aplicam separadamente. A verificação de origem é aprovada quando:

- não possui cabeçalho `Origin` (Codex CLI, SDKs e outros clientes que não sejam browsers);
- o `Origin` é admitido pela lista de permissões acima (`CORS_ALLOWED_ORIGINS`, a configuração `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- o `Origin` é uma das próprias origens públicas do OmniRoute(a base pública configurada URL, a origem encaminhada de um proxy fidedigno ou um host loopback/LAN direto fornecido como um literal IP ou `localhost` — os mesmos candidatos que a verificação de mutação do painel utiliza); ou
- transporta uma chave API válida, como na superfície HTTP `/v1/*`.

Qualquer outra coisa recebe `403 ws_origin_forbidden`. Um cookie de sessão do painel não isenta um `Origin` estrangeiro, porque o navegador o anexa ao socket de qualquer página. `localhost` noutra porta não é tratado como de mesma origem; adicione estas origens de desenvolvimento ao `CORS_ALLOWED_ORIGINS`.

## Exemplo: proxy reverso na frente do OmniRoute

CORS é aplicado pelo próprio OmniRoute, pelo que o proxy deve geralmente **não** adicionar ou reescrever cabeçalhos `Access-Control-*` (os cabeçalhos duplos quebram os browsers). Encerre TLS e remeta —, deixe OmniRoute responder ao comprovativo:

```nginx
# nginx — forward to OmniRoute; do NOT inject Access-Control-* here
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Keep the forwarding headers: a proxy on the same host connects from loopback, and they are
    # what tells OmniRoute the caller is not the local operator. A proxy that adds none of them
    # makes every remote caller look local. Never set X-Forwarded-For to 127.0.0.1 either.
}
```

Defina as origens permitidas do browser no OmniRoute (`CORS_ALLOWED_ORIGINS` ou no separador Segurança), e não no proxy.

## Arquivos de origem

| Preocupação                                               | Ficheiro                                                             |
| --------------------------------------------------------- | -------------------------------------------------------------------- |
| Resolução da lista de permissões + `getCorsStatus()`      | `src/server/cors/origins.ts`                                         |
| Aplicação de middleware (fonte única de verdade)          | `src/server/authz/pipeline.ts`                                       |
| Configurações de injeção de origem do tempo de execução → | `src/lib/config/runtimeSettings.ts`                                  |
| Estado do tempo de execução do painel                     | `src/app/api/settings/authz-inventory/route.ts`                      |
| Banner de aviso do painel                                 | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Campo Origens permitidas CORS                             | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS por rota do Cloud-Agent (a exceção)                  | `src/lib/cloudAgent/api.ts`                                          |
| Aperto de mão WebSocket Verificação `Origin`              | `src/server/origin/wsOrigin.ts`                                      |

## Veja também

- Aplicação de loopback — [do Route Guard Tiers](./ROUTE_GUARD_TIERS.md) para rotas com capacidade de spawn (um controlo separado e complementar).
- [Guia de autorização](../architecture/AUTHZ_GUIDE.md) — o pipeline de autenticação completo.
