# Authorization Guide (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Fonte da verdade:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Última atualização:** 2026-09-22 — os espaços de nomes de âmbito apontam para MCP-SERVER.md

OmniRoute possui um pipeline de autorização sensível a rotas que protege cada pedido de API. A classificação é **determinística** e **fail-closed** — qualquer coisa que não possa ser classificada acaba como `MANAGEMENT` e exige uma sessão ou um token de nível de gestão. Esta página explica o modelo para engenheiros que mantêm rotas ou que desenham novos endpoints.

![Pipeline de AuthZ (3 classes de rota + avaliação de política)](../diagrams/exported/authz-pipeline.svg)

> Fonte: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dois modos de autenticação

### 1. Chave de API (Bearer)

Utilizado para as APIs de cliente compatíveis com OpenAI/Anthropic/Gemini e para algumas rotas de gestão quando a chave tem o âmbito `manage`.

```
Authorization: Bearer <api-key>
```

Validado por `isValidApiKey()` / `extractApiKey()` em `src/sse/services/auth.ts` e reexportado através de `src/shared/utils/apiAuth.ts`. O validador também aceita as variáveis de ambiente `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` como chaves de passagem persistentes (issue #1350).

### 2. Sessão do painel (cookie auth_token)

Para páginas do painel e operações administrativas.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Um cookie só é uma sessão quando o JWT é validado **e** contém `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Todos os
consumidores do cookie (proteção de rotas do painel (`isDashboardSessionAuthenticated()`), atualização do pipeline de autorização, negociação WebSocket, servidor
em direto, `/api/settings/require-login`, `/api/auth/status`) passam por esse auxiliar.
Existem outros JWT assinados com `JWT_SECRET` — a passagem da CLI do Cursor emite
tokens `iss "omniroute" / aud "cursor-cli"` para detentores de chaves — e estes nunca são sessões
(#13298).

Verificado por `isDashboardSessionAuthenticated()` em `src/shared/utils/apiAuth.ts`. O pipeline atualiza automaticamente o JWT quando restam menos de 7 dias dos seus 30 dias de validade.

Uma sessão também pode terminar antes de decorrerem os 30 dias, porque todos os emissores passam por `mintDashboardSessionToken` (um instante de emissão `iat` e um identificador `jti`) e o verificador consulta duas definições: `sessionsValidAfter`, definida por uma alteração da palavra-passe para que todas as sessões emitidas anteriormente deixem de ser validadas (o navegador que alterou a palavra-passe recebe um cookie novo), e `revokedDashboardSessions`, à qual `POST /api/auth/logout` adiciona o `jti` da sessão terminada. As sessões emitidas por uma versão anterior não contêm nenhuma destas alegações e permanecem válidas até à primeira alteração da palavra-passe. Se não for possível ler as definições, a sessão não é considerada fidedigna.

Algumas rotas de gestão aceitam **qualquer um** dos modos: cookie OU `Bearer <key>` quando a chave de API tem o âmbito `manage` (ou `admin`). É isto que permite o fluxo de trabalho "configurável através de chamadas à API" adicionado na v3.8.

#### Porta de início de sessão OIDC opcional (#6973)

O início de sessão administrativo no painel também suporta um fluxo OIDC (OpenID Connect) de **adesão opcional**
em conjunto com o início de sessão predefinido por palavra-passe — o início de sessão por palavra-passe nunca é removido, apenas
complementado:

- Desativado, a menos que `settings.oidcEnabled === true` **e** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` estejam todos configurados (Definições → Autenticação).
  Caso contrário, `GET /api/auth/oidc/login` devolve `400`.
- `GET /api/auth/oidc/login` descobre o `authorization_endpoint` a partir de
  `/.well-known/openid-configuration` do emissor (recorrendo a
  `<issuer>/authorize` como alternativa), constrói o URI de redirecionamento a
  partir do pedido recebido (tendo em conta `x-forwarded-proto`) e redireciona
  para o IdP com um `state` aleatório armazenado num cookie `oidc_state`
  `httpOnly`.
- `GET /api/auth/oidc/callback` valida o `state`, troca o código de autorização
  e verifica a assinatura do token de ID através do JWKS do emissor
  (`createRemoteJWKSet` do `jose`, colocado em cache por URI do JWKS), com
  verificações de `issuer`/`audience`. A admissão no painel requer uma lista
  `oidcAllowedSubjects` não vazia, uma política `oidcAdmissionClaim` ou ambas.
  A lista de sujeitos corresponde a `sub` ou `email` apenas quando
  `email_verified === true`. A política de claim opcional recebe um caminho
  para um claim do token de ID separado por pontos (por exemplo,
  `realm_access.roles`) e um array de valores aceites; o claim resolvido tem de
  ser um array de strings que contenha pelo menos um valor aceite. Se ambas as
  políticas estiverem configuradas, ambas têm de ser satisfeitas. Claims
  ausentes ou malformados resultam na recusa do acesso e, sem qualquer uma das
  políticas, o callback recusa o início de sessão (`not_configured`). As
  configurações existentes baseadas apenas no sujeito continuam inalteradas.
- Normalmente, o Keycloak mapeia as funções do realm para tokens de acesso, mas
  não necessariamente para tokens de ID. Para exigir a função de realm `admin`,
  configure um protocol mapper para este cliente que inclua
  `realm_access.roles` no respetivo **token de ID** e, em seguida, defina
  `oidcAdmissionClaim` como `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Verifique o claim real do token de ID para este cliente antes de ativar a
  admissão baseada apenas em funções; a aplicação não lê funções do token de
  acesso. A recusa de tokens no lado do IdP pode complementar esta verificação
  do lado da aplicação, mas não a substitui.
- Em caso de sucesso, emite **exatamente o mesmo** JWT `auth_token` de 30 dias
  emitido pelo início de sessão com palavra-passe
  (`src/app/api/auth/login/route.ts`), pelo que o restante pipeline de sessão
  do painel (renovação automática, flags de cookies) permanece inalterado —
  o OIDC substitui apenas a forma como o cookie é emitido, não aquilo a que
  concede acesso. As alterações às funções/aos grupos do IdP não invalidam as
  sessões OmniRoute existentes; o fim de sessão, a rotação da palavra-passe ou
  a expiração da sessão continuam a determinar o respetivo tempo de vida.
- Todas as definições `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) estão em
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  responde com `400 PASSWORD_REQUIRED`, a menos que o corpo inclua a
  palavra-passe de gestão como `currentPassword` (`401 PASSWORD_MISMATCH` quando
  está incorreta). `oidcDisablePasswordLogin` recusa o _início de sessão_ com
  palavra-passe (`POST /api/auth/login`), mas mantém o hash da palavra-passe
  armazenado, e a reautenticação continua a verificar `currentPassword` em
  relação ao mesmo.
