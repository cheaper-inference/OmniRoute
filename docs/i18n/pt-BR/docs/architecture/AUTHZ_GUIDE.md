# Authorization Guide (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Fonte da verdade:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Última atualização:** 22/09/2026 — namespaces de escopo apontam para MCP-SERVER.md

OmniRoute possui um pipeline de autorização ciente de rotas que controla cada requisição de API. A classificação é **determinística** e **fail-closed** — qualquer coisa que não possa ser classificada acaba como `MANAGEMENT` e exige uma sessão ou um token de nível de gerenciamento. Esta página explica o modelo para engenheiros que mantêm rotas ou projetam novos endpoints.

![Pipeline de AuthZ (3 classes de rota + avaliação de política)](../diagrams/exported/authz-pipeline.svg)

> Fonte: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dois modos de autenticação

### 1. Chave de API (Bearer)

Usado pelas APIs de cliente compatíveis com OpenAI/Anthropic/Gemini e por algumas rotas de gerenciamento quando a chave tem o escopo `manage`.

```
Authorization: Bearer <api-key>
```

Validado por `isValidApiKey()` / `extractApiKey()` em `src/sse/services/auth.ts` e reexportado por `src/shared/utils/apiAuth.ts`. O validador também aceita as variáveis de ambiente `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` como chaves de passagem persistentes (issue #1350).

### 2. Sessão do dashboard (cookie auth_token)

Para páginas do dashboard e operações administrativas.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Um cookie só é uma sessão quando o JWT é validado **e** contém `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Todos os
consumidores do cookie (guardião de rotas do dashboard (`isDashboardSessionAuthenticated()`), atualização do pipeline de autorização, handshake do WebSocket, servidor
ao vivo, `/api/settings/require-login`, `/api/auth/status`) passam por esse helper.
Existem outros JWTs assinados com `JWT_SECRET` — a passagem da CLI do Cursor emite tokens
`iss "omniroute" / aud "cursor-cli"` para detentores de chaves — e eles nunca são sessões
(#13298).

Validado por `isDashboardSessionAuthenticated()` em `src/shared/utils/apiAuth.ts`. O pipeline atualiza automaticamente o JWT quando faltam menos de 7 dias para o fim de sua validade de 30 dias.

Uma sessão também pode terminar antes de completar seus 30 dias, pois todo emissor passa por `mintDashboardSessionToken` (um horário de emissão `iat` e um identificador `jti`) e o verificador verifica duas configurações: `sessionsValidAfter`, definida por uma alteração de senha para que toda sessão emitida antes dela deixe de ser validada (o navegador que alterou a senha recebe um cookie novo), e `revokedDashboardSessions`, à qual `POST /api/auth/logout` adiciona o `jti` da sessão encerrada. As sessões emitidas por uma versão mais antiga não contêm nenhuma dessas claims e permanecem válidas até a primeira alteração de senha. Se as configurações não puderem ser lidas, a sessão não será confiável.

Algumas rotas de gerenciamento aceitam **qualquer um** dos modos: cookie OU `Bearer <key>` quando a chave de API tem o escopo `manage` (ou `admin`). Isso é o que habilita o fluxo "configurável via chamadas de API" adicionado na v3.8.

#### Gate de login OIDC opcional (#6973)

O login administrativo do dashboard também é compatível com um fluxo OIDC (OpenID Connect) **opt-in**, juntamente com o login padrão por senha — o login por senha nunca é removido, apenas
complementado:

- Desabilitado, a menos que `settings.oidcEnabled === true` **e** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` estejam todos configurados (Configurações → Autenticação).
  `GET /api/auth/oidc/login` retorna `400` caso contrário.
- `GET /api/auth/oidc/login` descobre o `authorization_endpoint` em
  `/.well-known/openid-configuration` do emissor (recorre a
  `<issuer>/authorize`), constrói o URI de redirecionamento a partir da
  solicitação recebida (considerando `x-forwarded-proto`) e redireciona para o IdP
  com um `state` aleatório armazenado em um cookie `oidc_state` com `httpOnly`.
- `GET /api/auth/oidc/callback` valida `state`, troca o código de autorização e
  verifica a assinatura do token de ID por meio do JWKS do emissor
  (`createRemoteJWKSet` do `jose`, armazenado em cache por URI do JWKS), com
  verificações de `issuer`/`audience`. A admissão ao dashboard exige uma lista
  `oidcAllowedSubjects` não vazia, uma política `oidcAdmissionClaim` ou ambas.
  A lista de subjects corresponde a `sub` ou `email` somente quando
  `email_verified === true`. A política de claims opcional aceita um caminho de
  claim do token de ID separado por pontos (por exemplo, `realm_access.roles`) e
  uma matriz de valores aceitos; o claim resolvido deve ser uma matriz de strings
  contendo pelo menos um valor aceito. Se ambas as políticas estiverem
  configuradas, ambas deverão ser aprovadas. Claims ausentes ou malformados
  falham com segurança e, sem nenhuma das políticas, o callback recusa o login
  (`not_configured`). As configurações existentes baseadas somente em subject
  continuam funcionando sem alterações.
- O Keycloak normalmente mapeia as roles do realm para tokens de acesso, não
  necessariamente para tokens de ID. Para exigir a role de realm `admin`,
  configure um mapeador de protocolo para este cliente que inclua
  `realm_access.roles` no **token de ID** e, em seguida, defina
  `oidcAdmissionClaim` como `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Verifique o claim real do token de ID deste cliente antes de habilitar a
  admissão baseada somente em roles; a aplicação não lê roles de tokens de
  acesso. A recusa de tokens no lado do IdP pode complementar, mas não substitui,
  essa verificação no lado da aplicação.
- Em caso de sucesso, emite o **exato mesmo** JWT `auth_token` de 30 dias que o
  login por senha emite (`src/app/api/auth/login/route.ts`), portanto o restante
  do pipeline de sessão do dashboard (atualização automática, flags de cookie)
  permanece inalterado — o OIDC apenas substitui a forma como o cookie é emitido,
  não o que ele concede. Alterações nas roles/grupos do IdP não invalidam sessões
  existentes do OmniRoute; logout, rotação de senha ou expiração da sessão ainda
  determinam sua duração.
- Toda configuração `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) está em
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  responde `400 PASSWORD_REQUIRED` a menos que o corpo contenha a senha de
  gerenciamento como `currentPassword` (`401 PASSWORD_MISMATCH` quando ela
  estiver incorreta). `oidcDisablePasswordLogin` recusa o _login_ por senha
  (`POST /api/auth/login`), mas mantém o hash de senha armazenado, e a
  reautenticação ainda verifica `currentPassword` contra ele.
