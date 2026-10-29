# Authorization Guide (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Źródło prawdy:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Ostatnia aktualizacja:** 2026-09-22 — przestrzenie nazw zakresu wskazują na MCP-SERVER.md

OmniRoute posiada potok autoryzacji świadomy tras, który kontroluje każde żądanie API. Klasyfikacja jest **deterministyczna** i **zamknięta w przypadku awarii** — wszystko, co nie może zostać sklasyfikowane, trafia jako `MANAGEMENT` i wymaga sesji lub tokenu o uprawnieniach zarządzania. Ta strona wyjaśnia model dla inżynierów utrzymujących trasy lub projektujących nowe punkty końcowe.

![Potok AuthZ (3 klasy tras + ocena polityki)](../diagrams/exported/authz-pipeline.svg)

> Źródło: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dwa tryby uwierzytelniania

### 1. Klucz API (Bearer)

Używany przez interfejsy API klientów zgodnych z OpenAI/Anthropic/Gemini oraz kilka tras zarządzania, gdy klucz ma zakres `manage`.

```
Authorization: Bearer <api-key>
```

Weryfikowany przez `isValidApiKey()` / `extractApiKey()` w `src/sse/services/auth.ts` i ponownie eksportowany przez `src/shared/utils/apiAuth.ts`. Walidator akceptuje również zmienne środowiskowe `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` jako trwałe klucze przekazywane bezpośrednio (zgłoszenie #1350).

### 2. Sesja panelu (ciasteczko auth_token)

Do stron panelu i operacji administracyjnych.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Ciasteczko jest sesją tylko wtedy, gdy token JWT przejdzie weryfikację **i** zawiera `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Każdy
konsument ciasteczka (ochrona tras panelu (`isDashboardSessionAuthenticated()`), odświeżanie potoku autoryzacji, uzgadnianie połączenia WebSocket, serwer
na żywo, `/api/settings/require-login`, `/api/auth/status`) korzysta z tej funkcji pomocniczej.
Istnieją również inne tokeny JWT podpisane za pomocą `JWT_SECRET` — mechanizm bezpośredniego przekazywania Cursor CLI wystawia
tokeny `iss "omniroute" / aud "cursor-cli"` posiadaczom kluczy — i nigdy nie są one sesjami
(#13298).

Weryfikacja odbywa się za pomocą `isDashboardSessionAuthenticated()` w `src/shared/utils/apiAuth.ts`. Potok automatycznie odświeża token JWT, gdy do końca jego 30-dniowego okresu ważności pozostało mniej niż 7 dni.

Sesja może również zakończyć się przed upływem 30 dni, ponieważ każdy wystawca korzysta z `mintDashboardSessionToken` (czas wystawienia `iat` oraz identyfikator `jti`), a weryfikator sprawdza dwa ustawienia: `sessionsValidAfter`, ustawiane po zmianie hasła, dzięki czemu każda sesja wystawiona wcześniej przestaje przechodzić weryfikację (przeglądarka, w której zmieniono hasło, otrzymuje nowe ciasteczko), oraz `revokedDashboardSessions`, do którego żądanie `POST /api/auth/logout` dodaje `jti` wylogowanej sesji. Sesje utworzone przez starszą wersję nie zawierają żadnej z tych deklaracji i pozostają ważne do pierwszej zmiany hasła. Jeśli nie można odczytać ustawień, sesja nie jest uznawana za zaufaną.

Niektóre trasy zarządzania akceptują **dowolny** z tych trybów: ciasteczko LUB `Bearer <key>`, gdy klucz API ma zakres `manage` (lub `admin`). Umożliwia to przepływ pracy „konfigurowanie za pomocą wywołań API”, dodany w wersji v3.8.

#### Opcjonalna brama logowania OIDC (#6973)

Logowanie administratora do panelu obsługuje również **opcjonalny** przepływ OIDC (OpenID Connect)
obok domyślnego logowania hasłem — logowanie hasłem nigdy nie jest usuwane, a jedynie
uzupełniane:

- Wyłączone, chyba że `settings.oidcEnabled === true` **oraz** wszystkie ustawienia
  `oidcIssuer` / `oidcClientId` / `oidcClientSecret` są skonfigurowane
  (Ustawienia → Uwierzytelnianie). W przeciwnym razie
  `GET /api/auth/oidc/login` zwraca `400`.
- `GET /api/auth/oidc/login` wykrywa `authorization_endpoint` na podstawie
  `/.well-known/openid-configuration` wystawionego przez dostawcę
  (z wartością awaryjną `<issuer>/authorize`), tworzy identyfikator URI
  przekierowania na podstawie przychodzącego żądania (z uwzględnieniem
  `x-forwarded-proto`) i przekierowuje do IdP z losową wartością `state`
  przechowywaną w pliku cookie `oidc_state` z flagą `httpOnly`.
- `GET /api/auth/oidc/callback` weryfikuje `state`, wymienia kod autoryzacyjny
  i sprawdza podpis tokenu ID za pomocą zestawu JWKS dostawcy
  (`createRemoteJWKSet` z biblioteki `jose`, buforowanego osobno dla każdego
  identyfikatora URI JWKS), z kontrolą `issuer`/`audience`. Dopuszczenie do
  panelu wymaga niepustej listy `oidcAllowedSubjects`, zasad
  `oidcAdmissionClaim` albo obu tych elementów. Lista podmiotów dopasowuje
  `sub` lub `email` wyłącznie wtedy, gdy `email_verified === true`. Opcjonalne
  zasady dotyczące deklaracji przyjmują rozdzieloną kropkami ścieżkę do
  deklaracji tokenu ID (na przykład `realm_access.roles`) oraz tablicę
  akceptowanych wartości; wskazana deklaracja musi być tablicą ciągów znaków
  zawierającą co najmniej jedną akceptowaną wartość. Jeśli skonfigurowano obie
  zasady, obie muszą zostać spełnione. Brakujące lub nieprawidłowe deklaracje
  powodują bezpieczne odrzucenie, a bez którejkolwiek z tych zasad wywołanie
  zwrotne odmawia logowania (`not_configured`). Istniejące konfiguracje oparte
  wyłącznie na podmiocie nadal działają bez zmian.
- Keycloak zwykle mapuje role domeny do tokenów dostępu, ale niekoniecznie do
  tokenów ID. Aby wymagać roli domeny `admin`, skonfiguruj dla tego klienta
  mapper protokołu, który umieszcza `realm_access.roles` w jego **tokenie ID**,
  a następnie ustaw `oidcAdmissionClaim` na
  `{ "path": "realm_access.roles", "values": ["admin"] }`. Przed włączeniem
  dopuszczania opartego wyłącznie na rolach sprawdź rzeczywistą deklarację
  tokenu ID dla tego klienta; aplikacja nie odczytuje ról z tokenu dostępu.
  Odrzucenie tokenu po stronie IdP może uzupełniać tę kontrolę po stronie
  aplikacji, ale jej nie zastępuje.
- Po powodzeniu generowany jest **dokładnie ten sam** 30-dniowy token JWT
  `auth_token`, który jest wydawany podczas logowania hasłem
  (`src/app/api/auth/login/route.ts`), dlatego pozostała część mechanizmu sesji
  panelu (automatyczne odświeżanie, flagi plików cookie) pozostaje bez zmian —
  OIDC zastępuje jedynie sposób generowania pliku cookie, a nie nadawane przez
  niego uprawnienia. Zmiany ról lub grup w IdP nie unieważniają istniejących
  sesji OmniRoute; ich czas obowiązywania nadal zależy od wylogowania, zmiany
  hasła lub wygaśnięcia sesji.
- Każde ustawienie `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) znajduje się w
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`):
  `PATCH /api/settings` zwraca `400 PASSWORD_REQUIRED`, chyba że treść zawiera
  hasło zarządzania jako `currentPassword` (`401 PASSWORD_MISMATCH`, gdy jest
  ono nieprawidłowe). `oidcDisablePasswordLogin` blokuje _logowanie_ hasłem
  (`POST /api/auth/login`), ale zachowuje przechowywany skrót hasła, a ponowne
  uwierzytelnianie nadal porównuje z nim `currentPassword`.
- `corsOrigins` i `bruteForceProtection` również znajdują się w
  `SECURITY_IMPACTING_SETTINGS_KEYS`: poluzowanie któregokolwiek z tych
  ustawień osłabia zabezpieczenia logowania, dlatego wymagają one takiego
  samego ponownego uwierzytelnienia za pomocą `currentPassword` (karta
  Zabezpieczenia prosi o jego podanie), a import JSON je pomija.
- Każdy klucz zasad bezpieczeństwa — wpisy
  `SECURITY_IMPACTING_SETTINGS_KEYS`, każdy klucz `oidc*` oraz stan sesji
  panelu — jest dostępny **wyłącznie dla operatora** w
  `PATCH /api/settings`: klucz API z zakresem `manage` lub token dostępu
  `oma_` zostaje odrzucony z kodem `403`, nawet jeśli przesyła prawidłowe
  `currentPassword`, a odmowa jest rejestrowana w dzienniku audytu jako
  `settings.update_failed` z `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` w `src/lib/api/operatorCredential.ts`).
  Zwykłe ustawienia (motyw, preferencje wyświetlania) pozostają dostępne do
  zapisu dla klucza `manage` lub tokenu dostępu `admin`. Każda modyfikacja
  samego `/api/settings` (oraz `/api/settings/require-login`) wymaga również
  zakresu tokenu dostępu `admin` (`ADMIN_MUTATION_EXACT_PATHS` w
  `src/server/authz/accessScopes.ts`, dokładne dopasowanie ścieżki); `GET`
  nadal wymaga zakresu `read`, a pozostałe podtrasy `/api/settings/*` (serwery
  proxy, ustawienia domyślne kombinacji, aliasy modeli, kompresja,
  czyszczenie…) zachowują zakres `write` określany na podstawie metody.
- `POST /api/settings/import-json` pomija to ponowne uwierzytelnienie, dlatego
  przed zapisem usuwa każdy klucz z `IMPORT_STRIPPED_SETTINGS_KEYS` (ten sam
  plik): hasło i `currentPassword`, każdy wpis
  `SECURITY_IMPACTING_SETTINGS_KEYS` oraz stan sesji panelu
  (`sessionsValidAfter`, `revokedDashboardSessions`). Zaimportowanie starszej
  kopii zapasowej nie może więc przywrócić sesji zakończonej wcześniej przez
  zmianę hasła lub wylogowanie.

## Klasy tras

`src/server/authz/types.ts` definiuje trzy klasy; każda trasa, której nie da się jednoznacznie sklasyfikować, trafia do `MANAGEMENT`.

| Klasa        | Opis                                                                                                                                                | Wymagane uwierzytelnienie                                                 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `PUBLIC`     | Jawnie bezpieczne trasy — logowanie, wylogowanie, status, inicjalizacja, health, bootstrap onboardingu.                                             | Brak                                                                      |
| `CLIENT_API` | Endpointy obsługi modeli — `/api/v1/*`, `/api/v1beta/*` oraz aliasy `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Klucz Bearer, gdy włączona jest efektywna flaga funkcji `REQUIRE_API_KEY` |
| `MANAGEMENT` | Strony panelu, ustawienia, dostawcy, klucze, endpointy administracyjne i diagnostyczne.                                                             | Sesja panelu LUB Bearer z zakresem `manage`                               |

Kilka działań `MANAGEMENT` jest **dostępnych wyłącznie dla operatora**: sam klucz `manage` nie wystarcza. Eksport zapisanych poświadczeń (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), przywracanie kopii zapasowej nad żywymi danymi (`POST /api/db-backups/import`, łącznie z `dryRun=true`, `POST /api/db-backups` przywracanie po id, `POST /api/settings/import-json`) oraz niszczenie punktów przywracania (czyszczenie przez `DELETE /api/db-backups` oraz `PATCH /api/db-backups`, ponieważ zapisywana retencja steruje automatycznym przycinaniem po każdym backupie) wymagają sesji panelu, lokalnego podmiotu CLI albo wyłączonego logowania. Wystawienie tokenu synchronizacji (`POST /api/sync/tokens`) i wybicie tokenu dostępu CLI z zakresem `admin` (`POST /api/cli/tokens`) wymagają sesji panelu lub lokalnego podmiotu CLI we wszystkich trybach logowania. Klucze API dowolnego zakresu oraz tokeny dostępu `oma_` nie są poświadczeniami operatora: gdy takie poświadczenie jest wymagane, dostają `403`. Sprawdzenie znajduje się w `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Zmiana ustawień logowania również jest zastrzeżona dla operatora: `POST /api/settings/require-login` (ustawienie hasła zarządzania / przełączenie `requireLogin`) akceptuje wyłącznie te poświadczenia, gdy hasło już istnieje — okno pierwszego uruchomienia (jeszcze bez hasła) pozostaje bez zmian — a sesja panelu musi wysłać `currentPassword`, aby zastąpić hasło (`403`, gdy brakuje go lub jest błędne, audytowane jako `settings.update_failed`). Lokalne CLI oraz instancja z wyłączonym logowaniem zachowują ścieżkę odzyskiwania i mogą ustawić hasło bez tego, ponieważ oba są powiązane z hostem, który posiada katalog danych.

## Potok

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

Zaufane nagłówki wewnętrzne (zdefiniowane w `src/server/authz/headers.ts`) są **usuwane z przychodzących żądań** przed klasyfikacją — klienci nie mogą wcześniej ustawić `x-omniroute-auth-*`, aby podszyć się pod subject.

### Kontrakty polityk

Każda klasa trasy ma politykę w `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — zawsze zwraca `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — wyciąga Bearer, waliduje przez `validateApiKey()`. Przechodzi do anonymous tylko gdy efektywna flaga `REQUIRE_API_KEY` jest wyłączona. Efektywna flaga jest rozwiązywana przez `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`), więc Dashboard Feature Flags i zmienne środowiskowe spójnie rządzą `/api/v1/*`, `/api/v1beta/*` oraz aliasami; awarie resolvera kończą się fail-closed. Dopuszcza żądania z sesją dashboardu na trasach client API (w tym `/api/v1/models`, używane przez katalog modeli w dashboardzie).
- **`managementPolicy`** (`policies/management.ts`) — akceptuje sesję dashboardu, wewnętrzne żądania model-sync (dopasowane do `/api/providers/[name]/(sync-models|models)`) albo całkowicie pomija auth, jeśli `isAuthRequired()` zwraca false. Zwraca 403 (`AUTH_001`), gdy token Bearer jest obecny, ale nieprawidłowy, w przeciwnym razie 401. Egzekwuje też poziomy route-guard (LOCAL_ONLY / ALWAYS_PROTECTED) przed jakąkolwiek gałęzią auth — zob. [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md). Ścieżki LOCAL_ONLY w `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (dziś: `/api/mcp/`) mogą być dostępne spoza loopback, gdy klucz Bearer ma scope `manage`; wszystkie pozostałe ścieżki LOCAL_ONLY pozostają ściśle loopback niezależnie od scope.

Udana polityka zwraca `AuthSubject` z `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Handlery downstream mogą to odczytać przez `assertAuth(request, "CLIENT_API")` w `src/server/authz/assertAuth.ts` zamiast ponownie uruchamiać logikę auth.

## Lista tras publicznych

`src/shared/constants/publicApiRoutes.ts` to jawna allowlista:

```ts
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/v1/", // treated as CLIENT_API in classify, not as "no-auth public"
  "/api/cloud/",
  "/api/sync/bundle",
  "/api/oauth/",
];

PUBLIC_READONLY_API_ROUTE_PREFIXES = ["/api/monitoring/health", "/api/settings/require-login"];

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Prefiksy tylko do odczytu są publiczne **wyłącznie** dla bezpiecznych metod. Uwaga: `classifyRoute()` wyklucza `/api/v1/*` i `/api/v1beta/*` z fall-through PUBLIC — te trasy są zawsze `CLIENT_API`, więc polityka klucza Bearer nadal obowiązuje.

## Dodawanie nowej trasy

### Wzorzec 1 — Publiczny endpoint client API (Bearer-auth)

Trasy pod `/api/v1/` i `/api/v1beta/` są automatycznie klasyfikowane jako `CLIENT_API`. Middleware egzekwuje sprawdzenie Bearer; handlery tras nie muszą tego powtarzać, ale mogą odczytać subject, jeśli jest to przydatne.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... handler logic
}
```

### Wzorzec 2 — Endpoint management (sesja lub Bearer + manage)

Użyj `requireManagementAuth()` z `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... handler logic
}
```

`requireManagementAuth()` zwraca `null` przy sukcesie albo błąd JSON `Response`:

- 401 `AUTH_001` "Authentication required" — brak jakichkolwiek poświadczeń
- 403 — nieprawidłowy Bearer **lub** Bearer obecny, ale klucz nie ma scope `manage` / `admin`

`hasManageScope(scopes)` zwraca true dla `"manage"` lub `"admin"`.

### Wzorzec 3 — Dodanie do publicznej allowlisty

Dodaj prefiks do `PUBLIC_API_ROUTE_PREFIXES` (lub `PUBLIC_READONLY_API_ROUTE_PREFIXES` dla GET-only). Zaktualizuj testy jednostkowe w `tests/unit/public-api-routes.test.ts` i `tests/unit/authz/classify.test.ts`.

## Zakresy

Trzy przestrzenie nazw. Każdy moduł sprawdzający odczytuje tylko własne ciągi znaków. Porównanie, w tym dlaczego `manage` nie przechodzi `scopeMatches` dla `read:compression` i dlaczego token dostępu `read` nie może `PATCH /api/keys/{id}`, znajduje się w [Trzy przestrzenie nazw zakresów](../frameworks/MCP-SERVER.md#three-scope-namespaces).

Klucze API zawierają tablicę `scopes` (przechowywaną jako JSON w `api_keys.scopes`, zobacz `src/lib/db/apiKeys.ts`).

### Zakres zarządzania

- `manage` / `admin` — `hasManageScope`. Dostęp typu Bearer do tras API zarządzania.
- `mcp:connect`, `self:usage`, `self:account-quota` i `policy:bypass-provider-quota` to addytywne zakresy o dokładnym dopasowaniu. Znajdują się poza `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` otwiera tylko wydzieloną, nieloopbackową część `/api/mcp/`.

### Zakresy narzędzi MCP

Katalog i reguły dopasowania (identyczny ciąg znaków lub przyznany zakres kończący się na `*`): [Zakresy narzędzi MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes). `MCP_SCOPE_LIST` w `src/shared/constants/mcpScopes.ts` to oryginalny, typowany podzbiór, a nie pełny katalog. Wymuszanie odbywa się w `open-sse/mcp-server/scopeEnforcement.ts` po tym, jak `resolveCallerScopeContext()` rozpozna zakresy z informacji uwierzytelniających MCP, metadanych żądania lub `OMNIROUTE_MCP_SCOPES`. Pozostaje wyłączone, chyba że `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Zakresy tokenów dostępu

`read` / `write` / `admin` na tokenach `oma_live_…`, uszeregowane według `scopeSatisfies` (`src/lib/accessTokens/scopes.ts`). Ta ranga dotyczy wyłącznie poświadczeń tokenu dostępu. Zobacz [Uwierzytelnianie zarządzania](../guides/MANAGEMENT-AUTH.md).

## Przełącznik wymogu uwierzytelnienia

`isAuthRequired()` w `src/shared/utils/apiAuth.ts` decyduje, czy wymuszane jest **jakiekolwiek** uwierzytelnienie dla żądania:

- `settings.requireLogin === false` → uwierzytelnianie jest globalnie wyłączone, z wyjątkiem poziomu zawsze chronionego (zobacz [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) oraz wywołań, które wydają poświadczenie, jakie akceptuje — te wymagają tego samego poświadczenia co przy włączonym logowaniu: wystawianie tokenów synchronizacji, wydawanie tokenów dostępu CLI w dowolnym zakresie oraz tworzenie klucza API z zakresem `manage`/`admin`, nadawanie tego zakresu kluczowi, regenerowanie lub ujawnianie takiego klucza (`requireCredentialForManagementScopedKey()` w `src/lib/api/requireManagementAuth.ts`). Klucze służące tylko do inferencji pozostają otwarte.
- Brak skonfigurowanego hasła **oraz** brak zmiennej środowiskowej `INITIAL_PASSWORD` → tryb bootstrap pozwala na kreator konfiguracji i żądania z loopback, ale żądania z sieci zewnętrznej nadal wymagają poświadczeń.
- Każdy błąd bazy danych → odmowa dostępu (secure-by-default).

Egzekwowanie klucza API klienta korzysta z `isRequireApiKeyEnabled()` w `src/shared/utils/featureFlags.ts`, a nie z bezpośredniego odczytu `process.env.REQUIRE_API_KEY`. Ma to znaczenie dla wdrożonych instancji: przełączenie `REQUIRE_API_KEY` w Dashboard → Feature Flags zapisuje nadpisanie w bazie i natychmiast wpływa na `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` oraz inne sprawdzenia uwierzytelnienia API klienta, które współdzielą tę funkcję. Jeśli magazynu flag nie da się odczytać, uwierzytelnianie API klienta odmawia dostępu i wymaga klucza.

## Breaking Change — v3.8.0

Endpointy `/api/v1/agents/tasks/*` oraz `/api/resilience/model-cooldowns` **wymagają teraz management auth** (commit `588a0333`). Klienci, którzy wcześniej wysyłali zwykły klucz API bez scope `manage`, otrzymują `403`. Migracja: nadaj kluczowi scope `manage` w dashboardzie API Keys albo użyj zalogowanej sesji dashboardu.

## Zmiana zachowania — v3.8.2

`/api/mcp/*` (zdalny serwer MCP) domyślnie nadal jest LOCAL_ONLY, ale teraz akceptuje żądania spoza loopback, gdy nagłówek `Authorization: Bearer <api-key>` niesie scope `manage`. Wyjątek jest jawnie bramkowany per-path przez `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` w `src/server/authz/routeGuard.ts`; siostrzany prefiks LOCAL_ONLY `/api/cli-tools/runtime/*` celowo NIE podlega bypassowi, bo może uruchamiać dowolne podprocesy. Anonimowe żądania do `/api/mcp/*` spoza loopback nadal zwracają `403 LOCAL_ONLY` — domyślnie każda nowa ścieżka LOCAL_ONLY pozostaje strict-loopback. Zob. [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testowanie

- Testy jednostkowe: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Publiczna allowlista: `tests/unit/public-api-routes.test.ts`.
- Uruchomienie fokusowane: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Debugowanie

Potok zawsze stempluje odpowiedzi:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Dla uwierzytelnionych żądań nagłówki żądania upstream (po stronie handlera) zawierają także:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Używaj `assertAuth(req, expectedClass)` wewnątrz handlerów — rzuca `AuthzAssertionError` z kodem `AUTHZ_NOT_INITIALIZED`, jeśli middleware zostało ominięte (przydatne do łapania regresji konfiguracji w testach).

## Zobacz również

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — znacznik autoryzacji dla każdego punktu końcowego
- [COMPLIANCE.md](../security/COMPLIANCE.md) — dziennik audytu dla zdarzeń autoryzacji
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — trzy przestrzenie nazw zakresów i katalog zakresów narzędzi MCP
- Źródło: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