- `corsOrigins` e `bruteForceProtection` também estão em
  `SECURITY_IMPACTING_SETTINGS_KEYS`: tornar qualquer uma destas definições
  menos restritiva enfraquece as defesas do início de sessão, pelo que exigem
  a mesma reautenticação com `currentPassword` (o separador Segurança solicita-a)
  e a importação de JSON remove-as.
- Todas as chaves de política de segurança — as entradas de
  `SECURITY_IMPACTING_SETTINGS_KEYS`, todas as chaves `oidc*` e o estado da
  sessão do painel — são **exclusivas do operador** em `PATCH /api/settings`:
  uma chave de API com âmbito `manage` ou um token de acesso `oma_` é recusado
  com `403`, mesmo quando envia o `currentPassword` correto, e a recusa é
  registada na auditoria como `settings.update_failed` com
  `reason: OPERATOR_REQUIRED` (`requireOperatorCredential()` em
  `src/lib/api/operatorCredential.ts`). As definições comuns (tema,
  preferências de apresentação) continuam a poder ser alteradas por uma chave
  `manage` ou por um token de acesso `admin`. Todas as mutações de
  `/api/settings` propriamente dito (e de `/api/settings/require-login`) também
  necessitam do âmbito de token de acesso `admin`
  (`ADMIN_MUTATION_EXACT_PATHS` em `src/server/authz/accessScopes.ts`,
  correspondência exata do caminho); `GET` permanece com `read`, e as outras
  sub-rotas `/api/settings/*` (proxies, predefinições de combos, aliases de
  modelos, compressão, limpezas…) mantêm o âmbito `write` inferido a partir do
  método.