- `corsOrigins` e `bruteForceProtection` também estão em
  `SECURITY_IMPACTING_SETTINGS_KEYS`: flexibilizar qualquer uma delas enfraquece
  as defesas de login, portanto ambas exigem a mesma reautenticação com
  `currentPassword` (a aba Segurança solicita esse valor) e a importação JSON as
  descarta.
- Toda chave de política de segurança — as entradas de
  `SECURITY_IMPACTING_SETTINGS_KEYS`, toda chave `oidc*` e o estado da sessão do
  dashboard — é **exclusiva do operador** em `PATCH /api/settings`: uma chave de
  API com escopo manage ou um token de acesso `oma_` é recusado com `403` mesmo
  quando envia o `currentPassword` correto, e a recusa é auditada como
  `settings.update_failed` com `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` em `src/lib/api/operatorCredential.ts`).
  Configurações comuns (tema, preferências de exibição) continuam graváveis por
  uma chave `manage` ou um token de acesso `admin`. Toda mutação de
  `/api/settings` (e de `/api/settings/require-login`) também exige o escopo de
  token de acesso `admin` (`ADMIN_MUTATION_EXACT_PATHS` em
  `src/server/authz/accessScopes.ts`, correspondência de caminho exata);
  `GET` continua sendo `read`, e as outras sub-rotas de `/api/settings/*`
  (proxies, padrões de combinação, aliases de modelos, compressão, expurgos…)
  mantêm o escopo `write` inferido pelo método.
- `POST /api/settings/import-json` ignora essa reautenticação e, portanto,
  descarta todas as chaves em `IMPORT_STRIPPED_SETTINGS_KEYS` (mesmo arquivo)
  antes de gravar: a senha e `currentPassword`, todas as entradas de
  `SECURITY_IMPACTING_SETTINGS_KEYS` e o estado da sessão do dashboard
  (`sessionsValidAfter`, `revokedDashboardSessions`). Importar um backup antigo,
  portanto, não pode reativar uma sessão que uma alteração de senha ou um logout
  já encerrou.

#### Login opcional com autenticação de dois fatores TOTP (#16619)

Configurado em Configurações → Segurança; desativado até que o operador o
ative (`src/server/auth/dashboardMfa.ts`).

- **O que ele abrange:** login com senha (`POST /api/auth/login`, que então requer
  `POST /api/auth/mfa/verify`) e `omniroute connect` (`POST /api/cli/connect`,
  que recusa uma troca somente com senha e usa o código como `totp`).
- **O que ele não abrange:** o login via OIDC / SSO (`/api/auth/oidc/callback`) não
  solicita o TOTP do OmniRoute. Ele depende do segundo fator do próprio provedor de
  identidade; portanto, aplique MFA no IdP se o OIDC estiver habilitado.
- **Recuperação** (dispositivo perdido, nenhum código de recuperação restante ou um fator que não pode mais
  ser verificado, por exemplo, após a alteração de `STORAGE_ENCRYPTION_KEY`):
  1. Reinicie o servidor com `OMNIROUTE_DISABLE_MFA=true`.
  2. No próprio host (par do loopback e `Host` do loopback, como
     `http://localhost:20128`), faça login com a senha. O segundo fator é
     ignorado somente para essa origem; todas as outras origens ainda exigem o código.
  3. Em Configurações → Segurança → Desabilitar, insira a senha e deixe o código
     em branco. `POST /api/auth/mfa/disable` aceita um corpo sem `code` somente enquanto
     a variável estiver definida e a solicitação vier do host; ele ainda exige a
     sessão do dashboard e a senha atual, e é auditado como
     `auth.mfa.disabled` com `secondFactor: "recovery_switch"`.
  4. Remova `OMNIROUTE_DISABLE_MFA`, reinicie e faça o cadastro novamente, se necessário.

## Classes de rota

`src/server/authz/types.ts` define três classes; qualquer rota que não possa ser classificada deterministicamente volta para `MANAGEMENT`.

| Aula         | Descrição                                                                                                                                                       | Autenticação necessária                                                                  |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `PUBLIC`     | Rotas explicitamente seguras — login, logout, status, integridade, inicialização de integração.                                                                 | Nenhum                                                                                   |
| `CLIENT_API` | Terminais de atendimento de modelo — `/api/v1/*`, `/api/v1beta/*`, mais aliases `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Chave do portador quando o sinalizador de recurso `REQUIRE_API_KEY` efetivo está ativado |
| `MANAGEMENT` | Páginas do painel, configurações, provedores, chaves, endpoints de administração e diagnóstico.                                                                 | Sessão do painel OR Bearer com escopo `manage`                                           |

Algumas ações `MANAGEMENT` são** somente operador** : uma chave `manage` não é suficiente. Exportar credenciais armazenadas (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), restaurar um backup dos dados ativos (`POST /api/db-backups/import` incluindo `dryRun=true`, `POST /api/db-backups` restaurar por id, `POST /api/settings/import-json`), destruir pontos de restauração (`DELETE /api/db-backups` cleanup e `PATCH /api/db-backups` porque a retenção que ele persiste aciona a remoção automática após cada backup) requer uma sessão do painel, o assunto CLI local ou login desabilitado. A emissão de um token de sincronização (`POST /api/sync/tokens`) e a criação de um token de acesso `admin` CLI `POST /api/cli/tokens`) exigem uma sessão de painel ou o assunto CLI local em cada modo de login. Chaves API de qualquer escopo e tokens de acesso `oma_` não são credenciais de operador: eles obtêm `403` sempre que necessário. O cheque reside em `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). A alteração das configurações de login também é exclusiva do operador: `POST /api/settings/require-login` (definir a senha de gerenciamento/alternar `requireLogin`) aceita apenas essas credenciais quando uma senha existir — a janela de bootstrap da primeira execução (sem senha ainda) permanece inalterada — e uma sessão do painel deve enviar `currentPassword` para substituir a senha (`403` quando ela estiver ausente ou errada, auditada como `settings.update_failed`). O CLI local e uma instância com login desabilitado mantêm o caminho de recuperação e podem definir uma senha sem ele, pois ambos estão vinculados ao host proprietário do diretório de dados.