- `POST /api/settings/import-json` ignora essa reautenticação, pelo que remove
  todas as chaves em `IMPORT_STRIPPED_SETTINGS_KEYS` (no mesmo ficheiro) antes
  da escrita: a palavra-passe e `currentPassword`, todas as entradas de
  `SECURITY_IMPACTING_SETTINGS_KEYS` e o estado da sessão do painel
  (`sessionsValidAfter`, `revokedDashboardSessions`). Assim, importar uma cópia
  de segurança mais antiga não pode reativar uma sessão que uma alteração da
  palavra-passe ou um fim de sessão já tenha terminado.

## Classes de rotas

`src/server/authz/types.ts` define três classes; qualquer rota que não possa ser classificada de forma determinística recorre a `MANAGEMENT`.

| Classe       | Descrição                                                                                                                                                                  | Autenticação necessária                                                   |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `PUBLIC`     | Rotas explicitamente seguras: início de sessão, fim de sessão, estado, inicialização, verificação de funcionamento e bootstrap do onboarding.                              | Nenhuma                                                                   |
| `CLIENT_API` | Pontos finais de disponibilização de modelos: `/api/v1/*`, `/api/v1beta/*`, além dos alias `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Chave Bearer quando a funcionalidade `REQUIRE_API_KEY` efetiva está ativa |
| `MANAGEMENT` | Páginas do painel, definições, fornecedores, chaves, pontos finais de administração e diagnóstico.                                                                         | Sessão do painel OU Bearer com âmbito `manage`                            |

Algumas ações de `MANAGEMENT` são **exclusivas do operador**: uma chave `manage` não basta. Exportar credenciais guardadas (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), restaurar uma cópia de segurança sobre os dados ativos (`POST /api/db-backups/import`, incluindo `dryRun=true`, `POST /api/db-backups` com restauro por id, `POST /api/settings/import-json`), e eliminar pontos de restauro (a limpeza com `DELETE /api/db-backups` e `PATCH /api/db-backups`, porque a retenção que este guarda controla a poda automática após cada cópia de segurança) exigem uma sessão do painel, a identidade da CLI local ou o início de sessão desativado. Emitir um token de sincronização (`POST /api/sync/tokens`) e criar um token de acesso da CLI com âmbito `admin` (`POST /api/cli/tokens`) exigem, em todos os modos de início de sessão, uma sessão do painel ou a identidade da CLI local. As chaves de API de qualquer âmbito e os tokens de acesso `oma_` não são credenciais de operador: recebem `403` sempre que alguma destas for exigida. A verificação está em `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Alterar as definições de início de sessão também é exclusivo do operador: `POST /api/settings/require-login` (definir a palavra-passe de gestão / ativar ou desativar `requireLogin`) aceita apenas estas credenciais depois de existir uma palavra-passe. A janela de bootstrap da primeira execução (ainda sem palavra-passe) mantém-se inalterada, e uma sessão do painel tem de enviar `currentPassword` para substituir a palavra-passe (`403` se faltar ou estiver errada, auditado como `settings.update_failed`). A CLI local e uma instância com o início de sessão desativado mantêm o caminho de recuperação e podem definir uma palavra-passe sem esse passo, pois ambos estão vinculados ao anfitrião que detém o diretório de dados.

## Pipeline