## Gasoduto

```
Incoming request → src/proxy.ts
  → runAuthzPipeline() in src/server/authz/pipeline.ts
    1. Strip trusted internal headers (x-omniroute-auth-*, x-omniroute-route-class)
    2. Generate request id, classify route via classifyRoute()
    3. If pathname == "/" → redirect /dashboard
    4. If draining (graceful shutdown) and /api/* → 503
    5. If non-GET /api/* → checkBodySize() guard
    6. If OPTIONS → CORS preflight 204
    7. If options.enforce == false → pass-through with route-class headers
    8. Otherwise: POLICIES[routeClass].evaluate(ctx)
       - allow  → stamp x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → JSON error w/ correlation_id (dashboard pages → 302 /login)
```

Cabeçalhos internos confiáveis (definidos em `src/server/authz/headers.ts`) são** removido das solicitações recebidas** antes da classificação, os clientes — não podem preencher previamente `x-omniroute-auth-*` para representar um assunto.

### Contratos de apólices

Cada classe de rota possui uma política em `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — sempre retorna `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — extrai Bearer, valida via `validateApiKey()`. Passa para anônimo somente quando o sinalizador de recurso `REQUIRE_API_KEY` efetivo está desativado. O sinalizador efetivo é resolvido por meio de `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) para que os sinalizadores de recursos do painel e as variáveis de ambiente governem `/api/v1/*`, `/api/v1beta/*` e aliases de forma consistente; falhas do resolvedor falham no fechamento. Permite solicitações de sessão de painel em rotas API do cliente (incluindo `/api/v1/models`, usado pelo catálogo de modelos de painel). Quando Entra ID SSO está habilitado, um Bearer que é estruturalmente um token Entra (três segmentos base64url, `RS*` alg, `kid`) é tratado pela ramificação SSO** antes** `validateApiKey()` e seu veredicto é final — ele nunca passa pelo caminho da chave de API ou pela ramificação degradada para anônima, portanto, uma interrupção do provedor de identidade não pode se tornar acesso aberto. As chaves API estáticas não são afetadas. Consulte [Entrada ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — aceita sessão de painel, solicitações internas de sincronização de modelo (correspondidas a `/api/providers/[name]/(sync-models|models)`) ou ignora completamente se `isAuthRequired()` retornar falso. Retorna 403 (`AUTH_001`) quando um token Bearer está presente, mas é inválido, 401 caso contrário. Também impõe os níveis de proteção de rota (LOCAL_ONLY / ALWAYS_PROTECTED) antes de qualquer ramificação de autenticação — consulte [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md). Os caminhos LOCAL_ONLY em `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (hoje: `/api/mcp/`) podem ser acessados sem loopback quando a chave Bearer carrega o escopo `manage` ; todos os outros caminhos LOCAL_ONLY permanecem em loopback estrito, independentemente do escopo.

Uma política bem-sucedida retorna `AuthSubject` com `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. Os manipuladores downstream podem lê-lo via `assertAuth(request, "CLIENT_API")` no `src/server/authz/assertAuth.ts` em vez de executar novamente a lógica de autenticação.

## Lista de Rotas Públicas

`src/shared/constants/publicApiRoutes.ts` é a lista de permissões explícita:

A lista é dividida por** forma** , e a divisão é de suporte de carga (GHSA-74g9-q8f6-793h): um prefixo é combinado com `startsWith()`, portanto, também corresponde a todos os caminhos adjacentes que compartilham seus caracteres iniciais. `/api/usage/om-usage` como um prefixo marcado `/api/usage/om-usage<anything>` PUBLIC e Next resolve isso para `/api/usage/[connectionId]` — um manipulador sem autenticação própria.

```ts
// Genuine subtrees. Every entry MUST end in "/" (asserted by a unit test).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // treated as CLIENT_API in classify, not as "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Single routes, matched EXACTLY (with or without a trailing slash).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // login step 2 for opt-in TOTP; needs the MFA-pending cookie
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Read-only single routes that also take the CORS origin relaxation.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Read-only single route WITHOUT the CORS relaxation.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Rotas somente leitura são públicas** apenas** para métodos seguros. Nota: `classifyRoute()` exclui `/api/v1/*` e `/api/v1beta/*` do PUBLIC fall-through — esses são sempre `CLIENT_API` portanto a política da chave do portador ainda se aplica.

## Adição de uma nova rota

### Padrão 1 — Endpoint público da API do cliente (autenticação Bearer)

As rotas em `/api/v1/` e `/api/v1beta/` são classificadas automaticamente como `CLIENT_API`. O middleware aplica a verificação Bearer; os handlers de rota não precisam repeti-la, mas podem ler o sujeito, se isso for útil.

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

### Padrão 2 — Endpoint de gerenciamento (sessão ou Bearer + manage)

Use `requireManagementAuth()` de `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... lógica do handler
}
```

`requireManagementAuth()` retorna `null` em caso de sucesso ou uma `Response` de erro em JSON:

- 401 `AUTH_001` "Autenticação obrigatória" — nenhuma credencial fornecida
- 403 — Bearer inválido **ou** Bearer presente, mas a chave não possui o escopo `manage` / `admin`

`hasManageScope(scopes)` retorna verdadeiro para `"manage"` ou `"admin"`.

### Padrão 3 — Adição à lista pública de permissões

Escolha o conjunto pelo formato, não pela conveniência. Uma única rota deve ser adicionada a `PUBLIC_API_ROUTES_EXACT` (ou a `PUBLIC_READONLY_CORS_API_ROUTES` se aceitar apenas GET); somente uma subárvore genuína deve ser adicionada a `PUBLIC_API_ROUTE_PREFIXES`, e ela **deve terminar em `/`**. Colocar uma única rota na lista de prefixos também torna público todo caminho adjacente que compartilhe seus caracteres iniciais — incluindo caminhos irmãos com segmentos dinâmicos adicionados posteriormente (GHSA-74g9-q8f6-793h). Atualize os testes unitários em `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` e `tests/unit/authz/classify.test.ts`.

## Escopos

Três namespaces. Cada verificador lê apenas suas próprias strings. A comparação lado a lado, incluindo por que `manage` falha em `scopeMatches` para `read:compression` e por que um token de acesso `read` não pode `PATCH /api/keys/{id}`, está em [Três namespaces de escopo](../frameworks/MCP-SERVER.md#three-scope-namespaces).

As chaves de API carregam um array `scopes` (armazenado como JSON em `api_keys.scopes`, veja `src/lib/db/apiKeys.ts`).

### Escopo de gerenciamento

- `manage` / `admin` — `hasManageScope`. Acesso de portador às rotas da API de gerenciamento.
- `mcp:connect`, `self:usage`, `self:account-quota` e
  `policy:bypass-provider-quota` são escopos aditivos de correspondência exata. Eles ficam
  fora de `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` abre apenas o
  recorte não-loopback `/api/mcp/`.

### Escopos da ferramenta MCP

Catálogo e regras de correspondência (string idêntica, ou um escopo concedido terminando em `*`):
[Escopos da ferramenta MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` em `src/shared/constants/mcpScopes.ts` é o subconjunto tipado original,
não o catálogo completo. A aplicação é executada em
`open-sse/mcp-server/scopeEnforcement.ts` depois que `resolveCallerScopeContext()`
resolve os escopos a partir das informações de autenticação do MCP, metadados da requisição ou
`OMNIROUTE_MCP_SCOPES`. Ela permanece desativada a menos que `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Escopos do token de acesso

`read` / `write` / `admin` em tokens `oma_live_…`, classificados por `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Essa classificação se aplica apenas à credencial do token de acesso.
Veja [Autenticação de Gerenciamento](../guides/MANAGEMENT-AUTH.md).

## Alternar autenticação necessária

`isAuthRequired()` em `src/shared/utils/apiAuth.ts` decide se** qualquer** auth é aplicado para uma solicitação:

- `settings.requireLogin === false` → auth está desabilitado globalmente, exceto para a camada sempre protegida (consulte [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md) ) e as chamadas que distribuem uma credencial que ela aceita, que precisam da mesma credencial do login: emissão de tokens de sincronização, criação de tokens de acesso CLI em qualquer escopo e criação de uma chave API com o escopo `manage`/`admin`, concessão desse escopo a uma chave ou regeneração ou revelação de tal chave (`requireCredentialForManagementScopedKey()` em `src/lib/api/requireManagementAuth.ts`). As chaves somente de inferência permanecem abertas. Escrever um sinalizador de recurso protegido (`REQUIRE_API_KEY`, os outros sinalizadores de segurança e os sinalizadores SSRF / TLS / MCP-scope / sandbox listados em [Feature Flags](../reference/FEATURE_FLAGS.md#rest-api) ) e salvar as configurações de mascaramento PII (`PUT /api/settings/pii`) também continuam precisando de uma credencial.
- Nenhuma senha configurada** e** no `INITIAL_PASSWORD` env var → bootstrap mode permite o assistente de integração e solicitações de loopback, mas as solicitações de rede expostas ainda precisam de credenciais. Exceção: escrever um sinalizador de recurso protegido e salvar as configurações de mascaramento PII (`PUT /api/settings/pii`) precisa de uma credencial mesmo no loopback, portanto, o loopback por si só não é suficiente.
- Qualquer erro DB → falha no fechamento (seguro por padrão).

A aplicação da chave API do cliente usa `isRequireApiKeyEnabled()` em `src/shared/utils/featureFlags.ts`, não uma leitura direta `process.env.REQUIRE_API_KEY`. Isso é importante para instâncias implantadas: alternar `REQUIRE_API_KEY` no Dashboard → Feature Flags armazena uma substituição DB e afeta imediatamente `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` e outras verificações de autenticação da API do cliente que compartilham esse auxiliar. Se o armazenamento do sinalizador de recurso não puder ser lido, o cliente API auth falhará ao fechar e exigirá uma chave.

## Alteração incompatível — v3.8.0

Os endpoints `/api/v1/agents/tasks/*` e `/api/resilience/model-cooldowns` **agora exigem autenticação de gerenciamento** (commit `588a0333`). Clientes que anteriormente enviavam uma chave de API normal sem o escopo `manage` recebem `403`. Migração: conceda à chave o escopo `manage` no painel API Keys ou use uma sessão autenticada no painel.

## Alteração de comportamento — v3.8.2

`/api/mcp/*` (o servidor MCP remoto) ainda é LOCAL_ONLY por padrão, mas agora aceita requisições que não sejam de loopback quando o cabeçalho `Authorization: Bearer <api-key>` contém o escopo `manage`. A exceção é habilitada explicitamente para cada caminho por meio de `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` em `src/server/authz/routeGuard.ts`; o prefixo LOCAL_ONLY relacionado `/api/cli-tools/runtime/*` intencionalmente NÃO pode ser ignorado, pois pode iniciar subprocessos arbitrários. Requisições anônimas para `/api/mcp/*` que não sejam de loopback continuam retornando `403 LOCAL_ONLY` — o padrão para qualquer novo caminho LOCAL_ONLY continua sendo estritamente loopback. Consulte [Níveis do Route Guard](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testes

- Testes unitários: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Lista de permissões públicas: `tests/unit/public-api-routes.test.ts`.
- Executar teste específico: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Depuração

O pipeline sempre carimba as respostas com:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Para solicitações autenticadas, os cabeçalhos de solicitação upstream (lado do manipulador) também incluem:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Use `assertAuth(req, expectedClass)` dentro dos manipuladores — ele lança `AuthzAssertionError` com código `AUTHZ_NOT_INITIALIZED` se o middleware foi ignorado (útil para capturar regressões de configuração em testes).

## Ver Também

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — marcador de autenticação por endpoint
- [COMPLIANCE.md](../security/COMPLIANCE.md) — log de auditoria para eventos de autenticação
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — três namespaces de escopo e catálogo de escopo de ferramenta MCP
- Fonte: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