```
Pedido recebido → src/proxy.ts
  → runAuthzPipeline() em src/server/authz/pipeline.ts
    1. Remover cabeçalhos internos fidedignos (x-omniroute-auth-*, x-omniroute-route-class)
    2. Gerar o ID do pedido, classificar a rota através de classifyRoute()
    3. Se pathname == "/" → redirecionar para /dashboard
    4. Se estiver em esvaziamento (encerramento gracioso) e /api/* → 503
    5. Se não for GET em /api/* → proteção checkBodySize()
    6. Se for OPTIONS → preflight CORS 204
    7. Se options.enforce == false → deixar passar com os cabeçalhos da classe de rota
    8. Caso contrário: POLICIES[routeClass].evaluate(ctx)
       - permitir  → aplicar x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - rejeitar → erro JSON com correlation_id (páginas do painel → 302 /login)
```

Os cabeçalhos internos fidedignos (definidos em `src/server/authz/headers.ts`) são **removidos dos pedidos recebidos** antes da classificação — os clientes não podem preencher previamente `x-omniroute-auth-*` para se fazerem passar por um sujeito.

### Contratos das políticas

Cada classe de rota tem uma política em `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — devolve sempre `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — extrai o Bearer e valida-o através de `validateApiKey()`. Só recorre ao acesso anónimo quando o feature flag efetivo `REQUIRE_API_KEY` está desativado. O valor efetivo do flag é determinado através de `isRequireApiKeyEnabled()` (`substituição do feature flag da BD > process.env.REQUIRE_API_KEY > predefinição`), para que os Feature Flags do Painel e as variáveis de ambiente controlem `/api/v1/*`, `/api/v1beta/*` e os aliases de forma consistente; as falhas do resolvedor resultam em negação por predefinição. Permite pedidos com sessão do painel nas rotas da API de cliente (incluindo `/api/v1/models`, utilizada pelo catálogo de modelos do painel).
- **`managementPolicy`** (`policies/management.ts`) — aceita uma sessão do painel, pedidos internos de sincronização de modelos (correspondentes a `/api/providers/[name]/(sync-models|models)`) ou ignora totalmente a autenticação se `isAuthRequired()` devolver false. Devolve 403 (`AUTH_001`) quando está presente um token Bearer inválido e 401 nos restantes casos. Também aplica os níveis de proteção de rotas (LOCAL_ONLY / ALWAYS_PROTECTED) antes de qualquer ramificação de autenticação — consulte [Níveis de Proteção de Rotas](../security/ROUTE_GUARD_TIERS.md). Os caminhos LOCAL_ONLY em `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (atualmente: `/api/mcp/`) podem ser acedidos a partir de um endereço que não seja loopback quando a chave Bearer inclui o âmbito `manage`; todos os restantes caminhos LOCAL_ONLY continuam estritamente limitados a loopback, independentemente do âmbito.

Uma política bem-sucedida devolve `AuthSubject` com `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Os handlers a jusante podem lê-lo através de `assertAuth(request, "CLIENT_API")` em `src/server/authz/assertAuth.ts`, em vez de voltarem a executar a lógica de autenticação.

## Lista de Rotas Públicas

`src/shared/constants/publicApiRoutes.ts` é a lista de permissões explícita:

A lista está dividida por **formato**, e esta divisão é essencial (GHSA-74g9-q8f6-793h): um prefixo é
comparado com `startsWith()`, pelo que também corresponde a todos os caminhos adjacentes que partilhem os respetivos caracteres iniciais.
Usar `/api/usage/om-usage` como prefixo tornou `/api/usage/om-usage<anything>` PÚBLICO, e o Next resolve
isso como `/api/usage/[connectionId]` — um handler sem autenticação própria.

```ts
// Subárvores genuínas. Cada entrada DEVE terminar em "/" (verificado por um teste unitário).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // tratado como CLIENT_API em classify, não como público "sem autenticação"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Rotas individuais, comparadas EXATAMENTE (com ou sem uma barra final).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Rotas individuais só de leitura que também recebem a flexibilização da origem CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Rota individual só de leitura SEM a flexibilização de CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

As rotas só de leitura são públicas **apenas** para métodos seguros. Nota: `classifyRoute()` exclui `/api/v1/*` e `/api/v1beta/*` do caso geral PUBLIC — estas são sempre `CLIENT_API`, para que a política de chave Bearer continue a ser aplicada.

## Adicionar uma Nova Rota

### Padrão 1 — Endpoint público da API de cliente (autenticação Bearer)

As rotas em `/api/v1/` e `/api/v1beta/` são classificadas automaticamente como `CLIENT_API`. O middleware aplica a verificação Bearer; os handlers das rotas não precisam de a repetir, mas podem ler o sujeito se tal for útil.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... lógica do handler
}
```

### Padrão 2 — Endpoint de gestão (sessão ou Bearer + manage)

Utilize `requireManagementAuth()` de `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... lógica do handler
}
```

`requireManagementAuth()` devolve `null` em caso de sucesso ou uma `Response` de erro JSON:

- 401 `AUTH_001` "Autenticação necessária" — não existem quaisquer credenciais
- 403 — Bearer inválido **ou** Bearer presente, mas a chave não tem o âmbito `manage` / `admin`

`hasManageScope(scopes)` devolve true para `"manage"` ou `"admin"`.

### Padrão 3 — Adicionar à lista de permissões pública

Escolha o conjunto com base no formato, não na conveniência. Uma rota deve ser adicionada a `PUBLIC_API_ROUTES_EXACT` (ou a `PUBLIC_READONLY_CORS_API_ROUTES` se for apenas GET); apenas uma subárvore genuína deve ser adicionada a `PUBLIC_API_ROUTE_PREFIXES`, e esta **deve terminar em `/`**. Colocar uma única rota na lista de prefixos também torna público qualquer caminho adjacente que partilhe os respetivos caracteres iniciais — incluindo caminhos irmãos com segmentos dinâmicos adicionados posteriormente (GHSA-74g9-q8f6-793h). Atualize os testes unitários em `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` e `tests/unit/authz/classify.test.ts`.

## Âmbitos

Três espaços de nomes. Cada verificador lê apenas as suas próprias strings. A comparação lado a lado,
incluindo por que razão `manage` falha `scopeMatches` para `read:compression` e por que razão um
token de acesso `read` não pode `PATCH /api/keys/{id}`, está em
[Três espaços de nomes de âmbito](../frameworks/MCP-SERVER.md#three-scope-namespaces).

As chaves de API contêm um array `scopes` (armazenado como JSON em `api_keys.scopes`, veja `src/lib/db/apiKeys.ts`).

### Âmbito de gestão

- `manage` / `admin` — `hasManageScope`. Acesso de portador a rotas da API de gestão.
- `mcp:connect`, `self:usage`, `self:account-quota` e
  `policy:bypass-provider-quota` são âmbitos aditivos de correspondência exata. Eles situam-se
  fora de `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` abre apenas o
  recorte não-loopback `/api/mcp/`.

### Âmbitos da ferramenta MCP

Catálogo e regras de correspondência (string idêntica, ou um âmbito concedido que termina em `*`):
[Âmbitos da ferramenta MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` em `src/shared/constants/mcpScopes.ts` é o subconjunto tipado
original, não o catálogo completo. A aplicação é executada em
`open-sse/mcp-server/scopeEnforcement.ts` depois de `resolveCallerScopeContext()`
resolver os âmbitos a partir das informações de autenticação do MCP, metadados do pedido ou `OMNIROUTE_MCP_SCOPES`.
Permanece desativado a menos que `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Âmbitos do token de acesso

`read` / `write` / `admin` em tokens `oma_live_…`, classificados por `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Esta classificação aplica-se apenas à credencial
do token de acesso. Veja [Autenticação de Gestão](../guides/MANAGEMENT-AUTH.md).

## Alternador de autenticação obrigatória

`isAuthRequired()` em `src/shared/utils/apiAuth.ts` decide se **qualquer** autenticação é imposta a um pedido:

- `settings.requireLogin === false` → a autenticação fica desativada globalmente, exceto para o nível sempre protegido (ver [Níveis do Route Guard](../security/ROUTE_GUARD_TIERS.md)) e para as chamadas que entregam uma credencial que este aceita. Estas exigem a mesma credencial que com o início de sessão ativo: emitir tokens de sincronização, criar tokens de acesso da CLI de qualquer âmbito, criar uma chave de API com âmbito `manage`/`admin`, conceder esse âmbito a uma chave, ou regenerar ou revelar uma chave assim (`requireCredentialForManagementScopedKey()` em `src/lib/api/requireManagementAuth.ts`). As chaves apenas de inferência continuam abertas.
- Nenhuma palavra-passe configurada **e** nenhuma variável de ambiente `INITIAL_PASSWORD` → o modo de bootstrap permite o assistente de onboarding e os pedidos de loopback, mas os pedidos de rede expostos continuam a exigir credenciais.
- Qualquer erro da base de dados → falha em modo fechado (seguro por omissão).

A aplicação das chaves de API de cliente usa `isRequireApiKeyEnabled()` em `src/shared/utils/featureFlags.ts`, e não uma leitura direta de `process.env.REQUIRE_API_KEY`. Isto importa para instâncias implementadas: alterar `REQUIRE_API_KEY` em Dashboard → Feature Flags guarda uma substituição na base de dados e afeta de imediato `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` e as restantes verificações de autenticação da API de cliente que partilham este auxiliar. Se o armazenamento das feature flags não puder ser lido, a autenticação da API de cliente falha em modo fechado e exige uma chave.

## Alteração incompatível — v3.8.0

Os endpoints `/api/v1/agents/tasks/*` e `/api/resilience/model-cooldowns` **agora requerem autenticação de gestão** (commit `588a0333`). Os clientes que anteriormente enviavam uma chave de API normal sem o âmbito `manage` recebem `403`. Migração: atribua à chave o âmbito `manage` no painel API Keys ou utilize uma sessão autenticada no painel.

## Alteração de comportamento — v3.8.2

`/api/mcp/*` (o servidor MCP remoto) continua a ser LOCAL_ONLY por predefinição, mas agora aceita pedidos que não sejam de loopback quando o cabeçalho `Authorization: Bearer <api-key>` inclui o âmbito `manage`. A exceção é explicitamente controlada por caminho através de `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` em `src/server/authz/routeGuard.ts`; o prefixo LOCAL_ONLY relacionado `/api/cli-tools/runtime/*` não pode, intencionalmente, contornar esta restrição, pois pode iniciar subprocessos arbitrários. Os pedidos anónimos para `/api/mcp/*` que não sejam de loopback continuam a devolver `403 LOCAL_ONLY` — a predefinição para qualquer novo caminho LOCAL_ONLY continua a exigir estritamente loopback. Consulte [Níveis de proteção de rotas](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testes

- Testes unitários: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Lista de permissões pública: `tests/unit/public-api-routes.test.ts`.
- Execução focada: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Depuração

O pipeline adiciona sempre os seguintes cabeçalhos às respostas:

```
x-request-id:               <id de correlação, repetido nos corpos dos erros>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Para pedidos autenticados, os cabeçalhos do pedido a montante (do lado do handler) também incluem:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<últimos-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (opcional)
x-omniroute-auth-scopes:    lista separada por vírgulas
```

Utilize `assertAuth(req, expectedClass)` nos handlers — lança `AuthzAssertionError` com o código `AUTHZ_NOT_INITIALIZED` caso o middleware tenha sido ignorado (útil para detetar regressões de configuração nos testes).

## Ver Também

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — marcador de autenticação por endpoint
- [COMPLIANCE.md](../security/COMPLIANCE.md) — registo de auditoria para eventos de autenticação
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — três namespaces de escopo e catálogo de escopo de ferramenta MCP
- Fonte: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
